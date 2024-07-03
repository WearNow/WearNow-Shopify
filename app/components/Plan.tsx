import React from 'react';
import { Spinner } from '@shopify/polaris';

const Plan:React.FC<{item:any,active:any,loader:string,handleBilling:any,package_id:string}>=({item,active,loader,handleBilling,package_id})=>{
    return (
        <div className='flex biling_item pt-[32px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#fff] border-solid border border-[#e5e7eb] relative shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] z-10'>
              <div className='flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[11]'>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[12]'>
                  <div className='flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[13]'>
                    <span className="h-[30px] flex  justify-between self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#6b7280] relative text-left whitespace-nowrap z-[14]">
                      {item.name}
                      {item.description && item.description!='.' && (
                      <button className='flex w-[132px] h-[25px] pt-[2px] pr-[12px] pb-[2px] pl-[12px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#e1effe] rounded-[6px] border-none  top-[36px] left-[250.5px] z-[138] pointer'>
                      <div className='w-[16px] h-[16px] shrink-0 relative z-[139]'>
                      <div className='w-[13.333px] h-[13.333px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/clock.png?v=1714641444)] bg-[length:100%_100%] bg-no-repeat relative z-[140] mt-[1.333px] mr-0 mb-0 ml-[1.333px]' />
                      </div>
                      
                      <span className="flex w-[88px] h-[21px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[21px] text-[#1e429f] relative text-center whitespace-nowrap z-[141]">
                      {item.description}
                      </span>
                      
                      </button>
                      )}
                    </span>
                  </div>
                  <div className='flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative z-[15]'>
                    <div className="shrink-0 font-['SF_Pro_Display'] text-[48px] flex gap-2 font-black leading-[48px] relative text-left whitespace-nowrap z-[16]">
                    {item.strike_amount && (
                      <span className="font-['SF_Pro_Display'] text-[48px] font-thin leading-[48px] text-[#111928] relative text-left line-through	">
                        ${item.strike_amount}
                      </span>
                    )}
                      <span className="font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#111928] relative text-left">
                        ${item.price}
                      </span>
                    </div>
                    <span className="flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#6b7280] relative text-center z-[17]">
                      /month
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[18]'>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[19]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-20'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[21]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[22]">
                      {item.number_of_products?item.number_of_products:'Unlimited'} Products
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative ' style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[24]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[25]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      {item.vto_limit?item.vto_limit:"Unlimited"} Try-On Experiences
                    </span>
                    <div className='show_on_hover ml-5' >
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
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[27]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[28]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[29]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-30">
                      {item.product_photo_limit?item.product_photo_limit:"Unlimited"} Product Photos
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative ' style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[32]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[33]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
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
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[35]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[36]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative   mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      {item.support_text}
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[39]'style={{width:"fix-content"}}>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-40'>
                      {item.customized_models ? (
                          <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636264)] bg-[length:100%_100%] bg-no-repeat relative z-[41]  mr-0 mb-0 ml-[2.5px]' />

                      ):(
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle2.png?v=1714636264)] bg-[length:100%_100%] bg-no-repeat relative z-[41]  mr-0 mb-0 ml-[2.5px]' />
                    )} 
                      </div>
                      {item.customized_models ? (
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[42]">
                      Upload Your Own Model
                    </span>
                      ):(
                        <span className="line-through ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[42]">
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
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[43]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[44]'>
                      {item.hd_photos ? (
                            <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636264)] bg-[length:100%_100%] bg-no-repeat relative z-[41]  mr-0 mb-0 ml-[2.5px]' />

                        ):(
                        <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle2.png?v=1714636264)] bg-[length:100%_100%] bg-no-repeat relative z-[41]  mr-0 mb-0 ml-[2.5px]' />
                      )}                    </div>
                      {item.customized_models ? (
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[42]">
                      HD Photos
                    </span>
                      ):(
                        <span className="line-through ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[42]">
                       HD Photos
                      </span> 
                      )}
                   
                  </div>
                </div>
                {/* {active?.price>item.price ? (
                  <button className='flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative pointer' style={{opacity:0.3,pointerEvents:"unset"}}>
                  <div className='flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative '>
                   
                    <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap ">
                      Not Applicable
                    </span>
                    
                    <div className='w-[5px] h-[9px] shrink-0 relative z-50'>
                      <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/1b104d68-1f14-4cf9-948b-3013641a3038.png)] bg-[length:100%_100%] bg-no-repeat relative z-[51] mt-[0.5px] mr-0 mb-0 ml-0' />
                    </div>
                  </div>
                </button>
                ):( */}
                  <>
                  {loader=='yes' && item.uuid==package_id ?(
                    <button style={{pointerEvents:"unset",opacity:0.3}} className='flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative pointer'>
                    <div className='flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative '>
                      
                      <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap ">
                      <Spinner accessibilityLabel="Small spinner example" size="small" />
                      </span>
                     
                      <div className='w-[5px] h-[9px] shrink-0 relative z-50'>
                        <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/1b104d68-1f14-4cf9-948b-3013641a3038.png)] bg-[length:100%_100%] bg-no-repeat relative z-[51] mt-[0.5px] mr-0 mb-0 ml-0' />
                      </div>
                    </div>
                  </button>
                  ):(
                <button onClick={()=>handleBilling(item.uuid,item.cycle)} className='flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative pointer'>
                  <div className='flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative '>
                    {active?.price ?(
                    <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap ">
                      {active.price>item.price ? "Downgrade":"Upgrade"}
                    </span>
                    ):(
                    <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap ">
                        Start 14-Day Free Trial
                    </span>
                    )}
                    <div className='w-[5px] h-[9px] shrink-0 relative z-50'>
                      <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/1b104d68-1f14-4cf9-948b-3013641a3038.png)] bg-[length:100%_100%] bg-no-repeat relative z-[51] mt-[0.5px] mr-0 mb-0 ml-0' />
                    </div>
                  </div>
                </button>
                )}
                </>
                {/* )} */}
              </div>
            </div>
    );
};
export default Plan;