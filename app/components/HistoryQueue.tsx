import gql from "graphql-tag";
import React, { FC } from "react";
import client from "~/services/ApolloClient";

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

const HistoryQueue: React.FC = () => {
  const [historyData, setHistoryData] = React.useState([]);

  const fetchHistoryData = async () => {
    await client
      .query({
        query: gql`
          {
            product_image_generation_request(where: {status: {_eq: "PENDING"}}) {
              store_product {
                title
                variant_id
                uuid
              }
              status
              results
              created_at
            }
          }

        `,
        fetchPolicy: "network-only",
      })
      .then((result) => {
        console.log("apollo client result: :::", result);
        var product_photo_history = result.data.product_image_generation_request;
        // Map over store_products to create a new array with the added 'image' property
        function formatTimeWithAMPM(dateTimeString:string) {  
          // 解析日期时间字符串  
          const dateTime = new Date(dateTimeString);  
        
          // 提取小时和分钟  
          const hours = dateTime.getHours();  
          const minutes = dateTime.getMinutes().toString().padStart(2, '0');  
        
          // 判断AM/PM并添加标记  
          const ampm = hours >= 12 ? 'PM' : 'AM';  
          const formattedHours = hours % 12 || 12; // 将24小时制转换为12小时制，并处理午夜的情况  
        
          // 格式化时间并返回  
          return `${formattedHours}:${minutes} ${ampm}`;  
      }  
        const updatedStoreProducts = product_photo_history.map(
          (pph: any, index: number) => {
            //   // Assuming sp.images is already a JSON string that needs to be parsed
            return {
              src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/41393cd4cd5332521a6a76c7311cd6bf12859d641f3850f2f131af1897cc1406?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&',
              name: pph.store_product.title,
              photos: 'Creating',
              date: pph.created_at.split("T")[0],
              time: formatTimeWithAMPM(pph.created_at)
            };
          }
        );

        setHistoryData(updatedStoreProducts);
        console.log(
          "apollo client updatedStoreProductQueues: :::",
          updatedStoreProducts
        );
      });
  };

  
  React.useEffect(() => {
    // Call the fetchProducts function when the component mounts
    console.log("apollo useEffect :::");
    fetchHistoryData();
  }, []);

  const cards = historyData.slice(0, 4);

  return (
    <div className=" bg-white">
      <div className="w-full max-md:max-w-full">
        <main className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 flex-wrap items-center gap-2.5 mx-5 pt-8 font-medium text-white max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
          {cards.map((card, index) => (
            <Card
              key={index}
              {...card}
              aspect="square"
            />
          ))}
          
          {historyData.length > 4 && (
            <div
            // style={{ width: '238px', height: '238px' }}
            className="flex flex-shrink-0 overflow-hidden relative flex-col justify-center p-2.5 text-base font-black leading-6 text-center aspect-square"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/32334fe4058ec04d72585033e3ef6fc6c6576853e810197959caf86948c9c43d?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
              alt="Background"
              className="object-cover absolute inset-0 size-full"
            />
            <div className="text-xl sm:text-xl md:text-xl lg:text-base xl:text-xl font-semibold flex justify-center align-center items-center pb-2.5 rounded-lg border border-white border-solid shadow-lg aspect-square backdrop-blur-[6px] max-md:px-5">
              + {historyData.length - 4} more <br /> in queue
            </div>
          </div>
          )}）
          
        </main>

      </div>
    </div>
  );
};

export default HistoryQueue;
