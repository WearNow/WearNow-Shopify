import {
  Badge,
  Bleed,
  BlockStack,
  Box,
  Card,
  Image,
  InlineGrid,
  InlineStack,
  Tabs,
  Scrollable,
  Text,
} from "@shopify/polaris";
import React, { useState,useCallback } from "react";

import { EmptyState } from "@shopify/polaris";
import client from "../services/ApolloClient";
import gql from "graphql-tag";

import Upload from "./Upload";

const ThumbnailSelector: React.FC<{
  modelSelectId: String;
  setSelectModelId: any;
  ModuleData: any;
  active: any;
  handleChange:any;
  title: String;
}> = ({ modelSelectId, setSelectModelId, ModuleData, active, handleChange, title }) => {
  const isSelected = (index: string) => index === modelSelectId;

  // const segments = ModuleData
  console.log("module Data: =>", ModuleData);
  console.log("active: =>", active);
  const onClickHandle = (e: any) => {
    setSelectModelId(e);
  };
  const onUpload = async(event: any) => {
    console.log(event,"s3 upload complete");
    const e=JSON.parse(event);
    if(e.imageUrl && e.fileName){
      const lastDotIndex = e.fileName.lastIndexOf('.');
    const filename= e.fileName.substring(0, lastDotIndex);
    let MyMutation:any;
    switch(title){
      case "Model":
        MyMutation = gql`
          mutation MyMutation($imageurl: String!, $filename: String!){
            insert_pretrained_models(objects: {cover_image: $imageurl, description:"s3", name: $filename}) {
              returning {
                cover_image
                uuid
              }
            }
          } `;
        break;
      case "Background":
         MyMutation = gql`
        mutation MyMutation($imageurl: String!, $filename: name!){
            insert_default_background(objects: {image: $imageurl, name: $filename}) {
              returning {
                uuid
                name
                image
              }
            }
        } `;
        break;
      case "Pose":
        MyMutation = gql`
        mutation MyMutation($imageurl: String!, $filename: name!){
            insert_default_pose(objects: {image: $imageurl, name: $filename}) {
              returning {
                uuid
                name
                image
              }
            }
        } `;
        break;
    }


      try {
        const result = await client.mutate({
          mutation: MyMutation,
          fetchPolicy: "network-only",
          variables: {
            imageurl: e.imageUrl??"imageurl",
            filename: filename??"fileName",
          },
        });
        console.log("database result: =>" ,result)
        handleChange(filename);
        setTimeout(() =>{
        console.log(ModuleData,"ModuleDataModuleData  ")
        switch(title){
            case "Model":
              onClickHandle(result.data.insert_pretrained_models.returning[0].uuid);
          break;
          case "Background":
            onClickHandle(result.data.insert_default_background.returning[0].uuid);
            break;
          case "Pose":
            onClickHandle(result.data.insert_default_pose.returning[0].uuid);
            break;
        }
        
      },1000)
      } catch (error) {
        console.error('Error executing mutation:', error);
      }
    

    }
    
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
      className="flex listboxItemSelectedStyle"
      key={seg.uuid}
      onClick={() => {
        onClickHandle(seg.uuid);
      }}
      style={isSelected(seg.uuid) ? listboxItemSelectedStyle : listboxItemStyle}
    >
      <Card>
        <Bleed marginInline="400" marginBlock="400">
          <Image
            source={seg.cover_image?seg.cover_image:seg.image}
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
        padding: "20px",
      }}
    >
      <Card background="bg-surface-secondary" padding="500">
        <div className="mx-auto my-2">
          <div className="flex justify-start items-center">
            <div>
              <Text as="h2" variant="headingSm">
                  {title} Library
              </Text>
              {/*title!="Model" && (
                <TabsDefaultExample></TabsDefaultExample>
              )*/}
            </div>
            {title=="Model" && (
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
             )}
          </div>
        </div>
        {/*active?.customized_models && (
        // <div className="mt-4 mb-4 PPPPP">
        //   <Upload
        //     description={
        //       <>
        //         <div className="w-full h-5 justify-center items-center gap-1.5 inline-flex">
        //           <div className="text-sky-700 text-sm font-semibold font-['Inter'] leading-tight">
        //             Upload Your Own {title}
        //           </div>
        //         </div>
        //         {title=="Model" && (
        //         <div className="w-full mt-1 text-center text-slate-600 text-xs font-normal font-['Inter'] leading-none">
        //           15 Photos | Clear Face, No Accessories | This may take more
        //           time to create
        //         </div>
        //         )}
        //       </>
        //     }
        //     onUpload={onUpload}
        //     show="yes"
        //   ></Upload>
        // </div>
        )*/}

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