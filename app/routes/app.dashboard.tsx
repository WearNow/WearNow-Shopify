import {
    Box,
    Card,
    Layout,
    Link,
    List,
    Page,
    Text,
    BlockStack,
  } from "@shopify/polaris";
  import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import Dashboard from "~/components/Dashboard";
import {InMemoryCache} from '@apollo/client/cache';
import {ApolloClient} from '@apollo/client/core';
import pkg from '@apollo/client';
const {gql} = pkg;
  
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const  admin1  = await authenticate.admin(request);
  const {shop}  =  admin1.session ?? null


  let auth_session={};
  const client = new ApolloClient({
    uri: 'https://graphql.wearnow.ai/v1/graphql',
    cache: new InMemoryCache(),
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': 'sau1XI9_2o0',
    },
  });
  console.log(shop,"hsop shop")
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
    console.log(result.data.session, "apollo client");
  });
  const authWithShop = {
    ...auth_session,
    shop: shop,
    tryOn:false,
  };
  console.log(authWithShop,"auth session");
  
    return {authWithShop}
};
  export default function DashboardPage() {
    const sessionData = useLoaderData<typeof loader>();
    return (
      <>
      <Dashboard sessionData={sessionData}/>
      </>
    );
  }
  
  function Code({ children }: { children: React.ReactNode }) {
    return (
      <Box
        as="span"
        padding="025"
        paddingInlineStart="100"
        paddingInlineEnd="100"
        background="bg-surface-active"
        borderWidth="025"
        borderColor="border"
        borderRadius="100"
      >
        <code>{children}</code>
      </Box>
    );
  }
  