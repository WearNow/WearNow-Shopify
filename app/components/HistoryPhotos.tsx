import gql from "graphql-tag";
import * as React from "react";
import { FC } from "react";
import { HistoryModal } from "~/components/HistoryModal";
import client from "~/services/ApolloClient";
import {fetchHistoryData} from '~/apis/history'

type ImageWithAltProps = {
  src: string;
  alt: string;
  className?: string;
};

const ImageWithAlt: FC<ImageWithAltProps> = ({ src, alt, className }) => (
  <img
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

const HistoryPhotos: FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [historyData, setHistoryData] = React.useState([]);
  const [historyModalProp, setHistoryModalProp] = React.useState({});

  React.useEffect(() => {
    // Call the fetchProducts function when the component mounts
    console.log("apollo useEffect :::");
    fetchHistoryData().then((updatedStoreProducts) => {
      console.log("fetchHistoryData result: :::", updatedStoreProducts);
      setHistoryData(updatedStoreProducts);
    });
  }, []);

  const demoCards = [
    {
      src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328",
      name: "[Product Name]",
      photos: 4,
      date: "23/04/24",
      time: "3.00 PM",
      aspect: "square",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-2.jpg?v=1716110328",
      name: "[Product Name 2]",
      photos: 10,
      date: "23/04/24",
      time: "3.00 PM",
      aspect: "square",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328",
      name: "[Product Name 3]",
      photos: 10,
      date: "23/04/24",
      time: "3.00 PM",
      aspect: "square",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328",
      name: "[Product Name 4]",
      photos: 2,
      date: "23/04/24",
      time: "3.00 PM",
      aspect: "square",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328",
      name: "[Product Name 5]",
      photos: 1,
      date: "23/04/24",
      time: "3.00 PM",
      aspect: "square",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328",
      name: "[Product Name 6]",
      photos: 4,
      date: "23/04/24",
      time: "3.00 PM",
      aspect: "rectangle",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328",
      name: "[Product Name 7]",
      photos: 10,
      date: "23/04/24",
      time: "3.00 PM",
      aspect: "rectangle",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328",
      name: "[Product Name 8]",
      photos: 10,
      date: "23/04/24",
      time: "3.00 PM",
      aspect: "rectangle",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328",
      name: "[Product Name 9]",
      photos: 2,
      date: "23/04/24",
      time: "3.00 PM",
      aspect: "rectangle",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328",
      name: "[Product Name 10]",
      photos: 1,
      date: "23/04/24",
      time: "3.00 PM",
      aspect: "rectangle",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328",
      name: "[Product Name 10]",
      photos: 1,
      date: "23/04/24",
      time: "3.00 PM",
      aspect: "rectangle",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328",
      name: "[Product Name 10]",
      photos: 1,
      date: "23/04/24",
      time: "3.00 PM",
      aspect: "rectangle",
    },
  ];

  const cards = historyData
  // const cards = demoCards;

  const images = cards.map((card) => {
    return {
      src: card.src,
      alt: card.name,
    };
  });

  return (
    <div className="flex flex-col bg-white">
      <HistoryModal
        isOpen={isOpen}
        {...historyModalProp}
        onClose={() => setIsOpen(false)}
      />
      <div className=" flex gap-2 items-center mx-7 mt-10 text-sm font-semibold leading-5 text-slate-700 max-md:flex-wrap max-md:mt-10 max-md:mr-2.5">
        <div className="flex-1 shrink-0 self-stretch my-auto h-px bg-gray-200" />
        <div className="justify-center self-stretch px-3.5 py-2.5 bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
          Created Photos
        </div>
        <div className="flex-1 shrink-0 self-stretch my-auto h-px bg-gray-200" />
      </div>
      <div className="w-full max-md:max-w-full">
        <main className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-2.5 mx-5 pt-8 font-medium text-white flex-wrap max-md:mr-2.5 max-md:max-w-full">
          {cards.map((card, index) => (
            <Card
              key={index}
              {...card} 
              aspect="square"
              onClick={() => {
                setIsOpen(true);
                setHistoryModalProp({...card})
              }
              }
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default HistoryPhotos;
