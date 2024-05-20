import HistoryPhotos from "~/components/HistoryPhotos";
import HistoryQueue from "~/components/HistoryQueue";

export default function () {
  return (
    <div className="bg-white">
      <HistoryQueue></HistoryQueue>
      <HistoryPhotos></HistoryPhotos>
    </div>
  );
}
