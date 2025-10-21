<div style="background: #1a237e; color: #fff; padding: 32px 0; text-align: center; border-radius: 8px; margin-bottom: 32px; box-shadow: 0 2px 8px rgba(26,35,126,0.15);">
  <h1 style="font-size: 2.8em; margin: 0; font-family: 'Segoe UI', Arial, sans-serif; letter-spacing: 2px;">DevOps Project</h1>
  <p style="font-size: 1.3em; margin-top: 12px; font-family: 'Segoe UI', Arial, sans-serif;">A modern workflow for containerized web applications with Kubernetes, CI/CD, and secure secrets management</p>
</div>

This project demonstrates a complete DevOps workflow for deploying a modern web application with containerization, orchestration, and automation best practices.

## Overview

The project consists of a RESTful API built with Node.js, TypeScript, and Express that performs CRUD operations on a PostgreSQL database. The entire stack is containerized using Docker and orchestrated with Kubernetes, implementing industry-standard practices for security, monitoring, and continuous integration/deployment.

## Architecture

### Components

**Backend API:**

- Built with Node.js, TypeScript, and Express
- RESTful endpoints for item management
- Connection pooling with PostgreSQL
- Structured logging with Winston
- Error handling middleware
- Production-ready Dockerfile with multi-stage builds

**Database:**

- PostgreSQL 16
- Deployed as a StatefulSet for data persistence
- Initialization scripts for schema setup
- Persistent volume claims for data storage

**Infrastructure:**

- Kubernetes manifests for deployment, services, and configurations
- Sealed Secrets for secure credential management
- Resource limits and requests for optimal performance
- Health checks with liveness and readiness probes

## Tasks

### Completed

- [x] Create simple RESTful API using Node.js and Express that interacts with a PostgreSQL database
- [x] Deploy the application to a Kubernetes cluster using regular Kubernetes manifests
- [x] Use Sealed Secrets Operator for secure management of sensitive data
- [x] Integrate the node prom-client library into the API for exposing metrics
- [x] Implement CI/CD pipeline using Jenkins to automate testing and deployment

### In Progress

- [ ] Set up monitoring and logging using Prometheus and Grafana
- [ ] Document the entire process, including architecture diagrams, setup instructions, and usage guidelines
- [ ] Write unit and integration tests for the API
- [ ] Write client-side code to interact with the API with React.js

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Kubernetes cluster (minikube, kind, or cloud provider)
- kubectl CLI tool
- Sealed Secrets controller installed in cluster

### Local Development

Run the application locally using Docker Compose:

```bash
docker-compose up -d
```

This starts both the PostgreSQL database and API in isolated containers with a shared network.

### Kubernetes Deployment

Deploy to Kubernetes cluster:

```bash
# Apply database manifests
kubectl apply -f k8s/database/

# Apply API manifests
kubectl apply -f k8s/api/

# Verify deployments
kubectl get pods
kubectl get services
```

### Environment Variables

Configure the following environment variables in `.env` file:

```
DB_HOST=db
DB_PORT=5432
DB_USER=itemuser
DB_PASSWORD=itemuser_pass
DB_NAME=items
PORT=3000
NODE_ENV=production
```
