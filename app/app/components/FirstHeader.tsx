import React, { useState } from "react";
import ProdcutModal from "./ProductModal";
import CustomSlider from "./CustomSilder";



const FirstHeader: React.FC<{
  productTitles: string[];
  sendDataToParent: (data: number) => void;
  sendDataToParentToSearchValues: (data: string) => void;
}> = ({ productTitles, sendDataToParent, sendDataToParentToSearchValues }) => {
  const [inputData, setInputData] = useState<number>(5);
  const [modals, setModals] = useState<boolean>(false);

  console.log(productTitles, "data in first Header");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      setInputData(newValue);
      sendDataToParent(newValue);
    } else {
      setInputData(undefined);
      sendDataToParent(undefined);
    }
  };

  const toggleModal = () => {
    setModals(!modals);
  };

  const receiveDataFromChild = (data: string) => {
    console.log("Data received from child:", data); // Log data received from child
    sendDataToParentToSearchValues(data);
  };

const images: string[] = [
  "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107",
  "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img1.png?v=1713943107",
  "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106",
];
  
  return (
    <>
      {modals && (
        <ProdcutModal
          isOpen={modals}
          toggleModal={toggleModal}
          productTitles={productTitles}
          sendDataToParentToSearchValues={receiveDataFromChild}
        />
      )}
      <div className="flex flex-col justify-center bg-white max-md:px-5">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col max-md:mt-10 max-md:max-w-full">
                <div className="text-4xl font-medium text-neutral-800 max-md:max-w-full">
                  Enable Virtual Try-On
                </div>
                <div className="mt-4 text-base font-medium leading-6 text-zinc-600 max-md:max-w-full">
                  Add the products you want to activate virtual try-on for and
                  enable our widget on your store.
                </div>
                <div className="flex gap-5 justify-between py-2 mt-8 w-full font-medium max-md:flex-wrap max-md:max-w-full">
                  <div className="my-auto text-base leading-6 text-slate-800">
                    Add your products
                  </div>
                  <div
                    className="cursor-pointer flex gap-2 py-2 text-sm text-sky-600 whitespace-nowrap rounded-[999px]"
                    onClick={toggleModal}
                  >
                    <img
                      alt=""
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7cc89af2502dc60b7e5a40ab2e7cfde909366173eb23f85405e997a653a23f4d?"
                      className="shrink-0 self-start w-4 aspect-square"
                    />
                    <div>Add</div>
                  </div>
                </div>
                <div className=' flex w-full h-[50px] pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[12px] items-center flex-nowrap bg-[#fff8f1] rounded-[8px] relative mx-auto my-0'>
                  <div className='flex flex-col gap-[12px] items-start grow shrink-0 basis-0 flex-nowrap relative'>
                    <div className='flex w-full flex-col gap-[6px] items-start shrink-0 flex-nowrap relative z-[1]'>
                      <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[2]'>
                        <div className='w-[18px] h-[18px] shrink-0 relative overflow-hidden z-[3]'>
                          <div className='w-[15px] h-[15px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/exclamation.png?v=1714397050)] bg-[length:100%_100%] bg-no-repeat relative z-[4] mt-[1.5px] mr-0 mb-0 ml-[1.5px]' />
                        </div>
                        <span className="h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#8e4b10] relative text-left whitespace-nowrap z-[5]">
                          To proceed please add products from your store
                        </span>
                        <div className='w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[6]'>
                          {/* <div className='w-[11.687px] h-[11.687px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/exclamation.png?v=1714397050)] bg-[length:100%_100%] bg-no-repeat relative z-[7] mt-[4.167px] mr-0 mb-0 ml-[4.167px]' /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=' flex w-full	 flex-col items-start flex-nowrap rounded-[12px] relative overflow-hidden mx-auto my-0'>
                  <div className='flex items-start self-stretch shrink-0 flex-nowrap relative'>
                    <div className='flex w-[52px] flex-col items-start shrink-0 flex-nowrap relative z-[1]'>
                      <div className='flex w-[52px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[2]'>
                        <div className='flex w-[40px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[3]'>
                          <div className='w-[40px] h-[40px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image_2.png?v=1714052434)] bg-cover bg-no-repeat relative z-[4]' />
                        </div>
                      </div>
                      <div className='flex w-[52px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[5]'>
                        <div className='flex w-[40px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[6]'>
                          <div className='w-[40px] h-[40px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image_1.png?v=1714052433)] bg-cover bg-no-repeat relative z-[7]' />
                        </div>
                      </div>
                      <div className='flex w-[52px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[8]'>
                        <div className='flex w-[40px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[9]'>
                          <div className='w-[40px] h-[40px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image.png?v=1714052433)] bg-cover bg-no-repeat relative z-10' />
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[11]'>
                      <div className='flex pt-[16px] pr-[8px] pb-[16px] pl-[8px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[12]'>
                        <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[13]">
                          Black Top
                        </span>
                        <div className='w-[20px] h-[20px] shrink-0 relative z-[14] cursor-pointer	'>
                          <div className='w-[13px] h-[14.5px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Delete.png?v=1714384615)] bg-cover bg-no-repeat relative z-[15] mt-[2.5px] mr-0 mb-0 ml-[3.5px]' />
                        </div>
                      </div>
                      <div className='flex pt-[16px] pr-[8px] pb-[16px] pl-[8px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[16]'>
                        <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[17]">
                          White Dress
                        </span>
                        <div className='w-[20px] h-[20px] shrink-0 relative z-[18] cursor-pointer	'>
                          <div className='w-[13px] h-[14.5px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Delete.png?v=1714384615)] bg-cover bg-no-repeat relative z-[19] mt-[2.5px] mr-0 mb-0 ml-[3.5px]' />
                        </div>
                      </div>
                      <div className='flex pt-[16px] pr-[8px] pb-[16px] pl-[8px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-20'>
                        <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[21]">
                          Red Top
                        </span>
                        <div className='w-[20px] h-[20px] shrink-0 relative z-[22] cursor-pointer	' >
                          <div className='w-[13px] h-[14.5px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Delete.png?v=1714384615)] bg-cover bg-no-repeat relative z-[23] mt-[2.5px] mr-0 mb-0 ml-[3.5px]' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex pt-[6px] pr-[8px] pb-[6px] pl-[12px] items-center self-stretch shrink-0 flex-nowrap bg-[#f7f7f7] relative z-[24]'>
                    <div className='flex justify-end items-center grow shrink-0 basis-0 flex-nowrap relative z-[25]'>
                      <div className='flex w-[28px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-start shrink-0 flex-nowrap rounded-tl-[8px] rounded-tr-none rounded-br-none rounded-bl-[8px] relative z-[26]'>
                        <div className='w-[20px] h-[20px] shrink-0 relative z-[27] cursor-pointer	'>
                          <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronLeft.png?v=1714384767)] bg-cover bg-no-repeat relative z-[28] mr-0 mb-0 ml-[6.5px]' />
                        </div>
                      </div>
                      <div className='flex w-[28px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-start shrink-0 flex-nowrap rounded-tl-none rounded-tr-[8px] rounded-br-[8px] rounded-bl-none relative z-[29]'>
                        <div className='w-[20px] h-[20px] shrink-0 relative z-30 cursor-pointer	'>
                          <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronRight.png?v=1714384785)] bg-cover bg-no-repeat relative z-[31] mr-0 mb-0 ml-[7.5px]' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-5 justify-between py-4 mt-5 max-md:flex-wrap max-md:max-w-full">
                  <div className="text-base font-medium leading-6 text-slate-800">
                    Enable Virtual Try-On for all of these products
                  </div>
                  <div className="enabled_vartual_try_on flex flex-col justify-center items-start p-1 my-auto rounded-xl">
                      <div className="switch">
                        <input type="checkbox" id="switch" /><label htmlFor="switch">Toggle</label>
                      </div>
                  </div>
                </div>
                <div className="flex gap-1 self-start px-0.5 py-1 mt-5 text-base font-medium">
                  <div className="leading-[150%] text-zinc-600">
                    Default Number of Try-On Experiences Per Product
                  </div>
                  <div className="text-rose-500">*</div>
                </div>
                <div className="justify-center items-start p-3 mt-1 text-base leading-6 whitespace-nowrap bg-white rounded-md border border-gray-100 border-solid text-slate-800 max-md:pr-5 max-md:max-w-full">
                  <input
                    type="number" // Set input type to number
                    className="modal_input"
                    onChange={handleInputChange}
                    placeholder="5"
                    value={inputData?.toString()} // Convert number to string for value
                  />
                </div>
                <div className="self-start mt-2 text-sm tracking-normal leading-4 text-gray-600">
                  You can change this on a per product basis later
                </div>
                <div className="flex flex-col p-4 mt-6 bg-gray-100 rounded-lg max-md:max-w-full">
                  <div className="flex gap-2 text-base leading-6 text-rose-600 max-md:flex-wrap">
                    <img
                      alt=""
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2df00a4d57b971da7afd071a3a5a9d4011244042a240bf6e8f3e18fb860bfa2?"
                      className="shrink-0 my-auto aspect-square w-[18px]"
                    />
                    <div className="flex-1 max-md:max-w-full">
                      Virtual Try-On is not active on your store
                    </div>
                  </div>
                  <div className="flex flex-col justify-center mt-3 text-sm font-medium text-white rounded-3xl border border-sky-600 border-solid max-md:max-w-full">
                    <div className="flex gap-0 justify-between px-3 py-2 border-2 border-solid bg-slate-800 border-slate-800 rounded-[999px] max-md:flex-wrap">
                      <div className="flex-1 max-md:max-w-full">
                        Add our Try-On button to your store
                      </div>
                      <a href="https://admin.shopify.com/store/aditya-ai/themes/163522773269/editor?context=apps"target="_blank">
                      <img
                        alt=""
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/98ba2f0d189170a63991e2def95b3c6f6c743ccb44ec9445b9ef6c4c041b5dbe?"
                        className=" cursor-pointer  shrink-0 self-start w-4 aspect-square"
                      />
                    </a>
                    </div>
                  </div>
                </div>
                <div className=' flex w-full pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[12px] items-center flex-nowrap bg-[#fde8eb] rounded-[8px] relative mx-auto my-0'>
                  <div className='flex flex-col gap-[12px] items-start grow shrink-0 basis-0 flex-nowrap relative'>
                    <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                      <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[2]'>
                        <div className='w-[18px] h-[18px] shrink-0 relative overflow-hidden z-[3]'>
                          <div className='w-[15px] h-[15px] bg-[url(../assets/images/4a57b82a-fdd6-4b80-a9d6-20cb10dc0751.png)] bg-[length:100%_100%] bg-no-repeat relative z-[4] mt-[1.5px] mr-0 mb-0 ml-[1.5px]' />
                        </div>
                        <span className="h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Rounded'] text-[16px] font-normal leading-[24px] text-[#c81e1e] relative text-left whitespace-nowrap z-[5]">
                          Uh-Oh! something’s wrong. Virtual Try-On is not active on your
                          store
                        </span>
                      </div>
                    </div>
                    <div className='flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap rounded-[24px] border-solid border border-[#047ac6] relative z-[6]'>
                      <div className='flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] justify-between items-center grow shrink-0 basis-0 flex-nowrap bg-[#e71837] rounded-[999px] border-solid border-2 border-[#2e343e] relative overflow-hidden z-[7]'>
                        <span className="h-[18px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap z-[8]">
                          Try again
                        </span>
                        <div className='w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[9]'>
                          <div className='w-[16px] h-[16px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/angle-right.png?v=1714396334)] bg-[length:100%_100%] bg-no-repeat relative z-10 cursor-pointer	 mr-0 mb-0 ml-[5.333px]' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=' flex w-full pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[12px] items-center flex-nowrap bg-[#e8f6e9] rounded-[8px] relative mx-auto my-0'>
                  <div className='flex flex-col gap-[12px] items-start grow shrink-0 basis-0 flex-nowrap relative'>
                    <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                      <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[2]'>
                        <div className='w-[18px] h-[18px] shrink-0 relative overflow-hidden z-[3]'>
                          <div className='w-[18px] h-[18px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/exclamation_1.png?v=1714399636)] bg-[length:100%_100%] bg-no-repeat relative z-[4] mt-[1.5px] mr-0 mb-0 ml-[1.5px]' />
                        </div>
                        <span className="h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Rounded'] text-[16px] font-normal leading-[24px] text-[#046c4e] relative text-left whitespace-nowrap z-[5]">
                          Virtual Try-On is active on your store
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between self-start mt-5 text-base font-medium leading-6">
                  <div className="cursor-pointer flex gap-2 justify-center px-5 py-2.5 text-white whitespace-nowrap bg-sky-600 rounded-[999px]">
                    <div>Continue</div>
                    <img
                      alt=""
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a067b12d00bde436bacd3fa9d23c21d9897d579f03dd72b488684836b3eada9?"
                      className="shrink-0 my-auto aspect-[0.56] w-[5px]"
                    />
                  </div>
                  <div className="my-auto text-zinc-600">
                    I’ll do this later
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <CustomSlider images={images} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstHeader;
