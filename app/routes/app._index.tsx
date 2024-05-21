import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
// import { json } from "@remix-run/node";
import FirstHeader from "~/components/FirstHeader";
import SecondHeader from "~/components/SecondHeader";
// import { useActionData,  useSubmit } from "@remix-run/react";
import  { useEffect, useState } from "react";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import db from "../db.server";
import {InMemoryCache} from '@apollo/client/cache';
import {ApolloClient} from '@apollo/client/core';
import pkg from '@apollo/client';
const {gql} = pkg;



export const loader = async ({ request }: LoaderFunctionArgs) => {
  const  admin1  = await authenticate.admin(request);
  const  {admin}  = await authenticate.admin(request);
  const {shop}  =  admin1.session ?? null

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
    products:responseJson
  };
  console.log(authWithShop,"auth session");
  
    return {authWithShop}
};




export default function Index() {
  const sessionData = useLoaderData<typeof loader>();
  const [firstTabColor, setFirstTabColor] = useState("blue");
  const [tabStep, setTabstep] = useState("1");
  const [secondTabColor, setSecondTabColor] = useState("");
  const [activeHeader, setActiveHeader] = useState("first");

    useEffect(() =>{
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
  },[activeHeader])
  
  return (
    <>
  <div className="container w-full" style={{ maxWidth: "100%",background:"#fff",padding:"20px 50px" }}> 
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
        <FirstHeader sessionData={sessionData} onActivate={() => {setActiveHeader("second");}}/>
      )}
      {activeHeader === "second" && <SecondHeader sessionData={sessionData} onActivate={() => {setActiveHeader("first");}}/>}
      </div>
    </>
  );
}
