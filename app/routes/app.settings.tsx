import { Link } from "@remix-run/react";
import React from "react";
import DashboardHeader from "~/components/DashboardHeader";

interface MenuItemProps {
  iconSrc: string;
  text: string;
  notificationCount?: number;
}

const plan = [
  {
    name: "Basic plan",
    price: "$49/month",
    description:
      "Includes up to 50 SKUs, 1000 try-on experiences, and 50 product photos.",
    img: "https://cdn.builder.io/api/v1/image/assets/TEMP/65a8b0649369b4c45b8b18dd92a3af3eb356f610a8387362824809af65bb930b?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&",
  },
  {
    name: "Business plan",
    price: "$499/month",
    description:
      "Includes up to 250 SKUs, 5000 try-on experiences, 300 product photos.",
    img: "https://cdn.builder.io/api/v1/image/assets/TEMP/65a8b0649369b4c45b8b18dd92a3af3eb356f610a8387362824809af65bb930b?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&",
  },
  {
    name: "Unlimited plan",
    price: "$1499/month",
    description:
      "Unlimited SKUs, unlimited try-on experiences, and unlimited product photos.",
    img: "https://cdn.builder.io/api/v1/image/assets/TEMP/65a8b0649369b4c45b8b18dd92a3af3eb356f610a8387362824809af65bb930b?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&",
  },
];

function Settings() {
  const [currentPlan, setPlan] = React.useState(0);

  const noticeStatues = [false, false, false, true, false];
  const [noticeOne, setNoticeOne] = React.useState(noticeStatues[0]);
  const [noticeTwo, setNoticeTwo] = React.useState(noticeStatues[1]);
  const [noticeThree, setNoticeThree] = React.useState(noticeStatues[2]);
  const [noticeFour, setNoticeFour] = React.useState(noticeStatues[3]);
  const [noticeFive, setNoticeFive] = React.useState(noticeStatues[4]);

  const getPlanSetting = (idx: number) => {
    if (idx != currentPlan) {
      return null;
    }
    return (
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/882aab939cbf3dac9292567a7d3f7c60d1c352b22f866b915f1b0f15641e5a12?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
        alt=""
        className="shrink-0 self-start w-4 aspect-square"
      />
    );
  };

  return (
    <div className="flex flex-col bg-white">
      <DashboardHeader></DashboardHeader>

      <div className="w-full max-md:max-w-full mt-14">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <main className="flex flex-col mx-5 w-full max-md:ml-0 max-md:w-full">
            <section className="flex flex-col px-10 max-md:max-w-full">
              <section className="flex flex-col mt-3.5 max-w-screen-xl max-md:mr-2.5 max-md:max-w-full">
                <h1 className="mb-3 text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">
                  Account plans
                </h1>
                {/* <p className="mt-1 text-sm text-ellipsis text-slate-600 max-md:max-w-full">Pick an account plan that fits your store needs.</p> */}
                {/* <hr className="shrink-0 mt-5 h-px bg-gray-200 rounded-none max-md:max-w-full" /> */}
                <div className="w-[120px]">
                  <Link to="/app/plan">
                    <div className="flex w-[119px] h-[36px] pt-[5px] pr-[10px] pb-[5px] pl-[10px] gap-[8px] justify-center items-center flex-nowrap bg-[#fcedb9] rounded-[37px] relative my-0">
                      <span className="h-[16px] shrink-0 basis-auto font-['SF_Pro_Text'] font-medium leading-[16px] text-[#a82c00] relative text-left whitespace-nowrap">
                        Upgrade
                      </span>
                      <div className="w-[12px] h-[10.95px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/arrowRight.png?v=1714747074)] bg-[length:100%_100%] bg-no-repeat relative z-[2]" />
                    </div>
                  </Link>
                </div>
              </section>

              <h2 className="mt-4 text-lg font-semibold leading-7 text-gray-900 max-md:mr-2.5 max-md:max-w-full">
                Notifications
              </h2>
              <p className="mt-1 text-sm text-ellipsis text-slate-600 max-md:mr-2.5 max-md:max-w-full">
                Select when you’ll be notified when the following changes occur.
              </p>
              <hr className="shrink-0 mt-5 max-w-full h-px bg-gray-200 rounded-none w-[1208px] max-md:mr-2.5" />

              <section className="mt-6 max-md:mr-2.5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <aside className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
                    <p className="self-stretch text-sm font-semibold leading-4 text-slate-700 max-md:mt-8">
                      General notifications
                    </p>
                  </aside>
                  <section className="flex flex-col ml-5 w-[76%] max-md:ml-0 max-md:w-full">
                    <article className="flex flex-col grow pb-4 text-sm max-md:mt-8 max-md:max-w-full">
                      <div className="flex gap-4 max-md:flex-wrap">
                        <div className="flex-1 my-auto font-medium text-slate-700 max-md:max-w-full">
                          Product photo creations are complete
                        </div>
                        <div className="flex">
                          <label className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={noticeOne}
                              readOnly
                            />
                            <div
                              onClick={() => {
                                setNoticeOne(!noticeOne);
                              }}
                              className="inline-flex justify-around items-center w-[136px] h-[40px]  bg-white  rounded-lg  border  border-gray-300   border-solid  shadow-sm peer peer-focus:border-gray-300  peer-checked:after:translate-x-full  after:content-['']   after:absolute  after:top-0.5   after:left-[2px] after:bg-gray-100  after:border-gray-300   after:border   after:rounded-lg   after:h-10   after:w-[68px]   after:transition-all peer-checked:bg-white ml-[2px] mt-[2px]"
                            >
                              <span className="z-[1] text-slate-700 font-semibold whitespace-nowrap">
                                None{" "}
                              </span>{" "}
                              <span className="z-[1] text-gray-800 font-semibold whitespace-nowrap">
                                Email
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                      <hr className="shrink-0 mt-4 h-px bg-gray-200 max-md:max-w-full" />
                      <div className="flex gap-4 mt-4 text-slate-700 max-md:flex-wrap">
                        <div className="flex-1 my-auto font-medium max-md:max-w-full">
                          25% of try-on experiences are used
                        </div>
                        <div className="flex">
                          <label className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={noticeTwo}
                              readOnly
                            />
                            <div
                              onClick={() => {
                                setNoticeTwo(!noticeTwo);
                              }}
                              className="inline-flex justify-around items-center w-[136px] h-[40px]  bg-white  rounded-lg  border  border-gray-300   border-solid  shadow-sm peer peer-focus:border-gray-300  peer-checked:after:translate-x-full  after:content-['']   after:absolute  after:top-0.5   after:left-[2px] after:bg-gray-100  after:border-gray-300   after:border   after:rounded-lg   after:h-10   after:w-[68px]   after:transition-all peer-checked:bg-white ml-[2px] mt-[2px]"
                            >
                              <span className="z-[1] text-slate-700 font-semibold whitespace-nowrap">
                                None{" "}
                              </span>{" "}
                              <span className="z-[1] text-gray-800 font-semibold whitespace-nowrap">
                                Email
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                      <hr className="shrink-0 mt-4 h-px bg-gray-200 max-md:max-w-full" />
                      <div className="flex gap-4 mt-4 text-slate-700 max-md:flex-wrap">
                        <div className="flex-1 my-auto font-medium max-md:max-w-full">
                          50% of try-on experiences are used
                        </div>
                        <div className="flex">
                          <label className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={noticeThree}
                              readOnly
                            />
                            <div
                              onClick={() => {
                                setNoticeThree(!noticeThree);
                              }}
                              className="inline-flex justify-around items-center w-[136px] h-[40px]  bg-white  rounded-lg  border  border-gray-300   border-solid  shadow-sm peer peer-focus:border-gray-300  peer-checked:after:translate-x-full  after:content-['']   after:absolute  after:top-0.5   after:left-[2px] after:bg-gray-100  after:border-gray-300   after:border   after:rounded-lg   after:h-10   after:w-[68px]   after:transition-all peer-checked:bg-white ml-[2px] mt-[2px]"
                            >
                              <span className="z-[1] text-slate-700 font-semibold whitespace-nowrap">
                                None{" "}
                              </span>{" "}
                              <span className="z-[1] text-gray-800 font-semibold whitespace-nowrap">
                                Email
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                      <hr className="shrink-0 mt-4 h-px bg-gray-200 max-md:max-w-full" />
                      <div className="flex gap-4 mt-4 text-slate-700 max-md:flex-wrap">
                        <div className="flex-1 my-auto font-medium max-md:max-w-full">
                          75% of try-on experiences are used
                        </div>
                        <div className="flex">
                          <label className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={noticeFour}
                              readOnly
                            />
                            <div
                              onClick={() => {
                                setNoticeFour(!noticeFour);
                              }}
                              className="inline-flex justify-around items-center w-[136px] h-[40px]  bg-white  rounded-lg  border  border-gray-300   border-solid  shadow-sm peer peer-focus:border-gray-300  peer-checked:after:translate-x-full  after:content-['']   after:absolute  after:top-0.5   after:left-[2px] after:bg-gray-100  after:border-gray-300   after:border   after:rounded-lg   after:h-10   after:w-[68px]   after:transition-all peer-checked:bg-white ml-[2px] mt-[2px]"
                            >
                              <span className="z-[1] text-slate-700 font-semibold whitespace-nowrap">
                                None{" "}
                              </span>{" "}
                              <span className="z-[1] text-gray-800 font-semibold whitespace-nowrap">
                                Email
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                      <hr className="shrink-0 mt-4 h-px bg-gray-200 max-md:max-w-full" />
                      <div className="flex gap-4 mt-4 max-md:flex-wrap">
                        <div className="flex-1 my-auto font-medium text-slate-700 max-md:max-w-full">
                          100% of try-on experiences are used
                        </div>
                        <div className="flex">
                          <label className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={noticeFive}
                              readOnly
                            />
                            <div
                              onClick={() => {
                                setNoticeFive(!noticeFive);
                              }}
                              className="inline-flex justify-around items-center w-[136px] h-[40px]  bg-white  rounded-lg  border  border-gray-300   border-solid  shadow-sm peer peer-focus:border-gray-300  peer-checked:after:translate-x-full  after:content-['']   after:absolute  after:top-0.5   after:left-[2px] after:bg-gray-100  after:border-gray-300   after:border   after:rounded-lg   after:h-10   after:w-[68px]   after:transition-all peer-checked:bg-white ml-[2px] mt-[2px]"
                            >
                              <span className="z-[1] text-slate-700 font-semibold whitespace-nowrap">
                                None{" "}
                              </span>{" "}
                              <span className="z-[1] text-gray-800 font-semibold whitespace-nowrap">
                                Email
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </article>
                  </section>
                </div>
              </section>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Settings;
