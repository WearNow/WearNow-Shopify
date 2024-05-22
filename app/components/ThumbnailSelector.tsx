import {
  Badge,
  Bleed,
  BlockStack,
  Box,
  Card,
  Image,
  InlineGrid,
  InlineStack,
  Pagination,
  Scrollable,
  Text,
} from "@shopify/polaris";
import React, { useState } from "react";

import { EmptyState } from "@shopify/polaris";

import Upload from "./Upload";

function EmptyStateExample() {
  return (
    <EmptyState
      heading="Upload Your Own model"
      action={{ content: "Add transfer" }}
      secondaryAction={{
        content: "Learn more",
        url: "https://help.shopify.com",
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>
        15 Photos | Clear Face,No Accessories | this may take more time to
        create
      </p>
    </EmptyState>
  );
}

const ThumbnailSelector: React.FC<{
  modelSelectId: String;
  setSelectModelId: any;
  ModuleData: any;
}> = ({ modelSelectId, setSelectModelId, ModuleData }) => {
  const isSelected = (index: string) => index === modelSelectId;

  // const segments = ModuleData

  const onClickHandle = (e: any) => {
    setSelectModelId(e);
  };

  const SpacingBackground = ({
    children,
    width = "100%",
  }: {
    children: React.ReactNode;
    width?: string;
  }) => {
    return (
      <div
        style={{
          width,
          height: "auto",
        }}
      >
        {children}
      </div>
    );
  };

  const listboxItemStyle = {
    display: "flex",
    height: "250px",
    justifyContent: "space-around",
    borderRadius: "15px",
    border: "3px solid ",
    borderColor: "rgba(4,111,180,0)",
  };

  const listboxItemSelectedStyle = {
    display: "flex",
    height: "250px",
    justifyContent: "space-around",
    borderRadius: "15px",
    border: "3px solid ",
    borderColor: "rgba(4,111,180,1)",
  };

  const listboxItemMarkup = (seg: any) => (
    <div
      className="w-56 flex"
      key={seg.uuid}
      onClick={() => {
        onClickHandle(seg.uuid);
      }}
      style={isSelected(seg.uuid) ? listboxItemSelectedStyle : listboxItemStyle}
    >
      <Card>
        <Bleed marginInline="400" marginBlock="400">
          <Image
            source={seg.cover_image}
            alt="a sheet with purple and orange stripes"
          />
          <Box padding="400">
            <div className="self-stretch justify-start items-center gap-2 inline-flex">
              <div
                style={{
                  width: 193,
                  color: "#303030",
                  fontSize: 13,
                  fontFamily: "Inter",
                  fontWeight: "650",
                  wordWrap: "break-word",
                }}
              >
                {seg.name}
              </div>
            </div>
          </Box>
        </Bleed>
      </Card>
    </div>
  );
  const listboxMarkup = (
    <>
      <div style={{ display: "flex", width: "100%" }}>
        <SpacingBackground>
          <InlineGrid gap="400" columns={2}>
            {ModuleData.map((seg) => listboxItemMarkup(seg))}
          </InlineGrid>
        </SpacingBackground>
      </div>
    </>
  );

  const [tryOn, setTryOn] = useState(false);

  const switchTryOn = () => {
    setTryOn((tryOn) => !tryOn);
  };

  return (
    <div
      style={{
        alignItems: "stretch",
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <Card background="bg-surface-secondary" padding="500">
        <div className="mx-auto my-2">
          <div className="flex justify-start items-center">
            <div>
              <Text as="h2" variant="headingSm">
                  Model Library
              </Text>
            </div>

            <div className="flex justify-end items-center ml-auto">
              <Text as="h2" variant="headingSm">
                  Male Models
              </Text>
              <div className="w-[36px] h-[28px] shrink-0 bg-[url(../assets/images/3cd34978-eac0-4005-a003-a90c6014efaf.png)] bg-cover bg-no-repeat relative z-[22]">
                <div className="enabled_vartual_try_on try_on_active flex flex-col justify-center items-start p-1 my-auto rounded-xl">
                  <div className="switch">
                    <input type="checkbox" id="switchxxx" />
                    <label htmlFor="switchxxx">Toggle</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-4">
          <Upload
            description={
              <>
                <div className="w-full h-5 justify-center items-center gap-1.5 inline-flex">
                  <div className="text-sky-700 text-sm font-semibold font-['Inter'] leading-tight">
                    Upload Your Own Model
                  </div>
                </div>
                <div className="w-96 mt-1 text-center text-slate-600 text-xs font-normal font-['Inter'] leading-none">
                  15 Photos | Clear Face, No Accessories | This may take more
                  time to create
                </div>
              </>
            }
            onUpload={() => {
              console.log("module upload success");
            }}
          ></Upload>
        </div>

        <Scrollable
          style={{
            position: "relative",
            height: "640px",
            borderBottomLeftRadius: "var(--p-border-radius-200)",
            borderBottomRightRadius: "var(--p-border-radius-200)",
          }}
        >
          {listboxMarkup}
        </Scrollable>
      </Card>
    </div>
  );
};

export default ThumbnailSelector;