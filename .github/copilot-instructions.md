# Copilot Instructions for devOps_project

## Big Picture Architecture

- The project is a full-stack, containerized web application with a TypeScript/Express REST API (`server/`) and a PostgreSQL database, orchestrated via Kubernetes (`k8s/`).
- API and database are deployed as separate services. The database uses a StatefulSet for persistence and initialization via ConfigMap.
- Secrets are managed using Sealed Secrets for secure Kubernetes integration.
- The client (React) is planned but not yet implemented.

## Critical Developer Workflows

- **Local development:**
  - Use `docker-compose up -d` to start API and database locally.
  - Use `.env` for environment variables (never commit secrets).
  - API hot-reloads with `npm run dev`.
- **Build & Production:**
  - Build TypeScript with `npm run build`.
  - Run production server with `npm start`.
- **Linting:**
  - Use `npm run lint:fix` for auto-fixing code style.
- **Kubernetes:**
  - Apply manifests in `k8s/database/` and `k8s/api/` for cluster deployment.
  - Use Sealed Secrets for sensitive data (`sealed-secret-*.yaml`).
  - Database service name is `postgres-database-svc` (not `postgres-service`).
- **Testing:**
  - Unit/integration tests are planned; follow async/await and error handling conventions.

## Project-Specific Conventions

- **Error Handling:**
  - Always use the `ApiError` class for errors in controllers. Never send raw status codes.
  - Pass errors to Express with `next(error)`.
- **Database Access:**
  - Use the singleton pool from `dbConnect()` in `src/config/db.ts`.
  - All queries are parameterized; no ORM is used.
- **Logging:**
  - Use Winston for app logs and Morgan for HTTP logs. Never use `console.log`.
- **File Naming:**
  - Kubernetes manifests use resource-type and component naming, e.g. `statefulset-postgres.yaml`, `deployment-api.yaml`, `sealed-secret-database.yaml`.
- **Secrets:**
  - Raw secrets are ignored via `.gitignore`; only Sealed Secrets are tracked.

## Integration Points & Patterns

- **API ↔ Database:**
  - API connects to database using env vars from Kubernetes secrets/configs.
- **Kubernetes:**
  - StatefulSet for database, Deployment for API, Services for communication.
  - PersistentVolumeClaim for database storage.
  - ConfigMap for init SQL script.
- **CI/CD:**
  - Jenkins pipeline planned for automated testing and deployment.
- **Monitoring:**
  - Prometheus integration planned via `prom-client` in API.

## Key Files & Directories

- `server/src/` - API source code
- `server/src/config/db.ts` - Database connection logic
- `server/src/utils/apiError.ts` - Error handling class
- `server/src/utils/logger.ts` - Winston logger config
- `k8s/database/statefulset-postgres.yaml` - PostgreSQL StatefulSet
- `k8s/database/service-postgres.yml` - Database service
- `k8s/api/deployment-api.yaml` - API deployment
- `k8s/api/service-api.yaml` - API service
- `k8s/database/sealed_secret*.yaml` - Sealed Secrets

## Examples

- To connect API to database in Kubernetes, set `DB_HOST: postgres-database-svc` in deployment manifest.
- To add a new error type, extend `ApiError` in `server/src/utils/apiError.ts`.
- To add a new endpoint, create a controller in `server/src/controllers/` and route in `server/src/routes/`.

---

If any conventions or workflows are unclear, please request clarification or examples from the user.
