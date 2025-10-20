# Kubernetes Manifests & Tasks

## Tasks

### Criteria for Our Manifests

- [x] Use a StatefulSet for PostgreSQL database
- [x] Use separate manifests for database and API deployments
- [ ] Define Services for internal and external access
- [x] Use ConfigMaps and Secrets for environment variables and sensitive data
- [x] Use Sealed Secrets for secure management of sensitive data
- [x] Set resource requests and limits for CPU and memory
- [ ] Implement readiness and liveness probes for API and database
- [ ] Use labels and selectors for organization and service discovery
- [ ] Enable logging and monitoring annotations if needed
- [ ] Support scaling via Deployment replicas
- [ ] Network policies for security between pods

### Implementation Tasks

- [x] Create StatefulSet manifest for PostgreSQL database
- [x] Create PersistentVolume and PersistentVolumeClaim for database storage
- [ ] Create Deployment manifest for API service
- [ ] Create Service manifests for both API and database
- [ ] Set up ConfigMap and Secret for environment variables
- [ ] Create and apply Sealed Secrets for sensitive data
- [ ] Add resource requests and limits to deployments
- [ ] Implement readiness and liveness probes
- [ ] Configure network policies for pod communication
- [ ] Document all manifests and configurations
