import { spawn } from 'node:child_process';
import path from 'node:path';
import { existsSync, mkdirSync, openSync, closeSync } from 'node:fs';
const root = process.cwd();
const isWin = process.platform === 'win32';
const pythonCandidates = [
  process.env.INFERENCE_PYTHON,
  '.venv/Scripts/python.exe',
  '.venv/bin/python',
  isWin ? 'python' : 'python3',
].filter(Boolean);

const pythonBin =
  pythonCandidates.find((p) => p === 'python' || p === 'python3' || existsSync(p)) ||
  'python';

mkdirSync('.runtime/logs', { recursive: true });
const children = [];
function start(name, cmd, args, cwd = root) {
  const log = openSync(`.runtime/logs/${name}.log`, 'a');
  const actualCmd = isWin && cmd === 'pnpm' ? 'pnpm.cmd' : cmd;
  const child = spawn(actualCmd, args, {
    cwd,
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: '1',
      STORAGE_DIR: path.resolve(process.env.STORAGE_DIR || '.runtime/uploads'),
    },
    stdio: ['ignore', log, log],
    detached: !isWin,
    shell: isWin,
  });
  closeSync(log);
  children.push(child);
  child.on('exit', (code) => {
    console.log(`${name} exited (${code}); logs in .runtime/logs/${name}.log`);
    if (code && !stopping) stop(code);
  });
}
function signalGroup(child, signal) {
  try {
    if (isWin) {
      if (child.pid) spawn('taskkill', ['/pid', String(child.pid), '/T', '/F']);
    } else {
      process.kill(-child.pid, signal);
    }
  } catch (e) {
    if (e.code !== 'ESRCH') throw e;
  }
}
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) signalGroup(child, 'SIGTERM');
  setTimeout(() => {
    for (const child of children) signalGroup(child, 'SIGKILL');
    process.exit(code);
  }, 2000).unref();
}
start(
  'inference',
  pythonBin === 'python' || pythonBin === 'python3' ? pythonBin : path.resolve(pythonBin),
  ['-m', 'uvicorn', 'main:app', '--host', '127.0.0.1', '--port', '8001'],
  path.join(root, 'services/inference'),
);
start('api', 'pnpm', ['--filter', '@safesight/api', 'dev']);
start('web', 'pnpm', ['--filter', '@safesight/web', 'dev']);
start('proxy', 'node', ['scripts/proxy.mjs']);
console.log(
  'SafeSight starting at http://localhost:8080 · logs: .runtime/logs/',
);
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
