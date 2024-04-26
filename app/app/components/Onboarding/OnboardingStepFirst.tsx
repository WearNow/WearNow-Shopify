import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const OnboardingStepFirst: React.FC = () => {
    const settings: SliderSettings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <div className="flex gap-10	mt-10 mb-10" style={{ gap: "50px" }}>
                <div className="onboarding_left" style={{ width: "70%" }}>
                    <h4 className="text-4xl mb-3 font-bold dark:text-white onbording_enabled">Enable Virtual Try-On</h4>
                    <p className="onboarding_add_sub_title mb-3 mt-6 text-gray-500" style={{ color: "#52575D", width: "53%" }}>Add the products you want to activate virtual try-on for and enable our widget on your store.</p>
                    <div className="add_product_content mt-10 flex justify-between items-center">
                        <h2 className='onboarding_add_prd_title'>Add your products</h2>
                        <button className="add_badges flex items-center gap-0 cursor-pointer" style={{ color: "#047AC6", border: "none", outline: "none" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.99992 8H3.33325Z" fill="#047AC6" />
                                <path d="M7.99992 3.33334V8M7.99992 8V12.6667M7.99992 8H12.6666M7.99992 8H3.33325" stroke="#047AC6" strokeWidth="2" strokeLinejoin="round" />
                            </svg>
                            Add
                        </button>
                    </div>
                    <div className='onboarding_opacity_content'>
                        <div className="enabled_vartual_try_on">
                            <div className="mt-10 flex justify-between items-center">
                                <h2 className='onboarding_enabled_title'>Enable Virtual Try-On for all of these products</h2>
                                <div className="switch">
                                    <input type="checkbox" id="switch" /><label htmlFor="switch">Toggle</label>
                                </div>
                            </div>
                        </div>
                        <div className="default_number_product mt-10">
                            <div className="w-full">
                                <form className="">
                                    <div className="mb-4">
                                        <label className="onboarding_default_number block text-gray-700  font-bold mb-2">
                                            Default Number of Try-On Experiences Per Product <span className="text-red-700" >*</span>
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                                            id="username"
                                            type="text"
                                            placeholder="5"
                                        />
                                        <span className="mt-2 flex onbording_prd_letter">You can change this on a per product basis later</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="active_on_your_store">
                            <h2 className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" style={{ marginTop: "3.4px" }} width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <g filter="url(#filter0_d_724_9197)">
                                    <path d="M12 1.5C10.5166 1.5 9.06659 1.93987 7.83323 2.76398C6.59986 3.58809 5.63856 4.75943 5.07091 6.12987C4.50325 7.50032 4.35472 9.00832 4.64411 10.4632C4.9335 11.918 5.64781 13.2544 6.6967 14.3033C7.7456 15.3522 9.08197 16.0665 10.5368 16.3559C11.9917 16.6453 13.4997 16.4967 14.8701 15.9291C16.2406 15.3614 17.4119 14.4001 18.236 13.1668C19.0601 11.9334 19.5 10.4834 19.5 9C19.4978 7.01154 18.7069 5.10516 17.3009 3.69911C15.8948 2.29306 13.9885 1.50218 12 1.5ZM12 12.75C11.8517 12.75 11.7067 12.706 11.5833 12.6236C11.46 12.5412 11.3639 12.4241 11.3071 12.287C11.2503 12.15 11.2355 11.9992 11.2644 11.8537C11.2934 11.7082 11.3648 11.5746 11.4697 11.4697C11.5746 11.3648 11.7082 11.2933 11.8537 11.2644C11.9992 11.2355 12.15 11.2503 12.287 11.3071C12.4241 11.3639 12.5412 11.46 12.6236 11.5833C12.706 11.7067 12.75 11.8517 12.75 12C12.75 12.1989 12.671 12.3897 12.5303 12.5303C12.3897 12.671 12.1989 12.75 12 12.75ZM12.75 9.75C12.75 9.94891 12.671 10.1397 12.5303 10.2803C12.3897 10.421 12.1989 10.5 12 10.5C11.8011 10.5 11.6103 10.421 11.4697 10.2803C11.329 10.1397 11.25 9.94891 11.25 9.75V6C11.25 5.80109 11.329 5.61032 11.4697 5.46967C11.6103 5.32902 11.8011 5.25 12 5.25C12.1989 5.25 12.3897 5.32902 12.5303 5.46967C12.671 5.61032 12.75 5.80109 12.75 6V9.75Z" fill="#E71837" />
                                </g>
                                <defs>
                                    <filter id="filter0_d_724_9197" x="-1" y="0" width="26" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_724_9197" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_724_9197" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                                <span className="text-red-700 onbording_store_active">Virtual Try-On is not active on your store</span>
                            </h2>
                            <div className="try_on_button flex justify-between items-center mt-4 opacity-40">
                                <h2 className="onbording_add_btn" style={{ color: "white" }}>Add our Try-On button to your store</h2>
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                                        <g filter="url(#filter0_d_724_9206)">
                                            <path d="M15.2864 9.21809C14.8384 9.21693 14.3992 9.09422 14.0155 8.86305C13.6319 8.63187 13.3181 8.30089 13.1078 7.90541L11.268 9.74515C10.8661 10.1333 10.3278 10.3481 9.76911 10.3433C9.21038 10.3384 8.6759 10.1143 8.2808 9.7192C7.8857 9.32409 7.66159 8.78962 7.65674 8.23089C7.65188 7.67215 7.86667 7.13386 8.25485 6.73196L10.0946 4.89221C9.69911 4.68188 9.36813 4.36814 9.13695 3.98447C8.90578 3.6008 8.78307 3.16158 8.78191 2.71365C8.78191 2.68665 8.78901 2.66179 8.79043 2.6348H5.53927C5.13115 2.63518 4.73985 2.79747 4.45126 3.08606C4.16267 3.37465 4.00038 3.76595 4 4.17408V12.4607C4.00038 12.8689 4.16267 13.2602 4.45126 13.5487C4.73985 13.8373 5.13115 13.9996 5.53927 14H13.8259C14.2341 13.9996 14.6254 13.8373 14.9139 13.5487C15.2025 13.2602 15.3648 12.8689 15.3652 12.4607V9.20957C15.3382 9.21099 15.3133 9.21809 15.2864 9.21809Z" fill="white" />
                                            <path d="M15.2864 7.44228C15.098 7.44228 14.9173 7.36744 14.7841 7.23423C14.6509 7.10102 14.576 6.92035 14.576 6.73196V3.42397H11.268C11.0797 3.42397 10.899 3.34913 10.7658 3.21592C10.6326 3.08271 10.5577 2.90204 10.5577 2.71365C10.5577 2.52526 10.6326 2.34458 10.7658 2.21137C10.899 2.07816 11.0797 2.00332 11.268 2.00332H15.2864C15.4747 2.00332 15.6554 2.07816 15.7886 2.21137C15.9218 2.34458 15.9967 2.52526 15.9967 2.71365V6.73196C15.9967 6.92035 15.9218 7.10102 15.7886 7.23423C15.6554 7.36744 15.4747 7.44228 15.2864 7.44228Z" fill="white" />
                                            <path d="M9.76145 8.94888C9.62074 8.94941 9.48304 8.90814 9.36582 8.83031C9.2486 8.75247 9.15713 8.64157 9.10303 8.51168C9.04893 8.38179 9.03462 8.23875 9.06193 8.10072C9.08923 7.96268 9.15692 7.83587 9.2564 7.73636L14.7842 2.20861C14.8503 2.14247 14.9288 2.09001 15.0152 2.05421C15.1016 2.01842 15.1942 2 15.2878 2C15.3813 2 15.4739 2.01842 15.5603 2.05421C15.6467 2.09001 15.7253 2.14247 15.7914 2.20861C15.8575 2.27474 15.91 2.35326 15.9458 2.43967C15.9816 2.52608 16 2.6187 16 2.71223C16 2.80576 15.9816 2.89837 15.9458 2.98478C15.91 3.0712 15.8575 3.14971 15.7914 3.21585L10.2636 8.7436C10.1976 8.80927 10.1193 8.86122 10.0331 8.89645C9.94688 8.93169 9.85456 8.9495 9.76145 8.94888Z" fill="white" />
                                        </g>
                                        <defs>
                                            <filter id="filter0_d_724_9206" x="-2" y="0" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                <feOffset dy="4" />
                                                <feGaussianBlur stdDeviation="2" />
                                                <feComposite in2="hardAlpha" operator="out" />
                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_724_9206" />
                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_724_9206" result="shape" />
                                            </filter>
                                        </defs>
                                    </svg>
                                </a>
                            </div>
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
                                    <h2 className='onboarding_carousel_title'>NextTake Your Store to the Next Level</h2>
                                    <p className='onboarding_carousel_subtitle'>Give your users the ability to try before they purchase and see your conversion rate skyrocket.</p>
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
                                    <h2 className='onboarding_carousel_title'>NextTake Your Store to the Next Level</h2>
                                    <p className='onboarding_carousel_subtitle'>Give your users the ability to try before they purchase and see your conversion rate skyrocket.</p>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default OnboardingStepFirst

interface SliderSettings {
    dots: boolean;
    infinite: boolean;
    arrows: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
}

