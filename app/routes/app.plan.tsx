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
        console.log(result.data.session, "apollo client");
      });


  return { shop,packages,auth_session };
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
  const newshop = shop;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Shopify-Access-Token", auth_session?.accessToken);
  let raw = '';
  if(trial>0){
   raw = JSON.stringify({
    query: "mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $trialDays: Int!, $test: Boolean!) { appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, trialDays: $trialDays, test:$test) { userErrors { field message } appSubscription { id } confirmationUrl } }",
    variables: {
      name: "Basic",
      returnUrl: `https://admin.shopify.com/store/${newshop.replace(".myshopify.com",'')}/apps/${app_name}/app?packageID=${packageID}`,
      trialDays: trial,
      test: true,
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
    },
  });
  }else{
     raw = JSON.stringify({
      query: "mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!,  $test: Boolean!) { appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test:$test) { userErrors { field message } appSubscription { id } confirmationUrl } }",
      variables: {
        name: "Basic",
        returnUrl: `https://admin.shopify.com/store/${newshop.replace(".myshopify.com",'')}/apps/${app_name}/app?packageID=${packageID}`,
        test: true,
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
      },
    });
  }
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(`https://${auth_session.shop}/admin/api/2024-04/graphql.json`, requestOptions);
  const newres = await res.json();
  const confirmationUrl = newres.data.appSubscriptionCreate.confirmationUrl;
  const appSubscription = newres.data.appSubscriptionCreate.appSubscription;
  const updated = await db.session.update({
    where: { id: auth_session?.id },
    data: { /* pass the new car informations here */
      userId: appSubscription.id
    },
  })
  console.log(updated, "updatedupdatedupdatedupdated")
  return { confirmationUrl };
};

export default function PlanPage() {
  const Naviagte = useNavigate()
  const load = useLoaderData<typeof loader>();
  console.log(load, "load");
  const shop = load.shop;
  const packages = load.packages;
  const store_id = load.auth_session.store_id;
  console.log(packages,"packages from loader");
  const submit = useSubmit();
  const actiondata = useActionData();
  console.log(actiondata, "actiondata  updated");
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
    

    console.log(auth_session,"auth_sessionauth_sessionauth_sessionauth_sessionauth_session");
  };

  return (
    <>
      <Billing handlesubmit={handlesubmit} packageData={packages} store_id={store_id} />
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
