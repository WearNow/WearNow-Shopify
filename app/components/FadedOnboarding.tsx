import React from 'react'

const FadedOnboarding = (props:any) =>{
    const { step, sectionText } = props;
    return (
        <div className='w-[226px] h-[36px]  flex justify-start  items-center gap-2 shrink-0 rounded-[100px]  top-[423px] left-0 z-[74]'style={{marginBottom:"10px"}}>
            <div className='flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#e7e7e7]  top-0 left-0 overflow-hidden z-[76]'>
                <span className="flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#b7b7b7] relative text-center whitespace-nowrap z-[77]">
                    {step}
                </span>
            </div>
            <span className="flex h-[24px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-normal leading-[24px] text-[#b7b7b7] tracking-[0.38px]  top-[6px] left-[48px] text-left whitespace-nowrap z-[75]">
                {sectionText}
            </span>
        </div>
    )
}

export default FadedOnboarding
