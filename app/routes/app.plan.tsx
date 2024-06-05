// PlanPage.tsx or .jsx

import { Box } from "@shopify/polaris";
import Billing from "~/components/Billing";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { useSubmit } from "@remix-run/react";
import db from "../db.server";
import { redirect } from "@remix-run/node";
import React, { useState, useEffect } from 'react';
import { app_name } from "~/services/Services";
import client from "../services/ApolloClient";
import gql from "graphql-tag";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const admin1 = await authenticate.admin(request);
  const { admin } = await authenticate.admin(request);
  const { shop } = admin1.session ?? null;
  let packages:any =[];    
    await client
      .query({
        query: gql`
            query MyQuery5 {
          packages(limit: 10,order_by: {price: asc}) {
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
        }`,
        fetchPolicy: "network-only",
      })
      .then((result) => {
        packages = result.data.packages;
      });

      let auth_session={};
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
        auth_session=result?.data.session[0] ?? result?.data.session;
        //console.log(result.data.session, "apollo client");
      });

      const myHeaders = new Headers();
      myHeaders.append("X-Shopify-Access-Token", auth_session?.accessToken);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      
      let planname="partner_test"
// fetch(`https://${shop}/admin/api/2024-01/themes.json`, requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result,"themes data returned"))
//   .catch((error) => console.error(error));
      fetch(`https://${shop}/admin/api/2024-04/shop.json`, requestOptions)
        .then((response) => response.json())
        .then((result) => {planname=result.shop.plan_name})
        .catch((error) => console.error(error));
        return { shop,packages,auth_session,planname };
      };

export const action = async ({ request }: ActionFunctionArgs) => {
  let formData = await request.formData();

  let amount = formData.get("price");
  if (amount == null || amount == '' || amount == undefined) {
    return false;
  }
  const shop = formData.get("shop");
  const plan = formData.get("plan");
  const packageID = formData.get("packageID");
  const trial = formData.get("trial");

  const auth_session = await db.session.findFirst({
    where: { shop },
  });
  let planname="partner_test"
  const myHeader = new Headers();
      myHeader.append("X-Shopify-Access-Token", auth_session?.accessToken);

      const requestOption = {
        method: "GET",
        headers: myHeader,
        redirect: "follow"
      };

      fetch(`https://${shop}/admin/api/2024-04/shop.json`, requestOption)
        .then((response) => response.json())
        .then((result) => {planname=result.shop.plan_name})
        .catch((error) => console.error(error));
  const newshop = shop;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Shopify-Access-Token", auth_session?.accessToken);
  let raw = '';
  //console.log(trial,"trial");
  
    let variables = {
      name: "Basic",
      returnUrl: `https://admin.shopify.com/store/${newshop.replace(".myshopify.com",'')}/apps/${app_name}/app?packageID=${packageID}`,
      lineItems: [
          {
              plan: {
                  appRecurringPricingDetails: {
                      price: {
                          amount: amount,
                          currencyCode: "USD",
                      },
                      interval: plan,
                  },
              },
          },
      ],
  };
  let query="mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $trialDays: Int!, $test: Boolean!) { appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, trialDays: $trialDays, test:$test) { userErrors { field message } appSubscription { id } confirmationUrl } }";
  if(trial!=null && trial>0){
  let trialDays = { trialDays: parseInt(trial)};
  // Merge trialDays into variables
  variables = { ...variables, ...trialDays };
  }
  else{
    query="mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $test: Boolean!) { appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test:$test) { userErrors { field message } appSubscription { id } confirmationUrl } }";
  }
  let test = { test: true };
  if(planname!="partner_test"){
    test={test:false};
  }
    // Merge trialDays into variables
    variables = { ...variables, ...test };
  
  console.log(variables,"variables");
  
    
   raw = JSON.stringify({
    query: query,
    variables: variables,
  });
 
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(`https://${auth_session.shop}/admin/api/2024-04/graphql.json`, requestOptions);
  const newres = await res.json();
  console.log(newres,"newres");
  const confirmationUrl = newres?.data?.appSubscriptionCreate?.confirmationUrl;
  const appSubscription = newres?.data?.appSubscriptionCreate?.appSubscription;
  const updated = await db.session.update({
    where: { id: auth_session?.id },
    data: { /* pass the new car informations here */
      userId: appSubscription?.id
    },
  })
  //console.log(updated, "updatedupdatedupdatedupdated")
  return { confirmationUrl };
};

export default function PlanPage() {
  const Naviagte = useNavigate()
  const load = useLoaderData<typeof loader>();
  //console.log(load, "load");
  const shop = load.shop;
  const packages = load.packages;
  const store_id = load.auth_session.store_id;
  //console.log(packages,"packages from loader");
  const submit = useSubmit();
  const actiondata = useActionData();
  //console.log(actiondata, "actiondata  updated");
  if (actiondata?.confirmationUrl) {
    top.location.href = actiondata.confirmationUrl
  }
 
  const handlesubmit = async (uuid: any,cycle:string,active:any) => {
    packages.filter((item:any)=>uuid.includes(item.uuid)).map((item:any)=>{
      let price =0;
      let plan= 'EVERY_30_DAYS';
      if(cycle === 'yearly'){  
        price = item.price*12;
        plan = 'ANNUAL';
      }
      else{  
        price = item.price;
        plan= 'EVERY_30_DAYS';
      }
      let packageID=uuid;
      let trial=active==undefined?14:0;
      
      submit({ price, shop, plan, packageID, trial }, { method: "post" })
  });
    

    //console.log(auth_session,"auth_sessionauth_sessionauth_sessionauth_sessionauth_session");
  };

  return (
    <>
      <Billing handlesubmit={handlesubmit} packageData={packages} store_id={store_id} />
    </>
  );
}
