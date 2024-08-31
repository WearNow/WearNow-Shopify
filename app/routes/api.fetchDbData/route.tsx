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
    case "acknowledgements":
      let acknowledgement = [];
      await client
        .query({
          query: gql`
          query ($REQUEST_ID:uuid!){
        vto_image_generation_request_by_pk(uuid:$REQUEST_ID){
          uuid
          body_type
          results
          status
          input_image
          created_at
        }
      }
    `,
          fetchPolicy: "network-only",
          variables: {
            REQUEST_ID: body.get('REQUEST_ID'),
          },
        })
        .then((result) => {
          console.log(result, "result for acknowledgement");
          acknowledgement = result.data.vto_image_generation_request_by_pk;
        });
      return cors(
        request,
        json({
          success: true,
          message: "Selected VTO products fetched successfully",
          response: acknowledgement,
          request_id: body.get('REQUEST_ID'),
        })
      );
      break;
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
      console.log(result, "enabled Products");
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
    case "createVirtualTryOn":
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
      const mutation = gql`
      mutation ($gender: String!,$size: String!,$skin_composition: String!,$input_image: String!,$storeid: String!,$store_product_id: String!,$model_id: String!) {
        generateVTOImage(input:{
          gender:$gender,
          model_id:$model_id,
          store_product_id:$store_product_id,
          store_id:$storeid,
          size:$size,
          skin_composition:$skin_composition,
          input_image:$input_image
        }){
          request_id
          status
        }
      }
    `;
      const muation_result = await client.mutate({
        mutation: mutation,
        fetchPolicy: "network-only",
        variables: {
          gender: body.get('gender'),
          size: body.get('size'),
          skin_composition: body.get('skin_composition'),
          input_image: body.get('input_image'),
          storeid: auth_session.store_id,
          store_product_id: body.get('store_product_id'),
          //store_product_id:"e8a6ada9-1dbb-4e12-bc0b-13ff8c004257",
          model_id: body.get('model_id'),
        },
      });
      console.log(muation_result, "muation_result Products");
      return cors(
        request,
        json({
          success: true,
          message: "Selected VTO products fetched successfully",
          response: muation_result,
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
      if (!auth_session?.store?.extension_enabled) {
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
    case "getModelsHistorySet":

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
          console.log(auth_session, "<<||||apollo client");
        });
      const queryMset = gql`query product_photo_history($store_id: uuid!) {
        product_photo_history(
          limit: 100, 
          order_by: {created_at: desc}, 
          where: {request: {store_id: {_eq: $store_id}}
          }) {
          uuid
          created_at
          public
          approved
          generated_image
          gender
          request {
            model_id
            model{
              name
              mask_image
              lower_mask
              upper_mask
              cover_image
            }
            background_id
            generated_count
            public
            pose_id
            store_id
            store_product_id
          }
          store_product {
            title
            store_id
          }
        }
      }
      `
      console.log("auth_session.store_id: ", auth_session)
      // console.log(getModelsHistorySet, "querym");
      const resultmSet = await client.query({
        query: queryMset,
        fetchPolicy: "network-only",
        variables: {
          store_id: auth_session.store_id,
        },
      });

      console.log(resultmSet);

      var store_products = resultmSet.data.product_photo_history;


      return cors(
        request,
        json({
          success: true,
          message: "Generated photos fetched successfully",
          response: store_products,
        })
      );
      break;
    case "checkModels":
      let variant_id = body.get('variantID');
      variant_id = variant_id?.replace("gid://shopify/ProductVariant/", "");
      variant_id = "gid://shopify/ProductVariant/" + variant_id;
      console.log(variant_id, "variantID");
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
            request{
              model_id
            }
            store_product{
              uuid
              store_id
              store{
                name
                created_at
              }
              variant_id
            }
          }
        }`;
      console.log(querym, "querym");
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
  return null;
};

