from ..constants import HASURA_HEADERS, HASURA_URL
from src.services import Client

client = Client(url=HASURA_URL, headers=HASURA_HEADERS)