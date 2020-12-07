REGISTRY_ID=oximeter_registry
PUBSUB_TOPIC=oximeter-events
PUBSUB_SUB=oximeter-subscription
CLOUD_REGION=us-central1
GCLOUD_PROJECT=$(gcloud config list project --format "value(core.project)")

echo "Authorizing Firebase..."

firebase login --no-localhost

echo "Creating the pub sub topic..."

gcloud pubsub topics create $PUBSUB_TOPIC

echo "Creating the pub sub subscription..."

gcloud pubsub subscriptions create $PUBSUB_SUB --topic=$PUBSUB_TOPIC

echo "Creating the IoT Container Registry..."

gcloud iot registries create $REGISTRY_ID --region=$CLOUD_REGION --event-notification-config=subfolder="",topic=$PUBSUB_TOPIC

echo "Initialized!"
