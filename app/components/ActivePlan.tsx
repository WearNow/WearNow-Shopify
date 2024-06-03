import React, { useState,useEffect} from 'react';
const ActivePlan: React.FC<{ item: any }> = ({ item }) => {
return (<div className='flex biling_item pt-[35px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#023353] relative shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] z-[52]'>
              <div className='flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[53]'>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[54]'>
                  <div className='flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[55]'>
                    <span className="h-[30px] flex justify-between self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#b1d6ed] relative text-left whitespace-nowrap z-[56]">
                      {item.name}
                      {item.description && item.description!='.' && (
                      <button className='flex w-[102px] h-[25px] pt-[2px] pr-[12px] pb-[2px] pl-[12px] justify-center items-center shrink-0 flex-nowrap bg-[#e1effe] rounded-[6px] border-none  top-[36px] left-[694.5px] z-[136] pointer'>
                      <span className="flex w-[78px] h-[21px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[21px] text-[#1e429f] relative text-center whitespace-nowrap z-[137]">
                      {item.description}
                      </span>
                      
                      </button>
                      )}
                    </span>
                  </div>
                  <div className='flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative z-[57]'>
                  {item.strike_amount && (
                      <span className="h-[48px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#f6f6f7] relative text-left whitespace-nowrap z-[58] line-through	">
                        ${item.strike_amount}
                      </span>
                    )}
                    <span className="h-[48px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#f6f6f7] relative text-left whitespace-nowrap z-[58]">
                      ${item.price}
                    </span>
                    <span className="flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#fff] relative text-center z-[59]">
                      /month
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[60]'>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[61]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[62]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[63]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[64]">
                    {item.number_of_products?item.number_of_products:'Unlimited'} Products
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative' style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[66]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[67] mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[68]">
                    {item.vto_limit?item.vto_limit:"Unlimited"} Try-On Experiences
                    </span>
                    <div className='show_on_hover '>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>A Try-On Experience is defined as every time a shopper initiates a request for and receives a picture to try-on a particular piece of apparel. A shopper may therefore use several try-on experiences in a single session.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[69]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[70]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[71] mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[72]">
                    {item.product_photo_limit?item.product_photo_limit:"Unlimited"} Product Photos
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative ' style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative '>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[75] mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[76]">
                      Access to {item.pro_models} Pro Models
                    </span>
                    <div className='show_on_hover '>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>Pro Models are AI fashion models that have been specially crafted by WearNow to achieve the highest range of versatility when it comes to product photos. They can work effectively with any outfit, pose, and background.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative '>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[78]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap ">
                      {item.support_text}
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative ' style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative '>
                    {item.customized_models ? (
                          <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative mr-0 mb-0 ml-[2.5px]' />

                      ):(
                        <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative mr-0 mb-0 ml-[2.5px]' />
                    )} 
                      
                    </div>
                    {item.customized_models ? (
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap">
                      Upload Your Own Model
                    </span>
                     ):(
                      <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap line-through">
                      Upload Your Own Model
                    </span>
                    )} 
                    {item.customized_models && (
                    <div className='show_on_hover '>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>Upload Your Own Model
                        If you have an agreement and the rights to create images using the likeness of a particular person you may use them in your product photos by creating a custom model. You will need to upload a few images of them along with some body preferences.</p>
                    </div>
                    )}
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative '>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[86]'>
                    {item.hd_photos ? (
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[87] mr-0 mb-0 ml-[2.5px]' />
                    ):(
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[87] mr-0 mb-0 ml-[2.5px]' />
                    )}
                    </div>
                    {item.hd_photos ? (
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap ">
                      HD Photos
                    </span>
                    ):(
                      <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap line-through">
                      HD Photos
                    </span>
                    )}
                  </div>
                </div>
                <button className='flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative  pointer'>
                  <div className='flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#6bb36b] rounded-[999px] relative ' style={{pointerEvents: "unset",opacity: "0.8"}}>
                    <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap " >
                      Active Plan
                    </span>
                    <div className='w-[5px] h-[9px] shrink-0 relative z-[92]'>
                      <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/77b15dfe-7f0e-4813-88ad-09c6020e2db2.png)] bg-[length:100%_100%] bg-no-repeat relative z-[93] mt-[0.5px] mr-0 mb-0 ml-0' />
                    </div>
                  </div>
                </button>
              </div>
            </div>)
}
export default ActivePlan;