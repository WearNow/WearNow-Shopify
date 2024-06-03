import json
from fastapi import APIRouter, Request
from .utils.hasura_helpers import client
from .schemas import StoreProductsOnboardingResponse, StoreProductsOnboardingInput, SingleStoreProductOutput

router = APIRouter()


@router.post("/single-vto-request", status_code=201)
async def handle_single_vto_request(request: Request):
    body = await request.body()
    body_str = body.decode()
    data = json.loads(body_str)["input"]["input"]
    store_prod = client.get_store_product(data)
    print("store prod", store_prod)
    return SingleStoreProductOutput(tracking="tracking-id", success=True)


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

        store_settings_count_total = store_settings_count["data"]["store_setting_aggregate"]["aggregate"]["count"]
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

        notification_settings_count_total = notification_settings_count["data"]["notification_setting_aggregate"]["aggregate"]["count"]

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
