# Third-party components

Dependencies are pinned in pnpm-lock.yaml and services/inference/requirements.lock. The active stack uses Next.js/React, TanStack Query, NestJS/Express, Drizzle/PostgreSQL, Sharp, FastAPI, Pydantic, Pillow and Uvicorn. Their upstream licenses apply.

The retro visual treatment uses original CSS and custom SVG pixel icons. The interface bundles Alina Sava's WIN95FA/W95FA recreation font from @fontsource/win95fa 5.3.0 under SIL Open Font License 1.1. The unmodified WOFF2, full license and attribution are in apps/web/public/fonts/. [Font/source](https://fontsource.org/fonts/win95fa), [author publication](https://fontsarena.com/w95fa-by-alina-sava/). No proprietary Microsoft font or system image assets are bundled. Unused shadcn components, chart/form/icon libraries and QR dependencies are removed.

Inference uses [Google Gemini image understanding](https://ai.google.dev/gemini-api/docs/generate-content/image-understanding) and validated structured output. [Google pricing](https://ai.google.dev/gemini-api/docs/pricing) lists a free tier for the default gemini-3.1-flash-lite. Quota, availability and terms may change. Keep project billing disabled. Free-tier content may be used to improve Google's products.

The previous SafetyVision/Ultralytics runtime and installers are removed. Previously downloaded weights may remain in ignored local models/, and old results retain modelVersion. No weights are loaded or training performed. Explicit test responses are never used by application inference.
