import React from 'react';

type IconItemProps = {
  src: string;
  alt: string;
};

const IconItem: React.FC<IconItemProps> = ({ src, alt }) => (
  <div className="flex justify-center items-center p-1.5 w-8 h-8 bg-[color:var(--p-color-bg-fill-inverse)] rounded-[var(--p-border-radius-200)]">
    <img loading="lazy" src={src} alt={alt} className="w-5 aspect-square" />
  </div>
);

type NavItemProps = {
  src: string;
  alt: string;
  label: string;
  badgeCount?: number;
};

const NavItem: React.FC<NavItemProps> = ({ src, alt, label, badgeCount }) => (
  <div className="flex gap-2 py-1 pr-1 pl-2 text-sm leading-5 rounded-[var(--p-border-radius-200)] text-[color:var(--p-color-text)]">
    <img loading="lazy" src={src} alt={alt} className="shrink-0 w-5 aspect-square" />
    <div className="flex-1 text-ellipsis">{label}</div>
    {badgeCount && (
      <div className="justify-center px-2 py-0.5 text-xs leading-4 bg-[color:var(--p-color-bg-fill-transparent-secondary)] rounded-[var(--p-border-radius-200)] text-[color:var(--p-color-text-secondary)]">
        {badgeCount}
      </div>
    )}
  </div>
);

type ImageCardProps = {
  src: string;
  alt: string;
  label: string;
  description: string;
  date: string;
  onClick?: () => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, label, description, date, onClick }) => (
  <div style={{ width: '238px', height: '238px' }} className="flex-shrink-0 flex overflow-hidden relative flex-row justify-center rounded-lg p-2.5" onClick={onClick} >
    <img loading="lazy" src={src} alt={alt} className="object-cover absolute inset-0 size-full" />
    <div  className=" flex relative flex-col items-start  py-5 pr-16 pl-5 rounded-lg border border-white border-solid shadow-lg backdrop-blur-[6px] max-md:pr-5">
      <div className="text-base font-semibold">{label}</div>
      <div className="mt-[125px] text-sm max-md:mt-10">{description}</div>
      <div className="mt-1 text-xs">{date}</div>
    </div>
  </div>
);

const HistoryQueue: React.FC = () => {

  const openModal = () => {
    const modal = document.getElementById('history-modal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  return (
    <div className=" bg-white">
      <div className="w-full max-md:max-w-full">
        <main className="flex gap-2.5 mx-5 pt-8 font-medium text-white max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
          <ImageCard  src="https://cdn.builder.io/api/v1/image/assets/TEMP/41393cd4cd5332521a6a76c7311cd6bf12859d641f3850f2f131af1897cc1406?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&" alt="Product 1 image" label="[Product Name 2]" description="Creating Photos" date="23/04/24 | 3.00 PM" />
          <ImageCard  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3654aa7365c184885b94e7b1ef6372d1e9fdac9cd754fda6a5989ec23025be7?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&" alt="Product 2 image" label="[Product Name 2]" description="Creating Photos" date="23/04/24 | 3.00 PM" />
          <ImageCard  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3654aa7365c184885b94e7b1ef6372d1e9fdac9cd754fda6a5989ec23025be7?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&" alt="Product 3 image" label="[Product Name 2]" description="Creating Photos" date="23/04/24 | 3.00 PM" />
          <ImageCard  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3654aa7365c184885b94e7b1ef6372d1e9fdac9cd754fda6a5989ec23025be7?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&" alt="Product 4 image" label="[Product Name 2]" description="Creating Photos" date="23/04/24 | 3.00 PM" />
          <div style={{ width: '238px', height: '238px' }} className="flex flex-shrink-0 overflow-hidden relative flex-col justify-center p-2.5 text-base font-black leading-6 text-center aspect-square">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/32334fe4058ec04d72585033e3ef6fc6c6576853e810197959caf86948c9c43d?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&" alt="Background" className="object-cover absolute inset-0 size-full" />
            <div style={{ }} className="relative justify-center items-center px-16 pt-[98px] pb-2.5 rounded-lg border border-white border-solid shadow-lg aspect-square backdrop-blur-[6px] max-md:px-5">
              + 2 more <br /> in queue
            </div>
          </div>
        </main>
        <div className="w-[1230px] flex gap-2 items-center mx-7 mt-10 text-sm font-semibold leading-5 text-slate-700 max-md:flex-wrap max-md:mt-10 max-md:mr-2.5">
          <div className="flex-1 shrink-0 self-stretch my-auto h-px bg-gray-200" />
          <div className="justify-center self-stretch px-3.5 py-2.5 bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
            Created Photos
          </div>
          <div className="flex-1 shrink-0 self-stretch my-auto h-px bg-gray-200" />
        </div>
        {/* <img style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }} loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecb2b0acc472a4ad736d879ed5de52f284a0bebb466bee5e147ef9321db10133?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&" alt="Illustration" className="self-center mt-0 max-w-full aspect-[1.06] w-[512px]" /> */}
      </div>
    </div>
  );
};

export default HistoryQueue;