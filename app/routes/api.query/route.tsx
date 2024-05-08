import { json } from "@remix-run/node";
import db from "../../db.server";
import { cors } from "remix-utils";
import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.json();
  const queryfor = body.queryfor;
  const first = body.first ?? 5;
  const fields = body.fields;
  const shop = body.shop;
  const pagination = body.pagination;
  const searchQuery = body.searchQuery;



  // Ensure all required fields are provided
  if (!queryfor || !first || !fields || !shop) {
    throw new Error("Missing required fields");
  }
  const auth_session = await db.session.findFirst({
    where: { shop },
  });
  const myHeaders = new Headers();
  myHeaders.append("X-Shopify-Access-Token", auth_session.accessToken);
  myHeaders.append("Content-Type", "application/json");

  const field_array = fields.split(",");
  const field_join = field_array.join(" \r\n ");
  let message = 'Something went wrong';
  let data_response = {};

  switch (queryfor) {
    case "collection":
      try {
        const graphql = JSON.stringify({
          query: `query {
            collections(first: ${first}) {
              edges {
                node { ${field_join} }
              }
            }
          }`,
          variables: {},
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: graphql,
        };
        console.log(requestOptions, "requestOptions");
        const response = await fetch(
          `https://${shop}/admin/api/2024-01/graphql.json`,
          requestOptions
        );
        message = "Collections fetched successfully";
        data_response = await response.json();
      } catch (error) {
        console.error(error); // Log any errors
        return cors(request, json({ success: false, error: "Error fetching collections" })); // Return JSON response indicating failure
      }
      break;
    case "product":
      try {
        let newquery = '';
        if(searchQuery!='')
          {
             newquery = `,query:"title:*${searchQuery}*"`;
          }
         
        const graphql = JSON.stringify({
          query: `query {
            products (first: ${first}${newquery}) {
              edges {
                node { ${field_join} 
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
          }`,
          variables: {},
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: graphql,
        };
        console.log(requestOptions, "requestOptions");
        const response = await fetch(
          `https://${shop}/admin/api/2024-01/graphql.json`,
          requestOptions
        );
        message = "Products fetched successfully";
        data_response = await response.json();
      } catch (error) {
        console.error(error); // Log any errors
        return cors(request, json({ success: false, error: "Error fetching products" })); // Return JSON response indicating failure
      }
      break;
      case "selectedProdctsData":
        try {
          const graphql = JSON.stringify({
            // query: `query {
            //   products (first: ${first}) {
            //     edges {
            //       node { ${field_join} }
            //     }
            //   }
            // }`,


            query: `{
              products(first: ${first}) {
                edges {
                  node {
                    ${field_join}
                  }
                }
                nodes {
                  images(first: 10) {
                    nodes {
                      src
                      url
                    }
                  }
                  id
                  title
                }
              }
            }`,

            











            variables: {},
          });


          console.log(graphql,"swwwwwwwwwwwwwwwwww")
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: graphql,
          };
          console.log(requestOptions, "requestOptions");
          const response = await fetch(
            `https://${shop}/admin/api/2024-01/graphql.json`,
            requestOptions
          );
          message = "Products fetched successfully";
          data_response = await response.json();
          console.log(data_response,"deeeeeeeeee")
        } catch (error) {
          console.error(error); // Log any errors
          return cors(request, json({ success: false, error: "Error fetching products" })); // Return JSON response indicating failure
        }
        break;
    default:
      return cors(request, json({ success: false, error: "Invalid query type" }));
  }

  return cors(
    request,
    json({
      success: true,
      message: message ?? null,
      response: data_response,
    })
  );
};
