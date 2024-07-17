import { hasUncaughtExceptionCaptureCallback } from 'process';
import React from 'react';
import { Link } from "@remix-run/react";

const DashboardBlock: React.FC<{ session: any, name: string, description: string, buttonName: string, buttonLink: string, addProduct: string, toggleModal: any }> = ({ session, name, description, buttonName, buttonLink, addProduct, toggleModal }) => {
  return (
    <div className='flex w-full pt-[30px] pr-0 pb-[20px] pl-0 flex-col gap-[24px] items-center shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d8dbdf] relative z-[1]'>
      <div className='flex flex-col gap-[-12px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[22]'>
        <div className='flex pt-0 pr-[20px] pb-0 pl-[20px] flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[1]'>
          {name != 'Virtual Try-on' ? (
            <div className='flex w-[283px] h-full gap-[6.224px] items-center shrink-0 flex-nowrap relative z-[24] m-auto	'>
              <div className='flex w-[282.867px] flex-col gap-[5.533px] justify-center items-start shrink-0 flex-nowrap relative z-[25]'>
                <div className='flex gap-[5.533px] items-center self-stretch shrink-0 flex-nowrap relative z-[26]'>
                  <div className='flex w-[90.6px] flex-col gap-[2.766px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[27]'>
                    <div className='h-[98.208px] self-stretch shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/studio1.png?v=1714732342)] bg-cover bg-no-repeat rounded-[5.533px] relative z-[28]' />
                    <span className="flex w-[54px] h-[13px] justify-center items-center shrink-0 basis-auto font-['Montserrat'] text-[12px] font-normal leading-[12.449px] text-[#4f4f4f] relative text-center whitespace-nowrap z-[29]">
                      Straights
                    </span>
                  </div>
                  <div className='flex w-[90.6px] flex-col gap-[2.766px] items-center self-stretch shrink-0 flex-nowrap relative z-30'>
                    <div className='h-[136px] self-stretch shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/studio2.png?v=1714732341)] bg-cover bg-no-repeat rounded-[5.533px] relative z-[31]' />
                    <span className="flex w-[31px] h-[13px] justify-center items-center shrink-0 basis-auto font-['Montserrat'] text-[12px] font-normal leading-[12.449px] text-[#4f4f4f] relative text-center whitespace-nowrap z-[32]">
                      Curls
                    </span>
                  </div>
                  <div className='flex w-[90.6px] flex-col gap-[2.766px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[33]'>
                    <div className='h-[98.208px] self-stretch shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/studio3.png?v=1714732342)] bg-cover bg-no-repeat rounded-[5.533px] relative z-[34]' />
                    <span className="flex w-[33px] h-[13px] justify-center items-center shrink-0 basis-auto font-['Montserrat'] text-[12px] font-normal leading-[12.449px] text-[#4f4f4f] relative text-center whitespace-nowrap z-[35]">
                      Short
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='virtual_tryon_with_studio_content' >
              <img height="100%" width="100%" className="virtual_tryon_with_studio_img1" src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106" alt="Image 1" />
              <img height="100%" width="100%" className="virtual_tryon_with_studio_img2" src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107" alt="Image 1" />
              <img height="100%" width="100%" className="virtual_tryon_with_studio_img3" src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img1.png?v=1713943107" alt="Image 1" />
            </div>
          )}
          <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[36]'>
            <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[37]'>
              <span className="h-[30px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-semibold leading-[30px] text-[#323338] relative text-left whitespace-nowrap z-[38]">
                {name}
              </span>
            </div>
            <button className='w-[94px] h-[24px] shrink-0 border-none relative z-[39] pointer'>
              <div className='w-[94px] h-[24px] absolute top-0 left-0 z-40'>
                <div className='w-full h-full text-[0px] absolute top-0 left-0 overflow-hidden z-[41]'>

                  {name == 'Virtual Try-on' || session.authWithShop?.store?.onboarding_status == 'completed' ? (
                    <>
                      <span className="flex w-[90.385px] h-[16px] justify-center items-start font-['SF_Pro_Text'] text-[12px] font-normal leading-[16px] text-[#0e6518] relative text-center whitespace-nowrap z-[43] mt-[5px] mr-0 mb-0 ml-0">
                        Online
                      </span>
                      <div className='w-full h-full bg-[#e8f6e9] rounded-[6px] absolute top-0 left-0 z-[42]' />
                    </>
                  ) : (
                    <>
                      <span className="flex w-[90.385px] h-[16px] justify-center items-start font-['SF_Pro_Text'] text-[12px] font-normal leading-[16px] text-[#0e6518] relative text-center whitespace-nowrap z-[43] mt-[5px] mr-0 mb-0 ml-0">
                        Online
                      </span>
                      <div className='w-full h-full bg-[#e8f6e9] rounded-[6px] absolute top-0 left-0 z-[42]' />
                    </>
                  )}

                </div>
              </div>
            </button>
          </div>
          <div className='flex gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[44]'>
            <span className="flex w-[335px] h-[36px] justify-start items-start grow shrink-0 basis-0 font-['SF_Pro_Text'] text-[13px] font-normal leading-[18px] text-[#323338] tracking-[-0.08px] relative text-left z-[45]">
              {description}
            </span>
          </div>
        </div>
      </div>
      <div className='flex pt-0 pr-[20px] pb-0 pl-[20px] gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[46]'>
        {/* <Link to={buttonLink} className='flex w-[147px] h-[40px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[28px] border-solid border border-[#2d9cdb] relative overflow-hidden shadow-[0_2px_5px_0_rgba(60,66,87,0.08)] z-[47] pointer'>

          <span className="flex w-full h-[20px] justify-center items-center shrink-0 basis-auto font-['SF_Pro_Text'] text-[15px] font-semibold leading-[20px] text-[#fff] tracking-[-0.5px] relative text-center whitespace-nowrap z-[48]">
            {buttonName}
          </span>c
          <div className='w-[16px] h-[16px] shrink-0 relative z-[49]'>
            <div className='w-[8.301px] h-[14.6px]  bg-no-repeat relative z-50 mt-[0.7px] mr-0 mb-0 ml-[5px]'>
              <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.293164 2.40888C-0.0977214 2.018 -0.0977214 1.38425 0.293164 0.99336C0.68405 0.602474 1.3178 0.602474 1.70869 0.99336L8.00842 7.29309C8.39894 7.68361 8.39894 8.31678 8.00842 8.7073L1.70869 15.007C1.3178 15.3979 0.68405 15.3979 0.293164 15.007C-0.0977214 14.6161 -0.0977214 13.9824 0.293164 13.5915L5.88448 8.0002L0.293164 2.40888Z" fill="white" />
              </svg>
            </div>
          </div>

        </Link> */}

        {addProduct == "yes" && (
          <div onClick={toggleModal} style={{ cursor: "pointer" }} className='flex w-[147px] h-[40px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[28px] border-solid border border-[#2d9cdb] relative overflow-hidden shadow-[0_2px_5px_0_rgba(60,66,87,0.08)] z-[47] pointer'>
            <span className="h-[20px] shrink-0 basis-auto font-['SF_Pro_Text'] text-[15px] font-normal leading-[20px] text-white tracking-[-0.24px] relative text-left whitespace-nowrap z-20 flex justify-center gap-5">
              <p>
                Add Products
              </p>
              <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.293164 2.40888C-0.0977214 2.018 -0.0977214 1.38425 0.293164 0.99336C0.68405 0.602474 1.3178 0.602474 1.70869 0.99336L8.00842 7.29309C8.39894 7.68361 8.39894 8.31678 8.00842 8.7073L1.70869 15.007C1.3178 15.3979 0.68405 15.3979 0.293164 15.007C-0.0977214 14.6161 -0.0977214 13.9824 0.293164 13.5915L5.88448 8.0002L0.293164 2.40888Z" fill="white" />
              </svg>

            </span>
          </div>
        )}
        {addProduct == "no" && (

          <Link to={buttonLink} className='flex w-[147px] h-[40px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[28px] border-solid border border-[#2d9cdb] relative overflow-hidden shadow-[0_2px_5px_0_rgba(60,66,87,0.08)] z-[47] pointer'>

            <span className="flex w-full h-[20px] justify-center items-center shrink-0 basis-auto font-['SF_Pro_Text'] text-[15px] font-semibold leading-[20px] text-[#fff] tracking-[-0.5px] relative text-center whitespace-nowrap z-[48]">
              {buttonName}
            </span>
            <div className='w-[16px] h-[16px] shrink-0 relative z-[49]'>
              <div className='w-[8.301px] h-[14.6px]  bg-no-repeat relative z-50 mt-[0.7px] mr-0 mb-0 ml-[5px]'>
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.293164 2.40888C-0.0977214 2.018 -0.0977214 1.38425 0.293164 0.99336C0.68405 0.602474 1.3178 0.602474 1.70869 0.99336L8.00842 7.29309C8.39894 7.68361 8.39894 8.31678 8.00842 8.7073L1.70869 15.007C1.3178 15.3979 0.68405 15.3979 0.293164 15.007C-0.0977214 14.6161 -0.0977214 13.9824 0.293164 13.5915L5.88448 8.0002L0.293164 2.40888Z" fill="white" />
                </svg>
              </div>
            </div>

          </Link>
        )}
      </div>
    </div>
  )
}
export default DashboardBlock;