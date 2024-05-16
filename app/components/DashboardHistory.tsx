import React from 'react'
import DashboardModel from './DashboardModel';
const DashboardHistory = () => {
    return (
        <div className='main-container flex mt-5 w-full h-[100%] pt-[30px] pr-0 pb-[20px] pl-0 flex-col gap-[24px] items-left flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d8dbdf] relative mx-auto my-0'>
            <div className='flex h-[64px] flex-col gap-[-12px] justify-start items-left shrink-0 flex-nowrap '>
                <div className='flex pt-0 pr-[20px] pb-0 pl-[20px] flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[1]'>
                    <div className='flex h-[30px] flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[2]'>
                        <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[3]'>
                            <span className="h-[30px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-semibold leading-[30px] text-[#323338] relative text-left whitespace-nowrap z-[4]">
                                History
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[5]'>
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
            <div className='flex w-[120px] h-[120px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[8px]'>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805)] bg-cover bg-no-repeat relative z-[8]'>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[9]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/486d05ac-2df1-46b8-8d84-ee6587329997.png)] bg-cover bg-no-repeat relative z-10' />
                    </div>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[11]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/8ed683ca-a7f9-4f7c-bfdf-6dcd766a4eb9.png)] bg-cover bg-no-repeat relative z-[12]' />
                    </div>
                   
                    <button className='flex w-[38px] h-[24px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#333333] rounded-[8px] border-none absolute top-[4px] right-[20px] z-[21] pointer'>
                        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#fff] relative text-left whitespace-nowrap z-[22]">
                            12+
                        </span>
                    </button>
                </div>
            </div>
            <div className='flex w-[120px] h-[120px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[8px] '>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805)] bg-cover bg-no-repeat relative z-[24]'>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[25]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/696df1b6-cac5-4de1-b9c2-fd69d6f1bead.png)] bg-cover bg-no-repeat relative z-[26]' />
                    </div>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[27]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/2f6e377f-e953-4d26-af5d-af0bbee9e4ac.png)] bg-cover bg-no-repeat relative z-[28]' />
                    </div>
                    <button className='flex w-[38px] h-[24px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#333333] rounded-[8px] border-none absolute top-[4px] right-[20px] z-[37] pointer'>
                        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#fff] relative text-left whitespace-nowrap z-[38]">
                            12+
                        </span>
                    </button>
                </div>
            </div>
            <div className='flex w-[120px] h-[120px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[8px] '>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805)] bg-cover bg-no-repeat relative z-40'>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[41]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/baeee263-f40c-438d-9fa3-d4ce4d144192.png)] bg-cover bg-no-repeat relative z-[42]' />
                    </div>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[43]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/c4870c85-65e7-464e-8916-45e41f8a4850.png)] bg-cover bg-no-repeat relative z-[44]' />
                    </div>
                    
                    <button className='flex w-[38px] h-[24px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#333333] rounded-[8px] border-none absolute top-[4px] right-[20px] z-[53] pointer'>
                        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#fff] relative text-left whitespace-nowrap z-[54]">
                            12+
                        </span>
                    </button>
                </div>
            </div>
            <div className='flex w-[120px] h-[120px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[8px] '>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805)] bg-cover bg-no-repeat relative z-[56]'>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[57]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/22d5fe04-8b3b-4983-abef-d83a78b46ab2.png)] bg-cover bg-no-repeat relative z-[58]' />
                    </div>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[59]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/d4cea400-530b-4d4b-8ab3-5844da8af914.png)] bg-cover bg-no-repeat relative z-[60]' />
                    </div>
                    <button className='flex w-[38px] h-[24px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#333333] rounded-[8px] border-none absolute top-[4px] right-[20px] z-[69] pointer'>
                        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#fff] relative text-left whitespace-nowrap z-[70]">
                            12+
                        </span>
                    </button>
                </div>
            </div>
            <div className='flex w-[120px] h-[120px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[8px] '>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805)] bg-cover bg-no-repeat relative z-[72]'>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[73]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/64fd1015-1370-40f4-9d87-0a75f8ab4bc0.png)] bg-cover bg-no-repeat relative z-[74]' />
                    </div>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[75]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/b8e523e5-5c31-400f-a9e9-8b244129e30a.png)] bg-cover bg-no-repeat relative z-[76]' />
                    </div>
                    <button className='flex w-[38px] h-[24px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#333333] rounded-[8px] border-none absolute top-[4px] right-[20px] z-[85] pointer'>
                        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#fff] relative text-left whitespace-nowrap z-[86]">
                            12+
                        </span>
                    </button>
                </div>
            </div>
            <div className='flex w-[120px] h-[120px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[8px] '>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805)] bg-cover bg-no-repeat relative z-[88]'>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[89]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/cd99bfea-d9b8-47de-adde-306e42c931f9.png)] bg-cover bg-no-repeat relative z-[90]' />
                    </div>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[91]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/a956b38b-9829-4969-a7f6-a58924398c95.png)] bg-cover bg-no-repeat relative z-[92]' />
                    </div>
                    
                    <button className='flex w-[38px] h-[24px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#333333] rounded-[8px] border-none absolute top-[4px] right-[20px] z-[101] pointer'>
                        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#fff] relative text-left whitespace-nowrap z-[102]">
                            12+
                        </span>
                    </button>
                </div>
            </div>
            <div className='flex w-[120px] h-[120px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[8px] '>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805)] bg-cover bg-no-repeat relative z-[104]'>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[105]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/3482d258-8358-4c84-aeab-edfe3560a497.png)] bg-cover bg-no-repeat relative z-[106]' />
                    </div>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[107]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/77622276-1280-4e09-b379-7948c86f88d9.png)] bg-cover bg-no-repeat relative z-[108]' />
                    </div>
                    <button className='flex w-[38px] h-[24px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#333333] rounded-[8px] border-none absolute top-[4px] right-[20px] z-[117] pointer'>
                        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#fff] relative text-left whitespace-nowrap z-[118]">
                            12+
                        </span>
                    </button>
                </div>
            </div>
            <div className='flex w-[120px] h-[120px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[8px] '>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805)] bg-cover bg-no-repeat relative z-[120]'>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[121]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/e662e194-4f54-4672-be1b-57d11a958770.png)] bg-cover bg-no-repeat relative z-[122]' />
                    </div>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[123]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/aee24c1e-394f-4222-9e5a-d099da769c96.png)] bg-cover bg-no-repeat relative z-[124]' />
                    </div>
                   
                    <button className='flex w-[38px] h-[24px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#333333] rounded-[8px] border-none absolute top-[4px] right-[20px] z-[133] pointer'>
                        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#fff] relative text-left whitespace-nowrap z-[134]">
                            12+
                        </span>
                    </button>
                </div>
            </div>
            <div className='flex w-[120px] h-[120px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[8px] '>
                <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/imghistory.png?v=1714736805)] bg-cover bg-no-repeat relative z-[136]'>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[137]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/babffe56-2819-45e4-8b48-a8e5f521b435.png)] bg-cover bg-no-repeat relative z-[138]' />
                    </div>
                    <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0)] relative z-[139]'>
                        <div className='h-[60px] self-stretch shrink-0 bg-[url(../assets/images/e476706e-2832-4efa-876c-b65629f3c8e6.png)] bg-cover bg-no-repeat relative z-[140]' />
                    </div>
                   
                    <button className='flex w-[38px] h-[24px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#333333] rounded-[8px] border-none absolute top-[4px] right-[20px] z-[149] pointer'>
                        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#fff] relative text-left whitespace-nowrap z-[150]">
                            12+
                        </span>
                    </button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default DashboardHistory
