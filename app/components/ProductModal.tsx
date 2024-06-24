import React, { useState, useEffect } from "react";
import {Checkbox} from '@shopify/polaris';
import axios from "axios";
 import {apiURL} from "../services/Services"
 import client from "../services/ApolloClient"
 import gql from "graphql-tag"

 export const sub_str = (str:string, start:number, length:number) => {
  // Implementation of the sub_str function
  return str.substring(start, length)
};


const ProductModal: React.FC<{
  isOpen: boolean;
  toggleModal: () => void;
  sessionData: any;
  fetchProducts: any; 
  products:any;
}> = ({ isOpen, toggleModal, sessionData,fetchProducts,products }) => {
  const [getproducts, setgetproducts] = useState([]);
  const [active,setActive] = useState([]);
  const [inputQueryValue, setInputQueryValue] = useState("");
  const [checkedProducts, setCheckedProducts] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(()=>{
    client
   .query({
     query: gql`
         query MyQuery6($store_id:uuid) {
         store_subscription(where: {store_id: {_eq: $store_id},status:{_eq:"active"}}) {
           store {
             name
             uuid
           }
           package {
            created_at
            customized_models
            cycle
            description
            hd_photos
            name
            number_of_products
            price
            pro_models
            product_photo_limit
            strike_amount
            support_text
            uuid
            vto_limit
           }
           status
           created_at
         }
       }`,
     fetchPolicy: "network-only",
     variables:{
       store_id: sessionData.authWithShop.store_id,
     }
   })
   .then((result) => {
    let planname="partner_test"
    const myHeader = new Headers();
        myHeader.append("X-Shopify-Access-Token", sessionData.authWithShop?.accessToken);
  
        const requestOption = {
          method: "GET",
          headers: myHeader,
          redirect: "follow"
        };
  
        fetch(`https://${shop}/admin/api/2024-04/shop.json`, requestOption)
          .then((response) => response.json())
          .then((result) => {planname=result.shop.plan_name})
          .catch((error) => console.error(error));
     let store_subscription = result.data.store_subscription;
     if(planname=="partner_test"){
      store_subscription[0].package.number_of_products=5;
      store_subscription[0].package.pro_models=5;
      store_subscription[0].package.product_photo_limit=5;
      //store_subscription[0].package.vto_limit=5;
      store_subscription[0].package.vto_limit=5;
     }
         setActive(store_subscription[0].package);
   });
 },[]);

  useEffect(() => {
   
      fetchProductData();
      products?.map((product:any) =>{
        setCheckedProducts((prevState) => ({
          ...prevState,
          [product.variant_id]: true,
        }));
        setCheckedProducts((prevState) => ({
          ...prevState,
          [product.product_id]: true,
        }));
      })
    
  }, [inputQueryValue]);

  const fetchProductData = async () => {
    try {
      const data = JSON.stringify({
        queryfor: "product",
        first: 250,
        fields: "id,title,",
        pagination: "yes",
        shop: sessionData.authWithShop.shop,
        searchQuery: inputQueryValue,
      });
      console.log(data,"data sending for the quey");
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiURL}api/query`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          console.log(response.data,"response from graphql api");
          const getproductsTitle = response.data.response.data.products?.edges;
          setgetproducts(getproductsTitle);
        })
        .catch((error) => {
          console.log(error);
        }); 
    } catch (error) {}
  };

  const sendSelectedProdcut = async () => {
    try {
      console.log("checkedProductscheckedProductscheckedProducts",checkedProducts)
      // Get an array of selected product IDs
      const selectedProductIds = Object.keys(checkedProducts).filter(
        (productId) => checkedProducts[productId]
      );
  
      // Filter the products based on the selected IDs and map them to include titles
      const selectedProducts = getproducts.filter((product) => selectedProductIds.includes(product.node.id)).map((product) => ({
            id: product.node.id,
            title: product.node.title,
            image: product.node.images.nodes[0] ? product.node.images.nodes[0].src : null,
            pid: product.node.id,
            vid: product.node.variants.nodes[0].id
          }));
          const selectedVariants:any = [];
          getproducts.forEach((product:any, index:number) => {
            const filteredVariants = product.node.variants.nodes.map((item:any)=> ({
              id:item.id,
              title: item.title,
              image: item.image?.src,
              pid:product.node.id,
              vid:item.id
            })).filter((item:any)=> selectedProductIds.includes(item.id));
            filteredVariants.forEach((variant:any) => {
              if(variant.title!='Default Title'){
              selectedVariants.push(variant);
              }
            });
          });
        console.log(selectedVariants,"selectedProductsselectedProductsselectedProducts",selectedProducts);
        const collabProduct=[...selectedProducts,...selectedVariants];
        console.log(collabProduct,"selectedProductsselectedProducts");
        const sendProducts:any[]=[];
        
        collabProduct.map(async(cp) => {
          if(cp.product_id!='' && cp.image!="" && cp.image!=null){
         var sp= {
            photos:[{url:cp.image?cp.image:"image"}],
            price:123,
            product_id:cp.pid,
            sku:"10001",
            title:cp.title,
            variant_id:cp.vid
          }
          if(!active?.number_of_products || active?.number_of_products>=sendProducts.length) {
          sendProducts.push(sp);
          }
          }
        })
        
        
        const MY_MUTATIONDEL = gql`
        mutation MyMutation4($storeId: uuid!) {
          delete_store_products(where: {store_id: {_eq: $storeId}}) {
            returning {
              title
              images
              uuid
            }
          }
        } `;
        
          try {
            const result = await client.mutate({
              mutation: MY_MUTATIONDEL,
              fetchPolicy: "network-only",
              variables: {           
                storeId: sessionData.authWithShop.store_id,
              },
            });
            console.log('Mutation result dELETE:', result);
          } catch (error) {
            console.error('Error executing mutation:', error);
          }
          const store_id = sessionData.authWithShop.store_id;
        const MY_MUTATION = gql`
          mutation MyMutation($storeId:String!,$products:[Product]!) {
              onboardStore(input:{
                background:"background",
                model:"model",
                pose:"pose",
                store_id:$storeId,
                products:$products
              }){
                message
                success
              }
          }
        `;
          try {
            const result = await client.mutate({
              mutation: MY_MUTATION,
              fetchPolicy: "network-only",
              variables: {
                storeId: store_id,
                products: sendProducts
              },
            });
            console.log('Mutation result:', result);

            fetchProducts();
          } catch (error) {
            console.error('Error executing mutation:', error);
          }
      
    } catch (error) {
      console.log(error);
    }
  };
  
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQueryValue(event.target.value); // Update inputQueryValue on input change
  };

  const handleCheckboxChange = (productId: string) => {
    getproducts.filter((product) => productId.includes(product.node.id)).forEach((product:any, index:number) => {
      const filteredVariants = product.node.variants.nodes.map((item:any)=> ({
        id:item.id,
        title: item.title,
        image: item.image?.src
      }))
      filteredVariants.forEach((variant:any) => {
        setCheckedProducts((prevState) => ({
          ...prevState,
          [variant.id]: !prevState[productId],
        }));
      });
    });
    setCheckedProducts((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };
  const handleVariantCheckboxChange = (variantId: string) => {
    setCheckedProducts((prevState) => ({
      ...prevState,
      [variantId]: !prevState[variantId],
    }));
    getproducts.forEach((product:any, index:number) => {
      const filteredVariants = product.node.variants.nodes.filter((item:any) => variantId.includes(item.id)).map((item:any)=> ({
        id:item.id,
        title: item.title,
        image: item.image?.src,
        pid:product.node.id
      }))
      filteredVariants.forEach((variant:any) => {
       
        if(checkedProducts[variant.id]===undefined || checkedProducts[variant.id]==false){
          
          setCheckedProducts((prevState) => ({
            ...prevState,
            [variant.pid]: true,
          }));
        
        }
        else{
          let check=false;
          getproducts.filter((inner) => variant.pid.includes(inner.node.id)).forEach((inner:any) => {
             inner.node.variants.nodes.map((v:any)=> {
                if(variant.id!=v.id && checkedProducts[v.id]==true){
                    check=true;
                }
            })
          })
          if(!check){   
            setCheckedProducts((prevState) => ({
              ...prevState,
              [variant.pid]: false,
            }));
            
          }
        }
      }); 
    });
  };

  const displayCheckedData = () => {
    const checkedData = getproducts.filter(
      (product) => checkedProducts[product.node.id]
    );
   
  };
  getproducts.map((product, index) => {
   
    console.log(products?.filter((sp:any) =>product.node.id.includes(sp.product_id)),product.node.title,"product.node.id=>"+product.node.id);
  });
  return (
    <div className="parent_model">
      <div className={`modal ${isOpen ? "open" : "closed"}`}>
        <div className="flex flex-col rounded-lg shadow-sm bg-[color:var(--p-color-bg-surface)] max-w-[620px]">
          <div className="justify-center py-3 pr-3 pl-4 text-sm leading-5 border-b border-solid bg-[color:var(--p-color-surface-tertiary)] border-neutral-200 font-[650] text-[color:var(--p-color-text)] max-md:max-w-full">
            Select products to import
          </div>
          <div className="flex flex-col items-start self-center px-5 pr-[0px] mt-4 w-full text-sm leading-5 rounded-xl max-w-[628px] max-md:max-w-full"style={{height:"50vh",overflowY:"scroll"}}>
            <div className="search_model_content flex gap-5 self-stretch max-md:flex-wrap">
              <div
                className="search_model flex gap-1 px-3 py-1.5 whitespace-nowrap bg-white border border-solid border-zinc-500 font-[450] rounded-[var(--p-border-radius-button)] text-[color:var(--p-color-text-secondary)] max-md:flex-wrap"
                style={{ width: "74%", borderRadius: "10px" }}
              >
                <img height="100%" width="100%"
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e4a1b0c13fb249d11f4e19cda011d281e3460ad21e2eb935e99bdf9a0cd87b2?"
                  className="shrink-0 w-5 aspect-square"
                  alt=""
                />
                <input
                  type="text"
                  className="text-ellipsi modal_input"
                  placeholder="Search"
                  value={inputQueryValue} // Use inputQueryValue as value
                  onChange={handleInputChange} // Handle input change
                />
              </div>
              <div className="flex gap-0.5 justify-center px-3 py-1.5 shadow-sm bg-[color:var(--p-color-bg-fill)] font-[550] rounded-[var(--p-border-radius-button)] text-[color:var(--p-color-text)]">
                <img height="100%" width="100%"
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/53a28fdab9bcb208d45fcf699a0e4716ecf152e2e5d485f24c2277277929c386?"
                  className="shrink-0 my-auto w-4 aspect-square"
                  alt=""
                />
                <div style={{fontSize:"13px"}}>Most popular</div>
              </div>
            </div>
            <div className="mt-3 font-[450] text-[color:var(--p-color-text)]">
              {/* Available products */}
            </div>
            {/* Mapping through productTitles array */}
            {getproducts.map((product, index) => (
              <>
              {product?.node?.images?.nodes[0]?.src && (
               <>
              <div
                key={index}
                className="flex gap-2 py-1 font-[450] text-[color:var(--p-color-text)] product_items"
              >
              <div className="product_item_content">  
              {products?.some((sp: any) => product.node.id.includes(sp.product_id)) ? (
                  <Checkbox
                      label=""
                      checked={checkedProducts[product.node.id]} // Check if the product is checked
                      disabled={checkedProducts[product.node.id]}
                    onChange={() => handleCheckboxChange(product.node.id)} // Handle checkbox change
                    />
                  ):(
                    <Checkbox
                      label=""
                      checked={checkedProducts[product.node.id]} // Check if the product is checked
                    onChange={() => handleCheckboxChange(product.node.id)} // Handle checkbox change
                    />
                  )}
               <div >
                  <img height="100%" width="100%" src={product?.node?.images?.nodes[0]?.src ?product.node.images.nodes[0].src + "&height=20":null} /></div>
                    <div className="product_title">{sub_str(product.node.title,0,20)}</div>
               </div>
               <div className="variant_item_content">
                    {product?.node?.variants?.nodes.map((item, index) => (
                      <>
                    {item?.image?.src && item.title!="Default Title" && (
                    <div
                    key={index}
                    className="variant_item flex gap-2 py-1 font-[450] text-[color:var(--p-color-text)]"
                    >
                   {products?.some((sp:any) =>item.id.includes(sp.variant_id)) ? (
                    <Checkbox
                      label=""
                      checked={checkedProducts[item.id]} // Check if the product is checked
                      disabled={checkedProducts[item.id]}
                      onChange={() => handleVariantCheckboxChange(item.id)} // Handle checkbox change
                    />
                   ):(
                    <Checkbox
                      label=""
                      checked={checkedProducts[item.id]} // Check if the product is checked
                      onChange={() => handleVariantCheckboxChange(item.id)} // Handle checkbox change
                    />
                   )}
                    <div><img height="100%" width="100%" src={item?.image?.src ?item?.image?.src + "&height=20":null} /></div>
                    <div>{sub_str(item.title,0,20)}</div>
                    </div>
                    )}
                    </>
                    ))}
                </div>
              </div>
              </>
            )}
            </>
            ))}
          </div>
          <div className="modal_control_btn flex gap-2 p-4 mt-4 w-full border-t border-solid bg-[color:var(--p-color-bg-surface)] border-neutral-200 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
            <div
              className="cursor-pointer cancel_btn justify-center px-3 py-1.5 text-xs leading-4 whitespace-nowrap shadow-sm bg-[color:var(--p-color-bg-fill)] font-[550] rounded-[var(--p-border-radius-button)] text-[color:var(--p-color-text)]"
              onClick={toggleModal}
            >
              Cancel
            </div>
            <div
               onClick={() => {
                // Close the modal if needed
                toggleModal();
                
                // Send selected product data to the API
                sendSelectedProdcut();
                
                // Display checked data in console
                displayCheckedData();
              }}
              className="cursor-pointer done_btn flex flex-col justify-center px-3 py-1.5 bg-[color:var(--p-color-bg-fill-brand)] rounded-[var(--p-border-radius-button)]"
            >
              <div className="shrink-0 h-7 shadow-sm bg-[linear-gradient(180deg,)] rounded-[var(--p-border-radius-button)]">
                Done
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
