import * as React from "react";
import { FC } from "react";
import { HistoryModal } from "~/components/HistoryModal";
import { fetchHistoryData } from "~/apis/history";
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

const HistoryPhotos: FC = (sessionData: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [historyData, setHistoryData] = React.useState([]);
  const [historyModalProp, setHistoryModalProp] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Call the fetchProducts function when the component mounts
    console.log("apollo useEffect :::");
    fetchHistoryData(sessionData.authWithShop.store_id).then(
      (updatedStoreProducts) => {
        console.log("fetchHistoryData result: :::", updatedStoreProducts);
        setHistoryData(updatedStoreProducts);
        setLoading(false)
      }
    );
  }, []);

  const cards = historyData;

  const noData = !cards || cards.length === 0;

  const normalizeComponent = noData ? (
    <HistoryNoData tips="No photos created" />
  ) : (
    <div className="flex flex-col bg-white">
      <HistoryModal
        isOpen={isOpen}
        {...historyModalProp}
        onClose={() => setIsOpen(false)}
      />
      
      <div className="w-full max-md:max-w-full">
        <main className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-2.5 mx-5 pt-8 font-medium text-white flex-wrap max-md:mr-2.5 max-md:max-w-full">
          {cards.map((card, index) => (
            <Card
              key={index}
              {...card}
              aspect="square"
              onClick={() => {
                setIsOpen(true);
                setHistoryModalProp({ ...card });
              }}
            />
          ))}
        </main>
      </div>
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

export default HistoryPhotos;
