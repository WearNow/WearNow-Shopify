import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PaginatedItems from './PaginatedItems';

const OnboardingStepSecond: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <div className="flex gap-10 mt-10 mb-10" style={{ gap: "50px" }}>
                <div className="onboarding_left" style={{ width: "70%" }}>
                    <h4 className="text-4xl mb-3 font-bold dark:text-white onbording_enabled">Create Your First Product Photo</h4>
                    <p className="onboarding_add_sub_title mb-3 mt-6 text-gray-500" style={{ color: "#52575D", width: "53%" }}>Take your product photos to the next level in just 4 easy steps!</p>
                    <div className='onboarding_select_product'>
                        <div className='onboarding_select_product_content flex'>
                            <span className='onboarding_select_product_step' style={{ marginRight: "10px" }}>01</span>
                            <h3 className='onboarding_select_product_title'>Select 1 Product</h3>
                        </div>
                        <PaginatedItems itemsPerPage={3} />
                        <div className='onboarding_select_product_step_main_next'>
                            <div className='onboarding_select_product_content flex'>
                                <span className='onboarding_select_product_step_next' style={{ marginRight: "10px" }}>02</span>
                                <h3 className='onboarding_select_product_title'>Select a model</h3>
                            </div>
                            <div className='onboarding_select_product_content flex'>
                                <span className='onboarding_select_product_step_next' style={{ marginRight: "10px" }}>03</span>
                                <h3 className='onboarding_select_product_title'>Select a background</h3>
                            </div>
                            <div className='onboarding_select_product_content flex'>
                                <span className='onboarding_select_product_step_next' style={{ marginRight: "10px" }}>04</span>
                                <h3 className='onboarding_select_product_title'>Select a pose</h3>
                            </div>
                            <div className="buton_content mt-5 flex gap-10 items-center" style={{ gap: "20px" }}>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-full flex gap-2 items-center" style={{ gap: "5px" }}>
                                    Continue
                                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                                        <g id="Arrow">
                                            <path id="Vector" d="M0.235755 1.23677C-0.0785849 1.55111 -0.0785849 2.05889 0.235755 2.37323L3.36303 5.50051L0.235755 8.62779C-0.0785849 8.94212 -0.0785849 9.44991 0.235755 9.76425C0.550094 10.0786 1.05787 10.0786 1.37221 9.76425L5.07175 6.06471C5.38609 5.75037 5.38609 5.24259 5.07175 4.92825L1.37221 1.22871C1.06593 0.922432 0.550094 0.922432 0.235755 1.23677Z" fill="white" />
                                        </g>
                                    </svg>
                                </button>
                                <span className="text-black-700 onbording_do_letter">I’ll do this later</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="onboarding_carousel" style={{ width: "40.5%" }}>
                    <Slider {...settings}>
                        <div className='onboarding_carousel_slider_conent'>
                            <div className='onboarding_carousel_slider'>
                                <div className='onboarding_carousel_slider_item'>
                                    <div className='onboarding_carousel_slider_img'>
                                        <img className="slider_img1" src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106" alt="Image 1" />
                                        <img className="slider_img2" src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107" alt="Image 1" />
                                        <img className="slider_img3" src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img1.png?v=1713943107" alt="Image 1" />
                                    </div>
                                </div>
                                <div className='onboarding_carousel_content'>
                                    <h2 className='onboarding_carousel_title'>Take Your Store to the Next Level</h2>
                                    <p className='onboarding_carousel_subtitle'>Create professional product photos in a few minutes</p>
                                </div>
                            </div>
                        </div>
                        <div className='onboarding_carousel_slider_conent'>
                            <div className='onboarding_carousel_slider'>
                                <div className='onboarding_carousel_slider_item'>
                                    <div className='onboarding_carousel_slider_img'>
                                        <img className="slider_img1" src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106" alt="Image 1" />
                                        <img className="slider_img2" src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107" alt="Image 1" />
                                        <img className="slider_img3" src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img1.png?v=1713943107" alt="Image 1" />
                                    </div>
                                </div>
                                <div className='onboarding_carousel_content'>
                                    <h2 className='onboarding_carousel_title'>Take Your Store to the Next Level</h2>
                                    <p className='onboarding_carousel_subtitle'>Create professional product photos in a few minutes</p>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </>
    );
}

export default OnboardingStepSecond;
