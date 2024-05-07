// import { json } from "@remix-run/node";
import db from "../../db.server";
// import { cors } from "remix-utils";
import type { ActionFunctionArgs } from "@remix-run/node";

interface Product {
  id: string;
  title: string;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const body = await request.json();
    const { shop, queryfor, selectedProdct, finalSelectedProdcuts, try_on, productID } = body;

    await db.session.findFirst({
      where: { shop },
    });

    switch (queryfor) {
      case "selectedProdctsData":
        await processSelectedProducts(selectedProdct, shop); 
        break;
      case "saveTryOn":
        await saveTryOn(shop,try_on);
        break;
      case "deleteProduct":
        const existingProduct = await db.selectProdcutData.findFirst({
          where: { productId: productID },
        });
     
        await db.selectProdcutData.delete({where:{id:existingProduct.id}})
        break;
        case "getSelectedProdctsData":
         return await getSelectedProducts(shop); 
        break;
      case "selectedFilnalProdcutData":
        await processFinalSelectedProducts(finalSelectedProdcuts, shop);
        break;

      default:
        // console.log("Unknown query type:", queryfor);
        return { error: "Unknown query type", status: 400 };
    }

    return { success: true, status: 200 };
  } catch (error) {
    console.error("Error:", error);
    return { error: "Internal server error", status: 500 };
  }
};
async function getSelectedProducts(shop:string){
  const existingProduct = await db.selectProdcutData.findMany({
    where: { productShop: shop },
  });
  return existingProduct;
}
async function saveTryOn(shop:string,tryOn:boolean)
{
  const try_on= tryOn ? true : false;
  await db.session.update({ 
    where: { id:"offline_"+shop }, 
    data:{tryOn:try_on}
  });
}
async function processSelectedProducts(products: Product[], shop: string) {
  for (const product of products) {
    const { id, title, image } = product;
    const existingProduct = await db.selectProdcutData.findFirst({
      where: { productId: id },
    });

    if (existingProduct) {
      await db.selectProdcutData.update({
        where: { id: existingProduct.id },
        data: {productImage: image, productName: title, productShop: shop },
      });
    } else {
      await db.selectProdcutData.create({
        data: { id, productId: id, productName: title, productImage: image, productShop: shop },
      });
    }
  }
}

async function processFinalSelectedProducts(
  products: { node: Product }[],
  shop: string
) {
  for (const product of products) {
    const { node } = product;
    const { id, title } = node;
    const existingProduct = await db.selectedFilnalProdcutData.findFirst({
      where: { productId: id },
    });

    if (existingProduct) {
      await db.selectedFilnalProdcutData.update({
        where: { id: existingProduct.id },
        data: { productName: title, productShop: shop },
      });
    } else {
      await db.selectedFilnalProdcutData.create({
        data: { id, productId: id, productName: title, productShop: shop },
      });
    }
  }
}
