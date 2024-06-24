
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

    def create_vto_request(self, store_id, store_product_id, input_image): return self.run_query(
        """
        mutation insert_vto_generation_request($store_id: uuid!, $store_product_id: uuid!, $input_image: String!) {
        insert_vto_image_generation_request_one(object: {store_id: $store_id, generated_count: 0, status: "PENDING", store_product_id: $store_product_id, input_image: $input_image}) {
                uuid
                status
                created_at
                results
                store_product {
                    images
                }
            }
        }

        """, {"store_id": store_id, "store_product_id": store_product_id, "input_image": input_image}
    )

    def get_prod_request(self, store_product_id): return self.run_query(
        """
        query product_image_request($store_product_id:uuid!){
            product_image_generation_request(where:{
                store_product_id:{_eq:$store_product_id}
            }){
                    background{
                        uuid
                        image
                    }
                    model{
                        cover_image
                        mask_image
                    }
                    results
                    status
                    time_lapsed
                    store_product{
                        uuid
                        images
                    }
                }
            }
        """, {"store_product_id": store_product_id}
    )

    def create_prod_request(self, store_id, model_id, store_pid, bgid): return self.run_query(
        """
        mutation insert_product_image_generation_request($store_id: uuid!, $store_product_id: uuid!, $model_id: uuid!, $background_id: uuid!) {
            insert_product_image_generation_request_one(object: {store_id: $store_id, generated_count: 0, status: "PENDING", store_product_id: $store_product_id, model_id: $model_id, background_id: $background_id}) {
                uuid
                status
                created_at
                results
                background {
                    image
                }
                pose {
                    image
                }
                model {
                    name
                    mask_image
                    cover_image
                    skin_composition
                }
                store_product {
                    images
                }
            }
        }
        """, {"store_id": store_id,  "model_id": model_id, "background_id": bgid, "store_product_id": store_pid}
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

    def update_product_image_request(self, uuid, results): return self.run_query(
        """
                mutation updadteProductRequest($uuid:uuid, $results:String!){
                    update_product_image_generation_request(where:{
                        uuid:{
                        _eq:$uuid
                        }
                    }, _set:{
                        status:"COMPLETE",
                        results:$results
                    }){
                        affected_rows
                    }
                }
                """, {"uuid": uuid, "results": results}
    )


    def update_vto_request(self, uuid, results): return self.run_query(
        """
        mutation updadteProductRequest($uuid: uuid, $results: String!) {
            update_vto_image_generation_request(where: {uuid: {_eq: $uuid}}, _set: {status: "COMPLETE", results: $results}) {
                affected_rows
            }
        }
        """, {"uuid": uuid, "results": results}
    )
