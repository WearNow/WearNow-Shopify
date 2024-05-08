import { json } from "@remix-run/node";
import db from "../../db.server";
import { cors } from "remix-utils/cors";
import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.json();
  const queryfor = body.queryfor;
  const shop = body.shop;
  
  // Ensure all required fields are provided
  if (!queryfor || !shop) {
    throw new Error("Missing required fields");
  }
  await db.session.findFirst({
    where: { shop },
  });

  switch (queryfor) {
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
