from fastapi import APIRouter
from .schemas import TestResponse

router = APIRouter()


@router.get("/test", status_code=201)
async def test():
    return TestResponse(message="User created successfully", data={"status_code": 200})
