import React from 'react'
import { Link, Outlet, useLoaderData, useRouteError, useMatch } from "@remix-run/react";

const DashboardHeader = () => {
  const matchDashboard = useMatch("/app/dashboard");
  const matchVirtualTryon = useMatch("/app/virtualtryon");
  const matchPhotostudio = useMatch("/app/photostudio");
  const matchProductpage = useMatch("/app/productpage");

  return (
    <div className='ai_header_container flex w-full pt-0 pr-[20px] pb-0 pl-[20px] justify-between items-center flex-nowrap bg-[#fff] relative mx-auto my-0'>
      <div className='flex w-[515px] pt-[8px] pr-0 pb-[8px] pl-0 gap-[16px] items-center shrink-0 flex-nowrap relative'>
        <div className='flex w-[40px] gap-[3.2px] items-center shrink-0 flex-nowrap relative z-[1]'>
          <div className='w-[40px] h-[40px] shrink-0 relative overflow-hidden z-[2]'>
            <div className='w-[40px] h-[40px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/logo.png?v=1714718286)] bg-[length:100%_100%] bg-no-repeat relative z-[3] mr-0 mb-0 ml-[4.133px]' />
          </div>
        </div>

        <div className='dashboard_navigation flex w-[459px] pt-0 pr-[4px] pb-0 pl-[4px] gap-[4px] items-start shrink-0 flex-nowrap relative z-[4]'>
          <Link to="/app/dashboard" className={matchDashboard ? "active" : ""}>
            <button className='flex w-[87px] h-[28px] pt-[6px] pr-[12px] pb-[6px] pl-[12px] justify-center items-center shrink-0 flex-nowrap  border-none relative z-[5] pointer'>
              <span className="flex w-[63px] h-[16px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#303030] relative text-center whitespace-nowrap z-[6]">
                Dashboard
              </span>
            </button>
          </Link>
          {/* <Link to="/app/virtualtryon" className={matchVirtualTryon ? "active" : ""}>
            <div className='flex w-[107px] h-[28px] pt-[6px] pr-[12px] pb-[6px] pl-[12px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] relative z-[7]'>
              <span className="flex w-[83px] h-[16px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#303030] relative text-center whitespace-nowrap z-[8]">
                Virtual Try-On
              </span>
            </div>
          </Link> */}
          <Link to="/app/photostudio" className={matchPhotostudio ? "active" : ""}>
            <div className='flex w-[99px] h-[28px] pt-[6px] pr-[12px] pb-[6px] pl-[12px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] relative z-[9]'>
              <span className="flex w-[75px] h-[16px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#303030] relative text-center whitespace-nowrap z-10">
                Photo Studio
              </span>
            </div>
          </Link>
          <Link to="/app/productpage" className={matchProductpage ? "active" : ""}>
            <div className='flex w-[76px] h-[28px] pt-[6px] pr-[12px] pb-[6px] pl-[12px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] relative z-[11]'>
              <span className="flex w-[52px] h-[16px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#303030] relative text-center whitespace-nowrap z-[12]">
                products
              </span>
            </div>
          </Link>
          <div className='flex w-[66px] h-[28px] pt-[6px] pr-[12px] pb-[6px] pl-[12px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] relative z-[13]'>
            <span className="flex w-[42px] h-[16px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#303030] relative text-center whitespace-nowrap z-[14]">
              History
            </span>
          </div>
        </div>
      </div>
      <div className='flex w-[316px] gap-[14px] justify-end items-center shrink-0 flex-nowrap relative '>
        <button className='flex w-[104px] pt-[4px] pr-[10px] pb-[4px] pl-[10px] gap-[4px] justify-center items-center shrink-0 flex-nowrap rounded-[40px] border-solid border border-[#0570de] relative  pointer'>
          <span className="h-[16px] shrink-0 basis-auto font-['SF_Pro_Text'] text-[12px] font-medium leading-[16px] text-[#0570de] relative text-left whitespace-nowrap z-[17]">
            Create New
          </span>
          <div className='w-[12px] h-[12px] shrink-0 relative '>
            <div className='w-full h-full  absolute top-0 left-0 ' >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75 5.25H11.25C11.6642 5.25 12 5.58579 12 6C12 6.41421 11.6642 6.75 11.25 6.75H6.75V11.25C6.75 11.6642 6.41421 12 6 12C5.58579 12 5.25 11.6642 5.25 11.25V6.75H0.75C0.335786 6.75 0 6.41421 0 6C0 5.58579 0.335786 5.25 0.75 5.25H5.25V0.75C5.25 0.335786 5.58579 0 6 0C6.41421 0 6.75 0.335786 6.75 0.75V5.25Z" fill="#0570DE"/>
              </svg>
            </div>
          </div>
        </button>
        <div className='flex w-[133px] pt-[10px] pr-0 pb-[10px] pl-[10px] gap-[8px] items-center shrink-0 flex-nowrap relativez-20'>
          <span className="h-[20px] shrink-0 basis-auto font-['SF_Pro_Text'] text-[14px] font-medium leading-[20px] text-[#34c759] tracking-[-0.15px] relative text-left whitespace-nowrap ">
            Try-On Active
          </span>
          <div className='w-[36px] h-[28px] shrink-0 bg-[url(../assets/images/3cd34978-eac0-4005-a003-a90c6014efaf.png)] bg-cover bg-no-repeat relative '>
            <div className="enabled_vartual_try_on try_on_active flex flex-col justify-center items-start p-1 my-auto rounded-xl">
              <div className="switch">
                <input type="checkbox" id="switch" /><label htmlFor="switch">Toggle</label>
              </div>
            </div>
          </div>
        </div>
        <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#414552] relative text-left whitespace-nowrap z-[23]">
          Settings
        </span>
      </div>
    </div>
  )
}

export default DashboardHeader