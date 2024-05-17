import React from 'react'
import DashboardModel from './DashboardModel';
const DashboardHistory = () => {
    return (
        <div className='main-container flex w-full pr-0 pb-[20px] pl-0 flex-col gap-[24px] items-left flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d8dbdf] relative mx-auto my-0'>
            <div className='flex h-[64px] flex-col gap-[-12px] mt-5 justify-start items-left shrink-0 flex-nowrap '>
                <div className='flex pt-0 pr-[20px] pb-0 pl-[20px] flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden '>
                    <div className='flex h-[30px] flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative '>
                        <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden '>
                            <span className="h-[30px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-semibold leading-[30px] text-[#323338] relative text-left whitespace-nowrap ">
                                History
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative '>
                        <span className="h-[18px] grow shrink-0 basis-auto font-['SF_Pro_Text'] text-[13px] font-normal leading-[18px] text-[#323338] tracking-[-0.08px] relative text-left whitespace-nowrap z-[6]">
                            See the product photos you’ve created to date
                        </span>
                    </div>
                </div>
            </div>
            {/* <div className='photo_created'>
                <button className='photo_created_btn'>
                    <div className='photo_created_content'style={{display:"block"}}>
                        <img className="photo_created_rounded" src='https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Content.png?v=1714977637' />
                        <img className='photo_created_choosfile_icon' src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/photo_created_icon_c3933789-a940-4208-979b-1b079877a371.png?v=1714977636"/>
                    </div>
                </button>
            </div> */}
            < DashboardModel/>
            <div className='product_create_select'>
                <div className='product_create_select_item'>
                    <img  src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805"/>
                    <span>12+</span>
                </div>
                <div className='product_create_select_item'>
                    <img  src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805"/>
                    <span>12+</span>
                </div>
                <div className='product_create_select_item'>
                    <img  src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805"/>
                    <span>12+</span>
                </div>
                <div className='product_create_select_item'>
                    <img  src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805"/>
                    <span>12+</span>
                </div>
                <div className='product_create_select_item'>
                    <img  src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805"/>
                    <span>12+</span>
                </div>
                <div className='product_create_select_item'>
                    <img  src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805"/>
                    <span>12+</span>
                </div>
            </div>
        </div>
    )
}

export default DashboardHistory
