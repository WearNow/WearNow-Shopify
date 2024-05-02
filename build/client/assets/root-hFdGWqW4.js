import{r as n,j as e}from"./jsx-runtime-x_ubZUSp.js";import{a as u,b as f,c as m,d as x,_ as S,M as j,L as w,O as k,S as g}from"./components-A2SuPOEf.js";/**
 * @remix-run/react v2.9.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let l="positions";function M({getKey:r,...a}){let{isSpaMode:c}=u(),o=f(),h=m();x({getKey:r,storageKey:l});let p=n.useMemo(()=>{if(!r)return null;let t=r(o,h);return t!==o.key?t:null},[]);if(c)return null;let d=((t,y)=>{if(!window.history.state||!window.history.state.key){let s=Math.random().toString(32).slice(2);window.history.replaceState({key:s},"")}try{let i=JSON.parse(sessionStorage.getItem(t)||"{}")[y||window.history.state.key];typeof i=="number"&&window.scrollTo(0,i)}catch(s){console.error(s),sessionStorage.removeItem(t)}}).toString();return n.createElement("script",S({},a,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${d})(${JSON.stringify(l)}, ${JSON.stringify(p)})`}}))}const O="/assets/tailwind--0Pce7OH.css",R=()=>[{rel:"stylesheet",href:O}];function _(){return e.jsxs("html",{children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width,initial-scale=1"}),e.jsx("link",{rel:"preconnect",href:"https://cdn.shopify.com/"}),e.jsx("link",{rel:"stylesheet",href:"https://cdn.shopify.com/s/files/1/0843/1642/2421/files/stylesheet.css?v=1713961441"}),e.jsx("link",{rel:"stylesheet",href:"https://cdn.shopify.com/static/fonts/inter/v4/styles.css"}),e.jsx(j,{}),e.jsx(w,{})]}),e.jsxs("body",{children:[e.jsx(k,{}),e.jsx(M,{}),e.jsx(g,{})]})]})}export{_ as default,R as links};
