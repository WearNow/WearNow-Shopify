import * as React from 'react';
import { FC } from 'react';
import { HistoryModal } from '~/components/HistoryModal';

type ImageWithAltProps = {
  src: string;
  alt: string;
  className?: string;
};

const ImageWithAlt: FC<ImageWithAltProps> = ({ src, alt, className }) => <img loading="lazy" src={src} alt={alt} className={className} style={{ height: '100%' }} />;

type CardProps = {
  src: string;
  name: string;
  photos: number;
  date: string;
  time: string;
  aspect: string;
  onClick?: () => void;
};

const Card: FC<CardProps> = ({ src, name, photos, date, time, aspect, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer flex-shrink-0 flex overflow-hidden relative flex-col justify-center rounded-lg p-2.5 ${aspect === 'square' ? 'aspect-square' : 'aspect-[1.34]'}`}>
    <ImageWithAlt src={src} alt={name} className="flex-shrink-0 object-cover absolute inset-0 " />
    <div style={{ height: '238px' }} className="flex relative flex-col items-start py-5 px-5 rounded-lg border border-white border-solid shadow-lg backdrop-blur-[6px] max-md:pr-5">
      <div className="text-base font-semibold">{name}</div>
      <div className="text-sm mt-[100px]">{photos} Photos</div>
      <div className="mt-2.5 text-xs">
        {date} | {time}
      </div>
    </div>
  </div>
);
// const Card: FC<CardProps> = ({ src, name, photos, date, time, aspect }) => (
//   <div className={`flex overflow-hidden relative flex-col justify-center p-2.5 ${aspect === "square" ? "aspect-square" : "aspect-[1.34]"}`}>
//     <ImageWithAlt src={src} alt={name} className="object-cover absolute inset-0 size-full" />
//     <div className="flex relative flex-col items-start py-5 pr-16 pl-5 rounded-lg border border-white border-solid shadow-lg backdrop-blur-[6px] max-md:pr-5">
//       <div className="text-base font-semibold">{name}</div>
//       <div className={`mt-${aspect === "square" ? "32" : "32"} text-sm max-md:mt-10`}>{photos} Photos</div>
//       <div className="mt-3.5 text-xs">{date} | {time}</div>
//     </div>
//   </div>
// );

const HistoryPhotos: FC = () => {

  // const images = [
  //   { src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328", alt: "Image 3" },
  //   { src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-2.jpg?v=1716110328", alt: "Image 4" },
  //   { src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-3.jpg?v=1716110329", alt: "Image 5" },
  //   { src: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-4.jpg?v=1716110328", alt: "Image 6" },
  // ];

  const cards = [
    {
      src: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328',
      name: '[Product Name]',
      photos: 4,
      date: '23/04/24',
      time: '3.00 PM',
      aspect: 'square'
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-2.jpg?v=1716110328',
      name: '[Product Name 2]',
      photos: 10,
      date: '23/04/24',
      time: '3.00 PM',
      aspect: 'square'
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328',
      name: '[Product Name 3]',
      photos: 10,
      date: '23/04/24',
      time: '3.00 PM',
      aspect: 'square'
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328',
      name: '[Product Name 4]',
      photos: 2,
      date: '23/04/24',
      time: '3.00 PM',
      aspect: 'square'
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328',
      name: '[Product Name 5]',
      photos: 1,
      date: '23/04/24',
      time: '3.00 PM',
      aspect: 'square'
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328',
      name: '[Product Name 6]',
      photos: 4,
      date: '23/04/24',
      time: '3.00 PM',
      aspect: 'rectangle'
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328',
      name: '[Product Name 7]',
      photos: 10,
      date: '23/04/24',
      time: '3.00 PM',
      aspect: 'rectangle'
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328',
      name: '[Product Name 8]',
      photos: 10,
      date: '23/04/24',
      time: '3.00 PM',
      aspect: 'rectangle'
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328',
      name: '[Product Name 9]',
      photos: 2,
      date: '23/04/24',
      time: '3.00 PM',
      aspect: 'rectangle'
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328',
      name: '[Product Name 10]',
      photos: 1,
      date: '23/04/24',
      time: '3.00 PM',
      aspect: 'rectangle'
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328',
      name: '[Product Name 10]',
      photos: 1,
      date: '23/04/24',
      time: '3.00 PM',
      aspect: 'rectangle'
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/gallery-1.jpg?v=1716110328',
      name: '[Product Name 10]',
      photos: 1,
      date: '23/04/24',
      time: '3.00 PM',
      aspect: 'rectangle'
    }
  ];

  const [isOpen, setIsOpen] = React.useState(false);

  const images = cards.map(card => {
    return {
      src: card.src,
      alt: card.name
    };
  });

  return (
    <div className="flex flex-col bg-white mt-10">
      <HistoryModal images={images} isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <main className="flex flex-col ml-5 w-[1230px] max-md:ml-0 max-md:w-full">
        <div className=" text-white grid grid-flow-row-dense grid-cols-5 gap-2">
          {cards.map((card, index) => (
            <Card key={index} {...card} aspect="square" onClick={() => setIsOpen(true)} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HistoryPhotos;
