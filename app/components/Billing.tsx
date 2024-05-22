import React, { useState } from 'react';
const Billing = ({handlesubmit}:any) => {
  const [activeTab, setActiveTab] = useState(1);
  const [bgcolorTab, setBgcolorTab] = useState("black");
  const [bgcolorTab2, setBgcolorTab2] = useState("white");
  const [colorTab, setColorTab] = useState("white");
  const [colorTab2, setColorTab2] = useState("black");
  const handleTabClick1 = () => {
     setActiveTab(1);
      setBgcolorTab("black")
      setColorTab("white")
      setBgcolorTab2("white")
      setColorTab2("black")
  };
  const handleTabClick2 = () => {
    setActiveTab(2);
    setBgcolorTab("white")
    setColorTab("black")
    setBgcolorTab2("black")
    setColorTab2("white")
  };
 
  const handleBilling = async(amount:number) => {
    console.log("Amount :::=>",amount);
    await handlesubmit(amount);
  }
  return (
    <>
      <div className='main-container flex w-full pt-[60px] pr-[10px] pb-[60px] pl-[10px] flex-col gap-[30px] items-center flex-nowrap bg-[#fff] relative mx-auto my-0'>
        <div className='billing_content flex w-full h-[85px] flex-col gap-[16px] items-center shrink-0 flex-nowrap  top-[38px] left-[134.5px]'>
          <span className="flex w-[325px] h-[45px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[36px] font-medium leading-[45px] text-[#1d2127] relative text-center ">
            Transform your store
          </span>
          <span className="flex w-full  justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#52575d] relative text-center ">
            Power up your product display with AI-driven imagery and virtual
            try-on experiences.
          </span>
        </div>
        <div className='flex w-[316px] h-[52px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] gap-[8px] items-start shrink-0 flex-nowrap bg-[rgba(116,116,128,0.08)] rounded-[100px]  top-[153px]  z-[3]'>
          <button onClick={() => handleTabClick1()}   className='flex w-[150px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#1d2127] rounded-[100px] border-none relative z-[4] pointer'style={{background:bgcolorTab}}>
            <span className="flex w-[57px] h-[24px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-center whitespace-nowrap z-[5]"style={{color:colorTab}}>
              Monthly
            </span>
          </button>
          <div onClick={() => handleTabClick2()} className='flex w-[150px] pt-[10px] pr-[10px] pointer pb-[10px] pl-[10px] gap-[4px] justify-center items-baseline shrink-0 flex-nowrap rounded-[100px] relative z-[6]' style={{ cursor: "pointer",background:bgcolorTab2}}>
            <span className="flex w-[43px] h-[24px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#1d2127] relative text-center whitespace-nowrap z-[7]" style={{color:colorTab2}}>
              Yearly
            </span>
            <span className="flex w-[70px] h-[18px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#1d2127] relative text-center whitespace-nowrap z-[8]"style={{color:colorTab2}}>
              40% off
            </span>

          </div>
        </div>
        {activeTab === 1 &&
          <div className='biling_container flex  h-[550px] gap-px items-end shrink-0 flex-nowrap rounded-[16px]   top-[235px] z-[9]'>
            <div className='flex biling_item pt-[32px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#fff] border-solid border border-[#e5e7eb] relative shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] z-10'>
              <div className='flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[11]'>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[12]'>
                  <div className='flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[13]'>
                    <span className="h-[30px] flex  justify-between self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#6b7280] relative text-left whitespace-nowrap z-[14]">
                      Basic
                      <button className='flex w-[132px] h-[25px] pt-[2px] pr-[12px] pb-[2px] pl-[12px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#e1effe] rounded-[6px] border-none  top-[36px] left-[250.5px] z-[138] pointer'>
                      <div className='w-[16px] h-[16px] shrink-0 relative z-[139]'>
                      <div className='w-[13.333px] h-[13.333px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/clock.png?v=1714641444)] bg-[length:100%_100%] bg-no-repeat relative z-[140] mt-[1.333px] mr-0 mb-0 ml-[1.333px]' />
                      </div>
                      <span className="flex w-[88px] h-[21px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[21px] text-[#1e429f] relative text-center whitespace-nowrap z-[141]">
                      Early Bird Offer
                      </span>
                      </button>
                    </span>
                  </div>
                  <div className='flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative z-[15]'>
                    <div className="w-[192px] shrink-0 font-['SF_Pro_Display'] text-[48px] flex gap-2 font-black leading-[48px] relative text-left whitespace-nowrap z-[16]">
                      <span className="font-['SF_Pro_Display'] text-[48px] font-thin leading-[48px] text-[#111928] relative text-left line-through	">
                        $99
                      </span>
                      <span className="font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#111928] relative text-left">
                        $49
                      </span>
                    </div>
                    <span className="flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#6b7280] relative text-center z-[17]">
                      /month
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[18]'>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[19]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-20'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[21]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[22]">
                      50 Products
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative ' style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[24]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[25]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      1000 Try-On Experiences
                    </span>
                    <div className='show_on_hover ml-5' >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>A Try-On Experience is defined as every time a shopper initiates a request for and receives a picture to try-on a particular piece of apparel. A shopper may therefore use several try-on experiences in a single session.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[27]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[28]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[29]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-30">
                      50 Product Photos
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative ' style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[32]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[33]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      Access to 5 Pro Models
                    </span>
                    <div className='show_on_hover '>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>Pro Models are AI fashion models that have been specially crafted by WearNow to achieve the highest range of versatility when it comes to product photos. They can work effectively with any outfit, pose, and background.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[35]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[36]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative   mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      Support Team
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[39]'style={{width:"fix-content"}}>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-40'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle2.png?v=1714636264)] bg-[length:100%_100%] bg-no-repeat relative z-[41]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[42]">
                      Upload Your Own Model
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[43]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[44]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle2.png?v=1714636264)] bg-[length:100%_100%] bg-no-repeat relative z-[45]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[46]">
                      HD Photos
                    </span>
                  </div>
                </div>
                <button onClick={()=>handleBilling(49)} className='flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative pointer'>
                  <div className='flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative '>
                    <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap ">
                      Start 14-Day Free Trial
                    </span>
                    <div className='w-[5px] h-[9px] shrink-0 relative z-50'>
                      <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/1b104d68-1f14-4cf9-948b-3013641a3038.png)] bg-[length:100%_100%] bg-no-repeat relative z-[51] mt-[0.5px] mr-0 mb-0 ml-0' />
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className='flex biling_item pt-[35px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#023353] relative shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] z-[52]'>
              <div className='flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[53]'>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[54]'>
                  <div className='flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[55]'>
                    <span className="h-[30px] flex justify-between self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#b1d6ed] relative text-left whitespace-nowrap z-[56]">
                      Pro
                      <button className='flex w-[102px] h-[25px] pt-[2px] pr-[12px] pb-[2px] pl-[12px] justify-center items-center shrink-0 flex-nowrap bg-[#e1effe] rounded-[6px] border-none  top-[36px] left-[694.5px] z-[136] pointer'>
                      <span className="flex w-[78px] h-[21px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[21px] text-[#1e429f] relative text-center whitespace-nowrap z-[137]">
                      Most Popular
                      </span>
                      </button>
                    </span>
                  </div>
                  <div className='flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative z-[57]'>
                    <span className="h-[48px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#f6f6f7] relative text-left whitespace-nowrap z-[58]">
                      $499
                    </span>
                    <span className="flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#fff] relative text-center z-[59]">
                      /month
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[60]'>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[61]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[62]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[63]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[64]">
                      250 Products
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative' style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[66]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[67] mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[68]">
                      5000 Try-On Experiences
                    </span>
                    <div className='show_on_hover '>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>A Try-On Experience is defined as every time a shopper initiates a request for and receives a picture to try-on a particular piece of apparel. A shopper may therefore use several try-on experiences in a single session.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[69]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[70]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[71] mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[72]">
                      300 Product Photos
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative ' style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative '>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[75] mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[76]">
                      Access to 20 Pro Models
                    </span>
                    <div className='show_on_hover '>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>Pro Models are AI fashion models that have been specially crafted by WearNow to achieve the highest range of versatility when it comes to product photos. They can work effectively with any outfit, pose, and background.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative '>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[78]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap ">
                      Dedicated Support Channel
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative ' style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative '>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap">
                      Upload Your Own Model
                    </span>
                    <div className='show_on_hover '>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>Upload Your Own Model
                        If you have an agreement and the rights to create images using the likeness of a particular person you may use them in your product photos by creating a custom model. You will need to upload a few images of them along with some body preferences.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative '>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[86]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[87] mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap ">
                      HD Photos
                    </span>
                  </div>
                </div>
                <button className='flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative  pointer'>
                  <div className='flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative '>
                    <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap ">
                      Start 14-Day Free Trial
                    </span>
                    <div className='w-[5px] h-[9px] shrink-0 relative z-[92]'>
                      <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/77b15dfe-7f0e-4813-88ad-09c6020e2db2.png)] bg-[length:100%_100%] bg-no-repeat relative z-[93] mt-[0.5px] mr-0 mb-0 ml-0' />
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className='flex biling_item pt-[32px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#fff] rounded-tl-none rounded-tr-[8px] rounded-br-[8px] rounded-bl-none border-solid border border-[#e5e7eb] relative shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] z-[94]'>
              <div className='flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[95]'>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[96]'>
                  <div className='flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[97]'>
                    <span className="h-[30px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#6b7280] relative text-left whitespace-nowrap">
                      Unlimited
                    </span>
                  </div>
                  <div className='flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative z-[99]'>
                    <span className="h-[48px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#111928] relative text-left whitespace-nowrap">
                      $1499
                    </span>
                    <span className="flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#6b7280] relative text-center">
                      /month
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[102]'>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative '>
                    <div className='w-[20px] h-[20px] shrink-0 relative'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      Unlimited Products
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative ' style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative '>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      Unlimited Try-On Experiences
                    </span>
                    <div className='show_on_hover '>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>A Try-On Experience is defined as every time a shopper initiates a request for and receives a picture to try-on a particular piece of apparel. A shopper may therefore use several try-on experiences in a single session.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative '>
                    <div className='w-[20px] h-[20px] shrink-0 relative '>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      Unlimited Product Photos
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative ' style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[116]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      Access to 50 Pro Models
                    </span>
                    <div className='show_on_hover '>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>Pro Models are AI fashion models that have been specially crafted by WearNow to achieve the highest range of versatility when it comes to product photos. They can work effectively with any outfit, pose, and background.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative'>
                    <div className='w-[20px] h-[20px] shrink-0 relative '>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative   mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap]">
                      24/7 Live Support
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative 'style={{width:"fix-content"}}>
                    <div className='w-[20px] h-[20px] shrink-0 relative '>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative   mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      Upload Your Own Model
                    </span>
                    <div className='show_on_hover '>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>Upload Your Own Model
                        If you have an agreement and the rights to create images using the likeness of a particular person you may use them in your product photos by creating a custom model. You will need to upload a few images of them along with some body preferences.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative '>
                    <div className='w-[20px] h-[20px] shrink-0 relative'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative   mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      HD Photos
                    </span>
                  </div>
                </div>
                <button className='flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative  pointer'>
                  <div className='flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative '>
                    <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap ">
                      Start 14-Day Free Trial
                    </span>
                    <div className='w-[5px] h-[9px] shrink-0 relative z-[134]'>
                      <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/358a3f83-38bb-40e4-80a3-e635bc2b6bae.png)] bg-[length:100%_100%] bg-no-repeat relative  mt-[0.5px] mr-0 mb-0 ml-0' />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        }
        {activeTab === 2 &&
          <div className='biling_container flex  h-[550px] gap-px items-end flex-nowrap rounded-[16px]   mx-auto my-0'>
            <div className='flex biling_item pt-[32px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#fff] border-solid border border-[#e5e7eb] relative shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]'>
              <div className='flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[1]'>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[2]'>
                  <div className='flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[3]'>
                    <span className="h-[30px] flex  justify-between	 self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#6b7280] relative text-left whitespace-nowrap z-[4]">
                      Basic
                      <button className="flex w-[132px] h-[25px] pt-[2px] pr-[12px] pb-[2px] pl-[12px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#e1effe] rounded-[6px] border-none  z-[128] pointer"><div className="w-[16px] h-[16px] shrink-0 relative z-[129]"><div className="w-[13.333px] h-[13.333px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/clock.png?v=1714641444)] bg-[length:100%_100%] bg-no-repeat relative z-[130] mt-[1.333px] mr-0 mb-0 ml-[1.333px]"></div></div><span className="flex w-[88px] h-[21px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[21px] text-[#1e429f] relative text-center whitespace-nowrap z-[131]">Early Bird Offer</span></button>
                    </span>
                  </div>
                  <div className='flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative z-[5]'>
                    <div className="flex w-[189px] shrink-0 font-['SF_Pro_Display'] gap-2 text-[48px] font-black leading-[48px] relative text-left whitespace-nowrap z-[6]">
                      <span className="font-['SF_Pro_Display'] text-[48px] font-thin leading-[48px] text-[#111928] relative text-left line-through	">
                        $59
                      </span>
                      <span className="font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#111928] relative text-left">

                        $29
                      </span>
                    </div>
                    <span className="flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#6b7280] relative text-center z-[7]">
                      /month
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[8]'>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[9]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-10'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[11]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[12]">
                      50 Products
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative' style={{ width: "max-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[14]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[15]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="flex items-center ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[16]">
                      1000 Try-On Experiences
                    </span>
                    <div className='show_on_hover'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>A Try-On Experience is defined as every time a shopper initiates a request for and receives a picture to try-on a particular piece of apparel. A shopper may therefore use several try-on experiences in a single session.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[17]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[18]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[19]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-20">
                      50 Product Photos
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative '>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[22]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[23]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="flex items-center ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[24]">
                      Access to 5 Pro Models
                    </span>
                    <div className='show_on_hover'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>Pro Models are AI fashion models that have been specially crafted by WearNow to achieve the highest range of versatility when it comes to product photos. They can work effectively with any outfit, pose, and background.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[25]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[26]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[27]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[28]">
                      Support Team
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[29]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-30'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle2.png?v=1714636264)] bg-[length:100%_100%] bg-no-repeat relative z-[31]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[32]">
                      Upload Your Own Model
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[33]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[34]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle2.png?v=1714636264)] bg-[length:100%_100%] bg-no-repeat relative z-[35]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[36]">
                      HD Photos
                    </span>
                  </div>
                </div>
                <button className='flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative  pointer'>
                  <div className='flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative '>
                    <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap z-[39]">
                      Start 14-Day Free Trial
                    </span>
                    <div className='w-[5px] h-[9px] shrink-0 relative z-40'>
                      <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/c402bc4e-53e4-4ba2-9e9e-904feb56d0bf.png)] bg-[length:100%_100%] bg-no-repeat relative z-[41] mt-[0.5px] mr-0 mb-0 ml-0' />
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className='flex biling_item pt-[35px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#023353] relative shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] z-[42]'>
              <div className='flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[43]'>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[44]'>
                  <div className='flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[45]'>
                    <span className="h-[30px] flex justify-between	 self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#b1d6ed] relative text-left whitespace-nowrap z-[46]">
                      Pro
                      <button className='flex w-[102px] h-[25px] pt-[2px] pr-[12px] pb-[2px] pl-[12px] justify-center items-center shrink-0 flex-nowrap bg-[#e1effe] rounded-[6px] border-none  z-[126] pointer'>
                        <span className="flex w-[78px] h-[21px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[21px] text-[#1e429f] relative text-center whitespace-nowrap z-[127]">
                          Most Popular
                        </span>
                      </button>
                    </span>

                  </div>
                  <div className='flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative '>
                    <span className="h-[48px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#f6f6f7] relative text-left whitespace-nowrap ">
                      $299
                    </span>
                    <span className="flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#fff] relative text-center">
                      /month
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-50'>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[51]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[52]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[53]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[54]">
                      250 Products
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[56]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[57]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="flex items-center ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[58]">
                      5000 Try-On Experiences
                    </span>
                    <div className='show_on_hover'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>A Try-On Experience is defined as every time a shopper initiates a request for and receives a picture to try-on a particular piece of apparel. A shopper may therefore use several try-on experiences in a single session.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[59]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[60]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[61]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[62]">
                      300 Product Photos
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative '>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[64]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[65]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="flex items-center ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap">
                      Access to 20 Pro Models
                    </span>
                    <div className='show_on_hover'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>Pro Models are AI fashion models that have been specially crafted by WearNow to achieve the highest range of versatility when it comes to product photos. They can work effectively with any outfit, pose, and background.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[67]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[68]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[69]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap ">
                      Dedicated Support Channel
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative 'style={{width:"fix-content"}}>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[72]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[73]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="flex items-center ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap ">
                      Upload Your Own Model
                    </span>
                    <div className='show_on_hover'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>Upload Your Own Model
                        If you have an agreement and the rights to create images using the likeness of a particular person you may use them in your product photos by creating a custom model. You will need to upload a few images of them along with some body preferences.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative z-[75]'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[76]'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative   mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap ">
                      HD Photos
                    </span>
                  </div>
                </div>
                <button className='flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative  pointer'>
                  <div className='flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative '>
                    <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap ">
                      Start 14-Day Free Trial
                    </span>
                    <div className='w-[5px] h-[9px] shrink-0 relative z-[82]'>
                      <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/dde63d30-74e2-4fb9-9c5b-c585109fd194.png)] bg-[length:100%_100%] bg-no-repeat relative z-[83] mt-[0.5px] mr-0 mb-0 ml-0' />
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className='flex biling_item pt-[32px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#fff] rounded-tl-none rounded-tr-[8px] rounded-br-[8px] rounded-bl-none border-solid border border-[#e5e7eb] relative shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] z-[84]'>
              <div className='flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[85]'>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[86]'>
                  <div className='flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[87]'>
                    <span className="h-[30px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#6b7280] relative text-left whitespace-nowrap z-[88]">
                      Unlimited
                    </span>
                  </div>
                  <div className='flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative z-[89]'>
                    <span className="h-[48px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#111928] relative text-left whitespace-nowrap z-[90]">
                      $899
                    </span>
                    <span className="flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#6b7280] relative text-center z-[91]">
                      /month
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[92]'>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative '>
                    <div className='w-[20px] h-[20px] shrink-0 relative '>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[95]  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[96]">
                      Unlimited Products
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative 'style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative   mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="flex items-center ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap">
                      Unlimited Try-On Experiences
                    </span>
                    <div className='show_on_hover'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>A Try-On Experience is defined as every time a shopper initiates a request for and receives a picture to try-on a particular piece of apparel. A shopper may therefore use several try-on experiences in a single session.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative'>
                    <div className='w-[20px] h-[20px] shrink-0 relative '>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative   mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap">
                      Unlimited Product Photos
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative 'style={{ width: "fit-content" }}>
                    <div className='w-[20px] h-[20px] shrink-0 relative '>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative   mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="flex items-center ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      Access to 50 Pro Models
                    </span>
                    <div className='show_on_hover'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>Pro Models are AI fashion models that have been specially crafted by WearNow to achieve the highest range of versatility when it comes to product photos. They can work effectively with any outfit, pose, and background.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative '>
                    <div className='w-[20px] h-[20px] shrink-0 relative'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative   mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      24/7 Live Support
                    </span>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative 'style={{width:"fix-content"}}>
                    <div className='w-[20px] h-[20px] shrink-0 relative '>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative   mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 flex items-center h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      Upload Your Own Model
                    </span>
                    <div className='show_on_hover'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className=''>

                        <g clip-path="url(#clip0_685_16081)">
                          <path d="M6.06001 6.00004C6.21675 5.55449 6.52611 5.17878 6.93331 4.93946C7.34052 4.70015 7.81927 4.61267 8.28479 4.69252C8.75032 4.77236 9.17255 5.01439 9.47673 5.37573C9.7809 5.73706 9.94738 6.19439 9.94668 6.66671C9.94668 8.00004 7.94668 8.66671 7.94668 8.66671M8.00001 11.3334H8.00668M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_685_16081">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className='hover_effect_content'>Upload Your Own Model
                        If you have an agreement and the rights to create images using the likeness of a particular person you may use them in your product photos by creating a custom model. You will need to upload a few images of them along with some body preferences.</p>
                    </div>
                  </div>
                  <div className='flex pt-[2px] pr-0 pb-[2px] pl-0 items-center self-stretch shrink-0 flex-nowrap relative '>
                    <div className='w-[20px] h-[20px] shrink-0 relative'>
                      <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative  mr-0 mb-0 ml-[2.5px]' />
                    </div>
                    <span className="ml-1 h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap ">
                      HD Photos
                    </span>
                  </div>
                </div>
                <button className='flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative  pointer'>
                  <div className='flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative '>
                    <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap ">
                      Start 14-Day Free Trial
                    </span>
                    <div className='w-[5px] h-[9px] shrink-0 relative z-[124]'>
                      <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/475b0998-a2ce-4a31-a45c-a776580c8f4c.png)] bg-[length:100%_100%] bg-no-repeat relative z-[125] mt-[0.5px] mr-0 mb-0 ml-0' />
                    </div>
                  </div>
                </button>
              </div>
            </div>

          </div>
        }
      </div>

    </>
  );
};

export default Billing;
