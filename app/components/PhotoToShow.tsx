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
      <div className="w-full h-full px-7 py-5 bg-zinc-100 rounded-2xl flex-col justify-center items-center gap-2.5 inline-flex">
        <div className="justify-start items-center inline-flex">
          <img height="100%" width="100%" className="w-40 h-80 rounded-2xl" src={photoUrls[0]} />
          <img height="100%" width="100%" className="w-44 h-96 rounded-2xl" src={photoUrls[1]} />
          <img height="100%" width="100%" className="w-36 h-80 rounded-2xl" src={photoUrls[2]} />
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
