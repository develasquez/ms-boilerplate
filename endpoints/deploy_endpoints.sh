#!/bin/bash

export $(grep -v '^#' .env_deploy | xargs)

export SED_STRING="s/{SERVICE_NAME}/$SERVICE_NAME/g;s/{PROJECT_ID}/$_PROJECT_ID/g;"

sed $SED_STRING endpoints/openapi.yaml > openapi_generated.yaml;

gcloud endpoints services deploy openapi_generated.yaml --project=$_PROJECT_ID
