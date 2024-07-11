import React, { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import ProductModal from "./ProductModal";
import client from "../services/ApolloClient";
import gql from 'graphql-tag';
import ComingSoon from "./ComingSoon";
import DashboardBlock from "./DashboardBlock";

const VirtualTryOnWithStudio: React.FC<{ sessionData: any }> = (sessionData) => {
  const [modals, setModals] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);
  const session = sessionData.sessionData.sessionData;
  //console.log("sessionData:::=>",sessionData.sessionData.sessionData);
  const toggleModal = () => {
    setModals(!modals);
  };
  const fetchProducts = async () => {

    await client
      .query({
        query: gql`
    query MyQuery3($storeid: uuid!) {
    store_products(limit: 50, where: {store_id: {_eq: $storeid}}) {
      store_id
      title
      uuid
      variant_id
      product_id
      images
      price
      sku
    }
  }
  `, fetchPolicy: "network-only",
        variables: {
          storeid: session.authWithShop.store_id,
        },
      })
      .then((result: any) => {
        var store_products = result.data.store_products;
        // Map over store_products to create a new array with the added 'image' property
        const updatedStoreProducts = store_products.map((sp: any, index: number) => {
          // Assuming sp.images is already a JSON string that needs to be parsed
          let images = sp.images.replace("[{'url': '", '');
          images = images.replace("'}]", '');
          console.log("images: :::", images);
          return {
            ...sp, // Spread the existing properties of the product
            image: images // Add the new image property
          };
        });

        setProducts(updatedStoreProducts);
        console.log("apollo client store id: :::", updatedStoreProducts);
      });


  };
  useEffect(() => {
    // Call the fetchProducts function when the component mounts
    fetchProducts();
  }, []);
  return (
    <>
      {modals && (
        <ProductModal
          isOpen={modals}
          toggleModal={toggleModal}
          sessionData={session}
          fetchProducts={fetchProducts}
          products={products}
        />
      )}
      <div className='virtual_tryon_with_studio  flex w-full gap-[10px] items-start flex-nowrap bg-[#fff] rounded-[16px] relative mx-auto '>
        <DashboardBlock session={session} name="Virtual Try-on" description="Virtual Try-On experiences will be enabled on your store 24 hours after a product is added." buttonName="Change Settings" buttonLink="/app/virtualtryon" addProduct="yes" toggleModal={toggleModal} />

        <DashboardBlock session={session} name="Virtual Photo Studio" description="Create stunning pro-grade product photos with unlimited
                customisation in a few minutes" buttonName="Create Photo" buttonLink="/app/photostudio" addProduct="no" toggleModal={toggleModal} />
      </div>
      <ComingSoon />
    </>
  )
}

export default VirtualTryOnWithStudio
