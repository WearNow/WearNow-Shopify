import React from 'react'

function SelectedOnbording(props:any) {
    const { step, data, image, handleEdit } = props;
  return (
    <div className='flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
    <div className='flex w-[578px] h-[115px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[5]'>
      <div className='flex w-full flex-col items-center shrink-0 flex-nowrap relative z-[6]'>
        <div className='flex w-full gap-[12px] items-center shrink-0 flex-nowrap relative z-[7]'>
          <div className='flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#17a627] relative overflow-hidden z-[8]'>
            <span className="flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#17a627] relative text-center whitespace-nowrap z-[9]">
              {step}
            </span>
          </div>
        <div className="first_selected w-full flex justify-between	items-center">
          <span className="h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left whitespace-nowrap z-10">
           {data}
          </span>
          <button className='flex w-[61px] h-[28px] pt-[4px] pr-[8px] pb-[4px] pl-[6px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none  top-[4px] left-[517px] z-30 pointer'>
          <div className='w-[20px] h-[20px] shrink-0 relative z-[31]'>
          <div className='w-[12.945px] h-[12.945px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Icon.png?v=1714574880)] bg-cover bg-no-repeat relative z-[32] mt-[3.555px] mr-0 mb-0 ml-[3.5px]' />
          </div>
          <span onClick={()=>handleEdit(step)} className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[33]">
          Edit
          </span>
          </button>
          </div>
        </div>
        <div className='flex h-[80px] pt-0 pr-0 pb-0 pl-[17px] gap-[30px] items-end self-stretch shrink-0 flex-nowrap relative z-[11]'>
          <div className='w-px h-[80px] shrink-0 bg-[url(../assets/images/628c2518-806f-487d-99ca-dd1dc28cbcce.png)] bg-cover bg-no-repeat relative z-[12]' style={{ background: "black" }} />
          <div className='flex w-[72px] h-[72px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff]  top-0 left-[47px] overflow-hidden z-[13]'>
            <div className='flex w-[287px] items-start shrink-0 flex-nowrap relative z-[14]'>
              <div className='flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[15]'>
                <div className='flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[16]'>
                  <div className='w-[60px] h-[60px] shrink-0  relative z-[17]' >
                   <img src={image} alt="" />
                  </div>
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
    </div>
  </div>
  )
}

export default SelectedOnbording
