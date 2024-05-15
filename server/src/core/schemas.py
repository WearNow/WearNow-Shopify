import re
from typing import Optional, List

from pydantic import BaseModel

class SingleStoreProductOutput(BaseModel):
    tracking: str = ""
    success: bool = True

class StoreProductsOnboardingResponse(BaseModel):
    message: str = ""
    success: bool = True

class ProductPhoto(BaseModel):
    url: str
    filename: Optional[str]

class Product(BaseModel):
    product_id: str
    variant_id: str
    title: str
    sku: Optional[str]
    price: Optional[int]
    photos: List[ProductPhoto]

class StoreProductsOnboardingInput(BaseModel):
    products: List[Product]
    model: str
    background: str
    pose: str