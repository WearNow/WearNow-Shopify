import DashboardHeader from "~/components/DashboardHeader";
import MultipleSearchSelection from "~/components/MultipleSearchSelection";
import SidebarNavigation from "~/components/SidebarNavigation";
const options = ['Pose1', 'Pose2', 'Pose3'];
const options1 = ['Background1', 'Background2', 'Background3'];
import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';
export default function VartualTryOnPage() {
    const [selected, setSelected] = useState('today');
    const handleSelectChange = useCallback(
      (value: string) => setSelected(value),
      [],
    );
  
    const optiondata = [
      {label: 'Today', value: 'today'},
      {label: 'Yesterday', value: 'yesterday'},
      {label: 'Last 7 days', value: 'lastWeek'},
    ];
    return (
        <>
            <DashboardHeader />
            <SidebarNavigation/>
            <div className="vartualtryon_container mt-20 pppp">
                <div className="vartualtryon_row"style={{borderBottom:"1px solid var(--Colors-Border-border-secondary, #EAECF0)",paddingBottom:"30px"}}>
                    <div className=' flex w-full flex-col gap-[20px] items-start flex-nowrap relative mx-auto my-0'>
                        <div className='flex gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative'>
                            <div className='flex flex-col gap-[4px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative'>
                                <span className="h-[27px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[18px] font-semibold leading-[27px] text-[#101828] relative text-left  ">
                                    Feature Settings
                                </span>
                                <span className="h-[20px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[20px] text-[#475467] relative text-left overflow-hidden  z-[3]">
                                    Enable key features to enhance the try-on experience for your users
                                </span>
                            </div>
                        </div>
                        <div className='h-px self-stretch shrink-0 bg-[url(../assets/images/4b39ca50-ffd0-414b-a544-e51db0238030.png)] bg-cover bg-no-repeat relative z-[4]' />
                    </div>
                </div>
                <div className="vto_border"style={{borderBottom:"1px solid var(--Colors-Border-border-secondary, #EAECF0)",paddingBottom:"30px"}}>
                <div className=' flex w-[890px] vto_page gap-[32px] items-start flex-wrap relative  my-0 mt-10'>
                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                        <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left ">
                            Number of selfies uploaded by user
                        </span>
                    </div>
                    <div className='flex w-[512px] vto_page flex-col gap-[16px] items-end flex-nowrap relative '>
                        <div className='flex gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[3]'>
                            <div className='flex flex-col gap-[6px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[4]'>
                                <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[5]'>
                                    <div className='w-full flex items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative '>
                                                <div className='select_option_polaries flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[8]'>
                                                <Select
                                                label=""
                                                options={optiondata}
                                                onChange={handleSelectChange}   
                                                value={selected}
                                                />
                                            </div>
                                        </div>
                                </div>
                                <span className="flex w-[512px] vto_page h-[36px] justify-start items-start self-stretch shrink-0 font-['SF_Pro_Display'] text-[14px] font-normal leading-[17.5px] text-[#475467] relative text-left z-[14]">
                                    More photos will increase the resemblance of the final output but
                                    may take longer to create
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="vto_border"style={{borderBottom:"1px solid var(--Colors-Border-border-secondary, #EAECF0)",paddingBottom:"30px"}}>
                <div className=' flex w-[890px] vto_page gap-[32px] items-start flex-wrap relative my-0 mt-10'>
                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                        <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left ">
                            Resolution of created photos
                        </span>
                    </div>
                    <div className='flex w-[512px] vto_page flex-col gap-[6px] items-start flex-nowrap relative '>
                        <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[3]'>
                            <div className='flex items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative'>
                                <div className='w-full flex pt-[10px] pb-[10px] gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[5]'>
                                    <div className='select_option_polaries flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[6]'>
                                   <Select
                                        label=""
                                        options={optiondata}
                                        onChange={handleSelectChange}   
                                        value={selected}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[17.5px] text-[#475467] relative text-left  z-[12]">
                            HD photos are only available on our Pro and Unlimited plans
                        </span>
                    </div>
                </div>
            </div>
            <div className="vto_border"style={{borderBottom:"1px solid var(--Colors-Border-border-secondary, #EAECF0)",paddingBottom:"30px"}}>
                <div className=' flex w-[890px] vto_page gap-[32px] items-start flex-wrap relative my-0 mt-10'>
                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                        <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left ">
                            Remove WearNow watermark
                        </span>
                    </div>
                    <div className='flex w-[512px] vto_page flex-col gap-[6px] items-start flex-nowrap relative '>
                        <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[3]'>
                            <div className='flex items-start self-stretch shrink-0 flex-nowrap bg-[#fff]  relative  z-[4]'>
                                <div className='flex pt-[10px] pb-[10px] gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[5]'>
                                    <div className='select_option_polaries flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[6]'>
                                      <Select
                                        label=""
                                        options={optiondata}
                                        onChange={handleSelectChange}   
                                        value={selected}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="h-[20px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[20px] text-[#475467] relative text-left  z-[12]">
                            Photos created during your free trial are watermarked by default
                        </span>
                    </div>
                </div>
            </div>
            <div className="vto_border"style={{borderBottom:"1px solid var(--Colors-Border-border-secondary, #EAECF0)",paddingBottom:"30px"}}>
                <div className='flex w-[853px] vto_page gap-[32px] items-start flex-wrap relative  my-0 mt-10'>
                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                        <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left ">
                            Choose default pose for photos
                        </span>
                    </div>
                    <div className='flex w-[480px] vto_page flex-col gap-[8px] items-start flex-nowrap relative '>
                        <MultipleSearchSelection options={options}/>
                        <span className="h-[20px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[20px] text-[#475467] relative text-left  ">
                            Depending on the number of photos created, poses will be randomised
                        </span>
                    </div>
                </div>
            </div>
            <div className="vto_border"style={{borderBottom:"0px solid var(--Colors-Border-border-secondary, #EAECF0)",paddingBottom:"30px"}}>
                <div className=' flex w-[853px] vto_page gap-[32px] items-start flex-wrap relative my-0 mt-10 mb-10'>
                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                        <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left ">
                            Choose default background for photos
                        </span>
                    </div>
                    <div className='flex w-[480px] vto_page flex-col gap-[8px] items-start flex-nowrap relative '>
                       <MultipleSearchSelection options={options1}/>
                        <span className="flex w-[480px] vto_page h-[40px] justify-start items-start self-stretch shrink-0 font-['Inter'] text-[14px] font-normal leading-[20px] text-[#475467] relative text-left ">
                            Depending on the number of photos created, backgrounds will be
                            randomised
                        </span>
                    </div>
                </div>
            </div>
            </div>

        </>
    );
}
