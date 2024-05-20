import React, { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import axios from "axios";
import DashboardHeader from "~/components/DashboardHeader";
import SelectOnboarding from "~/components/SelectOnboarding";
import SelectedOnbording from "~/components/SelectedOnbording";
import FadedOnboarding from "~/components/FadedOnboarding";
import ProductSelector from "~/components/ProductoSelector";
import ThumbnailSelector from "~/components/ThumbnailSelector";
import BackGroundSelector from "~/components/BackGroundSelector";
import client from "../services/ApolloClient";
import gql from "graphql-tag";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const  admin1  = await authenticate.admin(request);
    const {shop}  =  admin1.session ?? null
    // const auth_session = await db.session.findFirst({
    //   where: { shop },
    // });
    let auth_session={};
  
    console.log(shop,"hsop shop")
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
      variables: {
        shop: shop,
      },
    })
    .then((result) => {
      auth_session=result?.data.session[0] ?? result?.data.session;
      console.log(result.data.session, "apollo client");
    });
    const authWithShop = {
      ...auth_session,
      shop: shop,
      tryOn:false
    };
    console.log(authWithShop,"auth session");
    
      return {authWithShop}
  };

const SecondHeader: React.FC = () => {
    const sessionData = useLoaderData<typeof loader>();
  const [products, setProducts] = useState<any[]>([]);
  const [dataLimit, setDataLimit] = useState({ start: 0, end: 3 });
  const [checkedProduct, setCheckedProduct] = useState<string>();
  const [models, setModels] = useState<any>();
  const [backgrounds, setBackgrounds] = useState<any>();
  const [poses, setPoses] = useState<any>();
  const [model, setModel] = useState<string>();
  const [background, setBackground] = useState<string>();
  const [pose, setPose] = useState<string>();
  const [tmpCheckedProduct, setTmpCheckedProduct] = useState<string>();
  const [tmpModel, setTmpModel] = useState<string>();
  const [tmpBackground, setTmpBackground] = useState<string>();
  const [tmpPose, setTmpPose] = useState<string>();
  const [stylehide, setStylehide] = useState({ opacity: 0.3, pointerEvents: "none" });
  const [currentStep, setCurrentStep] = useState(0);
  const stepModel = "02";
  const textModel = "Select a Model";
  const stepBackground = "03";
  const textBackground = "Select a Background";
  const stepPose = "04";
  const textPose = "Select a Pose";

 

  async function getAllImages(){
    await client
    .query({
      query: gql`
      query MyQuery4 {
        default_pose(limit: 10) {
          name
          image
          featured
          active
          created_at
          uuid
        }
        default_background(limit: 10) {
          active
          created_at
          featured
          image
          name
          uuid
        }
        pretrained_models(limit: 10) {
          cover_image
          created_at
          description
          featured
          name
          uuid
        }
      }`,
      variables: {
        storeid: sessionData.authWithShop.store_id,
      },
    })
    .then((result) => {
      
        console.log("Result images: model,background,pose :::" , result);
        setModels(result.data.pretrained_models);
        setBackgrounds(result.data.default_background);
        setPoses(result.data.default_pose);
    });
  }
useEffect(() =>{
  getAllImages();

  
},[]);
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
  `,fetchPolicy:'network-only',
        variables: {
          storeid: sessionData.authWithShop.store_id,
        },
      })
      .then((result) => {
        var store_products = result.data.store_products;
        // Map over store_products to create a new array with the added 'image' property
        const updatedStoreProducts = store_products.map((sp:any, index:number) => {
          // Assuming sp.images is already a JSON string that needs to be parsed
          let images = JSON.parse(sp.images);
          console.log("images: :::" , images.url);
          return {
            ...sp, // Spread the existing properties of the product
            image: images.url // Add the new image property
          };
        });
         
        setProducts(updatedStoreProducts);
        console.log("apollo client store id: :::",updatedStoreProducts);
      });


}; 
useEffect(() => {
  // Call the fetchProducts function when the component mounts
  fetchProducts();
}, []);

  console.log(products, "Second Header products");

  const handleCheckboxChange = (productId: string) => {
    console.log(productId,":::::is the product checked");
    setCheckedProduct(productId);
  };



  const handleEdit = (step:string)=>{
    setCurrentStep(parseInt(step)-1)
   
  };
  const handleNext = async () => {
    if(checkedProduct && currentStep==0){   
        if(currentStep<3){
        setCurrentStep(currentStep+1)
        }
    }
    if(model && currentStep==1){
        if(currentStep<3){
        setCurrentStep(currentStep+1)
        }
    }
    if(background && currentStep==2){
        if(currentStep<3){
        setCurrentStep(currentStep+1)
        }
    }
  }
  const handleSave = async()=>{
    const MyMutation = gql`
    mutation MyMutation($background: String!, $model: String!, $pose: String!, $store_id: uuid!, $productId: String!, $price: String!, $images: String!){
      onboardStore(input:{
        background:$background,
        model:$model,
        pose:$pose,
        store_id:$store_id,
        products:[
          {
            photos:[{filename:"test.jpg",url:"https://api.mehala.et/media/stamps/pngwing.com_8Yzx46x.png"}],
            price:123,
            product_id:"prod_id2",
            sku:"10001",
            title:"Prod Title1",
            variant_id:"variant_id1"
          }
        ]
      }){
        message
        success
      }
    } `;

try {
  const result = await client.mutate({
    mutation: MyMutation,
    variables: {
      background: background,
      model: model,
      pose: pose,
      store_id: sessionData.authWithShop.store_id,
      productId:checkedProduct
    },
  });

  console.log('Mutation result:', result);

} catch (error) {
  console.error('Error executing mutation:', error);
}
    
  }

  const renderRight = () => {
    switch (currentStep) {
      case 0:
        return <ProductSelector product={checkedProduct} products={products} handleCheckboxChange={handleCheckboxChange} />;
      case 1:
        return (
          <ThumbnailSelector 
            modelSelectId={model}
            setSelectModelId={setModel}
            ModuleData={models}
          />
        );
      case 2:
        return (
          <BackGroundSelector
            backgroundSelectId={background}
            setSelectBgId={setBackground}
            BgData={backgrounds}
          />
        );
      case 3:
        return (
          <BackGroundSelector
            backgroundSelectId={pose}
            setSelectBgId={setPose}
            BgData={poses}
          />
        );
      default:
        return <PhotoToShow photos={photos} />;
    }
  };
  console.log("crrent Index: " +currentStep)
  console.log("products: " ,products)
  return (
    <div className="bg-white h-full">
      <DashboardHeader />
      <div className="lg:w-[1272px] lg:pl-10 lg:p min-h-[755px] lg:m-auto flex flex-wrap  ">
      <div className="lg:w-1/2 max-lg:ml-0 max-lg:w-full max-lg:mt-10">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className='flex w-[768px] flex-col gap-[32px] items-start shrink-0 flex-nowrap relative'>
          <div className='flex w-[768px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[1]'>
            <span className="h-[45px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[36px] font-medium leading-[45px] text-[#1d2127] relative text-left whitespace-nowrap z-[2]">
              Create Your First Product Photo
            </span>
            <span className="flex w-[434px] h-[24px] justify-start items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#52575d] relative text-left whitespace-nowrap z-[3]">
              Take your product photos to the next level in just 4 easy steps!
            </span>
          </div>


          <div className='flex  flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
            {!checkedProduct ? (
              <>
              <div className='flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[5]'>
                
                <div className='flex w-[530px] h-[88px] flex-col gap-[6px] items-start shrink-0 flex-nowrap' style={{ marginLeft: "50px", marginTop: "20px" }}>
                  <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[60]'>
                    <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#344053] relative text-left whitespace-nowrap z-[61]">
                      Please select the number of photos you would like to create
                    </span>
                    <div className='flex items-start self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#cfd4dc] relative shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] z-[62]'>
                      <div className='flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[63]'>
                        <div className='flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[64]'>
                          <select className="cstm_select h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#667084] relative text-left overflow-hidden whitespace-nowrap z-[65]">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
              {!model ?
              <FadedOnboarding step={stepModel} sectionText={textModel} />
              :
              <>
              {models.filter((m:any)=>model==m.uuid).map((m:any)=>( 
                <SelectedOnbording step={stepModel} data={m.name}  image={m.cover_image} handleEdit={handleEdit} />
              ))}
              </>
              }
              {!background ?
              <FadedOnboarding step={stepBackground} sectionText={textBackground} />
              :
              <>
              {backgrounds.filter((b:any)=>background==b.uuid).map((b:any)=>( 
              <SelectedOnbording step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
            ))}
              </>
              }
              {!pose ?
              <FadedOnboarding step={stepPose} sectionText={textPose} />
              :
              <>
              {poses.filter((p:any)=>pose==p.uuid).map((p:any)=>( 
              <SelectedOnbording step={stepPose} data={p.name} image={p.image} handleEdit={handleEdit} />
            ))}
              </>
              }
              
              
              </>
            ) : (
              <>
                {products.filter((product: any) => checkedProduct.includes(product.uuid)).map((product, index) => (

                    <SelectedOnbording step="01"  value={checkedProduct} data={product.title} image={product.image} handleEdit={handleEdit} />
                ))}
                {!model && (
                  <>
                  
                  
                    <FadedOnboarding step={stepModel} sectionText={textModel} />
                  {!background ?
                    <FadedOnboarding step={stepBackground} sectionText={textBackground} />
                    :
                    <>
                    {backgrounds.filter((b:any)=>background==b.uuid).map((b:any)=>( 
                    <SelectedOnbording step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
                  ))}
                    </>
                    }
                  {!pose ?
                    <FadedOnboarding step={stepPose} sectionText={textPose} />
                    :
                    <>
                    {poses.filter((p:any)=>pose==p.uuid).map((p:any)=>( 
                    <SelectedOnbording step={stepPose} data={p.name} image={p.image} handleEdit={handleEdit} />
                  ))}
                    </>
                    }
                  </>
                )}
                {model && !background ? (
              <>
              {models.filter((m:any)=>model==m.uuid).map((m:any)=>( 
              <SelectedOnbording step={stepModel} data={m.name}  image={m.cover_image} handleEdit={handleEdit} />
            ))}
               <FadedOnboarding step={stepBackground} sectionText={textBackground} />
              {!pose ?
                    <FadedOnboarding step={stepPose} sectionText={textPose} />
                    :
                    <>
                    {poses.filter((p:any)=>pose==p.uuid).map((p:any)=>( 
                    <SelectedOnbording step={stepPose} data={p.name} image={p.image} handleEdit={handleEdit} />
                  ))}
                    </>
                    }
              </>
            ):(
              <>
              {model && background && !pose && (
                <>
              {models.filter((m:any)=>model==m.uuid).map((m:any)=>( 
              <SelectedOnbording step={stepModel} data={m.name}  image={m.cover_image} handleEdit={handleEdit} />
            ))}
             {backgrounds.filter((b:any)=>background==b.uuid).map((b:any)=>( 
              <SelectedOnbording step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
            ))}
              <FadedOnboarding step={stepPose} sectionText={textPose} />
              </>
              )}
              </>
            )}
            {model && background && pose && (
                <>
                {models.filter((m:any)=>model==m.uuid).map((m:any)=>( 
              <SelectedOnbording step={stepModel} data={m.name}  image={m.cover_image} handleEdit={handleEdit} />
            ))}
            {backgrounds.filter((b:any)=>background==b.uuid).map((b:any)=>( 
              <SelectedOnbording step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
            ))}
             {poses.filter((p:any)=>pose==p.uuid).map((p:any)=>( 
              <SelectedOnbording step={stepPose} data={p.name} image={p.image} handleEdit={handleEdit} />
            ))}
              </>
              )}
              </>
            )}
           
             
                
             
           
            
           
           
          
            <div className='flex w-[236px] h-[44px] gap-[20px] items-start shrink-0 flex-nowrap  top-[535px] left-0 z-[82]'>
                {!pose ?(
               <button onClick={handleNext} className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer'>
                <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]' >
                  <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[85]">
                    Next
                  </span>
                  <div className='w-[5px] h-[9px] shrink-0 relative z-[86]'>
                    <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/91099684-9e2c-41ac-8500-9a0d3c52b427.png)] bg-[length:100%_100%] bg-no-repeat relative z-[87] mt-[0.5px] mr-0 mb-0 ml-0' />
                  </div>
                </div>
              </button> 
              ):(
              <button onClick={handleSave} className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer' >
                <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]'>
                  <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[85]">
                    Save
                  </span>
                </div>
              </button>
            )}
            </div>
          </div>
          
        

        </div>
        <div className="lg:w-[528px] lg:h-[715px] max-lg:ml-0 max-lg:w-full max-lg:mt-10">
         {/** right side will show here **/}
         {renderRight()}
        </div>	
      </div>
    </div >
    </div>
    </div>
  );
};

export default SecondHeader;
