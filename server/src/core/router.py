import json
from fastapi import APIRouter, Request
from .utils.hasura_helpers import client
from .schemas import StoreProductsOnboardingResponse, StoreProductsOnboardingInput, SingleStoreProductOutput, VTOImageOutPut
from ..services import SQSHandler
from .utils.utils import create_or_update_user_stat
from .utils.sns import send_sns_message

router = APIRouter()


@router.post("/test-stat-handler", status_code=201)
async def test_stat_handler(request: Request):
    store_id = "08f773d8-610a-4e65-b263-10dd1f042d04"
    create_or_update_user_stat(1, 1, store_id)


@router.post("/single-product-image-request", status_code=201)
async def handle_single_prod_request(request: Request):
    body = await request.body()
    body_str = body.decode()
    data = json.loads(body_str)["input"]["input"]
    # store_prod = client.get_store_product(data)
    print("DATA: ", data)
    public_state = data["public"]
    request_response = client.create_prod_request(
        data["store_id"], data["model"], data["store_product_id"], data["background"], public_state)
    c_uuid = request_response["data"]["insert_product_image_generation_request_one"]["uuid"]
    request_object = request_response["data"]["insert_product_image_generation_request_one"]
    print("request_object: ", request_object)
    # https://wearnow-storage.s3.amazonaws.com/testdata/mask.png
    empty_placeholder_store_prod = ""
    if not request_object["store_product"]:
        return SingleStoreProductOutput(tracking="", success=False)

    # print(request_object["store_product"]["images"])
    store_product_image = json.loads(request_object["store_product"]["images"].replace(
        "'", '"'))[0]["url"] if request_object["store_product"] else empty_placeholder_store_prod
    model_image = request_object["model"]["cover_image"] if request_object["model"] else ""
    model_image = request_object["model"]["cover_image"] if request_object["model"] else ""
    mask_image = request_object["model"]["mask_image"] if request_object["model"] else ""
    mask_background = request_object["background"]["image"] if request_object["background"] else ""

    garment_object = {
        "model_image": model_image,
        "garment_image": store_product_image,
        "mask_image": mask_image,
        "background_image": mask_background,
        "garment_type": "upper_clothing"
    }
    sqs_handler = SQSHandler(garment_object=garment_object, request_type="garment",
                             message_id="message_id1", source_image="https://res.cloudinary.com/dtabnh5py/image/upload/v1718561325/k3okplkalnhffvl924gc.jpg",
                             target_image="https://res.cloudinary.com/dtabnh5py/image/upload/v1718560366/aoudxkq8jnomacxw3n2w.jpg",
                             user_id=request_object["uuid"])
    response = sqs_handler.send_message()
    print("response: ", response)
    # print("store prod", store_prod)
    return SingleStoreProductOutput(tracking=c_uuid, success=True)


@router.post("/send-sns-message", status_code=201)
async def trigger_send_sns_message(request: Request):
    body = await request.body()
    body_str = body.decode()
    data = json.loads(body_str)["input"]["input"]
    print(data, ": DATA")
    # data = json.loads(body_str)["data"]
    subject = data["subject"]
    message = data["message"]
    send_sns_message(subject, message)
    print("Data: ", data)
    return True


@router.post("/single-vto-request", status_code=201)
async def handle_single_vto_request(request: Request):
    body = await request.body()
    body_str = body.decode()
    data = json.loads(body_str)["input"]["input"]
    print("input data: ", data)
    prod_request = client.get_prod_request(data["store_product_id"])
    prod_image_request = prod_request["data"]["product_image_generation_request"]
    if not prod_image_request:
        return VTOImageOutPut(request_id="", status="FAILED")

    if not prod_image_request[0]["results"]:
        return VTOImageOutPut(request_id="", status="FAILED")

    print("prod request: ", prod_image_request[0])
    prod_image_result_image = json.loads(
        prod_image_request[0]["results"])["results"]
    vto_request_response = client.create_vto_request(
        data["store_id"], data["store_product_id"], data["input_image"])
    vto_request_id = vto_request_response["data"]["insert_vto_image_generation_request_one"]["uuid"]
    print("VTO request: ", vto_request_id)
    # send SQS message
    sqs_handler = SQSHandler(garment_object={}, request_type="swap",
                             message_id="message_id1", source_image=data["input_image"],
                             target_image=prod_image_result_image[0] if len(
                                 prod_image_result_image) > 0 else "",
                             user_id=vto_request_id)
    response = sqs_handler.send_message()
    print("response: ", response)
    # request_response = client.create_vto_request(data["store_id"])
    # c_uuid = request_response["data"]["insert_product_image_generation_request_one"]["uuid"]
    # print("store prod", store_prod)
    return VTOImageOutPut(request_id=vto_request_id, status="PENDING")


@router.post("/request-vto", status_code=201)
async def handle_single_prod_image(request: Request):
    pass


@router.post("/store-onboarding", status_code=201)
async def handle_store_onboarding(request: Request):
    try:
        body = await request.body()
        body_str = body.decode()
        data = json.loads(body_str)["input"]["input"]
        products = data["products"]
        input_products = []
        # T
        for prod in products:
            payload = {
                "images": str(prod["photos"]),
                "price": str(prod["price"]),
                "product_id": prod["product_id"],
                "variant_id": prod["variant_id"],
                "sku": prod["sku"],
                "store_id": data["store_id"],
                "title": prod["title"],
            }
            input_products.append(payload)
        store_id = data["store_id"]
        # TODO: Paywall handler
        response = client.add_store_products(objects=input_products)
        if "errors" in response:
            raise Exception(str(response["errors"]))
        store_settings_count = client.get_store_setting_existence(store_id)

        if "errors" in store_settings_count:
            raise Exception(str(store_settings_count["errors"]))

        store_settings_count_total = store_settings_count["data"][
            "store_setting_aggregate"]["aggregate"]["count"]
        # print("store setting",
        #       store_settings_count["data"]["store_setting_aggregate"]["aggregate"]["count"])
        if not store_settings_count_total:
            store_setting_response = client.create_store_settings({
                "enable_button": False,
                "remove_watermark": False,
                "selfies_count_per_user": 10,
                "tryon_per_product": 1,
                "tryon_resolution": "1080",
                "store_id": store_id
            })
            # handle store_setting_response errors
            if "errors" in store_setting_response:
                raise Exception(str(store_setting_response["errors"]))

        notification_settings_count = client.get_notification_setting_existence(
            store_id)

        if "errors" in notification_settings_count:
            raise Exception(str(notification_settings_count["errors"]))

        notification_settings_count_total = notification_settings_count[
            "data"]["notification_setting_aggregate"]["aggregate"]["count"]

        if not notification_settings_count_total:
            # print("notification setting", notification_settings_count)
            notification_settings = client.create_notification_settings({
                "store_id": store_id,
                "email_when_100_used": False,
                "email_when_25_used": False,
                "email_when_50_used": False,
                "email_when_75_used": False,
                "product_photo_updates": False,
            })
            # handle notification_settings errors
            if "errors" in notification_settings:
                raise Exception(str(notification_settings["errors"]))

        client.update_store_by_pk(data["store_id"], {
            "onboarding_status": "completed"
        })
    except Exception as e:
        return StoreProductsOnboardingResponse(message=f"Error {e}", success=False)
    return StoreProductsOnboardingResponse(message="success", success=True)
