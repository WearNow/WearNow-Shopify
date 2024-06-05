import React, { useEffect } from 'react'
import { Link } from "@remix-run/react";
import { fetchActivePlan } from '~/apis/plan';
import { fetchUsage } from '~/apis/usage';
import UsageComponent from './Usage';

function UsageStatistics(sessionData:any) {

    const [progress1, setProgress1] = React.useState(0);
    const [progressMax1, setProgressMax1] = React.useState(0);
    const [progress2, setProgress2] = React.useState(0);
    const [progressMax2, setProgressMax2] = React.useState(0);
  
    useEffect(() => {
        console.log(sessionData, "session data");
        console.log(sessionData?.authWithShop?.store_id, "store_id");
        const store_id = sessionData?.authWithShop?.store_id;

        if(!store_id) return
    
        const fetchData = async () => {
          const activePlan = await fetchActivePlan(store_id);
          const usage = await fetchUsage(store_id);
          console.log(activePlan, ":::activePlan");
          console.log(usage, ":::usage");
          // 使用获取到的数据
          setProgressMax1(activePlan.package.vto_limit);
          setProgressMax2(activePlan.package.product_photo_limit);
          setProgress1(usage.vto_usage_count);
          setProgress2(usage.product_photos_usage_count);
        };
    
        fetchData();
      }, []);

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
                            {progress1}/{progressMax1}
                        </span>
                    </div>
                    <UsageComponent progress={progress1} progressMax={progressMax1} />
                </div>
            </div>
            <div className='flex pr-[20px] pl-[20px] h-[23px] flex-col gap-[4px] items-start shrink-0 flex-nowrap '>
                <div className='flex justify-between items-start self-stretch shrink-0 flex-nowrap relative '>
                    <span className="h-[15px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[12px] font-medium leading-[15px] text-[#232934] relative text-left whitespace-nowrap">
                        Product Photos Created
                    </span>
                    <span className="h-[15px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[12px] font-medium leading-[15px] text-[#232934] relative text-left whitespace-nowrap">
                        {progress2}/{progressMax2}
                    </span>
                </div>
                <UsageComponent progress={progress2} progressMax={progressMax2} />
            </div>
            <Link to='/app/plan' className='pr-[20px] pl-[20px] flex w-[119px] h-[36px] pt-[5px] pr-[10px] pb-[5px] pl-[10px] gap-[8px] justify-center items-center flex-nowrap bg-[#fcedb9] rounded-[37px] relative my-0'style={{marginLeft:"20px"}}>
          
                <span className="h-[16px] shrink-0 basis-auto font-['SF_Pro_Text'] text-[12px] font-medium leading-[16px] text-[#a82c00] relative text-left whitespace-nowrap">
                    Upgrade
                </span>
                <div className='w-[12px] h-[10.95px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/arrowRight.png?v=1714747074)] bg-[length:100%_100%] bg-no-repeat relative z-[2]' />
           
            </Link>
            <p className="usage_statistics h-[30px] pr-[20px] pl-[20px] font-['SF_Pro_Display'] text-[12px] font-medium leading-[15px] text-[#232934] relative mx-auto my-0">Upgrade to a higher plan to unlock more SKUs for Virtual Try-On and to create more product photos</p>
        
        </div>
    )
}

export default UsageStatistics
function useLoaderData<T>() {
    throw new Error('Function not implemented.');
}

