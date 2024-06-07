import gql from "graphql-tag";
import client from "~/services/ApolloClient";

export const fetchActivePlan = async (store_id: string) => {
   return await client
      .query({
        query: gql`query MyQuery($store_id:uuid){
          store_subscription(where: {store_id: {_eq: $store_id},status:{_eq:"active"}}) {
                store {
                  name
                  uuid
                }
                package {
                  created_at
                  customized_models
                  cycle
                  description
                  hd_photos
                  name
                  number_of_products
                  price
                  pro_models
                  product_photo_limit
                  strike_amount
                  support_text
                  uuid
                  vto_limit
                }
                status
                created_at
                reset_date
            }
        }
        `,
        fetchPolicy: "network-only",
        variables: {
          store_id: store_id
        },
      })
      .then((result) => {
        console.log("apollo client result: :::", result);
        return result.data.store_subscription[0];
      });
  };