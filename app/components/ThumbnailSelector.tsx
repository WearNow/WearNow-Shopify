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

interface DataType {
  label: string;
  id: string;
  value: string;
  img: string;
  tags: string[];
}

// const segments: DataType[] = [
//   {
//     label: 'Model 1',
//     id: 'gid://shopify/CustomerSegment/1',
//     value: '0',
//     img: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/Model_1.png?v=1715483175',
//     tags: ['Dark skin', 'Small Size']
//   },
//   {
//     label: 'Model 2',
//     id: 'gid://shopify/CustomerSegment/2',
//     value: '1',
//     img: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/Model_2.png?v=1715483175',
//     tags: ['Pale skin', 'Medium Size']
//   },
//   {
//     label: 'Model 3',
//     id: 'gid://shopify/CustomerSegment/3',
//     value: '2',
//     img: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/Model_3.png?v=1715483177',
//     tags: ['Pale skin', 'Medium Size']
//   },
//   {
//     label: 'Model 4',
//     id: 'gid://shopify/CustomerSegment/4',
//     value: '3',
//     img: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/Model_4.png?v=1715483175',
//     tags: ['Pale skin', 'Medium Size']
//   }
// ];

// const lazyLoadSegments = Array.from(Array(10)).map((_, index) => {
//   let tmp = { ...segments[index % segments.length] };
//   tmp.id = `gid://shopify/CustomerSegment/${index + segments.length + 1}`;
//   tmp.value = `${index + segments.length}`;
//   return tmp;
// });

// segments.push(...lazyLoadSegments);

const ThumbnailSelector: React.FC<{
  modelSelectId: string;
  setSelectModelId: any;
  ModuleData: DataType[];
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

  const listboxItemMarkup = (seg: DataType) => (
    <div
      className="w-56 flex"
      key={seg.id}
      onClick={() => {
        onClickHandle(seg.value);
      }}
      style={
        isSelected(seg.value) ? listboxItemSelectedStyle : listboxItemStyle
      }
    >
      <Card>
        <Bleed marginInline="400" marginBlock="400">
          <Image
            source={seg.img}
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
                {seg.label}
              </div>
            </div>
            <div className="pt-2 gap-2 flex">
              {seg.tags.map((tag, idx) => (
                <Badge key={idx} size="large">
                  {tag}
                </Badge>
              ))}
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
        overflowY: "scroll",
      }}
    >
      <Card background="bg-surface-secondary">
        <div style={{ margin: 10 }}>
          <InlineStack blockAlign="start">
            <div>
              <Text as="h2" variant="headingSm">
                Model Librayl
              </Text>
            </div>

            <div
              style={{
                display: "Flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                right: 60,
              }}
            >
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
          </InlineStack>
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
                <div className="w-96 text-center text-slate-600 text-xs font-normal font-['Inter'] leading-none">
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
