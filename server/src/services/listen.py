import boto3

# Create SQS client
sqs = boto3.client('sqs')

queue_url = 'https://sqs.us-east-1.amazonaws.com/471112843831/faceswap_result.fifo'

# Receive message from SQS queue
response = sqs.receive_message(
    QueueUrl=queue_url,
    AttributeNames=[
        'SentTimestamp'
    ],
    MaxNumberOfMessages=1,
    MessageAttributeNames=[
        'All'
    ],
    VisibilityTimeout=0,
    WaitTimeSeconds=0
)

message = response['Messages'][0]
receipt_handle = message['ReceiptHandle']

# Delete received message from queue
# sqs.delete_message(
#     QueueUrl=queue_url,
#     ReceiptHandle=receipt_handle
# )

# S3 Proper url formatting
# https://wearnow-storage.s3.amazonaws.com/userdata/generated/face/test+id/410fac59-6a44-4a61-b249-a03c634a5ddf.jpg

print(message)
print('Received message: %s' % message)
response:  {'MD5OfMessageBody': 'dadf3c208a818c429c9f1b1a69a97144', 'MessageId': 'c34f47dc-ca4f-41d3-906c-8f76eead4a6a', 'SequenceNumber': '18886816930747119616', 'ResponseMetadata': {'RequestId': '6e9f073a-17a9-58c1-87c0-59ca728cea75', 'HTTPStatusCode': 200, 'HTTPHeaders': {'x-amzn-requestid': '6e9f073a-17a9-58c1-87c0-59ca728cea75', 'date': 'Sat, 22 Jun 2024 05:36:37 GMT', 'content-type': 'text/xml', 'content-length': '431', 'connection': 'keep-alive'}, 'RetryAttempts': 0}}
{'MessageId': '0c0c321d-89ce-4ace-98e5-46923b7e0231', 'ReceiptHandle': 'AQEBnUX8pciRq5fSCzfEcwbbCYI+AYEG/xC0JPbeQQ8oWlfRqEspOVs5F1yWhcfNBj22Lp1sMRQvEH+Fri6M1BxXSRBZAmHtVX1emvey/AGBMV+IZG3IvtZIM2rsQUvGjrgE28h2xfhuCoA+57+oBx+VlTojSMXfD7iPmF/jiwu5kAleNs00BKQXrJxddunXmu3oM2tgJnq6Av9pA7MdFMwVb3wUr5i1ewN/W59CYC70uwkEHrhfNhVFtzQkRRhsY1VtUpfO88S5RmHP2DsCXJo5BEyytp5y3QrI0sEisviwqp4=', 'MD5OfBody': '4b9f38babe2f8c859c284da7ea8758b8', 'Body': '{"message_id":"2a1a2a9a-ca2a-4aa0-b06d-8dc2bf13796c","user_id":"test_id","success":true,"error_message":"","results":["https://storage.wearnow.io/userdata/generated/face/test_id/fbdc1b8c-71aa-4949-bcf9-8c5a374eef7c.jpg"]}', 'Attributes': {'SentTimestamp': '1719022814478'}}