import json
import time
import boto3
import uuid
import pynvml
# from sqs_listener import SQSListener
from pydantic import BaseModel


# class GarmentObject(BaseModel):
#     model_image: str
#     mask_image: str
#     garment_image: str
#     garment_type: str


SWAP_QUEUE = "https://sqs.us-east-1.amazonaws.com/471112843831/faceswap.fifo"
GARMENT_QUEUE = "https://sqs.us-east-1.amazonaws.com/471112843831/ai_service.fifo"


class SQSHandler:
    def __init__(self, message_id, source_image, target_image, user_id, garment_object, request_type) -> None:
        self.message_id = message_id
        self.source_image = source_image
        self.user_id = user_id
        self.target_image = target_image
        self.garment_object = garment_object
        self.request_type = request_type
        if self.request_type == "swap":
            self.queue_url = SWAP_QUEUE
        else:
            self.queue_url = GARMENT_QUEUE

    def get_swap_object(self):
        return {
            "message_id": self.message_id,
            "user_id": self.user_id,
            "source_image": self.source_image,
            "target_image": self.target_image
        }

    def get_garment_object(self):
        return {
            "message_id": self.message_id,
            "user_id": self.user_id,
            "model_image": self.garment_object["model_image"],
            "mask_image": self.garment_object["mask_image"],
            "garment_image": self.garment_object["garment_image"],
            "garment_type": self.garment_object["garment_type"],
            "background_image": self.garment_object["background_image"]
        }

    def format_message_attributes(self, obj):
        return {k: {"DataType": "String", "StringValue": v} for k, v in obj.items()}

    def send_message(self):
        sqs = boto3.client('sqs')
        obj = self.get_swap_object() if self.request_type == "swap" else self.get_garment_object()
        message_attributes = self.format_message_attributes(obj)

        response = sqs.send_message(
            QueueUrl=self.queue_url,
            MessageGroupId="message_id1",
            # Required for FIFO queues
            MessageDeduplicationId=str(uuid.uuid4()),
            MessageBody=json.dumps(obj)
        )
        return response
