import React, { useState, useEffect } from 'react';
import client from "../services/ApolloClient"
import gql from "graphql-tag"
import ActivePlan from './ActivePlan';
import Plan from './Plan';
import BillingSkelton from './BillingSkelton';

const Billing: React.FC<{ handlesubmit: any, packageData: any, store_id: any }> = ({ handlesubmit, packageData, store_id }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [active, setActive] = useState();
  const [bgcolorTab, setBgcolorTab] = useState("black");
  const [bgcolorTab2, setBgcolorTab2] = useState("white");
  const [colorTab, setColorTab] = useState("white");
  const [colorTab2, setColorTab2] = useState("black");
  const [loader, setLoader] = useState("no");
  const [package_id, setPackageId] = useState("");
  const [loading, setLoading] = useState(true);
  const packages = packageData;
  useEffect(() => {
    client
      .query({
        query: gql`
          query MyQuery6($store_id:uuid) {
          store_subscription(where: {store_id: {_eq: $store_id},status:{_eq:"active"}}) {
            store {
              name
              uuid
            }
            package {
              name
              uuid
              price
              cycle
            }
            status
            created_at
          }
        }`,
        fetchPolicy: "network-only",
        variables: {
          store_id: store_id,
        }
      })
      .then((result) => {
        const store_subscription = result.data.store_subscription;
        if (store_subscription.length > 0 && store_subscription[0]?.package.uuid) {
          setActive(store_subscription[0].package);
          console.log(store_subscription[0].package, 'subscription');
          if (store_subscription[0].package.cycle == 'yearly') {
            setActiveTab(2);
          }
        }

      });
  }, []);


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

  const handleBilling = async (uuid: any, cycle: string) => {
    setPackageId(uuid);
    setLoader("yes");
    console.log("Amount :::=>", uuid);
    await handlesubmit(uuid, cycle, active?.uuid);
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second delay
  }, []);
  return (
    <>
        {loading ? (
          <BillingSkelton/>
        ) : (
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
        {!active?.cycle || active?.cycle == "monthly" ? (
          <div className='flex w-[316px] h-[52px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] gap-[8px] items-start shrink-0 flex-nowrap bg-[rgba(116,116,128,0.08)] rounded-[100px]  top-[153px]  z-[3]'>
            {/* {loading ? (  <SkeletonTabs /> ) : (
          <> */}
            <button onClick={() => handleTabClick1()} className='flex w-[150px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#1d2127] rounded-[100px] border-none relative z-[4] pointer' style={{ background: bgcolorTab }}>
              <span className="flex w-[57px] h-[24px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-center whitespace-nowrap z-[5]" style={{ color: colorTab }}>
                Monthly
              </span>
            </button>
            <div onClick={() => handleTabClick2()} className='flex w-[150px] pt-[10px] pr-[10px] pointer pb-[10px] pl-[10px] gap-[4px] justify-center items-baseline shrink-0 flex-nowrap rounded-[100px] relative z-[6]' style={{ cursor: "pointer", background: bgcolorTab2 }}>
              <span className="flex w-[43px] h-[24px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#1d2127] relative text-center whitespace-nowrap z-[7]" style={{ color: colorTab2 }}>
                Yearly
              </span>
              <span className="flex w-[70px] h-[18px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#1d2127] relative text-center whitespace-nowrap z-[8]" style={{ color: colorTab2 }}>
                40% off
              </span>
            </div>

            {/* )} */}
          </div>
        ) : (
          <div className='flex w-[130px] h-[52px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] gap-[8px] items-start shrink-0 flex-nowrap bg-[rgba(116,116,128,0.08)] rounded-[100px]  top-[153px]  z-[3]'>
            <div className='flex w-[150px] pt-[10px] pr-[10px] pointer pb-[10px] pl-[10px] gap-[4px] justify-center items-baseline shrink-0 flex-nowrap rounded-[100px] relative z-[6]' style={{ background: "black" }}>
              <span className="flex w-[43px] h-[24px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#1d2127] relative text-center whitespace-nowrap z-[7]" style={{ color: "#fff" }}>
                Yearly
              </span>
              <span className="flex w-[70px] h-[18px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#1d2127] relative text-center whitespace-nowrap z-[8]" style={{ color: "#fff" }}>
                40% off
              </span>

            </div>
          </div>
        )}
        {activeTab === 1 &&
          <div className='biling_container flex  h-[550px] gap-px items-end shrink-0 flex-nowrap rounded-[16px]   top-[235px] z-[9]'>
            {packages?.filter((item: any) => item.cycle === "monthly").map((item: any, index: number) => (
              <>
                {active?.uuid && active.uuid == item.uuid ? (
                  <ActivePlan item={item} />
                ) : (
                  <Plan item={item} active={active} loader={loader} handleBilling={handleBilling} package_id={package_id} />
                )}
              </>
            ))}
          </div>
        }
        {activeTab === 2 &&
          <div className='biling_container flex  h-[550px] gap-px items-end shrink-0 flex-nowrap rounded-[16px]   top-[235px] z-[9]'>
            {packages?.filter((item: any) => item.cycle === "yearly").map((item: any, index: number) => (
              <>
                {active?.uuid && active.uuid == item.uuid ? (
                  <ActivePlan item={item} />
                ) : (
                  <Plan item={item} active={active} loader={loader} handleBilling={handleBilling} package_id={package_id} />
                )}
              </>
            ))}

          </div>
        }
       
      </div>
      </>
      )}
    </>
  );
};

export default Billing;
