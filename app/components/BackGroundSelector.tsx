import {
  Bleed,
  BlockStack,
  Box,
  Card,
  Image,
  InlineGrid,
  InlineStack,
  Pagination,
  Scrollable,
  Tabs,
  Text
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import Upload from "./Upload";

interface IDataType {
  label: string;
  id: string;
  value: string;
  img: string;
  tags: string[];
}

const segments: IDataType[] = [
  {
    label: "Model 1",
    id: "gid://shopify/CustomerSegment/1",
    value: "0",
    img: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/Model_1.png?v=1715483175",
    tags: ["Dark skin", "Small Size"],
  },
  {
    label: "Model 2",
    id: "gid://shopify/CustomerSegment/2",
    value: "1",
    img: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/Model_2.png?v=1715483175",
    tags: ["Pale skin", "Medium Size"],
  },
  {
    label: "Model 3",
    id: "gid://shopify/CustomerSegment/3",
    value: "2",
    img: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/Model_3.png?v=1715483177",
    tags: ["Pale skin", "Medium Size"],
  },
  {
    label: "Model 4",
    id: "gid://shopify/CustomerSegment/4",
    value: "3",
    img: "https://cdn.shopify.com/s/files/1/0641/2268/3542/files/Model_4.png?v=1715483175",
    tags: ["Pale skin", "Medium Size"],
  },
];

interface ITabProps {
  id: string;
  content: string;
  accessibilityLabel?: string;
  panelID: string;
}

const tabsData: ITabProps[] = [
  {
    id: "all-customers-1",
    content: "All",
    accessibilityLabel: "All customers",
    panelID: "all-customers-content-1",
  },
  {
    id: "recent",
    content: "Recent",
    panelID: "accepts-recent",
  },
  {
    id: "repeat-customers-1",
    content: "Gradient",
    panelID: "repeat-customers-content-1",
  },
  {
    id: "prospects-1",
    content: "Solid color",
    panelID: "prospects-content-1",
  },
  {
    id: "prospects-11",
    content: "City",
    panelID: "prospects-content-1",
  },
];

const lazyLoadSegments = Array.from(Array(10)).map((_, index) => {
  let tmp = { ...segments[index % segments.length] };
  tmp.id = `gid://shopify/CustomerSegment/${index + segments.length + 1}`;
  tmp.value = `${index + segments.length}`;
  return tmp;
});

segments.push(...lazyLoadSegments);

const BackGroundSelector: React.FC<{
  backgroundSelectId: string;
  setSelectBgId: any;
  BgData: any;
}> = ({ backgroundSelectId, setSelectBgId, BgData }) => {
  const isSelected = (index: string) => index === backgroundSelectId;

  const onClickHandle = (e: any) => {
    setSelectBgId(e);
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
      key={seg.uuid}
      onClick={() => {
        onClickHandle(seg.uuid);
      }}
      style={
        isSelected(seg.uuid) ? listboxItemSelectedStyle : listboxItemStyle
      }
    >
      <Card>
        <Bleed marginInline="400" marginBlock="400">
          <Image
            source={seg.image}
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

  const listboxMarkup = (
    <>
      <div style={{ display: "flex", width: "100%" }}>
        <SpacingBackground>
          <InlineGrid gap="400" columns={2}>
            {BgData?.map((seg:any) => listboxItemMarkup(seg))}
          </InlineGrid>
        </SpacingBackground>
      </div>
    </>
  );

  const textFieldMarkup = (
    <div className="w-full absolute bottom-0 h-12 pl-3 pr-2 bg-neutral-100">
      <div className="grow shrink basis-0 h-12 justify-end items-center flex">
        <Pagination
          hasPrevious
          onPrevious={() => {
            console.log("Previous");
          }}
          hasNext
          onNext={() => {
            console.log("Next");
          }}
        />
      </div>
    </div>
  );

  function TabsDefaultExample() {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
      (selectedTabIndex: number) => setSelected(selectedTabIndex),
      []
    );

    return (
      <Tabs
        tabs={tabsData}
        selected={selected}
        onSelect={handleTabChange}
      ></Tabs>
    );
  }

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
      <BlockStack gap="200">
        <Card background="bg-surface-secondary">
          <div style={{ margin: 10 }}>
            <InlineStack blockAlign="start">
              <div style={{ height: "50px" }}>
                <Text as="h2" variant="headingSm">
                  BackGround Library
                </Text>
                <TabsDefaultExample></TabsDefaultExample>
              </div>
            </InlineStack>
          </div>

          <div className="mt-4 mb-4">
            <Upload
              description={
                <>
                  {" "}
                  <div className="w-full h-5 justify-center items-center gap-1.5 inline-flex">
                    <div className="text-sky-700 text-sm font-semibold font-['Inter'] leading-tight">
                      Click to upload
                    </div>
                    or drag and drop
                  </div>
                  <div className="w-96 text-center text-slate-600 text-xs font-normal font-['Inter'] leading-none">
                    SVG, PNG, JPG Or GIF
                  </div>
                </>
              }
              onUpload={() => {
                console.log("background upload success");
              }}
            ></Upload>
          </div>
          <Scrollable
            style={{
              position: "relative",
              height: "566px",
              borderBottomLeftRadius: "var(--p-border-radius-200)",
              borderBottomRightRadius: "var(--p-border-radius-200)",
            }}
          >
            {listboxMarkup}
          </Scrollable>
        </Card>
      </BlockStack>
    </div>
  );
};

export default BackGroundSelector;
