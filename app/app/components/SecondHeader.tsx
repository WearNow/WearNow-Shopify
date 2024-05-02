import React from "react";
import CustomSlider from "./CustomSilder";
const SecondHeader: React.FC = () => {
  const images: string[] = [
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img1.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106",
  ];
  return (
    <div className="self-stretch second_header">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className='flex w-[768px] flex-col gap-[32px] items-start shrink-0 flex-nowrap relative'>
          <div className='flex w-[768px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[1]'>
            <span className="h-[45px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[36px] font-medium leading-[45px] text-[#1d2127] relative text-left whitespace-nowrap z-[2]">
              Create Your First Product Photo
            </span>
            <span className="flex w-[434px] h-[24px] justify-start items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#52575d] relative text-left whitespace-nowrap z-[3]">
              Take your product photos to the next level in just 4 easy steps!
            </span>
          </div>
          <div className='flex h-[481px] flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[4]' style={{ display: "none" }}>
            <div className='flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[5]'>
              <div className='flex w-[578px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[6]'>
                <div className='flex w-[188px] flex-col items-center shrink-0 flex-nowrap relative z-[7]'>
                  <div className='flex w-[188px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[8]'>
                    <button className='flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#000] relative overflow-hidden z-[9] pointer'>
                      <span className="flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#141718] relative text-center whitespace-nowrap z-10">
                        01
                      </span>
                    </button>
                    <span className="h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0,0.2)] relative text-left whitespace-nowrap z-[11]">
                      Select 1 Product
                    </span>
                  </div>
                  <div className='flex pt-0 pr-0 pb-0 pl-[17px] gap-[30px] items-end self-stretch shrink-0 flex-nowrap relative z-[12]'>
                    <div className='w-px h-[208px] shrink-0 bg-[url(../assets/images/940341d9-4145-4fcd-94b0-d43729d98b4d.png)] bg-cover bg-no-repeat relative z-[13]' />
                  </div>
                </div>
              </div>
              <div className='flex w-[530px] h-[196px] flex-col items-start shrink-0 flex-nowrap rounded-[12px] absolute top-[56px] left-[48px] overflow-hidden z-[14]'>
                <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[15]'>
                  <div className='flex w-[34px] flex-col items-start shrink-0 flex-nowrap relative z-[16]'>
                    <div className='flex w-[34px] pt-[18px] pr-[6px] pb-[18px] pl-[12px] items-center shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[24]'>
                      <div className='flex w-[16px] flex-col justify-center items-start shrink-0 flex-nowrap relative z-[25]'>
                        <div className='flex w-[16px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[26]'>
                          <div className='flex w-[16px] gap-[8px] items-start shrink-0 flex-nowrap rounded-[4px] relative z-[32]'>
                            <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                              <input type="checkbox" />
                              <label htmlFor="checkbox"></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex w-[34px] pt-[18px] pr-[6px] pb-[18px] pl-[12px] items-center shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[24]'>
                      <div className='flex w-[16px] flex-col justify-center items-start shrink-0 flex-nowrap relative z-[25]'>
                        <div className='flex w-[16px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[26]'>
                          <div className='flex w-[16px] gap-[8px] items-start shrink-0 flex-nowrap rounded-[4px] relative z-[32]'>
                            <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                              <input type="checkbox" />
                              <label htmlFor="checkbox"></label>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className='flex w-[34px] pt-[18px] pr-[6px] pb-[18px] pl-[12px] items-center shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[29]'>
                      <div className='flex w-[16px] flex-col justify-center items-start shrink-0 flex-nowrap relative z-30'>
                        <div className='flex w-[16px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[31]'>
                          <div className='flex w-[16px] gap-[8px] items-start shrink-0 flex-nowrap rounded-[4px] relative z-[32]'>
                            <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                              <input type="checkbox" />
                              <label htmlFor="checkbox"></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex w-[52px] flex-col items-start shrink-0 flex-nowrap relative z-[34]'>
                    <div className='flex w-[52px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[35]'>
                      <div className='flex w-[40px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[36]'>
                        <div className='w-[40px] h-[40px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image_2.png?v=1714052434)] bg-cover bg-no-repeat relative z-[37]' />
                      </div>
                    </div>
                    <div className='flex w-[52px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[38]'>
                      <div className='flex w-[40px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[39]'>
                        <div className='w-[40px] h-[40px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image_1.png?v=1714052433)] bg-cover bg-no-repeat relative z-40' />
                      </div>
                    </div>
                    <div className='flex w-[52px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[41]'>
                      <div className='flex w-[40px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[42]'>
                        <div className='w-[40px] h-[40px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image.png?v=1714052433)] bg-cover bg-no-repeat relative z-[43]' />
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[44]'>
                    <div className='flex pt-[16px] pr-[8px] pb-[16px] pl-[8px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[45]'>
                      <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[46]">
                        Black Top
                      </span>
                    </div>
                    <div className='flex pt-[16px] pr-[8px] pb-[16px] pl-[8px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[47]'>
                      <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[48]">
                        White Dress
                      </span>
                    </div>
                    <div className='flex pt-[16px] pr-[8px] pb-[16px] pl-[8px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[49]'>
                      <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-50">
                        Red Top
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex pt-[6px] pr-[8px] pb-[6px] pl-[12px] items-center self-stretch shrink-0 flex-nowrap bg-[#f7f7f7] relative z-[51]'>
                  <div className='flex justify-end items-center grow shrink-0 basis-0 flex-nowrap relative z-[52]'>
                    <div className='flex w-[28px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-start shrink-0 flex-nowrap rounded-tl-[8px] rounded-tr-none rounded-br-none rounded-bl-[8px] relative z-[53]'>
                      <div className='w-[20px] h-[20px] shrink-0 relative z-[54]'>
                        <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronLeft.png?v=1714384767)] bg-cover bg-no-repeat relative z-[55]  mr-0 mb-0 ml-[6.5px]' />
                      </div>
                    </div>
                    <div className='flex w-[28px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-start shrink-0 flex-nowrap rounded-tl-none rounded-tr-[8px] rounded-br-[8px] rounded-bl-none relative z-[56]'>
                      <div className='w-[20px] h-[20px] shrink-0 relative z-[57]'>
                        <div className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronRight.png?v=1714384785)] bg-cover bg-no-repeat relative z-[58]  mr-0 mb-0 ml-[7.5px]' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex w-[530px] h-[88px] flex-col gap-[6px] items-start shrink-0 flex-nowrap absolute top-[265px] left-[48px] z-[59]'>
                <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[60]'>
                  <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#344053] relative text-left whitespace-nowrap z-[61]">
                    Please select the number of photos you would like to create
                  </span>
                  <div className='flex items-start self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#cfd4dc] relative shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] z-[62]'>
                    <div className='flex pt-[8px] pr-0 pb-[8px] pl-[12px] gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[63]'>
                      <div className='flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[64]'>
                        <span className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#667084] relative text-left overflow-hidden whitespace-nowrap z-[65]">
                          4
                        </span>
                      </div>
                    </div>
                    <div className='flex w-[44px] pt-[8px] pr-[12px] pb-[8px] pl-[12px] justify-between items-center shrink-0 flex-nowrap relative overflow-hidden z-[66]'>
                      <div className='w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[67]'>
                        <div className='w-[11.666px] h-[6.667px] bg-[url(../assets/images/e9a1c8ca-24c9-4144-89cc-6bd09930c864.png)] bg-[length:100%_100%] bg-no-repeat relative z-[68] mt-[6.667px] mr-0 mb-0 ml-[4.167px]' />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[17.5px] text-[#475466] relative text-left whitespace-nowrap z-[69]">
                  All the photos in a creation request will have very minor
                  changes between them
                </span>
              </div>
            </div>
            <div className='w-[176px] h-[36px] shrink-0 rounded-[100px] absolute top-[371px] left-0 z-[70]'>
              <div className='flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#e7e7e7] absolute top-0 left-0 overflow-hidden z-[72]'>
                <span className="flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#b7b7b7] relative text-center whitespace-nowrap z-[73]">
                  02
                </span>
              </div>
              <span className="flex h-[24px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-normal leading-[24px] text-[#b7b7b7] tracking-[0.38px] absolute top-[6px] left-[48px] text-left whitespace-nowrap z-[71]">
                Select a model
              </span>
            </div>
            <div className='w-[226px] h-[36px] shrink-0 rounded-[100px] absolute top-[423px] left-0 z-[74]'>
              <div className='flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#e7e7e7] absolute top-0 left-0 overflow-hidden z-[76]'>
                <span className="flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#b7b7b7] relative text-center whitespace-nowrap z-[77]">
                  03
                </span>
              </div>
              <span className="flex h-[24px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-normal leading-[24px] text-[#b7b7b7] tracking-[0.38px] absolute top-[6px] left-[48px] text-left whitespace-nowrap z-[75]">
                Select a background
              </span>
            </div>
            <div className='w-[165px] h-[36px] shrink-0 rounded-[100px] absolute top-[475px] left-0 z-[78]'>
              <div className='flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#e7e7e7] absolute top-0 left-0 overflow-hidden z-[80]'>
                <span className="flex w-[20px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#b7b7b7] relative text-center whitespace-nowrap z-[81]">
                  04
                </span>
              </div>
              <span className="flex h-[24px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-normal leading-[24px] text-[#b7b7b7] tracking-[0.38px] absolute top-[6px] left-[48px] text-left whitespace-nowrap z-[79]">
                Select a pose
              </span>
            </div>
            <div className='flex w-[236px] h-[44px] gap-[20px] items-start shrink-0 flex-nowrap absolute top-[535px] left-0 z-[82]'>
              <button className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer'>
                <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]'>
                  <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[85]">
                    Next
                  </span>
                  <div className='w-[5px] h-[9px] shrink-0 relative z-[86]'>
                    <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/91099684-9e2c-41ac-8500-9a0d3c52b427.png)] bg-[length:100%_100%] bg-no-repeat relative z-[87] mt-[0.5px] mr-0 mb-0 ml-0' />
                  </div>
                </div>
              </button>
              <div className='flex w-[134px] justify-center items-end shrink-0 flex-nowrap relative z-[88]'>
                <div className='flex w-[134px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap rounded-[999px] relative overflow-hidden z-[89]'>
                  <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#4b5059] relative text-left whitespace-nowrap z-[90]">
                    I’ll do this later
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='main-container flex w-[768px] flex-col gap-[32px] items-start flex-nowrap  mx-auto my-0'>

            <div className='flex h-[481px] flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[3]'>
              <div className='flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
                <div className='flex w-[578px] h-[115px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[5]'>
                  <div className='flex w-[210px] flex-col items-center shrink-0 flex-nowrap relative z-[6]'>
                    <div className='flex w-[210px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[7]'>
                      <div className='flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#17a627] relative overflow-hidden z-[8]'>
                        <span className="flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#17a627] relative text-center whitespace-nowrap z-[9]">
                          01
                        </span>
                      </div>
                      <span className="h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left whitespace-nowrap z-10">
                        [Product Name] | 4 Photos
                      </span>
                    </div>
                    <div className='flex h-[80px] pt-0 pr-0 pb-0 pl-[17px] gap-[30px] items-end self-stretch shrink-0 flex-nowrap relative z-[11]'>
                      <div className='w-px h-[80px] shrink-0 bg-[url(../assets/images/628c2518-806f-487d-99ca-dd1dc28cbcce.png)] bg-cover bg-no-repeat relative z-[12]' style={{ background: "black" }} />
                      <div className='flex w-[72px] h-[72px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff] absolute top-0 left-[47px] overflow-hidden z-[13]'>
                        <div className='flex w-[287px] items-start shrink-0 flex-nowrap relative z-[14]'>
                          <div className='flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[15]'>
                            <div className='flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[16]'>
                              <div className='w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[17]' />
                            </div>
                          </div>
                          <div className='flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[18]'>
                            <div className='flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[19]'>
                              <div className='w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-20' />
                            </div>
                          </div>
                          <div className='flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[21]'>
                            <div className='flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[22]'>
                              <div className='w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[23]' />
                            </div>
                          </div>
                          <div className='flex w-[71px] pt-[16px] pr-[12px] pb-[16px] pl-[6px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[24]'>
                            <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-center whitespace-nowrap z-[25]">
                              +12
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className='flex w-[61px] h-[28px] pt-[4px] pr-[8px] pb-[4px] pl-[6px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none absolute top-[4px] left-[517px] z-30 pointer'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[31]'>
                      <div className='w-[12.945px] h-[12.945px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Icon.png?v=1714574880)] bg-cover bg-no-repeat relative z-[32] mt-[3.555px] mr-0 mb-0 ml-[3.5px]' />
                    </div>
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[33]">
                      Edit
                    </span>
                  </button>
                </div>
              </div>
              <div className='w-full h-[220px] shrink-0 rounded-[100px] relative z-[26]'>
                <div className='flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#232934] absolute top-0 left-0 overflow-hidden z-[28]'>
                  <span className="flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#232934] relative text-center whitespace-nowrap z-[29]">
                    02
                  </span>
                </div>
                <span className="flex h-[30px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[#232934] absolute top-px left-[47px] text-left whitespace-nowrap z-[27]">
                  Select a model
                </span>
                <div className='flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[47px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-[34]'>
                  <div className='self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[35]' />
                  <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[36]'>
                    <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[37]'>
                      <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[38]">
                        Model 1
                      </span>
                    </div>
                    <div className='flex w-[75px] pt-[8px] pr-0 pb-0 pl-0 gap-[8px] items-start shrink-0 flex-nowrap relative z-[39]'>
                      <button className='flex w-[75px] h-[28px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none relative z-40 pointer'>
                        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[41]">
                          Small Size
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className='flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[233px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-[42]'>
                  <div className='self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[43]' />
                  <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[44]'>
                    <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[45]'>
                      <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[46]">
                        Model 1
                      </span>
                    </div>
                    <div className='flex w-[75px] pt-[8px] pr-0 pb-0 pl-0 gap-[8px] items-start shrink-0 flex-nowrap relative z-[47]'>
                      <button className='flex w-[75px] h-[28px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none relative z-[48] pointer'>
                        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[49]">
                          Small Size
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className='flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[419px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-50'>
                  <div className='self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[51]' />
                  <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[52]'>
                    <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[53]'>
                      <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[54]">
                        Model 1
                      </span>
                    </div>
                    <div className='flex w-[75px] pt-[8px] pr-0 pb-0 pl-0 gap-[8px] items-start shrink-0 flex-nowrap relative z-[55]'>
                      <button className='flex w-[75px] h-[28px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none relative z-[56] pointer'>
                        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[57]">
                          Small Size
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
                <div className='flex w-[578px] h-[115px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[5]'>
                  <div className='flex w-[210px] flex-col items-center shrink-0 flex-nowrap relative z-[6]'>
                    <div className='flex w-[210px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[7]'>
                      <div className='flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#17a627] relative overflow-hidden z-[8]'>
                        <span className="flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#17a627] relative text-center whitespace-nowrap z-[9]">
                          02
                        </span>
                      </div>
                      <span className="h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left whitespace-nowrap z-10">
                        Model Selected
                      </span>
                    </div>
                    <div className='flex h-[80px] pt-0 pr-0 pb-0 pl-[17px] gap-[30px] items-end self-stretch shrink-0 flex-nowrap relative z-[11]'>
                      <div className='w-px h-[80px] shrink-0 bg-[url(../assets/images/628c2518-806f-487d-99ca-dd1dc28cbcce.png)] bg-cover bg-no-repeat relative z-[12]' style={{ background: "black" }} />
                      <div className='flex w-[72px] h-[72px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff] absolute top-0 left-[47px] overflow-hidden z-[13]'>
                        <div className='flex w-[287px] items-start shrink-0 flex-nowrap relative z-[14]'>
                          <div className='flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[15]'>
                            <div className='flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[16]'>
                              <div className='w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1.png?v=1714646417)] bg-cover bg-no-repeat relative z-[17]' />
                            </div>
                          </div>
                          <div className='flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[18]'>
                            <div className='flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[19]'>
                              <div className='w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-20' />
                            </div>
                          </div>
                          <div className='flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[21]'>
                            <div className='flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[22]'>
                              <div className='w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[23]' />
                            </div>
                          </div>
                          <div className='flex w-[71px] pt-[16px] pr-[12px] pb-[16px] pl-[6px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[24]'>
                            <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-center whitespace-nowrap z-[25]">
                              +12
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className='flex w-[61px] h-[28px] pt-[4px] pr-[8px] pb-[4px] pl-[6px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none absolute top-[4px] left-[517px] z-30 pointer'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[31]'>
                      <div className='w-[12.945px] h-[12.945px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Icon.png?v=1714574880)] bg-cover bg-no-repeat relative z-[32] mt-[3.555px] mr-0 mb-0 ml-[3.5px]' />
                    </div>
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[33]">
                      Edit
                    </span>
                  </button>
                </div>
              </div>

              <div className='w-[226px] h-[36px] shrink-0 rounded-[100px] relative top-[0] left-0 z-[58]'>
                <div className='flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#e7e7e7] absolute top-0 left-0 overflow-hidden z-[60]'>
                  <span className="flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#b7b7b7] relative text-center whitespace-nowrap z-[61]">
                    03
                  </span>
                </div>
                <span className="flex h-[24px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-normal leading-[24px] text-[#b7b7b7] tracking-[0.38px] absolute top-[6px] left-[48px] text-left whitespace-nowrap z-[59]">
                  Select a background
                </span>
              </div>

              <div className='w-full h-[220px] shrink-0 rounded-[100px] relative z-[26]'>
                <div className='flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#232934] absolute top-0 left-0 overflow-hidden z-[28]'>
                  <span className="flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#232934] relative text-center whitespace-nowrap z-[29]">
                    03
                  </span>
                </div>
                <span className="flex h-[30px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[#232934] absolute top-px left-[47px] text-left whitespace-nowrap z-[27]">
                  Select a model
                </span>
                <div className='flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[47px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-[34]'>
                  <div className='self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_2.png?v=1714646888)] bg-cover bg-no-repeat relative z-[35]' />
                  <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[36]'>
                    <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[37]'>
                      <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[38]">
                        background 1
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[233px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-[42]'>
                  <div className='self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_1.png?v=1714646888)] bg-cover bg-no-repeat relative z-[43]' />
                  <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[44]'>
                    <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[45]'>
                      <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[46]">
                        background 2
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[419px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-50'>
                  <div className='self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_3.png?v=1714646887)] bg-cover bg-no-repeat relative z-[51]' />
                  <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[52]'>
                    <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[53]'>
                      <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[54]">
                        background 3
                      </span>
                    </div>
                  </div>
                </div>
                <div className='w-px h-[190px] shrink-0 bg-[url(../assets/images/6ccf0c05-ce59-4646-8ad4-ad42025c274a.png)] bg-cover bg-no-repeat absolute top-[35px] left-[17px] z-[66]' style={{ background: "black" }} />
              </div>
              <div className='flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
                <div className='flex w-[578px] h-[115px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[5]'>
                  <div className='flex w-[210px] flex-col items-center shrink-0 flex-nowrap relative z-[6]'>
                    <div className='flex w-[210px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[7]'>
                      <div className='flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#17a627] relative overflow-hidden z-[8]'>
                        <span className="flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#17a627] relative text-center whitespace-nowrap z-[9]">
                          03
                        </span>
                      </div>
                      <span className="h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left whitespace-nowrap z-10">
                        Background Selected
                      </span>
                    </div>
                    <div className='flex h-[80px] pt-0 pr-0 pb-0 pl-[17px] gap-[30px] items-end self-stretch shrink-0 flex-nowrap relative z-[11]'>
                      <div className='w-px h-[80px] shrink-0 bg-[url(../assets/images/628c2518-806f-487d-99ca-dd1dc28cbcce.png)] bg-cover bg-no-repeat relative z-[12]' style={{ background: "black" }} />
                      <div className='flex w-[72px] h-[72px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff] absolute top-0 left-[47px] overflow-hidden z-[13]'>
                        <div className='flex w-[287px] items-start shrink-0 flex-nowrap relative z-[14]'>
                          <div className='flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[15]'>
                            <div className='flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[16]'>
                              <div className='w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_2.png?v=1714646888)] bg-cover bg-no-repeat relative z-[17]' />
                            </div>
                          </div>
                          <div className='flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[18]'>
                            <div className='flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[19]'>
                              <div className='w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-20' />
                            </div>
                          </div>
                          <div className='flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[21]'>
                            <div className='flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[22]'>
                              <div className='w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[23]' />
                            </div>
                          </div>
                          <div className='flex w-[71px] pt-[16px] pr-[12px] pb-[16px] pl-[6px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[24]'>
                            <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-center whitespace-nowrap z-[25]">
                              +12
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className='flex w-[61px] h-[28px] pt-[4px] pr-[8px] pb-[4px] pl-[6px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none absolute top-[4px] left-[517px] z-30 pointer'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[31]'>
                      <div className='w-[12.945px] h-[12.945px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Icon.png?v=1714574880)] bg-cover bg-no-repeat relative z-[32] mt-[3.555px] mr-0 mb-0 ml-[3.5px]' />
                    </div>
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[33]">
                      Edit
                    </span>
                  </button>
                </div>
              </div>
              <div className='w-[165px] h-[36px] shrink-0 rounded-[100px] relative top-[0] left-0 z-[62]'>
                <div className='flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#e7e7e7] absolute top-0 left-0 overflow-hidden z-[64]'>
                  <span className="flex w-[20px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#b7b7b7] relative text-center whitespace-nowrap z-[65]">
                    04
                  </span>
                </div>
                <span className="flex h-[24px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-normal leading-[24px] text-[#b7b7b7] tracking-[0.38px] absolute top-[6px] left-[48px] text-left whitespace-nowrap z-[63]">
                  Select a pose
                </span>
              </div>

              <div className='w-full h-[220px] shrink-0 rounded-[100px] relative z-[26]'>
                <div className='flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#232934] absolute top-0 left-0 overflow-hidden z-[28]'>
                  <span className="flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#232934] relative text-center whitespace-nowrap z-[29]">
                    04
                  </span>
                </div>
                <span className="flex h-[30px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[#232934] absolute top-px left-[47px] text-left whitespace-nowrap z-[27]">
                  Select a pose
                </span>
                <div className='flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[47px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-[34]'>
                  <div className='self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_4.png?v=1714648274)] bg-cover bg-no-repeat relative z-[35]' />
                  <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[36]'>
                    <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[37]'>
                      <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[38]">
                        pose 1
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[233px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-[42]'>
                  <div className='self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_5.png?v=1714648274)] bg-cover bg-no-repeat relative z-[43]' />
                  <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[44]'>
                    <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[45]'>
                      <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[46]">
                        pose 2
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[419px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-50'>
                  <div className='self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_6.png?v=1714648273)] bg-cover bg-no-repeat relative z-[51]' />
                  <div className='flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[52]'>
                    <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[53]'>
                      <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[54]">
                        pose 3
                      </span>
                    </div>
                  </div>
                </div>
                <div className='w-px h-[190px] shrink-0 bg-[url(../assets/images/6ccf0c05-ce59-4646-8ad4-ad42025c274a.png)] bg-cover bg-no-repeat absolute top-[35px] left-[17px] z-[66]' style={{ background: "black" }} />
              </div>
              <div className='flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
                <div className='flex w-[578px] h-[115px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[5]'>
                  <div className='flex w-[210px] flex-col items-center shrink-0 flex-nowrap relative z-[6]'>
                    <div className='flex w-[210px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[7]'>
                      <div className='flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#17a627] relative overflow-hidden z-[8]'>
                        <span className="flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#17a627] relative text-center whitespace-nowrap z-[9]">
                          04
                        </span>
                      </div>
                      <span className="h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left whitespace-nowrap z-10">
                        Pose Selected
                      </span>
                    </div>
                    <div className='flex h-[80px] pt-0 pr-0 pb-0 pl-[17px] gap-[30px] items-end self-stretch shrink-0 flex-nowrap relative z-[11]'>
                      <div className='w-px h-[80px] shrink-0 bg-[url(../assets/images/628c2518-806f-487d-99ca-dd1dc28cbcce.png)] bg-cover bg-no-repeat relative z-[12]' style={{ background: "black" }} />
                      <div className='flex w-[72px] h-[72px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff] absolute top-0 left-[47px] overflow-hidden z-[13]'>
                        <div className='flex w-[287px] items-start shrink-0 flex-nowrap relative z-[14]'>
                          <div className='flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[15]'>
                            <div className='flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[16]'>
                              <div className='w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_2.png?v=1714646888)] bg-cover bg-no-repeat relative z-[17]' />
                            </div>
                          </div>
                          <div className='flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[18]'>
                            <div className='flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[19]'>
                              <div className='w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-20' />
                            </div>
                          </div>
                          <div className='flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[21]'>
                            <div className='flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[22]'>
                              <div className='w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[23]' />
                            </div>
                          </div>
                          <div className='flex w-[71px] pt-[16px] pr-[12px] pb-[16px] pl-[6px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[24]'>
                            <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-center whitespace-nowrap z-[25]">
                              +12
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className='flex w-[61px] h-[28px] pt-[4px] pr-[8px] pb-[4px] pl-[6px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none absolute top-[4px] left-[517px] z-30 pointer'>
                    <div className='w-[20px] h-[20px] shrink-0 relative z-[31]'>
                      <div className='w-[12.945px] h-[12.945px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Icon.png?v=1714574880)] bg-cover bg-no-repeat relative z-[32] mt-[3.555px] mr-0 mb-0 ml-[3.5px]' />
                    </div>
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[33]">
                      Edit
                    </span>
                  </button>
                </div>
              </div>
              <div className='main-container flex w-full h-[102px] pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[12px] items-center flex-nowrap bg-[#e8f6e9] rounded-[8px] relative top-0 left-0 mx-auto my-0'>
                <div className='flex flex-col gap-[12px] items-start grow shrink-0 basis-0 flex-nowrap relative'>
                  <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                    <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[2]'>
                      <div className='w-[18px] h-[18px] shrink-0 relative overflow-hidden z-[3]'>
                        <div className='w-[18px] h-[18px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/exclamation_2.png?v=1714648832)] bg-[length:100%_100%] bg-no-repeat relative z-[4]  mr-0 mb-0 ml-[1.5px]' />
                      </div>
                      <span className="h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Rounded'] text-[16px] font-normal leading-[24px] text-[#046c4e] relative text-left whitespace-nowrap z-[5]">
                        Your photo is being created! This usually takes 5-10 mins the
                        first time.
                      </span>
                    </div>
                  </div>
                  <button className='flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap rounded-[24px] border-none relative z-[6] pointer'>
                    <div className='flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] justify-between items-center grow shrink-0 basis-0 flex-nowrap bg-[#10741b] rounded-[999px] relative overflow-hidden z-[7]'>
                      <span className="h-[18px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap z-[8]">
                        Explore our Dashboard
                      </span>
                      <div className='w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[9]'>
                        <div className='w-[16px] h-[16px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/angle-right_1.png?v=1714648832)] bg-[length:100%_100%] bg-no-repeat relative z-10  mr-0 mb-0 ml-[5.334px]' />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div className='w-px h-[197px] shrink-0 bg-[url(../assets/images/6ccf0c05-ce59-4646-8ad4-ad42025c274a.png)] bg-cover bg-no-repeat absolute top-[186px] left-[17px] z-[66]' style={{ background: "black" }} />

              <div className='flex w-[236px] h-[44px] gap-[20px] items-start shrink-0 flex-nowrap relative top-[0] left-0 z-[82]'>
                <button className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer'>
                  <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]'>
                    <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[85]">
                      Next
                    </span>
                    <div className='w-[5px] h-[9px] shrink-0 relative z-[86]'>
                      <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/91099684-9e2c-41ac-8500-9a0d3c52b427.png)] bg-[length:100%_100%] bg-no-repeat relative z-[87] mt-[0.5px] mr-0 mb-0 ml-0' />
                    </div>
                  </div>
                </button>
                <div className='flex w-[134px] justify-center items-end shrink-0 flex-nowrap relative z-[88]'>
                  <div className='flex w-[134px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap rounded-[999px] relative overflow-hidden z-[89]'>
                    <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#4b5059] relative text-left whitespace-nowrap z-[90]">
                      I’ll do this later
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <CustomSlider images={images} />
        </div>
      </div>
    </div >
  );
};

export default SecondHeader;
