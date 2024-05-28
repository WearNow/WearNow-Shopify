import React, { useState, useEffect, useCallback } from "react";
import { Link } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData,useNavigate } from "@remix-run/react";
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
import SidebarNavigation from "~/components/SidebarNavigation";
import { Checkbox,Select } from '@shopify/polaris';

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
    const Naviagte = useNavigate()
    useEffect(() =>{
      console.log(sessionData,"session data in main Index session");
          if(sessionData.authWithShop?.state!='active')
          {
            Naviagte('/app/plan',{replace: true});
          }
        },[sessionData]);
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
  const [active, setActive] = useState();
  const [change, setChange] = useState("no");
  const stepModel = "02";
  const textModel = "Select a Model";
  const stepBackground = "03";
  const textBackground = "Select a Background";
  const stepPose = "04";
  const textPose = "Select a Pose";

  const [selected, setSelected] = useState('1');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );


  useEffect(() => { 
    const MyMutationn = gql`
    mutation MyMutation3 ($photo_per_product:String!,$uuid:uuid!){
        update_stores(where: {uuid: {_eq: $uuid}}, _set: {photo_per_product: $photo_per_product}) {
          returning {
            store_id
            uuid
            name
            virtual_enabled
          }
        }
      }
   `;

      const result = client.mutate({
        mutation: MyMutationn,
        variables: {
          photo_per_product: selected,
          uuid: sessionData.authWithShop.store_id
        },
      });

      console.log('Mutation result:', result);
    }, [selected])

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
       store_id: sessionData?.authWithShop?.store_id,
     }
   })
   .then((result) => {
     const store_subscription = result.data.store_subscription;
         setActive(store_subscription[0].package);
   });
 },[]);

  async function getAllImages(){
    await client
    .query({
      query: gql`
      query MyQuery4 ($models:Int){
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
        pretrained_models(limit: $models) {
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
        models: active?.pro_models
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
},[change]);
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
          let images = sp.images.replace("[{'url': '",'');
            images = images.replace("'}]",'');
            console.log("images: :::" , images);
            return {
              ...sp, // Spread the existing properties of the product
              image: images // Add the new image property
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
  const handleSave = async () => {
    let count = 0;
    const query = gql`query MyQuery7 ($storeID:uuid!) {
      store_products_aggregate(limit: 10, where: {store_id: {_eq: $storeID}}) {
        aggregate {
          count(columns: product_id)
        }
      }
    }`;
    try {
      const result = await client.query({
        query: query,
        variables: {
          storeID: sessionData.authWithShop.store_id,
        },
      });

      console.log('Mutation result:', result);
      count = result?.data?.store_products_aggregate?.aggregate?.count ? result?.data?.store_products_aggregate?.aggregate?.count : 0;
    } catch (error) {
      console.error('Error executing mutation:', error);
    }
    console.log(active?.product_photo_limit,"count",count);
    if (!active?.product_photo_limit || active?.product_photo_limit >= count) {
      const MyMutation = gql`
    mutation MyMutation($background: String!, $model: String!, $pose: String!, $store_id: String!, $productId: String!){
      generateSingleStoreProduct(input:{
        background:$background,
        model:$model,
        pose:$pose,
        store_id:$store_id,
        store_product_id: $productId
      }){
        success
        tracking
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

  }
  const handleChange = ()=>{
    console.log('Under Handle Change');
    setChange("yes");
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
            active={active}
            handleChange={handleChange}
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
  const options = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
  ];

  return (
    <div className="photo_studio_container bg-white h-full">
      <DashboardHeader />
      <SidebarNavigation/>
      <div className="position_top lg:w-full  min-h-[755px] lg:m-auto flex flex-wrap  ">
      <div className="lg:w-full max-lg:ml-0 max-lg:w-full">
      <div className="photo_studio_content flex max-md:flex-col max-md:gap-0">
        <div className='flex flex-col w-6/12 max-md:ml-0 max-md:w-full'>
          <div className='photo_studio_title_content flex w-full flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[1]'>
            <span className="virtual_try_on_title shrink-0 basis-auto font-['SF_Pro_Display'] text-[36px] font-medium leading-[31px] text-[#1d2127] relative text-left z-[2]">
              Create Your First Product Photo
            </span>
            <span className="flex w-full h-full justify-start items-start  font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#52575d] relative text-left z-[3]">
              Take your product photos to the next level in just 4 easy steps!
            </span>
          </div>


          <div className='flex  flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
            {!checkedProduct ? (
              <>
              <div className='flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[5]'>
              <div className='after_border flex w-full  flex-col items-start shrink-0 flex-nowrap rounded-[12px]  top-[56px] left-[48px]  z-[14]'>
                  <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[15]'>
                    <div className='flex w-full flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[44]'>
                      <div className='flex w-[188px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[8]'>
                        <button className='flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#000] relative overflow-hidden z-[9] pointer'>
                          <span className="flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#141718] relative text-center z-10">
                            01
                          </span>
                        </button>
                        <span className="h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left z-[11]">
                          Select 1 Product
                        </span>
                      </div>
                     
                    </div>
                  </div>
                </div>
                <div className='flex w-full h-[88px] flex-col gap-[6px] items-start shrink-0 flex-nowrap' style={{ marginLeft: "50px", marginTop: "20px",width:"calc(100% - 50px)" }}>
                  <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[60]'>
                  <Select
                          label="Please select the number of photos you would like to create"
                          options={options}
                          onChange={handleSelectChange}
                          value={selected}
                        />
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

                    <SelectedOnbording step="01"  value={checkedProduct} data={product.title} image={product.image} handleEdit={handleEdit} handleSelectChange={handleSelectChange} selected={selected} />
                ))}
                {!model && (
                  <>
                  {currentStep ==1 ? (
                  <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[15]'>
                    <div className='flex w-full flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[44]'>
                      <div className='flex w-[188px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[8]'>
                        <button className='flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#000] relative overflow-hidden z-[9] pointer'>
                          <span className="flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#141718] relative text-center z-10">
                            02
                          </span>
                        </button>
                        <span className="h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left z-[11]">
                          Select  Model
                        </span>
                      </div>
                     
                    </div>
                  </div>
                ):(
                    <FadedOnboarding step={stepModel} sectionText={textModel} /> 
                  )}
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
            {currentStep==2 ?(
                  <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[15]'>
                    <div className='flex w-full flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[44]'>
                      <div className='flex w-[188px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[8]'>
                        <button className='flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#000] relative overflow-hidden z-[9] pointer'>
                          <span className="flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#141718] relative text-center z-10">
                            03
                          </span>
                        </button>
                        <span className="h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left z-[11]">
                          Select Background
                        </span>
                      </div>
                     
                    </div>
                  </div>
              
            ):(
              <FadedOnboarding step={stepBackground} sectionText={textBackground} />
            )}
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
            {currentStep==3 ?(
                  <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[15]'>
                    <div className='flex w-full flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[44]'>
                      <div className='flex w-[188px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[8]'>
                        <button className='flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#000] relative overflow-hidden z-[9] pointer'>
                          <span className="flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#141718] relative text-center z-10">
                            04
                          </span>
                        </button>
                        <span className="h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left z-[11]">
                          Select Pose
                        </span>
                      </div>
                     
                    </div>
                  </div>
                ):(
                  <FadedOnboarding step={stepPose} sectionText={textPose} />
                )}
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
                  <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left z-[85]">
                    Next
                  </span>
                  <div className='w-[5px] h-[9px] shrink-0 relative z-[86]'>
                    <div className='w-[5.308px] h-[16px]  bg-[length:100%_100%] bg-no-repeat relative z-[87] mt-[0.5px] mr-0 mb-0 ml-0' >
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.293164 2.40888C-0.0977214 2.018 -0.0977214 1.38425 0.293164 0.99336C0.68405 0.602474 1.3178 0.602474 1.70869 0.99336L8.00842 7.29309C8.39894 7.68361 8.39894 8.31678 8.00842 8.7073L1.70869 15.007C1.3178 15.3979 0.68405 15.3979 0.293164 15.007C-0.0977214 14.6161 -0.0977214 13.9824 0.293164 13.5915L5.88448 8.0002L0.293164 2.40888Z" fill="white"></path></svg>
                      </div>
                  </div>
                </div>
              </button> 
              ):(
              <button onClick={handleSave} className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer' >
                <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]'>
                  <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left z-[85]">
                    Save
                  </span>
                </div>
              </button>
            )}
            </div>
          </div>
          
        

        </div>
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
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