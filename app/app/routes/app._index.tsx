import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
// import { json } from "@remix-run/node";
import FirstHeader from "~/components/FirstHeader";
import SecondHeader from "~/components/SecondHeader";
import { useActionData,  useSubmit } from "@remix-run/react";

import React, { useState, useEffect } from "react";

import { authenticate } from "../shopify.server";
import CustomSlider from "~/components/CustomSilder";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
    query getProducts {
      products (first: 250) {
        edges {
          node {
            id
            title
          }
        }
      }
    }`,
  );

  const data = await response.json();
  return { data };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const body = await request.formData();
  const inputNumber = body.get("productShowBaseOnInuptNumber");
  const searchProdcutsQuery = body.get("searchProductBaseOnTitle");
  console.log(searchProdcutsQuery)

  let convertInNum: number | null = null;
  if (inputNumber !== null) {
    convertInNum = parseInt(inputNumber as string, 10);
  }

  let graphqlQuery = `#graphql
    query getProducts {
      products`;
  if (convertInNum !== null && !isNaN(convertInNum)) {
    graphqlQuery += `(first:${convertInNum},query:"${searchProdcutsQuery}")`;
  }
  graphqlQuery += ` {
        edges {
          node {
            id
            title 
          }
        }
      }
    }`;

  const response = await admin.graphql(graphqlQuery);
  const data = await response.json();
  console.log(data);
  return { data }; // returning the GraphQL response data
};


export default function Index() {
  let submit = useSubmit();
  const productData =  useActionData<typeof action>();
  const [firstTabColor, setFirstTabColor] = useState("blue");
  const [tabStep, setTabstep] = useState("1");
  const [secondTabColor, setSecondTabColor] = useState("");
  const [inputData, setInputData] = useState<number>(5);
  const [searchInputData, setSearchInputData] = useState<string>("")
  const [activeHeader, setActiveHeader] = useState("first");
  const productTitles: string[] =
    productData?.data?.data?.products?.edges || [];


    console.log(productData ?? "productDataproductData","productData")

    useEffect(() => {
      if (searchInputData) {
        console.log("Search data received in action function: ", searchInputData); // Log search data received from child component
      }
    }, [searchInputData]);

  useEffect(() => {
    if (inputData) {
      // Automatically submit the form if inputData is available
      submit({ productShowBaseOnInuptNumber: inputData, searchProductBaseOnTitle:searchInputData }, { method: "post" });
      setInputData(inputData);
    }
  }, [inputData,searchInputData, submit]);

  const handleHeaderChange = (header: string) => {
    if (header === "first") {
      setActiveHeader(header);
      setSecondTabColor("");
      setFirstTabColor("blue");
      setTabstep("1")
    } else if (header === "second") {
      setActiveHeader(header);
      setSecondTabColor("blue");
      setFirstTabColor("green");
      setTabstep("2");
    }
  };
  return (
    <>
  <div className="container w-full" style={{ maxWidth: "100%",background:"#fff",padding:"20px 50px" }}> 
     <h1 className="mb-2 onbording_step_title">Onboarding - {tabStep} of 2 steps</h1>
      <div className="onboarding_steps  w-ful">
        <button
          onClick={() => handleHeaderChange("first")}
          style={{ backgroundColor: firstTabColor }}
        ></button>

        <button
          onClick={() => handleHeaderChange("second")}
          style={{ backgroundColor: secondTabColor }}
        ></button>
      </div>

      {activeHeader === "first" && (
        <FirstHeader
          productTitles={productTitles}
          sendDataToParent={setInputData}
          sendDataToParentToSearchValues={setSearchInputData}
        />
      )}
      {activeHeader === "second" && <SecondHeader />}
      </div>
    </>
  );
}
