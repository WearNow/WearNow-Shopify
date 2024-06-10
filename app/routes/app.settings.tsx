import * as React from "react";
import DashboardHeader from "~/components/DashboardHeader";
import {
  fetchNotificationSettings,
  updateNotificationSettings,
} from "~/apis/notification";
import { fetchActivePlan } from "~/apis/plan";
import { Link, useLoaderData } from "@remix-run/react";
import { SessionLoader } from "~/services/SessionLoader";
import { fetchUsage } from "~/apis/usage";
import UsageComponent from "~/components/Usage";

export const loader = SessionLoader;

function formatDateToDMY(dateTimeString: string) {
  // 检查Date对象是否有效
  if (!dateTimeString) {
    // throw new Error('Invalid date time string');
    return "--/--/--";
  }

  // 尝试将输入的字符串转换为Date对象
  const dateTime = new Date(dateTimeString);

  // 检查Date对象是否有效
  if (isNaN(dateTime.getTime())) {
    // throw new Error('Invalid date time string');
    return "--/--/--";
  }

  // 提取日期的日、月、年部分
  const day = String(dateTime.getDate()).padStart(2, "0"); // 日
  const month = String(dateTime.getMonth() + 1).padStart(2, "0"); // JavaScript中月份是从0开始的，因此需要+1
  const year = dateTime.getFullYear(); // 年

  // 返回日/月/年的格式化字符串
  return `${day}/${month}/${year}`;
}

type ImageProps = {
  src: string;
  alt: string;
  className: string;
  loading: "lazy" | "eager";
};

const Image: React.FC<ImageProps> = ({ src, alt, className, loading }) => (
  <img loading={loading} src={src} alt={alt} className={className} />
);

const Settings = () => {
  const [notices, setNotices] = React.useState({
    product_photo_updates: false,
    tryonusage_update: false,
    renewal_due: false,
  });

  const [progress1, setProgress1] = React.useState(0);
  const [progressMax1, setProgressMax1] = React.useState(0);
  const [progress2, setProgress2] = React.useState(0);
  const [progressMax2, setProgressMax2] = React.useState(0);

  const [activePlan, setActivePlan] = React.useState<any>();

  const sessionData = useLoaderData<typeof loader>();
  const store_id = sessionData.authWithShop.store_id;

  React.useEffect(() => {
    console.log(sessionData, "session data");
    console.log(sessionData.authWithShop.store_id, "store_id");

    fetchNotificationSettings(store_id).then((res) => {
      console.log(res, ":::notification settings");
      setNotices(res);
      // setNoticeOne(res.product_photo_updates);
      // setNoticeTwo(res.tryonusage_update);
      // setNoticeThree(res.renewal_due);
    });

    const fetchData = async () => {
      const activePlan = await fetchActivePlan(store_id);
      const usage = await fetchUsage(store_id);
      console.log(activePlan, ":::activePlan");
      console.log(usage, ":::usage");
      // 使用获取到的数据
      setActivePlan(activePlan);
      setProgressMax1(activePlan?.package?.vto_limit);
      setProgressMax2(activePlan?.package?.product_photo_limit);
      setProgress1(usage?.vto_usage_count || 0);
      setProgress2(usage?.product_photos_usage_count || 0);
    };

    fetchData();
  }, []);

  const handleNotices = (field: string) => {
    let newValue = null;
    for (const [key, value] of Object.entries(notices)) {
      if (value !== null && key === field) {
        newValue = !value;
      }
    }

    updateNotificationSettings(store_id, {
      [field]: newValue,
    }).then((res) => {
      console.log(res, ":::notification settings updated");
      if (res === 1) {
        setNotices({
          ...notices,
          [field]: newValue,
        });
      }
    });
  };

  const planName = (activePlan?.package?.name || "--") + " Plan";

  return (
    <div className="flex flex-col bg-white">
      <DashboardHeader></DashboardHeader>
      <div className="w-full max-md:max-w-full mt-14">
        <div className="flex max-md:flex-col max-md:gap-0">
          <main className="flex flex-col ml-5 w-full max-md:ml-0 max-md:w-full">
            <section className="flex flex-col max-md:max-w-full">
              <div className="flex flex-col px-8 mt-3.5 max-md:px-5 max-md:max-w-full">
                <div className="flex w-full gap-2.5 justify-between items-center p-5 font-medium   bg-white rounded-lg border border-gray-300 border-solid 
                  max-lg:flex-wrap 
                ">
                  <div className="flex flex-col ">
                    <div className="text-lg leading-7 text-gray-800">
                      {planName}
                    </div>
                    <div className="flex mt-2.5 text-xs text-slate-600">
                      Quota resets on {formatDateToDMY(activePlan?.reset_date)}
                    </div>
                  </div>

                  <div className="shrink-0 mx-4 w-px h-full bg-gray-200 max-lg:hidden" />
                  <div className="flex gap-5 self-stretch my-auto text-xs text-gray-800 max-lg:flex-wrap max-lg:w-full w-[60%]">
                    <div className="product_page_row_content w-full">
                      <div className="flex w-full justify-between items-start flex-nowrap relative mx-auto my-0 mb-2">
                        <span className="h-[18px]  shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap">
                          Virtual Try-On Experiences Used
                        </span>
                        <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap z-[1]">
                          {progress1}/{progressMax1 || "∞"}
                        </span>
                      </div>
                      <UsageComponent
                        progress={progress1}
                        progressMax={progressMax1}
                      />
                    </div>
                    <div className="product_page_row_content w-full">
                      <div className="flex w-full justify-between items-start flex-nowrap relative mx-auto my-0 mb-2">
                        <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap">
                          Product Photos Created
                        </span>
                        <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap z-[1]">
                          {progress2}/{progressMax2 || "∞"}
                        </span>
                      </div>
                      <UsageComponent
                        progress={progress2}
                        progressMax={progressMax2}
                      />
                    </div>
                  </div>

                  <div className="shrink-0 mx-4 w-px h-full bg-gray-200 max-lg:hidden" />

                  <div className="cursor-pointer flex shrink-0 flex-col justify-center self-stretch my-auto h-[40px] text-sm text-white rounded-3xl ">
                    <Link to="/app/plan" className="flex">
                      <div className="flex gap-2 px-3 py-2 bg-sky-600 border-2 border-sky-600 border-solid rounded-full">
                        <div>Upgrade plan</div>
                        <Image
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e564bf47f6cb9588adc21090a566c5a50c9ee499f92246d13504a8c42fd38e91?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
                          alt="Upgrade Plan Icon"
                          className="flex shrink-0 w-4 aspect-square"
                        />
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col p-5 mt-6 rounded-lg border border-gray-300 border-solid max-md:max-w-full">
                  <div className="text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">
                    Email Notifications
                  </div>
                  <div className="mt-1 text-sm text-ellipsis text-slate-600 max-md:max-w-full">
                    Select when you’ll be notified when the following changes
                    occur.
                  </div>
                  <div className="shrink-0 mt-5 h-px bg-gray-200 max-md:max-w-full" />
                  <div className="flex gap-4 mt-4 max-md:flex-wrap max-md:max-w-full">
                    <div className="flex-1 text-sm font-medium text-slate-700 max-md:max-w-full">
                      Product photo creations are complete
                    </div>
                    <div className="flex">
                      <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notices?.product_photo_updates}
                          readOnly
                        />
                        <div
                          onClick={() => handleNotices("product_photo_updates")}
                          className="inline-flex justify-around items-center w-9 h-5  bg-gray-200  rounded-full    shadow-sm peer   peer-checked:after:translate-x-full  after:content-['']   after:absolute     after:left-[2px] after:bg-white    after:rounded-full   after:h-4  after:w-4   after:transition-all peer-checked:bg-sky-600 mt-[2px]"
                        ></div>
                      </label>
                    </div>
                  </div>
                  <div className="shrink-0 mt-4 h-px bg-gray-200 max-md:max-w-full" />
                  <div className="flex gap-4 mt-4 max-md:flex-wrap max-md:max-w-full">
                    <div className="flex-1 text-sm font-medium text-slate-700 max-md:max-w-full">
                      Try-on experiences quota used
                    </div>
                    <div className="flex">
                      <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notices?.tryonusage_update}
                          readOnly
                        />
                        <div
                          onClick={() => handleNotices("tryonusage_update")}
                          className="inline-flex justify-around items-center w-9 h-5  bg-gray-200  rounded-full    shadow-sm peer   peer-checked:after:translate-x-full  after:content-['']   after:absolute     after:left-[2px] after:bg-white    after:rounded-full   after:h-4  after:w-4   after:transition-all peer-checked:bg-sky-600 mt-[2px]"
                        ></div>
                      </label>
                    </div>
                  </div>
                  <div className="shrink-0 mt-4 h-px bg-gray-200 max-md:max-w-full" />
                  <div className="flex gap-4 mt-4 max-md:flex-wrap max-md:max-w-full">
                    <div className="flex-1 text-sm font-medium text-slate-700 max-md:max-w-full">
                      Renewal due
                    </div>
                    <div className="flex">
                      <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notices?.renewal_due}
                          readOnly
                        />
                        <div
                          onClick={() => handleNotices("renewal_due")}
                          className="inline-flex justify-around items-center w-9 h-5  bg-gray-200  rounded-full    shadow-sm peer   peer-checked:after:translate-x-full  after:content-['']   after:absolute     after:left-[2px] after:bg-white    after:rounded-full   after:h-4  after:w-4   after:transition-all peer-checked:bg-sky-600 mt-[2px]"
                        ></div>
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
  );
};

export default Settings;
