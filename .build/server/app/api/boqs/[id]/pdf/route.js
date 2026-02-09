"use strict";(()=>{var e={};e.id=897,e.ids=[897],e.modules={53524:e=>{e.exports=require("@prisma/client")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},86624:e=>{e.exports=require("querystring")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},27648:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>w,patchFetch:()=>T,requestAsyncStorage:()=>y,routeModule:()=>b,serverHooks:()=>$,staticGenerationAsyncStorage:()=>x});var r={};o.r(r),o.d(r,{POST:()=>h,dynamic:()=>u});var a=o(79182),n=o(72007),s=o(56719),i=o(93442),l=o(57978),d=o(86023),c=o(83178),p=o(53609);let u="force-dynamic",m=(e,t=2)=>e.toLocaleString("en-US",{minimumFractionDigits:t,maximumFractionDigits:t}),f=()=>({header:{borderColor:"#0891b2",titleColor:"#0891b2",subtitleColor:"#666666"},categoryHeader:{backgroundPrimary:"#0891b2",backgroundSecondary:"#14b8a6",textColor:"#ffffff"},table:{headerBackground:"#f9fafb",headerTextColor:"#6b7280",borderColor:"#e5e7eb",bodyTextColor:"#333333"},subtotalRow:{background:"#f0fdfa",borderColor:"#14b8a6",textColor:"#333333"},noteRow:{background:"#fffbeb",textColor:"#92400e"},totals:{finalTotalBackground:"#0891b2",finalTotalTextColor:"#ffffff"}}),g=()=>({page:{backgroundColor:"#ffffff",padding:40,defaultFontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"},elements:[{id:"project_name",type:"project_name",enabled:!0,style:{fontSize:36,fontWeight:"bold",italic:!1,underline:!1,color:"#0891b2",align:"center",marginTop:0,marginBottom:20}},{id:"subtitle",type:"subtitle",enabled:!0,text:"Bill of Quantities",style:{fontSize:18,fontWeight:"normal",italic:!1,underline:!1,color:"#666666",align:"center",marginTop:0,marginBottom:10}},{id:"prepared_for",type:"prepared_for",enabled:!0,style:{fontSize:18,fontWeight:"normal",italic:!1,underline:!1,color:"#666666",align:"center",marginTop:0,marginBottom:40}},{id:"company_name",type:"company_name",enabled:!0,style:{fontSize:16,fontWeight:"normal",italic:!1,underline:!1,color:"#333333",align:"center",marginTop:0,marginBottom:0}}]});async function h(e,{params:t}){let o,r;let a=(0,p.eF)(),n=500;try{let e,s;let u=await (0,l.getServerSession)(d.L);if(!u?.user)return n=401,i.NextResponse.json({error:"Unauthorized"},{status:401});o=u.user?.companyId,r=u.user?.id,console.log(`[PDF_EXPORT_START] BOQ: ${t?.id}, Company: ${o}`);let h=(0,p.eF)(),[b,y]=await Promise.all([c._.boq.findFirst({where:{id:t?.id,companyId:o},include:{customer:!0,coverTemplate:!0,pdfTheme:!0,categories:{include:{items:{orderBy:{sortOrder:"asc"}}},orderBy:{sortOrder:"asc"}}}}),c._.company.findUnique({where:{id:o},include:{pdfCoverTemplates:{where:{isDefault:!0},take:1},pdfThemes:{where:{isDefault:!0},take:1}}})]);if(console.log(`[PDF_EXPORT_DB] BOQ: ${t?.id}, DB query took ${h.elapsed()}ms`),!b)return n=404,i.NextResponse.json({error:"BOQ not found"},{status:404});let x=y?.currencySymbol??"Rs.",$=y?.currencyPosition??"left",w=e=>{let t=m(e??0,2);return"left"===$?`${x} ${t}`:`${t} ${x}`},T=0;(b?.categories??[]).forEach(e=>{(e?.items??[]).forEach(e=>{if(e?.isNote)return;let t=e?.quantity??0;if(t>0){let o=(e?.unitCost??0)*(1+(e?.markupPct??0)/100);T+=o*t}})});let v=0;b?.discountEnabled&&(v=b?.discountType==="percent"?(b?.discountValue??0)/100*T:b?.discountValue??0);let S=T-v,C=b?.vatEnabled?(b?.vatPercent??0)/100*S:0;e=b.coverTemplate?.configJson?b.coverTemplate.configJson:y?.pdfCoverTemplates?.[0]?.configJson?y.pdfCoverTemplates[0].configJson:g(),s=b.pdfTheme?.configJson?b.pdfTheme.configJson:y?.pdfThemes?.[0]?.configJson?y.pdfThemes[0].configJson:f();let E=function(e,t,o,r,a,n){let s=e.elements.map(e=>{if(!e.enabled)return"";let s=`
      font-size: ${e.style.fontSize}px;
      font-weight: ${e.style.fontWeight};
      font-style: ${e.style.italic?"italic":"normal"};
      text-decoration: ${e.style.underline?"underline":"none"};
      color: ${e.style.color};
      text-align: ${e.style.align};
      margin-top: ${e.style.marginTop}px;
      margin-bottom: ${e.style.marginBottom}px;
    `,i="";switch(e.type){case"project_name":i=t||"Project";break;case"subtitle":i=e.text||"Bill of Quantities";break;case"prepared_for":if(!o)return"";i=`Prepared for: ${o}`;break;case"company_name":i=r||"Company";break;case"logo":if(e.logoUrl){let t=e.logoWidth||200,o=e.logoMaxWidthPercent?`${e.logoMaxWidthPercent}%`:`${t}px`;return`<div style="${s}; display: flex; justify-content: ${e.style.align};">
            <img src="${e.logoUrl}" alt="Logo" style="max-width: ${o}; width: ${t}px; height: auto;" />
          </div>`}return"";case"date":i="preparation_date"===a&&n?new Date(n).toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"}):new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"});break;case"prepared_by":case"custom_text":if(!(i=e.text||""))return""}return`<div style="${s}">${i}</div>`}).join("");return`
    <div class="cover-page" style="
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      page-break-after: always;
      background-color: ${e.page.backgroundColor||"#ffffff"};
      padding: ${e.page.padding||40}px;
      font-family: ${e.page.defaultFontFamily||"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
    ">
      ${s}
    </div>
  `}(e,b?.projectName??"Project",b?.customer?.name??null,y?.name??"Company",b?.dateMode??"export_date",b?.preparationDate??null),R=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 11px;
      line-height: 1.4;
      color: ${s.table.bodyTextColor};
    }
    .content-page {
      padding: 20px 30px;
    }
    .header {
      border-bottom: 2px solid ${s.header.borderColor};
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .header h1 {
      font-size: 18px;
      color: ${s.header.titleColor};
    }
    .header p {
      font-size: 11px;
      color: ${s.header.subtitleColor};
    }
    .category {
      margin-bottom: 25px;
    }
    .category-header {
      background: linear-gradient(135deg, ${s.categoryHeader.backgroundPrimary}, ${s.categoryHeader.backgroundSecondary});
      color: ${s.categoryHeader.textColor};
      padding: 8px 12px;
      font-weight: bold;
      font-size: 12px;
      border-radius: 4px 4px 0 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid ${s.table.borderColor};
      padding: 6px 8px;
      text-align: left;
    }
    th {
      background-color: ${s.table.headerBackground};
      font-weight: 600;
      font-size: 10px;
      text-transform: uppercase;
      color: ${s.table.headerTextColor};
    }
    td {
      font-size: 11px;
    }
    .text-right {
      text-align: right;
    }
    .subtotal-row {
      background-color: ${s.subtotalRow.background};
      font-weight: bold;
      color: ${s.subtotalRow.textColor};
    }
    .subtotal-row td {
      border-top: 2px solid ${s.subtotalRow.borderColor};
    }
    .note-row {
      background-color: ${s.noteRow.background};
      font-style: italic;
    }
    .note-row td {
      color: ${s.noteRow.textColor};
    }
    .totals-section {
      margin-top: 30px;
      page-break-inside: avoid;
    }
    .totals-table {
      width: 300px;
      margin-left: auto;
    }
    .totals-table td {
      padding: 8px 12px;
    }
    .totals-table .label {
      text-align: left;
      font-weight: 500;
    }
    .totals-table .value {
      text-align: right;
      font-weight: bold;
    }
    .final-total {
      background-color: ${s.totals.finalTotalBackground};
      color: ${s.totals.finalTotalTextColor};
    }
    .final-total td {
      font-size: 14px;
    }
  </style>
</head>
<body>
  ${E}

  <div class="content-page">
    <div class="header">
      <h1>${b?.projectName??"Project"}</h1>
      ${b?.customer?`<p>Customer: ${b.customer.name}</p>`:""}
    </div>

    ${(b?.categories??[]).map((e,t)=>{let o=(e?.items??[]).filter(e=>e?.isNote?e?.includeInPdf:(e?.quantity??0)>0);if(0===o.length)return"";let r=0,a=0,n=o.map(e=>{if(e?.isNote){let t=e?.noteContent??"";return`
            <tr class="note-row">
              <td></td>
              <td colspan="5" style="font-style: normal;">${t}</td>
            </tr>
          `}a++;let o=(e?.unitCost??0)*(1+(e?.markupPct??0)/100),n=o*(e?.quantity??0);return r+=n,`
          <tr>
            <td>${t+1}.${a}</td>
            <td>${e?.description??""}</td>
            <td>${e?.unit??""}</td>
            <td class="text-right">${m(e?.quantity??0,2)}</td>
            <td class="text-right">${m(o,2)}</td>
            <td class="text-right">${m(n,2)}</td>
          </tr>
        `}).join("");return`
        <div class="category">
          <div class="category-header">${t+1}. ${e?.name??"Category"}</div>
          <table>
            <thead>
              <tr>
                <th style="width: 60px;">Item No</th>
                <th>Description</th>
                <th style="width: 60px;">Unit</th>
                <th style="width: 70px;" class="text-right">Quantity</th>
                <th style="width: 90px;" class="text-right">Rate (${x})</th>
                <th style="width: 100px;" class="text-right">Amount (${x})</th>
              </tr>
            </thead>
            <tbody>
              ${n}
              <tr class="subtotal-row">
                <td colspan="5" class="text-right">Subtotal</td>
                <td class="text-right">${w(r)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `}).join("")}

    <div class="totals-section">
      <table class="totals-table">
        <tr>
          <td class="label">Subtotal</td>
          <td class="value">${w(T)}</td>
        </tr>
        ${b?.discountEnabled===!0&&(b?.discountValue??0)>0?`
        <tr>
          <td class="label">Discount${b?.discountType==="percent"?` (${b?.discountValue}%)`:""}</td>
          <td class="value">-${w(v)}</td>
        </tr>
        `:""}
        ${b?.vatEnabled===!0&&(b?.vatPercent??0)>0?`
        <tr>
          <td class="label">VAT (${b?.vatPercent}%)</td>
          <td class="value">${w(C)}</td>
        </tr>
        `:""}
        <tr class="final-total">
          <td class="label">Final Total</td>
          <td class="value">${w(S+C)}</td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
    `,_=await fetch("https://apps.abacus.ai/api/createConvertHtmlToPdfRequest",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({deployment_token:process.env.ABACUSAI_API_KEY,html_content:R,pdf_options:{format:"A4",margin:{top:"10mm",right:"10mm",bottom:"10mm",left:"10mm"},print_background:!0},base_url:process.env.NEXTAUTH_URL||""})});if(!_.ok){let e=await _.json().catch(()=>({error:"Failed to create PDF request"}));return i.NextResponse.json({success:!1,error:e?.error},{status:500})}let{request_id:P}=await _.json();if(!P)return i.NextResponse.json({success:!1,error:"No request ID returned"},{status:500});let q=0;for(;q<300;){await new Promise(e=>setTimeout(e,1e3));let e=await fetch("https://apps.abacus.ai/api/getConvertHtmlToPdfStatus",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:P,deployment_token:process.env.ABACUSAI_API_KEY})}),o=await e.json(),r=o?.status||"FAILED",s=o?.result||null;if("SUCCESS"===r){if(!s||!s.result)return n=500,i.NextResponse.json({success:!1,error:"PDF generation completed but no result data"},{status:500});{let e=Buffer.from(s.result,"base64");return n=200,console.log(`[PDF_EXPORT_SUCCESS] BOQ: ${t?.id}, Total time: ${a.elapsed()}ms`),new i.NextResponse(e,{headers:{"Content-Type":"application/pdf","Content-Disposition":`attachment; filename="${b?.projectName??"BOQ"}.pdf"`}})}}if("FAILED"===r){let e=s?.error||"PDF generation failed";return n=500,i.NextResponse.json({success:!1,error:e},{status:500})}q++}return n=500,i.NextResponse.json({success:!1,error:"PDF generation timed out"},{status:500})}catch(e){return(0,p.H)(e,{endpoint:"/api/boqs/[id]/pdf",method:"POST",companyId:o,userId:r,action:"pdf_export"}),n=500,i.NextResponse.json({error:"Failed to generate PDF"},{status:500})}finally{(0,p.$B)({endpoint:`/api/boqs/${t?.id}/pdf`,method:"POST",companyId:o,userId:r,durationMs:a.elapsed(),statusCode:n,timestamp:new Date})}}let b=new a.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/boqs/[id]/pdf/route",pathname:"/api/boqs/[id]/pdf",filename:"route",bundlePath:"app/api/boqs/[id]/pdf/route"},resolvedPagePath:"/home/ubuntu/make_estimate/nextjs_space/app/api/boqs/[id]/pdf/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:y,staticGenerationAsyncStorage:x,serverHooks:$}=b,w="/api/boqs/[id]/pdf/route";function T(){return(0,s.patchFetch)({serverHooks:$,staticGenerationAsyncStorage:x})}},86023:(e,t,o)=>{o.d(t,{L:()=>i});var r=o(66291),a=o(3390),n=o.n(a),s=o(83178);let i={providers:[(0,r.Z)({name:"credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let t=await s._.user.findUnique({where:{email:e.email},include:{memberships:{include:{company:!0}}}});if(!t||!await n().compare(e.password,t.password))return null;await s._.user.update({where:{id:t.id},data:{lastLoginAt:new Date}}).catch(e=>console.error("Failed to update lastLoginAt:",e));let o=t?.memberships?.[0];return{id:t.id,email:t.email,name:t.name,companyId:o?.companyId??null,companyName:o?.company?.name??null,role:o?.role??"MEMBER"}}})],callbacks:{jwt:async({token:e,user:t})=>(t&&(e.id=t.id,e.companyId=t.companyId,e.companyName=t.companyName,e.role=t.role),e),session:async({session:e,token:t})=>(e?.user&&(e.user.id=t.id,e.user.companyId=t.companyId,e.user.companyName=t.companyName,e.user.role=t.role),e)},pages:{signIn:"/login"},session:{strategy:"jwt"},secret:process.env.NEXTAUTH_SECRET}},83178:(e,t,o)=>{o.d(t,{_:()=>n});var r=o(53524),a=o(53609);let n=globalThis.prisma??function(){let e=new r.PrismaClient({log:[{level:"error",emit:"stdout"},{level:"warn",emit:"stdout"}]});return"true"===process.env.ENABLE_QUERY_LOGGING&&e.$on("query",e=>{let t=e.duration;(0,a.mV)({query:e.query,params:e.params,durationMs:t,timestamp:new Date,model:function(e){let t=e.match(/FROM\s+["']?public["']?\.?["']?(\w+)["']?/i),o=e.match(/INSERT\s+INTO\s+["']?public["']?\.?["']?(\w+)["']?/i),r=e.match(/UPDATE\s+["']?public["']?\.?["']?(\w+)["']?/i),a=e.match(/DELETE\s+FROM\s+["']?public["']?\.?["']?(\w+)["']?/i);return(t?.[1]||o?.[1]||r?.[1]||a?.[1]||"unknown").toLowerCase()}(e.query),action:function(e){let t=e.trim().toUpperCase();return t.startsWith("SELECT")?"select":t.startsWith("INSERT")?"insert":t.startsWith("UPDATE")?"update":t.startsWith("DELETE")?"delete":t.startsWith("BEGIN")?"transaction":t.startsWith("COMMIT")?"commit":"other"}(e.query)})}),e}()},53609:(e,t,o)=>{o.d(t,{$B:()=>s,AT:()=>c,H:()=>l,eF:()=>d,mV:()=>i});let r=parseInt(process.env.SLOW_QUERY_THRESHOLD||"500",10),a=[],n=[];function s(e){let t=e.durationMs>1e3?"warn":"info",o={type:"REQUEST_METRICS",...e,timestamp:e.timestamp.toISOString()};"warn"===t?console.warn(`[SLOW_REQUEST] ${e.method} ${e.endpoint} took ${e.durationMs}ms`,JSON.stringify(o)):"true"===process.env.VERBOSE_LOGGING&&console.log(`[REQUEST] ${e.method} ${e.endpoint} - ${e.durationMs}ms`,JSON.stringify(o)),a.push(e),a.length>1e3&&a.shift()}function i(e){e.durationMs>=r&&(console.warn(`[SLOW_QUERY] ${e.model}.${e.action} took ${e.durationMs}ms`,JSON.stringify({type:"SLOW_QUERY",...e,timestamp:e.timestamp.toISOString()})),n.push(e),n.length>1e3&&n.shift())}function l(e,t){console.error(`[ERROR] ${t.action||t.endpoint||"Unknown"}`,JSON.stringify({type:"APP_ERROR",message:e.message,stack:e.stack,name:e.name,...t,timestamp:new Date().toISOString()}))}function d(){let e=performance.now();return{elapsed:()=>Math.round(performance.now()-e)}}function c(){return{requests:a.slice(-100),slowQueries:n.slice(-100),summary:{totalRequests:a.length,slowRequests:a.filter(e=>e.durationMs>1e3).length,slowQueries:n.length,avgRequestTime:a.length>0?Math.round(a.reduce((e,t)=>e+t.durationMs,0)/a.length):0}}}}};var t=require("../../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[4372,7329,5990,7609],()=>o(27648));module.exports=r})();