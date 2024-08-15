from typing import Any

from pydantic import Field
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Config(BaseSettings):
    # DATABASE_URL: str = Field(..., env="DATABASE_URL")
    HASURA_ADMIN_SECRET: str = Field(..., env="HASURA_ADMIN_SECRET")
    AWS_SERVER_PUBLIC_KEY: str = Field(..., env="AWS_SERVER_PUBLIC_KEY")
    AWS_SERVER_SECRET_KEY: str = Field(..., env="AWS_SERVER_SECRET_KEY")
    REGION_NAME: str = Field(..., env="REGION_NAME")

    class Config:
        env_prefix = ""
        # case_sensitive = False
        env_file = ".env"


settings = Config()

app_configs: dict[str, Any] = {"title": "Rest API"}
