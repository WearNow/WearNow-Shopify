import React, { useState, useEffect } from "react";
import axios from "axios";
 import {apiURL} from "../services/Services"
 import client from "../services/ApolloClient"
 import gql from "graphql-tag"



 export const sub_str = (str:string, start:number, length:number) => {
  // Implementation of the sub_str function
  return str.substring(start, length)
};


const ProdcutModal: React.FC<{
  isOpen: boolean;
  toggleModal: () => void;
  sessionData: any;
  inputData: number;
  updateCheckedData: (data: any[]) => void; 
}> = ({ isOpen, toggleModal, sessionData, inputData,updateCheckedData }) => {
  const [getproducts, setgetproducts] = useState([]);
  const [inputQueryValue, setInputQueryValue] = useState("");
  const [checkedProducts, setCheckedProducts] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (inputData || inputQueryValue) {
      fetchProductData();
    }
  }, [inputData, inputQueryValue]);

  const fetchProductData = async () => {
    try {
      const data = JSON.stringify({
        queryfor: "product",
        first: 50,
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
              selectedVariants.push(variant);
            });
          });
        console.log(selectedVariants,"selectedProductsselectedProductsselectedProducts",selectedProducts);
        const collabProduct=[...selectedProducts,...selectedVariants];
        console.log(collabProduct,"selectedProductsselectedProducts");
        const MY_MUTATION = gql`
          mutation MyMutation($variantId: String!, $title: String!, $storeId: uuid!, $sku: String!, $productId: String!, $price: String!, $images: json!) {
            insert_store_products(objects: {variant_id: $variantId, title: $title, store_id: $storeId, sku: $sku, product_id: $productId, price: $price, images: $images}) {
              returning {
                images
                title
                variant_id
                product_id
              }
            }
          }
        `;
          try {
            collabProduct.map(async(cp) => {
            const result = await client.mutate({
              mutation: MY_MUTATION,
              variables: {
                variantId: cp.vid,
                title: cp.title,
                storeId: sessionData.authWithShop.store_id,
                sku: "afsd",
                productId: cp.pid,
                price: "sadf",
                images: `{"url":"${cp.image}"}`,
              },
            });
            console.log('Mutation result:', result);
            });
            

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
    console.log(checkedData, "selected data ");
    updateCheckedData(checkedData);
  };

  return (
    <div className="parent_model">
      <div className={`modal ${isOpen ? "open" : "closed"}`}>
        <div className="flex flex-col rounded-lg shadow-sm bg-[color:var(--p-color-bg-surface)] max-w-[620px]">
          <div className="justify-center py-3 pr-3 pl-4 text-sm leading-5 border-b border-solid bg-[color:var(--p-color-surface-tertiary)] border-neutral-200 font-[650] text-[color:var(--p-color-text)] max-md:max-w-full">
            Select products to import
          </div>
          <div className="flex flex-col items-start self-center px-5 mt-4 w-full text-sm leading-5 rounded-xl max-w-[628px] max-md:max-w-full"style={{height:"50vh",overflowY:"scroll"}}>
            <div className="flex gap-1 self-stretch max-md:flex-wrap">
              <div
                className="flex gap-1 px-3 py-1.5 whitespace-nowrap bg-white border border-solid border-zinc-500 font-[450] rounded-[var(--p-border-radius-button)] text-[color:var(--p-color-text-secondary)] max-md:flex-wrap"
                style={{ width: "74%", borderRadius: "10px" }}
              >
                <img
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
                <img
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
              <div
                key={index}
                className="flex gap-2 py-1 font-[450] text-[color:var(--p-color-text)] product_items"
              >
              <div className="product_item_content">  
                <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                  <input
                    type="checkbox"
                    checked={checkedProducts[product.node.id]} // Check if the product is checked
                    onChange={() => handleCheckboxChange(product.node.id)} // Handle checkbox change
                  />
                  <label htmlFor="checkbox"></label>
                </div>
               <div >
                  <img src={product?.node?.images?.nodes[0]?.src ?product.node.images.nodes[0].src + "&height=20":null} /></div>
                    <div className="product_title">{sub_str(product.node.title,0,20)}</div>
               </div>
               <div className="variant_item_content">
                    {product?.node?.variants?.nodes.map((item, index) => (
                      <>
                    {item.title!="Default Title" && (
                    <div
                    key={index}
                    className="variant_item flex gap-2 py-1 font-[450] text-[color:var(--p-color-text)]"
                    >
                    <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                    <input
                      type="checkbox"
                      checked={checkedProducts[item.id]} // Check if the product is checked
                      onChange={() => handleVariantCheckboxChange(item.id)} // Handle checkbox change
                    />
                    <label htmlFor="checkbox"></label>
                    </div>
                    <div><img src={item?.image?.src ?item?.image?.src + "&height=20":null} /></div>
                    <div>{sub_str(item.title,0,20)}</div>
                    </div>
                    )}
                    </>
                    ))}
                </div>
              </div>
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

export default ProdcutModal;
