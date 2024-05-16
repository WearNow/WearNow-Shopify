// import { json } from "@remix-run/node";
import db from "../../db.server";
import { cors } from "remix-utils/cors";
import type { ActionFunctionArgs } from "@remix-run/node";

interface Product {
  id: string;
  title: string;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const body = await request.json(); 
    const { shop, queryfor, selectedProdct, finalSelectedProdcuts, try_on, productID, tryOnPerProduct } = body;

    const auth_session = await db.session.findFirst({
      where: { shop },
    });
    switch (queryfor) {
      case "selectedProductsData":
        await processSelectedProducts(selectedProdct, shop, auth_session); 
        break;
      case "saveTryOn":
        await saveTryOn(shop,try_on);
        break;
      case "tryOnPerProduct":
        await db.session.update({ 
          where: { id:"offline_"+shop }, 
          data:{tryOnPerProduct:tryOnPerProduct}
        });
      break;
      case "deleteProduct":
        const existingProduct = await db.selectProdcutData.findFirst({
          where: { productId: productID },
        });
     
        await db.selectProdcutData.delete({where:{id:existingProduct.id}})
        break;
        
      case "selectedFilnalProdcutData":
        await processFinalSelectedProducts(finalSelectedProdcuts, shop);
        break;
        case "getSelectedProductsData":
         return await getSelectedProducts(shop); 
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
async function processSelectedProducts(products: Product[], shop: string,session:any) {
  const myHeaders = new Headers();
  myHeaders.append("X-Shopify-Access-Token", session.accessToken);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  const response = await fetch(`https://${session.shop}/admin/api/2024-04/shop.json`, requestOptions);

  const responseJson = await response.json();
  const email = responseJson.data.shop.email;
  const store_id = responseJson.data.shop.id;
//   query MyQuery {
//   stores(limit: 10, where: {store_id: {_eq: "87576215865"}}) {
//     name
//     onboarding_status
//     store_id
//     uuid
//   }
// }
//   mutation MyMutation {
//     insert_store_products(objects: {variant_id: "czxc", title: "sadf", store_id: "asdf", sku: "afsd", product_id: "sadf", price: "sadf", images: "{url:sdafasdf}"}) {
//       returning {
//         images
//         title
//         variant_id
//         product_id
//       }
//     }
//   }
  
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
