from .hasura_helpers import client


def create_or_update_user_stat(photo_count, vto_count, store_id):
    usage_activity = client.get_service_usage_activity(store_id)
    usage_activity_data = usage_activity["data"]["service_usage_activity"]
    usage_activity_obj = usage_activity_data[0] if len(
        usage_activity_data) > 0 else None

    print("usage_activity_obj: ", usage_activity_obj)

    if usage_activity_obj:
        print("usage_activity: ", usage_activity_obj)
        photo_count_val = usage_activity_obj["product_photos_usage_count"]
        vto_count_val = usage_activity_obj["vto_usage_count"]

        if photo_count:
            photo_count_val += 1

        if vto_count:
            vto_count_val += 1

        client.update_service_usage_activity(
            photo_count=photo_count_val,
            store_id=store_id,
            vto_count=vto_count_val,
            uuid=usage_activity_obj["uuid"]
        )
    else:
        usage_activity = client.insert_service_usage_activity(
            photo_count if photo_count else 0,
            vto_count if vto_count else 0,
            store_id
        )
        print("CREATED: ", usage_activity)

    return usage_activity
