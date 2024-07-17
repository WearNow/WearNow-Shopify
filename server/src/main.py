import json
import sys
import asyncio
import time
import boto3
import threading
from fastapi import FastAPI
from loguru import logger
from src.doc import TAGS_METADATA
from src.config import app_configs
from starlette.middleware.cors import CORSMiddleware
from src.auth.router import router as auth_router
from src.core.router import router as core_router
from src.core.utils.hasura_helpers import client
from src.core.utils.utils import create_or_update_user_stat

SWAP_RESULT_SQS_QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/471112843831/faceswap_result.fifo"
AI_SERVICE_RESULT_QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/471112843831/ai_service_result.fifo"

# Init Fast API
app = FastAPI(**app_configs, openapi_tags=TAGS_METADATA)

# Setup Logger
logger.remove()  # Remove default logger
logger.add(
    sys.stdout,
    colorize=False,
    enqueue=True,
    format="{level} {extra[request_id]} {extra[client_ip]} {extra[request_path]} {extra[user_id]}: {message}",
)  # Add stdout logger

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
def read_root():
    return {"Wearnow API": "v1"}


def poll_ai_sqs_queue():
    sqs = boto3.client('sqs')
    while True:
        try:
            # Receive message from SQS queue
            response = sqs.receive_message(
                QueueUrl=AI_SERVICE_RESULT_QUEUE_URL,
                MaxNumberOfMessages=1,
                WaitTimeSeconds=10  # Long polling
            )

            messages = response.get('Messages', [])
            print("messages garment: ", messages)
            if messages:
                for message in messages:
                    try:
                        # message_id = message["MessageId"]
                        result_body = json.loads(message["Body"])
                        request_id = result_body["user_id"]
                        updated_request = client.update_product_image_request(
                            request_id, json.dumps(result_body))
                        prod_request_object = client.get_prod_photo_request_obj(
                            request_id)
                        print("prod_request_object: ", prod_request_object)

                        if len(result_body["results"]) > 0:
                            client.create_prod_photo_history({
                                "gender": "female",
                                "generated_image": result_body["results"][0],
                                "request_id": request_id,
                                "size": "",
                                "skin_composition": "",
                                "store_product_id": prod_request_object["data"]["product_image_generation_request_by_pk"]["store_product_id"]
                            })
                            print("Rquest updated sucessfully: ",
                                  updated_request)
                        # # Delete message after processing
                        sqs.delete_message(
                            QueueUrl=AI_SERVICE_RESULT_QUEUE_URL,
                            ReceiptHandle=message['ReceiptHandle']
                        )
                    except Exception as e:
                        print(f"Failed to process message: {e}")
            else:
                print("No messages in queue. Waiting...")
            # await asyncio.sleep(1)
        except Exception as e:
            print("Error recieving SQS mesage: ", e)

        time.sleep(1)  # Polling interval


def poll_sqs_queue():
    sqs = boto3.client('sqs')
    while True:
        try:
            # Receive message from SQS queue
            response = sqs.receive_message(
                QueueUrl=SWAP_RESULT_SQS_QUEUE_URL,
                MaxNumberOfMessages=1,
                WaitTimeSeconds=10  # Long polling
            )

            messages = response.get('Messages', [])
            print("messages swap: ", messages)
            if messages:
                for message in messages:
                    try:
                        print("Recived Message: ", message)
                        message_id = message["MessageId"]
                        result_body = json.loads(message["Body"])
                        request_id = result_body["user_id"]
                        print("#"*100)
                        print("message_id: ", message_id)
                        print("result body: ", result_body)
                        print("#"*100)
                        print("request_id: ", request_id)
                        # TODO: update specific vto request and add to history
                        updated_request = client.update_vto_request(
                            request_id, json.dumps(result_body))
                        print("Rquest updated sucessfully: ", updated_request)
                        # create_or_update_user_stat(1, None, store_id)
                        # store_id = prod_request_object["data"]["product_image_generation_request_by_pk"]["store_id"]
                        # create_or_update_user_stat(1, None, store_id)

                        # Delete message after processing
                        sqs.delete_message(
                            QueueUrl=SWAP_RESULT_SQS_QUEUE_URL,
                            ReceiptHandle=message['ReceiptHandle']
                        )
                    except Exception as e:
                        print(f"Failed to process message: {e}")
            else:
                print("No messages in queue. Waiting...")
            # await asyncio.sleep(1)
        except Exception as e:
            print("Error recieving SQS mesage: ", e)

        time.sleep(1)  # Polling interval


@app.on_event("startup")
async def startup_event():
    thread = threading.Thread(target=poll_sqs_queue, daemon=True)
    thread.start()

    thread2 = threading.Thread(target=poll_ai_sqs_queue, daemon=True)
    thread2.start()
    print("Started SQS listener thread for AI_SERVICE_RESULT_QUEUE_URL")
    print("started SQS listener thread")
    # asyncio.create_task(poll_sqs_queue())

app.include_router(auth_router, prefix="/api", tags=["Authentication"])
app.include_router(core_router, prefix="/api", tags=["Store"])
