import gql from "graphql-tag";
import client from "~/services/ApolloClient";

export const fetchUsage = async (store_id: string) => {
   return await client
      .query({
        query: gql`query MyQuery($store_id:uuid){
          service_usage_activity(where: {store_id: {_eq: $store_id}}) {
              product_photos_usage_count
              vto_usage_count
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
        return result.data.service_usage_activity[0];
      });
  };