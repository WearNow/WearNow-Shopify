import { json } from "@remix-run/node";
import db from "../../db.server";
import { cors } from "remix-utils/cors";
import type { ActionFunctionArgs } from "@remix-run/node";
import client from "../../services/ApolloClient";
import gql from "graphql-tag";
import { constants } from "os";

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const queryfor = body.get('queryfor');
  const shop = body.get('shop');

  // Ensure all required fields are provided
  if (!queryfor || !shop) {
    throw new Error("Missing required fields");
  }
  let auth_session = {};
  switch (queryfor) {
    case "checkVirtualTryOn":
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
      const query = gql`
      query MyQuery3($storeid: uuid!) {
      store_products(limit: 250, where: {store_id: {_eq: $storeid},vto_enabled:{_eq:true}}) {
        store_id
        title
        uuid
        variant_id
        product_id
        images
        price
        sku
        full_data
        vto_enabled
      }
    }
    `;
      const result = await client.query({
        query: query,
        fetchPolicy: "network-only",
        variables: {
          storeid: auth_session.store_id,
        },
      });
      var store_products = result.data.store_products;


      return cors(
        request,
        json({
          success: true,
          message: "Selected VTO products fetched successfully",
          response: store_products,
        })
      );
      break;
    case "extpopup":
      
      await client
        .query({
          query: gql`
      query MyQuery2($shop: String!) {
        session(limit: 10, where: {shop_id: {_eq: $shop}}) {
          store_id
          store {
            uuid
            extension_enabled
          }
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
        if(!auth_session?.store?.extension_enabled) {
          const MUTATION12 = gql`mutation MyMutation12($storeid:uuid) {
            update_stores(where: {uuid: {_eq: $storeid}}, _set: {extension_enabled: true}) {
              affected_rows
            }
          }`;
          const result = await client.mutate({
            mutation: MUTATION12,
            fetchPolicy: "network-only",
            variables: {
              storeid: auth_session?.store_id,
            },
          });
        }
      break;
    case "checkModels":
      const variant_id = body.get('variantID');
      console.log(variant_id,"variantID");
      const querym = gql`query MyQuery3($variant_id: String!){
          product_photo_history(where:{
            store_product:{
              variant_id:{_eq:$variant_id}
            }
          }){
            gender
            size
            skin_composition
            generated_image
            store_product{
              store_id
              store{
                name
                created_at
              }
              variant_id
            }
          }
        }`;
      console.log(querym,"querym");
      const resultm = await client.query({
        query: querym,
        fetchPolicy: "network-only",
        variables: {
          variant_id: variant_id,
        },
      });

      console.log(resultm);
 
      var store_products = resultm.data.product_photo_history;


      return cors(
        request,
        json({
          success: true,
          message: "Generated photos fetched successfully",
          response: store_products,
        })
      );
      break;
    case "selectedProdctsData":
      try {
        const selectedProducts = await db.selectProdcutData.findMany();
        return cors(
          request,
          json({
            success: true,
            message: "Selected products fetched successfully",
            response: selectedProducts,
          })
        );
      } catch (error) {
        console.error(error); // Log any errors
        return cors(
          request,
          json({
            success: false,
            error: "Error fetching selected products data",
          })
        ); // Return JSON response indicating failure
      }

    default:
      return cors(
        request,
        json({ success: false, error: "Invalid query type" })
      );
  }
};

