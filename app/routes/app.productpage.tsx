import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  Checkbox,
  TextField,
  SkeletonThumbnail,
  SkeletonBodyText,
  SkeletonDisplayText,
} from "@shopify/polaris";
import axios from "axios";
import Dashboard from "~/components/Dashboard";
import DashboardHeader from "~/components/DashboardHeader";
import DashboardModal from "~/components/DashboardModel";
import SidebarNavigation from "~/components/SidebarNavigation";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

import { authenticate } from "../shopify.server";
import { useLoaderData, useNavigate } from "@remix-run/react";
import client from "../services/ApolloClient";
import gql from "graphql-tag";
import { fetchActivePlan } from "~/apis/plan";
import { fetchUsage } from "~/apis/usage";
import UsageComponent from "~/components/Usage";
import { apiURL } from "~/services/Services";
import SkeletonProduct from "~/components/SkeletonProduct";
import SkeletonText from "~/components/SkeletonText";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const admin1 = await authenticate.admin(request);
  const { shop } = admin1.session ?? null;

  let auth_session = {};
  console.log(shop, "hsop shop");
  await client
    .query({
      query: gql`
        query MyQuery2($shop: String!) {
          session(limit: 10, where: { shop_id: { _eq: $shop } }) {
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
              extension_enabled
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
      auth_session = result?.data.session[0] ?? result?.data.session;
      console.log(result.data.session, "apollo client");
    });
  const authWithShop = {
    ...auth_session,
    shop: shop,
    tryOn: false,
  };
  console.log(authWithShop, "auth session");

  return { authWithShop };
};

export default function ProductPage() {
  const sessionData = useLoaderData<typeof loader>();

  const [progress1, setProgress1] = React.useState(0);
  const [progressMax1, setProgressMax1] = React.useState(0);
  const [progress2, setProgress2] = React.useState(0);
  const [progressMax2, setProgressMax2] = React.useState(0);
  const [products, setProducts] = React.useState<any>([]);
  const [fullData, setFullData] = React.useState<string>("");
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const Naviagte = useNavigate();

  const [loading, setLoading] = React.useState(true);
  const [usageLoading, setUsageLoading] = React.useState(true);

  const fetchProducts = async () => {
    await client
      .query({
        query: gql`
          query MyQuery3($storeid: uuid!) {
            store_products(limit: 50, where: { store_id: { _eq: $storeid } }) {
              store_id
              title
              uuid
              variant_id
              product_id
              images
              price
              sku
              vto_enabled
            }
          }
        `,
        variables: {
          storeid: sessionData.authWithShop.store_id,
        },
      })
      .then((result) => {
        var store_products = result.data.store_products;
        // Map over store_products to create a new array with the added 'image' property
        const updatedStoreProducts = store_products.map(
          (sp: any, index: number) => {
            // Assuming sp.images is already a JSON string that needs to be parsed
            let images = sp.images.replace("[{'url': '", "");
            images = images.replace("'}]", "");
            console.log("images: :::", images);
            if (sp.vto_enabled == true) {
              setCheckedItems((prevState) => ({
                ...prevState,
                [sp.uuid]: true,
              }));
            }
            return {
              ...sp, // Spread the existing properties of the product
              image: images, // Add the new image property
            };
          }
        );
        setProducts(updatedStoreProducts);
        setLoading(false)
        console.log("apollo client store id: :::", updatedStoreProducts);
      });
  };
  useEffect(() => {
    console.log(sessionData, "session data in main Index session");
    if (sessionData.authWithShop?.state != "active") {
      Naviagte("/app/plan", { replace: true });
    }
    fetchProducts();
  }, [sessionData]);
  const [checked, setChecked] = useState(false);
  // const handleChange = useCallback(
  //   (newChecked: boolean) => setChecked(newChecked),
  //   []
  // );
  const fetchProductData = async (inputQueryValue: string) => {
    console.log(inputQueryValue, "inputQueryValue");
    try {
      const data = JSON.stringify({
        queryfor: "productData",
        first: 1,
        fields: "*",
        pagination: "yes",
        shop: sessionData.authWithShop.shop,
        searchQuery: inputQueryValue,
      });
      console.log(data, "data sending for the quey");
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiURL}api/query`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios
        .request(config)
        .then((response: any) => {
          console.log(response, "response from graphql api");
          setFullData(response.data.response);
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {}
  };
  const handleChange = useCallback(
    async (productId: string) => {
      console.log(productId, "productId=" + productId);
      const product = products.filter((p: any) => p.uuid == productId);
      console.log(product, "Pordductsasdfa", checkedItems[productId]);
      const mutation = gql`
        mutation MyMutation13(
          $uuid: uuid
          $vto_enabled: Boolean
          $full_data: String
        ) {
          update_store_products(
            where: { uuid: { _eq: $uuid } }
            _set: { vto_enabled: $vto_enabled, full_data: $full_data }
          ) {
            affected_rows
            returning {
              full_data
              vto_enabled
            }
          }
        }
      `;

      if (checkedItems[productId]) {
        const result = await client.mutate({
          mutation: mutation,
          fetchPolicy: "network-only",
          variables: {
            uuid: productId,
            vto_enabled: !checkedItems[productId],
            full_data: null,
          },
        });
      } else {
        fetchProductData(
          product[0]?.product_id.replace("gid://shopify/Product/", "")
        );
        console.log(fullData, "Full DAta");
        const result = await client.mutate({
          mutation: mutation,
          fetchPolicy: "network-only",
          variables: {
            uuid: productId,
            vto_enabled: !checkedItems[productId],
            full_data: fullData,
          },
        });
        console.log(result);
      }
      setCheckedItems((prevState) => ({
        ...prevState,
        [productId]: !prevState[productId],
      }));
    },
    [checkedItems, fullData]
  );
  const [value, setValue] = useState("200");

  const handleChangeData = useCallback(
    (newValue: string) => setValue(newValue),
    []
  );

  useEffect(() => {
    console.log(sessionData, "session data");
    console.log(sessionData.authWithShop.store_id, "store_id");
    const store_id = sessionData.authWithShop.store_id;

    const fetchData = async () => {
      const activePlan = await fetchActivePlan(store_id);
      const usage = await fetchUsage(store_id);
      console.log(activePlan, ":::activePlan");
      console.log(usage, ":::usage");
      // 使用获取到的数据
      setProgressMax1(activePlan.package?.vto_limit);
      setProgressMax2(activePlan.package?.product_photo_limit);
      setProgress1(usage?.vto_usage_count || 0);
      setProgress2(usage?.product_photos_usage_count || 0);


      setUsageLoading(false)
    };

    fetchData();
  }, []);



  

  const normalizeComponent = products?.map((product: any) => (
    <>
      <tr
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid #bebcbf",
        }}
      >
        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
          <div className="inline-flex items-center gap-x-3">
            <div className="flex items-center gap-x-2">
              <img
                className="object-cover w-[40px] h-[40px] rounded-lg"
                src={product.image}
                alt={product.title}
              />
              <div>
                <h2 className="text-sm font-medium text-gray-800 dark:text-black product_title_table">
                  {product.title}
                </h2>
              </div>
            </div>
          </div>
        </td>
        <td className="px-4 py-4 text-sm text-[#0c5132] ">
          <div className="read_to_create flex w-[107px] h-[20px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center flex-nowrap bg-[#cdfee1] rounded-[8px] relative  my-0">
            <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#0c5132] relative text-left whitespace-nowrap">
              Ready to create
            </span>
          </div>
        </td>
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <Checkbox
            label=""
            value={`${product.uuid}`}
            checked={checkedItems[`${product.uuid}`]}
            onChange={() => handleChange(`${product.uuid}`)}
          />
        </td>
        <td
          className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
          style={{ position: "relative", zIndex: "0" }}
        >
          <TextField
            label=""
            type="number"
            value={value}
            onChange={handleChangeData}
            autoComplete="off"
          />
        </td>
        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          <span>20</span>
        </td>
      </tr>
    </>
  ));

  return (
    <>
      <DashboardHeader />
      <SidebarNavigation />
      {!sessionData?.authWithShop?.store?.extension_enabled && (
      <DashboardModal />
    )}
      <div className="product_page_container">
        <div className="product_page_row">
          <div className="product_page_row_content w-full">
            <div className="flex w-full justify-between items-start flex-nowrap relative mx-auto my-0 mb-2">
              <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap">
                Virtual Try-On Experiences Used
              </span>
              <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap z-[1]">
              {usageLoading ? <SkeletonText className="w-[50px] h-[18px]" /> : <span>{progress1}/{progressMax1 || " ∞"}</span>}
              </span>
            </div>
            <UsageComponent progress={progress1} progressMax={progressMax1} />
          </div>
          <div className="product_page_row_content w-full">
            <div className="flex w-full justify-between items-start flex-nowrap relative mx-auto my-0 mb-2">
              <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap">
                Product Photos Created
              </span>
              <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap z-[1]">
                {usageLoading ? <SkeletonText className="w-[50px] h-[18px]" /> : <span>{progress2}/{progressMax2 || " ∞"}</span>}
                </span>
            </div>
            <UsageComponent progress={progress2} progressMax={progressMax2} />
          </div>
        </div>
        <section
          className="container mx-auto mt-6 product_page_table_content"
          style={{ maxWidth: "100%" }}
        >
          <div className="flex flex-col">
            <div className=" overflow-x-auto">
              <div className="inline-block w-full align-middle lg:px-[36px]">
                <div
                  className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
                  style={{ borderColor: "rgb(208 209 211)" }}
                >
                  <table className="product_page_table w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead
                      className="bg-gray-50 dark:bg-gray-800"
                      style={{
                        background: "#FFFFFF",
                        borderBottom: "1px solid #bebcbf",
                      }}
                    >
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div
                            className="flex items-center gap-x-3"
                            style={{ gap: "64px" }}
                          >
                            <div className="flex ">
                              <h3>Product</h3>
                              <button className="flex items-center gap-x-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M10.6339 4.36612C10.1457 3.87796 9.35427 3.87796 8.86612 4.36612L6.21967 7.01256C5.92678 7.30546 5.92678 7.78033 6.21967 8.07322C6.51256 8.36612 6.98744 8.36612 7.28033 8.07322L9.75 5.60355L12.2197 8.07322C12.5126 8.36612 12.9874 8.36612 13.2803 8.07322C13.5732 7.78033 13.5732 7.30546 13.2803 7.01256L10.6339 4.36612Z"
                                    fill="#CCCCCC"
                                  />
                                  <path
                                    d="M13.2803 13.0734L10.6339 15.7198C10.1457 16.208 9.35427 16.208 8.86612 15.7198L6.21967 13.0734C5.92678 12.7805 5.92678 12.3056 6.21967 12.0127C6.51256 11.7198 6.98744 11.7198 7.28033 12.0127L9.75 14.4824L12.2197 12.0127C12.5126 11.7198 12.9874 11.7198 13.2803 12.0127C13.5732 12.3056 13.5732 12.7805 13.2803 13.0734Z"
                                    fill="#4A4A4A"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Photo Studio
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Activate Virtual Try-On
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Number of VTO Experiences Allocated
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          VTO Experiences Created
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                      style={{ background: "#fffcfc" }}
                    ></tbody>
                    {loading ? (
                      <>
                        <SkeletonProduct />
                        <SkeletonProduct />
                        <SkeletonProduct />
                        <SkeletonProduct />
                        <SkeletonProduct />
                      </>
                    ) : (
                      normalizeComponent
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-end	 mt-6"
            style={{ background: "#F7F7F7" }}
          >
            <div
              className="footer_table flex items-center justify-between pr-4"
              style={{ width: "fit-content" }}
            >
              <a
                href="#"
                className="flex items-center px-2 py-2 text-sm text-gray-700 capitalize transition-colors duration-200   gap-x-2  dark:text-gray-200 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="29"
                  viewBox="0 0 28 29"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.7803 19.0303C16.0732 18.7374 16.0732 18.2626 15.7803 17.9697L12.3107 14.5L15.7803 11.0303C16.0732 10.7374 16.0732 10.2626 15.7803 9.96967C15.4874 9.67678 15.0126 9.67678 14.7197 9.96967L10.7197 13.9697C10.4268 14.2626 10.4268 14.7374 10.7197 15.0303L14.7197 19.0303C15.0126 19.3232 15.4874 19.3232 15.7803 19.0303Z"
                    fill="#4A4A4A"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center px-2 py-2 text-sm text-gray-700 capitalize transition-colors duration-200   gap-x-2  dark:text-gray-200 dark"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="29"
                  viewBox="0 0 28 29"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.7197 9.96967C11.4268 10.2626 11.4268 10.7374 11.7197 11.0303L15.1893 14.5L11.7197 17.9697C11.4268 18.2626 11.4268 18.7374 11.7197 19.0303C12.0126 19.3232 12.4874 19.3232 12.7803 19.0303L16.7803 15.0303C17.0732 14.7374 17.0732 14.2626 16.7803 13.9697L12.7803 9.96967C12.4874 9.67678 12.0126 9.67678 11.7197 9.96967Z"
                    fill="#4A4A4A"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
function Code({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
