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
} from "@shopify/polaris";
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

  const Naviagte = useNavigate();
  useEffect(() => {
    console.log(sessionData, "session data in main Index session");
    if (sessionData.authWithShop?.state != "active") {
      Naviagte("/app/plan", { replace: true });
    }
  }, [sessionData]);
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    []
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
      setProgressMax1(activePlan.package.vto_limit);
      setProgressMax2(activePlan.package.product_photo_limit);
      setProgress1(usage.vto_usage_count);
      setProgress2(usage.product_photos_usage_count);
    };

    fetchData();
  }, []);
  return (
    <>
      <DashboardHeader />
      <SidebarNavigation />
      <DashboardModal />
      <div className="product_page_container">
        <div className="product_page_row">
          <div className="product_page_row_content w-full">
            <div className="flex w-full justify-between items-start flex-nowrap relative mx-auto my-0 mb-2">
              <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap">
                Virtual Try-On Experiences Used
              </span>
              <span className="h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[18px] text-[#232934] relative text-left whitespace-nowrap z-[1]">
                {progress1}/{progressMax1}
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
                {progress2}/{progressMax2}
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
                            <Checkbox
                              label=""
                              checked={checked}
                              onChange={handleChange}
                            />
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
                    >
                      <tr
                        style={{
                          background: "#FFFFFF",
                          borderTop: "1px solid #bebcbf",
                        }}
                      >
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <Checkbox
                              label=""
                              checked={checked}
                              onChange={handleChange}
                            />
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-[40px] h-[40px] rounded-lg"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                alt=""
                              />
                              <div>
                                <h2 className="text-sm font-medium text-gray-800 dark:text-black product_title_table">
                                  [Product Name]
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
                            checked={checked}
                            onChange={handleChange}
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
                      <tr
                        style={{
                          background: "#FFFFFF",
                          borderTop: "1px solid #bebcbf",
                        }}
                      >
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <Checkbox
                              label=""
                              checked={checked}
                              onChange={handleChange}
                            />
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-[40px] h-[40px] rounded-lg"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                alt=""
                              />
                              <div>
                                <h2 className="text-sm font-medium text-gray-800 dark:text-black product_title_table ">
                                  [Product Name]
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
                            checked={checked}
                            onChange={handleChange}
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
                          <span>0</span>
                        </td>
                      </tr>
                      <tr
                        style={{
                          background: "#FFFFFF",
                          borderTop: "1px solid #bebcbf",
                        }}
                      >
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <Checkbox
                              label=""
                              checked={checked}
                              onChange={handleChange}
                            />
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-[40px] h-[40px] rounded-lg"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                alt=""
                              />
                              <div>
                                <h2 className="text-sm font-medium text-gray-800 dark:text-black product_title_table ">
                                  [Product Name]
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
                            checked={checked}
                            onChange={handleChange}
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
                      <tr
                        style={{
                          background: "#FFFFFF",
                          borderTop: "1px solid #bebcbf",
                        }}
                      >
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <Checkbox
                              label=""
                              checked={checked}
                              onChange={handleChange}
                            />
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-[40px] h-[40px] rounded-lg"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                alt=""
                              />
                              <div>
                                <h2 className="text-sm font-medium text-gray-800 dark:text-black product_title_table ">
                                  [Product Name]
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
                            checked={checked}
                            onChange={handleChange}
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
                          <span>0</span>
                        </td>
                      </tr>
                      <tr
                        style={{
                          background: "#FFFFFF",
                          borderTop: "1px solid #bebcbf",
                        }}
                      >
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <Checkbox
                              label=""
                              checked={checked}
                              onChange={handleChange}
                            />
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-[40px] h-[40px] rounded-lg"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                alt=""
                              />
                              <div>
                                <h2 className="text-sm font-medium text-gray-800 dark:text-black product_title_table ">
                                  [Product Name]
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
                            checked={checked}
                            onChange={handleChange}
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
                      <tr
                        style={{
                          background: "#FFFFFF",
                          borderTop: "1px solid #bebcbf",
                        }}
                      >
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <Checkbox
                              label=""
                              checked={checked}
                              onChange={handleChange}
                            />
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-[40px] h-[40px] rounded-lg"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                alt=""
                              />
                              <div>
                                <h2 className="text-sm font-medium text-gray-800 dark:text-black product_title_table ">
                                  [Product Name]
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
                            checked={checked}
                            onChange={handleChange}
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
                          <span>0</span>
                        </td>
                      </tr>
                    </tbody>
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
