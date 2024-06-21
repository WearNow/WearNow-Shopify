import * as React from "react";
import { useNotification } from "./Notification";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  className?: string;
  onSelectImage?: (index: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  className,
  onSelectImage,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const maxImagesCount = 4;
  let showImages = [];
  let hiddenImages = [];
  if (images.length > maxImagesCount) {
    showImages = images.slice(0, maxImagesCount);
    hiddenImages = images.slice(maxImagesCount);
  } else {
    showImages = images;
    hiddenImages = [];
  }

  return (
    <>
      <div
        className={`${className} flex gap-2.5 px-2 py-2 shadow-lg backdrop-blur-[6px] max-md:mt-10`}
      >
        {showImages.map((image, index) => {
          const currentImageStyle =
            index === currentImageIndex
              ? "border-blue-500 border-solid "
              : "border-gray-300 border-solid";

          return (
            <img height="100%" width="100%"
              key={index}
              loading="lazy"
              src={image.src}
              alt={image.alt}
              className={
                currentImageStyle +
                "shrink-0 border-2 rounded aspect-[0.83] w-[50px] cursor-pointer"
              }
              onClick={() => {
                setCurrentImageIndex(index);
                if (onSelectImage) onSelectImage(index);
              }}
            />
          );
        })}
        {hiddenImages.length > 0 && (
          <div className="justify-center px-4 py-6 rounded bg-black bg-opacity-20">
            {" "}
            +{hiddenImages.length}{" "}
          </div>
        )}
      </div>
    </>
  );
};

interface ImageProps {
  src: string;
  alt: string;
  className: string;
  onClick?: () => void;
}

const Image: React.FC<ImageProps> = ({ src, alt, className, onClick }) => {
  return <img height="100%" width="100%" src={src} alt={alt} className={className} onClick={onClick} />;
};

const downloadImage = (imageUrl: string, fileName?: string) => {
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      // 创建一个指向Blob对象的URL
      const url = window.URL.createObjectURL(blob);

      // 创建一个临时的a标签
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "image.png");

      // 触发点击事件
      document.body.appendChild(link);
      link.click();

      // 然后移除a标签
      document.body.removeChild(link);

      // 释放URL对象
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error downloading image:", error);
    });
};

interface HistoryModalProps {
  name: string;
  images: { src: string; alt: string }[];
  isOpen: boolean;
  model: {
    name: string;
    image: string;
  };
  background: {
    name: string;
    image: string;
  };
  pose: {
    name: string;
    image: string;
  };
  photos: string;
  onClose?: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  images,
  isOpen,
  photos,
  name,
  model,
  background,
  pose,
  onClose,
}) => {
  if (!isOpen) return null;

  console.log(images, ":::images");
  console.log(background, ":::background");
  console.log(model, ":::model");

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const { showNotification } = useNotification();
  return (
    <section
      className={`fixed z-10 flex w-full h-full top-0 left-0 justify-center items-center px-16 py-20 bg-zinc-800 bg-opacity-20 `}
    >
      <div className="max-w-full bg-white rounded-xl shadow-xl w-[669px] max-md:pl-5 max-md:overflow-scroll max-md:h-[98%]">
        <div className="flex max-md:flex-col max-md:gap-0 p-4">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full ">
            <div className="rounded-lg flex relative flex-col self-stretch text-sm font-medium text-center text-white whitespace-nowrap aspect-[0.57] ">
              <Image
                src={images[currentImageIndex].src}
                alt="Primary Image"
                className="rounded-xl object-cover absolute inset-0 size-full"
              />

              {/* donwload one image icon */}
              <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3abb265c89c53e97de8c35861fde19d319d5c56cd7176b7e07a1ac880e4b6fd?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
                alt=""
                className="absolute top-1 right-1 w-[24px] h-[24px] z-10 cursor-pointer"
                onClick={() => {
                  // 下载图片
                  downloadImage(images[0].src, images[0].alt);

                  showNotification({
                    message: "Successfully downloaded photo",
                    type: "success",
                    duration: 5000,
                  });
                }}
              />
              <ImageGallery
                images={images}
                className="absolute bottom-0 left-0 w-full"
                onSelectImage={(index) => setCurrentImageIndex(index)}
              />
            </div>
          </div>
          <div className="flex flex-col ml-3 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow">
              <header className="flex flex-col pl-3 pb-6 font-medium max-md:px-5">
                <div className="inline-flex items-center">
                  <span className="text-lg leading-7 text-gray-900">
                    {name}
                  </span>
                  {/* close icon */}
                  <img height="100%" width="100%"
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ea272d00063fbc53c6992b6ec914f938b207f5c946b741a15020bf6f3010929?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
                    className="ml-auto max-w-[24px] cursor-pointer"
                    onClick={onClose}
                  />
                </div>
                <p className="mt-1 text-sm text-slate-600">{photos} Photos</p>
              </header>
              <div className="flex z-10 flex-col pl-3 max-md:px-5">
                <h2 className="text-base font-medium leading-6 text-slate-700">
                  Model
                </h2>
                <section className="flex flex-col justify-center items-start px-3.5 py-2.5 mt-1.5 bg-gray-50 rounded-lg border border-gray-300 shadow-sm max-md:pr-5">
                  <div className="h-6 pl-1 pr-2 py-0.5 bg-white rounded-md border border-gray-300 items-center gap-0.5 inline-flex">
                    <div className="justify-start items-center gap-1 flex">
                      <Image
                        // src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ea476f537d9f7067223dfc7d5e3bfe2bc22c2eb64df1f2672df209917bbddd0?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
                        src={model?.image}
                        alt="Model Image"
                        className="w-4 h-4"
                      />
                      <div className="text-center text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                        {model?.name}
                      </div>
                    </div>
                  </div>
                </section>
                <h2 className="mt-5 text-base font-medium leading-6 text-slate-700">
                  Background
                </h2>
                <section className="flex flex-col justify-center items-start px-3.5 py-2.5 mt-1.5 bg-gray-50 rounded-lg border border-gray-300 shadow-sm max-md:pr-5">
                  <div className="h-6 pl-1 pr-2 py-0.5 bg-white rounded-md border border-gray-300 items-center gap-0.5 inline-flex">
                    <div className="justify-start items-center gap-1 flex">
                      <Image
                        // src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ea476f537d9f7067223dfc7d5e3bfe2bc22c2eb64df1f2672df209917bbddd0?apiKey=f33f54c3e98c47d08e772cdbeee9d64d"
                        src={background?.image}
                        alt="Model Image"
                        className="w-4 h-4"
                      />
                      <div className="text-center text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                        {background?.name}
                      </div>
                    </div>
                  </div>
                </section>
                <h2 className="mt-4 text-base font-medium leading-6 text-slate-700">
                  Pose
                </h2>
                <section className="flex flex-col justify-center items-start px-3.5 py-2.5 mt-1.5 bg-gray-50 rounded-lg border border-gray-300 shadow-sm max-md:pr-5">
                  <div className="h-6 pl-1 pr-2 py-0.5 bg-white rounded-md border border-gray-300 items-center gap-0.5 inline-flex">
                    <div className="justify-start items-center gap-1 flex">
                      <Image
                        // src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ea476f537d9f7067223dfc7d5e3bfe2bc22c2eb64df1f2672df209917bbddd0?apiKey=f33f54c3e98c47d08e772cdbeee9d64d"
                        src={pose?.image}
                        alt="Model Image"
                        className="w-4 h-4"
                      />
                      <div className="text-center text-slate-700 text-sm font-medium font-['Inter'] leading-tight">
                        {pose?.name}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <footer className="flex flex-col pl-3 pt-6 pb-3 mt-20 text-base font-medium leading-6 max-md:px-5 max-md:mt-10">
                <button
                  className="justify-center py-2.5 pr-4 pl-7 text-white bg-sky-700 border border-sky-700 shadow-sm rounded-[99px] max-md:pr-7 max-md:pl-5"
                  onClick={() => {
                    showNotification({
                      message: "Photo added to listing",
                      type: "success",
                      duration: 5000,
                    });
                  }}
                >
                  Add to product listing
                </button>
                <button
                  className="flex gap-1.5 justify-center px-4 py-2.5 mt-3 bg-white border border-gray-300 shadow-sm rounded-[99px] text-slate-700 max-md:px-5"
                  onClick={() => {
                    console.log("下载所有图片", ":::images");
                    // 下载所有图片
                    images.forEach((image) => {
                      downloadImage(image.src, image.alt);
                    });

                    showNotification({
                      message: "Successfully downloaded photo",
                      type: "success",
                      duration: 5000,
                    });
                  }}
                >
                  <span>Download all photos</span>
                  <Image
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3abb265c89c53e97de8c35861fde19d319d5c56cd7176b7e07a1ac880e4b6fd?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
                    alt="Download Icon"
                    className="shrink-0 my-auto w-5 aspect-square"
                  />
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
