import boto3
from ...config import settings


def send_sns_message(subject, message):
    # Initialize the SNS client
    sns_client = boto3.client('sns',
                              aws_access_key_id=settings.AWS_SERVER_PUBLIC_KEY,
                              aws_secret_access_key=settings.AWS_SERVER_SECRET_KEY,
                              region_name=settings.REGION_NAME)

    # The ARN of the topic to which the email is subscribed
    # Replace with your topic ARN
    topic_arn = 'arn:aws:sns:us-east-1:471112843831:QueueNotifier'

    # Subscribe an email address to the topic
    # sns_client.subscribe(
    #     TopicArn=topic_arn,
    #     Protocol='email',
    #     Endpoint='bdere12345@gmail.com',
    # )

    # Send a message
    response = sns_client.publish(
        TopicArn=topic_arn,
        Subject=subject,
        Message=message
    )
    print(f'Message ID: {response["MessageId"]}')


# if __name__ == "__main__":
#     main()
