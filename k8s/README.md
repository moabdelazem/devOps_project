# Kubernetes Manifests & Tasks

## Tasks

### Criteria for Our Manifests

- [x] Use a StatefulSet for PostgreSQL database
- [x] Use separate manifests for database and API deployments
- [x] Define Services for internal and external access
- [x] Use ConfigMaps and Secrets for environment variables and sensitive data
- [x] Use Sealed Secrets for secure management of sensitive data
- [x] Set resource requests and limits for CPU and memory
- [x] Implement readiness and liveness probes for API and database
- [x] Use labels and selectors for organization and service discovery
- [x] Enable logging and monitoring annotations if needed
- [x] Support scaling via Deployment replicas
- [x] Network policies for security between pods
