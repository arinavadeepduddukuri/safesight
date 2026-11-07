# Verification — 2026-10-05

The active app now uses a Windows 95 interface with Human analysis, Machinery analysis, Inspection history and Settings desktop applications, anonymous sessions and server-side Gemini equipment inventories. Legacy records are preserved; detector/simulator/incident/QR workflows are removed.

Local Gemini setup now uses gemini-3.1-flash-lite. The provided key is stored only in the ignored, owner-readable .env. Google rejected gemini-2.5-flash generation for this project. The live provider also rejected the nested inventory schema's length/item constraints; the provider schema now omits those constraints while local Pydantic response validation retains them. A generated blank image completed the full application upload, live Gemini analysis and database persistence workflow. Its temporary image, inspection and zone were removed afterward. Local verification evidence is in .runtime/setup-verification.json.

## Result windows, History and settings — 5 October 2026

Removed the analysis-limitations and visual-review sections from result windows, including the machinery-specific limitations list. Existing stored warnings/limitations and historical review records remain in exported data. The source photograph and document commands now stay fixed; the keyboard-focusable Safety analysis section alone scrolls. Task context and job status appear within that section. Desktop and 390px layouts were checked, and printing restores full document flow.

History now displays Machinery directly beside People, including on mobile. Empty assessed lists show zero; queued and older unassessed machine results show an em dash. Settings is a compact Windows 95 properties dialog with workspace name, a supported-zone selector and a live clock preview. Read-only Gemini status is visible; setup/model/data details are initially collapsed. OK/Cancel/Apply have standard draft/commit behavior, and failed saves preserve draft values. Research and primary sources are recorded in [UX_RESEARCH](UX_RESEARCH.md).

This UI change is verified with TypeScript, ESLint/Prettier, the webpack production web build, browser workflows and the secret/whitespace checks. Browser fixtures exercise result-pane-only scrolling, fixed photographs/toolbars, panel removal, print output, People/Machinery history counts, settings draft cancellation, Apply/OK persistence, validation, time-zone previews and updates, and failed saves. The backend and Gemini inference path are unchanged; no live AI quota was consumed. Earlier API/Python verification below is retained as historical evidence rather than rerun for this UI change.

## Windows 95 desktop verification

Replaced the page header/navigation with a teal computer desktop, single-click application icons, independently mounted windows and a functional Start menu/taskbar. The desktop resides in the shared root layout so URL navigation preserves forms, selected uploads and window state. Added title-bar minimize/maximize/restore/close, title-bar dragging, desktop resizing, local SVG arrow/text/link/move cursors, classic scrollbars and a live time/date tray in the saved workspace time zone. Clock properties links to time-zone settings. Narrow screens retain window controls and the taskbar; printing includes the active window.

Type checking, lint and the webpack production web build passed after this change. All six browser workflows passed, including fixed-time clock/date verification and clock ticking, local cursor delivery, desktop launch, drag/maximize/restore, taskbar minimize/restore/switch, independent form inputs, Start/Show desktop, close behavior, preserved state across application/result URL navigation and 390px layout. Screenshots are .runtime/computer-desktop.png, .runtime/computer-windows.png and .runtime/computer-mobile.png. The existing PPE and machinery fixture workflows also passed. Backend inference was unchanged by the desktop redesign, and no live Gemini calls were needed for these UI checks.

## Research-based workspace verification

The current redesign follows the [primary-source research and design notes](UX_RESEARCH.md). Human analysis uses an Explorer-style current-file list, a large photograph preview with natural-size zoom, a work-activity field and a classic required-equipment dialog with draft/apply/cancel behavior. Machinery analysis uses a separate assessment brief with task focus, task/model and disclosed material/environment fields beside its photograph. Large introductory panels and feature lists were removed. The locally bundled OFL-licensed WIN95FA font recreates MS Sans Serif without proprietary Windows assets or a remote font service.

Current-batch per-ID queries show queued/analyzing/complete/failed states and progress, stop on terminal results and scale intervals with batch size. Saved inspection lists and their polling remain exclusive to History. Machinery precautions can be filtered by phase on screen; print and JSON reports preserve all phases. FileList is still snapshotted before native-input clearing. Input context, requirements and selected photographs survive window switching/minimizing.

All seven browser workflows, workspace type checking, ESLint/Prettier, the final webpack production web build, secret scanning, whitespace checks and service health passed. Browser checks include dialog cancellation, natural-size zoom, small-window control visibility, precaution filtering/printing, current-batch terminal states and stopping finished-job polling. Screenshots are .runtime/human-researched-desktop.png, .runtime/machinery-researched-desktop.png and their mobile counterparts. Additional manual checks used the existing public lathe photo and the requirements dialog: .runtime/machinery-real-photo-ui.png and .runtime/human-requirements-dialog.png. Browser fixtures verify the workflows without consuming Gemini quota. UI verification does not establish model recognition accuracy.

## Machinery feature verification

The existing Inspect workflow now automatically analyzes machinery, including photos without people. Optional activity/model/material context is saved with each inspection and supplied to Gemini. Results retain identity uncertainty, visible versus typical hazards, conditional operator PPE/wearables, phased precautions, limitations and questions. New results use safety-v2; historical inventories remain readable.

A real workshop-lathe photo completed upload, live Gemini inference and database persistence. The model identified a metalworking lathe with no people, returned three hazards, seven precautions across all four phases and five operator wearables, including an avoid-during-operation glove recommendation. The supplied context was retained. The page rendered at 1440px desktop and 390px mobile without horizontal overflow. This single example verifies integration, not exhaustive guidance or model accuracy. Temporary verification zones, inspections, images and sessions were removed. Evidence and screenshots are ignored artifacts in .runtime/machinery-verification.json and .runtime/machinery-live-\*.png. Photo: [Workshop lathe machine](https://commons.wikimedia.org/wiki/File:Workshop_lathe_machine.jpg), Sunnybansodeva, CC BY-SA 4.0.

Current checks passed:

- Type checking and ESLint/Prettier.
- 11 Node API/contract checks, with two provider-fixture-only checks intentionally skipped in the normal suite; 11 Python vision tests. Coverage includes activity-context transport/length validation, machinery-only results, duplicate IDs, malformed guidance, unsafe unconditional gloves and quota handling.
- Seven Playwright workflows: essential Windows 95 navigation at 390px; batch upload/full person inventories/reviews/reports/reanalysis; file validation/preferences; machinery upload/context, hazards, operator PPE, all precaution phases, machine switching and machinery JSON reports; the full desktop/window/taskbar/clock workflow; minimal job-specific layouts/dialogs/zoom/history-only records; and current-batch queued/processing/completed/failed transitions with terminal polling shutdown.
- API production build and web webpack production build using `NEXT_OUTPUT_DIR=.next-production pnpm --filter @safesight/web exec next build --webpack`. The standard Turbopack build previously encountered environment worker-port restrictions.
- Frontend/log secret scan, git whitespace checks and service health.

Earlier full local HTTP-provider integration verified private normalized images, saved checklist coverage, protected mutations, facility isolation, append-only reviews, independent reanalysis, image deletion and exports without consuming live quota. The fixture now includes the required empty machines array. Revised context-preservation assertions in the two fixture-only checks were not rerun against that provider during the machinery change; the live machinery smoke test verified context persistence. Earlier workspace acceptance and Compose configuration checks passed; Compose images were not built/run for this feature.

## Reproduce provider integration without quota

Stop the development application first. In separate terminals:

```bash
python3 tests/fixtures/gemini-server.py
```

```bash
GEMINI_API_KEY=test-fixture-only GEMINI_BASE_URL=http://127.0.0.1:8270 pnpm dev
```

Once services are ready:

```bash
TEST_VISION_PROVIDER=mock pnpm test
```

The local provider returns labelled test observations and never analyzes real images. It is not called by normal setup or startup. Stop both test processes and restart normal `pnpm dev` afterward. Fixtures are not provider accuracy evidence. Integration tests clean their own isolated database records and uploaded images.

## External limits

Live provider access and a successful image request are verified. PPE and machinery recognition/guidance accuracy, sustained quota availability and the Google project's billing status remain unverified. Keep project billing disabled for free-tier usage. Configuration readiness alone still does not verify provider access. Cloudinary, real-device access, deployment TLS/backups and representative image evaluation require their respective environments.
