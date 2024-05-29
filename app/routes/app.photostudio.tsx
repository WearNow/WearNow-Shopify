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
import PhotoToShow from "~/components/PhotoToShow";
import client from "../services/ApolloClient";
import gql from "graphql-tag";
import SidebarNavigation from "~/components/SidebarNavigation";
import { Checkbox,Select,Spinner } from '@shopify/polaris';
import { M } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const  admin1  = await authenticate.admin(request);
    const {shop}  =  admin1.session ?? null
    // const auth_session = await db.session.findFirst({
    //   where: { shop },
    // });
    let auth_session={};
  
    //console.log(shop,"hsop shop")
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
      //console.log(result.data.session, "apollo client");
    });
    const authWithShop = {
      ...auth_session,
      shop: shop,
      tryOn:false
    };
    //console.log(authWithShop,"auth session");
    
      return {authWithShop}
  };

const PhotoStudio: React.FC = () => {
    const sessionData = useLoaderData<typeof loader>();
    const Naviagte = useNavigate()
    useEffect(() =>{
      //console.log(sessionData,"session data in main Index session");
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
  const [save, setSave] = useState<string>("yes");
  const [loader, setLoader] = useState("no");
  const stepModel = "02";
  const textModel = "Select a Model";
  const stepBackground = "03";
  const textBackground = "Select a Background";
  const stepPose = "04";
  const textPose = "Select a Pose";

  const [selected, setSelected] = useState('1');
  const [photos, setPhotos] = React.useState([
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img1.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106",
  ]);

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

      //console.log('Mutation result:', result);
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
        default_pose(limit: 10,order_by: {created_at: desc}) {
          name
          image
          featured
          active
          created_at
          uuid
        }
        default_background(limit: 10,order_by: {created_at: desc}) {
          active
          created_at
          featured
          image
          name
          uuid
        }
        pretrained_models(limit: $models,order_by: {created_at: desc}) {
          cover_image
          created_at
          description
          featured
          name
          uuid
        }
      }`,
      fetchPolicy:"network-only",
      variables: {
        storeid: sessionData.authWithShop.store_id,
        models: active?.pro_models
      },
    })
    .then((result) => {
      
        //console.log("Result images: model,background,pose :::" , result);
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
          let images = sp.images.replace("[{'url': '",'');
            images = images.replace("'}]",'');
            //console.log("images: :::" , images);
            return {
              ...sp, // Spread the existing properties of the product
              image: images // Add the new image property
            };
        });
         
        setProducts(updatedStoreProducts);
        //console.log("apollo client store id: :::",updatedStoreProducts);
      });


}; 
useEffect(() => {
  // Call the fetchProducts function when the component mounts
  fetchProducts();
}, []);

  //console.log(products, "Second Header products");

  const handleCheckboxChange = (productId: string) => {
    //console.log(productId,":::::is the product checked");
    setCheckedProduct(productId);
  };



  const handleEdit = (step:string)=>{
    getAllImages();
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
    setLoader("yes");
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

      //console.log('Mutation result:', result);
      count = result?.data?.store_products_aggregate?.aggregate?.count ? result?.data?.store_products_aggregate?.aggregate?.count : 0;
    } catch (error) {
      //console.error('Error executing mutation:', error);
    }
    //console.log(active?.product_photo_limit,"count",count);
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
  setSave("saved");
  setCurrentStep(9);
  //console.log('Mutation result:', result);

      } catch (error) {
        //console.error('Error executing mutation:', error);
      }
    }

  }
  const handleChange = (message:string)=>{
    getAllImages();
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
            title="Model"
          />
        );
      case 2:
        return (
          <ThumbnailSelector 
            modelSelectId={background}
            setSelectModelId={setBackground}
            ModuleData={backgrounds}
            active={active}
            handleChange={handleChange}
            title="Background"
          />
          // <BackGroundSelector
          //   backgroundSelectId={background}
          //   setSelectBgId={setBackground}
          //   BgData={backgrounds}
          // />
        );
      case 3:
        return (
          <ThumbnailSelector 
            modelSelectId={pose}
            setSelectModelId={setPose}
            ModuleData={poses}
            active={active}
            handleChange={handleChange}
            title="Pose"
          />
          // <BackGroundSelector
          //   backgroundSelectId={pose}
          //   setSelectBgId={setPose}
          //   BgData={poses}
          // />
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
  //console.log(model);
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
              Create Your  Product Photo
            </span>
            <span className="flex w-full h-full justify-start items-start  font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#52575d] relative text-left z-[3]">
              Take your product photos to the next level in just 4 easy steps!
            </span>
          </div>


          <div className='flex  flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
            {!checkedProduct ? (
              <>
              <div className='flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[5]'>
              <div className='after_border flex w-full  flex-col items-start shrink-0 flex-nowrap rounded-[12px]  top-[56px] left-[48px]  z-[14]'>
                  <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[15]'style={{marginBottom:"10px"}}>
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
                <div className='flex w-full  flex-col  items-start shrink-0 flex-nowrap' style={{ marginLeft: "50px", marginTop: "20px",width:"calc(100% - 50px)" }}>
                  <div className='flex flex-col  items-start self-stretch shrink-0 flex-nowrap relative z-[60]'>
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
                <SelectedOnbording save={save} step={stepModel} data={m.name}  image={m.cover_image} handleEdit={handleEdit} />
              ))}
              </>
              }
              {!background ?
              <FadedOnboarding step={stepBackground} sectionText={textBackground} />
              :
              <>
              {backgrounds.filter((b:any)=>background==b.uuid).map((b:any)=>( 
              <SelectedOnbording save={save} step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
            ))}
              </>
              }
              {!pose ?
              <FadedOnboarding step={stepPose} sectionText={textPose} />
              :
              <>
              {poses.filter((p:any)=>pose==p.uuid).map((p:any)=>( 
              <SelectedOnbording save={save} step={stepPose} data={p.name} image={p.image} handleEdit={handleEdit} />
            ))}
              </>
              }
              
              
              </>
            ) : (
              <>
                {products.filter((product: any) => checkedProduct.includes(product.uuid)).map((product, index) => (

                    <SelectedOnbording save={save} step="01"  value={checkedProduct} data={product.title} image={product.image} handleEdit={handleEdit} handleSelectChange={handleSelectChange} selected={selected} />
                ))}
                {!model && (
                  <>
                  {currentStep ==1 ? (
                  <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[15]'style={{marginBottom:"10px"}}>
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
                    <SelectedOnbording save={save} step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
                  ))}
                    </>
                    }
                  {!pose ?
                    <FadedOnboarding step={stepPose} sectionText={textPose} />
                    :
                    <>
                    {poses.filter((p:any)=>pose==p.uuid).map((p:any)=>( 
                    <SelectedOnbording save={save} step={stepPose} data={p.name} image={p.image} handleEdit={handleEdit} />
                  ))}
                    </>
                    }
                  </>
                )}
                {model && !background ? (
              <>
              {models.filter((m:any)=>model==m.uuid).map((m:any)=>( 
              <SelectedOnbording save={save} step={stepModel} data={m.name}  image={m.cover_image} handleEdit={handleEdit} />
            ))}
            {currentStep==2 ?(
                  <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[15]'style={{marginBottom:"10px"}}>
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
                    <SelectedOnbording save={save} step={stepPose} data={p.name} image={p.image} handleEdit={handleEdit} />
                  ))}
                    </>
                    }
              </>
            ):(
              <>
              {model && background && !pose && (
                <>
              {models.filter((m:any)=>model==m.uuid).map((m:any)=>( 
              <SelectedOnbording save={save} step={stepModel} data={m.name}  image={m.cover_image} handleEdit={handleEdit} />
            ))}
             {backgrounds.filter((b:any)=>background==b.uuid).map((b:any)=>( 
              <SelectedOnbording save={save} step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
            ))}
            {currentStep==3 ?(
                  <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[15]'style={{marginBottom:"10px"}}>
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
              <SelectedOnbording save={save} step={stepModel} data={m.name}  image={m.cover_image} handleEdit={handleEdit} />
            ))}
            {backgrounds.filter((b:any)=>background==b.uuid).map((b:any)=>( 
              <SelectedOnbording save={save} step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
            ))}
             {poses.filter((p:any)=>pose==p.uuid).map((p:any)=>( 
              <SelectedOnbording save={save} step={stepPose} data={p.name} image={p.image} handleEdit={handleEdit} />
            ))}
              </>
              )}
              </>
            )}
           
             
          
            <div className='flex  h-[44px] gap-[20px] items-start shrink-0 flex-nowrap  top-[535px] left-0 z-[82]'>
                {!pose ?(
               <button onClick={handleNext} className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer'>
                <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]' >
                  <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left z-[85]">
                    Next
                  </span>
                  <div className='w-[5px] h-[16px] shrink-0 relative z-[86]'>
                    <div className='w-[5.308px] h-[16px]  bg-[length:100%_100%] bg-no-repeat relative z-[87] mr-0 mb-0 ml-0' >
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.293164 2.40888C-0.0977214 2.018 -0.0977214 1.38425 0.293164 0.99336C0.68405 0.602474 1.3178 0.602474 1.70869 0.99336L8.00842 7.29309C8.39894 7.68361 8.39894 8.31678 8.00842 8.7073L1.70869 15.007C1.3178 15.3979 0.68405 15.3979 0.293164 15.007C-0.0977214 14.6161 -0.0977214 13.9824 0.293164 13.5915L5.88448 8.0002L0.293164 2.40888Z" fill="white"></path></svg>
                      </div>
                  </div>
                </div>
              </button> 
              ):(
                <>
              { save == "saved" ? (
                
                <div className='flex w-full h-[102px] pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[12px] items-center flex-nowrap bg-[#e8f6e9] rounded-[8px] mx-auto my-0'>
                <div className='flex flex-col gap-[12px] items-start grow shrink-0 basis-0 flex-nowrap relative'>
                  <div className='flex flex-col  items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                    <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[2]'>
                      <div className='w-[18px] h-[18px] shrink-0 relative overflow-hidden z-[3]'>
                        <div className='w-[15px] h-[15px] bg-no-repeat relative z-[4] mr-0 mb-0 ml-[1.5px]' >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                            <path d="M9 1.55664C7.51664 1.55664 6.06659 1.99651 4.83323 2.82062C3.59986 3.64473 2.63856 4.81607 2.07091 6.18651C1.50325 7.55696 1.35472 9.06496 1.64411 10.5198C1.9335 11.9747 2.64781 13.311 3.6967 14.3599C4.7456 15.4088 6.08197 16.1231 7.53683 16.4125C8.99168 16.7019 10.4997 16.5534 11.8701 15.9857C13.2406 15.4181 14.4119 14.4568 15.236 13.2234C16.0601 11.99 16.5 10.54 16.5 9.05664C16.4978 7.06819 15.7069 5.1618 14.3009 3.75575C12.8948 2.3497 10.9885 1.55882 9 1.55664ZM9 12.8066C8.85167 12.8066 8.70666 12.7627 8.58332 12.6802C8.45999 12.5978 8.36386 12.4807 8.30709 12.3436C8.25033 12.2066 8.23547 12.0558 8.26441 11.9103C8.29335 11.7648 8.36478 11.6312 8.46967 11.5263C8.57456 11.4214 8.7082 11.35 8.85368 11.321C8.99917 11.2921 9.14997 11.307 9.28701 11.3637C9.42406 11.4205 9.54119 11.5166 9.6236 11.64C9.70602 11.7633 9.75 11.9083 9.75 12.0566C9.75 12.2555 9.67098 12.4463 9.53033 12.587C9.38968 12.7276 9.19891 12.8066 9 12.8066ZM9.75 9.80664C9.75 10.0056 9.67098 10.1963 9.53033 10.337C9.38968 10.4776 9.19891 10.5566 9 10.5566C8.80109 10.5566 8.61032 10.4776 8.46967 10.337C8.32902 10.1963 8.25 10.0056 8.25 9.80664V6.05664C8.25 5.85773 8.32902 5.66696 8.46967 5.52631C8.61032 5.38566 8.80109 5.30664 9 5.30664C9.19891 5.30664 9.38968 5.38566 9.53033 5.52631C9.67098 5.66696 9.75 5.85773 9.75 6.05664V9.80664Z" fill="#03543F" />
                          </svg>
                        </div>
                      </div>
                      <span className="h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Rounded'] text-[16px] font-normal leading-[24px] text-[#046c4e] relative text-left whitespace-nowrap z-[5]">
                        Your photo is being created! This usually takes 5-10 mins the
                        first time.
                      </span>
                    </div>
                  </div>
                  <Link to="/app/dashboard" className="w-full">
                  <button className='flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap rounded-[24px] border-none relative z-[6] pointer'>
                    <div className='flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] justify-between items-center grow shrink-0 basis-0 flex-nowrap bg-[#10741b] rounded-[999px] relative overflow-hidden z-[7]'>
                      <span className="h-[18px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap z-[8]">
                        Explore our Dashboard
                      </span>
                      <div className='w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[9]'>
                        <div className='w-[5.333px] h-[9.333px]  bg-no-repeat relative z-10  mr-0 mb-0 ml-[5.334px]'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M10.2567 7.11996L6.45604 3.56929C6.18738 3.31863 5.76471 3.33196 5.51404 3.60129C5.26271 3.87063 5.27671 4.29263 5.54538 4.54396L9.30604 8.05663L5.54538 11.5693C5.27671 11.8206 5.26204 12.2426 5.51338 12.512C5.64471 12.6526 5.82204 12.7233 6.00071 12.7233C6.16404 12.7233 6.32738 12.664 6.45604 12.544L10.2567 8.99329C10.5214 8.74529 10.6674 8.41329 10.6674 8.05663C10.6674 7.69996 10.5214 7.36796 10.2567 7.11996Z" fill="white" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                  </Link>
                </div>
              </div>
              ):(
                <>
                {loader=='yes' ? (
                  <button className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer' >
                  <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]'>
                    <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left z-[85]">
                    <Spinner accessibilityLabel="Small spinner example" size="small" />
                    </span>
                  </div>
                </button>
              ): (
                <button onClick={handleSave} className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer' >
                  <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]'>
                    <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left z-[85]">
                      Create
                    </span>
                  </div>
                </button>
                )}
                </>
            )}
            </>
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

export default PhotoStudio;