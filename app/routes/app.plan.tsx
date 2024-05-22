import { Box } from "@shopify/polaris";
import Billing from "~/components/Billing";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { useActionData } from "@remix-run/react";

export const action = async({request}:ActionFunctionArgs) =>{
  const { admin } = await authenticate.admin(request);
  let formData = await request.formData();
  let amount = formData.get("value");
  console.log(amount,"amoun in action Plan page");
const response = await admin.graphql(
  `#graphql
  mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $trialDays: Int!, $test: Boolean!) {
    appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, trialDays: $trialDays, test:$test) {
      userErrors {
        field
        message
      }
      appSubscription {
        id
      }
      confirmationUrl
    }
  }`,
  {
    variables: {
      "name": "Super Duper Recurring Plan",
      "returnUrl": "http://super-duper.shopifyapps.com/",
      "trialDays":14,
      "test":true,
      "lineItems": [
        {
          "plan": {
            "appRecurringPricingDetails": {
              "price": {
                "amount": amount,
                "currencyCode": "USD"
              },
              "interval": "EVERY_30_DAYS"
            }
          }
        }
      ]
    },
  },
);

const data = await response.json();
  console.log("data: ===>", data)
  return data;
}

export default function PlanPage() {
  const handlesubmit = async(value:string) => {
    console.log("value in plan: " + value);
  let formData = new FormData();
    formData.append("value", value);

    let response = await fetch("/app/plan", {
      method: "post",
      body: formData
    });

    let result = await response.json();
    console.log("Server response:", result);
  };
  return (
    <>
    <Billing handlesubmit={handlesubmit}/>
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
