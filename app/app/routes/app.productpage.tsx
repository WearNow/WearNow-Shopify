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
import Dashboard from "~/components/Dashboard";
import DashboardHeader from "~/components/DashboardHeader";
import DashboardModal from "~/components/DashboardModel";

export default function ProductPage() {
  return (
    <>
      <DashboardHeader />
      <DashboardModal/>
      <div className="product_page_container">
        <div className="product_page_row">
          <div className="product_page_row_content w-full">
            <div className='flex w-full justify-between items-start flex-nowrap relative mx-auto my-0 mb-2'>
              <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap">
                Virtual Try-On Experiences Used
              </span>
              <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap z-[1]">
                300/3000
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="4" viewBox="0 0 100% 4" fill="none">
              <rect width="100%" height="4" rx="2" fill="url(#paint0_linear_686_58186)" />
              <defs>
                <linearGradient id="paint0_linear_686_58186" x1="0" y1="2" x2="600" y2="2" gradientUnits="userSpaceOnUse">
                  <stop offset="0.08" stop-color="#047AC6" />
                  <stop offset="0.3" stop-color="#EBEBEB" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="product_page_row_content w-full">
            <div className='flex w-full justify-between items-start flex-nowrap relative mx-auto my-0 mb-2'>
              <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap">
                Product Photos Created
              </span>
              <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap z-[1]">
                40/50
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="4" viewBox="0 0 100% 4" fill="none">
              <rect width="100%" height="4" rx="2" fill="url(#paint0_linear_686_58191)" />
              <defs>
                <linearGradient id="paint0_linear_686_58191" x1="0" y1="2" x2="600" y2="2" gradientUnits="userSpaceOnUse">
                  <stop offset="0.76" stop-color="#047AC6" />
                  <stop offset="1" stop-color="#EBEBEB" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <section className="container px-4 mx-auto mt-10" style={{maxWidth:"100%"}}>
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg" style={{borderColor:"rgb(208 209 211)"}}>
                  <table className="product_page_table min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800" style={{background:"rgb(243 243 243)",borderBottom: "1px solid #bebcbf"}}>
                      <tr>
                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-x-3">
                          <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                          <input type="checkbox" />
                          <label htmlFor="checkbox"></label>
                          </div>
                            <button className="flex items-center gap-x-2">
                              <span>Product</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M10.6339 4.36612C10.1457 3.87796 9.35427 3.87796 8.86612 4.36612L6.21967 7.01256C5.92678 7.30546 5.92678 7.78033 6.21967 8.07322C6.51256 8.36612 6.98744 8.36612 7.28033 8.07322L9.75 5.60355L12.2197 8.07322C12.5126 8.36612 12.9874 8.36612 13.2803 8.07322C13.5732 7.78033 13.5732 7.30546 13.2803 7.01256L10.6339 4.36612Z" fill="#CCCCCC"/>
                              <path d="M13.2803 13.0734L10.6339 15.7198C10.1457 16.208 9.35427 16.208 8.86612 15.7198L6.21967 13.0734C5.92678 12.7805 5.92678 12.3056 6.21967 12.0127C6.51256 11.7198 6.98744 11.7198 7.28033 12.0127L9.75 14.4824L12.2197 12.0127C12.5126 11.7198 12.9874 11.7198 13.2803 12.0127C13.5732 12.3056 13.5732 12.7805 13.2803 13.0734Z" fill="#4A4A4A"/>
                              </svg>
                            </button>
                          </div>
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Photo Studio
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Activate Virtual Try-On
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Number of VTO Experiences Allocated
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        VTO Experiences Created
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900" style={{background:"#fffcfc"}}>
                      <tr style={{background:"rgb(243 243 243)",borderTop: "1px solid #bebcbf"}}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                          <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                          <input type="checkbox" />
                          <label htmlFor="checkbox"></label>
                          </div>
                            <div className="flex items-center gap-x-2">
                            <img className="object-cover w-[40px] h-[40px] rounded-lg" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                            <div>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-black ">[Product Name]</h2>
                            </div>
                          </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-[#0c5132] ">
                          <div className='flex w-[107px] h-[20px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center flex-nowrap bg-[#cdfee1] rounded-[8px] relative  my-0'>
                          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#0c5132] relative text-left whitespace-nowrap">
                          Ready to create
                          </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                        <input type="checkbox" />
                        <label htmlFor="checkbox"></label>
                        </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className='main-container flex w-full pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] items-center flex-nowrap bg-[#fdfdfd] rounded-[8px] border-solid border-[0.66px] border-[#8a8a8a] relative mx-auto my-0'>
                          <div className='flex items-start grow shrink-0 basis-0 flex-nowrap relative'>
                          <input type="number" className="w-full h-[20px] shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-left overflow-hidden whitespace-nowrap z-[1] no-arrow no-border" value="200" />
                          </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className='main-container flex w-full pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] items-center flex-nowrap bg-[#fdfdfd] rounded-[8px] border-solid border-[0.66px] border-[#8a8a8a] relative mx-auto my-0'>
                          <div className='flex items-start grow shrink-0 basis-0 flex-nowrap relative'>
                          <input type="number" className="w-full h-[20px] shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-left overflow-hidden whitespace-nowrap z-[1] no-arrow no-border" value="200" />
                          </div>
                          </div>
                        </td>
                      </tr>
                      <tr style={{background:"rgb(243 243 243)",borderTop: "1px solid #bebcbf"}}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                          <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                          <input type="checkbox" />
                          <label htmlFor="checkbox"></label>
                          </div>
                            <div className="flex items-center gap-x-2">
                            <img className="object-cover w-[40px] h-[40px] rounded-lg" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                            <div>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-black ">[Product Name]</h2>
                            </div>
                          </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-[#0c5132] ">
                          <div className='flex w-[107px] h-[20px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center flex-nowrap bg-[#cdfee1] rounded-[8px] relative  my-0'>
                          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#0c5132] relative text-left whitespace-nowrap">
                          Ready to create
                          </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                        <input type="checkbox" />
                        <label htmlFor="checkbox"></label>
                        </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className='main-container flex w-full pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] items-center flex-nowrap bg-[#fdfdfd] rounded-[8px] border-solid border-[0.66px] border-[#8a8a8a] relative mx-auto my-0'>
                          <div className='flex items-start grow shrink-0 basis-0 flex-nowrap relative'>
                          <input type="number" className="w-full h-[20px] shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-left overflow-hidden whitespace-nowrap z-[1] no-arrow no-border" value="200" />
                          </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className='main-container flex w-full pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] items-center flex-nowrap bg-[#fdfdfd] rounded-[8px] border-solid border-[0.66px] border-[#8a8a8a] relative mx-auto my-0'>
                          <div className='flex items-start grow shrink-0 basis-0 flex-nowrap relative'>
                          <input type="number" className="w-full h-[20px] shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-left overflow-hidden whitespace-nowrap z-[1] no-arrow no-border" value="200" />
                          </div>
                          </div>
                        </td>
                      </tr>
                      <tr style={{background:"rgb(243 243 243)",borderTop: "1px solid #bebcbf"}}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                          <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                          <input type="checkbox" />
                          <label htmlFor="checkbox"></label>
                          </div>
                            <div className="flex items-center gap-x-2">
                            <img className="object-cover w-[40px] h-[40px] rounded-lg" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                            <div>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-black ">[Product Name]</h2>
                            </div>
                          </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-[#0c5132] ">
                          <div className='flex w-[107px] h-[20px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center flex-nowrap bg-[#cdfee1] rounded-[8px] relative  my-0'>
                          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#0c5132] relative text-left whitespace-nowrap">
                          Ready to create
                          </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                        <input type="checkbox" />
                        <label htmlFor="checkbox"></label>
                        </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className='main-container flex w-full pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] items-center flex-nowrap bg-[#fdfdfd] rounded-[8px] border-solid border-[0.66px] border-[#8a8a8a] relative mx-auto my-0'>
                          <div className='flex items-start grow shrink-0 basis-0 flex-nowrap relative'>
                          <input type="number" className="w-full h-[20px] shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-left overflow-hidden whitespace-nowrap z-[1] no-arrow no-border" value="200" />
                          </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className='main-container flex w-full pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] items-center flex-nowrap bg-[#fdfdfd] rounded-[8px] border-solid border-[0.66px] border-[#8a8a8a] relative mx-auto my-0'>
                          <div className='flex items-start grow shrink-0 basis-0 flex-nowrap relative'>
                          <input type="number" className="w-full h-[20px] shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-left overflow-hidden whitespace-nowrap z-[1] no-arrow no-border" value="200" />
                          </div>
                          </div>
                        </td>
                      </tr>
                      <tr style={{background:"rgb(243 243 243)",borderTop: "1px solid #bebcbf"}}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                          <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                          <input type="checkbox" />
                          <label htmlFor="checkbox"></label>
                          </div>
                            <div className="flex items-center gap-x-2">
                            <img className="object-cover w-[40px] h-[40px] rounded-lg" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                            <div>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-black ">[Product Name]</h2>
                            </div>
                          </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-[#0c5132] ">
                          <div className='flex w-[107px] h-[20px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center flex-nowrap bg-[#cdfee1] rounded-[8px] relative  my-0'>
                          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#0c5132] relative text-left whitespace-nowrap">
                          Ready to create
                          </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                        <input type="checkbox" />
                        <label htmlFor="checkbox"></label>
                        </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className='main-container flex w-full pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] items-center flex-nowrap bg-[#fdfdfd] rounded-[8px] border-solid border-[0.66px] border-[#8a8a8a] relative mx-auto my-0'>
                          <div className='flex items-start grow shrink-0 basis-0 flex-nowrap relative'>
                          <input type="number" className="w-full h-[20px] shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-left overflow-hidden whitespace-nowrap z-[1] no-arrow no-border" value="200" />
                          </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className='main-container flex w-full pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] items-center flex-nowrap bg-[#fdfdfd] rounded-[8px] border-solid border-[0.66px] border-[#8a8a8a] relative mx-auto my-0'>
                          <div className='flex items-start grow shrink-0 basis-0 flex-nowrap relative'>
                          <input type="number" className="w-full h-[20px] shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-left overflow-hidden whitespace-nowrap z-[1] no-arrow no-border" value="200" />
                          </div>
                          </div>
                        </td>
                      </tr>
                      <tr style={{background:"rgb(243 243 243)",borderTop: "1px solid #bebcbf"}}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                          <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                          <input type="checkbox" />
                          <label htmlFor="checkbox"></label>
                          </div>
                            <div className="flex items-center gap-x-2">
                            <img className="object-cover w-[40px] h-[40px] rounded-lg" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                            <div>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-black ">[Product Name]</h2>
                            </div>
                          </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-[#0c5132] ">
                          <div className='flex w-[107px] h-[20px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center flex-nowrap bg-[#cdfee1] rounded-[8px] relative  my-0'>
                          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#0c5132] relative text-left whitespace-nowrap">
                          Ready to create
                          </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                        <input type="checkbox" />
                        <label htmlFor="checkbox"></label>
                        </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className='main-container flex w-full pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] items-center flex-nowrap bg-[#fdfdfd] rounded-[8px] border-solid border-[0.66px] border-[#8a8a8a] relative mx-auto my-0'>
                          <div className='flex items-start grow shrink-0 basis-0 flex-nowrap relative'>
                          <input type="number" className="w-full h-[20px] shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-left overflow-hidden whitespace-nowrap z-[1] no-arrow no-border" value="200" />
                          </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className='main-container flex w-full pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] items-center flex-nowrap bg-[#fdfdfd] rounded-[8px] border-solid border-[0.66px] border-[#8a8a8a] relative mx-auto my-0'>
                          <div className='flex items-start grow shrink-0 basis-0 flex-nowrap relative'>
                          <input type="number" className="w-full h-[20px] shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-left overflow-hidden whitespace-nowrap z-[1] no-arrow no-border" value="200" />
                          </div>
                          </div>
                        </td>
                      </tr>
                      <tr style={{background:"rgb(243 243 243)",borderTop: "1px solid #bebcbf"}}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                          <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                          <input type="checkbox" />
                          <label htmlFor="checkbox"></label>
                          </div>
                            <div className="flex items-center gap-x-2">
                            <img className="object-cover w-[40px] h-[40px] rounded-lg" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                            <div>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-black ">[Product Name]</h2>
                            </div>
                          </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-[#0c5132] ">
                          <div className='flex w-[107px] h-[20px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center flex-nowrap bg-[#cdfee1] rounded-[8px] relative  my-0'>
                          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#0c5132] relative text-left whitespace-nowrap">
                          Ready to create
                          </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                        <input type="checkbox" />
                        <label htmlFor="checkbox"></label>
                        </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className='main-container flex w-full pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] items-center flex-nowrap bg-[#fdfdfd] rounded-[8px] border-solid border-[0.66px] border-[#8a8a8a] relative mx-auto my-0'>
                          <div className='flex items-start grow shrink-0 basis-0 flex-nowrap relative'>
                          <input type="number" className="w-full h-[20px] shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-left overflow-hidden whitespace-nowrap z-[1] no-arrow no-border" value="200" />
                          </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className='main-container flex w-full pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] items-center flex-nowrap bg-[#fdfdfd] rounded-[8px] border-solid border-[0.66px] border-[#8a8a8a] relative mx-auto my-0'>
                          <div className='flex items-start grow shrink-0 basis-0 flex-nowrap relative'>
                          <input type="number" className="w-full h-[20px] shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-left overflow-hidden whitespace-nowrap z-[1] no-arrow no-border" value="200" />
                          </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end	 mt-6" style={{background:"#F7F7F7"}}>
          <div className="footer_table flex items-center justify-between pr-4" style={{width:"fit-content"}}>
            <a href="#" className="flex items-center px-2 py-2 text-sm text-gray-700 capitalize transition-colors duration-200   gap-x-2  dark:text-gray-200 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7803 19.0303C16.0732 18.7374 16.0732 18.2626 15.7803 17.9697L12.3107 14.5L15.7803 11.0303C16.0732 10.7374 16.0732 10.2626 15.7803 9.96967C15.4874 9.67678 15.0126 9.67678 14.7197 9.96967L10.7197 13.9697C10.4268 14.2626 10.4268 14.7374 10.7197 15.0303L14.7197 19.0303C15.0126 19.3232 15.4874 19.3232 15.7803 19.0303Z" fill="#4A4A4A"/>
            </svg>
            </a>
            <a href="#" className="flex items-center px-2 py-2 text-sm text-gray-700 capitalize transition-colors duration-200   gap-x-2  dark:text-gray-200 dark">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7197 9.96967C11.4268 10.2626 11.4268 10.7374 11.7197 11.0303L15.1893 14.5L11.7197 17.9697C11.4268 18.2626 11.4268 18.7374 11.7197 19.0303C12.0126 19.3232 12.4874 19.3232 12.7803 19.0303L16.7803 15.0303C17.0732 14.7374 17.0732 14.2626 16.7803 13.9697L12.7803 9.96967C12.4874 9.67678 12.0126 9.67678 11.7197 9.96967Z" fill="#4A4A4A"/>
            </svg>
            </a>
            </div>
          </div>
        </section>
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
