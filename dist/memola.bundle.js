"use strict";(()=>{var B1=Object.create;var Yl=Object.defineProperty;var D1=Object.getOwnPropertyDescriptor;var _1=Object.getOwnPropertyNames;var R1=Object.getPrototypeOf,N1=Object.prototype.hasOwnProperty;var L=(e,t)=>()=>(e&&(t=e(e=0)),t);var jt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),q=(e,t)=>{for(var o in t)Yl(e,o,{get:t[o],enumerable:!0})},db=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of _1(t))!N1.call(e,r)&&r!==o&&Yl(e,r,{get:()=>t[r],enumerable:!(n=D1(t,r))||n.enumerable});return e};var O1=(e,t,o)=>(o=e!=null?B1(R1(e)):{},db(t||!e||!e.__esModule?Yl(o,"default",{value:e,enumerable:!0}):o,e)),H1=e=>db(Yl({},"__esModule",{value:!0}),e);var Ip={};q(Ip,{DRAFT_KEY_PREFIX:()=>Ep,prefAiClaudeKey:()=>Jl,prefAiClaudeModel:()=>Xl,prefAiCorpBaseUrl:()=>no,prefAiCorpDeployPrefix:()=>pa,prefAiCorpKey:()=>Zl,prefAiCorpModel:()=>ma,prefAiCorpOverrides:()=>Ql,prefAiEmbedApiVersion:()=>ha,prefAiEmbedDimensions:()=>ba,prefAiEmbedModel:()=>ga,prefAiEmbedProvider:()=>ua,prefAiHistory:()=>ec,prefAiLocalBaseUrl:()=>tc,prefAiLocalKey:()=>oc,prefAiLocalModel:()=>nc,prefAiLocalModels:()=>rc,prefAiLocalReasoningModels:()=>ac,prefAiPaneOpen:()=>es,prefAiPanelOpen:()=>$1,prefAiPanelWidth:()=>K1,prefAiProvider:()=>da,prefAiVoyageKey:()=>ic,prefAiVoyageModel:()=>fa,prefCalDateField:()=>gc,prefCurrentWsName:()=>cr,prefCurrentWsUrl:()=>dr,prefDbColOrder:()=>nT,prefDbColOrderLegacy:()=>pc,prefDbColWidths:()=>aT,prefDbGanttConfig:()=>fc,prefDbRowOrder:()=>rT,prefDbRowOrderLegacy:()=>uc,prefDbViewColors:()=>lr,prefDensity:()=>Vi,prefDevBundleSource:()=>Gi,prefDevLocalBase:()=>sc,prefFocusMode:()=>Ea,prefLastOpenedPages:()=>Xi,prefLastSavedBy:()=>sT,prefLastSeenEtag:()=>$o,prefOutlineOpen:()=>Zi,prefOutlineWidth:()=>q1,prefPaneAiWidth:()=>wp,prefPaneOutlineWidth:()=>xp,prefPanePropsWidth:()=>kp,prefPaneSbWidth:()=>yp,prefPresenceEnabled:()=>mr,prefPropertiesOpen:()=>Qi,prefPropsPanelOpen:()=>W1,prefPropsPanelWidth:()=>G1,prefRagMinScore:()=>ya,prefRag外部ベクトルFolder:()=>xa,prefRag外部ベクトルKinds:()=>ka,prefRagTopK:()=>va,prefSaveDelayMs:()=>wa,prefSiblingOrder:()=>iT,prefSidebarOpen:()=>z1,prefSidebarState:()=>Ia,prefSidebarWidth:()=>j1,prefSyncPollMs:()=>kn,prefTabs:()=>Ji,prefTheme:()=>Yi,prefTreeOrder:()=>mc,prefWorkspaces:()=>dc,prefXChatHistory:()=>lc,prefXChatOpen:()=>cc});function mb(e){try{return localStorage.getItem(e)||""}catch{return""}}function pb(e,t){try{t===""||t==null?localStorage.removeItem(e):localStorage.setItem(e,t)}catch{}}function ub(e){try{localStorage.removeItem(e)}catch{}}function F1(e,t){let o=mb(e);if(!o)return t;try{return JSON.parse(o)}catch{return t}}function U1(e,t){try{pb(e,JSON.stringify(t))}catch{}}function X(e,t=""){return{key:e,get:()=>mb(e)||t,set:o=>pb(e,o),clear:()=>ub(e)}}function oo(e,t){return{key:e,get:()=>F1(e,t),set:o=>U1(e,o),clear:()=>ub(e)}}function nT(e){return oo(V1+e,[])}function rT(e){return oo(Y1+e,[])}function pc(e){return oo(X1+e,[])}function uc(e){return oo(J1+e,[])}function fc(e,t){return oo(Z1+e,t)}function aT(e){return oo(Q1+e,{})}function iT(e){return oo(eT+(e||"_root"),[])}function gc(e){return X(tT+e)}function sT(e){return X(oT+e)}function $o(e){return X(lT+e)}var lr,da,Xl,Jl,ma,Zl,no,pa,Ql,ec,tc,oc,nc,rc,ac,ua,ic,fa,ga,ha,ba,va,ya,Gi,sc,xa,ka,lc,cc,dc,cr,dr,Vi,Yi,wa,kn,mr,Xi,Ji,z1,j1,Zi,q1,$1,K1,W1,G1,Ea,Ia,Qi,es,yp,xp,kp,wp,V1,Y1,X1,J1,Z1,Q1,eT,tT,oT,mc,lT,Ep,ve=L(()=>{"use strict";lr=oo("memola.dbViewColors",{}),da=X("memola.ai.provider","claude"),Xl=X("memola.ai.claudeModel"),Jl=X("memola.anthropic.apiKey"),ma=X("memola.ai.corpModel"),Zl=X("memola.ai.corpKey"),no=X("memola.ai.corpBaseUrl"),pa=X("memola.ai.corpDeployPrefix"),Ql=X("memola.ai.corpOverrides"),ec=X("memola.ai.history"),tc=X("memola.ai.localBaseUrl"),oc=X("memola.ai.localKey"),nc=X("memola.ai.localModel"),rc=X("memola.ai.localModels"),ac=X("memola.ai.localReasoningModels"),ua=X("memola.ai.embedProvider","voyage"),ic=X("memola.ai.voyageKey"),fa=X("memola.ai.voyageModel","voyage-3.5-lite"),ga=X("memola.ai.embedModel","text-embedding-3-small"),ha=X("memola.ai.embedApiVersion","2024-02-01"),ba=X("memola.ai.embedDimensions",""),va=X("memola.rag.topK","8"),ya=X("memola.rag.minScore","0.2"),Gi=X("memola.dev.bundle-source",""),sc=X("memola.dev.local-base","http://127.0.0.1:18080/memola"),xa=X("memola.rag.extvecFolder",""),ka=X("memola.rag.extvecKinds","mail,onenote,pptx,doc,transcript"),lc=X("memola.xchat.history"),cc=X("memola.xchat.open"),dc=X("memola.workspaces"),cr=X("memola.workspace.current"),dr=X("memola.workspace.currentUrl"),Vi=X("memola.density","regular"),Yi=X("memola.theme","light"),wa=X("memola.save.delayMs","2000"),kn=X("memola.sync.pollMs","30000"),mr=X("memola.presence.enabled","1"),Xi=oo("memola.lastOpenedPage",{}),Ji=oo("memola.tabs",{}),z1=X("memola.sb.open"),j1=X("memola.sb.width"),Zi=X("memola.outline.open"),q1=X("memola.outline.width"),$1=X("memola.ai.panelOpen"),K1=X("memola.ai.panelWidth"),W1=X("memola.props.open"),G1=X("memola.props.width"),Ea=X("memola.focus"),Ia=X("memola.sidebar"),Qi=X("memola.properties.open"),es=X("memola.page.aiPane"),yp=X("memola.pane.sb"),xp=X("memola.pane.outline"),kp=X("memola.pane.props"),wp=X("memola.pane.ai"),V1="memola.db.colOrder.",Y1="memola.db.rowOrder.",X1="memola.db.colorder.",J1="memola.db.roworder.",Z1="memola.db.gantt.",Q1="memola.db.colWidths.",eT="memola.tree.sib.",tT="memola.cal.dateField.",oT="memola.lastSavedBy.",mc=oo("memola.tree.order",{});lT="memola.lastSeenEtag.";Ep="memola.draft."});function Tp(e){G=e.replace(/\/$/,""),Ko=G.replace(/https:\/\/[^\/]+/,""),ts=Ko+"/Shared Documents/memola-pages"}function fb(){let e=location.href.match(/(https:\/\/[^\/]+\/sites\/[^\/]+)/),t=dr.get();t||(t=e?e[1]:location.origin),Tp(t)}var G,Ko,ts,os,hc,He=L(()=>{"use strict";ve();G="",Ko="",ts="",os=1e4,hc=100});var gb={};q(gb,{ICONS:()=>$});var xe,$,ns=L(()=>{"use strict";xe=e=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,$={search:xe('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),plus:xe('<path d="M12 5v14M5 12h14"/>'),link:xe('<path d="M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"/><path d="M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"/>'),copy:xe('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>'),filter:xe('<path d="M3 5h18l-7 9v6l-4-2v-4z"/>'),sort:xe('<path d="M3 6h13M3 12h9M3 18h5"/><path d="M17 16l4 4 4-4" transform="translate(-4 -4)"/>'),trash:xe('<path d="M3 6h18"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>'),edit:xe('<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>'),refresh:xe('<path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>'),gear:xe('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),send:xe('<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>'),chat:xe('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>'),stop:xe('<rect x="6" y="6" width="12" height="12" rx="1"/>'),close:xe('<path d="M6 6l12 12M18 6L6 18"/>'),exit:xe('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>'),sparkle:xe('<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="2.5"/>'),info:xe('<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/>'),code:xe('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),codeBlock:xe('<rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="10 14 8 12 10 10"/><polyline points="14 10 16 12 14 14"/>'),ul:xe('<line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1.3" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="4.5" cy="18" r="1.3" fill="currentColor" stroke="none"/>'),ol:xe('<line x1="10" y1="6" x2="20" y2="6"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="10" y1="18" x2="20" y2="18"/><path d="M3.5 4.5L5 3.5v5"/><path d="M3.5 8.5h3"/>'),todo:xe('<rect x="3" y="3" width="18" height="18" rx="3"/><polyline points="8 12 11 15 16 9"/>'),hr:xe('<line x1="4" y1="12" x2="20" y2="12"/>'),database:xe('<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>'),page:xe('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>'),table:xe('<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/>'),board:xe('<rect x="3" y="3" width="6" height="18" rx="1"/><rect x="11" y="3" width="6" height="11" rx="1"/><rect x="19" y="3" width="2" height="7" rx="1"/>'),sidebar:xe('<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>'),chevronLeft:xe('<polyline points="15 18 9 12 15 6"/>'),chevronRight:xe('<polyline points="9 18 15 12 9 6"/>'),download:xe('<path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><line x1="4" y1="21" x2="20" y2="21"/>'),print:xe('<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>'),quote:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 11c0-2.2 1.3-4 4-4v2c-1 0-2 1-2 2h2v5H5v-5zm8 0c0-2.2 1.3-4 4-4v2c-1 0-2 1-2 2h2v5h-4v-5z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>'}});var qt={};q(qt,{S:()=>m,resetAppState:()=>Lp});function Lp(){m.meta={pages:[]},m.tabs=[],m.activeTabId=null,m.currentId=null,m.currentType="page",m.dbFields=[],m.dbItems=[],m.dbList="",m.dbSort={field:null,asc:!0},m.dbFilters=[],m.dbColumnWidths={},m.currentRow=null,m.dbSelected.clear(),m.ai.messages=[],m.ai.loading=!1,m.sync.pageId=null,m.sync.loadedModified=null,m.sync.loadedEtag=null,m.sync.pollTimer&&(clearInterval(m.sync.pollTimer),m.sync.pollTimer=null),m.expanded.clear(),m.dirty=!1,m.saving=!1}var m,j=L(()=>{"use strict";m={get pages(){return this.meta.pages.filter(e=>!e.trashed).map(e=>({Id:e.id,Title:e.title,ParentId:e.parent||"",Type:e.type||"page",IsDraft:!!e.originPageId}))},meta:{pages:[]},tabs:[],activeTabId:null,currentId:null,currentType:"page",dbFields:[],dbItems:[],dbList:"",dbSort:{field:null,asc:!0},dbFilters:[],dbView:"table",dbColumnWidths:{},currentRow:null,dbSelected:new Set,ai:{panelOpen:!1,messages:[],loading:!1},sync:{pageId:null,loadedModified:null,loadedEtag:null,pollTimer:null},expanded:new Set,dirty:!1,saving:!1}});function E(e){let t=document.getElementById("memola-"+e);if(!t)throw new Error("Memola: missing element memola-"+e);return t}function bb(){let e=document.getElementById("memola-overlay");if(!e)throw new Error("Memola: overlay not mounted");return e}function Pe(){return E("ed")}var me=L(()=>{"use strict"});function bc(e){if(!e)return null;let t=String(e).trim();if(!t)return null;let o="",n="",r="",a=t.match(/^(\d{4})(\d{2})(\d{2})$/);if(a)o=a[1],n=a[2],r=a[3];else{let s=t.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);if(!s)return null;o=s[1],n=s[2].padStart(2,"0"),r=s[3].padStart(2,"0")}let i=new Date(`${o}-${n}-${r}T00:00:00Z`);return isNaN(i.getTime())||i.getUTCFullYear()!==Number(o)||i.getUTCMonth()+1!==Number(n)||i.getUTCDate()!==Number(r)?null:`${o}-${n}-${r}`}function bo(e){if(!e)return"";if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;let t=new Date(e);if(isNaN(t.getTime()))return"";let o=new Date(t.getTime()+9*60*60*1e3),n=o.getUTCFullYear(),r=String(o.getUTCMonth()+1).padStart(2,"0"),a=String(o.getUTCDate()).padStart(2,"0");return`${n}-${r}-${a}`}function yb(){let e=new Date,t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${o}-${n}`}function xb(){let e=new Date,t=new Date(e.getTime()+9*3600*1e3),o=t.getUTCFullYear(),n=String(t.getUTCMonth()+1).padStart(2,"0"),r=String(t.getUTCDate()).padStart(2,"0"),a=String(t.getUTCHours()).padStart(2,"0"),i=String(t.getUTCMinutes()).padStart(2,"0"),s=vb[t.getUTCDay()];return`\u73FE\u5728\u306E\u65E5\u6642 (JST): ${o}-${n}-${r} ${a}:${i} (${s}\u66DC\u65E5)`}function wn(e){let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return"";let o=new Date,n=t.toDateString()===o.toDateString(),r=new Date(o);r.setDate(o.getDate()-1);let a=t.toDateString()===r.toDateString(),i=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return n?`${i}:${s}`:a?`\u6628\u65E5 ${i}:${s}`:t.getFullYear()===o.getFullYear()?`${t.getMonth()+1}/${t.getDate()} ${i}:${s}`:`${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()}`}function vc(e){let t=e.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!t)return e;let o=new Date(Date.UTC(Number(t[1]),Number(t[2])-1,Number(t[3]))),n=vb[o.getUTCDay()];return`${e} (${n})`}function yc(e){return/^\d{4}-\d{2}-\d{2}(\s*\([^)]+\))?\s*$/.test(e)}var vb,vo=L(()=>{"use strict";vb=["\u65E5","\u6708","\u706B","\u6C34","\u6728","\u91D1","\u571F"]});function w(e,t,o){let n=E("tk");n.textContent=e,n.className="on"+(t==="err"?" er":""),clearTimeout(kb),kb=setTimeout(()=>{n.className=""},o||3500)}function R(e,t){E("lm").textContent=" "+(t||"\u8AAD\u307F\u8FBC\u307F\u4E2D..."),E("ld").classList.toggle("off",!e)}function wb(e){return"\u4FDD\u5B58\u6E08 "+wn(e)}function Qe(e){let t=E("ss");e==="saved"||e==="\u4FDD\u5B58\u6E08"||e==="\u4FDD\u5B58\u6E08\u307F"||e===""?(t.textContent=wb(new Date),t.dataset.state="saved"):e==="saving"||e==="\u4FDD\u5B58\u4E2D..."?(t.textContent="\u4FDD\u5B58\u4E2D\u2026",t.dataset.state="saving"):(t.textContent=e,t.dataset.state=e==="\u672A\u4FDD\u5B58"?"dirty":"")}function Wo(e){let t=E("ss");if(!e){t.textContent="",t.dataset.state="";return}let o=typeof e=="string"?new Date(e):e;if(Number.isNaN(o.getTime())){t.textContent="",t.dataset.state="";return}t.textContent=wb(o),t.dataset.state="saved"}function En(e){e.style.height="auto",e.style.height=e.scrollHeight+"px"}var kb,le=L(()=>{"use strict";me();vo();if(typeof window<"u"){let e=()=>{let t=document.getElementById("memola-ss");t&&(navigator.onLine||(t.textContent="\u30AA\u30D5\u30E9\u30A4\u30F3",t.dataset.state="offline"))};window.addEventListener("offline",e),window.addEventListener("online",()=>{let t=document.getElementById("memola-ss");t&&t.dataset.state==="offline"&&(t.textContent="",t.dataset.state="")})}});function Eb(){rs=null,Sp=0}async function ke(){if(rs&&Date.now()<Sp)return rs;let e=await fetch(G+"/_api/contextinfo",{method:"POST",headers:{Accept:"application/json;odata=verbose"},credentials:"include"});if(!e.ok)throw new Error("\u8A8D\u8A3C\u5931\u6557("+e.status+")\u3002SharePoint\u306B\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044\u3002");return rs=(await e.json()).d.GetContextWebInformation.FormDigestValue,Sp=Date.now()+25*60*1e3,rs}var rs,Sp,pr=L(()=>{"use strict";He();rs=null,Sp=0});function J(e,t=""){return G+"/_api/web/lists/getbytitle('"+e+"')"+t}async function ne(e){let t=await fetch(e,{headers:{Accept:Mp},credentials:"include"});return t.ok?(await t.json()).d:null}var Mp,yo,Et=L(()=>{"use strict";He();Mp="application/json;odata=verbose",yo={Accept:Mp,"Content-Type":Mp}});var Go={};q(Go,{addListField:()=>Nt,applyOwnerOnlyAcl:()=>as,clearListCaches:()=>Cp,createList:()=>Ta,createListItem:()=>_e,deleteList:()=>La,deleteListField:()=>Bp,deleteListItem:()=>$e,ensureList:()=>Rt,getListEntityType:()=>Ap,getListFields:()=>Ue,getListItemById:()=>is,getListItems:()=>Ie,resolveRoleDefId:()=>Lb,restoreSoftDelete:()=>Ec,setColumnIndexed:()=>ur,setListVersionLimit:()=>Ic,softDelete:()=>wc,updateListItem:()=>ze,updateListItemIfMatch:()=>fr});function kc(e){try{let n=JSON.parse(e)?.error?.message?.value;if(n)return n}catch{}let t=e.match(/"value"\s*:\s*"((?:\\.|[^"\\])*)"/);if(!t)return"";try{return JSON.parse('"'+t[1]+'"')}catch{return t[1]}}function Cp(){for(let e of Object.keys(In))delete In[e]}async function Ta(e){let t=await ke(),o=await fetch(G+"/_api/web/lists",{method:"POST",headers:{...yo,"X-RequestDigest":t},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.List"},BaseTemplate:100,Title:e,Description:"Memola"})});if(!o.ok)throw new Error("\u30EA\u30B9\u30C8\u4F5C\u6210\u5931\u6557: "+o.status)}async function La(e){let t=await ke();await fetch(J(e),{method:"POST",headers:{"X-RequestDigest":t,"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include"})}async function Lb(e){if(xc[e])return xc[e];let t=cT[e];if(t){let n=G+"/_api/web/roledefinitions?$select=Id,Name,RoleTypeKind&$filter="+encodeURIComponent("RoleTypeKind eq "+t.kind);try{let a=(await ne(n))?.results?.[0]?.Id;if(a)return xc[e]=a,a}catch{}}let o=t?.names??[e];for(let n of o){let r=G+"/_api/web/roledefinitions?$select=Id,Name&$filter="+encodeURIComponent("Name eq '"+n.replace(/'/g,"''")+"'");try{let i=(await ne(r))?.results?.[0]?.Id;if(i)return xc[e]=i,i}catch{}}throw new Error("\u30ED\u30FC\u30EB\u5B9A\u7FA9\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093: "+e+" (\u8A66\u3057\u305F\u5019\u88DC: RoleTypeKind="+(t?.kind??"\u306A\u3057")+", Name="+o.join(" / ")+")")}async function as(e,t){if(!t)throw new Error("principalId \u304C\u89E3\u6C7A\u3067\u304D\u307E\u305B\u3093 \u2014 ACL \u8A2D\u5B9A\u4E2D\u6B62");let o=await Lb("Full Control");if(await dT(e,t,o).catch(()=>!1))return;let r=await ke(),a=J(e,"/breakroleinheritance(copyRoleAssignments=false,clearSubscopes=true)"),i=await fetch(a,{method:"POST",headers:{...yo,"X-RequestDigest":r},credentials:"include"});if(!i.ok&&i.status!==400)throw new Error("\u6A29\u9650\u7D99\u627F\u306E\u5207\u65AD\u306B\u5931\u6557: "+i.status);let s=J(e,"/roleassignments/addroleassignment(principalid="+t+",roledefid="+o+")"),l=await fetch(s,{method:"POST",headers:{...yo,"X-RequestDigest":r},credentials:"include"});if(!l.ok)throw new Error("\u6A29\u9650\u4ED8\u4E0E\u306B\u5931\u6557: "+l.status)}async function dT(e,t,o){if(!(await ne(J(e,"?$select=HasUniqueRoleAssignments")))?.HasUniqueRoleAssignments)return!1;let a=(await ne(J(e,"/roleassignments?$expand=RoleDefinitionBindings&$select=PrincipalId,RoleDefinitionBindings/Id")))?.results??[];if(a.length===0)return!1;let i=!1;for(let s of a){let l=s.RoleDefinitionBindings?.results?.map(c=>c.Id)??[];if(s.PrincipalId===t)if(l.includes(o))i=!0;else return!1;else return!1}return i}async function wc(e,t,o,n=Date.now()){await ze(e,t,{Trashed:n,TrashedBy:o})}async function Ec(e,t){await ze(e,t,{Trashed:0,TrashedBy:0})}async function Rt(e){let t=await ne(J(e.title))!=null;t||await Ta(e.title);for(let o of e.fields){try{await Nt(e.title,o.name,o.kind,o.choices)}catch{}o.indexed&&await ur(e.title,o.name).catch(()=>{})}return await Ic(e.title,hc).catch(()=>{}),!t}async function Ap(e){if(In[e])return In[e];let t=await ne(J(e,"?$select=ListItemEntityTypeFullName"));if(!t)throw new Error("\u30A8\u30F3\u30C6\u30A3\u30C6\u30A3\u30BF\u30A4\u30D7\u53D6\u5F97\u5931\u6557");return In[e]=t.ListItemEntityTypeFullName,In[e]}async function Ue(e){let t=await ne(J(e,"/fields?$filter=Hidden eq false and ReadOnlyField eq false&$select=Title,InternalName,FieldTypeKind,Choices"));if(!t)throw new Error("\u30B9\u30AD\u30FC\u30DE\u53D6\u5F97\u5931\u6557");return t.results.filter(o=>[2,3,4,6,8,9].indexOf(o.FieldTypeKind)>=0).map(o=>{let n={Title:o.Title,InternalName:o.InternalName,FieldTypeKind:o.FieldTypeKind};return o.FieldTypeKind===6&&o.Choices&&o.Choices.results&&(n.Choices=o.Choices.results),n})}function Sb(e){let t=e;for(let o of Object.keys(e))if(o.startsWith("OData_")){let n=o.substring(6);n in t||(t[n]=e[o])}return t}async function Ie(e,t){let o=[],n=t?"&$select="+encodeURIComponent(t):"",r=J(e,"/items?$orderby=Id&$top=500"+n);for(let a=0;r&&a<200;a++){let i=await fetch(r,{headers:{Accept:"application/json;odata=verbose"},credentials:"include"});if(!i.ok)throw new Error("\u30C7\u30FC\u30BF\u53D6\u5F97\u5931\u6557");let s=await i.json(),l=s.d?.results||[];for(let c of l)o.push(Sb(c));r=s.d?.__next}return o}async function is(e,t){let o=await ne(J(e,"/items("+t+")"));return o?Sb(o):null}async function _e(e,t){let o=await Ap(e),n=await ke(),r={__metadata:{type:o}};for(let s of Object.keys(t)){if(s==="__metadata")continue;let l=s.startsWith("_")?"OData_"+s:s;r[l]=t[s]}let a=await fetch(J(e,"/items"),{method:"POST",headers:{...yo,"X-RequestDigest":n},credentials:"include",body:JSON.stringify(r)});if(!a.ok){let s=await a.text().catch(()=>""),l=kc(s);throw!l&&s&&s.length<300&&(l=s),(a.status===403||a.status===401)&&delete In[e],new Error("\u884C\u8FFD\u52A0\u5931\u6557: "+a.status+(l?" \u2014 "+l:""))}return(await a.json()).d}async function $e(e,t){let o=await ke(),n=await fetch(J(e,"/items("+t+")"),{method:"POST",headers:{"X-RequestDigest":o,"X-HTTP-Method":"DELETE","If-Match":"*"},credentials:"include"});if(n.status!==404&&!n.ok)throw new Error("\u524A\u9664\u5931\u6557: "+n.status)}async function Nt(e,t,o,n){let r={2:"SP.FieldText",3:"SP.FieldMultiLineText",4:"SP.FieldDateTime",8:"SP.FieldBoolean",9:"SP.FieldNumber",6:"SP.FieldChoice"},a=await ke(),i=typeof o=="string"?parseInt(o,10):o,s;i===6?s={__metadata:{type:"SP.FieldChoice"},FieldTypeKind:6,Title:t,Choices:{__metadata:{type:"Collection(Edm.String)"},results:n||[]}}:i===3?s={__metadata:{type:"SP.FieldMultiLineText"},FieldTypeKind:3,Title:t,NumberOfLines:6,RichText:!1,AppendOnly:!1}:i===4?s={__metadata:{type:"SP.FieldDateTime"},FieldTypeKind:4,Title:t,DisplayFormat:0,FriendlyDisplayFormat:0,DateTimeCalendarType:1}:s={__metadata:{type:r[i]||"SP.FieldText"},FieldTypeKind:i,Title:t},delete In[e];let l=await fetch(J(e,"/fields"),{method:"POST",headers:{...yo,"X-RequestDigest":a},credentials:"include",body:JSON.stringify(s)});if(!l.ok){let d=await l.text().catch(()=>""),p=kc(d);throw!p&&d&&d.length<200&&(p=d),new Error("\u5217\u8FFD\u52A0\u5931\u6557: "+l.status+(p?" \u2014 "+p:""))}return(await l.json()).d}async function Bp(e,t){let o=await ke(),n=J(e,"/fields/getbyinternalnameortitle('"+t+"')"),r=await fetch(n,{method:"POST",headers:{"X-RequestDigest":o,"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include"});if(!r.ok&&r.status!==404)throw new Error("\u5217\u524A\u9664\u5931\u6557: "+r.status)}async function ur(e,t){let o=await ke(),n=J(e,"/fields/getbyinternalnameortitle('"+t+"')");await fetch(n,{method:"POST",headers:{...yo,"X-RequestDigest":o,"X-HTTP-Method":"MERGE","IF-MATCH":"*"},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Field"},Indexed:!0})}).catch(()=>{})}async function Ic(e,t){if(!(t>=1))return;let o=await ke();await fetch(J(e),{method:"POST",headers:{...yo,"X-RequestDigest":o,"X-HTTP-Method":"MERGE","IF-MATCH":"*"},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.List"},EnableVersioning:!0,MajorVersionLimit:t})}).catch(()=>{})}function Ib(e){return/存在しません|does not exist/i.test(e)}async function Tb(e,t){let o=await Ue(e).catch(()=>[]);if(o.length===0)return t;let n=new Map(o.map(i=>[i.InternalName,i])),r=new Map(o.map(i=>[i.Title,i])),a={};for(let i of Object.keys(t)){if(i==="__metadata"){a[i]=t[i];continue}let s=n.get(i)||r.get(i);a[s?s.InternalName:i]=t[i]}return a}async function ze(e,t,o){await Pp(e,t,o,!0)}async function fr(e,t,o,n){let r=await Ap(e),a=await ke(),i={__metadata:{type:r}};for(let d of Object.keys(o)){if(d==="__metadata")continue;let p=d.startsWith("_")?"OData_"+d:d;i[p]=o[d]}let s=await fetch(J(e,"/items("+t+")"),{method:"POST",headers:{...yo,"X-RequestDigest":a,"X-HTTP-Method":"MERGE","IF-MATCH":n},credentials:"include",body:JSON.stringify(i)});if(s.ok)return{ok:!0};if(s.status===412)return{ok:!1,reason:"conflict"};let l=await s.text().catch(()=>""),c=kc(l);throw new Error("\u66F4\u65B0\u5931\u6557(If-Match): "+s.status+(c?" \u2014 "+c:""))}async function Pp(e,t,o,n){let r=await ke(),a=Object.entries(o).filter(([d])=>d!=="__metadata").map(([d,p])=>({FieldName:d,FieldValue:p==null?"":String(p)})),i=await fetch(J(e,"/items("+t+")/validateUpdateListItem"),{method:"POST",headers:{...yo,"X-RequestDigest":r},credentials:"include",body:JSON.stringify({formValues:a,bNewDocumentUpdate:!1})});if(!i.ok){let d=await i.text().catch(()=>""),p=kc(d);if(n&&Ib(p)){let u=await Tb(e,o);if(Object.keys(u).some(g=>!(g in o))){await Pp(e,t,u,!1);return}}throw new Error("\u66F4\u65B0\u5931\u6557: "+i.status+(p?" \u2014 "+p:""))}let l=(await i.json()).d.ValidateUpdateListItem.results.filter(d=>d.ErrorMessage);if(l.length===0)return;let c=l.some(d=>Ib(d.ErrorMessage||""));if(n&&c){let d=await Tb(e,o);if(Object.keys(d).some(u=>!(u in o))){await Pp(e,t,d,!1);return}}throw new Error("\u66F4\u65B0\u5931\u6557: "+l.map(d=>d.FieldName+": "+d.ErrorMessage).join(", "))}var In,xc,cT,Re=L(()=>{"use strict";He();pr();Et();In={};xc={},cT={"Full Control":{kind:5,names:["Full Control","\u30D5\u30EB \u30B3\u30F3\u30C8\u30ED\u30FC\u30EB","\u30D5\u30EB\u30B3\u30F3\u30C8\u30ED\u30FC\u30EB"]},Edit:{kind:4,names:["Edit","\u7DE8\u96C6"]},Contribute:{kind:3,names:["Contribute","\u6295\u7A3F","\u30B3\u30F3\u30C8\u30EA\u30D3\u30E5\u30FC\u30C8"]},Read:{kind:2,names:["Read","\u8AAD\u307F\u53D6\u308A","\u8AAD\u53D6\u308A"]}}});function Q(){return Mb+=1,"blk_"+mT+"-"+Mb.toString(36)}function Pb(e){return e===""?[]:[{kind:"text",text:e}]}function It(e){let t="";for(let o of e)o.kind==="text"||o.kind==="code"?t+=o.text:o.kind==="br"?t+=`
`:o.kind==="pagelink"?t+=o.alias||o.pageId:o.kind==="dailylink"?t+=o.alias||o.date:(o.kind==="bold"||o.kind==="italic"||o.kind==="strike"||o.kind==="link")&&(t+=It(o.children));return t}var Mb,mT,Vo=L(()=>{"use strict";Mb=0,mT=Math.random().toString(36).slice(2,8)+Math.random().toString(36).slice(2,6)});var Dp={};q(Dp,{blocksToMd:()=>Ve,mdToBlocks:()=>Ge,parseInline:()=>ss});function Ge(e){let t=e.replace(/\r\n?/g,`
`).split(`
`),o=[],n=0;for(;n<t.length;){let r=t[n];if(/^\s*$/.test(r)){n++;continue}let a=hT(r);if(a){o.push(a),n++;continue}if(/^\s*---+\s*$/.test(r)||/^\s*\*\*\*+\s*$/.test(r)){let b={id:Q(),kind:"rule"};o.push(b),n++;continue}let i=r.match(/^```(\S*)\s*$/);if(i){let b=i[1]||"",h=[];for(n++;n<t.length&&!/^```\s*$/.test(t[n]);)h.push(t[n]),n++;n<t.length&&n++;let v={id:Q(),kind:"code",lang:b,text:h.join(`
`)};o.push(v);continue}let s=r.match(/^(#{1,3})\s+(.*)$/);if(s){let b=s[1].length,h=ss(s[2]),v="h"+b,k={id:Q(),kind:v,inline:h};o.push(k),n++;continue}let l=r.match(/^\s*-\s+\[([ xX])\]\s*(.*)$/);if(l){let b=l[1].toLowerCase()==="x",h={id:Q(),kind:"todo",checked:b,inline:ss(l[2])};o.push(h),n++;continue}let c=r.match(/^>\s*\[([^\sA-Za-z0-9][^\]]*)\]\s*(.*)$/);if(c){let b=c[1],h=[c[2]];for(n++;n<t.length&&/^>\s?/.test(t[n]);)h.push(t[n].replace(/^>\s?/,"")),n++;let v=Ge(h.join(`
`)),k={id:Q(),kind:"callout",emoji:b,children:v};o.push(k);continue}if(/^>\s?/.test(r)){let b=[];for(;n<t.length&&/^>\s?/.test(t[n]);)b.push(t[n].replace(/^>\s?/,"")),n++;let h=Ge(b.join(`
`)),v={id:Q(),kind:"quote",children:h};o.push(v);continue}let d=r.match(/^(\s*)([-*+])\s+(.*)$/),p=r.match(/^(\s*)(\d+)\.\s+(.*)$/);if(d||p){let b=!!p,h=[],v=(d??p)[1].length;for(;n<t.length;){let x=b?t[n].match(/^(\s*)(\d+)\.\s+(.*)$/):t[n].match(/^(\s*)([-*+])\s+(.*)$/);if(!x||x[1].length!==v||!b&&/^\s*\[[ xX]\]/.test(x[3]))break;let T=[x[3]];for(n++;n<t.length;){let I=t[n];if(/^\s*$/.test(I)){let B=t[n+1];if(B!=null&&/^\s+/.test(B)&&B.search(/\S/)>v){T.push(""),n++;continue}break}if(I.search(/\S/)<=v)break;T.push(I.replace(new RegExp("^\\s{"+(v+2)+"}"),"")),n++}h.push(Ge(T.join(`
`)))}let k={id:Q(),kind:"list",ordered:b,items:h};o.push(k);continue}let u=r.match(/^\s*!\[([^\]]*)\]\(([^)]+)\)\s*$/);if(u){o.push({id:Q(),kind:"image",src:u[2],alt:u[1]}),n++;continue}let f=[r];for(n++;n<t.length&&!/^\s*$/.test(t[n])&&!pT(t[n]);)f.push(t[n]),n++;let g=f.join(`
`),y={id:Q(),kind:"p",inline:ss(g)};o.push(y)}return o}function pT(e){return!!(/^#{1,3}\s+/.test(e)||/^```/.test(e)||/^\s*---+\s*$/.test(e)||/^\s*\*\*\*+\s*$/.test(e)||/^\s*-\s+\[[ xX]\]/.test(e)||/^>\s?/.test(e)||/^(\s*)[-*+]\s+/.test(e)||/^(\s*)\d+\.\s+/.test(e))}function ss(e){return e?(e=e.replace(/  +\n/g,`<br>
`).replace(/<br\s*\/?>/gi,"<br>"),Tc(e,0,e.length)):[]}function Tc(e,t,o){let n=[],r="",a=t,i=()=>{r&&(n.push({kind:"text",text:r}),r="")};for(;a<o;){let s=e[a];if(e.startsWith("<br>",a)){i(),n.push({kind:"br"}),a+=4,e[a]===`
`&&a++;continue}if(s==="["&&e[a+1]==="["){let l=e.indexOf("]]",a+2);if(l>=0&&l<o){let c=e.substring(a+2,l),d=c.indexOf("|"),p=d<0?c:c.substring(0,d),u=d<0?void 0:c.substring(d+1);i();let f=p.match(/^daily:(\d{4}-\d{2}-\d{2})$/);f?n.push({kind:"dailylink",date:f[1],...u!==void 0?{alias:u}:{}}):n.push({kind:"pagelink",pageId:p,...u!==void 0?{alias:u}:{}}),a=l+2;continue}}if(s==="["){let l=Cb(e,"]",a+1,o);if(l>=0&&e[l+1]==="("){let c=Cb(e,")",l+2,o);if(c>=0){let d=e.substring(a+1,l),p=e.substring(l+2,c);i(),n.push({kind:"link",href:p,children:ss(d)}),a=c+1;continue}}}if(s==="`"){let l=e.indexOf("`",a+1);if(l>=0&&l<o){i(),n.push({kind:"code",text:e.substring(a+1,l)}),a=l+1;continue}}if(e.startsWith("~~",a)){let l=e.indexOf("~~",a+2);if(l>=0&&l<o){i(),n.push({kind:"strike",children:Tc(e,a+2,l)}),a=l+2;continue}}if(e.startsWith("**",a)||e.startsWith("__",a)){let l=e.substr(a,2),c=e.indexOf(l,a+2);if(c>=0&&c<o){i(),n.push({kind:"bold",children:Tc(e,a+2,c)}),a=c+2;continue}}if((s==="*"||s==="_")&&e[a+1]!==s){let l=e.indexOf(s,a+1);if(l>=0&&l<o&&e[l-1]!==s){i(),n.push({kind:"italic",children:Tc(e,a+1,l)}),a=l+1;continue}}if(s==="\\"&&a+1<o&&/[!-/:-@[-`{-~]/.test(e[a+1])){r+=e[a+1],a+=2;continue}r+=s,a++}return i(),n}function uT(e){return e.replace(/([\\`*_~[\]])/g,"\\$1")}function Cb(e,t,o,n){for(let r=o;r<n;r++){if(e[r]==="\\"){r++;continue}if(e[r]===t)return r}return-1}function Ve(e){let t="";for(let o=0;o<e.length;o++){let n=e[o],r=fT(n).replace(/\n+$/,"");if(t){let i=e[o-1].kind==="todo"&&n.kind==="todo";t+=i?`
`:`

`}t+=r}return t?t+`
`:""}function fT(e){switch(e.kind){case"p":return Yo(e.inline)+`
`;case"h1":return"# "+Yo(e.inline)+`
`;case"h2":return"## "+Yo(e.inline)+`
`;case"h3":return"### "+Yo(e.inline)+`
`;case"todo":return"- ["+(e.checked?"x":" ")+"] "+Yo(e.inline)+`
`;case"rule":return`---
`;case"code":return"```"+e.lang+`
`+e.text+"\n```\n";case"quote":return Ve(e.children).replace(/\n+$/,"").split(`
`).map(o=>o===""?">":"> "+o).join(`
`)+`
`;case"callout":{let o=Ve(e.children).trim().split(`
`),n="> ["+e.emoji+"] "+(o[0]||"")+`
`;for(let r=1;r<o.length;r++)n+="> "+o[r]+`
`;return n}case"list":{let t="";return e.items.forEach((o,n)=>{let r=e.ordered?n+1+".":"-",i=Ve(o).trim().split(`
`);t+=r+" "+i[0]+`
`;for(let s=1;s<i.length;s++)t+="  "+i[s]+`
`}),t}case"image":return"!["+e.alt+"]("+e.src+`)
`;case"table":case"linkdb":case"ai":case"email":return gT(e)+`
`}}function gT(e){let t=JSON.stringify(e),o;try{o=btoa(unescape(encodeURIComponent(t)))}catch{o=""}return"<!-- memola-block:"+o+" -->"}function hT(e){let t=e.match(/^\s*<!--\s*memola-block:([A-Za-z0-9+/=]*)\s*-->\s*$/);if(!t)return null;try{let o=decodeURIComponent(escape(atob(t[1]))),n=JSON.parse(o);return!n||typeof n!="object"||!("kind"in n)||!("id"in n)||n.kind!=="table"&&n.kind!=="linkdb"&&n.kind!=="ai"&&n.kind!=="email"?null:n}catch{return null}}function Yo(e){let t="";for(let o of e)t+=bT(o);return t}function bT(e){switch(e.kind){case"text":return uT(e.text);case"bold":return"**"+Yo(e.children)+"**";case"italic":return"*"+Yo(e.children)+"*";case"strike":return"~~"+Yo(e.children)+"~~";case"code":return"`"+e.text+"`";case"link":return"["+Yo(e.children)+"]("+e.href+")";case"pagelink":return"[["+e.pageId+(e.alias!=null?"|"+e.alias:"")+"]]";case"dailylink":return"[[daily:"+e.date+(e.alias!=null?"|"+e.alias:"")+"]]";case"br":return`  
`}}var Tt=L(()=>{"use strict";Vo()});function Ab(e){let t=document.createElement("div");return t.innerHTML=e,Sa(t)}function Sa(e){let t=[];for(let o of Array.from(e.childNodes)){if(o.nodeType===3){let i=(o.textContent||"").trim();if(i){let s={id:Q(),kind:"p",inline:[{kind:"text",text:i}]};t.push(s)}continue}if(o.nodeType!==1)continue;let n=o,r=n.tagName.toLowerCase();if((r==="div"||r==="section")&&!vT(n)){t.push(...Sa(n));continue}let a=yT(n);a&&t.push(a)}return t}function vT(e){let t=e.classList;return t.contains("memola-todo")||t.contains("memola-callout")||t.contains("memola-itbl-wrap")||t.contains("memola-linkdb")||t.contains("memola-ai-block")}function yT(e){let t=e.tagName.toLowerCase();if(t==="img"){let r=e.getAttribute("src")||"",a=e.getAttribute("alt")||"";return{id:Q(),kind:"image",src:r,alt:a}}if(t==="div"&&e.classList.contains("memola-itbl-wrap")){let r=e.querySelector("table.memola-itbl");if(!r)return null;let a=r.dataset.hrow==="1",i=r.dataset.hcol==="1",s=[],l=[];for(let c of Array.from(r.querySelectorAll("tr"))){let d=[];for(let p of Array.from(c.children))d.push(ro(p));l.push(d)}return{id:Q(),kind:"table",hrow:a,hcol:i,rows:l}}if(t==="div"&&e.classList.contains("memola-linkdb")){let r=e.getAttribute("data-db-id")||"",a=e.getAttribute("data-view")||"table",i=e.getAttribute("data-filter")||"",s=e.getAttribute("data-sort")||"";return{id:Q(),kind:"linkdb",dbId:r,view:a,filter:i,sort:s}}if(t==="div"&&e.classList.contains("memola-ai-block")){let r=e.getAttribute("data-aib-action")||"",a=e.getAttribute("data-aib-result")||"";return{id:Q(),kind:"ai",prompt:r,result:a}}if(t==="div"&&e.classList.contains("memola-todo")){let r=e.querySelector(".memola-todo-cb"),a=e.querySelector(".memola-todo-txt");return{id:Q(),kind:"todo",checked:!!(r&&r.checked),inline:a?ro(a):[]}}if(t==="div"&&e.classList.contains("memola-callout")){let r=e.querySelector(".memola-callout-ic"),a=e.querySelector(".memola-callout-body");return{id:Q(),kind:"callout",emoji:(r?.textContent||"\u{1F4A1}").trim(),children:a?Sa(a):[]}}if(t==="h1"||t==="h2"||t==="h3")return{id:Q(),kind:t,inline:ro(e)};if(t==="p"){let r=ro(e);return{id:Q(),kind:"p",inline:r}}if(t==="pre"){let r=e.querySelector("code"),a=r?.className.replace(/^language-/,"")||"",i=r?.textContent??e.textContent??"";return{id:Q(),kind:"code",lang:a,text:i}}if(t==="hr")return{id:Q(),kind:"rule"};if(t==="blockquote")return{id:Q(),kind:"quote",children:Sa(e)};if(t==="ul"||t==="ol"){let r=[];for(let i of Array.from(e.children)){if(i.tagName.toLowerCase()!=="li")continue;if(Array.from(i.children).some(l=>/^(p|h\d|ul|ol|pre|blockquote|hr|div)$/i.test(l.tagName)))r.push(Sa(i));else{let l=ro(i);r.push([{id:Q(),kind:"p",inline:l}])}}return{id:Q(),kind:"list",ordered:t==="ol",items:r}}if(t==="div"||t==="section")return Sa(e)[0]||null;let o=ro(e);return o.length===0?null:{id:Q(),kind:"p",inline:o}}function ro(e){let t=[];for(let o of Array.from(e.childNodes)){if(o.nodeType===3){let a=o.textContent||"";a&&t.push({kind:"text",text:a});continue}if(o.nodeType!==1)continue;let n=o,r=n.tagName.toLowerCase();if(r==="br"){t.push({kind:"br"});continue}if(r==="strong"||r==="b"){t.push({kind:"bold",children:ro(n)});continue}if(r==="em"||r==="i"){t.push({kind:"italic",children:ro(n)});continue}if(r==="s"||r==="strike"||r==="del"){t.push({kind:"strike",children:ro(n)});continue}if(r==="code"){t.push({kind:"code",text:n.textContent||""});continue}if(r==="a"){let a=n.getAttribute("data-daily-date");if(a){let s=(n.textContent||"").trim()||void 0;t.push({kind:"dailylink",date:a,...s?{alias:s}:{}});continue}if(n.classList.contains("memola-page-link")){let s=n.getAttribute("data-page-id")||"",l=(n.textContent||"").trim()||void 0;t.push({kind:"pagelink",pageId:s,...l?{alias:l}:{}});continue}let i=n.getAttribute("href")||"";t.push({kind:"link",href:i,children:ro(n)});continue}t.push(...ro(n))}return t}function Xo(e){return e.map(xT).join("")}function ko(e){return Xo(Ge(e))}function xT(e){switch(e.kind){case"p":return"<p>"+xo(e.inline)+"</p>";case"h1":return"<h1>"+xo(e.inline)+"</h1>";case"h2":return"<h2>"+xo(e.inline)+"</h2>";case"h3":return"<h3>"+xo(e.inline)+"</h3>";case"todo":return'<div class="memola-todo"><input type="checkbox" class="memola-todo-cb"'+(e.checked?" checked":"")+'><span class="memola-todo-txt">'+xo(e.inline)+"</span></div>";case"rule":return"<hr>";case"code":return"<pre><code"+(e.lang?' class="language-'+e.lang+'"':"")+">"+gr(e.text)+"</code></pre>";case"quote":return"<blockquote>"+Xo(e.children)+"</blockquote>";case"callout":return'<div class="memola-callout"><span class="memola-callout-ic">'+gr(e.emoji)+'</span><div class="memola-callout-body">'+Xo(e.children)+"</div></div>";case"list":{let t=e.ordered?"ol":"ul",o=e.items.map(n=>n.length===1&&n[0].kind==="p"?"<li>"+xo(n[0].inline)+"</li>":"<li>"+Xo(n)+"</li>").join("");return"<"+t+">"+o+"</"+t+">"}case"image":return'<img src="'+Tn(e.src)+'" alt="'+Tn(e.alt)+'" class="memola-img">';case"email":return'<div class="memola-email-chip" data-imid="'+Tn(e.imid)+'">\u{1F4E7} '+Tn(e.subject||"(\u4EF6\u540D\u306A\u3057)")+(e.from?' \u2014 <span class="memola-email-from">'+Tn(e.from)+"</span>":"")+"</div>";case"table":case"linkdb":case"ai":return"<!-- block-tree:"+e.kind+" id="+e.id+" -->"}}function xo(e){let t="";for(let o of e)t+=kT(o);return t}function kT(e){switch(e.kind){case"text":return gr(e.text);case"bold":return"<strong>"+xo(e.children)+"</strong>";case"italic":return"<em>"+xo(e.children)+"</em>";case"strike":return"<s>"+xo(e.children)+"</s>";case"code":return"<code>"+gr(e.text)+"</code>";case"link":return'<a href="'+Tn(e.href)+'">'+xo(e.children)+"</a>";case"pagelink":{let t=e.alias||e.pageId;return'<a class="memola-page-link" data-page-id="'+Tn(e.pageId)+'">'+gr(t)+"</a>"}case"dailylink":{let t=e.alias||e.date;return'<a class="memola-page-link memola-daily-link" data-daily-date="'+Tn(e.date)+'">'+gr(t)+"</a>"}case"br":return"<br>"}}function gr(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Tn(e){return gr(e).replace(/"/g,"&quot;")}var Jo=L(()=>{"use strict";Vo();Tt()});var Db={};q(Db,{applySiblingOrder:()=>cs,collectDescendantIds:()=>Zo,computeReorder:()=>_p,countDescendants:()=>ls,saveSiblingOrder:()=>Ma});function Zo(e,t){let o=[t];return e.filter(n=>n.ParentId===t).forEach(n=>{o.push(...Zo(e,n.Id))}),o}function ls(e,t){return Zo(e,t).length-1}function Bb(){return mc.get()}function wT(e){mc.set(e)}function cs(e,t){let n=Bb()[e||""];if(!n||n.length===0)return t;let r=new Map(t.map(i=>[i.Id,i])),a=[];for(let i of n){let s=r.get(i);s&&(a.push(s),r.delete(i))}for(let i of r.values())a.push(i);return a}function Ma(e,t){let o=Bb();o[e||""]=t,wT(o)}function _p(e,t,o,n){let r=e.map(s=>s.Id),a=r.indexOf(t);a>=0&&r.splice(a,1);let i=r.indexOf(o);return i<0&&(i=r.length),n||(i+=1),r.splice(i,0,t),r}var hr=L(()=>{"use strict";ve()});async function Pa(e){let t=Lt(e);return t&&(await ne(J(ot(e),"/items("+t+")?$select=Editor/Title&$expand=Editor")))?.Editor?.Title||""}function Ln(){return Lc||(Lc=(async()=>(await ne(G+"/_api/web/currentuser?$select=Title"))?.Title||"")().catch(()=>""),Lc)}function mt(){return Sc||(Sc=(async()=>(await ne(G+"/_api/web/currentuser?$select=Id"))?.Id||0)().catch(()=>0),Sc)}function Ca(e){if(!e)return Promise.resolve("");let t=_b.get(e);if(t!==void 0)return Promise.resolve(t);let o=Rp.get(e);if(o)return o;let n=(async()=>{let a=(await ne(G+"/_api/web/getuserbyid("+e+")?$select=Title").catch(()=>null))?.Title||"";return _b.set(e,a),Rp.delete(e),a})();return Rp.set(e,n),n}var Lc,Sc,_b,Rp,$t=L(()=>{"use strict";K();He();Et();Lc=null,Sc=null;_b=new Map,Rp=new Map});var Hb={};q(Hb,{getBacklinksFor:()=>ds,invalidateBacklinkCache:()=>Qo,scanBlocks:()=>Ob});function Qo(){Mc=null,br=null}async function Rb(e){let t=[],o=J(e,"/items?$select=Id,Title,Body_blocks,PageType,OriginPageId,IsTemplate&$top=500&$orderby=Id"),n=0;for(;o&&n++<50;){let r=await ne(o);if(!r)break;for(let a of r.results)a._srcList=e,t.push(a);o=r.__next}return t}async function ET(){return Mc||br||(br=(async()=>{let e=Kt(),t=[Rb(de)];e!==de&&t.push(Rb(e).catch(()=>[]));let n=(await Promise.all(t)).flat();return Mc=n,br=null,n})().catch(e=>{throw br=null,e}),br)}async function ds(e,t){if(!e)return[];let o=await ET(),n=[];for(let r of o){let a=vr(r._srcList||de,r.Id);if(a===e||r.PageType==="draft"||r.OriginPageId||r.PageType==="row"||r.IsTemplate)continue;let i=r.Body_blocks||"";if(!i)continue;let s;try{s=ge(i)}catch{continue}let{count:l,snippet:c}=Ob(s,e);l!==0&&n.push({pageId:a,pageTitle:t?.(a)||r.Title||"\u7121\u984C",snippet:c,count:l})}return n.sort((r,a)=>a.count-r.count||r.pageTitle.localeCompare(a.pageTitle,"ja")),n}function Ob(e,t){let o=0,n="",r=i=>{let s=0;for(let l of i)l.kind==="pagelink"&&l.pageId===t?s++:(l.kind==="bold"||l.kind==="italic"||l.kind==="strike"||l.kind==="link")&&(s+=r(l.children));return s},a=i=>{for(let s of i){if("inline"in s&&Array.isArray(s.inline)){let l=r(s.inline);l>0&&(o+=l,n||(n=Nb(It(s.inline))))}if(s.kind==="table")for(let l of s.rows)for(let c of l){let d=r(c);d>0&&(o+=d,n||(n=Nb(It(c))))}if((s.kind==="quote"||s.kind==="callout")&&a(s.children),s.kind==="list")for(let l of s.items)a(l)}};return a(e),{count:o,snippet:n}}function Nb(e){let t=e.replace(/\s+/g," ").trim();return t.length>100?t.substring(0,100).trimEnd()+"\u2026":t}var Mc,br,ms=L(()=>{"use strict";Et();K();Vo();Mc=null,br=null});var Fb={};q(Fb,{addPage:()=>ao,metaById:()=>A,removePages:()=>wo,setMetaPages:()=>Np,setPageTitle:()=>Aa});function A(e){return e&&m.meta.pages.find(t=>t.id===e)||null}function Np(e){let t=new Set;m.meta.pages=e.filter(o=>t.has(o.id)?!1:t.add(o.id))}function ao(e,t={}){m.meta.pages.some(o=>o.id===e.Id)||m.meta.pages.push({id:e.Id,title:e.Title,parent:e.ParentId||"",type:e.Type,...t})}function wo(e){let t=new Set(e);t.size!==0&&(m.meta.pages=m.meta.pages.filter(o=>!t.has(o.id)))}function Aa(e,t){let o=m.meta.pages.find(n=>n.id===e);o&&(o.title=t)}var ye=L(()=>{"use strict";j()});var zb={};q(zb,{deleteAllRowEntriesForList:()=>Op,deleteRowEntry:()=>yr,getRowBody:()=>io,getRowBodyBlocks:()=>IT,setRowBody:()=>Eo});async function Pc(e,t){let o="PageType eq 'row' and ListTitle eq '"+e.replace(/'/g,"''")+"' and DbRowId eq "+t,n=J(de,"/items?$select=Id&$filter="+encodeURIComponent(o)+"&$orderby=Id&$top=20"),r=await ne(n);return r?r.results.map(a=>({id:a.Id,etag:a.__metadata?.etag||""})):[]}async function Ub(e,t){return(await Pc(e,t))[0]||null}async function io(e,t){await Ot();let o=await Ub(e,t);if(!o)return"";let n=J(de,"/items("+o.id+")?$select=Body_blocks"),r=await ne(n);return LT(r?.Body_blocks)}async function IT(e,t){await Ot();let o=await Ub(e,t);if(!o)return"";let n=J(de,"/items("+o.id+")?$select=Body_blocks");return(await ne(n))?.Body_blocks||""}async function Eo(e,t,o,n,r){await Ot();let a=TT(r),i=await Pc(e,t);if(i.length>=1){await ze(de,i[0].id,{Title:n,Body_blocks:a});for(let d=1;d<i.length;d++)await $e(de,i[d].id).catch(()=>{});return}let l=(o?A(o):null)?.scope||"user";await _e(de,{Title:n,ParentId:o||"",PageType:"row",ListTitle:e,DbRowId:t,Body_blocks:a,Scope:l});let c=await Pc(e,t);if(c.length>1){await ze(de,c[0].id,{Title:n,Body_blocks:a}).catch(()=>{});for(let d=1;d<c.length;d++)await $e(de,c[d].id).catch(()=>{})}}function TT(e){let t=(e||"").trim();if(!t)return"[]";if(t.startsWith("["))try{let o=JSON.parse(t);if(Array.isArray(o))return t}catch{}return JSON.stringify(Ge(e))}function LT(e){if(!e)return"";try{let t=JSON.parse(e);return Array.isArray(t)?Ve(t):""}catch{return""}}async function yr(e,t){let o=await Pc(e,t);for(let n of o)await $e(de,n.id).catch(()=>{})}async function Op(e){await Ot();let t="PageType eq 'row' and ListTitle eq '"+e.replace(/'/g,"''")+"'",o=J(de,"/items?$select=Id&$filter="+encodeURIComponent(t)+"&$top=500"),n=await ne(o);if(n)for(let r of n.results)await $e(de,r.Id).catch(()=>{})}var Hp=L(()=>{"use strict";Re();Et();K();Tt();ye()});function Up(){return ps||(ps=(async()=>{await Rt({title:Ba,fields:MT})})().catch(e=>{throw ps=null,e}),ps)}async function CT(){return Fp||us||(us=(async()=>{let e=G+"/_api/web/siteusers?$select=Id,Title,Email,PrincipalType&$top=500",o=((await ne(e).catch(()=>null))?.results||[]).filter(n=>n.PrincipalType===1&&n.Email).map(n=>({id:n.Id,title:n.Title||n.Email,email:n.Email}));return Fp=o,us=null,o})(),us)}async function jb(e){let t=await CT(),o=m.meta.myUserId||0,n=e.trim().toLowerCase(),r=t.filter(a=>a.id!==o&&(!n||a.title.toLowerCase().includes(n)||a.email.toLowerCase().includes(n)));return r.sort((a,i)=>{let s=a.title.toLowerCase().startsWith(n)?0:1,l=i.title.toLowerCase().startsWith(n)?0:1;return s-l||a.title.localeCompare(i.title,"ja")}),r.slice(0,8)}async function qb(e){let t=m.meta.myUserId||await mt().catch(()=>0),o=await Ln().catch(()=>""),n=Array.from(new Set(e.recipientIds)).filter(r=>r&&r!==t);if(n.length!==0){await Up();for(let r of n)await _e(Ba,{RecipientId:r,ActorId:t,ActorName:o,PageId:e.pageId,PageTitle:e.pageTitle.slice(0,255),CommentId:e.commentId,BlockId:e.blockId||"",Snippet:e.snippet.slice(0,255),Read:0}).catch(()=>{})}}function AT(e){return{Id:Number(e.Id),ActorId:Number(e.ActorId||0),ActorName:String(e.ActorName||""),PageId:String(e.PageId||""),PageTitle:String(e.PageTitle||""),CommentId:Number(e.CommentId||0),BlockId:String(e.BlockId||""),Snippet:String(e.Snippet||""),Read:Number(e.Read||0),ReadAt:e.ReadAt?Number(e.ReadAt):void 0,Created:e.Created?String(e.Created):void 0}}async function zp(){let e=m.meta.myUserId||await mt().catch(()=>0);if(!e)return[];await Up();let t=J(Ba,"/items?$select="+encodeURIComponent(PT)+"&$filter="+encodeURIComponent("RecipientId eq "+e)+"&$orderby=Created desc&$top=100"),n=((await ne(t).catch(()=>null))?.results||[]).map(AT),r=Date.now(),a=[];for(let i of n)i.Read&&i.ReadAt&&r-i.ReadAt>ST?await $e(Ba,i.Id).catch(()=>{}):a.push(i);return a}async function $b(){let e=m.meta.myUserId||await mt().catch(()=>0);if(!e)return 0;await Up();let t=J(Ba,"/items?$select=Id&$filter="+encodeURIComponent("RecipientId eq "+e+" and Read eq 0")+"&$top=100");return(await ne(t).catch(()=>null))?.results?.length||0}async function jp(e){await ze(Ba,e,{Read:1,ReadAt:Date.now()}).catch(()=>{})}var Ba,ST,MT,PT,ps,Fp,us,Cc=L(()=>{"use strict";j();He();Et();Re();$t();Ba="memola-inbox",ST=3*24*60*60*1e3,MT=[{name:"RecipientId",kind:9,indexed:!0},{name:"ActorId",kind:9},{name:"ActorName",kind:2},{name:"PageId",kind:2},{name:"PageTitle",kind:2},{name:"CommentId",kind:9},{name:"BlockId",kind:2},{name:"Snippet",kind:3},{name:"Read",kind:9},{name:"ReadAt",kind:9}],PT="Id,ActorId,ActorName,PageId,PageTitle,CommentId,BlockId,Snippet,Read,ReadAt,Created",ps=null;Fp=null,us=null});var Hc={};q(Hc,{ORG_COMMENTS_LIST:()=>xr,apiAddComment:()=>Rc,apiDeleteComment:()=>Nc,apiEditComment:()=>Wp,apiListComments:()=>Dc,apiResolveThread:()=>Gp,apiToggleReaction:()=>Vp,ensureCommentsLists:()=>hs,gcMyOrphanComments:()=>OT,getMyCommentsList:()=>kr,groupThreads:()=>Bc,hydrateAuthorNames:()=>Oc,invalidateComments:()=>Wt,openThreadCountByBlock:()=>qp,parseReactions:()=>gs,purgeCommentsForPage:()=>RT,remapCommentsPageId:()=>NT,selectOrphans:()=>_T});function kr(){let e=m.meta.myUserId;return e?"memola-user-"+e+"-comments":null}function gs(e){if(!e.Reactions)return{};try{let t=JSON.parse(e.Reactions);return t&&typeof t=="object"?t:{}}catch{return{}}}async function Kb(e,t){if(await Rt({title:e,fields:BT}),t){let o=e.match(/^memola-user-(\d+)-comments$/);o&&await as(e,parseInt(o[1],10)).catch(()=>{})}}async function hs(){return fs||(fs=(async()=>{m.meta.myUserId||(m.meta.myUserId=await mt().catch(()=>0)),await Kb(xr,!1);let e=kr();e&&await Kb(e,!0)})().catch(e=>{throw fs=null,e}),fs)}function Bc(e){let t=(r,a)=>(r.Created||"").localeCompare(a.Created||"")||r.Id-a.Id,o=e.filter(r=>!r.ThreadId).sort(t),n=new Map;for(let r of e){if(!r.ThreadId)continue;let a=n.get(r.ThreadId)||[];a.push(r),n.set(r.ThreadId,a)}return o.map(r=>({root:r,replies:(n.get(String(r.Id))||[]).sort(t),blockId:r.BlockId||"",resolved:(r.Resolved||0)>0}))}function qp(e){let t=new Map;for(let o of e)o.resolved||t.set(o.blockId,(t.get(o.blockId)||0)+1);return t}function _T(e,t){return e.filter(o=>!t.has(o.PageId))}function Wb(e){return{Id:Number(e.Id),PageId:String(e.PageId||""),BlockId:String(e.BlockId||""),ThreadId:String(e.ThreadId||""),Body:String(e.Body||""),Resolved:Number(e.Resolved||0),ResolvedBy:e.ResolvedBy?Number(e.ResolvedBy):void 0,ResolvedAt:e.ResolvedAt?Number(e.ResolvedAt):void 0,AnchorText:e.AnchorText?String(e.AnchorText):void 0,Scope:e.Scope==="org"?"org":"user",AuthorId:Number(e.AuthorId||0),AuthorName:e.AuthorName?String(e.AuthorName):void 0,Edited:e.Edited?Number(e.Edited):0,Deleted:e.Deleted?Number(e.Deleted):0,Reactions:e.Reactions?String(e.Reactions):void 0,Created:e.Created?String(e.Created):void 0}}async function $p(e,t){let o="PageId eq '"+t.replace(/'/g,"''")+"'",n=J(e,"/items?$select="+encodeURIComponent(DT)+"&$filter="+encodeURIComponent(o)+"&$orderby=Created&$top=500");return((await ne(n).catch(()=>null))?.results||[]).map(a=>{let i=Wb(a);return i._list=e,i})}function Wt(e){e?Ac.delete(e):Ac.clear()}async function Dc(e){if(!e)return[];let t=Ac.get(e);if(t)return t;await hs();let o=[xr],n=kr();n&&o.push(n);let r=await Promise.all(o.map(s=>$p(s,e))),a=m.meta.myUserId||0,i=r.flat().filter(s=>s.Scope==="org"||!a||s.AuthorId===a);return Ac.set(e,i),i}function Gb(e){return e==="org"?xr:kr()||xr}function _c(e){return e._list||Gb(e.Scope)}async function Kp(){let e=m.meta.myUserId||await mt().catch(()=>0),t=await Ln().catch(()=>"");return{id:e,name:t}}async function Rc(e){await hs();let{id:t,name:o}=await Kp(),n={PageId:e.pageId,BlockId:e.blockId||"",ThreadId:e.threadRootId||"",Body:e.body,Scope:e.scope,AuthorId:t,AuthorName:o,Resolved:0,Edited:0,Deleted:0};e.anchorText&&(n.AnchorText=e.anchorText.slice(0,255));let r=await _e(Gb(e.scope),n);Wt(e.pageId);let a=Wb(r);return e.mentions&&e.mentions.length&&await qb({recipientIds:e.mentions,pageId:e.pageId,pageTitle:A(vs(e.pageId))?.title||"",commentId:a.Id,blockId:e.blockId||"",snippet:e.body}).catch(()=>{}),a}async function Wp(e){await ze(_c(e),e.Id,{Body:e.Body,Edited:1}),Wt(e.PageId)}async function Nc(e){await $e(_c(e),e.Id),Wt(e.PageId)}async function Gp(e,t){let{id:o}=await Kp();await ze(_c(e),e.Id,{Resolved:t?1:0,ResolvedBy:t?o:0,ResolvedAt:t?Date.now():0}),Wt(e.PageId)}async function Vp(e,t){let{id:o}=await Kp();if(!o)return;let n=gs(e),r=n[t]||[],a=r.indexOf(o);a>=0?r.splice(a,1):r.push(o),r.length?n[t]=r:delete n[t],await ze(_c(e),e.Id,{Reactions:JSON.stringify(n)}),Wt(e.PageId)}async function RT(e){await hs().catch(()=>{});let t=[xr,kr()].filter(Boolean);for(let o of t){let n=await $p(o,e).catch(()=>[]);for(let r of n)await $e(o,r.Id).catch(()=>{})}Wt(e)}async function NT(e){if(e.size===0)return;await hs().catch(()=>{});let t=[xr,kr()].filter(Boolean);for(let o of t)for(let[n,r]of e){if(n===r)continue;let a=await $p(o,n).catch(()=>[]);for(let i of a)await ze(o,i.Id,{PageId:r}).catch(()=>{});Wt(n),Wt(r)}}async function OT(e){let t=kr();if(!t)return;let o=J(t,"/items?$select=Id,PageId&$top=500&$orderby=Id"),n=await ne(o).catch(()=>null);if(!n?.results)return;let r=n.results.filter(a=>a.PageId&&!a.PageId.startsWith("row:")&&!e.has(a.PageId));for(let a of r)await $e(t,a.Id).catch(()=>{})}async function Oc(e){await Promise.all(e.map(async t=>{!t.AuthorName&&t.AuthorId&&(t.AuthorName=await Ca(t.AuthorId).catch(()=>""))}))}var xr,BT,DT,fs,Ac,bs=L(()=>{"use strict";j();Re();Et();$t();Cc();K();ye();xr="memola-comments";BT=[{name:"PageId",kind:2,indexed:!0},{name:"BlockId",kind:2},{name:"ThreadId",kind:2},{name:"Body",kind:3},{name:"Resolved",kind:9},{name:"ResolvedBy",kind:9},{name:"ResolvedAt",kind:9},{name:"AnchorText",kind:2},{name:"Scope",kind:2},{name:"AuthorId",kind:9},{name:"AuthorName",kind:2},{name:"Edited",kind:9},{name:"Deleted",kind:9},{name:"Reactions",kind:3}],DT="Id,PageId,BlockId,ThreadId,Body,Resolved,ResolvedBy,ResolvedAt,AnchorText,Scope,AuthorId,AuthorName,Edited,Deleted,Reactions,Created",fs=null;Ac=new Map});var Ht={};q(Ht,{apiAddDbRow:()=>xs,apiCreateDb:()=>ys,apiPurgeRow:()=>Fc,apiRestoreRow:()=>Xp,apiTrashRow:()=>FT,apiUpdateDbRow:()=>pt,duplicateDb:()=>HT,ensureRowTrashFields:()=>Yp,getTrashedRows:()=>Jp,reconcileTrashedRows:()=>UT,stripInternalDbFields:()=>Yb});function Yb(e){return e.filter(t=>!Vb.has(t.Title)&&!Vb.has(t.InternalName))}async function ys(e,t){let n="memola-db-"+Date.now().toString();return await Rt({title:n,fields:[{name:"Trashed",kind:9,indexed:!0},{name:"TrashedBy",kind:9,indexed:!0}]}),await Da(e,t,n)}async function HT(e,t){let o=t.copyRows??!t.asTemplate,n=A(e);if(!n||n.type!=="database"||!n.list)throw new Error("DB \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");let r=n.list,a=Yb(await Ue(r)).filter(d=>d.Title!=="Title"&&d.InternalName!=="Title"),i=a.map(d=>({name:d.Title,kind:d.FieldTypeKind,...d.Choices?{choices:d.Choices}:{}})),s="memola-db-"+Date.now().toString();await Rt({title:s,fields:[{name:"Trashed",kind:9,indexed:!0},{name:"TrashedBy",kind:9,indexed:!0},...i]});let l=n.scope||"user",c=await Da(n.title||"\u7121\u984C","",s,l,t.asTemplate);if(o){let d=await Ie(r);for(let p of d){let u=p;if(typeof u.Trashed=="number"&&u.Trashed>0)continue;let f={Title:u.Title??""};for(let g of a){let y=u[g.InternalName]??u[g.Title];y!=null&&y!==""&&(f[g.Title]=y)}await xs(s,f).catch(()=>{})}}return c}async function Yp(e){await Rt({title:e,fields:[{name:"Trashed",kind:9,indexed:!0},{name:"TrashedBy",kind:9,indexed:!0}]}).catch(()=>{})}async function FT(e,t){let o=Date.now(),n=m.meta.myUserId||await mt().catch(()=>0);await Yp(e).catch(()=>{});let r=await Xb(e,t);if(r.length===0){let a=m.meta.pages.find(s=>s.type==="database"&&s.list===e),i="";try{let s=await is(e,t);i=String(s?.Title||"")}catch{}try{await _e(de,{Title:i,ParentId:a?.id||"",PageType:"row",ListTitle:e,DbRowId:t,Body_blocks:"[]",Scope:a?.scope||"user",Trashed:o,TrashedBy:n})}catch{}}else for(let a of r)await wc(de,a.id,n,o).catch(()=>{});await wc(e,t,n,o).catch(()=>{})}async function Xp(e,t){await Yp(e).catch(()=>{}),await Ec(e,t).catch(()=>{});let o=await Xb(e,t);for(let n of o)await Ec(de,n.id).catch(()=>{})}async function Fc(e,t){await $e(e,t).catch(()=>{}),await yr(e,t).catch(()=>{})}async function Xb(e,t){let o="PageType eq 'row' and ListTitle eq '"+e.replace(/'/g,"''")+"' and DbRowId eq "+t,n=J(de,"/items?$select=Id&$filter="+encodeURIComponent(o)+"&$orderby=Id&$top=20");return((await ne(n))?.results||[]).map(a=>({id:a.Id}))}async function UT(e,t){let o=J(de,"/items?$select=Id,DbRowId,Trashed,TrashedBy&$filter="+encodeURIComponent("PageType eq 'row' and ListTitle eq '"+e.replace(/'/g,"''")+"' and Trashed gt 0")+"&$top=500"),n=await ne(o).catch(()=>null);if(n?.results)for(let r of n.results){let a=t.find(i=>i.Id===r.DbRowId);a&&(a.Trashed||await ze(e,a.Id,{Trashed:r.Trashed,TrashedBy:r.TrashedBy}).catch(()=>{}))}}async function Jp(){let e=J(de,"/items?$select=Id,Title,ListTitle,DbRowId,Trashed,TrashedBy,Scope,AuthorId&$filter="+encodeURIComponent("PageType eq 'row' and Trashed gt 0")+"&$orderby=Trashed desc&$top=500"),t=await ne(e).catch(()=>null);return t?t.results.filter(o=>o.ListTitle&&o.DbRowId).map(o=>({bodyId:o.Id,listTitle:o.ListTitle,dbRowId:o.DbRowId,title:o.Title||"",trashedAt:o.Trashed||0,trashedBy:o.TrashedBy||0,scope:o.Scope==="org"||o.Scope==="user"?o.Scope:"",authorId:o.AuthorId||0})):[]}async function xs(e,t){let o=t.Title,n={};for(let a of Object.keys(t))a==="Title"||a==="__metadata"||(n[a]=t[a]);let r=await _e(e,{Title:o??""});if(Object.keys(n).length>0){await ze(e,r.Id,n);for(let a of Object.keys(n))r[a]=n[a]}return r}async function pt(e,t,o){await ze(e,t,o)}var Vb,Ke=L(()=>{"use strict";j();Re();K();ye();$t();Et();Vb=new Set(["Trashed","TrashedBy"])});var Ra={};q(Ra,{DAILY_DATE_FIELD:()=>ut,DAILY_LIST_TITLE:()=>Te,DAILY_TAG_FIELD:()=>Uc,clearDailyCache:()=>Zp,convertDailyToPage:()=>tu,ensureDailyDb:()=>zc,findNoteForDate:()=>eu,getOrCreateNoteForDate:()=>jT,isDailyList:()=>Qp,isDailyTitleFormat:()=>yc,refreshDailyCacheIfActive:()=>$T,restoreToDaily:()=>qT,todayYMD:()=>yb});function Zp(){_a=null}async function Jb(){try{return(await Ue(Te)).find(o=>o.Title===ut||o.InternalName===ut)?.InternalName||ut}catch{return ut}}async function Zb(){let e=null;for(let o=0;o<3;o++){try{if((await Ue(Te)).some(r=>r.Title===ut||r.InternalName===ut)){await ur(Te,ut).catch(()=>{});return}}catch(n){e=n}try{if(await Nt(Te,ut,4),(await Ue(Te).catch(()=>[])).some(r=>r.Title===ut||r.InternalName===ut)){await ur(Te,ut).catch(()=>{});return}}catch(n){e=n}await new Promise(n=>setTimeout(n,250))}let t=e instanceof Error?": "+e.message:"";throw new Error("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u7528\u300C\u65E5\u4ED8\u300D\u5217\u3092\u6E96\u5099\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F"+t)}function Qp(e){return e===Te}async function Qb(){let t=(await Ue(Te).catch(()=>[])).filter(o=>o.Title===Uc||o.InternalName===Uc||/^NoteTag\d*$/.test(o.InternalName));if(t.length===0){try{await Nt(Te,Uc,6,["\u4ED5\u4E8B","\u500B\u4EBA","\u4F1A\u8B70","\u5BB6\u65CF","\u305D\u306E\u4ED6"])}catch{}return}if(t.length!==1){t.sort((o,n)=>o.InternalName.localeCompare(n.InternalName));for(let o=1;o<t.length;o++)await Bp(Te,t[o].InternalName).catch(()=>{})}}async function zc(){return _a||(_a=(async()=>{let e=m.meta.pages.find(a=>a.type==="database"&&a.list===Te&&!a.trashed);if(e&&await ne(J(Te))!=null)return await Zb(),await Qb(),{dbPageId:e.id,listTitle:Te,dateInternalName:await Jb()};await ne(J(Te))!=null||await Ta(Te),await Zb(),await Qb();let o=await Jb();if(e)return{dbPageId:e.id,listTitle:Te,dateInternalName:o};let n=await Da("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8","",Te);await st(n.Id,{Icon:"\u{1F4C5}",Pinned:1}).catch(()=>{});let r=A(n.Id);return r&&(r.icon="\u{1F4C5}",r.pinned=!0),ao(n),{dbPageId:n.Id,listTitle:Te,dateInternalName:o}})().catch(e=>{throw _a=null,e}),_a)}async function eu(e){let o=(await zc()).dateInternalName+" eq datetime'"+e+"T00:00:00'",n=J(Te,"/items?$filter="+encodeURIComponent(o)+"&$top=1"),a=(await ne(n).catch(()=>null))?.results?.[0];if(!a)return null;let i=await io(Te,a.Id).catch(()=>"");return{rowId:a.Id,title:a.Title||"",body:i}}function zT(e){return["## \u30BF\u30B9\u30AF","- [ ] ","","## \u30E1\u30E2",""].join(`
`)}async function jT(e){let t=await zc(),o=await eu(e);if(o)return{...o,dbPageId:t.dbPageId};let n=vc(e),r=await xs(Te,{Title:n,[ut]:e}),a=zT(e);return await Eo(Te,r.Id,t.dbPageId,n,a),{rowId:r.Id,title:n,body:a,dbPageId:t.dbPageId}}async function tu(e,t,o,n=""){let r=await io(Te,e).catch(()=>""),a=await en(t,n);await Na(a.Id,t,r).catch(()=>{}),await st(a.Id,{OriginDailyDate:o}).catch(()=>{});let i=A(a.Id);return i&&(i.originDailyDate=o),await yr(Te,e).catch(()=>{}),await $e(Te,e).catch(()=>{}),a.Id}async function qT(e){let t=A(e);if(!t?.originDailyDate)throw new Error("\u3053\u306E\u30DA\u30FC\u30B8\u306F\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u7531\u6765\u3067\u306F\u3042\u308A\u307E\u305B\u3093");let o=t.originDailyDate,n=await so(e),r=await zc(),a=await eu(o),i,s;a?(i=a.rowId,s=a.title||vc(o)):(s=vc(o),i=(await xs(Te,{Title:s,[ut]:o})).Id),await Eo(Te,i,r.dbPageId,s,n);let{apiDeletePage:l}=await Promise.resolve().then(()=>(K(),je));return await l(e).catch(()=>{}),{rowId:i,date:o}}async function $T(){m.dbList===Te&&(m.dbItems=await Ie(Te))}var Te,ut,Uc,_a,Sn=L(()=>{"use strict";j();Re();Et();K();Ke();vo();ye();Te="memola-daily",ut="NoteDate",Uc="NoteTag",_a=null});var wr={};q(wr,{isPagePublished:()=>ZT,publishPage:()=>YT,publishedUrlFor:()=>VT,syncPublishedPage:()=>JT,unpublishPage:()=>XT});function ov(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{let t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}function KT(e){let t=[{id:"cbe7b0a9-3504-44dd-a3a3-0e5cacd07788",instanceId:ov(),title:"Title Region",description:"Title Region Description",audiences:[],serverProcessedContent:{htmlStrings:{},searchablePlainTexts:{},imageSources:{},links:{}},dataVersion:"1.4",properties:{title:e,imageSourceType:4,layoutType:"FullWidthImage",textAlignment:"Left",showTopicHeader:!1,showPublishDate:!1,topicHeader:"",authors:[],authorByline:[],isDecorative:!0}}];return JSON.stringify(t)}function nv(e){let t=e?ko(e):"<p></p>",o=[{controlType:4,id:ov(),position:{controlIndex:1,sectionIndex:1,zoneIndex:1,sectionFactor:12,layoutIndex:1},addedFromPersistedData:!0,innerHTML:t},{controlType:0,pageSettingsSlice:{isDefaultDescription:!0,isDefaultThumbnail:!0}}];return JSON.stringify(o)}async function WT(e){let t=await fetch(e,{headers:{Accept:"application/json;odata=verbose"},credentials:"include"});return t.ok?t.json():null}async function rv(e,t){let o=await ke(),n=await fetch(G+"/_api/sitepages/pages",{method:"POST",headers:{Accept:"application/json;odata=verbose","Content-Type":"application/json;odata=verbose","X-RequestDigest":o},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Publishing.SitePage"},PageLayoutType:"Article",Title:e})});if(!n.ok){let l=await n.text().catch(()=>"");throw new Error("SitePage \u4F5C\u6210\u5931\u6557: "+n.status+(l?" \u2014 "+l.slice(0,200):""))}let r=await n.json(),a=r.d||r,i=Number(a.Id)||0;if(!i)throw new Error("SitePage \u4F5C\u6210\u5931\u6557: ID \u53D6\u5F97\u4E0D\u53EF");await ru(i,e,t);let s=await au(i);return{id:i,url:s}}async function ou(e){let t=await ke();return fetch(G+"/_api/sitepages/pages("+e+")/CheckoutPage",{method:"POST",headers:{Accept:"application/json;odata=verbose","X-RequestDigest":t},credentials:"include"})}async function ev(e){let t=await ke();await fetch(G+"/_api/sitepages/pages("+e+")/DiscardPage",{method:"POST",headers:{Accept:"application/json;odata=verbose","X-RequestDigest":t},credentials:"include"}).catch(()=>{})}async function tv(e,t,o){let n=await ke(),r=KT(t);return fetch(G+"/_api/sitepages/pages("+e+")",{method:"POST",headers:{Accept:"application/json;odata=verbose","Content-Type":"application/json;odata=verbose","X-RequestDigest":n,"X-HTTP-Method":"MERGE","IF-MATCH":"*"},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Publishing.SitePage"},Title:t,CanvasContent1:o,LayoutWebpartsContent:r})})}async function nu(e){let t=await e.text().catch(()=>"");return e.status+(t?" \u2014 "+t.slice(0,400):"")}async function ru(e,t,o){let n=await ou(e);if(n.status===409&&(await ev(e),n=await ou(e)),!n.ok&&n.status!==200&&n.status!==201)throw new Error("SitePage \u30C1\u30A7\u30C3\u30AF\u30A2\u30A6\u30C8\u5931\u6557: "+await nu(n));let r=await tv(e,t,o);if(r.status===409){await ev(e);let a=await ou(e);if(!a.ok)throw new Error("SitePage \u518D\u30C1\u30A7\u30C3\u30AF\u30A2\u30A6\u30C8\u5931\u6557: "+await nu(a));r=await tv(e,t,o)}if(!r.ok)throw new Error("SitePage \u4FDD\u5B58\u5931\u6557: "+await nu(r))}async function au(e){let t=await ke(),o=await fetch(G+"/_api/sitepages/pages("+e+")/Publish",{method:"POST",headers:{Accept:"application/json;odata=verbose","X-RequestDigest":t},credentials:"include"});if(!o.ok){let s=await o.text().catch(()=>"");throw new Error("SitePage \u516C\u958B\u5931\u6557: "+o.status+(s?" \u2014 "+s.slice(0,200):""))}let n=await WT(G+"/_api/sitepages/pages("+e+")"),r=n?.d||n,a=r?.AbsoluteUrl||"";if(a)return a;let i=r?.FileName||"";return i?G+"/SitePages/"+i:""}async function GT(e){let t=await ke();await fetch(G+"/_api/sitepages/pages("+e+")",{method:"POST",headers:{"X-RequestDigest":t,"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include"})}function VT(e){return A(e)?.publishedUrl||""}async function YT(e,t,o){let n=A(e),r=nv(o),a,i=n?.publishedSitePageId||0;if(i){await ru(i,t,r);let s=await au(i)||n?.publishedUrl||"";a={id:i,url:s}}else a=await rv(t,r);return await st(e,{Published:1,PublishedUrl:a.url,PublishedPageId:a.id,PublishedDirty:0}),n&&(n.published=!0,n.publishedUrl=a.url,n.publishedSitePageId=a.id,n.publishedDirty=!1),a.url}async function XT(e){let t=A(e),o=t?.publishedSitePageId||0;if(o)try{await GT(o)}catch{}await st(e,{Published:0,PublishedUrl:"",PublishedPageId:0,PublishedDirty:0}).catch(()=>{}),t&&(t.published=!1,delete t.publishedUrl,delete t.publishedSitePageId,delete t.publishedDirty)}async function JT(e,t,o){let n=A(e);if(!n?.published)throw new Error("not_published");let r=nv(o),a=n.publishedSitePageId||0;if(a)await ru(a,t,r),await au(a);else{let i=await rv(t,r);await st(e,{PublishedUrl:i.url,PublishedPageId:i.id}).catch(()=>{}),n.publishedUrl=i.url,n.publishedSitePageId=i.id}await st(e,{PublishedDirty:0}).catch(()=>{}),n.publishedDirty=!1}function ZT(e){return!!A(e)?.published}var Er=L(()=>{"use strict";He();pr();K();Jo();ye()});var sv={};q(sv,{applyBlockMergeChoices:()=>tL,threeWayMergeBlocks:()=>Ir});function av(e){return JSON.stringify(iu(e))}function iu(e){if(Array.isArray(e))return e.map(iu);if(e&&typeof e=="object"){let t={};for(let o of Object.keys(e).sort())t[o]=iu(e[o]);return t}return e}function jc(e){if(Array.isArray(e))return e.map(jc);if(e&&typeof e=="object"){let t={};for(let[o,n]of Object.entries(e))o==="id"||o==="lastBy"||o==="lastAt"||(t[o]=jc(n));return t}return e}function iv(e,t){let o=e.map(c=>c.id),n=t.map(c=>c.id),r=new Set(o),a=new Set(n),i=n.filter(c=>r.has(c)),s=o.filter(c=>a.has(c)),l=new Set;for(let c=0;c<i.length;c++)i[c]!==s[c]&&l.add(i[c]);return l}function Ir(e,t,o){let n=new Map(e.map(f=>[f.id,f])),r=new Map(t.map(f=>[f.id,f])),a=new Map(o.map(f=>[f.id,f])),i=iv(e,t),s=iv(e,o),l=i.size===0&&s.size>0,c=eL(t.map(f=>f.id),o.map(f=>f.id),l),d=[],p=0,u=[];for(let f of c){let g=n.has(f),y=r.get(f)??null,b=a.get(f)??null,h=n.get(f)??null;if(!(!y&&!b)){if(y&&!b){g?Oa(y,h)&&!i.has(f)?p++:(d.push({id:f,kind:"modify-delete",base:h,yours:y,theirs:null}),u.push(y)):u.push(y);continue}if(b&&!y){g?Oa(b,h)&&!s.has(f)?p++:(d.push({id:f,kind:"delete-modify",base:h,yours:null,theirs:b}),u.push(b)):u.push(b);continue}if(y&&b){if(!g){Oa(y,b)||d.push({id:f,kind:"add-add",base:null,yours:y,theirs:b}),u.push(y);continue}let v=!Oa(y,h),k=!Oa(b,h);if(!v&&!k)u.push(y);else if(!v&&k)u.push(b),p++;else if(v&&!k)u.push(y),p++;else if(Oa(y,b))u.push(y),p++;else{let x=h?QT(h,y,b):null;if(x){if(x.conflicts.length===0){u.push(x.merged),p++;continue}d.push(...x.conflicts),u.push(x.merged);continue}d.push({id:f,kind:"modify-modify",base:h,yours:y,theirs:b}),u.push(y)}}}}return{merged:u,conflicts:d,autoMergedCount:p}}function QT(e,t,o){if(e.kind!==t.kind||e.kind!==o.kind)return null;if(e.kind==="quote"&&t.kind==="quote"&&o.kind==="quote"){let n=Ir(e.children,t.children,o.children);return{merged:{...t,children:n.merged},conflicts:n.conflicts}}if(e.kind==="callout"&&t.kind==="callout"&&o.kind==="callout"){let n=t.emoji===o.emoji?t.emoji:t.emoji===e.emoji?o.emoji:(o.emoji===e.emoji,t.emoji),r=Ir(e.children,t.children,o.children);return{merged:{...t,emoji:n,children:r.merged},conflicts:r.conflicts}}return null}function eL(e,t,o=!1){let n=new Map;e.forEach((c,d)=>n.set(c,d));let r=new Map;t.forEach((c,d)=>r.set(c,d));let a=[],i=new Set,s=0,l=0;for(;s<e.length||l<t.length;){let c=s<e.length?e[s]:null,d=l<t.length?t[l]:null;if(c!==null&&i.has(c)){s++;continue}if(d!==null&&i.has(d)){l++;continue}if(c===null){d!==null&&(a.push(d),i.add(d),l++);continue}if(d===null){a.push(c),i.add(c),s++;continue}if(c===d){a.push(c),i.add(c),s++,l++;continue}if(!r.has(c)){a.push(c),i.add(c),s++;continue}if(!n.has(d)){a.push(d),i.add(d),l++;continue}o?(a.push(d),i.add(d),l++):(a.push(c),i.add(c),s++)}return a}function tL(e,t){let o=new Map(e.conflicts.map(r=>[r.id,r])),n=[];for(let r of e.merged){let a=o.get(r.id);if(!a){n.push(r);continue}let i=t[r.id];if(i!=="drop"){if(i==="yours"){a.yours&&n.push(a.yours);continue}if(i==="theirs"){a.theirs&&n.push(a.theirs);continue}n.push(r)}}return n}var Oa,qc=L(()=>{"use strict";Oa=(e,t)=>av(jc(e))===av(jc(t))});var je={};q(je,{ORG_PAGES_LIST:()=>de,apiApplyDraftToOrigin:()=>mL,apiCreateDbPageRow:()=>Da,apiCreatePage:()=>en,apiCreatePageFromTemplate:()=>lL,apiDeletePage:()=>ws,apiDeleteTemplate:()=>dL,apiDuplicateAsDraft:()=>iL,apiDuplicatePage:()=>cL,apiGetPages:()=>lt,apiLoadBlocksBody:()=>Mt,apiLoadContent:()=>rL,apiLoadContentMeta:()=>pu,apiLoadFileMeta:()=>ct,apiLoadRawBody:()=>so,apiMovePage:()=>Lr,apiPromoteDraftToPage:()=>pL,apiPurgePage:()=>Sr,apiRegisterPageAsTemplate:()=>sL,apiRestorePage:()=>Ts,apiSavePageBlocks:()=>Fa,apiSavePageMd:()=>Na,apiSetIcon:()=>Ls,apiSetPin:()=>gu,apiSetScope:()=>Ua,apiSetTitle:()=>za,apiTrashPage:()=>Is,appIdForCommentKey:()=>vs,buildSourceListMap:()=>hv,clearPagesCache:()=>lu,clearPending:()=>Mn,deleteAllRowEntriesForList:()=>Op,deleteRowEntry:()=>yr,ensurePagesList:()=>Ot,filterVisiblePages:()=>gv,findOutgoingPrivateLinks:()=>aL,getMyPagesList:()=>Kt,getRowBody:()=>io,getTrashedPages:()=>mu,isStructuralOpActive:()=>du,listForPageId:()=>ot,listTemplates:()=>hu,markPendingCreate:()=>vv,markPendingDelete:()=>cu,markPendingRestore:()=>yv,markRecentlyCreated:()=>Cn,markStructuralOp:()=>Pt,mintPageId:()=>tn,pageCommentKey:()=>Es,pageIdForListItem:()=>vr,pageIdToItemId:()=>Lt,pagesListFor:()=>Io,parseBlocksJson:()=>ge,resolvePageId:()=>bv,scopeMismatchOnMove:()=>fu,serializeBlocks:()=>Ye,setRowBody:()=>Eo,updatePageRow:()=>st});function Kt(){let e=m.meta.myUserId;return e?"memola-user-"+e+"-pages":de}function Io(e){return e==="user"?Kt():de}function ot(e){let t=St.get(e);if(t)return t;let o=A(e);return o?Io(o.scope==="org"?"org":"user"):de}function lu(){Ha=null}async function cv(e){await ne(J(e))==null&&await Ta(e);let o=await dv(e),n=async(s,l)=>{if(!o.has(s))try{await Nt(e,s,l),o.add(s)}catch{}};for(let[s,l]of lv)await n(s,l);let r=await dv(e),a=lv.filter(([s])=>!r.has(s)).map(([s])=>s);if(a.length>0)throw new Error(e+" \u306E\u5FC5\u9808\u5217\u304C\u4E0D\u8DB3\u3057\u3066\u3044\u307E\u3059: "+a.join(", "));for(let s of oL)await ur(e,s).catch(()=>{});await Ic(e,hc).catch(()=>{});let i=e.match(/^memola-user-(\d+)-pages$/);if(i){let s=parseInt(i[1],10);await as(e,s)}}async function Ot(){return Ha||(Ha=(async()=>{await cv(de);let e=Kt();e!==de&&await cv(e)})().catch(e=>{throw Ha=null,e}),Ha)}async function dv(e){let t=await ne(J(e,"/fields?$select=Title,InternalName")),o=new Set;return t?.results.forEach(n=>{o.add(n.Title),o.add(n.InternalName)}),o}function gv(e,t){return e.filter(o=>o.PageType==="row"?!1:o.PageType==="draft"||!!o.OriginPageId?t===0?!0:o.AuthorId===t:o.Scope==="org"||t===0?!0:o.AuthorId===t)}function nL(e,t){let o={id:t,title:e.Title||"",parent:e.ParentId||"",type:e.PageType==="database"?"database":"page",icon:e.Icon||""};return e.ListTitle&&(o.list=e.ListTitle),e.Pinned&&e.Pinned>0&&(o.pinned=!0),e.Trashed&&e.Trashed>0&&(o.trashed=e.Trashed),e.Published&&e.Published>0&&(o.published=!0),e.PublishedUrl&&(o.publishedUrl=e.PublishedUrl),e.PublishedPageId&&e.PublishedPageId>0&&(o.publishedSitePageId=e.PublishedPageId),e.PublishedDirty&&e.PublishedDirty>0&&(o.publishedDirty=!0),e.OriginDailyDate&&(o.originDailyDate=e.OriginDailyDate),e.OriginPageId&&(o.originPageId=e.OriginPageId),(e.Scope==="org"||e.Scope==="user")&&(o.scope=e.Scope),e.AuthorId&&(o.authorId=e.AuthorId),e.TrashedBy&&(o.trashedBy=e.TrashedBy),e.IsTemplate&&e.IsTemplate>0&&(o.isTemplate=!0),o}async function Pn(e,t){let o=Lt(e);if(!o)return null;let n=t||"Id,Title,ParentId,PageType,Icon,Pinned,Trashed,ListTitle,DbRowId,Body_blocks,Published,PublishedUrl,PublishedPageId,PublishedDirty,OriginDailyDate,OriginPageId,Scope,AuthorId,TrashedBy,IsTemplate,Modified,Editor/Title",r=/\bEditor\//.test(n)?"&$expand=Editor":"",a=J(ot(e),"/items("+o+")?$select="+encodeURIComponent(n)+r),i=await ne(a);return i?{row:i,etag:i.__metadata?.etag||"",modified:i.Modified||"",editor:i.Editor?.Title||""}:null}function tn(e,t){return e===de?String(t):e+":"+t}function hv(e){let t=new Map,o=new Map;for(let n of e)for(let r of n.rows){let a=tn(n.list,r.Id);t.set(r,a),o.set(a,n.list)}return{rowToPageId:t,sourceListByPageId:o}}function bv(e,t,o){let n=String(o);if(e.get(n)===t)return n;let r=t+":"+o;return e.get(r)===t?r:n}function vr(e,t){return bv(St,e,t)}function Es(e){return ot(e)+":"+Lt(e)}function vs(e){if(!e||e.startsWith("row:"))return"";let t=e.lastIndexOf(":");return t<=0?e:vr(e.slice(0,t),parseInt(e.slice(t+1),10))}function vv(e){Tr.set(e,{state:"create",at:Date.now()})}function cu(e,t){Tr.set(e,{state:t?"delete-purge":"delete-soft",at:Date.now()})}function yv(e){Tr.set(e,{state:"restore",at:Date.now()})}function Mn(e){Tr.delete(e)}function Cn(e){vv(e)}function Pt(e=5e3){su=Math.max(su,Date.now()+e)}function du(){return Date.now()<su}function lt(){let e=uv.then(()=>fv(),()=>fv());return uv=e.catch(()=>{}),e}async function fv(){let e=await mt().catch(()=>0);m.meta.myUserId=e||0,await Ot();let t=Kt(),o;try{o=await Ie(de,mv)}catch{return m.pages}let n=[{list:de,rows:o}];if(t!==de)try{let f=await Ie(t,mv);n.push({list:t,rows:f})}catch{return m.pages}let r=new Map(St),{rowToPageId:a,sourceListByPageId:i}=hv(n);St.clear();for(let[f,g]of i)St.set(f,g);let s=n.flatMap(f=>f.rows),l=gv(s,e).map(f=>nL(f,a.get(f)??String(f.Id))),c=new Map(l.map(f=>[f.id,f])),d=Date.now();for(let[f,g]of Tr){let y=c.get(f);g.state==="create"?(y||d-g.at>=pv)&&Mn(f):g.state==="restore"?(y&&!y.trashed||d-g.at>=pv)&&Mn(f):g.state==="delete-soft"?y&&y.trashed?Mn(f):y?g.absentReads=0:(g.absentReads=(g.absentReads??0)+1,g.absentReads>=2&&Mn(f)):g.state==="delete-purge"&&(y?g.absentReads=0:(g.absentReads=(g.absentReads??0)+1,g.absentReads>=2&&Mn(f)))}let p=[];for(let f of l){let g=Tr.get(f.id);g&&g.state==="delete-purge"||(g?.state==="delete-soft"&&!f.trashed&&(f.trashed=g.at),g?.state==="restore"&&f.trashed&&delete f.trashed,p.push(f))}let u=new Set(p.map(f=>f.id));for(let[f,g]of Tr){if(u.has(f)||g.state==="delete-purge")continue;let y=m.meta.pages.find(h=>h.id===f);if(!y)continue;let b={...y};g.state==="delete-soft"&&!b.trashed&&(b.trashed=g.at),g.state==="restore"&&delete b.trashed,p.push(b),St.set(f,r.get(f)||Io(b.scope==="org"?"org":"user"))}return Np(p),Promise.resolve().then(()=>(bs(),Hc)).then(f=>f.gcMyOrphanComments(new Set(m.meta.pages.map(g=>Es(g.id))))).catch(()=>{}),m.pages}function Lt(e){let t=e.lastIndexOf(":"),o=t>=0?e.substring(t+1):e;return parseInt(o,10)}function mu(){return m.meta.pages.filter(e=>e.trashed).map(e=>({id:e.id,title:e.title,trashed:e.trashed,type:e.type})).sort((e,t)=>t.trashed-e.trashed)}function ge(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Ye(e){return JSON.stringify(e)}async function rL(e){let t=await Pn(e,"Body_blocks"),o=ge(t?.row.Body_blocks);return Xo(o)}async function so(e){let t=await Pn(e,"Body_blocks");return Ve(ge(t?.row.Body_blocks))}async function Mt(e){let o=(await Pn(e,"Body_blocks"))?.row.Body_blocks;if(!o)return"[]";try{let n=JSON.parse(o);if(!Array.isArray(n))return"[]"}catch{return"[]"}return o}async function ct(e){let t=await Pn(e,"Modified,Trashed");if(!t)return null;let o=t.row.Trashed;return{modified:t.modified,etag:t.etag,trashed:typeof o=="number"?o:0}}async function pu(e){let t=await Pn(e,"Body_blocks,Modified");if(!t)return null;let o=t.row.Body_blocks||"",n=ge(o),r=Ye(n);return{html:Xo(n),body:r,modified:t.modified,etag:t.etag}}async function st(e,t){let o=Lt(e);if(!o)return;let n=ot(e);await ze(n,o,t);try{let r=await Pn(e,"Modified");r&&(m.sync.pageId===e&&(m.sync.loadedEtag=r.etag,m.sync.loadedModified=r.modified),r.etag&&$o(e).set(r.etag))}catch{}}async function en(e,t,o="user"){await Ot();let n=Io(o),r=await _e(n,{Title:e,ParentId:t||"",PageType:"page",Icon:"",Pinned:0,Trashed:0,Body_blocks:"[]",Scope:o,AuthorId:m.meta.myUserId}),a=tn(n,r.Id);return St.set(a,n),Cn(a),Pt(),m.meta.pages.push({id:a,title:e,parent:t||"",type:"page",icon:"",scope:o,authorId:m.meta.myUserId}),{Id:a,Title:e,ParentId:t||"",Type:"page"}}async function Da(e,t,o,n="user",r=!1){await Ot();let a=Io(n),i=await _e(a,{Title:e,ParentId:t||"",PageType:"database",Icon:"",Pinned:0,Trashed:0,ListTitle:o,Body_blocks:"[]",Scope:n,AuthorId:m.meta.myUserId,...r?{IsTemplate:1}:{}}),s=tn(a,i.Id);return St.set(s,a),Cn(s),Pt(),m.meta.pages.push({id:s,title:e,parent:t||"",type:"database",list:o,icon:"",scope:n,authorId:m.meta.myUserId,...r?{isTemplate:!0}:{}}),{Id:s,Title:e,ParentId:t||"",Type:"database"}}async function Fa(e,t,o,n){return ks(e,t,o,n)}async function Na(e,t,o,n){let r=Ge(o);return ks(e,t,Ye(r),n)}async function ks(e,t,o,n){let r=Lt(e);if(!r)throw new Error("invalid page id");let a=A(e),i=!!a?.published,s={Title:t,Body_blocks:o};if(i&&(s.PublishedDirty=1),n){let c=ot(e);if(!(await fr(c,r,s,n)).ok)return{ok:!1,reason:"conflict"}}else await st(e,s);a&&(a.title=t,i&&(a.publishedDirty=!0));let l=await Pn(e,"Modified");return l&&m.sync.pageId===e&&(m.sync.loadedEtag=l.etag,m.sync.loadedModified=l.modified),Qo(),{ok:!0,etag:l?.etag||""}}async function uu(e){for(let t of e){let o=A(t);if(o?.type==="database"&&o.list==="memola-daily"){let{clearDailyCache:n}=await Promise.resolve().then(()=>(Sn(),Ra));n();return}}}async function ws(e){Pt();let t=A(e);if(t?.type==="database"&&t.list==="memola-daily")throw new Error("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u524A\u9664\u3067\u304D\u307E\u305B\u3093 (\u500B\u4EBA\u904B\u7528\u306B\u5FC5\u9808)");let o=$c(e);await uu(o);let n=[],r=[];for(let a of[...o].reverse()){let i=A(a),s=i?.type==="database"&&i.list?i.list:null;if(i?.published){let{unpublishPage:c}=await Promise.resolve().then(()=>(Er(),wr));await c(a).catch(()=>{})}let l=Lt(a);try{l&&await $e(ot(a),l),n.push(a)}catch{r.push(a);continue}if(Promise.resolve().then(()=>(bs(),Hc)).then(c=>c.purgeCommentsForPage(Es(a))).catch(()=>{}),s){let{deleteAllRowEntriesForList:c}=await Promise.resolve().then(()=>(Hp(),zb));await c(s).catch(()=>{}),await La(s).catch(()=>{})}}for(let a of n)cu(a,!0);if(wo(n),r.length)throw new Error("\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F ("+r.length+" \u4EF6)\u3002\u4E00\u90E8\u306E\u30DA\u30FC\u30B8\u306F\u6B8B\u3063\u3066\u3044\u307E\u3059\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002");return n}async function Lr(e,t){if(e===t)return;Pt();let o=t;for(;o;){if(o===e)throw new Error("\u5FAA\u74B0\u53C2\u7167\u306B\u306A\u308A\u307E\u3059");o=A(o)?.parent||""}let n=A(e);if(!n)return;n.parent=t||"",await st(e,{ParentId:t||""});let r=m.pages.find(a=>a.Id===e);r&&(r.ParentId=t||"")}function fu(e,t){if(!t)return null;let o=A(e),n=A(t);if(!o||!n)return null;let r=o.scope==="org"||o.scope==="user"?o.scope:"user",a=n.scope==="org"||n.scope==="user"?n.scope:"user";return r===a?null:a}async function Is(e){Pt();let t=A(e);if(t?.type==="database"&&t.list==="memola-daily")throw new Error("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u524A\u9664\u3067\u304D\u307E\u305B\u3093 (\u500B\u4EBA\u904B\u7528\u306B\u5FC5\u9808)");let o=$c(e);await uu(o);let n=Date.now(),r=m.meta.myUserId||await mt().catch(()=>0),a=[];for(let i of o){let s=A(i),l=s?.trashed,c=s?.trashedBy;s&&(s.trashed=n,s.trashedBy=r),cu(i,!1);try{await st(i,{Trashed:n,TrashedBy:r})}catch{s&&(l?s.trashed=l:delete s.trashed,c?s.trashedBy=c:delete s.trashedBy),Mn(i),a.push(i)}}if(a.length)throw new Error("\u30B4\u30DF\u7BB1\u3078\u306E\u79FB\u52D5\u306B\u5931\u6557\u3057\u307E\u3057\u305F ("+a.length+" \u4EF6)\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")}async function Ts(e){let t=$c(e);await uu(t);let o=[];for(let n of t){let r=A(n),a=r?.trashed,i=r?.trashedBy;r&&(delete r.trashed,delete r.trashedBy),yv(n);try{await st(n,{Trashed:0,TrashedBy:0})}catch{r&&(a&&(r.trashed=a),i&&(r.trashedBy=i)),Mn(n),o.push(n)}}if(o.length)throw new Error("\u5FA9\u5143\u306B\u5931\u6557\u3057\u307E\u3057\u305F ("+o.length+" \u4EF6)\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")}async function Sr(e){return Pt(),ws(e)}async function gu(e,t){let o=A(e);o&&(t?o.pinned=!0:delete o.pinned,await st(e,{Pinned:t?1:0}))}async function Ls(e,t){let o=A(e);o&&(o.icon=t),await st(e,{Icon:t})}async function Ua(e,t,o=!0){if(Pt(15e3),t==="org"){let d=A(e);if(d?.type==="database"&&d.list==="memola-daily")throw new Error("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u7D44\u7E54\u306B\u516C\u958B\u3067\u304D\u307E\u305B\u3093 (\u500B\u4EBA\u5C02\u7528)")}let n=o?$c(e):[e],r=Io(t);if(!n.some(d=>ot(d)!==r)){for(let p of n){let u=Lt(p);u&&await ze(ot(p),u,{Scope:t}).catch(()=>{});let f=A(p);f&&(f.scope=t)}let d={};for(let p of n)d[p]=p;return{rootId:e,idMap:d}}let i=new Set(n),s={},l=["Title","PageType","Icon","Pinned","Trashed","ListTitle","DbRowId","Body_blocks","Published","PublishedUrl","PublishedPageId","PublishedDirty","OriginDailyDate","OriginPageId","IsTemplate","AuthorId"];for(let d of n){let p=ot(d),u=Lt(d);if(!u)continue;let f=await is(p,u).catch(()=>null);if(!f)continue;let g=f,y=g.ParentId||"",h={ParentId:i.has(y)?s[y]??"":y,Scope:t};for(let x of l)g[x]!==void 0&&g[x]!==null&&(h[x]=g[x]);let v=await _e(r,h),k=tn(r,v.Id);s[d]=k,St.set(k,r),Cn(k),await $e(p,u).catch(()=>{}),St.delete(d)}await lt();let c={};for(let[d,p]of Object.entries(s))c[d]=vr(r,Lt(p));return Qo(),Promise.resolve().then(()=>(bs(),Hc)).then(d=>d.remapCommentsPageId(new Map(Object.entries(c)))).catch(()=>{}),{rootId:c[e]??s[e]??e,idMap:c}}async function aL(e,t=new Set){let o=await Mt(e).catch(()=>null);if(!o)return[];let n;try{n=ge(o)}catch{return[]}let r=[],a=new Set,i=l=>{for(let c of l)if(c.kind==="pagelink"){let d=c.pageId;if(a.has(d)||t.has(d))continue;let p=A(d);p&&p.scope!=="org"&&(a.add(d),r.push(p.title||c.alias||d))}else(c.kind==="bold"||c.kind==="italic"||c.kind==="strike"||c.kind==="link")&&i(c.children)},s=l=>{for(let c of l){if("inline"in c&&Array.isArray(c.inline)&&i(c.inline),c.kind==="table")for(let d of c.rows)for(let p of d)i(p);if((c.kind==="quote"||c.kind==="callout")&&s(c.children),c.kind==="list")for(let d of c.items)s(d)}};return s(n),r}async function za(e,t){let o=A(e);o&&(o.title=t,o.published&&(o.publishedDirty=!0));let n={Title:t};o?.published&&(n.PublishedDirty=1),await st(e,n)}async function iL(e){await Ot();let t=A(e);if(!t)throw new Error("\u539F\u672C\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");let o=await Mt(e),n="[\u4E0B\u66F8\u304D] "+(t.title||"\u7121\u984C"),r=t.scope||"user",a=Io(r),i=await _e(a,{Title:n,ParentId:"",PageType:"draft",Icon:"\u270F\uFE0F",Pinned:0,Trashed:0,Body_blocks:o||"[]",OriginPageId:e,OriginBaseBlocks:o||"[]",Scope:r,AuthorId:m.meta.myUserId}),s=tn(a,i.Id);return St.set(s,a),Cn(s),Pt(),m.meta.pages.push({id:s,title:n,parent:"",type:"page",icon:"\u270F\uFE0F",originPageId:e,authorId:m.meta.myUserId}),{Id:s,Title:n,ParentId:"",Type:"page",IsDraft:!0}}function hu(){return m.meta.pages.filter(e=>e.isTemplate&&!e.trashed).sort((e,t)=>(e.title||"\u7121\u984C").localeCompare(t.title||"\u7121\u984C","ja"))}async function sL(e){await Ot();let t=A(e);if(!t)throw new Error("\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(t.type==="database")throw new Error("DB \u306E\u30C6\u30F3\u30D7\u30EC\u767B\u9332\u306F\u672A\u5BFE\u5FDC\u3067\u3059");let o=await Mt(e),n=t.title||"\u7121\u984C",r=t.scope||"user",a=Io(r),i=await _e(a,{Title:n,ParentId:"",PageType:"page",Icon:t.icon||"",Pinned:0,Trashed:0,Body_blocks:o||"[]",Scope:r,IsTemplate:1,AuthorId:m.meta.myUserId}),s=tn(a,i.Id);return St.set(s,a),Cn(s),Pt(),m.meta.pages.push({id:s,title:n,parent:"",type:"page",icon:t.icon||"",scope:r,isTemplate:!0,authorId:m.meta.myUserId}),Qo(),s}async function lL(e){await Ot();let t=A(e);if(!t)throw new Error("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(t.type==="database")throw new Error("DB \u30C6\u30F3\u30D7\u30EC\u304B\u3089\u306E\u4F5C\u6210\u306F\u672A\u5BFE\u5FDC\u3067\u3059");let o=await Mt(e),n=t.title||"\u7121\u984C",r="user",a=Io(r),i=await _e(a,{Title:n,ParentId:"",PageType:"page",Icon:t.icon||"",Pinned:0,Trashed:0,Body_blocks:o||"[]",Scope:r,AuthorId:m.meta.myUserId}),s=tn(a,i.Id);return St.set(s,a),Cn(s),Pt(),m.meta.pages.push({id:s,title:n,parent:"",type:"page",icon:t.icon||"",scope:r,authorId:m.meta.myUserId}),Qo(),{Id:s,Title:n,ParentId:"",Type:"page"}}async function cL(e){await Ot();let t=A(e);if(!t)throw new Error("\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(t.type==="database")throw new Error("DB \u306F\u3053\u306E\u7D4C\u8DEF\u3067\u306F\u8907\u88FD\u3067\u304D\u307E\u305B\u3093");let o=await Mt(e),n=(t.title||"\u7121\u984C")+" (\u30B3\u30D4\u30FC)",r=t.scope||"user",a=Io(r),i=await _e(a,{Title:n,ParentId:t.parent||"",PageType:"page",Icon:t.icon||"",Pinned:0,Trashed:0,Body_blocks:o||"[]",Scope:r,AuthorId:m.meta.myUserId}),s=tn(a,i.Id);return St.set(s,a),Cn(s),Pt(),m.meta.pages.push({id:s,title:n,parent:t.parent||"",type:"page",icon:t.icon||"",scope:r,authorId:m.meta.myUserId}),Qo(),{Id:s,Title:n,ParentId:t.parent||"",Type:"page"}}async function dL(e){let t=A(e),o=Lt(e);o&&await $e(ot(e),o).catch(()=>{}),t?.type==="database"&&t.list&&await La(t.list).catch(()=>{}),wo([e]),Qo()}async function mL(e,t){let o=A(e);if(!o)throw new Error("\u4E0B\u66F8\u304D\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(!o.originPageId)throw new Error("\u3053\u306E\u30DA\u30FC\u30B8\u306F\u4E0B\u66F8\u304D\u3067\u306F\u3042\u308A\u307E\u305B\u3093");let n=o.originPageId;if(!m.meta.pages.find(g=>g.id===n&&!g.trashed))throw new Error("\u539F\u672C\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093 (\u524A\u9664\u6E08\u307F?)");let a=o.title.replace(/^\[下書き\]\s*/,""),i=await Mt(e);if(t?.force){if(!(await ks(n,a,i||"[]")).ok)throw new Error("\u539F\u672C\u306E\u66F4\u65B0\u306B\u5931\u6557\u3057\u307E\u3057\u305F (\u7AF6\u5408)");return await ws(e).catch(()=>{}),{status:"forced",originId:n}}let l=(await Pn(e,"OriginBaseBlocks"))?.row.OriginBaseBlocks??"",c=await Mt(n),d=l!==""&&Ye(ge(c))===Ye(ge(l));if(!l||d)return(await ks(n,a,i||"[]")).ok?(await ws(e).catch(()=>{}),{status:"applied",originId:n}):{status:"conflict",originId:n,conflicts:1};let{threeWayMergeBlocks:p}=await Promise.resolve().then(()=>(qc(),sv)),u=p(ge(l),ge(i),ge(c));return u.conflicts.length>0?{status:"conflict",originId:n,conflicts:u.conflicts.length}:(await ks(n,a,Ye(u.merged))).ok?(await ws(e).catch(()=>{}),{status:"merged",originId:n,autoMerged:u.autoMergedCount}):{status:"conflict",originId:n,conflicts:1}}async function pL(e){let t=A(e);if(!t)throw new Error("\u4E0B\u66F8\u304D\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(!t.originPageId)throw new Error("\u3053\u306E\u30DA\u30FC\u30B8\u306F\u4E0B\u66F8\u304D\u3067\u306F\u3042\u308A\u307E\u305B\u3093");let o=(t.title||"\u7121\u984C").replace(/^\[下書き\]\s*/,""),n=t.icon==="\u270F\uFE0F"?"":t.icon||"";return await st(e,{Title:o,PageType:"page",OriginPageId:"",Icon:n}),t.title=o,t.originPageId=void 0,t.icon=n,Qo(),e}var de,Ha,lv,oL,St,mv,Tr,pv,su,uv,$c,K=L(()=>{"use strict";j();Re();Et();He();Tt();Jo();hr();$t();ms();ve();ye();Hp();de="memola-pages";Ha=null;lv=[["ParentId",2],["PageType",2],["Icon",2],["Pinned",9],["Trashed",9],["ListTitle",2],["DbRowId",9],["Body_blocks",3],["Published",9],["PublishedUrl",3],["PublishedPageId",9],["PublishedDirty",9],["OriginDailyDate",2],["OriginPageId",2],["Scope",2],["TrashedBy",9],["IsTemplate",9],["OriginBaseBlocks",3]],oL=["ListTitle","DbRowId","PageType","Scope","Trashed","TrashedBy"];St=new Map;mv="Id,Title,ParentId,PageType,Icon,Pinned,Trashed,ListTitle,DbRowId,Published,PublishedUrl,PublishedPageId,PublishedDirty,OriginDailyDate,OriginPageId,Scope,AuthorId,TrashedBy,IsTemplate",Tr=new Map,pv=5*6e4;su=0;uv=Promise.resolve();$c=e=>Zo(m.pages,e)});function M(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var De=L(()=>{"use strict"});function kv(){return typeof BroadcastChannel>"u"?null:(ja||(ja=new BroadcastChannel(uL)),ja)}function wv(e,t,o){let n=kv();if(!n)return;let r={type:"page-saved",pageId:e,etag:t,modified:o,tabId:xv};try{n.postMessage(r)}catch{}}function Ev(){if(ja){try{ja.close()}catch{}ja=null}}function Iv(e){let t=kv();if(!t)return()=>{};let o=n=>{let r=n.data;!r||r.type!=="page-saved"||r.tabId!==xv&&e(r)};return t.addEventListener("message",o),()=>t.removeEventListener("message",o)}var uL,xv,ja,bu=L(()=>{"use strict";He();uL="memola-cross-tab:"+G,xv=Math.random().toString(36).slice(2)+Date.now().toString(36),ja=null});function vu(e){let t=e.split(`
`),o=[],n="";for(let r of t)n?(n+=`
`+r,r.endsWith("  ")||(o.push(n),n="")):r.endsWith("  ")?n=r:o.push(r);return n&&o.push(n),o}function yu(e,t,o){let n=vu(e),r=vu(t),a=vu(o),i=Tv(n,r),s=Tv(n,a),l=Lv(i,r),c=Lv(s,a),d=[],p=[],u=0,f=new Map,g=new Map;for(let v of l)f.set(v.baseStart,v);for(let v of c)g.set(v.baseStart,v);let y=0;for(;y<n.length;){let v=f.get(y),k=g.get(y);if(!v&&!k){d.push(n[y]),y++;continue}if(v&&!k){d.push(...v.replacement),u++,y=v.baseEnd;continue}if(k&&!v){d.push(...k.replacement),u++,y=k.baseEnd;continue}if(v&&k){let x=v.baseEnd,T=k.baseEnd;if(x===T&&v.replacement.length===k.replacement.length&&v.replacement.every((H,D)=>H===k.replacement[D])){d.push(...v.replacement),u++,y=x;continue}let F=n.slice(y,Math.max(x,T)),P={id:p.length,yours:v.replacement,theirs:k.replacement,base:F};p.push(P),d.push(Kc+" #"+P.id),d.push(...P.yours),d.push(Wc),d.push(...P.base),d.push(Gc),d.push(...P.theirs),d.push(Vc+" #"+P.id),y=Math.max(x,T)}}let b=f.get(n.length),h=g.get(n.length);if(b||h)if(b&&h)if(b.replacement.length===h.replacement.length&&b.replacement.every((k,x)=>k===h.replacement[x]))d.push(...b.replacement),u++;else{let k={id:p.length,yours:b.replacement,theirs:h.replacement,base:[]};p.push(k),d.push(Kc+" #"+k.id),d.push(...k.yours),d.push(Wc),d.push(Gc),d.push(...k.theirs),d.push(Vc+" #"+k.id)}else b?(d.push(...b.replacement),u++):h&&(d.push(...h.replacement),u++);return{merged:d.join(`
`),conflicts:p,autoMergedCount:u}}function Tv(e,t){let o=e.length,n=t.length,r=Array.from({length:o+1},()=>new Array(n+1).fill(0));for(let l=1;l<=o;l++)for(let c=1;c<=n;c++)r[l][c]=e[l-1]===t[c-1]?r[l-1][c-1]+1:Math.max(r[l-1][c],r[l][c-1]);let a=[],i=o,s=n;for(;i>0&&s>0;)e[i-1]===t[s-1]?(a.push({op:"=",base:i-1,side:s-1}),i--,s--):r[i-1][s]>=r[i][s-1]?(a.push({op:"-",base:i-1}),i--):(a.push({op:"+",side:s-1}),s--);for(;i>0;)a.push({op:"-",base:i-1}),i--;for(;s>0;)a.push({op:"+",side:s-1}),s--;return a.reverse(),a}function Lv(e,t){let o=[],n=0;for(;n<e.length;){if(e[n].op==="="){n++;continue}let a=null,i=null,s=[];for(;n<e.length&&e[n].op!=="=";){let l=e[n];l.op==="-"?(a===null&&(a=l.base),i=l.base+1):l.op==="+"&&s.push(t[l.side]),n++}if(a===null){let l=e.slice(n).find(c=>c.op==="=");a=l?l.base:fL(e)+1,i=a}o.push({baseStart:a,baseEnd:i??a,replacement:s})}return o}function fL(e){for(let t=e.length-1;t>=0;t--){let o=e[t];if(o.op==="="||o.op==="-")return o.base}return-1}function Sv(e,t,o){let n=e.split(`
`),r=Kc+" #"+t,a=Vc+" #"+t,i=n.findIndex(y=>y===r),s=n.findIndex((y,b)=>b>i&&y===a);if(i<0||s<0)return e;let l=-1,c=-1;for(let y=i+1;y<s;y++)n[y]===Wc&&(l=y),n[y]===Gc&&(c=y);if(c<0)return e;let d=n.slice(i+1,l>=0?l:c),p=n.slice(c+1,s),u;Array.isArray(o)?u=o:o==="yours"?u=d:o==="theirs"||d.length===0?u=p:p.length===0?u=d:u=[...d,"",...p];let f=n.slice(0,i),g=n.slice(s+1);return[...f,...u,...g].join(`
`)}function Mv(e){if(e.includes(Kc)||e.includes(Vc))return!0;for(let t of e.split(`
`))if(t===Gc||t===Wc)return!0;return!1}var Kc,Wc,Gc,Vc,Pv=L(()=>{"use strict";Kc="<<<<<<< \u3042\u306A\u305F",Wc="||||||| \u5143\u306E\u72B6\u614B",Gc="=======",Vc=">>>>>>> SP \u6700\u65B0"});function An(e,t){return e==="lastBy"||e==="lastAt"?void 0:t}function Cv(e){return JSON.stringify(e,An)}function xu(e){return e.trim().startsWith("[")}function Av(e){let t=e.trim();if(t===""||t==="[]")return!0;if(!t.startsWith("["))return!1;try{let o=ge(e);return o.length===0?!0:o.length===1&&o[0].kind==="p"&&o[0].inline?.length===0}catch{return!1}}function To(e,t){if(e===t)return!0;let o=Av(e),n=Av(t);if(o||n)return o&&n;if(!xu(e)||!xu(t))return e===t;try{let r=JSON.stringify(ge(e),An),a=JSON.stringify(ge(t),An);return r===a}catch{return e===t}}function Bv(e,t,o,n){if(!xu(e))return e;let r=ge(e),a=ge(t),i=new Map;for(let l of a)i.set(l.id,l);let s=r.map(l=>{let c=i.get(l.id);if(c&&Cv(c)===Cv(l)){let d={...l};return c.lastBy!==void 0?d.lastBy=c.lastBy:delete d.lastBy,c.lastAt!==void 0?d.lastAt=c.lastAt:delete d.lastAt,d}return{...l,lastBy:o,lastAt:n}});return Ye(s)}var qa=L(()=>{"use strict";K()});var Ka={};q(Ka,{saver:()=>re});function Yc(e,t){let o=m.meta.myUserId||0;return Bv(e,t,o,Date.now())}function $a(e){if(!e)return"";try{let t=JSON.parse(e);if(Array.isArray(t))return Ve(t)}catch{}return e}function gL(e){return Ye(Ge(e))}function hL(e,t,o){let n=l=>{let c=(l||"").trim();return c===""||c.startsWith("[")};if(!n(e)||!n(t)||!n(o))return null;let r=ge(e),a=ge(t),i=ge(o);if(r.length===0&&a.length===0&&i.length===0)return null;let s=Ir(r,a,i);return s.conflicts.length>0?null:Ye(s.merged)}function Dv(e,t,o){return t===o?t:t===e?o:t}var ku,re,ft=L(()=>{"use strict";K();Pv();Tt();K();qc();qa();j();ku=class{constructor(){this._state={kind:"unloaded"};this._listeners=new Set;this._saveInFlight=null;this._generation=0}state(){return this._state}subscribe(t){this._listeners.add(t);try{t(this._state)}catch{}return()=>{this._listeners.delete(t)}}isDirty(t){let o=this._state;return o.kind==="dirty"||o.kind==="saving"?t==null||o.base.pageId===t:!1}isBusy(){let t=this._state.kind;return t==="saving"||t==="conflict"||t==="merging"}loadPage(t){this._generation++,this._saveInFlight=null,this._set({kind:"idle",base:t})}unload(){this._generation++,this._saveInFlight=null,this._set({kind:"unloaded"})}rebaseOnto(t,o,n){let r=this._state;if(r.kind!=="idle"&&r.kind!=="dirty"||(r.kind==="idle",r.base).pageId!==t.pageId)return;let i={pageId:t.pageId,body:t.body,title:t.title,etag:t.etag,modified:t.modified};To(o,i.body)&&n===i.title?this._set({kind:"idle",base:i}):this._set({kind:"dirty",base:i,body:o,title:n})}notifyEdit(t,o){let n=this._state;switch(n.kind){case"unloaded":return;case"idle":if(To(t,n.base.body)&&o===n.base.title)return;this._set({kind:"dirty",base:n.base,body:t,title:o});return;case"dirty":To(t,n.base.body)&&o===n.base.title?this._set({kind:"idle",base:n.base}):this._set({kind:"dirty",base:n.base,body:t,title:o});return;case"saving":this._set({kind:"saving",base:n.base,body:t,title:o});return;case"conflict":case"merging":{let r=n.conflict,a={pageId:r.pageId,body:r.base.body,title:r.base.title,etag:r.base.etag,modified:r.base.modified};To(t,a.body)&&o===a.title?this._set({kind:"idle",base:a}):this._set({kind:"dirty",base:a,body:t,title:o});return}}}save(){if(this._saveInFlight)return this._saveInFlight;let t=this._state;return t.kind!=="dirty"?Promise.resolve({ok:!1,reason:"noop"}):this._runSave(t.base,t.body,t.title)}_runSave(t,o,n){this._set({kind:"saving",base:t,body:o,title:n});let r=this._generation,a=Yc(o,t.body),i=(async()=>{try{let s=await Fa(t.pageId,n,a,t.etag);if(r!==this._generation)return s.ok?{ok:!0}:{ok:!1,reason:"conflict"};if(s.ok){let b=await ct(t.pageId).catch(()=>null);if(r!==this._generation)return{ok:!0};let h={pageId:t.pageId,body:a,title:n,etag:s.etag,modified:b?.modified||t.modified},v=this._state;return v.kind==="saving"&&v.body===o&&v.title===n?this._set({kind:"idle",base:h}):v.kind==="saving"&&this._set({kind:"dirty",base:h,body:v.body,title:v.title}),{ok:!0}}let l=await Mt(t.pageId).catch(()=>null),c=await ct(t.pageId).catch(()=>null);if(l===null||!c?.etag){let b=this._state,h=b.kind==="saving"?b.body:o,v=b.kind==="saving"?b.title:n;return this._set({kind:"dirty",base:t,body:h,title:v}),{ok:!1,reason:"error",error:new Error("remote-fetch-failed")}}let d=c.title??t.title,p=this._state,u=p.kind==="saving"?p.body:o,f=p.kind==="saving"?p.title:n,g=hL(t.body,u,l);if(g!==null){let b=Dv(t.title,f,d),h=Yc(g,t.body),v=await Fa(t.pageId,b,h,c.etag);if(r!==this._generation)return v.ok?{ok:!0}:{ok:!1,reason:"conflict"};if(v.ok){let k=await ct(t.pageId).catch(()=>null);return r!==this._generation?{ok:!0}:(this._set({kind:"idle",base:{pageId:t.pageId,body:h,title:b,etag:v.etag,modified:k?.modified||t.modified}}),{ok:!0})}}let y={pageId:t.pageId,ours:{body:u,title:f},base:{body:t.body,etag:t.etag,title:t.title,modified:t.modified},theirs:{body:l,etag:c.etag,modified:c.modified||"",title:d}};return this._set({kind:"conflict",conflict:y}),{ok:!1,reason:"conflict"}}catch(s){if(r!==this._generation)return{ok:!1,reason:"error",error:s};let l=this._state,c=l.kind==="saving"?l.body:o,d=l.kind==="saving"?l.title:n;return this._set({kind:"dirty",base:t,body:c,title:d}),{ok:!1,reason:"error",error:s}}finally{r===this._generation&&(this._saveInFlight=null)}})();return this._saveInFlight=i,i}async flush(){if(this._saveInFlight)try{await this._saveInFlight}catch{}if(this._state.kind==="dirty")try{await this.save()}catch{}}forceOverwrite(){if(this._saveInFlight)return this._saveInFlight;let t=this._state;if(t.kind!=="conflict"&&t.kind!=="merging")return Promise.resolve({ok:!1,reason:"noop"});let o=t.conflict,n=this._generation,r=Yc(o.ours.body,o.base.body),a=(async()=>{try{let i=await Fa(o.pageId,o.ours.title,r);if(n!==this._generation)return i.ok?{ok:!0}:{ok:!1,reason:"error",error:new Error("overwrite-failed")};if(i.ok){let s=await ct(o.pageId).catch(()=>null);if(n!==this._generation)return{ok:!0};let l={pageId:o.pageId,body:r,title:o.ours.title,etag:i.etag,modified:s?.modified||""};return this._set({kind:"idle",base:l}),{ok:!0}}return{ok:!1,reason:"error",error:new Error("overwrite-failed")}}catch(i){return{ok:!1,reason:"error",error:i}}finally{n===this._generation&&(this._saveInFlight=null)}})();return this._saveInFlight=a,a}acceptTheirs(){let t=this._state;t.kind!=="conflict"&&t.kind!=="merging"||(this._saveInFlight=null,this._set({kind:"unloaded"}))}cancelConflict(){let t=this._state;if(t.kind!=="conflict"&&t.kind!=="merging")return;let o=t.conflict,n={pageId:o.pageId,body:o.base.body,title:o.base.title,etag:o.base.etag,modified:o.base.modified};To(o.ours.body,n.body)&&o.ours.title===n.title?this._set({kind:"idle",base:n}):this._set({kind:"dirty",base:n,body:o.ours.body,title:o.ours.title})}startMerge(){let t=this._state;if(t.kind!=="conflict")return;let o=t.conflict,n=yu($a(o.base.body),$a(o.ours.body),$a(o.theirs.body));this._set({kind:"merging",conflict:o,hunks:n.conflicts,rawMerged:n.merged,resolved:new Map})}setMergeChoice(t,o){let n=this._state;if(n.kind!=="merging")return;let r=new Map(n.resolved);r.set(t,o),this._set({...n,resolved:r})}computeMergedBody(){let t=this._state;if(t.kind!=="merging")return"";let o=t.rawMerged;for(let[n,r]of t.resolved)o=Sv(o,n,r);return o}computeMergedBodyForSave(){return gL(this.computeMergedBody())}isMergeResolved(){let t=this._state;return t.kind!=="merging"?!1:t.hunks.length===0?!0:t.resolved.size<t.hunks.length?!1:!Mv(this.computeMergedBody())}applyMerge(){if(this._saveInFlight)return this._saveInFlight;let t=this._state;if(t.kind!=="merging")return Promise.resolve({ok:!1,reason:"noop"});if(!this.isMergeResolved())return Promise.resolve({ok:!1,reason:"error",error:new Error("\u672A\u89E3\u6C7A\u306E\u7AF6\u5408\u304C\u3042\u308A\u307E\u3059")});let o=this.computeMergedBodyForSave(),n=t.conflict,r=Dv(n.base.title,n.ours.title,n.theirs.title),a=Yc(o,n.base.body),i=this._generation,s=(async()=>{try{let l=await Fa(n.pageId,r,a,n.theirs.etag);if(i!==this._generation)return l.ok?{ok:!0}:{ok:!1,reason:"conflict"};if(l.ok){let u=await ct(n.pageId).catch(()=>null);if(i!==this._generation)return{ok:!0};let f={pageId:n.pageId,body:a,title:r,etag:l.etag,modified:u?.modified||""};return this._set({kind:"idle",base:f}),{ok:!0}}let c=await Mt(n.pageId).catch(()=>null),d=await ct(n.pageId).catch(()=>null);if(c===null||!d?.etag)return{ok:!1,reason:"error",error:new Error("remote-fetch-failed")};if(i!==this._generation)return{ok:!1,reason:"conflict"};let p={pageId:n.pageId,ours:{body:o,title:r},base:{body:n.theirs.body,etag:n.theirs.etag,title:n.theirs.title,modified:n.theirs.modified},theirs:{body:c,etag:d.etag,modified:d.modified||"",title:d.title??n.theirs.title}};return this._set({kind:"conflict",conflict:p}),{ok:!1,reason:"conflict"}}catch(l){return{ok:!1,reason:"error",error:l}}finally{i===this._generation&&(this._saveInFlight=null)}})();return this._saveInFlight=s,s}cancelMerge(){let t=this._state;t.kind==="merging"&&this._set({kind:"conflict",conflict:t.conflict})}async beginExternalMerge(t){let o=await Mt(t.pageId).catch(()=>null),n=await ct(t.pageId).catch(()=>null);if(o===null||!n?.etag)throw new Error("beginExternalMerge: remote-fetch-failed");let r={pageId:t.pageId,ours:{body:t.ourBody,title:t.title},base:{body:t.baseBody,etag:t.baseEtag,title:t.title,modified:""},theirs:{body:o,etag:n.etag,modified:n.modified||"",title:t.pageTitle}},a=t.baseBody??o,i=yu($a(a),$a(t.ourBody),$a(o));this._set({kind:"merging",conflict:r,hunks:i.conflicts,rawMerged:i.merged,resolved:new Map})}_set(t){this._state=t;for(let o of this._listeners)try{o(t)}catch{}}},re=new ku});function wu(e){return e.trim().startsWith("[")}function _v(e,t,o){if(!wu(e)||!wu(t)||!wu(o))return{kind:"noop"};let n,r,a;try{n=ge(e),r=ge(t),a=ge(o)}catch{return{kind:"noop"}}let i=Ir(n,r,a);if(i.conflicts.length>0)return{kind:"conflict"};let s=Ye(i.merged);return{kind:"merge",merged:i.merged,mergedBody:s,changed:!To(s,t)}}var Rv=L(()=>{"use strict";K();qc();qa()});function lo(e,t){let o=e.blocks.findIndex(n=>n.id===t);return o<0?null:{idx:o,block:e.blocks[o]}}function Lo(e,t){return Eu(e.blocks,t,[])}function Eu(e,t,o){for(let n=0;n<e.length;n++){let r=e[n];if(r.id===t)return{path:[...o,n],block:r};if(r.kind==="callout"||r.kind==="quote"){let a=Eu(r.children,t,[...o,n]);if(a)return a}else if(r.kind==="list")for(let a=0;a<r.items.length;a++){let i=Eu(r.items[a],t,[...o,n,a]);if(i)return i}}return null}function Bn(e,t,o){if(t.length===0)return e;if(t.length===1){let l=t[0];if(l<0||l>=e.length)return e;let c=e.slice();return c[l]=o(e[l]),c}let[n,...r]=t;if(n<0||n>=e.length)return e;let a=e[n],i;if(a.kind==="callout"||a.kind==="quote")i={...a,children:Bn(a.children,r,o)};else if(a.kind==="list"){let[l,...c]=r;if(l<0||l>=a.items.length)return e;let d=a.items.slice();d[l]=Bn(a.items[l],c,o),i={...a,items:d}}else return e;let s=e.slice();return s[n]=i,s}function nn(e,t,o){let n=e.blocks.slice();return n[t]=o,{...e,blocks:n}}function Ov(e,t,o){let n=e.blocks.slice();return n.splice(t,0,o),{...e,blocks:n}}function Mr(e,t,o){let n=Lo(e,t);if(!n)return e;let{block:r}=n;if(r.kind!=="p"&&r.kind!=="h1"&&r.kind!=="h2"&&r.kind!=="h3"&&r.kind!=="todo")return e;let a=Bn(e.blocks,n.path,i=>i.kind!=="p"&&i.kind!=="h1"&&i.kind!=="h2"&&i.kind!=="h3"&&i.kind!=="todo"?i:{...i,inline:o});return{...e,blocks:a}}function Pr(e,t,o,n){if(n==="")return e;let r=Lo(e,t);if(!r)return e;let{block:a}=r;if(a.kind==="code"){let l=a.text.slice(0,o)+n+a.text.slice(o),c=Bn(e.blocks,r.path,d=>d.kind==="code"?{...d,text:l}:d);return{...e,blocks:c,selection:{kind:"caret",blockId:t,offset:o+n.length}}}if(!("inline"in a))return e;let i=vL(a.inline,o,n);return{...Mr(e,t,i),selection:{kind:"caret",blockId:t,offset:o+n.length}}}function Pu(e,t,o){let n=Lo(e,t);if(!n)return e;let{block:r}=n;if(!("inline"in r))return e;let a=Le(r.inline,0,o),i=Le(r.inline,o,1/0),s=Le([...a,{kind:"br"},...i],0,1/0);return{...Mr(e,t,s),selection:{kind:"caret",blockId:t,offset:o+1}}}function Ga(e,t,o,n){if(n===0)return e;let r=Lo(e,t);if(!r)return e;let{block:a}=r;if(a.kind==="code"){let d=n<0?Math.max(0,o+n):o,p=n<0?o:Math.min(a.text.length,o+n);if(d===p)return e;let u=a.text.slice(0,d)+a.text.slice(p);if(u===""){let g=Bn(e.blocks,r.path,()=>({id:a.id,kind:"p",inline:[]}));return{...e,blocks:g,selection:{kind:"caret",blockId:a.id,offset:0}}}let f=Bn(e.blocks,r.path,g=>g.kind==="code"?{...g,text:u}:g);return{...e,blocks:f,selection:{kind:"caret",blockId:t,offset:d}}}if(!("inline"in a))return e;let i=n<0?o+n:o,s=n<0?o:o+n;if(i===s)return e;let l=yL(a.inline,i,s);return{...Mr(e,t,l),selection:{kind:"caret",blockId:t,offset:i}}}function Cu(e,t,o){let n=lo(e,t);if(n){let{idx:a,block:i}=n;return"inline"in i?bL(e,a,i,o):e}let r=Tu(e.blocks,t,o);return r?{...e,blocks:r.blocks,selection:{kind:"caret",blockId:r.newId,offset:0}}:e}function bL(e,t,o,n){if(!("inline"in o))return e;let r=Le(o.inline,0,n),a=Le(o.inline,n,1/0),i={...o,inline:r},s=Q(),l=Iu(o,s,a),c=nn(e,t,i);return c=Ov(c,t+1,l),{...c,selection:{kind:"caret",blockId:s,offset:0}}}function Iu(e,t,o){return e.kind==="todo"?{id:t,kind:"todo",checked:!1,inline:o}:{id:t,kind:"p",inline:o}}function Tu(e,t,o){for(let n=0;n<e.length;n++){let r=e[n];if(r.kind==="list")for(let a=0;a<r.items.length;a++){let i=r.items[a],s=i.findIndex(c=>c.id===t);if(s>=0){let c=i[s];if(!("inline"in c))return null;let d=Le(c.inline,0,o),p=Le(c.inline,o,1/0),u=Q(),f={...c,inline:d},g=Iu(c,u,p),y=[...i.slice(0,s),f],b=[g,...i.slice(s+1)],h=[...r.items.slice(0,a),y,b,...r.items.slice(a+1)],v=e.slice();return v[n]={...r,items:h},{blocks:v,newId:u}}let l=Tu(i,t,o);if(l){let c=r.items.slice();c[a]=l.blocks;let d=e.slice();return d[n]={...r,items:c},{blocks:d,newId:l.newId}}}else if(r.kind==="callout"||r.kind==="quote"){let a=r.children.findIndex(s=>s.id===t);if(a>=0){let s=r.children[a];if(!("inline"in s))return null;let l=Le(s.inline,0,o),c=Le(s.inline,o,1/0),d=Q(),p={...s,inline:l},u=Iu(s,d,c),f=[...r.children.slice(0,a),p,u,...r.children.slice(a+1)],g=e.slice();return g[n]={...r,children:f},{blocks:g,newId:d}}let i=Tu(r.children,t,o);if(i){let s=e.slice();return s[n]={...r,children:i.blocks},{blocks:s,newId:i.newId}}}}return null}function rn(e,t,o){let n=Lo(e,t);if(!n)return e;let{block:r}=n;if(!("inline"in r))return e;let a=r.inline,i=Bn(e.blocks,n.path,()=>o==="todo"?{id:r.id,kind:"todo",checked:!1,inline:a}:{id:r.id,kind:o,inline:a});return{...e,blocks:i}}function Au(e,t){let o=Lo(e,t);if(!o||o.block.kind!=="todo")return e;let n=Bn(e.blocks,o.path,r=>r.kind!=="todo"?r:{...r,checked:!r.checked});return{...e,blocks:n}}function co(e){return It(e).length}function Le(e,t,o){if(t>=o)return[];let n=[],r=0;for(let a of e){let i=Jc(a);if(r+i<=t){r+=i;continue}if(r>=o)break;let s=Math.max(0,t-r),l=Math.min(i,o-r);if(s===0&&l===i)n.push(a);else{let c=xL(a,s,l);c&&n.push(c)}r+=i}return on(n)}function vL(e,t,o){return o===""?e:Ss(e,t,o)}function Ss(e,t,o){let n=0;for(let r=0;r<e.length;r++){let a=e[r],i=Jc(a);if(t===n)return on([...e.slice(0,r),{kind:"text",text:o},...e.slice(r)]);if(t<n+i){let s=t-n;if(a.kind==="bold"||a.kind==="italic"||a.kind==="strike")return[...e.slice(0,r),{...a,children:Ss(a.children,s,o)},...e.slice(r+1)];if(a.kind==="link")return[...e.slice(0,r),{...a,children:Ss(a.children,s,o)},...e.slice(r+1)];if(a.kind==="text")return on([...e.slice(0,r),{kind:"text",text:a.text.slice(0,s)+o+a.text.slice(s)},...e.slice(r+1)]);if(a.kind==="code")return[...e.slice(0,r),{kind:"code",text:a.text.slice(0,s)+o+a.text.slice(s)},...e.slice(r+1)];let l=a.kind==="pagelink"?a.alias||a.pageId:a.kind==="dailylink"?a.alias||a.date:"",c=l.slice(0,s),d=l.slice(s),p=[];return c&&p.push({kind:"text",text:c}),p.push({kind:"text",text:o}),d&&p.push({kind:"text",text:d}),on([...e.slice(0,r),...p,...e.slice(r+1)])}if(t===n+i){if(a.kind==="bold"||a.kind==="italic"||a.kind==="strike")return[...e.slice(0,r),{...a,children:Ss(a.children,i,o)},...e.slice(r+1)];if(a.kind==="link")return[...e.slice(0,r),{...a,children:Ss(a.children,i,o)},...e.slice(r+1)];if(a.kind==="text")return on([...e.slice(0,r),{kind:"text",text:a.text+o},...e.slice(r+1)]);if(a.kind==="code")return[...e.slice(0,r),{kind:"code",text:a.text+o},...e.slice(r+1)]}n+=i}return on([...e,{kind:"text",text:o}])}function yL(e,t,o){let n=Le(e,0,t),r=Le(e,o,1/0);return on([...n,...r])}function Jc(e){switch(e.kind){case"text":return e.text.length;case"code":return e.text.length;case"br":return 1;case"pagelink":return(e.alias||e.pageId).length;case"dailylink":return(e.alias||e.date).length;case"bold":case"italic":case"strike":return e.children.reduce((t,o)=>t+Jc(o),0);case"link":return e.children.reduce((t,o)=>t+Jc(o),0)}}function xL(e,t,o){switch(e.kind){case"text":return{kind:"text",text:e.text.slice(t,o)};case"code":return{kind:"code",text:e.text.slice(t,o)};case"br":return null;case"pagelink":{let r=(e.alias||e.pageId).slice(t,o);return r?{kind:"text",text:r}:null}case"dailylink":{let r=(e.alias||e.date).slice(t,o);return r?{kind:"text",text:r}:null}case"bold":case"italic":case"strike":{let n=Le(e.children,t,o);return n.length===0?null:{kind:e.kind,children:n}}case"link":{let n=Le(e.children,t,o);return n.length===0?null:{kind:"link",href:e.href,children:n}}}}function on(e){let t=[];for(let o of e){let n=t[t.length-1];if(n&&o.kind==="text"&&n.kind==="text"){t[t.length-1]={kind:"text",text:n.text+o.text};continue}if(n&&o.kind==="code"&&n.kind==="code"){t[t.length-1]={kind:"code",text:n.text+o.text};continue}if(n&&(o.kind==="bold"||o.kind==="italic"||o.kind==="strike")&&n.kind===o.kind){t[t.length-1]={kind:o.kind,children:on([...n.children,...o.children])};continue}if(n&&o.kind==="link"&&n.kind==="link"&&n.href===o.href){t[t.length-1]={kind:"link",href:o.href,children:on([...n.children,...o.children])};continue}t.push(o)}return t}function Hv(e,t,o,n,r){if(o>=n)return e;let a=Lo(e,t);if(!a)return e;let{block:i}=a;if(!("inline"in i))return e;let s=Le(i.inline,0,o),l=Le(i.inline,o,n),c=Le(i.inline,n,1/0),d=kL(l,r),p;d?p=IL(l,r):p=EL(l,r);let u=Le([...s,...p,...c],0,1/0);return Mr(e,t,u)}function kL(e,t){return e.length===0?!1:e.every(o=>wL(o,t))}function wL(e,t){return t==="code"?e.kind==="code":e.kind===t}function EL(e,t){if(t==="code"){let o=It(e);return o?[{kind:"code",text:o}]:[]}return e.length===0?[]:[{kind:t,children:e}]}function IL(e,t){let o=[];for(let n of e){if(t==="code"&&n.kind==="code"){o.push({kind:"text",text:n.text});continue}if(n.kind===t&&(n.kind==="bold"||n.kind==="italic"||n.kind==="strike")){o.push(...n.children);continue}o.push(n)}return Fv(o)}function Fv(e){let t=[];for(let o of e){let n=t[t.length-1];o.kind==="text"&&n&&n.kind==="text"?t[t.length-1]={kind:"text",text:n.text+o.text}:t.push(o)}return t}function Uv(e,t,o,n,r){if(o>=n)return e;let a=Lo(e,t);if(!a)return e;let{block:i}=a;if(!("inline"in i))return e;let s=Le(i.inline,0,o),l=Lu(Le(i.inline,o,n)),c=Le(i.inline,n,1/0),d=r&&l.length>0?[{kind:"link",href:r,children:l}]:l,p=Le([...s,...d,...c],0,1/0);return Mr(e,t,p)}function Lu(e){let t=[];for(let o of e){if(o.kind==="link"){t.push(...Lu(o.children));continue}if(o.kind==="bold"||o.kind==="italic"||o.kind==="strike"){t.push({kind:o.kind,children:Lu(o.children)});continue}t.push(o)}return Fv(t)}function zv(e,t,o,n){if(!n)return e;let r=Lo(e,t);if(!r)return e;let{block:a}=r;if(!("inline"in a))return e;let i=Le(a.inline,0,o),s=Le(a.inline,o,1/0),l={kind:"link",href:n,children:[{kind:"text",text:n}]},c=Le([...i,l,...s],0,1/0);return{...Mr(e,t,c),selection:{kind:"caret",blockId:t,offset:o+n.length}}}function Va(e,t,o,n,r){let a=Lo(e,t);if(!a)return e;let{block:i}=a;if(!("inline"in i))return e;let s=Le(i.inline,0,o),l=Le(i.inline,o,1/0),c=r?{kind:"pagelink",pageId:n,alias:r}:{kind:"pagelink",pageId:n},d=[...s,c,...l],p=Mr(e,t,d),u=(r||n).length;return{...p,selection:{kind:"caret",blockId:t,offset:o+u}}}function jv(e,t,o){let n=lo(e,t);if(!n)return e;let r=e.blocks.slice(),[a]=r.splice(n.idx,1),i=Math.max(0,Math.min(o,r.length));return r.splice(i,0,a),{...e,blocks:r}}function Ya(e,t,o){let n=lo(e,t);return n?{...Ov(e,n.idx+1,o),selection:{kind:"caret",blockId:o.id,offset:0}}:{blocks:[...e.blocks,o],selection:{kind:"caret",blockId:o.id,offset:0}}}function nt(e=""){return{id:Q(),kind:"p",inline:Pb(e)}}function Ms(e="",t=""){return{id:Q(),kind:"code",text:e,lang:t}}function Ps(){return{id:Q(),kind:"rule"}}function Cs(e="\u{1F4A1}",t=[nt("")]){return{id:Q(),kind:"callout",emoji:e,children:t}}function As(e=[[nt("")]]){return{id:Q(),kind:"list",ordered:!1,items:e}}function Bs(e=[[nt("")]]){return{id:Q(),kind:"list",ordered:!0,items:e}}function Wa(e,t,o){let n=e.slice();return n[t]=o,n}function qv(e,t){let o=Su(e.blocks,t);return o?{...e,blocks:o}:e}function Su(e,t){for(let o=0;o<e.length;o++){let n=e[o];if(n.kind==="list")for(let r=0;r<n.items.length;r++){let a=Su(n.items[r],t);if(a)return Wa(e,o,{...n,items:$v(n.items,r,a)});if(n.items[r].some(i=>i.id===t))return r===0?null:Wa(e,o,TL(n,r))}else if(n.kind==="quote"||n.kind==="callout"){let r=Su(n.children,t);if(r)return Wa(e,o,{...n,children:r})}}return null}function TL(e,t){let o=e.items.slice(),n=o[t],r=o[t-1].slice(),a=r[r.length-1];return a&&a.kind==="list"&&a.ordered===e.ordered?r[r.length-1]={...a,items:[...a.items,n]}:r.push({id:Q(),kind:"list",ordered:e.ordered,items:[n]}),o[t-1]=r,o.splice(t,1),{...e,items:o}}function Zc(e,t){let o=Mu(e.blocks,t);return o?{...e,blocks:o}:e}function Mu(e,t){for(let o=0;o<e.length;o++){let n=e[o];if(n.kind==="list")for(let r=0;r<n.items.length;r++){let a=n.items[r];for(let s=0;s<a.length;s++){let l=a[s];if(l.kind==="list"){let c=l.items.findIndex(d=>d.some(p=>p.id===t));if(c>=0)return Wa(e,o,LL(n,r,s,l,c))}}let i=Mu(a,t);if(i)return Wa(e,o,{...n,items:$v(n.items,r,i)})}else if(n.kind==="quote"||n.kind==="callout"){let r=Mu(n.children,t);if(r)return Wa(e,o,{...n,children:r})}}return null}function LL(e,t,o,n,r){let a=n.items[r],i=n.items.slice();i.splice(r,1);let s=e.items[t].slice();i.length===0?s.splice(o,1):s[o]={...n,items:i};let l=e.items.slice();return l[t]=s,l.splice(t+1,0,a),{...e,items:l}}function $v(e,t,o){let n=e.slice();return n[t]=o,n}function Ds(e=[nt("")]){return{id:Q(),kind:"quote",children:e}}function Kv(e,t=""){return{id:Q(),kind:"image",src:e,alt:t}}function Wv(e){return{id:Q(),kind:"email",...e}}function SL(e){if("inline"in e&&Array.isArray(e.inline))return e.inline;if(e.kind==="quote"||e.kind==="callout"){let t=e.children?.[0];if(t&&"inline"in t)return t.inline}if(e.kind==="list"){let t=e.items?.[0]?.[0];if(t&&"inline"in t)return t.inline}return e.kind==="code"?e.text?[{kind:"text",text:e.text}]:[]:[]}function Xc(e){return{id:Q(),kind:"p",inline:e}}function ML(e){return e.kind==="list"?e.items[0]?.[0]?.id??null:e.kind==="callout"||e.kind==="quote"?e.children[0]?.id??null:"inline"in e||e.kind==="code"?e.id:null}function Gv(e,t,o){let n=e.blocks.findIndex(c=>c.id===t);if(n<0)return e;let r=e.blocks[n];if((o==="p"||o==="h1"||o==="h2"||o==="h3"||o==="todo")&&"inline"in r)return rn(e,t,o);let a=SL(r),i;switch(o){case"p":i={id:Q(),kind:"p",inline:a};break;case"h1":case"h2":case"h3":i={id:Q(),kind:o,inline:a};break;case"todo":i={id:Q(),kind:"todo",checked:!1,inline:a};break;case"ul":i=As([[Xc(a)]]);break;case"ol":i=Bs([[Xc(a)]]);break;case"quote":i=Ds([Xc(a)]);break;case"callout":i=Cs("\u{1F4A1}",[Xc(a)]);break;case"pre":i=Ms(It(a));break;case"hr":i=Ps();break}let s=e.blocks.slice();s[n]=i;let l=ML(i);return{...e,blocks:s,selection:l?{kind:"caret",blockId:l,offset:0}:e.selection}}function _s(e,t,o){let n=lo(e,t);if(!n||n.block.kind!=="table")return e;let r=n.block,a=r.rows[0]?.length||0,i=[];for(let l=0;l<a;l++)i.push([]);let s=r.rows.slice();return s.splice(Math.max(0,Math.min(o,s.length)),0,i),nn(e,n.idx,{...r,rows:s})}function Qc(e,t,o){let n=lo(e,t);if(!n||n.block.kind!=="table")return e;let r=n.block,a=r.rows[0]?.length||0,i=Math.max(0,Math.min(o,a)),s=r.rows.map(l=>{let c=l.slice();return c.splice(i,0,[]),c});return nn(e,n.idx,{...r,rows:s})}function Bu(e,t,o){let n=lo(e,t);if(!n||n.block.kind!=="table")return e;let r=n.block;if(r.rows.length<=1||o<0||o>=r.rows.length)return e;let a=r.rows.slice();return a.splice(o,1),nn(e,n.idx,{...r,rows:a})}function Du(e,t,o){let n=lo(e,t);if(!n||n.block.kind!=="table")return e;let r=n.block,a=r.rows[0]?.length||0;if(a<=1||o<0||o>=a)return e;let i=r.rows.map(s=>{let l=s.slice();return l.splice(o,1),l});return nn(e,n.idx,{...r,rows:i})}function Vv(e,t,o,n,r){let a=lo(e,t);if(!a||a.block.kind!=="table")return e;let i=a.block;if(o<0||o>=i.rows.length)return e;let s=i.rows[o];if(n<0||n>=s.length)return e;let l=s.slice();l[n]=r;let c=i.rows.slice();return c[o]=l,nn(e,a.idx,{...i,rows:c})}function _u(e){let t=e.rows.length,o=e.rows[0]?.length||0,n=[];for(let r=0;r<t;r++){let a=[];for(let i=0;i<o;i++)a.push(e.cellBg?.[r]?.[i]||"");n.push(a)}return n}function Yv(e,t,o,n,r){let a=lo(e,t);if(!a||a.block.kind!=="table")return e;let i=a.block;if(o<0||o>=i.rows.length||n<0||n>=(i.rows[0]?.length||0))return e;let s=_u(i);return s[o][n]=r,nn(e,a.idx,{...i,cellBg:s})}function Xv(e,t,o,n){let r=lo(e,t);if(!r||r.block.kind!=="table")return e;let a=r.block;if(o<0||o>=a.rows.length)return e;let i=_u(a);for(let s=0;s<i[o].length;s++)i[o][s]=n;return nn(e,r.idx,{...a,cellBg:i})}function Jv(e,t,o,n){let r=lo(e,t);if(!r||r.block.kind!=="table")return e;let a=r.block;if(o<0||o>=(a.rows[0]?.length||0))return e;let i=_u(a);for(let s=0;s<i.length;s++)i[s][o]=n;return nn(e,r.idx,{...a,cellBg:i})}function Zv(e=2,t=3){let o=[];for(let n=0;n<e;n++){let r=[];for(let a=0;a<t;a++)r.push([]);o.push(r)}return{id:Q(),kind:"table",hrow:!0,hcol:!1,rows:o}}function Qv(e){return{id:Q(),kind:"linkdb",dbId:e,view:"table",filter:"",sort:""}}var Nv,So=L(()=>{"use strict";Vo();Nv={blocks:[],selection:null}});function PL(){let e=wa.get(),t=e?parseInt(e,10):os;return!isFinite(t)||t<0?os:t}function Ru(){Rs&&(clearTimeout(Rs),Rs=null)}function CL(e){switch(e.kind){case"dirty":{Ru();let t=PL();if(t<=0)return;Rs=setTimeout(()=>{Rs=null,re.save().catch(()=>{})},t);return}case"idle":case"unloaded":case"saving":case"conflict":case"merging":Ru();return}}function ty(){ey||(ey=!0,re.subscribe(CL))}function oy(){Ru()}var Rs,ey,Nu=L(()=>{"use strict";ft();He();ve();Rs=null;ey=!1});var qu={};q(qu,{applyColOrder:()=>Hu,applyRowOrder:()=>od,loadColOrder:()=>ed,loadGanttConfig:()=>Uu,loadRowOrder:()=>td,moveItem:()=>ju,saveColOrder:()=>Ou,saveGanttConfig:()=>zu,saveRowOrder:()=>Fu});function ed(e){let t=pc(e).get();return t.length===0?null:t}function Ou(e,t){pc(e).set(t)}function Hu(e,t){let o=ed(t);if(!o||o.length===0)return e;let n=new Map(e.map(a=>[a.InternalName,a])),r=[];for(let a of o){let i=n.get(a);i&&(r.push(i),n.delete(a))}for(let a of n.values())r.push(a);return r}function td(e){let t=uc(e).get();return t.length===0?null:t}function Fu(e,t){uc(e).set(t)}function od(e,t){let o=td(t);if(!o||o.length===0)return e;let n=new Map(e.map(a=>[a.Id,a])),r=[];for(let a of o){let i=n.get(a);i&&(r.push(i),n.delete(a))}for(let a of n.values())r.push(a);return r}function Uu(e){return fc(e,null).get()}function zu(e,t){fc(e,t).set(t)}function ju(e,t,o){if(t===o||t<0||t>=e.length)return e.slice();let n=e.slice(),[r]=n.splice(t,1),a=o>t?o-1:o;return n.splice(a,0,r),n}var Ns=L(()=>{"use strict";ve()});function ny(e){return lr.get()[e]||{}}function ry(e,t){let o=lr.get(),n={rows:{...o[e]?.rows||{}},cols:{...o[e]?.cols||{}}};t(n),o[e]=n,lr.set(o)}function ay(e,t,o){ry(e,n=>{o?n.rows[String(t)]=o:delete n.rows[String(t)]})}function iy(e,t,o){ry(e,n=>{o?n.cols[t]=o:delete n.cols[t]})}function sy(e,t,o){return e.cols?.[o]||e.rows?.[String(t)]||""}function ly(e,t){let o=lr.get(),n=o[e];if(!n?.rows)return;let r=new Set(t.map(String)),a=!1;for(let i of Object.keys(n.rows))r.has(i)||(delete n.rows[i],a=!0);a&&lr.set(o)}function nd(e,t,o){document.getElementById("memola-dbcolor-pop")?.remove();let n=document.createElement("div");n.id="memola-dbcolor-pop",n.className="memola-dbcolor-pop",n.style.left=e+window.scrollX+"px",n.style.top=t+window.scrollY+"px";for(let a of AL){let i=document.createElement("button");i.className="memola-dbcolor-sw"+(a.value?"":" none"),i.title=a.label,a.value&&(i.style.background=a.value),i.addEventListener("mousedown",s=>{s.preventDefault(),s.stopPropagation(),o(a.value),n.remove()}),n.appendChild(i)}(document.getElementById("memola-overlay")||document.body).appendChild(n);let r=a=>{n.contains(a.target)||(n.remove(),document.removeEventListener("mousedown",r,!0))};setTimeout(()=>document.addEventListener("mousedown",r,!0),0)}var AL,$u=L(()=>{"use strict";ve();AL=[{label:"\u306A\u3057",value:""},{label:"\u30B0\u30EC\u30FC",value:"#f1f1ef"},{label:"\u8D64",value:"#fdebec"},{label:"\u30AA\u30EC\u30F3\u30B8",value:"#fbecdd"},{label:"\u9EC4",value:"#fbf3db"},{label:"\u7DD1",value:"#ddedea"},{label:"\u9752",value:"#ddebf1"},{label:"\u7D2B",value:"#eae4f2"},{label:"\u30D4\u30F3\u30AF",value:"#f4dfeb"}]});var rd={};q(rd,{hideBulkBar:()=>OL,renderBulkBar:()=>Dn});function BL(){if(Ar&&document.body.contains(Ar))return Ar;let e=document.getElementById("memola-overlay")||document.body,t=document.createElement("div");return t.id="memola-db-bulkbar",t.className="memola-db-bulkbar",t.innerHTML='<span class="memola-db-bulkbar-count">0 \u4EF6\u9078\u629E</span><button class="memola-db-bulkbar-btn" data-act="color">\u8272</button><button class="memola-db-bulkbar-btn" data-act="dup">\u8907\u88FD</button><button class="memola-db-bulkbar-btn danger" data-act="del">\u524A\u9664</button><button class="memola-db-bulkbar-btn ghost" data-act="clr">\u89E3\u9664</button>',e.appendChild(t),t.addEventListener("click",DL),Ar=t,t}function DL(e){let t=e.target,o=t.dataset?.act;if(o){if(o==="clr"){m.dbSelected.clear(),Dn(),Ne();return}if(o==="del")_L();else if(o==="dup")RL();else if(o==="color"){let n=Array.from(m.dbSelected);if(n.length===0)return;let r=t.getBoundingClientRect();nd(r.left,r.bottom+4,a=>{for(let i of n)ay(m.dbList,i,a);Ne()})}}}async function _L(){let e=Array.from(m.dbSelected);if(e.length!==0&&confirm(`${e.length} \u4EF6\u306E\u884C\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F`)){R(!0,"\u524A\u9664\u4E2D...");try{for(let t of e)await Br(m.dbList,t).catch(o=>{w("\u524A\u9664\u5931\u6557 (id="+t+"): "+o.message,"err")});m.dbSelected.clear(),Dn(),Ne(),w(`${e.length} \u4EF6\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u2318Z \u3067\u5FA9\u5143\u53EF\u80FD\uFF09`)}finally{R(!1)}}}async function RL(){let e=Array.from(m.dbSelected);if(e.length!==0){R(!0,"\u8907\u88FD\u4E2D...");try{let{getListFields:t}=await Promise.resolve().then(()=>(Re(),Go)),o=await t(m.dbList),n=new Set(o.map(s=>s.InternalName)),r=0,a=[],{getRowBody:i}=await Promise.resolve().then(()=>(K(),je));for(let s of e){let l=m.dbItems.find(d=>d.Id===s);if(!l)continue;let c={};for(let d of Object.keys(l)){if(!n.has(d))continue;let p=l[d];p!=null&&typeof p!="object"&&(typeof p=="string"&&p.trim()===""||(c[d]=p))}c.Title||(c.Title=l.Title||"\u7121\u984C");try{let d=await i(m.dbList,s).catch(()=>""),p=await Hs(m.dbList,c,d||void 0);m.dbItems.push(p),r++}catch(d){a.push(`id=${s}: ${d.message}`)}}m.dbSelected.clear(),Dn(),Ne(),a.length===0?w(`${r} \u4EF6\u8907\u88FD\u3057\u307E\u3057\u305F`):r===0?w("\u8907\u88FD\u5931\u6557: "+a[0],"err"):w(`${r} \u4EF6\u6210\u529F / ${a.length} \u4EF6\u5931\u6557 (${a[0]})`,"err"),a.length>0&&console.warn("[Memola duplicate errors]",a)}finally{R(!1)}}}function Cr(){let e=Ar;if(!e||!e.classList.contains("on"))return;let t=document.getElementById("memola-db-tb");if(!t)return;let o=t.getBoundingClientRect(),n=e.offsetHeight||44;e.style.top=Math.max(8,o.top-n-8)+"px",e.style.left=o.left+o.width/2+"px"}function Ku(e){if(m.dbSelected.size===0)return;let t=e.target;t&&(t.closest(".memola-db-bulkbar")||t.closest(".memola-cb")||t.closest("#memola-row-handle")||e.shiftKey||NL())}function NL(){m.dbSelected.clear(),document.querySelectorAll(".memola-card-sel, .memola-tr-sel").forEach(t=>{t.classList.remove("memola-card-sel","memola-tr-sel")}),document.querySelectorAll("#memola-dt .memola-cb").forEach(t=>{t.checked=!1,t.indeterminate=!1});let e=document.getElementById("memola-dt");e&&e.classList.remove("memola-has-sel"),Dn()}function Dn(){let e=BL(),t=m.dbSelected.size,o=e.querySelector(".memola-db-bulkbar-count");o&&(o.textContent=t+" \u4EF6\u9078\u629E");let n=t>0&&m.currentType==="database";e.classList.toggle("on",n),n?(requestAnimationFrame(Cr),window.addEventListener("scroll",Cr,!0),window.addEventListener("resize",Cr),document.addEventListener("mousedown",Ku,!0)):(window.removeEventListener("scroll",Cr,!0),window.removeEventListener("resize",Cr),document.removeEventListener("mousedown",Ku,!0))}function OL(){Ar&&Ar.classList.remove("on"),window.removeEventListener("scroll",Cr,!0),window.removeEventListener("resize",Cr),document.removeEventListener("mousedown",Ku,!0)}var Ar,Os=L(()=>{"use strict";j();le();W();Mo();$u();Ar=null});var ad={};q(ad,{openItem:()=>GL,renderActiveView:()=>WL,renderCalendarView:()=>Ja,renderGalleryView:()=>fy,renderGanttView:()=>Gu,renderListView:()=>uy});function Us(e,t){let o=e[t];return o==null?"":String(o)}function my(e,t,o,n){if(!_n())return;let r=n||e;r.draggable=!0;let a="text/memola-row";r.addEventListener("dragstart",i=>{if(!i.dataTransfer)return;i.dataTransfer.effectAllowed="move",i.dataTransfer.setData(a,String(t.Id));let s=m.dbSelected.has(t.Id)?Array.from(m.dbSelected):[t.Id];document.querySelectorAll("[data-id]").forEach(l=>{let c=parseInt(l.dataset.id||"0",10);s.indexOf(c)>=0&&l.classList.add("memola-item-dragging")})}),r.addEventListener("dragend",()=>{document.querySelectorAll(".memola-item-dragging").forEach(i=>i.classList.remove("memola-item-dragging"))}),e.addEventListener("dragover",i=>{let s=i.dataTransfer;if(!s)return;i.preventDefault(),s.dropEffect="move";let l=e.getBoundingClientRect(),c=o==="y"?i.clientY>l.top+l.height/2:i.clientX>l.left+l.width/2;e.classList.toggle("memola-item-drop-before",!c),e.classList.toggle("memola-item-drop-after",c)}),e.addEventListener("dragleave",()=>{e.classList.remove("memola-item-drop-before","memola-item-drop-after")}),e.addEventListener("drop",i=>{let s=i.dataTransfer;if(!s)return;let l=s.getData(a);if(!l)return;i.preventDefault();let c=e.getBoundingClientRect(),d=o==="y"?i.clientY>c.top+c.height/2:i.clientX>c.left+c.width/2;e.classList.remove("memola-item-drop-before","memola-item-drop-after");let p=parseInt(l,10),u=m.dbSelected.has(p)?Array.from(m.dbSelected):[p];u.indexOf(t.Id)>=0||Dr(u,t.Id,d)})}function py(e,t){let o=document.createElement("div");o.className="memola-rowctl";let n=document.createElement("span");n.className="memola-rowctl-handle",n.title="\u30C9\u30E9\u30C3\u30B0\u3057\u3066\u4E26\u3079\u66FF\u3048",n.innerHTML='<svg viewBox="0 0 10 16" width="10" height="16" fill="currentColor" style="pointer-events:none"><circle cx="2" cy="3" r="1.3"/><circle cx="2" cy="8" r="1.3"/><circle cx="2" cy="13" r="1.3"/><circle cx="8" cy="3" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="8" cy="13" r="1.3"/></svg>';let r=document.createElement("input");return r.type="checkbox",r.className="memola-cb",r.checked=m.dbSelected.has(e.Id),r.addEventListener("click",a=>a.stopPropagation()),r.addEventListener("change",()=>{r.checked?m.dbSelected.add(e.Id):m.dbSelected.delete(e.Id),Promise.resolve().then(()=>(Os(),rd)).then(a=>a.renderBulkBar()),t?.()}),o.appendChild(n),o.appendChild(r),o}function uy(){let e=E("list-view");e.innerHTML="",m.dbSelected.size>0?e.classList.add("memola-has-sel"):e.classList.remove("memola-has-sel");let t=m.dbFields.filter(o=>[2,4,6,8,9].includes(o.FieldTypeKind)).slice(0,4);Vt().forEach(o=>{let n=document.createElement("div");n.className="memola-lv-row",n.dataset.id=String(o.Id);let r=py(o,()=>{n.classList.toggle("memola-card-sel",m.dbSelected.has(o.Id)),m.dbSelected.size>0?e.classList.add("memola-has-sel"):e.classList.remove("memola-has-sel")});n.appendChild(r);let a=document.createElement("div");a.className="memola-lv-body";let i=document.createElement("div");i.className="memola-lv-title",i.textContent=o.Title||"(\u7121\u984C)",a.appendChild(i);let s=document.createElement("div");s.className="memola-lv-sub",s.innerHTML=t.filter(c=>c.InternalName!=="Title").map(c=>'<span class="memola-lv-field">'+M(c.Title)+": "+M(Us(o,c.InternalName))+"</span>").join(""),a.appendChild(s),n.appendChild(a),n.appendChild(Po(o)),m.dbSelected.has(o.Id)&&n.classList.add("memola-card-sel"),Rn(n,o.Id);let l=r.querySelector(".memola-rowctl-handle")||void 0;my(n,o,"y",l),e.appendChild(n)})}function fy(){let e=E("gallery-view");e.innerHTML="";let t=m.dbFields.filter(o=>[2,4,6,8,9].includes(o.FieldTypeKind));Vt().forEach(o=>{let n=document.createElement("div");n.className="memola-gv-card",m.dbSelected.has(o.Id)&&n.classList.add("memola-card-sel"),n.dataset.id=String(o.Id),n.draggable=_n(),n.innerHTML='<div class="memola-gv-cover">'+(o.Title||"?").slice(0,1)+'</div><div class="memola-gv-title">'+M(o.Title||"(\u7121\u984C)")+'</div><div class="memola-gv-meta">'+t.filter(r=>r.InternalName!=="Title").slice(0,3).map(r=>'<div class="memola-gv-prop">'+M(r.Title)+": "+M(Us(o,r.InternalName))+"</div>").join("")+"</div>",n.appendChild(Po(o)),Rn(n,o.Id),zs(n,o.Id),e.appendChild(n)}),_n()&&HL(e)}function HL(e){if(e.dataset.dropWired==="1")return;e.dataset.dropWired="1";function t(o,n){let r=Array.from(e.querySelectorAll(".memola-gv-card"));if(r.length===0)return null;let a=r[0],i=1/0;for(let c of r){let d=c.getBoundingClientRect(),p=n>=d.top&&n<=d.bottom,u=Math.abs(o-(d.left+d.width/2)),f=(p?0:1e6)+u;f<i&&(i=f,a=c)}let s=a.getBoundingClientRect(),l=o>s.left+s.width/2;return{card:a,placeAfter:l}}e.addEventListener("dragover",o=>{let n=o.dataTransfer;if(!n)return;o.preventDefault(),n.dropEffect="move";let r=t(o.clientX,o.clientY);if(!r){Fs();return}UL(r.card,r.placeAfter)}),e.addEventListener("dragleave",o=>{let n=o.relatedTarget;(!n||!e.contains(n))&&Fs()}),e.addEventListener("drop",o=>{let n=o.dataTransfer;if(!n){Fs();return}let r=n.getData("text/memola-kb")||n.getData("text/plain");if(!r){Fs();return}o.preventDefault(),Fs();let a=parseInt(r,10);if(!a)return;let i=m.dbSelected.has(a)?Array.from(m.dbSelected):[a],s=t(o.clientX,o.clientY);if(!s)return;let l=parseInt(s.card.dataset.id||"0",10);!l||i.indexOf(l)>=0||Dr(i,l,s.placeAfter)})}function FL(){let e=document.getElementById("memola-overlay")||document.body;if(Xa&&e.contains(Xa))return Xa;let t=document.createElement("div");return t.className="memola-card-drop-line vertical",e.appendChild(t),Xa=t,t}function UL(e,t){let o=e.getBoundingClientRect(),n=FL();n.style.top=o.top+"px",n.style.height=o.height+"px",n.style.left=(t?o.right:o.left)-1+"px",n.style.width="2px",n.classList.add("on")}function Fs(){Xa&&Xa.classList.remove("on"),document.querySelectorAll(".memola-card-drop-line").forEach(e=>{e.classList.remove("on")})}function zL(e){return gc(e).get()||null}function jL(e,t){gc(e).set(t)}function dy(e){return e<10?"0"+e:String(e)}function Wu(e){return e.getFullYear()+"-"+dy(e.getMonth()+1)+"-"+dy(e.getDate())}function Ja(){let e=E("calendar-view");e.innerHTML="";let t=m.dbFields.filter(I=>I.FieldTypeKind===4);if(t.length===0){e.innerHTML='<div class="memola-altview-empty">\u65E5\u4ED8\u5217\u304C\u3042\u308A\u307E\u305B\u3093</div>';return}cy!==m.dbList&&(cy=m.dbList,Ft=null,an=null);let o=new Date;(Ft==null||an==null)&&(Ft=o.getFullYear(),an=o.getMonth());let n=zL(m.dbList),r=n&&t.find(I=>I.InternalName===n)||t[0],a=Ft,i=an,s=new Date(a,i,1),l=new Date(a,i+1,0),c=s.getDay(),d=l.getDate(),p={};Vt().forEach(I=>{var P;let B=Us(I,r.InternalName);if(!B)return;let F=new Date(B);isNaN(F.getTime())||(p[P=Wu(F)]||(p[P]=[])).push(I)});let u=document.createElement("div");u.className="memola-cal";let f=document.createElement("div");f.className="memola-cal-head";let g=document.createElement("div");g.className="memola-cal-nav";let y=(I,B,F)=>{let P=document.createElement("button");return P.type="button",P.className="memola-cal-nav-btn",P.textContent=I,P.title=B,P.addEventListener("click",()=>{F(),Ja()}),P};g.appendChild(y("\xAB","\u524D\u5E74",()=>{Ft=(Ft??o.getFullYear())-1})),g.appendChild(y("\u2039","\u524D\u6708",()=>{let I=Ft??o.getFullYear(),B=(an??o.getMonth())-1;B<0&&(B=11,I--),Ft=I,an=B})),g.appendChild(y("\u4ECA\u65E5","\u4ECA\u65E5\u306B\u623B\u308B",()=>{Ft=o.getFullYear(),an=o.getMonth()})),g.appendChild(y("\u203A","\u7FCC\u6708",()=>{let I=Ft??o.getFullYear(),B=(an??o.getMonth())+1;B>11&&(B=0,I++),Ft=I,an=B})),g.appendChild(y("\xBB","\u7FCC\u5E74",()=>{Ft=(Ft??o.getFullYear())+1})),f.appendChild(g);let b=document.createElement("div");b.className="memola-cal-title",b.textContent=a+"\u5E74 "+(i+1)+"\u6708",f.appendChild(b);let h=document.createElement("div");if(h.className="memola-cal-dfbox",t.length>1){let I=document.createElement("span");I.textContent="\u65E5\u4ED8\u5217",h.appendChild(I);let B=document.createElement("select");B.className="memola-cal-dfsel";for(let F of t){let P=document.createElement("option");P.value=F.InternalName,P.textContent=F.Title,F.InternalName===r.InternalName&&(P.selected=!0),B.appendChild(P)}B.addEventListener("change",()=>{jL(m.dbList,B.value),Ja()}),h.appendChild(B)}else{let I=document.createElement("span");I.className="memola-cal-dfsingle",I.textContent="\u65E5\u4ED8\u5217: "+r.Title,h.appendChild(I)}f.appendChild(h),u.appendChild(f);let v=document.createElement("div");v.className="memola-cal-grid memola-cal-dayhead",["\u65E5","\u6708","\u706B","\u6C34","\u6728","\u91D1","\u571F"].forEach(I=>{let B=document.createElement("div");B.className="memola-cal-cell",B.textContent=I,v.appendChild(B)}),u.appendChild(v);let k=document.createElement("div");k.className="memola-cal-grid";for(let I=0;I<c;I++){let B=document.createElement("div");B.className="memola-cal-cell memola-cal-blank",k.appendChild(B)}for(let I=1;I<=d;I++){let B=new Date(a,i,I),F=document.createElement("div");F.className="memola-cal-cell memola-cal-day",F.dataset.date=Wu(B),a===o.getFullYear()&&i===o.getMonth()&&I===o.getDate()&&F.classList.add("today");let P=document.createElement("div");P.className="memola-cal-num",P.textContent=String(I),F.appendChild(P);let H=Wu(B);(p[H]||[]).forEach(D=>{let U=document.createElement("div");U.className="memola-cal-event",U.draggable=!0,U.dataset.id=String(D.Id),m.dbSelected.has(D.Id)&&U.classList.add("memola-card-sel");let Y=document.createElement("span");Y.className="memola-cal-event-title",Y.textContent=D.Title||"(\u7121\u984C)",U.appendChild(Y),U.appendChild(Po(D)),Rn(U,D.Id),qL(U,D.Id),F.appendChild(U)}),$L(F,r.InternalName),k.appendChild(F)}let T=(c+d)%7;if(T!==0)for(let I=0;I<7-T;I++){let B=document.createElement("div");B.className="memola-cal-cell memola-cal-blank",k.appendChild(B)}u.appendChild(k),e.appendChild(u)}function qL(e,t){e.addEventListener("dragstart",o=>{if(!o.dataTransfer)return;o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/memola-cal",String(t)),e.classList.add("memola-cal-event-dragging");let n=m.dbSelected.has(t)?Array.from(m.dbSelected):[t];document.querySelectorAll(".memola-cal-event[data-id]").forEach(r=>{let a=parseInt(r.dataset.id||"0",10);n.indexOf(a)>=0&&r.classList.add("memola-cal-event-dragging")})}),e.addEventListener("dragend",()=>{document.querySelectorAll(".memola-cal-event-dragging").forEach(o=>o.classList.remove("memola-cal-event-dragging")),document.querySelectorAll(".memola-cal-day-dropover").forEach(o=>o.classList.remove("memola-cal-day-dropover"))})}function $L(e,t){e.addEventListener("dragover",o=>{let n=o.dataTransfer;n&&(o.preventDefault(),n.dropEffect="move",e.classList.add("memola-cal-day-dropover"))}),e.addEventListener("dragleave",()=>{e.classList.remove("memola-cal-day-dropover")}),e.addEventListener("drop",o=>{let n=o.dataTransfer;if(!n)return;e.classList.remove("memola-cal-day-dropover");let r=n.getData("text/memola-cal")||n.getData("text/memola-kb")||n.getData("text/plain");if(!r)return;o.preventDefault();let a=parseInt(r,10);if(!a)return;let i=e.dataset.date||"";if(!i)return;let s=m.dbSelected.has(a)?Array.from(m.dbSelected):[a];KL(s,t,i)})}async function KL(e,t,o){let n=[],r=[];for(let a of e){let i=m.dbItems.find(c=>c.Id===a);if(!i)continue;let s=String(i[t]||"");if(s&&s.startsWith(o))continue;i[t]=o,n.push(()=>{i[t]=s});let l=m.dbFields.find(c=>c.InternalName===t);r.push(pt(m.dbList,a,{[t]:o}).then(()=>{l&&Gt(m.dbList,a,t,l.Title,s,o)}))}if(r.length!==0){Ja();try{await Promise.all(r)}catch(a){n.forEach(i=>i()),w("\u65E5\u4ED8\u66F4\u65B0\u5931\u6557: "+a.message,"err"),Ja()}}}function Gu(){let e=E("gantt-view");e.innerHTML="";let t=m.dbFields.filter(x=>x.FieldTypeKind===4);if(t.length===0){e.innerHTML='<div class="memola-altview-empty">\u65E5\u4ED8\u5217\u304C\u3042\u308A\u307E\u305B\u3093</div>';return}let o=Uu(m.dbList),n=o&&t.some(x=>x.InternalName===o.start)?o.start:t[0].InternalName,r=o?o.end&&t.some(x=>x.InternalName===o.end)?o.end:null:t[1]?.InternalName??null,a=document.createElement("div");a.className="memola-gantt-cfg",a.innerHTML="<span>\u958B\u59CB</span>";let i=document.createElement("select");i.className="memola-gantt-cfg-sel",t.forEach(x=>{let T=document.createElement("option");T.value=x.InternalName,T.textContent=x.Title,x.InternalName===n&&(T.selected=!0),i.appendChild(T)}),a.appendChild(i);let s=document.createElement("span");s.textContent="\u7D42\u4E86",a.appendChild(s);let l=document.createElement("select");l.className="memola-gantt-cfg-sel";let c=document.createElement("option");c.value="",c.textContent="(\u5358\u65E5\u30D0\u30FC)",l.appendChild(c),t.forEach(x=>{let T=document.createElement("option");T.value=x.InternalName,T.textContent=x.Title,x.InternalName===r&&(T.selected=!0),l.appendChild(T)}),r||(c.selected=!0),a.appendChild(l);function d(){let x={start:i.value,end:l.value||null};zu(m.dbList,x),Gu()}i.addEventListener("change",d),l.addEventListener("change",d),e.appendChild(a);let p=t.find(x=>x.InternalName===n)||t[0],u=r&&t.find(x=>x.InternalName===r)||p,f=m.dbItems.map(x=>{let T=Us(x,p.InternalName),I=Us(x,u.InternalName)||T;return T?{item:x,start:new Date(T),end:new Date(I)}:null}).filter(Boolean);if(f.length===0){let x=document.createElement("div");x.className="memola-altview-empty",x.textContent="\u65E5\u4ED8\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093",e.appendChild(x);return}let g=new Date(Math.min(...f.map(x=>x.start.getTime()))),y=new Date(Math.max(...f.map(x=>x.end.getTime()))),b=Math.max(1,Math.ceil((y.getTime()-g.getTime())/864e5)+1),h=28,v=document.createElement("div");v.className="memola-gantt";let k=document.createElement("div");k.className="memola-gantt-header",k.style.width=b*h+"px";for(let x=0;x<b;x++){let T=new Date(g.getTime()+x*864e5),I=document.createElement("div");I.className="memola-gantt-day",(T.getDay()===0||T.getDay()===6)&&I.classList.add("weekend"),I.textContent=String(T.getDate()),I.title=T.toLocaleDateString("ja-JP"),k.appendChild(I)}v.appendChild(k),m.dbSelected.size>0&&v.classList.add("memola-has-sel"),f.forEach(x=>{let T=document.createElement("div");T.className="memola-gantt-row",T.dataset.id=String(x.item.Id),m.dbSelected.has(x.item.Id)&&T.classList.add("memola-card-sel");let I=py(x.item,()=>{T.classList.toggle("memola-card-sel",m.dbSelected.has(x.item.Id)),m.dbSelected.size>0?v.classList.add("memola-has-sel"):v.classList.remove("memola-has-sel")});T.appendChild(I);let B=document.createElement("div");B.className="memola-gantt-label";let F=document.createElement("span");F.className="memola-gantt-label-text",F.textContent=x.item.Title||"(\u7121\u984C)",B.appendChild(F),B.appendChild(Po(x.item)),Rn(T,x.item.Id),T.appendChild(B);let P=document.createElement("div");P.className="memola-gantt-track",P.style.width=b*h+"px";let H=document.createElement("div"),D=Math.floor((x.start.getTime()-g.getTime())/864e5),U=Math.max(1,Math.ceil((x.end.getTime()-x.start.getTime())/864e5)+1);H.className="memola-gantt-bar",H.style.left=D*h+"px",H.style.width=U*h-2+"px",H.title=x.item.Title||"",P.appendChild(H),T.appendChild(P);let Y=I.querySelector(".memola-rowctl-handle")||void 0;my(T,x.item,"y",Y),v.appendChild(T)}),e.appendChild(v)}function WL(e){e==="list"?uy():e==="gallery"?fy():e==="calendar"?Ja():e==="gantt"&&Gu()}function GL(e){Fe(e)}var Xa,Ft,an,cy,id=L(()=>{"use strict";j();me();W();Ke();Mo();le();Ns();De();ve();Xa=null;Ft=null,an=null,cy=null});var sd={};q(sd,{addRowWithUndo:()=>Hs,canRedoDb:()=>JL,canUndoDb:()=>XL,clearDbHistory:()=>ZL,deleteRowWithUndo:()=>Br,recordCellChange:()=>Gt,recordColOrderChange:()=>Ju,recordDbCommand:()=>_r,recordRowFieldsUpdate:()=>Xu,recordRowOrderChange:()=>Yu,redoDb:()=>YL,undoDb:()=>VL});function js(e){let t=Vu.get(e);return t||(t={past:[],future:[]},Vu.set(e,t)),t}function _r(e,t){if(!e)return;let o=js(e);o.past.push(t),o.past.length>50&&o.past.shift(),o.future=[]}async function VL(e){let t=js(e),o=t.past.pop();if(!o)return null;try{return await o.undo(),t.future.push(o),o}catch(n){throw n}}async function YL(e){let t=js(e),o=t.future.pop();if(!o)return null;try{return await o.redo(),t.past.push(o),o}catch(n){throw n}}function XL(e){return js(e).past.length>0}function JL(e){return js(e).future.length>0}function ZL(e){Vu.delete(e)}async function sn(e){let{S:t}=await Promise.resolve().then(()=>(j(),qt));return t.currentType==="database"&&t.dbList===e}async function Nn(){(await Promise.resolve().then(()=>(W(),ce))).renderDbTable();let t=document.getElementById("list-view"),o=document.getElementById("gallery-view"),n=document.getElementById("calendar-view"),r=document.getElementById("gantt-view");if(t?.classList.contains("on")||o?.classList.contains("on")||n?.classList.contains("on")||r?.classList.contains("on")){let a=await Promise.resolve().then(()=>(id(),ad));t?.classList.contains("on")&&a.renderListView(),o?.classList.contains("on")&&a.renderGalleryView(),n?.classList.contains("on")&&a.renderCalendarView(),r?.classList.contains("on")&&a.renderGanttView()}}function Gt(e,t,o,n,r,a){let i=async s=>{let{apiUpdateDbRow:l}=await Promise.resolve().then(()=>(Ke(),Ht));if(await l(e,t,{[o]:s??""}),!await sn(e))return;let{S:c}=await Promise.resolve().then(()=>(j(),qt)),d=c.dbItems.find(p=>p.Id===t);d&&(d[o]=s),await Nn()};_r(e,{label:n+" \u5909\u66F4",undo:()=>i(r),redo:()=>i(a)})}function Yu(e,t,o){let n=async r=>{let{saveRowOrder:a}=await Promise.resolve().then(()=>(Ns(),qu));if(r===null){let{prefDbRowOrderLegacy:i}=await Promise.resolve().then(()=>(ve(),Ip));i(e).clear()}else a(e,r);await sn(e)&&await Nn()};_r(e,{label:"\u884C\u306E\u4E26\u3073\u66FF\u3048",undo:()=>n(t.length?t:null),redo:()=>n(o)})}async function QL(e,t){let{getListFields:o}=await Promise.resolve().then(()=>(Re(),Go)),n=await o(e),r=new Set(n.map(i=>i.InternalName)),a={};for(let i of Object.keys(t)){if(!r.has(i))continue;let s=t[i];s!=null&&typeof s!="object"&&(a[i]=s)}return!a.Title&&t.Title&&(a.Title=String(t.Title)),a}async function eS(e){let{S:t}=await Promise.resolve().then(()=>(j(),qt));return t.meta.pages.find(n=>n.list===e&&n.type==="database")?.id||""}async function Br(e,t){let{S:o}=await Promise.resolve().then(()=>(j(),qt)),{getListItemById:n}=await Promise.resolve().then(()=>(Re(),Go)),{apiTrashRow:r,apiRestoreRow:a}=await Promise.resolve().then(()=>(Ke(),Ht)),i=!1;if(o.dbList===e&&(i=!!o.dbItems.find(l=>l.Id===t)),i||(i=!!await n(e,t).catch(()=>null)),!i)return;await r(e,t),o.dbList===e&&(o.dbItems=o.dbItems.filter(l=>l.Id!==t));let s=t;_r(e,{label:"\u884C\u524A\u9664",undo:async()=>{if(await a(e,s),!await sn(e))return;let l=(await Promise.resolve().then(()=>(j(),qt))).S,c=await n(e,s).catch(()=>null);c&&!l.dbItems.find(d=>d.Id===s)&&l.dbItems.push(c),await Nn()},redo:async()=>{await r(e,s);let l=(await Promise.resolve().then(()=>(j(),qt))).S;l.dbList===e&&(l.dbItems=l.dbItems.filter(c=>c.Id!==s)),await Nn()}})}async function Hs(e,t,o){let{apiAddDbRow:n}=await Promise.resolve().then(()=>(Ke(),Ht)),{setRowBody:r,deleteRowEntry:a,getRowBody:i}=await Promise.resolve().then(()=>(K(),je)),{deleteListItem:s}=await Promise.resolve().then(()=>(Re(),Go)),l=await eS(e),c=await n(e,t);o&&await r(e,c.Id,l,String(t.Title||""),o);let d=c.Id,p={...c},u=o||"";return _r(e,{label:"\u884C\u8FFD\u52A0",undo:async()=>{if(await sn(e)){let y=(await Promise.resolve().then(()=>(j(),qt))).S.dbItems.find(b=>b.Id===d);y&&(p={...y})}if(u=await i(e,d).catch(()=>u),await s(e,d).catch(()=>{}),await a(e,d).catch(()=>{}),!await sn(e))return;let f=(await Promise.resolve().then(()=>(j(),qt))).S;f.dbItems=f.dbItems.filter(g=>g.Id!==d),await Nn()},redo:async()=>{let f=await QL(e,p),g=await n(e,f);if(d=g.Id,u&&await r(e,d,l,String(p.Title||""),u),!await sn(e))return;(await Promise.resolve().then(()=>(j(),qt))).S.dbItems.push(g),await Nn()}}),c}function Xu(e,t,o,n,r,a,i){let s=async(l,c)=>{let{apiUpdateDbRow:d}=await Promise.resolve().then(()=>(Ke(),Ht));Object.keys(l).length>0&&await d(e,t,l);let p="";if(await sn(e)){let f=(await Promise.resolve().then(()=>(j(),qt))).S.dbItems.find(g=>g.Id===t);f&&(p=String(f.Title||""))}if(c!==void 0){let{setRowBody:u}=await Promise.resolve().then(()=>(K(),je));await u(e,t,i,p,c)}if(await sn(e)){if(Object.keys(l).length>0){let f=(await Promise.resolve().then(()=>(j(),qt))).S.dbItems.find(g=>g.Id===t);if(f)for(let g of Object.keys(l))f[g]=l[g]}await Nn()}};_r(e,{label:"\u884C\u66F4\u65B0",undo:()=>s(o,r),redo:()=>s(n,a)})}function Ju(e,t,o){let n=async r=>{let{saveColOrder:a}=await Promise.resolve().then(()=>(Ns(),qu));if(r===null){let{prefDbColOrderLegacy:i}=await Promise.resolve().then(()=>(ve(),Ip));i(e).clear()}else a(e,r);await sn(e)&&await Nn()};_r(e,{label:"\u5217\u306E\u4E26\u3073\u66FF\u3048",undo:()=>n(t.length?t:null),redo:()=>n(o)})}var Vu,Mo=L(()=>{"use strict";Vu=new Map});function Zu(){Za&&(Za.remove(),Za=null),Qa&&(document.removeEventListener("mousedown",Qa,!0),Qa=null)}function gy(e,t,o,n){Zu();let r=bb();if(!r)return;let a=document.createElement("div");a.className="memola-choice-pop";for(let s of t){let l=document.createElement("div");l.className="memola-cp-item";let c=s.value===o;c&&l.classList.add("sel");let d=document.createElement("span");d.className="memola-cp-ic",d.textContent=c?"\u2713":s.icon||"";let p=document.createElement("span");if(p.className="memola-cp-label",p.textContent=s.label||"\u2014",s.label||p.classList.add("memola-cp-empty"),l.append(d,p),s.sub){let u=document.createElement("span");u.className="memola-cp-sub",u.textContent=s.sub,l.appendChild(u)}l.addEventListener("mousedown",u=>{u.preventDefault(),u.stopPropagation(),n(s.value),Zu()}),a.appendChild(l)}let i=e.getBoundingClientRect();a.style.top=i.bottom+4+"px",a.style.left=i.left+"px",a.style.minWidth=Math.max(180,i.width)+"px",r.appendChild(a),requestAnimationFrame(()=>{let s=a.getBoundingClientRect();if(s.bottom>window.innerHeight-8){let l=i.top-s.height-4;l>=8&&(a.style.top=l+"px")}s.right>window.innerWidth-8&&(a.style.left=window.innerWidth-s.width-8+"px")}),Za=a,Qa=s=>{Za&&(s.target instanceof Node&&Za.contains(s.target)||Zu())},setTimeout(()=>{Qa&&document.addEventListener("mousedown",Qa,!0)},0)}var Za,Qa,hy=L(()=>{"use strict";me();Za=null,Qa=null});async function On(e,t,o,n,r){let a=r[o.InternalName],i=a==null?"":String(a),s=n==null?"":String(n);if(i===s)return;let l=o.Title||o.InternalName;try{await pt(e,t,{[l]:n}),r[o.InternalName]=n,Gt(e,t,o.InternalName,o.Title,a,n)}catch(c){w("\u4FDD\u5B58\u5931\u6557: "+c.message,"err")}}function tS(e,t,o){let n=t[e.InternalName];switch(e.FieldTypeKind){case 4:{let r=document.createElement("div");r.className="memola-rp-date-wrap";let a=document.createElement("input");a.type="text",a.className="memola-rp-input memola-rp-date",a.placeholder="YYYY-MM-DD",a.value=bo(n);let i=document.createElement("input");i.type="date",i.className="memola-rp-date-pick",i.value=bo(n),i.tabIndex=-1,i.title="\u30AB\u30EC\u30F3\u30C0\u30FC\u304B\u3089\u9078\u629E",r.append(a,i);let s=l=>{a.classList.remove("memola-rp-invalid"),a.value=l,i.value=l,On(o,t.Id,e,l,t)};return a.addEventListener("blur",()=>{let l=a.value.trim();if(!l){a.classList.remove("memola-rp-invalid"),i.value="",On(o,t.Id,e,"",t);return}let c=bc(l);if(!c){a.classList.add("memola-rp-invalid"),w("\u65E5\u4ED8\u5F62\u5F0F\u304C\u7121\u52B9\u3067\u3059: "+l,"err");return}s(c)}),a.addEventListener("keydown",l=>{l.key==="Enter"&&(l.preventDefault(),a.blur()),l.key==="Escape"&&(a.value=bo(t[e.InternalName]),a.blur())}),i.addEventListener("change",()=>{i.value?s(i.value):(a.value="",On(o,t.Id,e,"",t))}),r}case 6:{let r=document.createElement("button");r.type="button",r.className="memola-rp-input memola-rp-choice";let a=e.Choices||[],i=()=>{let s=t[e.InternalName]||"";if(s){let l=a.indexOf(s);r.innerHTML='<span class="memola-select-chip memola-sc-'+(l>=0?l%6:0)+'">'+s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</span>"}else r.innerHTML='<span class="memola-rp-placeholder">\u2014</span>'};return i(),r.addEventListener("click",()=>{let s=t[e.InternalName]||"",l=[{value:"",label:"\u2014"},...a.map(c=>({value:c,label:c}))];gy(r,l,s,c=>{On(o,t.Id,e,c,t).then(i)})}),r}case 8:{let r=document.createElement("label");r.className="memola-rp-checkbox";let a=document.createElement("input");return a.type="checkbox",a.checked=n===!0||n==="true"||n===1||n==="1",a.addEventListener("change",()=>{On(o,t.Id,e,a.checked?"1":"0",t)}),r.appendChild(a),r}case 9:{let r=document.createElement("input");return r.type="number",r.className="memola-rp-input",r.value=n==null?"":String(n),r.addEventListener("blur",()=>{let a=r.value.trim()===""?"":Number(r.value);On(o,t.Id,e,a,t)}),r}case 3:{let r=document.createElement("textarea");return r.className="memola-rp-input memola-rp-multi",r.rows=2,r.value=n==null?"":String(n),r.addEventListener("blur",()=>{On(o,t.Id,e,r.value,t)}),r}default:{let r=document.createElement("input");return r.type="text",r.className="memola-rp-input",r.value=n==null?"":String(n),r.addEventListener("blur",()=>{On(o,t.Id,e,r.value,t)}),r}}}function by(e,t,o,n){e.innerHTML="";let r=t.filter(a=>a.InternalName!=="Title");if(r.length!==0)for(let a of r){let i=document.createElement("div");i.className="memola-rp-row";let s=document.createElement("div");s.className="memola-rp-label",s.textContent=a.Title;let l=document.createElement("div");l.className="memola-rp-value",l.appendChild(tS(a,o,n)),i.append(s,l),e.appendChild(i)}}var vy=L(()=>{"use strict";Ke();le();vo();Mo();hy()});function ld(e){let t=document.createElement("div");return t.id=e.id,t.draggable=!0,t.title=e.title,t.innerHTML=oS,t.addEventListener("dragstart",e.onDragStart),t.addEventListener("dragend",e.onDragEnd),e.onMouseLeave&&t.addEventListener("mouseleave",e.onMouseLeave),(e.container||document.getElementById("memola-overlay")||document.body).appendChild(t),{el:t,positionAt(n){let r=n.getBoundingClientRect();e.centred?(t.style.top=r.top+window.scrollY+(r.height-18)/2+"px",t.style.height="18px"):(t.style.top=r.top+window.scrollY+"px",t.style.height=Math.max(20,Math.min(r.height,32))+"px"),t.style.left=r.left+window.scrollX-24+"px",t.style.display="flex"},hide(){t.style.display="none"},isCursorOnHandle(n,r,a=2){if(t.style.display==="none")return!1;let i=t.getBoundingClientRect();return n>=i.left-a&&n<=i.right+a&&r>=i.top-a&&r<=i.bottom+a}}}function cd(e,t,o,n=44,r=2){let a=e.getBoundingClientRect();return o>=a.top-r&&o<=a.bottom+r&&t>=a.left-n&&t<=a.right}var oS,Qu=L(()=>{"use strict";oS='<svg viewBox="0 0 10 16" width="10" height="16" fill="currentColor" style="pointer-events:none"><circle cx="2" cy="3" r="1.3"/><circle cx="2" cy="8" r="1.3"/><circle cx="2" cy="13" r="1.3"/><circle cx="8" cy="3" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="8" cy="13" r="1.3"/></svg>'});var Ty={};q(Ty,{attachLibrary:()=>ef,openLibrary:()=>Iy});async function Iy(){m.currentType!=="database"&&await vt().catch(()=>{}),Un(),m.currentRow=null,m.currentId=null,m.currentType="page",md="",rt.clear(),oe(),of("library"),$s([{label:"\u{1F4DA} \u30E9\u30A4\u30D6\u30E9\u30EA"}]),et("library"),rS(),Co(),nS().then(()=>{m.currentId===null&&document.getElementById("memola-lib-tbody")&&Co()})}async function nS(){let e=[de],t=Kt();t!==de&&e.push(t);let o=new Map;for(let n of e){let r=J(n,"/items?$select=Id,Modified,Editor/Title&$expand=Editor&$top=500&$orderby=Id"),a=0;for(;r&&a++<20;){let i=await ne(r).catch(()=>null);if(!i)break;for(let s of i.results)o.set(vr(n,s.Id),{modified:s.Modified||"",editor:s.Editor?.Title||""});r=i.__next}}Ey=o}function yy(e){let t=n=>!n.IsDraft&&!A(n.Id)?.isTemplate&&(A(n.Id)?.scope==="org"?"org":"user")===qs,o=new Set(m.pages.filter(t).map(n=>n.Id));return m.pages.filter(n=>t(n)?(n.ParentId&&o.has(n.ParentId)?n.ParentId:"")===e:!1).sort((n,r)=>(n.Title||"\u7121\u984C").localeCompare(r.Title||"\u7121\u984C","ja"))}function rS(){let e=E("lib");e.innerHTML='<div class="memola-lib-inner"><div class="memola-lib-hd"><span class="memola-lib-icon">\u{1F4DA}</span><h1 class="memola-lib-title">\u30E9\u30A4\u30D6\u30E9\u30EA</h1></div><div class="memola-lib-tabs"><button class="memola-lib-tab" data-scope="user">\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8</button><button class="memola-lib-tab" data-scope="org">\u{1F310} \u7D44\u7E54</button></div><div class="memola-lib-tb"><input id="memola-lib-search" class="memola-lib-search" type="text" placeholder="\u30DA\u30FC\u30B8\u3092\u691C\u7D22\u2026" value="'+M(md)+'"><span class="memola-lib-count" id="memola-lib-count"></span></div><table class="memola-lib-table" id="memola-lib-dt"><thead><tr><th class="memola-th-cb"><input type="checkbox" class="memola-cb" id="memola-lib-cb-all" title="\u3059\u3079\u3066\u9078\u629E"></th><th>\u30BF\u30A4\u30C8\u30EB</th><th>\u7A2E\u5225</th><th>\u66F4\u65B0\u8005</th><th>\u66F4\u65B0\u65E5</th></tr></thead><tbody id="memola-lib-tbody"></tbody></table></div>',e.querySelectorAll(".memola-lib-tab").forEach(o=>{o.dataset.scope===qs&&o.classList.add("on"),o.addEventListener("click",()=>{qs=o.dataset.scope||"user",rt.clear(),e.querySelectorAll(".memola-lib-tab").forEach(n=>n.classList.toggle("on",n.dataset.scope===qs)),Co()})});let t=document.getElementById("memola-lib-search");t?.addEventListener("input",()=>{md=t.value,Co()}),document.getElementById("memola-lib-cb-all")?.addEventListener("change",o=>{let n=o.target.checked,r=Array.from(document.querySelectorAll("#memola-lib-tbody .memola-lib-row")).map(a=>a.dataset.pageId||"").filter(Boolean);n?r.forEach(a=>rt.add(a)):r.forEach(a=>rt.delete(a)),Co()})}function aS(e){if(!e)return"\u2014";let t=new Date(e);return isNaN(t.getTime())?"\u2014":t.toLocaleString("ja-JP",{year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"})}function Co(){let e=document.getElementById("memola-lib-tbody"),t=document.getElementById("memola-lib-count");if(!e)return;let o=md.trim().toLowerCase(),n=[],r=0;if(o)m.pages.filter(i=>!i.IsDraft&&!A(i.Id)?.isTemplate&&(A(i.Id)?.scope==="org"?"org":"user")===qs&&(i.Title||"\u7121\u984C").toLowerCase().includes(o)).sort((i,s)=>(i.Title||"\u7121\u984C").localeCompare(s.Title||"\u7121\u984C","ja")).forEach(i=>{n.push(ky(i,0,!1,!1)),r++});else{let a=(i,s)=>{for(let l of yy(i)){let d=yy(l.Id).length>0,p=dd.has(l.Id);n.push(ky(l,s,d,p)),r++,d&&p&&a(l.Id,s+1)}};a("",0)}t&&(t.textContent=r+" \u30DA\u30FC\u30B8"),e.innerHTML=r?n.join(""):'<tr><td colspan="5" class="memola-lib-empty">'+(o?"\u8A72\u5F53\u3059\u308B\u30DA\u30FC\u30B8\u304C\u3042\u308A\u307E\u305B\u3093":"\u3053\u306E\u30B9\u30B3\u30FC\u30D7\u306B\u30DA\u30FC\u30B8\u304C\u3042\u308A\u307E\u305B\u3093")+"</td></tr>",e.querySelectorAll(".memola-lib-tog").forEach(a=>{a.addEventListener("click",i=>{i.stopPropagation();let s=a.dataset.pageId||"";s&&(dd.has(s)?dd.delete(s):dd.add(s),Co())})}),e.querySelectorAll(".memola-cb").forEach(a=>{a.addEventListener("click",i=>i.stopPropagation()),a.addEventListener("change",()=>{let i=a.dataset.id||"";a.checked?rt.add(i):rt.delete(i);let s=a.closest(".memola-lib-row");s&&s.classList.toggle("memola-tr-sel",a.checked),xy()})}),e.querySelectorAll(".memola-lib-row").forEach(a=>{a.addEventListener("click",()=>{let i=a.dataset.pageId||"";i&&Fe(i)})}),xy()}function xy(){let e=document.getElementById("memola-lib-tbody"),t=document.getElementById("memola-lib-cb-all");if(e&&t){let o=Array.from(e.querySelectorAll(".memola-lib-row")).map(r=>r.dataset.pageId||"").filter(Boolean),n=o.filter(r=>rt.has(r)).length;t.checked=o.length>0&&n===o.length,t.indeterminate=n>0&&n<o.length}document.getElementById("memola-lib-dt")?.classList.toggle("memola-has-sel",rt.size>0),iS()}function ky(e,t,o,n){let a=A(e.Id)?.icon||(e.Type==="database"?"\u{1F5C2}":"\u{1F4C4}"),i=Ey.get(e.Id),s=o?'<span class="memola-lib-tog" data-page-id="'+M(e.Id)+'">'+(n?"\u25BE":"\u25B8")+"</span>":'<span class="memola-lib-tog-sp"></span>',l="padding-left:"+(8+t*18)+"px;",c=rt.has(e.Id);return'<tr class="memola-lib-row'+(c?" memola-tr-sel":"")+'" data-page-id="'+M(e.Id)+'"><td class="memola-td-cb"><input type="checkbox" class="memola-cb" data-id="'+M(e.Id)+'"'+(c?" checked":"")+'></td><td class="memola-lib-c-title" style="'+l+'">'+s+'<span class="memola-lib-c-ic">'+M(a)+'</span><a class="memola-lib-link">'+M(e.Title||"\u7121\u984C")+"</a></td><td>"+(e.Type==="database"?"\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9":"\u30DA\u30FC\u30B8")+'</td><td class="memola-lib-c-editor">'+M(i?.editor||"\u2014")+'</td><td class="memola-lib-c-date">'+M(i?aS(i.modified):"\u2026")+"</td></tr>"}function iS(){let e=document.getElementById("memola-lib-bulkbar"),t=rt.size;if(t===0){e&&e.classList.remove("on");return}e||(e=document.createElement("div"),e.id="memola-lib-bulkbar",e.className="memola-db-bulkbar",e.innerHTML='<span class="memola-db-bulkbar-count"></span><button class="memola-db-bulkbar-btn" data-act="dup">\u8907\u88FD</button><button class="memola-db-bulkbar-btn danger" data-act="del">\u524A\u9664</button><button class="memola-db-bulkbar-btn ghost" data-act="clr">\u89E3\u9664</button>',(document.getElementById("memola-overlay")||document.body).appendChild(e),e.addEventListener("click",n=>{let r=n.target.closest("[data-act]")?.dataset.act;r==="dup"?sS():r==="del"?lS():r==="clr"&&(rt.clear(),Co())}));let o=e.querySelector(".memola-db-bulkbar-count");o&&(o.textContent=t+" \u4EF6\u9078\u629E"),e.classList.add("on")}async function sS(){let e=Array.from(rt);if(e.length===0)return;R(!0,"\u8907\u88FD\u4E2D...");let t=0,o=[];try{let n=await Promise.resolve().then(()=>(K(),je)),r=await Promise.resolve().then(()=>(Ke(),Ht));for(let a of e){let i=A(a);try{i?.type==="database"?await r.duplicateDb(a,{asTemplate:!1}):await n.apiDuplicatePage(a),t++}catch(s){o.push(s.message)}}rt.clear(),oe(),Co(),t&&w(t+" \u4EF6\u8907\u88FD\u3057\u307E\u3057\u305F"),o.length&&w("\u4E00\u90E8\u8907\u88FD\u5931\u6557: "+o[0],"err")}finally{R(!1)}}async function lS(){let e=Array.from(rt);if(e.length===0||!confirm(e.length+" \u4EF6\u3092\u524A\u9664(\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5)\u3057\u307E\u3059\u304B?"))return;R(!0,"\u524A\u9664\u4E2D...");let t=0,o=[];try{let n=await Promise.resolve().then(()=>(K(),je));for(let r of e)try{await n.apiTrashPage(r),t++}catch(a){o.push(a.message)}rt.clear(),oe(),Co(),t&&w(t+" \u4EF6\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u30B4\u30DF\u7BB1\u304B\u3089\u5FA9\u5143\u53EF\u80FD\uFF09"),o.length&&w("\u4E00\u90E8\u524A\u9664\u5931\u6557: "+o[0],"err")}finally{R(!1)}}function cS(){let e=document.getElementById("memola-lib");return!!e&&getComputedStyle(e).display!=="none"}function dS(){return mo||(mo=ld({id:"memola-lib-row-handle",title:"\u30AF\u30EA\u30C3\u30AF\u3067\u9078\u629E",centred:!0,onDragStart:e=>e.preventDefault(),onDragEnd:()=>{},onMouseLeave:e=>{let t=e.relatedTarget;t&&Hn&&Hn.contains(t)||(mo?.hide(),Hn=null)}}),mo.el.addEventListener("click",()=>{let e=Hn?.dataset.pageId||"";e&&(rt.has(e)?rt.delete(e):rt.add(e),Co())}),mo)}function mS(){wy||(wy=!0,document.addEventListener("mousemove",e=>{if(!cS()){mo?.hide(),Hn=null;return}if(mo&&mo.isCursorOnHandle(e.clientX,e.clientY))return;let t=document.getElementById("memola-lib-tbody");if(!t){mo?.hide();return}let o=null;for(let n of Array.from(t.querySelectorAll(".memola-lib-row")))if(cd(n,e.clientX,e.clientY)){o=n;break}o?o!==Hn&&(Hn=o,dS().positionAt(o)):(mo?.hide(),Hn=null)}))}function ef(){document.getElementById("memola-sb-library")?.addEventListener("click",()=>{Iy()}),mS()}var md,qs,dd,rt,Ey,mo,Hn,wy,tf=L(()=>{"use strict";j();me();W();Be();Fn();Rr();gt();ye();De();le();K();Et();Qu();md="",qs="user",dd=new Set,rt=new Set,Ey=new Map;mo=null,Hn=null,wy=!1});var ei={};q(ei,{canGoBack:()=>rf,canGoForward:()=>af,goBack:()=>pS,goForward:()=>uS,pushHistory:()=>nf,pushViewHistory:()=>of,refreshButtons:()=>Nr});function Sy(e,t){return e.pageId===t.pageId&&(e.rowId||0)===(t.rowId||0)&&(e.rowList||"")===(t.rowList||"")&&(e.view||"")===(t.view||"")}function of(e){if(pd)return;let t={pageId:"",view:e};Xe>=0&&Sy(tt[Xe],t)||(Xe<tt.length-1&&tt.splice(Xe+1),tt.push(t),tt.length>Ly&&tt.shift(),Xe=tt.length-1,Nr())}function nf(e,t){if(pd||!e)return;let o=t?{pageId:e,rowList:t.rowList,rowId:t.rowId}:{pageId:e};Xe>=0&&Sy(tt[Xe],o)||(Xe<tt.length-1&&tt.splice(Xe+1),tt.push(o),tt.length>Ly&&tt.shift(),Xe=tt.length-1,Nr())}function rf(){return Xe>0&&sf(tt[Xe-1])}function af(){return Xe>=0&&Xe<tt.length-1&&sf(tt[Xe+1])}function sf(e){return e?e.view==="library"?!0:e.pageId?m.pages.some(t=>t.Id===e.pageId):!1:!1}async function My(e){let t=tt[e];if(!t||!sf(t)){tt.splice(e,1),Xe>e&&Xe--,Nr();return}Xe=e,pd=!0;try{if(t.view==="library")await(await Promise.resolve().then(()=>(tf(),Ty))).openLibrary();else if(await(await Promise.resolve().then(()=>(W(),ce))).doSelect(t.pageId),t.rowId&&t.rowList){let n=m.dbItems.find(r=>r.Id===t.rowId);n&&await(await Promise.resolve().then(()=>(cn(),ln))).openRowAsPage(t.pageId,n)}}finally{pd=!1}Nr()}async function pS(){rf()&&await My(Xe-1)}async function uS(){af()&&await My(Xe+1)}function Nr(){let e=document.getElementById("memola-nav-back"),t=document.getElementById("memola-nav-fwd");e&&(e.disabled=!rf(),e.classList.toggle("disabled",e.disabled)),t&&(t.disabled=!af(),t.classList.toggle("disabled",t.disabled))}var Ly,tt,Xe,pd,Fn=L(()=>{"use strict";j();Ly=100,tt=[],Xe=-1,pd=!1});var fd={};q(fd,{renderBacklinks:()=>gS});function fS(e){let t=A(e);return t?t.title:null}function cf(e){let t=document.getElementById(e);t&&(t.style.display="none",t.innerHTML="")}async function gS(){let e=m.currentId,t=!!e&&m.currentType==="page"&&!m.currentRow,o=!!e&&m.currentType==="database",n=t?ud:o?lf:null;if(cf(n===ud?lf:ud),!n){cf(ud),cf(lf);return}let r=document.getElementById(n);if(!r||!e)return;r.style.display="",r.innerHTML='<div class="memola-bl-hd"><span class="memola-bl-icon">\u{1F517}</span><span class="memola-bl-title">\u30EA\u30F3\u30AF\u5143</span><span class="memola-bl-count">\u2026</span></div><div class="memola-bl-body"><div class="memola-bl-loading">\u30B9\u30AD\u30E3\u30F3\u4E2D\u2026</div></div>';let a=[];try{a=await ds(e,fS)}catch{r.querySelector(".memola-bl-body").innerHTML='<div class="memola-bl-empty">\u30EA\u30F3\u30AF\u5143\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F</div>';return}if(m.currentId!==e)return;if(a.length===0){r.style.display="none",r.innerHTML="";return}let i=r.querySelector(".memola-bl-count");i&&(i.textContent=String(a.length));let s=r.querySelector(".memola-bl-body");s&&(s.innerHTML=a.map(l=>{let d=A(l.pageId)?.icon||"\u{1F4C4}",p=l.count>1?'<span class="memola-bl-badge">\xD7'+l.count+"</span>":"";return'<div class="memola-bl-item" data-page-id="'+M(l.pageId)+'"><div class="memola-bl-row"><span class="memola-bl-item-icon">'+M(d)+'</span><span class="memola-bl-item-name">'+M(l.pageTitle)+"</span>"+p+"</div>"+(l.snippet?'<div class="memola-bl-snippet">'+M(l.snippet)+"</div>":"")+"</div>"}).join(""),s.querySelectorAll(".memola-bl-item").forEach(l=>{l.addEventListener("click",async()=>{let c=l.dataset.pageId||"";if(!c)return;await(await Promise.resolve().then(()=>(W(),ce))).doSelect(c)})}))}var ud,lf,gd=L(()=>{"use strict";j();ms();De();ye();ud="memola-backlinks",lf="memola-backlinks-db"});var mn={};q(mn,{clearComments:()=>yS,closePopover:()=>ES,currentCommentTarget:()=>bS,currentCommentsContext:()=>gf,focusComment:()=>AS,loadCommentsFor:()=>vS,openCommentPopover:()=>zy,pollComments:()=>xS});function gf(){if(!Ct||Yt.length===0)return"";let e=r=>(r||"").replace(/\s*\n\s*/g," ").trim(),t=["\u2500\u2500 \u3053\u306E\u30DA\u30FC\u30B8\u306E\u30B3\u30E1\u30F3\u30C8 \u2500\u2500"],o=40,n=0;for(let r of Yt){if(n>=o){t.push("\u2026 (\u4EE5\u964D\u306E\u30B3\u30E1\u30F3\u30C8\u306F\u7701\u7565)");break}let a=r.root.Scope==="user"?"\u500B\u4EBA":"\u7D44\u7E54",i=r.resolved?" [\u89E3\u6C7A\u6E08\u307F]":"",s=r.root.AnchorText?` (\u5BFE\u8C61: ${e(r.root.AnchorText)})`:"";t.push(`- [${a}]${i} ${r.root.AuthorName||"\u8AB0\u304B"}: ${e(r.root.Body)}${s}`),n++;for(let l of r.replies){if(n>=o)break;t.push(`    \u2514 ${l.AuthorName||"\u8AB0\u304B"}: ${e(l.Body)}`),n++}}return t.join(`
`)}function bS(){if(m.currentRow){let e=A(m.currentRow.dbId);return{pageId:"row:"+m.currentRow.listTitle+":"+m.currentRow.itemId,scope:e?.scope==="org"?"org":"user"}}if(m.currentType==="page"&&m.currentId){let e=A(m.currentId);return{pageId:Es(m.currentId),scope:e?.scope==="org"?"org":"user"}}return null}function hf(){return document.getElementById("memola-overlay")||document.body}function Hr(){return document.getElementById("memola-comments-pane")}function ri(){return document.getElementById("memola-comments-list")}function By(e){return Ay[Math.abs(e||0)%Ay.length]}function Dy(e){return(e||"\uFF1F").trim().charAt(0).toUpperCase()||"\uFF1F"}function xd(e){return e.replace(/"/g,'\\"')}async function vS(e,t){Ct=e,ff=t,Or=t,zn="",oi=0,wS(),Wt(e);try{let o=await Dc(e);if(await Oc(o),await Uy(o),Ct!==e)return;Yt=Bc(o)}catch{Yt=[]}Ks=Yt.length>0,qy(),jn(),TS()}function yS(){Ct="",Yt=[],jy(),qn(),dn(),hd="",pf();let e=Hr();e&&e.classList.remove("on")}async function Fr(){if(!Ct)return;let e=await Dc(Ct);await Oc(e),await Uy(e),Yt=Bc(e),qy(),jn()}async function xS(){if(!Ct)return;let e=Hr();e&&e.contains(document.activeElement)&&document.activeElement!==document.body||We||(Wt(Ct),await Fr())}async function Uy(e){let t=new Set;for(let o of e){o.AuthorId&&o.AuthorName&&bd.set(o.AuthorId,o.AuthorName);let n=gs(o);for(let r of Object.values(n))for(let a of r)t.add(a)}await Promise.all(Array.from(t).map(async o=>{bd.has(o)||bd.set(o,await Ca(o).catch(()=>"")||"\u30E6\u30FC\u30B6\u30FC#"+o)}))}function kS(e){let t=m.meta.myUserId||-1;return e.map(o=>o===t?"\u3042\u306A\u305F":bd.get(o)||"\u30E6\u30FC\u30B6\u30FC#"+o).join(", ")}function wS(){let e=Hr();if(e&&!Cy){Cy=!0,e.querySelector("#memola-comments-x")?.addEventListener("click",()=>{Ks=!1,pf(),jn()});let t=ri();t?.addEventListener("click",LS),t?.addEventListener("mouseover",r=>{let a=r.target.closest(".memola-cmt-thread");if(!a)return;let i=a.dataset.blockId||"";i!==hd&&(hd=i,Wy(i))}),t?.addEventListener("mouseout",r=>{r.relatedTarget?.closest?.(".memola-cmt-thread")||(hd="",pf())}),t?.addEventListener("input",r=>{let a=r.target.closest(".memola-cmt-reply-inp");a&&Hy(a)}),t?.addEventListener("keydown",r=>{let a=r;if(Fy(a)){a.stopPropagation();return}if(a.isComposing||a.keyCode===229)return;let i=a.target.closest(".memola-cmt-reply-inp");if(i&&a.key==="Enter"&&!a.shiftKey){a.preventDefault();let s=i.closest(".memola-cmt-thread")?.dataset.root||"";Gy(s)}}),e.querySelector("#memola-comments-add")?.addEventListener("click",()=>void Oy());let n=e.querySelector("#memola-comments-ta");n?.addEventListener("input",()=>{n&&Hy(n)}),n?.addEventListener("keydown",r=>{let a=r;if(Fy(a)){a.stopPropagation();return}a.isComposing||a.keyCode===229||a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),Oy())}),n?.addEventListener("blur",()=>setTimeout(dn,150)),e.querySelector("#memola-comments-scope-org")?.addEventListener("click",()=>{Or="org",vd()}),e.querySelector("#memola-comments-scope-user")?.addEventListener("click",()=>{Or="user",vd()}),e.querySelector("#memola-comments-target-x")?.addEventListener("click",()=>{zn="",vd()})}}function zy(e,t){if(e!==Ct)return;Ks=!0,zn=t,Or=ff,jn();let o=ri();t&&o&&o.querySelector('.memola-cmt-thread[data-block-id="'+xd(t)+'"]')?.scrollIntoView({block:"center"}),Hr()?.querySelector("#memola-comments-ta")?.focus()}function ES(){qn()}function jy(){for(let e of yd)e.remove();yd.length=0}function qy(){jy();let e=qp(Yt);for(let[t,o]of e){if(!t)continue;let n=document.createElement("div");n.className="memola-cmt-marker",n.dataset.blockId=t,n.textContent=o>1?"\u{1F4AC}"+o:"\u{1F4AC}",n.title="\u30B3\u30E1\u30F3\u30C8 "+o+" \u4EF6",n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),zy(Ct,t)}),hf().appendChild(n),yd.push(n)}$y()}function $y(){let e=Pe(),o=(document.getElementById("memola-ea")||e).getBoundingClientRect().right;for(let n of yd){let r=e.querySelector('[data-block-id="'+xd(n.dataset.blockId||"")+'"]');if(!r){n.style.display="none";continue}n.style.display="";let a=r.getBoundingClientRect(),i=IS(r),s=n.offsetHeight||20,l=n.offsetWidth||24;n.style.top=i.top+window.scrollY+(i.height-s)/2+"px";let c=Math.min(a.right+8,o-l-4);n.style.left=c+window.scrollX+"px"}}function IS(e){try{let n=document.createRange();n.selectNodeContents(e);let r=n.getClientRects();for(let a=0;a<r.length;a++)if(r[a].height>0)return{top:r[a].top,height:r[a].height}}catch{}let t=e.getBoundingClientRect(),o=parseFloat(window.getComputedStyle(e).lineHeight);return{top:t.top,height:isFinite(o)&&o>0?Math.min(o,t.height):t.height}}function mf(){df==null&&(df=window.requestAnimationFrame(()=>{df=null,$y()}))}function TS(){Py||(Py=!0,window.addEventListener("scroll",mf,!0),window.addEventListener("resize",mf),Pe().addEventListener("input",mf))}function _y(e){let t=gs(e),o=m.meta.myUserId||-1,n=Object.entries(t).filter(([,r])=>r.length>0).map(([r,a])=>{let i=a.includes(o)?" mine":"",s=M(kS(a));return'<button class="memola-cmt-react-chip'+i+'" data-act="react-toggle" data-id="'+e.Id+'" data-emoji="'+M(r)+'" title="'+s+'">'+r+" "+a.length+"</button>"});return n.length?'<div class="memola-cmt-reacts">'+n.join("")+"</div>":""}function Ry(e,t,o=!0){let n=e.AuthorId===(m.meta.myUserId||-1),r=e.Created?wn(Date.parse(e.Created)):"";if(e.Deleted)return'<div class="memola-cmt-c deleted"><div class="memola-cmt-main"><div class="memola-cmt-body muted">\uFF08\u524A\u9664\u3055\u308C\u305F\u30B3\u30E1\u30F3\u30C8\uFF09</div></div></div>';if(oi===e.Id)return'<div class="memola-cmt-c editing" data-id="'+e.Id+'"><div class="memola-cmt-avatar" style="background:'+By(e.AuthorId)+'">'+M(Dy(e.AuthorName||""))+'</div><div class="memola-cmt-main"><textarea class="memola-cmt-edit-ta">'+M(e.Body)+'</textarea><div class="memola-cmt-editacts"><button class="memola-btn s" data-act="edit-save" data-id="'+e.Id+'">\u4FDD\u5B58</button><button class="memola-btn ghost" data-act="edit-cancel">\u53D6\u6D88</button></div></div></div>';let a=t&&e.Scope==="user"?'<span class="memola-cmt-badge priv">\u{1F512}</span>':"",i=M((e.Body||"").replace(/\r\n?/g,`
`).trim()).replace(/\n/g,"<br>"),s=e.Edited?'<span class="memola-cmt-edited">\u7DE8\u96C6\u6E08\u307F</span>':"",l=o?'<div class="memola-cmt-hover"><button class="memola-cmt-hbtn" data-act="react" data-id="'+e.Id+'" title="\u30EA\u30A2\u30AF\u30B7\u30E7\u30F3">\u{1F642}<sup>+</sup></button>'+(t?'<button class="memola-cmt-hbtn" data-act="resolve" data-root="'+e.Id+'" title="\u89E3\u6C7A">\u2713</button>':"")+(n?'<button class="memola-cmt-hbtn" data-act="more" data-id="'+e.Id+'" title="\u305D\u306E\u4ED6">\u22EF</button>':"")+"</div>":"",c='<div class="memola-cmt-avatar" style="background:'+By(e.AuthorId)+'">'+M(Dy(e.AuthorName||""))+"</div>";return t?'<div class="memola-cmt-c" data-id="'+e.Id+'">'+c+'<div class="memola-cmt-main"><div class="memola-cmt-line1"><span class="memola-cmt-author">'+M(e.AuthorName||"\u8AB0\u304B")+'</span><span class="memola-cmt-time">'+M(r)+"</span>"+s+a+'</div><div class="memola-cmt-body">'+i+"</div>"+_y(e)+"</div>"+l+"</div>":'<div class="memola-cmt-c reply" data-id="'+e.Id+'" title="'+M(r)+'">'+c+'<div class="memola-cmt-main"><div class="memola-cmt-replyline"><span class="memola-cmt-author">'+M(e.AuthorName||"\u8AB0\u304B")+'</span> <span class="memola-cmt-body inline">'+i+"</span> "+s+"</div>"+_y(e)+"</div>"+l+"</div>"}function Ny(e){let t=e.blockId?'<div class="memola-cmt-anchor">'+M(e.root.AnchorText||"\uFF08\u30D6\u30ED\u30C3\u30AF\uFF09")+"</div>":"",o=e.replies.length?'<div class="memola-cmt-replies">'+e.replies.map(a=>Ry(a,!1,!0)).join("")+"</div>":"",n=e.root.AuthorId===(m.meta.myUserId||-1),r='<div class="memola-cmt-thread-hover"><button class="memola-cmt-hbtn" data-act="react" data-id="'+e.root.Id+'" title="\u30EA\u30A2\u30AF\u30B7\u30E7\u30F3">\u{1F642}<sup>+</sup></button><button class="memola-cmt-hbtn" data-act="resolve" data-root="'+e.root.Id+'" title="\u89E3\u6C7A">\u2713</button>'+(n?'<button class="memola-cmt-hbtn" data-act="more" data-id="'+e.root.Id+'" title="\u305D\u306E\u4ED6">\u22EF</button>':"")+"</div>";return'<div class="memola-cmt-thread'+(e.resolved?" resolved":"")+'" data-root="'+e.root.Id+'"'+(e.blockId?' data-block-id="'+M(e.blockId)+'"':"")+">"+r+(e.resolved?'<div class="memola-cmt-resolved-tag">\u2713 \u89E3\u6C7A\u6E08\u307F</div>':"")+t+Ry(e.root,!0,!1)+o+'<div class="memola-cmt-replybar"><input class="memola-cmt-reply-inp" type="text" placeholder="\u8FD4\u4FE1..."><button class="memola-cmt-reply-send" data-act="reply" data-root="'+e.root.Id+'">\u21B5</button></div></div>'}function jn(){let e=Hr(),t=ri();if(!e||!t)return;if(!Ks||!Ct){e.classList.remove("on");return}e.classList.add("on");let o=Pe(),n=new Map;o.querySelectorAll("[data-block-id]").forEach((l,c)=>{let d=l.dataset.blockId;d&&!n.has(d)&&n.set(d,c)});let r=l=>l.blockId?n.get(l.blockId)??Number.MAX_SAFE_INTEGER:-1,a=(l,c)=>r(l)-r(c),i=Yt.filter(l=>!l.resolved).sort(a),s=Yt.filter(l=>l.resolved).sort(a);t.innerHTML=i.length||s.length?i.map(Ny).join("")+(s.length?'<div class="memola-cmt-resolved-sep">\u89E3\u6C7A\u6E08\u307F</div>'+s.map(Ny).join(""):""):'<div class="memola-cmt-empty">\u307E\u3060\u30B3\u30E1\u30F3\u30C8\u306F\u3042\u308A\u307E\u305B\u3093\u3002<br>\u30D6\u30ED\u30C3\u30AF\u306E \u22EE\u22EE \u304B\u3089\u300C\u{1F4AC} \u30B3\u30E1\u30F3\u30C8\u300D\u3001\u307E\u305F\u306F\u30C4\u30FC\u30EB\u30D0\u30FC\u306E \u{1F4AC} \u3067\u8FFD\u52A0\u3067\u304D\u307E\u3059\u3002</div>',vd()}function vd(){let e=Hr();if(!e)return;let t=e.querySelector("#memola-comments-scope-org"),o=e.querySelector("#memola-comments-scope-user");t?.classList.toggle("on",Or==="org"),o?.classList.toggle("on",Or==="user");let n=e.querySelector("#memola-comments-target"),r=e.querySelector("#memola-comments-target-lbl");n&&r&&(zn?(n.style.display="",r.textContent="\u21B3 "+(Ky(zn)||"\u3053\u306E\u30D6\u30ED\u30C3\u30AF")):n.style.display="none")}function Ky(e){return e?(Pe().querySelector('[data-block-id="'+xd(e)+'"]')?.textContent||"").trim().slice(0,80):""}function Wy(e){let t=Pe();if(t.querySelectorAll(".memola-cmt-block-active").forEach(n=>n.classList.remove("memola-cmt-block-active")),!e)return;let o=t.querySelector('[data-block-id="'+xd(e)+'"]');o&&o.classList.add("memola-cmt-block-active")}function pf(){Pe().querySelectorAll(".memola-cmt-block-active").forEach(e=>e.classList.remove("memola-cmt-block-active"))}function Ws(e){for(let t of Yt){if(t.root.Id===e)return t.root;let o=t.replies.find(n=>n.Id===e);if(o)return o}return null}function LS(e){let o=e.target.closest("[data-act]");if(!o)return;let n=o.dataset.act,r=Number(o.dataset.id||0);if(n==="resolve"){SS(o.dataset.root||"");return}if(n==="reply"){Gy(o.dataset.root||"");return}if(n==="react"){PS(o,r);return}if(n==="react-toggle"){Vy(r,o.dataset.emoji||"");return}if(n==="more"){BS(o,r);return}if(n==="edit"){oi=r,qn(),jn();return}if(n==="edit-cancel"){oi=0,jn();return}if(n==="edit-save"){MS(r);return}if(n==="del"){qn(),Yy(r);return}}async function Oy(){let e=Hr()?.querySelector("#memola-comments-ta"),t=(e?.value||"").trim();if(!t)return;let o=e&&ni.get(e)||[];try{await Rc({pageId:Ct,blockId:zn,body:t,scope:Or,anchorText:Ky(zn),mentions:o}),e&&(e.value="",ni.delete(e)),zn="",await Fr()}catch(n){w("\u30B3\u30E1\u30F3\u30C8\u8FFD\u52A0\u5931\u6557: "+n.message,"err")}}async function Gy(e){let t=Ws(Number(e));if(!t)return;let o=ri()?.querySelector('.memola-cmt-thread[data-root="'+e+'"] .memola-cmt-reply-inp'),n=(o?.value||"").trim();if(!n)return;let r=o&&ni.get(o)||[];try{await Rc({pageId:Ct,blockId:t.BlockId,body:n,scope:t.Scope,threadRootId:e,mentions:r}),o&&ni.delete(o),await Fr()}catch(a){w("\u8FD4\u4FE1\u5931\u6557: "+a.message,"err")}}async function SS(e){let t=Ws(Number(e));if(t)try{await Gp(t,!(t.Resolved>0)),await Fr()}catch(o){w("\u89E3\u6C7A\u72B6\u614B\u306E\u5909\u66F4\u5931\u6557: "+o.message,"err")}}async function Vy(e,t){let o=Ws(e);if(!(!o||!t))try{await Vp(o,t),await Fr()}catch(n){w("\u30EA\u30A2\u30AF\u30B7\u30E7\u30F3\u5931\u6557: "+n.message,"err")}}async function MS(e){let t=Ws(e);if(!t)return;let n=(ri()?.querySelector('.memola-cmt-c.editing[data-id="'+e+'"] .memola-cmt-edit-ta')?.value||"").trim();if(n)try{await Wp({...t,Body:n}),oi=0,await Fr()}catch(r){w("\u7DE8\u96C6\u5931\u6557: "+r.message,"err")}}async function Yy(e){let t=Ws(e);if(!t)return;let n=Yt.find(a=>a.root.Id===e)?.replies??[],r=n.length?"\u3053\u306E\u30B3\u30E1\u30F3\u30C8\u3068\u8FD4\u4FE1 "+n.length+" \u4EF6\u3092\u524A\u9664\u3057\u307E\u3059\u304B?":"\u3053\u306E\u30B3\u30E1\u30F3\u30C8\u3092\u524A\u9664\u3057\u307E\u3059\u304B?";if(confirm(r))try{for(let a of n)await Nc(a);await Nc(t),await Fr()}catch(a){w("\u524A\u9664\u5931\u6557: "+a.message,"err")}}function qn(){ti&&(ti.remove(),ti=null),document.removeEventListener("mousedown",Xy,!0)}function Xy(e){ti&&!ti.contains(e.target)&&qn()}function Jy(e,t){qn(),ti=t,hf().appendChild(t);let o=e.getBoundingClientRect();t.style.left=Math.min(o.left+window.scrollX,window.scrollX+window.innerWidth-(t.offsetWidth||180)-8)+"px",t.style.top=o.bottom+window.scrollY+4+"px",setTimeout(()=>document.addEventListener("mousedown",Xy,!0),0)}function PS(e,t){let o=document.createElement("div");o.className="memola-cmt-float memola-cmt-react-palette";for(let n of hS){let r=document.createElement("button");r.className="memola-cmt-react-opt",r.textContent=n,r.addEventListener("mousedown",a=>{a.preventDefault(),qn(),Vy(t,n)}),o.appendChild(r)}Jy(e,o)}async function Hy(e){if(ff!=="org"){dn();return}let t=e.selectionStart??e.value.length,n=e.value.slice(0,t).match(/@([^\s@]*)$/);if(!n){dn();return}let r=await jb(n[1]);if(!r.length){dn();return}CS(e,r,t-n[0].length)}function CS(e,t,o){dn();let n=document.createElement("div");n.className="memola-cmt-float memola-mention-pop",We={el:e,float:n,items:t,active:0,matchStart:o},uf(),hf().appendChild(n);let r=e.getBoundingClientRect();n.style.left=r.left+window.scrollX+"px",n.style.top=r.bottom+window.scrollY+4+"px"}function uf(){We&&(We.float.innerHTML=We.items.map((e,t)=>'<button class="memola-mention-item'+(t===We.active?" active":"")+'" data-i="'+t+'"><span class="memola-mention-name">'+M(e.title)+'</span><span class="memola-mention-email">'+M(e.email)+"</span></button>").join(""),We.float.querySelectorAll(".memola-mention-item").forEach(e=>{e.addEventListener("mousedown",t=>{t.preventDefault(),Zy(Number(e.dataset.i))})}))}function Zy(e){if(!We)return;let t=We.items[e],o=We.el;if(!t){dn();return}let n=o.selectionStart??o.value.length,r="@"+t.title+" ",a=o.value.slice(0,We.matchStart),i=o.value.slice(n);o.value=a+r+i;let s=(a+r).length;o.setSelectionRange(s,s);let l=ni.get(o)||[];l.push(t.id),ni.set(o,l),dn(),o.focus()}function dn(){We&&(We.float.remove(),We=null)}function Fy(e){return We?e.key==="ArrowDown"?(We.active=Math.min(We.items.length-1,We.active+1),uf(),e.preventDefault(),!0):e.key==="ArrowUp"?(We.active=Math.max(0,We.active-1),uf(),e.preventDefault(),!0):e.key==="Enter"?(e.preventDefault(),Zy(We.active),!0):e.key==="Escape"?(e.preventDefault(),dn(),!0):!1:!1}function AS(e,t){Ks=!0;let o=n=>{if(Ct!==e){n<25&&setTimeout(()=>o(n+1),150);return}jn();let r=ri()?.querySelector('.memola-cmt-c[data-id="'+t+'"]');if(r){let a=r.closest(".memola-cmt-thread");a?.scrollIntoView({block:"center"}),r.classList.add("memola-cmt-flash"),setTimeout(()=>r.classList.remove("memola-cmt-flash"),1600),Wy(a?.dataset.blockId||"");return}n<25&&setTimeout(()=>o(n+1),150)};o(0)}function BS(e,t){let o=document.createElement("div");o.className="memola-cmt-float memola-cmt-more";let n=(r,a)=>{let i=document.createElement("button");return i.className="memola-cmt-more-item",i.textContent=r,i.dataset.act=a,i.dataset.id=String(t),i.addEventListener("mousedown",s=>{s.preventDefault(),qn(),a==="edit"?(oi=t,jn()):a==="del"&&Yy(t)}),i};o.appendChild(n("\u7DE8\u96C6","edit")),o.appendChild(n("\u524A\u9664","del")),Jy(e,o)}var Ct,ff,Yt,yd,Ks,zn,Or,oi,Py,Cy,hd,ni,We,bd,hS,Ay,df,ti,Ao=L(()=>{"use strict";j();me();le();De();vo();ye();$t();Cc();K();bs();Ct="",ff="user",Yt=[],yd=[],Ks=!0,zn="",Or="user",oi=0,Py=!1,Cy=!1,hd="",ni=new WeakMap,We=null,bd=new Map,hS=["\u{1F44D}","\u2764\uFE0F","\u{1F389}","\u{1F604}","\u{1F64F}","\u{1F440}"],Ay=["#e07a5f","#3d82c4","#5a9e6f","#b06fb0","#c99a3b","#4aa3a3","#c4677b","#7a82c4"];df=null;ti=null});var ln={};q(ln,{backToDb:()=>ex,openRowAsPage:()=>DS,saveCurrentRow:()=>_S});async function DS(e,t){let o=m.dbList;if(!o||!t)return;m.currentRow={listTitle:o,itemId:t.Id,dbId:e},m.currentType="page",Promise.resolve().then(()=>(Fn(),ei)).then(y=>y.pushHistory(e,{rowList:o,rowId:t.Id})),et("page");let n=E("ttl");n.value=t.Title||"",En(n);let r=await io(o,t.Id),a=r?Ge(r):[],i=Pe(),{mountEditor2:s,loadBlocks:l}=await Promise.resolve().then(()=>(ht(),Bo));s(i),l(a);let c=document.getElementById("memola-row-props");c&&by(c,m.dbFields,t,o);let d=E("pg-icon"),p=document.getElementById("memola-add-icon");d&&(d.style.display="none"),p&&(p.style.display="");let f=m.pages.find(y=>y.Id===e)?.Title||"\u7121\u984CDB";$s([{label:f,onClick:()=>{ex(e)}},{label:t.Title||"\u7121\u984C"}]);let g=t.Modified||null;Wo(g),m.dirty=!1,Promise.resolve().then(()=>(gd(),fd)).then(y=>y.renderBacklinks()),Promise.resolve().then(()=>(Ao(),mn)).then(y=>{let b=y.currentCommentTarget();b&&y.loadCommentsFor(b.pageId,b.scope)})}async function _S(){if(!m.currentRow)return;let t=(E("ttl").value||"").trim()||"\u7121\u984C",{getBlocks:o}=await Promise.resolve().then(()=>(ht(),Bo)),n=Ve(o());Qe("\u4FDD\u5B58\u4E2D...");let r=m.currentRow;try{await pt(r.listTitle,r.itemId,{Title:t}),await Eo(r.listTitle,r.itemId,r.dbId,t,n);let a=m.dbItems.find(i=>i.Id===r.itemId);a&&(a.Title=t),m.dirty=!1,Qe(""),RS(r.itemId,t,r.listTitle)}catch(a){w("\u884C\u306E\u4FDD\u5B58\u306B\u5931\u6557: "+a.message,"err"),Qe("\u672A\u4FDD\u5B58")}}async function RS(e,t,o){if(Qy.has(e)||!Qp(o)||yc(t))return;let r=m.dbItems.find(s=>s.Id===e)?.[ut]||"",a=bo(r)||"";if(!(!a||(Qy.add(e),!window.confirm("\u300C"+t+`\u300D\u3092\u901A\u5E38\u30DA\u30FC\u30B8\u306B\u5909\u63DB\u3057\u307E\u3059\u304B\uFF1F

\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 (`+a+`) \u304B\u3089\u306F\u5916\u308C\u307E\u3059\u3002
\u3042\u3068\u3067\u30E1\u30CB\u30E5\u30FC\u304B\u3089\u300C\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u306B\u623B\u3059\u300D\u3067\u5FA9\u5143\u3067\u304D\u307E\u3059\u3002`))))try{let s=await tu(e,t,a),{apiGetPages:l}=await Promise.resolve().then(()=>(K(),je));await l();let{renderTree:c}=await Promise.resolve().then(()=>(Be(),po));c(),await(await Promise.resolve().then(()=>(W(),ce))).doSelect(s),w("\u901A\u5E38\u30DA\u30FC\u30B8\u306B\u5909\u63DB\u3057\u307E\u3057\u305F")}catch(s){w("\u5909\u63DB\u5931\u6557: "+s.message,"err")}}async function ex(e){if(m.currentRow=null,!m.pages.find(n=>n.Id===e))return;let{doSelect:o}=await Promise.resolve().then(()=>(W(),ce));await o(e);try{m.dbList&&(m.dbItems=await Ie(m.dbList));let{renderDbTable:n}=await Promise.resolve().then(()=>(W(),ce));n()}catch{}}var Qy,cn=L(()=>{"use strict";j();me();le();Ke();Re();K();Tt();W();vy();Sn();vo();Qy=new Set});var Ur={};q(Ur,{clearSaveTimer:()=>kd,flushPendingSave:()=>vt,schedSave:()=>Do});function bf(){Gs&&(clearTimeout(Gs),Gs=null)}function NS(){bf(),Gs=setTimeout(()=>{Gs=null,!(!m.currentRow||!m.dirty||m.saving)&&Promise.resolve().then(()=>(cn(),ln)).then(e=>e.saveCurrentRow()).catch(()=>{})},os)}function tx(){if(!m.currentId||m.currentType==="database"||m.currentRow)return;let e=E("ttl"),t=Pe();if(!e||!t)return;let o=e.value.trim()||"\u7121\u984C";vf(o)}function Do(){if(!(!m.currentId||m.currentType==="database")){if(m.currentRow){m.dirty||(m.dirty=!0,Qe("\u672A\u4FDD\u5B58")),NS();return}tx()}}function kd(){oy(),bf()}async function vt(){if(m.currentRow){if(bf(),m.dirty&&!m.saving){m.saving=!0;try{await(await Promise.resolve().then(()=>(cn(),ln))).saveCurrentRow()}finally{m.saving=!1}}return}tx(),await re.flush()}var Gs,gt=L(()=>{"use strict";j();me();ft();Nu();ht();le();He();Gs=null});var ax={};q(ax,{insertLinkedDb:()=>qS,renderAllLinkedDbs:()=>jS});function HS(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t.filter(o=>o&&typeof o.field=="string"&&typeof o.op=="string"):[]}catch{return[]}}function FS(e,t){return t.length===0?e:e.filter(o=>{for(let n of t){if(!n.value&&n.op!=="empty"&&n.op!=="not_empty")continue;let r=o[n.field],a=r==null?"":String(r);if(n.op==="equals"){if(a!==n.value)return!1}else if(n.op==="not_empty"){if(!a)return!1}else if(n.op==="empty"){if(a)return!1}else if(!a.toLowerCase().includes(n.value.toLowerCase()))return!1}return!0})}function US(e,t){t.length===0?e.removeAttribute("data-filter"):e.setAttribute("data-filter",JSON.stringify(t)),Do(),setTimeout(()=>{yf(e)},0)}function zS(e,t){if(e==null||e==="")return"";if(t.FieldTypeKind===4){let o=String(e);return/^\d{4}-\d{2}-\d{2}/.test(o)?o.substring(0,10):o}if(t.FieldTypeKind===8)return e?"\u2611":"\u2610";if(typeof e=="object"){let o=e;return Array.isArray(o.results)?o.results.map(String).join(", "):typeof o.Title=="string"?o.Title:""}return String(e)}async function yf(e){let t=e.getAttribute("data-db-id")||"",o=A(t);if(!o||o.type!=="database"||!o.list){e.innerHTML='<div class="memola-linkdb-broken">\u26A0 DB \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093'+(t?" (id="+M(t)+")":"")+"</div>";return}let n=o.list,r=HS(e.getAttribute("data-filter")||"");e.innerHTML='<div class="memola-linkdb-loading">\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026</div>';let a=[],i=[];try{let D=await Promise.resolve().then(()=>(Re(),Go));[a,i]=await Promise.all([D.getListFields(n),D.getListItems(n)])}catch(D){e.innerHTML='<div class="memola-linkdb-error">\u8AAD\u307F\u8FBC\u307F\u5931\u6557: '+M(D.message)+"</div>";return}let s=new Set(["Title","ContentType","Attachments","_memola_body"]),l=a.filter(D=>!s.has(D.InternalName)&&!s.has(D.Title)),c=[{internal:"Title",title:"\u30BF\u30A4\u30C8\u30EB"},...l.map(D=>({internal:D.InternalName,title:D.Title}))],d=[{field:null,label:"\u30BF\u30A4\u30C8\u30EB",key:"Title"},...l.slice(0,OS-1).map(D=>({field:D,label:D.Title,key:D.InternalName}))],p=FS(i,r),u=p.length,f=i.length,g=Math.min(u,ox),y=u>ox,b="<thead><tr>"+d.map(D=>"<th>"+M(D.label)+"</th>").join("")+"</tr></thead>",h="<tbody>"+p.slice(0,g).map(D=>{let U=d.map(Y=>{if(Y.key==="Title")return'<td class="memola-linkdb-title-cell" data-row-id="'+D.Id+'">'+M(String(D.Title||"\u7121\u984C"))+"</td>";let ee=Y.field;return"<td>"+M(zS(D[Y.key],ee))+"</td>"}).join("");return'<tr data-row-id="'+D.Id+'">'+U+"</tr>"}).join("")+"</tbody>",v=o.icon||"\u{1F5C3}",k=r.length>0?"\u{1F50E} \u30D5\u30A3\u30EB\u30BF ("+r.length+")":"\u{1F50E} \u30D5\u30A3\u30EB\u30BF",x=r.length>0?u+" / "+f+" \u4EF6":u+" \u4EF6",T='<div class="memola-linkdb-header"><span class="memola-linkdb-icon">'+M(v)+'</span><span class="memola-linkdb-name">'+M(o.title)+'</span><span class="memola-linkdb-count">'+x+(y?" (\u4E0A\u4F4D "+g+" \u4EF6\u3092\u8868\u793A)":"")+'</span><button class="memola-linkdb-filter" type="button" title="\u30D5\u30A3\u30EB\u30BF\u6761\u4EF6\u3092\u7DE8\u96C6">'+M(k)+'</button><button class="memola-linkdb-open" type="button" title="DB \u3092\u958B\u304F">\u2197 \u958B\u304F</button></div>',I=D=>{let U=c.find(Y=>Y.internal===D);return U?U.title:D},B=D=>D==="contains"?"\u542B\u3080":D==="equals"?"\uFF1D":D==="not_empty"?"\u7A7A\u3067\u306A\u3044":D==="empty"?"\u7A7A":D,F=r.length>0?'<div class="memola-linkdb-filterchips">'+r.map(D=>'<span class="memola-linkdb-chip">'+M(I(D.field))+" "+M(B(D.op))+(D.op==="empty"||D.op==="not_empty"?"":": "+M(D.value))+"</span>").join("")+"</div>":"";e.innerHTML=T+F+'<div class="memola-linkdb-tablewrap"><table class="memola-linkdb-table">'+b+h+"</table></div>",e.querySelector(".memola-linkdb-open")?.addEventListener("click",D=>{D.preventDefault(),D.stopPropagation(),Promise.resolve().then(()=>(W(),ce)).then(U=>U.doSelect(t))});let H=e.querySelector(".memola-linkdb-filter");H?.addEventListener("click",D=>{D.preventDefault(),D.stopPropagation(),nx(e,H,c,r)}),e.querySelectorAll(".memola-linkdb-chip").forEach(D=>{D.addEventListener("click",U=>{U.preventDefault(),U.stopPropagation(),nx(e,H||D,c,r)})}),e.querySelectorAll(".memola-linkdb-title-cell").forEach(D=>{D.addEventListener("click",async U=>{U.preventDefault(),U.stopPropagation();let Y=parseInt(D.dataset.rowId||"0",10);if(!Y)return;let ee=p.find(ie=>ie.Id===Y);if(ee)try{let ie=await Promise.resolve().then(()=>(W(),ce)),N=m.pages.find(Ee=>Ee.Id===t);if(!N){w("DB \u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}await ie.doSelectDb(t,N);let se=await Promise.resolve().then(()=>(cn(),ln)),Je=m.dbItems.find(Ee=>Ee.Id===Y)||ee;await se.openRowAsPage(t,Je)}catch(ie){w("\u884C\u3092\u958B\u3051\u307E\u305B\u3093\u3067\u3057\u305F: "+ie.message,"err")}})})}function jS(e){e.querySelectorAll(".memola-linkdb").forEach(o=>{yf(o)})}function wd(){ai&&(ai.remove(),ai=null),document.removeEventListener("mousedown",rx,!0)}function rx(e){ai&&(ai.contains(e.target)||wd())}function nx(e,t,o,n){wd();let r=n.map(p=>({...p})),a=document.createElement("div");a.className="memola-linkdb-fpop",a.addEventListener("click",p=>p.stopPropagation());function i(){let p=o.map(y=>'<option value="'+M(y.internal)+'">'+M(y.title)+"</option>").join(""),u=[["contains","\u542B\u3080"],["equals","\uFF1D (\u5B8C\u5168\u4E00\u81F4)"],["not_empty","\u7A7A\u3067\u306A\u3044"],["empty","\u7A7A"]].map(([y,b])=>'<option value="'+y+'">'+b+"</option>").join(""),f=r.map((y,b)=>{let h=y.op!=="empty"&&y.op!=="not_empty";return'<div class="memola-linkdb-frow" data-idx="'+b+'"><select class="memola-linkdb-ffield">'+p+'</select><select class="memola-linkdb-fop">'+u+"</select>"+(h?'<input class="memola-linkdb-fval" type="text" placeholder="\u5024\u2026" value="'+M(y.value)+'">':'<span class="memola-linkdb-fval-na">\u2014</span>')+'<button class="memola-linkdb-frm" title="\u524A\u9664">\xD7</button></div>'}).join(""),g=r.length===0?'<div class="memola-linkdb-fempty">\u30D5\u30A3\u30EB\u30BF\u6761\u4EF6\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u300C+ \u8FFD\u52A0\u300D\u3067\u6761\u4EF6\u3092\u52A0\u3048\u3066\u304F\u3060\u3055\u3044\u3002</div>':"";a.innerHTML='<div class="memola-linkdb-fhd"><span>\u{1F50E} \u30D5\u30A3\u30EB\u30BF\u6761\u4EF6 (AND)</span><button class="memola-linkdb-fclose" title="\u9589\u3058\u308B">\xD7</button></div><div class="memola-linkdb-fbody">'+g+f+'</div><div class="memola-linkdb-fft"><button class="memola-linkdb-fadd">+ \u8FFD\u52A0</button><span style="flex:1"></span><button class="memola-linkdb-fclear">\u5168\u30AF\u30EA\u30A2</button><button class="memola-linkdb-fapply">\u9069\u7528</button></div>',a.querySelectorAll(".memola-linkdb-frow").forEach(y=>{let b=parseInt(y.dataset.idx||"-1",10);if(b<0)return;let h=r[b],v=y.querySelector(".memola-linkdb-ffield"),k=y.querySelector(".memola-linkdb-fop");v&&(v.value=h.field||o[0]?.internal||""),k&&(k.value=h.op),v?.addEventListener("change",()=>{h.field=v.value}),k?.addEventListener("change",()=>{h.op=k.value,(h.op==="empty"||h.op==="not_empty")&&(h.value=""),i()});let x=y.querySelector(".memola-linkdb-fval");x?.addEventListener("input",()=>{h.value=x.value}),y.querySelector(".memola-linkdb-frm")?.addEventListener("click",()=>{r.splice(b,1),i()})}),a.querySelector(".memola-linkdb-fadd")?.addEventListener("click",()=>{r.push({field:o[0]?.internal||"Title",op:"contains",value:""}),i()}),a.querySelector(".memola-linkdb-fclear")?.addEventListener("click",()=>{r.length!==0&&confirm("\u5168\u3066\u306E\u6761\u4EF6\u3092\u524A\u9664\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?")&&(r.length=0,i())}),a.querySelector(".memola-linkdb-fapply")?.addEventListener("click",()=>{let y=r.filter(b=>b.field?b.op==="empty"||b.op==="not_empty"?!0:!!b.value:!1);US(e,y),wd()}),a.querySelector(".memola-linkdb-fclose")?.addEventListener("click",()=>{wd()})}i(),(document.getElementById("memola-overlay")||document.body).appendChild(a);let l=t.getBoundingClientRect();a.style.position="fixed",a.style.top=l.bottom+6+"px";let c=380,d=l.right-c;d<8&&(d=8),a.style.left=d+"px",a.style.width=c+"px",ai=a,setTimeout(()=>{document.addEventListener("mousedown",rx,!0)},0)}function qS(e,t="table"){let o=window.getSelection();if(!o||!o.rangeCount)return;let n=document.createElement("div");n.className="memola-linkdb",n.setAttribute("contenteditable","false"),n.setAttribute("data-db-id",e),n.setAttribute("data-view",t);let r=document.createElement("p");r.appendChild(document.createElement("br"));let a=o.getRangeAt(0);a.insertNode(r),a.insertNode(n);let i=document.createRange();i.setStart(r,0),i.collapse(!0),o.removeAllRanges(),o.addRange(i),yf(n)}var ox,OS,ai,ix=L(()=>{"use strict";j();le();gt();De();ye();ox=50,OS=4;ai=null});var $n={};q($n,{CLAUDE_MODELS:()=>$S,CORP_AI_MODELS:()=>xf,DEFAULT_EMBEDDING_API_VERSION:()=>px,DEFAULT_EMBEDDING_MODEL:()=>mx,DEFAULT_VOYAGE_MODEL:()=>ux,EMBEDDING_MODELS:()=>l2,VOYAGE_MODELS:()=>c2,deploymentIdFor:()=>If,findCorpAiModel:()=>ii,getActiveModel:()=>t2,getClaudeApiKey:()=>kf,getClaudeModel:()=>Ed,getCorpAiBaseUrl:()=>Ef,getCorpAiDeploymentPrefix:()=>sx,getCorpAiKey:()=>Ys,getCorpAiModel:()=>zr,getCorpAiOverrides:()=>cx,getCorpAiOverridesRaw:()=>lx,getEmbedProvider:()=>fx,getEmbeddingApiVersion:()=>vx,getEmbeddingDimensions:()=>yx,getEmbeddingModel:()=>bx,getLocalAiBaseUrl:()=>Id,getLocalAiKey:()=>Td,getLocalAiModel:()=>jr,getLocalAiModels:()=>a2,getLocalAiReasoningModels:()=>dx,getProvider:()=>Vs,getRagMinScore:()=>Sf,getRagTopK:()=>Lf,getVoyageKey:()=>gx,getVoyageModel:()=>hx,isLocalReasoningModel:()=>Ld,isRagAvailable:()=>v2,resolveCorpAiEndpoint:()=>Tf,resolveEmbeddingEndpoint:()=>Xs,setClaudeApiKey:()=>wf,setClaudeModel:()=>YS,setCorpAiBaseUrl:()=>ZS,setCorpAiDeploymentPrefix:()=>QS,setCorpAiKey:()=>JS,setCorpAiModel:()=>XS,setCorpAiOverridesRaw:()=>e2,setEmbedProvider:()=>d2,setEmbeddingApiVersion:()=>f2,setEmbeddingDimensions:()=>g2,setEmbeddingModel:()=>u2,setLocalAiBaseUrl:()=>o2,setLocalAiKey:()=>n2,setLocalAiModel:()=>r2,setLocalAiModels:()=>i2,setLocalAiReasoningModels:()=>s2,setProvider:()=>VS,setRagMinScore:()=>b2,setRagTopK:()=>h2,setVoyageKey:()=>m2,setVoyageModel:()=>p2});function Vs(){let e=da.get();return e==="corp"||e==="local"?e:KS}function VS(e){da.set(e)}function Ed(){return Xl.get()||WS}function YS(e){Xl.set(e)}function kf(){return Jl.get()}function wf(e){Jl.set(e.trim())}function zr(){let e=ma.get();return e&&xf.some(t=>t.id===e)?e:GS}function XS(e){ma.set(e)}function Ys(){return Zl.get()}function JS(e){Zl.set(e)}function Ef(){return no.get().replace(/\/$/,"")}function ZS(e){no.set(e.trim())}function sx(){return pa.get()}function QS(e){pa.set(e.trim())}function If(e){let t=sx(),o=e.replace(/\./g,"");return t+o}function lx(){return Ql.get()}function e2(e){Ql.set(e.trim())}function cx(){let e=lx();if(!e)return{};try{let t=JSON.parse(e);if(t&&typeof t=="object")return t}catch{}return{}}function Tf(e){let o=ii(e)?.reasoning?"2024-12-01-preview":"2024-06-01",n=cx()[e]||{};return{baseUrl:(n.baseUrl||Ef()||"").replace(/\/$/,""),apiVersion:n.apiVersion||o,deploymentId:n.deploymentId||If(e)}}function t2(){let e=Vs();return e==="corp"?zr():e==="local"?jr():Ed()}function ii(e){return xf.find(t=>t.id===e)||null}function Id(){return tc.get().replace(/\/$/,"")}function o2(e){tc.set(e.trim())}function Td(){return oc.get()}function n2(e){oc.set(e.trim())}function jr(){return nc.get()}function r2(e){nc.set(e.trim())}function a2(){let e=rc.get();if(!e)return[];try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(o=>typeof o=="string"&&o.trim())}catch{}return[]}function i2(e){rc.set(JSON.stringify(e.filter(t=>t.trim())))}function dx(){let e=ac.get();return e?e.split(/[\s,]+/).map(t=>t.trim().toLowerCase()).filter(Boolean):[]}function s2(e){ac.set(e.trim())}function Ld(e){let t=e.toLowerCase();return dx().some(o=>t.includes(o))}function fx(){return ua.get()==="voyage"?"voyage":"auto"}function d2(e){ua.set(e)}function gx(){return ic.get()}function m2(e){ic.set(e.trim())}function hx(){return fa.get()||ux}function p2(e){fa.set(e.trim())}function bx(){return ga.get()||mx}function u2(e){ga.set(e.trim())}function vx(){return ha.get()||px}function f2(e){ha.set(e.trim())}function yx(){let e=ba.get().trim();if(!e)return null;let t=parseInt(e,10);return Number.isFinite(t)&&t>0?t:null}function g2(e){ba.set(e.trim())}function Lf(){let e=parseInt(va.get(),10);return Number.isFinite(e)&&e>0?e:8}function h2(e){va.set(e.trim())}function Sf(){let e=parseFloat(ya.get());return Number.isFinite(e)?e:.2}function b2(e){ya.set(e.trim())}function Xs(){let e=yx();if(fx()==="voyage"){let n=gx();return n?{provider:"voyage",kind:"voyage",url:"https://api.voyageai.com/v1/embeddings",apiKey:n,authStyle:"bearer",model:hx(),dimensions:e}:null}let t=Vs(),o=bx();if(t==="corp"){let n=Ef();if(!n)return null;let r=If(o),a=vx();return{provider:"corp",kind:"openai",url:`${n}/openai/deployments/${r}/embeddings?api-version=${encodeURIComponent(a)}`,apiKey:Ys(),authStyle:"azure",model:o,dimensions:e}}if(t==="local"){let n=Id();return n?{provider:"local",kind:"openai",url:`${n}/embeddings`,apiKey:Td(),authStyle:"bearer",model:o,dimensions:e}:null}return null}function v2(){return Xs()!==null}var xf,$S,KS,WS,GS,l2,mx,px,c2,ux,At=L(()=>{"use strict";ve();xf=[{id:"gpt-5",reasoning:!0,vision:!0},{id:"gpt-5-mini",reasoning:!0,vision:!0},{id:"gpt-5-nano",reasoning:!0,vision:!0},{id:"o3",reasoning:!0,vision:!0},{id:"o4-mini",reasoning:!0,vision:!0},{id:"gpt-4.1",reasoning:!1,vision:!0},{id:"gpt-4.1-mini",reasoning:!1,vision:!0},{id:"gpt-4.1-nano",reasoning:!1,vision:!0},{id:"gpt-4o",reasoning:!1,vision:!0},{id:"gpt-4o-mini",reasoning:!1,vision:!0}],$S=[{id:"claude-opus-4-5",label:"Claude Opus 4.5"},{id:"claude-sonnet-4-5",label:"Claude Sonnet 4.5"},{id:"claude-haiku-4-5",label:"Claude Haiku 4.5"}],KS="claude",WS="claude-sonnet-4-5",GS="gpt-4.1-mini";l2=["text-embedding-3-small","text-embedding-3-large","text-embedding-ada-002"],mx="text-embedding-3-small",px="2024-02-01",c2=["voyage-3.5-lite","voyage-3.5","voyage-3-large","voyage-code-3"],ux="voyage-3.5-lite"});var Cf={};q(Cf,{callClaude:()=>Pf,callClaudeRaw:()=>xx,callClaudeText:()=>kx,getApiKey:()=>qr,setApiKey:()=>Mf});function qr(){return kf()||null}function Mf(e){wf(e)}async function xx(e){let t=qr();if(!t)throw new Error("API\u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o={model:e.model||y2,max_tokens:e.maxTokens||4096,messages:e.messages};e.system&&(o.system=e.system),e.tools&&e.tools.length>0&&(o.tools=e.tools),e.stream&&(o.stream=!0);let n=0;for(;;){let r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":t,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true","content-type":"application/json"},body:JSON.stringify(o),signal:e.signal});if(r.ok)return e.stream&&r.body?await x2(r.body,e.stream):await r.json();if(r.status===429&&n<3){let i=parseFloat(r.headers.get("retry-after")||"0"),s=i>0?i*1e3:Math.min(8e3,1e3*Math.pow(2,n));await new Promise(l=>setTimeout(l,s)),n++;continue}let a="";try{let i=await r.json();i.error?.message&&(a=" \u2014 "+i.error.message)}catch{}throw new Error("Claude API\u5931\u6557: "+r.status+a)}}async function x2(e,t){let o=e.getReader(),n=new TextDecoder,r="",a=[],i={},s="end_turn";function l(c,d){if(!d)return;let p;try{p=JSON.parse(d)}catch{return}let u=p;if(c==="content_block_start"){let f=u.index,g=u.content_block;a[f]=g.type==="text"?{type:"text",text:""}:{...g},g.type==="tool_use"&&(i[f]="")}else if(c==="content_block_delta"){let f=u.index,g=u.delta,y=a[f];g.type==="text_delta"&&y&&y.type==="text"?(y.text+=g.text||"",t.onText&&t.onText(g.text||"")):g.type==="input_json_delta"&&(i[f]=(i[f]||"")+(g.partial_json||""))}else if(c==="content_block_stop"){let f=u.index,g=a[f];if(g&&g.type==="tool_use"){try{g.input=i[f]?JSON.parse(i[f]):{}}catch{g.input={}}t.onToolUse&&t.onToolUse(g)}}else if(c==="message_delta"){let f=u.delta;f?.stop_reason&&(s=f.stop_reason)}}for(;;){let{value:c,done:d}=await o.read();if(d)break;r+=n.decode(c,{stream:!0});let p;for(;(p=r.indexOf(`

`))>=0;){let u=r.slice(0,p);r=r.slice(p+2);let f="",g="";for(let y of u.split(`
`))y.startsWith("event:")?f=y.slice(6).trim():y.startsWith("data:")&&(g+=y.slice(5).trim());l(f,g)}}return{content:a.filter(Boolean),stop_reason:s}}async function kx(e,t,o={}){return(await xx({messages:e,system:t,model:o.model,maxTokens:o.maxTokens})).content.filter(r=>r.type==="text").map(r=>r.text).join(`
`)}var y2,Pf,si=L(()=>{"use strict";At();y2="claude-sonnet-4-5";Pf=kx});var Tx={};q(Tx,{insertAiBlock:()=>w2,reattachAiBlocks:()=>k2});function k2(e){e.querySelectorAll(".memola-ai-block").forEach(t=>{if(t.dataset.aibBound==="1")return;t.dataset.aibBound="1";let o=t.dataset.aibAction||"",n=t.dataset.aibResult||"",r=Af.find(a=>a.key===o)||{key:o,label:o,prompt:""};n?Ix(t,r,n):(t.innerHTML=wx(),Ex(t))})}function w2(){let e=Pe(),t=window.getSelection();if(!t||!t.rangeCount)return;let o=document.createElement("div");o.className="memola-ai-block",o.contentEditable="false",o.innerHTML=wx();let n=t.getRangeAt(0),r=n.startContainer;for(;r&&r.parentElement!==e;)r=r.parentElement;r&&r!==e?(e.insertBefore(o,r.nextSibling),r.textContent?.trim()||r.remove()):n.insertNode(o);let a=document.createElement("p");a.appendChild(document.createElement("br")),e.insertBefore(a,o.nextSibling),Ex(o),Do()}function wx(){return'<div class="memola-aib-head"><span class="memola-aib-title">\u2726 AI \u30D6\u30ED\u30C3\u30AF</span><span class="memola-aib-hint">\u30A2\u30AF\u30B7\u30E7\u30F3\u3092\u9078\u629E</span></div><div class="memola-aib-actions">'+Af.map(e=>'<button class="memola-aib-action" data-action="'+e.key+'">'+e.label+"</button>").join("")+'<button class="memola-aib-action memola-aib-cancel" data-action="cancel">\xD7</button></div>'}function Ex(e){e.querySelectorAll(".memola-aib-action").forEach(t=>{t.addEventListener("click",()=>{let o=t.dataset.action;if(o==="cancel"){e.remove(),Do();return}let n=Af.find(r=>r.key===o);n&&Bf(e,n)})})}async function Bf(e,t){let o=Ve(pn());e.innerHTML='<div class="memola-aib-head"><span class="memola-aib-title">\u2726 '+M(t.label)+'</span><span class="memola-aib-hint">\u8003\u3048\u4E2D\u2026</span></div><div class="memola-aib-body memola-aib-loading">\u2026</div>';try{let n=await Pf([{role:"user",content:t.prompt+`

--- \u30DA\u30FC\u30B8\u672C\u6587 ---
`+o}],"\u3042\u306A\u305F\u306F Memola \u306EAI\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u3067\u3059\u3002\u7C21\u6F54\u3067\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u3067\u7B54\u3048\u3066\u304F\u3060\u3055\u3044\u3002");Ix(e,t,n)}catch(n){e.innerHTML='<div class="memola-aib-head"><span class="memola-aib-title">\u2726 '+M(t.label)+'</span></div><div class="memola-aib-body memola-aib-error">\u26A0\uFE0F '+M(n.message)+'</div><div class="memola-aib-foot"><button class="memola-aib-btn memola-aib-retry" data-action="retry">\u518D\u8A66\u884C</button><button class="memola-aib-btn memola-aib-discard" data-action="discard">\u7834\u68C4</button></div>',e.querySelector(".memola-aib-retry")?.addEventListener("click",()=>Bf(e,t)),e.querySelector(".memola-aib-discard")?.addEventListener("click",()=>{e.remove()})}}function Ix(e,t,o){e.dataset.aibAction=t.key,e.dataset.aibResult=o,e.innerHTML='<div class="memola-aib-head"><span class="memola-aib-title">\u2726 '+M(t.label)+'</span><button class="memola-aib-regen" title="\u518D\u751F\u6210">\u21BB</button></div><div class="memola-aib-body">'+E2(M(o))+'</div><div class="memola-aib-foot"><button class="memola-aib-btn memola-aib-adopt" data-action="adopt">\u63A1\u7528</button><button class="memola-aib-btn memola-aib-edit" data-action="edit">\u7DE8\u96C6</button><button class="memola-aib-btn memola-aib-discard" data-action="discard">\u7834\u68C4</button></div>',e.querySelector(".memola-aib-regen")?.addEventListener("click",()=>Bf(e,t)),e.querySelector(".memola-aib-adopt")?.addEventListener("click",()=>{let n=Pe(),r=o.split(/\n+/).filter(i=>i.trim()),a=e.nextSibling;r.forEach(i=>{let s=document.createElement("p");s.textContent=i,n.insertBefore(s,a)}),e.remove(),Do(),w("AI\u30D6\u30ED\u30C3\u30AF\u3092\u63A1\u7528\u3057\u307E\u3057\u305F")}),e.querySelector(".memola-aib-edit")?.addEventListener("click",()=>{let n=e.querySelector(".memola-aib-body");n.contentEditable="true",n.focus()}),e.querySelector(".memola-aib-discard")?.addEventListener("click",()=>{e.remove(),Do()})}function E2(e){return e.replace(/\n/g,"<br>")}var Af,Lx=L(()=>{"use strict";me();le();gt();si();Tt();ht();De();Af=[{key:"summarize",label:"\u8981\u7D04",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u5185\u5BB9\u30923\u884C\u3067\u7C21\u6F54\u306B\u8981\u7D04\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{key:"rewrite",label:"\u6539\u7A3F",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u672C\u6587\u3092\u3001\u3088\u308A\u8AAD\u307F\u3084\u3059\u304F\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u306B\u66F8\u304D\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{key:"translate",label:"\u82F1\u8A33",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u672C\u6587\u3092\u81EA\u7136\u306A\u82F1\u8A9E\u306B\u7FFB\u8A33\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{key:"actions",label:"\u30A2\u30AF\u30B7\u30E7\u30F3\u62BD\u51FA",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u5185\u5BB9\u304B\u3089\u3001ToDo\u30FB\u30A2\u30AF\u30B7\u30E7\u30F3\u30A2\u30A4\u30C6\u30E0\u3092\u7B87\u6761\u66F8\u304D\u3067\u62BD\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002"}]});function I2(e){return/^\\\\/.test(e)?"file://"+e.slice(2).replace(/\\/g,"/"):e}function Js(e,t){let o=new Map;Array.from(e.children).forEach(i=>{let s=i.dataset?.blockId;s&&o.set(s,i)});let n=new Set,r=0;for(let i of t){n.add(i.id);let s=o.get(i.id),l;s?s.dataset.blockKind===i.kind?(T2(s,i),l=s):(l=Sx(i),s.replaceWith(l)):l=Sx(i);let c=e.children[r];c!==l&&e.insertBefore(l,c||null),r++}Array.from(e.children).slice(r).forEach(i=>i.remove());for(let[i,s]of o)!n.has(i)&&s.isConnected&&s.remove();let a=t.length===1&&t[0].kind==="p"&&t[0].inline.length===0;e.classList.toggle("memola-editor-empty",a)}function Sx(e){let t=document.createElement("div");return t.dataset.blockId=e.id,t.dataset.blockKind=e.kind,t.dataset.blockHash=JSON.stringify(e,An),t.className="memola-blk memola-blk-"+e.kind,Mx(t,e),t}function T2(e,t){let o=JSON.stringify(t,An);e.dataset.blockHash!==o&&(e.dataset.blockHash=o,Mx(e,t))}function Mx(e,t){switch(e.innerHTML="",t.kind){case"p":case"h1":case"h2":case"h3":{let o=document.createElement(t.kind);$r(o,t.inline),e.appendChild(o);break}case"todo":{let o=document.createElement("input");o.type="checkbox",o.className="memola-todo-cb",o.checked=t.checked;let n=document.createElement("span");n.className="memola-todo-txt",$r(n,t.inline),e.appendChild(o),e.appendChild(n);break}case"code":{let o=document.createElement("pre"),n=document.createElement("code");t.lang&&(n.className="language-"+t.lang);let r=t.text.split(`
`);for(let a=0;a<r.length;a++)r[a]&&n.appendChild(document.createTextNode(r[a])),a<r.length-1&&n.appendChild(document.createElement("br"));(t.text===""||t.text.endsWith(`
`))&&n.appendChild(document.createElement("br")),o.appendChild(n),e.appendChild(o);break}case"rule":{let o=document.createElement("hr");e.appendChild(o);break}case"quote":{let o=document.createElement("blockquote"),n=document.createElement("div");for(Js(n,t.children);n.firstChild;)o.appendChild(n.firstChild);e.appendChild(o);break}case"callout":{let o=document.createElement("span");o.className="memola-callout-ic",o.contentEditable="false",o.textContent=t.emoji;let n=document.createElement("div");n.className="memola-callout-body",Js(n,t.children),e.appendChild(o),e.appendChild(n);break}case"list":{let o=document.createElement(t.ordered?"ol":"ul");for(let n of t.items){let r=document.createElement("li");Js(r,n),o.appendChild(r)}e.appendChild(o);break}case"table":{e.contentEditable="false";let o=document.createElement("table");o.className="memola-itbl",o.dataset.hrow=t.hrow?"1":"0",o.dataset.hcol=t.hcol?"1":"0";let n=t.rows[0]?.length||0;if(n>0){let i=document.createElement("colgroup");for(let s=0;s<n;s++){let l=document.createElement("col"),c=t.colWidths?.[s];typeof c=="number"&&c>0&&(l.style.width=c+"px"),i.appendChild(l)}o.appendChild(i)}let r=document.createElement("tbody");for(let i=0;i<t.rows.length;i++){let s=t.rows[i],l=document.createElement("tr");for(let c=0;c<s.length;c++){let d=document.createElement("td");d.contentEditable="true";let p=t.cellBg?.[i]?.[c];p&&(d.style.background=p),$r(d,s[c]),l.appendChild(d)}r.appendChild(l)}o.appendChild(r);let a=document.createElement("div");a.className="memola-itbl-wrap",a.appendChild(o),e.appendChild(a);break}case"linkdb":{e.contentEditable="false";let o=document.createElement("div");o.className="memola-linkdb",o.dataset.dbId=t.dbId,o.dataset.view=t.view,t.filter&&(o.dataset.filter=t.filter),t.sort&&(o.dataset.sort=t.sort),e.appendChild(o),Promise.resolve().then(()=>(ix(),ax)).then(n=>n.renderAllLinkedDbs(e));break}case"ai":{e.contentEditable="false";let o=document.createElement("div");o.className="memola-ai-block",o.dataset.aibAction=t.prompt,o.dataset.aibResult=t.result,e.appendChild(o),Promise.resolve().then(()=>(Lx(),Tx)).then(n=>n.reattachAiBlocks(e));break}case"image":{e.contentEditable="false";let o=document.createElement("span");o.className="memola-img-wrap";let n=document.createElement("img");n.src=t.src,n.alt=t.alt,n.className="memola-img",typeof t.width=="number"&&t.width>0&&(n.style.width=t.width+"px",o.style.width=t.width+"px"),o.appendChild(n);let r=document.createElement("span");r.className="memola-img-resize",r.contentEditable="false",o.appendChild(r),e.appendChild(o);break}case"email":{e.contentEditable="false";let o=document.createElement("div");o.className="memola-email-chip",o.contentEditable="false";let n=document.createElement("span");n.className="memola-email-ic",n.textContent="\u{1F4E7}";let r=document.createElement("div");r.className="memola-email-body";let a=document.createElement("div");a.className="memola-email-subj",a.textContent=t.subject||"(\u4EF6\u540D\u306A\u3057)";let i=document.createElement("div");i.className="memola-email-meta",i.textContent=[t.from,t.date].filter(Boolean).join(" \u30FB "),r.append(a),i.textContent&&r.append(i);let s=document.createElement("button");s.className="memola-email-src",s.type="button",s.textContent="\u30BD\u30FC\u30B9\u3092\u8868\u793A",s.title="Outlook \u3067\u3053\u306E\u30E1\u30FC\u30EB\u3092\u958B\u304F (InternetMessageId \u691C\u7D22)",s.dataset.emailSrc=t.imid,t.imid||(s.disabled=!0,s.title="Message-Id \u304C\u53D6\u5F97\u3067\u304D\u306A\u304B\u3063\u305F\u305F\u3081\u958B\u3051\u307E\u305B\u3093"),o.append(n,r,s),e.appendChild(o);break}}}function $r(e,t){if(t.length===0){e.appendChild(document.createElement("br"));return}for(let o of t)e.appendChild(L2(o));t[t.length-1].kind==="br"&&e.appendChild(document.createElement("br"))}function L2(e){switch(e.kind){case"text":return document.createTextNode(e.text);case"br":return document.createElement("br");case"code":{let t=document.createElement("code");return t.textContent=e.text,t}case"bold":{let t=document.createElement("strong");return $r(t,e.children),t}case"italic":{let t=document.createElement("em");return $r(t,e.children),t}case"strike":{let t=document.createElement("s");return $r(t,e.children),t}case"link":{let t=document.createElement("a");return t.dataset.href=e.href,t.href=I2(e.href),t.title=e.href,/^https?:/i.test(t.getAttribute("href")||"")&&(t.target="_blank",t.rel="noopener noreferrer"),$r(t,e.children),t}case"pagelink":{let t=document.createElement("a");return t.className="memola-page-link",t.dataset.pageId=e.pageId,t.contentEditable="false",t.textContent=e.alias||e.pageId,t}case"dailylink":{let t=document.createElement("a");return t.className="memola-page-link memola-daily-link",t.dataset.dailyDate=e.date,t.contentEditable="false",t.textContent=e.alias||e.date,t}}}var Px=L(()=>{"use strict";qa()});function Cx(e){let t=e;for(;t;){if(t.nodeType===1){let o=t;if(o.dataset?.blockId)return o}t=t.parentNode}return null}function Ax(e,t,o){let n=0,r=-1,a=i=>{if(i===t){if(i.nodeType===3)return r=n+Math.min(o,(i.textContent||"").length),!0;let c=0;for(let d of Array.from(i.childNodes)){if(c===o)return r=n,!0;if(a(d))return!0;c++}return r=n,!0}if(i.nodeType===3)return n+=(i.textContent||"").length,!1;if(i.nodeType!==1)return!1;let s=i;if(s.tagName.toLowerCase()==="br")return n+=1,!1;if(s.classList.contains("memola-page-link"))return n+=(s.textContent||"").length,!1;for(let c of Array.from(s.childNodes))if(a(c))return!0;return!1};for(let i of Array.from(e.childNodes))if(a(i))break;return r}function _o(e){let t=window.getSelection();if(!t||t.rangeCount===0)return null;let o=t.getRangeAt(0);if(!e.contains(o.startContainer))return null;let n=Cx(o.startContainer),r=Cx(o.endContainer);if(!n||!r)return null;let a=Ax(n,o.startContainer,o.startOffset),i=Ax(r,o.endContainer,o.endOffset);return a<0||i<0?null:o.collapsed?{kind:"caret",blockId:n.dataset.blockId,offset:a}:{kind:"range",anchorBlockId:n.dataset.blockId,anchorOffset:a,focusBlockId:r.dataset.blockId,focusOffset:i}}function Df(e,t){let o=0,n=null,r=a=>{if(n)return!0;if(a.nodeType===3){let l=(a.textContent||"").length;return o+l>=t?(n={node:a,offset:t-o},!0):(o+=l,!1)}if(a.nodeType!==1)return!1;let i=a;if(i.tagName.toLowerCase()==="br"){if(o+1>t){let l=i.parentNode,c=Array.from(l.childNodes).indexOf(i);return n={node:l,offset:c},!0}if(o+1===t){let l=i.parentNode,c=Array.from(l.childNodes).indexOf(i);return n={node:l,offset:c+1},!0}return o+=1,!1}if(i.classList.contains("memola-page-link")){let l=(i.textContent||"").length;if(o+l>=t){let c=i.parentNode,d=Array.from(c.childNodes).indexOf(i);return n={node:c,offset:t-o<=l/2?d:d+1},!0}return o+=l,!1}for(let l of Array.from(i.childNodes))if(r(l))return!0;return!1};for(let a of Array.from(e.childNodes))if(r(a))break;if(!n){let a=e.firstElementChild??e,i=S2(a);i?n={node:i,offset:(i.textContent||"").length}:n={node:a,offset:a.childNodes.length}}return n}function S2(e){let t=null,o=n=>{if(n.nodeType===3){t=n;return}if(n.nodeType===1)for(let r of Array.from(n.childNodes))o(r)};return o(e),t}function Bx(e,t){if(e.querySelectorAll(".memola-itbl-selcel").forEach(l=>{l.classList.remove("memola-itbl-selcel")}),!t)return;if(t.kind==="table-cells"){M2(e,t);let l=window.getSelection();l&&l.removeAllRanges();return}let o=window.getSelection();if(!o)return;if(t.kind==="caret"){let l=e.querySelector('[data-block-id="'+Sd(t.blockId)+'"]');if(!l)return;let c=Df(l,t.offset);if(!c)return;let d=document.createRange();d.setStart(c.node,c.offset),d.collapse(!0),o.removeAllRanges(),o.addRange(d);return}let n=e.querySelector('[data-block-id="'+Sd(t.anchorBlockId)+'"]'),r=e.querySelector('[data-block-id="'+Sd(t.focusBlockId)+'"]');if(!n||!r)return;let a=Df(n,t.anchorOffset),i=Df(r,t.focusOffset);if(!a||!i)return;let s=document.createRange();typeof o.setBaseAndExtent=="function"?o.setBaseAndExtent(a.node,a.offset,i.node,i.offset):(s.setStart(a.node,a.offset),s.setEnd(i.node,i.offset),o.removeAllRanges(),o.addRange(s))}function M2(e,t){let n=e.querySelector('[data-block-id="'+Sd(t.blockId)+'"]')?.querySelector("table.memola-itbl tbody");if(!n)return;let r=Math.min(t.anchor.row,t.focus.row),a=Math.max(t.anchor.row,t.focus.row),i=Math.min(t.anchor.col,t.focus.col),s=Math.max(t.anchor.col,t.focus.col);for(let l=r;l<=a;l++){let c=n.children[l];if(c)for(let d=i;d<=s;d++){let p=c.children[d];p&&p.classList.add("memola-itbl-selcel")}}}function Sd(e){return typeof CSS<"u"&&CSS.escape?CSS.escape(e):e.replace(/[^a-zA-Z0-9_-]/g,t=>"\\"+t)}var _f=L(()=>{"use strict"});function Rx(e,t,o){let r=t.target?.closest?.('[contenteditable="false"]');if(r&&o.contains(r))return{next:e,preventDefault:!1};let a=_o(o);if(!a)return{next:e,preventDefault:!1};switch(t.inputType){case"insertText":{let i=t.data??"";if(a.kind==="caret")return{next:Pr(e,a.blockId,a.offset,i),preventDefault:!0};let s=Zs(e,a);return s.cursor?{next:Pr(s.state,s.cursor.blockId,s.cursor.offset,i),preventDefault:!0}:{next:e,preventDefault:!1}}case"insertParagraph":{if(a.kind==="caret"&&_x(e,a.blockId)){let c=B2(e,a.blockId,a.offset);return c?{next:c,preventDefault:!0}:{next:Pr(e,a.blockId,a.offset,`
`),preventDefault:!0}}if(a.kind!=="caret"){let c=Zs(e,a);return c.cursor?{next:Cu(c.state,c.cursor.blockId,c.cursor.offset),preventDefault:!0}:{next:e,preventDefault:!1}}let i=P2(e,a.blockId);if(i)return{next:i,preventDefault:!0};let s=_2(e,a.blockId);return s?{next:s,preventDefault:!0}:{next:Cu(e,a.blockId,a.offset),preventDefault:!0}}case"insertLineBreak":{if(a.kind==="caret"&&_x(e,a.blockId))return{next:Pr(e,a.blockId,a.offset,`
`),preventDefault:!0};if(a.kind==="caret")return{next:Pu(e,a.blockId,a.offset),preventDefault:!0};let i=Zs(e,a);return i.cursor?{next:Pu(i.state,i.cursor.blockId,i.cursor.offset),preventDefault:!0}:{next:e,preventDefault:!1}}case"deleteContentBackward":{if(a.kind==="caret"){if(a.offset>0){let f=C2(e,a.blockId,a.offset),g=f>0?-f:-1;return{next:Ga(e,a.blockId,a.offset,g),preventDefault:!0}}let s=H2(e,a.blockId);if(s)return{next:s,preventDefault:!0};let l=U2(e,a.blockId);if(l)return{next:l,preventDefault:!0};let c=R2(e,a.blockId);if(c)return{next:c,preventDefault:!0};let d=Zc(e,a.blockId);if(d!==e)return{next:d,preventDefault:!0};let p=D2(e,a.blockId);if(p)return{next:p,preventDefault:!0};let u=F2(e,a.blockId);return u?{next:u,preventDefault:!0}:{next:e,preventDefault:!0}}return{next:Zs(e,a).state,preventDefault:!0}}case"deleteContentForward":{if(a.kind==="caret"){let s=A2(e,a.blockId,a.offset),l=s>0?s:1;return{next:Ga(e,a.blockId,a.offset,l),preventDefault:!0}}return{next:Zs(e,a).state,preventDefault:!0}}default:return{next:e,preventDefault:!1}}}function Zs(e,t){if(t.kind!=="range")return{state:e,cursor:null};if(t.anchorBlockId===t.focusBlockId){let g=Math.min(t.anchorOffset,t.focusOffset),y=Math.max(t.anchorOffset,t.focusOffset);return{state:Ga(e,t.anchorBlockId,g,y-g),cursor:{blockId:t.anchorBlockId,offset:g}}}let o=e.blocks,n=o.findIndex(g=>g.id===t.anchorBlockId),r=o.findIndex(g=>g.id===t.focusBlockId);if(n<0||r<0)return{state:e,cursor:null};let a=Math.min(n,r),i=Math.max(n,r),s=n<=r?t.anchorOffset:t.focusOffset,l=n<=r?t.focusOffset:t.anchorOffset,c=o[a],d=o[i];if(!("inline"in c)||!("inline"in d))return{state:e,cursor:null};let p=[...Dx(c.inline,0,s),...Dx(d.inline,l,Number.POSITIVE_INFINITY)],u={...c,inline:p},f=[...o.slice(0,a),u,...o.slice(i+1)];return{state:{...e,blocks:f},cursor:{blockId:u.id,offset:s}}}function Dx(e,t,o){return Le(e,t,o)}function P2(e,t){let o=Nx(e,t);if(!o)return null;let n=o.inner;if(!("inline"in n)||co(n.inline)>0)return null;let r=e.blocks.slice(),a=r[o.outerIdx],i=null;if(a.kind==="callout"||a.kind==="quote"){let c=a.children.filter(d=>d.id!==t);c.length>0&&(i={...a,children:c})}else if(a.kind==="list"){let c=a.items.map(d=>d.filter(p=>p.id!==t)).filter(d=>d.length>0);c.length>0&&(i={...a,items:c})}else return null;i?r[o.outerIdx]=i:r.splice(o.outerIdx,1);let s=nt(""),l=i?o.outerIdx+1:o.outerIdx;return r.splice(l,0,s),{...e,blocks:r,selection:{kind:"caret",blockId:s.id,offset:0}}}function C2(e,t,o){let n=e.blocks.find(a=>a.id===t);if(!n||!("inline"in n))return 0;let r=0;for(let a of n.inline){let i=0;if(a.kind==="text"||a.kind==="code"?i=a.text.length:a.kind==="br"?i=1:a.kind==="pagelink"?i=(a.alias||a.pageId).length:a.kind==="dailylink"?i=(a.alias||a.date).length:"children"in a&&(i=Rf(a.children)),r+i===o)return a.kind==="pagelink"||a.kind==="dailylink"?i:0;if(r+i>o)return 0;r+=i}return 0}function A2(e,t,o){let n=e.blocks.find(a=>a.id===t);if(!n||!("inline"in n))return 0;let r=0;for(let a of n.inline){let i=0;if(a.kind==="text"||a.kind==="code"?i=a.text.length:a.kind==="br"?i=1:a.kind==="pagelink"?i=(a.alias||a.pageId).length:a.kind==="dailylink"?i=(a.alias||a.date).length:"children"in a&&(i=Rf(a.children)),r===o)return a.kind==="pagelink"||a.kind==="dailylink"?i:0;if(r>o)return 0;r+=i}return 0}function Rf(e){let t=0;for(let o of e)o.kind==="text"||o.kind==="code"?t+=o.text.length:o.kind==="br"?t+=1:o.kind==="pagelink"?t+=(o.alias||o.pageId).length:o.kind==="dailylink"?t+=(o.alias||o.date).length:"children"in o&&(t+=Rf(o.children));return t}function B2(e,t,o){let n=e.blocks.findIndex(d=>d.id===t);if(n<0)return null;let r=e.blocks[n];if(r.kind!=="code"||o!==r.text.length||!(r.text===""||r.text.endsWith(`
`)))return null;let i=r.text.endsWith(`
`)?r.text.slice(0,-1):r.text,s=Q(),l={id:s,kind:"p",inline:[]},c=e.blocks.slice();return c[n]={...r,text:i},c.splice(n+1,0,l),{...e,blocks:c,selection:{kind:"caret",blockId:s,offset:0}}}function _x(e,t){if(e.blocks.find(r=>r.id===t)?.kind==="code")return!0;let n=e.blocks.slice();for(;n.length;){let r=n.shift();if(r.id===t)return r.kind==="code";if(r.kind==="callout"||r.kind==="quote")n.push(...r.children);else if(r.kind==="list")for(let a of r.items)n.push(...a)}return!1}function D2(e,t){let o=e.blocks.findIndex(a=>a.id===t);if(o<0)return null;let n=e.blocks[o];if(n.kind!=="code"||n.text!=="")return null;let r=e.blocks.slice();return r[o]={id:n.id,kind:"p",inline:[]},{...e,blocks:r,selection:{kind:"caret",blockId:n.id,offset:0}}}function _2(e,t){let o=e.blocks.findIndex(a=>a.id===t);if(o<0)return null;let n=e.blocks[o];if(n.kind!=="todo"||co(n.inline)>0)return null;let r=e.blocks.slice();return r[o]={id:n.id,kind:"p",inline:[]},{...e,blocks:r,selection:{kind:"caret",blockId:n.id,offset:0}}}function R2(e,t){for(let o=0;o<e.blocks.length;o++){let n=e.blocks[o];if(n.kind==="list"){let r=N2(e,n,o,t);if(r)return r}else if(n.kind==="quote"||n.kind==="callout"){let r=O2(e,n,o,t);if(r)return r}}return null}function N2(e,t,o,n){for(let r=0;r<t.items.length;r++){let a=t.items[r],i=a.findIndex(p=>p.id===n);if(i<0)continue;let s=a[i];if(!("inline"in s)||co(s.inline)>0)return null;if(a.length>1){let p=a.filter(y=>y.id!==n),u=t.items.slice();u[r]=p;let f=e.blocks.slice();f[o]={...t,items:u};let g=p[Math.max(0,i-1)];return"inline"in g?{...e,blocks:f,selection:{kind:"caret",blockId:g.id,offset:co(g.inline)}}:null}let l=t.items.filter((p,u)=>u!==r),c=e.blocks.slice();if(l.length===0){let p={id:n,kind:"p",inline:[]};return c.splice(o,1,p),{...e,blocks:c,selection:{kind:"caret",blockId:n,offset:0}}}if(c[o]={...t,items:l},r>0){let p=l[r-1],u=p[p.length-1];if("inline"in u)return{...e,blocks:c,selection:{kind:"caret",blockId:u.id,offset:co(u.inline)}}}let d=l[0][0];return{...e,blocks:c,selection:{kind:"caret",blockId:d.id,offset:0}}}return null}function O2(e,t,o,n){let r=t.children.findIndex(c=>c.id===n);if(r<0)return null;let a=t.children[r];if(!("inline"in a)||co(a.inline)>0)return null;let i=t.children.filter(c=>c.id!==n),s=e.blocks.slice();if(i.length===0){let c={id:n,kind:"p",inline:[]};return s.splice(o,1,c),{...e,blocks:s,selection:{kind:"caret",blockId:n,offset:0}}}if(s[o]={...t,children:i},r>0){let c=i[r-1];if("inline"in c)return{...e,blocks:s,selection:{kind:"caret",blockId:c.id,offset:co(c.inline)}}}let l=i[0];return{...e,blocks:s,selection:{kind:"caret",blockId:l.id,offset:0}}}function H2(e,t){let o=e.blocks.findIndex(n=>n.id===t);if(o<0)return null;if(e.blocks[o].kind==="image"||e.blocks[o].kind==="email"){let n=e.blocks.slice();if(n.splice(o,1),n.length===0){let i=nt("");return{...e,blocks:[i],selection:{kind:"caret",blockId:i.id,offset:0}}}let r=o>0?n[o-1]:n[o],a="inline"in r?co(r.inline):0;return{...e,blocks:n,selection:{kind:"caret",blockId:r.id,offset:a}}}if(o>0&&(e.blocks[o-1].kind==="image"||e.blocks[o-1].kind==="email")){let n=e.blocks.slice();return n.splice(o-1,1),{...e,blocks:n,selection:{kind:"caret",blockId:t,offset:0}}}return null}function F2(e,t){let o=e.blocks.findIndex(n=>n.id===t);if(o>0){let n=e.blocks[o],r=e.blocks[o-1];if(!("inline"in n))return null;if(r.kind==="code"){let a=It(n.inline),i=r.text===""||r.text.endsWith(`
`)?"":`
`,s=r.text+i+a,l=e.blocks.slice();return l[o-1]={...r,text:s},l.splice(o,1),{...e,blocks:l,selection:{kind:"caret",blockId:r.id,offset:r.text.length+i.length}}}if(r.kind==="list"&&r.items.length>0){let a=r.items[r.items.length-1],i=a[a.length-1];if(!("inline"in i))return null;let s=co(i.inline),l=Le(i.inline.concat(n.inline),0,1/0),c={...i,inline:l},d=[...a.slice(0,-1),c],p=[...r.items.slice(0,-1),d],u={...r,items:p},f=e.blocks.slice();return f[o-1]=u,f.splice(o,1),{...e,blocks:f,selection:{kind:"caret",blockId:i.id,offset:s}}}if("inline"in r){let a=co(r.inline),i={...r,inline:Le(r.inline.concat(n.inline),0,1/0)},s=e.blocks.slice();return s[o-1]=i,s.splice(o,1),{...e,blocks:s,selection:{kind:"caret",blockId:r.id,offset:a}}}}return null}function U2(e,t){let o=Nx(e,t);if(!o)return null;let n=e.blocks[o.outerIdx];if(n.kind==="callout"||n.kind==="quote"){if(n.children.length!==1)return null;let r=e.blocks.slice();return r.splice(o.outerIdx,1,o.inner),{...e,blocks:r,selection:{kind:"caret",blockId:o.inner.id,offset:0}}}if(n.kind==="list"){if(n.items.length!==1||n.items[0].length!==1)return null;let r=e.blocks.slice();return r.splice(o.outerIdx,1,o.inner),{...e,blocks:r,selection:{kind:"caret",blockId:o.inner.id,offset:0}}}return null}function Nx(e,t){for(let o=0;o<e.blocks.length;o++){let n=e.blocks[o];if(n.id===t)return null;if(n.kind==="callout"||n.kind==="quote"){let r=n.children.find(a=>a.id===t);if(r)return{outerIdx:o,inner:r}}if(n.kind==="list")for(let r of n.items){let a=r.find(i=>i.id===t);if(a)return{outerIdx:o,inner:a}}}return null}var Ox=L(()=>{"use strict";So();Vo();_f()});var Md,Hx=L(()=>{"use strict";Md=class{constructor(){this._undo=[];this._redo=[]}reset(t){this._undo=[{state:t,tag:"init",at:Date.now(),blockId:null}],this._redo=[]}push(t,o,n=null){let r=this._undo[this._undo.length-1],a=Date.now();!!r&&(o==="typing"||o==="delete")&&r.tag===o&&r.blockId===n&&a-r.at<750?r.state=t:(this._undo.push({state:t,tag:o,at:a,blockId:n}),this._undo.length>200&&this._undo.shift()),this._redo=[]}canUndo(){return this._undo.length>1}canRedo(){return this._redo.length>0}undo(){if(this._undo.length<=1)return null;let t=this._undo.pop();return this._redo.push(t),this._undo[this._undo.length-1].state}redo(){let t=this._redo.pop();return t?(this._undo.push(t),t.state):null}current(){let t=this._undo[this._undo.length-1];return t?t.state:null}}});function Fx(e,t={}){let o=new Md,n=Nv,r=new Set,a=!1,i=null;e.contentEditable="true",e.classList.add("memola-editor2");function s(h,v="mutate"){if(h===n)return;n=h;let k=h.selection,x=k?.kind==="caret"?k.blockId:k?.kind==="range"?k.focusBlockId:null;o.push(n,v,x),l(),c()}function l(){Js(e,n.blocks),Bx(e,n.selection)}function c(){for(let h of r)try{h(n.blocks)}catch{}}let d=h=>{if(a)return;let v=Rx(n,h,e);if(v.preventDefault&&h.preventDefault(),v.next!==n){let k=h.inputType.startsWith("insert")?"typing":h.inputType.startsWith("delete")?"delete":"structural";s(v.next,k)}},p=()=>{a=!0,e.classList.remove("memola-editor-empty");let h=_o(e);h?.kind==="caret"?i={blockId:h.blockId,offset:h.offset}:i=null},u=h=>{a=!1;let v=h.data||"";if(!i||!v){i=null,l();return}let k=i;i=null;let x=Pr(n,k.blockId,k.offset,v);s(x,"typing")},f=()=>{if(a)return;let h=_o(e);h&&(n={...n,selection:h})},g=h=>{let v=h.metaKey||h.ctrlKey;if(v&&h.key==="z"&&!h.shiftKey){h.preventDefault();let k=o.undo();k&&(n=k,l(),c());return}if(v&&h.key==="z"&&h.shiftKey||v&&h.key==="y"){h.preventDefault();let k=o.redo();k&&(n=k,l(),c());return}if(h.key==="Tab"&&!v){let k=n.selection,x=k?.kind==="caret"?k.blockId:k?.kind==="range"?k.focusBlockId:null;if(x){let T=h.shiftKey?Zc(n,x):qv(n,x);if(T!==n){h.preventDefault(),s(T,"structural");return}}}},y=h=>{let v=h.target;if(!v.classList.contains("memola-todo-cb"))return;let k=v.closest("[data-block-id]");if(!k)return;let x=k.dataset.blockId;s(Au(n,x),"structural")};return e.addEventListener("beforeinput",d),e.addEventListener("compositionstart",p),e.addEventListener("compositionend",u),e.addEventListener("keydown",g),e.addEventListener("change",y),document.addEventListener("selectionchange",f),{setBlocks(h,v={}){n={blocks:h,selection:null},o.reset(n),l(),v.silent||c()},getBlocks(){return n.blocks},getSelection(){return n.selection},reconcile(h){let v=_o(e)??n.selection;n={blocks:h,selection:v},l(),c()},isComposing(){return a},subscribe(h){return r.add(h),()=>r.delete(h)},destroy(){e.removeEventListener("beforeinput",d),e.removeEventListener("compositionstart",p),e.removeEventListener("compositionend",u),e.removeEventListener("keydown",g),e.removeEventListener("change",y),document.removeEventListener("selectionchange",f),r.clear(),e.contentEditable="false",e.classList.remove("memola-editor2"),a=!1,i=null},rerender:l,applyMutation(h,v="structural"){let k=h(n);s(k,v)},toggleTodoBlock(h){s(Au(n,h),"structural")},setBlockKind(h,v){s(rn(n,h,v),"structural")},toggleInlineFormat(h){let k=_o(e)??n.selection;if(!k||k.kind!=="range"||k.anchorBlockId!==k.focusBlockId)return;let x=Math.min(k.anchorOffset,k.focusOffset),T=Math.max(k.anchorOffset,k.focusOffset),I={...n,selection:{kind:"range",anchorBlockId:k.anchorBlockId,anchorOffset:x,focusBlockId:k.anchorBlockId,focusOffset:T}};s(Hv(I,k.anchorBlockId,x,T,h),"structural")},insertPagelink(h,v){let k=_o(e);!k||k.kind!=="caret"||s(Va(n,k.blockId,k.offset,h,v),"structural")},setLink(h){let k=_o(e)??n.selection;if(k)if(k.kind==="range"&&k.anchorBlockId===k.focusBlockId){let x=Math.min(k.anchorOffset,k.focusOffset),T=Math.max(k.anchorOffset,k.focusOffset),I={...n,selection:{kind:"range",anchorBlockId:k.anchorBlockId,anchorOffset:x,focusBlockId:k.anchorBlockId,focusOffset:T}};s(Uv(I,k.anchorBlockId,x,T,h),"structural")}else k.kind==="caret"&&h&&s(zv(n,k.blockId,k.offset,h),"structural")},insertBlockAfterCurrent(h){let v=_o(e),k=v?.kind==="caret"?v.blockId:v?.kind==="range"?v.focusBlockId:n.blocks[n.blocks.length-1]?.id;if(!k){s({blocks:[...n.blocks,h],selection:{kind:"caret",blockId:h.id,offset:0}},"structural");return}s(Ya(n,k,h),"structural")},undo(){let h=o.undo();return h?(n=h,l(),c(),!0):!1},redo(){let h=o.redo();return h?(n=h,l(),c(),!0):!1}}}var Ux=L(()=>{"use strict";So();Px();_f();Ox();Hx()});var Wx={};q(Wx,{hide:()=>Gr,markBrokenPageLinks:()=>$2,pagePickerActive:()=>Uf,pagePickerCommit:()=>Kx,pagePickerCount:()=>$x,pagePickerMove:()=>Of,showPagePicker:()=>li,updatePagePickerQuery:()=>Ff});function zx(e){let t=m.currentId,o=!!t&&A(t)?.scope==="org",n=r=>{if(r.IsDraft||r.Id===t)return!1;let a=A(r.Id);return!(a?.isTemplate||o&&a?.scope!=="org")};return e.dbsOnly?m.pages.filter(r=>r.Type==="database"&&n(r)):m.pages.filter(n)}function z2(){let e=document.getElementById("memola-page-picker");return e||(e=document.createElement("div"),e.id="memola-page-picker",e.className="memola-page-picker",e.style.display="none",(document.getElementById("memola-overlay")||document.body).appendChild(e),e)}function jx(e,t){let o=e.trim().toLowerCase(),n=(t??m.pages).filter(i=>!A(i.Id)?.trashed);if(!o)return n.slice(0,8);let r=i=>(i||"").toLowerCase();return n.map(i=>{let s=r(i.Title||""),l=-1;return s===o?l=100:s.startsWith(o)?l=80:s.includes(" "+o)?l=60:s.includes(o)&&(l=40),{p:i,score:l}}).filter(i=>i.score>=0).sort((i,s)=>s.score-i.score).slice(0,8).map(i=>i.p)}function j2(e){let t=[],o=e,n=0;for(;o&&n++<12;){let r=A(o);if(!r)break;if(r.parent){let a=A(r.parent);a&&t.unshift(a.title)}o=r.parent||""}return t.join(" / ")}function Hf(){if(!be)return;let{el:e,filtered:t,selIdx:o,opts:n}=be;if(e.innerHTML="",t.length===0){let s=document.createElement("div");s.className="memola-page-picker-empty",s.textContent="\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093",e.appendChild(s)}else t.forEach((s,l)=>{let d=A(s.Id)?.icon||(s.Type==="database"?"\u{1F5C3}":"\u{1F4C4}"),p=j2(s.Id),u=document.createElement("div");u.className="memola-page-picker-item"+(l===o?" sel":""),u.innerHTML='<span class="memola-page-picker-icon">'+M(d)+'</span><span class="memola-page-picker-name">'+M(s.Title||"\u7121\u984C")+"</span>"+(p?'<span class="memola-page-picker-path">'+M(p)+"</span>":""),u.addEventListener("mousedown",f=>{f.preventDefault(),qx(l)}),e.appendChild(u)});let r=n.anchor.bottom+window.scrollY+4,a=n.anchor.left+window.scrollX,i=window.innerWidth;a+320>i&&(a=i-324),e.style.top=r+"px",e.style.left=a+"px",e.style.display=""}function qx(e){if(!be)return;let t=be.filtered[e];if(!t)return;let o=be.opts.onSelect;Gr(!0),o(t)}function li(e){Gr();let t=z2(),o=e.query||"",n=zx(e);be={el:t,opts:e,query:o,filtered:jx(o,n),selIdx:0},Hf(),Kr&&document.removeEventListener("mousedown",Kr,!0),Kr=r=>{if(!be)return;let a=r.target;a&&(be.el.contains(a)||Gr())},document.addEventListener("mousedown",Kr,!0),Wr&&document.removeEventListener("keydown",Wr,!0),Wr=r=>{if(be&&!(r.isComposing||r.keyCode===229)){if(r.key==="Escape"){r.preventDefault(),r.stopPropagation(),Gr();return}if(r.key==="ArrowDown"){r.preventDefault(),r.stopPropagation(),Of(1);return}if(r.key==="ArrowUp"){r.preventDefault(),r.stopPropagation(),Of(-1);return}if(r.key==="Enter"){$x()>0&&(r.preventDefault(),r.stopPropagation(),Kx());return}}},document.addEventListener("keydown",Wr,!0)}function Ff(e){be&&(be.query=e,be.filtered=jx(e,zx(be.opts)),be.selIdx>=be.filtered.length&&(be.selIdx=0),Hf())}function Uf(){return!!be}function $x(){return be?be.filtered.length:0}function Of(e){if(!be||be.filtered.length===0)return;let t=be.filtered.length;be.selIdx=(be.selIdx+e+t)%t,q2(),Hf()}function q2(){if(be&&(be.el.classList.add("kb-mode"),!Nf)){let e=()=>{be&&be.el.classList.remove("kb-mode"),document.removeEventListener("mousemove",e,!0),Nf=null};Nf=e,document.addEventListener("mousemove",e,!0)}}function Kx(){be&&qx(be.selIdx)}function $2(e){let t=e.querySelectorAll("a.memola-page-link"),o=new Set;t.forEach(n=>{let r=n.getAttribute("data-page-id")||"",a=n.getAttribute("data-pending")==="1",i=n.getAttribute("data-daily-date")||"";if(i){n.classList.add("ghosted"),o.add(i);return}if(r){let s=m.pages.some(l=>l.Id===r);n.classList.toggle("broken",!s)}else if(a){let s=(n.textContent||"").trim(),l=m.pages.find(c=>(c.Title||"")===s);l?(n.setAttribute("data-page-id",l.Id),n.removeAttribute("data-pending"),n.classList.remove("broken")):n.classList.add("broken")}}),o.size!==0&&(async()=>{try{let n=await Promise.resolve().then(()=>(Sn(),Ra));for(let r of o)await n.findNoteForDate(r).catch(()=>null)&&e.querySelectorAll('a.memola-page-link[data-daily-date="'+r+'"]').forEach(i=>i.classList.remove("ghosted"))}catch{}})()}function Gr(e=!1){if(be){be.el.style.display="none";let t=be.opts.onCancel;be=null,!e&&t&&t()}else be=null;Kr&&(document.removeEventListener("mousedown",Kr,!0),Kr=null),Wr&&(document.removeEventListener("keydown",Wr,!0),Wr=null)}var be,Kr,Wr,Nf,Pd=L(()=>{"use strict";j();De();ye();be=null,Kr=null,Wr=null;Nf=null});function Vx(e){let o=document.querySelector('[data-block-id="'+CSS.escape(e)+'"]')?.getBoundingClientRect();return o?{bottom:o.bottom,left:o.left}:{bottom:window.innerHeight/2,left:window.innerWidth/2}}function K2(e,t){li({anchor:Vx(t),onSelect:o=>{e.applyMutation(n=>{let r=n.blocks.findIndex(l=>l.id===t);if(r<0)return n;let a=n.blocks.slice(),i=a[r];"inline"in i&&(a[r]={...i,inline:[]});let s={...n,blocks:a,selection:{kind:"caret",blockId:t,offset:0}};return Va(s,t,0,o.Id,o.Title||"")},"structural")}})}function W2(e,t){li({anchor:Vx(t),dbsOnly:!0,onSelect:o=>{e.applyMutation(n=>{let r=n.blocks.findIndex(s=>s.id===t);if(r<0)return n;let a=Qv(o.Id),i=n.blocks.slice();return i[r]=a,{...n,blocks:i,selection:{kind:"caret",blockId:a.id,offset:0}}},"structural")}})}function Vr(e,t,o){let n=e.blocks.findIndex(a=>a.id===t);if(n<0)return e;let r=e.blocks.slice();return r[n]=o,{...e,blocks:r,selection:{kind:"caret",blockId:o.id,offset:0}}}function Yx(e,t){let o=null,n=null,r="",a=0;function i(v){let x=e.getBlocks().find(I=>I.id===v);return!x||x.kind!=="p"?!1:x.inline.map(I=>I.kind==="text"?I.text:"").join("")===""}function s(){let v=window.getSelection();if(!v||v.rangeCount===0)return null;let k=v.getRangeAt(0).getBoundingClientRect();return k.width===0&&k.height===0?v.anchorNode?.parentElement?.closest("[data-block-id]")?.getBoundingClientRect()||null:k}function l(v){n=v,r="",a=0,o||(o=document.createElement("div"),o.className="memola-slash memola-slash2",o.style.cssText='position:absolute; z-index:2147483647; min-width:260px; max-width:320px; background:#fff; border:1px solid #e9e9e7; border-radius:6px; box-shadow:0 8px 24px rgba(0,0,0,0.12); max-height:340px; overflow-y:auto; font-size:14px; line-height:1.4; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Hiragino Sans","Noto Sans JP",sans-serif; color:#37352f;',(document.getElementById("memola-overlay")||document.body).appendChild(o));let k=s();k&&(o.style.top=k.bottom+window.scrollY+4+"px",o.style.left=k.left+window.scrollX+"px"),u()}function c(){o&&(o.remove(),o=null),n=null,r=""}function d(){return!!o}function p(){if(!r)return Gx;let v=r.toLowerCase();return Gx.filter(k=>k.cmd.toLowerCase().includes(v)||k.label.toLowerCase().includes(v)||k.hint&&k.hint.toLowerCase().startsWith(v))}function u(){if(!o)return;let v=p();if(a>=v.length&&(a=0),v.length===0){o.innerHTML='<div style="padding:12px; color:#9b9a97; font-size:13px;">\u8A72\u5F53\u306A\u3057</div>';return}o.innerHTML="",v.forEach((x,T)=>{let I=document.createElement("div");I.className="memola-slash2-item"+(T===a?" on":""),I.style.cssText="padding:6px 10px; cursor:pointer; display:flex; align-items:center; gap:8px;"+(T===a?"background:#f1f1ef;":""),I.innerHTML='<div style="flex:1; min-width:0;"><div style="font-weight:500; font-size:14px;">'+zf(x.label)+'</div><div style="font-size:11px; color:#9b9a97;">'+zf(x.desc)+"</div></div>"+(x.hint?'<div style="font-family:ui-monospace,monospace; font-size:11px; color:#9b9a97; flex-shrink:0;">'+zf(x.hint)+"</div>":""),I.addEventListener("mousedown",B=>{B.preventDefault(),f(x)}),o.appendChild(I)}),o.children[a]?.scrollIntoView({block:"nearest",inline:"nearest"})}function f(v){if(!n){c();return}let k=n;if(v.pickAndApply){c(),v.pickAndApply(e,k);return}if(!v.apply){c();return}let x=v.apply;e.applyMutation(T=>{let I=T.blocks.findIndex(H=>H.id===k);if(I<0)return x(T,k);let B=T.blocks.slice(),F=B[I];"inline"in F&&(B[I]={...F,inline:[]});let P={...T,blocks:B,selection:{kind:"caret",blockId:k,offset:0}};return x(P,k)},"structural"),c()}function g(){let v=p();v[a]&&f(v[a])}let y=v=>{if(d()){if(v.key==="Escape"){v.preventDefault(),c();return}if(v.key==="ArrowDown"){v.preventDefault(),a=Math.min(a+1,p().length-1),u();return}if(v.key==="ArrowUp"){v.preventDefault(),a=Math.max(a-1,0),u();return}if(v.key==="Enter"){v.preventDefault(),g();return}if(v.key==="Backspace"){if(r.length===0){v.preventDefault();let k=n;k&&e.applyMutation(x=>{let T=x.blocks.findIndex(F=>F.id===k);if(T<0)return x;let I=x.blocks.slice(),B=I[T];return"inline"in B&&(I[T]={...B,inline:[]}),{...x,blocks:I,selection:{kind:"caret",blockId:k,offset:0}}},"structural"),c();return}r=r.slice(0,-1),u();return}if(v.key.length===1&&!v.metaKey&&!v.ctrlKey&&!v.altKey){r+=v.key,u();return}}};t.addEventListener("keydown",y,!0);let b=e.subscribe(v=>{if(d())return;let k=window.getSelection();if(!k||k.rangeCount===0)return;let x=k.getRangeAt(0);if(!x.collapsed)return;let T=x.startContainer?.parentElement?.closest("[data-block-id]");if(!T)return;let I=T.dataset.blockId;if(!I)return;let B=e.getBlocks().find(P=>P.id===I);if(!B||B.kind!=="p")return;B.inline.map(P=>P.kind==="text"?P.text:"").join("")==="/"&&l(I)}),h=v=>{if(!d())return;let k=v.target;o?.contains(k)||c()};return document.addEventListener("mousedown",h,!0),{destroy(){c(),t.removeEventListener("keydown",y,!0),document.removeEventListener("mousedown",h,!0),b()}}}function zf(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Gx,Xx=L(()=>{"use strict";So();Pd();Gx=[{cmd:"p",label:"\u30C6\u30AD\u30B9\u30C8",desc:"\u30D7\u30EC\u30FC\u30F3\u6BB5\u843D",apply:(e,t)=>rn(e,t,"p")},{cmd:"h1",label:"\u898B\u51FA\u3057 1",desc:"\u5927\u304D\u306A\u898B\u51FA\u3057",hint:"#",apply:(e,t)=>rn(e,t,"h1")},{cmd:"h2",label:"\u898B\u51FA\u3057 2",desc:"\u4E2D\u898B\u51FA\u3057",hint:"##",apply:(e,t)=>rn(e,t,"h2")},{cmd:"h3",label:"\u898B\u51FA\u3057 3",desc:"\u5C0F\u898B\u51FA\u3057",hint:"###",apply:(e,t)=>rn(e,t,"h3")},{cmd:"todo",label:"ToDo",desc:"\u30C1\u30A7\u30C3\u30AF\u30DC\u30C3\u30AF\u30B9\u4ED8\u304D",hint:"[]",apply:(e,t)=>rn(e,t,"todo")},{cmd:"ul",label:"\u7B87\u6761\u66F8\u304D",desc:"\u30FB",hint:"-",apply:(e,t)=>Vr(e,t,As())},{cmd:"ol",label:"\u756A\u53F7\u4ED8\u304D",desc:"1.",hint:"1.",apply:(e,t)=>Vr(e,t,Bs())},{cmd:"quote",label:"\u5F15\u7528",desc:"\u5F15\u7528\u30D6\u30ED\u30C3\u30AF",hint:">",apply:(e,t)=>Vr(e,t,Ds())},{cmd:"callout",label:"\u30B3\u30FC\u30EB\u30A2\u30A6\u30C8",desc:"\u30D2\u30F3\u30C8 / \u6CE8\u610F\u30DC\u30C3\u30AF\u30B9",apply:(e,t)=>Vr(e,t,Cs())},{cmd:"pre",label:"\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF",desc:"\u6574\u5F62\u6E08\u307F\u30B3\u30FC\u30C9",hint:"```",apply:(e,t)=>Vr(e,t,Ms())},{cmd:"hr",label:"\u533A\u5207\u308A\u7DDA",desc:"\u30BB\u30AF\u30B7\u30E7\u30F3\u533A\u5207\u308A",hint:"---",apply:(e,t)=>Ya(Vr(e,t,Ps()),t,nt(""))},{cmd:"table",label:"\u8868",desc:"\u7C21\u6613\u8868 (3\xD72)\u30FB\u30BB\u30EB\u7DE8\u96C6\u53EF",apply:(e,t)=>Vr(e,t,Zv(2,3))},{cmd:"inlinedb",label:"\u30A4\u30F3\u30E9\u30A4\u30F3DB",desc:"\u30DA\u30FC\u30B8\u306B DB \u3092\u57CB\u3081\u8FBC\u3080 (DB \u3092\u9078\u629E)",pickAndApply:W2},{cmd:"page",label:"\u30DA\u30FC\u30B8\u30EA\u30F3\u30AF",desc:"\u5225\u306E\u30DA\u30FC\u30B8\u3078\u306E\u30EA\u30F3\u30AF\u3092\u633F\u5165",hint:"[[",pickAndApply:K2}]});function Jx(e,t){let o=null;function n(){o=null,Gr()}function r(){let s=e.getBlocks(),l=window.getSelection();if(!l||l.rangeCount===0){o&&n();return}let c=l.getRangeAt(0);if(!c.collapsed){o&&n();return}let d=c.startContainer?.parentElement?.closest("[data-block-id]");if(!d){o&&n();return}let p=d.dataset.blockId,u=s.find(h=>h.id===p);if(!u||!("inline"in u)){o&&n();return}let f=It(u.inline),g=G2(d);if(g<0){o&&n();return}let b=f.slice(0,g).match(/\[\[([^\[\]]*)$/);if(b){let h=g-b[0].length,v=b[1]||"";if(o)o={blockId:p,startOffset:h,triggerLength:b[0].length},Ff(v);else{o={blockId:p,startOffset:h,triggerLength:b[0].length};let k=c.getBoundingClientRect();li({anchor:{bottom:k.bottom,left:k.left},query:v,onSelect:x=>{if(!o)return;let T=o;e.applyMutation(I=>{let B=Ga(I,T.blockId,T.startOffset+T.triggerLength,-T.triggerLength);return Va(B,T.blockId,T.startOffset,x.Id,x.Title||"")},"structural"),n()},onCancel:()=>n()})}}else o&&n()}let a=e.subscribe(()=>r()),i=()=>{(t.contains(document.activeElement)||Uf())&&r()};return document.addEventListener("selectionchange",i),{destroy(){a(),document.removeEventListener("selectionchange",i),n()}}}function G2(e){let t=window.getSelection();if(!t||t.rangeCount===0)return-1;let o=t.getRangeAt(0);if(!e.contains(o.startContainer))return-1;let n=0,r=!1,a=i=>{if(r)return;if(i===o.startContainer){if(i.nodeType===3)n+=Math.min(o.startOffset,(i.textContent||"").length);else{let c=Array.from(i.childNodes);for(let d=0;d<o.startOffset&&d<c.length;d++)a(c[d])}r=!0;return}if(i.nodeType===3){n+=(i.textContent||"").length;return}if(i.nodeType!==1)return;let s=i;if(s.tagName.toLowerCase()==="br"){n+=1;return}if(s.classList.contains("memola-page-link")){n+=(s.textContent||"").length;return}for(let c of Array.from(s.childNodes))a(c)};for(let i of Array.from(e.childNodes))a(i);return r?n:-1}var Zx=L(()=>{"use strict";Pd();So();Vo()});async function Qx(e){let t=G+"/_api/web/GetFolderByServerRelativeUrl('"+e+"')";if((await fetch(t,{headers:{Accept:"application/json;odata=verbose"},credentials:"include"})).ok)return;let n=await ke(),r=await fetch(G+"/_api/web/folders",{method:"POST",headers:{Accept:"application/json;odata=verbose","Content-Type":"application/json;odata=verbose","X-RequestDigest":n},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Folder"},ServerRelativeUrl:e})});if(!r.ok&&r.status!==409)throw new Error("\u30D5\u30A9\u30EB\u30C0\u4F5C\u6210\u5931\u6557("+r.status+"): "+e)}async function V2(){await Qx(ts),await Qx(ts+"/"+tk)}async function jf(e,t="att",o=".bin"){await V2();let n=await ke(),r=(e.name.match(/\.[^./]+$/)?.[0]||o).toLowerCase(),a=t+"-"+Date.now()+"-"+Math.random().toString(36).slice(2,8)+r,i=ts+"/"+tk,s=G+"/_api/web/GetFolderByServerRelativeUrl('"+i+"')/Files/add(url='"+encodeURIComponent(a)+"',overwrite=true)",l=await fetch(s,{method:"POST",headers:{"X-RequestDigest":n},credentials:"include",body:await e.arrayBuffer()});if(!l.ok)throw new Error("\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5931\u6557: "+l.status);return G.replace(Ko,"")+i+"/"+a}async function ek(e){return jf(e,"img",".png")}function ok(e,t){let o=!0,n=()=>window.getSelection()?.anchorNode?.parentElement?.closest("[data-block-id]")?.dataset.blockId||null,r=(l,c,d)=>{if(!o)return;let p=Kv(c,d);e.applyMutation(u=>{let f=u.blocks.slice(),g=l?f.findIndex(v=>v.id===l):f.length-1,y=g>=0?g+1:f.length;f.splice(y,0,p);let b=f[y+1],h;if(b&&b.kind!=="image"&&"inline"in b)h=b.id;else{let v=nt("");f.splice(y+1,0,v),h=v.id}return{...u,blocks:f,selection:{kind:"caret",blockId:h,offset:0}}},"structural")},a=async l=>{let c=l.clipboardData?.items;if(!c)return;let d=Array.from(c).find(u=>u.kind==="file"&&u.type.startsWith("image/"))?.getAsFile();if(!d)return;l.preventDefault(),l.stopPropagation();let p=n();try{R(!0,"\u753B\u50CF\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D...");let u=await ek(d);r(p,u,d.name)}catch(u){o&&w("\u753B\u50CF\u633F\u5165\u5931\u6557: "+u.message,"err")}finally{R(!1)}},i=async l=>{if(!l.dataTransfer?.files?.length)return;let c=Array.from(l.dataTransfer.files).filter(p=>p.type.startsWith("image/"));if(c.length===0)return;l.preventDefault();let d=n();try{R(!0,"\u753B\u50CF\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D...");for(let p of c){if(!o)return;let u=await ek(p);r(d,u,p.name),d=e.getBlocks().slice(-1)[0]?.id??d}}catch(p){o&&w("\u753B\u50CF\u633F\u5165\u5931\u6557: "+p.message,"err")}finally{R(!1)}},s=l=>{let c=l.target?.closest?.(".memola-img-resize");if(!c)return;let d=c.closest(".memola-img-wrap"),p=d?.querySelector(".memola-img"),f=c.closest("[data-block-id]")?.dataset.blockId;if(!d||!p||!f)return;l.preventDefault(),l.stopPropagation();let g=l.clientX,y=p.getBoundingClientRect().width,b=t.clientWidth||800,h=60,v=y,k=T=>{v=Math.max(h,Math.min(b,Math.round(y+(T.clientX-g)))),p.style.width=v+"px",d.style.width=v+"px"},x=()=>{document.removeEventListener("mousemove",k),document.removeEventListener("mouseup",x),o&&e.applyMutation(T=>{let I=T.blocks.findIndex(F=>F.id===f);if(I<0||T.blocks[I].kind!=="image")return T;let B=T.blocks.slice();return B[I]={...B[I],width:v},{...T,blocks:B}},"structural")};document.addEventListener("mousemove",k),document.addEventListener("mouseup",x)};return t.addEventListener("paste",a,!0),t.addEventListener("drop",i),t.addEventListener("mousedown",s,!0),()=>{o=!1,t.removeEventListener("paste",a,!0),t.removeEventListener("drop",i),t.removeEventListener("mousedown",s,!0)}}var tk,qf=L(()=>{"use strict";So();He();pr();le();tk="attachments"});var di=jt(Ut=>{"use strict";Object.defineProperty(Ut,"__esModule",{value:!0});Ut.arraysEqual=Y2;Ut.uInt2int=X2;Ut.toHexStr=J2;Ut.toHex1=at;Ut.toHex2=Z2;Ut.toHex4=Q2;Ut.msftUuidStringify=eM;Ut.emptyToNull=tM;Ut.readSystemTime=oM;Ut.readTransitionSystemTime=nM;Ut.bin2HexUpper=rM;function Y2(e,t){if(e===t)return!0;if(e==null||t==null||e.length!=t.length)return!1;for(var o=0;o<e.length;o++)if(e[o]!==t[o])return!1;return!0}function X2(e){for(var t=new Array(e.length),o=0;o<e.length;o++)t[o]=e[o]<<24>>24;return t}function J2(e,t){for(var o="";e!=0;)o="0123456789abcdef"[e&15]+o,e>>=4,o="0123456789abcdef"[e&15]+o,e>>=4;for(;o.length<t;)o="0"+o;return o}var Bt="0123456789abcdef";function at(e){return Bt[e>>4&15]+Bt[e&15]}function Z2(e){return Bt[e>>12&15]+Bt[e>>8&15]+Bt[e>>4&15]+Bt[e&15]}function Q2(e){return Bt[e>>28&15]+Bt[e>>24&15]+Bt[e>>20&15]+Bt[e>>16&15]+Bt[e>>12&15]+Bt[e>>8&15]+Bt[e>>4&15]+Bt[e&15]}function eM(e,t){return""+at(e[t+3])+at(e[t+2])+at(e[t+1])+at(e[t+0])+"-"+at(e[t+5])+at(e[t+4])+"-"+at(e[t+7])+at(e[t+6])+"-"+at(e[t+8])+at(e[t+9])+"-"+at(e[t+10])+at(e[t+11])+at(e[t+12])+at(e[t+13])+at(e[t+14])+at(e[t+15])}function tM(e){return e===""?null:e}function ci(e,t){return(""+e).padStart(t,"0")}function oM(e){var t=e.readUint16(),o=e.readUint16(),n=e.readUint16(),r=e.readUint16(),a=e.readUint16(),i=e.readUint16(),s=e.readUint16(),l=e.readUint16(),c="".concat(ci(t,4),"-").concat(ci(o,2),"-").concat(ci(r,2),"T").concat(ci(a,2),":").concat(ci(i,2),":").concat(ci(s,2),"Z");return c==="0000-00-00T00:00:00Z"?null:new Date(c)}function nM(e){var t=e.readUint16(),o=e.readUint16(),n=e.readUint16(),r=e.readUint16(),a=e.readUint16(),i=e.readUint16(),s=e.readUint16(),l=e.readUint16();return{year:t,month:o,dayOfWeek:n,day:r,hour:a,minute:i}}function rM(e){for(var t="";!e.isEof();)t+=at(e.readUint8());return t.toUpperCase()}});var Cd=jt($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});var aM=di();$f.default={FILE_HEADER:(0,aM.uInt2int)([208,207,17,224,161,177,26,225]),MSG:{UNUSED_BLOCK:-1,END_OF_CHAIN:-2,S_BIG_BLOCK_SIZE:512,S_BIG_BLOCK_MARK:9,L_BIG_BLOCK_SIZE:4096,L_BIG_BLOCK_MARK:12,SMALL_BLOCK_SIZE:64,BIG_BLOCK_MIN_DOC_SIZE:4096,HEADER:{PROPERTY_START_OFFSET:48,BAT_START_OFFSET:76,BAT_COUNT_OFFSET:44,SBAT_START_OFFSET:60,SBAT_COUNT_OFFSET:64,XBAT_START_OFFSET:68,XBAT_COUNT_OFFSET:72},PROP:{NO_INDEX:-1,PROPERTY_SIZE:128,NAME_SIZE_OFFSET:64,MAX_NAME_LENGTH:64/2-1,TYPE_OFFSET:66,PREVIOUS_PROPERTY_OFFSET:68,NEXT_PROPERTY_OFFSET:72,CHILD_PROPERTY_OFFSET:76,START_BLOCK_OFFSET:116,SIZE_OFFSET:120,TYPE_ENUM:{UNALLOCATED:0,DIRECTORY:1,DOCUMENT:2,ROOT:5}},FIELD:{PREFIX:{ATTACHMENT:"__attach_version1.0",RECIPIENT:"__recip_version1.0",DOCUMENT:"__substg1.",NAMEID:"__nameid_version1.0"},NAME_MAPPING:{"001a":"messageClass","0037":"subject","0c1a":"senderName","0c1e":"senderAddressType","0c1f":"senderEmail","5d01":"senderSmtpAddress","5d02":"sentRepresentingSmtpAddress","5d0a":"creatorSMTPAddress","5d0b":"lastModifierSMTPAddress",1e3:"body","007d":"headers",1009:"compressedRtf","3ffa":"lastModifierName","0039":"clientSubmitTime","0e06":"messageDeliveryTime","3fde":"internetCodepage","3ffd":"messageCodepage","3ff1":"messageLocaleId","0e07":"messageFlags",1035:"messageId","3fd9":"preview",3007:"creationTime",3008:"lastModificationTime",3703:"extension",3704:"fileNameShort",3707:"fileName",3712:"pidContentId","7ffe":"attachmentHidden","370e":"attachMimeTag","0c15":"recipType",3001:"name",3002:"addressType",3003:"email","39fe":"smtpAddress","3a18":"departmentName","3a44":"middleName","3a05":"generation","3a11":"surname","3a27":"addressCity","3a16":"companyName","3a24":"businessFaxNumber","3a29":"streetAddress","3a51":"businessHomePage","3a06":"givenName","3a09":"homeTelephoneNumber","3a15":"postalAddress","3a17":"title","3a1c":"mobileTelephoneNumber","3a26":"country","3a28":"stateOrProvince","3a2a":"postalCode","3a45":"displayNamePrefix","0070":"conversationTopic","0e1d":"normalizedSubject","3a08":"businessTelephoneNumber","3a0d":"location"},FULL_NAME_MAPPING:{"1013001f":"bodyHtml",10130102:"html"},PIDLID_MAPPING:{"00062008-0000-0000-c000-000000000046":{34080:{id:"PidLidVerbStream"},34084:{id:"PidLidVerbResponse",dispid:"votingResponse"},34176:{id:"PidLidInternetAccountName",dispid:"inetAcctName"}},"00062002-0000-0000-c000-000000000046":{33293:{id:"PidLidAppointmentStartWhole",dispid:"apptStartWhole"},33294:{id:"PidLidAppointmentEndWhole",dispid:"apptEndWhole"},33333:{id:"PidLidClipStart",dispid:"clipStart"},33334:{id:"PidLidClipEnd",dispid:"clipEnd"},33331:{id:"PidLidTimeZoneStruct",dispid:"timeZoneStruct"},33332:{id:"PidLidTimeZoneDescription",dispid:"timeZoneDesc"},33374:{id:"PidLidAppointmentTimeZoneDefinitionStartDisplay",dispid:"apptTZDefStartDisplay"},33375:{id:"PidLidAppointmentTimeZoneDefinitionEndDisplay",dispid:"apptTZDefEndDisplay"},33376:{id:"PidLidAppointmentTimeZoneDefinitionRecur",dispid:"apptTZDefRecur"},33302:{id:"PidLidAppointmentRecur",dispid:"apptRecur"},33288:{id:"PidLidLocation",dispid:"apptLocation"}},"00062004-0000-0000-c000-000000000046":{32812:{id:"dispidYomiFirstName",dispid:"yomiFirstName"},32899:{id:"dispidEmail1EmailAddress",dispid:"email1EmailAddress"},32814:{id:"dispidYomiCompanyName",dispid:"yomiCompanyName"},32978:{id:"PidLidFax3AddressType",dispid:"fax3AddrType"},32896:{id:"PidLidEmail1DisplayName",dispid:"email1DisplayName"},32900:{id:"PidLidEmail1OriginalDisplayName",dispid:"email1OriginalDisplayName"},32773:{id:"PidLidFileUnder",dispid:"fileUnder"},32813:{id:"PidLidYomiLastName",dispid:"yomiLastName"},32946:{id:"PidLidFax1AddressType",dispid:"fax1AddrType"},32963:{id:"PidLidFax2EmailAddress",dispid:"fax2EmailAddress"},32838:{id:"PidLidWorkAddressCity",dispid:"workAddressCity"},32989:{id:"PidLidAddressCountryCode",dispid:"addressCountryCode"},32962:{id:"PidLidFax2AddressType",dispid:"fax2AddrType"},32964:{id:"PidLidFax2OriginalDisplayName",dispid:"fax2OriginalDisplayName"},32840:{id:"PidLidWorkAddressPostalCode",dispid:"workAddressPostalCode"},32837:{id:"PidLidWorkAddressStreet",dispid:"workAddressStreet"},32839:{id:"PidLidWorkAddressState",dispid:"workAddressState"},32987:{id:"PidLidWorkAddressCountryCode",dispid:"workAddressCountryCode"},32841:{id:"PidLidWorkAddressCountry",dispid:"workAddressCountry"},32811:{id:"PidLidHtml",dispid:"contactHtml"},32795:{id:"PidLidWorkAddress",dispid:"workAddress"},32948:{id:"PidLidFax1OriginalDisplayName",dispid:"fax1OriginalDisplayName"},32866:{id:"PidLidInstantMessagingAddress",dispid:"instMsg"},32784:{id:"PidLidDepartment",dispid:"department"},32947:{id:"PidLidFax1EmailAddress",dispid:"fax1EmailAddress"},32980:{id:"PidLidFax3OriginalDisplayName",dispid:"fax3OriginalDisplayName"},32979:{id:"PidLidFax3EmailAddress",dispid:"fax3EmailAddress"}},"6ed8da90-450b-101b-98da-00aa003f1305":{3:{id:"PidLidGlobalObjectId",dispid:"globalAppointmentID"},40:{id:"PidLidOldLocation",dispid:"apptOldLocation"}}},CLASS_MAPPING:{ATTACHMENT_DATA:"3701"},TYPE_MAPPING:{"001e":"string","001f":"unicode","0040":"time","0102":"binary","0003":"integer","000b":"boolean"},DIR_TYPE:{INNER_MSG:"000d"}}}}});var sk={};q(sk,{Buffer:()=>ik,StringDecoder:()=>Ad,decode:()=>rk,default:()=>sM,encode:()=>nk,encodingExists:()=>ak});function nk(e,t){throw new Error("iconv-lite (encode) is not available in browser build")}function rk(e,t){try{return new TextDecoder(t).decode(e)}catch{return new TextDecoder("utf-8",{fatal:!1}).decode(e)}}function ak(e){return!1}var ik,Ad,iM,sM,lk=L(()=>{"use strict";ik={isBuffer:e=>!1,from:e=>typeof e=="string"?new TextEncoder().encode(e):e instanceof Uint8Array?e:new Uint8Array(e)},Ad=class{constructor(t="utf-8"){this.enc=t}write(t){try{return new TextDecoder(this.enc).decode(t)}catch{return new TextDecoder("utf-8").decode(t)}}end(){return""}},iM={encode:nk,decode:rk,encodingExists:ak,Buffer:ik,StringDecoder:Ad},sM=iM});var Qs=jt(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});var ck=(lk(),H1(sk)),lM=function(){function e(t,o,n){if(this._dynamicSize=!0,this._byteLength=0,this.failurePosition=0,this._byteOffset=o||0,t instanceof ArrayBuffer)this.buffer=t;else if(t instanceof DataView)this.dataView=t;else if(t&&t.buffer instanceof ArrayBuffer)this._byteOffset+=t.byteOffset,this._buffer=t.buffer,this._dataView=new DataView(this._buffer,this._byteOffset),this._byteLength=this._dataView.byteLength+this._byteOffset;else throw new Error("Unknown arrayBuffer");this.position=0,this.endianness=n??e.LITTLE_ENDIAN}return e.prototype.save=function(t){var o=new Blob([this.buffer]),n=window.webkitURL||window.URL;if(n&&n.createObjectURL){var r=n.createObjectURL(o),a=document.createElement("a");a.setAttribute("href",r),a.setAttribute("download",t),a.click(),n.revokeObjectURL(r)}else throw"DataStream.save: Can't create object URL."},Object.defineProperty(e.prototype,"dynamicSize",{get:function(){return this._dynamicSize},set:function(t){t||this._trimAlloc(),this._dynamicSize=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"byteLength",{get:function(){return this._byteLength-this._byteOffset},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"buffer",{get:function(){return this._trimAlloc(),this._buffer},set:function(t){this._buffer=t,this._dataView=new DataView(this._buffer,this._byteOffset),this._byteLength=this._buffer.byteLength},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"byteOffset",{get:function(){return this._byteOffset},set:function(t){this._byteOffset=t,this._dataView=new DataView(this._buffer,this._byteOffset),this._byteLength=this._buffer.byteLength},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"dataView",{get:function(){return this._dataView},set:function(t){this._byteOffset=t.byteOffset,this._buffer=t.buffer,this._dataView=new DataView(this._buffer,this._byteOffset),this._byteLength=this._byteOffset+t.byteLength},enumerable:!1,configurable:!0}),e.prototype._realloc=function(t){if(this._dynamicSize){var o=this._byteOffset+this.position+t,n=this._buffer.byteLength;if(o<=n){o>this._byteLength&&(this._byteLength=o);return}for(n<1&&(n=1);o>n;)n*=2;var r=new ArrayBuffer(n),a=new Uint8Array(this._buffer),i=new Uint8Array(r,0,a.length);i.set(a),this.buffer=r,this._byteLength=o}},e.prototype._trimAlloc=function(){if(this._byteLength!=this._buffer.byteLength){var t=new ArrayBuffer(this._byteLength),o=new Uint8Array(t),n=new Uint8Array(this._buffer,0,o.length);o.set(n),this.buffer=t}},e.prototype.seek=function(t){var o=Math.max(0,Math.min(this.byteLength,t));this.position=isNaN(o)||!isFinite(o)?0:o},e.prototype.isEof=function(){return this.position>=this.byteLength},e.prototype.mapInt32Array=function(t,o){this._realloc(t*4);var n=new Int32Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*4,n},e.prototype.mapInt16Array=function(t,o){this._realloc(t*2);var n=new Int16Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*2,n},e.prototype.mapInt8Array=function(t){this._realloc(t*1);var o=new Int8Array(this._buffer,this.byteOffset+this.position,t);return this.position+=t*1,o},e.prototype.mapUint32Array=function(t,o){this._realloc(t*4);var n=new Uint32Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*4,n},e.prototype.mapUint16Array=function(t,o){this._realloc(t*2);var n=new Uint16Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*2,n},e.prototype.mapUint8Array=function(t){this._realloc(t*1);var o=new Uint8Array(this._buffer,this.byteOffset+this.position,t);return this.position+=t*1,o},e.prototype.mapFloat64Array=function(t,o){this._realloc(t*8);var n=new Float64Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*8,n},e.prototype.mapFloat32Array=function(t,o){this._realloc(t*4);var n=new Float32Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*4,n},e.prototype.readInt32Array=function(t,o){t=t??(this.byteLength-this.position)/4;var n=new Int32Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readInt16Array=function(t,o){t=t??(this.byteLength-this.position)/2;var n=new Int16Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readInt8Array=function(t){t=t??this.byteLength-this.position;var o=new Int8Array(t);return e.memcpy(o.buffer,0,this.buffer,this.byteOffset+this.position,t*o.BYTES_PER_ELEMENT),this.position+=o.byteLength,o},e.prototype.readUint32Array=function(t,o){t=t??(this.byteLength-this.position)/4;var n=new Uint32Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readUint16Array=function(t,o){t=t??(this.byteLength-this.position)/2;var n=new Uint16Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readUint8Array=function(t){t=t??this.byteLength-this.position;var o=new Uint8Array(t);return e.memcpy(o.buffer,0,this.buffer,this.byteOffset+this.position,t*o.BYTES_PER_ELEMENT),this.position+=o.byteLength,o},e.prototype.readToUint8Array=function(t,o,n){t=t??this.byteLength-this.position,e.memcpy(o.buffer,n,this.buffer,this.byteOffset+this.position,t*o.BYTES_PER_ELEMENT),this.position+=o.byteLength},e.prototype.readFloat64Array=function(t,o){t=t??(this.byteLength-this.position)/8;var n=new Float64Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readFloat32Array=function(t,o){t=t??(this.byteLength-this.position)/4;var n=new Float32Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.writeInt32Array=function(t,o){if(this._realloc(t.length*4),t instanceof Int32Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapInt32Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeInt32(t[n],o)},e.prototype.writeInt16Array=function(t,o){if(this._realloc(t.length*2),t instanceof Int16Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapInt16Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeInt16(t[n],o)},e.prototype.writeInt8Array=function(t){if(this._realloc(t.length*1),t instanceof Int8Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapInt8Array(t.length);else for(var o=0;o<t.length;o++)this.writeInt8(t[o])},e.prototype.writeUint32Array=function(t,o){if(this._realloc(t.length*4),t instanceof Uint32Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapUint32Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeUint32(t[n],o)},e.prototype.writeUint16Array=function(t,o){if(this._realloc(t.length*2),t instanceof Uint16Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapUint16Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeUint16(t[n],o)},e.prototype.writeUint8Array=function(t){if(this._realloc(t.length*1),t instanceof Uint8Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapUint8Array(t.length);else for(var o=0;o<t.length;o++)this.writeUint8(t[o])},e.prototype.writeFloat64Array=function(t,o){if(this._realloc(t.length*8),t instanceof Float64Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapFloat64Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeFloat64(t[n],o)},e.prototype.writeFloat32Array=function(t,o){if(this._realloc(t.length*4),t instanceof Float32Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapFloat32Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeFloat32(t[n],o)},e.prototype.readInt32=function(t){var o=this._dataView.getInt32(this.position,t??this.endianness);return this.position+=4,o},e.prototype.readInt=function(t){return this.seek(t),this.readInt32()},e.prototype.readInt16=function(t){var o=this._dataView.getInt16(this.position,t??this.endianness);return this.position+=2,o},e.prototype.readShort=function(t){return this.seek(t),this.readInt16()},e.prototype.readInt8=function(){var t=this._dataView.getInt8(this.position);return this.position+=1,t},e.prototype.readByte=function(t){return this.seek(t),this.readInt8()},e.prototype.readUint32=function(t){var o=this._dataView.getUint32(this.position,t??this.endianness);return this.position+=4,o},e.prototype.readUint16=function(t){var o=this._dataView.getUint16(this.position,t??this.endianness);return this.position+=2,o},e.prototype.readUint8=function(){var t=this._dataView.getUint8(this.position);return this.position+=1,t},e.prototype.readFloat32=function(t){var o=this._dataView.getFloat32(this.position,t??this.endianness);return this.position+=4,o},e.prototype.readFloat64=function(t){var o=this._dataView.getFloat64(this.position,t??this.endianness);return this.position+=8,o},e.prototype.writeInt32=function(t,o){this._realloc(4),this._dataView.setInt32(this.position,t,o??this.endianness),this.position+=4},e.prototype.writeInt16=function(t,o){this._realloc(2),this._dataView.setInt16(this.position,t,o??this.endianness),this.position+=2},e.prototype.writeInt8=function(t){this._realloc(1),this._dataView.setInt8(this.position,t),this.position+=1},e.prototype.writeUint32=function(t,o){this._realloc(4),this._dataView.setUint32(this.position,t,o??this.endianness),this.position+=4},e.prototype.writeUint16=function(t,o){this._realloc(2),this._dataView.setUint16(this.position,t,o??this.endianness),this.position+=2},e.prototype.writeUint8=function(t){this._realloc(1),this._dataView.setUint8(this.position,t),this.position+=1},e.prototype.writeFloat32=function(t,o){this._realloc(4),this._dataView.setFloat32(this.position,t,o??this.endianness),this.position+=4},e.prototype.writeFloat64=function(t,o){this._realloc(8),this._dataView.setFloat64(this.position,t,o??this.endianness),this.position+=8},e.memcpy=function(t,o,n,r,a){var i=new Uint8Array(t,o,a),s=new Uint8Array(n,r,a);i.set(s)},e.arrayToNative=function(t,o){return o==this.endianness?t:this.flipArrayEndianness(t)},e.nativeToEndian=function(t,o){return this.endianness==o?t:this.flipArrayEndianness(t)},e.flipArrayEndianness=function(t){for(var o=new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=0;n<t.byteLength;n+=t.BYTES_PER_ELEMENT)for(var r=n+t.BYTES_PER_ELEMENT-1,a=n;r>a;r--,a++){var i=o[a];o[a]=o[r],o[r]=i}return t},e.createStringFromArray=function(t){for(var o="",n=0;n<t.length;n++)o+=String.fromCharCode(t[n]);return o},e.prototype.readStruct=function(t){for(var o={},n,r,a,i=this.position,s=0;s<t.length;s+=2){if(n=t[s+1],r=this.readType(n,o),r==null)return this.failurePosition==0&&(this.failurePosition=this.position),this.position=i,null;o[t[s]]=r}return o},e.prototype.readUCS2String=function(t,o){return e.createStringFromArray(this.readUint16Array(t,o))},e.prototype.readStringAt=function(t,o){return this.seek(t),this.readUCS2String(o)},e.prototype.writeUCS2String=function(t,o,n){n==null&&(n=t.length);for(var r=0;r<t.length&&r<n;r++)this.writeUint16(t.charCodeAt(r),o);for(;r<n;r++)this.writeUint16(0,o)},e.prototype.readString=function(t,o){return o==null||o=="ASCII"?e.createStringFromArray(this.mapUint8Array(t??this.byteLength-this.position)):ck.decode(this.mapUint8Array(t),o)},e.prototype.writeString=function(t,o,n){if(o==null||o=="ASCII")if(n!=null){var r=0,a=Math.min(t.length,n);for(r=0;r<a;r++)this.writeUint8(t.charCodeAt(r));for(;r<n;r++)this.writeUint8(0)}else for(var r=0;r<t.length;r++)this.writeUint8(t.charCodeAt(r));else this.writeUint8Array(ck.encode(t.substring(0,n),o))},e.prototype.readCString=function(t){var o=this.byteLength-this.position,n=new Uint8Array(this._buffer,this._byteOffset+this.position),r=o;t!=null&&(r=Math.min(t,o));for(var a=0;a<r&&n[a]!=0;a++);var i=e.createStringFromArray(this.mapUint8Array(a));return t!=null?this.position+=r-a:a!=o&&(this.position+=1),i},e.prototype.writeCString=function(t,o){if(o!=null){var n=0,r=Math.min(t.length,o);for(n=0;n<r;n++)this.writeUint8(t.charCodeAt(n));for(;n<o;n++)this.writeUint8(0)}else{for(var n=0;n<t.length;n++)this.writeUint8(t.charCodeAt(n));this.writeUint8(0)}},e.prototype.readType=function(t,o){if(typeof t=="function")return t(this,o);if(typeof t=="object"&&!(t instanceof Array))return t.get(this,o);if(t instanceof Array&&t.length!=3)return this.readStruct(t);var n=null,r=null,a="ASCII",i=this.position,s;if(typeof t=="string"&&/:/.test(t)){var l=t.split(":");t=l[0],s=l[1],o[s]!=null?r=parseInt(o[s]):r=parseInt(l[1])}if(typeof t=="string"&&/,/.test(t)){var l=t.split(",");t=l[0],a=parseInt(l[1]).toString()}switch(t){case"uint8":n=this.readUint8();break;case"int8":n=this.readInt8();break;case"uint16":n=this.readUint16(this.endianness);break;case"int16":n=this.readInt16(this.endianness);break;case"uint32":n=this.readUint32(this.endianness);break;case"int32":n=this.readInt32(this.endianness);break;case"float32":n=this.readFloat32(this.endianness);break;case"float64":n=this.readFloat64(this.endianness);break;case"uint16be":n=this.readUint16(e.BIG_ENDIAN);break;case"int16be":n=this.readInt16(e.BIG_ENDIAN);break;case"uint32be":n=this.readUint32(e.BIG_ENDIAN);break;case"int32be":n=this.readInt32(e.BIG_ENDIAN);break;case"float32be":n=this.readFloat32(e.BIG_ENDIAN);break;case"float64be":n=this.readFloat64(e.BIG_ENDIAN);break;case"uint16le":n=this.readUint16(e.LITTLE_ENDIAN);break;case"int16le":n=this.readInt16(e.LITTLE_ENDIAN);break;case"uint32le":n=this.readUint32(e.LITTLE_ENDIAN);break;case"int32le":n=this.readInt32(e.LITTLE_ENDIAN);break;case"float32le":n=this.readFloat32(e.LITTLE_ENDIAN);break;case"float64le":n=this.readFloat64(e.LITTLE_ENDIAN);break;case"cstring":n=this.readCString(r);break;case"string":n=this.readString(r,a);break;case"u16string":n=this.readUCS2String(r,this.endianness);break;case"u16stringle":n=this.readUCS2String(r,e.LITTLE_ENDIAN);break;case"u16stringbe":n=this.readUCS2String(r,e.BIG_ENDIAN);break;default:if(t.length==3){var c=t[1],s=t[2],d=0;if(typeof s=="function"?d=s(o,this,t):typeof s=="string"&&o[s]!=null?d=parseInt(o[s]):d=parseInt(s),typeof c=="string"){var p=c.replace(/(le|be)$/,""),u=null;switch(/le$/.test(c)?u=e.LITTLE_ENDIAN:/be$/.test(c)&&(u=e.BIG_ENDIAN),s=="*"&&(d=null),p){case"uint8":n=this.readUint8Array(d);break;case"uint16":n=this.readUint16Array(d,u);break;case"uint32":n=this.readUint32Array(d,u);break;case"int8":n=this.readInt8Array(d);break;case"int16":n=this.readInt16Array(d,u);break;case"int32":n=this.readInt32Array(d,u);break;case"float32":n=this.readFloat32Array(d,u);break;case"float64":n=this.readFloat64Array(d,u);break;case"cstring":case"utf16string":case"string":if(d==null)for(n=[];!this.isEof();){var f=this.readType(c,o);if(f==null)break;n.push(f)}else{n=new Array(d);for(var g=0;g<d;g++)n[g]=this.readType(c,o)}break}}else if(s=="*")for(n=[],this.buffer;;){var y=this.position;try{var b=this.readType(c,o);if(b==null){this.position=y;break}n.push(b)}catch{this.position=y;break}}else{n=new Array(d);for(var g=0;g<d;g++){var f=this.readType(c,o);if(f==null)return null;n[g]=f}}break}}return r!=null&&(this.position=i+r),n},e.prototype.writeStruct=function(t,o){for(var n=0;n<t.length;n+=2){var r=t[n+1];this.writeType(r,o[t[n]],o)}},e.prototype.writeType=function(t,o,n){if(typeof t=="function")return t(this,o);if(typeof t=="object"&&!(t instanceof Array))return t.set(this,o,n);var r=null,a="ASCII",i=this.position;if(typeof t=="string"&&/:/.test(t)){var s=t.split(":");t=s[0],r=parseInt(s[1])}if(typeof t=="string"&&/,/.test(t)){var s=t.split(",");t=s[0],a=parseInt(s[1]).toString()}switch(t){case"uint8":this.writeUint8(o);break;case"int8":this.writeInt8(o);break;case"uint16":this.writeUint16(o,this.endianness);break;case"int16":this.writeInt16(o,this.endianness);break;case"uint32":this.writeUint32(o,this.endianness);break;case"int32":this.writeInt32(o,this.endianness);break;case"float32":this.writeFloat32(o,this.endianness);break;case"float64":this.writeFloat64(o,this.endianness);break;case"uint16be":this.writeUint16(o,e.BIG_ENDIAN);break;case"int16be":this.writeInt16(o,e.BIG_ENDIAN);break;case"uint32be":this.writeUint32(o,e.BIG_ENDIAN);break;case"int32be":this.writeInt32(o,e.BIG_ENDIAN);break;case"float32be":this.writeFloat32(o,e.BIG_ENDIAN);break;case"float64be":this.writeFloat64(o,e.BIG_ENDIAN);break;case"uint16le":this.writeUint16(o,e.LITTLE_ENDIAN);break;case"int16le":this.writeInt16(o,e.LITTLE_ENDIAN);break;case"uint32le":this.writeUint32(o,e.LITTLE_ENDIAN);break;case"int32le":this.writeInt32(o,e.LITTLE_ENDIAN);break;case"float32le":this.writeFloat32(o,e.LITTLE_ENDIAN);break;case"float64le":this.writeFloat64(o,e.LITTLE_ENDIAN);break;case"cstring":this.writeCString(o,r);break;case"string":this.writeString(o,a,r);break;case"u16string":this.writeUCS2String(o,this.endianness,r);break;case"u16stringle":this.writeUCS2String(o,e.LITTLE_ENDIAN,r);break;case"u16stringbe":this.writeUCS2String(o,e.BIG_ENDIAN,r);break;default:if(t.length==3){for(var l=t[1],c=0;c<o.length;c++)this.writeType(l,o[c],t[2]);break}else{this.writeStruct(t,o);break}}r!=null&&(this.position=i,this._realloc(r),this.position=i+r)},e.BIG_ENDIAN=!1,e.LITTLE_ENDIAN=!0,e.endianness=new Int8Array(new Int16Array([1]).buffer)[0]>0,e}();Kf.default=lM;Uint8Array.prototype.BYTES_PER_ELEMENT===void 0&&(Object.defineProperties(Uint8Array.prototype,{BYTES_PER_ELEMENT:{value:Uint8Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Int8Array.prototype,{BYTES_PER_ELEMENT:{value:Int8Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Uint8ClampedArray.prototype,{BYTES_PER_ELEMENT:{value:Uint8ClampedArray.BYTES_PER_ELEMENT}}),Object.defineProperties(Uint16Array.prototype,{BYTES_PER_ELEMENT:{value:Uint16Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Int16Array.prototype,{BYTES_PER_ELEMENT:{value:Int16Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Uint32Array.prototype,{BYTES_PER_ELEMENT:{value:Uint32Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Int32Array.prototype,{BYTES_PER_ELEMENT:{value:Int32Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Float64Array.prototype,{BYTES_PER_ELEMENT:{value:Float64Array.BYTES_PER_ELEMENT}}))});var Wf=jt(Kn=>{"use strict";var mk=Kn&&Kn.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Kn,"__esModule",{value:!0});Kn.Reader=Kn.TypeEnum=void 0;var dk=mk(Qs()),cM=di(),ae=mk(Cd()),mi;(function(e){e[e.DIRECTORY=1]="DIRECTORY",e[e.DOCUMENT=2]="DOCUMENT",e[e.ROOT=5]="ROOT"})(mi||(Kn.TypeEnum=mi={}));var dM=function(){function e(t){this.ds=new dk.default(t,0,dk.default.LITTLE_ENDIAN)}return e.prototype.isMSGFile=function(){return this.ds.seek(0),(0,cM.arraysEqual)(ae.default.FILE_HEADER,this.ds.readInt8Array(ae.default.FILE_HEADER.length))},e.prototype.headerData=function(){this.bigBlockSize=this.ds.readByte(30)==ae.default.MSG.L_BIG_BLOCK_MARK?ae.default.MSG.L_BIG_BLOCK_SIZE:ae.default.MSG.S_BIG_BLOCK_SIZE,this.bigBlockLength=this.bigBlockSize/4,this.xBlockLength=this.bigBlockLength-1,this.batCount=this.ds.readInt(ae.default.MSG.HEADER.BAT_COUNT_OFFSET),this.propertyStart=this.ds.readInt(ae.default.MSG.HEADER.PROPERTY_START_OFFSET),this.sbatStart=this.ds.readInt(ae.default.MSG.HEADER.SBAT_START_OFFSET),this.sbatCount=this.ds.readInt(ae.default.MSG.HEADER.SBAT_COUNT_OFFSET),this.xbatStart=this.ds.readInt(ae.default.MSG.HEADER.XBAT_START_OFFSET),this.xbatCount=this.ds.readInt(ae.default.MSG.HEADER.XBAT_COUNT_OFFSET)},e.prototype.convertName=function(t){var o=this.ds.readShort(t+ae.default.MSG.PROP.NAME_SIZE_OFFSET);return o<1?"":this.ds.readStringAt(t,o/2).split("\0")[0]},e.prototype.convertProperty=function(t){return{type:this.ds.readByte(t+ae.default.MSG.PROP.TYPE_OFFSET),name:this.convertName(t),previousProperty:this.ds.readInt(t+ae.default.MSG.PROP.PREVIOUS_PROPERTY_OFFSET),nextProperty:this.ds.readInt(t+ae.default.MSG.PROP.NEXT_PROPERTY_OFFSET),childProperty:this.ds.readInt(t+ae.default.MSG.PROP.CHILD_PROPERTY_OFFSET),startBlock:this.ds.readInt(t+ae.default.MSG.PROP.START_BLOCK_OFFSET),sizeBlock:this.ds.readInt(t+ae.default.MSG.PROP.SIZE_OFFSET)}},e.prototype.convertBlockToProperties=function(t,o){for(var n=this.bigBlockSize/ae.default.MSG.PROP.PROPERTY_SIZE,r=this.getBlockOffsetAt(t),a=0;a<n&&!(this.ds.byteLength<r+ae.default.MSG.PROP.TYPE_OFFSET);a++){var i=this.ds.readByte(r+ae.default.MSG.PROP.TYPE_OFFSET);switch(i){case ae.default.MSG.PROP.TYPE_ENUM.ROOT:case ae.default.MSG.PROP.TYPE_ENUM.DIRECTORY:case ae.default.MSG.PROP.TYPE_ENUM.DOCUMENT:o.push(this.convertProperty(r));break;case ae.default.MSG.PROP.TYPE_ENUM.UNALLOCATED:default:o.push({type:i,name:"",previousProperty:-1,nextProperty:-1,childProperty:-1,startBlock:0,sizeBlock:0});break}r+=ae.default.MSG.PROP.PROPERTY_SIZE}},e.prototype.createPropertyHierarchy=function(t,o){if(!(!o||o.childProperty==ae.default.MSG.PROP.NO_INDEX)){o.children=[];for(var n=[{currentMode:"walk",currentIndex:o.childProperty}];n.length!=0;){var r=n.pop(),a=r.currentMode,i=r.currentIndex,s=t[i];a==="push"?o.children.push(i):(s.type==ae.default.MSG.PROP.TYPE_ENUM.DIRECTORY&&this.createPropertyHierarchy(t,s),s.nextProperty!=ae.default.MSG.PROP.NO_INDEX&&n.push({currentMode:"walk",currentIndex:s.nextProperty}),n.push({currentMode:"push",currentIndex:i}),s.previousProperty!=ae.default.MSG.PROP.NO_INDEX&&n.push({currentMode:"walk",currentIndex:s.previousProperty}))}}},e.prototype.propertyDataReader=function(t){for(var o=[],n=t;n!=ae.default.MSG.END_OF_CHAIN;)this.convertBlockToProperties(n,o),n=this.getNextBlock(n);return this.createPropertyHierarchy(o,o[0]),o},e.prototype.parse=function(){this.headerData(),this.batData=this.batDataReader(),this.xbatCount>0&&this.xbatDataReader(),this.sbatData=this.sbatDataReader(),this.propertyData=this.propertyDataReader(this.propertyStart),this.bigBlockTable=this.readBigBlockTable()},e.prototype.batCountInHeader=function(){var t=(ae.default.MSG.S_BIG_BLOCK_SIZE-ae.default.MSG.HEADER.BAT_START_OFFSET)/4;return Math.min(this.batCount,t)},e.prototype.batDataReader=function(){var t=new Array(this.batCountInHeader());this.ds.seek(ae.default.MSG.HEADER.BAT_START_OFFSET);for(var o=0;o<t.length;o++)t[o]=this.ds.readInt32();return t},e.prototype.getBlockOffsetAt=function(t){return(t+1)*this.bigBlockSize},e.prototype.getBlockAt=function(t){var o=this.getBlockOffsetAt(t);return this.ds.seek(o),this.ds.readInt32Array(this.bigBlockLength)},e.prototype.getBlockValueAt=function(t,o){var n=this.getBlockOffsetAt(t);return this.ds.seek(n+4*o),this.ds.readInt32()},e.prototype.getNextBlockInner=function(t,o){var n=Math.floor(t/this.bigBlockLength),r=t%this.bigBlockLength,a=o[n];return typeof a>"u"?ae.default.MSG.END_OF_CHAIN:this.getBlockValueAt(a,r)},e.prototype.getNextBlock=function(t){return this.getNextBlockInner(t,this.batData)},e.prototype.sbatDataReader=function(){for(var t=[],o=this.sbatStart,n=0;n<this.sbatCount&&o&&o!=ae.default.MSG.END_OF_CHAIN;n++)t.push(o),o=this.getNextBlock(o);return t},e.prototype.xbatDataReader=function(){for(var t=this.batCountInHeader(),o=this.batCount,n=o-t,r=this.xbatStart,a=0;a<this.xbatCount;a++){for(var i=this.getBlockAt(r),s=Math.min(n,this.xBlockLength),l=0;l<s;l++){var c=i[l];if(c==ae.default.MSG.UNUSED_BLOCK||c==ae.default.MSG.END_OF_CHAIN)break;this.batData.push(c)}if(n-=s,r=i[this.xBlockLength],r==ae.default.MSG.UNUSED_BLOCK||r==ae.default.MSG.END_OF_CHAIN)break}},e.prototype.getNextBlockSmall=function(t){return this.getNextBlockInner(t,this.sbatData)},e.prototype.getChainByBlockSmall=function(t){for(var o=[],n=t.startBlock;n!=ae.default.MSG.END_OF_CHAIN;)o.push(n),n=this.getNextBlockSmall(n);return o},e.prototype.readBigBlockTable=function(){for(var t=this.propertyData[0],o=[],n=t.startBlock,r=0;n!=ae.default.MSG.END_OF_CHAIN;r++)o.push(n),n=this.getNextBlock(n);return o},e.prototype.readDataByBlockSmall=function(t,o,n,r){var a=t*ae.default.MSG.SMALL_BLOCK_SIZE,i=Math.floor(a/this.bigBlockSize),s=a%this.bigBlockSize,l=this.bigBlockTable[i],c=this.getBlockOffsetAt(l);return this.ds.seek(c+s),this.ds.readToUint8Array(o,n,r)},e.prototype.readChainDataByBlockSmall=function(t,o){for(var n=new Uint8Array(t.sizeBlock),r=0,a=0;r<o.length;r++){var i=n.length<a+ae.default.MSG.SMALL_BLOCK_SIZE?n.length-a:ae.default.MSG.SMALL_BLOCK_SIZE;this.readDataByBlockSmall(o[r],i,n,a),a+=i}return n},e.prototype.readProperty=function(t){if(t.sizeBlock)if(t.sizeBlock<ae.default.MSG.BIG_BLOCK_MIN_DOC_SIZE){var o=this.getChainByBlockSmall(t);if(o.length==1){var n=new Uint8Array(t.sizeBlock);return this.readDataByBlockSmall(t.startBlock,t.sizeBlock,n,0),n}else if(o.length>1)return this.readChainDataByBlockSmall(t,o);return new Uint8Array(0)}else{for(var r=t.startBlock,a=t.sizeBlock,i=0,n=new Uint8Array(t.sizeBlock);1<=a;){var s=this.getBlockOffsetAt(r);this.ds.seek(s);var l=Math.min(a,this.bigBlockSize),c=this.ds.readUint8Array(l);n.set(c,i),i+=l,a-=l,r=this.getNextBlock(r)}return n}else return new Uint8Array(0)},e.prototype.readFileOf=function(t){return this.readProperty(this.propertyData[t])},e.prototype.folderOf=function(t){var o=this,n=this.propertyData;if(!n)return null;var r=n[t];return{dataId:t,name:r.name,fileNames:function(){var a=r.children;return a?a.map(function(i){return n[i]}).filter(function(i){return i.type===mi.DOCUMENT}).map(function(i){return i.name}):[]},fileNameSets:function(){var a=r.children;return a?a.map(function(i){return{subIndex:i,entry:n[i]}}).filter(function(i){return i.entry.type===mi.DOCUMENT}).map(function(i){return{name:i.entry.name,length:i.entry.sizeBlock,dataId:i.subIndex,provider:function(){return o.readProperty(i.entry)}}}):[]},subFolders:function(){var a=r.children;return a?a.filter(function(i){return n[i].type==mi.DIRECTORY}).map(function(i){return o.folderOf(i)}):[]},readFile:function(a){var i=r.children;if(i)for(var s=0,l=i;s<l.length;s++){var c=l[s],d=n[c];if(d&&d.type===mi.DOCUMENT&&d.name===a)return o.readProperty(d)}return null}}},e.prototype.rootFolder=function(){return this.folderOf(0)},e}();Kn.Reader=dM});var gk=jt(el=>{"use strict";var fk=el&&el.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(el,"__esModule",{value:!0});el.burn=fM;var Yr=Wf(),pk=fk(Qs()),mM=fk(Cd());function pi(e){return e+511&-512}function pM(e){return e+63&-64}var uk=function(){function e(t){this.sectors=t}return e.prototype.allocate=function(t){for(var o=this.sectors.length,n=0;n<t;n++){var r=n+1===t?-2:o+n+1;this.sectors.push(r)}return o},e.prototype.allocateAs=function(t,o){for(var n=this.sectors.length,r=0;r<t;r++)this.sectors.push(o);return n},e.prototype.finalize=function(t,o){for(var n=(t-this.sectors.length%t)%t;n>=1;n-=1)this.sectors.push(o);return this},e.prototype.count=function(){return this.sectors.length},e}(),uM=function(){function e(t){this.fat=new uk([]),this.miniFat=new uk([]),this.liteEnts=t.map(function(N){return{entry:N,left:-1,right:-1,child:-1,firstSector:0,isMini:N.length<4096,isRed:!1}}),this.buildTree(0);for(var o=this.fat.allocate(pi(128*this.liteEnts.length)/512),n=0,r=this.liteEnts.filter(function(N){return N.entry.type==Yr.TypeEnum.DOCUMENT&&N.isMini===!1});n<r.length;n++){var a=r[n];a.firstSector=a.entry.length===0?-2:this.fat.allocate(pi(a.entry.length)/512)}for(var i=0,s=this.liteEnts.filter(function(N){return N.entry.type==Yr.TypeEnum.DOCUMENT&&N.isMini===!0});i<s.length;i++){var a=s[i];a.firstSector=a.entry.length===0?-2:this.miniFat.allocate(pM(a.entry.length)/64)}var l=pi(4*this.miniFat.count())/512,c=l!==0?this.fat.allocate(l):-2,d=64*this.miniFat.count(),p=this.fat.allocate(pi(d)/512);this.liteEnts[0].firstSector=p;var u=this.fat.allocateAs(pi(4*(this.fat.count()+this.fat.count()/128+this.fat.count()/(128*109)))/512,-3),f=this.fat.count()-u,g=f>109?pi(4*Math.floor((f-109)/127*128))/512:0,y=g!==0?this.fat.allocateAs(g,-4):-2,b=new ArrayBuffer(512*(1+this.fat.count())),h=new pk.default(b,0,pk.default.LITTLE_ENDIAN);h.dynamicSize=!1,this.miniFat.finalize(512/4,-1);var v=[],k=[];{for(var x=0;x<109&&x<f;x++)v.push(u+x);for(var T=y+1;x<f;x++){k.push(u+x);var I=k.length&127;I===127&&(k.push(T),T++)}for(;;){var I=k.length&127;if(I===0)break;k.push(I===127?-2:-1)}}{h.seek(0),h.writeUint8Array(mM.default.FILE_HEADER),h.seek(24),h.writeUint16(62),h.writeUint16(3),h.writeUint16(65534),h.writeUint16(9),h.writeUint16(6),h.seek(44),h.writeInt32(f),h.writeInt32(o),h.seek(56),h.writeInt32(4096),h.writeInt32(c),h.writeInt32(l),h.writeInt32(y),h.writeInt32(g);for(var x=0;x<v.length;x++)h.writeInt32(v[x]);for(;x<109;x++)h.writeInt32(-1)}for(var x=0;x<this.liteEnts.length;x++){var a=this.liteEnts[x],B=512*(1+o)+128*x;h.seek(B),h.writeUCS2String(a.entry.name,null,null);var F=h.position-B;h.seek(B+64),h.writeUint16(Math.min(64,F+2)),h.writeUint8(a.entry.type),h.writeUint8(a.isRed?0:1),h.writeInt32(a.left),h.writeInt32(a.right),h.writeInt32(a.child),x===0&&(h.seek(B+80),h.writeUint8Array([11,13,2,0,0,0,0,0,192,0,0,0,0,0,0,70]));var P=x===0?d:a.entry.length,H=P!==0?a.firstSector:a.entry.type===Yr.TypeEnum.DIRECTORY?0:-2;h.seek(B+116),h.writeInt32(H),h.writeInt32(P)}for(var D=0,U=this.liteEnts.filter(function(N){return N.entry.type==Yr.TypeEnum.DOCUMENT&&N.isMini===!1});D<U.length;D++){var a=U[D],Y=a.entry.binaryProvider();h.seek(512*(1+a.firstSector)),h.writeUint8Array(Y)}for(var ee=0,ie=this.liteEnts.filter(function(N){return N.entry.type==Yr.TypeEnum.DOCUMENT&&N.isMini===!0});ee<ie.length;ee++){var a=ie[ee],Y=a.entry.binaryProvider();h.seek(512*(1+p)+64*a.firstSector),h.writeUint8Array(Y)}h.seek(512*(1+c)),h.writeInt32Array(this.miniFat.sectors),this.fat.finalize(512/4,-1),h.seek(512*(1+u)),h.writeInt32Array(this.fat.sectors),g>=1&&(h.seek(512*(1+y)),h.writeInt32Array(k)),this.array=b}return e.prototype.compareName=function(t,o){var n=t.length-o.length;if(n===0){var r=t.toUpperCase(),a=o.toUpperCase();r>a?n=1:r<a&&(n=-1)}return n},e.prototype.buildTree=function(t){var o=this,n=this.liteEnts,r=n[t];if(r.entry.type===Yr.TypeEnum.DOCUMENT)throw new Error("It must be a storage!");var a=r.entry.children.concat();if(1<=a.length){a.sort(function(p,u){return o.compareName(n[p].entry.name,n[u].entry.name)});var i=function(p,u,f){if(p<u){var g=Math.floor((p+u)/2),y=a[g],b=n[y];return b.isRed=f,b.left=i(p,g,!f),b.right=i(g+1,u,!f),y}else return-1},s=function(){var p=Math.floor(a.length/2),u=a[p],f=n[u];return f.isRed=!1,f.left=i(0,p,!0),f.right=i(p+1,a.length,!0),u};r.child=s();for(var l=0,c=a.filter(function(p){return n[p].entry.type===Yr.TypeEnum.DIRECTORY});l<c.length;l++){var d=c[l];this.buildTree(d)}}},e}();function fM(e){return new Uint8Array(new uM(e).array)}});var bk=jt(tl=>{"use strict";var gM=tl&&tl.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(tl,"__esModule",{value:!0});tl.parse=hM;var hk=gM(Qs());function hM(e){for(var t=new hk.default(e,0,hk.default.LITTLE_ENDIAN),o=[];!t.isEof();){var n=t.readUint32(),r=t.readUint16(),a=t.readUint16();o.push({key:n,isStringProperty:(r&1)!=0,guidIndex:r>>1&32767,propertyIndex:a})}return o}});var vk=jt(Gf=>{"use strict";Object.defineProperty(Gf,"__esModule",{value:!0});Gf.parse=bM;function bM(e){for(var t=[],o=0;!e.isEof();){var n=e.readUint16();if(n===258){o=e.readUint16();for(var r=e.readUint16(),a=0;a<o;a+=1){var i=e.readInt32(),s=e.readUint8(),l=e.readString(s),c=e.readUint8(),d=e.readString(c),p=e.readUint8(),u=e.readString(p),f=e.readUint8(),g=e.readString(f),y=e.readInt32(),b=e.readUint8(),h=e.readInt32(),v=e.readInt32(),k=e.readInt32(),x=e.readInt32(),T=e.readInt32(),I=e.readInt32();t.push({VerbType:i,DisplayName:l})}}else if(n===260)for(var a=0;a<o;a+=1){var s=e.readUint8(),l=e.readUCS2String(s),f=e.readUint8(),g=e.readUCS2String(f);t[a].DisplayName=l}}return t.filter(function(B){return B.VerbType===4}).map(function(B){return B.DisplayName}).join(";")}});var yk=jt(Yf=>{"use strict";Object.defineProperty(Yf,"__esModule",{value:!0});Yf.parse=xM;var Vf=di(),vM=1,yM=2;function xM(e){var t={rules:[]};if(!e.isEof()){var o=e.readUint8();if(o!==2)throw new Error("TZDEFINITION major version not supported");var n=e.readUint8();if(o<1)throw new Error("TZDEFINITION minor version not supported");var r=e.readUint16(),a=e.readUint16();if(a&vM&&(e.readInt32(),e.readInt32(),e.readInt32(),e.readInt32()),a&yM){var i=e.readUint16();t.keyName=e.readUCS2String(i)}var s=e.readUint16();e.seek(4+r);for(var l=0;l<s;l++){var c=e.readUint8();if(c!==2)break;var d=e.readUint8();if(c<1)break;var p=e.readUint16(),u=e.position,f=e.readUint16(),g=(0,Vf.readSystemTime)(e),y=e.readInt32(),b=e.readInt32(),h=e.readInt32(),v=(0,Vf.readTransitionSystemTime)(e),k=(0,Vf.readTransitionSystemTime)(e),x=Object.assign({},{flags:f,start:g?.toUTCString()||null,bias:y,standardBias:b,daylightBias:h,standardDate:v,daylightDate:k});t.rules.push(x),e.seek(u+p)}}return t}});var kk=jt(Xf=>{"use strict";Object.defineProperty(Xf,"__esModule",{value:!0});Xf.parse=kM;var xk=di();function kM(e){if(!e.isEof()){var t=e.readInt32(),o=e.readInt32(),n=e.readInt32(),r=e.readUint16(),a=(0,xk.readTransitionSystemTime)(e),i=e.readUint16(),s=(0,xk.readTransitionSystemTime)(e);return Object.assign({},{bias:t,standardBias:o,daylightBias:n,standardYear:r,standardDate:a,daylightYear:i,daylightDate:s})}return null}});var Jf=jt(zt=>{"use strict";Object.defineProperty(zt,"__esModule",{value:!0});zt.OverrideFlags=zt.EndType=zt.CalendarType=zt.PatternType=zt.RecurFrequency=void 0;zt.parse=EM;var wk;(function(e){e[e.Daily=8202]="Daily",e[e.Weekly=8203]="Weekly",e[e.Monthly=8204]="Monthly",e[e.Yearly=8205]="Yearly"})(wk||(zt.RecurFrequency=wk={}));var un;(function(e){e[e.Day=0]="Day",e[e.Week=1]="Week",e[e.Month=2]="Month",e[e.MonthEnd=4]="MonthEnd",e[e.MonthNth=3]="MonthNth",e[e.HjMonth=10]="HjMonth",e[e.HjMonthNth=11]="HjMonthNth",e[e.HjMonthEnd=12]="HjMonthEnd"})(un||(zt.PatternType=un={}));var Ek;(function(e){e[e.Default=0]="Default",e[e.CAL_GREGORIAN=1]="CAL_GREGORIAN",e[e.CAL_GREGORIAN_US=2]="CAL_GREGORIAN_US",e[e.CAL_JAPAN=3]="CAL_JAPAN",e[e.CAL_TAIWAN=4]="CAL_TAIWAN",e[e.CAL_KOREA=5]="CAL_KOREA",e[e.CAL_HIJRI=6]="CAL_HIJRI",e[e.CAL_THAI=7]="CAL_THAI",e[e.CAL_HEBREW=8]="CAL_HEBREW",e[e.CAL_GREGORIAN_ME_FRENCH=9]="CAL_GREGORIAN_ME_FRENCH",e[e.CAL_GREGORIAN_ARABIC=10]="CAL_GREGORIAN_ARABIC",e[e.CAL_GREGORIAN_XLIT_ENGLISH=11]="CAL_GREGORIAN_XLIT_ENGLISH",e[e.CAL_GREGORIAN_XLIT_FRENCH=12]="CAL_GREGORIAN_XLIT_FRENCH",e[e.CAL_LUNAR_JAPANESE=14]="CAL_LUNAR_JAPANESE",e[e.CAL_CHINESE_LUNAR=15]="CAL_CHINESE_LUNAR",e[e.CAL_SAKA=16]="CAL_SAKA",e[e.CAL_LUNAR_ETO_CHN=17]="CAL_LUNAR_ETO_CHN",e[e.CAL_LUNAR_ETO_KOR=18]="CAL_LUNAR_ETO_KOR",e[e.CAL_LUNAR_ROKUYOU=19]="CAL_LUNAR_ROKUYOU",e[e.CAL_LUNAR_KOREAN=20]="CAL_LUNAR_KOREAN",e[e.CAL_UMALQURA=23]="CAL_UMALQURA"})(Ek||(zt.CalendarType=Ek={}));var Ik;(function(e){e[e.EndAfterDate=8225]="EndAfterDate",e[e.EndAfterNOccurrences=8226]="EndAfterNOccurrences",e[e.NeverEnd=8227]="NeverEnd",e[e.NeverEnd2=4294967295]="NeverEnd2"})(Ik||(zt.EndType=Ik={}));var yt;(function(e){e[e.ARO_SUBJECT=1]="ARO_SUBJECT",e[e.ARO_MEETINGTYPE=2]="ARO_MEETINGTYPE",e[e.ARO_REMINDERDELTA=4]="ARO_REMINDERDELTA",e[e.ARO_REMINDER=8]="ARO_REMINDER",e[e.ARO_LOCATION=16]="ARO_LOCATION",e[e.ARO_BUSYSTATUS=32]="ARO_BUSYSTATUS",e[e.ARO_ATTACHMENT=64]="ARO_ATTACHMENT",e[e.ARO_SUBTYPE=128]="ARO_SUBTYPE",e[e.ARO_APPTCOLOR=256]="ARO_APPTCOLOR",e[e.ARO_EXCEPTIONAL_BODY=512]="ARO_EXCEPTIONAL_BODY"})(yt||(zt.OverrideFlags=yt={}));function wM(e){var t=e.readUint16();if(t!==12292)throw new Error("ReaderVersion not supported");var o=e.readUint16();if(o!==12292)throw new Error("WriterVersion not supported");var n=e.readUint16(),r=e.readUint16(),a=e.readUint16(),i=e.readUint32(),s=e.readUint32(),l=e.readUint32(),c=void 0,d=void 0,p=void 0;r===un.Week?c={dayOfWeekBits:e.readUint32()}:r===un.Month||r===un.MonthEnd||r===un.HjMonth||r===un.HjMonthEnd?d={day:e.readUint32()}:(r===un.MonthNth||r===un.HjMonthNth)&&(p={dayOfWeekBits:e.readUint32(),n:e.readUint32()});var u=e.readUint32(),f=e.readUint32(),g=e.readUint32(),y=e.readUint32(),b=Array.from(e.readUint32Array(y)),h=e.readUint32(),v=Array.from(e.readUint32Array(h)),k=e.readUint32(),x=e.readUint32();return Object.assign({recurFrequency:n,patternType:r,calendarType:a,firstDateTime:i,period:s,slidingFlag:l,endType:u,occurrenceCount:f,firstDOW:g,deletedInstanceDates:b,modifiedInstanceDates:v,startDate:k,endDate:x},c?{patternTypeWeek:c}:{},d?{patternTypeMonth:d}:{},p?{patternTypeMonthNth:p}:{})}function EM(e,t){var o=wM(e),n=e.readUint32();if(n!==12294)throw new Error("ReaderVersion2 not supported");var r=e.readUint32();if(r<12294)throw new Error("WriterVersion2 not supported");for(var a=e.readUint32(),i=e.readUint32(),s=e.readUint16(),l=[],c=0;c<s;c++){var d=e.readUint32(),p=e.readUint32(),u=e.readUint32(),f=e.readUint16(),g=void 0;if(f&yt.ARO_SUBJECT){var y=e.readUint16(),b=e.readUint16();if(y-1!==b)throw new Error("subjectLength ".concat(y," and subjectLength2 ").concat(b," are not close!"));g=e.readString(b,t)}var h=void 0;f&yt.ARO_MEETINGTYPE&&(h=e.readUint32());var v=void 0;f&yt.ARO_REMINDERDELTA&&(v=e.readUint32());var k=void 0;f&yt.ARO_REMINDER&&(k=e.readUint32());var x=void 0;if(f&yt.ARO_LOCATION){var T=e.readUint16(),I=e.readUint16();if(T-1!==I)throw new Error("locationLength ".concat(T," and locationLength2 ").concat(I," are not close!"));x=e.readString(I,t)}var B=void 0;f&yt.ARO_BUSYSTATUS&&(B=e.readUint32());var F=void 0;f&yt.ARO_ATTACHMENT&&(F=e.readUint32());var P=void 0;f&yt.ARO_SUBTYPE&&(P=e.readUint32());var H=void 0;f&yt.ARO_APPTCOLOR&&(H=e.readUint32()),l.push(Object.assign({startDateTime:d,endDateTime:p,originalStartTime:u,overrideFlags:f},g?{subject:g}:{},h?{meetingType:h}:{},v?{reminderDelta:v}:{},k?{reminderSet:k}:{},x?{location:x}:{},B?{busyStatus:B}:{},F?{attachment:F}:{},P?{subType:P}:{},H?{appointmentColor:H}:{}))}var D=e.readUint32();if(D!==0)throw new Error("reservedBlock1Size ".concat(D," is not zero, AppointmentRecur is broken"));for(var c=0;c<s;c++){var U=l[c];if(12297<=r){var Y=e.readUint32();U.changeHighlight=e.readUint32(),e.position+=Y-4}var ee=e.readUint32();if(ee!==0)throw new Error("reservedBlockEE1Size ".concat(ee," is not zero, AppointmentRecur is broken"));if(U.overrideFlags&(yt.ARO_SUBJECT|yt.ARO_LOCATION)){var d=e.readUint32(),p=e.readUint32(),ie=e.readUint32();if(U.overrideFlags&yt.ARO_SUBJECT){var N=e.readUint16();U.subject=e.readUCS2String(N)}if(U.overrideFlags&yt.ARO_LOCATION){var se=e.readUint16();U.location=e.readUCS2String(se)}var Je=e.readUint32();if(Je!==0)throw new Error("reservedBlockEE2Size ".concat(Je," is not zero, AppointmentRecur is broken"))}}var Ee=e.readUint32();if(Ee!==0)throw new Error("reservedBlock2Size ".concat(Ee," is not zero, AppointmentRecur is broken"));return{recurrencePattern:o,startTimeOffset:a,endTimeOffset:i,exceptionInfo:l}}});var Zf=jt(xt=>{"use strict";var Sk=xt&&xt.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(xt,"__esModule",{value:!0});xt.OverrideFlags=xt.EndType=xt.CalendarType=xt.PatternType=xt.RecurFrequency=void 0;var Xt=Sk(Cd()),Wn=Sk(Qs()),IM=Wf(),TM=gk(),ui=di(),LM=bk(),SM=vk(),MM=yk(),PM=kk(),CM=Jf(),ol=Jf();Object.defineProperty(xt,"RecurFrequency",{enumerable:!0,get:function(){return ol.RecurFrequency}});Object.defineProperty(xt,"PatternType",{enumerable:!0,get:function(){return ol.PatternType}});Object.defineProperty(xt,"CalendarType",{enumerable:!0,get:function(){return ol.CalendarType}});Object.defineProperty(xt,"EndType",{enumerable:!0,get:function(){return ol.EndType}});Object.defineProperty(xt,"OverrideFlags",{enumerable:!0,get:function(){return ol.OverrideFlags}});var fi;(function(e){e[e.DIRECTORY=1]="DIRECTORY",e[e.DOCUMENT=2]="DOCUMENT",e[e.ROOT=5]="ROOT"})(fi||(fi={}));var Ro;(function(e){e[e.root=0]="root",e[e.toSub=1]="toSub",e[e.named=2]="named"})(Ro||(Ro={}));function Tk(e){return(e-116444736e9)/1e4}function Lk(e){var t=e.indexOf("\0");return t!==-1?e.substring(0,t):e}var AM=function(){function e(t){this.reader=new IM.Reader(t)}return e.prototype.decodeField=function(t,o,n,r,a){var i=n(),s=new Wn.default(i,0,Wn.default.LITTLE_ENDIAN),l=Xt.default.MSG.FIELD.FULL_NAME_MAPPING["".concat(t).concat(o)]||Xt.default.MSG.FIELD.NAME_MAPPING[t],c=Ro.root,d=void 0,p=void 0,u=parseInt("0x".concat(t));if(u>=32768){var f=this.privatePidToKeyed[u];if(f)if(f.useName)l=f.name,c=Ro.named;else{d=f.propertySet,p=(0,ui.toHex4)(f.propertyLid);var g=Xt.default.MSG.FIELD.PIDLID_MAPPING[f.propertySet];if(g!==void 0){var y=g[f.propertyLid];y!==void 0&&(y.dispid!==void 0?(l=y.dispid,c=Ro.root):(l=y.id,c=Ro.toSub))}}}var b=i,h=!1,v=Xt.default.MSG.FIELD.TYPE_MAPPING[o];if(v==="string")b=Lk(s.readString(i.length,r)),h=a;else if(v==="unicode")b=Lk(s.readUCS2String(i.length/2)),h=a;else if(v==="binary")h=a;else if(v==="integer")b=s.readUint32();else if(v==="boolean")b=!!s.readUint16();else if(v==="time"){var k=s.readUint32(),x=k+4294967296*s.readUint32();b=new Date(Tk(x)).toUTCString()}if(h&&(l=void 0),l==="PidLidVerbStream")l="votingOptions",c=Ro.root,b=(0,SM.parse)(s);else if(l==="apptTZDefStartDisplay"||l==="apptTZDefEndDisplay"||l==="apptTZDefRecur")c=Ro.root,b=(0,MM.parse)(s);else if(l==="timeZoneStruct")b=(0,PM.parse)(s);else if(l==="apptRecur")try{b=(0,CM.parse)(s,r)}catch(P){console.debug(P),l=void 0}else if(l==="recipType"){var T=1,I=2,B=3;b===T?b="to":b===I?b="cc":b===B&&(b="bcc")}else l==="globalAppointmentID"&&(b=(0,ui.bin2HexUpper)(s));var F="".concat(t).concat(o);return{key:l,keyType:c,value:b,notForRawProp:h,propertyTag:F,propertySet:d,propertyLid:p}},e.prototype.fieldsDataDocument=function(t,o,n){var r=o.name.substring(12).toLowerCase(),a=r.substring(0,4),i=r.substring(4,8);t.propertyObserver&&t.propertyObserver(n,parseInt(r.substring(0,8),16),o.provider()),a==Xt.default.MSG.FIELD.CLASS_MAPPING.ATTACHMENT_DATA?(n.dataId=o.dataId,n.contentLength=o.length):this.setDecodedFieldTo(t,n,this.decodeField(a,i,o.provider,t.ansiEncoding,!1))},e.prototype.setDecodedFieldTo=function(t,o,n){var r=n.key,a=n.keyType,i=n.value;r!==void 0&&a===Ro.root&&(o[r]=i),t.includeRawProps===!0&&(o.rawProps=o.rawProps||[],n.notForRawProp||o.rawProps.push({propertyTag:n.propertyTag,propertySet:n.propertySet,propertyLid:n.propertyLid,propertyName:n.keyType===Ro.named?n.key:void 0,value:i}))},e.prototype.getFieldType=function(t){var o=t.name.substring(12).toLowerCase();return o.substring(4,8)},e.prototype.fieldsDataDirInner=function(t,o,n,r){var a=this;if(o.name.indexOf(Xt.default.MSG.FIELD.PREFIX.ATTACHMENT)==0){var i={dataType:"attachment"};r.attachments.push(i),this.fieldsDataDir(t,o,n,i,"attachment")}else if(o.name.indexOf(Xt.default.MSG.FIELD.PREFIX.RECIPIENT)==0){var s={dataType:"recipient"};r.recipients.push(s),this.fieldsDataDir(t,o,n,s,"recip")}else if(o.name.indexOf(Xt.default.MSG.FIELD.PREFIX.NAMEID)==0)this.fieldsNameIdDir(t,o,n,r);else{var l=this.getFieldType(o);if(l==Xt.default.MSG.FIELD.DIR_TYPE.INNER_MSG){var c={dataType:"msg",attachments:[],recipients:[]};this.fieldsDataDir(t,o,n,c,"sub"),r.innerMsgContentFields=c,r.innerMsgContent=!0,r.folderId=o.dataId,this.innerMsgBurners[o.dataId]=function(){return a.burnMsg(o,n)}}}},e.prototype.burnMsg=function(t,o){var n=[{name:"Root Entry",type:fi.ROOT,children:[],length:0}];return this.registerFolder(n,0,t,o,0),(0,TM.burn)(n)},e.prototype.registerFolder=function(t,o,n,r,a){for(var i=function(v){var k=v.provider,x=v.length;if(a===0&&v.name==="__properties_version1.0"){var T=k(),I=new Uint8Array(T.length+8);I.set(T.subarray(0,24),0),I.set(T.subarray(24),32),k=function(){return I},x=I.length}var B=t.length;t[o].children.push(B),t.push({name:v.name,type:fi.DOCUMENT,binaryProvider:k,length:x})},s=0,l=n.fileNameSets();s<l.length;s++){var c=l[s];i(c)}if(a===0)for(var d=r.subFolders().filter(function(v){return v.name===Xt.default.MSG.FIELD.PREFIX.NAMEID}),p=0,u=d;p<u.length;p++){var f=u[p],g=t.length;t[o].children.push(g),t.push({name:f.name,type:fi.DIRECTORY,children:[],length:0}),this.registerFolder(t,g,f,r,a+1)}for(var y=0,b=n.subFolders();y<b.length;y++){var h=b[y],g=t.length;t[o].children.push(g),t.push({name:h.name,type:fi.DIRECTORY,children:[],length:0}),this.registerFolder(t,g,h,r,a+1)}},e.prototype.fieldsRecipAndAttachmentProperties=function(t,o,n){var r=o.provider(),a=new Wn.default(r,8,Wn.default.LITTLE_ENDIAN);this.importPropertiesFromFile(t,a,n)},e.prototype.importPropertiesFromFile=function(t,o,n){for(var r={64:function(l){var c=l.getUint32(0,!0)+4294967296*l.getUint32(4,!0);return new Date(Tk(c)).toUTCString()}},a=function(){var l=o.readUint32();if(l===0)return"break";var c=o.readUint32(),d=o.readUint8Array(8);t.propertyObserver(n,l,d);var p=(0,ui.toHex2)(l/65536&65535),u=(0,ui.toHex2)(l&65535);i.setDecodedFieldTo(t,n,i.decodeField(p,u,function(){return d},t.ansiEncoding,!0))},i=this;!o.isEof();){var s=a();if(s==="break")break}},e.prototype.fieldsRootProperties=function(t,o,n){var r=o.provider(),a=new Wn.default(r,32,Wn.default.LITTLE_ENDIAN);this.importPropertiesFromFile(t,a,n)},e.prototype.fieldsDataDir=function(t,o,n,r,a){for(var i=0,s=o.subFolders();i<s.length;i++){var l=s[i];this.fieldsDataDirInner(t,l,n,r)}for(var c=0,d=o.fileNameSets();c<d.length;c++){var p=d[c];p.name.indexOf(Xt.default.MSG.FIELD.PREFIX.DOCUMENT)==0?this.fieldsDataDocument(t,p,r):p.name==="__properties_version1.0"&&(a==="recip"||a==="attachment"||a==="sub"?this.fieldsRecipAndAttachmentProperties(t,p,r):a==="root"&&this.fieldsRootProperties(t,p,r))}},e.prototype.fieldsNameIdDir=function(t,o,n,r){for(var a=void 0,i=void 0,s=void 0,l=0,c=o.fileNameSets();l<c.length;l++){var d=c[l];if(d.name.indexOf(Xt.default.MSG.FIELD.PREFIX.DOCUMENT)==0){var p=d.name.substring(12).toLowerCase(),u=p.substring(0,4),f=p.substring(4,8);u==="0002"&&f==="0102"?a=d.provider():u==="0003"&&f==="0102"?s=d.provider():u==="0004"&&f==="0102"&&(i=d.provider())}}if(a!==void 0&&i!==void 0&&s!==void 0)for(var g=(0,LM.parse)(s),y=new Wn.default(i,0,Wn.default.LITTLE_ENDIAN),b=0,h=g;b<h.length;b++){var v=h[b];if(v.isStringProperty){y.seek(v.key);var k=y.readUint32();this.privatePidToKeyed[32768|v.propertyIndex]={useName:!0,name:y.readUCS2String(k/2)}}else this.privatePidToKeyed[32768|v.propertyIndex]={useName:!1,propertySet:v.guidIndex===1?"00020328-00000-0000-C000-00000000046":v.guidIndex===2?"00020329-00000-0000-C000-00000000046":(0,ui.msftUuidStringify)(a,16*(v.guidIndex-3)),propertyLid:v.key}}},e.prototype.fieldsDataReader=function(t){var o={dataType:"msg",attachments:[],recipients:[]};return this.fieldsDataDir(t,this.reader.rootFolder(),this.reader.rootFolder(),o,"root"),o},e.prototype.parseMsgData=function(t){return this.reader.parse(),this.fieldsDataReader(t)},e.prototype.getFileData=function(){var t,o,n;if(this.fieldsData===void 0){if(!this.reader.isMSGFile())return{dataType:null,error:"Unsupported file type!"};this.innerMsgBurners={},this.privatePidToKeyed={},this.fieldsData=this.parseMsgData({propertyObserver:((t=this.parserConfig)===null||t===void 0?void 0:t.propertyObserver)||function(){},includeRawProps:!!(!((o=this.parserConfig)===null||o===void 0)&&o.includeRawProps),ansiEncoding:(0,ui.emptyToNull)((n=this.parserConfig)===null||n===void 0?void 0:n.ansiEncoding)})}return this.fieldsData},e.prototype.getAttachment=function(t){var o=typeof t=="number"?this.fieldsData.attachments[t]:t;if(o.innerMsgContent===!0&&typeof o.folderId=="number")return{fileName:o.name+".msg",content:this.innerMsgBurners[o.folderId]()};var n=this.reader.readFileOf(o.dataId);return{fileName:o.fileName,content:n}},e}();xt.default=AM});var Mk=jt(No=>{"use strict";var BM=No&&No.__createBinding||(Object.create?function(e,t,o,n){n===void 0&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);(!r||("get"in r?!t.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){n===void 0&&(n=o),e[n]=t[o]}),DM=No&&No.__exportStar||function(e,t){for(var o in e)o!=="default"&&!Object.prototype.hasOwnProperty.call(t,o)&&BM(t,e,o)},_M=No&&No.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(No,"__esModule",{value:!0});var RM=_M(Zf());DM(Zf(),No);No.default=RM.default});function NM(e){let t=e.match(/^=\?([^?]+)\?([BbQq])\?([^?]*)\?=$/);if(!t)return null;let o=t[1].toLowerCase(),n=t[2].toUpperCase(),r=t[3];try{let a;if(n==="B"){let i=atob(r);a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s)}else{let i=[];for(let s=0;s<r.length;s++){let l=r.charCodeAt(s);if(l===95){i.push(32);continue}if(l===61&&s+2<r.length){let c=r.slice(s+1,s+3);if(/^[0-9A-Fa-f]{2}$/.test(c)){i.push(parseInt(c,16)),s+=2;continue}}i.push(l)}a=new Uint8Array(i)}return new TextDecoder(o,{fatal:!1}).decode(a)}catch{return null}}function tg(e){let t=/=\?[^?]+\?[BbQq]\?[^?]*\?=/g,o="",n=0,r=!1,a;for(;(a=t.exec(e))!==null;){let i=e.slice(n,a.index);r&&/^\s*$/.test(i)||(o+=i);let s=NM(a[0])??a[0];o+=s,n=a.index+a[0].length,r=!0}return o+=e.slice(n),o}function Bd(e){if(!e)return;let t=tg(e),o=/[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}/g,n=[],r=new Set,a;for(;(a=o.exec(t))!==null;){let i=a[0].trim(),s=i.toLowerCase();r.has(s)||(r.add(s),n.push(i))}return n.length>0?n:void 0}function OM(e){let t=tg(e).trim(),o=t.match(/^(.*?)<([^>]+)>\s*$/);if(o){let n=o[1].trim().replace(/^"|"$/g,"").trim(),r=o[2].trim();return{fromName:n||void 0,fromEmail:r||void 0}}return/^[^@\s]+@[^@\s]+$/.test(t)?{fromEmail:t}:{fromName:t||void 0}}function HM(e){let t=Date.parse(e.trim());if(!Number.isNaN(t))return new Date(t).toISOString()}function FM(e,t){let o=e.replace(/=\r?\n/g,""),n=[];for(let r=0;r<o.length;r++){let a=o.charCodeAt(r);if(a===61&&r+2<o.length){let i=o.slice(r+1,r+3);if(/^[0-9A-Fa-f]{2}$/.test(i)){n.push(parseInt(i,16)),r+=2;continue}}a<=255?n.push(a):n.push(...new TextEncoder().encode(o[r]))}try{return new TextDecoder(t,{fatal:!1}).decode(new Uint8Array(n))}catch{return new TextDecoder("utf-8",{fatal:!1}).decode(new Uint8Array(n))}}function UM(e,t){try{let o=atob(e.replace(/\s+/g,"")),n=new Uint8Array(o.length);for(let r=0;r<o.length;r++)n[r]=o.charCodeAt(r);return new TextDecoder(t,{fatal:!1}).decode(n)}catch{return e}}function Dd(e){let t=e.replace(/\r\n/g,`
`).replace(/\r/g,`
`),o=t.indexOf(`

`);return o===-1?{headerBlock:t,body:""}:{headerBlock:t.slice(0,o),body:t.slice(o+2)}}function _d(e){let t=new Map,o=e.split(`
`),n=null,r=()=>{n&&(t.set(n.name.toLowerCase(),n.value),n=null)};for(let a of o){if(/^[ \t]/.test(a)&&n){n.value+=" "+a.trim();continue}let i=a.match(/^([!-9;-~]+):\s?(.*)$/);i&&(r(),n={name:i[1],value:i[2]})}return r(),t}function nl(e){if(!e)return{mediaType:"text/plain",params:{}};let t=e.split(";").map(r=>r.trim()),o=(t.shift()??"").toLowerCase(),n={};for(let r of t){let a=r.match(/^([^=]+)=(.*)$/);if(!a)continue;let i=a[1].trim().toLowerCase(),s=a[2].trim();s.startsWith('"')&&s.endsWith('"')&&(s=s.slice(1,-1)),n[i]=s}return{mediaType:o,params:n}}function gi(e,t){let n=(nl(t.get("content-type")).params.charset||"utf-8").toLowerCase(),r=(t.get("content-transfer-encoding")||"7bit").toLowerCase();if(r==="base64")return UM(e,n);if(r==="quoted-printable")return FM(e,n);if(n!=="utf-8"&&n!=="us-ascii"&&n!=="ascii")try{let a=new Uint8Array(e.length);for(let i=0;i<e.length;i++)a[i]=e.charCodeAt(i)&255;return new TextDecoder(n,{fatal:!1}).decode(a)}catch{return e}return e}function Pk(e,t,o){if(t.mediaType.startsWith("multipart/")){let n=t.params.boundary;if(!n)return;let r="--"+n,a=e.split(r);for(let i=1;i<a.length;i++){let s=a[i];if(s.startsWith("--"))break;s=s.replace(/^\r?\n/,"");let{headerBlock:l,body:c}=Dd(s),d=_d(l),p=nl(d.get("content-type"));if(p.mediaType==="text/plain")return gi(c.replace(/\r?\n--$/,""),d);if(p.mediaType.startsWith("multipart/")){let u=Pk(c,p,d);if(u)return u}}for(let i=1;i<a.length;i++){let s=a[i];if(s.startsWith("--"))break;s=s.replace(/^\r?\n/,"");let{headerBlock:l,body:c}=Dd(s),d=_d(l);if(nl(d.get("content-type")).mediaType==="text/html"){let u=gi(c,d);return eg(u)}}return}if(t.mediaType==="text/plain")return gi(e,o);if(t.mediaType==="text/html"){let n=gi(e,o);return eg(n)}}function Ck(e,t,o){if(t.mediaType==="text/html")return gi(e,o);if(t.mediaType.startsWith("multipart/")){let n=t.params.boundary;if(!n)return;let r="--"+n,a=e.split(r);for(let i=1;i<a.length;i++){let s=a[i];if(s.startsWith("--"))break;s=s.replace(/^\r?\n/,"");let{headerBlock:l,body:c}=Dd(s),d=_d(l),p=nl(d.get("content-type"));if(p.mediaType==="text/html")return gi(c.replace(/\r?\n--$/,""),d);if(p.mediaType.startsWith("multipart/")){let u=Ck(c,p,d);if(u)return u}}}}function og(e){let{headerBlock:t,body:o}=Dd(e),n=_d(t),r=nl(n.get("content-type")),a=n.get("subject"),i=n.get("from"),s=n.get("date"),l=a?tg(a).trim():void 0,c=i?OM(i):{},d=s?HM(s):void 0,p=Pk(o,r,n),u=Ck(o,r,n),f=n.get("message-id")?.trim()||void 0;return{subject:l,fromName:c.fromName,fromEmail:c.fromEmail,dateISO:d,body:p?.replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim(),bodyHtml:u?.trim()||void 0,internetMessageId:f,toEmails:Bd(n.get("to")),ccEmails:Bd(n.get("cc"))}}async function ng(e){let t=await e.arrayBuffer(),o=Qf.default.default??Qf.default,r=new o(t).getFileData(),a=[{key:"clientSubmitTime",val:r.clientSubmitTime},{key:"messageDeliveryTime",val:r.messageDeliveryTime},{key:"creationTime",val:r.creationTime},{key:"lastModificationTime",val:r.lastModificationTime}];console.debug("[app/parseMsg] date candidates:",a);let i;for(let v of a){if(!v.val||typeof v.val!="string")continue;let k=Date.parse(v.val);if(Number.isNaN(k))continue;let x=new Date(k).getUTCFullYear();if(!(x<1980||x>2100)){i=new Date(k).toISOString(),console.debug("[app/parseMsg] adopted date:",v.key,"\u2192",i);break}}let s=r.bodyHtml?.trim()||void 0;if(!s){let v=r.html;if(v instanceof Uint8Array&&v.length){let k=new TextDecoder("utf-8").decode(v),x=k.match(/charset\s*=\s*["']?([\w-]+)/i);if(x&&x[1]&&!/utf-?8/i.test(x[1]))try{k=new TextDecoder(x[1].toLowerCase()).decode(v)}catch{}s=k.trim()||void 0}}let l=r.body?.trim()||void 0;!l&&s&&(l=eg(s).trim()||void 0);let c=r.senderEmail,d=r.senderSmtpAddress??r.sentRepresentingSmtpAddress,p;typeof d=="string"&&/@/.test(d)?p=d.trim():typeof c=="string"&&/@/.test(c)&&(p=c.trim());let u=r,f,g=u.internetMessageId;if(typeof g=="string"&&g.trim())f=g.trim();else{let v=u.headers;if(typeof v=="string"&&v){let k=v.match(/^message-id:\s*(<[^>\r\n]+>)/im);k&&(f=k[1].trim())}}let y,b,h=r.recipients;if(Array.isArray(h)){let v=[],k=[];for(let x of h){if(!x||typeof x!="object")continue;let T=x,I=String(T.smtpAddress??"").trim(),B=String(T.email??"").trim(),F="";if(I&&/@/.test(I))F=I;else if(B&&/@/.test(B))F=B;else continue;let P=T.recipType,H=typeof P=="string"&&P.toLowerCase()==="cc"||typeof P=="number"&&P===2,D=typeof P=="string"&&P.toLowerCase()==="to"||typeof P=="number"&&P===1;H?k.push(F):D&&v.push(F)}v.length>0&&(y=v),k.length>0&&(b=k)}if(!y||!b){let v=u.headers;if(typeof v=="string"&&v){if(!y){let k=v.match(/^to:\s*([^\r\n]+(?:\r?\n[ \t][^\r\n]+)*)/im);y=Bd(k?.[1])}if(!b){let k=v.match(/^cc:\s*([^\r\n]+(?:\r?\n[ \t][^\r\n]+)*)/im);b=Bd(k?.[1])}}}return{subject:r.subject?.trim()||void 0,fromName:r.senderName?.trim()||void 0,fromEmail:p,dateISO:i,body:l,bodyHtml:s,internetMessageId:f,toEmails:y,ccEmails:b}}function eg(e){return e.replace(/<style[\s\S]*?<\/style>/gi,"").replace(/<script[\s\S]*?<\/script>/gi,"").replace(/<\/(p|div|li|tr|h[1-6])>\s*/gi,`
`).replace(/\s*<br\s*\/?>\s*/gi,`
`).replace(/<(p|div|li|tr|h[1-6])[^>]*>\s*/gi,"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`)}var Qf,Ak=L(()=>{"use strict";Qf=O1(Mk())});function Bk(e){let t=[e.fromName,e.fromEmail&&e.fromEmail!==e.fromName?"<"+e.fromEmail+">":""].filter(Boolean).join(" ").trim()||e.fromEmail||"";return{imid:(e.internetMessageId||"").replace(/^</,"").replace(/>$/,"").trim(),subject:e.subject||"",from:t,date:e.dateISO||""}}function Dk(e){let t=e.name.toLowerCase();return t.endsWith(".eml")||t.endsWith(".msg")}async function _k(e,t){try{let o=await fetch(e,{credentials:"include"});if(!o.ok)return null;let n=t.toLowerCase();return n.endsWith(".eml")?og(await o.text()):n.endsWith(".msg")?ng(new File([await o.blob()],t)):null}catch{return null}}function Rk(e){return e.body&&e.body.trim()?e.body:e.bodyHtml?e.bodyHtml.replace(/<\s*(script|style)[^>]*>[\s\S]*?<\/\s*\1\s*>/gi," ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/[ \t]+/g," ").replace(/\n{3,}/g,`

`).trim():""}async function Nk(e){let t=e.name.toLowerCase();try{if(t.endsWith(".eml")){let o=Bk(og(await e.text()));return o.imid||o.subject?o:null}if(t.endsWith(".msg")){let o=Bk(await ng(e));return o.imid||o.subject?o:null}}catch{}return null}var rg=L(()=>{"use strict";Ak()});function zM(){let e=no.get();if(e)try{return new URL(e).origin}catch{}return"http://localhost:18080"}async function jM(e){if(!e){w("Message-Id \u304C\u7121\u3044\u305F\u3081\u958B\u3051\u307E\u305B\u3093","err");return}let t=zM()+"/memola/outlook/open?id="+encodeURIComponent(e);try{let o=await fetch(t),n=await o.json().catch(()=>null);if(!o.ok||!n?.ok){w("\u30EA\u30EC\u30FC\u304C\u30E1\u30FC\u30EB\u3092\u958B\u3051\u307E\u305B\u3093\u3067\u3057\u305F","err");return}n.found===!1&&w("Outlook \u5185\u306B\u8A72\u5F53\u30E1\u30FC\u30EB\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F","err")}catch{w("\u30EA\u30EC\u30FC\u306B\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093(\u4E2D\u7D99\u30B5\u30FC\u30D0\u3092\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044)","err")}}function Ok(e,t){let o=!0,n=()=>window.getSelection()?.anchorNode?.parentElement?.closest("[data-block-id]")?.dataset.blockId||null,r=(s,l)=>{let c=Wv(l);return e.applyMutation(d=>{let p=d.blocks.slice(),u=s?p.findIndex(b=>b.id===s):p.length-1,f=u>=0?u+1:p.length;p.splice(f,0,c);let g=p[f+1],y;if(g&&g.kind!=="image"&&g.kind!=="email"&&"inline"in g)y=g.id;else{let b=nt("");p.splice(f+1,0,b),y=b.id}return{...d,blocks:p,selection:{kind:"caret",blockId:y,offset:0}}},"structural"),c.id},a=async s=>{if(!s.dataTransfer?.files?.length)return;let l=Array.from(s.dataTransfer.files).filter(Dk);if(l.length===0)return;s.preventDefault();let c=n();try{R(!0,"\u30E1\u30FC\u30EB\u3092\u53D6\u308A\u8FBC\u307F\u4E2D...");for(let d of l){if(!o)return;let p=await Nk(d);if(!p){w(`${d.name}: \u30E1\u30FC\u30EB\u3092\u89E3\u6790\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F`,"err");continue}let u=await jf(d,"mail",d.name.toLowerCase().endsWith(".msg")?".msg":".eml");c=r(c,{imid:p.imid,subject:p.subject,from:p.from,date:p.date,fileUrl:u,filename:d.name})}}catch(d){o&&w("\u30E1\u30FC\u30EB\u53D6\u308A\u8FBC\u307F\u5931\u6557: "+d.message,"err")}finally{R(!1)}},i=s=>{let l=s.target?.closest?.(".memola-email-src");l&&(s.preventDefault(),s.stopPropagation(),jM(l.dataset.emailSrc||""))};return t.addEventListener("drop",a),t.addEventListener("click",i,!0),()=>{o=!1,t.removeEventListener("drop",a),t.removeEventListener("click",i,!0)}}var Hk=L(()=>{"use strict";So();qf();rg();ve();le()});function $M(e){try{let r=document.createRange();r.selectNodeContents(e);let a=r.getClientRects();for(let i=0;i<a.length;i++)if(a[i].height>0)return{top:a[i].top,height:a[i].height}}catch{}let t=e.getBoundingClientRect(),o=parseFloat(window.getComputedStyle(e).lineHeight),n=isFinite(o)&&o>0?Math.min(o,t.height):t.height;return{top:t.top,height:n}}function Fk(e,t){let o=document.createElement("div");o.className="memola-block-handle",o.style.cssText="position:absolute; cursor:grab; user-select:none; opacity:0; pointer-events:none; z-index:2147483646; padding:2px 4px; color:#9b9a97; font-size:18px; line-height:1; transition:opacity 0.1s;",o.textContent="\u22EE\u22EE",o.draggable=!0,o.title="\u30C9\u30E9\u30C3\u30B0\u3067\u79FB\u52D5 / \u30AF\u30EA\u30C3\u30AF\u3067\u30E1\u30CB\u30E5\u30FC",(document.getElementById("memola-overlay")||document.body).appendChild(o);let n=null,r=null,a=null,i=null,s=!1,l=P=>{if(P===n)return;n=P;let H=P.getBoundingClientRect(),D=o.offsetHeight||22,U,Y;if(P.dataset.blockKind==="rule")U=H.top,Y=H.height;else{let ee=$M(P);U=ee.top,Y=ee.height}o.style.top=U+window.scrollY+(Y-D)/2+"px",o.style.left=H.left+window.scrollX-28+"px",o.style.opacity="1",o.style.pointerEvents="auto"},c=()=>{i||(n=null,o.style.opacity="0",o.style.pointerEvents="none")},d=P=>{i&&!i.contains(P.target)&&P.target!==o&&u()},p=P=>{P.key==="Escape"&&(P.preventDefault(),P.stopPropagation(),u())};function u(){i&&(i.remove(),i=null),document.removeEventListener("mousedown",d,!0),document.removeEventListener("keydown",p,!0)}let f=(P,H)=>{let D=document.createElement("button");return D.className="memola-blk-menu-item",D.textContent=P,D.addEventListener("mousedown",U=>{U.preventDefault(),U.stopPropagation(),u(),H()}),D},g=P=>{let H=P.dataset.blockId;if(!H)return;u(),i=document.createElement("div"),i.className="memola-blk-menu",i.appendChild(f("\uFF0B \u4E0B\u306B\u30D6\u30ED\u30C3\u30AF\u3092\u8FFD\u52A0",()=>{e.applyMutation(ee=>Ya(ee,H,nt("")),"structural")})),i.appendChild(f("\u{1F4AC} \u30B3\u30E1\u30F3\u30C8",()=>{Promise.resolve().then(()=>(Ao(),mn)).then(ee=>{let ie=ee.currentCommentTarget();ie&&ee.openCommentPopover(ie.pageId,H)})}));let D=document.createElement("div");D.className="memola-blk-menu-hd",D.textContent="\u7A2E\u985E\u3092\u5909\u66F4",i.appendChild(D);for(let ee of qM)i.appendChild(f(ee.label,()=>{e.applyMutation(ie=>Gv(ie,H,ee.cmd),"structural")}));(document.getElementById("memola-overlay")||document.body).appendChild(i);let U=o.getBoundingClientRect();i.style.left=U.right+window.scrollX+4+"px",i.style.top=U.top+window.scrollY+"px";let Y=i.getBoundingClientRect();Y.right>window.innerWidth&&(i.style.left=U.left+window.scrollX-Y.width-4+"px"),Y.bottom>window.innerHeight&&(i.style.top=window.innerHeight-Y.height-8+window.scrollY+"px"),setTimeout(()=>{document.addEventListener("mousedown",d,!0),document.addEventListener("keydown",p,!0)},0)},y=P=>{if(P.preventDefault(),P.stopPropagation(),s){s=!1;return}if(i){u();return}n&&g(n)};o.addEventListener("click",y);let b=(P,H)=>{let D=Array.from(t.children);for(let U of D){if(!U.dataset.blockId)continue;let Y=U.getBoundingClientRect(),ee=Y.left-32;if(P>=ee&&P<=Y.right&&H>=Y.top&&H<=Y.bottom)return U}return null},h=P=>{for(;P&&P!==t;){let H=P;if(H.parentElement===t&&H.dataset?.blockId)return H;P=P.parentNode}return null},v=()=>{let P=window.getSelection();if(!P||P.rangeCount===0)return null;let H=P.getRangeAt(0);return t.contains(H.startContainer)?h(H.startContainer):null},k=P=>{if(r)return;let H=P.target;if(H===o)return;let D=b(P.clientX,P.clientY);if(D){l(D);return}if(H&&!t.contains(H)){let U=v();U?l(U):c()}};document.addEventListener("mousemove",k);let x=()=>{if(r)return;let P=v();P&&l(P)};document.addEventListener("selectionchange",x);let T=P=>{if(!n){P.preventDefault();return}if(s=!0,u(),r=n.dataset.blockId||null,!r){P.preventDefault();return}n.classList.add("memola-block-dragging"),P.dataTransfer&&(P.dataTransfer.effectAllowed="move",P.dataTransfer.setData("text/plain","")),a=document.createElement("div"),a.className="memola-block-placeholder",a.style.cssText="height:2px; background:#2383e2; margin:0 0 0 0; border-radius:1px;",document.addEventListener("dragover",B),document.addEventListener("drop",F)},I=()=>{r&&n&&n.classList.remove("memola-block-dragging"),a?.parentNode&&a.parentNode.removeChild(a),a=null,r=null,setTimeout(()=>{s=!1},0),document.removeEventListener("dragover",B),document.removeEventListener("drop",F)};o.addEventListener("dragstart",T),o.addEventListener("dragend",I);let B=P=>{if(!r||!a)return;P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="move");let H=Array.from(t.children).filter(ee=>ee.dataset.blockId&&ee.dataset.blockId!==r&&ee!==a);if(H.length===0){t.appendChild(a);return}let D=H[0].getBoundingClientRect();if(P.clientY<D.top){a!==t.firstElementChild&&t.insertBefore(a,H[0]);return}let Y=H[H.length-1].getBoundingClientRect();if(P.clientY>Y.bottom){a!==t.lastElementChild&&t.appendChild(a);return}for(let ee of H){let ie=ee.getBoundingClientRect();if(P.clientY>=ie.top&&P.clientY<=ie.bottom){let se=P.clientY<ie.top+ie.height/2?ee:ee.nextSibling;a.nextSibling!==se&&a!==se&&t.insertBefore(a,se);return}}},F=P=>{if(!r||!a?.parentNode){I();return}P.preventDefault();let H=Array.from(t.children),D=0;for(let Y of H){if(Y===a)break;Y.dataset.blockId&&Y.dataset.blockId!==r&&D++}let U=r;e.applyMutation(Y=>jv(Y,U,D),"structural"),I()};return()=>{I(),u(),document.removeEventListener("mousemove",k),document.removeEventListener("selectionchange",x),document.removeEventListener("dragover",B),document.removeEventListener("drop",F),o.remove()}}var qM,Uk=L(()=>{"use strict";So();qM=[{cmd:"p",label:"\u30C6\u30AD\u30B9\u30C8"},{cmd:"h1",label:"\u898B\u51FA\u30571"},{cmd:"h2",label:"\u898B\u51FA\u30572"},{cmd:"h3",label:"\u898B\u51FA\u30573"},{cmd:"todo",label:"ToDo \u30EA\u30B9\u30C8"},{cmd:"ul",label:"\u7B87\u6761\u66F8\u304D\u30EA\u30B9\u30C8"},{cmd:"ol",label:"\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8"},{cmd:"quote",label:"\u5F15\u7528"},{cmd:"callout",label:"\u30B3\u30FC\u30EB\u30A2\u30A6\u30C8"},{cmd:"pre",label:"\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF"},{cmd:"hr",label:"\u533A\u5207\u308A\u7DDA"}]});function jk(e,t){let o=null,n=null,r=()=>{n&&(clearTimeout(n),n=null)},a=()=>{n||(n=setTimeout(()=>{n=null,Wi(),o=null},KM))},i=()=>o&&t.querySelector('[data-block-id="'+x(o)+'"]')?.querySelector(".memola-itbl-wrap")||null,s=S=>{let C=typeof document.elementFromPoint=="function"?document.elementFromPoint(S.clientX,S.clientY):S.target;if(C&&typeof C.closest=="function"&&C.closest(".memola-tbl-btn")){r();return}let _=C&&typeof C.closest=="function"?C.closest(".memola-itbl-wrap"):null;if(_&&t.contains(_)){let V=_.closest("[data-block-id]")?.dataset.blockId;if(V){r(),o=V,cb(_,S.clientX,S.clientY);return}}let O=i();if(O){let z=O.getBoundingClientRect();if(S.clientX>=z.left-Rd&&S.clientX<=z.right+Rd&&S.clientY>=z.top-Rd&&S.clientY<=z.bottom+Rd){r(),cb(O,S.clientX,S.clientY);return}}a()},l=S=>{let C=e.getSelection();if(C&&C.kind==="table-cells"&&(S.key==="Backspace"||S.key==="Delete")){S.preventDefault(),S.stopPropagation(),T(C);return}let _=S.target;if(!_||_.tagName!=="TD")return;let O=_;if(!t.contains(O))return;let z=c(O);if(!z||S.isComposing||S.keyCode===229)return;let V=S.key;if(V==="Enter"&&!S.shiftKey&&!S.metaKey&&!S.ctrlKey&&!S.altKey){S.preventDefault(),S.stopPropagation(),g(O,z.row+1,z.col,"row");return}if(V==="Tab"){if(S.preventDefault(),S.stopPropagation(),S.shiftKey)z.col>0?g(O,z.row,z.col-1):z.row>0&&g(O,z.row-1,d(O));else{let fe=d(O);z.col<fe?g(O,z.row,z.col+1):g(O,z.row+1,0,"row")}return}if(V==="ArrowDown"){S.preventDefault(),S.stopPropagation(),z.row<p(O)&&g(O,z.row+1,z.col);return}if(V==="ArrowUp"){S.preventDefault(),S.stopPropagation(),z.row>0&&g(O,z.row-1,z.col);return}if(V==="ArrowLeft"&&y(O)){S.preventDefault(),S.stopPropagation(),z.col>0?g(O,z.row,z.col-1):z.row>0&&g(O,z.row-1,d(O));return}if(V==="ArrowRight"&&b(O)){S.preventDefault(),S.stopPropagation();let fe=d(O);z.col<fe?g(O,z.row,z.col+1):z.row<p(O)&&g(O,z.row+1,0);return}};function c(S){let C=S.parentElement;if(!C||C.tagName!=="TR")return null;let _=C.parentElement;if(!_||_.tagName!=="TBODY")return null;let O=Array.from(_.children).indexOf(C),z=Array.from(C.children).indexOf(S);return O<0||z<0?null:{tbody:_,row:O,col:z}}function d(S){let C=S.parentElement;return C?C.children.length-1:0}function p(S){let C=S.parentElement?.parentElement;return C?C.children.length-1:0}function u(S){S.focus();let C=document.createRange();C.selectNodeContents(S),C.collapse(!1);let _=window.getSelection();_&&(_.removeAllRanges(),_.addRange(C))}function f(S,C,_){return t.querySelector('[data-block-id="'+x(S)+'"]')?.querySelector("tbody")?.children[C]?.children[_]||null}function g(S,C,_,O){let V=S.closest("[data-block-id]")?.dataset.blockId;if(!V)return;let fe=c(S);if(!fe)return;let te=zk(S);e.applyMutation(he=>{let ue=he.blocks.findIndex(Oe=>Oe.id===V);if(ue<0)return{...he,selection:null};let Me=he.blocks[ue];if(Me.kind!=="table")return{...he,selection:null};let Z=Me.rows[fe.row]?.[fe.col],Ce=!!Z&&JSON.stringify(Z)===JSON.stringify(te),qe=he;if(!Ce){let Oe=Me.rows.map((xn,Ae)=>Ae===fe.row?xn.map((bt,A1)=>A1===fe.col?te:bt):xn),wt=he.blocks.slice();wt[ue]={...Me,rows:Oe},qe={...he,blocks:wt}}return{...qe,selection:null}},"typing");let pe=f(V,C,_);!pe&&O==="row"&&(e.applyMutation(he=>_s(he,V,C),"structural"),pe=f(V,C,_)),pe&&u(pe)}function y(S){let C=window.getSelection();if(!C||C.rangeCount===0)return!1;let _=C.getRangeAt(0);if(!_.collapsed)return!1;let O=document.createRange();return O.selectNodeContents(S),O.setEnd(_.startContainer,_.startOffset),O.toString().length===0}function b(S){let C=window.getSelection();if(!C||C.rangeCount===0)return!1;let _=C.getRangeAt(0);if(!_.collapsed)return!1;let O=document.createRange();return O.selectNodeContents(S),O.setStart(_.endContainer,_.endOffset),O.toString().length===0}function h(S){if(S.querySelector("br"))return!1;let C=parseFloat(getComputedStyle(S).lineHeight)||20;return S.getBoundingClientRect().height<=C*1.8}function v(S){if(h(S))return!0;let C=window.getSelection();if(!C||C.rangeCount===0)return!1;let _=C.getRangeAt(0).getBoundingClientRect();if(_.top===0&&_.bottom===0)return!0;let O=S.getBoundingClientRect(),z=parseFloat(getComputedStyle(S).lineHeight)||20;return _.top-O.top<z}function k(S){if(h(S))return!0;let C=window.getSelection();if(!C||C.rangeCount===0)return!1;let _=C.getRangeAt(0).getBoundingClientRect();if(_.top===0&&_.bottom===0)return!0;let O=S.getBoundingClientRect(),z=parseFloat(getComputedStyle(S).lineHeight)||20;return O.bottom-_.bottom<z}function x(S){return typeof CSS<"u"&&CSS.escape?CSS.escape(S):S.replace(/[^a-zA-Z0-9_-]/g,C=>"\\"+C)}function T(S){let C=Math.min(S.anchor.row,S.focus.row),_=Math.max(S.anchor.row,S.focus.row),O=Math.min(S.anchor.col,S.focus.col),z=Math.max(S.anchor.col,S.focus.col);e.applyMutation(V=>{let fe=V.blocks.findIndex(ue=>ue.id===S.blockId);if(fe<0)return V;let te=V.blocks[fe];if(te.kind!=="table")return V;let pe=te.rows.map((ue,Me)=>Me<C||Me>_?ue:ue.map((Z,Ce)=>Ce<O||Ce>z?Z:[])),he=V.blocks.slice();return he[fe]={...te,rows:pe},{...V,blocks:he,selection:null}},"delete"),Promise.resolve().then(()=>{let te=t.querySelector('[data-block-id="'+x(S.blockId)+'"]')?.querySelector("tbody")?.children[S.anchor.row]?.children[S.anchor.col];if(te){te.focus();let pe=document.createRange();pe.selectNodeContents(te),pe.collapse(!0);let he=window.getSelection();he&&(he.removeAllRanges(),he.addRange(pe))}})}let I=S=>{let C=S.target;if(!C||C.tagName!=="TD"||!document.contains(C))return;let _=C.parentElement,O=_?.parentElement,V=O?.parentElement?.closest("[data-block-id]");if(!V||!V.dataset.blockId||!_)return;let fe=V.dataset.blockId,te=Array.from(O.children).indexOf(_),pe=Array.from(_.children).indexOf(C);if(te<0||pe<0)return;let he=zk(C),Me=e.getBlocks().find(Z=>Z.id===fe);if(Me&&Me.kind==="table"){let Z=Me.rows[te]?.[pe];if(Z&&JSON.stringify(Z)===JSON.stringify(he))return}e.applyMutation(Z=>Vv(Z,fe,te,pe,he),"typing")},B=6,F=null;function P(S,C){let O=S.getBoundingClientRect().right-C;return O<=B&&O>=-2}let H=S=>{if(S.button!==0)return!1;let C=S.target;if(!C||typeof C.closest!="function")return!1;let _=C.closest("td");if(!_||!t.contains(_)||!P(_,S.clientX))return!1;let O=c(_),z=_.closest("[data-block-id]")?.dataset.blockId;return!O||!z?!1:(S.preventDefault(),S.stopPropagation(),F={blockId:z,colIdx:O.col,startX:S.clientX,startW:_.offsetWidth},document.body.style.cursor="col-resize",!0)},D=S=>{if(!F)return;if(!(S.buttons&1)){U();return}let C=S.clientX-F.startX,_=Math.max(60,F.startW+C),{blockId:O,colIdx:z}=F;e.applyMutation(V=>{let fe=V.blocks.findIndex(Me=>Me.id===O);if(fe<0)return V;let te=V.blocks[fe];if(te.kind!=="table")return V;let pe=te.rows[0]?.length||0,he=(te.colWidths||[]).slice();for(;he.length<pe;)he.push(0);he[z]=_;let ue=V.blocks.slice();return ue[fe]={...te,colWidths:he},{...V,blocks:ue}},"structural")},U=()=>{F&&(F=null,document.body.style.cursor="")},Y=S=>{let C=S.target;if(!C||typeof C.closest!="function")return;let _=C.closest("td");!_||!t.contains(_)||(_.style.cursor=P(_,S.clientX)?"col-resize":"")},ee=null,ie=!1,N=S=>{if(S.button!==0||H(S))return;let C=S.target;if(!C||typeof C.closest!="function")return;let _=C.closest("td");if(!_||!t.contains(_))return;let O=c(_),z=_.closest("[data-block-id]")?.dataset.blockId;!O||!z||(ee={blockId:z,row:O.row,col:O.col},ie=!1,Ee={blockId:z,row:O.row,col:O.col},Gl())},se=S=>{if(!ee)return;if(!(S.buttons&1)){ee=null,ie=!1;return}let C=S.target;if(!C||typeof C.closest!="function")return;let _=C.closest("td");if(!_||!t.contains(_))return;let O=c(_),z=_.closest("[data-block-id]")?.dataset.blockId;if(!O||!z||z!==ee.blockId||O.row===ee.row&&O.col===ee.col&&!ie)return;if(!ie){ie=!0,dt(),Ee=null;let pe=window.getSelection();pe&&pe.removeAllRanges()}S.preventDefault();let fe={row:ee.row,col:ee.col},te={row:O.row,col:O.col};e.applyMutation(pe=>({...pe,selection:{kind:"table-cells",blockId:ee.blockId,anchor:fe,focus:te}}),"selection")},Je=()=>{ee=null},Ee=null,Ze=[{label:"\u306A\u3057",value:""},{label:"\u30B0\u30EC\u30FC",value:"#f1f1ef"},{label:"\u8D64",value:"#fdebec"},{label:"\u30AA\u30EC\u30F3\u30B8",value:"#fbecdd"},{label:"\u9EC4",value:"#fbf3db"},{label:"\u7DD1",value:"#ddedea"},{label:"\u9752",value:"#ddebf1"},{label:"\u7D2B",value:"#eae4f2"},{label:"\u30D4\u30F3\u30AF",value:"#f4dfeb"}];function to(S){let C=document.getElementById("memola-tbl-h-"+S);return C||(C=document.createElement("div"),C.id="memola-tbl-h-"+S,C.className="memola-tbl-handle memola-tbl-handle-"+S,C.style.display="none",(document.getElementById("memola-overlay")||document.body).appendChild(C),C.addEventListener("mousedown",_=>{_.preventDefault(),_.stopPropagation(),C1(S,C)}),C)}function dt(){["row","col","cell"].forEach(S=>{let C=document.getElementById("memola-tbl-h-"+S);C&&(C.style.display="none")}),t.querySelectorAll(".memola-itbl-selcell").forEach(S=>S.classList.remove("memola-itbl-selcell"))}function Gl(){if(!Ee){dt();return}let S=f(Ee.blockId,Ee.row,Ee.col),C=S?.closest("table");if(!S||!C){dt();return}let _=S.getBoundingClientRect(),O=C.getBoundingClientRect(),z=window.scrollX,V=window.scrollY,fe=to("row");fe.style.left=O.left+z-16+"px",fe.style.top=_.top+V+"px",fe.style.height=_.height+"px",fe.style.display="flex";let te=to("col");te.style.left=_.left+z+"px",te.style.top=O.top+V-16+"px",te.style.width=_.width+"px",te.style.display="flex";let pe=to("cell");pe.style.left=_.right+z-5+"px",pe.style.top=_.top+V+(_.height-18)/2+"px",pe.style.display="flex",t.querySelectorAll(".memola-itbl-selcell").forEach(he=>he.classList.remove("memola-itbl-selcell")),S.classList.add("memola-itbl-selcell")}function _t(S){e.applyMutation(S,"structural"),ca(),dt(),Ee=null}function ca(){document.getElementById("memola-tbl-cell-menu")?.remove()}function C1(S,C){if(!Ee)return;let{blockId:_,row:O,col:z}=Ee;ca();let V=document.createElement("div");V.id="memola-tbl-cell-menu",V.className="memola-tbl-cell-menu";let fe=C.getBoundingClientRect();V.style.left=fe.left+window.scrollX+"px",V.style.top=fe.bottom+window.scrollY+4+"px";let te=(Z,Ce,qe=!1)=>{let Oe=document.createElement("div");return Oe.className="memola-tbl-cell-menu-item"+(qe?" danger":""),Oe.textContent=Z,Oe.addEventListener("mousedown",wt=>{wt.preventDefault(),wt.stopPropagation(),Ce()}),Oe},pe=()=>{let Z=document.createElement("div");return Z.className="memola-tbl-cell-menu-sep",Z},he=Z=>{let Ce=document.createElement("div");return Ce.className="memola-tbl-cell-menu-collabel",Ce.textContent=Z,Ce},ue=Z=>{let Ce=document.createElement("div");Ce.className="memola-tbl-cell-colors";for(let qe of Ze){let Oe=document.createElement("button");Oe.className="memola-tbl-cell-swatch"+(qe.value?"":" none"),Oe.title=qe.label,qe.value&&(Oe.style.background=qe.value),Oe.addEventListener("mousedown",wt=>{wt.preventDefault(),wt.stopPropagation(),Z(qe.value)}),Ce.appendChild(Oe)}return Ce};S==="row"?V.append(te("\u2191 \u4E0A\u306B\u884C\u3092\u633F\u5165",()=>_t(Z=>_s(Z,_,O))),te("\u2193 \u4E0B\u306B\u884C\u3092\u633F\u5165",()=>_t(Z=>_s(Z,_,O+1))),te("\u884C\u3092\u524A\u9664",()=>_t(Z=>Bu(Z,_,O)),!0),pe(),he("\u884C\u306E\u8272"),ue(Z=>_t(Ce=>Xv(Ce,_,O,Z)))):S==="col"?V.append(te("\u2190 \u5DE6\u306B\u5217\u3092\u633F\u5165",()=>_t(Z=>Qc(Z,_,z))),te("\u2192 \u53F3\u306B\u5217\u3092\u633F\u5165",()=>_t(Z=>Qc(Z,_,z+1))),te("\u5217\u3092\u524A\u9664",()=>_t(Z=>Du(Z,_,z)),!0),pe(),he("\u5217\u306E\u8272"),ue(Z=>_t(Ce=>Jv(Ce,_,z,Z)))):V.append(he("\u30BB\u30EB\u306E\u8272"),ue(Z=>_t(Ce=>Yv(Ce,_,O,z,Z)))),(document.getElementById("memola-overlay")||document.body).appendChild(V);let Me=Z=>{let Ce=Z.target;V.contains(Ce)||C.contains(Ce)||(ca(),document.removeEventListener("mousedown",Me,!0))};setTimeout(()=>document.addEventListener("mousedown",Me,!0),0)}let sb=S=>{let C=S.target;if(!C||C.closest?.(".memola-tbl-handle, .memola-tbl-cell-menu"))return;let _=C.closest?.("td");_&&t.contains(_)||Ee&&(dt(),Ee=null)},lb=S=>{let C=e.getSelection();if(!C||C.kind!=="table-cells")return;let _=e.getBlocks().find(ue=>ue.id===C.blockId);if(!_||_.kind!=="table")return;let O=Math.min(C.anchor.row,C.focus.row),z=Math.max(C.anchor.row,C.focus.row),V=Math.min(C.anchor.col,C.focus.col),fe=Math.max(C.anchor.col,C.focus.col),te=[];for(let ue=O;ue<=z;ue++){let Me=[];for(let Z=V;Z<=fe;Z++){let Ce=_.rows[ue]?.[Z]||[],qe=It(Ce).replace(/\t/g," ").replace(/\n/g," ");Me.push(qe)}te.push(Me)}let pe=te.map(ue=>ue.join("	")).join(`
`),he="<table>"+te.map(ue=>"<tr>"+ue.map(Me=>"<td>"+M(Me)+"</td>").join("")+"</tr>").join("")+"</table>";S.preventDefault(),S.clipboardData?.setData("text/plain",pe),S.clipboardData?.setData("text/html",he)};return document.addEventListener("mousemove",s),t.addEventListener("blur",I,!0),t.addEventListener("keydown",l,!0),t.addEventListener("mousedown",N),t.addEventListener("mousemove",se),t.addEventListener("mousemove",Y),document.addEventListener("mousedown",sb,!0),document.addEventListener("mousemove",D),document.addEventListener("mouseup",Je),document.addEventListener("mouseup",U),document.addEventListener("copy",lb,!0),()=>{document.removeEventListener("mousemove",s),t.removeEventListener("blur",I,!0),t.removeEventListener("keydown",l,!0),t.removeEventListener("mousedown",N),t.removeEventListener("mousemove",se),t.removeEventListener("mousemove",Y),document.removeEventListener("mousedown",sb,!0),document.removeEventListener("mousemove",D),document.removeEventListener("mouseup",Je),document.removeEventListener("mouseup",U),document.removeEventListener("copy",lb,!0),document.getElementById("memola-tbl-cell-menu")?.remove(),r(),["add-row","add-col","rm-row","rm-col"].forEach(S=>{document.getElementById("memola-tbl-"+S)?.remove()}),["h-row","h-col","h-cell"].forEach(S=>{document.getElementById("memola-tbl-"+S)?.remove()})};function Vl(S,C,_){let O=document.getElementById("memola-tbl-"+S);return O||(O=document.createElement("button"),O.id="memola-tbl-"+S,O.className="memola-tbl-btn memola-tbl-"+S,O.style.cssText="position:absolute; z-index:2147483646; background:#fff; border:1px solid #e9e9e7; border-radius:4px; cursor:pointer; padding:2px 6px; font-size:14px; line-height:1; color:#9b9a97; box-shadow:0 1px 3px rgba(0,0,0,0.08); display:none;",O.textContent=C,O.title=_,(document.getElementById("memola-overlay")||document.body).appendChild(O),O)}function Wi(){["add-row","add-col","rm-row","rm-col"].forEach(S=>{let C=document.getElementById("memola-tbl-"+S);C&&(C.style.display="none")})}function cb(S,C,_){let z=S.closest("[data-block-id]")?.dataset.blockId;if(!z)return;let V=S.querySelector("table");if(!V)return;let fe=V.querySelector("tbody");if(!fe)return;let te=Array.from(fe.children),pe=-1;for(let Ae=0;Ae<te.length;Ae++){let bt=te[Ae].getBoundingClientRect();if(_>=bt.top&&_<=bt.bottom){pe=Ae;break}}if(pe<0&&te.length>0){let Ae=te[0].getBoundingClientRect(),bt=te[te.length-1].getBoundingClientRect();_<Ae.top?pe=0:_>bt.bottom&&(pe=te.length-1)}let he=te[0],ue=he?Array.from(he.children):[],Me=-1;for(let Ae=0;Ae<ue.length;Ae++){let bt=ue[Ae].getBoundingClientRect();if(C>=bt.left&&C<=bt.right){Me=Ae;break}}if(Me<0&&ue.length>0){let Ae=ue[0].getBoundingClientRect(),bt=ue[ue.length-1].getBoundingClientRect();C<Ae.left?Me=0:C>bt.right&&(Me=ue.length-1)}let Z=V.getBoundingClientRect(),Ce=ue.length,qe=Vl("add-col","+","\u5217\u3092\u8FFD\u52A0\uFF08\u672B\u5C3E\uFF09");qe.style.top=Z.top+window.scrollY+"px",qe.style.left=Z.right+window.scrollX+3+"px",qe.style.height=Z.height+"px",qe.style.width="16px",qe.style.padding="0",qe.style.display="flex",qe.style.alignItems="center",qe.style.justifyContent="center",qe.onclick=()=>{e.applyMutation(Ae=>Qc(Ae,z,Ce),"structural"),Wi()};let Oe=Vl("add-row","+","\u884C\u3092\u8FFD\u52A0\uFF08\u672B\u5C3E\uFF09");Oe.style.top=Z.bottom+window.scrollY+3+"px",Oe.style.left=Z.left+window.scrollX+"px",Oe.style.width=Z.width+"px",Oe.style.height="16px",Oe.style.padding="0",Oe.style.display="flex",Oe.style.alignItems="center",Oe.style.justifyContent="center",Oe.onclick=()=>{e.applyMutation(Ae=>_s(Ae,z,te.length),"structural"),Wi()};let wt=Vl("rm-row","\u2715","\u884C\u3092\u524A\u9664");if(pe>=0&&te.length>1){let Ae=te[pe].getBoundingClientRect();wt.style.top=Ae.top+window.scrollY+(Ae.height-18)/2+"px",wt.style.left=Ae.left+window.scrollX-22+"px",wt.style.display="block",wt.onclick=()=>{e.applyMutation(bt=>Bu(bt,z,pe),"structural"),Wi()}}else wt.style.display="none";let xn=Vl("rm-col","\u2715","\u5217\u3092\u524A\u9664");if(Me>=0&&ue.length>1){let Ae=ue[Me].getBoundingClientRect();xn.style.top=Ae.top+window.scrollY-22+"px",xn.style.left=Ae.left+window.scrollX+(Ae.width-16)/2+"px",xn.style.display="block",xn.onclick=()=>{e.applyMutation(bt=>Du(bt,z,Me),"structural"),Wi()}}else xn.style.display="none"}}function zk(e){let t=rl(e);return t.length===1&&t[0].kind==="br"?[]:t}function rl(e){let t=[];for(let o of Array.from(e.childNodes)){if(o.nodeType===3){let a=o.textContent||"";a&&t.push({kind:"text",text:a});continue}if(o.nodeType!==1)continue;let n=o,r=n.tagName.toLowerCase();if(r==="br"){t.push({kind:"br"});continue}if(r==="strong"||r==="b"){t.push({kind:"bold",children:rl(n)});continue}if(r==="em"||r==="i"){t.push({kind:"italic",children:rl(n)});continue}if(r==="s"||r==="strike"||r==="del"){t.push({kind:"strike",children:rl(n)});continue}if(r==="code"){t.push({kind:"code",text:n.textContent||""});continue}if(r==="a"&&n.classList.contains("memola-page-link")){let a=n.getAttribute("data-page-id")||"",i=(n.textContent||"").trim();if(a){t.push({kind:"pagelink",pageId:a,...i&&i!==a?{alias:i}:{}});continue}}t.push(...rl(n))}return t}var Rd,KM,qk=L(()=>{"use strict";So();Vo();De();Rd=36,KM=250});var Bo={};q(Bo,{closeSlashMenuEditor2:()=>cg,destroyEditor2:()=>Wk,editor2ExecCmd:()=>sg,getBlocks:()=>pn,isEditorComposing:()=>ig,isSlashActiveEditor2:()=>lg,loadBlocks:()=>Kk,loadBlocksFromJson:()=>YM,mountEditor2:()=>WM,pruneEmptyTodosEditor2:()=>tP,reconcileEditorBlocks:()=>ag,syncEditor2IntoSaver:()=>vf});function WM(e){Wk(),al++;let t=al;return we=Fx(e),Nd=we.subscribe(o=>{Promise.resolve().then(()=>(gt(),Ur)).then(n=>{t===al&&n.schedSave()})}),Od=Yx(we,e),Hd=Jx(we,e),zd=ok(we,e),jd=Ok(we,e),Fd=nP(we,e),Ud=eP(e),qd=Fk(we,e),$d=jk(we,e),Kd=VM(e),Wd=GM(we,e),Gd=re.subscribe(o=>{if(t!==al||o.kind!=="idle"||!we||m.currentId!==o.base.pageId)return;let n=ge(o.base.body);n.length===0&&(n=[nt("")]);let r=we.getBlocks();$k(r)&&$k(n)||To(Ye(r),Ye(n))||we.reconcile(n)}),we}function $k(e){if(e.length===0)return!0;if(e.length!==1)return!1;let t=e[0];return t.kind==="p"&&t.inline.length===0}function GM(e,t){let o=n=>{if(n.target!==t)return;let r=t.lastElementChild;if(r){let c=r.getBoundingClientRect();if(n.clientY<c.bottom)return}n.preventDefault();let a=e.getBlocks(),i=a[a.length-1];if(!!i&&i.kind==="p"&&i.inline.length===0){e.applyMutation(c=>({...c,selection:{kind:"caret",blockId:i.id,offset:0}}),"selection");return}let l=nt("");e.applyMutation(c=>({...c,blocks:[...c.blocks,l],selection:{kind:"caret",blockId:l.id,offset:0}}),"structural")};return t.addEventListener("mousedown",o),()=>t.removeEventListener("mousedown",o)}function VM(e){let t=o=>{let n=o.target,r=n?.closest?.("a[data-href]");if(r&&e.contains(r)){o.preventDefault(),o.stopPropagation();let l=r.getAttribute("href")||"";l&&window.open(l,"_blank","noopener,noreferrer");return}let a=n?.closest?.("a.memola-page-link");if(!a||!e.contains(a))return;o.preventDefault(),o.stopPropagation();let i=a.getAttribute("data-daily-date"),s=a.getAttribute("data-page-id");if(i){(async()=>{try{let c=await(await Promise.resolve().then(()=>(Sn(),Ra))).getOrCreateNoteForDate(i),{doSelect:d}=await Promise.resolve().then(()=>(W(),ce));await d(c.dbPageId)}catch(l){console.error("[memola] daily link click failed:",l)}})();return}s&&(async()=>{try{let{doSelect:l}=await Promise.resolve().then(()=>(W(),ce));await l(s)}catch(l){console.error("[memola] page link click failed:",l)}})()};return e.addEventListener("click",t),()=>e.removeEventListener("click",t)}function Kk(e){if(!we)return;let t=e.length===0?[{id:Q(),kind:"p",inline:[]}]:e;we.setBlocks(t,{silent:!0})}function YM(e){Kk(ge(e))}function pn(){return we?we.getBlocks():[]}function Wk(){al++,Od&&(Od.destroy(),Od=null),Hd&&(Hd.destroy(),Hd=null),zd&&(zd(),zd=null),jd&&(jd(),jd=null),Fd&&(Fd(),Fd=null),Ud&&(Ud(),Ud=null),qd&&(qd(),qd=null),$d&&($d(),$d=null),Kd&&(Kd(),Kd=null),Wd&&(Wd(),Wd=null),Gd&&(Gd(),Gd=null),Nd&&(Nd(),Nd=null),we&&(we.destroy(),we=null)}function vf(e){if(!we)return;let t=Ye(we.getBlocks());re.notifyEdit(t,e)}function ag(e){return we?(we.reconcile(e),!0):!1}function ig(){return we?we.isComposing():!1}function sg(e){if(!we)return!1;let t=we,o=()=>{let r=window.getSelection()?.anchorNode;return r?(r.nodeType===1?r:r.parentElement)?.closest("[data-block-id]")?.dataset.blockId??null:null};switch(e){case"bold":return t.toggleInlineFormat("bold"),!0;case"italic":return t.toggleInlineFormat("italic"),!0;case"strike":return t.toggleInlineFormat("strike"),!0;case"codeInline":case"code":return t.toggleInlineFormat("code"),!0;case"comment":{let n=o()||"";return Promise.resolve().then(()=>(Ao(),mn)).then(r=>{let a=r.currentCommentTarget();a&&r.openCommentPopover(a.pageId,n)}),!0}case"link":{let n=XM(),r=window.prompt("\u30EA\u30F3\u30AF\u5148 URL \u3092\u5165\u529B\uFF08UNC \u30D1\u30B9 \\\\server\\share\\... \u3082\u53EF\u3002\u7A7A\u6B04\u3067\u89E3\u9664\uFF09",n);return r===null||t.setLink(JM(r.trim())),!0}case"p":case"h1":case"h2":case"h3":case"todo":{let n=o();if(n){let r=t.getBlocks().find(i=>i.id===n),a=r&&r.kind===e&&e!=="p"?"p":e;t.setBlockKind(n,a)}return!0}case"ul":case"ol":case"quote":case"callout":case"pre":case"hr":{let n=o();return n&&t.applyMutation(r=>{let a=r.blocks.findIndex(c=>c.id===n);if(a<0)return r;let i=r.blocks.slice(),s=ZM(e);i[a]=s;let l=QM(s);return{...r,blocks:i,selection:l?{kind:"caret",blockId:l,offset:0}:r.selection}},"structural"),!0}}return!1}function XM(){let t=window.getSelection()?.anchorNode;return(t?t.nodeType===1?t:t.parentElement:null)?.closest("a[data-href]")?.dataset.href??""}function JM(e){return!e||/^javascript:/i.test(e)?"":/^\\\\/.test(e)||/^[a-zA-Z][\w+.-]*:/.test(e)?e:/^[\w-]+(\.[\w-]+)+(\/|$|[?#:])/.test(e)?"https://"+e:e}function ZM(e){switch(e){case"ul":return As();case"ol":return Bs();case"quote":return Ds();case"callout":return Cs();case"pre":return Ms();case"hr":return Ps()}}function QM(e){return e.kind==="list"?e.items[0]?.[0]?.id??null:e.kind==="callout"||e.kind==="quote"?e.children[0]?.id??null:"inline"in e||e.kind==="code"?e.id:null}function eP(e){let t=document.getElementById("memola-ftb")||document.getElementById("ftb");if(!t)return()=>{};let o=()=>{let n=window.getSelection();if(!n||n.rangeCount===0||n.isCollapsed){t.classList.remove("on");return}let r=n.getRangeAt(0);if(!e.contains(r.startContainer)){t.classList.remove("on");return}let a=r.getBoundingClientRect();if(a.width===0&&a.height===0){t.classList.remove("on");return}t.style.top=a.top+window.scrollY-48+"px",t.style.left=a.left+window.scrollX+"px",t.classList.add("on")};return document.addEventListener("selectionchange",o),()=>{document.removeEventListener("selectionchange",o),t.classList.remove("on")}}function tP(){if(!we)return 0;let e=we.getBlocks(),t=e.filter(n=>n.kind!=="todo"?!0:n.inline.map(a=>a.kind==="text"?a.text:"").join("").trim()!==""),o=e.length-t.length;return o>0&&we.applyMutation(n=>({...n,blocks:t}),"structural"),o}function lg(){return!!document.querySelector(".memola-slash2")}function cg(){document.querySelectorAll(".memola-slash2").forEach(e=>e.remove())}function oP(e){let t=()=>{let l=()=>Math.random().toString(36).slice(2,8);return"blk_"+l()+l()},o=l=>{let c=Math.max(...l.map(p=>p.length),1),d=l.map(p=>{let u=[];for(let f=0;f<c;f++){let g=p[f]||"";u.push(g?[{kind:"text",text:g}]:[])}return u});return{id:t(),kind:"table",hrow:!0,hcol:!1,rows:d}},n=e.getData("text/html");if(n&&/<table[\s\S]*?<\/table>/i.test(n)){let l=document.createElement("div");l.innerHTML=n;let c=l.querySelector("table");if(c){let p=Array.from(c.querySelectorAll("tr")).map(u=>Array.from(u.children).map(f=>(f.textContent||"").replace(/\s+/g," ").trim()));if(p.length>0&&p.some(u=>u.length>0))return o(p)}}let r=e.getData("text/plain");if(!r)return null;let a=r.replace(/\r\n/g,`
`).replace(/\n+$/,"").split(`
`);if(a.length===0)return null;let i=a.map(l=>l.split("	"));return i.length>=2||i.some(l=>l.length>=2)?o(i):null}function nP(e,t){let o=n=>{let r=n.clipboardData;if(!r)return;let a=n.target;if(!!!(a&&typeof a.closest=="function"&&a.closest(".memola-itbl-wrap"))){let d=oP(r);if(d){n.preventDefault(),e.applyMutation(p=>{let u=p.selection,f=u?.kind==="caret"?u.blockId:u?.kind==="range"?u.focusBlockId:p.blocks[p.blocks.length-1]?.id,g=f?p.blocks.findIndex(v=>v.id===f):-1,y=p.blocks.slice(),b=g>=0?p.blocks[g]:null;if(b&&b.kind==="p"&&b.inline.length===0&&g>=0)y[g]=d;else{let v=g>=0?g+1:y.length;y.splice(v,0,d)}return{...p,blocks:y,selection:null}},"structural");return}}let s=r.getData("text/html"),l=r.getData("text/plain"),c=[];s?c=Ab(s):l&&(c=Ge(l)),c.length!==0&&(n.preventDefault(),e.applyMutation(d=>{let p=d.selection,u=p?.kind==="caret"?p.blockId:p?.kind==="range"?p.focusBlockId:d.blocks[d.blocks.length-1]?.id,f=d.blocks.slice(),g=u?f.findIndex(b=>b.id===u)+1:f.length;g<=0&&(g=f.length),f.splice(g,0,...c);let y=c[c.length-1];return{...d,blocks:f,selection:{kind:"caret",blockId:y.id,offset:0}}},"structural"))};return t.addEventListener("paste",o),()=>t.removeEventListener("paste",o)}var we,Nd,Od,Hd,Fd,Ud,zd,jd,qd,$d,Kd,Wd,Gd,al,ht=L(()=>{"use strict";Vo();j();Ux();K();Tt();Jo();ft();qa();Xx();Zx();qf();Hk();Uk();qk();So();we=null,Nd=null,Od=null,Hd=null,Fd=null,Ud=null,zd=null,jd=null,qd=null,$d=null,Kd=null,Wd=null,Gd=null,al=0});var pg={};q(pg,{countAll:()=>sP,deleteAllForPage:()=>lP,deleteDraft:()=>Yd,listAll:()=>sl,listForPage:()=>Yk,purgeOrphaned:()=>cP,saveDraft:()=>mg});function aP(e){try{let t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function iP(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function hi(){let e=[];try{for(let t=0;t<localStorage.length;t++){let o=localStorage.key(t);o&&o.startsWith(dg)&&e.push(o)}}catch{}return e}function il(e){let t=e.slice(dg.length),o=t.lastIndexOf(".");if(o<0)return null;let n=t.slice(0,o),r=Number(t.slice(o+1));return!n||!Number.isFinite(r)?null:{pageId:n,ts:r}}function Vk(e){let t=aP(e);return t?{key:e,...t}:null}function Vd(){let e=Date.now()-rP;for(let t of hi()){let o=il(t);if(o&&o.ts<e)try{localStorage.removeItem(t)}catch{}}}function mg(e){Vd();let t=Date.now(),o=dg+e.pageId+"."+t,n={pageId:e.pageId,pageTitle:e.pageTitle,title:e.title,body:e.body,savedAt:t,reason:e.reason||"conflict-discarded",baseBody:e.baseBody,baseEtag:e.baseEtag};iP(o,n);let r=Yk(e.pageId);if(r.length>Gk){r.sort((a,i)=>i.savedAt-a.savedAt);for(let a of r.slice(Gk))try{localStorage.removeItem(a.key)}catch{}}return o}function Yk(e){Vd();let t=[];for(let o of hi()){let n=il(o);if(!n||n.pageId!==e)continue;let r=Vk(o);r&&t.push(r)}return t.sort((o,n)=>n.savedAt-o.savedAt),t}function sl(){Vd();let e=[];for(let t of hi()){let o=Vk(t);o&&e.push(o)}return e.sort((t,o)=>o.savedAt-t.savedAt),e}function sP(){Vd();let e=0;for(let t of hi())il(t)&&e++;return e}function Yd(e){try{localStorage.removeItem(e)}catch{}}function lP(e){for(let t of hi())if(il(t)?.pageId===e)try{localStorage.removeItem(t)}catch{}}function cP(e){for(let t of hi()){let o=il(t);if(o&&!e.has(o.pageId))try{localStorage.removeItem(t)}catch{}}}var dg,Gk,rP,ll=L(()=>{"use strict";ve();dg=Ep,Gk=5,rP=7*24*60*60*1e3});function Xr(e){return document.getElementById(e.id)?e.cancelValue!==void 0?Promise.resolve(e.cancelValue):Promise.reject(new Error("modal-already-open")):new Promise(t=>{let o=document.getElementById("memola-overlay")||document.body,n=document.createElement("div");n.id=e.id,n.className=e.className+" on",n.innerHTML=e.contentHtml,o.appendChild(n);let r=!1,a=l=>{r||(r=!0,n.remove(),document.removeEventListener("keydown",i,!0),t(l))};function i(l){l.key==="Escape"&&e.cancelValue!==void 0&&(l.preventDefault(),l.stopPropagation(),l.stopImmediatePropagation(),a(e.cancelValue))}document.addEventListener("keydown",i,!0),n.addEventListener("click",l=>{let c=l.target;if(c===n&&e.cancelValue!==void 0){a(e.cancelValue);return}let d=c.closest("button[data-c]");if(!d)return;let p=d.dataset.c||"";p in e.buttons&&a(e.buttons[p])}),e.onMounted&&e.onMounted(n);let s=e.focusSel||"button[data-c]";n.querySelector(s)?.focus()})}function fn(e){let t=null;function o(a){a.key==="Escape"&&document.getElementById(e.id)&&(a.preventDefault(),a.stopPropagation(),e.onEscape&&e.onEscape())}function n(){let a=document.getElementById(e.id);a&&a.remove(),document.removeEventListener("keydown",o,!0),t=null}function r(a,i){let s=document.getElementById(e.id);s&&s.remove(),document.removeEventListener("keydown",o,!0);let l=document.getElementById("memola-overlay")||document.body,c=document.createElement("div");c.id=e.id,c.className=e.className+" on",c.innerHTML=a,l.appendChild(c),t=c,e.onBackdropClick&&c.addEventListener("click",d=>{d.target===c&&e.onBackdropClick()}),document.addEventListener("keydown",o,!0),i&&i(c)}return{render:r,close:n,isOpen:()=>t!==null&&document.getElementById(e.id)!==null}}var Gn=L(()=>{"use strict"});var Vn={};q(Vn,{applyDraftToOriginInteractive:()=>ew,attachDraftsSidebar:()=>ug,closeDraftsModal:()=>gn,openDraftsModal:()=>Qk,refreshDraftsBadge:()=>uo});function mP(){let e=sl(),t=new Map;for(let n of e){let r=A(n.pageId),a=t.get(n.pageId);a||(a={pageId:n.pageId,pageTitle:r?.title||n.pageTitle||"(\u30BF\u30A4\u30C8\u30EB\u4E0D\u660E)",exists:!!r&&!r.trashed,drafts:[]},t.set(n.pageId,a)),a.drafts.push(n)}let o=Array.from(t.values());return o.sort((n,r)=>{if(n.exists!==r.exists)return n.exists?-1:1;let a=Math.max(...n.drafts.map(s=>s.savedAt));return Math.max(...r.drafts.map(s=>s.savedAt))-a}),o}function Zk(){return m.pages.filter(e=>e.IsDraft)}function pP(){return Zk().length+sl().length}function Qk(e){Jk.render('<div class="memola-drafts-box"><div class="memola-drafts-hd"><span class="memola-drafts-title">\u{1F4DD} \u4E0B\u66F8\u304D</span><span class="memola-drafts-count"></span><button class="memola-drafts-close" title="\u9589\u3058\u308B">\xD7</button></div><div class="memola-drafts-body"></div></div>',t=>{t.querySelector(".memola-drafts-close")?.addEventListener("click",gn),Xd(t),e&&setTimeout(()=>{t.querySelector('.memola-drafts-group[data-page-id="'+e+'"]')?.scrollIntoView({block:"start"})},0)})}function gn(){Jk.close()}function Xd(e){let t=Zk(),o=mP(),n=t.length+o.reduce((l,c)=>l+c.drafts.length,0),r=e.querySelector(".memola-drafts-count");r&&(r.textContent="("+n+"\u4EF6)");let a=e.querySelector(".memola-drafts-body");if(!a)return;if(n===0){a.innerHTML='<div class="memola-drafts-empty">\u4E0B\u66F8\u304D\u306F\u3042\u308A\u307E\u305B\u3093\u3002<br><span style="font-size:11px;color:var(--ink-3)">\u30DA\u30FC\u30B8\u30E1\u30CB\u30E5\u30FC\u306E\u300C\u270F\uFE0F \u4E0B\u66F8\u304D\u3068\u3057\u3066\u8907\u88FD\u300D\u3001\u307E\u305F\u306F\u4FDD\u5B58\u885D\u7A81\u6642\u306E\u300C\u76F8\u624B\u306E\u7248\u3092\u8868\u793A\u300D\u3067\u4E0B\u66F8\u304D\u304C\u4F5C\u6210\u3055\u308C\u307E\u3059\u3002</span></div>';return}let i="";t.length>0&&(i='<div class="memola-drafts-section"><div class="memola-drafts-section-hd"><span>\u{1F4DD} \u30DA\u30FC\u30B8\u4E0B\u66F8\u304D</span><span class="memola-drafts-section-sub">(\u7DE8\u96C6\u4E2D\u306E\u8907\u88FD\u30DA\u30FC\u30B8)</span></div>',i+=t.map(l=>{let d=A(l.Id)?.originPageId||"",p=d?A(d):null,u=p?.title||"(\u539F\u672C\u30DA\u30FC\u30B8\u4E0D\u660E)",f=!!p&&!p.trashed;return'<div class="memola-drafts-item memola-drafts-spitem" data-page-id="'+M(l.Id)+'"><div class="memola-drafts-itemhd"><span class="memola-drafts-itemtitle">'+M(l.Title||"\u7121\u984C")+'</span></div><div class="memola-drafts-itemprev">\u539F\u672C: '+(f?M(u):'<span class="memola-drafts-orphan">'+M(u)+" (\u524A\u9664\u6E08\u307F)</span>")+'</div><div class="memola-drafts-itemactions"><button class="memola-btn p" data-act="open">\u958B\u304F</button>'+(f?'<button class="memola-btn s" data-act="apply">\u539F\u672C\u306B\u9069\u7528</button>':'<button class="memola-btn s" data-act="promote">\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58</button>')+'<button class="memola-btn ghost" data-act="discard">\u7834\u68C4</button></div></div>'}).join(""),i+="</div>");let s="";o.length>0&&(s='<div class="memola-drafts-section"><div class="memola-drafts-section-hd"><span>\u{1F4BE} \u9000\u907F\u3055\u308C\u305F\u7DE8\u96C6</span><span class="memola-drafts-section-sub">(\u4FDD\u5B58\u885D\u7A81\u6642\u306B\u9000\u907F)</span></div>',s+=o.map(l=>{let c='<div class="memola-drafts-grouphead">'+(l.exists?"\u{1F4C4} ":"\u{1F5D1} ")+'<span class="memola-drafts-grouptitle">'+M(l.pageTitle)+(l.exists?"":' <span class="memola-drafts-orphan">(\u524A\u9664\u3055\u308C\u305F\u30DA\u30FC\u30B8)</span>')+'</span><span class="memola-drafts-groupcount">'+l.drafts.length+"\u4EF6</span></div>",d=l.drafts.map(p=>{let u=(p.body||"").replace(/\s+/g," ").slice(0,80);return'<div class="memola-drafts-item" data-key="'+M(p.key)+'"><div class="memola-drafts-itemhd"><span class="memola-drafts-itemtime">'+wn(p.savedAt)+'</span><span class="memola-drafts-itemtitle">'+M(p.title||"\u7121\u984C")+'</span></div><div class="memola-drafts-itemprev">'+M(u||"(\u672C\u6587\u306A\u3057)")+'</div><div class="memola-drafts-itemactions">'+(l.exists?'<button class="memola-btn p" data-act="merge">\u7D71\u5408 (3-way)</button>':"")+(l.exists?'<button class="memola-btn s" data-act="restore">\u305D\u306E\u307E\u307E\u5FA9\u5143</button>':"")+'<button class="memola-btn s" data-act="preview">\u30D7\u30EC\u30D3\u30E5\u30FC</button><button class="memola-btn ghost" data-act="delete">\u524A\u9664</button></div></div>'}).join("");return'<div class="memola-drafts-group" data-page-id="'+l.pageId+'">'+c+d+"</div>"}).join(""),s+="</div>"),a.innerHTML=i+s,a.querySelectorAll(".memola-drafts-spitem").forEach(l=>{let c=l.dataset.pageId||"";l.addEventListener("click",async d=>{let p=d.target.closest("button[data-act]");if(!p)return;let u=p.dataset.act;if(u==="open"){gn();let{doSelect:f}=await Promise.resolve().then(()=>(W(),ce));await f(c)}else if(u==="apply"){if(!confirm("\u4E0B\u66F8\u304D\u3092\u539F\u672C\u306B\u9069\u7528\u3057\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B?"))return;try{gn(),await ew(c)}catch(f){w("\u9069\u7528\u5931\u6557: "+f.message,"err")}}else if(u==="promote"){if(!confirm("\u539F\u672C\u304C\u524A\u9664\u3055\u308C\u3066\u3044\u308B\u305F\u3081\u3001\u3053\u306E\u4E0B\u66F8\u304D\u3092\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B?"))return;try{let{apiPromoteDraftToPage:f,apiGetPages:g}=await Promise.resolve().then(()=>(K(),je)),y=await f(c);await g();let{renderTree:b}=await Promise.resolve().then(()=>(Be(),po));b(),Xd(e),uo(),gn();let{doSelect:h}=await Promise.resolve().then(()=>(W(),ce));await h(y),w("\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3057\u305F")}catch(f){w("\u4FDD\u5B58\u5931\u6557: "+f.message,"err")}}else if(u==="discard"){if(!confirm("\u3053\u306E\u4E0B\u66F8\u304D\u3092\u5B8C\u5168\u306B\u524A\u9664\u3057\u307E\u3059\u3002\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?"))return;try{let{apiDeletePage:f,apiGetPages:g}=await Promise.resolve().then(()=>(K(),je));await f(c),await g();let{renderTree:y}=await Promise.resolve().then(()=>(Be(),po));y(),Xd(e),uo(),w("\u4E0B\u66F8\u304D\u3092\u7834\u68C4\u3057\u307E\u3057\u305F")}catch(f){w("\u7834\u68C4\u5931\u6557: "+f.message,"err")}}})}),a.querySelectorAll(".memola-drafts-item:not(.memola-drafts-spitem)").forEach(l=>{let c=l.dataset.key||"";l.addEventListener("click",async d=>{let p=d.target.closest("button[data-act]");if(!p)return;let u=p.dataset.act,f=sl().find(g=>g.key===c);if(f){if(u==="preview")uP(f);else if(u==="delete"){if(!confirm("\u3053\u306E\u4E0B\u66F8\u304D\u3092\u524A\u9664\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?"))return;Yd(c),Xd(e),uo(),w("\u4E0B\u66F8\u304D\u3092\u524A\u9664\u3057\u307E\u3057\u305F")}else if(u==="restore")await fP(f);else if(u==="merge"){gn();let{saver:g}=await Promise.resolve().then(()=>(ft(),Ka));await g.beginExternalMerge({pageId:f.pageId,pageTitle:f.pageTitle,title:f.title,ourBody:f.body,baseBody:f.baseBody||"",baseEtag:f.baseEtag||""})}}})})}function uP(e){let t=document.createElement("div");t.className="memola-drafts-md on",t.style.zIndex="2147483649",t.innerHTML='<div class="memola-drafts-box" style="max-width:720px"><div class="memola-drafts-hd"><span class="memola-drafts-title">\u30D7\u30EC\u30D3\u30E5\u30FC: '+M(e.title||"\u7121\u984C")+'</span><button class="memola-drafts-close">\xD7</button></div><div class="memola-drafts-preview">'+ko(e.body)+"</div></div>",(document.getElementById("memola-overlay")||document.body).appendChild(t);let o=()=>{t.remove()};t.addEventListener("click",n=>{n.target===t&&o()}),t.querySelector(".memola-drafts-close")?.addEventListener("click",o)}async function fP(e){if(!confirm("\u300C"+(e.title||"\u7121\u984C")+`\u300D \u3092\u7DE8\u96C6\u9818\u57DF\u306B\u5FA9\u5143\u3057\u307E\u3059\u3002

\u73FE\u5728\u306E\u7DE8\u96C6\u4E2D\u306E\u672C\u6587\u304C\u3042\u308B\u5834\u5408\u306F\u3001\u5FF5\u306E\u305F\u3081\u5225\u306E\u4E0B\u66F8\u304D\u3068\u3057\u3066\u81EA\u52D5\u4FDD\u5B58\u3057\u307E\u3059\u3002
\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F`))return;let{saver:t}=await Promise.resolve().then(()=>(ft(),Ka));if(t.isDirty()&&m.currentId){let{saveDraft:i}=await Promise.resolve().then(()=>(ll(),pg)),{getBlocks:s}=await Promise.resolve().then(()=>(ht(),Bo)),l=Ve(s()),c=E("ttl");i({pageId:m.currentId,pageTitle:m.pages.find(d=>d.Id===m.currentId)?.Title||"\u7121\u984C",title:c.value||"\u7121\u984C",body:l,reason:"conflict-discarded"})}let{doSelect:o}=await Promise.resolve().then(()=>(W(),ce));await o(e.pageId);let{loadBlocks:n}=await Promise.resolve().then(()=>(ht(),Bo));n(Ge(e.body));let r=E("ttl");e.title&&(r.value=e.title);let{schedSave:a}=await Promise.resolve().then(()=>(gt(),Ur));a(),Yd(e.key),uo(),gn(),w("\u4E0B\u66F8\u304D\u3092\u5FA9\u5143\u3057\u307E\u3057\u305F\uFF08\u4FDD\u5B58\u306F\u307E\u3060\u3055\u308C\u3066\u3044\u307E\u305B\u3093\uFF09")}async function ew(e){let{apiApplyDraftToOrigin:t,apiGetPages:o}=await Promise.resolve().then(()=>(K(),je)),{doSelect:n}=await Promise.resolve().then(()=>(W(),ce)),r=await t(e);if(r.status==="conflict"){if(!confirm("\u539F\u672C\u304C\u4E0B\u66F8\u304D\u4F5C\u6210\u5F8C\u306B\u5909\u66F4\u3055\u308C\u3066\u304A\u308A\u3001\u81EA\u52D5\u30DE\u30FC\u30B8\u3067\u304D\u306A\u3044\u7AF6\u5408\u304C "+r.conflicts+` \u4EF6\u3042\u308A\u307E\u3059\u3002

\u300COK\u300D: \u4E0B\u66F8\u304D\u306E\u5185\u5BB9\u3067\u539F\u672C\u3092\u4E0A\u66F8\u304D\u3057\u307E\u3059\uFF08\u539F\u672C\u306E\u73FE\u5728\u306E\u672C\u6587\u306F SP \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74\u306B\u6B8B\u308A\u307E\u3059\uFF09\u3002
\u300C\u30AD\u30E3\u30F3\u30BB\u30EB\u300D: \u4E2D\u6B62\u3057\u307E\u3059\uFF08\u539F\u672C\u3092\u958B\u3044\u3066\u5185\u5BB9\u3092\u78BA\u8A8D\u3067\u304D\u307E\u3059\uFF09\u3002`))return await n(r.originId),!1;r=await t(e,{force:!0})}await o();let{renderTree:a}=await Promise.resolve().then(()=>(Be(),po));return a(),uo(),await n(r.originId),r.status==="merged"?w("\u539F\u672C\u304C\u5909\u66F4\u3055\u308C\u3066\u3044\u305F\u305F\u3081\u81EA\u52D5\u30DE\u30FC\u30B8\u3057\u3066\u9069\u7528\u3057\u307E\u3057\u305F\uFF08"+r.autoMerged+"\u4EF6\u30DE\u30FC\u30B8\uFF09"):r.status==="forced"?w("\u539F\u672C\u306B\u4E0A\u66F8\u304D\u9069\u7528\u3057\u307E\u3057\u305F"):w("\u539F\u672C\u306B\u9069\u7528\u3057\u307E\u3057\u305F"),!0}function uo(){let e=document.getElementById(Xk);if(!e)return;let t=pP();if(t===0){e.style.display="none";return}e.style.display="";let o=e.querySelector(".memola-drafts-badge-count");o&&(o.textContent=String(t))}function ug(){let e=document.getElementById(Xk);e&&(e.addEventListener("click",()=>Qk()),uo())}var dP,Xk,Jk,Oo=L(()=>{"use strict";j();me();le();Tt();Jo();ll();De();vo();Gn();ye();dP="memola-drafts-md",Xk="memola-drafts-btn",Jk=fn({id:dP,className:"memola-drafts-md",onEscape:()=>gn(),onBackdropClick:()=>gn()})});var fg={};q(fg,{clearMergeHighlight:()=>Qd,highlightIncomingBlocks:()=>bP});function gP(e){return e.replace(/"/g,'\\"')}function hP(e){let t={...e};return delete t.children,delete t.items,delete t.rows,JSON.stringify(t,An)}function Zd(e,t){for(let o of e){t.set(o.id,hP(o));let n=o;if(Array.isArray(n.children)&&Zd(n.children,t),Array.isArray(n.items))for(let r of n.items)Zd(r,t)}}function bP(e,t){Qd();let o=new Map,n=new Map;Zd(ge(e),o),Zd(ge(t),n);let r=[];for(let[i,s]of n)o.get(i)!==s&&r.push(i);if(r.length===0)return;let a=Pe();for(let i of r)a.querySelector('[data-block-id="'+gP(i)+'"]')?.classList.add("memola-block-incoming");Jd||(Jd=!0,a.addEventListener("input",Qd,{once:!0}))}function Qd(){let e=Pe();e.querySelectorAll(".memola-block-incoming").forEach(t=>t.classList.remove("memola-block-incoming")),Jd&&(e.removeEventListener("input",Qd),Jd=!1)}var Jd,gg=L(()=>{"use strict";me();K();qa();Jd=!1});var tm={};q(tm,{attachCrossTabSync:()=>yg,attachStaleBannerSuppressionReset:()=>vg,detachCrossTabSync:()=>xP,startWatching:()=>bg,stopWatching:()=>Un});function vP(){let e=kn.get(),t=e?parseInt(e,10):tw;return!isFinite(t)||t<0?tw:t}function bg(e,t,o){m.sync.pageId=e,m.sync.loadedModified=t,m.sync.loadedEtag=o,cl(),m.sync.pollTimer&&clearInterval(m.sync.pollTimer);let n=vP();n>0&&(m.sync.pollTimer=setInterval(yP,n))}function Un(){m.sync.pollTimer&&clearInterval(m.sync.pollTimer),m.sync.pollTimer=null,m.sync.pageId=null,m.sync.loadedModified=null,m.sync.loadedEtag=null,cl()}async function yP(){if(document.hidden||m.sync.suppressBannerUntilFocus)return;let e=m.sync.pageId;if(!e||m.currentId!==e||m.saving)return;let t=m.pages.find(o=>o.Id===e);if(!(!t||t.Type==="database"))try{let o=await ct(e);if(m.currentId!==e)return;if(!o){await ow(e,"purged");return}if(o.trashed>0){await ow(e,"trashed");return}if(m.currentId!==e)return;let n=!!o.etag&&o.etag===m.sync.loadedEtag,r=!!o.modified&&o.modified===m.sync.loadedModified;if(n||r||await aw(e,o.etag,o.modified))return;let i=await Pa(e).catch(()=>""),s=await Ln().catch(()=>"");if(m.currentId!==e)return;let l=!!i&&!!s&&i===s;iw(i,o.modified,e,l)}catch{}}async function ow(e,t){if(hg)return;let o=re.state();if(!(o.kind!=="idle"&&o.kind!=="dirty")&&o.base.pageId===e){hg=!0;try{let n=re.isDirty(),r=(o.kind==="dirty"?o.title:o.base.title)||"\u7121\u984C",a=Ye(pn());if(t==="trashed"){if(window.confirm(`\u3053\u306E\u30DA\u30FC\u30B8\u306F\u4ED6\u306E\u30E6\u30FC\u30B6\u30FC\u306B\u3088\u3063\u3066\u524A\u9664\uFF08\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5\uFF09\u3055\u308C\u307E\u3057\u305F\u3002

\u300COK\u300D: \u5143\u306B\u623B\u3057\u3066\u7DE8\u96C6\u3092\u7D9A\u3051\u307E\u3059\u3002
\u300C\u30AD\u30E3\u30F3\u30BB\u30EB\u300D: `+(n?"\u7DE8\u96C6\u5185\u5BB9\u3092\u4E0B\u66F8\u304D\u306B\u9000\u907F\u3057\u3066":"")+"\u3053\u306E\u30DA\u30FC\u30B8\u3092\u9589\u3058\u307E\u3059\u3002")){await Ts(e);let l=await ct(e).catch(()=>null);l&&(m.sync.loadedEtag=l.etag,m.sync.loadedModified=l.modified),w("\u30DA\u30FC\u30B8\u3092\u5FA9\u5143\u3057\u307E\u3057\u305F\u3002\u7DE8\u96C6\u3092\u7D9A\u3051\u3089\u308C\u307E\u3059");return}n&&(nw(e,r,a,o.base.body,o.base.etag),w("\u7DE8\u96C6\u5185\u5BB9\u3092\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F\uFF08\u{1F4DD} \u4E0B\u66F8\u304D \u304B\u3089\u958B\u3051\u307E\u3059\uFF09")),rw(e);return}window.confirm(`\u3053\u306E\u30DA\u30FC\u30B8\u306F\u5B8C\u5168\u306B\u524A\u9664\u3055\u308C\u307E\u3057\u305F\u3002\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002

\u7DE8\u96C6\u5185\u5BB9\u3092\u4E0B\u66F8\u304D\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3059\u304B?
\uFF08\u{1F4DD} \u4E0B\u66F8\u304D \u304B\u3089\u5F8C\u3067\u958B\u3051\u307E\u3059\uFF09`)&&(nw(e,r,a,o.base.body,o.base.etag),w("\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F\uFF08\u{1F4DD} \u4E0B\u66F8\u304D \u304B\u3089\u958B\u3051\u307E\u3059\uFF09")),rw(e)}finally{hg=!1}}}function nw(e,t,o,n,r){try{mg({pageId:e,pageTitle:t,title:t,body:o,baseBody:n,baseEtag:r,reason:"page-deleted"}),Promise.resolve().then(()=>(Oo(),Vn)).then(a=>a.refreshDraftsBadge()).catch(()=>{})}catch{}}function rw(e){Un(),re.unload(),wo([e]),m.currentId=null,m.currentRow=null,oe(),et("empty")}async function aw(e,t,o){let n=re.state();if(n.kind!=="idle"&&n.kind!=="dirty"||n.base.pageId!==e)return!1;if(ig())return!0;let r=await Mt(e).catch(()=>null);if(r===null)return!1;if(m.currentId!==e)return!0;let a=n.base.body,i=Ye(pn()),s=n.kind==="dirty"?n.title:n.base.title,l=_v(a,i,r);return l.kind==="conflict"||l.kind==="noop"?!1:(l.changed&&(ag(l.merged),Promise.resolve().then(()=>(gg(),fg)).then(c=>c.highlightIncomingBlocks(i,l.mergedBody)).catch(()=>{})),re.rebaseOnto({pageId:e,body:r,title:s,etag:t,modified:o},l.mergedBody,s),$o(e).set(t),!0)}function iw(e,t,o,n=!1){let r=document.getElementById("memola-sync-banner");r||(r=document.createElement("div"),r.id="memola-sync-banner",document.getElementById("memola-overlay")?.appendChild(r));let a=new Date(t).toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"}),i=n?"\u5225\u306E\u30BF\u30D6 (\u3042\u306A\u305F)":"<strong>"+M(e||"\u8AB0\u304B")+"</strong>\u3055\u3093";r.innerHTML="<span>\u{1F514} "+i+"\u304C "+a+' \u306B\u66F4\u65B0\u3057\u307E\u3057\u305F</span><button id="memola-sync-reload">\u4ECA\u3059\u3050\u53CD\u6620</button><button id="memola-sync-dismiss">\u5F8C\u3067</button><button id="memola-sync-mute" title="\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u30BF\u30D6\u3092\u96E2\u308C\u308B\u307E\u3067\u518D\u8868\u793A\u3057\u307E\u305B\u3093">\u30BF\u30D6\u3092\u96E2\u308C\u308B\u307E\u3067\u975E\u8868\u793A</button>',r.classList.add("on"),document.getElementById("memola-sync-reload")?.addEventListener("click",async()=>{let{saver:s}=await Promise.resolve().then(()=>(ft(),Ka));s.isDirty()&&!confirm("\u672A\u4FDD\u5B58\u306E\u5909\u66F4\u304C\u3042\u308A\u307E\u3059\u3002\u30EA\u30ED\u30FC\u30C9\u3057\u3066\u4E0A\u66F8\u304D\u3057\u307E\u3059\u304B\uFF1F")||(cl(),await Fe(o))}),document.getElementById("memola-sync-dismiss")?.addEventListener("click",()=>{cl()}),document.getElementById("memola-sync-mute")?.addEventListener("click",()=>{m.sync.suppressBannerUntilFocus=!0,cl()})}function cl(){let e=document.getElementById("memola-sync-banner");e&&e.remove()}function vg(){let e=document.body;e.dataset.memolaStaleResetWired!=="1"&&(e.dataset.memolaStaleResetWired="1",document.addEventListener("visibilitychange",()=>{document.hidden||(m.sync.suppressBannerUntilFocus=!1)}))}function xP(){em&&(em(),em=null),Ev();let e=document.body;delete e.dataset.memolaCrossTabWired}function yg(){let e=document.body;e.dataset.memolaCrossTabWired!=="1"&&(e.dataset.memolaCrossTabWired="1",em=Iv(t=>{m.currentId===t.pageId&&(t.etag&&t.etag===m.sync.loadedEtag||m.sync.suppressBannerUntilFocus||m.saving||(async()=>await aw(t.pageId,t.etag,t.modified)||m.currentId===t.pageId&&iw("",t.modified,t.pageId,!0))())}))}var tw,hg,em,Rr=L(()=>{"use strict";j();K();$t();W();De();ve();bu();ft();Rv();ht();le();ye();Be();ll();tw=3e4;hg=!1;em=null});var wg={};q(wg,{applyOutlineState:()=>Jr,attachOutlineWatcher:()=>kg,isOutlineOpen:()=>om,renderOutline:()=>xg,setOutlineOpen:()=>sw,toggleOutline:()=>dl});function om(){return Zi.get()==="1"}function sw(e){e?Zi.set("1"):Zi.clear(),Jr()}function dl(){sw(!om())}function Jr(){let e=E("outline"),t=document.getElementById("memola-outline-btn"),o=m.currentType==="page"&&!!m.currentId;t&&(t.style.display=o?"":"none"),om()&&o?(e.classList.add("on"),t?.classList.add("on"),xg()):(e.classList.remove("on"),t?.classList.remove("on"))}function xg(){if(!om()||m.currentType!=="page")return;let e=E("outline-list");e.innerHTML="";let o=Pe().querySelectorAll("h1, h2, h3");if(o.length===0){let n=document.createElement("div");n.className="memola-outline-empty",n.textContent="\u898B\u51FA\u3057\u304C\u3042\u308A\u307E\u305B\u3093",e.appendChild(n);return}o.forEach((n,r)=>{let a="memola-outline-h-"+r;n.setAttribute("data-outline-id",a);let i=document.createElement("div");i.className="memola-outline-item memola-outline-"+n.tagName.toLowerCase(),i.textContent=(n.textContent||"").trim()||"(\u7121\u984C)",i.addEventListener("click",()=>{n.scrollIntoView({behavior:"smooth",block:"start"})}),e.appendChild(i)})}function kg(){let e=Pe(),t=null;new MutationObserver(()=>{t&&clearTimeout(t),t=setTimeout(()=>xg(),300)}).observe(e,{childList:!0,subtree:!0,characterData:!0})}var bi=L(()=>{"use strict";j();me();ve()});var Eg={};q(Eg,{applyPropertiesState:()=>Zr,isPropertiesOpen:()=>nm,renderProperties:()=>cw,setPropertiesOpen:()=>lw,togglePropertiesPanel:()=>ml});function nm(){return Qi.get()==="1"}function lw(e){e?Qi.set("1"):Qi.clear(),Zr()}function ml(){lw(!nm())}function Zr(){let e=E("props"),t=document.getElementById("memola-props-btn");nm()&&m.currentId?(e.classList.add("on"),t?.classList.add("on"),cw()):(e.classList.remove("on"),t?.classList.remove("on"))}function Ho(e,t){return'<div class="memola-prop-row"><div class="memola-prop-label">'+M(e)+'</div><div class="memola-prop-value">'+M(t)+"</div></div>"}async function cw(){if(!nm()||!m.currentId)return;let e=E("props-list"),t=m.currentId,o=m.pages.find(l=>l.Id===t),n=A(t);if(!o||!n){e.innerHTML="";return}let r=Yn(t).slice(0,-1).map(l=>l.Title||"\u7121\u984C").join(" / ")||"(\u30EB\u30FC\u30C8)",a=o.Type==="database"?"\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9":"\u30DA\u30FC\u30B8";if(e.innerHTML=Ho("\u7A2E\u985E",a)+Ho("\u89AA",r)+Ho("\u30A2\u30A4\u30B3\u30F3",n.icon||"-")+Ho("ID",t)+(o.Type==="database"&&n.list?Ho("SP \u30EA\u30B9\u30C8",n.list):"")+(o.Type!=="database"?Ho("\u30EA\u30B9\u30C8\u9805\u76EE",ot(t)+" #"+t):"")+'<div class="memola-prop-row memola-prop-loading">\u6700\u7D42\u66F4\u65B0\u8005\u3092\u53D6\u5F97\u4E2D...</div>',o.Type!=="database")try{let l="",c="";if(m.sync.pageId===t&&m.sync.loadedModified)l=m.sync.loadedModified;else{let p=await ct(t);p&&(l=p.modified)}c=await Pa(t).catch(()=>"");let d=e.querySelector(".memola-prop-loading");if(d&&d.remove(),l){let p=new Date(l).toLocaleString("ja-JP");e.insertAdjacentHTML("beforeend",Ho("\u6700\u7D42\u66F4\u65B0",p)),e.insertAdjacentHTML("beforeend",Ho("\u7DE8\u96C6\u8005",c||"\u4E0D\u660E"))}}catch{}else{let l=e.querySelector(".memola-prop-loading");l&&l.remove(),e.insertAdjacentHTML("beforeend",Ho("\u884C\u6570",String(m.dbItems.length))),e.insertAdjacentHTML("beforeend",Ho("\u5217\u6570",String(m.dbFields.length))),e.insertAdjacentHTML("beforeend",'<div class="memola-prop-add" id="memola-prop-add">\uFF0B \u30D7\u30ED\u30D1\u30C6\u30A3\u8FFD\u52A0</div>'),e.querySelector("#memola-prop-add")?.addEventListener("click",()=>{document.getElementById("memola-col-md")?.classList.add("on")})}e.insertAdjacentHTML("beforeend",'<div class="memola-prop-sep"></div>'),e.insertAdjacentHTML("beforeend",'<div class="memola-prop-section">\u30D0\u30C3\u30AF\u30EA\u30F3\u30AF</div>');let i=document.createElement("div");i.className="memola-prop-empty",i.textContent="\u8AAD\u307F\u8FBC\u307F\u4E2D...",e.appendChild(i);let s=t;ds(t,l=>A(l)?.title||null).then(l=>{if(m.currentId===s){if(i.remove(),l.length===0){e.insertAdjacentHTML("beforeend",'<div class="memola-prop-empty">\u53C2\u7167\u3057\u3066\u3044\u308B\u30DA\u30FC\u30B8\u306F\u3042\u308A\u307E\u305B\u3093</div>');return}for(let c of l){let d=document.createElement("div");d.className="memola-prop-backlink",d.dataset.pid=c.pageId,d.innerHTML='<div class="memola-prop-backlink-title">\u2192 '+M(c.pageTitle)+"</div>"+(c.snippet?'<div class="memola-prop-backlink-snippet">'+M(c.snippet)+"</div>":""),e.appendChild(d)}}}).catch(()=>{m.currentId===s&&(i.textContent="\u30D0\u30C3\u30AF\u30EA\u30F3\u30AF\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F")})}var vi=L(()=>{"use strict";j();me();Be();K();ms();$t();De();ve();ye()});var pl={};q(pl,{attachScopeTag:()=>Ig,confirmScopeChangeLinks:()=>uw,syncScopeTag:()=>pw,toggleCurrentPageScope:()=>rm});function mw(){if(!m.currentId)return null;let e=A(m.currentId);return e?e.scope==="org"?"org":"user":null}function pw(){let e=document.getElementById(dw);if(!e)return;if(!(!!m.currentId&&(m.currentType==="page"||m.currentType==="database")&&!m.currentRow)){e.style.display="none";return}let o=m.currentId?A(m.currentId):null;if(!o||o.trashed){e.style.display="none";return}if(o.originPageId){e.style.display="none";return}if(o.type==="database"&&o.list==="memola-daily"){e.style.display="none";return}let n=mw()||"user",r=e.querySelector(".memola-scope-tag-ic"),a=e.querySelector(".memola-scope-tag-label");e.classList.toggle("org",n==="org"),e.classList.toggle("user",n==="user"),r&&(r.textContent=n==="org"?"\u{1F310}":"\u{1F512}"),a&&(a.textContent=n==="org"?"\u7D44\u7E54":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8"),e.title=n==="org"?"\u3053\u306E\u30DA\u30FC\u30B8\u306F\u7D44\u7E54\u306B\u516C\u958B\u3055\u308C\u3066\u3044\u307E\u3059 \u2014 \u30AF\u30EA\u30C3\u30AF\u3067\u500B\u4EBA (\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8) \u306B\u5207\u66FF":"\u3053\u306E\u30DA\u30FC\u30B8\u306F\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u3067\u3059 \u2014 \u30AF\u30EA\u30C3\u30AF\u3067\u7D44\u7E54\u306B\u516C\u958B",e.style.display="";let i=document.querySelector(".memola-pgm-scope-label"),s=document.querySelector(".memola-pgm-scope-ic");i&&(i.textContent=n==="org"?"\u500B\u4EBA\u306B\u623B\u3059":"\u7D44\u7E54\u306B\u516C\u958B"),s&&(s.textContent=n==="org"?"\u{1F310}":"\u{1F512}")}async function rm(){let e=m.currentId;if(!e)return;let t=A(e);if(!t)return;let n=(mw()||"user")==="org"?"user":"org",r=t.type==="database",a=r?"DB":"\u30DA\u30FC\u30B8",i=r?0:ls(m.pages,e),s="\u300C"+(t.title||"\u7121\u984C")+"\u300D("+a+") \u3092"+(n==="org"?"\u7D44\u7E54\u306B\u516C\u958B":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8 (\u500B\u4EBA) \u306B\u5909\u66F4")+`\u3057\u307E\u3059\u3002
`+(i>0?"\u914D\u4E0B\u306E "+i+` \u30DA\u30FC\u30B8\u3082\u540C\u3058\u5206\u985E\u306B\u5207\u308A\u66FF\u308F\u308A\u307E\u3059\u3002
`:"")+a+"\u306F "+(n==="org"?"\u300C\u{1F310} \u7D44\u7E54\u300D":"\u300C\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u300D")+` \u30BB\u30AF\u30B7\u30E7\u30F3\u306E\u5148\u982D\u306B\u79FB\u52D5\u3057\u307E\u3059\u3002

\u3088\u308D\u3057\u3044\u3067\u3059\u304B?`;if(confirm(s)&&await uw(e,n))try{let{rootId:l}=await Ua(e,n);t.parent&&await Lr(l,"");let c=m.pages.filter(u=>(u.ParentId||"")==="").map(u=>u.Id),d=[l,...c.filter(u=>u!==l)];Ma("",d);let{renderTree:p}=await Promise.resolve().then(()=>(Be(),po));if(p(),l!==e||m.currentId===e){let{doSelect:u}=await Promise.resolve().then(()=>(W(),ce));await u(l)}pw(),w(n==="org"?"\u7D44\u7E54\u306B\u516C\u958B\u3057\u307E\u3057\u305F":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u306B\u623B\u3057\u307E\u3057\u305F")}catch(l){w("\u30B9\u30B3\u30FC\u30D7\u5909\u66F4\u306B\u5931\u6557: "+l.message,"err")}}async function uw(e,t){let o=await kP(e,t);return!(o&&!window.confirm(o))}async function kP(e,t){try{if(t==="org"){let{collectDescendantIds:a}=await Promise.resolve().then(()=>(hr(),Db)),i=new Set(a(m.pages,e)),{findOutgoingPrivateLinks:s}=await Promise.resolve().then(()=>(K(),je)),l=await s(e,i);return l.length===0?"":`\u26A0 \u3053\u306E\u30DA\u30FC\u30B8\u306F\u6B21\u306E\u300C\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u300D\u30DA\u30FC\u30B8\u306B\u30EA\u30F3\u30AF\u3057\u3066\u3044\u307E\u3059:

`+(l.slice(0,8).map(d=>"\u30FB"+d).join(`
`)+(l.length>8?`
\u2026\u4ED6 ${l.length-8} \u4EF6`:""))+`

\u7D44\u7E54\u306B\u516C\u958B\u3059\u308B\u3068\u3001\u3053\u308C\u3089\u306E\u30EA\u30F3\u30AF\u306F\u4ED6\u306E\u30E1\u30F3\u30D0\u30FC\u306B\u306F\u7121\u52B9(\u958B\u3051\u306A\u3044)\u306B\u306A\u308A\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B?`}let{getBacklinksFor:o}=await Promise.resolve().then(()=>(ms(),Hb)),n=await o(e,a=>A(a)?.title||null);return n.length===0?"":`\u26A0 \u6B21\u306E\u30DA\u30FC\u30B8\u304C\u3053\u306E\u30DA\u30FC\u30B8\u306B\u30EA\u30F3\u30AF\u3057\u3066\u3044\u307E\u3059:

`+(n.slice(0,8).map(a=>"\u30FB"+a.pageTitle).join(`
`)+(n.length>8?`
\u2026\u4ED6 ${n.length-8} \u4EF6`:""))+`

\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u306B\u5909\u66F4\u3059\u308B\u3068\u3001\u3053\u308C\u3089\u306E\u30EA\u30F3\u30AF\u306F\u4ED6\u306E\u30E1\u30F3\u30D0\u30FC\u306B\u306F\u7121\u52B9(\u958B\u3051\u306A\u3044)\u306B\u306A\u308A\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B?`}catch{return""}}function Ig(){let e=document.getElementById(dw);e&&e.addEventListener("click",t=>{t.stopPropagation(),rm()})}var dw,Qr=L(()=>{"use strict";j();K();hr();le();ye();dw="memola-scope-tag"});function hn(){Promise.resolve().then(()=>(Qr(),pl)).then(r=>r.syncScopeTag());let e=document.getElementById("memola-pub-tag");if(!e)return;let t=e.querySelector(".memola-pub-tag-label"),n=!!m.currentId&&m.currentType==="page"&&!m.currentRow&&m.currentId?A(m.currentId):null;if(!n?.published){e.style.display="none",am();return}e.style.display="",n.publishedDirty?(e.classList.add("dirty"),t&&(t.textContent="\u516C\u958B\u4E2D\u30FB\u672A\u53CD\u6620"),e.title="Memola \u5074\u306B\u672A\u53CD\u6620\u306E\u66F4\u65B0\u304C\u3042\u308A\u307E\u3059 \u2014 \u30AF\u30EA\u30C3\u30AF\u3067\u64CD\u4F5C\u30E1\u30CB\u30E5\u30FC"):(e.classList.remove("dirty"),t&&(t.textContent="\u516C\u958B\u4E2D"),e.title="\u516C\u958B\u30DA\u30FC\u30B8\u3068\u540C\u671F\u3057\u3066\u3044\u307E\u3059 \u2014 \u30AF\u30EA\u30C3\u30AF\u3067\u64CD\u4F5C\u30E1\u30CB\u30E5\u30FC")}function wP(){let e=document.getElementById("memola-pub-pop"),t=document.getElementById("memola-pub-tag");if(!e||!t||!m.currentId)return;let o=A(m.currentId);if(!o?.published)return;let n=e.querySelector(".memola-pub-pop-msg");n&&(n.textContent=o.publishedDirty?"Memola \u306E\u6700\u65B0\u5185\u5BB9\u304C\u516C\u958B\u30DA\u30FC\u30B8\u306B\u53CD\u6620\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002":"\u516C\u958B\u30DA\u30FC\u30B8\u306F\u6700\u65B0\u306E\u5185\u5BB9\u3068\u540C\u671F\u3057\u3066\u3044\u307E\u3059\u3002");let r=t.getBoundingClientRect();e.style.top=r.bottom+6+"px",e.style.right=window.innerWidth-r.right+"px",e.style.display="",yi||(yi=a=>{let i=a.target;i&&(e.contains(i)||t.contains(i)||am())},document.addEventListener("mousedown",yi,!0))}function am(){let e=document.getElementById("memola-pub-pop");e&&(e.style.display="none"),yi&&(document.removeEventListener("mousedown",yi,!0),yi=null)}async function EP(){let e=m.currentId;if(!e||!A(e)?.published)return;let{flushPendingSave:o}=await Promise.resolve().then(()=>(gt(),Ur));await o();let n=document.getElementById("memola-pub-tag"),a=(E("ttl")?.value||"").trim()||"\u7121\u984C",{getBlocks:i}=await Promise.resolve().then(()=>(ht(),Bo)),{blocksToMd:s}=await Promise.resolve().then(()=>(Tt(),Dp)),l=s(i()),c=n?.querySelector(".memola-pub-tag-label"),d=c?.textContent||"";n&&n.classList.add("busy"),c&&(c.textContent="\u540C\u671F\u4E2D\u2026");try{await(await Promise.resolve().then(()=>(Er(),wr))).syncPublishedPage(e,a,l),w("\u516C\u958B\u30DA\u30FC\u30B8\u3092\u540C\u671F\u3057\u307E\u3057\u305F")}catch(p){w("\u540C\u671F\u5931\u6557: "+p.message,"err"),c&&d&&(c.textContent=d)}finally{n&&n.classList.remove("busy"),hn()}}function IP(){let e=m.currentId;if(!e)return;let o=A(e)?.publishedUrl||"";if(!o){w("URL \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}window.open(o,"_blank","noopener")}async function TP(){let e=m.currentId;if(!e)return;let o=A(e)?.publishedUrl||"";if(!o){w("URL \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}try{await navigator.clipboard.writeText(o),w("URL \u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")}catch{w("\u30B3\u30D4\u30FC\u5931\u6557","err")}}async function LP(){let e=m.currentId;if(e&&confirm("Web \u516C\u958B\u3092\u89E3\u9664\u3057\u307E\u3059\u3002SP \u4E0A\u306E\u516C\u958B\u30DA\u30FC\u30B8\uFF08Site Page\uFF09\u3082\u524A\u9664\u3055\u308C\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F"))try{await(await Promise.resolve().then(()=>(Er(),wr))).unpublishPage(e),w("\u516C\u958B\u3092\u89E3\u9664\u3057\u307E\u3057\u305F")}catch(t){w("\u89E3\u9664\u5931\u6557: "+t.message,"err")}finally{hn()}}function fw(){let e=document.getElementById("memola-pub-tag"),t=document.getElementById("memola-pub-pop");!e||!t||(e.addEventListener("click",o=>{o.stopPropagation(),t.style.display==="none"?wP():am()}),t.addEventListener("click",async o=>{let n=o.target.closest("[data-pub-act]");if(!n)return;let r=n.dataset.pubAct;am(),r==="sync"?await EP():r==="open"?IP():r==="copy"?await TP():r==="unpublish"&&await LP()}))}var yi,im=L(()=>{"use strict";j();me();le();ye();yi=null});async function gw(){return xi||(xi=Rt({title:Jn,fields:[{name:"PageId",kind:2},{name:"UserName",kind:2},{name:"LastSeen",kind:4}]}).then(()=>{}).catch(e=>{throw xi=null,e}),xi)}function bw(){xi=null,Jt=null,sm=null,Xn=null}async function vw(e){if(await gw(),ul||(ul=await Ln().catch(()=>"")),!ul)return;if(Xn)try{await Xn}catch{}sm=e;let t=new Date().toISOString();if(Jt)await ze(Jn,Jt,{PageId:e,UserName:ul,LastSeen:t}).catch(()=>{});else{Xn=(async()=>{try{Jt=(await _e(Jn,{Title:hw,PageId:e,UserName:ul,LastSeen:t})).Id}catch{}})();try{await Xn}finally{Xn=null}}}async function lm(){if(!(!sm||!Jt))try{await ze(Jn,Jt,{LastSeen:new Date().toISOString()})}catch{}}async function Lg(){if(Xn)try{await Xn}catch{}if(!Jt)return;let e=Jt;Jt=null,sm=null;try{await $e(Jn,e)}catch{}}async function yw(e){await gw();let t=await Ie(Jn),o=Date.now()-SP,n=[];for(let r of t){if(r.PageId!==e)continue;let a=r.LastSeen?new Date(r.LastSeen).getTime():0;!a||a<o||n.push({userName:r.UserName||"",sessionId:r.Title||"",lastSeen:a,isSelf:r.Title===hw})}return n}function xw(){window.addEventListener("beforeunload",e=>{if(Promise.resolve().then(()=>(ft(),Ka)).then(({saver:t})=>{t.isDirty()&&(e.preventDefault(),e.returnValue="")}).catch(()=>{}),Jt){try{navigator.sendBeacon?.(J(Jn,"/items("+Jt+")"))}catch{}try{fetch(J(Jn,"/items("+Jt+")"),{method:"POST",headers:{"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include",keepalive:!0}).catch(()=>{})}catch{}}})}var Jn,Tg,SP,xi,hw,Jt,sm,ul,Xn,Sg=L(()=>{"use strict";Re();Et();$t();Jn="memola-presence",Tg=3e4,SP=9e4,xi=null;hw="sess-"+Math.random().toString(36).slice(2,12)+"-"+Date.now(),Jt=null,sm=null,ul="",Xn=null});var Ag={};q(Ag,{attachPresence:()=>Cg,setPresencePage:()=>Pg,shutdownPresence:()=>CP,syncPresenceForCurrent:()=>dm});function kw(){return mr.get()!=="0"}function MP(e){if(!e)return"?";let t=e.split(/\s+/).filter(Boolean);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():e.slice(0,1)}function PP(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)>>>0;return`hsl(${t%360}, 55%, 55%)`}function Mg(e){let t=document.getElementById("memola-presence");if(!t)return;let o=e.filter(i=>!i.isSelf);if(o.length===0){t.style.display="none";return}t.style.display="";let r=o.slice(0,5),a=o.length-r.length;t.innerHTML=r.map(i=>'<span class="memola-presence-av" style="background:'+PP(i.userName)+'" title="'+M(i.userName)+' \u304C\u95B2\u89A7\u4E2D">'+M(MP(i.userName))+"</span>").join("")+(a>0?'<span class="memola-presence-more" title="\u4ED6 '+a+' \u540D">+'+a+"</span>":"")}async function cm(){if(Zn)try{let e=await yw(Zn);Mg(e)}catch{}}async function Pg(e){if(Zn!==e){if(Zn&&Lg(),Zn=e,Zt&&(clearInterval(Zt),Zt=null),!e){Mg([]);return}if(!kw()){Mg([]);return}try{await vw(e),await cm(),Zt=setInterval(()=>{lm(),cm()},Tg)}catch{}}}function Cg(){let e=document.body;e.dataset.memolaPresenceWired!=="1"&&(e.dataset.memolaPresenceWired="1",xw(),document.addEventListener("visibilitychange",()=>{document.hidden&&Zn?Zt&&(clearInterval(Zt),Zt=null):!document.hidden&&Zn&&!Zt&&kw()&&(lm(),cm(),Zt=setInterval(()=>{lm(),cm()},Tg))}))}function CP(){Zt&&(clearInterval(Zt),Zt=null),Zn=null,Lg()}function dm(){m.currentType==="page"&&m.currentId&&!m.currentRow?Pg(m.currentId):Pg(null)}var Zt,Zn,fl=L(()=>{"use strict";j();Sg();De();ve();Zt=null,Zn=null});function gl(){let e=m.dbFields.filter(t=>[2,3,4,6,8,9].indexOf(t.FieldTypeKind)>=0);return Hu(e,m.dbList)}function Vt(){let e=m.dbItems.slice();if(m.dbFilters.length>0&&(e=e.filter(t=>{for(let o of m.dbFilters){if(!o.value&&o.op!=="empty"&&o.op!=="not_empty")continue;let n=t[o.field],r=n==null?"":String(n);if(o.op==="equals"){if(r!==o.value)return!1}else if(o.op==="not_empty"){if(!r)return!1}else if(o.op==="empty"){if(r)return!1}else if(!r.toLowerCase().includes(o.value.toLowerCase()))return!1}return!0})),m.dbSort.field){let t=m.dbSort.field,o=m.dbSort.asc;e.sort((n,r)=>{let a=n[t]!=null?String(n[t]):"",i=r[t]!=null?String(r[t]):"";return a<i?o?-1:1:a>i?o?1:-1:0})}else e=od(e,m.dbList);return e}function _n(){return m.dbSort.field==null}function Dr(e,t,o){let n=(Array.isArray(e)?e:[e]).filter(l=>l!==t);if(n.length===0)return;let r=td(m.dbList)||[],a=od(m.dbItems.slice(),m.dbList).map(l=>l.Id),i=n.slice().sort((l,c)=>a.indexOf(l)-a.indexOf(c));for(let l of i){let c=a.indexOf(l);c>=0&&a.splice(c,1)}let s=a.indexOf(t);s<0&&(s=a.length),o&&(s+=1),a.splice(s,0,...i),Fu(m.dbList,a),Yu(m.dbList,r,a),Ne(),Promise.resolve().then(()=>(id(),ad)).then(l=>{E("list-view").classList.contains("on")&&l.renderListView(),E("gallery-view").classList.contains("on")&&l.renderGalleryView(),E("calendar-view").classList.contains("on")&&l.renderCalendarView(),E("gantt-view").classList.contains("on")&&l.renderGanttView()})}function mm(e){ki=e}function Ne(){let e=E("dth-row"),t=E("dtb");e.innerHTML="",t.innerHTML="";let o=gl();Bg=ny(m.dbList),ly(m.dbList,m.dbItems.map(u=>u.Id)),E("dt").classList.toggle("memola-has-sel",m.dbSelected.size>0),Dn();let r=document.createElement("th");r.className="memola-th-cb";let a=document.createElement("input");a.type="checkbox",a.className="memola-cb";let s=Vt().map(u=>u.Id),l=s.filter(u=>m.dbSelected.has(u)).length;l===0?a.checked=!1:l===s.length?a.checked=!0:a.indeterminate=!0,a.addEventListener("change",()=>{a.checked?s.forEach(u=>m.dbSelected.add(u)):s.forEach(u=>m.dbSelected.delete(u)),Ne()}),r.appendChild(a),e.appendChild(r),o.forEach((u,f)=>{let g=document.createElement("th"),y=m.dbSort.field===u.InternalName,b=document.createElement("span");b.className="memola-th-label",b.innerHTML=u.Title+(y?'<span class="sort-arrow">'+(m.dbSort.asc?"\u25B2":"\u25BC")+"</span>":""),g.appendChild(b);let h=document.createElement("button");h.className="memola-th-color",h.title="\u5217\u306E\u8272",h.textContent="\u{1F3A8}",h.draggable=!1,h.addEventListener("mousedown",x=>{x.preventDefault(),x.stopPropagation()}),h.addEventListener("click",x=>{x.stopPropagation();let T=h.getBoundingClientRect();nd(T.left,T.bottom+4,I=>{iy(m.dbList,u.InternalName,I),Ne()})}),g.appendChild(h),g.dataset.field=u.InternalName,g.dataset.colIdx=String(f),g.draggable=!0;let v=m.dbColumnWidths[u.InternalName];v&&(g.style.width=v+"px"),b.addEventListener("click",()=>{m.dbSort.field===u.InternalName?m.dbSort.asc=!m.dbSort.asc:(m.dbSort.field=u.InternalName,m.dbSort.asc=!0),Ne()}),g.addEventListener("dragstart",x=>{x.dataTransfer&&(x.dataTransfer.effectAllowed="move",x.dataTransfer.setData("text/memola-col",String(f)),g.classList.add("memola-th-dragging"))}),g.addEventListener("dragend",()=>g.classList.remove("memola-th-dragging")),g.addEventListener("dragover",x=>{let T=x.dataTransfer;if(!T||Array.from(T.types).indexOf("text/memola-col")<0)return;x.preventDefault(),T.dropEffect="move";let I=g.getBoundingClientRect(),B=x.clientX>I.left+I.width/2;g.classList.toggle("memola-th-drop-before",!B),g.classList.toggle("memola-th-drop-after",B)}),g.addEventListener("dragleave",()=>{g.classList.remove("memola-th-drop-before","memola-th-drop-after")}),g.addEventListener("drop",x=>{let T=x.dataTransfer;if(!T)return;let I=T.getData("text/memola-col");if(!I)return;x.preventDefault();let B=parseInt(I,10),F=g.getBoundingClientRect(),H=x.clientX>F.left+F.width/2?f+1:f;g.classList.remove("memola-th-drop-before","memola-th-drop-after");let D=ed(m.dbList)||[],Y=ju(o,B,H).map(ee=>ee.InternalName);Ou(m.dbList,Y),Ju(m.dbList,D,Y),Ne()});let k=document.createElement("div");k.className="memola-col-resize",k.addEventListener("mousedown",x=>{x.preventDefault(),x.stopPropagation();let T=x.clientX,I=g.offsetWidth;document.body.style.cursor="col-resize",document.body.style.userSelect="none";function B(P){let H=Math.max(60,I+P.clientX-T);g.style.width=H+"px",m.dbColumnWidths[u.InternalName]=H}function F(){document.body.style.cursor="",document.body.style.userSelect="",document.removeEventListener("mousemove",B),document.removeEventListener("mouseup",F)}document.addEventListener("mousemove",B),document.addEventListener("mouseup",F)}),g.appendChild(k),e.appendChild(g)});let c=document.createElement("th");c.className="memola-th-del",e.appendChild(c);let d=document.createElement("th");d.className="memola-th-add",d.textContent="+",d.title="\u5217\u3092\u8FFD\u52A0",d.addEventListener("click",()=>{E("col-name").value="";let u=document.querySelectorAll("#memola-col-type-grid .memola-col-type");u[0]&&u[0].click();let f=document.getElementById("memola-col-choices");f&&(f.value=""),E("col-choices-row").classList.remove("on");let g=document.getElementById("memola-col-spmap");g&&(g.value=""),E("col-md").classList.add("on"),E("col-name").focus()}),e.appendChild(d);let p=document.createElement("th");p.className="memola-th-spacer",e.appendChild(p),Vt().forEach(u=>{t.appendChild(hl(u,o))})}function Po(e){let t=document.createElement("button");return t.className="memola-row-open",t.title="\u884C\u3092\u958B\u304F\uFF08\u30DA\u30FC\u30B8\u8868\u793A\uFF09",t.textContent="\u2197",t.addEventListener("click",o=>{o.stopPropagation(),Promise.resolve().then(()=>(cn(),ln)).then(n=>n.openRowAsPage(m.currentId||"",e))}),t}function hl(e,t){let o=document.createElement("tr");o.dataset.id=String(e.Id),o.addEventListener("mousedown",c=>{if(!c.shiftKey)return;let d=c.target;if(!d||d.closest(".memola-cb")||d.closest(".memola-row-open")||d.closest(".memola-del-btn"))return;c.preventDefault(),c.stopPropagation();let p=o.querySelector(".memola-cb");p&&(p.checked=!p.checked,p.dispatchEvent(new Event("change")))},!0);let n=document.createElement("td");n.className="memola-td-cb";let r=Bg.rows?.[String(e.Id)];r&&(n.style.background=r);let a=document.createElement("input");a.type="checkbox",a.className="memola-cb",a.checked=m.dbSelected.has(e.Id),a.checked&&o.classList.add("memola-tr-sel"),a.addEventListener("click",c=>{let d=c;if(c.stopPropagation(),d.shiftKey&&ki!==null&&ki!==e.Id){c.preventDefault();let p=Vt().map(g=>g.Id),u=p.indexOf(ki),f=p.indexOf(e.Id);if(u>=0&&f>=0){let[g,y]=u<f?[u,f]:[f,u],b=!a.checked;for(let h=g;h<=y;h++)b?m.dbSelected.add(p[h]):m.dbSelected.delete(p[h]);ki=e.Id,Ne()}}}),a.addEventListener("change",()=>{a.checked?m.dbSelected.add(e.Id):m.dbSelected.delete(e.Id),ki=e.Id,o.classList.toggle("memola-tr-sel",a.checked),E("dt").classList.toggle("memola-has-sel",m.dbSelected.size>0),Dn();let c=document.querySelector(".memola-th-cb .memola-cb");if(c){let d=Vt().map(u=>u.Id),p=d.filter(u=>m.dbSelected.has(u)).length;c.indeterminate=p>0&&p<d.length,c.checked=p>0&&p===d.length}}),n.appendChild(a),o.appendChild(n),t.forEach(c=>{let d=document.createElement("td"),p=sy(Bg,e.Id,c.InternalName);if(p&&(d.style.background=p),c.FieldTypeKind===4){let h=function(){let k=bo(b);y.innerHTML="";let x=document.createElement("span");x.textContent=k||"\u2014",k||(x.style.color="var(--ink-4)"),y.appendChild(x)},v=function(){y.innerHTML="";let k=document.createElement("span");k.className="memola-dc-date-wrap";let x=document.createElement("input");x.type="text",x.className="memola-dc-date-inp",x.placeholder="YYYY-MM-DD",x.value=bo(b);let T=document.createElement("input");T.type="date",T.className="memola-dc-date-pick",T.value=bo(b),T.tabIndex=-1,T.title="\u30AB\u30EC\u30F3\u30C0\u30FC\u304B\u3089\u9078\u629E",k.append(x,T),y.appendChild(k),x.focus(),x.select();let I=!1;function B(){if(!b){h();return}I=!0;let H=b;b="",e[c.InternalName]="",Qe("\u4FDD\u5B58\u4E2D..."),pt(m.dbList,e.Id,{[c.InternalName]:""}).then(()=>{Qe(""),h(),Gt(m.dbList,e.Id,c.InternalName,c.Title,H,"")}).catch(D=>{w(D.message,"err"),b=H,e[c.InternalName]=H,h()})}function F(H){if(H===b){h();return}I=!0;let D=b;b=H,e[c.InternalName]=H,Qe("\u4FDD\u5B58\u4E2D..."),pt(m.dbList,e.Id,{[c.InternalName]:H}).then(()=>{Qe(""),h(),Gt(m.dbList,e.Id,c.InternalName,c.Title,D,H)}).catch(U=>{w(U.message,"err"),b=D,e[c.InternalName]=D,h()})}function P(H){if(I)return;let D=H.trim();if(!D){B();return}let U=bc(D);if(!U){w("\u65E5\u4ED8\u5F62\u5F0F\u304C\u7121\u52B9\u3067\u3059: "+D,"err"),x.focus();return}F(U)}x.addEventListener("blur",H=>{H.relatedTarget!==T&&P(x.value)}),x.addEventListener("keydown",H=>{H.key==="Enter"&&(H.preventDefault(),P(x.value)),H.key==="Escape"&&h()}),T.addEventListener("change",()=>{T.value?F(T.value):B()})};var u=h,f=v;let y=document.createElement("div");y.className="memola-dc-date";let b=e[c.InternalName]||"";y.addEventListener("click",()=>{y.querySelector("input")||v()}),h(),d.appendChild(y)}else if(c.FieldTypeKind===6&&c.Choices){let k=function(x){if(y.innerHTML="",x){let T=v.indexOf(x)%6,I=document.createElement("span");I.className="memola-select-chip memola-sc-"+T,I.textContent=x,I.style.cursor="pointer",I.addEventListener("click",()=>{y.innerHTML="",y.appendChild(b),b.focus()}),y.appendChild(I)}else y.appendChild(b)};var g=k;let y=document.createElement("div");y.style.padding="4px 12px";let b=document.createElement("select");b.style.cssText="border:none;background:transparent;font-size:14px;font-family:inherit;outline:none;cursor:pointer;max-width:140px;";let h=document.createElement("option");h.value="",h.textContent="\u2014",b.appendChild(h),c.Choices.forEach(x=>{let T=document.createElement("option");T.value=x,T.textContent=x,e[c.InternalName]===x&&(T.selected=!0),b.appendChild(T)});let v=c.Choices;b.addEventListener("change",()=>{let x=b.value,T=e[c.InternalName]||"";if(x===T)return;let I={};I[c.Title||c.InternalName]=x,e[c.InternalName]=x,pt(m.dbList,e.Id,I).then(()=>{k(x),Gt(m.dbList,e.Id,c.InternalName,c.Title,T,x)}).catch(B=>{w(B.message,"err")})}),b.addEventListener("blur",()=>{k(b.value)}),k(e[c.InternalName]||""),d.appendChild(y)}else{let y=c.FieldTypeKind===3,b=document.createElement("span");b.className="memola-dc"+(y?" multi":""),b.contentEditable="true",b.textContent=e[c.InternalName]!=null?String(e[c.InternalName]):"",b.dataset.field=c.InternalName;let h=b.textContent||"";b.addEventListener("focus",()=>{h=b.textContent||""}),b.addEventListener("keydown",v=>{let k=v;if(!(k.isComposing||k.keyCode===229)){if(k.key==="Escape"){b.textContent=h,b.blur();return}k.key==="Enter"&&(y?(k.metaKey||k.ctrlKey)&&(v.preventDefault(),b.blur()):k.shiftKey||(v.preventDefault(),b.blur()))}}),b.addEventListener("blur",()=>{let v=(b.textContent||"").trim(),k=h.trim();if(v===k)return;let x={};x[c.InternalName]=v,e[c.InternalName]=v,h=v,Qe("\u4FDD\u5B58\u4E2D..."),pt(m.dbList,e.Id,x).then(()=>{Qe(""),Gt(m.dbList,e.Id,c.InternalName,c.Title,k,v)}).catch(T=>{w(T.message,"err"),b.textContent=h})}),d.appendChild(b),c.InternalName==="Title"&&(d.style.position="relative",b.style.fontWeight="500",d.appendChild(Po(e)))}o.appendChild(d)});let i=document.createElement("td");i.className="memola-td-del";let s=document.createElement("button");s.className="memola-del-btn",s.title="\u884C\u3092\u524A\u9664",s.textContent="\u{1F5D1}",s.addEventListener("click",()=>{if(!confirm("\u3053\u306E\u884C\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F"))return;R(!0,"\u524A\u9664\u4E2D...");let c=m.dbList;Br(c,e.Id).then(()=>{o.remove(),w("\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u2318Z \u3067\u5FA9\u5143\u53EF\u80FD\uFF09")}).catch(d=>{w("\u524A\u9664\u5931\u6557: "+d.message,"err")}).finally(()=>{R(!1)})}),i.appendChild(s),o.appendChild(i),o.appendChild(document.createElement("td"));let l=document.createElement("td");return l.className="memola-td-spacer",o.appendChild(l),o}var Bg,ki,pm=L(()=>{"use strict";j();me();le();Ke();vo();Ns();Mo();Os();$u();Bg={};ki=null});function Ei(){let e=E("kb");e.innerHTML="";let t=m.dbFields.find(n=>n.FieldTypeKind===6&&n.Choices);if(!t||!t.Choices){let n=document.createElement("div");n.style.cssText="padding:40px;color:#9b9a97;font-size:14px;",n.textContent="\u9078\u629E\u80A2\u5217\u3092\u8FFD\u52A0\u3057\u3066\u304F\u3060\u3055\u3044",e.appendChild(n);return}t.Choices.concat(["\u672A\u8A2D\u5B9A"]).forEach(n=>{let r=document.createElement("div");r.className="memola-kb-col",r.dataset.choice=n;let a=document.createElement("div");a.className="memola-kb-col-hd",a.textContent=n,r.appendChild(a),Vt().filter(s=>{let l=s[t.InternalName]||"";return n==="\u672A\u8A2D\u5B9A"?!l:l===n}).forEach(s=>{let l=document.createElement("div");l.className="memola-kb-card",m.dbSelected.has(s.Id)&&l.classList.add("memola-card-sel"),l.draggable=!0,l.dataset.id=String(s.Id);let c=document.createElement("span");c.className="memola-kb-card-title",c.textContent=s.Title||"(\u7121\u984C)",l.appendChild(c),l.appendChild(Po(s)),Rn(l,s.Id),zs(l,s.Id),r.appendChild(l)}),r.addEventListener("dragover",s=>{let l=s.dataTransfer;!l||Array.from(l.types).indexOf("text/memola-kb")<0||(s.preventDefault(),l.dropEffect="move",Dg(r,s.clientY))}),r.addEventListener("dragleave",s=>{let l=s.relatedTarget;(!l||!r.contains(l))&&bl()}),r.addEventListener("drop",s=>{let l=s.dataTransfer;if(!l)return;let c=l.getData("text/memola-kb");if(!c)return;s.preventDefault(),bl();let d=parseInt(c,10);if(!m.dbItems.find(b=>b.Id===d))return;let u=m.dbSelected.has(d)?Array.from(m.dbSelected):[d],f=n==="\u672A\u8A2D\u5B9A"?"":n,g=[],y=[];for(let b of u){let h=m.dbItems.find(k=>k.Id===b);if(!h)continue;let v=h[t.InternalName]||"";f!==v&&(h[t.InternalName]=f,y.push(()=>{h[t.InternalName]=v}),g.push(pt(m.dbList,b,{[t.InternalName]:f}).then(()=>Gt(m.dbList,b,t.InternalName,t.Title,v,f))))}g.length!==0&&Promise.all(g).then(()=>requestAnimationFrame(()=>Ei())).catch(b=>{y.forEach(h=>h()),w("\u5909\u66F4\u5931\u6557: "+b.message,"err"),requestAnimationFrame(()=>Ei())})}),e.appendChild(r)})}function ww(){let e=document.getElementById("memola-overlay")||document.body;if(wi&&e.contains(wi))return wi;let t=document.createElement("div");return t.className="memola-card-drop-line",e.appendChild(t),wi=t,t}function Dg(e,t){let o=Array.from(e.querySelectorAll(".memola-kb-card, .memola-gv-card"));if(o.length===0){let s=e.getBoundingClientRect(),l=ww();l.style.top=s.top+36+"px",l.style.left=s.left+8+"px",l.style.width=s.width-16+"px",l.classList.add("on");return}let n=o[0],r=!1;for(let s of o){let l=s.getBoundingClientRect();if(t<l.top+l.height/2){n=s,r=!1;break}n=s,r=!0}let a=n.getBoundingClientRect(),i=ww();i.style.top=(r?a.bottom:a.top)-1+"px",i.style.left=a.left+"px",i.style.width=a.width+"px",i.classList.add("on")}function bl(){wi&&wi.classList.remove("on"),document.querySelectorAll(".memola-card-drop-line").forEach(e=>{e.classList.remove("on")})}function Rn(e,t){e.addEventListener("click",o=>{if(o.target.closest(".memola-row-open"))return;o.shiftKey&&(m.dbSelected.has(t)?m.dbSelected.delete(t):m.dbSelected.add(t),e.classList.toggle("memola-card-sel",m.dbSelected.has(t)),Promise.resolve().then(()=>(Os(),rd)).then(r=>r.renderBulkBar()))})}function zs(e,t){e.addEventListener("dragstart",o=>{if(!o.dataTransfer)return;o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/memola-kb",String(t));let n=m.dbSelected.has(t)?Array.from(m.dbSelected):[t];document.querySelectorAll(".memola-kb-card[data-id], .memola-gv-card[data-id]").forEach(r=>{let a=parseInt(r.dataset.id||"0",10);n.indexOf(a)>=0&&r.classList.add("memola-kb-card-dragging")})}),e.addEventListener("dragend",()=>{document.querySelectorAll(".memola-kb-card-dragging").forEach(o=>o.classList.remove("memola-kb-card-dragging")),bl()})}var wi,Ew=L(()=>{"use strict";j();me();le();Ke();Mo();pm();wi=null});function AP(e,t,o){let n=e.headers.get("Retry-After");if(n){let a=Number(n);if(!isNaN(a)&&a>=0)return Math.min(a*1e3,12e4);let i=Date.parse(n);if(!isNaN(i))return Math.max(0,Math.min(i-Date.now(),12e4))}let r=t.match(/(?:try again in|retry (?:after|in))\s+(\d+)\s*(?:s|sec|seconds)?/i);return r?Math.min(Number(r[1])*1e3,12e4):Math.min(2e3*Math.pow(2,o),3e4)}async function BP(e,t){if(!(e<=0)){if(t?.aborted)throw new DOMException("aborted","AbortError");await new Promise((o,n)=>{let r=setTimeout(()=>{t?.removeEventListener("abort",a),o()},e),a=()=>{clearTimeout(r),n(new DOMException("aborted","AbortError"))};t?.addEventListener("abort",a,{once:!0})})}}function vl(){return Xs()!==null}async function _g(e,t={}){if(e.length===0)return[];let o=Xs();if(!o)throw new Error("\u57CB\u3081\u8FBC\u307F\u672A\u8A2D\u5B9A: AI \u8A2D\u5B9A\u3067\u57CB\u3081\u8FBC\u307F\u30D7\u30ED\u30D0\u30A4\u30C0 (Voyage / Azure OpenAI \u4E92\u63DB / \u30ED\u30FC\u30AB\u30EB) \u3092\u69CB\u6210\u3057\u3066\u304F\u3060\u3055\u3044");let{inputType:n="document",signal:r,maxRetries:a=5}=t,i={"Content-Type":"application/json"};o.authStyle==="azure"?o.apiKey&&(i["api-key"]=o.apiKey):o.apiKey&&(i.Authorization=o.apiKey.startsWith("Bearer ")?o.apiKey:`Bearer ${o.apiKey}`);let s={input:e,model:o.model};o.kind==="voyage"?(s.input_type=n,o.dimensions&&(s.output_dimension=o.dimensions)):o.dimensions&&(s.dimensions=o.dimensions);let l=JSON.stringify(s);for(let c=0;c<=a;c++){if(r?.aborted)throw new DOMException("aborted","AbortError");let d=await fetch(o.url,{method:"POST",headers:i,credentials:"omit",signal:r,body:l});if(d.ok){let g=await d.json(),y=new Array(e.length);for(let b of g.data)y[b.index]=Float32Array.from(b.embedding);return y}let p=await d.text().catch(()=>"");if(!(d.status===429||d.status>=500&&d.status<600)||c===a)throw new Error(`embed failed: HTTP ${d.status} ${p.slice(0,300)}`);let f=AP(d,p,c);console.warn(`[rag/embed] HTTP ${d.status}; retry in ${Math.round(f/1e3)}s (${c+1}/${a})`),await BP(f,r)}throw new Error("embed failed: max retries exceeded")}async function Iw(e,t){let[o]=await _g([e],{inputType:"query",signal:t});return o}var um=L(()=>{"use strict";At()});function yl(){return{version:0,generation:1,maxSeq:0,sealed:[],open:null,updatedAt:Ii()}}function Ii(){return new Date().toISOString()}function Rg(e){let t=0;for(let o of e){let n=/(\d+)$/.exec(o);n&&(t=Math.max(t,Number(n[1])))}return t+1}function xl(e){return"seg-"+String(e).padStart(5,"0")}function kl(e){return JSON.stringify(e)}function fm(e){let t=JSON.parse(e);if(!t||!Array.isArray(t.records))throw new Error("\u58CA\u308C\u305F\u30BB\u30B0\u30E1\u30F3\u30C8");return t}function wl(e){return JSON.stringify(e)}function El(e){let t=JSON.parse(e);if(!t||!Array.isArray(t.sealed))throw new Error("\u58CA\u308C\u305F manifest");return t}function Tw(e){let t=2166136261;for(let o=0;o<e.length;o++)t^=e.charCodeAt(o),t=t+((t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24))>>>0;return t.toString(16).padStart(8,"0")}function Lw(e,t){return e.sealed.filter(o=>!t.has(o))}var Il=L(()=>{"use strict"});function _P(e){let t=2166136261;for(let o=0;o<e.length;o++)t^=e.charCodeAt(o),t=t+((t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24))>>>0;return t.toString(16).padStart(8,"0")}function RP(e){return new Promise((t,o)=>{let n=indexedDB.open(e,DP);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains(ea)||r.createObjectStore(ea),r.objectStoreNames.contains(Tl)||r.createObjectStore(Tl)},n.onsuccess=()=>t(n.result),n.onerror=()=>o(n.error)})}function Qn(e,t,o,n){return new Promise((r,a)=>{let i=e.transaction(t,o),s=n(i.objectStore(t));s.onsuccess=()=>r(s.result),s.onerror=()=>a(s.error)})}var DP,ea,Tl,Ti,Sw=L(()=>{"use strict";Il();He();DP=1,ea="segments",Tl="meta";Ti=class{constructor(t){this.dbp=null;this.name=`memola-rag-${_P(G)}-${t}`}get dbName(){return this.name}db(){return this.dbp??(this.dbp=RP(this.name))}async allIds(){let t=await this.db();return(await Qn(t,ea,"readonly",n=>n.getAllKeys())).map(String)}async get(t){let o=await this.db(),n=await Qn(o,ea,"readonly",r=>r.get(t));return n?fm(n):null}async put(t,o){let n=await this.db();await Qn(n,ea,"readwrite",r=>r.put(kl(o),t))}async delete(t){let o=await this.db();await Qn(o,ea,"readwrite",n=>n.delete(t))}async getManifest(){let t=await this.db(),o=await Qn(t,Tl,"readonly",n=>n.get("manifest"));return o?El(o):null}async setManifest(t){let o=await this.db();await Qn(o,Tl,"readwrite",n=>n.put(wl(t),"manifest"))}async clearAll(){let t=await this.db();await Qn(t,ea,"readwrite",o=>o.clear()),await Qn(t,Tl,"readwrite",o=>o.clear())}}});function NP(e){let t=new Float32Array(1),o=new Int32Array(t.buffer);t[0]=e;let n=o[0],r=n>>>16&32768,a=(n>>>23&255)-127+15,i=n&8388607;return a<=0?a<-10?r:(i=(i|8388608)>>1-a,r|i>>13):a>=31?r|31744:r|a<<10|i>>13}function OP(e){let t=(e&32768)<<16,o=(e&31744)>>10,n=e&1023,r;if(o===0)if(n===0)r=t;else{let s=-1,l=n;do s++,l<<=1;while(!(l&1024));l&=1023,r=t|s+127-15+1<<23|l<<13}else o===31?r=t|2139095040|n<<13:r=t|o-15+127<<23|n<<13;let a=new Int32Array(1),i=new Float32Array(a.buffer);return a[0]=r,i[0]}function Mw(e){let t=new Uint16Array(e.length);for(let r=0;r<e.length;r++)t[r]=NP(e[r]);let o=new Uint8Array(t.buffer),n="";for(let r=0;r<o.length;r++)n+=String.fromCharCode(o[r]);return btoa(n)}function gm(e){let t=atob(e),o=new Uint8Array(t.length);for(let a=0;a<t.length;a++)o[a]=t.charCodeAt(a);let n=new Uint16Array(o.buffer),r=new Float32Array(n.length);for(let a=0;a<n.length;a++)r[a]=OP(n[a]);return r}function Li(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n]*e[n];if(t=Math.sqrt(t),t===0)return e;let o=new Float32Array(e.length);for(let n=0;n<e.length;n++)o[n]=e[n]/t;return o}var hm=L(()=>{"use strict"});function Pw(e){let t=(e||"").toLowerCase().replace(/\s+/g," ").trim(),o=new Set;for(let n=0;n<t.length-1;n++)o.add(t.slice(n,n+2));return o}function HP(e,t){if(e.size===0)return 0;let o=0;for(let n of e)t.has(n)&&o++;return o/e.size}var bm,Cw=L(()=>{"use strict";hm();bm=class{constructor(){this.records=new Map;this.appliedSeq=new Map;this.maxSeq=0;this.kwCache=new Map}get size(){return this.records.size}get watermark(){return this.maxSeq}applySegment(t){let o=[...t.records].sort((n,r)=>n.seq-r.seq);for(let n of o)this.applyRecord(n)}applyRecord(t){let o=this.appliedSeq.get(t.key)??0;if(!(t.seq<=o)){if(this.kwCache.delete(t.key),t.op==="delete")this.records.delete(t.key);else{if(!t.emb)return;this.records.set(t.key,{key:t.key,docKey:t.docKey??t.key.split("#")[0],scope:t.scope??"user",title:t.title??"(\u7121\u984C)",chunkIdx:t.chunkIdx??0,chunkCount:t.chunkCount??1,heading:t.heading,text:t.text??"",docHash:t.docHash??"",vec:Li(gm(t.emb))})}this.appliedSeq.set(t.key,t.seq),t.seq>this.maxSeq&&(this.maxSeq=t.seq)}}docState(t){let o="",n=0;for(let r of this.records.values())r.docKey===t&&(n++,o||(o=r.docHash));return n>0?{docHash:o,chunkCount:n}:null}allDocKeys(){let t=new Set;for(let o of this.records.values())t.add(o.docKey);return t}search(t,o,n="",r=0,a=[]){let i=Li(t),s=i.length,c=r>0&&n.trim().length>0?Pw(n):null,d=Math.min(1,Math.max(0,r)),p=a.map(g=>g.toLowerCase()).filter(Boolean),u=[];for(let g of this.records.values()){let y=0;if(g.vec.length===s)for(let v=0;v<s;v++)y+=i[v]*g.vec[v];let b=Math.max(0,y),h=c?(1-d)*b+d*HP(c,this.kwIndex(g)):b;u.push({record:g,score:h})}let f=u;if(p.length){let g=b=>`${b.title} ${b.heading??""} ${b.text}`.toLowerCase(),y=u.filter(b=>p.every(h=>g(b.record).includes(h)));y.length&&(f=y)}return f.sort((g,y)=>y.score-g.score),f.slice(0,o)}kwIndex(t){let o=this.kwCache.get(t.key);return o||(o=Pw(`${t.title} ${t.heading??""} ${t.text}`),this.kwCache.set(t.key,o)),o}clear(){this.records.clear(),this.appliedSeq.clear(),this.kwCache.clear(),this.maxSeq=0}}});function Ng(e){return G+"/_api/web/GetFileByServerRelativeUrl('"+encodeURIComponent(e)+"')/$value"}function FP(e){return G+"/_api/web/GetFileByServerRelativeUrl('"+encodeURIComponent(e)+"')"}function ym(e,t=""){return G+"/_api/web/GetFolderByServerRelativeUrl('"+encodeURIComponent(e)+"')"+t}async function Og(e){try{let r=await fetch(ym(e,"?$select=Exists"),{headers:{Accept:vm},credentials:"include"});if(r.ok&&(await r.json()).d?.Exists)return}catch{}let t=await ke(),o=await fetch(G+"/_api/web/folders",{method:"POST",headers:{Accept:vm,"Content-Type":vm,"X-RequestDigest":t},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Folder"},ServerRelativeUrl:e})});if(o.ok)return;let n=await o.text().catch(()=>"");if(!(o.status===409||/exist|既に|already/i.test(n)))throw new Error("ensureFolder HTTP "+o.status+" "+n.slice(0,200))}async function Si(e){let t=await fetch(Ng(e),{headers:{Accept:"*/*"},credentials:"include"});if(t.status===404)return null;if(!t.ok)throw new Error("readFile HTTP "+t.status+" ("+e+")");return t.text()}async function Aw(e){let t=await fetch(Ng(e),{headers:{Accept:"*/*"},credentials:"include"});if(t.status===404)return null;if(!t.ok)throw new Error("readFile HTTP "+t.status+" ("+e+")");let o=await t.text(),n=t.headers.get("ETag")||t.headers.get("etag")||"";return{text:o,etag:n}}async function xm(e,t,o){let n=await ke(),r=ym(e,"/Files/add(url='"+encodeURIComponent(t)+"',overwrite=true)"),a=await fetch(r,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8","X-RequestDigest":n},credentials:"include",body:o});if(!a.ok){let i=await a.text().catch(()=>"");throw new Error("uploadFile("+t+") HTTP "+a.status+" "+i.slice(0,200))}}async function Bw(e,t,o){if(!o){let a=e.lastIndexOf("/");await xm(e.slice(0,a),e.slice(a+1),t);return}let n=await ke(),r=await fetch(Ng(e),{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8","X-RequestDigest":n,"X-HTTP-Method":"PUT","If-Match":o},credentials:"include",body:t});if(r.status===412)throw new Ll;if(!r.ok){let a=await r.text().catch(()=>"");throw new Error("uploadFileTextCas HTTP "+r.status+" "+a.slice(0,200))}}async function Dw(e,t,o){let n=await ke(),r=ym(e,"/Files/add(url='"+encodeURIComponent(t)+"',overwrite=false)"),a=await fetch(r,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8","X-RequestDigest":n},credentials:"include",body:o});if(a.ok)return!0;if(a.status===409||a.status===400||a.status===500){let s=await a.text().catch(()=>"");if(/already exists|exists at|存在|already there/i.test(s))return!1}let i=await a.text().catch(()=>"");throw new Error("uploadFileTextNoOverwrite HTTP "+a.status+" "+i.slice(0,200))}async function _w(e){let t=await ke(),o=await fetch(FP(e),{method:"POST",headers:{"X-RequestDigest":t,"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include"});if(!o.ok&&o.status!==404){let n=await o.text().catch(()=>"");throw new Error("deleteFile HTTP "+o.status+" "+n.slice(0,200))}}async function Hg(e){let t=await fetch(ym(e,"/Files?$select=Name&$top=5000"),{headers:{Accept:vm},credentials:"include"});return t.ok?((await t.json()).d?.results??[]).map(n=>n.Name??"").filter(Boolean):[]}var vm,Ll,Fg=L(()=>{"use strict";He();pr();vm="application/json;odata=verbose",Ll=class extends Error{constructor(){super("CAS conflict (412)");this.code="PRECONDITION_FAILED"}}});async function Rw(e,t,o=5){for(let n=0;n<=o;n++){let r=await e.readManifestWithEtag(),a=r?.manifest??yl(),i=r?.etag??"",s=t(a);s.updatedAt=Ii();try{return await e.writeManifestCas(s,i),s}catch(l){if(!(l instanceof Ll)||n===o)throw l;await new Promise(c=>setTimeout(c,50+n*60))}}throw new Error("manifest CAS: max retries exceeded")}var Sl,UP,Ml,Nw=L(()=>{"use strict";He();Fg();Il();Sl="manifest.json",UP="Shared Documents/memola-rag",Ml=class{constructor(t){this.scope=t;this.folder=`${Ko}/${UP}/${t}`}async ensure(){await Og(`${Ko}/Shared Documents/memola-rag`),await Og(this.folder)}async readManifest(){let t=await Si(`${this.folder}/${Sl}`);return t==null?null:El(t)}async readManifestWithEtag(){let t=await Aw(`${this.folder}/${Sl}`);return t?{manifest:El(t.text),etag:t.etag}:null}async writeManifest(t){await xm(this.folder,Sl,wl(t))}async writeManifestCas(t,o){if(!o){await this.writeManifest(t);return}await Bw(`${this.folder}/${Sl}`,wl(t),o)}async readSegment(t){let o=await Si(`${this.folder}/${t}.json`);return o==null?null:fm(o)}async writeSegment(t){await xm(this.folder,`${t.id}.json`,kl(t))}async writeSegmentNoOverwrite(t,o,n=50){let r=o;for(let a=0;a<n;a++){let i=xl(r);if(await Dw(this.folder,`${i}.json`,kl({...t,id:i})))return{id:i,idx:r};r++}throw new Error("segment id \u885D\u7A81\u304C "+n+" \u56DE\u9023\u7D9A")}async listSegmentIds(){return(await Hg(this.folder)).filter(o=>o.startsWith("seg-")&&o.endsWith(".json")).map(o=>o.slice(0,-5))}async deleteAll(){let t=await Hg(this.folder);for(let o of t)(o===Sl||o.startsWith("seg-")&&o.endsWith(".json"))&&await _w(`${this.folder}/${o}`).catch(()=>{})}}});function $P(){try{let e=localStorage.getItem("memola:rag:client-id");return e||(e="c-"+Math.random().toString(36).slice(2,10),localStorage.setItem("memola:rag:client-id",e)),e}catch{return"c-anon"}}function Ow(){return zg||(zg=new jg),zg}var ta,Ug,zP,jP,qP,jg,zg,Hw=L(()=>{"use strict";He();Re();ta="memola-rag-sync",Ug="__lease__",zP=3e4,jP=5*6e4,qP=2*6e4;jg=class{constructor(){this.me=$P();this.listReady=!1;this.writer=!1;this.timer=null;this.started=!1;this.visibilityBound=!1}get id(){return this.me}isWriter(){return this.writer}async ensureWriter(){return await this.ensureListReady(),await this.electOrRenew(),this.writer}async start(){this.started||(this.started=!0,await this.ensureListReady(),await this.tick(),this.scheduleNext(),!this.visibilityBound&&typeof document<"u"&&(this.visibilityBound=!0,document.addEventListener("visibilitychange",()=>{document.hidden||this.tick(),this.scheduleNext()})))}stop(){this.started=!1,this.timer!=null&&(window.clearInterval(this.timer),this.timer=null),this.release()}scheduleNext(){if(this.timer!=null&&(window.clearInterval(this.timer),this.timer=null),!this.started)return;let t=typeof document<"u"&&document.hidden?jP:zP;this.timer=window.setInterval(()=>{this.tick()},t)}async ensureListReady(){this.listReady||(await Rt({title:ta,fields:[{name:"holder",kind:2},{name:"expires",kind:4},{name:"last_seen",kind:4}]}),this.listReady=!0)}async tick(){try{await this.heartbeat(),await this.electOrRenew()}catch(t){console.warn("[rag/lease] tick \u5931\u6557:",t.message)}}async readRow(t){let o=G+"/_api/web/lists/getbytitle('"+ta+"')/items?$select=Id,holder,expires&$filter=Title eq '"+t.replace(/'/g,"''")+"'&$top=1",n=await fetch(o,{headers:{Accept:"application/json;odata=verbose"},credentials:"include"});if(!n.ok)return null;let a=(await n.json()).d?.results?.[0];return a?{Id:a.Id,holder:String(a.holder??""),expires:String(a.expires??""),etag:a.__metadata?.etag??"*"}:null}async heartbeat(){let t=new Date().toISOString(),o=await this.readRow(this.me);o?await fr(ta,o.Id,{last_seen:t},"*").catch(()=>{}):await _e(ta,{Title:this.me,last_seen:t}).catch(()=>{})}async electOrRenew(){let t=Date.now(),o=t+qP,n=()=>new Date(o).toISOString(),r=await this.readRow(Ug);if(!r){try{await _e(ta,{Title:Ug,holder:this.me,expires:n()}),this.writer=!0}catch{this.writer=!1}return}let a=r.holder,i=Date.parse(r.expires)||0;if(a===this.me||i<t){let s=await fr(ta,r.Id,{holder:this.me,expires:n()},r.etag);this.writer=s.ok}else this.writer=!1}async release(){if(!(!this.listReady||!this.writer)){try{let t=await this.readRow(Ug);t&&t.holder===this.me&&await fr(ta,t.Id,{expires:new Date().toISOString()},t.etag)}catch{}this.writer=!1}}},zg=null});function Fw(e,t={}){let o=t.maxChars??800,n=Math.max(0,t.overlap??80),r=t.minChars??200,a=(e??"").replace(/\r\n?/g,`
`).trim();if(!a)return[];if(a.length<=o)return[{text:a}];let i=KP(a),s=[];for(let l of i){let c=WP(l.body,o,r);for(let d of c){let p=d;if(n>0&&s.length>0){let u=s[s.length-1].text;p=u.slice(Math.max(0,u.length-n))+`
`+d}s.push({text:p,heading:l.heading})}}return s.length?s:[{text:a}]}function KP(e){let t=e.split(`
`),o=[],n={body:""};for(let r of t){let a=/^(#{1,6})\s+(.+)$/.exec(r);a?(n.body.trim()&&o.push({...n,body:n.body.trim()}),n={heading:a[2].trim(),body:""}):n.body+=(n.body?`
`:"")+r}return n.body.trim()&&o.push({...n,body:n.body.trim()}),o.length?o:[{body:e}]}function WP(e,t,o){let n=e.split(/\n{2,}/).map(i=>i.trim()).filter(Boolean),r=[],a="";for(let i of n){let s=a?a+`

`+i:i;if(s.length<=t){a=s;continue}if(a&&(r.push(a),a=""),i.length<=t)a=i;else for(let l of GP(i,t))a&&(a+`
`+l).length>t&&(r.push(a),a=""),a=a?a+`
`+l:l}return a&&r.push(a),r.length?r:[e]}function GP(e,t){let o=e.split(/(?<=[。!?！？\n])/).map(a=>a.trim()).filter(Boolean),n=[],r="";for(let a of o){if(a.length>t){r&&(n.push(r),r="");for(let i=0;i<a.length;i+=t)n.push(a.slice(i,i+t));continue}(r+a).length>t&&(n.push(r),r=""),r+=a}return r&&n.push(r),n}var Uw=L(()=>{"use strict"});async function jw(e,t){let n=await Ie(e,"Id,Title,Body_blocks,PageType,Trashed,IsTemplate,OriginPageId"),r=[];for(let a of n){let i=String(a.PageType??"");i==="row"||i==="database"||Number(a.Trashed??0)>0||a.IsTemplate||a.OriginPageId||r.push({docKey:`${e}:${a.Id}`,scope:t,title:String(a.Title??"(\u7121\u984C)"),bodyJson:String(a.Body_blocks??"")})}return r}async function VP(e,t,o){let n=[];for(let r=0;r<e.length;r+=zw){let a=e.slice(r,r+zw),i=await _g(a,{inputType:"document",signal:t});for(let s of i)n.push(s);o?.(n.length,e.length)}return n}async function qw(e,t,o,n){let r=[],a=new Set(t.map(d=>d.docKey));for(let d of e.allDocKeys()){if(a.has(d))continue;let u=e.docState(d)?.chunkCount??0;for(let f=0;f<u;f++)r.push({seq:0,op:"delete",key:`${d}#${f}`})}let i=[];for(let d of t){let p=Tw(d.bodyJson||""),u=e.docState(d.docKey),f=u?.chunkCount??0;if(u&&u.docHash===p)continue;let g=Ve(ge(d.bodyJson)).trim();if(!g){for(let b=0;b<f;b++)r.push({seq:0,op:"delete",key:`${d.docKey}#${b}`});continue}let y=Fw(`# ${d.title}

${g}`);i.push({doc:d,chunks:y,hash:p,prevCount:f})}let s=[];for(let d of i)for(let p of d.chunks)s.push(p.text);if(s.length===0)return r;let l=await VP(s,o,n),c=0;for(let d of i){let p=d.chunks.length;for(let u=0;u<p;u++){let f=l[c++];r.push({seq:0,op:"upsert",key:`${d.doc.docKey}#${u}`,docKey:d.doc.docKey,scope:d.doc.scope,title:d.doc.title,chunkIdx:u,chunkCount:p,heading:d.chunks[u].heading,text:d.chunks[u].text,docHash:d.hash,emb:Mw(f)})}for(let u=p;u<d.prevCount;u++)r.push({seq:0,op:"delete",key:`${d.doc.docKey}#${u}`})}return r}var zw,$w=L(()=>{"use strict";Re();K();Tt();Uw();hm();um();Il();zw=64});var Ww={};q(Ww,{ScopeIndex:()=>Pl,orgIndex:()=>Mi,ragHardReset:()=>YP,resetIndexes:()=>Kw,userIndex:()=>Pi});function Mi(){return km||(km=new Pl("org",de,!0)),km}function Pi(){return wm||(wm=new Pl("user",Kt(),!1)),wm}function Kw(){km=null,wm=null}async function YP(){try{await new Ml("org").deleteAll()}catch{}try{await new Ti("org").clearAll()}catch{}try{await new Ti("user").clearAll()}catch{}Kw()}var Pl,km,wm,qg=L(()=>{"use strict";K();Sw();Cw();Nw();Hw();$w();Il();Pl=class{constructor(t,o,n){this.scope=t;this.listTitle=o;this.db=new bm;this.inited=!1;this.cache=new Ti(t==="org"?"org":"user"),this.store=n?new Ml("org"):null}get size(){return this.db.size}stats(){return{docs:this.db.allDocKeys().size,chunks:this.db.size}}async init(){if(this.inited)return;this.inited=!0;let t=await this.cache.allIds().catch(()=>[]),o=new Set;for(let n of t){let r=await this.cache.get(n).catch(()=>null);r&&(this.db.applySegment(r),o.add(n))}this.store&&await this.syncFromSp(o)}async syncFromSp(t){if(!this.store)return;let o=await this.store.readManifest().catch(()=>null);if(!o)return;let n=Lw(o,t),r=await this.cache.getManifest().catch(()=>null);o.open&&this.openChanged(o,r,t)&&n.push(o.open.id);for(let a of n){let i=await this.store.readSegment(a).catch(()=>null);i&&(this.db.applySegment(i),await this.cache.put(a,i).catch(()=>{}))}await this.pruneOrphans(o),await this.cache.setManifest(o).catch(()=>{})}openChanged(t,o,n){return t.open?!n.has(t.open.id)||!o?.open||o.open.id!==t.open.id?!0:o.open.hash!==t.open.hash:!1}async pruneOrphans(t){let o=new Set(t.sealed);t.open&&o.add(t.open.id);for(let n of await this.cache.allIds().catch(()=>[]))o.has(n)||await this.cache.delete(n).catch(()=>{})}async refresh(t,o){await this.init();let n=await jw(this.listTitle,this.scope);if(this.store&&!await Ow().ensureWriter())return{changed:0,skipped:"not-writer",docs:n.length};let r=await qw(this.db,n,t,o);return r.length===0?{changed:0,docs:n.length}:(this.store?await this.persistRemote(r):await this.persistLocal(r),{changed:r.length,docs:n.length})}async persistRemote(t){if(!this.store)return;await this.store.ensure();let o=await this.store.readManifest().catch(()=>null)??yl(),n=o.maxSeq;t.forEach((l,c)=>{l.seq=n+c+1});let r=Rg(o.sealed),a={id:xl(r),generation:o.generation,records:t},i=await this.store.writeSegmentNoOverwrite(a,r),s={...a,id:i.id};await Rw(this.store,l=>({version:l.version+1,generation:l.generation,maxSeq:Math.max(l.maxSeq,n+t.length),sealed:l.sealed.includes(i.id)?l.sealed:[...l.sealed,i.id],open:l.open,updatedAt:Ii()})),this.db.applySegment(s),await this.cache.put(i.id,s).catch(()=>{})}async persistLocal(t){let o=await this.cache.getManifest().catch(()=>null)??yl(),n=o.maxSeq;t.forEach((s,l)=>{s.seq=n+l+1});let r=Rg(o.sealed),a=xl(r),i={id:a,generation:o.generation,records:t};this.db.applySegment(i),await this.cache.put(a,i),o.sealed.push(a),o.maxSeq=n+t.length,o.version+=1,o.updatedAt=Ii(),await this.cache.setManifest(o)}search(t,o,n,r,a=[]){return this.db.search(t,o,n,r,a)}},km=null,wm=null});var Kg={};q(Kg,{corpAiChatRaw:()=>ZP,corpAiChatText:()=>XP,flattenSystem:()=>Tm,parseOAResponseToClaudeShape:()=>Cl,toOAMessages:()=>Ci,toOATools:()=>Im});function $g(e){if(!ii(e))throw new Error("\u672A\u77E5\u306E\u30E2\u30C7\u30EB: "+e);let o=Tf(e);if(!o.baseUrl)throw new Error("Azure OpenAI \u4E92\u63DB API \u30D9\u30FC\u30B9 URL \u304C\u672A\u8A2D\u5B9A\u3067\u3059 (\u8A2D\u5B9A\u3067\u69CB\u6210)");if(!o.deploymentId)throw new Error("Azure OpenAI \u4E92\u63DB API \u30C7\u30D7\u30ED\u30A4\u540D\u304C\u672A\u8A2D\u5B9A\u3067\u3059 (\u8A2D\u5B9A\u3067\u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9\u3092\u69CB\u6210)");return o.baseUrl+"/openai/deployments/"+o.deploymentId+"/chat/completions?api-version="+o.apiVersion}async function XP(e){let t=Ys();if(!t)throw new Error("Azure OpenAI \u4E92\u63DB API \u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o=e.model||zr(),n=ii(o);if(!n)throw new Error("\u672A\u77E5\u306E\u30E2\u30C7\u30EB: "+o);let r={messages:e.messages};if(e.maxTokens&&(n.reasoning?r.max_completion_tokens=e.maxTokens:r.max_tokens=e.maxTokens),e.stream?.onText)return r.stream=!0,JP($g(o),t,r,e.stream.onText,e.signal);let a=await fetch($g(o),{method:"POST",headers:{"Content-Type":"application/json","api-key":t},body:JSON.stringify(r),signal:e.signal});if(!a.ok){let s=await a.text().catch(()=>"");throw new Error(Em(a.status,s))}return(await a.json()).choices?.[0]?.message?.content||""}async function JP(e,t,o,n,r){let a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json","api-key":t,Accept:"text/event-stream"},body:JSON.stringify(o),signal:r});if(!a.ok){let d=await a.text().catch(()=>"");throw new Error(Em(a.status,d))}if(!a.body)throw new Error("\u30B9\u30C8\u30EA\u30FC\u30DF\u30F3\u30B0\u5FDC\u7B54\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");let i=a.body.getReader(),s=new TextDecoder,l="",c="";for(;;){let{value:d,done:p}=await i.read();if(p)break;l+=s.decode(d,{stream:!0});let u;for(;(u=l.indexOf(`

`))!==-1;){let f=l.slice(0,u);l=l.slice(u+2);for(let g of f.split(`
`)){let y=g.match(/^data:\s*(.*)$/);if(!y)continue;let b=y[1].trim();if(!(!b||b==="[DONE]"))try{let v=JSON.parse(b).choices?.[0]?.delta?.content;v&&(c+=v,n(v))}catch{}}}}return c}function Em(e,t){let o=t?" \u2014 "+t.slice(0,240):"";return e===401?"Azure OpenAI \u4E92\u63DB API \u5931\u6557: 401 API \u30AD\u30FC\u304C\u7121\u52B9/\u672A\u6307\u5B9A"+o:e===403?"Azure OpenAI \u4E92\u63DB API \u5931\u6557: 403 \u63A5\u7D9A\u5143 IP \u304C\u8A31\u53EF\u3055\u308C\u3066\u3044\u307E\u305B\u3093"+o:e===429?"Azure OpenAI \u4E92\u63DB API \u5931\u6557: 429 \u30EC\u30FC\u30C8\u4E0A\u9650\u8D85\u904E (1\u5206\u5F8C\u306B\u518D\u8A66\u884C)"+o:e===400?"Azure OpenAI \u4E92\u63DB API \u5931\u6557: 400 \u30EA\u30AF\u30A8\u30B9\u30C8\u4E0D\u6B63 (\u30E2\u30C7\u30EB/JSON \u3092\u78BA\u8A8D)"+o:"Azure OpenAI \u4E92\u63DB API \u5931\u6557: "+e+o}function Ci(e){let t=[];for(let o of e){if(typeof o.content=="string"){t.push({role:o.role,content:o.content});continue}let n=o.content;if(o.role==="assistant"){let r=n.filter(s=>s.type==="text").map(s=>s.text).join(""),a=n.filter(s=>s.type==="tool_use"),i=a.length>0?a.map(s=>({id:s.id,type:"function",function:{name:s.name,arguments:JSON.stringify(s.input||{})}})):void 0;t.push({role:"assistant",content:r||(i?null:""),...i?{tool_calls:i}:{}})}else{let r=n.filter(i=>i.type==="tool_result"),a=n.filter(i=>i.type==="text").map(i=>i.text).join("");a&&t.push({role:"user",content:a});for(let i of r)t.push({role:"tool",tool_call_id:i.tool_use_id,content:i.content})}}return t}function Im(e){return e.map(t=>({type:"function",function:{name:t.name,description:t.description,parameters:t.input_schema}}))}function Tm(e){return e?typeof e=="string"?e:e.map(t=>t.text).join(`

`):""}async function ZP(e){let t=Ys();if(!t)throw new Error("Azure OpenAI \u4E92\u63DB API \u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o=e.model||zr(),n=ii(o);if(!n)throw new Error("\u672A\u77E5\u306E\u30E2\u30C7\u30EB: "+o);let r=Tm(e.system),i={messages:r?[{role:"system",content:r},...Ci(e.messages)]:Ci(e.messages)};e.tools&&e.tools.length>0&&(i.tools=Im(e.tools),i.tool_choice="auto"),e.maxTokens&&(n.reasoning?i.max_completion_tokens=e.maxTokens:i.max_tokens=e.maxTokens),e.stream&&(i.stream=!0);let s=$g(o);if(e.stream)return QP(s,t,i,e.stream,e.signal);let l=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json","api-key":t},body:JSON.stringify(i),signal:e.signal});if(!l.ok)throw new Error(Em(l.status,await l.text().catch(()=>"")));let d=(await l.json()).choices?.[0];return Cl(d?.message,d?.finish_reason)}function Cl(e,t){let o=[],n=e?.content||"";if(n&&o.push({type:"text",text:n}),e?.tool_calls)for(let a of e.tool_calls){let i={};try{i=JSON.parse(a.function.arguments||"{}")}catch{}o.push({type:"tool_use",id:a.id,name:a.function.name,input:i})}let r="end_turn";return t==="tool_calls"?r="tool_use":t==="length"?r="max_tokens":t==="stop"&&(r="end_turn"),{content:o,stop_reason:r}}async function QP(e,t,o,n,r){let a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json","api-key":t,Accept:"text/event-stream"},body:JSON.stringify(o),signal:r});if(!a.ok)throw new Error(Em(a.status,await a.text().catch(()=>"")));if(!a.body)throw new Error("\u30B9\u30C8\u30EA\u30FC\u30DF\u30F3\u30B0\u5FDC\u7B54\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");let i=a.body.getReader(),s=new TextDecoder,l="",c="",d,p=new Map;for(;;){let{value:g,done:y}=await i.read();if(y)break;l+=s.decode(g,{stream:!0});let b;for(;(b=l.indexOf(`

`))!==-1;){let h=l.slice(0,b);l=l.slice(b+2);for(let v of h.split(`
`)){let k=v.match(/^data:\s*(.*)$/);if(!k)continue;let x=k[1].trim();if(!(!x||x==="[DONE]"))try{let I=JSON.parse(x).choices?.[0];if(!I)continue;let B=I.delta?.content;if(B&&(c+=B,n.onText?.(B)),I.delta?.tool_calls)for(let F of I.delta.tool_calls){let P=p.get(F.index)||{id:"",name:"",args:""};F.id&&(P.id=F.id),F.function?.name&&(P.name=F.function.name),F.function?.arguments&&(P.args+=F.function.arguments),p.set(F.index,P)}I.finish_reason&&(d=I.finish_reason)}catch{}}}}let u=[];c&&u.push({type:"text",text:c});for(let g of p.values()){let y={};try{y=JSON.parse(g.args||"{}")}catch{}u.push({type:"tool_use",id:g.id,name:g.name,input:y}),n.onToolUse?.({type:"tool_use",id:g.id,name:g.name,input:y})}let f="end_turn";return d==="tool_calls"||p.size>0?f="tool_use":d==="length"&&(f="max_tokens"),{content:u,stop_reason:f}}var Lm=L(()=>{"use strict";At()});var Wg={};q(Wg,{localAiChatRaw:()=>oC,localAiChatText:()=>eC});function Sm(){let e=Id();if(!e)throw new Error("\u30ED\u30FC\u30AB\u30EB AI \u30D9\u30FC\u30B9 URL \u304C\u672A\u8A2D\u5B9A\u3067\u3059 (\u4F8B: http://localhost:11434/v1)");return e+"/chat/completions"}function Mm(){let e={"Content-Type":"application/json"},t=Td();return t&&(e.Authorization="Bearer "+t),e}function Pm(e,t){let o=t?" \u2014 "+t.slice(0,240):"";return e===0?"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: \u30B5\u30FC\u30D0\u306B\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093 (URL \u3068\u30B5\u30FC\u30D0\u8D77\u52D5\u3092\u78BA\u8A8D)":e===401?"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: 401 \u8A8D\u8A3C\u30A8\u30E9\u30FC (API \u30AD\u30FC\u78BA\u8A8D)"+o:e===404?"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: 404 \u30A8\u30F3\u30C9\u30DD\u30A4\u30F3\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093 (URL \u672B\u5C3E\u306E /v1 \u3092\u78BA\u8A8D)"+o:e===400?"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: 400 \u30EA\u30AF\u30A8\u30B9\u30C8\u4E0D\u6B63 (\u30E2\u30C7\u30EB\u540D / JSON \u78BA\u8A8D)"+o:"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: "+e+o}async function eC(e){let t=e.model||jr();if(!t)throw new Error("\u30ED\u30FC\u30AB\u30EB AI \u306E\u30E2\u30C7\u30EB\u540D\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o={model:t,messages:e.messages};if(e.maxTokens&&(Ld(t)?o.max_completion_tokens=e.maxTokens:o.max_tokens=e.maxTokens),e.stream?.onText)return o.stream=!0,tC(o,e.stream.onText,e.signal);let n=await Cm(Sm(),{method:"POST",headers:Mm(),body:JSON.stringify(o),signal:e.signal});if(!n.ok)throw new Error(Pm(n.status,await n.text().catch(()=>"")));return(await n.json()).choices?.[0]?.message?.content||""}async function tC(e,t,o){let n=await Cm(Sm(),{method:"POST",headers:{...Mm(),Accept:"text/event-stream"},body:JSON.stringify(e),signal:o});if(!n.ok)throw new Error(Pm(n.status,await n.text().catch(()=>"")));if(!n.body)throw new Error("\u30B9\u30C8\u30EA\u30FC\u30DF\u30F3\u30B0\u5FDC\u7B54\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");let r=n.body.getReader(),a=new TextDecoder,i="",s="";for(;;){let{value:l,done:c}=await r.read();if(c)break;i+=a.decode(l,{stream:!0});let d;for(;(d=i.indexOf(`

`))!==-1;){let p=i.slice(0,d);i=i.slice(d+2);for(let u of p.split(`
`)){let f=u.match(/^data:\s*(.*)$/);if(!f)continue;let g=f[1].trim();if(!(!g||g==="[DONE]"))try{let b=JSON.parse(g).choices?.[0]?.delta?.content;b&&(s+=b,t(b))}catch{}}}}return s}async function oC(e){let t=e.model||jr();if(!t)throw new Error("\u30ED\u30FC\u30AB\u30EB AI \u306E\u30E2\u30C7\u30EB\u540D\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o=Tm(e.system),n=o?[{role:"system",content:o},...Ci(e.messages)]:Ci(e.messages),r={model:t,messages:n};if(e.tools&&e.tools.length>0&&(r.tools=Im(e.tools),r.tool_choice="auto"),e.maxTokens&&(Ld(t)?r.max_completion_tokens=e.maxTokens:r.max_tokens=e.maxTokens),e.stream&&(r.stream=!0),e.stream)return nC(r,e.stream,e.signal);let a=await Cm(Sm(),{method:"POST",headers:Mm(),body:JSON.stringify(r),signal:e.signal});if(!a.ok)throw new Error(Pm(a.status,await a.text().catch(()=>"")));let s=(await a.json()).choices?.[0];return Cl(s?.message,s?.finish_reason)}async function nC(e,t,o){let n=await Cm(Sm(),{method:"POST",headers:{...Mm(),Accept:"text/event-stream"},body:JSON.stringify(e),signal:o});if(!n.ok)throw new Error(Pm(n.status,await n.text().catch(()=>"")));if(!n.body)throw new Error("\u30B9\u30C8\u30EA\u30FC\u30DF\u30F3\u30B0\u5FDC\u7B54\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");let r=n.body.getReader(),a=new TextDecoder,i="",s="",l,c=new Map;for(;;){let{value:p,done:u}=await r.read();if(u)break;i+=a.decode(p,{stream:!0});let f;for(;(f=i.indexOf(`

`))!==-1;){let g=i.slice(0,f);i=i.slice(f+2);for(let y of g.split(`
`)){let b=y.match(/^data:\s*(.*)$/);if(!b)continue;let h=b[1].trim();if(!(!h||h==="[DONE]"))try{let k=JSON.parse(h).choices?.[0],x=k?.delta?.content;x&&(s+=x,t.onText?.(x));let T=k?.delta?.tool_calls;if(T)for(let I of T){let B=c.get(I.index)||{id:"",name:"",args:""};I.id&&(B.id=I.id),I.function?.name&&(B.name=I.function.name),I.function?.arguments&&(B.args+=I.function.arguments),c.set(I.index,B)}k?.finish_reason&&(l=k.finish_reason)}catch{}}}}let d={role:"assistant",content:s||null};if(c.size>0&&(d.tool_calls=Array.from(c.entries()).sort(([p],[u])=>p-u).map(([,p])=>({id:p.id,type:"function",function:{name:p.name,arguments:p.args}}))),d.tool_calls&&d.tool_calls.length>0&&t.onToolUse)for(let p of d.tool_calls){let u={};try{u=JSON.parse(p.function.arguments||"{}")}catch{}t.onToolUse({type:"tool_use",id:p.id,name:p.function.name,input:u})}return Cl(d,l)}async function Cm(e,t){try{return await fetch(e,t)}catch(o){let n=o.message||"network error";return new Response(n,{status:0,statusText:n})}}var Gg=L(()=>{"use strict";At();Lm()});var Am={};q(Am,{dispatchChat:()=>rC,textOf:()=>aC});async function rC(e){let t=Vs();if(t==="corp"){let{corpAiChatRaw:n}=await Promise.resolve().then(()=>(Lm(),Kg));return n({...e,model:zr()})}if(t==="local"){let{localAiChatRaw:n}=await Promise.resolve().then(()=>(Gg(),Wg));return n({...e,model:jr()})}let{callClaudeRaw:o}=await Promise.resolve().then(()=>(si(),Cf));return o({...e,model:Ed()})}function aC(e){return e.content.filter(t=>t.type==="text").map(t=>t.text).join("")}var Bm=L(()=>{"use strict";At()});function sC(e){let t=e.match(/\{[\s\S]*\}/);if(!t)return null;try{let o=JSON.parse(t[0]),n=typeof o.vectorQuery=="string"?o.vectorQuery.trim():"",r=Array.isArray(o.keywords)?o.keywords.filter(i=>typeof i=="string"&&i.trim().length>=2).map(i=>i.trim()).slice(0,4):[],a=o.mode==="keyword"||o.mode==="mixed"||o.mode==="semantic"?o.mode:r.length>0?"mixed":"semantic";return!n&&r.length===0?null:{vectorQuery:n||r.join(" "),keywords:r,mode:a}}catch{return null}}function lC(e){return!e||e.length===0?"":e.slice(-4).map(t=>{let o=t.role==="user"?"\u30E6\u30FC\u30B6":"\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8",n=t.role==="assistant"?300:500,r=t.content.length>n?t.content.slice(0,n)+"\u2026":t.content;return`${o}: ${r}`}).join(`
`)}async function cC(e,t,o){let{dispatchChat:n,textOf:r}=await Promise.resolve().then(()=>(Bm(),Am)),a=await n({messages:[{role:"user",content:t}],system:e,tools:[],signal:o});return r(a)}async function Gw(e,t,o){let n=e.trim();if(!n)return Vg(n);let r=lC(t),a=r?`\u76F4\u524D\u306E\u4F1A\u8A71 (\u53E4\u3044\u9806):
${r}

---

\u4ECA\u56DE\u306E\u8CEA\u554F:
${n}`:`\u8CEA\u554F:
${n}`;try{let i=await cC(iC,a,o);return sC(i)??Vg(n)}catch{return Vg(n)}}var iC,Vg,Vw=L(()=>{"use strict";iC=["\u3042\u306A\u305F\u306F\u793E\u5185\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8 RAG \u691C\u7D22\u306E\u30AF\u30A8\u30EA\u30EB\u30FC\u30BF\u3067\u3059\u3002\u30E6\u30FC\u30B6\u306E\u8CEA\u554F\u3092\u89E3\u6790\u3057\u3001","\u6B21\u306E JSON \u3092 1 \u884C\u3067\u8FD4\u3057\u3066\u304F\u3060\u3055\u3044 (\u305D\u308C\u4EE5\u5916\u306E\u51FA\u529B\u306F\u7981\u6B62):","",'{"mode":"keyword|semantic|mixed","vectorQuery":"<\u610F\u5473\u691C\u7D22\u7528\u306E\u30AF\u30A8\u30EA>","keywords":["<\u5FC5\u9808\u5B8C\u5168\u4E00\u81F4>", ...]}',"","\u30EB\u30FC\u30EB:","- keywords \u306B\u306F\u300C\u30C1\u30B1\u30C3\u30C8ID / \u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u30B3\u30FC\u30C9 / \u88FD\u54C1\u540D / \u56FA\u6709\u540D\u8A5E / \u578B\u756A / \u65E5\u4ED8\u6307\u5B9A\u300D\u7B49\u306E","  \u5FC5\u305A\u542B\u307E\u308C\u308B\u3079\u304D\u6587\u5B57\u5217\u3060\u3051\u3092\u5165\u308C\u308B (2 \u6587\u5B57\u4EE5\u4E0A\u3001\u6700\u5927 4 \u500B\u307E\u3067)\u3002",'- \u6570\u5B57\u5358\u4F53 (\u4F8B: "2026" "100") \u3084\u3088\u304F\u3042\u308B\u5358\u8A9E (\u4F8B: "\u30E1\u30E2" "\u4EF6" "\u306B\u3064\u3044\u3066" "\u3068\u306F") \u306F keywords \u306B\u5165\u308C\u306A\u3044\u3002',"- vectorQuery \u306B\u306F\u8CEA\u554F\u306E\u300C\u610F\u5473\u7684\u306A\u4E3B\u984C\u300D\u3092 1 \u6587\u3067\u8868\u3059\u3002\u5143\u306E\u6587\u304C\u305D\u306E\u307E\u307E\u4F7F\u3048\u308B\u306A\u3089\u305D\u308C\u3067\u3088\u3044\u3002","  ID/\u56FA\u6709\u540D\u8A5E\u306F keywords \u5074\u306B\u51FA\u3059\u306E\u3067 vectorQuery \u306B\u306F\u542B\u3081\u306A\u304F\u3066\u3082\u3088\u3044\u3002",'- \u7D14\u7C8B\u306B ID/\u30B3\u30FC\u30C9/\u56FA\u6709\u540D\u8A5E\u3060\u3051\u3067\u63A2\u3059\u8CEA\u554F \u2192 mode="keyword"\u3002\u610F\u5473\u3067\u63A2\u3059 \u2192 "semantic"\u3002\u4E21\u65B9\u6DF7\u5728 \u2192 "mixed"\u3002',"","\u2605 \u30D5\u30A9\u30ED\u30FC\u30A2\u30C3\u30D7\u8CEA\u554F (\u76F4\u524D\u4F1A\u8A71\u3092\u8E0F\u307E\u3048\u305F\u7701\u7565\u8868\u73FE) \u306E\u89E3\u6C7A \u2605","- \u300C\u76F4\u524D\u306E\u4F1A\u8A71\u300D\u304C\u4E0E\u3048\u3089\u308C\u305F\u5834\u5408\u3001\u8CEA\u554F\u306B\u542B\u307E\u308C\u308B\u6307\u793A\u8A9E (\u305D\u308C/\u3042\u308C/\u3053\u306E/\u4E0A\u8A18 \u7B49) \u3084\u3001","  \u300C\u8981\u7D04\u3057\u3066\u300D\u300C\u3082\u3063\u3068\u8A73\u3057\u304F\u300D\u300C\u7D9A\u304D\u306F?\u300D\u306E\u3088\u3046\u306A\u524D\u63D0\u304C\u7701\u7565\u3055\u308C\u305F\u8CEA\u554F\u306F\u3001","  \u76F4\u524D\u4F1A\u8A71\u304B\u3089\u4E3B\u984C\u3092\u88DC\u3063\u3066 vectorQuery \u3092\u7D44\u307F\u7ACB\u3066\u308B\u3053\u3068\u3002",'  \u4F8B: \u76F4\u524D user="BERT \u3068\u306F?" / \u4ECA\u56DE user="\u305D\u306E\u6B20\u70B9\u306F?"','      \u2192 vectorQuery="BERT \u306E\u6B20\u70B9", keywords=["BERT"]',"- \u76F4\u524D\u4F1A\u8A71\u3068\u7121\u95A2\u4FC2\u306A\u65B0\u898F\u8CEA\u554F\u306E\u5834\u5408\u306F\u3001\u5C65\u6B74\u3092\u7121\u8996\u3057\u3066\u305D\u306E\u8CEA\u554F\u3060\u3051\u3092\u89E3\u6790\u3059\u308B\u3002","","- \u51FA\u529B\u306F\u53B3\u5BC6\u306B\u6709\u52B9\u306A JSON\u3002\u524D\u5F8C\u306B\u8AAC\u660E\u6587\u3084 ``` \u7B49\u306E\u88C5\u98FE\u306F\u4ED8\u3051\u306A\u3044\u3002"].join(`
`),Vg=e=>({vectorQuery:e,keywords:[],mode:"semantic"})});function Xw(e){let t=(e||"").toLowerCase().replace(/\s+/g," ").trim(),o=new Set;for(let n=0;n<t.length-1;n++)o.add(t.slice(n,n+2));return o}function dC(e,t){if(e.size===0)return 0;let o=0;for(let n of e)t.has(n)&&o++;return o/e.size}function Zw(){let e=xa.get().trim().replace(/^\/+|\/+$/g,"");return e?Ko.replace(/\/+$/,"")+"/"+e:null}async function Qw(e=!1){let t=Zw();if(!t)return er=new Map,Dm=null,0;if(!e&&Dm===t)return er.size;let o=await Si(t+"/manifest.json").catch(()=>null);if(!o)return er=new Map,Dm=t,0;let n;try{n=JSON.parse(o)}catch{return 0}let r=[...n.sealed||[]];n.open?.id&&r.push(n.open.id);let a=[];for(let l of r){let c=await Si(t+"/"+l+".json").catch(()=>null);if(c)try{let d=JSON.parse(c);Array.isArray(d.records)&&a.push(...d.records)}catch{}}a.sort((l,c)=>l.seq-c.seq);let i=new Map,s=new Map;for(let l of a){if(!l.messageId)continue;let c=l.messageId+"#"+(l.chunkIdx??0);if(!((s.get(c)??0)>=l.seq)){if(s.set(c,l.seq),l.op==="delete"){i.delete(c);continue}l.emb&&i.set(c,{key:c,messageId:l.messageId,kind:l.kind||"mail",subject:l.subject||"",from:l.from||"",date:l.date||"",body:l.body||"",internetMessageId:l.internetMessageId,docPath:l.docPath,pptxFile:l.pptxFile,pptxServerRelUrl:l.pptxServerRelUrl,slideNo:l.slideNo,slideTitle:l.slideTitle,vec:Li(gm(l.emb))})}}return er=i,Dm=t,i.size}function e0(){let e={mail:0,onenote:0,doc:0,pptx:0,transcript:0};for(let t of er.values())e[t.kind]=(e[t.kind]||0)+1;return{total:er.size,byKind:e,enabled:!!Zw()}}function t0(e,t,o,n="",r=0){if(Yw=0,er.size===0||o.size===0)return[];let a=Li(e),i=a.length,l=r>0&&n.trim().length>0?Xw(n):null,c=Math.min(1,Math.max(0,r)),d=[];for(let p of er.values()){if(!o.has(p.kind))continue;if(p.vec.length!==i){Yw++;continue}let u=0;for(let y=0;y<i;y++)u+=a[y]*p.vec[y];let f=Math.max(0,u),g=l?(1-c)*f+c*dC(l,Xw(`${p.subject} ${p.body}`)):f;d.push({doc:p,score:g})}return d.sort((p,u)=>u.score-p.score),d.slice(0,t)}var Jw,er,Dm,Yw,o0=L(()=>{"use strict";hm();Fg();He();ve();Jw=["mail","onenote","doc","pptx","transcript"],er=new Map,Dm=null,Yw=0});function mC(){let e=ka.get().split(",").map(o=>o.trim()).filter(Boolean);return new Set(e.filter(o=>Jw.includes(o)))}async function Xg(){await Promise.all([Mi().init(),Pi().init(),Qw().catch(()=>0)])}function _m(){let e=e0();return{org:Mi().stats(),user:Pi().stats(),extvec:{docs:e.total,enabled:e.enabled}}}async function n0(e,t){let o=[],n=await Mi().refresh(e,(s,l)=>t?.({scope:"org",done:s,total:l})).catch(s=>{let l=s.message;return console.warn("[rag] org refresh:",l),o.push("\u7D44\u7E54: "+l),{changed:0,skipped:void 0,docs:0}}),r=await Pi().refresh(e,(s,l)=>t?.({scope:"user",done:s,total:l})).catch(s=>{let l=s.message;return console.warn("[rag] user refresh:",l),o.push("\u500B\u4EBA: "+l),{changed:0,docs:0}}),a=n.docs??0,i=r.docs??0;return{org:n.changed,user:r.changed,orgSkipped:n.skipped==="not-writer",docsSeen:a+i,orgDocs:a,userDocs:i,errors:o}}async function r0(e,t={}){if(!e.trim())return[];if(!vl())throw new Error("RAG \u672A\u8A2D\u5B9A: AI \u8A2D\u5B9A\u3067 OpenAI \u4E92\u63DB / \u30ED\u30FC\u30AB\u30EB AI \u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044");await Xg();let o=t.topK??Lf(),n=t.minScore??Sf(),r=await Gw(e,t.history,t.signal),a=r.vectorQuery||e,i=await Iw(a,t.signal),l=[...Mi().search(i,o*2,a,Yg,r.keywords),...Pi().search(i,o*2,a,Yg,r.keywords)].map(d=>({docKey:d.record.docKey,appPageId:vs(d.record.docKey),scope:d.record.scope,title:d.record.title,heading:d.record.heading,snippet:d.record.text.slice(0,280),chunkIdx:d.record.chunkIdx,score:d.score})),c=mC();if(c.size)for(let d of t0(i,o*2,c,a,Yg)){let p=d.doc,u=p.subject||p.pptxFile||p.slideTitle||p.docPath||"(\u7121\u984C)";l.push({docKey:"extvec:"+p.messageId,appPageId:"",scope:"extvec",title:u,heading:p.kind==="pptx"&&p.slideNo?`\u30B9\u30E9\u30A4\u30C9 ${p.slideNo}`:void 0,snippet:(p.body||"").slice(0,280),chunkIdx:0,score:d.score,kind:p.kind,from:p.from,date:p.date,imid:p.internetMessageId,body:p.body})}return l.sort((d,p)=>p.score-d.score),l.filter(d=>d.score>=n).slice(0,o)}var Yg,a0=L(()=>{"use strict";K();At();um();qg();Vw();o0();ve();Yg=.25});var Uo={};q(Uo,{activateTab:()=>Om,attachTabs:()=>Jg,closeTab:()=>s0,newSearchTab:()=>gC,newTab:()=>Nm,openInActiveTab:()=>uC,openPageInNewTab:()=>fC,openSearchSessionInActiveTab:()=>hC,renderTabs:()=>Fo,restoreTabs:()=>vC,updateActiveSearchTitle:()=>bC});function Ai(){return"t"+Date.now().toString(36)+(pC++).toString(36)}function Rm(){return m.tabs.find(e=>e.tabId===m.activeTabId)}function Bi(e){if(!e)return;let t=bn.indexOf(e);t>=0&&bn.splice(t,1),bn.push(e)}function i0(e){if(e.kind==="search")return e.title||"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8";if(e.pageId){let t=A(e.pageId);if(t)return t.title||"\u7121\u984C"}return e.title||"\u65B0\u898F\u30BF\u30D6"}function tr(){let e=Ji.get();e[G]={tabs:m.tabs,active:m.activeTabId},Ji.set(e)}function uC(e,t){let o=Rm();!o||o.kind==="search"?(o={tabId:Ai(),kind:"page",pageId:e,title:t},m.tabs.push(o),m.activeTabId=o.tabId,Bi(o.tabId)):(o.kind="page",o.pageId=e,o.searchId=void 0,o.title=t),Fo(),tr()}async function fC(e){let t={tabId:Ai(),kind:"page",pageId:void 0,title:""};m.tabs.push(t),m.activeTabId=t.tabId,Bi(t.tabId);let{doSelect:o}=await Promise.resolve().then(()=>(W(),ce));await o(e)}function Nm(){let e={tabId:Ai(),kind:"page",pageId:void 0,title:"\u65B0\u898F\u30BF\u30D6"};m.tabs.push(e),m.activeTabId=e.tabId,Bi(e.tabId),Fo(),tr(),Promise.resolve().then(()=>(W(),ce)).then(t=>t.showView("empty"))}async function Om(e){let t=m.tabs.find(n=>n.tabId===e);if(!t)return;m.activeTabId=e,Bi(e),Fo(),tr();let o=await Promise.resolve().then(()=>(Di(),Al));if(t.kind==="search"){o.showSearchTab(t.searchId||o.newSearchId());return}if(o.hideSearchTab(),t.pageId){let{doSelect:n}=await Promise.resolve().then(()=>(W(),ce));await n(t.pageId)}else Promise.resolve().then(()=>(W(),ce)).then(n=>n.showView("empty"))}async function gC(){let e=await Promise.resolve().then(()=>(Di(),Al)),t=e.newSearchId(),o={tabId:Ai(),kind:"search",searchId:t,title:"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8"};m.tabs.push(o),m.activeTabId=o.tabId,Bi(o.tabId),Fo(),tr(),e.showSearchTab(t)}async function hC(e){let t=Rm(),o=await Promise.resolve().then(()=>(Di(),Al));t&&t.kind==="search"&&(t.searchId=e,t.title=o.searchSessionTitle(e)),Fo(),tr(),o.showSearchTab(e)}function bC(e){let t=Rm();t&&t.kind==="search"&&(t.title=e||"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8",Fo(),tr())}async function s0(e){let t=m.tabs.findIndex(a=>a.tabId===e);if(t<0)return;let o=m.tabs[t].tabId===m.activeTabId;m.tabs.splice(t,1);let n=bn.indexOf(e);if(n>=0&&bn.splice(n,1),!o){Fo(),tr();return}let r=null;for(let a=bn.length-1;a>=0;a--)if(m.tabs.some(i=>i.tabId===bn[a])){r=bn[a];break}!r&&m.tabs.length&&(r=m.tabs[m.tabs.length-1].tabId),m.activeTabId=r,r?await Om(r):Nm()}function Fo(){let e=document.getElementById("memola-tabstrip");if(!e)return;e.textContent="";for(let o of m.tabs){let n=document.createElement("div");n.className="memola-tab"+(o.tabId===m.activeTabId?" on":""),n.dataset.tabId=o.tabId,n.draggable=!0,n.title=i0(o);let r=document.createElement("span");if(r.className="memola-tab-ic",o.kind==="search")r.innerHTML=$.chat;else{let s=o.pageId?A(o.pageId):null;r.textContent=s?.icon||(s?.type==="database"?"\u{1F5C2}":"\u{1F4C4}")}let a=document.createElement("span");a.className="memola-tab-lbl",a.textContent=i0(o);let i=document.createElement("button");i.className="memola-tab-x",i.textContent="\xD7",i.title="\u9589\u3058\u308B",i.dataset.close=o.tabId,n.append(r,a,i),e.appendChild(n)}let t=document.createElement("button");t.className="memola-tab-newbtn",t.dataset.new="1",t.title="\u65B0\u3057\u3044\u30BF\u30D6",t.innerHTML=$.plus,e.appendChild(t)}async function vC(e){let t=Ji.get()[G],n=(t?.tabs||[]).filter(r=>r&&(r.kind==="page"&&r.pageId&&A(r.pageId)||r.kind==="search"&&r.searchId));if(n.length){m.tabs=n.map(i=>i.kind==="search"?{tabId:i.tabId||Ai(),kind:"search",searchId:i.searchId,title:i.title||"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8"}:{tabId:i.tabId||Ai(),kind:"page",pageId:i.pageId,title:i.title||""});let r=m.tabs.some(i=>i.tabId===t?.active);m.activeTabId=r?t.active:m.tabs[0].tabId,bn=m.tabs.map(i=>i.tabId),Bi(m.activeTabId),Fo();let a=Rm();a&&await Om(a.tabId);return}if(m.tabs=[],m.activeTabId=null,e){let{doSelect:r}=await Promise.resolve().then(()=>(W(),ce));await r(e)}else Nm()}function Jg(){let e=document.getElementById("memola-tabstrip");e?.addEventListener("click",o=>{let n=o.target;if(n.closest("[data-new]")){Nm();return}let r=n.dataset.close;if(r){o.stopPropagation(),s0(r);return}let a=n.closest(".memola-tab");a?.dataset.tabId&&Om(a.dataset.tabId)});let t=null;e?.addEventListener("dragstart",o=>{let n=o.target.closest(".memola-tab");n?.dataset.tabId&&(t=n.dataset.tabId,o.dataTransfer?.setData("text/plain",t),o.dataTransfer&&(o.dataTransfer.effectAllowed="move"),n.classList.add("dragging"))}),e?.addEventListener("dragover",o=>{t&&(o.preventDefault(),o.dataTransfer&&(o.dataTransfer.dropEffect="move"))}),e?.addEventListener("drop",o=>{if(!t)return;o.preventDefault();let n=m.tabs.findIndex(s=>s.tabId===t);if(n<0){t=null;return}let r=o.target.closest(".memola-tab"),a;if(r?.dataset.tabId&&r.dataset.tabId!==t){a=m.tabs.findIndex(l=>l.tabId===r.dataset.tabId);let s=r.getBoundingClientRect();o.clientX>s.left+s.width/2&&a++}else a=m.tabs.length;let[i]=m.tabs.splice(n,1);n<a&&a--,m.tabs.splice(Math.max(0,Math.min(a,m.tabs.length)),0,i),t=null,Fo(),tr()}),e?.addEventListener("dragend",()=>{t=null,e.querySelectorAll(".memola-tab.dragging").forEach(o=>o.classList.remove("dragging"))})}var pC,bn,fo=L(()=>{"use strict";j();ye();ve();He();ns();pC=0;bn=[]});var Al={};q(Al,{attachXChat:()=>eh,closeXChat:()=>Qg,hideSearchTab:()=>IC,isXChatOpen:()=>Um,newSearchId:()=>kC,openXChat:()=>f0,searchSessionTitle:()=>wC,showSearchTab:()=>EC,toggleXChat:()=>xC});function m0(e){if(e.scope==="org")return"\u7D44\u7E54";if(e.scope==="user")return"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8";switch(e.kind){case"mail":return"\u30E1\u30FC\u30EB";case"onenote":return"OneNote";case"pptx":return"PPTX";case"transcript":return"\u6587\u5B57\u8D77\u3053\u3057";case"doc":return"\u6587\u66F8";default:return"外部ベクトル"}}function zm(){if(!l0){l0=!0;try{let e=lc.get(),t=e?JSON.parse(e):[];jo=Array.isArray(t)?t:[]}catch{jo=[]}}}function p0(){try{lc.set(JSON.stringify(jo.slice(0,yC)))}catch{}}function Zg(){return"x-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function Bl(){return jo.find(e=>e.id===zo)??null}function u0(){zo=Zg(),Dl(),Ni(),Fm(),_l()}function Se(e){return document.getElementById(e)}function _l(){Se("memola-xchat-input")?.focus()}function Um(){return Se("memola-xchat")?.classList.contains("on")??!1}function f0(){zm();let e=Se("memola-xchat");e&&(oa(),e.classList.add("on"),e.setAttribute("aria-hidden","false"),cc.set("1"),zo?(Dl(),Ni()):u0(),_l(),jm(),window.addEventListener("resize",oa))}function Qg(){let e=Se("memola-xchat");e&&(e.classList.remove("on"),e.setAttribute("aria-hidden","true"),cc.set(""),window.removeEventListener("resize",oa))}function xC(){Um()?Qg():f0()}function oa(){let e=Se("memola-xchat");if(!e)return;let t=Se("memola-content-row");if(t){let o=t.getBoundingClientRect();e.style.top=o.top+"px",e.style.left=o.left+"px",e.style.right="0",e.style.bottom="0"}else{let o=Se("memola-sb");e.style.left=Math.max(0,o?o.getBoundingClientRect().right:280)+"px"}}function kC(){return Zg()}function wC(e){zm();let t=jo.find(o=>o.id===e);return t&&t.turns.length&&t.title||"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8"}function EC(e){zm();let t=Se("memola-xchat");t&&(zo=e,t.classList.add("on"),t.setAttribute("aria-hidden","false"),oa(),Dl(),Ni(),_l(),jm(),window.removeEventListener("resize",oa),window.addEventListener("resize",oa))}function IC(){let e=Se("memola-xchat");e&&(e.classList.remove("on"),e.setAttribute("aria-hidden","true"),window.removeEventListener("resize",oa))}function go(e){let t=Se("memola-xchat-idx");t&&(t.textContent=e)}function TC(e=""){let{org:t,user:o,extvec:n}=_m(),r=t.chunks+o.chunks;if(r===0&&!n.docs&&!e){go("\u672A\u30D9\u30AF\u30C8\u30EB\u5316 \u2014 \u300C\u6587\u66F8\u3092\u8AAD\u307F\u8FBC\u307F\u300D\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044");return}let a=`${e}\u30D9\u30AF\u30C8\u30EB\u5316\u6E08: \u7D44\u7E54 ${t.docs}\u6587\u66F8 / \u500B\u4EBA ${o.docs}\u6587\u66F8 \u30FB\u8A08 ${r} \u30C1\u30E3\u30F3\u30AF`;n.enabled&&(a+=` \u30FB外部ベクトル ${n.docs}\u4EF6`),go(a)}function jm(e=!1){if(Ri&&!e)return Ri;let t=Se("memola-xchat-rebuild");return Ri=(async()=>{if(!vl()){go("\u26A0 \u57CB\u3081\u8FBC\u307F\u672A\u8A2D\u5B9A \u2014 \u8A2D\u5B9A\u2192AI\u3067\u69CB\u6210");return}t?.classList.add("spin");try{go("\u30A4\u30F3\u30C7\u30C3\u30AF\u30B9\u8AAD\u8FBC\u4E2D\u2026"),await Xg(),TC("\u73FE\u5728\u306E");let o=await n0(void 0,s=>{let l=s.scope==="org"?"\u7D44\u7E54":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8";go(`${l}\u3092\u30D9\u30AF\u30C8\u30EB\u5316\u4E2D\u2026 ${s.done}/${s.total} \u30C1\u30E3\u30F3\u30AF`)});console.log("[xchat] refresh result",o,_m());let n=o.org+o.user;if(o.errors.length){go("\u30A8\u30E9\u30FC: "+o.errors.join(" / "));return}let r=_m(),a=r.org.chunks+r.user.chunks,i=`\u5BFE\u8C61 \u7D44\u7E54${o.orgDocs}/\u500B\u4EBA${o.userDocs}\u6587\u66F8 \u30FB \u30D9\u30AF\u30C8\u30EB\u5316\u6E08 ${a}\u30C1\u30E3\u30F3\u30AF`;if(o.docsSeen===0){go("\u5BFE\u8C61\u6587\u66F80\u4EF6 \u2014 "+i+" (\u30DA\u30FC\u30B8\u7121\u3057/\u6A29\u9650/\u30EA\u30B9\u30C8\u540D\u3092\u78BA\u8A8D)");return}if(n>0){go(`\u4ECA\u56DE +${n}\u30C1\u30E3\u30F3\u30AF \u30FB `+i);return}if(o.orgSkipped){go("\u7D44\u7E54\u306F\u5225\u5229\u7528\u8005\u304C\u66F4\u65B0\u62C5\u5F53 \u30FB "+i);return}go((a===0?"\u672C\u6587\u306E\u3042\u308B\u6587\u66F8\u304C\u7121\u3044(\u7A7A\u30DA\u30FC\u30B8\u306F\u5BFE\u8C61\u5916) \u30FB ":"\u5909\u66F4\u306A\u3057 \u30FB ")+i)}catch(o){go("\u7D22\u5F15\u30A8\u30E9\u30FC: "+o.message)}finally{t?.classList.remove("spin")}})(),Ri}async function LC(){Ri||jm();try{await Ri}catch{}}function SC(e){let t=new Date(e),o=new Date;return t.getFullYear()===o.getFullYear()&&t.getMonth()===o.getMonth()&&t.getDate()===o.getDate()?"\u4ECA\u65E5":o.getTime()-e<30*864e5?"\u904E\u53BB30\u65E5\u9593":"\u53E4\u3044"}function g0(){let e=Se("memola-xchat-hist-list");if(e){if(e.textContent="",jo.length===0){let t=document.createElement("div");t.className="tdr-hist-empty",t.textContent="\u5C65\u6B74\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093",e.appendChild(t);return}for(let t of["\u4ECA\u65E5","\u904E\u53BB30\u65E5\u9593","\u53E4\u3044"]){let o=jo.filter(r=>SC(r.created)===t);if(!o.length)continue;let n=document.createElement("div");n.className="tdr-hist-group",n.textContent=t,e.appendChild(n);for(let r of o){let a=document.createElement("div");a.className="tdr-hist-item"+(r.id===zo?" is-active":""),a.dataset.sid=r.id;let i=document.createElement("span");i.className="chk",i.textContent="\u2713";let s=document.createElement("span");s.className="nm",s.textContent=r.title||"(\u7121\u984C\u306E\u30C1\u30E3\u30C3\u30C8)";let l=document.createElement("button");l.className="del",l.textContent="\xD7",l.title="\u524A\u9664",l.dataset.del=r.id,a.append(i,s,l),e.appendChild(a)}}}}function Ni(){let e=Se("memola-xchat-title");if(!e)return;let t=Bl();e.textContent=t&&t.turns.length?t.title||"(\u7121\u984C\u306E\u30C1\u30E3\u30C3\u30C8)":"\u65B0\u898F\u30C1\u30E3\u30C3\u30C8"}function Fm(){Se("memola-xchat-histmenu")?.classList.remove("on")}function MC(){let e=Se("memola-xchat-histmenu");e&&(e.classList.contains("on")||g0(),e.classList.toggle("on"))}function CC(e){let t=new Date(e),o=`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`,n=new Date;return t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()&&t.getDate()===n.getDate()?o:`${t.getMonth()+1}/${t.getDate()} ${o}`}function Dl(){let e=Se("memola-xchat-thread");if(!e)return;e.textContent="";let t=Bl();if(!t||t.turns.length===0){let o=document.createElement("div");o.className="tdr-empty",o.innerHTML='<div class="big">\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8</div><p>memola \u5185\u306E\u5168\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8 (\u7D44\u7E54 + \u81EA\u5206\u306E\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8) \u3092\u6A2A\u65AD\u3057\u3066\u8CEA\u554F\u3067\u304D\u307E\u3059\u3002</p><p style="color:var(--ink-4)">\u56DE\u7B54\u306E\u4E0B\u306B\u53C2\u7167\u3057\u305F\u30BD\u30FC\u30B9\u6587\u66F8\u304C\u51FA\u5178\u3068\u3057\u3066\u8868\u793A\u3055\u308C\u3001\u30AF\u30EA\u30C3\u30AF\u3067\u305D\u306E\u6587\u66F8\u3078\u79FB\u52D5\u3067\u304D\u307E\u3059\u3002</p>',e.appendChild(o);return}for(let o of t.turns){let{body:n}=h0(e,o.q);b0(n,o.a,o.sources,o.at)}e.scrollTop=e.scrollHeight}function h0(e,t){let o=document.createElement("div");o.className="tdr-turn";let n=document.createElement("div");n.className="tdr-q",n.textContent=t;let r=document.createElement("div");r.className="tdr-a-avatar",r.textContent="AI";let a=document.createElement("div");a.className="tdr-a-body";let i=document.createElement("div");return i.className="tdr-a",i.append(r,a),o.append(n,i),e.appendChild(o),{turnEl:o,body:a}}function b0(e,t,o,n){e.textContent="";let r=document.createElement("div");if(r.className="tdr-a-meta",n){let i=document.createElement("span");i.className="tdr-turn-time",i.textContent=CC(n),r.appendChild(i)}if(o.length){let i=document.createElement("span");i.textContent=`${o.length} \u4EF6\u53C2\u7167`,r.appendChild(i)}let a=document.createElement("div");if(a.className="tdr-answer",a.innerHTML=ko(t).replace(/\[(\d+)\]/g,(i,s)=>`<span class="cite" data-n="${s}">[${s}]</span>`),e.append(r,a),o.length){let i=new Set;for(let l of t.matchAll(/\[(\d+)\]/g))i.add(Number(l[1]));let s=AC(e,o,i);DC(a,s)}}function AC(e,t,o){let n=new Map;t.forEach((s,l)=>{let c=n.get(s.docKey);c||(c={items:[]},n.set(s.docKey,c)),c.items.push({s,n:l+1})});let r=o.size>0,a=document.createElement("div");a.className="tdr-sources-h"+(r?" collapsed":""),a.innerHTML=PC+`<span>\u53C2\u7167\u3057\u305F\u6587\u66F8 ${n.size} \u4EF6</span>`;let i=document.createElement("div");i.className="tdr-sources"+(r?" collapsed":""),a.addEventListener("click",()=>{a.classList.toggle("collapsed"),i.classList.toggle("collapsed")});for(let s of n.values())i.appendChild(BC(s.items));return e.append(a,i),i}function BC(e){let o=e.reduce((p,u)=>u.s.score>p.s.score?u:p).s,n=e.map(p=>p.n),r=document.createElement("div");r.className="tdr-hit",r.dataset.ns=n.join(" ");let a=document.createElement("div");a.className="tdr-hit-head";let i=document.createElement("span");i.className="tdr-hit-num",i.textContent=n.length===1?String(n[0]):n.join(",");let s=document.createElement("span");s.className="tdr-hit-subject",s.textContent=o.title;let l=document.createElement("span");if(l.className="tdr-hit-badge",l.textContent=m0(o),a.append(i,s,l),o.score!=null){let p=document.createElement("span");p.className="tdr-hit-score",p.textContent=o.score.toFixed(2),a.appendChild(p)}let c=document.createElement("div");c.className="tdr-hit-snippet";let d=e.length>1?`\uFF08\u4ED6 ${e.length-1} \u7B87\u6240\u304C\u8A72\u5F53\uFF09`:"";return c.textContent=(o.heading?`${o.heading} \u2014 `:"")+o.snippet+d,r.append(a,c),o.appPageId?r.addEventListener("click",()=>{_C(o.appPageId)}):r.style.cursor="default",r}function DC(e,t){e.querySelectorAll(".cite").forEach(o=>{o.addEventListener("click",n=>{n.stopPropagation();let r=o.dataset.n;if(!r)return;let a=t.querySelector(`.tdr-hit[data-ns~="${r}"]`);a&&(t.classList.remove("collapsed"),t.previousElementSibling?.classList.remove("collapsed"),a.scrollIntoView({behavior:"smooth",block:"center"}),a.classList.add("is-flash"),setTimeout(()=>a.classList.remove("is-flash"),1200))})})}async function _C(e){Qg();let{doSelect:t}=await Promise.resolve().then(()=>(W(),ce));await t(e)}function RC(e){return["\u3042\u306A\u305F\u306F\u793E\u5185\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u3067\u3059\u3002\u4EE5\u4E0B\u306E\u300C\u629C\u7C8B\u300D\u3060\u3051\u3092\u6839\u62E0\u306B\u3001\u65E5\u672C\u8A9E\u3067\u7C21\u6F54\u304B\u3064\u6B63\u78BA\u306B\u56DE\u7B54\u3057\u3066\u304F\u3060\u3055\u3044\u3002","\u629C\u7C8B\u306B\u7B54\u3048\u304C\u7121\u3044\u5834\u5408\u306F\u63A8\u6E2C\u305B\u305A\u300C\u8A72\u5F53\u3059\u308B\u8A18\u8F09\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u300D\u3068\u8FF0\u3079\u3066\u304F\u3060\u3055\u3044\u3002","\u56DE\u7B54\u4E2D\u3067\u53C2\u7167\u3057\u305F\u629C\u7C8B\u306F [1] \u306E\u3088\u3046\u306B\u756A\u53F7\u3067\u5F15\u7528\u3057\u3066\u304F\u3060\u3055\u3044\u3002","","=== \u629C\u7C8B ===",e.map((o,n)=>{let r=m0(o),a=o.scope==="extvec"&&o.body?o.body.slice(0,2e3):o.snippet,i=o.from||o.date?`
(${[o.from,o.date].filter(Boolean).join(" / ")})`:"";return`[${n+1}] \u6587\u66F8\u300C${o.title}\u300D${o.heading?` / ${o.heading}`:""} (${r})${i}
${a}`}).join(`

`)||"(\u8A72\u5F53\u3059\u308B\u6587\u66F8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F)"].join(`
`)}async function NC(e,t,o,n){let{dispatchChat:r,textOf:a}=await Promise.resolve().then(()=>(Bm(),Am)),i=await r({messages:e,system:t,tools:[],signal:n,stream:{onText:o}});return a(i)}async function c0(){if(Hm)return;let e=Se("memola-xchat-input"),t=Se("memola-xchat-thread");if(!e||!t)return;let o=e.value.trim();if(!o)return;if(!vl()){HC(t,"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8\u306B\u306F\u57CB\u3081\u8FBC\u307F\u8A2D\u5B9A\u304C\u5FC5\u8981\u3067\u3059\u3002\u8A2D\u5B9A \u2192 AI \u2192 \u57CB\u3081\u8FBC\u307F\u30D7\u30ED\u30D0\u30A4\u30C0\u3067\u300CVoyage AI\u300D(\u4E2D\u7D99\u4E0D\u8981\u30FBClaude\u4F75\u7528\u306E\u63A8\u5968) \u3092\u9078\u3093\u3067 API \u30AD\u30FC\u3092\u5165\u308C\u3066\u304F\u3060\u3055\u3044\u3002");return}e.value="",v0(e),Hm=!0,d0(!0),_i=new AbortController,(!Bl()||Bl().turns.length===0)&&(t.textContent="");let{body:n}=h0(t,o),r=document.createElement("div");r.className="tdr-thinking",r.innerHTML='\u30A4\u30F3\u30C7\u30C3\u30AF\u30B9\u6E96\u5099\u4E2D<span class="tdr-dot"></span><span class="tdr-dot"></span><span class="tdr-dot"></span>',n.appendChild(r),t.scrollTop=t.scrollHeight;try{await LC();let a=OC(o),i=[];for(let b of a.turns)i.push({role:"user",content:b.q},{role:"assistant",content:b.a});r.firstChild.textContent="\u30AF\u30A8\u30EA\u89E3\u6790\u30FB\u95A2\u9023\u6587\u66F8\u3092\u691C\u7D22\u4E2D";let s=await r0(o,{signal:_i.signal,history:i}),l=[...i,{role:"user",content:o}];n.textContent="";let c=document.createElement("div");c.className="tdr-answer",n.appendChild(c);let d="",p=b=>{d+=b,c.textContent=d,t.scrollTop=t.scrollHeight},f=(await NC(l,RC(s),p,_i.signal)||d).trim()||"(\u7A7A\u306E\u5FDC\u7B54)",g=s.map(b=>({docKey:b.docKey,appPageId:b.appPageId,scope:b.scope,title:b.title,heading:b.heading,snippet:b.snippet,chunkIdx:b.chunkIdx,score:b.score,kind:b.kind,from:b.from,date:b.date,body:b.body})),y=Date.now();b0(n,f,g,y),a.turns.push({q:o,a:f,sources:g,at:y}),a.title||(a.title=o.slice(0,40)),Promise.resolve().then(()=>(fo(),Uo)).then(b=>b.updateActiveSearchTitle(a.title)),p0(),Ni()}catch(a){if(a.name==="AbortError")n.textContent="";else{n.textContent="";let i=document.createElement("div");i.className="tdr-err",i.textContent="\u30A8\u30E9\u30FC: "+a.message,n.appendChild(i)}}finally{Hm=!1,_i=null,d0(!1),t.scrollTop=t.scrollHeight,_l()}}function OC(e){let t=Bl();return t||(t={id:zo||Zg(),title:e.slice(0,40),created:Date.now(),turns:[]},zo=t.id,jo.unshift(t)),t}function HC(e,t){let o=document.createElement("div");o.className="tdr-turn";let n=document.createElement("div");n.className="tdr-err",n.textContent=t,o.appendChild(n),e.appendChild(o),e.scrollTop=e.scrollHeight}function d0(e){let t=Se("memola-xchat-send");t&&(t.disabled=e)}function v0(e){e.style.height="auto",e.style.height=Math.min(160,e.scrollHeight)+"px"}function eh(){zm(),Se("memola-xchat-launch")?.addEventListener("click",()=>{Promise.resolve().then(()=>(fo(),Uo)).then(t=>t.newSearchTab())}),Se("memola-xchat-new")?.addEventListener("click",()=>{Promise.resolve().then(()=>(fo(),Uo)).then(t=>t.newSearchTab())}),Se("memola-xchat-close")?.addEventListener("click",()=>{Promise.resolve().then(()=>(fo(),Uo)).then(t=>{m.activeTabId&&t.closeTab(m.activeTabId)})}),Se("memola-xchat-rebuild")?.addEventListener("click",()=>{jm(!0)}),Se("memola-xchat-send")?.addEventListener("click",()=>{c0()});let e=Se("memola-xchat-input");e?.addEventListener("input",()=>v0(e)),e?.addEventListener("keydown",t=>{t.key==="Enter"&&!t.shiftKey&&!t.isComposing&&t.keyCode!==229&&(t.preventDefault(),c0())}),Se("memola-xchat-titlebtn")?.addEventListener("click",t=>{t.stopPropagation(),MC()}),document.addEventListener("click",t=>{let o=Se("memola-xchat-histmenu");if(!o||!o.classList.contains("on"))return;let n=t.target;o.contains(n)||Se("memola-xchat-titlebtn")?.contains(n)||Fm()}),Se("memola-xchat-hist-list")?.addEventListener("click",t=>{let o=t.target,n=o.dataset.del;if(n){t.stopPropagation(),jo=jo.filter(i=>i.id!==n),zo===n&&(zo="",u0()),p0(),g0(),Dl(),Ni();return}let a=o.closest(".tdr-hist-item")?.dataset.sid;a&&(zo=a,Dl(),Ni(),Fm(),_l(),Promise.resolve().then(()=>(fo(),Uo)).then(i=>i.openSearchSessionInActiveTab(a)))}),document.addEventListener("keydown",t=>{if(t.key==="Escape"&&Um()&&Se("memola-xchat-histmenu")?.classList.contains("on")){t.stopPropagation(),Fm();return}},!0),document.addEventListener("keydown",t=>{t.key==="Escape"&&Um()&&Hm&&_i&&(t.stopPropagation(),_i.abort())},!0)}var yC,jo,zo,_i,Hm,l0,Ri,PC,Di=L(()=>{"use strict";j();Jo();ve();a0();um();yC=50,jo=[],zo="",_i=null,Hm=!1,l0=!1,Ri=null;PC='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'});var x0={};q(x0,{maybeShowSinceLastView:()=>UC});async function UC(e,t,o){let n=$o(e),r=n.get();if(n.set(o),!r||r===o)return;let a=await Pa(e).catch(()=>"");zC(t,a)}function zC(e,t){let o=document.getElementById(y0);o&&o.remove();let n=document.getElementById("memola-overlay")||document.body,r=document.createElement("div");r.id=y0;let a=new Date(e).toLocaleString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}),i=t?"<b>"+M(t)+"</b>\u3055\u3093":"\u5225\u306E\u8AB0\u304B";r.innerHTML='<span class="memola-since-ic">\u{1F514}</span><span class="memola-since-msg">\u524D\u56DE\u306E\u8868\u793A\u4EE5\u964D\u306B '+i+" \u304C "+M(a)+' \u306B\u66F4\u65B0\u3057\u307E\u3057\u305F</span><button class="memola-since-close" title="\u9589\u3058\u308B">\xD7</button>',n.appendChild(r),requestAnimationFrame(()=>r.classList.add("on"));let s=()=>{r.parentNode&&(r.classList.remove("on"),setTimeout(()=>r.remove(),250))};r.querySelector(".memola-since-close")?.addEventListener("click",s),setTimeout(s,FC)}var y0,FC,k0=L(()=>{"use strict";ve();$t();De();y0="memola-since-banner",FC=12e3});var S0={};q(S0,{attachDbRowDrag:()=>GC});function jC(){return or||(or=ld({id:"memola-row-handle",title:"\u30C9\u30E9\u30C3\u30B0\u3057\u3066\u884C\u3092\u4E26\u3079\u66FF\u3048",centred:!0,onDragStart:KC,onDragEnd:Nl,onMouseLeave:e=>{let t=e.relatedTarget;t&&nr&&nr.contains(t)||Rl()}}),or)}function Rl(){or&&or.hide(),nr=null}function I0(e){let t=document.getElementById("memola-dtb");if(!t)return null;let o=Array.from(t.querySelectorAll("tr"));for(let n of o){let r=n.getBoundingClientRect();if(e>=r.top&&e<=r.bottom)return n}return null}function qC(){if(Oi&&document.body.contains(Oi))return Oi;let e=document.createElement("div");return e.className="memola-row-drop-line",document.getElementById("memola-overlay")?.appendChild(e),Oi=e,e}function $C(e,t){let o=qC(),n=e.getBoundingClientRect();o.style.top=(t?n.bottom:n.top)-1+"px",o.style.left=n.left+"px",o.style.width=n.width+"px",o.classList.add("on")}function th(){Oi&&Oi.classList.remove("on")}function KC(e){if(!nr){e.preventDefault();return}let t=nr.dataset.id;if(!t){e.preventDefault();return}rr=parseInt(t,10),E0=nr,na=m.dbSelected.has(rr)?Array.from(m.dbSelected):[rr],e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/memola-row",t));let o=document.getElementById("memola-dtb");o&&o.querySelectorAll("tr").forEach(n=>{let r=parseInt(n.dataset.id||"0",10);na.indexOf(r)>=0&&n.classList.add("memola-tr-dragging")}),document.addEventListener("dragover",T0),document.addEventListener("drop",L0)}function Nl(){let e=document.getElementById("memola-dtb");e&&e.querySelectorAll(".memola-tr-dragging").forEach(t=>{t.classList.remove("memola-tr-dragging")}),rr=null,na=[],E0=null,th(),document.removeEventListener("dragover",T0),document.removeEventListener("drop",L0)}function T0(e){if(rr===null)return;e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move");let t=I0(e.clientY);if(!t){th();return}let o=parseInt(t.dataset.id||"0",10);if(na.indexOf(o)>=0){th();return}let n=t.getBoundingClientRect(),r=e.clientY>n.top+n.height/2;$C(t,r)}function L0(e){if(rr===null){Nl();return}e.preventDefault();let t=I0(e.clientY);if(!t){Nl();return}let o=parseInt(t.dataset.id||"0",10);if(!o||na.indexOf(o)>=0){Nl();return}let n=t.getBoundingClientRect(),r=e.clientY>n.top+n.height/2;Dr(na.length>0?na:[rr],o,r),Nl()}function WC(e,t){let o=document.getElementById("memola-dtb");if(!o)return null;let n=Array.from(o.querySelectorAll("tr"));for(let r of n)if(cd(r,e,t))return r;return null}function GC(){w0||(w0=!0,document.addEventListener("mousemove",e=>{if(rr!==null)return;if(m.currentType!=="database"){Rl();return}if(!_n()){Rl();return}if(!document.getElementById("memola-dt")){Rl();return}if(or&&or.isCursorOnHandle(e.clientX,e.clientY))return;let o=WC(e.clientX,e.clientY);o?o!==nr&&(nr=o,jC().positionAt(o)):Rl()}))}var or,nr,rr,na,E0,Oi,w0,M0=L(()=>{"use strict";j();W();Qu();or=null,nr=null,rr=null,na=[],E0=null;Oi=null;w0=!1});var qm={};q(qm,{attachFilterPopoverOutsideClick:()=>JC,passesFilters:()=>ZC,renderFilterChips:()=>oh,showFilterPopover:()=>YC});function Hi(e){return document.getElementById(e)}function oh(){let e=Hi("memola-filter-chips");e&&(e.innerHTML="",m.dbFilters.forEach((t,o)=>{let n=m.dbFields.find(s=>s.InternalName===t.field);if(!n)return;let r=document.createElement("div");r.className="memola-flt-chip";let a=document.createElement("span");a.className="memola-flt-chip-label",a.textContent=n.Title,r.appendChild(a),r.appendChild(VC(n,t,o));let i=document.createElement("button");i.className="memola-flt-chip-x",i.title="\u524A\u9664",i.textContent="\xD7",i.addEventListener("click",()=>{m.dbFilters.splice(o,1),oh(),Ne()}),r.appendChild(i),e.appendChild(r)}))}function VC(e,t,o){if(e.FieldTypeKind===6&&e.Choices){let r=document.createElement("select");r.className="memola-flt-chip-val";let a=document.createElement("option");return a.value="",a.textContent="\u2014",r.appendChild(a),e.Choices.forEach(i=>{let s=document.createElement("option");s.value=i,s.textContent=i,t.value===i&&(s.selected=!0),r.appendChild(s)}),r.addEventListener("change",()=>{m.dbFilters[o].op="equals",m.dbFilters[o].value=r.value,Ne()}),r}if(e.FieldTypeKind===8){let r=document.createElement("select");return r.className="memola-flt-chip-val",[["","\u2014"],["true","\u30C1\u30A7\u30C3\u30AF\u6E08\u307F"],["false","\u672A\u30C1\u30A7\u30C3\u30AF"]].forEach(([a,i])=>{let s=document.createElement("option");s.value=a,s.textContent=i,t.value===a&&(s.selected=!0),r.appendChild(s)}),r.addEventListener("change",()=>{m.dbFilters[o].op="equals",m.dbFilters[o].value=r.value,Ne()}),r}let n=document.createElement("input");return n.type="text",n.className="memola-flt-chip-val",n.placeholder="\u5024\u2026",n.value=t.value||"",n.addEventListener("input",()=>{m.dbFilters[o].op="contains",m.dbFilters[o].value=n.value,Ne()}),n.addEventListener("keydown",r=>{r.key==="Escape"&&n.blur()}),n}function YC(){let e=Hi("memola-filter-popover"),t=Hi("memola-db-filter-btn");if(!e||!t)return;let o=e;if(o.classList.contains("on")){o.classList.remove("on");return}o.innerHTML="";let n=document.createElement("div");n.className="memola-flt-pop-inpwrap";let r=document.createElement("input");r.type="text",r.className="memola-flt-pop-inp",r.placeholder="\u30D5\u30A3\u30EB\u30BF\u30FC\u5BFE\u8C61\u2026",n.appendChild(r),o.appendChild(n);let a=document.createElement("div");a.className="memola-flt-pop-list",o.appendChild(a);function i(l){a.innerHTML="";let c=new Set(m.dbFilters.map(u=>u.field)),d=l.toLowerCase(),p=m.dbFields.filter(u=>!c.has(u.InternalName)).filter(u=>!d||u.Title.toLowerCase().includes(d));if(p.length===0){let u=document.createElement("div");u.className="memola-flt-pop-empty",u.textContent=c.size===m.dbFields.length?"\u5168\u9805\u76EE\u306B\u65E2\u306B\u6761\u4EF6\u304C\u8A2D\u5B9A\u6E08\u307F":"\u4E00\u81F4\u3059\u308B\u9805\u76EE\u306A\u3057",a.appendChild(u);return}p.forEach(u=>{let f=document.createElement("div");f.className="memola-flt-pop-item";let g=document.createElement("span");g.className="memola-flt-pop-ic",g.textContent=XC(u.FieldTypeKind);let y=document.createElement("span");y.textContent=u.Title,f.append(g,y),f.addEventListener("click",()=>{m.dbFilters.push({field:u.InternalName,op:"contains",value:""}),o.classList.remove("on"),oh(),Ne(),setTimeout(()=>{let h=Hi("memola-filter-chips")?.querySelectorAll(".memola-flt-chip-val");h&&h.length>0&&h[h.length-1].focus()},50)}),a.appendChild(f)})}r.addEventListener("input",()=>i(r.value));let s=t.getBoundingClientRect();o.style.left=s.left+"px",o.style.top=s.bottom+6+"px",o.classList.add("on"),i(""),setTimeout(()=>r.focus(),30)}function XC(e){switch(e){case 2:return"Aa";case 3:return"\xB6";case 4:return"\u{1F4C5}";case 6:return"\u25C9";case 8:return"\u2610";case 9:return"#";default:return"\xB7"}}function JC(){document.addEventListener("click",e=>{let t=Hi("memola-filter-popover"),o=Hi("memola-db-filter-btn");if(!t||!t.classList.contains("on"))return;let n=e.target;t&&t.contains(n)||o&&o.contains(n)||t.classList.remove("on")})}function ZC(e){for(let t of m.dbFilters){if(!t.value&&t.op!=="empty"&&t.op!=="not_empty")continue;let o=e[t.field],n=o==null?"":String(o);switch(t.op){case"equals":if(t.value==="true"||t.value==="false"){if(n==="true"!=(t.value==="true"))return!1}else if(n!==t.value)return!1;break;case"not_empty":if(!n)return!1;break;case"empty":if(n)return!1;break;case"contains":default:if(!n.toLowerCase().includes(t.value.toLowerCase()))return!1}}return!0}var $m=L(()=>{"use strict";j();W()});var ce={};q(ce,{attachCardDragHandlers:()=>zs,attachCardSelectionHandlers:()=>Rn,doSelect:()=>Fe,doSelectDb:()=>C0,getDbFields:()=>gl,getSortedFilteredItems:()=>Vt,hideCardDropLine:()=>bl,isManualRowOrderActive:()=>_n,loadLastOpenedPage:()=>eA,mkDbRow:()=>hl,mkOpenRowBtn:()=>Po,renderBcCustom:()=>$s,renderDbTable:()=>Ne,renderKanban:()=>Ei,renderPageIcon:()=>Ol,reorderRows:()=>Dr,setSelectionAnchor:()=>mm,showCardDropLine:()=>Dg,showView:()=>et});function et(e){if(E("ea").style.display=e==="page"||e==="empty"?"flex":"none",E("em").style.display=e==="empty"?"flex":"none",E("ct").style.display=e==="page"?"block":"none",E("tb").style.display=e==="page"?"flex":"none",E("dv").style.display=e==="db"?"flex":"none",E("lib").style.display=e==="library"?"block":"none",e!=="library"){let t=document.getElementById("memola-lib-bulkbar");t&&t.classList.remove("on")}hn(),(e==="empty"||e==="library")&&Wo(null)}function $s(e){let t=E("bc");t.innerHTML="",e.forEach((o,n)=>{let r=document.createElement("span");if(r.className="memola-bi",r.textContent=o.label,o.onClick?r.addEventListener("click",o.onClick):r.style.cursor="default",t.appendChild(r),n<e.length-1){let a=document.createElement("span");a.textContent="/",a.style.color="#e9e9e7",a.style.margin="0 4px",t.appendChild(a)}})}function Ol(e){let t=A(e),o=t&&t.icon||"",n=E("pg-icon"),r=E("add-icon"),a=document.getElementById("memola-pg-hd");o?(n.textContent=o,n.style.display="inline-block",r.style.display="none",a?.classList.remove("no-icon")):(n.style.display="none",r.style.display="",a?.classList.add("no-icon"))}async function Fe(e){if(m.currentType==="page"&&!m.currentRow)try{let{pruneEmptyTodosEditor2:n}=await Promise.resolve().then(()=>(ht(),Bo));if(n()>0){let{schedSave:a}=await Promise.resolve().then(()=>(gt(),Ur));a()}}catch{}m.currentType!=="database"&&await vt(),Promise.resolve().then(()=>(Di(),Al)).then(n=>n.hideSearchTab()),m.currentRow=null,m.currentId=e;let t=e,o=m.pages.find(n=>n.Id===e);if(o){if(Promise.resolve().then(()=>(Ao(),mn)).then(n=>n.clearComments()),Promise.resolve().then(()=>(gg(),fg)).then(n=>n.clearMergeHighlight()),nf(e),Yn(e).forEach(n=>{m.expanded.add(n.Id)}),oe(),nh(e),o.Type==="database")await C0(e,o),Promise.resolve().then(()=>(gd(),fd)).then(n=>n.renderBacklinks());else{m.currentType="page",Promise.resolve().then(()=>(Os(),rd)).then(a=>a.hideBulkBar()),et("page");let n=E("ttl");n.value=o.Title||"",En(n),Ol(e);let r=document.getElementById("memola-row-props");r&&(r.innerHTML=""),Wo(null),R(!0,"\u30DA\u30FC\u30B8\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D...");try{let a=await pu(e);if(m.currentId!==t)return;let{mountEditor2:i,loadBlocksFromJson:s}=await Promise.resolve().then(()=>(ht(),Bo));if(m.currentId!==t)return;if(i(Pe()),s(a?.body||""),Promise.resolve().then(()=>(Pd(),Wx)).then(l=>l.markBrokenPageLinks(Pe())),a){bg(e,a.modified,a.etag);let c=(E("ttl")?.value||o.Title||"\u7121\u984C").trim()||"\u7121\u984C";re.loadPage({pageId:e,body:a.body,title:c,etag:a.etag,modified:a.modified}),Wo(a.modified),Promise.resolve().then(()=>(k0(),x0)).then(d=>d.maybeShowSinceLastView(e,a.modified,a.etag))}else Un(),re.unload(),Wo(null);Jr(),Zr()}catch(a){Pe().innerHTML="",w("\u8AAD\u307F\u8FBC\u307F\u5931\u6557: "+a.message,"err"),Un(),re.unload(),Wo(null)}finally{R(!1)}hn(),Nr(),tA(),P0("page"),dm(),Promise.resolve().then(()=>(gd(),fd)).then(a=>a.renderBacklinks()),Promise.resolve().then(()=>(Ao(),mn)).then(a=>{let i=a.currentCommentTarget();i&&m.currentId===t&&a.loadCommentsFor(i.pageId,i.scope)})}QC(e),Promise.resolve().then(()=>(fo(),Uo)).then(n=>n.openInActiveTab(e,o.Title||"\u7121\u984C"))}}function QC(e){let t=Xi.get();t[G]=e,Xi.set(t)}function eA(){return Xi.get()[G]||null}function P0(e){let t=document.getElementById("memola-template-banner"),o=document.getElementById("memola-template-banner-db");t&&(t.style.display="none",t.innerHTML=""),o&&(o.style.display="none",o.innerHTML="");let n=m.currentId?A(m.currentId):null;if(!n?.isTemplate)return;let r=e==="db"?o:t;if(!r)return;let a=n.type==="database"?"DB":"\u30DA\u30FC\u30B8";r.style.display="",r.innerHTML='<span class="memola-template-banner-icon">\u{1F9E9}</span><span class="memola-template-banner-msg">\u3053\u308C\u306F<b>\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8</b>\u306E\u7DE8\u96C6\u753B\u9762\u3067\u3059\u3002\u3053\u3053\u3067\u306E\u5909\u66F4\u306F\u3001\u4ECA\u5F8C\u3053\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u4F5C\u6210\u3059\u308B'+a+"\u306B\u53CD\u6620\u3055\u308C\u307E\u3059\u3002</span>"}function tA(){let e=document.getElementById("memola-draft-banner");if(!e)return;let t=m.currentId?A(m.currentId):null;if(!t?.originPageId){e.style.display="none",e.innerHTML="";return}let o=A(t.originPageId),n=o?.title||"(\u539F\u672C\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093)",r=!!o&&!o.trashed;e.style.display="",e.innerHTML='<span class="memola-draft-banner-icon">\u270F\uFE0F</span><span class="memola-draft-banner-msg">\u539F\u672C: <a class="memola-draft-banner-link" data-origin-id="'+(t.originPageId||"")+'">'+M(n)+"</a> \u306E<b>\u4E0B\u66F8\u304D</b>\u3067\u3059</span>"+(r?'<button class="memola-draft-banner-apply" type="button">\u539F\u672C\u306B\u9069\u7528</button>':'<span class="memola-draft-banner-broken">\u539F\u672C\u304C\u524A\u9664\u3055\u308C\u3066\u3044\u307E\u3059</span><button class="memola-draft-banner-promote" type="button">\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58</button>'),e.querySelector(".memola-draft-banner-link")?.addEventListener("click",a=>{a.preventDefault();let i=a.target.dataset.originId;i&&Fe(i)}),e.querySelector(".memola-draft-banner-apply")?.addEventListener("click",async()=>{if(await(await Promise.resolve().then(()=>(gt(),Ur))).flushPendingSave(),!!confirm("\u4E0B\u66F8\u304D\u306E\u5185\u5BB9\u3092\u539F\u672C\u300C"+n+`\u300D\u306B\u9069\u7528\u3057\u307E\u3059\u3002

\u30FB\u539F\u672C\u304C\u4E0B\u66F8\u304D\u4F5C\u6210\u5F8C\u306B\u5909\u66F4\u3055\u308C\u3066\u3044\u308C\u3070\u81EA\u52D5\u30673-way\u30DE\u30FC\u30B8\u3057\u307E\u3059
\u30FB\u539F\u672C\u306E\u73FE\u5728\u306E\u672C\u6587\u306F SP \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74\u306B\u6B8B\u308A\u307E\u3059
\u30FB\u3053\u306E\u4E0B\u66F8\u304D\u30DA\u30FC\u30B8\u306F\u524A\u9664\u3055\u308C\u307E\u3059
\u30FB\u539F\u672C\u3078\u306E\u30EA\u30F3\u30AF ([[`+t.originPageId+`]]) \u306F\u58CA\u308C\u307E\u305B\u3093

\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F`))try{R(!0,"\u539F\u672C\u306B\u9069\u7528\u4E2D\u2026");let i=m.currentId;if(!i)return;let{applyDraftToOriginInteractive:s}=await Promise.resolve().then(()=>(Oo(),Vn));await s(i)}catch(i){w("\u9069\u7528\u5931\u6557: "+i.message,"err")}finally{R(!1)}}),e.querySelector(".memola-draft-banner-promote")?.addEventListener("click",async()=>{if(await(await Promise.resolve().then(()=>(gt(),Ur))).flushPendingSave(),!!confirm("\u539F\u672C\u304C\u524A\u9664\u3055\u308C\u3066\u3044\u308B\u305F\u3081\u3001\u3053\u306E\u4E0B\u66F8\u304D\u3092\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F"))try{R(!0,"\u4FDD\u5B58\u4E2D\u2026");let i=m.currentId;if(!i)return;let{apiPromoteDraftToPage:s,apiGetPages:l}=await Promise.resolve().then(()=>(K(),je)),c=await s(i);await l();let{renderTree:d}=await Promise.resolve().then(()=>(Be(),po));d(),Promise.resolve().then(()=>(Oo(),Vn)).then(p=>p.refreshDraftsBadge?.()),await Fe(c),w("\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3057\u305F")}catch(i){w("\u4FDD\u5B58\u5931\u6557: "+i.message,"err")}finally{R(!1)}})}async function C0(e,t){m.currentType="database",Promise.resolve().then(()=>(Ao(),mn)).then(i=>i.clearComments()),Un(),re.unload(),hn(),dm(),Wo(null),Jr(),Zr(),Promise.resolve().then(()=>(M0(),S0)).then(i=>i.attachDbRowDrag());let o=A(e);if(!o||!o.list){w("DB\u30E1\u30BF\u60C5\u5831\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}et("db"),E("dv-ttl").textContent=t.Title||"\u7121\u984C";let n=E("dv-pg-icon"),r=E("dv-add-icon"),a=document.getElementById("memola-dv-hd");o.icon?(n.textContent=o.icon,n.style.display="inline-block",r.style.display="none",a?.classList.remove("no-icon")):(n.style.display="none",r.style.display="",a?.classList.add("no-icon")),R(!0,"\u30C7\u30FC\u30BF\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D...");try{let i=await Promise.all([Ue(o.list),Ie(o.list)]),{stripInternalDbFields:s}=await Promise.resolve().then(()=>(Ke(),Ht));m.dbFields=s(i[0]);let l=i[1],c=[],d=[];for(let p of l){let u=p.Trashed;typeof u=="number"&&u>0?c.push(p):d.push(p)}m.dbItems=d,m.dbList=o.list,m.dbFilters=[],m.dbSelected.clear(),mm(null),m.dbSort={field:null,asc:!0},Promise.resolve().then(()=>($m(),qm)).then(p=>p.renderFilterChips()),Ne(),P0("db"),Promise.resolve().then(()=>(Ke(),Ht)).then(p=>p.reconcileTrashedRows(o.list,l)).catch(()=>{})}catch(i){w("DB\u8AAD\u307F\u8FBC\u307F\u5931\u6557: "+i.message,"err")}finally{R(!1)}}var W=L(()=>{"use strict";j();He();me();le();Be();K();De();Rr();ft();bi();vi();im();Fn();fl();Re();ve();pm();gt();ye();pm();Ew()});function Fi(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var A0=L(()=>{"use strict"});var ah={};q(ah,{SHORTCUT_GROUPS:()=>D0,closeShortcutsModal:()=>rA,openShortcutsModal:()=>rh});function oA(e){let t=/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent||"");return e.map(o=>{let n=o;return o==="Mod"&&(n=t?"\u2318":"Ctrl"),o==="Shift"&&(n=t?"\u21E7":"Shift"),o==="Alt"&&(n=t?"\u2325":"Alt"),o==="Esc"&&(n="Esc"),'<kbd class="memola-kbd">'+M(n)+"</kbd>"}).join('<span class="memola-kbd-plus">+</span>')}function nA(){return'<div class="memola-mb memola-shortcuts-mb"><h2>\u2328 \u30AD\u30FC\u30DC\u30FC\u30C9\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8</h2><div class="memola-shortcuts-grid">'+D0.map(t=>{let o=t.items.map(n=>'<li><span class="memola-shortcuts-keys">'+oA(n.keys)+'</span><span class="memola-shortcuts-desc">'+M(n.desc)+"</span></li>").join("");return'<section class="memola-shortcuts-sec"><h3>'+M(t.title)+"</h3><ul>"+o+"</ul></section>"}).join("")+'</div><div class="memola-ma"><button class="memola-btn p" data-c="close">\u9589\u3058\u308B</button></div></div>'}function rh(){Xr({id:B0,className:"",contentHtml:nA(),buttons:{close:void 0},cancelValue:void 0})}function rA(){let e=document.getElementById(B0);e&&e.remove()}var B0,D0,Km=L(()=>{"use strict";De();Gn();B0="memola-shortcuts-md",D0=[{title:"\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3",items:[{keys:["Mod","K"],desc:"\u30AF\u30A4\u30C3\u30AF\u691C\u7D22 / \u30B3\u30DE\u30F3\u30C9\u30D1\u30EC\u30C3\u30C8"},{keys:["Mod","["],desc:"\u623B\u308B (\u5C65\u6B74)"},{keys:["Mod","]"],desc:"\u9032\u3080 (\u5C65\u6B74)"},{keys:["Mod","\\"],desc:"\u30B5\u30A4\u30C9\u30D0\u30FC\u958B\u9589"},{keys:["Esc"],desc:"\u691C\u7D22 / \u30E2\u30FC\u30C0\u30EB / \u30E1\u30CB\u30E5\u30FC\u3092\u9589\u3058\u308B"}]},{title:"\u4FDD\u5B58\u3068\u7DE8\u96C6",items:[{keys:["Mod","S"],desc:"\u4ECA\u3059\u3050\u4FDD\u5B58 (\u81EA\u52D5\u4FDD\u5B58\u3092\u5F85\u305F\u306A\u3044)"},{keys:["Mod","Z"],desc:"\u53D6\u308A\u6D88\u3057 (Undo)"},{keys:["Mod","Shift","Z"],desc:"\u3084\u308A\u76F4\u3057 (Redo)"},{keys:["Mod","Y"],desc:"\u3084\u308A\u76F4\u3057 (Redo / Windows \u6163\u4F8B)"}]},{title:"\u4F5C\u6210",items:[{keys:["Mod","N"],desc:"\u65B0\u3057\u3044\u30DA\u30FC\u30B8\u3092\u4F5C\u6210"},{keys:["Mod","Shift","N"],desc:"\u65B0\u3057\u3044 DB \u3092\u4F5C\u6210"}]},{title:"\u30D1\u30CD\u30EB / \u30D3\u30E5\u30FC",items:[{keys:["Mod","Shift","L"],desc:"\u76EE\u6B21\u3092\u958B\u9589"},{keys:["Mod","Shift","R"],desc:"\u30D7\u30ED\u30D1\u30C6\u30A3\u3092\u958B\u9589"},{keys:["Mod","Shift","F"],desc:"\u96C6\u4E2D\u30E2\u30FC\u30C9\u5207\u66FF"},{keys:["Mod","Shift","A"],desc:"AI \u30C1\u30E3\u30C3\u30C8\u5207\u66FF"},{keys:["Mod","J"],desc:"AI \u30C1\u30E3\u30C3\u30C8\u5207\u66FF (\u5225\u30D0\u30A4\u30F3\u30C9)"}]},{title:"\u30A8\u30C7\u30A3\u30BF\u5185",items:[{keys:["/"],desc:"\u30B9\u30E9\u30C3\u30B7\u30E5\u30E1\u30CB\u30E5\u30FC (\u30D6\u30ED\u30C3\u30AF\u633F\u5165)"},{keys:["[","["],desc:"\u30DA\u30FC\u30B8\u30EA\u30F3\u30AF\u3092\u633F\u5165 ([[ \u3092\u30BF\u30A4\u30D7)"},{keys:["#","\u30B9\u30DA\u30FC\u30B9"],desc:"\u898B\u51FA\u3057 1 (## \u2192 \u898B\u51FA\u3057 2\u3001### \u2192 \u898B\u51FA\u3057 3)"},{keys:["-","\u30B9\u30DA\u30FC\u30B9"],desc:"\u7B87\u6761\u66F8\u304D (* / + \u3067\u3082\u53EF)"},{keys:["1","."],desc:"\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8 (1. \u2192 \u958B\u59CB)"},{keys:[">","\u30B9\u30DA\u30FC\u30B9"],desc:"\u5F15\u7528\u30D6\u30ED\u30C3\u30AF"},{keys:["```"],desc:"\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF (3 \u9023\u30D0\u30C3\u30AF\u30AF\u30A9\u30FC\u30C8)"}]},{title:"DB \u30D3\u30E5\u30FC",items:[{keys:["Mod","A"],desc:"\u8868\u793A\u4E2D\u306E\u5168\u884C\u3092\u9078\u629E"},{keys:["Enter"],desc:"\u65B0\u898F\u884C\u306E\u7DE8\u96C6\u3092\u78BA\u5B9A / \u6B21\u306E\u30BB\u30EB"},{keys:["Tab"],desc:"\u6B21\u306E\u30BB\u30EB\u3078\u79FB\u52D5 (\u65B0\u898F\u884C\u5165\u529B\u4E2D)"},{keys:["Shift","Tab"],desc:"\u524D\u306E\u30BB\u30EB\u3078\u79FB\u52D5"},{keys:["Esc"],desc:"\u5165\u529B\u3092\u7834\u68C4"}]}]});var O0={};q(O0,{buildQsActionItem:()=>ch,buildQsPageItem:()=>lh,closeSearch:()=>qo,getPagePath:()=>R0,openSearch:()=>mh,qsConfirm:()=>ph,qsMove:()=>Gm,rebuildQsDom:()=>N0,renderQs:()=>Wm,resetQsSel:()=>uh,setCommandActions:()=>dh});function dh(e){_0=e}function mh(){E("qs").classList.add("on"),E("qs-inp").value="",Qt=0,Wm(""),E("qs-inp").focus()}function qo(){E("qs").classList.remove("on")}function R0(e){return Yn(e).map(o=>o.Title||"\u7121\u984C").join(" / ")}function Wm(e){let t=m.pages.filter(o=>o.IsDraft||A(o.Id)?.isTemplate?!1:e?(o.Title||"").toLowerCase().includes(e.toLowerCase()):!0);ih=t.filter(o=>o.Type!=="database").slice(0,15),sh=t.filter(o=>o.Type==="database").slice(0,8),N0()}function N0(){let e=E("qs-res");e.innerHTML="",kt=[];let t=E("qs-inp").value||"",o=t.trim().toLowerCase(),n=t.startsWith(">");if(!n&&ih.length>0){let i=document.createElement("div");i.className="memola-qs-section",i.textContent=o?"\u30DA\u30FC\u30B8":"\u6700\u8FD1\u306E\u30DA\u30FC\u30B8",e.appendChild(i),ih.forEach(s=>{kt.push({kind:"page",page:s}),e.appendChild(lh(s,kt.length-1))})}if(!n&&sh.length>0){let i=document.createElement("div");i.className="memola-qs-section",i.textContent="DB",e.appendChild(i),sh.forEach(s=>{kt.push({kind:"page",page:s}),e.appendChild(lh(s,kt.length-1))})}let r=n?o.slice(1).trim():o,a=_0.filter(i=>!r||i.label.toLowerCase().includes(r));if(a.length>0){let i=document.createElement("div");i.className="memola-qs-section",i.textContent="\u30A2\u30AF\u30B7\u30E7\u30F3",e.appendChild(i),a.forEach(s=>{kt.push({kind:"action",action:s}),e.appendChild(ch(s,kt.length-1))})}if(!n&&!o){let i=document.createElement("div");i.className="memola-qs-section",i.textContent="\u30D8\u30EB\u30D7",e.appendChild(i);let s={id:"help-shortcuts",label:"\u30AD\u30FC\u30DC\u30FC\u30C9\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8",icon:"?",key:"",run:()=>{Promise.resolve().then(()=>(Km(),ah)).then(l=>l.openShortcutsModal())}};kt.push({kind:"action",action:s}),e.appendChild(ch(s,kt.length-1))}kt.length===0&&(e.innerHTML='<div class="memola-qs-empty">\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F</div>'),Qt>=kt.length&&(Qt=0)}function lh(e,t){let o=document.createElement("div");o.className="memola-qs-item"+(t===Qt?" sel":"");let n=e.Type==="database",r=R0(e.Id);return o.innerHTML='<span class="memola-qs-ic">'+(n?"\u{1F5C3}":"\u{1F4C4}")+'</span><div style="flex:1;min-width:0"><div class="memola-qs-title">'+Fi(e.Title||"\u7121\u984C")+"</div>"+(r?'<div class="memola-qs-path">'+Fi(r)+"</div>":"")+"</div>",o.addEventListener("click",()=>{qo(),Fe(e.Id)}),o}function ch(e,t){let o=document.createElement("div");return o.className="memola-qs-item"+(t===Qt?" sel":""),o.innerHTML='<span class="memola-qs-ic">'+Fi(e.icon)+'</span><div style="flex:1;min-width:0"><div class="memola-qs-title">'+Fi(e.label)+"</div></div>"+(e.key?'<span class="memola-qs-kbd">'+Fi(e.key)+"</span>":""),o.addEventListener("click",()=>{qo(),e.run()}),o}function Gm(e){if(kt.length===0)return;Qt=(Qt+e+kt.length)%kt.length;let t=E("qs-res").querySelectorAll(".memola-qs-item");t.forEach((o,n)=>{o.classList.toggle("sel",n===Qt)}),t[Qt]&&t[Qt].scrollIntoView({block:"nearest"})}function ph(){let e=kt[Qt];e&&(e.kind==="page"&&e.page?(qo(),Fe(e.page.Id)):e.kind==="action"&&e.action&&(qo(),e.action.run()))}function uh(){Qt=0}var Qt,kt,ih,sh,_0,Hl=L(()=>{"use strict";j();me();Be();W();A0();ye();Qt=0,kt=[],ih=[],sh=[],_0=[]});var aA,H0,F0=L(()=>{"use strict";aA=[{name:"list_pages",description:`Memola \u306E\u3059\u3079\u3066\u306E\u30DA\u30FC\u30B8\u3068\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306E\u4E00\u89A7\u3092\u8FD4\u3059\u3002
\u30BF\u30A4\u30C8\u30EB / ID / \u89AA ID / \u7A2E\u985E\u306E\u307F\u8FD4\u3057\u672C\u6587\u306F\u542B\u307E\u306A\u3044\uFF08\u8EFD\u91CF\uFF09\u3002
AI \u304C\u4F5C\u696D\u524D\u306B\u5168\u4F53\u50CF\u3092\u628A\u63E1\u3059\u308B\u7528\u9014\u3002include_trashed=true \u3067\u30B4\u30DF\u7BB1\u5185\u3082\u542B\u3081\u308B\u3002`,input_schema:{type:"object",properties:{include_trashed:{type:"boolean",description:"\u30B4\u30DF\u7BB1\u306B\u5165\u3063\u3066\u3044\u308B\u30DA\u30FC\u30B8\u3082\u542B\u3081\u308B\u304B\u3002\u65E2\u5B9A false"}}}},{name:"search_pages",description:`\u30BF\u30A4\u30C8\u30EB\u306B\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u542B\u3080\u30DA\u30FC\u30B8\u3092\u691C\u7D22\u3059\u308B\uFF08\u90E8\u5206\u4E00\u81F4\u3001\u5927\u6587\u5B57\u5C0F\u6587\u5B57\u7121\u8996\uFF09\u3002
\u26A0\uFE0F create_page \u3092\u547C\u3076\u524D\u306B\u5FC5\u305A\u5B9F\u884C\u3057\u3001\u91CD\u8907\u30DA\u30FC\u30B8\u304C\u7121\u3044\u304B\u78BA\u8A8D\u3059\u308B\u3053\u3068\u3002
\u91CD\u8907\u304C\u3042\u3063\u305F\u5834\u5408\u306F user \u306B\u300C\u65E2\u5B58\u3092\u66F4\u65B0\u3059\u308B\u304B\u65B0\u898F\u4F5C\u6210\u3059\u308B\u304B\u300D\u3092\u78BA\u8A8D\u3059\u308B\u3002`,input_schema:{type:"object",properties:{query:{type:"string",description:"\u691C\u7D22\u30AD\u30FC\u30EF\u30FC\u30C9"}},required:["query"]}},{name:"read_page",description:`\u30DA\u30FC\u30B8 ID \u3092\u6307\u5B9A\u3057\u3066\u672C\u6587 (markdown) \u3068\u30BF\u30A4\u30C8\u30EB\u3092\u53D6\u5F97\u3059\u308B\u3002
update_page \u3067\u4FEE\u6B63\u3059\u308B\u524D\u306B\u5FC5\u305A\u8AAD\u3080\u3053\u3068\u3002`,input_schema:{type:"object",properties:{id:{type:"string",description:"\u30DA\u30FC\u30B8 ID\uFF08\u6570\u5024\u306E\u6587\u5B57\u5217\uFF09"}},required:["id"]}},{name:"create_page",description:`\u65B0\u898F\u30DA\u30FC\u30B8\u3092\u4F5C\u6210\u3059\u308B\u3002

\u4F7F\u7528\u6761\u4EF6:
- user \u304C\u300C\u4F5C\u3063\u3066\u300D\u300C\u65B0\u898F\u30DA\u30FC\u30B8\u300D\u3068\u660E\u793A\u7684\u306B\u4F9D\u983C\u3057\u305F\u6642\u306E\u307F
- \u65E2\u5B58\u30DA\u30FC\u30B8\u306E\u4FEE\u6B63\u3067\u6E08\u3080\u5834\u5408\u306F update_page \u3092\u4F7F\u3046\u3053\u3068

\u624B\u9806:
1. \u547C\u3076\u524D\u306B search_pages \u3067\u540C\u540D\u30DA\u30FC\u30B8\u304C\u7121\u3044\u304B\u78BA\u8A8D
2. \u91CD\u8907\u304C\u3042\u308C\u3070 user \u306B\u78BA\u8A8D
3. parent_id \u3092\u7701\u7565\u3059\u308B\u3068\u30EB\u30FC\u30C8\u306B\u4F5C\u3089\u308C\u308B\u3002\u5834\u6240\u304C\u66D6\u6627\u306A\u3089 user \u306B\u8CEA\u554F

\u26A0\uFE0F body \u306E\u91CD\u8981\u30EB\u30FC\u30EB:
- user \u304C\u5185\u5BB9\uFF08\u300C\u25CB\u25CB\u306B\u3064\u3044\u3066\u300D\u300C\u25B3\u25B3\u3092\u8981\u7D04\u300D\u300C\u5185\u5BB9\u306F\u2026\u300D\u306A\u3069\uFF09\u3092\u6307\u5B9A\u3057\u305F\u5834\u5408\u3001
  \u5FC5\u305A\u672C\u6587 markdown \u3092 body \u5F15\u6570\u306B\u6E21\u3059\u3053\u3068\u3002\u4F1A\u8A71\u30E1\u30C3\u30BB\u30FC\u30B8\u3067\u5185\u5BB9\u3092\u8AAC\u660E\u3059\u308B\u3060\u3051
  \u3067\u306F\u30C0\u30E1\u3002body \u3092\u7A7A\u306E\u307E\u307E\u3067\u30DA\u30FC\u30B8\u4F5C\u6210\u3057\u3066\u300C\u8A18\u9332\u3057\u307E\u3057\u305F\u300D\u3068\u8FD4\u3059\u306E\u306F\u7981\u6B62\u3002
- \u30BF\u30A4\u30C8\u30EB\u3060\u3051\u306E\u30DA\u30FC\u30B8\u304C\u6B32\u3057\u3044\u3068 user \u304C\u660E\u793A\u3057\u305F\u6642\u306E\u307F body \u3092\u7701\u7565\u3059\u308B
- body \u306E\u4E2D\u8EAB\u306F\u5B8C\u5168\u306A markdown \u6587\u66F8 (\u898B\u51FA\u3057 / \u7B87\u6761\u66F8\u304D\u7B49\u3092\u4F7F\u3063\u305F\u69CB\u9020\u5316\u3055\u308C\u305F\u672C\u6587)`,input_schema:{type:"object",properties:{title:{type:"string"},parent_id:{type:"string",description:"\u89AA\u30DA\u30FC\u30B8 ID\u3002\u30EB\u30FC\u30C8\u306A\u3089\u7A7A\u6587\u5B57"},body:{type:"string",description:"\u672C\u6587\u306E\u5B8C\u5168\u306A markdown\u3002user \u304C\u5185\u5BB9\u3092\u6307\u5B9A\u3057\u305F\u5834\u5408\u306F\u5FC5\u305A\u6307\u5B9A\u3059\u308B\u3002"}},required:["title"]}},{name:"update_page",description:`\u65E2\u5B58\u30DA\u30FC\u30B8\u306E\u30BF\u30A4\u30C8\u30EB\u3084\u672C\u6587\u3092\u66F4\u65B0\u3059\u308B\u3002

\u4F7F\u7528\u6761\u4EF6:
- read_page \u3067\u73FE\u5728\u306E\u5185\u5BB9\u3092\u78BA\u8A8D\u3057\u305F\u5F8C\u306B\u4F7F\u3046
- \u90E8\u5206\u4FEE\u6B63\u3067\u3082\u5168\u6587\uFF08\u4FEE\u6B63\u5F8C\u306E\u5B8C\u5168\u306A markdown\uFF09\u3092\u6E21\u3059\u3053\u3068

title / body \u306E\u3044\u305A\u308C\u304B\u3001\u307E\u305F\u306F\u4E21\u65B9\u3092\u6307\u5B9A\u3067\u304D\u308B\u3002\u6307\u5B9A\u3057\u306A\u304B\u3063\u305F\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u5909\u66F4\u3055\u308C\u306A\u3044\u3002

\u26A0\uFE0F \u65E2\u5B58\u5185\u5BB9\u3092\u4E0A\u66F8\u304D\u3059\u308B\u305F\u3081\u3001\u30DB\u30B9\u30C8\u5074\u3067 user \u306B diff \u30D7\u30EC\u30D3\u30E5\u30FC\u4ED8\u304D\u306E\u78BA\u8A8D\u30E2\u30FC\u30C0\u30EB\u304C\u51FA\u308B\u3002
user \u304C\u30AD\u30E3\u30F3\u30BB\u30EB\u3057\u305F\u5834\u5408\u306F { ok: false, error: "user_cancelled" } \u3092\u8FD4\u3059\u3002`,input_schema:{type:"object",properties:{id:{type:"string"},title:{type:"string"},body:{type:"string",description:"\u65B0\u3057\u3044 markdown \u672C\u6587\uFF08\u5168\u6587\uFF09"}},required:["id"]}},{name:"trash_page",description:`\u30DA\u30FC\u30B8\u3092\u30B4\u30DF\u7BB1\u306B\u79FB\u52D5\u3059\u308B\uFF08\u7269\u7406\u524A\u9664\u3067\u306F\u306A\u3044\uFF09\u3002

\u4F7F\u7528\u6761\u4EF6:
- user \u304C\u660E\u793A\u7684\u306B\u300C\u524A\u9664\u300D\u300C\u30B4\u30DF\u7BB1\u306B\u300D\u3068\u8A00\u3063\u305F\u3068\u304D\u306E\u307F
- \u5B50\u30DA\u30FC\u30B8\u304C\u3042\u308B\u5834\u5408\u306F\u307E\u3068\u3081\u3066\u79FB\u52D5\u3055\u308C\u308B\u65E8\u3092 user \u306B\u4F1D\u3048\u3066\u304B\u3089\u5B9F\u884C

\u26A0\uFE0F \u30DB\u30B9\u30C8\u5074\u3067\u5FC5\u305A\u78BA\u8A8D\u30E2\u30FC\u30C0\u30EB\u304C\u51FA\u308B\u3002`,input_schema:{type:"object",properties:{id:{type:"string"}},required:["id"]}},{name:"read_db_schema",description:`\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9 (PageType=database) \u306E\u5217\u30B9\u30AD\u30FC\u30DE\u3092\u53D6\u5F97\u3059\u308B\u3002
\u5217\u540D\u30FB\u5185\u90E8\u540D\u30FB\u578B (text / multiline / date / choice / bool / number) \u3092\u8FD4\u3059\u3002
list_db_rows / create_db_row / update_db_row \u3092\u547C\u3076\u524D\u306B\u5FC5\u305A\u3053\u308C\u3067\u5217\u69CB\u6210\u3092\u78BA\u8A8D\u3059\u308B\u3053\u3068\u3002`,input_schema:{type:"object",properties:{db_id:{type:"string",description:"DB \u306E page id (memola-pages \u306E Id)"}},required:["db_id"]}},{name:"list_db_rows",description:`\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306E\u884C\u4E00\u89A7\u3092\u53D6\u5F97\u3059\u308B\u3002Title \u3068\u5168\u5217\u306E\u5024\u3092\u8FD4\u3059\u3002
\u4EF6\u6570\u304C\u591A\u3044\u5834\u5408\u306F limit \u3067\u7D5E\u308B\u3053\u3068\uFF08\u65E2\u5B9A 100\uFF09\u3002\u672C\u6587 (markdown body) \u306F\u542B\u307E\u306A\u3044\u306E\u3067\u3001
\u672C\u6587\u304C\u5FC5\u8981\u306A\u884C\u306F read_db_row \u3067\u500B\u5225\u53D6\u5F97\u3002`,input_schema:{type:"object",properties:{db_id:{type:"string"},limit:{type:"integer",minimum:1,maximum:500,description:"\u6700\u5927\u884C\u6570 (\u65E2\u5B9A 100)"}},required:["db_id"]}},{name:"read_db_row",description:"\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306E 1 \u884C\u3092\u8AAD\u307F\u53D6\u308B\u3002Title\u30FB\u5404\u5217\u306E\u5024\u30FB\u672C\u6587 (markdown) \u3092\u8FD4\u3059\u3002",input_schema:{type:"object",properties:{db_id:{type:"string"},row_id:{type:"integer",description:"SP \u30EA\u30B9\u30C8\u5185\u306E\u884C ID\uFF08\u6570\u5024\uFF09"}},required:["db_id","row_id"]}},{name:"create_db",description:`\u65B0\u898F\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9 (DB) \u3092\u4F5C\u6210\u3059\u308B\u3002

\u4F7F\u7528\u6761\u4EF6:
- user \u304C\u300CDB \u3092\u4F5C\u3063\u3066\u300D\u300C\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u4F5C\u6210\u300D\u3068\u660E\u793A\u7684\u306B\u4F9D\u983C\u3057\u305F\u6642\u306E\u307F
- \u901A\u5E38\u30DA\u30FC\u30B8 (create_page) \u3067\u5341\u5206\u306A\u5185\u5BB9\u306A\u3089 DB \u306F\u4F5C\u3089\u306A\u3044\u3053\u3068

DB \u306F\u4F5C\u6210\u6642\u70B9\u3067 Title \u5217\u306E\u307F\u5B58\u5728\u3002\u7D9A\u3051\u3066 add_db_field \u3067\u5217\u3092\u8FFD\u52A0\u3067\u304D\u308B\u3002
user \u304C\u300C\u25CB\u25CB\u306E DB \u3092\u4F5C\u3063\u3066\u300D\u3068\u7528\u9014\u3092\u6307\u5B9A\u3057\u305F\u5834\u5408\u3001\u305D\u306E\u7528\u9014\u306B\u9069\u3057\u305F\u5217\u3092
\u81EA\u52D5\u3067\u63D0\u6848 \u2192 user \u78BA\u8A8D \u2192 add_db_field \u3067\u8FFD\u52A0\u3059\u308B\u306E\u304C\u671B\u307E\u3057\u3044\u3002`,input_schema:{type:"object",properties:{title:{type:"string"},parent_id:{type:"string",description:"\u89AA\u30DA\u30FC\u30B8 ID\u3002\u30EB\u30FC\u30C8\u306A\u3089\u7A7A\u6587\u5B57"}},required:["title"]}},{name:"add_db_field",description:`\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306B\u5217 (\u30D5\u30A3\u30FC\u30EB\u30C9) \u3092\u8FFD\u52A0\u3059\u308B\u3002

\u4F7F\u7528\u6761\u4EF6:
- create_db \u306E\u76F4\u5F8C\u306B\u30B9\u30AD\u30FC\u30DE\u3092\u7D44\u3080\u6642
- user \u304C\u300C\u25CB\u25CB\u5217\u3092\u8FFD\u52A0\u3057\u3066\u300D\u3068\u4F9D\u983C\u3057\u305F\u6642

type \u306B\u6307\u5B9A\u3067\u304D\u308B\u5024:
- "text"       \u2026 1\u884C\u30C6\u30AD\u30B9\u30C8
- "multiline"  \u2026 \u8907\u6570\u884C\u30C6\u30AD\u30B9\u30C8
- "date"       \u2026 \u65E5\u4ED8
- "choice"     \u2026 \u9078\u629E\u80A2\uFF08choices \u914D\u5217\u3082\u6E21\u3059\u3053\u3068\uFF09
- "bool"       \u2026 \u306F\u3044/\u3044\u3044\u3048
- "number"     \u2026 \u6570\u5024

\u8907\u6570\u5217\u3092\u4E00\u6C17\u306B\u8FFD\u52A0\u3059\u308B\u5834\u5408\u306F\u3001\u672C\u30C4\u30FC\u30EB\u3092\u9806\u756A\u306B\u8907\u6570\u56DE\u547C\u3073\u51FA\u3059\u3053\u3068
\uFF08\u4E26\u5217 tool_use \u3067\u3082 OK\uFF09\u3002

\u26A0\uFE0F \u5217\u306E\u8FFD\u52A0\u306F SP \u30EA\u30B9\u30C8\u3078\u306E\u5373\u53CD\u6620\u3067\u7834\u58CA\u7684\u3067\u306F\u306A\u3044\u304C\u3001user \u306B\u4F5C\u308B\u5217\u540D\u4E00\u89A7\u3092
\u793A\u3057\u3066\u304B\u3089\u5B9F\u884C\u3059\u308B\u306E\u304C\u671B\u307E\u3057\u3044\u3002`,input_schema:{type:"object",properties:{db_id:{type:"string"},name:{type:"string",description:"\u5217\u306E\u8868\u793A\u540D\uFF08\u65E5\u672C\u8A9E\u53EF\uFF09"},type:{type:"string",enum:["text","multiline","date","choice","bool","number"]},choices:{type:"array",items:{type:"string"},description:"type=choice \u306E\u5834\u5408\u306E\u9078\u629E\u80A2\u30EA\u30B9\u30C8"}},required:["db_id","name","type"]}},{name:"create_db_row",description:`\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306B\u884C\u3092\u8FFD\u52A0\u3059\u308B\u3002

\u624B\u9806:
1. read_db_schema \u3067\u5217\u69CB\u6210\u3092\u53D6\u5F97
2. fields \u306B\u5217\u306E InternalName \u307E\u305F\u306F Title \u3092\u30AD\u30FC\u306B\u5024\u3092\u6E21\u3059
3. \u5FC5\u8981\u306A\u3089 body \u306B\u884C\u30DA\u30FC\u30B8\u306E markdown \u672C\u6587\u3092\u6E21\u3059\uFF08memola-pages \u306B\u4FDD\u5B58\u3055\u308C\u308B\uFF09

\u5024\u306E\u5F62\u5F0F:
- text/multiline: \u6587\u5B57\u5217
- date: "YYYY-MM-DD" (JST \u3068\u3057\u3066\u6271\u308F\u308C UTC ISO \u306B\u5909\u63DB\u3055\u308C\u308B)
- choice: \u9078\u629E\u80A2\u306E\u3044\u305A\u308C\u304B\u306E\u6587\u5B57\u5217
- bool: true / false (\u307E\u305F\u306F "1" / "0")
- number: \u6570\u5024`,input_schema:{type:"object",properties:{db_id:{type:"string"},fields:{type:"object",description:"\u5217\u540D \u2192 \u5024\u306E\u30DE\u30C3\u30D7\u3002Title \u5217\u3082\u542B\u3081\u308B\u3053\u3068",additionalProperties:!0},body:{type:"string",description:"\u884C\u30DA\u30FC\u30B8\u306E markdown \u672C\u6587\uFF08\u4EFB\u610F\uFF09"}},required:["db_id","fields"]}},{name:"update_db_row",description:`\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306E\u884C\u3092\u66F4\u65B0\u3059\u308B\u3002

\u624B\u9806:
1. read_db_row \u3067\u73FE\u5728\u306E\u5024\u3092\u78BA\u8A8D
2. \u5909\u66F4\u3057\u305F\u3044\u5217\u3060\u3051\u3092 fields \u306B\u5165\u308C\u3066\u6E21\u3059\uFF08\u6307\u5B9A\u3057\u306A\u3044\u5217\u306F\u5909\u66F4\u3055\u308C\u306A\u3044\uFF09
3. body \u3092\u6E21\u3059\u3068\u884C\u30DA\u30FC\u30B8\u306E\u672C\u6587\u3082\u66F4\u65B0\u3055\u308C\u308B

\u26A0\uFE0F \u30DB\u30B9\u30C8\u5074\u3067 diff \u78BA\u8A8D\u30E2\u30FC\u30C0\u30EB\u304C\u51FA\u308B\u3002user \u304C\u30AD\u30E3\u30F3\u30BB\u30EB\u3057\u305F\u5834\u5408\u306F user_cancelled \u3092\u8FD4\u3059\u3002`,input_schema:{type:"object",properties:{db_id:{type:"string"},row_id:{type:"integer"},fields:{type:"object",description:"\u66F4\u65B0\u3059\u308B\u5217\u3060\u3051\u306E\u30DE\u30C3\u30D7",additionalProperties:!0},body:{type:"string",description:"\u65B0\u3057\u3044 markdown \u672C\u6587\uFF08\u5168\u6587\u3002\u4EFB\u610F\uFF09"}},required:["db_id","row_id"]}},{name:"delete_db_row",description:`\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u304B\u3089\u884C\u3092\u524A\u9664\u3059\u308B\u3002

\u26A0\uFE0F \u30DB\u30B9\u30C8\u5074\u3067\u78BA\u8A8D\u30C0\u30A4\u30A2\u30ED\u30B0\u304C\u51FA\u308B\u3002user_cancelled \u306E\u5834\u5408\u306F\u4E2D\u6B62\u3055\u308C\u308B\u3002
memola-pages \u4E0A\u306E\u5BFE\u5FDC\u3059\u308B\u884C\u30DA\u30FC\u30B8\u672C\u6587\u3082\u540C\u6642\u306B\u524A\u9664\u3055\u308C\u308B\uFF08\u30AB\u30B9\u30B1\u30FC\u30C9\uFF09\u3002`,input_schema:{type:"object",properties:{db_id:{type:"string"},row_id:{type:"integer"}},required:["db_id","row_id"]}}],H0=aA.map((e,t,o)=>t===o.length-1?{...e,cache_control:{type:"ephemeral"}}:e)});function z0(e){let t=e.newTitle!=null&&e.newTitle!==(e.oldTitle||""),o=e.newBody!=null&&e.newBody!==(e.oldBody||""),n='<div class="memola-diff-card"><div class="memola-diff-head"><h2>\u30DA\u30FC\u30B8\u66F4\u65B0\u306E\u78BA\u8A8D</h2><div class="memola-diff-sub">'+M(e.pageTitle||"\u7121\u984C")+" (id="+M(e.pageId)+")</div></div>";return t&&(n+='<div class="memola-diff-title-row"><div class="memola-diff-label">\u30BF\u30A4\u30C8\u30EB</div><div class="memola-diff-title-old">'+M(e.oldTitle||"")+'</div><div class="memola-diff-arrow">\u2192</div><div class="memola-diff-title-new">'+M(e.newTitle||"")+"</div></div>"),o&&(n+='<div class="memola-diff-body"><div class="memola-diff-label">\u672C\u6587\u306E\u5DEE\u5206</div><pre class="memola-diff-pre" data-body-diff="1"></pre></div>'),!t&&!o&&(n+='<div class="memola-diff-empty">\u5909\u66F4\u304C\u3042\u308A\u307E\u305B\u3093</div>'),n+='<div class="memola-diff-actions"><button class="memola-btn s" data-c="cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" data-c="ok">\u66F4\u65B0\u3059\u308B</button></div></div>',Xr({id:U0,className:"memola-diff-modal",contentHtml:n,buttons:{ok:!0,cancel:!1},cancelValue:!1,focusSel:'button[data-c="ok"]',onMounted:r=>{if(o){let a=r.querySelector("pre[data-body-diff]");a&&a.appendChild(q0(e.oldBody||"",e.newBody||""))}r.addEventListener("keydown",a=>{a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),r.querySelector('button[data-c="ok"]')?.click())})}})}function j0(e){let t=e.newBody!=null&&e.newBody!==(e.oldBody||""),o=e.fieldChanges.length>0,n='<div class="memola-diff-card"><div class="memola-diff-head"><h2>\u884C\u66F4\u65B0\u306E\u78BA\u8A8D</h2><div class="memola-diff-sub">'+M(e.dbTitle)+" #"+e.rowId+(e.rowTitle?" \u2014 "+M(e.rowTitle):"")+"</div></div>";if(o){let r=e.fieldChanges.map(a=>'<tr><td class="memola-diff-fname">'+M(a.name)+'</td><td class="memola-diff-title-old">'+M(a.oldValue||"(\u7A7A)")+'</td><td class="memola-diff-arrow">\u2192</td><td class="memola-diff-title-new">'+M(a.newValue||"(\u7A7A)")+"</td></tr>").join("");n+='<div class="memola-diff-fields"><div class="memola-diff-label">\u5217\u306E\u5909\u66F4</div><table class="memola-diff-fields-tbl">'+r+"</table></div>"}return t&&(n+='<div class="memola-diff-body"><div class="memola-diff-label">\u672C\u6587\u306E\u5DEE\u5206</div><pre class="memola-diff-pre" data-body-diff="1"></pre></div>'),!o&&!t&&(n+='<div class="memola-diff-empty">\u5909\u66F4\u304C\u3042\u308A\u307E\u305B\u3093</div>'),n+='<div class="memola-diff-actions"><button class="memola-btn s" data-c="cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" data-c="ok">\u66F4\u65B0\u3059\u308B</button></div></div>',Xr({id:U0,className:"memola-diff-modal",contentHtml:n,buttons:{ok:!0,cancel:!1},cancelValue:!1,focusSel:'button[data-c="ok"]',onMounted:r=>{if(t){let a=r.querySelector("pre[data-body-diff]");a&&a.appendChild(q0(e.oldBody||"",e.newBody||""))}r.addEventListener("keydown",a=>{a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),r.querySelector('button[data-c="ok"]')?.click())})}})}function q0(e,t){let o=iA(e.split(`
`),t.split(`
`)),n=document.createDocumentFragment();for(let r of o){let a=document.createElement("span");a.className="memola-diff-line memola-diff-"+r.type;let i=r.type==="add"?"+ ":r.type==="del"?"- ":"  ";a.textContent=i+r.line+`
`,n.appendChild(a)}return n}function iA(e,t){let o=e.length,n=t.length,r=Array.from({length:o+1},()=>new Array(n+1).fill(0));for(let l=1;l<=o;l++)for(let c=1;c<=n;c++)r[l][c]=e[l-1]===t[c-1]?r[l-1][c-1]+1:Math.max(r[l-1][c],r[l][c-1]);let a=[],i=o,s=n;for(;i>0&&s>0;)e[i-1]===t[s-1]?(a.push({type:"eq",line:e[i-1]}),i--,s--):r[i-1][s]>=r[i][s-1]?(a.push({type:"del",line:e[i-1]}),i--):(a.push({type:"add",line:t[s-1]}),s--);for(;i>0;)a.push({type:"del",line:e[i-1]}),i--;for(;s>0;)a.push({type:"add",line:t[s-1]}),s--;return a.reverse()}var U0,fh=L(()=>{"use strict";De();Gn();U0="memola-diff-modal"});function ra(e){let t=m.meta.pages.find(o=>o.id===e&&o.type==="database");return!t||!t.list?null:{listTitle:t.list,title:t.title}}async function gh(e){if(m.dbList!==e)return;m.dbItems=await Ie(e),(await Promise.resolve().then(()=>(W(),ce))).renderDbTable()}function lA(e){return e.map(t=>{let o={name:t.Title,internal:t.InternalName,type:sA[t.FieldTypeKind]||"text"};return t.Choices&&(o.choices=t.Choices),o})}function $0(e,t){let o={};for(let n of t){let r=e[n.InternalName];r!==void 0&&(o[n.InternalName]=r)}return o}function cA(e,t){return e.find(o=>o.InternalName===t)||e.find(o=>o.Title===t)||null}function dA(e,t){if(t==null)return"";switch(e.FieldTypeKind){case 8:return t===!0||t===1||t==="1"||t==="true"||t==="yes"?"1":"0";case 4:{let o=String(t).trim();if(!o)return"";let n=o.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);if(n){let a=n[1],i=n[2].padStart(2,"0"),s=n[3].padStart(2,"0");return`${a}-${i}-${s}`}let r=new Date(o);if(!isNaN(r.getTime())){let a=new Date(r.getTime()+324e5);return a.getUTCFullYear()+"-"+String(a.getUTCMonth()+1).padStart(2,"0")+"-"+String(a.getUTCDate()).padStart(2,"0")}throw new Error(`\u65E5\u4ED8\u30D5\u30A3\u30FC\u30EB\u30C9 "${e.Title}" \u306E\u5024 "${o}" \u3092\u89E3\u91C8\u3067\u304D\u307E\u305B\u3093\u3002 YYYY-MM-DD \u5F62\u5F0F (\u4F8B: 2026-05-15) \u3067\u6E21\u3057\u3066\u304F\u3060\u3055\u3044\u3002`)}case 9:{let o=Number(t);return isNaN(o)?"":String(o)}default:return String(t)}}function K0(e,t){let o={},n=[];for(let r of Object.keys(t)){if(r==="Title"){o.Title=String(t[r]??"");continue}let a=cA(e,r);if(!a){n.push(r);continue}o[a.InternalName]=dA(a,t[r])}return{payload:o,unknownKeys:n}}async function W0(e){let t=ra(e.db_id);if(!t)return it("db_not_found");let o=await Ue(t.listTitle);return vn({id:e.db_id,title:t.title,fields:lA(o)})}async function G0(e){let t=ra(e.db_id);if(!t)return it("db_not_found");let o=Math.min(Math.max(e.limit||100,1),500),[n,r]=await Promise.all([Ue(t.listTitle),Ie(t.listTitle)]),a=r.slice(0,o).map(i=>({id:i.Id,title:i.Title||"",fields:$0(i,n)}));return vn({db_id:e.db_id,total:r.length,returned:a.length,rows:a})}async function V0(e){let t=ra(e.db_id);if(!t)return it("db_not_found");let[o,n]=await Promise.all([Ue(t.listTitle),Ie(t.listTitle)]),r=n.find(i=>i.Id===e.row_id);if(!r)return it("row_not_found");let a=await io(t.listTitle,e.row_id);return vn({db_id:e.db_id,row_id:e.row_id,title:r.Title||"",fields:$0(r,o),body:a})}async function Y0(e){let t=(e.title||"").trim();if(!t)return it("title_required");let o=e.parent_id||"";if(o&&!m.pages.some(r=>r.Id===o))return it("parent_id_not_found");let n=await ys(t,o);return ao({Id:n.Id,Title:n.Title,ParentId:n.ParentId,Type:"database"}),o&&m.expanded.add(o),oe(),vn({id:n.Id,title:n.Title})}async function X0(e){let t=ra(e.db_id);if(!t)return it("db_not_found");let o=mA[e.type];if(!o)return it("invalid_type: "+e.type);if(o===6&&(!e.choices||e.choices.length===0))return it("choices_required_for_choice_type");if((await Ue(t.listTitle)).some(r=>r.Title===e.name||r.InternalName===e.name))return it("field_already_exists: "+e.name);if(await Nt(t.listTitle,e.name,o,e.choices),m.dbList===t.listTitle){let{stripInternalDbFields:r}=await Promise.resolve().then(()=>(Ke(),Ht));m.dbFields=r(await Ue(t.listTitle)),Promise.resolve().then(()=>(W(),ce)).then(a=>a.renderDbTable())}return vn({db_id:e.db_id,name:e.name,type:e.type})}async function J0(e){let t=ra(e.db_id);if(!t)return it("db_not_found");let o=await Ue(t.listTitle),{payload:n,unknownKeys:r}=K0(o,e.fields||{});if(r.length>0)return it("unknown_fields: "+r.join(", "));let a=await Hs(t.listTitle,n,e.body);return await gh(t.listTitle),vn({db_id:e.db_id,row_id:a.Id,title:n.Title||""})}async function Z0(e){let t=ra(e.db_id);if(!t)return it("db_not_found");let o=await Ue(t.listTitle),r=(await Ie(t.listTitle)).find(f=>f.Id===e.row_id);if(!r)return it("row_not_found");let{payload:a,unknownKeys:i}=K0(o,e.fields||{});if(i.length>0)return it("unknown_fields: "+i.join(", "));let s=[];for(let f of Object.keys(a)){let g=String(a[f]??""),y=f==="Title"?r.Title:r[f],b=y==null?"":String(y);if(g!==b){let h=o.find(v=>v.InternalName===f);s.push({name:h?.Title||f,oldValue:b,newValue:g})}}let l;if(e.body!=null&&(l=await io(t.listTitle,e.row_id)),s.length===0&&(e.body==null||e.body===l))return vn({no_changes:!0});if(!await j0({dbTitle:t.title,rowId:e.row_id,rowTitle:r.Title||"",fieldChanges:s,oldBody:l,newBody:e.body}))return it("user_cancelled");let d={},p={};for(let f of Object.keys(a)){let g=String(a[f]??""),y=f==="Title"?r.Title:r[f],b=y==null?"":String(y);g!==b&&(d[f]=a[f],p[f]=y??"")}if(Object.keys(d).length>0){await pt(t.listTitle,e.row_id,d);for(let f of Object.keys(d))r[f]=d[f]}let u=e.body!=null&&e.body!==l;return u&&await Eo(t.listTitle,e.row_id,e.db_id,r.Title||"",e.body),await gh(t.listTitle),Xu(t.listTitle,e.row_id,p,d,u?l:void 0,u?e.body:void 0,e.db_id),vn({db_id:e.db_id,row_id:e.row_id,changed:s.map(f=>f.name)})}async function Q0(e){let t=ra(e.db_id);return t?confirm(`${t.title} \u306E\u884C #${e.row_id} \u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F`)?(await Br(t.listTitle,e.row_id),await gh(t.listTitle),vn({db_id:e.db_id,row_id:e.row_id})):it("user_cancelled"):it("db_not_found")}var vn,it,sA,mA,eE=L(()=>{"use strict";j();Re();Ke();K();Be();fh();Mo();ye();vn=(e={})=>({ok:!0,...e}),it=e=>({ok:!1,error:e});sA={2:"text",3:"multiline",4:"date",6:"choice",8:"bool",9:"number"};mA={text:2,multiline:3,date:4,choice:6,bool:8,number:9}});function ar(e={}){return{ok:!0,...e}}function eo(e){return{ok:!1,error:e}}function uA(e){let t=!!e.include_trashed,o=m.meta.pages.filter(n=>!n.originPageId).filter(n=>t||!n.trashed).map(n=>({id:n.id,title:n.title,parent_id:n.parent||"",type:n.type||"page",...n.trashed?{trashed:!0}:{}}));return ar({pages:o})}function fA(e){let t=(e.query||"").toLowerCase();if(!t)return ar({pages:[]});let o=m.pages.filter(n=>!n.IsDraft).filter(n=>(n.Title||"").toLowerCase().includes(t)).map(n=>({id:n.Id,title:n.Title,parent_id:n.ParentId||"",type:n.Type||"page"}));return ar({pages:o})}async function gA(e){let t=String(e.id||""),o=m.pages.find(r=>r.Id===t);if(!o)return eo("page_not_found");if(o.Type==="database")return eo("cannot_read_database_body");let n=await so(t);return ar({id:t,title:o.Title||"",body:n})}async function hA(e){let t=(e.title||"").trim();if(!t)return eo("title_required");let o=e.parent_id||"";if(o&&!m.pages.some(a=>a.Id===o))return eo("parent_id_not_found");let n=o&&A(o)?.scope||"user",r=await en("\u7121\u984C",o,n);return ao(r),e.body!=null&&e.body!==""?await Na(r.Id,t,e.body):await za(r.Id,t),Aa(r.Id,t),o&&m.expanded.add(o),oe(),ar({id:r.Id,title:t})}async function bA(e){let t=String(e.id||""),o=m.pages.find(c=>c.Id===t);if(!o)return eo("page_not_found");if(o.Type==="database")return eo("cannot_update_database_body");let n=o.Title||"",r=e.title!=null?e.title:n,a,i,s;if(e.body!=null&&(a=await so(t),i=e.body,s=(await ct(t))?.etag||void 0),!await z0({pageId:t,pageTitle:n,oldTitle:n,newTitle:e.title!=null?r:void 0,oldBody:a,newBody:i}))return eo("user_cancelled");if(r===n&&i===a)return ar({id:t,no_changes:!0});if(e.body!=null){if(!(await Na(t,r,i||"",s)).ok)return eo("conflict_other_user_updated_page")}else r!==n&&await za(t,r);if(Aa(t,r),oe(),m.currentId===t&&!m.currentRow){if(e.body!=null){let{loadBlocks:d}=await Promise.resolve().then(()=>(ht(),Bo));d(Ge(i||""))}if(r!==n){let d=E("ttl");d&&(d.value=r,En(d))}let c=await ct(t).catch(()=>null);if(c){let{saver:d}=await Promise.resolve().then(()=>(ft(),Ka));d.loadPage({pageId:t,body:i||"",title:r,etag:c.etag,modified:c.modified})}}return ar({id:t,title:r})}async function vA(e){let t=String(e.id||""),o=m.pages.find(i=>i.Id===t);if(!o)return eo("page_not_found");let n=Zo(m.pages,t),r=n.length-1,a=r>0?`\u300C${o.Title||"\u7121\u984C"}\u300D\u3068\u5B50\u30DA\u30FC\u30B8 ${r} \u4EF6\u3092\u30B4\u30DF\u7BB1\u306B\u79FB\u52D5\u3057\u307E\u3059\u304B\uFF1F`:`\u300C${o.Title||"\u7121\u984C"}\u300D\u3092\u30B4\u30DF\u7BB1\u306B\u79FB\u52D5\u3057\u307E\u3059\u304B\uFF1F`;return confirm(a)?(await Is(t),wo(n),m.currentId!==null&&n.includes(m.currentId)&&(m.currentId=null),oe(),ar({trashed_ids:n})):eo("user_cancelled")}async function tE(e,t){console.log("[Memola tool]",e,t);let o;try{switch(e){case"list_pages":o=uA(t);break;case"search_pages":o=fA(t);break;case"read_page":o=await gA(t);break;case"create_page":o=await hA(t);break;case"update_page":o=await bA(t);break;case"trash_page":o=await vA(t);break;case"read_db_schema":o=await W0(t);break;case"list_db_rows":o=await G0(t);break;case"read_db_row":o=await V0(t);break;case"create_db":o=await Y0(t);break;case"add_db_field":o=await X0(t);break;case"create_db_row":o=await J0(t);break;case"update_db_row":o=await Z0(t);break;case"delete_db_row":o=await Q0(t);break;default:o=eo("unknown_tool: "+e)}}catch(n){o=eo(n.message||"unknown_error")}return JSON.stringify(o)}var oE=L(()=>{"use strict";j();K();Tt();Be();fh();hr();ye();me();le();eE()});async function nE(e,t,o,n){let r=e.slice(),a=[],i=[],s=[];for(let c=0;c<yA;c++){if(n?.aborted)throw new Error("aborted");let{dispatchChat:d}=await Promise.resolve().then(()=>(Bm(),Am)),p=await d({messages:r,system:t,tools:H0,signal:n,stream:o?{onText:o}:void 0}),u={role:"assistant",content:p.content};r.push(u),a.push(u);for(let b of p.content)b.type==="text"&&b.text.trim()&&s.push(b.text);if(p.stop_reason==="end_turn"||p.stop_reason==="stop_sequence"||p.stop_reason!=="tool_use")break;let f=p.content.filter(b=>b.type==="tool_use");if(f.length===0)break;let g=[];for(let b of f){let h=await tE(b.name,b.input);g.push({type:"tool_result",tool_use_id:b.id,content:h});let v=!1;try{v=!!JSON.parse(h).ok}catch{}i.push({name:b.name,ok:v})}let y={role:"user",content:g};r.push(y),a.push(y)}let l=s[s.length-1]||"";return!l&&i.length>0&&(l="("+i.length+" \u4EF6\u306E\u30C4\u30FC\u30EB\u3092\u5B9F\u884C\u3057\u307E\u3057\u305F)"),{newMessages:a,finalText:l,toolTrace:i}}var yA,rE=L(()=>{"use strict";F0();oE();yA=12});var ji={};q(ji,{applyAiPanelState:()=>yh,applyModelPick:()=>CA,cancelAiMessage:()=>cE,clearAiHistory:()=>kh,closeAiPanel:()=>Jm,configureApiKey:()=>_A,getQuickPrompts:()=>wh,loadAiSession:()=>bh,newAiSession:()=>Xm,openAiPanel:()=>vh,renderAiMessages:()=>aa,renderHistoryDropdown:()=>ir,sendAiMessage:()=>Ul,syncProviderBadge:()=>xh,toggleAiPanel:()=>Fl});function zi(){let e=ec.get();if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function hh(e){ec.set(JSON.stringify(e.slice(0,xA)))}function iE(e){for(let t of e)if(t.role==="user"&&typeof t.content=="string")return t.content;return"\u4F1A\u8A71"}function kA(){if(m.ai.messages.length===0)return;let e=zi(),t=iE(m.ai.messages).slice(0,24)||"\u4F1A\u8A71";if(!Dt)Dt="sess-"+Date.now(),e.unshift({id:Dt,title:t,created:Date.now(),messages:[...m.ai.messages]});else{let o=e.find(n=>n.id===Dt);o?(o.messages=[...m.ai.messages],o.aiTitled||(o.title=t)):e.unshift({id:Dt,title:t,created:Date.now(),messages:[...m.ai.messages]})}hh(e),wA()}async function wA(){if(!Dt||!qr())return;let t=zi().find(r=>r.id===Dt);if(!t||t.aiTitled||!t.messages.some(r=>r.role!=="assistant"?!1:typeof r.content=="string"?r.content.trim().length>0:r.content.some(a=>a.type==="text"&&a.text.trim().length>0)))return;let n=iE(t.messages).slice(0,240);if(n)try{let r=await Promise.resolve().then(()=>(At(),$n)),a=`\u30E6\u30FC\u30B6\u30FC\u306E\u4F1A\u8A71\u306E\u6700\u521D\u306E\u767A\u8A71\u304B\u3089\u300120\u6587\u5B57\u4EE5\u5185\u306E\u7C21\u6F54\u306A\u65E5\u672C\u8A9E\u30BF\u30A4\u30C8\u30EB\u3092 1 \u3064\u3060\u3051\u8FD4\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u8A18\u53F7\u30FB\u5F15\u7528\u7B26\u30FB\u300C\u300D\u306F\u4E0D\u8981\u3001\u30BF\u30A4\u30C8\u30EB\u672C\u4F53\u306E\u307F\u3002\u8A9E\u5C3E\u306E\u53E5\u70B9\u3082\u4E0D\u8981\u3002

\u767A\u8A71: `+n,i="",s=r.getProvider();if(s==="corp"){if(!r.getCorpAiKey())return;i=await(await Promise.resolve().then(()=>(Lm(),Kg))).corpAiChatText({messages:[{role:"user",content:a}],maxTokens:60}).catch(()=>"")}else if(s==="local"){if(!r.getLocalAiBaseUrl()||!r.getLocalAiModel())return;i=await(await Promise.resolve().then(()=>(Gg(),Wg))).localAiChatText({messages:[{role:"user",content:a}],maxTokens:60}).catch(()=>"")}else{let{callClaudeRaw:p}=await Promise.resolve().then(()=>(si(),Cf));i=(await p({messages:[{role:"user",content:a}],model:r.getClaudeModel(),maxTokens:60})).content.filter(f=>f.type==="text").map(f=>f.text).join("")}let l=i.trim().replace(/^["'「『]|["'」』]$/g,"").slice(0,30);if(!l)return;let c=zi(),d=c.find(p=>p.id===Dt);if(!d)return;d.title=l,d.aiTitled=!0,hh(c),ir()}catch{}}function bh(e){let t=zi().find(o=>o.id===e);t&&(Dt=e,m.ai.messages=[...t.messages],aa(),ir())}function Xm(){Dt=null,m.ai.messages=[],aa(),ir()}function ir(){let e=document.getElementById("memola-ai-hist");if(!e)return;let t=zi();e.innerHTML='<option value="__new__">+ \u65B0\u3057\u3044\u4F1A\u8A71</option>'+t.map(o=>'<option value="'+o.id+'"'+(o.id===Dt?" selected":"")+">"+EA(o.title||"\u4F1A\u8A71")+"</option>").join("")}function EA(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function TA(){let e=m.currentId||"";if(!e)return"";if(m.currentType==="database"&&!m.currentRow)return SA(e);let t=E("ttl"),o=t&&t.value||"",n=Ve(pn()),r=["\u2500\u2500 \u73FE\u5728\u958B\u3044\u3066\u3044\u308B\u30DA\u30FC\u30B8 \u2500\u2500",`id: ${e}`,`title: ${o}`];n.trim()&&r.push("","body (markdown):",n),Ym&&r.push("",Ym);let a=gf();return a&&r.push("",a),r.join(`
`)}async function LA(){Ym="";let e;try{e=pn()}catch{return}let t=e.filter(n=>n.kind==="email");if(!t.length)return;let o=[];for(let n of t){if(!n.fileUrl)continue;let r=await _k(n.fileUrl,n.filename||""),a=r?.subject||n.subject||"(\u4EF6\u540D\u306A\u3057)",i=r?[r.fromName,r.fromEmail].filter(Boolean).join(" "):n.from,s=r?.dateISO||n.date||"",l=r?Rk(r):"",c=l,d="";l.length>Vm?(c=l.slice(0,Vm),d=`\uFF08\u6CE8: \u3053\u306E\u30E1\u30FC\u30EB\u672C\u6587\u306F\u5148\u982D ${Vm} \u5B57\u306E\u307F\u3002\u5143\u306F\u7D04 ${l.length} \u5B57\u3067\u3001\u6B8B\u308A ${l.length-Vm} \u5B57\u3092\u7701\u7565\u3057\u3066\u3044\u307E\u3059\uFF09`):l||(d="\uFF08\u6CE8: \u672C\u6587\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u4EF6\u540D\u30FB\u5DEE\u51FA\u4EBA\u306E\u307F\uFF09");let p=["\u2500\u2500 \u6DFB\u4ED8\u30E1\u30FC\u30EB \u2500\u2500",`\u4EF6\u540D: ${a}`];i&&p.push(`\u5DEE\u51FA\u4EBA: ${i}`),s&&p.push(`\u65E5\u6642: ${s}`),p.push("\u672C\u6587:",c),d&&p.push(d),o.push(p.join(`
`))}Ym=o.join(`

`)}function SA(e){let t=A(e)?.title||"",o=m.dbFields,n=["Title",...o.map(s=>s.Title)],r=s=>String(s??"").replace(/\r?\n/g," ").replace(/\|/g,"\\|"),a=60,i=["\u2500\u2500 \u73FE\u5728\u958B\u3044\u3066\u3044\u308B\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9 (\u4E00\u89A7) \u2500\u2500",`id: ${e}`,`title: ${t}`,`\u5217: ${n.join(", ")}`,`\u884C\u6570: ${m.dbItems.length}`,"","\u884C (markdown table):","| "+n.join(" | ")+" |","| "+n.map(()=>"---").join(" | ")+" |"];for(let s of m.dbItems.slice(0,a)){let l=s,c=n.map(d=>{if(d==="Title")return r(l.Title);let p=o.find(u=>u.Title===d);return r(p?l[p.InternalName]??l[p.Title]:"")});i.push("| "+c.join(" | ")+" |")}return m.dbItems.length>a&&i.push(`\u2026 \u4ED6 ${m.dbItems.length-a} \u884C(\u8868\u793A\u4E0A\u9650\u306E\u305F\u3081\u7701\u7565)`),i.join(`
`)}function MA(){let e=[{type:"text",text:PA,cache_control:{type:"ephemeral"}}],t=[xb()],o=TA();return o&&(t.push(""),t.push(o)),e.push({type:"text",text:t.join(`
`)}),e}function vh(){m.ai.panelOpen=!0,E("ai-panel").classList.add("on"),document.getElementById("memola-ai-btn")?.classList.add("on"),es.set("1"),xh(),sE(),aa(),setTimeout(()=>E("ai-input").focus(),50)}function Jm(){m.ai.panelOpen=!1,E("ai-panel").classList.remove("on"),document.getElementById("memola-ai-btn")?.classList.remove("on"),es.set("0")}function yh(){es.get()==="1"&&vh()}function Fl(){m.ai.panelOpen?Jm():vh()}async function sE(){let e=await Promise.resolve().then(()=>(At(),$n)),t=e.getProvider();return t==="corp"?e.getCorpAiKey()?!0:(w("Azure OpenAI \u4E92\u63DB API \u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059\u3002\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u2699 \u8A2D\u5B9A\u300D\u304B\u3089\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044","err"),!1):t==="local"?e.getLocalAiBaseUrl()?e.getLocalAiModel()?!0:(w("\u30ED\u30FC\u30AB\u30EB AI \u306E\u30E2\u30C7\u30EB\u540D\u304C\u672A\u8A2D\u5B9A\u3067\u3059\u3002\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u2699 \u8A2D\u5B9A\u300D\u304B\u3089\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044","err"),!1):(w("\u30ED\u30FC\u30AB\u30EB AI \u306E\u30D9\u30FC\u30B9 URL \u304C\u672A\u8A2D\u5B9A\u3067\u3059\u3002\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u2699 \u8A2D\u5B9A\u300D\u304B\u3089\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044","err"),!1):qr()?!0:(w("Claude API \u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059\u3002\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u2699 \u8A2D\u5B9A\u300D\u304B\u3089\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044","err"),!1)}function xh(){let e=document.getElementById("memola-ai-model-pick");e&&Promise.resolve().then(()=>(At(),$n)).then(t=>{let o=t.getProvider(),n=t.getClaudeModel(),r=t.getCorpAiModel(),a=t.getLocalAiModel(),i=o+":"+(o==="corp"?r:o==="local"?a:n);e.innerHTML="";let s=document.createElement("optgroup");s.label="Claude";for(let d of t.CLAUDE_MODELS){let p=document.createElement("option");p.value="claude:"+d.id,p.textContent=d.label,s.appendChild(p)}e.appendChild(s);let l=document.createElement("optgroup");l.label="Azure OpenAI \u4E92\u63DB";for(let d of t.CORP_AI_MODELS){let p=document.createElement("option");p.value="corp:"+d.id,p.textContent=d.id,l.appendChild(p)}e.appendChild(l);let c=t.getLocalAiModels();if(c.length>0||a){let d=document.createElement("optgroup");d.label="\u30ED\u30FC\u30AB\u30EB AI";let p=new Set;for(let u of[a,...c]){if(!u||p.has(u))continue;p.add(u);let f=document.createElement("option");f.value="local:"+u,f.textContent=u,d.appendChild(f)}e.appendChild(d)}e.value=i})}async function CA(e){let t=e.indexOf(":");if(t<0)return;let o=e.substring(0,t),n=e.substring(t+1);if(o!=="claude"&&o!=="corp"&&o!=="local")return;let r=await Promise.resolve().then(()=>(At(),$n));r.setProvider(o),o==="claude"?r.setClaudeModel(n):o==="corp"?r.setCorpAiModel(n):o==="local"&&r.setLocalAiModel(n),xh()}function AA(e){return M(e).replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>")}function lE(e){return e.split(/\r?\n/).map(AA).join("<br>")}function BA(e){if(typeof e.content=="string")return e.role==="user"?{text:e.content,toolNames:[]}:{text:e.content,toolNames:[]};let t=e.content;if(t.every(a=>a.type==="tool_result"))return null;let n=t.filter(a=>a.type==="text").map(a=>a.text).join(`
`),r=t.filter(a=>a.type==="tool_use").map(a=>a.name);return{text:n,toolNames:r}}function aa(){let e=E("ai-messages");if(e.innerHTML="",m.ai.messages.length===0){let t=document.createElement("div");t.className="memola-ai-empty",t.innerHTML='<div class="memola-ai-empty-title">\u3053\u306E\u30DA\u30FC\u30B8\u306B\u3064\u3044\u3066\u8CEA\u554F\u3067\u304D\u307E\u3059</div><div class="memola-ai-empty-sub">\u4E0B\u306E\u30C1\u30C3\u30D7\u304B\u3089\u59CB\u3081\u308B\u304B\u3001\u81EA\u7531\u306B\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044</div>',e.appendChild(t)}for(let t of m.ai.messages){let o=BA(t);if(!o||!o.text&&o.toolNames.length===0)continue;let n=document.createElement("div");n.className="memola-ai-row";let r=document.createElement("div");r.className="memola-ai-label",r.textContent=t.role==="user"?"\u3042\u306A\u305F":"AI";let a=document.createElement("div");a.className="memola-ai-msg memola-ai-"+t.role;let i=o.text?lE(o.text):"";if(o.toolNames.length>0){let s='<div class="memola-ai-trace">\u2014 \u5B9F\u884C: '+o.toolNames.map(l=>"\u{1F527} "+M(l)).join(" / ")+"</div>";i+=s}a.innerHTML=i,n.append(r,a),e.appendChild(n)}if(m.ai.loading){let t=document.createElement("div");t.className="memola-ai-row";let o=document.createElement("div");o.className="memola-ai-label",o.textContent="AI";let n=document.createElement("div");n.className="memola-ai-msg memola-ai-assistant memola-ai-loading",n.textContent="\u8003\u3048\u4E2D\u2026",t.append(o,n),e.appendChild(t)}e.scrollTop=e.scrollHeight}function cE(){Ui&&(Ui.abort(),Ui=null)}async function Ul(e){if(Ui){cE();return}let t=e.trim();if(!t||!await sE())return;m.ai.messages.push({role:"user",content:t}),m.ai.loading=!0,aa(),aE();let o=E("ai-input");o.value="",o.style.height="";let n="";function r(i){n+=i,DA(n)}let a=new AbortController;Ui=a;try{await LA();let i=await nE(m.ai.messages,MA(),r,a.signal);m.ai.messages.push(...i.newMessages)}catch(i){let s=i;s.name==="AbortError"||s.message==="aborted"?m.ai.messages.push({role:"assistant",content:"\uFF08\u4E2D\u65AD\u3057\u307E\u3057\u305F\uFF09"}):(w("AI\u5931\u6557: "+s.message,"err"),m.ai.messages.push({role:"assistant",content:"\u26A0\uFE0F "+s.message}))}finally{Ui=null,m.ai.loading=!1,aa(),aE(),kA(),ir()}}function DA(e){let t=E("ai-messages"),o=document.getElementById("memola-ai-streaming");if(!o){let n=document.createElement("div");n.className="memola-ai-row",n.id="memola-ai-streaming-row";let r=document.createElement("div");r.className="memola-ai-label",r.textContent="AI",o=document.createElement("div"),o.className="memola-ai-msg memola-ai-assistant",o.id="memola-ai-streaming",n.append(r,o),t.querySelectorAll(".memola-ai-loading").forEach(a=>a.parentElement?.remove()),t.appendChild(n)}o.innerHTML=lE(e),t.scrollTop=t.scrollHeight}function aE(){let e=document.getElementById("memola-ai-send");if(!e)return;let t=m.ai.loading;e.classList.toggle("stop",t),e.title=t?"\u4E2D\u65AD":"\u9001\u4FE1 (\u2318\u21B5)",Promise.resolve().then(()=>(ns(),gb)).then(({ICONS:o})=>{e.innerHTML=t?o.stop:o.send})}function kh(){if(m.ai.messages.length!==0&&confirm("\u73FE\u5728\u306E\u4F1A\u8A71\u3092\u30AF\u30EA\u30A2\u3057\u307E\u3059\u304B\uFF1F(\u5C65\u6B74\u304B\u3089\u3082\u524A\u9664\u3055\u308C\u307E\u3059)")){if(Dt){let e=zi().filter(t=>t.id!==Dt);hh(e)}Dt=null,m.ai.messages=[],aa(),ir()}}function _A(){w("API \u30AD\u30FC\u306F\u300C\u2699 \u8A2D\u5B9A\u300D (\u30B5\u30A4\u30C9\u30D0\u30FC) \u304B\u3089\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044")}function wh(){return IA}var xA,Dt,IA,Vm,Ym,PA,Ui,sr=L(()=>{"use strict";j();me();le();si();rE();Tt();rg();ht();De();vo();ye();Ao();ve();xA=20;Dt=null;IA=[{label:"\u8981\u7D04",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u5185\u5BB9\u30923\u884C\u3067\u8981\u7D04\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{label:"\u6539\u7A3F",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u672C\u6587\u3092\u3088\u308A\u8AAD\u307F\u3084\u3059\u304F\u3001\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u306B\u66F8\u304D\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{label:"\u7FFB\u8A33",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u672C\u6587\u3092\u82F1\u8A9E\u306B\u7FFB\u8A33\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{label:"\u30A2\u30AF\u30B7\u30E7\u30F3\u62BD\u51FA",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u5185\u5BB9\u304B\u3089\u3001ToDo\u30FB\u30A2\u30AF\u30B7\u30E7\u30F3\u30A2\u30A4\u30C6\u30E0\u3092\u7B87\u6761\u66F8\u304D\u3067\u62BD\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002"}];Vm=5e3,Ym="";PA=`\u3042\u306A\u305F\u306F Memola (Notion\u98A8 SharePoint\u9023\u643A\u30CE\u30FC\u30C8\u30A2\u30D7\u30EA) \u306E AI \u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u3067\u3059\u3002
\u7C21\u6F54\u3067\u89AA\u3057\u307F\u3084\u3059\u3044\u65E5\u672C\u8A9E\u3067\u56DE\u7B54\u3057\u3066\u304F\u3060\u3055\u3044\u3002

\u26A0\uFE0F \u30DA\u30FC\u30B8\u306E\u4F5C\u6210\u30FB\u66F4\u65B0\u30FB\u524A\u9664\u306F\u5FC5\u305A\u30C4\u30FC\u30EB\u3067\u5B9F\u884C\u3059\u308B\u3053\u3068:
- \u300C\u5185\u5BB9\u3092\u8FFD\u52A0\u3057\u305F\u300D\u300C\u25CB\u25CB\u3092\u8A18\u9332\u3057\u305F\u300D\u3068\u767A\u8A00\u3059\u308B\u5834\u5408\u3001\u305D\u306E\u524D\u306B\u5FC5\u305A\u8A72\u5F53\u3059\u308B
  \u30C4\u30FC\u30EB (create_page / update_page / trash_page) \u3092\u547C\u3073\u51FA\u3057\u3066\u3044\u308B\u3053\u3068\u3002
- \u30C4\u30FC\u30EB\u3092\u547C\u3070\u305A\u306B\u300C\u3084\u308A\u307E\u3057\u305F\u300D\u3068\u8FD4\u3059\u306E\u306F\u7981\u6B62\uFF08user \u304C\u5B9F\u5BB3\u3092\u53D7\u3051\u308B\uFF09\u3002

\u26A0\uFE0F \u73FE\u5728\u958B\u3044\u3066\u3044\u308B\u30DA\u30FC\u30B8\u3092\u7DE8\u96C6\u3059\u308B\u5834\u5408:
- system \u30D7\u30ED\u30F3\u30D7\u30C8\u672B\u5C3E\u306E\u300C\u73FE\u5728\u958B\u3044\u3066\u3044\u308B\u30DA\u30FC\u30B8\u300D\u30D6\u30ED\u30C3\u30AF\u306E id \u3092 update_page
  \u306E id \u5F15\u6570\u306B\u6E21\u3059\u3053\u3068\u3002\u6539\u3081\u3066 search_pages \u3067\u691C\u7D22\u3059\u308B\u5FC5\u8981\u306F\u7121\u3044\u3002
- \u65E2\u5B58\u30DA\u30FC\u30B8\u4FEE\u6B63\u306F: \u2460 body \u5168\u6587\u3092\u7D44\u307F\u7ACB\u3066 \u2192 \u2461 update_page \u3092\u547C\u3076\u3002
- \u90E8\u5206\u4FEE\u6B63\u3067\u3082 update_page \u306B\u306F\u65B0\u3057\u3044\u5B8C\u5168\u306A markdown \u5168\u6587\u3092\u6E21\u3059\u3053\u3068\u3002

\u26A0\uFE0F create_page / update_page \u306E body \u5F15\u6570:
- user \u304C\u5185\u5BB9\u3092\u6307\u5B9A\u3057\u305F\u5834\u5408\u3001\u5FC5\u305A body \u306B\u5B8C\u5168\u306A markdown \u3092\u6E21\u3059\u3053\u3068\u3002
- \u4F1A\u8A71\u30E1\u30C3\u30BB\u30FC\u30B8\u3067\u5185\u5BB9\u3092\u8AAC\u660E\u3059\u308B\u3060\u3051\u3067 body \u3092\u7701\u7565\u3059\u308B\u306E\u306F\u7D76\u5BFE\u7981\u6B62\u3002
- body \u306F\u898B\u51FA\u3057\u30FB\u7B87\u6761\u66F8\u304D\u7B49\u3067\u69CB\u9020\u5316\u3055\u308C\u305F\u5B8C\u6210\u3055\u308C\u305F\u6587\u66F8\u306B\u3059\u308B\u3002

\u26A0\uFE0F \u30C7\u30FC\u30BF\u30D9\u30FC\u30B9 (DB) \u64CD\u4F5C:
- DB \u306E\u884C\u3092\u8FFD\u52A0/\u66F4\u65B0/\u53C2\u7167\u3059\u308B\u524D\u306B\u3001\u5FC5\u305A read_db_schema \u3067\u5217\u69CB\u6210\u3092\u53D6\u5F97\u3059\u308B\u3053\u3068\u3002
  AI \u304C\u77E5\u3089\u306A\u3044\u5217\u540D\u3092\u52DD\u624B\u306B\u4F7F\u3046\u3068 unknown_fields \u30A8\u30E9\u30FC\u306B\u306A\u308B\u3002
- \u5217\u306E\u8FFD\u52A0\u306F add_db_field \u3067\u884C\u3048\u308B\u3002create_db \u76F4\u5F8C\u306B\u5FC5\u8981\u306A\u5217\u3092\u9806\u6B21\u8FFD\u52A0\u3059\u308B\u3053\u3068\u3002
  user \u304C\u300C\u25CB\u25CB DB \u3092\u4F5C\u3063\u3066\u300D\u3068\u8A00\u3063\u305F\u5834\u5408\u3001\u7528\u9014\u306B\u5408\u3063\u305F\u5217\u69CB\u6210\u3092\u63D0\u6848 \u2192 user \u78BA\u8A8D
  \u2192 create_db \u2192 add_db_field \u3092\u9806\u306B\u547C\u3093\u3067\u5B8C\u6210\u3055\u305B\u308B\u3002
- \u884C\u4F5C\u6210\u306F create_db_row\u3002fields \u306B\u5217\u540D\u2192\u5024\u306E\u30DE\u30C3\u30D7\u3092\u6E21\u3059\uFF08\u5FC5\u305A Title \u3092\u542B\u3081\u308B\uFF09\u3002
- \u884C\u66F4\u65B0\u306F update_db_row\u3002\u5909\u66F4\u3057\u305F\u3044\u5217\u3060\u3051 fields \u306B\u5165\u308C\u308B\u3002
- \u884C\u524A\u9664\u306F delete_db_row\u3002\u78BA\u8A8D\u30C0\u30A4\u30A2\u30ED\u30B0\u304C\u51FA\u308B\u3002
- DB \u81EA\u4F53\u306E\u524A\u9664\u306F trash_page (PageType=database \u306E\u30DA\u30FC\u30B8\u3068\u3057\u3066\u6271\u3046)\u3002
- \u65E5\u4ED8\u306F **\u5FC5\u305A "YYYY-MM-DD" \u5F62\u5F0F** \u3067\u6E21\u3059\u3053\u3068\uFF08\u4F8B: "2026-05-15"\uFF09\u3002
  \u300C\u4ECA\u9031\u672B\u300D\u300C\u672A\u5B9A\u300D\u7B49\u306E\u81EA\u7136\u8A00\u8A9E\u3084\u7A7A\u6587\u5B57\u3092\u6E21\u3059\u3068 SP \u304C\u62D2\u5426\u3059\u308B\u3002
  \u65E5\u4ED8\u672A\u6307\u5B9A\u306E\u5834\u5408\u306F fields \u304B\u3089\u305D\u306E\u30AD\u30FC\u81EA\u4F53\u3092\u7701\u304F\u3053\u3068\uFF08null/\u7A7A\u6587\u5B57\u3092\u5165\u308C\u306A\u3044\uFF09\u3002
- user \u304C\u300C\u4ECA\u65E5\u300D\u300C\u660E\u65E5\u300D\u300C\u6765\u9031\u672B\u300D\u7B49\u306E\u76F8\u5BFE\u65E5\u4ED8\u3092\u8A00\u3063\u305F\u5834\u5408\u3001system \u30D7\u30ED\u30F3\u30D7\u30C8
  \u672B\u5C3E\u306E\u300C\u73FE\u5728\u306E\u65E5\u6642\u300D\u30D6\u30ED\u30C3\u30AF\u3092\u57FA\u6E96\u306B YYYY-MM-DD \u306B\u5909\u63DB\u3059\u308B\u3053\u3068\u3002

\u305D\u306E\u4ED6:
- create_page \u306E\u524D\u306B search_pages \u3067\u91CD\u8907\u78BA\u8A8D\u3059\u308B\u3053\u3068
- \u524A\u9664\u3084\u66F4\u65B0\u306E\u524D\u306B user \u306B\u610F\u56F3\u3092\u78BA\u8A8D\u3059\u308B\u3053\u3068\uFF08\u30DB\u30B9\u30C8\u5074\u3067\u3082\u78BA\u8A8D\u30E2\u30FC\u30C0\u30EB\u304C\u51FA\u308B\uFF09`;Ui=null});function Zm(e){let t=e;if(!t)return!1;let o=t.tagName;return!!(o==="INPUT"||o==="TEXTAREA"||o==="SELECT"||t.isContentEditable)}function RA(){Promise.resolve().then(()=>(Hl(),O0)).then(e=>e.openSearch())}function dE(){Promise.resolve().then(()=>(sr(),ji)).then(e=>e.toggleAiPanel())}function Qm(e){let t=e.ctrlKey||e.metaKey,o=t&&!e.shiftKey&&(e.key==="z"||e.key==="Z"),n=t&&(e.shiftKey&&(e.key==="z"||e.key==="Z")||!e.shiftKey&&(e.key==="y"||e.key==="Y"));if(o||n){if(m.currentType==="database"&&m.dbList&&!Zm(e.target)){e.preventDefault();let r=n;Promise.resolve().then(()=>(Mo(),sd)).then(async a=>{try{(r?await a.redoDb(m.dbList):await a.undoDb(m.dbList))||w(r?"\u518D\u5B9F\u884C\u3067\u304D\u308B\u64CD\u4F5C\u304C\u3042\u308A\u307E\u305B\u3093":"\u53D6\u308A\u6D88\u3059\u64CD\u4F5C\u304C\u3042\u308A\u307E\u305B\u3093")}catch(i){w((r?"\u518D\u5B9F\u884C":"\u53D6\u308A\u6D88\u3057")+"\u5931\u6557: "+i.message,"err")}});return}if(n&&!e.shiftKey&&(e.key==="y"||e.key==="Y")&&Zm(e.target)){e.preventDefault();try{document.execCommand("redo")}catch{}return}}if(t&&(e.key==="a"||e.key==="A")&&!e.shiftKey&&m.currentType==="database"&&m.dbList&&!Zm(e.target)){e.preventDefault(),Promise.resolve().then(()=>(W(),ce)).then(r=>{r.getSortedFilteredItems().forEach(i=>m.dbSelected.add(i.Id)),r.renderDbTable()});return}if(t&&e.key==="s"){e.preventDefault(),vt();return}if(t&&e.key==="k"){e.preventDefault(),RA();return}if(t&&e.key==="j"){e.preventDefault(),dE();return}if(e.key==="?"&&!t&&!Zm(e.target)){e.preventDefault(),Promise.resolve().then(()=>(Km(),ah)).then(r=>r.openShortcutsModal());return}if(t&&(e.key==="\\"||e.code==="Backslash")){e.preventDefault(),document.getElementById("memola-sb-toggle")?.click();return}if(t&&(e.key==="["||e.code==="BracketLeft")){e.preventDefault(),Promise.resolve().then(()=>(Fn(),ei)).then(r=>r.goBack());return}if(t&&(e.key==="]"||e.code==="BracketRight")){e.preventDefault(),Promise.resolve().then(()=>(Fn(),ei)).then(r=>r.goForward());return}if(t&&e.shiftKey){let r=e.key.toLowerCase();if(r==="l"){e.preventDefault(),Promise.resolve().then(()=>(bi(),wg)).then(a=>a.toggleOutline());return}if(r==="r"){e.preventDefault(),Promise.resolve().then(()=>(vi(),Eg)).then(a=>a.togglePropertiesPanel());return}if(r==="f"){e.preventDefault(),document.getElementById("memola-overlay")?.classList.toggle("focus-mode");return}if(r==="a"){e.preventDefault(),dE();return}if(r==="n"){e.preventDefault();return}}if(t&&e.key.toLowerCase()==="n"&&!e.shiftKey){e.preventDefault(),ho("");return}if(e.key==="Escape"){if(e.repeat||NA())return;ep()}}function NA(){let e=document.querySelector(".memola-cmt-float, .memola-blk-menu, #memola-dbcolor-pop, #memola-ws-menu, #memola-shortcuts-md");if(e)return e.remove(),!0;if(E("qs").classList.contains("on"))return qo(),!0;let t=document.getElementById("memola-emoji");if(t?.classList.contains("on"))return t.classList.remove("on"),!0;for(let o of["memola-trash-md","memola-settings-md","memola-col-md","memola-inbox-md","memola-create-menu","memola-pgm"]){let n=document.getElementById(o);if(n?.classList.contains("on"))return n.classList.remove("on"),!0}for(let o of["memola-drafts-md","memola-versions-md"]){let n=document.getElementById(o);if(n&&n.style.display==="flex")return n.style.display="none",!0}return E("ai-panel").classList.contains("on")?(Promise.resolve().then(()=>(sr(),ji)).then(o=>o.closeAiPanel()),!0):lg()?(cg(),!0):!1}var Eh=L(()=>{"use strict";j();me();le();ht();Hl();gt();yn()});var pE={};q(pE,{confirmClose:()=>FA});async function FA(e){if(Date.now()-mE<HA)return!1;let t='<div class="memola-close-confirm-box"><div class="memola-close-confirm-msg">'+M(e).replace(/\n/g,"<br>")+'</div><div class="memola-close-confirm-btns"><button class="memola-btn s" data-c="cancel" autofocus>\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" data-c="ok">\u9589\u3058\u308B</button></div></div>',o=await Xr({id:OA,className:"memola-close-confirm-md",contentHtml:t,buttons:{ok:!0,cancel:!1},cancelValue:!1,focusSel:'button[data-c="cancel"]',onMounted:n=>{n.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),r.stopPropagation(),n.querySelector('button[data-c="ok"]')?.click())})}});return o||(mE=Date.now()),o}var OA,mE,HA,uE=L(()=>{"use strict";De();Gn();OA="memola-close-confirm",mE=0,HA=800});async function ho(e){try{R(!0,"\u30DA\u30FC\u30B8\u3092\u4F5C\u6210\u4E2D...");let t=e&&A(e)?.scope||"user",o=await en("\u7121\u984C",e||"",t);ao(o),e&&m.expanded.add(e),oe(),await Fe(o.Id),E("ttl").select()}catch(t){w("\u30DA\u30FC\u30B8\u4F5C\u6210\u306B\u5931\u6557: "+t.message,"err")}finally{R(!1)}}async function tp(e){let t=m.pages.find(i=>i.Id===e),o=t&&t.Title||"\u7121\u984C",n=m.pages.some(i=>i.ParentId===e),r=A(e);if(r?.type==="database"&&r.list==="memola-daily"){w("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u524A\u9664\u3067\u304D\u307E\u305B\u3093 (\u500B\u4EBA\u904B\u7528\u306B\u5FC5\u9808)","err");return}if(confirm(n?"\u300C"+o+"\u300D\u3068\u5B50\u30DA\u30FC\u30B8\u3092\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5\u3057\u307E\u3059\u304B\uFF1F":"\u300C"+o+"\u300D\u3092\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5\u3057\u307E\u3059\u304B\uFF1F"))try{R(!0,"\u79FB\u52D5\u4E2D..."),await Is(e);let i=UA(e);wo(i),m.currentId!==null&&i.includes(m.currentId)&&(kd(),re.unload(),m.currentId=null,et("empty")),oe(),w("\u30B4\u30DF\u7BB1\u306B\u79FB\u52D5\u3057\u307E\u3057\u305F")}catch(i){w("\u524A\u9664\u306B\u5931\u6557: "+i.message,"err")}finally{R(!1)}}function op(){let e=E("dtb");if(e.querySelector(".memola-dr-new"))return;let t=gl(),o=document.createElement("tr");o.className="memola-dr-new";let n=!1,r=document.createElement("td");r.className="memola-td-cb",o.appendChild(r),t.forEach(l=>{let c=document.createElement("td"),d=document.createElement("span");d.className="memola-dc",d.contentEditable="true",d.dataset.field=l.InternalName,d.addEventListener("keydown",p=>{let u=p;if(u.key==="Enter"&&!u.shiftKey&&(p.preventDefault(),s()),u.key==="Escape"&&o.remove(),u.key==="Tab"){p.preventDefault();let f=Array.from(o.querySelectorAll(".memola-dc")),g=u.shiftKey?f[f.indexOf(d)-1]:f[f.indexOf(d)+1];g?g.focus():s()}}),c.appendChild(d),o.appendChild(c)});let a=document.createElement("td");a.className="memola-td-del",o.appendChild(a),e.appendChild(o);let i=o.querySelector(".memola-dc");i&&i.focus();async function s(){if(n)return;let l={};if(o.querySelectorAll(".memola-dc").forEach(c=>{let d=(c.textContent||"").trim();d&&(l[c.dataset.field]=d)}),!l.Title){o.remove();return}n=!0;try{R(!0,"\u8FFD\u52A0\u4E2D...");let{addRowWithUndo:c}=await Promise.resolve().then(()=>(Mo(),sd)),d=await c(m.dbList,l);m.dbItems.push(d),o.remove(),E("dtb").appendChild(hl(d,t)),w("\u884C\u3092\u8FFD\u52A0\u3057\u307E\u3057\u305F\uFF08\u2318Z \u3067\u53D6\u6D88\u53EF\u80FD\uFF09")}catch(c){w("\u8FFD\u52A0\u5931\u6557: "+c.message,"err"),o.remove(),n=!1}finally{R(!1)}}o.addEventListener("focusout",()=>{setTimeout(()=>{o.contains(document.activeElement)||s()},100)})}async function Ih(e){if(e.flushSave)try{await vt()}catch{}if(kd(),Promise.resolve().then(()=>(Rr(),tm)).then(t=>{t.stopWatching(),t.detachCrossTabSync()}).catch(()=>{}),Promise.resolve().then(()=>(fl(),Ag)).then(t=>t.shutdownPresence()).catch(()=>{}),document.removeEventListener("keydown",Qm),Promise.resolve().then(()=>(Th(),fE)).then(t=>t.detachViewportAutoCollapse?.()).catch(()=>{}),e.removeOverlay){let t=document.getElementById("memola-overlay");t&&t.remove();let o=document.getElementById("memola-style");o&&o.remove()}}async function ep(){let e=re.isDirty()?`\u4FDD\u5B58\u3057\u3066\u3044\u306A\u3044\u5909\u66F4\u304C\u3042\u308A\u307E\u3059\u3002\u30A2\u30D7\u30EA\u3092\u9589\u3058\u307E\u3059\u304B\uFF1F
(OK \u3067\u4FDD\u5B58\u3057\u3066\u304B\u3089\u9589\u3058\u307E\u3059)`:"\u30A2\u30D7\u30EA\u3092\u9589\u3058\u307E\u3059\u304B\uFF1F",{confirmClose:t}=await Promise.resolve().then(()=>(uE(),pE));await t(e)&&Ih({flushSave:!0,removeOverlay:!0})}var UA,yn=L(()=>{"use strict";j();me();le();Be();W();K();hr();W();ft();gt();Eh();ye();UA=e=>Zo(m.pages,e)});var po={};q(po,{TREE_INDENT:()=>jl,TREE_PAD_LEFT:()=>rp,ancs:()=>Yn,kidsOf:()=>Mh,mkNode:()=>ap,renderBc:()=>nh,renderTree:()=>oe});function kE(e){if(!e)return"user";let t="Id"in e?e.Id:e.id;return A(t)?.scope==="org"?"org":"user"}function Mh(e){let t=e||"",o=m.pages.filter(r=>!r.IsDraft&&!A(r.Id)?.isTemplate&&r.Id!==t),n;if(t===""){let r=new Set(o.map(a=>a.Id));n=o.filter(a=>{let i=a.ParentId||"";return i===""||!r.has(i)}).sort((a,i)=>a.Id<i.Id?-1:1)}else n=o.filter(r=>(r.ParentId||"")===t).sort((r,a)=>r.Id<a.Id?-1:1);return cs(t,n)}function zA(e){return Mh("").filter(t=>kE(t)===e)}function gE(e,t){let o=zA(t),n=np.has(t),r=n?o:o.slice(0,Lh);if(!n&&m.currentId){let a=m.currentId,i=0;for(;i++<200;){let l=A(a)?.parent||"";if(!l||!m.pages.some(c=>c.Id===l))break;a=l}let s=o.find(l=>l.Id===a);s&&!r.some(l=>l.Id===a)&&r.push(s)}if(r.forEach(a=>{e.appendChild(ap(a,0))}),o.length>Lh){let a=document.createElement("div");a.className="memola-sl-more",a.textContent=n?"\u8868\u793A\u3092\u6E1B\u3089\u3059":"\u3055\u3089\u306B\u8868\u793A ("+(o.length-Lh)+")",a.addEventListener("click",()=>{np.has(t)?np.delete(t):np.add(t),oe()}),e.appendChild(a)}}async function hE(e,t){let o=fu(e,t);if(o===null)return e;let n=A(e);if(o==="org"&&n?.type==="database"&&n.list==="memola-daily")return w("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u7D44\u7E54\u306B\u516C\u958B\u3067\u304D\u307E\u305B\u3093","err"),null;let r=A(t),a=wE(e),i=o==="org"?"\u7D44\u7E54":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8",s=o==="org"?"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8":"\u7D44\u7E54";if(!window.confirm(`\u26A0 \u30B9\u30B3\u30FC\u30D7\u304C\u7570\u306A\u308A\u307E\u3059\u3002

\u300C`+(n?.title||"\u7121\u984C")+"\u300D("+s+`) \u3092
\u300C`+(r?.title||"\u7121\u984C")+"\u300D("+i+`) \u306E\u914D\u4E0B\u306B\u79FB\u52D5\u3057\u307E\u3059\u3002

\u914D\u4E0B\u306E `+a+" \u30DA\u30FC\u30B8\u3082\u4E00\u7DD2\u306B\u300C"+i+`\u300D\u306B\u306A\u308A\u307E\u3059\u3002

\u7D9A\u884C\u3057\u307E\u3059\u304B?`))return null;let{confirmScopeChangeLinks:c}=await Promise.resolve().then(()=>(Qr(),pl));if(!await c(e,o))return null;let d=await Ua(e,o).catch(()=>null);return d?d.rootId:e}function bE(e,t){return e<t*.25?"before":e>t*.75?"after":"into"}function vE(e,t,o){let n=e-t,r=Math.floor((o*jl+rp-n)/jl),a=o-Math.max(0,r);return Math.max(0,Math.min(o,a))}function jA(e,t){let o=e,n=0,r=[];for(;o&&(r.unshift(o),!!o.ParentId);)o=m.pages.find(i=>i.Id===o.ParentId);if(t<=0)return"";let a=r[t-1];return a?a.Id:""}function qA(e,t){let o=e,n=[];for(;o&&(n.unshift(o),!!o.ParentId);)o=m.pages.find(r=>r.Id===o.ParentId);return n[t]?n[t].Id:null}function yE(e,t){let n=E("tree").querySelectorAll(".memola-tr"),r=new Set,a=i=>{m.pages.filter(s=>s.ParentId===i).forEach(s=>{r.add(s.Id),a(s.Id)})};a(e),n.forEach(i=>{let s=i.dataset.pageId;s&&r.has(s)&&i.classList.toggle("memola-tr-dragging-descendant",t)})}function $A(){let e=document.getElementById("memola-overlay")||document.body;if(qi&&e.contains(qi))return qi;let t=document.createElement("div");return t.className="memola-tr-drop-line",t.innerHTML='<span class="memola-tr-drop-dot"></span><span class="memola-tr-drop-dot right"></span>',e.appendChild(t),qi=t,t}function Sh(e,t,o){let n=e.getBoundingClientRect(),r=$A(),a=(t?n.bottom:n.top)-1,i=n.left+o*jl+rp;r.style.top=a+"px",r.style.left=i+"px",r.style.width=Math.max(40,n.right-i-6)+"px",r.classList.add("on")}function zl(){qi&&qi.classList.remove("on")}function ap(e,t){let o=e.Type==="database",n=Mh(e.Id),r=n.length>0,a=m.expanded.has(e.Id),i=e.Id===m.currentId,s=A(e.Id),l=s&&s.icon?s.icon:o?"\u{1F5C3}":"\u{1F4C4}",c=document.createElement("div"),d=document.createElement("div");d.className="memola-tr"+(i?" on":""),d.style.paddingLeft=t*jl+rp+"px",d.dataset.depth=String(t),d.dataset.parentId=e.ParentId||"";let p=document.createElement("span");p.className="memola-tog"+(r?"":" lf")+(a?" op":""),p.innerHTML=r?"&#9658;":"",p.addEventListener("click",h=>{h.stopPropagation(),r&&(m.expanded.has(e.Id)?m.expanded.delete(e.Id):m.expanded.add(e.Id),oe())});let u=document.createElement("span");u.className="memola-ti",u.textContent=l;let f=document.createElement("span");f.className="memola-tl",f.textContent=e.Title||"\u7121\u984C";let g=document.createElement("span");if(g.className="memola-ta",!o){let h=document.createElement("button");h.className="memola-tac",h.title="\u5B50\u30DA\u30FC\u30B8\u3092\u8FFD\u52A0",h.innerHTML="+",h.addEventListener("click",v=>{v.stopPropagation(),ho(e.Id)}),g.appendChild(h)}let y=document.createElement("button");y.className="memola-tac",y.title=s?.pinned?"\u30D4\u30F3\u7559\u3081\u89E3\u9664":"\u30D4\u30F3\u7559\u3081",y.innerHTML=s?.pinned?"\u{1F4CC}":"\u{1F4CD}",y.addEventListener("click",async h=>{h.stopPropagation(),await gu(e.Id,!s?.pinned),oe()}),g.appendChild(y);let b=document.createElement("button");if(b.className="memola-tac",b.title="\u524A\u9664",b.innerHTML="\u{1F5D1}",b.addEventListener("click",h=>{h.stopPropagation(),tp(e.Id)}),g.appendChild(b),d.append(p,u,f,g),d.addEventListener("click",h=>{h.metaKey||h.ctrlKey?Promise.resolve().then(()=>(fo(),Uo)).then(v=>v.openPageInNewTab(e.Id)):Fe(e.Id)}),d.addEventListener("auxclick",h=>{h.button===1&&(h.preventDefault(),Promise.resolve().then(()=>(fo(),Uo)).then(v=>v.openPageInNewTab(e.Id)))}),d.draggable=!0,d.dataset.pageId=e.Id,d.addEventListener("dragstart",h=>{if(h.metaKey||h.ctrlKey){h.preventDefault();return}h.dataTransfer&&(h.dataTransfer.effectAllowed="move",h.dataTransfer.setData("text/plain",e.Id)),d.classList.add("memola-tr-dragging"),yE(e.Id,!0)}),d.addEventListener("dragend",()=>{d.classList.remove("memola-tr-dragging"),yE(e.Id,!1),zl()}),d.addEventListener("dragover",h=>{h.preventDefault();let v=d.getBoundingClientRect(),k=h.clientY-v.top,x=bE(k,v.height);if(x==="into")d.classList.add("memola-tr-dropover"),zl();else{d.classList.remove("memola-tr-dropover");let T=vE(h.clientX,v.left,t);Sh(d,x==="after",T)}}),d.addEventListener("dragleave",()=>{d.classList.remove("memola-tr-dropover")}),d.addEventListener("drop",async h=>{h.preventDefault(),h.stopPropagation(),d.classList.remove("memola-tr-dropover"),zl();let v=h.dataTransfer?.getData("text/plain");if(!v||v===e.Id)return;let k=d.getBoundingClientRect(),x=bE(h.clientY-k.top,k.height);try{if(x==="into"){let U=await hE(v,e.Id);if(!U)return;await Lr(U,e.Id),m.expanded.add(e.Id),oe(),w("\u79FB\u52D5\u3057\u307E\u3057\u305F");return}let T=vE(h.clientX,k.left,t),I=jA(e,T),B=m.pages.find(U=>U.Id===v);if(!B)return;let F=v;if((B.ParentId||"")!==I){let U=await hE(v,I);if(!U)return;F=U,await Lr(F,I)}let P=T===t?e.Id:qA(e,T)||"",H=m.pages.filter(U=>(U.ParentId||"")===I).sort((U,Y)=>U.Id<Y.Id?-1:1),D=cs(I,H);if(P){let U=_p(D,F,P,x==="before");Ma(I,U)}oe()}catch(T){w("\u79FB\u52D5\u5931\u6557: "+T.message,"err")}}),c.appendChild(d),r&&a){let h=document.createElement("div");n.forEach(v=>{h.appendChild(ap(v,t+1))}),c.appendChild(h)}return c}function oe(){let e=document.getElementById("memola-tree-pinned"),t=document.getElementById("memola-tree-private"),o=document.getElementById("memola-tree-org"),n=document.getElementById("memola-tree-pinned-lbl");if(!e||!t||!o)return;e.innerHTML="",t.innerHTML="",o.innerHTML="";let r=m.pages.filter(a=>a.IsDraft?!1:A(a.Id)?.pinned);n&&(n.style.display=r.length>0?"":"none"),r.forEach(a=>{e.appendChild(ap(a,0))}),gE(t,"user"),gE(o,"org"),xE(t,"user"),xE(o,"org")}function xE(e,t){function o(n){let r=e.querySelectorAll(".memola-tr");if(r.length===0)return"bottom";let a=r[0].getBoundingClientRect(),i=r[r.length-1].getBoundingClientRect();return n<a.top+a.height/2?"top":n>i.bottom-i.height/2?"bottom":null}e.ondragover=n=>{if(n.preventDefault(),n.target.closest(".memola-tr"))return;let a=e.querySelectorAll(".memola-tr");if(a.length===0)return;o(n.clientY)==="top"&&a[0]?Sh(a[0],!1,0):a.length>0&&Sh(a[a.length-1],!0,0)},e.addEventListener("dragleave",n=>{let r=n.relatedTarget;(!r||!e.contains(r))&&zl()}),e.ondrop=async n=>{if(n.preventDefault(),zl(),n.target.closest(".memola-tr"))return;let a=n.dataTransfer?.getData("text/plain");if(!a)return;let i=o(n.clientY)||"bottom";try{let s=m.pages.find(f=>f.Id===a);if(!s)return;let l=a,c=kE(s);if(c!==t){let f=A(a);if(t==="org"&&f?.type==="database"&&f.list==="memola-daily"){w("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u7D44\u7E54\u306B\u516C\u958B\u3067\u304D\u307E\u305B\u3093","err");return}let g=wE(a);if(!window.confirm(`\u26A0 \u30B9\u30B3\u30FC\u30D7\u304C\u7570\u306A\u308A\u307E\u3059\u3002

\u300C`+(s.Title||"\u7121\u984C")+"\u300D("+(c==="org"?"\u7D44\u7E54":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8")+") \u3092\u300C"+(t==="org"?"\u{1F310} \u7D44\u7E54":"\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8")+`\u300D\u30BB\u30AF\u30B7\u30E7\u30F3\u306B\u79FB\u52D5\u3057\u307E\u3059\u3002

`+(g>0?"\u914D\u4E0B\u306E "+g+` \u30DA\u30FC\u30B8\u3082\u540C\u3058\u5206\u985E\u306B\u306A\u308A\u307E\u3059\u3002

`:"")+"\u7D9A\u884C\u3057\u307E\u3059\u304B?"))return;let{confirmScopeChangeLinks:b}=await Promise.resolve().then(()=>(Qr(),pl));if(!await b(a,t))return;let h=await Ua(a,t).catch(()=>null);h&&(l=h.rootId)}(s.ParentId||"")!==""&&await Lr(l,"");let d=m.pages.filter(f=>(f.ParentId||"")==="").sort((f,g)=>f.Id<g.Id?-1:1),u=cs("",d).map(f=>f.Id).filter(f=>f!==l);i==="top"?u.unshift(l):u.push(l),Ma("",u),oe()}catch(s){w("\u79FB\u52D5\u5931\u6557: "+s.message,"err")}}}function Yn(e){let t={},o=[];m.pages.forEach(r=>{t[r.Id]=r});let n=e;for(;n;){let r=t[n];if(!r)break;o.unshift(r),n=r.ParentId||""}return o}function nh(e){let t=E("bc");t.innerHTML="";let o=Yn(e);o.forEach((n,r)=>{let a=document.createElement("span");if(a.className="memola-bi",a.textContent=n.Title||"\u7121\u984C",a.addEventListener("click",()=>{Fe(n.Id)}),t.appendChild(a),r<o.length-1){let i=document.createElement("span");i.textContent="/",i.style.color="#e9e9e7",t.appendChild(i)}})}var Lh,np,wE,qi,jl,rp,Be=L(()=>{"use strict";j();me();W();yn();K();le();hr();ye();Lh=10,np=new Set;wE=e=>ls(m.pages,e);qi=null;jl=16,rp=6});function ql(e,t){EE=e,Ph=t;let o=E("emoji-grid");o.innerHTML="",KA.forEach(a=>{let i=document.createElement("button");i.className="memola-emoji-btn",i.textContent=a,i.addEventListener("click",()=>{E("emoji").classList.remove("on"),Ph&&Ph(a)}),o.appendChild(i)});let n=e.getBoundingClientRect(),r=E("emoji");r.style.top=n.bottom+4+"px",r.style.left=n.left+"px",r.classList.add("on")}function IE(){let e=document.body;e.dataset.memolaEmojiWired!=="1"&&(e.dataset.memolaEmojiWired="1",document.addEventListener("mousedown",t=>{let o=E("emoji"),n=t.target;o&&o.classList.contains("on")&&!o.contains(n)&&n!==EE&&o.classList.remove("on")}))}var KA,EE,Ph,Ch=L(()=>{"use strict";me();KA=["\u{1F4C4}","\u{1F4DD}","\u{1F4CB}","\u{1F4CC}","\u{1F4CD}","\u{1F4CE}","\u{1F5C2}","\u{1F5C3}","\u{1F5C4}","\u{1F4C1}","\u{1F4C2}","\u{1F5D1}","\u{1F4DA}","\u{1F4D6}","\u{1F4D7}","\u{1F4D8}","\u{1F4D9}","\u{1F4D4}","\u{1F4D2}","\u{1F4C3}","\u{1F4DC}","\u{1F4D1}","\u{1F516}","\u270F\uFE0F","\u{1F58A}","\u{1F58B}","\u{1F58C}","\u{1F58D}","\u2712\uFE0F","\u{1F50F}","\u{1F510}","\u{1F512}","\u{1F513}","\u{1F511}","\u{1F5DD}","\u{1F4A1}","\u{1F526}","\u{1F56F}","\u{1F4B0}","\u{1F4B5}","\u{1F4B3}","\u{1F3C6}","\u{1F947}","\u{1F3AF}","\u{1F3AA}","\u{1F3A8}","\u{1F3AD}","\u{1F31F}","\u2B50","\u2728","\u{1F4AB}","\u{1F525}","\u2744\uFE0F","\u{1F30A}","\u{1F308}","\u2600\uFE0F","\u{1F319}","\u26A1","\u{1F33F}","\u{1F34E}","\u{1F34A}","\u{1F34B}","\u{1F347}","\u{1F353}","\u{1F95D}","\u{1F951}","\u{1F32E}","\u{1F355}","\u2615","\u{1F382}","\u{1F370}","\u{1F436}","\u{1F431}","\u{1F42D}","\u{1F439}","\u{1F430}","\u{1F98A}","\u{1F43B}","\u{1F43C}","\u{1F428}","\u{1F42F}","\u{1F981}","\u{1F42E}","\u{1F680}","\u2708\uFE0F","\u{1F682}","\u{1F697}","\u{1F3E0}","\u{1F3E2}","\u{1F3D6}","\u{1F3D4}","\u{1F30D}","\u{1F5FA}","\u{1F9ED}","\u26F5"],EE=null,Ph=null});var LE={};q(LE,{attachCreateMenu:()=>Bh,renderCreateMenuTemplates:()=>Ah});function Ah(){let e=document.getElementById("memola-cm-templates");if(!e)return;let t=hu();if(t.length===0){e.innerHTML='<div class="memola-cm-empty">\u307E\u3060\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u30DA\u30FC\u30B8\u306E\u300C\u2026\u300D\u2192\u300C\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3068\u3057\u3066\u767B\u9332\u300D\u3067\u8FFD\u52A0\u3067\u304D\u307E\u3059\u3002</div>';return}e.innerHTML=t.map(o=>{let n=o.icon||(o.type==="database"?"\u{1F5C2}":"\u{1F4C4}");return'<div class="memola-cm-item memola-cm-tpl" data-tpl-id="'+M(o.id)+'"><span class="memola-cm-ic">'+M(n)+'</span><span class="memola-cm-name">'+M(o.title||"\u7121\u984C")+'</span><span class="memola-cm-tpl-actions"><button class="memola-cm-tpl-btn" data-tpl-edit="'+M(o.id)+'" title="\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u7DE8\u96C6">\u270E</button><button class="memola-cm-tpl-btn" data-tpl-del="'+M(o.id)+'" title="\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u524A\u9664">\u{1F5D1}</button></span></div>'}).join("")}function Bh(e){if(TE)return;TE=!0;let t=document.getElementById("memola-quick-add"),o=document.getElementById("memola-create-menu");!t||!o||(t.addEventListener("click",n=>{n.stopPropagation();let r=t.getBoundingClientRect();o.style.left=r.left+"px",o.style.top=r.bottom+4+"px",Ah(),o.classList.toggle("on")}),o.addEventListener("click",n=>{let r=n.target,a=r.closest("[data-tpl-edit]")?.dataset.tplEdit;if(a){n.stopPropagation(),o.classList.remove("on"),Promise.resolve().then(()=>(W(),ce)).then(c=>c.doSelect(a));return}let i=r.closest("[data-tpl-del]")?.dataset.tplDel;if(i){n.stopPropagation(),GA(i);return}let s=r.closest(".memola-cm-tpl");if(s?.dataset.tplId){o.classList.remove("on"),WA(s.dataset.tplId);return}let l=r.closest(".memola-cm-item");if(!(!l||!l.dataset.cm))switch(o.classList.remove("on"),l.dataset.cm){case"new-page":ho("");break;case"new-db":e("");break}}),document.addEventListener("click",n=>{if(!o.classList.contains("on"))return;let r=n.target;o.contains(r)||t.contains(r)||o.classList.remove("on")}))}async function WA(e){let t=m.meta.pages.find(o=>o.id===e);try{R(!0,"\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u4F5C\u6210\u4E2D...");let o;if(t?.type==="database"){let{duplicateDb:n}=await Promise.resolve().then(()=>(Ke(),Ht)),r=await n(e,{asTemplate:!1});o=r.Id,oe(),await(await Promise.resolve().then(()=>(W(),ce))).doSelectDb(o,r)}else{let{apiCreatePageFromTemplate:n}=await Promise.resolve().then(()=>(K(),je));o=(await n(e)).Id,oe(),await(await Promise.resolve().then(()=>(W(),ce))).doSelect(o)}w("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u4F5C\u6210\u3057\u307E\u3057\u305F")}catch(o){w("\u4F5C\u6210\u5931\u6557: "+o.message,"err")}finally{R(!1)}}async function GA(e){let t=m.meta.pages.find(o=>o.id===e);if(confirm("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u300C"+(t?.title||"\u7121\u984C")+"\u300D\u3092\u524A\u9664\u3057\u307E\u3059\u304B?"))try{R(!0,"\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u524A\u9664\u4E2D...");let{apiDeleteTemplate:o}=await Promise.resolve().then(()=>(K(),je));await o(e),Ah(),w("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u524A\u9664\u3057\u307E\u3057\u305F")}catch(o){w("\u524A\u9664\u5931\u6557: "+o.message,"err")}finally{R(!1)}}var TE,Dh=L(()=>{"use strict";yn();j();le();De();K();Be();TE=!1});function ME(){if(SE)return;SE=!0;let e=2,t=document.getElementById("memola-col-type-grid");if(t){let o=Array.from(t.querySelectorAll(".memola-col-type"));o[0]?.classList.add("on"),o.forEach(n=>{n.addEventListener("click",()=>{o.forEach(r=>r.classList.remove("on")),n.classList.add("on"),e=parseInt(n.dataset.tk||"2"),E("col-choices-row").classList.toggle("on",e===6||e===15)})})}E("col-cancel").addEventListener("click",()=>{E("col-md").classList.remove("on")}),E("col-ok").addEventListener("click",async()=>{let o=E("col-name").value.trim();if(!o){E("col-name").focus();return}let n=[];if(e===6||e===15){let r=E("col-choices").value.trim();n=r?r.split(`
`).map(a=>a.trim()).filter(Boolean):[]}E("col-md").classList.remove("on"),R(!0,"\u5217\u3092\u8FFD\u52A0\u4E2D...");try{await Nt(m.dbList,o,e,n);let[r,a]=await Promise.all([Ue(m.dbList),Ie(m.dbList)]),{stripInternalDbFields:i}=await Promise.resolve().then(()=>(Ke(),Ht));m.dbFields=i(r),m.dbItems=a,Ne(),w("\u5217\u300C"+o+"\u300D\u3092\u8FFD\u52A0\u3057\u307E\u3057\u305F")}catch(r){w("\u5217\u8FFD\u52A0\u5931\u6557: "+r.message,"err")}finally{R(!1)}}),E("col-name").addEventListener("keydown",o=>{let n=o;n.isComposing||n.keyCode===229||(n.key==="Enter"&&E("col-ok").click(),n.key==="Escape"&&E("col-md").classList.remove("on"))})}var SE,PE=L(()=>{"use strict";j();me();le();Re();W();SE=!1});function CE(e){if(e==null)return"";let t=String(e);return/[",\n\r]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}function VA(e){let t=[],o=[],n="",r=!1;for(let a=0;a<e.length;a++){let i=e[a];r?i==='"'?e[a+1]==='"'?(n+='"',a++):r=!1:n+=i:i==='"'?r=!0:i===","?(o.push(n),n=""):i==="\r"||(i===`
`?(o.push(n),t.push(o),o=[],n=""):n+=i)}return(n||o.length)&&(o.push(n),t.push(o)),t.filter(a=>a.some(i=>i.length>0))}function AE(){if(!m.dbList){w("DB\u304C\u9078\u629E\u3055\u308C\u3066\u3044\u307E\u305B\u3093","err");return}let e=m.dbFields.filter(s=>[2,4,6,8,9].includes(s.FieldTypeKind)),t=e.map(s=>CE(s.Title)).join(","),o=m.dbItems.map(s=>e.map(l=>CE(s[l.InternalName])).join(",")),n="\uFEFF"+[t,...o].join(`
`),r=new Blob([n],{type:"text/csv;charset=utf-8"}),a=URL.createObjectURL(r),i=document.createElement("a");i.href=a,i.download=(m.dbList||"database")+".csv",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a),w("CSV\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3057\u307E\u3057\u305F")}function BE(){if(!m.dbList){w("DB\u304C\u9078\u629E\u3055\u308C\u3066\u3044\u307E\u305B\u3093","err");return}let e=document.createElement("input");e.type="file",e.accept=".csv,text/csv",e.addEventListener("change",async()=>{let t=e.files?.[0];if(!t)return;let o=await t.text(),n=VA(o);if(n.length<1){w("\u7A7A\u306ECSV\u3067\u3059","err");return}let r=n[0].map(i=>i.replace(/^﻿/,"").trim()),a=n.slice(1);if(confirm(r.length+" \u5217 \xD7 "+a.length+" \u884C \u3092\u30A4\u30F3\u30DD\u30FC\u30C8\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F"))try{R(!0,"\u30A4\u30F3\u30DD\u30FC\u30C8\u4E2D... (\u5217\u3092\u6E96\u5099)");let i=new Set(m.dbFields.map(d=>d.Title));for(let d of r)d&&!i.has(d)&&d!=="Title"&&await Nt(m.dbList,d,2);let{stripInternalDbFields:s}=await Promise.resolve().then(()=>(Ke(),Ht));m.dbFields=s(await Ue(m.dbList));let l={};m.dbFields.forEach(d=>{l[d.Title]=d.InternalName}),R(!0,"\u884C\u3092\u30A4\u30F3\u30DD\u30FC\u30C8\u4E2D... (0/"+a.length+")");let c=0;for(let d of a){let p={};r.forEach((u,f)=>{let g=l[u];if(!g)return;let y=d[f]||"";y&&(p[g]=y)}),Object.keys(p).length!==0&&(!p.Title&&p[l.Title]===void 0&&(p.Title="(\u7121\u984C)"),await _e(m.dbList,p),c++,c%5===0&&R(!0,"\u884C\u3092\u30A4\u30F3\u30DD\u30FC\u30C8\u4E2D... ("+c+"/"+a.length+")"))}m.dbItems=await Ie(m.dbList),Ne(),w(c+" \u884C\u30A4\u30F3\u30DD\u30FC\u30C8\u3057\u307E\u3057\u305F")}catch(i){w("\u30A4\u30F3\u30DD\u30FC\u30C8\u5931\u6557: "+i.message,"err")}finally{R(!1)}}),e.click()}var DE=L(()=>{"use strict";j();le();Re();W()});function $i(e){["dbv-table","dbv-board","dbv-list","dbv-gallery","dbv-calendar","dbv-gantt"].forEach(o=>E(o).classList.toggle("on",o==="dbv-"+e)),E("dt-wrap").style.display=e==="table"?"":"none",E("dadd").style.display=e==="table"?"":"none",E("kb").classList.toggle("on",e==="board"),["list","gallery","calendar","gantt"].forEach(o=>{E(o+"-view").classList.toggle("on",e===o)}),e==="board"?Ei():["list","gallery","calendar","gantt"].includes(e)&&Promise.resolve().then(()=>(id(),ad)).then(o=>o.renderActiveView(e))}function RE(){_E||(_E=!0,E("db-csv-export").addEventListener("click",AE),E("db-csv-import").addEventListener("click",BE),document.getElementById("memola-db-new-row")?.addEventListener("click",op),document.getElementById("memola-db-group-btn")?.addEventListener("click",()=>{w("\u30B0\u30EB\u30FC\u30D7\u6A5F\u80FD\u306F\u4ECA\u5F8C\u5B9F\u88C5\u4E88\u5B9A")}),E("dbv-table").addEventListener("click",()=>$i("table")),E("dbv-board").addEventListener("click",()=>$i("board")),E("dbv-list").addEventListener("click",()=>$i("list")),E("dbv-gallery").addEventListener("click",()=>$i("gallery")),E("dbv-calendar").addEventListener("click",()=>$i("calendar")),E("dbv-gantt").addEventListener("click",()=>$i("gantt")),E("db-filter-btn").addEventListener("click",e=>{e.stopPropagation(),Promise.resolve().then(()=>($m(),qm)).then(t=>t.showFilterPopover())}),Promise.resolve().then(()=>($m(),qm)).then(e=>e.attachFilterPopoverOutsideClick()))}var _E,NE=L(()=>{"use strict";me();le();W();DE();yn();_E=!1});function HE(){let t=E("sb").classList.contains("collapsed")?"collapsed":"expanded";Ia.set(t)}function FE(e){OE||(OE=!0,E("sb-toggle").addEventListener("click",()=>{E("sb").classList.toggle("collapsed"),HE()}),document.getElementById("memola-sb-collapse")?.addEventListener("click",()=>{E("sb").classList.add("collapsed"),HE()}),Ia.get()==="collapsed"&&E("sb").classList.add("collapsed"),document.getElementById("memola-nav-back")?.addEventListener("click",()=>{Promise.resolve().then(()=>(Fn(),ei)).then(t=>t.goBack())}),document.getElementById("memola-nav-fwd")?.addEventListener("click",()=>{Promise.resolve().then(()=>(Fn(),ei)).then(t=>t.goForward())}),document.getElementById("memola-sb-daily-today")?.addEventListener("click",()=>{e.openTodayDailyNote()}),document.getElementById("memola-sb-daily-pick")?.addEventListener("click",t=>{e.showDailyPicker(t.currentTarget)}),E("ne").addEventListener("click",()=>{ho("")}),E("ne-db").addEventListener("click",()=>{e.doNewDb("")}),document.getElementById("memola-ne-tpl")?.addEventListener("click",()=>{document.getElementById("memola-quick-add")?.click()}),document.querySelectorAll(".memola-em-chip").forEach(t=>{t.addEventListener("click",()=>{t.dataset.tpl==="tasks"?e.doNewDb(""):ho("")})}))}var OE,UE=L(()=>{"use strict";me();ve();yn();OE=!1});function jE(e){sg(e)}function qE(){zE||(zE=!0,E("tb").addEventListener("mousedown",e=>{e.target.closest(".memola-b")&&e.preventDefault()}),E("tb").addEventListener("click",e=>{let t=e.target.closest(".memola-b");t&&t.dataset.cmd&&jE(t.dataset.cmd)}),E("ftb").addEventListener("mousedown",e=>{let t=e.target.closest(".memola-fb");t&&t.dataset.cmd&&(e.preventDefault(),jE(t.dataset.cmd))}))}var zE,$E=L(()=>{"use strict";me();ht();zE=!1});function WE(e){if(!m.currentId)return;let t=m.currentId;Ls(t,e).then(()=>{Ol(t),oe()}).catch(o=>{w("\u30A2\u30A4\u30B3\u30F3\u4FDD\u5B58\u5931\u6557: "+o.message,"err")})}function GE(e){if(!m.currentId)return;let t=m.currentId;Ls(t,e).then(()=>{let o=E("dv-pg-icon"),n=E("dv-add-icon"),r=document.getElementById("memola-dv-hd");e?(o.textContent=e,o.style.display="inline-block",n.style.display="none",r?.classList.remove("no-icon")):(o.style.display="none",n.style.display="",r?.classList.add("no-icon")),oe()}).catch(o=>{w("\u30A2\u30A4\u30B3\u30F3\u4FDD\u5B58\u5931\u6557: "+o.message,"err")})}function VE(){KE||(KE=!0,E("add-icon").addEventListener("click",()=>{ql(E("add-icon"),WE)}),E("pg-icon").addEventListener("click",()=>{ql(E("pg-icon"),WE)}),E("dv-add-icon").addEventListener("click",()=>{ql(E("dv-add-icon"),GE)}),E("dv-pg-icon").addEventListener("click",()=>{ql(E("dv-pg-icon"),GE)}),E("emoji-rm").addEventListener("click",()=>{if(E("emoji").classList.remove("on"),!m.currentId)return;let e=m.currentId;Ls(e,"").then(()=>{if(A(e)?.type==="database"){let o=E("dv-pg-icon"),n=E("dv-add-icon"),r=document.getElementById("memola-dv-hd");o.style.display="none",n.style.display="",r?.classList.add("no-icon")}else Ol(e);oe()}).catch(t=>{w("\u30A2\u30A4\u30B3\u30F3\u524A\u9664\u5931\u6557: "+t.message,"err")})}))}var KE,YE=L(()=>{"use strict";j();me();le();K();Be();W();Ch();ye();KE=!1});function JE(){XE||(XE=!0,E("search-nav").addEventListener("click",mh),E("qs").addEventListener("click",e=>{e.target===E("qs")&&qo()}),E("qs-inp").addEventListener("input",()=>{uh(),Wm(E("qs-inp").value)}),E("qs-inp").addEventListener("keydown",e=>{let t=e;t.isComposing||t.keyCode===229||(t.key==="ArrowDown"&&(e.preventDefault(),Gm(1)),t.key==="ArrowUp"&&(e.preventDefault(),Gm(-1)),t.key==="Enter"&&(e.preventDefault(),ph()),t.key==="Escape"&&qo())}))}var XE,ZE=L(()=>{"use strict";me();Hl();XE=!1});function eI(){if(QE)return;QE=!0;let e=E("ttl");e.addEventListener("input",()=>{En(e),Do()}),e.addEventListener("keydown",t=>{let o=t;o.isComposing||o.keyCode===229||o.key==="Enter"&&(t.preventDefault(),Pe().focus())}),E("dv-ttl").addEventListener("input",()=>{let t=(E("dv-ttl").textContent||"").trim()||"\u7121\u984C";m.currentId&&(Pt(4e3),Aa(m.currentId,t),oe())}),E("dv-ttl").addEventListener("blur",()=>{if(m.currentId){let t=(E("dv-ttl").textContent||"").trim()||"\u7121\u984C";za(m.currentId,t).catch(o=>{w("\u30BF\u30A4\u30C8\u30EB\u4FDD\u5B58\u5931\u6557: "+o.message,"err")})}})}var QE,tI=L(()=>{"use strict";j();me();le();K();Be();gt();ye();QE=!1});function oI(){let e=new Date,t=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return e.getFullYear()+"-"+t+"-"+o}async function nI(e,t){try{R(!0,"\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u3044\u3066\u3044\u307E\u3059...");let o=await Promise.resolve().then(()=>(Sn(),Ra)),n=await o.findNoteForDate(e);if(!n&&t.confirmCreate){if(R(!1),!confirm(e+" \u306E\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093\u3002\u65B0\u3057\u304F\u4F5C\u6210\u3057\u307E\u3059\u304B\uFF1F"))return;R(!0,"\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u4F5C\u6210\u3057\u3066\u3044\u307E\u3059...")}let r=n?{...n,dbPageId:(await o.ensureDailyDb()).dbPageId}:await o.getOrCreateNoteForDate(e);if(!m.pages.some(l=>l.Id===r.dbPageId)){let{apiGetPages:l}=await Promise.resolve().then(()=>(K(),je));await l()}let a=m.pages.find(l=>l.Id===r.dbPageId);if(!a){w("\u30C7\u30A4\u30EA\u30FC DB \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}await(await Promise.resolve().then(()=>(W(),ce))).doSelectDb(r.dbPageId,a);let s=m.dbItems.find(l=>l.Id===r.rowId);s&&await(await Promise.resolve().then(()=>(cn(),ln))).openRowAsPage(r.dbPageId,s),oe()}catch(o){w("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u3051\u307E\u305B\u3093\u3067\u3057\u305F: "+o.message,"err")}finally{R(!1)}}async function rI(){await nI(oI(),{confirmCreate:!1})}async function aI(){let e=m.currentId;if(!e)return;let t=A(e);if(t?.originDailyDate&&confirm(`\u3053\u306E\u30DA\u30FC\u30B8\u3092\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 (${t.originDailyDate}) \u306B\u623B\u3057\u307E\u3059\u304B\uFF1F

\u901A\u5E38\u30DA\u30FC\u30B8\u3068\u3057\u3066\u306E\u672C\u30DA\u30FC\u30B8\u306F\u524A\u9664\u3055\u308C\u3001\u672C\u6587\u304C\u30C7\u30A4\u30EA\u30FC\u5074\u306B\u7D71\u5408\u3055\u308C\u307E\u3059\u3002`))try{R(!0,"\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u306B\u5FA9\u5143\u3057\u3066\u3044\u307E\u3059...");let o=await Promise.resolve().then(()=>(Sn(),Ra)),{rowId:n,date:r}=await o.restoreToDaily(e),{apiGetPages:a}=await Promise.resolve().then(()=>(K(),je));await a(),oe();let i=await o.ensureDailyDb(),s=m.pages.find(l=>l.Id===i.dbPageId);if(s){await(await Promise.resolve().then(()=>(W(),ce))).doSelectDb(i.dbPageId,s);let c=m.dbItems.find(d=>d.Id===n);c&&await(await Promise.resolve().then(()=>(cn(),ln))).openRowAsPage(i.dbPageId,c)}w("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 ("+r+") \u306B\u623B\u3057\u307E\u3057\u305F")}catch(o){w("\u5FA9\u5143\u5931\u6557: "+o.message,"err")}finally{R(!1)}}function iI(e){let t=document.getElementById("memola-daily-picker");t&&t.remove();let o=oI(),n=document.createElement("div");n.id="memola-daily-picker",n.innerHTML='<div class="memola-dp-row"><button class="memola-dp-nav" data-nav="-1" title="\u524D\u65E5">\u2039</button><input type="date" id="memola-dp-input" value="'+o+'"><button class="memola-dp-nav" data-nav="+1" title="\u7FCC\u65E5">\u203A</button></div><div class="memola-dp-quick"><button data-quick="-7">\u5148\u9031</button><button data-quick="-1">\u6628\u65E5</button><button data-quick="0">\u4ECA\u65E5</button><button data-quick="+1">\u660E\u65E5</button><button data-quick="+7">\u6765\u9031</button></div><div class="memola-dp-foot"><button id="memola-dp-cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button id="memola-dp-open" class="memola-dp-primary">\u958B\u304F</button></div>';let r=e.getBoundingClientRect();n.style.position="fixed",n.style.left=r.left+"px",n.style.top=r.bottom+4+"px",(document.getElementById("memola-overlay")||document.body).appendChild(n);let a=n.querySelector("#memola-dp-input");if(!a)return;setTimeout(()=>a.focus(),0);function i(d,p){let u=new Date((p||a.value||o)+"T00:00:00");u.setDate(u.getDate()+d);let f=String(u.getMonth()+1).padStart(2,"0"),g=String(u.getDate()).padStart(2,"0");return u.getFullYear()+"-"+f+"-"+g}n.querySelectorAll(".memola-dp-nav").forEach(d=>{d.addEventListener("click",()=>{let p=parseInt(d.dataset.nav||"0",10);a.value=i(p)})}),n.querySelectorAll(".memola-dp-quick button").forEach(d=>{d.addEventListener("click",()=>{let p=parseInt(d.dataset.quick||"0",10);a.value=i(p,o)})});function s(){n.remove(),document.removeEventListener("click",l)}function l(d){!n.contains(d.target)&&!e.contains(d.target)&&s()}setTimeout(()=>document.addEventListener("click",l),0),n.querySelector("#memola-dp-cancel")?.addEventListener("click",s);let c=()=>{let d=a.value;d&&(s(),nI(d,{confirmCreate:!0}))};n.querySelector("#memola-dp-open")?.addEventListener("click",c),a.addEventListener("keydown",d=>{d.key==="Enter"&&c()})}var _h=L(()=>{"use strict";j();le();Be();ye()});function sI(e,t,o){let n=new Blob([t],{type:o+";charset=utf-8"}),r=URL.createObjectURL(n),a=document.createElement("a");a.href=r,a.download=e,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(r)}function lI(e){return e.replace(/[/\\?%*:|"<>]/g,"_").slice(0,100)||"untitled"}function YA(){return`
:root { color-scheme: light; }
body {
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif;
  max-width: 720px; margin: 48px auto; padding: 0 24px;
  color: rgb(55, 53, 47); background: #fff; line-height: 1.6; font-size: 16px;
}
h1, h2, h3 { line-height: 1.3; margin: 1.2em 0 .3em; }
h1 { font-size: 2em; font-weight: 700; }
h2 { font-size: 1.5em; font-weight: 600; }
h3 { font-size: 1.25em; font-weight: 600; }
p { margin: .25em 0; }
ul, ol { padding-left: 1.6em; margin: .25em 0; }
li + li { margin-top: 4px; }
blockquote { border-left: 3px solid rgb(55, 53, 47); padding-left: .9em; opacity: .65; margin: .25em 0; }
hr { border: none; border-top: 1px solid rgba(55, 53, 47, .16); margin: 1em 0; }
pre {
  background: rgb(247, 246, 243); padding: 14px 16px; border-radius: 4px;
  font-family: "SFMono-Regular", Menlo, Consolas, "Liberation Mono", Courier, monospace;
  font-size: 85%; overflow-x: auto; white-space: pre; tab-size: 2; margin: .5em 0;
}
pre code { background: none; padding: 0; color: inherit; font-size: inherit; }
code {
  background: rgba(135, 131, 120, .2); padding: 2px 4px; border-radius: 3px;
  font-family: "SFMono-Regular", Menlo, Consolas, monospace; font-size: 85%; color: #eb5757;
}
strong { font-weight: 600; }
em { font-style: italic; }
s, del { text-decoration: line-through; opacity: .7; }
a { color: inherit; text-decoration: underline; opacity: .75; }
.memola-callout {
  display: flex; gap: 10px; background: rgb(241, 241, 239); border-radius: 4px;
  padding: 12px 16px; margin: .8em 0;
}
.memola-callout + .memola-callout { margin-top: .8em; }
.memola-callout-ic { font-size: 20px; flex-shrink: 0; line-height: 1.5; }
.memola-callout-body { flex: 1; min-width: 0; }
.memola-callout-body > p:first-child { margin-top: 0; }
.memola-callout-body > p:last-child  { margin-bottom: 0; }
.memola-todo { display: flex; align-items: flex-start; gap: 6px; margin: 4px 0; }
.memola-todo-cb { margin-top: 5px; width: 14px; height: 14px; flex-shrink: 0; accent-color: rgb(35, 131, 226); }
.memola-todo-txt { flex: 1; }
.memola-todo-txt.done { text-decoration: line-through; opacity: .4; }
`.replace(/\s+/g," ").trim()}function cI(){return m.currentId&&m.pages.find(e=>e.Id===m.currentId)||null}async function dI(){let e=cI();if(e){if(e.Type==="database"){w("\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306FMD\u51FA\u529B\u3067\u304D\u307E\u305B\u3093","err");return}try{R(!0,"\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u4E2D...");let t=await so(e.Id),o=new Date().toISOString().slice(0,10),n=`---
title: `+(e.Title||"\u7121\u984C")+`
parent: `+(e.ParentId||"")+`
exported: `+o+`
---

`;sI(lI(e.Title||"\u7121\u984C")+".md",n+t,"text/markdown")}catch(t){w("MD\u51FA\u529B\u5931\u6557: "+t.message,"err")}finally{R(!1)}}}async function mI(){let e=cI();if(e){if(e.Type==="database"){w("\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306FHTML\u51FA\u529B\u3067\u304D\u307E\u305B\u3093","err");return}try{R(!0,"\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u4E2D...");let t=await so(e.Id),o=ko(t),n=e.Title||"\u7121\u984C",r=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),a=YA(),i=`<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>`+r(n)+`</title>
<style>`+a+`</style>
</head>
<body>
<h1>`+r(n)+`</h1>
`+o+`
</body>
</html>`;sI(lI(n)+".html",i,"text/html")}catch(t){w("HTML\u51FA\u529B\u5931\u6557: "+t.message,"err")}finally{R(!1)}}}function pI(){window.print()}var uI=L(()=>{"use strict";j();le();K();Jo()});function Rh(){return m.currentId&&m.pages.find(e=>e.Id===m.currentId)||null}async function fI(){let e=Rh();if(e){if(e.Type==="database"){w("\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306F\u8907\u88FD\u3067\u304D\u307E\u305B\u3093","err");return}try{R(!0,"\u8907\u88FD\u4E2D...");let t=await so(e.Id),o=(e.Title||"\u7121\u984C")+" (\u30B3\u30D4\u30FC)",n=A(e.Id)?.scope||"user",r=await en(o,e.ParentId,n),{updatePageRow:a}=await Promise.resolve().then(()=>(K(),je)),{addPage:i}=await Promise.resolve().then(()=>(ye(),Fb));await a(r.Id,{Body:t}),i(r),oe(),await Fe(r.Id),w("\u8907\u88FD\u3057\u307E\u3057\u305F")}catch(t){w("\u8907\u88FD\u5931\u6557: "+t.message,"err")}finally{R(!1)}}}async function gI(){let e=Rh();if(!e)return;let t;if(e.Type==="database"){let o=A(e.Id);if(!o||!o.list){w("\u30EA\u30F3\u30AF\u53D6\u5F97\u5931\u6557","err");return}t=G+"/Lists/"+encodeURIComponent(o.list)}else t=G+"/Lists/"+encodeURIComponent(ot(e.Id))+"/DispForm.aspx?ID="+encodeURIComponent(e.Id);try{await navigator.clipboard.writeText(t),w("\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")}catch{w("\u30B3\u30D4\u30FC\u5931\u6557","err")}}function hI(){let e=Rh();if(!e)return;if(e.Type==="database"){w(`\u{1F5C3} ${e.Title||"\u7121\u984C"} (DB) \u2014 ${m.dbItems.length}\u884C / ${m.dbFields.length}\u5217`);return}let t=Pe(),o=(t.textContent||"").replace(/\s+/g," ").trim(),n=o.length,r=o?o.split(/\s+/).length:0,a=t.querySelectorAll("p, h1, h2, h3, li, pre, blockquote, .memola-callout, .memola-todo, hr").length;w(`\u{1F4C4} ${e.Title||"\u7121\u984C"}: ${n}\u6587\u5B57 / \u7D04${r}\u8A9E / ${a}\u30D6\u30ED\u30C3\u30AF`)}var bI=L(()=>{"use strict";j();He();me();le();Be();W();K();ye()});function vI(e){let t=E("pgm");if(t.classList.contains("on")){ip();return}if(!m.currentId){w("\u30DA\u30FC\u30B8\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044");return}let o=e.getBoundingClientRect(),n=o.bottom+4,r=window.innerWidth-o.right;t.style.top=n+"px",t.style.right=r+"px",t.style.left="",t.classList.add("on"),$l=e}function ip(){E("pgm").classList.remove("on"),$l=null}function yI(){let e=document.body;e.dataset.memolaPageMenuWired!=="1"&&(e.dataset.memolaPageMenuWired="1",document.addEventListener("mousedown",t=>{let o=E("pgm"),n=t.target;o&&o.classList.contains("on")&&!o.contains(n)&&n!==$l&&(!$l||!$l.contains(n))&&ip()}))}var $l,xI=L(()=>{"use strict";j();me();le();$l=null});async function kI(e){let t=Lt(e);if(!t)return[];let o=J(ot(e),"/items("+t+")/versions?$select=VersionLabel,Created,Editor/Title,Body_blocks,Title&$expand=Editor&$orderby=Created desc&$top=50"),n=await ne(o).catch(()=>null);return n?.results?n.results.map(r=>({versionLabel:r.VersionLabel||"",created:r.Created||"",editor:r.Editor?.Title||r.CreatedBy?.Title||"",body:r.Body_blocks||"",title:r.Title||""})):[]}var wI=L(()=>{"use strict";Et();K()});var II={};q(II,{openVersionHistory:()=>ZA});function EI(e){if(!e)return"";let t=new Date(e);if(isNaN(t.getTime()))return e;let o=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),a=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${o}/${n}/${r} ${a}:${i}`}async function ZA(e,t){ia.render('<div class="memola-versions-box"><div class="memola-versions-hd"><span class="memola-versions-title">\u{1F4DC} \u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74: '+M(t)+'</span><button class="memola-versions-close" title="\u9589\u3058\u308B">\xD7</button></div><div class="memola-versions-body"><div class="memola-versions-loading">\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026</div></div></div>',r=>{r.querySelector(".memola-versions-close")?.addEventListener("click",()=>ia.close())});let o=[];try{o=await kI(e)}catch(r){Nh(t,'<div class="memola-versions-error">\u53D6\u5F97\u5931\u6557: '+M(r.message)+"</div>");return}if(o.length===0){Nh(t,'<div class="memola-versions-empty">\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74\u304C\u3042\u308A\u307E\u305B\u3093\u3002<br><span style="font-size:11px;color:var(--ink-3)">SP \u30EA\u30B9\u30C8\u306E\u300C\u30D0\u30FC\u30B8\u30E7\u30F3\u7BA1\u7406\u8A2D\u5B9A\u300D\u304C\u30AA\u30D5\u306E\u53EF\u80FD\u6027\u304C\u3042\u308A\u307E\u3059\u3002</span></div>');return}let n=o.map((r,a)=>{let i=(r.body||"").replace(/\s+/g," ").slice(0,120),s=a===0;return'<div class="memola-versions-item'+(s?" current":"")+'" data-idx="'+a+'"><div class="memola-versions-itemhd"><span class="memola-versions-label">v'+M(r.versionLabel)+(s?" (\u73FE\u5728)":"")+'</span><span class="memola-versions-time">'+EI(r.created)+'</span><span class="memola-versions-editor">'+M(r.editor||"\u4E0D\u660E")+'</span></div><div class="memola-versions-preview">'+M(i||"(\u672C\u6587\u306A\u3057)")+'</div><div class="memola-versions-actions"><button class="memola-btn s" data-act="preview">\u30D7\u30EC\u30D3\u30E5\u30FC</button>'+(s?"":'<button class="memola-btn p" data-act="restore">\u3053\u306E\u7248\u306B\u623B\u3059</button>')+"</div></div>"}).join("");Nh(t,n,r=>{r.querySelectorAll(".memola-versions-item").forEach(a=>{let i=parseInt(a.dataset.idx||"-1",10);i<0||a.addEventListener("click",async s=>{let l=s.target.closest("button[data-act]");if(!l)return;let c=l.dataset.act,d=o[i];d&&(c==="preview"?QA(d):c==="restore"&&await eB(e,d))})})})}function Nh(e,t,o){ia.render('<div class="memola-versions-box"><div class="memola-versions-hd"><span class="memola-versions-title">\u{1F4DC} \u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74: '+M(e)+'</span><button class="memola-versions-close" title="\u9589\u3058\u308B">\xD7</button></div><div class="memola-versions-body">'+t+"</div></div>",n=>{n.querySelector(".memola-versions-close")?.addEventListener("click",()=>ia.close()),o&&o(n)})}function QA(e){sp.render('<div class="memola-versions-box" style="max-width:760px"><div class="memola-versions-hd"><span class="memola-versions-title">v'+M(e.versionLabel)+' \u30D7\u30EC\u30D3\u30E5\u30FC</span><button class="memola-versions-close">\xD7</button></div><div class="memola-versions-fullpreview">'+Xo(ge(e.body))+"</div></div>",t=>{t.querySelector(".memola-versions-close")?.addEventListener("click",()=>sp.close())})}async function eB(e,t){if(confirm("v"+t.versionLabel+" ("+EI(t.created)+" / "+(t.editor||"\u4E0D\u660E")+`) \u306E\u5185\u5BB9\u3067\u73FE\u5728\u306E\u672C\u6587\u3092\u4E0A\u66F8\u304D\u3057\u307E\u3059\u3002

\u73FE\u5728\u306E\u7248\u306F SP \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74\u306B\u6B8B\u308B\u306E\u3067\u3001\u5F8C\u3067\u5143\u306B\u623B\u3059\u3053\u3068\u3082\u53EF\u80FD\u3067\u3059\u3002

\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F`))try{R(!0,"\u5FA9\u5143\u4E2D\u2026");let{apiSavePageBlocks:o}=await Promise.resolve().then(()=>(K(),je));if(!(await o(e,t.title||"\u7121\u984C",t.body)).ok){w("\u5FA9\u5143\u5931\u6557: \u7AF6\u5408\u3092\u691C\u51FA\u3057\u307E\u3057\u305F\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044","err");return}if(w("v"+t.versionLabel+" \u306B\u5FA9\u5143\u3057\u307E\u3057\u305F"),ia.close(),m.currentId===e){let{doSelect:r}=await Promise.resolve().then(()=>(W(),ce));await r(e)}}catch(o){w("\u5FA9\u5143\u5931\u6557: "+o.message,"err")}finally{R(!1)}}var XA,JA,ia,sp,TI=L(()=>{"use strict";j();le();Jo();K();wI();De();Gn();XA="memola-versions-md",JA="memola-versions-preview",ia=fn({id:XA,className:"memola-versions-md",onEscape:()=>ia.close(),onBackdropClick:()=>ia.close()}),sp=fn({id:JA,className:"memola-versions-md",onEscape:()=>sp.close(),onBackdropClick:()=>sp.close()})});function SI(e){LI||(LI=!0,E("pgm-btn").addEventListener("click",t=>{t.stopPropagation(),oB(),vI(E("pgm-btn"))}),E("pgm").addEventListener("click",async t=>{let o=t.target.closest(".memola-pgm-item");if(!o||!o.dataset.action)return;let n=o.dataset.action;switch(ip(),n){case"export-md":await dI();break;case"export-html":await mI();break;case"duplicate":await fI();break;case"duplicate-as-draft":await aB();break;case"register-template":await tB();break;case"version-history":await iB();break;case"copy-link":await gI();break;case"toggle-scope":await rm();break;case"publish":await nB();break;case"copy-pub-url":await rB();break;case"restore-daily":await aI();break;case"print":pI();break;case"info":hI();break;case"focus":e.toggleFocusMode();break;case"delete":if(m.currentRow){let r=m.currentRow;if(!confirm(`\u3053\u306E\u884C\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F
(\u2318Z \u3067\u5FA9\u5143\u53EF\u80FD)`))break;try{R(!0,"\u884C\u3092\u524A\u9664\u4E2D...");let{deleteRowWithUndo:a}=await Promise.resolve().then(()=>(Mo(),sd));await a(r.listTitle,r.itemId),m.currentRow=null;let i=m.pages.find(s=>s.Id===r.dbId);i?await(await Promise.resolve().then(()=>(W(),ce))).doSelectDb(r.dbId,i):et("empty"),w("\u884C\u3092\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u2318Z \u3067\u5FA9\u5143\u53EF\u80FD\uFF09")}catch(a){w("\u524A\u9664\u5931\u6557: "+a.message,"err")}finally{R(!1)}break}m.currentId&&await tp(m.currentId);break}}),yI())}async function tB(){let e=m.currentId;if(!e||m.currentRow){w("\u30DA\u30FC\u30B8\u3092\u958B\u3044\u3066\u304B\u3089\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044","err");return}try{if(R(!0,"\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u306B\u767B\u9332\u4E2D..."),m.currentType==="database"){let{duplicateDb:o}=await Promise.resolve().then(()=>(Ke(),Ht));await o(e,{asTemplate:!0})}else{await vt().catch(()=>{});let{apiRegisterPageAsTemplate:o}=await Promise.resolve().then(()=>(K(),je));await o(e)}let{renderCreateMenuTemplates:t}=await Promise.resolve().then(()=>(Dh(),LE));t(),w("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3068\u3057\u3066\u767B\u9332\u3057\u307E\u3057\u305F(\uFF0B\u65B0\u898F \u2192\u300C\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u300D)")}catch(t){w("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u767B\u9332\u5931\u6557: "+t.message,"err")}finally{R(!1)}}function oB(){let e=document.querySelector(".memola-pgm-publish-label"),t=document.querySelector('[data-action="copy-pub-url"]'),o=document.querySelector('[data-action="publish"]'),n=document.querySelector('[data-action="restore-daily"]'),r=!!m.currentId&&m.currentType==="page"&&!m.currentRow;if(n){let i=r&&m.currentId?A(m.currentId):null;n.style.display=i?.originDailyDate?"":"none"}let a=document.querySelector('[data-action="toggle-scope"]');if(a){let s=!!m.currentId&&(m.currentType==="page"||m.currentType==="database")&&!m.currentRow&&m.currentId?A(m.currentId):null,l=s?.type==="database"&&s.list==="memola-daily",c=!!s&&!s.originPageId&&!s.trashed&&!l;a.style.display=c?"":"none",Promise.resolve().then(()=>(Qr(),pl)).then(d=>d.syncScopeTag())}if(!r){o&&(o.style.display="none"),t&&(t.style.display="none");return}o&&(o.style.display=""),Promise.resolve().then(()=>(Er(),wr)).then(i=>{let s=i.isPagePublished(m.currentId);e&&(e.textContent=s?"Web \u516C\u958B\u3092\u89E3\u9664":"Web \u516C\u958B"),t&&(t.style.display=s?"":"none")})}async function nB(){let e=m.currentId;if(!e)return;let t=await Promise.resolve().then(()=>(Er(),wr));if(t.isPagePublished(e)){if(!confirm("Web \u516C\u958B\u3092\u89E3\u9664\u3057\u307E\u3059\u3002SP \u4E0A\u306E\u516C\u958B\u30DA\u30FC\u30B8\uFF08Site Page\uFF09\u3082\u524A\u9664\u3055\u308C\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F"))return;try{await t.unpublishPage(e),w("\u516C\u958B\u3092\u89E3\u9664\u3057\u307E\u3057\u305F")}catch(o){w("\u89E3\u9664\u5931\u6557: "+o.message,"err")}hn()}else{await vt();let n=(E("ttl")?.value||"").trim()||"\u7121\u984C",{getBlocks:r}=await Promise.resolve().then(()=>(ht(),Bo)),{blocksToMd:a}=await Promise.resolve().then(()=>(Tt(),Dp)),i=a(r());try{let s=await t.publishPage(e,n,i);try{await navigator.clipboard.writeText(s)}catch{}w("\u516C\u958B\u3057\u307E\u3057\u305F\uFF08URL \u3092\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC\uFF09")}catch(s){w("\u516C\u958B\u5931\u6557: "+s.message,"err")}hn()}}async function rB(){let e=m.currentId;if(!e)return;let o=(await Promise.resolve().then(()=>(Er(),wr))).publishedUrlFor(e);try{await navigator.clipboard.writeText(o),w("URL \u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")}catch{w("\u30B3\u30D4\u30FC\u5931\u6557","err")}}async function aB(){let e=m.currentId;if(e){if(m.currentType!=="page"||m.currentRow){w("\u3053\u306E\u30DA\u30FC\u30B8\u306F\u4E0B\u66F8\u304D\u8907\u88FD\u306B\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u305B\u3093","err");return}await vt();try{R(!0,"\u4E0B\u66F8\u304D\u3092\u8907\u88FD\u4E2D\u2026");let{apiDuplicateAsDraft:t,apiGetPages:o}=await Promise.resolve().then(()=>(K(),je)),n=await t(e);await o(),oe(),uo(),await Fe(n.Id),w("\u4E0B\u66F8\u304D\u3092\u4F5C\u6210\u3057\u307E\u3057\u305F\u3002\u672C\u30E9\u30A4\u30D6\u30E9\u30EA\u306B\u306F\u8868\u793A\u3055\u308C\u307E\u305B\u3093 \u2014 \u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u{1F4DD} \u4E0B\u66F8\u304D\u300D \u304B\u3089\u518D\u5EA6\u958B\u3051\u307E\u3059")}catch(t){w("\u4E0B\u66F8\u304D\u8907\u88FD\u5931\u6557: "+t.message,"err")}finally{R(!1)}}}async function iB(){let e=m.currentId;if(!e)return;let t=m.pages.find(n=>n.Id===e);if(!t)return;let{openVersionHistory:o}=await Promise.resolve().then(()=>(TI(),II));await o(e,t.Title||"\u7121\u984C")}var LI,MI=L(()=>{"use strict";j();me();le();Be();W();im();Qr();yn();uI();bI();xI();_h();gt();Oo();ye();LI=!1});var lp={};q(lp,{applyRelayUpdate:()=>pB,checkRelayUpdate:()=>dB,getRelayBundleDir:()=>sB,setRelayBundleDir:()=>lB});function Kl(){let e=no.get();if(e)try{return new URL(e).origin}catch{}return"http://localhost:18080"}function PI(){return G.replace(/\/+$/,"")+"/Shared Documents/memola"}async function sB(){try{let e=await fetch(Kl()+"/memola/bundle-dir",{signal:AbortSignal.timeout(4e3)});if(!e.ok)return null;let t=await e.json();return{dir:String(t.dir||""),exists:!!t.exists,hasBundle:!!t.hasBundle}}catch{return null}}async function lB(e){try{let t=await fetch(Kl()+"/memola/bundle-dir",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({dir:e}),signal:AbortSignal.timeout(4e3)});if(!t.ok)return null;let o=await t.json();return{dir:String(o.dir||""),exists:!!o.exists,hasBundle:!!o.hasBundle}}catch{return null}}async function CI(){try{return(await fetch(Kl()+"/memola/health",{signal:AbortSignal.timeout(3e3)})).ok}catch{return!1}}async function cB(){try{let e=await fetch(PI()+"/relay-version.txt?t="+Date.now(),{credentials:"same-origin",cache:"no-cache"});if(!e.ok)return null;let t=JSON.parse(await e.text());return t.version&&Array.isArray(t.files)?t:null}catch{return null}}async function AI(){try{let e=await fetch(Kl()+"/memola/relay/version",{signal:AbortSignal.timeout(7e3)});return e.ok?await e.json():null}catch{return null}}async function dB(){if(!await CI())return{available:null,detail:"relay \u672A\u8D77\u52D5"};let[e,t]=await Promise.all([cB(),AI()]);return e?t?.version?e.version===t.version?{available:null,detail:`\u540C\u3058\u30D0\u30FC\u30B8\u30E7\u30F3 (v${t.version})`}:{available:{localVersion:t.version,remoteVersion:e.version,files:e.files},detail:`v${t.version} \u2192 v${e.version}`}:{available:null,detail:"relay /memola/relay/version \u53D6\u5F97\u5931\u6557"}:{available:null,detail:"SP \u306E relay-version.txt \u53D6\u5F97\u5931\u6557(\u914D\u7F6E\u3092\u78BA\u8A8D)"}}async function mB(e){try{let t=await fetch(PI()+"/"+e+"?t="+Date.now(),{credentials:"same-origin",cache:"no-cache"});if(!t.ok)return null;let o=await t.arrayBuffer();if(!o.byteLength)return null;let n="",r=new Uint8Array(o);for(let a=0;a<r.length;a+=32768)n+=String.fromCharCode.apply(null,Array.from(r.subarray(a,a+32768)));return{name:e,contentBase64:btoa(n)}}catch{return null}}async function pB(e){let t=[];for(let n of e){let r=await mB(n);if(!r)return{ok:!1,relayBackUp:!0,newVersion:null,error:`SP \u304B\u3089\u306EDL\u5931\u6557: ${n}`};t.push(r)}try{let n=await fetch(Kl()+"/memola/relay/self-update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({files:t}),signal:AbortSignal.timeout(3e4)});if(!n.ok){let r="";try{r=(await n.json())?.error?.detail??""}catch{}return{ok:!1,relayBackUp:!0,newVersion:null,error:`self-update HTTP ${n.status}: ${r}`}}try{await n.json()}catch{}}catch{}let o=Date.now();for(;Date.now()-o<25e3;)if(await new Promise(n=>setTimeout(n,1e3)),await CI())return{ok:!0,relayBackUp:!0,newVersion:(await AI())?.version??null};return{ok:!1,relayBackUp:!1,newVersion:null,error:"relay \u304C25\u79D2\u4EE5\u5185\u306B\u518D\u8D77\u52D5\u3057\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u624B\u52D5\u3067 memola-start.bat \u3092\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044"}}var cp=L(()=>{"use strict";He();ve()});var DI={};q(DI,{countResetTargets:()=>fB,resetAll:()=>bB,resetMyPrivateData:()=>gB,resetOthersData:()=>hB});async function Oh(){let e=Kt(),t=[Ie(de)];return e!==de&&t.push(Ie(e).catch(()=>[])),(await Promise.all(t)).flat()}async function uB(){let e=G+"/_api/web/lists?$select=Title&$filter="+encodeURIComponent("startswith(Title,'memola-')")+"&$top=500";return(await ne(e).catch(()=>null))?.results?.map(o=>o.Title)||[]}async function Hh(e,t){let o=[],n=0,a=["(startswith(Title,'memola-') or substringof('memola-',DirName))"];t&&e&&a.push("DeletedById eq "+e);let i=a.join(" and "),s=await ke().catch(()=>"");if(!s)return o.push("digest \u53D6\u5F97\u5931\u6557 (recycle bin \u30B9\u30AD\u30C3\u30D7)"),{count:n,errors:o};for(let l of["web","site"]){let c=G+"/_api/"+l+"/recycleBin?$select=Id,Title,DirName&$filter="+encodeURIComponent(i)+"&$top=5000",d=await ne(c).catch(u=>(o.push(`${l} bin \u53D6\u5F97\u5931\u6557: ${u.message||u}`),null));if(!d?.results)continue;let p=0;for(let u of d.results){p>0&&p%50===0&&(s=await ke().catch(()=>s)),p++;try{let f=await fetch(G+"/_api/"+l+"/RecycleBin('"+u.Id+"')/DeleteObject()",{method:"POST",headers:{"X-RequestDigest":s,Accept:"application/json;odata=verbose"},credentials:"include"});if(f.ok||f.status===404){n++;continue}if(f.status===401||f.status===403){s=await ke().catch(()=>s);let g=await fetch(G+"/_api/"+l+"/RecycleBin('"+u.Id+"')/DeleteObject()",{method:"POST",headers:{"X-RequestDigest":s,Accept:"application/json;odata=verbose"},credentials:"include"});if(g.ok||g.status===404){n++;continue}o.push((u.Title||u.Id)+": "+g.status+" (\u6A29\u9650\u4E0D\u8DB3? \u518D\u8A66\u884C\u3082\u5931\u6557)");continue}o.push((u.Title||u.Id)+": HTTP "+f.status)}catch(f){o.push((u.Title||u.Id)+": "+f.message)}}}return{count:n,errors:o}}async function BI(e,t,o){let{deleteListItem:n}=await Promise.resolve().then(()=>(Re(),Go)),{deleteRowEntry:r}=await Promise.resolve().then(()=>(K(),je)),a=0,i=[];try{i=await Ie("memola-daily")}catch(s){return s.message?.includes("404")||o.push("memola-daily \u53D6\u5F97\u5931\u6557: "+s.message),0}for(let s of i){let l=s.AuthorId||0;if(t==="mine"?l===e:l!==e)try{await n("memola-daily",s.Id),await r("memola-daily",s.Id).catch(()=>{}),a++}catch(d){o.push("memola-daily row #"+s.Id+": "+d.message)}}return a}async function fB(e){let t=m.meta.myUserId||await mt().catch(()=>0),o=[];try{o=await Oh()}catch{return{pages:0,dbs:0,dailyRows:0}}let n=o.filter(s=>s.PageType==="row"||e!=="all"&&s.PageType==="database"&&s.ListTitle==="memola-daily"?!1:e==="all"?!0:e==="mine"?s.Scope==="user"&&s.AuthorId===t:s.Scope==="org"||s.Scope==="user"&&s.AuthorId!==t||!s.Scope&&s.AuthorId!==t),r=0,a=0;for(let s of n)s.PageType==="database"?a++:r++;let i=0;if(e==="mine"||e==="others")try{let s=await Ie("memola-daily");for(let l of s){let c=l.AuthorId||0;(e==="mine"?c===t:c!==t)&&i++}}catch{}return{pages:r,dbs:a,dailyRows:i}}async function gB(){let e={pagesDeleted:0,dbsDeleted:0,spListsDeleted:0,recycleBinPurged:0,errors:[]},t=m.meta.myUserId||await mt().catch(()=>0);if(!t)return e.errors.push("SP \u30E6\u30FC\u30B6 ID \u3092\u89E3\u6C7A\u3067\u304D\u307E\u305B\u3093 \u2014 \u4E2D\u6B62"),e;let n=(await Oh()).filter(a=>a.PageType!=="row"&&a.Scope==="user"&&a.AuthorId===t&&!(a.PageType==="database"&&a.ListTitle==="memola-daily"));for(let a of n)try{await Sr(String(a.Id)),a.PageType==="database"?e.dbsDeleted++:e.pagesDeleted++}catch(i){e.errors.push(i.message)}e.pagesDeleted+=await BI(t,"mine",e.errors);let r=await Hh(t,!0);e.recycleBinPurged=r.count,e.errors.push(...r.errors);try{await lt()}catch{}return e}async function hB(){let e={pagesDeleted:0,dbsDeleted:0,spListsDeleted:0,recycleBinPurged:0,errors:[]},t=m.meta.myUserId||await mt().catch(()=>0),n=(await Oh()).filter(a=>a.PageType!=="row"&&(a.Scope==="org"||a.Scope==="user"&&a.AuthorId!==t||!a.Scope&&a.AuthorId!==t)&&!(a.PageType==="database"&&a.ListTitle==="memola-daily"));for(let a of n)try{await Sr(String(a.Id)),a.PageType==="database"?e.dbsDeleted++:e.pagesDeleted++}catch(i){e.errors.push(i.message)}e.pagesDeleted+=await BI(t,"others",e.errors);let r=await Hh(t,!0);e.recycleBinPurged=r.count,e.errors.push(...r.errors);try{await lt()}catch{}return e}async function bB(){let e={pagesDeleted:0,dbsDeleted:0,spListsDeleted:0,recycleBinPurged:0,errors:[]},t=await uB();for(let n of t)try{await La(n),e.spListsDeleted++}catch(r){e.errors.push(n+": "+r.message)}let o=await Hh(0,!1);e.recycleBinPurged=o.count,e.errors.push(...o.errors);try{let n=[];for(let r=0;r<localStorage.length;r++){let a=localStorage.key(r);a&&a.startsWith("memola.")&&n.push(a)}for(let r of n)localStorage.removeItem(r)}catch(n){e.errors.push("localStorage: "+n.message)}try{let{ragHardReset:n}=await Promise.resolve().then(()=>(qg(),Ww));await n()}catch(n){e.errors.push("rag: "+n.message)}return e}var _I=L(()=>{"use strict";j();$t();Re();Et();He();pr();K()});function OI(){if(NI)return;NI=!0;let e=document.getElementById("memola-settings-btn"),t=document.getElementById("memola-settings-md"),o=document.getElementById("memola-set-aikey"),n=document.getElementById("memola-set-provider"),r=document.getElementById("memola-set-claude-model"),a=document.getElementById("memola-set-corpai-model"),i=document.getElementById("memola-set-corpai-key"),s=document.getElementById("memola-set-corpai-baseurl"),l=document.getElementById("memola-set-corpai-prefix"),c=document.getElementById("memola-set-corpai-overrides"),d=document.getElementById("memola-set-localai-baseurl"),p=document.getElementById("memola-set-localai-key"),u=document.getElementById("memola-set-localai-model"),f=document.getElementById("memola-set-localai-models"),g=document.getElementById("memola-set-localai-reasoning"),y=document.getElementById("memola-set-embed-provider"),b=document.getElementById("memola-set-voyage-key"),h=document.getElementById("memola-set-voyage-model"),v=document.getElementById("memola-set-embed-model"),k=document.getElementById("memola-set-embed-apiver"),x=document.getElementById("memola-set-embed-dims"),T=document.getElementById("memola-set-rag-topk"),I=document.getElementById("memola-set-rag-minscore"),B=document.getElementById("memola-set-density"),F=document.getElementById("memola-set-theme"),P=document.getElementById("memola-set-savedelay"),H=document.getElementById("memola-set-syncpoll"),D=document.getElementById("memola-set-presence");if(document.getElementById("memola-set-shortcuts")?.addEventListener("click",()=>rh()),document.getElementById("memola-set-relay-update")?.addEventListener("click",()=>{yB()}),document.getElementById("memola-set-reset-mine")?.addEventListener("click",()=>Fh("mine","\u81EA\u5206\u306E\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u306E\u307F\u524A\u9664")),document.getElementById("memola-set-reset-others")?.addEventListener("click",()=>Fh("others","\u7D44\u7E54+\u4ED6\u4EBA\u306E\u30C7\u30FC\u30BF\u3092\u524A\u9664")),document.getElementById("memola-set-reset-all")?.addEventListener("click",()=>Fh("all","\u5168\u30C7\u30FC\u30BF + \u8A2D\u5B9A\u3092\u521D\u671F\u5316")),!e||!t||!o||!n||!r||!a||!i||!s||!l||!c||!d||!p||!u||!f||!g||!B||!F||!P||!H||!D)return;Promise.resolve().then(()=>(At(),$n)).then(ie=>{ie.CLAUDE_MODELS.forEach(N=>{let se=document.createElement("option");se.value=N.id,se.textContent=N.label,r.appendChild(se)}),ie.CORP_AI_MODELS.forEach(N=>{let se=document.createElement("option");se.value=N.id,se.textContent=N.id+(N.reasoning?" (\u63A8\u8AD6)":"")+(N.vision?" \u{1F5BC}":""),a.appendChild(se)}),v&&ie.EMBEDDING_MODELS.forEach(N=>{let se=document.createElement("option");se.value=N,se.textContent=N,v.appendChild(se)}),h&&ie.VOYAGE_MODELS.forEach(N=>{let se=document.createElement("option");se.value=N,se.textContent=N,h.appendChild(se)})});let U=n;function Y(){let ie=U.value,N=y?.value||"voyage";document.querySelectorAll(".memola-set-row[data-prov],.memola-set-row[data-embprov]").forEach(se=>{let Je=se.dataset.prov,Ee=se.dataset.embprov,Ze=!Je||Je.split(",").map(dt=>dt.trim()).includes(ie),to=!Ee||Ee.split(",").map(dt=>dt.trim()).includes(N);se.style.display=Ze&&to?"":"none"})}U.addEventListener("change",Y),y?.addEventListener("change",Y),document.querySelectorAll(".memola-set-tab").forEach(ie=>{ie.addEventListener("click",()=>{let N=ie.dataset.tab;N&&(document.querySelectorAll(".memola-set-tab").forEach(se=>se.classList.toggle("on",se===ie)),document.querySelectorAll(".memola-set-pane").forEach(se=>se.classList.toggle("on",se.dataset.pane===N)),N==="dev"&&vB())})}),e.addEventListener("click",()=>{document.querySelectorAll(".memola-set-tab").forEach(N=>N.classList.toggle("on",N.dataset.tab==="ai")),document.querySelectorAll(".memola-set-pane").forEach(N=>N.classList.toggle("on",N.dataset.pane==="ai"));let ie=document.getElementById("memola-set-build-id");ie&&(ie.textContent="260602-1002-9eec9d"),Promise.resolve().then(()=>(At(),$n)).then(N=>{try{n.value=N.getProvider(),r.value=N.getClaudeModel(),a.value=N.getCorpAiModel(),o.value=qr()||"",i.value=N.getCorpAiKey(),s.value=N.getCorpAiBaseUrl(),l.value=N.getCorpAiDeploymentPrefix(),c.value=N.getCorpAiOverridesRaw(),d.value=N.getLocalAiBaseUrl(),p.value=N.getLocalAiKey(),u.value=N.getLocalAiModel(),f.value=N.getLocalAiModels().join(`
`),g.value=N.getLocalAiReasoningModels().join(" "),y&&(y.value=N.getEmbedProvider()),b&&(b.value=N.getVoyageKey()),h&&(h.value=N.getVoyageModel()),v&&(v.value=N.getEmbeddingModel()),k&&(k.value=N.getEmbeddingApiVersion()),x&&(x.value=N.getEmbeddingDimensions()?.toString()||""),T&&(T.value=String(N.getRagTopK())),I&&(I.value=String(N.getRagMinScore()));let se=document.getElementById("memola-set-rag-extvec-folder");se&&(se.value=xa.get());{let Je=new Set(ka.get().split(",").map(Ee=>Ee.trim()));for(let Ee of RI){let Ze=document.getElementById("memola-set-rag-extvec-"+Ee);Ze&&(Ze.checked=Je.has(Ee))}}B.value=Vi.get(),F.value=Yi.get(),P.value=wa.get(),H.value=kn.get(),D.value=mr.get();{let Je=document.getElementById("memola-set-dev-source"),Ee=document.getElementById("memola-set-dev-localbase");Je&&(Je.value=Gi.get()==="local"?"local":"sharepoint"),Ee&&(Ee.value=sc.get())}}catch{}Y(),t.classList.add("on")})}),t.addEventListener("click",ie=>{ie.target===t&&t.classList.remove("on")}),document.getElementById("memola-set-cancel")?.addEventListener("click",()=>t.classList.remove("on")),document.getElementById("memola-set-save")?.addEventListener("click",()=>{let ie=c.value.trim();if(ie)try{let N=JSON.parse(ie);if(!N||typeof N!="object"||Array.isArray(N)){w("\u30AA\u30FC\u30D0\u30FC\u30E9\u30A4\u30C9 JSON \u306F\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u5F62\u5F0F\u3067\u66F8\u3044\u3066\u304F\u3060\u3055\u3044","err");return}}catch(N){w("\u30AA\u30FC\u30D0\u30FC\u30E9\u30A4\u30C9 JSON \u304C\u4E0D\u6B63\u3067\u3059: "+N.message,"err");return}Promise.resolve().then(()=>(At(),$n)).then(N=>{try{N.setProvider(n.value),r.value&&N.setClaudeModel(r.value),a.value&&N.setCorpAiModel(a.value),Mf(o.value),N.setCorpAiKey(i.value),N.setCorpAiBaseUrl(s.value),N.setCorpAiDeploymentPrefix(l.value),N.setCorpAiOverridesRaw(c.value),N.setLocalAiBaseUrl(d.value),N.setLocalAiKey(p.value),N.setLocalAiModel(u.value);let Je=f.value.split(/\r?\n/).map(Ze=>Ze.trim()).filter(Boolean);N.setLocalAiModels(Je),N.setLocalAiReasoningModels(g.value),y&&N.setEmbedProvider(y.value),b&&N.setVoyageKey(b.value),h&&N.setVoyageModel(h.value),v&&N.setEmbeddingModel(v.value),k&&N.setEmbeddingApiVersion(k.value),x&&N.setEmbeddingDimensions(x.value),T&&N.setRagTopK(T.value),I&&N.setRagMinScore(I.value);{let Ze=document.getElementById("memola-set-rag-extvec-folder");Ze&&xa.set(Ze.value.trim());let to=[];for(let dt of RI)document.getElementById("memola-set-rag-extvec-"+dt)?.checked&&to.push(dt);ka.set(to.join(","))}{let Ze=document.getElementById("memola-set-dev-source"),to=document.getElementById("memola-set-dev-localbase");Ze&&(Ze.value==="local"?Gi.set("local"):Gi.clear()),to&&sc.set(to.value.trim());let dt=document.getElementById("memola-set-dev-relaydir");dt&&dt.value.trim()&&Promise.resolve().then(()=>(cp(),lp)).then(Gl=>Gl.setRelayBundleDir(dt.value.trim()).then(_t=>{let ca=document.getElementById("memola-set-dev-relaydir-status");ca&&(ca.textContent=_t?`\u73FE\u5728: ${_t.dir} ${_t.hasBundle?"\u2705 memola.bundle.js \u3042\u308A":"\u26A0 memola.bundle.js \u304C\u7121\u3044"}`:"\u26A0 relay \u672A\u8D77\u52D5 / \u8A2D\u5B9A\u5931\u6557")}))}Vi.set(B.value),Yi.set(F.value),wa.set(P.value),kn.set(H.value);let Ee=mr.get();mr.set(D.value),m.sync.pageId&&m.sync.loadedModified&&m.sync.loadedEtag&&Promise.resolve().then(()=>(Rr(),tm)).then(Ze=>{Ze.startWatching(m.sync.pageId,m.sync.loadedModified,m.sync.loadedEtag)}),Ee!==D.value&&Promise.resolve().then(()=>(fl(),Ag)).then(Ze=>{D.value==="0"?Ze.shutdownPresence():Ze.syncPresenceForCurrent()})}catch{}let se=document.getElementById("memola-overlay");se&&(se.dataset.density=B.value,se.dataset.theme=F.value),Promise.resolve().then(()=>(sr(),ji)).then(Je=>Je.syncProviderBadge?.()),t.classList.remove("on"),w("\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F")})});let ee=document.getElementById("memola-overlay");ee&&(ee.dataset.density=Vi.get(),ee.dataset.theme=Yi.get())}async function vB(){let e=document.getElementById("memola-set-dev-relaydir"),t=document.getElementById("memola-set-dev-relaydir-status");t&&(t.textContent="relay \u306B\u7167\u4F1A\u4E2D\u2026");let{getRelayBundleDir:o}=await Promise.resolve().then(()=>(cp(),lp)),n=await o();if(!n){t&&(t.textContent="\u26A0 relay \u672A\u8D77\u52D5 / \u5FDC\u7B54\u306A\u3057(memola-start.bat \u3067\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044)");return}e&&!e.value&&(e.value=n.dir),t&&(t.textContent=`\u73FE\u5728: ${n.dir}  ${n.hasBundle?"\u2705 memola.bundle.js \u3042\u308A":"\u26A0 memola.bundle.js \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093"}`)}async function yB(){let e=document.getElementById("memola-set-relay-update-msg"),t=s=>{e&&(e.textContent=s)},{checkRelayUpdate:o,applyRelayUpdate:n}=await Promise.resolve().then(()=>(cp(),lp));t("\u78BA\u8A8D\u4E2D\u2026");let r=await o();if(!r.available){t("\u66F4\u65B0\u306A\u3057: "+r.detail);return}let a=r.available;if(!confirm(`\u30EA\u30EC\u30FC\u3092\u66F4\u65B0\u3057\u307E\u3059\u3002
  ${a.localVersion} \u2192 ${a.remoteVersion}
\u5BFE\u8C61: ${a.files.join(", ")}
\u30EA\u30EC\u30FC\u306F\u4E00\u5EA6\u505C\u6B62\u3057\u3066\u518D\u8D77\u52D5\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?`)){t("\u30AD\u30E3\u30F3\u30BB\u30EB\u3057\u307E\u3057\u305F ("+r.detail+")");return}t("\u66F4\u65B0\u3092\u9069\u7528\u4E2D\u2026 (\u30EA\u30EC\u30FC\u518D\u8D77\u52D5\u3092\u5F85\u3063\u3066\u3044\u307E\u3059\u3002\u6700\u592725\u79D2)");let i=await n(a.files);i.ok?(t(`\u2705 \u66F4\u65B0\u5B8C\u4E86\u3002\u30EA\u30EC\u30FC v${i.newVersion??"?"} \u3067\u518D\u8D77\u52D5\u3057\u307E\u3057\u305F\u3002`),w("\u30EA\u30EC\u30FC\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F","ok")):(t("\u274C "+(i.error||"\u66F4\u65B0\u5931\u6557")),w("\u30EA\u30EC\u30FC\u66F4\u65B0\u306B\u5931\u6557: "+(i.error||""),"err"))}async function Fh(e,t){let o=await Promise.resolve().then(()=>(_I(),DI));R(!0,"\u5BFE\u8C61\u3092\u96C6\u8A08\u4E2D...");let n;try{n=await o.countResetTargets(e)}catch(i){R(!1),w("\u96C6\u8A08\u5931\u6557: "+i.message,"err");return}R(!1);let r=n.pages+n.dbs+n.dailyRows,a=e==="all"?"\u5168 memola-* SP \u30EA\u30B9\u30C8 + \u5168 memola.* localStorage \u30AD\u30FC":`\u30DA\u30FC\u30B8 ${n.pages} \u4EF6 + DB ${n.dbs} \u4EF6`+(n.dailyRows>0?` + \u30C7\u30A4\u30EA\u30FC ${n.dailyRows} \u4EF6`:"");if(r===0&&e!=="all"){w("\u524A\u9664\u5BFE\u8C61\u306E\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093");return}if(confirm("\u3010"+t+`\u3011

\u524A\u9664\u5BFE\u8C61: `+a+`

\u26A0 \u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002SP \u306E\u3054\u307F\u7BB1\u304B\u3089\u3082\u5FA9\u5143\u3067\u304D\u307E\u305B\u3093\u3002

\u672C\u5F53\u306B\u5B9F\u884C\u3057\u307E\u3059\u304B?`)&&confirm("\u6700\u7D42\u78BA\u8A8D: \u5B9F\u884C\u3059\u308B\u3068\u5373\u5EA7\u306B SP \u304B\u3089\u30C7\u30FC\u30BF\u304C\u524A\u9664\u3055\u308C\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?")){R(!0,"\u524A\u9664\u4E2D... (\u6642\u9593\u304C\u304B\u304B\u308B\u5834\u5408\u304C\u3042\u308A\u307E\u3059)");try{let i=e==="mine"?await o.resetMyPrivateData():e==="others"?await o.resetOthersData():await o.resetAll(),s=e==="all"?`SP \u30EA\u30B9\u30C8 ${i.spListsDeleted} \u4EF6 / \u5B8C\u5168\u524A\u9664 ${i.recycleBinPurged} \u4EF6`:`\u30DA\u30FC\u30B8 ${i.pagesDeleted} / DB ${i.dbsDeleted} / \u5B8C\u5168\u524A\u9664 ${i.recycleBinPurged} \u4EF6`,l="";if(i.errors.length>0){let c=i.errors[0].length>80?i.errors[0].slice(0,80)+"\u2026":i.errors[0];l=i.errors.length===1?` (\u5931\u6557 1 \u4EF6: ${c})`:` (\u5931\u6557 ${i.errors.length} \u4EF6\u3001\u6700\u521D: ${c})`,console.warn("[Memola reset errors]",i.errors),setTimeout(()=>{let d=i.errors.slice(0,20).join(`
`),p=i.errors.length>20?`
\u2026\u4ED6 ${i.errors.length-20} \u4EF6 (\u30B3\u30F3\u30BD\u30FC\u30EB\u53C2\u7167)`:"";alert(`\u3010\u30EA\u30BB\u30C3\u30C8\u306E\u5931\u6557\u8A73\u7D30 \u2014 ${i.errors.length} \u4EF6\u3011

${d}${p}`)},800)}if(e!=="all"){let{renderTree:c}=await Promise.resolve().then(()=>(Be(),po));c();let d=await Promise.resolve().then(()=>(W(),ce));if(m.currentRow){let p=m.currentRow.dbId,u=m.pages.some(f=>f.Id===p);if(m.currentRow=null,u){let f=m.pages.find(g=>g.Id===p);f&&await d.doSelectDb(p,f)}else m.currentId=null,et("empty")}else if(m.currentType==="database"&&m.currentId){let p=m.pages.find(u=>u.Id===m.currentId);p?await d.doSelectDb(m.currentId,p):(m.currentId=null,et("empty"))}else m.currentId&&m.pages.some(u=>u.Id===m.currentId)||(m.currentId=null,et("empty"))}w(t+" \u5B8C\u4E86: "+s+l,i.errors.length>0?"err":"ok"),document.getElementById("memola-settings-md")?.classList.remove("on"),e==="all"&&setTimeout(()=>{confirm("\u5B8C\u5168\u30EA\u30BB\u30C3\u30C8\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002SP \u30DA\u30FC\u30B8\u3092\u4ECA\u3059\u3050\u30EA\u30ED\u30FC\u30C9\u3057\u307E\u3059\u304B?")&&location.reload()},500)}catch(i){w("\u30EA\u30BB\u30C3\u30C8\u5931\u6557: "+i.message,"err")}finally{R(!1)}}}var RI,NI,HI=L(()=>{"use strict";j();le();W();si();ve();Km();RI=["mail","onenote","pptx","doc","transcript"],NI=!1});var zI={};q(zI,{attachPaneResizers:()=>wB});function xB(e){let t=document.getElementById(e.paneId);if(!t)return;let o=e.pref.get();if(!o)return;let n=parseInt(o,10);isNaN(n)||(t.style.width=Math.min(e.max,Math.max(e.min,n))+"px")}function UI(e){let t=document.getElementById(e.paneId);if(!t)return;let o=t.querySelector(":scope > .memola-pane-resize");o||(o=document.createElement("div"),o.className="memola-pane-resize memola-pane-resize-"+e.edge,o.title="\u5E45\u3092\u5909\u66F4 (\u30C9\u30E9\u30C3\u30B0)",t.appendChild(o),t.style.position=t.style.position||"relative",o.addEventListener("mousedown",n=>kB(n,e)),o.addEventListener("dblclick",()=>{e.pref.clear(),t.style.width=""})),o.style.display=e.enabled&&!e.enabled()?"none":""}function kB(e,t){let o=document.getElementById(t.paneId);if(!o)return;let n=o;e.preventDefault(),e.stopPropagation();let r=e.clientX,a=n.offsetWidth,i=t.edge==="right"?1:-1;document.body.style.cursor="col-resize",document.body.style.userSelect="none";let s=document.getElementById("memola-overlay");s?.classList.add("memola-resizing");function l(d){let p=(d.clientX-r)*i,u=Math.min(t.max,Math.max(t.min,a+p));n.style.width=u+"px"}function c(){document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",c),document.body.style.cursor="",document.body.style.userSelect="",s?.classList.remove("memola-resizing"),t.pref.set(String(n.offsetWidth))}document.addEventListener("mousemove",l),document.addEventListener("mouseup",c)}function wB(){FI.forEach(t=>{xB(t),UI(t)});let e=document.getElementById("memola-sb");e&&new MutationObserver(()=>{let o=FI.find(n=>n.paneId==="memola-sb");o&&UI(o)}).observe(e,{attributes:!0,attributeFilter:["class"]})}var FI,jI=L(()=>{"use strict";ve();FI=[{paneId:"memola-sb",edge:"right",pref:yp,min:160,max:360,enabled:()=>{let e=document.getElementById("memola-sb");return!!e&&!e.classList.contains("collapsed")}},{paneId:"memola-outline",edge:"right",pref:xp,min:180,max:400},{paneId:"memola-props",edge:"left",pref:kp,min:200,max:480},{paneId:"memola-ai-panel",edge:"left",pref:wp,min:240,max:500}]});function $I(){if(qI)return;qI=!0,E("ai-btn").addEventListener("click",Fl),E("ai-close").addEventListener("click",Jm),E("ai-clear").addEventListener("click",kh),document.getElementById("memola-ai-new")?.addEventListener("click",()=>Xm()),E("ai-hist").addEventListener("change",()=>{let n=E("ai-hist").value;n==="__new__"?Xm():bh(n)}),ir(),yh(),Promise.resolve().then(()=>(jI(),zI)).then(n=>n.attachPaneResizers()),Promise.resolve().then(()=>(sr(),ji)).then(n=>n.syncProviderBadge?.());let e=document.getElementById("memola-ai-model-pick");e&&e.addEventListener("change",()=>{Promise.resolve().then(()=>(sr(),ji)).then(n=>n.applyModelPick?.(e.value))}),E("ai-send").addEventListener("click",()=>{let n=E("ai-input");Ul(n.value)}),E("ai-input").addEventListener("keydown",n=>{let r=n;if(!(r.isComposing||r.keyCode===229)&&r.key==="Enter"&&!r.shiftKey){n.preventDefault();let a=E("ai-input");Ul(a.value)}});let t=E("ai-input");t.addEventListener("input",()=>{t.style.height="auto",t.style.height=Math.min(t.scrollHeight,232)+"px",t.scrollTop=t.scrollHeight});let o=E("ai-chips");wh().forEach(n=>{let r=document.createElement("button");r.className="memola-ai-chip",r.textContent=n.label,r.addEventListener("click",()=>{Ul(n.prompt)}),o.appendChild(r)})}var qI,KI=L(()=>{"use strict";me();sr();qI=!1});function Uh(){let e=document.getElementById("memola-overlay");if(!e)return;if(Ea.get()==="1")e.classList.add("focus-mode"),document.getElementById("memola-sb")?.classList.add("collapsed");else{e.classList.remove("focus-mode");let o=Ia.get(),n=document.getElementById("memola-sb");n&&(n.classList.remove("collapsed"),o==="collapsed"&&n.classList.add("collapsed"))}}function dp(){Ea.get()==="1"?Ea.clear():Ea.set("1"),Uh()}function mp(){let e=document.getElementById("memola-sb");e&&(window.innerWidth<900?e.classList.contains("collapsed")||(e.dataset.autoCollapsed="1",e.classList.add("collapsed")):e.dataset.autoCollapsed==="1"&&(delete e.dataset.autoCollapsed,e.classList.remove("collapsed")))}var zh=L(()=>{"use strict";ve()});function up(){E("trash-md").classList.add("on"),pp();let t=document.getElementById("memola-trash-empty");t&&!t.dataset.wired&&(t.dataset.wired="1",t.addEventListener("click",()=>{EB()}))}function qh(){E("trash-md").classList.remove("on")}async function WI(){let e=m.meta.myUserId||0,t=(r,a)=>r!=="user"||!e||!a?!1:a!==e,o=[];for(let r of mu()){let a=A(r.id);t(a?.scope,a?.authorId||0)||o.push({kind:r.type==="database"?"database":"page",bodyId:r.id,title:r.title,trashedAt:r.trashed,trashedBy:a?.trashedBy||0})}let n=[];try{n=await Jp()}catch{}for(let r of n){if(t(r.scope,r.authorId))continue;let a=m.meta.pages.find(i=>i.type==="database"&&i.list===r.listTitle);a&&t(a.scope,a.authorId||0)||o.push({kind:"row",bodyId:String(r.bodyId),title:r.title||"(\u7121\u984C\u306E\u884C)",trashedAt:r.trashedAt,trashedBy:r.trashedBy,rowListTitle:r.listTitle,rowDbRowId:r.dbRowId,rowParentDbTitle:a?.title||"(\u524A\u9664\u6E08\u307FDB)"})}return o.sort((r,a)=>a.trashedAt-r.trashedAt),o}async function jh(e){if(m.dbList===e)try{let{getListItems:t}=await Promise.resolve().then(()=>(Re(),Go)),o=await t(e);m.dbItems=o.filter(r=>!(typeof r.Trashed=="number"&&r.Trashed>0));let{renderDbTable:n}=await Promise.resolve().then(()=>(W(),ce));n()}catch{}}async function EB(){let e=await WI(),t=m.meta.myUserId||0,o=e.filter(c=>c.trashedBy===t),n=e.filter(c=>c.trashedBy!==t);if(o.length===0){n.length>0?w(`\u4ED6\u306E\u30E6\u30FC\u30B6\u306E ${n.length} \u4EF6\u306F\u3042\u306A\u305F\u304C\u5B8C\u5168\u524A\u9664\u3067\u304D\u307E\u305B\u3093`):w("\u30B4\u30DF\u7BB1\u306F\u7A7A\u3067\u3059");return}let r=`${o.length} \u4EF6\u3092\u3059\u3079\u3066\u5B8C\u5168\u524A\u9664\u3057\u307E\u3059\u3002\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002
`+(n.length>0?`(\u4ED6\u306E\u30E6\u30FC\u30B6\u306E ${n.length} \u4EF6\u306F\u5BFE\u8C61\u5916\u3067\u6B8B\u308A\u307E\u3059)
`:"")+"\u3088\u308D\u3057\u3044\u3067\u3059\u304B?";if(!confirm(r))return;R(!0,"\u5B8C\u5168\u524A\u9664\u4E2D...");let a=0,i=0,s=new Set;for(let c of o)try{c.kind==="row"&&c.rowListTitle&&c.rowDbRowId?(await Fc(c.rowListTitle,c.rowDbRowId),s.add(c.rowListTitle)):await Sr(c.bodyId),a++}catch{i++}try{await lt()}catch{}for(let c of s)await jh(c);R(!1),oe(),pp();let l=`${a} \u4EF6\u524A\u9664\u3057\u307E\u3057\u305F`;i>0&&(l+=` (\u5931\u6557 ${i} \u4EF6)`),n.length>0&&(l+=` / \u4ED6\u306E\u30E6\u30FC\u30B6\u306E ${n.length} \u4EF6\u306F\u6B8B\u3063\u3066\u3044\u307E\u3059`),w(l)}async function pp(){let e=E("trash-list");e.innerHTML='<div class="memola-trash-empty">\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026</div>';let t=await WI();if(e.innerHTML="",t.length===0){e.innerHTML='<div class="memola-trash-empty">\u30B4\u30DF\u7BB1\u306F\u7A7A\u3067\u3059</div>';return}let o=Array.from(new Set(t.map(a=>a.trashedBy).filter(a=>a>0))),n=new Map;await Promise.all(o.map(async a=>{let i=await Ca(a);i&&n.set(a,i)}));let r=m.meta.myUserId||0;t.forEach(a=>{let i=document.createElement("div");i.className="memola-trash-row";let s=new Date(a.trashedAt).toLocaleString("ja-JP"),l=a.trashedBy===r?"\u3042\u306A\u305F":n.get(a.trashedBy)||"\u4E0D\u660E",c=a.trashedBy===r,d=a.kind==="database"?"\u{1F5C3} DB":a.kind==="row"?"\u{1F4CB} \u884C":"\u{1F4C4} \u30DA\u30FC\u30B8",p=a.kind==="row"&&a.rowParentDbTitle?` \xB7 ${M(a.rowParentDbTitle)} \u5185`:"";i.innerHTML='<div class="memola-trash-info"><div class="memola-trash-title">'+M(a.title||"(\u7121\u984C)")+'</div><div class="memola-trash-meta">'+d+p+" \xB7 <b>"+M(l)+"</b> \u304C "+s+' \u306B\u524A\u9664</div></div><button class="memola-trash-btn memola-trash-restore" title="\u5FA9\u5143">\u21BA</button><button class="memola-trash-btn memola-trash-purge" '+(c?'title="\u5B8C\u5168\u524A\u9664"':'title="\u4ED6\u306E\u30E6\u30FC\u30B6\u304C\u524A\u9664\u3057\u305F\u9805\u76EE\u306F\u5B8C\u5168\u524A\u9664\u3067\u304D\u307E\u305B\u3093" disabled')+">\u{1F5D1}</button>",i.querySelector(".memola-trash-restore").addEventListener("click",async()=>{try{R(!0,"\u5FA9\u5143\u4E2D..."),a.kind==="row"&&a.rowListTitle&&a.rowDbRowId?(await Xp(a.rowListTitle,a.rowDbRowId),await jh(a.rowListTitle)):await Ts(a.bodyId),await lt(),oe(),await pp(),w("\u5FA9\u5143\u3057\u307E\u3057\u305F")}catch(u){w("\u5FA9\u5143\u5931\u6557: "+u.message,"err")}finally{R(!1)}}),c&&i.querySelector(".memola-trash-purge").addEventListener("click",async()=>{if(confirm("\u5B8C\u5168\u306B\u524A\u9664\u3057\u307E\u3059\u3002\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002"))try{R(!0,"\u524A\u9664\u4E2D..."),a.kind==="row"&&a.rowListTitle&&a.rowDbRowId?(await Fc(a.rowListTitle,a.rowDbRowId),await jh(a.rowListTitle)):await Sr(a.bodyId);try{await lt()}catch{}oe(),await pp(),w("\u5B8C\u5168\u306B\u524A\u9664\u3057\u307E\u3057\u305F")}catch(u){w("\u524A\u9664\u5931\u6557: "+u.message,"err")}finally{R(!1)}}),e.appendChild(i)})}var $h=L(()=>{"use strict";j();me();K();Ke();$t();Be();le();De();ye()});function VI(e){GI||(GI=!0,dh([{id:"new-page",label:"\u65B0\u3057\u3044\u30DA\u30FC\u30B8",icon:"\uFF0B",key:"\u2318N",run:()=>{ho("")}},{id:"new-db",label:"\u65B0\u3057\u3044DB",icon:"\u{1F5C2}",key:"\u2318\u21E7N",run:()=>{e.doNewDb("")}},{id:"ai-ask",label:"AI\u306B\u8CEA\u554F",icon:"\u2726",key:"\u2318\u21E7A",run:()=>{Fl()}},{id:"toc",label:"\u76EE\u6B21\u30D1\u30CD\u30EB\u3092\u5207\u66FF",icon:"\u2630",key:"\u2318\u21E7L",run:()=>{dl()}},{id:"props",label:"\u30D7\u30ED\u30D1\u30C6\u30A3\u30D1\u30CD\u30EB\u3092\u5207\u66FF",icon:"\u25A4",key:"\u2318\u21E7R",run:()=>{ml()}},{id:"focus",label:"\u96C6\u4E2D\u30E2\u30FC\u30C9\u5207\u66FF",icon:"\u26F6",key:"\u2318\u21E7F",run:()=>{dp()}},{id:"trash",label:"\u30B4\u30DF\u7BB1\u3092\u958B\u304F",icon:"\u{1F5D1}",key:"",run:()=>{up()}},{id:"settings",label:"\u8A2D\u5B9A",icon:"\u2699",key:"",run:()=>{document.getElementById("memola-settings-md")?.classList.add("on")}}]))}var GI,YI=L(()=>{"use strict";Hl();yn();sr();bi();vi();zh();$h();GI=!1});var JI={};q(JI,{clearCurrentWorkspace:()=>Wh,ensureWorkspaceSelected:()=>IB,getCurrentWorkspaceName:()=>gp,loadWorkspaces:()=>sa,saveWorkspaces:()=>fp,setCurrentWorkspace:()=>hp,showWorkspaceMenu:()=>la,switchWorkspace:()=>Kh,validateWorkspaceUrl:()=>XI});function sa(){let e=dc.get();if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function fp(e){dc.set(JSON.stringify(e))}function gp(){let e=cr.get();return e?sa().some(o=>o.name===e)?e:(cr.clear(),dr.clear(),""):""}function hp(e,t){cr.set(e),dr.set(t)}function Wh(){cr.clear(),dr.clear()}async function XI(e){let t=e.trim().replace(/\/$/,"");if(!/^https:\/\//.test(t))return"URL \u306F https:// \u3067\u59CB\u3081\u3066\u304F\u3060\u3055\u3044";if(!/\/sites\/[^/]+/.test(t)&&!/^https:\/\/[^/]+$/.test(t))return"SharePoint \u30B5\u30A4\u30C8 URL \u306E\u5F62\u5F0F\u3067\u306F\u3042\u308A\u307E\u305B\u3093 (\u4F8B: https://contoso.sharepoint.com/sites/team)";try{let o=await fetch(t+"/_api/web?$select=Title",{headers:{Accept:"application/json;odata=verbose"},credentials:"include"});return o.status===404?"\u30B5\u30A4\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093 (404)":o.status===403?"\u30B5\u30A4\u30C8\u3078\u306E\u30A2\u30AF\u30BB\u30B9\u6A29\u304C\u3042\u308A\u307E\u305B\u3093 (403)":o.status===401?"SharePoint \u306B\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u3044\u306A\u3044\u3001\u307E\u305F\u306F\u8A8D\u8A3C\u304C\u5207\u308C\u3066\u3044\u307E\u3059 (401)":o.ok?null:"\u30B5\u30A4\u30C8\u78BA\u8A8D\u306B\u5931\u6557\u3057\u307E\u3057\u305F ("+o.status+")"}catch(o){return"\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F: "+o.message}}async function Kh(e){R(!0,"\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u3092\u5207\u66FF\u4E2D\u2026");try{hp(e.name,e.url),Tp(e.url),Eb(),Cp(),lu(),Zp(),bw(),Lp();let{renderTree:t}=await Promise.resolve().then(()=>(Be(),po)),{showView:o}=await Promise.resolve().then(()=>(W(),ce)),{stopWatching:n}=await Promise.resolve().then(()=>(Rr(),tm));n(),o("empty"),t(),await lt(),t();let r=document.getElementById("memola-ws-name");r&&(r.textContent=e.name),Promise.resolve().then(()=>(Oo(),Vn)).then(c=>c.refreshDraftsBadge?.());let a=await Promise.resolve().then(()=>(W(),ce)),i=a.loadLastOpenedPage(),l=(i?m.pages.find(c=>c.Id===i&&!c.IsDraft):null)||m.pages.find(c=>!c.IsDraft)||null;l&&await a.doSelect(l.Id),w("\u300C"+e.name+"\u300D \u306B\u5207\u308A\u66FF\u3048\u307E\u3057\u305F")}catch(t){w("\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u5207\u66FF\u5931\u6557: "+t.message,"err")}finally{R(!1)}}async function IB(){let e=sa();if(e.length===0)return;let t=cr.get();if(t&&e.some(n=>n.name===t))return;Wh();let o=e.find(n=>n.url.replace(/\/$/,"")===G);if(o){hp(o.name,o.url);return}w("\u73FE\u5728\u306E\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u304C\u524A\u9664\u3055\u308C\u3066\u3044\u307E\u3059 \u2014 \u4E00\u89A7\u304B\u3089\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044","err")}function la(e){document.getElementById("memola-ws-menu")?.remove();let t=sa(),o=gp(),n=document.createElement("div");if(n.id="memola-ws-menu",n.className="memola-ws-menu",t.length===0){let c=document.createElement("div");c.className="memola-ws-empty",c.textContent="\u307E\u3060\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u304C\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u305B\u3093",n.appendChild(c)}else t.forEach(c=>{let d=document.createElement("div");d.className="memola-ws-item"+(c.name===o?" on":""),d.innerHTML='<div class="memola-ws-item-body"><div class="memola-ws-item-name">'+M(c.name)+'</div><div class="memola-ws-item-url">'+M(c.url)+'</div></div><button class="memola-ws-item-rn" title="\u540D\u79F0\u5909\u66F4">'+$.edit+'</button><button class="memola-ws-item-rm" title="\u4E00\u89A7\u304B\u3089\u524A\u9664">'+$.trash+"</button>",d.querySelector(".memola-ws-item-body")?.addEventListener("click",()=>{s(),c.name!==o&&Kh(c)}),d.querySelector(".memola-ws-item-rn")?.addEventListener("click",p=>{p.stopPropagation();let u=prompt("\u65B0\u3057\u3044\u540D\u79F0:",c.name);if(u==null)return;let f=u.trim();if(!f||f===c.name)return;let g=sa();if(g.some(b=>b.name===f)){w("\u540C\u3058\u540D\u79F0\u306E\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u304C\u65E2\u306B\u3042\u308A\u307E\u3059","err");return}let y=g.map(b=>b.name===c.name?{...b,name:f}:b);if(fp(y),o===c.name){hp(f,c.url);let b=document.getElementById("memola-ws-name");b&&(b.textContent=f)}w("\u540D\u79F0\u3092\u5909\u66F4\u3057\u307E\u3057\u305F"),s(),la(e)}),d.querySelector(".memola-ws-item-rm")?.addEventListener("click",async p=>{if(p.stopPropagation(),!confirm("\u300C"+c.name+"\u300D \u3092\u4E00\u89A7\u304B\u3089\u524A\u9664\u3057\u307E\u3059\u3002SharePoint \u4E0A\u306E\u30C7\u30FC\u30BF\u306B\u306F\u5F71\u97FF\u3057\u307E\u305B\u3093\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?"))return;let u=sa().filter(f=>f.name!==c.name);if(fp(u),w("\u524A\u9664\u3057\u307E\u3057\u305F"),o===c.name){if(u.length>0){s();let g=document.getElementById("memola-ws-name");g&&(g.textContent=u[0].name),await Kh(u[0]),la(e);return}Wh();let f=document.getElementById("memola-ws-name");f&&(f.textContent="Memola")}s(),la(e)}),n.appendChild(d)});let r=document.createElement("div");r.className="memola-ws-sep",n.appendChild(r);let a=document.createElement("div");a.className="memola-ws-add",a.textContent="+ \u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u3092\u8FFD\u52A0",a.addEventListener("click",async()=>{let c=prompt("\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u540D (\u4F8B: \u55B6\u696D\u30C1\u30FC\u30E0):");if(!c||!c.trim())return;let d=prompt("SharePoint \u30B5\u30A4\u30C8 URL (\u4F8B: https://contoso.sharepoint.com/sites/sales):");if(!d||!d.trim())return;let p=c.trim(),u=d.trim().replace(/\/$/,""),f=sa();if(f.some(y=>y.name===p)){w("\u540C\u3058\u540D\u79F0\u306E\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u304C\u65E2\u306B\u3042\u308A\u307E\u3059","err");return}R(!0,"URL \u3092\u78BA\u8A8D\u4E2D\u2026");let g=null;try{g=await XI(u)}finally{R(!1)}if(g){w("\u8FFD\u52A0\u3067\u304D\u307E\u305B\u3093: "+g,"err");return}f.push({name:p,url:u}),fp(f),w("\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u300C"+p+"\u300D \u3092\u8FFD\u52A0\u3057\u307E\u3057\u305F"),s(),la(e)}),n.appendChild(a);let i=e.getBoundingClientRect();n.style.position="fixed",n.style.top=i.bottom+4+"px",n.style.left=i.left+"px",document.getElementById("memola-overlay")?.appendChild(n),setTimeout(()=>{document.addEventListener("click",l)},0);function s(){n.remove(),document.removeEventListener("click",l)}function l(c){!n.contains(c.target)&&c.target!==e&&s()}}var Gh=L(()=>{"use strict";j();He();ns();le();pr();Re();K();De();Sn();Sg();ve()});function QI(){if(ZI)return;ZI=!0,E("outline-btn").addEventListener("click",dl),document.getElementById("memola-outline-x")?.addEventListener("click",()=>{Promise.resolve().then(()=>(bi(),wg)).then(t=>t.setOutlineOpen(!1))}),kg(),Jr(),E("props-btn").addEventListener("click",ml),document.getElementById("memola-props-x")?.addEventListener("click",()=>{Promise.resolve().then(()=>(vi(),Eg)).then(t=>t.setPropertiesOpen(!1))}),Zr(),E("trash-btn").addEventListener("click",up),E("trash-close").addEventListener("click",qh),E("trash-md").addEventListener("click",t=>{t.target===E("trash-md")&&qh()});let e=gp();e&&(E("ws-name").textContent=e),E("ws-btn").addEventListener("click",t=>{t.stopPropagation(),la(E("ws-btn"))})}var ZI,e1=L(()=>{"use strict";me();bi();vi();$h();Gh();ZI=!1});var s1={};q(s1,{attachInbox:()=>Yh,closeInbox:()=>vp,navigateToMention:()=>Xh,openInbox:()=>n1,pollMentions:()=>i1,refreshInboxBadge:()=>Jh});function Yh(){if(t1)return;t1=!0,document.getElementById("memola-inbox-btn")?.addEventListener("click",n1),document.getElementById("memola-inbox-close")?.addEventListener("click",vp),document.getElementById("memola-inbox-readall")?.addEventListener("click",()=>void LB());let e=document.getElementById(Vh);e?.addEventListener("click",t=>{t.target===e&&vp()}),i1()}function vp(){document.getElementById(Vh)?.classList.remove("on")}async function n1(){let e=document.getElementById(Vh);e&&e.classList.add("on"),await r1()}async function r1(){let e=document.getElementById("memola-inbox-list");if(e){e.innerHTML='<div class="memola-inbox-empty">\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026</div>';try{Ki=await zp()}catch{Ki=[]}if(Ki.length===0){e.innerHTML='<div class="memola-inbox-empty">\u30E1\u30F3\u30B7\u30E7\u30F3\u306F\u3042\u308A\u307E\u305B\u3093\u3002</div>';return}e.innerHTML=Ki.map(t=>{let o=t.Created?wn(Date.parse(t.Created)):"";return'<div class="memola-inbox-item'+(t.Read?" read":"")+'" data-id="'+t.Id+'">'+(t.Read?"":'<span class="memola-inbox-dot"></span>')+'<div class="memola-inbox-main"><div class="memola-inbox-line1"><span class="memola-inbox-actor">'+M(t.ActorName||"\u8AB0\u304B")+'</span> \u304C\u3042\u306A\u305F\u3092\u30E1\u30F3\u30B7\u30E7\u30F3<span class="memola-inbox-time">'+M(o)+'</span></div><div class="memola-inbox-page">'+M(t.PageTitle||"(\u30DA\u30FC\u30B8)")+'</div><div class="memola-inbox-snippet">'+M(t.Snippet||"")+"</div></div></div>"}).join(""),e.querySelectorAll(".memola-inbox-item").forEach(t=>{t.addEventListener("click",()=>void TB(Number(t.dataset.id)))})}}async function TB(e){let t=Ki.find(o=>o.Id===e);t&&(vp(),await Xh(t))}async function Xh(e){await jp(e.Id).catch(()=>{}),bp.add(e.Id),Jh();try{let{doSelect:t}=await Promise.resolve().then(()=>(W(),ce)),{appIdForCommentKey:o}=await Promise.resolve().then(()=>(K(),je)),n=o(e.PageId)||e.PageId;await t(n),(await Promise.resolve().then(()=>(Ao(),mn))).focusComment(e.PageId,e.CommentId)}catch{}}async function LB(){await Promise.all(Ki.filter(e=>!e.Read).map(e=>jp(e.Id))),await r1(),Jh()}function a1(e){let t=E("inbox-btn")?.querySelector(".memola-inbox-badge-count");t&&(t.textContent=e>0?"("+e+")":"")}async function Jh(){try{a1(await $b())}catch{}}async function i1(){let e;try{e=await zp()}catch{return}let t=e.filter(o=>!o.Read);if(a1(t.length),!o1){t.forEach(o=>bp.add(o.Id)),o1=!0;return}for(let o of t)bp.has(o.Id)||(bp.add(o.Id),MB(o))}function SB(){let e=document.getElementById("memola-mention-toasts");return e||(e=document.createElement("div"),e.id="memola-mention-toasts",(document.getElementById("memola-overlay")||document.body).appendChild(e)),e}function MB(e){let t=document.createElement("div");t.className="memola-mention-toast",t.innerHTML='<div class="memola-mention-toast-hd">\u{1F4AC} '+M(e.ActorName||"\u8AB0\u304B")+' \u304C\u3042\u306A\u305F\u3092\u30E1\u30F3\u30B7\u30E7\u30F3</div><div class="memola-mention-toast-page">'+M(e.PageTitle||"(\u30DA\u30FC\u30B8)")+"</div>"+(e.Snippet?'<div class="memola-mention-toast-snippet">'+M(e.Snippet)+"</div>":"")+'<button class="memola-mention-toast-x" title="\u9589\u3058\u308B">\xD7</button>';let o=()=>{t.classList.remove("on"),setTimeout(()=>t.remove(),200)};t.querySelector(".memola-mention-toast-x")?.addEventListener("click",n=>{n.stopPropagation(),o()}),t.addEventListener("click",()=>{o(),Xh(e)}),SB().appendChild(t),requestAnimationFrame(()=>t.classList.add("on")),setTimeout(o,9e3)}var Vh,t1,Ki,bp,o1,Zh=L(()=>{"use strict";me();De();vo();Cc();Vh="memola-inbox-md",t1=!1;Ki=[];bp=new Set,o1=!1});async function c1(){if(!Qh&&!(Date.now()-l1<PB)&&!re.isBusy()&&!du()&&!re.isDirty()){Qh=!0;try{try{await lt();let{renderTree:e}=await Promise.resolve().then(()=>(Be(),po));e()}catch{}if(!m.currentId)return;if(m.currentType==="database"&&!m.currentRow){let e=m.pages.find(t=>t.Id===m.currentId);if(e)await(await Promise.resolve().then(()=>(W(),ce))).doSelectDb(m.currentId,e);else{m.currentId=null;let{showView:t}=await Promise.resolve().then(()=>(W(),ce));t("empty")}}}finally{l1=Date.now(),Qh=!1}}}function d1(){let e=document.body;e.dataset.memolaTabRefocusWired!=="1"&&(e.dataset.memolaTabRefocusWired="1",document.addEventListener("visibilitychange",()=>{document.hidden||c1()}))}function CB(){let e=kn.get(),t=e?parseInt(e,10):3e4;return isFinite(t)?t:3e4}function eb(){Wl&&(clearTimeout(Wl),Wl=null);let e=CB();if(e<=0){Wl=setTimeout(eb,6e4);return}Wl=setTimeout(()=>{(async()=>{document.hidden||(await c1(),Promise.resolve().then(()=>(Ao(),mn)).then(t=>t.pollComments()).catch(()=>{}),Promise.resolve().then(()=>(Zh(),s1)).then(t=>t.pollMentions()).catch(()=>{}))})().finally(eb)},e)}function m1(){let e=document.body;e.dataset.memolaTreeSyncWired!=="1"&&(e.dataset.memolaTreeSyncWired="1",eb())}var PB,l1,Qh,Wl,p1=L(()=>{"use strict";j();K();ft();ve();PB=3e3,l1=0,Qh=!1;Wl=null});function g1(){u1||(u1=!0,re.subscribe(AB))}function AB(e){let t=f1;switch(f1=e.kind,e.kind){case"unloaded":m.currentRow||(m.dirty=!1,m.saving=!1),m.sync.loadedEtag=null,m.sync.loadedModified=null;return;case"idle":m.dirty=!1,m.saving=!1,m.sync.loadedEtag=e.base.etag,m.sync.loadedModified=e.base.modified,Qe("\u4FDD\u5B58\u6E08\u307F"),(t==="saving"||t==="merging")&&(wv(e.base.pageId,e.base.etag,e.base.modified),$o(e.base.pageId).set(e.base.etag),Promise.resolve().then(()=>(Be(),po)).then(o=>o.renderTree()));return;case"dirty":m.dirty=!0,m.saving=!1,m.sync.loadedEtag=e.base.etag,m.sync.loadedModified=e.base.modified,Qe("\u672A\u4FDD\u5B58");return;case"saving":m.dirty=!0,m.saving=!0,m.sync.loadedEtag=e.base.etag,m.sync.loadedModified=e.base.modified,Qe("\u4FDD\u5B58\u4E2D...");return;case"conflict":m.dirty=!0,m.saving=!1,m.sync.loadedEtag=e.conflict.base.etag,Qe("\u7AF6\u5408");return;case"merging":m.dirty=!0,m.saving=!1,m.sync.loadedEtag=e.conflict.base.etag,Qe("\u7AF6\u5408");return}}var u1,f1,h1=L(()=>{"use strict";j();le();ft();bu();ve();u1=!1,f1=null});function v1(){b1||(b1=!0,re.subscribe(DB))}function DB(e){if(e.kind!=="conflict"){tb.close();return}_B(e.conflict.pageId,e.conflict.ours.title)}function _B(e,t){if(tb.isOpen())return;let n=m.pages.find(r=>r.Id===e)?.Title||t||"\u7121\u984C";tb.render('<div class="memola-conflict-box"><div class="memola-conflict-title">\u26A0 \u4ED6\u306E\u30E6\u30FC\u30B6\u30FC\u304C\u3053\u306E\u30DA\u30FC\u30B8\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F</div><div class="memola-conflict-page">\u300C'+M(n)+'\u300D</div><div class="memola-conflict-msg">\u540C\u3058\u30DA\u30FC\u30B8\u3092\u5225\u306E\u4EBA\u304C\u5148\u306B\u7DE8\u96C6\u3057\u3066\u3044\u307E\u3057\u305F\u3002<br>\u3069\u3046\u6271\u3044\u307E\u3059\u304B\uFF1F</div><div class="memola-conflict-btns"><button class="memola-btn p" data-choice="merge" title="\u81EA\u5206\u306E\u7DE8\u96C6\u3068\u76F8\u624B\u306E\u7DE8\u96C6\u3092 3-way \u30DE\u30FC\u30B8\u3067\u7D50\u5408\u3057\u307E\u3059\u3002\u540C\u3058\u7B87\u6240\u304C\u4E21\u65B9\u5909\u66F4\u3055\u308C\u3066\u305F\u5834\u5408\u306E\u307F\u9078\u629E\u3092\u6C42\u3081\u3089\u308C\u307E\u3059">\u{1F500} \u7D71\u5408\u3059\u308B <span class="memola-conflict-sub">(\u63A8\u5968 \u2014 \u53CC\u65B9\u306E\u7DE8\u96C6\u3092\u878D\u5408)</span></button><button class="memola-btn s" data-choice="overwrite" title="\u81EA\u5206\u306E\u7DE8\u96C6\u5185\u5BB9\u3067 SP \u306E\u7248\u3092\u4E0A\u66F8\u304D\u3057\u307E\u3059 (\u76F8\u624B\u306E\u5909\u66F4\u306F SP \u306E\u5C65\u6B74\u304B\u3089\u5FA9\u5143\u3067\u304D\u307E\u3059)">\u4E0A\u66F8\u304D\u3067\u4FDD\u5B58 <span class="memola-conflict-sub">(\u76F8\u624B\u306E\u7DE8\u96C6\u306F\u7834\u68C4)</span></button><button class="memola-btn s" data-choice="reload" title="\u81EA\u5206\u306E\u7DE8\u96C6\u5185\u5BB9\u3092\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58\u3057\u3066\u304B\u3089\u3001\u76F8\u624B\u306E\u6700\u65B0\u7248\u3092\u8AAD\u307F\u8FBC\u307F\u307E\u3059">\u76F8\u624B\u306E\u7248\u3092\u8868\u793A <span class="memola-conflict-sub">(\u81EA\u5206\u306E\u7DE8\u96C6\u306F\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58)</span></button><button class="memola-btn ghost" data-choice="cancel" title="\u30C0\u30A4\u30A2\u30ED\u30B0\u3092\u9589\u3058\u307E\u3059\u3002\u3042\u3068\u3067\u5224\u65AD\u3067\u304D\u307E\u3059">\u3053\u306E\u307E\u307E\u306B\u3059\u308B</button></div><div class="memola-conflict-foot">\u5931\u3063\u305F\u5909\u66F4\u306F<b>\u300C\u{1F4DD} \u4E0B\u66F8\u304D\u300D</b> \u307E\u305F\u306F <b>SP \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74</b> \u304B\u3089\u5FA9\u5143\u53EF\u80FD\u3067\u3059\u3002</div></div>',r=>{r.querySelectorAll("button[data-choice]").forEach(a=>{a.addEventListener("click",()=>{let i=a.dataset.choice;RB(i,e,n)})})})}async function RB(e,t,o){switch(e){case"merge":re.startMerge();return;case"overwrite":{let n=await re.forceOverwrite();n.ok?(w("\u81EA\u5206\u306E\u7248\u3067\u4E0A\u66F8\u304D\u3057\u307E\u3057\u305F"),Promise.resolve().then(()=>(Oo(),Vn)).then(r=>r.refreshDraftsBadge?.())):!n.ok&&n.reason==="error"&&w("\u4E0A\u66F8\u304D\u5931\u6557: "+(n.error?.message||""),"err");return}case"reload":{let n=re.state();if(n.kind!=="conflict")return;let r=n.conflict;try{let{saveDraft:i}=await Promise.resolve().then(()=>(ll(),pg));i({pageId:r.pageId,pageTitle:o,title:r.ours.title,body:r.ours.body,reason:"conflict-discarded",baseBody:r.base.body,baseEtag:r.base.etag})}catch{}re.acceptTheirs(),w("\u81EA\u5206\u306E\u7DE8\u96C6\u306F\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F\uFF08\u30B5\u30A4\u30C9\u30D0\u30FC\u300C\u{1F4DD} \u4E0B\u66F8\u304D\u300D\u304B\u3089\u5FA9\u5143\u53EF\uFF09"),Promise.resolve().then(()=>(Oo(),Vn)).then(i=>i.refreshDraftsBadge?.());let{doSelect:a}=await Promise.resolve().then(()=>(W(),ce));await a(t);return}case"cancel":re.cancelConflict();return}}var BB,tb,b1,y1=L(()=>{"use strict";j();De();ft();le();Gn();BB="memola-conflict-md",tb=fn({id:BB,className:"memola-conflict-md",onEscape:()=>re.cancelConflict(),onBackdropClick:()=>re.cancelConflict()}),b1=!1});function w1(){x1||(x1=!0,re.subscribe(OB))}function OB(e){if(e.kind!=="merging"){k1.close();return}HB(e)}function HB(e){let t=e.hunks.length,o=t-e.resolved.size,n=t===0?'<span class="memola-merge-ok">\u2713 \u7AF6\u5408\u306A\u3057 \u2014 \u81EA\u52D5\u30DE\u30FC\u30B8\u5B8C\u4E86</span>':o===0?'<span class="memola-merge-ok">\u2713 '+t+" \u4EF6\u3059\u3079\u3066\u89E3\u6C7A\u6E08\u307F</span>":'<span class="memola-merge-warn">\u26A0 \u6B8B\u308A '+o+" / "+t+" \u4EF6\u306E\u7AF6\u5408</span>",r=o>0?'<div class="memola-merge-preview-pending">\u26A0 \u6B8B\u308A '+o+" \u4EF6\u306E\u7AF6\u5408\u3092\u5DE6\u30DA\u30A4\u30F3\u3067\u89E3\u6C7A\u3059\u308B\u3068\u3001\u3053\u3053\u306B\u6700\u7D42\u7684\u306A\u5185\u5BB9\u304C\u8868\u793A\u3055\u308C\u307E\u3059\u3002</div>":ko(re.computeMergedBody()),a=FB(e),i=`
    <div class="memola-merge-box">
      <div class="memola-merge-header">
        <div class="memola-merge-title">\u{1F4DD} \u81EA\u5206\u306E\u7DE8\u96C6\u3092 SP \u306E\u6700\u65B0\u7248\u3068\u7D71\u5408</div>
        <div class="memola-merge-status">
          ${n}
        </div>
        <button class="memola-merge-close" data-merge-act="cancel" title="\u9589\u3058\u308B">\xD7</button>
      </div>
      <div class="memola-merge-body">
        <div class="memola-merge-conflicts">
          ${a}
        </div>
        <div class="memola-merge-preview">
          <div class="memola-merge-editor-label">\u7D71\u5408\u5F8C\u306E\u30DA\u30FC\u30B8\u5185\u5BB9 (= \u4FDD\u5B58\u3055\u308C\u308B\u5185\u5BB9):</div>
          <div class="memola-merge-preview-content">
            ${r}
          </div>
        </div>
      </div>
      <div class="memola-merge-foot">
        <div class="memola-merge-help">
          \u7AF6\u5408\u306F\u81EA\u52D5\u3067\u30DE\u30FC\u30B8\u3067\u304D\u306A\u304B\u3063\u305F\u7B87\u6240\u306E\u307F\u8868\u793A\u3002\u5404\u30DC\u30BF\u30F3\u3067\u63A1\u7528\u3059\u308B\u7248\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002
        </div>
        <button class="memola-btn s" data-merge-act="cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button>
        <button class="memola-btn p" data-merge-act="apply" ${re.isMergeResolved()?"":"disabled"}>
          \u3053\u306E\u30DE\u30FC\u30B8\u3092\u4FDD\u5B58
        </button>
      </div>
    </div>
  `;k1.render(i,s=>{s.querySelectorAll("[data-conflict-id]").forEach(l=>{l.addEventListener("click",()=>{let c=parseInt(l.dataset.conflictId||"0",10),d=l.dataset.choice;re.setMergeChoice(c,d)})}),s.querySelectorAll("[data-merge-act]").forEach(l=>{l.addEventListener("click",()=>{let c=l.dataset.mergeAct;c==="cancel"?re.cancelMerge():c==="apply"&&UB()})})})}function FB(e){return e.hunks.length===0?'<div class="memola-merge-empty">\u{1F389} \u81EA\u52D5\u30DE\u30FC\u30B8\u3067\u5168\u3066\u89E3\u6C7A\u3057\u307E\u3057\u305F\u3002\u53F3\u306E\u5185\u5BB9\u3092\u78BA\u8A8D\u3057\u3066\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div>':e.hunks.map(t=>{let o=e.resolved.get(t.id),n=o?"memola-merge-conflict resolved":"memola-merge-conflict",r=t.yours.length===0?"<i>(\u524A\u9664)</i>":M(t.yours.join(`
`)),a=t.theirs.length===0?"<i>(\u524A\u9664)</i>":M(t.theirs.join(`
`)),i=t.base.length===0?"<i>(\u7A7A)</i>":M(t.base.join(`
`)),s=o?'<span class="memola-merge-decided">\u2713 '+(o==="yours"?"\u3042\u306A\u305F":o==="theirs"?"SP":"\u4E21\u65B9")+" \u3092\u63A1\u7528</span>":"",l=c=>o===c?"memola-btn p":"memola-btn s";return`
      <div class="${n}" data-cid="${t.id}">
        <div class="memola-merge-conflict-hd">
          \u7AF6\u5408 #${t.id+1} ${s}
        </div>
        <div class="memola-merge-side memola-merge-yours">
          <div class="memola-merge-side-hd">\u3042\u306A\u305F</div>
          <pre>${r}</pre>
        </div>
        <div class="memola-merge-side memola-merge-theirs">
          <div class="memola-merge-side-hd">SP \u6700\u65B0</div>
          <pre>${a}</pre>
        </div>
        <details class="memola-merge-base">
          <summary>\u5143\u306E\u72B6\u614B (= \u7DE8\u96C6\u3092\u59CB\u3081\u305F\u6642)</summary>
          <pre>${i}</pre>
        </details>
        <div class="memola-merge-buttons">
          <button class="${l("yours")}" data-conflict-id="${t.id}" data-choice="yours">\u2190 \u3042\u306A\u305F\u3092\u63A1\u7528</button>
          <button class="${l("theirs")}" data-conflict-id="${t.id}" data-choice="theirs">SP \u3092\u63A1\u7528 \u2192</button>
          <button class="${l("both")}" data-conflict-id="${t.id}" data-choice="both">\u4E21\u65B9\u6B8B\u3059</button>
        </div>
      </div>
    `}).join("")}async function UB(){R(!0,"\u7D71\u5408\u7D50\u679C\u3092\u4FDD\u5B58\u4E2D...");try{let e=await re.applyMerge();if(R(!1),e.ok){w("\u7D71\u5408\u5185\u5BB9\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F");let t=re.state();if(t.kind==="idle"&&m.currentId===t.base.pageId){let o=t.base.pageId;re.unload();let{doSelect:n}=await Promise.resolve().then(()=>(W(),ce));await n(o)}Promise.resolve().then(()=>(Oo(),Vn)).then(o=>o.refreshDraftsBadge?.());return}if(!e.ok&&e.reason==="conflict"){w("\u4FDD\u5B58\u4E2D\u306B\u3055\u3089\u306B\u7AF6\u5408\u304C\u767A\u751F\u3057\u307E\u3057\u305F \u2014 \u518D\u5EA6\u30DA\u30FC\u30B8\u3092\u958B\u3044\u3066\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044","err");return}!e.ok&&e.reason==="error"&&w("\u4FDD\u5B58\u306B\u5931\u6557: "+(e.error?.message||""),"err")}catch(e){R(!1),w("\u4FDD\u5B58\u306B\u5931\u6557: "+e.message,"err")}}var NB,k1,x1,E1=L(()=>{"use strict";j();De();Jo();ft();le();Gn();NB="memola-merge-md",k1=fn({id:NB,className:"memola-merge-md",onEscape:()=>re.cancelMerge()}),x1=!1});var I1={};q(I1,{loadRemoteAiConfig:()=>qB});function jB(){let e=[],t=no.get();if(t)try{e.push(new URL(t).origin)}catch{}return e.includes("http://localhost:18080")||e.push("http://localhost:18080"),e}async function qB(){for(let e of jB())try{let t=new AbortController,o=setTimeout(()=>t.abort(),1500),n;try{n=await fetch(e+"/memola/ai-config",{signal:t.signal})}finally{clearTimeout(o)}if(!n.ok)continue;let a=(await n.json().catch(()=>null))?.config;if(!a||typeof a!="object")continue;let i=[];for(let[s,l]of zB){let c=a[s];c!=null&&String(c)!==""&&(l.set(String(c)),i.push(`${s}=${String(c)}`))}if(i.length)return console.info(`[memola] AI \u8A2D\u5B9A\u3092 relay (${e}) \u304B\u3089 ${i.length} \u4EF6\u53CD\u6620: ${i.join(", ")}`),!0}catch{}return!1}var zB,T1=L(()=>{"use strict";ve();zB=[["provider",da],["corpModel",ma],["corpBaseUrl",no],["corpDeployPrefix",pa],["embedProvider",ua],["voyageModel",fa],["embedModel",ga],["embedApiVersion",ha],["embedDimensions",ba],["ragTopK",va],["ragMinScore",ya]]});var S1={};q(S1,{startUpdateWatcher:()=>VB});function $B(){try{if(localStorage.getItem("memola.dev.bundle-source")==="local")return(localStorage.getItem("memola.dev.local-base")||"http://127.0.0.1:18080/memola").replace(/\/+$/,"")}catch{}let e=window._spPageContextInfo;return e?.webServerRelativeUrl?e.webServerRelativeUrl.replace(/\/$/,"")+"/Shared Documents/memola":""}function KB(){try{return"260602-1002-9eec9d"}catch{return""}}function WB(e){if(L1)return;L1=!0;let t=document.createElement("div");t.id="memola-update-bar",t.innerHTML="<span>\u{1F504} \u65B0\u3057\u3044\u30D0\u30FC\u30B8\u30E7\u30F3 ("+e+') \u304C\u3042\u308A\u307E\u3059\u3002</span><button id="memola-update-reload">\u30EA\u30ED\u30FC\u30C9</button><button id="memola-update-dismiss" title="\u9589\u3058\u308B">\xD7</button>',document.getElementById("memola-overlay")?.appendChild(t),t.querySelector("#memola-update-reload")?.addEventListener("click",()=>location.reload()),t.querySelector("#memola-update-dismiss")?.addEventListener("click",()=>{t.remove()})}async function GB(){let e=$B();if(!e)return;let t=KB();if(t)try{let o=await fetch(e+"/version.txt?t="+Date.now(),{credentials:"same-origin",cache:"no-cache"});if(!o.ok)return;let n=(await o.text()).trim();n&&n!==t&&WB(n)}catch{}}function VB(){ob===null&&(ob=window.setTimeout(function e(){GB(),ob=window.setTimeout(e,9e4)},9e4))}var ob,L1,M1=L(()=>{"use strict";ob=null,L1=!1});var fE={};q(fE,{attachAll:()=>ab,detachViewportAutoCollapse:()=>XB,init:()=>ib});async function nb(e){try{R(!0,"DB\u3092\u4F5C\u6210\u4E2D...");let t=await ys("\u7121\u984CDB",e||"");ao({Id:t.Id,Title:t.Title,ParentId:t.ParentId,Type:"database"}),oe(),await Fe(t.Id)}catch(t){w("DB\u4F5C\u6210\u306B\u5931\u6557: "+t.message,"err")}finally{R(!1)}}async function YB(){try{R(!0,"\u518D\u8AAD\u307F\u8FBC\u307F\u4E2D...");let e=m.currentRow;m.currentType!=="database"&&await vt(),await lt(),oe();let t=m.currentId,o=t?m.pages.find(n=>n.Id===t):null;if(e){let{getListItemById:n}=await Promise.resolve().then(()=>(Re(),Go)),r=await n(e.listTitle,e.itemId);if(r){let{openRowAsPage:a}=await Promise.resolve().then(()=>(cn(),ln));await a(e.dbId,r)}}else if(o&&t)if(o.Type==="database"){let{doSelectDb:n}=await Promise.resolve().then(()=>(W(),ce));await n(t,o)}else await Fe(t);w("\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u307E\u3057\u305F")}catch(e){w("\u518D\u8AAD\u307F\u8FBC\u307F\u5931\u6557: "+e.message,"err")}finally{R(!1)}}function ab(){E("x").addEventListener("click",ep),E("reload-btn").addEventListener("click",()=>void YB()),FE({openTodayDailyNote:rI,showDailyPicker:iI,doNewDb:nb}),ef(),Bh(nb),E("dadd").addEventListener("click",op),qE(),E("mc").addEventListener("click",()=>{E("md").classList.remove("on")}),E("mk").addEventListener("click",async()=>{E("md").classList.remove("on"),R(!0,"\u30EA\u30B9\u30C8\u3092\u6E96\u5099\u4E2D...");try{await lt(),oe(),w("memola-pages \u30EA\u30B9\u30C8\u3092\u521D\u671F\u5316\u3057\u307E\u3057\u305F")}catch(e){w("\u521D\u671F\u5316\u306B\u5931\u6557: "+e.message,"err")}finally{R(!1)}}),ME(),eI(),RE(),VE(),VI({doNewDb:nb}),JE(),IE(),fw(),Ig(),vg(),d1(),m1(),yg(),g1(),ty(),v1(),w1(),ug(),Yh(),uo(),Cg(),SI({toggleFocusMode:dp}),Uh(),mp(),window.addEventListener("resize",mp),rb=!0,QI(),OI(),$I(),eh(),Jg(),document.addEventListener("keydown",Qm)}function XB(){rb&&(window.removeEventListener("resize",mp),rb=!1)}function JB(){Ih({flushSave:!0,removeOverlay:!1})}async function ib(){let e=document.getElementById("memola-overlay");e&&(e.__memolaShutdown=JB),R(!0);try{let{ensureWorkspaceSelected:t}=await Promise.resolve().then(()=>(Gh(),JI));await t();try{let{loadRemoteAiConfig:i}=await Promise.resolve().then(()=>(T1(),I1));await i()}catch{}await lt(),oe(),et("empty");let{loadLastOpenedPage:o}=await Promise.resolve().then(()=>(W(),ce)),n=o(),r=n&&m.pages.some(i=>i.Id===n&&!i.IsDraft)?n:m.pages.find(i=>!i.IsDraft)?.Id??null,{restoreTabs:a}=await Promise.resolve().then(()=>(fo(),Uo));await a(r),Promise.resolve().then(()=>(M1(),S1)).then(i=>i.startUpdateWatcher())}catch(t){E("em").innerHTML='<div style="font-size:48px">\u26A0\uFE0F</div><h2>\u30A8\u30E9\u30FC</h2><p>'+t.message+"</p>",E("em").style.display="flex",console.error(t)}finally{R(!1)}}var rb,Th=L(()=>{"use strict";j();me();le();Be();W();yn();gt();Eh();Ch();Dh();PE();NE();UE();tf();$E();YE();ZE();tI();_h();MI();HI();KI();Di();fo();YI();e1();im();Qr();Oo();Zh();fl();Rr();p1();h1();Nu();y1();E1();zh();K();Ke();ye();rb=!1});He();ns();function hb(){return'<aside id="memola-sb"><div id="memola-sb-hd"><button id="memola-ws-btn" title="\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9"><span class="memola-ws-badge">N</span><span id="memola-ws-name">Memola</span><span class="memola-ws-caret">\u25BE</span></button><button id="memola-sb-collapse" class="memola-pane-x" title="\u30B5\u30A4\u30C9\u30D0\u30FC\u3092\u9589\u3058\u308B (Ctrl+\\)">'+$.close+'</button></div><div class="memola-snav" id="memola-search-nav">'+$.search+'<span>\u691C\u7D22</span><span class="memola-snav-hint">Ctrl K</span></div><div class="memola-quick-wrap"><button class="memola-quick-add" id="memola-quick-add">'+$.plus+'<span>\u65B0\u898F</span></button><button class="memola-quick-chat" id="memola-xchat-launch" title="\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8 \u2014 \u5168\u6587\u66F8\u3092\u307E\u305F\u3044\u3067AI\u306B\u8CEA\u554F">'+$.chat+'<span>\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8</span></button></div><div class="memola-sb-fixed"><div class="memola-sb-fx" id="memola-sb-daily-today" title="\u4ECA\u65E5\u306E\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u304F / \u4F5C\u6210"><span class="memola-sb-fx-ic">\u{1F4C5}</span><span class="memola-sb-fx-lb">\u4ECA\u65E5\u306E\u30CE\u30FC\u30C8</span></div><div class="memola-sb-fx" id="memola-sb-daily-pick" title="\u4EFB\u610F\u306E\u65E5\u306E\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u304F"><span class="memola-sb-fx-ic">\u{1F5D3}</span><span class="memola-sb-fx-lb">\u65E5\u4ED8\u3092\u9078\u3093\u3067\u958B\u304F</span></div><div class="memola-sb-fx" id="memola-sb-library" title="\u5168\u30DA\u30FC\u30B8\u306E\u4E00\u89A7"><span class="memola-sb-fx-ic">\u{1F4DA}</span><span class="memola-sb-fx-lb">\u30E9\u30A4\u30D6\u30E9\u30EA</span></div><div class="memola-sb-fx" id="memola-inbox-btn" title="\u81EA\u5206\u5B9B\u3066\u306E\u30E1\u30F3\u30B7\u30E7\u30F3"><span class="memola-sb-fx-ic">\u{1F4E5}</span><span class="memola-sb-fx-lb">\u53D7\u4FE1\u30C8\u30EC\u30A4</span><span class="memola-inbox-badge-count"></span></div></div><div class="memola-sb-fixed"><div class="memola-sb-fx" id="memola-drafts-btn" style="display:none" title="\u7DE8\u96C6\u4E2D\u306E\u4E0B\u66F8\u304D / \u4FDD\u5B58\u885D\u7A81\u3067\u9000\u907F\u3055\u308C\u305F\u7DE8\u96C6"><span class="memola-sb-fx-ic">\u{1F4DD}</span><span class="memola-sb-fx-lb">\u4E0B\u66F8\u304D</span><span class="memola-drafts-badge-count">0</span></div><div class="memola-sb-fx" id="memola-trash-btn" title="\u524A\u9664\u3055\u308C\u305F\u30DA\u30FC\u30B8"><span class="memola-sb-fx-ic">\u{1F5D1}</span><span class="memola-sb-fx-lb">\u30B4\u30DF\u7BB1</span></div></div><div id="memola-tree-wrap"><div class="memola-sl-label" id="memola-tree-pinned-lbl" style="display:none">\u{1F4CC} \u30D4\u30F3\u7559\u3081</div><div id="memola-tree-pinned"></div><div class="memola-sl-label" id="memola-tree-private-lbl">\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8</div><div id="memola-tree-private"></div><div class="memola-sl-label" id="memola-tree-org-lbl">\u{1F310} \u7D44\u7E54</div><div id="memola-tree-org"></div></div><div id="memola-sb-ft"><button class="memola-nb" id="memola-x" title="\u30A2\u30D7\u30EA\u3092\u9589\u3058\u308B (Esc)">'+$.exit+'<span>\u9589\u3058\u308B</span></button></div><div id="memola-create-menu"><div class="memola-cm-section">\u4F5C\u6210</div><div class="memola-cm-item" data-cm="new-page"><span class="memola-cm-ic">\u{1F4C4}</span><div class="memola-cm-body"><span class="memola-cm-name">\u7A7A\u306E\u30DA\u30FC\u30B8</span><span class="memola-cm-sub">L1\u301CL3\u306B\u8FFD\u52A0</span></div></div><div class="memola-cm-item" data-cm="new-db"><span class="memola-cm-ic">\u{1F5C2}</span><div class="memola-cm-body"><span class="memola-cm-name">\u7A7A\u306EDB</span><span class="memola-cm-sub">\u30EA\u30B9\u30C8\uFF0Bmd\u30D5\u30A9\u30EB\u30C0\u3092\u4F5C\u6210</span></div></div><div class="memola-cm-sep"></div><div class="memola-cm-section">\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089</div><div id="memola-cm-templates"></div></div></aside><div id="memola-xchat" class="tdr-shell" aria-hidden="true"><div class="tdr-chat"><div class="tdr-topbar"><span class="tdr-brand"><span class="mark">\u{1D544}</span></span><button class="tdr-titlebtn" id="memola-xchat-titlebtn" title="\u30C1\u30E3\u30C3\u30C8\u5C65\u6B74"><span id="memola-xchat-title">\u65B0\u898F\u30C1\u30E3\u30C3\u30C8</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></button><span class="tdr-idx" id="memola-xchat-idx"></span><div style="flex:1"></div><button class="tdr-icon-btn tdr-btn-labeled" id="memola-xchat-rebuild" title="\u5168\u6587\u66F8\u3092\u30D9\u30AF\u30C8\u30EB\u5316\u3057\u3066\u30A4\u30F3\u30C7\u30C3\u30AF\u30B9\u3092\u66F4\u65B0\u3059\u308B">'+$.refresh+'<span>\u6587\u66F8\u3092\u8AAD\u307F\u8FBC\u307F</span></button><button class="tdr-icon-btn" id="memola-xchat-close" title="\u9589\u3058\u308B (Esc)">'+$.exit+'</button><div class="tdr-histmenu" id="memola-xchat-histmenu"><button class="tdr-hist-new" id="memola-xchat-new">'+$.plus+'<span>\u65B0\u898F\u30C1\u30E3\u30C3\u30C8</span></button><div id="memola-xchat-hist-list"></div></div></div><div class="tdr-thread" id="memola-xchat-thread"></div><div class="tdr-composer"><div class="tdr-composer-inner"><div class="tdr-note-form"><textarea class="tdr-note-input" id="memola-xchat-input" rows="1" placeholder="\u6587\u66F8\u306B\u3064\u3044\u3066\u8CEA\u554F\u2026 (\u4F8B: \u5148\u6708\u306E\u969C\u5BB3\u5BFE\u5FDC\u306E\u624B\u9806\u306F?)"></textarea><button class="tdr-note-submit" id="memola-xchat-send" title="\u9001\u4FE1">'+$.send+'</button></div><div class="tdr-note-hint">Enter \u3067\u9001\u4FE1 / Shift+Enter \u3067\u6539\u884C</div></div></div></div></div><main id="memola-main"><div id="memola-tabbar"><button id="memola-sb-toggle" title="\u30B5\u30A4\u30C9\u30D0\u30FC (Ctrl+\\)">'+$.sidebar+'</button><button id="memola-nav-back" class="memola-nav-btn disabled" title="\u623B\u308B (Ctrl+[)" disabled>'+$.chevronLeft+'</button><button id="memola-nav-fwd" class="memola-nav-btn disabled" title="\u9032\u3080 (Ctrl+])" disabled>'+$.chevronRight+'</button><div id="memola-tabstrip"></div><button id="memola-reload-btn" class="memola-tabbar-act" title="\u518D\u8AAD\u307F\u8FBC\u307F\uFF08\u4E00\u89A7\uFF0B\u8868\u793A\u4E2D\u306E\u30DA\u30FC\u30B8\uFF09">'+$.refresh+'</button><button id="memola-settings-btn" class="memola-tabbar-act" title="\u8A2D\u5B9A">'+$.gear+'</button></div><div id="memola-top"><div id="memola-bc"></div><div id="memola-presence" class="memola-presence" style="display:none"></div><button id="memola-scope-tag" class="memola-scope-tag" style="display:none" title="\u30AF\u30EA\u30C3\u30AF\u3067\u500B\u4EBA \u2194 \u7D44\u7E54 \u3092\u5207\u66FF"><span class="memola-scope-tag-ic">\u{1F512}</span><span class="memola-scope-tag-label">\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8</span></button><button id="memola-pub-tag" class="memola-pub-tag" style="display:none" title="\u516C\u958B\u72B6\u614B"><span class="memola-pub-tag-dot"></span><span class="memola-pub-tag-label">\u516C\u958B\u4E2D</span></button><div id="memola-pub-pop" class="memola-pub-pop" style="display:none"><div class="memola-pub-pop-msg"></div><div class="memola-pub-pop-row"><button class="memola-pub-pop-btn primary" data-pub-act="sync">\u516C\u958B\u30DA\u30FC\u30B8\u306B\u540C\u671F</button><button class="memola-pub-pop-btn" data-pub-act="open">\u516C\u958B\u30DA\u30FC\u30B8\u3092\u958B\u304F</button><button class="memola-pub-pop-btn" data-pub-act="copy">URL \u3092\u30B3\u30D4\u30FC</button><button class="memola-pub-pop-btn danger" data-pub-act="unpublish">\u516C\u958B\u3092\u89E3\u9664</button><button class="memola-pub-pop-btn ghost" data-pub-act="close">\u9589\u3058\u308B</button></div></div><div id="memola-ss"></div><button id="memola-outline-btn" class="memola-tog-btn" title="\u76EE\u6B21">'+$.sort+'<span>\u76EE\u6B21</span></button><button id="memola-props-btn" class="memola-tog-btn" title="\u30D7\u30ED\u30D1\u30C6\u30A3">'+$.info+'<span>\u30D7\u30ED\u30D1\u30C6\u30A3</span></button><button id="memola-ai-btn" class="memola-tog-btn" title="AI\u30C1\u30E3\u30C3\u30C8">'+$.sparkle+'<span>AI</span></button><button id="memola-pgm-btn" title="\u30DA\u30FC\u30B8\u30E1\u30CB\u30E5\u30FC">'+$.more+'</button></div><div id="memola-tb"><button class="memola-b" data-cmd="h1" title="\u898B\u51FA\u30571"><b>H1</b></button><button class="memola-b" data-cmd="h2" title="\u898B\u51FA\u30572"><b>H2</b></button><button class="memola-b" data-cmd="h3" title="\u898B\u51FA\u30573"><b>H3</b></button><span class="memola-bs"></span><button class="memola-b" data-cmd="bold" title="\u592A\u5B57"><b>B</b></button><button class="memola-b" data-cmd="italic" title="\u659C\u4F53"><i>I</i></button><button class="memola-b" data-cmd="strike" title="\u53D6\u308A\u6D88\u3057\u7DDA"><s>S</s></button><button class="memola-b" data-cmd="code" title="\u30A4\u30F3\u30E9\u30A4\u30F3\u30B3\u30FC\u30C9">'+$.code+'</button><button class="memola-b" data-cmd="link" title="\u30EA\u30F3\u30AF\uFF08URL / UNC\u30D1\u30B9\uFF09">'+$.link+'</button><button class="memola-b" data-cmd="comment" title="\u30B3\u30E1\u30F3\u30C8">\u{1F4AC}</button><span class="memola-bs"></span><button class="memola-b" data-cmd="ul" title="\u7B87\u6761\u66F8\u304D">'+$.ul+'</button><button class="memola-b" data-cmd="ol" title="\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8">'+$.ol+'</button><button class="memola-b" data-cmd="todo" title="ToDo\u30EA\u30B9\u30C8">'+$.todo+'</button><button class="memola-b" data-cmd="quote" title="\u5F15\u7528">'+$.quote+'</button><button class="memola-b" data-cmd="callout" title="\u30B3\u30FC\u30EB\u30A2\u30A6\u30C8"><span style="font-size:14px">\u{1F4A1}</span></button><button class="memola-b" data-cmd="pre" title="\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF">'+$.codeBlock+'</button><span class="memola-bs"></span><button class="memola-b" data-cmd="hr" title="\u533A\u5207\u308A\u7DDA">'+$.hr+'</button></div><div id="memola-content-row"><aside id="memola-outline"><div id="memola-outline-hd"><span>\u76EE\u6B21</span><button class="memola-pane-x" id="memola-outline-x" title="\u9589\u3058\u308B">'+$.close+'</button></div><div id="memola-outline-list"></div></aside><div id="memola-ea"><div id="memola-ei"><div id="memola-em"><div class="memola-em-icon">\u{1F4C4}</div><h2 class="memola-em-title">\u306F\u3058\u3081\u3066\u307F\u3088\u3046</h2><p class="memola-em-sub">\u30DA\u30FC\u30B8\u3092\u4F5C\u308B\u304B\u3001\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u59CB\u3081\u3089\u308C\u307E\u3059\u3002</p><div class="memola-em-btns"><button class="memola-btn p" id="memola-ne">\uFF0B \u7A7A\u306E\u30DA\u30FC\u30B8</button><button class="memola-btn s" id="memola-ne-db">\u25A4 DB\u3092\u4F5C\u308B</button><button class="memola-btn ghost" id="memola-ne-tpl">\u2398 \u30C6\u30F3\u30D7\u30EC</button></div><div class="memola-em-chips"><button class="memola-chip memola-em-chip" data-tpl="weekly">\u{1F4C5} \u9031\u6B21\u30CE\u30FC\u30C8</button><button class="memola-chip memola-em-chip" data-tpl="tasks">\u2713 \u30BF\u30B9\u30AFDB</button><button class="memola-chip memola-em-chip" data-tpl="minutes">\u{1F4D3} \u8B70\u4E8B\u9332</button></div></div><div id="memola-ct"><div id="memola-template-banner" class="memola-template-banner" style="display:none"></div><div id="memola-draft-banner" style="display:none"></div><div id="memola-pg-hd"><div id="memola-icon-wrap"><span id="memola-pg-icon"></span><button class="memola-pg-icon-empty" id="memola-add-icon">\u30A2\u30A4\u30B3\u30F3\u3092\u8FFD\u52A0</button></div><textarea id="memola-ttl" rows="1" placeholder="\u30BF\u30A4\u30C8\u30EB\u306A\u3057"></textarea></div><div id="memola-row-props" class="memola-row-props"></div><div id="memola-ed" contenteditable="true" spellcheck="false"></div><div id="memola-backlinks" class="memola-backlinks" style="display:none"></div></div></div></div><div id="memola-dv"><div id="memola-dv-inner"><div id="memola-template-banner-db" class="memola-template-banner" style="display:none"></div><div id="memola-dv-hd"><div id="memola-dv-icon-wrap"><span id="memola-dv-pg-icon"></span><button class="memola-pg-icon-empty" id="memola-dv-add-icon">\u{1F60A} \u30A2\u30A4\u30B3\u30F3\u3092\u8FFD\u52A0</button></div><div id="memola-dv-ttl" contenteditable="true" spellcheck="false"></div></div><div id="memola-db-views"><button class="memola-db-vbtn on" id="memola-dbv-table">'+$.table+'<span>\u30C6\u30FC\u30D6\u30EB</span></button><button class="memola-db-vbtn" id="memola-dbv-board">'+$.board+'<span>\u30DC\u30FC\u30C9</span></button><button class="memola-db-vbtn" id="memola-dbv-list">'+$.ul+'<span>\u30EA\u30B9\u30C8</span></button><button class="memola-db-vbtn" id="memola-dbv-gallery">'+$.codeBlock+'<span>\u30AE\u30E3\u30E9\u30EA\u30FC</span></button><button class="memola-db-vbtn" id="memola-dbv-calendar">'+$.info+'<span>\u30AB\u30EC\u30F3\u30C0\u30FC</span></button><button class="memola-db-vbtn" id="memola-dbv-gantt">'+$.sort+'<span>\u30AC\u30F3\u30C8</span></button></div><div id="memola-db-tb"><button class="memola-db-chip" id="memola-db-filter-btn"><span>\uFF0B \u30D5\u30A3\u30EB\u30BF\u30FC</span></button><button class="memola-db-chip" id="memola-db-sort-btn">'+$.sort+'<span>\u30BD\u30FC\u30C8</span></button><button class="memola-db-chip" id="memola-db-group-btn"><span>\u229F</span><span>\u30B0\u30EB\u30FC\u30D7</span></button><button class="memola-db-new-btn" id="memola-db-new-row">\uFF0B \u65B0\u898F</button><div class="memola-db-tb-spacer"></div><button class="memola-db-chip subtle" id="memola-db-csv-export">'+$.download+'<span>CSV</span></button><button class="memola-db-chip subtle" id="memola-db-csv-import">'+$.copy+'<span>\u53D6\u8FBC</span></button></div><div id="memola-filter-chips"></div><div id="memola-filter-popover"></div><div id="memola-dt-wrap"><table id="memola-dt"><thead><tr id="memola-dth-row"></tr></thead><tbody id="memola-dtb"></tbody></table><button id="memola-dadd">\uFF0B \u65B0\u3057\u3044\u884C</button></div><div id="memola-kb"></div><div id="memola-list-view" class="memola-altview"></div><div id="memola-gallery-view" class="memola-altview"></div><div id="memola-calendar-view" class="memola-altview"></div><div id="memola-gantt-view" class="memola-altview"></div><div id="memola-backlinks-db" class="memola-backlinks" style="display:none"></div></div></div><div id="memola-lib"></div><aside id="memola-comments-pane"><div id="memola-comments-hd"><span>\u30B3\u30E1\u30F3\u30C8</span><button class="memola-pane-x" id="memola-comments-x" title="\u9589\u3058\u308B">'+$.close+'</button></div><div id="memola-comments-list"></div><div id="memola-comments-composer"><div id="memola-comments-target" style="display:none"><span id="memola-comments-target-lbl"></span><button id="memola-comments-target-x" title="\u30DA\u30FC\u30B8\u5168\u4F53\u306B\u623B\u3059">\xD7</button></div><textarea id="memola-comments-ta" placeholder="\u30B3\u30E1\u30F3\u30C8\u3092\u8FFD\u52A0..." rows="2"></textarea><div id="memola-comments-footer"><div class="memola-cmt-scope"><button class="memola-cmt-scope-btn" id="memola-comments-scope-org">\u7D44\u7E54</button><button class="memola-cmt-scope-btn" id="memola-comments-scope-user">\u{1F512} \u500B\u4EBA</button></div><button class="memola-btn p" id="memola-comments-add">\u9001\u4FE1</button></div></div></aside><aside id="memola-props"><div id="memola-props-hd"><span>\u30D7\u30ED\u30D1\u30C6\u30A3</span><button class="memola-pane-x" id="memola-props-x" title="\u9589\u3058\u308B">'+$.close+'</button></div><div id="memola-props-list"></div></aside><aside id="memola-ai-panel"><div id="memola-ai-hd"><span class="memola-ai-title">'+$.sparkle+'<span>AI\u30C1\u30E3\u30C3\u30C8</span></span><button id="memola-ai-new" title="\u65B0\u3057\u3044\u4F1A\u8A71">'+$.plus+'</button><button id="memola-ai-clear" title="\u73FE\u5728\u306E\u4F1A\u8A71\u3092\u524A\u9664">'+$.trash+'</button><button id="memola-ai-close" class="memola-pane-x" title="\u9589\u3058\u308B">'+$.close+'</button></div><div id="memola-ai-hist-row"><select id="memola-ai-hist" title="\u4F1A\u8A71\u5C65\u6B74"></select></div><div id="memola-ai-messages"></div><div id="memola-ai-chips"></div><div id="memola-ai-inputarea"><select id="memola-ai-model-pick" title="\u30D7\u30ED\u30D0\u30A4\u30C0\u30FB\u30E2\u30C7\u30EB\u9078\u629E"></select><textarea id="memola-ai-input" placeholder="\u3053\u306E\u30DA\u30FC\u30B8\u306B\u3064\u3044\u3066\u805E\u304F\u2026" rows="2"></textarea><button id="memola-ai-send" title="\u9001\u4FE1 (\u2318\u21B5)">'+$.send+`</button></div></aside></div><div id="memola-ld"><span>\u23F3</span><span id="memola-lm"> \u8AAD\u307F\u8FBC\u307F\u4E2D...</span></div></main><div id="memola-md"><div class="memola-mb"><h2>\u{1F680} \u521D\u671F\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7</h2><p>\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u30E9\u30A4\u30D6\u30E9\u30EA\u306B <code>memola-pages</code> \u30D5\u30A9\u30EB\u30C0\u3092\u4F5C\u6210\u3057\u3066\u3088\u3044\u3067\u3059\u304B\uFF1F<br>\u30DA\u30FC\u30B8\u306F .md \u30D5\u30A1\u30A4\u30EB\u3068\u3057\u3066\u3053\u3053\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002</p><div class="memola-ma"><button class="memola-btn s" id="memola-mc">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" id="memola-mk">\u30D5\u30A9\u30EB\u30C0\u3092\u4F5C\u6210</button></div></div></div><div id="memola-col-md"><div class="memola-mb" style="max-width:380px"><h2>\u5217\u3092\u8FFD\u52A0</h2><div class="memola-col-row"><label>\u5217\u540D</label><input id="memola-col-name" class="memola-col-inp" type="text" placeholder="\u4F8B: \u62C5\u5F53\u8005"></div><div class="memola-col-row"><label>\u30BF\u30A4\u30D7</label><div id="memola-col-type-grid"><div class="memola-col-type" data-tk="2"  data-ic="Aa"><span class="memola-col-type-ic">Aa</span><span>\u30C6\u30AD\u30B9\u30C8</span></div><div class="memola-col-type" data-tk="3"  data-ic="\xB6"><span class="memola-col-type-ic">\xB6</span><span>\u8907\u6570\u884C</span></div><div class="memola-col-type" data-tk="9"  data-ic="#"><span class="memola-col-type-ic">#</span><span>\u6570\u5024</span></div><div class="memola-col-type" data-tk="4"  data-ic="\u{1F4C5}"><span class="memola-col-type-ic">\u{1F4C5}</span><span>\u65E5\u4ED8</span></div><div class="memola-col-type" data-tk="6"  data-ic="\u25C9"><span class="memola-col-type-ic">\u25C9</span><span>\u30BB\u30EC\u30AF\u30C8</span></div><div class="memola-col-type" data-tk="15" data-ic="\u25CE"><span class="memola-col-type-ic">\u25CE</span><span>\u30DE\u30EB\u30C1</span></div><div class="memola-col-type" data-tk="8"  data-ic="\u2610"><span class="memola-col-type-ic">\u2610</span><span>\u30C1\u30A7\u30C3\u30AF</span></div><div class="memola-col-type" data-tk="11" data-ic="\u{1F517}"><span class="memola-col-type-ic">\u{1F517}</span><span>URL</span></div><div class="memola-col-type" data-tk="20" data-ic="\u{1F464}"><span class="memola-col-type-ic">\u{1F464}</span><span>\u62C5\u5F53\u8005</span></div><div class="memola-col-type" data-tk="7"  data-ic="\u2194"><span class="memola-col-type-ic">\u2194</span><span>\u95A2\u4FC2</span></div><div class="memola-col-type" data-tk="17" data-ic="\u03A3"><span class="memola-col-type-ic">\u03A3</span><span>\u30ED\u30FC\u30EB\u30A2\u30C3\u30D7</span></div><div class="memola-col-type" data-tk="17" data-ic="\u0192"><span class="memola-col-type-ic">\u0192</span><span>\u6570\u5F0F</span></div><div class="memola-col-type" data-tk="18" data-ic="\u{1F4CE}"><span class="memola-col-type-ic">\u{1F4CE}</span><span>\u30D5\u30A1\u30A4\u30EB</span></div></div></div><div class="memola-col-row" id="memola-col-choices-row"><label>\u9078\u629E\u80A2\uFF081\u884C1\u3064\uFF09</label><textarea id="memola-col-choices" class="memola-col-choices" placeholder="\u4F8B:
\u9032\u884C\u4E2D
\u5B8C\u4E86
\u672A\u7740\u624B"></textarea></div><div class="memola-col-row"><label>SharePoint\u30EA\u30B9\u30C8\u306E\u5217\u306B\u30DE\u30C3\u30D7</label><input id="memola-col-spmap" class="memola-col-inp" type="text" placeholder="\u81EA\u52D5\u63A8\u5B9A"></div><div class="memola-ma"><button class="memola-btn s" id="memola-col-cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" id="memola-col-ok">\u8FFD\u52A0</button></div></div></div><div id="memola-ftb"><button class="memola-fb" data-cmd="bold" title="\u592A\u5B57"><b>B</b></button><button class="memola-fb" data-cmd="italic" title="\u659C\u4F53"><i>I</i></button><button class="memola-fb" data-cmd="strike" title="\u53D6\u308A\u6D88\u3057\u7DDA"><s>S</s></button><button class="memola-fb" data-cmd="code" title="\u30A4\u30F3\u30E9\u30A4\u30F3\u30B3\u30FC\u30C9">`+$.code+'</button><button class="memola-fb" data-cmd="link" title="\u30EA\u30F3\u30AF\uFF08URL / UNC\u30D1\u30B9\uFF09">'+$.link+'</button><button class="memola-fb" data-cmd="comment" title="\u30B3\u30E1\u30F3\u30C8">\u{1F4AC}</button><span class="memola-fb-sep"></span><button class="memola-fb" data-cmd="h1" title="\u898B\u51FA\u30571"><b>H1</b></button><button class="memola-fb" data-cmd="h2" title="\u898B\u51FA\u30572"><b>H2</b></button><button class="memola-fb" data-cmd="h3" title="\u898B\u51FA\u30573"><b>H3</b></button><span class="memola-fb-sep"></span><button class="memola-fb" data-cmd="ul" title="\u7B87\u6761\u66F8\u304D">'+$.ul+'</button><button class="memola-fb" data-cmd="ol" title="\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8">'+$.ol+'</button><button class="memola-fb" data-cmd="quote" title="\u5F15\u7528">'+$.quote+`</button></div><div id="memola-slash"></div><div id="memola-qs"><div id="memola-qs-box"><input id="memola-qs-inp" type="text" placeholder="\u30DA\u30FC\u30B8\u3092\u691C\u7D22..."><div id="memola-qs-res"></div></div></div><div id="memola-emoji"><div id="memola-emoji-grid"></div><button id="memola-emoji-rm">\u30A2\u30A4\u30B3\u30F3\u3092\u524A\u9664</button></div><div id="memola-inbox-md"><div class="memola-mb" style="max-width:560px"><h2>\u{1F4E5} \u53D7\u4FE1\u30C8\u30EC\u30A4</h2><div id="memola-inbox-list"></div><div class="memola-ma"><button class="memola-btn ghost" id="memola-inbox-readall">\u3059\u3079\u3066\u65E2\u8AAD</button><button class="memola-btn s" id="memola-inbox-close">\u9589\u3058\u308B</button></div></div></div><div id="memola-trash-md"><div class="memola-mb" style="max-width:540px"><h2>\u30B4\u30DF\u7BB1</h2><div id="memola-trash-list"></div><div class="memola-ma"><button class="memola-btn ghost" id="memola-trash-empty" style="color:#b13a3a">\u{1F5D1} \u3059\u3079\u3066\u5B8C\u5168\u524A\u9664</button><button class="memola-btn s" id="memola-trash-close">\u9589\u3058\u308B</button></div></div></div><div id="memola-settings-md"><div class="memola-mb memola-set-mb"><h2>\u2699 \u8A2D\u5B9A</h2><div class="memola-set-body"><nav class="memola-set-nav"><div class="memola-set-major" data-major="personal"><div class="memola-set-major-h">\u500B\u4EBA\u8A2D\u5B9A</div><div class="memola-set-major-sub">\u3053\u306E\u7AEF\u672B\u306E\u30D6\u30E9\u30A6\u30B6\u306B\u4FDD\u5B58\uFF08\u4ED6\u306E\u4EBA\u306B\u306F\u5F71\u97FF\u3057\u307E\u305B\u3093\uFF09</div><button class="memola-set-tab on" data-tab="ai">\u{1F916} AI \u30D7\u30ED\u30D0\u30A4\u30C0</button><button class="memola-set-tab" data-tab="display">\u{1F3A8} \u8868\u793A</button></div><div class="memola-set-major" data-major="shared"><div class="memola-set-major-h">\u5171\u901A\u8A2D\u5B9A</div><div class="memola-set-major-sub">\u4FDD\u5B58\u30FB\u540C\u671F\u30FB\u30D7\u30EC\u30BC\u30F3\u30B9\u306E\u6319\u52D5</div><button class="memola-set-tab" data-tab="save">\u{1F4BE} \u4FDD\u5B58\u3068\u540C\u671F</button></div><div class="memola-set-major" data-major="other"><div class="memola-set-major-h">\u305D\u306E\u4ED6</div><button class="memola-set-tab" data-tab="help">\u2328 \u30D8\u30EB\u30D7</button><button class="memola-set-tab" data-tab="dev">\u{1F6E0} \u958B\u767A\u8005</button><button class="memola-set-tab danger" data-tab="debug">\u26A0 \u30EA\u30BB\u30C3\u30C8</button></div></nav><div class="memola-set-panes"><div class="memola-set-pane on" data-pane="ai"><div class="memola-set-row"><label>\u4F7F\u7528\u3059\u308B\u30B5\u30FC\u30D3\u30B9</label><select id="memola-set-provider"><option value="claude">Anthropic Claude</option><option value="corp">Azure OpenAI \u4E92\u63DB API</option><option value="local">\u30ED\u30FC\u30AB\u30EB AI (Ollama / LM Studio \u7B49)</option></select></div><div class="memola-set-row" data-prov="claude"><label>Claude \u30E2\u30C7\u30EB</label><select id="memola-set-claude-model"></select></div><div class="memola-set-row" data-prov="claude"><label>Claude API \u30AD\u30FC</label><input id="memola-set-aikey" type="password" placeholder="sk-ant-..."></div><div class="memola-set-row" data-prov="corp"><label>Azure OpenAI \u4E92\u63DB \u30E2\u30C7\u30EB</label><select id="memola-set-corpai-model"></select></div><div class="memola-set-row" data-prov="corp"><label>API \u30AD\u30FC</label><input id="memola-set-corpai-key" type="password" placeholder="api-key (Azure OpenAI \u306E\u30AD\u30FC / \u30B2\u30FC\u30C8\u30A6\u30A7\u30A4\u306E\u30B5\u30D6\u30B9\u30AF\u30EA\u30D7\u30B7\u30E7\u30F3\u30AD\u30FC)"></div><div class="memola-set-row" data-prov="corp"><label>\u30D9\u30FC\u30B9 URL</label><input id="memola-set-corpai-baseurl" type="text" placeholder="https://&lt;resource&gt;.openai.azure.com"></div><div class="memola-set-row" data-prov="corp"><label>\u30C7\u30D7\u30ED\u30A4 ID \u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9</label><input id="memola-set-corpai-prefix" type="text" placeholder="(\u4EFB\u610F \u2014 \u30E2\u30C7\u30EB\u540D\u3068\u540C\u3058\u30C7\u30D7\u30ED\u30A4\u540D\u306A\u3089\u7A7A\u6B04\u3067OK)"></div><div class="memola-set-row" data-prov="corp"><label>\u30E2\u30C7\u30EB\u5225\u30AA\u30FC\u30D0\u30FC\u30E9\u30A4\u30C9 (\u4EFB\u610F / JSON)</label><textarea id="memola-set-corpai-overrides" rows="6" placeholder='{"gpt-5":{"baseUrl":"https://...","apiVersion":"2025-01-01-preview","deploymentId":"..."}}' style="font-family:var(--font-mono);font-size:11px"></textarea></div><div class="memola-set-row" data-prov="corp"><label></label><div class="memola-set-hint"><b>\u5BFE\u5FDC\u30B5\u30FC\u30D3\u30B9</b>: Azure OpenAI Service\u3001Azure API Management \u7D4C\u7531\u306E\u30E9\u30C3\u30D1\u30FC\u3001\u793E\u5185 API \u30B2\u30FC\u30C8\u30A6\u30A7\u30A4\u7B49\u3002<br><b>URL \u306E\u7D44\u307F\u7ACB\u3066\u65B9</b>: <code>{\u30D9\u30FC\u30B9 URL}/openai/deployments/{\u30C7\u30D7\u30ED\u30A4 ID}/chat/completions?api-version={api-version}</code><br>\u203B \u30D9\u30FC\u30B9 URL \u306E\u4F8B \u2014 Azure \u672C\u5BB6: <code>https://&lt;resource&gt;.openai.azure.com</code>\u3001\u30B2\u30FC\u30C8\u30A6\u30A7\u30A4: <code>https://gateway.example.com/myapi/2024-10-21</code><br>\u203B \u30C7\u30D7\u30ED\u30A4 ID \u306F <code>{\u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9}{\u30E2\u30C7\u30EB\u540D(.\u306F\u524A\u9664)}</code> \u3067\u7D44\u307F\u7ACB\u3066 (Azure \u672C\u5BB6\u3067\u30C7\u30D7\u30ED\u30A4\u540D = \u30E2\u30C7\u30EB\u540D\u306B\u3057\u3066\u3044\u308B\u5834\u5408\u306F\u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9\u7A7A\u6B04\u3067OK)<br>\u203B api-version \u30C7\u30D5\u30A9\u30EB\u30C8 \u2014 \u63A8\u8AD6\u7CFB (GPT-5/o3/o4-mini): <code>2024-12-01-preview</code>\u3001\u305D\u308C\u4EE5\u5916: <code>2024-06-01</code><br>\u2014<br>\u30E2\u30C7\u30EB\u5225\u306B\u9055\u3046\u8A2D\u5B9A (\u5225\u30A8\u30F3\u30C9\u30DD\u30A4\u30F3\u30C8\u306A\u3069) \u304C\u5FC5\u8981\u306A\u5834\u5408\u306F\u30AA\u30FC\u30D0\u30FC\u30E9\u30A4\u30C9\u306B <code>{"\u30E2\u30C7\u30EB\u540D":{"baseUrl":"...","apiVersion":"...","deploymentId":"..."}}</code> \u3092\u8A18\u5165\u3002\u5404\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u4EFB\u610F\u30FB\u672A\u6307\u5B9A\u3067\u5168\u4F53\u8A2D\u5B9A\u306B\u30D5\u30A9\u30FC\u30EB\u30D0\u30C3\u30AF\u3002<br>\u30DA\u30FC\u30B8/DB \u64CD\u4F5C\u306E\u30C4\u30FC\u30EB\u6A5F\u80FD (Function Calling) \u3082\u5229\u7528\u53EF\u80FD\u3002</div></div><div class="memola-set-row" data-prov="local"><label>\u30D9\u30FC\u30B9 URL</label><input id="memola-set-localai-baseurl" type="text" placeholder="http://localhost:11434/v1 (Ollama) / http://localhost:1234/v1 (LM Studio)"></div><div class="memola-set-row" data-prov="local"><label>API \u30AD\u30FC (\u4EFB\u610F)</label><input id="memola-set-localai-key" type="password" placeholder="\u30ED\u30FC\u30AB\u30EB\u30B5\u30FC\u30D0\u5074\u3067\u8981\u6C42\u3059\u308B\u5834\u5408\u306E\u307F"></div><div class="memola-set-row" data-prov="local"><label>\u4F7F\u7528\u3059\u308B\u30E2\u30C7\u30EB</label><input id="memola-set-localai-model" type="text" placeholder="\u4F8B: llama3.1, qwen2.5-coder, mistral-small"></div><div class="memola-set-row" data-prov="local"><label>\u30E2\u30C7\u30EB\u5019\u88DC (\u4EFB\u610F / 1\u884C1\u30E2\u30C7\u30EB)</label><textarea id="memola-set-localai-models" rows="4" placeholder="llama3.1
qwen2.5-coder
gemma3:4b
mistral-small" style="font-family:var(--font-mono);font-size:11px"></textarea></div><div class="memola-set-row" data-prov="local"><label>\u63A8\u8AD6\u30E2\u30C7\u30EB (\u4EFB\u610F)</label><input id="memola-set-localai-reasoning" type="text" placeholder="\u540D\u524D\u306E\u4E00\u90E8\u3092\u7A7A\u767D\u533A\u5207\u308A (\u4F8B: o1 deepseek-r1 qwq) \u2500 \u4E00\u81F4\u3059\u308B\u30E2\u30C7\u30EB\u306F max_completion_tokens \u3092\u4F7F\u3046"></div><div class="memola-set-row" data-prov="local"><label></label><div class="memola-set-hint"><b>\u5BFE\u5FDC\u30B5\u30FC\u30D0</b>: Ollama\u3001LM Studio\u3001llama.cpp server\u3001vLLM\u3001\u305D\u306E\u4ED6 OpenAI Chat Completions \u4E92\u63DB\u306E\u3082\u306E\u3002<br><b>\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7\u4F8B (Ollama)</b>: <code>ollama serve</code> \u8D77\u52D5\u5F8C\u3001\u30D9\u30FC\u30B9 URL \u306B <code>http://localhost:11434/v1</code>\u3001\u30E2\u30C7\u30EB\u306B <code>llama3.1</code> \u7B49\u3092\u6307\u5B9A\u3002<br><b>\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7\u4F8B (LM Studio)</b>: \u300CLocal Server\u300D\u30BF\u30D6\u3067 Start\u3002\u30D9\u30FC\u30B9 URL <code>http://localhost:1234/v1</code>\u3001\u30E2\u30C7\u30EB\u306B UI \u306E\u30E2\u30C7\u30EB\u540D\u3092\u30B3\u30D4\u30FC\u3002<br><b>URL \u5F62\u5F0F</b>: <code>{\u30D9\u30FC\u30B9 URL}/chat/completions</code>\u3002<code>/v1</code> \u307E\u3067\u542B\u3081\u308B\u306E\u304C\u4E00\u822C\u7684\u3002<br>\u203B \u30D6\u30C3\u30AF\u30DE\u30FC\u30AF\u30EC\u30C3\u30C8\u3092\u958B\u3044\u3066\u3044\u308B SP \u30B5\u30A4\u30C8 (https) \u304B\u3089\u30ED\u30FC\u30AB\u30EB (http) \u306E <code>localhost</code> \u3092\u53E9\u3051\u308B\u304B\u306F\u30D6\u30E9\u30A6\u30B6\u306E\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u8A2D\u5B9A\u6B21\u7B2C\u3002\u53E9\u3051\u306A\u3044\u5834\u5408\u306F\u4E2D\u7D99\u30B9\u30AF\u30EA\u30D7\u30C8 (scripts/corp-ai-relay.py \u6539) \u7D4C\u7531\u3067\u540C\u30AA\u30EA\u30B8\u30F3\u306B\u898B\u305B\u304B\u3051\u308B\u304B\u3001\u30ED\u30FC\u30AB\u30EB AI \u30B5\u30FC\u30D0\u3092 HTTPS \u5316\u3057\u3066\u304F\u3060\u3055\u3044\u3002<br>\u203B Function Calling (\u30C4\u30FC\u30EB\u7D4C\u7531\u306E\u30DA\u30FC\u30B8/DB \u64CD\u4F5C) \u306F OpenAI \u4E92\u63DB tools \u30D1\u30E9\u30E1\u30FC\u30BF\u3092\u5B9F\u88C5\u3057\u305F\u30B5\u30FC\u30D0 (Ollama 0.3+ \u7B49) \u306E\u307F\u52D5\u4F5C\u3002</div></div><div class="memola-set-row"><label style="font-weight:600;border-top:1px solid var(--border,#e3e3e0);padding-top:14px">\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8 (RAG / \u57CB\u3081\u8FBC\u307F)</label><div class="memola-set-hint" style="border-top:1px solid var(--border,#e3e3e0);padding-top:14px">\u6587\u66F8\u3092\u6A2A\u65AD\u3057\u3066\u691C\u7D22\u30FB\u56DE\u7B54\u3059\u308B\u300C\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8\u300D\u7528\u306E\u57CB\u3081\u8FBC\u307F\u8A2D\u5B9A\u3002</div></div><div class="memola-set-row"><label>\u57CB\u3081\u8FBC\u307F\u30D7\u30ED\u30D0\u30A4\u30C0</label><select id="memola-set-embed-provider"><option value="voyage">Voyage AI (\u4E2D\u7D99\u4E0D\u8981\u30FBClaude\u4F75\u7528\u306E\u63A8\u5968)</option><option value="auto">\u30C1\u30E3\u30C3\u30C8\u3068\u540C\u3058 (Azure OpenAI \u4E92\u63DB / \u30ED\u30FC\u30AB\u30EB AI)</option></select></div><div class="memola-set-row" data-embprov="voyage"><label>Voyage API \u30AD\u30FC</label><input id="memola-set-voyage-key" type="password" placeholder="pa-... (https://dashboard.voyageai.com \u3067\u53D6\u5F97)"></div><div class="memola-set-row" data-embprov="voyage"><label>Voyage \u30E2\u30C7\u30EB</label><select id="memola-set-voyage-model"></select></div><div class="memola-set-row" data-prov="claude" data-embprov="auto"><label></label><div class="memola-set-hint">\u203B Anthropic Claude \u306B\u306F\u57CB\u3081\u8FBC\u307F API \u304C\u7121\u3044\u305F\u3081\u3001\u300C\u30C1\u30E3\u30C3\u30C8\u3068\u540C\u3058\u300D\u3067\u306F\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8 (RAG) \u306F\u4F7F\u3048\u307E\u305B\u3093\u3002<b>\u57CB\u3081\u8FBC\u307F\u30D7\u30ED\u30D0\u30A4\u30C0\u306B\u300CVoyage AI\u300D\u3092\u9078\u3076</b>\u3068\u3001Claude \u30C1\u30E3\u30C3\u30C8\u306E\u307E\u307E\u4E2D\u7D99\u30B5\u30FC\u30D0\u7121\u3057\u3067 RAG \u304C\u6709\u52B9\u306B\u306A\u308A\u307E\u3059 (\u63A8\u5968)\u3002</div></div><div class="memola-set-row" data-embprov="auto" data-prov="corp,local"><label>\u57CB\u3081\u8FBC\u307F\u30E2\u30C7\u30EB</label><select id="memola-set-embed-model"></select></div><div class="memola-set-row" data-embprov="auto" data-prov="corp"><label>\u57CB\u3081\u8FBC\u307F api-version</label><input id="memola-set-embed-apiver" type="text" placeholder="2024-02-01"></div><div class="memola-set-row"><label>\u51FA\u529B\u6B21\u5143\u6570 (\u4EFB\u610F)</label><input id="memola-set-embed-dims" type="number" min="1" placeholder="\u7A7A\u6B04=\u30E2\u30C7\u30EB\u65E2\u5B9A (voyage-3.5-lite:1024 / text-embedding-3-small:1536)"></div><div class="memola-set-row"><label>\u53D6\u5F97\u4EF6\u6570 (top-K)</label><input id="memola-set-rag-topk" type="number" min="1" max="50" placeholder="8"></div><div class="memola-set-row"><label>\u6700\u5C0F\u30B9\u30B3\u30A2</label><input id="memola-set-rag-minscore" type="number" min="0" max="1" step="0.05" placeholder="0.2"></div><div class="memola-set-row"><label style="font-weight:600;border-top:1px solid var(--border,#e3e3e0);padding-top:14px">外部ベクトル \u9023\u643A (\u6A2A\u65AD\u691C\u7D22)</label><div class="memola-set-hint" style="border-top:1px solid var(--border,#e3e3e0);padding-top:14px">外部ベクトル \u304C\u53CE\u96C6\u3057\u305F\u30D9\u30AF\u30C8\u30EB(\u30E1\u30FC\u30EB/OneNote/PPTX\u7B49)\u3092\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8\u306E\u691C\u7D22\u5BFE\u8C61\u306B\u52A0\u3048\u307E\u3059\u3002<b>\u57CB\u3081\u8FBC\u307F\u30E2\u30C7\u30EB/\u6B21\u5143\u3092 外部ベクトル \u3068\u540C\u3058</b>\u306B\u3057\u3066\u304A\u304F\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059(\u4E0D\u4E00\u81F4\u306E\u30D9\u30AF\u30C8\u30EB\u306F\u81EA\u52D5\u3067\u30B9\u30AD\u30C3\u30D7)\u3002\u672C\u6587\u306F\u30D9\u30AF\u30C8\u30EB\u30D5\u30A1\u30A4\u30EB\u5185\u306B\u3042\u308B\u305F\u3081\u4E2D\u7D99\u30B5\u30FC\u30D0\u306F\u4E0D\u8981\u3067\u3059\u3002</div></div><div class="memola-set-row"><label>外部ベクトル \u30D9\u30AF\u30C8\u30EB\u30D5\u30A9\u30EB\u30C0</label><input id="memola-set-rag-extvec-folder" type="text" placeholder="\u4F8B: Shared Documents/外部ベクトル (\u7A7A\u6B04=\u7121\u52B9)"></div><div class="memola-set-row"><label>\u691C\u7D22\u5BFE\u8C61\u306E\u7A2E\u985E</label><div class="memola-set-hint" style="display:flex;flex-wrap:wrap;gap:10px 16px"><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-mail">\u30E1\u30FC\u30EB</label><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-onenote">OneNote</label><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-pptx">PPTX</label><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-doc">\u6587\u66F8</label><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-transcript">\u6587\u5B57\u8D77\u3053\u3057</label></div></div><div class="memola-set-row"><label></label><div class="memola-set-hint"><b>Voyage AI</b>: \u30D6\u30E9\u30A6\u30B6\u304B\u3089\u76F4\u63A5\u547C\u3079\u308B (CORS\u5BFE\u5FDC) \u305F\u3081\u4E2D\u7D99\u30B5\u30FC\u30D0\u4E0D\u8981\u3002Claude \u30C1\u30E3\u30C3\u30C8\u3068\u306E\u4F75\u7528\u306B\u6700\u9069\u3002<br><b>\u30C1\u30E3\u30C3\u30C8\u3068\u540C\u3058</b>: corp=<code>{\u30D9\u30FC\u30B9URL}/openai/deployments/{\u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9+\u30E2\u30C7\u30EB}/embeddings</code>\u3001local=<code>{\u30D9\u30FC\u30B9URL}/embeddings</code>\u3002<br>\u203B \u53D6\u5F97\u4EF6\u6570=\u6587\u8108\u3078\u6E21\u3059\u985E\u4F3C\u30C1\u30E3\u30F3\u30AF\u306E\u6700\u5927\u6570\u3001\u6700\u5C0F\u30B9\u30B3\u30A2=\u30B3\u30B5\u30A4\u30F3\u985E\u4F3C\u5EA6\u306E\u8DB3\u5207\u308A (0\u301C1)\u3002<br>\u203B \u57CB\u3081\u8FBC\u307F\u30E2\u30C7\u30EB/\u6B21\u5143\u3092\u5909\u3048\u305F\u3089\u65E2\u5B58\u30D9\u30AF\u30C8\u30EB\u306F\u7121\u52B9\u306B\u306A\u308A\u307E\u3059 \u2014 \u8A2D\u5B9A\u2192\u30EA\u30BB\u30C3\u30C8\u3067\u4F5C\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div></div></div><div class="memola-set-pane" data-pane="save"><div class="memola-set-row"><label>\u81EA\u52D5\u4FDD\u5B58</label><select id="memola-set-savedelay"><option value="0">\u624B\u52D5\u306E\u307F (Ctrl/\u2318+S)</option><option value="1000">1 \u79D2\u5F8C</option><option value="2000" selected>2 \u79D2\u5F8C (\u65E2\u5B9A)</option><option value="5000">5 \u79D2\u5F8C</option><option value="10000">10 \u79D2\u5F8C</option><option value="30000">30 \u79D2\u5F8C</option></select></div><div class="memola-set-row"><label>\u540C\u671F\u30C1\u30A7\u30C3\u30AF</label><select id="memola-set-syncpoll"><option value="0">\u30AA\u30D5 (1 \u4EBA\u904B\u7528)</option><option value="30000" selected>30 \u79D2\u3054\u3068 (\u65E2\u5B9A)</option><option value="60000">1 \u5206\u3054\u3068</option><option value="300000">5 \u5206\u3054\u3068</option></select></div><div class="memola-set-row"><label>\u30D7\u30EC\u30BC\u30F3\u30B9\u8868\u793A</label><select id="memola-set-presence"><option value="1" selected>ON (\u30A2\u30D0\u30BF\u30FC\u3092\u5171\u6709/\u8868\u793A)</option><option value="0">OFF (SP \u306B\u66F8\u304D\u8FBC\u307E\u306A\u3044)</option></select></div><div class="memola-set-row"><label></label><div class="memola-set-hint"><b>\u81EA\u52D5\u4FDD\u5B58</b>: \u300C\u624B\u52D5\u306E\u307F\u300D\u306B\u3059\u308B\u3068\u7DE8\u96C6\u4E2D\u306E\u81EA\u52D5 SP \u66F8\u304D\u8FBC\u307F\u304C\u6B62\u307E\u308A\u3001Ctrl/\u2318+S \u3067\u3060\u3051\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002SP \u8CA0\u8377\u306E\u6700\u5C0F\u5316\u3084\u30D0\u30C3\u30C6\u30EA\u30FC\u7BC0\u7D04\u306B\u3002<br><b>\u540C\u671F\u30C1\u30A7\u30C3\u30AF</b>: \u958B\u3044\u3066\u3044\u308B\u30DA\u30FC\u30B8\u304C\u4ED6\u30BF\u30D6/\u4ED6\u30E6\u30FC\u30B6\u306B\u66F4\u65B0\u3055\u308C\u305F\u304B\u3092\u30DD\u30FC\u30EA\u30F3\u30B0\u691C\u77E5\u3057\u307E\u3059\u30021 \u4EBA\u904B\u7528\u306A\u3089\u300C\u30AA\u30D5\u300D\u3067\u8AA4\u901A\u77E5\u30BC\u30ED + SP \u8AAD\u307F\u53D6\u308A\u30BC\u30ED\u3002<br><b>\u30D7\u30EC\u30BC\u30F3\u30B9</b>: \u540C\u3058\u30DA\u30FC\u30B8\u3092\u898B\u3066\u3044\u308B\u30E6\u30FC\u30B6\u306E\u30A2\u30D0\u30BF\u30FC\u3092\u8868\u793A\u3059\u308B\u305F\u3081\u3001\u5B9A\u671F\u7684\u306B SP \u306B\u5B58\u5728\u3092\u66F8\u304D\u8FBC\u307F\u307E\u3059\u3002OFF \u3067\u3053\u306E\u66F8\u304D\u8FBC\u307F\u3092\u6B62\u3081\u3089\u308C\u307E\u3059\u3002</div></div></div><div class="memola-set-pane" data-pane="display"><div class="memola-set-row"><label>\u8868\u793A\u5BC6\u5EA6</label><select id="memola-set-density"><option value="compact">\u30B3\u30F3\u30D1\u30AF\u30C8</option><option value="regular" selected>\u6A19\u6E96</option><option value="comfy">\u3086\u3063\u305F\u308A</option></select></div><div class="memola-set-row"><label>\u30C6\u30FC\u30DE</label><select id="memola-set-theme"><option value="light" selected>\u30E9\u30A4\u30C8</option><option value="dark">\u30C0\u30FC\u30AF</option></select></div></div><div class="memola-set-pane" data-pane="help"><div class="memola-set-row"><label>\u30AD\u30FC\u30DC\u30FC\u30C9\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8</label><button class="memola-btn s" id="memola-set-shortcuts">\u2328 \u4E00\u89A7\u3092\u8868\u793A</button></div><div class="memola-set-row"><label></label><div class="memola-set-hint">\u4E3B\u8981\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u306F <code>?</code> \u30AD\u30FC (\u30A8\u30C7\u30A3\u30BF\u5916) \u3067\u3082\u4E00\u89A7\u304C\u958B\u304D\u307E\u3059\u3002</div></div><div class="memola-set-row"><label>\u30D3\u30EB\u30C9</label><code id="memola-set-build-id" style="font-size:12px;color:var(--ink-3)"></code></div><div class="memola-set-row"><label></label><div class="memola-set-hint">\u4E0D\u5177\u5408\u3092\u5831\u544A\u3059\u308B\u6642\u306B\u3053\u306E ID \u3092\u4E00\u7DD2\u306B\u4F1D\u3048\u3066\u304F\u3060\u3055\u3044\u3002\u53E4\u3044\u30D6\u30C3\u30AF\u30DE\u30FC\u30AF\u30EC\u30C3\u30C8\u3092\u4F7F\u3044\u7D9A\u3051\u3066\u3044\u306A\u3044\u304B\u306E\u78BA\u8A8D\u306B\u3082\u306A\u308A\u307E\u3059\u3002</div></div></div><div class="memola-set-pane" data-pane="dev"><div class="memola-set-row"><label>\u30D0\u30F3\u30C9\u30EB\u53D6\u5F97\u5143</label><select id="memola-set-dev-source"><option value="sharepoint">SharePoint (\u672C\u756A\u30FB\u81EA\u52D5\u66F4\u65B0)</option><option value="local">\u30ED\u30FC\u30AB\u30EB\u30EA\u30EC\u30FC (\u958B\u767A)</option></select></div><div class="memola-set-row" data-dev="local"><label>\u30ED\u30FC\u30AB\u30EB\u30D9\u30FC\u30B9 URL</label><input id="memola-set-dev-localbase" type="text" placeholder="http://127.0.0.1:18080/memola"></div><div class="memola-set-row"><label>relay \u914D\u4FE1\u30D5\u30A9\u30EB\u30C0</label><input id="memola-set-dev-relaydir" type="text" placeholder="\u4F8B: C:\\\\tools\\\\n365\\\\dist (relay \u304C memola.bundle.js \u3092\u914D\u308B\u5834\u6240)"><div class="memola-set-hint" id="memola-set-dev-relaydir-status">relay \u306B\u7167\u4F1A\u3057\u307E\u3059\u2026</div></div><div class="memola-set-row"><label>\u30EA\u30EC\u30FC\u306E\u66F4\u65B0</label><button class="memola-btn s" id="memola-set-relay-update">\u30EA\u30EC\u30FC\u66F4\u65B0\u3092\u78BA\u8A8D</button><div class="memola-set-hint" id="memola-set-relay-update-msg">SP \u306E relay-version.txt \u3068\u8D77\u52D5\u4E2D\u30EA\u30EC\u30FC\u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u6BD4\u8F03\u3057\u3001\u5DEE\u5206\u304C\u3042\u308C\u3070\u30B9\u30AF\u30EA\u30D7\u30C8(ps1/bat)\u3092\u81EA\u52D5\u66F4\u65B0\u3057\u3066\u518D\u8D77\u52D5\u3057\u307E\u3059\u3002</div></div><div class="memola-set-row"><label></label><div class="memola-set-hint">\u30D6\u30C3\u30AF\u30DE\u30FC\u30AF\u30EC\u30C3\u30C8\u306F<b>\u6975\u5C0F\u30ED\u30FC\u30C0</b>\u306B\u306A\u308A\u3001\u8D77\u52D5\u6642\u306B\u672C\u4F53(<code>memola.bundle.js</code>)\u3092\u53D6\u5F97\u3057\u307E\u3059\u3002<br><b>SharePoint</b>: \u30B5\u30A4\u30C8\u306E <code>\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8/memola/</code> \u306B\u7F6E\u3044\u305F <code>memola.bundle.js</code>\uFF0B<code>version.txt</code> \u3092\u6BCE\u56DE\u78BA\u8A8D\u3057\u3001\u66F4\u65B0\u304C\u3042\u308C\u3070\u81EA\u52D5\u3067\u6700\u65B0\u5316(\u518D\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u4E0D\u8981)\u3002<br><b>\u30ED\u30FC\u30AB\u30EB\u30EA\u30EC\u30FC</b>: <code>node build.js</code> \u5F8C\u306B\u30EA\u30EC\u30FC\u304C <code>dist/</code> \u3092\u914D\u4FE1\u3002\u30B3\u30FC\u30C9\u5909\u66F4\u2192\u30D3\u30EB\u30C9\u2192\u30EA\u30ED\u30FC\u30C9\u3067\u5373\u53CD\u6620(\u958B\u767A\u7528)\u3002<br>\u203B \u5909\u66F4\u306F<b>\u6B21\u56DE\u8D77\u52D5/\u30EA\u30ED\u30FC\u30C9</b>\u3067\u53CD\u6620\u3055\u308C\u307E\u3059\u3002</div></div></div><div class="memola-set-pane" data-pane="debug"><div class="memola-set-row"><label></label><div class="memola-set-hint" style="background:rgba(235,87,87,.10);border-left-color:rgba(235,87,87,.55);color:var(--ink)"><b>\u26A0 \u5371\u967A\u306A\u64CD\u4F5C</b><br>\u4EE5\u4E0B\u306E\u30EA\u30BB\u30C3\u30C8\u64CD\u4F5C\u306F\u3059\u3079\u3066<b>\u53D6\u308A\u6D88\u3057\u4E0D\u53EF</b>\u3067\u3059\u3002SP \u306E\u3054\u307F\u7BB1\u304B\u3089\u3082\u5FA9\u5143\u3067\u304D\u307E\u305B\u3093\u3002<br>\u5B9F\u884C\u524D\u306B\u5FC5\u8981\u306A\u30C7\u30FC\u30BF\u304C\u4ED6\u306B\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3055\u308C\u3066\u3044\u308B\u3053\u3068\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div></div><div class="memola-set-row"><label>1. \u81EA\u5206\u306E\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u306E\u307F\u524A\u9664</label><button class="memola-btn s" id="memola-set-reset-mine">\u524A\u9664\u3092\u5B9F\u884C</button><div class="memola-set-hint"><b>\u524A\u9664\u5BFE\u8C61</b>: \u81EA\u5206\u304C\u4F5C\u6210\u3057\u305F\u300C\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u300D\u306E\u30DA\u30FC\u30B8\u30FBDB \u306E\u307F<br><b>\u6B8B\u308B\u3082\u306E</b>: \u7D44\u7E54\u5171\u901A / \u4ED6\u306E\u30E6\u30FC\u30B6\u306E\u30DA\u30FC\u30B8\u30FBDB / localStorage \u306E\u8A2D\u5B9A (API \u30AD\u30FC\u30FB\u30C6\u30FC\u30DE\u7B49)</div></div><div class="memola-set-row"><label>2. \u7D44\u7E54+\u4ED6\u4EBA\u306E\u30C7\u30FC\u30BF\u306E\u307F\u524A\u9664</label><button class="memola-btn s" id="memola-set-reset-others">\u524A\u9664\u3092\u5B9F\u884C</button><div class="memola-set-hint"><b>\u524A\u9664\u5BFE\u8C61</b>: \u7D44\u7E54\u5171\u901A + \u4ED6\u306E\u30E6\u30FC\u30B6\u306E\u30DA\u30FC\u30B8\u30FBDB<br><b>\u6B8B\u308B\u3082\u306E</b>: \u81EA\u5206\u306E\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u30C7\u30FC\u30BF / localStorage \u306E\u8A2D\u5B9A</div></div><div class="memola-set-row"><label>3. \u5168\u30C7\u30FC\u30BF + \u8A2D\u5B9A\u3092\u521D\u671F\u5316</label><button class="memola-btn p" id="memola-set-reset-all" style="background:#c44;border-color:#c44">\u26A0 \u5B8C\u5168\u30EA\u30BB\u30C3\u30C8</button><div class="memola-set-hint"><b>\u524A\u9664\u5BFE\u8C61</b>: memola-* \u3067\u59CB\u307E\u308B\u5168 SP \u30EA\u30B9\u30C8 + memola. \u3067\u59CB\u307E\u308B\u5168 localStorage \u30AD\u30FC<br>\u5B9F\u884C\u5F8C\u306F\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u76F4\u5F8C\u306E\u72B6\u614B\u306B\u623B\u308A\u307E\u3059\u3002SP \u30DA\u30FC\u30B8\u3092 1 \u5EA6\u30EA\u30ED\u30FC\u30C9\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div></div></div></div></div><div class="memola-ma"><button class="memola-btn s" id="memola-set-cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" id="memola-set-save">\u4FDD\u5B58</button></div></div></div><div id="memola-pgm"><div class="memola-pgm-item" data-action="export-md">`+$.download+'<span>Markdown\u3067\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8</span></div><div class="memola-pgm-item" data-action="export-html">'+$.download+'<span>HTML\u3067\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8</span></div><div class="memola-pgm-sep"></div><div class="memola-pgm-item" data-action="duplicate">'+$.copy+'<span>\u8907\u88FD</span></div><div class="memola-pgm-item" data-action="duplicate-as-draft">\u270F\uFE0F<span>\u4E0B\u66F8\u304D\u3068\u3057\u3066\u8907\u88FD</span></div><div class="memola-pgm-item" data-action="register-template">\u{1F9E9}<span>\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3068\u3057\u3066\u767B\u9332</span></div><div class="memola-pgm-item" data-action="version-history">\u{1F4DC}<span>\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74</span></div><div class="memola-pgm-item" data-action="copy-link">'+$.link+'<span>\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC</span></div><div class="memola-pgm-item" data-action="toggle-scope"><span class="memola-pgm-scope-ic">\u{1F512}</span><span class="memola-pgm-scope-label">\u7D44\u7E54\u306B\u516C\u958B</span></div><div class="memola-pgm-item" data-action="publish">'+$.link+'<span class="memola-pgm-publish-label">Web \u516C\u958B</span></div><div class="memola-pgm-item" data-action="copy-pub-url" style="display:none">'+$.copy+'<span>\u516C\u958B URL \u3092\u30B3\u30D4\u30FC</span></div><div class="memola-pgm-item" data-action="restore-daily" style="display:none">\u{1F4C5}<span>\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u306B\u623B\u3059</span></div><div class="memola-pgm-sep"></div><div class="memola-pgm-item" data-action="print">'+$.print+'<span>\u5370\u5237</span></div><div class="memola-pgm-item" data-action="info">'+$.info+'<span>\u30DA\u30FC\u30B8\u60C5\u5831</span></div><div class="memola-pgm-item" data-action="focus">'+$.sidebar+'<span>\u96C6\u4E2D\u30E2\u30FC\u30C9\u5207\u66FF</span></div><div class="memola-pgm-sep"></div><div class="memola-pgm-item danger" data-action="delete">'+$.trash+'<span>\u524A\u9664</span></div></div><div id="memola-tk"></div>'}Th();var P1=`/* \u2500\u2500 Design tokens (Claude Design palette: paper + ink + moss) \u2500\u2500 */
#memola-overlay {
  /* Color \u2014 warm paper / ink palette */
  --ink: #2a2a26;
  --ink-3: #7a766c;
  --ink-4: #a8a39a;
  --paper: #fafaf7;
  --paper-2: #f3f1ea;
  --paper-2-strong: #ece8de;
  --paper-3: #e8e4d8;
  --line: rgba(42, 42, 38, 0.12);
  --line-strong: rgba(42, 42, 38, 0.18);
  --accent: #7a8a78;            /* moss green */
  --accent-soft: rgba(122, 138, 120, 0.18);
  --accent-strong: #5e6f5c;
  --danger: #b8534a;
  --code-fg: #8b3a30;
  --code-bg: rgba(122, 118, 108, 0.16);
  --hl: rgba(196, 174, 96, 0.35);

  /* Spacing scale (px) */
  --s-1: 4px;  --s-2: 6px;  --s-3: 8px;  --s-4: 10px;
  --s-5: 12px; --s-6: 14px; --s-7: 18px; --s-8: 22px;
  --s-9: 28px; --s-10: 40px;

  /* Border radius \u2014 Claude Design uses subtle radii */
  --r-1: 2px; --r-2: 4px; --r-3: 6px; --r-4: 8px;

  /* Shadows \u2014 softer than blue-aware */
  --sh-flyout: 0 12px 30px rgba(42, 42, 38, 0.14);
  --sh-panel:  0 8px 20px rgba(42, 42, 38, 0.10);
  --sh-modal:  0 0 0 1px rgba(42, 42, 38, .06), 0 4px 12px rgba(42, 42, 38, .10), 0 16px 40px rgba(42, 42, 38, .18);

  /* Layout */
  --sidebar-w: 200px;
  --sidebar-collapsed-w: 44px;
  --content-max: 720px;
  --content-max-focus: 900px;
  --topbar-h: 44px;

  /* Typography \u2014 Meiryo first (Windows standard, very readable JP), with sans fallbacks */
  --font-ui: "Meiryo", "\u30E1\u30A4\u30EA\u30AA", "Hiragino Sans", "BIZ UDPGothic", "Noto Sans JP", "Yu Gothic UI", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  /* Titles + section headings: same family for consistency */
  --font-serif: "Meiryo", "\u30E1\u30A4\u30EA\u30AA", "Hiragino Sans", "BIZ UDPGothic", "Noto Sans JP", "Yu Gothic UI", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  --font-heading: var(--font-serif);
  --font-mono: "JetBrains Mono", "SFMono-Regular", "MS Gothic", Menlo, Consolas, "Liberation Mono", Courier, monospace;
  --fs-xs: 11px;  --fs-sm: 12px;  --fs-md: 13px;
  --fs-base: 15px; --fs-lg: 16px; --fs-xl: 18px;
  --fs-h1: 36px;  --fs-h2: 28px;  --fs-h3: 22px;

  /* Transitions */
  --tr-fast: 0.1s ease;
  --tr: 0.2s ease;

  position: fixed; inset: 0; z-index: 2147483647; display: flex;
  font-family: var(--font-ui);
  font-size: var(--fs-base); line-height: 1.75; color: var(--ink); background: var(--paper);
}
#memola-overlay *, #memola-overlay *::before, #memola-overlay *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}

/* \u2500\u2500 Pane resize handles (sidebar / outline / props / AI) \u2500\u2500 */
#memola-overlay .memola-pane-resize {
  position: absolute; top: 0; bottom: 0;
  width: 6px; z-index: 10;
  cursor: col-resize;
  background: transparent;
  transition: background var(--tr-fast);
}
#memola-overlay .memola-pane-resize-right { right: -3px; }
#memola-overlay .memola-pane-resize-left  { left:  -3px; }
#memola-overlay .memola-pane-resize:hover,
#memola-overlay .memola-pane-resize:active {
  background: var(--accent);
  opacity: 0.5;
}
/* Disable pane width transitions while user is actively dragging */
#memola-overlay.memola-resizing #memola-sb,
#memola-overlay.memola-resizing #memola-outline,
#memola-overlay.memola-resizing #memola-props,
#memola-overlay.memola-resizing #memola-ai-panel { transition: none !important; }

/* \u2500\u2500 Sidebar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-sb {
  width: var(--sidebar-w); background: var(--paper-2);
  border-right: 1px solid var(--paper-3);
  display: flex; flex-direction: column; flex-shrink: 0;
  overflow: hidden; transition: width 0.2s ease;
}
/* !important to beat the inline width set by pane-resize.ts. */
#memola-sb.collapsed { width: 0 !important; border-right: none; }
#memola-sb-hd {
  padding: 10px 8px 6px; display: flex; align-items: center; gap: 4px;
  font-size: var(--fs-md); font-weight: 600; color: var(--ink);
  flex-shrink: 0; height: 48px; box-sizing: border-box;
}
#memola-overlay .memola-ws-badge {
  width: 24px; height: 24px; border-radius: var(--r-2);
  background: var(--accent); color: var(--paper);
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-serif); font-weight: 600; font-size: 12px;
  flex-shrink: 0; letter-spacing: 0;
}
#memola-overlay .memola-ws-caret { opacity: 0.4; font-size: 10px; flex-shrink: 0; }
#memola-overlay #memola-sb-collapse { flex-shrink: 0; }
/* Close-app button now lives in the footer alongside \u8A2D\u5B9A / \u30B4\u30DF\u7BB1 \u2014 uses the
 * same .memola-nb styling. SVG is sized to match the trash icon. */
#memola-overlay #memola-x svg { width: 16px; height: 16px; }

#memola-overlay .memola-snav {
  padding: 6px 12px; margin: 6px 12px 0;
  display: flex; align-items: center; gap: 10px;
  border: 1px solid var(--paper-3); background: var(--paper);
  border-radius: var(--r-2); cursor: pointer; font-size: var(--fs-md);
  color: var(--ink-3); min-height: 30px;
  transition: background 0.1s, border-color 0.1s;
}
#memola-overlay .memola-snav:hover { border-color: var(--ink-4); color: var(--ink); }
#memola-overlay .memola-snav svg { width: 14px; height: 14px; flex-shrink: 0; opacity: 0.6; }
#memola-overlay .memola-snav-hint { margin-left: auto; font-size: var(--fs-xs); font-family: var(--font-mono); opacity: 0.5; }

/* Quick-add primary button (\uFF0B \u65B0\u898F quick action) */
#memola-overlay .memola-quick-wrap { padding: 8px 12px 4px; }
#memola-overlay .memola-quick-add {
  height: 30px; border: none; border-radius: var(--r-2);
  background: var(--accent); color: var(--paper); cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 5px;
  padding: 0 12px; font-family: inherit; font-size: var(--fs-sm); font-weight: 600;
  transition: background var(--tr-fast);
}
#memola-overlay .memola-quick-add:hover { background: var(--accent-strong); }
#memola-overlay .memola-quick-add svg { width: 13px; height: 13px; }
#memola-sb.rail .memola-quick-add span { display: none; }
#memola-sb.rail .memola-quick-add { padding: 0; width: 32px; }
#memola-sb.rail .memola-quick-wrap { padding: 6px 4px; }

/* CreateMenu popup */
#memola-overlay #memola-create-menu {
  position: fixed; display: none;
  background: var(--paper); border: 1px solid var(--paper-3);
  border-radius: var(--r-3); width: 260px; padding: 6px 6px;
  box-shadow: var(--sh-flyout); z-index: 2147483647;
  font-family: var(--font-ui);
}
#memola-overlay #memola-create-menu.on { display: block; }
#memola-overlay .memola-cm-section {
  font-size: var(--fs-xs); color: var(--ink-3);
  padding: 10px 14px 4px; opacity: 0.85;
}
#memola-overlay .memola-cm-item {
  display: flex; align-items: center; gap: 12px;
  padding: 8px 14px; cursor: pointer; font-size: var(--fs-md);
  color: var(--ink); transition: background var(--tr-fast);
  border-radius: var(--r-2);
}
#memola-overlay .memola-cm-item:hover { background: var(--paper-2); }
#memola-overlay .memola-cm-ic { font-size: 16px; width: 20px; text-align: center; flex-shrink: 0; }
#memola-overlay .memola-cm-body { display: flex; flex-direction: column; gap: 1px; flex: 1; }
#memola-overlay .memola-cm-name { font-size: var(--fs-md); }
#memola-overlay .memola-cm-sub { font-size: var(--fs-xs); color: var(--ink-3); }
/* \u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089: \u52D5\u7684\u884C + \u30DB\u30D0\u30FC\u6642\u306E\u307F\u51FA\u308B \u7DE8\u96C6/\u524A\u9664 \u30DC\u30BF\u30F3 */
#memola-overlay .memola-cm-tpl .memola-cm-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
#memola-overlay .memola-cm-tpl-actions { display: none; gap: 2px; flex-shrink: 0; }
#memola-overlay .memola-cm-tpl:hover .memola-cm-tpl-actions { display: flex; }
#memola-overlay .memola-cm-tpl-btn {
  border: none; background: none; cursor: pointer; font-size: 12px;
  padding: 2px 5px; border-radius: var(--r-2); color: var(--ink-3);
}
#memola-overlay .memola-cm-tpl-btn:hover { background: var(--paper-3); color: var(--ink); }
#memola-overlay .memola-cm-empty { padding: 8px 14px; font-size: var(--fs-xs); color: var(--ink-3); line-height: 1.5; }
#memola-overlay .memola-cm-sep {
  height: 0; border-top: 1px dashed var(--paper-3);
  margin: 4px 8px;
}

/* DailyPicker popover (open any day's daily note in one click) */
#memola-overlay #memola-daily-picker {
  background: var(--paper); border: 1px solid var(--paper-3);
  border-radius: var(--r-3); box-shadow: var(--sh-flyout);
  padding: 10px; width: 260px; z-index: 2147483647;
  font-family: var(--font-ui);
  display: flex; flex-direction: column; gap: 8px;
}
#memola-overlay #memola-daily-picker .memola-dp-row {
  display: flex; align-items: center; gap: 6px;
}
#memola-overlay #memola-daily-picker .memola-dp-row input[type="date"] {
  flex: 1; padding: 6px 8px; border: 1px solid var(--paper-3);
  border-radius: var(--r-2); background: var(--paper);
  color: var(--ink); font-family: inherit; font-size: var(--fs-md);
}
#memola-overlay #memola-daily-picker .memola-dp-nav {
  width: 28px; height: 28px; border: 1px solid var(--paper-3);
  background: var(--paper-2); color: var(--ink); border-radius: var(--r-2);
  cursor: pointer; font-size: 16px; line-height: 1;
}
#memola-overlay #memola-daily-picker .memola-dp-nav:hover { background: var(--paper-3); }
#memola-overlay #memola-daily-picker .memola-dp-quick {
  display: flex; gap: 4px; flex-wrap: wrap;
}
#memola-overlay #memola-daily-picker .memola-dp-quick button {
  flex: 1 0 calc(20% - 4px); padding: 4px 6px;
  border: 1px solid var(--paper-3); background: var(--paper);
  color: var(--ink-2); border-radius: var(--r-2);
  font-size: var(--fs-xs); cursor: pointer; font-family: inherit;
}
#memola-overlay #memola-daily-picker .memola-dp-quick button:hover {
  background: var(--paper-2); color: var(--ink);
}
#memola-overlay #memola-daily-picker .memola-dp-foot {
  display: flex; justify-content: flex-end; gap: 6px;
  border-top: 1px dashed var(--paper-3); padding-top: 8px;
}
#memola-overlay #memola-daily-picker .memola-dp-foot button {
  padding: 5px 12px; border: 1px solid var(--paper-3);
  background: var(--paper); color: var(--ink); border-radius: var(--r-2);
  cursor: pointer; font-size: var(--fs-sm); font-family: inherit;
}
#memola-overlay #memola-daily-picker .memola-dp-foot button:hover { background: var(--paper-2); }
#memola-overlay #memola-daily-picker .memola-dp-primary {
  background: var(--accent) !important; color: #fff !important;
  border-color: var(--accent) !important;
}
#memola-overlay #memola-daily-picker .memola-dp-primary:hover {
  background: var(--accent-strong) !important;
}

#memola-overlay .memola-sl-label {
  padding: 14px 16px 4px; font-size: 11px; font-weight: 500;
  color: var(--ink-3); opacity: 0.8;
  letter-spacing: 0.02em;
}

#memola-tree-wrap { flex: 1; overflow-y: auto; padding: 2px 8px 2px 4px; }
/* Per-section drop zones: each tree container has min-height + padding so
   even an empty section accepts dragged drops. The last section gets the
   tall padding-bottom so users can drop at the very end. */
#memola-overlay #memola-tree-pinned,
#memola-overlay #memola-tree-private,
#memola-overlay #memola-tree-org {
  min-height: 12px;
  padding-bottom: 8px;
}
#memola-overlay #memola-tree-org { padding-bottom: 80px; }
/* Section header label: extra top space so sections feel separated. */
#memola-overlay #memola-tree-private-lbl,
#memola-overlay #memola-tree-org-lbl,
#memola-overlay #memola-tree-pinned-lbl {
  margin-top: 6px;
}
#memola-sb-ft { padding: 8px; border-top: 1px solid var(--paper-3); flex-shrink: 0; }

#memola-overlay .memola-nb {
  width: 100%; padding: 6px 12px; border: none; border-radius: var(--r-2);
  background: transparent; color: var(--ink); cursor: pointer; text-align: left;
  font-size: var(--fs-md); display: flex; align-items: center; gap: 10px; font-family: inherit;
  opacity: 0.7; min-height: 30px;
}
#memola-overlay .memola-nb:hover { background: var(--paper-2-strong); opacity: 1; }
#memola-overlay .memola-nb svg { width: 14px; height: 14px; flex-shrink: 0; opacity: 0.6; }

/* \u2500\u2500 Tree nodes \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-tr-dragging,
#memola-overlay .memola-tr-dragging-descendant { opacity: 0.08; }
#memola-overlay .memola-tr-dropover { background: var(--accent-soft) !important; outline: 1px solid var(--accent); outline-offset: -1px; }
/* Floating sibling-drop indicator (positioned globally so it can extend
 * leftward past the row to show "promote to ancestor" drops). */
#memola-overlay .memola-tr-drop-line {
  position: fixed; height: 2px; pointer-events: none;
  z-index: 2147483647; display: none;
  background: var(--accent);
  border-radius: 1px;
}
#memola-overlay .memola-tr-drop-line.on { display: block; }
#memola-overlay .memola-tr-drop-dot {
  position: absolute; top: -3px; left: -4px;
  width: 8px; height: 8px; background: var(--accent); border-radius: 50%;
}
#memola-overlay .memola-tr-drop-dot.right { left: auto; right: -4px; }
#memola-overlay .memola-tr {
  display: flex; align-items: center; padding: 0 8px 0 4px;
  border-radius: var(--r-2); cursor: pointer; user-select: none;
  font-size: var(--fs-md); min-height: 28px; transition: background 0.1s;
}
#memola-overlay .memola-tr:hover { background: var(--paper-2-strong); }

/* \u300C\u3055\u3089\u306B\u8868\u793A / \u8868\u793A\u3092\u6E1B\u3089\u3059\u300D toggle at the end of a capped scope section. */
#memola-overlay .memola-sl-more {
  display: flex; align-items: center;
  padding: 0 8px 0 24px; min-height: 26px;
  border-radius: var(--r-2); cursor: pointer; user-select: none;
  font-size: var(--fs-sm, 12px); color: var(--ink-3);
  transition: background 0.1s;
}
#memola-overlay .memola-sl-more:hover { background: var(--paper-2-strong); color: var(--ink-2); }
#memola-overlay .memola-tr.on { background: var(--paper-3); font-weight: 500; }
#memola-overlay .memola-tr:hover .memola-ta { opacity: 1; }

#memola-overlay .memola-tog {
  width: 20px; height: 20px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; color: var(--ink-3); border-radius: 3px; transition: transform 0.15s;
}
#memola-overlay .memola-tog.op { transform: rotate(90deg); }
#memola-overlay .memola-tog.lf { pointer-events: none; }
#memola-overlay .memola-ti { width: 16px; flex-shrink: 0; font-size: 13px; text-align: center; }
#memola-overlay .memola-tl {
  flex: 1; min-width: 0; overflow: hidden;
  text-overflow: ellipsis; white-space: nowrap; padding: 0 4px;
}
#memola-overlay .memola-ta { opacity: 0; display: flex; gap: 1px; flex-shrink: 0; }
#memola-overlay .memola-tac {
  width: 20px; height: 20px; border: none; background: transparent;
  border-radius: 3px; cursor: pointer; display: flex; align-items: center;
  justify-content: center; font-size: 13px; color: var(--ink-3); padding: 0;
}
#memola-overlay .memola-tac:hover { background: rgba(0,0,0,.08); color: var(--ink); }

/* \u2500\u2500 Main area \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

/* 4-pane content row: [outline | editor | props | ai] */
#memola-content-row {
  flex: 1; display: flex; flex-direction: row;
  align-items: stretch; min-height: 0; overflow: hidden;
}

#memola-top {
  height: var(--topbar-h); border-bottom: 1px solid var(--paper-3);
  display: flex; align-items: center; padding: 0 20px; gap: 10px; flex-shrink: 0;
  background: var(--paper);
}
#memola-sb-toggle {
  border: none; background: transparent; cursor: pointer;
  color: var(--ink); padding: 6px; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  line-height: 0; flex-shrink: 0; opacity: 0.5;
}
#memola-sb-toggle:hover { background: rgba(55, 53, 47, 0.08); opacity: 1; }
#memola-sb-toggle svg { width: 16px; height: 16px; }

/* \u2500\u2500 Browser-style back/forward navigation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-nav-btn {
  border: none; background: transparent; cursor: pointer;
  color: var(--ink); padding: 6px; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  line-height: 0; flex-shrink: 0; opacity: 0.5;
  transition: background 0.12s, opacity 0.12s, color 0.12s;
  margin-left: -2px;
}
#memola-overlay .memola-nav-btn:not(.disabled):hover {
  background: rgba(55, 53, 47, 0.08);
  opacity: 1;
}
#memola-overlay .memola-nav-btn.disabled {
  opacity: 0.22;
  cursor: not-allowed;
}
#memola-overlay .memola-nav-btn svg { width: 16px; height: 16px; }

#memola-bc {
  flex: 1; font-size: 13px; color: var(--ink-3);
  display: flex; align-items: center; gap: 2px; overflow: hidden;
}
#memola-overlay .memola-bi { white-space: nowrap; cursor: pointer; padding: 2px 4px; border-radius: 3px; }
#memola-overlay .memola-bi:hover { background: rgba(55, 53, 47, 0.08); color: var(--ink); }
#memola-ss { font-size: var(--fs-xs); color: var(--ink-3); flex-shrink: 0; min-width: 60px; text-align: right; }
#memola-ss[data-state="saving"] { color: var(--accent); }
#memola-ss[data-state="dirty"] { color: var(--ink); }
#memola-ss[data-state="offline"] { color: var(--danger); }

/* \u2500\u2500 Publish-status tag (sits to the right of the breadcrumb) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-pub-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--fs-xs);
  font-weight: 600;
  font-family: inherit;
  padding: 3px 10px;
  margin-left: 8px;
  border: 1px solid transparent;
  border-radius: 11px;
  background: #2f6f5e;            /* solid green-teal: published & in-sync */
  color: #fff;
  cursor: pointer;
  flex-shrink: 0;
  transition: filter 0.12s, background 0.12s, box-shadow 0.12s;
  white-space: nowrap;
  letter-spacing: 0.02em;
  box-shadow: 0 1px 2px rgba(47, 111, 94, 0.25);
}
#memola-overlay #memola-pub-tag:hover {
  filter: brightness(1.08);
  box-shadow: 0 2px 6px rgba(47, 111, 94, 0.35);
}
#memola-overlay #memola-pub-tag .memola-pub-tag-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #aef0d6;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.18);
}
#memola-overlay #memola-pub-tag.dirty {
  background: #c47f1c;             /* solid amber: dirty */
  box-shadow: 0 1px 2px rgba(196, 127, 28, 0.28);
}
#memola-overlay #memola-pub-tag.dirty:hover {
  filter: brightness(1.08);
  box-shadow: 0 2px 6px rgba(196, 127, 28, 0.40);
}
#memola-overlay #memola-pub-tag.dirty .memola-pub-tag-dot {
  background: #ffd98a;
  animation: memola-pub-pulse 1.6s ease-in-out infinite;
}
@keyframes memola-pub-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.55; transform: scale(0.78); }
}
#memola-overlay #memola-pub-tag.busy {
  opacity: 0.65;
  pointer-events: none;
}

/* \u2500\u2500 Scope tag (\u500B\u4EBA / \u7D44\u7E54 indicator next to publish tag) \u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-scope-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--fs-xs);
  font-weight: 600;
  font-family: inherit;
  padding: 3px 10px;
  margin-left: 8px;
  border: 1px solid var(--paper-3);
  border-radius: 11px;
  background: var(--paper-2);
  color: var(--ink-2);
  cursor: pointer;
  flex-shrink: 0;
  transition: filter 0.12s, background 0.12s, color 0.12s, border-color 0.12s;
  white-space: nowrap;
  letter-spacing: 0.02em;
}
#memola-overlay #memola-scope-tag:hover {
  background: var(--paper-3);
  color: var(--ink);
}
#memola-overlay #memola-scope-tag.org {
  background: #e8f0e3;            /* soft sage \u2014 org-scoped */
  color: #3a5a3a;
  border-color: #c8d6bf;
}
#memola-overlay #memola-scope-tag.org:hover {
  background: #dceadb;
  border-color: #9fb898;
}
#memola-overlay #memola-scope-tag .memola-scope-tag-ic {
  font-size: 12px; line-height: 1;
}
#memola-overlay .memola-pub-pop {
  position: fixed;
  z-index: 1300;
  background: var(--paper, #fafaf7);   /* --bg is undefined \u2192 was transparent (see-through) */
  border: 1px solid rgba(55, 53, 47, 0.14);
  border-radius: 6px;
  box-shadow: rgba(15, 15, 15, 0.05) 0 0 0 1px, rgba(15, 15, 15, 0.10) 0 3px 6px,
              rgba(15, 15, 15, 0.20) 0 9px 24px;
  padding: 12px;
  width: 280px;
}
#memola-overlay .memola-pub-pop-msg {
  font-size: var(--fs-sm);
  color: var(--ink-2);
  margin-bottom: 10px;
  line-height: 1.5;
}
#memola-overlay .memola-pub-pop-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
#memola-overlay .memola-pub-pop-btn {
  font-family: inherit;
  font-size: var(--fs-sm);
  padding: 6px 10px;
  border: 1px solid rgba(55, 53, 47, 0.16);
  background: rgba(55, 53, 47, 0.03);
  color: var(--ink);
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  transition: background 0.1s;
}
#memola-overlay .memola-pub-pop-btn:hover {
  background: rgba(55, 53, 47, 0.08);
}
#memola-overlay .memola-pub-pop-btn.primary {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
#memola-overlay .memola-pub-pop-btn.primary:hover {
  filter: brightness(0.92);
}
#memola-overlay .memola-pub-pop-btn.danger {
  color: #b13a3a;
  border-color: rgba(177, 58, 58, 0.30);
}
#memola-overlay .memola-pub-pop-btn.danger:hover {
  background: rgba(177, 58, 58, 0.08);
}
#memola-overlay .memola-pub-pop-btn.ghost {
  background: transparent;
  border-color: transparent;
  color: var(--ink-3);
  text-align: center;
}
#memola-overlay .memola-pub-pop-btn.ghost:hover {
  background: rgba(55, 53, 47, 0.06);
  color: var(--ink-2);
}

/* \u2500\u2500 Formatting toolbar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-tb {
  border-bottom: 1px solid rgba(55, 53, 47, 0.09); padding: 3px 16px;
  display: none; gap: 1px; flex-shrink: 0; flex-wrap: wrap; align-items: center;
}
#memola-overlay .memola-b {
  border: none; background: transparent; border-radius: 4px; cursor: pointer;
  padding: 4px 7px; font-size: 13px; color: var(--ink);
  display: inline-flex; align-items: center; justify-content: center;
  font-family: inherit; line-height: 1; min-height: 28px; min-width: 28px;
  opacity: 0.6;
}
#memola-overlay .memola-b:hover { background: rgba(55, 53, 47, 0.08); opacity: 1; }
#memola-overlay .memola-b.on { background: rgba(55, 53, 47, 0.12); opacity: 1; color: var(--accent); }
#memola-overlay .memola-b svg { width: 16px; height: 16px; display: block; }
#memola-overlay .memola-bs { width: 1px; height: 18px; background: rgba(55, 53, 47, 0.09); margin: 0 3px; flex-shrink: 0; }

/* \u2500\u2500 Editor area \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-ea {
  flex: 1; min-width: 480px; overflow-y: auto;
  display: flex; justify-content: center;
  align-items: flex-start;
  padding: 60px 40px 40px;
  transition: padding 0.2s ease;
}
#memola-ei { width: 100%; max-width: var(--content-max); transition: max-width 0.2s ease; }

/* \u2500\u2500 Library view (\u{1F4DA} \u30E9\u30A4\u30D6\u30E9\u30EA): full-page all-pages list \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-lib { flex: 1; overflow-y: auto; display: none; min-width: 0; }
#memola-overlay .memola-lib-inner { max-width: 1100px; margin: 0 auto; padding: 56px 56px 96px; }
#memola-overlay .memola-lib-hd { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
#memola-overlay .memola-lib-icon { font-size: 30px; line-height: 1; }
#memola-overlay .memola-lib-title { font-size: 30px; font-weight: 700; margin: 0; color: var(--ink); }
#memola-overlay .memola-lib-tabs { display: flex; gap: 4px; margin-bottom: 12px; border-bottom: 1px solid var(--line); }
#memola-overlay .memola-lib-tab {
  padding: 6px 12px; font-size: var(--fs-md); color: var(--ink-3);
  background: none; border: none; border-bottom: 2px solid transparent;
  cursor: pointer; margin-bottom: -1px; transition: color 0.1s, border-color 0.1s;
}
#memola-overlay .memola-lib-tab:hover { color: var(--ink); }
#memola-overlay .memola-lib-tab.on { color: var(--ink); border-bottom-color: var(--accent); font-weight: 600; }
#memola-overlay .memola-lib-tb { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
#memola-overlay .memola-lib-search {
  flex: 0 1 320px; padding: 6px 10px; font-size: var(--fs-md);
  border: 1px solid var(--line); border-radius: var(--r-2);
  background: var(--paper); color: var(--ink); outline: none;
}
#memola-overlay .memola-lib-search:focus { border-color: var(--accent); }
#memola-overlay .memola-lib-count { font-size: var(--fs-sm, 12px); color: var(--ink-3); }
#memola-overlay .memola-lib-table { width: 100%; border-collapse: collapse; font-size: var(--fs-md); }
#memola-overlay .memola-lib-table th {
  text-align: left; font-weight: 500; color: var(--ink-3);
  padding: 6px 12px; border-bottom: 1px solid var(--line);
  font-size: var(--fs-sm, 12px); white-space: nowrap;
}
#memola-overlay .memola-lib-table td {
  padding: 7px 12px; border-bottom: 1px solid var(--line);
  color: var(--ink-3); vertical-align: middle;
}
#memola-overlay .memola-lib-row { cursor: pointer; transition: background 0.1s; }
#memola-overlay .memola-lib-row:hover { background: var(--paper-2-strong); }
/* Selection column reuses the DB table's .memola-td-cb / .memola-cb /
   .memola-tr-sel styling (see the #memola-dt, #memola-lib-dt rules) so
   the checkbox size/position match the normal DB list exactly. */
#memola-overlay .memola-lib-c-title { display: flex; align-items: center; gap: 6px; }
#memola-overlay .memola-lib-tog {
  flex-shrink: 0; width: 24px; height: 24px;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 17px; line-height: 1; color: var(--ink-3); border-radius: 4px; cursor: pointer;
}
#memola-overlay .memola-lib-tog:hover { background: var(--paper-3); color: var(--ink); }
#memola-overlay .memola-lib-tog-sp { flex-shrink: 0; width: 24px; }
#memola-overlay .memola-lib-c-ic { flex-shrink: 0; font-size: 15px; }
#memola-overlay .memola-lib-c-editor,
#memola-overlay .memola-lib-c-date { color: var(--ink-3); white-space: nowrap; }
#memola-overlay .memola-lib-link { color: var(--ink); font-weight: 500; }
#memola-overlay .memola-lib-row:hover .memola-lib-link { text-decoration: underline; }
#memola-overlay .memola-lib-c-parent { color: var(--ink-3); }
#memola-overlay .memola-lib-empty { text-align: center; color: var(--ink-3); padding: 32px 0; }
#memola-overlay.focus-mode #memola-ei { max-width: var(--content-max-focus); }
#memola-overlay.focus-mode #memola-ea { padding: 60px 60px 40px; }
#memola-overlay.focus-mode #memola-sb { width: var(--sidebar-collapsed-w); }
#memola-overlay.focus-mode #memola-outline.on,
#memola-overlay.focus-mode #memola-props.on,
#memola-overlay.focus-mode #memola-ai-panel.on { display: none !important; }
#memola-overlay.focus-mode #memola-top { opacity: 0.4; transition: opacity 0.2s; }
#memola-overlay.focus-mode #memola-top:hover { opacity: 1; }

/* Page header / icon */
/* Page header layout:
 *   - When an icon IS set    \u2192 icon on the LEFT of the title (flex row).
 *   - When NO icon is set    \u2192 "\u30A2\u30A4\u30B3\u30F3\u3092\u8FFD\u52A0" button floats ABOVE the title in
 *                              an absolutely-positioned slot. The header has
 *                              padding-top reserved so the layout doesn't
 *                              shift when the button appears on hover. */
#memola-pg-hd {
  position: relative; margin-bottom: 8px;
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
}
#memola-pg-hd.no-icon, #memola-dv-hd.no-icon { padding-top: 32px; }
#memola-icon-wrap { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
#memola-pg-icon {
  font-size: 40px; line-height: 1; cursor: pointer; display: none;
  border-radius: 6px; padding: 4px; transition: background 0.1s;
}
#memola-pg-icon:hover { background: rgba(55, 53, 47, 0.08); }
/* "\u30A2\u30A4\u30B3\u30F3\u3092\u8FFD\u52A0" \u2014 absolutely positioned in the reserved slot above the title.
 * Visible only while the header is hovered. JS hard-hides it when an icon IS set. */
.memola-pg-icon-empty {
  position: absolute; top: 0; left: 0;
  display: none;                                /* hidden until header hover */
  font-size: 13px; color: var(--ink-4); padding: 4px 8px; border: none;
  background: transparent; cursor: pointer; border-radius: 4px; font-family: inherit;
  align-items: center; gap: 4px;
  opacity: 0; transition: opacity var(--tr-fast);
}
#memola-overlay #memola-pg-hd:hover .memola-pg-icon-empty,
#memola-overlay #memola-dv-hd:hover .memola-pg-icon-empty {
  display: inline-flex; opacity: 1;
}
.memola-pg-icon-empty:hover { background: rgba(55, 53, 47, 0.08); color: var(--ink-3); }

#memola-ttl {
  font-size: 28px; font-weight: 600; line-height: 1.3; color: var(--ink); margin: 0;
  outline: none; border: none; flex: 1 1 0; min-width: 0; background: transparent;
  font-family: var(--font-serif); resize: none; overflow: hidden; padding: 0; display: block;
  letter-spacing: -0.005em;
}
#memola-ttl::placeholder { color: var(--ink-4); }
/* \`padding-bottom\` reserves a Notion-style "click anywhere below the
 * last block to start a new paragraph" gutter. Without it, long pages
 * (content > min-height) have zero clickable slack below the last
 * child element, and the editor's mousedown handler can't fire its
 * "append empty <p>" branch. */
#memola-ed { outline: none; min-height: 200px; padding-bottom: 140px; font-size: var(--fs-base); line-height: 1.75; }
/* Empty-page placeholder. editor2 always keeps a real empty paragraph
   block (so the caret has somewhere to land), which means the editor is
   never DOM-\`:empty\`. Instead \`editor-render\` toggles
   \`.memola-editor-empty\` on the root when the whole doc is a single
   empty paragraph; we overlay the prompt on that first block. Absolute
   positioning keeps it from affecting layout or the caret \u2014 typing
   fills the paragraph, the class drops on re-render, the prompt clears. */
/* \u2500\u2500 DB view-level colour: palette popup + header colour button \u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-dbcolor-pop {
  position: absolute; z-index: 2147483647; background: #fff;
  border: 1px solid var(--line, #e9e9e7); border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.14); padding: 8px;
  display: flex; flex-wrap: wrap; gap: 6px; width: 168px;
}
#memola-overlay .memola-dbcolor-sw {
  width: 20px; height: 20px; border-radius: 5px; cursor: pointer; padding: 0;
  border: 1px solid var(--line, #e9e9e7);
}
#memola-overlay .memola-dbcolor-sw:hover { outline: 2px solid var(--accent, #635bff); outline-offset: 1px; }
#memola-overlay .memola-dbcolor-sw.none {
  background: linear-gradient(to top left, transparent 45%, #c4554d 45%, #c4554d 55%, transparent 55%), #fff;
}
#memola-overlay #memola-dt th .memola-th-color {
  border: none; background: none; cursor: pointer; padding: 0 2px;
  font-size: 11px; opacity: 0; margin-left: 4px; vertical-align: middle;
  transition: opacity 0.1s;
}
#memola-overlay #memola-dt th:hover .memola-th-color { opacity: 0.7; }
#memola-overlay #memola-dt th .memola-th-color:hover { opacity: 1; }

/* \u2500\u2500 Table edge handles (select a cell \u2192 row/col/cell handles) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-tbl-handle {
  position: absolute; z-index: 2147483646; display: none;
  align-items: center; justify-content: center;
  background: var(--accent, #635bff); color: #fff;
  border-radius: 3px; cursor: pointer; opacity: 0.85;
  box-shadow: 0 1px 3px rgba(0,0,0,0.18);
}
#memola-overlay .memola-tbl-handle:hover { opacity: 1; }
#memola-overlay .memola-tbl-handle-row  { width: 12px; }       /* tall bar at row's left */
#memola-overlay .memola-tbl-handle-col  { height: 12px; }      /* wide bar at column's top */
#memola-overlay .memola-tbl-handle-cell { width: 9px; height: 18px; }  /* small grip at cell's right */
/* Thicken the selected cell's right + top + left borders (handle anchors). */
#memola-overlay td.memola-itbl-selcell {
  box-shadow: inset 2px 0 0 var(--accent, #635bff),
              inset 0 2px 0 var(--accent, #635bff),
              inset -2px 0 0 var(--accent, #635bff);
}
/* Cell action menu + colour swatches */
#memola-overlay #memola-tbl-cell-menu {
  position: absolute; z-index: 2147483647; background: #fff;
  border: 1px solid var(--line, #e9e9e7); border-radius: 6px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.12); padding: 4px 0;
  min-width: 180px; font-size: 13px; color: var(--ink, #37352f);
}
#memola-overlay .memola-tbl-cell-menu-item { padding: 6px 14px; cursor: pointer; }
#memola-overlay .memola-tbl-cell-menu-item:hover { background: var(--paper-2, #f1f1ef); }
#memola-overlay .memola-tbl-cell-menu-item.danger { color: #c4554d; }
#memola-overlay .memola-tbl-cell-menu-sep { height: 1px; background: var(--line, #e9e9e7); margin: 4px 0; }
#memola-overlay .memola-tbl-cell-menu-collabel { padding: 4px 14px 2px; font-size: 11px; color: var(--ink-3, #9b9a97); }
#memola-overlay .memola-tbl-cell-colors { display: flex; flex-wrap: wrap; gap: 5px; padding: 4px 14px 8px; max-width: 200px; }
#memola-overlay .memola-tbl-cell-swatch {
  width: 18px; height: 18px; border-radius: 4px; cursor: pointer;
  border: 1px solid var(--line, #e9e9e7); padding: 0;
}
#memola-overlay .memola-tbl-cell-swatch:hover { outline: 2px solid var(--accent, #635bff); outline-offset: 1px; }
#memola-overlay .memola-tbl-cell-swatch.none {
  background:
    linear-gradient(to top left, transparent 45%, #c4554d 45%, #c4554d 55%, transparent 55%), #fff;
}

/* Notion-style full-edge table add bars (+row along the bottom, +col along
   the right). The \`+\` is faint until hovered. */
#memola-overlay #memola-tbl-add-row,
#memola-overlay #memola-tbl-add-col {
  background: var(--paper-2, #f4f4f2); border: 1px solid var(--line, #e9e9e7);
  border-radius: 4px; color: var(--ink-3, #9b9a97); font-size: 13px;
  box-shadow: none; transition: background 0.1s, color 0.1s;
}
#memola-overlay #memola-tbl-add-row:hover,
#memola-overlay #memola-tbl-add-col:hover {
  background: var(--accent-soft, #e8e7ff); color: var(--accent, #635bff);
}

#memola-ed.memola-editor-empty .memola-blk:first-child { position: relative; }
#memola-ed.memola-editor-empty .memola-blk:first-child > p::before {
  content: "\u3053\u3053\u304B\u3089\u59CB\u3081\u307E\u3059";
  color: var(--ink-4);
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
}
#memola-ed h1 { font-family: var(--font-serif); font-size: 1.85em; font-weight: 600; margin: .8em 0 .15em; line-height: 1.3; letter-spacing: -0.005em; }
#memola-ed h2 { font-family: var(--font-serif); font-size: 1.45em; font-weight: 500; margin: .7em 0 .15em; line-height: 1.3; }
#memola-ed h3 { font-family: var(--font-serif); font-size: 1.2em;  font-weight: 500; margin: .6em 0 .1em; line-height: 1.3; }
#memola-ed p  { margin: .2em 0; }
/* Preserve consecutive spaces so the user can actually type them.
 * Without \`pre-wrap\`, HTML collapses runs of whitespace to a single
 * space at render time \u2014 so typing "a   b" only ever shows "a b". */
#memola-ed p,
#memola-ed h1, #memola-ed h2, #memola-ed h3,
#memola-ed .memola-todo-txt,
#memola-ed blockquote { white-space: pre-wrap; }
#memola-ed ul, #memola-ed ol { padding-left: 1.6em; }
#memola-ed li + li { margin-top: .2em; }
#memola-ed blockquote {
  border-left: 3px solid rgba(55, 53, 47, 0.09);
  padding-left: 1em; color: var(--ink-3); margin: .5em 0;
}
#memola-ed pre {
  background: #f0f0ef; border-radius: 6px; padding: 12px 16px;
  font-family: "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 13.5px; overflow-x: auto; white-space: pre; margin: .5em 0;
  background: var(--bg-2, #f6f6f4); padding: 14px 16px; border-radius: 4px;
  min-height: 4.5em; line-height: 1.5;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, "Cascadia Mono", monospace;
  /* Center the inner <code> vertically \u2014 empty / short content sits
   * in the visual middle instead of pinned to the top edge. Multi-
   * line code grows the <pre> beyond min-height so centering becomes
   * a no-op naturally. */
  display: flex; flex-direction: column; justify-content: center;
}
#memola-overlay #memola-ed pre code { background: none; padding: 0; color: inherit; }
#memola-overlay #memola-ed code {
  background: rgba(135, 131, 120, 0.2); border-radius: 3px; padding: 2px 4px;
  font-family: "SFMono-Regular", Menlo, Consolas, monospace; font-size: 85%;
  color: rgb(235, 87, 87);
}
#memola-ed strong { font-weight: 600; }
#memola-ed em { font-style: italic; }
#memola-ed s { text-decoration: line-through; }
#memola-ed hr { border: none; border-top: 1px solid rgba(55, 53, 47, 0.09); margin: 1em 0; }
#memola-ed a { color: var(--accent); text-decoration: underline; cursor: pointer; }
/* Reinforce the link cursor inside the contenteditable, where the default
 * is the text caret. Covers URL/UNC links (data-href) and page/daily links. */
#memola-ed a[data-href], #memola-ed a[data-page-id], #memola-ed a[data-daily-date] { cursor: pointer; }

/* \u2500\u2500 Callout block \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* The controlled editor (editor2) renders the wrapper as
 * \`.memola-blk-callout\`; the legacy/export markup uses \`.memola-callout\`.
 * Both must get the flex layout \u2014 without it the icon (inline span) and the
 * body (block div) stack vertically, so text lands on the line BELOW the
 * emoji instead of beside it. A left accent bar distinguishes the callout
 * from the (monospace, centered) code block, which shares a grey fill. */
#memola-ed .memola-callout,
#memola-ed .memola-blk-callout {
  display: flex; gap: 10px; align-items: flex-start;
  background: rgb(241, 241, 239);
  border-left: 3px solid var(--accent, #2f6f5e);
  border-radius: 4px; padding: 12px 16px; margin: 4px 0;
}
#memola-ed .memola-callout-ic { font-size: 20px; flex-shrink: 0; line-height: 1.5; user-select: none; cursor: default; }
#memola-ed .memola-callout-body { flex: 1; min-width: 0; }
#memola-ed .memola-callout-body p { margin: 0; }

/* \u2500\u2500 Todo list \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* Both \`.memola-todo\` (legacy editor) and \`.memola-blk-todo\`
 * (controlled editor2) get the same flex layout so checkbox + text
 * line up cleanly. */
#memola-ed .memola-todo,
#memola-ed .memola-blk-todo {
  display: flex; align-items: flex-start; gap: 10px; margin: 2px 0; line-height: 1.6;
}
#memola-ed .memola-todo-cb {
  width: 16px; height: 16px; margin-top: 4px; flex-shrink: 0; cursor: pointer;
  accent-color: var(--accent);
}
#memola-ed .memola-todo-txt { flex: 1; min-width: 0; }
#memola-ed .memola-todo-txt.done { text-decoration: line-through; opacity: 0.4; }

/* \u2500\u2500 Toggle / Details \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-ed details {
  margin: 4px 0; border-radius: 4px;
  padding: 2px 0;
}
#memola-ed summary {
  cursor: pointer; list-style: none; display: flex; align-items: center;
  gap: 6px; font-weight: 500; padding: 4px 0; user-select: none;
}
#memola-ed summary::before {
  content: '\u25B6'; font-size: 10px; color: var(--ink-3);
  transition: transform 0.15s; display: inline-block;
}
#memola-ed details[open] summary::before { transform: rotate(90deg); }
#memola-ed summary::-webkit-details-marker { display: none; }
#memola-ed .memola-toggle-body { padding-left: 24px; }

/* \u2500\u2500 Empty state (\u300C\u306F\u3058\u3081\u3066\u307F\u3088\u3046\u300D) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-em {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 100%; min-height: 300px; max-width: 480px; margin: auto;
  color: var(--ink-3); gap: 14px; text-align: center;
}
#memola-em .memola-em-icon { font-size: 48px; line-height: 1; opacity: 0.55; }
#memola-em .memola-em-title {
  font-family: var(--font-serif); font-size: 22px; font-weight: 500;
  color: var(--ink); letter-spacing: 0;
}
#memola-em .memola-em-sub { font-size: var(--fs-md); color: var(--ink-3); max-width: 320px; }
#memola-em .memola-em-btns { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 4px; }
#memola-em .memola-em-chips { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; margin-top: 4px; }
#memola-em .memola-em-chip {
  cursor: pointer; font-family: inherit;
}
#memola-overlay .memola-btn.ghost {
  background: transparent; border: 1px dashed var(--paper-3); color: var(--ink-3);
}
#memola-overlay .memola-btn.ghost:hover { border-color: var(--ink-4); color: var(--ink); }
#memola-ct { display: none; }

/* \u2500\u2500 Loading overlay \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-ld {
  position: absolute; inset: 0; background: rgba(255,255,255,.85);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; color: var(--ink-3); gap: 8px;
}
#memola-ld.off { display: none; }

/* \u2500\u2500 Toast \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-tk {
  position: fixed; bottom: 24px; right: 24px; padding: 10px 16px;
  border-radius: 6px; font-size: 13px; background: var(--ink); color: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,.2); z-index: 2147483648;
  opacity: 0; transform: translateY(6px); transition: opacity .2s, transform .2s;
  pointer-events: none; max-width: 560px; word-break: break-word; white-space: pre-wrap;
}
#memola-tk.on { opacity: 1; transform: translateY(0); }
#memola-tk.er { background: var(--danger); }

/* \u2500\u2500 Block drag handle (Notion-style \u22EE\u22EE) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-block-handle,
#memola-overlay #memola-row-handle,
#memola-overlay #memola-lib-row-handle {
  position: absolute; display: none;
  align-items: center; justify-content: center;
  width: 18px; cursor: grab;
  color: var(--ink); opacity: 0.3;
  border-radius: var(--r-2);
  z-index: 10; transition: opacity var(--tr-fast), background var(--tr-fast);
}
#memola-overlay #memola-lib-row-handle { cursor: pointer; }   /* select, not drag */
#memola-overlay #memola-block-handle:hover,
#memola-overlay #memola-row-handle:hover,
#memola-overlay #memola-lib-row-handle:hover { background: var(--paper-2); opacity: 1; }
#memola-overlay #memola-block-handle:active,
#memola-overlay #memola-row-handle:active { cursor: grabbing; }
#memola-overlay #memola-block-handle svg,
#memola-overlay #memola-row-handle svg,
#memola-overlay #memola-lib-row-handle svg { display: block; }
#memola-overlay .memola-block-dragging { opacity: 0.4; }
/* Drop indicator (between blocks) \u2014 Notion\u98A8: \u4E21\u7AEF\u30C9\u30C3\u30C8\u4ED8\u304D\u306E\u592A\u3081\u30BB\u30F3\u30BF\u30FC\u30E9\u30A4\u30F3 */
#memola-overlay .memola-block-placeholder {
  position: relative;
  height: 3px; background: var(--accent);
  margin: 8px 0; border-radius: 2px;
  pointer-events: none;
  box-shadow: 0 0 0 0.5px rgba(122, 138, 120, 0.3);
  animation: memola-ph-pulse 1.2s ease-in-out infinite;
}
#memola-overlay .memola-block-placeholder::before,
#memola-overlay .memola-block-placeholder::after {
  content: ''; position: absolute;
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--accent);
  top: 50%; transform: translateY(-50%);
}
#memola-overlay .memola-block-placeholder::before { left: -4px; }
#memola-overlay .memola-block-placeholder::after  { right: -4px; }
/* Block-handle menu (click the \u22EE\u22EE handle): \u8FFD\u52A0 + \u7A2E\u985E\u5909\u66F4 */
#memola-overlay .memola-blk-menu {
  position: absolute; z-index: 2147483647;
  background: var(--paper, #fff);
  border: 1px solid var(--line, rgba(55, 53, 47, 0.15));
  border-radius: var(--r-3, 8px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
  padding: 4px; min-width: 184px; max-height: 70vh; overflow-y: auto;
  font-size: var(--fs-sm, 13px);
}
#memola-overlay .memola-blk-menu-item {
  display: block; width: 100%; text-align: left;
  background: none; border: none; cursor: pointer;
  padding: 6px 10px; border-radius: var(--r-2, 4px);
  color: var(--ink, #37352f); font-family: inherit; font-size: var(--fs-sm, 13px);
}
#memola-overlay .memola-blk-menu-item:hover { background: var(--paper-2, rgba(55, 53, 47, 0.08)); }
#memola-overlay .memola-blk-menu-hd {
  padding: 8px 10px 3px; font-size: var(--fs-xs, 11px);
  color: var(--ink-3, #9b9a97); font-weight: 500;
}

/* \u2500\u2500 Comments: gutter markers + right-side pane (Notion\u98A8) \u2500\u2500 */
#memola-overlay .memola-cmt-marker {
  position: absolute; z-index: 11; cursor: pointer;
  font-size: 13px; line-height: 1; padding: 1px 3px; border-radius: var(--r-2, 4px);
  opacity: 0.5; transition: opacity var(--tr-fast, .12s);
  user-select: none;
}
#memola-overlay .memola-cmt-marker:hover { opacity: 1; background: var(--paper-2, rgba(55,53,47,.08)); }

/* Right pane (sibling of outline / props in #memola-content-row) */
#memola-overlay #memola-comments-pane {
  width: 320px; flex-shrink: 0; display: flex; flex-direction: column;
  background: var(--paper); border-left: 1px solid var(--paper-3); border-left-width: 0;
  font-family: var(--font-ui); overflow: hidden;
  max-width: 0; opacity: 0;
  transition: max-width 0.22s ease, opacity 0.22s ease, border-width 0.22s ease;
}
#memola-overlay #memola-comments-pane.on { max-width: 600px; opacity: 1; border-left-width: 1px; }
#memola-overlay #memola-comments-hd {
  display: flex; align-items: center; padding: 14px 16px 10px;
  font-size: var(--fs-sm); font-weight: 600; color: var(--ink);
}
#memola-overlay #memola-comments-hd > span:first-child { flex: 1; }
#memola-overlay #memola-comments-list {
  flex: 1; overflow-y: auto; padding: 0 12px 8px;
}
#memola-overlay .memola-cmt-empty { padding: 16px 4px; color: var(--ink-3); font-size: var(--fs-sm); line-height: 1.6; }

/* Thread card */
#memola-overlay .memola-cmt-thread {
  position: relative;
  padding: 10px; margin: 8px 0; border-radius: var(--r-3, 8px);
  background: var(--paper-2, #f7f7f5); border: 1px solid var(--paper-3, transparent);
}
/* Thread-level action bar \u2014 top-right of the whole thread, acts on the root */
#memola-overlay .memola-cmt-thread-hover {
  position: absolute; top: 6px; right: 6px; z-index: 2; display: flex; gap: 1px;
  background: var(--paper, #fff); border: 1px solid var(--paper-3, rgba(55,53,47,.12));
  border-radius: var(--r-2, 6px); box-shadow: 0 1px 4px rgba(0,0,0,.10); padding: 1px;
  opacity: 0; pointer-events: none; transition: opacity var(--tr-fast, .12s);
}
#memola-overlay .memola-cmt-thread:hover > .memola-cmt-thread-hover { opacity: 1; pointer-events: auto; }
/* Body block highlight while hovering its comment thread in the pane */
#memola-ed [data-block-id].memola-cmt-block-active {
  background: rgba(241, 196, 15, 0.16);
  box-shadow: 0 0 0 4px rgba(241, 196, 15, 0.16);
  border-radius: 3px; transition: background var(--tr-fast, .12s);
}
/* Block tinted because a live auto-merge folded in another user's add/update */
#memola-ed [data-block-id].memola-block-incoming {
  background: rgba(82, 156, 110, 0.15);
  box-shadow: 0 0 0 4px rgba(82, 156, 110, 0.15);
  border-radius: 3px; transition: background var(--tr-fast, .12s);
}
#memola-overlay .memola-cmt-thread.resolved { opacity: 0.55; }
#memola-overlay .memola-cmt-resolved-tag { font-size: var(--fs-xs); color: #2f8a5b; margin-bottom: 6px; }
#memola-overlay .memola-cmt-resolved-sep { font-size: var(--fs-xs); color: var(--ink-3); margin: 14px 4px 4px; text-transform: none; }
#memola-overlay .memola-cmt-anchor {
  font-size: var(--fs-xs); color: var(--ink-3); margin-bottom: 6px;
  padding-left: 8px; border-left: 2px solid var(--paper-4, #d8d8d4);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
#memola-overlay .memola-cmt-replies {
  margin-left: 11px; padding-left: 12px; border-left: 1px solid var(--paper-4, #e3e3e0); margin-top: 2px;
}

/* One comment row */
#memola-overlay .memola-cmt-c { position: relative; display: flex; gap: 8px; padding: 4px 0; }
#memola-overlay .memola-cmt-c.deleted { color: var(--ink-3); font-style: italic; padding-left: 32px; }
#memola-overlay .memola-cmt-avatar {
  flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%;
  color: #fff; font-size: 11px; font-weight: 600;
  display: flex; align-items: center; justify-content: center; user-select: none;
}
#memola-overlay .memola-cmt-main { flex: 1; min-width: 0; }
#memola-overlay .memola-cmt-line1 { display: flex; align-items: baseline; gap: 6px; }
#memola-overlay .memola-cmt-author { font-weight: 600; font-size: var(--fs-sm); color: var(--ink); }
#memola-overlay .memola-cmt-time { font-size: var(--fs-xs); color: var(--ink-3); }
#memola-overlay .memola-cmt-edited { font-size: 10px; color: var(--ink-3); }
#memola-overlay .memola-cmt-badge { font-size: 10px; }
#memola-overlay .memola-cmt-body { font-size: var(--fs-sm); line-height: 1.5; margin-top: 1px; white-space: pre-wrap; word-break: break-word; color: var(--ink); }
#memola-overlay .memola-cmt-body.muted { color: var(--ink-3); }
/* Compact reply: avatar a touch smaller, name + body share one line */
#memola-overlay .memola-cmt-c.reply .memola-cmt-avatar { width: 18px; height: 18px; font-size: 10px; }
#memola-overlay .memola-cmt-replyline { font-size: var(--fs-sm); line-height: 1.5; word-break: break-word; color: var(--ink); }
#memola-overlay .memola-cmt-replyline .memola-cmt-author { margin-right: 4px; }
#memola-overlay .memola-cmt-body.inline { display: inline; margin: 0; }

/* Reactions */
#memola-overlay .memola-cmt-reacts { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 5px; }
#memola-overlay .memola-cmt-react-chip {
  border: 1px solid var(--paper-4, #e0e0dc); background: var(--paper, #fff);
  border-radius: 11px; padding: 1px 7px; font-size: 11px; cursor: pointer; line-height: 1.5;
}
#memola-overlay .memola-cmt-react-chip.mine { background: #e3eefb; border-color: #8db4e6; }

/* Hover action bar (top-right of a comment) */
#memola-overlay .memola-cmt-hover {
  position: absolute; top: -4px; right: 0; display: flex; gap: 1px;
  background: var(--paper, #fff); border: 1px solid var(--paper-3, rgba(55,53,47,.12));
  border-radius: var(--r-2, 6px); box-shadow: 0 1px 4px rgba(0,0,0,.08);
  padding: 1px; opacity: 0; pointer-events: none; transition: opacity var(--tr-fast, .12s);
}
#memola-overlay .memola-cmt-c:hover > .memola-cmt-hover { opacity: 1; pointer-events: auto; }
#memola-overlay .memola-cmt-c.reply > .memola-cmt-hover { top: 0; }
#memola-overlay .memola-cmt-hbtn {
  background: none; border: none; cursor: pointer; padding: 3px 5px; border-radius: 4px;
  font-size: 12px; line-height: 1; color: var(--ink-2, #5f5e5b);
}
#memola-overlay .memola-cmt-hbtn sup { font-size: 8px; }
#memola-overlay .memola-cmt-hbtn:hover { background: var(--paper-2, rgba(55,53,47,.08)); }

/* Reply bar + edit */
#memola-overlay .memola-cmt-replybar { display: flex; gap: 6px; margin-top: 8px; }
#memola-overlay .memola-cmt-reply-inp {
  flex: 1; min-width: 0; padding: 5px 9px; border: 1px solid var(--paper-4, rgba(55,53,47,.15));
  border-radius: 14px; font-family: inherit; font-size: var(--fs-sm); background: var(--paper, #fff);
}
#memola-overlay .memola-cmt-reply-send {
  flex-shrink: 0; width: 28px; border: none; border-radius: 50%; cursor: pointer;
  background: var(--accent, #2f6f5e); color: #fff; font-size: 13px;
}
#memola-overlay .memola-cmt-edit-ta {
  width: 100%; box-sizing: border-box; resize: vertical; min-height: 48px;
  padding: 6px 8px; border: 1px solid var(--paper-4, rgba(55,53,47,.15));
  border-radius: var(--r-2, 4px); font-family: inherit; font-size: var(--fs-sm);
}
#memola-overlay .memola-cmt-editacts { display: flex; gap: 6px; margin-top: 4px; }

/* Composer */
#memola-overlay #memola-comments-composer { padding: 10px 12px; border-top: 1px solid var(--paper-3); }
#memola-overlay #memola-comments-target {
  display: flex; align-items: center; gap: 4px; font-size: var(--fs-xs); color: var(--ink-3);
  margin-bottom: 5px; max-width: 100%;
}
#memola-overlay #memola-comments-target-lbl { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#memola-overlay #memola-comments-target-x { background: none; border: none; cursor: pointer; color: var(--ink-3); }
#memola-overlay #memola-comments-ta {
  width: 100%; box-sizing: border-box; resize: vertical; min-height: 48px;
  padding: 7px 9px; border: 1px solid var(--paper-4, rgba(55,53,47,.15));
  border-radius: var(--r-2, 6px); font-family: inherit; font-size: var(--fs-sm);
}
#memola-overlay #memola-comments-footer { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
#memola-overlay #memola-comments-footer .memola-btn { margin-left: auto; }
#memola-overlay .memola-cmt-scope { display: flex; gap: 4px; }
#memola-overlay .memola-cmt-scope-btn {
  padding: 3px 8px; border: 1px solid var(--paper-4, rgba(55,53,47,.15));
  border-radius: 12px; background: var(--paper, #fff); cursor: pointer;
  font-family: inherit; font-size: 11px; color: var(--ink-3);
}
#memola-overlay .memola-cmt-scope-btn.on { background: var(--paper-2, rgba(55,53,47,.08)); color: var(--ink); border-color: var(--accent, #2f6f5e); }

/* Floating sub-menus (reaction palette / more) */
#memola-overlay .memola-cmt-float {
  position: absolute; z-index: 2147483647;
  background: var(--paper, #fff); border: 1px solid var(--paper-3, rgba(55,53,47,.15));
  border-radius: var(--r-2, 6px); box-shadow: 0 6px 20px rgba(0,0,0,.18); padding: 3px;
}
#memola-overlay .memola-cmt-react-palette { display: flex; gap: 2px; }
#memola-overlay .memola-cmt-react-opt { background: none; border: none; cursor: pointer; font-size: 17px; padding: 3px 5px; border-radius: 4px; }
#memola-overlay .memola-cmt-react-opt:hover { background: var(--paper-2, rgba(55,53,47,.08)); }
#memola-overlay .memola-cmt-more { min-width: 120px; }
#memola-overlay .memola-cmt-more-item {
  display: block; width: 100%; text-align: left; background: none; border: none; cursor: pointer;
  padding: 6px 10px; border-radius: 4px; font-family: inherit; font-size: var(--fs-sm); color: var(--ink);
}
#memola-overlay .memola-cmt-more-item:hover { background: var(--paper-2, rgba(55,53,47,.08)); }

/* @mention picker */
#memola-overlay .memola-mention-pop { min-width: 200px; max-width: 280px; max-height: 220px; overflow-y: auto; }
#memola-overlay .memola-mention-item {
  display: flex; flex-direction: column; align-items: flex-start; width: 100%;
  background: none; border: none; cursor: pointer; padding: 5px 9px; border-radius: 4px;
  font-family: inherit; text-align: left;
}
#memola-overlay .memola-mention-item.active,
#memola-overlay .memola-mention-item:hover { background: var(--paper-2, rgba(55,53,47,.08)); }
#memola-overlay .memola-mention-name { font-size: var(--fs-sm, 13px); color: var(--ink, #37352f); }
#memola-overlay .memola-mention-email { font-size: var(--fs-xs, 11px); color: var(--ink-3, #9b9a97); }

/* Comment flash (inbox navigation) */
#memola-overlay .memola-cmt-flash { animation: memola-cmt-flash 1.5s ease; }
@keyframes memola-cmt-flash {
  0%, 30% { background: rgba(241, 196, 15, 0.28); border-radius: 6px; }
  100% { background: transparent; }
}

/* Inbox badge (sidebar) */
#memola-overlay .memola-inbox-badge-count { margin-left: auto; font-size: var(--fs-xs, 11px); color: var(--accent, #2f6f5e); font-weight: 600; }

/* Inbox modal */
#memola-overlay #memola-inbox-md {
  position: fixed; inset: 0; background: rgba(15, 15, 15, .35);
  display: none; align-items: center; justify-content: center;
  z-index: 2147483647; padding: var(--s-9, 40px); backdrop-filter: blur(2px);
}
#memola-overlay #memola-inbox-md.on { display: flex; }
#memola-overlay #memola-inbox-list { max-height: 56vh; overflow-y: auto; margin: var(--s-3, 12px) 0; }
#memola-overlay .memola-inbox-empty { padding: 20px; color: var(--ink-3, #9b9a97); text-align: center; }
#memola-overlay .memola-inbox-item {
  position: relative; display: flex; gap: 8px; padding: 10px 12px 10px 20px;
  border-radius: var(--r-2, 6px); cursor: pointer;
}
#memola-overlay .memola-inbox-item:hover { background: var(--paper-2, rgba(55,53,47,.06)); }
#memola-overlay .memola-inbox-item.read { opacity: 0.62; }
#memola-overlay .memola-inbox-dot {
  position: absolute; left: 8px; top: 16px; width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent, #2f6f5e);
}
#memola-overlay .memola-inbox-main { flex: 1; min-width: 0; }
#memola-overlay .memola-inbox-line1 { font-size: var(--fs-sm, 13px); color: var(--ink, #37352f); display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; }
#memola-overlay .memola-inbox-actor { font-weight: 600; }
#memola-overlay .memola-inbox-time { font-size: var(--fs-xs, 11px); color: var(--ink-3, #9b9a97); margin-left: auto; }
#memola-overlay .memola-inbox-page { font-size: var(--fs-xs, 11px); color: var(--ink-2, #5f5e5b); margin-top: 2px; }
#memola-overlay .memola-inbox-snippet { font-size: var(--fs-xs, 11px); color: var(--ink-3, #9b9a97); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* Live mention toasts (top-right, stacked) */
#memola-overlay #memola-mention-toasts {
  position: fixed; top: calc(var(--topbar-h, 48px) + 12px); right: 16px;
  z-index: 2147483647; display: flex; flex-direction: column; gap: 8px;
  pointer-events: none;
}
#memola-overlay .memola-mention-toast {
  pointer-events: auto; cursor: pointer; width: 300px; position: relative;
  background: var(--paper, #fff); border: 1px solid var(--paper-3, rgba(55,53,47,.14));
  border-left: 3px solid var(--accent, #2f6f5e);
  border-radius: var(--r-2, 8px); box-shadow: 0 6px 20px rgba(0,0,0,.18);
  padding: 10px 28px 10px 12px; font-family: var(--font-ui);
  opacity: 0; transform: translateX(16px); transition: opacity .2s ease, transform .2s ease;
}
#memola-overlay .memola-mention-toast.on { opacity: 1; transform: translateX(0); }
#memola-overlay .memola-mention-toast-hd { font-size: var(--fs-sm, 13px); font-weight: 600; color: var(--ink, #37352f); }
#memola-overlay .memola-mention-toast-page { font-size: var(--fs-xs, 11px); color: var(--ink-2, #5f5e5b); margin-top: 2px; }
#memola-overlay .memola-mention-toast-snippet { font-size: var(--fs-xs, 11px); color: var(--ink-3, #9b9a97); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#memola-overlay .memola-mention-toast-x { position: absolute; top: 6px; right: 8px; background: none; border: none; cursor: pointer; color: var(--ink-3, #9b9a97); font-size: 15px; line-height: 1; }
@keyframes memola-ph-pulse {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.65; }
}

/* \u2500\u2500 Alternative DB views (list/gallery/calendar/gantt) \u2500 */
#memola-overlay .memola-altview { display: none; padding: var(--s-5) 0; overflow: auto; }
#memola-overlay .memola-altview.on { display: block; }
#memola-overlay .memola-altview-empty { padding: var(--s-9); text-align: center; color: var(--ink); opacity: 0.4; }

/* List view */
#memola-overlay .memola-lv-row {
  padding: var(--s-3) var(--s-4); border-bottom: 1px solid var(--paper-3);
  cursor: pointer; transition: background var(--tr-fast);
  display: flex; align-items: center; gap: var(--s-3);
}
#memola-overlay .memola-lv-row:hover { background: var(--paper-2); }
#memola-overlay .memola-lv-body { flex: 1; min-width: 0; }
#memola-overlay .memola-lv-title { font-size: var(--fs-base); color: var(--ink); margin-bottom: var(--s-1); }
#memola-overlay .memola-lv-sub { display: flex; gap: var(--s-5); flex-wrap: wrap; font-size: var(--fs-sm); color: var(--ink); opacity: 0.55; }

/* \u2500\u2500 Row-level controls (checkbox + drag handle) for list / gantt \u2500\u2500\u2500 */
#memola-overlay .memola-rowctl {
  display: flex; align-items: center; gap: 4px;
  flex-shrink: 0; min-width: 32px;
}
#memola-overlay .memola-rowctl .memola-cb { visibility: hidden; }
#memola-overlay .memola-rowctl-handle {
  visibility: hidden;
  width: 14px; height: 18px;
  display: inline-flex; align-items: center; justify-content: center;
  cursor: grab; color: var(--ink-3); opacity: 0.7;
  border-radius: var(--r-1);
}
#memola-overlay .memola-rowctl-handle:hover { background: var(--paper-3); color: var(--ink); }
#memola-overlay .memola-rowctl-handle:active { cursor: grabbing; }
/* Reveal on row hover, or always-on while any row is selected */
#memola-overlay .memola-lv-row:hover .memola-rowctl .memola-cb,
#memola-overlay .memola-lv-row:hover .memola-rowctl-handle,
#memola-overlay .memola-gantt-row:hover .memola-rowctl .memola-cb,
#memola-overlay .memola-gantt-row:hover .memola-rowctl-handle { visibility: visible; }
#memola-overlay #memola-list-view.memola-has-sel .memola-rowctl .memola-cb,
#memola-overlay .memola-gantt.memola-has-sel .memola-rowctl .memola-cb { visibility: visible; }
#memola-overlay .memola-lv-row.memola-card-sel,
#memola-overlay .memola-gantt-row.memola-card-sel { background: var(--accent-soft); }

/* Gallery view */
#memola-overlay #memola-gallery-view.on {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--s-5);
}
#memola-overlay .memola-gv-card {
  background: var(--paper); border: 1px solid var(--paper-3); border-radius: var(--r-3);
  overflow: hidden; cursor: pointer; transition: box-shadow var(--tr-fast);
}
#memola-overlay .memola-gv-card:hover { box-shadow: var(--sh-panel); }
#memola-overlay .memola-gv-cover {
  height: 100px; background: var(--accent-soft); color: var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-size: 36px; font-weight: 700;
}
#memola-overlay .memola-gv-title { padding: var(--s-3) var(--s-4) var(--s-1); font-size: var(--fs-base); font-weight: 500; }
#memola-overlay .memola-gv-meta { padding: 0 var(--s-4) var(--s-4); }
#memola-overlay .memola-gv-prop { font-size: var(--fs-sm); color: var(--ink); opacity: 0.55; }

/* \u2500\u2500 Backlinks panel (below editor body) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-backlinks {
  margin: 32px 0 24px;
  padding-top: 14px;
  border-top: 1px solid var(--paper-3);
}
#memola-overlay .memola-bl-hd {
  display: flex; align-items: center; gap: 6px;
  font-size: var(--fs-sm); font-weight: 600; color: var(--ink-2);
  margin-bottom: 8px;
}
#memola-overlay .memola-bl-icon { opacity: 0.7; flex-shrink: 0; }
/* \`flex: 0\` is shorthand for \`0 1 0%\` \u2014 flex-basis 0 + grow 0 = the
 *  element collapses to width 0 and the text wraps one character per
 *  line. Use \`flex: 0 0 auto\` so the title sizes to its content and
 *  the count badge sits next to it on the same line. */
#memola-overlay .memola-bl-title { flex: 0 0 auto; white-space: nowrap; }
#memola-overlay .memola-bl-count {
  background: var(--paper-2); color: var(--ink-3);
  padding: 0 6px; border-radius: 8px;
  font-size: 11px; font-weight: 600;
}
#memola-overlay .memola-bl-loading,
#memola-overlay .memola-bl-empty {
  font-size: var(--fs-xs); color: var(--ink-3); padding: 4px 0;
}
#memola-overlay .memola-bl-item {
  padding: 8px 10px; border-radius: var(--r-2);
  cursor: pointer; transition: background var(--tr-fast);
  margin-bottom: 2px;
}
#memola-overlay .memola-bl-item:hover { background: var(--paper-2); }
#memola-overlay .memola-bl-row {
  display: flex; align-items: center; gap: 6px;
  font-size: var(--fs-sm); color: var(--ink);
}
#memola-overlay .memola-bl-item-icon { width: 18px; text-align: center; flex-shrink: 0; }
#memola-overlay .memola-bl-item-name {
  flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
#memola-overlay .memola-bl-badge {
  background: var(--paper-2); color: var(--ink-3);
  padding: 0 6px; border-radius: 8px;
  font-size: 10px; font-weight: 600;
}
#memola-overlay .memola-bl-snippet {
  font-size: var(--fs-xs); color: var(--ink-3);
  margin-top: 2px; padding-left: 24px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

/* Calendar view */
#memola-overlay .memola-cal { width: 100%; max-width: 100%; }
#memola-overlay .memola-cal-head {
  display: flex; align-items: center; gap: 12px;
  padding: var(--s-3) var(--s-4);
  font-size: var(--fs-md); font-weight: 600;
  border-bottom: 1px solid var(--paper-3);
}
#memola-overlay .memola-cal-nav { display: flex; gap: 2px; }
#memola-overlay .memola-cal-nav-btn {
  background: transparent; border: 1px solid transparent;
  padding: 3px 10px; font-size: var(--fs-sm); cursor: pointer;
  border-radius: var(--r-1); color: var(--ink-2);
}
#memola-overlay .memola-cal-nav-btn:hover {
  background: var(--paper-2); border-color: var(--paper-3); color: var(--ink);
}
#memola-overlay .memola-cal-title { flex: 1; text-align: center; font-size: var(--fs-lg); }
#memola-overlay .memola-cal-dfbox {
  display: flex; align-items: center; gap: 6px;
  font-size: var(--fs-xs); color: var(--ink-3); font-weight: normal;
}
#memola-overlay .memola-cal-dfsel {
  font-size: var(--fs-xs); padding: 2px 6px; border-radius: var(--r-1);
  border: 1px solid var(--paper-3); background: var(--paper); color: var(--ink-2);
  outline: none; cursor: pointer;
}
#memola-overlay .memola-cal-dfsingle {
  background: var(--paper-2); padding: 2px 6px; border-radius: var(--r-1);
}
#memola-overlay .memola-cal-grid {
  display: grid; grid-template-columns: repeat(7, 1fr);
  border-top: 1px solid var(--paper-3); border-left: 1px solid var(--paper-3);
}
#memola-overlay .memola-cal-cell {
  border-right: 1px solid var(--paper-3); border-bottom: 1px solid var(--paper-3);
  padding: var(--s-2); min-height: 80px; font-size: var(--fs-sm);
  position: relative;
}
#memola-overlay .memola-cal-blank {
  background: rgba(0, 0, 0, 0.015);
  /* Border classes from .memola-cal-cell apply too \u2014 keeps top-row alignment. */
}
#memola-overlay .memola-cal-dayhead .memola-cal-cell {
  text-align: center; font-weight: 600; color: var(--ink); opacity: 0.6;
  min-height: auto; padding: var(--s-2);
}
#memola-overlay .memola-cal-day.today .memola-cal-num {
  background: var(--accent); color: var(--paper); border-radius: 50%;
  width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center;
}
#memola-overlay .memola-cal-day.memola-cal-day-dropover {
  background: var(--accent-soft);
  outline: 1.5px dashed var(--accent); outline-offset: -2px;
}
#memola-overlay .memola-cal-event {
  background: var(--accent-soft); color: var(--accent);
  font-size: var(--fs-xs); padding: 2px 6px; border-radius: var(--r-1);
  margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  cursor: grab;
}
#memola-overlay .memola-cal-event:active { cursor: grabbing; }
#memola-overlay .memola-cal-event-dragging { opacity: 0.4; }

/* Gantt view */
#memola-overlay .memola-gantt { font-size: var(--fs-sm); }
#memola-overlay .memola-gantt-cfg {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; border-bottom: 1px solid var(--paper-3);
  font-size: var(--fs-sm); color: var(--ink-3);
}
#memola-overlay .memola-gantt-cfg-sel {
  border: 1px solid var(--paper-3); background: var(--paper); color: var(--ink);
  padding: 3px 8px; border-radius: var(--r-1); font-family: inherit; font-size: var(--fs-sm);
  cursor: pointer; outline: none;
}
#memola-overlay .memola-gantt-cfg-sel:hover { border-color: var(--ink-4); }
#memola-overlay .memola-gantt-cfg-sel:focus { border-color: var(--accent); }
#memola-overlay .memola-gantt-header { display: flex; padding-left: 200px; border-bottom: 1px solid var(--paper-3); }
#memola-overlay .memola-gantt-day {
  width: 28px; flex-shrink: 0; padding: var(--s-2) 0;
  text-align: center; font-size: var(--fs-xs); color: var(--ink); opacity: 0.6;
  border-right: 1px solid var(--paper-3);
}
#memola-overlay .memola-gantt-day.weekend { background: var(--paper-2); }
#memola-overlay .memola-gantt-row {
  display: flex; align-items: center; height: 36px;
  border-bottom: 1px solid var(--paper-3);
}
#memola-overlay .memola-gantt-label {
  width: 200px; padding: 0 var(--s-3); flex-shrink: 0;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
#memola-overlay .memola-gantt-track { position: relative; height: 100%; }
#memola-overlay .memola-gantt-bar {
  position: absolute; top: 8px; height: 20px;
  background: var(--accent); border-radius: var(--r-2);
  cursor: pointer;
}

/* \u2500\u2500 Presence indicator (top bar avatars) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-presence {
  display: flex; align-items: center; gap: -4px;
  margin-left: 8px; flex-shrink: 0;
}
#memola-overlay .memola-presence-av {
  width: 22px; height: 22px;
  border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff;
  font-size: 10px; font-weight: 600;
  border: 2px solid var(--paper);
  margin-left: -6px;
  text-transform: uppercase;
  cursor: default;
}
#memola-overlay .memola-presence-av:first-child { margin-left: 0; }
#memola-overlay .memola-presence-more {
  width: 22px; height: 22px;
  border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--paper-3); color: var(--ink-2);
  font-size: 10px; font-weight: 600;
  border: 2px solid var(--paper);
  margin-left: -6px;
}

/* \u2500\u2500 Conflict resolution modal (3-button) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-conflict-md {
  position: fixed; inset: 0; z-index: 2147483648;
  background: rgba(15, 15, 15, 0.45);
  display: none; align-items: center; justify-content: center;
  backdrop-filter: blur(2px);
}
#memola-overlay .memola-conflict-md.on { display: flex; }
#memola-overlay .memola-conflict-box {
  background: var(--paper);
  border-radius: var(--r-3);
  box-shadow: var(--sh-flyout);
  padding: 22px 24px;
  width: 100%; max-width: 520px;
}
#memola-overlay .memola-conflict-title {
  font-size: var(--fs-lg);
  font-weight: 600;
  color: #b13a3a;
  margin-bottom: 4px;
}
#memola-overlay .memola-conflict-page {
  font-size: var(--fs-sm);
  color: var(--ink-3);
  margin-bottom: 14px;
}
#memola-overlay .memola-conflict-msg {
  font-size: var(--fs-md);
  color: var(--ink);
  line-height: 1.6;
  margin-bottom: 18px;
}
#memola-overlay .memola-conflict-btns {
  display: flex; flex-direction: column; gap: 8px;
  margin-bottom: 14px;
}
#memola-overlay .memola-conflict-btns .memola-btn {
  text-align: left; padding: 10px 14px;
  line-height: 1.4;
}
#memola-overlay .memola-conflict-sub {
  font-size: 10px;
  color: var(--ink-3);
  font-weight: normal;
}
#memola-overlay .memola-btn.p .memola-conflict-sub { color: rgba(255,255,255,0.7); }
#memola-overlay .memola-conflict-foot {
  font-size: var(--fs-xs);
  color: var(--ink-3);
  border-top: 1px solid var(--paper-2);
  padding-top: 10px;
}

/* \u2500\u2500 Drafts modal (sidebar entry) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-drafts-md {
  position: fixed; inset: 0; z-index: 2147483647;
  background: rgba(15, 15, 15, 0.45);
  display: none; align-items: center; justify-content: center;
  backdrop-filter: blur(2px);
}
#memola-overlay .memola-drafts-md[style*="flex"],
#memola-overlay .memola-drafts-md.on { display: flex; }
#memola-overlay .memola-drafts-box {
  background: var(--paper);
  border-radius: var(--r-3);
  box-shadow: var(--sh-flyout);
  width: 100%; max-width: 640px;
  max-height: 85vh;
  display: flex; flex-direction: column;
}
#memola-overlay .memola-drafts-hd {
  display: flex; align-items: center; gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--paper-2);
}
#memola-overlay .memola-drafts-title {
  font-size: var(--fs-md);
  font-weight: 600;
  flex: 1;
}
#memola-overlay .memola-drafts-count {
  color: var(--ink-3);
  font-size: var(--fs-xs);
}
#memola-overlay .memola-drafts-close {
  border: none; background: transparent; cursor: pointer;
  font-size: 18px; color: var(--ink-3);
  width: 24px; height: 24px;
}
#memola-overlay .memola-drafts-close:hover { color: var(--ink); }
#memola-overlay .memola-drafts-body {
  overflow-y: auto;
  padding: 14px 18px;
}
#memola-overlay .memola-drafts-empty,
#memola-overlay .memola-drafts-loading {
  text-align: center; padding: 30px 16px;
  color: var(--ink-3);
}
#memola-overlay .memola-drafts-section { margin-bottom: 22px; }
#memola-overlay .memola-drafts-section-hd {
  font-size: var(--fs-sm);
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--paper-2);
  display: flex; align-items: baseline; gap: 8px;
}
#memola-overlay .memola-drafts-section-sub {
  font-size: var(--fs-xs);
  color: var(--ink-3);
  font-weight: normal;
}
#memola-overlay .memola-drafts-spitem {
  background: rgba(196, 127, 28, 0.06);
  border-color: rgba(196, 127, 28, 0.25);
}
#memola-overlay .memola-drafts-group { margin-bottom: 18px; }
#memola-overlay .memola-drafts-grouphead {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--ink-2);
  margin-bottom: 6px;
  display: flex; align-items: center; gap: 6px;
}
#memola-overlay .memola-drafts-orphan {
  font-size: var(--fs-xs);
  color: #b13a3a;
  font-weight: normal;
}
#memola-overlay .memola-drafts-groupcount {
  font-size: var(--fs-xs);
  color: var(--ink-3);
  font-weight: normal;
  margin-left: auto;
}
#memola-overlay .memola-drafts-item {
  border: 1px solid var(--paper-2);
  border-radius: var(--r-2);
  padding: 10px 12px;
  margin-bottom: 6px;
  background: rgba(55, 53, 47, 0.015);
}
#memola-overlay .memola-drafts-itemhd {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 4px;
}
#memola-overlay .memola-drafts-itemtime {
  font-size: 11px; color: var(--ink-3);
  font-family: var(--font-mono);
  flex-shrink: 0;
}
#memola-overlay .memola-drafts-itemtitle {
  font-size: var(--fs-sm); font-weight: 500;
  color: var(--ink);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
#memola-overlay .memola-drafts-itemprev {
  font-size: var(--fs-xs); color: var(--ink-3);
  margin-bottom: 6px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
#memola-overlay .memola-drafts-itemactions {
  display: flex; gap: 6px;
}
#memola-overlay .memola-drafts-itemactions .memola-btn {
  font-size: 11px; padding: 3px 10px;
}
#memola-overlay .memola-drafts-preview {
  padding: 18px; overflow-y: auto; max-height: 60vh;
  font-size: var(--fs-sm);
}
#memola-overlay .memola-drafts-badge-count {
  background: rgba(196, 127, 28, 0.18);
  color: #8a6d28;
  border-radius: 8px;
  padding: 0 6px; margin-left: 4px;
  font-size: 10px; font-weight: 600;
}

/* \u2500\u2500 Sidebar fixed entries (drafts / trash above the page tree) \u2500 */
#memola-overlay .memola-sb-fixed {
  margin: 4px 4px 6px;
  display: flex; flex-direction: column; gap: 1px;
}
#memola-overlay .memola-sb-fx {
  display: flex; align-items: center; gap: 6px;
  padding: 4px 8px; border-radius: var(--r-2);
  font-size: var(--fs-sm); color: var(--ink-2);
  cursor: pointer; user-select: none;
}
#memola-overlay .memola-sb-fx:hover { background: var(--paper-2); color: var(--ink); }
#memola-overlay .memola-sb-fx-ic { width: 18px; text-align: center; }
#memola-overlay .memola-sb-fx-lb { flex: 1; }
#memola-overlay .memola-sb-fx .memola-drafts-badge-count {
  margin-left: 0;
}

/* \u2500\u2500 Version history modal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-versions-md {
  position: fixed; inset: 0; z-index: 2147483647;
  background: rgba(15, 15, 15, 0.45);
  display: none; align-items: center; justify-content: center;
  backdrop-filter: blur(2px);
}
#memola-overlay .memola-versions-md[style*="flex"],
#memola-overlay .memola-versions-md.on { display: flex; }
#memola-overlay .memola-versions-box {
  background: var(--paper);
  border-radius: var(--r-3);
  box-shadow: var(--sh-flyout);
  width: 100%; max-width: 600px;
  max-height: 85vh;
  display: flex; flex-direction: column;
}
#memola-overlay .memola-versions-hd {
  display: flex; align-items: center; gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--paper-2);
}
#memola-overlay .memola-versions-title { flex: 1; font-weight: 600; }
#memola-overlay .memola-versions-close {
  border: none; background: transparent; cursor: pointer;
  font-size: 18px; color: var(--ink-3); width: 24px;
}
#memola-overlay .memola-versions-body {
  overflow-y: auto; padding: 14px 18px;
}
#memola-overlay .memola-versions-loading,
#memola-overlay .memola-versions-empty,
#memola-overlay .memola-versions-error {
  text-align: center; padding: 30px 16px; color: var(--ink-3);
}
#memola-overlay .memola-versions-error { color: #b13a3a; }
#memola-overlay .memola-versions-item {
  border: 1px solid var(--paper-2);
  border-radius: var(--r-2);
  padding: 10px 12px;
  margin-bottom: 6px;
}
#memola-overlay .memola-versions-item.current {
  background: rgba(47, 111, 94, 0.06);
  border-color: rgba(47, 111, 94, 0.24);
}
#memola-overlay .memola-versions-itemhd {
  display: flex; gap: 10px; align-items: center;
  margin-bottom: 4px;
}
#memola-overlay .memola-versions-label {
  font-weight: 600; font-size: var(--fs-sm);
}
#memola-overlay .memola-versions-time {
  font-size: 11px; color: var(--ink-3);
  font-family: var(--font-mono);
}
#memola-overlay .memola-versions-editor {
  font-size: 11px; color: var(--ink-3); margin-left: auto;
}
#memola-overlay .memola-versions-preview {
  font-size: var(--fs-xs); color: var(--ink-3);
  overflow: hidden; text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  margin-bottom: 6px;
}
#memola-overlay .memola-versions-actions {
  display: flex; gap: 6px;
}
#memola-overlay .memola-versions-actions .memola-btn { font-size: 11px; padding: 3px 10px; }
#memola-overlay .memola-versions-fullpreview {
  padding: 18px; overflow-y: auto; max-height: 60vh;
}

/* \u2500\u2500 Draft duplicate banner (above title on draft pages) \u2500\u2500 */
/* \u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u7DE8\u96C6\u4E2D\u30D0\u30CA\u30FC (\u30DA\u30FC\u30B8 / DB \u4E21\u30D3\u30E5\u30FC\u5171\u901A) */
#memola-overlay .memola-template-banner {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; margin-bottom: 16px;
  background: rgba(99, 91, 255, 0.10);
  border: 1px solid rgba(99, 91, 255, 0.30);
  border-radius: var(--r-3);
  font-size: var(--fs-sm);
  color: #4b46b8;
}
#memola-overlay .memola-template-banner-icon { font-size: 16px; flex-shrink: 0; }
#memola-overlay .memola-template-banner-msg { line-height: 1.5; }

#memola-overlay #memola-draft-banner {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; margin-bottom: 16px;
  background: rgba(196, 127, 28, 0.10);
  border: 1px solid rgba(196, 127, 28, 0.30);
  border-radius: var(--r-3);
  font-size: var(--fs-sm);
  color: #8a6d28;
}
#memola-overlay .memola-draft-banner-icon { font-size: 16px; }
#memola-overlay .memola-draft-banner-msg { flex: 1; line-height: 1.5; }
#memola-overlay .memola-draft-banner-link {
  color: #2f6f9e; cursor: pointer; text-decoration: underline;
}
#memola-overlay .memola-draft-banner-apply {
  background: #c47f1c; color: #fff; border: none;
  padding: 6px 14px; border-radius: var(--r-2);
  font-size: var(--fs-sm); font-family: inherit; font-weight: 500;
  cursor: pointer; flex-shrink: 0;
}
#memola-overlay .memola-draft-banner-apply:hover { filter: brightness(1.06); }
#memola-overlay .memola-draft-banner-broken {
  font-size: var(--fs-xs); color: #b13a3a; flex-shrink: 0;
}
#memola-overlay .memola-draft-banner-promote {
  background: #c47f1c; color: #fff; border: none;
  padding: 6px 14px; border-radius: var(--r-2);
  font-size: var(--fs-sm); font-family: inherit; font-weight: 500;
  cursor: pointer; flex-shrink: 0; margin-left: 8px;
}
#memola-overlay .memola-draft-banner-promote:hover { filter: brightness(1.06); }

/* \u2500\u2500 Linked-DB inline embed \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-linkdb {
  margin: 16px 0;
  border: 1px solid var(--paper-3);
  border-radius: var(--r-3);
  background: var(--paper);
  overflow: hidden;
  font-size: var(--fs-sm);
  line-height: 1.5;
}
#memola-overlay .memola-linkdb-loading,
#memola-overlay .memola-linkdb-broken,
#memola-overlay .memola-linkdb-error {
  padding: 14px 16px;
  font-size: var(--fs-sm);
  color: var(--ink-3);
}
#memola-overlay .memola-linkdb-broken,
#memola-overlay .memola-linkdb-error {
  color: #b13a3a;
  background: rgba(177, 58, 58, 0.04);
  border-left: 3px solid rgba(177, 58, 58, 0.4);
}
#memola-overlay .memola-linkdb-header {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--paper-3);
  background: rgba(55, 53, 47, 0.025);
}
#memola-overlay .memola-linkdb-icon {
  font-size: 14px;
  flex-shrink: 0;
}
#memola-overlay .memola-linkdb-name {
  font-weight: 600;
  color: var(--ink);
  flex-shrink: 0;
}
#memola-overlay .memola-linkdb-count {
  color: var(--ink-3);
  font-size: var(--fs-xs);
  flex: 1;
}
#memola-overlay .memola-linkdb-open {
  border: 1px solid var(--paper-3);
  background: var(--paper);
  color: var(--ink-2);
  border-radius: var(--r-2);
  padding: 3px 9px;
  font-size: var(--fs-xs);
  font-family: inherit;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.12s, color 0.12s;
}
#memola-overlay .memola-linkdb-open:hover {
  background: rgba(55, 53, 47, 0.06);
  color: var(--ink);
}
/* Filter button \u2014 same shape as \u2197 open button */
#memola-overlay .memola-linkdb-filter {
  border: 1px solid var(--paper-3);
  background: var(--paper);
  color: var(--ink-2);
  border-radius: var(--r-2);
  padding: 3px 9px;
  font-size: var(--fs-xs);
  font-family: inherit;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.12s, color 0.12s;
}
#memola-overlay .memola-linkdb-filter:hover {
  background: rgba(55, 53, 47, 0.06);
  color: var(--ink);
}
/* Filter chip strip below the header \u2014 read-only summary of active filters */
#memola-overlay .memola-linkdb-filterchips {
  display: flex; flex-wrap: wrap; gap: 4px;
  padding: 6px 10px; background: var(--paper-2);
  border-bottom: 1px solid var(--paper-3);
}
#memola-overlay .memola-linkdb-chip {
  background: var(--paper); color: var(--ink-2);
  padding: 2px 8px; border-radius: var(--r-2);
  border: 1px solid var(--paper-3);
  font-size: 11px; cursor: pointer;
}
#memola-overlay .memola-linkdb-chip:hover {
  background: var(--accent-soft); color: var(--accent);
  border-color: var(--accent);
}
/* Filter editor popover */
#memola-overlay .memola-linkdb-fpop {
  background: var(--paper); border-radius: var(--r-3);
  border: 1px solid var(--paper-3);
  box-shadow: var(--sh-flyout);
  z-index: 2147483646;
  font-family: var(--font-ui); color: var(--ink);
  display: flex; flex-direction: column;
  max-height: 60vh;
}
#memola-overlay .memola-linkdb-fhd {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 14px; border-bottom: 1px solid var(--paper-3);
  font-size: var(--fs-sm); font-weight: 600;
}
#memola-overlay .memola-linkdb-fhd > span:first-child { flex: 1; }
#memola-overlay .memola-linkdb-fclose {
  background: transparent; border: none; cursor: pointer;
  font-size: 18px; color: var(--ink-3); line-height: 1;
  padding: 0 4px;
}
#memola-overlay .memola-linkdb-fclose:hover { color: var(--ink); }
#memola-overlay .memola-linkdb-fbody {
  padding: 8px 12px; overflow-y: auto;
}
#memola-overlay .memola-linkdb-fempty {
  padding: 12px 4px; color: var(--ink-3); font-size: var(--fs-sm);
  text-align: center;
}
#memola-overlay .memola-linkdb-frow {
  display: flex; align-items: center; gap: 4px;
  margin-bottom: 6px;
}
#memola-overlay .memola-linkdb-frow select,
#memola-overlay .memola-linkdb-frow input[type="text"] {
  font-size: var(--fs-xs); padding: 3px 6px;
  border: 1px solid var(--paper-3); border-radius: var(--r-1);
  background: var(--paper); color: var(--ink);
  font-family: inherit; outline: none;
}
#memola-overlay .memola-linkdb-frow select { min-width: 0; }
#memola-overlay .memola-linkdb-ffield { flex: 2; }
#memola-overlay .memola-linkdb-fop { flex: 1; }
#memola-overlay .memola-linkdb-fval { flex: 2; }
#memola-overlay .memola-linkdb-fval-na {
  flex: 2; color: var(--ink-3); text-align: center; font-size: 11px;
}
#memola-overlay .memola-linkdb-frm {
  background: transparent; border: none; cursor: pointer;
  width: 22px; height: 22px;
  color: var(--ink-3); font-size: 14px;
  border-radius: var(--r-1);
}
#memola-overlay .memola-linkdb-frm:hover {
  background: rgba(231, 67, 67, 0.12); color: #b13a3a;
}
#memola-overlay .memola-linkdb-fft {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 14px; border-top: 1px solid var(--paper-3);
}
#memola-overlay .memola-linkdb-fadd,
#memola-overlay .memola-linkdb-fclear,
#memola-overlay .memola-linkdb-fapply {
  border: 1px solid var(--paper-3); background: var(--paper);
  color: var(--ink-2); padding: 4px 12px;
  border-radius: var(--r-2); font-size: var(--fs-xs);
  font-family: inherit; cursor: pointer;
}
#memola-overlay .memola-linkdb-fadd:hover { background: var(--paper-2); }
#memola-overlay .memola-linkdb-fclear:hover {
  background: rgba(231, 67, 67, 0.12); border-color: #d96666; color: #b13a3a;
}
#memola-overlay .memola-linkdb-fapply {
  background: var(--accent); border-color: var(--accent); color: var(--paper);
}
#memola-overlay .memola-linkdb-fapply:hover { opacity: 0.85; }
#memola-overlay .memola-linkdb-tablewrap {
  max-height: 420px;
  overflow: auto;
}
#memola-overlay .memola-linkdb-table {
  width: 100%;
  border-collapse: collapse;
}
#memola-overlay .memola-linkdb-table th,
#memola-overlay .memola-linkdb-table td {
  text-align: left;
  padding: 6px 12px;
  border-bottom: 1px solid var(--paper-2);
  vertical-align: top;
  font-size: var(--fs-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 280px;
}
#memola-overlay .memola-linkdb-table th {
  font-weight: 500;
  color: var(--ink-3);
  background: rgba(55, 53, 47, 0.02);
  font-size: var(--fs-xs);
  text-transform: none;
  letter-spacing: 0.02em;
  position: sticky; top: 0; z-index: 1;
}
#memola-overlay .memola-linkdb-table tr:last-child td {
  border-bottom: none;
}
#memola-overlay .memola-linkdb-table tr:hover td {
  background: rgba(55, 53, 47, 0.03);
}
#memola-overlay .memola-linkdb-title-cell {
  cursor: pointer;
  color: var(--ink);
  font-weight: 500;
}
#memola-overlay .memola-linkdb-title-cell:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-color: rgba(55, 53, 47, 0.4);
}

/* \u2500\u2500 Inline table block (Notion-like) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-itbl-wrap {
  position: relative; margin: 10px 0;
  /* + \u884C(\u4E0B) \u3068 + \u5217(\u53F3) \u30DC\u30BF\u30F3\u306E\u4F4D\u7F6E\u3092\u78BA\u4FDD */
  padding: 0 24px 24px 0;
  display: inline-block; max-width: 100%;
}
#memola-overlay .memola-itbl {
  border-collapse: collapse;
  font-size: var(--fs-md); color: var(--ink);
  background: var(--paper);
  /* \u5916\u5468\u306F cell \u306E border 1px \u306B\u4F9D\u5B58\u3057\u3001\u3053\u3053\u3067\u306F\u8A2D\u5B9A\u3057\u306A\u3044 (border-collapse \u885D\u7A81\u56DE\u907F) */
}
#memola-overlay .memola-itbl th,
#memola-overlay .memola-itbl td {
  border: 1px solid var(--paper-3);
  padding: 6px 10px;
  vertical-align: top; min-width: 80px; max-width: 320px;
  outline: none; line-height: 1.5;
  position: relative;
}
#memola-overlay .memola-itbl th {
  background: var(--paper-2);
  font-weight: 500; color: var(--ink);
  text-align: left;
}
#memola-overlay .memola-itbl td:focus,
#memola-overlay .memola-itbl th:focus {
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1.5px var(--accent);
}
/* \u30BB\u30EB\u7BC4\u56F2\u9078\u629E\u30CF\u30A4\u30E9\u30A4\u30C8 (legacy: \u5916\u5468 accent border \u3092 JS \u304C inline box-shadow \u3067\u4ED8\u4E0E) */
#memola-overlay .memola-itbl td.memola-itbl-selected,
#memola-overlay .memola-itbl th.memola-itbl-selected {
  background: var(--accent-soft);
}
/* editor2 controlled-rendering \u7248: state.selection.kind = 'table-cells'
   \u306E\u3068\u304D\u306B \`applySelection\` \u304C\u7BC4\u56F2\u5185\u306E\u30BB\u30EB\u3078 class \u4ED8\u4E0E */
#memola-overlay .memola-itbl td.memola-itbl-selcel,
#memola-overlay .memola-itbl th.memola-itbl-selcel {
  background: var(--accent-soft);
  /* \u7BC4\u56F2\u5185\u5168\u30BB\u30EB\u306B\u8584\u3044 inset border \u3092\u5165\u308C\u3066 Notion \u98A8\u306E\u5857\u308A\u3064\u3076\u3057\u7BC4\u56F2\u611F\u3092\u51FA\u3059 */
  box-shadow: inset 0 0 0 1px var(--accent);
}
/* \u5358\u4E00 focus \u6642\u306E\u30D5\u30EB\u30BB\u30EB accent inset \u3068\u3001\u8907\u6570\u9078\u629E\u6642\u306E\u5916\u5468 inline box-shadow \u304C
   \u4E21\u7ACB\u3067\u304D\u308B\u3088\u3046\u306B\u3001selected \u306B\u306F CSS \u5074\u3067 box-shadow \u3092\u5F37\u5236\u3057\u306A\u3044 */

/* \u2500\u2500 \u884C\u898B\u51FA\u3057 / \u5217\u898B\u51FA\u3057 (\u8272\u9055\u3044\u30BB\u30EB) \u2500\u2500 */
#memola-overlay .memola-itbl[data-hrow="1"] tr:first-child > td,
#memola-overlay .memola-itbl[data-hrow="1"] tr:first-child > th,
#memola-overlay .memola-itbl[data-hcol="1"] tr > td:first-child,
#memola-overlay .memola-itbl[data-hcol="1"] tr > th:first-child,
#memola-overlay .memola-itbl thead th {
  background: var(--paper-2-strong);
  font-weight: 500;
  color: var(--ink);
}
/* + \u884C (\u4E0B) / + \u5217 (\u53F3) \u30DC\u30BF\u30F3 \u2014 Notion \u914D\u7F6E */
#memola-overlay .memola-itbl-addrow,
#memola-overlay .memola-itbl-addcol {
  position: absolute; border: 1px dashed var(--paper-3);
  background: var(--paper); color: var(--ink-4);
  cursor: pointer; font-family: inherit;
  display: flex; align-items: center; justify-content: center;
  padding: 0; line-height: 1; font-size: 13px;
  border-radius: var(--r-1);
  opacity: 0; transition: opacity var(--tr-fast), color var(--tr-fast), border-color var(--tr-fast), background var(--tr-fast);
}
#memola-overlay .memola-itbl-wrap:hover .memola-itbl-addrow,
#memola-overlay .memola-itbl-wrap:hover .memola-itbl-addcol { opacity: 0.7; }
#memola-overlay .memola-itbl-addrow:hover,
#memola-overlay .memola-itbl-addcol:hover {
  color: var(--accent-strong); border-color: var(--accent); border-style: solid;
  opacity: 1; background: var(--accent-soft);
}
/* \u884C\u8FFD\u52A0 = \u8868\u306E\u4E0B\u306B\u6A2A\u9577 (table\u5E45\u306B\u8FFD\u5F93) */
#memola-overlay .memola-itbl-addrow {
  left: 0; right: 24px;
  bottom: 0; height: 18px;
}
/* \u5217\u8FFD\u52A0 = \u8868\u306E\u53F3\u5074\u306B\u7E26\u9577 (table\u9AD8\u3055\u306B\u8FFD\u5F93) */
#memola-overlay .memola-itbl-addcol {
  top: 0; right: 0; width: 18px;
  bottom: 24px;
}
/* \u30BB\u30EB\u53F3\u30AF\u30EA\u30C3\u30AF\u30E1\u30CB\u30E5\u30FC */
#memola-overlay .memola-itbl-menu {
  position: fixed; z-index: 2147483647;
  background: var(--paper); border: 1px solid var(--paper-3);
  border-radius: var(--r-3); box-shadow: var(--sh-flyout);
  min-width: 180px; padding: 4px;
  font-family: var(--font-ui); font-size: var(--fs-sm);
}
#memola-overlay .memola-itbl-menu-item {
  padding: 6px 12px; border-radius: var(--r-2);
  cursor: pointer; color: var(--ink); white-space: nowrap;
}
#memola-overlay .memola-itbl-menu-item:hover { background: var(--paper-2-strong); }
#memola-overlay .memola-itbl-menu-item.danger { color: var(--danger); }
#memola-overlay .memola-itbl-menu-item.danger:hover { background: rgba(184,83,74,0.1); }
#memola-overlay .memola-itbl-menu-sep {
  height: 1px; background: var(--paper-3);
  margin: 4px 6px;
}

/* \u2500\u2500 Inline images \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-ed .memola-img {
  max-width: 100%; height: auto; border-radius: var(--r-2);
  margin: 0; display: block;
}
/* Image wrapper + corner-drag resize handle (Notion-style). */
#memola-overlay #memola-ed .memola-img-wrap {
  position: relative; display: inline-block; max-width: 100%;
  margin: var(--s-3) 0; line-height: 0;
}
#memola-overlay #memola-ed .memola-img-resize {
  position: absolute; right: 0; bottom: 0; width: 14px; height: 14px;
  cursor: nwse-resize; border-radius: 0 0 var(--r-2) 0;
  background:
    linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.45) 50%);
  opacity: 0; transition: opacity 0.12s;
}
#memola-overlay #memola-ed .memola-img-wrap:hover .memola-img-resize { opacity: 1; }

/* \u2500\u2500 \u30E1\u30FC\u30EB\u53C2\u7167\u30C1\u30C3\u30D7(.eml/.msg \u30C9\u30ED\u30C3\u30D7) \u2500\u2500 */
#memola-overlay .memola-email-chip {
  display: flex; align-items: center; gap: 10px;
  margin: var(--s-3) 0; padding: 8px 12px; line-height: 1.4;
  border: 1px solid var(--border, #e3e3e0); border-radius: 8px;
  background: var(--paper-2, #faf9f7); max-width: 560px;
}
#memola-overlay .memola-email-ic { flex: 0 0 auto; font-size: 18px; }
#memola-overlay .memola-email-body { flex: 1 1 auto; min-width: 0; }
#memola-overlay .memola-email-subj {
  font-weight: 600; color: var(--ink, #2a2a26);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
#memola-overlay .memola-email-meta {
  font-size: 12px; color: var(--ink-3, #7a766c);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
#memola-overlay .memola-email-src {
  flex: 0 0 auto; border: 1px solid var(--border, #d8d6cf); border-radius: 6px;
  background: #fff; color: var(--ink, #2a2a26); cursor: pointer;
  font: inherit; font-size: 12px; font-weight: 600; padding: 4px 10px;
}
#memola-overlay .memola-email-src:hover:not(:disabled) { background: var(--accent, #7a8a78); color: #fff; border-color: var(--accent, #7a8a78); }
#memola-overlay .memola-email-src:disabled { opacity: .5; cursor: default; }

/* \u2500\u2500 Mobile / narrow viewport \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@media (max-width: 768px) {
  #memola-overlay #memola-sb { width: 200px; position: absolute; height: 100%; z-index: 100; box-shadow: var(--sh-flyout); }
  #memola-overlay #memola-sb.collapsed { display: none; }
  #memola-overlay #memola-main { width: 100%; }
  #memola-overlay #memola-ai-panel,
  #memola-overlay #memola-outline,
  #memola-overlay #memola-props {
    position: absolute; right: 0; top: var(--topbar-h); bottom: 0;
    width: 280px; z-index: 100; box-shadow: var(--sh-flyout);
  }
  #memola-overlay #memola-dv-inner { padding: 24px 16px 0; }
  #memola-overlay #memola-ei { padding: 24px 16px 50vh; max-width: 100%; }
}
@media (max-width: 480px) {
  #memola-overlay #memola-tb { overflow-x: auto; flex-wrap: nowrap; }
  #memola-overlay .memola-pgm-item, #memola-overlay .memola-mb { font-size: var(--fs-base); }
  #memola-overlay .memola-mb { padding: 18px 18px 14px; }
  #memola-overlay #memola-ttl { font-size: 28px; }
}

/* \u2500\u2500 Density & theme \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay[data-density="compact"] #memola-ed > * { margin-top: 3px; margin-bottom: 3px; }
#memola-overlay[data-density="comfy"] #memola-ed > * { margin-top: 10px; margin-bottom: 10px; }
#memola-overlay[data-theme="dark"] {
  --ink: #e8e4d8; --ink-3: #a8a39a; --ink-4: #7a766c;
  --paper: #1d1b18; --paper-2: #25231f; --paper-2-strong: #2c2a25; --paper-3: #3a3731;
  --line: rgba(232, 228, 216, 0.12); --line-strong: rgba(232, 228, 216, 0.18);
  --code-bg: rgba(232, 228, 216, 0.10);
}

/* \u2500\u2500 Settings modal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-settings-md {
  position: fixed; inset: 0; background: rgba(15, 15, 15, .35);
  display: none; align-items: center; justify-content: center;
  z-index: 2147483647; padding: var(--s-9); backdrop-filter: blur(2px);
}
#memola-overlay #memola-settings-md.on { display: flex; }
#memola-overlay .memola-set-row {
  display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;
}
#memola-overlay .memola-set-row label {
  font-size: var(--fs-xs); color: var(--ink-3); font-weight: 500;
}
#memola-overlay .memola-set-row input,
#memola-overlay .memola-set-row select {
  padding: 6px 10px; height: 32px;
  border: 1px solid var(--paper-3); border-radius: var(--r-2);
  font-size: var(--fs-sm); font-family: inherit; outline: none;
  background: var(--paper); color: var(--ink);
}
#memola-overlay .memola-set-row input:focus,
#memola-overlay .memola-set-row select:focus {
  border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent-soft);
}
#memola-overlay .memola-set-section {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--ink-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 14px 0 6px;
  border-top: 1px solid var(--paper-3);
  padding-top: 10px;
}
#memola-overlay .memola-set-section:first-of-type {
  border-top: none; padding-top: 0; margin-top: 0;
}
#memola-overlay .memola-set-hint {
  font-size: var(--fs-xs);
  color: var(--ink-3);
  background: rgba(196, 127, 28, 0.08);
  border-left: 2px solid rgba(196, 127, 28, 0.5);
  padding: 6px 8px;
  border-radius: 3px;
  line-height: 1.5;
}

/* \u2500\u2500 Settings modal: \u56FA\u5B9A\u30B5\u30A4\u30BA + \u30E6\u30FC\u30B6\u30FC\u304C\u7AEF\u30C9\u30E9\u30C3\u30B0\u3067\u30EA\u30B5\u30A4\u30BA (別アプリ \u540C\u69D8) \u2500\u2500
   \u9805\u76EE\u3054\u3068\u306B\u5927\u304D\u3055\u304C\u5909\u308F\u3089\u306A\u3044\u3088\u3046 width/height \u3092\u56FA\u5B9A\u3002\u4E2D\u8EAB\u306F\u5185\u90E8\u30B9\u30AF\u30ED\u30FC\u30EB\u3002
   resize:both \u3067\u53F3\u4E0B\u304B\u3089\u30C9\u30E9\u30C3\u30B0\u3057\u3066\u30B5\u30A4\u30BA\u5909\u66F4\u53EF\u80FD\u3002 */
#memola-overlay .memola-set-mb {
  width: 860px !important; height: 620px !important;
  max-width: 94vw; max-height: 90vh;
  min-width: 560px; min-height: 380px;
  display: flex; flex-direction: column;
  resize: both; overflow: hidden;
}
#memola-overlay .memola-set-mb h2 { margin-bottom: 14px; flex: 0 0 auto; }
#memola-overlay .memola-set-mb .memola-ma { flex: 0 0 auto; }
#memola-overlay .memola-set-body {
  display: flex; gap: 16px; min-height: 0; flex: 1 1 auto; overflow: hidden;
}
#memola-overlay .memola-set-nav {
  flex: 0 0 210px;
  display: flex; flex-direction: column; gap: 2px;
  border-right: 1px solid var(--paper-3); padding-right: 10px;
  overflow-y: auto;
}
/* 別アプリ \u6D41: \u5927\u5206\u985E\u3054\u3068\u306B\u5DE6\u30A2\u30AF\u30BB\u30F3\u30C8\u5E2F + \u898B\u51FA\u3057 + \u30B5\u30D6\u30BF\u30A4\u30C8\u30EB */
#memola-overlay .memola-set-major {
  border-left: 4px solid var(--accent, #7a8a78);
  margin: 6px 0 12px; padding: 0 0 0 0;
}
#memola-overlay .memola-set-major[data-major="shared"] { border-left-color: #5b8aa6; }
#memola-overlay .memola-set-major[data-major="other"]  { border-left-color: #b08a4f; }
#memola-overlay .memola-set-major-h {
  padding: 4px 10px 2px; font-size: var(--fs-sm); font-weight: 700;
  color: var(--accent, #7a8a78); letter-spacing: .03em;
}
#memola-overlay .memola-set-major[data-major="shared"] .memola-set-major-h { color: #5b8aa6; }
#memola-overlay .memola-set-major[data-major="other"]  .memola-set-major-h { color: #b08a4f; }
#memola-overlay .memola-set-major-sub {
  padding: 0 10px 6px; font-size: 11px; color: var(--ink-3); line-height: 1.5;
}
#memola-overlay .memola-set-tab {
  width: 100%; text-align: left; padding: 6px 10px 6px 12px; border: none; background: transparent;
  color: var(--ink-2); cursor: pointer;
  border-left: 3px solid transparent;
  font: inherit; font-size: var(--fs-sm);
  transition: background .12s, color .12s;
  display: flex; align-items: center; gap: 6px; white-space: nowrap;
}
#memola-overlay .memola-set-tab:hover { background: var(--paper-2); color: var(--ink); }
#memola-overlay .memola-set-tab.on {
  background: var(--accent-soft, rgba(124, 149, 119, 0.18));
  border-left-color: var(--accent, #7a8a78);
  color: var(--ink); font-weight: 600;
}
#memola-overlay .memola-set-tab.danger { color: var(--danger, #b8534a); }
#memola-overlay .memola-set-panes {
  flex: 1; min-width: 0; overflow-y: auto; padding-right: 4px;
}
#memola-overlay .memola-set-pane { display: none; }
#memola-overlay .memola-set-pane.on { display: block; }
/* In the tabbed layout, every pane starts cleanly \u2014 drop the
   uppercase-section header styling that the old flat layout used,
   since the tab itself is the section title now. */
#memola-overlay .memola-set-pane .memola-set-section { display: none; }
@media (max-width: 640px) {
  #memola-overlay .memola-set-body { flex-direction: column; }
  #memola-overlay .memola-set-nav {
    flex: 0 0 auto; flex-direction: row; flex-wrap: wrap;
    border-right: none; border-bottom: 1px solid var(--paper-3);
    padding-right: 0; padding-bottom: 8px;
  }
  #memola-overlay .memola-set-tab { padding: 5px 9px; }
}

/* \u2500\u2500 AI provider/model badge in panel header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-ai-provider-badge {
  font-size: 10px;
  font-weight: 500;
  padding: 2px 8px;
  margin-left: 6px;
  border: 1px solid rgba(55, 53, 47, 0.16);
  border-radius: 10px;
  background: rgba(55, 53, 47, 0.04);
  color: var(--ink-2);
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}
#memola-overlay .memola-ai-provider-badge[data-provider="corp"] {
  background: rgba(47, 111, 158, 0.10);
  border-color: rgba(47, 111, 158, 0.28);
  color: #2f6f9e;
}

/* \u2500\u2500 Trash modal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-trash-md {
  position: fixed; inset: 0; background: rgba(15, 15, 15, .35);
  display: none; align-items: center; justify-content: center;
  z-index: 2147483647; padding: var(--s-9);
  backdrop-filter: blur(2px);
}
#memola-overlay #memola-trash-md.on { display: flex; }
#memola-overlay #memola-trash-list {
  max-height: 50vh; overflow-y: auto; margin: var(--s-3) 0;
  border: 1px solid var(--paper-3); border-radius: var(--r-2);
}
#memola-overlay .memola-trash-empty { padding: var(--s-7); text-align: center; color: var(--ink); opacity: 0.4; font-size: var(--fs-md); }
#memola-overlay .memola-trash-row {
  display: flex; align-items: center; gap: var(--s-2);
  padding: var(--s-2) var(--s-4); border-bottom: 1px solid var(--paper-3);
}
#memola-overlay .memola-trash-row:last-child { border-bottom: none; }
#memola-overlay .memola-trash-info { flex: 1; min-width: 0; }
#memola-overlay .memola-trash-title { font-size: var(--fs-base); color: var(--ink); }
#memola-overlay .memola-trash-meta { font-size: var(--fs-xs); color: var(--ink); opacity: 0.5; }
#memola-overlay .memola-trash-btn {
  background: transparent; border: none; cursor: pointer;
  width: 28px; height: 28px; border-radius: var(--r-2);
  font-size: 16px; opacity: 0.6;
}
#memola-overlay .memola-trash-btn:hover { background: var(--paper-2-strong); opacity: 1; }
#memola-overlay .memola-trash-purge:hover { background: rgba(235,87,87,.1); }

/* \u2500\u2500 Inline AI block (within editor) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-ai-block {
  border: 1px solid var(--accent); border-radius: var(--r-3);
  background: var(--accent-soft); padding: var(--s-4) var(--s-5);
  margin: var(--s-3) 0;
  font-family: var(--font-ui); user-select: none;
}
#memola-overlay .memola-aib-head {
  display: flex; align-items: center; gap: var(--s-2);
  margin-bottom: var(--s-2);
}
#memola-overlay .memola-aib-title { font-size: var(--fs-md); font-weight: 600; color: var(--accent); }
#memola-overlay .memola-aib-hint { font-size: var(--fs-xs); color: var(--ink); opacity: 0.5; margin-left: auto; }
#memola-overlay .memola-aib-regen {
  margin-left: auto; background: transparent; border: none; cursor: pointer;
  color: var(--ink); opacity: 0.4; font-size: 14px;
}
#memola-overlay .memola-aib-regen:hover { opacity: 1; }
#memola-overlay .memola-aib-actions { display: flex; gap: var(--s-2); flex-wrap: wrap; }
#memola-overlay .memola-aib-action {
  background: var(--paper); border: 1px solid var(--line);
  padding: 4px 12px; border-radius: 14px; cursor: pointer;
  font-size: var(--fs-sm); font-family: inherit; color: var(--ink);
}
#memola-overlay .memola-aib-action:hover { background: var(--paper-2); border-color: var(--accent); }
#memola-overlay .memola-aib-cancel { padding: 4px 8px; opacity: 0.5; }
#memola-overlay .memola-aib-body {
  font-size: var(--fs-base); color: var(--ink); line-height: 1.6;
  background: var(--paper); padding: var(--s-3) var(--s-4); border-radius: var(--r-2);
  margin: var(--s-2) 0; white-space: pre-wrap; user-select: text;
}
#memola-overlay .memola-aib-loading { font-style: italic; opacity: 0.55; }
#memola-overlay .memola-aib-error { color: var(--danger); }
#memola-overlay .memola-aib-foot { display: flex; gap: var(--s-2); margin-top: var(--s-2); }
#memola-overlay .memola-aib-btn {
  background: transparent; border: 1px solid var(--line);
  padding: 4px 12px; border-radius: var(--r-2); cursor: pointer;
  font-size: var(--fs-sm); font-family: inherit; color: var(--ink);
}
#memola-overlay .memola-aib-btn:hover { background: var(--paper-2); }
#memola-overlay .memola-aib-adopt { background: var(--accent); color: var(--paper); border-color: var(--accent); }
#memola-overlay .memola-aib-adopt:hover { background: var(--accent-strong); }
#memola-overlay .memola-aib-discard { color: var(--danger); border-color: var(--danger); }

/* \u2500\u2500 Sync watch banner (remote update notification) \u2500\u2500\u2500\u2500 */
#memola-overlay #memola-sync-banner {
  position: fixed; top: var(--s-5); left: 50%; transform: translateX(-50%);
  background: var(--ink); color: var(--paper);
  padding: var(--s-3) var(--s-6); border-radius: var(--r-3);
  display: flex; align-items: center; gap: var(--s-5);
  font-size: var(--fs-md); box-shadow: var(--sh-flyout);
  z-index: 2147483647; max-width: 90%;
  animation: memola-banner-in .2s ease-out;
}
#memola-overlay #memola-sync-banner button {
  background: transparent; border: 1px solid rgba(255,255,255,0.3);
  color: var(--paper); padding: 4px 10px; border-radius: var(--r-2);
  font-size: var(--fs-sm); cursor: pointer; font-family: inherit;
}
#memola-overlay #memola-sync-banner button:hover { background: rgba(255,255,255,0.1); }
#memola-overlay #memola-sync-banner #memola-sync-reload {
  background: var(--accent); border-color: var(--accent);
}
#memola-overlay #memola-sync-banner #memola-sync-reload:hover { background: var(--accent-strong); }
@keyframes memola-banner-in {
  from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
/* The sync banner now hosts 3 buttons (\u4ECA\u3059\u3050\u53CD\u6620 / \u5F8C\u3067 / \u30BF\u30D6\u3092\u96E2\u308C\u308B\u307E\u3067\u975E\u8868\u793A)
   so allow a wider max-width and let buttons wrap on narrow viewports. */
#memola-overlay #memola-sync-banner { flex-wrap: wrap; }
#memola-overlay #memola-sync-banner #memola-sync-mute { font-size: var(--fs-xs); }

/* \u2500\u2500 Since-last-view passive notification \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-since-banner {
  position: fixed; top: 12px; left: 50%; transform: translate(-50%, -8px);
  display: flex; align-items: center; gap: 8px;
  padding: 6px 10px 6px 12px;
  background: var(--paper); color: var(--ink);
  border: 1px solid var(--paper-3);
  border-left: 3px solid var(--accent);
  border-radius: var(--r-3);
  box-shadow: var(--sh-flyout);
  font-size: var(--fs-sm);
  z-index: 2147483646;
  max-width: 80%;
  opacity: 0;
  transition: opacity 0.18s ease, transform 0.18s ease;
}
#memola-overlay #memola-since-banner.on {
  opacity: 1; transform: translate(-50%, 0);
}
#memola-overlay #memola-since-banner .memola-since-ic { font-size: 14px; }
#memola-overlay #memola-since-banner .memola-since-msg { line-height: 1.3; }
#memola-overlay #memola-since-banner .memola-since-close {
  background: transparent; border: none; cursor: pointer;
  padding: 2px 6px; font-size: 14px; color: var(--ink-3);
  border-radius: 3px;
}
#memola-overlay #memola-since-banner .memola-since-close:hover {
  background: var(--paper-2); color: var(--ink);
}

/* \u2500\u2500 Topbar toggle chips (\u2630 \u76EE\u6B21 / \u25A4 \u30D7\u30ED\u30D1\u30C6\u30A3 / \u2726 AI) \u2500\u2500 */
#memola-overlay .memola-tog-btn {
  border: none; background: transparent; cursor: pointer;
  color: var(--ink-3); padding: 5px 12px; border-radius: var(--r-2);
  display: inline-flex; align-items: center; gap: 6px;
  font-family: inherit; font-size: var(--fs-sm); height: 28px;
  flex-shrink: 0; transition: background var(--tr-fast), color var(--tr-fast);
}
#memola-overlay .memola-tog-btn:hover { background: var(--paper-2-strong); color: var(--ink); }
#memola-overlay .memola-tog-btn.on {
  background: var(--accent-soft); color: var(--accent-strong);
}
#memola-overlay .memola-tog-btn svg { width: 13px; height: 13px; flex-shrink: 0; }
#memola-overlay .memola-tog-btn span { white-space: nowrap; }
@media (max-width: 768px) {
  #memola-overlay .memola-tog-btn span { display: none; }
}

/* \u2500\u2500 Outline panel inline child of #memola-content-row \u2500\u2500\u2500\u2500 */
#memola-overlay #memola-outline-btn {
  /* uses .memola-tog-btn */
}
#memola-overlay #memola-outline {
  width: 240px; flex-shrink: 0;
  background: var(--paper-2); border-right: 1px solid var(--paper-3); border-right-width: 0;
  display: flex; flex-direction: column;
  padding: 18px 18px;
  font-family: var(--font-ui); overflow: hidden;
  /* Collapsed by default; slides open from the edge. We gate on max-width
   * (not width) so the user's resized inline width still wins when open. */
  max-width: 0; opacity: 0;
  transition: max-width 0.22s ease, opacity 0.22s ease, border-width 0.22s ease;
}
#memola-overlay #memola-outline.on { max-width: 600px; opacity: 1; border-right-width: 1px; }
#memola-overlay #memola-outline-hd {
  font-size: var(--fs-xs); font-weight: 500;
  color: var(--ink-3);
  margin-bottom: var(--s-3);
  display: flex; align-items: center;
}
#memola-overlay #memola-outline-hd > span:first-child { flex: 1; }
/* Pane close \xD7 \u2014 unified design across sidebar / outline / properties / AI.
 * Matches the AI panel header buttons (transparent, opacity 0.5 \u2192 1 on hover). */
#memola-overlay .memola-pane-x {
  border: none; background: transparent; cursor: pointer;
  color: var(--ink); padding: 4px; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  opacity: 0.5; line-height: 0;
  transition: opacity var(--tr-fast), background var(--tr-fast);
}
#memola-overlay .memola-pane-x:hover { background: rgba(55, 53, 47, 0.08); opacity: 1; }
#memola-overlay .memola-pane-x svg { width: 14px; height: 14px; display: block; }
#memola-overlay #memola-outline-list { overflow-y: auto; flex: 1; }
#memola-overlay .memola-outline-item {
  font-size: var(--fs-md); color: var(--ink);
  padding: var(--s-1) var(--s-2) var(--s-1) calc(var(--s-2) + 6px);
  border-radius: var(--r-2);
  cursor: pointer; opacity: 0.7;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  line-height: 1.5;
  border-left: 2px solid transparent;
}
#memola-overlay .memola-outline-item.active {
  border-left-color: var(--accent); opacity: 1;
}
#memola-overlay .memola-outline-item:hover { background: var(--paper-2); opacity: 1; }
#memola-overlay .memola-outline-h1 { padding-left: var(--s-2); font-weight: 500; }
#memola-overlay .memola-outline-h2 { padding-left: var(--s-5); }
#memola-overlay .memola-outline-h3 { padding-left: var(--s-8); font-size: var(--fs-sm); }
#memola-overlay .memola-outline-empty { color: var(--ink); opacity: 0.4; font-size: var(--fs-md); padding: var(--s-2); }

/* \u2500\u2500 Workspace switcher \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-ws-btn {
  display: flex; align-items: center; gap: var(--s-2);
  border: none; background: transparent; cursor: pointer;
  font-family: inherit; font-size: var(--fs-md); font-weight: 600; color: var(--ink);
  padding: var(--s-1) var(--s-2); border-radius: var(--r-2); flex: 1;
  text-align: left; min-width: 0;
}
#memola-overlay #memola-ws-btn:hover { background: var(--paper-2-strong); }
#memola-overlay #memola-ws-name {
  flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
#memola-overlay .memola-ws-menu {
  background: var(--paper); border-radius: var(--r-3);
  width: 280px; padding: var(--s-1) 0;
  box-shadow: var(--sh-flyout);
  z-index: 2147483647; overflow: hidden;
  font-family: var(--font-ui);
}
#memola-overlay .memola-ws-item {
  padding: var(--s-2) var(--s-4); cursor: pointer;
  display: flex; align-items: center; gap: 4px;
}
#memola-overlay .memola-ws-item:hover { background: var(--paper-2); }
#memola-overlay .memola-ws-item.on { background: var(--accent-soft); }
#memola-overlay .memola-ws-item-body {
  flex: 1; overflow: hidden;
}
#memola-overlay .memola-ws-item-name { font-size: var(--fs-base); color: var(--ink); }
#memola-overlay .memola-ws-item-url {
  font-size: var(--fs-xs); color: var(--ink); opacity: 0.5;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
#memola-overlay .memola-ws-item-rn,
#memola-overlay .memola-ws-item-rm {
  background: transparent; border: none; cursor: pointer;
  width: 24px; height: 24px; padding: 4px;
  border-radius: var(--r-1);
  color: var(--ink-3);
  opacity: 0; transition: opacity var(--tr-fast);
  flex-shrink: 0;
  display: inline-flex; align-items: center; justify-content: center;
}
#memola-overlay .memola-ws-item-rn svg,
#memola-overlay .memola-ws-item-rm svg {
  width: 14px; height: 14px;
}
#memola-overlay .memola-ws-item:hover .memola-ws-item-rn,
#memola-overlay .memola-ws-item:hover .memola-ws-item-rm { opacity: 1; }
#memola-overlay .memola-ws-item-rn:hover { background: var(--paper-3); color: var(--ink); }
#memola-overlay .memola-ws-item-rm:hover { background: rgba(231, 67, 67, 0.12); color: #b13a3a; }
#memola-overlay .memola-ws-empty { padding: var(--s-4); color: var(--ink); opacity: 0.5; font-size: var(--fs-md); }
#memola-overlay .memola-ws-sep { height: 1px; background: var(--paper-3); margin: var(--s-1) 0; }
#memola-overlay .memola-ws-add {
  padding: var(--s-2) var(--s-4); cursor: pointer;
  font-size: var(--fs-md); color: var(--accent);
}
#memola-overlay .memola-ws-add:hover { background: var(--paper-2); }

/* \u2500\u2500 Properties panel inline child of #memola-content-row \u2500 */
#memola-overlay #memola-props {
  width: 260px; flex-shrink: 0;
  background: var(--paper-2); border-left: 1px solid var(--paper-3); border-left-width: 0;
  display: flex; flex-direction: column;
  padding: 18px 18px;
  font-family: var(--font-ui); overflow: hidden;
  max-width: 0; opacity: 0;
  transition: max-width 0.22s ease, opacity 0.22s ease, border-width 0.22s ease;
}
#memola-overlay #memola-props.on { max-width: 600px; opacity: 1; border-left-width: 1px; }
#memola-overlay #memola-props-hd {
  font-size: var(--fs-xs); font-weight: 500;
  color: var(--ink-3);
  margin-bottom: var(--s-3);
  display: flex; align-items: center;
}
#memola-overlay #memola-props-hd > span:first-child { flex: 1; }
#memola-overlay #memola-props-list { overflow-y: auto; flex: 1; }
#memola-overlay .memola-prop-row {
  display: flex; gap: var(--s-3); padding: var(--s-2) 0;
  align-items: flex-start;
}
#memola-overlay .memola-prop-label {
  font-size: var(--fs-xs); color: var(--ink-3);
  width: 72px; flex-shrink: 0; padding-top: 2px;
}
#memola-overlay .memola-prop-value {
  font-size: var(--fs-md); color: var(--ink);
  flex: 1; word-break: break-all; line-height: 1.5;
}
#memola-overlay .memola-prop-add {
  font-size: var(--fs-sm); color: var(--ink-3); cursor: pointer;
  padding: 6px 0; margin-top: 4px;
}
#memola-overlay .memola-prop-add:hover { color: var(--accent-strong); }
#memola-overlay .memola-prop-sep {
  border-top: 1px dashed var(--paper-3);
  margin: 12px 0;
}
#memola-overlay .memola-prop-section {
  font-size: var(--fs-xs); color: var(--ink-3);
  margin-bottom: 6px; font-weight: 500;
}
#memola-overlay .memola-prop-empty {
  font-size: var(--fs-sm); color: var(--ink-4);
  padding: 4px 0;
}
#memola-overlay .memola-prop-backlink {
  font-size: var(--fs-sm); color: var(--ink); cursor: pointer;
  padding: 3px 0;
}
#memola-overlay .memola-prop-backlink:hover { color: var(--accent-strong); }

/* \u2500\u2500 Claude Design chip / tag primitives \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-chip {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 1px 8px; height: 20px; border-radius: 10px;
  border: 1px solid var(--line-strong); background: var(--paper);
  font-size: var(--fs-xs); color: var(--ink-3); white-space: nowrap;
}
#memola-overlay .memola-chip.on { background: var(--accent-soft); border-color: var(--accent); color: var(--ink); }
#memola-overlay .memola-tag-a { background: #e8dccf; color: #5a4a32; }
#memola-overlay .memola-tag-b { background: #dde6dc; color: #3d5247; }
#memola-overlay .memola-tag-c { background: #dce2e6; color: #33495a; }
#memola-overlay .memola-tag-d { background: #f0e3ef; color: #523a55; }

/* \u2500\u2500 AI Chat panel inline child (handled by .memola-tog-btn) \u2500 */

#memola-overlay #memola-ai-panel {
  width: 280px; flex-shrink: 0;
  background: var(--paper-2); border-left: 1px solid var(--paper-3); border-left-width: 0;
  display: flex; flex-direction: column; overflow: hidden;
  font-family: var(--font-ui);
  max-width: 0; opacity: 0;
  transition: max-width 0.22s ease, opacity 0.22s ease, border-width 0.22s ease;
}
#memola-overlay #memola-ai-panel.on { max-width: 600px; opacity: 1; border-left-width: 1px; }
#memola-overlay #memola-ai-hd {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 16px; border-bottom: 1px solid var(--paper-3);
  flex-shrink: 0; min-height: 44px;
}
/* History dropdown row \u2014 sits on its own line below the AI header so the
 * select has full panel width and the title isn't cramped. */
#memola-overlay #memola-ai-hist-row {
  padding: 8px 16px 10px; border-bottom: 1px solid var(--paper-3);
  flex-shrink: 0;
}
#memola-overlay #memola-ai-hist {
  width: 100%; box-sizing: border-box;
  border: 1px solid var(--paper-3); border-radius: var(--r-2);
  background: var(--paper); padding: 8px 12px;
  font-size: var(--fs-sm); font-family: inherit; color: var(--ink);
  cursor: pointer; outline: none;
  transition: border-color var(--tr-fast);
}
#memola-overlay #memola-ai-hist:hover { border-color: var(--ink-4); }
#memola-overlay #memola-ai-hist:focus { border-color: var(--accent); }
#memola-overlay #memola-ai-hd .memola-ai-title {
  display: flex; align-items: center; gap: 6px; font-size: 13px;
  font-weight: 600; color: var(--ink); flex: 1;
}
#memola-overlay #memola-ai-hd .memola-ai-title svg { width: 16px; height: 16px; color: var(--accent); }
#memola-overlay #memola-ai-hd button {
  border: none; background: transparent; cursor: pointer;
  color: var(--ink); padding: 4px; border-radius: 4px;
  display: flex; align-items: center; opacity: 0.5; line-height: 0;
}
#memola-overlay #memola-ai-hd button:hover { background: rgba(55, 53, 47, 0.08); opacity: 1; }
#memola-overlay #memola-ai-hd button svg { width: 14px; height: 14px; }

#memola-overlay #memola-ai-messages {
  flex: 1; overflow-y: auto; padding: 14px 16px;
  display: flex; flex-direction: column; gap: 10px;
}
#memola-overlay .memola-ai-empty {
  text-align: center; color: var(--ink-3);
  padding: 24px 12px; align-self: center;
}
#memola-overlay .memola-ai-empty-title { font-size: var(--fs-md); font-weight: 500; margin-bottom: 4px; color: var(--ink); }
#memola-overlay .memola-ai-empty-sub { font-size: var(--fs-sm); }
#memola-overlay .memola-ai-row { display: flex; flex-direction: column; gap: 4px; }
#memola-overlay .memola-ai-label {
  font-size: 9px; color: var(--ink-3);
  font-weight: 500;
}
#memola-overlay .memola-ai-msg {
  padding: 6px 8px; border-radius: var(--r-2);
  font-size: 10.5px; line-height: 1.55;
  white-space: pre-wrap; word-break: break-word;
  /* \u30DB\u30B9\u30C8\u74B0\u5883\u304C user-select:none \u3092\u6577\u304F\u306E\u3067\u3001\u30C1\u30E3\u30C3\u30C8\u51FA\u529B\u306F\u660E\u793A\u7684\u306B\u9078\u629E\u53EF\u306B
   * \u3059\u308B (= \u30DE\u30A6\u30B9\u30C9\u30E9\u30C3\u30B0\u3067\u30B3\u30D4\u30FC\u3067\u304D\u308B)\u3002cursor:text \u3067\u9078\u629E\u53EF\u80FD\u3092\u793A\u3059\u3002 */
  user-select: text; -webkit-user-select: text; cursor: text;
}
#memola-overlay .memola-ai-user {
  background: var(--paper-2-strong);
  color: var(--ink);
}
#memola-overlay .memola-ai-assistant {
  background: var(--paper);
  border: 1px solid var(--paper-3);
  color: var(--ink);
}
#memola-overlay .memola-ai-msg code {
  background: rgba(135, 131, 120, 0.2); padding: 1px 4px; border-radius: 3px;
  font-family: "SFMono-Regular", Menlo, Consolas, monospace; font-size: 90%;
}
#memola-overlay .memola-ai-loading { opacity: 0.55; font-style: italic; }
#memola-overlay .memola-ai-trace {
  margin-top: 6px; padding-top: 6px;
  border-top: 1px dashed var(--paper-3);
  font-size: 10.5px; color: var(--ink-3);
}

#memola-overlay #memola-ai-chips {
  display: flex; gap: 6px; padding: 8px 16px 0; flex-wrap: wrap; flex-shrink: 0;
}
#memola-overlay .memola-ai-chip {
  border: 1px solid var(--line-strong); background: var(--paper);
  padding: 4px 12px; border-radius: 12px; cursor: pointer;
  font-size: var(--fs-xs); color: var(--ink-3);
  transition: background var(--tr-fast), border-color var(--tr-fast), color var(--tr-fast);
  font-family: inherit; height: 24px; line-height: 1;
}
#memola-overlay .memola-ai-chip:hover { background: var(--accent-soft); border-color: var(--accent); color: var(--ink); }

#memola-overlay #memola-ai-inputarea {
  position: relative; padding: 12px 16px 16px;
  border-top: 1px solid var(--paper-3); flex-shrink: 0;
}
/* Provider+model dropdown above the textarea. Compact, grey, low-emphasis. */
#memola-overlay #memola-ai-model-pick {
  display: block;
  margin: 0 0 6px;
  padding: 2px 6px;
  font-size: 11px; font-family: inherit;
  background: transparent; color: var(--ink-3);
  border: 1px solid var(--paper-3); border-radius: var(--r-2);
  outline: none; cursor: pointer;
  max-width: 220px;
}
#memola-overlay #memola-ai-model-pick:hover {
  border-color: var(--paper-4); color: var(--ink-2);
}
/* Auto-grows up to 10 lines (~210px), then scrolls. JS in wiring.ts updates
 * the height on each \`input\` event so the textarea matches the content.
 * scroll-padding-bottom keeps the cursor above the bottom border when the
 * textarea auto-scrolls (otherwise the cursor lands flush against the edge). */
#memola-overlay #memola-ai-input {
  width: 100%; min-height: 44px; max-height: 232px;
  padding: 10px 44px 16px 14px;
  border: 1px solid var(--paper-3); border-radius: var(--r-2);
  font-size: var(--fs-sm); font-family: inherit; resize: none; outline: none;
  color: var(--ink); background: var(--paper); line-height: 1.5;
  box-sizing: border-box; overflow-y: auto;
  scroll-padding-bottom: 16px;
}
#memola-overlay #memola-ai-input:focus {
  border-color: var(--accent); background: var(--paper);
  box-shadow: 0 0 0 1px var(--accent-soft);
}
#memola-overlay #memola-ai-input::placeholder { color: var(--ink-4); }
/* Send button \u2014 rounded rectangle (matches +\u65B0\u898F corner radius). Faded by
 * default, accent fill on hover (Claude Code style). Anchored fully inside
 * the textarea with comfortable margin from the inner border. */
#memola-overlay #memola-ai-send {
  position: absolute; right: 24px; bottom: 26px;
  background: transparent; color: var(--ink-3); border: none;
  width: 28px; height: 24px; border-radius: var(--r-2);
  cursor: pointer; padding: 0;
  display: flex; align-items: center; justify-content: center;
  opacity: 0.6;
  transition: background var(--tr-fast), color var(--tr-fast), opacity var(--tr-fast);
}
#memola-overlay #memola-ai-send:hover {
  background: var(--accent); color: #fff; opacity: 1;
}
#memola-overlay #memola-ai-send.stop {
  background: var(--accent); color: #fff; opacity: 1;
}
#memola-overlay #memola-ai-send.stop:hover { background: var(--accent-strong); }
#memola-overlay #memola-ai-send svg { width: 14px; height: 14px; display: block; }

/* \u2500\u2500 Page menu (top-right "..." dropdown) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-pgm-btn {
  border: none; background: transparent; cursor: pointer;
  color: var(--ink); padding: 4px; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  line-height: 0; flex-shrink: 0; opacity: 0.5; margin-left: 4px;
  width: 28px; height: 28px;
}
#memola-overlay #memola-pgm-btn:hover { background: rgba(55, 53, 47, 0.08); opacity: 1; }
#memola-overlay #memola-pgm-btn svg { width: 16px; height: 16px; }

#memola-overlay #memola-pgm {
  position: fixed; background: var(--paper); border-radius: var(--r-3); width: 240px;
  padding: 6px; display: none; z-index: 2147483647;
  box-shadow: var(--sh-flyout);
  border: 1px solid var(--paper-3);
  font-family: var(--font-ui);
}
#memola-overlay #memola-pgm.on { display: block; }
#memola-overlay .memola-pgm-item {
  display: flex; align-items: center; gap: 10px; padding: 8px 12px;
  cursor: pointer; font-size: var(--fs-md); line-height: 1.3;
  color: var(--ink); user-select: none;
  border-radius: var(--r-2); min-height: 32px;
}
#memola-overlay .memola-pgm-item:hover { background: rgba(55, 53, 47, 0.06); }
#memola-overlay .memola-pgm-item svg { width: 14px; height: 14px; flex-shrink: 0; opacity: 0.5; stroke-width: 1.8; }
#memola-overlay .memola-pgm-item span { flex: 1; }
/* Emoji-icon spans (used in scope toggle and similar) need to behave like
   the SVG icons above \u2014 fixed-width on the left, never grow. Without this,
   the generic \`span { flex: 1 }\` rule above splits the row 50/50 between
   icon and label, leaving a huge gap. */
#memola-overlay .memola-pgm-item .memola-pgm-scope-ic {
  flex: 0 0 14px; width: 14px; font-size: 14px;
  text-align: center; line-height: 1; opacity: 0.85;
}
#memola-overlay .memola-pgm-item.danger { color: var(--danger); }
#memola-overlay .memola-pgm-item.danger svg { opacity: 0.65; }
#memola-overlay .memola-pgm-item.danger:hover { background: rgba(235, 87, 87, 0.06); }
#memola-overlay .memola-pgm-sep {
  height: 1px; background: rgba(55, 53, 47, 0.09);
  margin: 4px 6px;
}

/* \u2500\u2500 Modals \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-md {
  position: fixed; inset: 0; background: rgba(15, 15, 15, .35);
  display: none; align-items: center; justify-content: center; z-index: 2147483647;
  backdrop-filter: blur(2px);
  padding: 24px;
}
#memola-md.on { display: flex; }
#memola-overlay .memola-mb {
  background: var(--paper); border-radius: var(--r-3);
  padding: 24px 24px 20px;
  max-width: 400px; width: 90%;
  box-shadow: var(--sh-modal);
  font-family: var(--font-ui);
  font-size: var(--fs-md); color: var(--ink);
}
#memola-overlay .memola-mb h2 {
  margin: 0 0 16px; font-size: var(--fs-lg); font-weight: 600;
  color: var(--ink); line-height: 1.3;
}
#memola-overlay .memola-mb p { color: var(--ink-3); font-size: var(--fs-md); line-height: 1.55; margin-bottom: 10px; }
#memola-overlay .memola-ma { display: flex; gap: 10px; justify-content: flex-end; margin-top: 18px; }
#memola-overlay .memola-btn {
  padding: 0 18px; border-radius: var(--r-2); border: none; cursor: pointer;
  font-size: var(--fs-sm); font-family: inherit; font-weight: 500; height: 34px;
  min-width: 80px;
  display: inline-flex; align-items: center; justify-content: center;
  line-height: 1; white-space: nowrap;
  transition: background .1s, color .1s;
}
#memola-overlay .memola-btn.p { background: var(--accent); color: #fff; }
#memola-overlay .memola-btn.s { background: rgba(55, 53, 47, .08); color: var(--ink); }
#memola-overlay .memola-btn.p:hover { background: var(--accent-strong); }
#memola-overlay .memola-btn.s:hover { background: rgba(55, 53, 47, .14); }

/* \u2500\u2500 Row properties (Notion-style row-as-page meta panel) \u2500 */
#memola-overlay .memola-row-props {
  margin: 6px 0 18px;
  padding: 0;
  display: flex; flex-direction: column; gap: 2px;
}
#memola-overlay .memola-row-props:empty { display: none; }
#memola-overlay .memola-rp-row {
  display: grid; grid-template-columns: 140px 1fr; align-items: center;
  gap: 8px; padding: 4px 0;
  border-radius: 4px;
  transition: background .1s;
}
#memola-overlay .memola-rp-row:hover { background: rgba(55, 53, 47, .03); }
#memola-overlay .memola-rp-label {
  font-size: var(--fs-sm); color: var(--ink-3);
  padding: 4px 6px;
  user-select: none;
}
#memola-overlay .memola-rp-value { padding: 0; min-width: 0; }
#memola-overlay .memola-rp-input {
  width: 100%; box-sizing: border-box;
  border: 1px solid transparent; background: transparent;
  padding: 4px 6px; border-radius: 4px;
  font-family: inherit; font-size: var(--fs-md); color: var(--ink);
}
#memola-overlay .memola-rp-input:hover { background: rgba(55, 53, 47, .04); }
#memola-overlay .memola-rp-input:focus {
  outline: none; background: var(--paper);
  border-color: rgba(55, 53, 47, .16);
}
#memola-overlay .memola-rp-multi { resize: vertical; min-height: 32px; line-height: 1.5; }
#memola-overlay .memola-rp-date { font-family: var(--font-mono, ui-monospace, monospace); }
#memola-overlay .memola-rp-invalid { border-color: #b1361e !important; background: rgba(225, 88, 88, .06); }
/* Choice button (replaces native <select> in row-props) */
#memola-overlay .memola-rp-choice {
  text-align: left; cursor: pointer; min-height: 32px;
  display: flex; align-items: center;
}
#memola-overlay .memola-rp-placeholder { color: var(--ink-4); }

/* Choice popover (custom dropdown styled like the create-menu) */
#memola-overlay .memola-choice-pop {
  position: fixed; z-index: 2147483647;
  background: var(--paper); border: 1px solid var(--paper-3);
  border-radius: var(--r-3); padding: 6px;
  box-shadow: var(--sh-flyout);
  font-family: var(--font-ui);
  max-height: 320px; overflow-y: auto;
}
#memola-overlay .memola-cp-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px; cursor: pointer; border-radius: var(--r-2);
  font-size: var(--fs-md); color: var(--ink);
  transition: background var(--tr-fast);
  user-select: none;
}
#memola-overlay .memola-cp-item:hover { background: var(--paper-2); }
#memola-overlay .memola-cp-item.sel { background: var(--accent-soft); }
#memola-overlay .memola-cp-ic {
  width: 16px; text-align: center; flex-shrink: 0;
  color: var(--accent); font-weight: 600;
}
#memola-overlay .memola-cp-label { flex: 1; min-width: 0; }
#memola-overlay .memola-cp-empty { color: var(--ink-4); }
#memola-overlay .memola-cp-sub { font-size: var(--fs-xs); color: var(--ink-3); margin-left: 8px; }
/* Date wrapper: text input + small calendar picker icon */
#memola-overlay .memola-rp-date-wrap {
  display: flex; align-items: center; gap: 4px;
}
#memola-overlay .memola-rp-date-wrap .memola-rp-input { flex: 1; min-width: 0; }
#memola-overlay .memola-rp-date-pick {
  width: 24px; height: 24px; padding: 0; border: 1px solid transparent;
  background: transparent; border-radius: 4px; cursor: pointer;
  color-scheme: light;                /* keep native picker readable */
}
#memola-overlay .memola-rp-date-pick:hover { background: rgba(55,53,47,.06); border-color: rgba(55,53,47,.12); }
/* Hide the textual portion of the native date input \u2014 only show the icon */
#memola-overlay .memola-rp-date-pick::-webkit-datetime-edit { display: none; }
#memola-overlay .memola-rp-date-pick::-webkit-calendar-picker-indicator {
  cursor: pointer; opacity: 0.6; padding: 0; margin: 0;
}
#memola-overlay .memola-rp-date-pick::-webkit-calendar-picker-indicator:hover { opacity: 1; }

/* Same wrapper for DB table cells */
#memola-overlay .memola-dc-date-wrap {
  display: inline-flex; align-items: center; gap: 4px; width: 100%;
}
#memola-overlay .memola-dc-date-wrap .memola-dc-date-inp { flex: 1; min-width: 0; }
#memola-overlay .memola-dc-date-pick {
  width: 22px; height: 22px; padding: 0; border: 1px solid transparent;
  background: transparent; border-radius: 4px; cursor: pointer;
  color-scheme: light;
}
#memola-overlay .memola-dc-date-pick:hover { background: rgba(55,53,47,.06); border-color: rgba(55,53,47,.12); }
#memola-overlay .memola-dc-date-pick::-webkit-datetime-edit { display: none; }
#memola-overlay .memola-dc-date-pick::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.6; }
#memola-overlay .memola-dc-date-pick::-webkit-calendar-picker-indicator:hover { opacity: 1; }
#memola-overlay .memola-rp-checkbox { display: inline-flex; align-items: center; padding: 4px 6px; }
#memola-overlay .memola-rp-checkbox input { margin: 0; cursor: pointer; }

/* \u2500\u2500 Diff modal (Tool Use update_page confirmation) \u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-diff-modal {
  position: fixed; inset: 0; background: rgba(15, 15, 15, .35);
  display: none; align-items: center; justify-content: center;
  z-index: 2147483647; backdrop-filter: blur(2px); padding: 24px;
}
#memola-overlay .memola-diff-modal.on { display: flex; }
#memola-overlay .memola-diff-card {
  background: var(--paper); border-radius: var(--r-3);
  box-shadow: var(--sh-modal);
  max-width: 720px; width: 100%; max-height: 80vh;
  display: flex; flex-direction: column;
  font-family: var(--font-ui); color: var(--ink);
}
#memola-overlay .memola-diff-head { padding: 20px 24px 12px; border-bottom: 1px solid rgba(55,53,47,.09); }
#memola-overlay .memola-diff-head h2 { margin: 0 0 4px; font-size: var(--fs-lg); font-weight: 600; }
#memola-overlay .memola-diff-sub { font-size: var(--fs-sm); color: var(--ink-3); }
#memola-overlay .memola-diff-label {
  font-size: var(--fs-sm); color: var(--ink-3); margin-bottom: 6px;
  text-transform: uppercase; letter-spacing: .04em;
}
#memola-overlay .memola-diff-title-row {
  padding: 14px 24px; border-bottom: 1px solid rgba(55,53,47,.06);
  display: grid; grid-template-columns: max-content 1fr auto 1fr; gap: 10px; align-items: center;
}
#memola-overlay .memola-diff-title-old {
  text-decoration: line-through; color: var(--ink-3);
  background: rgba(225, 88, 88, .08); padding: 4px 8px; border-radius: 4px;
}
#memola-overlay .memola-diff-title-new {
  color: var(--ink);
  background: rgba(120, 178, 120, .14); padding: 4px 8px; border-radius: 4px; font-weight: 500;
}
#memola-overlay .memola-diff-arrow { color: var(--ink-3); font-size: var(--fs-md); }
#memola-overlay .memola-diff-body { padding: 14px 24px; flex: 1 1 auto; overflow: auto; min-height: 0; }
#memola-overlay .memola-diff-pre {
  background: #fafaf8; border: 1px solid rgba(55,53,47,.09); border-radius: 6px;
  padding: 12px; margin: 0;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12.5px; line-height: 1.55;
  white-space: pre; overflow-x: auto;
  max-height: 50vh;
}
#memola-overlay .memola-diff-line { display: block; }
#memola-overlay .memola-diff-eq  { color: var(--ink-3); }
#memola-overlay .memola-diff-add { color: #1a7f37; background: rgba(120, 178, 120, .14); }
#memola-overlay .memola-diff-del { color: #b1361e; background: rgba(225, 88, 88, .08); }
#memola-overlay .memola-diff-empty {
  padding: 28px 24px; text-align: center; color: var(--ink-3); font-size: var(--fs-sm);
}
#memola-overlay .memola-diff-fields { padding: 14px 24px; border-bottom: 1px solid rgba(55,53,47,.06); }
#memola-overlay .memola-diff-fields-tbl {
  width: 100%; border-collapse: collapse; font-size: 12.5px;
}
#memola-overlay .memola-diff-fields-tbl td {
  padding: 4px 8px; vertical-align: top;
}
#memola-overlay .memola-diff-fname {
  font-weight: 500; color: var(--ink-3); white-space: nowrap;
  padding-right: 12px !important;
}
#memola-overlay .memola-diff-actions {
  display: flex; gap: 10px; justify-content: flex-end;
  padding: 14px 24px 18px; border-top: 1px solid rgba(55,53,47,.09);
}

/* \u2500\u2500 Floating toolbar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-ftb {
  position: fixed; background: var(--ink); border-radius: 6px;
  padding: 4px 6px; display: none; gap: 2px; align-items: center;
  box-shadow: 0 4px 16px rgba(0,0,0,.3); z-index: 2147483646;
  transform: translateX(-50%);
}
#memola-ftb.on { display: flex; }
#memola-overlay .memola-fb {
  border: none; background: transparent; color: rgba(255,255,255,.85); cursor: pointer;
  padding: 4px 7px; border-radius: 4px; font-size: 13px; font-family: inherit;
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 28px; min-width: 28px; line-height: 1;
}
#memola-overlay .memola-fb:hover { background: rgba(255,255,255,.15); color: #fff; }
#memola-overlay .memola-fb.on { background: rgba(255,255,255,.2); color: #fff; }
#memola-overlay .memola-fb svg { width: 16px; height: 16px; display: block; }
#memola-overlay .memola-fb-sep { width: 1px; height: 16px; background: rgba(255,255,255,.2); margin: 0 2px; }

/* \u2500\u2500 Slash command menu \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-slash {
  position: fixed; background: var(--paper); border-radius: var(--r-3);
  box-shadow: var(--sh-flyout); border: 1px solid var(--paper-3);
  min-width: 240px; max-height: 360px; overflow-y: auto;
  z-index: 2147483646; display: none; padding: 4px 0;
}
#memola-slash.on { display: block; }
#memola-overlay .memola-slash-section {
  font-size: 9px; font-weight: 500; color: var(--ink-3);
  padding: 6px 12px 2px; opacity: 0.8;
  text-transform: none; letter-spacing: 0.04em;
}
#memola-overlay .memola-slash-item {
  display: flex; align-items: center; gap: 8px; padding: 4px 10px;
  border-radius: var(--r-2); cursor: pointer; transition: background var(--tr-fast);
}
#memola-overlay .memola-slash-item:hover, .memola-slash-item.sel { background: var(--accent-soft); }
#memola-overlay .memola-slash-icon {
  width: 22px; height: 22px; border-radius: var(--r-1);
  border: 1px solid var(--paper-3); background: var(--paper);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; color: var(--ink); flex-shrink: 0;
  font-family: var(--font-mono);
}
#memola-overlay .memola-slash-body { flex: 1; min-width: 0; }
#memola-overlay .memola-slash-name { font-size: var(--fs-md); color: var(--ink); }
#memola-overlay .memola-slash-desc { font-size: 10px; color: var(--ink-3); margin-top: 1px; }
#memola-overlay .memola-slash-kbd {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--ink-3);
  background: rgba(55, 53, 47, 0.06);
  border: 1px solid rgba(55, 53, 47, 0.10);
  border-radius: 3px;
  padding: 1px 5px;
  flex-shrink: 0;
  margin-left: 8px;
  white-space: nowrap;
}
#memola-overlay .memola-slash-item.sel .memola-slash-kbd,
#memola-overlay .memola-slash-item:hover .memola-slash-kbd {
  background: rgba(55, 53, 47, 0.10);
  color: var(--ink-2);
}

/* \u2500\u2500 Internal page-link chip \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-page-link {
  display: inline;
  padding: 0 3px;
  margin: 0 1px;
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid rgba(55, 53, 47, 0.25);
  background: transparent;
  cursor: pointer;
  border-radius: 2px;
  transition: background 0.12s, border-color 0.12s;
  /* Atomic chip: contenteditable=false makes the browser treat it as one
     unit. Adding a tiny zwsp before/after via CSS would help caret movement
     but most browsers handle this correctly without it. */
}
#memola-overlay .memola-page-link::before {
  content: '\u2197';
  font-size: 0.78em;
  margin-right: 2px;
  color: var(--ink-3);
  vertical-align: 1px;
}
#memola-overlay .memola-page-link:hover {
  background: rgba(55, 53, 47, 0.08);
  border-bottom-color: rgba(55, 53, 47, 0.5);
}
#memola-overlay .memola-page-link.broken {
  color: #b13a3a;
  border-bottom-color: rgba(177, 58, 58, 0.4);
  text-decoration: line-through;
  text-decoration-color: rgba(177, 58, 58, 0.5);
}
#memola-overlay .memola-page-link.broken::before {
  content: '\u26A0';
  color: #b13a3a;
}
#memola-overlay .memola-page-link.broken:hover {
  background: rgba(177, 58, 58, 0.10);
}
/* Daily-note deferred link whose target row doesn't exist yet \u2014 clicking
   it pops up a confirm dialog before creating. Visually indicated with
   dashed underline + dimmer text + \u25CC so users can tell at a glance which
   \`[[daily:...]]\` references actually have content. */
#memola-overlay .memola-page-link.daily-link.ghosted {
  border-bottom: 1px dashed rgba(55, 53, 47, 0.35);
  color: var(--ink-3);
  opacity: 0.78;
}
#memola-overlay .memola-page-link.daily-link.ghosted::before {
  content: '\u25CC';
  color: var(--ink-3);
}
#memola-overlay .memola-page-link.daily-link.ghosted:hover {
  background: rgba(55, 53, 47, 0.06);
  opacity: 1;
}

/* \u2500\u2500 Page picker (autocomplete & /page) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay .memola-page-picker {
  position: fixed;
  background: var(--paper);
  border-radius: var(--r-3);
  box-shadow: var(--sh-flyout);
  border: 1px solid var(--paper-3);
  min-width: 280px;
  max-width: 380px;
  max-height: 320px;
  overflow-y: auto;
  z-index: 2147483646;
  padding: 4px 0;
}
#memola-overlay .memola-page-picker-empty {
  padding: 12px 14px;
  font-size: var(--fs-sm);
  color: var(--ink-3);
  text-align: center;
}
#memola-overlay .memola-page-picker-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: var(--r-2);
  margin: 0 4px;
  transition: background var(--tr-fast);
  font-size: var(--fs-md);
  white-space: nowrap;
  overflow: hidden;
}
#memola-overlay .memola-page-picker-item:hover,
#memola-overlay .memola-page-picker-item.sel {
  background: var(--accent-soft);
}
/* While the user is navigating with the keyboard, the static cursor's
 * hover would visually double-select the wrong row. Suppress :hover. */
#memola-overlay .memola-page-picker.kb-mode .memola-page-picker-item:hover {
  background: transparent;
}
#memola-overlay .memola-page-picker.kb-mode .memola-page-picker-item.sel {
  background: var(--accent-soft);
}
#memola-overlay .memola-page-picker-icon {
  width: 18px;
  text-align: center;
  flex-shrink: 0;
  font-size: 14px;
}
#memola-overlay .memola-page-picker-name {
  color: var(--ink);
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
#memola-overlay .memola-page-picker-path {
  color: var(--ink-3);
  font-size: var(--fs-xs);
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-left: 4px;
}

/* \u2500\u2500 Quick search \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-qs {
  position: absolute; inset: 0; background: rgba(0,0,0,.3);
  display: none; align-items: flex-start; justify-content: center;
  padding-top: 80px; z-index: 5;
}
#memola-qs.on { display: flex; }
#memola-qs-box {
  background: #fff; border-radius: 10px; width: 100%; max-width: 520px;
  box-shadow: 0 8px 40px rgba(0,0,0,.2); overflow: hidden;
}
#memola-qs-inp {
  width: 100%; padding: 14px 18px; font-size: 16px; font-family: inherit;
  border: none; outline: none; border-bottom: 1px solid rgba(55,53,47,.09);
  color: rgb(55,53,47);
}
#memola-qs-inp::placeholder { color: var(--ink-4); }
#memola-qs-res { max-height: 360px; overflow-y: auto; padding: 6px; }
#memola-overlay .memola-qs-item {
  display: flex; align-items: center; gap: 10px; padding: 8px 10px;
  border-radius: 6px; cursor: pointer; transition: background 0.1s;
}
#memola-overlay .memola-qs-item:hover, .memola-qs-item.sel { background: rgba(55,53,47,.06); }
#memola-overlay .memola-qs-ic { font-size: 16px; flex-shrink: 0; width: 20px; text-align: center; }
#memola-overlay .memola-qs-title { font-size: 14px; font-weight: 500; color: rgb(55,53,47); }
#memola-overlay .memola-qs-path { font-size: 12px; color: var(--ink-3); margin-top: 1px; }
#memola-overlay .memola-qs-empty { padding: 20px; text-align: center; color: var(--ink-3); font-size: 14px; }
#memola-overlay .memola-qs-section {
  padding: 8px 10px 4px; font-size: 11px; font-weight: 600;
  color: var(--ink); opacity: 0.45;
  text-transform: uppercase; letter-spacing: 0.04em; user-select: none;
}
#memola-overlay .memola-qs-loading {
  padding: 12px 14px; font-size: 13px; color: var(--ink); opacity: 0.5;
  display: flex; align-items: center; gap: 6px;
}
#memola-overlay .memola-qs-snippet {
  font-size: 12px; color: var(--ink); opacity: 0.6;
  margin-top: 3px; line-height: 1.4;
  overflow: hidden; text-overflow: ellipsis; display: -webkit-box;
  -webkit-line-clamp: 2; -webkit-box-orient: vertical;
}
#memola-overlay .memola-qs-hit { background: rgba(255, 213, 0, 0.4); color: inherit; padding: 0 1px; border-radius: 2px; }
.memola-qs-kbd {
  font-family: var(--font-mono); font-size: 10px; color: var(--ink-3);
  padding: 1px 6px; border: 1px solid var(--paper-3); border-radius: var(--r-1);
  margin-left: 8px; flex-shrink: 0; background: var(--paper);
}

/* \u2500\u2500 Emoji picker \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-emoji {
  position: fixed; background: #fff; border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0,0,0,.15); border: 1px solid rgba(55,53,47,.09);
  padding: 8px; z-index: 2147483647; display: none;
}
#memola-emoji.on { display: block; }
#memola-emoji-grid {
  display: grid; grid-template-columns: repeat(8, 32px); gap: 2px;
  max-height: 200px; overflow-y: auto; margin-bottom: 6px;
}
#memola-overlay .memola-emoji-btn {
  width: 32px; height: 32px; border: none; background: transparent;
  border-radius: 4px; cursor: pointer; font-size: 18px;
  display: flex; align-items: center; justify-content: center;
}
#memola-overlay .memola-emoji-btn:hover { background: rgba(55,53,47,.08); }
#memola-emoji-rm {
  width: 100%; padding: 5px; border: none; background: rgba(184, 83, 74, .10);
  color: var(--danger); border-radius: 4px; cursor: pointer; font-size: 12px;
  font-family: inherit;
}
#memola-emoji-rm:hover { background: rgba(235,87,87,.15); }

/* \u2500\u2500 DB / Table view \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-dv { flex: 1; display: none; flex-direction: column; overflow-y: auto; }
#memola-dv-inner {
  width: 100%; max-width: 1200px; margin: 0 auto;
  display: flex; flex-direction: column; flex: 1; min-height: 0;
  padding: 48px 40px 0;
}
#memola-dv-hd, #memola-db-views, #memola-db-tb, #memola-filter-bar {
  width: 100%;
}
/* DB view header: same layout as page header (icon LEFT, add-icon ABOVE). */
#memola-dv-hd {
  position: relative; margin-bottom: 24px; flex-shrink: 0;
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
}
#memola-dv-icon-wrap { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
#memola-dv-pg-icon {
  font-size: 40px; line-height: 1; cursor: pointer; display: none;
  border-radius: 6px; padding: 4px; transition: background 0.1s;
}
#memola-dv-pg-icon:hover { background: var(--paper-2-strong); }
#memola-dv-ttl {
  font-family: var(--font-serif); letter-spacing: -0.005em;
  font-size: 28px; font-weight: 600; line-height: 1.3; color: var(--ink);
  outline: none; min-width: 40px; padding: 0; flex: 1 1 0;
}
#memola-dv-ttl:empty::before { content: "\u7121\u984C"; color: var(--ink-4); }

#memola-db-views {
  display: flex; gap: 16px; padding: 0;
  border-bottom: 1px solid var(--paper-3);
  flex-shrink: 0; min-height: 36px; align-items: stretch;
}
#memola-overlay .memola-db-vbtn {
  padding: 8px 4px; border: none; background: transparent; cursor: pointer;
  border-bottom: 2px solid transparent; border-radius: 0;
  font-size: var(--fs-md); color: var(--ink-3); font-family: inherit;
  display: inline-flex; align-items: center; gap: 6px;
  transition: color var(--tr-fast), border-color var(--tr-fast);
  margin-bottom: -1px;
  white-space: nowrap;
}
#memola-overlay .memola-db-vbtn:hover { color: var(--ink); }
#memola-overlay .memola-db-vbtn.on { color: var(--ink); border-bottom-color: var(--accent); font-weight: 500; }
#memola-overlay .memola-db-vbtn svg { width: 14px; height: 14px; flex-shrink: 0; opacity: 0.7; }
#memola-overlay .memola-db-vbtn.on svg { opacity: 1; }

#memola-db-tb {
  display: flex; gap: 8px; padding: 10px 0;
  border-bottom: 1px solid var(--paper-3);
  flex-shrink: 0; align-items: center; flex-wrap: wrap;
}
/* Toolbar chip-style button */
#memola-overlay .memola-db-chip {
  padding: 7px 18px; min-height: 32px;
  border: 1px solid var(--line-strong); background: var(--paper);
  border-radius: 18px; font-size: var(--fs-sm); color: var(--ink-3);
  font-family: inherit; cursor: pointer;
  display: inline-flex; align-items: center; gap: 10px;
  transition: background var(--tr-fast), border-color var(--tr-fast), color var(--tr-fast);
  white-space: nowrap; line-height: 1.2;
}
#memola-overlay .memola-db-chip:hover { background: var(--paper-2-strong); color: var(--ink); }
#memola-overlay .memola-db-chip.on { background: var(--accent-soft); border-color: var(--accent); color: var(--ink); }
#memola-overlay .memola-db-chip.subtle {
  border-color: transparent; background: transparent; color: var(--ink-4);
}
#memola-overlay .memola-db-chip.subtle:hover { background: var(--paper-2); color: var(--ink-3); border-color: transparent; }
#memola-overlay .memola-db-chip svg { width: 13px; height: 13px; flex-shrink: 0; opacity: 0.65; }
#memola-overlay .memola-db-tb-spacer { flex: 1; min-width: 12px; }
#memola-overlay .memola-db-new-btn {
  padding: 7px 18px; min-height: 32px;
  border: none; background: var(--accent); color: var(--paper);
  border-radius: var(--r-2); font-size: var(--fs-sm); font-weight: 500;
  font-family: inherit; cursor: pointer;
  transition: background var(--tr-fast);
  white-space: nowrap; line-height: 1.2;
  display: inline-flex; align-items: center; gap: 10px;
  margin-left: 6px;
}
#memola-overlay .memola-db-new-btn:hover { background: var(--accent-strong); }

/* \u2500\u2500 Filter chips (applied filters, AND condition) \u2500\u2500 */
#memola-overlay #memola-filter-chips {
  display: flex; flex-wrap: wrap; gap: 6px;
  padding: 8px 0 0; min-height: 0;
}
#memola-overlay #memola-filter-chips:empty { display: none; }
#memola-overlay .memola-flt-chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 6px 4px 10px;
  border: 1px solid var(--accent); background: var(--accent-soft);
  border-radius: 14px; font-size: var(--fs-xs); color: var(--ink);
  height: 28px;
}
#memola-overlay .memola-flt-chip-label {
  font-weight: 500; color: var(--ink); white-space: nowrap;
}
#memola-overlay .memola-flt-chip-val {
  border: none; background: var(--paper); color: var(--ink);
  font-family: inherit; font-size: var(--fs-xs);
  padding: 2px 6px; border-radius: var(--r-1);
  outline: none; min-width: 60px; max-width: 140px;
}
#memola-overlay .memola-flt-chip-val:focus { box-shadow: 0 0 0 1px var(--accent); }
#memola-overlay .memola-flt-chip-x {
  border: none; background: transparent; cursor: pointer;
  color: var(--ink-3); width: 18px; height: 18px;
  border-radius: 50%; line-height: 1; font-size: 14px;
  display: inline-flex; align-items: center; justify-content: center;
}
#memola-overlay .memola-flt-chip-x:hover { background: rgba(42,42,38,0.1); color: var(--ink); }

/* \u2500\u2500 Filter popover (field picker) \u2500\u2500 */
#memola-overlay #memola-filter-popover {
  position: fixed; display: none;
  background: var(--paper); border: 1px solid var(--paper-3);
  border-radius: var(--r-3); box-shadow: var(--sh-flyout);
  width: 280px; padding: 8px; z-index: 2147483647;
  font-family: var(--font-ui);
}
#memola-overlay #memola-filter-popover.on { display: block; }
#memola-overlay .memola-flt-pop-inpwrap { padding: 4px 4px 8px; }
#memola-overlay .memola-flt-pop-inp {
  width: 100%; padding: 6px 10px; height: 32px;
  border: 1px solid var(--paper-3); border-radius: var(--r-2);
  background: var(--paper); color: var(--ink);
  font-family: inherit; font-size: var(--fs-sm); outline: none;
  box-sizing: border-box;
}
#memola-overlay .memola-flt-pop-inp:focus { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent-soft); }
#memola-overlay .memola-flt-pop-list {
  max-height: 280px; overflow-y: auto;
}
#memola-overlay .memola-flt-pop-item {
  display: flex; align-items: center; gap: 10px;
  padding: 6px 10px; border-radius: var(--r-2);
  cursor: pointer; font-size: var(--fs-md); color: var(--ink);
}
#memola-overlay .memola-flt-pop-item:hover { background: var(--paper-2-strong); }
#memola-overlay .memola-flt-pop-ic {
  width: 18px; text-align: center; font-family: var(--font-mono);
  font-size: 12px; color: var(--ink-3); flex-shrink: 0;
}
#memola-overlay .memola-flt-pop-empty {
  padding: 14px 10px; text-align: center;
  color: var(--ink-4); font-size: var(--fs-sm);
}

/* \u2500\u2500 DB Table (Notion\u98A8: \u7E26\u7F6B\u7DDA\u306A\u3057\u30FB\u6A2A\u306F\u63A7\u3048\u3081\u30FB\u30BF\u30A4\u30C8\u30EB\u5217\u306F\u592A\u5B57) \u2500\u2500 */
#memola-dt-wrap { flex: 1; overflow: auto; padding: 0; }
#memola-dt {
  width: 100%; border-collapse: collapse;
  font-size: var(--fs-sm); table-layout: fixed;
  font-family: var(--font-ui);
}
#memola-dt th {
  text-align: left; padding: 0; font-size: var(--fs-xs); font-weight: 400;
  color: var(--ink-3);
  border-bottom: 1px solid var(--paper-3);
  /* \u7E26\u7F6B\u7DDA\u306A\u3057 */
  white-space: nowrap; background: var(--paper); position: sticky; top: 0;
  user-select: none; height: 36px; vertical-align: middle; position: relative;
  width: 160px;
}
#memola-dt th .memola-th-label {
  display: flex; align-items: center; gap: 4px;
  padding: 8px 14px; cursor: pointer;
  overflow: hidden; text-overflow: ellipsis;
  color: var(--ink-3); transition: color var(--tr-fast);
}
#memola-dt th .memola-th-label:hover { color: var(--ink); background: transparent; }
#memola-dt th .sort-arrow { margin-left: 2px; opacity: 0.5; font-size: 9px; }
#memola-dt td {
  padding: 0;
  border-bottom: 1px solid rgba(42, 42, 38, 0.04);
  /* \u7E26\u7F6B\u7DDA\u306A\u3057 */
  vertical-align: middle; height: 40px;
}
#memola-dt tbody tr { transition: background var(--tr-fast); }
#memola-dt tbody tr:hover { background: rgba(42, 42, 38, 0.025); }
/* \u5358\u884C\u8868\u793A\u6642: line-height = height \u3067 caret \u3092\u7E26\u4E2D\u592E\u306B */
#memola-overlay .memola-dc {
  display: block;
  padding: 0 14px; outline: none;
  white-space: nowrap; overflow: hidden;
  cursor: text; height: 40px; line-height: 40px;
  font-size: var(--fs-sm); color: var(--ink);
}
/* \u30D5\u30A9\u30FC\u30AB\u30B9\u6642: \u6539\u884C\u5165\u529B\u306B\u5BFE\u5FDC\u3059\u308B\u305F\u3081 line-height \u3092\u901A\u5E38\u5024\u306B\u623B\u3057\u3001
   first line \u3092\u7E26\u4E2D\u592E\u306B\u3059\u308B\u305F\u3081\u4E0A\u4E0B padding \u3067 40px \u3092\u78BA\u4FDD */
#memola-overlay .memola-dc:focus {
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1px var(--accent);
  white-space: pre-wrap;
  height: auto; min-height: 40px;
  line-height: 1.5;
  padding: 11px 14px;
}
/* \u8907\u6570\u884C\u578B (FieldTypeKind=3) \u306F\u5E38\u6642 pre-wrap\u30FB\u884C\u9593\u6B63\u5E38 */
#memola-overlay .memola-dc.multi {
  white-space: pre-wrap;
  height: auto; min-height: 40px;
  line-height: 1.5;
  padding: 11px 14px;
}
/* \u65E5\u4ED8\u30BB\u30EB */
#memola-overlay .memola-dc-date {
  display: flex; align-items: center;
  height: 40px; padding: 0 14px;
  font-size: var(--fs-sm); color: var(--ink);
  cursor: pointer; font-variant-numeric: tabular-nums;
}
#memola-overlay .memola-dc-date:hover { background: rgba(42, 42, 38, 0.025); }
#memola-overlay .memola-dc-date-inp {
  border: none; background: transparent; outline: none;
  font-family: inherit; font-size: var(--fs-sm); color: var(--ink);
  padding: 0; height: 100%; width: 100%;
  font-variant-numeric: tabular-nums;
}

/* Resize handle */
#memola-dt th .memola-col-resize {
  position: absolute; right: -2px; top: 0; bottom: 0; width: 5px;
  cursor: col-resize; z-index: 2; user-select: none;
}
#memola-dt th .memola-col-resize:hover, #memola-dt th .memola-col-resize:active {
  background: var(--accent); opacity: 0.6;
}

/* Spacer column absorbs remaining horizontal space */
#memola-dt th.memola-th-spacer, #memola-dt td.memola-td-spacer {
  width: auto; min-width: 0; padding: 0; background: transparent;
  border-bottom: 1px solid rgba(42, 42, 38, 0.04);
}
#memola-dt tr:hover td.memola-td-spacer { background: transparent; }
#memola-dadd {
  display: flex; align-items: center; gap: 4px;
  margin: 6px 0 16px; padding: 6px 10px;
  border: none; background: transparent;
  color: var(--ink-4); cursor: pointer; font-size: var(--fs-sm);
  border-radius: var(--r-2); font-family: inherit;
}
#memola-dadd:hover { color: var(--ink); background: var(--paper-2); }
#memola-dt th.memola-th-add {
  cursor: pointer; color: var(--ink-4); opacity: 0.7;
  width: 36px; text-align: center;
  font-size: 14px; font-weight: 300; padding: 0;
  background: var(--paper);
}
#memola-dt th.memola-th-add:hover { opacity: 1; color: var(--ink); background: var(--paper-2); }
#memola-dt th.memola-th-del, #memola-dt td.memola-td-del { width: 32px; padding: 0; }

/* \u2500\u2500 Row selection checkbox (Notion-style hover-reveal) \u2500\u2500 */
#memola-dt th.memola-th-cb, #memola-dt td.memola-td-cb,
#memola-lib-dt th.memola-th-cb, #memola-lib-dt td.memola-td-cb {
  width: 24px; padding: 0; text-align: center;
}
#memola-overlay .memola-cb {
  margin: 0; cursor: pointer; vertical-align: middle;
  width: 14px; height: 14px;
}
/* Body checkboxes: hidden by default, shown on row hover or when any selected */
#memola-overlay #memola-dt tbody td.memola-td-cb .memola-cb,
#memola-overlay #memola-lib-dt tbody td.memola-td-cb .memola-cb { visibility: hidden; }
#memola-overlay #memola-dt tbody tr:hover td.memola-td-cb .memola-cb,
#memola-overlay #memola-dt.memola-has-sel tbody td.memola-td-cb .memola-cb,
#memola-overlay #memola-lib-dt tbody tr:hover td.memola-td-cb .memola-cb,
#memola-overlay #memola-lib-dt.memola-has-sel tbody td.memola-td-cb .memola-cb { visibility: visible; }
/* Header checkbox: shown on header hover or when any selected */
#memola-overlay #memola-dt thead th.memola-th-cb .memola-cb,
#memola-overlay #memola-lib-dt thead th.memola-th-cb .memola-cb { visibility: hidden; }
#memola-overlay #memola-dt thead:hover th.memola-th-cb .memola-cb,
#memola-overlay #memola-dt.memola-has-sel thead th.memola-th-cb .memola-cb,
#memola-overlay #memola-lib-dt thead:hover th.memola-th-cb .memola-cb,
#memola-overlay #memola-lib-dt.memola-has-sel thead th.memola-th-cb .memola-cb { visibility: visible; }
/* Selected-row highlight */
#memola-overlay #memola-dt tr.memola-tr-sel td,
#memola-overlay #memola-lib-dt tr.memola-tr-sel td { background: var(--accent-soft); }

/* \u2500\u2500 Bulk-actions toolbar (paper-toned, anchored above filter bar) \u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* Position is set by db-bulk.ts to hover just above the filter/sort/group row. */
#memola-overlay .memola-db-bulkbar {
  position: fixed; top: 0; left: 50%;
  transform: translateX(-50%) translateY(-4px);
  display: none; align-items: center; gap: 8px;
  padding: 6px 8px 6px 14px;
  background: var(--paper); color: var(--ink);
  border: 1px solid var(--paper-3);
  border-radius: var(--r-3);
  box-shadow: var(--sh-flyout);
  font-family: var(--font-ui); font-size: var(--fs-sm);
  z-index: 2147483646;
  opacity: 0; transition: opacity .12s, transform .12s;
  pointer-events: none;
}
#memola-overlay .memola-db-bulkbar.on {
  display: flex; opacity: 1; transform: translateX(-50%) translateY(0);
  pointer-events: auto;
}
#memola-overlay .memola-db-bulkbar-count {
  padding-right: 10px; border-right: 1px solid var(--paper-3);
  white-space: nowrap; color: var(--ink-3); font-weight: 500;
}
#memola-overlay .memola-db-bulkbar-btn {
  border: 1px solid var(--paper-3);
  background: var(--paper); color: var(--ink);
  padding: 5px 12px; border-radius: var(--r-2);
  font-family: inherit; font-size: var(--fs-sm); cursor: pointer;
  transition: background var(--tr-fast), border-color var(--tr-fast), color var(--tr-fast);
}
#memola-overlay .memola-db-bulkbar-btn:hover {
  background: var(--paper-2); border-color: var(--ink-4);
}
#memola-overlay .memola-db-bulkbar-btn.danger:hover {
  background: rgba(225, 88, 88, 0.10);
  border-color: var(--danger); color: var(--danger);
}
#memola-overlay .memola-db-bulkbar-btn.ghost {
  background: transparent; color: var(--ink-3); border-color: transparent;
}
#memola-overlay .memola-db-bulkbar-btn.ghost:hover {
  background: var(--paper-2); color: var(--ink);
}
#memola-overlay .memola-del-btn {
  opacity: 0; border: none; background: transparent; cursor: pointer;
  color: var(--ink-3); font-size: 14px; padding: 4px 6px; border-radius: 3px;
  display: block; margin: auto;
}
#memola-dt tr:hover .memola-del-btn { opacity: 1; }
#memola-overlay .memola-del-btn:hover { background: rgba(184, 83, 74, .12); color: var(--danger); }

/* \u2500\u2500 DB drag-reorder indicators \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* Column header drag */
#memola-overlay #memola-dt th { cursor: grab; }
#memola-overlay #memola-dt th.memola-th-dragging { opacity: 0.4; }
#memola-overlay #memola-dt th.memola-th-drop-before { box-shadow: inset 3px 0 0 var(--accent); }
#memola-overlay #memola-dt th.memola-th-drop-after  { box-shadow: inset -3px 0 0 var(--accent); }
/* Table row drag \u2014 single floating line (positioned by db-row-drag.ts) */
#memola-overlay #memola-dt tr.memola-tr-dragging { opacity: 0.4; }
#memola-overlay .memola-row-drop-line {
  position: fixed; height: 2px; pointer-events: none;
  z-index: 2147483647; display: none;
  background: var(--accent); border-radius: 1px;
}
#memola-overlay .memola-row-drop-line.on { display: block; }
/* Kanban / gallery card drag */
#memola-overlay .memola-kb-card { cursor: grab; }
#memola-overlay .memola-kb-card.memola-kb-card-dragging,
#memola-overlay .memola-gv-card.memola-kb-card-dragging { opacity: 0.08; }
/* Selected card (multi-select via shift+click) \u2014 bold accent outline */
#memola-overlay .memola-kb-card.memola-card-sel,
#memola-overlay .memola-gv-card.memola-card-sel {
  outline: 2px solid var(--accent); outline-offset: -1px;
  background: var(--accent-soft);
}
/* Floating card-drop-line (kanban: horizontal, gallery: vertical) */
#memola-overlay .memola-card-drop-line {
  position: fixed; height: 2px; pointer-events: none;
  z-index: 2147483647; display: none;
  background: var(--accent); border-radius: 1px;
}
#memola-overlay .memola-card-drop-line.on { display: block; }
#memola-overlay .memola-card-drop-line.vertical { height: auto; width: 2px; }
/* Generic list drag (still uses item-drop-* on the list view's plain rows) */
#memola-overlay .memola-item-dragging { opacity: 0.08; }
#memola-overlay .memola-item-drop-before { box-shadow: inset 0 3px 0 var(--accent); }
#memola-overlay .memola-item-drop-after  { box-shadow: inset 0 -3px 0 var(--accent); }

/* DB row "open as page" button \u2014 shared across all views */
#memola-overlay .memola-row-open {
  border: none; background: var(--paper); color: var(--ink-3);
  width: 22px; height: 22px; border-radius: var(--r-1);
  cursor: pointer; opacity: 0; font-size: 12px;
  display: inline-flex; align-items: center; justify-content: center;
  transition: opacity var(--tr-fast), background var(--tr-fast);
  flex-shrink: 0;
}
/* Table cell: absolutely positioned in the title cell */
#memola-overlay #memola-dt td .memola-row-open {
  position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
}
#memola-overlay #memola-dt tr:hover .memola-row-open,
#memola-overlay .memola-kb-card:hover .memola-row-open,
#memola-overlay .memola-lv-row:hover .memola-row-open,
#memola-overlay .memola-gv-card:hover .memola-row-open,
#memola-overlay .memola-cal-event:hover .memola-row-open,
#memola-overlay .memola-gantt-label:hover .memola-row-open { opacity: 1; }
#memola-overlay .memola-row-open:hover { background: var(--paper-2-strong); color: var(--ink); }

/* View-specific layout tweaks for the inline button */
#memola-overlay .memola-kb-card { display: flex; align-items: center; gap: 6px; }
#memola-overlay .memola-kb-card-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
#memola-overlay .memola-lv-row { display: flex; align-items: center; gap: 8px; }
#memola-overlay .memola-lv-row > div { min-width: 0; }
#memola-overlay .memola-lv-row .memola-lv-title { flex: 0 0 auto; }
#memola-overlay .memola-lv-row .memola-lv-sub { flex: 1; min-width: 0; }
#memola-overlay .memola-gv-card { position: relative; }
#memola-overlay .memola-gv-card .memola-row-open { position: absolute; top: 6px; right: 6px; }
#memola-overlay .memola-cal-event { display: flex; align-items: center; gap: 4px; }
#memola-overlay .memola-cal-event-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
#memola-overlay .memola-gantt-label { display: flex; align-items: center; gap: 4px; }
#memola-overlay .memola-gantt-label-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }

/* DB Select chips \u2014 Notion\u98A8\u30D1\u30B9\u30C6\u30EB */
#memola-overlay .memola-select-chip {
  display: inline-block; padding: 1px 8px; border-radius: 4px;
  font-size: var(--fs-xs); font-weight: 400; white-space: nowrap;
  letter-spacing: 0.01em;
}
#memola-overlay .memola-sc-0 { background: #e8e4d8; color: #4a463f; }                 /* paper-3 / ink-2 */
#memola-overlay .memola-sc-1 { background: #dde6dc; color: #3d5247; }                 /* moss soft */
#memola-overlay .memola-sc-2 { background: #dce2e6; color: #33495a; }                 /* slate */
#memola-overlay .memola-sc-3 { background: #e8dccf; color: #5a4a32; }                 /* sand */
#memola-overlay .memola-sc-4 { background: #f0d8d2; color: #6b3a30; }                 /* terracotta */
#memola-overlay .memola-sc-5 { background: #f0e3ef; color: #523a55; }                 /* rose */

/* \u30BF\u30A4\u30C8\u30EB\u5217 (Title) \u3092\u5F37\u8ABF */
#memola-dt td:first-child .memola-dc {
  font-weight: 500; color: var(--ink);
}

/* \u2500\u2500 Kanban \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-kb {
  flex: 1; overflow-x: auto; display: none; padding: 16px 32px; gap: 16px;
  align-items: flex-start;
}
#memola-kb.on { display: flex; }
#memola-overlay .memola-kb-col {
  min-width: 220px; max-width: 260px; flex-shrink: 0;
  background: rgba(55,53,47,.04); border-radius: 8px; padding: 12px;
}
#memola-overlay .memola-kb-col-hd {
  font-size: 13px; font-weight: 600; color: var(--ink-3);
  padding: 0 0 8px; margin-bottom: 8px;
  border-bottom: 1px solid rgba(55,53,47,.09);
}
#memola-overlay .memola-kb-card {
  background: #fff; border-radius: 6px; padding: 10px 12px;
  margin-bottom: 8px; cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,.06);
  font-size: 14px; transition: box-shadow 0.1s;
}
#memola-overlay .memola-kb-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,.1); }

/* \u2500\u2500 Column add modal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-col-md {
  position: fixed; inset: 0; background: rgba(15, 15, 15, .35);
  display: none; align-items: center; justify-content: center; z-index: 2147483647;
  backdrop-filter: blur(2px);
  padding: 24px;
}
#memola-col-md.on { display: flex; }
#memola-overlay .memola-col-row { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
#memola-overlay .memola-col-row label {
  font-size: var(--fs-xs); font-weight: 500; color: var(--ink-3);
  letter-spacing: .03em;
}
#memola-overlay .memola-col-inp,
#memola-overlay .memola-col-sel {
  width: 100%; padding: 8px 14px; height: 36px;
  border: 1px solid var(--paper-3);
  border-radius: var(--r-2); font-size: var(--fs-sm); font-family: inherit; outline: none;
  color: var(--ink); background: var(--paper);
  transition: border-color .1s, box-shadow .1s;
  box-sizing: border-box;
}
#memola-overlay .memola-col-inp:hover,
#memola-overlay .memola-col-sel:hover { background: rgba(242, 241, 238, 1); }
#memola-overlay .memola-col-inp:focus,
#memola-overlay .memola-col-sel:focus {
  border-color: var(--accent); background: #fff;
  box-shadow: 0 0 0 1px rgba(35, 131, 226, .3);
}
#memola-overlay .memola-col-inp::placeholder { color: rgba(55, 53, 47, .35); }
#memola-overlay .memola-col-sel {
  appearance: none; -webkit-appearance: none; padding-right: 28px; cursor: pointer;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='none' stroke='%2337352f' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' d='M1 1l4 4 4-4'/></svg>");
  background-repeat: no-repeat; background-position: right 10px center;
}
#memola-overlay #memola-col-type-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;
  margin-top: 4px;
}
#memola-overlay .memola-col-type {
  padding: 6px 8px; border: 1px solid var(--paper-3); border-radius: var(--r-2);
  background: var(--paper); cursor: pointer;
  display: flex; align-items: center; gap: 6px;
  font-size: var(--fs-sm); color: var(--ink);
  transition: background var(--tr-fast), border-color var(--tr-fast);
  white-space: nowrap; overflow: hidden;
}
#memola-overlay .memola-col-type:hover { background: var(--paper-2); }
#memola-overlay .memola-col-type.on {
  background: var(--accent-soft); border-color: var(--accent);
}
#memola-overlay .memola-col-type-ic {
  font-size: 12px; width: 16px; text-align: center; flex-shrink: 0;
  font-family: var(--font-mono); color: var(--ink-3);
}
#memola-overlay .memola-col-type.on .memola-col-type-ic { color: var(--accent-strong); }

#memola-overlay #memola-col-choices-row { display: none; }
#memola-overlay #memola-col-choices-row.on { display: flex; }
#memola-overlay #memola-col-choices {
  width: 100%; height: 80px; padding: 8px 12px;
  border: 1px solid rgba(55, 53, 47, .16);
  border-radius: 4px; font-size: 13px; font-family: inherit; outline: none;
  resize: vertical; color: var(--ink); background: rgba(242, 241, 238, .6);
  transition: border-color .1s, box-shadow .1s, background .1s;
  box-sizing: border-box; line-height: 1.5;
}
#memola-overlay #memola-col-choices:hover { background: rgba(242, 241, 238, 1); }
#memola-overlay #memola-col-choices:focus {
  border-color: var(--accent); background: #fff;
  box-shadow: 0 0 0 1px rgba(35, 131, 226, .3);
}

/* \u2500\u2500 Scrollbar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay ::-webkit-scrollbar { width: 6px; height: 6px; }
#memola-overlay ::-webkit-scrollbar-thumb { background: #d3d3d0; border-radius: 3px; }
#memola-overlay ::-webkit-scrollbar-track { background: transparent; }

/* \u2500\u2500 Close-app confirmation modal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-close-confirm {
  position: fixed; inset: 0; z-index: 2147483647;
  background: rgba(15, 15, 15, .35); backdrop-filter: blur(2px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px; font-family: var(--font-ui);
}
#memola-overlay .memola-close-confirm-box {
  background: var(--paper); border-radius: var(--r-3);
  padding: 22px 22px 18px; max-width: 420px; width: 100%;
  box-shadow: var(--sh-modal); color: var(--ink);
}
#memola-overlay .memola-close-confirm-msg {
  font-size: var(--fs-md); line-height: 1.55; color: var(--ink);
  margin-bottom: 18px;
}
#memola-overlay .memola-close-confirm-btns {
  display: flex; justify-content: flex-end; gap: 10px;
}

/* \u2500\u2500 3-way merge modal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-merge-md {
  position: fixed; inset: 0; background: rgba(15, 15, 15, .35);
  display: flex; align-items: center; justify-content: center;
  z-index: 2147483647; backdrop-filter: blur(2px);
  padding: 16px; font-family: var(--font-ui);
}
#memola-overlay .memola-merge-box {
  background: var(--paper); border-radius: var(--r-3); box-shadow: var(--sh-modal);
  width: 100%; max-width: 1200px; max-height: 92vh;
  display: flex; flex-direction: column; overflow: hidden;
  color: var(--ink);
}
#memola-overlay .memola-merge-header {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 14px 18px; border-bottom: 1px solid var(--paper-3);
}
#memola-overlay .memola-merge-title { font-size: var(--fs-md); font-weight: 600; flex: 0 0 auto; }
#memola-overlay .memola-merge-status {
  flex: 1; display: flex; flex-direction: column; gap: 2px;
  font-size: var(--fs-sm);
}
#memola-overlay .memola-merge-meta { color: var(--ink-3); font-size: var(--fs-xs); }
#memola-overlay .memola-merge-ok { color: #2f6f5e; font-weight: 500; }
#memola-overlay .memola-merge-warn { color: #c47f1c; font-weight: 500; }
#memola-overlay .memola-merge-close {
  background: transparent; border: none; cursor: pointer;
  padding: 2px 8px; font-size: 18px; color: var(--ink-3);
  border-radius: 4px; line-height: 1;
}
#memola-overlay .memola-merge-close:hover { background: var(--paper-2); color: var(--ink); }
#memola-overlay .memola-merge-body {
  flex: 1; display: grid;
  grid-template-columns: minmax(320px, 1fr) minmax(360px, 1.4fr);
  gap: 0; overflow: hidden; min-height: 0;
}
#memola-overlay .memola-merge-conflicts {
  overflow-y: auto; padding: 12px 14px;
  border-right: 1px solid var(--paper-3);
  background: var(--paper-2);
}
#memola-overlay .memola-merge-empty {
  padding: 24px 16px; text-align: center; color: var(--ink-3);
  font-size: var(--fs-sm); line-height: 1.6;
}
#memola-overlay .memola-merge-conflict {
  margin-bottom: 14px; padding: 10px 12px;
  background: var(--paper); border: 1px solid var(--paper-3);
  border-left: 3px solid #c47f1c;
  border-radius: var(--r-2);
}
#memola-overlay .memola-merge-conflict.resolved {
  border-left-color: #2f6f5e; opacity: 0.75;
}
#memola-overlay .memola-merge-conflict-hd {
  font-size: var(--fs-sm); font-weight: 600; margin-bottom: 8px;
  display: flex; align-items: center; gap: 8px;
}
#memola-overlay .memola-merge-decided {
  font-size: var(--fs-xs); font-weight: 500;
  color: #2f6f5e; background: rgba(47, 111, 94, 0.10);
  padding: 1px 6px; border-radius: 3px;
}
#memola-overlay .memola-merge-side { margin-bottom: 6px; }
#memola-overlay .memola-merge-side-hd {
  font-size: var(--fs-xs); color: var(--ink-3); font-weight: 500;
  margin-bottom: 2px;
}
#memola-overlay .memola-merge-side pre {
  margin: 0; padding: 6px 8px; border-radius: 3px;
  font: 12px var(--font-mono, monospace); white-space: pre-wrap;
  word-break: break-word; line-height: 1.4;
}
#memola-overlay .memola-merge-yours pre { background: rgba(47, 111, 94, 0.08); }
#memola-overlay .memola-merge-theirs pre { background: rgba(196, 127, 28, 0.08); }
#memola-overlay .memola-merge-base { margin-top: 6px; }
#memola-overlay .memola-merge-base summary {
  font-size: var(--fs-xs); color: var(--ink-3); cursor: pointer;
}
#memola-overlay .memola-merge-base pre {
  margin: 4px 0 0; padding: 6px 8px; border-radius: 3px;
  background: var(--paper-2); font: 12px var(--font-mono, monospace);
  white-space: pre-wrap; word-break: break-word; line-height: 1.4;
  color: var(--ink-3);
}
#memola-overlay .memola-merge-buttons {
  display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;
}
#memola-overlay .memola-merge-buttons button {
  flex: 1; min-width: 90px; padding: 4px 10px;
  font-size: var(--fs-xs);
}
#memola-overlay .memola-merge-preview {
  display: flex; flex-direction: column; min-height: 0;
}
#memola-overlay .memola-merge-editor-label {
  font-size: var(--fs-xs); color: var(--ink-3);
  padding: 10px 14px 6px;
}
#memola-overlay .memola-merge-preview-content {
  flex: 1; margin: 0 14px 14px;
  border: 1px solid var(--paper-3); border-radius: var(--r-2);
  padding: 14px 16px;
  background: var(--paper); color: var(--ink);
  line-height: 1.65; font-size: var(--fs-sm);
  overflow-y: auto;
}
#memola-overlay .memola-merge-preview-content > *:first-child { margin-top: 0; }
#memola-overlay .memola-merge-preview-content > *:last-child { margin-bottom: 0; }
#memola-overlay .memola-merge-preview-pending {
  color: var(--ink-3); font-style: italic; padding: 12px;
  background: rgba(196, 127, 28, 0.08);
  border-left: 3px solid rgba(196, 127, 28, 0.5);
  border-radius: 3px;
}
#memola-overlay .memola-merge-foot {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 18px; border-top: 1px solid var(--paper-3);
}
#memola-overlay .memola-merge-help {
  flex: 1; font-size: var(--fs-xs); color: var(--ink-3); line-height: 1.4;
}
#memola-overlay .memola-merge-foot button { min-width: 110px; }
#memola-overlay .memola-merge-foot button[disabled] {
  opacity: 0.5; cursor: not-allowed;
}

/* \u2500\u2500 Keyboard shortcut cheatsheet modal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-shortcuts-md {
  position: fixed; inset: 0; background: rgba(15, 15, 15, .35);
  display: flex; align-items: center; justify-content: center;
  z-index: 2147483647; backdrop-filter: blur(2px); padding: 24px;
  font-family: var(--font-ui);
}
#memola-overlay .memola-shortcuts-mb {
  max-width: 760px !important; width: 100% !important;
  max-height: 88vh; display: flex; flex-direction: column;
}
#memola-overlay .memola-shortcuts-grid {
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 28px; overflow-y: auto;
  padding: 4px 2px 4px 0;
}
@media (max-width: 640px) {
  #memola-overlay .memola-shortcuts-grid { grid-template-columns: 1fr; }
}
#memola-overlay .memola-shortcuts-sec h3 {
  margin: 0 0 8px; font-size: var(--fs-sm); font-weight: 600;
  color: var(--ink-3); letter-spacing: .03em;
  border-bottom: 1px dashed var(--paper-3); padding-bottom: 4px;
}
#memola-overlay .memola-shortcuts-sec ul {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 4px;
}
#memola-overlay .memola-shortcuts-sec li {
  display: flex; align-items: center; gap: 12px;
  font-size: var(--fs-sm); color: var(--ink); padding: 3px 0;
}
#memola-overlay .memola-shortcuts-keys {
  flex-shrink: 0; min-width: 130px;
  display: inline-flex; align-items: center; gap: 2px;
}
#memola-overlay .memola-shortcuts-desc { color: var(--ink-2); flex: 1; }
#memola-overlay .memola-kbd {
  display: inline-block; padding: 2px 7px; min-width: 16px;
  border: 1px solid var(--paper-3); border-bottom-width: 2px;
  border-radius: 4px; background: var(--paper-2);
  color: var(--ink); font: 500 11px var(--font-mono, monospace);
  line-height: 1.4; text-align: center;
}
#memola-overlay .memola-kbd-plus {
  display: inline-block; margin: 0 2px; color: var(--ink-3); font-size: 11px;
}


/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 \u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8 (cross-document RAG chat) \u2014 外部ベクトル \u30EC\u30A4\u30A2\u30A6\u30C8\u5FE0\u5B9F\u79FB\u690D \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
/* \u8D77\u52D5\u30DC\u30BF\u30F3 (+\u65B0\u898F\u306E\u96A3) */
.memola-quick-wrap{display:flex;align-items:center;gap:6px}
#memola-overlay .memola-quick-add{flex:0 0 auto;min-width:0}
/* \u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8\u8D77\u52D5: \u30A2\u30A4\u30B3\u30F3\uFF0B\u30E9\u30D9\u30EB\u306E\u30BB\u30AB\u30F3\u30C0\u30EA\u30DC\u30BF\u30F3(\u6B8B\u308A\u5E45\u3092\u57CB\u3081\u308B)\u3002 */
#memola-overlay .memola-quick-chat{
  flex:1 1 auto;min-width:0;height:30px;padding:0 10px;
  display:flex;align-items:center;justify-content:center;gap:6px;
  border:1px solid var(--accent-soft,rgba(122,138,120,.45));border-radius:var(--r-2,6px);
  background:var(--accent-soft,rgba(122,138,120,.14));cursor:pointer;
  color:var(--accent-strong,#5e6f5c);font-family:inherit;font-size:var(--fs-sm);font-weight:600;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:background var(--tr-fast),border-color var(--tr-fast);
}
#memola-overlay .memola-quick-chat:hover{background:var(--accent,#7a8a78);border-color:var(--accent,#7a8a78);color:var(--paper,#fff)}
#memola-overlay .memola-quick-chat svg{width:15px;height:15px;flex:0 0 auto}
#memola-sb.rail .memola-quick-chat{display:none}

/* \u2500\u2500 \u30D1\u30CD\u30EB\u672C\u4F53: 外部ベクトル \u306E\u30C7\u30B6\u30A4\u30F3\u30C8\u30FC\u30AF\u30F3\u3092\u30B9\u30B3\u30FC\u30D7\u5185\u306B\u5B9A\u7FA9 (\u30C6\u30FC\u30DE\u306B\u4F9D\u3089\u305A 外部ベクトル \u898B\u305F\u76EE) \u2500\u2500 */
#memola-xchat{
  --ink:#2a2a26; --ink-3:#7a766c; --ink-4:#a8a39a;
  --paper:#fafaf7; --paper-2:#f3f1ea; --paper-3:#e8e4d8;
  --line:rgba(42,42,38,.12); --line-strong:rgba(42,42,38,.18);
  --accent:#7a8a78; --accent-soft:rgba(122,138,120,.18); --accent-strong:#5e6f5c;
  --danger:#b8534a; --danger-soft:rgba(184,83,74,.12); --hl:rgba(196,127,28,.28);
  --font-mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  --fs-xs:11px; --fs-sm:12px; --fs-md:13px; --fs-base:15px; --fs-lg:16px; --fs-xl:18px;
  --s-1:4px; --s-2:6px; --s-3:8px; --s-4:10px; --s-5:12px; --s-6:14px; --s-7:18px; --s-8:22px; --s-9:28px;
  --r-1:2px; --r-2:4px; --r-3:6px; --r-4:8px;
  --topbar-h:48px; --gutter:24px; --thread-w:760px;
  position:fixed;top:0;right:0;bottom:0;left:280px;z-index:60;display:none;flex-direction:row;
  background:var(--paper);color:var(--ink);font-size:var(--fs-base);line-height:1.6;
  box-shadow:-2px 0 22px rgba(0,0,0,.10);opacity:0;transition:opacity .16s ease;
}
#memola-xchat.on{display:flex;opacity:1}
/* \u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8\u30BF\u30D6\u8868\u793A\u4E2D\u306F\u3001\u30DA\u30FC\u30B8\u7DE8\u96C6\u7528\u306E\u30D1\u30F3\u304F\u305A\u884C(\u30BF\u30A4\u30C8\u30EB/\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8/\u4FDD\u5B58\u6E08/
   \u76EE\u6B21/\u30D7\u30ED\u30D1\u30C6\u30A3/AI)\u3068\u66F8\u5F0F\u30C4\u30FC\u30EB\u30D0\u30FC(H1/H2\u2026)\u3092\u96A0\u3059\u3002\u30BF\u30D6\u5217(#memola-tabbar)\u306F\u6B8B\u3059\u3002 */
#memola-xchat.on ~ #memola-main #memola-top,
#memola-xchat.on ~ #memola-main #memola-tb{display:none !important}

/* \u30B5\u30A4\u30C9\u30D0\u30FC (\u30BB\u30C3\u30B7\u30E7\u30F3\u4E00\u89A7) */
#memola-xchat .tdr-sidebar{flex:0 0 248px;display:flex;flex-direction:column;min-height:0;background:var(--paper-2);border-right:1px solid var(--line);overflow:hidden}
#memola-xchat .tdr-new-session{display:flex;align-items:center;justify-content:center;gap:var(--s-3);margin:var(--s-5);padding:var(--s-4) var(--s-5);font:inherit;font-size:var(--fs-md);font-weight:600;color:#fff;background:var(--accent);border:1px solid var(--accent);border-radius:var(--r-3);cursor:pointer}
#memola-xchat .tdr-new-session:hover{background:var(--accent-strong);border-color:var(--accent-strong)}
#memola-xchat .tdr-new-session svg{width:15px;height:15px}
#memola-xchat .tdr-session-list{flex:1;min-height:0;overflow-y:auto;padding:0 var(--s-3) var(--s-5);display:flex;flex-direction:column;gap:2px}
#memola-xchat .tdr-session-empty{padding:var(--s-5);font-size:var(--fs-sm);color:var(--ink-4);text-align:center}
#memola-xchat .tdr-session{display:flex;align-items:center;gap:var(--s-3);padding:var(--s-4);border-radius:var(--r-3);cursor:pointer;color:var(--ink);position:relative}
#memola-xchat .tdr-session:hover{background:var(--paper-3)}
#memola-xchat .tdr-session.is-active{background:var(--accent-soft);color:var(--accent-strong)}
#memola-xchat .tdr-session-ic{flex:0 0 auto;color:var(--ink-4);display:inline-flex}
#memola-xchat .tdr-session-ic svg{width:15px;height:15px}
#memola-xchat .tdr-session.is-active .tdr-session-ic{color:var(--accent-strong)}
#memola-xchat .tdr-session-title{flex:1;min-width:0;font-size:var(--fs-md);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#memola-xchat .tdr-session-del{flex:0 0 auto;display:none;align-items:center;justify-content:center;width:22px;height:22px;padding:0;border:none;background:transparent;color:var(--ink-4);border-radius:var(--r-1);cursor:pointer;font-size:15px;line-height:1}
#memola-xchat .tdr-session:hover .tdr-session-del{display:inline-flex}
#memola-xchat .tdr-session-del:hover{color:var(--danger);background:var(--danger-soft)}

/* \u30C1\u30E3\u30C3\u30C8\u5217 */
#memola-xchat .tdr-chat{flex:1;min-width:0;display:flex;flex-direction:column;min-height:0}
#memola-xchat .tdr-topbar{display:flex;align-items:center;gap:var(--s-4);height:var(--topbar-h);padding:0 var(--gutter);border-bottom:1px solid var(--line);background:var(--paper);flex:0 0 auto}
#memola-xchat .tdr-brand{display:flex;align-items:baseline;gap:var(--s-3);min-width:0;overflow:hidden}
#memola-xchat .tdr-brand .mark{font-family:var(--font-mono);color:var(--accent-strong);font-size:var(--fs-xl);font-weight:600;line-height:1}
#memola-xchat .tdr-brand .name{font-size:var(--fs-lg);font-weight:600;color:var(--ink);line-height:1}
#memola-xchat .tdr-brand .sub{font-size:var(--fs-xs);color:var(--ink-3);font-weight:400;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#memola-xchat .tdr-icon-btn{flex:0 0 auto;width:30px;height:30px;display:grid;place-items:center;border:1px solid var(--line);border-radius:var(--r-2);background:var(--paper-2);color:var(--ink-3);cursor:pointer}
#memola-xchat .tdr-icon-btn:hover{color:var(--accent-strong);border-color:var(--accent-strong);background:var(--accent-soft)}
#memola-xchat .tdr-icon-btn svg{width:15px;height:15px}
#memola-xchat .tdr-btn-labeled{width:auto;gap:6px;padding:0 12px;display:inline-flex;align-items:center;font:inherit;font-size:var(--fs-sm);font-weight:600;white-space:nowrap;background:var(--accent);color:#fff;border-color:var(--accent)}
#memola-xchat .tdr-btn-labeled:hover{background:var(--accent-strong);border-color:var(--accent-strong);color:#fff}
#memola-xchat .tdr-btn-labeled.spin{opacity:.7}
#memola-xchat #memola-xchat-rebuild.spin svg{animation:memola-xspin 1s linear infinite}
@keyframes memola-xspin{to{transform:rotate(360deg)}}

/* \u30B9\u30EC\u30C3\u30C9 */
#memola-xchat .tdr-thread{flex:1;min-height:0;overflow:auto;padding:var(--gutter) var(--gutter) var(--s-7)}
#memola-xchat .tdr-turn{max-width:var(--thread-w);margin:0 auto var(--s-9)}
#memola-xchat .tdr-q{margin-left:auto;max-width:80%;width:fit-content;background:var(--accent-soft);color:var(--ink);padding:var(--s-4) var(--s-5);border-radius:var(--r-4) var(--r-4) var(--r-1) var(--r-4);font-size:var(--fs-base);white-space:pre-wrap;word-break:break-word}
#memola-xchat .tdr-a{display:flex;gap:var(--s-4);margin-top:var(--s-6)}
#memola-xchat .tdr-a-avatar{flex:0 0 auto;width:28px;height:28px;border-radius:50%;background:var(--accent-soft);color:var(--accent-strong);display:flex;align-items:center;justify-content:center;font-weight:600;font-size:11px;font-family:var(--font-mono)}
#memola-xchat .tdr-a-body{flex:1;min-width:0}
#memola-xchat .tdr-a-meta{display:flex;align-items:center;gap:var(--s-4);margin:0 0 var(--s-3);font-size:var(--fs-sm);color:var(--ink-3)}
#memola-xchat .tdr-a-meta .mono,#memola-xchat .tdr-turn-time{font-family:var(--font-mono);color:var(--ink-4)}
#memola-xchat .tdr-answer{font-size:var(--fs-base);color:var(--ink);line-height:1.85}
#memola-xchat .tdr-answer p{margin:0 0 var(--s-4)}
#memola-xchat .tdr-answer p:last-child{margin-bottom:0}
#memola-xchat .tdr-answer h1,#memola-xchat .tdr-answer h2,#memola-xchat .tdr-answer h3,#memola-xchat .tdr-answer h4{margin:var(--s-6) 0 var(--s-3);font-weight:600;line-height:1.4}
#memola-xchat .tdr-answer h1{font-size:var(--fs-xl)}#memola-xchat .tdr-answer h2{font-size:var(--fs-lg)}#memola-xchat .tdr-answer h3{font-size:var(--fs-base)}
#memola-xchat .tdr-answer ul,#memola-xchat .tdr-answer ol{margin:0 0 var(--s-4);padding-left:1.5em}
#memola-xchat .tdr-answer li{margin:var(--s-1) 0}
#memola-xchat .tdr-answer blockquote{margin:0 0 var(--s-4);padding:var(--s-2) var(--s-5);border-left:3px solid var(--line-strong);color:var(--ink-3)}
#memola-xchat .tdr-answer code{font-family:var(--font-mono);font-size:.9em;background:var(--paper-2);border:1px solid var(--line);border-radius:var(--r-1);padding:1px 5px}
#memola-xchat .tdr-answer pre{margin:0 0 var(--s-4);padding:var(--s-4) var(--s-5);background:var(--paper-2);border:1px solid var(--line);border-radius:var(--r-3);overflow:auto}
#memola-xchat .tdr-answer pre code{background:none;border:none;padding:0;font-size:var(--fs-sm)}
#memola-xchat .tdr-answer a{color:var(--accent-strong);text-decoration:underline}
#memola-xchat .tdr-answer strong{font-weight:600}
#memola-xchat .tdr-answer .cite{font-family:var(--font-mono);font-size:var(--fs-xs);color:var(--accent-strong);background:var(--accent-soft);border-radius:var(--r-1);padding:0 4px;margin:0 1px;cursor:pointer}
#memola-xchat .tdr-thinking{display:inline-flex;align-items:center;color:var(--ink-3);font-size:var(--fs-base)}
#memola-xchat .tdr-thinking .tdr-dot{display:inline-block;width:4px;height:4px;margin-left:4px;border-radius:50%;background:var(--accent-strong);animation:tdr-bounce 1.2s infinite ease-in-out}
#memola-xchat .tdr-thinking .tdr-dot:nth-of-type(2){animation-delay:.18s}
#memola-xchat .tdr-thinking .tdr-dot:nth-of-type(3){animation-delay:.36s}
@keyframes tdr-bounce{0%,80%,100%{transform:scale(.5);opacity:.4}40%{transform:scale(1);opacity:1}}
#memola-xchat .tdr-err{color:var(--danger);font-size:var(--fs-sm);margin-top:var(--s-3)}

/* \u51FA\u5178 (\u6298\u308A\u305F\u305F\u307F\u30D8\u30C3\u30C0 + \u30AB\u30FC\u30C9) */
#memola-xchat .tdr-sources-h{display:flex;align-items:center;gap:var(--s-3);margin:var(--s-6) 0 var(--s-3);font-size:var(--fs-sm);color:var(--ink-3);cursor:pointer;user-select:none}
#memola-xchat .tdr-sources-h svg{width:13px;height:13px;transition:transform .15s}
#memola-xchat .tdr-sources-h.collapsed svg{transform:rotate(-90deg)}
#memola-xchat .tdr-sources.collapsed{display:none}
#memola-xchat .tdr-hit{padding:var(--s-5);border:1px solid var(--line);border-radius:var(--r-3);margin-bottom:var(--s-3);cursor:pointer;background:var(--paper)}
#memola-xchat .tdr-hit:hover{background:var(--paper-2);border-color:var(--line-strong)}
#memola-xchat .tdr-hit-head{display:flex;align-items:center;gap:var(--s-3)}
#memola-xchat .tdr-hit-num{flex:0 0 auto;font-family:var(--font-mono);font-size:var(--fs-xs);color:var(--accent-strong);background:var(--accent-soft);width:20px;height:20px;border-radius:var(--r-1);display:inline-flex;align-items:center;justify-content:center}
#memola-xchat .tdr-hit-badge{flex:0 0 auto;font-size:var(--fs-xs);padding:1px 6px;border-radius:99px;background:var(--paper-2);border:1px solid var(--line);color:var(--ink-3)}
#memola-xchat .tdr-hit-subject{font-size:var(--fs-base);font-weight:600;color:var(--ink);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#memola-xchat .tdr-hit-score{font-family:var(--font-mono);font-size:var(--fs-xs);color:var(--accent-strong);background:var(--accent-soft);padding:2px 6px;border-radius:var(--r-1);flex:0 0 auto}
#memola-xchat .tdr-hit-snippet{font-size:var(--fs-md);color:var(--ink-3);margin-top:var(--s-2);line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
#memola-xchat .tdr-hit.is-flash{box-shadow:0 0 0 2px var(--accent-strong)}

/* \u7A7A\u72B6\u614B */
#memola-xchat .tdr-empty{max-width:var(--thread-w);margin:12vh auto 0;text-align:center;color:var(--ink-3)}
#memola-xchat .tdr-empty .big{font-size:var(--fs-xl);color:var(--ink);margin-bottom:var(--s-3);font-weight:600}
#memola-xchat .tdr-empty p{margin:var(--s-2) 0;font-size:var(--fs-md)}

/* \u30B3\u30F3\u30DD\u30FC\u30B6 */
#memola-xchat .tdr-composer{flex:0 0 auto;border-top:1px solid var(--line);background:var(--paper);padding:var(--s-5) var(--gutter) var(--s-7)}
#memola-xchat .tdr-composer-inner{max-width:var(--thread-w);margin:0 auto}
#memola-xchat .tdr-note-form{position:relative;line-height:0}
#memola-xchat .tdr-note-input{width:100%;min-height:48px;max-height:40vh;padding:14px 56px 14px 16px;resize:none;font-family:inherit;font-size:var(--fs-base);line-height:1.6;color:var(--ink);background:var(--paper-2);border:1px solid var(--line);border-radius:var(--r-3);outline:none;box-sizing:border-box}
#memola-xchat .tdr-note-input:focus{background:var(--paper);border-color:var(--line-strong)}
#memola-xchat .tdr-note-input::placeholder{color:var(--ink-4)}
#memola-xchat .tdr-note-submit{position:absolute;right:11px;bottom:11px;width:26px;height:26px;border:none;background:var(--accent);color:#fff;border-radius:var(--r-2);cursor:pointer;display:flex;align-items:center;justify-content:center}
#memola-xchat .tdr-note-submit:hover{background:var(--accent-strong)}
#memola-xchat .tdr-note-submit:disabled{opacity:.4;cursor:default}
#memola-xchat .tdr-note-submit svg{width:14px;height:14px}
#memola-xchat .tdr-note-hint{margin:var(--s-2) auto 0;font-size:var(--fs-xs);color:var(--ink-4);line-height:1.4}

/* \u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8\u306E\u51FA\u529B\u3082\u30DB\u30B9\u30C8\u74B0\u5883\u306E user-select:none \u3092\u6253\u3061\u6D88\u3057\u3066\u9078\u629E\u30FB\u30B3\u30D4\u30FC\u53EF\u306B */
#memola-xchat .tdr-answer,#memola-xchat .tdr-q,#memola-xchat .tdr-a-meta,
#memola-xchat .tdr-hit-subject,#memola-xchat .tdr-hit-snippet,#memola-xchat .tdr-empty p{
  user-select:text;-webkit-user-select:text;
}
#memola-xchat .tdr-answer,#memola-xchat .tdr-q{cursor:text}

/* \u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8: Notion\u5F62\u5F0F\u306E\u5C65\u6B74(\u30BF\u30A4\u30C8\u30EB\u6A2A\u30C9\u30ED\u30C3\u30D7\u30C0\u30A6\u30F3) */
#memola-xchat .tdr-brand .mark{margin-right:2px}
#memola-xchat .tdr-titlebtn{display:inline-flex;align-items:center;gap:5px;border:0;background:transparent;cursor:pointer;font:inherit;font-size:var(--fs-lg);font-weight:600;color:var(--ink);padding:4px 8px;border-radius:var(--r-2);max-width:42vw;line-height:1.2}
#memola-xchat .tdr-titlebtn:hover{background:var(--paper-2)}
#memola-xchat .tdr-titlebtn #memola-xchat-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#memola-xchat .tdr-titlebtn svg{width:14px;height:14px;color:var(--ink-3);flex:0 0 auto}
#memola-xchat .tdr-idx{font-size:var(--fs-xs);color:var(--ink-4);white-space:nowrap;margin-left:6px}
#memola-xchat .tdr-histmenu{position:absolute;top:calc(var(--topbar-h) - 4px);left:44px;min-width:300px;max-width:440px;max-height:62vh;overflow-y:auto;background:var(--paper);border:1px solid var(--line);border-radius:var(--r-4);box-shadow:0 10px 30px rgba(0,0,0,.16);padding:6px;z-index:70;display:none}
#memola-xchat .tdr-histmenu.on{display:block}
#memola-xchat .tdr-hist-new{display:flex;align-items:center;gap:8px;width:100%;border:0;background:transparent;cursor:pointer;font:inherit;font-size:var(--fs-md);color:var(--ink);padding:8px 10px;border-radius:var(--r-2);text-align:left}
#memola-xchat .tdr-hist-new:hover{background:var(--paper-2)}
#memola-xchat .tdr-hist-new svg{width:15px;height:15px}
#memola-xchat .tdr-hist-group{font-size:var(--fs-xs);color:var(--ink-4);font-weight:600;padding:10px 10px 4px}
#memola-xchat .tdr-hist-item{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:var(--r-2);cursor:pointer;color:var(--ink);font-size:var(--fs-md)}
#memola-xchat .tdr-hist-item:hover{background:var(--paper-2)}
#memola-xchat .tdr-hist-item .chk{width:14px;flex:0 0 auto;color:var(--accent-strong);visibility:hidden}
#memola-xchat .tdr-hist-item.is-active .chk{visibility:visible}
#memola-xchat .tdr-hist-item .nm{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#memola-xchat .tdr-hist-item .del{opacity:0;border:0;background:transparent;cursor:pointer;color:var(--ink-4);font-size:14px;line-height:1;padding:0 2px;flex:0 0 auto}
#memola-xchat .tdr-hist-item:hover .del{opacity:1}
#memola-xchat .tdr-hist-item .del:hover{color:var(--danger)}
#memola-xchat .tdr-hist-empty{padding:10px;color:var(--ink-4);font-size:var(--fs-sm)}

/* \u2500\u2500 \u30BF\u30D6UI (\u30C8\u30C3\u30D7\u30D0\u30FC1\u6BB5\u76EE) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
#memola-overlay #memola-tabbar{display:flex;align-items:center;gap:4px;height:36px;padding:0 8px;border-bottom:1px solid var(--paper-3);background:var(--paper-2);flex:0 0 auto}
#memola-overlay #memola-tabstrip{flex:1;display:flex;align-items:flex-end;gap:2px;overflow-x:auto;min-width:0;height:100%}
/* \u30BF\u30D6\u5217\u53F3\u7AEF\u306E\u30A2\u30AF\u30B7\u30E7\u30F3(\u518D\u8AAD\u307F\u8FBC\u307F/\u8A2D\u5B9A) */
#memola-overlay .memola-tabbar-act{flex:0 0 auto;display:grid;place-items:center;width:28px;height:28px;border:0;background:transparent;color:var(--ink-3);border-radius:6px;cursor:pointer}
#memola-overlay .memola-tabbar-act:hover{background:var(--paper-3);color:var(--ink)}
#memola-overlay .memola-tabbar-act svg{width:16px;height:16px}
/* \u30D0\u30F3\u30C9\u30EB\u66F4\u65B0\u30D0\u30CA\u30FC(\u30E9\u30A4\u30D6\u691C\u77E5) */
#memola-overlay #memola-update-bar{position:fixed;left:50%;transform:translateX(-50%);bottom:18px;z-index:120;display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:8px;background:var(--accent,#7a8a78);color:#fff;box-shadow:0 4px 16px rgba(0,0,0,.2);font-size:var(--fs-sm)}
#memola-overlay #memola-update-bar button{border:0;border-radius:6px;cursor:pointer;font:inherit;font-size:var(--fs-sm);font-weight:600;padding:4px 10px;background:#fff;color:var(--accent-strong,#5e6f5c)}
#memola-overlay #memola-update-bar #memola-update-dismiss{background:transparent;color:#fff;padding:2px 6px;font-size:16px}
#memola-overlay #memola-tabstrip::-webkit-scrollbar{height:0}
#memola-overlay .memola-tab{display:flex;align-items:center;gap:6px;max-width:200px;min-width:96px;padding:0 4px 0 10px;border-radius:7px 7px 0 0;cursor:pointer;color:var(--ink-3);font-size:var(--fs-sm);border:1px solid transparent;border-bottom:none;height:30px}
#memola-overlay .memola-tab:hover{background:var(--paper-3)}
#memola-overlay .memola-tab.on{background:var(--paper);color:var(--ink);border-color:var(--paper-3)}
#memola-overlay .memola-tab.dragging{opacity:.45}
#memola-overlay .memola-tab-ic{flex:0 0 auto;font-size:13px;display:inline-flex;align-items:center}
#memola-overlay .memola-tab-ic svg{width:13px;height:13px}
#memola-overlay .memola-tab-lbl{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#memola-overlay .memola-tab-x{flex:0 0 auto;border:0;background:transparent;color:var(--ink-4);cursor:pointer;width:18px;height:18px;border-radius:4px;font-size:14px;line-height:1;opacity:0}
#memola-overlay .memola-tab:hover .memola-tab-x,#memola-overlay .memola-tab.on .memola-tab-x{opacity:1}
#memola-overlay .memola-tab-x:hover{background:rgba(0,0,0,.1);color:var(--ink)}
#memola-overlay .memola-tab-newbtn{flex:0 0 auto;align-self:center;border:0;background:transparent;color:var(--ink-3);cursor:pointer;width:26px;height:26px;border-radius:6px;display:grid;place-items:center;margin-left:2px}
#memola-overlay .memola-tab-newbtn:hover{background:var(--paper-3);color:var(--ink)}
#memola-overlay .memola-tab-newbtn svg{width:15px;height:15px}
`;(function(){let e=document.getElementById("memola-overlay");if(e){try{e.__memolaShutdown?.()}catch{}e.remove();let n=document.getElementById("memola-style");n&&n.remove();return}if(!location.hostname.endsWith("sharepoint.com")){alert("SharePoint\u306E\u30DA\u30FC\u30B8\u4E0A\u3067\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u304F\u3060\u3055\u3044\u3002");return}fb();let t=document.createElement("style");t.id="memola-style",t.textContent=P1,document.head.appendChild(t);let o=document.createElement("div");o.id="memola-overlay",o.innerHTML=hb(),document.body.appendChild(o),ab(),ib()})();})();
