import { useLoaderData } from "@remix-run/react";
import DashboardHeader from "~/components/DashboardHeader";
import HistoryPhotos from "~/components/HistoryPhotos";
import HistoryQueue from "~/components/HistoryQueue";
import { SessionLoader } from "~/services/SessionLoader";


export const loader = SessionLoader;


export default function () {

  const sessionData = useLoaderData<typeof loader>();
  console.log(sessionData, "session data");
  console.log(sessionData.authWithShop.store_id, "store_id");
  
  return (
    <div className="bg-white py-10">
      <DashboardHeader></DashboardHeader>
      <HistoryQueue {...sessionData}></HistoryQueue>
      <div className=" flex gap-2 items-center mx-7 mt-10 text-sm font-semibold leading-5 text-slate-700 max-md:flex-wrap max-md:mt-10 max-md:mr-2.5">
        <div className="flex-1 shrink-0 self-stretch my-auto h-px bg-gray-200" />
        <div className="justify-center self-stretch px-3.5 py-2.5 bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
          Created Photos
        </div>
        <div className="flex-1 shrink-0 self-stretch my-auto h-px bg-gray-200" />
      </div>
      <HistoryPhotos {...sessionData}></HistoryPhotos>
    </div>
  );
}
