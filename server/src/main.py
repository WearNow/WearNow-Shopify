import sys
from fastapi import FastAPI
from loguru import logger
from src.doc import TAGS_METADATA
from src.config import app_configs
from starlette.middleware.cors import CORSMiddleware
from src.auth.router import router as auth_router
from src.core.router import router as core_router

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

app.include_router(auth_router, prefix="/api", tags=["Authentication"])
app.include_router(core_router, prefix="/api", tags=["Store"])