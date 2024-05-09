import React from 'react'
import UsageStatistics from './UsageStatistics'
import DashboardHistory from './DashboardHistory'
// import PhotoCreated from './PhotoCreated'

function CompleteOnBording() {
    return (
        <>

            <div className='main-container flex w-full h-[299px] pt-[30px] pr-0 pb-[20px] pl-0 flex-col gap-[24px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d8dbdf] relative mx-auto my-0'>
                <div className='flex w-full h-[30px] flex-col gap-[-12px] justify-center items-center shrink-0 flex-nowrap'>
                    <div className='flex pt-0 pr-[20px] pb-0 pl-[20px] flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[1]'>
                        <div className='flex h-[30px] flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[2]'>
                            <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[3]'>
                                <span className="h-[30px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-semibold leading-[30px] text-[#323338] relative text-left whitespace-nowrap z-[4]">
                                    Complete Your Onboarding
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full h-[80px] flex-col items-start shrink-0 flex-nowrap  z-[5]'>
                    <div className='flex w-full flex-col items-start shrink-0 flex-nowrap bg-[#fff] relative z-[6]'>
                        <div className='flex h-[40px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[7]'>
                            <span className="flex w-fullh-[18px] justify-start items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#232934] absolute top-[calc(50%-9px)] left-[20px] right-[20px] text-left whitespace-nowrap z-[9]">
                                Enable Virtual Try-On
                            </span>
                            <div className='w-[16px] h-[16px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronRight.png?v=1714384785)] bg-cover bg-no-repeat absolute top-[11px] left-[385px] z-[8]' />
                        </div>
                    </div>
                    <div className='flex w-full flex-col items-start shrink-0 flex-nowrap bg-[#fff] relative z-10'>
                        <div className='flex h-[40px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[11]'>
                            <span className="flex w-[390px] h-[18px] justify-start items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#232934] absolute top-[calc(50%-9px)] left-[20px] right-[20px] text-left whitespace-nowrap z-[13]">
                                Create Your First Product Photo
                            </span>
                            <div className='w-[16px] h-[16px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronRight.png?v=1714384785)] bg-cover bg-no-repeat absolute top-[11px] left-[385px]  z-[12]' />
                        </div>
                    </div>
                </div>
            </div>
         < UsageStatistics/>
         <DashboardHistory/>
        </>
    )
}

export default CompleteOnBording
