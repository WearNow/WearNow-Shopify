import gql from "graphql-tag";
import client from "~/services/ApolloClient";

export const fetchNotificationSettings = async (store_id: string) => {
   return await client
      .query({
        query: gql`query MyQuery($store_id:uuid){
          notification_setting(where: {store_id: {_eq: $store_id} } ) {
            product_photo_updates
            renewal_due
            tryonusage_update
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
        return result.data.notification_setting[0];
      });
  };