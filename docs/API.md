# API

Use `/api` through the same-origin proxy. OpenAPI: `/api/docs`. `GET /auth/me` creates or returns an anonymous session. Mutations require its cookie, same Origin and X-CSRF-Token. There is no login or role API.

| Endpoint                        | Purpose                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| GET /health                     | Database availability and nonsecret inference configuration                          |
| GET /auth/me                    | Workspace, preferences and CSRF token                                                |
| GET /workspace                  | Default inspection location identifier and vision status                             |
| GET /events                     | Session-validated SSE changes and heartbeats                                         |
| GET /inspections                | History: page, limit (1–100), status, search, optional zoneId                        |
| POST /inspections               | Multipart image, zoneId, optional requiredEquipment JSON string and operationContext |
| GET /inspections/:id            | Immutable analysis and review history                                                |
| GET /inspections/:id/image      | Private normalized PNG                                                               |
| DELETE /inspections/:id/image   | Remove finished photo, retaining evidence                                            |
| POST /inspections/:id/retry     | Failed job retry, fewer than three attempts                                          |
| POST /inspections/:id/reanalyze | Independent copied image and new job                                                 |
| POST /inspections/:id/reviews   | Append findings and required 3–2000 character note                                   |
| GET /settings                   | Preferences, storage adapter and inference status                                    |
| PATCH /settings                 | Name and IANA time zone                                                              |
| GET /exports/inspections        | CSV: range=1h/24h/7d, optional zoneId, maximum 10,000 rows                           |

Uploads: one image/request, 8 MB, 20 MP, minimum 32 × 32, JPEG/PNG/WebP magic bytes, no animation. Batch files use independent requests. Required checklist: up to 20 unique names, 100 characters each. An empty array requests inventory only. Optional operationContext: trimmed text up to 1000 characters, saved in requirements and copied on reanalysis. Legacy helmetRequired/vestRequired request fields remain compatible.

Vision results include analysisType=vision, provider, modelVersion, promptVersion, summary, dimensions, timing, warnings and findings. Each person includes description, equipment, requiredChecks and limitations. Equipment statuses: worn/carried/uncertain. Check statuses: observed/not_observed/uncertain. Legacy helmet/vest fields default to unknown; inventory screens ignore them. Vision detections is empty.

New analyses use promptVersion=safety-v2 and include machines (an empty array means no machinery identified). Each machine has machineId, name, identification (identified/likely/uncertain), description, entanglementRisk, hazards, precautions, recommendedWearables, limitations and questions. Hazard basis is visible/typical; precaution phase is before_use/operation/maintenance/emergency. Wearable category is ppe/clothing/safety_device and usage is recommended/task_dependent/avoid_during_operation, with purpose and condition. Duplicate machine IDs and unconditional glove recommendations for flagged entanglement risks fail validation. Historical results may lack machines. Machinery-only images remain valid with findings=[].

Provider/key/quota failures are explicit. Configuration readiness does not verify provider access. No response contains the API key, inference secret or storage key. Prior environmental, simulator, incident, login and QR endpoints return 404.
