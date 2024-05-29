import React, { useState,useEffect } from "react";
import {apiURL} from "../services/Services"

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
        strokeWidth="1.6666"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
const UploadComponent: React.FC<{
  onUpload: Function;
  description: React.ReactNode | string | undefined;
  show: String;
}> = ({ onUpload, description, show }) => {
  const [percent, setPercent] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError,setFileError]=useState();



  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const file = selectedFiles[0];
      if (file.type.startsWith('image/')) {      
      setFiles(Array.from(selectedFiles));

      const formdata = new FormData();
      formdata.append("file", file, file.name);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
      };

      fetch(`${apiURL}api/s3`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          //console.log(result);
          let pcstart = 0;
          const timer = setInterval(() => {
            setPercent((pcstart += 20));
            if (pcstart > 80) {
              clearInterval(timer);
              onUpload(result);
            }
          }, 300);
          setTimeout(() =>{
            setFiles([]);
            setPercent(0);
          },5000);
          // Call onUpload function if needed
          //onUpload(result);
        })
        .catch((error) => console.error(error));
      } else {
        setFileError('Please select an image file');
      }
    }
  };
  return (
    <div>
      {files.length < 1 ? (
       
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
          <span style={{color:"red"}}> {fileError}</span>
          <input
            style={{
              position: "absolute",
              width: "100%",
              height: "125px",
              opacity: 0,
              cursor: "pointer",
            }}
            type="file"
            accept="image/*"
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
      ) : (
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
            src={URL.createObjectURL(files[0])}
            alt=""
          />
          <div style={{ width: "100%", height: "50px", paddingLeft: "15px" }}>
            <div>
              {files[0]?.name}
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
            </div>

            <div
              style={{
                width: "95%",
                height: "50px",
                display: "flex ",
                justifyContent: "left",
                alignItems: "left",
              }}
            >
              <div
                style={{
                  width: `${(percent / 100) * 100}%`,
                  backgroundColor: "#2196f3",
                  borderRadius: "4px",
                  transition: "width 0.5s ease",
                  height: "10px",
                  marginTop:"10px"
                }}
              />
              <div style={{ paddingLeft: "15px" }}>{percent + "%"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
