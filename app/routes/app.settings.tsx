import * as React from 'react';

type ImageProps = {
  src: string;
  alt: string;
  className: string;
  loading: 'lazy' | 'eager';
};

const Image: React.FC<ImageProps> = ({ src, alt, className, loading }) => <img loading={loading} src={src} alt={alt} className={className} />;

type SwitchProps = {
  enabled: boolean;
};

const Switch: React.FC<SwitchProps> = ({ enabled }) => (
  <div className={`flex flex-col justify-center p-0.5 rounded-full ${enabled ? 'bg-sky-600' : 'bg-gray-100'}`}>
    <div className={`shrink-0 h-4 w-4 rounded-full shadow ${enabled ? 'bg-white' : 'bg-gray-200'}`} />
  </div>
);



const Settings = () => {

  const noticeStatues = [false, false, false]

  const [noticeOne, setNoticeOne] = React.useState(noticeStatues[0])
  const [noticeTwo, setNoticeTwo] = React.useState(noticeStatues[1])
  const [noticeThree, setNoticeThree] = React.useState(noticeStatues[2])

  const onJumpTo = () => {
    console.log('jumpto')
  }

  const [progress1, setProgress1] = React.useState(300)
  const [progressMax1, setProgressMax1] = React.useState(3000)
  const [progress2, setProgress2] = React.useState(40)
  const [progressMax2, setProgressMax2] = React.useState(50)

  const getWidth1 = (progress: number, progressMax: number) => {
    const str = (progress / progressMax) > 1 ? 100 : (progress / progressMax) * 100
    return str
  }

  const [procent1, setProcent1] = React.useState(getWidth1(progress1, progressMax1))
  const [procent2, setProcent2] = React.useState(getWidth1(progress2, progressMax2))



  type Offset = {
    offset: number | string | undefined;
  };
  
  const StopComponent: React.FC<Offset> = ({ offset }) => {
    let stepColor = "#EBEBEB"
    const numericOffset = typeof offset === 'string' ? parseFloat(offset) : offset as number;
    console.log(numericOffset)
    if (numericOffset == undefined || numericOffset <= 70) {
      // 
    }else if (numericOffset > 70){
      stepColor = "#E8A21A"
    }else{
      stepColor = "#B54708"
    }

    return <stop offset={`${offset}%`} stopColor={stepColor} />;
  }

  return (
    <div className="flex flex-col bg-white">
      <div className="w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <main className="flex flex-col ml-5 w-full] max-md:ml-0 max-md:w-full">
            <section className="flex flex-col max-md:max-w-full">
              <div className="flex flex-col px-8 mt-3.5 max-md:px-5 max-md:max-w-full">
                <div className="flex gap-2.5  items-center p-5 font-medium   bg-white rounded-lg border border-gray-300 border-solid max-md:flex-wrap">
                  <div className="flex flex-col self-stretch ">
                    <div className="text-lg leading-7 text-gray-800">Basic Plan</div>
                    <div className="mt-2.5 text-xs text-ellipsis text-slate-600">Quota resets on 24/05/2014</div>
                  </div>

                  <div className="shrink-0 mx-4 w-px h-full bg-gray-200 max-md:max-h-full" />
                  <div className="flex gap-5 self-stretch my-auto text-xs text-gray-800 max-md:flex-wrap">
                    <div className="product_page_row_content w-full">
                      <div className="flex w-full justify-between items-start flex-nowrap relative mx-auto my-0 mb-2">
                        <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap">
                          Virtual Try-On Experiences Used
                        </span>
                        <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap z-[1]">
                          {progress1}/{progressMax1}
                        </span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="4" viewBox="0 0 100% 4" fill="none">
                        <rect width="100%" height="4" rx="2" fill="url(#paint0_linear_686_58186)" />
                        <defs>
                          <linearGradient id="paint0_linear_686_58186" x1="0" y1="2" x2="800" y2="2" gradientUnits="userSpaceOnUse">
                            <stop offset="0.08" stopColor="#047AC6" />
                            <StopComponent offset={procent1} />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="product_page_row_content w-full">
                      <div className="flex w-full justify-between items-start flex-nowrap relative mx-auto my-0 mb-2">
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
                          <linearGradient id="paint0_linear_686_58191" x1="0" y1="2" x2="800" y2="2" gradientUnits="userSpaceOnUse">
                            <stop offset="0.76" stopColor="#047AC6" />
                            <StopComponent offset={procent2} />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>


                  <div className="shrink-0 mx-4 w-px h-full bg-gray-200 max-md:max-h-full" />

                  <div onClick={onJumpTo} className="cursor-pointer flex shrink-0 flex-col justify-center self-stretch my-auto h-[40px] text-sm text-white rounded-3xl border border-sky-600 border-solid">
                    <div className="flex gap-2 px-3 py-2 bg-sky-600 border-2 border-sky-600 border-solid rounded-[999px]">
                      <div >Upgrade plan</div>
                      <Image
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e564bf47f6cb9588adc21090a566c5a50c9ee499f92246d13504a8c42fd38e91?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
                        alt="Upgrade Plan Icon"
                        className="shrink-0 self-start w-4 aspect-square"
                      />
                    </div>
                  </div>
                </div>



                <div className="flex flex-col p-5 mt-6 rounded-lg border border-gray-300 border-solid max-md:max-w-full">
                  <div className="text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">Email Notifications</div>
                  <div className="mt-1 text-sm text-ellipsis text-slate-600 max-md:max-w-full">Select when you’ll be notified when the following changes occur.</div>
                  <div className="shrink-0 mt-5 h-px bg-gray-200 max-md:max-w-full" />
                  <div className="flex gap-4 mt-4 max-md:flex-wrap max-md:max-w-full">
                    <div className="flex-1 text-sm font-medium text-slate-700 max-md:max-w-full">Product photo creations are complete</div>
                    <div className="flex">
                      <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={noticeOne} readOnly />
                        <div onClick={() => { setNoticeOne(!noticeOne); }}
                          className="inline-flex justify-around items-center w-9 h-5  bg-gray-200  rounded-full    shadow-sm peer   peer-checked:after:translate-x-full  after:content-['']   after:absolute     after:left-[2px] after:bg-white    after:rounded-full   after:h-4  after:w-4   after:transition-all peer-checked:bg-sky-600 mt-[2px]"                >
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="shrink-0 mt-4 h-px bg-gray-200 max-md:max-w-full" />
                  <div className="flex gap-4 mt-4 max-md:flex-wrap max-md:max-w-full">
                    <div className="flex-1 text-sm font-medium text-slate-700 max-md:max-w-full">Try-on experiences quota used</div>
                    <div className="flex">
                      <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={noticeTwo} readOnly />
                        <div onClick={() => { setNoticeTwo(!noticeTwo); }}
                          className="inline-flex justify-around items-center w-9 h-5  bg-gray-200  rounded-full    shadow-sm peer   peer-checked:after:translate-x-full  after:content-['']   after:absolute     after:left-[2px] after:bg-white    after:rounded-full   after:h-4  after:w-4   after:transition-all peer-checked:bg-sky-600 mt-[2px]"                >
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="shrink-0 mt-4 h-px bg-gray-200 max-md:max-w-full" />
                  <div className="flex gap-4 mt-4 max-md:flex-wrap max-md:max-w-full">
                    <div className="flex-1 text-sm font-medium text-slate-700 max-md:max-w-full">Renewal due</div>
                    <div className="flex">
                      <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={noticeThree} readOnly />
                        <div onClick={() => { setNoticeThree(!noticeThree); }}
                          className="inline-flex justify-around items-center w-9 h-5  bg-gray-200  rounded-full    shadow-sm peer   peer-checked:after:translate-x-full  after:content-['']   after:absolute     after:left-[2px] after:bg-white    after:rounded-full   after:h-4  after:w-4   after:transition-all peer-checked:bg-sky-600 mt-[2px]"                >
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )

};

export default Settings;
