import time
import boto3
import pynvml
from sqs_listener import SQSListener

def get_gpu_usage():
    pynvml.nvmlInit()
    handle = pynvml.nvmlDeviceGetHandleByIndex(0)
    mem_info = pynvml.nvmlDeviceGetMemoryInfo(handle)
    gpu_usage = mem_info.used / mem_info.total
    pynvml.nvmlShutdown()
    return gpu_usage

# AI SQS Request listener
class SQSRequestListener(SQSListener):

    def handle_message(self, body, attributes, messages_attributes):
        if self.is_gpu_available():
            self.process_tryon_request(body)
        else:
            # Re-enqueue the message with a delay if GPU is busy
            self.reenqueue_message(body, delay=60)

    def is_gpu_available(self):
        return get_gpu_usage() < 0.8  # example threshold

    def process_tryon_request(self, body):
        # Process the try-on request
        pass

    def reenqueue_message(self, body, delay):
        sqs.send_message(QueueUrl=queue_url, MessageBody=body, DelaySeconds=delay)

if __name__ == "__main__":
    sqs = boto3.client('sqs')
    queue_url = 'https://sqs.us-east-1.amazonaws.com/471112843831/ai_service_queue'
    listener = SQSRequestListener(queue_url, region_name='us-east-1')
    listener.listen()