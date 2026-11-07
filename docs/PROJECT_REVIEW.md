# Project review

Reviewed the web interface, API/session handling, schema and migrations, worker, inference, upload/storage adapters, setup/Compose, contracts and tests.

- Replaced helmet/vest detection with Gemini vision inference: arbitrary equipment names, per-person inventories, worn/carried/uncertain states, evidence, required-item checks and visibility notes. Clothing is distinguished from PPE; welding helmets are distinguished from hardhats.
- Configured Gemini 3.1 Flash-Lite with the free API tier. Use a key from a project with billing disabled. Quota failures are explicit, with no automatic paid fallback.
- Added automatic machinery identification, observed versus typical hazards, phased precautions, operator PPE/wearable recommendations and confirmation questions. Optional activity/model/material context is saved per inspection. Machinery-only photos work without person findings. Entanglement warnings and conditional glove recommendations are kept visible.
- Rebuilt the UI with teal desktop surfaces, gray raised/sunken controls, navy title bars, square edges, custom pixel icons, classic typography and a taskbar. Mobile layouts and keyboard focus remain usable.
- Replaced page navigation with desktop application icons for Human analysis, Machinery analysis, Inspection history and Settings. Added persistent open windows, dragging/resizing, minimize/maximize/restore/close, a working Start menu/taskbar, local retro cursors and a live time/date tray. Removed the sidebar, dashboards, maps, charts, environmental simulator, incidents, QR and account workflows from the active application/API.
- Removed ONNX/Ultralytics runtimes, model installers, schematic inference fixtures and unused chart/form/QR dependencies. Fresh setup performs no PPE training or model downloads.
- Preserved anonymous sessions, origin/CSRF protection, facility isolation, private normalized images, persistent jobs, bounded retries, append-only review and exports.
- Saved generic equipment requirements per image, with an inventory-only option. Added reanalysis that creates a separate image copy and inspection without changing earlier evidence.
- Retained historical records and database tables. Earlier detector results are labelled explicitly. No existing photo or inspection was deleted as part of the redesign.

The user-configured Gemini key remains server-only in ignored .env. Live provider access and the full upload/analysis/persistence workflow were verified using a blank image and a real public lathe photograph. Machinery results rendered on desktop and mobile. PPE and machinery accuracy have not been benchmarked. A photograph cannot supply an exhaustive safety assessment or replace manuals, risk assessment or operator training. HTTP/browser fixtures validate integration behavior, not recognition accuracy. Quota and regional availability are controlled by Google; billing status cannot be verified by this app. Free-tier images may be used to improve Google's products.

The shared workspace has no individual identity by design. Cloudinary remains optional and unverified without credentials. TLS, backups, network access and representative image evaluation are deployment-specific work.

See [BUILD_STATUS](BUILD_STATUS.md) and [EVALUATION](EVALUATION.md).
