import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-04";
import prisma from "./db.server";
import gql from 'graphql-tag';
import client from '../app/services/ApolloClient';


const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.April24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
    PRODUCTS_CREATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
    CUSTOMERS_REDACT:{
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
    SHOP_REDACT:{
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    }
  },
  hooks: {
    afterAuth: async ({ session }) => {
  
       await saveSession(session);
      // console.log("session in shopify.server", session);
      shopify.registerWebhooks({ session });
    },
  },
  future: {
    v3_webhookAdminContext: true,
    v3_authenticatePublic: true,
    v3_lineItemBilling: true,
    unstable_newEmbeddedAuthStrategy: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.April24;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;





async function saveSession(session: any) {
  console.log('Saving session', session);
  const shop_name = session.shop;


  
  const MyMutation = gql`
    mutation MyMutation7($shop_name:String!) {
      delete_session(where: {shop_id: {_eq: $shop_name}}) {
        returning {
          shop_id
          accessToken
        }
      }
    }
    mutation MyMutation(
      $shop_name: String!
      $store_id: String!
      $accessToken: String!
      $isOnline: Boolean!
      $scope: String!
      $shop_id: uuid!
      $state: String!
    ) {
          insert_session(objects: {store: {data: {name: $shop_name, onboarding_status: "pending", store_id: $store_id, virtual_enabled: false}}, accessToken: $accessToken, isOnline: $isOnline, scope: $scope, shop_id: $shop_name, state: "1234"}) 
        {
        returning {
          accessToken
          store_id
        }
      }
    }
  `;

  try {
    const result = await client.mutate({
      mutation: MyMutation,
      variables: {
        shop_name: shop_name,
        store_id: shop_name,
        accessToken: session?.accessToken,
        isOnline: session?.isOnline,
        scope: session?.scope,
        shop_id: session?.shop,
        state: '1234',
      },
    });

    console.log('Mutation result:', result);

  } catch (error) {
    console.error('Error executing mutation:', error);
  }
}