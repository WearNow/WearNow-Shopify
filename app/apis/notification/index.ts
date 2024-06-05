import gql from "graphql-tag";
import client from "~/services/ApolloClient";

export const fetchData = async () => {
   return await client
      .query({
        query: gql`{
          notification_setting(where: {store_id: {_eq: "11189675-0073-42e1-aa0c-a97ef40e09e6"}}) {
            product_photo_updates
            renewal_due
            tryonusage_update
          }
        }
        
        `,
        fetchPolicy: "network-only",
      })
      .then((result) => {
        console.log("apollo client result: :::", result);
        return result.data.notification_setting[0];
      });
  };