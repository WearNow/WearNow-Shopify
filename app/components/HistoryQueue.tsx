import React, { FC } from "react";
import { fetchHistoryQueueData } from "~/apis/history";
import { HistoryNoData } from "./HistoryNoData";
import SkeletonCard from "./SkeletonCard";

type ImageWithAltProps = {
  src: string;
  alt: string;
  className?: string;
};

const ImageWithAlt: FC<ImageWithAltProps> = ({ src, alt, className }) => (
  <img height="100%" width="100%"
    loading="lazy"
    src={src}
    alt={alt}
    className={className}
    style={{ height: "100%" }}
  />
);

type CardProps = {
  src: string;
  name: string;
  photos: number;
  date: string;
  time: string;
  aspect: string;
  onClick?: () => void;
};

const Card: FC<CardProps> = ({
  src,
  name,
  photos,
  date,
  time,
  aspect,
  onClick,
}) => (
  <div
    // style={{ width: '238px', height: '238px' }}
    onClick={onClick}
    className={`cursor-pointer flex-shrink-0 flex overflow-hidden relative flex-col justify-center rounded-lg p-2.5 ${aspect === "square" ? "aspect-square" : "aspect-[1.34]"}`}
  >
    <ImageWithAlt
      src={src}
      alt={name}
      className=" object-cover absolute inset-0 size-full"
    />
    <div className="flex flex-col h-full items-start py-5 px-5 rounded-lg border border-white border-solid shadow-lg backdrop-blur-[6px] max-md:pr-5">
      <div className="text-xl sm:text-md md:text-xl lg:text-base xl:text-2xl font-semibold">
        {name}
      </div>
      <div className="text-base sm:text-base md:text-lg lg:text-sm xl:text-xl mt-auto">
        {photos} Photos
      </div>
      <div className="text-base sm:text-base md:text-lg lg:text-sm xl:text-xl">
        {date} | {time}
      </div>
    </div>
  </div>
);

const HistoryQueue: React.FC = (sessionData: any) => {
  const [historyData, setHistoryData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Call the fetchProducts function when the component mounts
    console.log("apollo useEffect :::");
    fetchHistoryQueueData(sessionData.authWithShop.store_id).then((data) => {
      console.log("fetchHistoryQueueData result: :::", data);
      if (data) {
        setHistoryData(data);
      }
      setLoading(false)
    });
  }, []);

  const cards = historyData.slice(0, 4);

  const noData = !cards || cards.length === 0;

  const normalizeComponent = (
    <div>
      {noData ? (
        <HistoryNoData tips="No photos in creation queue" />
      ) : (
        <main className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 flex-wrap items-center gap-2.5 mx-5 pt-8 font-medium text-white max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
          {!noData &&
            cards.map((card, index) => (
              <Card key={index} {...card} aspect="square" />
            ))}
          {historyData.length > 4 && (
            <div className="flex flex-shrink-0 overflow-hidden relative flex-col justify-center p-2.5 text-base font-black leading-6 text-center aspect-square">
              <img height="100%" width="100%"
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/32334fe4058ec04d72585033e3ef6fc6c6576853e810197959caf86948c9c43d?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
                alt="Background"
                className="object-cover absolute inset-0 size-full"
              />
              <div className="text-xl sm:text-xl md:text-xl lg:text-base xl:text-xl font-semibold flex justify-center align-center items-center pb-2.5 rounded-lg border border-white border-solid shadow-lg aspect-square backdrop-blur-[6px] max-md:px-5">
                + {historyData.length - 4} more <br /> in queue
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );

  const LoadingComponent = (
    <main className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 flex-wrap items-center gap-2.5 mx-5 pt-8 font-medium text-white max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </main>
  );

  return (
    <>
      <div className=" bg-white">
        <div className="w-full max-md:max-w-full">
          {loading ? LoadingComponent : normalizeComponent}
        </div>
      </div>
    </>
  );
};

export default HistoryQueue;
