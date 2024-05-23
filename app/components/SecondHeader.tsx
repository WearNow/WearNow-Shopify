import React, { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import CustomSlider from "./CustomSilder";
import axios from "axios";
import { apiURL } from "../services/Services";
import SelectOnboarding from "./SelectOnboarding";
import SelectedOnbording from "./SelectedOnbording";
import FadedOnboarding from "./FadedOnboarding";
import client from "../services/ApolloClient";
import gql from "graphql-tag";
import {Checkbox} from '@shopify/polaris';

const SecondHeader: React.FC<{ sessionData: any, onActivate: any }> = ({ sessionData, onActivate }) => {
  
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
  const [currentStep, setCurrentStep] = useState(1);
  const stepModel = "02";
  const textModel = "Select a Model";
  const stepBackground = "03";
  const textBackground = "Select a Background";
  const stepPose = "04";
  const textPose = "Select a Pose";
  const images: string[] = [
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img1.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106",
  ];

  useEffect(() => {
    console.log("dataLimit.start ::", dataLimit.start);
    console.log("dataLimit.start ::", dataLimit.end);
  }, [dataLimit.start, dataLimit.end])

  // const models: any = [
  //   { id: 1, name: "Model 1", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" },
  //   { id: 2, name: "Model 2", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" },
  //   { id: 3, name: "Model 3", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" }
  // ];

  // const backgrounds: any = [
  //   { id: 1, name: "Background 1", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" },
  //   { id: 2, name: "Background 2", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" },
  //   { id: 3, name: "Background 3", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" }
  // ];

  // const poses: any = [
  //   { id: 1, name: "Pose 1", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" },
  //   { id: 2, name: "Pose 2", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" },
  //   { id: 3, name: "Pose 3", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" }
  // ];
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
  `,
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
  const handlePrev = () => {
    if (dataLimit.start > 0) {
      setDataLimit(prevLimit => ({
        start: prevLimit.start - 3,
        end: prevLimit.end - 3
      }));
    }
  };

  const handleNext = () => {
    if (dataLimit.end < products.length) {
      setDataLimit(prevLimit => ({
        start: prevLimit.start + 3,
        end: prevLimit.end + 3
      }));
    }
  };
  const handleSelection = (id: string,type:string) => {
    console.log("handleSelection ::",id,type);
    switch(type){
      case 'model':
        setModel(id);
        setCurrentStep(2);
        break;
      case 'background':
        setBackground(id);
        setCurrentStep(3);
        break;
      case 'pose': 
        setCurrentStep(4);
        setPose(id);
        setStylehide({opacity:1,pointerEvents:"unset"});
        break;
    }
    
    console.log("model id: " + id)
  };
  const handleButtonNext = async () => {
    if(checkedProduct && currentStep==1){   
        if(currentStep<4){
        setCurrentStep(currentStep+1)
        }
    }
    if(model && currentStep==2){
        if(currentStep<4){
        setCurrentStep(currentStep+1)
        }
    }
    if(background && currentStep==3){
        if(currentStep<4){
        setCurrentStep(currentStep+1)
        }
    }
  }

  const handleEdit = (step:string)=>{
    switch(step) {
      case '01':
        setCurrentStep(1);
        if(tmpModel){ setModel(tmpModel); }
        if(tmpPose){ setPose(tmpPose); }
        if(tmpBackground){ setBackground(tmpBackground); }
      break;
      case '02':
        console.log("we are in second step",model);
        setTmpModel(model);
        setModel(undefined);
        if(tmpPose){ setPose(tmpPose); }
        if(tmpBackground){ setBackground(tmpBackground); }
        setCurrentStep(2);
      break;
      case '03':
        console.log("we are in third step",background);
        setTmpBackground(background);
        setBackground(undefined);
        if(tmpModel){ setModel(tmpModel); }
        if(tmpPose){ setPose(tmpPose); }
        setCurrentStep(3);
      break;
      case '04':
        console.log("we are in forth step",pose);
        setTmpPose(pose);
        setPose(undefined);
        if(tmpModel){ setModel(tmpModel); }
        if(tmpBackground){ setBackground(tmpBackground); }
        setCurrentStep(4);
      break;
    }
  };
  const handleSave = async()=>{
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
  console.log(currentStep);
  return (
    <div className="self-stretch second_header">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className='flex flex-col w-6/12 max-md:ml-0 max-md:w-full'>
          <div className='flex w-full flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[1]'>
            <span className="virtual_try_on_title h-[45px]  font-['SF_Pro_Display'] text-[36px] font-medium leading-[45px] text-[#1d2127] relative text-left  z-[2]">
              Create Your First Product Photo
            </span>
            <span className="flex w-full h-full justify-start items-start font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#52575d] relative text-left z-[3]">
              Take your product photos to the next level in just 4 easy steps!
            </span>
          </div>


          <div className='flex  flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
            {currentStep==1 && (
              <>
              <div className='flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[5]'>
                <div className='after_border flex w-full  flex-col items-start shrink-0 flex-nowrap rounded-[12px]  top-[56px] left-[48px]  z-[14]'>
                  <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[15]'>
                    <div className='flex w-full flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[44]'>
                      <div className='flex w-[188px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[8]'>
                        <button className='flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#000] relative overflow-hidden z-[9] pointer'>
                          <span className="flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#141718] relative text-center whitespace-nowrap z-10">
                            01
                          </span>
                        </button>
                        <span className="h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left whitespace-nowrap z-[11]">
                          Select 1 Product
                        </span>
                      </div>
                      <div style={{ position: "relative", left: "50px", top: "22px", width: "calc(100% - 50px)" }} className="border_onboarding">

                        {products.slice(dataLimit.start, dataLimit.end).map((product, index) => (
                          <>
                            <div key={product.uuid} className='flex gap-3 pr-[8px]  pl-[0px] items-center self-stretch shrink-0  flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[45]'>
                              <div className='flex w-[29px] pt-[18px]  pb-[18px] pl-[12px] items-center shrink-0 flex-nowrap bg-[#fff]   relative  z-[29]'>
                                <div className='flex w-[16px] flex-col justify-center items-start shrink-0 flex-nowrap relative z-30'>
                                  <div className='flex w-[16px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[31]'>
                                    <div className='flex w-[16px] gap-[8px] items-start shrink-0 flex-nowrap rounded-[4px] relative z-[32]'>
                                     
                                        <Checkbox
                                            label=""
                                            checked={checkedProduct==product.uuid?true:false} // Check if the product is checked
                                          onChange={() => handleCheckboxChange(product.uuid)} // Handle checkbox change
                                          />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className='w-[40px] h-[40px] shrink-0  bg-cover bg-no-repeat relative z-[43]' >
                                <img
                                  src={product.image!=undefined?product.image + "&height=40":''}
                                />
                              </div>


                              <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[46]">
                                {product.title}
                              </span>
                            </div>
                          </>
                        ))}
                        <div className='flex pt-[6px] pr-[8px] pb-[6px] pl-[12px] items-center self-stretch shrink-0 flex-nowrap bg-[#f7f7f7] relative z-[51]'>
                    <div className='flex justify-end items-center grow shrink-0 basis-0 flex-nowrap relative z-[52]'>
                      <div className='flex w-[28px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-start shrink-0 flex-nowrap rounded-tl-[8px] rounded-tr-none rounded-br-none rounded-bl-[8px] relative z-[53]'>
                        <div className='w-[20px] h-[20px] shrink-0 relative z-[54]'>
                          <div onClick={() => handlePrev()} className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronLeft.png?v=1714384767)] bg-cover bg-no-repeat relative z-[55]  mr-0 mb-0 ml-[6.5px]' />
                        </div>
                      </div>
                      <div className='flex w-[28px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-start shrink-0 flex-nowrap rounded-tl-none rounded-tr-[8px] rounded-br-[8px] rounded-bl-none relative z-[56]'>
                        <div className='w-[20px] h-[20px] shrink-0 relative z-[57]'>
                          <div onClick={() => handleNext()} className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronRight.png?v=1714384785)] bg-cover bg-no-repeat relative z-[58]  mr-0 mb-0 ml-[7.5px]' />
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
                      </div>

                </div>
                <div className='flex w-full h-full flex-col gap-[6px] items-start ' style={{ marginLeft: "50px", marginTop: "20px",width: "calc(100% - 50px)" }}>
                  <div className='flex flex-col gap-[6px] items-start self-stretch  relative z-[60]'>
                    <span className="h-full  font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#344053] relative text-left z-[61]">
                      Please select the number of photos you would like to create
                    </span>
                    <div className='flex items-start self-stretch bg-[#fff] rounded-[8px] border-solid border border-[#cfd4dc] relative shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] z-[62]'>
                      <div className='flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[63]'>
                        <div className='flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[64]'>
                          <select className="cstm_select h-[24px]  w-full font-['Inter'] text-[16px] font-normal leading-[24px] text-[#667084] relative text-left  z-[65]">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="h-[18px] self-stretch font-['SF_Pro_Display'] text-[14px] font-normal leading-[17.5px] text-[#475466] relative text-left  z-[69]">
                    All the photos in a creation request will have very minor
                    changes between them
                  </span>
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
            )} 
            {currentStep==2 && (
              <>
                {products.filter((product: any) => checkedProduct?.includes(product.uuid)).map((product, index) => (

                    <SelectedOnbording step="01"  value={checkedProduct} data={product.title} image={product.image} handleEdit={handleEdit} />
                ))}
                
                 
                  {!model ?
                     <SelectOnboarding step={stepModel} value={tmpModel} selectLoop={models} handleSelection={handleSelection} type='model'/>
                    :
                    <>
                    {models.filter((m:any)=>model==m.uuid).map((m:any)=>( 
                    <SelectedOnbording step={stepModel} data={m.name} image={m.cover_image} handleEdit={handleEdit} />
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
            )}
           {currentStep==3 && (
              <>
                {products.filter((product: any) => checkedProduct?.includes(product.uuid)).map((product, index) => (

                    <SelectedOnbording step="01"  value={checkedProduct} data={product.title} image={product.image} handleEdit={handleEdit} />
                ))}
               
       
             
              {models.filter((m:any)=>model==m.uuid).map((m:any)=>( 
              <SelectedOnbording step={stepModel} data={m.name}  image={m.cover_image} handleEdit={handleEdit} />
            ))}
                  {!background ?
                   <SelectOnboarding step={stepBackground} value={tmpBackground} selectLoop={backgrounds} handleSelection={handleSelection} type='background'/>
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
            {currentStep==4 && (
              <>
                {products.filter((product: any) => checkedProduct?.includes(product.uuid)).map((product, index) => (

                    <SelectedOnbording step="01"  value={checkedProduct} data={product.title} image={product.image} handleEdit={handleEdit} />
                ))}

              {model && background && !pose && (
                <>
              {models.filter((m:any)=>model==m.uuid).map((m:any)=>( 
              <SelectedOnbording step={stepModel} data={m.name}  image={m.cover_image} handleEdit={handleEdit} />
            ))}
             {backgrounds.filter((b:any)=>background==b.uuid).map((b:any)=>( 
              <SelectedOnbording step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
            ))}
              <SelectOnboarding step={stepPose} value={tmpPose} selectLoop={poses} handleSelection={handleSelection} type='pose'/>
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
               <button onClick={handleButtonNext} className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer'>
                <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]'>
                  <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[85]">
                    Next
                  </span>
                  <div className='w-[5px] h-[9px] shrink-0 relative z-[86]'>
                    <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/91099684-9e2c-41ac-8500-9a0d3c52b427.png)] bg-[length:100%_100%] bg-no-repeat relative z-[87] mt-[0.5px] mr-0 mb-0 ml-0' />
                  </div>
                </div>
              </button> 
              <button onClick={handleSave} className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer' style={{opacity:stylehide.opacity,pointerEvents:stylehide.pointerEvents}}>
                <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]'>
                  <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[85]">
                    Save
                  </span>
                </div>
              </button>
              <Link to="/app/dashboard" className="flex justify-center items-end">
              <div className='flex w-[134px] justify-center items-end shrink-0 flex-nowrap relative z-[88]'>
                <div className='flex w-[134px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap rounded-[999px] relative overflow-hidden z-[89]'>
                  <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#4b5059] relative text-left whitespace-nowrap z-[90]">
                    I’ll do this later
                  </span>
                </div>
              </div>
              </Link>
            </div>
          </div>
          
        

        </div>
        <div className="custom_slider_content flex flex-col  w-6/12 max-md:ml-0 max-md:w-full">
          <CustomSlider images={images} />
        </div>	
      </div>
    </div >

  );
};

export default SecondHeader;
