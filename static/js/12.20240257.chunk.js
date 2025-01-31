"use strict";(self.webpackChunkfakenewsdetector=self.webpackChunkfakenewsdetector||[]).push([[12],{12:(e,s,a)=>{a.r(s),a.d(s,{default:()=>l});var t=a(43),c=a(722),n=a(579);const l=()=>{const[e,s]=(0,t.useState)(""),[a,l]=(0,t.useState)(null),[i,r]=(0,t.useState)(null),[h,o]=(0,t.useState)(!1),[d,u]=(0,t.useState)("");return(0,n.jsxs)("div",{className:"analyze-container",children:[(0,n.jsx)("h1",{className:"analyze-title",children:"\ud83d\udcf0 Fake News Verification"}),(0,n.jsx)("p",{className:"analyze-description",children:"Enter a news headline or topic below and let AI check its authenticity."}),(0,n.jsx)("textarea",{className:"analyze-input",placeholder:"Enter news headline or topic...",value:e,onChange:e=>s(e.target.value)}),(0,n.jsx)("button",{className:"analyze-button",onClick:async()=>{if(u(""),l(null),r(null),e.trim()){o(!0);try{const s=await c.A.post("http://127.0.0.1:5000/analyze",{text:e},{headers:{"Content-Type":"application/json"}});l(s.data);const a=await c.A.post("http://127.0.0.1:5000/fact-check",{text:e},{headers:{"Content-Type":"application/json"}});r(a.data)}catch(s){console.error("API Error:",s.response?s.response.data:s.message),u("Something went wrong! Please check the backend.")}o(!1)}else u("Please enter a news headline or topic.")},disabled:h,children:h?"Checking...":"Verify News"}),d&&(0,n.jsx)("p",{className:"error-message",children:d}),a&&(0,n.jsxs)("div",{className:"result-box",children:[(0,n.jsx)("h2",{className:"result-title",children:"\ud83d\udcca Analysis Result"}),"verified"===a.status?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{className:"verified-text",children:"\u2705 This news has been reported by legitimate sources:"}),(0,n.jsx)("ul",{className:"article-list",children:a.articles.map(((e,s)=>(0,n.jsxs)("li",{children:[(0,n.jsxs)("strong",{children:[e.source,":"]})," ",e.title]},s)))})]}):(0,n.jsx)("p",{className:"unverified-text",children:"\ud83d\udea8 Warning: No sources found!"})]}),i&&(0,n.jsxs)("div",{className:"fact-check-box",children:[(0,n.jsx)("h2",{className:"fact-check-title",children:"\ud83d\udd0d Fact-Checking Results"}),"fact-checked"===i.status?(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("ul",{className:"fact-check-list",children:i.claims.map(((e,s)=>(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:e.claim}),(0,n.jsx)("br",{}),(0,n.jsxs)("em",{children:["Rating: ",e.rating]}),(0,n.jsx)("br",{}),(0,n.jsxs)("small",{children:["Source: ",e.source]})]},s)))})}):(0,n.jsx)("p",{children:"No fact-checking results found for this topic."})]})]})}}}]);
//# sourceMappingURL=12.20240257.chunk.js.map