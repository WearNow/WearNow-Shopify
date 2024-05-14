import React from 'react';

interface Prop {
  photos:
  | string[]
  | ['https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106', 'https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107'];
  title?: string | 'Take Your Store to the Next Level';
  description?: string | 'Give your users the ability to try before they purchase and see your conversion rate skyrocket.';
}

const PhotoToShow: React.FC<Prop> = (prop: Prop) => {
  const { photos: photoUrls, title, description } = prop;

  return (
    <>
      <div style={{ width: "500px", height: '100%' }} className="w-500 h-500 px-7 py-5 bg-zinc-100 rounded-2xl flex-col justify-start items-center gap-2.5 inline-flex">

        <div style={{ width: "420px", height: '100%' }} className=" justify-start items-center inline-flex">
          {photoUrls.map((item, index) => (
            <img key={index} className="w-36 h-80 rounded-2xl" src={item} alt="Image 1" />
          ))}
        </div>
        <div className="text-center text-zinc-800 text-3xl font-medium font-['SF Pro Display'] leading-9">Take Your Store to the Next Level</div>
        <div className="flex-col justify-start items-center gap-11 flex">
          <div className="flex-col justify-start items-center gap-4 flex">
            <div className="w-96 text-center text-zinc-800 text-base font-medium font-['SF Pro Display'] leading-normal">Create professional product photos in a few minutes</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoToShow;
