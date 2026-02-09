"use strict";(()=>{var e={};e.id=8211,e.ids=[8211],e.modules={53524:e=>{e.exports=require("@prisma/client")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},86624:e=>{e.exports=require("querystring")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},29744:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>v,patchFetch:()=>k,requestAsyncStorage:()=>$,routeModule:()=>w,serverHooks:()=>E,staticGenerationAsyncStorage:()=>T});var r={};o.r(r),o.d(r,{POST:()=>x,dynamic:()=>y});var a=o(79182),n=o(72007),i=o(56719),s=o(93442),l=o(57978),d=o(86023),c=o(83178),p=o(53609);let u=(e,t=2)=>e.toLocaleString("en-US",{minimumFractionDigits:t,maximumFractionDigits:t}),m=()=>({header:{borderColor:"#0891b2",titleColor:"#0891b2",subtitleColor:"#666666"},categoryHeader:{backgroundPrimary:"#0891b2",backgroundSecondary:"#14b8a6",textColor:"#ffffff"},table:{headerBackground:"#f9fafb",headerTextColor:"#6b7280",borderColor:"#e5e7eb",bodyTextColor:"#333333"},subtotalRow:{background:"#f0fdfa",borderColor:"#14b8a6",textColor:"#333333"},noteRow:{background:"#fffbeb",textColor:"#92400e"},totals:{finalTotalBackground:"#0891b2",finalTotalTextColor:"#ffffff"}}),f=()=>({page:{backgroundColor:"#ffffff",padding:40,defaultFontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"},elements:[{id:"project_name",type:"project_name",enabled:!0,style:{fontSize:36,fontWeight:"bold",italic:!1,underline:!1,color:"#0891b2",align:"center",marginTop:0,marginBottom:20}},{id:"subtitle",type:"subtitle",enabled:!0,text:"Bill of Quantities",style:{fontSize:18,fontWeight:"normal",italic:!1,underline:!1,color:"#666666",align:"center",marginTop:0,marginBottom:10}},{id:"prepared_for",type:"prepared_for",enabled:!0,style:{fontSize:18,fontWeight:"normal",italic:!1,underline:!1,color:"#666666",align:"center",marginTop:0,marginBottom:40}},{id:"company_name",type:"company_name",enabled:!0,style:{fontSize:16,fontWeight:"normal",italic:!1,underline:!1,color:"#333333",align:"center",marginTop:0,marginBottom:0}}]});async function g(e,t,o,r){let a=(0,p.eF)();try{let n,i;await c._.pdfExportJob.update({where:{id:e},data:{status:"processing",startedAt:new Date}}),console.log(`[PDF_PROCESSOR_START] Job: ${e}, BOQ: ${t}, Watermark: ${r?.enabled?"yes":"no"}`);let[s,l]=await Promise.all([c._.boq.findFirst({where:{id:t,companyId:o},include:{customer:!0,coverTemplate:!0,pdfTheme:!0,categories:{include:{items:{orderBy:{sortOrder:"asc"}}},orderBy:{sortOrder:"asc"}}}}),c._.company.findUnique({where:{id:o},include:{pdfCoverTemplates:{where:{isDefault:!0},take:1},pdfThemes:{where:{isDefault:!0},take:1}}})]);if(!s)throw Error("BOQ not found");let d=l?.currencySymbol??"Rs.",p=l?.currencyPosition??"left",g=0;(s?.categories??[]).forEach(e=>{(e?.items??[]).forEach(e=>{if(e?.isNote)return;let t=e?.quantity??0;if(t>0){let o=(e?.unitCost??0)*(1+(e?.markupPct??0)/100);g+=o*t}})});let b=0;s?.discountEnabled&&(s?.discountType==="percent"?s?.discountValue:s?.discountValue),s?.vatEnabled&&s?.vatPercent,n=s.coverTemplate?.configJson?s.coverTemplate.configJson:l?.pdfCoverTemplates?.[0]?.configJson?l.pdfCoverTemplates[0].configJson:f(),i=s.pdfTheme?.configJson?s.pdfTheme.configJson:l?.pdfThemes?.[0]?.configJson?l.pdfThemes[0].configJson:m();let h=function(e,t,o,r,a,n){let i=e.elements.map(e=>{if(!e.enabled)return"";let i=`
      font-size: ${e.style.fontSize}px;
      font-weight: ${e.style.fontWeight};
      font-style: ${e.style.italic?"italic":"normal"};
      text-decoration: ${e.style.underline?"underline":"none"};
      color: ${e.style.color};
      text-align: ${e.style.align};
      margin-top: ${e.style.marginTop}px;
      margin-bottom: ${e.style.marginBottom}px;
    `,s="";switch(e.type){case"project_name":s=t||"Project";break;case"subtitle":s=e.text||"Bill of Quantities";break;case"prepared_for":if(!o)return"";s=`Prepared for: ${o}`;break;case"company_name":s=r||"Company";break;case"logo":if(e.logoUrl){let t=e.logoWidth||200,o=e.logoMaxWidthPercent?`${e.logoMaxWidthPercent}%`:`${t}px`;return`<div style="${i}; display: flex; justify-content: ${e.style.align};">
            <img src="${e.logoUrl}" alt="Logo" style="max-width: ${o}; width: ${t}px; height: auto;" />
          </div>`}return"";case"date":s="preparation_date"===a&&n?new Date(n).toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"}):new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"});break;case"prepared_by":case"custom_text":if(!(s=e.text||""))return""}return`<div style="${i}">${s}</div>`}).join("");return`
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
      ${i}
    </div>
  `}(n,s?.projectName??"Project",s?.customer?.name??null,l?.name??"Company",s?.dateMode??"export_date",s?.preparationDate??null),y=function(e,t,o,r,a,n,i,s){let l=0;(e?.categories??[]).forEach(e=>{(e?.items??[]).forEach(e=>{if(e?.isNote)return;let t=e?.quantity??0;if(t>0){let o=(e?.unitCost??0)*(1+(e?.markupPct??0)/100);l+=o*t}})});let d=0;e?.discountEnabled&&(d=e?.discountType==="percent"?(e?.discountValue??0)/100*l:e?.discountValue??0);let c=l-d,p=e?.vatEnabled?(e?.vatPercent??0)/100*c:0;return`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 11px;
      line-height: 1.4;
      color: ${r.table.bodyTextColor};
    }
    .content-page { padding: 20px 30px; }
    .header {
      border-bottom: 2px solid ${r.header.borderColor};
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .header h1 { font-size: 18px; color: ${r.header.titleColor}; }
    .header p { font-size: 11px; color: ${r.header.subtitleColor}; }
    .category { margin-bottom: 25px; }
    .category-header {
      background: linear-gradient(135deg, ${r.categoryHeader.backgroundPrimary}, ${r.categoryHeader.backgroundSecondary});
      color: ${r.categoryHeader.textColor};
      padding: 8px 12px;
      font-weight: bold;
      font-size: 12px;
      border-radius: 4px 4px 0 0;
    }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid ${r.table.borderColor}; padding: 6px 8px; text-align: left; }
    th {
      background-color: ${r.table.headerBackground};
      font-weight: 600;
      font-size: 10px;
      text-transform: uppercase;
      color: ${r.table.headerTextColor};
    }
    td { font-size: 11px; }
    .text-right { text-align: right; }
    .subtotal-row {
      background-color: ${r.subtotalRow.background};
      font-weight: bold;
      color: ${r.subtotalRow.textColor};
    }
    .subtotal-row td { border-top: 2px solid ${r.subtotalRow.borderColor}; }
    .note-row { background-color: ${r.noteRow.background}; font-style: italic; }
    .note-row td { color: ${r.noteRow.textColor}; }
    .totals-section { margin-top: 30px; page-break-inside: avoid; }
    .totals-table { width: 300px; margin-left: auto; }
    .totals-table td { padding: 8px 12px; }
    .totals-table .label { text-align: left; font-weight: 500; }
    .totals-table .value { text-align: right; font-weight: bold; }
    .final-total {
      background-color: ${r.totals.finalTotalBackground};
      color: ${r.totals.finalTotalTextColor};
    }
    .final-total td { font-size: 14px; }
    ${s?.enabled?`
    /* Watermark styling */
    .watermark {
      position: fixed;
      bottom: 15px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 10px;
      color: rgba(0, 0, 0, 0.15);
      letter-spacing: 0.5px;
      z-index: 1000;
      pointer-events: none;
    }
    @media print {
      .watermark {
        position: fixed;
        bottom: 15px;
      }
    }
    `:""}
  </style>
</head>
<body>
  ${s?.enabled&&s?.text?`<div class="watermark">${s.text}</div>`:""}
  ${o}

  <div class="content-page">
    <div class="header">
      <h1>${e?.projectName??"Project"}</h1>
      ${e?.customer?`<p>Customer: ${e.customer.name}</p>`:""}
    </div>

    ${(e?.categories??[]).map((e,t)=>{let o=(e?.items??[]).filter(e=>e?.isNote?e?.includeInPdf:(e?.quantity??0)>0);if(0===o.length)return"";let r=0,s=0,l=o.map(e=>{if(e?.isNote){let t=e?.noteContent??"";return`
            <tr class="note-row">
              <td></td>
              <td colspan="5" style="font-style: normal;">${t}</td>
            </tr>
          `}s++;let o=(e?.unitCost??0)*(1+(e?.markupPct??0)/100),a=o*(e?.quantity??0);return r+=a,`
          <tr>
            <td>${t+1}.${s}</td>
            <td>${e?.description??""}</td>
            <td>${e?.unit??""}</td>
            <td class="text-right">${i(e?.quantity??0,2)}</td>
            <td class="text-right">${i(o,2)}</td>
            <td class="text-right">${i(a,2)}</td>
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
                <th style="width: 90px;" class="text-right">Rate (${a})</th>
                <th style="width: 100px;" class="text-right">Amount (${a})</th>
              </tr>
            </thead>
            <tbody>
              ${l}
              <tr class="subtotal-row">
                <td colspan="5" class="text-right">Subtotal</td>
                <td class="text-right">${n(r)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `}).join("")}

    <div class="totals-section">
      <table class="totals-table">
        <tr>
          <td class="label">Subtotal</td>
          <td class="value">${n(l)}</td>
        </tr>
        ${e?.discountEnabled===!0&&(e?.discountValue??0)>0?`
        <tr>
          <td class="label">Discount${e?.discountType==="percent"?` (${e?.discountValue}%)`:""}</td>
          <td class="value">-${n(d)}</td>
        </tr>
        `:""}
        ${e?.vatEnabled===!0&&(e?.vatPercent??0)>0?`
        <tr>
          <td class="label">VAT (${e?.vatPercent}%)</td>
          <td class="value">${n(p)}</td>
        </tr>
        `:""}
        <tr class="final-total">
          <td class="label">Final Total</td>
          <td class="value">${n(c+p)}</td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
  `}(s,0,h,i,d,e=>{let t=u(e??0,2);return"left"===p?`${d} ${t}`:`${t} ${d}`},u,r),x=await fetch("https://apps.abacus.ai/api/createConvertHtmlToPdfRequest",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({deployment_token:process.env.ABACUSAI_API_KEY,html_content:y,pdf_options:{format:"A4",margin:{top:"10mm",right:"10mm",bottom:"10mm",left:"10mm"},print_background:!0},base_url:process.env.NEXTAUTH_URL||""})});if(!x.ok)throw Error("Failed to create PDF request");let{request_id:w}=await x.json();if(!w)throw Error("No request ID returned");let $=0;for(;$<300;){await new Promise(e=>setTimeout(e,1e3));let t=await fetch("https://apps.abacus.ai/api/getConvertHtmlToPdfStatus",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({request_id:w,deployment_token:process.env.ABACUSAI_API_KEY})}),o=await t.json(),r=o?.status||"FAILED",n=o?.result||null;if("SUCCESS"===r){if(n&&n.result){let t=n.result,o=`data:application/pdf;base64,${t}`;await c._.pdfExportJob.update({where:{id:e},data:{status:"completed",pdfUrl:o,completedAt:new Date}}),console.log(`[PDF_PROCESSOR_SUCCESS] Job: ${e}, Time: ${a.elapsed()}ms`);return}throw Error("PDF generation completed but no result data")}if("FAILED"===r)throw Error(n?.error||"PDF generation failed");$++}throw Error("PDF generation timed out")}catch(t){console.error(`[PDF_PROCESSOR_ERROR] Job: ${e}, Error:`,t),await c._.pdfExportJob.update({where:{id:e},data:{status:"failed",errorMessage:t instanceof Error?t.message:"Unknown error",completedAt:new Date}})}}var b=o(66417),h=o(90391);let y="force-dynamic";async function x(e,{params:t}){try{let e=await (0,l.getServerSession)(d.L);if(!e?.user)return s.NextResponse.json({error:"Unauthorized"},{status:401});let o=e.user?.companyId,r=e.user?.id,a=t?.id,n=(0,b.um)("PDF_EXPORT",o),i=(0,b.Dn)(n,b.fp.PDF_EXPORT);if(!i.allowed)return console.log(`[PDF_EXPORT_RATE_LIMITED] Company: ${o}, Retry after: ${i.retryAfter}s`),(0,b.tm)(i);if(!o||!r||!a)return s.NextResponse.json({error:"Invalid request"},{status:400});if(!await c._.boq.findFirst({where:{id:a,companyId:o},select:{id:!0,projectName:!0}}))return s.NextResponse.json({error:"BOQ not found"},{status:404});let p=await c._.pdfExportJob.findFirst({where:{boqId:a,companyId:o,status:{in:["pending","processing"]}},orderBy:{createdAt:"desc"}});if(p)return s.NextResponse.json({jobId:p.id,status:p.status,message:"Export already in progress"});let u=await (0,h.qf)(o),m={enabled:u.watermarkEnabled??!1,text:u.watermarkText??null},f=await c._.pdfExportJob.create({data:{boqId:a,companyId:o,userId:r,status:"pending"}});return console.log(`[PDF_ASYNC_JOB_CREATED] Job: ${f.id}, BOQ: ${a}, Company: ${o}, Watermark: ${m.enabled}`),g(f.id,a,o,m).catch(e=>{console.error(`[PDF_ASYNC_JOB_ERROR] Job: ${f.id}, Error:`,e)}),s.NextResponse.json({jobId:f.id,status:"pending",message:"PDF export started"})}catch(e){return console.error("[PDF_ASYNC_ERROR]",e),s.NextResponse.json({error:"Failed to start PDF export"},{status:500})}}let w=new a.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/boqs/[id]/pdf/async/route",pathname:"/api/boqs/[id]/pdf/async",filename:"route",bundlePath:"app/api/boqs/[id]/pdf/async/route"},resolvedPagePath:"/home/ubuntu/make_estimate/nextjs_space/app/api/boqs/[id]/pdf/async/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:$,staticGenerationAsyncStorage:T,serverHooks:E}=w,v="/api/boqs/[id]/pdf/async/route";function k(){return(0,i.patchFetch)({serverHooks:E,staticGenerationAsyncStorage:T})}},86023:(e,t,o)=>{o.d(t,{L:()=>s});var r=o(66291),a=o(3390),n=o.n(a),i=o(83178);let s={providers:[(0,r.Z)({name:"credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let t=await i._.user.findUnique({where:{email:e.email},include:{memberships:{include:{company:!0}}}});if(!t||!await n().compare(e.password,t.password))return null;await i._.user.update({where:{id:t.id},data:{lastLoginAt:new Date}}).catch(e=>console.error("Failed to update lastLoginAt:",e));let o=t?.memberships?.[0];return{id:t.id,email:t.email,name:t.name,companyId:o?.companyId??null,companyName:o?.company?.name??null,role:o?.role??"MEMBER"}}})],callbacks:{jwt:async({token:e,user:t})=>(t&&(e.id=t.id,e.companyId=t.companyId,e.companyName=t.companyName,e.role=t.role),e),session:async({session:e,token:t})=>(e?.user&&(e.user.id=t.id,e.user.companyId=t.companyId,e.user.companyName=t.companyName,e.user.role=t.role),e)},pages:{signIn:"/login"},session:{strategy:"jwt"},secret:process.env.NEXTAUTH_SECRET}},66417:(e,t,o)=>{o.d(t,{Dn:()=>n,S2:()=>d,fp:()=>i,tm:()=>l,um:()=>s});let r=new Map,a=null;function n(e,t){let o=Date.now(),a=o-t.windowMs,n=r.get(e);if(n||(n={timestamps:[],blocked:!1},r.set(e,n)),n.blocked&&n.blockedUntil){if(o<n.blockedUntil){let e=Math.ceil((n.blockedUntil-o)/1e3);return{allowed:!1,remaining:0,resetIn:n.blockedUntil-o,retryAfter:e}}n.blocked=!1,n.blockedUntil=void 0,n.timestamps=[]}if(n.timestamps=n.timestamps.filter(e=>e>a),n.timestamps.length>=t.maxRequests){t.blockDurationMs&&(n.blocked=!0,n.blockedUntil=o+t.blockDurationMs);let r=n.timestamps[0]+t.windowMs-o;return console.log(`[RATE_LIMIT_EXCEEDED] Key: ${e}, Requests: ${n.timestamps.length}/${t.maxRequests}`),{allowed:!1,remaining:0,resetIn:r,retryAfter:Math.ceil(r/1e3)}}return n.timestamps.push(o),{allowed:!0,remaining:t.maxRequests-n.timestamps.length,resetIn:t.windowMs}}setInterval(()=>{let e=Date.now();for(let[t,o]of r.entries())e-(o.timestamps[o.timestamps.length-1]||0)>6e5&&r.delete(t)},3e5);let i={PDF_EXPORT:{windowMs:6e4,maxRequests:10,blockDurationMs:3e4},AUTOSAVE:{windowMs:6e4,maxRequests:60},ITEM_UPDATE:{windowMs:6e4,maxRequests:120},BOQ_CREATE:{windowMs:6e4,maxRequests:20},API_GENERAL:{windowMs:6e4,maxRequests:200}};function s(e,t){return`${e}:${t}`}function l(e){return new Response(JSON.stringify({error:"Too many requests",message:"Rate limit exceeded. Please try again later.",retryAfter:e.retryAfter}),{status:429,headers:{"Content-Type":"application/json","Retry-After":String(e.retryAfter||60),"X-RateLimit-Remaining":String(e.remaining),"X-RateLimit-Reset":String(Math.ceil(e.resetIn/1e3))}})}function d(){let e={};for(let[t,o]of r.entries())e[t]={count:o.timestamps.length,blocked:o.blocked};return e}}};var t=require("../../../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[4372,7329,5990,7609,391],()=>o(29744));module.exports=r})();