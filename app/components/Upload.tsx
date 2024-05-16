import React, { useState } from "react";

const checkSvg = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="check">
      <path
        id="Icon"
        d="M10 3L4.5 8.5L2 6"
        stroke="white"
        stroke-width="1.6666"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
);

const alertCircleSvg = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="alert-circle" clip-path="url(#clip0_1441_18948)">
      <path
        id="Icon"
        d="M10 6.66602V9.99935M10 13.3327H10.0084M18.3334 9.99935C18.3334 14.6017 14.6024 18.3327 10 18.3327C5.39765 18.3327 1.66669 14.6017 1.66669 9.99935C1.66669 5.39698 5.39765 1.66602 10 1.66602C14.6024 1.66602 18.3334 5.39698 18.3334 9.99935Z"
        stroke="#D92D20"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1441_18948">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const UploadComponnent: React.FC<{
  onUpload: Function;
  description: React.ReactNode | string | undefined;
}> = ({ onUpload, description }) => {
  const [files, setFiles] = useState<File[]>([]);

  const [pencent, setPercent] = useState(0);

  const handleInput = (e) => {
    setFiles(e.target.files || []);

    // fetch()

    //模拟上传进度
    let pcstart = 0;
    const timer = setInterval(() => {
      setPercent((pcstart += 20));
      if (pcstart > 80) {
        clearInterval(timer);
        onUpload();
      }
    }, 300);
  };

  const getUploadStatuIcon = () => {
    return (
      <div
        style={{
          borderRadius: "3px",
          backgroundColor: "#046FB4",
          float: "right",
          marginRight: "16px",
        }}
      >
        {checkSvg}
      </div>
    );
  };

  const getImg = (url: Blob) => {
    const img = url ? URL.createObjectURL(url) : "";
    return img;
  };

  const CusProgreess: React.FC<{ process: number }> = ({ process }) => {
    const width = 100 ? `${(process / 100) * 100}%` : "0%";

    return (
      <div
        style={{
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: width,
            height: "1rem",
            backgroundColor: "#2196f3",
            borderRadius: "4px",
            transition: "width 0.5s ease",
          }}
        />
      </div>
    );
  };

  const fileUpload = (
    <div
      style={{
        width: "100%",
        height: "125px",
        borderRadius: "12px",
        boxShadow: "rgba(26, 26, 26, 0.07) 0px 1px 0px 0px",
        backgroundColor: "white",
        border: "0px solid rgb(229, 231, 235)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <input
        style={{
          position: "absolute",
          width: "100%",
          height: "125px",
          opacity: 0,
          cursor: "pointer",
        }}
        type="file"
        multiple
        onChange={handleInput}
      />
      <div
        style={{
          border: "1px solid rgba(229, 231, 235)",
          borderRadius: 10,
          padding: 8,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="upload-cloud-02">
            <path
              id="Icon"
              d="M6.66669 13.3333L10 10M10 10L13.3334 13.3333M10 10V17.5M16.6667 13.9524C17.6846 13.1117 18.3334 11.8399 18.3334 10.4167C18.3334 7.88536 16.2813 5.83333 13.75 5.83333C13.5679 5.83333 13.3976 5.73833 13.3051 5.58145C12.2184 3.73736 10.212 2.5 7.91669 2.5C4.46491 2.5 1.66669 5.29822 1.66669 8.75C1.66669 10.4718 2.36289 12.0309 3.48914 13.1613"
              stroke="#475467"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
      {description}
    </div>
  );

  const uploadProcess = (
    <>
      <div
        style={{
          width: "100%",
          height: "75px",
          borderRadius: "12px",
          boxShadow: "rgba(26, 26, 26, 0.07) 0px 1px 0px 0px",
          backgroundColor: "white",
          border: "0px solid rgb(229, 231, 235)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "15px",
          cursor: "pointer",
        }}
      >
        <img
          style={{
            width: "50px",
            height: "50px",
          }}
          src={getImg(files[0])}
          alt=""
        />
        <div style={{ width: "100%", height: "50px", paddingLeft: "15px" }}>
          <div>
            {files[0]?.name}
            {getUploadStatuIcon()}
          </div>

          <div
            style={{
              width: "95%",
              height: "50px",
              display: "flex ",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CusProgreess process={pencent} />
            <div style={{ paddingLeft: "15px" }}>{pencent + "%"}</div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
          width: "100%",
          height: "75px",
          borderRadius: "12px",
          boxShadow: "rgba(26, 26, 26, 0.07) 0px 1px 0px 0px",
          backgroundColor: "white",
          border: "0px solid rgb(229, 231, 235)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="bottom-10 right-10 p-4 bg-white rounded-xl">
          <div className="grow shrink basis-0 h-5 justify-start items-start gap-4 flex">
            <div className="w-5 h-5 relative rounded-2xl">
              <div className="w-7 h-7 left-[-5px] top-[-5px] absolute opacity-30 rounded-3xl border-2 border-red-600" />
              <div className="w-9 h-9 left-[-9px] top-[-9px] absolute opacity-10 rounded-3xl border-2 border-red-600" />
              <div className="w-5 h-5 left-[-1px] top-[-1px] absolute">
                {alertCircleSvg}
              </div>
            </div>
            <div className="grow shrink basis-0 pr-1 flex-col justify-start items-start gap-3 inline-flex">
              <div className="self-stretch h-4 flex-col justify-start items-start gap-1 flex">
                <div className="self-stretch text-gray-900 text-sm font-medium font-['SF Pro Display'] leading-none">
                  Uploading your own model will increase the generation time by
                  30 minutes
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Icon
                    source={AlertCircleIcon}
                    tone="warning"
                />
                <span style={{ display: "inline-block" }} >Uploading your own model will increase the generation time by 30 minutes</span> */}
      </div>
    </>
  );

  return <div>{files.length < 1 ? fileUpload : uploadProcess}</div>;
};

export default UploadComponnent;
