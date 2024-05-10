import {
    Box,
    Card,
    Layout,
    Link,
    List,
    Page,
    Text,
    BlockStack,
} from "@shopify/polaris";
import DashboardHeader from "~/components/DashboardHeader";
import MultipleSearchSelection from "~/components/MultipleSearchSelection";
//   import Billing from "~/components/Billing";
const options = ['Pose1', 'Pose2', 'Pose3'];
const options1 = ['Background1', 'Background2', 'Background3'];
export default function VartualTryOnPage() {
    return (
        <>
            <DashboardHeader />
            <div className="vartualtryon_container mt-5">
                <div className="vartualtryon_row">
                    <div className=' flex w-full flex-col gap-[20px] items-start flex-nowrap relative mx-auto my-0'>
                        <div className='flex gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative'>
                            <div className='flex flex-col gap-[4px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative'>
                                <span className="h-[27px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[18px] font-semibold leading-[27px] text-[#101828] relative text-left whitespace-nowrap ">
                                    Feature Settings
                                </span>
                                <span className="h-[20px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[20px] text-[#475467] relative text-left overflow-hidden whitespace-nowrap z-[3]">
                                    Enable key features to enhance the try-on experience for your users
                                </span>
                            </div>
                        </div>
                        <div className='h-px self-stretch shrink-0 bg-[url(../assets/images/4b39ca50-ffd0-414b-a544-e51db0238030.png)] bg-cover bg-no-repeat relative z-[4]' />
                    </div>
                </div>
                <div className=' flex w-[1206px] gap-[32px] items-start flex-wrap relative  my-0 mt-10'>
                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                        <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left whitespace-nowrap">
                            Number of selfies uploaded by user
                        </span>
                    </div>
                    <div className='flex w-[512px] flex-col gap-[16px] items-end flex-nowrap relative '>
                        <div className='flex gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[3]'>
                            <div className='flex flex-col gap-[6px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[4]'>
                                <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[5]'>
                                    <div className='flex items-start self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d0d5dd] relative shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] z-[6]'>
                                        <div className='flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[7]'>
                                                <div className='flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[8]'>
                                                <select className="w-full bg-transparent">
                                                <option value="1" className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#101828] relative text-left overflow-hidden whitespace-nowrap z-[9]">Selfie 1</option>
                                                <option value="1" className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#101828] relative text-left overflow-hidden whitespace-nowrap z-[9]">Selfie 2</option>
                                                <option value="1" className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#101828] relative text-left overflow-hidden whitespace-nowrap z-[9]">Selfie 3</option>
                                                <option value="1" className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#101828] relative text-left overflow-hidden whitespace-nowrap z-[9]">Selfie 4</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="flex w-[512px] h-[36px] justify-start items-start self-stretch shrink-0 font-['SF_Pro_Display'] text-[14px] font-normal leading-[17.5px] text-[#475467] relative text-left z-[14]">
                                    More photos will increase the resemblance of the final output but
                                    may take longer to create
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' flex w-[1206px] gap-[32px] items-start flex-wrap relative my-0 mt-10'>
                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                        <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left whitespace-nowrap">
                            Resolution of created photos
                        </span>
                    </div>
                    <div className='flex w-[512px] flex-col gap-[6px] items-start flex-nowrap relative '>
                        <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[3]'>
                            <div className='flex items-start self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d0d5dd] relative shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] z-[4]'>
                                <div className='flex pt-[10px] pr-[12px] pb-[10px] pl-[14px] gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[5]'>
                                    <div className='flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[6]'>
                                      <select className="w-full bg-transparent">
                                            <option value="1" className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#101828] relative text-left overflow-hidden whitespace-nowrap z-[9]">Standard Definition</option>
                                            <option value="1" className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#101828] relative text-left overflow-hidden whitespace-nowrap z-[9]">Standard Definition 2</option>
                                            <option value="1" className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#101828] relative text-left overflow-hidden whitespace-nowrap z-[9]">Standard Definition 3</option>
                                            <option value="1" className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#101828] relative text-left overflow-hidden whitespace-nowrap z-[9]">Standard Definition 4</option>
                                      </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[17.5px] text-[#475467] relative text-left whitespace-nowrap z-[12]">
                            HD photos are only available on our Pro and Unlimited plans
                        </span>
                    </div>
                </div>
                <div className=' flex w-[1206px] gap-[32px] items-start flex-wrap relative my-0 mt-10'>
                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                        <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left whitespace-nowrap">
                            Remove WearNow watermark
                        </span>
                    </div>
                    <div className='flex w-[512px] flex-col gap-[6px] items-start flex-nowrap relative '>
                        <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[3]'>
                            <div className='flex items-start self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d0d5dd] relative shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] z-[4]'>
                                <div className='flex pt-[10px] pr-[12px] pb-[10px] pl-[14px] gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[5]'>
                                    <div className='flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[6]'>
                                    <select className="w-full bg-transparent">
                                            <option value="1" className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#101828] relative text-left overflow-hidden whitespace-nowrap z-[9]">No</option>
                                            <option value="1" className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#101828] relative text-left overflow-hidden whitespace-nowrap z-[9]">Yes</option>
                                      </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="h-[20px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[20px] text-[#475467] relative text-left whitespace-nowrap z-[12]">
                            Photos created during your free trial are watermarked by default
                        </span>
                    </div>
                </div>
                <div className='flex w-[1175px] gap-[32px] items-start flex-wrap relative  my-0 mt-10'>
                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                        <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left whitespace-nowrap">
                            Choose default pose for photos
                        </span>
                    </div>
                    <div className='flex w-[480px] flex-col gap-[8px] items-start flex-nowrap relative '>
                        <MultipleSearchSelection options={options}/>
                        <span className="h-[20px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[20px] text-[#475467] relative text-left whitespace-nowrap ">
                            Depending on the number of photos created, poses will be randomised
                        </span>
                    </div>
                </div>
                <div className=' flex w-[1175px] gap-[32px] items-start flex-wrap relative my-0 mt-10 mb-10'>
                    <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                        <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left whitespace-nowrap">
                            Choose default background for photos
                        </span>
                    </div>
                    <div className='flex w-[480px] flex-col gap-[8px] items-start flex-nowrap relative '>
                       <MultipleSearchSelection options={options1}/>
                        <span className="flex w-[480px] h-[40px] justify-start items-start self-stretch shrink-0 font-['Inter'] text-[14px] font-normal leading-[20px] text-[#475467] relative text-left ">
                            Depending on the number of photos created, backgrounds will be
                            randomised
                        </span>
                    </div>
                </div>
            </div>

        </>
    );
}

function Code({ children }: { children: React.ReactNode }) {
    return (
        <Box
            as="span"
            padding="025"
            paddingInlineStart="100"
            paddingInlineEnd="100"
            background="bg-surface-active"
            borderWidth="025"
            borderColor="border"
            borderRadius="100"
        >
            <code>{children}</code>
        </Box>
    );
}
