import DashboardHeader from "~/components/DashboardHeader";
import HistoryPhotos from "~/components/HistoryPhotos";
import HistoryQueue from "~/components/HistoryQueue";

export default function () {
  return (
    <div className="bg-white py-10">
      <DashboardHeader></DashboardHeader>
      <HistoryQueue></HistoryQueue>
      <HistoryPhotos></HistoryPhotos>
    </div>
  );
}
