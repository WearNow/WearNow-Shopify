import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import SliderPopup from './SliderPopup';
import {
  Icon
} from "@shopify/polaris";
import {
  XSmallIcon
} from '@shopify/polaris-icons';
interface DashboardModalProps {}

const DashboardModal: React.FC<DashboardModalProps> = () => {
  const [open, setOpen] = useState<boolean>(true);

  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const slides = [
    <div className="slide-content" key="1">
      <img src="https://cdn.shopify.com/s/files/1/0875/7621/5865/files/Slide-1.png?v=1718002947"/>
    </div>,
    <div className="slide-content" key="2">
      <img src="https://cdn.shopify.com/s/files/1/0875/7621/5865/files/Slide-2.png?v=1718002947"/>
    </div>,
    <div className="slide-content" key="3">
      <img src="https://cdn.shopify.com/s/files/1/0875/7621/5865/files/Slide-1.png?v=1718002947"/>
    </div>,
    <div className="slide-content" key="4">
    <img src="https://cdn.shopify.com/s/files/1/0875/7621/5865/files/Slide-2.png?v=1718002947"/>
    </div>
  ];
  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start flex justify-between items-start">  
                    <div className="roundend_circle_overlay flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 56 56" fill="none">
                        <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEF0C7"/>
                        <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FFFAEB" stroke-width="8"/>
                        <path d="M28.9 37H27.1C26.6226 37 26.1648 36.8104 25.8272 36.4728C25.4896 36.1352 25.3 35.6774 25.3 35.2V35.1199L24.8743 34.9399L24.8176 34.9966C24.48 35.334 24.0223 35.5236 23.545 35.5236C23.0677 35.5236 22.6099 35.334 22.2724 34.9966L20.9998 33.7276C20.6624 33.39 20.4728 32.9323 20.4728 32.455C20.4728 31.9777 20.6624 31.5199 20.9998 31.1824L21.0565 31.1257L20.8801 30.7H20.8C20.3226 30.7 19.8648 30.5104 19.5272 30.1728C19.1896 29.8352 19 29.3774 19 28.9V27.1C19 26.6226 19.1896 26.1648 19.5272 25.8272C19.8648 25.4896 20.3226 25.3 20.8 25.3H20.8801L21.0601 24.8743L21.0034 24.8176C20.666 24.48 20.4764 24.0223 20.4764 23.545C20.4764 23.0677 20.666 22.6099 21.0034 22.2724L22.2724 20.9998C22.6099 20.6624 23.0677 20.4728 23.545 20.4728C24.0223 20.4728 24.48 20.6624 24.8176 20.9998L24.8752 21.0574L25.3 20.8801V20.8C25.3 20.3226 25.4896 19.8648 25.8272 19.5272C26.1648 19.1896 26.6226 19 27.1 19H28.9C29.3774 19 29.8352 19.1896 30.1728 19.5272C30.5104 19.8648 30.7 20.3226 30.7 20.8V20.8801L31.1248 21.0601L31.1824 21.0034C31.5199 20.6662 31.9775 20.4768 32.4545 20.4768C32.9316 20.4768 33.3892 20.6662 33.7267 21.0034L35.0002 22.2769C35.3376 22.6144 35.5272 23.0722 35.5272 23.5495C35.5272 24.0268 35.3376 24.4845 35.0002 24.8221L34.9426 24.8797L35.1226 25.3045H35.2C35.6774 25.3045 36.1352 25.4941 36.4728 25.8317C36.8104 26.1693 37 26.6271 37 27.1045V28.9045C37 29.3819 36.8104 29.8397 36.4728 30.1773C36.1352 30.5149 35.6774 30.7045 35.2 30.7045H35.1199L34.9399 31.1293L34.9966 31.1869C35.3338 31.5244 35.5232 31.982 35.5232 32.4591C35.5232 32.9361 35.3338 33.3937 34.9966 33.7312L33.7231 35.0047C33.3855 35.3421 32.9278 35.5317 32.4505 35.5317C31.9732 35.5317 31.5154 35.3421 31.1779 35.0047L31.1212 34.948L30.6955 35.128V35.2C30.6955 35.6766 30.5065 36.1338 30.1699 36.4712C29.8333 36.8086 29.3766 36.9988 28.9 37ZM24.6637 32.9824C24.7817 32.9824 24.8985 33.0057 25.0075 33.0508L26.5438 33.6871C26.7084 33.7551 26.8491 33.8705 26.9481 34.0185C27.0471 34.1665 27.1 34.3406 27.1 34.5187V35.2H28.9V34.5187C28.9 34.3406 28.9529 34.1665 29.0519 34.0185C29.1509 33.8705 29.2916 33.7551 29.4562 33.6871L30.9925 33.0508C31.1568 32.9827 31.3376 32.9649 31.512 32.9995C31.6864 33.0341 31.8467 33.1196 31.9726 33.2452L32.4541 33.7267L33.7276 32.455L33.2461 31.9726C33.1203 31.8468 33.0347 31.6866 32.9999 31.5121C32.9652 31.3377 32.9829 31.1569 33.0508 30.9925L33.6871 29.4562C33.7551 29.2916 33.8705 29.1509 34.0185 29.0519C34.1665 28.9529 34.3406 28.9 34.5187 28.9H35.2V27.1H34.5187C34.3406 27.1 34.1665 27.0471 34.0185 26.9481C33.8705 26.8491 33.7551 26.7084 33.6871 26.5438L33.0508 25.0075C32.9829 24.8431 32.9652 24.6623 32.9999 24.4879C33.0347 24.3134 33.1203 24.1532 33.2461 24.0274L33.7276 23.545L32.455 22.2724L31.9726 22.7539C31.8468 22.8797 31.6866 22.9653 31.5121 23.0001C31.3377 23.0348 31.1569 23.0171 30.9925 22.9492L29.4562 22.3129C29.2916 22.2449 29.1509 22.1295 29.0519 21.9815C28.9529 21.8335 28.9 21.6594 28.9 21.4813V20.8H27.1V21.4813C27.1 21.6594 27.0471 21.8335 26.9481 21.9815C26.8491 22.1295 26.7084 22.2449 26.5438 22.3129L25.0075 22.9492C24.8431 23.0171 24.6623 23.0348 24.4879 23.0001C24.3134 22.9653 24.1532 22.8797 24.0274 22.7539L23.545 22.2724L22.2724 23.545L22.7548 24.0274C22.8804 24.1533 22.9659 24.3136 23.0005 24.488C23.0351 24.6624 23.0173 24.8432 22.9492 25.0075L22.3129 26.5438C22.2449 26.7084 22.1295 26.8491 21.9815 26.9481C21.8335 27.0471 21.6594 27.1 21.4813 27.1H20.8V28.9H21.4813C21.6594 28.9 21.8335 28.9529 21.9815 29.0519C22.1295 29.1509 22.2449 29.2916 22.3129 29.4562L22.9492 30.9925C23.0173 31.1568 23.0351 31.3376 23.0005 31.512C22.9659 31.6864 22.8804 31.8467 22.7548 31.9726L22.2733 32.4541L23.545 33.7276L24.0274 33.2452C24.1963 33.0767 24.4252 32.9822 24.6637 32.9824Z" fill="#D86803"/>
                        <path d="M28 31.6C27.288 31.6 26.592 31.3889 25.9999 30.9933C25.4079 30.5977 24.9465 30.0355 24.674 29.3777C24.4016 28.7198 24.3303 27.996 24.4692 27.2977C24.6081 26.5993 24.9509 25.9579 25.4544 25.4544C25.9579 24.9509 26.5993 24.6081 27.2977 24.4692C27.996 24.3303 28.7198 24.4016 29.3777 24.674C30.0355 24.9465 30.5977 25.4079 30.9933 25.9999C31.3889 26.592 31.6 27.288 31.6 28C31.6 28.9548 31.2207 29.8705 30.5456 30.5456C29.8705 31.2207 28.9548 31.6 28 31.6ZM28 26.2C27.644 26.2 27.296 26.3056 27 26.5034C26.704 26.7011 26.4733 26.9823 26.337 27.3112C26.2008 27.6401 26.1651 28.002 26.2346 28.3512C26.304 28.7003 26.4755 29.0211 26.7272 29.2728C26.9789 29.5245 27.2997 29.696 27.6488 29.7654C27.998 29.8349 28.3599 29.7992 28.6888 29.663C29.0177 29.5267 29.2989 29.296 29.4966 29C29.6944 28.704 29.8 28.356 29.8 28C29.8 27.5226 29.6104 27.0648 29.2728 26.7272C28.9352 26.3896 28.4774 26.2 28 26.2Z" fill="#D86803"/>
                        </svg>
                    </div>
                    <div className="mt-3 text-left sm:ml-4 sm:mt-0 sm:text-left relative z[1]">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 relative flex justify-between items-center	" >
                      Add WearNow to your theme
                        <button
                        type="button"
                        className="close_btn inline-flex  justify-center  px-3 py-2 text-sm font-semibold text-gray-900ring-gray-300"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                        >
                            <Icon
                            source={XSmallIcon}
                            tone="base"
                            />
                        </button>
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          To get started, enable the WearNow script and button on your Shopify theme. 
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
               <SliderPopup slides={slides} />
                <div className="bg-gray-50 w-full justify-between px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                 <div className='btn_enabled sm:flex sm:flex-row-reverse'>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                   Continue
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                  </div>  
               <div className='model_dont_show_content flex justify-center items-center	gap-2 ml-[60px]'>
                <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                    <input type="checkbox" />
                    <label htmlFor="checkbox"></label>
                </div>
                 <h2 className='dont_show'>Don’t show again</h2>
               </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DashboardModal;
