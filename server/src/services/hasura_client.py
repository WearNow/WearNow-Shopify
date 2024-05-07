
import requests
from dataclasses import dataclass


@dataclass
class Client:
    url: str
    headers: dict

    def run_query(self, query: str, variables: dict, extract=False):
        request = requests.post(
            self.url,
            headers=self.headers,
            json={"query": query, "variables": variables},
        )
        assert request.ok, f"Failed with code {request.status_code}"
        return request.json()

    def add_store_products(self, objects): return self.run_query(
        """
            mutation AddStoreProducts($objects: [store_products_insert_input!]!) {
                insert_store_products(objects: $objects) {
                    affected_rows
                }
            }
        """,
        {"objects": objects},
    )

    def update_store_by_pk(self, store_id, _set): return self.run_query(
        """
        mutation UpdateStoreByPk($store_id: uuid!, $_set: stores_set_input!) {
            update_stores_by_pk(_set: $_set, pk_columns: {uuid: $store_id}) {
                onboarding_status
            }
        }
        """,
        {"store_id": store_id, "_set": _set}
    )
