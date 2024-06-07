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
      <HistoryPhotos {...sessionData}></HistoryPhotos>
    </div>
  );
}
