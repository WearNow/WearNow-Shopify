import React from 'react';

const ComingSoon=()=>{
    return (
        <div className='main-container flex w-full h-[135px]  pr-0 pb-[20px] pl-0 flex-col  gap-[24px] items-center flex-nowrap bg-[#fff] rounded-[8px]  border-solid border border-[#d8dbdf] relative mx-auto my-0'>
      <div className='flex w-full h-[91px] flex-col gap-[-12px] justify-center items-center shrink-0 flex-nowrap absolute top-[20px] left-[-1px]'>
        <div className='flex pt-0 pr-[20px] pb-0 pl-[20px] flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[1]'>
          <div className='flex h-[57px] flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[2]'>
            <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[3]'>
              <span className="h-[30px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-semibold leading-[30px] text-[#323338] relative text-left whitespace-nowrap z-[4]">
                Analytics & AI Recommendations
              </span>
            </div>
            <button className='w-[94px] h-[24px] shrink-0 border-none relative z-[5] pointer'>
              <div className='w-[94px] h-[24px] absolute top-0 left-0 z-[6]'>
                <div className='w-full h-full text-[0px] absolute top-0 left-0 overflow-hidden z-[7]'>
                  <span className="flex w-[90.385px] h-[16px] justify-center items-start font-['SF_Pro_Text'] text-[12px] font-normal leading-[16px] text-[#006dbc] relative text-center whitespace-nowrap z-[9] mt-[4px] mr-0 mb-0 ml-0">
                    Coming Soon
                  </span>
                  <div className='w-full h-full  bg-[length:100%_100%] bg-no-repeat rounded-[6px] absolute top-0 left-0 z-[8]'style={{background:"linear-gradient(151.18deg, rgba(255, 255, 255, 0.2) -57.92%, rgba(56, 182, 255, 0.2) 63.25%)"}} />
                </div>
              </div>
            </button>
          </div>
          <div className='flex gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-10'>
            <span className="h-[18px] grow shrink-0 basis-auto font-['SF_Pro_Text'] text-[13px] font-normal leading-[18px] text-[#323338] tracking-[-0.08px] relative text-left whitespace-nowrap z-[11]">
              Take your sales process to the next level with product-level
              try-on analytics and AI recommendations
            </span>
          </div>
        </div>
      </div>
    </div>
    )
};
export default ComingSoon;