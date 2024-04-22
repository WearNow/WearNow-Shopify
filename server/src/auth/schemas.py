import re
from typing import Optional

from pydantic import BaseModel, Field, HttpUrl, root_validator, validator

class TestResponse(BaseModel):
    status_code: int = 200

