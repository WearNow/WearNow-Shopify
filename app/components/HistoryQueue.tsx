import React from 'react';

type IconItemProps = {
  src: string;
  alt: string;
};

type ImageCardProps = {
  src: string;
  alt: string;
  label: string;
  description: string;
  date: string;
  onClick?: () => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, label, description, date, onClick }) => (
  <div /* style={{ width: '238px', height: '238px' }} */ className={`flex-shrink-0 flex overflow-hidden relative flex-row justify-center rounded-lg p-2.5  aspect-square`} onClick={onClick}>
    <img style={{ height: '100%' }} loading="lazy" src={src} alt={alt} className="object-cover absolute inset-0 size-full" />
    <div className="w-full flex relative flex-col items-start  py-5 px-5 rounded-lg border border-white border-solid shadow-lg backdrop-blur-[6px] max-md:px-5">
      <div className="text-xl sm:text-lg font-semibold">{label}</div>
      <div className="text-base mt-[75%] sm:text-sm sm:mt-[50%] md:text-lg md:mt-[50%]">{description}</div>
      <div className="text-base sm:text-sm md:text-lg mt-2.5">{date}</div>
    </div>
  </div>
);

const HistoryQueue: React.FC = () => {
  const openModal = () => {
    const modal = document.getElementById('history-modal');
    if (modal) {
      modal.style.display = 'block';
    }
  };

  return (
    <div className=" bg-white">
      <div className="w-full max-md:max-w-full">
        <main className="grid sm:grid-cols-2 md:grid-cols-5 flex-wrap items-center gap-2.5 mx-5 pt-8 font-medium text-white max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
          <ImageCard
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/41393cd4cd5332521a6a76c7311cd6bf12859d641f3850f2f131af1897cc1406?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
            alt="Product 1 image"
            label="[Product Name 2]"
            description="Creating Photos"
            date="23/04/24 | 3.00 PM"
          />
          <ImageCard
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3654aa7365c184885b94e7b1ef6372d1e9fdac9cd754fda6a5989ec23025be7?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
            alt="Product 2 image"
            label="[Product Name 2]"
            description="Creating Photos"
            date="23/04/24 | 3.00 PM"
          />
          <ImageCard
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3654aa7365c184885b94e7b1ef6372d1e9fdac9cd754fda6a5989ec23025be7?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
            alt="Product 3 image"
            label="[Product Name 2]"
            description="Creating Photos"
            date="23/04/24 | 3.00 PM"
          />
          <ImageCard
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3654aa7365c184885b94e7b1ef6372d1e9fdac9cd754fda6a5989ec23025be7?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
            alt="Product 4 image"
            label="[Product Name 2]"
            description="Creating Photos"
            date="23/04/24 | 3.00 PM"
          />
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
            <div className="flex justify-center align-center text-xl sm:text-lg items-center px-16 pb-2.5 rounded-lg border border-white border-solid shadow-lg aspect-square backdrop-blur-[6px] max-md:px-5">
              + 2 more <br /> in queue
            </div>
          </div>
        </main>
       
        {/* <img style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }} loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecb2b0acc472a4ad736d879ed5de52f284a0bebb466bee5e147ef9321db10133?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&" alt="Illustration" className="self-center mt-0 max-w-full aspect-[1.06] w-[512px]" /> */}
      </div>
    </div>
  );
};

export default HistoryQueue;
