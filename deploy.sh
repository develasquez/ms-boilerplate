#!/bin/bash

export $(grep -v '^#' .env_deploy | xargs)
export NOW=$(date '+%Y%m%d%H%M%S')
export IMAGE=$1

export SED_STRING="s/{SERVICE_NAME}/$SERVICE_NAME/g;s/{CLUSTER_NAME}/$CLUSTER_NAME/g;s/{REGION}/$REGION/g;s/{CICD_PROJECT_ID}/$CICD_PROJECT_ID/g;s/{BUILD_POOL}/$BUILD_POOL/g;s/{SA_NAME}/$SA_NAME/g;s/{DEV_CLUSTER_PROJECT_ID}/$DEV_CLUSTER_PROJECT_ID/g;s/{QA_CLUSTER_PROJECT_ID}/$QA_CLUSTER_PROJECT_ID/g;s/{PROD_CLUSTER_PROJECT_ID}/$PROD_CLUSTER_PROJECT_ID/g;"

sed $SED_STRING clouddeploy_template.yaml > clouddeploy.yaml;

gcloud deploy apply \
  --project=$CICD_PROJECT_ID \
  --region=$REGION \
  --file=clouddeploy.yaml

gcloud deploy releases create $SERVICE_NAME-release-$NOW \
  --project=$CICD_PROJECT_ID \
  --region=$REGION \
  --delivery-pipeline=$SERVICE_NAME-pipeline \
  --images container-image=$IMAGE
