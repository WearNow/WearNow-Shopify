import React from 'react'
import DashboardHeader from '~/components/DashboardHeader';

interface MenuItemProps {
  iconSrc: string;
  text: string;
  notificationCount?: number;
}

const plan = [{
  name: "Basic plan",
  price: "$49/month",
  description: "Includes up to 50 SKUs, 1000 try-on experiences, and 50 product photos.",
  img: "https://cdn.builder.io/api/v1/image/assets/TEMP/65a8b0649369b4c45b8b18dd92a3af3eb356f610a8387362824809af65bb930b?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
}, {
  name: "Business plan",
  price: "$499/month",
  description: "Includes up to 250 SKUs, 5000 try-on experiences, 300 product photos.",
  img: "https://cdn.builder.io/api/v1/image/assets/TEMP/65a8b0649369b4c45b8b18dd92a3af3eb356f610a8387362824809af65bb930b?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
}, {
  name: "Unlimited plan",
  price: "$1499/month",
  description: "Unlimited SKUs, unlimited try-on experiences, and unlimited product photos.",
  img: "https://cdn.builder.io/api/v1/image/assets/TEMP/65a8b0649369b4c45b8b18dd92a3af3eb356f610a8387362824809af65bb930b?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
}]


function Settings() {

  const [currentPlan, setPlan] = React.useState(0)

  const getPlanSetting = (idx: number) => {
    if (idx != currentPlan) {
      return null
    }
    return <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/882aab939cbf3dac9292567a7d3f7c60d1c352b22f866b915f1b0f15641e5a12?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&" alt="" className="shrink-0 self-start w-4 aspect-square" />
  }

  return (
    <div className="flex flex-col bg-white">
      <DashboardHeader></DashboardHeader>

      <div className="w-full max-md:max-w-full mt-14">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">

          <main className="flex flex-col mx-5 w-full max-md:ml-0 max-md:w-full">
            <section className="flex flex-col px-10 max-md:max-w-full">

              <section className="flex flex-col mt-3.5 max-w-screen-xl max-md:px-5 max-md:max-w-full">
                <h1 className="text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">Account plans</h1>
                <p className="mt-1 text-sm text-ellipsis text-slate-600 max-md:max-w-full">Pick an account plan that fits your store needs.</p>
                <hr className="shrink-0 mt-5 h-px bg-gray-200 rounded-none max-md:max-w-full" />

                <section className="flex-wrap content-start mt-6 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <aside className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
                      <p className="self-stretch text-sm font-semibold leading-4 text-slate-700 max-md:mt-8">Current plan</p>
                    </aside>
                    <section className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
                      <section className="flex flex-col grow max-w-screen-sm text-sm max-md:mt-8 max-md:max-w-full">
                        {plan.map((plan, idx) => (
                          <article style={{boxSizing: 'content-box', alignItems: 'stretch'}} key={idx} onClick={() => setPlan(idx)} className={`flex gap-1 p-4 bg-white rounded-xl border-solid max-md:flex-wrap max-md:pr-5 box-border my-1 cursor-pointer ${currentPlan === idx ? 'border-2 border-sky-700' : 'border border-gray-200'}`}>
                            <div className="flex flex-1 gap-4 max-md:flex-wrap">
                              <img loading="lazy" src={plan.img} alt="" className="shrink-0 self-start w-8 border-4 border-sky-100 border-solid mix-blend-multiply aspect-square" />
                              <div className="flex flex-col flex-1 max-md:max-w-full">
                                <div className="flex gap-1 self-start">
                                  <div className="font-medium text-slate-700">{plan.name}</div>
                                  <div className="text-slate-600">{plan.price}</div>
                                </div>
                                <p className="text-slate-600 max-md:max-w-full">{plan.description}</p>
                              </div>
                            </div>
                            {getPlanSetting(idx)}
                          </article>
                        ))}
                      </section>
                    </section>
                  </div>
                </section>
              </section>

              <h2 className="mt-8 text-lg font-semibold leading-7 text-gray-900 max-md:mr-2.5 max-md:max-w-full">Notifications</h2>
              <p className="mt-1 text-sm text-ellipsis text-slate-600 max-md:mr-2.5 max-md:max-w-full">Select when you’ll be notified when the following changes occur.</p>
              <hr className="shrink-0 mt-5 max-w-full h-px bg-gray-200 rounded-none w-[1208px] max-md:mr-2.5" />

              <section className="mt-6 max-md:mr-2.5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <aside className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
                    <p className="self-stretch text-sm font-semibold leading-4 text-slate-700 max-md:mt-8">General notifications</p>
                  </aside>
                  <section className="flex flex-col ml-5 w-[76%] max-md:ml-0 max-md:w-full">
                    <article className="flex flex-col grow pb-4 text-sm max-md:mt-8 max-md:max-w-full">
                      <div className="flex gap-4 max-md:flex-wrap">
                        <div className="flex-1 my-auto font-medium text-slate-700 max-md:max-w-full">Product photo creations are complete</div>
                        <div className="flex gap-0 font-semibold whitespace-nowrap rounded-lg border border-gray-300 border-solid shadow-sm">
                          <div className="justify-center px-4 py-2 bg-white border-r border-gray-300 border-solid text-slate-700 rounded-l-lg">None</div>
                          <div className="justify-center px-4 py-2 text-gray-800 bg-gray-50 border-r border-gray-300 border-solid rounded-r-lg">Email</div>
                        </div>
                      </div>
                      <hr className="shrink-0 mt-4 h-px bg-gray-200 max-md:max-w-full" />
                      <div className="flex gap-4 mt-4 text-slate-700 max-md:flex-wrap">
                        <div className="flex-1 my-auto font-medium max-md:max-w-full">25% of try-on experiences are used</div>
                        <div className="flex gap-0 font-semibold whitespace-nowrap rounded-lg border border-gray-300 border-solid shadow-sm">
                          <div className="justify-center px-4 py-2 bg-white border-r border-gray-300 border-solid rounded-l-lg">None</div>
                          <div className="justify-center px-4 py-2 bg-white border-r border-gray-300 border-solid rounded-r-lg">Email</div>
                        </div>
                      </div>
                      <hr className="shrink-0 mt-4 h-px bg-gray-200 max-md:max-w-full" />
                      <div className="flex gap-4 mt-4 text-slate-700 max-md:flex-wrap">
                        <div className="flex-1 my-auto font-medium max-md:max-w-full">50% of try-on experiences are used</div>
                        <div className="flex gap-0 font-semibold whitespace-nowrap rounded-lg border border-gray-300 border-solid shadow-sm">
                          <div className="justify-center px-4 py-2 bg-white border-r border-gray-300 border-solid rounded-l-lg">None</div>
                          <div className="justify-center px-4 py-2 bg-white border-r border-gray-300 border-solid rounded-r-lg" >Email</div>
                        </div>
                      </div>
                      <hr className="shrink-0 mt-4 h-px bg-gray-200 max-md:max-w-full" />
                      <div className="flex gap-4 mt-4 text-slate-700 max-md:flex-wrap">
                        <div className="flex-1 my-auto font-medium max-md:max-w-full">75% of try-on experiences are used</div>
                        <div className="flex gap-0 font-semibold whitespace-nowrap rounded-lg border border-gray-300 border-solid shadow-sm">
                          <div className="justify-center px-4 py-2 bg-white border-r border-gray-300 border-solid rounded-l-lg">None</div>
                          <div className="justify-center px-4 py-2 bg-white border-r border-gray-300 border-solid rounded-r-lg">Email</div>
                        </div>
                      </div>
                      <hr className="shrink-0 mt-4 h-px bg-gray-200 max-md:max-w-full" />
                      <div className="flex gap-4 mt-4 max-md:flex-wrap">
                        <div className="flex-1 my-auto font-medium text-slate-700 max-md:max-w-full">100% of try-on experiences are used</div>
                        <div className="flex gap-0 font-semibold whitespace-nowrap rounded-lg border border-gray-300 border-solid shadow-sm">
                          <div className="justify-center px-4 py-2 bg-white border-r border-gray-300 border-solid text-slate-700 rounded-l-lg">None</div>
                          <div className="justify-center px-4 py-2 text-gray-800 bg-gray-50 border-r border-gray-300 border-solid rounded-r-lg">Email</div>
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