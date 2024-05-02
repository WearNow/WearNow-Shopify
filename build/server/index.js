var _a;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer, Meta, Links, Outlet, ScrollRestoration, Scripts, useSubmit, useActionData, useLoaderData, Form, Link, useRouteError } from "@remix-run/react";
import { createReadableStreamFromReadable, json, redirect } from "@remix-run/node";
import { isbot } from "isbot";
import "@shopify/shopify-app-remix/adapters/node";
import { shopifyApp, ApiVersion, AppDistribution, DeliveryMethod, LoginErrorType, boundary } from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-04";
import { PrismaClient } from "@prisma/client";
import { useState, useRef, useEffect } from "react";
import { AppProvider, Page, Card, FormLayout, Text, TextField, Button } from "@shopify/polaris";
import { AppProvider as AppProvider$1 } from "@shopify/shopify-app-remix/react";
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
}
const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.April24,
  scopes: (_a = process.env.SCOPES) == null ? void 0 : _a.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks"
    }
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify.registerWebhooks({ session });
    }
  },
  future: {
    v3_webhookAdminContext: true,
    v3_authenticatePublic: true,
    v3_lineItemBilling: true,
    unstable_newEmbeddedAuthStrategy: true
  },
  ...process.env.SHOP_CUSTOM_DOMAIN ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] } : {}
});
ApiVersion.April24;
const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
const authenticate = shopify.authenticate;
shopify.unauthenticated;
const login = shopify.login;
shopify.registerWebhooks;
shopify.sessionStorage;
const ABORT_DELAY = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  addDocumentResponseHeaders(request, responseHeaders);
  const userAgent = request.headers.get("user-agent");
  const callbackName = isbot(userAgent ?? "") ? "onAllReady" : "onShellReady";
  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const stylesheet = "/assets/tailwind--0Pce7OH.css";
const links$2 = () => [
  { rel: "stylesheet", href: stylesheet }
];
function App$2() {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://cdn.shopify.com/" }),
      /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/stylesheet.css?v=1713961441" }),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        }
      ),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App$2,
  links: links$2
}, Symbol.toStringTag, { value: "Module" }));
function Billing() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "main-container flex w-full h-[877px] pt-[60px] pr-[10px] pb-[60px] pl-[10px] flex-col gap-[30px] items-center flex-nowrap bg-[#fff] relative overflow-hidden mx-auto my-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "billing_content flex w-full h-[85px] flex-col gap-[16px] items-center shrink-0 flex-nowrap absolute top-[38px] left-[134.5px]", children: [
        /* @__PURE__ */ jsx("span", { className: "flex w-[318px] h-[45px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[36px] font-medium leading-[45px] text-[#1d2127] relative text-center whitespace-nowrap z-[1]", children: "Transform your store" }),
        /* @__PURE__ */ jsx("span", { className: "flex w-[1003px] h-[24px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#52575d] relative text-center whitespace-nowrap z-[2]", children: "Power up your product display with AI-driven imagery and virtual try-on experiences." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex w-[316px] h-[52px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] gap-[8px] items-start shrink-0 flex-nowrap bg-[rgba(116,116,128,0.08)] rounded-[100px] absolute top-[153px]  z-[3]", children: [
        /* @__PURE__ */ jsx("button", { className: "flex w-[150px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#1d2127] rounded-[100px] border-none relative z-[4] pointer", children: /* @__PURE__ */ jsx("span", { className: "flex w-[57px] h-[24px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-center whitespace-nowrap z-[5]", children: "Monthly" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-[150px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[4px] justify-center items-baseline shrink-0 flex-nowrap rounded-[100px] relative z-[6]", children: [
          /* @__PURE__ */ jsx("span", { className: "flex w-[43px] h-[24px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#1d2127] relative text-center whitespace-nowrap z-[7]", children: "Yearly" }),
          /* @__PURE__ */ jsx("span", { className: "flex w-[70px] h-[18px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#1d2127] relative text-center whitespace-nowrap z-[8]", children: "40% off" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex w-[1244px] h-[546px] gap-px items-end shrink-0 flex-nowrap rounded-[16px] border-solid border border-[#e0e0e0] absolute top-[235px] overflow-hidden z-[9]", children: [
        /* @__PURE__ */ jsx("div", { className: "flex w-[414px] pt-[32px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#fff] border-solid border border-[#e5e7eb] relative overflow-hidden shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[11]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[12]", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[13]", children: /* @__PURE__ */ jsx("span", { className: "h-[30px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#6b7280] relative text-left whitespace-nowrap z-[14]", children: "Basic" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative z-[15]", children: [
              /* @__PURE__ */ jsxs("div", { className: "w-[192px] shrink-0 font-['SF_Pro_Display'] text-[48px] flex gap-2 font-black leading-[48px] relative text-left whitespace-nowrap z-[16]", children: [
                /* @__PURE__ */ jsx("span", { className: "font-['SF_Pro_Display'] text-[48px] font-thin leading-[48px] text-[#111928] relative text-left", children: "$99" }),
                /* @__PURE__ */ jsx("span", { className: "font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#111928] relative text-left", children: "$49" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#6b7280] relative text-center z-[17]", children: "/month" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[18]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[19]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-20", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[21]  mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[22]", children: "50 Products" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[23]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[24]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[25]  mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[26]", children: "1000 Try-On Experiences" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[27]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[28]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[29]  mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-30", children: "50 Product Photos" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[31]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[32]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[33]  mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[34]", children: "Access to 5 Pro Models" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[35]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[36]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[37]  mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[38]", children: "Support Team" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[39]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-40", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle2.png?v=1714636264)] bg-[length:100%_100%] bg-no-repeat relative z-[41]  mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[42]", children: "Upload Your Own Model" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[43]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[44]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle2.png?v=1714636264)] bg-[length:100%_100%] bg-no-repeat relative z-[45]  mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[46]", children: "HD Photos" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative z-[47] pointer", children: /* @__PURE__ */ jsxs("div", { className: "flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[48]", children: [
            /* @__PURE__ */ jsx("span", { className: "h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap z-[49]", children: "Start 14-Day Free Trial" }),
            /* @__PURE__ */ jsx("div", { className: "w-[5px] h-[9px] shrink-0 relative z-50", children: /* @__PURE__ */ jsx("div", { className: "w-[5.308px] h-[9px] bg-[url(../assets/images/1b104d68-1f14-4cf9-948b-3013641a3038.png)] bg-[length:100%_100%] bg-no-repeat relative z-[51] mt-[0.5px] mr-0 mb-0 ml-0" }) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxs("button", { className: "flex w-[132px] h-[25px] pt-[2px] pr-[12px] pb-[2px] pl-[12px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#e1effe] rounded-[6px] border-none absolute top-[36px] left-[163.5px] z-[138] pointer", children: [
          /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[139]", children: /* @__PURE__ */ jsx("div", { className: "w-[13.333px] h-[13.333px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/clock.png?v=1714641444)] bg-[length:100%_100%] bg-no-repeat relative z-[140] mt-[1.333px] mr-0 mb-0 ml-[1.333px]" }) }),
          /* @__PURE__ */ jsx("span", { className: "flex w-[88px] h-[21px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[21px] text-[#1e429f] relative text-center whitespace-nowrap z-[141]", children: "Early Bird Offer" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] shrink-0 absolute top-[291px] left-[228.5px] z-[145]", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full absolute top-0 left-0 overflow-hidden z-[146]", children: /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Help_icon_c9adcdff-f8e0-4024-9a2c-9b538439c7b0.png?v=1714636340)] bg-[length:100%_100%] bg-no-repeat relative z-[147] mt-[0.67px] mr-0 mb-0 ml-[0.67px]" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] shrink-0 absolute top-[203px] left-[244.5px] z-[142]", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full absolute top-0 left-0 overflow-hidden z-[143]", children: /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Help_icon_c9adcdff-f8e0-4024-9a2c-9b538439c7b0.png?v=1714636340)] bg-[length:100%_100%] bg-no-repeat relative z-[144]  mr-0 mb-0 ml-[0.67px]" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "flex w-[414px] pt-[32px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#023353] relative overflow-hidden shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] z-[52]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[53]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[54]", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[55]", children: /* @__PURE__ */ jsx("span", { className: "h-[30px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#b1d6ed] relative text-left whitespace-nowrap z-[56]", children: "Pro" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative z-[57]", children: [
              /* @__PURE__ */ jsx("span", { className: "h-[48px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#f6f6f7] relative text-left whitespace-nowrap z-[58]", children: "$499" }),
              /* @__PURE__ */ jsx("span", { className: "flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#fff] relative text-center z-[59]", children: "/month" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[60]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[61]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[62]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[63]  mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[64]", children: "250 Products" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[65]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[66]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[67] mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[68]", children: "5000 Try-On Experiences" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[69]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[70]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[71] mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[72]", children: "300 Product Photos" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[73]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[74]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[75] mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[76]", children: "Access to 20 Pro Models" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[77]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[78]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[79] mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[80]", children: "Dedicated Support Channel" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[81]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[82]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[83] mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[84]", children: "Upload Your Own Model" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[85]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[86]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle_2.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[87] mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[88]", children: "HD Photos" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative z-[89] pointer", children: /* @__PURE__ */ jsxs("div", { className: "flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[90]", children: [
            /* @__PURE__ */ jsx("span", { className: "h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap z-[91]", children: "Start 14-Day Free Trial" }),
            /* @__PURE__ */ jsx("div", { className: "w-[5px] h-[9px] shrink-0 relative z-[92]", children: /* @__PURE__ */ jsx("div", { className: "w-[5.308px] h-[9px] bg-[url(../assets/images/77b15dfe-7f0e-4813-88ad-09c6020e2db2.png)] bg-[length:100%_100%] bg-no-repeat relative z-[93] mt-[0.5px] mr-0 mb-0 ml-0" }) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx("button", { className: "flex w-[102px] h-[25px] pt-[2px] pr-[12px] pb-[2px] pl-[12px] justify-center items-center shrink-0 flex-nowrap bg-[#e1effe] rounded-[6px] border-none absolute top-[36px] left-[524.5px] z-[136] pointer", children: /* @__PURE__ */ jsx("span", { className: "flex w-[78px] h-[21px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[21px] text-[#1e429f] relative text-center whitespace-nowrap z-[137]", children: "Most Popular" }) }),
        /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] shrink-0 absolute top-[379px] left-[562.5px] z-[154]", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full absolute top-0 left-[85px] overflow-hidden z-[155]", children: /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Help_icon_c9adcdff-f8e0-4024-9a2c-9b538439c7b0.png?v=1714636340)] bg-[length:100%_100%] bg-no-repeat relative z-[156] mt-[0.67px] mr-0 mb-0 ml-[0.67px]" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] shrink-0 absolute top-[292px] left-[568.5px] z-[151]", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full absolute top-0 left-[85px] overflow-hidden z-[152]", children: /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Help_icon_c9adcdff-f8e0-4024-9a2c-9b538439c7b0.png?v=1714636340)] bg-[length:100%_100%] bg-no-repeat relative z-[153] mt-[0.67px] mr-0 mb-0 ml-[0.67px]" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] shrink-0 absolute top-[204px] left-[576.5px] z-[148]", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full absolute top-0 left-[85px] overflow-hidden z-[149]", children: /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Help_icon_c9adcdff-f8e0-4024-9a2c-9b538439c7b0.png?v=1714636340)] bg-[length:100%_100%] bg-no-repeat relative z-[150] mt-[0.67px] mr-0 mb-0 ml-[0.67px]" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "flex w-[414px] pt-[32px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#fff] rounded-tl-none rounded-tr-[8px] rounded-br-[8px] rounded-bl-none border-solid border border-[#e5e7eb] relative overflow-hidden shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] z-[94]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[95]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[96]", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[97]", children: /* @__PURE__ */ jsx("span", { className: "h-[30px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#6b7280] relative text-left whitespace-nowrap z-[98]", children: "Unlimited" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative z-[99]", children: [
              /* @__PURE__ */ jsx("span", { className: "h-[48px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#111928] relative text-left whitespace-nowrap z-[100]", children: "$1499" }),
              /* @__PURE__ */ jsx("span", { className: "flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#6b7280] relative text-center z-[101]", children: "/month" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[102]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[103]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[104]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[105] mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[106]", children: "Unlimited Products" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[107]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[108]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[109] mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[110]", children: "Unlimited Try-On Experiences" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[111]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[112]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[113] mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[114]", children: "Unlimited Product Photos" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[115]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[116]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[117]  mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[118]", children: "Access to 50 Pro Models" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[119]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[120]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[121]  mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[122]", children: "24/7 Live Support" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[123]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[124]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[125]  mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[126]", children: "Upload Your Own Model" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[127]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[128]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/check-circle.png?v=1714636065)] bg-[length:100%_100%] bg-no-repeat relative z-[129]  mr-0 mb-0 ml-[2.5px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[130]", children: "HD Photos" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative z-[131] pointer", children: /* @__PURE__ */ jsxs("div", { className: "flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[132]", children: [
            /* @__PURE__ */ jsx("span", { className: "h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap z-[133]", children: "Start 14-Day Free Trial" }),
            /* @__PURE__ */ jsx("div", { className: "w-[5px] h-[9px] shrink-0 relative z-[134]", children: /* @__PURE__ */ jsx("div", { className: "w-[5.308px] h-[9px] bg-[url(../assets/images/358a3f83-38bb-40e4-80a3-e635bc2b6bae.png)] bg-[length:100%_100%] bg-no-repeat relative z-[135] mt-[0.5px] mr-0 mb-0 ml-0" }) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] shrink-0 absolute top-[379px] left-[893.5px] z-[157]", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full absolute top-0 left-[170px] overflow-hidden z-[158]", children: /* @__PURE__ */ jsx("div", { className: "w-[14.667px] h-[14.667px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Help_icon_c9adcdff-f8e0-4024-9a2c-9b538439c7b0.png?v=1714636340)] bg-[length:100%_100%] bg-no-repeat relative z-[159] mt-[0.67px] mr-0 mb-0 ml-[0.67px]" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] shrink-0 absolute top-[204px] left-[933.5px] z-[160]", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full absolute top-0 left-[170px] overflow-hidden z-[161]", children: /* @__PURE__ */ jsx("div", { className: "w-[14.667px] h-[14.667px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Help_icon_c9adcdff-f8e0-4024-9a2c-9b538439c7b0.png?v=1714636340)] bg-[length:100%_100%] bg-no-repeat relative z-[162] mt-[0.67px] mr-0 mb-0 ml-[0.67px]" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] shrink-0 absolute top-[292px] left-[945.5px] z-[163]", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full absolute top-0 left-[182px] overflow-hidden z-[164]", children: /* @__PURE__ */ jsx("div", { className: "w-[14.667px] h-[14.667px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Help_icon_c9adcdff-f8e0-4024-9a2c-9b538439c7b0.png?v=1714636340)] bg-[length:100%_100%] bg-no-repeat relative z-[165] mt-[0.67px] mr-0 mb-0 ml-[0.67px]" }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "main-container flex w-[1244px] h-[546px] gap-px items-end flex-nowrap rounded-[16px] border-solid border border-[#e0e0e0]  overflow-hidden mx-auto my-0", children: [
      /* @__PURE__ */ jsx("div", { className: "flex w-[414.66px] pt-[32px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#fff] border-solid border border-[#e5e7eb] relative overflow-hidden shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[1]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[2]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[3]", children: /* @__PURE__ */ jsxs("span", { className: "h-[30px] flex  justify-between	 self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#6b7280] relative text-left whitespace-nowrap z-[4]", children: [
            "Basic",
            /* @__PURE__ */ jsxs("button", { className: "flex w-[132px] h-[25px] pt-[2px] pr-[12px] pb-[2px] pl-[12px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[#e1effe] rounded-[6px] border-none  z-[128] pointer", children: [
              /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[129]", children: /* @__PURE__ */ jsx("div", { className: "w-[13.333px] h-[13.333px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/clock.png?v=1714641444)] bg-[length:100%_100%] bg-no-repeat relative z-[130] mt-[1.333px] mr-0 mb-0 ml-[1.333px]" }) }),
              /* @__PURE__ */ jsx("span", { className: "flex w-[88px] h-[21px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[21px] text-[#1e429f] relative text-center whitespace-nowrap z-[131]", children: "Early Bird Offer" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative z-[5]", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-[189px] shrink-0 font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] relative text-left whitespace-nowrap z-[6]", children: [
              /* @__PURE__ */ jsx("span", { className: "font-['SF_Pro_Display'] text-[48px] font-thin leading-[48px] text-[#111928] relative text-left", children: "$59" }),
              /* @__PURE__ */ jsx("span", { className: "font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#111928] relative text-left", children: "$29" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#6b7280] relative text-center z-[7]", children: "/month" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[8]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[9]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-10", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/80061d4f-9511-47f2-b4ee-13cbd00f5e96.png)] bg-[length:100%_100%] bg-no-repeat relative z-[11] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[12]", children: "50 Products" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[13]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[14]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/5a919d21-45db-4204-9286-7854d91fb5f8.png)] bg-[length:100%_100%] bg-no-repeat relative z-[15] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[16]", children: "1000 Try-On Experiences" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[17]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[18]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/6cd25efd-093b-4600-8b07-612ab1856976.png)] bg-[length:100%_100%] bg-no-repeat relative z-[19] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-20", children: "50 Product Photos" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[21]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[22]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/440e45c0-4154-462f-9722-1a1b118b9799.png)] bg-[length:100%_100%] bg-no-repeat relative z-[23] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[24]", children: "Access to 5 Pro Models" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[25]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[26]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/7e95f7ce-2c62-459e-95ae-e34fa7785c82.png)] bg-[length:100%_100%] bg-no-repeat relative z-[27] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[28]", children: "Support Team" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[29]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-30", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/3f2820b9-be2e-42f5-9bf8-3169f6709d7a.png)] bg-[length:100%_100%] bg-no-repeat relative z-[31] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[32]", children: "Upload Your Own Model" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[33]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[34]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/7c98fced-6eda-4901-b80f-0dd355dad986.png)] bg-[length:100%_100%] bg-no-repeat relative z-[35] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[36]", children: "HD Photos" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative z-[37] pointer", children: /* @__PURE__ */ jsxs("div", { className: "flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[38]", children: [
          /* @__PURE__ */ jsx("span", { className: "h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap z-[39]", children: "Start 14-Day Free Trial" }),
          /* @__PURE__ */ jsx("div", { className: "w-[5px] h-[9px] shrink-0 relative z-40", children: /* @__PURE__ */ jsx("div", { className: "w-[5.308px] h-[9px] bg-[url(../assets/images/c402bc4e-53e4-4ba2-9e9e-904feb56d0bf.png)] bg-[length:100%_100%] bg-no-repeat relative z-[41] mt-[0.5px] mr-0 mb-0 ml-0" }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex w-[414.66px] pt-[32px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#023353] relative overflow-hidden shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] z-[42]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[43]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[44]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[45]", children: /* @__PURE__ */ jsxs("span", { className: "h-[30px] flex justify-between	 self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#b1d6ed] relative text-left whitespace-nowrap z-[46]", children: [
            "Pro",
            /* @__PURE__ */ jsx("button", { className: "flex w-[102px] h-[25px] pt-[2px] pr-[12px] pb-[2px] pl-[12px] justify-center items-center shrink-0 flex-nowrap bg-[#e1effe] rounded-[6px] border-none  z-[126] pointer", children: /* @__PURE__ */ jsx("span", { className: "flex w-[78px] h-[21px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[21px] text-[#1e429f] relative text-center whitespace-nowrap z-[127]", children: "Most Popular" }) })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative z-[47]", children: [
            /* @__PURE__ */ jsx("span", { className: "h-[48px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#f6f6f7] relative text-left whitespace-nowrap z-[48]", children: "$299" }),
            /* @__PURE__ */ jsx("span", { className: "flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#fff] relative text-center z-[49]", children: "/month" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-50", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[51]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[52]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/15dab1ea-c032-4a4a-9bb8-a9472e1bf13f.png)] bg-[length:100%_100%] bg-no-repeat relative z-[53] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[54]", children: "250 Products" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[55]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[56]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/264e1e48-71aa-4a46-b22b-9a403d44c8b8.png)] bg-[length:100%_100%] bg-no-repeat relative z-[57] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[58]", children: "5000 Try-On Experiences" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[59]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[60]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/1f26b1b3-3983-45b4-9273-1ded7cd36cee.png)] bg-[length:100%_100%] bg-no-repeat relative z-[61] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[62]", children: "300 Product Photos" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[63]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[64]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/6b3cbfdf-74c2-4c94-94ac-4759ae55bd8c.png)] bg-[length:100%_100%] bg-no-repeat relative z-[65] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[66]", children: "Access to 20 Pro Models" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[67]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[68]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/5a0a3f01-aba6-4627-8f12-a977936b95aa.png)] bg-[length:100%_100%] bg-no-repeat relative z-[69] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[70]", children: "Dedicated Support Channel" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[71]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[72]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/d5b650e4-4833-4333-b70f-3ed75f79029a.png)] bg-[length:100%_100%] bg-no-repeat relative z-[73] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[74]", children: "Upload Your Own Model" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[75]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[76]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/cab1e73a-3484-4b1c-b660-4f20472aec5f.png)] bg-[length:100%_100%] bg-no-repeat relative z-[77] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[78]", children: "HD Photos" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative z-[79] pointer", children: /* @__PURE__ */ jsxs("div", { className: "flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[80]", children: [
          /* @__PURE__ */ jsx("span", { className: "h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap z-[81]", children: "Start 14-Day Free Trial" }),
          /* @__PURE__ */ jsx("div", { className: "w-[5px] h-[9px] shrink-0 relative z-[82]", children: /* @__PURE__ */ jsx("div", { className: "w-[5.308px] h-[9px] bg-[url(../assets/images/dde63d30-74e2-4fb9-9c5b-c585109fd194.png)] bg-[length:100%_100%] bg-no-repeat relative z-[83] mt-[0.5px] mr-0 mb-0 ml-0" }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex w-[414.66px] pt-[32px] pr-[32px] pb-[32px] pl-[32px] items-start shrink-0 flex-nowrap bg-[#fff] rounded-tl-none rounded-tr-[8px] rounded-br-[8px] rounded-bl-none border-solid border border-[#e5e7eb] relative overflow-hidden shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] z-[84]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[28px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[85]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[86]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[87]", children: /* @__PURE__ */ jsx("span", { className: "h-[30px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-bold leading-[30px] text-[#6b7280] relative text-left whitespace-nowrap z-[88]", children: "Unlimited" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[320px] gap-[10px] items-end shrink-0 flex-nowrap relative z-[89]", children: [
            /* @__PURE__ */ jsx("span", { className: "h-[48px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[48px] font-black leading-[48px] text-[#111928] relative text-left whitespace-nowrap z-[90]", children: "$899" }),
            /* @__PURE__ */ jsx("span", { className: "flex w-[62px] justify-center items-end self-stretch shrink-0 font-['SF_Pro_Display'] text-[18px] font-medium leading-[27px] text-[#6b7280] relative text-center z-[91]", children: "/month" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[92]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[93]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[94]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/993568e6-d96f-4dd4-bd57-2e36d71f4e74.png)] bg-[length:100%_100%] bg-no-repeat relative z-[95] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[96]", children: "Unlimited Products" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[97]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[98]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/3efef649-42fd-443b-a906-75a914368521.png)] bg-[length:100%_100%] bg-no-repeat relative z-[99] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[100]", children: "Unlimited Try-On Experiences" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[101]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[102]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/3651ec9c-bc50-4465-80a7-1ed568e4f658.png)] bg-[length:100%_100%] bg-no-repeat relative z-[103] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[104]", children: "Unlimited Product Photos" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[105]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[106]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/863d492f-cea8-4dfd-8e14-5e91367787ee.png)] bg-[length:100%_100%] bg-no-repeat relative z-[107] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[108]", children: "Access to 50 Pro Models" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[109]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[110]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/4e97b936-cabd-4f47-acc4-b4611a3d4dd8.png)] bg-[length:100%_100%] bg-no-repeat relative z-[111] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[112]", children: "24/7 Live Support" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[113]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[114]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/8c6051a5-6c69-41a4-bd02-4ca41838a233.png)] bg-[length:100%_100%] bg-no-repeat relative z-[115] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[116]", children: "Upload Your Own Model" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex pt-[2px] pr-0 pb-[2px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[117]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[118]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/35f4dd5f-fd2a-451a-a637-f18ee2bb1a06.png)] bg-[length:100%_100%] bg-no-repeat relative z-[119] mt-[2.5px] mr-0 mb-0 ml-[2.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#6b7280] relative text-left whitespace-nowrap z-[120]", children: "HD Photos" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap border-none relative z-[121] pointer", children: /* @__PURE__ */ jsxs("div", { className: "flex pt-[11px] pr-[18px] pb-[11px] pl-[18px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[122]", children: [
          /* @__PURE__ */ jsx("span", { className: "h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap z-[123]", children: "Start 14-Day Free Trial" }),
          /* @__PURE__ */ jsx("div", { className: "w-[5px] h-[9px] shrink-0 relative z-[124]", children: /* @__PURE__ */ jsx("div", { className: "w-[5.308px] h-[9px] bg-[url(../assets/images/475b0998-a2ce-4a31-a45c-a776580c8f4c.png)] bg-[length:100%_100%] bg-no-repeat relative z-[125] mt-[0.5px] mr-0 mb-0 ml-0" }) })
        ] }) })
      ] }) })
    ] })
  ] });
}
function AdditionalPage() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Billing, {}) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdditionalPage
}, Symbol.toStringTag, { value: "Module" }));
const ProdcutModal = ({ isOpen, toggleModal, productTitles, sendDataToParentToSearchValues }) => {
  const [searchValue, setSearchValue] = useState("");
  console.log(productTitles, "data in modal");
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    sendDataToParentToSearchValues(event.target.value);
  };
  return /* @__PURE__ */ jsx("div", { className: "parent_model", children: /* @__PURE__ */ jsx("div", { className: `modal ${isOpen ? "open" : "closed"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col rounded-lg shadow-sm bg-[color:var(--p-color-bg-surface)] max-w-[620px]", children: [
    /* @__PURE__ */ jsx("div", { className: "justify-center py-3 pr-3 pl-4 text-sm leading-5 border-b border-solid bg-[color:var(--p-color-surface-tertiary)] border-neutral-200 font-[650] text-[color:var(--p-color-text)] max-md:max-w-full", children: "Select products to import" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start self-center px-5 mt-4 w-full text-sm leading-5 rounded-xl max-w-[628px] max-md:max-w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1 self-stretch max-md:flex-wrap", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-1 px-3 py-1.5 whitespace-nowrap bg-white border border-solid border-zinc-500 font-[450] rounded-[var(--p-border-radius-button)] text-[color:var(--p-color-text-secondary)] max-md:flex-wrap",
            style: { width: "74%", borderRadius: "10px" },
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  loading: "lazy",
                  src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0e4a1b0c13fb249d11f4e19cda011d281e3460ad21e2eb935e99bdf9a0cd87b2?",
                  className: "shrink-0 w-5 aspect-square",
                  alt: ""
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "text-ellipsi modal_input",
                  placeholder: "Search",
                  value: searchValue,
                  onChange: handleInputChange
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-0.5 justify-center px-3 py-1.5 shadow-sm bg-[color:var(--p-color-bg-fill)] font-[550] rounded-[var(--p-border-radius-button)] text-[color:var(--p-color-text)]", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              loading: "lazy",
              src: "https://cdn.builder.io/api/v1/image/assets/TEMP/53a28fdab9bcb208d45fcf699a0e4716ecf152e2e5d485f24c2277277929c386?",
              className: "shrink-0 my-auto w-4 aspect-square",
              alt: ""
            }
          ),
          /* @__PURE__ */ jsx("div", { children: "Most popular" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 font-[450] text-[color:var(--p-color-text)]", children: "Available products" }),
      productTitles.map((title, index2) => {
        var _a2;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-2 py-1 font-[450] text-[color:var(--p-color-text)]",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]", children: [
                /* @__PURE__ */ jsx("input", { type: "checkbox" }),
                /* @__PURE__ */ jsx("label", { htmlFor: "checkbox" })
              ] }),
              /* @__PURE__ */ jsx("div", { children: (_a2 = title == null ? void 0 : title.node) == null ? void 0 : _a2.title })
            ]
          },
          index2
        );
      })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "modal_control_btn flex gap-2 p-4 mt-4 w-full border-t border-solid bg-[color:var(--p-color-bg-surface)] border-neutral-200 max-md:flex-wrap max-md:pl-5 max-md:max-w-full", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "cursor-pointer cancel_btn justify-center px-3 py-1.5 text-xs leading-4 whitespace-nowrap shadow-sm bg-[color:var(--p-color-bg-fill)] font-[550] rounded-[var(--p-border-radius-button)] text-[color:var(--p-color-text)]",
          onClick: toggleModal,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "cursor-pointer done_btn flex flex-col justify-center px-3 py-1.5 bg-[color:var(--p-color-bg-fill-brand)] rounded-[var(--p-border-radius-button)]", children: /* @__PURE__ */ jsx("div", { className: "shrink-0 h-7 shadow-sm bg-[linear-gradient(180deg,)] rounded-[var(--p-border-radius-button)]", children: "Done" }) })
    ] })
  ] }) }) });
};
const CustomSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const goToSlide = (index2) => {
    setCurrentSlide(index2);
  };
  return /* @__PURE__ */ jsxs("div", { className: "slider", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "slides",
        style: {
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: "transform 0.5s ease-in-out"
        },
        ref: sliderRef,
        children: images.map((image, index2) => /* @__PURE__ */ jsxs("div", { className: "slide flex flex-col grow self-stretch px-8 py-5 w-full rounded-2xl bg-zinc-100 max-md:px-5 max-md:mt-10 max-md:max-w-full", style: { paddingBottom: "77px" }, children: [
          /* @__PURE__ */ jsxs("div", { className: "onboarding_carousel_slider_img", children: [
            /* @__PURE__ */ jsx("img", { className: "slider_img1", src: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106", alt: "Image 1" }),
            /* @__PURE__ */ jsx("img", { className: "slider_img2", src: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107", alt: "Image 1" }),
            /* @__PURE__ */ jsx("img", { className: "slider_img3", src: "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img1.png?v=1713943107", alt: "Image 1" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 text-3xl font-medium text-center text-zinc-800 max-md:mt-10 max-md:max-w-full", children: "Take Your Store to the Next Level" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2.5 text-base font-medium leading-6 text-center text-zinc-800 max-md:max-w-full", children: "Give your users the ability to try before they purchase and see your conversion rate skyrocket." })
        ] }))
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "dots", children: images.map((_, index2) => /* @__PURE__ */ jsx(
      "span",
      {
        className: currentSlide === index2 ? "dot active" : "dot",
        onClick: () => goToSlide(index2)
      },
      index2
    )) })
  ] });
};
const FirstHeader = ({ productTitles, sendDataToParent, sendDataToParentToSearchValues }) => {
  const [inputData, setInputData] = useState(5);
  const [modals, setModals] = useState(false);
  console.log(productTitles, "data in first Header");
  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      setInputData(newValue);
      sendDataToParent(newValue);
    } else {
      setInputData(void 0);
      sendDataToParent(void 0);
    }
  };
  const toggleModal = () => {
    setModals(!modals);
  };
  const receiveDataFromChild = (data) => {
    console.log("Data received from child:", data);
    sendDataToParentToSearchValues(data);
  };
  const images = [
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img1.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106"
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    modals && /* @__PURE__ */ jsx(
      ProdcutModal,
      {
        isOpen: modals,
        toggleModal,
        productTitles,
        sendDataToParentToSearchValues: receiveDataFromChild
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center bg-white max-md:px-5", children: /* @__PURE__ */ jsx("div", { className: "max-md:max-w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-5 max-md:flex-col max-md:gap-0", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col w-6/12 max-md:ml-0 max-md:w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col max-md:mt-10 max-md:max-w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "text-4xl font-medium text-neutral-800 max-md:max-w-full", children: "Enable Virtual Try-On" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 text-base font-medium leading-6 text-zinc-600 max-md:max-w-full", children: "Add the products you want to activate virtual try-on for and enable our widget on your store." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 justify-between py-2 mt-8 w-full font-medium max-md:flex-wrap max-md:max-w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "my-auto text-base leading-6 text-slate-800", children: "Add your products" }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "cursor-pointer flex gap-2 py-2 text-sm text-sky-600 whitespace-nowrap rounded-[999px]",
              onClick: toggleModal,
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    alt: "",
                    loading: "lazy",
                    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7cc89af2502dc60b7e5a40ab2e7cfde909366173eb23f85405e997a653a23f4d?",
                    className: "shrink-0 self-start w-4 aspect-square"
                  }
                ),
                /* @__PURE__ */ jsx("div", { children: "Add" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: " flex w-full h-[50px] pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[12px] items-center flex-nowrap bg-[#fff8f1] rounded-[8px] relative mx-auto my-0", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[12px] items-start grow shrink-0 basis-0 flex-nowrap relative", children: /* @__PURE__ */ jsx("div", { className: "flex w-full flex-col gap-[6px] items-start shrink-0 flex-nowrap relative z-[1]", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[2]", children: [
          /* @__PURE__ */ jsx("div", { className: "w-[18px] h-[18px] shrink-0 relative overflow-hidden z-[3]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/exclamation.png?v=1714397050)] bg-[length:100%_100%] bg-no-repeat relative z-[4] mt-[1.5px] mr-0 mb-0 ml-[1.5px]" }) }),
          /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#8e4b10] relative text-left whitespace-nowrap z-[5]", children: "To proceed please add products from your store" }),
          /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[6]" })
        ] }) }) }) }),
        /* @__PURE__ */ jsxs("div", { className: " flex w-full	 flex-col items-start flex-nowrap rounded-[12px] relative overflow-hidden mx-auto my-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start self-stretch shrink-0 flex-nowrap relative", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex w-[52px] flex-col items-start shrink-0 flex-nowrap relative z-[1]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex w-[52px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[2]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[40px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[3]", children: /* @__PURE__ */ jsx("div", { className: "w-[40px] h-[40px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image_2.png?v=1714052434)] bg-cover bg-no-repeat relative z-[4]" }) }) }),
              /* @__PURE__ */ jsx("div", { className: "flex w-[52px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[5]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[40px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[6]", children: /* @__PURE__ */ jsx("div", { className: "w-[40px] h-[40px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image_1.png?v=1714052433)] bg-cover bg-no-repeat relative z-[7]" }) }) }),
              /* @__PURE__ */ jsx("div", { className: "flex w-[52px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[8]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[40px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[9]", children: /* @__PURE__ */ jsx("div", { className: "w-[40px] h-[40px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image.png?v=1714052433)] bg-cover bg-no-repeat relative z-10" }) }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[11]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex pt-[16px] pr-[8px] pb-[16px] pl-[8px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[12]", children: [
                /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[13]", children: "Black Top" }),
                /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative z-[14] cursor-pointer	", children: /* @__PURE__ */ jsx("div", { className: "w-[13px] h-[14.5px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Delete.png?v=1714384615)] bg-cover bg-no-repeat relative z-[15] mt-[2.5px] mr-0 mb-0 ml-[3.5px]" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex pt-[16px] pr-[8px] pb-[16px] pl-[8px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[16]", children: [
                /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[17]", children: "White Dress" }),
                /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative z-[18] cursor-pointer	", children: /* @__PURE__ */ jsx("div", { className: "w-[13px] h-[14.5px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Delete.png?v=1714384615)] bg-cover bg-no-repeat relative z-[19] mt-[2.5px] mr-0 mb-0 ml-[3.5px]" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex pt-[16px] pr-[8px] pb-[16px] pl-[8px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-20", children: [
                /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[21]", children: "Red Top" }),
                /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative z-[22] cursor-pointer	", children: /* @__PURE__ */ jsx("div", { className: "w-[13px] h-[14.5px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Delete.png?v=1714384615)] bg-cover bg-no-repeat relative z-[23] mt-[2.5px] mr-0 mb-0 ml-[3.5px]" }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex pt-[6px] pr-[8px] pb-[6px] pl-[12px] items-center self-stretch shrink-0 flex-nowrap bg-[#f7f7f7] relative z-[24]", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end items-center grow shrink-0 basis-0 flex-nowrap relative z-[25]", children: [
            /* @__PURE__ */ jsx("div", { className: "flex w-[28px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-start shrink-0 flex-nowrap rounded-tl-[8px] rounded-tr-none rounded-br-none rounded-bl-[8px] relative z-[26]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative z-[27] cursor-pointer	", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronLeft.png?v=1714384767)] bg-cover bg-no-repeat relative z-[28] mr-0 mb-0 ml-[6.5px]" }) }) }),
            /* @__PURE__ */ jsx("div", { className: "flex w-[28px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-start shrink-0 flex-nowrap rounded-tl-none rounded-tr-[8px] rounded-br-[8px] rounded-bl-none relative z-[29]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative z-30 cursor-pointer	", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronRight.png?v=1714384785)] bg-cover bg-no-repeat relative z-[31] mr-0 mb-0 ml-[7.5px]" }) }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 justify-between py-4 mt-5 max-md:flex-wrap max-md:max-w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "text-base font-medium leading-6 text-slate-800", children: "Enable Virtual Try-On for all of these products" }),
          /* @__PURE__ */ jsx("div", { className: "enabled_vartual_try_on flex flex-col justify-center items-start p-1 my-auto rounded-xl", children: /* @__PURE__ */ jsxs("div", { className: "switch", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", id: "switch" }),
            /* @__PURE__ */ jsx("label", { htmlFor: "switch", children: "Toggle" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1 self-start px-0.5 py-1 mt-5 text-base font-medium", children: [
          /* @__PURE__ */ jsx("div", { className: "leading-[150%] text-zinc-600", children: "Default Number of Try-On Experiences Per Product" }),
          /* @__PURE__ */ jsx("div", { className: "text-rose-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "justify-center items-start p-3 mt-1 text-base leading-6 whitespace-nowrap bg-white rounded-md border border-gray-100 border-solid text-slate-800 max-md:pr-5 max-md:max-w-full", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            className: "modal_input",
            onChange: handleInputChange,
            placeholder: "5",
            value: inputData == null ? void 0 : inputData.toString()
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "self-start mt-2 text-sm tracking-normal leading-4 text-gray-600", children: "You can change this on a per product basis later" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-4 mt-6 bg-gray-100 rounded-lg max-md:max-w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 text-base leading-6 text-rose-600 max-md:flex-wrap", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                alt: "",
                loading: "lazy",
                src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a2df00a4d57b971da7afd071a3a5a9d4011244042a240bf6e8f3e18fb860bfa2?",
                className: "shrink-0 my-auto aspect-square w-[18px]"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex-1 max-md:max-w-full", children: "Virtual Try-On is not active on your store" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center mt-3 text-sm font-medium text-white rounded-3xl border border-sky-600 border-solid max-md:max-w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-0 justify-between px-3 py-2 border-2 border-solid bg-slate-800 border-slate-800 rounded-[999px] max-md:flex-wrap", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1 max-md:max-w-full", children: "Add our Try-On button to your store" }),
            /* @__PURE__ */ jsx("a", { href: "https://admin.shopify.com/store/aditya-ai/themes/163522773269/editor?context=apps", target: "_blank", children: /* @__PURE__ */ jsx(
              "img",
              {
                alt: "",
                loading: "lazy",
                src: "https://cdn.builder.io/api/v1/image/assets/TEMP/98ba2f0d189170a63991e2def95b3c6f6c743ccb44ec9445b9ef6c4c041b5dbe?",
                className: " cursor-pointer  shrink-0 self-start w-4 aspect-square"
              }
            ) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: " flex w-full pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[12px] items-center flex-nowrap bg-[#fde8eb] rounded-[8px] relative mx-auto my-0", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[12px] items-start grow shrink-0 basis-0 flex-nowrap relative", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[1]", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[2]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[18px] h-[18px] shrink-0 relative overflow-hidden z-[3]", children: /* @__PURE__ */ jsx("div", { className: "w-[15px] h-[15px] bg-[url(../assets/images/4a57b82a-fdd6-4b80-a9d6-20cb10dc0751.png)] bg-[length:100%_100%] bg-no-repeat relative z-[4] mt-[1.5px] mr-0 mb-0 ml-[1.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Rounded'] text-[16px] font-normal leading-[24px] text-[#c81e1e] relative text-left whitespace-nowrap z-[5]", children: "Uh-Oh! something’s wrong. Virtual Try-On is not active on your store" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap rounded-[24px] border-solid border border-[#047ac6] relative z-[6]", children: /* @__PURE__ */ jsxs("div", { className: "flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] justify-between items-center grow shrink-0 basis-0 flex-nowrap bg-[#e71837] rounded-[999px] border-solid border-2 border-[#2e343e] relative overflow-hidden z-[7]", children: [
            /* @__PURE__ */ jsx("span", { className: "h-[18px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap z-[8]", children: "Try again" }),
            /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[9]", children: /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/angle-right.png?v=1714396334)] bg-[length:100%_100%] bg-no-repeat relative z-10 cursor-pointer	 mr-0 mb-0 ml-[5.333px]" }) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: " flex w-full pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[12px] items-center flex-nowrap bg-[#e8f6e9] rounded-[8px] relative mx-auto my-0", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[12px] items-start grow shrink-0 basis-0 flex-nowrap relative", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[1]", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[2]", children: [
          /* @__PURE__ */ jsx("div", { className: "w-[18px] h-[18px] shrink-0 relative overflow-hidden z-[3]", children: /* @__PURE__ */ jsx("div", { className: "w-[18px] h-[18px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/exclamation_1.png?v=1714399636)] bg-[length:100%_100%] bg-no-repeat relative z-[4] mt-[1.5px] mr-0 mb-0 ml-[1.5px]" }) }),
          /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Rounded'] text-[16px] font-normal leading-[24px] text-[#046c4e] relative text-left whitespace-nowrap z-[5]", children: "Virtual Try-On is active on your store" })
        ] }) }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 justify-between self-start mt-5 text-base font-medium leading-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "cursor-pointer flex gap-2 justify-center px-5 py-2.5 text-white whitespace-nowrap bg-sky-600 rounded-[999px]", children: [
            /* @__PURE__ */ jsx("div", { children: "Continue" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                alt: "",
                loading: "lazy",
                src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a067b12d00bde436bacd3fa9d23c21d9897d579f03dd72b488684836b3eada9?",
                className: "shrink-0 my-auto aspect-[0.56] w-[5px]"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "my-auto text-zinc-600", children: "I’ll do this later" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full", children: /* @__PURE__ */ jsx(CustomSlider, { images }) })
    ] }) }) })
  ] });
};
const SecondHeader = () => {
  const images = [
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img1.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106"
  ];
  return /* @__PURE__ */ jsx("div", { className: "self-stretch second_header", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-5 max-md:flex-col max-md:gap-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex w-[768px] flex-col gap-[32px] items-start shrink-0 flex-nowrap relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex w-[768px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[1]", children: [
        /* @__PURE__ */ jsx("span", { className: "h-[45px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[36px] font-medium leading-[45px] text-[#1d2127] relative text-left whitespace-nowrap z-[2]", children: "Create Your First Product Photo" }),
        /* @__PURE__ */ jsx("span", { className: "flex w-[434px] h-[24px] justify-start items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#52575d] relative text-left whitespace-nowrap z-[3]", children: "Take your product photos to the next level in just 4 easy steps!" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex h-[481px] flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[4]", style: { display: "none" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[5]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex w-[578px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[6]", children: /* @__PURE__ */ jsxs("div", { className: "flex w-[188px] flex-col items-center shrink-0 flex-nowrap relative z-[7]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex w-[188px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[8]", children: [
              /* @__PURE__ */ jsx("button", { className: "flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#000] relative overflow-hidden z-[9] pointer", children: /* @__PURE__ */ jsx("span", { className: "flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#141718] relative text-center whitespace-nowrap z-10", children: "01" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0,0.2)] relative text-left whitespace-nowrap z-[11]", children: "Select 1 Product" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex pt-0 pr-0 pb-0 pl-[17px] gap-[30px] items-end self-stretch shrink-0 flex-nowrap relative z-[12]", children: /* @__PURE__ */ jsx("div", { className: "w-px h-[208px] shrink-0 bg-[url(../assets/images/940341d9-4145-4fcd-94b0-d43729d98b4d.png)] bg-cover bg-no-repeat relative z-[13]" }) })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[530px] h-[196px] flex-col items-start shrink-0 flex-nowrap rounded-[12px] absolute top-[56px] left-[48px] overflow-hidden z-[14]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start self-stretch shrink-0 flex-nowrap relative z-[15]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex w-[34px] flex-col items-start shrink-0 flex-nowrap relative z-[16]", children: [
                /* @__PURE__ */ jsx("div", { className: "flex w-[34px] pt-[18px] pr-[6px] pb-[18px] pl-[12px] items-center shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[24]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[16px] flex-col justify-center items-start shrink-0 flex-nowrap relative z-[25]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[16px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[26]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[16px] gap-[8px] items-start shrink-0 flex-nowrap rounded-[4px] relative z-[32]", children: /* @__PURE__ */ jsxs("div", { className: "product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox" }),
                  /* @__PURE__ */ jsx("label", { htmlFor: "checkbox" })
                ] }) }) }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[34px] pt-[18px] pr-[6px] pb-[18px] pl-[12px] items-center shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[24]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[16px] flex-col justify-center items-start shrink-0 flex-nowrap relative z-[25]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[16px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[26]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[16px] gap-[8px] items-start shrink-0 flex-nowrap rounded-[4px] relative z-[32]", children: /* @__PURE__ */ jsxs("div", { className: "product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox" }),
                  /* @__PURE__ */ jsx("label", { htmlFor: "checkbox" })
                ] }) }) }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[34px] pt-[18px] pr-[6px] pb-[18px] pl-[12px] items-center shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[29]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[16px] flex-col justify-center items-start shrink-0 flex-nowrap relative z-30", children: /* @__PURE__ */ jsx("div", { className: "flex w-[16px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[31]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[16px] gap-[8px] items-start shrink-0 flex-nowrap rounded-[4px] relative z-[32]", children: /* @__PURE__ */ jsxs("div", { className: "product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox" }),
                  /* @__PURE__ */ jsx("label", { htmlFor: "checkbox" })
                ] }) }) }) }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex w-[52px] flex-col items-start shrink-0 flex-nowrap relative z-[34]", children: [
                /* @__PURE__ */ jsx("div", { className: "flex w-[52px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[35]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[40px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[36]", children: /* @__PURE__ */ jsx("div", { className: "w-[40px] h-[40px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image_2.png?v=1714052434)] bg-cover bg-no-repeat relative z-[37]" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[52px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[38]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[40px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[39]", children: /* @__PURE__ */ jsx("div", { className: "w-[40px] h-[40px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image_1.png?v=1714052433)] bg-cover bg-no-repeat relative z-40" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[52px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[41]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[40px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[42]", children: /* @__PURE__ */ jsx("div", { className: "w-[40px] h-[40px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image.png?v=1714052433)] bg-cover bg-no-repeat relative z-[43]" }) }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[44]", children: [
                /* @__PURE__ */ jsx("div", { className: "flex pt-[16px] pr-[8px] pb-[16px] pl-[8px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[45]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[46]", children: "Black Top" }) }),
                /* @__PURE__ */ jsx("div", { className: "flex pt-[16px] pr-[8px] pb-[16px] pl-[8px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[47]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[48]", children: "White Dress" }) }),
                /* @__PURE__ */ jsx("div", { className: "flex pt-[16px] pr-[8px] pb-[16px] pl-[8px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] opacity-40 border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[49]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-50", children: "Red Top" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex pt-[6px] pr-[8px] pb-[6px] pl-[12px] items-center self-stretch shrink-0 flex-nowrap bg-[#f7f7f7] relative z-[51]", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end items-center grow shrink-0 basis-0 flex-nowrap relative z-[52]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex w-[28px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-start shrink-0 flex-nowrap rounded-tl-[8px] rounded-tr-none rounded-br-none rounded-bl-[8px] relative z-[53]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative z-[54]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronLeft.png?v=1714384767)] bg-cover bg-no-repeat relative z-[55]  mr-0 mb-0 ml-[6.5px]" }) }) }),
              /* @__PURE__ */ jsx("div", { className: "flex w-[28px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-start shrink-0 flex-nowrap rounded-tl-none rounded-tr-[8px] rounded-br-[8px] rounded-bl-none relative z-[56]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative z-[57]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronRight.png?v=1714384785)] bg-cover bg-no-repeat relative z-[58]  mr-0 mb-0 ml-[7.5px]" }) }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[530px] h-[88px] flex-col gap-[6px] items-start shrink-0 flex-nowrap absolute top-[265px] left-[48px] z-[59]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[60]", children: [
              /* @__PURE__ */ jsx("span", { className: "h-[18px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#344053] relative text-left whitespace-nowrap z-[61]", children: "Please select the number of photos you would like to create" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#cfd4dc] relative shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] z-[62]", children: [
                /* @__PURE__ */ jsx("div", { className: "flex pt-[8px] pr-0 pb-[8px] pl-[12px] gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[63]", children: /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[64]", children: /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#667084] relative text-left overflow-hidden whitespace-nowrap z-[65]", children: "4" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[44px] pt-[8px] pr-[12px] pb-[8px] pl-[12px] justify-between items-center shrink-0 flex-nowrap relative overflow-hidden z-[66]", children: /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative overflow-hidden z-[67]", children: /* @__PURE__ */ jsx("div", { className: "w-[11.666px] h-[6.667px] bg-[url(../assets/images/e9a1c8ca-24c9-4144-89cc-6bd09930c864.png)] bg-[length:100%_100%] bg-no-repeat relative z-[68] mt-[6.667px] mr-0 mb-0 ml-[4.167px]" }) }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[17.5px] text-[#475466] relative text-left whitespace-nowrap z-[69]", children: "All the photos in a creation request will have very minor changes between them" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-[176px] h-[36px] shrink-0 rounded-[100px] absolute top-[371px] left-0 z-[70]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#e7e7e7] absolute top-0 left-0 overflow-hidden z-[72]", children: /* @__PURE__ */ jsx("span", { className: "flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#b7b7b7] relative text-center whitespace-nowrap z-[73]", children: "02" }) }),
          /* @__PURE__ */ jsx("span", { className: "flex h-[24px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-normal leading-[24px] text-[#b7b7b7] tracking-[0.38px] absolute top-[6px] left-[48px] text-left whitespace-nowrap z-[71]", children: "Select a model" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-[226px] h-[36px] shrink-0 rounded-[100px] absolute top-[423px] left-0 z-[74]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#e7e7e7] absolute top-0 left-0 overflow-hidden z-[76]", children: /* @__PURE__ */ jsx("span", { className: "flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#b7b7b7] relative text-center whitespace-nowrap z-[77]", children: "03" }) }),
          /* @__PURE__ */ jsx("span", { className: "flex h-[24px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-normal leading-[24px] text-[#b7b7b7] tracking-[0.38px] absolute top-[6px] left-[48px] text-left whitespace-nowrap z-[75]", children: "Select a background" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-[165px] h-[36px] shrink-0 rounded-[100px] absolute top-[475px] left-0 z-[78]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#e7e7e7] absolute top-0 left-0 overflow-hidden z-[80]", children: /* @__PURE__ */ jsx("span", { className: "flex w-[20px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#b7b7b7] relative text-center whitespace-nowrap z-[81]", children: "04" }) }),
          /* @__PURE__ */ jsx("span", { className: "flex h-[24px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-normal leading-[24px] text-[#b7b7b7] tracking-[0.38px] absolute top-[6px] left-[48px] text-left whitespace-nowrap z-[79]", children: "Select a pose" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-[236px] h-[44px] gap-[20px] items-start shrink-0 flex-nowrap absolute top-[535px] left-0 z-[82]", children: [
          /* @__PURE__ */ jsx("button", { className: "flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer", children: /* @__PURE__ */ jsxs("div", { className: "flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]", children: [
            /* @__PURE__ */ jsx("span", { className: "h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[85]", children: "Next" }),
            /* @__PURE__ */ jsx("div", { className: "w-[5px] h-[9px] shrink-0 relative z-[86]", children: /* @__PURE__ */ jsx("div", { className: "w-[5.308px] h-[9px] bg-[url(../assets/images/91099684-9e2c-41ac-8500-9a0d3c52b427.png)] bg-[length:100%_100%] bg-no-repeat relative z-[87] mt-[0.5px] mr-0 mb-0 ml-0" }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex w-[134px] justify-center items-end shrink-0 flex-nowrap relative z-[88]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[134px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap rounded-[999px] relative overflow-hidden z-[89]", children: /* @__PURE__ */ jsx("span", { className: "h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#4b5059] relative text-left whitespace-nowrap z-[90]", children: "I’ll do this later" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "main-container flex w-[768px] flex-col gap-[32px] items-start flex-nowrap  mx-auto my-0", children: /* @__PURE__ */ jsxs("div", { className: "flex h-[481px] flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[3]", children: [
        /* @__PURE__ */ jsx("div", { className: "flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[4]", children: /* @__PURE__ */ jsxs("div", { className: "flex w-[578px] h-[115px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[5]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex w-[210px] flex-col items-center shrink-0 flex-nowrap relative z-[6]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex w-[210px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[7]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#17a627] relative overflow-hidden z-[8]", children: /* @__PURE__ */ jsx("span", { className: "flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#17a627] relative text-center whitespace-nowrap z-[9]", children: "01" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left whitespace-nowrap z-10", children: "[Product Name] | 4 Photos" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex h-[80px] pt-0 pr-0 pb-0 pl-[17px] gap-[30px] items-end self-stretch shrink-0 flex-nowrap relative z-[11]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-px h-[80px] shrink-0 bg-[url(../assets/images/628c2518-806f-487d-99ca-dd1dc28cbcce.png)] bg-cover bg-no-repeat relative z-[12]", style: { background: "black" } }),
              /* @__PURE__ */ jsx("div", { className: "flex w-[72px] h-[72px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff] absolute top-0 left-[47px] overflow-hidden z-[13]", children: /* @__PURE__ */ jsxs("div", { className: "flex w-[287px] items-start shrink-0 flex-nowrap relative z-[14]", children: [
                /* @__PURE__ */ jsx("div", { className: "flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[15]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[16]", children: /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[17]" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[18]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[19]", children: /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-20" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[21]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[22]", children: /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[23]" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[71px] pt-[16px] pr-[12px] pb-[16px] pl-[6px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[24]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-center whitespace-nowrap z-[25]", children: "+12" }) })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "flex w-[61px] h-[28px] pt-[4px] pr-[8px] pb-[4px] pl-[6px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none absolute top-[4px] left-[517px] z-30 pointer", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative z-[31]", children: /* @__PURE__ */ jsx("div", { className: "w-[12.945px] h-[12.945px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Icon.png?v=1714574880)] bg-cover bg-no-repeat relative z-[32] mt-[3.555px] mr-0 mb-0 ml-[3.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[33]", children: "Edit" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "w-full h-[220px] shrink-0 rounded-[100px] relative z-[26]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#232934] absolute top-0 left-0 overflow-hidden z-[28]", children: /* @__PURE__ */ jsx("span", { className: "flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#232934] relative text-center whitespace-nowrap z-[29]", children: "02" }) }),
          /* @__PURE__ */ jsx("span", { className: "flex h-[30px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[#232934] absolute top-px left-[47px] text-left whitespace-nowrap z-[27]", children: "Select a model" }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[47px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-[34]", children: [
            /* @__PURE__ */ jsx("div", { className: "self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[35]" }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[36]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[37]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[38]", children: "Model 1" }) }),
              /* @__PURE__ */ jsx("div", { className: "flex w-[75px] pt-[8px] pr-0 pb-0 pl-0 gap-[8px] items-start shrink-0 flex-nowrap relative z-[39]", children: /* @__PURE__ */ jsx("button", { className: "flex w-[75px] h-[28px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none relative z-40 pointer", children: /* @__PURE__ */ jsx("span", { className: "h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[41]", children: "Small Size" }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[233px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-[42]", children: [
            /* @__PURE__ */ jsx("div", { className: "self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[43]" }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[44]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[45]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[46]", children: "Model 1" }) }),
              /* @__PURE__ */ jsx("div", { className: "flex w-[75px] pt-[8px] pr-0 pb-0 pl-0 gap-[8px] items-start shrink-0 flex-nowrap relative z-[47]", children: /* @__PURE__ */ jsx("button", { className: "flex w-[75px] h-[28px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none relative z-[48] pointer", children: /* @__PURE__ */ jsx("span", { className: "h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[49]", children: "Small Size" }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[419px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-50", children: [
            /* @__PURE__ */ jsx("div", { className: "self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select2.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[51]" }),
            /* @__PURE__ */ jsxs("div", { className: "flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[52]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[53]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[54]", children: "Model 1" }) }),
              /* @__PURE__ */ jsx("div", { className: "flex w-[75px] pt-[8px] pr-0 pb-0 pl-0 gap-[8px] items-start shrink-0 flex-nowrap relative z-[55]", children: /* @__PURE__ */ jsx("button", { className: "flex w-[75px] h-[28px] pt-[2px] pr-[8px] pb-[2px] pl-[8px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none relative z-[56] pointer", children: /* @__PURE__ */ jsx("span", { className: "h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[57]", children: "Small Size" }) }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[4]", children: /* @__PURE__ */ jsxs("div", { className: "flex w-[578px] h-[115px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[5]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex w-[210px] flex-col items-center shrink-0 flex-nowrap relative z-[6]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex w-[210px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[7]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#17a627] relative overflow-hidden z-[8]", children: /* @__PURE__ */ jsx("span", { className: "flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#17a627] relative text-center whitespace-nowrap z-[9]", children: "02" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left whitespace-nowrap z-10", children: "Model Selected" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex h-[80px] pt-0 pr-0 pb-0 pl-[17px] gap-[30px] items-end self-stretch shrink-0 flex-nowrap relative z-[11]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-px h-[80px] shrink-0 bg-[url(../assets/images/628c2518-806f-487d-99ca-dd1dc28cbcce.png)] bg-cover bg-no-repeat relative z-[12]", style: { background: "black" } }),
              /* @__PURE__ */ jsx("div", { className: "flex w-[72px] h-[72px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff] absolute top-0 left-[47px] overflow-hidden z-[13]", children: /* @__PURE__ */ jsxs("div", { className: "flex w-[287px] items-start shrink-0 flex-nowrap relative z-[14]", children: [
                /* @__PURE__ */ jsx("div", { className: "flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[15]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[16]", children: /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1.png?v=1714646417)] bg-cover bg-no-repeat relative z-[17]" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[18]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[19]", children: /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-20" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[21]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[22]", children: /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[23]" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[71px] pt-[16px] pr-[12px] pb-[16px] pl-[6px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[24]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-center whitespace-nowrap z-[25]", children: "+12" }) })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "flex w-[61px] h-[28px] pt-[4px] pr-[8px] pb-[4px] pl-[6px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none absolute top-[4px] left-[517px] z-30 pointer", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative z-[31]", children: /* @__PURE__ */ jsx("div", { className: "w-[12.945px] h-[12.945px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Icon.png?v=1714574880)] bg-cover bg-no-repeat relative z-[32] mt-[3.555px] mr-0 mb-0 ml-[3.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[33]", children: "Edit" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "w-[226px] h-[36px] shrink-0 rounded-[100px] relative top-[0] left-0 z-[58]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#e7e7e7] absolute top-0 left-0 overflow-hidden z-[60]", children: /* @__PURE__ */ jsx("span", { className: "flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#b7b7b7] relative text-center whitespace-nowrap z-[61]", children: "03" }) }),
          /* @__PURE__ */ jsx("span", { className: "flex h-[24px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-normal leading-[24px] text-[#b7b7b7] tracking-[0.38px] absolute top-[6px] left-[48px] text-left whitespace-nowrap z-[59]", children: "Select a background" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full h-[220px] shrink-0 rounded-[100px] relative z-[26]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#232934] absolute top-0 left-0 overflow-hidden z-[28]", children: /* @__PURE__ */ jsx("span", { className: "flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#232934] relative text-center whitespace-nowrap z-[29]", children: "03" }) }),
          /* @__PURE__ */ jsx("span", { className: "flex h-[30px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[#232934] absolute top-px left-[47px] text-left whitespace-nowrap z-[27]", children: "Select a model" }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[47px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-[34]", children: [
            /* @__PURE__ */ jsx("div", { className: "self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_2.png?v=1714646888)] bg-cover bg-no-repeat relative z-[35]" }),
            /* @__PURE__ */ jsx("div", { className: "flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[36]", children: /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[37]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[38]", children: "background 1" }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[233px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-[42]", children: [
            /* @__PURE__ */ jsx("div", { className: "self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_1.png?v=1714646888)] bg-cover bg-no-repeat relative z-[43]" }),
            /* @__PURE__ */ jsx("div", { className: "flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[44]", children: /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[45]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[46]", children: "background 2" }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[419px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-50", children: [
            /* @__PURE__ */ jsx("div", { className: "self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_3.png?v=1714646887)] bg-cover bg-no-repeat relative z-[51]" }),
            /* @__PURE__ */ jsx("div", { className: "flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[52]", children: /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[53]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[54]", children: "background 3" }) }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-px h-[190px] shrink-0 bg-[url(../assets/images/6ccf0c05-ce59-4646-8ad4-ad42025c274a.png)] bg-cover bg-no-repeat absolute top-[35px] left-[17px] z-[66]", style: { background: "black" } })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[4]", children: /* @__PURE__ */ jsxs("div", { className: "flex w-[578px] h-[115px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[5]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex w-[210px] flex-col items-center shrink-0 flex-nowrap relative z-[6]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex w-[210px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[7]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#17a627] relative overflow-hidden z-[8]", children: /* @__PURE__ */ jsx("span", { className: "flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#17a627] relative text-center whitespace-nowrap z-[9]", children: "03" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left whitespace-nowrap z-10", children: "Background Selected" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex h-[80px] pt-0 pr-0 pb-0 pl-[17px] gap-[30px] items-end self-stretch shrink-0 flex-nowrap relative z-[11]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-px h-[80px] shrink-0 bg-[url(../assets/images/628c2518-806f-487d-99ca-dd1dc28cbcce.png)] bg-cover bg-no-repeat relative z-[12]", style: { background: "black" } }),
              /* @__PURE__ */ jsx("div", { className: "flex w-[72px] h-[72px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff] absolute top-0 left-[47px] overflow-hidden z-[13]", children: /* @__PURE__ */ jsxs("div", { className: "flex w-[287px] items-start shrink-0 flex-nowrap relative z-[14]", children: [
                /* @__PURE__ */ jsx("div", { className: "flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[15]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[16]", children: /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_2.png?v=1714646888)] bg-cover bg-no-repeat relative z-[17]" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[18]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[19]", children: /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-20" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[21]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[22]", children: /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[23]" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[71px] pt-[16px] pr-[12px] pb-[16px] pl-[6px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[24]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-center whitespace-nowrap z-[25]", children: "+12" }) })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "flex w-[61px] h-[28px] pt-[4px] pr-[8px] pb-[4px] pl-[6px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none absolute top-[4px] left-[517px] z-30 pointer", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative z-[31]", children: /* @__PURE__ */ jsx("div", { className: "w-[12.945px] h-[12.945px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Icon.png?v=1714574880)] bg-cover bg-no-repeat relative z-[32] mt-[3.555px] mr-0 mb-0 ml-[3.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[33]", children: "Edit" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "w-[165px] h-[36px] shrink-0 rounded-[100px] relative top-[0] left-0 z-[62]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#e7e7e7] absolute top-0 left-0 overflow-hidden z-[64]", children: /* @__PURE__ */ jsx("span", { className: "flex w-[20px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#b7b7b7] relative text-center whitespace-nowrap z-[65]", children: "04" }) }),
          /* @__PURE__ */ jsx("span", { className: "flex h-[24px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-normal leading-[24px] text-[#b7b7b7] tracking-[0.38px] absolute top-[6px] left-[48px] text-left whitespace-nowrap z-[63]", children: "Select a pose" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full h-[220px] shrink-0 rounded-[100px] relative z-[26]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex w-[36px] h-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#232934] absolute top-0 left-0 overflow-hidden z-[28]", children: /* @__PURE__ */ jsx("span", { className: "flex w-[19px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#232934] relative text-center whitespace-nowrap z-[29]", children: "04" }) }),
          /* @__PURE__ */ jsx("span", { className: "flex h-[30px] justify-start items-start font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[#232934] absolute top-px left-[47px] text-left whitespace-nowrap z-[27]", children: "Select a pose" }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[47px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-[34]", children: [
            /* @__PURE__ */ jsx("div", { className: "self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_4.png?v=1714648274)] bg-cover bg-no-repeat relative z-[35]" }),
            /* @__PURE__ */ jsx("div", { className: "flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[36]", children: /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[37]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[38]", children: "pose 1" }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[233px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-[42]", children: [
            /* @__PURE__ */ jsx("div", { className: "self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_5.png?v=1714648274)] bg-cover bg-no-repeat relative z-[43]" }),
            /* @__PURE__ */ jsx("div", { className: "flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[44]", children: /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[45]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[46]", children: "pose 2" }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-[159px] h-[177px] flex-col items-start shrink-0 flex-nowrap bg-[#fff] rounded-[12px] absolute top-[50px] left-[419px] overflow-hidden shadow-[0_1px_0_0_rgba(26,26,26,0.07)] z-50", children: [
            /* @__PURE__ */ jsx("div", { className: "self-stretch grow shrink-0 basis-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_6.png?v=1714648273)] bg-cover bg-no-repeat relative z-[51]" }),
            /* @__PURE__ */ jsx("div", { className: "flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[52]", children: /* @__PURE__ */ jsx("div", { className: "flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[53]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[650] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[54]", children: "pose 3" }) }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-px h-[190px] shrink-0 bg-[url(../assets/images/6ccf0c05-ce59-4646-8ad4-ad42025c274a.png)] bg-cover bg-no-repeat absolute top-[35px] left-[17px] z-[66]", style: { background: "black" } })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[4]", children: /* @__PURE__ */ jsxs("div", { className: "flex w-[578px] h-[115px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[5]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex w-[210px] flex-col items-center shrink-0 flex-nowrap relative z-[6]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex w-[210px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[7]", children: [
              /* @__PURE__ */ jsx("div", { className: "flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-solid border border-[#17a627] relative overflow-hidden z-[8]", children: /* @__PURE__ */ jsx("span", { className: "flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#17a627] relative text-center whitespace-nowrap z-[9]", children: "04" }) }),
              /* @__PURE__ */ jsx("span", { className: "h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left whitespace-nowrap z-10", children: "Pose Selected" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex h-[80px] pt-0 pr-0 pb-0 pl-[17px] gap-[30px] items-end self-stretch shrink-0 flex-nowrap relative z-[11]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-px h-[80px] shrink-0 bg-[url(../assets/images/628c2518-806f-487d-99ca-dd1dc28cbcce.png)] bg-cover bg-no-repeat relative z-[12]", style: { background: "black" } }),
              /* @__PURE__ */ jsx("div", { className: "flex w-[72px] h-[72px] flex-col gap-[10px] items-start shrink-0 flex-nowrap bg-[#fff] absolute top-0 left-[47px] overflow-hidden z-[13]", children: /* @__PURE__ */ jsxs("div", { className: "flex w-[287px] items-start shrink-0 flex-nowrap relative z-[14]", children: [
                /* @__PURE__ */ jsx("div", { className: "flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[15]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[16]", children: /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Rene_1_2.png?v=1714646888)] bg-cover bg-no-repeat relative z-[17]" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[18]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[19]", children: /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-20" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[72px] pt-[6px] pr-[6px] pb-[6px] pl-[6px] items-center shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[21]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[60px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#fdfdfd] rounded-[8px] relative overflow-hidden shadow-[0_0_0_0_rgba(0,0,0,0.08)_inset] z-[22]", children: /* @__PURE__ */ jsx("div", { className: "w-[60px] h-[60px] shrink-0 bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/select.jpg?v=1714465099)] bg-cover bg-no-repeat relative z-[23]" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "flex w-[71px] pt-[16px] pr-[12px] pb-[16px] pl-[6px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden z-[24]", children: /* @__PURE__ */ jsx("span", { className: "h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[450] leading-[20px] text-[#303030] relative text-center whitespace-nowrap z-[25]", children: "+12" }) })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "flex w-[61px] h-[28px] pt-[4px] pr-[8px] pb-[4px] pl-[6px] gap-[4px] justify-center items-center shrink-0 flex-nowrap bg-[rgba(0,0,0,0.06)] rounded-[8px] border-none absolute top-[4px] left-[517px] z-30 pointer", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[20px] h-[20px] shrink-0 relative z-[31]", children: /* @__PURE__ */ jsx("div", { className: "w-[12.945px] h-[12.945px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Icon.png?v=1714574880)] bg-cover bg-no-repeat relative z-[32] mt-[3.555px] mr-0 mb-0 ml-[3.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[16px] shrink-0 basis-auto font-['Inter'] text-[12px] font-[550] leading-[16px] text-[#616161] relative text-left whitespace-nowrap z-[33]", children: "Edit" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "main-container flex w-full h-[102px] pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[12px] items-center flex-nowrap bg-[#e8f6e9] rounded-[8px] relative top-0 left-0 mx-auto my-0", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[12px] items-start grow shrink-0 basis-0 flex-nowrap relative", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[1]", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[2]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[18px] h-[18px] shrink-0 relative overflow-hidden z-[3]", children: /* @__PURE__ */ jsx("div", { className: "w-[18px] h-[18px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/exclamation_2.png?v=1714648832)] bg-[length:100%_100%] bg-no-repeat relative z-[4]  mr-0 mb-0 ml-[1.5px]" }) }),
            /* @__PURE__ */ jsx("span", { className: "h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Rounded'] text-[16px] font-normal leading-[24px] text-[#046c4e] relative text-left whitespace-nowrap z-[5]", children: "Your photo is being created! This usually takes 5-10 mins the first time." })
          ] }) }),
          /* @__PURE__ */ jsx("button", { className: "flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap rounded-[24px] border-none relative z-[6] pointer", children: /* @__PURE__ */ jsxs("div", { className: "flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] justify-between items-center grow shrink-0 basis-0 flex-nowrap bg-[#10741b] rounded-[999px] relative overflow-hidden z-[7]", children: [
            /* @__PURE__ */ jsx("span", { className: "h-[18px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap z-[8]", children: "Explore our Dashboard" }),
            /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[9]", children: /* @__PURE__ */ jsx("div", { className: "w-[16px] h-[16px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/angle-right_1.png?v=1714648832)] bg-[length:100%_100%] bg-no-repeat relative z-10  mr-0 mb-0 ml-[5.334px]" }) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-[197px] shrink-0 bg-[url(../assets/images/6ccf0c05-ce59-4646-8ad4-ad42025c274a.png)] bg-cover bg-no-repeat absolute top-[186px] left-[17px] z-[66]", style: { background: "black" } }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-[236px] h-[44px] gap-[20px] items-start shrink-0 flex-nowrap relative top-[0] left-0 z-[82]", children: [
          /* @__PURE__ */ jsx("button", { className: "flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer", children: /* @__PURE__ */ jsxs("div", { className: "flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]", children: [
            /* @__PURE__ */ jsx("span", { className: "h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[85]", children: "Next" }),
            /* @__PURE__ */ jsx("div", { className: "w-[5px] h-[9px] shrink-0 relative z-[86]", children: /* @__PURE__ */ jsx("div", { className: "w-[5.308px] h-[9px] bg-[url(../assets/images/91099684-9e2c-41ac-8500-9a0d3c52b427.png)] bg-[length:100%_100%] bg-no-repeat relative z-[87] mt-[0.5px] mr-0 mb-0 ml-0" }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex w-[134px] justify-center items-end shrink-0 flex-nowrap relative z-[88]", children: /* @__PURE__ */ jsx("div", { className: "flex w-[134px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap rounded-[999px] relative overflow-hidden z-[89]", children: /* @__PURE__ */ jsx("span", { className: "h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#4b5059] relative text-left whitespace-nowrap z-[90]", children: "I’ll do this later" }) }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full", children: /* @__PURE__ */ jsx(CustomSlider, { images }) })
  ] }) });
};
const loader$4 = async ({ request }) => {
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
    }`
  );
  const data = await response.json();
  return { data };
};
const action$2 = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const body = await request.formData();
  const inputNumber = body.get("productShowBaseOnInuptNumber");
  const searchProdcutsQuery = body.get("searchProductBaseOnTitle");
  console.log(searchProdcutsQuery);
  let convertInNum = null;
  if (inputNumber !== null) {
    convertInNum = parseInt(inputNumber, 10);
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
  return { data };
};
function Index() {
  var _a2, _b, _c;
  let submit = useSubmit();
  const productData = useActionData();
  const [firstTabColor, setFirstTabColor] = useState("blue");
  const [tabStep, setTabstep] = useState("1");
  const [secondTabColor, setSecondTabColor] = useState("");
  const [inputData, setInputData] = useState(5);
  const [searchInputData, setSearchInputData] = useState("");
  const [activeHeader, setActiveHeader] = useState("first");
  const productTitles = ((_c = (_b = (_a2 = productData == null ? void 0 : productData.data) == null ? void 0 : _a2.data) == null ? void 0 : _b.products) == null ? void 0 : _c.edges) || [];
  console.log(productData ?? "productDataproductData", "productData");
  useEffect(() => {
    if (searchInputData) {
      console.log("Search data received in action function: ", searchInputData);
    }
  }, [searchInputData]);
  useEffect(() => {
    if (inputData) {
      submit({ productShowBaseOnInuptNumber: inputData, searchProductBaseOnTitle: searchInputData }, { method: "post" });
      setInputData(inputData);
    }
  }, [inputData, searchInputData, submit]);
  const handleHeaderChange = (header) => {
    if (header === "first") {
      setActiveHeader(header);
      setSecondTabColor("");
      setFirstTabColor("blue");
      setTabstep("1");
    } else if (header === "second") {
      setActiveHeader(header);
      setSecondTabColor("blue");
      setFirstTabColor("green");
      setTabstep("2");
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "container w-full", style: { maxWidth: "100%", background: "#fff", padding: "20px 50px" }, children: [
    /* @__PURE__ */ jsxs("h1", { className: "mb-2 onbording_step_title", children: [
      "Onboarding - ",
      tabStep,
      " of 2 steps"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "onboarding_steps  w-ful", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleHeaderChange("first"),
          style: { backgroundColor: firstTabColor }
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleHeaderChange("second"),
          style: { backgroundColor: secondTabColor }
        }
      )
    ] }),
    activeHeader === "first" && /* @__PURE__ */ jsx(
      FirstHeader,
      {
        productTitles,
        sendDataToParent: setInputData,
        sendDataToParentToSearchValues: setSearchInputData
      }
    ),
    activeHeader === "second" && /* @__PURE__ */ jsx(SecondHeader, {})
  ] }) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: Index,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const Polaris = {
  ActionMenu: {
    Actions: {
      moreActions: "More actions"
    },
    RollupActions: {
      rollupButton: "View actions"
    }
  },
  ActionList: {
    SearchField: {
      clearButtonLabel: "Clear",
      search: "Search",
      placeholder: "Search actions"
    }
  },
  Avatar: {
    label: "Avatar",
    labelWithInitials: "Avatar with initials {initials}"
  },
  Autocomplete: {
    spinnerAccessibilityLabel: "Loading",
    ellipsis: "{content}…"
  },
  Badge: {
    PROGRESS_LABELS: {
      incomplete: "Incomplete",
      partiallyComplete: "Partially complete",
      complete: "Complete"
    },
    TONE_LABELS: {
      info: "Info",
      success: "Success",
      warning: "Warning",
      critical: "Critical",
      attention: "Attention",
      "new": "New",
      readOnly: "Read-only",
      enabled: "Enabled"
    },
    progressAndTone: "{toneLabel} {progressLabel}"
  },
  Banner: {
    dismissButton: "Dismiss notification"
  },
  Button: {
    spinnerAccessibilityLabel: "Loading"
  },
  Common: {
    checkbox: "checkbox",
    undo: "Undo",
    cancel: "Cancel",
    clear: "Clear",
    close: "Close",
    submit: "Submit",
    more: "More"
  },
  ContextualSaveBar: {
    save: "Save",
    discard: "Discard"
  },
  DataTable: {
    sortAccessibilityLabel: "sort {direction} by",
    navAccessibilityLabel: "Scroll table {direction} one column",
    totalsRowHeading: "Totals",
    totalRowHeading: "Total"
  },
  DatePicker: {
    previousMonth: "Show previous month, {previousMonthName} {showPreviousYear}",
    nextMonth: "Show next month, {nextMonth} {nextYear}",
    today: "Today ",
    start: "Start of range",
    end: "End of range",
    months: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December"
    },
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday"
    },
    daysAbbreviated: {
      monday: "Mo",
      tuesday: "Tu",
      wednesday: "We",
      thursday: "Th",
      friday: "Fr",
      saturday: "Sa",
      sunday: "Su"
    }
  },
  DiscardConfirmationModal: {
    title: "Discard all unsaved changes",
    message: "If you discard changes, you’ll delete any edits you made since you last saved.",
    primaryAction: "Discard changes",
    secondaryAction: "Continue editing"
  },
  DropZone: {
    single: {
      overlayTextFile: "Drop file to upload",
      overlayTextImage: "Drop image to upload",
      overlayTextVideo: "Drop video to upload",
      actionTitleFile: "Add file",
      actionTitleImage: "Add image",
      actionTitleVideo: "Add video",
      actionHintFile: "or drop file to upload",
      actionHintImage: "or drop image to upload",
      actionHintVideo: "or drop video to upload",
      labelFile: "Upload file",
      labelImage: "Upload image",
      labelVideo: "Upload video"
    },
    allowMultiple: {
      overlayTextFile: "Drop files to upload",
      overlayTextImage: "Drop images to upload",
      overlayTextVideo: "Drop videos to upload",
      actionTitleFile: "Add files",
      actionTitleImage: "Add images",
      actionTitleVideo: "Add videos",
      actionHintFile: "or drop files to upload",
      actionHintImage: "or drop images to upload",
      actionHintVideo: "or drop videos to upload",
      labelFile: "Upload files",
      labelImage: "Upload images",
      labelVideo: "Upload videos"
    },
    errorOverlayTextFile: "File type is not valid",
    errorOverlayTextImage: "Image type is not valid",
    errorOverlayTextVideo: "Video type is not valid"
  },
  EmptySearchResult: {
    altText: "Empty search results"
  },
  Frame: {
    skipToContent: "Skip to content",
    navigationLabel: "Navigation",
    Navigation: {
      closeMobileNavigationLabel: "Close navigation"
    }
  },
  FullscreenBar: {
    back: "Back",
    accessibilityLabel: "Exit fullscreen mode"
  },
  Filters: {
    moreFilters: "More filters",
    moreFiltersWithCount: "More filters ({count})",
    filter: "Filter {resourceName}",
    noFiltersApplied: "No filters applied",
    cancel: "Cancel",
    done: "Done",
    clearAllFilters: "Clear all filters",
    clear: "Clear",
    clearLabel: "Clear {filterName}",
    addFilter: "Add filter",
    clearFilters: "Clear all",
    searchInView: "in:{viewName}"
  },
  FilterPill: {
    clear: "Clear",
    unsavedChanges: "Unsaved changes - {label}"
  },
  IndexFilters: {
    searchFilterTooltip: "Search and filter",
    searchFilterTooltipWithShortcut: "Search and filter (F)",
    searchFilterAccessibilityLabel: "Search and filter results",
    sort: "Sort your results",
    addView: "Add a new view",
    newView: "Custom search",
    SortButton: {
      ariaLabel: "Sort the results",
      tooltip: "Sort",
      title: "Sort by",
      sorting: {
        asc: "Ascending",
        desc: "Descending",
        az: "A-Z",
        za: "Z-A"
      }
    },
    EditColumnsButton: {
      tooltip: "Edit columns",
      accessibilityLabel: "Customize table column order and visibility"
    },
    UpdateButtons: {
      cancel: "Cancel",
      update: "Update",
      save: "Save",
      saveAs: "Save as",
      modal: {
        title: "Save view as",
        label: "Name",
        sameName: "A view with this name already exists. Please choose a different name.",
        save: "Save",
        cancel: "Cancel"
      }
    }
  },
  IndexProvider: {
    defaultItemSingular: "Item",
    defaultItemPlural: "Items",
    allItemsSelected: "All {itemsLength}+ {resourceNamePlural} are selected",
    selected: "{selectedItemsCount} selected",
    a11yCheckboxDeselectAllSingle: "Deselect {resourceNameSingular}",
    a11yCheckboxSelectAllSingle: "Select {resourceNameSingular}",
    a11yCheckboxDeselectAllMultiple: "Deselect all {itemsLength} {resourceNamePlural}",
    a11yCheckboxSelectAllMultiple: "Select all {itemsLength} {resourceNamePlural}"
  },
  IndexTable: {
    emptySearchTitle: "No {resourceNamePlural} found",
    emptySearchDescription: "Try changing the filters or search term",
    onboardingBadgeText: "New",
    resourceLoadingAccessibilityLabel: "Loading {resourceNamePlural}…",
    selectAllLabel: "Select all {resourceNamePlural}",
    selected: "{selectedItemsCount} selected",
    undo: "Undo",
    selectAllItems: "Select all {itemsLength}+ {resourceNamePlural}",
    selectItem: "Select {resourceName}",
    selectButtonText: "Select",
    sortAccessibilityLabel: "sort {direction} by"
  },
  Loading: {
    label: "Page loading bar"
  },
  Modal: {
    iFrameTitle: "body markup",
    modalWarning: "These required properties are missing from Modal: {missingProps}"
  },
  Page: {
    Header: {
      rollupActionsLabel: "View actions for {title}",
      pageReadyAccessibilityLabel: "{title}. This page is ready"
    }
  },
  Pagination: {
    previous: "Previous",
    next: "Next",
    pagination: "Pagination"
  },
  ProgressBar: {
    negativeWarningMessage: "Values passed to the progress prop shouldn’t be negative. Resetting {progress} to 0.",
    exceedWarningMessage: "Values passed to the progress prop shouldn’t exceed 100. Setting {progress} to 100."
  },
  ResourceList: {
    sortingLabel: "Sort by",
    defaultItemSingular: "item",
    defaultItemPlural: "items",
    showing: "Showing {itemsCount} {resource}",
    showingTotalCount: "Showing {itemsCount} of {totalItemsCount} {resource}",
    loading: "Loading {resource}",
    selected: "{selectedItemsCount} selected",
    allItemsSelected: "All {itemsLength}+ {resourceNamePlural} in your store are selected",
    allFilteredItemsSelected: "All {itemsLength}+ {resourceNamePlural} in this filter are selected",
    selectAllItems: "Select all {itemsLength}+ {resourceNamePlural} in your store",
    selectAllFilteredItems: "Select all {itemsLength}+ {resourceNamePlural} in this filter",
    emptySearchResultTitle: "No {resourceNamePlural} found",
    emptySearchResultDescription: "Try changing the filters or search term",
    selectButtonText: "Select",
    a11yCheckboxDeselectAllSingle: "Deselect {resourceNameSingular}",
    a11yCheckboxSelectAllSingle: "Select {resourceNameSingular}",
    a11yCheckboxDeselectAllMultiple: "Deselect all {itemsLength} {resourceNamePlural}",
    a11yCheckboxSelectAllMultiple: "Select all {itemsLength} {resourceNamePlural}",
    Item: {
      actionsDropdownLabel: "Actions for {accessibilityLabel}",
      actionsDropdown: "Actions dropdown",
      viewItem: "View details for {itemName}"
    },
    BulkActions: {
      actionsActivatorLabel: "Actions",
      moreActionsActivatorLabel: "More actions"
    }
  },
  SkeletonPage: {
    loadingLabel: "Page loading"
  },
  Tabs: {
    newViewAccessibilityLabel: "Create new view",
    newViewTooltip: "Create view",
    toggleTabsLabel: "More views",
    Tab: {
      rename: "Rename view",
      duplicate: "Duplicate view",
      edit: "Edit view",
      editColumns: "Edit columns",
      "delete": "Delete view",
      copy: "Copy of {name}",
      deleteModal: {
        title: "Delete view?",
        description: "This can’t be undone. {viewName} view will no longer be available in your admin.",
        cancel: "Cancel",
        "delete": "Delete view"
      }
    },
    RenameModal: {
      title: "Rename view",
      label: "Name",
      cancel: "Cancel",
      create: "Save",
      errors: {
        sameName: "A view with this name already exists. Please choose a different name."
      }
    },
    DuplicateModal: {
      title: "Duplicate view",
      label: "Name",
      cancel: "Cancel",
      create: "Create view",
      errors: {
        sameName: "A view with this name already exists. Please choose a different name."
      }
    },
    CreateViewModal: {
      title: "Create new view",
      label: "Name",
      cancel: "Cancel",
      create: "Create view",
      errors: {
        sameName: "A view with this name already exists. Please choose a different name."
      }
    }
  },
  Tag: {
    ariaLabel: "Remove {children}"
  },
  TextField: {
    characterCount: "{count} characters",
    characterCountWithMaxLength: "{count} of {limit} characters used"
  },
  TooltipOverlay: {
    accessibilityLabel: "Tooltip: {label}"
  },
  TopBar: {
    toggleMenuLabel: "Toggle menu",
    SearchField: {
      clearButtonLabel: "Clear",
      search: "Search"
    }
  },
  MediaCard: {
    dismissButton: "Dismiss",
    popoverButton: "Actions"
  },
  VideoThumbnail: {
    playButtonA11yLabel: {
      "default": "Play video",
      defaultWithDuration: "Play video of length {duration}",
      duration: {
        hours: {
          other: {
            only: "{hourCount} hours",
            andMinutes: "{hourCount} hours and {minuteCount} minutes",
            andMinute: "{hourCount} hours and {minuteCount} minute",
            minutesAndSeconds: "{hourCount} hours, {minuteCount} minutes, and {secondCount} seconds",
            minutesAndSecond: "{hourCount} hours, {minuteCount} minutes, and {secondCount} second",
            minuteAndSeconds: "{hourCount} hours, {minuteCount} minute, and {secondCount} seconds",
            minuteAndSecond: "{hourCount} hours, {minuteCount} minute, and {secondCount} second",
            andSeconds: "{hourCount} hours and {secondCount} seconds",
            andSecond: "{hourCount} hours and {secondCount} second"
          },
          one: {
            only: "{hourCount} hour",
            andMinutes: "{hourCount} hour and {minuteCount} minutes",
            andMinute: "{hourCount} hour and {minuteCount} minute",
            minutesAndSeconds: "{hourCount} hour, {minuteCount} minutes, and {secondCount} seconds",
            minutesAndSecond: "{hourCount} hour, {minuteCount} minutes, and {secondCount} second",
            minuteAndSeconds: "{hourCount} hour, {minuteCount} minute, and {secondCount} seconds",
            minuteAndSecond: "{hourCount} hour, {minuteCount} minute, and {secondCount} second",
            andSeconds: "{hourCount} hour and {secondCount} seconds",
            andSecond: "{hourCount} hour and {secondCount} second"
          }
        },
        minutes: {
          other: {
            only: "{minuteCount} minutes",
            andSeconds: "{minuteCount} minutes and {secondCount} seconds",
            andSecond: "{minuteCount} minutes and {secondCount} second"
          },
          one: {
            only: "{minuteCount} minute",
            andSeconds: "{minuteCount} minute and {secondCount} seconds",
            andSecond: "{minuteCount} minute and {secondCount} second"
          }
        },
        seconds: {
          other: "{secondCount} seconds",
          one: "{secondCount} second"
        }
      }
    }
  }
};
const polarisTranslations = {
  Polaris
};
const polarisStyles = "/assets/styles-BGjgDe03.css";
function loginErrorMessage(loginErrors) {
  if ((loginErrors == null ? void 0 : loginErrors.shop) === LoginErrorType.MissingShop) {
    return { shop: "Please enter your shop domain to log in" };
  } else if ((loginErrors == null ? void 0 : loginErrors.shop) === LoginErrorType.InvalidShop) {
    return { shop: "Please enter a valid shop domain to log in" };
  }
  return {};
}
const links$1 = () => [{ rel: "stylesheet", href: polarisStyles }];
const loader$3 = async ({ request }) => {
  const errors = loginErrorMessage(await login(request));
  return json({ errors, polarisTranslations });
};
const action$1 = async ({ request }) => {
  const errors = loginErrorMessage(await login(request));
  return json({
    errors
  });
};
function Auth() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const [shop, setShop] = useState("");
  const { errors } = actionData || loaderData;
  return /* @__PURE__ */ jsx(AppProvider, { i18n: loaderData.polarisTranslations, children: /* @__PURE__ */ jsx(Page, { children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(Form, { method: "post", children: /* @__PURE__ */ jsxs(FormLayout, { children: [
    /* @__PURE__ */ jsx(Text, { variant: "headingMd", as: "h2", children: "Log in" }),
    /* @__PURE__ */ jsx(
      TextField,
      {
        type: "text",
        name: "shop",
        label: "Shop domain",
        helpText: "example.myshopify.com",
        value: shop,
        onChange: setShop,
        autoComplete: "on",
        error: errors.shop
      }
    ),
    /* @__PURE__ */ jsx(Button, { submit: true, children: "Log in" })
  ] }) }) }) }) });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: Auth,
  links: links$1,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const action = async ({ request }) => {
  const { topic, shop, session, admin } = await authenticate.webhook(request);
  if (!admin) {
    throw new Response();
  }
  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await prisma.session.deleteMany({ where: { shop } });
      }
      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }
  throw new Response();
};
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const index = "_index_1hqgz_1";
const heading = "_heading_1hqgz_21";
const text = "_text_1hqgz_23";
const content = "_content_1hqgz_43";
const form = "_form_1hqgz_53";
const label = "_label_1hqgz_69";
const input = "_input_1hqgz_85";
const button = "_button_1hqgz_93";
const list = "_list_1hqgz_101";
const styles = {
  index,
  heading,
  text,
  content,
  form,
  label,
  input,
  button,
  list
};
const loader$1 = async ({ request }) => {
  const url = new URL(request.url);
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }
  return json({ showForm: Boolean(login) });
};
function App$1() {
  const { showForm } = useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: styles.index, children: /* @__PURE__ */ jsxs("div", { className: styles.content, children: [
    /* @__PURE__ */ jsx("h1", { className: styles.heading, children: "A short heading about [your app]" }),
    /* @__PURE__ */ jsx("p", { className: styles.text, children: "A tagline about [your app] that describes your value proposition." }),
    showForm && /* @__PURE__ */ jsxs(Form, { className: styles.form, method: "post", action: "/auth/login", children: [
      /* @__PURE__ */ jsxs("label", { className: styles.label, children: [
        /* @__PURE__ */ jsx("span", { children: "Shop domain" }),
        /* @__PURE__ */ jsx("input", { className: styles.input, type: "text", name: "shop" }),
        /* @__PURE__ */ jsx("span", { children: "e.g: my-shop-domain.myshopify.com" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: styles.button, type: "submit", children: "Log in" })
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: styles.list, children: [
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] })
    ] })
  ] }) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App$1,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{ rel: "stylesheet", href: polarisStyles }];
const loader = async ({ request }) => {
  await authenticate.admin(request);
  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};
function App() {
  const { apiKey } = useLoaderData();
  return /* @__PURE__ */ jsxs(AppProvider$1, { isEmbeddedApp: true, apiKey, children: [
    /* @__PURE__ */ jsxs("ui-nav-menu", { children: [
      /* @__PURE__ */ jsx(Link, { to: "/app", rel: "home", children: "Home" }),
      /* @__PURE__ */ jsx(Link, { to: "/app/additional", children: "Additional page" })
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
function ErrorBoundary() {
  return boundary.error(useRouteError());
}
const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: App,
  headers,
  links,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DZOHsLo1.js", "imports": ["/assets/jsx-runtime-x_ubZUSp.js", "/assets/components-A2SuPOEf.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-hFdGWqW4.js", "imports": ["/assets/jsx-runtime-x_ubZUSp.js", "/assets/components-A2SuPOEf.js"], "css": [] }, "routes/app.additional": { "id": "routes/app.additional", "parentId": "routes/app", "path": "additional", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/app.additional-LDKqjLds.js", "imports": ["/assets/jsx-runtime-x_ubZUSp.js"], "css": [] }, "routes/app._index": { "id": "routes/app._index", "parentId": "routes/app", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/app._index-CS5Yu7Rn.js", "imports": ["/assets/jsx-runtime-x_ubZUSp.js", "/assets/components-A2SuPOEf.js"], "css": [] }, "routes/auth.login": { "id": "routes/auth.login", "parentId": "root", "path": "auth/login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-PSC88KHh.js", "imports": ["/assets/jsx-runtime-x_ubZUSp.js", "/assets/styles-BY-d0i2d.js", "/assets/components-A2SuPOEf.js"], "css": [] }, "routes/webhooks": { "id": "routes/webhooks", "parentId": "root", "path": "webhooks", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/webhooks-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/auth.$": { "id": "routes/auth.$", "parentId": "root", "path": "auth/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth._-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-B0I0oiJW.js", "imports": ["/assets/jsx-runtime-x_ubZUSp.js", "/assets/components-A2SuPOEf.js"], "css": ["/assets/route-Qq2qOeDq.css"] }, "routes/app": { "id": "routes/app", "parentId": "root", "path": "app", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/app-DhoiYBBl.js", "imports": ["/assets/jsx-runtime-x_ubZUSp.js", "/assets/components-A2SuPOEf.js", "/assets/styles-BY-d0i2d.js"], "css": [] } }, "url": "/assets/manifest-07c686dd.js", "version": "07c686dd" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/app.additional": {
    id: "routes/app.additional",
    parentId: "routes/app",
    path: "additional",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/app._index": {
    id: "routes/app._index",
    parentId: "routes/app",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/webhooks": {
    id: "routes/webhooks",
    parentId: "root",
    path: "webhooks",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/auth.$": {
    id: "routes/auth.$",
    parentId: "root",
    path: "auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
  },
  "routes/app": {
    id: "routes/app",
    parentId: "root",
    path: "app",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
