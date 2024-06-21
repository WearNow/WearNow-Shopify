import {
  ProgressBar,
} from "@shopify/polaris";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

import { authenticate } from "../shopify.server";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import Dashboard from "~/components/Dashboard";
import client from "../services/ApolloClient"
import gql from "graphql-tag"
import BillingSkelton from "~/components/BillingSkelton";
import DashboardSkelton from "~/components/DashboardSkelton";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const admin1 = await authenticate.admin(request);
  const { shop } = admin1.session ?? null


  let auth_session = {};
  console.log(shop, "hsop shop")
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
            extension_enabled
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
      auth_session = result?.data.session[0] ?? result?.data.session;
      console.log(result.data.session, "apollo client");
    });
  const authWithShop = {
    ...auth_session,
    shop: shop,
    tryOn: false,
  };
  console.log(authWithShop, "auth session");

  return { authWithShop }
};
export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const sessionData = useLoaderData<typeof loader>();
  const Naviagte = useNavigate()
  useEffect(() => {
    console.log(sessionData, "session data in main Index session");
    if (sessionData.authWithShop?.state != 'active') {
      Naviagte('/app/plan', { replace: true });
    }
  }, [sessionData]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); // Simulating a 2-second delay
  }, []);
  return (
    <>
      {sessionData.authWithShop?.state != 'active' ? (
        <div style={{ width: "100%" }}>
          <ProgressBar progress={99} size="small" />
          <BillingSkelton/>
        </div>
      ) : (
        <>
          {loading ? (
            <DashboardSkelton/>
          ) : (
            <Dashboard sessionData={sessionData} />
          )};
        </>
      )}
    </>
  );
}

