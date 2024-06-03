
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

    def get_store_product(self, uuid): return self.run_query(
        """
                    query store_products_by_pk($uuid: uuid!){
                        store_products_by_pk(uuid:$uuid){
                            created_at
                            images
                            price
                            product_id
                            store_id
                            title
                            uuid
                        }
                    }
                """, {"uuid": uuid}
    )

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

    def create_store_settings(self, _set): return self.run_query(
        """
                mutation insert_store_setting_one($object: store_setting_insert_input!) {
                    insert_store_setting_one(object: $object) {
                        created_at
                        uuid
                    }
                }
                """,
        {"object": _set},
    )

    def get_store_setting_existence(self, store_id): return self.run_query(
        """
                query get_store_setting($store_id: uuid!) {
                    store_setting_aggregate(where: {store_id: {_eq: $store_id}}) {
                        aggregate {
                            count
                        }
                    }
                }
                """,
        {"store_id": store_id}
    )

    def get_notification_setting_existence(self, store_id): return self.run_query(
        """
            query get_notification_setting($store_id: uuid!) {
                notification_setting_aggregate(where: {store_id: {_eq: $store_id}}) {
                    aggregate {
                        count
                    }
                }
            }
            """,
        {"store_id": store_id}
    )

    def create_notification_settings(self, _set): return self.run_query(
        """
        mutation insert_notification_setting_one($object: notification_setting_insert_input!) {
            insert_notification_setting_one(object: $object) {
                created_at
                store_id
            }
        }
        """,
        {"object": _set},
    )
