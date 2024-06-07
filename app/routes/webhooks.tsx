import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import client from "../services/ApolloClient";
import gql from "graphql-tag";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { topic, shop, session, admin, payload } = await authenticate.webhook(request);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }

      break;
    case "CUSTOMERS_DATA_REQUEST":
      break;
    case "CUSTOMERS_REDACT":
      break;
    case "SHOP_REDACT":
      break;
    case "PRODUCTS_CREATE":
        
      break;
    case "PRODUCTS_UPDATE":
      const UPDATE=gql`
      mutation MyMutation14($product_id: string!,$full_data: string!) {
        update_store_products(where: {product_id: {_eq: $product_id}}, _set: {full_data: $full_data}) {
          affected_rows
        }
      }`;
      const result = await client.mutate({
        mutation: UPDATE,
        variables: {
          product_id: `gid://shopify/Product/${payload.id}`,
          full_data: JSON.stringify(payload)
        },
      });
      console.log(result, "Featured background updated");
      break;
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
