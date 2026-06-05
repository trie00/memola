"use strict";(()=>{var ST=Object.create;var uc=Object.defineProperty;var MT=Object.getOwnPropertyDescriptor;var PT=Object.getOwnPropertyNames;var CT=Object.getPrototypeOf,AT=Object.prototype.hasOwnProperty;var L=(e,t)=>()=>(e&&(t=e(e=0)),t);var Xt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),j=(e,t)=>{for(var o in t)uc(e,o,{get:t[o],enumerable:!0})},Yb=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of PT(t))!AT.call(e,r)&&r!==o&&uc(e,r,{get:()=>t[r],enumerable:!(n=MT(t,r))||n.enumerable});return e};var BT=(e,t,o)=>(o=e!=null?ST(CT(e)):{},Yb(t||!e||!e.__esModule?uc(o,"default",{value:e,enumerable:!0}):o,e)),DT=e=>Yb(uc({},"__esModule",{value:!0}),e);var Kp={};j(Kp,{DRAFT_KEY_PREFIX:()=>$p,prefAiClaudeKey:()=>gc,prefAiClaudeModel:()=>fc,prefAiCorpBaseUrl:()=>co,prefAiCorpDeployPrefix:()=>ka,prefAiCorpKey:()=>hc,prefAiCorpModel:()=>wa,prefAiCorpOverrides:()=>bc,prefAiEmbedApiVersion:()=>La,prefAiEmbedDimensions:()=>Sa,prefAiEmbedModel:()=>Ta,prefAiEmbedProvider:()=>Ia,prefAiHistory:()=>vc,prefAiLocalBaseUrl:()=>yc,prefAiLocalKey:()=>xc,prefAiLocalModel:()=>wc,prefAiLocalModels:()=>kc,prefAiLocalReasoningModels:()=>Ic,prefAiPaneOpen:()=>fs,prefAiPanelOpen:()=>FT,prefAiPanelWidth:()=>UT,prefAiProvider:()=>xa,prefAiVoyageKey:()=>Ec,prefAiVoyageModel:()=>Ea,prefCalDateField:()=>Dc,prefCurrentWsName:()=>br,prefCurrentWsUrl:()=>vr,prefDbColOrder:()=>ZT,prefDbColOrderLegacy:()=>Cc,prefDbColWidths:()=>eL,prefDbGanttConfig:()=>Bc,prefDbRowOrder:()=>QT,prefDbRowOrderLegacy:()=>Ac,prefDbTagColors:()=>ss,prefDbViewColors:()=>hr,prefDbViews:()=>lt,prefDensity:()=>ls,prefDevBundleSource:()=>is,prefDevLocalBase:()=>Tc,prefFocusMode:()=>Da,prefLastOpenedPages:()=>ds,prefLastSavedBy:()=>oL,prefLastSeenEtag:()=>Jo,prefOutlineOpen:()=>ps,prefOutlineWidth:()=>HT,prefPaneAiWidth:()=>qp,prefPaneOutlineWidth:()=>zp,prefPanePropsWidth:()=>jp,prefPaneSbWidth:()=>Up,prefPresenceEnabled:()=>yr,prefPropertiesOpen:()=>us,prefPropsPanelOpen:()=>zT,prefPropsPanelWidth:()=>jT,prefRagMinScore:()=>Pa,prefRag外部ベクトルFolder:()=>Ca,prefRag外部ベクトルKinds:()=>Aa,prefRagTopK:()=>Ma,prefSaveDelayMs:()=>Ba,prefSiblingOrder:()=>tL,prefSidebarOpen:()=>NT,prefSidebarState:()=>_a,prefSidebarWidth:()=>OT,prefSyncPollMs:()=>Cn,prefTabs:()=>ms,prefTheme:()=>cs,prefTreeOrder:()=>Pc,prefWorkspaces:()=>Mc,prefXChatHistory:()=>Lc,prefXChatOpen:()=>Sc});function Xb(e){try{return localStorage.getItem(e)||""}catch{return""}}function Jb(e,t){try{t===""||t==null?localStorage.removeItem(e):localStorage.setItem(e,t)}catch{}}function Zb(e){try{localStorage.removeItem(e)}catch{}}function _T(e,t){let o=Xb(e);if(!o)return t;try{return JSON.parse(o)}catch{return t}}function RT(e,t){try{Jb(e,JSON.stringify(t))}catch{}}function X(e,t=""){return{key:e,get:()=>Xb(e)||t,set:o=>Jb(e,o),clear:()=>Zb(e)}}function Ft(e,t){return{key:e,get:()=>_T(e,t),set:o=>RT(e,o),clear:()=>Zb(e)}}function ZT(e){return Ft(qT+e,[])}function QT(e){return Ft($T+e,[])}function Cc(e){return Ft(KT+e,[])}function Ac(e){return Ft(VT+e,[])}function Bc(e,t){return Ft(WT+e,t)}function eL(e){return Ft(GT+e,{})}function tL(e){return Ft(YT+(e||"_root"),[])}function Dc(e){return X(XT+e)}function oL(e){return X(JT+e)}function Jo(e){return X(nL+e)}var hr,lt,xa,fc,gc,wa,hc,co,ka,bc,vc,yc,xc,wc,kc,Ic,Ia,Ec,Ea,Ta,La,Sa,Ma,Pa,is,Tc,ss,Ca,Aa,Lc,Sc,Mc,br,vr,ls,cs,Ba,Cn,yr,ds,ms,NT,OT,ps,HT,FT,UT,zT,jT,Da,_a,us,fs,Up,zp,jp,qp,qT,$T,KT,VT,WT,GT,YT,XT,JT,Pc,nL,$p,be=L(()=>{"use strict";hr=Ft("memola.dbViewColors",{}),lt=Ft("memola.dbViews",{}),xa=X("memola.ai.provider","claude"),fc=X("memola.ai.claudeModel"),gc=X("memola.anthropic.apiKey"),wa=X("memola.ai.corpModel"),hc=X("memola.ai.corpKey"),co=X("memola.ai.corpBaseUrl"),ka=X("memola.ai.corpDeployPrefix"),bc=X("memola.ai.corpOverrides"),vc=X("memola.ai.history"),yc=X("memola.ai.localBaseUrl"),xc=X("memola.ai.localKey"),wc=X("memola.ai.localModel"),kc=X("memola.ai.localModels"),Ic=X("memola.ai.localReasoningModels"),Ia=X("memola.ai.embedProvider","voyage"),Ec=X("memola.ai.voyageKey"),Ea=X("memola.ai.voyageModel","voyage-3.5-lite"),Ta=X("memola.ai.embedModel","text-embedding-3-small"),La=X("memola.ai.embedApiVersion","2024-02-01"),Sa=X("memola.ai.embedDimensions",""),Ma=X("memola.rag.topK","8"),Pa=X("memola.rag.minScore","0.2"),is=X("memola.dev.bundle-source",""),Tc=X("memola.dev.local-base","http://127.0.0.1:18080/memola"),ss=Ft("memola.dbTagColors",{}),Ca=X("memola.rag.extvecFolder",""),Aa=X("memola.rag.extvecKinds","mail,onenote,pptx,doc,transcript"),Lc=X("memola.xchat.history"),Sc=X("memola.xchat.open"),Mc=X("memola.workspaces"),br=X("memola.workspace.current"),vr=X("memola.workspace.currentUrl"),ls=X("memola.density","regular"),cs=X("memola.theme","light"),Ba=X("memola.save.delayMs","2000"),Cn=X("memola.sync.pollMs","30000"),yr=X("memola.presence.enabled","1"),ds=Ft("memola.lastOpenedPage",{}),ms=Ft("memola.tabs",{}),NT=X("memola.sb.open"),OT=X("memola.sb.width"),ps=X("memola.outline.open"),HT=X("memola.outline.width"),FT=X("memola.ai.panelOpen"),UT=X("memola.ai.panelWidth"),zT=X("memola.props.open"),jT=X("memola.props.width"),Da=X("memola.focus"),_a=X("memola.sidebar"),us=X("memola.properties.open"),fs=X("memola.page.aiPane"),Up=X("memola.pane.sb"),zp=X("memola.pane.outline"),jp=X("memola.pane.props"),qp=X("memola.pane.ai"),qT="memola.db.colOrder.",$T="memola.db.rowOrder.",KT="memola.db.colorder.",VT="memola.db.roworder.",WT="memola.db.gantt.",GT="memola.db.colWidths.",YT="memola.tree.sib.",XT="memola.cal.dateField.",JT="memola.lastSavedBy.",Pc=Ft("memola.tree.order",{});nL="memola.lastSeenEtag.";$p="memola.draft."});function Vp(e){W=e.replace(/\/$/,""),Zo=W.replace(/https:\/\/[^\/]+/,""),gs=Zo+"/Shared Documents/memola-pages"}function Qb(){let e=location.href.match(/(https:\/\/[^\/]+\/sites\/[^\/]+)/),t=vr.get();t||(t=e?e[1]:location.origin),Vp(t)}var W,Zo,gs,hs,_c,Fe=L(()=>{"use strict";be();W="",Zo="",gs="",hs=1e4,_c=100});var ev={};j(ev,{ICONS:()=>$});var ye,$,xr=L(()=>{"use strict";ye=e=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,$={search:ye('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),plus:ye('<path d="M12 5v14M5 12h14"/>'),link:ye('<path d="M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"/><path d="M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"/>'),copy:ye('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>'),filter:ye('<path d="M3 5h18l-7 9v6l-4-2v-4z"/>'),sort:ye('<path d="M3 6h13M3 12h9M3 18h5"/><path d="M17 16l4 4 4-4" transform="translate(-4 -4)"/>'),trash:ye('<path d="M3 6h18"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>'),edit:ye('<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>'),refresh:ye('<path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>'),gear:ye('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),send:ye('<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>'),external:ye('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/>'),chat:ye('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>'),stop:ye('<rect x="6" y="6" width="12" height="12" rx="1"/>'),close:ye('<path d="M6 6l12 12M18 6L6 18"/>'),exit:ye('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>'),sparkle:ye('<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="2.5"/>'),info:ye('<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/>'),code:ye('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),codeBlock:ye('<rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="10 14 8 12 10 10"/><polyline points="14 10 16 12 14 14"/>'),ul:ye('<line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1.3" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="4.5" cy="18" r="1.3" fill="currentColor" stroke="none"/>'),ol:ye('<line x1="10" y1="6" x2="20" y2="6"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="10" y1="18" x2="20" y2="18"/><path d="M3.5 4.5L5 3.5v5"/><path d="M3.5 8.5h3"/>'),todo:ye('<rect x="3" y="3" width="18" height="18" rx="3"/><polyline points="8 12 11 15 16 9"/>'),hr:ye('<line x1="4" y1="12" x2="20" y2="12"/>'),database:ye('<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>'),page:ye('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>'),table:ye('<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/>'),board:ye('<rect x="3" y="3" width="6" height="18" rx="1"/><rect x="11" y="3" width="6" height="11" rx="1"/><rect x="19" y="3" width="2" height="7" rx="1"/>'),sidebar:ye('<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>'),chevronLeft:ye('<polyline points="15 18 9 12 15 6"/>'),chevronRight:ye('<polyline points="9 18 15 12 9 6"/>'),download:ye('<path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><line x1="4" y1="21" x2="20" y2="21"/>'),print:ye('<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>'),quote:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 11c0-2.2 1.3-4 4-4v2c-1 0-2 1-2 2h2v5H5v-5zm8 0c0-2.2 1.3-4 4-4v2c-1 0-2 1-2 2h2v5h-4v-5z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>'}});var Jt={};j(Jt,{S:()=>d,resetAppState:()=>Wp});function Wp(){d.meta={pages:[]},d.tabs=[],d.activeTabId=null,d.currentId=null,d.currentType="page",d.dbFields=[],d.dbItems=[],d.dbList="",d.dbSort={field:null,asc:!0},d.dbFilters=[],d.dbColumnWidths={},d.currentRow=null,d.dbSelected.clear(),d.ai.messages=[],d.ai.loading=!1,d.sync.pageId=null,d.sync.loadedModified=null,d.sync.loadedEtag=null,d.sync.pollTimer&&(clearInterval(d.sync.pollTimer),d.sync.pollTimer=null),d.expanded.clear(),d.dirty=!1,d.saving=!1}var d,q=L(()=>{"use strict";d={get pages(){return this.meta.pages.filter(e=>!e.trashed).map(e=>({Id:e.id,Title:e.title,ParentId:e.parent||"",Type:e.type||"page",IsDraft:!!e.originPageId}))},meta:{pages:[]},tabs:[],activeTabId:null,currentId:null,currentType:"page",dbFields:[],dbItems:[],dbList:"",dbSort:{field:null,asc:!0},dbFilters:[],dbView:"table",dbViewId:"",dbColumnWidths:{},currentRow:null,dbSelected:new Set,ai:{panelOpen:!1,messages:[],loading:!1},sync:{pageId:null,loadedModified:null,loadedEtag:null,pollTimer:null},expanded:new Set,dirty:!1,saving:!1}});function I(e){let t=document.getElementById("memola-"+e);if(!t)throw new Error("Memola: missing element memola-"+e);return t}function ov(){let e=document.getElementById("memola-overlay");if(!e)throw new Error("Memola: overlay not mounted");return e}function Ce(){return I("ed")}var me=L(()=>{"use strict"});function Rc(e){if(!e)return null;let t=String(e).trim();if(!t)return null;let o="",n="",r="",a=t.match(/^(\d{4})(\d{2})(\d{2})$/);if(a)o=a[1],n=a[2],r=a[3];else{let s=t.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);if(!s)return null;o=s[1],n=s[2].padStart(2,"0"),r=s[3].padStart(2,"0")}let i=new Date(`${o}-${n}-${r}T00:00:00Z`);return isNaN(i.getTime())||i.getUTCFullYear()!==Number(o)||i.getUTCMonth()+1!==Number(n)||i.getUTCDate()!==Number(r)?null:`${o}-${n}-${r}`}function To(e){if(!e)return"";if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;let t=new Date(e);if(isNaN(t.getTime()))return"";let o=new Date(t.getTime()+9*60*60*1e3),n=o.getUTCFullYear(),r=String(o.getUTCMonth()+1).padStart(2,"0"),a=String(o.getUTCDate()).padStart(2,"0");return`${n}-${r}-${a}`}function rv(){let e=new Date,t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${o}-${n}`}function av(){let e=new Date,t=new Date(e.getTime()+9*3600*1e3),o=t.getUTCFullYear(),n=String(t.getUTCMonth()+1).padStart(2,"0"),r=String(t.getUTCDate()).padStart(2,"0"),a=String(t.getUTCHours()).padStart(2,"0"),i=String(t.getUTCMinutes()).padStart(2,"0"),s=nv[t.getUTCDay()];return`\u73FE\u5728\u306E\u65E5\u6642 (JST): ${o}-${n}-${r} ${a}:${i} (${s}\u66DC\u65E5)`}function An(e){let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return"";let o=new Date,n=t.toDateString()===o.toDateString(),r=new Date(o);r.setDate(o.getDate()-1);let a=t.toDateString()===r.toDateString(),i=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return n?`${i}:${s}`:a?`\u6628\u65E5 ${i}:${s}`:t.getFullYear()===o.getFullYear()?`${t.getMonth()+1}/${t.getDate()} ${i}:${s}`:`${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()}`}function Nc(e){let t=e.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!t)return e;let o=new Date(Date.UTC(Number(t[1]),Number(t[2])-1,Number(t[3]))),n=nv[o.getUTCDay()];return`${e} (${n})`}function Oc(e){return/^\d{4}-\d{2}-\d{2}(\s*\([^)]+\))?\s*$/.test(e)}var nv,Lo=L(()=>{"use strict";nv=["\u65E5","\u6708","\u706B","\u6C34","\u6728","\u91D1","\u571F"]});var lv={};j(lv,{autoR:()=>Qo,setLoad:()=>_,setSave:()=>Ye,setSavedAt:()=>So,toast:()=>k});function k(e,t,o){let n=I("tk");n.textContent=e,n.className="on"+(t==="err"?" er":""),clearTimeout(iv),iv=setTimeout(()=>{n.className=""},o||3500)}function _(e,t){I("lm").textContent=" "+(t||"\u8AAD\u307F\u8FBC\u307F\u4E2D..."),I("ld").classList.toggle("off",!e)}function sv(e){return"\u4FDD\u5B58\u6E08 "+An(e)}function Ye(e){let t=I("ss");e==="saved"||e==="\u4FDD\u5B58\u6E08"||e==="\u4FDD\u5B58\u6E08\u307F"||e===""?(t.textContent=sv(new Date),t.dataset.state="saved"):e==="saving"||e==="\u4FDD\u5B58\u4E2D..."?(t.textContent="\u4FDD\u5B58\u4E2D\u2026",t.dataset.state="saving"):(t.textContent=e,t.dataset.state=e==="\u672A\u4FDD\u5B58"?"dirty":"")}function So(e){let t=I("ss");if(!e){t.textContent="",t.dataset.state="";return}let o=typeof e=="string"?new Date(e):e;if(Number.isNaN(o.getTime())){t.textContent="",t.dataset.state="";return}t.textContent=sv(o),t.dataset.state="saved"}function Qo(e){e.style.height="auto",e.style.height=e.scrollHeight+"px"}var iv,le=L(()=>{"use strict";me();Lo();if(typeof window<"u"){let e=()=>{let t=document.getElementById("memola-ss");t&&(navigator.onLine||(t.textContent="\u30AA\u30D5\u30E9\u30A4\u30F3",t.dataset.state="offline"))};window.addEventListener("offline",e),window.addEventListener("online",()=>{let t=document.getElementById("memola-ss");t&&t.dataset.state==="offline"&&(t.textContent="",t.dataset.state="")})}});function cv(){bs=null,Gp=0}async function xe(){if(bs&&Date.now()<Gp)return bs;let e=await fetch(W+"/_api/contextinfo",{method:"POST",headers:{Accept:"application/json;odata=verbose"},credentials:"include"});if(!e.ok)throw new Error("\u8A8D\u8A3C\u5931\u6557("+e.status+")\u3002SharePoint\u306B\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044\u3002");return bs=(await e.json()).d.GetContextWebInformation.FormDigestValue,Gp=Date.now()+25*60*1e3,bs}var bs,Gp,wr=L(()=>{"use strict";Fe();bs=null,Gp=0});function J(e,t=""){return W+"/_api/web/lists/getbytitle('"+e+"')"+t}async function ne(e){let t=await fetch(e,{headers:{Accept:Yp},credentials:"include"});return t.ok?(await t.json()).d:null}var Yp,mo,Lt=L(()=>{"use strict";Fe();Yp="application/json;odata=verbose",mo={Accept:Yp,"Content-Type":Yp}});var po={};j(po,{addListField:()=>zt,applyOwnerOnlyAcl:()=>ys,clearListCaches:()=>Jp,createList:()=>Ra,createListItem:()=>Ne,deleteList:()=>Na,deleteListField:()=>Qp,deleteListItem:()=>Ve,ensureList:()=>Ut,getListEntityType:()=>Zp,getListFields:()=>ze,getListItemById:()=>xs,getListItems:()=>Ee,resolveRoleDefId:()=>pv,restoreSoftDelete:()=>Uc,setColumnIndexed:()=>kr,setListVersionLimit:()=>zc,softDelete:()=>Fc,updateListFieldChoices:()=>iL,updateListItem:()=>je,updateListItemIfMatch:()=>Ir});function vs(e){try{let n=JSON.parse(e)?.error?.message?.value;if(n)return n}catch{}let t=e.match(/"value"\s*:\s*"((?:\\.|[^"\\])*)"/);if(!t)return"";try{return JSON.parse('"'+t[1]+'"')}catch{return t[1]}}function Jp(){for(let e of Object.keys(en))delete en[e]}async function Ra(e){let t=await xe(),o=await fetch(W+"/_api/web/lists",{method:"POST",headers:{...mo,"X-RequestDigest":t},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.List"},BaseTemplate:100,Title:e,Description:"Memola"})});if(!o.ok)throw new Error("\u30EA\u30B9\u30C8\u4F5C\u6210\u5931\u6557: "+o.status)}async function Na(e){let t=await xe();await fetch(J(e),{method:"POST",headers:{"X-RequestDigest":t,"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include"})}async function pv(e){if(Hc[e])return Hc[e];let t=rL[e];if(t){let n=W+"/_api/web/roledefinitions?$select=Id,Name,RoleTypeKind&$filter="+encodeURIComponent("RoleTypeKind eq "+t.kind);try{let a=(await ne(n))?.results?.[0]?.Id;if(a)return Hc[e]=a,a}catch{}}let o=t?.names??[e];for(let n of o){let r=W+"/_api/web/roledefinitions?$select=Id,Name&$filter="+encodeURIComponent("Name eq '"+n.replace(/'/g,"''")+"'");try{let i=(await ne(r))?.results?.[0]?.Id;if(i)return Hc[e]=i,i}catch{}}throw new Error("\u30ED\u30FC\u30EB\u5B9A\u7FA9\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093: "+e+" (\u8A66\u3057\u305F\u5019\u88DC: RoleTypeKind="+(t?.kind??"\u306A\u3057")+", Name="+o.join(" / ")+")")}async function ys(e,t){if(!t)throw new Error("principalId \u304C\u89E3\u6C7A\u3067\u304D\u307E\u305B\u3093 \u2014 ACL \u8A2D\u5B9A\u4E2D\u6B62");let o=await pv("Full Control");if(await aL(e,t,o).catch(()=>!1))return;let r=await xe(),a=J(e,"/breakroleinheritance(copyRoleAssignments=false,clearSubscopes=true)"),i=await fetch(a,{method:"POST",headers:{...mo,"X-RequestDigest":r},credentials:"include"});if(!i.ok&&i.status!==400)throw new Error("\u6A29\u9650\u7D99\u627F\u306E\u5207\u65AD\u306B\u5931\u6557: "+i.status);let s=J(e,"/roleassignments/addroleassignment(principalid="+t+",roledefid="+o+")"),l=await fetch(s,{method:"POST",headers:{...mo,"X-RequestDigest":r},credentials:"include"});if(!l.ok)throw new Error("\u6A29\u9650\u4ED8\u4E0E\u306B\u5931\u6557: "+l.status)}async function aL(e,t,o){if(!(await ne(J(e,"?$select=HasUniqueRoleAssignments")))?.HasUniqueRoleAssignments)return!1;let a=(await ne(J(e,"/roleassignments?$expand=RoleDefinitionBindings&$select=PrincipalId,RoleDefinitionBindings/Id")))?.results??[];if(a.length===0)return!1;let i=!1;for(let s of a){let l=s.RoleDefinitionBindings?.results?.map(c=>c.Id)??[];if(s.PrincipalId===t)if(l.includes(o))i=!0;else return!1;else return!1}return i}async function Fc(e,t,o,n=Date.now()){await je(e,t,{Trashed:n,TrashedBy:o})}async function Uc(e,t){await je(e,t,{Trashed:0,TrashedBy:0})}async function Ut(e){let t=await ne(J(e.title))!=null;t||await Ra(e.title);for(let o of e.fields){try{await zt(e.title,o.name,o.kind,o.choices)}catch{}o.indexed&&await kr(e.title,o.name).catch(()=>{})}return await zc(e.title,_c).catch(()=>{}),!t}async function Zp(e){if(en[e])return en[e];let t=await ne(J(e,"?$select=ListItemEntityTypeFullName"));if(!t)throw new Error("\u30A8\u30F3\u30C6\u30A3\u30C6\u30A3\u30BF\u30A4\u30D7\u53D6\u5F97\u5931\u6557");return en[e]=t.ListItemEntityTypeFullName,en[e]}async function ze(e){let t=await ne(J(e,"/fields?$filter=Hidden eq false and ReadOnlyField eq false&$select=Title,InternalName,FieldTypeKind,Choices"));if(!t)throw new Error("\u30B9\u30AD\u30FC\u30DE\u53D6\u5F97\u5931\u6557");return t.results.filter(o=>[2,3,4,6,8,9].indexOf(o.FieldTypeKind)>=0).map(o=>{let n={Title:o.Title,InternalName:o.InternalName,FieldTypeKind:o.FieldTypeKind};return o.FieldTypeKind===6&&o.Choices&&o.Choices.results&&(n.Choices=o.Choices.results),n})}function uv(e){let t=e;for(let o of Object.keys(e))if(o.startsWith("OData_")){let n=o.substring(6);n in t||(t[n]=e[o])}return t}async function Ee(e,t){let o=[],n=t?"&$select="+encodeURIComponent(t):"",r=J(e,"/items?$orderby=Id&$top=500"+n);for(let a=0;r&&a<200;a++){let i=await fetch(r,{headers:{Accept:"application/json;odata=verbose"},credentials:"include"});if(!i.ok)throw new Error("\u30C7\u30FC\u30BF\u53D6\u5F97\u5931\u6557");let s=await i.json(),l=s.d?.results||[];for(let c of l)o.push(uv(c));r=s.d?.__next}return o}async function xs(e,t){let o=await ne(J(e,"/items("+t+")"));return o?uv(o):null}async function Ne(e,t){let o=await Zp(e),n=await xe(),r={__metadata:{type:o}};for(let s of Object.keys(t)){if(s==="__metadata")continue;let l=s.startsWith("_")?"OData_"+s:s;r[l]=t[s]}let a=await fetch(J(e,"/items"),{method:"POST",headers:{...mo,"X-RequestDigest":n},credentials:"include",body:JSON.stringify(r)});if(!a.ok){let s=await a.text().catch(()=>""),l=vs(s);throw!l&&s&&s.length<300&&(l=s),(a.status===403||a.status===401)&&delete en[e],new Error("\u884C\u8FFD\u52A0\u5931\u6557: "+a.status+(l?" \u2014 "+l:""))}return(await a.json()).d}async function Ve(e,t){let o=await xe(),n=await fetch(J(e,"/items("+t+")"),{method:"POST",headers:{"X-RequestDigest":o,"X-HTTP-Method":"DELETE","If-Match":"*"},credentials:"include"});if(n.status!==404&&!n.ok)throw new Error("\u524A\u9664\u5931\u6557: "+n.status)}async function zt(e,t,o,n){let r={2:"SP.FieldText",3:"SP.FieldMultiLineText",4:"SP.FieldDateTime",8:"SP.FieldBoolean",9:"SP.FieldNumber",6:"SP.FieldChoice"},a=await xe(),i=typeof o=="string"?parseInt(o,10):o,s;i===6?s={__metadata:{type:"SP.FieldChoice"},FieldTypeKind:6,Title:t,Choices:{__metadata:{type:"Collection(Edm.String)"},results:n||[]}}:i===3?s={__metadata:{type:"SP.FieldMultiLineText"},FieldTypeKind:3,Title:t,NumberOfLines:6,RichText:!1,AppendOnly:!1}:i===4?s={__metadata:{type:"SP.FieldDateTime"},FieldTypeKind:4,Title:t,DisplayFormat:0,FriendlyDisplayFormat:0,DateTimeCalendarType:1}:s={__metadata:{type:r[i]||"SP.FieldText"},FieldTypeKind:i,Title:t},delete en[e];let l=await fetch(J(e,"/fields"),{method:"POST",headers:{...mo,"X-RequestDigest":a},credentials:"include",body:JSON.stringify(s)});if(!l.ok){let m=await l.text().catch(()=>""),p=vs(m);throw!p&&m&&m.length<200&&(p=m),new Error("\u5217\u8FFD\u52A0\u5931\u6557: "+l.status+(p?" \u2014 "+p:""))}return(await l.json()).d}async function iL(e,t,o){let n=await xe();delete en[e];let r=J(e,"/fields/getbyinternalnameortitle('"+t+"')"),a=await fetch(r,{method:"POST",headers:{...mo,"X-RequestDigest":n,"X-HTTP-Method":"MERGE","If-Match":"*"},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.FieldChoice"},Choices:{__metadata:{type:"Collection(Edm.String)"},results:o}})});if(!a.ok){let i=await a.text().catch(()=>"");throw new Error("\u9078\u629E\u80A2\u306E\u66F4\u65B0\u5931\u6557: "+a.status+(i?" \u2014 "+vs(i):""))}}async function Qp(e,t){let o=await xe(),n=J(e,"/fields/getbyinternalnameortitle('"+t+"')"),r=await fetch(n,{method:"POST",headers:{"X-RequestDigest":o,"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include"});if(!r.ok&&r.status!==404)throw new Error("\u5217\u524A\u9664\u5931\u6557: "+r.status)}async function kr(e,t){let o=await xe(),n=J(e,"/fields/getbyinternalnameortitle('"+t+"')");await fetch(n,{method:"POST",headers:{...mo,"X-RequestDigest":o,"X-HTTP-Method":"MERGE","IF-MATCH":"*"},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Field"},Indexed:!0})}).catch(()=>{})}async function zc(e,t){if(!(t>=1))return;let o=await xe();await fetch(J(e),{method:"POST",headers:{...mo,"X-RequestDigest":o,"X-HTTP-Method":"MERGE","IF-MATCH":"*"},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.List"},EnableVersioning:!0,MajorVersionLimit:t})}).catch(()=>{})}function dv(e){return/存在しません|does not exist/i.test(e)}async function mv(e,t){let o=await ze(e).catch(()=>[]);if(o.length===0)return t;let n=new Map(o.map(i=>[i.InternalName,i])),r=new Map(o.map(i=>[i.Title,i])),a={};for(let i of Object.keys(t)){if(i==="__metadata"){a[i]=t[i];continue}let s=n.get(i)||r.get(i);a[s?s.InternalName:i]=t[i]}return a}async function je(e,t,o){await Xp(e,t,o,!0)}async function Ir(e,t,o,n){let r=await Zp(e),a=await xe(),i={__metadata:{type:r}};for(let m of Object.keys(o)){if(m==="__metadata")continue;let p=m.startsWith("_")?"OData_"+m:m;i[p]=o[m]}let s=await fetch(J(e,"/items("+t+")"),{method:"POST",headers:{...mo,"X-RequestDigest":a,"X-HTTP-Method":"MERGE","IF-MATCH":n},credentials:"include",body:JSON.stringify(i)});if(s.ok)return{ok:!0};if(s.status===412)return{ok:!1,reason:"conflict"};let l=await s.text().catch(()=>""),c=vs(l);throw new Error("\u66F4\u65B0\u5931\u6557(If-Match): "+s.status+(c?" \u2014 "+c:""))}async function Xp(e,t,o,n){let r=await xe(),a=Object.entries(o).filter(([m])=>m!=="__metadata").map(([m,p])=>({FieldName:m,FieldValue:p==null?"":String(p)})),i=await fetch(J(e,"/items("+t+")/validateUpdateListItem"),{method:"POST",headers:{...mo,"X-RequestDigest":r},credentials:"include",body:JSON.stringify({formValues:a,bNewDocumentUpdate:!1})});if(!i.ok){let m=await i.text().catch(()=>""),p=vs(m);if(n&&dv(p)){let u=await mv(e,o);if(Object.keys(u).some(g=>!(g in o))){await Xp(e,t,u,!1);return}}throw new Error("\u66F4\u65B0\u5931\u6557: "+i.status+(p?" \u2014 "+p:""))}let l=(await i.json()).d.ValidateUpdateListItem.results.filter(m=>m.ErrorMessage);if(l.length===0)return;let c=l.some(m=>dv(m.ErrorMessage||""));if(n&&c){let m=await mv(e,o);if(Object.keys(m).some(u=>!(u in o))){await Xp(e,t,m,!1);return}}throw new Error("\u66F4\u65B0\u5931\u6557: "+l.map(m=>m.FieldName+": "+m.ErrorMessage).join(", "))}var en,Hc,rL,De=L(()=>{"use strict";Fe();wr();Lt();en={};Hc={},rL={"Full Control":{kind:5,names:["Full Control","\u30D5\u30EB \u30B3\u30F3\u30C8\u30ED\u30FC\u30EB","\u30D5\u30EB\u30B3\u30F3\u30C8\u30ED\u30FC\u30EB"]},Edit:{kind:4,names:["Edit","\u7DE8\u96C6"]},Contribute:{kind:3,names:["Contribute","\u6295\u7A3F","\u30B3\u30F3\u30C8\u30EA\u30D3\u30E5\u30FC\u30C8"]},Read:{kind:2,names:["Read","\u8AAD\u307F\u53D6\u308A","\u8AAD\u53D6\u308A"]}}});function Q(){return fv+=1,"blk_"+sL+"-"+fv.toString(36)}function gv(e){return e===""?[]:[{kind:"text",text:e}]}function St(e){let t="";for(let o of e)o.kind==="text"||o.kind==="code"?t+=o.text:o.kind==="br"?t+=`
`:o.kind==="pagelink"?t+=o.alias||o.pageId:o.kind==="dailylink"?t+=o.alias||o.date:(o.kind==="bold"||o.kind==="italic"||o.kind==="strike"||o.kind==="link")&&(t+=St(o.children));return t}var fv,sL,tn=L(()=>{"use strict";fv=0,sL=Math.random().toString(36).slice(2,8)+Math.random().toString(36).slice(2,6)});var eu={};j(eu,{blocksToMd:()=>Je,mdToBlocks:()=>Xe,parseInline:()=>ws});function Xe(e){let t=e.replace(/\r\n?/g,`
`).split(`
`),o=[],n=0;for(;n<t.length;){let r=t[n];if(/^\s*$/.test(r)){n++;continue}let a=pL(r);if(a){o.push(a),n++;continue}if(/^\s*---+\s*$/.test(r)||/^\s*\*\*\*+\s*$/.test(r)){let b={id:Q(),kind:"rule"};o.push(b),n++;continue}let i=r.match(/^```(\S*)\s*$/);if(i){let b=i[1]||"",h=[];for(n++;n<t.length&&!/^```\s*$/.test(t[n]);)h.push(t[n]),n++;n<t.length&&n++;let v={id:Q(),kind:"code",lang:b,text:h.join(`
`)};o.push(v);continue}let s=r.match(/^(#{1,3})\s+(.*)$/);if(s){let b=s[1].length,h=ws(s[2]),v="h"+b,w={id:Q(),kind:v,inline:h};o.push(w),n++;continue}let l=r.match(/^\s*-\s+\[([ xX])\]\s*(.*)$/);if(l){let b=l[1].toLowerCase()==="x",h={id:Q(),kind:"todo",checked:b,inline:ws(l[2])};o.push(h),n++;continue}let c=r.match(/^>\s*\[([^\sA-Za-z0-9][^\]]*)\]\s*(.*)$/);if(c){let b=c[1],h=[c[2]];for(n++;n<t.length&&/^>\s?/.test(t[n]);)h.push(t[n].replace(/^>\s?/,"")),n++;let v=Xe(h.join(`
`)),w={id:Q(),kind:"callout",emoji:b,children:v};o.push(w);continue}if(/^>\s?/.test(r)){let b=[];for(;n<t.length&&/^>\s?/.test(t[n]);)b.push(t[n].replace(/^>\s?/,"")),n++;let h=Xe(b.join(`
`)),v={id:Q(),kind:"quote",children:h};o.push(v);continue}let m=r.match(/^(\s*)([-*+])\s+(.*)$/),p=r.match(/^(\s*)(\d+)\.\s+(.*)$/);if(m||p){let b=!!p,h=[],v=(m??p)[1].length;for(;n<t.length;){let x=b?t[n].match(/^(\s*)(\d+)\.\s+(.*)$/):t[n].match(/^(\s*)([-*+])\s+(.*)$/);if(!x||x[1].length!==v||!b&&/^\s*\[[ xX]\]/.test(x[3]))break;let T=[x[3]];for(n++;n<t.length;){let E=t[n];if(/^\s*$/.test(E)){let C=t[n+1];if(C!=null&&/^\s+/.test(C)&&C.search(/\S/)>v){T.push(""),n++;continue}break}if(E.search(/\S/)<=v)break;T.push(E.replace(new RegExp("^\\s{"+(v+2)+"}"),"")),n++}h.push(Xe(T.join(`
`)))}let w={id:Q(),kind:"list",ordered:b,items:h};o.push(w);continue}let u=r.match(/^\s*!\[([^\]]*)\]\(([^)]+)\)\s*$/);if(u){o.push({id:Q(),kind:"image",src:u[2],alt:u[1]}),n++;continue}let f=[r];for(n++;n<t.length&&!/^\s*$/.test(t[n])&&!lL(t[n]);)f.push(t[n]),n++;let g=f.join(`
`),y={id:Q(),kind:"p",inline:ws(g)};o.push(y)}return o}function lL(e){return!!(/^#{1,3}\s+/.test(e)||/^```/.test(e)||/^\s*---+\s*$/.test(e)||/^\s*\*\*\*+\s*$/.test(e)||/^\s*-\s+\[[ xX]\]/.test(e)||/^>\s?/.test(e)||/^(\s*)[-*+]\s+/.test(e)||/^(\s*)\d+\.\s+/.test(e))}function ws(e){return e?(e=e.replace(/  +\n/g,`<br>
`).replace(/<br\s*\/?>/gi,"<br>"),jc(e,0,e.length)):[]}function jc(e,t,o){let n=[],r="",a=t,i=()=>{r&&(n.push({kind:"text",text:r}),r="")};for(;a<o;){let s=e[a];if(e.startsWith("<br>",a)){i(),n.push({kind:"br"}),a+=4,e[a]===`
`&&a++;continue}if(s==="["&&e[a+1]==="["){let l=e.indexOf("]]",a+2);if(l>=0&&l<o){let c=e.substring(a+2,l),m=c.indexOf("|"),p=m<0?c:c.substring(0,m),u=m<0?void 0:c.substring(m+1);i();let f=p.match(/^daily:(\d{4}-\d{2}-\d{2})$/);f?n.push({kind:"dailylink",date:f[1],...u!==void 0?{alias:u}:{}}):n.push({kind:"pagelink",pageId:p,...u!==void 0?{alias:u}:{}}),a=l+2;continue}}if(s==="["){let l=hv(e,"]",a+1,o);if(l>=0&&e[l+1]==="("){let c=hv(e,")",l+2,o);if(c>=0){let m=e.substring(a+1,l),p=e.substring(l+2,c);i(),n.push({kind:"link",href:p,children:ws(m)}),a=c+1;continue}}}if(s==="`"){let l=e.indexOf("`",a+1);if(l>=0&&l<o){i(),n.push({kind:"code",text:e.substring(a+1,l)}),a=l+1;continue}}if(e.startsWith("~~",a)){let l=e.indexOf("~~",a+2);if(l>=0&&l<o){i(),n.push({kind:"strike",children:jc(e,a+2,l)}),a=l+2;continue}}if(e.startsWith("**",a)||e.startsWith("__",a)){let l=e.substr(a,2),c=e.indexOf(l,a+2);if(c>=0&&c<o){i(),n.push({kind:"bold",children:jc(e,a+2,c)}),a=c+2;continue}}if((s==="*"||s==="_")&&e[a+1]!==s){let l=e.indexOf(s,a+1);if(l>=0&&l<o&&e[l-1]!==s){i(),n.push({kind:"italic",children:jc(e,a+1,l)}),a=l+1;continue}}if(s==="\\"&&a+1<o&&/[!-/:-@[-`{-~]/.test(e[a+1])){r+=e[a+1],a+=2;continue}r+=s,a++}return i(),n}function cL(e){return e.replace(/([\\`*_~[\]])/g,"\\$1")}function hv(e,t,o,n){for(let r=o;r<n;r++){if(e[r]==="\\"){r++;continue}if(e[r]===t)return r}return-1}function Je(e){let t="";for(let o=0;o<e.length;o++){let n=e[o],r=dL(n).replace(/\n+$/,"");if(t){let i=e[o-1].kind==="todo"&&n.kind==="todo";t+=i?`
`:`

`}t+=r}return t?t+`
`:""}function dL(e){switch(e.kind){case"p":return on(e.inline)+`
`;case"h1":return"# "+on(e.inline)+`
`;case"h2":return"## "+on(e.inline)+`
`;case"h3":return"### "+on(e.inline)+`
`;case"todo":return"- ["+(e.checked?"x":" ")+"] "+on(e.inline)+`
`;case"rule":return`---
`;case"code":return"```"+e.lang+`
`+e.text+"\n```\n";case"quote":return Je(e.children).replace(/\n+$/,"").split(`
`).map(o=>o===""?">":"> "+o).join(`
`)+`
`;case"callout":{let o=Je(e.children).trim().split(`
`),n="> ["+e.emoji+"] "+(o[0]||"")+`
`;for(let r=1;r<o.length;r++)n+="> "+o[r]+`
`;return n}case"list":{let t="";return e.items.forEach((o,n)=>{let r=e.ordered?n+1+".":"-",i=Je(o).trim().split(`
`);t+=r+" "+i[0]+`
`;for(let s=1;s<i.length;s++)t+="  "+i[s]+`
`}),t}case"image":return"!["+e.alt+"]("+e.src+`)
`;case"table":case"linkdb":case"ai":case"email":return mL(e)+`
`}}function mL(e){let t=JSON.stringify(e),o;try{o=btoa(unescape(encodeURIComponent(t)))}catch{o=""}return"<!-- memola-block:"+o+" -->"}function pL(e){let t=e.match(/^\s*<!--\s*memola-block:([A-Za-z0-9+/=]*)\s*-->\s*$/);if(!t)return null;try{let o=decodeURIComponent(escape(atob(t[1]))),n=JSON.parse(o);return!n||typeof n!="object"||!("kind"in n)||!("id"in n)||n.kind!=="table"&&n.kind!=="linkdb"&&n.kind!=="ai"&&n.kind!=="email"?null:n}catch{return null}}function on(e){let t="";for(let o of e)t+=uL(o);return t}function uL(e){switch(e.kind){case"text":return cL(e.text);case"bold":return"**"+on(e.children)+"**";case"italic":return"*"+on(e.children)+"*";case"strike":return"~~"+on(e.children)+"~~";case"code":return"`"+e.text+"`";case"link":return"["+on(e.children)+"]("+e.href+")";case"pagelink":return"[["+e.pageId+(e.alias!=null?"|"+e.alias:"")+"]]";case"dailylink":return"[[daily:"+e.date+(e.alias!=null?"|"+e.alias:"")+"]]";case"br":return`  
`}}var Mt=L(()=>{"use strict";tn()});function bv(e){let t=document.createElement("div");return t.innerHTML=e,Oa(t)}function Oa(e){let t=[];for(let o of Array.from(e.childNodes)){if(o.nodeType===3){let i=(o.textContent||"").trim();if(i){let s={id:Q(),kind:"p",inline:[{kind:"text",text:i}]};t.push(s)}continue}if(o.nodeType!==1)continue;let n=o,r=n.tagName.toLowerCase();if((r==="div"||r==="section")&&!fL(n)){t.push(...Oa(n));continue}let a=gL(n);a&&t.push(a)}return t}function fL(e){let t=e.classList;return t.contains("memola-todo")||t.contains("memola-callout")||t.contains("memola-itbl-wrap")||t.contains("memola-linkdb")||t.contains("memola-ai-block")}function gL(e){let t=e.tagName.toLowerCase();if(t==="img"){let r=e.getAttribute("src")||"",a=e.getAttribute("alt")||"";return{id:Q(),kind:"image",src:r,alt:a}}if(t==="div"&&e.classList.contains("memola-itbl-wrap")){let r=e.querySelector("table.memola-itbl");if(!r)return null;let a=r.dataset.hrow==="1",i=r.dataset.hcol==="1",s=[],l=[];for(let c of Array.from(r.querySelectorAll("tr"))){let m=[];for(let p of Array.from(c.children))m.push(uo(p));l.push(m)}return{id:Q(),kind:"table",hrow:a,hcol:i,rows:l}}if(t==="div"&&e.classList.contains("memola-linkdb")){let r=e.getAttribute("data-db-id")||"",a=e.getAttribute("data-view")||"table",i=e.getAttribute("data-filter")||"",s=e.getAttribute("data-sort")||"";return{id:Q(),kind:"linkdb",dbId:r,view:a,filter:i,sort:s}}if(t==="div"&&e.classList.contains("memola-ai-block")){let r=e.getAttribute("data-aib-action")||"",a=e.getAttribute("data-aib-result")||"";return{id:Q(),kind:"ai",prompt:r,result:a}}if(t==="div"&&e.classList.contains("memola-todo")){let r=e.querySelector(".memola-todo-cb"),a=e.querySelector(".memola-todo-txt");return{id:Q(),kind:"todo",checked:!!(r&&r.checked),inline:a?uo(a):[]}}if(t==="div"&&e.classList.contains("memola-callout")){let r=e.querySelector(".memola-callout-ic"),a=e.querySelector(".memola-callout-body");return{id:Q(),kind:"callout",emoji:(r?.textContent||"\u{1F4A1}").trim(),children:a?Oa(a):[]}}if(t==="h1"||t==="h2"||t==="h3")return{id:Q(),kind:t,inline:uo(e)};if(t==="p"){let r=uo(e);return{id:Q(),kind:"p",inline:r}}if(t==="pre"){let r=e.querySelector("code"),a=r?.className.replace(/^language-/,"")||"",i=r?.textContent??e.textContent??"";return{id:Q(),kind:"code",lang:a,text:i}}if(t==="hr")return{id:Q(),kind:"rule"};if(t==="blockquote")return{id:Q(),kind:"quote",children:Oa(e)};if(t==="ul"||t==="ol"){let r=[];for(let i of Array.from(e.children)){if(i.tagName.toLowerCase()!=="li")continue;if(Array.from(i.children).some(l=>/^(p|h\d|ul|ol|pre|blockquote|hr|div)$/i.test(l.tagName)))r.push(Oa(i));else{let l=uo(i);r.push([{id:Q(),kind:"p",inline:l}])}}return{id:Q(),kind:"list",ordered:t==="ol",items:r}}if(t==="div"||t==="section")return Oa(e)[0]||null;let o=uo(e);return o.length===0?null:{id:Q(),kind:"p",inline:o}}function uo(e){let t=[];for(let o of Array.from(e.childNodes)){if(o.nodeType===3){let a=o.textContent||"";a&&t.push({kind:"text",text:a});continue}if(o.nodeType!==1)continue;let n=o,r=n.tagName.toLowerCase();if(r==="br"){t.push({kind:"br"});continue}if(r==="strong"||r==="b"){t.push({kind:"bold",children:uo(n)});continue}if(r==="em"||r==="i"){t.push({kind:"italic",children:uo(n)});continue}if(r==="s"||r==="strike"||r==="del"){t.push({kind:"strike",children:uo(n)});continue}if(r==="code"){t.push({kind:"code",text:n.textContent||""});continue}if(r==="a"){let a=n.getAttribute("data-daily-date");if(a){let s=(n.textContent||"").trim()||void 0;t.push({kind:"dailylink",date:a,...s?{alias:s}:{}});continue}if(n.classList.contains("memola-page-link")){let s=n.getAttribute("data-page-id")||"",l=(n.textContent||"").trim()||void 0;t.push({kind:"pagelink",pageId:s,...l?{alias:l}:{}});continue}let i=n.getAttribute("href")||"";t.push({kind:"link",href:i,children:uo(n)});continue}t.push(...uo(n))}return t}function nn(e){return e.map(hL).join("")}function Po(e){return nn(Xe(e))}function hL(e){switch(e.kind){case"p":return"<p>"+Mo(e.inline)+"</p>";case"h1":return"<h1>"+Mo(e.inline)+"</h1>";case"h2":return"<h2>"+Mo(e.inline)+"</h2>";case"h3":return"<h3>"+Mo(e.inline)+"</h3>";case"todo":return'<div class="memola-todo"><input type="checkbox" class="memola-todo-cb"'+(e.checked?" checked":"")+'><span class="memola-todo-txt">'+Mo(e.inline)+"</span></div>";case"rule":return"<hr>";case"code":return"<pre><code"+(e.lang?' class="language-'+e.lang+'"':"")+">"+Er(e.text)+"</code></pre>";case"quote":return"<blockquote>"+nn(e.children)+"</blockquote>";case"callout":return'<div class="memola-callout"><span class="memola-callout-ic">'+Er(e.emoji)+'</span><div class="memola-callout-body">'+nn(e.children)+"</div></div>";case"list":{let t=e.ordered?"ol":"ul",o=e.items.map(n=>n.length===1&&n[0].kind==="p"?"<li>"+Mo(n[0].inline)+"</li>":"<li>"+nn(n)+"</li>").join("");return"<"+t+">"+o+"</"+t+">"}case"image":return'<img src="'+Bn(e.src)+'" alt="'+Bn(e.alt)+'" class="memola-img">';case"email":return'<div class="memola-email-chip" data-imid="'+Bn(e.imid)+'">\u{1F4E7} '+Bn(e.subject||"(\u4EF6\u540D\u306A\u3057)")+(e.from?' \u2014 <span class="memola-email-from">'+Bn(e.from)+"</span>":"")+"</div>";case"table":case"linkdb":case"ai":return"<!-- block-tree:"+e.kind+" id="+e.id+" -->"}}function Mo(e){let t="";for(let o of e)t+=bL(o);return t}function bL(e){switch(e.kind){case"text":return Er(e.text);case"bold":return"<strong>"+Mo(e.children)+"</strong>";case"italic":return"<em>"+Mo(e.children)+"</em>";case"strike":return"<s>"+Mo(e.children)+"</s>";case"code":return"<code>"+Er(e.text)+"</code>";case"link":return'<a href="'+Bn(e.href)+'">'+Mo(e.children)+"</a>";case"pagelink":{let t=e.alias||e.pageId;return'<a class="memola-page-link" data-page-id="'+Bn(e.pageId)+'">'+Er(t)+"</a>"}case"dailylink":{let t=e.alias||e.date;return'<a class="memola-page-link memola-daily-link" data-daily-date="'+Bn(e.date)+'">'+Er(t)+"</a>"}case"br":return"<br>"}}function Er(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Bn(e){return Er(e).replace(/"/g,"&quot;")}var rn=L(()=>{"use strict";tn();Mt()});var yv={};j(yv,{applySiblingOrder:()=>Is,collectDescendantIds:()=>an,computeReorder:()=>tu,countDescendants:()=>ks,saveSiblingOrder:()=>Ha});function an(e,t){let o=[t];return e.filter(n=>n.ParentId===t).forEach(n=>{o.push(...an(e,n.Id))}),o}function ks(e,t){return an(e,t).length-1}function vv(){return Pc.get()}function vL(e){Pc.set(e)}function Is(e,t){let n=vv()[e||""];if(!n||n.length===0)return t;let r=new Map(t.map(i=>[i.Id,i])),a=[];for(let i of n){let s=r.get(i);s&&(a.push(s),r.delete(i))}for(let i of r.values())a.push(i);return a}function Ha(e,t){let o=vv();o[e||""]=t,vL(o)}function tu(e,t,o,n){let r=e.map(s=>s.Id),a=r.indexOf(t);a>=0&&r.splice(a,1);let i=r.indexOf(o);return i<0&&(i=r.length),n||(i+=1),r.splice(i,0,t),r}var Tr=L(()=>{"use strict";be()});async function Fa(e){let t=Pt(e);return t&&(await ne(J(nt(e),"/items("+t+")?$select=Editor/Title&$expand=Editor")))?.Editor?.Title||""}function Dn(){return qc||(qc=(async()=>(await ne(W+"/_api/web/currentuser?$select=Title"))?.Title||"")().catch(()=>""),qc)}function ut(){return $c||($c=(async()=>(await ne(W+"/_api/web/currentuser?$select=Id"))?.Id||0)().catch(()=>0),$c)}function Ua(e){if(!e)return Promise.resolve("");let t=xv.get(e);if(t!==void 0)return Promise.resolve(t);let o=ou.get(e);if(o)return o;let n=(async()=>{let a=(await ne(W+"/_api/web/getuserbyid("+e+")?$select=Title").catch(()=>null))?.Title||"";return xv.set(e,a),ou.delete(e),a})();return ou.set(e,n),n}var qc,$c,xv,ou,Zt=L(()=>{"use strict";V();Fe();Lt();qc=null,$c=null;xv=new Map,ou=new Map});var Ev={};j(Ev,{getBacklinksFor:()=>Es,invalidateBacklinkCache:()=>sn,scanBlocks:()=>Iv});function sn(){Kc=null,Lr=null}async function wv(e){let t=[],o=J(e,"/items?$select=Id,Title,Body_blocks,PageType,OriginPageId,IsTemplate&$top=500&$orderby=Id"),n=0;for(;o&&n++<50;){let r=await ne(o);if(!r)break;for(let a of r.results)a._srcList=e,t.push(a);o=r.__next}return t}async function yL(){return Kc||Lr||(Lr=(async()=>{let e=Qt(),t=[wv(ce)];e!==ce&&t.push(wv(e).catch(()=>[]));let n=(await Promise.all(t)).flat();return Kc=n,Lr=null,n})().catch(e=>{throw Lr=null,e}),Lr)}async function Es(e,t){if(!e)return[];let o=await yL(),n=[];for(let r of o){let a=Sr(r._srcList||ce,r.Id);if(a===e||r.PageType==="draft"||r.OriginPageId||r.PageType==="row"||r.IsTemplate)continue;let i=r.Body_blocks||"";if(!i)continue;let s;try{s=ge(i)}catch{continue}let{count:l,snippet:c}=Iv(s,e);l!==0&&n.push({pageId:a,pageTitle:t?.(a)||r.Title||"\u7121\u984C",snippet:c,count:l})}return n.sort((r,a)=>a.count-r.count||r.pageTitle.localeCompare(a.pageTitle,"ja")),n}function Iv(e,t){let o=0,n="",r=i=>{let s=0;for(let l of i)l.kind==="pagelink"&&l.pageId===t?s++:(l.kind==="bold"||l.kind==="italic"||l.kind==="strike"||l.kind==="link")&&(s+=r(l.children));return s},a=i=>{for(let s of i){if("inline"in s&&Array.isArray(s.inline)){let l=r(s.inline);l>0&&(o+=l,n||(n=kv(St(s.inline))))}if(s.kind==="table")for(let l of s.rows)for(let c of l){let m=r(c);m>0&&(o+=m,n||(n=kv(St(c))))}if((s.kind==="quote"||s.kind==="callout")&&a(s.children),s.kind==="list")for(let l of s.items)a(l)}};return a(e),{count:o,snippet:n}}function kv(e){let t=e.replace(/\s+/g," ").trim();return t.length>100?t.substring(0,100).trimEnd()+"\u2026":t}var Kc,Lr,Ts=L(()=>{"use strict";Lt();V();tn();Kc=null,Lr=null});var Tv={};j(Tv,{addPage:()=>fo,metaById:()=>B,removePages:()=>Co,setMetaPages:()=>nu,setPageTitle:()=>za});function B(e){return e&&d.meta.pages.find(t=>t.id===e)||null}function nu(e){let t=new Set;d.meta.pages=e.filter(o=>t.has(o.id)?!1:t.add(o.id))}function fo(e,t={}){d.meta.pages.some(o=>o.id===e.Id)||d.meta.pages.push({id:e.Id,title:e.Title,parent:e.ParentId||"",type:e.Type,...t})}function Co(e){let t=new Set(e);t.size!==0&&(d.meta.pages=d.meta.pages.filter(o=>!t.has(o.id)))}function za(e,t){let o=d.meta.pages.find(n=>n.id===e);o&&(o.title=t)}var we=L(()=>{"use strict";q()});var Sv={};j(Sv,{deleteAllRowEntriesForList:()=>ru,deleteRowEntry:()=>Mr,getRowBody:()=>go,getRowBodyBlocks:()=>xL,setRowBody:()=>Ao});async function Vc(e,t){let o="PageType eq 'row' and ListTitle eq '"+e.replace(/'/g,"''")+"' and DbRowId eq "+t,n=J(ce,"/items?$select=Id&$filter="+encodeURIComponent(o)+"&$orderby=Id&$top=20"),r=await ne(n);return r?r.results.map(a=>({id:a.Id,etag:a.__metadata?.etag||""})):[]}async function Lv(e,t){return(await Vc(e,t))[0]||null}async function go(e,t){await jt();let o=await Lv(e,t);if(!o)return"";let n=J(ce,"/items("+o.id+")?$select=Body_blocks"),r=await ne(n);return kL(r?.Body_blocks)}async function xL(e,t){await jt();let o=await Lv(e,t);if(!o)return"";let n=J(ce,"/items("+o.id+")?$select=Body_blocks");return(await ne(n))?.Body_blocks||""}async function Ao(e,t,o,n,r){await jt();let a=wL(r),i=await Vc(e,t);if(i.length>=1){await je(ce,i[0].id,{Title:n,Body_blocks:a});for(let m=1;m<i.length;m++)await Ve(ce,i[m].id).catch(()=>{});return}let l=(o?B(o):null)?.scope||"user";await Ne(ce,{Title:n,ParentId:o||"",PageType:"row",ListTitle:e,DbRowId:t,Body_blocks:a,Scope:l});let c=await Vc(e,t);if(c.length>1){await je(ce,c[0].id,{Title:n,Body_blocks:a}).catch(()=>{});for(let m=1;m<c.length;m++)await Ve(ce,c[m].id).catch(()=>{})}}function wL(e){let t=(e||"").trim();if(!t)return"[]";if(t.startsWith("["))try{let o=JSON.parse(t);if(Array.isArray(o))return t}catch{}return JSON.stringify(Xe(e))}function kL(e){if(!e)return"";try{let t=JSON.parse(e);return Array.isArray(t)?Je(t):""}catch{return""}}async function Mr(e,t){let o=await Vc(e,t);for(let n of o)await Ve(ce,n.id).catch(()=>{})}async function ru(e){await jt();let t="PageType eq 'row' and ListTitle eq '"+e.replace(/'/g,"''")+"'",o=J(ce,"/items?$select=Id&$filter="+encodeURIComponent(t)+"&$top=500"),n=await ne(o);if(n)for(let r of n.results)await Ve(ce,r.Id).catch(()=>{})}var au=L(()=>{"use strict";De();Lt();V();Mt();we()});function su(){return Ls||(Ls=(async()=>{await Ut({title:ja,fields:EL})})().catch(e=>{throw Ls=null,e}),Ls)}async function LL(){return iu||Ss||(Ss=(async()=>{let e=W+"/_api/web/siteusers?$select=Id,Title,Email,PrincipalType&$top=500",o=((await ne(e).catch(()=>null))?.results||[]).filter(n=>n.PrincipalType===1&&n.Email).map(n=>({id:n.Id,title:n.Title||n.Email,email:n.Email}));return iu=o,Ss=null,o})(),Ss)}async function Mv(e){let t=await LL(),o=d.meta.myUserId||0,n=e.trim().toLowerCase(),r=t.filter(a=>a.id!==o&&(!n||a.title.toLowerCase().includes(n)||a.email.toLowerCase().includes(n)));return r.sort((a,i)=>{let s=a.title.toLowerCase().startsWith(n)?0:1,l=i.title.toLowerCase().startsWith(n)?0:1;return s-l||a.title.localeCompare(i.title,"ja")}),r.slice(0,8)}async function Pv(e){let t=d.meta.myUserId||await ut().catch(()=>0),o=await Dn().catch(()=>""),n=Array.from(new Set(e.recipientIds)).filter(r=>r&&r!==t);if(n.length!==0){await su();for(let r of n)await Ne(ja,{RecipientId:r,ActorId:t,ActorName:o,PageId:e.pageId,PageTitle:e.pageTitle.slice(0,255),CommentId:e.commentId,BlockId:e.blockId||"",Snippet:e.snippet.slice(0,255),Read:0}).catch(()=>{})}}function SL(e){return{Id:Number(e.Id),ActorId:Number(e.ActorId||0),ActorName:String(e.ActorName||""),PageId:String(e.PageId||""),PageTitle:String(e.PageTitle||""),CommentId:Number(e.CommentId||0),BlockId:String(e.BlockId||""),Snippet:String(e.Snippet||""),Read:Number(e.Read||0),ReadAt:e.ReadAt?Number(e.ReadAt):void 0,Created:e.Created?String(e.Created):void 0}}async function lu(){let e=d.meta.myUserId||await ut().catch(()=>0);if(!e)return[];await su();let t=J(ja,"/items?$select="+encodeURIComponent(TL)+"&$filter="+encodeURIComponent("RecipientId eq "+e)+"&$orderby=Created desc&$top=100"),n=((await ne(t).catch(()=>null))?.results||[]).map(SL),r=Date.now(),a=[];for(let i of n)i.Read&&i.ReadAt&&r-i.ReadAt>IL?await Ve(ja,i.Id).catch(()=>{}):a.push(i);return a}async function Cv(){let e=d.meta.myUserId||await ut().catch(()=>0);if(!e)return 0;await su();let t=J(ja,"/items?$select=Id&$filter="+encodeURIComponent("RecipientId eq "+e+" and Read eq 0")+"&$top=100");return(await ne(t).catch(()=>null))?.results?.length||0}async function cu(e){await je(ja,e,{Read:1,ReadAt:Date.now()}).catch(()=>{})}var ja,IL,EL,TL,Ls,iu,Ss,Wc=L(()=>{"use strict";q();Fe();Lt();De();Zt();ja="memola-inbox",IL=3*24*60*60*1e3,EL=[{name:"RecipientId",kind:9,indexed:!0},{name:"ActorId",kind:9},{name:"ActorName",kind:2},{name:"PageId",kind:2},{name:"PageTitle",kind:2},{name:"CommentId",kind:9},{name:"BlockId",kind:2},{name:"Snippet",kind:3},{name:"Read",kind:9},{name:"ReadAt",kind:9}],TL="Id,ActorId,ActorName,PageId,PageTitle,CommentId,BlockId,Snippet,Read,ReadAt,Created",Ls=null;iu=null,Ss=null});var td={};j(td,{ORG_COMMENTS_LIST:()=>Pr,apiAddComment:()=>Zc,apiDeleteComment:()=>Qc,apiEditComment:()=>uu,apiListComments:()=>Xc,apiResolveThread:()=>fu,apiToggleReaction:()=>gu,ensureCommentsLists:()=>Cs,gcMyOrphanComments:()=>DL,getMyCommentsList:()=>Cr,groupThreads:()=>Yc,hydrateAuthorNames:()=>ed,invalidateComments:()=>eo,openThreadCountByBlock:()=>du,parseReactions:()=>Ps,purgeCommentsForPage:()=>AL,remapCommentsPageId:()=>BL,selectOrphans:()=>CL});function Cr(){let e=d.meta.myUserId;return e?"memola-user-"+e+"-comments":null}function Ps(e){if(!e.Reactions)return{};try{let t=JSON.parse(e.Reactions);return t&&typeof t=="object"?t:{}}catch{return{}}}async function Av(e,t){if(await Ut({title:e,fields:ML}),t){let o=e.match(/^memola-user-(\d+)-comments$/);o&&await ys(e,parseInt(o[1],10)).catch(()=>{})}}async function Cs(){return Ms||(Ms=(async()=>{d.meta.myUserId||(d.meta.myUserId=await ut().catch(()=>0)),await Av(Pr,!1);let e=Cr();e&&await Av(e,!0)})().catch(e=>{throw Ms=null,e}),Ms)}function Yc(e){let t=(r,a)=>(r.Created||"").localeCompare(a.Created||"")||r.Id-a.Id,o=e.filter(r=>!r.ThreadId).sort(t),n=new Map;for(let r of e){if(!r.ThreadId)continue;let a=n.get(r.ThreadId)||[];a.push(r),n.set(r.ThreadId,a)}return o.map(r=>({root:r,replies:(n.get(String(r.Id))||[]).sort(t),blockId:r.BlockId||"",resolved:(r.Resolved||0)>0}))}function du(e){let t=new Map;for(let o of e)o.resolved||t.set(o.blockId,(t.get(o.blockId)||0)+1);return t}function CL(e,t){return e.filter(o=>!t.has(o.PageId))}function Bv(e){return{Id:Number(e.Id),PageId:String(e.PageId||""),BlockId:String(e.BlockId||""),ThreadId:String(e.ThreadId||""),Body:String(e.Body||""),Resolved:Number(e.Resolved||0),ResolvedBy:e.ResolvedBy?Number(e.ResolvedBy):void 0,ResolvedAt:e.ResolvedAt?Number(e.ResolvedAt):void 0,AnchorText:e.AnchorText?String(e.AnchorText):void 0,Scope:e.Scope==="org"?"org":"user",AuthorId:Number(e.AuthorId||0),AuthorName:e.AuthorName?String(e.AuthorName):void 0,Edited:e.Edited?Number(e.Edited):0,Deleted:e.Deleted?Number(e.Deleted):0,Reactions:e.Reactions?String(e.Reactions):void 0,Created:e.Created?String(e.Created):void 0}}async function mu(e,t){let o="PageId eq '"+t.replace(/'/g,"''")+"'",n=J(e,"/items?$select="+encodeURIComponent(PL)+"&$filter="+encodeURIComponent(o)+"&$orderby=Created&$top=500");return((await ne(n).catch(()=>null))?.results||[]).map(a=>{let i=Bv(a);return i._list=e,i})}function eo(e){e?Gc.delete(e):Gc.clear()}async function Xc(e){if(!e)return[];let t=Gc.get(e);if(t)return t;await Cs();let o=[Pr],n=Cr();n&&o.push(n);let r=await Promise.all(o.map(s=>mu(s,e))),a=d.meta.myUserId||0,i=r.flat().filter(s=>s.Scope==="org"||!a||s.AuthorId===a);return Gc.set(e,i),i}function Dv(e){return e==="org"?Pr:Cr()||Pr}function Jc(e){return e._list||Dv(e.Scope)}async function pu(){let e=d.meta.myUserId||await ut().catch(()=>0),t=await Dn().catch(()=>"");return{id:e,name:t}}async function Zc(e){await Cs();let{id:t,name:o}=await pu(),n={PageId:e.pageId,BlockId:e.blockId||"",ThreadId:e.threadRootId||"",Body:e.body,Scope:e.scope,AuthorId:t,AuthorName:o,Resolved:0,Edited:0,Deleted:0};e.anchorText&&(n.AnchorText=e.anchorText.slice(0,255));let r=await Ne(Dv(e.scope),n);eo(e.pageId);let a=Bv(r);return e.mentions&&e.mentions.length&&await Pv({recipientIds:e.mentions,pageId:e.pageId,pageTitle:B(Bs(e.pageId))?.title||"",commentId:a.Id,blockId:e.blockId||"",snippet:e.body}).catch(()=>{}),a}async function uu(e){await je(Jc(e),e.Id,{Body:e.Body,Edited:1}),eo(e.PageId)}async function Qc(e){await Ve(Jc(e),e.Id),eo(e.PageId)}async function fu(e,t){let{id:o}=await pu();await je(Jc(e),e.Id,{Resolved:t?1:0,ResolvedBy:t?o:0,ResolvedAt:t?Date.now():0}),eo(e.PageId)}async function gu(e,t){let{id:o}=await pu();if(!o)return;let n=Ps(e),r=n[t]||[],a=r.indexOf(o);a>=0?r.splice(a,1):r.push(o),r.length?n[t]=r:delete n[t],await je(Jc(e),e.Id,{Reactions:JSON.stringify(n)}),eo(e.PageId)}async function AL(e){await Cs().catch(()=>{});let t=[Pr,Cr()].filter(Boolean);for(let o of t){let n=await mu(o,e).catch(()=>[]);for(let r of n)await Ve(o,r.Id).catch(()=>{})}eo(e)}async function BL(e){if(e.size===0)return;await Cs().catch(()=>{});let t=[Pr,Cr()].filter(Boolean);for(let o of t)for(let[n,r]of e){if(n===r)continue;let a=await mu(o,n).catch(()=>[]);for(let i of a)await je(o,i.Id,{PageId:r}).catch(()=>{});eo(n),eo(r)}}async function DL(e){let t=Cr();if(!t)return;let o=J(t,"/items?$select=Id,PageId&$top=500&$orderby=Id"),n=await ne(o).catch(()=>null);if(!n?.results)return;let r=n.results.filter(a=>a.PageId&&!a.PageId.startsWith("row:")&&!e.has(a.PageId));for(let a of r)await Ve(t,a.Id).catch(()=>{})}async function ed(e){await Promise.all(e.map(async t=>{!t.AuthorName&&t.AuthorId&&(t.AuthorName=await Ua(t.AuthorId).catch(()=>""))}))}var Pr,ML,PL,Ms,Gc,As=L(()=>{"use strict";q();De();Lt();Zt();Wc();V();we();Pr="memola-comments";ML=[{name:"PageId",kind:2,indexed:!0},{name:"BlockId",kind:2},{name:"ThreadId",kind:2},{name:"Body",kind:3},{name:"Resolved",kind:9},{name:"ResolvedBy",kind:9},{name:"ResolvedAt",kind:9},{name:"AnchorText",kind:2},{name:"Scope",kind:2},{name:"AuthorId",kind:9},{name:"AuthorName",kind:2},{name:"Edited",kind:9},{name:"Deleted",kind:9},{name:"Reactions",kind:3}],PL="Id,PageId,BlockId,ThreadId,Body,Resolved,ResolvedBy,ResolvedAt,AnchorText,Scope,AuthorId,AuthorName,Edited,Deleted,Reactions,Created",Ms=null;Gc=new Map});var Ct={};j(Ct,{apiAddDbRow:()=>_s,apiCreateDb:()=>Ds,apiPurgeRow:()=>od,apiRestoreRow:()=>bu,apiTrashRow:()=>RL,apiUpdateDbRow:()=>ft,duplicateDb:()=>_L,ensureRowTrashFields:()=>hu,getTrashedRows:()=>vu,reconcileTrashedRows:()=>NL,stripInternalDbFields:()=>Rv});function Rv(e){return e.filter(t=>!_v.has(t.Title)&&!_v.has(t.InternalName))}async function Ds(e,t){let n="memola-db-"+Date.now().toString();return await Ut({title:n,fields:[{name:"Trashed",kind:9,indexed:!0},{name:"TrashedBy",kind:9,indexed:!0}]}),await qa(e,t,n)}async function _L(e,t){let o=t.copyRows??!t.asTemplate,n=B(e);if(!n||n.type!=="database"||!n.list)throw new Error("DB \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");let r=n.list,a=Rv(await ze(r)).filter(m=>m.Title!=="Title"&&m.InternalName!=="Title"),i=a.map(m=>({name:m.Title,kind:m.FieldTypeKind,...m.Choices?{choices:m.Choices}:{}})),s="memola-db-"+Date.now().toString();await Ut({title:s,fields:[{name:"Trashed",kind:9,indexed:!0},{name:"TrashedBy",kind:9,indexed:!0},...i]});let l=n.scope||"user",c=await qa(n.title||"\u7121\u984C","",s,l,t.asTemplate);if(o){let m=await Ee(r);for(let p of m){let u=p;if(typeof u.Trashed=="number"&&u.Trashed>0)continue;let f={Title:u.Title??""};for(let g of a){let y=u[g.InternalName]??u[g.Title];y!=null&&y!==""&&(f[g.Title]=y)}await _s(s,f).catch(()=>{})}}return c}async function hu(e){await Ut({title:e,fields:[{name:"Trashed",kind:9,indexed:!0},{name:"TrashedBy",kind:9,indexed:!0}]}).catch(()=>{})}async function RL(e,t){let o=Date.now(),n=d.meta.myUserId||await ut().catch(()=>0);await hu(e).catch(()=>{});let r=await Nv(e,t);if(r.length===0){let a=d.meta.pages.find(s=>s.type==="database"&&s.list===e),i="";try{let s=await xs(e,t);i=String(s?.Title||"")}catch{}try{await Ne(ce,{Title:i,ParentId:a?.id||"",PageType:"row",ListTitle:e,DbRowId:t,Body_blocks:"[]",Scope:a?.scope||"user",Trashed:o,TrashedBy:n})}catch{}}else for(let a of r)await Fc(ce,a.id,n,o).catch(()=>{});await Fc(e,t,n,o).catch(()=>{})}async function bu(e,t){await hu(e).catch(()=>{}),await Uc(e,t).catch(()=>{});let o=await Nv(e,t);for(let n of o)await Uc(ce,n.id).catch(()=>{})}async function od(e,t){await Ve(e,t).catch(()=>{}),await Mr(e,t).catch(()=>{})}async function Nv(e,t){let o="PageType eq 'row' and ListTitle eq '"+e.replace(/'/g,"''")+"' and DbRowId eq "+t,n=J(ce,"/items?$select=Id&$filter="+encodeURIComponent(o)+"&$orderby=Id&$top=20");return((await ne(n))?.results||[]).map(a=>({id:a.Id}))}async function NL(e,t){let o=J(ce,"/items?$select=Id,DbRowId,Trashed,TrashedBy&$filter="+encodeURIComponent("PageType eq 'row' and ListTitle eq '"+e.replace(/'/g,"''")+"' and Trashed gt 0")+"&$top=500"),n=await ne(o).catch(()=>null);if(n?.results)for(let r of n.results){let a=t.find(i=>i.Id===r.DbRowId);a&&(a.Trashed||await je(e,a.Id,{Trashed:r.Trashed,TrashedBy:r.TrashedBy}).catch(()=>{}))}}async function vu(){let e=J(ce,"/items?$select=Id,Title,ListTitle,DbRowId,Trashed,TrashedBy,Scope,AuthorId&$filter="+encodeURIComponent("PageType eq 'row' and Trashed gt 0")+"&$orderby=Trashed desc&$top=500"),t=await ne(e).catch(()=>null);return t?t.results.filter(o=>o.ListTitle&&o.DbRowId).map(o=>({bodyId:o.Id,listTitle:o.ListTitle,dbRowId:o.DbRowId,title:o.Title||"",trashedAt:o.Trashed||0,trashedBy:o.TrashedBy||0,scope:o.Scope==="org"||o.Scope==="user"?o.Scope:"",authorId:o.AuthorId||0})):[]}async function _s(e,t){let o=t.Title,n={};for(let a of Object.keys(t))a==="Title"||a==="__metadata"||(n[a]=t[a]);let r=await Ne(e,{Title:o??""});if(Object.keys(n).length>0){await je(e,r.Id,n);for(let a of Object.keys(n))r[a]=n[a]}return r}async function ft(e,t,o){await je(e,t,o)}var _v,qe=L(()=>{"use strict";q();De();V();we();Zt();Lt();_v=new Set(["Trashed","TrashedBy"])});var Ka={};j(Ka,{DAILY_DATE_FIELD:()=>gt,DAILY_LIST_TITLE:()=>Te,DAILY_TAG_FIELD:()=>nd,clearDailyCache:()=>yu,convertDailyToPage:()=>wu,ensureDailyDb:()=>ad,findNoteForDate:()=>xu,getOrCreateNoteForDate:()=>HL,isDailyList:()=>rd,isDailyTitleFormat:()=>Oc,refreshDailyCacheIfActive:()=>UL,restoreToDaily:()=>FL,todayYMD:()=>rv});function yu(){$a=null}async function Ov(){try{return(await ze(Te)).find(o=>o.Title===gt||o.InternalName===gt)?.InternalName||gt}catch{return gt}}async function Hv(){let e=null;for(let o=0;o<3;o++){try{if((await ze(Te)).some(r=>r.Title===gt||r.InternalName===gt)){await kr(Te,gt).catch(()=>{});return}}catch(n){e=n}try{if(await zt(Te,gt,4),(await ze(Te).catch(()=>[])).some(r=>r.Title===gt||r.InternalName===gt)){await kr(Te,gt).catch(()=>{});return}}catch(n){e=n}await new Promise(n=>setTimeout(n,250))}let t=e instanceof Error?": "+e.message:"";throw new Error("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u7528\u300C\u65E5\u4ED8\u300D\u5217\u3092\u6E96\u5099\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F"+t)}function rd(e){return e===Te}async function Fv(){let t=(await ze(Te).catch(()=>[])).filter(o=>o.Title===nd||o.InternalName===nd||/^NoteTag\d*$/.test(o.InternalName));if(t.length===0){try{await zt(Te,nd,6,["\u4ED5\u4E8B","\u500B\u4EBA","\u4F1A\u8B70","\u5BB6\u65CF","\u305D\u306E\u4ED6"])}catch{}return}if(t.length!==1){t.sort((o,n)=>o.InternalName.localeCompare(n.InternalName));for(let o=1;o<t.length;o++)await Qp(Te,t[o].InternalName).catch(()=>{})}}async function ad(){return $a||($a=(async()=>{let e=d.meta.pages.find(a=>a.type==="database"&&a.list===Te&&!a.trashed);if(e&&await ne(J(Te))!=null)return await Hv(),await Fv(),{dbPageId:e.id,listTitle:Te,dateInternalName:await Ov()};await ne(J(Te))!=null||await Ra(Te),await Hv(),await Fv();let o=await Ov();if(e)return{dbPageId:e.id,listTitle:Te,dateInternalName:o};let n=await qa("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8","",Te);await ct(n.Id,{Icon:"\u{1F4C5}",Pinned:1}).catch(()=>{});let r=B(n.Id);return r&&(r.icon="\u{1F4C5}",r.pinned=!0),fo(n),{dbPageId:n.Id,listTitle:Te,dateInternalName:o}})().catch(e=>{throw $a=null,e}),$a)}async function xu(e){let o=(await ad()).dateInternalName+" eq datetime'"+e+"T00:00:00'",n=J(Te,"/items?$filter="+encodeURIComponent(o)+"&$top=1"),a=(await ne(n).catch(()=>null))?.results?.[0];if(!a)return null;let i=await go(Te,a.Id).catch(()=>"");return{rowId:a.Id,title:a.Title||"",body:i}}function OL(e){return["## \u30BF\u30B9\u30AF","- [ ] ","","## \u30E1\u30E2",""].join(`
`)}async function HL(e){let t=await ad(),o=await xu(e);if(o)return{...o,dbPageId:t.dbPageId};let n=Nc(e),r=await _s(Te,{Title:n,[gt]:e}),a=OL(e);return await Ao(Te,r.Id,t.dbPageId,n,a),{rowId:r.Id,title:n,body:a,dbPageId:t.dbPageId}}async function wu(e,t,o,n=""){let r=await go(Te,e).catch(()=>""),a=await ln(t,n);await Va(a.Id,t,r).catch(()=>{}),await ct(a.Id,{OriginDailyDate:o}).catch(()=>{});let i=B(a.Id);return i&&(i.originDailyDate=o),await Mr(Te,e).catch(()=>{}),await Ve(Te,e).catch(()=>{}),a.Id}async function FL(e){let t=B(e);if(!t?.originDailyDate)throw new Error("\u3053\u306E\u30DA\u30FC\u30B8\u306F\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u7531\u6765\u3067\u306F\u3042\u308A\u307E\u305B\u3093");let o=t.originDailyDate,n=await ho(e),r=await ad(),a=await xu(o),i,s;a?(i=a.rowId,s=a.title||Nc(o)):(s=Nc(o),i=(await _s(Te,{Title:s,[gt]:o})).Id),await Ao(Te,i,r.dbPageId,s,n);let{apiDeletePage:l}=await Promise.resolve().then(()=>(V(),$e));return await l(e).catch(()=>{}),{rowId:i,date:o}}async function UL(){d.dbList===Te&&(d.dbItems=await Ee(Te))}var Te,gt,nd,$a,_n=L(()=>{"use strict";q();De();Lt();V();qe();Lo();we();Te="memola-daily",gt="NoteDate",nd="NoteTag",$a=null});var Ar={};j(Ar,{isPagePublished:()=>GL,publishPage:()=>KL,publishedUrlFor:()=>$L,syncPublishedPage:()=>WL,unpublishPage:()=>VL});function jv(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{let t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}function zL(e){let t=[{id:"cbe7b0a9-3504-44dd-a3a3-0e5cacd07788",instanceId:jv(),title:"Title Region",description:"Title Region Description",audiences:[],serverProcessedContent:{htmlStrings:{},searchablePlainTexts:{},imageSources:{},links:{}},dataVersion:"1.4",properties:{title:e,imageSourceType:4,layoutType:"FullWidthImage",textAlignment:"Left",showTopicHeader:!1,showPublishDate:!1,topicHeader:"",authors:[],authorByline:[],isDecorative:!0}}];return JSON.stringify(t)}function qv(e){let t=e?Po(e):"<p></p>",o=[{controlType:4,id:jv(),position:{controlIndex:1,sectionIndex:1,zoneIndex:1,sectionFactor:12,layoutIndex:1},addedFromPersistedData:!0,innerHTML:t},{controlType:0,pageSettingsSlice:{isDefaultDescription:!0,isDefaultThumbnail:!0}}];return JSON.stringify(o)}async function jL(e){let t=await fetch(e,{headers:{Accept:"application/json;odata=verbose"},credentials:"include"});return t.ok?t.json():null}async function $v(e,t){let o=await xe(),n=await fetch(W+"/_api/sitepages/pages",{method:"POST",headers:{Accept:"application/json;odata=verbose","Content-Type":"application/json;odata=verbose","X-RequestDigest":o},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Publishing.SitePage"},PageLayoutType:"Article",Title:e})});if(!n.ok){let l=await n.text().catch(()=>"");throw new Error("SitePage \u4F5C\u6210\u5931\u6557: "+n.status+(l?" \u2014 "+l.slice(0,200):""))}let r=await n.json(),a=r.d||r,i=Number(a.Id)||0;if(!i)throw new Error("SitePage \u4F5C\u6210\u5931\u6557: ID \u53D6\u5F97\u4E0D\u53EF");await Eu(i,e,t);let s=await Tu(i);return{id:i,url:s}}async function ku(e){let t=await xe();return fetch(W+"/_api/sitepages/pages("+e+")/CheckoutPage",{method:"POST",headers:{Accept:"application/json;odata=verbose","X-RequestDigest":t},credentials:"include"})}async function Uv(e){let t=await xe();await fetch(W+"/_api/sitepages/pages("+e+")/DiscardPage",{method:"POST",headers:{Accept:"application/json;odata=verbose","X-RequestDigest":t},credentials:"include"}).catch(()=>{})}async function zv(e,t,o){let n=await xe(),r=zL(t);return fetch(W+"/_api/sitepages/pages("+e+")",{method:"POST",headers:{Accept:"application/json;odata=verbose","Content-Type":"application/json;odata=verbose","X-RequestDigest":n,"X-HTTP-Method":"MERGE","IF-MATCH":"*"},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Publishing.SitePage"},Title:t,CanvasContent1:o,LayoutWebpartsContent:r})})}async function Iu(e){let t=await e.text().catch(()=>"");return e.status+(t?" \u2014 "+t.slice(0,400):"")}async function Eu(e,t,o){let n=await ku(e);if(n.status===409&&(await Uv(e),n=await ku(e)),!n.ok&&n.status!==200&&n.status!==201)throw new Error("SitePage \u30C1\u30A7\u30C3\u30AF\u30A2\u30A6\u30C8\u5931\u6557: "+await Iu(n));let r=await zv(e,t,o);if(r.status===409){await Uv(e);let a=await ku(e);if(!a.ok)throw new Error("SitePage \u518D\u30C1\u30A7\u30C3\u30AF\u30A2\u30A6\u30C8\u5931\u6557: "+await Iu(a));r=await zv(e,t,o)}if(!r.ok)throw new Error("SitePage \u4FDD\u5B58\u5931\u6557: "+await Iu(r))}async function Tu(e){let t=await xe(),o=await fetch(W+"/_api/sitepages/pages("+e+")/Publish",{method:"POST",headers:{Accept:"application/json;odata=verbose","X-RequestDigest":t},credentials:"include"});if(!o.ok){let s=await o.text().catch(()=>"");throw new Error("SitePage \u516C\u958B\u5931\u6557: "+o.status+(s?" \u2014 "+s.slice(0,200):""))}let n=await jL(W+"/_api/sitepages/pages("+e+")"),r=n?.d||n,a=r?.AbsoluteUrl||"";if(a)return a;let i=r?.FileName||"";return i?W+"/SitePages/"+i:""}async function qL(e){let t=await xe();await fetch(W+"/_api/sitepages/pages("+e+")",{method:"POST",headers:{"X-RequestDigest":t,"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include"})}function $L(e){return B(e)?.publishedUrl||""}async function KL(e,t,o){let n=B(e),r=qv(o),a,i=n?.publishedSitePageId||0;if(i){await Eu(i,t,r);let s=await Tu(i)||n?.publishedUrl||"";a={id:i,url:s}}else a=await $v(t,r);return await ct(e,{Published:1,PublishedUrl:a.url,PublishedPageId:a.id,PublishedDirty:0}),n&&(n.published=!0,n.publishedUrl=a.url,n.publishedSitePageId=a.id,n.publishedDirty=!1),a.url}async function VL(e){let t=B(e),o=t?.publishedSitePageId||0;if(o)try{await qL(o)}catch{}await ct(e,{Published:0,PublishedUrl:"",PublishedPageId:0,PublishedDirty:0}).catch(()=>{}),t&&(t.published=!1,delete t.publishedUrl,delete t.publishedSitePageId,delete t.publishedDirty)}async function WL(e,t,o){let n=B(e);if(!n?.published)throw new Error("not_published");let r=qv(o),a=n.publishedSitePageId||0;if(a)await Eu(a,t,r),await Tu(a);else{let i=await $v(t,r);await ct(e,{PublishedUrl:i.url,PublishedPageId:i.id}).catch(()=>{}),n.publishedUrl=i.url,n.publishedSitePageId=i.id}await ct(e,{PublishedDirty:0}).catch(()=>{}),n.publishedDirty=!1}function GL(e){return!!B(e)?.published}var Br=L(()=>{"use strict";Fe();wr();V();rn();we()});var Wv={};j(Wv,{applyBlockMergeChoices:()=>JL,threeWayMergeBlocks:()=>Dr});function Kv(e){return JSON.stringify(Lu(e))}function Lu(e){if(Array.isArray(e))return e.map(Lu);if(e&&typeof e=="object"){let t={};for(let o of Object.keys(e).sort())t[o]=Lu(e[o]);return t}return e}function id(e){if(Array.isArray(e))return e.map(id);if(e&&typeof e=="object"){let t={};for(let[o,n]of Object.entries(e))o==="id"||o==="lastBy"||o==="lastAt"||(t[o]=id(n));return t}return e}function Vv(e,t){let o=e.map(c=>c.id),n=t.map(c=>c.id),r=new Set(o),a=new Set(n),i=n.filter(c=>r.has(c)),s=o.filter(c=>a.has(c)),l=new Set;for(let c=0;c<i.length;c++)i[c]!==s[c]&&l.add(i[c]);return l}function Dr(e,t,o){let n=new Map(e.map(f=>[f.id,f])),r=new Map(t.map(f=>[f.id,f])),a=new Map(o.map(f=>[f.id,f])),i=Vv(e,t),s=Vv(e,o),l=i.size===0&&s.size>0,c=XL(t.map(f=>f.id),o.map(f=>f.id),l),m=[],p=0,u=[];for(let f of c){let g=n.has(f),y=r.get(f)??null,b=a.get(f)??null,h=n.get(f)??null;if(!(!y&&!b)){if(y&&!b){g?Wa(y,h)&&!i.has(f)?p++:(m.push({id:f,kind:"modify-delete",base:h,yours:y,theirs:null}),u.push(y)):u.push(y);continue}if(b&&!y){g?Wa(b,h)&&!s.has(f)?p++:(m.push({id:f,kind:"delete-modify",base:h,yours:null,theirs:b}),u.push(b)):u.push(b);continue}if(y&&b){if(!g){Wa(y,b)||m.push({id:f,kind:"add-add",base:null,yours:y,theirs:b}),u.push(y);continue}let v=!Wa(y,h),w=!Wa(b,h);if(!v&&!w)u.push(y);else if(!v&&w)u.push(b),p++;else if(v&&!w)u.push(y),p++;else if(Wa(y,b))u.push(y),p++;else{let x=h?YL(h,y,b):null;if(x){if(x.conflicts.length===0){u.push(x.merged),p++;continue}m.push(...x.conflicts),u.push(x.merged);continue}m.push({id:f,kind:"modify-modify",base:h,yours:y,theirs:b}),u.push(y)}}}}return{merged:u,conflicts:m,autoMergedCount:p}}function YL(e,t,o){if(e.kind!==t.kind||e.kind!==o.kind)return null;if(e.kind==="quote"&&t.kind==="quote"&&o.kind==="quote"){let n=Dr(e.children,t.children,o.children);return{merged:{...t,children:n.merged},conflicts:n.conflicts}}if(e.kind==="callout"&&t.kind==="callout"&&o.kind==="callout"){let n=t.emoji===o.emoji?t.emoji:t.emoji===e.emoji?o.emoji:(o.emoji===e.emoji,t.emoji),r=Dr(e.children,t.children,o.children);return{merged:{...t,emoji:n,children:r.merged},conflicts:r.conflicts}}return null}function XL(e,t,o=!1){let n=new Map;e.forEach((c,m)=>n.set(c,m));let r=new Map;t.forEach((c,m)=>r.set(c,m));let a=[],i=new Set,s=0,l=0;for(;s<e.length||l<t.length;){let c=s<e.length?e[s]:null,m=l<t.length?t[l]:null;if(c!==null&&i.has(c)){s++;continue}if(m!==null&&i.has(m)){l++;continue}if(c===null){m!==null&&(a.push(m),i.add(m),l++);continue}if(m===null){a.push(c),i.add(c),s++;continue}if(c===m){a.push(c),i.add(c),s++,l++;continue}if(!r.has(c)){a.push(c),i.add(c),s++;continue}if(!n.has(m)){a.push(m),i.add(m),l++;continue}o?(a.push(m),i.add(m),l++):(a.push(c),i.add(c),s++)}return a}function JL(e,t){let o=new Map(e.conflicts.map(r=>[r.id,r])),n=[];for(let r of e.merged){let a=o.get(r.id);if(!a){n.push(r);continue}let i=t[r.id];if(i!=="drop"){if(i==="yours"){a.yours&&n.push(a.yours);continue}if(i==="theirs"){a.theirs&&n.push(a.theirs);continue}n.push(r)}}return n}var Wa,sd=L(()=>{"use strict";Wa=(e,t)=>Kv(id(e))===Kv(id(t))});var $e={};j($e,{ORG_PAGES_LIST:()=>ce,apiApplyDraftToOrigin:()=>sS,apiCreateDbPageRow:()=>qa,apiCreatePage:()=>ln,apiCreatePageFromTemplate:()=>rS,apiDeletePage:()=>Ns,apiDeleteTemplate:()=>iS,apiDuplicateAsDraft:()=>oS,apiDuplicatePage:()=>aS,apiGetPages:()=>dt,apiLoadBlocksBody:()=>Bt,apiLoadContent:()=>eS,apiLoadContentMeta:()=>Bu,apiLoadFileMeta:()=>mt,apiLoadRawBody:()=>ho,apiMovePage:()=>Rr,apiPromoteDraftToPage:()=>lS,apiPurgePage:()=>Nr,apiRegisterPageAsTemplate:()=>nS,apiRestorePage:()=>Fs,apiSavePageBlocks:()=>Ya,apiSavePageMd:()=>Va,apiSetIcon:()=>Us,apiSetPin:()=>Ru,apiSetScope:()=>Xa,apiSetTitle:()=>Ja,apiTrashPage:()=>Hs,appIdForCommentKey:()=>Bs,buildSourceListMap:()=>oy,clearPagesCache:()=>Mu,clearPending:()=>Rn,deleteAllRowEntriesForList:()=>ru,deleteRowEntry:()=>Mr,ensurePagesList:()=>jt,filterVisiblePages:()=>ty,findOutgoingPrivateLinks:()=>tS,getMyPagesList:()=>Qt,getRowBody:()=>go,getTrashedPages:()=>Au,isStructuralOpActive:()=>Cu,listForPageId:()=>nt,listTemplates:()=>Nu,markPendingCreate:()=>ry,markPendingDelete:()=>Pu,markPendingRestore:()=>ay,markRecentlyCreated:()=>On,markStructuralOp:()=>Dt,mintPageId:()=>cn,pageCommentKey:()=>Os,pageIdForListItem:()=>Sr,pageIdToItemId:()=>Pt,pagesListFor:()=>Bo,parseBlocksJson:()=>ge,resolvePageId:()=>ny,scopeMismatchOnMove:()=>_u,serializeBlocks:()=>Ze,setRowBody:()=>Ao,updatePageRow:()=>ct});function Qt(){let e=d.meta.myUserId;return e?"memola-user-"+e+"-pages":ce}function Bo(e){return e==="user"?Qt():ce}function nt(e){let t=At.get(e);if(t)return t;let o=B(e);return o?Bo(o.scope==="org"?"org":"user"):ce}function Mu(){Ga=null}async function Yv(e){await ne(J(e))==null&&await Ra(e);let o=await Xv(e),n=async(s,l)=>{if(!o.has(s))try{await zt(e,s,l),o.add(s)}catch{}};for(let[s,l]of Gv)await n(s,l);let r=await Xv(e),a=Gv.filter(([s])=>!r.has(s)).map(([s])=>s);if(a.length>0)throw new Error(e+" \u306E\u5FC5\u9808\u5217\u304C\u4E0D\u8DB3\u3057\u3066\u3044\u307E\u3059: "+a.join(", "));for(let s of ZL)await kr(e,s).catch(()=>{});await zc(e,_c).catch(()=>{});let i=e.match(/^memola-user-(\d+)-pages$/);if(i){let s=parseInt(i[1],10);await ys(e,s)}}async function jt(){return Ga||(Ga=(async()=>{await Yv(ce);let e=Qt();e!==ce&&await Yv(e)})().catch(e=>{throw Ga=null,e}),Ga)}async function Xv(e){let t=await ne(J(e,"/fields?$select=Title,InternalName")),o=new Set;return t?.results.forEach(n=>{o.add(n.Title),o.add(n.InternalName)}),o}function ty(e,t){return e.filter(o=>o.PageType==="row"?!1:o.PageType==="draft"||!!o.OriginPageId?t===0?!0:o.AuthorId===t:o.Scope==="org"||t===0?!0:o.AuthorId===t)}function QL(e,t){let o={id:t,title:e.Title||"",parent:e.ParentId||"",type:e.PageType==="database"?"database":"page",icon:e.Icon||""};return e.ListTitle&&(o.list=e.ListTitle),e.Pinned&&e.Pinned>0&&(o.pinned=!0),e.Trashed&&e.Trashed>0&&(o.trashed=e.Trashed),e.Published&&e.Published>0&&(o.published=!0),e.PublishedUrl&&(o.publishedUrl=e.PublishedUrl),e.PublishedPageId&&e.PublishedPageId>0&&(o.publishedSitePageId=e.PublishedPageId),e.PublishedDirty&&e.PublishedDirty>0&&(o.publishedDirty=!0),e.OriginDailyDate&&(o.originDailyDate=e.OriginDailyDate),e.OriginPageId&&(o.originPageId=e.OriginPageId),(e.Scope==="org"||e.Scope==="user")&&(o.scope=e.Scope),e.AuthorId&&(o.authorId=e.AuthorId),e.TrashedBy&&(o.trashedBy=e.TrashedBy),e.IsTemplate&&e.IsTemplate>0&&(o.isTemplate=!0),o}async function Nn(e,t){let o=Pt(e);if(!o)return null;let n=t||"Id,Title,ParentId,PageType,Icon,Pinned,Trashed,ListTitle,DbRowId,Body_blocks,Published,PublishedUrl,PublishedPageId,PublishedDirty,OriginDailyDate,OriginPageId,Scope,AuthorId,TrashedBy,IsTemplate,Modified,Editor/Title",r=/\bEditor\//.test(n)?"&$expand=Editor":"",a=J(nt(e),"/items("+o+")?$select="+encodeURIComponent(n)+r),i=await ne(a);return i?{row:i,etag:i.__metadata?.etag||"",modified:i.Modified||"",editor:i.Editor?.Title||""}:null}function cn(e,t){return e===ce?String(t):e+":"+t}function oy(e){let t=new Map,o=new Map;for(let n of e)for(let r of n.rows){let a=cn(n.list,r.Id);t.set(r,a),o.set(a,n.list)}return{rowToPageId:t,sourceListByPageId:o}}function ny(e,t,o){let n=String(o);if(e.get(n)===t)return n;let r=t+":"+o;return e.get(r)===t?r:n}function Sr(e,t){return ny(At,e,t)}function Os(e){return nt(e)+":"+Pt(e)}function Bs(e){if(!e||e.startsWith("row:"))return"";let t=e.lastIndexOf(":");return t<=0?e:Sr(e.slice(0,t),parseInt(e.slice(t+1),10))}function ry(e){_r.set(e,{state:"create",at:Date.now()})}function Pu(e,t){_r.set(e,{state:t?"delete-purge":"delete-soft",at:Date.now()})}function ay(e){_r.set(e,{state:"restore",at:Date.now()})}function Rn(e){_r.delete(e)}function On(e){ry(e)}function Dt(e=5e3){Su=Math.max(Su,Date.now()+e)}function Cu(){return Date.now()<Su}function dt(){let e=Qv.then(()=>ey(),()=>ey());return Qv=e.catch(()=>{}),e}async function ey(){let e=await ut().catch(()=>0);d.meta.myUserId=e||0,await jt();let t=Qt(),o;try{o=await Ee(ce,Jv)}catch{return d.pages}let n=[{list:ce,rows:o}];if(t!==ce)try{let f=await Ee(t,Jv);n.push({list:t,rows:f})}catch{return d.pages}let r=new Map(At),{rowToPageId:a,sourceListByPageId:i}=oy(n);At.clear();for(let[f,g]of i)At.set(f,g);let s=n.flatMap(f=>f.rows),l=ty(s,e).map(f=>QL(f,a.get(f)??String(f.Id))),c=new Map(l.map(f=>[f.id,f])),m=Date.now();for(let[f,g]of _r){let y=c.get(f);g.state==="create"?(y||m-g.at>=Zv)&&Rn(f):g.state==="restore"?(y&&!y.trashed||m-g.at>=Zv)&&Rn(f):g.state==="delete-soft"?y&&y.trashed?Rn(f):y?g.absentReads=0:(g.absentReads=(g.absentReads??0)+1,g.absentReads>=2&&Rn(f)):g.state==="delete-purge"&&(y?g.absentReads=0:(g.absentReads=(g.absentReads??0)+1,g.absentReads>=2&&Rn(f)))}let p=[];for(let f of l){let g=_r.get(f.id);g&&g.state==="delete-purge"||(g?.state==="delete-soft"&&!f.trashed&&(f.trashed=g.at),g?.state==="restore"&&f.trashed&&delete f.trashed,p.push(f))}let u=new Set(p.map(f=>f.id));for(let[f,g]of _r){if(u.has(f)||g.state==="delete-purge")continue;let y=d.meta.pages.find(h=>h.id===f);if(!y)continue;let b={...y};g.state==="delete-soft"&&!b.trashed&&(b.trashed=g.at),g.state==="restore"&&delete b.trashed,p.push(b),At.set(f,r.get(f)||Bo(b.scope==="org"?"org":"user"))}return nu(p),Promise.resolve().then(()=>(As(),td)).then(f=>f.gcMyOrphanComments(new Set(d.meta.pages.map(g=>Os(g.id))))).catch(()=>{}),d.pages}function Pt(e){let t=e.lastIndexOf(":"),o=t>=0?e.substring(t+1):e;return parseInt(o,10)}function Au(){return d.meta.pages.filter(e=>e.trashed).map(e=>({id:e.id,title:e.title,trashed:e.trashed,type:e.type})).sort((e,t)=>t.trashed-e.trashed)}function ge(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Ze(e){return JSON.stringify(e)}async function eS(e){let t=await Nn(e,"Body_blocks"),o=ge(t?.row.Body_blocks);return nn(o)}async function ho(e){let t=await Nn(e,"Body_blocks");return Je(ge(t?.row.Body_blocks))}async function Bt(e){let o=(await Nn(e,"Body_blocks"))?.row.Body_blocks;if(!o)return"[]";try{let n=JSON.parse(o);if(!Array.isArray(n))return"[]"}catch{return"[]"}return o}async function mt(e){let t=await Nn(e,"Modified,Trashed");if(!t)return null;let o=t.row.Trashed;return{modified:t.modified,etag:t.etag,trashed:typeof o=="number"?o:0}}async function Bu(e){let t=await Nn(e,"Body_blocks,Modified");if(!t)return null;let o=t.row.Body_blocks||"",n=ge(o),r=Ze(n);return{html:nn(n),body:r,modified:t.modified,etag:t.etag}}async function ct(e,t){let o=Pt(e);if(!o)return;let n=nt(e);await je(n,o,t);try{let r=await Nn(e,"Modified");r&&(d.sync.pageId===e&&(d.sync.loadedEtag=r.etag,d.sync.loadedModified=r.modified),r.etag&&Jo(e).set(r.etag))}catch{}}async function ln(e,t,o="user"){await jt();let n=Bo(o),r=await Ne(n,{Title:e,ParentId:t||"",PageType:"page",Icon:"",Pinned:0,Trashed:0,Body_blocks:"[]",Scope:o,AuthorId:d.meta.myUserId}),a=cn(n,r.Id);return At.set(a,n),On(a),Dt(),d.meta.pages.push({id:a,title:e,parent:t||"",type:"page",icon:"",scope:o,authorId:d.meta.myUserId}),{Id:a,Title:e,ParentId:t||"",Type:"page"}}async function qa(e,t,o,n="user",r=!1){await jt();let a=Bo(n),i=await Ne(a,{Title:e,ParentId:t||"",PageType:"database",Icon:"",Pinned:0,Trashed:0,ListTitle:o,Body_blocks:"[]",Scope:n,AuthorId:d.meta.myUserId,...r?{IsTemplate:1}:{}}),s=cn(a,i.Id);return At.set(s,a),On(s),Dt(),d.meta.pages.push({id:s,title:e,parent:t||"",type:"database",list:o,icon:"",scope:n,authorId:d.meta.myUserId,...r?{isTemplate:!0}:{}}),{Id:s,Title:e,ParentId:t||"",Type:"database"}}async function Ya(e,t,o,n){return Rs(e,t,o,n)}async function Va(e,t,o,n){let r=Xe(o);return Rs(e,t,Ze(r),n)}async function Rs(e,t,o,n){let r=Pt(e);if(!r)throw new Error("invalid page id");let a=B(e),i=!!a?.published,s={Title:t,Body_blocks:o};if(i&&(s.PublishedDirty=1),n){let c=nt(e);if(!(await Ir(c,r,s,n)).ok)return{ok:!1,reason:"conflict"}}else await ct(e,s);a&&(a.title=t,i&&(a.publishedDirty=!0));let l=await Nn(e,"Modified");return l&&d.sync.pageId===e&&(d.sync.loadedEtag=l.etag,d.sync.loadedModified=l.modified),sn(),{ok:!0,etag:l?.etag||""}}async function Du(e){for(let t of e){let o=B(t);if(o?.type==="database"&&o.list==="memola-daily"){let{clearDailyCache:n}=await Promise.resolve().then(()=>(_n(),Ka));n();return}}}async function Ns(e){Dt();let t=B(e);if(t?.type==="database"&&t.list==="memola-daily")throw new Error("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u524A\u9664\u3067\u304D\u307E\u305B\u3093 (\u500B\u4EBA\u904B\u7528\u306B\u5FC5\u9808)");let o=ld(e);await Du(o);let n=[],r=[];for(let a of[...o].reverse()){let i=B(a),s=i?.type==="database"&&i.list?i.list:null;if(i?.published){let{unpublishPage:c}=await Promise.resolve().then(()=>(Br(),Ar));await c(a).catch(()=>{})}let l=Pt(a);try{l&&await Ve(nt(a),l),n.push(a)}catch{r.push(a);continue}if(Promise.resolve().then(()=>(As(),td)).then(c=>c.purgeCommentsForPage(Os(a))).catch(()=>{}),s){let{deleteAllRowEntriesForList:c}=await Promise.resolve().then(()=>(au(),Sv));await c(s).catch(()=>{}),await Na(s).catch(()=>{})}}for(let a of n)Pu(a,!0);if(Co(n),r.length)throw new Error("\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F ("+r.length+" \u4EF6)\u3002\u4E00\u90E8\u306E\u30DA\u30FC\u30B8\u306F\u6B8B\u3063\u3066\u3044\u307E\u3059\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002");return n}async function Rr(e,t){if(e===t)return;Dt();let o=t;for(;o;){if(o===e)throw new Error("\u5FAA\u74B0\u53C2\u7167\u306B\u306A\u308A\u307E\u3059");o=B(o)?.parent||""}let n=B(e);if(!n)return;n.parent=t||"",await ct(e,{ParentId:t||""});let r=d.pages.find(a=>a.Id===e);r&&(r.ParentId=t||"")}function _u(e,t){if(!t)return null;let o=B(e),n=B(t);if(!o||!n)return null;let r=o.scope==="org"||o.scope==="user"?o.scope:"user",a=n.scope==="org"||n.scope==="user"?n.scope:"user";return r===a?null:a}async function Hs(e){Dt();let t=B(e);if(t?.type==="database"&&t.list==="memola-daily")throw new Error("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u524A\u9664\u3067\u304D\u307E\u305B\u3093 (\u500B\u4EBA\u904B\u7528\u306B\u5FC5\u9808)");let o=ld(e);await Du(o);let n=Date.now(),r=d.meta.myUserId||await ut().catch(()=>0),a=[];for(let i of o){let s=B(i),l=s?.trashed,c=s?.trashedBy;s&&(s.trashed=n,s.trashedBy=r),Pu(i,!1);try{await ct(i,{Trashed:n,TrashedBy:r})}catch{s&&(l?s.trashed=l:delete s.trashed,c?s.trashedBy=c:delete s.trashedBy),Rn(i),a.push(i)}}if(a.length)throw new Error("\u30B4\u30DF\u7BB1\u3078\u306E\u79FB\u52D5\u306B\u5931\u6557\u3057\u307E\u3057\u305F ("+a.length+" \u4EF6)\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")}async function Fs(e){let t=ld(e);await Du(t);let o=[];for(let n of t){let r=B(n),a=r?.trashed,i=r?.trashedBy;r&&(delete r.trashed,delete r.trashedBy),ay(n);try{await ct(n,{Trashed:0,TrashedBy:0})}catch{r&&(a&&(r.trashed=a),i&&(r.trashedBy=i)),Rn(n),o.push(n)}}if(o.length)throw new Error("\u5FA9\u5143\u306B\u5931\u6557\u3057\u307E\u3057\u305F ("+o.length+" \u4EF6)\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")}async function Nr(e){return Dt(),Ns(e)}async function Ru(e,t){let o=B(e);o&&(t?o.pinned=!0:delete o.pinned,await ct(e,{Pinned:t?1:0}))}async function Us(e,t){let o=B(e);o&&(o.icon=t),await ct(e,{Icon:t})}async function Xa(e,t,o=!0){if(Dt(15e3),t==="org"){let m=B(e);if(m?.type==="database"&&m.list==="memola-daily")throw new Error("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u7D44\u7E54\u306B\u516C\u958B\u3067\u304D\u307E\u305B\u3093 (\u500B\u4EBA\u5C02\u7528)")}let n=o?ld(e):[e],r=Bo(t);if(!n.some(m=>nt(m)!==r)){for(let p of n){let u=Pt(p);u&&await je(nt(p),u,{Scope:t}).catch(()=>{});let f=B(p);f&&(f.scope=t)}let m={};for(let p of n)m[p]=p;return{rootId:e,idMap:m}}let i=new Set(n),s={},l=["Title","PageType","Icon","Pinned","Trashed","ListTitle","DbRowId","Body_blocks","Published","PublishedUrl","PublishedPageId","PublishedDirty","OriginDailyDate","OriginPageId","IsTemplate","AuthorId"];for(let m of n){let p=nt(m),u=Pt(m);if(!u)continue;let f=await xs(p,u).catch(()=>null);if(!f)continue;let g=f,y=g.ParentId||"",h={ParentId:i.has(y)?s[y]??"":y,Scope:t};for(let x of l)g[x]!==void 0&&g[x]!==null&&(h[x]=g[x]);let v=await Ne(r,h),w=cn(r,v.Id);s[m]=w,At.set(w,r),On(w),await Ve(p,u).catch(()=>{}),At.delete(m)}await dt();let c={};for(let[m,p]of Object.entries(s))c[m]=Sr(r,Pt(p));return sn(),Promise.resolve().then(()=>(As(),td)).then(m=>m.remapCommentsPageId(new Map(Object.entries(c)))).catch(()=>{}),{rootId:c[e]??s[e]??e,idMap:c}}async function tS(e,t=new Set){let o=await Bt(e).catch(()=>null);if(!o)return[];let n;try{n=ge(o)}catch{return[]}let r=[],a=new Set,i=l=>{for(let c of l)if(c.kind==="pagelink"){let m=c.pageId;if(a.has(m)||t.has(m))continue;let p=B(m);p&&p.scope!=="org"&&(a.add(m),r.push(p.title||c.alias||m))}else(c.kind==="bold"||c.kind==="italic"||c.kind==="strike"||c.kind==="link")&&i(c.children)},s=l=>{for(let c of l){if("inline"in c&&Array.isArray(c.inline)&&i(c.inline),c.kind==="table")for(let m of c.rows)for(let p of m)i(p);if((c.kind==="quote"||c.kind==="callout")&&s(c.children),c.kind==="list")for(let m of c.items)s(m)}};return s(n),r}async function Ja(e,t){let o=B(e);o&&(o.title=t,o.published&&(o.publishedDirty=!0));let n={Title:t};o?.published&&(n.PublishedDirty=1),await ct(e,n)}async function oS(e){await jt();let t=B(e);if(!t)throw new Error("\u539F\u672C\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");let o=await Bt(e),n="[\u4E0B\u66F8\u304D] "+(t.title||"\u7121\u984C"),r=t.scope||"user",a=Bo(r),i=await Ne(a,{Title:n,ParentId:"",PageType:"draft",Icon:"\u270F\uFE0F",Pinned:0,Trashed:0,Body_blocks:o||"[]",OriginPageId:e,OriginBaseBlocks:o||"[]",Scope:r,AuthorId:d.meta.myUserId}),s=cn(a,i.Id);return At.set(s,a),On(s),Dt(),d.meta.pages.push({id:s,title:n,parent:"",type:"page",icon:"\u270F\uFE0F",originPageId:e,authorId:d.meta.myUserId}),{Id:s,Title:n,ParentId:"",Type:"page",IsDraft:!0}}function Nu(){return d.meta.pages.filter(e=>e.isTemplate&&!e.trashed).sort((e,t)=>(e.title||"\u7121\u984C").localeCompare(t.title||"\u7121\u984C","ja"))}async function nS(e){await jt();let t=B(e);if(!t)throw new Error("\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(t.type==="database")throw new Error("DB \u306E\u30C6\u30F3\u30D7\u30EC\u767B\u9332\u306F\u672A\u5BFE\u5FDC\u3067\u3059");let o=await Bt(e),n=t.title||"\u7121\u984C",r=t.scope||"user",a=Bo(r),i=await Ne(a,{Title:n,ParentId:"",PageType:"page",Icon:t.icon||"",Pinned:0,Trashed:0,Body_blocks:o||"[]",Scope:r,IsTemplate:1,AuthorId:d.meta.myUserId}),s=cn(a,i.Id);return At.set(s,a),On(s),Dt(),d.meta.pages.push({id:s,title:n,parent:"",type:"page",icon:t.icon||"",scope:r,isTemplate:!0,authorId:d.meta.myUserId}),sn(),s}async function rS(e){await jt();let t=B(e);if(!t)throw new Error("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(t.type==="database")throw new Error("DB \u30C6\u30F3\u30D7\u30EC\u304B\u3089\u306E\u4F5C\u6210\u306F\u672A\u5BFE\u5FDC\u3067\u3059");let o=await Bt(e),n=t.title||"\u7121\u984C",r="user",a=Bo(r),i=await Ne(a,{Title:n,ParentId:"",PageType:"page",Icon:t.icon||"",Pinned:0,Trashed:0,Body_blocks:o||"[]",Scope:r,AuthorId:d.meta.myUserId}),s=cn(a,i.Id);return At.set(s,a),On(s),Dt(),d.meta.pages.push({id:s,title:n,parent:"",type:"page",icon:t.icon||"",scope:r,authorId:d.meta.myUserId}),sn(),{Id:s,Title:n,ParentId:"",Type:"page"}}async function aS(e){await jt();let t=B(e);if(!t)throw new Error("\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(t.type==="database")throw new Error("DB \u306F\u3053\u306E\u7D4C\u8DEF\u3067\u306F\u8907\u88FD\u3067\u304D\u307E\u305B\u3093");let o=await Bt(e),n=(t.title||"\u7121\u984C")+" (\u30B3\u30D4\u30FC)",r=t.scope||"user",a=Bo(r),i=await Ne(a,{Title:n,ParentId:t.parent||"",PageType:"page",Icon:t.icon||"",Pinned:0,Trashed:0,Body_blocks:o||"[]",Scope:r,AuthorId:d.meta.myUserId}),s=cn(a,i.Id);return At.set(s,a),On(s),Dt(),d.meta.pages.push({id:s,title:n,parent:t.parent||"",type:"page",icon:t.icon||"",scope:r,authorId:d.meta.myUserId}),sn(),{Id:s,Title:n,ParentId:t.parent||"",Type:"page"}}async function iS(e){let t=B(e),o=Pt(e);o&&await Ve(nt(e),o).catch(()=>{}),t?.type==="database"&&t.list&&await Na(t.list).catch(()=>{}),Co([e]),sn()}async function sS(e,t){let o=B(e);if(!o)throw new Error("\u4E0B\u66F8\u304D\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(!o.originPageId)throw new Error("\u3053\u306E\u30DA\u30FC\u30B8\u306F\u4E0B\u66F8\u304D\u3067\u306F\u3042\u308A\u307E\u305B\u3093");let n=o.originPageId;if(!d.meta.pages.find(g=>g.id===n&&!g.trashed))throw new Error("\u539F\u672C\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093 (\u524A\u9664\u6E08\u307F?)");let a=o.title.replace(/^\[下書き\]\s*/,""),i=await Bt(e);if(t?.force){if(!(await Rs(n,a,i||"[]")).ok)throw new Error("\u539F\u672C\u306E\u66F4\u65B0\u306B\u5931\u6557\u3057\u307E\u3057\u305F (\u7AF6\u5408)");return await Ns(e).catch(()=>{}),{status:"forced",originId:n}}let l=(await Nn(e,"OriginBaseBlocks"))?.row.OriginBaseBlocks??"",c=await Bt(n),m=l!==""&&Ze(ge(c))===Ze(ge(l));if(!l||m)return(await Rs(n,a,i||"[]")).ok?(await Ns(e).catch(()=>{}),{status:"applied",originId:n}):{status:"conflict",originId:n,conflicts:1};let{threeWayMergeBlocks:p}=await Promise.resolve().then(()=>(sd(),Wv)),u=p(ge(l),ge(i),ge(c));return u.conflicts.length>0?{status:"conflict",originId:n,conflicts:u.conflicts.length}:(await Rs(n,a,Ze(u.merged))).ok?(await Ns(e).catch(()=>{}),{status:"merged",originId:n,autoMerged:u.autoMergedCount}):{status:"conflict",originId:n,conflicts:1}}async function lS(e){let t=B(e);if(!t)throw new Error("\u4E0B\u66F8\u304D\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(!t.originPageId)throw new Error("\u3053\u306E\u30DA\u30FC\u30B8\u306F\u4E0B\u66F8\u304D\u3067\u306F\u3042\u308A\u307E\u305B\u3093");let o=(t.title||"\u7121\u984C").replace(/^\[下書き\]\s*/,""),n=t.icon==="\u270F\uFE0F"?"":t.icon||"";return await ct(e,{Title:o,PageType:"page",OriginPageId:"",Icon:n}),t.title=o,t.originPageId=void 0,t.icon=n,sn(),e}var ce,Ga,Gv,ZL,At,Jv,_r,Zv,Su,Qv,ld,V=L(()=>{"use strict";q();De();Lt();Fe();Mt();rn();Tr();Zt();Ts();be();we();au();ce="memola-pages";Ga=null;Gv=[["ParentId",2],["PageType",2],["Icon",2],["Pinned",9],["Trashed",9],["ListTitle",2],["DbRowId",9],["Body_blocks",3],["Published",9],["PublishedUrl",3],["PublishedPageId",9],["PublishedDirty",9],["OriginDailyDate",2],["OriginPageId",2],["Scope",2],["TrashedBy",9],["IsTemplate",9],["OriginBaseBlocks",3]],ZL=["ListTitle","DbRowId","PageType","Scope","Trashed","TrashedBy"];At=new Map;Jv="Id,Title,ParentId,PageType,Icon,Pinned,Trashed,ListTitle,DbRowId,Published,PublishedUrl,PublishedPageId,PublishedDirty,OriginDailyDate,OriginPageId,Scope,AuthorId,TrashedBy,IsTemplate",_r=new Map,Zv=5*6e4;Su=0;Qv=Promise.resolve();ld=e=>an(d.pages,e)});function P(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Re=L(()=>{"use strict"});function sy(){return typeof BroadcastChannel>"u"?null:(Za||(Za=new BroadcastChannel(cS)),Za)}function ly(e,t,o){let n=sy();if(!n)return;let r={type:"page-saved",pageId:e,etag:t,modified:o,tabId:iy};try{n.postMessage(r)}catch{}}function cy(){if(Za){try{Za.close()}catch{}Za=null}}function dy(e){let t=sy();if(!t)return()=>{};let o=n=>{let r=n.data;!r||r.type!=="page-saved"||r.tabId!==iy&&e(r)};return t.addEventListener("message",o),()=>t.removeEventListener("message",o)}var cS,iy,Za,Ou=L(()=>{"use strict";Fe();cS="memola-cross-tab:"+W,iy=Math.random().toString(36).slice(2)+Date.now().toString(36),Za=null});function Hu(e){let t=e.split(`
`),o=[],n="";for(let r of t)n?(n+=`
`+r,r.endsWith("  ")||(o.push(n),n="")):r.endsWith("  ")?n=r:o.push(r);return n&&o.push(n),o}function Fu(e,t,o){let n=Hu(e),r=Hu(t),a=Hu(o),i=my(n,r),s=my(n,a),l=py(i,r),c=py(s,a),m=[],p=[],u=0,f=new Map,g=new Map;for(let v of l)f.set(v.baseStart,v);for(let v of c)g.set(v.baseStart,v);let y=0;for(;y<n.length;){let v=f.get(y),w=g.get(y);if(!v&&!w){m.push(n[y]),y++;continue}if(v&&!w){m.push(...v.replacement),u++,y=v.baseEnd;continue}if(w&&!v){m.push(...w.replacement),u++,y=w.baseEnd;continue}if(v&&w){let x=v.baseEnd,T=w.baseEnd;if(x===T&&v.replacement.length===w.replacement.length&&v.replacement.every((N,D)=>N===w.replacement[D])){m.push(...v.replacement),u++,y=x;continue}let U=n.slice(y,Math.max(x,T)),M={id:p.length,yours:v.replacement,theirs:w.replacement,base:U};p.push(M),m.push(cd+" #"+M.id),m.push(...M.yours),m.push(dd),m.push(...M.base),m.push(md),m.push(...M.theirs),m.push(pd+" #"+M.id),y=Math.max(x,T)}}let b=f.get(n.length),h=g.get(n.length);if(b||h)if(b&&h)if(b.replacement.length===h.replacement.length&&b.replacement.every((w,x)=>w===h.replacement[x]))m.push(...b.replacement),u++;else{let w={id:p.length,yours:b.replacement,theirs:h.replacement,base:[]};p.push(w),m.push(cd+" #"+w.id),m.push(...w.yours),m.push(dd),m.push(md),m.push(...w.theirs),m.push(pd+" #"+w.id)}else b?(m.push(...b.replacement),u++):h&&(m.push(...h.replacement),u++);return{merged:m.join(`
`),conflicts:p,autoMergedCount:u}}function my(e,t){let o=e.length,n=t.length,r=Array.from({length:o+1},()=>new Array(n+1).fill(0));for(let l=1;l<=o;l++)for(let c=1;c<=n;c++)r[l][c]=e[l-1]===t[c-1]?r[l-1][c-1]+1:Math.max(r[l-1][c],r[l][c-1]);let a=[],i=o,s=n;for(;i>0&&s>0;)e[i-1]===t[s-1]?(a.push({op:"=",base:i-1,side:s-1}),i--,s--):r[i-1][s]>=r[i][s-1]?(a.push({op:"-",base:i-1}),i--):(a.push({op:"+",side:s-1}),s--);for(;i>0;)a.push({op:"-",base:i-1}),i--;for(;s>0;)a.push({op:"+",side:s-1}),s--;return a.reverse(),a}function py(e,t){let o=[],n=0;for(;n<e.length;){if(e[n].op==="="){n++;continue}let a=null,i=null,s=[];for(;n<e.length&&e[n].op!=="=";){let l=e[n];l.op==="-"?(a===null&&(a=l.base),i=l.base+1):l.op==="+"&&s.push(t[l.side]),n++}if(a===null){let l=e.slice(n).find(c=>c.op==="=");a=l?l.base:dS(e)+1,i=a}o.push({baseStart:a,baseEnd:i??a,replacement:s})}return o}function dS(e){for(let t=e.length-1;t>=0;t--){let o=e[t];if(o.op==="="||o.op==="-")return o.base}return-1}function uy(e,t,o){let n=e.split(`
`),r=cd+" #"+t,a=pd+" #"+t,i=n.findIndex(y=>y===r),s=n.findIndex((y,b)=>b>i&&y===a);if(i<0||s<0)return e;let l=-1,c=-1;for(let y=i+1;y<s;y++)n[y]===dd&&(l=y),n[y]===md&&(c=y);if(c<0)return e;let m=n.slice(i+1,l>=0?l:c),p=n.slice(c+1,s),u;Array.isArray(o)?u=o:o==="yours"?u=m:o==="theirs"||m.length===0?u=p:p.length===0?u=m:u=[...m,"",...p];let f=n.slice(0,i),g=n.slice(s+1);return[...f,...u,...g].join(`
`)}function fy(e){if(e.includes(cd)||e.includes(pd))return!0;for(let t of e.split(`
`))if(t===md||t===dd)return!0;return!1}var cd,dd,md,pd,gy=L(()=>{"use strict";cd="<<<<<<< \u3042\u306A\u305F",dd="||||||| \u5143\u306E\u72B6\u614B",md="=======",pd=">>>>>>> SP \u6700\u65B0"});function Hn(e,t){return e==="lastBy"||e==="lastAt"?void 0:t}function hy(e){return JSON.stringify(e,Hn)}function Uu(e){return e.trim().startsWith("[")}function by(e){let t=e.trim();if(t===""||t==="[]")return!0;if(!t.startsWith("["))return!1;try{let o=ge(e);return o.length===0?!0:o.length===1&&o[0].kind==="p"&&o[0].inline?.length===0}catch{return!1}}function Do(e,t){if(e===t)return!0;let o=by(e),n=by(t);if(o||n)return o&&n;if(!Uu(e)||!Uu(t))return e===t;try{let r=JSON.stringify(ge(e),Hn),a=JSON.stringify(ge(t),Hn);return r===a}catch{return e===t}}function vy(e,t,o,n){if(!Uu(e))return e;let r=ge(e),a=ge(t),i=new Map;for(let l of a)i.set(l.id,l);let s=r.map(l=>{let c=i.get(l.id);if(c&&hy(c)===hy(l)){let m={...l};return c.lastBy!==void 0?m.lastBy=c.lastBy:delete m.lastBy,c.lastAt!==void 0?m.lastAt=c.lastAt:delete m.lastAt,m}return{...l,lastBy:o,lastAt:n}});return Ze(s)}var Qa=L(()=>{"use strict";V()});var ti={};j(ti,{saver:()=>re});function ud(e,t){let o=d.meta.myUserId||0;return vy(e,t,o,Date.now())}function ei(e){if(!e)return"";try{let t=JSON.parse(e);if(Array.isArray(t))return Je(t)}catch{}return e}function mS(e){return Ze(Xe(e))}function pS(e,t,o){let n=l=>{let c=(l||"").trim();return c===""||c.startsWith("[")};if(!n(e)||!n(t)||!n(o))return null;let r=ge(e),a=ge(t),i=ge(o);if(r.length===0&&a.length===0&&i.length===0)return null;let s=Dr(r,a,i);return s.conflicts.length>0?null:Ze(s.merged)}function yy(e,t,o){return t===o?t:t===e?o:t}var zu,re,ht=L(()=>{"use strict";V();gy();Mt();V();sd();Qa();q();zu=class{constructor(){this._state={kind:"unloaded"};this._listeners=new Set;this._saveInFlight=null;this._generation=0}state(){return this._state}subscribe(t){this._listeners.add(t);try{t(this._state)}catch{}return()=>{this._listeners.delete(t)}}isDirty(t){let o=this._state;return o.kind==="dirty"||o.kind==="saving"?t==null||o.base.pageId===t:!1}isBusy(){let t=this._state.kind;return t==="saving"||t==="conflict"||t==="merging"}loadPage(t){this._generation++,this._saveInFlight=null,this._set({kind:"idle",base:t})}unload(){this._generation++,this._saveInFlight=null,this._set({kind:"unloaded"})}rebaseOnto(t,o,n){let r=this._state;if(r.kind!=="idle"&&r.kind!=="dirty"||(r.kind==="idle",r.base).pageId!==t.pageId)return;let i={pageId:t.pageId,body:t.body,title:t.title,etag:t.etag,modified:t.modified};Do(o,i.body)&&n===i.title?this._set({kind:"idle",base:i}):this._set({kind:"dirty",base:i,body:o,title:n})}notifyEdit(t,o){let n=this._state;switch(n.kind){case"unloaded":return;case"idle":if(Do(t,n.base.body)&&o===n.base.title)return;this._set({kind:"dirty",base:n.base,body:t,title:o});return;case"dirty":Do(t,n.base.body)&&o===n.base.title?this._set({kind:"idle",base:n.base}):this._set({kind:"dirty",base:n.base,body:t,title:o});return;case"saving":this._set({kind:"saving",base:n.base,body:t,title:o});return;case"conflict":case"merging":{let r=n.conflict,a={pageId:r.pageId,body:r.base.body,title:r.base.title,etag:r.base.etag,modified:r.base.modified};Do(t,a.body)&&o===a.title?this._set({kind:"idle",base:a}):this._set({kind:"dirty",base:a,body:t,title:o});return}}}save(){if(this._saveInFlight)return this._saveInFlight;let t=this._state;return t.kind!=="dirty"?Promise.resolve({ok:!1,reason:"noop"}):this._runSave(t.base,t.body,t.title)}_runSave(t,o,n){this._set({kind:"saving",base:t,body:o,title:n});let r=this._generation,a=ud(o,t.body),i=(async()=>{try{let s=await Ya(t.pageId,n,a,t.etag);if(r!==this._generation)return s.ok?{ok:!0}:{ok:!1,reason:"conflict"};if(s.ok){let b=await mt(t.pageId).catch(()=>null);if(r!==this._generation)return{ok:!0};let h={pageId:t.pageId,body:a,title:n,etag:s.etag,modified:b?.modified||t.modified},v=this._state;return v.kind==="saving"&&v.body===o&&v.title===n?this._set({kind:"idle",base:h}):v.kind==="saving"&&this._set({kind:"dirty",base:h,body:v.body,title:v.title}),{ok:!0}}let l=await Bt(t.pageId).catch(()=>null),c=await mt(t.pageId).catch(()=>null);if(l===null||!c?.etag){let b=this._state,h=b.kind==="saving"?b.body:o,v=b.kind==="saving"?b.title:n;return this._set({kind:"dirty",base:t,body:h,title:v}),{ok:!1,reason:"error",error:new Error("remote-fetch-failed")}}let m=c.title??t.title,p=this._state,u=p.kind==="saving"?p.body:o,f=p.kind==="saving"?p.title:n,g=pS(t.body,u,l);if(g!==null){let b=yy(t.title,f,m),h=ud(g,t.body),v=await Ya(t.pageId,b,h,c.etag);if(r!==this._generation)return v.ok?{ok:!0}:{ok:!1,reason:"conflict"};if(v.ok){let w=await mt(t.pageId).catch(()=>null);return r!==this._generation?{ok:!0}:(this._set({kind:"idle",base:{pageId:t.pageId,body:h,title:b,etag:v.etag,modified:w?.modified||t.modified}}),{ok:!0})}}let y={pageId:t.pageId,ours:{body:u,title:f},base:{body:t.body,etag:t.etag,title:t.title,modified:t.modified},theirs:{body:l,etag:c.etag,modified:c.modified||"",title:m}};return this._set({kind:"conflict",conflict:y}),{ok:!1,reason:"conflict"}}catch(s){if(r!==this._generation)return{ok:!1,reason:"error",error:s};let l=this._state,c=l.kind==="saving"?l.body:o,m=l.kind==="saving"?l.title:n;return this._set({kind:"dirty",base:t,body:c,title:m}),{ok:!1,reason:"error",error:s}}finally{r===this._generation&&(this._saveInFlight=null)}})();return this._saveInFlight=i,i}async flush(){if(this._saveInFlight)try{await this._saveInFlight}catch{}if(this._state.kind==="dirty")try{await this.save()}catch{}}forceOverwrite(){if(this._saveInFlight)return this._saveInFlight;let t=this._state;if(t.kind!=="conflict"&&t.kind!=="merging")return Promise.resolve({ok:!1,reason:"noop"});let o=t.conflict,n=this._generation,r=ud(o.ours.body,o.base.body),a=(async()=>{try{let i=await Ya(o.pageId,o.ours.title,r);if(n!==this._generation)return i.ok?{ok:!0}:{ok:!1,reason:"error",error:new Error("overwrite-failed")};if(i.ok){let s=await mt(o.pageId).catch(()=>null);if(n!==this._generation)return{ok:!0};let l={pageId:o.pageId,body:r,title:o.ours.title,etag:i.etag,modified:s?.modified||""};return this._set({kind:"idle",base:l}),{ok:!0}}return{ok:!1,reason:"error",error:new Error("overwrite-failed")}}catch(i){return{ok:!1,reason:"error",error:i}}finally{n===this._generation&&(this._saveInFlight=null)}})();return this._saveInFlight=a,a}acceptTheirs(){let t=this._state;t.kind!=="conflict"&&t.kind!=="merging"||(this._saveInFlight=null,this._set({kind:"unloaded"}))}cancelConflict(){let t=this._state;if(t.kind!=="conflict"&&t.kind!=="merging")return;let o=t.conflict,n={pageId:o.pageId,body:o.base.body,title:o.base.title,etag:o.base.etag,modified:o.base.modified};Do(o.ours.body,n.body)&&o.ours.title===n.title?this._set({kind:"idle",base:n}):this._set({kind:"dirty",base:n,body:o.ours.body,title:o.ours.title})}startMerge(){let t=this._state;if(t.kind!=="conflict")return;let o=t.conflict,n=Fu(ei(o.base.body),ei(o.ours.body),ei(o.theirs.body));this._set({kind:"merging",conflict:o,hunks:n.conflicts,rawMerged:n.merged,resolved:new Map})}setMergeChoice(t,o){let n=this._state;if(n.kind!=="merging")return;let r=new Map(n.resolved);r.set(t,o),this._set({...n,resolved:r})}computeMergedBody(){let t=this._state;if(t.kind!=="merging")return"";let o=t.rawMerged;for(let[n,r]of t.resolved)o=uy(o,n,r);return o}computeMergedBodyForSave(){return mS(this.computeMergedBody())}isMergeResolved(){let t=this._state;return t.kind!=="merging"?!1:t.hunks.length===0?!0:t.resolved.size<t.hunks.length?!1:!fy(this.computeMergedBody())}applyMerge(){if(this._saveInFlight)return this._saveInFlight;let t=this._state;if(t.kind!=="merging")return Promise.resolve({ok:!1,reason:"noop"});if(!this.isMergeResolved())return Promise.resolve({ok:!1,reason:"error",error:new Error("\u672A\u89E3\u6C7A\u306E\u7AF6\u5408\u304C\u3042\u308A\u307E\u3059")});let o=this.computeMergedBodyForSave(),n=t.conflict,r=yy(n.base.title,n.ours.title,n.theirs.title),a=ud(o,n.base.body),i=this._generation,s=(async()=>{try{let l=await Ya(n.pageId,r,a,n.theirs.etag);if(i!==this._generation)return l.ok?{ok:!0}:{ok:!1,reason:"conflict"};if(l.ok){let u=await mt(n.pageId).catch(()=>null);if(i!==this._generation)return{ok:!0};let f={pageId:n.pageId,body:a,title:r,etag:l.etag,modified:u?.modified||""};return this._set({kind:"idle",base:f}),{ok:!0}}let c=await Bt(n.pageId).catch(()=>null),m=await mt(n.pageId).catch(()=>null);if(c===null||!m?.etag)return{ok:!1,reason:"error",error:new Error("remote-fetch-failed")};if(i!==this._generation)return{ok:!1,reason:"conflict"};let p={pageId:n.pageId,ours:{body:o,title:r},base:{body:n.theirs.body,etag:n.theirs.etag,title:n.theirs.title,modified:n.theirs.modified},theirs:{body:c,etag:m.etag,modified:m.modified||"",title:m.title??n.theirs.title}};return this._set({kind:"conflict",conflict:p}),{ok:!1,reason:"conflict"}}catch(l){return{ok:!1,reason:"error",error:l}}finally{i===this._generation&&(this._saveInFlight=null)}})();return this._saveInFlight=s,s}cancelMerge(){let t=this._state;t.kind==="merging"&&this._set({kind:"conflict",conflict:t.conflict})}async beginExternalMerge(t){let o=await Bt(t.pageId).catch(()=>null),n=await mt(t.pageId).catch(()=>null);if(o===null||!n?.etag)throw new Error("beginExternalMerge: remote-fetch-failed");let r={pageId:t.pageId,ours:{body:t.ourBody,title:t.title},base:{body:t.baseBody,etag:t.baseEtag,title:t.title,modified:""},theirs:{body:o,etag:n.etag,modified:n.modified||"",title:t.pageTitle}},a=t.baseBody??o,i=Fu(ei(a),ei(t.ourBody),ei(o));this._set({kind:"merging",conflict:r,hunks:i.conflicts,rawMerged:i.merged,resolved:new Map})}_set(t){this._state=t;for(let o of this._listeners)try{o(t)}catch{}}},re=new zu});function ju(e){return e.trim().startsWith("[")}function xy(e,t,o){if(!ju(e)||!ju(t)||!ju(o))return{kind:"noop"};let n,r,a;try{n=ge(e),r=ge(t),a=ge(o)}catch{return{kind:"noop"}}let i=Dr(n,r,a);if(i.conflicts.length>0)return{kind:"conflict"};let s=Ze(i.merged);return{kind:"merge",merged:i.merged,mergedBody:s,changed:!Do(s,t)}}var wy=L(()=>{"use strict";V();sd();Qa()});function bo(e,t){let o=e.blocks.findIndex(n=>n.id===t);return o<0?null:{idx:o,block:e.blocks[o]}}function _o(e,t){return qu(e.blocks,t,[])}function qu(e,t,o){for(let n=0;n<e.length;n++){let r=e[n];if(r.id===t)return{path:[...o,n],block:r};if(r.kind==="callout"||r.kind==="quote"){let a=qu(r.children,t,[...o,n]);if(a)return a}else if(r.kind==="list")for(let a=0;a<r.items.length;a++){let i=qu(r.items[a],t,[...o,n,a]);if(i)return i}}return null}function Fn(e,t,o){if(t.length===0)return e;if(t.length===1){let l=t[0];if(l<0||l>=e.length)return e;let c=e.slice();return c[l]=o(e[l]),c}let[n,...r]=t;if(n<0||n>=e.length)return e;let a=e[n],i;if(a.kind==="callout"||a.kind==="quote")i={...a,children:Fn(a.children,r,o)};else if(a.kind==="list"){let[l,...c]=r;if(l<0||l>=a.items.length)return e;let m=a.items.slice();m[l]=Fn(a.items[l],c,o),i={...a,items:m}}else return e;let s=e.slice();return s[n]=i,s}function mn(e,t,o){let n=e.blocks.slice();return n[t]=o,{...e,blocks:n}}function Iy(e,t,o){let n=e.blocks.slice();return n.splice(t,0,o),{...e,blocks:n}}function Or(e,t,o){let n=_o(e,t);if(!n)return e;let{block:r}=n;if(r.kind!=="p"&&r.kind!=="h1"&&r.kind!=="h2"&&r.kind!=="h3"&&r.kind!=="todo")return e;let a=Fn(e.blocks,n.path,i=>i.kind!=="p"&&i.kind!=="h1"&&i.kind!=="h2"&&i.kind!=="h3"&&i.kind!=="todo"?i:{...i,inline:o});return{...e,blocks:a}}function Hr(e,t,o,n){if(n==="")return e;let r=_o(e,t);if(!r)return e;let{block:a}=r;if(a.kind==="code"){let l=a.text.slice(0,o)+n+a.text.slice(o),c=Fn(e.blocks,r.path,m=>m.kind==="code"?{...m,text:l}:m);return{...e,blocks:c,selection:{kind:"caret",blockId:t,offset:o+n.length}}}if(!("inline"in a))return e;let i=fS(a.inline,o,n);return{...Or(e,t,i),selection:{kind:"caret",blockId:t,offset:o+n.length}}}function Yu(e,t,o){let n=_o(e,t);if(!n)return e;let{block:r}=n;if(!("inline"in r))return e;let a=Le(r.inline,0,o),i=Le(r.inline,o,1/0),s=Le([...a,{kind:"br"},...i],0,1/0);return{...Or(e,t,s),selection:{kind:"caret",blockId:t,offset:o+1}}}function ni(e,t,o,n){if(n===0)return e;let r=_o(e,t);if(!r)return e;let{block:a}=r;if(a.kind==="code"){let m=n<0?Math.max(0,o+n):o,p=n<0?o:Math.min(a.text.length,o+n);if(m===p)return e;let u=a.text.slice(0,m)+a.text.slice(p);if(u===""){let g=Fn(e.blocks,r.path,()=>({id:a.id,kind:"p",inline:[]}));return{...e,blocks:g,selection:{kind:"caret",blockId:a.id,offset:0}}}let f=Fn(e.blocks,r.path,g=>g.kind==="code"?{...g,text:u}:g);return{...e,blocks:f,selection:{kind:"caret",blockId:t,offset:m}}}if(!("inline"in a))return e;let i=n<0?o+n:o,s=n<0?o:o+n;if(i===s)return e;let l=gS(a.inline,i,s);return{...Or(e,t,l),selection:{kind:"caret",blockId:t,offset:i}}}function Xu(e,t,o){let n=bo(e,t);if(n){let{idx:a,block:i}=n;return"inline"in i?uS(e,a,i,o):e}let r=Ku(e.blocks,t,o);return r?{...e,blocks:r.blocks,selection:{kind:"caret",blockId:r.newId,offset:0}}:e}function uS(e,t,o,n){if(!("inline"in o))return e;let r=Le(o.inline,0,n),a=Le(o.inline,n,1/0),i={...o,inline:r},s=Q(),l=$u(o,s,a),c=mn(e,t,i);return c=Iy(c,t+1,l),{...c,selection:{kind:"caret",blockId:s,offset:0}}}function $u(e,t,o){return e.kind==="todo"?{id:t,kind:"todo",checked:!1,inline:o}:{id:t,kind:"p",inline:o}}function Ku(e,t,o){for(let n=0;n<e.length;n++){let r=e[n];if(r.kind==="list")for(let a=0;a<r.items.length;a++){let i=r.items[a],s=i.findIndex(c=>c.id===t);if(s>=0){let c=i[s];if(!("inline"in c))return null;let m=Le(c.inline,0,o),p=Le(c.inline,o,1/0),u=Q(),f={...c,inline:m},g=$u(c,u,p),y=[...i.slice(0,s),f],b=[g,...i.slice(s+1)],h=[...r.items.slice(0,a),y,b,...r.items.slice(a+1)],v=e.slice();return v[n]={...r,items:h},{blocks:v,newId:u}}let l=Ku(i,t,o);if(l){let c=r.items.slice();c[a]=l.blocks;let m=e.slice();return m[n]={...r,items:c},{blocks:m,newId:l.newId}}}else if(r.kind==="callout"||r.kind==="quote"){let a=r.children.findIndex(s=>s.id===t);if(a>=0){let s=r.children[a];if(!("inline"in s))return null;let l=Le(s.inline,0,o),c=Le(s.inline,o,1/0),m=Q(),p={...s,inline:l},u=$u(s,m,c),f=[...r.children.slice(0,a),p,u,...r.children.slice(a+1)],g=e.slice();return g[n]={...r,children:f},{blocks:g,newId:m}}let i=Ku(r.children,t,o);if(i){let s=e.slice();return s[n]={...r,children:i.blocks},{blocks:s,newId:i.newId}}}}return null}function pn(e,t,o){let n=_o(e,t);if(!n)return e;let{block:r}=n;if(!("inline"in r))return e;let a=r.inline,i=Fn(e.blocks,n.path,()=>o==="todo"?{id:r.id,kind:"todo",checked:!1,inline:a}:{id:r.id,kind:o,inline:a});return{...e,blocks:i}}function Ju(e,t){let o=_o(e,t);if(!o||o.block.kind!=="todo")return e;let n=Fn(e.blocks,o.path,r=>r.kind!=="todo"?r:{...r,checked:!r.checked});return{...e,blocks:n}}function vo(e){return St(e).length}function Le(e,t,o){if(t>=o)return[];let n=[],r=0;for(let a of e){let i=gd(a);if(r+i<=t){r+=i;continue}if(r>=o)break;let s=Math.max(0,t-r),l=Math.min(i,o-r);if(s===0&&l===i)n.push(a);else{let c=hS(a,s,l);c&&n.push(c)}r+=i}return dn(n)}function fS(e,t,o){return o===""?e:zs(e,t,o)}function zs(e,t,o){let n=0;for(let r=0;r<e.length;r++){let a=e[r],i=gd(a);if(t===n)return dn([...e.slice(0,r),{kind:"text",text:o},...e.slice(r)]);if(t<n+i){let s=t-n;if(a.kind==="bold"||a.kind==="italic"||a.kind==="strike")return[...e.slice(0,r),{...a,children:zs(a.children,s,o)},...e.slice(r+1)];if(a.kind==="link")return[...e.slice(0,r),{...a,children:zs(a.children,s,o)},...e.slice(r+1)];if(a.kind==="text")return dn([...e.slice(0,r),{kind:"text",text:a.text.slice(0,s)+o+a.text.slice(s)},...e.slice(r+1)]);if(a.kind==="code")return[...e.slice(0,r),{kind:"code",text:a.text.slice(0,s)+o+a.text.slice(s)},...e.slice(r+1)];let l=a.kind==="pagelink"?a.alias||a.pageId:a.kind==="dailylink"?a.alias||a.date:"",c=l.slice(0,s),m=l.slice(s),p=[];return c&&p.push({kind:"text",text:c}),p.push({kind:"text",text:o}),m&&p.push({kind:"text",text:m}),dn([...e.slice(0,r),...p,...e.slice(r+1)])}if(t===n+i){if(a.kind==="bold"||a.kind==="italic"||a.kind==="strike")return[...e.slice(0,r),{...a,children:zs(a.children,i,o)},...e.slice(r+1)];if(a.kind==="link")return[...e.slice(0,r),{...a,children:zs(a.children,i,o)},...e.slice(r+1)];if(a.kind==="text")return dn([...e.slice(0,r),{kind:"text",text:a.text+o},...e.slice(r+1)]);if(a.kind==="code")return[...e.slice(0,r),{kind:"code",text:a.text+o},...e.slice(r+1)]}n+=i}return dn([...e,{kind:"text",text:o}])}function gS(e,t,o){let n=Le(e,0,t),r=Le(e,o,1/0);return dn([...n,...r])}function gd(e){switch(e.kind){case"text":return e.text.length;case"code":return e.text.length;case"br":return 1;case"pagelink":return(e.alias||e.pageId).length;case"dailylink":return(e.alias||e.date).length;case"bold":case"italic":case"strike":return e.children.reduce((t,o)=>t+gd(o),0);case"link":return e.children.reduce((t,o)=>t+gd(o),0)}}function hS(e,t,o){switch(e.kind){case"text":return{kind:"text",text:e.text.slice(t,o)};case"code":return{kind:"code",text:e.text.slice(t,o)};case"br":return null;case"pagelink":{let r=(e.alias||e.pageId).slice(t,o);return r?{kind:"text",text:r}:null}case"dailylink":{let r=(e.alias||e.date).slice(t,o);return r?{kind:"text",text:r}:null}case"bold":case"italic":case"strike":{let n=Le(e.children,t,o);return n.length===0?null:{kind:e.kind,children:n}}case"link":{let n=Le(e.children,t,o);return n.length===0?null:{kind:"link",href:e.href,children:n}}}}function dn(e){let t=[];for(let o of e){let n=t[t.length-1];if(n&&o.kind==="text"&&n.kind==="text"){t[t.length-1]={kind:"text",text:n.text+o.text};continue}if(n&&o.kind==="code"&&n.kind==="code"){t[t.length-1]={kind:"code",text:n.text+o.text};continue}if(n&&(o.kind==="bold"||o.kind==="italic"||o.kind==="strike")&&n.kind===o.kind){t[t.length-1]={kind:o.kind,children:dn([...n.children,...o.children])};continue}if(n&&o.kind==="link"&&n.kind==="link"&&n.href===o.href){t[t.length-1]={kind:"link",href:o.href,children:dn([...n.children,...o.children])};continue}t.push(o)}return t}function Ey(e,t,o,n,r){if(o>=n)return e;let a=_o(e,t);if(!a)return e;let{block:i}=a;if(!("inline"in i))return e;let s=Le(i.inline,0,o),l=Le(i.inline,o,n),c=Le(i.inline,n,1/0),m=bS(l,r),p;m?p=xS(l,r):p=yS(l,r);let u=Le([...s,...p,...c],0,1/0);return Or(e,t,u)}function bS(e,t){return e.length===0?!1:e.every(o=>vS(o,t))}function vS(e,t){return t==="code"?e.kind==="code":e.kind===t}function yS(e,t){if(t==="code"){let o=St(e);return o?[{kind:"code",text:o}]:[]}return e.length===0?[]:[{kind:t,children:e}]}function xS(e,t){let o=[];for(let n of e){if(t==="code"&&n.kind==="code"){o.push({kind:"text",text:n.text});continue}if(n.kind===t&&(n.kind==="bold"||n.kind==="italic"||n.kind==="strike")){o.push(...n.children);continue}o.push(n)}return Ty(o)}function Ty(e){let t=[];for(let o of e){let n=t[t.length-1];o.kind==="text"&&n&&n.kind==="text"?t[t.length-1]={kind:"text",text:n.text+o.text}:t.push(o)}return t}function Ly(e,t,o,n,r){if(o>=n)return e;let a=_o(e,t);if(!a)return e;let{block:i}=a;if(!("inline"in i))return e;let s=Le(i.inline,0,o),l=Vu(Le(i.inline,o,n)),c=Le(i.inline,n,1/0),m=r&&l.length>0?[{kind:"link",href:r,children:l}]:l,p=Le([...s,...m,...c],0,1/0);return Or(e,t,p)}function Vu(e){let t=[];for(let o of e){if(o.kind==="link"){t.push(...Vu(o.children));continue}if(o.kind==="bold"||o.kind==="italic"||o.kind==="strike"){t.push({kind:o.kind,children:Vu(o.children)});continue}t.push(o)}return Ty(t)}function Sy(e,t,o,n){if(!n)return e;let r=_o(e,t);if(!r)return e;let{block:a}=r;if(!("inline"in a))return e;let i=Le(a.inline,0,o),s=Le(a.inline,o,1/0),l={kind:"link",href:n,children:[{kind:"text",text:n}]},c=Le([...i,l,...s],0,1/0);return{...Or(e,t,c),selection:{kind:"caret",blockId:t,offset:o+n.length}}}function ri(e,t,o,n,r){let a=_o(e,t);if(!a)return e;let{block:i}=a;if(!("inline"in i))return e;let s=Le(i.inline,0,o),l=Le(i.inline,o,1/0),c=r?{kind:"pagelink",pageId:n,alias:r}:{kind:"pagelink",pageId:n},m=[...s,c,...l],p=Or(e,t,m),u=(r||n).length;return{...p,selection:{kind:"caret",blockId:t,offset:o+u}}}function My(e,t,o){let n=bo(e,t);if(!n)return e;let r=e.blocks.slice(),[a]=r.splice(n.idx,1),i=Math.max(0,Math.min(o,r.length));return r.splice(i,0,a),{...e,blocks:r}}function ai(e,t,o){let n=bo(e,t);return n?{...Iy(e,n.idx+1,o),selection:{kind:"caret",blockId:o.id,offset:0}}:{blocks:[...e.blocks,o],selection:{kind:"caret",blockId:o.id,offset:0}}}function rt(e=""){return{id:Q(),kind:"p",inline:gv(e)}}function js(e="",t=""){return{id:Q(),kind:"code",text:e,lang:t}}function qs(){return{id:Q(),kind:"rule"}}function $s(e="\u{1F4A1}",t=[rt("")]){return{id:Q(),kind:"callout",emoji:e,children:t}}function Ks(e=[[rt("")]]){return{id:Q(),kind:"list",ordered:!1,items:e}}function Vs(e=[[rt("")]]){return{id:Q(),kind:"list",ordered:!0,items:e}}function oi(e,t,o){let n=e.slice();return n[t]=o,n}function Py(e,t){let o=Wu(e.blocks,t);return o?{...e,blocks:o}:e}function Wu(e,t){for(let o=0;o<e.length;o++){let n=e[o];if(n.kind==="list")for(let r=0;r<n.items.length;r++){let a=Wu(n.items[r],t);if(a)return oi(e,o,{...n,items:Cy(n.items,r,a)});if(n.items[r].some(i=>i.id===t))return r===0?null:oi(e,o,wS(n,r))}else if(n.kind==="quote"||n.kind==="callout"){let r=Wu(n.children,t);if(r)return oi(e,o,{...n,children:r})}}return null}function wS(e,t){let o=e.items.slice(),n=o[t],r=o[t-1].slice(),a=r[r.length-1];return a&&a.kind==="list"&&a.ordered===e.ordered?r[r.length-1]={...a,items:[...a.items,n]}:r.push({id:Q(),kind:"list",ordered:e.ordered,items:[n]}),o[t-1]=r,o.splice(t,1),{...e,items:o}}function hd(e,t){let o=Gu(e.blocks,t);return o?{...e,blocks:o}:e}function Gu(e,t){for(let o=0;o<e.length;o++){let n=e[o];if(n.kind==="list")for(let r=0;r<n.items.length;r++){let a=n.items[r];for(let s=0;s<a.length;s++){let l=a[s];if(l.kind==="list"){let c=l.items.findIndex(m=>m.some(p=>p.id===t));if(c>=0)return oi(e,o,kS(n,r,s,l,c))}}let i=Gu(a,t);if(i)return oi(e,o,{...n,items:Cy(n.items,r,i)})}else if(n.kind==="quote"||n.kind==="callout"){let r=Gu(n.children,t);if(r)return oi(e,o,{...n,children:r})}}return null}function kS(e,t,o,n,r){let a=n.items[r],i=n.items.slice();i.splice(r,1);let s=e.items[t].slice();i.length===0?s.splice(o,1):s[o]={...n,items:i};let l=e.items.slice();return l[t]=s,l.splice(t+1,0,a),{...e,items:l}}function Cy(e,t,o){let n=e.slice();return n[t]=o,n}function Ws(e=[rt("")]){return{id:Q(),kind:"quote",children:e}}function Ay(e,t=""){return{id:Q(),kind:"image",src:e,alt:t}}function By(e){return{id:Q(),kind:"email",...e}}function IS(e){if("inline"in e&&Array.isArray(e.inline))return e.inline;if(e.kind==="quote"||e.kind==="callout"){let t=e.children?.[0];if(t&&"inline"in t)return t.inline}if(e.kind==="list"){let t=e.items?.[0]?.[0];if(t&&"inline"in t)return t.inline}return e.kind==="code"?e.text?[{kind:"text",text:e.text}]:[]:[]}function fd(e){return{id:Q(),kind:"p",inline:e}}function ES(e){return e.kind==="list"?e.items[0]?.[0]?.id??null:e.kind==="callout"||e.kind==="quote"?e.children[0]?.id??null:"inline"in e||e.kind==="code"?e.id:null}function Dy(e,t,o){let n=e.blocks.findIndex(c=>c.id===t);if(n<0)return e;let r=e.blocks[n];if((o==="p"||o==="h1"||o==="h2"||o==="h3"||o==="todo")&&"inline"in r)return pn(e,t,o);let a=IS(r),i;switch(o){case"p":i={id:Q(),kind:"p",inline:a};break;case"h1":case"h2":case"h3":i={id:Q(),kind:o,inline:a};break;case"todo":i={id:Q(),kind:"todo",checked:!1,inline:a};break;case"ul":i=Ks([[fd(a)]]);break;case"ol":i=Vs([[fd(a)]]);break;case"quote":i=Ws([fd(a)]);break;case"callout":i=$s("\u{1F4A1}",[fd(a)]);break;case"pre":i=js(St(a));break;case"hr":i=qs();break}let s=e.blocks.slice();s[n]=i;let l=ES(i);return{...e,blocks:s,selection:l?{kind:"caret",blockId:l,offset:0}:e.selection}}function Gs(e,t,o){let n=bo(e,t);if(!n||n.block.kind!=="table")return e;let r=n.block,a=r.rows[0]?.length||0,i=[];for(let l=0;l<a;l++)i.push([]);let s=r.rows.slice();return s.splice(Math.max(0,Math.min(o,s.length)),0,i),mn(e,n.idx,{...r,rows:s})}function bd(e,t,o){let n=bo(e,t);if(!n||n.block.kind!=="table")return e;let r=n.block,a=r.rows[0]?.length||0,i=Math.max(0,Math.min(o,a)),s=r.rows.map(l=>{let c=l.slice();return c.splice(i,0,[]),c});return mn(e,n.idx,{...r,rows:s})}function Zu(e,t,o){let n=bo(e,t);if(!n||n.block.kind!=="table")return e;let r=n.block;if(r.rows.length<=1||o<0||o>=r.rows.length)return e;let a=r.rows.slice();return a.splice(o,1),mn(e,n.idx,{...r,rows:a})}function Qu(e,t,o){let n=bo(e,t);if(!n||n.block.kind!=="table")return e;let r=n.block,a=r.rows[0]?.length||0;if(a<=1||o<0||o>=a)return e;let i=r.rows.map(s=>{let l=s.slice();return l.splice(o,1),l});return mn(e,n.idx,{...r,rows:i})}function _y(e,t,o,n,r){let a=bo(e,t);if(!a||a.block.kind!=="table")return e;let i=a.block;if(o<0||o>=i.rows.length)return e;let s=i.rows[o];if(n<0||n>=s.length)return e;let l=s.slice();l[n]=r;let c=i.rows.slice();return c[o]=l,mn(e,a.idx,{...i,rows:c})}function ef(e){let t=e.rows.length,o=e.rows[0]?.length||0,n=[];for(let r=0;r<t;r++){let a=[];for(let i=0;i<o;i++)a.push(e.cellBg?.[r]?.[i]||"");n.push(a)}return n}function Ry(e,t,o,n,r){let a=bo(e,t);if(!a||a.block.kind!=="table")return e;let i=a.block;if(o<0||o>=i.rows.length||n<0||n>=(i.rows[0]?.length||0))return e;let s=ef(i);return s[o][n]=r,mn(e,a.idx,{...i,cellBg:s})}function Ny(e,t,o,n){let r=bo(e,t);if(!r||r.block.kind!=="table")return e;let a=r.block;if(o<0||o>=a.rows.length)return e;let i=ef(a);for(let s=0;s<i[o].length;s++)i[o][s]=n;return mn(e,r.idx,{...a,cellBg:i})}function Oy(e,t,o,n){let r=bo(e,t);if(!r||r.block.kind!=="table")return e;let a=r.block;if(o<0||o>=(a.rows[0]?.length||0))return e;let i=ef(a);for(let s=0;s<i.length;s++)i[s][o]=n;return mn(e,r.idx,{...a,cellBg:i})}function Hy(e=2,t=3){let o=[];for(let n=0;n<e;n++){let r=[];for(let a=0;a<t;a++)r.push([]);o.push(r)}return{id:Q(),kind:"table",hrow:!0,hcol:!1,rows:o}}function Fy(e){return{id:Q(),kind:"linkdb",dbId:e,view:"table",filter:"",sort:""}}var ky,Ro=L(()=>{"use strict";tn();ky={blocks:[],selection:null}});function TS(){let e=Ba.get(),t=e?parseInt(e,10):hs;return!isFinite(t)||t<0?hs:t}function tf(){Ys&&(clearTimeout(Ys),Ys=null)}function LS(e){switch(e.kind){case"dirty":{tf();let t=TS();if(t<=0)return;Ys=setTimeout(()=>{Ys=null,re.save().catch(()=>{})},t);return}case"idle":case"unloaded":case"saving":case"conflict":case"merging":tf();return}}function zy(){Uy||(Uy=!0,re.subscribe(LS))}function jy(){tf()}var Ys,Uy,of=L(()=>{"use strict";ht();Fe();be();Ys=null;Uy=!1});var df={};j(df,{applyColOrder:()=>rf,applyRowOrder:()=>xd,loadColOrder:()=>vd,loadGanttConfig:()=>sf,loadRowOrder:()=>yd,moveItem:()=>cf,saveColOrder:()=>nf,saveGanttConfig:()=>lf,saveRowOrder:()=>af});function vd(e){let t=Cc(e).get();return t.length===0?null:t}function nf(e,t){Cc(e).set(t)}function rf(e,t){let o=vd(t);if(!o||o.length===0)return e;let n=new Map(e.map(a=>[a.InternalName,a])),r=[];for(let a of o){let i=n.get(a);i&&(r.push(i),n.delete(a))}for(let a of n.values())r.push(a);return r}function yd(e){let t=Ac(e).get();return t.length===0?null:t}function af(e,t){Ac(e).set(t)}function xd(e,t){let o=yd(t);if(!o||o.length===0)return e;let n=new Map(e.map(a=>[a.Id,a])),r=[];for(let a of o){let i=n.get(a);i&&(r.push(i),n.delete(a))}for(let a of n.values())r.push(a);return r}function sf(e){return Bc(e,null).get()}function lf(e,t){Bc(e,t).set(t)}function cf(e,t,o){if(t===o||t<0||t>=e.length)return e.slice();let n=e.slice(),[r]=n.splice(t,1),a=o>t?o-1:o;return n.splice(a,0,r),n}var Xs=L(()=>{"use strict";be()});var Ky={};j(Ky,{DB_COLOR_PRESETS:()=>qy,cellOverlay:()=>uf,gcDbColors:()=>ff,getDbColors:()=>mf,openColorPalette:()=>gf,setColColor:()=>SS,setRowColor:()=>pf});function mf(e){return hr.get()[e]||{}}function $y(e,t){let o=hr.get(),n={rows:{...o[e]?.rows||{}},cols:{...o[e]?.cols||{}}};t(n),o[e]=n,hr.set(o)}function pf(e,t,o){$y(e,n=>{o?n.rows[String(t)]=o:delete n.rows[String(t)]})}function SS(e,t,o){$y(e,n=>{o?n.cols[t]=o:delete n.cols[t]})}function uf(e,t,o){return e.cols?.[o]||e.rows?.[String(t)]||""}function ff(e,t){let o=hr.get(),n=o[e];if(!n?.rows)return;let r=new Set(t.map(String)),a=!1;for(let i of Object.keys(n.rows))r.has(i)||(delete n.rows[i],a=!0);a&&hr.set(o)}function gf(e,t,o){document.getElementById("memola-dbcolor-pop")?.remove();let n=document.createElement("div");n.id="memola-dbcolor-pop",n.className="memola-dbcolor-pop",n.style.left=e+window.scrollX+"px",n.style.top=t+window.scrollY+"px";for(let a of qy){let i=document.createElement("button");i.className="memola-dbcolor-sw"+(a.value?"":" none"),i.title=a.label,a.value&&(i.style.background=a.value),i.addEventListener("mousedown",s=>{s.preventDefault(),s.stopPropagation(),o(a.value),n.remove()}),n.appendChild(i)}(document.getElementById("memola-overlay")||document.body).appendChild(n);let r=a=>{n.contains(a.target)||(n.remove(),document.removeEventListener("mousedown",r,!0))};setTimeout(()=>document.addEventListener("mousedown",r,!0),0)}var qy,wd=L(()=>{"use strict";be();qy=[{label:"\u306A\u3057",value:""},{label:"\u30B0\u30EC\u30FC",value:"#f1f1ef"},{label:"\u8D64",value:"#fdebec"},{label:"\u30AA\u30EC\u30F3\u30B8",value:"#fbecdd"},{label:"\u9EC4",value:"#fbf3db"},{label:"\u7DD1",value:"#ddedea"},{label:"\u9752",value:"#ddebf1"},{label:"\u7D2B",value:"#eae4f2"},{label:"\u30D4\u30F3\u30AF",value:"#f4dfeb"}]});var kd={};j(kd,{hideBulkBar:()=>DS,renderBulkBar:()=>Un});function MS(){if(Ur&&document.body.contains(Ur))return Ur;let e=document.getElementById("memola-overlay")||document.body,t=document.createElement("div");return t.id="memola-db-bulkbar",t.className="memola-db-bulkbar",t.innerHTML='<span class="memola-db-bulkbar-count">0 \u4EF6\u9078\u629E</span><button class="memola-db-bulkbar-btn" data-act="color">\u8272</button><button class="memola-db-bulkbar-btn" data-act="dup">\u8907\u88FD</button><button class="memola-db-bulkbar-btn danger" data-act="del">\u524A\u9664</button><button class="memola-db-bulkbar-btn ghost" data-act="clr">\u89E3\u9664</button>',e.appendChild(t),t.addEventListener("click",PS),Ur=t,t}function PS(e){let t=e.target,o=t.dataset?.act;if(o){if(o==="clr"){d.dbSelected.clear(),Un(),Oe();return}if(o==="del")CS();else if(o==="dup")AS();else if(o==="color"){let n=Array.from(d.dbSelected);if(n.length===0)return;let r=t.getBoundingClientRect();gf(r.left,r.bottom+4,a=>{for(let i of n)pf(d.dbList,i,a);Oe()})}}}async function CS(){let e=Array.from(d.dbSelected);if(e.length!==0&&confirm(`${e.length} \u4EF6\u306E\u884C\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F`)){_(!0,"\u524A\u9664\u4E2D...");try{for(let t of e)await zr(d.dbList,t).catch(o=>{k("\u524A\u9664\u5931\u6557 (id="+t+"): "+o.message,"err")});d.dbSelected.clear(),Un(),Oe(),k(`${e.length} \u4EF6\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u2318Z \u3067\u5FA9\u5143\u53EF\u80FD\uFF09`)}finally{_(!1)}}}async function AS(){let e=Array.from(d.dbSelected);if(e.length!==0){_(!0,"\u8907\u88FD\u4E2D...");try{let{getListFields:t}=await Promise.resolve().then(()=>(De(),po)),o=await t(d.dbList),n=new Set(o.map(s=>s.InternalName)),r=0,a=[],{getRowBody:i}=await Promise.resolve().then(()=>(V(),$e));for(let s of e){let l=d.dbItems.find(m=>m.Id===s);if(!l)continue;let c={};for(let m of Object.keys(l)){if(!n.has(m))continue;let p=l[m];p!=null&&typeof p!="object"&&(typeof p=="string"&&p.trim()===""||(c[m]=p))}c.Title||(c.Title=l.Title||"\u7121\u984C");try{let m=await i(d.dbList,s).catch(()=>""),p=await Zs(d.dbList,c,m||void 0);d.dbItems.push(p),r++}catch(m){a.push(`id=${s}: ${m.message}`)}}d.dbSelected.clear(),Un(),Oe(),a.length===0?k(`${r} \u4EF6\u8907\u88FD\u3057\u307E\u3057\u305F`):r===0?k("\u8907\u88FD\u5931\u6557: "+a[0],"err"):k(`${r} \u4EF6\u6210\u529F / ${a.length} \u4EF6\u5931\u6557 (${a[0]})`,"err"),a.length>0&&console.warn("[Memola duplicate errors]",a)}finally{_(!1)}}}function Fr(){let e=Ur;if(!e||!e.classList.contains("on"))return;let t=document.getElementById("memola-db-tb");if(!t)return;let o=t.getBoundingClientRect(),n=e.offsetHeight||44;e.style.top=Math.max(8,o.top-n-8)+"px",e.style.left=o.left+o.width/2+"px"}function hf(e){if(d.dbSelected.size===0)return;let t=e.target;t&&(t.closest(".memola-db-bulkbar")||t.closest(".memola-cb")||t.closest("#memola-row-handle")||e.shiftKey||BS())}function BS(){d.dbSelected.clear(),document.querySelectorAll(".memola-card-sel, .memola-tr-sel").forEach(t=>{t.classList.remove("memola-card-sel","memola-tr-sel")}),document.querySelectorAll("#memola-dt .memola-cb").forEach(t=>{t.checked=!1,t.indeterminate=!1});let e=document.getElementById("memola-dt");e&&e.classList.remove("memola-has-sel"),Un()}function Un(){let e=MS(),t=d.dbSelected.size,o=e.querySelector(".memola-db-bulkbar-count");o&&(o.textContent=t+" \u4EF6\u9078\u629E");let n=t>0&&d.currentType==="database";e.classList.toggle("on",n),n?(requestAnimationFrame(Fr),window.addEventListener("scroll",Fr,!0),window.addEventListener("resize",Fr),document.addEventListener("mousedown",hf,!0)):(window.removeEventListener("scroll",Fr,!0),window.removeEventListener("resize",Fr),document.removeEventListener("mousedown",hf,!0))}function DS(){Ur&&Ur.classList.remove("on"),window.removeEventListener("scroll",Fr,!0),window.removeEventListener("resize",Fr),document.removeEventListener("mousedown",hf,!0)}var Ur,Js=L(()=>{"use strict";q();le();K();No();wd();Ur=null});var Id={};j(Id,{openItem:()=>qS,renderActiveView:()=>jS,renderCalendarView:()=>si,renderGalleryView:()=>Jy,renderGanttView:()=>vf,renderListView:()=>Xy});function el(e,t){let o=e[t];return o==null?"":String(o)}function Gy(e,t,o,n){if(!fn())return;let r=n||e;r.draggable=!0;let a="text/memola-row";r.addEventListener("dragstart",i=>{if(!i.dataTransfer)return;i.dataTransfer.effectAllowed="move",i.dataTransfer.setData(a,String(t.Id));let s=d.dbSelected.has(t.Id)?Array.from(d.dbSelected):[t.Id];document.querySelectorAll("[data-id]").forEach(l=>{let c=parseInt(l.dataset.id||"0",10);s.indexOf(c)>=0&&l.classList.add("memola-item-dragging")})}),r.addEventListener("dragend",()=>{document.querySelectorAll(".memola-item-dragging").forEach(i=>i.classList.remove("memola-item-dragging"))}),e.addEventListener("dragover",i=>{let s=i.dataTransfer;if(!s)return;i.preventDefault(),s.dropEffect="move";let l=e.getBoundingClientRect(),c=o==="y"?i.clientY>l.top+l.height/2:i.clientX>l.left+l.width/2;e.classList.toggle("memola-item-drop-before",!c),e.classList.toggle("memola-item-drop-after",c)}),e.addEventListener("dragleave",()=>{e.classList.remove("memola-item-drop-before","memola-item-drop-after")}),e.addEventListener("drop",i=>{let s=i.dataTransfer;if(!s)return;let l=s.getData(a);if(!l)return;i.preventDefault();let c=e.getBoundingClientRect(),m=o==="y"?i.clientY>c.top+c.height/2:i.clientX>c.left+c.width/2;e.classList.remove("memola-item-drop-before","memola-item-drop-after");let p=parseInt(l,10),u=d.dbSelected.has(p)?Array.from(d.dbSelected):[p];u.indexOf(t.Id)>=0||zn(u,t.Id,m)})}function Yy(e,t){let o=document.createElement("div");o.className="memola-rowctl";let n=document.createElement("span");n.className="memola-rowctl-handle",n.title="\u30C9\u30E9\u30C3\u30B0\u3057\u3066\u4E26\u3079\u66FF\u3048",n.innerHTML='<svg viewBox="0 0 10 16" width="10" height="16" fill="currentColor" style="pointer-events:none"><circle cx="2" cy="3" r="1.3"/><circle cx="2" cy="8" r="1.3"/><circle cx="2" cy="13" r="1.3"/><circle cx="8" cy="3" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="8" cy="13" r="1.3"/></svg>';let r=document.createElement("input");return r.type="checkbox",r.className="memola-cb",r.checked=d.dbSelected.has(e.Id),r.addEventListener("click",a=>a.stopPropagation()),r.addEventListener("change",()=>{r.checked?d.dbSelected.add(e.Id):d.dbSelected.delete(e.Id),Promise.resolve().then(()=>(Js(),kd)).then(a=>a.renderBulkBar()),t?.()}),o.appendChild(n),o.appendChild(r),o}function Xy(){let e=I("list-view");e.innerHTML="",d.dbSelected.size>0?e.classList.add("memola-has-sel"):e.classList.remove("memola-has-sel");let t=d.dbFields.filter(o=>[2,4,6,8,9].includes(o.FieldTypeKind)).slice(0,4);$t().forEach(o=>{let n=document.createElement("div");n.className="memola-lv-row",n.dataset.id=String(o.Id);let r=Yy(o,()=>{n.classList.toggle("memola-card-sel",d.dbSelected.has(o.Id)),d.dbSelected.size>0?e.classList.add("memola-has-sel"):e.classList.remove("memola-has-sel")});n.appendChild(r);let a=document.createElement("div");a.className="memola-lv-body";let i=document.createElement("div");i.className="memola-lv-title",i.textContent=o.Title||"(\u7121\u984C)",a.appendChild(i);let s=document.createElement("div");s.className="memola-lv-sub",s.innerHTML=t.filter(c=>c.InternalName!=="Title").map(c=>'<span class="memola-lv-field">'+P(c.Title)+": "+P(el(o,c.InternalName))+"</span>").join(""),a.appendChild(s),n.appendChild(a),n.appendChild(yo(o)),d.dbSelected.has(o.Id)&&n.classList.add("memola-card-sel"),jn(n,o.Id);let l=r.querySelector(".memola-rowctl-handle")||void 0;Gy(n,o,"y",l),e.appendChild(n)})}function Jy(){let e=I("gallery-view");e.innerHTML="";let t=d.dbFields.filter(o=>[2,4,6,8,9].includes(o.FieldTypeKind));$t().forEach(o=>{let n=document.createElement("div");n.className="memola-gv-card",d.dbSelected.has(o.Id)&&n.classList.add("memola-card-sel"),n.dataset.id=String(o.Id),n.draggable=fn(),n.innerHTML='<div class="memola-gv-cover">'+(o.Title||"?").slice(0,1)+'</div><div class="memola-gv-title">'+P(o.Title||"(\u7121\u984C)")+'</div><div class="memola-gv-meta">'+t.filter(r=>r.InternalName!=="Title").slice(0,3).map(r=>'<div class="memola-gv-prop">'+P(r.Title)+": "+P(el(o,r.InternalName))+"</div>").join("")+"</div>",n.appendChild(yo(o)),jn(n,o.Id),tl(n,o.Id),e.appendChild(n)}),fn()&&_S(e)}function _S(e){if(e.dataset.dropWired==="1")return;e.dataset.dropWired="1";function t(o,n){let r=Array.from(e.querySelectorAll(".memola-gv-card"));if(r.length===0)return null;let a=r[0],i=1/0;for(let c of r){let m=c.getBoundingClientRect(),p=n>=m.top&&n<=m.bottom,u=Math.abs(o-(m.left+m.width/2)),f=(p?0:1e6)+u;f<i&&(i=f,a=c)}let s=a.getBoundingClientRect(),l=o>s.left+s.width/2;return{card:a,placeAfter:l}}e.addEventListener("dragover",o=>{let n=o.dataTransfer;if(!n)return;o.preventDefault(),n.dropEffect="move";let r=t(o.clientX,o.clientY);if(!r){Qs();return}NS(r.card,r.placeAfter)}),e.addEventListener("dragleave",o=>{let n=o.relatedTarget;(!n||!e.contains(n))&&Qs()}),e.addEventListener("drop",o=>{let n=o.dataTransfer;if(!n){Qs();return}let r=n.getData("text/memola-kb")||n.getData("text/plain");if(!r){Qs();return}o.preventDefault(),Qs();let a=parseInt(r,10);if(!a)return;let i=d.dbSelected.has(a)?Array.from(d.dbSelected):[a],s=t(o.clientX,o.clientY);if(!s)return;let l=parseInt(s.card.dataset.id||"0",10);!l||i.indexOf(l)>=0||zn(i,l,s.placeAfter)})}function RS(){let e=document.getElementById("memola-overlay")||document.body;if(ii&&e.contains(ii))return ii;let t=document.createElement("div");return t.className="memola-card-drop-line vertical",e.appendChild(t),ii=t,t}function NS(e,t){let o=e.getBoundingClientRect(),n=RS();n.style.top=o.top+"px",n.style.height=o.height+"px",n.style.left=(t?o.right:o.left)-1+"px",n.style.width="2px",n.classList.add("on")}function Qs(){ii&&ii.classList.remove("on"),document.querySelectorAll(".memola-card-drop-line").forEach(e=>{e.classList.remove("on")})}function OS(e){return Dc(e).get()||null}function HS(e,t){Dc(e).set(t)}function Wy(e){return e<10?"0"+e:String(e)}function bf(e){return e.getFullYear()+"-"+Wy(e.getMonth()+1)+"-"+Wy(e.getDate())}function si(){let e=I("calendar-view");e.innerHTML="";let t=d.dbFields.filter(E=>E.FieldTypeKind===4);if(t.length===0){e.innerHTML='<div class="memola-altview-empty">\u65E5\u4ED8\u5217\u304C\u3042\u308A\u307E\u305B\u3093</div>';return}Vy!==d.dbList&&(Vy=d.dbList,qt=null,un=null);let o=new Date;(qt==null||un==null)&&(qt=o.getFullYear(),un=o.getMonth());let n=OS(d.dbList),r=n&&t.find(E=>E.InternalName===n)||t[0],a=qt,i=un,s=new Date(a,i,1),l=new Date(a,i+1,0),c=s.getDay(),m=l.getDate(),p={};$t().forEach(E=>{var M;let C=el(E,r.InternalName);if(!C)return;let U=new Date(C);isNaN(U.getTime())||(p[M=bf(U)]||(p[M]=[])).push(E)});let u=document.createElement("div");u.className="memola-cal";let f=document.createElement("div");f.className="memola-cal-head";let g=document.createElement("div");g.className="memola-cal-nav";let y=(E,C,U)=>{let M=document.createElement("button");return M.type="button",M.className="memola-cal-nav-btn",M.textContent=E,M.title=C,M.addEventListener("click",()=>{U(),si()}),M};g.appendChild(y("\xAB","\u524D\u5E74",()=>{qt=(qt??o.getFullYear())-1})),g.appendChild(y("\u2039","\u524D\u6708",()=>{let E=qt??o.getFullYear(),C=(un??o.getMonth())-1;C<0&&(C=11,E--),qt=E,un=C})),g.appendChild(y("\u4ECA\u65E5","\u4ECA\u65E5\u306B\u623B\u308B",()=>{qt=o.getFullYear(),un=o.getMonth()})),g.appendChild(y("\u203A","\u7FCC\u6708",()=>{let E=qt??o.getFullYear(),C=(un??o.getMonth())+1;C>11&&(C=0,E++),qt=E,un=C})),g.appendChild(y("\xBB","\u7FCC\u5E74",()=>{qt=(qt??o.getFullYear())+1})),f.appendChild(g);let b=document.createElement("div");b.className="memola-cal-title",b.textContent=a+"\u5E74 "+(i+1)+"\u6708",f.appendChild(b);let h=document.createElement("div");if(h.className="memola-cal-dfbox",t.length>1){let E=document.createElement("span");E.textContent="\u65E5\u4ED8\u5217",h.appendChild(E);let C=document.createElement("select");C.className="memola-cal-dfsel";for(let U of t){let M=document.createElement("option");M.value=U.InternalName,M.textContent=U.Title,U.InternalName===r.InternalName&&(M.selected=!0),C.appendChild(M)}C.addEventListener("change",()=>{HS(d.dbList,C.value),si()}),h.appendChild(C)}else{let E=document.createElement("span");E.className="memola-cal-dfsingle",E.textContent="\u65E5\u4ED8\u5217: "+r.Title,h.appendChild(E)}f.appendChild(h),u.appendChild(f);let v=document.createElement("div");v.className="memola-cal-grid memola-cal-dayhead",["\u65E5","\u6708","\u706B","\u6C34","\u6728","\u91D1","\u571F"].forEach(E=>{let C=document.createElement("div");C.className="memola-cal-cell",C.textContent=E,v.appendChild(C)}),u.appendChild(v);let w=document.createElement("div");w.className="memola-cal-grid";for(let E=0;E<c;E++){let C=document.createElement("div");C.className="memola-cal-cell memola-cal-blank",w.appendChild(C)}for(let E=1;E<=m;E++){let C=new Date(a,i,E),U=document.createElement("div");U.className="memola-cal-cell memola-cal-day",U.dataset.date=bf(C),a===o.getFullYear()&&i===o.getMonth()&&E===o.getDate()&&U.classList.add("today");let M=document.createElement("div");M.className="memola-cal-num",M.textContent=String(E),U.appendChild(M);let N=bf(C);(p[N]||[]).forEach(D=>{let O=document.createElement("div");O.className="memola-cal-event",O.draggable=!0,O.dataset.id=String(D.Id),d.dbSelected.has(D.Id)&&O.classList.add("memola-card-sel");let Y=document.createElement("span");Y.className="memola-cal-event-title",Y.textContent=D.Title||"(\u7121\u984C)",O.appendChild(Y),O.appendChild(yo(D)),jn(O,D.Id),FS(O,D.Id),U.appendChild(O)}),US(U,r.InternalName),w.appendChild(U)}let T=(c+m)%7;if(T!==0)for(let E=0;E<7-T;E++){let C=document.createElement("div");C.className="memola-cal-cell memola-cal-blank",w.appendChild(C)}u.appendChild(w),e.appendChild(u)}function FS(e,t){e.addEventListener("dragstart",o=>{if(!o.dataTransfer)return;o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/memola-cal",String(t)),e.classList.add("memola-cal-event-dragging");let n=d.dbSelected.has(t)?Array.from(d.dbSelected):[t];document.querySelectorAll(".memola-cal-event[data-id]").forEach(r=>{let a=parseInt(r.dataset.id||"0",10);n.indexOf(a)>=0&&r.classList.add("memola-cal-event-dragging")})}),e.addEventListener("dragend",()=>{document.querySelectorAll(".memola-cal-event-dragging").forEach(o=>o.classList.remove("memola-cal-event-dragging")),document.querySelectorAll(".memola-cal-day-dropover").forEach(o=>o.classList.remove("memola-cal-day-dropover"))})}function US(e,t){e.addEventListener("dragover",o=>{let n=o.dataTransfer;n&&(o.preventDefault(),n.dropEffect="move",e.classList.add("memola-cal-day-dropover"))}),e.addEventListener("dragleave",()=>{e.classList.remove("memola-cal-day-dropover")}),e.addEventListener("drop",o=>{let n=o.dataTransfer;if(!n)return;e.classList.remove("memola-cal-day-dropover");let r=n.getData("text/memola-cal")||n.getData("text/memola-kb")||n.getData("text/plain");if(!r)return;o.preventDefault();let a=parseInt(r,10);if(!a)return;let i=e.dataset.date||"";if(!i)return;let s=d.dbSelected.has(a)?Array.from(d.dbSelected):[a];zS(s,t,i)})}async function zS(e,t,o){let n=[],r=[];for(let a of e){let i=d.dbItems.find(c=>c.Id===a);if(!i)continue;let s=String(i[t]||"");if(s&&s.startsWith(o))continue;i[t]=o,n.push(()=>{i[t]=s});let l=d.dbFields.find(c=>c.InternalName===t);r.push(ft(d.dbList,a,{[t]:o}).then(()=>{l&&to(d.dbList,a,t,l.Title,s,o)}))}if(r.length!==0){si();try{await Promise.all(r)}catch(a){n.forEach(i=>i()),k("\u65E5\u4ED8\u66F4\u65B0\u5931\u6557: "+a.message,"err"),si()}}}function vf(){let e=I("gantt-view");e.innerHTML="";let t=d.dbFields.filter(x=>x.FieldTypeKind===4);if(t.length===0){e.innerHTML='<div class="memola-altview-empty">\u65E5\u4ED8\u5217\u304C\u3042\u308A\u307E\u305B\u3093</div>';return}let o=sf(d.dbList),n=o&&t.some(x=>x.InternalName===o.start)?o.start:t[0].InternalName,r=o?o.end&&t.some(x=>x.InternalName===o.end)?o.end:null:t[1]?.InternalName??null,a=document.createElement("div");a.className="memola-gantt-cfg",a.innerHTML="<span>\u958B\u59CB</span>";let i=document.createElement("select");i.className="memola-gantt-cfg-sel",t.forEach(x=>{let T=document.createElement("option");T.value=x.InternalName,T.textContent=x.Title,x.InternalName===n&&(T.selected=!0),i.appendChild(T)}),a.appendChild(i);let s=document.createElement("span");s.textContent="\u7D42\u4E86",a.appendChild(s);let l=document.createElement("select");l.className="memola-gantt-cfg-sel";let c=document.createElement("option");c.value="",c.textContent="(\u5358\u65E5\u30D0\u30FC)",l.appendChild(c),t.forEach(x=>{let T=document.createElement("option");T.value=x.InternalName,T.textContent=x.Title,x.InternalName===r&&(T.selected=!0),l.appendChild(T)}),r||(c.selected=!0),a.appendChild(l);function m(){let x={start:i.value,end:l.value||null};lf(d.dbList,x),vf()}i.addEventListener("change",m),l.addEventListener("change",m),e.appendChild(a);let p=t.find(x=>x.InternalName===n)||t[0],u=r&&t.find(x=>x.InternalName===r)||p,f=d.dbItems.map(x=>{let T=el(x,p.InternalName),E=el(x,u.InternalName)||T;return T?{item:x,start:new Date(T),end:new Date(E)}:null}).filter(Boolean);if(f.length===0){let x=document.createElement("div");x.className="memola-altview-empty",x.textContent="\u65E5\u4ED8\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093",e.appendChild(x);return}let g=new Date(Math.min(...f.map(x=>x.start.getTime()))),y=new Date(Math.max(...f.map(x=>x.end.getTime()))),b=Math.max(1,Math.ceil((y.getTime()-g.getTime())/864e5)+1),h=28,v=document.createElement("div");v.className="memola-gantt";let w=document.createElement("div");w.className="memola-gantt-header",w.style.width=b*h+"px";for(let x=0;x<b;x++){let T=new Date(g.getTime()+x*864e5),E=document.createElement("div");E.className="memola-gantt-day",(T.getDay()===0||T.getDay()===6)&&E.classList.add("weekend"),E.textContent=String(T.getDate()),E.title=T.toLocaleDateString("ja-JP"),w.appendChild(E)}v.appendChild(w),d.dbSelected.size>0&&v.classList.add("memola-has-sel"),f.forEach(x=>{let T=document.createElement("div");T.className="memola-gantt-row",T.dataset.id=String(x.item.Id),d.dbSelected.has(x.item.Id)&&T.classList.add("memola-card-sel");let E=Yy(x.item,()=>{T.classList.toggle("memola-card-sel",d.dbSelected.has(x.item.Id)),d.dbSelected.size>0?v.classList.add("memola-has-sel"):v.classList.remove("memola-has-sel")});T.appendChild(E);let C=document.createElement("div");C.className="memola-gantt-label";let U=document.createElement("span");U.className="memola-gantt-label-text",U.textContent=x.item.Title||"(\u7121\u984C)",C.appendChild(U),C.appendChild(yo(x.item)),jn(T,x.item.Id),T.appendChild(C);let M=document.createElement("div");M.className="memola-gantt-track",M.style.width=b*h+"px";let N=document.createElement("div"),D=Math.floor((x.start.getTime()-g.getTime())/864e5),O=Math.max(1,Math.ceil((x.end.getTime()-x.start.getTime())/864e5)+1);N.className="memola-gantt-bar",N.style.left=D*h+"px",N.style.width=O*h-2+"px",N.title=x.item.Title||"",M.appendChild(N),T.appendChild(M);let Y=E.querySelector(".memola-rowctl-handle")||void 0;Gy(T,x.item,"y",Y),v.appendChild(T)}),e.appendChild(v)}function jS(e){e==="list"?Xy():e==="gallery"?Jy():e==="calendar"?si():e==="gantt"&&vf()}function qS(e){Ue(e)}var ii,qt,un,Vy,Ed=L(()=>{"use strict";q();me();K();qe();No();le();Xs();Re();be();ii=null;qt=null,un=null,Vy=null});var Td={};j(Td,{addRowWithUndo:()=>Zs,canRedoDb:()=>WS,canUndoDb:()=>VS,clearDbHistory:()=>GS,deleteRowWithUndo:()=>zr,recordCellChange:()=>to,recordColOrderChange:()=>kf,recordDbCommand:()=>jr,recordRowFieldsUpdate:()=>wf,recordRowOrderChange:()=>xf,redoDb:()=>KS,undoDb:()=>$S});function ol(e){let t=yf.get(e);return t||(t={past:[],future:[]},yf.set(e,t)),t}function jr(e,t){if(!e)return;let o=ol(e);o.past.push(t),o.past.length>50&&o.past.shift(),o.future=[]}async function $S(e){let t=ol(e),o=t.past.pop();if(!o)return null;try{return await o.undo(),t.future.push(o),o}catch(n){throw n}}async function KS(e){let t=ol(e),o=t.future.pop();if(!o)return null;try{return await o.redo(),t.past.push(o),o}catch(n){throw n}}function VS(e){return ol(e).past.length>0}function WS(e){return ol(e).future.length>0}function GS(e){yf.delete(e)}async function gn(e){let{S:t}=await Promise.resolve().then(()=>(q(),Jt));return t.currentType==="database"&&t.dbList===e}async function qn(){(await Promise.resolve().then(()=>(K(),ie))).renderDbTable();let t=document.getElementById("list-view"),o=document.getElementById("gallery-view"),n=document.getElementById("calendar-view"),r=document.getElementById("gantt-view");if(t?.classList.contains("on")||o?.classList.contains("on")||n?.classList.contains("on")||r?.classList.contains("on")){let a=await Promise.resolve().then(()=>(Ed(),Id));t?.classList.contains("on")&&a.renderListView(),o?.classList.contains("on")&&a.renderGalleryView(),n?.classList.contains("on")&&a.renderCalendarView(),r?.classList.contains("on")&&a.renderGanttView()}}function to(e,t,o,n,r,a){let i=async s=>{let{apiUpdateDbRow:l}=await Promise.resolve().then(()=>(qe(),Ct));if(await l(e,t,{[o]:s??""}),!await gn(e))return;let{S:c}=await Promise.resolve().then(()=>(q(),Jt)),m=c.dbItems.find(p=>p.Id===t);m&&(m[o]=s),await qn()};jr(e,{label:n+" \u5909\u66F4",undo:()=>i(r),redo:()=>i(a)})}function xf(e,t,o){let n=async r=>{let{saveRowOrder:a}=await Promise.resolve().then(()=>(Xs(),df));if(r===null){let{prefDbRowOrderLegacy:i}=await Promise.resolve().then(()=>(be(),Kp));i(e).clear()}else a(e,r);await gn(e)&&await qn()};jr(e,{label:"\u884C\u306E\u4E26\u3073\u66FF\u3048",undo:()=>n(t.length?t:null),redo:()=>n(o)})}async function YS(e,t){let{getListFields:o}=await Promise.resolve().then(()=>(De(),po)),n=await o(e),r=new Set(n.map(i=>i.InternalName)),a={};for(let i of Object.keys(t)){if(!r.has(i))continue;let s=t[i];s!=null&&typeof s!="object"&&(a[i]=s)}return!a.Title&&t.Title&&(a.Title=String(t.Title)),a}async function XS(e){let{S:t}=await Promise.resolve().then(()=>(q(),Jt));return t.meta.pages.find(n=>n.list===e&&n.type==="database")?.id||""}async function zr(e,t){let{S:o}=await Promise.resolve().then(()=>(q(),Jt)),{getListItemById:n}=await Promise.resolve().then(()=>(De(),po)),{apiTrashRow:r,apiRestoreRow:a}=await Promise.resolve().then(()=>(qe(),Ct)),i=!1;if(o.dbList===e&&(i=!!o.dbItems.find(l=>l.Id===t)),i||(i=!!await n(e,t).catch(()=>null)),!i)return;await r(e,t),o.dbList===e&&(o.dbItems=o.dbItems.filter(l=>l.Id!==t));let s=t;jr(e,{label:"\u884C\u524A\u9664",undo:async()=>{if(await a(e,s),!await gn(e))return;let l=(await Promise.resolve().then(()=>(q(),Jt))).S,c=await n(e,s).catch(()=>null);c&&!l.dbItems.find(m=>m.Id===s)&&l.dbItems.push(c),await qn()},redo:async()=>{await r(e,s);let l=(await Promise.resolve().then(()=>(q(),Jt))).S;l.dbList===e&&(l.dbItems=l.dbItems.filter(c=>c.Id!==s)),await qn()}})}async function Zs(e,t,o){let{apiAddDbRow:n}=await Promise.resolve().then(()=>(qe(),Ct)),{setRowBody:r,deleteRowEntry:a,getRowBody:i}=await Promise.resolve().then(()=>(V(),$e)),{deleteListItem:s}=await Promise.resolve().then(()=>(De(),po)),l=await XS(e),c=await n(e,t);o&&await r(e,c.Id,l,String(t.Title||""),o);let m=c.Id,p={...c},u=o||"";return jr(e,{label:"\u884C\u8FFD\u52A0",undo:async()=>{if(await gn(e)){let y=(await Promise.resolve().then(()=>(q(),Jt))).S.dbItems.find(b=>b.Id===m);y&&(p={...y})}if(u=await i(e,m).catch(()=>u),await s(e,m).catch(()=>{}),await a(e,m).catch(()=>{}),!await gn(e))return;let f=(await Promise.resolve().then(()=>(q(),Jt))).S;f.dbItems=f.dbItems.filter(g=>g.Id!==m),await qn()},redo:async()=>{let f=await YS(e,p),g=await n(e,f);if(m=g.Id,u&&await r(e,m,l,String(p.Title||""),u),!await gn(e))return;(await Promise.resolve().then(()=>(q(),Jt))).S.dbItems.push(g),await qn()}}),c}function wf(e,t,o,n,r,a,i){let s=async(l,c)=>{let{apiUpdateDbRow:m}=await Promise.resolve().then(()=>(qe(),Ct));Object.keys(l).length>0&&await m(e,t,l);let p="";if(await gn(e)){let f=(await Promise.resolve().then(()=>(q(),Jt))).S.dbItems.find(g=>g.Id===t);f&&(p=String(f.Title||""))}if(c!==void 0){let{setRowBody:u}=await Promise.resolve().then(()=>(V(),$e));await u(e,t,i,p,c)}if(await gn(e)){if(Object.keys(l).length>0){let f=(await Promise.resolve().then(()=>(q(),Jt))).S.dbItems.find(g=>g.Id===t);if(f)for(let g of Object.keys(l))f[g]=l[g]}await qn()}};jr(e,{label:"\u884C\u66F4\u65B0",undo:()=>s(o,r),redo:()=>s(n,a)})}function kf(e,t,o){let n=async r=>{let{saveColOrder:a}=await Promise.resolve().then(()=>(Xs(),df));if(r===null){let{prefDbColOrderLegacy:i}=await Promise.resolve().then(()=>(be(),Kp));i(e).clear()}else a(e,r);await gn(e)&&await qn()};jr(e,{label:"\u5217\u306E\u4E26\u3073\u66FF\u3048",undo:()=>n(t.length?t:null),redo:()=>n(o)})}var yf,No=L(()=>{"use strict";yf=new Map});function If(){li&&(li.remove(),li=null),ci&&(document.removeEventListener("mousedown",ci,!0),ci=null)}function Zy(e,t,o,n){If();let r=ov();if(!r)return;let a=document.createElement("div");a.className="memola-choice-pop";for(let s of t){let l=document.createElement("div");l.className="memola-cp-item";let c=s.value===o;c&&l.classList.add("sel");let m=document.createElement("span");m.className="memola-cp-ic",m.textContent=c?"\u2713":s.icon||"";let p=document.createElement("span");if(p.className="memola-cp-label",p.textContent=s.label||"\u2014",s.label||p.classList.add("memola-cp-empty"),l.append(m,p),s.sub){let u=document.createElement("span");u.className="memola-cp-sub",u.textContent=s.sub,l.appendChild(u)}l.addEventListener("mousedown",u=>{u.preventDefault(),u.stopPropagation(),n(s.value),If()}),a.appendChild(l)}let i=e.getBoundingClientRect();a.style.top=i.bottom+4+"px",a.style.left=i.left+"px",a.style.minWidth=Math.max(180,i.width)+"px",r.appendChild(a),requestAnimationFrame(()=>{let s=a.getBoundingClientRect();if(s.bottom>window.innerHeight-8){let l=i.top-s.height-4;l>=8&&(a.style.top=l+"px")}s.right>window.innerWidth-8&&(a.style.left=window.innerWidth-s.width-8+"px")}),li=a,ci=s=>{li&&(s.target instanceof Node&&li.contains(s.target)||If())},setTimeout(()=>{ci&&document.addEventListener("mousedown",ci,!0)},0)}var li,ci,Qy=L(()=>{"use strict";me();li=null,ci=null});async function $n(e,t,o,n,r){let a=r[o.InternalName],i=a==null?"":String(a),s=n==null?"":String(n);if(i===s)return;let l=o.Title||o.InternalName;try{await ft(e,t,{[l]:n}),r[o.InternalName]=n,to(e,t,o.InternalName,o.Title,a,n)}catch(c){k("\u4FDD\u5B58\u5931\u6557: "+c.message,"err")}}function JS(e,t,o){let n=t[e.InternalName];switch(e.FieldTypeKind){case 4:{let r=document.createElement("div");r.className="memola-rp-date-wrap";let a=document.createElement("input");a.type="text",a.className="memola-rp-input memola-rp-date",a.placeholder="YYYY-MM-DD",a.value=To(n);let i=document.createElement("input");i.type="date",i.className="memola-rp-date-pick",i.value=To(n),i.tabIndex=-1,i.title="\u30AB\u30EC\u30F3\u30C0\u30FC\u304B\u3089\u9078\u629E",r.append(a,i);let s=l=>{a.classList.remove("memola-rp-invalid"),a.value=l,i.value=l,$n(o,t.Id,e,l,t)};return a.addEventListener("blur",()=>{let l=a.value.trim();if(!l){a.classList.remove("memola-rp-invalid"),i.value="",$n(o,t.Id,e,"",t);return}let c=Rc(l);if(!c){a.classList.add("memola-rp-invalid"),k("\u65E5\u4ED8\u5F62\u5F0F\u304C\u7121\u52B9\u3067\u3059: "+l,"err");return}s(c)}),a.addEventListener("keydown",l=>{l.key==="Enter"&&(l.preventDefault(),a.blur()),l.key==="Escape"&&(a.value=To(t[e.InternalName]),a.blur())}),i.addEventListener("change",()=>{i.value?s(i.value):(a.value="",$n(o,t.Id,e,"",t))}),r}case 6:{let r=document.createElement("button");r.type="button",r.className="memola-rp-input memola-rp-choice";let a=e.Choices||[],i=()=>{let s=t[e.InternalName]||"";if(s){let l=a.indexOf(s);r.innerHTML='<span class="memola-select-chip memola-sc-'+(l>=0?l%6:0)+'">'+s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</span>"}else r.innerHTML='<span class="memola-rp-placeholder">\u2014</span>'};return i(),r.addEventListener("click",()=>{let s=t[e.InternalName]||"",l=[{value:"",label:"\u2014"},...a.map(c=>({value:c,label:c}))];Zy(r,l,s,c=>{$n(o,t.Id,e,c,t).then(i)})}),r}case 8:{let r=document.createElement("label");r.className="memola-rp-checkbox";let a=document.createElement("input");return a.type="checkbox",a.checked=n===!0||n==="true"||n===1||n==="1",a.addEventListener("change",()=>{$n(o,t.Id,e,a.checked?"1":"0",t)}),r.appendChild(a),r}case 9:{let r=document.createElement("input");return r.type="number",r.className="memola-rp-input",r.value=n==null?"":String(n),r.addEventListener("blur",()=>{let a=r.value.trim()===""?"":Number(r.value);$n(o,t.Id,e,a,t)}),r}case 3:{let r=document.createElement("textarea");return r.className="memola-rp-input memola-rp-multi",r.rows=2,r.value=n==null?"":String(n),r.addEventListener("blur",()=>{$n(o,t.Id,e,r.value,t)}),r}default:{let r=document.createElement("input");return r.type="text",r.className="memola-rp-input",r.value=n==null?"":String(n),r.addEventListener("blur",()=>{$n(o,t.Id,e,r.value,t)}),r}}}function ex(e,t,o,n){e.innerHTML="";let r=t.filter(a=>a.InternalName!=="Title");if(r.length!==0)for(let a of r){let i=document.createElement("div");i.className="memola-rp-row";let s=document.createElement("div");s.className="memola-rp-label",s.textContent=a.Title;let l=document.createElement("div");l.className="memola-rp-value",l.appendChild(JS(a,o,n)),i.append(s,l),e.appendChild(i)}}var tx=L(()=>{"use strict";qe();le();Lo();No();Qy()});var Kn={};j(Kn,{CLAUDE_MODELS:()=>ZS,CORP_AI_MODELS:()=>Ef,DEFAULT_EMBEDDING_API_VERSION:()=>sx,DEFAULT_EMBEDDING_MODEL:()=>ix,DEFAULT_VOYAGE_MODEL:()=>lx,EMBEDDING_MODELS:()=>h2,VOYAGE_MODELS:()=>b2,deploymentIdFor:()=>Mf,findCorpAiModel:()=>di,getActiveModel:()=>c2,getClaudeApiKey:()=>Tf,getClaudeModel:()=>Ld,getCorpAiBaseUrl:()=>Sf,getCorpAiDeploymentPrefix:()=>ox,getCorpAiKey:()=>rl,getCorpAiModel:()=>qr,getCorpAiOverrides:()=>rx,getCorpAiOverridesRaw:()=>nx,getEmbedProvider:()=>cx,getEmbeddingApiVersion:()=>ux,getEmbeddingDimensions:()=>fx,getEmbeddingModel:()=>px,getLocalAiBaseUrl:()=>Sd,getLocalAiKey:()=>Md,getLocalAiModel:()=>$r,getLocalAiModels:()=>u2,getLocalAiReasoningModels:()=>ax,getProvider:()=>nl,getRagMinScore:()=>Af,getRagTopK:()=>Cf,getVoyageKey:()=>dx,getVoyageModel:()=>mx,isLocalReasoningModel:()=>Pd,isRagAvailable:()=>L2,resolveCorpAiEndpoint:()=>Pf,resolveEmbeddingEndpoint:()=>al,setClaudeApiKey:()=>Lf,setClaudeModel:()=>n2,setCorpAiBaseUrl:()=>i2,setCorpAiDeploymentPrefix:()=>s2,setCorpAiKey:()=>a2,setCorpAiModel:()=>r2,setCorpAiOverridesRaw:()=>l2,setEmbedProvider:()=>v2,setEmbeddingApiVersion:()=>k2,setEmbeddingDimensions:()=>I2,setEmbeddingModel:()=>w2,setLocalAiBaseUrl:()=>d2,setLocalAiKey:()=>m2,setLocalAiModel:()=>p2,setLocalAiModels:()=>f2,setLocalAiReasoningModels:()=>g2,setProvider:()=>o2,setRagMinScore:()=>T2,setRagTopK:()=>E2,setVoyageKey:()=>y2,setVoyageModel:()=>x2});function nl(){let e=xa.get();return e==="corp"||e==="local"?e:QS}function o2(e){xa.set(e)}function Ld(){return fc.get()||e2}function n2(e){fc.set(e)}function Tf(){return gc.get()}function Lf(e){gc.set(e.trim())}function qr(){let e=wa.get();return e&&Ef.some(t=>t.id===e)?e:t2}function r2(e){wa.set(e)}function rl(){return hc.get()}function a2(e){hc.set(e)}function Sf(){return co.get().replace(/\/$/,"")}function i2(e){co.set(e.trim())}function ox(){return ka.get()}function s2(e){ka.set(e.trim())}function Mf(e){let t=ox(),o=e.replace(/\./g,"");return t+o}function nx(){return bc.get()}function l2(e){bc.set(e.trim())}function rx(){let e=nx();if(!e)return{};try{let t=JSON.parse(e);if(t&&typeof t=="object")return t}catch{}return{}}function Pf(e){let o=di(e)?.reasoning?"2024-12-01-preview":"2024-06-01",n=rx()[e]||{};return{baseUrl:(n.baseUrl||Sf()||"").replace(/\/$/,""),apiVersion:n.apiVersion||o,deploymentId:n.deploymentId||Mf(e)}}function c2(){let e=nl();return e==="corp"?qr():e==="local"?$r():Ld()}function di(e){return Ef.find(t=>t.id===e)||null}function Sd(){return yc.get().replace(/\/$/,"")}function d2(e){yc.set(e.trim())}function Md(){return xc.get()}function m2(e){xc.set(e.trim())}function $r(){return wc.get()}function p2(e){wc.set(e.trim())}function u2(){let e=kc.get();if(!e)return[];try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(o=>typeof o=="string"&&o.trim())}catch{}return[]}function f2(e){kc.set(JSON.stringify(e.filter(t=>t.trim())))}function ax(){let e=Ic.get();return e?e.split(/[\s,]+/).map(t=>t.trim().toLowerCase()).filter(Boolean):[]}function g2(e){Ic.set(e.trim())}function Pd(e){let t=e.toLowerCase();return ax().some(o=>t.includes(o))}function cx(){return Ia.get()==="voyage"?"voyage":"auto"}function v2(e){Ia.set(e)}function dx(){return Ec.get()}function y2(e){Ec.set(e.trim())}function mx(){return Ea.get()||lx}function x2(e){Ea.set(e.trim())}function px(){return Ta.get()||ix}function w2(e){Ta.set(e.trim())}function ux(){return La.get()||sx}function k2(e){La.set(e.trim())}function fx(){let e=Sa.get().trim();if(!e)return null;let t=parseInt(e,10);return Number.isFinite(t)&&t>0?t:null}function I2(e){Sa.set(e.trim())}function Cf(){let e=parseInt(Ma.get(),10);return Number.isFinite(e)&&e>0?e:8}function E2(e){Ma.set(e.trim())}function Af(){let e=parseFloat(Pa.get());return Number.isFinite(e)?e:.2}function T2(e){Pa.set(e.trim())}function al(){let e=fx();if(cx()==="voyage"){let n=dx();return n?{provider:"voyage",kind:"voyage",url:"https://api.voyageai.com/v1/embeddings",apiKey:n,authStyle:"bearer",model:mx(),dimensions:e}:null}let t=nl(),o=px();if(t==="corp"){let n=Sf();if(!n)return null;let r=Mf(o),a=ux();return{provider:"corp",kind:"openai",url:`${n}/openai/deployments/${r}/embeddings?api-version=${encodeURIComponent(a)}`,apiKey:rl(),authStyle:"azure",model:o,dimensions:e}}if(t==="local"){let n=Sd();return n?{provider:"local",kind:"openai",url:`${n}/embeddings`,apiKey:Md(),authStyle:"bearer",model:o,dimensions:e}:null}return null}function L2(){return al()!==null}var Ef,ZS,QS,e2,t2,h2,ix,sx,b2,lx,_t=L(()=>{"use strict";be();Ef=[{id:"gpt-5",reasoning:!0,vision:!0},{id:"gpt-5-mini",reasoning:!0,vision:!0},{id:"gpt-5-nano",reasoning:!0,vision:!0},{id:"o3",reasoning:!0,vision:!0},{id:"o4-mini",reasoning:!0,vision:!0},{id:"gpt-4.1",reasoning:!1,vision:!0},{id:"gpt-4.1-mini",reasoning:!1,vision:!0},{id:"gpt-4.1-nano",reasoning:!1,vision:!0},{id:"gpt-4o",reasoning:!1,vision:!0},{id:"gpt-4o-mini",reasoning:!1,vision:!0}],ZS=[{id:"claude-opus-4-5",label:"Claude Opus 4.5"},{id:"claude-sonnet-4-5",label:"Claude Sonnet 4.5"},{id:"claude-haiku-4-5",label:"Claude Haiku 4.5"}],QS="claude",e2="claude-sonnet-4-5",t2="gpt-4.1-mini";h2=["text-embedding-3-small","text-embedding-3-large","text-embedding-ada-002"],ix="text-embedding-3-small",sx="2024-02-01",b2=["voyage-3.5-lite","voyage-3.5","voyage-3-large","voyage-code-3"],lx="voyage-3.5-lite"});function S2(e,t,o){let n=e.headers.get("Retry-After");if(n){let a=Number(n);if(!isNaN(a)&&a>=0)return Math.min(a*1e3,12e4);let i=Date.parse(n);if(!isNaN(i))return Math.max(0,Math.min(i-Date.now(),12e4))}let r=t.match(/(?:try again in|retry (?:after|in))\s+(\d+)\s*(?:s|sec|seconds)?/i);return r?Math.min(Number(r[1])*1e3,12e4):Math.min(2e3*Math.pow(2,o),3e4)}async function M2(e,t){if(!(e<=0)){if(t?.aborted)throw new DOMException("aborted","AbortError");await new Promise((o,n)=>{let r=setTimeout(()=>{t?.removeEventListener("abort",a),o()},e),a=()=>{clearTimeout(r),n(new DOMException("aborted","AbortError"))};t?.addEventListener("abort",a,{once:!0})})}}function il(){return al()!==null}async function Bf(e,t={}){if(e.length===0)return[];let o=al();if(!o)throw new Error("\u57CB\u3081\u8FBC\u307F\u672A\u8A2D\u5B9A: AI \u8A2D\u5B9A\u3067\u57CB\u3081\u8FBC\u307F\u30D7\u30ED\u30D0\u30A4\u30C0 (Voyage / Azure OpenAI \u4E92\u63DB / \u30ED\u30FC\u30AB\u30EB) \u3092\u69CB\u6210\u3057\u3066\u304F\u3060\u3055\u3044");let{inputType:n="document",signal:r,maxRetries:a=5}=t,i={"Content-Type":"application/json"};o.authStyle==="azure"?o.apiKey&&(i["api-key"]=o.apiKey):o.apiKey&&(i.Authorization=o.apiKey.startsWith("Bearer ")?o.apiKey:`Bearer ${o.apiKey}`);let s={input:e,model:o.model};o.kind==="voyage"?(s.input_type=n,o.dimensions&&(s.output_dimension=o.dimensions)):o.dimensions&&(s.dimensions=o.dimensions);let l=JSON.stringify(s);for(let c=0;c<=a;c++){if(r?.aborted)throw new DOMException("aborted","AbortError");let m=await fetch(o.url,{method:"POST",headers:i,credentials:"omit",signal:r,body:l});if(m.ok){let g=await m.json(),y=new Array(e.length);for(let b of g.data)y[b.index]=Float32Array.from(b.embedding);return y}let p=await m.text().catch(()=>"");if(!(m.status===429||m.status>=500&&m.status<600)||c===a)throw new Error(`embed failed: HTTP ${m.status} ${p.slice(0,300)}`);let f=S2(m,p,c);console.warn(`[rag/embed] HTTP ${m.status}; retry in ${Math.round(f/1e3)}s (${c+1}/${a})`),await M2(f,r)}throw new Error("embed failed: max retries exceeded")}async function gx(e,t){let[o]=await Bf([e],{inputType:"query",signal:t});return o}var Cd=L(()=>{"use strict";_t()});function sl(){return{version:0,generation:1,maxSeq:0,sealed:[],open:null,updatedAt:mi()}}function mi(){return new Date().toISOString()}function Df(e){let t=0;for(let o of e){let n=/(\d+)$/.exec(o);n&&(t=Math.max(t,Number(n[1])))}return t+1}function ll(e){return"seg-"+String(e).padStart(5,"0")}function cl(e){return JSON.stringify(e)}function Ad(e){let t=JSON.parse(e);if(!t||!Array.isArray(t.records))throw new Error("\u58CA\u308C\u305F\u30BB\u30B0\u30E1\u30F3\u30C8");return t}function dl(e){return JSON.stringify(e)}function ml(e){let t=JSON.parse(e);if(!t||!Array.isArray(t.sealed))throw new Error("\u58CA\u308C\u305F manifest");return t}function hx(e){let t=2166136261;for(let o=0;o<e.length;o++)t^=e.charCodeAt(o),t=t+((t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24))>>>0;return t.toString(16).padStart(8,"0")}function bx(e,t){return e.sealed.filter(o=>!t.has(o))}var pl=L(()=>{"use strict"});function C2(e){let t=2166136261;for(let o=0;o<e.length;o++)t^=e.charCodeAt(o),t=t+((t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24))>>>0;return t.toString(16).padStart(8,"0")}function A2(e){return new Promise((t,o)=>{let n=indexedDB.open(e,P2);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains(Kr)||r.createObjectStore(Kr),r.objectStoreNames.contains(ul)||r.createObjectStore(ul)},n.onsuccess=()=>t(n.result),n.onerror=()=>o(n.error)})}function Vn(e,t,o,n){return new Promise((r,a)=>{let i=e.transaction(t,o),s=n(i.objectStore(t));s.onsuccess=()=>r(s.result),s.onerror=()=>a(s.error)})}var P2,Kr,ul,pi,vx=L(()=>{"use strict";pl();Fe();P2=1,Kr="segments",ul="meta";pi=class{constructor(t){this.dbp=null;this.name=`memola-rag-${C2(W)}-${t}`}get dbName(){return this.name}db(){return this.dbp??(this.dbp=A2(this.name))}async allIds(){let t=await this.db();return(await Vn(t,Kr,"readonly",n=>n.getAllKeys())).map(String)}async get(t){let o=await this.db(),n=await Vn(o,Kr,"readonly",r=>r.get(t));return n?Ad(n):null}async put(t,o){let n=await this.db();await Vn(n,Kr,"readwrite",r=>r.put(cl(o),t))}async delete(t){let o=await this.db();await Vn(o,Kr,"readwrite",n=>n.delete(t))}async getManifest(){let t=await this.db(),o=await Vn(t,ul,"readonly",n=>n.get("manifest"));return o?ml(o):null}async setManifest(t){let o=await this.db();await Vn(o,ul,"readwrite",n=>n.put(dl(t),"manifest"))}async clearAll(){let t=await this.db();await Vn(t,Kr,"readwrite",o=>o.clear()),await Vn(t,ul,"readwrite",o=>o.clear())}}});function B2(e){let t=new Float32Array(1),o=new Int32Array(t.buffer);t[0]=e;let n=o[0],r=n>>>16&32768,a=(n>>>23&255)-127+15,i=n&8388607;return a<=0?a<-10?r:(i=(i|8388608)>>1-a,r|i>>13):a>=31?r|31744:r|a<<10|i>>13}function D2(e){let t=(e&32768)<<16,o=(e&31744)>>10,n=e&1023,r;if(o===0)if(n===0)r=t;else{let s=-1,l=n;do s++,l<<=1;while(!(l&1024));l&=1023,r=t|s+127-15+1<<23|l<<13}else o===31?r=t|2139095040|n<<13:r=t|o-15+127<<23|n<<13;let a=new Int32Array(1),i=new Float32Array(a.buffer);return a[0]=r,i[0]}function yx(e){let t=new Uint16Array(e.length);for(let r=0;r<e.length;r++)t[r]=B2(e[r]);let o=new Uint8Array(t.buffer),n="";for(let r=0;r<o.length;r++)n+=String.fromCharCode(o[r]);return btoa(n)}function Bd(e){let t=atob(e),o=new Uint8Array(t.length);for(let a=0;a<t.length;a++)o[a]=t.charCodeAt(a);let n=new Uint16Array(o.buffer),r=new Float32Array(n.length);for(let a=0;a<n.length;a++)r[a]=D2(n[a]);return r}function ui(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n]*e[n];if(t=Math.sqrt(t),t===0)return e;let o=new Float32Array(e.length);for(let n=0;n<e.length;n++)o[n]=e[n]/t;return o}var Dd=L(()=>{"use strict"});function xx(e){let t=(e||"").toLowerCase().replace(/\s+/g," ").trim(),o=new Set;for(let n=0;n<t.length-1;n++)o.add(t.slice(n,n+2));return o}function _2(e,t){if(e.size===0)return 0;let o=0;for(let n of e)t.has(n)&&o++;return o/e.size}var _d,wx=L(()=>{"use strict";Dd();_d=class{constructor(){this.records=new Map;this.appliedSeq=new Map;this.maxSeq=0;this.kwCache=new Map}get size(){return this.records.size}get watermark(){return this.maxSeq}applySegment(t){let o=[...t.records].sort((n,r)=>n.seq-r.seq);for(let n of o)this.applyRecord(n)}applyRecord(t){let o=this.appliedSeq.get(t.key)??0;if(!(t.seq<=o)){if(this.kwCache.delete(t.key),t.op==="delete")this.records.delete(t.key);else{if(!t.emb)return;this.records.set(t.key,{key:t.key,docKey:t.docKey??t.key.split("#")[0],scope:t.scope??"user",title:t.title??"(\u7121\u984C)",chunkIdx:t.chunkIdx??0,chunkCount:t.chunkCount??1,heading:t.heading,text:t.text??"",docHash:t.docHash??"",vec:ui(Bd(t.emb))})}this.appliedSeq.set(t.key,t.seq),t.seq>this.maxSeq&&(this.maxSeq=t.seq)}}docState(t){let o="",n=0;for(let r of this.records.values())r.docKey===t&&(n++,o||(o=r.docHash));return n>0?{docHash:o,chunkCount:n}:null}allDocKeys(){let t=new Set;for(let o of this.records.values())t.add(o.docKey);return t}search(t,o,n="",r=0,a=[]){let i=ui(t),s=i.length,c=r>0&&n.trim().length>0?xx(n):null,m=Math.min(1,Math.max(0,r)),p=a.map(g=>g.toLowerCase()).filter(Boolean),u=[];for(let g of this.records.values()){let y=0;if(g.vec.length===s)for(let v=0;v<s;v++)y+=i[v]*g.vec[v];let b=Math.max(0,y),h=c?(1-m)*b+m*_2(c,this.kwIndex(g)):b;u.push({record:g,score:h})}let f=u;if(p.length){let g=b=>`${b.title} ${b.heading??""} ${b.text}`.toLowerCase(),y=u.filter(b=>p.every(h=>g(b.record).includes(h)));y.length&&(f=y)}return f.sort((g,y)=>y.score-g.score),f.slice(0,o)}kwIndex(t){let o=this.kwCache.get(t.key);return o||(o=xx(`${t.title} ${t.heading??""} ${t.text}`),this.kwCache.set(t.key,o)),o}clear(){this.records.clear(),this.appliedSeq.clear(),this.kwCache.clear(),this.maxSeq=0}}});function _f(e){return W+"/_api/web/GetFileByServerRelativeUrl('"+encodeURIComponent(e)+"')/$value"}function R2(e){return W+"/_api/web/GetFileByServerRelativeUrl('"+encodeURIComponent(e)+"')"}function Nd(e,t=""){return W+"/_api/web/GetFolderByServerRelativeUrl('"+encodeURIComponent(e)+"')"+t}async function Rf(e){try{let r=await fetch(Nd(e,"?$select=Exists"),{headers:{Accept:Rd},credentials:"include"});if(r.ok&&(await r.json()).d?.Exists)return}catch{}let t=await xe(),o=await fetch(W+"/_api/web/folders",{method:"POST",headers:{Accept:Rd,"Content-Type":Rd,"X-RequestDigest":t},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Folder"},ServerRelativeUrl:e})});if(o.ok)return;let n=await o.text().catch(()=>"");if(!(o.status===409||/exist|既に|already/i.test(n)))throw new Error("ensureFolder HTTP "+o.status+" "+n.slice(0,200))}async function fi(e){let t=await fetch(_f(e),{headers:{Accept:"*/*"},credentials:"include"});if(t.status===404)return null;if(!t.ok)throw new Error("readFile HTTP "+t.status+" ("+e+")");return t.text()}async function kx(e){let t=await fetch(_f(e),{headers:{Accept:"*/*"},credentials:"include"});if(t.status===404)return null;if(!t.ok)throw new Error("readFile HTTP "+t.status+" ("+e+")");let o=await t.text(),n=t.headers.get("ETag")||t.headers.get("etag")||"";return{text:o,etag:n}}async function Od(e,t,o){let n=await xe(),r=Nd(e,"/Files/add(url='"+encodeURIComponent(t)+"',overwrite=true)"),a=await fetch(r,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8","X-RequestDigest":n},credentials:"include",body:o});if(!a.ok){let i=await a.text().catch(()=>"");throw new Error("uploadFile("+t+") HTTP "+a.status+" "+i.slice(0,200))}}async function Ix(e,t,o){if(!o){let a=e.lastIndexOf("/");await Od(e.slice(0,a),e.slice(a+1),t);return}let n=await xe(),r=await fetch(_f(e),{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8","X-RequestDigest":n,"X-HTTP-Method":"PUT","If-Match":o},credentials:"include",body:t});if(r.status===412)throw new fl;if(!r.ok){let a=await r.text().catch(()=>"");throw new Error("uploadFileTextCas HTTP "+r.status+" "+a.slice(0,200))}}async function Ex(e,t,o){let n=await xe(),r=Nd(e,"/Files/add(url='"+encodeURIComponent(t)+"',overwrite=false)"),a=await fetch(r,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8","X-RequestDigest":n},credentials:"include",body:o});if(a.ok)return!0;if(a.status===409||a.status===400||a.status===500){let s=await a.text().catch(()=>"");if(/already exists|exists at|存在|already there/i.test(s))return!1}let i=await a.text().catch(()=>"");throw new Error("uploadFileTextNoOverwrite HTTP "+a.status+" "+i.slice(0,200))}async function Tx(e){let t=await xe(),o=await fetch(R2(e),{method:"POST",headers:{"X-RequestDigest":t,"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include"});if(!o.ok&&o.status!==404){let n=await o.text().catch(()=>"");throw new Error("deleteFile HTTP "+o.status+" "+n.slice(0,200))}}async function Nf(e){let t=await fetch(Nd(e,"/Files?$select=Name&$top=5000"),{headers:{Accept:Rd},credentials:"include"});return t.ok?((await t.json()).d?.results??[]).map(n=>n.Name??"").filter(Boolean):[]}var Rd,fl,Of=L(()=>{"use strict";Fe();wr();Rd="application/json;odata=verbose",fl=class extends Error{constructor(){super("CAS conflict (412)");this.code="PRECONDITION_FAILED"}}});async function Lx(e,t,o=5){for(let n=0;n<=o;n++){let r=await e.readManifestWithEtag(),a=r?.manifest??sl(),i=r?.etag??"",s=t(a);s.updatedAt=mi();try{return await e.writeManifestCas(s,i),s}catch(l){if(!(l instanceof fl)||n===o)throw l;await new Promise(c=>setTimeout(c,50+n*60))}}throw new Error("manifest CAS: max retries exceeded")}var gl,N2,hl,Sx=L(()=>{"use strict";Fe();Of();pl();gl="manifest.json",N2="Shared Documents/memola-rag",hl=class{constructor(t){this.scope=t;this.folder=`${Zo}/${N2}/${t}`}async ensure(){await Rf(`${Zo}/Shared Documents/memola-rag`),await Rf(this.folder)}async readManifest(){let t=await fi(`${this.folder}/${gl}`);return t==null?null:ml(t)}async readManifestWithEtag(){let t=await kx(`${this.folder}/${gl}`);return t?{manifest:ml(t.text),etag:t.etag}:null}async writeManifest(t){await Od(this.folder,gl,dl(t))}async writeManifestCas(t,o){if(!o){await this.writeManifest(t);return}await Ix(`${this.folder}/${gl}`,dl(t),o)}async readSegment(t){let o=await fi(`${this.folder}/${t}.json`);return o==null?null:Ad(o)}async writeSegment(t){await Od(this.folder,`${t.id}.json`,cl(t))}async writeSegmentNoOverwrite(t,o,n=50){let r=o;for(let a=0;a<n;a++){let i=ll(r);if(await Ex(this.folder,`${i}.json`,cl({...t,id:i})))return{id:i,idx:r};r++}throw new Error("segment id \u885D\u7A81\u304C "+n+" \u56DE\u9023\u7D9A")}async listSegmentIds(){return(await Nf(this.folder)).filter(o=>o.startsWith("seg-")&&o.endsWith(".json")).map(o=>o.slice(0,-5))}async deleteAll(){let t=await Nf(this.folder);for(let o of t)(o===gl||o.startsWith("seg-")&&o.endsWith(".json"))&&await Tx(`${this.folder}/${o}`).catch(()=>{})}}});function U2(){try{let e=localStorage.getItem("memola:rag:client-id");return e||(e="c-"+Math.random().toString(36).slice(2,10),localStorage.setItem("memola:rag:client-id",e)),e}catch{return"c-anon"}}function Mx(){return Ff||(Ff=new Uf),Ff}var Vr,Hf,O2,H2,F2,Uf,Ff,Px=L(()=>{"use strict";Fe();De();Vr="memola-rag-sync",Hf="__lease__",O2=3e4,H2=5*6e4,F2=2*6e4;Uf=class{constructor(){this.me=U2();this.listReady=!1;this.writer=!1;this.timer=null;this.started=!1;this.visibilityBound=!1}get id(){return this.me}isWriter(){return this.writer}async ensureWriter(){return await this.ensureListReady(),await this.electOrRenew(),this.writer}async start(){this.started||(this.started=!0,await this.ensureListReady(),await this.tick(),this.scheduleNext(),!this.visibilityBound&&typeof document<"u"&&(this.visibilityBound=!0,document.addEventListener("visibilitychange",()=>{document.hidden||this.tick(),this.scheduleNext()})))}stop(){this.started=!1,this.timer!=null&&(window.clearInterval(this.timer),this.timer=null),this.release()}scheduleNext(){if(this.timer!=null&&(window.clearInterval(this.timer),this.timer=null),!this.started)return;let t=typeof document<"u"&&document.hidden?H2:O2;this.timer=window.setInterval(()=>{this.tick()},t)}async ensureListReady(){this.listReady||(await Ut({title:Vr,fields:[{name:"holder",kind:2},{name:"expires",kind:4},{name:"last_seen",kind:4}]}),this.listReady=!0)}async tick(){try{await this.heartbeat(),await this.electOrRenew()}catch(t){console.warn("[rag/lease] tick \u5931\u6557:",t.message)}}async readRow(t){let o=W+"/_api/web/lists/getbytitle('"+Vr+"')/items?$select=Id,holder,expires&$filter=Title eq '"+t.replace(/'/g,"''")+"'&$top=1",n=await fetch(o,{headers:{Accept:"application/json;odata=verbose"},credentials:"include"});if(!n.ok)return null;let a=(await n.json()).d?.results?.[0];return a?{Id:a.Id,holder:String(a.holder??""),expires:String(a.expires??""),etag:a.__metadata?.etag??"*"}:null}async heartbeat(){let t=new Date().toISOString(),o=await this.readRow(this.me);o?await Ir(Vr,o.Id,{last_seen:t},"*").catch(()=>{}):await Ne(Vr,{Title:this.me,last_seen:t}).catch(()=>{})}async electOrRenew(){let t=Date.now(),o=t+F2,n=()=>new Date(o).toISOString(),r=await this.readRow(Hf);if(!r){try{await Ne(Vr,{Title:Hf,holder:this.me,expires:n()}),this.writer=!0}catch{this.writer=!1}return}let a=r.holder,i=Date.parse(r.expires)||0;if(a===this.me||i<t){let s=await Ir(Vr,r.Id,{holder:this.me,expires:n()},r.etag);this.writer=s.ok}else this.writer=!1}async release(){if(!(!this.listReady||!this.writer)){try{let t=await this.readRow(Hf);t&&t.holder===this.me&&await Ir(Vr,t.Id,{expires:new Date().toISOString()},t.etag)}catch{}this.writer=!1}}},Ff=null});function Cx(e,t={}){let o=t.maxChars??800,n=Math.max(0,t.overlap??80),r=t.minChars??200,a=(e??"").replace(/\r\n?/g,`
`).trim();if(!a)return[];if(a.length<=o)return[{text:a}];let i=z2(a),s=[];for(let l of i){let c=j2(l.body,o,r);for(let m of c){let p=m;if(n>0&&s.length>0){let u=s[s.length-1].text;p=u.slice(Math.max(0,u.length-n))+`
`+m}s.push({text:p,heading:l.heading})}}return s.length?s:[{text:a}]}function z2(e){let t=e.split(`
`),o=[],n={body:""};for(let r of t){let a=/^(#{1,6})\s+(.+)$/.exec(r);a?(n.body.trim()&&o.push({...n,body:n.body.trim()}),n={heading:a[2].trim(),body:""}):n.body+=(n.body?`
`:"")+r}return n.body.trim()&&o.push({...n,body:n.body.trim()}),o.length?o:[{body:e}]}function j2(e,t,o){let n=e.split(/\n{2,}/).map(i=>i.trim()).filter(Boolean),r=[],a="";for(let i of n){let s=a?a+`

`+i:i;if(s.length<=t){a=s;continue}if(a&&(r.push(a),a=""),i.length<=t)a=i;else for(let l of q2(i,t))a&&(a+`
`+l).length>t&&(r.push(a),a=""),a=a?a+`
`+l:l}return a&&r.push(a),r.length?r:[e]}function q2(e,t){let o=e.split(/(?<=[。!?！？\n])/).map(a=>a.trim()).filter(Boolean),n=[],r="";for(let a of o){if(a.length>t){r&&(n.push(r),r="");for(let i=0;i<a.length;i+=t)n.push(a.slice(i,i+t));continue}(r+a).length>t&&(n.push(r),r=""),r+=a}return r&&n.push(r),n}var Ax=L(()=>{"use strict"});async function Dx(e,t){let n=await Ee(e,"Id,Title,Body_blocks,PageType,Trashed,IsTemplate,OriginPageId"),r=[];for(let a of n){let i=String(a.PageType??"");i==="row"||i==="database"||Number(a.Trashed??0)>0||a.IsTemplate||a.OriginPageId||r.push({docKey:`${e}:${a.Id}`,scope:t,title:String(a.Title??"(\u7121\u984C)"),bodyJson:String(a.Body_blocks??"")})}return r}async function $2(e,t,o){let n=[];for(let r=0;r<e.length;r+=Bx){let a=e.slice(r,r+Bx),i=await Bf(a,{inputType:"document",signal:t});for(let s of i)n.push(s);o?.(n.length,e.length)}return n}async function _x(e,t,o,n){let r=[],a=new Set(t.map(m=>m.docKey));for(let m of e.allDocKeys()){if(a.has(m))continue;let u=e.docState(m)?.chunkCount??0;for(let f=0;f<u;f++)r.push({seq:0,op:"delete",key:`${m}#${f}`})}let i=[];for(let m of t){let p=hx(m.bodyJson||""),u=e.docState(m.docKey),f=u?.chunkCount??0;if(u&&u.docHash===p)continue;let g=Je(ge(m.bodyJson)).trim();if(!g){for(let b=0;b<f;b++)r.push({seq:0,op:"delete",key:`${m.docKey}#${b}`});continue}let y=Cx(`# ${m.title}

${g}`);i.push({doc:m,chunks:y,hash:p,prevCount:f})}let s=[];for(let m of i)for(let p of m.chunks)s.push(p.text);if(s.length===0)return r;let l=await $2(s,o,n),c=0;for(let m of i){let p=m.chunks.length;for(let u=0;u<p;u++){let f=l[c++];r.push({seq:0,op:"upsert",key:`${m.doc.docKey}#${u}`,docKey:m.doc.docKey,scope:m.doc.scope,title:m.doc.title,chunkIdx:u,chunkCount:p,heading:m.chunks[u].heading,text:m.chunks[u].text,docHash:m.hash,emb:yx(f)})}for(let u=p;u<m.prevCount;u++)r.push({seq:0,op:"delete",key:`${m.doc.docKey}#${u}`})}return r}var Bx,Rx=L(()=>{"use strict";De();V();Mt();Ax();Dd();Cd();pl();Bx=64});var Ox={};j(Ox,{ScopeIndex:()=>bl,orgIndex:()=>gi,ragHardReset:()=>K2,resetIndexes:()=>Nx,userIndex:()=>hi});function gi(){return Hd||(Hd=new bl("org",ce,!0)),Hd}function hi(){return Fd||(Fd=new bl("user",Qt(),!1)),Fd}function Nx(){Hd=null,Fd=null}async function K2(){try{await new hl("org").deleteAll()}catch{}try{await new pi("org").clearAll()}catch{}try{await new pi("user").clearAll()}catch{}Nx()}var bl,Hd,Fd,zf=L(()=>{"use strict";V();vx();wx();Sx();Px();Rx();pl();bl=class{constructor(t,o,n){this.scope=t;this.listTitle=o;this.db=new _d;this.inited=!1;this.cache=new pi(t==="org"?"org":"user"),this.store=n?new hl("org"):null}get size(){return this.db.size}stats(){return{docs:this.db.allDocKeys().size,chunks:this.db.size}}async init(){if(this.inited)return;this.inited=!0;let t=await this.cache.allIds().catch(()=>[]),o=new Set;for(let n of t){let r=await this.cache.get(n).catch(()=>null);r&&(this.db.applySegment(r),o.add(n))}this.store&&await this.syncFromSp(o)}async syncFromSp(t){if(!this.store)return;let o=await this.store.readManifest().catch(()=>null);if(!o)return;let n=bx(o,t),r=await this.cache.getManifest().catch(()=>null);o.open&&this.openChanged(o,r,t)&&n.push(o.open.id);for(let a of n){let i=await this.store.readSegment(a).catch(()=>null);i&&(this.db.applySegment(i),await this.cache.put(a,i).catch(()=>{}))}await this.pruneOrphans(o),await this.cache.setManifest(o).catch(()=>{})}openChanged(t,o,n){return t.open?!n.has(t.open.id)||!o?.open||o.open.id!==t.open.id?!0:o.open.hash!==t.open.hash:!1}async pruneOrphans(t){let o=new Set(t.sealed);t.open&&o.add(t.open.id);for(let n of await this.cache.allIds().catch(()=>[]))o.has(n)||await this.cache.delete(n).catch(()=>{})}async refresh(t,o){await this.init();let n=await Dx(this.listTitle,this.scope);if(this.store&&!await Mx().ensureWriter())return{changed:0,skipped:"not-writer",docs:n.length};let r=await _x(this.db,n,t,o);return r.length===0?{changed:0,docs:n.length}:(this.store?await this.persistRemote(r):await this.persistLocal(r),{changed:r.length,docs:n.length})}async persistRemote(t){if(!this.store)return;await this.store.ensure();let o=await this.store.readManifest().catch(()=>null)??sl(),n=o.maxSeq;t.forEach((l,c)=>{l.seq=n+c+1});let r=Df(o.sealed),a={id:ll(r),generation:o.generation,records:t},i=await this.store.writeSegmentNoOverwrite(a,r),s={...a,id:i.id};await Lx(this.store,l=>({version:l.version+1,generation:l.generation,maxSeq:Math.max(l.maxSeq,n+t.length),sealed:l.sealed.includes(i.id)?l.sealed:[...l.sealed,i.id],open:l.open,updatedAt:mi()})),this.db.applySegment(s),await this.cache.put(i.id,s).catch(()=>{})}async persistLocal(t){let o=await this.cache.getManifest().catch(()=>null)??sl(),n=o.maxSeq;t.forEach((s,l)=>{s.seq=n+l+1});let r=Df(o.sealed),a=ll(r),i={id:a,generation:o.generation,records:t};this.db.applySegment(i),await this.cache.put(a,i),o.sealed.push(a),o.maxSeq=n+t.length,o.version+=1,o.updatedAt=mi(),await this.cache.setManifest(o)}search(t,o,n,r,a=[]){return this.db.search(t,o,n,r,a)}},Hd=null,Fd=null});var qf={};j(qf,{corpAiChatRaw:()=>G2,corpAiChatText:()=>V2,flattenSystem:()=>jd,parseOAResponseToClaudeShape:()=>vl,toOAMessages:()=>bi,toOATools:()=>zd});function jf(e){if(!di(e))throw new Error("\u672A\u77E5\u306E\u30E2\u30C7\u30EB: "+e);let o=Pf(e);if(!o.baseUrl)throw new Error("Azure OpenAI \u4E92\u63DB API \u30D9\u30FC\u30B9 URL \u304C\u672A\u8A2D\u5B9A\u3067\u3059 (\u8A2D\u5B9A\u3067\u69CB\u6210)");if(!o.deploymentId)throw new Error("Azure OpenAI \u4E92\u63DB API \u30C7\u30D7\u30ED\u30A4\u540D\u304C\u672A\u8A2D\u5B9A\u3067\u3059 (\u8A2D\u5B9A\u3067\u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9\u3092\u69CB\u6210)");return o.baseUrl+"/openai/deployments/"+o.deploymentId+"/chat/completions?api-version="+o.apiVersion}async function V2(e){let t=rl();if(!t)throw new Error("Azure OpenAI \u4E92\u63DB API \u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o=e.model||qr(),n=di(o);if(!n)throw new Error("\u672A\u77E5\u306E\u30E2\u30C7\u30EB: "+o);let r={messages:e.messages};if(e.maxTokens&&(n.reasoning?r.max_completion_tokens=e.maxTokens:r.max_tokens=e.maxTokens),e.stream?.onText)return r.stream=!0,W2(jf(o),t,r,e.stream.onText,e.signal);let a=await fetch(jf(o),{method:"POST",headers:{"Content-Type":"application/json","api-key":t},body:JSON.stringify(r),signal:e.signal});if(!a.ok){let s=await a.text().catch(()=>"");throw new Error(Ud(a.status,s))}return(await a.json()).choices?.[0]?.message?.content||""}async function W2(e,t,o,n,r){let a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json","api-key":t,Accept:"text/event-stream"},body:JSON.stringify(o),signal:r});if(!a.ok){let m=await a.text().catch(()=>"");throw new Error(Ud(a.status,m))}if(!a.body)throw new Error("\u30B9\u30C8\u30EA\u30FC\u30DF\u30F3\u30B0\u5FDC\u7B54\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");let i=a.body.getReader(),s=new TextDecoder,l="",c="";for(;;){let{value:m,done:p}=await i.read();if(p)break;l+=s.decode(m,{stream:!0});let u;for(;(u=l.indexOf(`

`))!==-1;){let f=l.slice(0,u);l=l.slice(u+2);for(let g of f.split(`
`)){let y=g.match(/^data:\s*(.*)$/);if(!y)continue;let b=y[1].trim();if(!(!b||b==="[DONE]"))try{let v=JSON.parse(b).choices?.[0]?.delta?.content;v&&(c+=v,n(v))}catch{}}}}return c}function Ud(e,t){let o=t?" \u2014 "+t.slice(0,240):"";return e===401?"Azure OpenAI \u4E92\u63DB API \u5931\u6557: 401 API \u30AD\u30FC\u304C\u7121\u52B9/\u672A\u6307\u5B9A"+o:e===403?"Azure OpenAI \u4E92\u63DB API \u5931\u6557: 403 \u63A5\u7D9A\u5143 IP \u304C\u8A31\u53EF\u3055\u308C\u3066\u3044\u307E\u305B\u3093"+o:e===429?"Azure OpenAI \u4E92\u63DB API \u5931\u6557: 429 \u30EC\u30FC\u30C8\u4E0A\u9650\u8D85\u904E (1\u5206\u5F8C\u306B\u518D\u8A66\u884C)"+o:e===400?"Azure OpenAI \u4E92\u63DB API \u5931\u6557: 400 \u30EA\u30AF\u30A8\u30B9\u30C8\u4E0D\u6B63 (\u30E2\u30C7\u30EB/JSON \u3092\u78BA\u8A8D)"+o:"Azure OpenAI \u4E92\u63DB API \u5931\u6557: "+e+o}function bi(e){let t=[];for(let o of e){if(typeof o.content=="string"){t.push({role:o.role,content:o.content});continue}let n=o.content;if(o.role==="assistant"){let r=n.filter(s=>s.type==="text").map(s=>s.text).join(""),a=n.filter(s=>s.type==="tool_use"),i=a.length>0?a.map(s=>({id:s.id,type:"function",function:{name:s.name,arguments:JSON.stringify(s.input||{})}})):void 0;t.push({role:"assistant",content:r||(i?null:""),...i?{tool_calls:i}:{}})}else{let r=n.filter(i=>i.type==="tool_result"),a=n.filter(i=>i.type==="text").map(i=>i.text).join("");a&&t.push({role:"user",content:a});for(let i of r)t.push({role:"tool",tool_call_id:i.tool_use_id,content:i.content})}}return t}function zd(e){return e.map(t=>({type:"function",function:{name:t.name,description:t.description,parameters:t.input_schema}}))}function jd(e){return e?typeof e=="string"?e:e.map(t=>t.text).join(`

`):""}async function G2(e){let t=rl();if(!t)throw new Error("Azure OpenAI \u4E92\u63DB API \u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o=e.model||qr(),n=di(o);if(!n)throw new Error("\u672A\u77E5\u306E\u30E2\u30C7\u30EB: "+o);let r=jd(e.system),i={messages:r?[{role:"system",content:r},...bi(e.messages)]:bi(e.messages)};e.tools&&e.tools.length>0&&(i.tools=zd(e.tools),i.tool_choice="auto"),e.maxTokens&&(n.reasoning?i.max_completion_tokens=e.maxTokens:i.max_tokens=e.maxTokens),e.stream&&(i.stream=!0);let s=jf(o);if(e.stream)return Y2(s,t,i,e.stream,e.signal);let l=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json","api-key":t},body:JSON.stringify(i),signal:e.signal});if(!l.ok)throw new Error(Ud(l.status,await l.text().catch(()=>"")));let m=(await l.json()).choices?.[0];return vl(m?.message,m?.finish_reason)}function vl(e,t){let o=[],n=e?.content||"";if(n&&o.push({type:"text",text:n}),e?.tool_calls)for(let a of e.tool_calls){let i={};try{i=JSON.parse(a.function.arguments||"{}")}catch{}o.push({type:"tool_use",id:a.id,name:a.function.name,input:i})}let r="end_turn";return t==="tool_calls"?r="tool_use":t==="length"?r="max_tokens":t==="stop"&&(r="end_turn"),{content:o,stop_reason:r}}async function Y2(e,t,o,n,r){let a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json","api-key":t,Accept:"text/event-stream"},body:JSON.stringify(o),signal:r});if(!a.ok)throw new Error(Ud(a.status,await a.text().catch(()=>"")));if(!a.body)throw new Error("\u30B9\u30C8\u30EA\u30FC\u30DF\u30F3\u30B0\u5FDC\u7B54\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");let i=a.body.getReader(),s=new TextDecoder,l="",c="",m,p=new Map;for(;;){let{value:g,done:y}=await i.read();if(y)break;l+=s.decode(g,{stream:!0});let b;for(;(b=l.indexOf(`

`))!==-1;){let h=l.slice(0,b);l=l.slice(b+2);for(let v of h.split(`
`)){let w=v.match(/^data:\s*(.*)$/);if(!w)continue;let x=w[1].trim();if(!(!x||x==="[DONE]"))try{let E=JSON.parse(x).choices?.[0];if(!E)continue;let C=E.delta?.content;if(C&&(c+=C,n.onText?.(C)),E.delta?.tool_calls)for(let U of E.delta.tool_calls){let M=p.get(U.index)||{id:"",name:"",args:""};U.id&&(M.id=U.id),U.function?.name&&(M.name=U.function.name),U.function?.arguments&&(M.args+=U.function.arguments),p.set(U.index,M)}E.finish_reason&&(m=E.finish_reason)}catch{}}}}let u=[];c&&u.push({type:"text",text:c});for(let g of p.values()){let y={};try{y=JSON.parse(g.args||"{}")}catch{}u.push({type:"tool_use",id:g.id,name:g.name,input:y}),n.onToolUse?.({type:"tool_use",id:g.id,name:g.name,input:y})}let f="end_turn";return m==="tool_calls"||p.size>0?f="tool_use":m==="length"&&(f="max_tokens"),{content:u,stop_reason:f}}var qd=L(()=>{"use strict";_t()});var $f={};j($f,{localAiChatRaw:()=>Z2,localAiChatText:()=>X2});function $d(){let e=Sd();if(!e)throw new Error("\u30ED\u30FC\u30AB\u30EB AI \u30D9\u30FC\u30B9 URL \u304C\u672A\u8A2D\u5B9A\u3067\u3059 (\u4F8B: http://localhost:11434/v1)");return e+"/chat/completions"}function Kd(){let e={"Content-Type":"application/json"},t=Md();return t&&(e.Authorization="Bearer "+t),e}function Vd(e,t){let o=t?" \u2014 "+t.slice(0,240):"";return e===0?"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: \u30B5\u30FC\u30D0\u306B\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093 (URL \u3068\u30B5\u30FC\u30D0\u8D77\u52D5\u3092\u78BA\u8A8D)":e===401?"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: 401 \u8A8D\u8A3C\u30A8\u30E9\u30FC (API \u30AD\u30FC\u78BA\u8A8D)"+o:e===404?"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: 404 \u30A8\u30F3\u30C9\u30DD\u30A4\u30F3\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093 (URL \u672B\u5C3E\u306E /v1 \u3092\u78BA\u8A8D)"+o:e===400?"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: 400 \u30EA\u30AF\u30A8\u30B9\u30C8\u4E0D\u6B63 (\u30E2\u30C7\u30EB\u540D / JSON \u78BA\u8A8D)"+o:"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: "+e+o}async function X2(e){let t=e.model||$r();if(!t)throw new Error("\u30ED\u30FC\u30AB\u30EB AI \u306E\u30E2\u30C7\u30EB\u540D\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o={model:t,messages:e.messages};if(e.maxTokens&&(Pd(t)?o.max_completion_tokens=e.maxTokens:o.max_tokens=e.maxTokens),e.stream?.onText)return o.stream=!0,J2(o,e.stream.onText,e.signal);let n=await Wd($d(),{method:"POST",headers:Kd(),body:JSON.stringify(o),signal:e.signal});if(!n.ok)throw new Error(Vd(n.status,await n.text().catch(()=>"")));return(await n.json()).choices?.[0]?.message?.content||""}async function J2(e,t,o){let n=await Wd($d(),{method:"POST",headers:{...Kd(),Accept:"text/event-stream"},body:JSON.stringify(e),signal:o});if(!n.ok)throw new Error(Vd(n.status,await n.text().catch(()=>"")));if(!n.body)throw new Error("\u30B9\u30C8\u30EA\u30FC\u30DF\u30F3\u30B0\u5FDC\u7B54\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");let r=n.body.getReader(),a=new TextDecoder,i="",s="";for(;;){let{value:l,done:c}=await r.read();if(c)break;i+=a.decode(l,{stream:!0});let m;for(;(m=i.indexOf(`

`))!==-1;){let p=i.slice(0,m);i=i.slice(m+2);for(let u of p.split(`
`)){let f=u.match(/^data:\s*(.*)$/);if(!f)continue;let g=f[1].trim();if(!(!g||g==="[DONE]"))try{let b=JSON.parse(g).choices?.[0]?.delta?.content;b&&(s+=b,t(b))}catch{}}}}return s}async function Z2(e){let t=e.model||$r();if(!t)throw new Error("\u30ED\u30FC\u30AB\u30EB AI \u306E\u30E2\u30C7\u30EB\u540D\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o=jd(e.system),n=o?[{role:"system",content:o},...bi(e.messages)]:bi(e.messages),r={model:t,messages:n};if(e.tools&&e.tools.length>0&&(r.tools=zd(e.tools),r.tool_choice="auto"),e.maxTokens&&(Pd(t)?r.max_completion_tokens=e.maxTokens:r.max_tokens=e.maxTokens),e.stream&&(r.stream=!0),e.stream)return Q2(r,e.stream,e.signal);let a=await Wd($d(),{method:"POST",headers:Kd(),body:JSON.stringify(r),signal:e.signal});if(!a.ok)throw new Error(Vd(a.status,await a.text().catch(()=>"")));let s=(await a.json()).choices?.[0];return vl(s?.message,s?.finish_reason)}async function Q2(e,t,o){let n=await Wd($d(),{method:"POST",headers:{...Kd(),Accept:"text/event-stream"},body:JSON.stringify(e),signal:o});if(!n.ok)throw new Error(Vd(n.status,await n.text().catch(()=>"")));if(!n.body)throw new Error("\u30B9\u30C8\u30EA\u30FC\u30DF\u30F3\u30B0\u5FDC\u7B54\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");let r=n.body.getReader(),a=new TextDecoder,i="",s="",l,c=new Map;for(;;){let{value:p,done:u}=await r.read();if(u)break;i+=a.decode(p,{stream:!0});let f;for(;(f=i.indexOf(`

`))!==-1;){let g=i.slice(0,f);i=i.slice(f+2);for(let y of g.split(`
`)){let b=y.match(/^data:\s*(.*)$/);if(!b)continue;let h=b[1].trim();if(!(!h||h==="[DONE]"))try{let w=JSON.parse(h).choices?.[0],x=w?.delta?.content;x&&(s+=x,t.onText?.(x));let T=w?.delta?.tool_calls;if(T)for(let E of T){let C=c.get(E.index)||{id:"",name:"",args:""};E.id&&(C.id=E.id),E.function?.name&&(C.name=E.function.name),E.function?.arguments&&(C.args+=E.function.arguments),c.set(E.index,C)}w?.finish_reason&&(l=w.finish_reason)}catch{}}}}let m={role:"assistant",content:s||null};if(c.size>0&&(m.tool_calls=Array.from(c.entries()).sort(([p],[u])=>p-u).map(([,p])=>({id:p.id,type:"function",function:{name:p.name,arguments:p.args}}))),m.tool_calls&&m.tool_calls.length>0&&t.onToolUse)for(let p of m.tool_calls){let u={};try{u=JSON.parse(p.function.arguments||"{}")}catch{}t.onToolUse({type:"tool_use",id:p.id,name:p.function.name,input:u})}return vl(m,l)}async function Wd(e,t){try{return await fetch(e,t)}catch(o){let n=o.message||"network error";return new Response(n,{status:0,statusText:n})}}var Kf=L(()=>{"use strict";_t();qd()});var Gf={};j(Gf,{callClaude:()=>Wf,callClaudeRaw:()=>Hx,callClaudeText:()=>Fx,getApiKey:()=>Wr,setApiKey:()=>Vf});function Wr(){return Tf()||null}function Vf(e){Lf(e)}async function Hx(e){let t=Wr();if(!t)throw new Error("API\u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o={model:e.model||eM,max_tokens:e.maxTokens||4096,messages:e.messages};e.system&&(o.system=e.system),e.tools&&e.tools.length>0&&(o.tools=e.tools),e.stream&&(o.stream=!0);let n=0;for(;;){let r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":t,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true","content-type":"application/json"},body:JSON.stringify(o),signal:e.signal});if(r.ok)return e.stream&&r.body?await tM(r.body,e.stream):await r.json();if(r.status===429&&n<3){let i=parseFloat(r.headers.get("retry-after")||"0"),s=i>0?i*1e3:Math.min(8e3,1e3*Math.pow(2,n));await new Promise(l=>setTimeout(l,s)),n++;continue}let a="";try{let i=await r.json();i.error?.message&&(a=" \u2014 "+i.error.message)}catch{}throw new Error("Claude API\u5931\u6557: "+r.status+a)}}async function tM(e,t){let o=e.getReader(),n=new TextDecoder,r="",a=[],i={},s="end_turn";function l(c,m){if(!m)return;let p;try{p=JSON.parse(m)}catch{return}let u=p;if(c==="content_block_start"){let f=u.index,g=u.content_block;a[f]=g.type==="text"?{type:"text",text:""}:{...g},g.type==="tool_use"&&(i[f]="")}else if(c==="content_block_delta"){let f=u.index,g=u.delta,y=a[f];g.type==="text_delta"&&y&&y.type==="text"?(y.text+=g.text||"",t.onText&&t.onText(g.text||"")):g.type==="input_json_delta"&&(i[f]=(i[f]||"")+(g.partial_json||""))}else if(c==="content_block_stop"){let f=u.index,g=a[f];if(g&&g.type==="tool_use"){try{g.input=i[f]?JSON.parse(i[f]):{}}catch{g.input={}}t.onToolUse&&t.onToolUse(g)}}else if(c==="message_delta"){let f=u.delta;f?.stop_reason&&(s=f.stop_reason)}}for(;;){let{value:c,done:m}=await o.read();if(m)break;r+=n.decode(c,{stream:!0});let p;for(;(p=r.indexOf(`

`))>=0;){let u=r.slice(0,p);r=r.slice(p+2);let f="",g="";for(let y of u.split(`
`))y.startsWith("event:")?f=y.slice(6).trim():y.startsWith("data:")&&(g+=y.slice(5).trim());l(f,g)}}return{content:a.filter(Boolean),stop_reason:s}}async function Fx(e,t,o={}){return(await Hx({messages:e,system:t,model:o.model,maxTokens:o.maxTokens})).content.filter(r=>r.type==="text").map(r=>r.text).join(`
`)}var eM,Wf,vi=L(()=>{"use strict";_t();eM="claude-sonnet-4-5";Wf=Fx});var Gd={};j(Gd,{dispatchChat:()=>oM,textOf:()=>nM});async function oM(e){let t=nl();if(t==="corp"){let{corpAiChatRaw:n}=await Promise.resolve().then(()=>(qd(),qf));return n({...e,model:qr()})}if(t==="local"){let{localAiChatRaw:n}=await Promise.resolve().then(()=>(Kf(),$f));return n({...e,model:$r()})}let{callClaudeRaw:o}=await Promise.resolve().then(()=>(vi(),Gf));return o({...e,model:Ld()})}function nM(e){return e.content.filter(t=>t.type==="text").map(t=>t.text).join("")}var Yd=L(()=>{"use strict";_t()});function aM(e){let t=e.match(/\{[\s\S]*\}/);if(!t)return null;try{let o=JSON.parse(t[0]),n=typeof o.vectorQuery=="string"?o.vectorQuery.trim():"",r=Array.isArray(o.keywords)?o.keywords.filter(i=>typeof i=="string"&&i.trim().length>=2).map(i=>i.trim()).slice(0,4):[],a=o.mode==="keyword"||o.mode==="mixed"||o.mode==="semantic"?o.mode:r.length>0?"mixed":"semantic";return!n&&r.length===0?null:{vectorQuery:n||r.join(" "),keywords:r,mode:a}}catch{return null}}function iM(e){return!e||e.length===0?"":e.slice(-4).map(t=>{let o=t.role==="user"?"\u30E6\u30FC\u30B6":"\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8",n=t.role==="assistant"?300:500,r=t.content.length>n?t.content.slice(0,n)+"\u2026":t.content;return`${o}: ${r}`}).join(`
`)}async function sM(e,t,o){let{dispatchChat:n,textOf:r}=await Promise.resolve().then(()=>(Yd(),Gd)),a=await n({messages:[{role:"user",content:t}],system:e,tools:[],signal:o});return r(a)}async function Ux(e,t,o){let n=e.trim();if(!n)return Yf(n);let r=iM(t),a=r?`\u76F4\u524D\u306E\u4F1A\u8A71 (\u53E4\u3044\u9806):
${r}

---

\u4ECA\u56DE\u306E\u8CEA\u554F:
${n}`:`\u8CEA\u554F:
${n}`;try{let i=await sM(rM,a,o);return aM(i)??Yf(n)}catch{return Yf(n)}}var rM,Yf,zx=L(()=>{"use strict";rM=["\u3042\u306A\u305F\u306F\u793E\u5185\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8 RAG \u691C\u7D22\u306E\u30AF\u30A8\u30EA\u30EB\u30FC\u30BF\u3067\u3059\u3002\u30E6\u30FC\u30B6\u306E\u8CEA\u554F\u3092\u89E3\u6790\u3057\u3001","\u6B21\u306E JSON \u3092 1 \u884C\u3067\u8FD4\u3057\u3066\u304F\u3060\u3055\u3044 (\u305D\u308C\u4EE5\u5916\u306E\u51FA\u529B\u306F\u7981\u6B62):","",'{"mode":"keyword|semantic|mixed","vectorQuery":"<\u610F\u5473\u691C\u7D22\u7528\u306E\u30AF\u30A8\u30EA>","keywords":["<\u5FC5\u9808\u5B8C\u5168\u4E00\u81F4>", ...]}',"","\u30EB\u30FC\u30EB:","- keywords \u306B\u306F\u300C\u30C1\u30B1\u30C3\u30C8ID / \u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u30B3\u30FC\u30C9 / \u88FD\u54C1\u540D / \u56FA\u6709\u540D\u8A5E / \u578B\u756A / \u65E5\u4ED8\u6307\u5B9A\u300D\u7B49\u306E","  \u5FC5\u305A\u542B\u307E\u308C\u308B\u3079\u304D\u6587\u5B57\u5217\u3060\u3051\u3092\u5165\u308C\u308B (2 \u6587\u5B57\u4EE5\u4E0A\u3001\u6700\u5927 4 \u500B\u307E\u3067)\u3002",'- \u6570\u5B57\u5358\u4F53 (\u4F8B: "2026" "100") \u3084\u3088\u304F\u3042\u308B\u5358\u8A9E (\u4F8B: "\u30E1\u30E2" "\u4EF6" "\u306B\u3064\u3044\u3066" "\u3068\u306F") \u306F keywords \u306B\u5165\u308C\u306A\u3044\u3002',"- vectorQuery \u306B\u306F\u8CEA\u554F\u306E\u300C\u610F\u5473\u7684\u306A\u4E3B\u984C\u300D\u3092 1 \u6587\u3067\u8868\u3059\u3002\u5143\u306E\u6587\u304C\u305D\u306E\u307E\u307E\u4F7F\u3048\u308B\u306A\u3089\u305D\u308C\u3067\u3088\u3044\u3002","  ID/\u56FA\u6709\u540D\u8A5E\u306F keywords \u5074\u306B\u51FA\u3059\u306E\u3067 vectorQuery \u306B\u306F\u542B\u3081\u306A\u304F\u3066\u3082\u3088\u3044\u3002",'- \u7D14\u7C8B\u306B ID/\u30B3\u30FC\u30C9/\u56FA\u6709\u540D\u8A5E\u3060\u3051\u3067\u63A2\u3059\u8CEA\u554F \u2192 mode="keyword"\u3002\u610F\u5473\u3067\u63A2\u3059 \u2192 "semantic"\u3002\u4E21\u65B9\u6DF7\u5728 \u2192 "mixed"\u3002',"","\u2605 \u30D5\u30A9\u30ED\u30FC\u30A2\u30C3\u30D7\u8CEA\u554F (\u76F4\u524D\u4F1A\u8A71\u3092\u8E0F\u307E\u3048\u305F\u7701\u7565\u8868\u73FE) \u306E\u89E3\u6C7A \u2605","- \u300C\u76F4\u524D\u306E\u4F1A\u8A71\u300D\u304C\u4E0E\u3048\u3089\u308C\u305F\u5834\u5408\u3001\u8CEA\u554F\u306B\u542B\u307E\u308C\u308B\u6307\u793A\u8A9E (\u305D\u308C/\u3042\u308C/\u3053\u306E/\u4E0A\u8A18 \u7B49) \u3084\u3001","  \u300C\u8981\u7D04\u3057\u3066\u300D\u300C\u3082\u3063\u3068\u8A73\u3057\u304F\u300D\u300C\u7D9A\u304D\u306F?\u300D\u306E\u3088\u3046\u306A\u524D\u63D0\u304C\u7701\u7565\u3055\u308C\u305F\u8CEA\u554F\u306F\u3001","  \u76F4\u524D\u4F1A\u8A71\u304B\u3089\u4E3B\u984C\u3092\u88DC\u3063\u3066 vectorQuery \u3092\u7D44\u307F\u7ACB\u3066\u308B\u3053\u3068\u3002",'  \u4F8B: \u76F4\u524D user="BERT \u3068\u306F?" / \u4ECA\u56DE user="\u305D\u306E\u6B20\u70B9\u306F?"','      \u2192 vectorQuery="BERT \u306E\u6B20\u70B9", keywords=["BERT"]',"- \u76F4\u524D\u4F1A\u8A71\u3068\u7121\u95A2\u4FC2\u306A\u65B0\u898F\u8CEA\u554F\u306E\u5834\u5408\u306F\u3001\u5C65\u6B74\u3092\u7121\u8996\u3057\u3066\u305D\u306E\u8CEA\u554F\u3060\u3051\u3092\u89E3\u6790\u3059\u308B\u3002","","- \u51FA\u529B\u306F\u53B3\u5BC6\u306B\u6709\u52B9\u306A JSON\u3002\u524D\u5F8C\u306B\u8AAC\u660E\u6587\u3084 ``` \u7B49\u306E\u88C5\u98FE\u306F\u4ED8\u3051\u306A\u3044\u3002"].join(`
`),Yf=e=>({vectorQuery:e,keywords:[],mode:"semantic"})});function qx(e){let t=(e||"").toLowerCase().replace(/\s+/g," ").trim(),o=new Set;for(let n=0;n<t.length-1;n++)o.add(t.slice(n,n+2));return o}function lM(e,t){if(e.size===0)return 0;let o=0;for(let n of e)t.has(n)&&o++;return o/e.size}function Kx(){let e=Ca.get().trim().replace(/^\/+|\/+$/g,"");return e?Zo.replace(/\/+$/,"")+"/"+e:null}async function Vx(e=!1){let t=Kx();if(!t)return Wn=new Map,Xd=null,0;if(!e&&Xd===t)return Wn.size;let o=await fi(t+"/manifest.json").catch(()=>null);if(!o)return Wn=new Map,Xd=t,0;let n;try{n=JSON.parse(o)}catch{return 0}let r=[...n.sealed||[]];n.open?.id&&r.push(n.open.id);let a=[];for(let l of r){let c=await fi(t+"/"+l+".json").catch(()=>null);if(c)try{let m=JSON.parse(c);Array.isArray(m.records)&&a.push(...m.records)}catch{}}a.sort((l,c)=>l.seq-c.seq);let i=new Map,s=new Map;for(let l of a){if(!l.messageId)continue;let c=l.messageId+"#"+(l.chunkIdx??0);if(!((s.get(c)??0)>=l.seq)){if(s.set(c,l.seq),l.op==="delete"){i.delete(c);continue}l.emb&&i.set(c,{key:c,messageId:l.messageId,kind:l.kind||"mail",subject:l.subject||"",from:l.from||"",date:l.date||"",body:l.body||"",internetMessageId:l.internetMessageId,docPath:l.docPath,pptxFile:l.pptxFile,pptxServerRelUrl:l.pptxServerRelUrl,slideNo:l.slideNo,slideTitle:l.slideTitle,vec:ui(Bd(l.emb))})}}return Wn=i,Xd=t,i.size}function Wx(){let e={mail:0,onenote:0,doc:0,pptx:0,transcript:0};for(let t of Wn.values())e[t.kind]=(e[t.kind]||0)+1;return{total:Wn.size,byKind:e,enabled:!!Kx()}}function Gx(e,t,o,n="",r=0){if(jx=0,Wn.size===0||o.size===0)return[];let a=ui(e),i=a.length,l=r>0&&n.trim().length>0?qx(n):null,c=Math.min(1,Math.max(0,r)),m=[];for(let p of Wn.values()){if(!o.has(p.kind))continue;if(p.vec.length!==i){jx++;continue}let u=0;for(let y=0;y<i;y++)u+=a[y]*p.vec[y];let f=Math.max(0,u),g=l?(1-c)*f+c*lM(l,qx(`${p.subject} ${p.body}`)):f;m.push({doc:p,score:g})}return m.sort((p,u)=>u.score-p.score),m.slice(0,t)}var $x,Wn,Xd,jx,Yx=L(()=>{"use strict";Dd();Of();Fe();be();$x=["mail","onenote","doc","pptx","transcript"],Wn=new Map,Xd=null,jx=0});function cM(){let e=Aa.get().split(",").map(o=>o.trim()).filter(Boolean);return new Set(e.filter(o=>$x.includes(o)))}async function Jf(){await Promise.all([gi().init(),hi().init(),Vx().catch(()=>0)])}function Jd(){let e=Wx();return{org:gi().stats(),user:hi().stats(),extvec:{docs:e.total,enabled:e.enabled}}}async function Xx(e,t){let o=[],n=await gi().refresh(e,(s,l)=>t?.({scope:"org",done:s,total:l})).catch(s=>{let l=s.message;return console.warn("[rag] org refresh:",l),o.push("\u7D44\u7E54: "+l),{changed:0,skipped:void 0,docs:0}}),r=await hi().refresh(e,(s,l)=>t?.({scope:"user",done:s,total:l})).catch(s=>{let l=s.message;return console.warn("[rag] user refresh:",l),o.push("\u500B\u4EBA: "+l),{changed:0,docs:0}}),a=n.docs??0,i=r.docs??0;return{org:n.changed,user:r.changed,orgSkipped:n.skipped==="not-writer",docsSeen:a+i,orgDocs:a,userDocs:i,errors:o}}async function Jx(e,t={}){if(!e.trim())return[];if(!il())throw new Error("RAG \u672A\u8A2D\u5B9A: AI \u8A2D\u5B9A\u3067 OpenAI \u4E92\u63DB / \u30ED\u30FC\u30AB\u30EB AI \u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044");await Jf();let o=t.topK??Cf(),n=t.minScore??Af(),r=await Ux(e,t.history,t.signal),a=r.vectorQuery||e,i=await gx(a,t.signal),l=[...gi().search(i,o*2,a,Xf,r.keywords),...hi().search(i,o*2,a,Xf,r.keywords)].map(m=>({docKey:m.record.docKey,appPageId:Bs(m.record.docKey),scope:m.record.scope,title:m.record.title,heading:m.record.heading,snippet:m.record.text.slice(0,280),chunkIdx:m.record.chunkIdx,score:m.score})),c=cM();if(c.size)for(let m of Gx(i,o*2,c,a,Xf)){let p=m.doc,u=p.subject||p.pptxFile||p.slideTitle||p.docPath||"(\u7121\u984C)";l.push({docKey:"extvec:"+p.messageId,appPageId:"",scope:"extvec",title:u,heading:p.kind==="pptx"&&p.slideNo?`\u30B9\u30E9\u30A4\u30C9 ${p.slideNo}`:void 0,snippet:(p.body||"").slice(0,280),chunkIdx:0,score:m.score,kind:p.kind,from:p.from,date:p.date,imid:p.internetMessageId,body:p.body})}return l.sort((m,p)=>p.score-m.score),l.filter(m=>m.score>=n).slice(0,o)}var Xf,Zx=L(()=>{"use strict";V();_t();Cd();zf();zx();Yx();be();Xf=.25});var kl={};j(kl,{attachXChat:()=>eg,closeXChat:()=>Qf,hideSearchTab:()=>gM,isXChatOpen:()=>em,newSearchId:()=>pM,openXChat:()=>aw,searchSessionTitle:()=>uM,showSearchTab:()=>fM,toggleXChat:()=>mM});function ow(e){if(e.scope==="org")return"\u7D44\u7E54";if(e.scope==="user")return"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8";switch(e.kind){case"mail":return"\u30E1\u30FC\u30EB";case"onenote":return"OneNote";case"pptx":return"PPTX";case"transcript":return"\u6587\u5B57\u8D77\u3053\u3057";case"doc":return"\u6587\u66F8";default:return"外部ベクトル"}}function tm(){if(!Qx){Qx=!0;try{let e=Lc.get(),t=e?JSON.parse(e):[];Ho=Array.isArray(t)?t:[]}catch{Ho=[]}}}function nw(){try{Lc.set(JSON.stringify(Ho.slice(0,dM)))}catch{}}function Zf(){return"x-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function yl(){return Ho.find(e=>e.id===Oo)??null}function rw(){Oo=Zf(),xl(),wi(),Qd(),wl()}function Se(e){return document.getElementById(e)}function wl(){Se("memola-xchat-input")?.focus()}function em(){return Se("memola-xchat")?.classList.contains("on")??!1}function aw(){tm();let e=Se("memola-xchat");e&&(Gr(),e.classList.add("on"),e.setAttribute("aria-hidden","false"),Sc.set("1"),Oo?(xl(),wi()):rw(),wl(),om(),window.addEventListener("resize",Gr))}function Qf(){let e=Se("memola-xchat");e&&(e.classList.remove("on"),e.setAttribute("aria-hidden","true"),Sc.set(""),window.removeEventListener("resize",Gr))}function mM(){em()?Qf():aw()}function Gr(){let e=Se("memola-xchat");if(!e)return;let t=Se("memola-content-row");if(t){let o=t.getBoundingClientRect();e.style.top=o.top+"px",e.style.left=o.left+"px",e.style.right="0",e.style.bottom="0"}else{let o=Se("memola-sb");e.style.left=Math.max(0,o?o.getBoundingClientRect().right:280)+"px"}}function pM(){return Zf()}function uM(e){tm();let t=Ho.find(o=>o.id===e);return t&&t.turns.length&&t.title||"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8"}function fM(e){tm();let t=Se("memola-xchat");t&&(Oo=e,t.classList.add("on"),t.setAttribute("aria-hidden","false"),Gr(),xl(),wi(),wl(),om(),window.removeEventListener("resize",Gr),window.addEventListener("resize",Gr))}function gM(){let e=Se("memola-xchat");e&&(e.classList.remove("on"),e.setAttribute("aria-hidden","true"),window.removeEventListener("resize",Gr))}function xo(e){let t=Se("memola-xchat-idx");t&&(t.textContent=e)}function hM(e=""){let{org:t,user:o,extvec:n}=Jd(),r=t.chunks+o.chunks;if(r===0&&!n.docs&&!e){xo("\u672A\u30D9\u30AF\u30C8\u30EB\u5316 \u2014 \u300C\u6587\u66F8\u3092\u8AAD\u307F\u8FBC\u307F\u300D\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044");return}let a=`${e}\u30D9\u30AF\u30C8\u30EB\u5316\u6E08: \u7D44\u7E54 ${t.docs}\u6587\u66F8 / \u500B\u4EBA ${o.docs}\u6587\u66F8 \u30FB\u8A08 ${r} \u30C1\u30E3\u30F3\u30AF`;n.enabled&&(a+=` \u30FB外部ベクトル ${n.docs}\u4EF6`),xo(a)}function om(e=!1){if(xi&&!e)return xi;let t=Se("memola-xchat-rebuild");return xi=(async()=>{if(!il()){xo("\u26A0 \u57CB\u3081\u8FBC\u307F\u672A\u8A2D\u5B9A \u2014 \u8A2D\u5B9A\u2192AI\u3067\u69CB\u6210");return}t?.classList.add("spin");try{xo("\u30A4\u30F3\u30C7\u30C3\u30AF\u30B9\u8AAD\u8FBC\u4E2D\u2026"),await Jf(),hM("\u73FE\u5728\u306E");let o=await Xx(void 0,s=>{let l=s.scope==="org"?"\u7D44\u7E54":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8";xo(`${l}\u3092\u30D9\u30AF\u30C8\u30EB\u5316\u4E2D\u2026 ${s.done}/${s.total} \u30C1\u30E3\u30F3\u30AF`)});console.log("[xchat] refresh result",o,Jd());let n=o.org+o.user;if(o.errors.length){xo("\u30A8\u30E9\u30FC: "+o.errors.join(" / "));return}let r=Jd(),a=r.org.chunks+r.user.chunks,i=`\u5BFE\u8C61 \u7D44\u7E54${o.orgDocs}/\u500B\u4EBA${o.userDocs}\u6587\u66F8 \u30FB \u30D9\u30AF\u30C8\u30EB\u5316\u6E08 ${a}\u30C1\u30E3\u30F3\u30AF`;if(o.docsSeen===0){xo("\u5BFE\u8C61\u6587\u66F80\u4EF6 \u2014 "+i+" (\u30DA\u30FC\u30B8\u7121\u3057/\u6A29\u9650/\u30EA\u30B9\u30C8\u540D\u3092\u78BA\u8A8D)");return}if(n>0){xo(`\u4ECA\u56DE +${n}\u30C1\u30E3\u30F3\u30AF \u30FB `+i);return}if(o.orgSkipped){xo("\u7D44\u7E54\u306F\u5225\u5229\u7528\u8005\u304C\u66F4\u65B0\u62C5\u5F53 \u30FB "+i);return}xo((a===0?"\u672C\u6587\u306E\u3042\u308B\u6587\u66F8\u304C\u7121\u3044(\u7A7A\u30DA\u30FC\u30B8\u306F\u5BFE\u8C61\u5916) \u30FB ":"\u5909\u66F4\u306A\u3057 \u30FB ")+i)}catch(o){xo("\u7D22\u5F15\u30A8\u30E9\u30FC: "+o.message)}finally{t?.classList.remove("spin")}})(),xi}async function bM(){xi||om();try{await xi}catch{}}function vM(e){let t=new Date(e),o=new Date;return t.getFullYear()===o.getFullYear()&&t.getMonth()===o.getMonth()&&t.getDate()===o.getDate()?"\u4ECA\u65E5":o.getTime()-e<30*864e5?"\u904E\u53BB30\u65E5\u9593":"\u53E4\u3044"}function iw(){let e=Se("memola-xchat-hist-list");if(e){if(e.textContent="",Ho.length===0){let t=document.createElement("div");t.className="tdr-hist-empty",t.textContent="\u5C65\u6B74\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093",e.appendChild(t);return}for(let t of["\u4ECA\u65E5","\u904E\u53BB30\u65E5\u9593","\u53E4\u3044"]){let o=Ho.filter(r=>vM(r.created)===t);if(!o.length)continue;let n=document.createElement("div");n.className="tdr-hist-group",n.textContent=t,e.appendChild(n);for(let r of o){let a=document.createElement("div");a.className="tdr-hist-item"+(r.id===Oo?" is-active":""),a.dataset.sid=r.id;let i=document.createElement("span");i.className="chk",i.textContent="\u2713";let s=document.createElement("span");s.className="nm",s.textContent=r.title||"(\u7121\u984C\u306E\u30C1\u30E3\u30C3\u30C8)";let l=document.createElement("button");l.className="del",l.textContent="\xD7",l.title="\u524A\u9664",l.dataset.del=r.id,a.append(i,s,l),e.appendChild(a)}}}}function wi(){let e=Se("memola-xchat-title");if(!e)return;let t=yl();e.textContent=t&&t.turns.length?t.title||"(\u7121\u984C\u306E\u30C1\u30E3\u30C3\u30C8)":"\u65B0\u898F\u30C1\u30E3\u30C3\u30C8"}function Qd(){Se("memola-xchat-histmenu")?.classList.remove("on")}function yM(){let e=Se("memola-xchat-histmenu");e&&(e.classList.contains("on")||iw(),e.classList.toggle("on"))}function wM(e){let t=new Date(e),o=`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`,n=new Date;return t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()&&t.getDate()===n.getDate()?o:`${t.getMonth()+1}/${t.getDate()} ${o}`}function xl(){let e=Se("memola-xchat-thread");if(!e)return;e.textContent="";let t=yl();if(!t||t.turns.length===0){let o=document.createElement("div");o.className="tdr-empty",o.innerHTML='<div class="big">\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8</div><p>memola \u5185\u306E\u5168\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8 (\u7D44\u7E54 + \u81EA\u5206\u306E\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8) \u3092\u6A2A\u65AD\u3057\u3066\u8CEA\u554F\u3067\u304D\u307E\u3059\u3002</p><p style="color:var(--ink-4)">\u56DE\u7B54\u306E\u4E0B\u306B\u53C2\u7167\u3057\u305F\u30BD\u30FC\u30B9\u6587\u66F8\u304C\u51FA\u5178\u3068\u3057\u3066\u8868\u793A\u3055\u308C\u3001\u30AF\u30EA\u30C3\u30AF\u3067\u305D\u306E\u6587\u66F8\u3078\u79FB\u52D5\u3067\u304D\u307E\u3059\u3002</p>',e.appendChild(o);return}for(let o of t.turns){let{body:n}=sw(e,o.q);lw(n,o.a,o.sources,o.at)}e.scrollTop=e.scrollHeight}function sw(e,t){let o=document.createElement("div");o.className="tdr-turn";let n=document.createElement("div");n.className="tdr-q",n.textContent=t;let r=document.createElement("div");r.className="tdr-a-avatar",r.textContent="AI";let a=document.createElement("div");a.className="tdr-a-body";let i=document.createElement("div");return i.className="tdr-a",i.append(r,a),o.append(n,i),e.appendChild(o),{turnEl:o,body:a}}function lw(e,t,o,n){e.textContent="";let r=document.createElement("div");if(r.className="tdr-a-meta",n){let i=document.createElement("span");i.className="tdr-turn-time",i.textContent=wM(n),r.appendChild(i)}if(o.length){let i=document.createElement("span");i.textContent=`${o.length} \u4EF6\u53C2\u7167`,r.appendChild(i)}let a=document.createElement("div");if(a.className="tdr-answer",a.innerHTML=Po(t).replace(/\[(\d+)\]/g,(i,s)=>`<span class="cite" data-n="${s}">[${s}]</span>`),e.append(r,a),o.length){let i=new Set;for(let l of t.matchAll(/\[(\d+)\]/g))i.add(Number(l[1]));let s=kM(e,o,i);EM(a,s)}}function kM(e,t,o){let n=new Map;t.forEach((s,l)=>{let c=n.get(s.docKey);c||(c={items:[]},n.set(s.docKey,c)),c.items.push({s,n:l+1})});let r=o.size>0,a=document.createElement("div");a.className="tdr-sources-h"+(r?" collapsed":""),a.innerHTML=xM+`<span>\u53C2\u7167\u3057\u305F\u6587\u66F8 ${n.size} \u4EF6</span>`;let i=document.createElement("div");i.className="tdr-sources"+(r?" collapsed":""),a.addEventListener("click",()=>{a.classList.toggle("collapsed"),i.classList.toggle("collapsed")});for(let s of n.values())i.appendChild(IM(s.items));return e.append(a,i),i}function IM(e){let o=e.reduce((p,u)=>u.s.score>p.s.score?u:p).s,n=e.map(p=>p.n),r=document.createElement("div");r.className="tdr-hit",r.dataset.ns=n.join(" ");let a=document.createElement("div");a.className="tdr-hit-head";let i=document.createElement("span");i.className="tdr-hit-num",i.textContent=n.length===1?String(n[0]):n.join(",");let s=document.createElement("span");s.className="tdr-hit-subject",s.textContent=o.title;let l=document.createElement("span");if(l.className="tdr-hit-badge",l.textContent=ow(o),a.append(i,s,l),o.score!=null){let p=document.createElement("span");p.className="tdr-hit-score",p.textContent=o.score.toFixed(2),a.appendChild(p)}let c=document.createElement("div");c.className="tdr-hit-snippet";let m=e.length>1?`\uFF08\u4ED6 ${e.length-1} \u7B87\u6240\u304C\u8A72\u5F53\uFF09`:"";return c.textContent=(o.heading?`${o.heading} \u2014 `:"")+o.snippet+m,r.append(a,c),o.appPageId?r.addEventListener("click",()=>{TM(o.appPageId)}):r.style.cursor="default",r}function EM(e,t){e.querySelectorAll(".cite").forEach(o=>{o.addEventListener("click",n=>{n.stopPropagation();let r=o.dataset.n;if(!r)return;let a=t.querySelector(`.tdr-hit[data-ns~="${r}"]`);a&&(t.classList.remove("collapsed"),t.previousElementSibling?.classList.remove("collapsed"),a.scrollIntoView({behavior:"smooth",block:"center"}),a.classList.add("is-flash"),setTimeout(()=>a.classList.remove("is-flash"),1200))})})}async function TM(e){Qf();let{doSelect:t}=await Promise.resolve().then(()=>(K(),ie));await t(e)}function LM(e){return["\u3042\u306A\u305F\u306F\u793E\u5185\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u3067\u3059\u3002\u4EE5\u4E0B\u306E\u300C\u629C\u7C8B\u300D\u3060\u3051\u3092\u6839\u62E0\u306B\u3001\u65E5\u672C\u8A9E\u3067\u7C21\u6F54\u304B\u3064\u6B63\u78BA\u306B\u56DE\u7B54\u3057\u3066\u304F\u3060\u3055\u3044\u3002","\u629C\u7C8B\u306B\u7B54\u3048\u304C\u7121\u3044\u5834\u5408\u306F\u63A8\u6E2C\u305B\u305A\u300C\u8A72\u5F53\u3059\u308B\u8A18\u8F09\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u300D\u3068\u8FF0\u3079\u3066\u304F\u3060\u3055\u3044\u3002","\u56DE\u7B54\u4E2D\u3067\u53C2\u7167\u3057\u305F\u629C\u7C8B\u306F [1] \u306E\u3088\u3046\u306B\u756A\u53F7\u3067\u5F15\u7528\u3057\u3066\u304F\u3060\u3055\u3044\u3002","","=== \u629C\u7C8B ===",e.map((o,n)=>{let r=ow(o),a=o.scope==="extvec"&&o.body?o.body.slice(0,2e3):o.snippet,i=o.from||o.date?`
(${[o.from,o.date].filter(Boolean).join(" / ")})`:"";return`[${n+1}] \u6587\u66F8\u300C${o.title}\u300D${o.heading?` / ${o.heading}`:""} (${r})${i}
${a}`}).join(`

`)||"(\u8A72\u5F53\u3059\u308B\u6587\u66F8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F)"].join(`
`)}async function SM(e,t,o,n){let{dispatchChat:r,textOf:a}=await Promise.resolve().then(()=>(Yd(),Gd)),i=await r({messages:e,system:t,tools:[],signal:n,stream:{onText:o}});return a(i)}async function ew(){if(Zd)return;let e=Se("memola-xchat-input"),t=Se("memola-xchat-thread");if(!e||!t)return;let o=e.value.trim();if(!o)return;if(!il()){PM(t,"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8\u306B\u306F\u57CB\u3081\u8FBC\u307F\u8A2D\u5B9A\u304C\u5FC5\u8981\u3067\u3059\u3002\u8A2D\u5B9A \u2192 AI \u2192 \u57CB\u3081\u8FBC\u307F\u30D7\u30ED\u30D0\u30A4\u30C0\u3067\u300CVoyage AI\u300D(\u4E2D\u7D99\u4E0D\u8981\u30FBClaude\u4F75\u7528\u306E\u63A8\u5968) \u3092\u9078\u3093\u3067 API \u30AD\u30FC\u3092\u5165\u308C\u3066\u304F\u3060\u3055\u3044\u3002");return}e.value="",cw(e),Zd=!0,tw(!0),yi=new AbortController,(!yl()||yl().turns.length===0)&&(t.textContent="");let{body:n}=sw(t,o),r=document.createElement("div");r.className="tdr-thinking",r.innerHTML='\u30A4\u30F3\u30C7\u30C3\u30AF\u30B9\u6E96\u5099\u4E2D<span class="tdr-dot"></span><span class="tdr-dot"></span><span class="tdr-dot"></span>',n.appendChild(r),t.scrollTop=t.scrollHeight;try{await bM();let a=MM(o),i=[];for(let b of a.turns)i.push({role:"user",content:b.q},{role:"assistant",content:b.a});r.firstChild.textContent="\u30AF\u30A8\u30EA\u89E3\u6790\u30FB\u95A2\u9023\u6587\u66F8\u3092\u691C\u7D22\u4E2D";let s=await Jx(o,{signal:yi.signal,history:i}),l=[...i,{role:"user",content:o}];n.textContent="";let c=document.createElement("div");c.className="tdr-answer",n.appendChild(c);let m="",p=b=>{m+=b,c.textContent=m,t.scrollTop=t.scrollHeight},f=(await SM(l,LM(s),p,yi.signal)||m).trim()||"(\u7A7A\u306E\u5FDC\u7B54)",g=s.map(b=>({docKey:b.docKey,appPageId:b.appPageId,scope:b.scope,title:b.title,heading:b.heading,snippet:b.snippet,chunkIdx:b.chunkIdx,score:b.score,kind:b.kind,from:b.from,date:b.date,body:b.body})),y=Date.now();lw(n,f,g,y),a.turns.push({q:o,a:f,sources:g,at:y}),a.title||(a.title=o.slice(0,40)),Promise.resolve().then(()=>(Kt(),oo)).then(b=>b.updateActiveSearchTitle(a.title)),nw(),wi()}catch(a){if(a.name==="AbortError")n.textContent="";else{n.textContent="";let i=document.createElement("div");i.className="tdr-err",i.textContent="\u30A8\u30E9\u30FC: "+a.message,n.appendChild(i)}}finally{Zd=!1,yi=null,tw(!1),t.scrollTop=t.scrollHeight,wl()}}function MM(e){let t=yl();return t||(t={id:Oo||Zf(),title:e.slice(0,40),created:Date.now(),turns:[]},Oo=t.id,Ho.unshift(t)),t}function PM(e,t){let o=document.createElement("div");o.className="tdr-turn";let n=document.createElement("div");n.className="tdr-err",n.textContent=t,o.appendChild(n),e.appendChild(o),e.scrollTop=e.scrollHeight}function tw(e){let t=Se("memola-xchat-send");t&&(t.disabled=e)}function cw(e){e.style.height="auto",e.style.height=Math.min(160,e.scrollHeight)+"px"}function eg(){tm(),Se("memola-xchat-launch")?.addEventListener("click",()=>{Promise.resolve().then(()=>(Kt(),oo)).then(t=>t.newSearchTab())}),Se("memola-xchat-new")?.addEventListener("click",()=>{Promise.resolve().then(()=>(Kt(),oo)).then(t=>t.newSearchTab())}),Se("memola-xchat-close")?.addEventListener("click",()=>{Promise.resolve().then(()=>(Kt(),oo)).then(t=>{d.activeTabId&&t.closeTab(d.activeTabId)})}),Se("memola-xchat-rebuild")?.addEventListener("click",()=>{om(!0)}),Se("memola-xchat-send")?.addEventListener("click",()=>{ew()});let e=Se("memola-xchat-input");e?.addEventListener("input",()=>cw(e)),e?.addEventListener("keydown",t=>{t.key==="Enter"&&!t.shiftKey&&!t.isComposing&&t.keyCode!==229&&(t.preventDefault(),ew())}),Se("memola-xchat-titlebtn")?.addEventListener("click",t=>{t.stopPropagation(),yM()}),document.addEventListener("click",t=>{let o=Se("memola-xchat-histmenu");if(!o||!o.classList.contains("on"))return;let n=t.target;o.contains(n)||Se("memola-xchat-titlebtn")?.contains(n)||Qd()}),Se("memola-xchat-hist-list")?.addEventListener("click",t=>{let o=t.target,n=o.dataset.del;if(n){t.stopPropagation(),Ho=Ho.filter(i=>i.id!==n),Oo===n&&(Oo="",rw()),nw(),iw(),xl(),wi();return}let a=o.closest(".tdr-hist-item")?.dataset.sid;a&&(Oo=a,xl(),wi(),Qd(),wl(),Promise.resolve().then(()=>(Kt(),oo)).then(i=>i.openSearchSessionInActiveTab(a)))}),document.addEventListener("keydown",t=>{if(t.key==="Escape"&&em()&&Se("memola-xchat-histmenu")?.classList.contains("on")){t.stopPropagation(),Qd();return}},!0),document.addEventListener("keydown",t=>{t.key==="Escape"&&em()&&Zd&&yi&&(t.stopPropagation(),yi.abort())},!0)}var dM,Ho,Oo,yi,Zd,Qx,xi,xM,ki=L(()=>{"use strict";q();rn();be();Zx();Cd();dM=50,Ho=[],Oo="",yi=null,Zd=!1,Qx=!1,xi=null;xM='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'});var oo={};j(oo,{activateTab:()=>rm,attachTabs:()=>tg,closeTab:()=>pw,newSearchTab:()=>RM,newTab:()=>nm,openInActiveTab:()=>BM,openPageInNewTab:()=>_M,openRowInActiveTab:()=>DM,openSearchSessionInActiveTab:()=>NM,renderTabs:()=>et,restoreTabs:()=>HM,setTabNavInPlace:()=>AM,updateActiveSearchTitle:()=>OM});function Gn(){return"t"+Date.now().toString(36)+(CM++).toString(36)}function Il(){return d.tabs.find(e=>e.tabId===d.activeTabId)}function bn(e){if(!e)return;let t=hn.indexOf(e);t>=0&&hn.splice(t,1),hn.push(e)}function dw(e){if(e.kind==="search")return e.title||"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8";if(e.kind==="row")return e.title||"\u7121\u984C";if(e.pageId){let t=B(e.pageId);if(t)return t.title||"\u7121\u984C"}return e.title||"\u65B0\u898F\u30BF\u30D6"}function pt(){let e=ms.get();e[W]={tabs:d.tabs,active:d.activeTabId},ms.set(e)}function AM(e){Yr=e}function mw(e,t,o){e.kind="page",e.pageId=t,e.title=o,e.searchId=void 0,e.rowDbId=void 0,e.rowId=void 0}function BM(e,t){let o=Il();if(Yr&&o){mw(o,e,t),et(),pt();return}if(o&&o.kind==="page"&&o.pageId===e){o.title=t,et(),pt();return}if(o&&o.kind==="page"&&!o.pageId){mw(o,e,t),et(),pt();return}let n=d.tabs.find(a=>a.kind==="page"&&a.pageId===e);if(n){d.activeTabId=n.tabId,bn(n.tabId),n.title=t,et(),pt();return}let r={tabId:Gn(),kind:"page",pageId:e,title:t};d.tabs.push(r),d.activeTabId=r.tabId,bn(r.tabId),et(),pt()}function DM(e,t,o){let n=s=>{s.kind="row",s.rowDbId=e,s.rowId=t,s.title=o,s.pageId=void 0,s.searchId=void 0},r=Il();if(Yr&&r){n(r),et(),pt();return}if(r&&r.kind==="row"&&r.rowId===t&&r.rowDbId===e){r.title=o,et(),pt();return}if(r&&r.kind==="page"&&!r.pageId){n(r),et(),pt();return}let a=d.tabs.find(s=>s.kind==="row"&&s.rowId===t&&s.rowDbId===e);if(a){d.activeTabId=a.tabId,bn(a.tabId),a.title=o,et(),pt();return}let i={tabId:Gn(),kind:"row",rowDbId:e,rowId:t,title:o};d.tabs.push(i),d.activeTabId=i.tabId,bn(i.tabId),et(),pt()}async function _M(e){let t={tabId:Gn(),kind:"page",pageId:void 0,title:""};d.tabs.push(t),d.activeTabId=t.tabId,bn(t.tabId);let{doSelect:o}=await Promise.resolve().then(()=>(K(),ie));await o(e)}function nm(){let e={tabId:Gn(),kind:"page",pageId:void 0,title:"\u65B0\u898F\u30BF\u30D6"};d.tabs.push(e),d.activeTabId=e.tabId,bn(e.tabId),et(),pt(),Promise.resolve().then(()=>(K(),ie)).then(t=>t.showView("empty"))}async function rm(e){let t=d.tabs.find(n=>n.tabId===e);if(!t)return;d.activeTabId=e,bn(e),et(),pt();let o=await Promise.resolve().then(()=>(ki(),kl));if(t.kind==="search"){o.showSearchTab(t.searchId||o.newSearchId());return}if(t.kind==="row"){if(o.hideSearchTab(),t.rowDbId&&t.rowId!=null){Yr=!0;try{let{doSelect:n}=await Promise.resolve().then(()=>(K(),ie));await n(t.rowDbId);let r=d.dbItems.find(a=>a.Id===t.rowId);r&&await(await Promise.resolve().then(()=>(Uo(),Fo))).openRowAsPage(t.rowDbId,r)}finally{Yr=!1}}return}if(o.hideSearchTab(),t.pageId){Yr=!0;try{let{doSelect:n}=await Promise.resolve().then(()=>(K(),ie));await n(t.pageId)}finally{Yr=!1}}else Promise.resolve().then(()=>(K(),ie)).then(n=>n.showView("empty"))}async function RM(){let e=await Promise.resolve().then(()=>(ki(),kl)),t=e.newSearchId(),o={tabId:Gn(),kind:"search",searchId:t,title:"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8"};d.tabs.push(o),d.activeTabId=o.tabId,bn(o.tabId),et(),pt(),e.showSearchTab(t)}async function NM(e){let t=Il(),o=await Promise.resolve().then(()=>(ki(),kl));t&&t.kind==="search"&&(t.searchId=e,t.title=o.searchSessionTitle(e)),et(),pt(),o.showSearchTab(e)}function OM(e){let t=Il();t&&t.kind==="search"&&(t.title=e||"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8",et(),pt())}async function pw(e){let t=d.tabs.findIndex(a=>a.tabId===e);if(t<0)return;let o=d.tabs[t].tabId===d.activeTabId;d.tabs.splice(t,1);let n=hn.indexOf(e);if(n>=0&&hn.splice(n,1),!o){et(),pt();return}let r=null;for(let a=hn.length-1;a>=0;a--)if(d.tabs.some(i=>i.tabId===hn[a])){r=hn[a];break}!r&&d.tabs.length&&(r=d.tabs[d.tabs.length-1].tabId),d.activeTabId=r,r?await rm(r):nm()}function et(){let e=document.getElementById("memola-tabstrip");if(!e)return;e.textContent="";for(let o of d.tabs){let n=document.createElement("div");n.className="memola-tab"+(o.tabId===d.activeTabId?" on":""),n.dataset.tabId=o.tabId,n.draggable=!0,n.title=dw(o);let r=document.createElement("span");if(r.className="memola-tab-ic",o.kind==="search")r.innerHTML=$.chat;else if(o.kind==="row")r.textContent="\u{1F4C4}";else{let s=o.pageId?B(o.pageId):null;r.textContent=s?.icon||(s?.type==="database"?"\u{1F5C2}":"\u{1F4C4}")}let a=document.createElement("span");a.className="memola-tab-lbl",a.textContent=dw(o);let i=document.createElement("button");i.className="memola-tab-x",i.textContent="\xD7",i.title="\u9589\u3058\u308B",i.dataset.close=o.tabId,n.append(r,a,i),e.appendChild(n)}let t=document.createElement("button");t.className="memola-tab-newbtn",t.dataset.new="1",t.title="\u65B0\u3057\u3044\u30BF\u30D6",t.innerHTML=$.plus,e.appendChild(t)}async function HM(e){let t=ms.get()[W],n=(t?.tabs||[]).filter(r=>r&&(r.kind==="page"&&r.pageId&&B(r.pageId)||r.kind==="search"&&r.searchId||r.kind==="row"&&r.rowDbId&&B(r.rowDbId)&&r.rowId!=null));if(n.length){d.tabs=n.map(i=>i.kind==="search"?{tabId:i.tabId||Gn(),kind:"search",searchId:i.searchId,title:i.title||"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8"}:i.kind==="row"?{tabId:i.tabId||Gn(),kind:"row",rowDbId:i.rowDbId,rowId:i.rowId,title:i.title||"\u7121\u984C"}:{tabId:i.tabId||Gn(),kind:"page",pageId:i.pageId,title:i.title||""});let r=d.tabs.some(i=>i.tabId===t?.active);d.activeTabId=r?t.active:d.tabs[0].tabId,hn=d.tabs.map(i=>i.tabId),bn(d.activeTabId),et();let a=Il();a&&await rm(a.tabId);return}if(d.tabs=[],d.activeTabId=null,e){let{doSelect:r}=await Promise.resolve().then(()=>(K(),ie));await r(e)}else nm()}function tg(){let e=document.getElementById("memola-tabstrip");e?.addEventListener("click",o=>{let n=o.target;if(n.closest("[data-new]")){nm();return}let r=n.dataset.close;if(r){o.stopPropagation(),pw(r);return}let a=n.closest(".memola-tab");a?.dataset.tabId&&rm(a.dataset.tabId)});let t=null;e?.addEventListener("dragstart",o=>{let n=o.target.closest(".memola-tab");n?.dataset.tabId&&(t=n.dataset.tabId,o.dataTransfer?.setData("text/plain",t),o.dataTransfer&&(o.dataTransfer.effectAllowed="move"),n.classList.add("dragging"))}),e?.addEventListener("dragover",o=>{t&&(o.preventDefault(),o.dataTransfer&&(o.dataTransfer.dropEffect="move"))}),e?.addEventListener("drop",o=>{if(!t)return;o.preventDefault();let n=d.tabs.findIndex(s=>s.tabId===t);if(n<0){t=null;return}let r=o.target.closest(".memola-tab"),a;if(r?.dataset.tabId&&r.dataset.tabId!==t){a=d.tabs.findIndex(l=>l.tabId===r.dataset.tabId);let s=r.getBoundingClientRect();o.clientX>s.left+s.width/2&&a++}else a=d.tabs.length;let[i]=d.tabs.splice(n,1);n<a&&a--,d.tabs.splice(Math.max(0,Math.min(a,d.tabs.length)),0,i),t=null,et(),pt()}),e?.addEventListener("dragend",()=>{t=null,e.querySelectorAll(".memola-tab.dragging").forEach(o=>o.classList.remove("dragging"))})}var CM,hn,Yr,Kt=L(()=>{"use strict";q();we();be();Fe();xr();CM=0;hn=[];Yr=!1});function am(e){let t=document.createElement("div");return t.id=e.id,t.draggable=!0,t.title=e.title,t.innerHTML=FM,t.addEventListener("dragstart",e.onDragStart),t.addEventListener("dragend",e.onDragEnd),e.onMouseLeave&&t.addEventListener("mouseleave",e.onMouseLeave),(e.container||document.getElementById("memola-overlay")||document.body).appendChild(t),{el:t,positionAt(n){let r=n.getBoundingClientRect();e.centred?(t.style.top=r.top+window.scrollY+(r.height-18)/2+"px",t.style.height="18px"):(t.style.top=r.top+window.scrollY+"px",t.style.height=Math.max(20,Math.min(r.height,32))+"px"),t.style.left=r.left+window.scrollX-24+"px",t.style.display="flex"},hide(){t.style.display="none"},isCursorOnHandle(n,r,a=2){if(t.style.display==="none")return!1;let i=t.getBoundingClientRect();return n>=i.left-a&&n<=i.right+a&&r>=i.top-a&&r<=i.bottom+a}}}function im(e,t,o,n=44,r=2){let a=e.getBoundingClientRect();return o>=a.top-r&&o<=a.bottom+r&&t>=a.left-n&&t<=a.right}var FM,og=L(()=>{"use strict";FM='<svg viewBox="0 0 10 16" width="10" height="16" fill="currentColor" style="pointer-events:none"><circle cx="2" cy="3" r="1.3"/><circle cx="2" cy="8" r="1.3"/><circle cx="2" cy="13" r="1.3"/><circle cx="8" cy="3" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="8" cy="13" r="1.3"/></svg>'});var yw={};j(yw,{attachLibrary:()=>ng,openLibrary:()=>vw});async function vw(){d.currentType!=="database"&&await xt().catch(()=>{}),Jn(),d.currentRow=null,d.currentId=null,d.currentType="page",lm="",at.clear(),te(),ag("library"),Tl([{label:"\u{1F4DA} \u30E9\u30A4\u30D6\u30E9\u30EA"}]),tt("library"),zM(),zo(),UM().then(()=>{d.currentId===null&&document.getElementById("memola-lib-tbody")&&zo()})}async function UM(){let e=[ce],t=Qt();t!==ce&&e.push(t);let o=new Map;for(let n of e){let r=J(n,"/items?$select=Id,Modified,Editor/Title&$expand=Editor&$top=500&$orderby=Id"),a=0;for(;r&&a++<20;){let i=await ne(r).catch(()=>null);if(!i)break;for(let s of i.results)o.set(Sr(n,s.Id),{modified:s.Modified||"",editor:s.Editor?.Title||""});r=i.__next}}bw=o}function uw(e){let t=n=>!n.IsDraft&&!B(n.Id)?.isTemplate&&(B(n.Id)?.scope==="org"?"org":"user")===El,o=new Set(d.pages.filter(t).map(n=>n.Id));return d.pages.filter(n=>t(n)?(n.ParentId&&o.has(n.ParentId)?n.ParentId:"")===e:!1).sort((n,r)=>(n.Title||"\u7121\u984C").localeCompare(r.Title||"\u7121\u984C","ja"))}function zM(){let e=I("lib");e.innerHTML='<div class="memola-lib-inner"><div class="memola-lib-hd"><span class="memola-lib-icon">\u{1F4DA}</span><h1 class="memola-lib-title">\u30E9\u30A4\u30D6\u30E9\u30EA</h1></div><div class="memola-lib-tabs"><button class="memola-lib-tab" data-scope="user">\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8</button><button class="memola-lib-tab" data-scope="org">\u{1F310} \u7D44\u7E54</button></div><div class="memola-lib-tb"><input id="memola-lib-search" class="memola-lib-search" type="text" placeholder="\u30DA\u30FC\u30B8\u3092\u691C\u7D22\u2026" value="'+P(lm)+'"><span class="memola-lib-count" id="memola-lib-count"></span></div><table class="memola-lib-table" id="memola-lib-dt"><thead><tr><th class="memola-th-cb"><input type="checkbox" class="memola-cb" id="memola-lib-cb-all" title="\u3059\u3079\u3066\u9078\u629E"></th><th>\u30BF\u30A4\u30C8\u30EB</th><th>\u7A2E\u5225</th><th>\u66F4\u65B0\u8005</th><th>\u66F4\u65B0\u65E5</th></tr></thead><tbody id="memola-lib-tbody"></tbody></table></div>',e.querySelectorAll(".memola-lib-tab").forEach(o=>{o.dataset.scope===El&&o.classList.add("on"),o.addEventListener("click",()=>{El=o.dataset.scope||"user",at.clear(),e.querySelectorAll(".memola-lib-tab").forEach(n=>n.classList.toggle("on",n.dataset.scope===El)),zo()})});let t=document.getElementById("memola-lib-search");t?.addEventListener("input",()=>{lm=t.value,zo()}),document.getElementById("memola-lib-cb-all")?.addEventListener("change",o=>{let n=o.target.checked,r=Array.from(document.querySelectorAll("#memola-lib-tbody .memola-lib-row")).map(a=>a.dataset.pageId||"").filter(Boolean);n?r.forEach(a=>at.add(a)):r.forEach(a=>at.delete(a)),zo()})}function jM(e){if(!e)return"\u2014";let t=new Date(e);return isNaN(t.getTime())?"\u2014":t.toLocaleString("ja-JP",{year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"})}function zo(){let e=document.getElementById("memola-lib-tbody"),t=document.getElementById("memola-lib-count");if(!e)return;let o=lm.trim().toLowerCase(),n=[],r=0;if(o)d.pages.filter(i=>!i.IsDraft&&!B(i.Id)?.isTemplate&&(B(i.Id)?.scope==="org"?"org":"user")===El&&(i.Title||"\u7121\u984C").toLowerCase().includes(o)).sort((i,s)=>(i.Title||"\u7121\u984C").localeCompare(s.Title||"\u7121\u984C","ja")).forEach(i=>{n.push(gw(i,0,!1,!1)),r++});else{let a=(i,s)=>{for(let l of uw(i)){let m=uw(l.Id).length>0,p=sm.has(l.Id);n.push(gw(l,s,m,p)),r++,m&&p&&a(l.Id,s+1)}};a("",0)}t&&(t.textContent=r+" \u30DA\u30FC\u30B8"),e.innerHTML=r?n.join(""):'<tr><td colspan="5" class="memola-lib-empty">'+(o?"\u8A72\u5F53\u3059\u308B\u30DA\u30FC\u30B8\u304C\u3042\u308A\u307E\u305B\u3093":"\u3053\u306E\u30B9\u30B3\u30FC\u30D7\u306B\u30DA\u30FC\u30B8\u304C\u3042\u308A\u307E\u305B\u3093")+"</td></tr>",e.querySelectorAll(".memola-lib-tog").forEach(a=>{a.addEventListener("click",i=>{i.stopPropagation();let s=a.dataset.pageId||"";s&&(sm.has(s)?sm.delete(s):sm.add(s),zo())})}),e.querySelectorAll(".memola-cb").forEach(a=>{a.addEventListener("click",i=>i.stopPropagation()),a.addEventListener("change",()=>{let i=a.dataset.id||"";a.checked?at.add(i):at.delete(i);let s=a.closest(".memola-lib-row");s&&s.classList.toggle("memola-tr-sel",a.checked),fw()})}),e.querySelectorAll(".memola-lib-row").forEach(a=>{a.addEventListener("click",()=>{let i=a.dataset.pageId||"";i&&Ue(i)})}),fw()}function fw(){let e=document.getElementById("memola-lib-tbody"),t=document.getElementById("memola-lib-cb-all");if(e&&t){let o=Array.from(e.querySelectorAll(".memola-lib-row")).map(r=>r.dataset.pageId||"").filter(Boolean),n=o.filter(r=>at.has(r)).length;t.checked=o.length>0&&n===o.length,t.indeterminate=n>0&&n<o.length}document.getElementById("memola-lib-dt")?.classList.toggle("memola-has-sel",at.size>0),qM()}function gw(e,t,o,n){let a=B(e.Id)?.icon||(e.Type==="database"?"\u{1F5C2}":"\u{1F4C4}"),i=bw.get(e.Id),s=o?'<span class="memola-lib-tog" data-page-id="'+P(e.Id)+'">'+(n?"\u25BE":"\u25B8")+"</span>":'<span class="memola-lib-tog-sp"></span>',l="padding-left:"+(8+t*18)+"px;",c=at.has(e.Id);return'<tr class="memola-lib-row'+(c?" memola-tr-sel":"")+'" data-page-id="'+P(e.Id)+'"><td class="memola-td-cb"><input type="checkbox" class="memola-cb" data-id="'+P(e.Id)+'"'+(c?" checked":"")+'></td><td class="memola-lib-c-title" style="'+l+'">'+s+'<span class="memola-lib-c-ic">'+P(a)+'</span><a class="memola-lib-link">'+P(e.Title||"\u7121\u984C")+"</a></td><td>"+(e.Type==="database"?"\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9":"\u30DA\u30FC\u30B8")+'</td><td class="memola-lib-c-editor">'+P(i?.editor||"\u2014")+'</td><td class="memola-lib-c-date">'+P(i?jM(i.modified):"\u2026")+"</td></tr>"}function qM(){let e=document.getElementById("memola-lib-bulkbar"),t=at.size;if(t===0){e&&e.classList.remove("on");return}e||(e=document.createElement("div"),e.id="memola-lib-bulkbar",e.className="memola-db-bulkbar",e.innerHTML='<span class="memola-db-bulkbar-count"></span><button class="memola-db-bulkbar-btn" data-act="dup">\u8907\u88FD</button><button class="memola-db-bulkbar-btn danger" data-act="del">\u524A\u9664</button><button class="memola-db-bulkbar-btn ghost" data-act="clr">\u89E3\u9664</button>',(document.getElementById("memola-overlay")||document.body).appendChild(e),e.addEventListener("click",n=>{let r=n.target.closest("[data-act]")?.dataset.act;r==="dup"?$M():r==="del"?KM():r==="clr"&&(at.clear(),zo())}));let o=e.querySelector(".memola-db-bulkbar-count");o&&(o.textContent=t+" \u4EF6\u9078\u629E"),e.classList.add("on")}async function $M(){let e=Array.from(at);if(e.length===0)return;_(!0,"\u8907\u88FD\u4E2D...");let t=0,o=[];try{let n=await Promise.resolve().then(()=>(V(),$e)),r=await Promise.resolve().then(()=>(qe(),Ct));for(let a of e){let i=B(a);try{i?.type==="database"?await r.duplicateDb(a,{asTemplate:!1}):await n.apiDuplicatePage(a),t++}catch(s){o.push(s.message)}}at.clear(),te(),zo(),t&&k(t+" \u4EF6\u8907\u88FD\u3057\u307E\u3057\u305F"),o.length&&k("\u4E00\u90E8\u8907\u88FD\u5931\u6557: "+o[0],"err")}finally{_(!1)}}async function KM(){let e=Array.from(at);if(e.length===0||!confirm(e.length+" \u4EF6\u3092\u524A\u9664(\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5)\u3057\u307E\u3059\u304B?"))return;_(!0,"\u524A\u9664\u4E2D...");let t=0,o=[];try{let n=await Promise.resolve().then(()=>(V(),$e));for(let r of e)try{await n.apiTrashPage(r),t++}catch(a){o.push(a.message)}at.clear(),te(),zo(),t&&k(t+" \u4EF6\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u30B4\u30DF\u7BB1\u304B\u3089\u5FA9\u5143\u53EF\u80FD\uFF09"),o.length&&k("\u4E00\u90E8\u524A\u9664\u5931\u6557: "+o[0],"err")}finally{_(!1)}}function VM(){let e=document.getElementById("memola-lib");return!!e&&getComputedStyle(e).display!=="none"}function WM(){return wo||(wo=am({id:"memola-lib-row-handle",title:"\u30AF\u30EA\u30C3\u30AF\u3067\u9078\u629E",centred:!0,onDragStart:e=>e.preventDefault(),onDragEnd:()=>{},onMouseLeave:e=>{let t=e.relatedTarget;t&&Yn&&Yn.contains(t)||(wo?.hide(),Yn=null)}}),wo.el.addEventListener("click",()=>{let e=Yn?.dataset.pageId||"";e&&(at.has(e)?at.delete(e):at.add(e),zo())}),wo)}function GM(){hw||(hw=!0,document.addEventListener("mousemove",e=>{if(!VM()){wo?.hide(),Yn=null;return}if(wo&&wo.isCursorOnHandle(e.clientX,e.clientY))return;let t=document.getElementById("memola-lib-tbody");if(!t){wo?.hide();return}let o=null;for(let n of Array.from(t.querySelectorAll(".memola-lib-row")))if(im(n,e.clientX,e.clientY)){o=n;break}o?o!==Yn&&(Yn=o,WM().positionAt(o)):(wo?.hide(),Yn=null)}))}function ng(){document.getElementById("memola-sb-library")?.addEventListener("click",()=>{vw()}),GM()}var lm,El,sm,at,bw,wo,Yn,hw,rg=L(()=>{"use strict";q();me();K();_e();Xn();Xr();bt();we();Re();le();V();Lt();og();lm="",El="user",sm=new Set,at=new Set,bw=new Map;wo=null,Yn=null,hw=!1});var Ii={};j(Ii,{canGoBack:()=>sg,canGoForward:()=>lg,goBack:()=>YM,goForward:()=>XM,pushHistory:()=>ig,pushViewHistory:()=>ag,refreshButtons:()=>Jr});function ww(e,t){return e.pageId===t.pageId&&(e.rowId||0)===(t.rowId||0)&&(e.rowList||"")===(t.rowList||"")&&(e.view||"")===(t.view||"")}function ag(e){if(cm)return;let t={pageId:"",view:e};Qe>=0&&ww(ot[Qe],t)||(Qe<ot.length-1&&ot.splice(Qe+1),ot.push(t),ot.length>xw&&ot.shift(),Qe=ot.length-1,Jr())}function ig(e,t){if(cm||!e)return;let o=t?{pageId:e,rowList:t.rowList,rowId:t.rowId}:{pageId:e};Qe>=0&&ww(ot[Qe],o)||(Qe<ot.length-1&&ot.splice(Qe+1),ot.push(o),ot.length>xw&&ot.shift(),Qe=ot.length-1,Jr())}function sg(){return Qe>0&&cg(ot[Qe-1])}function lg(){return Qe>=0&&Qe<ot.length-1&&cg(ot[Qe+1])}function cg(e){return e?e.view==="library"?!0:e.pageId?d.pages.some(t=>t.Id===e.pageId):!1:!1}async function kw(e){let t=ot[e];if(!t||!cg(t)){ot.splice(e,1),Qe>e&&Qe--,Jr();return}Qe=e,cm=!0;let o=await Promise.resolve().then(()=>(Kt(),oo));o.setTabNavInPlace(!0);try{if(t.view==="library")await(await Promise.resolve().then(()=>(rg(),yw))).openLibrary();else if(await(await Promise.resolve().then(()=>(K(),ie))).doSelect(t.pageId),t.rowId&&t.rowList){let r=d.dbItems.find(a=>a.Id===t.rowId);r&&await(await Promise.resolve().then(()=>(Uo(),Fo))).openRowAsPage(t.pageId,r)}}finally{cm=!1,o.setTabNavInPlace(!1)}Jr()}async function YM(){sg()&&await kw(Qe-1)}async function XM(){lg()&&await kw(Qe+1)}function Jr(){let e=document.getElementById("memola-nav-back"),t=document.getElementById("memola-nav-fwd");e&&(e.disabled=!sg(),e.classList.toggle("disabled",e.disabled)),t&&(t.disabled=!lg(),t.classList.toggle("disabled",t.disabled))}var xw,ot,Qe,cm,Xn=L(()=>{"use strict";q();xw=100,ot=[],Qe=-1,cm=!1});var mm={};j(mm,{renderBacklinks:()=>ZM});function JM(e){let t=B(e);return t?t.title:null}function mg(e){let t=document.getElementById(e);t&&(t.style.display="none",t.innerHTML="")}async function ZM(){let e=d.currentId,t=!!e&&d.currentType==="page"&&!d.currentRow,o=!!e&&d.currentType==="database",n=t?dm:o?dg:null;if(mg(n===dm?dg:dm),!n){mg(dm),mg(dg);return}let r=document.getElementById(n);if(!r||!e)return;r.style.display="",r.innerHTML='<div class="memola-bl-hd"><span class="memola-bl-icon">\u{1F517}</span><span class="memola-bl-title">\u30EA\u30F3\u30AF\u5143</span><span class="memola-bl-count">\u2026</span></div><div class="memola-bl-body"><div class="memola-bl-loading">\u30B9\u30AD\u30E3\u30F3\u4E2D\u2026</div></div>';let a=[];try{a=await Es(e,JM)}catch{r.querySelector(".memola-bl-body").innerHTML='<div class="memola-bl-empty">\u30EA\u30F3\u30AF\u5143\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F</div>';return}if(d.currentId!==e)return;if(a.length===0){r.style.display="none",r.innerHTML="";return}let i=r.querySelector(".memola-bl-count");i&&(i.textContent=String(a.length));let s=r.querySelector(".memola-bl-body");s&&(s.innerHTML=a.map(l=>{let m=B(l.pageId)?.icon||"\u{1F4C4}",p=l.count>1?'<span class="memola-bl-badge">\xD7'+l.count+"</span>":"";return'<div class="memola-bl-item" data-page-id="'+P(l.pageId)+'"><div class="memola-bl-row"><span class="memola-bl-item-icon">'+P(m)+'</span><span class="memola-bl-item-name">'+P(l.pageTitle)+"</span>"+p+"</div>"+(l.snippet?'<div class="memola-bl-snippet">'+P(l.snippet)+"</div>":"")+"</div>"}).join(""),s.querySelectorAll(".memola-bl-item").forEach(l=>{l.addEventListener("click",async()=>{let c=l.dataset.pageId||"";if(!c)return;await(await Promise.resolve().then(()=>(K(),ie))).doSelect(c)})}))}var dm,dg,pm=L(()=>{"use strict";q();Ts();Re();we();dm="memola-backlinks",dg="memola-backlinks-db"});var yn={};j(yn,{clearComments:()=>oP,closePopover:()=>iP,currentCommentTarget:()=>eP,currentCommentsContext:()=>bg,focusComment:()=>fP,loadCommentsFor:()=>tP,openCommentPopover:()=>Rw,pollComments:()=>nP});function bg(){if(!Rt||no.length===0)return"";let e=r=>(r||"").replace(/\s*\n\s*/g," ").trim(),t=["\u2500\u2500 \u3053\u306E\u30DA\u30FC\u30B8\u306E\u30B3\u30E1\u30F3\u30C8 \u2500\u2500"],o=40,n=0;for(let r of no){if(n>=o){t.push("\u2026 (\u4EE5\u964D\u306E\u30B3\u30E1\u30F3\u30C8\u306F\u7701\u7565)");break}let a=r.root.Scope==="user"?"\u500B\u4EBA":"\u7D44\u7E54",i=r.resolved?" [\u89E3\u6C7A\u6E08\u307F]":"",s=r.root.AnchorText?` (\u5BFE\u8C61: ${e(r.root.AnchorText)})`:"";t.push(`- [${a}]${i} ${r.root.AuthorName||"\u8AB0\u304B"}: ${e(r.root.Body)}${s}`),n++;for(let l of r.replies){if(n>=o)break;t.push(`    \u2514 ${l.AuthorName||"\u8AB0\u304B"}: ${e(l.Body)}`),n++}}return t.join(`
`)}function eP(){if(d.currentRow){let e=B(d.currentRow.dbId);return{pageId:"row:"+d.currentRow.listTitle+":"+d.currentRow.itemId,scope:e?.scope==="org"?"org":"user"}}if(d.currentType==="page"&&d.currentId){let e=B(d.currentId);return{pageId:Os(d.currentId),scope:e?.scope==="org"?"org":"user"}}return null}function vg(){return document.getElementById("memola-overlay")||document.body}function Qr(){return document.getElementById("memola-comments-pane")}function Si(){return document.getElementById("memola-comments-list")}function Lw(e){return Tw[Math.abs(e||0)%Tw.length]}function Sw(e){return(e||"\uFF1F").trim().charAt(0).toUpperCase()||"\uFF1F"}function bm(e){return e.replace(/"/g,'\\"')}async function tP(e,t){Rt=e,hg=t,Zr=t,Zn="",Ti=0,aP(),eo(e);try{let o=await Xc(e);if(await ed(o),await _w(o),Rt!==e)return;no=Yc(o)}catch{no=[]}Ll=no.length>0,Ow(),Qn(),lP()}function oP(){Rt="",no=[],Nw(),er(),vn(),um="",fg();let e=Qr();e&&e.classList.remove("on")}async function ea(){if(!Rt)return;let e=await Xc(Rt);await ed(e),await _w(e),no=Yc(e),Ow(),Qn()}async function nP(){if(!Rt)return;let e=Qr();e&&e.contains(document.activeElement)&&document.activeElement!==document.body||Ge||(eo(Rt),await ea())}async function _w(e){let t=new Set;for(let o of e){o.AuthorId&&o.AuthorName&&fm.set(o.AuthorId,o.AuthorName);let n=Ps(o);for(let r of Object.values(n))for(let a of r)t.add(a)}await Promise.all(Array.from(t).map(async o=>{fm.has(o)||fm.set(o,await Ua(o).catch(()=>"")||"\u30E6\u30FC\u30B6\u30FC#"+o)}))}function rP(e){let t=d.meta.myUserId||-1;return e.map(o=>o===t?"\u3042\u306A\u305F":fm.get(o)||"\u30E6\u30FC\u30B6\u30FC#"+o).join(", ")}function aP(){let e=Qr();if(e&&!Ew){Ew=!0,e.querySelector("#memola-comments-x")?.addEventListener("click",()=>{Ll=!1,fg(),Qn()});let t=Si();t?.addEventListener("click",cP),t?.addEventListener("mouseover",r=>{let a=r.target.closest(".memola-cmt-thread");if(!a)return;let i=a.dataset.blockId||"";i!==um&&(um=i,Uw(i))}),t?.addEventListener("mouseout",r=>{r.relatedTarget?.closest?.(".memola-cmt-thread")||(um="",fg())}),t?.addEventListener("input",r=>{let a=r.target.closest(".memola-cmt-reply-inp");a&&Bw(a)}),t?.addEventListener("keydown",r=>{let a=r;if(Dw(a)){a.stopPropagation();return}if(a.isComposing||a.keyCode===229)return;let i=a.target.closest(".memola-cmt-reply-inp");if(i&&a.key==="Enter"&&!a.shiftKey){a.preventDefault();let s=i.closest(".memola-cmt-thread")?.dataset.root||"";zw(s)}}),e.querySelector("#memola-comments-add")?.addEventListener("click",()=>void Aw());let n=e.querySelector("#memola-comments-ta");n?.addEventListener("input",()=>{n&&Bw(n)}),n?.addEventListener("keydown",r=>{let a=r;if(Dw(a)){a.stopPropagation();return}a.isComposing||a.keyCode===229||a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),Aw())}),n?.addEventListener("blur",()=>setTimeout(vn,150)),e.querySelector("#memola-comments-scope-org")?.addEventListener("click",()=>{Zr="org",gm()}),e.querySelector("#memola-comments-scope-user")?.addEventListener("click",()=>{Zr="user",gm()}),e.querySelector("#memola-comments-target-x")?.addEventListener("click",()=>{Zn="",gm()})}}function Rw(e,t){if(e!==Rt)return;Ll=!0,Zn=t,Zr=hg,Qn();let o=Si();t&&o&&o.querySelector('.memola-cmt-thread[data-block-id="'+bm(t)+'"]')?.scrollIntoView({block:"center"}),Qr()?.querySelector("#memola-comments-ta")?.focus()}function iP(){er()}function Nw(){for(let e of hm)e.remove();hm.length=0}function Ow(){Nw();let e=du(no);for(let[t,o]of e){if(!t)continue;let n=document.createElement("div");n.className="memola-cmt-marker",n.dataset.blockId=t,n.textContent=o>1?"\u{1F4AC}"+o:"\u{1F4AC}",n.title="\u30B3\u30E1\u30F3\u30C8 "+o+" \u4EF6",n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),Rw(Rt,t)}),vg().appendChild(n),hm.push(n)}Hw()}function Hw(){let e=Ce(),o=(document.getElementById("memola-ea")||e).getBoundingClientRect().right;for(let n of hm){let r=e.querySelector('[data-block-id="'+bm(n.dataset.blockId||"")+'"]');if(!r){n.style.display="none";continue}n.style.display="";let a=r.getBoundingClientRect(),i=sP(r),s=n.offsetHeight||20,l=n.offsetWidth||24;n.style.top=i.top+window.scrollY+(i.height-s)/2+"px";let c=Math.min(a.right+8,o-l-4);n.style.left=c+window.scrollX+"px"}}function sP(e){try{let n=document.createRange();n.selectNodeContents(e);let r=n.getClientRects();for(let a=0;a<r.length;a++)if(r[a].height>0)return{top:r[a].top,height:r[a].height}}catch{}let t=e.getBoundingClientRect(),o=parseFloat(window.getComputedStyle(e).lineHeight);return{top:t.top,height:isFinite(o)&&o>0?Math.min(o,t.height):t.height}}function ug(){pg==null&&(pg=window.requestAnimationFrame(()=>{pg=null,Hw()}))}function lP(){Iw||(Iw=!0,window.addEventListener("scroll",ug,!0),window.addEventListener("resize",ug),Ce().addEventListener("input",ug))}function Mw(e){let t=Ps(e),o=d.meta.myUserId||-1,n=Object.entries(t).filter(([,r])=>r.length>0).map(([r,a])=>{let i=a.includes(o)?" mine":"",s=P(rP(a));return'<button class="memola-cmt-react-chip'+i+'" data-act="react-toggle" data-id="'+e.Id+'" data-emoji="'+P(r)+'" title="'+s+'">'+r+" "+a.length+"</button>"});return n.length?'<div class="memola-cmt-reacts">'+n.join("")+"</div>":""}function Pw(e,t,o=!0){let n=e.AuthorId===(d.meta.myUserId||-1),r=e.Created?An(Date.parse(e.Created)):"";if(e.Deleted)return'<div class="memola-cmt-c deleted"><div class="memola-cmt-main"><div class="memola-cmt-body muted">\uFF08\u524A\u9664\u3055\u308C\u305F\u30B3\u30E1\u30F3\u30C8\uFF09</div></div></div>';if(Ti===e.Id)return'<div class="memola-cmt-c editing" data-id="'+e.Id+'"><div class="memola-cmt-avatar" style="background:'+Lw(e.AuthorId)+'">'+P(Sw(e.AuthorName||""))+'</div><div class="memola-cmt-main"><textarea class="memola-cmt-edit-ta">'+P(e.Body)+'</textarea><div class="memola-cmt-editacts"><button class="memola-btn s" data-act="edit-save" data-id="'+e.Id+'">\u4FDD\u5B58</button><button class="memola-btn ghost" data-act="edit-cancel">\u53D6\u6D88</button></div></div></div>';let a=t&&e.Scope==="user"?'<span class="memola-cmt-badge priv">\u{1F512}</span>':"",i=P((e.Body||"").replace(/\r\n?/g,`
`).trim()).replace(/\n/g,"<br>"),s=e.Edited?'<span class="memola-cmt-edited">\u7DE8\u96C6\u6E08\u307F</span>':"",l=o?'<div class="memola-cmt-hover"><button class="memola-cmt-hbtn" data-act="react" data-id="'+e.Id+'" title="\u30EA\u30A2\u30AF\u30B7\u30E7\u30F3">\u{1F642}<sup>+</sup></button>'+(t?'<button class="memola-cmt-hbtn" data-act="resolve" data-root="'+e.Id+'" title="\u89E3\u6C7A">\u2713</button>':"")+(n?'<button class="memola-cmt-hbtn" data-act="more" data-id="'+e.Id+'" title="\u305D\u306E\u4ED6">\u22EF</button>':"")+"</div>":"",c='<div class="memola-cmt-avatar" style="background:'+Lw(e.AuthorId)+'">'+P(Sw(e.AuthorName||""))+"</div>";return t?'<div class="memola-cmt-c" data-id="'+e.Id+'">'+c+'<div class="memola-cmt-main"><div class="memola-cmt-line1"><span class="memola-cmt-author">'+P(e.AuthorName||"\u8AB0\u304B")+'</span><span class="memola-cmt-time">'+P(r)+"</span>"+s+a+'</div><div class="memola-cmt-body">'+i+"</div>"+Mw(e)+"</div>"+l+"</div>":'<div class="memola-cmt-c reply" data-id="'+e.Id+'" title="'+P(r)+'">'+c+'<div class="memola-cmt-main"><div class="memola-cmt-replyline"><span class="memola-cmt-author">'+P(e.AuthorName||"\u8AB0\u304B")+'</span> <span class="memola-cmt-body inline">'+i+"</span> "+s+"</div>"+Mw(e)+"</div>"+l+"</div>"}function Cw(e){let t=e.blockId?'<div class="memola-cmt-anchor">'+P(e.root.AnchorText||"\uFF08\u30D6\u30ED\u30C3\u30AF\uFF09")+"</div>":"",o=e.replies.length?'<div class="memola-cmt-replies">'+e.replies.map(a=>Pw(a,!1,!0)).join("")+"</div>":"",n=e.root.AuthorId===(d.meta.myUserId||-1),r='<div class="memola-cmt-thread-hover"><button class="memola-cmt-hbtn" data-act="react" data-id="'+e.root.Id+'" title="\u30EA\u30A2\u30AF\u30B7\u30E7\u30F3">\u{1F642}<sup>+</sup></button><button class="memola-cmt-hbtn" data-act="resolve" data-root="'+e.root.Id+'" title="\u89E3\u6C7A">\u2713</button>'+(n?'<button class="memola-cmt-hbtn" data-act="more" data-id="'+e.root.Id+'" title="\u305D\u306E\u4ED6">\u22EF</button>':"")+"</div>";return'<div class="memola-cmt-thread'+(e.resolved?" resolved":"")+'" data-root="'+e.root.Id+'"'+(e.blockId?' data-block-id="'+P(e.blockId)+'"':"")+">"+r+(e.resolved?'<div class="memola-cmt-resolved-tag">\u2713 \u89E3\u6C7A\u6E08\u307F</div>':"")+t+Pw(e.root,!0,!1)+o+'<div class="memola-cmt-replybar"><input class="memola-cmt-reply-inp" type="text" placeholder="\u8FD4\u4FE1..."><button class="memola-cmt-reply-send" data-act="reply" data-root="'+e.root.Id+'">\u21B5</button></div></div>'}function Qn(){let e=Qr(),t=Si();if(!e||!t)return;if(!Ll||!Rt){e.classList.remove("on");return}e.classList.add("on");let o=Ce(),n=new Map;o.querySelectorAll("[data-block-id]").forEach((l,c)=>{let m=l.dataset.blockId;m&&!n.has(m)&&n.set(m,c)});let r=l=>l.blockId?n.get(l.blockId)??Number.MAX_SAFE_INTEGER:-1,a=(l,c)=>r(l)-r(c),i=no.filter(l=>!l.resolved).sort(a),s=no.filter(l=>l.resolved).sort(a);t.innerHTML=i.length||s.length?i.map(Cw).join("")+(s.length?'<div class="memola-cmt-resolved-sep">\u89E3\u6C7A\u6E08\u307F</div>'+s.map(Cw).join(""):""):'<div class="memola-cmt-empty">\u307E\u3060\u30B3\u30E1\u30F3\u30C8\u306F\u3042\u308A\u307E\u305B\u3093\u3002<br>\u30D6\u30ED\u30C3\u30AF\u306E \u22EE\u22EE \u304B\u3089\u300C\u{1F4AC} \u30B3\u30E1\u30F3\u30C8\u300D\u3001\u307E\u305F\u306F\u30C4\u30FC\u30EB\u30D0\u30FC\u306E \u{1F4AC} \u3067\u8FFD\u52A0\u3067\u304D\u307E\u3059\u3002</div>',gm()}function gm(){let e=Qr();if(!e)return;let t=e.querySelector("#memola-comments-scope-org"),o=e.querySelector("#memola-comments-scope-user");t?.classList.toggle("on",Zr==="org"),o?.classList.toggle("on",Zr==="user");let n=e.querySelector("#memola-comments-target"),r=e.querySelector("#memola-comments-target-lbl");n&&r&&(Zn?(n.style.display="",r.textContent="\u21B3 "+(Fw(Zn)||"\u3053\u306E\u30D6\u30ED\u30C3\u30AF")):n.style.display="none")}function Fw(e){return e?(Ce().querySelector('[data-block-id="'+bm(e)+'"]')?.textContent||"").trim().slice(0,80):""}function Uw(e){let t=Ce();if(t.querySelectorAll(".memola-cmt-block-active").forEach(n=>n.classList.remove("memola-cmt-block-active")),!e)return;let o=t.querySelector('[data-block-id="'+bm(e)+'"]');o&&o.classList.add("memola-cmt-block-active")}function fg(){Ce().querySelectorAll(".memola-cmt-block-active").forEach(e=>e.classList.remove("memola-cmt-block-active"))}function Sl(e){for(let t of no){if(t.root.Id===e)return t.root;let o=t.replies.find(n=>n.Id===e);if(o)return o}return null}function cP(e){let o=e.target.closest("[data-act]");if(!o)return;let n=o.dataset.act,r=Number(o.dataset.id||0);if(n==="resolve"){dP(o.dataset.root||"");return}if(n==="reply"){zw(o.dataset.root||"");return}if(n==="react"){pP(o,r);return}if(n==="react-toggle"){jw(r,o.dataset.emoji||"");return}if(n==="more"){gP(o,r);return}if(n==="edit"){Ti=r,er(),Qn();return}if(n==="edit-cancel"){Ti=0,Qn();return}if(n==="edit-save"){mP(r);return}if(n==="del"){er(),qw(r);return}}async function Aw(){let e=Qr()?.querySelector("#memola-comments-ta"),t=(e?.value||"").trim();if(!t)return;let o=e&&Li.get(e)||[];try{await Zc({pageId:Rt,blockId:Zn,body:t,scope:Zr,anchorText:Fw(Zn),mentions:o}),e&&(e.value="",Li.delete(e)),Zn="",await ea()}catch(n){k("\u30B3\u30E1\u30F3\u30C8\u8FFD\u52A0\u5931\u6557: "+n.message,"err")}}async function zw(e){let t=Sl(Number(e));if(!t)return;let o=Si()?.querySelector('.memola-cmt-thread[data-root="'+e+'"] .memola-cmt-reply-inp'),n=(o?.value||"").trim();if(!n)return;let r=o&&Li.get(o)||[];try{await Zc({pageId:Rt,blockId:t.BlockId,body:n,scope:t.Scope,threadRootId:e,mentions:r}),o&&Li.delete(o),await ea()}catch(a){k("\u8FD4\u4FE1\u5931\u6557: "+a.message,"err")}}async function dP(e){let t=Sl(Number(e));if(t)try{await fu(t,!(t.Resolved>0)),await ea()}catch(o){k("\u89E3\u6C7A\u72B6\u614B\u306E\u5909\u66F4\u5931\u6557: "+o.message,"err")}}async function jw(e,t){let o=Sl(e);if(!(!o||!t))try{await gu(o,t),await ea()}catch(n){k("\u30EA\u30A2\u30AF\u30B7\u30E7\u30F3\u5931\u6557: "+n.message,"err")}}async function mP(e){let t=Sl(e);if(!t)return;let n=(Si()?.querySelector('.memola-cmt-c.editing[data-id="'+e+'"] .memola-cmt-edit-ta')?.value||"").trim();if(n)try{await uu({...t,Body:n}),Ti=0,await ea()}catch(r){k("\u7DE8\u96C6\u5931\u6557: "+r.message,"err")}}async function qw(e){let t=Sl(e);if(!t)return;let n=no.find(a=>a.root.Id===e)?.replies??[],r=n.length?"\u3053\u306E\u30B3\u30E1\u30F3\u30C8\u3068\u8FD4\u4FE1 "+n.length+" \u4EF6\u3092\u524A\u9664\u3057\u307E\u3059\u304B?":"\u3053\u306E\u30B3\u30E1\u30F3\u30C8\u3092\u524A\u9664\u3057\u307E\u3059\u304B?";if(confirm(r))try{for(let a of n)await Qc(a);await Qc(t),await ea()}catch(a){k("\u524A\u9664\u5931\u6557: "+a.message,"err")}}function er(){Ei&&(Ei.remove(),Ei=null),document.removeEventListener("mousedown",$w,!0)}function $w(e){Ei&&!Ei.contains(e.target)&&er()}function Kw(e,t){er(),Ei=t,vg().appendChild(t);let o=e.getBoundingClientRect();t.style.left=Math.min(o.left+window.scrollX,window.scrollX+window.innerWidth-(t.offsetWidth||180)-8)+"px",t.style.top=o.bottom+window.scrollY+4+"px",setTimeout(()=>document.addEventListener("mousedown",$w,!0),0)}function pP(e,t){let o=document.createElement("div");o.className="memola-cmt-float memola-cmt-react-palette";for(let n of QM){let r=document.createElement("button");r.className="memola-cmt-react-opt",r.textContent=n,r.addEventListener("mousedown",a=>{a.preventDefault(),er(),jw(t,n)}),o.appendChild(r)}Kw(e,o)}async function Bw(e){if(hg!=="org"){vn();return}let t=e.selectionStart??e.value.length,n=e.value.slice(0,t).match(/@([^\s@]*)$/);if(!n){vn();return}let r=await Mv(n[1]);if(!r.length){vn();return}uP(e,r,t-n[0].length)}function uP(e,t,o){vn();let n=document.createElement("div");n.className="memola-cmt-float memola-mention-pop",Ge={el:e,float:n,items:t,active:0,matchStart:o},gg(),vg().appendChild(n);let r=e.getBoundingClientRect();n.style.left=r.left+window.scrollX+"px",n.style.top=r.bottom+window.scrollY+4+"px"}function gg(){Ge&&(Ge.float.innerHTML=Ge.items.map((e,t)=>'<button class="memola-mention-item'+(t===Ge.active?" active":"")+'" data-i="'+t+'"><span class="memola-mention-name">'+P(e.title)+'</span><span class="memola-mention-email">'+P(e.email)+"</span></button>").join(""),Ge.float.querySelectorAll(".memola-mention-item").forEach(e=>{e.addEventListener("mousedown",t=>{t.preventDefault(),Vw(Number(e.dataset.i))})}))}function Vw(e){if(!Ge)return;let t=Ge.items[e],o=Ge.el;if(!t){vn();return}let n=o.selectionStart??o.value.length,r="@"+t.title+" ",a=o.value.slice(0,Ge.matchStart),i=o.value.slice(n);o.value=a+r+i;let s=(a+r).length;o.setSelectionRange(s,s);let l=Li.get(o)||[];l.push(t.id),Li.set(o,l),vn(),o.focus()}function vn(){Ge&&(Ge.float.remove(),Ge=null)}function Dw(e){return Ge?e.key==="ArrowDown"?(Ge.active=Math.min(Ge.items.length-1,Ge.active+1),gg(),e.preventDefault(),!0):e.key==="ArrowUp"?(Ge.active=Math.max(0,Ge.active-1),gg(),e.preventDefault(),!0):e.key==="Enter"?(e.preventDefault(),Vw(Ge.active),!0):e.key==="Escape"?(e.preventDefault(),vn(),!0):!1:!1}function fP(e,t){Ll=!0;let o=n=>{if(Rt!==e){n<25&&setTimeout(()=>o(n+1),150);return}Qn();let r=Si()?.querySelector('.memola-cmt-c[data-id="'+t+'"]');if(r){let a=r.closest(".memola-cmt-thread");a?.scrollIntoView({block:"center"}),r.classList.add("memola-cmt-flash"),setTimeout(()=>r.classList.remove("memola-cmt-flash"),1600),Uw(a?.dataset.blockId||"");return}n<25&&setTimeout(()=>o(n+1),150)};o(0)}function gP(e,t){let o=document.createElement("div");o.className="memola-cmt-float memola-cmt-more";let n=(r,a)=>{let i=document.createElement("button");return i.className="memola-cmt-more-item",i.textContent=r,i.dataset.act=a,i.dataset.id=String(t),i.addEventListener("mousedown",s=>{s.preventDefault(),er(),a==="edit"?(Ti=t,Qn()):a==="del"&&qw(t)}),i};o.appendChild(n("\u7DE8\u96C6","edit")),o.appendChild(n("\u524A\u9664","del")),Kw(e,o)}var Rt,hg,no,hm,Ll,Zn,Zr,Ti,Iw,Ew,um,Li,Ge,fm,QM,Tw,pg,Ei,jo=L(()=>{"use strict";q();me();le();Re();Lo();we();Zt();Wc();V();As();Rt="",hg="user",no=[],hm=[],Ll=!0,Zn="",Zr="user",Ti=0,Iw=!1,Ew=!1,um="",Li=new WeakMap,Ge=null,fm=new Map,QM=["\u{1F44D}","\u2764\uFE0F","\u{1F389}","\u{1F604}","\u{1F64F}","\u{1F440}"],Tw=["#e07a5f","#3d82c4","#5a9e6f","#b06fb0","#c99a3b","#4aa3a3","#c4677b","#7a82c4"];pg=null;Ei=null});var Fo={};j(Fo,{backToDb:()=>Gw,openRowAsPage:()=>hP,saveCurrentRow:()=>bP});async function hP(e,t){let o=d.dbList;if(!o||!t)return;d.currentRow={listTitle:o,itemId:t.Id,dbId:e},d.currentType="page",Promise.resolve().then(()=>(Xn(),Ii)).then(y=>y.pushHistory(e,{rowList:o,rowId:t.Id})),tt("page");let n=I("ttl");n.value=t.Title||"",Qo(n);let r=await go(o,t.Id),a=r?Xe(r):[],i=Ce(),{mountEditor2:s,loadBlocks:l}=await Promise.resolve().then(()=>(vt(),qo));s(i),l(a);let c=document.getElementById("memola-row-props");c&&ex(c,d.dbFields,t,o);let m=I("pg-icon"),p=document.getElementById("memola-add-icon");m&&(m.style.display="none"),p&&(p.style.display="");let u=d.pages.find(y=>y.Id===e),f=rd(o)?"\u{1F4C5} \u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8":u?.Title||"\u7121\u984CDB";Tl([{label:f,onClick:()=>{Gw(e)}},{label:t.Title||"\u7121\u984C"}]);let g=t.Modified||null;So(g),d.dirty=!1,Promise.resolve().then(()=>(pm(),mm)).then(y=>y.renderBacklinks()),Promise.resolve().then(()=>(jo(),yn)).then(y=>{let b=y.currentCommentTarget();b&&y.loadCommentsFor(b.pageId,b.scope)}),Promise.resolve().then(()=>(Kt(),oo)).then(y=>y.openRowInActiveTab(e,t.Id,t.Title||"\u7121\u984C"))}async function bP(){if(!d.currentRow)return;let t=(I("ttl").value||"").trim()||"\u7121\u984C",{getBlocks:o}=await Promise.resolve().then(()=>(vt(),qo)),n=Je(o());Ye("\u4FDD\u5B58\u4E2D...");let r=d.currentRow;try{await ft(r.listTitle,r.itemId,{Title:t}),await Ao(r.listTitle,r.itemId,r.dbId,t,n);let a=d.dbItems.find(i=>i.Id===r.itemId);a&&(a.Title=t),d.dirty=!1,Ye(""),vP(r.itemId,t,r.listTitle)}catch(a){k("\u884C\u306E\u4FDD\u5B58\u306B\u5931\u6557: "+a.message,"err"),Ye("\u672A\u4FDD\u5B58")}}async function vP(e,t,o){if(Ww.has(e)||!rd(o)||Oc(t))return;let r=d.dbItems.find(s=>s.Id===e)?.[gt]||"",a=To(r)||"";if(!(!a||(Ww.add(e),!window.confirm("\u300C"+t+`\u300D\u3092\u901A\u5E38\u30DA\u30FC\u30B8\u306B\u5909\u63DB\u3057\u307E\u3059\u304B\uFF1F

\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 (`+a+`) \u304B\u3089\u306F\u5916\u308C\u307E\u3059\u3002
\u3042\u3068\u3067\u30E1\u30CB\u30E5\u30FC\u304B\u3089\u300C\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u306B\u623B\u3059\u300D\u3067\u5FA9\u5143\u3067\u304D\u307E\u3059\u3002`))))try{let s=await wu(e,t,a),{apiGetPages:l}=await Promise.resolve().then(()=>(V(),$e));await l();let{renderTree:c}=await Promise.resolve().then(()=>(_e(),ko));c(),await(await Promise.resolve().then(()=>(K(),ie))).doSelect(s),k("\u901A\u5E38\u30DA\u30FC\u30B8\u306B\u5909\u63DB\u3057\u307E\u3057\u305F")}catch(s){k("\u5909\u63DB\u5931\u6557: "+s.message,"err")}}async function Gw(e){if(d.currentRow=null,!d.pages.find(n=>n.Id===e))return;let{doSelect:o}=await Promise.resolve().then(()=>(K(),ie));await o(e);try{d.dbList&&(d.dbItems=await Ee(d.dbList));let{renderDbTable:n}=await Promise.resolve().then(()=>(K(),ie));n()}catch{}}var Ww,Uo=L(()=>{"use strict";q();me();le();qe();De();V();Mt();K();tx();_n();Lo();Ww=new Set});var ta={};j(ta,{clearSaveTimer:()=>vm,flushPendingSave:()=>xt,schedSave:()=>$o});function yg(){Ml&&(clearTimeout(Ml),Ml=null)}function yP(){yg(),Ml=setTimeout(()=>{Ml=null,!(!d.currentRow||!d.dirty||d.saving)&&Promise.resolve().then(()=>(Uo(),Fo)).then(e=>e.saveCurrentRow()).catch(()=>{})},hs)}function Yw(){if(!d.currentId||d.currentType==="database"||d.currentRow)return;let e=I("ttl"),t=Ce();if(!e||!t)return;let o=e.value.trim()||"\u7121\u984C";xg(o)}function $o(){if(!(!d.currentId||d.currentType==="database")){if(d.currentRow){d.dirty||(d.dirty=!0,Ye("\u672A\u4FDD\u5B58")),yP();return}Yw()}}function vm(){jy(),yg()}async function xt(){if(d.currentRow){if(yg(),d.dirty&&!d.saving){d.saving=!0;try{await(await Promise.resolve().then(()=>(Uo(),Fo))).saveCurrentRow()}finally{d.saving=!1}}return}Yw(),await re.flush()}var Ml,bt=L(()=>{"use strict";q();me();ht();of();vt();le();Fe();Ml=null});var Qw={};j(Qw,{insertLinkedDb:()=>LP,renderAllLinkedDbs:()=>TP});function wP(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t.filter(o=>o&&typeof o.field=="string"&&typeof o.op=="string"):[]}catch{return[]}}function kP(e,t){return t.length===0?e:e.filter(o=>{for(let n of t){if(!n.value&&n.op!=="empty"&&n.op!=="not_empty")continue;let r=o[n.field],a=r==null?"":String(r);if(n.op==="equals"){if(a!==n.value)return!1}else if(n.op==="not_empty"){if(!a)return!1}else if(n.op==="empty"){if(a)return!1}else if(!a.toLowerCase().includes(n.value.toLowerCase()))return!1}return!0})}function IP(e,t){t.length===0?e.removeAttribute("data-filter"):e.setAttribute("data-filter",JSON.stringify(t)),$o(),setTimeout(()=>{wg(e)},0)}function EP(e,t){if(e==null||e==="")return"";if(t.FieldTypeKind===4){let o=String(e);return/^\d{4}-\d{2}-\d{2}/.test(o)?o.substring(0,10):o}if(t.FieldTypeKind===8)return e?"\u2611":"\u2610";if(typeof e=="object"){let o=e;return Array.isArray(o.results)?o.results.map(String).join(", "):typeof o.Title=="string"?o.Title:""}return String(e)}async function wg(e){let t=e.getAttribute("data-db-id")||"",o=B(t);if(!o||o.type!=="database"||!o.list){e.innerHTML='<div class="memola-linkdb-broken">\u26A0 DB \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093'+(t?" (id="+P(t)+")":"")+"</div>";return}let n=o.list,r=wP(e.getAttribute("data-filter")||"");e.innerHTML='<div class="memola-linkdb-loading">\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026</div>';let a=[],i=[];try{let D=await Promise.resolve().then(()=>(De(),po));[a,i]=await Promise.all([D.getListFields(n),D.getListItems(n)])}catch(D){e.innerHTML='<div class="memola-linkdb-error">\u8AAD\u307F\u8FBC\u307F\u5931\u6557: '+P(D.message)+"</div>";return}let s=new Set(["Title","ContentType","Attachments","_memola_body"]),l=a.filter(D=>!s.has(D.InternalName)&&!s.has(D.Title)),c=[{internal:"Title",title:"\u30BF\u30A4\u30C8\u30EB"},...l.map(D=>({internal:D.InternalName,title:D.Title}))],m=[{field:null,label:"\u30BF\u30A4\u30C8\u30EB",key:"Title"},...l.slice(0,xP-1).map(D=>({field:D,label:D.Title,key:D.InternalName}))],p=kP(i,r),u=p.length,f=i.length,g=Math.min(u,Xw),y=u>Xw,b="<thead><tr>"+m.map(D=>"<th>"+P(D.label)+"</th>").join("")+"</tr></thead>",h="<tbody>"+p.slice(0,g).map(D=>{let O=m.map(Y=>{if(Y.key==="Title")return'<td class="memola-linkdb-title-cell" data-row-id="'+D.Id+'">'+P(String(D.Title||"\u7121\u984C"))+"</td>";let oe=Y.field;return"<td>"+P(EP(D[Y.key],oe))+"</td>"}).join("");return'<tr data-row-id="'+D.Id+'">'+O+"</tr>"}).join("")+"</tbody>",v=o.icon||"\u{1F5C3}",w=r.length>0?"\u{1F50E} \u30D5\u30A3\u30EB\u30BF ("+r.length+")":"\u{1F50E} \u30D5\u30A3\u30EB\u30BF",x=r.length>0?u+" / "+f+" \u4EF6":u+" \u4EF6",T='<div class="memola-linkdb-header"><span class="memola-linkdb-icon">'+P(v)+'</span><span class="memola-linkdb-name">'+P(o.title)+'</span><span class="memola-linkdb-count">'+x+(y?" (\u4E0A\u4F4D "+g+" \u4EF6\u3092\u8868\u793A)":"")+'</span><button class="memola-linkdb-filter" type="button" title="\u30D5\u30A3\u30EB\u30BF\u6761\u4EF6\u3092\u7DE8\u96C6">'+P(w)+'</button><button class="memola-linkdb-open" type="button" title="DB \u3092\u958B\u304F">\u2197 \u958B\u304F</button></div>',E=D=>{let O=c.find(Y=>Y.internal===D);return O?O.title:D},C=D=>D==="contains"?"\u542B\u3080":D==="equals"?"\uFF1D":D==="not_empty"?"\u7A7A\u3067\u306A\u3044":D==="empty"?"\u7A7A":D,U=r.length>0?'<div class="memola-linkdb-filterchips">'+r.map(D=>'<span class="memola-linkdb-chip">'+P(E(D.field))+" "+P(C(D.op))+(D.op==="empty"||D.op==="not_empty"?"":": "+P(D.value))+"</span>").join("")+"</div>":"";e.innerHTML=T+U+'<div class="memola-linkdb-tablewrap"><table class="memola-linkdb-table">'+b+h+"</table></div>",e.querySelector(".memola-linkdb-open")?.addEventListener("click",D=>{D.preventDefault(),D.stopPropagation(),Promise.resolve().then(()=>(K(),ie)).then(O=>O.doSelect(t))});let N=e.querySelector(".memola-linkdb-filter");N?.addEventListener("click",D=>{D.preventDefault(),D.stopPropagation(),Jw(e,N,c,r)}),e.querySelectorAll(".memola-linkdb-chip").forEach(D=>{D.addEventListener("click",O=>{O.preventDefault(),O.stopPropagation(),Jw(e,N||D,c,r)})}),e.querySelectorAll(".memola-linkdb-title-cell").forEach(D=>{D.addEventListener("click",async O=>{O.preventDefault(),O.stopPropagation();let Y=parseInt(D.dataset.rowId||"0",10);if(!Y)return;let oe=p.find(Me=>Me.Id===Y);if(oe)try{let Me=await Promise.resolve().then(()=>(K(),ie)),se=d.pages.find(Ie=>Ie.Id===t);if(!se){k("DB \u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}await Me.doSelectDb(t,se);let F=await Promise.resolve().then(()=>(Uo(),Fo)),de=d.dbItems.find(Ie=>Ie.Id===Y)||oe;await F.openRowAsPage(t,de)}catch(Me){k("\u884C\u3092\u958B\u3051\u307E\u305B\u3093\u3067\u3057\u305F: "+Me.message,"err")}})})}function TP(e){e.querySelectorAll(".memola-linkdb").forEach(o=>{wg(o)})}function ym(){Mi&&(Mi.remove(),Mi=null),document.removeEventListener("mousedown",Zw,!0)}function Zw(e){Mi&&(Mi.contains(e.target)||ym())}function Jw(e,t,o,n){ym();let r=n.map(p=>({...p})),a=document.createElement("div");a.className="memola-linkdb-fpop",a.addEventListener("click",p=>p.stopPropagation());function i(){let p=o.map(y=>'<option value="'+P(y.internal)+'">'+P(y.title)+"</option>").join(""),u=[["contains","\u542B\u3080"],["equals","\uFF1D (\u5B8C\u5168\u4E00\u81F4)"],["not_empty","\u7A7A\u3067\u306A\u3044"],["empty","\u7A7A"]].map(([y,b])=>'<option value="'+y+'">'+b+"</option>").join(""),f=r.map((y,b)=>{let h=y.op!=="empty"&&y.op!=="not_empty";return'<div class="memola-linkdb-frow" data-idx="'+b+'"><select class="memola-linkdb-ffield">'+p+'</select><select class="memola-linkdb-fop">'+u+"</select>"+(h?'<input class="memola-linkdb-fval" type="text" placeholder="\u5024\u2026" value="'+P(y.value)+'">':'<span class="memola-linkdb-fval-na">\u2014</span>')+'<button class="memola-linkdb-frm" title="\u524A\u9664">\xD7</button></div>'}).join(""),g=r.length===0?'<div class="memola-linkdb-fempty">\u30D5\u30A3\u30EB\u30BF\u6761\u4EF6\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u300C+ \u8FFD\u52A0\u300D\u3067\u6761\u4EF6\u3092\u52A0\u3048\u3066\u304F\u3060\u3055\u3044\u3002</div>':"";a.innerHTML='<div class="memola-linkdb-fhd"><span>\u{1F50E} \u30D5\u30A3\u30EB\u30BF\u6761\u4EF6 (AND)</span><button class="memola-linkdb-fclose" title="\u9589\u3058\u308B">\xD7</button></div><div class="memola-linkdb-fbody">'+g+f+'</div><div class="memola-linkdb-fft"><button class="memola-linkdb-fadd">+ \u8FFD\u52A0</button><span style="flex:1"></span><button class="memola-linkdb-fclear">\u5168\u30AF\u30EA\u30A2</button><button class="memola-linkdb-fapply">\u9069\u7528</button></div>',a.querySelectorAll(".memola-linkdb-frow").forEach(y=>{let b=parseInt(y.dataset.idx||"-1",10);if(b<0)return;let h=r[b],v=y.querySelector(".memola-linkdb-ffield"),w=y.querySelector(".memola-linkdb-fop");v&&(v.value=h.field||o[0]?.internal||""),w&&(w.value=h.op),v?.addEventListener("change",()=>{h.field=v.value}),w?.addEventListener("change",()=>{h.op=w.value,(h.op==="empty"||h.op==="not_empty")&&(h.value=""),i()});let x=y.querySelector(".memola-linkdb-fval");x?.addEventListener("input",()=>{h.value=x.value}),y.querySelector(".memola-linkdb-frm")?.addEventListener("click",()=>{r.splice(b,1),i()})}),a.querySelector(".memola-linkdb-fadd")?.addEventListener("click",()=>{r.push({field:o[0]?.internal||"Title",op:"contains",value:""}),i()}),a.querySelector(".memola-linkdb-fclear")?.addEventListener("click",()=>{r.length!==0&&confirm("\u5168\u3066\u306E\u6761\u4EF6\u3092\u524A\u9664\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?")&&(r.length=0,i())}),a.querySelector(".memola-linkdb-fapply")?.addEventListener("click",()=>{let y=r.filter(b=>b.field?b.op==="empty"||b.op==="not_empty"?!0:!!b.value:!1);IP(e,y),ym()}),a.querySelector(".memola-linkdb-fclose")?.addEventListener("click",()=>{ym()})}i(),(document.getElementById("memola-overlay")||document.body).appendChild(a);let l=t.getBoundingClientRect();a.style.position="fixed",a.style.top=l.bottom+6+"px";let c=380,m=l.right-c;m<8&&(m=8),a.style.left=m+"px",a.style.width=c+"px",Mi=a,setTimeout(()=>{document.addEventListener("mousedown",Zw,!0)},0)}function LP(e,t="table"){let o=window.getSelection();if(!o||!o.rangeCount)return;let n=document.createElement("div");n.className="memola-linkdb",n.setAttribute("contenteditable","false"),n.setAttribute("data-db-id",e),n.setAttribute("data-view",t);let r=document.createElement("p");r.appendChild(document.createElement("br"));let a=o.getRangeAt(0);a.insertNode(r),a.insertNode(n);let i=document.createRange();i.setStart(r,0),i.collapse(!0),o.removeAllRanges(),o.addRange(i),wg(n)}var Xw,xP,Mi,ek=L(()=>{"use strict";q();le();bt();Re();we();Xw=50,xP=4;Mi=null});var rk={};j(rk,{insertAiBlock:()=>MP,reattachAiBlocks:()=>SP});function SP(e){e.querySelectorAll(".memola-ai-block").forEach(t=>{if(t.dataset.aibBound==="1")return;t.dataset.aibBound="1";let o=t.dataset.aibAction||"",n=t.dataset.aibResult||"",r=kg.find(a=>a.key===o)||{key:o,label:o,prompt:""};n?nk(t,r,n):(t.innerHTML=tk(),ok(t))})}function MP(){let e=Ce(),t=window.getSelection();if(!t||!t.rangeCount)return;let o=document.createElement("div");o.className="memola-ai-block",o.contentEditable="false",o.innerHTML=tk();let n=t.getRangeAt(0),r=n.startContainer;for(;r&&r.parentElement!==e;)r=r.parentElement;r&&r!==e?(e.insertBefore(o,r.nextSibling),r.textContent?.trim()||r.remove()):n.insertNode(o);let a=document.createElement("p");a.appendChild(document.createElement("br")),e.insertBefore(a,o.nextSibling),ok(o),$o()}function tk(){return'<div class="memola-aib-head"><span class="memola-aib-title">\u2726 AI \u30D6\u30ED\u30C3\u30AF</span><span class="memola-aib-hint">\u30A2\u30AF\u30B7\u30E7\u30F3\u3092\u9078\u629E</span></div><div class="memola-aib-actions">'+kg.map(e=>'<button class="memola-aib-action" data-action="'+e.key+'">'+e.label+"</button>").join("")+'<button class="memola-aib-action memola-aib-cancel" data-action="cancel">\xD7</button></div>'}function ok(e){e.querySelectorAll(".memola-aib-action").forEach(t=>{t.addEventListener("click",()=>{let o=t.dataset.action;if(o==="cancel"){e.remove(),$o();return}let n=kg.find(r=>r.key===o);n&&Ig(e,n)})})}async function Ig(e,t){let o=Je(xn());e.innerHTML='<div class="memola-aib-head"><span class="memola-aib-title">\u2726 '+P(t.label)+'</span><span class="memola-aib-hint">\u8003\u3048\u4E2D\u2026</span></div><div class="memola-aib-body memola-aib-loading">\u2026</div>';try{let n=await Wf([{role:"user",content:t.prompt+`

--- \u30DA\u30FC\u30B8\u672C\u6587 ---
`+o}],"\u3042\u306A\u305F\u306F Memola \u306EAI\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u3067\u3059\u3002\u7C21\u6F54\u3067\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u3067\u7B54\u3048\u3066\u304F\u3060\u3055\u3044\u3002");nk(e,t,n)}catch(n){e.innerHTML='<div class="memola-aib-head"><span class="memola-aib-title">\u2726 '+P(t.label)+'</span></div><div class="memola-aib-body memola-aib-error">\u26A0\uFE0F '+P(n.message)+'</div><div class="memola-aib-foot"><button class="memola-aib-btn memola-aib-retry" data-action="retry">\u518D\u8A66\u884C</button><button class="memola-aib-btn memola-aib-discard" data-action="discard">\u7834\u68C4</button></div>',e.querySelector(".memola-aib-retry")?.addEventListener("click",()=>Ig(e,t)),e.querySelector(".memola-aib-discard")?.addEventListener("click",()=>{e.remove()})}}function nk(e,t,o){e.dataset.aibAction=t.key,e.dataset.aibResult=o,e.innerHTML='<div class="memola-aib-head"><span class="memola-aib-title">\u2726 '+P(t.label)+'</span><button class="memola-aib-regen" title="\u518D\u751F\u6210">\u21BB</button></div><div class="memola-aib-body">'+PP(P(o))+'</div><div class="memola-aib-foot"><button class="memola-aib-btn memola-aib-adopt" data-action="adopt">\u63A1\u7528</button><button class="memola-aib-btn memola-aib-edit" data-action="edit">\u7DE8\u96C6</button><button class="memola-aib-btn memola-aib-discard" data-action="discard">\u7834\u68C4</button></div>',e.querySelector(".memola-aib-regen")?.addEventListener("click",()=>Ig(e,t)),e.querySelector(".memola-aib-adopt")?.addEventListener("click",()=>{let n=Ce(),r=o.split(/\n+/).filter(i=>i.trim()),a=e.nextSibling;r.forEach(i=>{let s=document.createElement("p");s.textContent=i,n.insertBefore(s,a)}),e.remove(),$o(),k("AI\u30D6\u30ED\u30C3\u30AF\u3092\u63A1\u7528\u3057\u307E\u3057\u305F")}),e.querySelector(".memola-aib-edit")?.addEventListener("click",()=>{let n=e.querySelector(".memola-aib-body");n.contentEditable="true",n.focus()}),e.querySelector(".memola-aib-discard")?.addEventListener("click",()=>{e.remove(),$o()})}function PP(e){return e.replace(/\n/g,"<br>")}var kg,ak=L(()=>{"use strict";me();le();bt();vi();Mt();vt();Re();kg=[{key:"summarize",label:"\u8981\u7D04",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u5185\u5BB9\u30923\u884C\u3067\u7C21\u6F54\u306B\u8981\u7D04\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{key:"rewrite",label:"\u6539\u7A3F",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u672C\u6587\u3092\u3001\u3088\u308A\u8AAD\u307F\u3084\u3059\u304F\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u306B\u66F8\u304D\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{key:"translate",label:"\u82F1\u8A33",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u672C\u6587\u3092\u81EA\u7136\u306A\u82F1\u8A9E\u306B\u7FFB\u8A33\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{key:"actions",label:"\u30A2\u30AF\u30B7\u30E7\u30F3\u62BD\u51FA",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u5185\u5BB9\u304B\u3089\u3001ToDo\u30FB\u30A2\u30AF\u30B7\u30E7\u30F3\u30A2\u30A4\u30C6\u30E0\u3092\u7B87\u6761\u66F8\u304D\u3067\u62BD\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002"}]});function CP(e){return/^\\\\/.test(e)?"file://"+e.slice(2).replace(/\\/g,"/"):e}function Pl(e,t){let o=new Map;Array.from(e.children).forEach(i=>{let s=i.dataset?.blockId;s&&o.set(s,i)});let n=new Set,r=0;for(let i of t){n.add(i.id);let s=o.get(i.id),l;s?s.dataset.blockKind===i.kind?(AP(s,i),l=s):(l=ik(i),s.replaceWith(l)):l=ik(i);let c=e.children[r];c!==l&&e.insertBefore(l,c||null),r++}Array.from(e.children).slice(r).forEach(i=>i.remove());for(let[i,s]of o)!n.has(i)&&s.isConnected&&s.remove();let a=t.length===1&&t[0].kind==="p"&&t[0].inline.length===0;e.classList.toggle("memola-editor-empty",a)}function ik(e){let t=document.createElement("div");return t.dataset.blockId=e.id,t.dataset.blockKind=e.kind,t.dataset.blockHash=JSON.stringify(e,Hn),t.className="memola-blk memola-blk-"+e.kind,sk(t,e),t}function AP(e,t){let o=JSON.stringify(t,Hn);e.dataset.blockHash!==o&&(e.dataset.blockHash=o,sk(e,t))}function sk(e,t){switch(e.innerHTML="",t.kind){case"p":case"h1":case"h2":case"h3":{let o=document.createElement(t.kind);oa(o,t.inline),e.appendChild(o);break}case"todo":{let o=document.createElement("input");o.type="checkbox",o.className="memola-todo-cb",o.checked=t.checked;let n=document.createElement("span");n.className="memola-todo-txt",oa(n,t.inline),e.appendChild(o),e.appendChild(n);break}case"code":{let o=document.createElement("pre"),n=document.createElement("code");t.lang&&(n.className="language-"+t.lang);let r=t.text.split(`
`);for(let a=0;a<r.length;a++)r[a]&&n.appendChild(document.createTextNode(r[a])),a<r.length-1&&n.appendChild(document.createElement("br"));(t.text===""||t.text.endsWith(`
`))&&n.appendChild(document.createElement("br")),o.appendChild(n),e.appendChild(o);break}case"rule":{let o=document.createElement("hr");e.appendChild(o);break}case"quote":{let o=document.createElement("blockquote"),n=document.createElement("div");for(Pl(n,t.children);n.firstChild;)o.appendChild(n.firstChild);e.appendChild(o);break}case"callout":{let o=document.createElement("span");o.className="memola-callout-ic",o.contentEditable="false",o.textContent=t.emoji;let n=document.createElement("div");n.className="memola-callout-body",Pl(n,t.children),e.appendChild(o),e.appendChild(n);break}case"list":{let o=document.createElement(t.ordered?"ol":"ul");for(let n of t.items){let r=document.createElement("li");Pl(r,n),o.appendChild(r)}e.appendChild(o);break}case"table":{e.contentEditable="false";let o=document.createElement("table");o.className="memola-itbl",o.dataset.hrow=t.hrow?"1":"0",o.dataset.hcol=t.hcol?"1":"0";let n=t.rows[0]?.length||0;if(n>0){let i=document.createElement("colgroup");for(let s=0;s<n;s++){let l=document.createElement("col"),c=t.colWidths?.[s];typeof c=="number"&&c>0&&(l.style.width=c+"px"),i.appendChild(l)}o.appendChild(i)}let r=document.createElement("tbody");for(let i=0;i<t.rows.length;i++){let s=t.rows[i],l=document.createElement("tr");for(let c=0;c<s.length;c++){let m=document.createElement("td");m.contentEditable="true";let p=t.cellBg?.[i]?.[c];p&&(m.style.background=p),oa(m,s[c]),l.appendChild(m)}r.appendChild(l)}o.appendChild(r);let a=document.createElement("div");a.className="memola-itbl-wrap",a.appendChild(o),e.appendChild(a);break}case"linkdb":{e.contentEditable="false";let o=document.createElement("div");o.className="memola-linkdb",o.dataset.dbId=t.dbId,o.dataset.view=t.view,t.filter&&(o.dataset.filter=t.filter),t.sort&&(o.dataset.sort=t.sort),e.appendChild(o),Promise.resolve().then(()=>(ek(),Qw)).then(n=>n.renderAllLinkedDbs(e));break}case"ai":{e.contentEditable="false";let o=document.createElement("div");o.className="memola-ai-block",o.dataset.aibAction=t.prompt,o.dataset.aibResult=t.result,e.appendChild(o),Promise.resolve().then(()=>(ak(),rk)).then(n=>n.reattachAiBlocks(e));break}case"image":{e.contentEditable="false";let o=document.createElement("span");o.className="memola-img-wrap";let n=document.createElement("img");n.src=t.src,n.alt=t.alt,n.className="memola-img",typeof t.width=="number"&&t.width>0&&(n.style.width=t.width+"px",o.style.width=t.width+"px"),o.appendChild(n);let r=document.createElement("span");r.className="memola-img-resize",r.contentEditable="false",o.appendChild(r),e.appendChild(o);break}case"email":{e.contentEditable="false";let o=document.createElement("div");o.className="memola-email-chip",o.contentEditable="false";let n=document.createElement("span");n.className="memola-email-ic",n.textContent="\u{1F4E7}";let r=document.createElement("div");r.className="memola-email-body";let a=document.createElement("div");a.className="memola-email-subj",a.textContent=t.subject||"(\u4EF6\u540D\u306A\u3057)";let i=document.createElement("div");i.className="memola-email-meta",i.textContent=[t.from,t.date].filter(Boolean).join(" \u30FB "),r.append(a),i.textContent&&r.append(i);let s=document.createElement("button");s.className="memola-email-src",s.type="button",s.innerHTML=$.external,s.title="Outlook \u3067\u3053\u306E\u30E1\u30FC\u30EB\u3092\u958B\u304F (InternetMessageId \u691C\u7D22)",s.dataset.emailSrc=t.imid,t.imid||(s.disabled=!0,s.title="Message-Id \u304C\u53D6\u5F97\u3067\u304D\u306A\u304B\u3063\u305F\u305F\u3081\u958B\u3051\u307E\u305B\u3093"),o.append(n,r,s),e.appendChild(o);break}}}function oa(e,t){if(t.length===0){e.appendChild(document.createElement("br"));return}for(let o of t)e.appendChild(BP(o));t[t.length-1].kind==="br"&&e.appendChild(document.createElement("br"))}function BP(e){switch(e.kind){case"text":return document.createTextNode(e.text);case"br":return document.createElement("br");case"code":{let t=document.createElement("code");return t.textContent=e.text,t}case"bold":{let t=document.createElement("strong");return oa(t,e.children),t}case"italic":{let t=document.createElement("em");return oa(t,e.children),t}case"strike":{let t=document.createElement("s");return oa(t,e.children),t}case"link":{let t=document.createElement("a");return t.dataset.href=e.href,t.href=CP(e.href),t.title=e.href,/^https?:/i.test(t.getAttribute("href")||"")&&(t.target="_blank",t.rel="noopener noreferrer"),oa(t,e.children),t}case"pagelink":{let t=document.createElement("a");return t.className="memola-page-link",t.dataset.pageId=e.pageId,t.contentEditable="false",t.textContent=e.alias||e.pageId,t}case"dailylink":{let t=document.createElement("a");return t.className="memola-page-link memola-daily-link",t.dataset.dailyDate=e.date,t.contentEditable="false",t.textContent=e.alias||e.date,t}}}var lk=L(()=>{"use strict";xr();Qa()});function ck(e){let t=e;for(;t;){if(t.nodeType===1){let o=t;if(o.dataset?.blockId)return o}t=t.parentNode}return null}function dk(e,t,o){let n=0,r=-1,a=i=>{if(i===t){if(i.nodeType===3)return r=n+Math.min(o,(i.textContent||"").length),!0;let c=0;for(let m of Array.from(i.childNodes)){if(c===o)return r=n,!0;if(a(m))return!0;c++}return r=n,!0}if(i.nodeType===3)return n+=(i.textContent||"").length,!1;if(i.nodeType!==1)return!1;let s=i;if(s.tagName.toLowerCase()==="br")return n+=1,!1;if(s.classList.contains("memola-page-link"))return n+=(s.textContent||"").length,!1;for(let c of Array.from(s.childNodes))if(a(c))return!0;return!1};for(let i of Array.from(e.childNodes))if(a(i))break;return r}function Ko(e){let t=window.getSelection();if(!t||t.rangeCount===0)return null;let o=t.getRangeAt(0);if(!e.contains(o.startContainer))return null;let n=ck(o.startContainer),r=ck(o.endContainer);if(!n||!r)return null;let a=dk(n,o.startContainer,o.startOffset),i=dk(r,o.endContainer,o.endOffset);return a<0||i<0?null:o.collapsed?{kind:"caret",blockId:n.dataset.blockId,offset:a}:{kind:"range",anchorBlockId:n.dataset.blockId,anchorOffset:a,focusBlockId:r.dataset.blockId,focusOffset:i}}function Eg(e,t){let o=0,n=null,r=a=>{if(n)return!0;if(a.nodeType===3){let l=(a.textContent||"").length;return o+l>=t?(n={node:a,offset:t-o},!0):(o+=l,!1)}if(a.nodeType!==1)return!1;let i=a;if(i.tagName.toLowerCase()==="br"){if(o+1>t){let l=i.parentNode,c=Array.from(l.childNodes).indexOf(i);return n={node:l,offset:c},!0}if(o+1===t){let l=i.parentNode,c=Array.from(l.childNodes).indexOf(i);return n={node:l,offset:c+1},!0}return o+=1,!1}if(i.classList.contains("memola-page-link")){let l=(i.textContent||"").length;if(o+l>=t){let c=i.parentNode,m=Array.from(c.childNodes).indexOf(i);return n={node:c,offset:t-o<=l/2?m:m+1},!0}return o+=l,!1}for(let l of Array.from(i.childNodes))if(r(l))return!0;return!1};for(let a of Array.from(e.childNodes))if(r(a))break;if(!n){let a=e.firstElementChild??e,i=DP(a);i?n={node:i,offset:(i.textContent||"").length}:n={node:a,offset:a.childNodes.length}}return n}function DP(e){let t=null,o=n=>{if(n.nodeType===3){t=n;return}if(n.nodeType===1)for(let r of Array.from(n.childNodes))o(r)};return o(e),t}function mk(e,t){if(e.querySelectorAll(".memola-itbl-selcel").forEach(l=>{l.classList.remove("memola-itbl-selcel")}),!t)return;if(t.kind==="table-cells"){_P(e,t);let l=window.getSelection();l&&l.removeAllRanges();return}let o=window.getSelection();if(!o)return;if(t.kind==="caret"){let l=e.querySelector('[data-block-id="'+xm(t.blockId)+'"]');if(!l)return;let c=Eg(l,t.offset);if(!c)return;let m=document.createRange();m.setStart(c.node,c.offset),m.collapse(!0),o.removeAllRanges(),o.addRange(m);return}let n=e.querySelector('[data-block-id="'+xm(t.anchorBlockId)+'"]'),r=e.querySelector('[data-block-id="'+xm(t.focusBlockId)+'"]');if(!n||!r)return;let a=Eg(n,t.anchorOffset),i=Eg(r,t.focusOffset);if(!a||!i)return;let s=document.createRange();typeof o.setBaseAndExtent=="function"?o.setBaseAndExtent(a.node,a.offset,i.node,i.offset):(s.setStart(a.node,a.offset),s.setEnd(i.node,i.offset),o.removeAllRanges(),o.addRange(s))}function _P(e,t){let n=e.querySelector('[data-block-id="'+xm(t.blockId)+'"]')?.querySelector("table.memola-itbl tbody");if(!n)return;let r=Math.min(t.anchor.row,t.focus.row),a=Math.max(t.anchor.row,t.focus.row),i=Math.min(t.anchor.col,t.focus.col),s=Math.max(t.anchor.col,t.focus.col);for(let l=r;l<=a;l++){let c=n.children[l];if(c)for(let m=i;m<=s;m++){let p=c.children[m];p&&p.classList.add("memola-itbl-selcel")}}}function xm(e){return typeof CSS<"u"&&CSS.escape?CSS.escape(e):e.replace(/[^a-zA-Z0-9_-]/g,t=>"\\"+t)}var Tg=L(()=>{"use strict"});function fk(e,t,o){let r=t.target?.closest?.('[contenteditable="false"]');if(r&&o.contains(r))return{next:e,preventDefault:!1};let a=Ko(o);if(!a)return{next:e,preventDefault:!1};switch(t.inputType){case"insertText":{let i=t.data??"";if(a.kind==="caret")return{next:Hr(e,a.blockId,a.offset,i),preventDefault:!0};let s=Cl(e,a);return s.cursor?{next:Hr(s.state,s.cursor.blockId,s.cursor.offset,i),preventDefault:!0}:{next:e,preventDefault:!1}}case"insertParagraph":{if(a.kind==="caret"&&uk(e,a.blockId)){let c=HP(e,a.blockId,a.offset);return c?{next:c,preventDefault:!0}:{next:Hr(e,a.blockId,a.offset,`
`),preventDefault:!0}}if(a.kind!=="caret"){let c=Cl(e,a);return c.cursor?{next:Xu(c.state,c.cursor.blockId,c.cursor.offset),preventDefault:!0}:{next:e,preventDefault:!1}}let i=RP(e,a.blockId);if(i)return{next:i,preventDefault:!0};let s=UP(e,a.blockId);return s?{next:s,preventDefault:!0}:{next:Xu(e,a.blockId,a.offset),preventDefault:!0}}case"insertLineBreak":{if(a.kind==="caret"&&uk(e,a.blockId))return{next:Hr(e,a.blockId,a.offset,`
`),preventDefault:!0};if(a.kind==="caret")return{next:Yu(e,a.blockId,a.offset),preventDefault:!0};let i=Cl(e,a);return i.cursor?{next:Yu(i.state,i.cursor.blockId,i.cursor.offset),preventDefault:!0}:{next:e,preventDefault:!1}}case"deleteContentBackward":{if(a.kind==="caret"){if(a.offset>0){let f=NP(e,a.blockId,a.offset),g=f>0?-f:-1;return{next:ni(e,a.blockId,a.offset,g),preventDefault:!0}}let s=$P(e,a.blockId);if(s)return{next:s,preventDefault:!0};let l=VP(e,a.blockId);if(l)return{next:l,preventDefault:!0};let c=zP(e,a.blockId);if(c)return{next:c,preventDefault:!0};let m=hd(e,a.blockId);if(m!==e)return{next:m,preventDefault:!0};let p=FP(e,a.blockId);if(p)return{next:p,preventDefault:!0};let u=KP(e,a.blockId);return u?{next:u,preventDefault:!0}:{next:e,preventDefault:!0}}return{next:Cl(e,a).state,preventDefault:!0}}case"deleteContentForward":{if(a.kind==="caret"){let s=OP(e,a.blockId,a.offset),l=s>0?s:1;return{next:ni(e,a.blockId,a.offset,l),preventDefault:!0}}return{next:Cl(e,a).state,preventDefault:!0}}default:return{next:e,preventDefault:!1}}}function Cl(e,t){if(t.kind!=="range")return{state:e,cursor:null};if(t.anchorBlockId===t.focusBlockId){let g=Math.min(t.anchorOffset,t.focusOffset),y=Math.max(t.anchorOffset,t.focusOffset);return{state:ni(e,t.anchorBlockId,g,y-g),cursor:{blockId:t.anchorBlockId,offset:g}}}let o=e.blocks,n=o.findIndex(g=>g.id===t.anchorBlockId),r=o.findIndex(g=>g.id===t.focusBlockId);if(n<0||r<0)return{state:e,cursor:null};let a=Math.min(n,r),i=Math.max(n,r),s=n<=r?t.anchorOffset:t.focusOffset,l=n<=r?t.focusOffset:t.anchorOffset,c=o[a],m=o[i];if(!("inline"in c)||!("inline"in m))return{state:e,cursor:null};let p=[...pk(c.inline,0,s),...pk(m.inline,l,Number.POSITIVE_INFINITY)],u={...c,inline:p},f=[...o.slice(0,a),u,...o.slice(i+1)];return{state:{...e,blocks:f},cursor:{blockId:u.id,offset:s}}}function pk(e,t,o){return Le(e,t,o)}function RP(e,t){let o=gk(e,t);if(!o)return null;let n=o.inner;if(!("inline"in n)||vo(n.inline)>0)return null;let r=e.blocks.slice(),a=r[o.outerIdx],i=null;if(a.kind==="callout"||a.kind==="quote"){let c=a.children.filter(m=>m.id!==t);c.length>0&&(i={...a,children:c})}else if(a.kind==="list"){let c=a.items.map(m=>m.filter(p=>p.id!==t)).filter(m=>m.length>0);c.length>0&&(i={...a,items:c})}else return null;i?r[o.outerIdx]=i:r.splice(o.outerIdx,1);let s=rt(""),l=i?o.outerIdx+1:o.outerIdx;return r.splice(l,0,s),{...e,blocks:r,selection:{kind:"caret",blockId:s.id,offset:0}}}function NP(e,t,o){let n=e.blocks.find(a=>a.id===t);if(!n||!("inline"in n))return 0;let r=0;for(let a of n.inline){let i=0;if(a.kind==="text"||a.kind==="code"?i=a.text.length:a.kind==="br"?i=1:a.kind==="pagelink"?i=(a.alias||a.pageId).length:a.kind==="dailylink"?i=(a.alias||a.date).length:"children"in a&&(i=Lg(a.children)),r+i===o)return a.kind==="pagelink"||a.kind==="dailylink"?i:0;if(r+i>o)return 0;r+=i}return 0}function OP(e,t,o){let n=e.blocks.find(a=>a.id===t);if(!n||!("inline"in n))return 0;let r=0;for(let a of n.inline){let i=0;if(a.kind==="text"||a.kind==="code"?i=a.text.length:a.kind==="br"?i=1:a.kind==="pagelink"?i=(a.alias||a.pageId).length:a.kind==="dailylink"?i=(a.alias||a.date).length:"children"in a&&(i=Lg(a.children)),r===o)return a.kind==="pagelink"||a.kind==="dailylink"?i:0;if(r>o)return 0;r+=i}return 0}function Lg(e){let t=0;for(let o of e)o.kind==="text"||o.kind==="code"?t+=o.text.length:o.kind==="br"?t+=1:o.kind==="pagelink"?t+=(o.alias||o.pageId).length:o.kind==="dailylink"?t+=(o.alias||o.date).length:"children"in o&&(t+=Lg(o.children));return t}function HP(e,t,o){let n=e.blocks.findIndex(m=>m.id===t);if(n<0)return null;let r=e.blocks[n];if(r.kind!=="code"||o!==r.text.length||!(r.text===""||r.text.endsWith(`
`)))return null;let i=r.text.endsWith(`
`)?r.text.slice(0,-1):r.text,s=Q(),l={id:s,kind:"p",inline:[]},c=e.blocks.slice();return c[n]={...r,text:i},c.splice(n+1,0,l),{...e,blocks:c,selection:{kind:"caret",blockId:s,offset:0}}}function uk(e,t){if(e.blocks.find(r=>r.id===t)?.kind==="code")return!0;let n=e.blocks.slice();for(;n.length;){let r=n.shift();if(r.id===t)return r.kind==="code";if(r.kind==="callout"||r.kind==="quote")n.push(...r.children);else if(r.kind==="list")for(let a of r.items)n.push(...a)}return!1}function FP(e,t){let o=e.blocks.findIndex(a=>a.id===t);if(o<0)return null;let n=e.blocks[o];if(n.kind!=="code"||n.text!=="")return null;let r=e.blocks.slice();return r[o]={id:n.id,kind:"p",inline:[]},{...e,blocks:r,selection:{kind:"caret",blockId:n.id,offset:0}}}function UP(e,t){let o=e.blocks.findIndex(a=>a.id===t);if(o<0)return null;let n=e.blocks[o];if(n.kind!=="todo"||vo(n.inline)>0)return null;let r=e.blocks.slice();return r[o]={id:n.id,kind:"p",inline:[]},{...e,blocks:r,selection:{kind:"caret",blockId:n.id,offset:0}}}function zP(e,t){for(let o=0;o<e.blocks.length;o++){let n=e.blocks[o];if(n.kind==="list"){let r=jP(e,n,o,t);if(r)return r}else if(n.kind==="quote"||n.kind==="callout"){let r=qP(e,n,o,t);if(r)return r}}return null}function jP(e,t,o,n){for(let r=0;r<t.items.length;r++){let a=t.items[r],i=a.findIndex(p=>p.id===n);if(i<0)continue;let s=a[i];if(!("inline"in s)||vo(s.inline)>0)return null;if(a.length>1){let p=a.filter(y=>y.id!==n),u=t.items.slice();u[r]=p;let f=e.blocks.slice();f[o]={...t,items:u};let g=p[Math.max(0,i-1)];return"inline"in g?{...e,blocks:f,selection:{kind:"caret",blockId:g.id,offset:vo(g.inline)}}:null}let l=t.items.filter((p,u)=>u!==r),c=e.blocks.slice();if(l.length===0){let p={id:n,kind:"p",inline:[]};return c.splice(o,1,p),{...e,blocks:c,selection:{kind:"caret",blockId:n,offset:0}}}if(c[o]={...t,items:l},r>0){let p=l[r-1],u=p[p.length-1];if("inline"in u)return{...e,blocks:c,selection:{kind:"caret",blockId:u.id,offset:vo(u.inline)}}}let m=l[0][0];return{...e,blocks:c,selection:{kind:"caret",blockId:m.id,offset:0}}}return null}function qP(e,t,o,n){let r=t.children.findIndex(c=>c.id===n);if(r<0)return null;let a=t.children[r];if(!("inline"in a)||vo(a.inline)>0)return null;let i=t.children.filter(c=>c.id!==n),s=e.blocks.slice();if(i.length===0){let c={id:n,kind:"p",inline:[]};return s.splice(o,1,c),{...e,blocks:s,selection:{kind:"caret",blockId:n,offset:0}}}if(s[o]={...t,children:i},r>0){let c=i[r-1];if("inline"in c)return{...e,blocks:s,selection:{kind:"caret",blockId:c.id,offset:vo(c.inline)}}}let l=i[0];return{...e,blocks:s,selection:{kind:"caret",blockId:l.id,offset:0}}}function $P(e,t){let o=e.blocks.findIndex(n=>n.id===t);if(o<0)return null;if(e.blocks[o].kind==="image"||e.blocks[o].kind==="email"){let n=e.blocks.slice();if(n.splice(o,1),n.length===0){let i=rt("");return{...e,blocks:[i],selection:{kind:"caret",blockId:i.id,offset:0}}}let r=o>0?n[o-1]:n[o],a="inline"in r?vo(r.inline):0;return{...e,blocks:n,selection:{kind:"caret",blockId:r.id,offset:a}}}if(o>0&&(e.blocks[o-1].kind==="image"||e.blocks[o-1].kind==="email")){let n=e.blocks.slice();return n.splice(o-1,1),{...e,blocks:n,selection:{kind:"caret",blockId:t,offset:0}}}return null}function KP(e,t){let o=e.blocks.findIndex(n=>n.id===t);if(o>0){let n=e.blocks[o],r=e.blocks[o-1];if(!("inline"in n))return null;if(r.kind==="code"){let a=St(n.inline),i=r.text===""||r.text.endsWith(`
`)?"":`
`,s=r.text+i+a,l=e.blocks.slice();return l[o-1]={...r,text:s},l.splice(o,1),{...e,blocks:l,selection:{kind:"caret",blockId:r.id,offset:r.text.length+i.length}}}if(r.kind==="list"&&r.items.length>0){let a=r.items[r.items.length-1],i=a[a.length-1];if(!("inline"in i))return null;let s=vo(i.inline),l=Le(i.inline.concat(n.inline),0,1/0),c={...i,inline:l},m=[...a.slice(0,-1),c],p=[...r.items.slice(0,-1),m],u={...r,items:p},f=e.blocks.slice();return f[o-1]=u,f.splice(o,1),{...e,blocks:f,selection:{kind:"caret",blockId:i.id,offset:s}}}if("inline"in r){let a=vo(r.inline),i={...r,inline:Le(r.inline.concat(n.inline),0,1/0)},s=e.blocks.slice();return s[o-1]=i,s.splice(o,1),{...e,blocks:s,selection:{kind:"caret",blockId:r.id,offset:a}}}}return null}function VP(e,t){let o=gk(e,t);if(!o)return null;let n=e.blocks[o.outerIdx];if(n.kind==="callout"||n.kind==="quote"){if(n.children.length!==1)return null;let r=e.blocks.slice();return r.splice(o.outerIdx,1,o.inner),{...e,blocks:r,selection:{kind:"caret",blockId:o.inner.id,offset:0}}}if(n.kind==="list"){if(n.items.length!==1||n.items[0].length!==1)return null;let r=e.blocks.slice();return r.splice(o.outerIdx,1,o.inner),{...e,blocks:r,selection:{kind:"caret",blockId:o.inner.id,offset:0}}}return null}function gk(e,t){for(let o=0;o<e.blocks.length;o++){let n=e.blocks[o];if(n.id===t)return null;if(n.kind==="callout"||n.kind==="quote"){let r=n.children.find(a=>a.id===t);if(r)return{outerIdx:o,inner:r}}if(n.kind==="list")for(let r of n.items){let a=r.find(i=>i.id===t);if(a)return{outerIdx:o,inner:a}}}return null}var hk=L(()=>{"use strict";Ro();tn();Tg()});var wm,bk=L(()=>{"use strict";wm=class{constructor(){this._undo=[];this._redo=[]}reset(t){this._undo=[{state:t,tag:"init",at:Date.now(),blockId:null}],this._redo=[]}push(t,o,n=null){let r=this._undo[this._undo.length-1],a=Date.now();!!r&&(o==="typing"||o==="delete")&&r.tag===o&&r.blockId===n&&a-r.at<750?r.state=t:(this._undo.push({state:t,tag:o,at:a,blockId:n}),this._undo.length>200&&this._undo.shift()),this._redo=[]}canUndo(){return this._undo.length>1}canRedo(){return this._redo.length>0}undo(){if(this._undo.length<=1)return null;let t=this._undo.pop();return this._redo.push(t),this._undo[this._undo.length-1].state}redo(){let t=this._redo.pop();return t?(this._undo.push(t),t.state):null}current(){let t=this._undo[this._undo.length-1];return t?t.state:null}}});function vk(e,t={}){let o=new wm,n=ky,r=new Set,a=!1,i=null;e.contentEditable="true",e.classList.add("memola-editor2");function s(h,v="mutate"){if(h===n)return;n=h;let w=h.selection,x=w?.kind==="caret"?w.blockId:w?.kind==="range"?w.focusBlockId:null;o.push(n,v,x),l(),c()}function l(){Pl(e,n.blocks),mk(e,n.selection)}function c(){for(let h of r)try{h(n.blocks)}catch{}}let m=h=>{if(a)return;let v=fk(n,h,e);if(v.preventDefault&&h.preventDefault(),v.next!==n){let w=h.inputType.startsWith("insert")?"typing":h.inputType.startsWith("delete")?"delete":"structural";s(v.next,w)}},p=()=>{a=!0,e.classList.remove("memola-editor-empty");let h=Ko(e);h?.kind==="caret"?i={blockId:h.blockId,offset:h.offset}:i=null},u=h=>{a=!1;let v=h.data||"";if(!i||!v){i=null,l();return}let w=i;i=null;let x=Hr(n,w.blockId,w.offset,v);s(x,"typing")},f=()=>{if(a)return;let h=Ko(e);h&&(n={...n,selection:h})},g=h=>{let v=h.metaKey||h.ctrlKey;if(v&&h.key==="z"&&!h.shiftKey){h.preventDefault();let w=o.undo();w&&(n=w,l(),c());return}if(v&&h.key==="z"&&h.shiftKey||v&&h.key==="y"){h.preventDefault();let w=o.redo();w&&(n=w,l(),c());return}if(h.key==="Tab"&&!v){let w=n.selection,x=w?.kind==="caret"?w.blockId:w?.kind==="range"?w.focusBlockId:null;if(x){let T=h.shiftKey?hd(n,x):Py(n,x);if(T!==n){h.preventDefault(),s(T,"structural");return}}}},y=h=>{let v=h.target;if(!v.classList.contains("memola-todo-cb"))return;let w=v.closest("[data-block-id]");if(!w)return;let x=w.dataset.blockId;s(Ju(n,x),"structural")};return e.addEventListener("beforeinput",m),e.addEventListener("compositionstart",p),e.addEventListener("compositionend",u),e.addEventListener("keydown",g),e.addEventListener("change",y),document.addEventListener("selectionchange",f),{setBlocks(h,v={}){n={blocks:h,selection:null},o.reset(n),l(),v.silent||c()},getBlocks(){return n.blocks},getSelection(){return n.selection},reconcile(h){let v=Ko(e)??n.selection;n={blocks:h,selection:v},l(),c()},isComposing(){return a},subscribe(h){return r.add(h),()=>r.delete(h)},destroy(){e.removeEventListener("beforeinput",m),e.removeEventListener("compositionstart",p),e.removeEventListener("compositionend",u),e.removeEventListener("keydown",g),e.removeEventListener("change",y),document.removeEventListener("selectionchange",f),r.clear(),e.contentEditable="false",e.classList.remove("memola-editor2"),a=!1,i=null},rerender:l,applyMutation(h,v="structural"){let w=h(n);s(w,v)},toggleTodoBlock(h){s(Ju(n,h),"structural")},setBlockKind(h,v){s(pn(n,h,v),"structural")},toggleInlineFormat(h){let w=Ko(e)??n.selection;if(!w||w.kind!=="range"||w.anchorBlockId!==w.focusBlockId)return;let x=Math.min(w.anchorOffset,w.focusOffset),T=Math.max(w.anchorOffset,w.focusOffset),E={...n,selection:{kind:"range",anchorBlockId:w.anchorBlockId,anchorOffset:x,focusBlockId:w.anchorBlockId,focusOffset:T}};s(Ey(E,w.anchorBlockId,x,T,h),"structural")},insertPagelink(h,v){let w=Ko(e);!w||w.kind!=="caret"||s(ri(n,w.blockId,w.offset,h,v),"structural")},setLink(h){let w=Ko(e)??n.selection;if(w)if(w.kind==="range"&&w.anchorBlockId===w.focusBlockId){let x=Math.min(w.anchorOffset,w.focusOffset),T=Math.max(w.anchorOffset,w.focusOffset),E={...n,selection:{kind:"range",anchorBlockId:w.anchorBlockId,anchorOffset:x,focusBlockId:w.anchorBlockId,focusOffset:T}};s(Ly(E,w.anchorBlockId,x,T,h),"structural")}else w.kind==="caret"&&h&&s(Sy(n,w.blockId,w.offset,h),"structural")},insertBlockAfterCurrent(h){let v=Ko(e),w=v?.kind==="caret"?v.blockId:v?.kind==="range"?v.focusBlockId:n.blocks[n.blocks.length-1]?.id;if(!w){s({blocks:[...n.blocks,h],selection:{kind:"caret",blockId:h.id,offset:0}},"structural");return}s(ai(n,w,h),"structural")},undo(){let h=o.undo();return h?(n=h,l(),c(),!0):!1},redo(){let h=o.redo();return h?(n=h,l(),c(),!0):!1}}}var yk=L(()=>{"use strict";Ro();lk();Tg();hk();bk()});var Tk={};j(Tk,{hide:()=>aa,markBrokenPageLinks:()=>XP,pagePickerActive:()=>Ag,pagePickerCommit:()=>Ek,pagePickerCount:()=>Ik,pagePickerMove:()=>Mg,showPagePicker:()=>Pi,updatePagePickerQuery:()=>Cg});function xk(e){let t=d.currentId,o=!!t&&B(t)?.scope==="org",n=r=>{if(r.IsDraft||r.Id===t)return!1;let a=B(r.Id);return!(a?.isTemplate||o&&a?.scope!=="org")};return e.dbsOnly?d.pages.filter(r=>r.Type==="database"&&n(r)):d.pages.filter(n)}function WP(){let e=document.getElementById("memola-page-picker");return e||(e=document.createElement("div"),e.id="memola-page-picker",e.className="memola-page-picker",e.style.display="none",(document.getElementById("memola-overlay")||document.body).appendChild(e),e)}function wk(e,t){let o=e.trim().toLowerCase(),n=(t??d.pages).filter(i=>!B(i.Id)?.trashed);if(!o)return n.slice(0,8);let r=i=>(i||"").toLowerCase();return n.map(i=>{let s=r(i.Title||""),l=-1;return s===o?l=100:s.startsWith(o)?l=80:s.includes(" "+o)?l=60:s.includes(o)&&(l=40),{p:i,score:l}}).filter(i=>i.score>=0).sort((i,s)=>s.score-i.score).slice(0,8).map(i=>i.p)}function GP(e){let t=[],o=e,n=0;for(;o&&n++<12;){let r=B(o);if(!r)break;if(r.parent){let a=B(r.parent);a&&t.unshift(a.title)}o=r.parent||""}return t.join(" / ")}function Pg(){if(!ve)return;let{el:e,filtered:t,selIdx:o,opts:n}=ve;if(e.innerHTML="",t.length===0){let s=document.createElement("div");s.className="memola-page-picker-empty",s.textContent="\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093",e.appendChild(s)}else t.forEach((s,l)=>{let m=B(s.Id)?.icon||(s.Type==="database"?"\u{1F5C3}":"\u{1F4C4}"),p=GP(s.Id),u=document.createElement("div");u.className="memola-page-picker-item"+(l===o?" sel":""),u.innerHTML='<span class="memola-page-picker-icon">'+P(m)+'</span><span class="memola-page-picker-name">'+P(s.Title||"\u7121\u984C")+"</span>"+(p?'<span class="memola-page-picker-path">'+P(p)+"</span>":""),u.addEventListener("mousedown",f=>{f.preventDefault(),kk(l)}),e.appendChild(u)});let r=n.anchor.bottom+window.scrollY+4,a=n.anchor.left+window.scrollX,i=window.innerWidth;a+320>i&&(a=i-324),e.style.top=r+"px",e.style.left=a+"px",e.style.display=""}function kk(e){if(!ve)return;let t=ve.filtered[e];if(!t)return;let o=ve.opts.onSelect;aa(!0),o(t)}function Pi(e){aa();let t=WP(),o=e.query||"",n=xk(e);ve={el:t,opts:e,query:o,filtered:wk(o,n),selIdx:0},Pg(),na&&document.removeEventListener("mousedown",na,!0),na=r=>{if(!ve)return;let a=r.target;a&&(ve.el.contains(a)||aa())},document.addEventListener("mousedown",na,!0),ra&&document.removeEventListener("keydown",ra,!0),ra=r=>{if(ve&&!(r.isComposing||r.keyCode===229)){if(r.key==="Escape"){r.preventDefault(),r.stopPropagation(),aa();return}if(r.key==="ArrowDown"){r.preventDefault(),r.stopPropagation(),Mg(1);return}if(r.key==="ArrowUp"){r.preventDefault(),r.stopPropagation(),Mg(-1);return}if(r.key==="Enter"){Ik()>0&&(r.preventDefault(),r.stopPropagation(),Ek());return}}},document.addEventListener("keydown",ra,!0)}function Cg(e){ve&&(ve.query=e,ve.filtered=wk(e,xk(ve.opts)),ve.selIdx>=ve.filtered.length&&(ve.selIdx=0),Pg())}function Ag(){return!!ve}function Ik(){return ve?ve.filtered.length:0}function Mg(e){if(!ve||ve.filtered.length===0)return;let t=ve.filtered.length;ve.selIdx=(ve.selIdx+e+t)%t,YP(),Pg()}function YP(){if(ve&&(ve.el.classList.add("kb-mode"),!Sg)){let e=()=>{ve&&ve.el.classList.remove("kb-mode"),document.removeEventListener("mousemove",e,!0),Sg=null};Sg=e,document.addEventListener("mousemove",e,!0)}}function Ek(){ve&&kk(ve.selIdx)}function XP(e){let t=e.querySelectorAll("a.memola-page-link"),o=new Set;t.forEach(n=>{let r=n.getAttribute("data-page-id")||"",a=n.getAttribute("data-pending")==="1",i=n.getAttribute("data-daily-date")||"";if(i){n.classList.add("ghosted"),o.add(i);return}if(r){let s=d.pages.some(l=>l.Id===r);n.classList.toggle("broken",!s)}else if(a){let s=(n.textContent||"").trim(),l=d.pages.find(c=>(c.Title||"")===s);l?(n.setAttribute("data-page-id",l.Id),n.removeAttribute("data-pending"),n.classList.remove("broken")):n.classList.add("broken")}}),o.size!==0&&(async()=>{try{let n=await Promise.resolve().then(()=>(_n(),Ka));for(let r of o)await n.findNoteForDate(r).catch(()=>null)&&e.querySelectorAll('a.memola-page-link[data-daily-date="'+r+'"]').forEach(i=>i.classList.remove("ghosted"))}catch{}})()}function aa(e=!1){if(ve){ve.el.style.display="none";let t=ve.opts.onCancel;ve=null,!e&&t&&t()}else ve=null;na&&(document.removeEventListener("mousedown",na,!0),na=null),ra&&(document.removeEventListener("keydown",ra,!0),ra=null)}var ve,na,ra,Sg,km=L(()=>{"use strict";q();Re();we();ve=null,na=null,ra=null;Sg=null});function Sk(e){let o=document.querySelector('[data-block-id="'+CSS.escape(e)+'"]')?.getBoundingClientRect();return o?{bottom:o.bottom,left:o.left}:{bottom:window.innerHeight/2,left:window.innerWidth/2}}function JP(e,t){Pi({anchor:Sk(t),onSelect:o=>{e.applyMutation(n=>{let r=n.blocks.findIndex(l=>l.id===t);if(r<0)return n;let a=n.blocks.slice(),i=a[r];"inline"in i&&(a[r]={...i,inline:[]});let s={...n,blocks:a,selection:{kind:"caret",blockId:t,offset:0}};return ri(s,t,0,o.Id,o.Title||"")},"structural")}})}function ZP(e,t){Pi({anchor:Sk(t),dbsOnly:!0,onSelect:o=>{e.applyMutation(n=>{let r=n.blocks.findIndex(s=>s.id===t);if(r<0)return n;let a=Fy(o.Id),i=n.blocks.slice();return i[r]=a,{...n,blocks:i,selection:{kind:"caret",blockId:a.id,offset:0}}},"structural")}})}function ia(e,t,o){let n=e.blocks.findIndex(a=>a.id===t);if(n<0)return e;let r=e.blocks.slice();return r[n]=o,{...e,blocks:r,selection:{kind:"caret",blockId:o.id,offset:0}}}function Mk(e,t){let o=null,n=null,r="",a=0;function i(v){let x=e.getBlocks().find(E=>E.id===v);return!x||x.kind!=="p"?!1:x.inline.map(E=>E.kind==="text"?E.text:"").join("")===""}function s(){let v=window.getSelection();if(!v||v.rangeCount===0)return null;let w=v.getRangeAt(0).getBoundingClientRect();return w.width===0&&w.height===0?v.anchorNode?.parentElement?.closest("[data-block-id]")?.getBoundingClientRect()||null:w}function l(v){n=v,r="",a=0,o||(o=document.createElement("div"),o.className="memola-slash memola-slash2",o.style.cssText='position:absolute; z-index:2147483647; min-width:260px; max-width:320px; background:#fff; border:1px solid #e9e9e7; border-radius:6px; box-shadow:0 8px 24px rgba(0,0,0,0.12); max-height:340px; overflow-y:auto; font-size:14px; line-height:1.4; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Hiragino Sans","Noto Sans JP",sans-serif; color:#37352f;',(document.getElementById("memola-overlay")||document.body).appendChild(o));let w=s();w&&(o.style.top=w.bottom+window.scrollY+4+"px",o.style.left=w.left+window.scrollX+"px"),u()}function c(){o&&(o.remove(),o=null),n=null,r=""}function m(){return!!o}function p(){if(!r)return Lk;let v=r.toLowerCase();return Lk.filter(w=>w.cmd.toLowerCase().includes(v)||w.label.toLowerCase().includes(v)||w.hint&&w.hint.toLowerCase().startsWith(v))}function u(){if(!o)return;let v=p();if(a>=v.length&&(a=0),v.length===0){o.innerHTML='<div style="padding:12px; color:#9b9a97; font-size:13px;">\u8A72\u5F53\u306A\u3057</div>';return}o.innerHTML="",v.forEach((x,T)=>{let E=document.createElement("div");E.className="memola-slash2-item"+(T===a?" on":""),E.style.cssText="padding:6px 10px; cursor:pointer; display:flex; align-items:center; gap:8px;"+(T===a?"background:#f1f1ef;":""),E.innerHTML='<div style="flex:1; min-width:0;"><div style="font-weight:500; font-size:14px;">'+Bg(x.label)+'</div><div style="font-size:11px; color:#9b9a97;">'+Bg(x.desc)+"</div></div>"+(x.hint?'<div style="font-family:ui-monospace,monospace; font-size:11px; color:#9b9a97; flex-shrink:0;">'+Bg(x.hint)+"</div>":""),E.addEventListener("mousedown",C=>{C.preventDefault(),f(x)}),o.appendChild(E)}),o.children[a]?.scrollIntoView({block:"nearest",inline:"nearest"})}function f(v){if(!n){c();return}let w=n;if(v.pickAndApply){c(),v.pickAndApply(e,w);return}if(!v.apply){c();return}let x=v.apply;e.applyMutation(T=>{let E=T.blocks.findIndex(N=>N.id===w);if(E<0)return x(T,w);let C=T.blocks.slice(),U=C[E];"inline"in U&&(C[E]={...U,inline:[]});let M={...T,blocks:C,selection:{kind:"caret",blockId:w,offset:0}};return x(M,w)},"structural"),c()}function g(){let v=p();v[a]&&f(v[a])}let y=v=>{if(m()){if(v.key==="Escape"){v.preventDefault(),c();return}if(v.key==="ArrowDown"){v.preventDefault(),a=Math.min(a+1,p().length-1),u();return}if(v.key==="ArrowUp"){v.preventDefault(),a=Math.max(a-1,0),u();return}if(v.key==="Enter"){v.preventDefault(),g();return}if(v.key==="Backspace"){if(r.length===0){v.preventDefault();let w=n;w&&e.applyMutation(x=>{let T=x.blocks.findIndex(U=>U.id===w);if(T<0)return x;let E=x.blocks.slice(),C=E[T];return"inline"in C&&(E[T]={...C,inline:[]}),{...x,blocks:E,selection:{kind:"caret",blockId:w,offset:0}}},"structural"),c();return}r=r.slice(0,-1),u();return}if(v.key.length===1&&!v.metaKey&&!v.ctrlKey&&!v.altKey){r+=v.key,u();return}}};t.addEventListener("keydown",y,!0);let b=e.subscribe(v=>{if(m())return;let w=window.getSelection();if(!w||w.rangeCount===0)return;let x=w.getRangeAt(0);if(!x.collapsed)return;let T=x.startContainer?.parentElement?.closest("[data-block-id]");if(!T)return;let E=T.dataset.blockId;if(!E)return;let C=e.getBlocks().find(M=>M.id===E);if(!C||C.kind!=="p")return;C.inline.map(M=>M.kind==="text"?M.text:"").join("")==="/"&&l(E)}),h=v=>{if(!m())return;let w=v.target;o?.contains(w)||c()};return document.addEventListener("mousedown",h,!0),{destroy(){c(),t.removeEventListener("keydown",y,!0),document.removeEventListener("mousedown",h,!0),b()}}}function Bg(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Lk,Pk=L(()=>{"use strict";Ro();km();Lk=[{cmd:"p",label:"\u30C6\u30AD\u30B9\u30C8",desc:"\u30D7\u30EC\u30FC\u30F3\u6BB5\u843D",apply:(e,t)=>pn(e,t,"p")},{cmd:"h1",label:"\u898B\u51FA\u3057 1",desc:"\u5927\u304D\u306A\u898B\u51FA\u3057",hint:"#",apply:(e,t)=>pn(e,t,"h1")},{cmd:"h2",label:"\u898B\u51FA\u3057 2",desc:"\u4E2D\u898B\u51FA\u3057",hint:"##",apply:(e,t)=>pn(e,t,"h2")},{cmd:"h3",label:"\u898B\u51FA\u3057 3",desc:"\u5C0F\u898B\u51FA\u3057",hint:"###",apply:(e,t)=>pn(e,t,"h3")},{cmd:"todo",label:"ToDo",desc:"\u30C1\u30A7\u30C3\u30AF\u30DC\u30C3\u30AF\u30B9\u4ED8\u304D",hint:"[]",apply:(e,t)=>pn(e,t,"todo")},{cmd:"ul",label:"\u7B87\u6761\u66F8\u304D",desc:"\u30FB",hint:"-",apply:(e,t)=>ia(e,t,Ks())},{cmd:"ol",label:"\u756A\u53F7\u4ED8\u304D",desc:"1.",hint:"1.",apply:(e,t)=>ia(e,t,Vs())},{cmd:"quote",label:"\u5F15\u7528",desc:"\u5F15\u7528\u30D6\u30ED\u30C3\u30AF",hint:">",apply:(e,t)=>ia(e,t,Ws())},{cmd:"callout",label:"\u30B3\u30FC\u30EB\u30A2\u30A6\u30C8",desc:"\u30D2\u30F3\u30C8 / \u6CE8\u610F\u30DC\u30C3\u30AF\u30B9",apply:(e,t)=>ia(e,t,$s())},{cmd:"pre",label:"\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF",desc:"\u6574\u5F62\u6E08\u307F\u30B3\u30FC\u30C9",hint:"```",apply:(e,t)=>ia(e,t,js())},{cmd:"hr",label:"\u533A\u5207\u308A\u7DDA",desc:"\u30BB\u30AF\u30B7\u30E7\u30F3\u533A\u5207\u308A",hint:"---",apply:(e,t)=>ai(ia(e,t,qs()),t,rt(""))},{cmd:"table",label:"\u8868",desc:"\u7C21\u6613\u8868 (3\xD72)\u30FB\u30BB\u30EB\u7DE8\u96C6\u53EF",apply:(e,t)=>ia(e,t,Hy(2,3))},{cmd:"inlinedb",label:"\u30A4\u30F3\u30E9\u30A4\u30F3DB",desc:"\u30DA\u30FC\u30B8\u306B DB \u3092\u57CB\u3081\u8FBC\u3080 (DB \u3092\u9078\u629E)",pickAndApply:ZP},{cmd:"page",label:"\u30DA\u30FC\u30B8\u30EA\u30F3\u30AF",desc:"\u5225\u306E\u30DA\u30FC\u30B8\u3078\u306E\u30EA\u30F3\u30AF\u3092\u633F\u5165",hint:"[[",pickAndApply:JP}]});function Ck(e,t){let o=null;function n(){o=null,aa()}function r(){let s=e.getBlocks(),l=window.getSelection();if(!l||l.rangeCount===0){o&&n();return}let c=l.getRangeAt(0);if(!c.collapsed){o&&n();return}let m=c.startContainer?.parentElement?.closest("[data-block-id]");if(!m){o&&n();return}let p=m.dataset.blockId,u=s.find(h=>h.id===p);if(!u||!("inline"in u)){o&&n();return}let f=St(u.inline),g=QP(m);if(g<0){o&&n();return}let b=f.slice(0,g).match(/\[\[([^\[\]]*)$/);if(b){let h=g-b[0].length,v=b[1]||"";if(o)o={blockId:p,startOffset:h,triggerLength:b[0].length},Cg(v);else{o={blockId:p,startOffset:h,triggerLength:b[0].length};let w=c.getBoundingClientRect();Pi({anchor:{bottom:w.bottom,left:w.left},query:v,onSelect:x=>{if(!o)return;let T=o;e.applyMutation(E=>{let C=ni(E,T.blockId,T.startOffset+T.triggerLength,-T.triggerLength);return ri(C,T.blockId,T.startOffset,x.Id,x.Title||"")},"structural"),n()},onCancel:()=>n()})}}else o&&n()}let a=e.subscribe(()=>r()),i=()=>{(t.contains(document.activeElement)||Ag())&&r()};return document.addEventListener("selectionchange",i),{destroy(){a(),document.removeEventListener("selectionchange",i),n()}}}function QP(e){let t=window.getSelection();if(!t||t.rangeCount===0)return-1;let o=t.getRangeAt(0);if(!e.contains(o.startContainer))return-1;let n=0,r=!1,a=i=>{if(r)return;if(i===o.startContainer){if(i.nodeType===3)n+=Math.min(o.startOffset,(i.textContent||"").length);else{let c=Array.from(i.childNodes);for(let m=0;m<o.startOffset&&m<c.length;m++)a(c[m])}r=!0;return}if(i.nodeType===3){n+=(i.textContent||"").length;return}if(i.nodeType!==1)return;let s=i;if(s.tagName.toLowerCase()==="br"){n+=1;return}if(s.classList.contains("memola-page-link")){n+=(s.textContent||"").length;return}for(let c of Array.from(s.childNodes))a(c)};for(let i of Array.from(e.childNodes))a(i);return r?n:-1}var Ak=L(()=>{"use strict";km();Ro();tn()});async function Bk(e){let t=W+"/_api/web/GetFolderByServerRelativeUrl('"+e+"')";if((await fetch(t,{headers:{Accept:"application/json;odata=verbose"},credentials:"include"})).ok)return;let n=await xe(),r=await fetch(W+"/_api/web/folders",{method:"POST",headers:{Accept:"application/json;odata=verbose","Content-Type":"application/json;odata=verbose","X-RequestDigest":n},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Folder"},ServerRelativeUrl:e})});if(!r.ok&&r.status!==409)throw new Error("\u30D5\u30A9\u30EB\u30C0\u4F5C\u6210\u5931\u6557("+r.status+"): "+e)}async function eC(){await Bk(gs),await Bk(gs+"/"+_k)}async function Dg(e,t="att",o=".bin"){await eC();let n=await xe(),r=(e.name.match(/\.[^./]+$/)?.[0]||o).toLowerCase(),a=t+"-"+Date.now()+"-"+Math.random().toString(36).slice(2,8)+r,i=gs+"/"+_k,s=W+"/_api/web/GetFolderByServerRelativeUrl('"+i+"')/Files/add(url='"+encodeURIComponent(a)+"',overwrite=true)",l=await fetch(s,{method:"POST",headers:{"X-RequestDigest":n},credentials:"include",body:await e.arrayBuffer()});if(!l.ok)throw new Error("\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5931\u6557: "+l.status);return W.replace(Zo,"")+i+"/"+a}async function Dk(e){return Dg(e,"img",".png")}function Rk(e,t){let o=!0,n=()=>window.getSelection()?.anchorNode?.parentElement?.closest("[data-block-id]")?.dataset.blockId||null,r=(l,c,m)=>{if(!o)return;let p=Ay(c,m);e.applyMutation(u=>{let f=u.blocks.slice(),g=l?f.findIndex(v=>v.id===l):f.length-1,y=g>=0?g+1:f.length;f.splice(y,0,p);let b=f[y+1],h;if(b&&b.kind!=="image"&&"inline"in b)h=b.id;else{let v=rt("");f.splice(y+1,0,v),h=v.id}return{...u,blocks:f,selection:{kind:"caret",blockId:h,offset:0}}},"structural")},a=async l=>{let c=l.clipboardData?.items;if(!c)return;let m=Array.from(c).find(u=>u.kind==="file"&&u.type.startsWith("image/"))?.getAsFile();if(!m)return;l.preventDefault(),l.stopPropagation();let p=n();try{_(!0,"\u753B\u50CF\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D...");let u=await Dk(m);r(p,u,m.name)}catch(u){o&&k("\u753B\u50CF\u633F\u5165\u5931\u6557: "+u.message,"err")}finally{_(!1)}},i=async l=>{if(!l.dataTransfer?.files?.length)return;let c=Array.from(l.dataTransfer.files).filter(p=>p.type.startsWith("image/"));if(c.length===0)return;l.preventDefault();let m=n();try{_(!0,"\u753B\u50CF\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D...");for(let p of c){if(!o)return;let u=await Dk(p);r(m,u,p.name),m=e.getBlocks().slice(-1)[0]?.id??m}}catch(p){o&&k("\u753B\u50CF\u633F\u5165\u5931\u6557: "+p.message,"err")}finally{_(!1)}},s=l=>{let c=l.target?.closest?.(".memola-img-resize");if(!c)return;let m=c.closest(".memola-img-wrap"),p=m?.querySelector(".memola-img"),f=c.closest("[data-block-id]")?.dataset.blockId;if(!m||!p||!f)return;l.preventDefault(),l.stopPropagation();let g=l.clientX,y=p.getBoundingClientRect().width,b=t.clientWidth||800,h=60,v=y,w=T=>{v=Math.max(h,Math.min(b,Math.round(y+(T.clientX-g)))),p.style.width=v+"px",m.style.width=v+"px"},x=()=>{document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",x),o&&e.applyMutation(T=>{let E=T.blocks.findIndex(U=>U.id===f);if(E<0||T.blocks[E].kind!=="image")return T;let C=T.blocks.slice();return C[E]={...C[E],width:v},{...T,blocks:C}},"structural")};document.addEventListener("mousemove",w),document.addEventListener("mouseup",x)};return t.addEventListener("paste",a,!0),t.addEventListener("drop",i),t.addEventListener("mousedown",s,!0),()=>{o=!1,t.removeEventListener("paste",a,!0),t.removeEventListener("drop",i),t.removeEventListener("mousedown",s,!0)}}var _k,_g=L(()=>{"use strict";Ro();Fe();wr();le();_k="attachments"});var Ai=Xt(Vt=>{"use strict";Object.defineProperty(Vt,"__esModule",{value:!0});Vt.arraysEqual=tC;Vt.uInt2int=oC;Vt.toHexStr=nC;Vt.toHex1=it;Vt.toHex2=rC;Vt.toHex4=aC;Vt.msftUuidStringify=iC;Vt.emptyToNull=sC;Vt.readSystemTime=lC;Vt.readTransitionSystemTime=cC;Vt.bin2HexUpper=dC;function tC(e,t){if(e===t)return!0;if(e==null||t==null||e.length!=t.length)return!1;for(var o=0;o<e.length;o++)if(e[o]!==t[o])return!1;return!0}function oC(e){for(var t=new Array(e.length),o=0;o<e.length;o++)t[o]=e[o]<<24>>24;return t}function nC(e,t){for(var o="";e!=0;)o="0123456789abcdef"[e&15]+o,e>>=4,o="0123456789abcdef"[e&15]+o,e>>=4;for(;o.length<t;)o="0"+o;return o}var Nt="0123456789abcdef";function it(e){return Nt[e>>4&15]+Nt[e&15]}function rC(e){return Nt[e>>12&15]+Nt[e>>8&15]+Nt[e>>4&15]+Nt[e&15]}function aC(e){return Nt[e>>28&15]+Nt[e>>24&15]+Nt[e>>20&15]+Nt[e>>16&15]+Nt[e>>12&15]+Nt[e>>8&15]+Nt[e>>4&15]+Nt[e&15]}function iC(e,t){return""+it(e[t+3])+it(e[t+2])+it(e[t+1])+it(e[t+0])+"-"+it(e[t+5])+it(e[t+4])+"-"+it(e[t+7])+it(e[t+6])+"-"+it(e[t+8])+it(e[t+9])+"-"+it(e[t+10])+it(e[t+11])+it(e[t+12])+it(e[t+13])+it(e[t+14])+it(e[t+15])}function sC(e){return e===""?null:e}function Ci(e,t){return(""+e).padStart(t,"0")}function lC(e){var t=e.readUint16(),o=e.readUint16(),n=e.readUint16(),r=e.readUint16(),a=e.readUint16(),i=e.readUint16(),s=e.readUint16(),l=e.readUint16(),c="".concat(Ci(t,4),"-").concat(Ci(o,2),"-").concat(Ci(r,2),"T").concat(Ci(a,2),":").concat(Ci(i,2),":").concat(Ci(s,2),"Z");return c==="0000-00-00T00:00:00Z"?null:new Date(c)}function cC(e){var t=e.readUint16(),o=e.readUint16(),n=e.readUint16(),r=e.readUint16(),a=e.readUint16(),i=e.readUint16(),s=e.readUint16(),l=e.readUint16();return{year:t,month:o,dayOfWeek:n,day:r,hour:a,minute:i}}function dC(e){for(var t="";!e.isEof();)t+=it(e.readUint8());return t.toUpperCase()}});var Im=Xt(Rg=>{"use strict";Object.defineProperty(Rg,"__esModule",{value:!0});var mC=Ai();Rg.default={FILE_HEADER:(0,mC.uInt2int)([208,207,17,224,161,177,26,225]),MSG:{UNUSED_BLOCK:-1,END_OF_CHAIN:-2,S_BIG_BLOCK_SIZE:512,S_BIG_BLOCK_MARK:9,L_BIG_BLOCK_SIZE:4096,L_BIG_BLOCK_MARK:12,SMALL_BLOCK_SIZE:64,BIG_BLOCK_MIN_DOC_SIZE:4096,HEADER:{PROPERTY_START_OFFSET:48,BAT_START_OFFSET:76,BAT_COUNT_OFFSET:44,SBAT_START_OFFSET:60,SBAT_COUNT_OFFSET:64,XBAT_START_OFFSET:68,XBAT_COUNT_OFFSET:72},PROP:{NO_INDEX:-1,PROPERTY_SIZE:128,NAME_SIZE_OFFSET:64,MAX_NAME_LENGTH:64/2-1,TYPE_OFFSET:66,PREVIOUS_PROPERTY_OFFSET:68,NEXT_PROPERTY_OFFSET:72,CHILD_PROPERTY_OFFSET:76,START_BLOCK_OFFSET:116,SIZE_OFFSET:120,TYPE_ENUM:{UNALLOCATED:0,DIRECTORY:1,DOCUMENT:2,ROOT:5}},FIELD:{PREFIX:{ATTACHMENT:"__attach_version1.0",RECIPIENT:"__recip_version1.0",DOCUMENT:"__substg1.",NAMEID:"__nameid_version1.0"},NAME_MAPPING:{"001a":"messageClass","0037":"subject","0c1a":"senderName","0c1e":"senderAddressType","0c1f":"senderEmail","5d01":"senderSmtpAddress","5d02":"sentRepresentingSmtpAddress","5d0a":"creatorSMTPAddress","5d0b":"lastModifierSMTPAddress",1e3:"body","007d":"headers",1009:"compressedRtf","3ffa":"lastModifierName","0039":"clientSubmitTime","0e06":"messageDeliveryTime","3fde":"internetCodepage","3ffd":"messageCodepage","3ff1":"messageLocaleId","0e07":"messageFlags",1035:"messageId","3fd9":"preview",3007:"creationTime",3008:"lastModificationTime",3703:"extension",3704:"fileNameShort",3707:"fileName",3712:"pidContentId","7ffe":"attachmentHidden","370e":"attachMimeTag","0c15":"recipType",3001:"name",3002:"addressType",3003:"email","39fe":"smtpAddress","3a18":"departmentName","3a44":"middleName","3a05":"generation","3a11":"surname","3a27":"addressCity","3a16":"companyName","3a24":"businessFaxNumber","3a29":"streetAddress","3a51":"businessHomePage","3a06":"givenName","3a09":"homeTelephoneNumber","3a15":"postalAddress","3a17":"title","3a1c":"mobileTelephoneNumber","3a26":"country","3a28":"stateOrProvince","3a2a":"postalCode","3a45":"displayNamePrefix","0070":"conversationTopic","0e1d":"normalizedSubject","3a08":"businessTelephoneNumber","3a0d":"location"},FULL_NAME_MAPPING:{"1013001f":"bodyHtml",10130102:"html"},PIDLID_MAPPING:{"00062008-0000-0000-c000-000000000046":{34080:{id:"PidLidVerbStream"},34084:{id:"PidLidVerbResponse",dispid:"votingResponse"},34176:{id:"PidLidInternetAccountName",dispid:"inetAcctName"}},"00062002-0000-0000-c000-000000000046":{33293:{id:"PidLidAppointmentStartWhole",dispid:"apptStartWhole"},33294:{id:"PidLidAppointmentEndWhole",dispid:"apptEndWhole"},33333:{id:"PidLidClipStart",dispid:"clipStart"},33334:{id:"PidLidClipEnd",dispid:"clipEnd"},33331:{id:"PidLidTimeZoneStruct",dispid:"timeZoneStruct"},33332:{id:"PidLidTimeZoneDescription",dispid:"timeZoneDesc"},33374:{id:"PidLidAppointmentTimeZoneDefinitionStartDisplay",dispid:"apptTZDefStartDisplay"},33375:{id:"PidLidAppointmentTimeZoneDefinitionEndDisplay",dispid:"apptTZDefEndDisplay"},33376:{id:"PidLidAppointmentTimeZoneDefinitionRecur",dispid:"apptTZDefRecur"},33302:{id:"PidLidAppointmentRecur",dispid:"apptRecur"},33288:{id:"PidLidLocation",dispid:"apptLocation"}},"00062004-0000-0000-c000-000000000046":{32812:{id:"dispidYomiFirstName",dispid:"yomiFirstName"},32899:{id:"dispidEmail1EmailAddress",dispid:"email1EmailAddress"},32814:{id:"dispidYomiCompanyName",dispid:"yomiCompanyName"},32978:{id:"PidLidFax3AddressType",dispid:"fax3AddrType"},32896:{id:"PidLidEmail1DisplayName",dispid:"email1DisplayName"},32900:{id:"PidLidEmail1OriginalDisplayName",dispid:"email1OriginalDisplayName"},32773:{id:"PidLidFileUnder",dispid:"fileUnder"},32813:{id:"PidLidYomiLastName",dispid:"yomiLastName"},32946:{id:"PidLidFax1AddressType",dispid:"fax1AddrType"},32963:{id:"PidLidFax2EmailAddress",dispid:"fax2EmailAddress"},32838:{id:"PidLidWorkAddressCity",dispid:"workAddressCity"},32989:{id:"PidLidAddressCountryCode",dispid:"addressCountryCode"},32962:{id:"PidLidFax2AddressType",dispid:"fax2AddrType"},32964:{id:"PidLidFax2OriginalDisplayName",dispid:"fax2OriginalDisplayName"},32840:{id:"PidLidWorkAddressPostalCode",dispid:"workAddressPostalCode"},32837:{id:"PidLidWorkAddressStreet",dispid:"workAddressStreet"},32839:{id:"PidLidWorkAddressState",dispid:"workAddressState"},32987:{id:"PidLidWorkAddressCountryCode",dispid:"workAddressCountryCode"},32841:{id:"PidLidWorkAddressCountry",dispid:"workAddressCountry"},32811:{id:"PidLidHtml",dispid:"contactHtml"},32795:{id:"PidLidWorkAddress",dispid:"workAddress"},32948:{id:"PidLidFax1OriginalDisplayName",dispid:"fax1OriginalDisplayName"},32866:{id:"PidLidInstantMessagingAddress",dispid:"instMsg"},32784:{id:"PidLidDepartment",dispid:"department"},32947:{id:"PidLidFax1EmailAddress",dispid:"fax1EmailAddress"},32980:{id:"PidLidFax3OriginalDisplayName",dispid:"fax3OriginalDisplayName"},32979:{id:"PidLidFax3EmailAddress",dispid:"fax3EmailAddress"}},"6ed8da90-450b-101b-98da-00aa003f1305":{3:{id:"PidLidGlobalObjectId",dispid:"globalAppointmentID"},40:{id:"PidLidOldLocation",dispid:"apptOldLocation"}}},CLASS_MAPPING:{ATTACHMENT_DATA:"3701"},TYPE_MAPPING:{"001e":"string","001f":"unicode","0040":"time","0102":"binary","0003":"integer","000b":"boolean"},DIR_TYPE:{INNER_MSG:"000d"}}}}});var Uk={};j(Uk,{Buffer:()=>Fk,StringDecoder:()=>Em,decode:()=>Ok,default:()=>uC,encode:()=>Nk,encodingExists:()=>Hk});function Nk(e,t){throw new Error("iconv-lite (encode) is not available in browser build")}function Ok(e,t){try{return new TextDecoder(t).decode(e)}catch{return new TextDecoder("utf-8",{fatal:!1}).decode(e)}}function Hk(e){return!1}var Fk,Em,pC,uC,zk=L(()=>{"use strict";Fk={isBuffer:e=>!1,from:e=>typeof e=="string"?new TextEncoder().encode(e):e instanceof Uint8Array?e:new Uint8Array(e)},Em=class{constructor(t="utf-8"){this.enc=t}write(t){try{return new TextDecoder(this.enc).decode(t)}catch{return new TextDecoder("utf-8").decode(t)}}end(){return""}},pC={encode:Nk,decode:Ok,encodingExists:Hk,Buffer:Fk,StringDecoder:Em},uC=pC});var Al=Xt(Ng=>{"use strict";Object.defineProperty(Ng,"__esModule",{value:!0});var jk=(zk(),DT(Uk)),fC=function(){function e(t,o,n){if(this._dynamicSize=!0,this._byteLength=0,this.failurePosition=0,this._byteOffset=o||0,t instanceof ArrayBuffer)this.buffer=t;else if(t instanceof DataView)this.dataView=t;else if(t&&t.buffer instanceof ArrayBuffer)this._byteOffset+=t.byteOffset,this._buffer=t.buffer,this._dataView=new DataView(this._buffer,this._byteOffset),this._byteLength=this._dataView.byteLength+this._byteOffset;else throw new Error("Unknown arrayBuffer");this.position=0,this.endianness=n??e.LITTLE_ENDIAN}return e.prototype.save=function(t){var o=new Blob([this.buffer]),n=window.webkitURL||window.URL;if(n&&n.createObjectURL){var r=n.createObjectURL(o),a=document.createElement("a");a.setAttribute("href",r),a.setAttribute("download",t),a.click(),n.revokeObjectURL(r)}else throw"DataStream.save: Can't create object URL."},Object.defineProperty(e.prototype,"dynamicSize",{get:function(){return this._dynamicSize},set:function(t){t||this._trimAlloc(),this._dynamicSize=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"byteLength",{get:function(){return this._byteLength-this._byteOffset},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"buffer",{get:function(){return this._trimAlloc(),this._buffer},set:function(t){this._buffer=t,this._dataView=new DataView(this._buffer,this._byteOffset),this._byteLength=this._buffer.byteLength},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"byteOffset",{get:function(){return this._byteOffset},set:function(t){this._byteOffset=t,this._dataView=new DataView(this._buffer,this._byteOffset),this._byteLength=this._buffer.byteLength},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"dataView",{get:function(){return this._dataView},set:function(t){this._byteOffset=t.byteOffset,this._buffer=t.buffer,this._dataView=new DataView(this._buffer,this._byteOffset),this._byteLength=this._byteOffset+t.byteLength},enumerable:!1,configurable:!0}),e.prototype._realloc=function(t){if(this._dynamicSize){var o=this._byteOffset+this.position+t,n=this._buffer.byteLength;if(o<=n){o>this._byteLength&&(this._byteLength=o);return}for(n<1&&(n=1);o>n;)n*=2;var r=new ArrayBuffer(n),a=new Uint8Array(this._buffer),i=new Uint8Array(r,0,a.length);i.set(a),this.buffer=r,this._byteLength=o}},e.prototype._trimAlloc=function(){if(this._byteLength!=this._buffer.byteLength){var t=new ArrayBuffer(this._byteLength),o=new Uint8Array(t),n=new Uint8Array(this._buffer,0,o.length);o.set(n),this.buffer=t}},e.prototype.seek=function(t){var o=Math.max(0,Math.min(this.byteLength,t));this.position=isNaN(o)||!isFinite(o)?0:o},e.prototype.isEof=function(){return this.position>=this.byteLength},e.prototype.mapInt32Array=function(t,o){this._realloc(t*4);var n=new Int32Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*4,n},e.prototype.mapInt16Array=function(t,o){this._realloc(t*2);var n=new Int16Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*2,n},e.prototype.mapInt8Array=function(t){this._realloc(t*1);var o=new Int8Array(this._buffer,this.byteOffset+this.position,t);return this.position+=t*1,o},e.prototype.mapUint32Array=function(t,o){this._realloc(t*4);var n=new Uint32Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*4,n},e.prototype.mapUint16Array=function(t,o){this._realloc(t*2);var n=new Uint16Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*2,n},e.prototype.mapUint8Array=function(t){this._realloc(t*1);var o=new Uint8Array(this._buffer,this.byteOffset+this.position,t);return this.position+=t*1,o},e.prototype.mapFloat64Array=function(t,o){this._realloc(t*8);var n=new Float64Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*8,n},e.prototype.mapFloat32Array=function(t,o){this._realloc(t*4);var n=new Float32Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*4,n},e.prototype.readInt32Array=function(t,o){t=t??(this.byteLength-this.position)/4;var n=new Int32Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readInt16Array=function(t,o){t=t??(this.byteLength-this.position)/2;var n=new Int16Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readInt8Array=function(t){t=t??this.byteLength-this.position;var o=new Int8Array(t);return e.memcpy(o.buffer,0,this.buffer,this.byteOffset+this.position,t*o.BYTES_PER_ELEMENT),this.position+=o.byteLength,o},e.prototype.readUint32Array=function(t,o){t=t??(this.byteLength-this.position)/4;var n=new Uint32Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readUint16Array=function(t,o){t=t??(this.byteLength-this.position)/2;var n=new Uint16Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readUint8Array=function(t){t=t??this.byteLength-this.position;var o=new Uint8Array(t);return e.memcpy(o.buffer,0,this.buffer,this.byteOffset+this.position,t*o.BYTES_PER_ELEMENT),this.position+=o.byteLength,o},e.prototype.readToUint8Array=function(t,o,n){t=t??this.byteLength-this.position,e.memcpy(o.buffer,n,this.buffer,this.byteOffset+this.position,t*o.BYTES_PER_ELEMENT),this.position+=o.byteLength},e.prototype.readFloat64Array=function(t,o){t=t??(this.byteLength-this.position)/8;var n=new Float64Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readFloat32Array=function(t,o){t=t??(this.byteLength-this.position)/4;var n=new Float32Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.writeInt32Array=function(t,o){if(this._realloc(t.length*4),t instanceof Int32Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapInt32Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeInt32(t[n],o)},e.prototype.writeInt16Array=function(t,o){if(this._realloc(t.length*2),t instanceof Int16Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapInt16Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeInt16(t[n],o)},e.prototype.writeInt8Array=function(t){if(this._realloc(t.length*1),t instanceof Int8Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapInt8Array(t.length);else for(var o=0;o<t.length;o++)this.writeInt8(t[o])},e.prototype.writeUint32Array=function(t,o){if(this._realloc(t.length*4),t instanceof Uint32Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapUint32Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeUint32(t[n],o)},e.prototype.writeUint16Array=function(t,o){if(this._realloc(t.length*2),t instanceof Uint16Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapUint16Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeUint16(t[n],o)},e.prototype.writeUint8Array=function(t){if(this._realloc(t.length*1),t instanceof Uint8Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapUint8Array(t.length);else for(var o=0;o<t.length;o++)this.writeUint8(t[o])},e.prototype.writeFloat64Array=function(t,o){if(this._realloc(t.length*8),t instanceof Float64Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapFloat64Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeFloat64(t[n],o)},e.prototype.writeFloat32Array=function(t,o){if(this._realloc(t.length*4),t instanceof Float32Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapFloat32Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeFloat32(t[n],o)},e.prototype.readInt32=function(t){var o=this._dataView.getInt32(this.position,t??this.endianness);return this.position+=4,o},e.prototype.readInt=function(t){return this.seek(t),this.readInt32()},e.prototype.readInt16=function(t){var o=this._dataView.getInt16(this.position,t??this.endianness);return this.position+=2,o},e.prototype.readShort=function(t){return this.seek(t),this.readInt16()},e.prototype.readInt8=function(){var t=this._dataView.getInt8(this.position);return this.position+=1,t},e.prototype.readByte=function(t){return this.seek(t),this.readInt8()},e.prototype.readUint32=function(t){var o=this._dataView.getUint32(this.position,t??this.endianness);return this.position+=4,o},e.prototype.readUint16=function(t){var o=this._dataView.getUint16(this.position,t??this.endianness);return this.position+=2,o},e.prototype.readUint8=function(){var t=this._dataView.getUint8(this.position);return this.position+=1,t},e.prototype.readFloat32=function(t){var o=this._dataView.getFloat32(this.position,t??this.endianness);return this.position+=4,o},e.prototype.readFloat64=function(t){var o=this._dataView.getFloat64(this.position,t??this.endianness);return this.position+=8,o},e.prototype.writeInt32=function(t,o){this._realloc(4),this._dataView.setInt32(this.position,t,o??this.endianness),this.position+=4},e.prototype.writeInt16=function(t,o){this._realloc(2),this._dataView.setInt16(this.position,t,o??this.endianness),this.position+=2},e.prototype.writeInt8=function(t){this._realloc(1),this._dataView.setInt8(this.position,t),this.position+=1},e.prototype.writeUint32=function(t,o){this._realloc(4),this._dataView.setUint32(this.position,t,o??this.endianness),this.position+=4},e.prototype.writeUint16=function(t,o){this._realloc(2),this._dataView.setUint16(this.position,t,o??this.endianness),this.position+=2},e.prototype.writeUint8=function(t){this._realloc(1),this._dataView.setUint8(this.position,t),this.position+=1},e.prototype.writeFloat32=function(t,o){this._realloc(4),this._dataView.setFloat32(this.position,t,o??this.endianness),this.position+=4},e.prototype.writeFloat64=function(t,o){this._realloc(8),this._dataView.setFloat64(this.position,t,o??this.endianness),this.position+=8},e.memcpy=function(t,o,n,r,a){var i=new Uint8Array(t,o,a),s=new Uint8Array(n,r,a);i.set(s)},e.arrayToNative=function(t,o){return o==this.endianness?t:this.flipArrayEndianness(t)},e.nativeToEndian=function(t,o){return this.endianness==o?t:this.flipArrayEndianness(t)},e.flipArrayEndianness=function(t){for(var o=new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=0;n<t.byteLength;n+=t.BYTES_PER_ELEMENT)for(var r=n+t.BYTES_PER_ELEMENT-1,a=n;r>a;r--,a++){var i=o[a];o[a]=o[r],o[r]=i}return t},e.createStringFromArray=function(t){for(var o="",n=0;n<t.length;n++)o+=String.fromCharCode(t[n]);return o},e.prototype.readStruct=function(t){for(var o={},n,r,a,i=this.position,s=0;s<t.length;s+=2){if(n=t[s+1],r=this.readType(n,o),r==null)return this.failurePosition==0&&(this.failurePosition=this.position),this.position=i,null;o[t[s]]=r}return o},e.prototype.readUCS2String=function(t,o){return e.createStringFromArray(this.readUint16Array(t,o))},e.prototype.readStringAt=function(t,o){return this.seek(t),this.readUCS2String(o)},e.prototype.writeUCS2String=function(t,o,n){n==null&&(n=t.length);for(var r=0;r<t.length&&r<n;r++)this.writeUint16(t.charCodeAt(r),o);for(;r<n;r++)this.writeUint16(0,o)},e.prototype.readString=function(t,o){return o==null||o=="ASCII"?e.createStringFromArray(this.mapUint8Array(t??this.byteLength-this.position)):jk.decode(this.mapUint8Array(t),o)},e.prototype.writeString=function(t,o,n){if(o==null||o=="ASCII")if(n!=null){var r=0,a=Math.min(t.length,n);for(r=0;r<a;r++)this.writeUint8(t.charCodeAt(r));for(;r<n;r++)this.writeUint8(0)}else for(var r=0;r<t.length;r++)this.writeUint8(t.charCodeAt(r));else this.writeUint8Array(jk.encode(t.substring(0,n),o))},e.prototype.readCString=function(t){var o=this.byteLength-this.position,n=new Uint8Array(this._buffer,this._byteOffset+this.position),r=o;t!=null&&(r=Math.min(t,o));for(var a=0;a<r&&n[a]!=0;a++);var i=e.createStringFromArray(this.mapUint8Array(a));return t!=null?this.position+=r-a:a!=o&&(this.position+=1),i},e.prototype.writeCString=function(t,o){if(o!=null){var n=0,r=Math.min(t.length,o);for(n=0;n<r;n++)this.writeUint8(t.charCodeAt(n));for(;n<o;n++)this.writeUint8(0)}else{for(var n=0;n<t.length;n++)this.writeUint8(t.charCodeAt(n));this.writeUint8(0)}},e.prototype.readType=function(t,o){if(typeof t=="function")return t(this,o);if(typeof t=="object"&&!(t instanceof Array))return t.get(this,o);if(t instanceof Array&&t.length!=3)return this.readStruct(t);var n=null,r=null,a="ASCII",i=this.position,s;if(typeof t=="string"&&/:/.test(t)){var l=t.split(":");t=l[0],s=l[1],o[s]!=null?r=parseInt(o[s]):r=parseInt(l[1])}if(typeof t=="string"&&/,/.test(t)){var l=t.split(",");t=l[0],a=parseInt(l[1]).toString()}switch(t){case"uint8":n=this.readUint8();break;case"int8":n=this.readInt8();break;case"uint16":n=this.readUint16(this.endianness);break;case"int16":n=this.readInt16(this.endianness);break;case"uint32":n=this.readUint32(this.endianness);break;case"int32":n=this.readInt32(this.endianness);break;case"float32":n=this.readFloat32(this.endianness);break;case"float64":n=this.readFloat64(this.endianness);break;case"uint16be":n=this.readUint16(e.BIG_ENDIAN);break;case"int16be":n=this.readInt16(e.BIG_ENDIAN);break;case"uint32be":n=this.readUint32(e.BIG_ENDIAN);break;case"int32be":n=this.readInt32(e.BIG_ENDIAN);break;case"float32be":n=this.readFloat32(e.BIG_ENDIAN);break;case"float64be":n=this.readFloat64(e.BIG_ENDIAN);break;case"uint16le":n=this.readUint16(e.LITTLE_ENDIAN);break;case"int16le":n=this.readInt16(e.LITTLE_ENDIAN);break;case"uint32le":n=this.readUint32(e.LITTLE_ENDIAN);break;case"int32le":n=this.readInt32(e.LITTLE_ENDIAN);break;case"float32le":n=this.readFloat32(e.LITTLE_ENDIAN);break;case"float64le":n=this.readFloat64(e.LITTLE_ENDIAN);break;case"cstring":n=this.readCString(r);break;case"string":n=this.readString(r,a);break;case"u16string":n=this.readUCS2String(r,this.endianness);break;case"u16stringle":n=this.readUCS2String(r,e.LITTLE_ENDIAN);break;case"u16stringbe":n=this.readUCS2String(r,e.BIG_ENDIAN);break;default:if(t.length==3){var c=t[1],s=t[2],m=0;if(typeof s=="function"?m=s(o,this,t):typeof s=="string"&&o[s]!=null?m=parseInt(o[s]):m=parseInt(s),typeof c=="string"){var p=c.replace(/(le|be)$/,""),u=null;switch(/le$/.test(c)?u=e.LITTLE_ENDIAN:/be$/.test(c)&&(u=e.BIG_ENDIAN),s=="*"&&(m=null),p){case"uint8":n=this.readUint8Array(m);break;case"uint16":n=this.readUint16Array(m,u);break;case"uint32":n=this.readUint32Array(m,u);break;case"int8":n=this.readInt8Array(m);break;case"int16":n=this.readInt16Array(m,u);break;case"int32":n=this.readInt32Array(m,u);break;case"float32":n=this.readFloat32Array(m,u);break;case"float64":n=this.readFloat64Array(m,u);break;case"cstring":case"utf16string":case"string":if(m==null)for(n=[];!this.isEof();){var f=this.readType(c,o);if(f==null)break;n.push(f)}else{n=new Array(m);for(var g=0;g<m;g++)n[g]=this.readType(c,o)}break}}else if(s=="*")for(n=[],this.buffer;;){var y=this.position;try{var b=this.readType(c,o);if(b==null){this.position=y;break}n.push(b)}catch{this.position=y;break}}else{n=new Array(m);for(var g=0;g<m;g++){var f=this.readType(c,o);if(f==null)return null;n[g]=f}}break}}return r!=null&&(this.position=i+r),n},e.prototype.writeStruct=function(t,o){for(var n=0;n<t.length;n+=2){var r=t[n+1];this.writeType(r,o[t[n]],o)}},e.prototype.writeType=function(t,o,n){if(typeof t=="function")return t(this,o);if(typeof t=="object"&&!(t instanceof Array))return t.set(this,o,n);var r=null,a="ASCII",i=this.position;if(typeof t=="string"&&/:/.test(t)){var s=t.split(":");t=s[0],r=parseInt(s[1])}if(typeof t=="string"&&/,/.test(t)){var s=t.split(",");t=s[0],a=parseInt(s[1]).toString()}switch(t){case"uint8":this.writeUint8(o);break;case"int8":this.writeInt8(o);break;case"uint16":this.writeUint16(o,this.endianness);break;case"int16":this.writeInt16(o,this.endianness);break;case"uint32":this.writeUint32(o,this.endianness);break;case"int32":this.writeInt32(o,this.endianness);break;case"float32":this.writeFloat32(o,this.endianness);break;case"float64":this.writeFloat64(o,this.endianness);break;case"uint16be":this.writeUint16(o,e.BIG_ENDIAN);break;case"int16be":this.writeInt16(o,e.BIG_ENDIAN);break;case"uint32be":this.writeUint32(o,e.BIG_ENDIAN);break;case"int32be":this.writeInt32(o,e.BIG_ENDIAN);break;case"float32be":this.writeFloat32(o,e.BIG_ENDIAN);break;case"float64be":this.writeFloat64(o,e.BIG_ENDIAN);break;case"uint16le":this.writeUint16(o,e.LITTLE_ENDIAN);break;case"int16le":this.writeInt16(o,e.LITTLE_ENDIAN);break;case"uint32le":this.writeUint32(o,e.LITTLE_ENDIAN);break;case"int32le":this.writeInt32(o,e.LITTLE_ENDIAN);break;case"float32le":this.writeFloat32(o,e.LITTLE_ENDIAN);break;case"float64le":this.writeFloat64(o,e.LITTLE_ENDIAN);break;case"cstring":this.writeCString(o,r);break;case"string":this.writeString(o,a,r);break;case"u16string":this.writeUCS2String(o,this.endianness,r);break;case"u16stringle":this.writeUCS2String(o,e.LITTLE_ENDIAN,r);break;case"u16stringbe":this.writeUCS2String(o,e.BIG_ENDIAN,r);break;default:if(t.length==3){for(var l=t[1],c=0;c<o.length;c++)this.writeType(l,o[c],t[2]);break}else{this.writeStruct(t,o);break}}r!=null&&(this.position=i,this._realloc(r),this.position=i+r)},e.BIG_ENDIAN=!1,e.LITTLE_ENDIAN=!0,e.endianness=new Int8Array(new Int16Array([1]).buffer)[0]>0,e}();Ng.default=fC;Uint8Array.prototype.BYTES_PER_ELEMENT===void 0&&(Object.defineProperties(Uint8Array.prototype,{BYTES_PER_ELEMENT:{value:Uint8Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Int8Array.prototype,{BYTES_PER_ELEMENT:{value:Int8Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Uint8ClampedArray.prototype,{BYTES_PER_ELEMENT:{value:Uint8ClampedArray.BYTES_PER_ELEMENT}}),Object.defineProperties(Uint16Array.prototype,{BYTES_PER_ELEMENT:{value:Uint16Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Int16Array.prototype,{BYTES_PER_ELEMENT:{value:Int16Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Uint32Array.prototype,{BYTES_PER_ELEMENT:{value:Uint32Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Int32Array.prototype,{BYTES_PER_ELEMENT:{value:Int32Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Float64Array.prototype,{BYTES_PER_ELEMENT:{value:Float64Array.BYTES_PER_ELEMENT}}))});var Og=Xt(tr=>{"use strict";var $k=tr&&tr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(tr,"__esModule",{value:!0});tr.Reader=tr.TypeEnum=void 0;var qk=$k(Al()),gC=Ai(),ae=$k(Im()),Bi;(function(e){e[e.DIRECTORY=1]="DIRECTORY",e[e.DOCUMENT=2]="DOCUMENT",e[e.ROOT=5]="ROOT"})(Bi||(tr.TypeEnum=Bi={}));var hC=function(){function e(t){this.ds=new qk.default(t,0,qk.default.LITTLE_ENDIAN)}return e.prototype.isMSGFile=function(){return this.ds.seek(0),(0,gC.arraysEqual)(ae.default.FILE_HEADER,this.ds.readInt8Array(ae.default.FILE_HEADER.length))},e.prototype.headerData=function(){this.bigBlockSize=this.ds.readByte(30)==ae.default.MSG.L_BIG_BLOCK_MARK?ae.default.MSG.L_BIG_BLOCK_SIZE:ae.default.MSG.S_BIG_BLOCK_SIZE,this.bigBlockLength=this.bigBlockSize/4,this.xBlockLength=this.bigBlockLength-1,this.batCount=this.ds.readInt(ae.default.MSG.HEADER.BAT_COUNT_OFFSET),this.propertyStart=this.ds.readInt(ae.default.MSG.HEADER.PROPERTY_START_OFFSET),this.sbatStart=this.ds.readInt(ae.default.MSG.HEADER.SBAT_START_OFFSET),this.sbatCount=this.ds.readInt(ae.default.MSG.HEADER.SBAT_COUNT_OFFSET),this.xbatStart=this.ds.readInt(ae.default.MSG.HEADER.XBAT_START_OFFSET),this.xbatCount=this.ds.readInt(ae.default.MSG.HEADER.XBAT_COUNT_OFFSET)},e.prototype.convertName=function(t){var o=this.ds.readShort(t+ae.default.MSG.PROP.NAME_SIZE_OFFSET);return o<1?"":this.ds.readStringAt(t,o/2).split("\0")[0]},e.prototype.convertProperty=function(t){return{type:this.ds.readByte(t+ae.default.MSG.PROP.TYPE_OFFSET),name:this.convertName(t),previousProperty:this.ds.readInt(t+ae.default.MSG.PROP.PREVIOUS_PROPERTY_OFFSET),nextProperty:this.ds.readInt(t+ae.default.MSG.PROP.NEXT_PROPERTY_OFFSET),childProperty:this.ds.readInt(t+ae.default.MSG.PROP.CHILD_PROPERTY_OFFSET),startBlock:this.ds.readInt(t+ae.default.MSG.PROP.START_BLOCK_OFFSET),sizeBlock:this.ds.readInt(t+ae.default.MSG.PROP.SIZE_OFFSET)}},e.prototype.convertBlockToProperties=function(t,o){for(var n=this.bigBlockSize/ae.default.MSG.PROP.PROPERTY_SIZE,r=this.getBlockOffsetAt(t),a=0;a<n&&!(this.ds.byteLength<r+ae.default.MSG.PROP.TYPE_OFFSET);a++){var i=this.ds.readByte(r+ae.default.MSG.PROP.TYPE_OFFSET);switch(i){case ae.default.MSG.PROP.TYPE_ENUM.ROOT:case ae.default.MSG.PROP.TYPE_ENUM.DIRECTORY:case ae.default.MSG.PROP.TYPE_ENUM.DOCUMENT:o.push(this.convertProperty(r));break;case ae.default.MSG.PROP.TYPE_ENUM.UNALLOCATED:default:o.push({type:i,name:"",previousProperty:-1,nextProperty:-1,childProperty:-1,startBlock:0,sizeBlock:0});break}r+=ae.default.MSG.PROP.PROPERTY_SIZE}},e.prototype.createPropertyHierarchy=function(t,o){if(!(!o||o.childProperty==ae.default.MSG.PROP.NO_INDEX)){o.children=[];for(var n=[{currentMode:"walk",currentIndex:o.childProperty}];n.length!=0;){var r=n.pop(),a=r.currentMode,i=r.currentIndex,s=t[i];a==="push"?o.children.push(i):(s.type==ae.default.MSG.PROP.TYPE_ENUM.DIRECTORY&&this.createPropertyHierarchy(t,s),s.nextProperty!=ae.default.MSG.PROP.NO_INDEX&&n.push({currentMode:"walk",currentIndex:s.nextProperty}),n.push({currentMode:"push",currentIndex:i}),s.previousProperty!=ae.default.MSG.PROP.NO_INDEX&&n.push({currentMode:"walk",currentIndex:s.previousProperty}))}}},e.prototype.propertyDataReader=function(t){for(var o=[],n=t;n!=ae.default.MSG.END_OF_CHAIN;)this.convertBlockToProperties(n,o),n=this.getNextBlock(n);return this.createPropertyHierarchy(o,o[0]),o},e.prototype.parse=function(){this.headerData(),this.batData=this.batDataReader(),this.xbatCount>0&&this.xbatDataReader(),this.sbatData=this.sbatDataReader(),this.propertyData=this.propertyDataReader(this.propertyStart),this.bigBlockTable=this.readBigBlockTable()},e.prototype.batCountInHeader=function(){var t=(ae.default.MSG.S_BIG_BLOCK_SIZE-ae.default.MSG.HEADER.BAT_START_OFFSET)/4;return Math.min(this.batCount,t)},e.prototype.batDataReader=function(){var t=new Array(this.batCountInHeader());this.ds.seek(ae.default.MSG.HEADER.BAT_START_OFFSET);for(var o=0;o<t.length;o++)t[o]=this.ds.readInt32();return t},e.prototype.getBlockOffsetAt=function(t){return(t+1)*this.bigBlockSize},e.prototype.getBlockAt=function(t){var o=this.getBlockOffsetAt(t);return this.ds.seek(o),this.ds.readInt32Array(this.bigBlockLength)},e.prototype.getBlockValueAt=function(t,o){var n=this.getBlockOffsetAt(t);return this.ds.seek(n+4*o),this.ds.readInt32()},e.prototype.getNextBlockInner=function(t,o){var n=Math.floor(t/this.bigBlockLength),r=t%this.bigBlockLength,a=o[n];return typeof a>"u"?ae.default.MSG.END_OF_CHAIN:this.getBlockValueAt(a,r)},e.prototype.getNextBlock=function(t){return this.getNextBlockInner(t,this.batData)},e.prototype.sbatDataReader=function(){for(var t=[],o=this.sbatStart,n=0;n<this.sbatCount&&o&&o!=ae.default.MSG.END_OF_CHAIN;n++)t.push(o),o=this.getNextBlock(o);return t},e.prototype.xbatDataReader=function(){for(var t=this.batCountInHeader(),o=this.batCount,n=o-t,r=this.xbatStart,a=0;a<this.xbatCount;a++){for(var i=this.getBlockAt(r),s=Math.min(n,this.xBlockLength),l=0;l<s;l++){var c=i[l];if(c==ae.default.MSG.UNUSED_BLOCK||c==ae.default.MSG.END_OF_CHAIN)break;this.batData.push(c)}if(n-=s,r=i[this.xBlockLength],r==ae.default.MSG.UNUSED_BLOCK||r==ae.default.MSG.END_OF_CHAIN)break}},e.prototype.getNextBlockSmall=function(t){return this.getNextBlockInner(t,this.sbatData)},e.prototype.getChainByBlockSmall=function(t){for(var o=[],n=t.startBlock;n!=ae.default.MSG.END_OF_CHAIN;)o.push(n),n=this.getNextBlockSmall(n);return o},e.prototype.readBigBlockTable=function(){for(var t=this.propertyData[0],o=[],n=t.startBlock,r=0;n!=ae.default.MSG.END_OF_CHAIN;r++)o.push(n),n=this.getNextBlock(n);return o},e.prototype.readDataByBlockSmall=function(t,o,n,r){var a=t*ae.default.MSG.SMALL_BLOCK_SIZE,i=Math.floor(a/this.bigBlockSize),s=a%this.bigBlockSize,l=this.bigBlockTable[i],c=this.getBlockOffsetAt(l);return this.ds.seek(c+s),this.ds.readToUint8Array(o,n,r)},e.prototype.readChainDataByBlockSmall=function(t,o){for(var n=new Uint8Array(t.sizeBlock),r=0,a=0;r<o.length;r++){var i=n.length<a+ae.default.MSG.SMALL_BLOCK_SIZE?n.length-a:ae.default.MSG.SMALL_BLOCK_SIZE;this.readDataByBlockSmall(o[r],i,n,a),a+=i}return n},e.prototype.readProperty=function(t){if(t.sizeBlock)if(t.sizeBlock<ae.default.MSG.BIG_BLOCK_MIN_DOC_SIZE){var o=this.getChainByBlockSmall(t);if(o.length==1){var n=new Uint8Array(t.sizeBlock);return this.readDataByBlockSmall(t.startBlock,t.sizeBlock,n,0),n}else if(o.length>1)return this.readChainDataByBlockSmall(t,o);return new Uint8Array(0)}else{for(var r=t.startBlock,a=t.sizeBlock,i=0,n=new Uint8Array(t.sizeBlock);1<=a;){var s=this.getBlockOffsetAt(r);this.ds.seek(s);var l=Math.min(a,this.bigBlockSize),c=this.ds.readUint8Array(l);n.set(c,i),i+=l,a-=l,r=this.getNextBlock(r)}return n}else return new Uint8Array(0)},e.prototype.readFileOf=function(t){return this.readProperty(this.propertyData[t])},e.prototype.folderOf=function(t){var o=this,n=this.propertyData;if(!n)return null;var r=n[t];return{dataId:t,name:r.name,fileNames:function(){var a=r.children;return a?a.map(function(i){return n[i]}).filter(function(i){return i.type===Bi.DOCUMENT}).map(function(i){return i.name}):[]},fileNameSets:function(){var a=r.children;return a?a.map(function(i){return{subIndex:i,entry:n[i]}}).filter(function(i){return i.entry.type===Bi.DOCUMENT}).map(function(i){return{name:i.entry.name,length:i.entry.sizeBlock,dataId:i.subIndex,provider:function(){return o.readProperty(i.entry)}}}):[]},subFolders:function(){var a=r.children;return a?a.filter(function(i){return n[i].type==Bi.DIRECTORY}).map(function(i){return o.folderOf(i)}):[]},readFile:function(a){var i=r.children;if(i)for(var s=0,l=i;s<l.length;s++){var c=l[s],m=n[c];if(m&&m.type===Bi.DOCUMENT&&m.name===a)return o.readProperty(m)}return null}}},e.prototype.rootFolder=function(){return this.folderOf(0)},e}();tr.Reader=hC});var Gk=Xt(Bl=>{"use strict";var Wk=Bl&&Bl.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Bl,"__esModule",{value:!0});Bl.burn=xC;var sa=Og(),Kk=Wk(Al()),bC=Wk(Im());function Di(e){return e+511&-512}function vC(e){return e+63&-64}var Vk=function(){function e(t){this.sectors=t}return e.prototype.allocate=function(t){for(var o=this.sectors.length,n=0;n<t;n++){var r=n+1===t?-2:o+n+1;this.sectors.push(r)}return o},e.prototype.allocateAs=function(t,o){for(var n=this.sectors.length,r=0;r<t;r++)this.sectors.push(o);return n},e.prototype.finalize=function(t,o){for(var n=(t-this.sectors.length%t)%t;n>=1;n-=1)this.sectors.push(o);return this},e.prototype.count=function(){return this.sectors.length},e}(),yC=function(){function e(t){this.fat=new Vk([]),this.miniFat=new Vk([]),this.liteEnts=t.map(function(se){return{entry:se,left:-1,right:-1,child:-1,firstSector:0,isMini:se.length<4096,isRed:!1}}),this.buildTree(0);for(var o=this.fat.allocate(Di(128*this.liteEnts.length)/512),n=0,r=this.liteEnts.filter(function(se){return se.entry.type==sa.TypeEnum.DOCUMENT&&se.isMini===!1});n<r.length;n++){var a=r[n];a.firstSector=a.entry.length===0?-2:this.fat.allocate(Di(a.entry.length)/512)}for(var i=0,s=this.liteEnts.filter(function(se){return se.entry.type==sa.TypeEnum.DOCUMENT&&se.isMini===!0});i<s.length;i++){var a=s[i];a.firstSector=a.entry.length===0?-2:this.miniFat.allocate(vC(a.entry.length)/64)}var l=Di(4*this.miniFat.count())/512,c=l!==0?this.fat.allocate(l):-2,m=64*this.miniFat.count(),p=this.fat.allocate(Di(m)/512);this.liteEnts[0].firstSector=p;var u=this.fat.allocateAs(Di(4*(this.fat.count()+this.fat.count()/128+this.fat.count()/(128*109)))/512,-3),f=this.fat.count()-u,g=f>109?Di(4*Math.floor((f-109)/127*128))/512:0,y=g!==0?this.fat.allocateAs(g,-4):-2,b=new ArrayBuffer(512*(1+this.fat.count())),h=new Kk.default(b,0,Kk.default.LITTLE_ENDIAN);h.dynamicSize=!1,this.miniFat.finalize(512/4,-1);var v=[],w=[];{for(var x=0;x<109&&x<f;x++)v.push(u+x);for(var T=y+1;x<f;x++){w.push(u+x);var E=w.length&127;E===127&&(w.push(T),T++)}for(;;){var E=w.length&127;if(E===0)break;w.push(E===127?-2:-1)}}{h.seek(0),h.writeUint8Array(bC.default.FILE_HEADER),h.seek(24),h.writeUint16(62),h.writeUint16(3),h.writeUint16(65534),h.writeUint16(9),h.writeUint16(6),h.seek(44),h.writeInt32(f),h.writeInt32(o),h.seek(56),h.writeInt32(4096),h.writeInt32(c),h.writeInt32(l),h.writeInt32(y),h.writeInt32(g);for(var x=0;x<v.length;x++)h.writeInt32(v[x]);for(;x<109;x++)h.writeInt32(-1)}for(var x=0;x<this.liteEnts.length;x++){var a=this.liteEnts[x],C=512*(1+o)+128*x;h.seek(C),h.writeUCS2String(a.entry.name,null,null);var U=h.position-C;h.seek(C+64),h.writeUint16(Math.min(64,U+2)),h.writeUint8(a.entry.type),h.writeUint8(a.isRed?0:1),h.writeInt32(a.left),h.writeInt32(a.right),h.writeInt32(a.child),x===0&&(h.seek(C+80),h.writeUint8Array([11,13,2,0,0,0,0,0,192,0,0,0,0,0,0,70]));var M=x===0?m:a.entry.length,N=M!==0?a.firstSector:a.entry.type===sa.TypeEnum.DIRECTORY?0:-2;h.seek(C+116),h.writeInt32(N),h.writeInt32(M)}for(var D=0,O=this.liteEnts.filter(function(se){return se.entry.type==sa.TypeEnum.DOCUMENT&&se.isMini===!1});D<O.length;D++){var a=O[D],Y=a.entry.binaryProvider();h.seek(512*(1+a.firstSector)),h.writeUint8Array(Y)}for(var oe=0,Me=this.liteEnts.filter(function(se){return se.entry.type==sa.TypeEnum.DOCUMENT&&se.isMini===!0});oe<Me.length;oe++){var a=Me[oe],Y=a.entry.binaryProvider();h.seek(512*(1+p)+64*a.firstSector),h.writeUint8Array(Y)}h.seek(512*(1+c)),h.writeInt32Array(this.miniFat.sectors),this.fat.finalize(512/4,-1),h.seek(512*(1+u)),h.writeInt32Array(this.fat.sectors),g>=1&&(h.seek(512*(1+y)),h.writeInt32Array(w)),this.array=b}return e.prototype.compareName=function(t,o){var n=t.length-o.length;if(n===0){var r=t.toUpperCase(),a=o.toUpperCase();r>a?n=1:r<a&&(n=-1)}return n},e.prototype.buildTree=function(t){var o=this,n=this.liteEnts,r=n[t];if(r.entry.type===sa.TypeEnum.DOCUMENT)throw new Error("It must be a storage!");var a=r.entry.children.concat();if(1<=a.length){a.sort(function(p,u){return o.compareName(n[p].entry.name,n[u].entry.name)});var i=function(p,u,f){if(p<u){var g=Math.floor((p+u)/2),y=a[g],b=n[y];return b.isRed=f,b.left=i(p,g,!f),b.right=i(g+1,u,!f),y}else return-1},s=function(){var p=Math.floor(a.length/2),u=a[p],f=n[u];return f.isRed=!1,f.left=i(0,p,!0),f.right=i(p+1,a.length,!0),u};r.child=s();for(var l=0,c=a.filter(function(p){return n[p].entry.type===sa.TypeEnum.DIRECTORY});l<c.length;l++){var m=c[l];this.buildTree(m)}}},e}();function xC(e){return new Uint8Array(new yC(e).array)}});var Xk=Xt(Dl=>{"use strict";var wC=Dl&&Dl.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Dl,"__esModule",{value:!0});Dl.parse=kC;var Yk=wC(Al());function kC(e){for(var t=new Yk.default(e,0,Yk.default.LITTLE_ENDIAN),o=[];!t.isEof();){var n=t.readUint32(),r=t.readUint16(),a=t.readUint16();o.push({key:n,isStringProperty:(r&1)!=0,guidIndex:r>>1&32767,propertyIndex:a})}return o}});var Jk=Xt(Hg=>{"use strict";Object.defineProperty(Hg,"__esModule",{value:!0});Hg.parse=IC;function IC(e){for(var t=[],o=0;!e.isEof();){var n=e.readUint16();if(n===258){o=e.readUint16();for(var r=e.readUint16(),a=0;a<o;a+=1){var i=e.readInt32(),s=e.readUint8(),l=e.readString(s),c=e.readUint8(),m=e.readString(c),p=e.readUint8(),u=e.readString(p),f=e.readUint8(),g=e.readString(f),y=e.readInt32(),b=e.readUint8(),h=e.readInt32(),v=e.readInt32(),w=e.readInt32(),x=e.readInt32(),T=e.readInt32(),E=e.readInt32();t.push({VerbType:i,DisplayName:l})}}else if(n===260)for(var a=0;a<o;a+=1){var s=e.readUint8(),l=e.readUCS2String(s),f=e.readUint8(),g=e.readUCS2String(f);t[a].DisplayName=l}}return t.filter(function(C){return C.VerbType===4}).map(function(C){return C.DisplayName}).join(";")}});var Zk=Xt(Ug=>{"use strict";Object.defineProperty(Ug,"__esModule",{value:!0});Ug.parse=LC;var Fg=Ai(),EC=1,TC=2;function LC(e){var t={rules:[]};if(!e.isEof()){var o=e.readUint8();if(o!==2)throw new Error("TZDEFINITION major version not supported");var n=e.readUint8();if(o<1)throw new Error("TZDEFINITION minor version not supported");var r=e.readUint16(),a=e.readUint16();if(a&EC&&(e.readInt32(),e.readInt32(),e.readInt32(),e.readInt32()),a&TC){var i=e.readUint16();t.keyName=e.readUCS2String(i)}var s=e.readUint16();e.seek(4+r);for(var l=0;l<s;l++){var c=e.readUint8();if(c!==2)break;var m=e.readUint8();if(c<1)break;var p=e.readUint16(),u=e.position,f=e.readUint16(),g=(0,Fg.readSystemTime)(e),y=e.readInt32(),b=e.readInt32(),h=e.readInt32(),v=(0,Fg.readTransitionSystemTime)(e),w=(0,Fg.readTransitionSystemTime)(e),x=Object.assign({},{flags:f,start:g?.toUTCString()||null,bias:y,standardBias:b,daylightBias:h,standardDate:v,daylightDate:w});t.rules.push(x),e.seek(u+p)}}return t}});var e0=Xt(zg=>{"use strict";Object.defineProperty(zg,"__esModule",{value:!0});zg.parse=SC;var Qk=Ai();function SC(e){if(!e.isEof()){var t=e.readInt32(),o=e.readInt32(),n=e.readInt32(),r=e.readUint16(),a=(0,Qk.readTransitionSystemTime)(e),i=e.readUint16(),s=(0,Qk.readTransitionSystemTime)(e);return Object.assign({},{bias:t,standardBias:o,daylightBias:n,standardYear:r,standardDate:a,daylightYear:i,daylightDate:s})}return null}});var jg=Xt(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.OverrideFlags=Wt.EndType=Wt.CalendarType=Wt.PatternType=Wt.RecurFrequency=void 0;Wt.parse=PC;var t0;(function(e){e[e.Daily=8202]="Daily",e[e.Weekly=8203]="Weekly",e[e.Monthly=8204]="Monthly",e[e.Yearly=8205]="Yearly"})(t0||(Wt.RecurFrequency=t0={}));var wn;(function(e){e[e.Day=0]="Day",e[e.Week=1]="Week",e[e.Month=2]="Month",e[e.MonthEnd=4]="MonthEnd",e[e.MonthNth=3]="MonthNth",e[e.HjMonth=10]="HjMonth",e[e.HjMonthNth=11]="HjMonthNth",e[e.HjMonthEnd=12]="HjMonthEnd"})(wn||(Wt.PatternType=wn={}));var o0;(function(e){e[e.Default=0]="Default",e[e.CAL_GREGORIAN=1]="CAL_GREGORIAN",e[e.CAL_GREGORIAN_US=2]="CAL_GREGORIAN_US",e[e.CAL_JAPAN=3]="CAL_JAPAN",e[e.CAL_TAIWAN=4]="CAL_TAIWAN",e[e.CAL_KOREA=5]="CAL_KOREA",e[e.CAL_HIJRI=6]="CAL_HIJRI",e[e.CAL_THAI=7]="CAL_THAI",e[e.CAL_HEBREW=8]="CAL_HEBREW",e[e.CAL_GREGORIAN_ME_FRENCH=9]="CAL_GREGORIAN_ME_FRENCH",e[e.CAL_GREGORIAN_ARABIC=10]="CAL_GREGORIAN_ARABIC",e[e.CAL_GREGORIAN_XLIT_ENGLISH=11]="CAL_GREGORIAN_XLIT_ENGLISH",e[e.CAL_GREGORIAN_XLIT_FRENCH=12]="CAL_GREGORIAN_XLIT_FRENCH",e[e.CAL_LUNAR_JAPANESE=14]="CAL_LUNAR_JAPANESE",e[e.CAL_CHINESE_LUNAR=15]="CAL_CHINESE_LUNAR",e[e.CAL_SAKA=16]="CAL_SAKA",e[e.CAL_LUNAR_ETO_CHN=17]="CAL_LUNAR_ETO_CHN",e[e.CAL_LUNAR_ETO_KOR=18]="CAL_LUNAR_ETO_KOR",e[e.CAL_LUNAR_ROKUYOU=19]="CAL_LUNAR_ROKUYOU",e[e.CAL_LUNAR_KOREAN=20]="CAL_LUNAR_KOREAN",e[e.CAL_UMALQURA=23]="CAL_UMALQURA"})(o0||(Wt.CalendarType=o0={}));var n0;(function(e){e[e.EndAfterDate=8225]="EndAfterDate",e[e.EndAfterNOccurrences=8226]="EndAfterNOccurrences",e[e.NeverEnd=8227]="NeverEnd",e[e.NeverEnd2=4294967295]="NeverEnd2"})(n0||(Wt.EndType=n0={}));var wt;(function(e){e[e.ARO_SUBJECT=1]="ARO_SUBJECT",e[e.ARO_MEETINGTYPE=2]="ARO_MEETINGTYPE",e[e.ARO_REMINDERDELTA=4]="ARO_REMINDERDELTA",e[e.ARO_REMINDER=8]="ARO_REMINDER",e[e.ARO_LOCATION=16]="ARO_LOCATION",e[e.ARO_BUSYSTATUS=32]="ARO_BUSYSTATUS",e[e.ARO_ATTACHMENT=64]="ARO_ATTACHMENT",e[e.ARO_SUBTYPE=128]="ARO_SUBTYPE",e[e.ARO_APPTCOLOR=256]="ARO_APPTCOLOR",e[e.ARO_EXCEPTIONAL_BODY=512]="ARO_EXCEPTIONAL_BODY"})(wt||(Wt.OverrideFlags=wt={}));function MC(e){var t=e.readUint16();if(t!==12292)throw new Error("ReaderVersion not supported");var o=e.readUint16();if(o!==12292)throw new Error("WriterVersion not supported");var n=e.readUint16(),r=e.readUint16(),a=e.readUint16(),i=e.readUint32(),s=e.readUint32(),l=e.readUint32(),c=void 0,m=void 0,p=void 0;r===wn.Week?c={dayOfWeekBits:e.readUint32()}:r===wn.Month||r===wn.MonthEnd||r===wn.HjMonth||r===wn.HjMonthEnd?m={day:e.readUint32()}:(r===wn.MonthNth||r===wn.HjMonthNth)&&(p={dayOfWeekBits:e.readUint32(),n:e.readUint32()});var u=e.readUint32(),f=e.readUint32(),g=e.readUint32(),y=e.readUint32(),b=Array.from(e.readUint32Array(y)),h=e.readUint32(),v=Array.from(e.readUint32Array(h)),w=e.readUint32(),x=e.readUint32();return Object.assign({recurFrequency:n,patternType:r,calendarType:a,firstDateTime:i,period:s,slidingFlag:l,endType:u,occurrenceCount:f,firstDOW:g,deletedInstanceDates:b,modifiedInstanceDates:v,startDate:w,endDate:x},c?{patternTypeWeek:c}:{},m?{patternTypeMonth:m}:{},p?{patternTypeMonthNth:p}:{})}function PC(e,t){var o=MC(e),n=e.readUint32();if(n!==12294)throw new Error("ReaderVersion2 not supported");var r=e.readUint32();if(r<12294)throw new Error("WriterVersion2 not supported");for(var a=e.readUint32(),i=e.readUint32(),s=e.readUint16(),l=[],c=0;c<s;c++){var m=e.readUint32(),p=e.readUint32(),u=e.readUint32(),f=e.readUint16(),g=void 0;if(f&wt.ARO_SUBJECT){var y=e.readUint16(),b=e.readUint16();if(y-1!==b)throw new Error("subjectLength ".concat(y," and subjectLength2 ").concat(b," are not close!"));g=e.readString(b,t)}var h=void 0;f&wt.ARO_MEETINGTYPE&&(h=e.readUint32());var v=void 0;f&wt.ARO_REMINDERDELTA&&(v=e.readUint32());var w=void 0;f&wt.ARO_REMINDER&&(w=e.readUint32());var x=void 0;if(f&wt.ARO_LOCATION){var T=e.readUint16(),E=e.readUint16();if(T-1!==E)throw new Error("locationLength ".concat(T," and locationLength2 ").concat(E," are not close!"));x=e.readString(E,t)}var C=void 0;f&wt.ARO_BUSYSTATUS&&(C=e.readUint32());var U=void 0;f&wt.ARO_ATTACHMENT&&(U=e.readUint32());var M=void 0;f&wt.ARO_SUBTYPE&&(M=e.readUint32());var N=void 0;f&wt.ARO_APPTCOLOR&&(N=e.readUint32()),l.push(Object.assign({startDateTime:m,endDateTime:p,originalStartTime:u,overrideFlags:f},g?{subject:g}:{},h?{meetingType:h}:{},v?{reminderDelta:v}:{},w?{reminderSet:w}:{},x?{location:x}:{},C?{busyStatus:C}:{},U?{attachment:U}:{},M?{subType:M}:{},N?{appointmentColor:N}:{}))}var D=e.readUint32();if(D!==0)throw new Error("reservedBlock1Size ".concat(D," is not zero, AppointmentRecur is broken"));for(var c=0;c<s;c++){var O=l[c];if(12297<=r){var Y=e.readUint32();O.changeHighlight=e.readUint32(),e.position+=Y-4}var oe=e.readUint32();if(oe!==0)throw new Error("reservedBlockEE1Size ".concat(oe," is not zero, AppointmentRecur is broken"));if(O.overrideFlags&(wt.ARO_SUBJECT|wt.ARO_LOCATION)){var m=e.readUint32(),p=e.readUint32(),Me=e.readUint32();if(O.overrideFlags&wt.ARO_SUBJECT){var se=e.readUint16();O.subject=e.readUCS2String(se)}if(O.overrideFlags&wt.ARO_LOCATION){var F=e.readUint16();O.location=e.readUCS2String(F)}var de=e.readUint32();if(de!==0)throw new Error("reservedBlockEE2Size ".concat(de," is not zero, AppointmentRecur is broken"))}}var Ie=e.readUint32();if(Ie!==0)throw new Error("reservedBlock2Size ".concat(Ie," is not zero, AppointmentRecur is broken"));return{recurrencePattern:o,startTimeOffset:a,endTimeOffset:i,exceptionInfo:l}}});var qg=Xt(kt=>{"use strict";var i0=kt&&kt.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(kt,"__esModule",{value:!0});kt.OverrideFlags=kt.EndType=kt.CalendarType=kt.PatternType=kt.RecurFrequency=void 0;var ro=i0(Im()),or=i0(Al()),CC=Og(),AC=Gk(),_i=Ai(),BC=Xk(),DC=Jk(),_C=Zk(),RC=e0(),NC=jg(),_l=jg();Object.defineProperty(kt,"RecurFrequency",{enumerable:!0,get:function(){return _l.RecurFrequency}});Object.defineProperty(kt,"PatternType",{enumerable:!0,get:function(){return _l.PatternType}});Object.defineProperty(kt,"CalendarType",{enumerable:!0,get:function(){return _l.CalendarType}});Object.defineProperty(kt,"EndType",{enumerable:!0,get:function(){return _l.EndType}});Object.defineProperty(kt,"OverrideFlags",{enumerable:!0,get:function(){return _l.OverrideFlags}});var Ri;(function(e){e[e.DIRECTORY=1]="DIRECTORY",e[e.DOCUMENT=2]="DOCUMENT",e[e.ROOT=5]="ROOT"})(Ri||(Ri={}));var Vo;(function(e){e[e.root=0]="root",e[e.toSub=1]="toSub",e[e.named=2]="named"})(Vo||(Vo={}));function r0(e){return(e-116444736e9)/1e4}function a0(e){var t=e.indexOf("\0");return t!==-1?e.substring(0,t):e}var OC=function(){function e(t){this.reader=new CC.Reader(t)}return e.prototype.decodeField=function(t,o,n,r,a){var i=n(),s=new or.default(i,0,or.default.LITTLE_ENDIAN),l=ro.default.MSG.FIELD.FULL_NAME_MAPPING["".concat(t).concat(o)]||ro.default.MSG.FIELD.NAME_MAPPING[t],c=Vo.root,m=void 0,p=void 0,u=parseInt("0x".concat(t));if(u>=32768){var f=this.privatePidToKeyed[u];if(f)if(f.useName)l=f.name,c=Vo.named;else{m=f.propertySet,p=(0,_i.toHex4)(f.propertyLid);var g=ro.default.MSG.FIELD.PIDLID_MAPPING[f.propertySet];if(g!==void 0){var y=g[f.propertyLid];y!==void 0&&(y.dispid!==void 0?(l=y.dispid,c=Vo.root):(l=y.id,c=Vo.toSub))}}}var b=i,h=!1,v=ro.default.MSG.FIELD.TYPE_MAPPING[o];if(v==="string")b=a0(s.readString(i.length,r)),h=a;else if(v==="unicode")b=a0(s.readUCS2String(i.length/2)),h=a;else if(v==="binary")h=a;else if(v==="integer")b=s.readUint32();else if(v==="boolean")b=!!s.readUint16();else if(v==="time"){var w=s.readUint32(),x=w+4294967296*s.readUint32();b=new Date(r0(x)).toUTCString()}if(h&&(l=void 0),l==="PidLidVerbStream")l="votingOptions",c=Vo.root,b=(0,DC.parse)(s);else if(l==="apptTZDefStartDisplay"||l==="apptTZDefEndDisplay"||l==="apptTZDefRecur")c=Vo.root,b=(0,_C.parse)(s);else if(l==="timeZoneStruct")b=(0,RC.parse)(s);else if(l==="apptRecur")try{b=(0,NC.parse)(s,r)}catch(M){console.debug(M),l=void 0}else if(l==="recipType"){var T=1,E=2,C=3;b===T?b="to":b===E?b="cc":b===C&&(b="bcc")}else l==="globalAppointmentID"&&(b=(0,_i.bin2HexUpper)(s));var U="".concat(t).concat(o);return{key:l,keyType:c,value:b,notForRawProp:h,propertyTag:U,propertySet:m,propertyLid:p}},e.prototype.fieldsDataDocument=function(t,o,n){var r=o.name.substring(12).toLowerCase(),a=r.substring(0,4),i=r.substring(4,8);t.propertyObserver&&t.propertyObserver(n,parseInt(r.substring(0,8),16),o.provider()),a==ro.default.MSG.FIELD.CLASS_MAPPING.ATTACHMENT_DATA?(n.dataId=o.dataId,n.contentLength=o.length):this.setDecodedFieldTo(t,n,this.decodeField(a,i,o.provider,t.ansiEncoding,!1))},e.prototype.setDecodedFieldTo=function(t,o,n){var r=n.key,a=n.keyType,i=n.value;r!==void 0&&a===Vo.root&&(o[r]=i),t.includeRawProps===!0&&(o.rawProps=o.rawProps||[],n.notForRawProp||o.rawProps.push({propertyTag:n.propertyTag,propertySet:n.propertySet,propertyLid:n.propertyLid,propertyName:n.keyType===Vo.named?n.key:void 0,value:i}))},e.prototype.getFieldType=function(t){var o=t.name.substring(12).toLowerCase();return o.substring(4,8)},e.prototype.fieldsDataDirInner=function(t,o,n,r){var a=this;if(o.name.indexOf(ro.default.MSG.FIELD.PREFIX.ATTACHMENT)==0){var i={dataType:"attachment"};r.attachments.push(i),this.fieldsDataDir(t,o,n,i,"attachment")}else if(o.name.indexOf(ro.default.MSG.FIELD.PREFIX.RECIPIENT)==0){var s={dataType:"recipient"};r.recipients.push(s),this.fieldsDataDir(t,o,n,s,"recip")}else if(o.name.indexOf(ro.default.MSG.FIELD.PREFIX.NAMEID)==0)this.fieldsNameIdDir(t,o,n,r);else{var l=this.getFieldType(o);if(l==ro.default.MSG.FIELD.DIR_TYPE.INNER_MSG){var c={dataType:"msg",attachments:[],recipients:[]};this.fieldsDataDir(t,o,n,c,"sub"),r.innerMsgContentFields=c,r.innerMsgContent=!0,r.folderId=o.dataId,this.innerMsgBurners[o.dataId]=function(){return a.burnMsg(o,n)}}}},e.prototype.burnMsg=function(t,o){var n=[{name:"Root Entry",type:Ri.ROOT,children:[],length:0}];return this.registerFolder(n,0,t,o,0),(0,AC.burn)(n)},e.prototype.registerFolder=function(t,o,n,r,a){for(var i=function(v){var w=v.provider,x=v.length;if(a===0&&v.name==="__properties_version1.0"){var T=w(),E=new Uint8Array(T.length+8);E.set(T.subarray(0,24),0),E.set(T.subarray(24),32),w=function(){return E},x=E.length}var C=t.length;t[o].children.push(C),t.push({name:v.name,type:Ri.DOCUMENT,binaryProvider:w,length:x})},s=0,l=n.fileNameSets();s<l.length;s++){var c=l[s];i(c)}if(a===0)for(var m=r.subFolders().filter(function(v){return v.name===ro.default.MSG.FIELD.PREFIX.NAMEID}),p=0,u=m;p<u.length;p++){var f=u[p],g=t.length;t[o].children.push(g),t.push({name:f.name,type:Ri.DIRECTORY,children:[],length:0}),this.registerFolder(t,g,f,r,a+1)}for(var y=0,b=n.subFolders();y<b.length;y++){var h=b[y],g=t.length;t[o].children.push(g),t.push({name:h.name,type:Ri.DIRECTORY,children:[],length:0}),this.registerFolder(t,g,h,r,a+1)}},e.prototype.fieldsRecipAndAttachmentProperties=function(t,o,n){var r=o.provider(),a=new or.default(r,8,or.default.LITTLE_ENDIAN);this.importPropertiesFromFile(t,a,n)},e.prototype.importPropertiesFromFile=function(t,o,n){for(var r={64:function(l){var c=l.getUint32(0,!0)+4294967296*l.getUint32(4,!0);return new Date(r0(c)).toUTCString()}},a=function(){var l=o.readUint32();if(l===0)return"break";var c=o.readUint32(),m=o.readUint8Array(8);t.propertyObserver(n,l,m);var p=(0,_i.toHex2)(l/65536&65535),u=(0,_i.toHex2)(l&65535);i.setDecodedFieldTo(t,n,i.decodeField(p,u,function(){return m},t.ansiEncoding,!0))},i=this;!o.isEof();){var s=a();if(s==="break")break}},e.prototype.fieldsRootProperties=function(t,o,n){var r=o.provider(),a=new or.default(r,32,or.default.LITTLE_ENDIAN);this.importPropertiesFromFile(t,a,n)},e.prototype.fieldsDataDir=function(t,o,n,r,a){for(var i=0,s=o.subFolders();i<s.length;i++){var l=s[i];this.fieldsDataDirInner(t,l,n,r)}for(var c=0,m=o.fileNameSets();c<m.length;c++){var p=m[c];p.name.indexOf(ro.default.MSG.FIELD.PREFIX.DOCUMENT)==0?this.fieldsDataDocument(t,p,r):p.name==="__properties_version1.0"&&(a==="recip"||a==="attachment"||a==="sub"?this.fieldsRecipAndAttachmentProperties(t,p,r):a==="root"&&this.fieldsRootProperties(t,p,r))}},e.prototype.fieldsNameIdDir=function(t,o,n,r){for(var a=void 0,i=void 0,s=void 0,l=0,c=o.fileNameSets();l<c.length;l++){var m=c[l];if(m.name.indexOf(ro.default.MSG.FIELD.PREFIX.DOCUMENT)==0){var p=m.name.substring(12).toLowerCase(),u=p.substring(0,4),f=p.substring(4,8);u==="0002"&&f==="0102"?a=m.provider():u==="0003"&&f==="0102"?s=m.provider():u==="0004"&&f==="0102"&&(i=m.provider())}}if(a!==void 0&&i!==void 0&&s!==void 0)for(var g=(0,BC.parse)(s),y=new or.default(i,0,or.default.LITTLE_ENDIAN),b=0,h=g;b<h.length;b++){var v=h[b];if(v.isStringProperty){y.seek(v.key);var w=y.readUint32();this.privatePidToKeyed[32768|v.propertyIndex]={useName:!0,name:y.readUCS2String(w/2)}}else this.privatePidToKeyed[32768|v.propertyIndex]={useName:!1,propertySet:v.guidIndex===1?"00020328-00000-0000-C000-00000000046":v.guidIndex===2?"00020329-00000-0000-C000-00000000046":(0,_i.msftUuidStringify)(a,16*(v.guidIndex-3)),propertyLid:v.key}}},e.prototype.fieldsDataReader=function(t){var o={dataType:"msg",attachments:[],recipients:[]};return this.fieldsDataDir(t,this.reader.rootFolder(),this.reader.rootFolder(),o,"root"),o},e.prototype.parseMsgData=function(t){return this.reader.parse(),this.fieldsDataReader(t)},e.prototype.getFileData=function(){var t,o,n;if(this.fieldsData===void 0){if(!this.reader.isMSGFile())return{dataType:null,error:"Unsupported file type!"};this.innerMsgBurners={},this.privatePidToKeyed={},this.fieldsData=this.parseMsgData({propertyObserver:((t=this.parserConfig)===null||t===void 0?void 0:t.propertyObserver)||function(){},includeRawProps:!!(!((o=this.parserConfig)===null||o===void 0)&&o.includeRawProps),ansiEncoding:(0,_i.emptyToNull)((n=this.parserConfig)===null||n===void 0?void 0:n.ansiEncoding)})}return this.fieldsData},e.prototype.getAttachment=function(t){var o=typeof t=="number"?this.fieldsData.attachments[t]:t;if(o.innerMsgContent===!0&&typeof o.folderId=="number")return{fileName:o.name+".msg",content:this.innerMsgBurners[o.folderId]()};var n=this.reader.readFileOf(o.dataId);return{fileName:o.fileName,content:n}},e}();kt.default=OC});var s0=Xt(Wo=>{"use strict";var HC=Wo&&Wo.__createBinding||(Object.create?function(e,t,o,n){n===void 0&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);(!r||("get"in r?!t.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){n===void 0&&(n=o),e[n]=t[o]}),FC=Wo&&Wo.__exportStar||function(e,t){for(var o in e)o!=="default"&&!Object.prototype.hasOwnProperty.call(t,o)&&HC(t,e,o)},UC=Wo&&Wo.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Wo,"__esModule",{value:!0});var zC=UC(qg());FC(qg(),Wo);Wo.default=zC.default});function jC(e){let t=e.match(/^=\?([^?]+)\?([BbQq])\?([^?]*)\?=$/);if(!t)return null;let o=t[1].toLowerCase(),n=t[2].toUpperCase(),r=t[3];try{let a;if(n==="B"){let i=atob(r);a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s)}else{let i=[];for(let s=0;s<r.length;s++){let l=r.charCodeAt(s);if(l===95){i.push(32);continue}if(l===61&&s+2<r.length){let c=r.slice(s+1,s+3);if(/^[0-9A-Fa-f]{2}$/.test(c)){i.push(parseInt(c,16)),s+=2;continue}}i.push(l)}a=new Uint8Array(i)}return new TextDecoder(o,{fatal:!1}).decode(a)}catch{return null}}function Vg(e){let t=/=\?[^?]+\?[BbQq]\?[^?]*\?=/g,o="",n=0,r=!1,a;for(;(a=t.exec(e))!==null;){let i=e.slice(n,a.index);r&&/^\s*$/.test(i)||(o+=i);let s=jC(a[0])??a[0];o+=s,n=a.index+a[0].length,r=!0}return o+=e.slice(n),o}function Tm(e){if(!e)return;let t=Vg(e),o=/[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}/g,n=[],r=new Set,a;for(;(a=o.exec(t))!==null;){let i=a[0].trim(),s=i.toLowerCase();r.has(s)||(r.add(s),n.push(i))}return n.length>0?n:void 0}function qC(e){let t=Vg(e).trim(),o=t.match(/^(.*?)<([^>]+)>\s*$/);if(o){let n=o[1].trim().replace(/^"|"$/g,"").trim(),r=o[2].trim();return{fromName:n||void 0,fromEmail:r||void 0}}return/^[^@\s]+@[^@\s]+$/.test(t)?{fromEmail:t}:{fromName:t||void 0}}function $C(e){let t=Date.parse(e.trim());if(!Number.isNaN(t))return new Date(t).toISOString()}function KC(e,t){let o=e.replace(/=\r?\n/g,""),n=[];for(let r=0;r<o.length;r++){let a=o.charCodeAt(r);if(a===61&&r+2<o.length){let i=o.slice(r+1,r+3);if(/^[0-9A-Fa-f]{2}$/.test(i)){n.push(parseInt(i,16)),r+=2;continue}}a<=255?n.push(a):n.push(...new TextEncoder().encode(o[r]))}try{return new TextDecoder(t,{fatal:!1}).decode(new Uint8Array(n))}catch{return new TextDecoder("utf-8",{fatal:!1}).decode(new Uint8Array(n))}}function VC(e,t){try{let o=atob(e.replace(/\s+/g,"")),n=new Uint8Array(o.length);for(let r=0;r<o.length;r++)n[r]=o.charCodeAt(r);return new TextDecoder(t,{fatal:!1}).decode(n)}catch{return e}}function Lm(e){let t=e.replace(/\r\n/g,`
`).replace(/\r/g,`
`),o=t.indexOf(`

`);return o===-1?{headerBlock:t,body:""}:{headerBlock:t.slice(0,o),body:t.slice(o+2)}}function Sm(e){let t=new Map,o=e.split(`
`),n=null,r=()=>{n&&(t.set(n.name.toLowerCase(),n.value),n=null)};for(let a of o){if(/^[ \t]/.test(a)&&n){n.value+=" "+a.trim();continue}let i=a.match(/^([!-9;-~]+):\s?(.*)$/);i&&(r(),n={name:i[1],value:i[2]})}return r(),t}function Rl(e){if(!e)return{mediaType:"text/plain",params:{}};let t=e.split(";").map(r=>r.trim()),o=(t.shift()??"").toLowerCase(),n={};for(let r of t){let a=r.match(/^([^=]+)=(.*)$/);if(!a)continue;let i=a[1].trim().toLowerCase(),s=a[2].trim();s.startsWith('"')&&s.endsWith('"')&&(s=s.slice(1,-1)),n[i]=s}return{mediaType:o,params:n}}function Ni(e,t){let n=(Rl(t.get("content-type")).params.charset||"utf-8").toLowerCase(),r=(t.get("content-transfer-encoding")||"7bit").toLowerCase();if(r==="base64")return VC(e,n);if(r==="quoted-printable")return KC(e,n);if(n!=="utf-8"&&n!=="us-ascii"&&n!=="ascii")try{let a=new Uint8Array(e.length);for(let i=0;i<e.length;i++)a[i]=e.charCodeAt(i)&255;return new TextDecoder(n,{fatal:!1}).decode(a)}catch{return e}return e}function l0(e,t,o){if(t.mediaType.startsWith("multipart/")){let n=t.params.boundary;if(!n)return;let r="--"+n,a=e.split(r);for(let i=1;i<a.length;i++){let s=a[i];if(s.startsWith("--"))break;s=s.replace(/^\r?\n/,"");let{headerBlock:l,body:c}=Lm(s),m=Sm(l),p=Rl(m.get("content-type"));if(p.mediaType==="text/plain")return Ni(c.replace(/\r?\n--$/,""),m);if(p.mediaType.startsWith("multipart/")){let u=l0(c,p,m);if(u)return u}}for(let i=1;i<a.length;i++){let s=a[i];if(s.startsWith("--"))break;s=s.replace(/^\r?\n/,"");let{headerBlock:l,body:c}=Lm(s),m=Sm(l);if(Rl(m.get("content-type")).mediaType==="text/html"){let u=Ni(c,m);return Kg(u)}}return}if(t.mediaType==="text/plain")return Ni(e,o);if(t.mediaType==="text/html"){let n=Ni(e,o);return Kg(n)}}function c0(e,t,o){if(t.mediaType==="text/html")return Ni(e,o);if(t.mediaType.startsWith("multipart/")){let n=t.params.boundary;if(!n)return;let r="--"+n,a=e.split(r);for(let i=1;i<a.length;i++){let s=a[i];if(s.startsWith("--"))break;s=s.replace(/^\r?\n/,"");let{headerBlock:l,body:c}=Lm(s),m=Sm(l),p=Rl(m.get("content-type"));if(p.mediaType==="text/html")return Ni(c.replace(/\r?\n--$/,""),m);if(p.mediaType.startsWith("multipart/")){let u=c0(c,p,m);if(u)return u}}}}function Wg(e){let{headerBlock:t,body:o}=Lm(e),n=Sm(t),r=Rl(n.get("content-type")),a=n.get("subject"),i=n.get("from"),s=n.get("date"),l=a?Vg(a).trim():void 0,c=i?qC(i):{},m=s?$C(s):void 0,p=l0(o,r,n),u=c0(o,r,n),f=n.get("message-id")?.trim()||void 0;return{subject:l,fromName:c.fromName,fromEmail:c.fromEmail,dateISO:m,body:p?.replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim(),bodyHtml:u?.trim()||void 0,internetMessageId:f,toEmails:Tm(n.get("to")),ccEmails:Tm(n.get("cc"))}}async function Gg(e){let t=await e.arrayBuffer(),o=$g.default.default??$g.default,r=new o(t).getFileData(),a=[{key:"clientSubmitTime",val:r.clientSubmitTime},{key:"messageDeliveryTime",val:r.messageDeliveryTime},{key:"creationTime",val:r.creationTime},{key:"lastModificationTime",val:r.lastModificationTime}];console.debug("[app/parseMsg] date candidates:",a);let i;for(let v of a){if(!v.val||typeof v.val!="string")continue;let w=Date.parse(v.val);if(Number.isNaN(w))continue;let x=new Date(w).getUTCFullYear();if(!(x<1980||x>2100)){i=new Date(w).toISOString(),console.debug("[app/parseMsg] adopted date:",v.key,"\u2192",i);break}}let s=r.bodyHtml?.trim()||void 0;if(!s){let v=r.html;if(v instanceof Uint8Array&&v.length){let w=new TextDecoder("utf-8").decode(v),x=w.match(/charset\s*=\s*["']?([\w-]+)/i);if(x&&x[1]&&!/utf-?8/i.test(x[1]))try{w=new TextDecoder(x[1].toLowerCase()).decode(v)}catch{}s=w.trim()||void 0}}let l=r.body?.trim()||void 0;!l&&s&&(l=Kg(s).trim()||void 0);let c=r.senderEmail,m=r.senderSmtpAddress??r.sentRepresentingSmtpAddress,p;typeof m=="string"&&/@/.test(m)?p=m.trim():typeof c=="string"&&/@/.test(c)&&(p=c.trim());let u=r,f,g=u.internetMessageId;if(typeof g=="string"&&g.trim())f=g.trim();else{let v=u.headers;if(typeof v=="string"&&v){let w=v.match(/^message-id:\s*(<[^>\r\n]+>)/im);w&&(f=w[1].trim())}}let y,b,h=r.recipients;if(Array.isArray(h)){let v=[],w=[];for(let x of h){if(!x||typeof x!="object")continue;let T=x,E=String(T.smtpAddress??"").trim(),C=String(T.email??"").trim(),U="";if(E&&/@/.test(E))U=E;else if(C&&/@/.test(C))U=C;else continue;let M=T.recipType,N=typeof M=="string"&&M.toLowerCase()==="cc"||typeof M=="number"&&M===2,D=typeof M=="string"&&M.toLowerCase()==="to"||typeof M=="number"&&M===1;N?w.push(U):D&&v.push(U)}v.length>0&&(y=v),w.length>0&&(b=w)}if(!y||!b){let v=u.headers;if(typeof v=="string"&&v){if(!y){let w=v.match(/^to:\s*([^\r\n]+(?:\r?\n[ \t][^\r\n]+)*)/im);y=Tm(w?.[1])}if(!b){let w=v.match(/^cc:\s*([^\r\n]+(?:\r?\n[ \t][^\r\n]+)*)/im);b=Tm(w?.[1])}}}return{subject:r.subject?.trim()||void 0,fromName:r.senderName?.trim()||void 0,fromEmail:p,dateISO:i,body:l,bodyHtml:s,internetMessageId:f,toEmails:y,ccEmails:b}}function Kg(e){return e.replace(/<style[\s\S]*?<\/style>/gi,"").replace(/<script[\s\S]*?<\/script>/gi,"").replace(/<\/(p|div|li|tr|h[1-6])>\s*/gi,`
`).replace(/\s*<br\s*\/?>\s*/gi,`
`).replace(/<(p|div|li|tr|h[1-6])[^>]*>\s*/gi,"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`)}var $g,d0=L(()=>{"use strict";$g=BT(s0())});function m0(e){let t=[e.fromName,e.fromEmail&&e.fromEmail!==e.fromName?"<"+e.fromEmail+">":""].filter(Boolean).join(" ").trim()||e.fromEmail||"";return{imid:(e.internetMessageId||"").trim(),subject:e.subject||"",from:t,date:e.dateISO||""}}function p0(e){let t=e.name.toLowerCase();return t.endsWith(".eml")||t.endsWith(".msg")}async function u0(e,t){try{let o=await fetch(e,{credentials:"include"});if(!o.ok)return null;let n=t.toLowerCase();return n.endsWith(".eml")?Wg(await o.text()):n.endsWith(".msg")?Gg(new File([await o.blob()],t)):null}catch{return null}}function f0(e){return e.body&&e.body.trim()?e.body:e.bodyHtml?e.bodyHtml.replace(/<\s*(script|style)[^>]*>[\s\S]*?<\/\s*\1\s*>/gi," ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/[ \t]+/g," ").replace(/\n{3,}/g,`

`).trim():""}async function g0(e){let t=e.name.toLowerCase();try{if(t.endsWith(".eml")){let o=m0(Wg(await e.text()));return o.imid||o.subject?o:null}if(t.endsWith(".msg")){let o=m0(await Gg(e));return o.imid||o.subject?o:null}}catch{}return null}var Yg=L(()=>{"use strict";d0()});function WC(){let e=co.get();if(e)try{return new URL(e).origin}catch{}return"http://localhost:18080"}async function GC(e){if(!e){k("Message-Id \u304C\u7121\u3044\u305F\u3081\u958B\u3051\u307E\u305B\u3093","err");return}let t=WC()+"/memola/outlook/open?id="+encodeURIComponent(e);try{let o=await fetch(t),n=await o.json().catch(()=>null);if(!o.ok||!n?.ok){k("\u30EA\u30EC\u30FC\u304C\u30E1\u30FC\u30EB\u3092\u958B\u3051\u307E\u305B\u3093\u3067\u3057\u305F","err");return}n.found===!1&&k("Outlook \u5185\u306B\u8A72\u5F53\u30E1\u30FC\u30EB\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F","err")}catch{k("\u30EA\u30EC\u30FC\u306B\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093(\u4E2D\u7D99\u30B5\u30FC\u30D0\u3092\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044)","err")}}function h0(e,t){let o=!0,n=()=>window.getSelection()?.anchorNode?.parentElement?.closest("[data-block-id]")?.dataset.blockId||null,r=(s,l)=>{let c=By(l);return e.applyMutation(m=>{let p=m.blocks.slice(),u=s?p.findIndex(b=>b.id===s):p.length-1,f=u>=0?u+1:p.length;p.splice(f,0,c);let g=p[f+1],y;if(g&&g.kind!=="image"&&g.kind!=="email"&&"inline"in g)y=g.id;else{let b=rt("");p.splice(f+1,0,b),y=b.id}return{...m,blocks:p,selection:{kind:"caret",blockId:y,offset:0}}},"structural"),c.id},a=async s=>{if(!s.dataTransfer?.files?.length)return;let l=Array.from(s.dataTransfer.files).filter(p0);if(l.length===0)return;s.preventDefault();let c=n();try{_(!0,"\u30E1\u30FC\u30EB\u3092\u53D6\u308A\u8FBC\u307F\u4E2D...");for(let m of l){if(!o)return;let p=await g0(m);if(!p){k(`${m.name}: \u30E1\u30FC\u30EB\u3092\u89E3\u6790\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F`,"err");continue}let u=await Dg(m,"mail",m.name.toLowerCase().endsWith(".msg")?".msg":".eml");c=r(c,{imid:p.imid,subject:p.subject,from:p.from,date:p.date,fileUrl:u,filename:m.name})}}catch(m){o&&k("\u30E1\u30FC\u30EB\u53D6\u308A\u8FBC\u307F\u5931\u6557: "+m.message,"err")}finally{_(!1)}},i=s=>{let l=s.target?.closest?.(".memola-email-src");l&&(s.preventDefault(),s.stopPropagation(),GC(l.dataset.emailSrc||""))};return t.addEventListener("drop",a),t.addEventListener("click",i,!0),()=>{o=!1,t.removeEventListener("drop",a),t.removeEventListener("click",i,!0)}}var b0=L(()=>{"use strict";Ro();_g();Yg();be();le()});function XC(e){try{let r=document.createRange();r.selectNodeContents(e);let a=r.getClientRects();for(let i=0;i<a.length;i++)if(a[i].height>0)return{top:a[i].top,height:a[i].height}}catch{}let t=e.getBoundingClientRect(),o=parseFloat(window.getComputedStyle(e).lineHeight),n=isFinite(o)&&o>0?Math.min(o,t.height):t.height;return{top:t.top,height:n}}function v0(e,t){let o=document.createElement("div");o.className="memola-block-handle",o.style.cssText="position:absolute; cursor:grab; user-select:none; opacity:0; pointer-events:none; z-index:2147483646; padding:2px 4px; color:#9b9a97; font-size:18px; line-height:1; transition:opacity 0.1s;",o.textContent="\u22EE\u22EE",o.draggable=!0,o.title="\u30C9\u30E9\u30C3\u30B0\u3067\u79FB\u52D5 / \u30AF\u30EA\u30C3\u30AF\u3067\u30E1\u30CB\u30E5\u30FC",(document.getElementById("memola-overlay")||document.body).appendChild(o);let n=null,r=null,a=null,i=null,s=!1,l=M=>{if(M===n)return;n=M;let N=M.getBoundingClientRect(),D=o.offsetHeight||22,O,Y;if(M.dataset.blockKind==="rule")O=N.top,Y=N.height;else{let oe=XC(M);O=oe.top,Y=oe.height}o.style.top=O+window.scrollY+(Y-D)/2+"px",o.style.left=N.left+window.scrollX-28+"px",o.style.opacity="1",o.style.pointerEvents="auto"},c=()=>{i||(n=null,o.style.opacity="0",o.style.pointerEvents="none")},m=M=>{i&&!i.contains(M.target)&&M.target!==o&&u()},p=M=>{M.key==="Escape"&&(M.preventDefault(),M.stopPropagation(),u())};function u(){i&&(i.remove(),i=null),document.removeEventListener("mousedown",m,!0),document.removeEventListener("keydown",p,!0)}let f=(M,N)=>{let D=document.createElement("button");return D.className="memola-blk-menu-item",D.textContent=M,D.addEventListener("mousedown",O=>{O.preventDefault(),O.stopPropagation(),u(),N()}),D},g=M=>{let N=M.dataset.blockId;if(!N)return;u(),i=document.createElement("div"),i.className="memola-blk-menu",i.appendChild(f("\uFF0B \u4E0B\u306B\u30D6\u30ED\u30C3\u30AF\u3092\u8FFD\u52A0",()=>{e.applyMutation(oe=>ai(oe,N,rt("")),"structural")})),i.appendChild(f("\u{1F4AC} \u30B3\u30E1\u30F3\u30C8",()=>{Promise.resolve().then(()=>(jo(),yn)).then(oe=>{let Me=oe.currentCommentTarget();Me&&oe.openCommentPopover(Me.pageId,N)})}));let D=document.createElement("div");D.className="memola-blk-menu-hd",D.textContent="\u7A2E\u985E\u3092\u5909\u66F4",i.appendChild(D);for(let oe of YC)i.appendChild(f(oe.label,()=>{e.applyMutation(Me=>Dy(Me,N,oe.cmd),"structural")}));(document.getElementById("memola-overlay")||document.body).appendChild(i);let O=o.getBoundingClientRect();i.style.left=O.right+window.scrollX+4+"px",i.style.top=O.top+window.scrollY+"px";let Y=i.getBoundingClientRect();Y.right>window.innerWidth&&(i.style.left=O.left+window.scrollX-Y.width-4+"px"),Y.bottom>window.innerHeight&&(i.style.top=window.innerHeight-Y.height-8+window.scrollY+"px"),setTimeout(()=>{document.addEventListener("mousedown",m,!0),document.addEventListener("keydown",p,!0)},0)},y=M=>{if(M.preventDefault(),M.stopPropagation(),s){s=!1;return}if(i){u();return}n&&g(n)};o.addEventListener("click",y);let b=(M,N)=>{let D=Array.from(t.children);for(let O of D){if(!O.dataset.blockId)continue;let Y=O.getBoundingClientRect(),oe=Y.left-32;if(M>=oe&&M<=Y.right&&N>=Y.top&&N<=Y.bottom)return O}return null},h=M=>{for(;M&&M!==t;){let N=M;if(N.parentElement===t&&N.dataset?.blockId)return N;M=M.parentNode}return null},v=()=>{let M=window.getSelection();if(!M||M.rangeCount===0)return null;let N=M.getRangeAt(0);return t.contains(N.startContainer)?h(N.startContainer):null},w=M=>{if(r)return;let N=M.target;if(N===o)return;let D=b(M.clientX,M.clientY);if(D){l(D);return}if(N&&!t.contains(N)){let O=v();O?l(O):c()}};document.addEventListener("mousemove",w);let x=()=>{if(r)return;let M=v();M&&l(M)};document.addEventListener("selectionchange",x);let T=M=>{if(!n){M.preventDefault();return}if(s=!0,u(),r=n.dataset.blockId||null,!r){M.preventDefault();return}n.classList.add("memola-block-dragging"),M.dataTransfer&&(M.dataTransfer.effectAllowed="move",M.dataTransfer.setData("text/plain","")),a=document.createElement("div"),a.className="memola-block-placeholder",a.style.cssText="height:2px; background:#2383e2; margin:0 0 0 0; border-radius:1px;",document.addEventListener("dragover",C),document.addEventListener("drop",U)},E=()=>{r&&n&&n.classList.remove("memola-block-dragging"),a?.parentNode&&a.parentNode.removeChild(a),a=null,r=null,setTimeout(()=>{s=!1},0),document.removeEventListener("dragover",C),document.removeEventListener("drop",U)};o.addEventListener("dragstart",T),o.addEventListener("dragend",E);let C=M=>{if(!r||!a)return;M.preventDefault(),M.dataTransfer&&(M.dataTransfer.dropEffect="move");let N=Array.from(t.children).filter(oe=>oe.dataset.blockId&&oe.dataset.blockId!==r&&oe!==a);if(N.length===0){t.appendChild(a);return}let D=N[0].getBoundingClientRect();if(M.clientY<D.top){a!==t.firstElementChild&&t.insertBefore(a,N[0]);return}let Y=N[N.length-1].getBoundingClientRect();if(M.clientY>Y.bottom){a!==t.lastElementChild&&t.appendChild(a);return}for(let oe of N){let Me=oe.getBoundingClientRect();if(M.clientY>=Me.top&&M.clientY<=Me.bottom){let F=M.clientY<Me.top+Me.height/2?oe:oe.nextSibling;a.nextSibling!==F&&a!==F&&t.insertBefore(a,F);return}}},U=M=>{if(!r||!a?.parentNode){E();return}M.preventDefault();let N=Array.from(t.children),D=0;for(let Y of N){if(Y===a)break;Y.dataset.blockId&&Y.dataset.blockId!==r&&D++}let O=r;e.applyMutation(Y=>My(Y,O,D),"structural"),E()};return()=>{E(),u(),document.removeEventListener("mousemove",w),document.removeEventListener("selectionchange",x),document.removeEventListener("dragover",C),document.removeEventListener("drop",U),o.remove()}}var YC,y0=L(()=>{"use strict";Ro();YC=[{cmd:"p",label:"\u30C6\u30AD\u30B9\u30C8"},{cmd:"h1",label:"\u898B\u51FA\u30571"},{cmd:"h2",label:"\u898B\u51FA\u30572"},{cmd:"h3",label:"\u898B\u51FA\u30573"},{cmd:"todo",label:"ToDo \u30EA\u30B9\u30C8"},{cmd:"ul",label:"\u7B87\u6761\u66F8\u304D\u30EA\u30B9\u30C8"},{cmd:"ol",label:"\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8"},{cmd:"quote",label:"\u5F15\u7528"},{cmd:"callout",label:"\u30B3\u30FC\u30EB\u30A2\u30A6\u30C8"},{cmd:"pre",label:"\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF"},{cmd:"hr",label:"\u533A\u5207\u308A\u7DDA"}]});function w0(e,t){let o=null,n=null,r=()=>{n&&(clearTimeout(n),n=null)},a=()=>{n||(n=setTimeout(()=>{n=null,as(),o=null},JC))},i=()=>o&&t.querySelector('[data-block-id="'+x(o)+'"]')?.querySelector(".memola-itbl-wrap")||null,s=S=>{let A=typeof document.elementFromPoint=="function"?document.elementFromPoint(S.clientX,S.clientY):S.target;if(A&&typeof A.closest=="function"&&A.closest(".memola-tbl-btn")){r();return}let R=A&&typeof A.closest=="function"?A.closest(".memola-itbl-wrap"):null;if(R&&t.contains(R)){let G=R.closest("[data-block-id]")?.dataset.blockId;if(G){r(),o=G,Gb(R,S.clientX,S.clientY);return}}let H=i();if(H){let z=H.getBoundingClientRect();if(S.clientX>=z.left-Mm&&S.clientX<=z.right+Mm&&S.clientY>=z.top-Mm&&S.clientY<=z.bottom+Mm){r(),Gb(H,S.clientX,S.clientY);return}}a()},l=S=>{let A=e.getSelection();if(A&&A.kind==="table-cells"&&(S.key==="Backspace"||S.key==="Delete")){S.preventDefault(),S.stopPropagation(),T(A);return}let R=S.target;if(!R||R.tagName!=="TD")return;let H=R;if(!t.contains(H))return;let z=c(H);if(!z||S.isComposing||S.keyCode===229)return;let G=S.key;if(G==="Enter"&&!S.shiftKey&&!S.metaKey&&!S.ctrlKey&&!S.altKey){S.preventDefault(),S.stopPropagation(),g(H,z.row+1,z.col,"row");return}if(G==="Tab"){if(S.preventDefault(),S.stopPropagation(),S.shiftKey)z.col>0?g(H,z.row,z.col-1):z.row>0&&g(H,z.row-1,m(H));else{let fe=m(H);z.col<fe?g(H,z.row,z.col+1):g(H,z.row+1,0,"row")}return}if(G==="ArrowDown"){S.preventDefault(),S.stopPropagation(),z.row<p(H)&&g(H,z.row+1,z.col);return}if(G==="ArrowUp"){S.preventDefault(),S.stopPropagation(),z.row>0&&g(H,z.row-1,z.col);return}if(G==="ArrowLeft"&&y(H)){S.preventDefault(),S.stopPropagation(),z.col>0?g(H,z.row,z.col-1):z.row>0&&g(H,z.row-1,m(H));return}if(G==="ArrowRight"&&b(H)){S.preventDefault(),S.stopPropagation();let fe=m(H);z.col<fe?g(H,z.row,z.col+1):z.row<p(H)&&g(H,z.row+1,0);return}};function c(S){let A=S.parentElement;if(!A||A.tagName!=="TR")return null;let R=A.parentElement;if(!R||R.tagName!=="TBODY")return null;let H=Array.from(R.children).indexOf(A),z=Array.from(A.children).indexOf(S);return H<0||z<0?null:{tbody:R,row:H,col:z}}function m(S){let A=S.parentElement;return A?A.children.length-1:0}function p(S){let A=S.parentElement?.parentElement;return A?A.children.length-1:0}function u(S){S.focus();let A=document.createRange();A.selectNodeContents(S),A.collapse(!1);let R=window.getSelection();R&&(R.removeAllRanges(),R.addRange(A))}function f(S,A,R){return t.querySelector('[data-block-id="'+x(S)+'"]')?.querySelector("tbody")?.children[A]?.children[R]||null}function g(S,A,R,H){let G=S.closest("[data-block-id]")?.dataset.blockId;if(!G)return;let fe=c(S);if(!fe)return;let ee=x0(S);e.applyMutation(he=>{let ue=he.blocks.findIndex(He=>He.id===G);if(ue<0)return{...he,selection:null};let Pe=he.blocks[ue];if(Pe.kind!=="table")return{...he,selection:null};let Z=Pe.rows[fe.row]?.[fe.col],Ae=!!Z&&JSON.stringify(Z)===JSON.stringify(ee),Ke=he;if(!Ae){let He=Pe.rows.map((Pn,Be)=>Be===fe.row?Pn.map((yt,LT)=>LT===fe.col?ee:yt):Pn),Tt=he.blocks.slice();Tt[ue]={...Pe,rows:He},Ke={...he,blocks:Tt}}return{...Ke,selection:null}},"typing");let pe=f(G,A,R);!pe&&H==="row"&&(e.applyMutation(he=>Gs(he,G,A),"structural"),pe=f(G,A,R)),pe&&u(pe)}function y(S){let A=window.getSelection();if(!A||A.rangeCount===0)return!1;let R=A.getRangeAt(0);if(!R.collapsed)return!1;let H=document.createRange();return H.selectNodeContents(S),H.setEnd(R.startContainer,R.startOffset),H.toString().length===0}function b(S){let A=window.getSelection();if(!A||A.rangeCount===0)return!1;let R=A.getRangeAt(0);if(!R.collapsed)return!1;let H=document.createRange();return H.selectNodeContents(S),H.setStart(R.endContainer,R.endOffset),H.toString().length===0}function h(S){if(S.querySelector("br"))return!1;let A=parseFloat(getComputedStyle(S).lineHeight)||20;return S.getBoundingClientRect().height<=A*1.8}function v(S){if(h(S))return!0;let A=window.getSelection();if(!A||A.rangeCount===0)return!1;let R=A.getRangeAt(0).getBoundingClientRect();if(R.top===0&&R.bottom===0)return!0;let H=S.getBoundingClientRect(),z=parseFloat(getComputedStyle(S).lineHeight)||20;return R.top-H.top<z}function w(S){if(h(S))return!0;let A=window.getSelection();if(!A||A.rangeCount===0)return!1;let R=A.getRangeAt(0).getBoundingClientRect();if(R.top===0&&R.bottom===0)return!0;let H=S.getBoundingClientRect(),z=parseFloat(getComputedStyle(S).lineHeight)||20;return H.bottom-R.bottom<z}function x(S){return typeof CSS<"u"&&CSS.escape?CSS.escape(S):S.replace(/[^a-zA-Z0-9_-]/g,A=>"\\"+A)}function T(S){let A=Math.min(S.anchor.row,S.focus.row),R=Math.max(S.anchor.row,S.focus.row),H=Math.min(S.anchor.col,S.focus.col),z=Math.max(S.anchor.col,S.focus.col);e.applyMutation(G=>{let fe=G.blocks.findIndex(ue=>ue.id===S.blockId);if(fe<0)return G;let ee=G.blocks[fe];if(ee.kind!=="table")return G;let pe=ee.rows.map((ue,Pe)=>Pe<A||Pe>R?ue:ue.map((Z,Ae)=>Ae<H||Ae>z?Z:[])),he=G.blocks.slice();return he[fe]={...ee,rows:pe},{...G,blocks:he,selection:null}},"delete"),Promise.resolve().then(()=>{let ee=t.querySelector('[data-block-id="'+x(S.blockId)+'"]')?.querySelector("tbody")?.children[S.anchor.row]?.children[S.anchor.col];if(ee){ee.focus();let pe=document.createRange();pe.selectNodeContents(ee),pe.collapse(!0);let he=window.getSelection();he&&(he.removeAllRanges(),he.addRange(pe))}})}let E=S=>{let A=S.target;if(!A||A.tagName!=="TD"||!document.contains(A))return;let R=A.parentElement,H=R?.parentElement,G=H?.parentElement?.closest("[data-block-id]");if(!G||!G.dataset.blockId||!R)return;let fe=G.dataset.blockId,ee=Array.from(H.children).indexOf(R),pe=Array.from(R.children).indexOf(A);if(ee<0||pe<0)return;let he=x0(A),Pe=e.getBlocks().find(Z=>Z.id===fe);if(Pe&&Pe.kind==="table"){let Z=Pe.rows[ee]?.[pe];if(Z&&JSON.stringify(Z)===JSON.stringify(he))return}e.applyMutation(Z=>_y(Z,fe,ee,pe,he),"typing")},C=6,U=null;function M(S,A){let H=S.getBoundingClientRect().right-A;return H<=C&&H>=-2}let N=S=>{if(S.button!==0)return!1;let A=S.target;if(!A||typeof A.closest!="function")return!1;let R=A.closest("td");if(!R||!t.contains(R)||!M(R,S.clientX))return!1;let H=c(R),z=R.closest("[data-block-id]")?.dataset.blockId;return!H||!z?!1:(S.preventDefault(),S.stopPropagation(),U={blockId:z,colIdx:H.col,startX:S.clientX,startW:R.offsetWidth},document.body.style.cursor="col-resize",!0)},D=S=>{if(!U)return;if(!(S.buttons&1)){O();return}let A=S.clientX-U.startX,R=Math.max(60,U.startW+A),{blockId:H,colIdx:z}=U;e.applyMutation(G=>{let fe=G.blocks.findIndex(Pe=>Pe.id===H);if(fe<0)return G;let ee=G.blocks[fe];if(ee.kind!=="table")return G;let pe=ee.rows[0]?.length||0,he=(ee.colWidths||[]).slice();for(;he.length<pe;)he.push(0);he[z]=R;let ue=G.blocks.slice();return ue[fe]={...ee,colWidths:he},{...G,blocks:ue}},"structural")},O=()=>{U&&(U=null,document.body.style.cursor="")},Y=S=>{let A=S.target;if(!A||typeof A.closest!="function")return;let R=A.closest("td");!R||!t.contains(R)||(R.style.cursor=M(R,S.clientX)?"col-resize":"")},oe=null,Me=!1,se=S=>{if(S.button!==0||N(S))return;let A=S.target;if(!A||typeof A.closest!="function")return;let R=A.closest("td");if(!R||!t.contains(R))return;let H=c(R),z=R.closest("[data-block-id]")?.dataset.blockId;!H||!z||(oe={blockId:z,row:H.row,col:H.col},Me=!1,Ie={blockId:z,row:H.row,col:H.col},Gt())},F=S=>{if(!oe)return;if(!(S.buttons&1)){oe=null,Me=!1;return}let A=S.target;if(!A||typeof A.closest!="function")return;let R=A.closest("td");if(!R||!t.contains(R))return;let H=c(R),z=R.closest("[data-block-id]")?.dataset.blockId;if(!H||!z||z!==oe.blockId||H.row===oe.row&&H.col===oe.col&&!Me)return;if(!Me){Me=!0,Ht(),Ie=null;let pe=window.getSelection();pe&&pe.removeAllRanges()}S.preventDefault();let fe={row:oe.row,col:oe.col},ee={row:H.row,col:H.col};e.applyMutation(pe=>({...pe,selection:{kind:"table-cells",blockId:oe.blockId,anchor:fe,focus:ee}}),"selection")},de=()=>{oe=null},Ie=null,Et=[{label:"\u306A\u3057",value:""},{label:"\u30B0\u30EC\u30FC",value:"#f1f1ef"},{label:"\u8D64",value:"#fdebec"},{label:"\u30AA\u30EC\u30F3\u30B8",value:"#fbecdd"},{label:"\u9EC4",value:"#fbf3db"},{label:"\u7DD1",value:"#ddedea"},{label:"\u9752",value:"#ddebf1"},{label:"\u7D2B",value:"#eae4f2"},{label:"\u30D4\u30F3\u30AF",value:"#f4dfeb"}];function We(S){let A=document.getElementById("memola-tbl-h-"+S);return A||(A=document.createElement("div"),A.id="memola-tbl-h-"+S,A.className="memola-tbl-handle memola-tbl-handle-"+S,A.style.display="none",(document.getElementById("memola-overlay")||document.body).appendChild(A),A.addEventListener("mousedown",R=>{R.preventDefault(),R.stopPropagation(),mc(S,A)}),A)}function Ht(){["row","col","cell"].forEach(S=>{let A=document.getElementById("memola-tbl-h-"+S);A&&(A.style.display="none")}),t.querySelectorAll(".memola-itbl-selcell").forEach(S=>S.classList.remove("memola-itbl-selcell"))}function Gt(){if(!Ie){Ht();return}let S=f(Ie.blockId,Ie.row,Ie.col),A=S?.closest("table");if(!S||!A){Ht();return}let R=S.getBoundingClientRect(),H=A.getBoundingClientRect(),z=window.scrollX,G=window.scrollY,fe=We("row");fe.style.left=H.left+z-16+"px",fe.style.top=R.top+G+"px",fe.style.height=R.height+"px",fe.style.display="flex";let ee=We("col");ee.style.left=R.left+z+"px",ee.style.top=H.top+G-16+"px",ee.style.width=R.width+"px",ee.style.display="flex";let pe=We("cell");pe.style.left=R.right+z-5+"px",pe.style.top=R.top+G+(R.height-18)/2+"px",pe.style.display="flex",t.querySelectorAll(".memola-itbl-selcell").forEach(he=>he.classList.remove("memola-itbl-selcell")),S.classList.add("memola-itbl-selcell")}function Yt(S){e.applyMutation(S,"structural"),gr(),Ht(),Ie=null}function gr(){document.getElementById("memola-tbl-cell-menu")?.remove()}function mc(S,A){if(!Ie)return;let{blockId:R,row:H,col:z}=Ie;gr();let G=document.createElement("div");G.id="memola-tbl-cell-menu",G.className="memola-tbl-cell-menu";let fe=A.getBoundingClientRect();G.style.left=fe.left+window.scrollX+"px",G.style.top=fe.bottom+window.scrollY+4+"px";let ee=(Z,Ae,Ke=!1)=>{let He=document.createElement("div");return He.className="memola-tbl-cell-menu-item"+(Ke?" danger":""),He.textContent=Z,He.addEventListener("mousedown",Tt=>{Tt.preventDefault(),Tt.stopPropagation(),Ae()}),He},pe=()=>{let Z=document.createElement("div");return Z.className="memola-tbl-cell-menu-sep",Z},he=Z=>{let Ae=document.createElement("div");return Ae.className="memola-tbl-cell-menu-collabel",Ae.textContent=Z,Ae},ue=Z=>{let Ae=document.createElement("div");Ae.className="memola-tbl-cell-colors";for(let Ke of Et){let He=document.createElement("button");He.className="memola-tbl-cell-swatch"+(Ke.value?"":" none"),He.title=Ke.label,Ke.value&&(He.style.background=Ke.value),He.addEventListener("mousedown",Tt=>{Tt.preventDefault(),Tt.stopPropagation(),Z(Ke.value)}),Ae.appendChild(He)}return Ae};S==="row"?G.append(ee("\u2191 \u4E0A\u306B\u884C\u3092\u633F\u5165",()=>Yt(Z=>Gs(Z,R,H))),ee("\u2193 \u4E0B\u306B\u884C\u3092\u633F\u5165",()=>Yt(Z=>Gs(Z,R,H+1))),ee("\u884C\u3092\u524A\u9664",()=>Yt(Z=>Zu(Z,R,H)),!0),pe(),he("\u884C\u306E\u8272"),ue(Z=>Yt(Ae=>Ny(Ae,R,H,Z)))):S==="col"?G.append(ee("\u2190 \u5DE6\u306B\u5217\u3092\u633F\u5165",()=>Yt(Z=>bd(Z,R,z))),ee("\u2192 \u53F3\u306B\u5217\u3092\u633F\u5165",()=>Yt(Z=>bd(Z,R,z+1))),ee("\u5217\u3092\u524A\u9664",()=>Yt(Z=>Qu(Z,R,z)),!0),pe(),he("\u5217\u306E\u8272"),ue(Z=>Yt(Ae=>Oy(Ae,R,z,Z)))):G.append(he("\u30BB\u30EB\u306E\u8272"),ue(Z=>Yt(Ae=>Ry(Ae,R,H,z,Z)))),(document.getElementById("memola-overlay")||document.body).appendChild(G);let Pe=Z=>{let Ae=Z.target;G.contains(Ae)||A.contains(Ae)||(gr(),document.removeEventListener("mousedown",Pe,!0))};setTimeout(()=>document.addEventListener("mousedown",Pe,!0),0)}let Vb=S=>{let A=S.target;if(!A||A.closest?.(".memola-tbl-handle, .memola-tbl-cell-menu"))return;let R=A.closest?.("td");R&&t.contains(R)||Ie&&(Ht(),Ie=null)},Wb=S=>{let A=e.getSelection();if(!A||A.kind!=="table-cells")return;let R=e.getBlocks().find(ue=>ue.id===A.blockId);if(!R||R.kind!=="table")return;let H=Math.min(A.anchor.row,A.focus.row),z=Math.max(A.anchor.row,A.focus.row),G=Math.min(A.anchor.col,A.focus.col),fe=Math.max(A.anchor.col,A.focus.col),ee=[];for(let ue=H;ue<=z;ue++){let Pe=[];for(let Z=G;Z<=fe;Z++){let Ae=R.rows[ue]?.[Z]||[],Ke=St(Ae).replace(/\t/g," ").replace(/\n/g," ");Pe.push(Ke)}ee.push(Pe)}let pe=ee.map(ue=>ue.join("	")).join(`
`),he="<table>"+ee.map(ue=>"<tr>"+ue.map(Pe=>"<td>"+P(Pe)+"</td>").join("")+"</tr>").join("")+"</table>";S.preventDefault(),S.clipboardData?.setData("text/plain",pe),S.clipboardData?.setData("text/html",he)};return document.addEventListener("mousemove",s),t.addEventListener("blur",E,!0),t.addEventListener("keydown",l,!0),t.addEventListener("mousedown",se),t.addEventListener("mousemove",F),t.addEventListener("mousemove",Y),document.addEventListener("mousedown",Vb,!0),document.addEventListener("mousemove",D),document.addEventListener("mouseup",de),document.addEventListener("mouseup",O),document.addEventListener("copy",Wb,!0),()=>{document.removeEventListener("mousemove",s),t.removeEventListener("blur",E,!0),t.removeEventListener("keydown",l,!0),t.removeEventListener("mousedown",se),t.removeEventListener("mousemove",F),t.removeEventListener("mousemove",Y),document.removeEventListener("mousedown",Vb,!0),document.removeEventListener("mousemove",D),document.removeEventListener("mouseup",de),document.removeEventListener("mouseup",O),document.removeEventListener("copy",Wb,!0),document.getElementById("memola-tbl-cell-menu")?.remove(),r(),["add-row","add-col","rm-row","rm-col"].forEach(S=>{document.getElementById("memola-tbl-"+S)?.remove()}),["h-row","h-col","h-cell"].forEach(S=>{document.getElementById("memola-tbl-"+S)?.remove()})};function pc(S,A,R){let H=document.getElementById("memola-tbl-"+S);return H||(H=document.createElement("button"),H.id="memola-tbl-"+S,H.className="memola-tbl-btn memola-tbl-"+S,H.style.cssText="position:absolute; z-index:2147483646; background:#fff; border:1px solid #e9e9e7; border-radius:4px; cursor:pointer; padding:2px 6px; font-size:14px; line-height:1; color:#9b9a97; box-shadow:0 1px 3px rgba(0,0,0,0.08); display:none;",H.textContent=A,H.title=R,(document.getElementById("memola-overlay")||document.body).appendChild(H),H)}function as(){["add-row","add-col","rm-row","rm-col"].forEach(S=>{let A=document.getElementById("memola-tbl-"+S);A&&(A.style.display="none")})}function Gb(S,A,R){let z=S.closest("[data-block-id]")?.dataset.blockId;if(!z)return;let G=S.querySelector("table");if(!G)return;let fe=G.querySelector("tbody");if(!fe)return;let ee=Array.from(fe.children),pe=-1;for(let Be=0;Be<ee.length;Be++){let yt=ee[Be].getBoundingClientRect();if(R>=yt.top&&R<=yt.bottom){pe=Be;break}}if(pe<0&&ee.length>0){let Be=ee[0].getBoundingClientRect(),yt=ee[ee.length-1].getBoundingClientRect();R<Be.top?pe=0:R>yt.bottom&&(pe=ee.length-1)}let he=ee[0],ue=he?Array.from(he.children):[],Pe=-1;for(let Be=0;Be<ue.length;Be++){let yt=ue[Be].getBoundingClientRect();if(A>=yt.left&&A<=yt.right){Pe=Be;break}}if(Pe<0&&ue.length>0){let Be=ue[0].getBoundingClientRect(),yt=ue[ue.length-1].getBoundingClientRect();A<Be.left?Pe=0:A>yt.right&&(Pe=ue.length-1)}let Z=G.getBoundingClientRect(),Ae=ue.length,Ke=pc("add-col","+","\u5217\u3092\u8FFD\u52A0\uFF08\u672B\u5C3E\uFF09");Ke.style.top=Z.top+window.scrollY+"px",Ke.style.left=Z.right+window.scrollX+3+"px",Ke.style.height=Z.height+"px",Ke.style.width="16px",Ke.style.padding="0",Ke.style.display="flex",Ke.style.alignItems="center",Ke.style.justifyContent="center",Ke.onclick=()=>{e.applyMutation(Be=>bd(Be,z,Ae),"structural"),as()};let He=pc("add-row","+","\u884C\u3092\u8FFD\u52A0\uFF08\u672B\u5C3E\uFF09");He.style.top=Z.bottom+window.scrollY+3+"px",He.style.left=Z.left+window.scrollX+"px",He.style.width=Z.width+"px",He.style.height="16px",He.style.padding="0",He.style.display="flex",He.style.alignItems="center",He.style.justifyContent="center",He.onclick=()=>{e.applyMutation(Be=>Gs(Be,z,ee.length),"structural"),as()};let Tt=pc("rm-row","\u2715","\u884C\u3092\u524A\u9664");if(pe>=0&&ee.length>1){let Be=ee[pe].getBoundingClientRect();Tt.style.top=Be.top+window.scrollY+(Be.height-18)/2+"px",Tt.style.left=Be.left+window.scrollX-22+"px",Tt.style.display="block",Tt.onclick=()=>{e.applyMutation(yt=>Zu(yt,z,pe),"structural"),as()}}else Tt.style.display="none";let Pn=pc("rm-col","\u2715","\u5217\u3092\u524A\u9664");if(Pe>=0&&ue.length>1){let Be=ue[Pe].getBoundingClientRect();Pn.style.top=Be.top+window.scrollY-22+"px",Pn.style.left=Be.left+window.scrollX+(Be.width-16)/2+"px",Pn.style.display="block",Pn.onclick=()=>{e.applyMutation(yt=>Qu(yt,z,Pe),"structural"),as()}}else Pn.style.display="none"}}function x0(e){let t=Nl(e);return t.length===1&&t[0].kind==="br"?[]:t}function Nl(e){let t=[];for(let o of Array.from(e.childNodes)){if(o.nodeType===3){let a=o.textContent||"";a&&t.push({kind:"text",text:a});continue}if(o.nodeType!==1)continue;let n=o,r=n.tagName.toLowerCase();if(r==="br"){t.push({kind:"br"});continue}if(r==="strong"||r==="b"){t.push({kind:"bold",children:Nl(n)});continue}if(r==="em"||r==="i"){t.push({kind:"italic",children:Nl(n)});continue}if(r==="s"||r==="strike"||r==="del"){t.push({kind:"strike",children:Nl(n)});continue}if(r==="code"){t.push({kind:"code",text:n.textContent||""});continue}if(r==="a"&&n.classList.contains("memola-page-link")){let a=n.getAttribute("data-page-id")||"",i=(n.textContent||"").trim();if(a){t.push({kind:"pagelink",pageId:a,...i&&i!==a?{alias:i}:{}});continue}}t.push(...Nl(n))}return t}var Mm,JC,k0=L(()=>{"use strict";Ro();tn();Re();Mm=36,JC=250});var qo={};j(qo,{closeSlashMenuEditor2:()=>eh,destroyEditor2:()=>T0,editor2ExecCmd:()=>Zg,getBlocks:()=>xn,isEditorComposing:()=>Jg,isSlashActiveEditor2:()=>Qg,loadBlocks:()=>E0,loadBlocksFromJson:()=>tA,mountEditor2:()=>ZC,pruneEmptyTodosEditor2:()=>sA,reconcileEditorBlocks:()=>Xg,syncEditor2IntoSaver:()=>xg});function ZC(e){T0(),Ol++;let t=Ol;return ke=vk(e),Pm=ke.subscribe(o=>{Promise.resolve().then(()=>(bt(),ta)).then(n=>{t===Ol&&n.schedSave()})}),Cm=Mk(ke,e),Am=Ck(ke,e),_m=Rk(ke,e),Rm=h0(ke,e),Bm=cA(ke,e),Dm=iA(e),Nm=v0(ke,e),Om=w0(ke,e),Hm=eA(e),Fm=QC(ke,e),Um=re.subscribe(o=>{if(t!==Ol||o.kind!=="idle"||!ke||d.currentId!==o.base.pageId)return;let n=ge(o.base.body);n.length===0&&(n=[rt("")]);let r=ke.getBlocks();I0(r)&&I0(n)||Do(Ze(r),Ze(n))||ke.reconcile(n)}),ke}function I0(e){if(e.length===0)return!0;if(e.length!==1)return!1;let t=e[0];return t.kind==="p"&&t.inline.length===0}function QC(e,t){let o=n=>{if(n.target!==t)return;let r=t.lastElementChild;if(r){let c=r.getBoundingClientRect();if(n.clientY<c.bottom)return}n.preventDefault();let a=e.getBlocks(),i=a[a.length-1];if(!!i&&i.kind==="p"&&i.inline.length===0){e.applyMutation(c=>({...c,selection:{kind:"caret",blockId:i.id,offset:0}}),"selection");return}let l=rt("");e.applyMutation(c=>({...c,blocks:[...c.blocks,l],selection:{kind:"caret",blockId:l.id,offset:0}}),"structural")};return t.addEventListener("mousedown",o),()=>t.removeEventListener("mousedown",o)}function eA(e){let t=o=>{let n=o.target,r=n?.closest?.("a[data-href]");if(r&&e.contains(r)){o.preventDefault(),o.stopPropagation();let l=r.getAttribute("href")||"";l&&window.open(l,"_blank","noopener,noreferrer");return}let a=n?.closest?.("a.memola-page-link");if(!a||!e.contains(a))return;o.preventDefault(),o.stopPropagation();let i=a.getAttribute("data-daily-date"),s=a.getAttribute("data-page-id");if(i){(async()=>{try{let c=await(await Promise.resolve().then(()=>(_n(),Ka))).getOrCreateNoteForDate(i),{doSelect:m}=await Promise.resolve().then(()=>(K(),ie));await m(c.dbPageId)}catch(l){console.error("[memola] daily link click failed:",l)}})();return}s&&(async()=>{try{let{doSelect:l}=await Promise.resolve().then(()=>(K(),ie));await l(s)}catch(l){console.error("[memola] page link click failed:",l)}})()};return e.addEventListener("click",t),()=>e.removeEventListener("click",t)}function E0(e){if(!ke)return;let t=e.length===0?[{id:Q(),kind:"p",inline:[]}]:e;ke.setBlocks(t,{silent:!0})}function tA(e){E0(ge(e))}function xn(){return ke?ke.getBlocks():[]}function T0(){Ol++,Cm&&(Cm.destroy(),Cm=null),Am&&(Am.destroy(),Am=null),_m&&(_m(),_m=null),Rm&&(Rm(),Rm=null),Bm&&(Bm(),Bm=null),Dm&&(Dm(),Dm=null),Nm&&(Nm(),Nm=null),Om&&(Om(),Om=null),Hm&&(Hm(),Hm=null),Fm&&(Fm(),Fm=null),Um&&(Um(),Um=null),Pm&&(Pm(),Pm=null),ke&&(ke.destroy(),ke=null)}function xg(e){if(!ke)return;let t=Ze(ke.getBlocks());re.notifyEdit(t,e)}function Xg(e){return ke?(ke.reconcile(e),!0):!1}function Jg(){return ke?ke.isComposing():!1}function Zg(e){if(!ke)return!1;let t=ke,o=()=>{let r=window.getSelection()?.anchorNode;return r?(r.nodeType===1?r:r.parentElement)?.closest("[data-block-id]")?.dataset.blockId??null:null};switch(e){case"bold":return t.toggleInlineFormat("bold"),!0;case"italic":return t.toggleInlineFormat("italic"),!0;case"strike":return t.toggleInlineFormat("strike"),!0;case"codeInline":case"code":return t.toggleInlineFormat("code"),!0;case"comment":{let n=o()||"";return Promise.resolve().then(()=>(jo(),yn)).then(r=>{let a=r.currentCommentTarget();a&&r.openCommentPopover(a.pageId,n)}),!0}case"link":{let n=oA(),r=window.prompt("\u30EA\u30F3\u30AF\u5148 URL \u3092\u5165\u529B\uFF08UNC \u30D1\u30B9 \\\\server\\share\\... \u3082\u53EF\u3002\u7A7A\u6B04\u3067\u89E3\u9664\uFF09",n);return r===null||t.setLink(nA(r.trim())),!0}case"p":case"h1":case"h2":case"h3":case"todo":{let n=o();if(n){let r=t.getBlocks().find(i=>i.id===n),a=r&&r.kind===e&&e!=="p"?"p":e;t.setBlockKind(n,a)}return!0}case"ul":case"ol":case"quote":case"callout":case"pre":case"hr":{let n=o();return n&&t.applyMutation(r=>{let a=r.blocks.findIndex(c=>c.id===n);if(a<0)return r;let i=r.blocks.slice(),s=rA(e);i[a]=s;let l=aA(s);return{...r,blocks:i,selection:l?{kind:"caret",blockId:l,offset:0}:r.selection}},"structural"),!0}}return!1}function oA(){let t=window.getSelection()?.anchorNode;return(t?t.nodeType===1?t:t.parentElement:null)?.closest("a[data-href]")?.dataset.href??""}function nA(e){return!e||/^javascript:/i.test(e)?"":/^\\\\/.test(e)||/^[a-zA-Z][\w+.-]*:/.test(e)?e:/^[\w-]+(\.[\w-]+)+(\/|$|[?#:])/.test(e)?"https://"+e:e}function rA(e){switch(e){case"ul":return Ks();case"ol":return Vs();case"quote":return Ws();case"callout":return $s();case"pre":return js();case"hr":return qs()}}function aA(e){return e.kind==="list"?e.items[0]?.[0]?.id??null:e.kind==="callout"||e.kind==="quote"?e.children[0]?.id??null:"inline"in e||e.kind==="code"?e.id:null}function iA(e){let t=document.getElementById("memola-ftb")||document.getElementById("ftb");if(!t)return()=>{};let o=()=>{let n=window.getSelection();if(!n||n.rangeCount===0||n.isCollapsed){t.classList.remove("on");return}let r=n.getRangeAt(0);if(!e.contains(r.startContainer)){t.classList.remove("on");return}let a=r.getBoundingClientRect();if(a.width===0&&a.height===0){t.classList.remove("on");return}t.style.top=a.top+window.scrollY-48+"px",t.style.left=a.left+window.scrollX+"px",t.classList.add("on")};return document.addEventListener("selectionchange",o),()=>{document.removeEventListener("selectionchange",o),t.classList.remove("on")}}function sA(){if(!ke)return 0;let e=ke.getBlocks(),t=e.filter(n=>n.kind!=="todo"?!0:n.inline.map(a=>a.kind==="text"?a.text:"").join("").trim()!==""),o=e.length-t.length;return o>0&&ke.applyMutation(n=>({...n,blocks:t}),"structural"),o}function Qg(){return!!document.querySelector(".memola-slash2")}function eh(){document.querySelectorAll(".memola-slash2").forEach(e=>e.remove())}function lA(e){let t=()=>{let l=()=>Math.random().toString(36).slice(2,8);return"blk_"+l()+l()},o=l=>{let c=Math.max(...l.map(p=>p.length),1),m=l.map(p=>{let u=[];for(let f=0;f<c;f++){let g=p[f]||"";u.push(g?[{kind:"text",text:g}]:[])}return u});return{id:t(),kind:"table",hrow:!0,hcol:!1,rows:m}},n=e.getData("text/html");if(n&&/<table[\s\S]*?<\/table>/i.test(n)){let l=document.createElement("div");l.innerHTML=n;let c=l.querySelector("table");if(c){let p=Array.from(c.querySelectorAll("tr")).map(u=>Array.from(u.children).map(f=>(f.textContent||"").replace(/\s+/g," ").trim()));if(p.length>0&&p.some(u=>u.length>0))return o(p)}}let r=e.getData("text/plain");if(!r)return null;let a=r.replace(/\r\n/g,`
`).replace(/\n+$/,"").split(`
`);if(a.length===0)return null;let i=a.map(l=>l.split("	"));return i.length>=2||i.some(l=>l.length>=2)?o(i):null}function cA(e,t){let o=n=>{let r=n.clipboardData;if(!r)return;let a=n.target;if(!!!(a&&typeof a.closest=="function"&&a.closest(".memola-itbl-wrap"))){let m=lA(r);if(m){n.preventDefault(),e.applyMutation(p=>{let u=p.selection,f=u?.kind==="caret"?u.blockId:u?.kind==="range"?u.focusBlockId:p.blocks[p.blocks.length-1]?.id,g=f?p.blocks.findIndex(v=>v.id===f):-1,y=p.blocks.slice(),b=g>=0?p.blocks[g]:null;if(b&&b.kind==="p"&&b.inline.length===0&&g>=0)y[g]=m;else{let v=g>=0?g+1:y.length;y.splice(v,0,m)}return{...p,blocks:y,selection:null}},"structural");return}}let s=r.getData("text/html"),l=r.getData("text/plain"),c=[];s?c=bv(s):l&&(c=Xe(l)),c.length!==0&&(n.preventDefault(),e.applyMutation(m=>{let p=m.selection,u=p?.kind==="caret"?p.blockId:p?.kind==="range"?p.focusBlockId:m.blocks[m.blocks.length-1]?.id,f=m.blocks.slice(),g=u?f.findIndex(b=>b.id===u)+1:f.length;g<=0&&(g=f.length),f.splice(g,0,...c);let y=c[c.length-1];return{...m,blocks:f,selection:{kind:"caret",blockId:y.id,offset:0}}},"structural"))};return t.addEventListener("paste",o),()=>t.removeEventListener("paste",o)}var ke,Pm,Cm,Am,Bm,Dm,_m,Rm,Nm,Om,Hm,Fm,Um,Ol,vt=L(()=>{"use strict";tn();q();yk();V();Mt();rn();ht();Qa();Pk();Ak();_g();b0();y0();k0();Ro();ke=null,Pm=null,Cm=null,Am=null,Bm=null,Dm=null,_m=null,Rm=null,Nm=null,Om=null,Hm=null,Fm=null,Um=null,Ol=0});var nh={};j(nh,{countAll:()=>uA,deleteAllForPage:()=>fA,deleteDraft:()=>jm,listAll:()=>Fl,listForPage:()=>M0,purgeOrphaned:()=>gA,saveDraft:()=>oh});function mA(e){try{let t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function pA(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Oi(){let e=[];try{for(let t=0;t<localStorage.length;t++){let o=localStorage.key(t);o&&o.startsWith(th)&&e.push(o)}}catch{}return e}function Hl(e){let t=e.slice(th.length),o=t.lastIndexOf(".");if(o<0)return null;let n=t.slice(0,o),r=Number(t.slice(o+1));return!n||!Number.isFinite(r)?null:{pageId:n,ts:r}}function S0(e){let t=mA(e);return t?{key:e,...t}:null}function zm(){let e=Date.now()-dA;for(let t of Oi()){let o=Hl(t);if(o&&o.ts<e)try{localStorage.removeItem(t)}catch{}}}function oh(e){zm();let t=Date.now(),o=th+e.pageId+"."+t,n={pageId:e.pageId,pageTitle:e.pageTitle,title:e.title,body:e.body,savedAt:t,reason:e.reason||"conflict-discarded",baseBody:e.baseBody,baseEtag:e.baseEtag};pA(o,n);let r=M0(e.pageId);if(r.length>L0){r.sort((a,i)=>i.savedAt-a.savedAt);for(let a of r.slice(L0))try{localStorage.removeItem(a.key)}catch{}}return o}function M0(e){zm();let t=[];for(let o of Oi()){let n=Hl(o);if(!n||n.pageId!==e)continue;let r=S0(o);r&&t.push(r)}return t.sort((o,n)=>n.savedAt-o.savedAt),t}function Fl(){zm();let e=[];for(let t of Oi()){let o=S0(t);o&&e.push(o)}return e.sort((t,o)=>o.savedAt-t.savedAt),e}function uA(){zm();let e=0;for(let t of Oi())Hl(t)&&e++;return e}function jm(e){try{localStorage.removeItem(e)}catch{}}function fA(e){for(let t of Oi())if(Hl(t)?.pageId===e)try{localStorage.removeItem(t)}catch{}}function gA(e){for(let t of Oi()){let o=Hl(t);if(o&&!e.has(o.pageId))try{localStorage.removeItem(t)}catch{}}}var th,L0,dA,Ul=L(()=>{"use strict";be();th=$p,L0=5,dA=7*24*60*60*1e3});function la(e){return document.getElementById(e.id)?e.cancelValue!==void 0?Promise.resolve(e.cancelValue):Promise.reject(new Error("modal-already-open")):new Promise(t=>{let o=document.getElementById("memola-overlay")||document.body,n=document.createElement("div");n.id=e.id,n.className=e.className+" on",n.innerHTML=e.contentHtml,o.appendChild(n);let r=!1,a=l=>{r||(r=!0,n.remove(),document.removeEventListener("keydown",i,!0),t(l))};function i(l){l.key==="Escape"&&e.cancelValue!==void 0&&(l.preventDefault(),l.stopPropagation(),l.stopImmediatePropagation(),a(e.cancelValue))}document.addEventListener("keydown",i,!0),n.addEventListener("click",l=>{let c=l.target;if(c===n&&e.cancelValue!==void 0){a(e.cancelValue);return}let m=c.closest("button[data-c]");if(!m)return;let p=m.dataset.c||"";p in e.buttons&&a(e.buttons[p])}),e.onMounted&&e.onMounted(n);let s=e.focusSel||"button[data-c]";n.querySelector(s)?.focus()})}function kn(e){let t=null;function o(a){a.key==="Escape"&&document.getElementById(e.id)&&(a.preventDefault(),a.stopPropagation(),e.onEscape&&e.onEscape())}function n(){let a=document.getElementById(e.id);a&&a.remove(),document.removeEventListener("keydown",o,!0),t=null}function r(a,i){let s=document.getElementById(e.id);s&&s.remove(),document.removeEventListener("keydown",o,!0);let l=document.getElementById("memola-overlay")||document.body,c=document.createElement("div");c.id=e.id,c.className=e.className+" on",c.innerHTML=a,l.appendChild(c),t=c,e.onBackdropClick&&c.addEventListener("click",m=>{m.target===c&&e.onBackdropClick()}),document.addEventListener("keydown",o,!0),i&&i(c)}return{render:r,close:n,isOpen:()=>t!==null&&document.getElementById(e.id)!==null}}var nr=L(()=>{"use strict"});var rr={};j(rr,{applyDraftToOriginInteractive:()=>D0,attachDraftsSidebar:()=>rh,closeDraftsModal:()=>In,openDraftsModal:()=>B0,refreshDraftsBadge:()=>Io});function bA(){let e=Fl(),t=new Map;for(let n of e){let r=B(n.pageId),a=t.get(n.pageId);a||(a={pageId:n.pageId,pageTitle:r?.title||n.pageTitle||"(\u30BF\u30A4\u30C8\u30EB\u4E0D\u660E)",exists:!!r&&!r.trashed,drafts:[]},t.set(n.pageId,a)),a.drafts.push(n)}let o=Array.from(t.values());return o.sort((n,r)=>{if(n.exists!==r.exists)return n.exists?-1:1;let a=Math.max(...n.drafts.map(s=>s.savedAt));return Math.max(...r.drafts.map(s=>s.savedAt))-a}),o}function A0(){return d.pages.filter(e=>e.IsDraft)}function vA(){return A0().length+Fl().length}function B0(e){C0.render('<div class="memola-drafts-box"><div class="memola-drafts-hd"><span class="memola-drafts-title">\u{1F4DD} \u4E0B\u66F8\u304D</span><span class="memola-drafts-count"></span><button class="memola-drafts-close" title="\u9589\u3058\u308B">\xD7</button></div><div class="memola-drafts-body"></div></div>',t=>{t.querySelector(".memola-drafts-close")?.addEventListener("click",In),qm(t),e&&setTimeout(()=>{t.querySelector('.memola-drafts-group[data-page-id="'+e+'"]')?.scrollIntoView({block:"start"})},0)})}function In(){C0.close()}function qm(e){let t=A0(),o=bA(),n=t.length+o.reduce((l,c)=>l+c.drafts.length,0),r=e.querySelector(".memola-drafts-count");r&&(r.textContent="("+n+"\u4EF6)");let a=e.querySelector(".memola-drafts-body");if(!a)return;if(n===0){a.innerHTML='<div class="memola-drafts-empty">\u4E0B\u66F8\u304D\u306F\u3042\u308A\u307E\u305B\u3093\u3002<br><span style="font-size:11px;color:var(--ink-3)">\u30DA\u30FC\u30B8\u30E1\u30CB\u30E5\u30FC\u306E\u300C\u270F\uFE0F \u4E0B\u66F8\u304D\u3068\u3057\u3066\u8907\u88FD\u300D\u3001\u307E\u305F\u306F\u4FDD\u5B58\u885D\u7A81\u6642\u306E\u300C\u76F8\u624B\u306E\u7248\u3092\u8868\u793A\u300D\u3067\u4E0B\u66F8\u304D\u304C\u4F5C\u6210\u3055\u308C\u307E\u3059\u3002</span></div>';return}let i="";t.length>0&&(i='<div class="memola-drafts-section"><div class="memola-drafts-section-hd"><span>\u{1F4DD} \u30DA\u30FC\u30B8\u4E0B\u66F8\u304D</span><span class="memola-drafts-section-sub">(\u7DE8\u96C6\u4E2D\u306E\u8907\u88FD\u30DA\u30FC\u30B8)</span></div>',i+=t.map(l=>{let m=B(l.Id)?.originPageId||"",p=m?B(m):null,u=p?.title||"(\u539F\u672C\u30DA\u30FC\u30B8\u4E0D\u660E)",f=!!p&&!p.trashed;return'<div class="memola-drafts-item memola-drafts-spitem" data-page-id="'+P(l.Id)+'"><div class="memola-drafts-itemhd"><span class="memola-drafts-itemtitle">'+P(l.Title||"\u7121\u984C")+'</span></div><div class="memola-drafts-itemprev">\u539F\u672C: '+(f?P(u):'<span class="memola-drafts-orphan">'+P(u)+" (\u524A\u9664\u6E08\u307F)</span>")+'</div><div class="memola-drafts-itemactions"><button class="memola-btn p" data-act="open">\u958B\u304F</button>'+(f?'<button class="memola-btn s" data-act="apply">\u539F\u672C\u306B\u9069\u7528</button>':'<button class="memola-btn s" data-act="promote">\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58</button>')+'<button class="memola-btn ghost" data-act="discard">\u7834\u68C4</button></div></div>'}).join(""),i+="</div>");let s="";o.length>0&&(s='<div class="memola-drafts-section"><div class="memola-drafts-section-hd"><span>\u{1F4BE} \u9000\u907F\u3055\u308C\u305F\u7DE8\u96C6</span><span class="memola-drafts-section-sub">(\u4FDD\u5B58\u885D\u7A81\u6642\u306B\u9000\u907F)</span></div>',s+=o.map(l=>{let c='<div class="memola-drafts-grouphead">'+(l.exists?"\u{1F4C4} ":"\u{1F5D1} ")+'<span class="memola-drafts-grouptitle">'+P(l.pageTitle)+(l.exists?"":' <span class="memola-drafts-orphan">(\u524A\u9664\u3055\u308C\u305F\u30DA\u30FC\u30B8)</span>')+'</span><span class="memola-drafts-groupcount">'+l.drafts.length+"\u4EF6</span></div>",m=l.drafts.map(p=>{let u=(p.body||"").replace(/\s+/g," ").slice(0,80);return'<div class="memola-drafts-item" data-key="'+P(p.key)+'"><div class="memola-drafts-itemhd"><span class="memola-drafts-itemtime">'+An(p.savedAt)+'</span><span class="memola-drafts-itemtitle">'+P(p.title||"\u7121\u984C")+'</span></div><div class="memola-drafts-itemprev">'+P(u||"(\u672C\u6587\u306A\u3057)")+'</div><div class="memola-drafts-itemactions">'+(l.exists?'<button class="memola-btn p" data-act="merge">\u7D71\u5408 (3-way)</button>':"")+(l.exists?'<button class="memola-btn s" data-act="restore">\u305D\u306E\u307E\u307E\u5FA9\u5143</button>':"")+'<button class="memola-btn s" data-act="preview">\u30D7\u30EC\u30D3\u30E5\u30FC</button><button class="memola-btn ghost" data-act="delete">\u524A\u9664</button></div></div>'}).join("");return'<div class="memola-drafts-group" data-page-id="'+l.pageId+'">'+c+m+"</div>"}).join(""),s+="</div>"),a.innerHTML=i+s,a.querySelectorAll(".memola-drafts-spitem").forEach(l=>{let c=l.dataset.pageId||"";l.addEventListener("click",async m=>{let p=m.target.closest("button[data-act]");if(!p)return;let u=p.dataset.act;if(u==="open"){In();let{doSelect:f}=await Promise.resolve().then(()=>(K(),ie));await f(c)}else if(u==="apply"){if(!confirm("\u4E0B\u66F8\u304D\u3092\u539F\u672C\u306B\u9069\u7528\u3057\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B?"))return;try{In(),await D0(c)}catch(f){k("\u9069\u7528\u5931\u6557: "+f.message,"err")}}else if(u==="promote"){if(!confirm("\u539F\u672C\u304C\u524A\u9664\u3055\u308C\u3066\u3044\u308B\u305F\u3081\u3001\u3053\u306E\u4E0B\u66F8\u304D\u3092\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B?"))return;try{let{apiPromoteDraftToPage:f,apiGetPages:g}=await Promise.resolve().then(()=>(V(),$e)),y=await f(c);await g();let{renderTree:b}=await Promise.resolve().then(()=>(_e(),ko));b(),qm(e),Io(),In();let{doSelect:h}=await Promise.resolve().then(()=>(K(),ie));await h(y),k("\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3057\u305F")}catch(f){k("\u4FDD\u5B58\u5931\u6557: "+f.message,"err")}}else if(u==="discard"){if(!confirm("\u3053\u306E\u4E0B\u66F8\u304D\u3092\u5B8C\u5168\u306B\u524A\u9664\u3057\u307E\u3059\u3002\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?"))return;try{let{apiDeletePage:f,apiGetPages:g}=await Promise.resolve().then(()=>(V(),$e));await f(c),await g();let{renderTree:y}=await Promise.resolve().then(()=>(_e(),ko));y(),qm(e),Io(),k("\u4E0B\u66F8\u304D\u3092\u7834\u68C4\u3057\u307E\u3057\u305F")}catch(f){k("\u7834\u68C4\u5931\u6557: "+f.message,"err")}}})}),a.querySelectorAll(".memola-drafts-item:not(.memola-drafts-spitem)").forEach(l=>{let c=l.dataset.key||"";l.addEventListener("click",async m=>{let p=m.target.closest("button[data-act]");if(!p)return;let u=p.dataset.act,f=Fl().find(g=>g.key===c);if(f){if(u==="preview")yA(f);else if(u==="delete"){if(!confirm("\u3053\u306E\u4E0B\u66F8\u304D\u3092\u524A\u9664\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?"))return;jm(c),qm(e),Io(),k("\u4E0B\u66F8\u304D\u3092\u524A\u9664\u3057\u307E\u3057\u305F")}else if(u==="restore")await xA(f);else if(u==="merge"){In();let{saver:g}=await Promise.resolve().then(()=>(ht(),ti));await g.beginExternalMerge({pageId:f.pageId,pageTitle:f.pageTitle,title:f.title,ourBody:f.body,baseBody:f.baseBody||"",baseEtag:f.baseEtag||""})}}})})}function yA(e){let t=document.createElement("div");t.className="memola-drafts-md on",t.style.zIndex="2147483649",t.innerHTML='<div class="memola-drafts-box" style="max-width:720px"><div class="memola-drafts-hd"><span class="memola-drafts-title">\u30D7\u30EC\u30D3\u30E5\u30FC: '+P(e.title||"\u7121\u984C")+'</span><button class="memola-drafts-close">\xD7</button></div><div class="memola-drafts-preview">'+Po(e.body)+"</div></div>",(document.getElementById("memola-overlay")||document.body).appendChild(t);let o=()=>{t.remove()};t.addEventListener("click",n=>{n.target===t&&o()}),t.querySelector(".memola-drafts-close")?.addEventListener("click",o)}async function xA(e){if(!confirm("\u300C"+(e.title||"\u7121\u984C")+`\u300D \u3092\u7DE8\u96C6\u9818\u57DF\u306B\u5FA9\u5143\u3057\u307E\u3059\u3002

\u73FE\u5728\u306E\u7DE8\u96C6\u4E2D\u306E\u672C\u6587\u304C\u3042\u308B\u5834\u5408\u306F\u3001\u5FF5\u306E\u305F\u3081\u5225\u306E\u4E0B\u66F8\u304D\u3068\u3057\u3066\u81EA\u52D5\u4FDD\u5B58\u3057\u307E\u3059\u3002
\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F`))return;let{saver:t}=await Promise.resolve().then(()=>(ht(),ti));if(t.isDirty()&&d.currentId){let{saveDraft:i}=await Promise.resolve().then(()=>(Ul(),nh)),{getBlocks:s}=await Promise.resolve().then(()=>(vt(),qo)),l=Je(s()),c=I("ttl");i({pageId:d.currentId,pageTitle:d.pages.find(m=>m.Id===d.currentId)?.Title||"\u7121\u984C",title:c.value||"\u7121\u984C",body:l,reason:"conflict-discarded"})}let{doSelect:o}=await Promise.resolve().then(()=>(K(),ie));await o(e.pageId);let{loadBlocks:n}=await Promise.resolve().then(()=>(vt(),qo));n(Xe(e.body));let r=I("ttl");e.title&&(r.value=e.title);let{schedSave:a}=await Promise.resolve().then(()=>(bt(),ta));a(),jm(e.key),Io(),In(),k("\u4E0B\u66F8\u304D\u3092\u5FA9\u5143\u3057\u307E\u3057\u305F\uFF08\u4FDD\u5B58\u306F\u307E\u3060\u3055\u308C\u3066\u3044\u307E\u305B\u3093\uFF09")}async function D0(e){let{apiApplyDraftToOrigin:t,apiGetPages:o}=await Promise.resolve().then(()=>(V(),$e)),{doSelect:n}=await Promise.resolve().then(()=>(K(),ie)),r=await t(e);if(r.status==="conflict"){if(!confirm("\u539F\u672C\u304C\u4E0B\u66F8\u304D\u4F5C\u6210\u5F8C\u306B\u5909\u66F4\u3055\u308C\u3066\u304A\u308A\u3001\u81EA\u52D5\u30DE\u30FC\u30B8\u3067\u304D\u306A\u3044\u7AF6\u5408\u304C "+r.conflicts+` \u4EF6\u3042\u308A\u307E\u3059\u3002

\u300COK\u300D: \u4E0B\u66F8\u304D\u306E\u5185\u5BB9\u3067\u539F\u672C\u3092\u4E0A\u66F8\u304D\u3057\u307E\u3059\uFF08\u539F\u672C\u306E\u73FE\u5728\u306E\u672C\u6587\u306F SP \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74\u306B\u6B8B\u308A\u307E\u3059\uFF09\u3002
\u300C\u30AD\u30E3\u30F3\u30BB\u30EB\u300D: \u4E2D\u6B62\u3057\u307E\u3059\uFF08\u539F\u672C\u3092\u958B\u3044\u3066\u5185\u5BB9\u3092\u78BA\u8A8D\u3067\u304D\u307E\u3059\uFF09\u3002`))return await n(r.originId),!1;r=await t(e,{force:!0})}await o();let{renderTree:a}=await Promise.resolve().then(()=>(_e(),ko));return a(),Io(),await n(r.originId),r.status==="merged"?k("\u539F\u672C\u304C\u5909\u66F4\u3055\u308C\u3066\u3044\u305F\u305F\u3081\u81EA\u52D5\u30DE\u30FC\u30B8\u3057\u3066\u9069\u7528\u3057\u307E\u3057\u305F\uFF08"+r.autoMerged+"\u4EF6\u30DE\u30FC\u30B8\uFF09"):r.status==="forced"?k("\u539F\u672C\u306B\u4E0A\u66F8\u304D\u9069\u7528\u3057\u307E\u3057\u305F"):k("\u539F\u672C\u306B\u9069\u7528\u3057\u307E\u3057\u305F"),!0}function Io(){let e=document.getElementById(P0);if(!e)return;let t=vA();if(t===0){e.style.display="none";return}e.style.display="";let o=e.querySelector(".memola-drafts-badge-count");o&&(o.textContent=String(t))}function rh(){let e=document.getElementById(P0);e&&(e.addEventListener("click",()=>B0()),Io())}var hA,P0,C0,Go=L(()=>{"use strict";q();me();le();Mt();rn();Ul();Re();Lo();nr();we();hA="memola-drafts-md",P0="memola-drafts-btn",C0=kn({id:hA,className:"memola-drafts-md",onEscape:()=>In(),onBackdropClick:()=>In()})});var ah={};j(ah,{clearMergeHighlight:()=>Vm,highlightIncomingBlocks:()=>IA});function wA(e){return e.replace(/"/g,'\\"')}function kA(e){let t={...e};return delete t.children,delete t.items,delete t.rows,JSON.stringify(t,Hn)}function Km(e,t){for(let o of e){t.set(o.id,kA(o));let n=o;if(Array.isArray(n.children)&&Km(n.children,t),Array.isArray(n.items))for(let r of n.items)Km(r,t)}}function IA(e,t){Vm();let o=new Map,n=new Map;Km(ge(e),o),Km(ge(t),n);let r=[];for(let[i,s]of n)o.get(i)!==s&&r.push(i);if(r.length===0)return;let a=Ce();for(let i of r)a.querySelector('[data-block-id="'+wA(i)+'"]')?.classList.add("memola-block-incoming");$m||($m=!0,a.addEventListener("input",Vm,{once:!0}))}function Vm(){let e=Ce();e.querySelectorAll(".memola-block-incoming").forEach(t=>t.classList.remove("memola-block-incoming")),$m&&(e.removeEventListener("input",Vm),$m=!1)}var $m,ih=L(()=>{"use strict";me();V();Qa();$m=!1});var Gm={};j(Gm,{attachCrossTabSync:()=>dh,attachStaleBannerSuppressionReset:()=>ch,detachCrossTabSync:()=>LA,startWatching:()=>lh,stopWatching:()=>Jn});function EA(){let e=Cn.get(),t=e?parseInt(e,10):_0;return!isFinite(t)||t<0?_0:t}function lh(e,t,o){d.sync.pageId=e,d.sync.loadedModified=t,d.sync.loadedEtag=o,zl(),d.sync.pollTimer&&clearInterval(d.sync.pollTimer);let n=EA();n>0&&(d.sync.pollTimer=setInterval(TA,n))}function Jn(){d.sync.pollTimer&&clearInterval(d.sync.pollTimer),d.sync.pollTimer=null,d.sync.pageId=null,d.sync.loadedModified=null,d.sync.loadedEtag=null,zl()}async function TA(){if(document.hidden||d.sync.suppressBannerUntilFocus)return;let e=d.sync.pageId;if(!e||d.currentId!==e||d.saving)return;let t=d.pages.find(o=>o.Id===e);if(!(!t||t.Type==="database"))try{let o=await mt(e);if(d.currentId!==e)return;if(!o){await R0(e,"purged");return}if(o.trashed>0){await R0(e,"trashed");return}if(d.currentId!==e)return;let n=!!o.etag&&o.etag===d.sync.loadedEtag,r=!!o.modified&&o.modified===d.sync.loadedModified;if(n||r||await H0(e,o.etag,o.modified))return;let i=await Fa(e).catch(()=>""),s=await Dn().catch(()=>"");if(d.currentId!==e)return;let l=!!i&&!!s&&i===s;F0(i,o.modified,e,l)}catch{}}async function R0(e,t){if(sh)return;let o=re.state();if(!(o.kind!=="idle"&&o.kind!=="dirty")&&o.base.pageId===e){sh=!0;try{let n=re.isDirty(),r=(o.kind==="dirty"?o.title:o.base.title)||"\u7121\u984C",a=Ze(xn());if(t==="trashed"){if(window.confirm(`\u3053\u306E\u30DA\u30FC\u30B8\u306F\u4ED6\u306E\u30E6\u30FC\u30B6\u30FC\u306B\u3088\u3063\u3066\u524A\u9664\uFF08\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5\uFF09\u3055\u308C\u307E\u3057\u305F\u3002

\u300COK\u300D: \u5143\u306B\u623B\u3057\u3066\u7DE8\u96C6\u3092\u7D9A\u3051\u307E\u3059\u3002
\u300C\u30AD\u30E3\u30F3\u30BB\u30EB\u300D: `+(n?"\u7DE8\u96C6\u5185\u5BB9\u3092\u4E0B\u66F8\u304D\u306B\u9000\u907F\u3057\u3066":"")+"\u3053\u306E\u30DA\u30FC\u30B8\u3092\u9589\u3058\u307E\u3059\u3002")){await Fs(e);let l=await mt(e).catch(()=>null);l&&(d.sync.loadedEtag=l.etag,d.sync.loadedModified=l.modified),k("\u30DA\u30FC\u30B8\u3092\u5FA9\u5143\u3057\u307E\u3057\u305F\u3002\u7DE8\u96C6\u3092\u7D9A\u3051\u3089\u308C\u307E\u3059");return}n&&(N0(e,r,a,o.base.body,o.base.etag),k("\u7DE8\u96C6\u5185\u5BB9\u3092\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F\uFF08\u{1F4DD} \u4E0B\u66F8\u304D \u304B\u3089\u958B\u3051\u307E\u3059\uFF09")),O0(e);return}window.confirm(`\u3053\u306E\u30DA\u30FC\u30B8\u306F\u5B8C\u5168\u306B\u524A\u9664\u3055\u308C\u307E\u3057\u305F\u3002\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002

\u7DE8\u96C6\u5185\u5BB9\u3092\u4E0B\u66F8\u304D\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3059\u304B?
\uFF08\u{1F4DD} \u4E0B\u66F8\u304D \u304B\u3089\u5F8C\u3067\u958B\u3051\u307E\u3059\uFF09`)&&(N0(e,r,a,o.base.body,o.base.etag),k("\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F\uFF08\u{1F4DD} \u4E0B\u66F8\u304D \u304B\u3089\u958B\u3051\u307E\u3059\uFF09")),O0(e)}finally{sh=!1}}}function N0(e,t,o,n,r){try{oh({pageId:e,pageTitle:t,title:t,body:o,baseBody:n,baseEtag:r,reason:"page-deleted"}),Promise.resolve().then(()=>(Go(),rr)).then(a=>a.refreshDraftsBadge()).catch(()=>{})}catch{}}function O0(e){Jn(),re.unload(),Co([e]),d.currentId=null,d.currentRow=null,te(),tt("empty")}async function H0(e,t,o){let n=re.state();if(n.kind!=="idle"&&n.kind!=="dirty"||n.base.pageId!==e)return!1;if(Jg())return!0;let r=await Bt(e).catch(()=>null);if(r===null)return!1;if(d.currentId!==e)return!0;let a=n.base.body,i=Ze(xn()),s=n.kind==="dirty"?n.title:n.base.title,l=xy(a,i,r);return l.kind==="conflict"||l.kind==="noop"?!1:(l.changed&&(Xg(l.merged),Promise.resolve().then(()=>(ih(),ah)).then(c=>c.highlightIncomingBlocks(i,l.mergedBody)).catch(()=>{})),re.rebaseOnto({pageId:e,body:r,title:s,etag:t,modified:o},l.mergedBody,s),Jo(e).set(t),!0)}function F0(e,t,o,n=!1){let r=document.getElementById("memola-sync-banner");r||(r=document.createElement("div"),r.id="memola-sync-banner",document.getElementById("memola-overlay")?.appendChild(r));let a=new Date(t).toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"}),i=n?"\u5225\u306E\u30BF\u30D6 (\u3042\u306A\u305F)":"<strong>"+P(e||"\u8AB0\u304B")+"</strong>\u3055\u3093";r.innerHTML="<span>\u{1F514} "+i+"\u304C "+a+' \u306B\u66F4\u65B0\u3057\u307E\u3057\u305F</span><button id="memola-sync-reload">\u4ECA\u3059\u3050\u53CD\u6620</button><button id="memola-sync-dismiss">\u5F8C\u3067</button><button id="memola-sync-mute" title="\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u30BF\u30D6\u3092\u96E2\u308C\u308B\u307E\u3067\u518D\u8868\u793A\u3057\u307E\u305B\u3093">\u30BF\u30D6\u3092\u96E2\u308C\u308B\u307E\u3067\u975E\u8868\u793A</button>',r.classList.add("on"),document.getElementById("memola-sync-reload")?.addEventListener("click",async()=>{let{saver:s}=await Promise.resolve().then(()=>(ht(),ti));s.isDirty()&&!confirm("\u672A\u4FDD\u5B58\u306E\u5909\u66F4\u304C\u3042\u308A\u307E\u3059\u3002\u30EA\u30ED\u30FC\u30C9\u3057\u3066\u4E0A\u66F8\u304D\u3057\u307E\u3059\u304B\uFF1F")||(zl(),await Ue(o))}),document.getElementById("memola-sync-dismiss")?.addEventListener("click",()=>{zl()}),document.getElementById("memola-sync-mute")?.addEventListener("click",()=>{d.sync.suppressBannerUntilFocus=!0,zl()})}function zl(){let e=document.getElementById("memola-sync-banner");e&&e.remove()}function ch(){let e=document.body;e.dataset.memolaStaleResetWired!=="1"&&(e.dataset.memolaStaleResetWired="1",document.addEventListener("visibilitychange",()=>{document.hidden||(d.sync.suppressBannerUntilFocus=!1)}))}function LA(){Wm&&(Wm(),Wm=null),cy();let e=document.body;delete e.dataset.memolaCrossTabWired}function dh(){let e=document.body;e.dataset.memolaCrossTabWired!=="1"&&(e.dataset.memolaCrossTabWired="1",Wm=dy(t=>{d.currentId===t.pageId&&(t.etag&&t.etag===d.sync.loadedEtag||d.sync.suppressBannerUntilFocus||d.saving||(async()=>await H0(t.pageId,t.etag,t.modified)||d.currentId===t.pageId&&F0("",t.modified,t.pageId,!0))())}))}var _0,sh,Wm,Xr=L(()=>{"use strict";q();V();Zt();K();Re();be();Ou();ht();wy();vt();le();we();_e();Ul();_0=3e4;sh=!1;Wm=null});var uh={};j(uh,{applyOutlineState:()=>ca,attachOutlineWatcher:()=>ph,isOutlineOpen:()=>Ym,renderOutline:()=>mh,setOutlineOpen:()=>U0,toggleOutline:()=>jl});function Ym(){return ps.get()==="1"}function U0(e){e?ps.set("1"):ps.clear(),ca()}function jl(){U0(!Ym())}function ca(){let e=I("outline"),t=document.getElementById("memola-outline-btn"),o=d.currentType==="page"&&!!d.currentId;t&&(t.style.display=o?"":"none"),Ym()&&o?(e.classList.add("on"),t?.classList.add("on"),mh()):(e.classList.remove("on"),t?.classList.remove("on"))}function mh(){if(!Ym()||d.currentType!=="page")return;let e=I("outline-list");e.innerHTML="";let o=Ce().querySelectorAll("h1, h2, h3");if(o.length===0){let n=document.createElement("div");n.className="memola-outline-empty",n.textContent="\u898B\u51FA\u3057\u304C\u3042\u308A\u307E\u305B\u3093",e.appendChild(n);return}o.forEach((n,r)=>{let a="memola-outline-h-"+r;n.setAttribute("data-outline-id",a);let i=document.createElement("div");i.className="memola-outline-item memola-outline-"+n.tagName.toLowerCase(),i.textContent=(n.textContent||"").trim()||"(\u7121\u984C)",i.addEventListener("click",()=>{n.scrollIntoView({behavior:"smooth",block:"start"})}),e.appendChild(i)})}function ph(){let e=Ce(),t=null;new MutationObserver(()=>{t&&clearTimeout(t),t=setTimeout(()=>mh(),300)}).observe(e,{childList:!0,subtree:!0,characterData:!0})}var Hi=L(()=>{"use strict";q();me();be()});var fh={};j(fh,{applyPropertiesState:()=>da,isPropertiesOpen:()=>Xm,renderProperties:()=>j0,setPropertiesOpen:()=>z0,togglePropertiesPanel:()=>ql});function Xm(){return us.get()==="1"}function z0(e){e?us.set("1"):us.clear(),da()}function ql(){z0(!Xm())}function da(){let e=I("props"),t=document.getElementById("memola-props-btn");Xm()&&d.currentId?(e.classList.add("on"),t?.classList.add("on"),j0()):(e.classList.remove("on"),t?.classList.remove("on"))}function Yo(e,t){return'<div class="memola-prop-row"><div class="memola-prop-label">'+P(e)+'</div><div class="memola-prop-value">'+P(t)+"</div></div>"}async function j0(){if(!Xm()||!d.currentId)return;let e=I("props-list"),t=d.currentId,o=d.pages.find(l=>l.Id===t),n=B(t);if(!o||!n){e.innerHTML="";return}let r=ar(t).slice(0,-1).map(l=>l.Title||"\u7121\u984C").join(" / ")||"(\u30EB\u30FC\u30C8)",a=o.Type==="database"?"\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9":"\u30DA\u30FC\u30B8";if(e.innerHTML=Yo("\u7A2E\u985E",a)+Yo("\u89AA",r)+Yo("\u30A2\u30A4\u30B3\u30F3",n.icon||"-")+Yo("ID",t)+(o.Type==="database"&&n.list?Yo("SP \u30EA\u30B9\u30C8",n.list):"")+(o.Type!=="database"?Yo("\u30EA\u30B9\u30C8\u9805\u76EE",nt(t)+" #"+t):"")+'<div class="memola-prop-row memola-prop-loading">\u6700\u7D42\u66F4\u65B0\u8005\u3092\u53D6\u5F97\u4E2D...</div>',o.Type!=="database")try{let l="",c="";if(d.sync.pageId===t&&d.sync.loadedModified)l=d.sync.loadedModified;else{let p=await mt(t);p&&(l=p.modified)}c=await Fa(t).catch(()=>"");let m=e.querySelector(".memola-prop-loading");if(m&&m.remove(),l){let p=new Date(l).toLocaleString("ja-JP");e.insertAdjacentHTML("beforeend",Yo("\u6700\u7D42\u66F4\u65B0",p)),e.insertAdjacentHTML("beforeend",Yo("\u7DE8\u96C6\u8005",c||"\u4E0D\u660E"))}}catch{}else{let l=e.querySelector(".memola-prop-loading");l&&l.remove(),e.insertAdjacentHTML("beforeend",Yo("\u884C\u6570",String(d.dbItems.length))),e.insertAdjacentHTML("beforeend",Yo("\u5217\u6570",String(d.dbFields.length))),e.insertAdjacentHTML("beforeend",'<div class="memola-prop-add" id="memola-prop-add">\uFF0B \u30D7\u30ED\u30D1\u30C6\u30A3\u8FFD\u52A0</div>'),e.querySelector("#memola-prop-add")?.addEventListener("click",()=>{document.getElementById("memola-col-md")?.classList.add("on")})}e.insertAdjacentHTML("beforeend",'<div class="memola-prop-sep"></div>'),e.insertAdjacentHTML("beforeend",'<div class="memola-prop-section">\u30D0\u30C3\u30AF\u30EA\u30F3\u30AF</div>');let i=document.createElement("div");i.className="memola-prop-empty",i.textContent="\u8AAD\u307F\u8FBC\u307F\u4E2D...",e.appendChild(i);let s=t;Es(t,l=>B(l)?.title||null).then(l=>{if(d.currentId===s){if(i.remove(),l.length===0){e.insertAdjacentHTML("beforeend",'<div class="memola-prop-empty">\u53C2\u7167\u3057\u3066\u3044\u308B\u30DA\u30FC\u30B8\u306F\u3042\u308A\u307E\u305B\u3093</div>');return}for(let c of l){let m=document.createElement("div");m.className="memola-prop-backlink",m.dataset.pid=c.pageId,m.innerHTML='<div class="memola-prop-backlink-title">\u2192 '+P(c.pageTitle)+"</div>"+(c.snippet?'<div class="memola-prop-backlink-snippet">'+P(c.snippet)+"</div>":""),e.appendChild(m)}}}).catch(()=>{d.currentId===s&&(i.textContent="\u30D0\u30C3\u30AF\u30EA\u30F3\u30AF\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F")})}var Fi=L(()=>{"use strict";q();me();_e();V();Ts();Zt();Re();be();we()});var $l={};j($l,{attachScopeTag:()=>gh,confirmScopeChangeLinks:()=>V0,syncScopeTag:()=>K0,toggleCurrentPageScope:()=>Jm});function $0(){if(!d.currentId)return null;let e=B(d.currentId);return e?e.scope==="org"?"org":"user":null}function K0(){let e=document.getElementById(q0);if(!e)return;if(!(!!d.currentId&&(d.currentType==="page"||d.currentType==="database")&&!d.currentRow)){e.style.display="none";return}let o=d.currentId?B(d.currentId):null;if(!o||o.trashed){e.style.display="none";return}if(o.originPageId){e.style.display="none";return}if(o.type==="database"&&o.list==="memola-daily"){e.style.display="none";return}let n=$0()||"user",r=e.querySelector(".memola-scope-tag-ic"),a=e.querySelector(".memola-scope-tag-label");e.classList.toggle("org",n==="org"),e.classList.toggle("user",n==="user"),r&&(r.textContent=n==="org"?"\u{1F310}":"\u{1F512}"),a&&(a.textContent=n==="org"?"\u7D44\u7E54":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8"),e.title=n==="org"?"\u3053\u306E\u30DA\u30FC\u30B8\u306F\u7D44\u7E54\u306B\u516C\u958B\u3055\u308C\u3066\u3044\u307E\u3059 \u2014 \u30AF\u30EA\u30C3\u30AF\u3067\u500B\u4EBA (\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8) \u306B\u5207\u66FF":"\u3053\u306E\u30DA\u30FC\u30B8\u306F\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u3067\u3059 \u2014 \u30AF\u30EA\u30C3\u30AF\u3067\u7D44\u7E54\u306B\u516C\u958B",e.style.display="";let i=document.querySelector(".memola-pgm-scope-label"),s=document.querySelector(".memola-pgm-scope-ic");i&&(i.textContent=n==="org"?"\u500B\u4EBA\u306B\u623B\u3059":"\u7D44\u7E54\u306B\u516C\u958B"),s&&(s.textContent=n==="org"?"\u{1F310}":"\u{1F512}")}async function Jm(){let e=d.currentId;if(!e)return;let t=B(e);if(!t)return;let n=($0()||"user")==="org"?"user":"org",r=t.type==="database",a=r?"DB":"\u30DA\u30FC\u30B8",i=r?0:ks(d.pages,e),s="\u300C"+(t.title||"\u7121\u984C")+"\u300D("+a+") \u3092"+(n==="org"?"\u7D44\u7E54\u306B\u516C\u958B":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8 (\u500B\u4EBA) \u306B\u5909\u66F4")+`\u3057\u307E\u3059\u3002
`+(i>0?"\u914D\u4E0B\u306E "+i+` \u30DA\u30FC\u30B8\u3082\u540C\u3058\u5206\u985E\u306B\u5207\u308A\u66FF\u308F\u308A\u307E\u3059\u3002
`:"")+a+"\u306F "+(n==="org"?"\u300C\u{1F310} \u7D44\u7E54\u300D":"\u300C\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u300D")+` \u30BB\u30AF\u30B7\u30E7\u30F3\u306E\u5148\u982D\u306B\u79FB\u52D5\u3057\u307E\u3059\u3002

\u3088\u308D\u3057\u3044\u3067\u3059\u304B?`;if(confirm(s)&&await V0(e,n))try{let{rootId:l}=await Xa(e,n);t.parent&&await Rr(l,"");let c=d.pages.filter(u=>(u.ParentId||"")==="").map(u=>u.Id),m=[l,...c.filter(u=>u!==l)];Ha("",m);let{renderTree:p}=await Promise.resolve().then(()=>(_e(),ko));if(p(),l!==e||d.currentId===e){let{doSelect:u}=await Promise.resolve().then(()=>(K(),ie));await u(l)}K0(),k(n==="org"?"\u7D44\u7E54\u306B\u516C\u958B\u3057\u307E\u3057\u305F":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u306B\u623B\u3057\u307E\u3057\u305F")}catch(l){k("\u30B9\u30B3\u30FC\u30D7\u5909\u66F4\u306B\u5931\u6557: "+l.message,"err")}}async function V0(e,t){let o=await SA(e,t);return!(o&&!window.confirm(o))}async function SA(e,t){try{if(t==="org"){let{collectDescendantIds:a}=await Promise.resolve().then(()=>(Tr(),yv)),i=new Set(a(d.pages,e)),{findOutgoingPrivateLinks:s}=await Promise.resolve().then(()=>(V(),$e)),l=await s(e,i);return l.length===0?"":`\u26A0 \u3053\u306E\u30DA\u30FC\u30B8\u306F\u6B21\u306E\u300C\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u300D\u30DA\u30FC\u30B8\u306B\u30EA\u30F3\u30AF\u3057\u3066\u3044\u307E\u3059:

`+(l.slice(0,8).map(m=>"\u30FB"+m).join(`
`)+(l.length>8?`
\u2026\u4ED6 ${l.length-8} \u4EF6`:""))+`

\u7D44\u7E54\u306B\u516C\u958B\u3059\u308B\u3068\u3001\u3053\u308C\u3089\u306E\u30EA\u30F3\u30AF\u306F\u4ED6\u306E\u30E1\u30F3\u30D0\u30FC\u306B\u306F\u7121\u52B9(\u958B\u3051\u306A\u3044)\u306B\u306A\u308A\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B?`}let{getBacklinksFor:o}=await Promise.resolve().then(()=>(Ts(),Ev)),n=await o(e,a=>B(a)?.title||null);return n.length===0?"":`\u26A0 \u6B21\u306E\u30DA\u30FC\u30B8\u304C\u3053\u306E\u30DA\u30FC\u30B8\u306B\u30EA\u30F3\u30AF\u3057\u3066\u3044\u307E\u3059:

`+(n.slice(0,8).map(a=>"\u30FB"+a.pageTitle).join(`
`)+(n.length>8?`
\u2026\u4ED6 ${n.length-8} \u4EF6`:""))+`

\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u306B\u5909\u66F4\u3059\u308B\u3068\u3001\u3053\u308C\u3089\u306E\u30EA\u30F3\u30AF\u306F\u4ED6\u306E\u30E1\u30F3\u30D0\u30FC\u306B\u306F\u7121\u52B9(\u958B\u3051\u306A\u3044)\u306B\u306A\u308A\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B?`}catch{return""}}function gh(){let e=document.getElementById(q0);e&&e.addEventListener("click",t=>{t.stopPropagation(),Jm()})}var q0,ma=L(()=>{"use strict";q();V();Tr();le();we();q0="memola-scope-tag"});function En(){Promise.resolve().then(()=>(ma(),$l)).then(r=>r.syncScopeTag());let e=document.getElementById("memola-pub-tag");if(!e)return;let t=e.querySelector(".memola-pub-tag-label"),n=!!d.currentId&&d.currentType==="page"&&!d.currentRow&&d.currentId?B(d.currentId):null;if(!n?.published){e.style.display="none",Zm();return}e.style.display="",n.publishedDirty?(e.classList.add("dirty"),t&&(t.textContent="\u516C\u958B\u4E2D\u30FB\u672A\u53CD\u6620"),e.title="Memola \u5074\u306B\u672A\u53CD\u6620\u306E\u66F4\u65B0\u304C\u3042\u308A\u307E\u3059 \u2014 \u30AF\u30EA\u30C3\u30AF\u3067\u64CD\u4F5C\u30E1\u30CB\u30E5\u30FC"):(e.classList.remove("dirty"),t&&(t.textContent="\u516C\u958B\u4E2D"),e.title="\u516C\u958B\u30DA\u30FC\u30B8\u3068\u540C\u671F\u3057\u3066\u3044\u307E\u3059 \u2014 \u30AF\u30EA\u30C3\u30AF\u3067\u64CD\u4F5C\u30E1\u30CB\u30E5\u30FC")}function MA(){let e=document.getElementById("memola-pub-pop"),t=document.getElementById("memola-pub-tag");if(!e||!t||!d.currentId)return;let o=B(d.currentId);if(!o?.published)return;let n=e.querySelector(".memola-pub-pop-msg");n&&(n.textContent=o.publishedDirty?"Memola \u306E\u6700\u65B0\u5185\u5BB9\u304C\u516C\u958B\u30DA\u30FC\u30B8\u306B\u53CD\u6620\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002":"\u516C\u958B\u30DA\u30FC\u30B8\u306F\u6700\u65B0\u306E\u5185\u5BB9\u3068\u540C\u671F\u3057\u3066\u3044\u307E\u3059\u3002");let r=t.getBoundingClientRect();e.style.top=r.bottom+6+"px",e.style.right=window.innerWidth-r.right+"px",e.style.display="",Ui||(Ui=a=>{let i=a.target;i&&(e.contains(i)||t.contains(i)||Zm())},document.addEventListener("mousedown",Ui,!0))}function Zm(){let e=document.getElementById("memola-pub-pop");e&&(e.style.display="none"),Ui&&(document.removeEventListener("mousedown",Ui,!0),Ui=null)}async function PA(){let e=d.currentId;if(!e||!B(e)?.published)return;let{flushPendingSave:o}=await Promise.resolve().then(()=>(bt(),ta));await o();let n=document.getElementById("memola-pub-tag"),a=(I("ttl")?.value||"").trim()||"\u7121\u984C",{getBlocks:i}=await Promise.resolve().then(()=>(vt(),qo)),{blocksToMd:s}=await Promise.resolve().then(()=>(Mt(),eu)),l=s(i()),c=n?.querySelector(".memola-pub-tag-label"),m=c?.textContent||"";n&&n.classList.add("busy"),c&&(c.textContent="\u540C\u671F\u4E2D\u2026");try{await(await Promise.resolve().then(()=>(Br(),Ar))).syncPublishedPage(e,a,l),k("\u516C\u958B\u30DA\u30FC\u30B8\u3092\u540C\u671F\u3057\u307E\u3057\u305F")}catch(p){k("\u540C\u671F\u5931\u6557: "+p.message,"err"),c&&m&&(c.textContent=m)}finally{n&&n.classList.remove("busy"),En()}}function CA(){let e=d.currentId;if(!e)return;let o=B(e)?.publishedUrl||"";if(!o){k("URL \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}window.open(o,"_blank","noopener")}async function AA(){let e=d.currentId;if(!e)return;let o=B(e)?.publishedUrl||"";if(!o){k("URL \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}try{await navigator.clipboard.writeText(o),k("URL \u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")}catch{k("\u30B3\u30D4\u30FC\u5931\u6557","err")}}async function BA(){let e=d.currentId;if(e&&confirm("Web \u516C\u958B\u3092\u89E3\u9664\u3057\u307E\u3059\u3002SP \u4E0A\u306E\u516C\u958B\u30DA\u30FC\u30B8\uFF08Site Page\uFF09\u3082\u524A\u9664\u3055\u308C\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F"))try{await(await Promise.resolve().then(()=>(Br(),Ar))).unpublishPage(e),k("\u516C\u958B\u3092\u89E3\u9664\u3057\u307E\u3057\u305F")}catch(t){k("\u89E3\u9664\u5931\u6557: "+t.message,"err")}finally{En()}}function W0(){let e=document.getElementById("memola-pub-tag"),t=document.getElementById("memola-pub-pop");!e||!t||(e.addEventListener("click",o=>{o.stopPropagation(),t.style.display==="none"?MA():Zm()}),t.addEventListener("click",async o=>{let n=o.target.closest("[data-pub-act]");if(!n)return;let r=n.dataset.pubAct;Zm(),r==="sync"?await PA():r==="open"?CA():r==="copy"?await AA():r==="unpublish"&&await BA()}))}var Ui,Qm=L(()=>{"use strict";q();me();le();we();Ui=null});async function G0(){return zi||(zi=Ut({title:sr,fields:[{name:"PageId",kind:2},{name:"UserName",kind:2},{name:"LastSeen",kind:4}]}).then(()=>{}).catch(e=>{throw zi=null,e}),zi)}function X0(){zi=null,ao=null,ep=null,ir=null}async function J0(e){if(await G0(),Kl||(Kl=await Dn().catch(()=>"")),!Kl)return;if(ir)try{await ir}catch{}ep=e;let t=new Date().toISOString();if(ao)await je(sr,ao,{PageId:e,UserName:Kl,LastSeen:t}).catch(()=>{});else{ir=(async()=>{try{ao=(await Ne(sr,{Title:Y0,PageId:e,UserName:Kl,LastSeen:t})).Id}catch{}})();try{await ir}finally{ir=null}}}async function tp(){if(!(!ep||!ao))try{await je(sr,ao,{LastSeen:new Date().toISOString()})}catch{}}async function bh(){if(ir)try{await ir}catch{}if(!ao)return;let e=ao;ao=null,ep=null;try{await Ve(sr,e)}catch{}}async function Z0(e){await G0();let t=await Ee(sr),o=Date.now()-DA,n=[];for(let r of t){if(r.PageId!==e)continue;let a=r.LastSeen?new Date(r.LastSeen).getTime():0;!a||a<o||n.push({userName:r.UserName||"",sessionId:r.Title||"",lastSeen:a,isSelf:r.Title===Y0})}return n}function Q0(){window.addEventListener("beforeunload",e=>{if(Promise.resolve().then(()=>(ht(),ti)).then(({saver:t})=>{t.isDirty()&&(e.preventDefault(),e.returnValue="")}).catch(()=>{}),ao){try{navigator.sendBeacon?.(J(sr,"/items("+ao+")"))}catch{}try{fetch(J(sr,"/items("+ao+")"),{method:"POST",headers:{"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include",keepalive:!0}).catch(()=>{})}catch{}}})}var sr,hh,DA,zi,Y0,ao,ep,Kl,ir,vh=L(()=>{"use strict";De();Lt();Zt();sr="memola-presence",hh=3e4,DA=9e4,zi=null;Y0="sess-"+Math.random().toString(36).slice(2,12)+"-"+Date.now(),ao=null,ep=null,Kl="",ir=null});var kh={};j(kh,{attachPresence:()=>wh,setPresencePage:()=>xh,shutdownPresence:()=>NA,syncPresenceForCurrent:()=>np});function eI(){return yr.get()!=="0"}function _A(e){if(!e)return"?";let t=e.split(/\s+/).filter(Boolean);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():e.slice(0,1)}function RA(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)>>>0;return`hsl(${t%360}, 55%, 55%)`}function yh(e){let t=document.getElementById("memola-presence");if(!t)return;let o=e.filter(i=>!i.isSelf);if(o.length===0){t.style.display="none";return}t.style.display="";let r=o.slice(0,5),a=o.length-r.length;t.innerHTML=r.map(i=>'<span class="memola-presence-av" style="background:'+RA(i.userName)+'" title="'+P(i.userName)+' \u304C\u95B2\u89A7\u4E2D">'+P(_A(i.userName))+"</span>").join("")+(a>0?'<span class="memola-presence-more" title="\u4ED6 '+a+' \u540D">+'+a+"</span>":"")}async function op(){if(lr)try{let e=await Z0(lr);yh(e)}catch{}}async function xh(e){if(lr!==e){if(lr&&bh(),lr=e,io&&(clearInterval(io),io=null),!e){yh([]);return}if(!eI()){yh([]);return}try{await J0(e),await op(),io=setInterval(()=>{tp(),op()},hh)}catch{}}}function wh(){let e=document.body;e.dataset.memolaPresenceWired!=="1"&&(e.dataset.memolaPresenceWired="1",Q0(),document.addEventListener("visibilitychange",()=>{document.hidden&&lr?io&&(clearInterval(io),io=null):!document.hidden&&lr&&!io&&eI()&&(tp(),op(),io=setInterval(()=>{tp(),op()},hh))}))}function NA(){io&&(clearInterval(io),io=null),lr=null,bh()}function np(){d.currentType==="page"&&d.currentId&&!d.currentRow?xh(d.currentId):xh(null)}var io,lr,Vl=L(()=>{"use strict";q();vh();Re();be();io=null,lr=null});var tI={};j(tI,{getTagColor:()=>Ih,setTagColor:()=>OA});function Ih(e,t,o){return ss.get()[e]?.[t]?.[o]||""}function OA(e,t,o,n){let r=ss.get(),a=r[e]||(r[e]={}),i=a[t]||(a[t]={});n?i[o]=n:delete i[o],ss.set(r)}var Eh=L(()=>{"use strict";be()});var Dh={};j(Dh,{DEFAULT_VIEW_ID:()=>pa,VIEW_TYPE_LABEL:()=>Wl,addView:()=>Mh,canColorRows:()=>FA,changeViewType:()=>Ch,deleteView:()=>Ah,ensureViews:()=>rp,getActiveViewId:()=>ap,getView:()=>Gl,isDefaultView:()=>ji,listViews:()=>Lh,patchView:()=>Bh,renameView:()=>Ph,setActiveViewId:()=>Sh});function HA(){return"v"+Date.now().toString(36)+Math.floor(Math.random()*1e4).toString(36)}function Th(){return{id:pa,name:"\u30C6\u30FC\u30D6\u30EB",type:"table",filters:[],sort:{field:null,asc:!0},colors:{rows:{},cols:{}},rules:[]}}function rp(e){let t=lt.get(),o=t[e];return!o||!Array.isArray(o.views)||o.views.length===0?(o={activeId:pa,views:[Th()]},t[e]=o,lt.set(t)):o.views.some(n=>n.id===pa)||(o.views.unshift(Th()),lt.set(t)),o}function Lh(e){return rp(e).views}function Gl(e,t){let o=rp(e);return o.views.find(n=>n.id===t)||o.views[0]}function ap(e){let t=rp(e);return t.views.some(o=>o.id===t.activeId)?t.activeId:t.views[0].id}function Sh(e,t){let o=lt.get(),n=o[e];n&&(n.activeId=t,lt.set(o))}function ji(e){return(typeof e=="string"?e:e.id)===pa}function FA(e){return!ji(e)}function Mh(e,t){let o=lt.get(),n=o[e]||(o[e]={activeId:pa,views:[Th()]}),r=Wl[t],a=n.views.filter(s=>s.type===t).length,i={id:HA(),name:a>0?`${r} ${a+1}`:r,type:t,filters:[],sort:{field:null,asc:!0},colors:{rows:{},cols:{}},rules:[]};return n.views.push(i),lt.set(o),i}function Ph(e,t,o){let n=lt.get(),r=n[e]?.views.find(a=>a.id===t);r&&(r.name=o.trim()||r.name,lt.set(n))}function Ch(e,t,o){let n=lt.get(),r=n[e]?.views.find(a=>a.id===t);!r||ji(r)||(r.type=o,lt.set(n))}function Ah(e,t){if(ji(t))return;let o=lt.get(),n=o[e];n&&(n.views=n.views.filter(r=>r.id!==t),n.activeId===t&&(n.activeId=pa),lt.set(o))}function Bh(e,t,o){let n=lt.get(),r=n[e]?.views.find(a=>a.id===t);r&&(Object.assign(r,o),lt.set(n))}var pa,Wl,Yl=L(()=>{"use strict";be();pa="__default__",Wl={table:"\u30C6\u30FC\u30D6\u30EB",board:"\u30DC\u30FC\u30C9",list:"\u30EA\u30B9\u30C8",gallery:"\u30AE\u30E3\u30E9\u30EA\u30FC",calendar:"\u30AB\u30EC\u30F3\u30C0\u30FC",gantt:"\u30AC\u30F3\u30C8"}});var sp={};j(sp,{addFilterForField:()=>zA,attachFilterPopoverOutsideClick:()=>$A,passesFilters:()=>KA,renderFilterChips:()=>ip,showFilterPopover:()=>jA});function ua(e){return document.getElementById(e)}function Xl(){d.dbList&&Bh(d.dbList,d.dbViewId,{filters:d.dbFilters.map(e=>({...e}))})}function ip(){let e=ua("memola-filter-chips");e&&(e.innerHTML="",d.dbFilters.forEach((t,o)=>{let n=d.dbFields.find(s=>s.InternalName===t.field);if(!n)return;let r=document.createElement("div");r.className="memola-flt-chip";let a=document.createElement("span");a.className="memola-flt-chip-label",a.textContent=n.Title,r.appendChild(a),r.appendChild(UA(n,t,o));let i=document.createElement("button");i.className="memola-flt-chip-x",i.title="\u524A\u9664",i.textContent="\xD7",i.addEventListener("click",()=>{d.dbFilters.splice(o,1),Xl(),ip(),Oe()}),r.appendChild(i),e.appendChild(r)}))}function UA(e,t,o){if(e.FieldTypeKind===6&&e.Choices){let r=document.createElement("select");r.className="memola-flt-chip-val";let a=document.createElement("option");return a.value="",a.textContent="\u2014",r.appendChild(a),e.Choices.forEach(i=>{let s=document.createElement("option");s.value=i,s.textContent=i,t.value===i&&(s.selected=!0),r.appendChild(s)}),r.addEventListener("change",()=>{d.dbFilters[o].op="equals",d.dbFilters[o].value=r.value,Xl(),Oe()}),r}if(e.FieldTypeKind===8){let r=document.createElement("select");return r.className="memola-flt-chip-val",[["","\u2014"],["true","\u30C1\u30A7\u30C3\u30AF\u6E08\u307F"],["false","\u672A\u30C1\u30A7\u30C3\u30AF"]].forEach(([a,i])=>{let s=document.createElement("option");s.value=a,s.textContent=i,t.value===a&&(s.selected=!0),r.appendChild(s)}),r.addEventListener("change",()=>{d.dbFilters[o].op="equals",d.dbFilters[o].value=r.value,Xl(),Oe()}),r}let n=document.createElement("input");return n.type="text",n.className="memola-flt-chip-val",n.placeholder="\u5024\u2026",n.value=t.value||"",n.addEventListener("input",()=>{d.dbFilters[o].op="contains",d.dbFilters[o].value=n.value,Xl(),Oe()}),n.addEventListener("keydown",r=>{r.key==="Escape"&&n.blur()}),n}function zA(e){d.dbFilters.some(t=>t.field===e)||(d.dbFilters.push({field:e,op:"contains",value:""}),Xl()),ip(),Oe(),setTimeout(()=>{let o=ua("memola-filter-chips")?.querySelectorAll(".memola-flt-chip-val");o&&o.length>0&&o[o.length-1].focus()},50)}function jA(){let e=ua("memola-filter-popover"),t=ua("memola-db-filter-btn");if(!e||!t)return;let o=e;if(o.classList.contains("on")){o.classList.remove("on");return}o.innerHTML="";let n=document.createElement("div");n.className="memola-flt-pop-inpwrap";let r=document.createElement("input");r.type="text",r.className="memola-flt-pop-inp",r.placeholder="\u30D5\u30A3\u30EB\u30BF\u30FC\u5BFE\u8C61\u2026",n.appendChild(r),o.appendChild(n);let a=document.createElement("div");a.className="memola-flt-pop-list",o.appendChild(a);function i(l){a.innerHTML="";let c=new Set(d.dbFilters.map(u=>u.field)),m=l.toLowerCase(),p=d.dbFields.filter(u=>!c.has(u.InternalName)).filter(u=>!m||u.Title.toLowerCase().includes(m));if(p.length===0){let u=document.createElement("div");u.className="memola-flt-pop-empty",u.textContent=c.size===d.dbFields.length?"\u5168\u9805\u76EE\u306B\u65E2\u306B\u6761\u4EF6\u304C\u8A2D\u5B9A\u6E08\u307F":"\u4E00\u81F4\u3059\u308B\u9805\u76EE\u306A\u3057",a.appendChild(u);return}p.forEach(u=>{let f=document.createElement("div");f.className="memola-flt-pop-item";let g=document.createElement("span");g.className="memola-flt-pop-ic",g.textContent=qA(u.FieldTypeKind);let y=document.createElement("span");y.textContent=u.Title,f.append(g,y),f.addEventListener("click",()=>{d.dbFilters.push({field:u.InternalName,op:"contains",value:""}),o.classList.remove("on"),ip(),Oe(),setTimeout(()=>{let h=ua("memola-filter-chips")?.querySelectorAll(".memola-flt-chip-val");h&&h.length>0&&h[h.length-1].focus()},50)}),a.appendChild(f)})}r.addEventListener("input",()=>i(r.value));let s=t.getBoundingClientRect();o.style.left=s.left+"px",o.style.top=s.bottom+6+"px",o.classList.add("on"),i(""),setTimeout(()=>r.focus(),30)}function qA(e){switch(e){case 2:return"Aa";case 3:return"\xB6";case 4:return"\u{1F4C5}";case 6:return"\u25C9";case 8:return"\u2610";case 9:return"#";default:return"\xB7"}}function $A(){document.addEventListener("click",e=>{let t=ua("memola-filter-popover"),o=ua("memola-db-filter-btn");if(!t||!t.classList.contains("on"))return;let n=e.target;t&&t.contains(n)||o&&o.contains(n)||t.classList.remove("on")})}function KA(e){for(let t of d.dbFilters){if(!t.value&&t.op!=="empty"&&t.op!=="not_empty")continue;let o=e[t.field],n=o==null?"":String(o);switch(t.op){case"equals":if(t.value==="true"||t.value==="false"){if(n==="true"!=(t.value==="true"))return!1}else if(n!==t.value)return!1;break;case"not_empty":if(!n)return!1;break;case"empty":if(n)return!1;break;case"contains":default:if(!n.toLowerCase().includes(t.value.toLowerCase()))return!1}}return!0}var lp=L(()=>{"use strict";q();K();Yl()});var aI={};j(aI,{closeColumnMenu:()=>qi,openColumnMenu:()=>VA});function qi(){Tn&&(Tn.remove(),Tn=null),Ln&&(document.removeEventListener("mousedown",Ln,!0),Ln=null)}async function oI(){(await Promise.resolve().then(()=>($i(),sI))).renderDbTable()}async function nI(){let e=d.pages.find(o=>o.Id===d.currentId);if(!e)return;await(await Promise.resolve().then(()=>(K(),ie))).doSelectDb(d.currentId,e)}function VA(e,t,o){qi();let n=document.getElementById("memola-overlay");if(!n)return;let r=document.createElement("div");r.className="memola-colmenu",r.style.left=Math.round(t)+"px",r.style.top=Math.round(o)+"px";let a=(c,m,p={})=>{let u=document.createElement("div");return u.className="memola-colmenu-item"+(p.danger?" danger":""),u.textContent=c,u.addEventListener("click",()=>{qi(),m()}),u},i=()=>{let c=document.createElement("div");return c.className="memola-colmenu-sep",c},s=c=>{d.dbSort.field=e.InternalName,d.dbSort.asc=c,Promise.resolve().then(()=>(Yl(),Dh)).then(m=>m.patchView(d.dbList,d.dbViewId,{sort:{field:d.dbSort.field,asc:d.dbSort.asc}})),oI()};r.append(a("\u2191 \u6607\u9806\u3067\u4E26\u3079\u66FF\u3048",()=>s(!0)),a("\u2193 \u964D\u9806\u3067\u4E26\u3079\u66FF\u3048",()=>s(!1)),a("\u30D5\u30A3\u30EB\u30BF\u30FC",()=>{Promise.resolve().then(()=>(lp(),sp)).then(c=>c.addFilterForField(e.InternalName))})),e.FieldTypeKind===6&&r.append(a("\u9078\u629E\u80A2\u3092\u7DE8\u96C6",()=>rI(e,t,o))),r.append(i(),a("\u{1F5D1} \u5217\u3092\u524A\u9664",()=>{confirm(`\u5217\u300C${e.Title}\u300D\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F(\u3053\u306E\u5217\u306E\u5024\u3082\u5931\u308F\u308C\u307E\u3059)`)&&(async()=>{try{_(!0,"\u5217\u3092\u524A\u9664\u4E2D...");let{deleteListField:c}=await Promise.resolve().then(()=>(De(),po));await c(d.dbList,e.InternalName),await nI(),k("\u5217\u3092\u524A\u9664\u3057\u307E\u3057\u305F","ok")}catch(c){k("\u5217\u306E\u524A\u9664\u306B\u5931\u6557: "+c.message,"err")}finally{_(!1)}})()},{danger:!0})),n.appendChild(r);let l=r.getBoundingClientRect();l.right>window.innerWidth-8&&(r.style.left=Math.max(8,window.innerWidth-l.width-8)+"px"),l.bottom>window.innerHeight-8&&(r.style.top=Math.max(8,o-l.height)+"px"),Ln=c=>{Tn&&!Tn.contains(c.target)&&qi()},setTimeout(()=>{Ln&&document.addEventListener("mousedown",Ln,!0)},0),Tn=r}function rI(e,t,o){qi();let n=document.getElementById("memola-overlay");if(!n)return;let r=document.createElement("div");r.className="memola-colmenu memola-optedit",r.style.left=Math.round(t)+"px",r.style.top=Math.round(o)+"px";let a=[...e.Choices||[]],i=c=>WA[Math.max(0,a.indexOf(c))%6],s=document.createElement("div");s.className="memola-colmenu-item",s.style.cssText="font-weight:600;color:var(--ink-3);cursor:default",s.textContent="\u9078\u629E\u80A2\u3092\u7DE8\u96C6",r.appendChild(s),r.appendChild(Object.assign(document.createElement("div"),{className:"memola-colmenu-sep"})),(async()=>{let[{getTagColor:c,setTagColor:m},{openColorPalette:p},{updateListFieldChoices:u},{apiUpdateDbRow:f}]=await Promise.all([Promise.resolve().then(()=>(Eh(),tI)),Promise.resolve().then(()=>(wd(),Ky)),Promise.resolve().then(()=>(De(),po)),Promise.resolve().then(()=>(qe(),Ct))]),g=e.Title||e.InternalName,y=async(x,T)=>{try{_(!0,"\u9078\u629E\u80A2\u3092\u66F4\u65B0\u4E2D..."),T&&await T(),await u(d.dbList,e.InternalName,x),await nI();let E=d.dbFields.find(C=>C.InternalName===e.InternalName);E&&rI(E,t,o)}catch(E){k("\u9078\u629E\u80A2\u306E\u66F4\u65B0\u306B\u5931\u6557: "+E.message,"err")}finally{_(!1)}},b=x=>d.dbItems.filter(T=>T[e.InternalName]===x);for(let x of a){let T=document.createElement("div");T.className="memola-optedit-row";let E=document.createElement("button");E.className="memola-optedit-sw",E.title="\u8272\u3092\u5909\u66F4",E.style.background=c(d.dbList,e.InternalName,x)||i(x),E.addEventListener("click",N=>{N.stopPropagation();let D=E.getBoundingClientRect();p(D.right+4,D.top,O=>{m(d.dbList,e.InternalName,x,O),E.style.background=O||i(x),oI()})});let C=document.createElement("input");C.className="memola-optedit-inp",C.value=x;let U=()=>{let N=C.value.trim();if(!N||N===x){C.value=x;return}if(a.includes(N)){k("\u540C\u3058\u9078\u629E\u80A2\u304C\u65E2\u306B\u3042\u308A\u307E\u3059"),C.value=x;return}let D=a.map(O=>O===x?N:O);y(D,async()=>{for(let Y of b(x))await f(d.dbList,Y.Id,{[g]:N});let O=c(d.dbList,e.InternalName,x);O&&(m(d.dbList,e.InternalName,N,O),m(d.dbList,e.InternalName,x,""))})};C.addEventListener("keydown",N=>{N.key==="Enter"&&(N.preventDefault(),C.blur())}),C.addEventListener("blur",U);let M=document.createElement("button");M.className="memola-optedit-del",M.textContent="\xD7",M.title="\u524A\u9664",M.addEventListener("click",N=>{if(N.stopPropagation(),!confirm(`\u9078\u629E\u80A2\u300C${x}\u300D\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F(\u3053\u306E\u9078\u629E\u80A2\u306E\u5024\u306F\u7A7A\u306B\u306A\u308A\u307E\u3059)`))return;let D=a.filter(O=>O!==x);y(D,async()=>{for(let O of b(x))await f(d.dbList,O.Id,{[g]:""});m(d.dbList,e.InternalName,x,"")})}),T.append(E,C,M),r.appendChild(T)}r.appendChild(Object.assign(document.createElement("div"),{className:"memola-colmenu-sep"}));let h=document.createElement("div");h.className="memola-optedit-row";let v=document.createElement("input");v.className="memola-optedit-inp",v.placeholder="\uFF0B \u65B0\u3057\u3044\u9078\u629E\u80A2";let w=()=>{let x=v.value.trim();if(x){if(a.includes(x)){k("\u540C\u3058\u9078\u629E\u80A2\u304C\u65E2\u306B\u3042\u308A\u307E\u3059");return}y([...a,x])}};v.addEventListener("keydown",x=>{x.key==="Enter"&&(x.preventDefault(),w())}),h.appendChild(v),r.appendChild(h)})(),n.appendChild(r);let l=r.getBoundingClientRect();l.right>window.innerWidth-8&&(r.style.left=Math.max(8,window.innerWidth-l.width-8)+"px"),l.bottom>window.innerHeight-8&&(r.style.top=Math.max(8,window.innerHeight-l.height-8)+"px"),Ln=c=>{Tn&&!Tn.contains(c.target)&&qi()},setTimeout(()=>{Ln&&document.addEventListener("mousedown",Ln,!0)},0),Tn=r}var Tn,Ln,WA,iI=L(()=>{"use strict";q();le();Tn=null,Ln=null;WA=["#e8e4d8","#dde6dc","#dce2e6","#e8dccf","#f0d8d2","#f0e3ef"]});var sI={};j(sI,{getDbFields:()=>Vi,getSortedFilteredItems:()=>$t,isManualRowOrderActive:()=>fn,mkDbRow:()=>Wi,mkOpenRowBtn:()=>yo,renderDbTable:()=>Oe,reorderRows:()=>zn,setSelectionAnchor:()=>Jl});function Vi(){let e=d.dbFields.filter(t=>[2,3,4,6,8,9].indexOf(t.FieldTypeKind)>=0);return rf(e,d.dbList)}function $t(){let e=d.dbItems.slice();if(d.dbFilters.length>0&&(e=e.filter(t=>{for(let o of d.dbFilters){if(!o.value&&o.op!=="empty"&&o.op!=="not_empty")continue;let n=t[o.field],r=n==null?"":String(n);if(o.op==="equals"){if(r!==o.value)return!1}else if(o.op==="not_empty"){if(!r)return!1}else if(o.op==="empty"){if(r)return!1}else if(!r.toLowerCase().includes(o.value.toLowerCase()))return!1}return!0})),d.dbSort.field){let t=d.dbSort.field,o=d.dbSort.asc;e.sort((n,r)=>{let a=n[t]!=null?String(n[t]):"",i=r[t]!=null?String(r[t]):"";return a<i?o?-1:1:a>i?o?1:-1:0})}else e=xd(e,d.dbList);return e}function fn(){return d.dbSort.field==null}function zn(e,t,o){let n=(Array.isArray(e)?e:[e]).filter(l=>l!==t);if(n.length===0)return;let r=yd(d.dbList)||[],a=xd(d.dbItems.slice(),d.dbList).map(l=>l.Id),i=n.slice().sort((l,c)=>a.indexOf(l)-a.indexOf(c));for(let l of i){let c=a.indexOf(l);c>=0&&a.splice(c,1)}let s=a.indexOf(t);s<0&&(s=a.length),o&&(s+=1),a.splice(s,0,...i),af(d.dbList,a),xf(d.dbList,r,a),Oe(),Promise.resolve().then(()=>(Ed(),Id)).then(l=>{I("list-view").classList.contains("on")&&l.renderListView(),I("gallery-view").classList.contains("on")&&l.renderGalleryView(),I("calendar-view").classList.contains("on")&&l.renderCalendarView(),I("gantt-view").classList.contains("on")&&l.renderGanttView()})}function Jl(e){Ki=e}function Oe(){let e=I("dth-row"),t=I("dtb");e.innerHTML="",t.innerHTML="";let o=Vi();_h=mf(d.dbList),ff(d.dbList,d.dbItems.map(u=>u.Id)),I("dt").classList.toggle("memola-has-sel",d.dbSelected.size>0),Un();let r=document.createElement("th");r.className="memola-th-cb";let a=document.createElement("input");a.type="checkbox",a.className="memola-cb";let s=$t().map(u=>u.Id),l=s.filter(u=>d.dbSelected.has(u)).length;l===0?a.checked=!1:l===s.length?a.checked=!0:a.indeterminate=!0,a.addEventListener("change",()=>{a.checked?s.forEach(u=>d.dbSelected.add(u)):s.forEach(u=>d.dbSelected.delete(u)),Oe()}),r.appendChild(a),e.appendChild(r),o.forEach((u,f)=>{let g=document.createElement("th"),y=d.dbSort.field===u.InternalName,b=document.createElement("span");b.className="memola-th-label",b.innerHTML=u.Title+(y?'<span class="sort-arrow">'+(d.dbSort.asc?"\u25B2":"\u25BC")+"</span>":""),g.appendChild(b),g.dataset.field=u.InternalName,g.dataset.colIdx=String(f),g.draggable=!0;let h=d.dbColumnWidths[u.InternalName];h&&(g.style.width=h+"px"),b.addEventListener("click",w=>{w.stopPropagation();let x=b.getBoundingClientRect();Promise.resolve().then(()=>(iI(),aI)).then(T=>T.openColumnMenu(u,x.left,x.bottom+4))}),g.addEventListener("dragstart",w=>{w.dataTransfer&&(w.dataTransfer.effectAllowed="move",w.dataTransfer.setData("text/memola-col",String(f)),g.classList.add("memola-th-dragging"))}),g.addEventListener("dragend",()=>g.classList.remove("memola-th-dragging")),g.addEventListener("dragover",w=>{let x=w.dataTransfer;if(!x||Array.from(x.types).indexOf("text/memola-col")<0)return;w.preventDefault(),x.dropEffect="move";let T=g.getBoundingClientRect(),E=w.clientX>T.left+T.width/2;g.classList.toggle("memola-th-drop-before",!E),g.classList.toggle("memola-th-drop-after",E)}),g.addEventListener("dragleave",()=>{g.classList.remove("memola-th-drop-before","memola-th-drop-after")}),g.addEventListener("drop",w=>{let x=w.dataTransfer;if(!x)return;let T=x.getData("text/memola-col");if(!T)return;w.preventDefault();let E=parseInt(T,10),C=g.getBoundingClientRect(),M=w.clientX>C.left+C.width/2?f+1:f;g.classList.remove("memola-th-drop-before","memola-th-drop-after");let N=vd(d.dbList)||[],O=cf(o,E,M).map(Y=>Y.InternalName);nf(d.dbList,O),kf(d.dbList,N,O),Oe()});let v=document.createElement("div");v.className="memola-col-resize",v.addEventListener("mousedown",w=>{w.preventDefault(),w.stopPropagation();let x=w.clientX,T=g.offsetWidth;document.body.style.cursor="col-resize",document.body.style.userSelect="none";function E(U){let M=Math.max(60,T+U.clientX-x);g.style.width=M+"px",d.dbColumnWidths[u.InternalName]=M}function C(){document.body.style.cursor="",document.body.style.userSelect="",document.removeEventListener("mousemove",E),document.removeEventListener("mouseup",C)}document.addEventListener("mousemove",E),document.addEventListener("mouseup",C)}),g.appendChild(v),e.appendChild(g)});let c=document.createElement("th");c.className="memola-th-del",e.appendChild(c);let m=document.createElement("th");m.className="memola-th-add",m.textContent="+",m.title="\u5217\u3092\u8FFD\u52A0",m.addEventListener("click",()=>{I("col-name").value="";let u=document.querySelectorAll("#memola-col-type-grid .memola-col-type");u[0]&&u[0].click();let f=document.getElementById("memola-col-choices");f&&(f.value=""),I("col-choices-row").classList.remove("on");let g=document.getElementById("memola-col-spmap");g&&(g.value=""),I("col-md").classList.add("on"),I("col-name").focus()}),e.appendChild(m);let p=document.createElement("th");p.className="memola-th-spacer",e.appendChild(p),$t().forEach(u=>{t.appendChild(Wi(u,o))})}function yo(e){let t=document.createElement("button");return t.className="memola-row-open",t.title="\u884C\u3092\u958B\u304F\uFF08\u30DA\u30FC\u30B8\u8868\u793A\uFF09",t.textContent="\u2197",t.addEventListener("click",o=>{o.stopPropagation(),Promise.resolve().then(()=>(Uo(),Fo)).then(n=>n.openRowAsPage(d.currentId||"",e))}),t}function Wi(e,t){let o=document.createElement("tr");o.dataset.id=String(e.Id),o.addEventListener("mousedown",c=>{if(!c.shiftKey)return;let m=c.target;if(!m||m.closest(".memola-cb")||m.closest(".memola-row-open")||m.closest(".memola-del-btn"))return;c.preventDefault(),c.stopPropagation();let p=o.querySelector(".memola-cb");p&&(p.checked=!p.checked,p.dispatchEvent(new Event("change")))},!0);let n=document.createElement("td");n.className="memola-td-cb";let r=_h.rows?.[String(e.Id)];r&&(n.style.background=r);let a=document.createElement("input");a.type="checkbox",a.className="memola-cb",a.checked=d.dbSelected.has(e.Id),a.checked&&o.classList.add("memola-tr-sel"),a.addEventListener("click",c=>{let m=c;if(c.stopPropagation(),m.shiftKey&&Ki!==null&&Ki!==e.Id){c.preventDefault();let p=$t().map(g=>g.Id),u=p.indexOf(Ki),f=p.indexOf(e.Id);if(u>=0&&f>=0){let[g,y]=u<f?[u,f]:[f,u],b=!a.checked;for(let h=g;h<=y;h++)b?d.dbSelected.add(p[h]):d.dbSelected.delete(p[h]);Ki=e.Id,Oe()}}}),a.addEventListener("change",()=>{a.checked?d.dbSelected.add(e.Id):d.dbSelected.delete(e.Id),Ki=e.Id,o.classList.toggle("memola-tr-sel",a.checked),I("dt").classList.toggle("memola-has-sel",d.dbSelected.size>0),Un();let c=document.querySelector(".memola-th-cb .memola-cb");if(c){let m=$t().map(u=>u.Id),p=m.filter(u=>d.dbSelected.has(u)).length;c.indeterminate=p>0&&p<m.length,c.checked=p>0&&p===m.length}}),n.appendChild(a),o.appendChild(n),t.forEach(c=>{let m=document.createElement("td"),p=uf(_h,e.Id,c.InternalName);if(p&&(m.style.background=p),c.FieldTypeKind===4){let h=function(){let w=To(b);y.innerHTML="";let x=document.createElement("span");x.textContent=w||"\u2014",w||(x.style.color="var(--ink-4)"),y.appendChild(x)},v=function(){y.innerHTML="";let w=document.createElement("span");w.className="memola-dc-date-wrap";let x=document.createElement("input");x.type="text",x.className="memola-dc-date-inp",x.placeholder="YYYY-MM-DD",x.value=To(b);let T=document.createElement("input");T.type="date",T.className="memola-dc-date-pick",T.value=To(b),T.tabIndex=-1,T.title="\u30AB\u30EC\u30F3\u30C0\u30FC\u304B\u3089\u9078\u629E",w.append(x,T),y.appendChild(w),x.focus(),x.select();let E=!1;function C(){if(!b){h();return}E=!0;let N=b;b="",e[c.InternalName]="",Ye("\u4FDD\u5B58\u4E2D..."),ft(d.dbList,e.Id,{[c.InternalName]:""}).then(()=>{Ye(""),h(),to(d.dbList,e.Id,c.InternalName,c.Title,N,"")}).catch(D=>{k(D.message,"err"),b=N,e[c.InternalName]=N,h()})}function U(N){if(N===b){h();return}E=!0;let D=b;b=N,e[c.InternalName]=N,Ye("\u4FDD\u5B58\u4E2D..."),ft(d.dbList,e.Id,{[c.InternalName]:N}).then(()=>{Ye(""),h(),to(d.dbList,e.Id,c.InternalName,c.Title,D,N)}).catch(O=>{k(O.message,"err"),b=D,e[c.InternalName]=D,h()})}function M(N){if(E)return;let D=N.trim();if(!D){C();return}let O=Rc(D);if(!O){k("\u65E5\u4ED8\u5F62\u5F0F\u304C\u7121\u52B9\u3067\u3059: "+D,"err"),x.focus();return}U(O)}x.addEventListener("blur",N=>{N.relatedTarget!==T&&M(x.value)}),x.addEventListener("keydown",N=>{N.key==="Enter"&&(N.preventDefault(),M(x.value)),N.key==="Escape"&&h()}),T.addEventListener("change",()=>{T.value?U(T.value):C()})};var u=h,f=v;let y=document.createElement("div");y.className="memola-dc-date";let b=e[c.InternalName]||"";y.addEventListener("click",()=>{y.querySelector("input")||v()}),h(),m.appendChild(y)}else if(c.FieldTypeKind===6&&c.Choices){let w=function(x){if(y.innerHTML="",x){let T=v.indexOf(x)%6,E=document.createElement("span");E.className="memola-select-chip memola-sc-"+T,E.textContent=x;let C=Ih(d.dbList,c.InternalName,x);C&&(E.style.background=C,E.style.color="#2a2a26"),E.style.cursor="pointer",E.addEventListener("click",()=>{y.innerHTML="",y.appendChild(b),b.focus()}),y.appendChild(E)}else y.appendChild(b)};var g=w;let y=document.createElement("div");y.style.padding="4px 12px";let b=document.createElement("select");b.style.cssText="border:none;background:transparent;font-size:14px;font-family:inherit;outline:none;cursor:pointer;max-width:140px;";let h=document.createElement("option");h.value="",h.textContent="\u2014",b.appendChild(h),c.Choices.forEach(x=>{let T=document.createElement("option");T.value=x,T.textContent=x,e[c.InternalName]===x&&(T.selected=!0),b.appendChild(T)});let v=c.Choices;b.addEventListener("change",()=>{let x=b.value,T=e[c.InternalName]||"";if(x===T)return;let E={};E[c.Title||c.InternalName]=x,e[c.InternalName]=x,ft(d.dbList,e.Id,E).then(()=>{w(x),to(d.dbList,e.Id,c.InternalName,c.Title,T,x)}).catch(C=>{k(C.message,"err")})}),b.addEventListener("blur",()=>{w(b.value)}),w(e[c.InternalName]||""),m.appendChild(y)}else{let y=c.FieldTypeKind===3,b=document.createElement("span");b.className="memola-dc"+(y?" multi":""),b.contentEditable="true",b.textContent=e[c.InternalName]!=null?String(e[c.InternalName]):"",b.dataset.field=c.InternalName;let h=b.textContent||"";b.addEventListener("focus",()=>{h=b.textContent||""}),b.addEventListener("keydown",v=>{let w=v;if(!(w.isComposing||w.keyCode===229)){if(w.key==="Escape"){b.textContent=h,b.blur();return}w.key==="Enter"&&(y?(w.metaKey||w.ctrlKey)&&(v.preventDefault(),b.blur()):w.shiftKey||(v.preventDefault(),b.blur()))}}),b.addEventListener("blur",()=>{let v=(b.textContent||"").trim(),w=h.trim();if(v===w)return;let x={};x[c.InternalName]=v,e[c.InternalName]=v,h=v,Ye("\u4FDD\u5B58\u4E2D..."),ft(d.dbList,e.Id,x).then(()=>{Ye(""),to(d.dbList,e.Id,c.InternalName,c.Title,w,v)}).catch(T=>{k(T.message,"err"),b.textContent=h})}),m.appendChild(b),c.InternalName==="Title"&&(m.style.position="relative",b.style.fontWeight="500",m.appendChild(yo(e)))}o.appendChild(m)});let i=document.createElement("td");i.className="memola-td-del";let s=document.createElement("button");s.className="memola-del-btn",s.title="\u884C\u3092\u524A\u9664",s.textContent="\u{1F5D1}",s.addEventListener("click",()=>{if(!confirm("\u3053\u306E\u884C\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F"))return;_(!0,"\u524A\u9664\u4E2D...");let c=d.dbList;zr(c,e.Id).then(()=>{o.remove(),k("\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u2318Z \u3067\u5FA9\u5143\u53EF\u80FD\uFF09")}).catch(m=>{k("\u524A\u9664\u5931\u6557: "+m.message,"err")}).finally(()=>{_(!1)})}),i.appendChild(s),o.appendChild(i),o.appendChild(document.createElement("td"));let l=document.createElement("td");return l.className="memola-td-spacer",o.appendChild(l),o}var _h,Ki,$i=L(()=>{"use strict";q();me();le();qe();Lo();Xs();No();Js();wd();Eh();_h={};Ki=null});function Yi(){let e=I("kb");e.innerHTML="";let t=d.dbFields.find(n=>n.FieldTypeKind===6&&n.Choices);if(!t||!t.Choices){let n=document.createElement("div");n.style.cssText="padding:40px;color:#9b9a97;font-size:14px;",n.textContent="\u9078\u629E\u80A2\u5217\u3092\u8FFD\u52A0\u3057\u3066\u304F\u3060\u3055\u3044",e.appendChild(n);return}t.Choices.concat(["\u672A\u8A2D\u5B9A"]).forEach(n=>{let r=document.createElement("div");r.className="memola-kb-col",r.dataset.choice=n;let a=document.createElement("div");a.className="memola-kb-col-hd",a.textContent=n,r.appendChild(a),$t().filter(s=>{let l=s[t.InternalName]||"";return n==="\u672A\u8A2D\u5B9A"?!l:l===n}).forEach(s=>{let l=document.createElement("div");l.className="memola-kb-card",d.dbSelected.has(s.Id)&&l.classList.add("memola-card-sel"),l.draggable=!0,l.dataset.id=String(s.Id);let c=document.createElement("span");c.className="memola-kb-card-title",c.textContent=s.Title||"(\u7121\u984C)",l.appendChild(c),l.appendChild(yo(s)),jn(l,s.Id),tl(l,s.Id),r.appendChild(l)}),r.addEventListener("dragover",s=>{let l=s.dataTransfer;!l||Array.from(l.types).indexOf("text/memola-kb")<0||(s.preventDefault(),l.dropEffect="move",Rh(r,s.clientY))}),r.addEventListener("dragleave",s=>{let l=s.relatedTarget;(!l||!r.contains(l))&&Zl()}),r.addEventListener("drop",s=>{let l=s.dataTransfer;if(!l)return;let c=l.getData("text/memola-kb");if(!c)return;s.preventDefault(),Zl();let m=parseInt(c,10);if(!d.dbItems.find(b=>b.Id===m))return;let u=d.dbSelected.has(m)?Array.from(d.dbSelected):[m],f=n==="\u672A\u8A2D\u5B9A"?"":n,g=[],y=[];for(let b of u){let h=d.dbItems.find(w=>w.Id===b);if(!h)continue;let v=h[t.InternalName]||"";f!==v&&(h[t.InternalName]=f,y.push(()=>{h[t.InternalName]=v}),g.push(ft(d.dbList,b,{[t.InternalName]:f}).then(()=>to(d.dbList,b,t.InternalName,t.Title,v,f))))}g.length!==0&&Promise.all(g).then(()=>requestAnimationFrame(()=>Yi())).catch(b=>{y.forEach(h=>h()),k("\u5909\u66F4\u5931\u6557: "+b.message,"err"),requestAnimationFrame(()=>Yi())})}),e.appendChild(r)})}function lI(){let e=document.getElementById("memola-overlay")||document.body;if(Gi&&e.contains(Gi))return Gi;let t=document.createElement("div");return t.className="memola-card-drop-line",e.appendChild(t),Gi=t,t}function Rh(e,t){let o=Array.from(e.querySelectorAll(".memola-kb-card, .memola-gv-card"));if(o.length===0){let s=e.getBoundingClientRect(),l=lI();l.style.top=s.top+36+"px",l.style.left=s.left+8+"px",l.style.width=s.width-16+"px",l.classList.add("on");return}let n=o[0],r=!1;for(let s of o){let l=s.getBoundingClientRect();if(t<l.top+l.height/2){n=s,r=!1;break}n=s,r=!0}let a=n.getBoundingClientRect(),i=lI();i.style.top=(r?a.bottom:a.top)-1+"px",i.style.left=a.left+"px",i.style.width=a.width+"px",i.classList.add("on")}function Zl(){Gi&&Gi.classList.remove("on"),document.querySelectorAll(".memola-card-drop-line").forEach(e=>{e.classList.remove("on")})}function jn(e,t){e.addEventListener("click",o=>{if(o.target.closest(".memola-row-open"))return;o.shiftKey&&(d.dbSelected.has(t)?d.dbSelected.delete(t):d.dbSelected.add(t),e.classList.toggle("memola-card-sel",d.dbSelected.has(t)),Promise.resolve().then(()=>(Js(),kd)).then(r=>r.renderBulkBar()))})}function tl(e,t){e.addEventListener("dragstart",o=>{if(!o.dataTransfer)return;o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/memola-kb",String(t));let n=d.dbSelected.has(t)?Array.from(d.dbSelected):[t];document.querySelectorAll(".memola-kb-card[data-id], .memola-gv-card[data-id]").forEach(r=>{let a=parseInt(r.dataset.id||"0",10);n.indexOf(a)>=0&&r.classList.add("memola-kb-card-dragging")})}),e.addEventListener("dragend",()=>{document.querySelectorAll(".memola-kb-card-dragging").forEach(o=>o.classList.remove("memola-kb-card-dragging")),Zl()})}var Gi,cI=L(()=>{"use strict";q();me();le();qe();No();$i();Gi=null});var mI={};j(mI,{maybeShowSinceLastView:()=>YA});async function YA(e,t,o){let n=Jo(e),r=n.get();if(n.set(o),!r||r===o)return;let a=await Fa(e).catch(()=>"");XA(t,a)}function XA(e,t){let o=document.getElementById(dI);o&&o.remove();let n=document.getElementById("memola-overlay")||document.body,r=document.createElement("div");r.id=dI;let a=new Date(e).toLocaleString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}),i=t?"<b>"+P(t)+"</b>\u3055\u3093":"\u5225\u306E\u8AB0\u304B";r.innerHTML='<span class="memola-since-ic">\u{1F514}</span><span class="memola-since-msg">\u524D\u56DE\u306E\u8868\u793A\u4EE5\u964D\u306B '+i+" \u304C "+P(a)+' \u306B\u66F4\u65B0\u3057\u307E\u3057\u305F</span><button class="memola-since-close" title="\u9589\u3058\u308B">\xD7</button>',n.appendChild(r),requestAnimationFrame(()=>r.classList.add("on"));let s=()=>{r.parentNode&&(r.classList.remove("on"),setTimeout(()=>r.remove(),250))};r.querySelector(".memola-since-close")?.addEventListener("click",s),setTimeout(s,GA)}var dI,GA,pI=L(()=>{"use strict";be();Zt();Re();dI="memola-since-banner",GA=12e3});var vI={};j(vI,{attachDbRowDrag:()=>oB});function JA(){return cr||(cr=am({id:"memola-row-handle",title:"\u30C9\u30E9\u30C3\u30B0\u3057\u3066\u884C\u3092\u4E26\u3079\u66FF\u3048",centred:!0,onDragStart:eB,onDragEnd:ec,onMouseLeave:e=>{let t=e.relatedTarget;t&&dr&&dr.contains(t)||Ql()}}),cr)}function Ql(){cr&&cr.hide(),dr=null}function gI(e){let t=document.getElementById("memola-dtb");if(!t)return null;let o=Array.from(t.querySelectorAll("tr"));for(let n of o){let r=n.getBoundingClientRect();if(e>=r.top&&e<=r.bottom)return n}return null}function ZA(){if(Xi&&document.body.contains(Xi))return Xi;let e=document.createElement("div");return e.className="memola-row-drop-line",document.getElementById("memola-overlay")?.appendChild(e),Xi=e,e}function QA(e,t){let o=ZA(),n=e.getBoundingClientRect();o.style.top=(t?n.bottom:n.top)-1+"px",o.style.left=n.left+"px",o.style.width=n.width+"px",o.classList.add("on")}function Nh(){Xi&&Xi.classList.remove("on")}function eB(e){if(!dr){e.preventDefault();return}let t=dr.dataset.id;if(!t){e.preventDefault();return}mr=parseInt(t,10),fI=dr,fa=d.dbSelected.has(mr)?Array.from(d.dbSelected):[mr],e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/memola-row",t));let o=document.getElementById("memola-dtb");o&&o.querySelectorAll("tr").forEach(n=>{let r=parseInt(n.dataset.id||"0",10);fa.indexOf(r)>=0&&n.classList.add("memola-tr-dragging")}),document.addEventListener("dragover",hI),document.addEventListener("drop",bI)}function ec(){let e=document.getElementById("memola-dtb");e&&e.querySelectorAll(".memola-tr-dragging").forEach(t=>{t.classList.remove("memola-tr-dragging")}),mr=null,fa=[],fI=null,Nh(),document.removeEventListener("dragover",hI),document.removeEventListener("drop",bI)}function hI(e){if(mr===null)return;e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move");let t=gI(e.clientY);if(!t){Nh();return}let o=parseInt(t.dataset.id||"0",10);if(fa.indexOf(o)>=0){Nh();return}let n=t.getBoundingClientRect(),r=e.clientY>n.top+n.height/2;QA(t,r)}function bI(e){if(mr===null){ec();return}e.preventDefault();let t=gI(e.clientY);if(!t){ec();return}let o=parseInt(t.dataset.id||"0",10);if(!o||fa.indexOf(o)>=0){ec();return}let n=t.getBoundingClientRect(),r=e.clientY>n.top+n.height/2;zn(fa.length>0?fa:[mr],o,r),ec()}function tB(e,t){let o=document.getElementById("memola-dtb");if(!o)return null;let n=Array.from(o.querySelectorAll("tr"));for(let r of n)if(im(r,e,t))return r;return null}function oB(){uI||(uI=!0,document.addEventListener("mousemove",e=>{if(mr!==null)return;if(d.currentType!=="database"){Ql();return}if(!fn()){Ql();return}if(!document.getElementById("memola-dt")){Ql();return}if(cr&&cr.isCursorOnHandle(e.clientX,e.clientY))return;let o=tB(e.clientX,e.clientY);o?o!==dr&&(dr=o,JA().positionAt(o)):Ql()}))}var cr,dr,mr,fa,fI,Xi,uI,yI=L(()=>{"use strict";q();K();og();cr=null,dr=null,mr=null,fa=[],fI=null;Xi=null;uI=!1});function xI(e){if(e==null)return"";let t=String(e);return/[",\n\r]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}function nB(e){let t=[],o=[],n="",r=!1;for(let a=0;a<e.length;a++){let i=e[a];r?i==='"'?e[a+1]==='"'?(n+='"',a++):r=!1:n+=i:i==='"'?r=!0:i===","?(o.push(n),n=""):i==="\r"||(i===`
`?(o.push(n),t.push(o),o=[],n=""):n+=i)}return(n||o.length)&&(o.push(n),t.push(o)),t.filter(a=>a.some(i=>i.length>0))}function wI(){if(!d.dbList){k("DB\u304C\u9078\u629E\u3055\u308C\u3066\u3044\u307E\u305B\u3093","err");return}let e=d.dbFields.filter(s=>[2,4,6,8,9].includes(s.FieldTypeKind)),t=e.map(s=>xI(s.Title)).join(","),o=d.dbItems.map(s=>e.map(l=>xI(s[l.InternalName])).join(",")),n="\uFEFF"+[t,...o].join(`
`),r=new Blob([n],{type:"text/csv;charset=utf-8"}),a=URL.createObjectURL(r),i=document.createElement("a");i.href=a,i.download=(d.dbList||"database")+".csv",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a),k("CSV\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3057\u307E\u3057\u305F")}function kI(){if(!d.dbList){k("DB\u304C\u9078\u629E\u3055\u308C\u3066\u3044\u307E\u305B\u3093","err");return}let e=document.createElement("input");e.type="file",e.accept=".csv,text/csv",e.addEventListener("change",async()=>{let t=e.files?.[0];if(!t)return;let o=await t.text(),n=nB(o);if(n.length<1){k("\u7A7A\u306ECSV\u3067\u3059","err");return}let r=n[0].map(i=>i.replace(/^﻿/,"").trim()),a=n.slice(1);if(confirm(r.length+" \u5217 \xD7 "+a.length+" \u884C \u3092\u30A4\u30F3\u30DD\u30FC\u30C8\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F"))try{_(!0,"\u30A4\u30F3\u30DD\u30FC\u30C8\u4E2D... (\u5217\u3092\u6E96\u5099)");let i=new Set(d.dbFields.map(m=>m.Title));for(let m of r)m&&!i.has(m)&&m!=="Title"&&await zt(d.dbList,m,2);let{stripInternalDbFields:s}=await Promise.resolve().then(()=>(qe(),Ct));d.dbFields=s(await ze(d.dbList));let l={};d.dbFields.forEach(m=>{l[m.Title]=m.InternalName}),_(!0,"\u884C\u3092\u30A4\u30F3\u30DD\u30FC\u30C8\u4E2D... (0/"+a.length+")");let c=0;for(let m of a){let p={};r.forEach((u,f)=>{let g=l[u];if(!g)return;let y=m[f]||"";y&&(p[g]=y)}),Object.keys(p).length!==0&&(!p.Title&&p[l.Title]===void 0&&(p.Title="(\u7121\u984C)"),await Ne(d.dbList,p),c++,c%5===0&&_(!0,"\u884C\u3092\u30A4\u30F3\u30DD\u30FC\u30C8\u4E2D... ("+c+"/"+a.length+")"))}d.dbItems=await Ee(d.dbList),Oe(),k(c+" \u884C\u30A4\u30F3\u30DD\u30FC\u30C8\u3057\u307E\u3057\u305F")}catch(i){k("\u30A4\u30F3\u30DD\u30FC\u30C8\u5931\u6557: "+i.message,"err")}finally{_(!1)}}),e.click()}var II=L(()=>{"use strict";q();le();De();K()});function Ji(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var EI=L(()=>{"use strict"});var Hh={};j(Hh,{SHORTCUT_GROUPS:()=>LI,closeShortcutsModal:()=>iB,openShortcutsModal:()=>Oh});function rB(e){let t=/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent||"");return e.map(o=>{let n=o;return o==="Mod"&&(n=t?"\u2318":"Ctrl"),o==="Shift"&&(n=t?"\u21E7":"Shift"),o==="Alt"&&(n=t?"\u2325":"Alt"),o==="Esc"&&(n="Esc"),'<kbd class="memola-kbd">'+P(n)+"</kbd>"}).join('<span class="memola-kbd-plus">+</span>')}function aB(){return'<div class="memola-mb memola-shortcuts-mb"><h2>\u2328 \u30AD\u30FC\u30DC\u30FC\u30C9\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8</h2><div class="memola-shortcuts-grid">'+LI.map(t=>{let o=t.items.map(n=>'<li><span class="memola-shortcuts-keys">'+rB(n.keys)+'</span><span class="memola-shortcuts-desc">'+P(n.desc)+"</span></li>").join("");return'<section class="memola-shortcuts-sec"><h3>'+P(t.title)+"</h3><ul>"+o+"</ul></section>"}).join("")+'</div><div class="memola-ma"><button class="memola-btn p" data-c="close">\u9589\u3058\u308B</button></div></div>'}function Oh(){la({id:TI,className:"",contentHtml:aB(),buttons:{close:void 0},cancelValue:void 0})}function iB(){let e=document.getElementById(TI);e&&e.remove()}var TI,LI,cp=L(()=>{"use strict";Re();nr();TI="memola-shortcuts-md",LI=[{title:"\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3",items:[{keys:["Mod","K"],desc:"\u30AF\u30A4\u30C3\u30AF\u691C\u7D22 / \u30B3\u30DE\u30F3\u30C9\u30D1\u30EC\u30C3\u30C8"},{keys:["Mod","["],desc:"\u623B\u308B (\u5C65\u6B74)"},{keys:["Mod","]"],desc:"\u9032\u3080 (\u5C65\u6B74)"},{keys:["Mod","\\"],desc:"\u30B5\u30A4\u30C9\u30D0\u30FC\u958B\u9589"},{keys:["Esc"],desc:"\u691C\u7D22 / \u30E2\u30FC\u30C0\u30EB / \u30E1\u30CB\u30E5\u30FC\u3092\u9589\u3058\u308B"}]},{title:"\u4FDD\u5B58\u3068\u7DE8\u96C6",items:[{keys:["Mod","S"],desc:"\u4ECA\u3059\u3050\u4FDD\u5B58 (\u81EA\u52D5\u4FDD\u5B58\u3092\u5F85\u305F\u306A\u3044)"},{keys:["Mod","Z"],desc:"\u53D6\u308A\u6D88\u3057 (Undo)"},{keys:["Mod","Shift","Z"],desc:"\u3084\u308A\u76F4\u3057 (Redo)"},{keys:["Mod","Y"],desc:"\u3084\u308A\u76F4\u3057 (Redo / Windows \u6163\u4F8B)"}]},{title:"\u4F5C\u6210",items:[{keys:["Mod","N"],desc:"\u65B0\u3057\u3044\u30DA\u30FC\u30B8\u3092\u4F5C\u6210"},{keys:["Mod","Shift","N"],desc:"\u65B0\u3057\u3044 DB \u3092\u4F5C\u6210"}]},{title:"\u30D1\u30CD\u30EB / \u30D3\u30E5\u30FC",items:[{keys:["Mod","Shift","L"],desc:"\u76EE\u6B21\u3092\u958B\u9589"},{keys:["Mod","Shift","R"],desc:"\u30D7\u30ED\u30D1\u30C6\u30A3\u3092\u958B\u9589"},{keys:["Mod","Shift","F"],desc:"\u96C6\u4E2D\u30E2\u30FC\u30C9\u5207\u66FF"},{keys:["Mod","Shift","A"],desc:"AI \u30C1\u30E3\u30C3\u30C8\u5207\u66FF"},{keys:["Mod","J"],desc:"AI \u30C1\u30E3\u30C3\u30C8\u5207\u66FF (\u5225\u30D0\u30A4\u30F3\u30C9)"}]},{title:"\u30A8\u30C7\u30A3\u30BF\u5185",items:[{keys:["/"],desc:"\u30B9\u30E9\u30C3\u30B7\u30E5\u30E1\u30CB\u30E5\u30FC (\u30D6\u30ED\u30C3\u30AF\u633F\u5165)"},{keys:["[","["],desc:"\u30DA\u30FC\u30B8\u30EA\u30F3\u30AF\u3092\u633F\u5165 ([[ \u3092\u30BF\u30A4\u30D7)"},{keys:["#","\u30B9\u30DA\u30FC\u30B9"],desc:"\u898B\u51FA\u3057 1 (## \u2192 \u898B\u51FA\u3057 2\u3001### \u2192 \u898B\u51FA\u3057 3)"},{keys:["-","\u30B9\u30DA\u30FC\u30B9"],desc:"\u7B87\u6761\u66F8\u304D (* / + \u3067\u3082\u53EF)"},{keys:["1","."],desc:"\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8 (1. \u2192 \u958B\u59CB)"},{keys:[">","\u30B9\u30DA\u30FC\u30B9"],desc:"\u5F15\u7528\u30D6\u30ED\u30C3\u30AF"},{keys:["```"],desc:"\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF (3 \u9023\u30D0\u30C3\u30AF\u30AF\u30A9\u30FC\u30C8)"}]},{title:"DB \u30D3\u30E5\u30FC",items:[{keys:["Mod","A"],desc:"\u8868\u793A\u4E2D\u306E\u5168\u884C\u3092\u9078\u629E"},{keys:["Enter"],desc:"\u65B0\u898F\u884C\u306E\u7DE8\u96C6\u3092\u78BA\u5B9A / \u6B21\u306E\u30BB\u30EB"},{keys:["Tab"],desc:"\u6B21\u306E\u30BB\u30EB\u3078\u79FB\u52D5 (\u65B0\u898F\u884C\u5165\u529B\u4E2D)"},{keys:["Shift","Tab"],desc:"\u524D\u306E\u30BB\u30EB\u3078\u79FB\u52D5"},{keys:["Esc"],desc:"\u5165\u529B\u3092\u7834\u68C4"}]}]});var CI={};j(CI,{buildQsActionItem:()=>jh,buildQsPageItem:()=>zh,closeSearch:()=>Xo,getPagePath:()=>MI,openSearch:()=>$h,qsConfirm:()=>Kh,qsMove:()=>mp,rebuildQsDom:()=>PI,renderQs:()=>dp,resetQsSel:()=>Vh,setCommandActions:()=>qh});function qh(e){SI=e}function $h(){I("qs").classList.add("on"),I("qs-inp").value="",so=0,dp(""),I("qs-inp").focus()}function Xo(){I("qs").classList.remove("on")}function MI(e){return ar(e).map(o=>o.Title||"\u7121\u984C").join(" / ")}function dp(e){let t=d.pages.filter(o=>o.IsDraft||B(o.Id)?.isTemplate?!1:e?(o.Title||"").toLowerCase().includes(e.toLowerCase()):!0);Fh=t.filter(o=>o.Type!=="database").slice(0,15),Uh=t.filter(o=>o.Type==="database").slice(0,8),PI()}function PI(){let e=I("qs-res");e.innerHTML="",It=[];let t=I("qs-inp").value||"",o=t.trim().toLowerCase(),n=t.startsWith(">");if(!n&&Fh.length>0){let i=document.createElement("div");i.className="memola-qs-section",i.textContent=o?"\u30DA\u30FC\u30B8":"\u6700\u8FD1\u306E\u30DA\u30FC\u30B8",e.appendChild(i),Fh.forEach(s=>{It.push({kind:"page",page:s}),e.appendChild(zh(s,It.length-1))})}if(!n&&Uh.length>0){let i=document.createElement("div");i.className="memola-qs-section",i.textContent="DB",e.appendChild(i),Uh.forEach(s=>{It.push({kind:"page",page:s}),e.appendChild(zh(s,It.length-1))})}let r=n?o.slice(1).trim():o,a=SI.filter(i=>!r||i.label.toLowerCase().includes(r));if(a.length>0){let i=document.createElement("div");i.className="memola-qs-section",i.textContent="\u30A2\u30AF\u30B7\u30E7\u30F3",e.appendChild(i),a.forEach(s=>{It.push({kind:"action",action:s}),e.appendChild(jh(s,It.length-1))})}if(!n&&!o){let i=document.createElement("div");i.className="memola-qs-section",i.textContent="\u30D8\u30EB\u30D7",e.appendChild(i);let s={id:"help-shortcuts",label:"\u30AD\u30FC\u30DC\u30FC\u30C9\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8",icon:"?",key:"",run:()=>{Promise.resolve().then(()=>(cp(),Hh)).then(l=>l.openShortcutsModal())}};It.push({kind:"action",action:s}),e.appendChild(jh(s,It.length-1))}It.length===0&&(e.innerHTML='<div class="memola-qs-empty">\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F</div>'),so>=It.length&&(so=0)}function zh(e,t){let o=document.createElement("div");o.className="memola-qs-item"+(t===so?" sel":"");let n=e.Type==="database",r=MI(e.Id);return o.innerHTML='<span class="memola-qs-ic">'+(n?"\u{1F5C3}":"\u{1F4C4}")+'</span><div style="flex:1;min-width:0"><div class="memola-qs-title">'+Ji(e.Title||"\u7121\u984C")+"</div>"+(r?'<div class="memola-qs-path">'+Ji(r)+"</div>":"")+"</div>",o.addEventListener("click",()=>{Xo(),Ue(e.Id)}),o}function jh(e,t){let o=document.createElement("div");return o.className="memola-qs-item"+(t===so?" sel":""),o.innerHTML='<span class="memola-qs-ic">'+Ji(e.icon)+'</span><div style="flex:1;min-width:0"><div class="memola-qs-title">'+Ji(e.label)+"</div></div>"+(e.key?'<span class="memola-qs-kbd">'+Ji(e.key)+"</span>":""),o.addEventListener("click",()=>{Xo(),e.run()}),o}function mp(e){if(It.length===0)return;so=(so+e+It.length)%It.length;let t=I("qs-res").querySelectorAll(".memola-qs-item");t.forEach((o,n)=>{o.classList.toggle("sel",n===so)}),t[so]&&t[so].scrollIntoView({block:"nearest"})}function Kh(){let e=It[so];e&&(e.kind==="page"&&e.page?(Xo(),Ue(e.page.Id)):e.kind==="action"&&e.action&&(Xo(),e.action.run()))}function Vh(){so=0}var so,It,Fh,Uh,SI,tc=L(()=>{"use strict";q();me();_e();K();EI();we();so=0,It=[],Fh=[],Uh=[],SI=[]});var sB,AI,BI=L(()=>{"use strict";sB=[{name:"list_pages",description:`Memola \u306E\u3059\u3079\u3066\u306E\u30DA\u30FC\u30B8\u3068\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306E\u4E00\u89A7\u3092\u8FD4\u3059\u3002
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
memola-pages \u4E0A\u306E\u5BFE\u5FDC\u3059\u308B\u884C\u30DA\u30FC\u30B8\u672C\u6587\u3082\u540C\u6642\u306B\u524A\u9664\u3055\u308C\u308B\uFF08\u30AB\u30B9\u30B1\u30FC\u30C9\uFF09\u3002`,input_schema:{type:"object",properties:{db_id:{type:"string"},row_id:{type:"integer"}},required:["db_id","row_id"]}}],AI=sB.map((e,t,o)=>t===o.length-1?{...e,cache_control:{type:"ephemeral"}}:e)});function _I(e){let t=e.newTitle!=null&&e.newTitle!==(e.oldTitle||""),o=e.newBody!=null&&e.newBody!==(e.oldBody||""),n='<div class="memola-diff-card"><div class="memola-diff-head"><h2>\u30DA\u30FC\u30B8\u66F4\u65B0\u306E\u78BA\u8A8D</h2><div class="memola-diff-sub">'+P(e.pageTitle||"\u7121\u984C")+" (id="+P(e.pageId)+")</div></div>";return t&&(n+='<div class="memola-diff-title-row"><div class="memola-diff-label">\u30BF\u30A4\u30C8\u30EB</div><div class="memola-diff-title-old">'+P(e.oldTitle||"")+'</div><div class="memola-diff-arrow">\u2192</div><div class="memola-diff-title-new">'+P(e.newTitle||"")+"</div></div>"),o&&(n+='<div class="memola-diff-body"><div class="memola-diff-label">\u672C\u6587\u306E\u5DEE\u5206</div><pre class="memola-diff-pre" data-body-diff="1"></pre></div>'),!t&&!o&&(n+='<div class="memola-diff-empty">\u5909\u66F4\u304C\u3042\u308A\u307E\u305B\u3093</div>'),n+='<div class="memola-diff-actions"><button class="memola-btn s" data-c="cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" data-c="ok">\u66F4\u65B0\u3059\u308B</button></div></div>',la({id:DI,className:"memola-diff-modal",contentHtml:n,buttons:{ok:!0,cancel:!1},cancelValue:!1,focusSel:'button[data-c="ok"]',onMounted:r=>{if(o){let a=r.querySelector("pre[data-body-diff]");a&&a.appendChild(NI(e.oldBody||"",e.newBody||""))}r.addEventListener("keydown",a=>{a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),r.querySelector('button[data-c="ok"]')?.click())})}})}function RI(e){let t=e.newBody!=null&&e.newBody!==(e.oldBody||""),o=e.fieldChanges.length>0,n='<div class="memola-diff-card"><div class="memola-diff-head"><h2>\u884C\u66F4\u65B0\u306E\u78BA\u8A8D</h2><div class="memola-diff-sub">'+P(e.dbTitle)+" #"+e.rowId+(e.rowTitle?" \u2014 "+P(e.rowTitle):"")+"</div></div>";if(o){let r=e.fieldChanges.map(a=>'<tr><td class="memola-diff-fname">'+P(a.name)+'</td><td class="memola-diff-title-old">'+P(a.oldValue||"(\u7A7A)")+'</td><td class="memola-diff-arrow">\u2192</td><td class="memola-diff-title-new">'+P(a.newValue||"(\u7A7A)")+"</td></tr>").join("");n+='<div class="memola-diff-fields"><div class="memola-diff-label">\u5217\u306E\u5909\u66F4</div><table class="memola-diff-fields-tbl">'+r+"</table></div>"}return t&&(n+='<div class="memola-diff-body"><div class="memola-diff-label">\u672C\u6587\u306E\u5DEE\u5206</div><pre class="memola-diff-pre" data-body-diff="1"></pre></div>'),!o&&!t&&(n+='<div class="memola-diff-empty">\u5909\u66F4\u304C\u3042\u308A\u307E\u305B\u3093</div>'),n+='<div class="memola-diff-actions"><button class="memola-btn s" data-c="cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" data-c="ok">\u66F4\u65B0\u3059\u308B</button></div></div>',la({id:DI,className:"memola-diff-modal",contentHtml:n,buttons:{ok:!0,cancel:!1},cancelValue:!1,focusSel:'button[data-c="ok"]',onMounted:r=>{if(t){let a=r.querySelector("pre[data-body-diff]");a&&a.appendChild(NI(e.oldBody||"",e.newBody||""))}r.addEventListener("keydown",a=>{a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),r.querySelector('button[data-c="ok"]')?.click())})}})}function NI(e,t){let o=lB(e.split(`
`),t.split(`
`)),n=document.createDocumentFragment();for(let r of o){let a=document.createElement("span");a.className="memola-diff-line memola-diff-"+r.type;let i=r.type==="add"?"+ ":r.type==="del"?"- ":"  ";a.textContent=i+r.line+`
`,n.appendChild(a)}return n}function lB(e,t){let o=e.length,n=t.length,r=Array.from({length:o+1},()=>new Array(n+1).fill(0));for(let l=1;l<=o;l++)for(let c=1;c<=n;c++)r[l][c]=e[l-1]===t[c-1]?r[l-1][c-1]+1:Math.max(r[l-1][c],r[l][c-1]);let a=[],i=o,s=n;for(;i>0&&s>0;)e[i-1]===t[s-1]?(a.push({type:"eq",line:e[i-1]}),i--,s--):r[i-1][s]>=r[i][s-1]?(a.push({type:"del",line:e[i-1]}),i--):(a.push({type:"add",line:t[s-1]}),s--);for(;i>0;)a.push({type:"del",line:e[i-1]}),i--;for(;s>0;)a.push({type:"add",line:t[s-1]}),s--;return a.reverse()}var DI,Wh=L(()=>{"use strict";Re();nr();DI="memola-diff-modal"});function ga(e){let t=d.meta.pages.find(o=>o.id===e&&o.type==="database");return!t||!t.list?null:{listTitle:t.list,title:t.title}}async function Gh(e){if(d.dbList!==e)return;d.dbItems=await Ee(e),(await Promise.resolve().then(()=>(K(),ie))).renderDbTable()}function dB(e){return e.map(t=>{let o={name:t.Title,internal:t.InternalName,type:cB[t.FieldTypeKind]||"text"};return t.Choices&&(o.choices=t.Choices),o})}function OI(e,t){let o={};for(let n of t){let r=e[n.InternalName];r!==void 0&&(o[n.InternalName]=r)}return o}function mB(e,t){return e.find(o=>o.InternalName===t)||e.find(o=>o.Title===t)||null}function pB(e,t){if(t==null)return"";switch(e.FieldTypeKind){case 8:return t===!0||t===1||t==="1"||t==="true"||t==="yes"?"1":"0";case 4:{let o=String(t).trim();if(!o)return"";let n=o.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);if(n){let a=n[1],i=n[2].padStart(2,"0"),s=n[3].padStart(2,"0");return`${a}-${i}-${s}`}let r=new Date(o);if(!isNaN(r.getTime())){let a=new Date(r.getTime()+324e5);return a.getUTCFullYear()+"-"+String(a.getUTCMonth()+1).padStart(2,"0")+"-"+String(a.getUTCDate()).padStart(2,"0")}throw new Error(`\u65E5\u4ED8\u30D5\u30A3\u30FC\u30EB\u30C9 "${e.Title}" \u306E\u5024 "${o}" \u3092\u89E3\u91C8\u3067\u304D\u307E\u305B\u3093\u3002 YYYY-MM-DD \u5F62\u5F0F (\u4F8B: 2026-05-15) \u3067\u6E21\u3057\u3066\u304F\u3060\u3055\u3044\u3002`)}case 9:{let o=Number(t);return isNaN(o)?"":String(o)}default:return String(t)}}function HI(e,t){let o={},n=[];for(let r of Object.keys(t)){if(r==="Title"){o.Title=String(t[r]??"");continue}let a=mB(e,r);if(!a){n.push(r);continue}o[a.InternalName]=pB(a,t[r])}return{payload:o,unknownKeys:n}}async function FI(e){let t=ga(e.db_id);if(!t)return st("db_not_found");let o=await ze(t.listTitle);return Sn({id:e.db_id,title:t.title,fields:dB(o)})}async function UI(e){let t=ga(e.db_id);if(!t)return st("db_not_found");let o=Math.min(Math.max(e.limit||100,1),500),[n,r]=await Promise.all([ze(t.listTitle),Ee(t.listTitle)]),a=r.slice(0,o).map(i=>({id:i.Id,title:i.Title||"",fields:OI(i,n)}));return Sn({db_id:e.db_id,total:r.length,returned:a.length,rows:a})}async function zI(e){let t=ga(e.db_id);if(!t)return st("db_not_found");let[o,n]=await Promise.all([ze(t.listTitle),Ee(t.listTitle)]),r=n.find(i=>i.Id===e.row_id);if(!r)return st("row_not_found");let a=await go(t.listTitle,e.row_id);return Sn({db_id:e.db_id,row_id:e.row_id,title:r.Title||"",fields:OI(r,o),body:a})}async function jI(e){let t=(e.title||"").trim();if(!t)return st("title_required");let o=e.parent_id||"";if(o&&!d.pages.some(r=>r.Id===o))return st("parent_id_not_found");let n=await Ds(t,o);return fo({Id:n.Id,Title:n.Title,ParentId:n.ParentId,Type:"database"}),o&&d.expanded.add(o),te(),Sn({id:n.Id,title:n.Title})}async function qI(e){let t=ga(e.db_id);if(!t)return st("db_not_found");let o=uB[e.type];if(!o)return st("invalid_type: "+e.type);if(o===6&&(!e.choices||e.choices.length===0))return st("choices_required_for_choice_type");if((await ze(t.listTitle)).some(r=>r.Title===e.name||r.InternalName===e.name))return st("field_already_exists: "+e.name);if(await zt(t.listTitle,e.name,o,e.choices),d.dbList===t.listTitle){let{stripInternalDbFields:r}=await Promise.resolve().then(()=>(qe(),Ct));d.dbFields=r(await ze(t.listTitle)),Promise.resolve().then(()=>(K(),ie)).then(a=>a.renderDbTable())}return Sn({db_id:e.db_id,name:e.name,type:e.type})}async function $I(e){let t=ga(e.db_id);if(!t)return st("db_not_found");let o=await ze(t.listTitle),{payload:n,unknownKeys:r}=HI(o,e.fields||{});if(r.length>0)return st("unknown_fields: "+r.join(", "));let a=await Zs(t.listTitle,n,e.body);return await Gh(t.listTitle),Sn({db_id:e.db_id,row_id:a.Id,title:n.Title||""})}async function KI(e){let t=ga(e.db_id);if(!t)return st("db_not_found");let o=await ze(t.listTitle),r=(await Ee(t.listTitle)).find(f=>f.Id===e.row_id);if(!r)return st("row_not_found");let{payload:a,unknownKeys:i}=HI(o,e.fields||{});if(i.length>0)return st("unknown_fields: "+i.join(", "));let s=[];for(let f of Object.keys(a)){let g=String(a[f]??""),y=f==="Title"?r.Title:r[f],b=y==null?"":String(y);if(g!==b){let h=o.find(v=>v.InternalName===f);s.push({name:h?.Title||f,oldValue:b,newValue:g})}}let l;if(e.body!=null&&(l=await go(t.listTitle,e.row_id)),s.length===0&&(e.body==null||e.body===l))return Sn({no_changes:!0});if(!await RI({dbTitle:t.title,rowId:e.row_id,rowTitle:r.Title||"",fieldChanges:s,oldBody:l,newBody:e.body}))return st("user_cancelled");let m={},p={};for(let f of Object.keys(a)){let g=String(a[f]??""),y=f==="Title"?r.Title:r[f],b=y==null?"":String(y);g!==b&&(m[f]=a[f],p[f]=y??"")}if(Object.keys(m).length>0){await ft(t.listTitle,e.row_id,m);for(let f of Object.keys(m))r[f]=m[f]}let u=e.body!=null&&e.body!==l;return u&&await Ao(t.listTitle,e.row_id,e.db_id,r.Title||"",e.body),await Gh(t.listTitle),wf(t.listTitle,e.row_id,p,m,u?l:void 0,u?e.body:void 0,e.db_id),Sn({db_id:e.db_id,row_id:e.row_id,changed:s.map(f=>f.name)})}async function VI(e){let t=ga(e.db_id);return t?confirm(`${t.title} \u306E\u884C #${e.row_id} \u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F`)?(await zr(t.listTitle,e.row_id),await Gh(t.listTitle),Sn({db_id:e.db_id,row_id:e.row_id})):st("user_cancelled"):st("db_not_found")}var Sn,st,cB,uB,WI=L(()=>{"use strict";q();De();qe();V();_e();Wh();No();we();Sn=(e={})=>({ok:!0,...e}),st=e=>({ok:!1,error:e});cB={2:"text",3:"multiline",4:"date",6:"choice",8:"bool",9:"number"};uB={text:2,multiline:3,date:4,choice:6,bool:8,number:9}});function pr(e={}){return{ok:!0,...e}}function lo(e){return{ok:!1,error:e}}function gB(e){let t=!!e.include_trashed,o=d.meta.pages.filter(n=>!n.originPageId).filter(n=>t||!n.trashed).map(n=>({id:n.id,title:n.title,parent_id:n.parent||"",type:n.type||"page",...n.trashed?{trashed:!0}:{}}));return pr({pages:o})}function hB(e){let t=(e.query||"").toLowerCase();if(!t)return pr({pages:[]});let o=d.pages.filter(n=>!n.IsDraft).filter(n=>(n.Title||"").toLowerCase().includes(t)).map(n=>({id:n.Id,title:n.Title,parent_id:n.ParentId||"",type:n.Type||"page"}));return pr({pages:o})}async function bB(e){let t=String(e.id||""),o=d.pages.find(r=>r.Id===t);if(!o)return lo("page_not_found");if(o.Type==="database")return lo("cannot_read_database_body");let n=await ho(t);return pr({id:t,title:o.Title||"",body:n})}async function vB(e){let t=(e.title||"").trim();if(!t)return lo("title_required");let o=e.parent_id||"";if(o&&!d.pages.some(a=>a.Id===o))return lo("parent_id_not_found");let n=o&&B(o)?.scope||"user",r=await ln("\u7121\u984C",o,n);return fo(r),e.body!=null&&e.body!==""?await Va(r.Id,t,e.body):await Ja(r.Id,t),za(r.Id,t),o&&d.expanded.add(o),te(),pr({id:r.Id,title:t})}async function yB(e){let t=String(e.id||""),o=d.pages.find(c=>c.Id===t);if(!o)return lo("page_not_found");if(o.Type==="database")return lo("cannot_update_database_body");let n=o.Title||"",r=e.title!=null?e.title:n,a,i,s;if(e.body!=null&&(a=await ho(t),i=e.body,s=(await mt(t))?.etag||void 0),!await _I({pageId:t,pageTitle:n,oldTitle:n,newTitle:e.title!=null?r:void 0,oldBody:a,newBody:i}))return lo("user_cancelled");if(r===n&&i===a)return pr({id:t,no_changes:!0});if(e.body!=null){if(!(await Va(t,r,i||"",s)).ok)return lo("conflict_other_user_updated_page")}else r!==n&&await Ja(t,r);if(za(t,r),te(),d.currentId===t&&!d.currentRow){if(e.body!=null){let{loadBlocks:m}=await Promise.resolve().then(()=>(vt(),qo));m(Xe(i||""))}if(r!==n){let m=I("ttl");m&&(m.value=r,Qo(m))}let c=await mt(t).catch(()=>null);if(c){let{saver:m}=await Promise.resolve().then(()=>(ht(),ti));m.loadPage({pageId:t,body:i||"",title:r,etag:c.etag,modified:c.modified})}}return pr({id:t,title:r})}async function xB(e){let t=String(e.id||""),o=d.pages.find(i=>i.Id===t);if(!o)return lo("page_not_found");let n=an(d.pages,t),r=n.length-1,a=r>0?`\u300C${o.Title||"\u7121\u984C"}\u300D\u3068\u5B50\u30DA\u30FC\u30B8 ${r} \u4EF6\u3092\u30B4\u30DF\u7BB1\u306B\u79FB\u52D5\u3057\u307E\u3059\u304B\uFF1F`:`\u300C${o.Title||"\u7121\u984C"}\u300D\u3092\u30B4\u30DF\u7BB1\u306B\u79FB\u52D5\u3057\u307E\u3059\u304B\uFF1F`;return confirm(a)?(await Hs(t),Co(n),d.currentId!==null&&n.includes(d.currentId)&&(d.currentId=null),te(),pr({trashed_ids:n})):lo("user_cancelled")}async function GI(e,t){console.log("[Memola tool]",e,t);let o;try{switch(e){case"list_pages":o=gB(t);break;case"search_pages":o=hB(t);break;case"read_page":o=await bB(t);break;case"create_page":o=await vB(t);break;case"update_page":o=await yB(t);break;case"trash_page":o=await xB(t);break;case"read_db_schema":o=await FI(t);break;case"list_db_rows":o=await UI(t);break;case"read_db_row":o=await zI(t);break;case"create_db":o=await jI(t);break;case"add_db_field":o=await qI(t);break;case"create_db_row":o=await $I(t);break;case"update_db_row":o=await KI(t);break;case"delete_db_row":o=await VI(t);break;default:o=lo("unknown_tool: "+e)}}catch(n){o=lo(n.message||"unknown_error")}return JSON.stringify(o)}var YI=L(()=>{"use strict";q();V();Mt();_e();Wh();Tr();we();me();le();WI()});async function XI(e,t,o,n){let r=e.slice(),a=[],i=[],s=[];for(let c=0;c<wB;c++){if(n?.aborted)throw new Error("aborted");let{dispatchChat:m}=await Promise.resolve().then(()=>(Yd(),Gd)),p=await m({messages:r,system:t,tools:AI,signal:n,stream:o?{onText:o}:void 0}),u={role:"assistant",content:p.content};r.push(u),a.push(u);for(let b of p.content)b.type==="text"&&b.text.trim()&&s.push(b.text);if(p.stop_reason==="end_turn"||p.stop_reason==="stop_sequence"||p.stop_reason!=="tool_use")break;let f=p.content.filter(b=>b.type==="tool_use");if(f.length===0)break;let g=[];for(let b of f){let h=await GI(b.name,b.input);g.push({type:"tool_result",tool_use_id:b.id,content:h});let v=!1;try{v=!!JSON.parse(h).ok}catch{}i.push({name:b.name,ok:v})}let y={role:"user",content:g};r.push(y),a.push(y)}let l=s[s.length-1]||"";return!l&&i.length>0&&(l="("+i.length+" \u4EF6\u306E\u30C4\u30FC\u30EB\u3092\u5B9F\u884C\u3057\u307E\u3057\u305F)"),{newMessages:a,finalText:l,toolTrace:i}}var wB,JI=L(()=>{"use strict";BI();YI();wB=12});var es={};j(es,{applyAiPanelState:()=>Zh,applyModelPick:()=>BB,cancelAiMessage:()=>oE,clearAiHistory:()=>eb,closeAiPanel:()=>gp,configureApiKey:()=>NB,getQuickPrompts:()=>tb,loadAiSession:()=>Xh,newAiSession:()=>fp,openAiPanel:()=>Jh,renderAiMessages:()=>ha,renderHistoryDropdown:()=>ur,sendAiMessage:()=>nc,syncProviderBadge:()=>Qh,toggleAiPanel:()=>oc});function Qi(){let e=vc.get();if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function Yh(e){vc.set(JSON.stringify(e.slice(0,kB)))}function QI(e){for(let t of e)if(t.role==="user"&&typeof t.content=="string")return t.content;return"\u4F1A\u8A71"}function IB(){if(d.ai.messages.length===0)return;let e=Qi(),t=QI(d.ai.messages).slice(0,24)||"\u4F1A\u8A71";if(!Ot)Ot="sess-"+Date.now(),e.unshift({id:Ot,title:t,created:Date.now(),messages:[...d.ai.messages]});else{let o=e.find(n=>n.id===Ot);o?(o.messages=[...d.ai.messages],o.aiTitled||(o.title=t)):e.unshift({id:Ot,title:t,created:Date.now(),messages:[...d.ai.messages]})}Yh(e),EB()}async function EB(){if(!Ot||!Wr())return;let t=Qi().find(r=>r.id===Ot);if(!t||t.aiTitled||!t.messages.some(r=>r.role!=="assistant"?!1:typeof r.content=="string"?r.content.trim().length>0:r.content.some(a=>a.type==="text"&&a.text.trim().length>0)))return;let n=QI(t.messages).slice(0,240);if(n)try{let r=await Promise.resolve().then(()=>(_t(),Kn)),a=`\u30E6\u30FC\u30B6\u30FC\u306E\u4F1A\u8A71\u306E\u6700\u521D\u306E\u767A\u8A71\u304B\u3089\u300120\u6587\u5B57\u4EE5\u5185\u306E\u7C21\u6F54\u306A\u65E5\u672C\u8A9E\u30BF\u30A4\u30C8\u30EB\u3092 1 \u3064\u3060\u3051\u8FD4\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u8A18\u53F7\u30FB\u5F15\u7528\u7B26\u30FB\u300C\u300D\u306F\u4E0D\u8981\u3001\u30BF\u30A4\u30C8\u30EB\u672C\u4F53\u306E\u307F\u3002\u8A9E\u5C3E\u306E\u53E5\u70B9\u3082\u4E0D\u8981\u3002

\u767A\u8A71: `+n,i="",s=r.getProvider();if(s==="corp"){if(!r.getCorpAiKey())return;i=await(await Promise.resolve().then(()=>(qd(),qf))).corpAiChatText({messages:[{role:"user",content:a}],maxTokens:60}).catch(()=>"")}else if(s==="local"){if(!r.getLocalAiBaseUrl()||!r.getLocalAiModel())return;i=await(await Promise.resolve().then(()=>(Kf(),$f))).localAiChatText({messages:[{role:"user",content:a}],maxTokens:60}).catch(()=>"")}else{let{callClaudeRaw:p}=await Promise.resolve().then(()=>(vi(),Gf));i=(await p({messages:[{role:"user",content:a}],model:r.getClaudeModel(),maxTokens:60})).content.filter(f=>f.type==="text").map(f=>f.text).join("")}let l=i.trim().replace(/^["'「『]|["'」』]$/g,"").slice(0,30);if(!l)return;let c=Qi(),m=c.find(p=>p.id===Ot);if(!m)return;m.title=l,m.aiTitled=!0,Yh(c),ur()}catch{}}function Xh(e){let t=Qi().find(o=>o.id===e);t&&(Ot=e,d.ai.messages=[...t.messages],ha(),ur())}function fp(){Ot=null,d.ai.messages=[],ha(),ur()}function ur(){let e=document.getElementById("memola-ai-hist");if(!e)return;let t=Qi();e.innerHTML='<option value="__new__">+ \u65B0\u3057\u3044\u4F1A\u8A71</option>'+t.map(o=>'<option value="'+o.id+'"'+(o.id===Ot?" selected":"")+">"+TB(o.title||"\u4F1A\u8A71")+"</option>").join("")}function TB(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function SB(){let e=d.currentId||"";if(!e)return"";if(d.currentType==="database"&&!d.currentRow)return PB(e);let t=I("ttl"),o=t&&t.value||"",n=Je(xn()),r=["\u2500\u2500 \u73FE\u5728\u958B\u3044\u3066\u3044\u308B\u30DA\u30FC\u30B8 \u2500\u2500",`id: ${e}`,`title: ${o}`];n.trim()&&r.push("","body (markdown):",n),up&&r.push("",up);let a=bg();return a&&r.push("",a),r.join(`
`)}async function MB(){up="";let e;try{e=xn()}catch{return}let t=e.filter(n=>n.kind==="email");if(!t.length)return;let o=[];for(let n of t){if(!n.fileUrl)continue;let r=await u0(n.fileUrl,n.filename||""),a=r?.subject||n.subject||"(\u4EF6\u540D\u306A\u3057)",i=r?[r.fromName,r.fromEmail].filter(Boolean).join(" "):n.from,s=r?.dateISO||n.date||"",l=r?f0(r):"",c=l,m="";l.length>pp?(c=l.slice(0,pp),m=`\uFF08\u6CE8: \u3053\u306E\u30E1\u30FC\u30EB\u672C\u6587\u306F\u5148\u982D ${pp} \u5B57\u306E\u307F\u3002\u5143\u306F\u7D04 ${l.length} \u5B57\u3067\u3001\u6B8B\u308A ${l.length-pp} \u5B57\u3092\u7701\u7565\u3057\u3066\u3044\u307E\u3059\uFF09`):l||(m="\uFF08\u6CE8: \u672C\u6587\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u4EF6\u540D\u30FB\u5DEE\u51FA\u4EBA\u306E\u307F\uFF09");let p=["\u2500\u2500 \u6DFB\u4ED8\u30E1\u30FC\u30EB \u2500\u2500",`\u4EF6\u540D: ${a}`];i&&p.push(`\u5DEE\u51FA\u4EBA: ${i}`),s&&p.push(`\u65E5\u6642: ${s}`),p.push("\u672C\u6587:",c),m&&p.push(m),o.push(p.join(`
`))}up=o.join(`

`)}function PB(e){let t=B(e)?.title||"",o=d.dbFields,n=["Title",...o.map(s=>s.Title)],r=s=>String(s??"").replace(/\r?\n/g," ").replace(/\|/g,"\\|"),a=60,i=["\u2500\u2500 \u73FE\u5728\u958B\u3044\u3066\u3044\u308B\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9 (\u4E00\u89A7) \u2500\u2500",`id: ${e}`,`title: ${t}`,`\u5217: ${n.join(", ")}`,`\u884C\u6570: ${d.dbItems.length}`,"","\u884C (markdown table):","| "+n.join(" | ")+" |","| "+n.map(()=>"---").join(" | ")+" |"];for(let s of d.dbItems.slice(0,a)){let l=s,c=n.map(m=>{if(m==="Title")return r(l.Title);let p=o.find(u=>u.Title===m);return r(p?l[p.InternalName]??l[p.Title]:"")});i.push("| "+c.join(" | ")+" |")}return d.dbItems.length>a&&i.push(`\u2026 \u4ED6 ${d.dbItems.length-a} \u884C(\u8868\u793A\u4E0A\u9650\u306E\u305F\u3081\u7701\u7565)`),i.join(`
`)}function CB(){let e=[{type:"text",text:AB,cache_control:{type:"ephemeral"}}],t=[av()],o=SB();return o&&(t.push(""),t.push(o)),e.push({type:"text",text:t.join(`
`)}),e}function Jh(){d.ai.panelOpen=!0,I("ai-panel").classList.add("on"),document.getElementById("memola-ai-btn")?.classList.add("on"),fs.set("1"),Qh(),eE(),ha(),setTimeout(()=>I("ai-input").focus(),50)}function gp(){d.ai.panelOpen=!1,I("ai-panel").classList.remove("on"),document.getElementById("memola-ai-btn")?.classList.remove("on"),fs.set("0")}function Zh(){fs.get()==="1"&&Jh()}function oc(){d.ai.panelOpen?gp():Jh()}async function eE(){let e=await Promise.resolve().then(()=>(_t(),Kn)),t=e.getProvider();return t==="corp"?e.getCorpAiKey()?!0:(k("Azure OpenAI \u4E92\u63DB API \u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059\u3002\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u2699 \u8A2D\u5B9A\u300D\u304B\u3089\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044","err"),!1):t==="local"?e.getLocalAiBaseUrl()?e.getLocalAiModel()?!0:(k("\u30ED\u30FC\u30AB\u30EB AI \u306E\u30E2\u30C7\u30EB\u540D\u304C\u672A\u8A2D\u5B9A\u3067\u3059\u3002\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u2699 \u8A2D\u5B9A\u300D\u304B\u3089\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044","err"),!1):(k("\u30ED\u30FC\u30AB\u30EB AI \u306E\u30D9\u30FC\u30B9 URL \u304C\u672A\u8A2D\u5B9A\u3067\u3059\u3002\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u2699 \u8A2D\u5B9A\u300D\u304B\u3089\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044","err"),!1):Wr()?!0:(k("Claude API \u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059\u3002\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u2699 \u8A2D\u5B9A\u300D\u304B\u3089\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044","err"),!1)}function Qh(){let e=document.getElementById("memola-ai-model-pick");e&&Promise.resolve().then(()=>(_t(),Kn)).then(t=>{let o=t.getProvider(),n=t.getClaudeModel(),r=t.getCorpAiModel(),a=t.getLocalAiModel(),i=o+":"+(o==="corp"?r:o==="local"?a:n);e.innerHTML="";let s=document.createElement("optgroup");s.label="Claude";for(let m of t.CLAUDE_MODELS){let p=document.createElement("option");p.value="claude:"+m.id,p.textContent=m.label,s.appendChild(p)}e.appendChild(s);let l=document.createElement("optgroup");l.label="Azure OpenAI \u4E92\u63DB";for(let m of t.CORP_AI_MODELS){let p=document.createElement("option");p.value="corp:"+m.id,p.textContent=m.id,l.appendChild(p)}e.appendChild(l);let c=t.getLocalAiModels();if(c.length>0||a){let m=document.createElement("optgroup");m.label="\u30ED\u30FC\u30AB\u30EB AI";let p=new Set;for(let u of[a,...c]){if(!u||p.has(u))continue;p.add(u);let f=document.createElement("option");f.value="local:"+u,f.textContent=u,m.appendChild(f)}e.appendChild(m)}e.value=i})}async function BB(e){let t=e.indexOf(":");if(t<0)return;let o=e.substring(0,t),n=e.substring(t+1);if(o!=="claude"&&o!=="corp"&&o!=="local")return;let r=await Promise.resolve().then(()=>(_t(),Kn));r.setProvider(o),o==="claude"?r.setClaudeModel(n):o==="corp"?r.setCorpAiModel(n):o==="local"&&r.setLocalAiModel(n),Qh()}function DB(e){return P(e).replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>")}function tE(e){return e.split(/\r?\n/).map(DB).join("<br>")}function _B(e){if(typeof e.content=="string")return e.role==="user"?{text:e.content,toolNames:[]}:{text:e.content,toolNames:[]};let t=e.content;if(t.every(a=>a.type==="tool_result"))return null;let n=t.filter(a=>a.type==="text").map(a=>a.text).join(`
`),r=t.filter(a=>a.type==="tool_use").map(a=>a.name);return{text:n,toolNames:r}}function ha(){let e=I("ai-messages");if(e.innerHTML="",d.ai.messages.length===0){let t=document.createElement("div");t.className="memola-ai-empty",t.innerHTML='<div class="memola-ai-empty-title">\u3053\u306E\u30DA\u30FC\u30B8\u306B\u3064\u3044\u3066\u8CEA\u554F\u3067\u304D\u307E\u3059</div><div class="memola-ai-empty-sub">\u4E0B\u306E\u30C1\u30C3\u30D7\u304B\u3089\u59CB\u3081\u308B\u304B\u3001\u81EA\u7531\u306B\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044</div>',e.appendChild(t)}for(let t of d.ai.messages){let o=_B(t);if(!o||!o.text&&o.toolNames.length===0)continue;let n=document.createElement("div");n.className="memola-ai-row";let r=document.createElement("div");r.className="memola-ai-label",r.textContent=t.role==="user"?"\u3042\u306A\u305F":"AI";let a=document.createElement("div");a.className="memola-ai-msg memola-ai-"+t.role;let i=o.text?tE(o.text):"";if(o.toolNames.length>0){let s='<div class="memola-ai-trace">\u2014 \u5B9F\u884C: '+o.toolNames.map(l=>"\u{1F527} "+P(l)).join(" / ")+"</div>";i+=s}a.innerHTML=i,n.append(r,a),e.appendChild(n)}if(d.ai.loading){let t=document.createElement("div");t.className="memola-ai-row";let o=document.createElement("div");o.className="memola-ai-label",o.textContent="AI";let n=document.createElement("div");n.className="memola-ai-msg memola-ai-assistant memola-ai-loading",n.textContent="\u8003\u3048\u4E2D\u2026",t.append(o,n),e.appendChild(t)}e.scrollTop=e.scrollHeight}function oE(){Zi&&(Zi.abort(),Zi=null)}async function nc(e){if(Zi){oE();return}let t=e.trim();if(!t||!await eE())return;d.ai.messages.push({role:"user",content:t}),d.ai.loading=!0,ha(),ZI();let o=I("ai-input");o.value="",o.style.height="";let n="";function r(i){n+=i,RB(n)}let a=new AbortController;Zi=a;try{await MB();let i=await XI(d.ai.messages,CB(),r,a.signal);d.ai.messages.push(...i.newMessages)}catch(i){let s=i;s.name==="AbortError"||s.message==="aborted"?d.ai.messages.push({role:"assistant",content:"\uFF08\u4E2D\u65AD\u3057\u307E\u3057\u305F\uFF09"}):(k("AI\u5931\u6557: "+s.message,"err"),d.ai.messages.push({role:"assistant",content:"\u26A0\uFE0F "+s.message}))}finally{Zi=null,d.ai.loading=!1,ha(),ZI(),IB(),ur()}}function RB(e){let t=I("ai-messages"),o=document.getElementById("memola-ai-streaming");if(!o){let n=document.createElement("div");n.className="memola-ai-row",n.id="memola-ai-streaming-row";let r=document.createElement("div");r.className="memola-ai-label",r.textContent="AI",o=document.createElement("div"),o.className="memola-ai-msg memola-ai-assistant",o.id="memola-ai-streaming",n.append(r,o),t.querySelectorAll(".memola-ai-loading").forEach(a=>a.parentElement?.remove()),t.appendChild(n)}o.innerHTML=tE(e),t.scrollTop=t.scrollHeight}function ZI(){let e=document.getElementById("memola-ai-send");if(!e)return;let t=d.ai.loading;e.classList.toggle("stop",t),e.title=t?"\u4E2D\u65AD":"\u9001\u4FE1 (\u2318\u21B5)",Promise.resolve().then(()=>(xr(),ev)).then(({ICONS:o})=>{e.innerHTML=t?o.stop:o.send})}function eb(){if(d.ai.messages.length!==0&&confirm("\u73FE\u5728\u306E\u4F1A\u8A71\u3092\u30AF\u30EA\u30A2\u3057\u307E\u3059\u304B\uFF1F(\u5C65\u6B74\u304B\u3089\u3082\u524A\u9664\u3055\u308C\u307E\u3059)")){if(Ot){let e=Qi().filter(t=>t.id!==Ot);Yh(e)}Ot=null,d.ai.messages=[],ha(),ur()}}function NB(){k("API \u30AD\u30FC\u306F\u300C\u2699 \u8A2D\u5B9A\u300D (\u30B5\u30A4\u30C9\u30D0\u30FC) \u304B\u3089\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044")}function tb(){return LB}var kB,Ot,LB,pp,up,AB,Zi,fr=L(()=>{"use strict";q();me();le();vi();JI();Mt();Yg();vt();Re();Lo();we();jo();be();kB=20;Ot=null;LB=[{label:"\u8981\u7D04",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u5185\u5BB9\u30923\u884C\u3067\u8981\u7D04\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{label:"\u6539\u7A3F",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u672C\u6587\u3092\u3088\u308A\u8AAD\u307F\u3084\u3059\u304F\u3001\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u306B\u66F8\u304D\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{label:"\u7FFB\u8A33",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u672C\u6587\u3092\u82F1\u8A9E\u306B\u7FFB\u8A33\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{label:"\u30A2\u30AF\u30B7\u30E7\u30F3\u62BD\u51FA",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u5185\u5BB9\u304B\u3089\u3001ToDo\u30FB\u30A2\u30AF\u30B7\u30E7\u30F3\u30A2\u30A4\u30C6\u30E0\u3092\u7B87\u6761\u66F8\u304D\u3067\u62BD\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002"}];pp=5e3,up="";AB=`\u3042\u306A\u305F\u306F Memola (Notion\u98A8 SharePoint\u9023\u643A\u30CE\u30FC\u30C8\u30A2\u30D7\u30EA) \u306E AI \u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u3067\u3059\u3002
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
- \u524A\u9664\u3084\u66F4\u65B0\u306E\u524D\u306B user \u306B\u610F\u56F3\u3092\u78BA\u8A8D\u3059\u308B\u3053\u3068\uFF08\u30DB\u30B9\u30C8\u5074\u3067\u3082\u78BA\u8A8D\u30E2\u30FC\u30C0\u30EB\u304C\u51FA\u308B\uFF09`;Zi=null});function hp(e){let t=e;if(!t)return!1;let o=t.tagName;return!!(o==="INPUT"||o==="TEXTAREA"||o==="SELECT"||t.isContentEditable)}function OB(){Promise.resolve().then(()=>(tc(),CI)).then(e=>e.openSearch())}function nE(){Promise.resolve().then(()=>(fr(),es)).then(e=>e.toggleAiPanel())}function bp(e){let t=e.ctrlKey||e.metaKey,o=t&&!e.shiftKey&&(e.key==="z"||e.key==="Z"),n=t&&(e.shiftKey&&(e.key==="z"||e.key==="Z")||!e.shiftKey&&(e.key==="y"||e.key==="Y"));if(o||n){if(d.currentType==="database"&&d.dbList&&!hp(e.target)){e.preventDefault();let r=n;Promise.resolve().then(()=>(No(),Td)).then(async a=>{try{(r?await a.redoDb(d.dbList):await a.undoDb(d.dbList))||k(r?"\u518D\u5B9F\u884C\u3067\u304D\u308B\u64CD\u4F5C\u304C\u3042\u308A\u307E\u305B\u3093":"\u53D6\u308A\u6D88\u3059\u64CD\u4F5C\u304C\u3042\u308A\u307E\u305B\u3093")}catch(i){k((r?"\u518D\u5B9F\u884C":"\u53D6\u308A\u6D88\u3057")+"\u5931\u6557: "+i.message,"err")}});return}if(n&&!e.shiftKey&&(e.key==="y"||e.key==="Y")&&hp(e.target)){e.preventDefault();try{document.execCommand("redo")}catch{}return}}if(t&&(e.key==="a"||e.key==="A")&&!e.shiftKey&&d.currentType==="database"&&d.dbList&&!hp(e.target)){e.preventDefault(),Promise.resolve().then(()=>(K(),ie)).then(r=>{r.getSortedFilteredItems().forEach(i=>d.dbSelected.add(i.Id)),r.renderDbTable()});return}if(t&&e.key==="s"){e.preventDefault(),xt();return}if(t&&e.key==="k"){e.preventDefault(),OB();return}if(t&&e.key==="j"){e.preventDefault(),nE();return}if(e.key==="?"&&!t&&!hp(e.target)){e.preventDefault(),Promise.resolve().then(()=>(cp(),Hh)).then(r=>r.openShortcutsModal());return}if(t&&(e.key==="\\"||e.code==="Backslash")){e.preventDefault(),document.getElementById("memola-sb-toggle")?.click();return}if(t&&(e.key==="["||e.code==="BracketLeft")){e.preventDefault(),Promise.resolve().then(()=>(Xn(),Ii)).then(r=>r.goBack());return}if(t&&(e.key==="]"||e.code==="BracketRight")){e.preventDefault(),Promise.resolve().then(()=>(Xn(),Ii)).then(r=>r.goForward());return}if(t&&e.shiftKey){let r=e.key.toLowerCase();if(r==="l"){e.preventDefault(),Promise.resolve().then(()=>(Hi(),uh)).then(a=>a.toggleOutline());return}if(r==="r"){e.preventDefault(),Promise.resolve().then(()=>(Fi(),fh)).then(a=>a.togglePropertiesPanel());return}if(r==="f"){e.preventDefault(),document.getElementById("memola-overlay")?.classList.toggle("focus-mode");return}if(r==="a"){e.preventDefault(),nE();return}if(r==="n"){e.preventDefault();return}}if(t&&e.key.toLowerCase()==="n"&&!e.shiftKey){e.preventDefault(),Eo("");return}if(e.key==="Escape"){if(e.repeat||HB())return;vp()}}function HB(){let e=document.querySelector(".memola-cmt-float, .memola-blk-menu, #memola-dbcolor-pop, #memola-ws-menu, #memola-shortcuts-md");if(e)return e.remove(),!0;if(I("qs").classList.contains("on"))return Xo(),!0;let t=document.getElementById("memola-emoji");if(t?.classList.contains("on"))return t.classList.remove("on"),!0;for(let o of["memola-trash-md","memola-settings-md","memola-col-md","memola-inbox-md","memola-create-menu","memola-pgm"]){let n=document.getElementById(o);if(n?.classList.contains("on"))return n.classList.remove("on"),!0}for(let o of["memola-drafts-md","memola-versions-md"]){let n=document.getElementById(o);if(n&&n.style.display==="flex")return n.style.display="none",!0}return I("ai-panel").classList.contains("on")?(Promise.resolve().then(()=>(fr(),es)).then(o=>o.closeAiPanel()),!0):Qg()?(eh(),!0):!1}var ob=L(()=>{"use strict";q();me();le();vt();tc();bt();Mn()});var aE={};j(aE,{confirmClose:()=>zB});async function zB(e){if(Date.now()-rE<UB)return!1;let t='<div class="memola-close-confirm-box"><div class="memola-close-confirm-msg">'+P(e).replace(/\n/g,"<br>")+'</div><div class="memola-close-confirm-btns"><button class="memola-btn s" data-c="cancel" autofocus>\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" data-c="ok">\u9589\u3058\u308B</button></div></div>',o=await la({id:FB,className:"memola-close-confirm-md",contentHtml:t,buttons:{ok:!0,cancel:!1},cancelValue:!1,focusSel:'button[data-c="cancel"]',onMounted:n=>{n.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),r.stopPropagation(),n.querySelector('button[data-c="ok"]')?.click())})}});return o||(rE=Date.now()),o}var FB,rE,UB,iE=L(()=>{"use strict";Re();nr();FB="memola-close-confirm",rE=0,UB=800});async function Eo(e){try{_(!0,"\u30DA\u30FC\u30B8\u3092\u4F5C\u6210\u4E2D...");let t=e&&B(e)?.scope||"user",o=await ln("\u7121\u984C",e||"",t);fo(o),e&&d.expanded.add(e),te(),await Ue(o.Id),I("ttl").select()}catch(t){k("\u30DA\u30FC\u30B8\u4F5C\u6210\u306B\u5931\u6557: "+t.message,"err")}finally{_(!1)}}async function yp(e){let t=d.pages.find(i=>i.Id===e),o=t&&t.Title||"\u7121\u984C",n=d.pages.some(i=>i.ParentId===e),r=B(e);if(r?.type==="database"&&r.list==="memola-daily"){k("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u524A\u9664\u3067\u304D\u307E\u305B\u3093 (\u500B\u4EBA\u904B\u7528\u306B\u5FC5\u9808)","err");return}if(confirm(n?"\u300C"+o+"\u300D\u3068\u5B50\u30DA\u30FC\u30B8\u3092\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5\u3057\u307E\u3059\u304B\uFF1F":"\u300C"+o+"\u300D\u3092\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5\u3057\u307E\u3059\u304B\uFF1F"))try{_(!0,"\u79FB\u52D5\u4E2D..."),await Hs(e);let i=jB(e);Co(i),d.currentId!==null&&i.includes(d.currentId)&&(vm(),re.unload(),d.currentId=null,tt("empty")),te(),k("\u30B4\u30DF\u7BB1\u306B\u79FB\u52D5\u3057\u307E\u3057\u305F")}catch(i){k("\u524A\u9664\u306B\u5931\u6557: "+i.message,"err")}finally{_(!1)}}function xp(){let e=I("dtb");if(e.querySelector(".memola-dr-new"))return;let t=Vi(),o=document.createElement("tr");o.className="memola-dr-new";let n=!1,r=document.createElement("td");r.className="memola-td-cb",o.appendChild(r),t.forEach(l=>{let c=document.createElement("td"),m=document.createElement("span");m.className="memola-dc",m.contentEditable="true",m.dataset.field=l.InternalName,m.addEventListener("keydown",p=>{let u=p;if(u.key==="Enter"&&!u.shiftKey&&(p.preventDefault(),s()),u.key==="Escape"&&o.remove(),u.key==="Tab"){p.preventDefault();let f=Array.from(o.querySelectorAll(".memola-dc")),g=u.shiftKey?f[f.indexOf(m)-1]:f[f.indexOf(m)+1];g?g.focus():s()}}),c.appendChild(m),o.appendChild(c)});let a=document.createElement("td");a.className="memola-td-del",o.appendChild(a),e.appendChild(o);let i=o.querySelector(".memola-dc");i&&i.focus();async function s(){if(n)return;let l={};if(o.querySelectorAll(".memola-dc").forEach(c=>{let m=(c.textContent||"").trim();m&&(l[c.dataset.field]=m)}),!l.Title){o.remove();return}n=!0;try{_(!0,"\u8FFD\u52A0\u4E2D...");let{addRowWithUndo:c}=await Promise.resolve().then(()=>(No(),Td)),m=await c(d.dbList,l);d.dbItems.push(m),o.remove(),I("dtb").appendChild(Wi(m,t)),k("\u884C\u3092\u8FFD\u52A0\u3057\u307E\u3057\u305F\uFF08\u2318Z \u3067\u53D6\u6D88\u53EF\u80FD\uFF09")}catch(c){k("\u8FFD\u52A0\u5931\u6557: "+c.message,"err"),o.remove(),n=!1}finally{_(!1)}}o.addEventListener("focusout",()=>{setTimeout(()=>{o.contains(document.activeElement)||s()},100)})}async function nb(e){if(e.flushSave)try{await xt()}catch{}if(vm(),Promise.resolve().then(()=>(Xr(),Gm)).then(t=>{t.stopWatching(),t.detachCrossTabSync()}).catch(()=>{}),Promise.resolve().then(()=>(Vl(),kh)).then(t=>t.shutdownPresence()).catch(()=>{}),document.removeEventListener("keydown",bp),Promise.resolve().then(()=>(rb(),sE)).then(t=>t.detachViewportAutoCollapse?.()).catch(()=>{}),e.removeOverlay){let t=document.getElementById("memola-overlay");t&&t.remove();let o=document.getElementById("memola-style");o&&o.remove()}}async function vp(){let e=re.isDirty()?`\u4FDD\u5B58\u3057\u3066\u3044\u306A\u3044\u5909\u66F4\u304C\u3042\u308A\u307E\u3059\u3002\u30A2\u30D7\u30EA\u3092\u9589\u3058\u307E\u3059\u304B\uFF1F
(OK \u3067\u4FDD\u5B58\u3057\u3066\u304B\u3089\u9589\u3058\u307E\u3059)`:"\u30A2\u30D7\u30EA\u3092\u9589\u3058\u307E\u3059\u304B\uFF1F",{confirmClose:t}=await Promise.resolve().then(()=>(iE(),aE));await t(e)&&nb({flushSave:!0,removeOverlay:!0})}var jB,Mn=L(()=>{"use strict";q();me();le();_e();K();V();Tr();K();ht();bt();ob();we();jB=e=>an(d.pages,e)});function cE(e){I("dt-wrap").style.display=e==="table"?"":"none",I("dadd").style.display=e==="table"?"":"none",I("kb").classList.toggle("on",e==="board"),["list","gallery","calendar","gantt"].forEach(t=>{I(t+"-view").classList.toggle("on",e===t)}),e==="table"?Oe():e==="board"?Yi():Promise.resolve().then(()=>(Ed(),Id)).then(t=>t.renderActiveView(e))}function dE(){lE||(lE=!0,I("db-csv-export").addEventListener("click",wI),I("db-csv-import").addEventListener("click",kI),document.getElementById("memola-db-new-row")?.addEventListener("click",xp),Promise.resolve().then(()=>(lp(),sp)).then(e=>e.attachFilterPopoverOutsideClick()))}var lE,ab=L(()=>{"use strict";me();K();II();Mn();$i();lE=!1});var uE={};j(uE,{applyActiveView:()=>sb,renderViewBar:()=>os,switchView:()=>Ip});function kp(){ts&&(ts.remove(),ts=null)}function sb(){let e=Gl(d.dbList,d.dbViewId);d.dbFilters=e.filters.map(t=>({...t})),d.dbSort={field:e.sort.field,asc:e.sort.asc},Promise.resolve().then(()=>(lp(),sp)).then(t=>t.renderFilterChips()),cE(e.type)}function Ip(e){d.dbViewId=e,Sh(d.dbList,e),os(),sb()}function os(){let e=document.getElementById("memola-db-views");if(!e)return;kp(),d.dbViewId||(d.dbViewId=ap(d.dbList)),e.innerHTML="";for(let o of Lh(d.dbList)){let n=o.id===d.dbViewId,r=document.createElement("button");r.className="memola-db-vbtn"+(n?" on":""),r.innerHTML=ib[o.type]+'<span class="memola-vname"></span>',r.querySelector(".memola-vname").textContent=o.name,r.addEventListener("click",a=>{n?$B(o.id,r,a):Ip(o.id)}),e.appendChild(r)}let t=document.createElement("button");t.className="memola-db-vadd",t.title="\u30D3\u30E5\u30FC\u3092\u8FFD\u52A0",t.innerHTML=$.plus,t.addEventListener("click",()=>qB(t)),e.appendChild(t)}function pE(e){kp();let t=e.getBoundingClientRect(),o=document.createElement("div");o.className="memola-colmenu",o.style.left=Math.round(t.left)+"px",o.style.top=Math.round(t.bottom+4)+"px",(document.getElementById("memola-overlay")||document.body).appendChild(o);let n=r=>{ts&&!ts.contains(r.target)&&!e.contains(r.target)&&(kp(),document.removeEventListener("mousedown",n,!0))};return setTimeout(()=>document.addEventListener("mousedown",n,!0),0),ts=o,o}function wp(e,t,o,n=!1){let r=document.createElement("div");return r.className="memola-colmenu-item"+(n?" danger":""),r.style.cssText="display:flex;align-items:center;gap:8px",r.innerHTML=(t?'<span class="memola-mi-ic">'+t+"</span>":"")+"<span></span>",r.querySelector("span:last-child").textContent=e,r.addEventListener("click",()=>{kp(),o()}),r}function qB(e){let t=pE(e),o=document.createElement("div");o.className="memola-colmenu-item",o.style.cssText="font-weight:600;color:var(--ink-3);cursor:default",o.textContent="\u30D3\u30E5\u30FC\u3092\u8FFD\u52A0",t.appendChild(o),t.appendChild(Object.assign(document.createElement("div"),{className:"memola-colmenu-sep"}));for(let n of mE)t.appendChild(wp(Wl[n],ib[n],()=>{let r=Mh(d.dbList,n);Ip(r.id)}))}function $B(e,t,o){let n=pE(t),r=ji(e);if(n.appendChild(wp("\u540D\u524D\u3092\u5909\u66F4",$.gear,()=>KB(e,t))),r){let a=document.createElement("div");a.className="memola-colmenu-item",a.style.cssText="color:var(--ink-4);cursor:default;font-size:var(--fs-xs)",a.textContent="\u65E2\u5B9A\u30D3\u30E5\u30FC(\u30C6\u30FC\u30D6\u30EB\u30FB\u524A\u9664\u4E0D\u53EF)",n.appendChild(a)}else{let a=document.createElement("div");a.className="memola-colmenu-item",a.style.cssText="font-weight:600;color:var(--ink-3);cursor:default;font-size:var(--fs-xs)",a.textContent="\u30BF\u30A4\u30D7\u3092\u5909\u66F4",n.appendChild(Object.assign(document.createElement("div"),{className:"memola-colmenu-sep"})),n.appendChild(a);let i=Gl(d.dbList,e).type;for(let s of mE)n.appendChild(wp((s===i?"\u25CF ":"\u25CB ")+Wl[s],ib[s],()=>{Ch(d.dbList,e,s),os(),e===d.dbViewId&&sb()}));n.appendChild(Object.assign(document.createElement("div"),{className:"memola-colmenu-sep"})),n.appendChild(wp("\u3053\u306E\u30D3\u30E5\u30FC\u3092\u524A\u9664",$.trash,()=>{if(!confirm("\u3053\u306E\u30D3\u30E5\u30FC\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F"))return;let s=e===d.dbViewId;Ah(d.dbList,e),s?Ip(ap(d.dbList)):os()},!0))}}function KB(e,t){let o=Gl(d.dbList,e).name;t.innerHTML="";let n=document.createElement("input");n.className="memola-vname-edit",n.value=o,t.appendChild(n),n.focus(),n.select();let r=()=>{Ph(d.dbList,e,n.value),os()};n.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n.blur()),a.key==="Escape"&&(a.preventDefault(),os())}),n.addEventListener("blur",r)}var ib,mE,ts,fE=L(()=>{"use strict";q();xr();Yl();ab();ib={table:$.table,board:$.board,list:$.ul,gallery:$.codeBlock,calendar:$.info,gantt:$.sort},mE=["table","board","list","gallery","calendar","gantt"],ts=null});var ie={};j(ie,{attachCardDragHandlers:()=>tl,attachCardSelectionHandlers:()=>jn,doSelect:()=>Ue,doSelectDb:()=>hE,getDbFields:()=>Vi,getSortedFilteredItems:()=>$t,hideCardDropLine:()=>Zl,isManualRowOrderActive:()=>fn,loadLastOpenedPage:()=>WB,mkDbRow:()=>Wi,mkOpenRowBtn:()=>yo,renderBcCustom:()=>Tl,renderDbTable:()=>Oe,renderKanban:()=>Yi,renderPageIcon:()=>rc,reorderRows:()=>zn,setSelectionAnchor:()=>Jl,showCardDropLine:()=>Rh,showView:()=>tt});function tt(e){if(I("ea").style.display=e==="page"||e==="empty"?"flex":"none",I("em").style.display=e==="empty"?"flex":"none",I("ct").style.display=e==="page"?"block":"none",I("tb").style.display=e==="page"?"flex":"none",I("dv").style.display=e==="db"?"flex":"none",I("lib").style.display=e==="library"?"block":"none",e!=="library"){let t=document.getElementById("memola-lib-bulkbar");t&&t.classList.remove("on")}En(),(e==="empty"||e==="library")&&So(null)}function Tl(e){let t=I("bc");t.innerHTML="",e.forEach((o,n)=>{let r=document.createElement("span");if(r.className="memola-bi",r.textContent=o.label,o.onClick?r.addEventListener("click",o.onClick):r.style.cursor="default",t.appendChild(r),n<e.length-1){let a=document.createElement("span");a.textContent="/",a.style.color="#e9e9e7",a.style.margin="0 4px",t.appendChild(a)}})}function rc(e){let t=B(e),o=t&&t.icon||"",n=I("pg-icon"),r=I("add-icon"),a=document.getElementById("memola-pg-hd");o?(n.textContent=o,n.style.display="inline-block",r.style.display="none",a?.classList.remove("no-icon")):(n.style.display="none",r.style.display="",a?.classList.add("no-icon"))}async function Ue(e){if(d.currentType==="page"&&!d.currentRow)try{let{pruneEmptyTodosEditor2:n}=await Promise.resolve().then(()=>(vt(),qo));if(n()>0){let{schedSave:a}=await Promise.resolve().then(()=>(bt(),ta));a()}}catch{}d.currentType!=="database"&&await xt(),Promise.resolve().then(()=>(ki(),kl)).then(n=>n.hideSearchTab()),d.currentRow=null,d.currentId=e;let t=e,o=d.pages.find(n=>n.Id===e);if(o){if(Promise.resolve().then(()=>(jo(),yn)).then(n=>n.clearComments()),Promise.resolve().then(()=>(ih(),ah)).then(n=>n.clearMergeHighlight()),ig(e),ar(e).forEach(n=>{d.expanded.add(n.Id)}),te(),lb(e),o.Type==="database")await hE(e,o),Promise.resolve().then(()=>(pm(),mm)).then(n=>n.renderBacklinks());else{d.currentType="page",Promise.resolve().then(()=>(Js(),kd)).then(a=>a.hideBulkBar()),tt("page");let n=I("ttl");n.value=o.Title||"",Qo(n),rc(e);let r=document.getElementById("memola-row-props");r&&(r.innerHTML=""),So(null),_(!0,"\u30DA\u30FC\u30B8\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D...");try{let a=await Bu(e);if(d.currentId!==t)return;let{mountEditor2:i,loadBlocksFromJson:s}=await Promise.resolve().then(()=>(vt(),qo));if(d.currentId!==t)return;if(i(Ce()),s(a?.body||""),Promise.resolve().then(()=>(km(),Tk)).then(l=>l.markBrokenPageLinks(Ce())),a){lh(e,a.modified,a.etag);let c=(I("ttl")?.value||o.Title||"\u7121\u984C").trim()||"\u7121\u984C";re.loadPage({pageId:e,body:a.body,title:c,etag:a.etag,modified:a.modified}),So(a.modified),Promise.resolve().then(()=>(pI(),mI)).then(m=>m.maybeShowSinceLastView(e,a.modified,a.etag))}else Jn(),re.unload(),So(null);ca(),da()}catch(a){Ce().innerHTML="",k("\u8AAD\u307F\u8FBC\u307F\u5931\u6557: "+a.message,"err"),Jn(),re.unload(),So(null)}finally{_(!1)}En(),Jr(),GB(),gE("page"),np(),Promise.resolve().then(()=>(pm(),mm)).then(a=>a.renderBacklinks()),Promise.resolve().then(()=>(jo(),yn)).then(a=>{let i=a.currentCommentTarget();i&&d.currentId===t&&a.loadCommentsFor(i.pageId,i.scope)})}VB(e),Promise.resolve().then(()=>(Kt(),oo)).then(n=>n.openInActiveTab(e,o.Title||"\u7121\u984C"))}}function VB(e){let t=ds.get();t[W]=e,ds.set(t)}function WB(){return ds.get()[W]||null}function gE(e){let t=document.getElementById("memola-template-banner"),o=document.getElementById("memola-template-banner-db");t&&(t.style.display="none",t.innerHTML=""),o&&(o.style.display="none",o.innerHTML="");let n=d.currentId?B(d.currentId):null;if(!n?.isTemplate)return;let r=e==="db"?o:t;if(!r)return;let a=n.type==="database"?"DB":"\u30DA\u30FC\u30B8";r.style.display="",r.innerHTML='<span class="memola-template-banner-icon">\u{1F9E9}</span><span class="memola-template-banner-msg">\u3053\u308C\u306F<b>\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8</b>\u306E\u7DE8\u96C6\u753B\u9762\u3067\u3059\u3002\u3053\u3053\u3067\u306E\u5909\u66F4\u306F\u3001\u4ECA\u5F8C\u3053\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u4F5C\u6210\u3059\u308B'+a+"\u306B\u53CD\u6620\u3055\u308C\u307E\u3059\u3002</span>"}function GB(){let e=document.getElementById("memola-draft-banner");if(!e)return;let t=d.currentId?B(d.currentId):null;if(!t?.originPageId){e.style.display="none",e.innerHTML="";return}let o=B(t.originPageId),n=o?.title||"(\u539F\u672C\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093)",r=!!o&&!o.trashed;e.style.display="",e.innerHTML='<span class="memola-draft-banner-icon">\u270F\uFE0F</span><span class="memola-draft-banner-msg">\u539F\u672C: <a class="memola-draft-banner-link" data-origin-id="'+(t.originPageId||"")+'">'+P(n)+"</a> \u306E<b>\u4E0B\u66F8\u304D</b>\u3067\u3059</span>"+(r?'<button class="memola-draft-banner-apply" type="button">\u539F\u672C\u306B\u9069\u7528</button>':'<span class="memola-draft-banner-broken">\u539F\u672C\u304C\u524A\u9664\u3055\u308C\u3066\u3044\u307E\u3059</span><button class="memola-draft-banner-promote" type="button">\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58</button>'),e.querySelector(".memola-draft-banner-link")?.addEventListener("click",a=>{a.preventDefault();let i=a.target.dataset.originId;i&&Ue(i)}),e.querySelector(".memola-draft-banner-apply")?.addEventListener("click",async()=>{if(await(await Promise.resolve().then(()=>(bt(),ta))).flushPendingSave(),!!confirm("\u4E0B\u66F8\u304D\u306E\u5185\u5BB9\u3092\u539F\u672C\u300C"+n+`\u300D\u306B\u9069\u7528\u3057\u307E\u3059\u3002

\u30FB\u539F\u672C\u304C\u4E0B\u66F8\u304D\u4F5C\u6210\u5F8C\u306B\u5909\u66F4\u3055\u308C\u3066\u3044\u308C\u3070\u81EA\u52D5\u30673-way\u30DE\u30FC\u30B8\u3057\u307E\u3059
\u30FB\u539F\u672C\u306E\u73FE\u5728\u306E\u672C\u6587\u306F SP \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74\u306B\u6B8B\u308A\u307E\u3059
\u30FB\u3053\u306E\u4E0B\u66F8\u304D\u30DA\u30FC\u30B8\u306F\u524A\u9664\u3055\u308C\u307E\u3059
\u30FB\u539F\u672C\u3078\u306E\u30EA\u30F3\u30AF ([[`+t.originPageId+`]]) \u306F\u58CA\u308C\u307E\u305B\u3093

\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F`))try{_(!0,"\u539F\u672C\u306B\u9069\u7528\u4E2D\u2026");let i=d.currentId;if(!i)return;let{applyDraftToOriginInteractive:s}=await Promise.resolve().then(()=>(Go(),rr));await s(i)}catch(i){k("\u9069\u7528\u5931\u6557: "+i.message,"err")}finally{_(!1)}}),e.querySelector(".memola-draft-banner-promote")?.addEventListener("click",async()=>{if(await(await Promise.resolve().then(()=>(bt(),ta))).flushPendingSave(),!!confirm("\u539F\u672C\u304C\u524A\u9664\u3055\u308C\u3066\u3044\u308B\u305F\u3081\u3001\u3053\u306E\u4E0B\u66F8\u304D\u3092\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F"))try{_(!0,"\u4FDD\u5B58\u4E2D\u2026");let i=d.currentId;if(!i)return;let{apiPromoteDraftToPage:s,apiGetPages:l}=await Promise.resolve().then(()=>(V(),$e)),c=await s(i);await l();let{renderTree:m}=await Promise.resolve().then(()=>(_e(),ko));m(),Promise.resolve().then(()=>(Go(),rr)).then(p=>p.refreshDraftsBadge?.()),await Ue(c),k("\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3057\u305F")}catch(i){k("\u4FDD\u5B58\u5931\u6557: "+i.message,"err")}finally{_(!1)}})}async function hE(e,t){d.currentType="database",Promise.resolve().then(()=>(jo(),yn)).then(i=>i.clearComments()),Jn(),re.unload(),En(),np(),So(null),ca(),da(),Promise.resolve().then(()=>(yI(),vI)).then(i=>i.attachDbRowDrag());let o=B(e);if(!o||!o.list){k("DB\u30E1\u30BF\u60C5\u5831\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}tt("db"),I("dv-ttl").textContent=t.Title||"\u7121\u984C";let n=I("dv-pg-icon"),r=I("dv-add-icon"),a=document.getElementById("memola-dv-hd");o.icon?(n.textContent=o.icon,n.style.display="inline-block",r.style.display="none",a?.classList.remove("no-icon")):(n.style.display="none",r.style.display="",a?.classList.add("no-icon")),_(!0,"\u30C7\u30FC\u30BF\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D...");try{let i=await Promise.all([ze(o.list),Ee(o.list)]),{stripInternalDbFields:s}=await Promise.resolve().then(()=>(qe(),Ct));d.dbFields=s(i[0]);let l=i[1],c=[],m=[];for(let f of l){let g=f.Trashed;typeof g=="number"&&g>0?c.push(f):m.push(f)}d.dbItems=m,d.dbList=o.list,d.dbSelected.clear(),Jl(null);let p=await Promise.resolve().then(()=>(fE(),uE)),{getActiveViewId:u}=await Promise.resolve().then(()=>(Yl(),Dh));d.dbViewId=u(o.list),p.renderViewBar(),p.applyActiveView(),gE("db"),Promise.resolve().then(()=>(qe(),Ct)).then(f=>f.reconcileTrashedRows(o.list,l)).catch(()=>{})}catch(i){k("DB\u8AAD\u307F\u8FBC\u307F\u5931\u6557: "+i.message,"err")}finally{_(!1)}}var K=L(()=>{"use strict";q();Fe();me();le();_e();V();Re();Xr();ht();Hi();Fi();Qm();Xn();Vl();De();be();$i();bt();we();$i();cI()});var ko={};j(ko,{TREE_INDENT:()=>ic,TREE_PAD_LEFT:()=>Tp,ancs:()=>ar,kidsOf:()=>mb,mkNode:()=>Lp,renderBc:()=>lb,renderTree:()=>te});function IE(e){if(!e)return"user";let t="Id"in e?e.Id:e.id;return B(t)?.scope==="org"?"org":"user"}function mb(e){let t=e||"",o=d.pages.filter(r=>!r.IsDraft&&!B(r.Id)?.isTemplate&&r.Id!==t),n;if(t===""){let r=new Set(o.map(a=>a.Id));n=o.filter(a=>{let i=a.ParentId||"";return i===""||!r.has(i)}).sort((a,i)=>a.Id<i.Id?-1:1)}else n=o.filter(r=>(r.ParentId||"")===t).sort((r,a)=>r.Id<a.Id?-1:1);return Is(t,n)}function YB(e){return mb("").filter(t=>IE(t)===e)}function bE(e,t){let o=YB(t),n=Ep.has(t),r=n?o:o.slice(0,cb);if(!n&&d.currentId){let a=d.currentId,i=0;for(;i++<200;){let l=B(a)?.parent||"";if(!l||!d.pages.some(c=>c.Id===l))break;a=l}let s=o.find(l=>l.Id===a);s&&!r.some(l=>l.Id===a)&&r.push(s)}if(r.forEach(a=>{e.appendChild(Lp(a,0))}),o.length>cb){let a=document.createElement("div");a.className="memola-sl-more",a.textContent=n?"\u8868\u793A\u3092\u6E1B\u3089\u3059":"\u3055\u3089\u306B\u8868\u793A ("+(o.length-cb)+")",a.addEventListener("click",()=>{Ep.has(t)?Ep.delete(t):Ep.add(t),te()}),e.appendChild(a)}}async function vE(e,t){let o=_u(e,t);if(o===null)return e;let n=B(e);if(o==="org"&&n?.type==="database"&&n.list==="memola-daily")return k("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u7D44\u7E54\u306B\u516C\u958B\u3067\u304D\u307E\u305B\u3093","err"),null;let r=B(t),a=EE(e),i=o==="org"?"\u7D44\u7E54":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8",s=o==="org"?"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8":"\u7D44\u7E54";if(!window.confirm(`\u26A0 \u30B9\u30B3\u30FC\u30D7\u304C\u7570\u306A\u308A\u307E\u3059\u3002

\u300C`+(n?.title||"\u7121\u984C")+"\u300D("+s+`) \u3092
\u300C`+(r?.title||"\u7121\u984C")+"\u300D("+i+`) \u306E\u914D\u4E0B\u306B\u79FB\u52D5\u3057\u307E\u3059\u3002

\u914D\u4E0B\u306E `+a+" \u30DA\u30FC\u30B8\u3082\u4E00\u7DD2\u306B\u300C"+i+`\u300D\u306B\u306A\u308A\u307E\u3059\u3002

\u7D9A\u884C\u3057\u307E\u3059\u304B?`))return null;let{confirmScopeChangeLinks:c}=await Promise.resolve().then(()=>(ma(),$l));if(!await c(e,o))return null;let m=await Xa(e,o).catch(()=>null);return m?m.rootId:e}function yE(e,t){return e<t*.25?"before":e>t*.75?"after":"into"}function xE(e,t,o){let n=e-t,r=Math.floor((o*ic+Tp-n)/ic),a=o-Math.max(0,r);return Math.max(0,Math.min(o,a))}function XB(e,t){let o=e,n=0,r=[];for(;o&&(r.unshift(o),!!o.ParentId);)o=d.pages.find(i=>i.Id===o.ParentId);if(t<=0)return"";let a=r[t-1];return a?a.Id:""}function JB(e,t){let o=e,n=[];for(;o&&(n.unshift(o),!!o.ParentId);)o=d.pages.find(r=>r.Id===o.ParentId);return n[t]?n[t].Id:null}function wE(e,t){let n=I("tree").querySelectorAll(".memola-tr"),r=new Set,a=i=>{d.pages.filter(s=>s.ParentId===i).forEach(s=>{r.add(s.Id),a(s.Id)})};a(e),n.forEach(i=>{let s=i.dataset.pageId;s&&r.has(s)&&i.classList.toggle("memola-tr-dragging-descendant",t)})}function ZB(){let e=document.getElementById("memola-overlay")||document.body;if(ns&&e.contains(ns))return ns;let t=document.createElement("div");return t.className="memola-tr-drop-line",t.innerHTML='<span class="memola-tr-drop-dot"></span><span class="memola-tr-drop-dot right"></span>',e.appendChild(t),ns=t,t}function db(e,t,o){let n=e.getBoundingClientRect(),r=ZB(),a=(t?n.bottom:n.top)-1,i=n.left+o*ic+Tp;r.style.top=a+"px",r.style.left=i+"px",r.style.width=Math.max(40,n.right-i-6)+"px",r.classList.add("on")}function ac(){ns&&ns.classList.remove("on")}function Lp(e,t){let o=e.Type==="database",n=mb(e.Id),r=n.length>0,a=d.expanded.has(e.Id),i=e.Id===d.currentId,s=B(e.Id),l=s&&s.icon?s.icon:o?"\u{1F5C3}":"\u{1F4C4}",c=document.createElement("div"),m=document.createElement("div");m.className="memola-tr"+(i?" on":""),m.style.paddingLeft=t*ic+Tp+"px",m.dataset.depth=String(t),m.dataset.parentId=e.ParentId||"";let p=document.createElement("span");p.className="memola-tog"+(r?"":" lf")+(a?" op":""),p.innerHTML=r?"&#9658;":"",p.addEventListener("click",h=>{h.stopPropagation(),r&&(d.expanded.has(e.Id)?d.expanded.delete(e.Id):d.expanded.add(e.Id),te())});let u=document.createElement("span");u.className="memola-ti",u.textContent=l;let f=document.createElement("span");f.className="memola-tl",f.textContent=e.Title||"\u7121\u984C";let g=document.createElement("span");if(g.className="memola-ta",!o){let h=document.createElement("button");h.className="memola-tac",h.title="\u5B50\u30DA\u30FC\u30B8\u3092\u8FFD\u52A0",h.innerHTML="+",h.addEventListener("click",v=>{v.stopPropagation(),Eo(e.Id)}),g.appendChild(h)}let y=document.createElement("button");y.className="memola-tac",y.title=s?.pinned?"\u30D4\u30F3\u7559\u3081\u89E3\u9664":"\u30D4\u30F3\u7559\u3081",y.innerHTML=s?.pinned?"\u{1F4CC}":"\u{1F4CD}",y.addEventListener("click",async h=>{h.stopPropagation(),await Ru(e.Id,!s?.pinned),te()}),g.appendChild(y);let b=document.createElement("button");if(b.className="memola-tac",b.title="\u524A\u9664",b.innerHTML="\u{1F5D1}",b.addEventListener("click",h=>{h.stopPropagation(),yp(e.Id)}),g.appendChild(b),m.append(p,u,f,g),m.addEventListener("click",h=>{h.metaKey||h.ctrlKey?Promise.resolve().then(()=>(Kt(),oo)).then(v=>v.openPageInNewTab(e.Id)):Ue(e.Id)}),m.addEventListener("auxclick",h=>{h.button===1&&(h.preventDefault(),Promise.resolve().then(()=>(Kt(),oo)).then(v=>v.openPageInNewTab(e.Id)))}),m.draggable=!0,m.dataset.pageId=e.Id,m.addEventListener("dragstart",h=>{if(h.metaKey||h.ctrlKey){h.preventDefault();return}h.dataTransfer&&(h.dataTransfer.effectAllowed="move",h.dataTransfer.setData("text/plain",e.Id)),m.classList.add("memola-tr-dragging"),wE(e.Id,!0)}),m.addEventListener("dragend",()=>{m.classList.remove("memola-tr-dragging"),wE(e.Id,!1),ac()}),m.addEventListener("dragover",h=>{h.preventDefault();let v=m.getBoundingClientRect(),w=h.clientY-v.top,x=yE(w,v.height);if(x==="into")m.classList.add("memola-tr-dropover"),ac();else{m.classList.remove("memola-tr-dropover");let T=xE(h.clientX,v.left,t);db(m,x==="after",T)}}),m.addEventListener("dragleave",()=>{m.classList.remove("memola-tr-dropover")}),m.addEventListener("drop",async h=>{h.preventDefault(),h.stopPropagation(),m.classList.remove("memola-tr-dropover"),ac();let v=h.dataTransfer?.getData("text/plain");if(!v||v===e.Id)return;let w=m.getBoundingClientRect(),x=yE(h.clientY-w.top,w.height);try{if(x==="into"){let O=await vE(v,e.Id);if(!O)return;await Rr(O,e.Id),d.expanded.add(e.Id),te(),k("\u79FB\u52D5\u3057\u307E\u3057\u305F");return}let T=xE(h.clientX,w.left,t),E=XB(e,T),C=d.pages.find(O=>O.Id===v);if(!C)return;let U=v;if((C.ParentId||"")!==E){let O=await vE(v,E);if(!O)return;U=O,await Rr(U,E)}let M=T===t?e.Id:JB(e,T)||"",N=d.pages.filter(O=>(O.ParentId||"")===E).sort((O,Y)=>O.Id<Y.Id?-1:1),D=Is(E,N);if(M){let O=tu(D,U,M,x==="before");Ha(E,O)}te()}catch(T){k("\u79FB\u52D5\u5931\u6557: "+T.message,"err")}}),c.appendChild(m),r&&a){let h=document.createElement("div");n.forEach(v=>{h.appendChild(Lp(v,t+1))}),c.appendChild(h)}return c}function te(){let e=document.getElementById("memola-tree-pinned"),t=document.getElementById("memola-tree-private"),o=document.getElementById("memola-tree-org"),n=document.getElementById("memola-tree-pinned-lbl");if(!e||!t||!o)return;e.innerHTML="",t.innerHTML="",o.innerHTML="";let r=d.pages.filter(a=>a.IsDraft?!1:B(a.Id)?.pinned);n&&(n.style.display=r.length>0?"":"none"),r.forEach(a=>{e.appendChild(Lp(a,0))}),bE(t,"user"),bE(o,"org"),kE(t,"user"),kE(o,"org")}function kE(e,t){function o(n){let r=e.querySelectorAll(".memola-tr");if(r.length===0)return"bottom";let a=r[0].getBoundingClientRect(),i=r[r.length-1].getBoundingClientRect();return n<a.top+a.height/2?"top":n>i.bottom-i.height/2?"bottom":null}e.ondragover=n=>{if(n.preventDefault(),n.target.closest(".memola-tr"))return;let a=e.querySelectorAll(".memola-tr");if(a.length===0)return;o(n.clientY)==="top"&&a[0]?db(a[0],!1,0):a.length>0&&db(a[a.length-1],!0,0)},e.addEventListener("dragleave",n=>{let r=n.relatedTarget;(!r||!e.contains(r))&&ac()}),e.ondrop=async n=>{if(n.preventDefault(),ac(),n.target.closest(".memola-tr"))return;let a=n.dataTransfer?.getData("text/plain");if(!a)return;let i=o(n.clientY)||"bottom";try{let s=d.pages.find(f=>f.Id===a);if(!s)return;let l=a,c=IE(s);if(c!==t){let f=B(a);if(t==="org"&&f?.type==="database"&&f.list==="memola-daily"){k("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u7D44\u7E54\u306B\u516C\u958B\u3067\u304D\u307E\u305B\u3093","err");return}let g=EE(a);if(!window.confirm(`\u26A0 \u30B9\u30B3\u30FC\u30D7\u304C\u7570\u306A\u308A\u307E\u3059\u3002

\u300C`+(s.Title||"\u7121\u984C")+"\u300D("+(c==="org"?"\u7D44\u7E54":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8")+") \u3092\u300C"+(t==="org"?"\u{1F310} \u7D44\u7E54":"\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8")+`\u300D\u30BB\u30AF\u30B7\u30E7\u30F3\u306B\u79FB\u52D5\u3057\u307E\u3059\u3002

`+(g>0?"\u914D\u4E0B\u306E "+g+` \u30DA\u30FC\u30B8\u3082\u540C\u3058\u5206\u985E\u306B\u306A\u308A\u307E\u3059\u3002

`:"")+"\u7D9A\u884C\u3057\u307E\u3059\u304B?"))return;let{confirmScopeChangeLinks:b}=await Promise.resolve().then(()=>(ma(),$l));if(!await b(a,t))return;let h=await Xa(a,t).catch(()=>null);h&&(l=h.rootId)}(s.ParentId||"")!==""&&await Rr(l,"");let m=d.pages.filter(f=>(f.ParentId||"")==="").sort((f,g)=>f.Id<g.Id?-1:1),u=Is("",m).map(f=>f.Id).filter(f=>f!==l);i==="top"?u.unshift(l):u.push(l),Ha("",u),te()}catch(s){k("\u79FB\u52D5\u5931\u6557: "+s.message,"err")}}}function ar(e){let t={},o=[];d.pages.forEach(r=>{t[r.Id]=r});let n=e;for(;n;){let r=t[n];if(!r)break;o.unshift(r),n=r.ParentId||""}return o}function lb(e){let t=I("bc");t.innerHTML="";let o=ar(e);o.forEach((n,r)=>{let a=document.createElement("span");if(a.className="memola-bi",a.textContent=n.Title||"\u7121\u984C",a.addEventListener("click",()=>{Ue(n.Id)}),t.appendChild(a),r<o.length-1){let i=document.createElement("span");i.textContent="/",i.style.color="#e9e9e7",t.appendChild(i)}})}var cb,Ep,EE,ns,ic,Tp,_e=L(()=>{"use strict";q();me();K();Mn();V();le();Tr();we();cb=10,Ep=new Set;EE=e=>ks(d.pages,e);ns=null;ic=16,Tp=6});function sc(e,t){TE=e,pb=t;let o=I("emoji-grid");o.innerHTML="",QB.forEach(a=>{let i=document.createElement("button");i.className="memola-emoji-btn",i.textContent=a,i.addEventListener("click",()=>{I("emoji").classList.remove("on"),pb&&pb(a)}),o.appendChild(i)});let n=e.getBoundingClientRect(),r=I("emoji");r.style.top=n.bottom+4+"px",r.style.left=n.left+"px",r.classList.add("on")}function LE(){let e=document.body;e.dataset.memolaEmojiWired!=="1"&&(e.dataset.memolaEmojiWired="1",document.addEventListener("mousedown",t=>{let o=I("emoji"),n=t.target;o&&o.classList.contains("on")&&!o.contains(n)&&n!==TE&&o.classList.remove("on")}))}var QB,TE,pb,ub=L(()=>{"use strict";me();QB=["\u{1F4C4}","\u{1F4DD}","\u{1F4CB}","\u{1F4CC}","\u{1F4CD}","\u{1F4CE}","\u{1F5C2}","\u{1F5C3}","\u{1F5C4}","\u{1F4C1}","\u{1F4C2}","\u{1F5D1}","\u{1F4DA}","\u{1F4D6}","\u{1F4D7}","\u{1F4D8}","\u{1F4D9}","\u{1F4D4}","\u{1F4D2}","\u{1F4C3}","\u{1F4DC}","\u{1F4D1}","\u{1F516}","\u270F\uFE0F","\u{1F58A}","\u{1F58B}","\u{1F58C}","\u{1F58D}","\u2712\uFE0F","\u{1F50F}","\u{1F510}","\u{1F512}","\u{1F513}","\u{1F511}","\u{1F5DD}","\u{1F4A1}","\u{1F526}","\u{1F56F}","\u{1F4B0}","\u{1F4B5}","\u{1F4B3}","\u{1F3C6}","\u{1F947}","\u{1F3AF}","\u{1F3AA}","\u{1F3A8}","\u{1F3AD}","\u{1F31F}","\u2B50","\u2728","\u{1F4AB}","\u{1F525}","\u2744\uFE0F","\u{1F30A}","\u{1F308}","\u2600\uFE0F","\u{1F319}","\u26A1","\u{1F33F}","\u{1F34E}","\u{1F34A}","\u{1F34B}","\u{1F347}","\u{1F353}","\u{1F95D}","\u{1F951}","\u{1F32E}","\u{1F355}","\u2615","\u{1F382}","\u{1F370}","\u{1F436}","\u{1F431}","\u{1F42D}","\u{1F439}","\u{1F430}","\u{1F98A}","\u{1F43B}","\u{1F43C}","\u{1F428}","\u{1F42F}","\u{1F981}","\u{1F42E}","\u{1F680}","\u2708\uFE0F","\u{1F682}","\u{1F697}","\u{1F3E0}","\u{1F3E2}","\u{1F3D6}","\u{1F3D4}","\u{1F30D}","\u{1F5FA}","\u{1F9ED}","\u26F5"],TE=null,pb=null});var ME={};j(ME,{attachCreateMenu:()=>gb,renderCreateMenuTemplates:()=>fb});function fb(){let e=document.getElementById("memola-cm-templates");if(!e)return;let t=Nu();if(t.length===0){e.innerHTML='<div class="memola-cm-empty">\u307E\u3060\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u30DA\u30FC\u30B8\u306E\u300C\u2026\u300D\u2192\u300C\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3068\u3057\u3066\u767B\u9332\u300D\u3067\u8FFD\u52A0\u3067\u304D\u307E\u3059\u3002</div>';return}e.innerHTML=t.map(o=>{let n=o.icon||(o.type==="database"?"\u{1F5C2}":"\u{1F4C4}");return'<div class="memola-cm-item memola-cm-tpl" data-tpl-id="'+P(o.id)+'"><span class="memola-cm-ic">'+P(n)+'</span><span class="memola-cm-name">'+P(o.title||"\u7121\u984C")+'</span><span class="memola-cm-tpl-actions"><button class="memola-cm-tpl-btn" data-tpl-edit="'+P(o.id)+'" title="\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u7DE8\u96C6">\u270E</button><button class="memola-cm-tpl-btn" data-tpl-del="'+P(o.id)+'" title="\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u524A\u9664">\u{1F5D1}</button></span></div>'}).join("")}function gb(e){if(SE)return;SE=!0;let t=document.getElementById("memola-quick-add"),o=document.getElementById("memola-create-menu");!t||!o||(t.addEventListener("click",n=>{n.stopPropagation();let r=t.getBoundingClientRect();o.style.left=r.left+"px",o.style.top=r.bottom+4+"px",fb(),o.classList.toggle("on")}),o.addEventListener("click",n=>{let r=n.target,a=r.closest("[data-tpl-edit]")?.dataset.tplEdit;if(a){n.stopPropagation(),o.classList.remove("on"),Promise.resolve().then(()=>(K(),ie)).then(c=>c.doSelect(a));return}let i=r.closest("[data-tpl-del]")?.dataset.tplDel;if(i){n.stopPropagation(),tD(i);return}let s=r.closest(".memola-cm-tpl");if(s?.dataset.tplId){o.classList.remove("on"),eD(s.dataset.tplId);return}let l=r.closest(".memola-cm-item");if(!(!l||!l.dataset.cm))switch(o.classList.remove("on"),l.dataset.cm){case"new-page":Eo("");break;case"new-db":e("");break}}),document.addEventListener("click",n=>{if(!o.classList.contains("on"))return;let r=n.target;o.contains(r)||t.contains(r)||o.classList.remove("on")}))}async function eD(e){let t=d.meta.pages.find(o=>o.id===e);try{_(!0,"\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u4F5C\u6210\u4E2D...");let o;if(t?.type==="database"){let{duplicateDb:n}=await Promise.resolve().then(()=>(qe(),Ct)),r=await n(e,{asTemplate:!1});o=r.Id,te(),await(await Promise.resolve().then(()=>(K(),ie))).doSelectDb(o,r)}else{let{apiCreatePageFromTemplate:n}=await Promise.resolve().then(()=>(V(),$e));o=(await n(e)).Id,te(),await(await Promise.resolve().then(()=>(K(),ie))).doSelect(o)}k("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u4F5C\u6210\u3057\u307E\u3057\u305F")}catch(o){k("\u4F5C\u6210\u5931\u6557: "+o.message,"err")}finally{_(!1)}}async function tD(e){let t=d.meta.pages.find(o=>o.id===e);if(confirm("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u300C"+(t?.title||"\u7121\u984C")+"\u300D\u3092\u524A\u9664\u3057\u307E\u3059\u304B?"))try{_(!0,"\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u524A\u9664\u4E2D...");let{apiDeleteTemplate:o}=await Promise.resolve().then(()=>(V(),$e));await o(e),fb(),k("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u524A\u9664\u3057\u307E\u3057\u305F")}catch(o){k("\u524A\u9664\u5931\u6557: "+o.message,"err")}finally{_(!1)}}var SE,hb=L(()=>{"use strict";Mn();q();le();Re();V();_e();SE=!1});function CE(){if(PE)return;PE=!0;let e=2,t=document.getElementById("memola-col-type-grid");if(t){let o=Array.from(t.querySelectorAll(".memola-col-type"));o[0]?.classList.add("on"),o.forEach(n=>{n.addEventListener("click",()=>{o.forEach(r=>r.classList.remove("on")),n.classList.add("on"),e=parseInt(n.dataset.tk||"2"),I("col-choices-row").classList.toggle("on",e===6||e===15)})})}I("col-cancel").addEventListener("click",()=>{I("col-md").classList.remove("on")}),I("col-ok").addEventListener("click",async()=>{let o=I("col-name").value.trim();if(!o){I("col-name").focus();return}let n=[];if(e===6||e===15){let r=I("col-choices").value.trim();n=r?r.split(`
`).map(a=>a.trim()).filter(Boolean):[]}I("col-md").classList.remove("on"),_(!0,"\u5217\u3092\u8FFD\u52A0\u4E2D...");try{await zt(d.dbList,o,e,n);let[r,a]=await Promise.all([ze(d.dbList),Ee(d.dbList)]),{stripInternalDbFields:i}=await Promise.resolve().then(()=>(qe(),Ct));d.dbFields=i(r),d.dbItems=a,Oe(),k("\u5217\u300C"+o+"\u300D\u3092\u8FFD\u52A0\u3057\u307E\u3057\u305F")}catch(r){k("\u5217\u8FFD\u52A0\u5931\u6557: "+r.message,"err")}finally{_(!1)}}),I("col-name").addEventListener("keydown",o=>{let n=o;n.isComposing||n.keyCode===229||(n.key==="Enter"&&I("col-ok").click(),n.key==="Escape"&&I("col-md").classList.remove("on"))})}var PE,AE=L(()=>{"use strict";q();me();le();De();K();PE=!1});function DE(){let t=I("sb").classList.contains("collapsed")?"collapsed":"expanded";_a.set(t)}function _E(e){BE||(BE=!0,I("sb-toggle").addEventListener("click",()=>{I("sb").classList.toggle("collapsed"),DE()}),document.getElementById("memola-sb-collapse")?.addEventListener("click",()=>{I("sb").classList.add("collapsed"),DE()}),_a.get()==="collapsed"&&I("sb").classList.add("collapsed"),document.getElementById("memola-nav-back")?.addEventListener("click",()=>{Promise.resolve().then(()=>(Xn(),Ii)).then(t=>t.goBack())}),document.getElementById("memola-nav-fwd")?.addEventListener("click",()=>{Promise.resolve().then(()=>(Xn(),Ii)).then(t=>t.goForward())}),document.getElementById("memola-sb-daily-today")?.addEventListener("click",()=>{e.openTodayDailyNote()}),document.getElementById("memola-sb-daily-pick")?.addEventListener("click",t=>{e.showDailyPicker(t.currentTarget)}),I("ne").addEventListener("click",()=>{Eo("")}),I("ne-db").addEventListener("click",()=>{e.doNewDb("")}),document.getElementById("memola-ne-tpl")?.addEventListener("click",()=>{document.getElementById("memola-quick-add")?.click()}),document.querySelectorAll(".memola-em-chip").forEach(t=>{t.addEventListener("click",()=>{t.dataset.tpl==="tasks"?e.doNewDb(""):Eo("")})}))}var BE,RE=L(()=>{"use strict";me();be();Mn();BE=!1});function OE(e){Zg(e)}function HE(){NE||(NE=!0,I("tb").addEventListener("mousedown",e=>{e.target.closest(".memola-b")&&e.preventDefault()}),I("tb").addEventListener("click",e=>{let t=e.target.closest(".memola-b");t&&t.dataset.cmd&&OE(t.dataset.cmd)}),I("ftb").addEventListener("mousedown",e=>{let t=e.target.closest(".memola-fb");t&&t.dataset.cmd&&(e.preventDefault(),OE(t.dataset.cmd))}))}var NE,FE=L(()=>{"use strict";me();vt();NE=!1});function zE(e){if(!d.currentId)return;let t=d.currentId;Us(t,e).then(()=>{rc(t),te()}).catch(o=>{k("\u30A2\u30A4\u30B3\u30F3\u4FDD\u5B58\u5931\u6557: "+o.message,"err")})}function jE(e){if(!d.currentId)return;let t=d.currentId;Us(t,e).then(()=>{let o=I("dv-pg-icon"),n=I("dv-add-icon"),r=document.getElementById("memola-dv-hd");e?(o.textContent=e,o.style.display="inline-block",n.style.display="none",r?.classList.remove("no-icon")):(o.style.display="none",n.style.display="",r?.classList.add("no-icon")),te()}).catch(o=>{k("\u30A2\u30A4\u30B3\u30F3\u4FDD\u5B58\u5931\u6557: "+o.message,"err")})}function qE(){UE||(UE=!0,I("add-icon").addEventListener("click",()=>{sc(I("add-icon"),zE)}),I("pg-icon").addEventListener("click",()=>{sc(I("pg-icon"),zE)}),I("dv-add-icon").addEventListener("click",()=>{sc(I("dv-add-icon"),jE)}),I("dv-pg-icon").addEventListener("click",()=>{sc(I("dv-pg-icon"),jE)}),I("emoji-rm").addEventListener("click",()=>{if(I("emoji").classList.remove("on"),!d.currentId)return;let e=d.currentId;Us(e,"").then(()=>{if(B(e)?.type==="database"){let o=I("dv-pg-icon"),n=I("dv-add-icon"),r=document.getElementById("memola-dv-hd");o.style.display="none",n.style.display="",r?.classList.add("no-icon")}else rc(e);te()}).catch(t=>{k("\u30A2\u30A4\u30B3\u30F3\u524A\u9664\u5931\u6557: "+t.message,"err")})}))}var UE,$E=L(()=>{"use strict";q();me();le();V();_e();K();ub();we();UE=!1});function VE(){KE||(KE=!0,I("search-nav").addEventListener("click",$h),I("qs").addEventListener("click",e=>{e.target===I("qs")&&Xo()}),I("qs-inp").addEventListener("input",()=>{Vh(),dp(I("qs-inp").value)}),I("qs-inp").addEventListener("keydown",e=>{let t=e;t.isComposing||t.keyCode===229||(t.key==="ArrowDown"&&(e.preventDefault(),mp(1)),t.key==="ArrowUp"&&(e.preventDefault(),mp(-1)),t.key==="Enter"&&(e.preventDefault(),Kh()),t.key==="Escape"&&Xo())}))}var KE,WE=L(()=>{"use strict";me();tc();KE=!1});function YE(){if(GE)return;GE=!0;let e=I("ttl");e.addEventListener("input",()=>{Qo(e),$o()}),e.addEventListener("keydown",t=>{let o=t;o.isComposing||o.keyCode===229||o.key==="Enter"&&(t.preventDefault(),Ce().focus())}),I("dv-ttl").addEventListener("input",()=>{let t=(I("dv-ttl").textContent||"").trim()||"\u7121\u984C";d.currentId&&(Dt(4e3),za(d.currentId,t),te())}),I("dv-ttl").addEventListener("blur",()=>{if(d.currentId){let t=(I("dv-ttl").textContent||"").trim()||"\u7121\u984C";Ja(d.currentId,t).catch(o=>{k("\u30BF\u30A4\u30C8\u30EB\u4FDD\u5B58\u5931\u6557: "+o.message,"err")})}})}var GE,XE=L(()=>{"use strict";q();me();le();V();_e();bt();we();GE=!1});function JE(){let e=new Date,t=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return e.getFullYear()+"-"+t+"-"+o}async function ZE(e,t){try{_(!0,"\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u3044\u3066\u3044\u307E\u3059...");let o=await Promise.resolve().then(()=>(_n(),Ka)),n=await o.findNoteForDate(e);if(!n&&t.confirmCreate){if(_(!1),!confirm(e+" \u306E\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093\u3002\u65B0\u3057\u304F\u4F5C\u6210\u3057\u307E\u3059\u304B\uFF1F"))return;_(!0,"\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u4F5C\u6210\u3057\u3066\u3044\u307E\u3059...")}let r=n?{...n,dbPageId:(await o.ensureDailyDb()).dbPageId}:await o.getOrCreateNoteForDate(e);if(!d.pages.some(l=>l.Id===r.dbPageId)){let{apiGetPages:l}=await Promise.resolve().then(()=>(V(),$e));await l()}let a=d.pages.find(l=>l.Id===r.dbPageId);if(!a){k("\u30C7\u30A4\u30EA\u30FC DB \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}await(await Promise.resolve().then(()=>(K(),ie))).doSelectDb(r.dbPageId,a);let s=d.dbItems.find(l=>l.Id===r.rowId);s&&await(await Promise.resolve().then(()=>(Uo(),Fo))).openRowAsPage(r.dbPageId,s),te()}catch(o){k("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u3051\u307E\u305B\u3093\u3067\u3057\u305F: "+o.message,"err")}finally{_(!1)}}async function QE(){await ZE(JE(),{confirmCreate:!1})}async function e1(){let e=d.currentId;if(!e)return;let t=B(e);if(t?.originDailyDate&&confirm(`\u3053\u306E\u30DA\u30FC\u30B8\u3092\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 (${t.originDailyDate}) \u306B\u623B\u3057\u307E\u3059\u304B\uFF1F

\u901A\u5E38\u30DA\u30FC\u30B8\u3068\u3057\u3066\u306E\u672C\u30DA\u30FC\u30B8\u306F\u524A\u9664\u3055\u308C\u3001\u672C\u6587\u304C\u30C7\u30A4\u30EA\u30FC\u5074\u306B\u7D71\u5408\u3055\u308C\u307E\u3059\u3002`))try{_(!0,"\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u306B\u5FA9\u5143\u3057\u3066\u3044\u307E\u3059...");let o=await Promise.resolve().then(()=>(_n(),Ka)),{rowId:n,date:r}=await o.restoreToDaily(e),{apiGetPages:a}=await Promise.resolve().then(()=>(V(),$e));await a(),te();let i=await o.ensureDailyDb(),s=d.pages.find(l=>l.Id===i.dbPageId);if(s){await(await Promise.resolve().then(()=>(K(),ie))).doSelectDb(i.dbPageId,s);let c=d.dbItems.find(m=>m.Id===n);c&&await(await Promise.resolve().then(()=>(Uo(),Fo))).openRowAsPage(i.dbPageId,c)}k("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 ("+r+") \u306B\u623B\u3057\u307E\u3057\u305F")}catch(o){k("\u5FA9\u5143\u5931\u6557: "+o.message,"err")}finally{_(!1)}}function t1(e){let t=document.getElementById("memola-daily-picker");t&&t.remove();let o=JE(),n=document.createElement("div");n.id="memola-daily-picker",n.innerHTML='<div class="memola-dp-row"><button class="memola-dp-nav" data-nav="-1" title="\u524D\u65E5">\u2039</button><input type="date" id="memola-dp-input" value="'+o+'"><button class="memola-dp-nav" data-nav="+1" title="\u7FCC\u65E5">\u203A</button></div><div class="memola-dp-quick"><button data-quick="-7">\u5148\u9031</button><button data-quick="-1">\u6628\u65E5</button><button data-quick="0">\u4ECA\u65E5</button><button data-quick="+1">\u660E\u65E5</button><button data-quick="+7">\u6765\u9031</button></div><div class="memola-dp-foot"><button id="memola-dp-cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button id="memola-dp-open" class="memola-dp-primary">\u958B\u304F</button></div>';let r=e.getBoundingClientRect();n.style.position="fixed",n.style.left=r.left+"px",n.style.top=r.bottom+4+"px",(document.getElementById("memola-overlay")||document.body).appendChild(n);let a=n.querySelector("#memola-dp-input");if(!a)return;setTimeout(()=>a.focus(),0);function i(m,p){let u=new Date((p||a.value||o)+"T00:00:00");u.setDate(u.getDate()+m);let f=String(u.getMonth()+1).padStart(2,"0"),g=String(u.getDate()).padStart(2,"0");return u.getFullYear()+"-"+f+"-"+g}n.querySelectorAll(".memola-dp-nav").forEach(m=>{m.addEventListener("click",()=>{let p=parseInt(m.dataset.nav||"0",10);a.value=i(p)})}),n.querySelectorAll(".memola-dp-quick button").forEach(m=>{m.addEventListener("click",()=>{let p=parseInt(m.dataset.quick||"0",10);a.value=i(p,o)})});function s(){n.remove(),document.removeEventListener("click",l)}function l(m){!n.contains(m.target)&&!e.contains(m.target)&&s()}setTimeout(()=>document.addEventListener("click",l),0),n.querySelector("#memola-dp-cancel")?.addEventListener("click",s);let c=()=>{let m=a.value;m&&(s(),ZE(m,{confirmCreate:!0}))};n.querySelector("#memola-dp-open")?.addEventListener("click",c),a.addEventListener("keydown",m=>{m.key==="Enter"&&c()})}var bb=L(()=>{"use strict";q();le();_e();we()});function o1(e,t,o){let n=new Blob([t],{type:o+";charset=utf-8"}),r=URL.createObjectURL(n),a=document.createElement("a");a.href=r,a.download=e,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(r)}function n1(e){return e.replace(/[/\\?%*:|"<>]/g,"_").slice(0,100)||"untitled"}function oD(){return`
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
`.replace(/\s+/g," ").trim()}function r1(){return d.currentId&&d.pages.find(e=>e.Id===d.currentId)||null}async function a1(){let e=r1();if(e){if(e.Type==="database"){k("\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306FMD\u51FA\u529B\u3067\u304D\u307E\u305B\u3093","err");return}try{_(!0,"\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u4E2D...");let t=await ho(e.Id),o=new Date().toISOString().slice(0,10),n=`---
title: `+(e.Title||"\u7121\u984C")+`
parent: `+(e.ParentId||"")+`
exported: `+o+`
---

`;o1(n1(e.Title||"\u7121\u984C")+".md",n+t,"text/markdown")}catch(t){k("MD\u51FA\u529B\u5931\u6557: "+t.message,"err")}finally{_(!1)}}}async function i1(){let e=r1();if(e){if(e.Type==="database"){k("\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306FHTML\u51FA\u529B\u3067\u304D\u307E\u305B\u3093","err");return}try{_(!0,"\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u4E2D...");let t=await ho(e.Id),o=Po(t),n=e.Title||"\u7121\u984C",r=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),a=oD(),i=`<!DOCTYPE html>
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
</html>`;o1(n1(n)+".html",i,"text/html")}catch(t){k("HTML\u51FA\u529B\u5931\u6557: "+t.message,"err")}finally{_(!1)}}}function s1(){window.print()}var l1=L(()=>{"use strict";q();le();V();rn()});function vb(){return d.currentId&&d.pages.find(e=>e.Id===d.currentId)||null}async function c1(){let e=vb();if(e){if(e.Type==="database"){k("\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306F\u8907\u88FD\u3067\u304D\u307E\u305B\u3093","err");return}try{_(!0,"\u8907\u88FD\u4E2D...");let t=await ho(e.Id),o=(e.Title||"\u7121\u984C")+" (\u30B3\u30D4\u30FC)",n=B(e.Id)?.scope||"user",r=await ln(o,e.ParentId,n),{updatePageRow:a}=await Promise.resolve().then(()=>(V(),$e)),{addPage:i}=await Promise.resolve().then(()=>(we(),Tv));await a(r.Id,{Body:t}),i(r),te(),await Ue(r.Id),k("\u8907\u88FD\u3057\u307E\u3057\u305F")}catch(t){k("\u8907\u88FD\u5931\u6557: "+t.message,"err")}finally{_(!1)}}}async function d1(){let e=vb();if(!e)return;let t;if(e.Type==="database"){let o=B(e.Id);if(!o||!o.list){k("\u30EA\u30F3\u30AF\u53D6\u5F97\u5931\u6557","err");return}t=W+"/Lists/"+encodeURIComponent(o.list)}else t=W+"/Lists/"+encodeURIComponent(nt(e.Id))+"/DispForm.aspx?ID="+encodeURIComponent(e.Id);try{await navigator.clipboard.writeText(t),k("\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")}catch{k("\u30B3\u30D4\u30FC\u5931\u6557","err")}}function m1(){let e=vb();if(!e)return;if(e.Type==="database"){k(`\u{1F5C3} ${e.Title||"\u7121\u984C"} (DB) \u2014 ${d.dbItems.length}\u884C / ${d.dbFields.length}\u5217`);return}let t=Ce(),o=(t.textContent||"").replace(/\s+/g," ").trim(),n=o.length,r=o?o.split(/\s+/).length:0,a=t.querySelectorAll("p, h1, h2, h3, li, pre, blockquote, .memola-callout, .memola-todo, hr").length;k(`\u{1F4C4} ${e.Title||"\u7121\u984C"}: ${n}\u6587\u5B57 / \u7D04${r}\u8A9E / ${a}\u30D6\u30ED\u30C3\u30AF`)}var p1=L(()=>{"use strict";q();Fe();me();le();_e();K();V();we()});function u1(e){let t=I("pgm");if(t.classList.contains("on")){Sp();return}if(!d.currentId){k("\u30DA\u30FC\u30B8\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044");return}let o=e.getBoundingClientRect(),n=o.bottom+4,r=window.innerWidth-o.right;t.style.top=n+"px",t.style.right=r+"px",t.style.left="",t.classList.add("on"),lc=e}function Sp(){I("pgm").classList.remove("on"),lc=null}function f1(){let e=document.body;e.dataset.memolaPageMenuWired!=="1"&&(e.dataset.memolaPageMenuWired="1",document.addEventListener("mousedown",t=>{let o=I("pgm"),n=t.target;o&&o.classList.contains("on")&&!o.contains(n)&&n!==lc&&(!lc||!lc.contains(n))&&Sp()}))}var lc,g1=L(()=>{"use strict";q();me();le();lc=null});async function h1(e){let t=Pt(e);if(!t)return[];let o=J(nt(e),"/items("+t+")/versions?$select=VersionLabel,Created,Editor/Title,Body_blocks,Title&$expand=Editor&$orderby=Created desc&$top=50"),n=await ne(o).catch(()=>null);return n?.results?n.results.map(r=>({versionLabel:r.VersionLabel||"",created:r.Created||"",editor:r.Editor?.Title||r.CreatedBy?.Title||"",body:r.Body_blocks||"",title:r.Title||""})):[]}var b1=L(()=>{"use strict";Lt();V()});var y1={};j(y1,{openVersionHistory:()=>aD});function v1(e){if(!e)return"";let t=new Date(e);if(isNaN(t.getTime()))return e;let o=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),a=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${o}/${n}/${r} ${a}:${i}`}async function aD(e,t){ba.render('<div class="memola-versions-box"><div class="memola-versions-hd"><span class="memola-versions-title">\u{1F4DC} \u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74: '+P(t)+'</span><button class="memola-versions-close" title="\u9589\u3058\u308B">\xD7</button></div><div class="memola-versions-body"><div class="memola-versions-loading">\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026</div></div></div>',r=>{r.querySelector(".memola-versions-close")?.addEventListener("click",()=>ba.close())});let o=[];try{o=await h1(e)}catch(r){yb(t,'<div class="memola-versions-error">\u53D6\u5F97\u5931\u6557: '+P(r.message)+"</div>");return}if(o.length===0){yb(t,'<div class="memola-versions-empty">\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74\u304C\u3042\u308A\u307E\u305B\u3093\u3002<br><span style="font-size:11px;color:var(--ink-3)">SP \u30EA\u30B9\u30C8\u306E\u300C\u30D0\u30FC\u30B8\u30E7\u30F3\u7BA1\u7406\u8A2D\u5B9A\u300D\u304C\u30AA\u30D5\u306E\u53EF\u80FD\u6027\u304C\u3042\u308A\u307E\u3059\u3002</span></div>');return}let n=o.map((r,a)=>{let i=(r.body||"").replace(/\s+/g," ").slice(0,120),s=a===0;return'<div class="memola-versions-item'+(s?" current":"")+'" data-idx="'+a+'"><div class="memola-versions-itemhd"><span class="memola-versions-label">v'+P(r.versionLabel)+(s?" (\u73FE\u5728)":"")+'</span><span class="memola-versions-time">'+v1(r.created)+'</span><span class="memola-versions-editor">'+P(r.editor||"\u4E0D\u660E")+'</span></div><div class="memola-versions-preview">'+P(i||"(\u672C\u6587\u306A\u3057)")+'</div><div class="memola-versions-actions"><button class="memola-btn s" data-act="preview">\u30D7\u30EC\u30D3\u30E5\u30FC</button>'+(s?"":'<button class="memola-btn p" data-act="restore">\u3053\u306E\u7248\u306B\u623B\u3059</button>')+"</div></div>"}).join("");yb(t,n,r=>{r.querySelectorAll(".memola-versions-item").forEach(a=>{let i=parseInt(a.dataset.idx||"-1",10);i<0||a.addEventListener("click",async s=>{let l=s.target.closest("button[data-act]");if(!l)return;let c=l.dataset.act,m=o[i];m&&(c==="preview"?iD(m):c==="restore"&&await sD(e,m))})})})}function yb(e,t,o){ba.render('<div class="memola-versions-box"><div class="memola-versions-hd"><span class="memola-versions-title">\u{1F4DC} \u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74: '+P(e)+'</span><button class="memola-versions-close" title="\u9589\u3058\u308B">\xD7</button></div><div class="memola-versions-body">'+t+"</div></div>",n=>{n.querySelector(".memola-versions-close")?.addEventListener("click",()=>ba.close()),o&&o(n)})}function iD(e){Mp.render('<div class="memola-versions-box" style="max-width:760px"><div class="memola-versions-hd"><span class="memola-versions-title">v'+P(e.versionLabel)+' \u30D7\u30EC\u30D3\u30E5\u30FC</span><button class="memola-versions-close">\xD7</button></div><div class="memola-versions-fullpreview">'+nn(ge(e.body))+"</div></div>",t=>{t.querySelector(".memola-versions-close")?.addEventListener("click",()=>Mp.close())})}async function sD(e,t){if(confirm("v"+t.versionLabel+" ("+v1(t.created)+" / "+(t.editor||"\u4E0D\u660E")+`) \u306E\u5185\u5BB9\u3067\u73FE\u5728\u306E\u672C\u6587\u3092\u4E0A\u66F8\u304D\u3057\u307E\u3059\u3002

\u73FE\u5728\u306E\u7248\u306F SP \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74\u306B\u6B8B\u308B\u306E\u3067\u3001\u5F8C\u3067\u5143\u306B\u623B\u3059\u3053\u3068\u3082\u53EF\u80FD\u3067\u3059\u3002

\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F`))try{_(!0,"\u5FA9\u5143\u4E2D\u2026");let{apiSavePageBlocks:o}=await Promise.resolve().then(()=>(V(),$e));if(!(await o(e,t.title||"\u7121\u984C",t.body)).ok){k("\u5FA9\u5143\u5931\u6557: \u7AF6\u5408\u3092\u691C\u51FA\u3057\u307E\u3057\u305F\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044","err");return}if(k("v"+t.versionLabel+" \u306B\u5FA9\u5143\u3057\u307E\u3057\u305F"),ba.close(),d.currentId===e){let{doSelect:r}=await Promise.resolve().then(()=>(K(),ie));await r(e)}}catch(o){k("\u5FA9\u5143\u5931\u6557: "+o.message,"err")}finally{_(!1)}}var nD,rD,ba,Mp,x1=L(()=>{"use strict";q();le();rn();V();b1();Re();nr();nD="memola-versions-md",rD="memola-versions-preview",ba=kn({id:nD,className:"memola-versions-md",onEscape:()=>ba.close(),onBackdropClick:()=>ba.close()}),Mp=kn({id:rD,className:"memola-versions-md",onEscape:()=>Mp.close(),onBackdropClick:()=>Mp.close()})});function k1(e){w1||(w1=!0,I("pgm-btn").addEventListener("click",t=>{t.stopPropagation(),cD(),u1(I("pgm-btn"))}),I("pgm").addEventListener("click",async t=>{let o=t.target.closest(".memola-pgm-item");if(!o||!o.dataset.action)return;let n=o.dataset.action;switch(Sp(),n){case"export-md":await a1();break;case"export-html":await i1();break;case"duplicate":await c1();break;case"duplicate-as-draft":await pD();break;case"register-template":await lD();break;case"version-history":await uD();break;case"copy-link":await d1();break;case"toggle-scope":await Jm();break;case"publish":await dD();break;case"copy-pub-url":await mD();break;case"restore-daily":await e1();break;case"print":s1();break;case"info":m1();break;case"focus":e.toggleFocusMode();break;case"delete":if(d.currentRow){let r=d.currentRow;if(!confirm(`\u3053\u306E\u884C\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F
(\u2318Z \u3067\u5FA9\u5143\u53EF\u80FD)`))break;try{_(!0,"\u884C\u3092\u524A\u9664\u4E2D...");let{deleteRowWithUndo:a}=await Promise.resolve().then(()=>(No(),Td));await a(r.listTitle,r.itemId),d.currentRow=null;let i=d.pages.find(s=>s.Id===r.dbId);i?await(await Promise.resolve().then(()=>(K(),ie))).doSelectDb(r.dbId,i):tt("empty"),k("\u884C\u3092\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u2318Z \u3067\u5FA9\u5143\u53EF\u80FD\uFF09")}catch(a){k("\u524A\u9664\u5931\u6557: "+a.message,"err")}finally{_(!1)}break}d.currentId&&await yp(d.currentId);break}}),f1())}async function lD(){let e=d.currentId;if(!e||d.currentRow){k("\u30DA\u30FC\u30B8\u3092\u958B\u3044\u3066\u304B\u3089\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044","err");return}try{if(_(!0,"\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u306B\u767B\u9332\u4E2D..."),d.currentType==="database"){let{duplicateDb:o}=await Promise.resolve().then(()=>(qe(),Ct));await o(e,{asTemplate:!0})}else{await xt().catch(()=>{});let{apiRegisterPageAsTemplate:o}=await Promise.resolve().then(()=>(V(),$e));await o(e)}let{renderCreateMenuTemplates:t}=await Promise.resolve().then(()=>(hb(),ME));t(),k("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3068\u3057\u3066\u767B\u9332\u3057\u307E\u3057\u305F(\uFF0B\u65B0\u898F \u2192\u300C\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u300D)")}catch(t){k("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u767B\u9332\u5931\u6557: "+t.message,"err")}finally{_(!1)}}function cD(){let e=document.querySelector(".memola-pgm-publish-label"),t=document.querySelector('[data-action="copy-pub-url"]'),o=document.querySelector('[data-action="publish"]'),n=document.querySelector('[data-action="restore-daily"]'),r=!!d.currentId&&d.currentType==="page"&&!d.currentRow;if(n){let i=r&&d.currentId?B(d.currentId):null;n.style.display=i?.originDailyDate?"":"none"}let a=document.querySelector('[data-action="toggle-scope"]');if(a){let s=!!d.currentId&&(d.currentType==="page"||d.currentType==="database")&&!d.currentRow&&d.currentId?B(d.currentId):null,l=s?.type==="database"&&s.list==="memola-daily",c=!!s&&!s.originPageId&&!s.trashed&&!l;a.style.display=c?"":"none",Promise.resolve().then(()=>(ma(),$l)).then(m=>m.syncScopeTag())}if(!r){o&&(o.style.display="none"),t&&(t.style.display="none");return}o&&(o.style.display=""),Promise.resolve().then(()=>(Br(),Ar)).then(i=>{let s=i.isPagePublished(d.currentId);e&&(e.textContent=s?"Web \u516C\u958B\u3092\u89E3\u9664":"Web \u516C\u958B"),t&&(t.style.display=s?"":"none")})}async function dD(){let e=d.currentId;if(!e)return;let t=await Promise.resolve().then(()=>(Br(),Ar));if(t.isPagePublished(e)){if(!confirm("Web \u516C\u958B\u3092\u89E3\u9664\u3057\u307E\u3059\u3002SP \u4E0A\u306E\u516C\u958B\u30DA\u30FC\u30B8\uFF08Site Page\uFF09\u3082\u524A\u9664\u3055\u308C\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F"))return;try{await t.unpublishPage(e),k("\u516C\u958B\u3092\u89E3\u9664\u3057\u307E\u3057\u305F")}catch(o){k("\u89E3\u9664\u5931\u6557: "+o.message,"err")}En()}else{await xt();let n=(I("ttl")?.value||"").trim()||"\u7121\u984C",{getBlocks:r}=await Promise.resolve().then(()=>(vt(),qo)),{blocksToMd:a}=await Promise.resolve().then(()=>(Mt(),eu)),i=a(r());try{let s=await t.publishPage(e,n,i);try{await navigator.clipboard.writeText(s)}catch{}k("\u516C\u958B\u3057\u307E\u3057\u305F\uFF08URL \u3092\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC\uFF09")}catch(s){k("\u516C\u958B\u5931\u6557: "+s.message,"err")}En()}}async function mD(){let e=d.currentId;if(!e)return;let o=(await Promise.resolve().then(()=>(Br(),Ar))).publishedUrlFor(e);try{await navigator.clipboard.writeText(o),k("URL \u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")}catch{k("\u30B3\u30D4\u30FC\u5931\u6557","err")}}async function pD(){let e=d.currentId;if(e){if(d.currentType!=="page"||d.currentRow){k("\u3053\u306E\u30DA\u30FC\u30B8\u306F\u4E0B\u66F8\u304D\u8907\u88FD\u306B\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u305B\u3093","err");return}await xt();try{_(!0,"\u4E0B\u66F8\u304D\u3092\u8907\u88FD\u4E2D\u2026");let{apiDuplicateAsDraft:t,apiGetPages:o}=await Promise.resolve().then(()=>(V(),$e)),n=await t(e);await o(),te(),Io(),await Ue(n.Id),k("\u4E0B\u66F8\u304D\u3092\u4F5C\u6210\u3057\u307E\u3057\u305F\u3002\u672C\u30E9\u30A4\u30D6\u30E9\u30EA\u306B\u306F\u8868\u793A\u3055\u308C\u307E\u305B\u3093 \u2014 \u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u{1F4DD} \u4E0B\u66F8\u304D\u300D \u304B\u3089\u518D\u5EA6\u958B\u3051\u307E\u3059")}catch(t){k("\u4E0B\u66F8\u304D\u8907\u88FD\u5931\u6557: "+t.message,"err")}finally{_(!1)}}}async function uD(){let e=d.currentId;if(!e)return;let t=d.pages.find(n=>n.Id===e);if(!t)return;let{openVersionHistory:o}=await Promise.resolve().then(()=>(x1(),y1));await o(e,t.Title||"\u7121\u984C")}var w1,I1=L(()=>{"use strict";q();me();le();_e();K();Qm();ma();Mn();l1();p1();g1();bb();bt();Go();we();w1=!1});var Pp={};j(Pp,{applyRelayUpdate:()=>yD,checkRelayUpdate:()=>bD,getRelayBundleDir:()=>fD,setRelayBundleDir:()=>gD});function cc(){let e=co.get();if(e)try{return new URL(e).origin}catch{}return"http://localhost:18080"}function E1(){return W.replace(/\/+$/,"")+"/Shared Documents/memola"}async function fD(){try{let e=await fetch(cc()+"/memola/bundle-dir",{signal:AbortSignal.timeout(4e3)});if(!e.ok)return null;let t=await e.json();return{dir:String(t.dir||""),exists:!!t.exists,hasBundle:!!t.hasBundle}}catch{return null}}async function gD(e){try{let t=await fetch(cc()+"/memola/bundle-dir",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({dir:e}),signal:AbortSignal.timeout(4e3)});if(!t.ok)return null;let o=await t.json();return{dir:String(o.dir||""),exists:!!o.exists,hasBundle:!!o.hasBundle}}catch{return null}}async function T1(){try{return(await fetch(cc()+"/memola/health",{signal:AbortSignal.timeout(3e3)})).ok}catch{return!1}}async function hD(){try{let e=await fetch(E1()+"/relay-version.txt?t="+Date.now(),{credentials:"same-origin",cache:"no-cache"});if(!e.ok)return null;let t=JSON.parse(await e.text());return t.version&&Array.isArray(t.files)?t:null}catch{return null}}async function L1(){try{let e=await fetch(cc()+"/memola/relay/version",{signal:AbortSignal.timeout(7e3)});return e.ok?await e.json():null}catch{return null}}async function bD(){if(!await T1())return{available:null,detail:"relay \u672A\u8D77\u52D5"};let[e,t]=await Promise.all([hD(),L1()]);return e?t?.version?e.version===t.version?{available:null,detail:`\u540C\u3058\u30D0\u30FC\u30B8\u30E7\u30F3 (v${t.version})`}:{available:{localVersion:t.version,remoteVersion:e.version,files:e.files},detail:`v${t.version} \u2192 v${e.version}`}:{available:null,detail:"relay /memola/relay/version \u53D6\u5F97\u5931\u6557"}:{available:null,detail:"SP \u306E relay-version.txt \u53D6\u5F97\u5931\u6557(\u914D\u7F6E\u3092\u78BA\u8A8D)"}}async function vD(e){try{let t=await fetch(E1()+"/"+e+"?t="+Date.now(),{credentials:"same-origin",cache:"no-cache"});if(!t.ok)return null;let o=await t.arrayBuffer();if(!o.byteLength)return null;let n="",r=new Uint8Array(o);for(let a=0;a<r.length;a+=32768)n+=String.fromCharCode.apply(null,Array.from(r.subarray(a,a+32768)));return{name:e,contentBase64:btoa(n)}}catch{return null}}async function yD(e){let t=[];for(let n of e){let r=await vD(n);if(!r)return{ok:!1,relayBackUp:!0,newVersion:null,error:`SP \u304B\u3089\u306EDL\u5931\u6557: ${n}`};t.push(r)}try{let n=await fetch(cc()+"/memola/relay/self-update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({files:t}),signal:AbortSignal.timeout(3e4)});if(!n.ok){let r="";try{r=(await n.json())?.error?.detail??""}catch{}return{ok:!1,relayBackUp:!0,newVersion:null,error:`self-update HTTP ${n.status}: ${r}`}}try{await n.json()}catch{}}catch{}let o=Date.now();for(;Date.now()-o<25e3;)if(await new Promise(n=>setTimeout(n,1e3)),await T1())return{ok:!0,relayBackUp:!0,newVersion:(await L1())?.version??null};return{ok:!1,relayBackUp:!1,newVersion:null,error:"relay \u304C25\u79D2\u4EE5\u5185\u306B\u518D\u8D77\u52D5\u3057\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u624B\u52D5\u3067 memola-start.bat \u3092\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044"}}var Cp=L(()=>{"use strict";Fe();be()});var M1={};j(M1,{countResetTargets:()=>wD,resetAll:()=>ED,resetMyPrivateData:()=>kD,resetOthersData:()=>ID});async function xb(){let e=Qt(),t=[Ee(ce)];return e!==ce&&t.push(Ee(e).catch(()=>[])),(await Promise.all(t)).flat()}async function xD(){let e=W+"/_api/web/lists?$select=Title&$filter="+encodeURIComponent("startswith(Title,'memola-')")+"&$top=500";return(await ne(e).catch(()=>null))?.results?.map(o=>o.Title)||[]}async function wb(e,t){let o=[],n=0,a=["(startswith(Title,'memola-') or substringof('memola-',DirName))"];t&&e&&a.push("DeletedById eq "+e);let i=a.join(" and "),s=await xe().catch(()=>"");if(!s)return o.push("digest \u53D6\u5F97\u5931\u6557 (recycle bin \u30B9\u30AD\u30C3\u30D7)"),{count:n,errors:o};for(let l of["web","site"]){let c=W+"/_api/"+l+"/recycleBin?$select=Id,Title,DirName&$filter="+encodeURIComponent(i)+"&$top=5000",m=await ne(c).catch(u=>(o.push(`${l} bin \u53D6\u5F97\u5931\u6557: ${u.message||u}`),null));if(!m?.results)continue;let p=0;for(let u of m.results){p>0&&p%50===0&&(s=await xe().catch(()=>s)),p++;try{let f=await fetch(W+"/_api/"+l+"/RecycleBin('"+u.Id+"')/DeleteObject()",{method:"POST",headers:{"X-RequestDigest":s,Accept:"application/json;odata=verbose"},credentials:"include"});if(f.ok||f.status===404){n++;continue}if(f.status===401||f.status===403){s=await xe().catch(()=>s);let g=await fetch(W+"/_api/"+l+"/RecycleBin('"+u.Id+"')/DeleteObject()",{method:"POST",headers:{"X-RequestDigest":s,Accept:"application/json;odata=verbose"},credentials:"include"});if(g.ok||g.status===404){n++;continue}o.push((u.Title||u.Id)+": "+g.status+" (\u6A29\u9650\u4E0D\u8DB3? \u518D\u8A66\u884C\u3082\u5931\u6557)");continue}o.push((u.Title||u.Id)+": HTTP "+f.status)}catch(f){o.push((u.Title||u.Id)+": "+f.message)}}}return{count:n,errors:o}}async function S1(e,t,o){let{deleteListItem:n}=await Promise.resolve().then(()=>(De(),po)),{deleteRowEntry:r}=await Promise.resolve().then(()=>(V(),$e)),a=0,i=[];try{i=await Ee("memola-daily")}catch(s){return s.message?.includes("404")||o.push("memola-daily \u53D6\u5F97\u5931\u6557: "+s.message),0}for(let s of i){let l=s.AuthorId||0;if(t==="mine"?l===e:l!==e)try{await n("memola-daily",s.Id),await r("memola-daily",s.Id).catch(()=>{}),a++}catch(m){o.push("memola-daily row #"+s.Id+": "+m.message)}}return a}async function wD(e){let t=d.meta.myUserId||await ut().catch(()=>0),o=[];try{o=await xb()}catch{return{pages:0,dbs:0,dailyRows:0}}let n=o.filter(s=>s.PageType==="row"||e!=="all"&&s.PageType==="database"&&s.ListTitle==="memola-daily"?!1:e==="all"?!0:e==="mine"?s.Scope==="user"&&s.AuthorId===t:s.Scope==="org"||s.Scope==="user"&&s.AuthorId!==t||!s.Scope&&s.AuthorId!==t),r=0,a=0;for(let s of n)s.PageType==="database"?a++:r++;let i=0;if(e==="mine"||e==="others")try{let s=await Ee("memola-daily");for(let l of s){let c=l.AuthorId||0;(e==="mine"?c===t:c!==t)&&i++}}catch{}return{pages:r,dbs:a,dailyRows:i}}async function kD(){let e={pagesDeleted:0,dbsDeleted:0,spListsDeleted:0,recycleBinPurged:0,errors:[]},t=d.meta.myUserId||await ut().catch(()=>0);if(!t)return e.errors.push("SP \u30E6\u30FC\u30B6 ID \u3092\u89E3\u6C7A\u3067\u304D\u307E\u305B\u3093 \u2014 \u4E2D\u6B62"),e;let n=(await xb()).filter(a=>a.PageType!=="row"&&a.Scope==="user"&&a.AuthorId===t&&!(a.PageType==="database"&&a.ListTitle==="memola-daily"));for(let a of n)try{await Nr(String(a.Id)),a.PageType==="database"?e.dbsDeleted++:e.pagesDeleted++}catch(i){e.errors.push(i.message)}e.pagesDeleted+=await S1(t,"mine",e.errors);let r=await wb(t,!0);e.recycleBinPurged=r.count,e.errors.push(...r.errors);try{await dt()}catch{}return e}async function ID(){let e={pagesDeleted:0,dbsDeleted:0,spListsDeleted:0,recycleBinPurged:0,errors:[]},t=d.meta.myUserId||await ut().catch(()=>0),n=(await xb()).filter(a=>a.PageType!=="row"&&(a.Scope==="org"||a.Scope==="user"&&a.AuthorId!==t||!a.Scope&&a.AuthorId!==t)&&!(a.PageType==="database"&&a.ListTitle==="memola-daily"));for(let a of n)try{await Nr(String(a.Id)),a.PageType==="database"?e.dbsDeleted++:e.pagesDeleted++}catch(i){e.errors.push(i.message)}e.pagesDeleted+=await S1(t,"others",e.errors);let r=await wb(t,!0);e.recycleBinPurged=r.count,e.errors.push(...r.errors);try{await dt()}catch{}return e}async function ED(){let e={pagesDeleted:0,dbsDeleted:0,spListsDeleted:0,recycleBinPurged:0,errors:[]},t=await xD();for(let n of t)try{await Na(n),e.spListsDeleted++}catch(r){e.errors.push(n+": "+r.message)}let o=await wb(0,!1);e.recycleBinPurged=o.count,e.errors.push(...o.errors);try{let n=[];for(let r=0;r<localStorage.length;r++){let a=localStorage.key(r);a&&a.startsWith("memola.")&&n.push(a)}for(let r of n)localStorage.removeItem(r)}catch(n){e.errors.push("localStorage: "+n.message)}try{let{ragHardReset:n}=await Promise.resolve().then(()=>(zf(),Ox));await n()}catch(n){e.errors.push("rag: "+n.message)}return e}var P1=L(()=>{"use strict";q();Zt();De();Lt();Fe();wr();V()});function B1(){if(A1)return;A1=!0;let e=document.getElementById("memola-settings-btn"),t=document.getElementById("memola-settings-md"),o=document.getElementById("memola-set-aikey"),n=document.getElementById("memola-set-provider"),r=document.getElementById("memola-set-claude-model"),a=document.getElementById("memola-set-corpai-model"),i=document.getElementById("memola-set-corpai-key"),s=document.getElementById("memola-set-corpai-baseurl"),l=document.getElementById("memola-set-corpai-prefix"),c=document.getElementById("memola-set-corpai-overrides"),m=document.getElementById("memola-set-localai-baseurl"),p=document.getElementById("memola-set-localai-key"),u=document.getElementById("memola-set-localai-model"),f=document.getElementById("memola-set-localai-models"),g=document.getElementById("memola-set-localai-reasoning"),y=document.getElementById("memola-set-embed-provider"),b=document.getElementById("memola-set-voyage-key"),h=document.getElementById("memola-set-voyage-model"),v=document.getElementById("memola-set-embed-model"),w=document.getElementById("memola-set-embed-apiver"),x=document.getElementById("memola-set-embed-dims"),T=document.getElementById("memola-set-rag-topk"),E=document.getElementById("memola-set-rag-minscore"),C=document.getElementById("memola-set-density"),U=document.getElementById("memola-set-theme"),M=document.getElementById("memola-set-savedelay"),N=document.getElementById("memola-set-syncpoll"),D=document.getElementById("memola-set-presence");if(document.getElementById("memola-set-shortcuts")?.addEventListener("click",()=>Oh()),document.getElementById("memola-set-relay-update")?.addEventListener("click",()=>{LD()}),document.getElementById("memola-set-reset-mine")?.addEventListener("click",()=>kb("mine","\u81EA\u5206\u306E\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u306E\u307F\u524A\u9664")),document.getElementById("memola-set-reset-others")?.addEventListener("click",()=>kb("others","\u7D44\u7E54+\u4ED6\u4EBA\u306E\u30C7\u30FC\u30BF\u3092\u524A\u9664")),document.getElementById("memola-set-reset-all")?.addEventListener("click",()=>kb("all","\u5168\u30C7\u30FC\u30BF + \u8A2D\u5B9A\u3092\u521D\u671F\u5316")),!e||!t||!o||!n||!r||!a||!i||!s||!l||!c||!m||!p||!u||!f||!g||!C||!U||!M||!N||!D)return;Promise.resolve().then(()=>(_t(),Kn)).then(se=>{se.CLAUDE_MODELS.forEach(F=>{let de=document.createElement("option");de.value=F.id,de.textContent=F.label,r.appendChild(de)}),se.CORP_AI_MODELS.forEach(F=>{let de=document.createElement("option");de.value=F.id,de.textContent=F.id+(F.reasoning?" (\u63A8\u8AD6)":"")+(F.vision?" \u{1F5BC}":""),a.appendChild(de)}),v&&se.EMBEDDING_MODELS.forEach(F=>{let de=document.createElement("option");de.value=F,de.textContent=F,v.appendChild(de)}),h&&se.VOYAGE_MODELS.forEach(F=>{let de=document.createElement("option");de.value=F,de.textContent=F,h.appendChild(de)})});let O=n;function Y(){let se=O.value,F=y?.value||"voyage";document.querySelectorAll(".memola-set-row[data-prov],.memola-set-row[data-embprov]").forEach(de=>{let Ie=de.dataset.prov,Et=de.dataset.embprov,We=!Ie||Ie.split(",").map(Gt=>Gt.trim()).includes(se),Ht=!Et||Et.split(",").map(Gt=>Gt.trim()).includes(F);de.style.display=We&&Ht?"":"none"})}O.addEventListener("change",Y),y?.addEventListener("change",Y),document.querySelectorAll(".memola-set-tab").forEach(se=>{se.addEventListener("click",()=>{let F=se.dataset.tab;F&&(document.querySelectorAll(".memola-set-tab").forEach(de=>de.classList.toggle("on",de===se)),document.querySelectorAll(".memola-set-pane").forEach(de=>de.classList.toggle("on",de.dataset.pane===F)),F==="dev"&&TD())})}),e.addEventListener("click",()=>{document.querySelectorAll(".memola-set-tab").forEach(F=>F.classList.toggle("on",F.dataset.tab==="ai")),document.querySelectorAll(".memola-set-pane").forEach(F=>F.classList.toggle("on",F.dataset.pane==="ai"));let se=document.getElementById("memola-set-build-id");se&&(se.textContent="260606-0844-7d77c4"),Promise.resolve().then(()=>(_t(),Kn)).then(F=>{try{n.value=F.getProvider(),r.value=F.getClaudeModel(),a.value=F.getCorpAiModel(),o.value=Wr()||"",i.value=F.getCorpAiKey(),s.value=F.getCorpAiBaseUrl(),l.value=F.getCorpAiDeploymentPrefix(),c.value=F.getCorpAiOverridesRaw(),m.value=F.getLocalAiBaseUrl(),p.value=F.getLocalAiKey(),u.value=F.getLocalAiModel(),f.value=F.getLocalAiModels().join(`
`),g.value=F.getLocalAiReasoningModels().join(" "),y&&(y.value=F.getEmbedProvider()),b&&(b.value=F.getVoyageKey()),h&&(h.value=F.getVoyageModel()),v&&(v.value=F.getEmbeddingModel()),w&&(w.value=F.getEmbeddingApiVersion()),x&&(x.value=F.getEmbeddingDimensions()?.toString()||""),T&&(T.value=String(F.getRagTopK())),E&&(E.value=String(F.getRagMinScore()));let de=document.getElementById("memola-set-rag-extvec-folder");de&&(de.value=Ca.get());{let Ie=new Set(Aa.get().split(",").map(Et=>Et.trim()));for(let Et of C1){let We=document.getElementById("memola-set-rag-extvec-"+Et);We&&(We.checked=Ie.has(Et))}}C.value=ls.get(),U.value=cs.get(),M.value=Ba.get(),N.value=Cn.get(),D.value=yr.get();{let Ie=document.getElementById("memola-set-dev-source"),Et=document.getElementById("memola-set-dev-localbase");Ie&&(Ie.value=is.get()==="local"?"local":"sharepoint"),Et&&(Et.value=Tc.get())}}catch{}Y(),t.classList.add("on")})});let oe=!1;t.addEventListener("mousedown",se=>{oe=se.target===t}),t.addEventListener("click",se=>{se.target===t&&oe&&t.classList.remove("on"),oe=!1}),document.getElementById("memola-set-cancel")?.addEventListener("click",()=>t.classList.remove("on")),document.getElementById("memola-set-save")?.addEventListener("click",()=>{let se=c.value.trim();if(se)try{let F=JSON.parse(se);if(!F||typeof F!="object"||Array.isArray(F)){k("\u30AA\u30FC\u30D0\u30FC\u30E9\u30A4\u30C9 JSON \u306F\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u5F62\u5F0F\u3067\u66F8\u3044\u3066\u304F\u3060\u3055\u3044","err");return}}catch(F){k("\u30AA\u30FC\u30D0\u30FC\u30E9\u30A4\u30C9 JSON \u304C\u4E0D\u6B63\u3067\u3059: "+F.message,"err");return}Promise.resolve().then(()=>(_t(),Kn)).then(F=>{try{F.setProvider(n.value),r.value&&F.setClaudeModel(r.value),a.value&&F.setCorpAiModel(a.value),Vf(o.value),F.setCorpAiKey(i.value),F.setCorpAiBaseUrl(s.value),F.setCorpAiDeploymentPrefix(l.value),F.setCorpAiOverridesRaw(c.value),F.setLocalAiBaseUrl(m.value),F.setLocalAiKey(p.value),F.setLocalAiModel(u.value);let Ie=f.value.split(/\r?\n/).map(We=>We.trim()).filter(Boolean);F.setLocalAiModels(Ie),F.setLocalAiReasoningModels(g.value),y&&F.setEmbedProvider(y.value),b&&F.setVoyageKey(b.value),h&&F.setVoyageModel(h.value),v&&F.setEmbeddingModel(v.value),w&&F.setEmbeddingApiVersion(w.value),x&&F.setEmbeddingDimensions(x.value),T&&F.setRagTopK(T.value),E&&F.setRagMinScore(E.value);{let We=document.getElementById("memola-set-rag-extvec-folder");We&&Ca.set(We.value.trim());let Ht=[];for(let Gt of C1)document.getElementById("memola-set-rag-extvec-"+Gt)?.checked&&Ht.push(Gt);Aa.set(Ht.join(","))}{let We=document.getElementById("memola-set-dev-source"),Ht=document.getElementById("memola-set-dev-localbase");We&&(We.value==="local"?is.set("local"):is.clear()),Ht&&Tc.set(Ht.value.trim());let Gt=document.getElementById("memola-set-dev-relaydir");Gt&&Gt.value.trim()&&Promise.resolve().then(()=>(Cp(),Pp)).then(Yt=>Yt.setRelayBundleDir(Gt.value.trim()).then(gr=>{let mc=document.getElementById("memola-set-dev-relaydir-status");mc&&(mc.textContent=gr?`\u73FE\u5728: ${gr.dir} ${gr.hasBundle?"\u2705 memola.bundle.js \u3042\u308A":"\u26A0 memola.bundle.js \u304C\u7121\u3044"}`:"\u26A0 relay \u672A\u8D77\u52D5 / \u8A2D\u5B9A\u5931\u6557")}))}ls.set(C.value),cs.set(U.value),Ba.set(M.value),Cn.set(N.value);let Et=yr.get();yr.set(D.value),d.sync.pageId&&d.sync.loadedModified&&d.sync.loadedEtag&&Promise.resolve().then(()=>(Xr(),Gm)).then(We=>{We.startWatching(d.sync.pageId,d.sync.loadedModified,d.sync.loadedEtag)}),Et!==D.value&&Promise.resolve().then(()=>(Vl(),kh)).then(We=>{D.value==="0"?We.shutdownPresence():We.syncPresenceForCurrent()})}catch{}let de=document.getElementById("memola-overlay");de&&(de.dataset.density=C.value,de.dataset.theme=U.value),Promise.resolve().then(()=>(fr(),es)).then(Ie=>Ie.syncProviderBadge?.()),t.classList.remove("on"),k("\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F")})});let Me=document.getElementById("memola-overlay");Me&&(Me.dataset.density=ls.get(),Me.dataset.theme=cs.get())}async function TD(){let e=document.getElementById("memola-set-dev-relaydir"),t=document.getElementById("memola-set-dev-relaydir-status");t&&(t.textContent="relay \u306B\u7167\u4F1A\u4E2D\u2026");let{getRelayBundleDir:o}=await Promise.resolve().then(()=>(Cp(),Pp)),n=await o();if(!n){t&&(t.textContent="\u26A0 relay \u672A\u8D77\u52D5 / \u5FDC\u7B54\u306A\u3057(memola-start.bat \u3067\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044)");return}e&&!e.value&&(e.value=n.dir),t&&(t.textContent=`\u73FE\u5728: ${n.dir}  ${n.hasBundle?"\u2705 memola.bundle.js \u3042\u308A":"\u26A0 memola.bundle.js \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093"}`)}async function LD(){let e=document.getElementById("memola-set-relay-update-msg"),t=s=>{e&&(e.textContent=s)},{checkRelayUpdate:o,applyRelayUpdate:n}=await Promise.resolve().then(()=>(Cp(),Pp));t("\u78BA\u8A8D\u4E2D\u2026");let r=await o();if(!r.available){t("\u66F4\u65B0\u306A\u3057: "+r.detail);return}let a=r.available;if(!confirm(`\u30EA\u30EC\u30FC\u3092\u66F4\u65B0\u3057\u307E\u3059\u3002
  ${a.localVersion} \u2192 ${a.remoteVersion}
\u5BFE\u8C61: ${a.files.join(", ")}
\u30EA\u30EC\u30FC\u306F\u4E00\u5EA6\u505C\u6B62\u3057\u3066\u518D\u8D77\u52D5\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?`)){t("\u30AD\u30E3\u30F3\u30BB\u30EB\u3057\u307E\u3057\u305F ("+r.detail+")");return}t("\u66F4\u65B0\u3092\u9069\u7528\u4E2D\u2026 (\u30EA\u30EC\u30FC\u518D\u8D77\u52D5\u3092\u5F85\u3063\u3066\u3044\u307E\u3059\u3002\u6700\u592725\u79D2)");let i=await n(a.files);i.ok?(t(`\u2705 \u66F4\u65B0\u5B8C\u4E86\u3002\u30EA\u30EC\u30FC v${i.newVersion??"?"} \u3067\u518D\u8D77\u52D5\u3057\u307E\u3057\u305F\u3002`),k("\u30EA\u30EC\u30FC\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F","ok")):(t("\u274C "+(i.error||"\u66F4\u65B0\u5931\u6557")),k("\u30EA\u30EC\u30FC\u66F4\u65B0\u306B\u5931\u6557: "+(i.error||""),"err"))}async function kb(e,t){let o=await Promise.resolve().then(()=>(P1(),M1));_(!0,"\u5BFE\u8C61\u3092\u96C6\u8A08\u4E2D...");let n;try{n=await o.countResetTargets(e)}catch(i){_(!1),k("\u96C6\u8A08\u5931\u6557: "+i.message,"err");return}_(!1);let r=n.pages+n.dbs+n.dailyRows,a=e==="all"?"\u5168 memola-* SP \u30EA\u30B9\u30C8 + \u5168 memola.* localStorage \u30AD\u30FC":`\u30DA\u30FC\u30B8 ${n.pages} \u4EF6 + DB ${n.dbs} \u4EF6`+(n.dailyRows>0?` + \u30C7\u30A4\u30EA\u30FC ${n.dailyRows} \u4EF6`:"");if(r===0&&e!=="all"){k("\u524A\u9664\u5BFE\u8C61\u306E\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093");return}if(confirm("\u3010"+t+`\u3011

\u524A\u9664\u5BFE\u8C61: `+a+`

\u26A0 \u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002SP \u306E\u3054\u307F\u7BB1\u304B\u3089\u3082\u5FA9\u5143\u3067\u304D\u307E\u305B\u3093\u3002

\u672C\u5F53\u306B\u5B9F\u884C\u3057\u307E\u3059\u304B?`)&&confirm("\u6700\u7D42\u78BA\u8A8D: \u5B9F\u884C\u3059\u308B\u3068\u5373\u5EA7\u306B SP \u304B\u3089\u30C7\u30FC\u30BF\u304C\u524A\u9664\u3055\u308C\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?")){_(!0,"\u524A\u9664\u4E2D... (\u6642\u9593\u304C\u304B\u304B\u308B\u5834\u5408\u304C\u3042\u308A\u307E\u3059)");try{let i=e==="mine"?await o.resetMyPrivateData():e==="others"?await o.resetOthersData():await o.resetAll(),s=e==="all"?`SP \u30EA\u30B9\u30C8 ${i.spListsDeleted} \u4EF6 / \u5B8C\u5168\u524A\u9664 ${i.recycleBinPurged} \u4EF6`:`\u30DA\u30FC\u30B8 ${i.pagesDeleted} / DB ${i.dbsDeleted} / \u5B8C\u5168\u524A\u9664 ${i.recycleBinPurged} \u4EF6`,l="";if(i.errors.length>0){let c=i.errors[0].length>80?i.errors[0].slice(0,80)+"\u2026":i.errors[0];l=i.errors.length===1?` (\u5931\u6557 1 \u4EF6: ${c})`:` (\u5931\u6557 ${i.errors.length} \u4EF6\u3001\u6700\u521D: ${c})`,console.warn("[Memola reset errors]",i.errors),setTimeout(()=>{let m=i.errors.slice(0,20).join(`
`),p=i.errors.length>20?`
\u2026\u4ED6 ${i.errors.length-20} \u4EF6 (\u30B3\u30F3\u30BD\u30FC\u30EB\u53C2\u7167)`:"";alert(`\u3010\u30EA\u30BB\u30C3\u30C8\u306E\u5931\u6557\u8A73\u7D30 \u2014 ${i.errors.length} \u4EF6\u3011

${m}${p}`)},800)}if(e!=="all"){let{renderTree:c}=await Promise.resolve().then(()=>(_e(),ko));c();let m=await Promise.resolve().then(()=>(K(),ie));if(d.currentRow){let p=d.currentRow.dbId,u=d.pages.some(f=>f.Id===p);if(d.currentRow=null,u){let f=d.pages.find(g=>g.Id===p);f&&await m.doSelectDb(p,f)}else d.currentId=null,tt("empty")}else if(d.currentType==="database"&&d.currentId){let p=d.pages.find(u=>u.Id===d.currentId);p?await m.doSelectDb(d.currentId,p):(d.currentId=null,tt("empty"))}else d.currentId&&d.pages.some(u=>u.Id===d.currentId)||(d.currentId=null,tt("empty"))}k(t+" \u5B8C\u4E86: "+s+l,i.errors.length>0?"err":"ok"),document.getElementById("memola-settings-md")?.classList.remove("on"),e==="all"&&setTimeout(()=>{confirm("\u5B8C\u5168\u30EA\u30BB\u30C3\u30C8\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002SP \u30DA\u30FC\u30B8\u3092\u4ECA\u3059\u3050\u30EA\u30ED\u30FC\u30C9\u3057\u307E\u3059\u304B?")&&location.reload()},500)}catch(i){k("\u30EA\u30BB\u30C3\u30C8\u5931\u6557: "+i.message,"err")}finally{_(!1)}}}var C1,A1,D1=L(()=>{"use strict";q();le();K();vi();be();cp();C1=["mail","onenote","pptx","doc","transcript"],A1=!1});var N1={};j(N1,{attachPaneResizers:()=>PD});function SD(e){let t=document.getElementById(e.paneId);if(!t)return;let o=e.pref.get();if(!o)return;let n=parseInt(o,10);isNaN(n)||(t.style.width=Math.min(e.max,Math.max(e.min,n))+"px")}function R1(e){let t=document.getElementById(e.paneId);if(!t)return;let o=t.querySelector(":scope > .memola-pane-resize");o||(o=document.createElement("div"),o.className="memola-pane-resize memola-pane-resize-"+e.edge,o.title="\u5E45\u3092\u5909\u66F4 (\u30C9\u30E9\u30C3\u30B0)",t.appendChild(o),t.style.position=t.style.position||"relative",o.addEventListener("mousedown",n=>MD(n,e)),o.addEventListener("dblclick",()=>{e.pref.clear(),t.style.width=""})),o.style.display=e.enabled&&!e.enabled()?"none":""}function MD(e,t){let o=document.getElementById(t.paneId);if(!o)return;let n=o;e.preventDefault(),e.stopPropagation();let r=e.clientX,a=n.offsetWidth,i=t.edge==="right"?1:-1;document.body.style.cursor="col-resize",document.body.style.userSelect="none";let s=document.getElementById("memola-overlay");s?.classList.add("memola-resizing");function l(m){let p=(m.clientX-r)*i,u=Math.min(t.max,Math.max(t.min,a+p));n.style.width=u+"px"}function c(){document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",c),document.body.style.cursor="",document.body.style.userSelect="",s?.classList.remove("memola-resizing"),t.pref.set(String(n.offsetWidth))}document.addEventListener("mousemove",l),document.addEventListener("mouseup",c)}function PD(){_1.forEach(t=>{SD(t),R1(t)});let e=document.getElementById("memola-sb");e&&new MutationObserver(()=>{let o=_1.find(n=>n.paneId==="memola-sb");o&&R1(o)}).observe(e,{attributes:!0,attributeFilter:["class"]})}var _1,O1=L(()=>{"use strict";be();_1=[{paneId:"memola-sb",edge:"right",pref:Up,min:160,max:360,enabled:()=>{let e=document.getElementById("memola-sb");return!!e&&!e.classList.contains("collapsed")}},{paneId:"memola-outline",edge:"right",pref:zp,min:180,max:400},{paneId:"memola-props",edge:"left",pref:jp,min:200,max:480},{paneId:"memola-ai-panel",edge:"left",pref:qp,min:240,max:500}]});function F1(){if(H1)return;H1=!0,I("ai-btn").addEventListener("click",oc),I("ai-close").addEventListener("click",gp),I("ai-clear").addEventListener("click",eb),document.getElementById("memola-ai-new")?.addEventListener("click",()=>fp()),I("ai-hist").addEventListener("change",()=>{let n=I("ai-hist").value;n==="__new__"?fp():Xh(n)}),ur(),Zh(),Promise.resolve().then(()=>(O1(),N1)).then(n=>n.attachPaneResizers()),Promise.resolve().then(()=>(fr(),es)).then(n=>n.syncProviderBadge?.());let e=document.getElementById("memola-ai-model-pick");e&&e.addEventListener("change",()=>{Promise.resolve().then(()=>(fr(),es)).then(n=>n.applyModelPick?.(e.value))}),I("ai-send").addEventListener("click",()=>{let n=I("ai-input");nc(n.value)}),I("ai-input").addEventListener("keydown",n=>{let r=n;if(!(r.isComposing||r.keyCode===229)&&r.key==="Enter"&&!r.shiftKey){n.preventDefault();let a=I("ai-input");nc(a.value)}});let t=I("ai-input");t.addEventListener("input",()=>{t.style.height="auto",t.style.height=Math.min(t.scrollHeight,232)+"px",t.scrollTop=t.scrollHeight});let o=I("ai-chips");tb().forEach(n=>{let r=document.createElement("button");r.className="memola-ai-chip",r.textContent=n.label,r.addEventListener("click",()=>{nc(n.prompt)}),o.appendChild(r)})}var H1,U1=L(()=>{"use strict";me();fr();H1=!1});function Ib(){let e=document.getElementById("memola-overlay");if(!e)return;if(Da.get()==="1")e.classList.add("focus-mode"),document.getElementById("memola-sb")?.classList.add("collapsed");else{e.classList.remove("focus-mode");let o=_a.get(),n=document.getElementById("memola-sb");n&&(n.classList.remove("collapsed"),o==="collapsed"&&n.classList.add("collapsed"))}}function Ap(){Da.get()==="1"?Da.clear():Da.set("1"),Ib()}function Bp(){let e=document.getElementById("memola-sb");e&&(window.innerWidth<900?e.classList.contains("collapsed")||(e.dataset.autoCollapsed="1",e.classList.add("collapsed")):e.dataset.autoCollapsed==="1"&&(delete e.dataset.autoCollapsed,e.classList.remove("collapsed")))}var Eb=L(()=>{"use strict";be()});function _p(){I("trash-md").classList.add("on"),Dp();let t=document.getElementById("memola-trash-empty");t&&!t.dataset.wired&&(t.dataset.wired="1",t.addEventListener("click",()=>{CD()}))}function Lb(){I("trash-md").classList.remove("on")}async function z1(){let e=d.meta.myUserId||0,t=(r,a)=>r!=="user"||!e||!a?!1:a!==e,o=[];for(let r of Au()){let a=B(r.id);t(a?.scope,a?.authorId||0)||o.push({kind:r.type==="database"?"database":"page",bodyId:r.id,title:r.title,trashedAt:r.trashed,trashedBy:a?.trashedBy||0})}let n=[];try{n=await vu()}catch{}for(let r of n){if(t(r.scope,r.authorId))continue;let a=d.meta.pages.find(i=>i.type==="database"&&i.list===r.listTitle);a&&t(a.scope,a.authorId||0)||o.push({kind:"row",bodyId:String(r.bodyId),title:r.title||"(\u7121\u984C\u306E\u884C)",trashedAt:r.trashedAt,trashedBy:r.trashedBy,rowListTitle:r.listTitle,rowDbRowId:r.dbRowId,rowParentDbTitle:a?.title||"(\u524A\u9664\u6E08\u307FDB)"})}return o.sort((r,a)=>a.trashedAt-r.trashedAt),o}async function Tb(e){if(d.dbList===e)try{let{getListItems:t}=await Promise.resolve().then(()=>(De(),po)),o=await t(e);d.dbItems=o.filter(r=>!(typeof r.Trashed=="number"&&r.Trashed>0));let{renderDbTable:n}=await Promise.resolve().then(()=>(K(),ie));n()}catch{}}async function CD(){let e=await z1(),t=d.meta.myUserId||0,o=e.filter(c=>c.trashedBy===t),n=e.filter(c=>c.trashedBy!==t);if(o.length===0){n.length>0?k(`\u4ED6\u306E\u30E6\u30FC\u30B6\u306E ${n.length} \u4EF6\u306F\u3042\u306A\u305F\u304C\u5B8C\u5168\u524A\u9664\u3067\u304D\u307E\u305B\u3093`):k("\u30B4\u30DF\u7BB1\u306F\u7A7A\u3067\u3059");return}let r=`${o.length} \u4EF6\u3092\u3059\u3079\u3066\u5B8C\u5168\u524A\u9664\u3057\u307E\u3059\u3002\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002
`+(n.length>0?`(\u4ED6\u306E\u30E6\u30FC\u30B6\u306E ${n.length} \u4EF6\u306F\u5BFE\u8C61\u5916\u3067\u6B8B\u308A\u307E\u3059)
`:"")+"\u3088\u308D\u3057\u3044\u3067\u3059\u304B?";if(!confirm(r))return;_(!0,"\u5B8C\u5168\u524A\u9664\u4E2D...");let a=0,i=0,s=new Set;for(let c of o)try{c.kind==="row"&&c.rowListTitle&&c.rowDbRowId?(await od(c.rowListTitle,c.rowDbRowId),s.add(c.rowListTitle)):await Nr(c.bodyId),a++}catch{i++}try{await dt()}catch{}for(let c of s)await Tb(c);_(!1),te(),Dp();let l=`${a} \u4EF6\u524A\u9664\u3057\u307E\u3057\u305F`;i>0&&(l+=` (\u5931\u6557 ${i} \u4EF6)`),n.length>0&&(l+=` / \u4ED6\u306E\u30E6\u30FC\u30B6\u306E ${n.length} \u4EF6\u306F\u6B8B\u3063\u3066\u3044\u307E\u3059`),k(l)}async function Dp(){let e=I("trash-list");e.innerHTML='<div class="memola-trash-empty">\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026</div>';let t=await z1();if(e.innerHTML="",t.length===0){e.innerHTML='<div class="memola-trash-empty">\u30B4\u30DF\u7BB1\u306F\u7A7A\u3067\u3059</div>';return}let o=Array.from(new Set(t.map(a=>a.trashedBy).filter(a=>a>0))),n=new Map;await Promise.all(o.map(async a=>{let i=await Ua(a);i&&n.set(a,i)}));let r=d.meta.myUserId||0;t.forEach(a=>{let i=document.createElement("div");i.className="memola-trash-row";let s=new Date(a.trashedAt).toLocaleString("ja-JP"),l=a.trashedBy===r?"\u3042\u306A\u305F":n.get(a.trashedBy)||"\u4E0D\u660E",c=a.trashedBy===r,m=a.kind==="database"?"\u{1F5C3} DB":a.kind==="row"?"\u{1F4CB} \u884C":"\u{1F4C4} \u30DA\u30FC\u30B8",p=a.kind==="row"&&a.rowParentDbTitle?` \xB7 ${P(a.rowParentDbTitle)} \u5185`:"";i.innerHTML='<div class="memola-trash-info"><div class="memola-trash-title">'+P(a.title||"(\u7121\u984C)")+'</div><div class="memola-trash-meta">'+m+p+" \xB7 <b>"+P(l)+"</b> \u304C "+s+' \u306B\u524A\u9664</div></div><button class="memola-trash-btn memola-trash-restore" title="\u5FA9\u5143">\u21BA</button><button class="memola-trash-btn memola-trash-purge" '+(c?'title="\u5B8C\u5168\u524A\u9664"':'title="\u4ED6\u306E\u30E6\u30FC\u30B6\u304C\u524A\u9664\u3057\u305F\u9805\u76EE\u306F\u5B8C\u5168\u524A\u9664\u3067\u304D\u307E\u305B\u3093" disabled')+">\u{1F5D1}</button>",i.querySelector(".memola-trash-restore").addEventListener("click",async()=>{try{_(!0,"\u5FA9\u5143\u4E2D..."),a.kind==="row"&&a.rowListTitle&&a.rowDbRowId?(await bu(a.rowListTitle,a.rowDbRowId),await Tb(a.rowListTitle)):await Fs(a.bodyId),await dt(),te(),await Dp(),k("\u5FA9\u5143\u3057\u307E\u3057\u305F")}catch(u){k("\u5FA9\u5143\u5931\u6557: "+u.message,"err")}finally{_(!1)}}),c&&i.querySelector(".memola-trash-purge").addEventListener("click",async()=>{if(confirm("\u5B8C\u5168\u306B\u524A\u9664\u3057\u307E\u3059\u3002\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002"))try{_(!0,"\u524A\u9664\u4E2D..."),a.kind==="row"&&a.rowListTitle&&a.rowDbRowId?(await od(a.rowListTitle,a.rowDbRowId),await Tb(a.rowListTitle)):await Nr(a.bodyId);try{await dt()}catch{}te(),await Dp(),k("\u5B8C\u5168\u306B\u524A\u9664\u3057\u307E\u3057\u305F")}catch(u){k("\u524A\u9664\u5931\u6557: "+u.message,"err")}finally{_(!1)}}),e.appendChild(i)})}var Sb=L(()=>{"use strict";q();me();V();qe();Zt();_e();le();Re();we()});function q1(e){j1||(j1=!0,qh([{id:"new-page",label:"\u65B0\u3057\u3044\u30DA\u30FC\u30B8",icon:"\uFF0B",key:"\u2318N",run:()=>{Eo("")}},{id:"new-db",label:"\u65B0\u3057\u3044DB",icon:"\u{1F5C2}",key:"\u2318\u21E7N",run:()=>{e.doNewDb("")}},{id:"ai-ask",label:"AI\u306B\u8CEA\u554F",icon:"\u2726",key:"\u2318\u21E7A",run:()=>{oc()}},{id:"toc",label:"\u76EE\u6B21\u30D1\u30CD\u30EB\u3092\u5207\u66FF",icon:"\u2630",key:"\u2318\u21E7L",run:()=>{jl()}},{id:"props",label:"\u30D7\u30ED\u30D1\u30C6\u30A3\u30D1\u30CD\u30EB\u3092\u5207\u66FF",icon:"\u25A4",key:"\u2318\u21E7R",run:()=>{ql()}},{id:"focus",label:"\u96C6\u4E2D\u30E2\u30FC\u30C9\u5207\u66FF",icon:"\u26F6",key:"\u2318\u21E7F",run:()=>{Ap()}},{id:"trash",label:"\u30B4\u30DF\u7BB1\u3092\u958B\u304F",icon:"\u{1F5D1}",key:"",run:()=>{_p()}},{id:"settings",label:"\u8A2D\u5B9A",icon:"\u2699",key:"",run:()=>{document.getElementById("memola-settings-md")?.classList.add("on")}}]))}var j1,$1=L(()=>{"use strict";tc();Mn();fr();Hi();Fi();Eb();Sb();j1=!1});var V1={};j(V1,{clearCurrentWorkspace:()=>Pb,ensureWorkspaceSelected:()=>AD,getCurrentWorkspaceName:()=>Np,loadWorkspaces:()=>va,saveWorkspaces:()=>Rp,setCurrentWorkspace:()=>Op,showWorkspaceMenu:()=>ya,switchWorkspace:()=>Mb,validateWorkspaceUrl:()=>K1});function va(){let e=Mc.get();if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function Rp(e){Mc.set(JSON.stringify(e))}function Np(){let e=br.get();return e?va().some(o=>o.name===e)?e:(br.clear(),vr.clear(),""):""}function Op(e,t){br.set(e),vr.set(t)}function Pb(){br.clear(),vr.clear()}async function K1(e){let t=e.trim().replace(/\/$/,"");if(!/^https:\/\//.test(t))return"URL \u306F https:// \u3067\u59CB\u3081\u3066\u304F\u3060\u3055\u3044";if(!/\/sites\/[^/]+/.test(t)&&!/^https:\/\/[^/]+$/.test(t))return"SharePoint \u30B5\u30A4\u30C8 URL \u306E\u5F62\u5F0F\u3067\u306F\u3042\u308A\u307E\u305B\u3093 (\u4F8B: https://contoso.sharepoint.com/sites/team)";try{let o=await fetch(t+"/_api/web?$select=Title",{headers:{Accept:"application/json;odata=verbose"},credentials:"include"});return o.status===404?"\u30B5\u30A4\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093 (404)":o.status===403?"\u30B5\u30A4\u30C8\u3078\u306E\u30A2\u30AF\u30BB\u30B9\u6A29\u304C\u3042\u308A\u307E\u305B\u3093 (403)":o.status===401?"SharePoint \u306B\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u3044\u306A\u3044\u3001\u307E\u305F\u306F\u8A8D\u8A3C\u304C\u5207\u308C\u3066\u3044\u307E\u3059 (401)":o.ok?null:"\u30B5\u30A4\u30C8\u78BA\u8A8D\u306B\u5931\u6557\u3057\u307E\u3057\u305F ("+o.status+")"}catch(o){return"\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F: "+o.message}}async function Mb(e){_(!0,"\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u3092\u5207\u66FF\u4E2D\u2026");try{Op(e.name,e.url),Vp(e.url),cv(),Jp(),Mu(),yu(),X0(),Wp();let{renderTree:t}=await Promise.resolve().then(()=>(_e(),ko)),{showView:o}=await Promise.resolve().then(()=>(K(),ie)),{stopWatching:n}=await Promise.resolve().then(()=>(Xr(),Gm));n(),o("empty"),t(),await dt(),t();let r=document.getElementById("memola-ws-name");r&&(r.textContent=e.name),Promise.resolve().then(()=>(Go(),rr)).then(c=>c.refreshDraftsBadge?.());let a=await Promise.resolve().then(()=>(K(),ie)),i=a.loadLastOpenedPage(),l=(i?d.pages.find(c=>c.Id===i&&!c.IsDraft):null)||d.pages.find(c=>!c.IsDraft)||null;l&&await a.doSelect(l.Id),k("\u300C"+e.name+"\u300D \u306B\u5207\u308A\u66FF\u3048\u307E\u3057\u305F")}catch(t){k("\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u5207\u66FF\u5931\u6557: "+t.message,"err")}finally{_(!1)}}async function AD(){let e=va();if(e.length===0)return;let t=br.get();if(t&&e.some(n=>n.name===t))return;Pb();let o=e.find(n=>n.url.replace(/\/$/,"")===W);if(o){Op(o.name,o.url);return}k("\u73FE\u5728\u306E\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u304C\u524A\u9664\u3055\u308C\u3066\u3044\u307E\u3059 \u2014 \u4E00\u89A7\u304B\u3089\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044","err")}function ya(e){document.getElementById("memola-ws-menu")?.remove();let t=va(),o=Np(),n=document.createElement("div");if(n.id="memola-ws-menu",n.className="memola-ws-menu",t.length===0){let c=document.createElement("div");c.className="memola-ws-empty",c.textContent="\u307E\u3060\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u304C\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u305B\u3093",n.appendChild(c)}else t.forEach(c=>{let m=document.createElement("div");m.className="memola-ws-item"+(c.name===o?" on":""),m.innerHTML='<div class="memola-ws-item-body"><div class="memola-ws-item-name">'+P(c.name)+'</div><div class="memola-ws-item-url">'+P(c.url)+'</div></div><button class="memola-ws-item-rn" title="\u540D\u79F0\u5909\u66F4">'+$.edit+'</button><button class="memola-ws-item-rm" title="\u4E00\u89A7\u304B\u3089\u524A\u9664">'+$.trash+"</button>",m.querySelector(".memola-ws-item-body")?.addEventListener("click",()=>{s(),c.name!==o&&Mb(c)}),m.querySelector(".memola-ws-item-rn")?.addEventListener("click",p=>{p.stopPropagation();let u=prompt("\u65B0\u3057\u3044\u540D\u79F0:",c.name);if(u==null)return;let f=u.trim();if(!f||f===c.name)return;let g=va();if(g.some(b=>b.name===f)){k("\u540C\u3058\u540D\u79F0\u306E\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u304C\u65E2\u306B\u3042\u308A\u307E\u3059","err");return}let y=g.map(b=>b.name===c.name?{...b,name:f}:b);if(Rp(y),o===c.name){Op(f,c.url);let b=document.getElementById("memola-ws-name");b&&(b.textContent=f)}k("\u540D\u79F0\u3092\u5909\u66F4\u3057\u307E\u3057\u305F"),s(),ya(e)}),m.querySelector(".memola-ws-item-rm")?.addEventListener("click",async p=>{if(p.stopPropagation(),!confirm("\u300C"+c.name+"\u300D \u3092\u4E00\u89A7\u304B\u3089\u524A\u9664\u3057\u307E\u3059\u3002SharePoint \u4E0A\u306E\u30C7\u30FC\u30BF\u306B\u306F\u5F71\u97FF\u3057\u307E\u305B\u3093\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?"))return;let u=va().filter(f=>f.name!==c.name);if(Rp(u),k("\u524A\u9664\u3057\u307E\u3057\u305F"),o===c.name){if(u.length>0){s();let g=document.getElementById("memola-ws-name");g&&(g.textContent=u[0].name),await Mb(u[0]),ya(e);return}Pb();let f=document.getElementById("memola-ws-name");f&&(f.textContent="Memola")}s(),ya(e)}),n.appendChild(m)});let r=document.createElement("div");r.className="memola-ws-sep",n.appendChild(r);let a=document.createElement("div");a.className="memola-ws-add",a.textContent="+ \u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u3092\u8FFD\u52A0",a.addEventListener("click",async()=>{let c=prompt("\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u540D (\u4F8B: \u55B6\u696D\u30C1\u30FC\u30E0):");if(!c||!c.trim())return;let m=prompt("SharePoint \u30B5\u30A4\u30C8 URL (\u4F8B: https://contoso.sharepoint.com/sites/sales):");if(!m||!m.trim())return;let p=c.trim(),u=m.trim().replace(/\/$/,""),f=va();if(f.some(y=>y.name===p)){k("\u540C\u3058\u540D\u79F0\u306E\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u304C\u65E2\u306B\u3042\u308A\u307E\u3059","err");return}_(!0,"URL \u3092\u78BA\u8A8D\u4E2D\u2026");let g=null;try{g=await K1(u)}finally{_(!1)}if(g){k("\u8FFD\u52A0\u3067\u304D\u307E\u305B\u3093: "+g,"err");return}f.push({name:p,url:u}),Rp(f),k("\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u300C"+p+"\u300D \u3092\u8FFD\u52A0\u3057\u307E\u3057\u305F"),s(),ya(e)}),n.appendChild(a);let i=e.getBoundingClientRect();n.style.position="fixed",n.style.top=i.bottom+4+"px",n.style.left=i.left+"px",document.getElementById("memola-overlay")?.appendChild(n),setTimeout(()=>{document.addEventListener("click",l)},0);function s(){n.remove(),document.removeEventListener("click",l)}function l(c){!n.contains(c.target)&&c.target!==e&&s()}}var Cb=L(()=>{"use strict";q();Fe();xr();le();wr();De();V();Re();_n();vh();be()});function G1(){if(W1)return;W1=!0,I("outline-btn").addEventListener("click",jl),document.getElementById("memola-outline-x")?.addEventListener("click",()=>{Promise.resolve().then(()=>(Hi(),uh)).then(t=>t.setOutlineOpen(!1))}),ph(),ca(),I("props-btn").addEventListener("click",ql),document.getElementById("memola-props-x")?.addEventListener("click",()=>{Promise.resolve().then(()=>(Fi(),fh)).then(t=>t.setPropertiesOpen(!1))}),da(),I("trash-btn").addEventListener("click",_p),I("trash-close").addEventListener("click",Lb),I("trash-md").addEventListener("click",t=>{t.target===I("trash-md")&&Lb()});let e=Np();e&&(I("ws-name").textContent=e),I("ws-btn").addEventListener("click",t=>{t.stopPropagation(),ya(I("ws-btn"))})}var W1,Y1=L(()=>{"use strict";me();Hi();Fi();Sb();Cb();W1=!1});var oT={};j(oT,{attachInbox:()=>Bb,closeInbox:()=>Fp,navigateToMention:()=>Db,openInbox:()=>Z1,pollMentions:()=>tT,refreshInboxBadge:()=>_b});function Bb(){if(X1)return;X1=!0,document.getElementById("memola-inbox-btn")?.addEventListener("click",Z1),document.getElementById("memola-inbox-close")?.addEventListener("click",Fp),document.getElementById("memola-inbox-readall")?.addEventListener("click",()=>void DD());let e=document.getElementById(Ab);e?.addEventListener("click",t=>{t.target===e&&Fp()}),tT()}function Fp(){document.getElementById(Ab)?.classList.remove("on")}async function Z1(){let e=document.getElementById(Ab);e&&e.classList.add("on"),await Q1()}async function Q1(){let e=document.getElementById("memola-inbox-list");if(e){e.innerHTML='<div class="memola-inbox-empty">\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026</div>';try{rs=await lu()}catch{rs=[]}if(rs.length===0){e.innerHTML='<div class="memola-inbox-empty">\u30E1\u30F3\u30B7\u30E7\u30F3\u306F\u3042\u308A\u307E\u305B\u3093\u3002</div>';return}e.innerHTML=rs.map(t=>{let o=t.Created?An(Date.parse(t.Created)):"";return'<div class="memola-inbox-item'+(t.Read?" read":"")+'" data-id="'+t.Id+'">'+(t.Read?"":'<span class="memola-inbox-dot"></span>')+'<div class="memola-inbox-main"><div class="memola-inbox-line1"><span class="memola-inbox-actor">'+P(t.ActorName||"\u8AB0\u304B")+'</span> \u304C\u3042\u306A\u305F\u3092\u30E1\u30F3\u30B7\u30E7\u30F3<span class="memola-inbox-time">'+P(o)+'</span></div><div class="memola-inbox-page">'+P(t.PageTitle||"(\u30DA\u30FC\u30B8)")+'</div><div class="memola-inbox-snippet">'+P(t.Snippet||"")+"</div></div></div>"}).join(""),e.querySelectorAll(".memola-inbox-item").forEach(t=>{t.addEventListener("click",()=>void BD(Number(t.dataset.id)))})}}async function BD(e){let t=rs.find(o=>o.Id===e);t&&(Fp(),await Db(t))}async function Db(e){await cu(e.Id).catch(()=>{}),Hp.add(e.Id),_b();try{let{doSelect:t}=await Promise.resolve().then(()=>(K(),ie)),{appIdForCommentKey:o}=await Promise.resolve().then(()=>(V(),$e)),n=o(e.PageId)||e.PageId;await t(n),(await Promise.resolve().then(()=>(jo(),yn))).focusComment(e.PageId,e.CommentId)}catch{}}async function DD(){await Promise.all(rs.filter(e=>!e.Read).map(e=>cu(e.Id))),await Q1(),_b()}function eT(e){let t=I("inbox-btn")?.querySelector(".memola-inbox-badge-count");t&&(t.textContent=e>0?"("+e+")":"")}async function _b(){try{eT(await Cv())}catch{}}async function tT(){let e;try{e=await lu()}catch{return}let t=e.filter(o=>!o.Read);if(eT(t.length),!J1){t.forEach(o=>Hp.add(o.Id)),J1=!0;return}for(let o of t)Hp.has(o.Id)||(Hp.add(o.Id),RD(o))}function _D(){let e=document.getElementById("memola-mention-toasts");return e||(e=document.createElement("div"),e.id="memola-mention-toasts",(document.getElementById("memola-overlay")||document.body).appendChild(e)),e}function RD(e){let t=document.createElement("div");t.className="memola-mention-toast",t.innerHTML='<div class="memola-mention-toast-hd">\u{1F4AC} '+P(e.ActorName||"\u8AB0\u304B")+' \u304C\u3042\u306A\u305F\u3092\u30E1\u30F3\u30B7\u30E7\u30F3</div><div class="memola-mention-toast-page">'+P(e.PageTitle||"(\u30DA\u30FC\u30B8)")+"</div>"+(e.Snippet?'<div class="memola-mention-toast-snippet">'+P(e.Snippet)+"</div>":"")+'<button class="memola-mention-toast-x" title="\u9589\u3058\u308B">\xD7</button>';let o=()=>{t.classList.remove("on"),setTimeout(()=>t.remove(),200)};t.querySelector(".memola-mention-toast-x")?.addEventListener("click",n=>{n.stopPropagation(),o()}),t.addEventListener("click",()=>{o(),Db(e)}),_D().appendChild(t),requestAnimationFrame(()=>t.classList.add("on")),setTimeout(o,9e3)}var Ab,X1,rs,Hp,J1,Rb=L(()=>{"use strict";me();Re();Lo();Wc();Ab="memola-inbox-md",X1=!1;rs=[];Hp=new Set,J1=!1});function rT(){try{return JSON.stringify(d.meta.pages)}catch{return String(d.meta.pages.length)}}async function aT(e={}){if(!Nb&&!(Date.now()-nT<ND)&&!re.isBusy()&&!Cu()&&!re.isDirty()){Nb=!0;try{try{let t=rT();if(await dt(),rT()!==t){let{renderTree:o}=await Promise.resolve().then(()=>(_e(),ko));o()}}catch{}if(!d.currentId)return;if(!e.periodic&&d.currentType==="database"&&!d.currentRow){let t=d.pages.find(o=>o.Id===d.currentId);if(t)await(await Promise.resolve().then(()=>(K(),ie))).doSelectDb(d.currentId,t);else{d.currentId=null;let{showView:o}=await Promise.resolve().then(()=>(K(),ie));o("empty")}}}finally{nT=Date.now(),Nb=!1}}}function iT(){let e=document.body;e.dataset.memolaTabRefocusWired!=="1"&&(e.dataset.memolaTabRefocusWired="1",document.addEventListener("visibilitychange",()=>{document.hidden||aT()}))}function OD(){let e=Cn.get(),t=e?parseInt(e,10):3e4;return isFinite(t)?t:3e4}function Ob(){dc&&(clearTimeout(dc),dc=null);let e=OD();if(e<=0){dc=setTimeout(Ob,6e4);return}dc=setTimeout(()=>{(async()=>{document.hidden||(await aT({periodic:!0}),Promise.resolve().then(()=>(jo(),yn)).then(t=>t.pollComments()).catch(()=>{}),Promise.resolve().then(()=>(Rb(),oT)).then(t=>t.pollMentions()).catch(()=>{}))})().finally(Ob)},e)}function sT(){let e=document.body;e.dataset.memolaTreeSyncWired!=="1"&&(e.dataset.memolaTreeSyncWired="1",Ob())}var ND,nT,Nb,dc,lT=L(()=>{"use strict";q();V();ht();be();ND=3e3,nT=0,Nb=!1;dc=null});function mT(){cT||(cT=!0,re.subscribe(HD))}function HD(e){let t=dT;switch(dT=e.kind,e.kind){case"unloaded":d.currentRow||(d.dirty=!1,d.saving=!1),d.sync.loadedEtag=null,d.sync.loadedModified=null;return;case"idle":d.dirty=!1,d.saving=!1,d.sync.loadedEtag=e.base.etag,d.sync.loadedModified=e.base.modified,Ye("\u4FDD\u5B58\u6E08\u307F"),(t==="saving"||t==="merging")&&(ly(e.base.pageId,e.base.etag,e.base.modified),Jo(e.base.pageId).set(e.base.etag),Promise.resolve().then(()=>(_e(),ko)).then(o=>o.renderTree()));return;case"dirty":d.dirty=!0,d.saving=!1,d.sync.loadedEtag=e.base.etag,d.sync.loadedModified=e.base.modified,Ye("\u672A\u4FDD\u5B58");return;case"saving":d.dirty=!0,d.saving=!0,d.sync.loadedEtag=e.base.etag,d.sync.loadedModified=e.base.modified,Ye("\u4FDD\u5B58\u4E2D...");return;case"conflict":d.dirty=!0,d.saving=!1,d.sync.loadedEtag=e.conflict.base.etag,Ye("\u7AF6\u5408");return;case"merging":d.dirty=!0,d.saving=!1,d.sync.loadedEtag=e.conflict.base.etag,Ye("\u7AF6\u5408");return}}var cT,dT,pT=L(()=>{"use strict";q();le();ht();Ou();be();cT=!1,dT=null});function fT(){uT||(uT=!0,re.subscribe(UD))}function UD(e){if(e.kind!=="conflict"){Hb.close();return}zD(e.conflict.pageId,e.conflict.ours.title)}function zD(e,t){if(Hb.isOpen())return;let n=d.pages.find(r=>r.Id===e)?.Title||t||"\u7121\u984C";Hb.render('<div class="memola-conflict-box"><div class="memola-conflict-title">\u26A0 \u4ED6\u306E\u30E6\u30FC\u30B6\u30FC\u304C\u3053\u306E\u30DA\u30FC\u30B8\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F</div><div class="memola-conflict-page">\u300C'+P(n)+'\u300D</div><div class="memola-conflict-msg">\u540C\u3058\u30DA\u30FC\u30B8\u3092\u5225\u306E\u4EBA\u304C\u5148\u306B\u7DE8\u96C6\u3057\u3066\u3044\u307E\u3057\u305F\u3002<br>\u3069\u3046\u6271\u3044\u307E\u3059\u304B\uFF1F</div><div class="memola-conflict-btns"><button class="memola-btn p" data-choice="merge" title="\u81EA\u5206\u306E\u7DE8\u96C6\u3068\u76F8\u624B\u306E\u7DE8\u96C6\u3092 3-way \u30DE\u30FC\u30B8\u3067\u7D50\u5408\u3057\u307E\u3059\u3002\u540C\u3058\u7B87\u6240\u304C\u4E21\u65B9\u5909\u66F4\u3055\u308C\u3066\u305F\u5834\u5408\u306E\u307F\u9078\u629E\u3092\u6C42\u3081\u3089\u308C\u307E\u3059">\u{1F500} \u7D71\u5408\u3059\u308B <span class="memola-conflict-sub">(\u63A8\u5968 \u2014 \u53CC\u65B9\u306E\u7DE8\u96C6\u3092\u878D\u5408)</span></button><button class="memola-btn s" data-choice="overwrite" title="\u81EA\u5206\u306E\u7DE8\u96C6\u5185\u5BB9\u3067 SP \u306E\u7248\u3092\u4E0A\u66F8\u304D\u3057\u307E\u3059 (\u76F8\u624B\u306E\u5909\u66F4\u306F SP \u306E\u5C65\u6B74\u304B\u3089\u5FA9\u5143\u3067\u304D\u307E\u3059)">\u4E0A\u66F8\u304D\u3067\u4FDD\u5B58 <span class="memola-conflict-sub">(\u76F8\u624B\u306E\u7DE8\u96C6\u306F\u7834\u68C4)</span></button><button class="memola-btn s" data-choice="reload" title="\u81EA\u5206\u306E\u7DE8\u96C6\u5185\u5BB9\u3092\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58\u3057\u3066\u304B\u3089\u3001\u76F8\u624B\u306E\u6700\u65B0\u7248\u3092\u8AAD\u307F\u8FBC\u307F\u307E\u3059">\u76F8\u624B\u306E\u7248\u3092\u8868\u793A <span class="memola-conflict-sub">(\u81EA\u5206\u306E\u7DE8\u96C6\u306F\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58)</span></button><button class="memola-btn ghost" data-choice="cancel" title="\u30C0\u30A4\u30A2\u30ED\u30B0\u3092\u9589\u3058\u307E\u3059\u3002\u3042\u3068\u3067\u5224\u65AD\u3067\u304D\u307E\u3059">\u3053\u306E\u307E\u307E\u306B\u3059\u308B</button></div><div class="memola-conflict-foot">\u5931\u3063\u305F\u5909\u66F4\u306F<b>\u300C\u{1F4DD} \u4E0B\u66F8\u304D\u300D</b> \u307E\u305F\u306F <b>SP \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74</b> \u304B\u3089\u5FA9\u5143\u53EF\u80FD\u3067\u3059\u3002</div></div>',r=>{r.querySelectorAll("button[data-choice]").forEach(a=>{a.addEventListener("click",()=>{let i=a.dataset.choice;jD(i,e,n)})})})}async function jD(e,t,o){switch(e){case"merge":re.startMerge();return;case"overwrite":{let n=await re.forceOverwrite();n.ok?(k("\u81EA\u5206\u306E\u7248\u3067\u4E0A\u66F8\u304D\u3057\u307E\u3057\u305F"),Promise.resolve().then(()=>(Go(),rr)).then(r=>r.refreshDraftsBadge?.())):!n.ok&&n.reason==="error"&&k("\u4E0A\u66F8\u304D\u5931\u6557: "+(n.error?.message||""),"err");return}case"reload":{let n=re.state();if(n.kind!=="conflict")return;let r=n.conflict;try{let{saveDraft:i}=await Promise.resolve().then(()=>(Ul(),nh));i({pageId:r.pageId,pageTitle:o,title:r.ours.title,body:r.ours.body,reason:"conflict-discarded",baseBody:r.base.body,baseEtag:r.base.etag})}catch{}re.acceptTheirs(),k("\u81EA\u5206\u306E\u7DE8\u96C6\u306F\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F\uFF08\u30B5\u30A4\u30C9\u30D0\u30FC\u300C\u{1F4DD} \u4E0B\u66F8\u304D\u300D\u304B\u3089\u5FA9\u5143\u53EF\uFF09"),Promise.resolve().then(()=>(Go(),rr)).then(i=>i.refreshDraftsBadge?.());let{doSelect:a}=await Promise.resolve().then(()=>(K(),ie));await a(t);return}case"cancel":re.cancelConflict();return}}var FD,Hb,uT,gT=L(()=>{"use strict";q();Re();ht();le();nr();FD="memola-conflict-md",Hb=kn({id:FD,className:"memola-conflict-md",onEscape:()=>re.cancelConflict(),onBackdropClick:()=>re.cancelConflict()}),uT=!1});function vT(){hT||(hT=!0,re.subscribe($D))}function $D(e){if(e.kind!=="merging"){bT.close();return}KD(e)}function KD(e){let t=e.hunks.length,o=t-e.resolved.size,n=t===0?'<span class="memola-merge-ok">\u2713 \u7AF6\u5408\u306A\u3057 \u2014 \u81EA\u52D5\u30DE\u30FC\u30B8\u5B8C\u4E86</span>':o===0?'<span class="memola-merge-ok">\u2713 '+t+" \u4EF6\u3059\u3079\u3066\u89E3\u6C7A\u6E08\u307F</span>":'<span class="memola-merge-warn">\u26A0 \u6B8B\u308A '+o+" / "+t+" \u4EF6\u306E\u7AF6\u5408</span>",r=o>0?'<div class="memola-merge-preview-pending">\u26A0 \u6B8B\u308A '+o+" \u4EF6\u306E\u7AF6\u5408\u3092\u5DE6\u30DA\u30A4\u30F3\u3067\u89E3\u6C7A\u3059\u308B\u3068\u3001\u3053\u3053\u306B\u6700\u7D42\u7684\u306A\u5185\u5BB9\u304C\u8868\u793A\u3055\u308C\u307E\u3059\u3002</div>":Po(re.computeMergedBody()),a=VD(e),i=`
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
  `;bT.render(i,s=>{s.querySelectorAll("[data-conflict-id]").forEach(l=>{l.addEventListener("click",()=>{let c=parseInt(l.dataset.conflictId||"0",10),m=l.dataset.choice;re.setMergeChoice(c,m)})}),s.querySelectorAll("[data-merge-act]").forEach(l=>{l.addEventListener("click",()=>{let c=l.dataset.mergeAct;c==="cancel"?re.cancelMerge():c==="apply"&&WD()})})})}function VD(e){return e.hunks.length===0?'<div class="memola-merge-empty">\u{1F389} \u81EA\u52D5\u30DE\u30FC\u30B8\u3067\u5168\u3066\u89E3\u6C7A\u3057\u307E\u3057\u305F\u3002\u53F3\u306E\u5185\u5BB9\u3092\u78BA\u8A8D\u3057\u3066\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div>':e.hunks.map(t=>{let o=e.resolved.get(t.id),n=o?"memola-merge-conflict resolved":"memola-merge-conflict",r=t.yours.length===0?"<i>(\u524A\u9664)</i>":P(t.yours.join(`
`)),a=t.theirs.length===0?"<i>(\u524A\u9664)</i>":P(t.theirs.join(`
`)),i=t.base.length===0?"<i>(\u7A7A)</i>":P(t.base.join(`
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
    `}).join("")}async function WD(){_(!0,"\u7D71\u5408\u7D50\u679C\u3092\u4FDD\u5B58\u4E2D...");try{let e=await re.applyMerge();if(_(!1),e.ok){k("\u7D71\u5408\u5185\u5BB9\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F");let t=re.state();if(t.kind==="idle"&&d.currentId===t.base.pageId){let o=t.base.pageId;re.unload();let{doSelect:n}=await Promise.resolve().then(()=>(K(),ie));await n(o)}Promise.resolve().then(()=>(Go(),rr)).then(o=>o.refreshDraftsBadge?.());return}if(!e.ok&&e.reason==="conflict"){k("\u4FDD\u5B58\u4E2D\u306B\u3055\u3089\u306B\u7AF6\u5408\u304C\u767A\u751F\u3057\u307E\u3057\u305F \u2014 \u518D\u5EA6\u30DA\u30FC\u30B8\u3092\u958B\u3044\u3066\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044","err");return}!e.ok&&e.reason==="error"&&k("\u4FDD\u5B58\u306B\u5931\u6557: "+(e.error?.message||""),"err")}catch(e){_(!1),k("\u4FDD\u5B58\u306B\u5931\u6557: "+e.message,"err")}}var qD,bT,hT,yT=L(()=>{"use strict";q();Re();rn();ht();le();nr();qD="memola-merge-md",bT=kn({id:qD,className:"memola-merge-md",onEscape:()=>re.cancelMerge()}),hT=!1});var Ub={};j(Ub,{checkForUpdateNow:()=>XD,startUpdateWatcher:()=>JD});function GD(){try{if(localStorage.getItem("memola.dev.bundle-source")==="local")return(localStorage.getItem("memola.dev.local-base")||"http://127.0.0.1:18080/memola").replace(/\/+$/,"")}catch{}let e=window._spPageContextInfo;return e?.webServerRelativeUrl?e.webServerRelativeUrl.replace(/\/$/,"")+"/Shared Documents/memola":""}function wT(){try{return"260606-0844-7d77c4"}catch{return""}}function YD(e){if(xT)return;xT=!0;let t=document.createElement("div");t.id="memola-update-bar",t.innerHTML="<span>\u{1F504} \u65B0\u3057\u3044\u30D0\u30FC\u30B8\u30E7\u30F3 ("+e+') \u304C\u3042\u308A\u307E\u3059\u3002</span><button id="memola-update-reload">\u30EA\u30ED\u30FC\u30C9</button><button id="memola-update-dismiss" title="\u9589\u3058\u308B">\xD7</button>',document.getElementById("memola-overlay")?.appendChild(t),t.querySelector("#memola-update-reload")?.addEventListener("click",()=>location.reload()),t.querySelector("#memola-update-dismiss")?.addEventListener("click",()=>{t.remove()})}async function kT(){let e=GD();if(!e)return!1;let t=wT();if(!t)return!1;try{let o=await fetch(e+"/version.txt?t="+Date.now(),{credentials:"same-origin",cache:"no-cache"});if(!o.ok)return!1;let n=(await o.text()).trim();if(n&&n!==t)return YD(n),!0}catch{}return!1}async function XD(e={}){if(!await kT()&&e.announce){let{toast:o}=await Promise.resolve().then(()=>(le(),lv));o("\u6700\u65B0\u30D0\u30FC\u30B8\u30E7\u30F3\u3067\u3059 ("+wT()+")")}}function JD(){Fb===null&&(Fb=window.setTimeout(function e(){kT(),Fb=window.setTimeout(e,9e4)},9e4))}var Fb,xT,zb=L(()=>{"use strict";Fb=null,xT=!1});var IT={};j(IT,{loadRemoteAiConfig:()=>e_});function QD(){let e=[],t=co.get();if(t)try{e.push(new URL(t).origin)}catch{}return e.includes("http://localhost:18080")||e.push("http://localhost:18080"),e}async function e_(){for(let e of QD())try{let t=new AbortController,o=setTimeout(()=>t.abort(),1500),n;try{n=await fetch(e+"/memola/ai-config",{signal:t.signal})}finally{clearTimeout(o)}if(!n.ok)continue;let a=(await n.json().catch(()=>null))?.config;if(!a||typeof a!="object")continue;let i=[];for(let[s,l]of ZD){let c=a[s];c!=null&&String(c)!==""&&(l.set(String(c)),i.push(`${s}=${String(c)}`))}if(i.length)return console.info(`[memola] AI \u8A2D\u5B9A\u3092 relay (${e}) \u304B\u3089 ${i.length} \u4EF6\u53CD\u6620: ${i.join(", ")}`),!0}catch{}return!1}var ZD,ET=L(()=>{"use strict";be();ZD=[["provider",xa],["corpModel",wa],["corpBaseUrl",co],["corpDeployPrefix",ka],["embedProvider",Ia],["voyageModel",Ea],["embedModel",Ta],["embedApiVersion",La],["embedDimensions",Sa],["ragTopK",Ma],["ragMinScore",Pa]]});var sE={};j(sE,{attachAll:()=>$b,detachViewportAutoCollapse:()=>o_,init:()=>Kb});async function jb(e){try{_(!0,"DB\u3092\u4F5C\u6210\u4E2D...");let t=await Ds("\u7121\u984CDB",e||"");fo({Id:t.Id,Title:t.Title,ParentId:t.ParentId,Type:"database"}),te(),await Ue(t.Id)}catch(t){k("DB\u4F5C\u6210\u306B\u5931\u6557: "+t.message,"err")}finally{_(!1)}}async function t_(){try{_(!0,"\u518D\u8AAD\u307F\u8FBC\u307F\u4E2D...");let e=d.currentRow;d.currentType!=="database"&&await xt(),await dt(),te();let t=d.currentId,o=t?d.pages.find(n=>n.Id===t):null;if(e){let{getListItemById:n}=await Promise.resolve().then(()=>(De(),po)),r=await n(e.listTitle,e.itemId);if(r){let{openRowAsPage:a}=await Promise.resolve().then(()=>(Uo(),Fo));await a(e.dbId,r)}}else if(o&&t)if(o.Type==="database"){let{doSelectDb:n}=await Promise.resolve().then(()=>(K(),ie));await n(t,o)}else await Ue(t);k("\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u307E\u3057\u305F"),Promise.resolve().then(()=>(zb(),Ub)).then(n=>n.checkForUpdateNow({announce:!0}))}catch(e){k("\u518D\u8AAD\u307F\u8FBC\u307F\u5931\u6557: "+e.message,"err")}finally{_(!1)}}function $b(){I("x").addEventListener("click",vp),I("reload-btn").addEventListener("click",()=>void t_()),_E({openTodayDailyNote:QE,showDailyPicker:t1,doNewDb:jb}),ng(),gb(jb),I("dadd").addEventListener("click",xp),HE(),I("mc").addEventListener("click",()=>{I("md").classList.remove("on")}),I("mk").addEventListener("click",async()=>{I("md").classList.remove("on"),_(!0,"\u30EA\u30B9\u30C8\u3092\u6E96\u5099\u4E2D...");try{await dt(),te(),k("memola-pages \u30EA\u30B9\u30C8\u3092\u521D\u671F\u5316\u3057\u307E\u3057\u305F")}catch(e){k("\u521D\u671F\u5316\u306B\u5931\u6557: "+e.message,"err")}finally{_(!1)}}),CE(),YE(),dE(),qE(),q1({doNewDb:jb}),VE(),LE(),W0(),gh(),ch(),iT(),sT(),dh(),mT(),zy(),fT(),vT(),rh(),Bb(),Io(),wh(),k1({toggleFocusMode:Ap}),Ib(),Bp(),window.addEventListener("resize",Bp),qb=!0,G1(),B1(),F1(),eg(),tg(),document.addEventListener("keydown",bp)}function o_(){qb&&(window.removeEventListener("resize",Bp),qb=!1)}function n_(){nb({flushSave:!0,removeOverlay:!1})}async function Kb(){let e=document.getElementById("memola-overlay");e&&(e.__memolaShutdown=n_),_(!0);try{let{ensureWorkspaceSelected:t}=await Promise.resolve().then(()=>(Cb(),V1));await t();try{let{loadRemoteAiConfig:i}=await Promise.resolve().then(()=>(ET(),IT));await i()}catch{}await dt(),te(),tt("empty");let{loadLastOpenedPage:o}=await Promise.resolve().then(()=>(K(),ie)),n=o(),r=n&&d.pages.some(i=>i.Id===n&&!i.IsDraft)?n:d.pages.find(i=>!i.IsDraft)?.Id??null,{restoreTabs:a}=await Promise.resolve().then(()=>(Kt(),oo));await a(r),Promise.resolve().then(()=>(zb(),Ub)).then(i=>i.startUpdateWatcher())}catch(t){I("em").innerHTML='<div style="font-size:48px">\u26A0\uFE0F</div><h2>\u30A8\u30E9\u30FC</h2><p>'+t.message+"</p>",I("em").style.display="flex",console.error(t)}finally{_(!1)}}var qb,rb=L(()=>{"use strict";q();me();le();_e();K();Mn();bt();ob();ub();hb();AE();ab();RE();rg();FE();$E();WE();XE();bb();I1();D1();U1();ki();Kt();$1();Y1();Qm();ma();Go();Rb();Vl();Xr();lT();pT();of();gT();yT();Eb();V();qe();we();qb=!1});Fe();xr();function tv(){return'<aside id="memola-sb"><div id="memola-sb-hd"><button id="memola-ws-btn" title="\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9"><span class="memola-ws-badge">N</span><span id="memola-ws-name">Memola</span><span class="memola-ws-caret">\u25BE</span></button><button id="memola-sb-collapse" class="memola-pane-x" title="\u30B5\u30A4\u30C9\u30D0\u30FC\u3092\u9589\u3058\u308B (Ctrl+\\)">'+$.close+'</button></div><div class="memola-snav" id="memola-search-nav">'+$.search+'<span>\u691C\u7D22</span><span class="memola-snav-hint">Ctrl K</span></div><div class="memola-quick-wrap"><button class="memola-quick-add" id="memola-quick-add">'+$.plus+'<span>\u65B0\u898F</span></button><button class="memola-quick-chat" id="memola-xchat-launch" title="\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8 \u2014 \u5168\u6587\u66F8\u3092\u307E\u305F\u3044\u3067AI\u306B\u8CEA\u554F">'+$.chat+'<span>\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8</span></button></div><div class="memola-sb-fixed"><div class="memola-sb-fx" id="memola-sb-daily-today" title="\u4ECA\u65E5\u306E\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u304F / \u4F5C\u6210"><span class="memola-sb-fx-ic">\u{1F4C5}</span><span class="memola-sb-fx-lb">\u4ECA\u65E5\u306E\u30CE\u30FC\u30C8</span></div><div class="memola-sb-fx" id="memola-sb-daily-pick" title="\u4EFB\u610F\u306E\u65E5\u306E\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u304F"><span class="memola-sb-fx-ic">\u{1F5D3}</span><span class="memola-sb-fx-lb">\u65E5\u4ED8\u3092\u9078\u3093\u3067\u958B\u304F</span></div><div class="memola-sb-fx" id="memola-sb-library" title="\u5168\u30DA\u30FC\u30B8\u306E\u4E00\u89A7"><span class="memola-sb-fx-ic">\u{1F4DA}</span><span class="memola-sb-fx-lb">\u30E9\u30A4\u30D6\u30E9\u30EA</span></div><div class="memola-sb-fx" id="memola-inbox-btn" title="\u81EA\u5206\u5B9B\u3066\u306E\u30E1\u30F3\u30B7\u30E7\u30F3"><span class="memola-sb-fx-ic">\u{1F4E5}</span><span class="memola-sb-fx-lb">\u53D7\u4FE1\u30C8\u30EC\u30A4</span><span class="memola-inbox-badge-count"></span></div></div><div class="memola-sb-fixed"><div class="memola-sb-fx" id="memola-drafts-btn" style="display:none" title="\u7DE8\u96C6\u4E2D\u306E\u4E0B\u66F8\u304D / \u4FDD\u5B58\u885D\u7A81\u3067\u9000\u907F\u3055\u308C\u305F\u7DE8\u96C6"><span class="memola-sb-fx-ic">\u{1F4DD}</span><span class="memola-sb-fx-lb">\u4E0B\u66F8\u304D</span><span class="memola-drafts-badge-count">0</span></div><div class="memola-sb-fx" id="memola-trash-btn" title="\u524A\u9664\u3055\u308C\u305F\u30DA\u30FC\u30B8"><span class="memola-sb-fx-ic">\u{1F5D1}</span><span class="memola-sb-fx-lb">\u30B4\u30DF\u7BB1</span></div></div><div id="memola-tree-wrap"><div class="memola-sl-label" id="memola-tree-pinned-lbl" style="display:none">\u{1F4CC} \u30D4\u30F3\u7559\u3081</div><div id="memola-tree-pinned"></div><div class="memola-sl-label" id="memola-tree-private-lbl">\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8</div><div id="memola-tree-private"></div><div class="memola-sl-label" id="memola-tree-org-lbl">\u{1F310} \u7D44\u7E54</div><div id="memola-tree-org"></div></div><div id="memola-sb-ft"><button class="memola-nb" id="memola-x" title="\u30A2\u30D7\u30EA\u3092\u9589\u3058\u308B (Esc)">'+$.exit+'<span>\u9589\u3058\u308B</span></button></div><div id="memola-create-menu"><div class="memola-cm-section">\u4F5C\u6210</div><div class="memola-cm-item" data-cm="new-page"><span class="memola-cm-ic">\u{1F4C4}</span><div class="memola-cm-body"><span class="memola-cm-name">\u7A7A\u306E\u30DA\u30FC\u30B8</span><span class="memola-cm-sub">L1\u301CL3\u306B\u8FFD\u52A0</span></div></div><div class="memola-cm-item" data-cm="new-db"><span class="memola-cm-ic">\u{1F5C2}</span><div class="memola-cm-body"><span class="memola-cm-name">\u7A7A\u306EDB</span><span class="memola-cm-sub">\u30EA\u30B9\u30C8\uFF0Bmd\u30D5\u30A9\u30EB\u30C0\u3092\u4F5C\u6210</span></div></div><div class="memola-cm-sep"></div><div class="memola-cm-section">\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089</div><div id="memola-cm-templates"></div></div></aside><div id="memola-xchat" class="tdr-shell" aria-hidden="true"><div class="tdr-chat"><div class="tdr-topbar"><span class="tdr-brand"><span class="mark">\u{1D544}</span></span><button class="tdr-titlebtn" id="memola-xchat-titlebtn" title="\u30C1\u30E3\u30C3\u30C8\u5C65\u6B74"><span id="memola-xchat-title">\u65B0\u898F\u30C1\u30E3\u30C3\u30C8</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></button><span class="tdr-idx" id="memola-xchat-idx"></span><div style="flex:1"></div><button class="tdr-icon-btn tdr-btn-labeled" id="memola-xchat-rebuild" title="\u5168\u6587\u66F8\u3092\u30D9\u30AF\u30C8\u30EB\u5316\u3057\u3066\u30A4\u30F3\u30C7\u30C3\u30AF\u30B9\u3092\u66F4\u65B0\u3059\u308B">'+$.refresh+'<span>\u6587\u66F8\u3092\u8AAD\u307F\u8FBC\u307F</span></button><button class="tdr-icon-btn" id="memola-xchat-close" title="\u9589\u3058\u308B (Esc)">'+$.exit+'</button><div class="tdr-histmenu" id="memola-xchat-histmenu"><button class="tdr-hist-new" id="memola-xchat-new">'+$.plus+'<span>\u65B0\u898F\u30C1\u30E3\u30C3\u30C8</span></button><div id="memola-xchat-hist-list"></div></div></div><div class="tdr-thread" id="memola-xchat-thread"></div><div class="tdr-composer"><div class="tdr-composer-inner"><div class="tdr-note-form"><textarea class="tdr-note-input" id="memola-xchat-input" rows="1" placeholder="\u6587\u66F8\u306B\u3064\u3044\u3066\u8CEA\u554F\u2026 (\u4F8B: \u5148\u6708\u306E\u969C\u5BB3\u5BFE\u5FDC\u306E\u624B\u9806\u306F?)"></textarea><button class="tdr-note-submit" id="memola-xchat-send" title="\u9001\u4FE1">'+$.send+'</button></div><div class="tdr-note-hint">Enter \u3067\u9001\u4FE1 / Shift+Enter \u3067\u6539\u884C</div></div></div></div></div><main id="memola-main"><div id="memola-tabbar"><button id="memola-sb-toggle" title="\u30B5\u30A4\u30C9\u30D0\u30FC (Ctrl+\\)">'+$.sidebar+'</button><button id="memola-nav-back" class="memola-nav-btn disabled" title="\u623B\u308B (Ctrl+[)" disabled>'+$.chevronLeft+'</button><button id="memola-nav-fwd" class="memola-nav-btn disabled" title="\u9032\u3080 (Ctrl+])" disabled>'+$.chevronRight+'</button><div id="memola-tabstrip"></div><button id="memola-reload-btn" class="memola-tabbar-act" title="\u518D\u8AAD\u307F\u8FBC\u307F\uFF08\u4E00\u89A7\uFF0B\u8868\u793A\u4E2D\u306E\u30DA\u30FC\u30B8\uFF09\uFF0B\u65B0\u30D0\u30FC\u30B8\u30E7\u30F3\u78BA\u8A8D">'+$.refresh+'</button><button id="memola-settings-btn" class="memola-tabbar-act" title="\u8A2D\u5B9A">'+$.gear+'</button></div><div id="memola-top"><div id="memola-bc"></div><div id="memola-presence" class="memola-presence" style="display:none"></div><button id="memola-scope-tag" class="memola-scope-tag" style="display:none" title="\u30AF\u30EA\u30C3\u30AF\u3067\u500B\u4EBA \u2194 \u7D44\u7E54 \u3092\u5207\u66FF"><span class="memola-scope-tag-ic">\u{1F512}</span><span class="memola-scope-tag-label">\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8</span></button><button id="memola-pub-tag" class="memola-pub-tag" style="display:none" title="\u516C\u958B\u72B6\u614B"><span class="memola-pub-tag-dot"></span><span class="memola-pub-tag-label">\u516C\u958B\u4E2D</span></button><div id="memola-pub-pop" class="memola-pub-pop" style="display:none"><div class="memola-pub-pop-msg"></div><div class="memola-pub-pop-row"><button class="memola-pub-pop-btn primary" data-pub-act="sync">\u516C\u958B\u30DA\u30FC\u30B8\u306B\u540C\u671F</button><button class="memola-pub-pop-btn" data-pub-act="open">\u516C\u958B\u30DA\u30FC\u30B8\u3092\u958B\u304F</button><button class="memola-pub-pop-btn" data-pub-act="copy">URL \u3092\u30B3\u30D4\u30FC</button><button class="memola-pub-pop-btn danger" data-pub-act="unpublish">\u516C\u958B\u3092\u89E3\u9664</button><button class="memola-pub-pop-btn ghost" data-pub-act="close">\u9589\u3058\u308B</button></div></div><div id="memola-ss"></div><button id="memola-outline-btn" class="memola-tog-btn" title="\u76EE\u6B21">'+$.sort+'<span>\u76EE\u6B21</span></button><button id="memola-props-btn" class="memola-tog-btn" title="\u30D7\u30ED\u30D1\u30C6\u30A3">'+$.info+'<span>\u30D7\u30ED\u30D1\u30C6\u30A3</span></button><button id="memola-ai-btn" class="memola-tog-btn" title="AI\u30C1\u30E3\u30C3\u30C8">'+$.sparkle+'<span>AI</span></button><button id="memola-pgm-btn" title="\u30DA\u30FC\u30B8\u30E1\u30CB\u30E5\u30FC">'+$.more+'</button></div><div id="memola-tb"><button class="memola-b" data-cmd="h1" title="\u898B\u51FA\u30571"><b>H1</b></button><button class="memola-b" data-cmd="h2" title="\u898B\u51FA\u30572"><b>H2</b></button><button class="memola-b" data-cmd="h3" title="\u898B\u51FA\u30573"><b>H3</b></button><span class="memola-bs"></span><button class="memola-b" data-cmd="bold" title="\u592A\u5B57"><b>B</b></button><button class="memola-b" data-cmd="italic" title="\u659C\u4F53"><i>I</i></button><button class="memola-b" data-cmd="strike" title="\u53D6\u308A\u6D88\u3057\u7DDA"><s>S</s></button><button class="memola-b" data-cmd="code" title="\u30A4\u30F3\u30E9\u30A4\u30F3\u30B3\u30FC\u30C9">'+$.code+'</button><button class="memola-b" data-cmd="link" title="\u30EA\u30F3\u30AF\uFF08URL / UNC\u30D1\u30B9\uFF09">'+$.link+'</button><button class="memola-b" data-cmd="comment" title="\u30B3\u30E1\u30F3\u30C8">\u{1F4AC}</button><span class="memola-bs"></span><button class="memola-b" data-cmd="ul" title="\u7B87\u6761\u66F8\u304D">'+$.ul+'</button><button class="memola-b" data-cmd="ol" title="\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8">'+$.ol+'</button><button class="memola-b" data-cmd="todo" title="ToDo\u30EA\u30B9\u30C8">'+$.todo+'</button><button class="memola-b" data-cmd="quote" title="\u5F15\u7528">'+$.quote+'</button><button class="memola-b" data-cmd="callout" title="\u30B3\u30FC\u30EB\u30A2\u30A6\u30C8"><span style="font-size:14px">\u{1F4A1}</span></button><button class="memola-b" data-cmd="pre" title="\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF">'+$.codeBlock+'</button><span class="memola-bs"></span><button class="memola-b" data-cmd="hr" title="\u533A\u5207\u308A\u7DDA">'+$.hr+'</button></div><div id="memola-content-row"><aside id="memola-outline"><div id="memola-outline-hd"><span>\u76EE\u6B21</span><button class="memola-pane-x" id="memola-outline-x" title="\u9589\u3058\u308B">'+$.close+'</button></div><div id="memola-outline-list"></div></aside><div id="memola-ea"><div id="memola-ei"><div id="memola-em"><div class="memola-em-icon">\u{1F4C4}</div><h2 class="memola-em-title">\u306F\u3058\u3081\u3066\u307F\u3088\u3046</h2><p class="memola-em-sub">\u30DA\u30FC\u30B8\u3092\u4F5C\u308B\u304B\u3001\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u59CB\u3081\u3089\u308C\u307E\u3059\u3002</p><div class="memola-em-btns"><button class="memola-btn p" id="memola-ne">\uFF0B \u7A7A\u306E\u30DA\u30FC\u30B8</button><button class="memola-btn s" id="memola-ne-db">\u25A4 DB\u3092\u4F5C\u308B</button><button class="memola-btn ghost" id="memola-ne-tpl">\u2398 \u30C6\u30F3\u30D7\u30EC</button></div><div class="memola-em-chips"><button class="memola-chip memola-em-chip" data-tpl="weekly">\u{1F4C5} \u9031\u6B21\u30CE\u30FC\u30C8</button><button class="memola-chip memola-em-chip" data-tpl="tasks">\u2713 \u30BF\u30B9\u30AFDB</button><button class="memola-chip memola-em-chip" data-tpl="minutes">\u{1F4D3} \u8B70\u4E8B\u9332</button></div></div><div id="memola-ct"><div id="memola-template-banner" class="memola-template-banner" style="display:none"></div><div id="memola-draft-banner" style="display:none"></div><div id="memola-pg-hd"><div id="memola-icon-wrap"><span id="memola-pg-icon"></span><button class="memola-pg-icon-empty" id="memola-add-icon">\u30A2\u30A4\u30B3\u30F3\u3092\u8FFD\u52A0</button></div><textarea id="memola-ttl" rows="1" placeholder="\u30BF\u30A4\u30C8\u30EB\u306A\u3057"></textarea></div><div id="memola-row-props" class="memola-row-props"></div><div id="memola-ed" contenteditable="true" spellcheck="false"></div><div id="memola-backlinks" class="memola-backlinks" style="display:none"></div></div></div></div><div id="memola-dv"><div id="memola-dv-inner"><div id="memola-template-banner-db" class="memola-template-banner" style="display:none"></div><div id="memola-dv-hd"><div id="memola-dv-icon-wrap"><span id="memola-dv-pg-icon"></span><button class="memola-pg-icon-empty" id="memola-dv-add-icon">\u{1F60A} \u30A2\u30A4\u30B3\u30F3\u3092\u8FFD\u52A0</button></div><div id="memola-dv-ttl" contenteditable="true" spellcheck="false"></div></div><div id="memola-db-views"></div><div id="memola-db-tb"><button class="memola-db-new-btn" id="memola-db-new-row">\uFF0B \u65B0\u898F</button><div class="memola-db-tb-spacer"></div><button class="memola-db-chip subtle" id="memola-db-csv-export">'+$.download+'<span>CSV</span></button><button class="memola-db-chip subtle" id="memola-db-csv-import">'+$.copy+'<span>\u53D6\u8FBC</span></button></div><div id="memola-filter-chips"></div><div id="memola-filter-popover"></div><div id="memola-dt-wrap"><table id="memola-dt"><thead><tr id="memola-dth-row"></tr></thead><tbody id="memola-dtb"></tbody></table><button id="memola-dadd">\uFF0B \u65B0\u3057\u3044\u884C</button></div><div id="memola-kb"></div><div id="memola-list-view" class="memola-altview"></div><div id="memola-gallery-view" class="memola-altview"></div><div id="memola-calendar-view" class="memola-altview"></div><div id="memola-gantt-view" class="memola-altview"></div><div id="memola-backlinks-db" class="memola-backlinks" style="display:none"></div></div></div><div id="memola-lib"></div><aside id="memola-comments-pane"><div id="memola-comments-hd"><span>\u30B3\u30E1\u30F3\u30C8</span><button class="memola-pane-x" id="memola-comments-x" title="\u9589\u3058\u308B">'+$.close+'</button></div><div id="memola-comments-list"></div><div id="memola-comments-composer"><div id="memola-comments-target" style="display:none"><span id="memola-comments-target-lbl"></span><button id="memola-comments-target-x" title="\u30DA\u30FC\u30B8\u5168\u4F53\u306B\u623B\u3059">\xD7</button></div><textarea id="memola-comments-ta" placeholder="\u30B3\u30E1\u30F3\u30C8\u3092\u8FFD\u52A0..." rows="2"></textarea><div id="memola-comments-footer"><div class="memola-cmt-scope"><button class="memola-cmt-scope-btn" id="memola-comments-scope-org">\u7D44\u7E54</button><button class="memola-cmt-scope-btn" id="memola-comments-scope-user">\u{1F512} \u500B\u4EBA</button></div><button class="memola-btn p" id="memola-comments-add">\u9001\u4FE1</button></div></div></aside><aside id="memola-props"><div id="memola-props-hd"><span>\u30D7\u30ED\u30D1\u30C6\u30A3</span><button class="memola-pane-x" id="memola-props-x" title="\u9589\u3058\u308B">'+$.close+'</button></div><div id="memola-props-list"></div></aside><aside id="memola-ai-panel"><div id="memola-ai-hd"><span class="memola-ai-title">'+$.sparkle+'<span>AI\u30C1\u30E3\u30C3\u30C8</span></span><button id="memola-ai-new" title="\u65B0\u3057\u3044\u4F1A\u8A71">'+$.plus+'</button><button id="memola-ai-clear" title="\u73FE\u5728\u306E\u4F1A\u8A71\u3092\u524A\u9664">'+$.trash+'</button><button id="memola-ai-close" class="memola-pane-x" title="\u9589\u3058\u308B">'+$.close+'</button></div><div id="memola-ai-hist-row"><select id="memola-ai-hist" title="\u4F1A\u8A71\u5C65\u6B74"></select></div><div id="memola-ai-messages"></div><div id="memola-ai-chips"></div><div id="memola-ai-inputarea"><select id="memola-ai-model-pick" title="\u30D7\u30ED\u30D0\u30A4\u30C0\u30FB\u30E2\u30C7\u30EB\u9078\u629E"></select><textarea id="memola-ai-input" placeholder="\u3053\u306E\u30DA\u30FC\u30B8\u306B\u3064\u3044\u3066\u805E\u304F\u2026" rows="2"></textarea><button id="memola-ai-send" title="\u9001\u4FE1 (\u2318\u21B5)">'+$.send+`</button></div></aside></div><div id="memola-ld"><span>\u23F3</span><span id="memola-lm"> \u8AAD\u307F\u8FBC\u307F\u4E2D...</span></div></main><div id="memola-md"><div class="memola-mb"><h2>\u{1F680} \u521D\u671F\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7</h2><p>\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u30E9\u30A4\u30D6\u30E9\u30EA\u306B <code>memola-pages</code> \u30D5\u30A9\u30EB\u30C0\u3092\u4F5C\u6210\u3057\u3066\u3088\u3044\u3067\u3059\u304B\uFF1F<br>\u30DA\u30FC\u30B8\u306F .md \u30D5\u30A1\u30A4\u30EB\u3068\u3057\u3066\u3053\u3053\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002</p><div class="memola-ma"><button class="memola-btn s" id="memola-mc">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" id="memola-mk">\u30D5\u30A9\u30EB\u30C0\u3092\u4F5C\u6210</button></div></div></div><div id="memola-col-md"><div class="memola-mb" style="max-width:380px"><h2>\u5217\u3092\u8FFD\u52A0</h2><div class="memola-col-row"><label>\u5217\u540D</label><input id="memola-col-name" class="memola-col-inp" type="text" placeholder="\u4F8B: \u62C5\u5F53\u8005"></div><div class="memola-col-row"><label>\u30BF\u30A4\u30D7</label><div id="memola-col-type-grid"><div class="memola-col-type" data-tk="2"  data-ic="Aa"><span class="memola-col-type-ic">Aa</span><span>\u30C6\u30AD\u30B9\u30C8</span></div><div class="memola-col-type" data-tk="3"  data-ic="\xB6"><span class="memola-col-type-ic">\xB6</span><span>\u8907\u6570\u884C</span></div><div class="memola-col-type" data-tk="9"  data-ic="#"><span class="memola-col-type-ic">#</span><span>\u6570\u5024</span></div><div class="memola-col-type" data-tk="4"  data-ic="\u{1F4C5}"><span class="memola-col-type-ic">\u{1F4C5}</span><span>\u65E5\u4ED8</span></div><div class="memola-col-type" data-tk="6"  data-ic="\u25C9"><span class="memola-col-type-ic">\u25C9</span><span>\u30BB\u30EC\u30AF\u30C8</span></div><div class="memola-col-type" data-tk="15" data-ic="\u25CE"><span class="memola-col-type-ic">\u25CE</span><span>\u30DE\u30EB\u30C1</span></div><div class="memola-col-type" data-tk="8"  data-ic="\u2610"><span class="memola-col-type-ic">\u2610</span><span>\u30C1\u30A7\u30C3\u30AF</span></div><div class="memola-col-type" data-tk="11" data-ic="\u{1F517}"><span class="memola-col-type-ic">\u{1F517}</span><span>URL</span></div><div class="memola-col-type" data-tk="20" data-ic="\u{1F464}"><span class="memola-col-type-ic">\u{1F464}</span><span>\u62C5\u5F53\u8005</span></div><div class="memola-col-type" data-tk="7"  data-ic="\u2194"><span class="memola-col-type-ic">\u2194</span><span>\u95A2\u4FC2</span></div><div class="memola-col-type" data-tk="17" data-ic="\u03A3"><span class="memola-col-type-ic">\u03A3</span><span>\u30ED\u30FC\u30EB\u30A2\u30C3\u30D7</span></div><div class="memola-col-type" data-tk="17" data-ic="\u0192"><span class="memola-col-type-ic">\u0192</span><span>\u6570\u5F0F</span></div><div class="memola-col-type" data-tk="18" data-ic="\u{1F4CE}"><span class="memola-col-type-ic">\u{1F4CE}</span><span>\u30D5\u30A1\u30A4\u30EB</span></div></div></div><div class="memola-col-row" id="memola-col-choices-row"><label>\u9078\u629E\u80A2\uFF081\u884C1\u3064\uFF09</label><textarea id="memola-col-choices" class="memola-col-choices" placeholder="\u4F8B:
\u9032\u884C\u4E2D
\u5B8C\u4E86
\u672A\u7740\u624B"></textarea></div><div class="memola-col-row"><label>SharePoint\u30EA\u30B9\u30C8\u306E\u5217\u306B\u30DE\u30C3\u30D7</label><input id="memola-col-spmap" class="memola-col-inp" type="text" placeholder="\u81EA\u52D5\u63A8\u5B9A"></div><div class="memola-ma"><button class="memola-btn s" id="memola-col-cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" id="memola-col-ok">\u8FFD\u52A0</button></div></div></div><div id="memola-ftb"><button class="memola-fb" data-cmd="bold" title="\u592A\u5B57"><b>B</b></button><button class="memola-fb" data-cmd="italic" title="\u659C\u4F53"><i>I</i></button><button class="memola-fb" data-cmd="strike" title="\u53D6\u308A\u6D88\u3057\u7DDA"><s>S</s></button><button class="memola-fb" data-cmd="code" title="\u30A4\u30F3\u30E9\u30A4\u30F3\u30B3\u30FC\u30C9">`+$.code+'</button><button class="memola-fb" data-cmd="link" title="\u30EA\u30F3\u30AF\uFF08URL / UNC\u30D1\u30B9\uFF09">'+$.link+'</button><button class="memola-fb" data-cmd="comment" title="\u30B3\u30E1\u30F3\u30C8">\u{1F4AC}</button><span class="memola-fb-sep"></span><button class="memola-fb" data-cmd="h1" title="\u898B\u51FA\u30571"><b>H1</b></button><button class="memola-fb" data-cmd="h2" title="\u898B\u51FA\u30572"><b>H2</b></button><button class="memola-fb" data-cmd="h3" title="\u898B\u51FA\u30573"><b>H3</b></button><span class="memola-fb-sep"></span><button class="memola-fb" data-cmd="ul" title="\u7B87\u6761\u66F8\u304D">'+$.ul+'</button><button class="memola-fb" data-cmd="ol" title="\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8">'+$.ol+'</button><button class="memola-fb" data-cmd="quote" title="\u5F15\u7528">'+$.quote+`</button></div><div id="memola-slash"></div><div id="memola-qs"><div id="memola-qs-box"><input id="memola-qs-inp" type="text" placeholder="\u30DA\u30FC\u30B8\u3092\u691C\u7D22..."><div id="memola-qs-res"></div></div></div><div id="memola-emoji"><div id="memola-emoji-grid"></div><button id="memola-emoji-rm">\u30A2\u30A4\u30B3\u30F3\u3092\u524A\u9664</button></div><div id="memola-inbox-md"><div class="memola-mb" style="max-width:560px"><h2>\u{1F4E5} \u53D7\u4FE1\u30C8\u30EC\u30A4</h2><div id="memola-inbox-list"></div><div class="memola-ma"><button class="memola-btn ghost" id="memola-inbox-readall">\u3059\u3079\u3066\u65E2\u8AAD</button><button class="memola-btn s" id="memola-inbox-close">\u9589\u3058\u308B</button></div></div></div><div id="memola-trash-md"><div class="memola-mb" style="max-width:540px"><h2>\u30B4\u30DF\u7BB1</h2><div id="memola-trash-list"></div><div class="memola-ma"><button class="memola-btn ghost" id="memola-trash-empty" style="color:#b13a3a">\u{1F5D1} \u3059\u3079\u3066\u5B8C\u5168\u524A\u9664</button><button class="memola-btn s" id="memola-trash-close">\u9589\u3058\u308B</button></div></div></div><div id="memola-settings-md"><div class="memola-mb memola-set-mb"><h2>\u2699 \u8A2D\u5B9A</h2><div class="memola-set-body"><nav class="memola-set-nav"><div class="memola-set-major" data-major="personal"><div class="memola-set-major-h">\u500B\u4EBA\u8A2D\u5B9A</div><div class="memola-set-major-sub">\u3053\u306E\u7AEF\u672B\u306E\u30D6\u30E9\u30A6\u30B6\u306B\u4FDD\u5B58\uFF08\u4ED6\u306E\u4EBA\u306B\u306F\u5F71\u97FF\u3057\u307E\u305B\u3093\uFF09</div><button class="memola-set-tab on" data-tab="ai">\u{1F916} AI \u30D7\u30ED\u30D0\u30A4\u30C0</button><button class="memola-set-tab" data-tab="display">\u{1F3A8} \u8868\u793A</button></div><div class="memola-set-major" data-major="shared"><div class="memola-set-major-h">\u5171\u901A\u8A2D\u5B9A</div><div class="memola-set-major-sub">\u4FDD\u5B58\u30FB\u540C\u671F\u30FB\u30D7\u30EC\u30BC\u30F3\u30B9\u306E\u6319\u52D5</div><button class="memola-set-tab" data-tab="save">\u{1F4BE} \u4FDD\u5B58\u3068\u540C\u671F</button></div><div class="memola-set-major" data-major="other"><div class="memola-set-major-h">\u305D\u306E\u4ED6</div><button class="memola-set-tab" data-tab="help">\u2328 \u30D8\u30EB\u30D7</button><button class="memola-set-tab" data-tab="dev">\u{1F6E0} \u958B\u767A\u8005</button><button class="memola-set-tab danger" data-tab="debug">\u26A0 \u30EA\u30BB\u30C3\u30C8</button></div></nav><div class="memola-set-panes"><div class="memola-set-pane on" data-pane="ai"><div class="memola-set-row"><label>\u4F7F\u7528\u3059\u308B\u30B5\u30FC\u30D3\u30B9</label><select id="memola-set-provider"><option value="claude">Anthropic Claude</option><option value="corp">Azure OpenAI \u4E92\u63DB API</option><option value="local">\u30ED\u30FC\u30AB\u30EB AI (Ollama / LM Studio \u7B49)</option></select></div><div class="memola-set-row" data-prov="claude"><label>Claude \u30E2\u30C7\u30EB</label><select id="memola-set-claude-model"></select></div><div class="memola-set-row" data-prov="claude"><label>Claude API \u30AD\u30FC</label><input id="memola-set-aikey" type="password" placeholder="sk-ant-..."></div><div class="memola-set-row" data-prov="corp"><label>Azure OpenAI \u4E92\u63DB \u30E2\u30C7\u30EB</label><select id="memola-set-corpai-model"></select></div><div class="memola-set-row" data-prov="corp"><label>API \u30AD\u30FC</label><input id="memola-set-corpai-key" type="password" placeholder="api-key (Azure OpenAI \u306E\u30AD\u30FC / \u30B2\u30FC\u30C8\u30A6\u30A7\u30A4\u306E\u30B5\u30D6\u30B9\u30AF\u30EA\u30D7\u30B7\u30E7\u30F3\u30AD\u30FC)"></div><div class="memola-set-row" data-prov="corp"><label>\u30D9\u30FC\u30B9 URL</label><input id="memola-set-corpai-baseurl" type="text" placeholder="https://&lt;resource&gt;.openai.azure.com"></div><div class="memola-set-row" data-prov="corp"><label>\u30C7\u30D7\u30ED\u30A4 ID \u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9</label><input id="memola-set-corpai-prefix" type="text" placeholder="(\u4EFB\u610F \u2014 \u30E2\u30C7\u30EB\u540D\u3068\u540C\u3058\u30C7\u30D7\u30ED\u30A4\u540D\u306A\u3089\u7A7A\u6B04\u3067OK)"></div><div class="memola-set-row" data-prov="corp"><label>\u30E2\u30C7\u30EB\u5225\u30AA\u30FC\u30D0\u30FC\u30E9\u30A4\u30C9 (\u4EFB\u610F / JSON)</label><textarea id="memola-set-corpai-overrides" rows="6" placeholder='{"gpt-5":{"baseUrl":"https://...","apiVersion":"2025-01-01-preview","deploymentId":"..."}}' style="font-family:var(--font-mono);font-size:11px"></textarea></div><div class="memola-set-row" data-prov="corp"><label></label><div class="memola-set-hint"><b>\u5BFE\u5FDC\u30B5\u30FC\u30D3\u30B9</b>: Azure OpenAI Service\u3001Azure API Management \u7D4C\u7531\u306E\u30E9\u30C3\u30D1\u30FC\u3001\u793E\u5185 API \u30B2\u30FC\u30C8\u30A6\u30A7\u30A4\u7B49\u3002<br><b>URL \u306E\u7D44\u307F\u7ACB\u3066\u65B9</b>: <code>{\u30D9\u30FC\u30B9 URL}/openai/deployments/{\u30C7\u30D7\u30ED\u30A4 ID}/chat/completions?api-version={api-version}</code><br>\u203B \u30D9\u30FC\u30B9 URL \u306E\u4F8B \u2014 Azure \u672C\u5BB6: <code>https://&lt;resource&gt;.openai.azure.com</code>\u3001\u30B2\u30FC\u30C8\u30A6\u30A7\u30A4: <code>https://gateway.example.com/myapi/2024-10-21</code><br>\u203B \u30C7\u30D7\u30ED\u30A4 ID \u306F <code>{\u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9}{\u30E2\u30C7\u30EB\u540D(.\u306F\u524A\u9664)}</code> \u3067\u7D44\u307F\u7ACB\u3066 (Azure \u672C\u5BB6\u3067\u30C7\u30D7\u30ED\u30A4\u540D = \u30E2\u30C7\u30EB\u540D\u306B\u3057\u3066\u3044\u308B\u5834\u5408\u306F\u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9\u7A7A\u6B04\u3067OK)<br>\u203B api-version \u30C7\u30D5\u30A9\u30EB\u30C8 \u2014 \u63A8\u8AD6\u7CFB (GPT-5/o3/o4-mini): <code>2024-12-01-preview</code>\u3001\u305D\u308C\u4EE5\u5916: <code>2024-06-01</code><br>\u2014<br>\u30E2\u30C7\u30EB\u5225\u306B\u9055\u3046\u8A2D\u5B9A (\u5225\u30A8\u30F3\u30C9\u30DD\u30A4\u30F3\u30C8\u306A\u3069) \u304C\u5FC5\u8981\u306A\u5834\u5408\u306F\u30AA\u30FC\u30D0\u30FC\u30E9\u30A4\u30C9\u306B <code>{"\u30E2\u30C7\u30EB\u540D":{"baseUrl":"...","apiVersion":"...","deploymentId":"..."}}</code> \u3092\u8A18\u5165\u3002\u5404\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u4EFB\u610F\u30FB\u672A\u6307\u5B9A\u3067\u5168\u4F53\u8A2D\u5B9A\u306B\u30D5\u30A9\u30FC\u30EB\u30D0\u30C3\u30AF\u3002<br>\u30DA\u30FC\u30B8/DB \u64CD\u4F5C\u306E\u30C4\u30FC\u30EB\u6A5F\u80FD (Function Calling) \u3082\u5229\u7528\u53EF\u80FD\u3002</div></div><div class="memola-set-row" data-prov="local"><label>\u30D9\u30FC\u30B9 URL</label><input id="memola-set-localai-baseurl" type="text" placeholder="http://localhost:11434/v1 (Ollama) / http://localhost:1234/v1 (LM Studio)"></div><div class="memola-set-row" data-prov="local"><label>API \u30AD\u30FC (\u4EFB\u610F)</label><input id="memola-set-localai-key" type="password" placeholder="\u30ED\u30FC\u30AB\u30EB\u30B5\u30FC\u30D0\u5074\u3067\u8981\u6C42\u3059\u308B\u5834\u5408\u306E\u307F"></div><div class="memola-set-row" data-prov="local"><label>\u4F7F\u7528\u3059\u308B\u30E2\u30C7\u30EB</label><input id="memola-set-localai-model" type="text" placeholder="\u4F8B: llama3.1, qwen2.5-coder, mistral-small"></div><div class="memola-set-row" data-prov="local"><label>\u30E2\u30C7\u30EB\u5019\u88DC (\u4EFB\u610F / 1\u884C1\u30E2\u30C7\u30EB)</label><textarea id="memola-set-localai-models" rows="4" placeholder="llama3.1
qwen2.5-coder
gemma3:4b
mistral-small" style="font-family:var(--font-mono);font-size:11px"></textarea></div><div class="memola-set-row" data-prov="local"><label>\u63A8\u8AD6\u30E2\u30C7\u30EB (\u4EFB\u610F)</label><input id="memola-set-localai-reasoning" type="text" placeholder="\u540D\u524D\u306E\u4E00\u90E8\u3092\u7A7A\u767D\u533A\u5207\u308A (\u4F8B: o1 deepseek-r1 qwq) \u2500 \u4E00\u81F4\u3059\u308B\u30E2\u30C7\u30EB\u306F max_completion_tokens \u3092\u4F7F\u3046"></div><div class="memola-set-row" data-prov="local"><label></label><div class="memola-set-hint"><b>\u5BFE\u5FDC\u30B5\u30FC\u30D0</b>: Ollama\u3001LM Studio\u3001llama.cpp server\u3001vLLM\u3001\u305D\u306E\u4ED6 OpenAI Chat Completions \u4E92\u63DB\u306E\u3082\u306E\u3002<br><b>\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7\u4F8B (Ollama)</b>: <code>ollama serve</code> \u8D77\u52D5\u5F8C\u3001\u30D9\u30FC\u30B9 URL \u306B <code>http://localhost:11434/v1</code>\u3001\u30E2\u30C7\u30EB\u306B <code>llama3.1</code> \u7B49\u3092\u6307\u5B9A\u3002<br><b>\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7\u4F8B (LM Studio)</b>: \u300CLocal Server\u300D\u30BF\u30D6\u3067 Start\u3002\u30D9\u30FC\u30B9 URL <code>http://localhost:1234/v1</code>\u3001\u30E2\u30C7\u30EB\u306B UI \u306E\u30E2\u30C7\u30EB\u540D\u3092\u30B3\u30D4\u30FC\u3002<br><b>URL \u5F62\u5F0F</b>: <code>{\u30D9\u30FC\u30B9 URL}/chat/completions</code>\u3002<code>/v1</code> \u307E\u3067\u542B\u3081\u308B\u306E\u304C\u4E00\u822C\u7684\u3002<br>\u203B \u30D6\u30C3\u30AF\u30DE\u30FC\u30AF\u30EC\u30C3\u30C8\u3092\u958B\u3044\u3066\u3044\u308B SP \u30B5\u30A4\u30C8 (https) \u304B\u3089\u30ED\u30FC\u30AB\u30EB (http) \u306E <code>localhost</code> \u3092\u53E9\u3051\u308B\u304B\u306F\u30D6\u30E9\u30A6\u30B6\u306E\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u8A2D\u5B9A\u6B21\u7B2C\u3002\u53E9\u3051\u306A\u3044\u5834\u5408\u306F\u4E2D\u7D99\u30B9\u30AF\u30EA\u30D7\u30C8 (scripts/corp-ai-relay.py \u6539) \u7D4C\u7531\u3067\u540C\u30AA\u30EA\u30B8\u30F3\u306B\u898B\u305B\u304B\u3051\u308B\u304B\u3001\u30ED\u30FC\u30AB\u30EB AI \u30B5\u30FC\u30D0\u3092 HTTPS \u5316\u3057\u3066\u304F\u3060\u3055\u3044\u3002<br>\u203B Function Calling (\u30C4\u30FC\u30EB\u7D4C\u7531\u306E\u30DA\u30FC\u30B8/DB \u64CD\u4F5C) \u306F OpenAI \u4E92\u63DB tools \u30D1\u30E9\u30E1\u30FC\u30BF\u3092\u5B9F\u88C5\u3057\u305F\u30B5\u30FC\u30D0 (Ollama 0.3+ \u7B49) \u306E\u307F\u52D5\u4F5C\u3002</div></div><div class="memola-set-row"><label style="font-weight:600;border-top:1px solid var(--border,#e3e3e0);padding-top:14px">\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8 (RAG / \u57CB\u3081\u8FBC\u307F)</label><div class="memola-set-hint" style="border-top:1px solid var(--border,#e3e3e0);padding-top:14px">\u6587\u66F8\u3092\u6A2A\u65AD\u3057\u3066\u691C\u7D22\u30FB\u56DE\u7B54\u3059\u308B\u300C\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8\u300D\u7528\u306E\u57CB\u3081\u8FBC\u307F\u8A2D\u5B9A\u3002</div></div><div class="memola-set-row"><label>\u57CB\u3081\u8FBC\u307F\u30D7\u30ED\u30D0\u30A4\u30C0</label><select id="memola-set-embed-provider"><option value="voyage">Voyage AI (\u4E2D\u7D99\u4E0D\u8981\u30FBClaude\u4F75\u7528\u306E\u63A8\u5968)</option><option value="auto">\u30C1\u30E3\u30C3\u30C8\u3068\u540C\u3058 (Azure OpenAI \u4E92\u63DB / \u30ED\u30FC\u30AB\u30EB AI)</option></select></div><div class="memola-set-row" data-embprov="voyage"><label>Voyage API \u30AD\u30FC</label><input id="memola-set-voyage-key" type="password" placeholder="pa-... (https://dashboard.voyageai.com \u3067\u53D6\u5F97)"></div><div class="memola-set-row" data-embprov="voyage"><label>Voyage \u30E2\u30C7\u30EB</label><select id="memola-set-voyage-model"></select></div><div class="memola-set-row" data-prov="claude" data-embprov="auto"><label></label><div class="memola-set-hint">\u203B Anthropic Claude \u306B\u306F\u57CB\u3081\u8FBC\u307F API \u304C\u7121\u3044\u305F\u3081\u3001\u300C\u30C1\u30E3\u30C3\u30C8\u3068\u540C\u3058\u300D\u3067\u306F\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8 (RAG) \u306F\u4F7F\u3048\u307E\u305B\u3093\u3002<b>\u57CB\u3081\u8FBC\u307F\u30D7\u30ED\u30D0\u30A4\u30C0\u306B\u300CVoyage AI\u300D\u3092\u9078\u3076</b>\u3068\u3001Claude \u30C1\u30E3\u30C3\u30C8\u306E\u307E\u307E\u4E2D\u7D99\u30B5\u30FC\u30D0\u7121\u3057\u3067 RAG \u304C\u6709\u52B9\u306B\u306A\u308A\u307E\u3059 (\u63A8\u5968)\u3002</div></div><div class="memola-set-row" data-embprov="auto" data-prov="corp,local"><label>\u57CB\u3081\u8FBC\u307F\u30E2\u30C7\u30EB</label><select id="memola-set-embed-model"></select></div><div class="memola-set-row" data-embprov="auto" data-prov="corp"><label>\u57CB\u3081\u8FBC\u307F api-version</label><input id="memola-set-embed-apiver" type="text" placeholder="2024-02-01"></div><div class="memola-set-row"><label>\u51FA\u529B\u6B21\u5143\u6570 (\u4EFB\u610F)</label><input id="memola-set-embed-dims" type="number" min="1" placeholder="\u7A7A\u6B04=\u30E2\u30C7\u30EB\u65E2\u5B9A (voyage-3.5-lite:1024 / text-embedding-3-small:1536)"></div><div class="memola-set-row"><label>\u53D6\u5F97\u4EF6\u6570 (top-K)</label><input id="memola-set-rag-topk" type="number" min="1" max="50" placeholder="8"></div><div class="memola-set-row"><label>\u6700\u5C0F\u30B9\u30B3\u30A2</label><input id="memola-set-rag-minscore" type="number" min="0" max="1" step="0.05" placeholder="0.2"></div><div class="memola-set-row"><label style="font-weight:600;border-top:1px solid var(--border,#e3e3e0);padding-top:14px">外部ベクトル \u9023\u643A (\u6A2A\u65AD\u691C\u7D22)</label><div class="memola-set-hint" style="border-top:1px solid var(--border,#e3e3e0);padding-top:14px">外部ベクトル \u304C\u53CE\u96C6\u3057\u305F\u30D9\u30AF\u30C8\u30EB(\u30E1\u30FC\u30EB/OneNote/PPTX\u7B49)\u3092\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8\u306E\u691C\u7D22\u5BFE\u8C61\u306B\u52A0\u3048\u307E\u3059\u3002<b>\u57CB\u3081\u8FBC\u307F\u30E2\u30C7\u30EB/\u6B21\u5143\u3092 外部ベクトル \u3068\u540C\u3058</b>\u306B\u3057\u3066\u304A\u304F\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059(\u4E0D\u4E00\u81F4\u306E\u30D9\u30AF\u30C8\u30EB\u306F\u81EA\u52D5\u3067\u30B9\u30AD\u30C3\u30D7)\u3002\u672C\u6587\u306F\u30D9\u30AF\u30C8\u30EB\u30D5\u30A1\u30A4\u30EB\u5185\u306B\u3042\u308B\u305F\u3081\u4E2D\u7D99\u30B5\u30FC\u30D0\u306F\u4E0D\u8981\u3067\u3059\u3002</div></div><div class="memola-set-row"><label>外部ベクトル \u30D9\u30AF\u30C8\u30EB\u30D5\u30A9\u30EB\u30C0</label><input id="memola-set-rag-extvec-folder" type="text" placeholder="\u4F8B: Shared Documents/外部ベクトル (\u7A7A\u6B04=\u7121\u52B9)"></div><div class="memola-set-row"><label>\u691C\u7D22\u5BFE\u8C61\u306E\u7A2E\u985E</label><div class="memola-set-hint" style="display:flex;flex-wrap:wrap;gap:10px 16px"><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-mail">\u30E1\u30FC\u30EB</label><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-onenote">OneNote</label><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-pptx">PPTX</label><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-doc">\u6587\u66F8</label><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-transcript">\u6587\u5B57\u8D77\u3053\u3057</label></div></div><div class="memola-set-row"><label></label><div class="memola-set-hint"><b>Voyage AI</b>: \u30D6\u30E9\u30A6\u30B6\u304B\u3089\u76F4\u63A5\u547C\u3079\u308B (CORS\u5BFE\u5FDC) \u305F\u3081\u4E2D\u7D99\u30B5\u30FC\u30D0\u4E0D\u8981\u3002Claude \u30C1\u30E3\u30C3\u30C8\u3068\u306E\u4F75\u7528\u306B\u6700\u9069\u3002<br><b>\u30C1\u30E3\u30C3\u30C8\u3068\u540C\u3058</b>: corp=<code>{\u30D9\u30FC\u30B9URL}/openai/deployments/{\u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9+\u30E2\u30C7\u30EB}/embeddings</code>\u3001local=<code>{\u30D9\u30FC\u30B9URL}/embeddings</code>\u3002<br>\u203B \u53D6\u5F97\u4EF6\u6570=\u6587\u8108\u3078\u6E21\u3059\u985E\u4F3C\u30C1\u30E3\u30F3\u30AF\u306E\u6700\u5927\u6570\u3001\u6700\u5C0F\u30B9\u30B3\u30A2=\u30B3\u30B5\u30A4\u30F3\u985E\u4F3C\u5EA6\u306E\u8DB3\u5207\u308A (0\u301C1)\u3002<br>\u203B \u57CB\u3081\u8FBC\u307F\u30E2\u30C7\u30EB/\u6B21\u5143\u3092\u5909\u3048\u305F\u3089\u65E2\u5B58\u30D9\u30AF\u30C8\u30EB\u306F\u7121\u52B9\u306B\u306A\u308A\u307E\u3059 \u2014 \u8A2D\u5B9A\u2192\u30EA\u30BB\u30C3\u30C8\u3067\u4F5C\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div></div></div><div class="memola-set-pane" data-pane="save"><div class="memola-set-row"><label>\u81EA\u52D5\u4FDD\u5B58</label><select id="memola-set-savedelay"><option value="0">\u624B\u52D5\u306E\u307F (Ctrl/\u2318+S)</option><option value="1000">1 \u79D2\u5F8C</option><option value="2000" selected>2 \u79D2\u5F8C (\u65E2\u5B9A)</option><option value="5000">5 \u79D2\u5F8C</option><option value="10000">10 \u79D2\u5F8C</option><option value="30000">30 \u79D2\u5F8C</option></select></div><div class="memola-set-row"><label>\u540C\u671F\u30C1\u30A7\u30C3\u30AF</label><select id="memola-set-syncpoll"><option value="0">\u30AA\u30D5 (1 \u4EBA\u904B\u7528)</option><option value="30000" selected>30 \u79D2\u3054\u3068 (\u65E2\u5B9A)</option><option value="60000">1 \u5206\u3054\u3068</option><option value="300000">5 \u5206\u3054\u3068</option></select></div><div class="memola-set-row"><label>\u30D7\u30EC\u30BC\u30F3\u30B9\u8868\u793A</label><select id="memola-set-presence"><option value="1" selected>ON (\u30A2\u30D0\u30BF\u30FC\u3092\u5171\u6709/\u8868\u793A)</option><option value="0">OFF (SP \u306B\u66F8\u304D\u8FBC\u307E\u306A\u3044)</option></select></div><div class="memola-set-row"><label></label><div class="memola-set-hint"><b>\u81EA\u52D5\u4FDD\u5B58</b>: \u300C\u624B\u52D5\u306E\u307F\u300D\u306B\u3059\u308B\u3068\u7DE8\u96C6\u4E2D\u306E\u81EA\u52D5 SP \u66F8\u304D\u8FBC\u307F\u304C\u6B62\u307E\u308A\u3001Ctrl/\u2318+S \u3067\u3060\u3051\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002SP \u8CA0\u8377\u306E\u6700\u5C0F\u5316\u3084\u30D0\u30C3\u30C6\u30EA\u30FC\u7BC0\u7D04\u306B\u3002<br><b>\u540C\u671F\u30C1\u30A7\u30C3\u30AF</b>: \u958B\u3044\u3066\u3044\u308B\u30DA\u30FC\u30B8\u304C\u4ED6\u30BF\u30D6/\u4ED6\u30E6\u30FC\u30B6\u306B\u66F4\u65B0\u3055\u308C\u305F\u304B\u3092\u30DD\u30FC\u30EA\u30F3\u30B0\u691C\u77E5\u3057\u307E\u3059\u30021 \u4EBA\u904B\u7528\u306A\u3089\u300C\u30AA\u30D5\u300D\u3067\u8AA4\u901A\u77E5\u30BC\u30ED + SP \u8AAD\u307F\u53D6\u308A\u30BC\u30ED\u3002<br><b>\u30D7\u30EC\u30BC\u30F3\u30B9</b>: \u540C\u3058\u30DA\u30FC\u30B8\u3092\u898B\u3066\u3044\u308B\u30E6\u30FC\u30B6\u306E\u30A2\u30D0\u30BF\u30FC\u3092\u8868\u793A\u3059\u308B\u305F\u3081\u3001\u5B9A\u671F\u7684\u306B SP \u306B\u5B58\u5728\u3092\u66F8\u304D\u8FBC\u307F\u307E\u3059\u3002OFF \u3067\u3053\u306E\u66F8\u304D\u8FBC\u307F\u3092\u6B62\u3081\u3089\u308C\u307E\u3059\u3002</div></div></div><div class="memola-set-pane" data-pane="display"><div class="memola-set-row"><label>\u8868\u793A\u5BC6\u5EA6</label><select id="memola-set-density"><option value="compact">\u30B3\u30F3\u30D1\u30AF\u30C8</option><option value="regular" selected>\u6A19\u6E96</option><option value="comfy">\u3086\u3063\u305F\u308A</option></select></div><div class="memola-set-row"><label>\u30C6\u30FC\u30DE</label><select id="memola-set-theme"><option value="light" selected>\u30E9\u30A4\u30C8</option><option value="dark">\u30C0\u30FC\u30AF</option></select></div></div><div class="memola-set-pane" data-pane="help"><div class="memola-set-row"><label>\u30AD\u30FC\u30DC\u30FC\u30C9\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8</label><button class="memola-btn s" id="memola-set-shortcuts">\u2328 \u4E00\u89A7\u3092\u8868\u793A</button></div><div class="memola-set-row"><label></label><div class="memola-set-hint">\u4E3B\u8981\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u306F <code>?</code> \u30AD\u30FC (\u30A8\u30C7\u30A3\u30BF\u5916) \u3067\u3082\u4E00\u89A7\u304C\u958B\u304D\u307E\u3059\u3002</div></div><div class="memola-set-row"><label>\u30D3\u30EB\u30C9</label><code id="memola-set-build-id" style="font-size:12px;color:var(--ink-3)"></code></div><div class="memola-set-row"><label></label><div class="memola-set-hint">\u4E0D\u5177\u5408\u3092\u5831\u544A\u3059\u308B\u6642\u306B\u3053\u306E ID \u3092\u4E00\u7DD2\u306B\u4F1D\u3048\u3066\u304F\u3060\u3055\u3044\u3002\u53E4\u3044\u30D6\u30C3\u30AF\u30DE\u30FC\u30AF\u30EC\u30C3\u30C8\u3092\u4F7F\u3044\u7D9A\u3051\u3066\u3044\u306A\u3044\u304B\u306E\u78BA\u8A8D\u306B\u3082\u306A\u308A\u307E\u3059\u3002</div></div></div><div class="memola-set-pane" data-pane="dev"><div class="memola-set-row"><label>\u30D0\u30F3\u30C9\u30EB\u53D6\u5F97\u5143</label><select id="memola-set-dev-source"><option value="sharepoint">SharePoint (\u672C\u756A\u30FB\u81EA\u52D5\u66F4\u65B0)</option><option value="local">\u30ED\u30FC\u30AB\u30EB\u30EA\u30EC\u30FC (\u958B\u767A)</option></select></div><div class="memola-set-row" data-dev="local"><label>\u30ED\u30FC\u30AB\u30EB\u30D9\u30FC\u30B9 URL</label><input id="memola-set-dev-localbase" type="text" placeholder="http://127.0.0.1:18080/memola"></div><div class="memola-set-row"><label>relay \u914D\u4FE1\u30D5\u30A9\u30EB\u30C0</label><input id="memola-set-dev-relaydir" type="text" placeholder="\u4F8B: C:\\\\tools\\\\n365\\\\dist (relay \u304C memola.bundle.js \u3092\u914D\u308B\u5834\u6240)"><div class="memola-set-hint" id="memola-set-dev-relaydir-status">relay \u306B\u7167\u4F1A\u3057\u307E\u3059\u2026</div></div><div class="memola-set-row"><label>\u30EA\u30EC\u30FC\u306E\u66F4\u65B0</label><button class="memola-btn s" id="memola-set-relay-update">\u30EA\u30EC\u30FC\u66F4\u65B0\u3092\u78BA\u8A8D</button><div class="memola-set-hint" id="memola-set-relay-update-msg">SP \u306E relay-version.txt \u3068\u8D77\u52D5\u4E2D\u30EA\u30EC\u30FC\u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u6BD4\u8F03\u3057\u3001\u5DEE\u5206\u304C\u3042\u308C\u3070\u30B9\u30AF\u30EA\u30D7\u30C8(ps1/bat)\u3092\u81EA\u52D5\u66F4\u65B0\u3057\u3066\u518D\u8D77\u52D5\u3057\u307E\u3059\u3002</div></div><div class="memola-set-row"><label></label><div class="memola-set-hint">\u30D6\u30C3\u30AF\u30DE\u30FC\u30AF\u30EC\u30C3\u30C8\u306F<b>\u6975\u5C0F\u30ED\u30FC\u30C0</b>\u306B\u306A\u308A\u3001\u8D77\u52D5\u6642\u306B\u672C\u4F53(<code>memola.bundle.js</code>)\u3092\u53D6\u5F97\u3057\u307E\u3059\u3002<br><b>SharePoint</b>: \u30B5\u30A4\u30C8\u306E <code>\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8/memola/</code> \u306B\u7F6E\u3044\u305F <code>memola.bundle.js</code>\uFF0B<code>version.txt</code> \u3092\u6BCE\u56DE\u78BA\u8A8D\u3057\u3001\u66F4\u65B0\u304C\u3042\u308C\u3070\u81EA\u52D5\u3067\u6700\u65B0\u5316(\u518D\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u4E0D\u8981)\u3002<br><b>\u30ED\u30FC\u30AB\u30EB\u30EA\u30EC\u30FC</b>: <code>node build.js</code> \u5F8C\u306B\u30EA\u30EC\u30FC\u304C <code>dist/</code> \u3092\u914D\u4FE1\u3002\u30B3\u30FC\u30C9\u5909\u66F4\u2192\u30D3\u30EB\u30C9\u2192\u30EA\u30ED\u30FC\u30C9\u3067\u5373\u53CD\u6620(\u958B\u767A\u7528)\u3002<br>\u203B \u5909\u66F4\u306F<b>\u6B21\u56DE\u8D77\u52D5/\u30EA\u30ED\u30FC\u30C9</b>\u3067\u53CD\u6620\u3055\u308C\u307E\u3059\u3002</div></div></div><div class="memola-set-pane" data-pane="debug"><div class="memola-set-row"><label></label><div class="memola-set-hint" style="background:rgba(235,87,87,.10);border-left-color:rgba(235,87,87,.55);color:var(--ink)"><b>\u26A0 \u5371\u967A\u306A\u64CD\u4F5C</b><br>\u4EE5\u4E0B\u306E\u30EA\u30BB\u30C3\u30C8\u64CD\u4F5C\u306F\u3059\u3079\u3066<b>\u53D6\u308A\u6D88\u3057\u4E0D\u53EF</b>\u3067\u3059\u3002SP \u306E\u3054\u307F\u7BB1\u304B\u3089\u3082\u5FA9\u5143\u3067\u304D\u307E\u305B\u3093\u3002<br>\u5B9F\u884C\u524D\u306B\u5FC5\u8981\u306A\u30C7\u30FC\u30BF\u304C\u4ED6\u306B\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3055\u308C\u3066\u3044\u308B\u3053\u3068\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div></div><div class="memola-set-row"><label>1. \u81EA\u5206\u306E\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u306E\u307F\u524A\u9664</label><button class="memola-btn s" id="memola-set-reset-mine">\u524A\u9664\u3092\u5B9F\u884C</button><div class="memola-set-hint"><b>\u524A\u9664\u5BFE\u8C61</b>: \u81EA\u5206\u304C\u4F5C\u6210\u3057\u305F\u300C\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u300D\u306E\u30DA\u30FC\u30B8\u30FBDB \u306E\u307F<br><b>\u6B8B\u308B\u3082\u306E</b>: \u7D44\u7E54\u5171\u901A / \u4ED6\u306E\u30E6\u30FC\u30B6\u306E\u30DA\u30FC\u30B8\u30FBDB / localStorage \u306E\u8A2D\u5B9A (API \u30AD\u30FC\u30FB\u30C6\u30FC\u30DE\u7B49)</div></div><div class="memola-set-row"><label>2. \u7D44\u7E54+\u4ED6\u4EBA\u306E\u30C7\u30FC\u30BF\u306E\u307F\u524A\u9664</label><button class="memola-btn s" id="memola-set-reset-others">\u524A\u9664\u3092\u5B9F\u884C</button><div class="memola-set-hint"><b>\u524A\u9664\u5BFE\u8C61</b>: \u7D44\u7E54\u5171\u901A + \u4ED6\u306E\u30E6\u30FC\u30B6\u306E\u30DA\u30FC\u30B8\u30FBDB<br><b>\u6B8B\u308B\u3082\u306E</b>: \u81EA\u5206\u306E\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u30C7\u30FC\u30BF / localStorage \u306E\u8A2D\u5B9A</div></div><div class="memola-set-row"><label>3. \u5168\u30C7\u30FC\u30BF + \u8A2D\u5B9A\u3092\u521D\u671F\u5316</label><button class="memola-btn p" id="memola-set-reset-all" style="background:#c44;border-color:#c44">\u26A0 \u5B8C\u5168\u30EA\u30BB\u30C3\u30C8</button><div class="memola-set-hint"><b>\u524A\u9664\u5BFE\u8C61</b>: memola-* \u3067\u59CB\u307E\u308B\u5168 SP \u30EA\u30B9\u30C8 + memola. \u3067\u59CB\u307E\u308B\u5168 localStorage \u30AD\u30FC<br>\u5B9F\u884C\u5F8C\u306F\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u76F4\u5F8C\u306E\u72B6\u614B\u306B\u623B\u308A\u307E\u3059\u3002SP \u30DA\u30FC\u30B8\u3092 1 \u5EA6\u30EA\u30ED\u30FC\u30C9\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div></div></div></div></div><div class="memola-ma"><button class="memola-btn s" id="memola-set-cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" id="memola-set-save">\u4FDD\u5B58</button></div></div></div><div id="memola-pgm"><div class="memola-pgm-item" data-action="export-md">`+$.download+'<span>Markdown\u3067\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8</span></div><div class="memola-pgm-item" data-action="export-html">'+$.download+'<span>HTML\u3067\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8</span></div><div class="memola-pgm-sep"></div><div class="memola-pgm-item" data-action="duplicate">'+$.copy+'<span>\u8907\u88FD</span></div><div class="memola-pgm-item" data-action="duplicate-as-draft">\u270F\uFE0F<span>\u4E0B\u66F8\u304D\u3068\u3057\u3066\u8907\u88FD</span></div><div class="memola-pgm-item" data-action="register-template">\u{1F9E9}<span>\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3068\u3057\u3066\u767B\u9332</span></div><div class="memola-pgm-item" data-action="version-history">\u{1F4DC}<span>\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74</span></div><div class="memola-pgm-item" data-action="copy-link">'+$.link+'<span>\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC</span></div><div class="memola-pgm-item" data-action="toggle-scope"><span class="memola-pgm-scope-ic">\u{1F512}</span><span class="memola-pgm-scope-label">\u7D44\u7E54\u306B\u516C\u958B</span></div><div class="memola-pgm-item" data-action="publish">'+$.link+'<span class="memola-pgm-publish-label">Web \u516C\u958B</span></div><div class="memola-pgm-item" data-action="copy-pub-url" style="display:none">'+$.copy+'<span>\u516C\u958B URL \u3092\u30B3\u30D4\u30FC</span></div><div class="memola-pgm-item" data-action="restore-daily" style="display:none">\u{1F4C5}<span>\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u306B\u623B\u3059</span></div><div class="memola-pgm-sep"></div><div class="memola-pgm-item" data-action="print">'+$.print+'<span>\u5370\u5237</span></div><div class="memola-pgm-item" data-action="info">'+$.info+'<span>\u30DA\u30FC\u30B8\u60C5\u5831</span></div><div class="memola-pgm-item" data-action="focus">'+$.sidebar+'<span>\u96C6\u4E2D\u30E2\u30FC\u30C9\u5207\u66FF</span></div><div class="memola-pgm-sep"></div><div class="memola-pgm-item danger" data-action="delete">'+$.trash+'<span>\u524A\u9664</span></div></div><div id="memola-tk"></div>'}rb();var TT=`/* \u2500\u2500 Design tokens (Claude Design palette: paper + ink + moss) \u2500\u2500 */
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
  flex: 0 0 auto; display: grid; place-items: center; width: 30px; height: 30px;
  border: 1px solid var(--border, #d8d6cf); border-radius: 6px;
  background: #fff; color: var(--ink-3, #7a766c); cursor: pointer; padding: 0;
}
#memola-overlay .memola-email-src svg { width: 15px; height: 15px; }
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
  /* 別アプリ xl \u3068\u540C\u3058: viewport \u306E\u7D04 2/3\u3001\u53F3\u4E0B\u30C9\u30E9\u30C3\u30B0\u3067\u81EA\u7531\u30EA\u30B5\u30A4\u30BA\u3002 */
  max-width: none !important;
  width: min(1000px, calc((100vw - 80px) * 2 / 3)) !important;
  height: calc(100vh - 80px) !important;
  min-width: 640px; min-height: 480px;
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
  display: flex; flex-direction: column; flex: 1; min-height: 0; min-width: 0;
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
/* \uFF0B\u30D3\u30E5\u30FC\u8FFD\u52A0\u30DC\u30BF\u30F3 */
#memola-overlay .memola-db-vadd {
  padding: 4px 6px; border: none; background: transparent; cursor: pointer;
  color: var(--ink-4); border-radius: 6px; display: inline-flex; align-items: center;
  align-self: center; transition: background var(--tr-fast), color var(--tr-fast);
}
#memola-overlay .memola-db-vadd:hover { background: var(--paper-2); color: var(--ink); }
#memola-overlay .memola-db-vadd svg { width: 16px; height: 16px; }
/* \u30D3\u30E5\u30FC\u540D\u306E\u30A4\u30F3\u30E9\u30A4\u30F3\u6539\u540D */
#memola-overlay .memola-vname-edit {
  border: 1px solid var(--accent); border-radius: 4px; padding: 2px 6px;
  font: inherit; font-size: var(--fs-md); background: var(--paper); color: var(--ink);
  outline: none; width: 9em;
}
#memola-overlay .memola-colmenu-item .memola-mi-ic { display: inline-flex; align-items: center; }
#memola-overlay .memola-colmenu-item .memola-mi-ic svg { width: 15px; height: 15px; opacity: .75; }

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
/* min-width:0 \u304C\u7121\u3044\u3068 flex \u65E2\u5B9A\u306E min-width:auto \u3067\u4E2D\u306E\u5E83\u3044\u30C6\u30FC\u30D6\u30EB\u306B\u62BC\u3057\u5E83\u3052\u3089\u308C\u3001
   \u6A2A\u30B9\u30AF\u30ED\u30FC\u30EB\u306B\u306A\u3089\u305A\u753B\u9762\u5916\u306B\u306F\u307F\u51FA\u3059\u30020 \u306B\u3057\u3066 wrap \u5185\u3067\u6A2A\u30B9\u30AF\u30ED\u30FC\u30EB\u3055\u305B\u308B\u3002 */
#memola-dt-wrap { flex: 1; overflow: auto; padding: 0; min-width: 0; }
#memola-dt {
  /* \u5217\u304C\u591A\u304F\u3066\u5165\u308A\u304D\u3089\u306A\u3044\u6642\u306F\u7E2E\u3081\u305A\u3001\u5185\u5BB9\u5E45(\u5217\u5E45\u306E\u5408\u8A08)\u307E\u3067\u5E83\u3052\u3066
     #memola-dt-wrap \u306E\u6A2A\u30B9\u30AF\u30ED\u30FC\u30EB\u3067\u898B\u305B\u308B\u3002\u5C11\u306A\u3044\u6642\u306F 100% \u306B\u4F38\u3070\u3059\u3002 */
  width: max-content; min-width: 100%; border-collapse: collapse;
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
/* \u30D0\u30F3\u30C9\u30EB\u66F4\u65B0\u30C8\u30FC\u30B9\u30C8 \u2014 mention-toast \u3068\u540C\u3058\u53F3\u4E0A\u30B9\u30BF\u30C3\u30AFUI\u306B\u5408\u308F\u305B\u308B */
#memola-overlay #memola-update-bar{position:fixed;top:calc(var(--topbar-h,48px) + 12px);right:16px;z-index:2147483647;display:flex;align-items:center;gap:10px;width:300px;padding:10px 12px;border-radius:8px;background:var(--accent,#7a8a78);color:#fff;box-shadow:0 4px 16px rgba(0,0,0,.18);font-size:var(--fs-sm)}
#memola-overlay #memola-update-bar span{flex:1;min-width:0}
#memola-overlay #memola-update-bar button{flex:0 0 auto;border:0;border-radius:6px;cursor:pointer;font:inherit;font-size:var(--fs-sm);font-weight:600;padding:4px 10px;background:#fff;color:var(--accent-strong,#5e6f5c)}
#memola-overlay #memola-update-bar #memola-update-dismiss{background:transparent;color:#fff;padding:2px 6px;font-size:16px}
/* DB \u5217\u30D8\u30C3\u30C0\u306E\u30AF\u30EA\u30C3\u30AF\u30E1\u30CB\u30E5\u30FC(Notion \u98A8) */
#memola-overlay .memola-colmenu{position:fixed;z-index:2147483646;min-width:200px;background:var(--paper,#fff);border:1px solid var(--paper-3,#e8e4d8);border-radius:8px;box-shadow:0 6px 24px rgba(0,0,0,.16);padding:4px;font-size:var(--fs-sm)}
#memola-overlay .memola-colmenu-item{padding:7px 10px;border-radius:6px;cursor:pointer;color:var(--ink,#2a2a26);white-space:nowrap}
#memola-overlay .memola-colmenu-item:hover{background:var(--paper-2,#f3f1ea)}
#memola-overlay .memola-colmenu-item.danger{color:var(--danger,#b8534a)}
#memola-overlay .memola-colmenu-sep{height:1px;background:var(--paper-3,#e8e4d8);margin:4px 0}
/* \u9078\u629E\u80A2\u30A8\u30C7\u30A3\u30BF(\u884C: \u8272\u30B9\u30A6\u30A9\u30C3\u30C1 + \u6539\u540D\u5165\u529B + \u524A\u9664) */
#memola-overlay .memola-optedit{min-width:240px}
#memola-overlay .memola-optedit-row{display:flex;align-items:center;gap:8px;padding:3px 6px}
#memola-overlay .memola-optedit-sw{flex:0 0 auto;width:16px;height:16px;border-radius:4px;border:1px solid rgba(0,0,0,.15);cursor:pointer;padding:0}
#memola-overlay .memola-optedit-inp{flex:1;min-width:0;border:1px solid transparent;border-radius:5px;padding:4px 6px;font:inherit;font-size:var(--fs-sm);background:transparent;color:var(--ink,#2a2a26);outline:none}
#memola-overlay .memola-optedit-inp:hover{background:var(--paper-2,#f3f1ea)}
#memola-overlay .memola-optedit-inp:focus{background:var(--paper,#fff);border-color:var(--accent,#7a8a78)}
#memola-overlay .memola-optedit-del{flex:0 0 auto;width:20px;height:20px;border:0;background:transparent;color:var(--ink-4,#a8a39a);cursor:pointer;border-radius:4px;font-size:15px;line-height:1}
#memola-overlay .memola-optedit-del:hover{background:rgba(0,0,0,.08);color:var(--danger,#b8534a)}
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
`;(function(){let e=document.getElementById("memola-overlay");if(e){try{e.__memolaShutdown?.()}catch{}e.remove();let n=document.getElementById("memola-style");n&&n.remove();return}if(!location.hostname.endsWith("sharepoint.com")){alert("SharePoint\u306E\u30DA\u30FC\u30B8\u4E0A\u3067\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u304F\u3060\u3055\u3044\u3002");return}Qb();let t=document.createElement("style");t.id="memola-style",t.textContent=TT,document.head.appendChild(t);let o=document.createElement("div");o.id="memola-overlay",o.innerHTML=tv(),document.body.appendChild(o),$b(),Kb()})();})();
