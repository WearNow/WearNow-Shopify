import os 
from ..config import settings

HASURA_URL = "https://graphql.wearnow.ai/v1/graphql"
HASURA_HEADERS = {"x-hasura-admin-secret": settings.HASURA_ADMIN_SECRET}
