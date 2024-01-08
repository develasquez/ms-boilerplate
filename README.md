# Ms Description

Some Description

## Getting Started

To get started with this microservice, follow these steps:

### Prerequisites

- Docker
- Access to a Google Cloud Platform (GCP) account with BigQuery and Redis instances.
- The latest version of `gcloud` CLI tool, configured with your GCP account.

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-organization/ms-boilerplate.git
cd ms-boilerplate
```

### Build the Docker image:

```sh
docker build -t ms-boilerplate .
```

### Run the Docker container:

```sh
docker run -d -p 8080:8080 ms-boilerplate
```
### Configuration
Edit the .env file to include your GCP credentials:

```sh
```