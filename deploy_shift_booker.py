from brainbase_labs import BrainbaseLabs
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Create a single client instance
client = BrainbaseLabs(
    api_key=os.environ.get("BB_API_KEY"),
)

# List existing integrations
# integrations = client.team.integrations.list()
# print(integrations)

raw_phone_number = "+18885645271"

# Uncomment if you need to register the phone number
# phone_number = client.team.assets.register_phone_number(
#     phone_number=raw_phone_number,
#     integration_id=integrations[0].id
# )

worker = client.workers.create(name="RIT Form Agent", description="An assistant that collects information for the RIT survey", status="active")

flow = client.workers.flows.create(
    worker_id=worker.id,
    name="RIT Form Agent",
    path="./shift_booker.based",
    label="v1",
    validate=True  # Adding the required validate parameter
)

voice_deployment = client.workers.deployments.voice.create(
    worker_id=worker.id,
    name="RIT Form Agent Voice Deployment",
    flow_id=flow.id,
    phone_number=raw_phone_number,
    config={}
)

if voice_deployment:
    print(f"Successfully deployed RIT Form Agent to {voice_deployment.phone_number}")
else:
    print("Failed to deploy RIT Form Agent")