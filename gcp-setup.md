
# Google Cloud Platform Migration Guide

This document outlines the steps to migrate this application to Google Cloud Platform.

## Prerequisites

1. Create a Google Cloud Platform account
2. Install Google Cloud SDK
3. Create a new GCP project
4. Enable required APIs:
   - Cloud Run
   - Cloud SQL
   - Cloud Storage
   - Artifact Registry

## Migration Steps

### 1. Set up MongoDB on GCP

You have two options:
- **MongoDB Atlas**: Create a cluster and connect to it
- **Cloud SQL**: Use PostgreSQL and migrate the schema (requires code changes)

### 2. Set up Environment Variables

Store your environment variables in Google Cloud Secret Manager:
- JWT_SECRET
- MONGODB_URI or database connection details

### 3. Create a Dockerfile

```dockerfile
FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
```

### 4. Deploy to Cloud Run

```bash
# Build and push container
gcloud builds submit --tag gcr.io/PROJECT_ID/focus-cubes

# Deploy to Cloud Run
gcloud run deploy focus-cubes \
  --image gcr.io/PROJECT_ID/focus-cubes \
  --platform managed \
  --region REGION \
  --allow-unauthenticated
```

### 5. Set Up CI/CD with Cloud Build

Create a cloudbuild.yaml file in your repository:

```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/focus-cubes', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/focus-cubes']
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: 'gcloud'
    args: ['run', 'deploy', 'focus-cubes', '--image', 'gcr.io/$PROJECT_ID/focus-cubes', '--region', 'us-central1', '--platform', 'managed', '--allow-unauthenticated']
```

### 6. Domain Configuration

1. Register a domain or use an existing one
2. Configure the domain in Cloud Run
3. Set up SSL certificates (managed automatically by Google)

### 7. Monitoring and Analytics

1. Set up Cloud Monitoring dashboards
2. Enable Cloud Logging
3. Consider adding Google Analytics for user tracking
