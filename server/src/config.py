from typing import Any

from pydantic import BaseSettings, Field


class Config(BaseSettings):
    DATABASE_URL: str = Field(..., env="DATABASE_URL")


settings = Config(DATABASE_URL="")

app_configs: dict[str, Any] = {"title": "Rest API"}
