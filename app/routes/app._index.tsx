import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
// import { json } from "@remix-run/node";
import FirstHeader from "~/components/FirstHeader";
import SecondHeader from "~/components/SecondHeader";
// import { useActionData,  useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { authenticate } from "../shopify.server";
import { useLoaderData, useNavigate } from "@remix-run/react";
import db from "../db.server";
import client from "../services/ApolloClient"
import gql from "graphql-tag"
import { ProgressBar } from '@shopify/polaris';
import OnboardingSkelton from "~/components/OnboardingSkelton";
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const admin1 = await authenticate.admin(request);
  const { admin } = await authenticate.admin(request);
  const { shop } = admin1.session ?? null

  const charge_id = new URL(request.url).searchParams.get('charge_id');
  const packageID = new URL(request.url).searchParams.get('packageID');
  const authSession = await db.session.findFirst({
    where: { shop },
  });
  console.log("charge_id ---->>>===>>>", charge_id);
  if (charge_id) {
    if (authSession?.state != 'active' && authSession?.userId == 'gid://shopify/AppSubscription/' + charge_id) {
      console.log("authSession?.userId ---->>>===>>>", authSession?.userId);
      const updated = await db.session.update({
        where: { id: authSession?.id },
        data: { /* pass the new car informations here */
          state: 'active'
        },
      })
      console.log(updated, "updatedupdatedupdatedupdated")

      const MY_MUTATIONDEL = gql`
       mutation MyMutation6($shop:String!) {
        update_session(where: {shop_id: {_eq: $shop}}, _set: {state: "active"}) {
          returning {
            state
            shop_id
          }
        }
      }`;

      try {
        const result = await client.mutate({
          mutation: MY_MUTATIONDEL,
          variables: {
            shop: shop
          },
        });
        console.log('Mutation result Update:', result);
      } catch (error) {
        console.error('Error executing mutation:', error);
      }


    }
  }

  const response = await admin.graphql(
    `#graphql
     query {
          products (first: 50) {
          edges {
            node { 
              id
              title 
            images(first: 10) {
              nodes {
                src
              }
            }
            variants(first: 10) {
              nodes {
                id
                image {
                  src
                  id
                }
                title
              }
            }
          }
          }
        }
      }`
  );
  const responseJson = await response.json();

  let auth_session = {};
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
      fetchPolicy: "network-only",
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
    products: responseJson
  };
  console.log(authWithShop, "auth session");
  if (auth_session?.state == 'active' && packageID != undefined && packageID != null) {
    console.log(auth_session?.store_id, "auth_session?.store_id");
    const MY_MUTATIONSUB = gql`mutation MyMutation9($store_id:uuid) {
      update_store_subscription(where: {store_id: {_eq: $store_id},status:{_eq:"active"}}, _set: {status: "archive"}) {
        returning {
          status
          package {
            name
            price
          }
        }
      }
    }`;
    try {
      const resultsub = await client.mutate({
        mutation: MY_MUTATIONSUB,
        variables: {
          store_id: auth_session?.store_id
        },
      });
      console.log('Mutation result Update:', resultsub);
    } catch (error) {
      console.error('Error executing mutation:', error);
    }
    const Query = gql`query MyQuery6($package_id:uuid,$store_id:uuid) {
    store_subscription(where: {store_id: {_eq: $store_id}, package_id: {_eq: $package_id}}) {
      store {
        name
      }
      package {
        name
      }
      status
      created_at
    }
  }`;
    const fetch_subscription = await client.query({ query: Query, variables: { package_id: packageID, store_id: auth_session?.store_id } });
    console.log(fetch_subscription);
    if (fetch_subscription?.data?.store_subscription == undefined || fetch_subscription.data.store_subscription.length <= 0) {
      const MY_MUTATIOND = gql`
   mutation ($package_id:uuid,$store_id:uuid){
      insert_store_subscription(objects:{
        package_id:$package_id,
        store_id:$store_id,
        status:"active"
      }){
        returning{
          created_at
          package{
            name
          }
          store_id
          status
        }
      }
    }`;
      try {
        const result = await client.mutate({
          mutation: MY_MUTATIOND,
          variables: {
            package_id: packageID,
            store_id: auth_session?.store_id
          },
        });
        console.log('Mutation result Update:', result);
      } catch (error) {
        console.error('Error executing mutation:', error);
      }
    } else {
      const MY_MUTATIONSUB = gql`mutation MyMutation9($store_id:uuid,$package_id:uuid) {
          update_store_subscription(where: {store_id: {_eq: $store_id},package_id:{_eq:$package_id}}, _set: {status: "active"}) {
            returning {
              status
              package {
                uuid
                name
                price
              }
            }
          }
        }`;
      try {
        const resultsub = await client.mutate({
          mutation: MY_MUTATIONSUB,
          variables: {
            store_id: auth_session?.store_id,
            package_id: packageID,
          },
        });
        console.log('Mutation result Update:', resultsub);
      } catch (error) {
        console.error('Error executing mutation:', error);
      }
    }
  }

  return { authWithShop }
};




export default function Index() {
  const sessionData = useLoaderData<typeof loader>();
  const [firstTabColor, setFirstTabColor] = useState("blue");
  const [tabStep, setTabstep] = useState("1");
  const [secondTabColor, setSecondTabColor] = useState("");
  const [activeHeader, setActiveHeader] = useState("first");
  const [loading, setLoading] = useState(true);
  const Naviagte = useNavigate()
  useEffect(() => {
    console.log(sessionData, "session data in main Index session");
    if (sessionData.authWithShop?.state != 'active') {
      Naviagte('plan', { replace: true });
    }
  }, [sessionData]);
  useEffect(() => {

    if (activeHeader === "first") {
      setActiveHeader(activeHeader);
      setSecondTabColor("");
      setFirstTabColor("blue");
      setTabstep("1")
    } else if (activeHeader === "second") {
      setActiveHeader(activeHeader);
      setSecondTabColor("blue");
      setFirstTabColor("green");
      setTabstep("2");
    }
  }, [activeHeader])
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second delay
  }, []);
  return (
    <>
      {sessionData.authWithShop?.state != 'active' ? (
        <div style={{ width: "100%" }}>
          <ProgressBar progress={99} size="small" />
        </div>
      ) : (
        <>
          {loading ? (   
            <div className="onbording_step_container container w-full" style={{ maxWidth: "100%", background: "#fff", padding: "20px 50px" }}>
              <OnboardingSkelton/>
              </div>
          ) : (
            <div className="onbording_step_container container w-full" style={{ maxWidth: "100%", background: "#fff", padding: "20px 50px" }}>
              <h1 className="mb-2 onbording_step_title">Onboarding - {tabStep} of 2 steps</h1>
              <div className="onboarding_steps  w-ful">
                <button
                  style={{ backgroundColor: firstTabColor }}
                ></button>

                <button
                  style={{ backgroundColor: secondTabColor }}
                ></button>
              </div>
              {activeHeader === "first" && (
                <FirstHeader sessionData={sessionData} onActivate={() => { setActiveHeader("second"); }} />
              )}
              {activeHeader === "second" && <SecondHeader sessionData={sessionData} onActivate={() => { setActiveHeader("first"); }} />}
            </div>
          )}
        </>
      )}
    </>
  );
}
