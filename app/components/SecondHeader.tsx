import React, { useState, useEffect } from "react";
import CustomSlider from "./CustomSilder";
import axios from "axios";
import { apiURL } from "../services/Services";
import SelectOnboarding from "./SelectOnboarding";
import SelectedOnbording from "./SelectedOnbording";
import FadedOnboarding from "./FadedOnboarding";

const SecondHeader: React.FC<{ sessionData: any, onActivate: any }> = ({ sessionData, onActivate }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [dataLimit, setDataLimit] = useState({ start: 0, end: 3 });
  const [checkedProduct, setCheckedProduct] = useState<string>();
  const [model, setModel] = useState<number>();
  const [background, setBackground] = useState<number>();
  const [pose, setPose] = useState<number>();
  const [tmpCheckedProduct, setTmpCheckedProduct] = useState<string>();
  const [tmpModel, setTmpModel] = useState<number>();
  const [tmpBackground, setTmpBackground] = useState<number>();
  const [tmpPose, setTmpPose] = useState<number>();
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

  const models: any = [
    { id: 1, name: "Model 1", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" },
    { id: 2, name: "Model 2", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" },
    { id: 3, name: "Model 3", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" }
  ];

  const backgrounds: any = [
    { id: 1, name: "Background 1", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" },
    { id: 2, name: "Background 2", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" },
    { id: 3, name: "Background 3", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" }
  ];

  const poses: any = [
    { id: 1, name: "Pose 1", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" },
    { id: 2, name: "Pose 2", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" },
    { id: 3, name: "Pose 3", image: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099", size: "Small size" }
  ];

  const fetchProducts = async () => {
    try {
      // Prepare the data to send
      const data = JSON.stringify({
        queryfor: "getSelectedProductsData",
        shop: sessionData.auth_session.shop,
      });

      // Define the request configuration
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiURL}api/saveDataInDb`, // Use the apiURL constant
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      // Send the request
      const response = await axios.request(config);
      console.log(response);
      setProducts(response.data);
    } catch (error) { console.log(error) }
  };
  useEffect(() => {
    // Call the fetchProducts function when the component mounts
    fetchProducts();
  }, []); // Empty dependency array ensures it only runs once on mount
  console.log(products, "Second Header products");

  const handleCheckboxChange = (productId: string) => {
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
  const handleSelection = (id: number,type:string) => {
    console.log("handleSelection ::",id,type);
    switch(type){
      case 'model':
        setModel(id);
        break;
      case 'background':
        setBackground(id);
        break;
      case 'pose':
        setPose(id);
        break;
    }
    
    console.log("model id: " + id)
  };

  const handleEdit = (step:string)=>{
    switch(step) {
      case '01':
        console.log("we are in first step",checkedProduct);
        setTmpCheckedProduct(checkedProduct);
        setCheckedProduct(undefined);
        // setTmpModel(model);
        // setModel(undefined);
        // setTmpBackground(background);
        // setBackground(undefined);
        // setTmpPose(pose);
        // setPose(undefined);
      break;
      case '02':
        console.log("we are in second step",model);
        setTmpModel(model);
        setModel(undefined);
        // setTmpBackground(background);
        // setBackground(undefined);
        // setTmpPose(pose);
        // setPose(undefined);
      break;
      case '03':
        console.log("we are in third step",background);
        setTmpBackground(background);
        setBackground(undefined);
        // setTmpPose(pose);
        // setPose(undefined);
      break;
      case '04':
        console.log("we are in forth step",pose);
        setTmpPose(pose);
        setPose(undefined);
      break;
    }
  };
  return (
    <div className="self-stretch second_header">
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
                <div className='after_border flex w-[530px]  flex-col items-start shrink-0 flex-nowrap rounded-[12px]  top-[56px] left-[48px]  z-[14]'>
                  <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[15]'>
                    <div className='flex w-full flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[44]'>
                      <div className='flex w-[188px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[8]'>
                        <button className='flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#000] relative overflow-hidden z-[9] pointer'>
                          <span className="flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#141718] relative text-center whitespace-nowrap z-10">
                            01
                          </span>
                        </button>
                        <span className="h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0,0.2)] relative text-left whitespace-nowrap z-[11]">
                          Select 1 Product
                        </span>
                      </div>
                      <div style={{ position: "relative", left: "50px", top: "22px", width: "100%" }}>

                        {products.slice(dataLimit.start, dataLimit.end).map((product, index) => (
                          <>
                            <div className='flex pt-[16px] gap-3 pr-[8px] pb-[16px] pl-[0px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[45]'>
                              <div className='flex w-[29px] pt-[18px]  pb-[18px] pl-[12px] items-center shrink-0 flex-nowrap bg-[#fff] opacity-40  relative  z-[29]'>
                                <div className='flex w-[16px] flex-col justify-center items-start shrink-0 flex-nowrap relative z-30'>
                                  <div className='flex w-[16px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[31]'>
                                    <div className='flex w-[16px] gap-[8px] items-start shrink-0 flex-nowrap rounded-[4px] relative z-[32]'>
                                      <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                                        <input id={product.productId} name={product.productId}
                                          checked={tmpCheckedProduct==product.productId?true:false}
                                          onChange={() => handleCheckboxChange(product.productId)}
                                          type="checkbox" />
                                        <label htmlFor="checkbox"></label>

                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className='w-[40px] h-[40px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image.png?v=1714052433)] bg-cover bg-no-repeat relative z-[43]' >
                                <img
                                  src={product.productImage + "&height=40"}
                                />
                              </div>


                              <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[46]">
                                {product.productName}
                              </span>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className='flex pt-[6px] pr-[8px] pb-[6px] pl-[12px] items-center self-stretch shrink-0 flex-nowrap bg-[#f7f7f7] relative z-[51]' style={{ top: "20px", left: "50px" }}>
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
                  <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[17.5px] text-[#475466] relative text-left whitespace-nowrap z-[69]">
                    All the photos in a creation request will have very minor
                    changes between them
                  </span>
                </div>
              </div>
              <FadedOnboarding step={stepModel} sectionText={textModel} />
              <FadedOnboarding step={stepBackground} sectionText={textBackground} />
              <FadedOnboarding step={stepPose} sectionText={textPose} />
              </>
            ) : (
              <>
                {products.filter((product: any) => checkedProduct.includes(product.id)).map((product, index) => (

                    <SelectedOnbording step="01" data={product.productName} image={product.productImage} handleEdit={handleEdit} />
                ))}
                {!model && (
                  <>
                  <SelectOnboarding step={stepModel} selectLoop={models} handleSelection={handleSelection} type='model'/>
                  <FadedOnboarding step={stepBackground} sectionText={textBackground} />
                  <FadedOnboarding step={stepPose} sectionText={textPose} />
                  </>
                )}
                {model && !background ? (
              <>
              {models.filter((m:any)=>model==m.id).map((m:any)=>( 
              <SelectedOnbording step={stepModel} data={m.name}  image={m.image} handleEdit={handleEdit} />
            ))}
              <SelectOnboarding step={stepBackground} selectLoop={backgrounds} handleSelection={handleSelection} type='background'/>
              <FadedOnboarding step={stepPose} sectionText={textPose} />
              </>
            ):(
              <>
              {model && background && !pose && (
                <>
              {models.filter((m:any)=>model==m.id).map((m:any)=>( 
              <SelectedOnbording step={stepModel} data={m.name}  image={m.image} handleEdit={handleEdit} />
            ))}
             {backgrounds.filter((b:any)=>background==b.id).map((b:any)=>( 
              <SelectedOnbording step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
            ))}
              <SelectOnboarding step={stepPose} selectLoop={poses} handleSelection={handleSelection} type='pose'/>
              </>
              )}
              </>
            )}
            {model && background && pose && (
                <>
                {models.filter((m:any)=>model==m.id).map((m:any)=>( 
              <SelectedOnbording step={stepModel} data={m.name}  image={m.image} handleEdit={handleEdit} />
            ))}
            {backgrounds.filter((b:any)=>background==b.id).map((b:any)=>( 
              <SelectedOnbording step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
            ))}
             {poses.filter((p:any)=>pose==p.id).map((p:any)=>( 
              <SelectedOnbording step={stepPose} data={p.name} image={p.image} handleEdit={handleEdit} />
            ))}
              </>
              )}
              </>
            )}
           
             
                
             
           
            
           
           
          
            <div className='flex w-[236px] h-[44px] gap-[20px] items-start shrink-0 flex-nowrap  top-[535px] left-0 z-[82]'>
              <button className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer'>
                <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]'>
                  <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[85]">
                    Next
                  </span>
                  <div className='w-[5px] h-[9px] shrink-0 relative z-[86]'>
                    <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/91099684-9e2c-41ac-8500-9a0d3c52b427.png)] bg-[length:100%_100%] bg-no-repeat relative z-[87] mt-[0.5px] mr-0 mb-0 ml-0' />
                  </div>
                </div>
              </button>
              <div className='flex w-[134px] justify-center items-end shrink-0 flex-nowrap relative z-[88]'>
                <div className='flex w-[134px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap rounded-[999px] relative overflow-hidden z-[89]'>
                  <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#4b5059] relative text-left whitespace-nowrap z-[90]">
                    I’ll do this later
                  </span>
                </div>
              </div>
            </div>
          </div>
          
        

        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <CustomSlider images={images} />
        </div>
      </div>
    </div >

  );
};

export default SecondHeader;
