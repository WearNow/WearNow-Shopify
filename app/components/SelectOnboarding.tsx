import React from 'react'

function SelectOnboarding(props:any) {
    const { step, value, selectLoop, handleSelection, type } = props;
   
    return (
        <>
            <div className='w-full shrink-0 rounded-[100px] relative z-[26]' style={{marginBottom:"20px"}}>
                <div className="second_select after_border_next">
                    <div className="flex  items-center gap-2">
                        <div className='flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#232934]  top-0 left-0 overflow-hidden z-[28]'>
                            <span className="flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#232934] relative text-center whitespace-nowrap z-[29]">
                               {step}
                            </span>
                        </div>
                        <span className="flex h-[30px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[#232934]  top-px left-[47px] text-left whitespace-nowrap z-[27]">
                            Select a {type}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 mt-5 select_model" style={{ position: "relative", left: "50px" }}>
                        {selectLoop.map((model: any) => ( 
                 
        
                            <div  onClick={() => handleSelection(model.uuid,type)}  className='flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px]  top-[50px] left-[47px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-[34]'>
                                <div className=' self-stretch h-[81px]  grow shrink-0 basis-0  relative z-[35]' >
                                    <img src={model.image?model.image:model.cover_image} style={{height:"100%",width:"100%"}}/>
                                </div>
                                <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[36]'>
                                    <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[37]'>
                                        <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[38]">
                                            {model.name} 
                                          
                                        </span>
                                    </div>
                                    <div className='flex w-[75px] pt-[8px] pr-0 pb-0 pl-0 gap-[8px] items-start shrink-0 flex-nowrap relative z-[39]'>
                                        <button className='flex w-[75px] h-[28px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none relative z-40 pointer'>
                                            <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[41]">
                                                {model.size} 
                                               
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                           
                         ))} 

                    </div>
                </div>

            </div>
        </>
    )
}

export default SelectOnboarding
