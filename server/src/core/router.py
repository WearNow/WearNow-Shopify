import json
from fastapi import APIRouter, Request
from .utils.hasura_helpers import client
from .schemas import StoreProductsOnboardingResponse, StoreProductsOnboardingInput

router = APIRouter()


@router.post("/store-onboarding", status_code=201)
async def handle_store_onboarding(request: Request):
    try:
        body = await request.body()
        body_str = body.decode()
        data = json.loads(body_str)["input"]["input"]
        products = data["products"]
        input_products = []
        for prod in products:
            payload = {
                "images": prod["photos"],
                "price": str(prod["price"]),
                "product_id": prod["product_id"],
                "variant_id": prod["variant_id"],
                "sku": prod["sku"],
                "store_id": data["store_id"],
                "title": prod["title"],
            }
            input_products.append(payload)

        # TODO: Paywall handler
        response = client.add_store_products(objects=input_products)
        if "errors" in response:
            raise Exception(str(response["errors"]))
        client.update_store_by_pk(data["store_id"], {
            "onboarding_status": "completed"
        })
    except Exception as e:
        return StoreProductsOnboardingResponse(message=f"Error {e}", success=False)
    return StoreProductsOnboardingResponse(message="success", success=True)
