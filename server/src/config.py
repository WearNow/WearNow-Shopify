from typing import Any

from pydantic import Field
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Config(BaseSettings):
    # DATABASE_URL: str = Field(..., env="DATABASE_URL")
    HASURA_ADMIN_SECRET: str = Field(..., env="HASURA_ADMIN_SECRET")

    class Config:
        env_prefix = ""
        # case_sensitive = False
        env_file = ".env"

settings = Config()

app_configs: dict[str, Any] = {"title": "Rest API"}
