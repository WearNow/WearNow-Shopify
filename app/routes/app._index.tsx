import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
// import { json } from "@remix-run/node";
import FirstHeader from "~/components/FirstHeader";
import SecondHeader from "~/components/SecondHeader";
// import { useActionData,  useSubmit } from "@remix-run/react";
import  { useEffect, useState } from "react";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import db from "../db.server";



export const loader = async ({ request }: LoaderFunctionArgs) => {
  const  admin  = await authenticate.admin(request);
  const {shop}  =  admin.session ?? null
  const auth_session = await db.session.findFirst({
    where: { shop },
  });
  const myHeaders = new Headers();
myHeaders.append("content-type", "application/json");
myHeaders.append("x-hasura-admin-secret", "sau1XI9_2o0=&mxuY6P$*o");

const graphql = JSON.stringify({
  query: `mutation MyMutation {\r\n  insert_session(objects: {accessToken: "${auth_session?.accessToken}", created_at: "2024-05-13 4:40:00", isOnline: ${auth_session?.isOnline}, scope: "${auth_session?.scope}", shop_id: "${auth_session?.shop}",state:"1234",expires:"2025-05-13 4:40:00"})\r\n  {\r\n    returning {\r\n      accessToken\r\n    }\r\n    }\r\n}\r\n`,
  variables: {}
})
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: graphql,
  redirect: "follow"
};

await fetch("https://graphql.wearnow.ai/v1/graphql", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  console.log("requestOptionsrequestOptions",requestOptions);
  
    return {auth_session}
};




export default function Index() {
  const sessionData = useLoaderData<typeof loader>();
  const [firstTabColor, setFirstTabColor] = useState("blue");
  const [tabStep, setTabstep] = useState("1");
  const [secondTabColor, setSecondTabColor] = useState("");
  const [activeHeader, setActiveHeader] = useState("first");

    useEffect(() =>{
    if (activeHeader === "first") {
      setActiveHeader(activeHeader);
      setSecondTabColor("");
      setFirstTabColor("blue");
      setTabstep("1")
    } else if (activeHeader === "second") {
      setActiveHeader(activeHeader);
      setSecondTabColor("blue");
      setFirstTabColor("green");
      setTabstep("2");
    }
  },[activeHeader])
  
  return (
    <>
  <div className="container w-full" style={{ maxWidth: "100%",background:"#fff",padding:"20px 50px" }}> 
     <h1 className="mb-2 onbording_step_title">Onboarding - {tabStep} of 2 steps</h1>
      <div className="onboarding_steps  w-ful">
        <button
          style={{ backgroundColor: firstTabColor }}
        ></button>

        <button
          style={{ backgroundColor: secondTabColor }}
        ></button>
      </div>

      {activeHeader === "first" && (
        <FirstHeader sessionData={sessionData} onActivate={() => {setActiveHeader("second");}}/>
      )}
      {activeHeader === "second" && <SecondHeader sessionData={sessionData} onActivate={() => {setActiveHeader("first");}}/>}
      </div>
    </>
  );
}
