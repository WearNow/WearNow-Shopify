import React from 'react'
import { Link } from "@remix-run/react";

function UsageStatistics() {
    return (
        <div className='main-container flex w-full h-[258px] pt-[30px] pr-0 pb-[20px] pl-0 flex-col gap-[16px] bg-[#fff] rounded-[8px] border-solid border border-[#d8dbdf] relative mx-auto my-0'>
            <div className='flex  h-[30px] flex-col gap-[-12px] justify-center items-center shrink-0 flex-nowrap '>
                <div className='flex pt-0 pr-[20px] pb-0 pl-[20px] flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[1]'>
                    <div className='flex h-[30px] flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[2]'>
                        <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[3]'>
                            <span className="h-[30px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-semibold leading-[30px] text-[#323338] relative text-left whitespace-nowrap z-[4]">
                                Usage Statistics
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex pr-[20px] pl-[20px] h-[23px] gap-[20px] items-center shrink-0 flex-nowrap  z-[5]'>
                <div className='flex flex-col gap-[4px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[6]'>
                    <div className='flex justify-between items-start self-stretch shrink-0 flex-nowrap relative z-[7]'>
                        <span className="h-[15px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[12px] font-medium leading-[15px] text-[#232934] relative text-left whitespace-nowrap z-[8]">
                            Virtual Try-On Experiences Used
                        </span>
                        <span className="h-[15px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[12px] font-medium leading-[15px] text-[#232934] relative text-left whitespace-nowrap z-[9]">
                            300/3000
                        </span>
                    </div>
                    <div className='h-[4px] self-stretch shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/rangeimage2.png?v=1714746194)] bg-cover bg-no-repeat rounded-[11px] relative z-10' />
                </div>
            </div>
            <div className='flex pr-[20px] pl-[20px] h-[23px] flex-col gap-[4px] items-start shrink-0 flex-nowrap '>
                <div className='flex justify-between items-start self-stretch shrink-0 flex-nowrap relative '>
                    <span className="h-[15px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[12px] font-medium leading-[15px] text-[#232934] relative text-left whitespace-nowrap">
                        Product Photos Created
                    </span>
                    <span className="h-[15px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[12px] font-medium leading-[15px] text-[#232934] relative text-left whitespace-nowrap">
                        40/50
                    </span>
                </div>
                <div className='h-[4px] self-stretch shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/rangeimage.png?v=1714746194)] bg-cover bg-no-repeat rounded-[11px] relative' />
            </div>
            <Link to='/app/plan'>
            <div className='pr-[20px] pl-[20px] flex w-[119px] h-[36px] pt-[5px] pr-[10px] pb-[5px] pl-[10px] gap-[8px] justify-center items-center flex-nowrap bg-[#fcedb9] rounded-[37px] relative my-0'style={{marginLeft:"20px"}}>
                <span className="h-[16px] shrink-0 basis-auto font-['SF_Pro_Text'] text-[12px] font-medium leading-[16px] text-[#a82c00] relative text-left whitespace-nowrap">
                    Upgrade
                </span>
                <div className='w-[12px] h-[10.95px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/arrowRight.png?v=1714747074)] bg-[length:100%_100%] bg-no-repeat relative z-[2]' />
            </div>
            </Link>
            <p className="usage_statistics h-[30px] pr-[20px] pl-[20px] font-['SF_Pro_Display'] text-[12px] font-medium leading-[15px] text-[#232934] relative mx-auto my-0">Upgrade to a higher plan to unlock more SKUs for Virtual Try-On and to create more product photos</p>
        
        </div>
    )
}

export default UsageStatistics
