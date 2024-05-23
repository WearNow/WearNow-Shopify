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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const admin1 = await authenticate.admin(request);
  const { admin } = await authenticate.admin(request);
  const { shop } = admin1.session ?? null;

  return { shop };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  let formData = await request.formData();

  let amount = formData.get("value");
  if (amount == null || amount == '' || amount == undefined) {
    return false;
  }
  const shop = formData.get("shop");

  const auth_session = await db.session.findFirst({
    where: { shop },
  });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-Shopify-Access-Token", auth_session?.accessToken);

  const raw = JSON.stringify({
    query: "mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $trialDays: Int!, $test: Boolean!) { appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, trialDays: $trialDays, test:$test) { userErrors { field message } appSubscription { id } confirmationUrl } }",
    variables: {
      name: "Basic",
      returnUrl: "https://admin.shopify.com/store/quickstart-f077c9e4/apps/s-s-wna/app",
      trialDays: 14,
      test: true,
      lineItems: [
        {
          plan: {
            appRecurringPricingDetails: {
              price: {
                amount: amount,
                currencyCode: "USD",
              },
              interval: "EVERY_30_DAYS",
            },
          },
        },
      ],
    },
  });

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
  // const updated = await db.session.update({
  //   where: { id: auth_session?.id },
  //   data: { /* pass the new car informations here */
  //     userId: appSubscription.id
  //   },
  // })
  // console.log(updated, "updatedupdatedupdatedupdated")
  return { confirmationUrl };
};

export default function PlanPage() {
  const Naviagte = useNavigate()
  const load = useLoaderData<typeof loader>();
  const shop = load.shop;
  const submit = useSubmit();
  const actiondata = useActionData();
  console.log(actiondata, "actiondata  updated");
  if (actiondata?.confirmationUrl) {
    // window.location.href= actiondata.confirmationUrl;
    // Naviagte(actiondata?.confirmationUrl)
    // Naviagte(actiondata?.confirmationUrl)
   // window.open(actiondata?.confirmationUrl, '_blank');
    //window.close();
   // Naviagte(actiondata?.confirmationUrl.replace('https://quickstart-f077c9e4.myshopify.com/admin/',''),{ replace: true });
    top.location.href = actiondata.confirmationUrl

  }


  const handlesubmit = async (value: string) => {
    submit({ value, shop }, { method: "post" });

    //console.log(auth_session,"auth_sessionauth_sessionauth_sessionauth_sessionauth_session");
  };

  return (
    <>
      <Billing handlesubmit={handlesubmit} />
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
