import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
// import { json } from "@remix-run/node";
import FirstHeader from "~/components/FirstHeader";
import SecondHeader from "~/components/SecondHeader";
// import { useActionData,  useSubmit } from "@remix-run/react";
import  { useState } from "react";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import db from "../db.server";



export const loader = async ({ request }: LoaderFunctionArgs) => {
  const  admin  = await authenticate.admin(request);
  console.log(admin.session,"admin.sessionadmin.sessionadmin.sessionadmin.session")
  const {shop}  =  admin.session ?? null
  const auth_session = await db.session.findFirst({
    where: { shop },
  });
  console.log(auth_session)
  return {auth_session}
};




export default function Index() {
  const sessionData = useLoaderData<typeof loader>();
  const [firstTabColor, setFirstTabColor] = useState("blue");
  const [tabStep, setTabstep] = useState("1");
  const [secondTabColor, setSecondTabColor] = useState("");
  const [activeHeader, setActiveHeader] = useState("first");

  console.log(sessionData,"session")

 


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
        <FirstHeader sessionData={sessionData}/>
      )}
      {activeHeader === "second" && <SecondHeader sessionData={sessionData}/>}
      </div>
    </>
  );
}
