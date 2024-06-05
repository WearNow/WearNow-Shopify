import { LoaderFunctionArgs } from "@remix-run/node";
import gql from "graphql-tag";
import { authenticate } from "~/shopify.server";
import client from "./ApolloClient";

export const SessionLoader = async ({ request }: LoaderFunctionArgs) => {
    const  admin  = await authenticate.admin(request);
    const {shop}  =  admin.session ?? null
    let auth_session={};
  
    //console.log(shop,"hsop shop")
    await client
    .query({
      query: gql`
        query MyQuery2($shop: String!) {
          session(limit: 10, where: {shop_id: {_eq: $shop}}) {
            accessToken
            shop_id
            state
            scope
            isOnline
            expires
            store {
              name
              store_id
              onboarding_status
              uuid
              virtual_enabled
            }
            store_id
            uuid
          }
        }
      `,
      variables: {
        shop: shop,
      },
    })
    .then((result) => {
      auth_session=result?.data.session[0] ?? result?.data.session;
      //console.log(result.data.session, "apollo client");
    });
    const authWithShop = {
      ...auth_session,
      shop: shop,
      tryOn:false
    };
    //console.log(authWithShop,"auth session");
    
    return {authWithShop}
};