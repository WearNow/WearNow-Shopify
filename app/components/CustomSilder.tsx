import React, { useRef, useEffect, useState } from "react";

interface CustomSliderProps {
    images: string[];
}

const CustomSlider: React.FC<CustomSliderProps> = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const sliderRef = useRef<HTMLDivElement>(null);
 
    //   useEffect(() => {
    //     // const interval = setInterval(() => {
    //       if (currentSlide === images.length - 1) {
    //         setCurrentSlide(0);
    //       } else {
    //         setCurrentSlide(currentSlide + 1);
    //       }
    //     // }); // Change slide every 3 seconds

    //     return () => clearInterval(interval);
    //   }, [currentSlide, images.length]);


    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className="slider">
            <div
                className="slides"
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    transition: "transform 0.5s ease-in-out"
                }}
                ref={sliderRef}
            >
                {images.map((image, index) => (
                    <div className="slide flex flex-col grow self-stretch px-8 py-5 w-full rounded-2xl bg-zinc-100 max-md:px-5 max-md:mt-10 max-md:max-w-full" style={{ paddingBottom: "77px" }}>
                        <div className='onboarding_carousel_slider_img'>
                            <img className="slider_img1" src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106" alt="Image 1" />
                            <img className="slider_img2" src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107" alt="Image 1" />
                            <img className="slider_img3" src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img1.png?v=1713943107" alt="Image 1" />
                        </div>

                        <div className="mt-12 text-3xl font-medium text-center text-zinc-800 max-md:mt-10 max-md:max-w-full">
                            Take Your Store to the Next Level
                        </div>
                        <div className="mt-2.5 text-base font-medium leading-6 text-center text-zinc-800 max-md:max-w-full">
                            Give your users the ability to try before they purchase and
                            see your conversion rate skyrocket.
                        </div>
                    </div>
                ))}
            </div>
            <div className="dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={currentSlide === index ? "dot active" : "dot"}
                        onClick={() => goToSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default CustomSlider;
