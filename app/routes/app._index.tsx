import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
// import { json } from "@remix-run/node";
import FirstHeader from "~/components/FirstHeader";
import SecondHeader from "~/components/SecondHeader";
// import { useActionData,  useSubmit } from "@remix-run/react";
import  { useEffect, useState } from "react";
import { authenticate } from "../shopify.server";
import { useLoaderData, useNavigate } from "@remix-run/react";
import db from "../db.server";
import client from "../services/ApolloClient"
import gql from "graphql-tag"



export const loader = async ({ request }: LoaderFunctionArgs) => {
  const  admin1  = await authenticate.admin(request);
  const  {admin}  = await authenticate.admin(request);
  const {shop}  =  admin1.session ?? null

  const charge_id = new URL(request.url).searchParams.get('charge_id');
  const authSession = await db.session.findFirst({
    where: { shop },
  });  
  console.log("charge_id ---->>>===>>>",charge_id);
  if (charge_id) {
    if(authSession?.state!='active' && authSession?.userId=='gid://shopify/AppSubscription/'+charge_id){
      console.log("authSession?.userId ---->>>===>>>",authSession?.userId);
      const updated = await db.session.update({
        where: { id: authSession?.id },
        data: { /* pass the new car informations here */
          state: 'active'
        },
      })
      console.log(updated, "updatedupdatedupdatedupdated")
      const MY_MUTATIONDEL = gql`
       mutation MyMutation6($shop:String!) {
        update_session(where: {shop_id: {_eq: $shop}}, _set: {state: "active"}) {
          returning {
            state
            shop_id
          }
        }
      }`;
        
          try {
            const result = await client.mutate({
              mutation: MY_MUTATIONDEL,
              variables: {           
                shop: shop
              },
            });
            console.log('Mutation result Update:', result);
          } catch (error) {
            console.error('Error executing mutation:', error);
          }
      
    }
  }
  
  const response = await admin.graphql(
    `#graphql
     query {
          products (first: 50) {
          edges {
            node { 
              id
              title 
            images(first: 10) {
              nodes {
                src
              }
            }
            variants(first: 10) {
              nodes {
                id
                image {
                  src
                  id
                }
                title
              }
            }
          }
          }
        }
      }`
  );
  const responseJson = await response.json();

  let auth_session={};
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
    ,fetchPolicy: "network-only",
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
    tryOn:false,
    products:responseJson
  };
  console.log(authWithShop,"auth session");
  
    return {authWithShop}
};




export default function Index() {
  const sessionData = useLoaderData<typeof loader>();
  const [firstTabColor, setFirstTabColor] = useState("blue");
  const [tabStep, setTabstep] = useState("1");
  const [secondTabColor, setSecondTabColor] = useState("");
  const [activeHeader, setActiveHeader] = useState("first");
  const Naviagte = useNavigate()
  useEffect(() =>{
  console.log(sessionData,"session data in main Index session");
      if(sessionData.authWithShop?.state!='active')
      {
        Naviagte('plan',{replace: true});
      }
    },[sessionData]);
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
  {sessionData.authWithShop?.state!='active' ?(
    <div className='main-container flex w-full pt-[60px] pr-[10px] pb-[60px] pl-[10px] flex-col gap-[30px] items-center flex-nowrap bg-[#fff] relative mx-auto my-0'>
    <div className='billing_content flex w-full h-[85px] flex-col gap-[16px] items-center shrink-0 flex-nowrap  top-[38px] left-[134.5px]'>
      <span className="flex w-[325px] h-[45px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[36px] font-medium leading-[45px] text-[#1d2127] relative text-center ">
        Redirecting to Billing Page, You need to choose a plan to use our services
      </span>
      
    </div>
    </div>
  ):(
  <div className="onbording_step_container container w-full" style={{ maxWidth: "100%",background:"#fff",padding:"20px 50px" }}> 
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
      )}
    </>
  );
}
