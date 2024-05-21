import { Thumbnail } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import BackGroundSelector from "~/components/BackGroundSelector";
import DashboardHeader from "~/components/DashboardHeader";
import MySelect from "~/components/MySelect";
import MySetps from "~/components/MySteps";
import PhotoToShow from "~/components/PhotoToShow";
import ProductSelector from "~/components/ProductoSelector";
import ThumbnailSelector from "~/components/ThumbnailSelector";
import { useNotification } from '~/components/Notification';
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import client from "~/services/ApolloClient";
import gql from "graphql-tag";


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const  admin1  = await authenticate.admin(request);
  const {shop}  =  admin1.session ?? null
  // const auth_session = await db.session.findFirst({
  //   where: { shop },
  // });
  let auth_session={};

  console.log(shop,"hsop shop")
  await client
  .query({
    query: gql`
      query MyQuery2($shop: String!) {
        session(limit: 10, where: {shop_id: {_eq: $shop}}) {
          accessToken
          shop_id
          state
          scope
          isOnline
          expires
          store {
            name
            store_id
            onboarding_status
            uuid
            virtual_enabled
          }
          store_id
          uuid
        }
      }
    `,
    variables: {
      shop: shop,
    },
  })
  .then((result) => {
    auth_session=result?.data.session[0] ?? result?.data.session;
    console.log(result.data.session, "apollo client");
  });
  const authWithShop = {
    ...auth_session,
    shop: shop,
    tryOn:false
  };
  console.log(authWithShop,"auth session");
  
    return {authWithShop}
};

const LeftTop: React.FC = () => {
  return (
    <>
      <div className="w-full h-50 mb-6 flex-col justify-start items-start gap-4 inline-flex">
        <div className="text-neutral-800 text-4xl font-medium font-['SF Pro Display'] leading-normal">
          Create Product Photos
        </div>
        <div className="w-full text-zinc-600 text-base font-medium font-['SF Pro Display'] leading-normal">
          Take your product photos to the next level in just 4 easy steps!
        </div>
      </div>
    </>
  );
};

interface CreateProductPhotosDataModel {
  product?: string;
  photosNumber?: number;
  model?: string;
  background?: string;
  pose?: string;
}

const App: React.FC = () => {
  const sessionData = useLoaderData<typeof loader>();
  const [createProductPhotosData, setCreateProductPhotosData] =
    useState<CreateProductPhotosDataModel>({});

  const completedTitle = (
    <Thumbnail
      source="https://cdn.shopify.com/s/files/1/0641/2268/3542/files/product_black.png?v=1715481859"
      alt="Product"
    />
  );

  const [selectedNumberOfPhotos, setSelectedNumberOfPhotos] = useState("1");

  const [items, setItmes] = React.useState([
    {
      title: "Select 1 Product",
      sutitle: (
        <MySelect
          label="Select the number of photos you would like to create"
          options={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
          ]}
          onChange={setSelectedNumberOfPhotos}
        />
      ),
      completedTitle: completedTitle,
    },
    {
      title: "Select a model",
      completedTitle: completedTitle,
    },
    {
      title: "Select a background",
      completedTitle: completedTitle,
    },
    {
      title: "Select a pose",
      completedTitle: completedTitle,
    },
  ]);

  const [photos, setPhotos] = React.useState([
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img1.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106",
  ]);

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [modelSelectId, setSelectModelId] = useState("-1");
  const [backgroundSelectId, setSelectBgId] = useState("-1");

  //模特数据获取
  const getModeleDate = () => {
    interface DataType {
      label: string;
      id: string;
      value: string;
      img: string;
      tags: string[];
    }

    let segments: DataType[] = [
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
    const lazyLoadSegments = Array.from(Array(10)).map((_, index) => {
      let tmp = { ...segments[index % segments.length] };
      tmp.id = `gid://shopify/CustomerSegment/${index + segments.length + 1}`;
      tmp.value = `${index + segments.length}`;
      return tmp;
    });

    segments.push(...lazyLoadSegments);
    return segments;
  };

  //背景数据获取
  const getBackgroundDate = () => {
    interface DataType {
      label: string;
      id: string;
      value: string;
      img: string;
      tags: string[];
    }

    let bgdata: DataType[] = [
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
    const lazyLoadSegments = Array.from(Array(10)).map((_, index) => {
      let tmp = { ...bgdata[index % bgdata.length] };
      tmp.id = `gid://shopify/CustomerSegment/${index + bgdata.length + 1}`;
      tmp.value = `${index + bgdata.length}`;
      return tmp;
    });

    bgdata.push(...lazyLoadSegments);
    return bgdata;
  };

  const renderRight = () => {
    switch (currentStep) {
      case 0:
        return <ProductSelector sessionData={sessionData} />;
      case 1:
        return (
          <ThumbnailSelector 
            modelSelectId={modelSelectId}
            setSelectModelId={setSelectModelId}
            ModuleData={getModeleDate()}
          />
        );
      case 2:
        return (
          <BackGroundSelector
            backgroundSelectId={backgroundSelectId}
            setSelectBgId={setSelectBgId}
            BgData={getBackgroundDate()}
          />
        );
      case 3:
        return (
          <BackGroundSelector
            backgroundSelectId={backgroundSelectId}
            setSelectBgId={setSelectBgId}
            BgData={getBackgroundDate()}
          />
        );
      default:
        return <PhotoToShow photos={photos} />;
    }
  };

const { showNotification } = useNotification();  

  return (
    <div className="bg-white h-full">
      <DashboardHeader />
      <div className="lg:w-[1272px] lg:pl-10 lg:p min-h-[755px] lg:m-auto flex flex-wrap  ">
        <div className="lg:w-1/2 max-lg:ml-0 max-lg:w-full max-lg:mt-10">
          <LeftTop />
          <MySetps
            items={items}
            currentStep={currentStep}
            onNext={(step) => {
              showNotification({
                type: "warning",
                message: '"Please upload [15-current amount] more images"'
              })
              
              setCurrentStep(step + 1);
            }}
          />
        </div>
        <div className="lg:w-[528px] lg:h-[715px] max-lg:ml-0 max-lg:w-full max-lg:mt-10">
          {renderRight()}
        </div>
      </div>
    </div>
  );
};

export default App;
