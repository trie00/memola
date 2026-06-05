"use strict";(()=>{var z1=Object.create;var nc=Object.defineProperty;var j1=Object.getOwnPropertyDescriptor;var q1=Object.getOwnPropertyNames;var $1=Object.getPrototypeOf,K1=Object.prototype.hasOwnProperty;var L=(e,t)=>()=>(e&&(t=e(e=0)),t);var Vt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),q=(e,t)=>{for(var o in t)nc(e,o,{get:t[o],enumerable:!0})},fb=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of q1(t))!K1.call(e,r)&&r!==o&&nc(e,r,{get:()=>t[r],enumerable:!(n=j1(t,r))||n.enumerable});return e};var W1=(e,t,o)=>(o=e!=null?z1($1(e)):{},fb(t||!e||!e.__esModule?nc(o,"default",{value:e,enumerable:!0}):o,e)),G1=e=>fb(nc({},"__esModule",{value:!0}),e);var Pp={};q(Pp,{DRAFT_KEY_PREFIX:()=>Mp,prefAiClaudeKey:()=>ac,prefAiClaudeModel:()=>rc,prefAiCorpBaseUrl:()=>lo,prefAiCorpDeployPrefix:()=>ha,prefAiCorpKey:()=>ic,prefAiCorpModel:()=>ga,prefAiCorpOverrides:()=>sc,prefAiEmbedApiVersion:()=>xa,prefAiEmbedDimensions:()=>wa,prefAiEmbedModel:()=>ya,prefAiEmbedProvider:()=>ba,prefAiHistory:()=>lc,prefAiLocalBaseUrl:()=>cc,prefAiLocalKey:()=>dc,prefAiLocalModel:()=>mc,prefAiLocalModels:()=>pc,prefAiLocalReasoningModels:()=>uc,prefAiPaneOpen:()=>ss,prefAiPanelOpen:()=>Q1,prefAiPanelWidth:()=>eT,prefAiProvider:()=>fa,prefAiVoyageKey:()=>fc,prefAiVoyageModel:()=>va,prefCalDateField:()=>Ic,prefCurrentWsName:()=>fr,prefCurrentWsUrl:()=>gr,prefDbColOrder:()=>pT,prefDbColOrderLegacy:()=>xc,prefDbColWidths:()=>fT,prefDbGanttConfig:()=>kc,prefDbRowOrder:()=>uT,prefDbRowOrderLegacy:()=>wc,prefDbViewColors:()=>ur,prefDensity:()=>ts,prefDevBundleSource:()=>es,prefDevLocalBase:()=>gc,prefFocusMode:()=>Sa,prefLastOpenedPages:()=>ns,prefLastSavedBy:()=>hT,prefLastSeenEtag:()=>Yo,prefOutlineOpen:()=>as,prefOutlineWidth:()=>Z1,prefPaneAiWidth:()=>Sp,prefPaneOutlineWidth:()=>Tp,prefPanePropsWidth:()=>Lp,prefPaneSbWidth:()=>Ep,prefPresenceEnabled:()=>hr,prefPropertiesOpen:()=>is,prefPropsPanelOpen:()=>tT,prefPropsPanelWidth:()=>oT,prefRagMinScore:()=>Ia,prefRag外部ベクトルFolder:()=>Ea,prefRag外部ベクトルKinds:()=>Ta,prefRagTopK:()=>ka,prefSaveDelayMs:()=>La,prefSiblingOrder:()=>gT,prefSidebarOpen:()=>X1,prefSidebarState:()=>Ma,prefSidebarWidth:()=>J1,prefSyncPollMs:()=>Ln,prefTabs:()=>rs,prefTheme:()=>os,prefTreeOrder:()=>yc,prefWorkspaces:()=>vc,prefXChatHistory:()=>hc,prefXChatOpen:()=>bc});function gb(e){try{return localStorage.getItem(e)||""}catch{return""}}function hb(e,t){try{t===""||t==null?localStorage.removeItem(e):localStorage.setItem(e,t)}catch{}}function bb(e){try{localStorage.removeItem(e)}catch{}}function V1(e,t){let o=gb(e);if(!o)return t;try{return JSON.parse(o)}catch{return t}}function Y1(e,t){try{hb(e,JSON.stringify(t))}catch{}}function Y(e,t=""){return{key:e,get:()=>gb(e)||t,set:o=>hb(e,o),clear:()=>bb(e)}}function so(e,t){return{key:e,get:()=>V1(e,t),set:o=>Y1(e,o),clear:()=>bb(e)}}function pT(e){return so(nT+e,[])}function uT(e){return so(rT+e,[])}function xc(e){return so(aT+e,[])}function wc(e){return so(iT+e,[])}function kc(e,t){return so(sT+e,t)}function fT(e){return so(lT+e,{})}function gT(e){return so(cT+(e||"_root"),[])}function Ic(e){return Y(dT+e)}function hT(e){return Y(mT+e)}function Yo(e){return Y(bT+e)}var ur,fa,rc,ac,ga,ic,lo,ha,sc,lc,cc,dc,mc,pc,uc,ba,fc,va,ya,xa,wa,ka,Ia,es,gc,Ea,Ta,hc,bc,vc,fr,gr,ts,os,La,Ln,hr,ns,rs,X1,J1,as,Z1,Q1,eT,tT,oT,Sa,Ma,is,ss,Ep,Tp,Lp,Sp,nT,rT,aT,iT,sT,lT,cT,dT,mT,yc,bT,Mp,ve=L(()=>{"use strict";ur=so("memola.dbViewColors",{}),fa=Y("memola.ai.provider","claude"),rc=Y("memola.ai.claudeModel"),ac=Y("memola.anthropic.apiKey"),ga=Y("memola.ai.corpModel"),ic=Y("memola.ai.corpKey"),lo=Y("memola.ai.corpBaseUrl"),ha=Y("memola.ai.corpDeployPrefix"),sc=Y("memola.ai.corpOverrides"),lc=Y("memola.ai.history"),cc=Y("memola.ai.localBaseUrl"),dc=Y("memola.ai.localKey"),mc=Y("memola.ai.localModel"),pc=Y("memola.ai.localModels"),uc=Y("memola.ai.localReasoningModels"),ba=Y("memola.ai.embedProvider","voyage"),fc=Y("memola.ai.voyageKey"),va=Y("memola.ai.voyageModel","voyage-3.5-lite"),ya=Y("memola.ai.embedModel","text-embedding-3-small"),xa=Y("memola.ai.embedApiVersion","2024-02-01"),wa=Y("memola.ai.embedDimensions",""),ka=Y("memola.rag.topK","8"),Ia=Y("memola.rag.minScore","0.2"),es=Y("memola.dev.bundle-source",""),gc=Y("memola.dev.local-base","http://127.0.0.1:18080/memola"),Ea=Y("memola.rag.extvecFolder",""),Ta=Y("memola.rag.extvecKinds","mail,onenote,pptx,doc,transcript"),hc=Y("memola.xchat.history"),bc=Y("memola.xchat.open"),vc=Y("memola.workspaces"),fr=Y("memola.workspace.current"),gr=Y("memola.workspace.currentUrl"),ts=Y("memola.density","regular"),os=Y("memola.theme","light"),La=Y("memola.save.delayMs","2000"),Ln=Y("memola.sync.pollMs","30000"),hr=Y("memola.presence.enabled","1"),ns=so("memola.lastOpenedPage",{}),rs=so("memola.tabs",{}),X1=Y("memola.sb.open"),J1=Y("memola.sb.width"),as=Y("memola.outline.open"),Z1=Y("memola.outline.width"),Q1=Y("memola.ai.panelOpen"),eT=Y("memola.ai.panelWidth"),tT=Y("memola.props.open"),oT=Y("memola.props.width"),Sa=Y("memola.focus"),Ma=Y("memola.sidebar"),is=Y("memola.properties.open"),ss=Y("memola.page.aiPane"),Ep=Y("memola.pane.sb"),Tp=Y("memola.pane.outline"),Lp=Y("memola.pane.props"),Sp=Y("memola.pane.ai"),nT="memola.db.colOrder.",rT="memola.db.rowOrder.",aT="memola.db.colorder.",iT="memola.db.roworder.",sT="memola.db.gantt.",lT="memola.db.colWidths.",cT="memola.tree.sib.",dT="memola.cal.dateField.",mT="memola.lastSavedBy.",yc=so("memola.tree.order",{});bT="memola.lastSeenEtag.";Mp="memola.draft."});function Cp(e){G=e.replace(/\/$/,""),Xo=G.replace(/https:\/\/[^\/]+/,""),ls=Xo+"/Shared Documents/memola-pages"}function vb(){let e=location.href.match(/(https:\/\/[^\/]+\/sites\/[^\/]+)/),t=gr.get();t||(t=e?e[1]:location.origin),Cp(t)}var G,Xo,ls,cs,Ec,He=L(()=>{"use strict";ve();G="",Xo="",ls="",cs=1e4,Ec=100});var yb={};q(yb,{ICONS:()=>$});var ye,$,Pa=L(()=>{"use strict";ye=e=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,$={search:ye('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),plus:ye('<path d="M12 5v14M5 12h14"/>'),link:ye('<path d="M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"/><path d="M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"/>'),copy:ye('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>'),filter:ye('<path d="M3 5h18l-7 9v6l-4-2v-4z"/>'),sort:ye('<path d="M3 6h13M3 12h9M3 18h5"/><path d="M17 16l4 4 4-4" transform="translate(-4 -4)"/>'),trash:ye('<path d="M3 6h18"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>'),edit:ye('<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>'),refresh:ye('<path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>'),gear:ye('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),send:ye('<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>'),external:ye('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/>'),chat:ye('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>'),stop:ye('<rect x="6" y="6" width="12" height="12" rx="1"/>'),close:ye('<path d="M6 6l12 12M18 6L6 18"/>'),exit:ye('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>'),sparkle:ye('<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="2.5"/>'),info:ye('<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/>'),code:ye('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),codeBlock:ye('<rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="10 14 8 12 10 10"/><polyline points="14 10 16 12 14 14"/>'),ul:ye('<line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1.3" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="4.5" cy="18" r="1.3" fill="currentColor" stroke="none"/>'),ol:ye('<line x1="10" y1="6" x2="20" y2="6"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="10" y1="18" x2="20" y2="18"/><path d="M3.5 4.5L5 3.5v5"/><path d="M3.5 8.5h3"/>'),todo:ye('<rect x="3" y="3" width="18" height="18" rx="3"/><polyline points="8 12 11 15 16 9"/>'),hr:ye('<line x1="4" y1="12" x2="20" y2="12"/>'),database:ye('<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>'),page:ye('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>'),table:ye('<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/>'),board:ye('<rect x="3" y="3" width="6" height="18" rx="1"/><rect x="11" y="3" width="6" height="11" rx="1"/><rect x="19" y="3" width="2" height="7" rx="1"/>'),sidebar:ye('<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>'),chevronLeft:ye('<polyline points="15 18 9 12 15 6"/>'),chevronRight:ye('<polyline points="9 18 15 12 9 6"/>'),download:ye('<path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><line x1="4" y1="21" x2="20" y2="21"/>'),print:ye('<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>'),quote:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 11c0-2.2 1.3-4 4-4v2c-1 0-2 1-2 2h2v5H5v-5zm8 0c0-2.2 1.3-4 4-4v2c-1 0-2 1-2 2h2v5h-4v-5z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>'}});var Yt={};q(Yt,{S:()=>m,resetAppState:()=>Ap});function Ap(){m.meta={pages:[]},m.tabs=[],m.activeTabId=null,m.currentId=null,m.currentType="page",m.dbFields=[],m.dbItems=[],m.dbList="",m.dbSort={field:null,asc:!0},m.dbFilters=[],m.dbColumnWidths={},m.currentRow=null,m.dbSelected.clear(),m.ai.messages=[],m.ai.loading=!1,m.sync.pageId=null,m.sync.loadedModified=null,m.sync.loadedEtag=null,m.sync.pollTimer&&(clearInterval(m.sync.pollTimer),m.sync.pollTimer=null),m.expanded.clear(),m.dirty=!1,m.saving=!1}var m,j=L(()=>{"use strict";m={get pages(){return this.meta.pages.filter(e=>!e.trashed).map(e=>({Id:e.id,Title:e.title,ParentId:e.parent||"",Type:e.type||"page",IsDraft:!!e.originPageId}))},meta:{pages:[]},tabs:[],activeTabId:null,currentId:null,currentType:"page",dbFields:[],dbItems:[],dbList:"",dbSort:{field:null,asc:!0},dbFilters:[],dbView:"table",dbColumnWidths:{},currentRow:null,dbSelected:new Set,ai:{panelOpen:!1,messages:[],loading:!1},sync:{pageId:null,loadedModified:null,loadedEtag:null,pollTimer:null},expanded:new Set,dirty:!1,saving:!1}});function I(e){let t=document.getElementById("memola-"+e);if(!t)throw new Error("Memola: missing element memola-"+e);return t}function wb(){let e=document.getElementById("memola-overlay");if(!e)throw new Error("Memola: overlay not mounted");return e}function Ce(){return I("ed")}var me=L(()=>{"use strict"});function Tc(e){if(!e)return null;let t=String(e).trim();if(!t)return null;let o="",n="",r="",a=t.match(/^(\d{4})(\d{2})(\d{2})$/);if(a)o=a[1],n=a[2],r=a[3];else{let s=t.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);if(!s)return null;o=s[1],n=s[2].padStart(2,"0"),r=s[3].padStart(2,"0")}let i=new Date(`${o}-${n}-${r}T00:00:00Z`);return isNaN(i.getTime())||i.getUTCFullYear()!==Number(o)||i.getUTCMonth()+1!==Number(n)||i.getUTCDate()!==Number(r)?null:`${o}-${n}-${r}`}function Eo(e){if(!e)return"";if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;let t=new Date(e);if(isNaN(t.getTime()))return"";let o=new Date(t.getTime()+9*60*60*1e3),n=o.getUTCFullYear(),r=String(o.getUTCMonth()+1).padStart(2,"0"),a=String(o.getUTCDate()).padStart(2,"0");return`${n}-${r}-${a}`}function Ib(){let e=new Date,t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${o}-${n}`}function Eb(){let e=new Date,t=new Date(e.getTime()+9*3600*1e3),o=t.getUTCFullYear(),n=String(t.getUTCMonth()+1).padStart(2,"0"),r=String(t.getUTCDate()).padStart(2,"0"),a=String(t.getUTCHours()).padStart(2,"0"),i=String(t.getUTCMinutes()).padStart(2,"0"),s=kb[t.getUTCDay()];return`\u73FE\u5728\u306E\u65E5\u6642 (JST): ${o}-${n}-${r} ${a}:${i} (${s}\u66DC\u65E5)`}function Sn(e){let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return"";let o=new Date,n=t.toDateString()===o.toDateString(),r=new Date(o);r.setDate(o.getDate()-1);let a=t.toDateString()===r.toDateString(),i=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return n?`${i}:${s}`:a?`\u6628\u65E5 ${i}:${s}`:t.getFullYear()===o.getFullYear()?`${t.getMonth()+1}/${t.getDate()} ${i}:${s}`:`${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()}`}function Lc(e){let t=e.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!t)return e;let o=new Date(Date.UTC(Number(t[1]),Number(t[2])-1,Number(t[3]))),n=kb[o.getUTCDay()];return`${e} (${n})`}function Sc(e){return/^\d{4}-\d{2}-\d{2}(\s*\([^)]+\))?\s*$/.test(e)}var kb,To=L(()=>{"use strict";kb=["\u65E5","\u6708","\u706B","\u6C34","\u6728","\u91D1","\u571F"]});function k(e,t,o){let n=I("tk");n.textContent=e,n.className="on"+(t==="err"?" er":""),clearTimeout(Tb),Tb=setTimeout(()=>{n.className=""},o||3500)}function _(e,t){I("lm").textContent=" "+(t||"\u8AAD\u307F\u8FBC\u307F\u4E2D..."),I("ld").classList.toggle("off",!e)}function Lb(e){return"\u4FDD\u5B58\u6E08 "+Sn(e)}function Qe(e){let t=I("ss");e==="saved"||e==="\u4FDD\u5B58\u6E08"||e==="\u4FDD\u5B58\u6E08\u307F"||e===""?(t.textContent=Lb(new Date),t.dataset.state="saved"):e==="saving"||e==="\u4FDD\u5B58\u4E2D..."?(t.textContent="\u4FDD\u5B58\u4E2D\u2026",t.dataset.state="saving"):(t.textContent=e,t.dataset.state=e==="\u672A\u4FDD\u5B58"?"dirty":"")}function Jo(e){let t=I("ss");if(!e){t.textContent="",t.dataset.state="";return}let o=typeof e=="string"?new Date(e):e;if(Number.isNaN(o.getTime())){t.textContent="",t.dataset.state="";return}t.textContent=Lb(o),t.dataset.state="saved"}function Mn(e){e.style.height="auto",e.style.height=e.scrollHeight+"px"}var Tb,le=L(()=>{"use strict";me();To();if(typeof window<"u"){let e=()=>{let t=document.getElementById("memola-ss");t&&(navigator.onLine||(t.textContent="\u30AA\u30D5\u30E9\u30A4\u30F3",t.dataset.state="offline"))};window.addEventListener("offline",e),window.addEventListener("online",()=>{let t=document.getElementById("memola-ss");t&&t.dataset.state==="offline"&&(t.textContent="",t.dataset.state="")})}});function Sb(){ds=null,Bp=0}async function xe(){if(ds&&Date.now()<Bp)return ds;let e=await fetch(G+"/_api/contextinfo",{method:"POST",headers:{Accept:"application/json;odata=verbose"},credentials:"include"});if(!e.ok)throw new Error("\u8A8D\u8A3C\u5931\u6557("+e.status+")\u3002SharePoint\u306B\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044\u3002");return ds=(await e.json()).d.GetContextWebInformation.FormDigestValue,Bp=Date.now()+25*60*1e3,ds}var ds,Bp,br=L(()=>{"use strict";He();ds=null,Bp=0});function J(e,t=""){return G+"/_api/web/lists/getbytitle('"+e+"')"+t}async function ne(e){let t=await fetch(e,{headers:{Accept:Dp},credentials:"include"});return t.ok?(await t.json()).d:null}var Dp,co,Tt=L(()=>{"use strict";He();Dp="application/json;odata=verbose",co={Accept:Dp,"Content-Type":Dp}});var mo={};q(mo,{addListField:()=>Ht,applyOwnerOnlyAcl:()=>ps,clearListCaches:()=>Rp,createList:()=>Ca,createListItem:()=>Ne,deleteList:()=>Aa,deleteListField:()=>Op,deleteListItem:()=>Ke,ensureList:()=>Ot,getListEntityType:()=>Np,getListFields:()=>ze,getListItemById:()=>us,getListItems:()=>Ee,resolveRoleDefId:()=>Cb,restoreSoftDelete:()=>Cc,setColumnIndexed:()=>vr,setListVersionLimit:()=>Ac,softDelete:()=>Pc,updateListFieldChoices:()=>xT,updateListItem:()=>je,updateListItemIfMatch:()=>yr});function ms(e){try{let n=JSON.parse(e)?.error?.message?.value;if(n)return n}catch{}let t=e.match(/"value"\s*:\s*"((?:\\.|[^"\\])*)"/);if(!t)return"";try{return JSON.parse('"'+t[1]+'"')}catch{return t[1]}}function Rp(){for(let e of Object.keys(Zo))delete Zo[e]}async function Ca(e){let t=await xe(),o=await fetch(G+"/_api/web/lists",{method:"POST",headers:{...co,"X-RequestDigest":t},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.List"},BaseTemplate:100,Title:e,Description:"Memola"})});if(!o.ok)throw new Error("\u30EA\u30B9\u30C8\u4F5C\u6210\u5931\u6557: "+o.status)}async function Aa(e){let t=await xe();await fetch(J(e),{method:"POST",headers:{"X-RequestDigest":t,"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include"})}async function Cb(e){if(Mc[e])return Mc[e];let t=vT[e];if(t){let n=G+"/_api/web/roledefinitions?$select=Id,Name,RoleTypeKind&$filter="+encodeURIComponent("RoleTypeKind eq "+t.kind);try{let a=(await ne(n))?.results?.[0]?.Id;if(a)return Mc[e]=a,a}catch{}}let o=t?.names??[e];for(let n of o){let r=G+"/_api/web/roledefinitions?$select=Id,Name&$filter="+encodeURIComponent("Name eq '"+n.replace(/'/g,"''")+"'");try{let i=(await ne(r))?.results?.[0]?.Id;if(i)return Mc[e]=i,i}catch{}}throw new Error("\u30ED\u30FC\u30EB\u5B9A\u7FA9\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093: "+e+" (\u8A66\u3057\u305F\u5019\u88DC: RoleTypeKind="+(t?.kind??"\u306A\u3057")+", Name="+o.join(" / ")+")")}async function ps(e,t){if(!t)throw new Error("principalId \u304C\u89E3\u6C7A\u3067\u304D\u307E\u305B\u3093 \u2014 ACL \u8A2D\u5B9A\u4E2D\u6B62");let o=await Cb("Full Control");if(await yT(e,t,o).catch(()=>!1))return;let r=await xe(),a=J(e,"/breakroleinheritance(copyRoleAssignments=false,clearSubscopes=true)"),i=await fetch(a,{method:"POST",headers:{...co,"X-RequestDigest":r},credentials:"include"});if(!i.ok&&i.status!==400)throw new Error("\u6A29\u9650\u7D99\u627F\u306E\u5207\u65AD\u306B\u5931\u6557: "+i.status);let s=J(e,"/roleassignments/addroleassignment(principalid="+t+",roledefid="+o+")"),l=await fetch(s,{method:"POST",headers:{...co,"X-RequestDigest":r},credentials:"include"});if(!l.ok)throw new Error("\u6A29\u9650\u4ED8\u4E0E\u306B\u5931\u6557: "+l.status)}async function yT(e,t,o){if(!(await ne(J(e,"?$select=HasUniqueRoleAssignments")))?.HasUniqueRoleAssignments)return!1;let a=(await ne(J(e,"/roleassignments?$expand=RoleDefinitionBindings&$select=PrincipalId,RoleDefinitionBindings/Id")))?.results??[];if(a.length===0)return!1;let i=!1;for(let s of a){let l=s.RoleDefinitionBindings?.results?.map(c=>c.Id)??[];if(s.PrincipalId===t)if(l.includes(o))i=!0;else return!1;else return!1}return i}async function Pc(e,t,o,n=Date.now()){await je(e,t,{Trashed:n,TrashedBy:o})}async function Cc(e,t){await je(e,t,{Trashed:0,TrashedBy:0})}async function Ot(e){let t=await ne(J(e.title))!=null;t||await Ca(e.title);for(let o of e.fields){try{await Ht(e.title,o.name,o.kind,o.choices)}catch{}o.indexed&&await vr(e.title,o.name).catch(()=>{})}return await Ac(e.title,Ec).catch(()=>{}),!t}async function Np(e){if(Zo[e])return Zo[e];let t=await ne(J(e,"?$select=ListItemEntityTypeFullName"));if(!t)throw new Error("\u30A8\u30F3\u30C6\u30A3\u30C6\u30A3\u30BF\u30A4\u30D7\u53D6\u5F97\u5931\u6557");return Zo[e]=t.ListItemEntityTypeFullName,Zo[e]}async function ze(e){let t=await ne(J(e,"/fields?$filter=Hidden eq false and ReadOnlyField eq false&$select=Title,InternalName,FieldTypeKind,Choices"));if(!t)throw new Error("\u30B9\u30AD\u30FC\u30DE\u53D6\u5F97\u5931\u6557");return t.results.filter(o=>[2,3,4,6,8,9].indexOf(o.FieldTypeKind)>=0).map(o=>{let n={Title:o.Title,InternalName:o.InternalName,FieldTypeKind:o.FieldTypeKind};return o.FieldTypeKind===6&&o.Choices&&o.Choices.results&&(n.Choices=o.Choices.results),n})}function Ab(e){let t=e;for(let o of Object.keys(e))if(o.startsWith("OData_")){let n=o.substring(6);n in t||(t[n]=e[o])}return t}async function Ee(e,t){let o=[],n=t?"&$select="+encodeURIComponent(t):"",r=J(e,"/items?$orderby=Id&$top=500"+n);for(let a=0;r&&a<200;a++){let i=await fetch(r,{headers:{Accept:"application/json;odata=verbose"},credentials:"include"});if(!i.ok)throw new Error("\u30C7\u30FC\u30BF\u53D6\u5F97\u5931\u6557");let s=await i.json(),l=s.d?.results||[];for(let c of l)o.push(Ab(c));r=s.d?.__next}return o}async function us(e,t){let o=await ne(J(e,"/items("+t+")"));return o?Ab(o):null}async function Ne(e,t){let o=await Np(e),n=await xe(),r={__metadata:{type:o}};for(let s of Object.keys(t)){if(s==="__metadata")continue;let l=s.startsWith("_")?"OData_"+s:s;r[l]=t[s]}let a=await fetch(J(e,"/items"),{method:"POST",headers:{...co,"X-RequestDigest":n},credentials:"include",body:JSON.stringify(r)});if(!a.ok){let s=await a.text().catch(()=>""),l=ms(s);throw!l&&s&&s.length<300&&(l=s),(a.status===403||a.status===401)&&delete Zo[e],new Error("\u884C\u8FFD\u52A0\u5931\u6557: "+a.status+(l?" \u2014 "+l:""))}return(await a.json()).d}async function Ke(e,t){let o=await xe(),n=await fetch(J(e,"/items("+t+")"),{method:"POST",headers:{"X-RequestDigest":o,"X-HTTP-Method":"DELETE","If-Match":"*"},credentials:"include"});if(n.status!==404&&!n.ok)throw new Error("\u524A\u9664\u5931\u6557: "+n.status)}async function Ht(e,t,o,n){let r={2:"SP.FieldText",3:"SP.FieldMultiLineText",4:"SP.FieldDateTime",8:"SP.FieldBoolean",9:"SP.FieldNumber",6:"SP.FieldChoice"},a=await xe(),i=typeof o=="string"?parseInt(o,10):o,s;i===6?s={__metadata:{type:"SP.FieldChoice"},FieldTypeKind:6,Title:t,Choices:{__metadata:{type:"Collection(Edm.String)"},results:n||[]}}:i===3?s={__metadata:{type:"SP.FieldMultiLineText"},FieldTypeKind:3,Title:t,NumberOfLines:6,RichText:!1,AppendOnly:!1}:i===4?s={__metadata:{type:"SP.FieldDateTime"},FieldTypeKind:4,Title:t,DisplayFormat:0,FriendlyDisplayFormat:0,DateTimeCalendarType:1}:s={__metadata:{type:r[i]||"SP.FieldText"},FieldTypeKind:i,Title:t},delete Zo[e];let l=await fetch(J(e,"/fields"),{method:"POST",headers:{...co,"X-RequestDigest":a},credentials:"include",body:JSON.stringify(s)});if(!l.ok){let d=await l.text().catch(()=>""),p=ms(d);throw!p&&d&&d.length<200&&(p=d),new Error("\u5217\u8FFD\u52A0\u5931\u6557: "+l.status+(p?" \u2014 "+p:""))}return(await l.json()).d}async function xT(e,t,o){let n=await xe();delete Zo[e];let r=J(e,"/fields/getbyinternalnameortitle('"+t+"')"),a=await fetch(r,{method:"POST",headers:{...co,"X-RequestDigest":n,"X-HTTP-Method":"MERGE","If-Match":"*"},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.FieldChoice"},Choices:{__metadata:{type:"Collection(Edm.String)"},results:o}})});if(!a.ok){let i=await a.text().catch(()=>"");throw new Error("\u9078\u629E\u80A2\u306E\u66F4\u65B0\u5931\u6557: "+a.status+(i?" \u2014 "+ms(i):""))}}async function Op(e,t){let o=await xe(),n=J(e,"/fields/getbyinternalnameortitle('"+t+"')"),r=await fetch(n,{method:"POST",headers:{"X-RequestDigest":o,"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include"});if(!r.ok&&r.status!==404)throw new Error("\u5217\u524A\u9664\u5931\u6557: "+r.status)}async function vr(e,t){let o=await xe(),n=J(e,"/fields/getbyinternalnameortitle('"+t+"')");await fetch(n,{method:"POST",headers:{...co,"X-RequestDigest":o,"X-HTTP-Method":"MERGE","IF-MATCH":"*"},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Field"},Indexed:!0})}).catch(()=>{})}async function Ac(e,t){if(!(t>=1))return;let o=await xe();await fetch(J(e),{method:"POST",headers:{...co,"X-RequestDigest":o,"X-HTTP-Method":"MERGE","IF-MATCH":"*"},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.List"},EnableVersioning:!0,MajorVersionLimit:t})}).catch(()=>{})}function Mb(e){return/存在しません|does not exist/i.test(e)}async function Pb(e,t){let o=await ze(e).catch(()=>[]);if(o.length===0)return t;let n=new Map(o.map(i=>[i.InternalName,i])),r=new Map(o.map(i=>[i.Title,i])),a={};for(let i of Object.keys(t)){if(i==="__metadata"){a[i]=t[i];continue}let s=n.get(i)||r.get(i);a[s?s.InternalName:i]=t[i]}return a}async function je(e,t,o){await _p(e,t,o,!0)}async function yr(e,t,o,n){let r=await Np(e),a=await xe(),i={__metadata:{type:r}};for(let d of Object.keys(o)){if(d==="__metadata")continue;let p=d.startsWith("_")?"OData_"+d:d;i[p]=o[d]}let s=await fetch(J(e,"/items("+t+")"),{method:"POST",headers:{...co,"X-RequestDigest":a,"X-HTTP-Method":"MERGE","IF-MATCH":n},credentials:"include",body:JSON.stringify(i)});if(s.ok)return{ok:!0};if(s.status===412)return{ok:!1,reason:"conflict"};let l=await s.text().catch(()=>""),c=ms(l);throw new Error("\u66F4\u65B0\u5931\u6557(If-Match): "+s.status+(c?" \u2014 "+c:""))}async function _p(e,t,o,n){let r=await xe(),a=Object.entries(o).filter(([d])=>d!=="__metadata").map(([d,p])=>({FieldName:d,FieldValue:p==null?"":String(p)})),i=await fetch(J(e,"/items("+t+")/validateUpdateListItem"),{method:"POST",headers:{...co,"X-RequestDigest":r},credentials:"include",body:JSON.stringify({formValues:a,bNewDocumentUpdate:!1})});if(!i.ok){let d=await i.text().catch(()=>""),p=ms(d);if(n&&Mb(p)){let u=await Pb(e,o);if(Object.keys(u).some(g=>!(g in o))){await _p(e,t,u,!1);return}}throw new Error("\u66F4\u65B0\u5931\u6557: "+i.status+(p?" \u2014 "+p:""))}let l=(await i.json()).d.ValidateUpdateListItem.results.filter(d=>d.ErrorMessage);if(l.length===0)return;let c=l.some(d=>Mb(d.ErrorMessage||""));if(n&&c){let d=await Pb(e,o);if(Object.keys(d).some(u=>!(u in o))){await _p(e,t,d,!1);return}}throw new Error("\u66F4\u65B0\u5931\u6557: "+l.map(d=>d.FieldName+": "+d.ErrorMessage).join(", "))}var Zo,Mc,vT,De=L(()=>{"use strict";He();br();Tt();Zo={};Mc={},vT={"Full Control":{kind:5,names:["Full Control","\u30D5\u30EB \u30B3\u30F3\u30C8\u30ED\u30FC\u30EB","\u30D5\u30EB\u30B3\u30F3\u30C8\u30ED\u30FC\u30EB"]},Edit:{kind:4,names:["Edit","\u7DE8\u96C6"]},Contribute:{kind:3,names:["Contribute","\u6295\u7A3F","\u30B3\u30F3\u30C8\u30EA\u30D3\u30E5\u30FC\u30C8"]},Read:{kind:2,names:["Read","\u8AAD\u307F\u53D6\u308A","\u8AAD\u53D6\u308A"]}}});function Q(){return Bb+=1,"blk_"+wT+"-"+Bb.toString(36)}function Db(e){return e===""?[]:[{kind:"text",text:e}]}function Lt(e){let t="";for(let o of e)o.kind==="text"||o.kind==="code"?t+=o.text:o.kind==="br"?t+=`
`:o.kind==="pagelink"?t+=o.alias||o.pageId:o.kind==="dailylink"?t+=o.alias||o.date:(o.kind==="bold"||o.kind==="italic"||o.kind==="strike"||o.kind==="link")&&(t+=Lt(o.children));return t}var Bb,wT,Qo=L(()=>{"use strict";Bb=0,wT=Math.random().toString(36).slice(2,8)+Math.random().toString(36).slice(2,6)});var Hp={};q(Hp,{blocksToMd:()=>Xe,mdToBlocks:()=>Ye,parseInline:()=>fs});function Ye(e){let t=e.replace(/\r\n?/g,`
`).split(`
`),o=[],n=0;for(;n<t.length;){let r=t[n];if(/^\s*$/.test(r)){n++;continue}let a=LT(r);if(a){o.push(a),n++;continue}if(/^\s*---+\s*$/.test(r)||/^\s*\*\*\*+\s*$/.test(r)){let b={id:Q(),kind:"rule"};o.push(b),n++;continue}let i=r.match(/^```(\S*)\s*$/);if(i){let b=i[1]||"",h=[];for(n++;n<t.length&&!/^```\s*$/.test(t[n]);)h.push(t[n]),n++;n<t.length&&n++;let v={id:Q(),kind:"code",lang:b,text:h.join(`
`)};o.push(v);continue}let s=r.match(/^(#{1,3})\s+(.*)$/);if(s){let b=s[1].length,h=fs(s[2]),v="h"+b,x={id:Q(),kind:v,inline:h};o.push(x),n++;continue}let l=r.match(/^\s*-\s+\[([ xX])\]\s*(.*)$/);if(l){let b=l[1].toLowerCase()==="x",h={id:Q(),kind:"todo",checked:b,inline:fs(l[2])};o.push(h),n++;continue}let c=r.match(/^>\s*\[([^\sA-Za-z0-9][^\]]*)\]\s*(.*)$/);if(c){let b=c[1],h=[c[2]];for(n++;n<t.length&&/^>\s?/.test(t[n]);)h.push(t[n].replace(/^>\s?/,"")),n++;let v=Ye(h.join(`
`)),x={id:Q(),kind:"callout",emoji:b,children:v};o.push(x);continue}if(/^>\s?/.test(r)){let b=[];for(;n<t.length&&/^>\s?/.test(t[n]);)b.push(t[n].replace(/^>\s?/,"")),n++;let h=Ye(b.join(`
`)),v={id:Q(),kind:"quote",children:h};o.push(v);continue}let d=r.match(/^(\s*)([-*+])\s+(.*)$/),p=r.match(/^(\s*)(\d+)\.\s+(.*)$/);if(d||p){let b=!!p,h=[],v=(d??p)[1].length;for(;n<t.length;){let w=b?t[n].match(/^(\s*)(\d+)\.\s+(.*)$/):t[n].match(/^(\s*)([-*+])\s+(.*)$/);if(!w||w[1].length!==v||!b&&/^\s*\[[ xX]\]/.test(w[3]))break;let T=[w[3]];for(n++;n<t.length;){let E=t[n];if(/^\s*$/.test(E)){let B=t[n+1];if(B!=null&&/^\s+/.test(B)&&B.search(/\S/)>v){T.push(""),n++;continue}break}if(E.search(/\S/)<=v)break;T.push(E.replace(new RegExp("^\\s{"+(v+2)+"}"),"")),n++}h.push(Ye(T.join(`
`)))}let x={id:Q(),kind:"list",ordered:b,items:h};o.push(x);continue}let u=r.match(/^\s*!\[([^\]]*)\]\(([^)]+)\)\s*$/);if(u){o.push({id:Q(),kind:"image",src:u[2],alt:u[1]}),n++;continue}let f=[r];for(n++;n<t.length&&!/^\s*$/.test(t[n])&&!kT(t[n]);)f.push(t[n]),n++;let g=f.join(`
`),y={id:Q(),kind:"p",inline:fs(g)};o.push(y)}return o}function kT(e){return!!(/^#{1,3}\s+/.test(e)||/^```/.test(e)||/^\s*---+\s*$/.test(e)||/^\s*\*\*\*+\s*$/.test(e)||/^\s*-\s+\[[ xX]\]/.test(e)||/^>\s?/.test(e)||/^(\s*)[-*+]\s+/.test(e)||/^(\s*)\d+\.\s+/.test(e))}function fs(e){return e?(e=e.replace(/  +\n/g,`<br>
`).replace(/<br\s*\/?>/gi,"<br>"),Bc(e,0,e.length)):[]}function Bc(e,t,o){let n=[],r="",a=t,i=()=>{r&&(n.push({kind:"text",text:r}),r="")};for(;a<o;){let s=e[a];if(e.startsWith("<br>",a)){i(),n.push({kind:"br"}),a+=4,e[a]===`
`&&a++;continue}if(s==="["&&e[a+1]==="["){let l=e.indexOf("]]",a+2);if(l>=0&&l<o){let c=e.substring(a+2,l),d=c.indexOf("|"),p=d<0?c:c.substring(0,d),u=d<0?void 0:c.substring(d+1);i();let f=p.match(/^daily:(\d{4}-\d{2}-\d{2})$/);f?n.push({kind:"dailylink",date:f[1],...u!==void 0?{alias:u}:{}}):n.push({kind:"pagelink",pageId:p,...u!==void 0?{alias:u}:{}}),a=l+2;continue}}if(s==="["){let l=_b(e,"]",a+1,o);if(l>=0&&e[l+1]==="("){let c=_b(e,")",l+2,o);if(c>=0){let d=e.substring(a+1,l),p=e.substring(l+2,c);i(),n.push({kind:"link",href:p,children:fs(d)}),a=c+1;continue}}}if(s==="`"){let l=e.indexOf("`",a+1);if(l>=0&&l<o){i(),n.push({kind:"code",text:e.substring(a+1,l)}),a=l+1;continue}}if(e.startsWith("~~",a)){let l=e.indexOf("~~",a+2);if(l>=0&&l<o){i(),n.push({kind:"strike",children:Bc(e,a+2,l)}),a=l+2;continue}}if(e.startsWith("**",a)||e.startsWith("__",a)){let l=e.substr(a,2),c=e.indexOf(l,a+2);if(c>=0&&c<o){i(),n.push({kind:"bold",children:Bc(e,a+2,c)}),a=c+2;continue}}if((s==="*"||s==="_")&&e[a+1]!==s){let l=e.indexOf(s,a+1);if(l>=0&&l<o&&e[l-1]!==s){i(),n.push({kind:"italic",children:Bc(e,a+1,l)}),a=l+1;continue}}if(s==="\\"&&a+1<o&&/[!-/:-@[-`{-~]/.test(e[a+1])){r+=e[a+1],a+=2;continue}r+=s,a++}return i(),n}function IT(e){return e.replace(/([\\`*_~[\]])/g,"\\$1")}function _b(e,t,o,n){for(let r=o;r<n;r++){if(e[r]==="\\"){r++;continue}if(e[r]===t)return r}return-1}function Xe(e){let t="";for(let o=0;o<e.length;o++){let n=e[o],r=ET(n).replace(/\n+$/,"");if(t){let i=e[o-1].kind==="todo"&&n.kind==="todo";t+=i?`
`:`

`}t+=r}return t?t+`
`:""}function ET(e){switch(e.kind){case"p":return en(e.inline)+`
`;case"h1":return"# "+en(e.inline)+`
`;case"h2":return"## "+en(e.inline)+`
`;case"h3":return"### "+en(e.inline)+`
`;case"todo":return"- ["+(e.checked?"x":" ")+"] "+en(e.inline)+`
`;case"rule":return`---
`;case"code":return"```"+e.lang+`
`+e.text+"\n```\n";case"quote":return Xe(e.children).replace(/\n+$/,"").split(`
`).map(o=>o===""?">":"> "+o).join(`
`)+`
`;case"callout":{let o=Xe(e.children).trim().split(`
`),n="> ["+e.emoji+"] "+(o[0]||"")+`
`;for(let r=1;r<o.length;r++)n+="> "+o[r]+`
`;return n}case"list":{let t="";return e.items.forEach((o,n)=>{let r=e.ordered?n+1+".":"-",i=Xe(o).trim().split(`
`);t+=r+" "+i[0]+`
`;for(let s=1;s<i.length;s++)t+="  "+i[s]+`
`}),t}case"image":return"!["+e.alt+"]("+e.src+`)
`;case"table":case"linkdb":case"ai":case"email":return TT(e)+`
`}}function TT(e){let t=JSON.stringify(e),o;try{o=btoa(unescape(encodeURIComponent(t)))}catch{o=""}return"<!-- memola-block:"+o+" -->"}function LT(e){let t=e.match(/^\s*<!--\s*memola-block:([A-Za-z0-9+/=]*)\s*-->\s*$/);if(!t)return null;try{let o=decodeURIComponent(escape(atob(t[1]))),n=JSON.parse(o);return!n||typeof n!="object"||!("kind"in n)||!("id"in n)||n.kind!=="table"&&n.kind!=="linkdb"&&n.kind!=="ai"&&n.kind!=="email"?null:n}catch{return null}}function en(e){let t="";for(let o of e)t+=ST(o);return t}function ST(e){switch(e.kind){case"text":return IT(e.text);case"bold":return"**"+en(e.children)+"**";case"italic":return"*"+en(e.children)+"*";case"strike":return"~~"+en(e.children)+"~~";case"code":return"`"+e.text+"`";case"link":return"["+en(e.children)+"]("+e.href+")";case"pagelink":return"[["+e.pageId+(e.alias!=null?"|"+e.alias:"")+"]]";case"dailylink":return"[[daily:"+e.date+(e.alias!=null?"|"+e.alias:"")+"]]";case"br":return`  
`}}var St=L(()=>{"use strict";Qo()});function Rb(e){let t=document.createElement("div");return t.innerHTML=e,Ba(t)}function Ba(e){let t=[];for(let o of Array.from(e.childNodes)){if(o.nodeType===3){let i=(o.textContent||"").trim();if(i){let s={id:Q(),kind:"p",inline:[{kind:"text",text:i}]};t.push(s)}continue}if(o.nodeType!==1)continue;let n=o,r=n.tagName.toLowerCase();if((r==="div"||r==="section")&&!MT(n)){t.push(...Ba(n));continue}let a=PT(n);a&&t.push(a)}return t}function MT(e){let t=e.classList;return t.contains("memola-todo")||t.contains("memola-callout")||t.contains("memola-itbl-wrap")||t.contains("memola-linkdb")||t.contains("memola-ai-block")}function PT(e){let t=e.tagName.toLowerCase();if(t==="img"){let r=e.getAttribute("src")||"",a=e.getAttribute("alt")||"";return{id:Q(),kind:"image",src:r,alt:a}}if(t==="div"&&e.classList.contains("memola-itbl-wrap")){let r=e.querySelector("table.memola-itbl");if(!r)return null;let a=r.dataset.hrow==="1",i=r.dataset.hcol==="1",s=[],l=[];for(let c of Array.from(r.querySelectorAll("tr"))){let d=[];for(let p of Array.from(c.children))d.push(po(p));l.push(d)}return{id:Q(),kind:"table",hrow:a,hcol:i,rows:l}}if(t==="div"&&e.classList.contains("memola-linkdb")){let r=e.getAttribute("data-db-id")||"",a=e.getAttribute("data-view")||"table",i=e.getAttribute("data-filter")||"",s=e.getAttribute("data-sort")||"";return{id:Q(),kind:"linkdb",dbId:r,view:a,filter:i,sort:s}}if(t==="div"&&e.classList.contains("memola-ai-block")){let r=e.getAttribute("data-aib-action")||"",a=e.getAttribute("data-aib-result")||"";return{id:Q(),kind:"ai",prompt:r,result:a}}if(t==="div"&&e.classList.contains("memola-todo")){let r=e.querySelector(".memola-todo-cb"),a=e.querySelector(".memola-todo-txt");return{id:Q(),kind:"todo",checked:!!(r&&r.checked),inline:a?po(a):[]}}if(t==="div"&&e.classList.contains("memola-callout")){let r=e.querySelector(".memola-callout-ic"),a=e.querySelector(".memola-callout-body");return{id:Q(),kind:"callout",emoji:(r?.textContent||"\u{1F4A1}").trim(),children:a?Ba(a):[]}}if(t==="h1"||t==="h2"||t==="h3")return{id:Q(),kind:t,inline:po(e)};if(t==="p"){let r=po(e);return{id:Q(),kind:"p",inline:r}}if(t==="pre"){let r=e.querySelector("code"),a=r?.className.replace(/^language-/,"")||"",i=r?.textContent??e.textContent??"";return{id:Q(),kind:"code",lang:a,text:i}}if(t==="hr")return{id:Q(),kind:"rule"};if(t==="blockquote")return{id:Q(),kind:"quote",children:Ba(e)};if(t==="ul"||t==="ol"){let r=[];for(let i of Array.from(e.children)){if(i.tagName.toLowerCase()!=="li")continue;if(Array.from(i.children).some(l=>/^(p|h\d|ul|ol|pre|blockquote|hr|div)$/i.test(l.tagName)))r.push(Ba(i));else{let l=po(i);r.push([{id:Q(),kind:"p",inline:l}])}}return{id:Q(),kind:"list",ordered:t==="ol",items:r}}if(t==="div"||t==="section")return Ba(e)[0]||null;let o=po(e);return o.length===0?null:{id:Q(),kind:"p",inline:o}}function po(e){let t=[];for(let o of Array.from(e.childNodes)){if(o.nodeType===3){let a=o.textContent||"";a&&t.push({kind:"text",text:a});continue}if(o.nodeType!==1)continue;let n=o,r=n.tagName.toLowerCase();if(r==="br"){t.push({kind:"br"});continue}if(r==="strong"||r==="b"){t.push({kind:"bold",children:po(n)});continue}if(r==="em"||r==="i"){t.push({kind:"italic",children:po(n)});continue}if(r==="s"||r==="strike"||r==="del"){t.push({kind:"strike",children:po(n)});continue}if(r==="code"){t.push({kind:"code",text:n.textContent||""});continue}if(r==="a"){let a=n.getAttribute("data-daily-date");if(a){let s=(n.textContent||"").trim()||void 0;t.push({kind:"dailylink",date:a,...s?{alias:s}:{}});continue}if(n.classList.contains("memola-page-link")){let s=n.getAttribute("data-page-id")||"",l=(n.textContent||"").trim()||void 0;t.push({kind:"pagelink",pageId:s,...l?{alias:l}:{}});continue}let i=n.getAttribute("href")||"";t.push({kind:"link",href:i,children:po(n)});continue}t.push(...po(n))}return t}function tn(e){return e.map(CT).join("")}function So(e){return tn(Ye(e))}function CT(e){switch(e.kind){case"p":return"<p>"+Lo(e.inline)+"</p>";case"h1":return"<h1>"+Lo(e.inline)+"</h1>";case"h2":return"<h2>"+Lo(e.inline)+"</h2>";case"h3":return"<h3>"+Lo(e.inline)+"</h3>";case"todo":return'<div class="memola-todo"><input type="checkbox" class="memola-todo-cb"'+(e.checked?" checked":"")+'><span class="memola-todo-txt">'+Lo(e.inline)+"</span></div>";case"rule":return"<hr>";case"code":return"<pre><code"+(e.lang?' class="language-'+e.lang+'"':"")+">"+xr(e.text)+"</code></pre>";case"quote":return"<blockquote>"+tn(e.children)+"</blockquote>";case"callout":return'<div class="memola-callout"><span class="memola-callout-ic">'+xr(e.emoji)+'</span><div class="memola-callout-body">'+tn(e.children)+"</div></div>";case"list":{let t=e.ordered?"ol":"ul",o=e.items.map(n=>n.length===1&&n[0].kind==="p"?"<li>"+Lo(n[0].inline)+"</li>":"<li>"+tn(n)+"</li>").join("");return"<"+t+">"+o+"</"+t+">"}case"image":return'<img src="'+Pn(e.src)+'" alt="'+Pn(e.alt)+'" class="memola-img">';case"email":return'<div class="memola-email-chip" data-imid="'+Pn(e.imid)+'">\u{1F4E7} '+Pn(e.subject||"(\u4EF6\u540D\u306A\u3057)")+(e.from?' \u2014 <span class="memola-email-from">'+Pn(e.from)+"</span>":"")+"</div>";case"table":case"linkdb":case"ai":return"<!-- block-tree:"+e.kind+" id="+e.id+" -->"}}function Lo(e){let t="";for(let o of e)t+=AT(o);return t}function AT(e){switch(e.kind){case"text":return xr(e.text);case"bold":return"<strong>"+Lo(e.children)+"</strong>";case"italic":return"<em>"+Lo(e.children)+"</em>";case"strike":return"<s>"+Lo(e.children)+"</s>";case"code":return"<code>"+xr(e.text)+"</code>";case"link":return'<a href="'+Pn(e.href)+'">'+Lo(e.children)+"</a>";case"pagelink":{let t=e.alias||e.pageId;return'<a class="memola-page-link" data-page-id="'+Pn(e.pageId)+'">'+xr(t)+"</a>"}case"dailylink":{let t=e.alias||e.date;return'<a class="memola-page-link memola-daily-link" data-daily-date="'+Pn(e.date)+'">'+xr(t)+"</a>"}case"br":return"<br>"}}function xr(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Pn(e){return xr(e).replace(/"/g,"&quot;")}var on=L(()=>{"use strict";Qo();St()});var Ob={};q(Ob,{applySiblingOrder:()=>hs,collectDescendantIds:()=>nn,computeReorder:()=>Fp,countDescendants:()=>gs,saveSiblingOrder:()=>Da});function nn(e,t){let o=[t];return e.filter(n=>n.ParentId===t).forEach(n=>{o.push(...nn(e,n.Id))}),o}function gs(e,t){return nn(e,t).length-1}function Nb(){return yc.get()}function BT(e){yc.set(e)}function hs(e,t){let n=Nb()[e||""];if(!n||n.length===0)return t;let r=new Map(t.map(i=>[i.Id,i])),a=[];for(let i of n){let s=r.get(i);s&&(a.push(s),r.delete(i))}for(let i of r.values())a.push(i);return a}function Da(e,t){let o=Nb();o[e||""]=t,BT(o)}function Fp(e,t,o,n){let r=e.map(s=>s.Id),a=r.indexOf(t);a>=0&&r.splice(a,1);let i=r.indexOf(o);return i<0&&(i=r.length),n||(i+=1),r.splice(i,0,t),r}var wr=L(()=>{"use strict";ve()});async function _a(e){let t=Mt(e);return t&&(await ne(J(nt(e),"/items("+t+")?$select=Editor/Title&$expand=Editor")))?.Editor?.Title||""}function Cn(){return Dc||(Dc=(async()=>(await ne(G+"/_api/web/currentuser?$select=Title"))?.Title||"")().catch(()=>""),Dc)}function pt(){return _c||(_c=(async()=>(await ne(G+"/_api/web/currentuser?$select=Id"))?.Id||0)().catch(()=>0),_c)}function Ra(e){if(!e)return Promise.resolve("");let t=Hb.get(e);if(t!==void 0)return Promise.resolve(t);let o=Up.get(e);if(o)return o;let n=(async()=>{let a=(await ne(G+"/_api/web/getuserbyid("+e+")?$select=Title").catch(()=>null))?.Title||"";return Hb.set(e,a),Up.delete(e),a})();return Up.set(e,n),n}var Dc,_c,Hb,Up,Xt=L(()=>{"use strict";W();He();Tt();Dc=null,_c=null;Hb=new Map,Up=new Map});var jb={};q(jb,{getBacklinksFor:()=>bs,invalidateBacklinkCache:()=>rn,scanBlocks:()=>zb});function rn(){Rc=null,kr=null}async function Fb(e){let t=[],o=J(e,"/items?$select=Id,Title,Body_blocks,PageType,OriginPageId,IsTemplate&$top=500&$orderby=Id"),n=0;for(;o&&n++<50;){let r=await ne(o);if(!r)break;for(let a of r.results)a._srcList=e,t.push(a);o=r.__next}return t}async function DT(){return Rc||kr||(kr=(async()=>{let e=Jt(),t=[Fb(ce)];e!==ce&&t.push(Fb(e).catch(()=>[]));let n=(await Promise.all(t)).flat();return Rc=n,kr=null,n})().catch(e=>{throw kr=null,e}),kr)}async function bs(e,t){if(!e)return[];let o=await DT(),n=[];for(let r of o){let a=Ir(r._srcList||ce,r.Id);if(a===e||r.PageType==="draft"||r.OriginPageId||r.PageType==="row"||r.IsTemplate)continue;let i=r.Body_blocks||"";if(!i)continue;let s;try{s=ge(i)}catch{continue}let{count:l,snippet:c}=zb(s,e);l!==0&&n.push({pageId:a,pageTitle:t?.(a)||r.Title||"\u7121\u984C",snippet:c,count:l})}return n.sort((r,a)=>a.count-r.count||r.pageTitle.localeCompare(a.pageTitle,"ja")),n}function zb(e,t){let o=0,n="",r=i=>{let s=0;for(let l of i)l.kind==="pagelink"&&l.pageId===t?s++:(l.kind==="bold"||l.kind==="italic"||l.kind==="strike"||l.kind==="link")&&(s+=r(l.children));return s},a=i=>{for(let s of i){if("inline"in s&&Array.isArray(s.inline)){let l=r(s.inline);l>0&&(o+=l,n||(n=Ub(Lt(s.inline))))}if(s.kind==="table")for(let l of s.rows)for(let c of l){let d=r(c);d>0&&(o+=d,n||(n=Ub(Lt(c))))}if((s.kind==="quote"||s.kind==="callout")&&a(s.children),s.kind==="list")for(let l of s.items)a(l)}};return a(e),{count:o,snippet:n}}function Ub(e){let t=e.replace(/\s+/g," ").trim();return t.length>100?t.substring(0,100).trimEnd()+"\u2026":t}var Rc,kr,vs=L(()=>{"use strict";Tt();W();Qo();Rc=null,kr=null});var qb={};q(qb,{addPage:()=>uo,metaById:()=>A,removePages:()=>Mo,setMetaPages:()=>zp,setPageTitle:()=>Na});function A(e){return e&&m.meta.pages.find(t=>t.id===e)||null}function zp(e){let t=new Set;m.meta.pages=e.filter(o=>t.has(o.id)?!1:t.add(o.id))}function uo(e,t={}){m.meta.pages.some(o=>o.id===e.Id)||m.meta.pages.push({id:e.Id,title:e.Title,parent:e.ParentId||"",type:e.Type,...t})}function Mo(e){let t=new Set(e);t.size!==0&&(m.meta.pages=m.meta.pages.filter(o=>!t.has(o.id)))}function Na(e,t){let o=m.meta.pages.find(n=>n.id===e);o&&(o.title=t)}var we=L(()=>{"use strict";j()});var Kb={};q(Kb,{deleteAllRowEntriesForList:()=>jp,deleteRowEntry:()=>Er,getRowBody:()=>fo,getRowBodyBlocks:()=>_T,setRowBody:()=>Po});async function Nc(e,t){let o="PageType eq 'row' and ListTitle eq '"+e.replace(/'/g,"''")+"' and DbRowId eq "+t,n=J(ce,"/items?$select=Id&$filter="+encodeURIComponent(o)+"&$orderby=Id&$top=20"),r=await ne(n);return r?r.results.map(a=>({id:a.Id,etag:a.__metadata?.etag||""})):[]}async function $b(e,t){return(await Nc(e,t))[0]||null}async function fo(e,t){await Ft();let o=await $b(e,t);if(!o)return"";let n=J(ce,"/items("+o.id+")?$select=Body_blocks"),r=await ne(n);return NT(r?.Body_blocks)}async function _T(e,t){await Ft();let o=await $b(e,t);if(!o)return"";let n=J(ce,"/items("+o.id+")?$select=Body_blocks");return(await ne(n))?.Body_blocks||""}async function Po(e,t,o,n,r){await Ft();let a=RT(r),i=await Nc(e,t);if(i.length>=1){await je(ce,i[0].id,{Title:n,Body_blocks:a});for(let d=1;d<i.length;d++)await Ke(ce,i[d].id).catch(()=>{});return}let l=(o?A(o):null)?.scope||"user";await Ne(ce,{Title:n,ParentId:o||"",PageType:"row",ListTitle:e,DbRowId:t,Body_blocks:a,Scope:l});let c=await Nc(e,t);if(c.length>1){await je(ce,c[0].id,{Title:n,Body_blocks:a}).catch(()=>{});for(let d=1;d<c.length;d++)await Ke(ce,c[d].id).catch(()=>{})}}function RT(e){let t=(e||"").trim();if(!t)return"[]";if(t.startsWith("["))try{let o=JSON.parse(t);if(Array.isArray(o))return t}catch{}return JSON.stringify(Ye(e))}function NT(e){if(!e)return"";try{let t=JSON.parse(e);return Array.isArray(t)?Xe(t):""}catch{return""}}async function Er(e,t){let o=await Nc(e,t);for(let n of o)await Ke(ce,n.id).catch(()=>{})}async function jp(e){await Ft();let t="PageType eq 'row' and ListTitle eq '"+e.replace(/'/g,"''")+"'",o=J(ce,"/items?$select=Id&$filter="+encodeURIComponent(t)+"&$top=500"),n=await ne(o);if(n)for(let r of n.results)await Ke(ce,r.Id).catch(()=>{})}var qp=L(()=>{"use strict";De();Tt();W();St();we()});function Kp(){return ys||(ys=(async()=>{await Ot({title:Oa,fields:HT})})().catch(e=>{throw ys=null,e}),ys)}async function UT(){return $p||xs||(xs=(async()=>{let e=G+"/_api/web/siteusers?$select=Id,Title,Email,PrincipalType&$top=500",o=((await ne(e).catch(()=>null))?.results||[]).filter(n=>n.PrincipalType===1&&n.Email).map(n=>({id:n.Id,title:n.Title||n.Email,email:n.Email}));return $p=o,xs=null,o})(),xs)}async function Wb(e){let t=await UT(),o=m.meta.myUserId||0,n=e.trim().toLowerCase(),r=t.filter(a=>a.id!==o&&(!n||a.title.toLowerCase().includes(n)||a.email.toLowerCase().includes(n)));return r.sort((a,i)=>{let s=a.title.toLowerCase().startsWith(n)?0:1,l=i.title.toLowerCase().startsWith(n)?0:1;return s-l||a.title.localeCompare(i.title,"ja")}),r.slice(0,8)}async function Gb(e){let t=m.meta.myUserId||await pt().catch(()=>0),o=await Cn().catch(()=>""),n=Array.from(new Set(e.recipientIds)).filter(r=>r&&r!==t);if(n.length!==0){await Kp();for(let r of n)await Ne(Oa,{RecipientId:r,ActorId:t,ActorName:o,PageId:e.pageId,PageTitle:e.pageTitle.slice(0,255),CommentId:e.commentId,BlockId:e.blockId||"",Snippet:e.snippet.slice(0,255),Read:0}).catch(()=>{})}}function zT(e){return{Id:Number(e.Id),ActorId:Number(e.ActorId||0),ActorName:String(e.ActorName||""),PageId:String(e.PageId||""),PageTitle:String(e.PageTitle||""),CommentId:Number(e.CommentId||0),BlockId:String(e.BlockId||""),Snippet:String(e.Snippet||""),Read:Number(e.Read||0),ReadAt:e.ReadAt?Number(e.ReadAt):void 0,Created:e.Created?String(e.Created):void 0}}async function Wp(){let e=m.meta.myUserId||await pt().catch(()=>0);if(!e)return[];await Kp();let t=J(Oa,"/items?$select="+encodeURIComponent(FT)+"&$filter="+encodeURIComponent("RecipientId eq "+e)+"&$orderby=Created desc&$top=100"),n=((await ne(t).catch(()=>null))?.results||[]).map(zT),r=Date.now(),a=[];for(let i of n)i.Read&&i.ReadAt&&r-i.ReadAt>OT?await Ke(Oa,i.Id).catch(()=>{}):a.push(i);return a}async function Vb(){let e=m.meta.myUserId||await pt().catch(()=>0);if(!e)return 0;await Kp();let t=J(Oa,"/items?$select=Id&$filter="+encodeURIComponent("RecipientId eq "+e+" and Read eq 0")+"&$top=100");return(await ne(t).catch(()=>null))?.results?.length||0}async function Gp(e){await je(Oa,e,{Read:1,ReadAt:Date.now()}).catch(()=>{})}var Oa,OT,HT,FT,ys,$p,xs,Oc=L(()=>{"use strict";j();He();Tt();De();Xt();Oa="memola-inbox",OT=3*24*60*60*1e3,HT=[{name:"RecipientId",kind:9,indexed:!0},{name:"ActorId",kind:9},{name:"ActorName",kind:2},{name:"PageId",kind:2},{name:"PageTitle",kind:2},{name:"CommentId",kind:9},{name:"BlockId",kind:2},{name:"Snippet",kind:3},{name:"Read",kind:9},{name:"ReadAt",kind:9}],FT="Id,ActorId,ActorName,PageId,PageTitle,CommentId,BlockId,Snippet,Read,ReadAt,Created",ys=null;$p=null,xs=null});var Kc={};q(Kc,{ORG_COMMENTS_LIST:()=>Tr,apiAddComment:()=>jc,apiDeleteComment:()=>qc,apiEditComment:()=>Jp,apiListComments:()=>Uc,apiResolveThread:()=>Zp,apiToggleReaction:()=>Qp,ensureCommentsLists:()=>Is,gcMyOrphanComments:()=>GT,getMyCommentsList:()=>Lr,groupThreads:()=>Fc,hydrateAuthorNames:()=>$c,invalidateComments:()=>Zt,openThreadCountByBlock:()=>Vp,parseReactions:()=>ks,purgeCommentsForPage:()=>KT,remapCommentsPageId:()=>WT,selectOrphans:()=>$T});function Lr(){let e=m.meta.myUserId;return e?"memola-user-"+e+"-comments":null}function ks(e){if(!e.Reactions)return{};try{let t=JSON.parse(e.Reactions);return t&&typeof t=="object"?t:{}}catch{return{}}}async function Yb(e,t){if(await Ot({title:e,fields:jT}),t){let o=e.match(/^memola-user-(\d+)-comments$/);o&&await ps(e,parseInt(o[1],10)).catch(()=>{})}}async function Is(){return ws||(ws=(async()=>{m.meta.myUserId||(m.meta.myUserId=await pt().catch(()=>0)),await Yb(Tr,!1);let e=Lr();e&&await Yb(e,!0)})().catch(e=>{throw ws=null,e}),ws)}function Fc(e){let t=(r,a)=>(r.Created||"").localeCompare(a.Created||"")||r.Id-a.Id,o=e.filter(r=>!r.ThreadId).sort(t),n=new Map;for(let r of e){if(!r.ThreadId)continue;let a=n.get(r.ThreadId)||[];a.push(r),n.set(r.ThreadId,a)}return o.map(r=>({root:r,replies:(n.get(String(r.Id))||[]).sort(t),blockId:r.BlockId||"",resolved:(r.Resolved||0)>0}))}function Vp(e){let t=new Map;for(let o of e)o.resolved||t.set(o.blockId,(t.get(o.blockId)||0)+1);return t}function $T(e,t){return e.filter(o=>!t.has(o.PageId))}function Xb(e){return{Id:Number(e.Id),PageId:String(e.PageId||""),BlockId:String(e.BlockId||""),ThreadId:String(e.ThreadId||""),Body:String(e.Body||""),Resolved:Number(e.Resolved||0),ResolvedBy:e.ResolvedBy?Number(e.ResolvedBy):void 0,ResolvedAt:e.ResolvedAt?Number(e.ResolvedAt):void 0,AnchorText:e.AnchorText?String(e.AnchorText):void 0,Scope:e.Scope==="org"?"org":"user",AuthorId:Number(e.AuthorId||0),AuthorName:e.AuthorName?String(e.AuthorName):void 0,Edited:e.Edited?Number(e.Edited):0,Deleted:e.Deleted?Number(e.Deleted):0,Reactions:e.Reactions?String(e.Reactions):void 0,Created:e.Created?String(e.Created):void 0}}async function Yp(e,t){let o="PageId eq '"+t.replace(/'/g,"''")+"'",n=J(e,"/items?$select="+encodeURIComponent(qT)+"&$filter="+encodeURIComponent(o)+"&$orderby=Created&$top=500");return((await ne(n).catch(()=>null))?.results||[]).map(a=>{let i=Xb(a);return i._list=e,i})}function Zt(e){e?Hc.delete(e):Hc.clear()}async function Uc(e){if(!e)return[];let t=Hc.get(e);if(t)return t;await Is();let o=[Tr],n=Lr();n&&o.push(n);let r=await Promise.all(o.map(s=>Yp(s,e))),a=m.meta.myUserId||0,i=r.flat().filter(s=>s.Scope==="org"||!a||s.AuthorId===a);return Hc.set(e,i),i}function Jb(e){return e==="org"?Tr:Lr()||Tr}function zc(e){return e._list||Jb(e.Scope)}async function Xp(){let e=m.meta.myUserId||await pt().catch(()=>0),t=await Cn().catch(()=>"");return{id:e,name:t}}async function jc(e){await Is();let{id:t,name:o}=await Xp(),n={PageId:e.pageId,BlockId:e.blockId||"",ThreadId:e.threadRootId||"",Body:e.body,Scope:e.scope,AuthorId:t,AuthorName:o,Resolved:0,Edited:0,Deleted:0};e.anchorText&&(n.AnchorText=e.anchorText.slice(0,255));let r=await Ne(Jb(e.scope),n);Zt(e.pageId);let a=Xb(r);return e.mentions&&e.mentions.length&&await Gb({recipientIds:e.mentions,pageId:e.pageId,pageTitle:A(Ts(e.pageId))?.title||"",commentId:a.Id,blockId:e.blockId||"",snippet:e.body}).catch(()=>{}),a}async function Jp(e){await je(zc(e),e.Id,{Body:e.Body,Edited:1}),Zt(e.PageId)}async function qc(e){await Ke(zc(e),e.Id),Zt(e.PageId)}async function Zp(e,t){let{id:o}=await Xp();await je(zc(e),e.Id,{Resolved:t?1:0,ResolvedBy:t?o:0,ResolvedAt:t?Date.now():0}),Zt(e.PageId)}async function Qp(e,t){let{id:o}=await Xp();if(!o)return;let n=ks(e),r=n[t]||[],a=r.indexOf(o);a>=0?r.splice(a,1):r.push(o),r.length?n[t]=r:delete n[t],await je(zc(e),e.Id,{Reactions:JSON.stringify(n)}),Zt(e.PageId)}async function KT(e){await Is().catch(()=>{});let t=[Tr,Lr()].filter(Boolean);for(let o of t){let n=await Yp(o,e).catch(()=>[]);for(let r of n)await Ke(o,r.Id).catch(()=>{})}Zt(e)}async function WT(e){if(e.size===0)return;await Is().catch(()=>{});let t=[Tr,Lr()].filter(Boolean);for(let o of t)for(let[n,r]of e){if(n===r)continue;let a=await Yp(o,n).catch(()=>[]);for(let i of a)await je(o,i.Id,{PageId:r}).catch(()=>{});Zt(n),Zt(r)}}async function GT(e){let t=Lr();if(!t)return;let o=J(t,"/items?$select=Id,PageId&$top=500&$orderby=Id"),n=await ne(o).catch(()=>null);if(!n?.results)return;let r=n.results.filter(a=>a.PageId&&!a.PageId.startsWith("row:")&&!e.has(a.PageId));for(let a of r)await Ke(t,a.Id).catch(()=>{})}async function $c(e){await Promise.all(e.map(async t=>{!t.AuthorName&&t.AuthorId&&(t.AuthorName=await Ra(t.AuthorId).catch(()=>""))}))}var Tr,jT,qT,ws,Hc,Es=L(()=>{"use strict";j();De();Tt();Xt();Oc();W();we();Tr="memola-comments";jT=[{name:"PageId",kind:2,indexed:!0},{name:"BlockId",kind:2},{name:"ThreadId",kind:2},{name:"Body",kind:3},{name:"Resolved",kind:9},{name:"ResolvedBy",kind:9},{name:"ResolvedAt",kind:9},{name:"AnchorText",kind:2},{name:"Scope",kind:2},{name:"AuthorId",kind:9},{name:"AuthorName",kind:2},{name:"Edited",kind:9},{name:"Deleted",kind:9},{name:"Reactions",kind:3}],qT="Id,PageId,BlockId,ThreadId,Body,Resolved,ResolvedBy,ResolvedAt,AnchorText,Scope,AuthorId,AuthorName,Edited,Deleted,Reactions,Created",ws=null;Hc=new Map});var Ut={};q(Ut,{apiAddDbRow:()=>Ss,apiCreateDb:()=>Ls,apiPurgeRow:()=>Wc,apiRestoreRow:()=>tu,apiTrashRow:()=>YT,apiUpdateDbRow:()=>ut,duplicateDb:()=>VT,ensureRowTrashFields:()=>eu,getTrashedRows:()=>ou,reconcileTrashedRows:()=>XT,stripInternalDbFields:()=>Qb});function Qb(e){return e.filter(t=>!Zb.has(t.Title)&&!Zb.has(t.InternalName))}async function Ls(e,t){let n="memola-db-"+Date.now().toString();return await Ot({title:n,fields:[{name:"Trashed",kind:9,indexed:!0},{name:"TrashedBy",kind:9,indexed:!0}]}),await Ha(e,t,n)}async function VT(e,t){let o=t.copyRows??!t.asTemplate,n=A(e);if(!n||n.type!=="database"||!n.list)throw new Error("DB \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");let r=n.list,a=Qb(await ze(r)).filter(d=>d.Title!=="Title"&&d.InternalName!=="Title"),i=a.map(d=>({name:d.Title,kind:d.FieldTypeKind,...d.Choices?{choices:d.Choices}:{}})),s="memola-db-"+Date.now().toString();await Ot({title:s,fields:[{name:"Trashed",kind:9,indexed:!0},{name:"TrashedBy",kind:9,indexed:!0},...i]});let l=n.scope||"user",c=await Ha(n.title||"\u7121\u984C","",s,l,t.asTemplate);if(o){let d=await Ee(r);for(let p of d){let u=p;if(typeof u.Trashed=="number"&&u.Trashed>0)continue;let f={Title:u.Title??""};for(let g of a){let y=u[g.InternalName]??u[g.Title];y!=null&&y!==""&&(f[g.Title]=y)}await Ss(s,f).catch(()=>{})}}return c}async function eu(e){await Ot({title:e,fields:[{name:"Trashed",kind:9,indexed:!0},{name:"TrashedBy",kind:9,indexed:!0}]}).catch(()=>{})}async function YT(e,t){let o=Date.now(),n=m.meta.myUserId||await pt().catch(()=>0);await eu(e).catch(()=>{});let r=await ev(e,t);if(r.length===0){let a=m.meta.pages.find(s=>s.type==="database"&&s.list===e),i="";try{let s=await us(e,t);i=String(s?.Title||"")}catch{}try{await Ne(ce,{Title:i,ParentId:a?.id||"",PageType:"row",ListTitle:e,DbRowId:t,Body_blocks:"[]",Scope:a?.scope||"user",Trashed:o,TrashedBy:n})}catch{}}else for(let a of r)await Pc(ce,a.id,n,o).catch(()=>{});await Pc(e,t,n,o).catch(()=>{})}async function tu(e,t){await eu(e).catch(()=>{}),await Cc(e,t).catch(()=>{});let o=await ev(e,t);for(let n of o)await Cc(ce,n.id).catch(()=>{})}async function Wc(e,t){await Ke(e,t).catch(()=>{}),await Er(e,t).catch(()=>{})}async function ev(e,t){let o="PageType eq 'row' and ListTitle eq '"+e.replace(/'/g,"''")+"' and DbRowId eq "+t,n=J(ce,"/items?$select=Id&$filter="+encodeURIComponent(o)+"&$orderby=Id&$top=20");return((await ne(n))?.results||[]).map(a=>({id:a.Id}))}async function XT(e,t){let o=J(ce,"/items?$select=Id,DbRowId,Trashed,TrashedBy&$filter="+encodeURIComponent("PageType eq 'row' and ListTitle eq '"+e.replace(/'/g,"''")+"' and Trashed gt 0")+"&$top=500"),n=await ne(o).catch(()=>null);if(n?.results)for(let r of n.results){let a=t.find(i=>i.Id===r.DbRowId);a&&(a.Trashed||await je(e,a.Id,{Trashed:r.Trashed,TrashedBy:r.TrashedBy}).catch(()=>{}))}}async function ou(){let e=J(ce,"/items?$select=Id,Title,ListTitle,DbRowId,Trashed,TrashedBy,Scope,AuthorId&$filter="+encodeURIComponent("PageType eq 'row' and Trashed gt 0")+"&$orderby=Trashed desc&$top=500"),t=await ne(e).catch(()=>null);return t?t.results.filter(o=>o.ListTitle&&o.DbRowId).map(o=>({bodyId:o.Id,listTitle:o.ListTitle,dbRowId:o.DbRowId,title:o.Title||"",trashedAt:o.Trashed||0,trashedBy:o.TrashedBy||0,scope:o.Scope==="org"||o.Scope==="user"?o.Scope:"",authorId:o.AuthorId||0})):[]}async function Ss(e,t){let o=t.Title,n={};for(let a of Object.keys(t))a==="Title"||a==="__metadata"||(n[a]=t[a]);let r=await Ne(e,{Title:o??""});if(Object.keys(n).length>0){await je(e,r.Id,n);for(let a of Object.keys(n))r[a]=n[a]}return r}async function ut(e,t,o){await je(e,t,o)}var Zb,We=L(()=>{"use strict";j();De();W();we();Xt();Tt();Zb=new Set(["Trashed","TrashedBy"])});var Ua={};q(Ua,{DAILY_DATE_FIELD:()=>ft,DAILY_LIST_TITLE:()=>Te,DAILY_TAG_FIELD:()=>Gc,clearDailyCache:()=>nu,convertDailyToPage:()=>au,ensureDailyDb:()=>Yc,findNoteForDate:()=>ru,getOrCreateNoteForDate:()=>ZT,isDailyList:()=>Vc,isDailyTitleFormat:()=>Sc,refreshDailyCacheIfActive:()=>eL,restoreToDaily:()=>QT,todayYMD:()=>Ib});function nu(){Fa=null}async function tv(){try{return(await ze(Te)).find(o=>o.Title===ft||o.InternalName===ft)?.InternalName||ft}catch{return ft}}async function ov(){let e=null;for(let o=0;o<3;o++){try{if((await ze(Te)).some(r=>r.Title===ft||r.InternalName===ft)){await vr(Te,ft).catch(()=>{});return}}catch(n){e=n}try{if(await Ht(Te,ft,4),(await ze(Te).catch(()=>[])).some(r=>r.Title===ft||r.InternalName===ft)){await vr(Te,ft).catch(()=>{});return}}catch(n){e=n}await new Promise(n=>setTimeout(n,250))}let t=e instanceof Error?": "+e.message:"";throw new Error("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u7528\u300C\u65E5\u4ED8\u300D\u5217\u3092\u6E96\u5099\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F"+t)}function Vc(e){return e===Te}async function nv(){let t=(await ze(Te).catch(()=>[])).filter(o=>o.Title===Gc||o.InternalName===Gc||/^NoteTag\d*$/.test(o.InternalName));if(t.length===0){try{await Ht(Te,Gc,6,["\u4ED5\u4E8B","\u500B\u4EBA","\u4F1A\u8B70","\u5BB6\u65CF","\u305D\u306E\u4ED6"])}catch{}return}if(t.length!==1){t.sort((o,n)=>o.InternalName.localeCompare(n.InternalName));for(let o=1;o<t.length;o++)await Op(Te,t[o].InternalName).catch(()=>{})}}async function Yc(){return Fa||(Fa=(async()=>{let e=m.meta.pages.find(a=>a.type==="database"&&a.list===Te&&!a.trashed);if(e&&await ne(J(Te))!=null)return await ov(),await nv(),{dbPageId:e.id,listTitle:Te,dateInternalName:await tv()};await ne(J(Te))!=null||await Ca(Te),await ov(),await nv();let o=await tv();if(e)return{dbPageId:e.id,listTitle:Te,dateInternalName:o};let n=await Ha("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8","",Te);await lt(n.Id,{Icon:"\u{1F4C5}",Pinned:1}).catch(()=>{});let r=A(n.Id);return r&&(r.icon="\u{1F4C5}",r.pinned=!0),uo(n),{dbPageId:n.Id,listTitle:Te,dateInternalName:o}})().catch(e=>{throw Fa=null,e}),Fa)}async function ru(e){let o=(await Yc()).dateInternalName+" eq datetime'"+e+"T00:00:00'",n=J(Te,"/items?$filter="+encodeURIComponent(o)+"&$top=1"),a=(await ne(n).catch(()=>null))?.results?.[0];if(!a)return null;let i=await fo(Te,a.Id).catch(()=>"");return{rowId:a.Id,title:a.Title||"",body:i}}function JT(e){return["## \u30BF\u30B9\u30AF","- [ ] ","","## \u30E1\u30E2",""].join(`
`)}async function ZT(e){let t=await Yc(),o=await ru(e);if(o)return{...o,dbPageId:t.dbPageId};let n=Lc(e),r=await Ss(Te,{Title:n,[ft]:e}),a=JT(e);return await Po(Te,r.Id,t.dbPageId,n,a),{rowId:r.Id,title:n,body:a,dbPageId:t.dbPageId}}async function au(e,t,o,n=""){let r=await fo(Te,e).catch(()=>""),a=await an(t,n);await za(a.Id,t,r).catch(()=>{}),await lt(a.Id,{OriginDailyDate:o}).catch(()=>{});let i=A(a.Id);return i&&(i.originDailyDate=o),await Er(Te,e).catch(()=>{}),await Ke(Te,e).catch(()=>{}),a.Id}async function QT(e){let t=A(e);if(!t?.originDailyDate)throw new Error("\u3053\u306E\u30DA\u30FC\u30B8\u306F\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u7531\u6765\u3067\u306F\u3042\u308A\u307E\u305B\u3093");let o=t.originDailyDate,n=await go(e),r=await Yc(),a=await ru(o),i,s;a?(i=a.rowId,s=a.title||Lc(o)):(s=Lc(o),i=(await Ss(Te,{Title:s,[ft]:o})).Id),await Po(Te,i,r.dbPageId,s,n);let{apiDeletePage:l}=await Promise.resolve().then(()=>(W(),qe));return await l(e).catch(()=>{}),{rowId:i,date:o}}async function eL(){m.dbList===Te&&(m.dbItems=await Ee(Te))}var Te,ft,Gc,Fa,An=L(()=>{"use strict";j();De();Tt();W();We();To();we();Te="memola-daily",ft="NoteDate",Gc="NoteTag",Fa=null});var Sr={};q(Sr,{isPagePublished:()=>lL,publishPage:()=>aL,publishedUrlFor:()=>rL,syncPublishedPage:()=>sL,unpublishPage:()=>iL});function iv(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{let t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}function tL(e){let t=[{id:"cbe7b0a9-3504-44dd-a3a3-0e5cacd07788",instanceId:iv(),title:"Title Region",description:"Title Region Description",audiences:[],serverProcessedContent:{htmlStrings:{},searchablePlainTexts:{},imageSources:{},links:{}},dataVersion:"1.4",properties:{title:e,imageSourceType:4,layoutType:"FullWidthImage",textAlignment:"Left",showTopicHeader:!1,showPublishDate:!1,topicHeader:"",authors:[],authorByline:[],isDecorative:!0}}];return JSON.stringify(t)}function sv(e){let t=e?So(e):"<p></p>",o=[{controlType:4,id:iv(),position:{controlIndex:1,sectionIndex:1,zoneIndex:1,sectionFactor:12,layoutIndex:1},addedFromPersistedData:!0,innerHTML:t},{controlType:0,pageSettingsSlice:{isDefaultDescription:!0,isDefaultThumbnail:!0}}];return JSON.stringify(o)}async function oL(e){let t=await fetch(e,{headers:{Accept:"application/json;odata=verbose"},credentials:"include"});return t.ok?t.json():null}async function lv(e,t){let o=await xe(),n=await fetch(G+"/_api/sitepages/pages",{method:"POST",headers:{Accept:"application/json;odata=verbose","Content-Type":"application/json;odata=verbose","X-RequestDigest":o},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Publishing.SitePage"},PageLayoutType:"Article",Title:e})});if(!n.ok){let l=await n.text().catch(()=>"");throw new Error("SitePage \u4F5C\u6210\u5931\u6557: "+n.status+(l?" \u2014 "+l.slice(0,200):""))}let r=await n.json(),a=r.d||r,i=Number(a.Id)||0;if(!i)throw new Error("SitePage \u4F5C\u6210\u5931\u6557: ID \u53D6\u5F97\u4E0D\u53EF");await lu(i,e,t);let s=await cu(i);return{id:i,url:s}}async function iu(e){let t=await xe();return fetch(G+"/_api/sitepages/pages("+e+")/CheckoutPage",{method:"POST",headers:{Accept:"application/json;odata=verbose","X-RequestDigest":t},credentials:"include"})}async function rv(e){let t=await xe();await fetch(G+"/_api/sitepages/pages("+e+")/DiscardPage",{method:"POST",headers:{Accept:"application/json;odata=verbose","X-RequestDigest":t},credentials:"include"}).catch(()=>{})}async function av(e,t,o){let n=await xe(),r=tL(t);return fetch(G+"/_api/sitepages/pages("+e+")",{method:"POST",headers:{Accept:"application/json;odata=verbose","Content-Type":"application/json;odata=verbose","X-RequestDigest":n,"X-HTTP-Method":"MERGE","IF-MATCH":"*"},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Publishing.SitePage"},Title:t,CanvasContent1:o,LayoutWebpartsContent:r})})}async function su(e){let t=await e.text().catch(()=>"");return e.status+(t?" \u2014 "+t.slice(0,400):"")}async function lu(e,t,o){let n=await iu(e);if(n.status===409&&(await rv(e),n=await iu(e)),!n.ok&&n.status!==200&&n.status!==201)throw new Error("SitePage \u30C1\u30A7\u30C3\u30AF\u30A2\u30A6\u30C8\u5931\u6557: "+await su(n));let r=await av(e,t,o);if(r.status===409){await rv(e);let a=await iu(e);if(!a.ok)throw new Error("SitePage \u518D\u30C1\u30A7\u30C3\u30AF\u30A2\u30A6\u30C8\u5931\u6557: "+await su(a));r=await av(e,t,o)}if(!r.ok)throw new Error("SitePage \u4FDD\u5B58\u5931\u6557: "+await su(r))}async function cu(e){let t=await xe(),o=await fetch(G+"/_api/sitepages/pages("+e+")/Publish",{method:"POST",headers:{Accept:"application/json;odata=verbose","X-RequestDigest":t},credentials:"include"});if(!o.ok){let s=await o.text().catch(()=>"");throw new Error("SitePage \u516C\u958B\u5931\u6557: "+o.status+(s?" \u2014 "+s.slice(0,200):""))}let n=await oL(G+"/_api/sitepages/pages("+e+")"),r=n?.d||n,a=r?.AbsoluteUrl||"";if(a)return a;let i=r?.FileName||"";return i?G+"/SitePages/"+i:""}async function nL(e){let t=await xe();await fetch(G+"/_api/sitepages/pages("+e+")",{method:"POST",headers:{"X-RequestDigest":t,"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include"})}function rL(e){return A(e)?.publishedUrl||""}async function aL(e,t,o){let n=A(e),r=sv(o),a,i=n?.publishedSitePageId||0;if(i){await lu(i,t,r);let s=await cu(i)||n?.publishedUrl||"";a={id:i,url:s}}else a=await lv(t,r);return await lt(e,{Published:1,PublishedUrl:a.url,PublishedPageId:a.id,PublishedDirty:0}),n&&(n.published=!0,n.publishedUrl=a.url,n.publishedSitePageId=a.id,n.publishedDirty=!1),a.url}async function iL(e){let t=A(e),o=t?.publishedSitePageId||0;if(o)try{await nL(o)}catch{}await lt(e,{Published:0,PublishedUrl:"",PublishedPageId:0,PublishedDirty:0}).catch(()=>{}),t&&(t.published=!1,delete t.publishedUrl,delete t.publishedSitePageId,delete t.publishedDirty)}async function sL(e,t,o){let n=A(e);if(!n?.published)throw new Error("not_published");let r=sv(o),a=n.publishedSitePageId||0;if(a)await lu(a,t,r),await cu(a);else{let i=await lv(t,r);await lt(e,{PublishedUrl:i.url,PublishedPageId:i.id}).catch(()=>{}),n.publishedUrl=i.url,n.publishedSitePageId=i.id}await lt(e,{PublishedDirty:0}).catch(()=>{}),n.publishedDirty=!1}function lL(e){return!!A(e)?.published}var Mr=L(()=>{"use strict";He();br();W();on();we()});var mv={};q(mv,{applyBlockMergeChoices:()=>mL,threeWayMergeBlocks:()=>Pr});function cv(e){return JSON.stringify(du(e))}function du(e){if(Array.isArray(e))return e.map(du);if(e&&typeof e=="object"){let t={};for(let o of Object.keys(e).sort())t[o]=du(e[o]);return t}return e}function Xc(e){if(Array.isArray(e))return e.map(Xc);if(e&&typeof e=="object"){let t={};for(let[o,n]of Object.entries(e))o==="id"||o==="lastBy"||o==="lastAt"||(t[o]=Xc(n));return t}return e}function dv(e,t){let o=e.map(c=>c.id),n=t.map(c=>c.id),r=new Set(o),a=new Set(n),i=n.filter(c=>r.has(c)),s=o.filter(c=>a.has(c)),l=new Set;for(let c=0;c<i.length;c++)i[c]!==s[c]&&l.add(i[c]);return l}function Pr(e,t,o){let n=new Map(e.map(f=>[f.id,f])),r=new Map(t.map(f=>[f.id,f])),a=new Map(o.map(f=>[f.id,f])),i=dv(e,t),s=dv(e,o),l=i.size===0&&s.size>0,c=dL(t.map(f=>f.id),o.map(f=>f.id),l),d=[],p=0,u=[];for(let f of c){let g=n.has(f),y=r.get(f)??null,b=a.get(f)??null,h=n.get(f)??null;if(!(!y&&!b)){if(y&&!b){g?ja(y,h)&&!i.has(f)?p++:(d.push({id:f,kind:"modify-delete",base:h,yours:y,theirs:null}),u.push(y)):u.push(y);continue}if(b&&!y){g?ja(b,h)&&!s.has(f)?p++:(d.push({id:f,kind:"delete-modify",base:h,yours:null,theirs:b}),u.push(b)):u.push(b);continue}if(y&&b){if(!g){ja(y,b)||d.push({id:f,kind:"add-add",base:null,yours:y,theirs:b}),u.push(y);continue}let v=!ja(y,h),x=!ja(b,h);if(!v&&!x)u.push(y);else if(!v&&x)u.push(b),p++;else if(v&&!x)u.push(y),p++;else if(ja(y,b))u.push(y),p++;else{let w=h?cL(h,y,b):null;if(w){if(w.conflicts.length===0){u.push(w.merged),p++;continue}d.push(...w.conflicts),u.push(w.merged);continue}d.push({id:f,kind:"modify-modify",base:h,yours:y,theirs:b}),u.push(y)}}}}return{merged:u,conflicts:d,autoMergedCount:p}}function cL(e,t,o){if(e.kind!==t.kind||e.kind!==o.kind)return null;if(e.kind==="quote"&&t.kind==="quote"&&o.kind==="quote"){let n=Pr(e.children,t.children,o.children);return{merged:{...t,children:n.merged},conflicts:n.conflicts}}if(e.kind==="callout"&&t.kind==="callout"&&o.kind==="callout"){let n=t.emoji===o.emoji?t.emoji:t.emoji===e.emoji?o.emoji:(o.emoji===e.emoji,t.emoji),r=Pr(e.children,t.children,o.children);return{merged:{...t,emoji:n,children:r.merged},conflicts:r.conflicts}}return null}function dL(e,t,o=!1){let n=new Map;e.forEach((c,d)=>n.set(c,d));let r=new Map;t.forEach((c,d)=>r.set(c,d));let a=[],i=new Set,s=0,l=0;for(;s<e.length||l<t.length;){let c=s<e.length?e[s]:null,d=l<t.length?t[l]:null;if(c!==null&&i.has(c)){s++;continue}if(d!==null&&i.has(d)){l++;continue}if(c===null){d!==null&&(a.push(d),i.add(d),l++);continue}if(d===null){a.push(c),i.add(c),s++;continue}if(c===d){a.push(c),i.add(c),s++,l++;continue}if(!r.has(c)){a.push(c),i.add(c),s++;continue}if(!n.has(d)){a.push(d),i.add(d),l++;continue}o?(a.push(d),i.add(d),l++):(a.push(c),i.add(c),s++)}return a}function mL(e,t){let o=new Map(e.conflicts.map(r=>[r.id,r])),n=[];for(let r of e.merged){let a=o.get(r.id);if(!a){n.push(r);continue}let i=t[r.id];if(i!=="drop"){if(i==="yours"){a.yours&&n.push(a.yours);continue}if(i==="theirs"){a.theirs&&n.push(a.theirs);continue}n.push(r)}}return n}var ja,Jc=L(()=>{"use strict";ja=(e,t)=>cv(Xc(e))===cv(Xc(t))});var qe={};q(qe,{ORG_PAGES_LIST:()=>ce,apiApplyDraftToOrigin:()=>wL,apiCreateDbPageRow:()=>Ha,apiCreatePage:()=>an,apiCreatePageFromTemplate:()=>vL,apiDeletePage:()=>Ps,apiDeleteTemplate:()=>xL,apiDuplicateAsDraft:()=>hL,apiDuplicatePage:()=>yL,apiGetPages:()=>ct,apiLoadBlocksBody:()=>Ct,apiLoadContent:()=>fL,apiLoadContentMeta:()=>hu,apiLoadFileMeta:()=>dt,apiLoadRawBody:()=>go,apiMovePage:()=>Ar,apiPromoteDraftToPage:()=>kL,apiPurgePage:()=>Br,apiRegisterPageAsTemplate:()=>bL,apiRestorePage:()=>Bs,apiSavePageBlocks:()=>$a,apiSavePageMd:()=>za,apiSetIcon:()=>Ds,apiSetPin:()=>yu,apiSetScope:()=>Ka,apiSetTitle:()=>Wa,apiTrashPage:()=>As,appIdForCommentKey:()=>Ts,buildSourceListMap:()=>xv,clearPagesCache:()=>pu,clearPending:()=>Bn,deleteAllRowEntriesForList:()=>jp,deleteRowEntry:()=>Er,ensurePagesList:()=>Ft,filterVisiblePages:()=>yv,findOutgoingPrivateLinks:()=>gL,getMyPagesList:()=>Jt,getRowBody:()=>fo,getTrashedPages:()=>gu,isStructuralOpActive:()=>fu,listForPageId:()=>nt,listTemplates:()=>xu,markPendingCreate:()=>kv,markPendingDelete:()=>uu,markPendingRestore:()=>Iv,markRecentlyCreated:()=>_n,markStructuralOp:()=>At,mintPageId:()=>sn,pageCommentKey:()=>Cs,pageIdForListItem:()=>Ir,pageIdToItemId:()=>Mt,pagesListFor:()=>Co,parseBlocksJson:()=>ge,resolvePageId:()=>wv,scopeMismatchOnMove:()=>vu,serializeBlocks:()=>Je,setRowBody:()=>Po,updatePageRow:()=>lt});function Jt(){let e=m.meta.myUserId;return e?"memola-user-"+e+"-pages":ce}function Co(e){return e==="user"?Jt():ce}function nt(e){let t=Pt.get(e);if(t)return t;let o=A(e);return o?Co(o.scope==="org"?"org":"user"):ce}function pu(){qa=null}async function uv(e){await ne(J(e))==null&&await Ca(e);let o=await fv(e),n=async(s,l)=>{if(!o.has(s))try{await Ht(e,s,l),o.add(s)}catch{}};for(let[s,l]of pv)await n(s,l);let r=await fv(e),a=pv.filter(([s])=>!r.has(s)).map(([s])=>s);if(a.length>0)throw new Error(e+" \u306E\u5FC5\u9808\u5217\u304C\u4E0D\u8DB3\u3057\u3066\u3044\u307E\u3059: "+a.join(", "));for(let s of pL)await vr(e,s).catch(()=>{});await Ac(e,Ec).catch(()=>{});let i=e.match(/^memola-user-(\d+)-pages$/);if(i){let s=parseInt(i[1],10);await ps(e,s)}}async function Ft(){return qa||(qa=(async()=>{await uv(ce);let e=Jt();e!==ce&&await uv(e)})().catch(e=>{throw qa=null,e}),qa)}async function fv(e){let t=await ne(J(e,"/fields?$select=Title,InternalName")),o=new Set;return t?.results.forEach(n=>{o.add(n.Title),o.add(n.InternalName)}),o}function yv(e,t){return e.filter(o=>o.PageType==="row"?!1:o.PageType==="draft"||!!o.OriginPageId?t===0?!0:o.AuthorId===t:o.Scope==="org"||t===0?!0:o.AuthorId===t)}function uL(e,t){let o={id:t,title:e.Title||"",parent:e.ParentId||"",type:e.PageType==="database"?"database":"page",icon:e.Icon||""};return e.ListTitle&&(o.list=e.ListTitle),e.Pinned&&e.Pinned>0&&(o.pinned=!0),e.Trashed&&e.Trashed>0&&(o.trashed=e.Trashed),e.Published&&e.Published>0&&(o.published=!0),e.PublishedUrl&&(o.publishedUrl=e.PublishedUrl),e.PublishedPageId&&e.PublishedPageId>0&&(o.publishedSitePageId=e.PublishedPageId),e.PublishedDirty&&e.PublishedDirty>0&&(o.publishedDirty=!0),e.OriginDailyDate&&(o.originDailyDate=e.OriginDailyDate),e.OriginPageId&&(o.originPageId=e.OriginPageId),(e.Scope==="org"||e.Scope==="user")&&(o.scope=e.Scope),e.AuthorId&&(o.authorId=e.AuthorId),e.TrashedBy&&(o.trashedBy=e.TrashedBy),e.IsTemplate&&e.IsTemplate>0&&(o.isTemplate=!0),o}async function Dn(e,t){let o=Mt(e);if(!o)return null;let n=t||"Id,Title,ParentId,PageType,Icon,Pinned,Trashed,ListTitle,DbRowId,Body_blocks,Published,PublishedUrl,PublishedPageId,PublishedDirty,OriginDailyDate,OriginPageId,Scope,AuthorId,TrashedBy,IsTemplate,Modified,Editor/Title",r=/\bEditor\//.test(n)?"&$expand=Editor":"",a=J(nt(e),"/items("+o+")?$select="+encodeURIComponent(n)+r),i=await ne(a);return i?{row:i,etag:i.__metadata?.etag||"",modified:i.Modified||"",editor:i.Editor?.Title||""}:null}function sn(e,t){return e===ce?String(t):e+":"+t}function xv(e){let t=new Map,o=new Map;for(let n of e)for(let r of n.rows){let a=sn(n.list,r.Id);t.set(r,a),o.set(a,n.list)}return{rowToPageId:t,sourceListByPageId:o}}function wv(e,t,o){let n=String(o);if(e.get(n)===t)return n;let r=t+":"+o;return e.get(r)===t?r:n}function Ir(e,t){return wv(Pt,e,t)}function Cs(e){return nt(e)+":"+Mt(e)}function Ts(e){if(!e||e.startsWith("row:"))return"";let t=e.lastIndexOf(":");return t<=0?e:Ir(e.slice(0,t),parseInt(e.slice(t+1),10))}function kv(e){Cr.set(e,{state:"create",at:Date.now()})}function uu(e,t){Cr.set(e,{state:t?"delete-purge":"delete-soft",at:Date.now()})}function Iv(e){Cr.set(e,{state:"restore",at:Date.now()})}function Bn(e){Cr.delete(e)}function _n(e){kv(e)}function At(e=5e3){mu=Math.max(mu,Date.now()+e)}function fu(){return Date.now()<mu}function ct(){let e=bv.then(()=>vv(),()=>vv());return bv=e.catch(()=>{}),e}async function vv(){let e=await pt().catch(()=>0);m.meta.myUserId=e||0,await Ft();let t=Jt(),o;try{o=await Ee(ce,gv)}catch{return m.pages}let n=[{list:ce,rows:o}];if(t!==ce)try{let f=await Ee(t,gv);n.push({list:t,rows:f})}catch{return m.pages}let r=new Map(Pt),{rowToPageId:a,sourceListByPageId:i}=xv(n);Pt.clear();for(let[f,g]of i)Pt.set(f,g);let s=n.flatMap(f=>f.rows),l=yv(s,e).map(f=>uL(f,a.get(f)??String(f.Id))),c=new Map(l.map(f=>[f.id,f])),d=Date.now();for(let[f,g]of Cr){let y=c.get(f);g.state==="create"?(y||d-g.at>=hv)&&Bn(f):g.state==="restore"?(y&&!y.trashed||d-g.at>=hv)&&Bn(f):g.state==="delete-soft"?y&&y.trashed?Bn(f):y?g.absentReads=0:(g.absentReads=(g.absentReads??0)+1,g.absentReads>=2&&Bn(f)):g.state==="delete-purge"&&(y?g.absentReads=0:(g.absentReads=(g.absentReads??0)+1,g.absentReads>=2&&Bn(f)))}let p=[];for(let f of l){let g=Cr.get(f.id);g&&g.state==="delete-purge"||(g?.state==="delete-soft"&&!f.trashed&&(f.trashed=g.at),g?.state==="restore"&&f.trashed&&delete f.trashed,p.push(f))}let u=new Set(p.map(f=>f.id));for(let[f,g]of Cr){if(u.has(f)||g.state==="delete-purge")continue;let y=m.meta.pages.find(h=>h.id===f);if(!y)continue;let b={...y};g.state==="delete-soft"&&!b.trashed&&(b.trashed=g.at),g.state==="restore"&&delete b.trashed,p.push(b),Pt.set(f,r.get(f)||Co(b.scope==="org"?"org":"user"))}return zp(p),Promise.resolve().then(()=>(Es(),Kc)).then(f=>f.gcMyOrphanComments(new Set(m.meta.pages.map(g=>Cs(g.id))))).catch(()=>{}),m.pages}function Mt(e){let t=e.lastIndexOf(":"),o=t>=0?e.substring(t+1):e;return parseInt(o,10)}function gu(){return m.meta.pages.filter(e=>e.trashed).map(e=>({id:e.id,title:e.title,trashed:e.trashed,type:e.type})).sort((e,t)=>t.trashed-e.trashed)}function ge(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Je(e){return JSON.stringify(e)}async function fL(e){let t=await Dn(e,"Body_blocks"),o=ge(t?.row.Body_blocks);return tn(o)}async function go(e){let t=await Dn(e,"Body_blocks");return Xe(ge(t?.row.Body_blocks))}async function Ct(e){let o=(await Dn(e,"Body_blocks"))?.row.Body_blocks;if(!o)return"[]";try{let n=JSON.parse(o);if(!Array.isArray(n))return"[]"}catch{return"[]"}return o}async function dt(e){let t=await Dn(e,"Modified,Trashed");if(!t)return null;let o=t.row.Trashed;return{modified:t.modified,etag:t.etag,trashed:typeof o=="number"?o:0}}async function hu(e){let t=await Dn(e,"Body_blocks,Modified");if(!t)return null;let o=t.row.Body_blocks||"",n=ge(o),r=Je(n);return{html:tn(n),body:r,modified:t.modified,etag:t.etag}}async function lt(e,t){let o=Mt(e);if(!o)return;let n=nt(e);await je(n,o,t);try{let r=await Dn(e,"Modified");r&&(m.sync.pageId===e&&(m.sync.loadedEtag=r.etag,m.sync.loadedModified=r.modified),r.etag&&Yo(e).set(r.etag))}catch{}}async function an(e,t,o="user"){await Ft();let n=Co(o),r=await Ne(n,{Title:e,ParentId:t||"",PageType:"page",Icon:"",Pinned:0,Trashed:0,Body_blocks:"[]",Scope:o,AuthorId:m.meta.myUserId}),a=sn(n,r.Id);return Pt.set(a,n),_n(a),At(),m.meta.pages.push({id:a,title:e,parent:t||"",type:"page",icon:"",scope:o,authorId:m.meta.myUserId}),{Id:a,Title:e,ParentId:t||"",Type:"page"}}async function Ha(e,t,o,n="user",r=!1){await Ft();let a=Co(n),i=await Ne(a,{Title:e,ParentId:t||"",PageType:"database",Icon:"",Pinned:0,Trashed:0,ListTitle:o,Body_blocks:"[]",Scope:n,AuthorId:m.meta.myUserId,...r?{IsTemplate:1}:{}}),s=sn(a,i.Id);return Pt.set(s,a),_n(s),At(),m.meta.pages.push({id:s,title:e,parent:t||"",type:"database",list:o,icon:"",scope:n,authorId:m.meta.myUserId,...r?{isTemplate:!0}:{}}),{Id:s,Title:e,ParentId:t||"",Type:"database"}}async function $a(e,t,o,n){return Ms(e,t,o,n)}async function za(e,t,o,n){let r=Ye(o);return Ms(e,t,Je(r),n)}async function Ms(e,t,o,n){let r=Mt(e);if(!r)throw new Error("invalid page id");let a=A(e),i=!!a?.published,s={Title:t,Body_blocks:o};if(i&&(s.PublishedDirty=1),n){let c=nt(e);if(!(await yr(c,r,s,n)).ok)return{ok:!1,reason:"conflict"}}else await lt(e,s);a&&(a.title=t,i&&(a.publishedDirty=!0));let l=await Dn(e,"Modified");return l&&m.sync.pageId===e&&(m.sync.loadedEtag=l.etag,m.sync.loadedModified=l.modified),rn(),{ok:!0,etag:l?.etag||""}}async function bu(e){for(let t of e){let o=A(t);if(o?.type==="database"&&o.list==="memola-daily"){let{clearDailyCache:n}=await Promise.resolve().then(()=>(An(),Ua));n();return}}}async function Ps(e){At();let t=A(e);if(t?.type==="database"&&t.list==="memola-daily")throw new Error("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u524A\u9664\u3067\u304D\u307E\u305B\u3093 (\u500B\u4EBA\u904B\u7528\u306B\u5FC5\u9808)");let o=Zc(e);await bu(o);let n=[],r=[];for(let a of[...o].reverse()){let i=A(a),s=i?.type==="database"&&i.list?i.list:null;if(i?.published){let{unpublishPage:c}=await Promise.resolve().then(()=>(Mr(),Sr));await c(a).catch(()=>{})}let l=Mt(a);try{l&&await Ke(nt(a),l),n.push(a)}catch{r.push(a);continue}if(Promise.resolve().then(()=>(Es(),Kc)).then(c=>c.purgeCommentsForPage(Cs(a))).catch(()=>{}),s){let{deleteAllRowEntriesForList:c}=await Promise.resolve().then(()=>(qp(),Kb));await c(s).catch(()=>{}),await Aa(s).catch(()=>{})}}for(let a of n)uu(a,!0);if(Mo(n),r.length)throw new Error("\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F ("+r.length+" \u4EF6)\u3002\u4E00\u90E8\u306E\u30DA\u30FC\u30B8\u306F\u6B8B\u3063\u3066\u3044\u307E\u3059\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002");return n}async function Ar(e,t){if(e===t)return;At();let o=t;for(;o;){if(o===e)throw new Error("\u5FAA\u74B0\u53C2\u7167\u306B\u306A\u308A\u307E\u3059");o=A(o)?.parent||""}let n=A(e);if(!n)return;n.parent=t||"",await lt(e,{ParentId:t||""});let r=m.pages.find(a=>a.Id===e);r&&(r.ParentId=t||"")}function vu(e,t){if(!t)return null;let o=A(e),n=A(t);if(!o||!n)return null;let r=o.scope==="org"||o.scope==="user"?o.scope:"user",a=n.scope==="org"||n.scope==="user"?n.scope:"user";return r===a?null:a}async function As(e){At();let t=A(e);if(t?.type==="database"&&t.list==="memola-daily")throw new Error("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u524A\u9664\u3067\u304D\u307E\u305B\u3093 (\u500B\u4EBA\u904B\u7528\u306B\u5FC5\u9808)");let o=Zc(e);await bu(o);let n=Date.now(),r=m.meta.myUserId||await pt().catch(()=>0),a=[];for(let i of o){let s=A(i),l=s?.trashed,c=s?.trashedBy;s&&(s.trashed=n,s.trashedBy=r),uu(i,!1);try{await lt(i,{Trashed:n,TrashedBy:r})}catch{s&&(l?s.trashed=l:delete s.trashed,c?s.trashedBy=c:delete s.trashedBy),Bn(i),a.push(i)}}if(a.length)throw new Error("\u30B4\u30DF\u7BB1\u3078\u306E\u79FB\u52D5\u306B\u5931\u6557\u3057\u307E\u3057\u305F ("+a.length+" \u4EF6)\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")}async function Bs(e){let t=Zc(e);await bu(t);let o=[];for(let n of t){let r=A(n),a=r?.trashed,i=r?.trashedBy;r&&(delete r.trashed,delete r.trashedBy),Iv(n);try{await lt(n,{Trashed:0,TrashedBy:0})}catch{r&&(a&&(r.trashed=a),i&&(r.trashedBy=i)),Bn(n),o.push(n)}}if(o.length)throw new Error("\u5FA9\u5143\u306B\u5931\u6557\u3057\u307E\u3057\u305F ("+o.length+" \u4EF6)\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")}async function Br(e){return At(),Ps(e)}async function yu(e,t){let o=A(e);o&&(t?o.pinned=!0:delete o.pinned,await lt(e,{Pinned:t?1:0}))}async function Ds(e,t){let o=A(e);o&&(o.icon=t),await lt(e,{Icon:t})}async function Ka(e,t,o=!0){if(At(15e3),t==="org"){let d=A(e);if(d?.type==="database"&&d.list==="memola-daily")throw new Error("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u7D44\u7E54\u306B\u516C\u958B\u3067\u304D\u307E\u305B\u3093 (\u500B\u4EBA\u5C02\u7528)")}let n=o?Zc(e):[e],r=Co(t);if(!n.some(d=>nt(d)!==r)){for(let p of n){let u=Mt(p);u&&await je(nt(p),u,{Scope:t}).catch(()=>{});let f=A(p);f&&(f.scope=t)}let d={};for(let p of n)d[p]=p;return{rootId:e,idMap:d}}let i=new Set(n),s={},l=["Title","PageType","Icon","Pinned","Trashed","ListTitle","DbRowId","Body_blocks","Published","PublishedUrl","PublishedPageId","PublishedDirty","OriginDailyDate","OriginPageId","IsTemplate","AuthorId"];for(let d of n){let p=nt(d),u=Mt(d);if(!u)continue;let f=await us(p,u).catch(()=>null);if(!f)continue;let g=f,y=g.ParentId||"",h={ParentId:i.has(y)?s[y]??"":y,Scope:t};for(let w of l)g[w]!==void 0&&g[w]!==null&&(h[w]=g[w]);let v=await Ne(r,h),x=sn(r,v.Id);s[d]=x,Pt.set(x,r),_n(x),await Ke(p,u).catch(()=>{}),Pt.delete(d)}await ct();let c={};for(let[d,p]of Object.entries(s))c[d]=Ir(r,Mt(p));return rn(),Promise.resolve().then(()=>(Es(),Kc)).then(d=>d.remapCommentsPageId(new Map(Object.entries(c)))).catch(()=>{}),{rootId:c[e]??s[e]??e,idMap:c}}async function gL(e,t=new Set){let o=await Ct(e).catch(()=>null);if(!o)return[];let n;try{n=ge(o)}catch{return[]}let r=[],a=new Set,i=l=>{for(let c of l)if(c.kind==="pagelink"){let d=c.pageId;if(a.has(d)||t.has(d))continue;let p=A(d);p&&p.scope!=="org"&&(a.add(d),r.push(p.title||c.alias||d))}else(c.kind==="bold"||c.kind==="italic"||c.kind==="strike"||c.kind==="link")&&i(c.children)},s=l=>{for(let c of l){if("inline"in c&&Array.isArray(c.inline)&&i(c.inline),c.kind==="table")for(let d of c.rows)for(let p of d)i(p);if((c.kind==="quote"||c.kind==="callout")&&s(c.children),c.kind==="list")for(let d of c.items)s(d)}};return s(n),r}async function Wa(e,t){let o=A(e);o&&(o.title=t,o.published&&(o.publishedDirty=!0));let n={Title:t};o?.published&&(n.PublishedDirty=1),await lt(e,n)}async function hL(e){await Ft();let t=A(e);if(!t)throw new Error("\u539F\u672C\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");let o=await Ct(e),n="[\u4E0B\u66F8\u304D] "+(t.title||"\u7121\u984C"),r=t.scope||"user",a=Co(r),i=await Ne(a,{Title:n,ParentId:"",PageType:"draft",Icon:"\u270F\uFE0F",Pinned:0,Trashed:0,Body_blocks:o||"[]",OriginPageId:e,OriginBaseBlocks:o||"[]",Scope:r,AuthorId:m.meta.myUserId}),s=sn(a,i.Id);return Pt.set(s,a),_n(s),At(),m.meta.pages.push({id:s,title:n,parent:"",type:"page",icon:"\u270F\uFE0F",originPageId:e,authorId:m.meta.myUserId}),{Id:s,Title:n,ParentId:"",Type:"page",IsDraft:!0}}function xu(){return m.meta.pages.filter(e=>e.isTemplate&&!e.trashed).sort((e,t)=>(e.title||"\u7121\u984C").localeCompare(t.title||"\u7121\u984C","ja"))}async function bL(e){await Ft();let t=A(e);if(!t)throw new Error("\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(t.type==="database")throw new Error("DB \u306E\u30C6\u30F3\u30D7\u30EC\u767B\u9332\u306F\u672A\u5BFE\u5FDC\u3067\u3059");let o=await Ct(e),n=t.title||"\u7121\u984C",r=t.scope||"user",a=Co(r),i=await Ne(a,{Title:n,ParentId:"",PageType:"page",Icon:t.icon||"",Pinned:0,Trashed:0,Body_blocks:o||"[]",Scope:r,IsTemplate:1,AuthorId:m.meta.myUserId}),s=sn(a,i.Id);return Pt.set(s,a),_n(s),At(),m.meta.pages.push({id:s,title:n,parent:"",type:"page",icon:t.icon||"",scope:r,isTemplate:!0,authorId:m.meta.myUserId}),rn(),s}async function vL(e){await Ft();let t=A(e);if(!t)throw new Error("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(t.type==="database")throw new Error("DB \u30C6\u30F3\u30D7\u30EC\u304B\u3089\u306E\u4F5C\u6210\u306F\u672A\u5BFE\u5FDC\u3067\u3059");let o=await Ct(e),n=t.title||"\u7121\u984C",r="user",a=Co(r),i=await Ne(a,{Title:n,ParentId:"",PageType:"page",Icon:t.icon||"",Pinned:0,Trashed:0,Body_blocks:o||"[]",Scope:r,AuthorId:m.meta.myUserId}),s=sn(a,i.Id);return Pt.set(s,a),_n(s),At(),m.meta.pages.push({id:s,title:n,parent:"",type:"page",icon:t.icon||"",scope:r,authorId:m.meta.myUserId}),rn(),{Id:s,Title:n,ParentId:"",Type:"page"}}async function yL(e){await Ft();let t=A(e);if(!t)throw new Error("\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(t.type==="database")throw new Error("DB \u306F\u3053\u306E\u7D4C\u8DEF\u3067\u306F\u8907\u88FD\u3067\u304D\u307E\u305B\u3093");let o=await Ct(e),n=(t.title||"\u7121\u984C")+" (\u30B3\u30D4\u30FC)",r=t.scope||"user",a=Co(r),i=await Ne(a,{Title:n,ParentId:t.parent||"",PageType:"page",Icon:t.icon||"",Pinned:0,Trashed:0,Body_blocks:o||"[]",Scope:r,AuthorId:m.meta.myUserId}),s=sn(a,i.Id);return Pt.set(s,a),_n(s),At(),m.meta.pages.push({id:s,title:n,parent:t.parent||"",type:"page",icon:t.icon||"",scope:r,authorId:m.meta.myUserId}),rn(),{Id:s,Title:n,ParentId:t.parent||"",Type:"page"}}async function xL(e){let t=A(e),o=Mt(e);o&&await Ke(nt(e),o).catch(()=>{}),t?.type==="database"&&t.list&&await Aa(t.list).catch(()=>{}),Mo([e]),rn()}async function wL(e,t){let o=A(e);if(!o)throw new Error("\u4E0B\u66F8\u304D\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(!o.originPageId)throw new Error("\u3053\u306E\u30DA\u30FC\u30B8\u306F\u4E0B\u66F8\u304D\u3067\u306F\u3042\u308A\u307E\u305B\u3093");let n=o.originPageId;if(!m.meta.pages.find(g=>g.id===n&&!g.trashed))throw new Error("\u539F\u672C\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093 (\u524A\u9664\u6E08\u307F?)");let a=o.title.replace(/^\[下書き\]\s*/,""),i=await Ct(e);if(t?.force){if(!(await Ms(n,a,i||"[]")).ok)throw new Error("\u539F\u672C\u306E\u66F4\u65B0\u306B\u5931\u6557\u3057\u307E\u3057\u305F (\u7AF6\u5408)");return await Ps(e).catch(()=>{}),{status:"forced",originId:n}}let l=(await Dn(e,"OriginBaseBlocks"))?.row.OriginBaseBlocks??"",c=await Ct(n),d=l!==""&&Je(ge(c))===Je(ge(l));if(!l||d)return(await Ms(n,a,i||"[]")).ok?(await Ps(e).catch(()=>{}),{status:"applied",originId:n}):{status:"conflict",originId:n,conflicts:1};let{threeWayMergeBlocks:p}=await Promise.resolve().then(()=>(Jc(),mv)),u=p(ge(l),ge(i),ge(c));return u.conflicts.length>0?{status:"conflict",originId:n,conflicts:u.conflicts.length}:(await Ms(n,a,Je(u.merged))).ok?(await Ps(e).catch(()=>{}),{status:"merged",originId:n,autoMerged:u.autoMergedCount}):{status:"conflict",originId:n,conflicts:1}}async function kL(e){let t=A(e);if(!t)throw new Error("\u4E0B\u66F8\u304D\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");if(!t.originPageId)throw new Error("\u3053\u306E\u30DA\u30FC\u30B8\u306F\u4E0B\u66F8\u304D\u3067\u306F\u3042\u308A\u307E\u305B\u3093");let o=(t.title||"\u7121\u984C").replace(/^\[下書き\]\s*/,""),n=t.icon==="\u270F\uFE0F"?"":t.icon||"";return await lt(e,{Title:o,PageType:"page",OriginPageId:"",Icon:n}),t.title=o,t.originPageId=void 0,t.icon=n,rn(),e}var ce,qa,pv,pL,Pt,gv,Cr,hv,mu,bv,Zc,W=L(()=>{"use strict";j();De();Tt();He();St();on();wr();Xt();vs();ve();we();qp();ce="memola-pages";qa=null;pv=[["ParentId",2],["PageType",2],["Icon",2],["Pinned",9],["Trashed",9],["ListTitle",2],["DbRowId",9],["Body_blocks",3],["Published",9],["PublishedUrl",3],["PublishedPageId",9],["PublishedDirty",9],["OriginDailyDate",2],["OriginPageId",2],["Scope",2],["TrashedBy",9],["IsTemplate",9],["OriginBaseBlocks",3]],pL=["ListTitle","DbRowId","PageType","Scope","Trashed","TrashedBy"];Pt=new Map;gv="Id,Title,ParentId,PageType,Icon,Pinned,Trashed,ListTitle,DbRowId,Published,PublishedUrl,PublishedPageId,PublishedDirty,OriginDailyDate,OriginPageId,Scope,AuthorId,TrashedBy,IsTemplate",Cr=new Map,hv=5*6e4;mu=0;bv=Promise.resolve();Zc=e=>nn(m.pages,e)});function M(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Re=L(()=>{"use strict"});function Tv(){return typeof BroadcastChannel>"u"?null:(Ga||(Ga=new BroadcastChannel(IL)),Ga)}function Lv(e,t,o){let n=Tv();if(!n)return;let r={type:"page-saved",pageId:e,etag:t,modified:o,tabId:Ev};try{n.postMessage(r)}catch{}}function Sv(){if(Ga){try{Ga.close()}catch{}Ga=null}}function Mv(e){let t=Tv();if(!t)return()=>{};let o=n=>{let r=n.data;!r||r.type!=="page-saved"||r.tabId!==Ev&&e(r)};return t.addEventListener("message",o),()=>t.removeEventListener("message",o)}var IL,Ev,Ga,wu=L(()=>{"use strict";He();IL="memola-cross-tab:"+G,Ev=Math.random().toString(36).slice(2)+Date.now().toString(36),Ga=null});function ku(e){let t=e.split(`
`),o=[],n="";for(let r of t)n?(n+=`
`+r,r.endsWith("  ")||(o.push(n),n="")):r.endsWith("  ")?n=r:o.push(r);return n&&o.push(n),o}function Iu(e,t,o){let n=ku(e),r=ku(t),a=ku(o),i=Pv(n,r),s=Pv(n,a),l=Cv(i,r),c=Cv(s,a),d=[],p=[],u=0,f=new Map,g=new Map;for(let v of l)f.set(v.baseStart,v);for(let v of c)g.set(v.baseStart,v);let y=0;for(;y<n.length;){let v=f.get(y),x=g.get(y);if(!v&&!x){d.push(n[y]),y++;continue}if(v&&!x){d.push(...v.replacement),u++,y=v.baseEnd;continue}if(x&&!v){d.push(...x.replacement),u++,y=x.baseEnd;continue}if(v&&x){let w=v.baseEnd,T=x.baseEnd;if(w===T&&v.replacement.length===x.replacement.length&&v.replacement.every((O,D)=>O===x.replacement[D])){d.push(...v.replacement),u++,y=w;continue}let U=n.slice(y,Math.max(w,T)),P={id:p.length,yours:v.replacement,theirs:x.replacement,base:U};p.push(P),d.push(Qc+" #"+P.id),d.push(...P.yours),d.push(ed),d.push(...P.base),d.push(td),d.push(...P.theirs),d.push(od+" #"+P.id),y=Math.max(w,T)}}let b=f.get(n.length),h=g.get(n.length);if(b||h)if(b&&h)if(b.replacement.length===h.replacement.length&&b.replacement.every((x,w)=>x===h.replacement[w]))d.push(...b.replacement),u++;else{let x={id:p.length,yours:b.replacement,theirs:h.replacement,base:[]};p.push(x),d.push(Qc+" #"+x.id),d.push(...x.yours),d.push(ed),d.push(td),d.push(...x.theirs),d.push(od+" #"+x.id)}else b?(d.push(...b.replacement),u++):h&&(d.push(...h.replacement),u++);return{merged:d.join(`
`),conflicts:p,autoMergedCount:u}}function Pv(e,t){let o=e.length,n=t.length,r=Array.from({length:o+1},()=>new Array(n+1).fill(0));for(let l=1;l<=o;l++)for(let c=1;c<=n;c++)r[l][c]=e[l-1]===t[c-1]?r[l-1][c-1]+1:Math.max(r[l-1][c],r[l][c-1]);let a=[],i=o,s=n;for(;i>0&&s>0;)e[i-1]===t[s-1]?(a.push({op:"=",base:i-1,side:s-1}),i--,s--):r[i-1][s]>=r[i][s-1]?(a.push({op:"-",base:i-1}),i--):(a.push({op:"+",side:s-1}),s--);for(;i>0;)a.push({op:"-",base:i-1}),i--;for(;s>0;)a.push({op:"+",side:s-1}),s--;return a.reverse(),a}function Cv(e,t){let o=[],n=0;for(;n<e.length;){if(e[n].op==="="){n++;continue}let a=null,i=null,s=[];for(;n<e.length&&e[n].op!=="=";){let l=e[n];l.op==="-"?(a===null&&(a=l.base),i=l.base+1):l.op==="+"&&s.push(t[l.side]),n++}if(a===null){let l=e.slice(n).find(c=>c.op==="=");a=l?l.base:EL(e)+1,i=a}o.push({baseStart:a,baseEnd:i??a,replacement:s})}return o}function EL(e){for(let t=e.length-1;t>=0;t--){let o=e[t];if(o.op==="="||o.op==="-")return o.base}return-1}function Av(e,t,o){let n=e.split(`
`),r=Qc+" #"+t,a=od+" #"+t,i=n.findIndex(y=>y===r),s=n.findIndex((y,b)=>b>i&&y===a);if(i<0||s<0)return e;let l=-1,c=-1;for(let y=i+1;y<s;y++)n[y]===ed&&(l=y),n[y]===td&&(c=y);if(c<0)return e;let d=n.slice(i+1,l>=0?l:c),p=n.slice(c+1,s),u;Array.isArray(o)?u=o:o==="yours"?u=d:o==="theirs"||d.length===0?u=p:p.length===0?u=d:u=[...d,"",...p];let f=n.slice(0,i),g=n.slice(s+1);return[...f,...u,...g].join(`
`)}function Bv(e){if(e.includes(Qc)||e.includes(od))return!0;for(let t of e.split(`
`))if(t===td||t===ed)return!0;return!1}var Qc,ed,td,od,Dv=L(()=>{"use strict";Qc="<<<<<<< \u3042\u306A\u305F",ed="||||||| \u5143\u306E\u72B6\u614B",td="=======",od=">>>>>>> SP \u6700\u65B0"});function Rn(e,t){return e==="lastBy"||e==="lastAt"?void 0:t}function _v(e){return JSON.stringify(e,Rn)}function Eu(e){return e.trim().startsWith("[")}function Rv(e){let t=e.trim();if(t===""||t==="[]")return!0;if(!t.startsWith("["))return!1;try{let o=ge(e);return o.length===0?!0:o.length===1&&o[0].kind==="p"&&o[0].inline?.length===0}catch{return!1}}function Ao(e,t){if(e===t)return!0;let o=Rv(e),n=Rv(t);if(o||n)return o&&n;if(!Eu(e)||!Eu(t))return e===t;try{let r=JSON.stringify(ge(e),Rn),a=JSON.stringify(ge(t),Rn);return r===a}catch{return e===t}}function Nv(e,t,o,n){if(!Eu(e))return e;let r=ge(e),a=ge(t),i=new Map;for(let l of a)i.set(l.id,l);let s=r.map(l=>{let c=i.get(l.id);if(c&&_v(c)===_v(l)){let d={...l};return c.lastBy!==void 0?d.lastBy=c.lastBy:delete d.lastBy,c.lastAt!==void 0?d.lastAt=c.lastAt:delete d.lastAt,d}return{...l,lastBy:o,lastAt:n}});return Je(s)}var Va=L(()=>{"use strict";W()});var Xa={};q(Xa,{saver:()=>re});function nd(e,t){let o=m.meta.myUserId||0;return Nv(e,t,o,Date.now())}function Ya(e){if(!e)return"";try{let t=JSON.parse(e);if(Array.isArray(t))return Xe(t)}catch{}return e}function TL(e){return Je(Ye(e))}function LL(e,t,o){let n=l=>{let c=(l||"").trim();return c===""||c.startsWith("[")};if(!n(e)||!n(t)||!n(o))return null;let r=ge(e),a=ge(t),i=ge(o);if(r.length===0&&a.length===0&&i.length===0)return null;let s=Pr(r,a,i);return s.conflicts.length>0?null:Je(s.merged)}function Ov(e,t,o){return t===o?t:t===e?o:t}var Tu,re,gt=L(()=>{"use strict";W();Dv();St();W();Jc();Va();j();Tu=class{constructor(){this._state={kind:"unloaded"};this._listeners=new Set;this._saveInFlight=null;this._generation=0}state(){return this._state}subscribe(t){this._listeners.add(t);try{t(this._state)}catch{}return()=>{this._listeners.delete(t)}}isDirty(t){let o=this._state;return o.kind==="dirty"||o.kind==="saving"?t==null||o.base.pageId===t:!1}isBusy(){let t=this._state.kind;return t==="saving"||t==="conflict"||t==="merging"}loadPage(t){this._generation++,this._saveInFlight=null,this._set({kind:"idle",base:t})}unload(){this._generation++,this._saveInFlight=null,this._set({kind:"unloaded"})}rebaseOnto(t,o,n){let r=this._state;if(r.kind!=="idle"&&r.kind!=="dirty"||(r.kind==="idle",r.base).pageId!==t.pageId)return;let i={pageId:t.pageId,body:t.body,title:t.title,etag:t.etag,modified:t.modified};Ao(o,i.body)&&n===i.title?this._set({kind:"idle",base:i}):this._set({kind:"dirty",base:i,body:o,title:n})}notifyEdit(t,o){let n=this._state;switch(n.kind){case"unloaded":return;case"idle":if(Ao(t,n.base.body)&&o===n.base.title)return;this._set({kind:"dirty",base:n.base,body:t,title:o});return;case"dirty":Ao(t,n.base.body)&&o===n.base.title?this._set({kind:"idle",base:n.base}):this._set({kind:"dirty",base:n.base,body:t,title:o});return;case"saving":this._set({kind:"saving",base:n.base,body:t,title:o});return;case"conflict":case"merging":{let r=n.conflict,a={pageId:r.pageId,body:r.base.body,title:r.base.title,etag:r.base.etag,modified:r.base.modified};Ao(t,a.body)&&o===a.title?this._set({kind:"idle",base:a}):this._set({kind:"dirty",base:a,body:t,title:o});return}}}save(){if(this._saveInFlight)return this._saveInFlight;let t=this._state;return t.kind!=="dirty"?Promise.resolve({ok:!1,reason:"noop"}):this._runSave(t.base,t.body,t.title)}_runSave(t,o,n){this._set({kind:"saving",base:t,body:o,title:n});let r=this._generation,a=nd(o,t.body),i=(async()=>{try{let s=await $a(t.pageId,n,a,t.etag);if(r!==this._generation)return s.ok?{ok:!0}:{ok:!1,reason:"conflict"};if(s.ok){let b=await dt(t.pageId).catch(()=>null);if(r!==this._generation)return{ok:!0};let h={pageId:t.pageId,body:a,title:n,etag:s.etag,modified:b?.modified||t.modified},v=this._state;return v.kind==="saving"&&v.body===o&&v.title===n?this._set({kind:"idle",base:h}):v.kind==="saving"&&this._set({kind:"dirty",base:h,body:v.body,title:v.title}),{ok:!0}}let l=await Ct(t.pageId).catch(()=>null),c=await dt(t.pageId).catch(()=>null);if(l===null||!c?.etag){let b=this._state,h=b.kind==="saving"?b.body:o,v=b.kind==="saving"?b.title:n;return this._set({kind:"dirty",base:t,body:h,title:v}),{ok:!1,reason:"error",error:new Error("remote-fetch-failed")}}let d=c.title??t.title,p=this._state,u=p.kind==="saving"?p.body:o,f=p.kind==="saving"?p.title:n,g=LL(t.body,u,l);if(g!==null){let b=Ov(t.title,f,d),h=nd(g,t.body),v=await $a(t.pageId,b,h,c.etag);if(r!==this._generation)return v.ok?{ok:!0}:{ok:!1,reason:"conflict"};if(v.ok){let x=await dt(t.pageId).catch(()=>null);return r!==this._generation?{ok:!0}:(this._set({kind:"idle",base:{pageId:t.pageId,body:h,title:b,etag:v.etag,modified:x?.modified||t.modified}}),{ok:!0})}}let y={pageId:t.pageId,ours:{body:u,title:f},base:{body:t.body,etag:t.etag,title:t.title,modified:t.modified},theirs:{body:l,etag:c.etag,modified:c.modified||"",title:d}};return this._set({kind:"conflict",conflict:y}),{ok:!1,reason:"conflict"}}catch(s){if(r!==this._generation)return{ok:!1,reason:"error",error:s};let l=this._state,c=l.kind==="saving"?l.body:o,d=l.kind==="saving"?l.title:n;return this._set({kind:"dirty",base:t,body:c,title:d}),{ok:!1,reason:"error",error:s}}finally{r===this._generation&&(this._saveInFlight=null)}})();return this._saveInFlight=i,i}async flush(){if(this._saveInFlight)try{await this._saveInFlight}catch{}if(this._state.kind==="dirty")try{await this.save()}catch{}}forceOverwrite(){if(this._saveInFlight)return this._saveInFlight;let t=this._state;if(t.kind!=="conflict"&&t.kind!=="merging")return Promise.resolve({ok:!1,reason:"noop"});let o=t.conflict,n=this._generation,r=nd(o.ours.body,o.base.body),a=(async()=>{try{let i=await $a(o.pageId,o.ours.title,r);if(n!==this._generation)return i.ok?{ok:!0}:{ok:!1,reason:"error",error:new Error("overwrite-failed")};if(i.ok){let s=await dt(o.pageId).catch(()=>null);if(n!==this._generation)return{ok:!0};let l={pageId:o.pageId,body:r,title:o.ours.title,etag:i.etag,modified:s?.modified||""};return this._set({kind:"idle",base:l}),{ok:!0}}return{ok:!1,reason:"error",error:new Error("overwrite-failed")}}catch(i){return{ok:!1,reason:"error",error:i}}finally{n===this._generation&&(this._saveInFlight=null)}})();return this._saveInFlight=a,a}acceptTheirs(){let t=this._state;t.kind!=="conflict"&&t.kind!=="merging"||(this._saveInFlight=null,this._set({kind:"unloaded"}))}cancelConflict(){let t=this._state;if(t.kind!=="conflict"&&t.kind!=="merging")return;let o=t.conflict,n={pageId:o.pageId,body:o.base.body,title:o.base.title,etag:o.base.etag,modified:o.base.modified};Ao(o.ours.body,n.body)&&o.ours.title===n.title?this._set({kind:"idle",base:n}):this._set({kind:"dirty",base:n,body:o.ours.body,title:o.ours.title})}startMerge(){let t=this._state;if(t.kind!=="conflict")return;let o=t.conflict,n=Iu(Ya(o.base.body),Ya(o.ours.body),Ya(o.theirs.body));this._set({kind:"merging",conflict:o,hunks:n.conflicts,rawMerged:n.merged,resolved:new Map})}setMergeChoice(t,o){let n=this._state;if(n.kind!=="merging")return;let r=new Map(n.resolved);r.set(t,o),this._set({...n,resolved:r})}computeMergedBody(){let t=this._state;if(t.kind!=="merging")return"";let o=t.rawMerged;for(let[n,r]of t.resolved)o=Av(o,n,r);return o}computeMergedBodyForSave(){return TL(this.computeMergedBody())}isMergeResolved(){let t=this._state;return t.kind!=="merging"?!1:t.hunks.length===0?!0:t.resolved.size<t.hunks.length?!1:!Bv(this.computeMergedBody())}applyMerge(){if(this._saveInFlight)return this._saveInFlight;let t=this._state;if(t.kind!=="merging")return Promise.resolve({ok:!1,reason:"noop"});if(!this.isMergeResolved())return Promise.resolve({ok:!1,reason:"error",error:new Error("\u672A\u89E3\u6C7A\u306E\u7AF6\u5408\u304C\u3042\u308A\u307E\u3059")});let o=this.computeMergedBodyForSave(),n=t.conflict,r=Ov(n.base.title,n.ours.title,n.theirs.title),a=nd(o,n.base.body),i=this._generation,s=(async()=>{try{let l=await $a(n.pageId,r,a,n.theirs.etag);if(i!==this._generation)return l.ok?{ok:!0}:{ok:!1,reason:"conflict"};if(l.ok){let u=await dt(n.pageId).catch(()=>null);if(i!==this._generation)return{ok:!0};let f={pageId:n.pageId,body:a,title:r,etag:l.etag,modified:u?.modified||""};return this._set({kind:"idle",base:f}),{ok:!0}}let c=await Ct(n.pageId).catch(()=>null),d=await dt(n.pageId).catch(()=>null);if(c===null||!d?.etag)return{ok:!1,reason:"error",error:new Error("remote-fetch-failed")};if(i!==this._generation)return{ok:!1,reason:"conflict"};let p={pageId:n.pageId,ours:{body:o,title:r},base:{body:n.theirs.body,etag:n.theirs.etag,title:n.theirs.title,modified:n.theirs.modified},theirs:{body:c,etag:d.etag,modified:d.modified||"",title:d.title??n.theirs.title}};return this._set({kind:"conflict",conflict:p}),{ok:!1,reason:"conflict"}}catch(l){return{ok:!1,reason:"error",error:l}}finally{i===this._generation&&(this._saveInFlight=null)}})();return this._saveInFlight=s,s}cancelMerge(){let t=this._state;t.kind==="merging"&&this._set({kind:"conflict",conflict:t.conflict})}async beginExternalMerge(t){let o=await Ct(t.pageId).catch(()=>null),n=await dt(t.pageId).catch(()=>null);if(o===null||!n?.etag)throw new Error("beginExternalMerge: remote-fetch-failed");let r={pageId:t.pageId,ours:{body:t.ourBody,title:t.title},base:{body:t.baseBody,etag:t.baseEtag,title:t.title,modified:""},theirs:{body:o,etag:n.etag,modified:n.modified||"",title:t.pageTitle}},a=t.baseBody??o,i=Iu(Ya(a),Ya(t.ourBody),Ya(o));this._set({kind:"merging",conflict:r,hunks:i.conflicts,rawMerged:i.merged,resolved:new Map})}_set(t){this._state=t;for(let o of this._listeners)try{o(t)}catch{}}},re=new Tu});function Lu(e){return e.trim().startsWith("[")}function Hv(e,t,o){if(!Lu(e)||!Lu(t)||!Lu(o))return{kind:"noop"};let n,r,a;try{n=ge(e),r=ge(t),a=ge(o)}catch{return{kind:"noop"}}let i=Pr(n,r,a);if(i.conflicts.length>0)return{kind:"conflict"};let s=Je(i.merged);return{kind:"merge",merged:i.merged,mergedBody:s,changed:!Ao(s,t)}}var Fv=L(()=>{"use strict";W();Jc();Va()});function ho(e,t){let o=e.blocks.findIndex(n=>n.id===t);return o<0?null:{idx:o,block:e.blocks[o]}}function Bo(e,t){return Su(e.blocks,t,[])}function Su(e,t,o){for(let n=0;n<e.length;n++){let r=e[n];if(r.id===t)return{path:[...o,n],block:r};if(r.kind==="callout"||r.kind==="quote"){let a=Su(r.children,t,[...o,n]);if(a)return a}else if(r.kind==="list")for(let a=0;a<r.items.length;a++){let i=Su(r.items[a],t,[...o,n,a]);if(i)return i}}return null}function Nn(e,t,o){if(t.length===0)return e;if(t.length===1){let l=t[0];if(l<0||l>=e.length)return e;let c=e.slice();return c[l]=o(e[l]),c}let[n,...r]=t;if(n<0||n>=e.length)return e;let a=e[n],i;if(a.kind==="callout"||a.kind==="quote")i={...a,children:Nn(a.children,r,o)};else if(a.kind==="list"){let[l,...c]=r;if(l<0||l>=a.items.length)return e;let d=a.items.slice();d[l]=Nn(a.items[l],c,o),i={...a,items:d}}else return e;let s=e.slice();return s[n]=i,s}function cn(e,t,o){let n=e.blocks.slice();return n[t]=o,{...e,blocks:n}}function zv(e,t,o){let n=e.blocks.slice();return n.splice(t,0,o),{...e,blocks:n}}function Dr(e,t,o){let n=Bo(e,t);if(!n)return e;let{block:r}=n;if(r.kind!=="p"&&r.kind!=="h1"&&r.kind!=="h2"&&r.kind!=="h3"&&r.kind!=="todo")return e;let a=Nn(e.blocks,n.path,i=>i.kind!=="p"&&i.kind!=="h1"&&i.kind!=="h2"&&i.kind!=="h3"&&i.kind!=="todo"?i:{...i,inline:o});return{...e,blocks:a}}function _r(e,t,o,n){if(n==="")return e;let r=Bo(e,t);if(!r)return e;let{block:a}=r;if(a.kind==="code"){let l=a.text.slice(0,o)+n+a.text.slice(o),c=Nn(e.blocks,r.path,d=>d.kind==="code"?{...d,text:l}:d);return{...e,blocks:c,selection:{kind:"caret",blockId:t,offset:o+n.length}}}if(!("inline"in a))return e;let i=ML(a.inline,o,n);return{...Dr(e,t,i),selection:{kind:"caret",blockId:t,offset:o+n.length}}}function Du(e,t,o){let n=Bo(e,t);if(!n)return e;let{block:r}=n;if(!("inline"in r))return e;let a=Le(r.inline,0,o),i=Le(r.inline,o,1/0),s=Le([...a,{kind:"br"},...i],0,1/0);return{...Dr(e,t,s),selection:{kind:"caret",blockId:t,offset:o+1}}}function Za(e,t,o,n){if(n===0)return e;let r=Bo(e,t);if(!r)return e;let{block:a}=r;if(a.kind==="code"){let d=n<0?Math.max(0,o+n):o,p=n<0?o:Math.min(a.text.length,o+n);if(d===p)return e;let u=a.text.slice(0,d)+a.text.slice(p);if(u===""){let g=Nn(e.blocks,r.path,()=>({id:a.id,kind:"p",inline:[]}));return{...e,blocks:g,selection:{kind:"caret",blockId:a.id,offset:0}}}let f=Nn(e.blocks,r.path,g=>g.kind==="code"?{...g,text:u}:g);return{...e,blocks:f,selection:{kind:"caret",blockId:t,offset:d}}}if(!("inline"in a))return e;let i=n<0?o+n:o,s=n<0?o:o+n;if(i===s)return e;let l=PL(a.inline,i,s);return{...Dr(e,t,l),selection:{kind:"caret",blockId:t,offset:i}}}function _u(e,t,o){let n=ho(e,t);if(n){let{idx:a,block:i}=n;return"inline"in i?SL(e,a,i,o):e}let r=Pu(e.blocks,t,o);return r?{...e,blocks:r.blocks,selection:{kind:"caret",blockId:r.newId,offset:0}}:e}function SL(e,t,o,n){if(!("inline"in o))return e;let r=Le(o.inline,0,n),a=Le(o.inline,n,1/0),i={...o,inline:r},s=Q(),l=Mu(o,s,a),c=cn(e,t,i);return c=zv(c,t+1,l),{...c,selection:{kind:"caret",blockId:s,offset:0}}}function Mu(e,t,o){return e.kind==="todo"?{id:t,kind:"todo",checked:!1,inline:o}:{id:t,kind:"p",inline:o}}function Pu(e,t,o){for(let n=0;n<e.length;n++){let r=e[n];if(r.kind==="list")for(let a=0;a<r.items.length;a++){let i=r.items[a],s=i.findIndex(c=>c.id===t);if(s>=0){let c=i[s];if(!("inline"in c))return null;let d=Le(c.inline,0,o),p=Le(c.inline,o,1/0),u=Q(),f={...c,inline:d},g=Mu(c,u,p),y=[...i.slice(0,s),f],b=[g,...i.slice(s+1)],h=[...r.items.slice(0,a),y,b,...r.items.slice(a+1)],v=e.slice();return v[n]={...r,items:h},{blocks:v,newId:u}}let l=Pu(i,t,o);if(l){let c=r.items.slice();c[a]=l.blocks;let d=e.slice();return d[n]={...r,items:c},{blocks:d,newId:l.newId}}}else if(r.kind==="callout"||r.kind==="quote"){let a=r.children.findIndex(s=>s.id===t);if(a>=0){let s=r.children[a];if(!("inline"in s))return null;let l=Le(s.inline,0,o),c=Le(s.inline,o,1/0),d=Q(),p={...s,inline:l},u=Mu(s,d,c),f=[...r.children.slice(0,a),p,u,...r.children.slice(a+1)],g=e.slice();return g[n]={...r,children:f},{blocks:g,newId:d}}let i=Pu(r.children,t,o);if(i){let s=e.slice();return s[n]={...r,children:i.blocks},{blocks:s,newId:i.newId}}}}return null}function dn(e,t,o){let n=Bo(e,t);if(!n)return e;let{block:r}=n;if(!("inline"in r))return e;let a=r.inline,i=Nn(e.blocks,n.path,()=>o==="todo"?{id:r.id,kind:"todo",checked:!1,inline:a}:{id:r.id,kind:o,inline:a});return{...e,blocks:i}}function Ru(e,t){let o=Bo(e,t);if(!o||o.block.kind!=="todo")return e;let n=Nn(e.blocks,o.path,r=>r.kind!=="todo"?r:{...r,checked:!r.checked});return{...e,blocks:n}}function bo(e){return Lt(e).length}function Le(e,t,o){if(t>=o)return[];let n=[],r=0;for(let a of e){let i=ad(a);if(r+i<=t){r+=i;continue}if(r>=o)break;let s=Math.max(0,t-r),l=Math.min(i,o-r);if(s===0&&l===i)n.push(a);else{let c=CL(a,s,l);c&&n.push(c)}r+=i}return ln(n)}function ML(e,t,o){return o===""?e:_s(e,t,o)}function _s(e,t,o){let n=0;for(let r=0;r<e.length;r++){let a=e[r],i=ad(a);if(t===n)return ln([...e.slice(0,r),{kind:"text",text:o},...e.slice(r)]);if(t<n+i){let s=t-n;if(a.kind==="bold"||a.kind==="italic"||a.kind==="strike")return[...e.slice(0,r),{...a,children:_s(a.children,s,o)},...e.slice(r+1)];if(a.kind==="link")return[...e.slice(0,r),{...a,children:_s(a.children,s,o)},...e.slice(r+1)];if(a.kind==="text")return ln([...e.slice(0,r),{kind:"text",text:a.text.slice(0,s)+o+a.text.slice(s)},...e.slice(r+1)]);if(a.kind==="code")return[...e.slice(0,r),{kind:"code",text:a.text.slice(0,s)+o+a.text.slice(s)},...e.slice(r+1)];let l=a.kind==="pagelink"?a.alias||a.pageId:a.kind==="dailylink"?a.alias||a.date:"",c=l.slice(0,s),d=l.slice(s),p=[];return c&&p.push({kind:"text",text:c}),p.push({kind:"text",text:o}),d&&p.push({kind:"text",text:d}),ln([...e.slice(0,r),...p,...e.slice(r+1)])}if(t===n+i){if(a.kind==="bold"||a.kind==="italic"||a.kind==="strike")return[...e.slice(0,r),{...a,children:_s(a.children,i,o)},...e.slice(r+1)];if(a.kind==="link")return[...e.slice(0,r),{...a,children:_s(a.children,i,o)},...e.slice(r+1)];if(a.kind==="text")return ln([...e.slice(0,r),{kind:"text",text:a.text+o},...e.slice(r+1)]);if(a.kind==="code")return[...e.slice(0,r),{kind:"code",text:a.text+o},...e.slice(r+1)]}n+=i}return ln([...e,{kind:"text",text:o}])}function PL(e,t,o){let n=Le(e,0,t),r=Le(e,o,1/0);return ln([...n,...r])}function ad(e){switch(e.kind){case"text":return e.text.length;case"code":return e.text.length;case"br":return 1;case"pagelink":return(e.alias||e.pageId).length;case"dailylink":return(e.alias||e.date).length;case"bold":case"italic":case"strike":return e.children.reduce((t,o)=>t+ad(o),0);case"link":return e.children.reduce((t,o)=>t+ad(o),0)}}function CL(e,t,o){switch(e.kind){case"text":return{kind:"text",text:e.text.slice(t,o)};case"code":return{kind:"code",text:e.text.slice(t,o)};case"br":return null;case"pagelink":{let r=(e.alias||e.pageId).slice(t,o);return r?{kind:"text",text:r}:null}case"dailylink":{let r=(e.alias||e.date).slice(t,o);return r?{kind:"text",text:r}:null}case"bold":case"italic":case"strike":{let n=Le(e.children,t,o);return n.length===0?null:{kind:e.kind,children:n}}case"link":{let n=Le(e.children,t,o);return n.length===0?null:{kind:"link",href:e.href,children:n}}}}function ln(e){let t=[];for(let o of e){let n=t[t.length-1];if(n&&o.kind==="text"&&n.kind==="text"){t[t.length-1]={kind:"text",text:n.text+o.text};continue}if(n&&o.kind==="code"&&n.kind==="code"){t[t.length-1]={kind:"code",text:n.text+o.text};continue}if(n&&(o.kind==="bold"||o.kind==="italic"||o.kind==="strike")&&n.kind===o.kind){t[t.length-1]={kind:o.kind,children:ln([...n.children,...o.children])};continue}if(n&&o.kind==="link"&&n.kind==="link"&&n.href===o.href){t[t.length-1]={kind:"link",href:o.href,children:ln([...n.children,...o.children])};continue}t.push(o)}return t}function jv(e,t,o,n,r){if(o>=n)return e;let a=Bo(e,t);if(!a)return e;let{block:i}=a;if(!("inline"in i))return e;let s=Le(i.inline,0,o),l=Le(i.inline,o,n),c=Le(i.inline,n,1/0),d=AL(l,r),p;d?p=_L(l,r):p=DL(l,r);let u=Le([...s,...p,...c],0,1/0);return Dr(e,t,u)}function AL(e,t){return e.length===0?!1:e.every(o=>BL(o,t))}function BL(e,t){return t==="code"?e.kind==="code":e.kind===t}function DL(e,t){if(t==="code"){let o=Lt(e);return o?[{kind:"code",text:o}]:[]}return e.length===0?[]:[{kind:t,children:e}]}function _L(e,t){let o=[];for(let n of e){if(t==="code"&&n.kind==="code"){o.push({kind:"text",text:n.text});continue}if(n.kind===t&&(n.kind==="bold"||n.kind==="italic"||n.kind==="strike")){o.push(...n.children);continue}o.push(n)}return qv(o)}function qv(e){let t=[];for(let o of e){let n=t[t.length-1];o.kind==="text"&&n&&n.kind==="text"?t[t.length-1]={kind:"text",text:n.text+o.text}:t.push(o)}return t}function $v(e,t,o,n,r){if(o>=n)return e;let a=Bo(e,t);if(!a)return e;let{block:i}=a;if(!("inline"in i))return e;let s=Le(i.inline,0,o),l=Cu(Le(i.inline,o,n)),c=Le(i.inline,n,1/0),d=r&&l.length>0?[{kind:"link",href:r,children:l}]:l,p=Le([...s,...d,...c],0,1/0);return Dr(e,t,p)}function Cu(e){let t=[];for(let o of e){if(o.kind==="link"){t.push(...Cu(o.children));continue}if(o.kind==="bold"||o.kind==="italic"||o.kind==="strike"){t.push({kind:o.kind,children:Cu(o.children)});continue}t.push(o)}return qv(t)}function Kv(e,t,o,n){if(!n)return e;let r=Bo(e,t);if(!r)return e;let{block:a}=r;if(!("inline"in a))return e;let i=Le(a.inline,0,o),s=Le(a.inline,o,1/0),l={kind:"link",href:n,children:[{kind:"text",text:n}]},c=Le([...i,l,...s],0,1/0);return{...Dr(e,t,c),selection:{kind:"caret",blockId:t,offset:o+n.length}}}function Qa(e,t,o,n,r){let a=Bo(e,t);if(!a)return e;let{block:i}=a;if(!("inline"in i))return e;let s=Le(i.inline,0,o),l=Le(i.inline,o,1/0),c=r?{kind:"pagelink",pageId:n,alias:r}:{kind:"pagelink",pageId:n},d=[...s,c,...l],p=Dr(e,t,d),u=(r||n).length;return{...p,selection:{kind:"caret",blockId:t,offset:o+u}}}function Wv(e,t,o){let n=ho(e,t);if(!n)return e;let r=e.blocks.slice(),[a]=r.splice(n.idx,1),i=Math.max(0,Math.min(o,r.length));return r.splice(i,0,a),{...e,blocks:r}}function ei(e,t,o){let n=ho(e,t);return n?{...zv(e,n.idx+1,o),selection:{kind:"caret",blockId:o.id,offset:0}}:{blocks:[...e.blocks,o],selection:{kind:"caret",blockId:o.id,offset:0}}}function rt(e=""){return{id:Q(),kind:"p",inline:Db(e)}}function Rs(e="",t=""){return{id:Q(),kind:"code",text:e,lang:t}}function Ns(){return{id:Q(),kind:"rule"}}function Os(e="\u{1F4A1}",t=[rt("")]){return{id:Q(),kind:"callout",emoji:e,children:t}}function Hs(e=[[rt("")]]){return{id:Q(),kind:"list",ordered:!1,items:e}}function Fs(e=[[rt("")]]){return{id:Q(),kind:"list",ordered:!0,items:e}}function Ja(e,t,o){let n=e.slice();return n[t]=o,n}function Gv(e,t){let o=Au(e.blocks,t);return o?{...e,blocks:o}:e}function Au(e,t){for(let o=0;o<e.length;o++){let n=e[o];if(n.kind==="list")for(let r=0;r<n.items.length;r++){let a=Au(n.items[r],t);if(a)return Ja(e,o,{...n,items:Vv(n.items,r,a)});if(n.items[r].some(i=>i.id===t))return r===0?null:Ja(e,o,RL(n,r))}else if(n.kind==="quote"||n.kind==="callout"){let r=Au(n.children,t);if(r)return Ja(e,o,{...n,children:r})}}return null}function RL(e,t){let o=e.items.slice(),n=o[t],r=o[t-1].slice(),a=r[r.length-1];return a&&a.kind==="list"&&a.ordered===e.ordered?r[r.length-1]={...a,items:[...a.items,n]}:r.push({id:Q(),kind:"list",ordered:e.ordered,items:[n]}),o[t-1]=r,o.splice(t,1),{...e,items:o}}function id(e,t){let o=Bu(e.blocks,t);return o?{...e,blocks:o}:e}function Bu(e,t){for(let o=0;o<e.length;o++){let n=e[o];if(n.kind==="list")for(let r=0;r<n.items.length;r++){let a=n.items[r];for(let s=0;s<a.length;s++){let l=a[s];if(l.kind==="list"){let c=l.items.findIndex(d=>d.some(p=>p.id===t));if(c>=0)return Ja(e,o,NL(n,r,s,l,c))}}let i=Bu(a,t);if(i)return Ja(e,o,{...n,items:Vv(n.items,r,i)})}else if(n.kind==="quote"||n.kind==="callout"){let r=Bu(n.children,t);if(r)return Ja(e,o,{...n,children:r})}}return null}function NL(e,t,o,n,r){let a=n.items[r],i=n.items.slice();i.splice(r,1);let s=e.items[t].slice();i.length===0?s.splice(o,1):s[o]={...n,items:i};let l=e.items.slice();return l[t]=s,l.splice(t+1,0,a),{...e,items:l}}function Vv(e,t,o){let n=e.slice();return n[t]=o,n}function Us(e=[rt("")]){return{id:Q(),kind:"quote",children:e}}function Yv(e,t=""){return{id:Q(),kind:"image",src:e,alt:t}}function Xv(e){return{id:Q(),kind:"email",...e}}function OL(e){if("inline"in e&&Array.isArray(e.inline))return e.inline;if(e.kind==="quote"||e.kind==="callout"){let t=e.children?.[0];if(t&&"inline"in t)return t.inline}if(e.kind==="list"){let t=e.items?.[0]?.[0];if(t&&"inline"in t)return t.inline}return e.kind==="code"?e.text?[{kind:"text",text:e.text}]:[]:[]}function rd(e){return{id:Q(),kind:"p",inline:e}}function HL(e){return e.kind==="list"?e.items[0]?.[0]?.id??null:e.kind==="callout"||e.kind==="quote"?e.children[0]?.id??null:"inline"in e||e.kind==="code"?e.id:null}function Jv(e,t,o){let n=e.blocks.findIndex(c=>c.id===t);if(n<0)return e;let r=e.blocks[n];if((o==="p"||o==="h1"||o==="h2"||o==="h3"||o==="todo")&&"inline"in r)return dn(e,t,o);let a=OL(r),i;switch(o){case"p":i={id:Q(),kind:"p",inline:a};break;case"h1":case"h2":case"h3":i={id:Q(),kind:o,inline:a};break;case"todo":i={id:Q(),kind:"todo",checked:!1,inline:a};break;case"ul":i=Hs([[rd(a)]]);break;case"ol":i=Fs([[rd(a)]]);break;case"quote":i=Us([rd(a)]);break;case"callout":i=Os("\u{1F4A1}",[rd(a)]);break;case"pre":i=Rs(Lt(a));break;case"hr":i=Ns();break}let s=e.blocks.slice();s[n]=i;let l=HL(i);return{...e,blocks:s,selection:l?{kind:"caret",blockId:l,offset:0}:e.selection}}function zs(e,t,o){let n=ho(e,t);if(!n||n.block.kind!=="table")return e;let r=n.block,a=r.rows[0]?.length||0,i=[];for(let l=0;l<a;l++)i.push([]);let s=r.rows.slice();return s.splice(Math.max(0,Math.min(o,s.length)),0,i),cn(e,n.idx,{...r,rows:s})}function sd(e,t,o){let n=ho(e,t);if(!n||n.block.kind!=="table")return e;let r=n.block,a=r.rows[0]?.length||0,i=Math.max(0,Math.min(o,a)),s=r.rows.map(l=>{let c=l.slice();return c.splice(i,0,[]),c});return cn(e,n.idx,{...r,rows:s})}function Nu(e,t,o){let n=ho(e,t);if(!n||n.block.kind!=="table")return e;let r=n.block;if(r.rows.length<=1||o<0||o>=r.rows.length)return e;let a=r.rows.slice();return a.splice(o,1),cn(e,n.idx,{...r,rows:a})}function Ou(e,t,o){let n=ho(e,t);if(!n||n.block.kind!=="table")return e;let r=n.block,a=r.rows[0]?.length||0;if(a<=1||o<0||o>=a)return e;let i=r.rows.map(s=>{let l=s.slice();return l.splice(o,1),l});return cn(e,n.idx,{...r,rows:i})}function Zv(e,t,o,n,r){let a=ho(e,t);if(!a||a.block.kind!=="table")return e;let i=a.block;if(o<0||o>=i.rows.length)return e;let s=i.rows[o];if(n<0||n>=s.length)return e;let l=s.slice();l[n]=r;let c=i.rows.slice();return c[o]=l,cn(e,a.idx,{...i,rows:c})}function Hu(e){let t=e.rows.length,o=e.rows[0]?.length||0,n=[];for(let r=0;r<t;r++){let a=[];for(let i=0;i<o;i++)a.push(e.cellBg?.[r]?.[i]||"");n.push(a)}return n}function Qv(e,t,o,n,r){let a=ho(e,t);if(!a||a.block.kind!=="table")return e;let i=a.block;if(o<0||o>=i.rows.length||n<0||n>=(i.rows[0]?.length||0))return e;let s=Hu(i);return s[o][n]=r,cn(e,a.idx,{...i,cellBg:s})}function ey(e,t,o,n){let r=ho(e,t);if(!r||r.block.kind!=="table")return e;let a=r.block;if(o<0||o>=a.rows.length)return e;let i=Hu(a);for(let s=0;s<i[o].length;s++)i[o][s]=n;return cn(e,r.idx,{...a,cellBg:i})}function ty(e,t,o,n){let r=ho(e,t);if(!r||r.block.kind!=="table")return e;let a=r.block;if(o<0||o>=(a.rows[0]?.length||0))return e;let i=Hu(a);for(let s=0;s<i.length;s++)i[s][o]=n;return cn(e,r.idx,{...a,cellBg:i})}function oy(e=2,t=3){let o=[];for(let n=0;n<e;n++){let r=[];for(let a=0;a<t;a++)r.push([]);o.push(r)}return{id:Q(),kind:"table",hrow:!0,hcol:!1,rows:o}}function ny(e){return{id:Q(),kind:"linkdb",dbId:e,view:"table",filter:"",sort:""}}var Uv,Do=L(()=>{"use strict";Qo();Uv={blocks:[],selection:null}});function FL(){let e=La.get(),t=e?parseInt(e,10):cs;return!isFinite(t)||t<0?cs:t}function Fu(){js&&(clearTimeout(js),js=null)}function UL(e){switch(e.kind){case"dirty":{Fu();let t=FL();if(t<=0)return;js=setTimeout(()=>{js=null,re.save().catch(()=>{})},t);return}case"idle":case"unloaded":case"saving":case"conflict":case"merging":Fu();return}}function ay(){ry||(ry=!0,re.subscribe(UL))}function iy(){Fu()}var js,ry,Uu=L(()=>{"use strict";gt();He();ve();js=null;ry=!1});var Gu={};q(Gu,{applyColOrder:()=>ju,applyRowOrder:()=>dd,loadColOrder:()=>ld,loadGanttConfig:()=>$u,loadRowOrder:()=>cd,moveItem:()=>Wu,saveColOrder:()=>zu,saveGanttConfig:()=>Ku,saveRowOrder:()=>qu});function ld(e){let t=xc(e).get();return t.length===0?null:t}function zu(e,t){xc(e).set(t)}function ju(e,t){let o=ld(t);if(!o||o.length===0)return e;let n=new Map(e.map(a=>[a.InternalName,a])),r=[];for(let a of o){let i=n.get(a);i&&(r.push(i),n.delete(a))}for(let a of n.values())r.push(a);return r}function cd(e){let t=wc(e).get();return t.length===0?null:t}function qu(e,t){wc(e).set(t)}function dd(e,t){let o=cd(t);if(!o||o.length===0)return e;let n=new Map(e.map(a=>[a.Id,a])),r=[];for(let a of o){let i=n.get(a);i&&(r.push(i),n.delete(a))}for(let a of n.values())r.push(a);return r}function $u(e){return kc(e,null).get()}function Ku(e,t){kc(e,t).set(t)}function Wu(e,t,o){if(t===o||t<0||t>=e.length)return e.slice();let n=e.slice(),[r]=n.splice(t,1),a=o>t?o-1:o;return n.splice(a,0,r),n}var qs=L(()=>{"use strict";ve()});function sy(e){return ur.get()[e]||{}}function jL(e,t){let o=ur.get(),n={rows:{...o[e]?.rows||{}},cols:{...o[e]?.cols||{}}};t(n),o[e]=n,ur.set(o)}function ly(e,t,o){jL(e,n=>{o?n.rows[String(t)]=o:delete n.rows[String(t)]})}function cy(e,t,o){return e.cols?.[o]||e.rows?.[String(t)]||""}function dy(e,t){let o=ur.get(),n=o[e];if(!n?.rows)return;let r=new Set(t.map(String)),a=!1;for(let i of Object.keys(n.rows))r.has(i)||(delete n.rows[i],a=!0);a&&ur.set(o)}function my(e,t,o){document.getElementById("memola-dbcolor-pop")?.remove();let n=document.createElement("div");n.id="memola-dbcolor-pop",n.className="memola-dbcolor-pop",n.style.left=e+window.scrollX+"px",n.style.top=t+window.scrollY+"px";for(let a of zL){let i=document.createElement("button");i.className="memola-dbcolor-sw"+(a.value?"":" none"),i.title=a.label,a.value&&(i.style.background=a.value),i.addEventListener("mousedown",s=>{s.preventDefault(),s.stopPropagation(),o(a.value),n.remove()}),n.appendChild(i)}(document.getElementById("memola-overlay")||document.body).appendChild(n);let r=a=>{n.contains(a.target)||(n.remove(),document.removeEventListener("mousedown",r,!0))};setTimeout(()=>document.addEventListener("mousedown",r,!0),0)}var zL,Vu=L(()=>{"use strict";ve();zL=[{label:"\u306A\u3057",value:""},{label:"\u30B0\u30EC\u30FC",value:"#f1f1ef"},{label:"\u8D64",value:"#fdebec"},{label:"\u30AA\u30EC\u30F3\u30B8",value:"#fbecdd"},{label:"\u9EC4",value:"#fbf3db"},{label:"\u7DD1",value:"#ddedea"},{label:"\u9752",value:"#ddebf1"},{label:"\u7D2B",value:"#eae4f2"},{label:"\u30D4\u30F3\u30AF",value:"#f4dfeb"}]});var md={};q(md,{hideBulkBar:()=>VL,renderBulkBar:()=>On});function qL(){if(Nr&&document.body.contains(Nr))return Nr;let e=document.getElementById("memola-overlay")||document.body,t=document.createElement("div");return t.id="memola-db-bulkbar",t.className="memola-db-bulkbar",t.innerHTML='<span class="memola-db-bulkbar-count">0 \u4EF6\u9078\u629E</span><button class="memola-db-bulkbar-btn" data-act="color">\u8272</button><button class="memola-db-bulkbar-btn" data-act="dup">\u8907\u88FD</button><button class="memola-db-bulkbar-btn danger" data-act="del">\u524A\u9664</button><button class="memola-db-bulkbar-btn ghost" data-act="clr">\u89E3\u9664</button>',e.appendChild(t),t.addEventListener("click",$L),Nr=t,t}function $L(e){let t=e.target,o=t.dataset?.act;if(o){if(o==="clr"){m.dbSelected.clear(),On(),Fe();return}if(o==="del")KL();else if(o==="dup")WL();else if(o==="color"){let n=Array.from(m.dbSelected);if(n.length===0)return;let r=t.getBoundingClientRect();my(r.left,r.bottom+4,a=>{for(let i of n)ly(m.dbList,i,a);Fe()})}}}async function KL(){let e=Array.from(m.dbSelected);if(e.length!==0&&confirm(`${e.length} \u4EF6\u306E\u884C\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F`)){_(!0,"\u524A\u9664\u4E2D...");try{for(let t of e)await Or(m.dbList,t).catch(o=>{k("\u524A\u9664\u5931\u6557 (id="+t+"): "+o.message,"err")});m.dbSelected.clear(),On(),Fe(),k(`${e.length} \u4EF6\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u2318Z \u3067\u5FA9\u5143\u53EF\u80FD\uFF09`)}finally{_(!1)}}}async function WL(){let e=Array.from(m.dbSelected);if(e.length!==0){_(!0,"\u8907\u88FD\u4E2D...");try{let{getListFields:t}=await Promise.resolve().then(()=>(De(),mo)),o=await t(m.dbList),n=new Set(o.map(s=>s.InternalName)),r=0,a=[],{getRowBody:i}=await Promise.resolve().then(()=>(W(),qe));for(let s of e){let l=m.dbItems.find(d=>d.Id===s);if(!l)continue;let c={};for(let d of Object.keys(l)){if(!n.has(d))continue;let p=l[d];p!=null&&typeof p!="object"&&(typeof p=="string"&&p.trim()===""||(c[d]=p))}c.Title||(c.Title=l.Title||"\u7121\u984C");try{let d=await i(m.dbList,s).catch(()=>""),p=await Ks(m.dbList,c,d||void 0);m.dbItems.push(p),r++}catch(d){a.push(`id=${s}: ${d.message}`)}}m.dbSelected.clear(),On(),Fe(),a.length===0?k(`${r} \u4EF6\u8907\u88FD\u3057\u307E\u3057\u305F`):r===0?k("\u8907\u88FD\u5931\u6557: "+a[0],"err"):k(`${r} \u4EF6\u6210\u529F / ${a.length} \u4EF6\u5931\u6557 (${a[0]})`,"err"),a.length>0&&console.warn("[Memola duplicate errors]",a)}finally{_(!1)}}}function Rr(){let e=Nr;if(!e||!e.classList.contains("on"))return;let t=document.getElementById("memola-db-tb");if(!t)return;let o=t.getBoundingClientRect(),n=e.offsetHeight||44;e.style.top=Math.max(8,o.top-n-8)+"px",e.style.left=o.left+o.width/2+"px"}function Yu(e){if(m.dbSelected.size===0)return;let t=e.target;t&&(t.closest(".memola-db-bulkbar")||t.closest(".memola-cb")||t.closest("#memola-row-handle")||e.shiftKey||GL())}function GL(){m.dbSelected.clear(),document.querySelectorAll(".memola-card-sel, .memola-tr-sel").forEach(t=>{t.classList.remove("memola-card-sel","memola-tr-sel")}),document.querySelectorAll("#memola-dt .memola-cb").forEach(t=>{t.checked=!1,t.indeterminate=!1});let e=document.getElementById("memola-dt");e&&e.classList.remove("memola-has-sel"),On()}function On(){let e=qL(),t=m.dbSelected.size,o=e.querySelector(".memola-db-bulkbar-count");o&&(o.textContent=t+" \u4EF6\u9078\u629E");let n=t>0&&m.currentType==="database";e.classList.toggle("on",n),n?(requestAnimationFrame(Rr),window.addEventListener("scroll",Rr,!0),window.addEventListener("resize",Rr),document.addEventListener("mousedown",Yu,!0)):(window.removeEventListener("scroll",Rr,!0),window.removeEventListener("resize",Rr),document.removeEventListener("mousedown",Yu,!0))}function VL(){Nr&&Nr.classList.remove("on"),window.removeEventListener("scroll",Rr,!0),window.removeEventListener("resize",Rr),document.removeEventListener("mousedown",Yu,!0)}var Nr,$s=L(()=>{"use strict";j();le();K();_o();Vu();Nr=null});var pd={};q(pd,{openItem:()=>rS,renderActiveView:()=>nS,renderCalendarView:()=>oi,renderGalleryView:()=>by,renderGanttView:()=>Ju,renderListView:()=>hy});function Gs(e,t){let o=e[t];return o==null?"":String(o)}function fy(e,t,o,n){if(!pn())return;let r=n||e;r.draggable=!0;let a="text/memola-row";r.addEventListener("dragstart",i=>{if(!i.dataTransfer)return;i.dataTransfer.effectAllowed="move",i.dataTransfer.setData(a,String(t.Id));let s=m.dbSelected.has(t.Id)?Array.from(m.dbSelected):[t.Id];document.querySelectorAll("[data-id]").forEach(l=>{let c=parseInt(l.dataset.id||"0",10);s.indexOf(c)>=0&&l.classList.add("memola-item-dragging")})}),r.addEventListener("dragend",()=>{document.querySelectorAll(".memola-item-dragging").forEach(i=>i.classList.remove("memola-item-dragging"))}),e.addEventListener("dragover",i=>{let s=i.dataTransfer;if(!s)return;i.preventDefault(),s.dropEffect="move";let l=e.getBoundingClientRect(),c=o==="y"?i.clientY>l.top+l.height/2:i.clientX>l.left+l.width/2;e.classList.toggle("memola-item-drop-before",!c),e.classList.toggle("memola-item-drop-after",c)}),e.addEventListener("dragleave",()=>{e.classList.remove("memola-item-drop-before","memola-item-drop-after")}),e.addEventListener("drop",i=>{let s=i.dataTransfer;if(!s)return;let l=s.getData(a);if(!l)return;i.preventDefault();let c=e.getBoundingClientRect(),d=o==="y"?i.clientY>c.top+c.height/2:i.clientX>c.left+c.width/2;e.classList.remove("memola-item-drop-before","memola-item-drop-after");let p=parseInt(l,10),u=m.dbSelected.has(p)?Array.from(m.dbSelected):[p];u.indexOf(t.Id)>=0||Hn(u,t.Id,d)})}function gy(e,t){let o=document.createElement("div");o.className="memola-rowctl";let n=document.createElement("span");n.className="memola-rowctl-handle",n.title="\u30C9\u30E9\u30C3\u30B0\u3057\u3066\u4E26\u3079\u66FF\u3048",n.innerHTML='<svg viewBox="0 0 10 16" width="10" height="16" fill="currentColor" style="pointer-events:none"><circle cx="2" cy="3" r="1.3"/><circle cx="2" cy="8" r="1.3"/><circle cx="2" cy="13" r="1.3"/><circle cx="8" cy="3" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="8" cy="13" r="1.3"/></svg>';let r=document.createElement("input");return r.type="checkbox",r.className="memola-cb",r.checked=m.dbSelected.has(e.Id),r.addEventListener("click",a=>a.stopPropagation()),r.addEventListener("change",()=>{r.checked?m.dbSelected.add(e.Id):m.dbSelected.delete(e.Id),Promise.resolve().then(()=>($s(),md)).then(a=>a.renderBulkBar()),t?.()}),o.appendChild(n),o.appendChild(r),o}function hy(){let e=I("list-view");e.innerHTML="",m.dbSelected.size>0?e.classList.add("memola-has-sel"):e.classList.remove("memola-has-sel");let t=m.dbFields.filter(o=>[2,4,6,8,9].includes(o.FieldTypeKind)).slice(0,4);jt().forEach(o=>{let n=document.createElement("div");n.className="memola-lv-row",n.dataset.id=String(o.Id);let r=gy(o,()=>{n.classList.toggle("memola-card-sel",m.dbSelected.has(o.Id)),m.dbSelected.size>0?e.classList.add("memola-has-sel"):e.classList.remove("memola-has-sel")});n.appendChild(r);let a=document.createElement("div");a.className="memola-lv-body";let i=document.createElement("div");i.className="memola-lv-title",i.textContent=o.Title||"(\u7121\u984C)",a.appendChild(i);let s=document.createElement("div");s.className="memola-lv-sub",s.innerHTML=t.filter(c=>c.InternalName!=="Title").map(c=>'<span class="memola-lv-field">'+M(c.Title)+": "+M(Gs(o,c.InternalName))+"</span>").join(""),a.appendChild(s),n.appendChild(a),n.appendChild(vo(o)),m.dbSelected.has(o.Id)&&n.classList.add("memola-card-sel"),Fn(n,o.Id);let l=r.querySelector(".memola-rowctl-handle")||void 0;fy(n,o,"y",l),e.appendChild(n)})}function by(){let e=I("gallery-view");e.innerHTML="";let t=m.dbFields.filter(o=>[2,4,6,8,9].includes(o.FieldTypeKind));jt().forEach(o=>{let n=document.createElement("div");n.className="memola-gv-card",m.dbSelected.has(o.Id)&&n.classList.add("memola-card-sel"),n.dataset.id=String(o.Id),n.draggable=pn(),n.innerHTML='<div class="memola-gv-cover">'+(o.Title||"?").slice(0,1)+'</div><div class="memola-gv-title">'+M(o.Title||"(\u7121\u984C)")+'</div><div class="memola-gv-meta">'+t.filter(r=>r.InternalName!=="Title").slice(0,3).map(r=>'<div class="memola-gv-prop">'+M(r.Title)+": "+M(Gs(o,r.InternalName))+"</div>").join("")+"</div>",n.appendChild(vo(o)),Fn(n,o.Id),Vs(n,o.Id),e.appendChild(n)}),pn()&&YL(e)}function YL(e){if(e.dataset.dropWired==="1")return;e.dataset.dropWired="1";function t(o,n){let r=Array.from(e.querySelectorAll(".memola-gv-card"));if(r.length===0)return null;let a=r[0],i=1/0;for(let c of r){let d=c.getBoundingClientRect(),p=n>=d.top&&n<=d.bottom,u=Math.abs(o-(d.left+d.width/2)),f=(p?0:1e6)+u;f<i&&(i=f,a=c)}let s=a.getBoundingClientRect(),l=o>s.left+s.width/2;return{card:a,placeAfter:l}}e.addEventListener("dragover",o=>{let n=o.dataTransfer;if(!n)return;o.preventDefault(),n.dropEffect="move";let r=t(o.clientX,o.clientY);if(!r){Ws();return}JL(r.card,r.placeAfter)}),e.addEventListener("dragleave",o=>{let n=o.relatedTarget;(!n||!e.contains(n))&&Ws()}),e.addEventListener("drop",o=>{let n=o.dataTransfer;if(!n){Ws();return}let r=n.getData("text/memola-kb")||n.getData("text/plain");if(!r){Ws();return}o.preventDefault(),Ws();let a=parseInt(r,10);if(!a)return;let i=m.dbSelected.has(a)?Array.from(m.dbSelected):[a],s=t(o.clientX,o.clientY);if(!s)return;let l=parseInt(s.card.dataset.id||"0",10);!l||i.indexOf(l)>=0||Hn(i,l,s.placeAfter)})}function XL(){let e=document.getElementById("memola-overlay")||document.body;if(ti&&e.contains(ti))return ti;let t=document.createElement("div");return t.className="memola-card-drop-line vertical",e.appendChild(t),ti=t,t}function JL(e,t){let o=e.getBoundingClientRect(),n=XL();n.style.top=o.top+"px",n.style.height=o.height+"px",n.style.left=(t?o.right:o.left)-1+"px",n.style.width="2px",n.classList.add("on")}function Ws(){ti&&ti.classList.remove("on"),document.querySelectorAll(".memola-card-drop-line").forEach(e=>{e.classList.remove("on")})}function ZL(e){return Ic(e).get()||null}function QL(e,t){Ic(e).set(t)}function uy(e){return e<10?"0"+e:String(e)}function Xu(e){return e.getFullYear()+"-"+uy(e.getMonth()+1)+"-"+uy(e.getDate())}function oi(){let e=I("calendar-view");e.innerHTML="";let t=m.dbFields.filter(E=>E.FieldTypeKind===4);if(t.length===0){e.innerHTML='<div class="memola-altview-empty">\u65E5\u4ED8\u5217\u304C\u3042\u308A\u307E\u305B\u3093</div>';return}py!==m.dbList&&(py=m.dbList,zt=null,mn=null);let o=new Date;(zt==null||mn==null)&&(zt=o.getFullYear(),mn=o.getMonth());let n=ZL(m.dbList),r=n&&t.find(E=>E.InternalName===n)||t[0],a=zt,i=mn,s=new Date(a,i,1),l=new Date(a,i+1,0),c=s.getDay(),d=l.getDate(),p={};jt().forEach(E=>{var P;let B=Gs(E,r.InternalName);if(!B)return;let U=new Date(B);isNaN(U.getTime())||(p[P=Xu(U)]||(p[P]=[])).push(E)});let u=document.createElement("div");u.className="memola-cal";let f=document.createElement("div");f.className="memola-cal-head";let g=document.createElement("div");g.className="memola-cal-nav";let y=(E,B,U)=>{let P=document.createElement("button");return P.type="button",P.className="memola-cal-nav-btn",P.textContent=E,P.title=B,P.addEventListener("click",()=>{U(),oi()}),P};g.appendChild(y("\xAB","\u524D\u5E74",()=>{zt=(zt??o.getFullYear())-1})),g.appendChild(y("\u2039","\u524D\u6708",()=>{let E=zt??o.getFullYear(),B=(mn??o.getMonth())-1;B<0&&(B=11,E--),zt=E,mn=B})),g.appendChild(y("\u4ECA\u65E5","\u4ECA\u65E5\u306B\u623B\u308B",()=>{zt=o.getFullYear(),mn=o.getMonth()})),g.appendChild(y("\u203A","\u7FCC\u6708",()=>{let E=zt??o.getFullYear(),B=(mn??o.getMonth())+1;B>11&&(B=0,E++),zt=E,mn=B})),g.appendChild(y("\xBB","\u7FCC\u5E74",()=>{zt=(zt??o.getFullYear())+1})),f.appendChild(g);let b=document.createElement("div");b.className="memola-cal-title",b.textContent=a+"\u5E74 "+(i+1)+"\u6708",f.appendChild(b);let h=document.createElement("div");if(h.className="memola-cal-dfbox",t.length>1){let E=document.createElement("span");E.textContent="\u65E5\u4ED8\u5217",h.appendChild(E);let B=document.createElement("select");B.className="memola-cal-dfsel";for(let U of t){let P=document.createElement("option");P.value=U.InternalName,P.textContent=U.Title,U.InternalName===r.InternalName&&(P.selected=!0),B.appendChild(P)}B.addEventListener("change",()=>{QL(m.dbList,B.value),oi()}),h.appendChild(B)}else{let E=document.createElement("span");E.className="memola-cal-dfsingle",E.textContent="\u65E5\u4ED8\u5217: "+r.Title,h.appendChild(E)}f.appendChild(h),u.appendChild(f);let v=document.createElement("div");v.className="memola-cal-grid memola-cal-dayhead",["\u65E5","\u6708","\u706B","\u6C34","\u6728","\u91D1","\u571F"].forEach(E=>{let B=document.createElement("div");B.className="memola-cal-cell",B.textContent=E,v.appendChild(B)}),u.appendChild(v);let x=document.createElement("div");x.className="memola-cal-grid";for(let E=0;E<c;E++){let B=document.createElement("div");B.className="memola-cal-cell memola-cal-blank",x.appendChild(B)}for(let E=1;E<=d;E++){let B=new Date(a,i,E),U=document.createElement("div");U.className="memola-cal-cell memola-cal-day",U.dataset.date=Xu(B),a===o.getFullYear()&&i===o.getMonth()&&E===o.getDate()&&U.classList.add("today");let P=document.createElement("div");P.className="memola-cal-num",P.textContent=String(E),U.appendChild(P);let O=Xu(B);(p[O]||[]).forEach(D=>{let H=document.createElement("div");H.className="memola-cal-event",H.draggable=!0,H.dataset.id=String(D.Id),m.dbSelected.has(D.Id)&&H.classList.add("memola-card-sel");let X=document.createElement("span");X.className="memola-cal-event-title",X.textContent=D.Title||"(\u7121\u984C)",H.appendChild(X),H.appendChild(vo(D)),Fn(H,D.Id),eS(H,D.Id),U.appendChild(H)}),tS(U,r.InternalName),x.appendChild(U)}let T=(c+d)%7;if(T!==0)for(let E=0;E<7-T;E++){let B=document.createElement("div");B.className="memola-cal-cell memola-cal-blank",x.appendChild(B)}u.appendChild(x),e.appendChild(u)}function eS(e,t){e.addEventListener("dragstart",o=>{if(!o.dataTransfer)return;o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/memola-cal",String(t)),e.classList.add("memola-cal-event-dragging");let n=m.dbSelected.has(t)?Array.from(m.dbSelected):[t];document.querySelectorAll(".memola-cal-event[data-id]").forEach(r=>{let a=parseInt(r.dataset.id||"0",10);n.indexOf(a)>=0&&r.classList.add("memola-cal-event-dragging")})}),e.addEventListener("dragend",()=>{document.querySelectorAll(".memola-cal-event-dragging").forEach(o=>o.classList.remove("memola-cal-event-dragging")),document.querySelectorAll(".memola-cal-day-dropover").forEach(o=>o.classList.remove("memola-cal-day-dropover"))})}function tS(e,t){e.addEventListener("dragover",o=>{let n=o.dataTransfer;n&&(o.preventDefault(),n.dropEffect="move",e.classList.add("memola-cal-day-dropover"))}),e.addEventListener("dragleave",()=>{e.classList.remove("memola-cal-day-dropover")}),e.addEventListener("drop",o=>{let n=o.dataTransfer;if(!n)return;e.classList.remove("memola-cal-day-dropover");let r=n.getData("text/memola-cal")||n.getData("text/memola-kb")||n.getData("text/plain");if(!r)return;o.preventDefault();let a=parseInt(r,10);if(!a)return;let i=e.dataset.date||"";if(!i)return;let s=m.dbSelected.has(a)?Array.from(m.dbSelected):[a];oS(s,t,i)})}async function oS(e,t,o){let n=[],r=[];for(let a of e){let i=m.dbItems.find(c=>c.Id===a);if(!i)continue;let s=String(i[t]||"");if(s&&s.startsWith(o))continue;i[t]=o,n.push(()=>{i[t]=s});let l=m.dbFields.find(c=>c.InternalName===t);r.push(ut(m.dbList,a,{[t]:o}).then(()=>{l&&Qt(m.dbList,a,t,l.Title,s,o)}))}if(r.length!==0){oi();try{await Promise.all(r)}catch(a){n.forEach(i=>i()),k("\u65E5\u4ED8\u66F4\u65B0\u5931\u6557: "+a.message,"err"),oi()}}}function Ju(){let e=I("gantt-view");e.innerHTML="";let t=m.dbFields.filter(w=>w.FieldTypeKind===4);if(t.length===0){e.innerHTML='<div class="memola-altview-empty">\u65E5\u4ED8\u5217\u304C\u3042\u308A\u307E\u305B\u3093</div>';return}let o=$u(m.dbList),n=o&&t.some(w=>w.InternalName===o.start)?o.start:t[0].InternalName,r=o?o.end&&t.some(w=>w.InternalName===o.end)?o.end:null:t[1]?.InternalName??null,a=document.createElement("div");a.className="memola-gantt-cfg",a.innerHTML="<span>\u958B\u59CB</span>";let i=document.createElement("select");i.className="memola-gantt-cfg-sel",t.forEach(w=>{let T=document.createElement("option");T.value=w.InternalName,T.textContent=w.Title,w.InternalName===n&&(T.selected=!0),i.appendChild(T)}),a.appendChild(i);let s=document.createElement("span");s.textContent="\u7D42\u4E86",a.appendChild(s);let l=document.createElement("select");l.className="memola-gantt-cfg-sel";let c=document.createElement("option");c.value="",c.textContent="(\u5358\u65E5\u30D0\u30FC)",l.appendChild(c),t.forEach(w=>{let T=document.createElement("option");T.value=w.InternalName,T.textContent=w.Title,w.InternalName===r&&(T.selected=!0),l.appendChild(T)}),r||(c.selected=!0),a.appendChild(l);function d(){let w={start:i.value,end:l.value||null};Ku(m.dbList,w),Ju()}i.addEventListener("change",d),l.addEventListener("change",d),e.appendChild(a);let p=t.find(w=>w.InternalName===n)||t[0],u=r&&t.find(w=>w.InternalName===r)||p,f=m.dbItems.map(w=>{let T=Gs(w,p.InternalName),E=Gs(w,u.InternalName)||T;return T?{item:w,start:new Date(T),end:new Date(E)}:null}).filter(Boolean);if(f.length===0){let w=document.createElement("div");w.className="memola-altview-empty",w.textContent="\u65E5\u4ED8\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093",e.appendChild(w);return}let g=new Date(Math.min(...f.map(w=>w.start.getTime()))),y=new Date(Math.max(...f.map(w=>w.end.getTime()))),b=Math.max(1,Math.ceil((y.getTime()-g.getTime())/864e5)+1),h=28,v=document.createElement("div");v.className="memola-gantt";let x=document.createElement("div");x.className="memola-gantt-header",x.style.width=b*h+"px";for(let w=0;w<b;w++){let T=new Date(g.getTime()+w*864e5),E=document.createElement("div");E.className="memola-gantt-day",(T.getDay()===0||T.getDay()===6)&&E.classList.add("weekend"),E.textContent=String(T.getDate()),E.title=T.toLocaleDateString("ja-JP"),x.appendChild(E)}v.appendChild(x),m.dbSelected.size>0&&v.classList.add("memola-has-sel"),f.forEach(w=>{let T=document.createElement("div");T.className="memola-gantt-row",T.dataset.id=String(w.item.Id),m.dbSelected.has(w.item.Id)&&T.classList.add("memola-card-sel");let E=gy(w.item,()=>{T.classList.toggle("memola-card-sel",m.dbSelected.has(w.item.Id)),m.dbSelected.size>0?v.classList.add("memola-has-sel"):v.classList.remove("memola-has-sel")});T.appendChild(E);let B=document.createElement("div");B.className="memola-gantt-label";let U=document.createElement("span");U.className="memola-gantt-label-text",U.textContent=w.item.Title||"(\u7121\u984C)",B.appendChild(U),B.appendChild(vo(w.item)),Fn(T,w.item.Id),T.appendChild(B);let P=document.createElement("div");P.className="memola-gantt-track",P.style.width=b*h+"px";let O=document.createElement("div"),D=Math.floor((w.start.getTime()-g.getTime())/864e5),H=Math.max(1,Math.ceil((w.end.getTime()-w.start.getTime())/864e5)+1);O.className="memola-gantt-bar",O.style.left=D*h+"px",O.style.width=H*h-2+"px",O.title=w.item.Title||"",P.appendChild(O),T.appendChild(P);let X=E.querySelector(".memola-rowctl-handle")||void 0;fy(T,w.item,"y",X),v.appendChild(T)}),e.appendChild(v)}function nS(e){e==="list"?hy():e==="gallery"?by():e==="calendar"?oi():e==="gantt"&&Ju()}function rS(e){Ue(e)}var ti,zt,mn,py,ud=L(()=>{"use strict";j();me();K();We();_o();le();qs();Re();ve();ti=null;zt=null,mn=null,py=null});var fd={};q(fd,{addRowWithUndo:()=>Ks,canRedoDb:()=>lS,canUndoDb:()=>sS,clearDbHistory:()=>cS,deleteRowWithUndo:()=>Or,recordCellChange:()=>Qt,recordColOrderChange:()=>tf,recordDbCommand:()=>Hr,recordRowFieldsUpdate:()=>ef,recordRowOrderChange:()=>Qu,redoDb:()=>iS,undoDb:()=>aS});function Ys(e){let t=Zu.get(e);return t||(t={past:[],future:[]},Zu.set(e,t)),t}function Hr(e,t){if(!e)return;let o=Ys(e);o.past.push(t),o.past.length>50&&o.past.shift(),o.future=[]}async function aS(e){let t=Ys(e),o=t.past.pop();if(!o)return null;try{return await o.undo(),t.future.push(o),o}catch(n){throw n}}async function iS(e){let t=Ys(e),o=t.future.pop();if(!o)return null;try{return await o.redo(),t.past.push(o),o}catch(n){throw n}}function sS(e){return Ys(e).past.length>0}function lS(e){return Ys(e).future.length>0}function cS(e){Zu.delete(e)}async function un(e){let{S:t}=await Promise.resolve().then(()=>(j(),Yt));return t.currentType==="database"&&t.dbList===e}async function Un(){(await Promise.resolve().then(()=>(K(),ie))).renderDbTable();let t=document.getElementById("list-view"),o=document.getElementById("gallery-view"),n=document.getElementById("calendar-view"),r=document.getElementById("gantt-view");if(t?.classList.contains("on")||o?.classList.contains("on")||n?.classList.contains("on")||r?.classList.contains("on")){let a=await Promise.resolve().then(()=>(ud(),pd));t?.classList.contains("on")&&a.renderListView(),o?.classList.contains("on")&&a.renderGalleryView(),n?.classList.contains("on")&&a.renderCalendarView(),r?.classList.contains("on")&&a.renderGanttView()}}function Qt(e,t,o,n,r,a){let i=async s=>{let{apiUpdateDbRow:l}=await Promise.resolve().then(()=>(We(),Ut));if(await l(e,t,{[o]:s??""}),!await un(e))return;let{S:c}=await Promise.resolve().then(()=>(j(),Yt)),d=c.dbItems.find(p=>p.Id===t);d&&(d[o]=s),await Un()};Hr(e,{label:n+" \u5909\u66F4",undo:()=>i(r),redo:()=>i(a)})}function Qu(e,t,o){let n=async r=>{let{saveRowOrder:a}=await Promise.resolve().then(()=>(qs(),Gu));if(r===null){let{prefDbRowOrderLegacy:i}=await Promise.resolve().then(()=>(ve(),Pp));i(e).clear()}else a(e,r);await un(e)&&await Un()};Hr(e,{label:"\u884C\u306E\u4E26\u3073\u66FF\u3048",undo:()=>n(t.length?t:null),redo:()=>n(o)})}async function dS(e,t){let{getListFields:o}=await Promise.resolve().then(()=>(De(),mo)),n=await o(e),r=new Set(n.map(i=>i.InternalName)),a={};for(let i of Object.keys(t)){if(!r.has(i))continue;let s=t[i];s!=null&&typeof s!="object"&&(a[i]=s)}return!a.Title&&t.Title&&(a.Title=String(t.Title)),a}async function mS(e){let{S:t}=await Promise.resolve().then(()=>(j(),Yt));return t.meta.pages.find(n=>n.list===e&&n.type==="database")?.id||""}async function Or(e,t){let{S:o}=await Promise.resolve().then(()=>(j(),Yt)),{getListItemById:n}=await Promise.resolve().then(()=>(De(),mo)),{apiTrashRow:r,apiRestoreRow:a}=await Promise.resolve().then(()=>(We(),Ut)),i=!1;if(o.dbList===e&&(i=!!o.dbItems.find(l=>l.Id===t)),i||(i=!!await n(e,t).catch(()=>null)),!i)return;await r(e,t),o.dbList===e&&(o.dbItems=o.dbItems.filter(l=>l.Id!==t));let s=t;Hr(e,{label:"\u884C\u524A\u9664",undo:async()=>{if(await a(e,s),!await un(e))return;let l=(await Promise.resolve().then(()=>(j(),Yt))).S,c=await n(e,s).catch(()=>null);c&&!l.dbItems.find(d=>d.Id===s)&&l.dbItems.push(c),await Un()},redo:async()=>{await r(e,s);let l=(await Promise.resolve().then(()=>(j(),Yt))).S;l.dbList===e&&(l.dbItems=l.dbItems.filter(c=>c.Id!==s)),await Un()}})}async function Ks(e,t,o){let{apiAddDbRow:n}=await Promise.resolve().then(()=>(We(),Ut)),{setRowBody:r,deleteRowEntry:a,getRowBody:i}=await Promise.resolve().then(()=>(W(),qe)),{deleteListItem:s}=await Promise.resolve().then(()=>(De(),mo)),l=await mS(e),c=await n(e,t);o&&await r(e,c.Id,l,String(t.Title||""),o);let d=c.Id,p={...c},u=o||"";return Hr(e,{label:"\u884C\u8FFD\u52A0",undo:async()=>{if(await un(e)){let y=(await Promise.resolve().then(()=>(j(),Yt))).S.dbItems.find(b=>b.Id===d);y&&(p={...y})}if(u=await i(e,d).catch(()=>u),await s(e,d).catch(()=>{}),await a(e,d).catch(()=>{}),!await un(e))return;let f=(await Promise.resolve().then(()=>(j(),Yt))).S;f.dbItems=f.dbItems.filter(g=>g.Id!==d),await Un()},redo:async()=>{let f=await dS(e,p),g=await n(e,f);if(d=g.Id,u&&await r(e,d,l,String(p.Title||""),u),!await un(e))return;(await Promise.resolve().then(()=>(j(),Yt))).S.dbItems.push(g),await Un()}}),c}function ef(e,t,o,n,r,a,i){let s=async(l,c)=>{let{apiUpdateDbRow:d}=await Promise.resolve().then(()=>(We(),Ut));Object.keys(l).length>0&&await d(e,t,l);let p="";if(await un(e)){let f=(await Promise.resolve().then(()=>(j(),Yt))).S.dbItems.find(g=>g.Id===t);f&&(p=String(f.Title||""))}if(c!==void 0){let{setRowBody:u}=await Promise.resolve().then(()=>(W(),qe));await u(e,t,i,p,c)}if(await un(e)){if(Object.keys(l).length>0){let f=(await Promise.resolve().then(()=>(j(),Yt))).S.dbItems.find(g=>g.Id===t);if(f)for(let g of Object.keys(l))f[g]=l[g]}await Un()}};Hr(e,{label:"\u884C\u66F4\u65B0",undo:()=>s(o,r),redo:()=>s(n,a)})}function tf(e,t,o){let n=async r=>{let{saveColOrder:a}=await Promise.resolve().then(()=>(qs(),Gu));if(r===null){let{prefDbColOrderLegacy:i}=await Promise.resolve().then(()=>(ve(),Pp));i(e).clear()}else a(e,r);await un(e)&&await Un()};Hr(e,{label:"\u5217\u306E\u4E26\u3073\u66FF\u3048",undo:()=>n(t.length?t:null),redo:()=>n(o)})}var Zu,_o=L(()=>{"use strict";Zu=new Map});function of(){ni&&(ni.remove(),ni=null),ri&&(document.removeEventListener("mousedown",ri,!0),ri=null)}function vy(e,t,o,n){of();let r=wb();if(!r)return;let a=document.createElement("div");a.className="memola-choice-pop";for(let s of t){let l=document.createElement("div");l.className="memola-cp-item";let c=s.value===o;c&&l.classList.add("sel");let d=document.createElement("span");d.className="memola-cp-ic",d.textContent=c?"\u2713":s.icon||"";let p=document.createElement("span");if(p.className="memola-cp-label",p.textContent=s.label||"\u2014",s.label||p.classList.add("memola-cp-empty"),l.append(d,p),s.sub){let u=document.createElement("span");u.className="memola-cp-sub",u.textContent=s.sub,l.appendChild(u)}l.addEventListener("mousedown",u=>{u.preventDefault(),u.stopPropagation(),n(s.value),of()}),a.appendChild(l)}let i=e.getBoundingClientRect();a.style.top=i.bottom+4+"px",a.style.left=i.left+"px",a.style.minWidth=Math.max(180,i.width)+"px",r.appendChild(a),requestAnimationFrame(()=>{let s=a.getBoundingClientRect();if(s.bottom>window.innerHeight-8){let l=i.top-s.height-4;l>=8&&(a.style.top=l+"px")}s.right>window.innerWidth-8&&(a.style.left=window.innerWidth-s.width-8+"px")}),ni=a,ri=s=>{ni&&(s.target instanceof Node&&ni.contains(s.target)||of())},setTimeout(()=>{ri&&document.addEventListener("mousedown",ri,!0)},0)}var ni,ri,yy=L(()=>{"use strict";me();ni=null,ri=null});async function zn(e,t,o,n,r){let a=r[o.InternalName],i=a==null?"":String(a),s=n==null?"":String(n);if(i===s)return;let l=o.Title||o.InternalName;try{await ut(e,t,{[l]:n}),r[o.InternalName]=n,Qt(e,t,o.InternalName,o.Title,a,n)}catch(c){k("\u4FDD\u5B58\u5931\u6557: "+c.message,"err")}}function pS(e,t,o){let n=t[e.InternalName];switch(e.FieldTypeKind){case 4:{let r=document.createElement("div");r.className="memola-rp-date-wrap";let a=document.createElement("input");a.type="text",a.className="memola-rp-input memola-rp-date",a.placeholder="YYYY-MM-DD",a.value=Eo(n);let i=document.createElement("input");i.type="date",i.className="memola-rp-date-pick",i.value=Eo(n),i.tabIndex=-1,i.title="\u30AB\u30EC\u30F3\u30C0\u30FC\u304B\u3089\u9078\u629E",r.append(a,i);let s=l=>{a.classList.remove("memola-rp-invalid"),a.value=l,i.value=l,zn(o,t.Id,e,l,t)};return a.addEventListener("blur",()=>{let l=a.value.trim();if(!l){a.classList.remove("memola-rp-invalid"),i.value="",zn(o,t.Id,e,"",t);return}let c=Tc(l);if(!c){a.classList.add("memola-rp-invalid"),k("\u65E5\u4ED8\u5F62\u5F0F\u304C\u7121\u52B9\u3067\u3059: "+l,"err");return}s(c)}),a.addEventListener("keydown",l=>{l.key==="Enter"&&(l.preventDefault(),a.blur()),l.key==="Escape"&&(a.value=Eo(t[e.InternalName]),a.blur())}),i.addEventListener("change",()=>{i.value?s(i.value):(a.value="",zn(o,t.Id,e,"",t))}),r}case 6:{let r=document.createElement("button");r.type="button",r.className="memola-rp-input memola-rp-choice";let a=e.Choices||[],i=()=>{let s=t[e.InternalName]||"";if(s){let l=a.indexOf(s);r.innerHTML='<span class="memola-select-chip memola-sc-'+(l>=0?l%6:0)+'">'+s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</span>"}else r.innerHTML='<span class="memola-rp-placeholder">\u2014</span>'};return i(),r.addEventListener("click",()=>{let s=t[e.InternalName]||"",l=[{value:"",label:"\u2014"},...a.map(c=>({value:c,label:c}))];vy(r,l,s,c=>{zn(o,t.Id,e,c,t).then(i)})}),r}case 8:{let r=document.createElement("label");r.className="memola-rp-checkbox";let a=document.createElement("input");return a.type="checkbox",a.checked=n===!0||n==="true"||n===1||n==="1",a.addEventListener("change",()=>{zn(o,t.Id,e,a.checked?"1":"0",t)}),r.appendChild(a),r}case 9:{let r=document.createElement("input");return r.type="number",r.className="memola-rp-input",r.value=n==null?"":String(n),r.addEventListener("blur",()=>{let a=r.value.trim()===""?"":Number(r.value);zn(o,t.Id,e,a,t)}),r}case 3:{let r=document.createElement("textarea");return r.className="memola-rp-input memola-rp-multi",r.rows=2,r.value=n==null?"":String(n),r.addEventListener("blur",()=>{zn(o,t.Id,e,r.value,t)}),r}default:{let r=document.createElement("input");return r.type="text",r.className="memola-rp-input",r.value=n==null?"":String(n),r.addEventListener("blur",()=>{zn(o,t.Id,e,r.value,t)}),r}}}function xy(e,t,o,n){e.innerHTML="";let r=t.filter(a=>a.InternalName!=="Title");if(r.length!==0)for(let a of r){let i=document.createElement("div");i.className="memola-rp-row";let s=document.createElement("div");s.className="memola-rp-label",s.textContent=a.Title;let l=document.createElement("div");l.className="memola-rp-value",l.appendChild(pS(a,o,n)),i.append(s,l),e.appendChild(i)}}var wy=L(()=>{"use strict";We();le();To();_o();yy()});var jn={};q(jn,{CLAUDE_MODELS:()=>uS,CORP_AI_MODELS:()=>nf,DEFAULT_EMBEDDING_API_VERSION:()=>Sy,DEFAULT_EMBEDDING_MODEL:()=>Ly,DEFAULT_VOYAGE_MODEL:()=>My,EMBEDDING_MODELS:()=>AS,VOYAGE_MODELS:()=>BS,deploymentIdFor:()=>lf,findCorpAiModel:()=>ai,getActiveModel:()=>ES,getClaudeApiKey:()=>rf,getClaudeModel:()=>gd,getCorpAiBaseUrl:()=>sf,getCorpAiDeploymentPrefix:()=>ky,getCorpAiKey:()=>Js,getCorpAiModel:()=>Fr,getCorpAiOverrides:()=>Ey,getCorpAiOverridesRaw:()=>Iy,getEmbedProvider:()=>Py,getEmbeddingApiVersion:()=>Dy,getEmbeddingDimensions:()=>_y,getEmbeddingModel:()=>By,getLocalAiBaseUrl:()=>hd,getLocalAiKey:()=>bd,getLocalAiModel:()=>Ur,getLocalAiModels:()=>MS,getLocalAiReasoningModels:()=>Ty,getProvider:()=>Xs,getRagMinScore:()=>mf,getRagTopK:()=>df,getVoyageKey:()=>Cy,getVoyageModel:()=>Ay,isLocalReasoningModel:()=>vd,isRagAvailable:()=>zS,resolveCorpAiEndpoint:()=>cf,resolveEmbeddingEndpoint:()=>Zs,setClaudeApiKey:()=>af,setClaudeModel:()=>vS,setCorpAiBaseUrl:()=>wS,setCorpAiDeploymentPrefix:()=>kS,setCorpAiKey:()=>xS,setCorpAiModel:()=>yS,setCorpAiOverridesRaw:()=>IS,setEmbedProvider:()=>DS,setEmbeddingApiVersion:()=>OS,setEmbeddingDimensions:()=>HS,setEmbeddingModel:()=>NS,setLocalAiBaseUrl:()=>TS,setLocalAiKey:()=>LS,setLocalAiModel:()=>SS,setLocalAiModels:()=>PS,setLocalAiReasoningModels:()=>CS,setProvider:()=>bS,setRagMinScore:()=>US,setRagTopK:()=>FS,setVoyageKey:()=>_S,setVoyageModel:()=>RS});function Xs(){let e=fa.get();return e==="corp"||e==="local"?e:fS}function bS(e){fa.set(e)}function gd(){return rc.get()||gS}function vS(e){rc.set(e)}function rf(){return ac.get()}function af(e){ac.set(e.trim())}function Fr(){let e=ga.get();return e&&nf.some(t=>t.id===e)?e:hS}function yS(e){ga.set(e)}function Js(){return ic.get()}function xS(e){ic.set(e)}function sf(){return lo.get().replace(/\/$/,"")}function wS(e){lo.set(e.trim())}function ky(){return ha.get()}function kS(e){ha.set(e.trim())}function lf(e){let t=ky(),o=e.replace(/\./g,"");return t+o}function Iy(){return sc.get()}function IS(e){sc.set(e.trim())}function Ey(){let e=Iy();if(!e)return{};try{let t=JSON.parse(e);if(t&&typeof t=="object")return t}catch{}return{}}function cf(e){let o=ai(e)?.reasoning?"2024-12-01-preview":"2024-06-01",n=Ey()[e]||{};return{baseUrl:(n.baseUrl||sf()||"").replace(/\/$/,""),apiVersion:n.apiVersion||o,deploymentId:n.deploymentId||lf(e)}}function ES(){let e=Xs();return e==="corp"?Fr():e==="local"?Ur():gd()}function ai(e){return nf.find(t=>t.id===e)||null}function hd(){return cc.get().replace(/\/$/,"")}function TS(e){cc.set(e.trim())}function bd(){return dc.get()}function LS(e){dc.set(e.trim())}function Ur(){return mc.get()}function SS(e){mc.set(e.trim())}function MS(){let e=pc.get();if(!e)return[];try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(o=>typeof o=="string"&&o.trim())}catch{}return[]}function PS(e){pc.set(JSON.stringify(e.filter(t=>t.trim())))}function Ty(){let e=uc.get();return e?e.split(/[\s,]+/).map(t=>t.trim().toLowerCase()).filter(Boolean):[]}function CS(e){uc.set(e.trim())}function vd(e){let t=e.toLowerCase();return Ty().some(o=>t.includes(o))}function Py(){return ba.get()==="voyage"?"voyage":"auto"}function DS(e){ba.set(e)}function Cy(){return fc.get()}function _S(e){fc.set(e.trim())}function Ay(){return va.get()||My}function RS(e){va.set(e.trim())}function By(){return ya.get()||Ly}function NS(e){ya.set(e.trim())}function Dy(){return xa.get()||Sy}function OS(e){xa.set(e.trim())}function _y(){let e=wa.get().trim();if(!e)return null;let t=parseInt(e,10);return Number.isFinite(t)&&t>0?t:null}function HS(e){wa.set(e.trim())}function df(){let e=parseInt(ka.get(),10);return Number.isFinite(e)&&e>0?e:8}function FS(e){ka.set(e.trim())}function mf(){let e=parseFloat(Ia.get());return Number.isFinite(e)?e:.2}function US(e){Ia.set(e.trim())}function Zs(){let e=_y();if(Py()==="voyage"){let n=Cy();return n?{provider:"voyage",kind:"voyage",url:"https://api.voyageai.com/v1/embeddings",apiKey:n,authStyle:"bearer",model:Ay(),dimensions:e}:null}let t=Xs(),o=By();if(t==="corp"){let n=sf();if(!n)return null;let r=lf(o),a=Dy();return{provider:"corp",kind:"openai",url:`${n}/openai/deployments/${r}/embeddings?api-version=${encodeURIComponent(a)}`,apiKey:Js(),authStyle:"azure",model:o,dimensions:e}}if(t==="local"){let n=hd();return n?{provider:"local",kind:"openai",url:`${n}/embeddings`,apiKey:bd(),authStyle:"bearer",model:o,dimensions:e}:null}return null}function zS(){return Zs()!==null}var nf,uS,fS,gS,hS,AS,Ly,Sy,BS,My,Bt=L(()=>{"use strict";ve();nf=[{id:"gpt-5",reasoning:!0,vision:!0},{id:"gpt-5-mini",reasoning:!0,vision:!0},{id:"gpt-5-nano",reasoning:!0,vision:!0},{id:"o3",reasoning:!0,vision:!0},{id:"o4-mini",reasoning:!0,vision:!0},{id:"gpt-4.1",reasoning:!1,vision:!0},{id:"gpt-4.1-mini",reasoning:!1,vision:!0},{id:"gpt-4.1-nano",reasoning:!1,vision:!0},{id:"gpt-4o",reasoning:!1,vision:!0},{id:"gpt-4o-mini",reasoning:!1,vision:!0}],uS=[{id:"claude-opus-4-5",label:"Claude Opus 4.5"},{id:"claude-sonnet-4-5",label:"Claude Sonnet 4.5"},{id:"claude-haiku-4-5",label:"Claude Haiku 4.5"}],fS="claude",gS="claude-sonnet-4-5",hS="gpt-4.1-mini";AS=["text-embedding-3-small","text-embedding-3-large","text-embedding-ada-002"],Ly="text-embedding-3-small",Sy="2024-02-01",BS=["voyage-3.5-lite","voyage-3.5","voyage-3-large","voyage-code-3"],My="voyage-3.5-lite"});function jS(e,t,o){let n=e.headers.get("Retry-After");if(n){let a=Number(n);if(!isNaN(a)&&a>=0)return Math.min(a*1e3,12e4);let i=Date.parse(n);if(!isNaN(i))return Math.max(0,Math.min(i-Date.now(),12e4))}let r=t.match(/(?:try again in|retry (?:after|in))\s+(\d+)\s*(?:s|sec|seconds)?/i);return r?Math.min(Number(r[1])*1e3,12e4):Math.min(2e3*Math.pow(2,o),3e4)}async function qS(e,t){if(!(e<=0)){if(t?.aborted)throw new DOMException("aborted","AbortError");await new Promise((o,n)=>{let r=setTimeout(()=>{t?.removeEventListener("abort",a),o()},e),a=()=>{clearTimeout(r),n(new DOMException("aborted","AbortError"))};t?.addEventListener("abort",a,{once:!0})})}}function Qs(){return Zs()!==null}async function pf(e,t={}){if(e.length===0)return[];let o=Zs();if(!o)throw new Error("\u57CB\u3081\u8FBC\u307F\u672A\u8A2D\u5B9A: AI \u8A2D\u5B9A\u3067\u57CB\u3081\u8FBC\u307F\u30D7\u30ED\u30D0\u30A4\u30C0 (Voyage / Azure OpenAI \u4E92\u63DB / \u30ED\u30FC\u30AB\u30EB) \u3092\u69CB\u6210\u3057\u3066\u304F\u3060\u3055\u3044");let{inputType:n="document",signal:r,maxRetries:a=5}=t,i={"Content-Type":"application/json"};o.authStyle==="azure"?o.apiKey&&(i["api-key"]=o.apiKey):o.apiKey&&(i.Authorization=o.apiKey.startsWith("Bearer ")?o.apiKey:`Bearer ${o.apiKey}`);let s={input:e,model:o.model};o.kind==="voyage"?(s.input_type=n,o.dimensions&&(s.output_dimension=o.dimensions)):o.dimensions&&(s.dimensions=o.dimensions);let l=JSON.stringify(s);for(let c=0;c<=a;c++){if(r?.aborted)throw new DOMException("aborted","AbortError");let d=await fetch(o.url,{method:"POST",headers:i,credentials:"omit",signal:r,body:l});if(d.ok){let g=await d.json(),y=new Array(e.length);for(let b of g.data)y[b.index]=Float32Array.from(b.embedding);return y}let p=await d.text().catch(()=>"");if(!(d.status===429||d.status>=500&&d.status<600)||c===a)throw new Error(`embed failed: HTTP ${d.status} ${p.slice(0,300)}`);let f=jS(d,p,c);console.warn(`[rag/embed] HTTP ${d.status}; retry in ${Math.round(f/1e3)}s (${c+1}/${a})`),await qS(f,r)}throw new Error("embed failed: max retries exceeded")}async function Ry(e,t){let[o]=await pf([e],{inputType:"query",signal:t});return o}var yd=L(()=>{"use strict";Bt()});function el(){return{version:0,generation:1,maxSeq:0,sealed:[],open:null,updatedAt:ii()}}function ii(){return new Date().toISOString()}function uf(e){let t=0;for(let o of e){let n=/(\d+)$/.exec(o);n&&(t=Math.max(t,Number(n[1])))}return t+1}function tl(e){return"seg-"+String(e).padStart(5,"0")}function ol(e){return JSON.stringify(e)}function xd(e){let t=JSON.parse(e);if(!t||!Array.isArray(t.records))throw new Error("\u58CA\u308C\u305F\u30BB\u30B0\u30E1\u30F3\u30C8");return t}function nl(e){return JSON.stringify(e)}function rl(e){let t=JSON.parse(e);if(!t||!Array.isArray(t.sealed))throw new Error("\u58CA\u308C\u305F manifest");return t}function Ny(e){let t=2166136261;for(let o=0;o<e.length;o++)t^=e.charCodeAt(o),t=t+((t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24))>>>0;return t.toString(16).padStart(8,"0")}function Oy(e,t){return e.sealed.filter(o=>!t.has(o))}var al=L(()=>{"use strict"});function KS(e){let t=2166136261;for(let o=0;o<e.length;o++)t^=e.charCodeAt(o),t=t+((t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24))>>>0;return t.toString(16).padStart(8,"0")}function WS(e){return new Promise((t,o)=>{let n=indexedDB.open(e,$S);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains(zr)||r.createObjectStore(zr),r.objectStoreNames.contains(il)||r.createObjectStore(il)},n.onsuccess=()=>t(n.result),n.onerror=()=>o(n.error)})}function qn(e,t,o,n){return new Promise((r,a)=>{let i=e.transaction(t,o),s=n(i.objectStore(t));s.onsuccess=()=>r(s.result),s.onerror=()=>a(s.error)})}var $S,zr,il,si,Hy=L(()=>{"use strict";al();He();$S=1,zr="segments",il="meta";si=class{constructor(t){this.dbp=null;this.name=`memola-rag-${KS(G)}-${t}`}get dbName(){return this.name}db(){return this.dbp??(this.dbp=WS(this.name))}async allIds(){let t=await this.db();return(await qn(t,zr,"readonly",n=>n.getAllKeys())).map(String)}async get(t){let o=await this.db(),n=await qn(o,zr,"readonly",r=>r.get(t));return n?xd(n):null}async put(t,o){let n=await this.db();await qn(n,zr,"readwrite",r=>r.put(ol(o),t))}async delete(t){let o=await this.db();await qn(o,zr,"readwrite",n=>n.delete(t))}async getManifest(){let t=await this.db(),o=await qn(t,il,"readonly",n=>n.get("manifest"));return o?rl(o):null}async setManifest(t){let o=await this.db();await qn(o,il,"readwrite",n=>n.put(nl(t),"manifest"))}async clearAll(){let t=await this.db();await qn(t,zr,"readwrite",o=>o.clear()),await qn(t,il,"readwrite",o=>o.clear())}}});function GS(e){let t=new Float32Array(1),o=new Int32Array(t.buffer);t[0]=e;let n=o[0],r=n>>>16&32768,a=(n>>>23&255)-127+15,i=n&8388607;return a<=0?a<-10?r:(i=(i|8388608)>>1-a,r|i>>13):a>=31?r|31744:r|a<<10|i>>13}function VS(e){let t=(e&32768)<<16,o=(e&31744)>>10,n=e&1023,r;if(o===0)if(n===0)r=t;else{let s=-1,l=n;do s++,l<<=1;while(!(l&1024));l&=1023,r=t|s+127-15+1<<23|l<<13}else o===31?r=t|2139095040|n<<13:r=t|o-15+127<<23|n<<13;let a=new Int32Array(1),i=new Float32Array(a.buffer);return a[0]=r,i[0]}function Fy(e){let t=new Uint16Array(e.length);for(let r=0;r<e.length;r++)t[r]=GS(e[r]);let o=new Uint8Array(t.buffer),n="";for(let r=0;r<o.length;r++)n+=String.fromCharCode(o[r]);return btoa(n)}function wd(e){let t=atob(e),o=new Uint8Array(t.length);for(let a=0;a<t.length;a++)o[a]=t.charCodeAt(a);let n=new Uint16Array(o.buffer),r=new Float32Array(n.length);for(let a=0;a<n.length;a++)r[a]=VS(n[a]);return r}function li(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n]*e[n];if(t=Math.sqrt(t),t===0)return e;let o=new Float32Array(e.length);for(let n=0;n<e.length;n++)o[n]=e[n]/t;return o}var kd=L(()=>{"use strict"});function Uy(e){let t=(e||"").toLowerCase().replace(/\s+/g," ").trim(),o=new Set;for(let n=0;n<t.length-1;n++)o.add(t.slice(n,n+2));return o}function YS(e,t){if(e.size===0)return 0;let o=0;for(let n of e)t.has(n)&&o++;return o/e.size}var Id,zy=L(()=>{"use strict";kd();Id=class{constructor(){this.records=new Map;this.appliedSeq=new Map;this.maxSeq=0;this.kwCache=new Map}get size(){return this.records.size}get watermark(){return this.maxSeq}applySegment(t){let o=[...t.records].sort((n,r)=>n.seq-r.seq);for(let n of o)this.applyRecord(n)}applyRecord(t){let o=this.appliedSeq.get(t.key)??0;if(!(t.seq<=o)){if(this.kwCache.delete(t.key),t.op==="delete")this.records.delete(t.key);else{if(!t.emb)return;this.records.set(t.key,{key:t.key,docKey:t.docKey??t.key.split("#")[0],scope:t.scope??"user",title:t.title??"(\u7121\u984C)",chunkIdx:t.chunkIdx??0,chunkCount:t.chunkCount??1,heading:t.heading,text:t.text??"",docHash:t.docHash??"",vec:li(wd(t.emb))})}this.appliedSeq.set(t.key,t.seq),t.seq>this.maxSeq&&(this.maxSeq=t.seq)}}docState(t){let o="",n=0;for(let r of this.records.values())r.docKey===t&&(n++,o||(o=r.docHash));return n>0?{docHash:o,chunkCount:n}:null}allDocKeys(){let t=new Set;for(let o of this.records.values())t.add(o.docKey);return t}search(t,o,n="",r=0,a=[]){let i=li(t),s=i.length,c=r>0&&n.trim().length>0?Uy(n):null,d=Math.min(1,Math.max(0,r)),p=a.map(g=>g.toLowerCase()).filter(Boolean),u=[];for(let g of this.records.values()){let y=0;if(g.vec.length===s)for(let v=0;v<s;v++)y+=i[v]*g.vec[v];let b=Math.max(0,y),h=c?(1-d)*b+d*YS(c,this.kwIndex(g)):b;u.push({record:g,score:h})}let f=u;if(p.length){let g=b=>`${b.title} ${b.heading??""} ${b.text}`.toLowerCase(),y=u.filter(b=>p.every(h=>g(b.record).includes(h)));y.length&&(f=y)}return f.sort((g,y)=>y.score-g.score),f.slice(0,o)}kwIndex(t){let o=this.kwCache.get(t.key);return o||(o=Uy(`${t.title} ${t.heading??""} ${t.text}`),this.kwCache.set(t.key,o)),o}clear(){this.records.clear(),this.appliedSeq.clear(),this.kwCache.clear(),this.maxSeq=0}}});function ff(e){return G+"/_api/web/GetFileByServerRelativeUrl('"+encodeURIComponent(e)+"')/$value"}function XS(e){return G+"/_api/web/GetFileByServerRelativeUrl('"+encodeURIComponent(e)+"')"}function Td(e,t=""){return G+"/_api/web/GetFolderByServerRelativeUrl('"+encodeURIComponent(e)+"')"+t}async function gf(e){try{let r=await fetch(Td(e,"?$select=Exists"),{headers:{Accept:Ed},credentials:"include"});if(r.ok&&(await r.json()).d?.Exists)return}catch{}let t=await xe(),o=await fetch(G+"/_api/web/folders",{method:"POST",headers:{Accept:Ed,"Content-Type":Ed,"X-RequestDigest":t},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Folder"},ServerRelativeUrl:e})});if(o.ok)return;let n=await o.text().catch(()=>"");if(!(o.status===409||/exist|既に|already/i.test(n)))throw new Error("ensureFolder HTTP "+o.status+" "+n.slice(0,200))}async function ci(e){let t=await fetch(ff(e),{headers:{Accept:"*/*"},credentials:"include"});if(t.status===404)return null;if(!t.ok)throw new Error("readFile HTTP "+t.status+" ("+e+")");return t.text()}async function jy(e){let t=await fetch(ff(e),{headers:{Accept:"*/*"},credentials:"include"});if(t.status===404)return null;if(!t.ok)throw new Error("readFile HTTP "+t.status+" ("+e+")");let o=await t.text(),n=t.headers.get("ETag")||t.headers.get("etag")||"";return{text:o,etag:n}}async function Ld(e,t,o){let n=await xe(),r=Td(e,"/Files/add(url='"+encodeURIComponent(t)+"',overwrite=true)"),a=await fetch(r,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8","X-RequestDigest":n},credentials:"include",body:o});if(!a.ok){let i=await a.text().catch(()=>"");throw new Error("uploadFile("+t+") HTTP "+a.status+" "+i.slice(0,200))}}async function qy(e,t,o){if(!o){let a=e.lastIndexOf("/");await Ld(e.slice(0,a),e.slice(a+1),t);return}let n=await xe(),r=await fetch(ff(e),{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8","X-RequestDigest":n,"X-HTTP-Method":"PUT","If-Match":o},credentials:"include",body:t});if(r.status===412)throw new sl;if(!r.ok){let a=await r.text().catch(()=>"");throw new Error("uploadFileTextCas HTTP "+r.status+" "+a.slice(0,200))}}async function $y(e,t,o){let n=await xe(),r=Td(e,"/Files/add(url='"+encodeURIComponent(t)+"',overwrite=false)"),a=await fetch(r,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8","X-RequestDigest":n},credentials:"include",body:o});if(a.ok)return!0;if(a.status===409||a.status===400||a.status===500){let s=await a.text().catch(()=>"");if(/already exists|exists at|存在|already there/i.test(s))return!1}let i=await a.text().catch(()=>"");throw new Error("uploadFileTextNoOverwrite HTTP "+a.status+" "+i.slice(0,200))}async function Ky(e){let t=await xe(),o=await fetch(XS(e),{method:"POST",headers:{"X-RequestDigest":t,"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include"});if(!o.ok&&o.status!==404){let n=await o.text().catch(()=>"");throw new Error("deleteFile HTTP "+o.status+" "+n.slice(0,200))}}async function hf(e){let t=await fetch(Td(e,"/Files?$select=Name&$top=5000"),{headers:{Accept:Ed},credentials:"include"});return t.ok?((await t.json()).d?.results??[]).map(n=>n.Name??"").filter(Boolean):[]}var Ed,sl,bf=L(()=>{"use strict";He();br();Ed="application/json;odata=verbose",sl=class extends Error{constructor(){super("CAS conflict (412)");this.code="PRECONDITION_FAILED"}}});async function Wy(e,t,o=5){for(let n=0;n<=o;n++){let r=await e.readManifestWithEtag(),a=r?.manifest??el(),i=r?.etag??"",s=t(a);s.updatedAt=ii();try{return await e.writeManifestCas(s,i),s}catch(l){if(!(l instanceof sl)||n===o)throw l;await new Promise(c=>setTimeout(c,50+n*60))}}throw new Error("manifest CAS: max retries exceeded")}var ll,JS,cl,Gy=L(()=>{"use strict";He();bf();al();ll="manifest.json",JS="Shared Documents/memola-rag",cl=class{constructor(t){this.scope=t;this.folder=`${Xo}/${JS}/${t}`}async ensure(){await gf(`${Xo}/Shared Documents/memola-rag`),await gf(this.folder)}async readManifest(){let t=await ci(`${this.folder}/${ll}`);return t==null?null:rl(t)}async readManifestWithEtag(){let t=await jy(`${this.folder}/${ll}`);return t?{manifest:rl(t.text),etag:t.etag}:null}async writeManifest(t){await Ld(this.folder,ll,nl(t))}async writeManifestCas(t,o){if(!o){await this.writeManifest(t);return}await qy(`${this.folder}/${ll}`,nl(t),o)}async readSegment(t){let o=await ci(`${this.folder}/${t}.json`);return o==null?null:xd(o)}async writeSegment(t){await Ld(this.folder,`${t.id}.json`,ol(t))}async writeSegmentNoOverwrite(t,o,n=50){let r=o;for(let a=0;a<n;a++){let i=tl(r);if(await $y(this.folder,`${i}.json`,ol({...t,id:i})))return{id:i,idx:r};r++}throw new Error("segment id \u885D\u7A81\u304C "+n+" \u56DE\u9023\u7D9A")}async listSegmentIds(){return(await hf(this.folder)).filter(o=>o.startsWith("seg-")&&o.endsWith(".json")).map(o=>o.slice(0,-5))}async deleteAll(){let t=await hf(this.folder);for(let o of t)(o===ll||o.startsWith("seg-")&&o.endsWith(".json"))&&await Ky(`${this.folder}/${o}`).catch(()=>{})}}});function t2(){try{let e=localStorage.getItem("memola:rag:client-id");return e||(e="c-"+Math.random().toString(36).slice(2,10),localStorage.setItem("memola:rag:client-id",e)),e}catch{return"c-anon"}}function Vy(){return yf||(yf=new xf),yf}var jr,vf,ZS,QS,e2,xf,yf,Yy=L(()=>{"use strict";He();De();jr="memola-rag-sync",vf="__lease__",ZS=3e4,QS=5*6e4,e2=2*6e4;xf=class{constructor(){this.me=t2();this.listReady=!1;this.writer=!1;this.timer=null;this.started=!1;this.visibilityBound=!1}get id(){return this.me}isWriter(){return this.writer}async ensureWriter(){return await this.ensureListReady(),await this.electOrRenew(),this.writer}async start(){this.started||(this.started=!0,await this.ensureListReady(),await this.tick(),this.scheduleNext(),!this.visibilityBound&&typeof document<"u"&&(this.visibilityBound=!0,document.addEventListener("visibilitychange",()=>{document.hidden||this.tick(),this.scheduleNext()})))}stop(){this.started=!1,this.timer!=null&&(window.clearInterval(this.timer),this.timer=null),this.release()}scheduleNext(){if(this.timer!=null&&(window.clearInterval(this.timer),this.timer=null),!this.started)return;let t=typeof document<"u"&&document.hidden?QS:ZS;this.timer=window.setInterval(()=>{this.tick()},t)}async ensureListReady(){this.listReady||(await Ot({title:jr,fields:[{name:"holder",kind:2},{name:"expires",kind:4},{name:"last_seen",kind:4}]}),this.listReady=!0)}async tick(){try{await this.heartbeat(),await this.electOrRenew()}catch(t){console.warn("[rag/lease] tick \u5931\u6557:",t.message)}}async readRow(t){let o=G+"/_api/web/lists/getbytitle('"+jr+"')/items?$select=Id,holder,expires&$filter=Title eq '"+t.replace(/'/g,"''")+"'&$top=1",n=await fetch(o,{headers:{Accept:"application/json;odata=verbose"},credentials:"include"});if(!n.ok)return null;let a=(await n.json()).d?.results?.[0];return a?{Id:a.Id,holder:String(a.holder??""),expires:String(a.expires??""),etag:a.__metadata?.etag??"*"}:null}async heartbeat(){let t=new Date().toISOString(),o=await this.readRow(this.me);o?await yr(jr,o.Id,{last_seen:t},"*").catch(()=>{}):await Ne(jr,{Title:this.me,last_seen:t}).catch(()=>{})}async electOrRenew(){let t=Date.now(),o=t+e2,n=()=>new Date(o).toISOString(),r=await this.readRow(vf);if(!r){try{await Ne(jr,{Title:vf,holder:this.me,expires:n()}),this.writer=!0}catch{this.writer=!1}return}let a=r.holder,i=Date.parse(r.expires)||0;if(a===this.me||i<t){let s=await yr(jr,r.Id,{holder:this.me,expires:n()},r.etag);this.writer=s.ok}else this.writer=!1}async release(){if(!(!this.listReady||!this.writer)){try{let t=await this.readRow(vf);t&&t.holder===this.me&&await yr(jr,t.Id,{expires:new Date().toISOString()},t.etag)}catch{}this.writer=!1}}},yf=null});function Xy(e,t={}){let o=t.maxChars??800,n=Math.max(0,t.overlap??80),r=t.minChars??200,a=(e??"").replace(/\r\n?/g,`
`).trim();if(!a)return[];if(a.length<=o)return[{text:a}];let i=o2(a),s=[];for(let l of i){let c=n2(l.body,o,r);for(let d of c){let p=d;if(n>0&&s.length>0){let u=s[s.length-1].text;p=u.slice(Math.max(0,u.length-n))+`
`+d}s.push({text:p,heading:l.heading})}}return s.length?s:[{text:a}]}function o2(e){let t=e.split(`
`),o=[],n={body:""};for(let r of t){let a=/^(#{1,6})\s+(.+)$/.exec(r);a?(n.body.trim()&&o.push({...n,body:n.body.trim()}),n={heading:a[2].trim(),body:""}):n.body+=(n.body?`
`:"")+r}return n.body.trim()&&o.push({...n,body:n.body.trim()}),o.length?o:[{body:e}]}function n2(e,t,o){let n=e.split(/\n{2,}/).map(i=>i.trim()).filter(Boolean),r=[],a="";for(let i of n){let s=a?a+`

`+i:i;if(s.length<=t){a=s;continue}if(a&&(r.push(a),a=""),i.length<=t)a=i;else for(let l of r2(i,t))a&&(a+`
`+l).length>t&&(r.push(a),a=""),a=a?a+`
`+l:l}return a&&r.push(a),r.length?r:[e]}function r2(e,t){let o=e.split(/(?<=[。!?！？\n])/).map(a=>a.trim()).filter(Boolean),n=[],r="";for(let a of o){if(a.length>t){r&&(n.push(r),r="");for(let i=0;i<a.length;i+=t)n.push(a.slice(i,i+t));continue}(r+a).length>t&&(n.push(r),r=""),r+=a}return r&&n.push(r),n}var Jy=L(()=>{"use strict"});async function Qy(e,t){let n=await Ee(e,"Id,Title,Body_blocks,PageType,Trashed,IsTemplate,OriginPageId"),r=[];for(let a of n){let i=String(a.PageType??"");i==="row"||i==="database"||Number(a.Trashed??0)>0||a.IsTemplate||a.OriginPageId||r.push({docKey:`${e}:${a.Id}`,scope:t,title:String(a.Title??"(\u7121\u984C)"),bodyJson:String(a.Body_blocks??"")})}return r}async function a2(e,t,o){let n=[];for(let r=0;r<e.length;r+=Zy){let a=e.slice(r,r+Zy),i=await pf(a,{inputType:"document",signal:t});for(let s of i)n.push(s);o?.(n.length,e.length)}return n}async function ex(e,t,o,n){let r=[],a=new Set(t.map(d=>d.docKey));for(let d of e.allDocKeys()){if(a.has(d))continue;let u=e.docState(d)?.chunkCount??0;for(let f=0;f<u;f++)r.push({seq:0,op:"delete",key:`${d}#${f}`})}let i=[];for(let d of t){let p=Ny(d.bodyJson||""),u=e.docState(d.docKey),f=u?.chunkCount??0;if(u&&u.docHash===p)continue;let g=Xe(ge(d.bodyJson)).trim();if(!g){for(let b=0;b<f;b++)r.push({seq:0,op:"delete",key:`${d.docKey}#${b}`});continue}let y=Xy(`# ${d.title}

${g}`);i.push({doc:d,chunks:y,hash:p,prevCount:f})}let s=[];for(let d of i)for(let p of d.chunks)s.push(p.text);if(s.length===0)return r;let l=await a2(s,o,n),c=0;for(let d of i){let p=d.chunks.length;for(let u=0;u<p;u++){let f=l[c++];r.push({seq:0,op:"upsert",key:`${d.doc.docKey}#${u}`,docKey:d.doc.docKey,scope:d.doc.scope,title:d.doc.title,chunkIdx:u,chunkCount:p,heading:d.chunks[u].heading,text:d.chunks[u].text,docHash:d.hash,emb:Fy(f)})}for(let u=p;u<d.prevCount;u++)r.push({seq:0,op:"delete",key:`${d.doc.docKey}#${u}`})}return r}var Zy,tx=L(()=>{"use strict";De();W();St();Jy();kd();yd();al();Zy=64});var nx={};q(nx,{ScopeIndex:()=>dl,orgIndex:()=>di,ragHardReset:()=>i2,resetIndexes:()=>ox,userIndex:()=>mi});function di(){return Sd||(Sd=new dl("org",ce,!0)),Sd}function mi(){return Md||(Md=new dl("user",Jt(),!1)),Md}function ox(){Sd=null,Md=null}async function i2(){try{await new cl("org").deleteAll()}catch{}try{await new si("org").clearAll()}catch{}try{await new si("user").clearAll()}catch{}ox()}var dl,Sd,Md,wf=L(()=>{"use strict";W();Hy();zy();Gy();Yy();tx();al();dl=class{constructor(t,o,n){this.scope=t;this.listTitle=o;this.db=new Id;this.inited=!1;this.cache=new si(t==="org"?"org":"user"),this.store=n?new cl("org"):null}get size(){return this.db.size}stats(){return{docs:this.db.allDocKeys().size,chunks:this.db.size}}async init(){if(this.inited)return;this.inited=!0;let t=await this.cache.allIds().catch(()=>[]),o=new Set;for(let n of t){let r=await this.cache.get(n).catch(()=>null);r&&(this.db.applySegment(r),o.add(n))}this.store&&await this.syncFromSp(o)}async syncFromSp(t){if(!this.store)return;let o=await this.store.readManifest().catch(()=>null);if(!o)return;let n=Oy(o,t),r=await this.cache.getManifest().catch(()=>null);o.open&&this.openChanged(o,r,t)&&n.push(o.open.id);for(let a of n){let i=await this.store.readSegment(a).catch(()=>null);i&&(this.db.applySegment(i),await this.cache.put(a,i).catch(()=>{}))}await this.pruneOrphans(o),await this.cache.setManifest(o).catch(()=>{})}openChanged(t,o,n){return t.open?!n.has(t.open.id)||!o?.open||o.open.id!==t.open.id?!0:o.open.hash!==t.open.hash:!1}async pruneOrphans(t){let o=new Set(t.sealed);t.open&&o.add(t.open.id);for(let n of await this.cache.allIds().catch(()=>[]))o.has(n)||await this.cache.delete(n).catch(()=>{})}async refresh(t,o){await this.init();let n=await Qy(this.listTitle,this.scope);if(this.store&&!await Vy().ensureWriter())return{changed:0,skipped:"not-writer",docs:n.length};let r=await ex(this.db,n,t,o);return r.length===0?{changed:0,docs:n.length}:(this.store?await this.persistRemote(r):await this.persistLocal(r),{changed:r.length,docs:n.length})}async persistRemote(t){if(!this.store)return;await this.store.ensure();let o=await this.store.readManifest().catch(()=>null)??el(),n=o.maxSeq;t.forEach((l,c)=>{l.seq=n+c+1});let r=uf(o.sealed),a={id:tl(r),generation:o.generation,records:t},i=await this.store.writeSegmentNoOverwrite(a,r),s={...a,id:i.id};await Wy(this.store,l=>({version:l.version+1,generation:l.generation,maxSeq:Math.max(l.maxSeq,n+t.length),sealed:l.sealed.includes(i.id)?l.sealed:[...l.sealed,i.id],open:l.open,updatedAt:ii()})),this.db.applySegment(s),await this.cache.put(i.id,s).catch(()=>{})}async persistLocal(t){let o=await this.cache.getManifest().catch(()=>null)??el(),n=o.maxSeq;t.forEach((s,l)=>{s.seq=n+l+1});let r=uf(o.sealed),a=tl(r),i={id:a,generation:o.generation,records:t};this.db.applySegment(i),await this.cache.put(a,i),o.sealed.push(a),o.maxSeq=n+t.length,o.version+=1,o.updatedAt=ii(),await this.cache.setManifest(o)}search(t,o,n,r,a=[]){return this.db.search(t,o,n,r,a)}},Sd=null,Md=null});var If={};q(If,{corpAiChatRaw:()=>c2,corpAiChatText:()=>s2,flattenSystem:()=>Ad,parseOAResponseToClaudeShape:()=>ml,toOAMessages:()=>pi,toOATools:()=>Cd});function kf(e){if(!ai(e))throw new Error("\u672A\u77E5\u306E\u30E2\u30C7\u30EB: "+e);let o=cf(e);if(!o.baseUrl)throw new Error("Azure OpenAI \u4E92\u63DB API \u30D9\u30FC\u30B9 URL \u304C\u672A\u8A2D\u5B9A\u3067\u3059 (\u8A2D\u5B9A\u3067\u69CB\u6210)");if(!o.deploymentId)throw new Error("Azure OpenAI \u4E92\u63DB API \u30C7\u30D7\u30ED\u30A4\u540D\u304C\u672A\u8A2D\u5B9A\u3067\u3059 (\u8A2D\u5B9A\u3067\u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9\u3092\u69CB\u6210)");return o.baseUrl+"/openai/deployments/"+o.deploymentId+"/chat/completions?api-version="+o.apiVersion}async function s2(e){let t=Js();if(!t)throw new Error("Azure OpenAI \u4E92\u63DB API \u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o=e.model||Fr(),n=ai(o);if(!n)throw new Error("\u672A\u77E5\u306E\u30E2\u30C7\u30EB: "+o);let r={messages:e.messages};if(e.maxTokens&&(n.reasoning?r.max_completion_tokens=e.maxTokens:r.max_tokens=e.maxTokens),e.stream?.onText)return r.stream=!0,l2(kf(o),t,r,e.stream.onText,e.signal);let a=await fetch(kf(o),{method:"POST",headers:{"Content-Type":"application/json","api-key":t},body:JSON.stringify(r),signal:e.signal});if(!a.ok){let s=await a.text().catch(()=>"");throw new Error(Pd(a.status,s))}return(await a.json()).choices?.[0]?.message?.content||""}async function l2(e,t,o,n,r){let a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json","api-key":t,Accept:"text/event-stream"},body:JSON.stringify(o),signal:r});if(!a.ok){let d=await a.text().catch(()=>"");throw new Error(Pd(a.status,d))}if(!a.body)throw new Error("\u30B9\u30C8\u30EA\u30FC\u30DF\u30F3\u30B0\u5FDC\u7B54\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");let i=a.body.getReader(),s=new TextDecoder,l="",c="";for(;;){let{value:d,done:p}=await i.read();if(p)break;l+=s.decode(d,{stream:!0});let u;for(;(u=l.indexOf(`

`))!==-1;){let f=l.slice(0,u);l=l.slice(u+2);for(let g of f.split(`
`)){let y=g.match(/^data:\s*(.*)$/);if(!y)continue;let b=y[1].trim();if(!(!b||b==="[DONE]"))try{let v=JSON.parse(b).choices?.[0]?.delta?.content;v&&(c+=v,n(v))}catch{}}}}return c}function Pd(e,t){let o=t?" \u2014 "+t.slice(0,240):"";return e===401?"Azure OpenAI \u4E92\u63DB API \u5931\u6557: 401 API \u30AD\u30FC\u304C\u7121\u52B9/\u672A\u6307\u5B9A"+o:e===403?"Azure OpenAI \u4E92\u63DB API \u5931\u6557: 403 \u63A5\u7D9A\u5143 IP \u304C\u8A31\u53EF\u3055\u308C\u3066\u3044\u307E\u305B\u3093"+o:e===429?"Azure OpenAI \u4E92\u63DB API \u5931\u6557: 429 \u30EC\u30FC\u30C8\u4E0A\u9650\u8D85\u904E (1\u5206\u5F8C\u306B\u518D\u8A66\u884C)"+o:e===400?"Azure OpenAI \u4E92\u63DB API \u5931\u6557: 400 \u30EA\u30AF\u30A8\u30B9\u30C8\u4E0D\u6B63 (\u30E2\u30C7\u30EB/JSON \u3092\u78BA\u8A8D)"+o:"Azure OpenAI \u4E92\u63DB API \u5931\u6557: "+e+o}function pi(e){let t=[];for(let o of e){if(typeof o.content=="string"){t.push({role:o.role,content:o.content});continue}let n=o.content;if(o.role==="assistant"){let r=n.filter(s=>s.type==="text").map(s=>s.text).join(""),a=n.filter(s=>s.type==="tool_use"),i=a.length>0?a.map(s=>({id:s.id,type:"function",function:{name:s.name,arguments:JSON.stringify(s.input||{})}})):void 0;t.push({role:"assistant",content:r||(i?null:""),...i?{tool_calls:i}:{}})}else{let r=n.filter(i=>i.type==="tool_result"),a=n.filter(i=>i.type==="text").map(i=>i.text).join("");a&&t.push({role:"user",content:a});for(let i of r)t.push({role:"tool",tool_call_id:i.tool_use_id,content:i.content})}}return t}function Cd(e){return e.map(t=>({type:"function",function:{name:t.name,description:t.description,parameters:t.input_schema}}))}function Ad(e){return e?typeof e=="string"?e:e.map(t=>t.text).join(`

`):""}async function c2(e){let t=Js();if(!t)throw new Error("Azure OpenAI \u4E92\u63DB API \u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o=e.model||Fr(),n=ai(o);if(!n)throw new Error("\u672A\u77E5\u306E\u30E2\u30C7\u30EB: "+o);let r=Ad(e.system),i={messages:r?[{role:"system",content:r},...pi(e.messages)]:pi(e.messages)};e.tools&&e.tools.length>0&&(i.tools=Cd(e.tools),i.tool_choice="auto"),e.maxTokens&&(n.reasoning?i.max_completion_tokens=e.maxTokens:i.max_tokens=e.maxTokens),e.stream&&(i.stream=!0);let s=kf(o);if(e.stream)return d2(s,t,i,e.stream,e.signal);let l=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json","api-key":t},body:JSON.stringify(i),signal:e.signal});if(!l.ok)throw new Error(Pd(l.status,await l.text().catch(()=>"")));let d=(await l.json()).choices?.[0];return ml(d?.message,d?.finish_reason)}function ml(e,t){let o=[],n=e?.content||"";if(n&&o.push({type:"text",text:n}),e?.tool_calls)for(let a of e.tool_calls){let i={};try{i=JSON.parse(a.function.arguments||"{}")}catch{}o.push({type:"tool_use",id:a.id,name:a.function.name,input:i})}let r="end_turn";return t==="tool_calls"?r="tool_use":t==="length"?r="max_tokens":t==="stop"&&(r="end_turn"),{content:o,stop_reason:r}}async function d2(e,t,o,n,r){let a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json","api-key":t,Accept:"text/event-stream"},body:JSON.stringify(o),signal:r});if(!a.ok)throw new Error(Pd(a.status,await a.text().catch(()=>"")));if(!a.body)throw new Error("\u30B9\u30C8\u30EA\u30FC\u30DF\u30F3\u30B0\u5FDC\u7B54\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");let i=a.body.getReader(),s=new TextDecoder,l="",c="",d,p=new Map;for(;;){let{value:g,done:y}=await i.read();if(y)break;l+=s.decode(g,{stream:!0});let b;for(;(b=l.indexOf(`

`))!==-1;){let h=l.slice(0,b);l=l.slice(b+2);for(let v of h.split(`
`)){let x=v.match(/^data:\s*(.*)$/);if(!x)continue;let w=x[1].trim();if(!(!w||w==="[DONE]"))try{let E=JSON.parse(w).choices?.[0];if(!E)continue;let B=E.delta?.content;if(B&&(c+=B,n.onText?.(B)),E.delta?.tool_calls)for(let U of E.delta.tool_calls){let P=p.get(U.index)||{id:"",name:"",args:""};U.id&&(P.id=U.id),U.function?.name&&(P.name=U.function.name),U.function?.arguments&&(P.args+=U.function.arguments),p.set(U.index,P)}E.finish_reason&&(d=E.finish_reason)}catch{}}}}let u=[];c&&u.push({type:"text",text:c});for(let g of p.values()){let y={};try{y=JSON.parse(g.args||"{}")}catch{}u.push({type:"tool_use",id:g.id,name:g.name,input:y}),n.onToolUse?.({type:"tool_use",id:g.id,name:g.name,input:y})}let f="end_turn";return d==="tool_calls"||p.size>0?f="tool_use":d==="length"&&(f="max_tokens"),{content:u,stop_reason:f}}var Bd=L(()=>{"use strict";Bt()});var Ef={};q(Ef,{localAiChatRaw:()=>u2,localAiChatText:()=>m2});function Dd(){let e=hd();if(!e)throw new Error("\u30ED\u30FC\u30AB\u30EB AI \u30D9\u30FC\u30B9 URL \u304C\u672A\u8A2D\u5B9A\u3067\u3059 (\u4F8B: http://localhost:11434/v1)");return e+"/chat/completions"}function _d(){let e={"Content-Type":"application/json"},t=bd();return t&&(e.Authorization="Bearer "+t),e}function Rd(e,t){let o=t?" \u2014 "+t.slice(0,240):"";return e===0?"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: \u30B5\u30FC\u30D0\u306B\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093 (URL \u3068\u30B5\u30FC\u30D0\u8D77\u52D5\u3092\u78BA\u8A8D)":e===401?"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: 401 \u8A8D\u8A3C\u30A8\u30E9\u30FC (API \u30AD\u30FC\u78BA\u8A8D)"+o:e===404?"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: 404 \u30A8\u30F3\u30C9\u30DD\u30A4\u30F3\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093 (URL \u672B\u5C3E\u306E /v1 \u3092\u78BA\u8A8D)"+o:e===400?"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: 400 \u30EA\u30AF\u30A8\u30B9\u30C8\u4E0D\u6B63 (\u30E2\u30C7\u30EB\u540D / JSON \u78BA\u8A8D)"+o:"\u30ED\u30FC\u30AB\u30EB AI \u5931\u6557: "+e+o}async function m2(e){let t=e.model||Ur();if(!t)throw new Error("\u30ED\u30FC\u30AB\u30EB AI \u306E\u30E2\u30C7\u30EB\u540D\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o={model:t,messages:e.messages};if(e.maxTokens&&(vd(t)?o.max_completion_tokens=e.maxTokens:o.max_tokens=e.maxTokens),e.stream?.onText)return o.stream=!0,p2(o,e.stream.onText,e.signal);let n=await Nd(Dd(),{method:"POST",headers:_d(),body:JSON.stringify(o),signal:e.signal});if(!n.ok)throw new Error(Rd(n.status,await n.text().catch(()=>"")));return(await n.json()).choices?.[0]?.message?.content||""}async function p2(e,t,o){let n=await Nd(Dd(),{method:"POST",headers:{..._d(),Accept:"text/event-stream"},body:JSON.stringify(e),signal:o});if(!n.ok)throw new Error(Rd(n.status,await n.text().catch(()=>"")));if(!n.body)throw new Error("\u30B9\u30C8\u30EA\u30FC\u30DF\u30F3\u30B0\u5FDC\u7B54\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");let r=n.body.getReader(),a=new TextDecoder,i="",s="";for(;;){let{value:l,done:c}=await r.read();if(c)break;i+=a.decode(l,{stream:!0});let d;for(;(d=i.indexOf(`

`))!==-1;){let p=i.slice(0,d);i=i.slice(d+2);for(let u of p.split(`
`)){let f=u.match(/^data:\s*(.*)$/);if(!f)continue;let g=f[1].trim();if(!(!g||g==="[DONE]"))try{let b=JSON.parse(g).choices?.[0]?.delta?.content;b&&(s+=b,t(b))}catch{}}}}return s}async function u2(e){let t=e.model||Ur();if(!t)throw new Error("\u30ED\u30FC\u30AB\u30EB AI \u306E\u30E2\u30C7\u30EB\u540D\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o=Ad(e.system),n=o?[{role:"system",content:o},...pi(e.messages)]:pi(e.messages),r={model:t,messages:n};if(e.tools&&e.tools.length>0&&(r.tools=Cd(e.tools),r.tool_choice="auto"),e.maxTokens&&(vd(t)?r.max_completion_tokens=e.maxTokens:r.max_tokens=e.maxTokens),e.stream&&(r.stream=!0),e.stream)return f2(r,e.stream,e.signal);let a=await Nd(Dd(),{method:"POST",headers:_d(),body:JSON.stringify(r),signal:e.signal});if(!a.ok)throw new Error(Rd(a.status,await a.text().catch(()=>"")));let s=(await a.json()).choices?.[0];return ml(s?.message,s?.finish_reason)}async function f2(e,t,o){let n=await Nd(Dd(),{method:"POST",headers:{..._d(),Accept:"text/event-stream"},body:JSON.stringify(e),signal:o});if(!n.ok)throw new Error(Rd(n.status,await n.text().catch(()=>"")));if(!n.body)throw new Error("\u30B9\u30C8\u30EA\u30FC\u30DF\u30F3\u30B0\u5FDC\u7B54\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");let r=n.body.getReader(),a=new TextDecoder,i="",s="",l,c=new Map;for(;;){let{value:p,done:u}=await r.read();if(u)break;i+=a.decode(p,{stream:!0});let f;for(;(f=i.indexOf(`

`))!==-1;){let g=i.slice(0,f);i=i.slice(f+2);for(let y of g.split(`
`)){let b=y.match(/^data:\s*(.*)$/);if(!b)continue;let h=b[1].trim();if(!(!h||h==="[DONE]"))try{let x=JSON.parse(h).choices?.[0],w=x?.delta?.content;w&&(s+=w,t.onText?.(w));let T=x?.delta?.tool_calls;if(T)for(let E of T){let B=c.get(E.index)||{id:"",name:"",args:""};E.id&&(B.id=E.id),E.function?.name&&(B.name=E.function.name),E.function?.arguments&&(B.args+=E.function.arguments),c.set(E.index,B)}x?.finish_reason&&(l=x.finish_reason)}catch{}}}}let d={role:"assistant",content:s||null};if(c.size>0&&(d.tool_calls=Array.from(c.entries()).sort(([p],[u])=>p-u).map(([,p])=>({id:p.id,type:"function",function:{name:p.name,arguments:p.args}}))),d.tool_calls&&d.tool_calls.length>0&&t.onToolUse)for(let p of d.tool_calls){let u={};try{u=JSON.parse(p.function.arguments||"{}")}catch{}t.onToolUse({type:"tool_use",id:p.id,name:p.function.name,input:u})}return ml(d,l)}async function Nd(e,t){try{return await fetch(e,t)}catch(o){let n=o.message||"network error";return new Response(n,{status:0,statusText:n})}}var Tf=L(()=>{"use strict";Bt();Bd()});var Mf={};q(Mf,{callClaude:()=>Sf,callClaudeRaw:()=>rx,callClaudeText:()=>ax,getApiKey:()=>qr,setApiKey:()=>Lf});function qr(){return rf()||null}function Lf(e){af(e)}async function rx(e){let t=qr();if(!t)throw new Error("API\u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059");let o={model:e.model||g2,max_tokens:e.maxTokens||4096,messages:e.messages};e.system&&(o.system=e.system),e.tools&&e.tools.length>0&&(o.tools=e.tools),e.stream&&(o.stream=!0);let n=0;for(;;){let r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":t,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true","content-type":"application/json"},body:JSON.stringify(o),signal:e.signal});if(r.ok)return e.stream&&r.body?await h2(r.body,e.stream):await r.json();if(r.status===429&&n<3){let i=parseFloat(r.headers.get("retry-after")||"0"),s=i>0?i*1e3:Math.min(8e3,1e3*Math.pow(2,n));await new Promise(l=>setTimeout(l,s)),n++;continue}let a="";try{let i=await r.json();i.error?.message&&(a=" \u2014 "+i.error.message)}catch{}throw new Error("Claude API\u5931\u6557: "+r.status+a)}}async function h2(e,t){let o=e.getReader(),n=new TextDecoder,r="",a=[],i={},s="end_turn";function l(c,d){if(!d)return;let p;try{p=JSON.parse(d)}catch{return}let u=p;if(c==="content_block_start"){let f=u.index,g=u.content_block;a[f]=g.type==="text"?{type:"text",text:""}:{...g},g.type==="tool_use"&&(i[f]="")}else if(c==="content_block_delta"){let f=u.index,g=u.delta,y=a[f];g.type==="text_delta"&&y&&y.type==="text"?(y.text+=g.text||"",t.onText&&t.onText(g.text||"")):g.type==="input_json_delta"&&(i[f]=(i[f]||"")+(g.partial_json||""))}else if(c==="content_block_stop"){let f=u.index,g=a[f];if(g&&g.type==="tool_use"){try{g.input=i[f]?JSON.parse(i[f]):{}}catch{g.input={}}t.onToolUse&&t.onToolUse(g)}}else if(c==="message_delta"){let f=u.delta;f?.stop_reason&&(s=f.stop_reason)}}for(;;){let{value:c,done:d}=await o.read();if(d)break;r+=n.decode(c,{stream:!0});let p;for(;(p=r.indexOf(`

`))>=0;){let u=r.slice(0,p);r=r.slice(p+2);let f="",g="";for(let y of u.split(`
`))y.startsWith("event:")?f=y.slice(6).trim():y.startsWith("data:")&&(g+=y.slice(5).trim());l(f,g)}}return{content:a.filter(Boolean),stop_reason:s}}async function ax(e,t,o={}){return(await rx({messages:e,system:t,model:o.model,maxTokens:o.maxTokens})).content.filter(r=>r.type==="text").map(r=>r.text).join(`
`)}var g2,Sf,ui=L(()=>{"use strict";Bt();g2="claude-sonnet-4-5";Sf=ax});var Od={};q(Od,{dispatchChat:()=>b2,textOf:()=>v2});async function b2(e){let t=Xs();if(t==="corp"){let{corpAiChatRaw:n}=await Promise.resolve().then(()=>(Bd(),If));return n({...e,model:Fr()})}if(t==="local"){let{localAiChatRaw:n}=await Promise.resolve().then(()=>(Tf(),Ef));return n({...e,model:Ur()})}let{callClaudeRaw:o}=await Promise.resolve().then(()=>(ui(),Mf));return o({...e,model:gd()})}function v2(e){return e.content.filter(t=>t.type==="text").map(t=>t.text).join("")}var Hd=L(()=>{"use strict";Bt()});function x2(e){let t=e.match(/\{[\s\S]*\}/);if(!t)return null;try{let o=JSON.parse(t[0]),n=typeof o.vectorQuery=="string"?o.vectorQuery.trim():"",r=Array.isArray(o.keywords)?o.keywords.filter(i=>typeof i=="string"&&i.trim().length>=2).map(i=>i.trim()).slice(0,4):[],a=o.mode==="keyword"||o.mode==="mixed"||o.mode==="semantic"?o.mode:r.length>0?"mixed":"semantic";return!n&&r.length===0?null:{vectorQuery:n||r.join(" "),keywords:r,mode:a}}catch{return null}}function w2(e){return!e||e.length===0?"":e.slice(-4).map(t=>{let o=t.role==="user"?"\u30E6\u30FC\u30B6":"\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8",n=t.role==="assistant"?300:500,r=t.content.length>n?t.content.slice(0,n)+"\u2026":t.content;return`${o}: ${r}`}).join(`
`)}async function k2(e,t,o){let{dispatchChat:n,textOf:r}=await Promise.resolve().then(()=>(Hd(),Od)),a=await n({messages:[{role:"user",content:t}],system:e,tools:[],signal:o});return r(a)}async function ix(e,t,o){let n=e.trim();if(!n)return Pf(n);let r=w2(t),a=r?`\u76F4\u524D\u306E\u4F1A\u8A71 (\u53E4\u3044\u9806):
${r}

---

\u4ECA\u56DE\u306E\u8CEA\u554F:
${n}`:`\u8CEA\u554F:
${n}`;try{let i=await k2(y2,a,o);return x2(i)??Pf(n)}catch{return Pf(n)}}var y2,Pf,sx=L(()=>{"use strict";y2=["\u3042\u306A\u305F\u306F\u793E\u5185\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8 RAG \u691C\u7D22\u306E\u30AF\u30A8\u30EA\u30EB\u30FC\u30BF\u3067\u3059\u3002\u30E6\u30FC\u30B6\u306E\u8CEA\u554F\u3092\u89E3\u6790\u3057\u3001","\u6B21\u306E JSON \u3092 1 \u884C\u3067\u8FD4\u3057\u3066\u304F\u3060\u3055\u3044 (\u305D\u308C\u4EE5\u5916\u306E\u51FA\u529B\u306F\u7981\u6B62):","",'{"mode":"keyword|semantic|mixed","vectorQuery":"<\u610F\u5473\u691C\u7D22\u7528\u306E\u30AF\u30A8\u30EA>","keywords":["<\u5FC5\u9808\u5B8C\u5168\u4E00\u81F4>", ...]}',"","\u30EB\u30FC\u30EB:","- keywords \u306B\u306F\u300C\u30C1\u30B1\u30C3\u30C8ID / \u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u30B3\u30FC\u30C9 / \u88FD\u54C1\u540D / \u56FA\u6709\u540D\u8A5E / \u578B\u756A / \u65E5\u4ED8\u6307\u5B9A\u300D\u7B49\u306E","  \u5FC5\u305A\u542B\u307E\u308C\u308B\u3079\u304D\u6587\u5B57\u5217\u3060\u3051\u3092\u5165\u308C\u308B (2 \u6587\u5B57\u4EE5\u4E0A\u3001\u6700\u5927 4 \u500B\u307E\u3067)\u3002",'- \u6570\u5B57\u5358\u4F53 (\u4F8B: "2026" "100") \u3084\u3088\u304F\u3042\u308B\u5358\u8A9E (\u4F8B: "\u30E1\u30E2" "\u4EF6" "\u306B\u3064\u3044\u3066" "\u3068\u306F") \u306F keywords \u306B\u5165\u308C\u306A\u3044\u3002',"- vectorQuery \u306B\u306F\u8CEA\u554F\u306E\u300C\u610F\u5473\u7684\u306A\u4E3B\u984C\u300D\u3092 1 \u6587\u3067\u8868\u3059\u3002\u5143\u306E\u6587\u304C\u305D\u306E\u307E\u307E\u4F7F\u3048\u308B\u306A\u3089\u305D\u308C\u3067\u3088\u3044\u3002","  ID/\u56FA\u6709\u540D\u8A5E\u306F keywords \u5074\u306B\u51FA\u3059\u306E\u3067 vectorQuery \u306B\u306F\u542B\u3081\u306A\u304F\u3066\u3082\u3088\u3044\u3002",'- \u7D14\u7C8B\u306B ID/\u30B3\u30FC\u30C9/\u56FA\u6709\u540D\u8A5E\u3060\u3051\u3067\u63A2\u3059\u8CEA\u554F \u2192 mode="keyword"\u3002\u610F\u5473\u3067\u63A2\u3059 \u2192 "semantic"\u3002\u4E21\u65B9\u6DF7\u5728 \u2192 "mixed"\u3002',"","\u2605 \u30D5\u30A9\u30ED\u30FC\u30A2\u30C3\u30D7\u8CEA\u554F (\u76F4\u524D\u4F1A\u8A71\u3092\u8E0F\u307E\u3048\u305F\u7701\u7565\u8868\u73FE) \u306E\u89E3\u6C7A \u2605","- \u300C\u76F4\u524D\u306E\u4F1A\u8A71\u300D\u304C\u4E0E\u3048\u3089\u308C\u305F\u5834\u5408\u3001\u8CEA\u554F\u306B\u542B\u307E\u308C\u308B\u6307\u793A\u8A9E (\u305D\u308C/\u3042\u308C/\u3053\u306E/\u4E0A\u8A18 \u7B49) \u3084\u3001","  \u300C\u8981\u7D04\u3057\u3066\u300D\u300C\u3082\u3063\u3068\u8A73\u3057\u304F\u300D\u300C\u7D9A\u304D\u306F?\u300D\u306E\u3088\u3046\u306A\u524D\u63D0\u304C\u7701\u7565\u3055\u308C\u305F\u8CEA\u554F\u306F\u3001","  \u76F4\u524D\u4F1A\u8A71\u304B\u3089\u4E3B\u984C\u3092\u88DC\u3063\u3066 vectorQuery \u3092\u7D44\u307F\u7ACB\u3066\u308B\u3053\u3068\u3002",'  \u4F8B: \u76F4\u524D user="BERT \u3068\u306F?" / \u4ECA\u56DE user="\u305D\u306E\u6B20\u70B9\u306F?"','      \u2192 vectorQuery="BERT \u306E\u6B20\u70B9", keywords=["BERT"]',"- \u76F4\u524D\u4F1A\u8A71\u3068\u7121\u95A2\u4FC2\u306A\u65B0\u898F\u8CEA\u554F\u306E\u5834\u5408\u306F\u3001\u5C65\u6B74\u3092\u7121\u8996\u3057\u3066\u305D\u306E\u8CEA\u554F\u3060\u3051\u3092\u89E3\u6790\u3059\u308B\u3002","","- \u51FA\u529B\u306F\u53B3\u5BC6\u306B\u6709\u52B9\u306A JSON\u3002\u524D\u5F8C\u306B\u8AAC\u660E\u6587\u3084 ``` \u7B49\u306E\u88C5\u98FE\u306F\u4ED8\u3051\u306A\u3044\u3002"].join(`
`),Pf=e=>({vectorQuery:e,keywords:[],mode:"semantic"})});function cx(e){let t=(e||"").toLowerCase().replace(/\s+/g," ").trim(),o=new Set;for(let n=0;n<t.length-1;n++)o.add(t.slice(n,n+2));return o}function I2(e,t){if(e.size===0)return 0;let o=0;for(let n of e)t.has(n)&&o++;return o/e.size}function mx(){let e=Ea.get().trim().replace(/^\/+|\/+$/g,"");return e?Xo.replace(/\/+$/,"")+"/"+e:null}async function px(e=!1){let t=mx();if(!t)return $n=new Map,Fd=null,0;if(!e&&Fd===t)return $n.size;let o=await ci(t+"/manifest.json").catch(()=>null);if(!o)return $n=new Map,Fd=t,0;let n;try{n=JSON.parse(o)}catch{return 0}let r=[...n.sealed||[]];n.open?.id&&r.push(n.open.id);let a=[];for(let l of r){let c=await ci(t+"/"+l+".json").catch(()=>null);if(c)try{let d=JSON.parse(c);Array.isArray(d.records)&&a.push(...d.records)}catch{}}a.sort((l,c)=>l.seq-c.seq);let i=new Map,s=new Map;for(let l of a){if(!l.messageId)continue;let c=l.messageId+"#"+(l.chunkIdx??0);if(!((s.get(c)??0)>=l.seq)){if(s.set(c,l.seq),l.op==="delete"){i.delete(c);continue}l.emb&&i.set(c,{key:c,messageId:l.messageId,kind:l.kind||"mail",subject:l.subject||"",from:l.from||"",date:l.date||"",body:l.body||"",internetMessageId:l.internetMessageId,docPath:l.docPath,pptxFile:l.pptxFile,pptxServerRelUrl:l.pptxServerRelUrl,slideNo:l.slideNo,slideTitle:l.slideTitle,vec:li(wd(l.emb))})}}return $n=i,Fd=t,i.size}function ux(){let e={mail:0,onenote:0,doc:0,pptx:0,transcript:0};for(let t of $n.values())e[t.kind]=(e[t.kind]||0)+1;return{total:$n.size,byKind:e,enabled:!!mx()}}function fx(e,t,o,n="",r=0){if(lx=0,$n.size===0||o.size===0)return[];let a=li(e),i=a.length,l=r>0&&n.trim().length>0?cx(n):null,c=Math.min(1,Math.max(0,r)),d=[];for(let p of $n.values()){if(!o.has(p.kind))continue;if(p.vec.length!==i){lx++;continue}let u=0;for(let y=0;y<i;y++)u+=a[y]*p.vec[y];let f=Math.max(0,u),g=l?(1-c)*f+c*I2(l,cx(`${p.subject} ${p.body}`)):f;d.push({doc:p,score:g})}return d.sort((p,u)=>u.score-p.score),d.slice(0,t)}var dx,$n,Fd,lx,gx=L(()=>{"use strict";kd();bf();He();ve();dx=["mail","onenote","doc","pptx","transcript"],$n=new Map,Fd=null,lx=0});function E2(){let e=Ta.get().split(",").map(o=>o.trim()).filter(Boolean);return new Set(e.filter(o=>dx.includes(o)))}async function Af(){await Promise.all([di().init(),mi().init(),px().catch(()=>0)])}function Ud(){let e=ux();return{org:di().stats(),user:mi().stats(),extvec:{docs:e.total,enabled:e.enabled}}}async function hx(e,t){let o=[],n=await di().refresh(e,(s,l)=>t?.({scope:"org",done:s,total:l})).catch(s=>{let l=s.message;return console.warn("[rag] org refresh:",l),o.push("\u7D44\u7E54: "+l),{changed:0,skipped:void 0,docs:0}}),r=await mi().refresh(e,(s,l)=>t?.({scope:"user",done:s,total:l})).catch(s=>{let l=s.message;return console.warn("[rag] user refresh:",l),o.push("\u500B\u4EBA: "+l),{changed:0,docs:0}}),a=n.docs??0,i=r.docs??0;return{org:n.changed,user:r.changed,orgSkipped:n.skipped==="not-writer",docsSeen:a+i,orgDocs:a,userDocs:i,errors:o}}async function bx(e,t={}){if(!e.trim())return[];if(!Qs())throw new Error("RAG \u672A\u8A2D\u5B9A: AI \u8A2D\u5B9A\u3067 OpenAI \u4E92\u63DB / \u30ED\u30FC\u30AB\u30EB AI \u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044");await Af();let o=t.topK??df(),n=t.minScore??mf(),r=await ix(e,t.history,t.signal),a=r.vectorQuery||e,i=await Ry(a,t.signal),l=[...di().search(i,o*2,a,Cf,r.keywords),...mi().search(i,o*2,a,Cf,r.keywords)].map(d=>({docKey:d.record.docKey,appPageId:Ts(d.record.docKey),scope:d.record.scope,title:d.record.title,heading:d.record.heading,snippet:d.record.text.slice(0,280),chunkIdx:d.record.chunkIdx,score:d.score})),c=E2();if(c.size)for(let d of fx(i,o*2,c,a,Cf)){let p=d.doc,u=p.subject||p.pptxFile||p.slideTitle||p.docPath||"(\u7121\u984C)";l.push({docKey:"extvec:"+p.messageId,appPageId:"",scope:"extvec",title:u,heading:p.kind==="pptx"&&p.slideNo?`\u30B9\u30E9\u30A4\u30C9 ${p.slideNo}`:void 0,snippet:(p.body||"").slice(0,280),chunkIdx:0,score:d.score,kind:p.kind,from:p.from,date:p.date,imid:p.internetMessageId,body:p.body})}return l.sort((d,p)=>p.score-d.score),l.filter(d=>d.score>=n).slice(0,o)}var Cf,vx=L(()=>{"use strict";W();Bt();yd();wf();sx();gx();ve();Cf=.25});var gl={};q(gl,{attachXChat:()=>_f,closeXChat:()=>Df,hideSearchTab:()=>C2,isXChatOpen:()=>qd,newSearchId:()=>S2,openXChat:()=>Tx,searchSessionTitle:()=>M2,showSearchTab:()=>P2,toggleXChat:()=>L2});function kx(e){if(e.scope==="org")return"\u7D44\u7E54";if(e.scope==="user")return"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8";switch(e.kind){case"mail":return"\u30E1\u30FC\u30EB";case"onenote":return"OneNote";case"pptx":return"PPTX";case"transcript":return"\u6587\u5B57\u8D77\u3053\u3057";case"doc":return"\u6587\u66F8";default:return"外部ベクトル"}}function $d(){if(!yx){yx=!0;try{let e=hc.get(),t=e?JSON.parse(e):[];No=Array.isArray(t)?t:[]}catch{No=[]}}}function Ix(){try{hc.set(JSON.stringify(No.slice(0,T2)))}catch{}}function Bf(){return"x-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function pl(){return No.find(e=>e.id===Ro)??null}function Ex(){Ro=Bf(),ul(),hi(),jd(),fl()}function Se(e){return document.getElementById(e)}function fl(){Se("memola-xchat-input")?.focus()}function qd(){return Se("memola-xchat")?.classList.contains("on")??!1}function Tx(){$d();let e=Se("memola-xchat");e&&($r(),e.classList.add("on"),e.setAttribute("aria-hidden","false"),bc.set("1"),Ro?(ul(),hi()):Ex(),fl(),Kd(),window.addEventListener("resize",$r))}function Df(){let e=Se("memola-xchat");e&&(e.classList.remove("on"),e.setAttribute("aria-hidden","true"),bc.set(""),window.removeEventListener("resize",$r))}function L2(){qd()?Df():Tx()}function $r(){let e=Se("memola-xchat");if(!e)return;let t=Se("memola-content-row");if(t){let o=t.getBoundingClientRect();e.style.top=o.top+"px",e.style.left=o.left+"px",e.style.right="0",e.style.bottom="0"}else{let o=Se("memola-sb");e.style.left=Math.max(0,o?o.getBoundingClientRect().right:280)+"px"}}function S2(){return Bf()}function M2(e){$d();let t=No.find(o=>o.id===e);return t&&t.turns.length&&t.title||"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8"}function P2(e){$d();let t=Se("memola-xchat");t&&(Ro=e,t.classList.add("on"),t.setAttribute("aria-hidden","false"),$r(),ul(),hi(),fl(),Kd(),window.removeEventListener("resize",$r),window.addEventListener("resize",$r))}function C2(){let e=Se("memola-xchat");e&&(e.classList.remove("on"),e.setAttribute("aria-hidden","true"),window.removeEventListener("resize",$r))}function yo(e){let t=Se("memola-xchat-idx");t&&(t.textContent=e)}function A2(e=""){let{org:t,user:o,extvec:n}=Ud(),r=t.chunks+o.chunks;if(r===0&&!n.docs&&!e){yo("\u672A\u30D9\u30AF\u30C8\u30EB\u5316 \u2014 \u300C\u6587\u66F8\u3092\u8AAD\u307F\u8FBC\u307F\u300D\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044");return}let a=`${e}\u30D9\u30AF\u30C8\u30EB\u5316\u6E08: \u7D44\u7E54 ${t.docs}\u6587\u66F8 / \u500B\u4EBA ${o.docs}\u6587\u66F8 \u30FB\u8A08 ${r} \u30C1\u30E3\u30F3\u30AF`;n.enabled&&(a+=` \u30FB外部ベクトル ${n.docs}\u4EF6`),yo(a)}function Kd(e=!1){if(gi&&!e)return gi;let t=Se("memola-xchat-rebuild");return gi=(async()=>{if(!Qs()){yo("\u26A0 \u57CB\u3081\u8FBC\u307F\u672A\u8A2D\u5B9A \u2014 \u8A2D\u5B9A\u2192AI\u3067\u69CB\u6210");return}t?.classList.add("spin");try{yo("\u30A4\u30F3\u30C7\u30C3\u30AF\u30B9\u8AAD\u8FBC\u4E2D\u2026"),await Af(),A2("\u73FE\u5728\u306E");let o=await hx(void 0,s=>{let l=s.scope==="org"?"\u7D44\u7E54":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8";yo(`${l}\u3092\u30D9\u30AF\u30C8\u30EB\u5316\u4E2D\u2026 ${s.done}/${s.total} \u30C1\u30E3\u30F3\u30AF`)});console.log("[xchat] refresh result",o,Ud());let n=o.org+o.user;if(o.errors.length){yo("\u30A8\u30E9\u30FC: "+o.errors.join(" / "));return}let r=Ud(),a=r.org.chunks+r.user.chunks,i=`\u5BFE\u8C61 \u7D44\u7E54${o.orgDocs}/\u500B\u4EBA${o.userDocs}\u6587\u66F8 \u30FB \u30D9\u30AF\u30C8\u30EB\u5316\u6E08 ${a}\u30C1\u30E3\u30F3\u30AF`;if(o.docsSeen===0){yo("\u5BFE\u8C61\u6587\u66F80\u4EF6 \u2014 "+i+" (\u30DA\u30FC\u30B8\u7121\u3057/\u6A29\u9650/\u30EA\u30B9\u30C8\u540D\u3092\u78BA\u8A8D)");return}if(n>0){yo(`\u4ECA\u56DE +${n}\u30C1\u30E3\u30F3\u30AF \u30FB `+i);return}if(o.orgSkipped){yo("\u7D44\u7E54\u306F\u5225\u5229\u7528\u8005\u304C\u66F4\u65B0\u62C5\u5F53 \u30FB "+i);return}yo((a===0?"\u672C\u6587\u306E\u3042\u308B\u6587\u66F8\u304C\u7121\u3044(\u7A7A\u30DA\u30FC\u30B8\u306F\u5BFE\u8C61\u5916) \u30FB ":"\u5909\u66F4\u306A\u3057 \u30FB ")+i)}catch(o){yo("\u7D22\u5F15\u30A8\u30E9\u30FC: "+o.message)}finally{t?.classList.remove("spin")}})(),gi}async function B2(){gi||Kd();try{await gi}catch{}}function D2(e){let t=new Date(e),o=new Date;return t.getFullYear()===o.getFullYear()&&t.getMonth()===o.getMonth()&&t.getDate()===o.getDate()?"\u4ECA\u65E5":o.getTime()-e<30*864e5?"\u904E\u53BB30\u65E5\u9593":"\u53E4\u3044"}function Lx(){let e=Se("memola-xchat-hist-list");if(e){if(e.textContent="",No.length===0){let t=document.createElement("div");t.className="tdr-hist-empty",t.textContent="\u5C65\u6B74\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093",e.appendChild(t);return}for(let t of["\u4ECA\u65E5","\u904E\u53BB30\u65E5\u9593","\u53E4\u3044"]){let o=No.filter(r=>D2(r.created)===t);if(!o.length)continue;let n=document.createElement("div");n.className="tdr-hist-group",n.textContent=t,e.appendChild(n);for(let r of o){let a=document.createElement("div");a.className="tdr-hist-item"+(r.id===Ro?" is-active":""),a.dataset.sid=r.id;let i=document.createElement("span");i.className="chk",i.textContent="\u2713";let s=document.createElement("span");s.className="nm",s.textContent=r.title||"(\u7121\u984C\u306E\u30C1\u30E3\u30C3\u30C8)";let l=document.createElement("button");l.className="del",l.textContent="\xD7",l.title="\u524A\u9664",l.dataset.del=r.id,a.append(i,s,l),e.appendChild(a)}}}}function hi(){let e=Se("memola-xchat-title");if(!e)return;let t=pl();e.textContent=t&&t.turns.length?t.title||"(\u7121\u984C\u306E\u30C1\u30E3\u30C3\u30C8)":"\u65B0\u898F\u30C1\u30E3\u30C3\u30C8"}function jd(){Se("memola-xchat-histmenu")?.classList.remove("on")}function _2(){let e=Se("memola-xchat-histmenu");e&&(e.classList.contains("on")||Lx(),e.classList.toggle("on"))}function N2(e){let t=new Date(e),o=`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`,n=new Date;return t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()&&t.getDate()===n.getDate()?o:`${t.getMonth()+1}/${t.getDate()} ${o}`}function ul(){let e=Se("memola-xchat-thread");if(!e)return;e.textContent="";let t=pl();if(!t||t.turns.length===0){let o=document.createElement("div");o.className="tdr-empty",o.innerHTML='<div class="big">\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8</div><p>memola \u5185\u306E\u5168\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8 (\u7D44\u7E54 + \u81EA\u5206\u306E\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8) \u3092\u6A2A\u65AD\u3057\u3066\u8CEA\u554F\u3067\u304D\u307E\u3059\u3002</p><p style="color:var(--ink-4)">\u56DE\u7B54\u306E\u4E0B\u306B\u53C2\u7167\u3057\u305F\u30BD\u30FC\u30B9\u6587\u66F8\u304C\u51FA\u5178\u3068\u3057\u3066\u8868\u793A\u3055\u308C\u3001\u30AF\u30EA\u30C3\u30AF\u3067\u305D\u306E\u6587\u66F8\u3078\u79FB\u52D5\u3067\u304D\u307E\u3059\u3002</p>',e.appendChild(o);return}for(let o of t.turns){let{body:n}=Sx(e,o.q);Mx(n,o.a,o.sources,o.at)}e.scrollTop=e.scrollHeight}function Sx(e,t){let o=document.createElement("div");o.className="tdr-turn";let n=document.createElement("div");n.className="tdr-q",n.textContent=t;let r=document.createElement("div");r.className="tdr-a-avatar",r.textContent="AI";let a=document.createElement("div");a.className="tdr-a-body";let i=document.createElement("div");return i.className="tdr-a",i.append(r,a),o.append(n,i),e.appendChild(o),{turnEl:o,body:a}}function Mx(e,t,o,n){e.textContent="";let r=document.createElement("div");if(r.className="tdr-a-meta",n){let i=document.createElement("span");i.className="tdr-turn-time",i.textContent=N2(n),r.appendChild(i)}if(o.length){let i=document.createElement("span");i.textContent=`${o.length} \u4EF6\u53C2\u7167`,r.appendChild(i)}let a=document.createElement("div");if(a.className="tdr-answer",a.innerHTML=So(t).replace(/\[(\d+)\]/g,(i,s)=>`<span class="cite" data-n="${s}">[${s}]</span>`),e.append(r,a),o.length){let i=new Set;for(let l of t.matchAll(/\[(\d+)\]/g))i.add(Number(l[1]));let s=O2(e,o,i);F2(a,s)}}function O2(e,t,o){let n=new Map;t.forEach((s,l)=>{let c=n.get(s.docKey);c||(c={items:[]},n.set(s.docKey,c)),c.items.push({s,n:l+1})});let r=o.size>0,a=document.createElement("div");a.className="tdr-sources-h"+(r?" collapsed":""),a.innerHTML=R2+`<span>\u53C2\u7167\u3057\u305F\u6587\u66F8 ${n.size} \u4EF6</span>`;let i=document.createElement("div");i.className="tdr-sources"+(r?" collapsed":""),a.addEventListener("click",()=>{a.classList.toggle("collapsed"),i.classList.toggle("collapsed")});for(let s of n.values())i.appendChild(H2(s.items));return e.append(a,i),i}function H2(e){let o=e.reduce((p,u)=>u.s.score>p.s.score?u:p).s,n=e.map(p=>p.n),r=document.createElement("div");r.className="tdr-hit",r.dataset.ns=n.join(" ");let a=document.createElement("div");a.className="tdr-hit-head";let i=document.createElement("span");i.className="tdr-hit-num",i.textContent=n.length===1?String(n[0]):n.join(",");let s=document.createElement("span");s.className="tdr-hit-subject",s.textContent=o.title;let l=document.createElement("span");if(l.className="tdr-hit-badge",l.textContent=kx(o),a.append(i,s,l),o.score!=null){let p=document.createElement("span");p.className="tdr-hit-score",p.textContent=o.score.toFixed(2),a.appendChild(p)}let c=document.createElement("div");c.className="tdr-hit-snippet";let d=e.length>1?`\uFF08\u4ED6 ${e.length-1} \u7B87\u6240\u304C\u8A72\u5F53\uFF09`:"";return c.textContent=(o.heading?`${o.heading} \u2014 `:"")+o.snippet+d,r.append(a,c),o.appPageId?r.addEventListener("click",()=>{U2(o.appPageId)}):r.style.cursor="default",r}function F2(e,t){e.querySelectorAll(".cite").forEach(o=>{o.addEventListener("click",n=>{n.stopPropagation();let r=o.dataset.n;if(!r)return;let a=t.querySelector(`.tdr-hit[data-ns~="${r}"]`);a&&(t.classList.remove("collapsed"),t.previousElementSibling?.classList.remove("collapsed"),a.scrollIntoView({behavior:"smooth",block:"center"}),a.classList.add("is-flash"),setTimeout(()=>a.classList.remove("is-flash"),1200))})})}async function U2(e){Df();let{doSelect:t}=await Promise.resolve().then(()=>(K(),ie));await t(e)}function z2(e){return["\u3042\u306A\u305F\u306F\u793E\u5185\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u3067\u3059\u3002\u4EE5\u4E0B\u306E\u300C\u629C\u7C8B\u300D\u3060\u3051\u3092\u6839\u62E0\u306B\u3001\u65E5\u672C\u8A9E\u3067\u7C21\u6F54\u304B\u3064\u6B63\u78BA\u306B\u56DE\u7B54\u3057\u3066\u304F\u3060\u3055\u3044\u3002","\u629C\u7C8B\u306B\u7B54\u3048\u304C\u7121\u3044\u5834\u5408\u306F\u63A8\u6E2C\u305B\u305A\u300C\u8A72\u5F53\u3059\u308B\u8A18\u8F09\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u300D\u3068\u8FF0\u3079\u3066\u304F\u3060\u3055\u3044\u3002","\u56DE\u7B54\u4E2D\u3067\u53C2\u7167\u3057\u305F\u629C\u7C8B\u306F [1] \u306E\u3088\u3046\u306B\u756A\u53F7\u3067\u5F15\u7528\u3057\u3066\u304F\u3060\u3055\u3044\u3002","","=== \u629C\u7C8B ===",e.map((o,n)=>{let r=kx(o),a=o.scope==="extvec"&&o.body?o.body.slice(0,2e3):o.snippet,i=o.from||o.date?`
(${[o.from,o.date].filter(Boolean).join(" / ")})`:"";return`[${n+1}] \u6587\u66F8\u300C${o.title}\u300D${o.heading?` / ${o.heading}`:""} (${r})${i}
${a}`}).join(`

`)||"(\u8A72\u5F53\u3059\u308B\u6587\u66F8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F)"].join(`
`)}async function j2(e,t,o,n){let{dispatchChat:r,textOf:a}=await Promise.resolve().then(()=>(Hd(),Od)),i=await r({messages:e,system:t,tools:[],signal:n,stream:{onText:o}});return a(i)}async function xx(){if(zd)return;let e=Se("memola-xchat-input"),t=Se("memola-xchat-thread");if(!e||!t)return;let o=e.value.trim();if(!o)return;if(!Qs()){$2(t,"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8\u306B\u306F\u57CB\u3081\u8FBC\u307F\u8A2D\u5B9A\u304C\u5FC5\u8981\u3067\u3059\u3002\u8A2D\u5B9A \u2192 AI \u2192 \u57CB\u3081\u8FBC\u307F\u30D7\u30ED\u30D0\u30A4\u30C0\u3067\u300CVoyage AI\u300D(\u4E2D\u7D99\u4E0D\u8981\u30FBClaude\u4F75\u7528\u306E\u63A8\u5968) \u3092\u9078\u3093\u3067 API \u30AD\u30FC\u3092\u5165\u308C\u3066\u304F\u3060\u3055\u3044\u3002");return}e.value="",Px(e),zd=!0,wx(!0),fi=new AbortController,(!pl()||pl().turns.length===0)&&(t.textContent="");let{body:n}=Sx(t,o),r=document.createElement("div");r.className="tdr-thinking",r.innerHTML='\u30A4\u30F3\u30C7\u30C3\u30AF\u30B9\u6E96\u5099\u4E2D<span class="tdr-dot"></span><span class="tdr-dot"></span><span class="tdr-dot"></span>',n.appendChild(r),t.scrollTop=t.scrollHeight;try{await B2();let a=q2(o),i=[];for(let b of a.turns)i.push({role:"user",content:b.q},{role:"assistant",content:b.a});r.firstChild.textContent="\u30AF\u30A8\u30EA\u89E3\u6790\u30FB\u95A2\u9023\u6587\u66F8\u3092\u691C\u7D22\u4E2D";let s=await bx(o,{signal:fi.signal,history:i}),l=[...i,{role:"user",content:o}];n.textContent="";let c=document.createElement("div");c.className="tdr-answer",n.appendChild(c);let d="",p=b=>{d+=b,c.textContent=d,t.scrollTop=t.scrollHeight},f=(await j2(l,z2(s),p,fi.signal)||d).trim()||"(\u7A7A\u306E\u5FDC\u7B54)",g=s.map(b=>({docKey:b.docKey,appPageId:b.appPageId,scope:b.scope,title:b.title,heading:b.heading,snippet:b.snippet,chunkIdx:b.chunkIdx,score:b.score,kind:b.kind,from:b.from,date:b.date,body:b.body})),y=Date.now();Mx(n,f,g,y),a.turns.push({q:o,a:f,sources:g,at:y}),a.title||(a.title=o.slice(0,40)),Promise.resolve().then(()=>(qt(),eo)).then(b=>b.updateActiveSearchTitle(a.title)),Ix(),hi()}catch(a){if(a.name==="AbortError")n.textContent="";else{n.textContent="";let i=document.createElement("div");i.className="tdr-err",i.textContent="\u30A8\u30E9\u30FC: "+a.message,n.appendChild(i)}}finally{zd=!1,fi=null,wx(!1),t.scrollTop=t.scrollHeight,fl()}}function q2(e){let t=pl();return t||(t={id:Ro||Bf(),title:e.slice(0,40),created:Date.now(),turns:[]},Ro=t.id,No.unshift(t)),t}function $2(e,t){let o=document.createElement("div");o.className="tdr-turn";let n=document.createElement("div");n.className="tdr-err",n.textContent=t,o.appendChild(n),e.appendChild(o),e.scrollTop=e.scrollHeight}function wx(e){let t=Se("memola-xchat-send");t&&(t.disabled=e)}function Px(e){e.style.height="auto",e.style.height=Math.min(160,e.scrollHeight)+"px"}function _f(){$d(),Se("memola-xchat-launch")?.addEventListener("click",()=>{Promise.resolve().then(()=>(qt(),eo)).then(t=>t.newSearchTab())}),Se("memola-xchat-new")?.addEventListener("click",()=>{Promise.resolve().then(()=>(qt(),eo)).then(t=>t.newSearchTab())}),Se("memola-xchat-close")?.addEventListener("click",()=>{Promise.resolve().then(()=>(qt(),eo)).then(t=>{m.activeTabId&&t.closeTab(m.activeTabId)})}),Se("memola-xchat-rebuild")?.addEventListener("click",()=>{Kd(!0)}),Se("memola-xchat-send")?.addEventListener("click",()=>{xx()});let e=Se("memola-xchat-input");e?.addEventListener("input",()=>Px(e)),e?.addEventListener("keydown",t=>{t.key==="Enter"&&!t.shiftKey&&!t.isComposing&&t.keyCode!==229&&(t.preventDefault(),xx())}),Se("memola-xchat-titlebtn")?.addEventListener("click",t=>{t.stopPropagation(),_2()}),document.addEventListener("click",t=>{let o=Se("memola-xchat-histmenu");if(!o||!o.classList.contains("on"))return;let n=t.target;o.contains(n)||Se("memola-xchat-titlebtn")?.contains(n)||jd()}),Se("memola-xchat-hist-list")?.addEventListener("click",t=>{let o=t.target,n=o.dataset.del;if(n){t.stopPropagation(),No=No.filter(i=>i.id!==n),Ro===n&&(Ro="",Ex()),Ix(),Lx(),ul(),hi();return}let a=o.closest(".tdr-hist-item")?.dataset.sid;a&&(Ro=a,ul(),hi(),jd(),fl(),Promise.resolve().then(()=>(qt(),eo)).then(i=>i.openSearchSessionInActiveTab(a)))}),document.addEventListener("keydown",t=>{if(t.key==="Escape"&&qd()&&Se("memola-xchat-histmenu")?.classList.contains("on")){t.stopPropagation(),jd();return}},!0),document.addEventListener("keydown",t=>{t.key==="Escape"&&qd()&&zd&&fi&&(t.stopPropagation(),fi.abort())},!0)}var T2,No,Ro,fi,zd,yx,gi,R2,bi=L(()=>{"use strict";j();on();ve();vx();yd();T2=50,No=[],Ro="",fi=null,zd=!1,yx=!1,gi=null;R2='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'});var eo={};q(eo,{activateTab:()=>Gd,attachTabs:()=>Rf,closeTab:()=>Bx,newSearchTab:()=>X2,newTab:()=>Wd,openInActiveTab:()=>G2,openPageInNewTab:()=>Y2,openRowInActiveTab:()=>V2,openSearchSessionInActiveTab:()=>J2,renderTabs:()=>et,restoreTabs:()=>Q2,setTabNavInPlace:()=>W2,updateActiveSearchTitle:()=>Z2});function Kn(){return"t"+Date.now().toString(36)+(K2++).toString(36)}function hl(){return m.tabs.find(e=>e.tabId===m.activeTabId)}function gn(e){if(!e)return;let t=fn.indexOf(e);t>=0&&fn.splice(t,1),fn.push(e)}function Cx(e){if(e.kind==="search")return e.title||"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8";if(e.kind==="row")return e.title||"\u7121\u984C";if(e.pageId){let t=A(e.pageId);if(t)return t.title||"\u7121\u984C"}return e.title||"\u65B0\u898F\u30BF\u30D6"}function mt(){let e=rs.get();e[G]={tabs:m.tabs,active:m.activeTabId},rs.set(e)}function W2(e){Kr=e}function Ax(e,t,o){e.kind="page",e.pageId=t,e.title=o,e.searchId=void 0,e.rowDbId=void 0,e.rowId=void 0}function G2(e,t){let o=hl();if(Kr&&o){Ax(o,e,t),et(),mt();return}if(o&&o.kind==="page"&&o.pageId===e){o.title=t,et(),mt();return}if(o&&o.kind==="page"&&!o.pageId){Ax(o,e,t),et(),mt();return}let n=m.tabs.find(a=>a.kind==="page"&&a.pageId===e);if(n){m.activeTabId=n.tabId,gn(n.tabId),n.title=t,et(),mt();return}let r={tabId:Kn(),kind:"page",pageId:e,title:t};m.tabs.push(r),m.activeTabId=r.tabId,gn(r.tabId),et(),mt()}function V2(e,t,o){let n=s=>{s.kind="row",s.rowDbId=e,s.rowId=t,s.title=o,s.pageId=void 0,s.searchId=void 0},r=hl();if(Kr&&r){n(r),et(),mt();return}if(r&&r.kind==="row"&&r.rowId===t&&r.rowDbId===e){r.title=o,et(),mt();return}if(r&&r.kind==="page"&&!r.pageId){n(r),et(),mt();return}let a=m.tabs.find(s=>s.kind==="row"&&s.rowId===t&&s.rowDbId===e);if(a){m.activeTabId=a.tabId,gn(a.tabId),a.title=o,et(),mt();return}let i={tabId:Kn(),kind:"row",rowDbId:e,rowId:t,title:o};m.tabs.push(i),m.activeTabId=i.tabId,gn(i.tabId),et(),mt()}async function Y2(e){let t={tabId:Kn(),kind:"page",pageId:void 0,title:""};m.tabs.push(t),m.activeTabId=t.tabId,gn(t.tabId);let{doSelect:o}=await Promise.resolve().then(()=>(K(),ie));await o(e)}function Wd(){let e={tabId:Kn(),kind:"page",pageId:void 0,title:"\u65B0\u898F\u30BF\u30D6"};m.tabs.push(e),m.activeTabId=e.tabId,gn(e.tabId),et(),mt(),Promise.resolve().then(()=>(K(),ie)).then(t=>t.showView("empty"))}async function Gd(e){let t=m.tabs.find(n=>n.tabId===e);if(!t)return;m.activeTabId=e,gn(e),et(),mt();let o=await Promise.resolve().then(()=>(bi(),gl));if(t.kind==="search"){o.showSearchTab(t.searchId||o.newSearchId());return}if(t.kind==="row"){if(o.hideSearchTab(),t.rowDbId&&t.rowId!=null){Kr=!0;try{let{doSelect:n}=await Promise.resolve().then(()=>(K(),ie));await n(t.rowDbId);let r=m.dbItems.find(a=>a.Id===t.rowId);r&&await(await Promise.resolve().then(()=>(Ho(),Oo))).openRowAsPage(t.rowDbId,r)}finally{Kr=!1}}return}if(o.hideSearchTab(),t.pageId){Kr=!0;try{let{doSelect:n}=await Promise.resolve().then(()=>(K(),ie));await n(t.pageId)}finally{Kr=!1}}else Promise.resolve().then(()=>(K(),ie)).then(n=>n.showView("empty"))}async function X2(){let e=await Promise.resolve().then(()=>(bi(),gl)),t=e.newSearchId(),o={tabId:Kn(),kind:"search",searchId:t,title:"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8"};m.tabs.push(o),m.activeTabId=o.tabId,gn(o.tabId),et(),mt(),e.showSearchTab(t)}async function J2(e){let t=hl(),o=await Promise.resolve().then(()=>(bi(),gl));t&&t.kind==="search"&&(t.searchId=e,t.title=o.searchSessionTitle(e)),et(),mt(),o.showSearchTab(e)}function Z2(e){let t=hl();t&&t.kind==="search"&&(t.title=e||"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8",et(),mt())}async function Bx(e){let t=m.tabs.findIndex(a=>a.tabId===e);if(t<0)return;let o=m.tabs[t].tabId===m.activeTabId;m.tabs.splice(t,1);let n=fn.indexOf(e);if(n>=0&&fn.splice(n,1),!o){et(),mt();return}let r=null;for(let a=fn.length-1;a>=0;a--)if(m.tabs.some(i=>i.tabId===fn[a])){r=fn[a];break}!r&&m.tabs.length&&(r=m.tabs[m.tabs.length-1].tabId),m.activeTabId=r,r?await Gd(r):Wd()}function et(){let e=document.getElementById("memola-tabstrip");if(!e)return;e.textContent="";for(let o of m.tabs){let n=document.createElement("div");n.className="memola-tab"+(o.tabId===m.activeTabId?" on":""),n.dataset.tabId=o.tabId,n.draggable=!0,n.title=Cx(o);let r=document.createElement("span");if(r.className="memola-tab-ic",o.kind==="search")r.innerHTML=$.chat;else if(o.kind==="row")r.textContent="\u{1F4C4}";else{let s=o.pageId?A(o.pageId):null;r.textContent=s?.icon||(s?.type==="database"?"\u{1F5C2}":"\u{1F4C4}")}let a=document.createElement("span");a.className="memola-tab-lbl",a.textContent=Cx(o);let i=document.createElement("button");i.className="memola-tab-x",i.textContent="\xD7",i.title="\u9589\u3058\u308B",i.dataset.close=o.tabId,n.append(r,a,i),e.appendChild(n)}let t=document.createElement("button");t.className="memola-tab-newbtn",t.dataset.new="1",t.title="\u65B0\u3057\u3044\u30BF\u30D6",t.innerHTML=$.plus,e.appendChild(t)}async function Q2(e){let t=rs.get()[G],n=(t?.tabs||[]).filter(r=>r&&(r.kind==="page"&&r.pageId&&A(r.pageId)||r.kind==="search"&&r.searchId||r.kind==="row"&&r.rowDbId&&A(r.rowDbId)&&r.rowId!=null));if(n.length){m.tabs=n.map(i=>i.kind==="search"?{tabId:i.tabId||Kn(),kind:"search",searchId:i.searchId,title:i.title||"\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8"}:i.kind==="row"?{tabId:i.tabId||Kn(),kind:"row",rowDbId:i.rowDbId,rowId:i.rowId,title:i.title||"\u7121\u984C"}:{tabId:i.tabId||Kn(),kind:"page",pageId:i.pageId,title:i.title||""});let r=m.tabs.some(i=>i.tabId===t?.active);m.activeTabId=r?t.active:m.tabs[0].tabId,fn=m.tabs.map(i=>i.tabId),gn(m.activeTabId),et();let a=hl();a&&await Gd(a.tabId);return}if(m.tabs=[],m.activeTabId=null,e){let{doSelect:r}=await Promise.resolve().then(()=>(K(),ie));await r(e)}else Wd()}function Rf(){let e=document.getElementById("memola-tabstrip");e?.addEventListener("click",o=>{let n=o.target;if(n.closest("[data-new]")){Wd();return}let r=n.dataset.close;if(r){o.stopPropagation(),Bx(r);return}let a=n.closest(".memola-tab");a?.dataset.tabId&&Gd(a.dataset.tabId)});let t=null;e?.addEventListener("dragstart",o=>{let n=o.target.closest(".memola-tab");n?.dataset.tabId&&(t=n.dataset.tabId,o.dataTransfer?.setData("text/plain",t),o.dataTransfer&&(o.dataTransfer.effectAllowed="move"),n.classList.add("dragging"))}),e?.addEventListener("dragover",o=>{t&&(o.preventDefault(),o.dataTransfer&&(o.dataTransfer.dropEffect="move"))}),e?.addEventListener("drop",o=>{if(!t)return;o.preventDefault();let n=m.tabs.findIndex(s=>s.tabId===t);if(n<0){t=null;return}let r=o.target.closest(".memola-tab"),a;if(r?.dataset.tabId&&r.dataset.tabId!==t){a=m.tabs.findIndex(l=>l.tabId===r.dataset.tabId);let s=r.getBoundingClientRect();o.clientX>s.left+s.width/2&&a++}else a=m.tabs.length;let[i]=m.tabs.splice(n,1);n<a&&a--,m.tabs.splice(Math.max(0,Math.min(a,m.tabs.length)),0,i),t=null,et(),mt()}),e?.addEventListener("dragend",()=>{t=null,e.querySelectorAll(".memola-tab.dragging").forEach(o=>o.classList.remove("dragging"))})}var K2,fn,Kr,qt=L(()=>{"use strict";j();we();ve();He();Pa();K2=0;fn=[];Kr=!1});function Vd(e){let t=document.createElement("div");return t.id=e.id,t.draggable=!0,t.title=e.title,t.innerHTML=eM,t.addEventListener("dragstart",e.onDragStart),t.addEventListener("dragend",e.onDragEnd),e.onMouseLeave&&t.addEventListener("mouseleave",e.onMouseLeave),(e.container||document.getElementById("memola-overlay")||document.body).appendChild(t),{el:t,positionAt(n){let r=n.getBoundingClientRect();e.centred?(t.style.top=r.top+window.scrollY+(r.height-18)/2+"px",t.style.height="18px"):(t.style.top=r.top+window.scrollY+"px",t.style.height=Math.max(20,Math.min(r.height,32))+"px"),t.style.left=r.left+window.scrollX-24+"px",t.style.display="flex"},hide(){t.style.display="none"},isCursorOnHandle(n,r,a=2){if(t.style.display==="none")return!1;let i=t.getBoundingClientRect();return n>=i.left-a&&n<=i.right+a&&r>=i.top-a&&r<=i.bottom+a}}}function Yd(e,t,o,n=44,r=2){let a=e.getBoundingClientRect();return o>=a.top-r&&o<=a.bottom+r&&t>=a.left-n&&t<=a.right}var eM,Nf=L(()=>{"use strict";eM='<svg viewBox="0 0 10 16" width="10" height="16" fill="currentColor" style="pointer-events:none"><circle cx="2" cy="3" r="1.3"/><circle cx="2" cy="8" r="1.3"/><circle cx="2" cy="13" r="1.3"/><circle cx="8" cy="3" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="8" cy="13" r="1.3"/></svg>'});var Fx={};q(Fx,{attachLibrary:()=>Of,openLibrary:()=>Hx});async function Hx(){m.currentType!=="database"&&await yt().catch(()=>{}),Vn(),m.currentRow=null,m.currentId=null,m.currentType="page",Jd="",at.clear(),te(),Ff("library"),vl([{label:"\u{1F4DA} \u30E9\u30A4\u30D6\u30E9\u30EA"}]),tt("library"),oM(),Fo(),tM().then(()=>{m.currentId===null&&document.getElementById("memola-lib-tbody")&&Fo()})}async function tM(){let e=[ce],t=Jt();t!==ce&&e.push(t);let o=new Map;for(let n of e){let r=J(n,"/items?$select=Id,Modified,Editor/Title&$expand=Editor&$top=500&$orderby=Id"),a=0;for(;r&&a++<20;){let i=await ne(r).catch(()=>null);if(!i)break;for(let s of i.results)o.set(Ir(n,s.Id),{modified:s.Modified||"",editor:s.Editor?.Title||""});r=i.__next}}Ox=o}function Dx(e){let t=n=>!n.IsDraft&&!A(n.Id)?.isTemplate&&(A(n.Id)?.scope==="org"?"org":"user")===bl,o=new Set(m.pages.filter(t).map(n=>n.Id));return m.pages.filter(n=>t(n)?(n.ParentId&&o.has(n.ParentId)?n.ParentId:"")===e:!1).sort((n,r)=>(n.Title||"\u7121\u984C").localeCompare(r.Title||"\u7121\u984C","ja"))}function oM(){let e=I("lib");e.innerHTML='<div class="memola-lib-inner"><div class="memola-lib-hd"><span class="memola-lib-icon">\u{1F4DA}</span><h1 class="memola-lib-title">\u30E9\u30A4\u30D6\u30E9\u30EA</h1></div><div class="memola-lib-tabs"><button class="memola-lib-tab" data-scope="user">\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8</button><button class="memola-lib-tab" data-scope="org">\u{1F310} \u7D44\u7E54</button></div><div class="memola-lib-tb"><input id="memola-lib-search" class="memola-lib-search" type="text" placeholder="\u30DA\u30FC\u30B8\u3092\u691C\u7D22\u2026" value="'+M(Jd)+'"><span class="memola-lib-count" id="memola-lib-count"></span></div><table class="memola-lib-table" id="memola-lib-dt"><thead><tr><th class="memola-th-cb"><input type="checkbox" class="memola-cb" id="memola-lib-cb-all" title="\u3059\u3079\u3066\u9078\u629E"></th><th>\u30BF\u30A4\u30C8\u30EB</th><th>\u7A2E\u5225</th><th>\u66F4\u65B0\u8005</th><th>\u66F4\u65B0\u65E5</th></tr></thead><tbody id="memola-lib-tbody"></tbody></table></div>',e.querySelectorAll(".memola-lib-tab").forEach(o=>{o.dataset.scope===bl&&o.classList.add("on"),o.addEventListener("click",()=>{bl=o.dataset.scope||"user",at.clear(),e.querySelectorAll(".memola-lib-tab").forEach(n=>n.classList.toggle("on",n.dataset.scope===bl)),Fo()})});let t=document.getElementById("memola-lib-search");t?.addEventListener("input",()=>{Jd=t.value,Fo()}),document.getElementById("memola-lib-cb-all")?.addEventListener("change",o=>{let n=o.target.checked,r=Array.from(document.querySelectorAll("#memola-lib-tbody .memola-lib-row")).map(a=>a.dataset.pageId||"").filter(Boolean);n?r.forEach(a=>at.add(a)):r.forEach(a=>at.delete(a)),Fo()})}function nM(e){if(!e)return"\u2014";let t=new Date(e);return isNaN(t.getTime())?"\u2014":t.toLocaleString("ja-JP",{year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"})}function Fo(){let e=document.getElementById("memola-lib-tbody"),t=document.getElementById("memola-lib-count");if(!e)return;let o=Jd.trim().toLowerCase(),n=[],r=0;if(o)m.pages.filter(i=>!i.IsDraft&&!A(i.Id)?.isTemplate&&(A(i.Id)?.scope==="org"?"org":"user")===bl&&(i.Title||"\u7121\u984C").toLowerCase().includes(o)).sort((i,s)=>(i.Title||"\u7121\u984C").localeCompare(s.Title||"\u7121\u984C","ja")).forEach(i=>{n.push(Rx(i,0,!1,!1)),r++});else{let a=(i,s)=>{for(let l of Dx(i)){let d=Dx(l.Id).length>0,p=Xd.has(l.Id);n.push(Rx(l,s,d,p)),r++,d&&p&&a(l.Id,s+1)}};a("",0)}t&&(t.textContent=r+" \u30DA\u30FC\u30B8"),e.innerHTML=r?n.join(""):'<tr><td colspan="5" class="memola-lib-empty">'+(o?"\u8A72\u5F53\u3059\u308B\u30DA\u30FC\u30B8\u304C\u3042\u308A\u307E\u305B\u3093":"\u3053\u306E\u30B9\u30B3\u30FC\u30D7\u306B\u30DA\u30FC\u30B8\u304C\u3042\u308A\u307E\u305B\u3093")+"</td></tr>",e.querySelectorAll(".memola-lib-tog").forEach(a=>{a.addEventListener("click",i=>{i.stopPropagation();let s=a.dataset.pageId||"";s&&(Xd.has(s)?Xd.delete(s):Xd.add(s),Fo())})}),e.querySelectorAll(".memola-cb").forEach(a=>{a.addEventListener("click",i=>i.stopPropagation()),a.addEventListener("change",()=>{let i=a.dataset.id||"";a.checked?at.add(i):at.delete(i);let s=a.closest(".memola-lib-row");s&&s.classList.toggle("memola-tr-sel",a.checked),_x()})}),e.querySelectorAll(".memola-lib-row").forEach(a=>{a.addEventListener("click",()=>{let i=a.dataset.pageId||"";i&&Ue(i)})}),_x()}function _x(){let e=document.getElementById("memola-lib-tbody"),t=document.getElementById("memola-lib-cb-all");if(e&&t){let o=Array.from(e.querySelectorAll(".memola-lib-row")).map(r=>r.dataset.pageId||"").filter(Boolean),n=o.filter(r=>at.has(r)).length;t.checked=o.length>0&&n===o.length,t.indeterminate=n>0&&n<o.length}document.getElementById("memola-lib-dt")?.classList.toggle("memola-has-sel",at.size>0),rM()}function Rx(e,t,o,n){let a=A(e.Id)?.icon||(e.Type==="database"?"\u{1F5C2}":"\u{1F4C4}"),i=Ox.get(e.Id),s=o?'<span class="memola-lib-tog" data-page-id="'+M(e.Id)+'">'+(n?"\u25BE":"\u25B8")+"</span>":'<span class="memola-lib-tog-sp"></span>',l="padding-left:"+(8+t*18)+"px;",c=at.has(e.Id);return'<tr class="memola-lib-row'+(c?" memola-tr-sel":"")+'" data-page-id="'+M(e.Id)+'"><td class="memola-td-cb"><input type="checkbox" class="memola-cb" data-id="'+M(e.Id)+'"'+(c?" checked":"")+'></td><td class="memola-lib-c-title" style="'+l+'">'+s+'<span class="memola-lib-c-ic">'+M(a)+'</span><a class="memola-lib-link">'+M(e.Title||"\u7121\u984C")+"</a></td><td>"+(e.Type==="database"?"\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9":"\u30DA\u30FC\u30B8")+'</td><td class="memola-lib-c-editor">'+M(i?.editor||"\u2014")+'</td><td class="memola-lib-c-date">'+M(i?nM(i.modified):"\u2026")+"</td></tr>"}function rM(){let e=document.getElementById("memola-lib-bulkbar"),t=at.size;if(t===0){e&&e.classList.remove("on");return}e||(e=document.createElement("div"),e.id="memola-lib-bulkbar",e.className="memola-db-bulkbar",e.innerHTML='<span class="memola-db-bulkbar-count"></span><button class="memola-db-bulkbar-btn" data-act="dup">\u8907\u88FD</button><button class="memola-db-bulkbar-btn danger" data-act="del">\u524A\u9664</button><button class="memola-db-bulkbar-btn ghost" data-act="clr">\u89E3\u9664</button>',(document.getElementById("memola-overlay")||document.body).appendChild(e),e.addEventListener("click",n=>{let r=n.target.closest("[data-act]")?.dataset.act;r==="dup"?aM():r==="del"?iM():r==="clr"&&(at.clear(),Fo())}));let o=e.querySelector(".memola-db-bulkbar-count");o&&(o.textContent=t+" \u4EF6\u9078\u629E"),e.classList.add("on")}async function aM(){let e=Array.from(at);if(e.length===0)return;_(!0,"\u8907\u88FD\u4E2D...");let t=0,o=[];try{let n=await Promise.resolve().then(()=>(W(),qe)),r=await Promise.resolve().then(()=>(We(),Ut));for(let a of e){let i=A(a);try{i?.type==="database"?await r.duplicateDb(a,{asTemplate:!1}):await n.apiDuplicatePage(a),t++}catch(s){o.push(s.message)}}at.clear(),te(),Fo(),t&&k(t+" \u4EF6\u8907\u88FD\u3057\u307E\u3057\u305F"),o.length&&k("\u4E00\u90E8\u8907\u88FD\u5931\u6557: "+o[0],"err")}finally{_(!1)}}async function iM(){let e=Array.from(at);if(e.length===0||!confirm(e.length+" \u4EF6\u3092\u524A\u9664(\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5)\u3057\u307E\u3059\u304B?"))return;_(!0,"\u524A\u9664\u4E2D...");let t=0,o=[];try{let n=await Promise.resolve().then(()=>(W(),qe));for(let r of e)try{await n.apiTrashPage(r),t++}catch(a){o.push(a.message)}at.clear(),te(),Fo(),t&&k(t+" \u4EF6\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u30B4\u30DF\u7BB1\u304B\u3089\u5FA9\u5143\u53EF\u80FD\uFF09"),o.length&&k("\u4E00\u90E8\u524A\u9664\u5931\u6557: "+o[0],"err")}finally{_(!1)}}function sM(){let e=document.getElementById("memola-lib");return!!e&&getComputedStyle(e).display!=="none"}function lM(){return xo||(xo=Vd({id:"memola-lib-row-handle",title:"\u30AF\u30EA\u30C3\u30AF\u3067\u9078\u629E",centred:!0,onDragStart:e=>e.preventDefault(),onDragEnd:()=>{},onMouseLeave:e=>{let t=e.relatedTarget;t&&Wn&&Wn.contains(t)||(xo?.hide(),Wn=null)}}),xo.el.addEventListener("click",()=>{let e=Wn?.dataset.pageId||"";e&&(at.has(e)?at.delete(e):at.add(e),Fo())}),xo)}function cM(){Nx||(Nx=!0,document.addEventListener("mousemove",e=>{if(!sM()){xo?.hide(),Wn=null;return}if(xo&&xo.isCursorOnHandle(e.clientX,e.clientY))return;let t=document.getElementById("memola-lib-tbody");if(!t){xo?.hide();return}let o=null;for(let n of Array.from(t.querySelectorAll(".memola-lib-row")))if(Yd(n,e.clientX,e.clientY)){o=n;break}o?o!==Wn&&(Wn=o,lM().positionAt(o)):(xo?.hide(),Wn=null)}))}function Of(){document.getElementById("memola-sb-library")?.addEventListener("click",()=>{Hx()}),cM()}var Jd,bl,Xd,at,Ox,xo,Wn,Nx,Hf=L(()=>{"use strict";j();me();K();_e();Gn();Wr();ht();we();Re();le();W();Tt();Nf();Jd="",bl="user",Xd=new Set,at=new Set,Ox=new Map;xo=null,Wn=null,Nx=!1});var vi={};q(vi,{canGoBack:()=>zf,canGoForward:()=>jf,goBack:()=>dM,goForward:()=>mM,pushHistory:()=>Uf,pushViewHistory:()=>Ff,refreshButtons:()=>Gr});function zx(e,t){return e.pageId===t.pageId&&(e.rowId||0)===(t.rowId||0)&&(e.rowList||"")===(t.rowList||"")&&(e.view||"")===(t.view||"")}function Ff(e){if(Zd)return;let t={pageId:"",view:e};Ze>=0&&zx(ot[Ze],t)||(Ze<ot.length-1&&ot.splice(Ze+1),ot.push(t),ot.length>Ux&&ot.shift(),Ze=ot.length-1,Gr())}function Uf(e,t){if(Zd||!e)return;let o=t?{pageId:e,rowList:t.rowList,rowId:t.rowId}:{pageId:e};Ze>=0&&zx(ot[Ze],o)||(Ze<ot.length-1&&ot.splice(Ze+1),ot.push(o),ot.length>Ux&&ot.shift(),Ze=ot.length-1,Gr())}function zf(){return Ze>0&&qf(ot[Ze-1])}function jf(){return Ze>=0&&Ze<ot.length-1&&qf(ot[Ze+1])}function qf(e){return e?e.view==="library"?!0:e.pageId?m.pages.some(t=>t.Id===e.pageId):!1:!1}async function jx(e){let t=ot[e];if(!t||!qf(t)){ot.splice(e,1),Ze>e&&Ze--,Gr();return}Ze=e,Zd=!0;let o=await Promise.resolve().then(()=>(qt(),eo));o.setTabNavInPlace(!0);try{if(t.view==="library")await(await Promise.resolve().then(()=>(Hf(),Fx))).openLibrary();else if(await(await Promise.resolve().then(()=>(K(),ie))).doSelect(t.pageId),t.rowId&&t.rowList){let r=m.dbItems.find(a=>a.Id===t.rowId);r&&await(await Promise.resolve().then(()=>(Ho(),Oo))).openRowAsPage(t.pageId,r)}}finally{Zd=!1,o.setTabNavInPlace(!1)}Gr()}async function dM(){zf()&&await jx(Ze-1)}async function mM(){jf()&&await jx(Ze+1)}function Gr(){let e=document.getElementById("memola-nav-back"),t=document.getElementById("memola-nav-fwd");e&&(e.disabled=!zf(),e.classList.toggle("disabled",e.disabled)),t&&(t.disabled=!jf(),t.classList.toggle("disabled",t.disabled))}var Ux,ot,Ze,Zd,Gn=L(()=>{"use strict";j();Ux=100,ot=[],Ze=-1,Zd=!1});var em={};q(em,{renderBacklinks:()=>uM});function pM(e){let t=A(e);return t?t.title:null}function Kf(e){let t=document.getElementById(e);t&&(t.style.display="none",t.innerHTML="")}async function uM(){let e=m.currentId,t=!!e&&m.currentType==="page"&&!m.currentRow,o=!!e&&m.currentType==="database",n=t?Qd:o?$f:null;if(Kf(n===Qd?$f:Qd),!n){Kf(Qd),Kf($f);return}let r=document.getElementById(n);if(!r||!e)return;r.style.display="",r.innerHTML='<div class="memola-bl-hd"><span class="memola-bl-icon">\u{1F517}</span><span class="memola-bl-title">\u30EA\u30F3\u30AF\u5143</span><span class="memola-bl-count">\u2026</span></div><div class="memola-bl-body"><div class="memola-bl-loading">\u30B9\u30AD\u30E3\u30F3\u4E2D\u2026</div></div>';let a=[];try{a=await bs(e,pM)}catch{r.querySelector(".memola-bl-body").innerHTML='<div class="memola-bl-empty">\u30EA\u30F3\u30AF\u5143\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F</div>';return}if(m.currentId!==e)return;if(a.length===0){r.style.display="none",r.innerHTML="";return}let i=r.querySelector(".memola-bl-count");i&&(i.textContent=String(a.length));let s=r.querySelector(".memola-bl-body");s&&(s.innerHTML=a.map(l=>{let d=A(l.pageId)?.icon||"\u{1F4C4}",p=l.count>1?'<span class="memola-bl-badge">\xD7'+l.count+"</span>":"";return'<div class="memola-bl-item" data-page-id="'+M(l.pageId)+'"><div class="memola-bl-row"><span class="memola-bl-item-icon">'+M(d)+'</span><span class="memola-bl-item-name">'+M(l.pageTitle)+"</span>"+p+"</div>"+(l.snippet?'<div class="memola-bl-snippet">'+M(l.snippet)+"</div>":"")+"</div>"}).join(""),s.querySelectorAll(".memola-bl-item").forEach(l=>{l.addEventListener("click",async()=>{let c=l.dataset.pageId||"";if(!c)return;await(await Promise.resolve().then(()=>(K(),ie))).doSelect(c)})}))}var Qd,$f,tm=L(()=>{"use strict";j();vs();Re();we();Qd="memola-backlinks",$f="memola-backlinks-db"});var bn={};q(bn,{clearComments:()=>bM,closePopover:()=>wM,currentCommentTarget:()=>gM,currentCommentsContext:()=>Jf,focusComment:()=>PM,loadCommentsFor:()=>hM,openCommentPopover:()=>tw,pollComments:()=>vM});function Jf(){if(!Dt||to.length===0)return"";let e=r=>(r||"").replace(/\s*\n\s*/g," ").trim(),t=["\u2500\u2500 \u3053\u306E\u30DA\u30FC\u30B8\u306E\u30B3\u30E1\u30F3\u30C8 \u2500\u2500"],o=40,n=0;for(let r of to){if(n>=o){t.push("\u2026 (\u4EE5\u964D\u306E\u30B3\u30E1\u30F3\u30C8\u306F\u7701\u7565)");break}let a=r.root.Scope==="user"?"\u500B\u4EBA":"\u7D44\u7E54",i=r.resolved?" [\u89E3\u6C7A\u6E08\u307F]":"",s=r.root.AnchorText?` (\u5BFE\u8C61: ${e(r.root.AnchorText)})`:"";t.push(`- [${a}]${i} ${r.root.AuthorName||"\u8AB0\u304B"}: ${e(r.root.Body)}${s}`),n++;for(let l of r.replies){if(n>=o)break;t.push(`    \u2514 ${l.AuthorName||"\u8AB0\u304B"}: ${e(l.Body)}`),n++}}return t.join(`
`)}function gM(){if(m.currentRow){let e=A(m.currentRow.dbId);return{pageId:"row:"+m.currentRow.listTitle+":"+m.currentRow.itemId,scope:e?.scope==="org"?"org":"user"}}if(m.currentType==="page"&&m.currentId){let e=A(m.currentId);return{pageId:Cs(m.currentId),scope:e?.scope==="org"?"org":"user"}}return null}function Zf(){return document.getElementById("memola-overlay")||document.body}function Yr(){return document.getElementById("memola-comments-pane")}function ki(){return document.getElementById("memola-comments-list")}function Wx(e){return Kx[Math.abs(e||0)%Kx.length]}function Gx(e){return(e||"\uFF1F").trim().charAt(0).toUpperCase()||"\uFF1F"}function im(e){return e.replace(/"/g,'\\"')}async function hM(e,t){Dt=e,Xf=t,Vr=t,Yn="",xi=0,xM(),Zt(e);try{let o=await Uc(e);if(await $c(o),await ew(o),Dt!==e)return;to=Fc(o)}catch{to=[]}yl=to.length>0,nw(),Xn(),IM()}function bM(){Dt="",to=[],ow(),Jn(),hn(),om="",Vf();let e=Yr();e&&e.classList.remove("on")}async function Xr(){if(!Dt)return;let e=await Uc(Dt);await $c(e),await ew(e),to=Fc(e),nw(),Xn()}async function vM(){if(!Dt)return;let e=Yr();e&&e.contains(document.activeElement)&&document.activeElement!==document.body||Ve||(Zt(Dt),await Xr())}async function ew(e){let t=new Set;for(let o of e){o.AuthorId&&o.AuthorName&&nm.set(o.AuthorId,o.AuthorName);let n=ks(o);for(let r of Object.values(n))for(let a of r)t.add(a)}await Promise.all(Array.from(t).map(async o=>{nm.has(o)||nm.set(o,await Ra(o).catch(()=>"")||"\u30E6\u30FC\u30B6\u30FC#"+o)}))}function yM(e){let t=m.meta.myUserId||-1;return e.map(o=>o===t?"\u3042\u306A\u305F":nm.get(o)||"\u30E6\u30FC\u30B6\u30FC#"+o).join(", ")}function xM(){let e=Yr();if(e&&!$x){$x=!0,e.querySelector("#memola-comments-x")?.addEventListener("click",()=>{yl=!1,Vf(),Xn()});let t=ki();t?.addEventListener("click",EM),t?.addEventListener("mouseover",r=>{let a=r.target.closest(".memola-cmt-thread");if(!a)return;let i=a.dataset.blockId||"";i!==om&&(om=i,iw(i))}),t?.addEventListener("mouseout",r=>{r.relatedTarget?.closest?.(".memola-cmt-thread")||(om="",Vf())}),t?.addEventListener("input",r=>{let a=r.target.closest(".memola-cmt-reply-inp");a&&Zx(a)}),t?.addEventListener("keydown",r=>{let a=r;if(Qx(a)){a.stopPropagation();return}if(a.isComposing||a.keyCode===229)return;let i=a.target.closest(".memola-cmt-reply-inp");if(i&&a.key==="Enter"&&!a.shiftKey){a.preventDefault();let s=i.closest(".memola-cmt-thread")?.dataset.root||"";sw(s)}}),e.querySelector("#memola-comments-add")?.addEventListener("click",()=>void Jx());let n=e.querySelector("#memola-comments-ta");n?.addEventListener("input",()=>{n&&Zx(n)}),n?.addEventListener("keydown",r=>{let a=r;if(Qx(a)){a.stopPropagation();return}a.isComposing||a.keyCode===229||a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),Jx())}),n?.addEventListener("blur",()=>setTimeout(hn,150)),e.querySelector("#memola-comments-scope-org")?.addEventListener("click",()=>{Vr="org",rm()}),e.querySelector("#memola-comments-scope-user")?.addEventListener("click",()=>{Vr="user",rm()}),e.querySelector("#memola-comments-target-x")?.addEventListener("click",()=>{Yn="",rm()})}}function tw(e,t){if(e!==Dt)return;yl=!0,Yn=t,Vr=Xf,Xn();let o=ki();t&&o&&o.querySelector('.memola-cmt-thread[data-block-id="'+im(t)+'"]')?.scrollIntoView({block:"center"}),Yr()?.querySelector("#memola-comments-ta")?.focus()}function wM(){Jn()}function ow(){for(let e of am)e.remove();am.length=0}function nw(){ow();let e=Vp(to);for(let[t,o]of e){if(!t)continue;let n=document.createElement("div");n.className="memola-cmt-marker",n.dataset.blockId=t,n.textContent=o>1?"\u{1F4AC}"+o:"\u{1F4AC}",n.title="\u30B3\u30E1\u30F3\u30C8 "+o+" \u4EF6",n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),tw(Dt,t)}),Zf().appendChild(n),am.push(n)}rw()}function rw(){let e=Ce(),o=(document.getElementById("memola-ea")||e).getBoundingClientRect().right;for(let n of am){let r=e.querySelector('[data-block-id="'+im(n.dataset.blockId||"")+'"]');if(!r){n.style.display="none";continue}n.style.display="";let a=r.getBoundingClientRect(),i=kM(r),s=n.offsetHeight||20,l=n.offsetWidth||24;n.style.top=i.top+window.scrollY+(i.height-s)/2+"px";let c=Math.min(a.right+8,o-l-4);n.style.left=c+window.scrollX+"px"}}function kM(e){try{let n=document.createRange();n.selectNodeContents(e);let r=n.getClientRects();for(let a=0;a<r.length;a++)if(r[a].height>0)return{top:r[a].top,height:r[a].height}}catch{}let t=e.getBoundingClientRect(),o=parseFloat(window.getComputedStyle(e).lineHeight);return{top:t.top,height:isFinite(o)&&o>0?Math.min(o,t.height):t.height}}function Gf(){Wf==null&&(Wf=window.requestAnimationFrame(()=>{Wf=null,rw()}))}function IM(){qx||(qx=!0,window.addEventListener("scroll",Gf,!0),window.addEventListener("resize",Gf),Ce().addEventListener("input",Gf))}function Vx(e){let t=ks(e),o=m.meta.myUserId||-1,n=Object.entries(t).filter(([,r])=>r.length>0).map(([r,a])=>{let i=a.includes(o)?" mine":"",s=M(yM(a));return'<button class="memola-cmt-react-chip'+i+'" data-act="react-toggle" data-id="'+e.Id+'" data-emoji="'+M(r)+'" title="'+s+'">'+r+" "+a.length+"</button>"});return n.length?'<div class="memola-cmt-reacts">'+n.join("")+"</div>":""}function Yx(e,t,o=!0){let n=e.AuthorId===(m.meta.myUserId||-1),r=e.Created?Sn(Date.parse(e.Created)):"";if(e.Deleted)return'<div class="memola-cmt-c deleted"><div class="memola-cmt-main"><div class="memola-cmt-body muted">\uFF08\u524A\u9664\u3055\u308C\u305F\u30B3\u30E1\u30F3\u30C8\uFF09</div></div></div>';if(xi===e.Id)return'<div class="memola-cmt-c editing" data-id="'+e.Id+'"><div class="memola-cmt-avatar" style="background:'+Wx(e.AuthorId)+'">'+M(Gx(e.AuthorName||""))+'</div><div class="memola-cmt-main"><textarea class="memola-cmt-edit-ta">'+M(e.Body)+'</textarea><div class="memola-cmt-editacts"><button class="memola-btn s" data-act="edit-save" data-id="'+e.Id+'">\u4FDD\u5B58</button><button class="memola-btn ghost" data-act="edit-cancel">\u53D6\u6D88</button></div></div></div>';let a=t&&e.Scope==="user"?'<span class="memola-cmt-badge priv">\u{1F512}</span>':"",i=M((e.Body||"").replace(/\r\n?/g,`
`).trim()).replace(/\n/g,"<br>"),s=e.Edited?'<span class="memola-cmt-edited">\u7DE8\u96C6\u6E08\u307F</span>':"",l=o?'<div class="memola-cmt-hover"><button class="memola-cmt-hbtn" data-act="react" data-id="'+e.Id+'" title="\u30EA\u30A2\u30AF\u30B7\u30E7\u30F3">\u{1F642}<sup>+</sup></button>'+(t?'<button class="memola-cmt-hbtn" data-act="resolve" data-root="'+e.Id+'" title="\u89E3\u6C7A">\u2713</button>':"")+(n?'<button class="memola-cmt-hbtn" data-act="more" data-id="'+e.Id+'" title="\u305D\u306E\u4ED6">\u22EF</button>':"")+"</div>":"",c='<div class="memola-cmt-avatar" style="background:'+Wx(e.AuthorId)+'">'+M(Gx(e.AuthorName||""))+"</div>";return t?'<div class="memola-cmt-c" data-id="'+e.Id+'">'+c+'<div class="memola-cmt-main"><div class="memola-cmt-line1"><span class="memola-cmt-author">'+M(e.AuthorName||"\u8AB0\u304B")+'</span><span class="memola-cmt-time">'+M(r)+"</span>"+s+a+'</div><div class="memola-cmt-body">'+i+"</div>"+Vx(e)+"</div>"+l+"</div>":'<div class="memola-cmt-c reply" data-id="'+e.Id+'" title="'+M(r)+'">'+c+'<div class="memola-cmt-main"><div class="memola-cmt-replyline"><span class="memola-cmt-author">'+M(e.AuthorName||"\u8AB0\u304B")+'</span> <span class="memola-cmt-body inline">'+i+"</span> "+s+"</div>"+Vx(e)+"</div>"+l+"</div>"}function Xx(e){let t=e.blockId?'<div class="memola-cmt-anchor">'+M(e.root.AnchorText||"\uFF08\u30D6\u30ED\u30C3\u30AF\uFF09")+"</div>":"",o=e.replies.length?'<div class="memola-cmt-replies">'+e.replies.map(a=>Yx(a,!1,!0)).join("")+"</div>":"",n=e.root.AuthorId===(m.meta.myUserId||-1),r='<div class="memola-cmt-thread-hover"><button class="memola-cmt-hbtn" data-act="react" data-id="'+e.root.Id+'" title="\u30EA\u30A2\u30AF\u30B7\u30E7\u30F3">\u{1F642}<sup>+</sup></button><button class="memola-cmt-hbtn" data-act="resolve" data-root="'+e.root.Id+'" title="\u89E3\u6C7A">\u2713</button>'+(n?'<button class="memola-cmt-hbtn" data-act="more" data-id="'+e.root.Id+'" title="\u305D\u306E\u4ED6">\u22EF</button>':"")+"</div>";return'<div class="memola-cmt-thread'+(e.resolved?" resolved":"")+'" data-root="'+e.root.Id+'"'+(e.blockId?' data-block-id="'+M(e.blockId)+'"':"")+">"+r+(e.resolved?'<div class="memola-cmt-resolved-tag">\u2713 \u89E3\u6C7A\u6E08\u307F</div>':"")+t+Yx(e.root,!0,!1)+o+'<div class="memola-cmt-replybar"><input class="memola-cmt-reply-inp" type="text" placeholder="\u8FD4\u4FE1..."><button class="memola-cmt-reply-send" data-act="reply" data-root="'+e.root.Id+'">\u21B5</button></div></div>'}function Xn(){let e=Yr(),t=ki();if(!e||!t)return;if(!yl||!Dt){e.classList.remove("on");return}e.classList.add("on");let o=Ce(),n=new Map;o.querySelectorAll("[data-block-id]").forEach((l,c)=>{let d=l.dataset.blockId;d&&!n.has(d)&&n.set(d,c)});let r=l=>l.blockId?n.get(l.blockId)??Number.MAX_SAFE_INTEGER:-1,a=(l,c)=>r(l)-r(c),i=to.filter(l=>!l.resolved).sort(a),s=to.filter(l=>l.resolved).sort(a);t.innerHTML=i.length||s.length?i.map(Xx).join("")+(s.length?'<div class="memola-cmt-resolved-sep">\u89E3\u6C7A\u6E08\u307F</div>'+s.map(Xx).join(""):""):'<div class="memola-cmt-empty">\u307E\u3060\u30B3\u30E1\u30F3\u30C8\u306F\u3042\u308A\u307E\u305B\u3093\u3002<br>\u30D6\u30ED\u30C3\u30AF\u306E \u22EE\u22EE \u304B\u3089\u300C\u{1F4AC} \u30B3\u30E1\u30F3\u30C8\u300D\u3001\u307E\u305F\u306F\u30C4\u30FC\u30EB\u30D0\u30FC\u306E \u{1F4AC} \u3067\u8FFD\u52A0\u3067\u304D\u307E\u3059\u3002</div>',rm()}function rm(){let e=Yr();if(!e)return;let t=e.querySelector("#memola-comments-scope-org"),o=e.querySelector("#memola-comments-scope-user");t?.classList.toggle("on",Vr==="org"),o?.classList.toggle("on",Vr==="user");let n=e.querySelector("#memola-comments-target"),r=e.querySelector("#memola-comments-target-lbl");n&&r&&(Yn?(n.style.display="",r.textContent="\u21B3 "+(aw(Yn)||"\u3053\u306E\u30D6\u30ED\u30C3\u30AF")):n.style.display="none")}function aw(e){return e?(Ce().querySelector('[data-block-id="'+im(e)+'"]')?.textContent||"").trim().slice(0,80):""}function iw(e){let t=Ce();if(t.querySelectorAll(".memola-cmt-block-active").forEach(n=>n.classList.remove("memola-cmt-block-active")),!e)return;let o=t.querySelector('[data-block-id="'+im(e)+'"]');o&&o.classList.add("memola-cmt-block-active")}function Vf(){Ce().querySelectorAll(".memola-cmt-block-active").forEach(e=>e.classList.remove("memola-cmt-block-active"))}function xl(e){for(let t of to){if(t.root.Id===e)return t.root;let o=t.replies.find(n=>n.Id===e);if(o)return o}return null}function EM(e){let o=e.target.closest("[data-act]");if(!o)return;let n=o.dataset.act,r=Number(o.dataset.id||0);if(n==="resolve"){TM(o.dataset.root||"");return}if(n==="reply"){sw(o.dataset.root||"");return}if(n==="react"){SM(o,r);return}if(n==="react-toggle"){lw(r,o.dataset.emoji||"");return}if(n==="more"){CM(o,r);return}if(n==="edit"){xi=r,Jn(),Xn();return}if(n==="edit-cancel"){xi=0,Xn();return}if(n==="edit-save"){LM(r);return}if(n==="del"){Jn(),cw(r);return}}async function Jx(){let e=Yr()?.querySelector("#memola-comments-ta"),t=(e?.value||"").trim();if(!t)return;let o=e&&wi.get(e)||[];try{await jc({pageId:Dt,blockId:Yn,body:t,scope:Vr,anchorText:aw(Yn),mentions:o}),e&&(e.value="",wi.delete(e)),Yn="",await Xr()}catch(n){k("\u30B3\u30E1\u30F3\u30C8\u8FFD\u52A0\u5931\u6557: "+n.message,"err")}}async function sw(e){let t=xl(Number(e));if(!t)return;let o=ki()?.querySelector('.memola-cmt-thread[data-root="'+e+'"] .memola-cmt-reply-inp'),n=(o?.value||"").trim();if(!n)return;let r=o&&wi.get(o)||[];try{await jc({pageId:Dt,blockId:t.BlockId,body:n,scope:t.Scope,threadRootId:e,mentions:r}),o&&wi.delete(o),await Xr()}catch(a){k("\u8FD4\u4FE1\u5931\u6557: "+a.message,"err")}}async function TM(e){let t=xl(Number(e));if(t)try{await Zp(t,!(t.Resolved>0)),await Xr()}catch(o){k("\u89E3\u6C7A\u72B6\u614B\u306E\u5909\u66F4\u5931\u6557: "+o.message,"err")}}async function lw(e,t){let o=xl(e);if(!(!o||!t))try{await Qp(o,t),await Xr()}catch(n){k("\u30EA\u30A2\u30AF\u30B7\u30E7\u30F3\u5931\u6557: "+n.message,"err")}}async function LM(e){let t=xl(e);if(!t)return;let n=(ki()?.querySelector('.memola-cmt-c.editing[data-id="'+e+'"] .memola-cmt-edit-ta')?.value||"").trim();if(n)try{await Jp({...t,Body:n}),xi=0,await Xr()}catch(r){k("\u7DE8\u96C6\u5931\u6557: "+r.message,"err")}}async function cw(e){let t=xl(e);if(!t)return;let n=to.find(a=>a.root.Id===e)?.replies??[],r=n.length?"\u3053\u306E\u30B3\u30E1\u30F3\u30C8\u3068\u8FD4\u4FE1 "+n.length+" \u4EF6\u3092\u524A\u9664\u3057\u307E\u3059\u304B?":"\u3053\u306E\u30B3\u30E1\u30F3\u30C8\u3092\u524A\u9664\u3057\u307E\u3059\u304B?";if(confirm(r))try{for(let a of n)await qc(a);await qc(t),await Xr()}catch(a){k("\u524A\u9664\u5931\u6557: "+a.message,"err")}}function Jn(){yi&&(yi.remove(),yi=null),document.removeEventListener("mousedown",dw,!0)}function dw(e){yi&&!yi.contains(e.target)&&Jn()}function mw(e,t){Jn(),yi=t,Zf().appendChild(t);let o=e.getBoundingClientRect();t.style.left=Math.min(o.left+window.scrollX,window.scrollX+window.innerWidth-(t.offsetWidth||180)-8)+"px",t.style.top=o.bottom+window.scrollY+4+"px",setTimeout(()=>document.addEventListener("mousedown",dw,!0),0)}function SM(e,t){let o=document.createElement("div");o.className="memola-cmt-float memola-cmt-react-palette";for(let n of fM){let r=document.createElement("button");r.className="memola-cmt-react-opt",r.textContent=n,r.addEventListener("mousedown",a=>{a.preventDefault(),Jn(),lw(t,n)}),o.appendChild(r)}mw(e,o)}async function Zx(e){if(Xf!=="org"){hn();return}let t=e.selectionStart??e.value.length,n=e.value.slice(0,t).match(/@([^\s@]*)$/);if(!n){hn();return}let r=await Wb(n[1]);if(!r.length){hn();return}MM(e,r,t-n[0].length)}function MM(e,t,o){hn();let n=document.createElement("div");n.className="memola-cmt-float memola-mention-pop",Ve={el:e,float:n,items:t,active:0,matchStart:o},Yf(),Zf().appendChild(n);let r=e.getBoundingClientRect();n.style.left=r.left+window.scrollX+"px",n.style.top=r.bottom+window.scrollY+4+"px"}function Yf(){Ve&&(Ve.float.innerHTML=Ve.items.map((e,t)=>'<button class="memola-mention-item'+(t===Ve.active?" active":"")+'" data-i="'+t+'"><span class="memola-mention-name">'+M(e.title)+'</span><span class="memola-mention-email">'+M(e.email)+"</span></button>").join(""),Ve.float.querySelectorAll(".memola-mention-item").forEach(e=>{e.addEventListener("mousedown",t=>{t.preventDefault(),pw(Number(e.dataset.i))})}))}function pw(e){if(!Ve)return;let t=Ve.items[e],o=Ve.el;if(!t){hn();return}let n=o.selectionStart??o.value.length,r="@"+t.title+" ",a=o.value.slice(0,Ve.matchStart),i=o.value.slice(n);o.value=a+r+i;let s=(a+r).length;o.setSelectionRange(s,s);let l=wi.get(o)||[];l.push(t.id),wi.set(o,l),hn(),o.focus()}function hn(){Ve&&(Ve.float.remove(),Ve=null)}function Qx(e){return Ve?e.key==="ArrowDown"?(Ve.active=Math.min(Ve.items.length-1,Ve.active+1),Yf(),e.preventDefault(),!0):e.key==="ArrowUp"?(Ve.active=Math.max(0,Ve.active-1),Yf(),e.preventDefault(),!0):e.key==="Enter"?(e.preventDefault(),pw(Ve.active),!0):e.key==="Escape"?(e.preventDefault(),hn(),!0):!1:!1}function PM(e,t){yl=!0;let o=n=>{if(Dt!==e){n<25&&setTimeout(()=>o(n+1),150);return}Xn();let r=ki()?.querySelector('.memola-cmt-c[data-id="'+t+'"]');if(r){let a=r.closest(".memola-cmt-thread");a?.scrollIntoView({block:"center"}),r.classList.add("memola-cmt-flash"),setTimeout(()=>r.classList.remove("memola-cmt-flash"),1600),iw(a?.dataset.blockId||"");return}n<25&&setTimeout(()=>o(n+1),150)};o(0)}function CM(e,t){let o=document.createElement("div");o.className="memola-cmt-float memola-cmt-more";let n=(r,a)=>{let i=document.createElement("button");return i.className="memola-cmt-more-item",i.textContent=r,i.dataset.act=a,i.dataset.id=String(t),i.addEventListener("mousedown",s=>{s.preventDefault(),Jn(),a==="edit"?(xi=t,Xn()):a==="del"&&cw(t)}),i};o.appendChild(n("\u7DE8\u96C6","edit")),o.appendChild(n("\u524A\u9664","del")),mw(e,o)}var Dt,Xf,to,am,yl,Yn,Vr,xi,qx,$x,om,wi,Ve,nm,fM,Kx,Wf,yi,Uo=L(()=>{"use strict";j();me();le();Re();To();we();Xt();Oc();W();Es();Dt="",Xf="user",to=[],am=[],yl=!0,Yn="",Vr="user",xi=0,qx=!1,$x=!1,om="",wi=new WeakMap,Ve=null,nm=new Map,fM=["\u{1F44D}","\u2764\uFE0F","\u{1F389}","\u{1F604}","\u{1F64F}","\u{1F440}"],Kx=["#e07a5f","#3d82c4","#5a9e6f","#b06fb0","#c99a3b","#4aa3a3","#c4677b","#7a82c4"];Wf=null;yi=null});var Oo={};q(Oo,{backToDb:()=>fw,openRowAsPage:()=>AM,saveCurrentRow:()=>BM});async function AM(e,t){let o=m.dbList;if(!o||!t)return;m.currentRow={listTitle:o,itemId:t.Id,dbId:e},m.currentType="page",Promise.resolve().then(()=>(Gn(),vi)).then(y=>y.pushHistory(e,{rowList:o,rowId:t.Id})),tt("page");let n=I("ttl");n.value=t.Title||"",Mn(n);let r=await fo(o,t.Id),a=r?Ye(r):[],i=Ce(),{mountEditor2:s,loadBlocks:l}=await Promise.resolve().then(()=>(bt(),zo));s(i),l(a);let c=document.getElementById("memola-row-props");c&&xy(c,m.dbFields,t,o);let d=I("pg-icon"),p=document.getElementById("memola-add-icon");d&&(d.style.display="none"),p&&(p.style.display="");let u=m.pages.find(y=>y.Id===e),f=Vc(o)?"\u{1F4C5} \u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8":u?.Title||"\u7121\u984CDB";vl([{label:f,onClick:()=>{fw(e)}},{label:t.Title||"\u7121\u984C"}]);let g=t.Modified||null;Jo(g),m.dirty=!1,Promise.resolve().then(()=>(tm(),em)).then(y=>y.renderBacklinks()),Promise.resolve().then(()=>(Uo(),bn)).then(y=>{let b=y.currentCommentTarget();b&&y.loadCommentsFor(b.pageId,b.scope)}),Promise.resolve().then(()=>(qt(),eo)).then(y=>y.openRowInActiveTab(e,t.Id,t.Title||"\u7121\u984C"))}async function BM(){if(!m.currentRow)return;let t=(I("ttl").value||"").trim()||"\u7121\u984C",{getBlocks:o}=await Promise.resolve().then(()=>(bt(),zo)),n=Xe(o());Qe("\u4FDD\u5B58\u4E2D...");let r=m.currentRow;try{await ut(r.listTitle,r.itemId,{Title:t}),await Po(r.listTitle,r.itemId,r.dbId,t,n);let a=m.dbItems.find(i=>i.Id===r.itemId);a&&(a.Title=t),m.dirty=!1,Qe(""),DM(r.itemId,t,r.listTitle)}catch(a){k("\u884C\u306E\u4FDD\u5B58\u306B\u5931\u6557: "+a.message,"err"),Qe("\u672A\u4FDD\u5B58")}}async function DM(e,t,o){if(uw.has(e)||!Vc(o)||Sc(t))return;let r=m.dbItems.find(s=>s.Id===e)?.[ft]||"",a=Eo(r)||"";if(!(!a||(uw.add(e),!window.confirm("\u300C"+t+`\u300D\u3092\u901A\u5E38\u30DA\u30FC\u30B8\u306B\u5909\u63DB\u3057\u307E\u3059\u304B\uFF1F

\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 (`+a+`) \u304B\u3089\u306F\u5916\u308C\u307E\u3059\u3002
\u3042\u3068\u3067\u30E1\u30CB\u30E5\u30FC\u304B\u3089\u300C\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u306B\u623B\u3059\u300D\u3067\u5FA9\u5143\u3067\u304D\u307E\u3059\u3002`))))try{let s=await au(e,t,a),{apiGetPages:l}=await Promise.resolve().then(()=>(W(),qe));await l();let{renderTree:c}=await Promise.resolve().then(()=>(_e(),wo));c(),await(await Promise.resolve().then(()=>(K(),ie))).doSelect(s),k("\u901A\u5E38\u30DA\u30FC\u30B8\u306B\u5909\u63DB\u3057\u307E\u3057\u305F")}catch(s){k("\u5909\u63DB\u5931\u6557: "+s.message,"err")}}async function fw(e){if(m.currentRow=null,!m.pages.find(n=>n.Id===e))return;let{doSelect:o}=await Promise.resolve().then(()=>(K(),ie));await o(e);try{m.dbList&&(m.dbItems=await Ee(m.dbList));let{renderDbTable:n}=await Promise.resolve().then(()=>(K(),ie));n()}catch{}}var uw,Ho=L(()=>{"use strict";j();me();le();We();De();W();St();K();wy();An();To();uw=new Set});var Jr={};q(Jr,{clearSaveTimer:()=>sm,flushPendingSave:()=>yt,schedSave:()=>jo});function Qf(){wl&&(clearTimeout(wl),wl=null)}function _M(){Qf(),wl=setTimeout(()=>{wl=null,!(!m.currentRow||!m.dirty||m.saving)&&Promise.resolve().then(()=>(Ho(),Oo)).then(e=>e.saveCurrentRow()).catch(()=>{})},cs)}function gw(){if(!m.currentId||m.currentType==="database"||m.currentRow)return;let e=I("ttl"),t=Ce();if(!e||!t)return;let o=e.value.trim()||"\u7121\u984C";eg(o)}function jo(){if(!(!m.currentId||m.currentType==="database")){if(m.currentRow){m.dirty||(m.dirty=!0,Qe("\u672A\u4FDD\u5B58")),_M();return}gw()}}function sm(){iy(),Qf()}async function yt(){if(m.currentRow){if(Qf(),m.dirty&&!m.saving){m.saving=!0;try{await(await Promise.resolve().then(()=>(Ho(),Oo))).saveCurrentRow()}finally{m.saving=!1}}return}gw(),await re.flush()}var wl,ht=L(()=>{"use strict";j();me();gt();Uu();bt();le();He();wl=null});var yw={};q(yw,{insertLinkedDb:()=>zM,renderAllLinkedDbs:()=>UM});function NM(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t.filter(o=>o&&typeof o.field=="string"&&typeof o.op=="string"):[]}catch{return[]}}function OM(e,t){return t.length===0?e:e.filter(o=>{for(let n of t){if(!n.value&&n.op!=="empty"&&n.op!=="not_empty")continue;let r=o[n.field],a=r==null?"":String(r);if(n.op==="equals"){if(a!==n.value)return!1}else if(n.op==="not_empty"){if(!a)return!1}else if(n.op==="empty"){if(a)return!1}else if(!a.toLowerCase().includes(n.value.toLowerCase()))return!1}return!0})}function HM(e,t){t.length===0?e.removeAttribute("data-filter"):e.setAttribute("data-filter",JSON.stringify(t)),jo(),setTimeout(()=>{tg(e)},0)}function FM(e,t){if(e==null||e==="")return"";if(t.FieldTypeKind===4){let o=String(e);return/^\d{4}-\d{2}-\d{2}/.test(o)?o.substring(0,10):o}if(t.FieldTypeKind===8)return e?"\u2611":"\u2610";if(typeof e=="object"){let o=e;return Array.isArray(o.results)?o.results.map(String).join(", "):typeof o.Title=="string"?o.Title:""}return String(e)}async function tg(e){let t=e.getAttribute("data-db-id")||"",o=A(t);if(!o||o.type!=="database"||!o.list){e.innerHTML='<div class="memola-linkdb-broken">\u26A0 DB \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093'+(t?" (id="+M(t)+")":"")+"</div>";return}let n=o.list,r=NM(e.getAttribute("data-filter")||"");e.innerHTML='<div class="memola-linkdb-loading">\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026</div>';let a=[],i=[];try{let D=await Promise.resolve().then(()=>(De(),mo));[a,i]=await Promise.all([D.getListFields(n),D.getListItems(n)])}catch(D){e.innerHTML='<div class="memola-linkdb-error">\u8AAD\u307F\u8FBC\u307F\u5931\u6557: '+M(D.message)+"</div>";return}let s=new Set(["Title","ContentType","Attachments","_memola_body"]),l=a.filter(D=>!s.has(D.InternalName)&&!s.has(D.Title)),c=[{internal:"Title",title:"\u30BF\u30A4\u30C8\u30EB"},...l.map(D=>({internal:D.InternalName,title:D.Title}))],d=[{field:null,label:"\u30BF\u30A4\u30C8\u30EB",key:"Title"},...l.slice(0,RM-1).map(D=>({field:D,label:D.Title,key:D.InternalName}))],p=OM(i,r),u=p.length,f=i.length,g=Math.min(u,hw),y=u>hw,b="<thead><tr>"+d.map(D=>"<th>"+M(D.label)+"</th>").join("")+"</tr></thead>",h="<tbody>"+p.slice(0,g).map(D=>{let H=d.map(X=>{if(X.key==="Title")return'<td class="memola-linkdb-title-cell" data-row-id="'+D.Id+'">'+M(String(D.Title||"\u7121\u984C"))+"</td>";let oe=X.field;return"<td>"+M(FM(D[X.key],oe))+"</td>"}).join("");return'<tr data-row-id="'+D.Id+'">'+H+"</tr>"}).join("")+"</tbody>",v=o.icon||"\u{1F5C3}",x=r.length>0?"\u{1F50E} \u30D5\u30A3\u30EB\u30BF ("+r.length+")":"\u{1F50E} \u30D5\u30A3\u30EB\u30BF",w=r.length>0?u+" / "+f+" \u4EF6":u+" \u4EF6",T='<div class="memola-linkdb-header"><span class="memola-linkdb-icon">'+M(v)+'</span><span class="memola-linkdb-name">'+M(o.title)+'</span><span class="memola-linkdb-count">'+w+(y?" (\u4E0A\u4F4D "+g+" \u4EF6\u3092\u8868\u793A)":"")+'</span><button class="memola-linkdb-filter" type="button" title="\u30D5\u30A3\u30EB\u30BF\u6761\u4EF6\u3092\u7DE8\u96C6">'+M(x)+'</button><button class="memola-linkdb-open" type="button" title="DB \u3092\u958B\u304F">\u2197 \u958B\u304F</button></div>',E=D=>{let H=c.find(X=>X.internal===D);return H?H.title:D},B=D=>D==="contains"?"\u542B\u3080":D==="equals"?"\uFF1D":D==="not_empty"?"\u7A7A\u3067\u306A\u3044":D==="empty"?"\u7A7A":D,U=r.length>0?'<div class="memola-linkdb-filterchips">'+r.map(D=>'<span class="memola-linkdb-chip">'+M(E(D.field))+" "+M(B(D.op))+(D.op==="empty"||D.op==="not_empty"?"":": "+M(D.value))+"</span>").join("")+"</div>":"";e.innerHTML=T+U+'<div class="memola-linkdb-tablewrap"><table class="memola-linkdb-table">'+b+h+"</table></div>",e.querySelector(".memola-linkdb-open")?.addEventListener("click",D=>{D.preventDefault(),D.stopPropagation(),Promise.resolve().then(()=>(K(),ie)).then(H=>H.doSelect(t))});let O=e.querySelector(".memola-linkdb-filter");O?.addEventListener("click",D=>{D.preventDefault(),D.stopPropagation(),bw(e,O,c,r)}),e.querySelectorAll(".memola-linkdb-chip").forEach(D=>{D.addEventListener("click",H=>{H.preventDefault(),H.stopPropagation(),bw(e,O||D,c,r)})}),e.querySelectorAll(".memola-linkdb-title-cell").forEach(D=>{D.addEventListener("click",async H=>{H.preventDefault(),H.stopPropagation();let X=parseInt(D.dataset.rowId||"0",10);if(!X)return;let oe=p.find(Me=>Me.Id===X);if(oe)try{let Me=await Promise.resolve().then(()=>(K(),ie)),se=m.pages.find(Ie=>Ie.Id===t);if(!se){k("DB \u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}await Me.doSelectDb(t,se);let F=await Promise.resolve().then(()=>(Ho(),Oo)),de=m.dbItems.find(Ie=>Ie.Id===X)||oe;await F.openRowAsPage(t,de)}catch(Me){k("\u884C\u3092\u958B\u3051\u307E\u305B\u3093\u3067\u3057\u305F: "+Me.message,"err")}})})}function UM(e){e.querySelectorAll(".memola-linkdb").forEach(o=>{tg(o)})}function lm(){Ii&&(Ii.remove(),Ii=null),document.removeEventListener("mousedown",vw,!0)}function vw(e){Ii&&(Ii.contains(e.target)||lm())}function bw(e,t,o,n){lm();let r=n.map(p=>({...p})),a=document.createElement("div");a.className="memola-linkdb-fpop",a.addEventListener("click",p=>p.stopPropagation());function i(){let p=o.map(y=>'<option value="'+M(y.internal)+'">'+M(y.title)+"</option>").join(""),u=[["contains","\u542B\u3080"],["equals","\uFF1D (\u5B8C\u5168\u4E00\u81F4)"],["not_empty","\u7A7A\u3067\u306A\u3044"],["empty","\u7A7A"]].map(([y,b])=>'<option value="'+y+'">'+b+"</option>").join(""),f=r.map((y,b)=>{let h=y.op!=="empty"&&y.op!=="not_empty";return'<div class="memola-linkdb-frow" data-idx="'+b+'"><select class="memola-linkdb-ffield">'+p+'</select><select class="memola-linkdb-fop">'+u+"</select>"+(h?'<input class="memola-linkdb-fval" type="text" placeholder="\u5024\u2026" value="'+M(y.value)+'">':'<span class="memola-linkdb-fval-na">\u2014</span>')+'<button class="memola-linkdb-frm" title="\u524A\u9664">\xD7</button></div>'}).join(""),g=r.length===0?'<div class="memola-linkdb-fempty">\u30D5\u30A3\u30EB\u30BF\u6761\u4EF6\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u300C+ \u8FFD\u52A0\u300D\u3067\u6761\u4EF6\u3092\u52A0\u3048\u3066\u304F\u3060\u3055\u3044\u3002</div>':"";a.innerHTML='<div class="memola-linkdb-fhd"><span>\u{1F50E} \u30D5\u30A3\u30EB\u30BF\u6761\u4EF6 (AND)</span><button class="memola-linkdb-fclose" title="\u9589\u3058\u308B">\xD7</button></div><div class="memola-linkdb-fbody">'+g+f+'</div><div class="memola-linkdb-fft"><button class="memola-linkdb-fadd">+ \u8FFD\u52A0</button><span style="flex:1"></span><button class="memola-linkdb-fclear">\u5168\u30AF\u30EA\u30A2</button><button class="memola-linkdb-fapply">\u9069\u7528</button></div>',a.querySelectorAll(".memola-linkdb-frow").forEach(y=>{let b=parseInt(y.dataset.idx||"-1",10);if(b<0)return;let h=r[b],v=y.querySelector(".memola-linkdb-ffield"),x=y.querySelector(".memola-linkdb-fop");v&&(v.value=h.field||o[0]?.internal||""),x&&(x.value=h.op),v?.addEventListener("change",()=>{h.field=v.value}),x?.addEventListener("change",()=>{h.op=x.value,(h.op==="empty"||h.op==="not_empty")&&(h.value=""),i()});let w=y.querySelector(".memola-linkdb-fval");w?.addEventListener("input",()=>{h.value=w.value}),y.querySelector(".memola-linkdb-frm")?.addEventListener("click",()=>{r.splice(b,1),i()})}),a.querySelector(".memola-linkdb-fadd")?.addEventListener("click",()=>{r.push({field:o[0]?.internal||"Title",op:"contains",value:""}),i()}),a.querySelector(".memola-linkdb-fclear")?.addEventListener("click",()=>{r.length!==0&&confirm("\u5168\u3066\u306E\u6761\u4EF6\u3092\u524A\u9664\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?")&&(r.length=0,i())}),a.querySelector(".memola-linkdb-fapply")?.addEventListener("click",()=>{let y=r.filter(b=>b.field?b.op==="empty"||b.op==="not_empty"?!0:!!b.value:!1);HM(e,y),lm()}),a.querySelector(".memola-linkdb-fclose")?.addEventListener("click",()=>{lm()})}i(),(document.getElementById("memola-overlay")||document.body).appendChild(a);let l=t.getBoundingClientRect();a.style.position="fixed",a.style.top=l.bottom+6+"px";let c=380,d=l.right-c;d<8&&(d=8),a.style.left=d+"px",a.style.width=c+"px",Ii=a,setTimeout(()=>{document.addEventListener("mousedown",vw,!0)},0)}function zM(e,t="table"){let o=window.getSelection();if(!o||!o.rangeCount)return;let n=document.createElement("div");n.className="memola-linkdb",n.setAttribute("contenteditable","false"),n.setAttribute("data-db-id",e),n.setAttribute("data-view",t);let r=document.createElement("p");r.appendChild(document.createElement("br"));let a=o.getRangeAt(0);a.insertNode(r),a.insertNode(n);let i=document.createRange();i.setStart(r,0),i.collapse(!0),o.removeAllRanges(),o.addRange(i),tg(n)}var hw,RM,Ii,xw=L(()=>{"use strict";j();le();ht();Re();we();hw=50,RM=4;Ii=null});var Ew={};q(Ew,{insertAiBlock:()=>qM,reattachAiBlocks:()=>jM});function jM(e){e.querySelectorAll(".memola-ai-block").forEach(t=>{if(t.dataset.aibBound==="1")return;t.dataset.aibBound="1";let o=t.dataset.aibAction||"",n=t.dataset.aibResult||"",r=og.find(a=>a.key===o)||{key:o,label:o,prompt:""};n?Iw(t,r,n):(t.innerHTML=ww(),kw(t))})}function qM(){let e=Ce(),t=window.getSelection();if(!t||!t.rangeCount)return;let o=document.createElement("div");o.className="memola-ai-block",o.contentEditable="false",o.innerHTML=ww();let n=t.getRangeAt(0),r=n.startContainer;for(;r&&r.parentElement!==e;)r=r.parentElement;r&&r!==e?(e.insertBefore(o,r.nextSibling),r.textContent?.trim()||r.remove()):n.insertNode(o);let a=document.createElement("p");a.appendChild(document.createElement("br")),e.insertBefore(a,o.nextSibling),kw(o),jo()}function ww(){return'<div class="memola-aib-head"><span class="memola-aib-title">\u2726 AI \u30D6\u30ED\u30C3\u30AF</span><span class="memola-aib-hint">\u30A2\u30AF\u30B7\u30E7\u30F3\u3092\u9078\u629E</span></div><div class="memola-aib-actions">'+og.map(e=>'<button class="memola-aib-action" data-action="'+e.key+'">'+e.label+"</button>").join("")+'<button class="memola-aib-action memola-aib-cancel" data-action="cancel">\xD7</button></div>'}function kw(e){e.querySelectorAll(".memola-aib-action").forEach(t=>{t.addEventListener("click",()=>{let o=t.dataset.action;if(o==="cancel"){e.remove(),jo();return}let n=og.find(r=>r.key===o);n&&ng(e,n)})})}async function ng(e,t){let o=Xe(vn());e.innerHTML='<div class="memola-aib-head"><span class="memola-aib-title">\u2726 '+M(t.label)+'</span><span class="memola-aib-hint">\u8003\u3048\u4E2D\u2026</span></div><div class="memola-aib-body memola-aib-loading">\u2026</div>';try{let n=await Sf([{role:"user",content:t.prompt+`

--- \u30DA\u30FC\u30B8\u672C\u6587 ---
`+o}],"\u3042\u306A\u305F\u306F Memola \u306EAI\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u3067\u3059\u3002\u7C21\u6F54\u3067\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u3067\u7B54\u3048\u3066\u304F\u3060\u3055\u3044\u3002");Iw(e,t,n)}catch(n){e.innerHTML='<div class="memola-aib-head"><span class="memola-aib-title">\u2726 '+M(t.label)+'</span></div><div class="memola-aib-body memola-aib-error">\u26A0\uFE0F '+M(n.message)+'</div><div class="memola-aib-foot"><button class="memola-aib-btn memola-aib-retry" data-action="retry">\u518D\u8A66\u884C</button><button class="memola-aib-btn memola-aib-discard" data-action="discard">\u7834\u68C4</button></div>',e.querySelector(".memola-aib-retry")?.addEventListener("click",()=>ng(e,t)),e.querySelector(".memola-aib-discard")?.addEventListener("click",()=>{e.remove()})}}function Iw(e,t,o){e.dataset.aibAction=t.key,e.dataset.aibResult=o,e.innerHTML='<div class="memola-aib-head"><span class="memola-aib-title">\u2726 '+M(t.label)+'</span><button class="memola-aib-regen" title="\u518D\u751F\u6210">\u21BB</button></div><div class="memola-aib-body">'+$M(M(o))+'</div><div class="memola-aib-foot"><button class="memola-aib-btn memola-aib-adopt" data-action="adopt">\u63A1\u7528</button><button class="memola-aib-btn memola-aib-edit" data-action="edit">\u7DE8\u96C6</button><button class="memola-aib-btn memola-aib-discard" data-action="discard">\u7834\u68C4</button></div>',e.querySelector(".memola-aib-regen")?.addEventListener("click",()=>ng(e,t)),e.querySelector(".memola-aib-adopt")?.addEventListener("click",()=>{let n=Ce(),r=o.split(/\n+/).filter(i=>i.trim()),a=e.nextSibling;r.forEach(i=>{let s=document.createElement("p");s.textContent=i,n.insertBefore(s,a)}),e.remove(),jo(),k("AI\u30D6\u30ED\u30C3\u30AF\u3092\u63A1\u7528\u3057\u307E\u3057\u305F")}),e.querySelector(".memola-aib-edit")?.addEventListener("click",()=>{let n=e.querySelector(".memola-aib-body");n.contentEditable="true",n.focus()}),e.querySelector(".memola-aib-discard")?.addEventListener("click",()=>{e.remove(),jo()})}function $M(e){return e.replace(/\n/g,"<br>")}var og,Tw=L(()=>{"use strict";me();le();ht();ui();St();bt();Re();og=[{key:"summarize",label:"\u8981\u7D04",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u5185\u5BB9\u30923\u884C\u3067\u7C21\u6F54\u306B\u8981\u7D04\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{key:"rewrite",label:"\u6539\u7A3F",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u672C\u6587\u3092\u3001\u3088\u308A\u8AAD\u307F\u3084\u3059\u304F\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u306B\u66F8\u304D\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{key:"translate",label:"\u82F1\u8A33",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u672C\u6587\u3092\u81EA\u7136\u306A\u82F1\u8A9E\u306B\u7FFB\u8A33\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{key:"actions",label:"\u30A2\u30AF\u30B7\u30E7\u30F3\u62BD\u51FA",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u5185\u5BB9\u304B\u3089\u3001ToDo\u30FB\u30A2\u30AF\u30B7\u30E7\u30F3\u30A2\u30A4\u30C6\u30E0\u3092\u7B87\u6761\u66F8\u304D\u3067\u62BD\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002"}]});function KM(e){return/^\\\\/.test(e)?"file://"+e.slice(2).replace(/\\/g,"/"):e}function kl(e,t){let o=new Map;Array.from(e.children).forEach(i=>{let s=i.dataset?.blockId;s&&o.set(s,i)});let n=new Set,r=0;for(let i of t){n.add(i.id);let s=o.get(i.id),l;s?s.dataset.blockKind===i.kind?(WM(s,i),l=s):(l=Lw(i),s.replaceWith(l)):l=Lw(i);let c=e.children[r];c!==l&&e.insertBefore(l,c||null),r++}Array.from(e.children).slice(r).forEach(i=>i.remove());for(let[i,s]of o)!n.has(i)&&s.isConnected&&s.remove();let a=t.length===1&&t[0].kind==="p"&&t[0].inline.length===0;e.classList.toggle("memola-editor-empty",a)}function Lw(e){let t=document.createElement("div");return t.dataset.blockId=e.id,t.dataset.blockKind=e.kind,t.dataset.blockHash=JSON.stringify(e,Rn),t.className="memola-blk memola-blk-"+e.kind,Sw(t,e),t}function WM(e,t){let o=JSON.stringify(t,Rn);e.dataset.blockHash!==o&&(e.dataset.blockHash=o,Sw(e,t))}function Sw(e,t){switch(e.innerHTML="",t.kind){case"p":case"h1":case"h2":case"h3":{let o=document.createElement(t.kind);Zr(o,t.inline),e.appendChild(o);break}case"todo":{let o=document.createElement("input");o.type="checkbox",o.className="memola-todo-cb",o.checked=t.checked;let n=document.createElement("span");n.className="memola-todo-txt",Zr(n,t.inline),e.appendChild(o),e.appendChild(n);break}case"code":{let o=document.createElement("pre"),n=document.createElement("code");t.lang&&(n.className="language-"+t.lang);let r=t.text.split(`
`);for(let a=0;a<r.length;a++)r[a]&&n.appendChild(document.createTextNode(r[a])),a<r.length-1&&n.appendChild(document.createElement("br"));(t.text===""||t.text.endsWith(`
`))&&n.appendChild(document.createElement("br")),o.appendChild(n),e.appendChild(o);break}case"rule":{let o=document.createElement("hr");e.appendChild(o);break}case"quote":{let o=document.createElement("blockquote"),n=document.createElement("div");for(kl(n,t.children);n.firstChild;)o.appendChild(n.firstChild);e.appendChild(o);break}case"callout":{let o=document.createElement("span");o.className="memola-callout-ic",o.contentEditable="false",o.textContent=t.emoji;let n=document.createElement("div");n.className="memola-callout-body",kl(n,t.children),e.appendChild(o),e.appendChild(n);break}case"list":{let o=document.createElement(t.ordered?"ol":"ul");for(let n of t.items){let r=document.createElement("li");kl(r,n),o.appendChild(r)}e.appendChild(o);break}case"table":{e.contentEditable="false";let o=document.createElement("table");o.className="memola-itbl",o.dataset.hrow=t.hrow?"1":"0",o.dataset.hcol=t.hcol?"1":"0";let n=t.rows[0]?.length||0;if(n>0){let i=document.createElement("colgroup");for(let s=0;s<n;s++){let l=document.createElement("col"),c=t.colWidths?.[s];typeof c=="number"&&c>0&&(l.style.width=c+"px"),i.appendChild(l)}o.appendChild(i)}let r=document.createElement("tbody");for(let i=0;i<t.rows.length;i++){let s=t.rows[i],l=document.createElement("tr");for(let c=0;c<s.length;c++){let d=document.createElement("td");d.contentEditable="true";let p=t.cellBg?.[i]?.[c];p&&(d.style.background=p),Zr(d,s[c]),l.appendChild(d)}r.appendChild(l)}o.appendChild(r);let a=document.createElement("div");a.className="memola-itbl-wrap",a.appendChild(o),e.appendChild(a);break}case"linkdb":{e.contentEditable="false";let o=document.createElement("div");o.className="memola-linkdb",o.dataset.dbId=t.dbId,o.dataset.view=t.view,t.filter&&(o.dataset.filter=t.filter),t.sort&&(o.dataset.sort=t.sort),e.appendChild(o),Promise.resolve().then(()=>(xw(),yw)).then(n=>n.renderAllLinkedDbs(e));break}case"ai":{e.contentEditable="false";let o=document.createElement("div");o.className="memola-ai-block",o.dataset.aibAction=t.prompt,o.dataset.aibResult=t.result,e.appendChild(o),Promise.resolve().then(()=>(Tw(),Ew)).then(n=>n.reattachAiBlocks(e));break}case"image":{e.contentEditable="false";let o=document.createElement("span");o.className="memola-img-wrap";let n=document.createElement("img");n.src=t.src,n.alt=t.alt,n.className="memola-img",typeof t.width=="number"&&t.width>0&&(n.style.width=t.width+"px",o.style.width=t.width+"px"),o.appendChild(n);let r=document.createElement("span");r.className="memola-img-resize",r.contentEditable="false",o.appendChild(r),e.appendChild(o);break}case"email":{e.contentEditable="false";let o=document.createElement("div");o.className="memola-email-chip",o.contentEditable="false";let n=document.createElement("span");n.className="memola-email-ic",n.textContent="\u{1F4E7}";let r=document.createElement("div");r.className="memola-email-body";let a=document.createElement("div");a.className="memola-email-subj",a.textContent=t.subject||"(\u4EF6\u540D\u306A\u3057)";let i=document.createElement("div");i.className="memola-email-meta",i.textContent=[t.from,t.date].filter(Boolean).join(" \u30FB "),r.append(a),i.textContent&&r.append(i);let s=document.createElement("button");s.className="memola-email-src",s.type="button",s.innerHTML=$.external,s.title="Outlook \u3067\u3053\u306E\u30E1\u30FC\u30EB\u3092\u958B\u304F (InternetMessageId \u691C\u7D22)",s.dataset.emailSrc=t.imid,t.imid||(s.disabled=!0,s.title="Message-Id \u304C\u53D6\u5F97\u3067\u304D\u306A\u304B\u3063\u305F\u305F\u3081\u958B\u3051\u307E\u305B\u3093"),o.append(n,r,s),e.appendChild(o);break}}}function Zr(e,t){if(t.length===0){e.appendChild(document.createElement("br"));return}for(let o of t)e.appendChild(GM(o));t[t.length-1].kind==="br"&&e.appendChild(document.createElement("br"))}function GM(e){switch(e.kind){case"text":return document.createTextNode(e.text);case"br":return document.createElement("br");case"code":{let t=document.createElement("code");return t.textContent=e.text,t}case"bold":{let t=document.createElement("strong");return Zr(t,e.children),t}case"italic":{let t=document.createElement("em");return Zr(t,e.children),t}case"strike":{let t=document.createElement("s");return Zr(t,e.children),t}case"link":{let t=document.createElement("a");return t.dataset.href=e.href,t.href=KM(e.href),t.title=e.href,/^https?:/i.test(t.getAttribute("href")||"")&&(t.target="_blank",t.rel="noopener noreferrer"),Zr(t,e.children),t}case"pagelink":{let t=document.createElement("a");return t.className="memola-page-link",t.dataset.pageId=e.pageId,t.contentEditable="false",t.textContent=e.alias||e.pageId,t}case"dailylink":{let t=document.createElement("a");return t.className="memola-page-link memola-daily-link",t.dataset.dailyDate=e.date,t.contentEditable="false",t.textContent=e.alias||e.date,t}}}var Mw=L(()=>{"use strict";Pa();Va()});function Pw(e){let t=e;for(;t;){if(t.nodeType===1){let o=t;if(o.dataset?.blockId)return o}t=t.parentNode}return null}function Cw(e,t,o){let n=0,r=-1,a=i=>{if(i===t){if(i.nodeType===3)return r=n+Math.min(o,(i.textContent||"").length),!0;let c=0;for(let d of Array.from(i.childNodes)){if(c===o)return r=n,!0;if(a(d))return!0;c++}return r=n,!0}if(i.nodeType===3)return n+=(i.textContent||"").length,!1;if(i.nodeType!==1)return!1;let s=i;if(s.tagName.toLowerCase()==="br")return n+=1,!1;if(s.classList.contains("memola-page-link"))return n+=(s.textContent||"").length,!1;for(let c of Array.from(s.childNodes))if(a(c))return!0;return!1};for(let i of Array.from(e.childNodes))if(a(i))break;return r}function qo(e){let t=window.getSelection();if(!t||t.rangeCount===0)return null;let o=t.getRangeAt(0);if(!e.contains(o.startContainer))return null;let n=Pw(o.startContainer),r=Pw(o.endContainer);if(!n||!r)return null;let a=Cw(n,o.startContainer,o.startOffset),i=Cw(r,o.endContainer,o.endOffset);return a<0||i<0?null:o.collapsed?{kind:"caret",blockId:n.dataset.blockId,offset:a}:{kind:"range",anchorBlockId:n.dataset.blockId,anchorOffset:a,focusBlockId:r.dataset.blockId,focusOffset:i}}function rg(e,t){let o=0,n=null,r=a=>{if(n)return!0;if(a.nodeType===3){let l=(a.textContent||"").length;return o+l>=t?(n={node:a,offset:t-o},!0):(o+=l,!1)}if(a.nodeType!==1)return!1;let i=a;if(i.tagName.toLowerCase()==="br"){if(o+1>t){let l=i.parentNode,c=Array.from(l.childNodes).indexOf(i);return n={node:l,offset:c},!0}if(o+1===t){let l=i.parentNode,c=Array.from(l.childNodes).indexOf(i);return n={node:l,offset:c+1},!0}return o+=1,!1}if(i.classList.contains("memola-page-link")){let l=(i.textContent||"").length;if(o+l>=t){let c=i.parentNode,d=Array.from(c.childNodes).indexOf(i);return n={node:c,offset:t-o<=l/2?d:d+1},!0}return o+=l,!1}for(let l of Array.from(i.childNodes))if(r(l))return!0;return!1};for(let a of Array.from(e.childNodes))if(r(a))break;if(!n){let a=e.firstElementChild??e,i=VM(a);i?n={node:i,offset:(i.textContent||"").length}:n={node:a,offset:a.childNodes.length}}return n}function VM(e){let t=null,o=n=>{if(n.nodeType===3){t=n;return}if(n.nodeType===1)for(let r of Array.from(n.childNodes))o(r)};return o(e),t}function Aw(e,t){if(e.querySelectorAll(".memola-itbl-selcel").forEach(l=>{l.classList.remove("memola-itbl-selcel")}),!t)return;if(t.kind==="table-cells"){YM(e,t);let l=window.getSelection();l&&l.removeAllRanges();return}let o=window.getSelection();if(!o)return;if(t.kind==="caret"){let l=e.querySelector('[data-block-id="'+cm(t.blockId)+'"]');if(!l)return;let c=rg(l,t.offset);if(!c)return;let d=document.createRange();d.setStart(c.node,c.offset),d.collapse(!0),o.removeAllRanges(),o.addRange(d);return}let n=e.querySelector('[data-block-id="'+cm(t.anchorBlockId)+'"]'),r=e.querySelector('[data-block-id="'+cm(t.focusBlockId)+'"]');if(!n||!r)return;let a=rg(n,t.anchorOffset),i=rg(r,t.focusOffset);if(!a||!i)return;let s=document.createRange();typeof o.setBaseAndExtent=="function"?o.setBaseAndExtent(a.node,a.offset,i.node,i.offset):(s.setStart(a.node,a.offset),s.setEnd(i.node,i.offset),o.removeAllRanges(),o.addRange(s))}function YM(e,t){let n=e.querySelector('[data-block-id="'+cm(t.blockId)+'"]')?.querySelector("table.memola-itbl tbody");if(!n)return;let r=Math.min(t.anchor.row,t.focus.row),a=Math.max(t.anchor.row,t.focus.row),i=Math.min(t.anchor.col,t.focus.col),s=Math.max(t.anchor.col,t.focus.col);for(let l=r;l<=a;l++){let c=n.children[l];if(c)for(let d=i;d<=s;d++){let p=c.children[d];p&&p.classList.add("memola-itbl-selcel")}}}function cm(e){return typeof CSS<"u"&&CSS.escape?CSS.escape(e):e.replace(/[^a-zA-Z0-9_-]/g,t=>"\\"+t)}var ag=L(()=>{"use strict"});function _w(e,t,o){let r=t.target?.closest?.('[contenteditable="false"]');if(r&&o.contains(r))return{next:e,preventDefault:!1};let a=qo(o);if(!a)return{next:e,preventDefault:!1};switch(t.inputType){case"insertText":{let i=t.data??"";if(a.kind==="caret")return{next:_r(e,a.blockId,a.offset,i),preventDefault:!0};let s=Il(e,a);return s.cursor?{next:_r(s.state,s.cursor.blockId,s.cursor.offset,i),preventDefault:!0}:{next:e,preventDefault:!1}}case"insertParagraph":{if(a.kind==="caret"&&Dw(e,a.blockId)){let c=QM(e,a.blockId,a.offset);return c?{next:c,preventDefault:!0}:{next:_r(e,a.blockId,a.offset,`
`),preventDefault:!0}}if(a.kind!=="caret"){let c=Il(e,a);return c.cursor?{next:_u(c.state,c.cursor.blockId,c.cursor.offset),preventDefault:!0}:{next:e,preventDefault:!1}}let i=XM(e,a.blockId);if(i)return{next:i,preventDefault:!0};let s=tP(e,a.blockId);return s?{next:s,preventDefault:!0}:{next:_u(e,a.blockId,a.offset),preventDefault:!0}}case"insertLineBreak":{if(a.kind==="caret"&&Dw(e,a.blockId))return{next:_r(e,a.blockId,a.offset,`
`),preventDefault:!0};if(a.kind==="caret")return{next:Du(e,a.blockId,a.offset),preventDefault:!0};let i=Il(e,a);return i.cursor?{next:Du(i.state,i.cursor.blockId,i.cursor.offset),preventDefault:!0}:{next:e,preventDefault:!1}}case"deleteContentBackward":{if(a.kind==="caret"){if(a.offset>0){let f=JM(e,a.blockId,a.offset),g=f>0?-f:-1;return{next:Za(e,a.blockId,a.offset,g),preventDefault:!0}}let s=aP(e,a.blockId);if(s)return{next:s,preventDefault:!0};let l=sP(e,a.blockId);if(l)return{next:l,preventDefault:!0};let c=oP(e,a.blockId);if(c)return{next:c,preventDefault:!0};let d=id(e,a.blockId);if(d!==e)return{next:d,preventDefault:!0};let p=eP(e,a.blockId);if(p)return{next:p,preventDefault:!0};let u=iP(e,a.blockId);return u?{next:u,preventDefault:!0}:{next:e,preventDefault:!0}}return{next:Il(e,a).state,preventDefault:!0}}case"deleteContentForward":{if(a.kind==="caret"){let s=ZM(e,a.blockId,a.offset),l=s>0?s:1;return{next:Za(e,a.blockId,a.offset,l),preventDefault:!0}}return{next:Il(e,a).state,preventDefault:!0}}default:return{next:e,preventDefault:!1}}}function Il(e,t){if(t.kind!=="range")return{state:e,cursor:null};if(t.anchorBlockId===t.focusBlockId){let g=Math.min(t.anchorOffset,t.focusOffset),y=Math.max(t.anchorOffset,t.focusOffset);return{state:Za(e,t.anchorBlockId,g,y-g),cursor:{blockId:t.anchorBlockId,offset:g}}}let o=e.blocks,n=o.findIndex(g=>g.id===t.anchorBlockId),r=o.findIndex(g=>g.id===t.focusBlockId);if(n<0||r<0)return{state:e,cursor:null};let a=Math.min(n,r),i=Math.max(n,r),s=n<=r?t.anchorOffset:t.focusOffset,l=n<=r?t.focusOffset:t.anchorOffset,c=o[a],d=o[i];if(!("inline"in c)||!("inline"in d))return{state:e,cursor:null};let p=[...Bw(c.inline,0,s),...Bw(d.inline,l,Number.POSITIVE_INFINITY)],u={...c,inline:p},f=[...o.slice(0,a),u,...o.slice(i+1)];return{state:{...e,blocks:f},cursor:{blockId:u.id,offset:s}}}function Bw(e,t,o){return Le(e,t,o)}function XM(e,t){let o=Rw(e,t);if(!o)return null;let n=o.inner;if(!("inline"in n)||bo(n.inline)>0)return null;let r=e.blocks.slice(),a=r[o.outerIdx],i=null;if(a.kind==="callout"||a.kind==="quote"){let c=a.children.filter(d=>d.id!==t);c.length>0&&(i={...a,children:c})}else if(a.kind==="list"){let c=a.items.map(d=>d.filter(p=>p.id!==t)).filter(d=>d.length>0);c.length>0&&(i={...a,items:c})}else return null;i?r[o.outerIdx]=i:r.splice(o.outerIdx,1);let s=rt(""),l=i?o.outerIdx+1:o.outerIdx;return r.splice(l,0,s),{...e,blocks:r,selection:{kind:"caret",blockId:s.id,offset:0}}}function JM(e,t,o){let n=e.blocks.find(a=>a.id===t);if(!n||!("inline"in n))return 0;let r=0;for(let a of n.inline){let i=0;if(a.kind==="text"||a.kind==="code"?i=a.text.length:a.kind==="br"?i=1:a.kind==="pagelink"?i=(a.alias||a.pageId).length:a.kind==="dailylink"?i=(a.alias||a.date).length:"children"in a&&(i=ig(a.children)),r+i===o)return a.kind==="pagelink"||a.kind==="dailylink"?i:0;if(r+i>o)return 0;r+=i}return 0}function ZM(e,t,o){let n=e.blocks.find(a=>a.id===t);if(!n||!("inline"in n))return 0;let r=0;for(let a of n.inline){let i=0;if(a.kind==="text"||a.kind==="code"?i=a.text.length:a.kind==="br"?i=1:a.kind==="pagelink"?i=(a.alias||a.pageId).length:a.kind==="dailylink"?i=(a.alias||a.date).length:"children"in a&&(i=ig(a.children)),r===o)return a.kind==="pagelink"||a.kind==="dailylink"?i:0;if(r>o)return 0;r+=i}return 0}function ig(e){let t=0;for(let o of e)o.kind==="text"||o.kind==="code"?t+=o.text.length:o.kind==="br"?t+=1:o.kind==="pagelink"?t+=(o.alias||o.pageId).length:o.kind==="dailylink"?t+=(o.alias||o.date).length:"children"in o&&(t+=ig(o.children));return t}function QM(e,t,o){let n=e.blocks.findIndex(d=>d.id===t);if(n<0)return null;let r=e.blocks[n];if(r.kind!=="code"||o!==r.text.length||!(r.text===""||r.text.endsWith(`
`)))return null;let i=r.text.endsWith(`
`)?r.text.slice(0,-1):r.text,s=Q(),l={id:s,kind:"p",inline:[]},c=e.blocks.slice();return c[n]={...r,text:i},c.splice(n+1,0,l),{...e,blocks:c,selection:{kind:"caret",blockId:s,offset:0}}}function Dw(e,t){if(e.blocks.find(r=>r.id===t)?.kind==="code")return!0;let n=e.blocks.slice();for(;n.length;){let r=n.shift();if(r.id===t)return r.kind==="code";if(r.kind==="callout"||r.kind==="quote")n.push(...r.children);else if(r.kind==="list")for(let a of r.items)n.push(...a)}return!1}function eP(e,t){let o=e.blocks.findIndex(a=>a.id===t);if(o<0)return null;let n=e.blocks[o];if(n.kind!=="code"||n.text!=="")return null;let r=e.blocks.slice();return r[o]={id:n.id,kind:"p",inline:[]},{...e,blocks:r,selection:{kind:"caret",blockId:n.id,offset:0}}}function tP(e,t){let o=e.blocks.findIndex(a=>a.id===t);if(o<0)return null;let n=e.blocks[o];if(n.kind!=="todo"||bo(n.inline)>0)return null;let r=e.blocks.slice();return r[o]={id:n.id,kind:"p",inline:[]},{...e,blocks:r,selection:{kind:"caret",blockId:n.id,offset:0}}}function oP(e,t){for(let o=0;o<e.blocks.length;o++){let n=e.blocks[o];if(n.kind==="list"){let r=nP(e,n,o,t);if(r)return r}else if(n.kind==="quote"||n.kind==="callout"){let r=rP(e,n,o,t);if(r)return r}}return null}function nP(e,t,o,n){for(let r=0;r<t.items.length;r++){let a=t.items[r],i=a.findIndex(p=>p.id===n);if(i<0)continue;let s=a[i];if(!("inline"in s)||bo(s.inline)>0)return null;if(a.length>1){let p=a.filter(y=>y.id!==n),u=t.items.slice();u[r]=p;let f=e.blocks.slice();f[o]={...t,items:u};let g=p[Math.max(0,i-1)];return"inline"in g?{...e,blocks:f,selection:{kind:"caret",blockId:g.id,offset:bo(g.inline)}}:null}let l=t.items.filter((p,u)=>u!==r),c=e.blocks.slice();if(l.length===0){let p={id:n,kind:"p",inline:[]};return c.splice(o,1,p),{...e,blocks:c,selection:{kind:"caret",blockId:n,offset:0}}}if(c[o]={...t,items:l},r>0){let p=l[r-1],u=p[p.length-1];if("inline"in u)return{...e,blocks:c,selection:{kind:"caret",blockId:u.id,offset:bo(u.inline)}}}let d=l[0][0];return{...e,blocks:c,selection:{kind:"caret",blockId:d.id,offset:0}}}return null}function rP(e,t,o,n){let r=t.children.findIndex(c=>c.id===n);if(r<0)return null;let a=t.children[r];if(!("inline"in a)||bo(a.inline)>0)return null;let i=t.children.filter(c=>c.id!==n),s=e.blocks.slice();if(i.length===0){let c={id:n,kind:"p",inline:[]};return s.splice(o,1,c),{...e,blocks:s,selection:{kind:"caret",blockId:n,offset:0}}}if(s[o]={...t,children:i},r>0){let c=i[r-1];if("inline"in c)return{...e,blocks:s,selection:{kind:"caret",blockId:c.id,offset:bo(c.inline)}}}let l=i[0];return{...e,blocks:s,selection:{kind:"caret",blockId:l.id,offset:0}}}function aP(e,t){let o=e.blocks.findIndex(n=>n.id===t);if(o<0)return null;if(e.blocks[o].kind==="image"||e.blocks[o].kind==="email"){let n=e.blocks.slice();if(n.splice(o,1),n.length===0){let i=rt("");return{...e,blocks:[i],selection:{kind:"caret",blockId:i.id,offset:0}}}let r=o>0?n[o-1]:n[o],a="inline"in r?bo(r.inline):0;return{...e,blocks:n,selection:{kind:"caret",blockId:r.id,offset:a}}}if(o>0&&(e.blocks[o-1].kind==="image"||e.blocks[o-1].kind==="email")){let n=e.blocks.slice();return n.splice(o-1,1),{...e,blocks:n,selection:{kind:"caret",blockId:t,offset:0}}}return null}function iP(e,t){let o=e.blocks.findIndex(n=>n.id===t);if(o>0){let n=e.blocks[o],r=e.blocks[o-1];if(!("inline"in n))return null;if(r.kind==="code"){let a=Lt(n.inline),i=r.text===""||r.text.endsWith(`
`)?"":`
`,s=r.text+i+a,l=e.blocks.slice();return l[o-1]={...r,text:s},l.splice(o,1),{...e,blocks:l,selection:{kind:"caret",blockId:r.id,offset:r.text.length+i.length}}}if(r.kind==="list"&&r.items.length>0){let a=r.items[r.items.length-1],i=a[a.length-1];if(!("inline"in i))return null;let s=bo(i.inline),l=Le(i.inline.concat(n.inline),0,1/0),c={...i,inline:l},d=[...a.slice(0,-1),c],p=[...r.items.slice(0,-1),d],u={...r,items:p},f=e.blocks.slice();return f[o-1]=u,f.splice(o,1),{...e,blocks:f,selection:{kind:"caret",blockId:i.id,offset:s}}}if("inline"in r){let a=bo(r.inline),i={...r,inline:Le(r.inline.concat(n.inline),0,1/0)},s=e.blocks.slice();return s[o-1]=i,s.splice(o,1),{...e,blocks:s,selection:{kind:"caret",blockId:r.id,offset:a}}}}return null}function sP(e,t){let o=Rw(e,t);if(!o)return null;let n=e.blocks[o.outerIdx];if(n.kind==="callout"||n.kind==="quote"){if(n.children.length!==1)return null;let r=e.blocks.slice();return r.splice(o.outerIdx,1,o.inner),{...e,blocks:r,selection:{kind:"caret",blockId:o.inner.id,offset:0}}}if(n.kind==="list"){if(n.items.length!==1||n.items[0].length!==1)return null;let r=e.blocks.slice();return r.splice(o.outerIdx,1,o.inner),{...e,blocks:r,selection:{kind:"caret",blockId:o.inner.id,offset:0}}}return null}function Rw(e,t){for(let o=0;o<e.blocks.length;o++){let n=e.blocks[o];if(n.id===t)return null;if(n.kind==="callout"||n.kind==="quote"){let r=n.children.find(a=>a.id===t);if(r)return{outerIdx:o,inner:r}}if(n.kind==="list")for(let r of n.items){let a=r.find(i=>i.id===t);if(a)return{outerIdx:o,inner:a}}}return null}var Nw=L(()=>{"use strict";Do();Qo();ag()});var dm,Ow=L(()=>{"use strict";dm=class{constructor(){this._undo=[];this._redo=[]}reset(t){this._undo=[{state:t,tag:"init",at:Date.now(),blockId:null}],this._redo=[]}push(t,o,n=null){let r=this._undo[this._undo.length-1],a=Date.now();!!r&&(o==="typing"||o==="delete")&&r.tag===o&&r.blockId===n&&a-r.at<750?r.state=t:(this._undo.push({state:t,tag:o,at:a,blockId:n}),this._undo.length>200&&this._undo.shift()),this._redo=[]}canUndo(){return this._undo.length>1}canRedo(){return this._redo.length>0}undo(){if(this._undo.length<=1)return null;let t=this._undo.pop();return this._redo.push(t),this._undo[this._undo.length-1].state}redo(){let t=this._redo.pop();return t?(this._undo.push(t),t.state):null}current(){let t=this._undo[this._undo.length-1];return t?t.state:null}}});function Hw(e,t={}){let o=new dm,n=Uv,r=new Set,a=!1,i=null;e.contentEditable="true",e.classList.add("memola-editor2");function s(h,v="mutate"){if(h===n)return;n=h;let x=h.selection,w=x?.kind==="caret"?x.blockId:x?.kind==="range"?x.focusBlockId:null;o.push(n,v,w),l(),c()}function l(){kl(e,n.blocks),Aw(e,n.selection)}function c(){for(let h of r)try{h(n.blocks)}catch{}}let d=h=>{if(a)return;let v=_w(n,h,e);if(v.preventDefault&&h.preventDefault(),v.next!==n){let x=h.inputType.startsWith("insert")?"typing":h.inputType.startsWith("delete")?"delete":"structural";s(v.next,x)}},p=()=>{a=!0,e.classList.remove("memola-editor-empty");let h=qo(e);h?.kind==="caret"?i={blockId:h.blockId,offset:h.offset}:i=null},u=h=>{a=!1;let v=h.data||"";if(!i||!v){i=null,l();return}let x=i;i=null;let w=_r(n,x.blockId,x.offset,v);s(w,"typing")},f=()=>{if(a)return;let h=qo(e);h&&(n={...n,selection:h})},g=h=>{let v=h.metaKey||h.ctrlKey;if(v&&h.key==="z"&&!h.shiftKey){h.preventDefault();let x=o.undo();x&&(n=x,l(),c());return}if(v&&h.key==="z"&&h.shiftKey||v&&h.key==="y"){h.preventDefault();let x=o.redo();x&&(n=x,l(),c());return}if(h.key==="Tab"&&!v){let x=n.selection,w=x?.kind==="caret"?x.blockId:x?.kind==="range"?x.focusBlockId:null;if(w){let T=h.shiftKey?id(n,w):Gv(n,w);if(T!==n){h.preventDefault(),s(T,"structural");return}}}},y=h=>{let v=h.target;if(!v.classList.contains("memola-todo-cb"))return;let x=v.closest("[data-block-id]");if(!x)return;let w=x.dataset.blockId;s(Ru(n,w),"structural")};return e.addEventListener("beforeinput",d),e.addEventListener("compositionstart",p),e.addEventListener("compositionend",u),e.addEventListener("keydown",g),e.addEventListener("change",y),document.addEventListener("selectionchange",f),{setBlocks(h,v={}){n={blocks:h,selection:null},o.reset(n),l(),v.silent||c()},getBlocks(){return n.blocks},getSelection(){return n.selection},reconcile(h){let v=qo(e)??n.selection;n={blocks:h,selection:v},l(),c()},isComposing(){return a},subscribe(h){return r.add(h),()=>r.delete(h)},destroy(){e.removeEventListener("beforeinput",d),e.removeEventListener("compositionstart",p),e.removeEventListener("compositionend",u),e.removeEventListener("keydown",g),e.removeEventListener("change",y),document.removeEventListener("selectionchange",f),r.clear(),e.contentEditable="false",e.classList.remove("memola-editor2"),a=!1,i=null},rerender:l,applyMutation(h,v="structural"){let x=h(n);s(x,v)},toggleTodoBlock(h){s(Ru(n,h),"structural")},setBlockKind(h,v){s(dn(n,h,v),"structural")},toggleInlineFormat(h){let x=qo(e)??n.selection;if(!x||x.kind!=="range"||x.anchorBlockId!==x.focusBlockId)return;let w=Math.min(x.anchorOffset,x.focusOffset),T=Math.max(x.anchorOffset,x.focusOffset),E={...n,selection:{kind:"range",anchorBlockId:x.anchorBlockId,anchorOffset:w,focusBlockId:x.anchorBlockId,focusOffset:T}};s(jv(E,x.anchorBlockId,w,T,h),"structural")},insertPagelink(h,v){let x=qo(e);!x||x.kind!=="caret"||s(Qa(n,x.blockId,x.offset,h,v),"structural")},setLink(h){let x=qo(e)??n.selection;if(x)if(x.kind==="range"&&x.anchorBlockId===x.focusBlockId){let w=Math.min(x.anchorOffset,x.focusOffset),T=Math.max(x.anchorOffset,x.focusOffset),E={...n,selection:{kind:"range",anchorBlockId:x.anchorBlockId,anchorOffset:w,focusBlockId:x.anchorBlockId,focusOffset:T}};s($v(E,x.anchorBlockId,w,T,h),"structural")}else x.kind==="caret"&&h&&s(Kv(n,x.blockId,x.offset,h),"structural")},insertBlockAfterCurrent(h){let v=qo(e),x=v?.kind==="caret"?v.blockId:v?.kind==="range"?v.focusBlockId:n.blocks[n.blocks.length-1]?.id;if(!x){s({blocks:[...n.blocks,h],selection:{kind:"caret",blockId:h.id,offset:0}},"structural");return}s(ei(n,x,h),"structural")},undo(){let h=o.undo();return h?(n=h,l(),c(),!0):!1},redo(){let h=o.redo();return h?(n=h,l(),c(),!0):!1}}}var Fw=L(()=>{"use strict";Do();Mw();ag();Nw();Ow()});var Kw={};q(Kw,{hide:()=>ta,markBrokenPageLinks:()=>mP,pagePickerActive:()=>mg,pagePickerCommit:()=>$w,pagePickerCount:()=>qw,pagePickerMove:()=>lg,showPagePicker:()=>Ei,updatePagePickerQuery:()=>dg});function Uw(e){let t=m.currentId,o=!!t&&A(t)?.scope==="org",n=r=>{if(r.IsDraft||r.Id===t)return!1;let a=A(r.Id);return!(a?.isTemplate||o&&a?.scope!=="org")};return e.dbsOnly?m.pages.filter(r=>r.Type==="database"&&n(r)):m.pages.filter(n)}function lP(){let e=document.getElementById("memola-page-picker");return e||(e=document.createElement("div"),e.id="memola-page-picker",e.className="memola-page-picker",e.style.display="none",(document.getElementById("memola-overlay")||document.body).appendChild(e),e)}function zw(e,t){let o=e.trim().toLowerCase(),n=(t??m.pages).filter(i=>!A(i.Id)?.trashed);if(!o)return n.slice(0,8);let r=i=>(i||"").toLowerCase();return n.map(i=>{let s=r(i.Title||""),l=-1;return s===o?l=100:s.startsWith(o)?l=80:s.includes(" "+o)?l=60:s.includes(o)&&(l=40),{p:i,score:l}}).filter(i=>i.score>=0).sort((i,s)=>s.score-i.score).slice(0,8).map(i=>i.p)}function cP(e){let t=[],o=e,n=0;for(;o&&n++<12;){let r=A(o);if(!r)break;if(r.parent){let a=A(r.parent);a&&t.unshift(a.title)}o=r.parent||""}return t.join(" / ")}function cg(){if(!be)return;let{el:e,filtered:t,selIdx:o,opts:n}=be;if(e.innerHTML="",t.length===0){let s=document.createElement("div");s.className="memola-page-picker-empty",s.textContent="\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093",e.appendChild(s)}else t.forEach((s,l)=>{let d=A(s.Id)?.icon||(s.Type==="database"?"\u{1F5C3}":"\u{1F4C4}"),p=cP(s.Id),u=document.createElement("div");u.className="memola-page-picker-item"+(l===o?" sel":""),u.innerHTML='<span class="memola-page-picker-icon">'+M(d)+'</span><span class="memola-page-picker-name">'+M(s.Title||"\u7121\u984C")+"</span>"+(p?'<span class="memola-page-picker-path">'+M(p)+"</span>":""),u.addEventListener("mousedown",f=>{f.preventDefault(),jw(l)}),e.appendChild(u)});let r=n.anchor.bottom+window.scrollY+4,a=n.anchor.left+window.scrollX,i=window.innerWidth;a+320>i&&(a=i-324),e.style.top=r+"px",e.style.left=a+"px",e.style.display=""}function jw(e){if(!be)return;let t=be.filtered[e];if(!t)return;let o=be.opts.onSelect;ta(!0),o(t)}function Ei(e){ta();let t=lP(),o=e.query||"",n=Uw(e);be={el:t,opts:e,query:o,filtered:zw(o,n),selIdx:0},cg(),Qr&&document.removeEventListener("mousedown",Qr,!0),Qr=r=>{if(!be)return;let a=r.target;a&&(be.el.contains(a)||ta())},document.addEventListener("mousedown",Qr,!0),ea&&document.removeEventListener("keydown",ea,!0),ea=r=>{if(be&&!(r.isComposing||r.keyCode===229)){if(r.key==="Escape"){r.preventDefault(),r.stopPropagation(),ta();return}if(r.key==="ArrowDown"){r.preventDefault(),r.stopPropagation(),lg(1);return}if(r.key==="ArrowUp"){r.preventDefault(),r.stopPropagation(),lg(-1);return}if(r.key==="Enter"){qw()>0&&(r.preventDefault(),r.stopPropagation(),$w());return}}},document.addEventListener("keydown",ea,!0)}function dg(e){be&&(be.query=e,be.filtered=zw(e,Uw(be.opts)),be.selIdx>=be.filtered.length&&(be.selIdx=0),cg())}function mg(){return!!be}function qw(){return be?be.filtered.length:0}function lg(e){if(!be||be.filtered.length===0)return;let t=be.filtered.length;be.selIdx=(be.selIdx+e+t)%t,dP(),cg()}function dP(){if(be&&(be.el.classList.add("kb-mode"),!sg)){let e=()=>{be&&be.el.classList.remove("kb-mode"),document.removeEventListener("mousemove",e,!0),sg=null};sg=e,document.addEventListener("mousemove",e,!0)}}function $w(){be&&jw(be.selIdx)}function mP(e){let t=e.querySelectorAll("a.memola-page-link"),o=new Set;t.forEach(n=>{let r=n.getAttribute("data-page-id")||"",a=n.getAttribute("data-pending")==="1",i=n.getAttribute("data-daily-date")||"";if(i){n.classList.add("ghosted"),o.add(i);return}if(r){let s=m.pages.some(l=>l.Id===r);n.classList.toggle("broken",!s)}else if(a){let s=(n.textContent||"").trim(),l=m.pages.find(c=>(c.Title||"")===s);l?(n.setAttribute("data-page-id",l.Id),n.removeAttribute("data-pending"),n.classList.remove("broken")):n.classList.add("broken")}}),o.size!==0&&(async()=>{try{let n=await Promise.resolve().then(()=>(An(),Ua));for(let r of o)await n.findNoteForDate(r).catch(()=>null)&&e.querySelectorAll('a.memola-page-link[data-daily-date="'+r+'"]').forEach(i=>i.classList.remove("ghosted"))}catch{}})()}function ta(e=!1){if(be){be.el.style.display="none";let t=be.opts.onCancel;be=null,!e&&t&&t()}else be=null;Qr&&(document.removeEventListener("mousedown",Qr,!0),Qr=null),ea&&(document.removeEventListener("keydown",ea,!0),ea=null)}var be,Qr,ea,sg,mm=L(()=>{"use strict";j();Re();we();be=null,Qr=null,ea=null;sg=null});function Gw(e){let o=document.querySelector('[data-block-id="'+CSS.escape(e)+'"]')?.getBoundingClientRect();return o?{bottom:o.bottom,left:o.left}:{bottom:window.innerHeight/2,left:window.innerWidth/2}}function pP(e,t){Ei({anchor:Gw(t),onSelect:o=>{e.applyMutation(n=>{let r=n.blocks.findIndex(l=>l.id===t);if(r<0)return n;let a=n.blocks.slice(),i=a[r];"inline"in i&&(a[r]={...i,inline:[]});let s={...n,blocks:a,selection:{kind:"caret",blockId:t,offset:0}};return Qa(s,t,0,o.Id,o.Title||"")},"structural")}})}function uP(e,t){Ei({anchor:Gw(t),dbsOnly:!0,onSelect:o=>{e.applyMutation(n=>{let r=n.blocks.findIndex(s=>s.id===t);if(r<0)return n;let a=ny(o.Id),i=n.blocks.slice();return i[r]=a,{...n,blocks:i,selection:{kind:"caret",blockId:a.id,offset:0}}},"structural")}})}function oa(e,t,o){let n=e.blocks.findIndex(a=>a.id===t);if(n<0)return e;let r=e.blocks.slice();return r[n]=o,{...e,blocks:r,selection:{kind:"caret",blockId:o.id,offset:0}}}function Vw(e,t){let o=null,n=null,r="",a=0;function i(v){let w=e.getBlocks().find(E=>E.id===v);return!w||w.kind!=="p"?!1:w.inline.map(E=>E.kind==="text"?E.text:"").join("")===""}function s(){let v=window.getSelection();if(!v||v.rangeCount===0)return null;let x=v.getRangeAt(0).getBoundingClientRect();return x.width===0&&x.height===0?v.anchorNode?.parentElement?.closest("[data-block-id]")?.getBoundingClientRect()||null:x}function l(v){n=v,r="",a=0,o||(o=document.createElement("div"),o.className="memola-slash memola-slash2",o.style.cssText='position:absolute; z-index:2147483647; min-width:260px; max-width:320px; background:#fff; border:1px solid #e9e9e7; border-radius:6px; box-shadow:0 8px 24px rgba(0,0,0,0.12); max-height:340px; overflow-y:auto; font-size:14px; line-height:1.4; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Hiragino Sans","Noto Sans JP",sans-serif; color:#37352f;',(document.getElementById("memola-overlay")||document.body).appendChild(o));let x=s();x&&(o.style.top=x.bottom+window.scrollY+4+"px",o.style.left=x.left+window.scrollX+"px"),u()}function c(){o&&(o.remove(),o=null),n=null,r=""}function d(){return!!o}function p(){if(!r)return Ww;let v=r.toLowerCase();return Ww.filter(x=>x.cmd.toLowerCase().includes(v)||x.label.toLowerCase().includes(v)||x.hint&&x.hint.toLowerCase().startsWith(v))}function u(){if(!o)return;let v=p();if(a>=v.length&&(a=0),v.length===0){o.innerHTML='<div style="padding:12px; color:#9b9a97; font-size:13px;">\u8A72\u5F53\u306A\u3057</div>';return}o.innerHTML="",v.forEach((w,T)=>{let E=document.createElement("div");E.className="memola-slash2-item"+(T===a?" on":""),E.style.cssText="padding:6px 10px; cursor:pointer; display:flex; align-items:center; gap:8px;"+(T===a?"background:#f1f1ef;":""),E.innerHTML='<div style="flex:1; min-width:0;"><div style="font-weight:500; font-size:14px;">'+pg(w.label)+'</div><div style="font-size:11px; color:#9b9a97;">'+pg(w.desc)+"</div></div>"+(w.hint?'<div style="font-family:ui-monospace,monospace; font-size:11px; color:#9b9a97; flex-shrink:0;">'+pg(w.hint)+"</div>":""),E.addEventListener("mousedown",B=>{B.preventDefault(),f(w)}),o.appendChild(E)}),o.children[a]?.scrollIntoView({block:"nearest",inline:"nearest"})}function f(v){if(!n){c();return}let x=n;if(v.pickAndApply){c(),v.pickAndApply(e,x);return}if(!v.apply){c();return}let w=v.apply;e.applyMutation(T=>{let E=T.blocks.findIndex(O=>O.id===x);if(E<0)return w(T,x);let B=T.blocks.slice(),U=B[E];"inline"in U&&(B[E]={...U,inline:[]});let P={...T,blocks:B,selection:{kind:"caret",blockId:x,offset:0}};return w(P,x)},"structural"),c()}function g(){let v=p();v[a]&&f(v[a])}let y=v=>{if(d()){if(v.key==="Escape"){v.preventDefault(),c();return}if(v.key==="ArrowDown"){v.preventDefault(),a=Math.min(a+1,p().length-1),u();return}if(v.key==="ArrowUp"){v.preventDefault(),a=Math.max(a-1,0),u();return}if(v.key==="Enter"){v.preventDefault(),g();return}if(v.key==="Backspace"){if(r.length===0){v.preventDefault();let x=n;x&&e.applyMutation(w=>{let T=w.blocks.findIndex(U=>U.id===x);if(T<0)return w;let E=w.blocks.slice(),B=E[T];return"inline"in B&&(E[T]={...B,inline:[]}),{...w,blocks:E,selection:{kind:"caret",blockId:x,offset:0}}},"structural"),c();return}r=r.slice(0,-1),u();return}if(v.key.length===1&&!v.metaKey&&!v.ctrlKey&&!v.altKey){r+=v.key,u();return}}};t.addEventListener("keydown",y,!0);let b=e.subscribe(v=>{if(d())return;let x=window.getSelection();if(!x||x.rangeCount===0)return;let w=x.getRangeAt(0);if(!w.collapsed)return;let T=w.startContainer?.parentElement?.closest("[data-block-id]");if(!T)return;let E=T.dataset.blockId;if(!E)return;let B=e.getBlocks().find(P=>P.id===E);if(!B||B.kind!=="p")return;B.inline.map(P=>P.kind==="text"?P.text:"").join("")==="/"&&l(E)}),h=v=>{if(!d())return;let x=v.target;o?.contains(x)||c()};return document.addEventListener("mousedown",h,!0),{destroy(){c(),t.removeEventListener("keydown",y,!0),document.removeEventListener("mousedown",h,!0),b()}}}function pg(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Ww,Yw=L(()=>{"use strict";Do();mm();Ww=[{cmd:"p",label:"\u30C6\u30AD\u30B9\u30C8",desc:"\u30D7\u30EC\u30FC\u30F3\u6BB5\u843D",apply:(e,t)=>dn(e,t,"p")},{cmd:"h1",label:"\u898B\u51FA\u3057 1",desc:"\u5927\u304D\u306A\u898B\u51FA\u3057",hint:"#",apply:(e,t)=>dn(e,t,"h1")},{cmd:"h2",label:"\u898B\u51FA\u3057 2",desc:"\u4E2D\u898B\u51FA\u3057",hint:"##",apply:(e,t)=>dn(e,t,"h2")},{cmd:"h3",label:"\u898B\u51FA\u3057 3",desc:"\u5C0F\u898B\u51FA\u3057",hint:"###",apply:(e,t)=>dn(e,t,"h3")},{cmd:"todo",label:"ToDo",desc:"\u30C1\u30A7\u30C3\u30AF\u30DC\u30C3\u30AF\u30B9\u4ED8\u304D",hint:"[]",apply:(e,t)=>dn(e,t,"todo")},{cmd:"ul",label:"\u7B87\u6761\u66F8\u304D",desc:"\u30FB",hint:"-",apply:(e,t)=>oa(e,t,Hs())},{cmd:"ol",label:"\u756A\u53F7\u4ED8\u304D",desc:"1.",hint:"1.",apply:(e,t)=>oa(e,t,Fs())},{cmd:"quote",label:"\u5F15\u7528",desc:"\u5F15\u7528\u30D6\u30ED\u30C3\u30AF",hint:">",apply:(e,t)=>oa(e,t,Us())},{cmd:"callout",label:"\u30B3\u30FC\u30EB\u30A2\u30A6\u30C8",desc:"\u30D2\u30F3\u30C8 / \u6CE8\u610F\u30DC\u30C3\u30AF\u30B9",apply:(e,t)=>oa(e,t,Os())},{cmd:"pre",label:"\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF",desc:"\u6574\u5F62\u6E08\u307F\u30B3\u30FC\u30C9",hint:"```",apply:(e,t)=>oa(e,t,Rs())},{cmd:"hr",label:"\u533A\u5207\u308A\u7DDA",desc:"\u30BB\u30AF\u30B7\u30E7\u30F3\u533A\u5207\u308A",hint:"---",apply:(e,t)=>ei(oa(e,t,Ns()),t,rt(""))},{cmd:"table",label:"\u8868",desc:"\u7C21\u6613\u8868 (3\xD72)\u30FB\u30BB\u30EB\u7DE8\u96C6\u53EF",apply:(e,t)=>oa(e,t,oy(2,3))},{cmd:"inlinedb",label:"\u30A4\u30F3\u30E9\u30A4\u30F3DB",desc:"\u30DA\u30FC\u30B8\u306B DB \u3092\u57CB\u3081\u8FBC\u3080 (DB \u3092\u9078\u629E)",pickAndApply:uP},{cmd:"page",label:"\u30DA\u30FC\u30B8\u30EA\u30F3\u30AF",desc:"\u5225\u306E\u30DA\u30FC\u30B8\u3078\u306E\u30EA\u30F3\u30AF\u3092\u633F\u5165",hint:"[[",pickAndApply:pP}]});function Xw(e,t){let o=null;function n(){o=null,ta()}function r(){let s=e.getBlocks(),l=window.getSelection();if(!l||l.rangeCount===0){o&&n();return}let c=l.getRangeAt(0);if(!c.collapsed){o&&n();return}let d=c.startContainer?.parentElement?.closest("[data-block-id]");if(!d){o&&n();return}let p=d.dataset.blockId,u=s.find(h=>h.id===p);if(!u||!("inline"in u)){o&&n();return}let f=Lt(u.inline),g=fP(d);if(g<0){o&&n();return}let b=f.slice(0,g).match(/\[\[([^\[\]]*)$/);if(b){let h=g-b[0].length,v=b[1]||"";if(o)o={blockId:p,startOffset:h,triggerLength:b[0].length},dg(v);else{o={blockId:p,startOffset:h,triggerLength:b[0].length};let x=c.getBoundingClientRect();Ei({anchor:{bottom:x.bottom,left:x.left},query:v,onSelect:w=>{if(!o)return;let T=o;e.applyMutation(E=>{let B=Za(E,T.blockId,T.startOffset+T.triggerLength,-T.triggerLength);return Qa(B,T.blockId,T.startOffset,w.Id,w.Title||"")},"structural"),n()},onCancel:()=>n()})}}else o&&n()}let a=e.subscribe(()=>r()),i=()=>{(t.contains(document.activeElement)||mg())&&r()};return document.addEventListener("selectionchange",i),{destroy(){a(),document.removeEventListener("selectionchange",i),n()}}}function fP(e){let t=window.getSelection();if(!t||t.rangeCount===0)return-1;let o=t.getRangeAt(0);if(!e.contains(o.startContainer))return-1;let n=0,r=!1,a=i=>{if(r)return;if(i===o.startContainer){if(i.nodeType===3)n+=Math.min(o.startOffset,(i.textContent||"").length);else{let c=Array.from(i.childNodes);for(let d=0;d<o.startOffset&&d<c.length;d++)a(c[d])}r=!0;return}if(i.nodeType===3){n+=(i.textContent||"").length;return}if(i.nodeType!==1)return;let s=i;if(s.tagName.toLowerCase()==="br"){n+=1;return}if(s.classList.contains("memola-page-link")){n+=(s.textContent||"").length;return}for(let c of Array.from(s.childNodes))a(c)};for(let i of Array.from(e.childNodes))a(i);return r?n:-1}var Jw=L(()=>{"use strict";mm();Do();Qo()});async function Zw(e){let t=G+"/_api/web/GetFolderByServerRelativeUrl('"+e+"')";if((await fetch(t,{headers:{Accept:"application/json;odata=verbose"},credentials:"include"})).ok)return;let n=await xe(),r=await fetch(G+"/_api/web/folders",{method:"POST",headers:{Accept:"application/json;odata=verbose","Content-Type":"application/json;odata=verbose","X-RequestDigest":n},credentials:"include",body:JSON.stringify({__metadata:{type:"SP.Folder"},ServerRelativeUrl:e})});if(!r.ok&&r.status!==409)throw new Error("\u30D5\u30A9\u30EB\u30C0\u4F5C\u6210\u5931\u6557("+r.status+"): "+e)}async function gP(){await Zw(ls),await Zw(ls+"/"+ek)}async function ug(e,t="att",o=".bin"){await gP();let n=await xe(),r=(e.name.match(/\.[^./]+$/)?.[0]||o).toLowerCase(),a=t+"-"+Date.now()+"-"+Math.random().toString(36).slice(2,8)+r,i=ls+"/"+ek,s=G+"/_api/web/GetFolderByServerRelativeUrl('"+i+"')/Files/add(url='"+encodeURIComponent(a)+"',overwrite=true)",l=await fetch(s,{method:"POST",headers:{"X-RequestDigest":n},credentials:"include",body:await e.arrayBuffer()});if(!l.ok)throw new Error("\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5931\u6557: "+l.status);return G.replace(Xo,"")+i+"/"+a}async function Qw(e){return ug(e,"img",".png")}function tk(e,t){let o=!0,n=()=>window.getSelection()?.anchorNode?.parentElement?.closest("[data-block-id]")?.dataset.blockId||null,r=(l,c,d)=>{if(!o)return;let p=Yv(c,d);e.applyMutation(u=>{let f=u.blocks.slice(),g=l?f.findIndex(v=>v.id===l):f.length-1,y=g>=0?g+1:f.length;f.splice(y,0,p);let b=f[y+1],h;if(b&&b.kind!=="image"&&"inline"in b)h=b.id;else{let v=rt("");f.splice(y+1,0,v),h=v.id}return{...u,blocks:f,selection:{kind:"caret",blockId:h,offset:0}}},"structural")},a=async l=>{let c=l.clipboardData?.items;if(!c)return;let d=Array.from(c).find(u=>u.kind==="file"&&u.type.startsWith("image/"))?.getAsFile();if(!d)return;l.preventDefault(),l.stopPropagation();let p=n();try{_(!0,"\u753B\u50CF\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D...");let u=await Qw(d);r(p,u,d.name)}catch(u){o&&k("\u753B\u50CF\u633F\u5165\u5931\u6557: "+u.message,"err")}finally{_(!1)}},i=async l=>{if(!l.dataTransfer?.files?.length)return;let c=Array.from(l.dataTransfer.files).filter(p=>p.type.startsWith("image/"));if(c.length===0)return;l.preventDefault();let d=n();try{_(!0,"\u753B\u50CF\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D...");for(let p of c){if(!o)return;let u=await Qw(p);r(d,u,p.name),d=e.getBlocks().slice(-1)[0]?.id??d}}catch(p){o&&k("\u753B\u50CF\u633F\u5165\u5931\u6557: "+p.message,"err")}finally{_(!1)}},s=l=>{let c=l.target?.closest?.(".memola-img-resize");if(!c)return;let d=c.closest(".memola-img-wrap"),p=d?.querySelector(".memola-img"),f=c.closest("[data-block-id]")?.dataset.blockId;if(!d||!p||!f)return;l.preventDefault(),l.stopPropagation();let g=l.clientX,y=p.getBoundingClientRect().width,b=t.clientWidth||800,h=60,v=y,x=T=>{v=Math.max(h,Math.min(b,Math.round(y+(T.clientX-g)))),p.style.width=v+"px",d.style.width=v+"px"},w=()=>{document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",w),o&&e.applyMutation(T=>{let E=T.blocks.findIndex(U=>U.id===f);if(E<0||T.blocks[E].kind!=="image")return T;let B=T.blocks.slice();return B[E]={...B[E],width:v},{...T,blocks:B}},"structural")};document.addEventListener("mousemove",x),document.addEventListener("mouseup",w)};return t.addEventListener("paste",a,!0),t.addEventListener("drop",i),t.addEventListener("mousedown",s,!0),()=>{o=!1,t.removeEventListener("paste",a,!0),t.removeEventListener("drop",i),t.removeEventListener("mousedown",s,!0)}}var ek,fg=L(()=>{"use strict";Do();He();br();le();ek="attachments"});var Li=Vt($t=>{"use strict";Object.defineProperty($t,"__esModule",{value:!0});$t.arraysEqual=hP;$t.uInt2int=bP;$t.toHexStr=vP;$t.toHex1=it;$t.toHex2=yP;$t.toHex4=xP;$t.msftUuidStringify=wP;$t.emptyToNull=kP;$t.readSystemTime=IP;$t.readTransitionSystemTime=EP;$t.bin2HexUpper=TP;function hP(e,t){if(e===t)return!0;if(e==null||t==null||e.length!=t.length)return!1;for(var o=0;o<e.length;o++)if(e[o]!==t[o])return!1;return!0}function bP(e){for(var t=new Array(e.length),o=0;o<e.length;o++)t[o]=e[o]<<24>>24;return t}function vP(e,t){for(var o="";e!=0;)o="0123456789abcdef"[e&15]+o,e>>=4,o="0123456789abcdef"[e&15]+o,e>>=4;for(;o.length<t;)o="0"+o;return o}var _t="0123456789abcdef";function it(e){return _t[e>>4&15]+_t[e&15]}function yP(e){return _t[e>>12&15]+_t[e>>8&15]+_t[e>>4&15]+_t[e&15]}function xP(e){return _t[e>>28&15]+_t[e>>24&15]+_t[e>>20&15]+_t[e>>16&15]+_t[e>>12&15]+_t[e>>8&15]+_t[e>>4&15]+_t[e&15]}function wP(e,t){return""+it(e[t+3])+it(e[t+2])+it(e[t+1])+it(e[t+0])+"-"+it(e[t+5])+it(e[t+4])+"-"+it(e[t+7])+it(e[t+6])+"-"+it(e[t+8])+it(e[t+9])+"-"+it(e[t+10])+it(e[t+11])+it(e[t+12])+it(e[t+13])+it(e[t+14])+it(e[t+15])}function kP(e){return e===""?null:e}function Ti(e,t){return(""+e).padStart(t,"0")}function IP(e){var t=e.readUint16(),o=e.readUint16(),n=e.readUint16(),r=e.readUint16(),a=e.readUint16(),i=e.readUint16(),s=e.readUint16(),l=e.readUint16(),c="".concat(Ti(t,4),"-").concat(Ti(o,2),"-").concat(Ti(r,2),"T").concat(Ti(a,2),":").concat(Ti(i,2),":").concat(Ti(s,2),"Z");return c==="0000-00-00T00:00:00Z"?null:new Date(c)}function EP(e){var t=e.readUint16(),o=e.readUint16(),n=e.readUint16(),r=e.readUint16(),a=e.readUint16(),i=e.readUint16(),s=e.readUint16(),l=e.readUint16();return{year:t,month:o,dayOfWeek:n,day:r,hour:a,minute:i}}function TP(e){for(var t="";!e.isEof();)t+=it(e.readUint8());return t.toUpperCase()}});var pm=Vt(gg=>{"use strict";Object.defineProperty(gg,"__esModule",{value:!0});var LP=Li();gg.default={FILE_HEADER:(0,LP.uInt2int)([208,207,17,224,161,177,26,225]),MSG:{UNUSED_BLOCK:-1,END_OF_CHAIN:-2,S_BIG_BLOCK_SIZE:512,S_BIG_BLOCK_MARK:9,L_BIG_BLOCK_SIZE:4096,L_BIG_BLOCK_MARK:12,SMALL_BLOCK_SIZE:64,BIG_BLOCK_MIN_DOC_SIZE:4096,HEADER:{PROPERTY_START_OFFSET:48,BAT_START_OFFSET:76,BAT_COUNT_OFFSET:44,SBAT_START_OFFSET:60,SBAT_COUNT_OFFSET:64,XBAT_START_OFFSET:68,XBAT_COUNT_OFFSET:72},PROP:{NO_INDEX:-1,PROPERTY_SIZE:128,NAME_SIZE_OFFSET:64,MAX_NAME_LENGTH:64/2-1,TYPE_OFFSET:66,PREVIOUS_PROPERTY_OFFSET:68,NEXT_PROPERTY_OFFSET:72,CHILD_PROPERTY_OFFSET:76,START_BLOCK_OFFSET:116,SIZE_OFFSET:120,TYPE_ENUM:{UNALLOCATED:0,DIRECTORY:1,DOCUMENT:2,ROOT:5}},FIELD:{PREFIX:{ATTACHMENT:"__attach_version1.0",RECIPIENT:"__recip_version1.0",DOCUMENT:"__substg1.",NAMEID:"__nameid_version1.0"},NAME_MAPPING:{"001a":"messageClass","0037":"subject","0c1a":"senderName","0c1e":"senderAddressType","0c1f":"senderEmail","5d01":"senderSmtpAddress","5d02":"sentRepresentingSmtpAddress","5d0a":"creatorSMTPAddress","5d0b":"lastModifierSMTPAddress",1e3:"body","007d":"headers",1009:"compressedRtf","3ffa":"lastModifierName","0039":"clientSubmitTime","0e06":"messageDeliveryTime","3fde":"internetCodepage","3ffd":"messageCodepage","3ff1":"messageLocaleId","0e07":"messageFlags",1035:"messageId","3fd9":"preview",3007:"creationTime",3008:"lastModificationTime",3703:"extension",3704:"fileNameShort",3707:"fileName",3712:"pidContentId","7ffe":"attachmentHidden","370e":"attachMimeTag","0c15":"recipType",3001:"name",3002:"addressType",3003:"email","39fe":"smtpAddress","3a18":"departmentName","3a44":"middleName","3a05":"generation","3a11":"surname","3a27":"addressCity","3a16":"companyName","3a24":"businessFaxNumber","3a29":"streetAddress","3a51":"businessHomePage","3a06":"givenName","3a09":"homeTelephoneNumber","3a15":"postalAddress","3a17":"title","3a1c":"mobileTelephoneNumber","3a26":"country","3a28":"stateOrProvince","3a2a":"postalCode","3a45":"displayNamePrefix","0070":"conversationTopic","0e1d":"normalizedSubject","3a08":"businessTelephoneNumber","3a0d":"location"},FULL_NAME_MAPPING:{"1013001f":"bodyHtml",10130102:"html"},PIDLID_MAPPING:{"00062008-0000-0000-c000-000000000046":{34080:{id:"PidLidVerbStream"},34084:{id:"PidLidVerbResponse",dispid:"votingResponse"},34176:{id:"PidLidInternetAccountName",dispid:"inetAcctName"}},"00062002-0000-0000-c000-000000000046":{33293:{id:"PidLidAppointmentStartWhole",dispid:"apptStartWhole"},33294:{id:"PidLidAppointmentEndWhole",dispid:"apptEndWhole"},33333:{id:"PidLidClipStart",dispid:"clipStart"},33334:{id:"PidLidClipEnd",dispid:"clipEnd"},33331:{id:"PidLidTimeZoneStruct",dispid:"timeZoneStruct"},33332:{id:"PidLidTimeZoneDescription",dispid:"timeZoneDesc"},33374:{id:"PidLidAppointmentTimeZoneDefinitionStartDisplay",dispid:"apptTZDefStartDisplay"},33375:{id:"PidLidAppointmentTimeZoneDefinitionEndDisplay",dispid:"apptTZDefEndDisplay"},33376:{id:"PidLidAppointmentTimeZoneDefinitionRecur",dispid:"apptTZDefRecur"},33302:{id:"PidLidAppointmentRecur",dispid:"apptRecur"},33288:{id:"PidLidLocation",dispid:"apptLocation"}},"00062004-0000-0000-c000-000000000046":{32812:{id:"dispidYomiFirstName",dispid:"yomiFirstName"},32899:{id:"dispidEmail1EmailAddress",dispid:"email1EmailAddress"},32814:{id:"dispidYomiCompanyName",dispid:"yomiCompanyName"},32978:{id:"PidLidFax3AddressType",dispid:"fax3AddrType"},32896:{id:"PidLidEmail1DisplayName",dispid:"email1DisplayName"},32900:{id:"PidLidEmail1OriginalDisplayName",dispid:"email1OriginalDisplayName"},32773:{id:"PidLidFileUnder",dispid:"fileUnder"},32813:{id:"PidLidYomiLastName",dispid:"yomiLastName"},32946:{id:"PidLidFax1AddressType",dispid:"fax1AddrType"},32963:{id:"PidLidFax2EmailAddress",dispid:"fax2EmailAddress"},32838:{id:"PidLidWorkAddressCity",dispid:"workAddressCity"},32989:{id:"PidLidAddressCountryCode",dispid:"addressCountryCode"},32962:{id:"PidLidFax2AddressType",dispid:"fax2AddrType"},32964:{id:"PidLidFax2OriginalDisplayName",dispid:"fax2OriginalDisplayName"},32840:{id:"PidLidWorkAddressPostalCode",dispid:"workAddressPostalCode"},32837:{id:"PidLidWorkAddressStreet",dispid:"workAddressStreet"},32839:{id:"PidLidWorkAddressState",dispid:"workAddressState"},32987:{id:"PidLidWorkAddressCountryCode",dispid:"workAddressCountryCode"},32841:{id:"PidLidWorkAddressCountry",dispid:"workAddressCountry"},32811:{id:"PidLidHtml",dispid:"contactHtml"},32795:{id:"PidLidWorkAddress",dispid:"workAddress"},32948:{id:"PidLidFax1OriginalDisplayName",dispid:"fax1OriginalDisplayName"},32866:{id:"PidLidInstantMessagingAddress",dispid:"instMsg"},32784:{id:"PidLidDepartment",dispid:"department"},32947:{id:"PidLidFax1EmailAddress",dispid:"fax1EmailAddress"},32980:{id:"PidLidFax3OriginalDisplayName",dispid:"fax3OriginalDisplayName"},32979:{id:"PidLidFax3EmailAddress",dispid:"fax3EmailAddress"}},"6ed8da90-450b-101b-98da-00aa003f1305":{3:{id:"PidLidGlobalObjectId",dispid:"globalAppointmentID"},40:{id:"PidLidOldLocation",dispid:"apptOldLocation"}}},CLASS_MAPPING:{ATTACHMENT_DATA:"3701"},TYPE_MAPPING:{"001e":"string","001f":"unicode","0040":"time","0102":"binary","0003":"integer","000b":"boolean"},DIR_TYPE:{INNER_MSG:"000d"}}}}});var ik={};q(ik,{Buffer:()=>ak,StringDecoder:()=>um,decode:()=>nk,default:()=>MP,encode:()=>ok,encodingExists:()=>rk});function ok(e,t){throw new Error("iconv-lite (encode) is not available in browser build")}function nk(e,t){try{return new TextDecoder(t).decode(e)}catch{return new TextDecoder("utf-8",{fatal:!1}).decode(e)}}function rk(e){return!1}var ak,um,SP,MP,sk=L(()=>{"use strict";ak={isBuffer:e=>!1,from:e=>typeof e=="string"?new TextEncoder().encode(e):e instanceof Uint8Array?e:new Uint8Array(e)},um=class{constructor(t="utf-8"){this.enc=t}write(t){try{return new TextDecoder(this.enc).decode(t)}catch{return new TextDecoder("utf-8").decode(t)}}end(){return""}},SP={encode:ok,decode:nk,encodingExists:rk,Buffer:ak,StringDecoder:um},MP=SP});var El=Vt(hg=>{"use strict";Object.defineProperty(hg,"__esModule",{value:!0});var lk=(sk(),G1(ik)),PP=function(){function e(t,o,n){if(this._dynamicSize=!0,this._byteLength=0,this.failurePosition=0,this._byteOffset=o||0,t instanceof ArrayBuffer)this.buffer=t;else if(t instanceof DataView)this.dataView=t;else if(t&&t.buffer instanceof ArrayBuffer)this._byteOffset+=t.byteOffset,this._buffer=t.buffer,this._dataView=new DataView(this._buffer,this._byteOffset),this._byteLength=this._dataView.byteLength+this._byteOffset;else throw new Error("Unknown arrayBuffer");this.position=0,this.endianness=n??e.LITTLE_ENDIAN}return e.prototype.save=function(t){var o=new Blob([this.buffer]),n=window.webkitURL||window.URL;if(n&&n.createObjectURL){var r=n.createObjectURL(o),a=document.createElement("a");a.setAttribute("href",r),a.setAttribute("download",t),a.click(),n.revokeObjectURL(r)}else throw"DataStream.save: Can't create object URL."},Object.defineProperty(e.prototype,"dynamicSize",{get:function(){return this._dynamicSize},set:function(t){t||this._trimAlloc(),this._dynamicSize=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"byteLength",{get:function(){return this._byteLength-this._byteOffset},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"buffer",{get:function(){return this._trimAlloc(),this._buffer},set:function(t){this._buffer=t,this._dataView=new DataView(this._buffer,this._byteOffset),this._byteLength=this._buffer.byteLength},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"byteOffset",{get:function(){return this._byteOffset},set:function(t){this._byteOffset=t,this._dataView=new DataView(this._buffer,this._byteOffset),this._byteLength=this._buffer.byteLength},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"dataView",{get:function(){return this._dataView},set:function(t){this._byteOffset=t.byteOffset,this._buffer=t.buffer,this._dataView=new DataView(this._buffer,this._byteOffset),this._byteLength=this._byteOffset+t.byteLength},enumerable:!1,configurable:!0}),e.prototype._realloc=function(t){if(this._dynamicSize){var o=this._byteOffset+this.position+t,n=this._buffer.byteLength;if(o<=n){o>this._byteLength&&(this._byteLength=o);return}for(n<1&&(n=1);o>n;)n*=2;var r=new ArrayBuffer(n),a=new Uint8Array(this._buffer),i=new Uint8Array(r,0,a.length);i.set(a),this.buffer=r,this._byteLength=o}},e.prototype._trimAlloc=function(){if(this._byteLength!=this._buffer.byteLength){var t=new ArrayBuffer(this._byteLength),o=new Uint8Array(t),n=new Uint8Array(this._buffer,0,o.length);o.set(n),this.buffer=t}},e.prototype.seek=function(t){var o=Math.max(0,Math.min(this.byteLength,t));this.position=isNaN(o)||!isFinite(o)?0:o},e.prototype.isEof=function(){return this.position>=this.byteLength},e.prototype.mapInt32Array=function(t,o){this._realloc(t*4);var n=new Int32Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*4,n},e.prototype.mapInt16Array=function(t,o){this._realloc(t*2);var n=new Int16Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*2,n},e.prototype.mapInt8Array=function(t){this._realloc(t*1);var o=new Int8Array(this._buffer,this.byteOffset+this.position,t);return this.position+=t*1,o},e.prototype.mapUint32Array=function(t,o){this._realloc(t*4);var n=new Uint32Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*4,n},e.prototype.mapUint16Array=function(t,o){this._realloc(t*2);var n=new Uint16Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*2,n},e.prototype.mapUint8Array=function(t){this._realloc(t*1);var o=new Uint8Array(this._buffer,this.byteOffset+this.position,t);return this.position+=t*1,o},e.prototype.mapFloat64Array=function(t,o){this._realloc(t*8);var n=new Float64Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*8,n},e.prototype.mapFloat32Array=function(t,o){this._realloc(t*4);var n=new Float32Array(this._buffer,this.byteOffset+this.position,t);return e.arrayToNative(n,o??this.endianness),this.position+=t*4,n},e.prototype.readInt32Array=function(t,o){t=t??(this.byteLength-this.position)/4;var n=new Int32Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readInt16Array=function(t,o){t=t??(this.byteLength-this.position)/2;var n=new Int16Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readInt8Array=function(t){t=t??this.byteLength-this.position;var o=new Int8Array(t);return e.memcpy(o.buffer,0,this.buffer,this.byteOffset+this.position,t*o.BYTES_PER_ELEMENT),this.position+=o.byteLength,o},e.prototype.readUint32Array=function(t,o){t=t??(this.byteLength-this.position)/4;var n=new Uint32Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readUint16Array=function(t,o){t=t??(this.byteLength-this.position)/2;var n=new Uint16Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readUint8Array=function(t){t=t??this.byteLength-this.position;var o=new Uint8Array(t);return e.memcpy(o.buffer,0,this.buffer,this.byteOffset+this.position,t*o.BYTES_PER_ELEMENT),this.position+=o.byteLength,o},e.prototype.readToUint8Array=function(t,o,n){t=t??this.byteLength-this.position,e.memcpy(o.buffer,n,this.buffer,this.byteOffset+this.position,t*o.BYTES_PER_ELEMENT),this.position+=o.byteLength},e.prototype.readFloat64Array=function(t,o){t=t??(this.byteLength-this.position)/8;var n=new Float64Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.readFloat32Array=function(t,o){t=t??(this.byteLength-this.position)/4;var n=new Float32Array(t);return e.memcpy(n.buffer,0,this.buffer,this.byteOffset+this.position,t*n.BYTES_PER_ELEMENT),e.arrayToNative(n,o??this.endianness),this.position+=n.byteLength,n},e.prototype.writeInt32Array=function(t,o){if(this._realloc(t.length*4),t instanceof Int32Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapInt32Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeInt32(t[n],o)},e.prototype.writeInt16Array=function(t,o){if(this._realloc(t.length*2),t instanceof Int16Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapInt16Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeInt16(t[n],o)},e.prototype.writeInt8Array=function(t){if(this._realloc(t.length*1),t instanceof Int8Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapInt8Array(t.length);else for(var o=0;o<t.length;o++)this.writeInt8(t[o])},e.prototype.writeUint32Array=function(t,o){if(this._realloc(t.length*4),t instanceof Uint32Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapUint32Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeUint32(t[n],o)},e.prototype.writeUint16Array=function(t,o){if(this._realloc(t.length*2),t instanceof Uint16Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapUint16Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeUint16(t[n],o)},e.prototype.writeUint8Array=function(t){if(this._realloc(t.length*1),t instanceof Uint8Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapUint8Array(t.length);else for(var o=0;o<t.length;o++)this.writeUint8(t[o])},e.prototype.writeFloat64Array=function(t,o){if(this._realloc(t.length*8),t instanceof Float64Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapFloat64Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeFloat64(t[n],o)},e.prototype.writeFloat32Array=function(t,o){if(this._realloc(t.length*4),t instanceof Float32Array&&this.byteOffset+this.position%t.BYTES_PER_ELEMENT==0)e.memcpy(this._buffer,this.byteOffset+this.position,t.buffer,0,t.byteLength),this.mapFloat32Array(t.length,o);else for(var n=0;n<t.length;n++)this.writeFloat32(t[n],o)},e.prototype.readInt32=function(t){var o=this._dataView.getInt32(this.position,t??this.endianness);return this.position+=4,o},e.prototype.readInt=function(t){return this.seek(t),this.readInt32()},e.prototype.readInt16=function(t){var o=this._dataView.getInt16(this.position,t??this.endianness);return this.position+=2,o},e.prototype.readShort=function(t){return this.seek(t),this.readInt16()},e.prototype.readInt8=function(){var t=this._dataView.getInt8(this.position);return this.position+=1,t},e.prototype.readByte=function(t){return this.seek(t),this.readInt8()},e.prototype.readUint32=function(t){var o=this._dataView.getUint32(this.position,t??this.endianness);return this.position+=4,o},e.prototype.readUint16=function(t){var o=this._dataView.getUint16(this.position,t??this.endianness);return this.position+=2,o},e.prototype.readUint8=function(){var t=this._dataView.getUint8(this.position);return this.position+=1,t},e.prototype.readFloat32=function(t){var o=this._dataView.getFloat32(this.position,t??this.endianness);return this.position+=4,o},e.prototype.readFloat64=function(t){var o=this._dataView.getFloat64(this.position,t??this.endianness);return this.position+=8,o},e.prototype.writeInt32=function(t,o){this._realloc(4),this._dataView.setInt32(this.position,t,o??this.endianness),this.position+=4},e.prototype.writeInt16=function(t,o){this._realloc(2),this._dataView.setInt16(this.position,t,o??this.endianness),this.position+=2},e.prototype.writeInt8=function(t){this._realloc(1),this._dataView.setInt8(this.position,t),this.position+=1},e.prototype.writeUint32=function(t,o){this._realloc(4),this._dataView.setUint32(this.position,t,o??this.endianness),this.position+=4},e.prototype.writeUint16=function(t,o){this._realloc(2),this._dataView.setUint16(this.position,t,o??this.endianness),this.position+=2},e.prototype.writeUint8=function(t){this._realloc(1),this._dataView.setUint8(this.position,t),this.position+=1},e.prototype.writeFloat32=function(t,o){this._realloc(4),this._dataView.setFloat32(this.position,t,o??this.endianness),this.position+=4},e.prototype.writeFloat64=function(t,o){this._realloc(8),this._dataView.setFloat64(this.position,t,o??this.endianness),this.position+=8},e.memcpy=function(t,o,n,r,a){var i=new Uint8Array(t,o,a),s=new Uint8Array(n,r,a);i.set(s)},e.arrayToNative=function(t,o){return o==this.endianness?t:this.flipArrayEndianness(t)},e.nativeToEndian=function(t,o){return this.endianness==o?t:this.flipArrayEndianness(t)},e.flipArrayEndianness=function(t){for(var o=new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=0;n<t.byteLength;n+=t.BYTES_PER_ELEMENT)for(var r=n+t.BYTES_PER_ELEMENT-1,a=n;r>a;r--,a++){var i=o[a];o[a]=o[r],o[r]=i}return t},e.createStringFromArray=function(t){for(var o="",n=0;n<t.length;n++)o+=String.fromCharCode(t[n]);return o},e.prototype.readStruct=function(t){for(var o={},n,r,a,i=this.position,s=0;s<t.length;s+=2){if(n=t[s+1],r=this.readType(n,o),r==null)return this.failurePosition==0&&(this.failurePosition=this.position),this.position=i,null;o[t[s]]=r}return o},e.prototype.readUCS2String=function(t,o){return e.createStringFromArray(this.readUint16Array(t,o))},e.prototype.readStringAt=function(t,o){return this.seek(t),this.readUCS2String(o)},e.prototype.writeUCS2String=function(t,o,n){n==null&&(n=t.length);for(var r=0;r<t.length&&r<n;r++)this.writeUint16(t.charCodeAt(r),o);for(;r<n;r++)this.writeUint16(0,o)},e.prototype.readString=function(t,o){return o==null||o=="ASCII"?e.createStringFromArray(this.mapUint8Array(t??this.byteLength-this.position)):lk.decode(this.mapUint8Array(t),o)},e.prototype.writeString=function(t,o,n){if(o==null||o=="ASCII")if(n!=null){var r=0,a=Math.min(t.length,n);for(r=0;r<a;r++)this.writeUint8(t.charCodeAt(r));for(;r<n;r++)this.writeUint8(0)}else for(var r=0;r<t.length;r++)this.writeUint8(t.charCodeAt(r));else this.writeUint8Array(lk.encode(t.substring(0,n),o))},e.prototype.readCString=function(t){var o=this.byteLength-this.position,n=new Uint8Array(this._buffer,this._byteOffset+this.position),r=o;t!=null&&(r=Math.min(t,o));for(var a=0;a<r&&n[a]!=0;a++);var i=e.createStringFromArray(this.mapUint8Array(a));return t!=null?this.position+=r-a:a!=o&&(this.position+=1),i},e.prototype.writeCString=function(t,o){if(o!=null){var n=0,r=Math.min(t.length,o);for(n=0;n<r;n++)this.writeUint8(t.charCodeAt(n));for(;n<o;n++)this.writeUint8(0)}else{for(var n=0;n<t.length;n++)this.writeUint8(t.charCodeAt(n));this.writeUint8(0)}},e.prototype.readType=function(t,o){if(typeof t=="function")return t(this,o);if(typeof t=="object"&&!(t instanceof Array))return t.get(this,o);if(t instanceof Array&&t.length!=3)return this.readStruct(t);var n=null,r=null,a="ASCII",i=this.position,s;if(typeof t=="string"&&/:/.test(t)){var l=t.split(":");t=l[0],s=l[1],o[s]!=null?r=parseInt(o[s]):r=parseInt(l[1])}if(typeof t=="string"&&/,/.test(t)){var l=t.split(",");t=l[0],a=parseInt(l[1]).toString()}switch(t){case"uint8":n=this.readUint8();break;case"int8":n=this.readInt8();break;case"uint16":n=this.readUint16(this.endianness);break;case"int16":n=this.readInt16(this.endianness);break;case"uint32":n=this.readUint32(this.endianness);break;case"int32":n=this.readInt32(this.endianness);break;case"float32":n=this.readFloat32(this.endianness);break;case"float64":n=this.readFloat64(this.endianness);break;case"uint16be":n=this.readUint16(e.BIG_ENDIAN);break;case"int16be":n=this.readInt16(e.BIG_ENDIAN);break;case"uint32be":n=this.readUint32(e.BIG_ENDIAN);break;case"int32be":n=this.readInt32(e.BIG_ENDIAN);break;case"float32be":n=this.readFloat32(e.BIG_ENDIAN);break;case"float64be":n=this.readFloat64(e.BIG_ENDIAN);break;case"uint16le":n=this.readUint16(e.LITTLE_ENDIAN);break;case"int16le":n=this.readInt16(e.LITTLE_ENDIAN);break;case"uint32le":n=this.readUint32(e.LITTLE_ENDIAN);break;case"int32le":n=this.readInt32(e.LITTLE_ENDIAN);break;case"float32le":n=this.readFloat32(e.LITTLE_ENDIAN);break;case"float64le":n=this.readFloat64(e.LITTLE_ENDIAN);break;case"cstring":n=this.readCString(r);break;case"string":n=this.readString(r,a);break;case"u16string":n=this.readUCS2String(r,this.endianness);break;case"u16stringle":n=this.readUCS2String(r,e.LITTLE_ENDIAN);break;case"u16stringbe":n=this.readUCS2String(r,e.BIG_ENDIAN);break;default:if(t.length==3){var c=t[1],s=t[2],d=0;if(typeof s=="function"?d=s(o,this,t):typeof s=="string"&&o[s]!=null?d=parseInt(o[s]):d=parseInt(s),typeof c=="string"){var p=c.replace(/(le|be)$/,""),u=null;switch(/le$/.test(c)?u=e.LITTLE_ENDIAN:/be$/.test(c)&&(u=e.BIG_ENDIAN),s=="*"&&(d=null),p){case"uint8":n=this.readUint8Array(d);break;case"uint16":n=this.readUint16Array(d,u);break;case"uint32":n=this.readUint32Array(d,u);break;case"int8":n=this.readInt8Array(d);break;case"int16":n=this.readInt16Array(d,u);break;case"int32":n=this.readInt32Array(d,u);break;case"float32":n=this.readFloat32Array(d,u);break;case"float64":n=this.readFloat64Array(d,u);break;case"cstring":case"utf16string":case"string":if(d==null)for(n=[];!this.isEof();){var f=this.readType(c,o);if(f==null)break;n.push(f)}else{n=new Array(d);for(var g=0;g<d;g++)n[g]=this.readType(c,o)}break}}else if(s=="*")for(n=[],this.buffer;;){var y=this.position;try{var b=this.readType(c,o);if(b==null){this.position=y;break}n.push(b)}catch{this.position=y;break}}else{n=new Array(d);for(var g=0;g<d;g++){var f=this.readType(c,o);if(f==null)return null;n[g]=f}}break}}return r!=null&&(this.position=i+r),n},e.prototype.writeStruct=function(t,o){for(var n=0;n<t.length;n+=2){var r=t[n+1];this.writeType(r,o[t[n]],o)}},e.prototype.writeType=function(t,o,n){if(typeof t=="function")return t(this,o);if(typeof t=="object"&&!(t instanceof Array))return t.set(this,o,n);var r=null,a="ASCII",i=this.position;if(typeof t=="string"&&/:/.test(t)){var s=t.split(":");t=s[0],r=parseInt(s[1])}if(typeof t=="string"&&/,/.test(t)){var s=t.split(",");t=s[0],a=parseInt(s[1]).toString()}switch(t){case"uint8":this.writeUint8(o);break;case"int8":this.writeInt8(o);break;case"uint16":this.writeUint16(o,this.endianness);break;case"int16":this.writeInt16(o,this.endianness);break;case"uint32":this.writeUint32(o,this.endianness);break;case"int32":this.writeInt32(o,this.endianness);break;case"float32":this.writeFloat32(o,this.endianness);break;case"float64":this.writeFloat64(o,this.endianness);break;case"uint16be":this.writeUint16(o,e.BIG_ENDIAN);break;case"int16be":this.writeInt16(o,e.BIG_ENDIAN);break;case"uint32be":this.writeUint32(o,e.BIG_ENDIAN);break;case"int32be":this.writeInt32(o,e.BIG_ENDIAN);break;case"float32be":this.writeFloat32(o,e.BIG_ENDIAN);break;case"float64be":this.writeFloat64(o,e.BIG_ENDIAN);break;case"uint16le":this.writeUint16(o,e.LITTLE_ENDIAN);break;case"int16le":this.writeInt16(o,e.LITTLE_ENDIAN);break;case"uint32le":this.writeUint32(o,e.LITTLE_ENDIAN);break;case"int32le":this.writeInt32(o,e.LITTLE_ENDIAN);break;case"float32le":this.writeFloat32(o,e.LITTLE_ENDIAN);break;case"float64le":this.writeFloat64(o,e.LITTLE_ENDIAN);break;case"cstring":this.writeCString(o,r);break;case"string":this.writeString(o,a,r);break;case"u16string":this.writeUCS2String(o,this.endianness,r);break;case"u16stringle":this.writeUCS2String(o,e.LITTLE_ENDIAN,r);break;case"u16stringbe":this.writeUCS2String(o,e.BIG_ENDIAN,r);break;default:if(t.length==3){for(var l=t[1],c=0;c<o.length;c++)this.writeType(l,o[c],t[2]);break}else{this.writeStruct(t,o);break}}r!=null&&(this.position=i,this._realloc(r),this.position=i+r)},e.BIG_ENDIAN=!1,e.LITTLE_ENDIAN=!0,e.endianness=new Int8Array(new Int16Array([1]).buffer)[0]>0,e}();hg.default=PP;Uint8Array.prototype.BYTES_PER_ELEMENT===void 0&&(Object.defineProperties(Uint8Array.prototype,{BYTES_PER_ELEMENT:{value:Uint8Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Int8Array.prototype,{BYTES_PER_ELEMENT:{value:Int8Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Uint8ClampedArray.prototype,{BYTES_PER_ELEMENT:{value:Uint8ClampedArray.BYTES_PER_ELEMENT}}),Object.defineProperties(Uint16Array.prototype,{BYTES_PER_ELEMENT:{value:Uint16Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Int16Array.prototype,{BYTES_PER_ELEMENT:{value:Int16Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Uint32Array.prototype,{BYTES_PER_ELEMENT:{value:Uint32Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Int32Array.prototype,{BYTES_PER_ELEMENT:{value:Int32Array.BYTES_PER_ELEMENT}}),Object.defineProperties(Float64Array.prototype,{BYTES_PER_ELEMENT:{value:Float64Array.BYTES_PER_ELEMENT}}))});var bg=Vt(Zn=>{"use strict";var dk=Zn&&Zn.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Zn,"__esModule",{value:!0});Zn.Reader=Zn.TypeEnum=void 0;var ck=dk(El()),CP=Li(),ae=dk(pm()),Si;(function(e){e[e.DIRECTORY=1]="DIRECTORY",e[e.DOCUMENT=2]="DOCUMENT",e[e.ROOT=5]="ROOT"})(Si||(Zn.TypeEnum=Si={}));var AP=function(){function e(t){this.ds=new ck.default(t,0,ck.default.LITTLE_ENDIAN)}return e.prototype.isMSGFile=function(){return this.ds.seek(0),(0,CP.arraysEqual)(ae.default.FILE_HEADER,this.ds.readInt8Array(ae.default.FILE_HEADER.length))},e.prototype.headerData=function(){this.bigBlockSize=this.ds.readByte(30)==ae.default.MSG.L_BIG_BLOCK_MARK?ae.default.MSG.L_BIG_BLOCK_SIZE:ae.default.MSG.S_BIG_BLOCK_SIZE,this.bigBlockLength=this.bigBlockSize/4,this.xBlockLength=this.bigBlockLength-1,this.batCount=this.ds.readInt(ae.default.MSG.HEADER.BAT_COUNT_OFFSET),this.propertyStart=this.ds.readInt(ae.default.MSG.HEADER.PROPERTY_START_OFFSET),this.sbatStart=this.ds.readInt(ae.default.MSG.HEADER.SBAT_START_OFFSET),this.sbatCount=this.ds.readInt(ae.default.MSG.HEADER.SBAT_COUNT_OFFSET),this.xbatStart=this.ds.readInt(ae.default.MSG.HEADER.XBAT_START_OFFSET),this.xbatCount=this.ds.readInt(ae.default.MSG.HEADER.XBAT_COUNT_OFFSET)},e.prototype.convertName=function(t){var o=this.ds.readShort(t+ae.default.MSG.PROP.NAME_SIZE_OFFSET);return o<1?"":this.ds.readStringAt(t,o/2).split("\0")[0]},e.prototype.convertProperty=function(t){return{type:this.ds.readByte(t+ae.default.MSG.PROP.TYPE_OFFSET),name:this.convertName(t),previousProperty:this.ds.readInt(t+ae.default.MSG.PROP.PREVIOUS_PROPERTY_OFFSET),nextProperty:this.ds.readInt(t+ae.default.MSG.PROP.NEXT_PROPERTY_OFFSET),childProperty:this.ds.readInt(t+ae.default.MSG.PROP.CHILD_PROPERTY_OFFSET),startBlock:this.ds.readInt(t+ae.default.MSG.PROP.START_BLOCK_OFFSET),sizeBlock:this.ds.readInt(t+ae.default.MSG.PROP.SIZE_OFFSET)}},e.prototype.convertBlockToProperties=function(t,o){for(var n=this.bigBlockSize/ae.default.MSG.PROP.PROPERTY_SIZE,r=this.getBlockOffsetAt(t),a=0;a<n&&!(this.ds.byteLength<r+ae.default.MSG.PROP.TYPE_OFFSET);a++){var i=this.ds.readByte(r+ae.default.MSG.PROP.TYPE_OFFSET);switch(i){case ae.default.MSG.PROP.TYPE_ENUM.ROOT:case ae.default.MSG.PROP.TYPE_ENUM.DIRECTORY:case ae.default.MSG.PROP.TYPE_ENUM.DOCUMENT:o.push(this.convertProperty(r));break;case ae.default.MSG.PROP.TYPE_ENUM.UNALLOCATED:default:o.push({type:i,name:"",previousProperty:-1,nextProperty:-1,childProperty:-1,startBlock:0,sizeBlock:0});break}r+=ae.default.MSG.PROP.PROPERTY_SIZE}},e.prototype.createPropertyHierarchy=function(t,o){if(!(!o||o.childProperty==ae.default.MSG.PROP.NO_INDEX)){o.children=[];for(var n=[{currentMode:"walk",currentIndex:o.childProperty}];n.length!=0;){var r=n.pop(),a=r.currentMode,i=r.currentIndex,s=t[i];a==="push"?o.children.push(i):(s.type==ae.default.MSG.PROP.TYPE_ENUM.DIRECTORY&&this.createPropertyHierarchy(t,s),s.nextProperty!=ae.default.MSG.PROP.NO_INDEX&&n.push({currentMode:"walk",currentIndex:s.nextProperty}),n.push({currentMode:"push",currentIndex:i}),s.previousProperty!=ae.default.MSG.PROP.NO_INDEX&&n.push({currentMode:"walk",currentIndex:s.previousProperty}))}}},e.prototype.propertyDataReader=function(t){for(var o=[],n=t;n!=ae.default.MSG.END_OF_CHAIN;)this.convertBlockToProperties(n,o),n=this.getNextBlock(n);return this.createPropertyHierarchy(o,o[0]),o},e.prototype.parse=function(){this.headerData(),this.batData=this.batDataReader(),this.xbatCount>0&&this.xbatDataReader(),this.sbatData=this.sbatDataReader(),this.propertyData=this.propertyDataReader(this.propertyStart),this.bigBlockTable=this.readBigBlockTable()},e.prototype.batCountInHeader=function(){var t=(ae.default.MSG.S_BIG_BLOCK_SIZE-ae.default.MSG.HEADER.BAT_START_OFFSET)/4;return Math.min(this.batCount,t)},e.prototype.batDataReader=function(){var t=new Array(this.batCountInHeader());this.ds.seek(ae.default.MSG.HEADER.BAT_START_OFFSET);for(var o=0;o<t.length;o++)t[o]=this.ds.readInt32();return t},e.prototype.getBlockOffsetAt=function(t){return(t+1)*this.bigBlockSize},e.prototype.getBlockAt=function(t){var o=this.getBlockOffsetAt(t);return this.ds.seek(o),this.ds.readInt32Array(this.bigBlockLength)},e.prototype.getBlockValueAt=function(t,o){var n=this.getBlockOffsetAt(t);return this.ds.seek(n+4*o),this.ds.readInt32()},e.prototype.getNextBlockInner=function(t,o){var n=Math.floor(t/this.bigBlockLength),r=t%this.bigBlockLength,a=o[n];return typeof a>"u"?ae.default.MSG.END_OF_CHAIN:this.getBlockValueAt(a,r)},e.prototype.getNextBlock=function(t){return this.getNextBlockInner(t,this.batData)},e.prototype.sbatDataReader=function(){for(var t=[],o=this.sbatStart,n=0;n<this.sbatCount&&o&&o!=ae.default.MSG.END_OF_CHAIN;n++)t.push(o),o=this.getNextBlock(o);return t},e.prototype.xbatDataReader=function(){for(var t=this.batCountInHeader(),o=this.batCount,n=o-t,r=this.xbatStart,a=0;a<this.xbatCount;a++){for(var i=this.getBlockAt(r),s=Math.min(n,this.xBlockLength),l=0;l<s;l++){var c=i[l];if(c==ae.default.MSG.UNUSED_BLOCK||c==ae.default.MSG.END_OF_CHAIN)break;this.batData.push(c)}if(n-=s,r=i[this.xBlockLength],r==ae.default.MSG.UNUSED_BLOCK||r==ae.default.MSG.END_OF_CHAIN)break}},e.prototype.getNextBlockSmall=function(t){return this.getNextBlockInner(t,this.sbatData)},e.prototype.getChainByBlockSmall=function(t){for(var o=[],n=t.startBlock;n!=ae.default.MSG.END_OF_CHAIN;)o.push(n),n=this.getNextBlockSmall(n);return o},e.prototype.readBigBlockTable=function(){for(var t=this.propertyData[0],o=[],n=t.startBlock,r=0;n!=ae.default.MSG.END_OF_CHAIN;r++)o.push(n),n=this.getNextBlock(n);return o},e.prototype.readDataByBlockSmall=function(t,o,n,r){var a=t*ae.default.MSG.SMALL_BLOCK_SIZE,i=Math.floor(a/this.bigBlockSize),s=a%this.bigBlockSize,l=this.bigBlockTable[i],c=this.getBlockOffsetAt(l);return this.ds.seek(c+s),this.ds.readToUint8Array(o,n,r)},e.prototype.readChainDataByBlockSmall=function(t,o){for(var n=new Uint8Array(t.sizeBlock),r=0,a=0;r<o.length;r++){var i=n.length<a+ae.default.MSG.SMALL_BLOCK_SIZE?n.length-a:ae.default.MSG.SMALL_BLOCK_SIZE;this.readDataByBlockSmall(o[r],i,n,a),a+=i}return n},e.prototype.readProperty=function(t){if(t.sizeBlock)if(t.sizeBlock<ae.default.MSG.BIG_BLOCK_MIN_DOC_SIZE){var o=this.getChainByBlockSmall(t);if(o.length==1){var n=new Uint8Array(t.sizeBlock);return this.readDataByBlockSmall(t.startBlock,t.sizeBlock,n,0),n}else if(o.length>1)return this.readChainDataByBlockSmall(t,o);return new Uint8Array(0)}else{for(var r=t.startBlock,a=t.sizeBlock,i=0,n=new Uint8Array(t.sizeBlock);1<=a;){var s=this.getBlockOffsetAt(r);this.ds.seek(s);var l=Math.min(a,this.bigBlockSize),c=this.ds.readUint8Array(l);n.set(c,i),i+=l,a-=l,r=this.getNextBlock(r)}return n}else return new Uint8Array(0)},e.prototype.readFileOf=function(t){return this.readProperty(this.propertyData[t])},e.prototype.folderOf=function(t){var o=this,n=this.propertyData;if(!n)return null;var r=n[t];return{dataId:t,name:r.name,fileNames:function(){var a=r.children;return a?a.map(function(i){return n[i]}).filter(function(i){return i.type===Si.DOCUMENT}).map(function(i){return i.name}):[]},fileNameSets:function(){var a=r.children;return a?a.map(function(i){return{subIndex:i,entry:n[i]}}).filter(function(i){return i.entry.type===Si.DOCUMENT}).map(function(i){return{name:i.entry.name,length:i.entry.sizeBlock,dataId:i.subIndex,provider:function(){return o.readProperty(i.entry)}}}):[]},subFolders:function(){var a=r.children;return a?a.filter(function(i){return n[i].type==Si.DIRECTORY}).map(function(i){return o.folderOf(i)}):[]},readFile:function(a){var i=r.children;if(i)for(var s=0,l=i;s<l.length;s++){var c=l[s],d=n[c];if(d&&d.type===Si.DOCUMENT&&d.name===a)return o.readProperty(d)}return null}}},e.prototype.rootFolder=function(){return this.folderOf(0)},e}();Zn.Reader=AP});var fk=Vt(Tl=>{"use strict";var uk=Tl&&Tl.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Tl,"__esModule",{value:!0});Tl.burn=RP;var na=bg(),mk=uk(El()),BP=uk(pm());function Mi(e){return e+511&-512}function DP(e){return e+63&-64}var pk=function(){function e(t){this.sectors=t}return e.prototype.allocate=function(t){for(var o=this.sectors.length,n=0;n<t;n++){var r=n+1===t?-2:o+n+1;this.sectors.push(r)}return o},e.prototype.allocateAs=function(t,o){for(var n=this.sectors.length,r=0;r<t;r++)this.sectors.push(o);return n},e.prototype.finalize=function(t,o){for(var n=(t-this.sectors.length%t)%t;n>=1;n-=1)this.sectors.push(o);return this},e.prototype.count=function(){return this.sectors.length},e}(),_P=function(){function e(t){this.fat=new pk([]),this.miniFat=new pk([]),this.liteEnts=t.map(function(se){return{entry:se,left:-1,right:-1,child:-1,firstSector:0,isMini:se.length<4096,isRed:!1}}),this.buildTree(0);for(var o=this.fat.allocate(Mi(128*this.liteEnts.length)/512),n=0,r=this.liteEnts.filter(function(se){return se.entry.type==na.TypeEnum.DOCUMENT&&se.isMini===!1});n<r.length;n++){var a=r[n];a.firstSector=a.entry.length===0?-2:this.fat.allocate(Mi(a.entry.length)/512)}for(var i=0,s=this.liteEnts.filter(function(se){return se.entry.type==na.TypeEnum.DOCUMENT&&se.isMini===!0});i<s.length;i++){var a=s[i];a.firstSector=a.entry.length===0?-2:this.miniFat.allocate(DP(a.entry.length)/64)}var l=Mi(4*this.miniFat.count())/512,c=l!==0?this.fat.allocate(l):-2,d=64*this.miniFat.count(),p=this.fat.allocate(Mi(d)/512);this.liteEnts[0].firstSector=p;var u=this.fat.allocateAs(Mi(4*(this.fat.count()+this.fat.count()/128+this.fat.count()/(128*109)))/512,-3),f=this.fat.count()-u,g=f>109?Mi(4*Math.floor((f-109)/127*128))/512:0,y=g!==0?this.fat.allocateAs(g,-4):-2,b=new ArrayBuffer(512*(1+this.fat.count())),h=new mk.default(b,0,mk.default.LITTLE_ENDIAN);h.dynamicSize=!1,this.miniFat.finalize(512/4,-1);var v=[],x=[];{for(var w=0;w<109&&w<f;w++)v.push(u+w);for(var T=y+1;w<f;w++){x.push(u+w);var E=x.length&127;E===127&&(x.push(T),T++)}for(;;){var E=x.length&127;if(E===0)break;x.push(E===127?-2:-1)}}{h.seek(0),h.writeUint8Array(BP.default.FILE_HEADER),h.seek(24),h.writeUint16(62),h.writeUint16(3),h.writeUint16(65534),h.writeUint16(9),h.writeUint16(6),h.seek(44),h.writeInt32(f),h.writeInt32(o),h.seek(56),h.writeInt32(4096),h.writeInt32(c),h.writeInt32(l),h.writeInt32(y),h.writeInt32(g);for(var w=0;w<v.length;w++)h.writeInt32(v[w]);for(;w<109;w++)h.writeInt32(-1)}for(var w=0;w<this.liteEnts.length;w++){var a=this.liteEnts[w],B=512*(1+o)+128*w;h.seek(B),h.writeUCS2String(a.entry.name,null,null);var U=h.position-B;h.seek(B+64),h.writeUint16(Math.min(64,U+2)),h.writeUint8(a.entry.type),h.writeUint8(a.isRed?0:1),h.writeInt32(a.left),h.writeInt32(a.right),h.writeInt32(a.child),w===0&&(h.seek(B+80),h.writeUint8Array([11,13,2,0,0,0,0,0,192,0,0,0,0,0,0,70]));var P=w===0?d:a.entry.length,O=P!==0?a.firstSector:a.entry.type===na.TypeEnum.DIRECTORY?0:-2;h.seek(B+116),h.writeInt32(O),h.writeInt32(P)}for(var D=0,H=this.liteEnts.filter(function(se){return se.entry.type==na.TypeEnum.DOCUMENT&&se.isMini===!1});D<H.length;D++){var a=H[D],X=a.entry.binaryProvider();h.seek(512*(1+a.firstSector)),h.writeUint8Array(X)}for(var oe=0,Me=this.liteEnts.filter(function(se){return se.entry.type==na.TypeEnum.DOCUMENT&&se.isMini===!0});oe<Me.length;oe++){var a=Me[oe],X=a.entry.binaryProvider();h.seek(512*(1+p)+64*a.firstSector),h.writeUint8Array(X)}h.seek(512*(1+c)),h.writeInt32Array(this.miniFat.sectors),this.fat.finalize(512/4,-1),h.seek(512*(1+u)),h.writeInt32Array(this.fat.sectors),g>=1&&(h.seek(512*(1+y)),h.writeInt32Array(x)),this.array=b}return e.prototype.compareName=function(t,o){var n=t.length-o.length;if(n===0){var r=t.toUpperCase(),a=o.toUpperCase();r>a?n=1:r<a&&(n=-1)}return n},e.prototype.buildTree=function(t){var o=this,n=this.liteEnts,r=n[t];if(r.entry.type===na.TypeEnum.DOCUMENT)throw new Error("It must be a storage!");var a=r.entry.children.concat();if(1<=a.length){a.sort(function(p,u){return o.compareName(n[p].entry.name,n[u].entry.name)});var i=function(p,u,f){if(p<u){var g=Math.floor((p+u)/2),y=a[g],b=n[y];return b.isRed=f,b.left=i(p,g,!f),b.right=i(g+1,u,!f),y}else return-1},s=function(){var p=Math.floor(a.length/2),u=a[p],f=n[u];return f.isRed=!1,f.left=i(0,p,!0),f.right=i(p+1,a.length,!0),u};r.child=s();for(var l=0,c=a.filter(function(p){return n[p].entry.type===na.TypeEnum.DIRECTORY});l<c.length;l++){var d=c[l];this.buildTree(d)}}},e}();function RP(e){return new Uint8Array(new _P(e).array)}});var hk=Vt(Ll=>{"use strict";var NP=Ll&&Ll.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Ll,"__esModule",{value:!0});Ll.parse=OP;var gk=NP(El());function OP(e){for(var t=new gk.default(e,0,gk.default.LITTLE_ENDIAN),o=[];!t.isEof();){var n=t.readUint32(),r=t.readUint16(),a=t.readUint16();o.push({key:n,isStringProperty:(r&1)!=0,guidIndex:r>>1&32767,propertyIndex:a})}return o}});var bk=Vt(vg=>{"use strict";Object.defineProperty(vg,"__esModule",{value:!0});vg.parse=HP;function HP(e){for(var t=[],o=0;!e.isEof();){var n=e.readUint16();if(n===258){o=e.readUint16();for(var r=e.readUint16(),a=0;a<o;a+=1){var i=e.readInt32(),s=e.readUint8(),l=e.readString(s),c=e.readUint8(),d=e.readString(c),p=e.readUint8(),u=e.readString(p),f=e.readUint8(),g=e.readString(f),y=e.readInt32(),b=e.readUint8(),h=e.readInt32(),v=e.readInt32(),x=e.readInt32(),w=e.readInt32(),T=e.readInt32(),E=e.readInt32();t.push({VerbType:i,DisplayName:l})}}else if(n===260)for(var a=0;a<o;a+=1){var s=e.readUint8(),l=e.readUCS2String(s),f=e.readUint8(),g=e.readUCS2String(f);t[a].DisplayName=l}}return t.filter(function(B){return B.VerbType===4}).map(function(B){return B.DisplayName}).join(";")}});var vk=Vt(xg=>{"use strict";Object.defineProperty(xg,"__esModule",{value:!0});xg.parse=zP;var yg=Li(),FP=1,UP=2;function zP(e){var t={rules:[]};if(!e.isEof()){var o=e.readUint8();if(o!==2)throw new Error("TZDEFINITION major version not supported");var n=e.readUint8();if(o<1)throw new Error("TZDEFINITION minor version not supported");var r=e.readUint16(),a=e.readUint16();if(a&FP&&(e.readInt32(),e.readInt32(),e.readInt32(),e.readInt32()),a&UP){var i=e.readUint16();t.keyName=e.readUCS2String(i)}var s=e.readUint16();e.seek(4+r);for(var l=0;l<s;l++){var c=e.readUint8();if(c!==2)break;var d=e.readUint8();if(c<1)break;var p=e.readUint16(),u=e.position,f=e.readUint16(),g=(0,yg.readSystemTime)(e),y=e.readInt32(),b=e.readInt32(),h=e.readInt32(),v=(0,yg.readTransitionSystemTime)(e),x=(0,yg.readTransitionSystemTime)(e),w=Object.assign({},{flags:f,start:g?.toUTCString()||null,bias:y,standardBias:b,daylightBias:h,standardDate:v,daylightDate:x});t.rules.push(w),e.seek(u+p)}}return t}});var xk=Vt(wg=>{"use strict";Object.defineProperty(wg,"__esModule",{value:!0});wg.parse=jP;var yk=Li();function jP(e){if(!e.isEof()){var t=e.readInt32(),o=e.readInt32(),n=e.readInt32(),r=e.readUint16(),a=(0,yk.readTransitionSystemTime)(e),i=e.readUint16(),s=(0,yk.readTransitionSystemTime)(e);return Object.assign({},{bias:t,standardBias:o,daylightBias:n,standardYear:r,standardDate:a,daylightYear:i,daylightDate:s})}return null}});var kg=Vt(Kt=>{"use strict";Object.defineProperty(Kt,"__esModule",{value:!0});Kt.OverrideFlags=Kt.EndType=Kt.CalendarType=Kt.PatternType=Kt.RecurFrequency=void 0;Kt.parse=$P;var wk;(function(e){e[e.Daily=8202]="Daily",e[e.Weekly=8203]="Weekly",e[e.Monthly=8204]="Monthly",e[e.Yearly=8205]="Yearly"})(wk||(Kt.RecurFrequency=wk={}));var yn;(function(e){e[e.Day=0]="Day",e[e.Week=1]="Week",e[e.Month=2]="Month",e[e.MonthEnd=4]="MonthEnd",e[e.MonthNth=3]="MonthNth",e[e.HjMonth=10]="HjMonth",e[e.HjMonthNth=11]="HjMonthNth",e[e.HjMonthEnd=12]="HjMonthEnd"})(yn||(Kt.PatternType=yn={}));var kk;(function(e){e[e.Default=0]="Default",e[e.CAL_GREGORIAN=1]="CAL_GREGORIAN",e[e.CAL_GREGORIAN_US=2]="CAL_GREGORIAN_US",e[e.CAL_JAPAN=3]="CAL_JAPAN",e[e.CAL_TAIWAN=4]="CAL_TAIWAN",e[e.CAL_KOREA=5]="CAL_KOREA",e[e.CAL_HIJRI=6]="CAL_HIJRI",e[e.CAL_THAI=7]="CAL_THAI",e[e.CAL_HEBREW=8]="CAL_HEBREW",e[e.CAL_GREGORIAN_ME_FRENCH=9]="CAL_GREGORIAN_ME_FRENCH",e[e.CAL_GREGORIAN_ARABIC=10]="CAL_GREGORIAN_ARABIC",e[e.CAL_GREGORIAN_XLIT_ENGLISH=11]="CAL_GREGORIAN_XLIT_ENGLISH",e[e.CAL_GREGORIAN_XLIT_FRENCH=12]="CAL_GREGORIAN_XLIT_FRENCH",e[e.CAL_LUNAR_JAPANESE=14]="CAL_LUNAR_JAPANESE",e[e.CAL_CHINESE_LUNAR=15]="CAL_CHINESE_LUNAR",e[e.CAL_SAKA=16]="CAL_SAKA",e[e.CAL_LUNAR_ETO_CHN=17]="CAL_LUNAR_ETO_CHN",e[e.CAL_LUNAR_ETO_KOR=18]="CAL_LUNAR_ETO_KOR",e[e.CAL_LUNAR_ROKUYOU=19]="CAL_LUNAR_ROKUYOU",e[e.CAL_LUNAR_KOREAN=20]="CAL_LUNAR_KOREAN",e[e.CAL_UMALQURA=23]="CAL_UMALQURA"})(kk||(Kt.CalendarType=kk={}));var Ik;(function(e){e[e.EndAfterDate=8225]="EndAfterDate",e[e.EndAfterNOccurrences=8226]="EndAfterNOccurrences",e[e.NeverEnd=8227]="NeverEnd",e[e.NeverEnd2=4294967295]="NeverEnd2"})(Ik||(Kt.EndType=Ik={}));var xt;(function(e){e[e.ARO_SUBJECT=1]="ARO_SUBJECT",e[e.ARO_MEETINGTYPE=2]="ARO_MEETINGTYPE",e[e.ARO_REMINDERDELTA=4]="ARO_REMINDERDELTA",e[e.ARO_REMINDER=8]="ARO_REMINDER",e[e.ARO_LOCATION=16]="ARO_LOCATION",e[e.ARO_BUSYSTATUS=32]="ARO_BUSYSTATUS",e[e.ARO_ATTACHMENT=64]="ARO_ATTACHMENT",e[e.ARO_SUBTYPE=128]="ARO_SUBTYPE",e[e.ARO_APPTCOLOR=256]="ARO_APPTCOLOR",e[e.ARO_EXCEPTIONAL_BODY=512]="ARO_EXCEPTIONAL_BODY"})(xt||(Kt.OverrideFlags=xt={}));function qP(e){var t=e.readUint16();if(t!==12292)throw new Error("ReaderVersion not supported");var o=e.readUint16();if(o!==12292)throw new Error("WriterVersion not supported");var n=e.readUint16(),r=e.readUint16(),a=e.readUint16(),i=e.readUint32(),s=e.readUint32(),l=e.readUint32(),c=void 0,d=void 0,p=void 0;r===yn.Week?c={dayOfWeekBits:e.readUint32()}:r===yn.Month||r===yn.MonthEnd||r===yn.HjMonth||r===yn.HjMonthEnd?d={day:e.readUint32()}:(r===yn.MonthNth||r===yn.HjMonthNth)&&(p={dayOfWeekBits:e.readUint32(),n:e.readUint32()});var u=e.readUint32(),f=e.readUint32(),g=e.readUint32(),y=e.readUint32(),b=Array.from(e.readUint32Array(y)),h=e.readUint32(),v=Array.from(e.readUint32Array(h)),x=e.readUint32(),w=e.readUint32();return Object.assign({recurFrequency:n,patternType:r,calendarType:a,firstDateTime:i,period:s,slidingFlag:l,endType:u,occurrenceCount:f,firstDOW:g,deletedInstanceDates:b,modifiedInstanceDates:v,startDate:x,endDate:w},c?{patternTypeWeek:c}:{},d?{patternTypeMonth:d}:{},p?{patternTypeMonthNth:p}:{})}function $P(e,t){var o=qP(e),n=e.readUint32();if(n!==12294)throw new Error("ReaderVersion2 not supported");var r=e.readUint32();if(r<12294)throw new Error("WriterVersion2 not supported");for(var a=e.readUint32(),i=e.readUint32(),s=e.readUint16(),l=[],c=0;c<s;c++){var d=e.readUint32(),p=e.readUint32(),u=e.readUint32(),f=e.readUint16(),g=void 0;if(f&xt.ARO_SUBJECT){var y=e.readUint16(),b=e.readUint16();if(y-1!==b)throw new Error("subjectLength ".concat(y," and subjectLength2 ").concat(b," are not close!"));g=e.readString(b,t)}var h=void 0;f&xt.ARO_MEETINGTYPE&&(h=e.readUint32());var v=void 0;f&xt.ARO_REMINDERDELTA&&(v=e.readUint32());var x=void 0;f&xt.ARO_REMINDER&&(x=e.readUint32());var w=void 0;if(f&xt.ARO_LOCATION){var T=e.readUint16(),E=e.readUint16();if(T-1!==E)throw new Error("locationLength ".concat(T," and locationLength2 ").concat(E," are not close!"));w=e.readString(E,t)}var B=void 0;f&xt.ARO_BUSYSTATUS&&(B=e.readUint32());var U=void 0;f&xt.ARO_ATTACHMENT&&(U=e.readUint32());var P=void 0;f&xt.ARO_SUBTYPE&&(P=e.readUint32());var O=void 0;f&xt.ARO_APPTCOLOR&&(O=e.readUint32()),l.push(Object.assign({startDateTime:d,endDateTime:p,originalStartTime:u,overrideFlags:f},g?{subject:g}:{},h?{meetingType:h}:{},v?{reminderDelta:v}:{},x?{reminderSet:x}:{},w?{location:w}:{},B?{busyStatus:B}:{},U?{attachment:U}:{},P?{subType:P}:{},O?{appointmentColor:O}:{}))}var D=e.readUint32();if(D!==0)throw new Error("reservedBlock1Size ".concat(D," is not zero, AppointmentRecur is broken"));for(var c=0;c<s;c++){var H=l[c];if(12297<=r){var X=e.readUint32();H.changeHighlight=e.readUint32(),e.position+=X-4}var oe=e.readUint32();if(oe!==0)throw new Error("reservedBlockEE1Size ".concat(oe," is not zero, AppointmentRecur is broken"));if(H.overrideFlags&(xt.ARO_SUBJECT|xt.ARO_LOCATION)){var d=e.readUint32(),p=e.readUint32(),Me=e.readUint32();if(H.overrideFlags&xt.ARO_SUBJECT){var se=e.readUint16();H.subject=e.readUCS2String(se)}if(H.overrideFlags&xt.ARO_LOCATION){var F=e.readUint16();H.location=e.readUCS2String(F)}var de=e.readUint32();if(de!==0)throw new Error("reservedBlockEE2Size ".concat(de," is not zero, AppointmentRecur is broken"))}}var Ie=e.readUint32();if(Ie!==0)throw new Error("reservedBlock2Size ".concat(Ie," is not zero, AppointmentRecur is broken"));return{recurrencePattern:o,startTimeOffset:a,endTimeOffset:i,exceptionInfo:l}}});var Ig=Vt(wt=>{"use strict";var Lk=wt&&wt.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(wt,"__esModule",{value:!0});wt.OverrideFlags=wt.EndType=wt.CalendarType=wt.PatternType=wt.RecurFrequency=void 0;var oo=Lk(pm()),Qn=Lk(El()),KP=bg(),WP=fk(),Pi=Li(),GP=hk(),VP=bk(),YP=vk(),XP=xk(),JP=kg(),Sl=kg();Object.defineProperty(wt,"RecurFrequency",{enumerable:!0,get:function(){return Sl.RecurFrequency}});Object.defineProperty(wt,"PatternType",{enumerable:!0,get:function(){return Sl.PatternType}});Object.defineProperty(wt,"CalendarType",{enumerable:!0,get:function(){return Sl.CalendarType}});Object.defineProperty(wt,"EndType",{enumerable:!0,get:function(){return Sl.EndType}});Object.defineProperty(wt,"OverrideFlags",{enumerable:!0,get:function(){return Sl.OverrideFlags}});var Ci;(function(e){e[e.DIRECTORY=1]="DIRECTORY",e[e.DOCUMENT=2]="DOCUMENT",e[e.ROOT=5]="ROOT"})(Ci||(Ci={}));var $o;(function(e){e[e.root=0]="root",e[e.toSub=1]="toSub",e[e.named=2]="named"})($o||($o={}));function Ek(e){return(e-116444736e9)/1e4}function Tk(e){var t=e.indexOf("\0");return t!==-1?e.substring(0,t):e}var ZP=function(){function e(t){this.reader=new KP.Reader(t)}return e.prototype.decodeField=function(t,o,n,r,a){var i=n(),s=new Qn.default(i,0,Qn.default.LITTLE_ENDIAN),l=oo.default.MSG.FIELD.FULL_NAME_MAPPING["".concat(t).concat(o)]||oo.default.MSG.FIELD.NAME_MAPPING[t],c=$o.root,d=void 0,p=void 0,u=parseInt("0x".concat(t));if(u>=32768){var f=this.privatePidToKeyed[u];if(f)if(f.useName)l=f.name,c=$o.named;else{d=f.propertySet,p=(0,Pi.toHex4)(f.propertyLid);var g=oo.default.MSG.FIELD.PIDLID_MAPPING[f.propertySet];if(g!==void 0){var y=g[f.propertyLid];y!==void 0&&(y.dispid!==void 0?(l=y.dispid,c=$o.root):(l=y.id,c=$o.toSub))}}}var b=i,h=!1,v=oo.default.MSG.FIELD.TYPE_MAPPING[o];if(v==="string")b=Tk(s.readString(i.length,r)),h=a;else if(v==="unicode")b=Tk(s.readUCS2String(i.length/2)),h=a;else if(v==="binary")h=a;else if(v==="integer")b=s.readUint32();else if(v==="boolean")b=!!s.readUint16();else if(v==="time"){var x=s.readUint32(),w=x+4294967296*s.readUint32();b=new Date(Ek(w)).toUTCString()}if(h&&(l=void 0),l==="PidLidVerbStream")l="votingOptions",c=$o.root,b=(0,VP.parse)(s);else if(l==="apptTZDefStartDisplay"||l==="apptTZDefEndDisplay"||l==="apptTZDefRecur")c=$o.root,b=(0,YP.parse)(s);else if(l==="timeZoneStruct")b=(0,XP.parse)(s);else if(l==="apptRecur")try{b=(0,JP.parse)(s,r)}catch(P){console.debug(P),l=void 0}else if(l==="recipType"){var T=1,E=2,B=3;b===T?b="to":b===E?b="cc":b===B&&(b="bcc")}else l==="globalAppointmentID"&&(b=(0,Pi.bin2HexUpper)(s));var U="".concat(t).concat(o);return{key:l,keyType:c,value:b,notForRawProp:h,propertyTag:U,propertySet:d,propertyLid:p}},e.prototype.fieldsDataDocument=function(t,o,n){var r=o.name.substring(12).toLowerCase(),a=r.substring(0,4),i=r.substring(4,8);t.propertyObserver&&t.propertyObserver(n,parseInt(r.substring(0,8),16),o.provider()),a==oo.default.MSG.FIELD.CLASS_MAPPING.ATTACHMENT_DATA?(n.dataId=o.dataId,n.contentLength=o.length):this.setDecodedFieldTo(t,n,this.decodeField(a,i,o.provider,t.ansiEncoding,!1))},e.prototype.setDecodedFieldTo=function(t,o,n){var r=n.key,a=n.keyType,i=n.value;r!==void 0&&a===$o.root&&(o[r]=i),t.includeRawProps===!0&&(o.rawProps=o.rawProps||[],n.notForRawProp||o.rawProps.push({propertyTag:n.propertyTag,propertySet:n.propertySet,propertyLid:n.propertyLid,propertyName:n.keyType===$o.named?n.key:void 0,value:i}))},e.prototype.getFieldType=function(t){var o=t.name.substring(12).toLowerCase();return o.substring(4,8)},e.prototype.fieldsDataDirInner=function(t,o,n,r){var a=this;if(o.name.indexOf(oo.default.MSG.FIELD.PREFIX.ATTACHMENT)==0){var i={dataType:"attachment"};r.attachments.push(i),this.fieldsDataDir(t,o,n,i,"attachment")}else if(o.name.indexOf(oo.default.MSG.FIELD.PREFIX.RECIPIENT)==0){var s={dataType:"recipient"};r.recipients.push(s),this.fieldsDataDir(t,o,n,s,"recip")}else if(o.name.indexOf(oo.default.MSG.FIELD.PREFIX.NAMEID)==0)this.fieldsNameIdDir(t,o,n,r);else{var l=this.getFieldType(o);if(l==oo.default.MSG.FIELD.DIR_TYPE.INNER_MSG){var c={dataType:"msg",attachments:[],recipients:[]};this.fieldsDataDir(t,o,n,c,"sub"),r.innerMsgContentFields=c,r.innerMsgContent=!0,r.folderId=o.dataId,this.innerMsgBurners[o.dataId]=function(){return a.burnMsg(o,n)}}}},e.prototype.burnMsg=function(t,o){var n=[{name:"Root Entry",type:Ci.ROOT,children:[],length:0}];return this.registerFolder(n,0,t,o,0),(0,WP.burn)(n)},e.prototype.registerFolder=function(t,o,n,r,a){for(var i=function(v){var x=v.provider,w=v.length;if(a===0&&v.name==="__properties_version1.0"){var T=x(),E=new Uint8Array(T.length+8);E.set(T.subarray(0,24),0),E.set(T.subarray(24),32),x=function(){return E},w=E.length}var B=t.length;t[o].children.push(B),t.push({name:v.name,type:Ci.DOCUMENT,binaryProvider:x,length:w})},s=0,l=n.fileNameSets();s<l.length;s++){var c=l[s];i(c)}if(a===0)for(var d=r.subFolders().filter(function(v){return v.name===oo.default.MSG.FIELD.PREFIX.NAMEID}),p=0,u=d;p<u.length;p++){var f=u[p],g=t.length;t[o].children.push(g),t.push({name:f.name,type:Ci.DIRECTORY,children:[],length:0}),this.registerFolder(t,g,f,r,a+1)}for(var y=0,b=n.subFolders();y<b.length;y++){var h=b[y],g=t.length;t[o].children.push(g),t.push({name:h.name,type:Ci.DIRECTORY,children:[],length:0}),this.registerFolder(t,g,h,r,a+1)}},e.prototype.fieldsRecipAndAttachmentProperties=function(t,o,n){var r=o.provider(),a=new Qn.default(r,8,Qn.default.LITTLE_ENDIAN);this.importPropertiesFromFile(t,a,n)},e.prototype.importPropertiesFromFile=function(t,o,n){for(var r={64:function(l){var c=l.getUint32(0,!0)+4294967296*l.getUint32(4,!0);return new Date(Ek(c)).toUTCString()}},a=function(){var l=o.readUint32();if(l===0)return"break";var c=o.readUint32(),d=o.readUint8Array(8);t.propertyObserver(n,l,d);var p=(0,Pi.toHex2)(l/65536&65535),u=(0,Pi.toHex2)(l&65535);i.setDecodedFieldTo(t,n,i.decodeField(p,u,function(){return d},t.ansiEncoding,!0))},i=this;!o.isEof();){var s=a();if(s==="break")break}},e.prototype.fieldsRootProperties=function(t,o,n){var r=o.provider(),a=new Qn.default(r,32,Qn.default.LITTLE_ENDIAN);this.importPropertiesFromFile(t,a,n)},e.prototype.fieldsDataDir=function(t,o,n,r,a){for(var i=0,s=o.subFolders();i<s.length;i++){var l=s[i];this.fieldsDataDirInner(t,l,n,r)}for(var c=0,d=o.fileNameSets();c<d.length;c++){var p=d[c];p.name.indexOf(oo.default.MSG.FIELD.PREFIX.DOCUMENT)==0?this.fieldsDataDocument(t,p,r):p.name==="__properties_version1.0"&&(a==="recip"||a==="attachment"||a==="sub"?this.fieldsRecipAndAttachmentProperties(t,p,r):a==="root"&&this.fieldsRootProperties(t,p,r))}},e.prototype.fieldsNameIdDir=function(t,o,n,r){for(var a=void 0,i=void 0,s=void 0,l=0,c=o.fileNameSets();l<c.length;l++){var d=c[l];if(d.name.indexOf(oo.default.MSG.FIELD.PREFIX.DOCUMENT)==0){var p=d.name.substring(12).toLowerCase(),u=p.substring(0,4),f=p.substring(4,8);u==="0002"&&f==="0102"?a=d.provider():u==="0003"&&f==="0102"?s=d.provider():u==="0004"&&f==="0102"&&(i=d.provider())}}if(a!==void 0&&i!==void 0&&s!==void 0)for(var g=(0,GP.parse)(s),y=new Qn.default(i,0,Qn.default.LITTLE_ENDIAN),b=0,h=g;b<h.length;b++){var v=h[b];if(v.isStringProperty){y.seek(v.key);var x=y.readUint32();this.privatePidToKeyed[32768|v.propertyIndex]={useName:!0,name:y.readUCS2String(x/2)}}else this.privatePidToKeyed[32768|v.propertyIndex]={useName:!1,propertySet:v.guidIndex===1?"00020328-00000-0000-C000-00000000046":v.guidIndex===2?"00020329-00000-0000-C000-00000000046":(0,Pi.msftUuidStringify)(a,16*(v.guidIndex-3)),propertyLid:v.key}}},e.prototype.fieldsDataReader=function(t){var o={dataType:"msg",attachments:[],recipients:[]};return this.fieldsDataDir(t,this.reader.rootFolder(),this.reader.rootFolder(),o,"root"),o},e.prototype.parseMsgData=function(t){return this.reader.parse(),this.fieldsDataReader(t)},e.prototype.getFileData=function(){var t,o,n;if(this.fieldsData===void 0){if(!this.reader.isMSGFile())return{dataType:null,error:"Unsupported file type!"};this.innerMsgBurners={},this.privatePidToKeyed={},this.fieldsData=this.parseMsgData({propertyObserver:((t=this.parserConfig)===null||t===void 0?void 0:t.propertyObserver)||function(){},includeRawProps:!!(!((o=this.parserConfig)===null||o===void 0)&&o.includeRawProps),ansiEncoding:(0,Pi.emptyToNull)((n=this.parserConfig)===null||n===void 0?void 0:n.ansiEncoding)})}return this.fieldsData},e.prototype.getAttachment=function(t){var o=typeof t=="number"?this.fieldsData.attachments[t]:t;if(o.innerMsgContent===!0&&typeof o.folderId=="number")return{fileName:o.name+".msg",content:this.innerMsgBurners[o.folderId]()};var n=this.reader.readFileOf(o.dataId);return{fileName:o.fileName,content:n}},e}();wt.default=ZP});var Sk=Vt(Ko=>{"use strict";var QP=Ko&&Ko.__createBinding||(Object.create?function(e,t,o,n){n===void 0&&(n=o);var r=Object.getOwnPropertyDescriptor(t,o);(!r||("get"in r?!t.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,n,r)}:function(e,t,o,n){n===void 0&&(n=o),e[n]=t[o]}),eC=Ko&&Ko.__exportStar||function(e,t){for(var o in e)o!=="default"&&!Object.prototype.hasOwnProperty.call(t,o)&&QP(t,e,o)},tC=Ko&&Ko.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Ko,"__esModule",{value:!0});var oC=tC(Ig());eC(Ig(),Ko);Ko.default=oC.default});function nC(e){let t=e.match(/^=\?([^?]+)\?([BbQq])\?([^?]*)\?=$/);if(!t)return null;let o=t[1].toLowerCase(),n=t[2].toUpperCase(),r=t[3];try{let a;if(n==="B"){let i=atob(r);a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s)}else{let i=[];for(let s=0;s<r.length;s++){let l=r.charCodeAt(s);if(l===95){i.push(32);continue}if(l===61&&s+2<r.length){let c=r.slice(s+1,s+3);if(/^[0-9A-Fa-f]{2}$/.test(c)){i.push(parseInt(c,16)),s+=2;continue}}i.push(l)}a=new Uint8Array(i)}return new TextDecoder(o,{fatal:!1}).decode(a)}catch{return null}}function Lg(e){let t=/=\?[^?]+\?[BbQq]\?[^?]*\?=/g,o="",n=0,r=!1,a;for(;(a=t.exec(e))!==null;){let i=e.slice(n,a.index);r&&/^\s*$/.test(i)||(o+=i);let s=nC(a[0])??a[0];o+=s,n=a.index+a[0].length,r=!0}return o+=e.slice(n),o}function fm(e){if(!e)return;let t=Lg(e),o=/[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}/g,n=[],r=new Set,a;for(;(a=o.exec(t))!==null;){let i=a[0].trim(),s=i.toLowerCase();r.has(s)||(r.add(s),n.push(i))}return n.length>0?n:void 0}function rC(e){let t=Lg(e).trim(),o=t.match(/^(.*?)<([^>]+)>\s*$/);if(o){let n=o[1].trim().replace(/^"|"$/g,"").trim(),r=o[2].trim();return{fromName:n||void 0,fromEmail:r||void 0}}return/^[^@\s]+@[^@\s]+$/.test(t)?{fromEmail:t}:{fromName:t||void 0}}function aC(e){let t=Date.parse(e.trim());if(!Number.isNaN(t))return new Date(t).toISOString()}function iC(e,t){let o=e.replace(/=\r?\n/g,""),n=[];for(let r=0;r<o.length;r++){let a=o.charCodeAt(r);if(a===61&&r+2<o.length){let i=o.slice(r+1,r+3);if(/^[0-9A-Fa-f]{2}$/.test(i)){n.push(parseInt(i,16)),r+=2;continue}}a<=255?n.push(a):n.push(...new TextEncoder().encode(o[r]))}try{return new TextDecoder(t,{fatal:!1}).decode(new Uint8Array(n))}catch{return new TextDecoder("utf-8",{fatal:!1}).decode(new Uint8Array(n))}}function sC(e,t){try{let o=atob(e.replace(/\s+/g,"")),n=new Uint8Array(o.length);for(let r=0;r<o.length;r++)n[r]=o.charCodeAt(r);return new TextDecoder(t,{fatal:!1}).decode(n)}catch{return e}}function gm(e){let t=e.replace(/\r\n/g,`
`).replace(/\r/g,`
`),o=t.indexOf(`

`);return o===-1?{headerBlock:t,body:""}:{headerBlock:t.slice(0,o),body:t.slice(o+2)}}function hm(e){let t=new Map,o=e.split(`
`),n=null,r=()=>{n&&(t.set(n.name.toLowerCase(),n.value),n=null)};for(let a of o){if(/^[ \t]/.test(a)&&n){n.value+=" "+a.trim();continue}let i=a.match(/^([!-9;-~]+):\s?(.*)$/);i&&(r(),n={name:i[1],value:i[2]})}return r(),t}function Ml(e){if(!e)return{mediaType:"text/plain",params:{}};let t=e.split(";").map(r=>r.trim()),o=(t.shift()??"").toLowerCase(),n={};for(let r of t){let a=r.match(/^([^=]+)=(.*)$/);if(!a)continue;let i=a[1].trim().toLowerCase(),s=a[2].trim();s.startsWith('"')&&s.endsWith('"')&&(s=s.slice(1,-1)),n[i]=s}return{mediaType:o,params:n}}function Ai(e,t){let n=(Ml(t.get("content-type")).params.charset||"utf-8").toLowerCase(),r=(t.get("content-transfer-encoding")||"7bit").toLowerCase();if(r==="base64")return sC(e,n);if(r==="quoted-printable")return iC(e,n);if(n!=="utf-8"&&n!=="us-ascii"&&n!=="ascii")try{let a=new Uint8Array(e.length);for(let i=0;i<e.length;i++)a[i]=e.charCodeAt(i)&255;return new TextDecoder(n,{fatal:!1}).decode(a)}catch{return e}return e}function Mk(e,t,o){if(t.mediaType.startsWith("multipart/")){let n=t.params.boundary;if(!n)return;let r="--"+n,a=e.split(r);for(let i=1;i<a.length;i++){let s=a[i];if(s.startsWith("--"))break;s=s.replace(/^\r?\n/,"");let{headerBlock:l,body:c}=gm(s),d=hm(l),p=Ml(d.get("content-type"));if(p.mediaType==="text/plain")return Ai(c.replace(/\r?\n--$/,""),d);if(p.mediaType.startsWith("multipart/")){let u=Mk(c,p,d);if(u)return u}}for(let i=1;i<a.length;i++){let s=a[i];if(s.startsWith("--"))break;s=s.replace(/^\r?\n/,"");let{headerBlock:l,body:c}=gm(s),d=hm(l);if(Ml(d.get("content-type")).mediaType==="text/html"){let u=Ai(c,d);return Tg(u)}}return}if(t.mediaType==="text/plain")return Ai(e,o);if(t.mediaType==="text/html"){let n=Ai(e,o);return Tg(n)}}function Pk(e,t,o){if(t.mediaType==="text/html")return Ai(e,o);if(t.mediaType.startsWith("multipart/")){let n=t.params.boundary;if(!n)return;let r="--"+n,a=e.split(r);for(let i=1;i<a.length;i++){let s=a[i];if(s.startsWith("--"))break;s=s.replace(/^\r?\n/,"");let{headerBlock:l,body:c}=gm(s),d=hm(l),p=Ml(d.get("content-type"));if(p.mediaType==="text/html")return Ai(c.replace(/\r?\n--$/,""),d);if(p.mediaType.startsWith("multipart/")){let u=Pk(c,p,d);if(u)return u}}}}function Sg(e){let{headerBlock:t,body:o}=gm(e),n=hm(t),r=Ml(n.get("content-type")),a=n.get("subject"),i=n.get("from"),s=n.get("date"),l=a?Lg(a).trim():void 0,c=i?rC(i):{},d=s?aC(s):void 0,p=Mk(o,r,n),u=Pk(o,r,n),f=n.get("message-id")?.trim()||void 0;return{subject:l,fromName:c.fromName,fromEmail:c.fromEmail,dateISO:d,body:p?.replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim(),bodyHtml:u?.trim()||void 0,internetMessageId:f,toEmails:fm(n.get("to")),ccEmails:fm(n.get("cc"))}}async function Mg(e){let t=await e.arrayBuffer(),o=Eg.default.default??Eg.default,r=new o(t).getFileData(),a=[{key:"clientSubmitTime",val:r.clientSubmitTime},{key:"messageDeliveryTime",val:r.messageDeliveryTime},{key:"creationTime",val:r.creationTime},{key:"lastModificationTime",val:r.lastModificationTime}];console.debug("[app/parseMsg] date candidates:",a);let i;for(let v of a){if(!v.val||typeof v.val!="string")continue;let x=Date.parse(v.val);if(Number.isNaN(x))continue;let w=new Date(x).getUTCFullYear();if(!(w<1980||w>2100)){i=new Date(x).toISOString(),console.debug("[app/parseMsg] adopted date:",v.key,"\u2192",i);break}}let s=r.bodyHtml?.trim()||void 0;if(!s){let v=r.html;if(v instanceof Uint8Array&&v.length){let x=new TextDecoder("utf-8").decode(v),w=x.match(/charset\s*=\s*["']?([\w-]+)/i);if(w&&w[1]&&!/utf-?8/i.test(w[1]))try{x=new TextDecoder(w[1].toLowerCase()).decode(v)}catch{}s=x.trim()||void 0}}let l=r.body?.trim()||void 0;!l&&s&&(l=Tg(s).trim()||void 0);let c=r.senderEmail,d=r.senderSmtpAddress??r.sentRepresentingSmtpAddress,p;typeof d=="string"&&/@/.test(d)?p=d.trim():typeof c=="string"&&/@/.test(c)&&(p=c.trim());let u=r,f,g=u.internetMessageId;if(typeof g=="string"&&g.trim())f=g.trim();else{let v=u.headers;if(typeof v=="string"&&v){let x=v.match(/^message-id:\s*(<[^>\r\n]+>)/im);x&&(f=x[1].trim())}}let y,b,h=r.recipients;if(Array.isArray(h)){let v=[],x=[];for(let w of h){if(!w||typeof w!="object")continue;let T=w,E=String(T.smtpAddress??"").trim(),B=String(T.email??"").trim(),U="";if(E&&/@/.test(E))U=E;else if(B&&/@/.test(B))U=B;else continue;let P=T.recipType,O=typeof P=="string"&&P.toLowerCase()==="cc"||typeof P=="number"&&P===2,D=typeof P=="string"&&P.toLowerCase()==="to"||typeof P=="number"&&P===1;O?x.push(U):D&&v.push(U)}v.length>0&&(y=v),x.length>0&&(b=x)}if(!y||!b){let v=u.headers;if(typeof v=="string"&&v){if(!y){let x=v.match(/^to:\s*([^\r\n]+(?:\r?\n[ \t][^\r\n]+)*)/im);y=fm(x?.[1])}if(!b){let x=v.match(/^cc:\s*([^\r\n]+(?:\r?\n[ \t][^\r\n]+)*)/im);b=fm(x?.[1])}}}return{subject:r.subject?.trim()||void 0,fromName:r.senderName?.trim()||void 0,fromEmail:p,dateISO:i,body:l,bodyHtml:s,internetMessageId:f,toEmails:y,ccEmails:b}}function Tg(e){return e.replace(/<style[\s\S]*?<\/style>/gi,"").replace(/<script[\s\S]*?<\/script>/gi,"").replace(/<\/(p|div|li|tr|h[1-6])>\s*/gi,`
`).replace(/\s*<br\s*\/?>\s*/gi,`
`).replace(/<(p|div|li|tr|h[1-6])[^>]*>\s*/gi,"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`)}var Eg,Ck=L(()=>{"use strict";Eg=W1(Sk())});function Ak(e){let t=[e.fromName,e.fromEmail&&e.fromEmail!==e.fromName?"<"+e.fromEmail+">":""].filter(Boolean).join(" ").trim()||e.fromEmail||"";return{imid:(e.internetMessageId||"").trim(),subject:e.subject||"",from:t,date:e.dateISO||""}}function Bk(e){let t=e.name.toLowerCase();return t.endsWith(".eml")||t.endsWith(".msg")}async function Dk(e,t){try{let o=await fetch(e,{credentials:"include"});if(!o.ok)return null;let n=t.toLowerCase();return n.endsWith(".eml")?Sg(await o.text()):n.endsWith(".msg")?Mg(new File([await o.blob()],t)):null}catch{return null}}function _k(e){return e.body&&e.body.trim()?e.body:e.bodyHtml?e.bodyHtml.replace(/<\s*(script|style)[^>]*>[\s\S]*?<\/\s*\1\s*>/gi," ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/[ \t]+/g," ").replace(/\n{3,}/g,`

`).trim():""}async function Rk(e){let t=e.name.toLowerCase();try{if(t.endsWith(".eml")){let o=Ak(Sg(await e.text()));return o.imid||o.subject?o:null}if(t.endsWith(".msg")){let o=Ak(await Mg(e));return o.imid||o.subject?o:null}}catch{}return null}var Pg=L(()=>{"use strict";Ck()});function lC(){let e=lo.get();if(e)try{return new URL(e).origin}catch{}return"http://localhost:18080"}async function cC(e){if(!e){k("Message-Id \u304C\u7121\u3044\u305F\u3081\u958B\u3051\u307E\u305B\u3093","err");return}let t=lC()+"/memola/outlook/open?id="+encodeURIComponent(e);try{let o=await fetch(t),n=await o.json().catch(()=>null);if(!o.ok||!n?.ok){k("\u30EA\u30EC\u30FC\u304C\u30E1\u30FC\u30EB\u3092\u958B\u3051\u307E\u305B\u3093\u3067\u3057\u305F","err");return}n.found===!1&&k("Outlook \u5185\u306B\u8A72\u5F53\u30E1\u30FC\u30EB\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F","err")}catch{k("\u30EA\u30EC\u30FC\u306B\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093(\u4E2D\u7D99\u30B5\u30FC\u30D0\u3092\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044)","err")}}function Nk(e,t){let o=!0,n=()=>window.getSelection()?.anchorNode?.parentElement?.closest("[data-block-id]")?.dataset.blockId||null,r=(s,l)=>{let c=Xv(l);return e.applyMutation(d=>{let p=d.blocks.slice(),u=s?p.findIndex(b=>b.id===s):p.length-1,f=u>=0?u+1:p.length;p.splice(f,0,c);let g=p[f+1],y;if(g&&g.kind!=="image"&&g.kind!=="email"&&"inline"in g)y=g.id;else{let b=rt("");p.splice(f+1,0,b),y=b.id}return{...d,blocks:p,selection:{kind:"caret",blockId:y,offset:0}}},"structural"),c.id},a=async s=>{if(!s.dataTransfer?.files?.length)return;let l=Array.from(s.dataTransfer.files).filter(Bk);if(l.length===0)return;s.preventDefault();let c=n();try{_(!0,"\u30E1\u30FC\u30EB\u3092\u53D6\u308A\u8FBC\u307F\u4E2D...");for(let d of l){if(!o)return;let p=await Rk(d);if(!p){k(`${d.name}: \u30E1\u30FC\u30EB\u3092\u89E3\u6790\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F`,"err");continue}let u=await ug(d,"mail",d.name.toLowerCase().endsWith(".msg")?".msg":".eml");c=r(c,{imid:p.imid,subject:p.subject,from:p.from,date:p.date,fileUrl:u,filename:d.name})}}catch(d){o&&k("\u30E1\u30FC\u30EB\u53D6\u308A\u8FBC\u307F\u5931\u6557: "+d.message,"err")}finally{_(!1)}},i=s=>{let l=s.target?.closest?.(".memola-email-src");l&&(s.preventDefault(),s.stopPropagation(),cC(l.dataset.emailSrc||""))};return t.addEventListener("drop",a),t.addEventListener("click",i,!0),()=>{o=!1,t.removeEventListener("drop",a),t.removeEventListener("click",i,!0)}}var Ok=L(()=>{"use strict";Do();fg();Pg();ve();le()});function mC(e){try{let r=document.createRange();r.selectNodeContents(e);let a=r.getClientRects();for(let i=0;i<a.length;i++)if(a[i].height>0)return{top:a[i].top,height:a[i].height}}catch{}let t=e.getBoundingClientRect(),o=parseFloat(window.getComputedStyle(e).lineHeight),n=isFinite(o)&&o>0?Math.min(o,t.height):t.height;return{top:t.top,height:n}}function Hk(e,t){let o=document.createElement("div");o.className="memola-block-handle",o.style.cssText="position:absolute; cursor:grab; user-select:none; opacity:0; pointer-events:none; z-index:2147483646; padding:2px 4px; color:#9b9a97; font-size:18px; line-height:1; transition:opacity 0.1s;",o.textContent="\u22EE\u22EE",o.draggable=!0,o.title="\u30C9\u30E9\u30C3\u30B0\u3067\u79FB\u52D5 / \u30AF\u30EA\u30C3\u30AF\u3067\u30E1\u30CB\u30E5\u30FC",(document.getElementById("memola-overlay")||document.body).appendChild(o);let n=null,r=null,a=null,i=null,s=!1,l=P=>{if(P===n)return;n=P;let O=P.getBoundingClientRect(),D=o.offsetHeight||22,H,X;if(P.dataset.blockKind==="rule")H=O.top,X=O.height;else{let oe=mC(P);H=oe.top,X=oe.height}o.style.top=H+window.scrollY+(X-D)/2+"px",o.style.left=O.left+window.scrollX-28+"px",o.style.opacity="1",o.style.pointerEvents="auto"},c=()=>{i||(n=null,o.style.opacity="0",o.style.pointerEvents="none")},d=P=>{i&&!i.contains(P.target)&&P.target!==o&&u()},p=P=>{P.key==="Escape"&&(P.preventDefault(),P.stopPropagation(),u())};function u(){i&&(i.remove(),i=null),document.removeEventListener("mousedown",d,!0),document.removeEventListener("keydown",p,!0)}let f=(P,O)=>{let D=document.createElement("button");return D.className="memola-blk-menu-item",D.textContent=P,D.addEventListener("mousedown",H=>{H.preventDefault(),H.stopPropagation(),u(),O()}),D},g=P=>{let O=P.dataset.blockId;if(!O)return;u(),i=document.createElement("div"),i.className="memola-blk-menu",i.appendChild(f("\uFF0B \u4E0B\u306B\u30D6\u30ED\u30C3\u30AF\u3092\u8FFD\u52A0",()=>{e.applyMutation(oe=>ei(oe,O,rt("")),"structural")})),i.appendChild(f("\u{1F4AC} \u30B3\u30E1\u30F3\u30C8",()=>{Promise.resolve().then(()=>(Uo(),bn)).then(oe=>{let Me=oe.currentCommentTarget();Me&&oe.openCommentPopover(Me.pageId,O)})}));let D=document.createElement("div");D.className="memola-blk-menu-hd",D.textContent="\u7A2E\u985E\u3092\u5909\u66F4",i.appendChild(D);for(let oe of dC)i.appendChild(f(oe.label,()=>{e.applyMutation(Me=>Jv(Me,O,oe.cmd),"structural")}));(document.getElementById("memola-overlay")||document.body).appendChild(i);let H=o.getBoundingClientRect();i.style.left=H.right+window.scrollX+4+"px",i.style.top=H.top+window.scrollY+"px";let X=i.getBoundingClientRect();X.right>window.innerWidth&&(i.style.left=H.left+window.scrollX-X.width-4+"px"),X.bottom>window.innerHeight&&(i.style.top=window.innerHeight-X.height-8+window.scrollY+"px"),setTimeout(()=>{document.addEventListener("mousedown",d,!0),document.addEventListener("keydown",p,!0)},0)},y=P=>{if(P.preventDefault(),P.stopPropagation(),s){s=!1;return}if(i){u();return}n&&g(n)};o.addEventListener("click",y);let b=(P,O)=>{let D=Array.from(t.children);for(let H of D){if(!H.dataset.blockId)continue;let X=H.getBoundingClientRect(),oe=X.left-32;if(P>=oe&&P<=X.right&&O>=X.top&&O<=X.bottom)return H}return null},h=P=>{for(;P&&P!==t;){let O=P;if(O.parentElement===t&&O.dataset?.blockId)return O;P=P.parentNode}return null},v=()=>{let P=window.getSelection();if(!P||P.rangeCount===0)return null;let O=P.getRangeAt(0);return t.contains(O.startContainer)?h(O.startContainer):null},x=P=>{if(r)return;let O=P.target;if(O===o)return;let D=b(P.clientX,P.clientY);if(D){l(D);return}if(O&&!t.contains(O)){let H=v();H?l(H):c()}};document.addEventListener("mousemove",x);let w=()=>{if(r)return;let P=v();P&&l(P)};document.addEventListener("selectionchange",w);let T=P=>{if(!n){P.preventDefault();return}if(s=!0,u(),r=n.dataset.blockId||null,!r){P.preventDefault();return}n.classList.add("memola-block-dragging"),P.dataTransfer&&(P.dataTransfer.effectAllowed="move",P.dataTransfer.setData("text/plain","")),a=document.createElement("div"),a.className="memola-block-placeholder",a.style.cssText="height:2px; background:#2383e2; margin:0 0 0 0; border-radius:1px;",document.addEventListener("dragover",B),document.addEventListener("drop",U)},E=()=>{r&&n&&n.classList.remove("memola-block-dragging"),a?.parentNode&&a.parentNode.removeChild(a),a=null,r=null,setTimeout(()=>{s=!1},0),document.removeEventListener("dragover",B),document.removeEventListener("drop",U)};o.addEventListener("dragstart",T),o.addEventListener("dragend",E);let B=P=>{if(!r||!a)return;P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="move");let O=Array.from(t.children).filter(oe=>oe.dataset.blockId&&oe.dataset.blockId!==r&&oe!==a);if(O.length===0){t.appendChild(a);return}let D=O[0].getBoundingClientRect();if(P.clientY<D.top){a!==t.firstElementChild&&t.insertBefore(a,O[0]);return}let X=O[O.length-1].getBoundingClientRect();if(P.clientY>X.bottom){a!==t.lastElementChild&&t.appendChild(a);return}for(let oe of O){let Me=oe.getBoundingClientRect();if(P.clientY>=Me.top&&P.clientY<=Me.bottom){let F=P.clientY<Me.top+Me.height/2?oe:oe.nextSibling;a.nextSibling!==F&&a!==F&&t.insertBefore(a,F);return}}},U=P=>{if(!r||!a?.parentNode){E();return}P.preventDefault();let O=Array.from(t.children),D=0;for(let X of O){if(X===a)break;X.dataset.blockId&&X.dataset.blockId!==r&&D++}let H=r;e.applyMutation(X=>Wv(X,H,D),"structural"),E()};return()=>{E(),u(),document.removeEventListener("mousemove",x),document.removeEventListener("selectionchange",w),document.removeEventListener("dragover",B),document.removeEventListener("drop",U),o.remove()}}var dC,Fk=L(()=>{"use strict";Do();dC=[{cmd:"p",label:"\u30C6\u30AD\u30B9\u30C8"},{cmd:"h1",label:"\u898B\u51FA\u30571"},{cmd:"h2",label:"\u898B\u51FA\u30572"},{cmd:"h3",label:"\u898B\u51FA\u30573"},{cmd:"todo",label:"ToDo \u30EA\u30B9\u30C8"},{cmd:"ul",label:"\u7B87\u6761\u66F8\u304D\u30EA\u30B9\u30C8"},{cmd:"ol",label:"\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8"},{cmd:"quote",label:"\u5F15\u7528"},{cmd:"callout",label:"\u30B3\u30FC\u30EB\u30A2\u30A6\u30C8"},{cmd:"pre",label:"\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF"},{cmd:"hr",label:"\u533A\u5207\u308A\u7DDA"}]});function zk(e,t){let o=null,n=null,r=()=>{n&&(clearTimeout(n),n=null)},a=()=>{n||(n=setTimeout(()=>{n=null,Qi(),o=null},pC))},i=()=>o&&t.querySelector('[data-block-id="'+w(o)+'"]')?.querySelector(".memola-itbl-wrap")||null,s=S=>{let C=typeof document.elementFromPoint=="function"?document.elementFromPoint(S.clientX,S.clientY):S.target;if(C&&typeof C.closest=="function"&&C.closest(".memola-tbl-btn")){r();return}let R=C&&typeof C.closest=="function"?C.closest(".memola-itbl-wrap"):null;if(R&&t.contains(R)){let V=R.closest("[data-block-id]")?.dataset.blockId;if(V){r(),o=V,ub(R,S.clientX,S.clientY);return}}let N=i();if(N){let z=N.getBoundingClientRect();if(S.clientX>=z.left-bm&&S.clientX<=z.right+bm&&S.clientY>=z.top-bm&&S.clientY<=z.bottom+bm){r(),ub(N,S.clientX,S.clientY);return}}a()},l=S=>{let C=e.getSelection();if(C&&C.kind==="table-cells"&&(S.key==="Backspace"||S.key==="Delete")){S.preventDefault(),S.stopPropagation(),T(C);return}let R=S.target;if(!R||R.tagName!=="TD")return;let N=R;if(!t.contains(N))return;let z=c(N);if(!z||S.isComposing||S.keyCode===229)return;let V=S.key;if(V==="Enter"&&!S.shiftKey&&!S.metaKey&&!S.ctrlKey&&!S.altKey){S.preventDefault(),S.stopPropagation(),g(N,z.row+1,z.col,"row");return}if(V==="Tab"){if(S.preventDefault(),S.stopPropagation(),S.shiftKey)z.col>0?g(N,z.row,z.col-1):z.row>0&&g(N,z.row-1,d(N));else{let fe=d(N);z.col<fe?g(N,z.row,z.col+1):g(N,z.row+1,0,"row")}return}if(V==="ArrowDown"){S.preventDefault(),S.stopPropagation(),z.row<p(N)&&g(N,z.row+1,z.col);return}if(V==="ArrowUp"){S.preventDefault(),S.stopPropagation(),z.row>0&&g(N,z.row-1,z.col);return}if(V==="ArrowLeft"&&y(N)){S.preventDefault(),S.stopPropagation(),z.col>0?g(N,z.row,z.col-1):z.row>0&&g(N,z.row-1,d(N));return}if(V==="ArrowRight"&&b(N)){S.preventDefault(),S.stopPropagation();let fe=d(N);z.col<fe?g(N,z.row,z.col+1):z.row<p(N)&&g(N,z.row+1,0);return}};function c(S){let C=S.parentElement;if(!C||C.tagName!=="TR")return null;let R=C.parentElement;if(!R||R.tagName!=="TBODY")return null;let N=Array.from(R.children).indexOf(C),z=Array.from(C.children).indexOf(S);return N<0||z<0?null:{tbody:R,row:N,col:z}}function d(S){let C=S.parentElement;return C?C.children.length-1:0}function p(S){let C=S.parentElement?.parentElement;return C?C.children.length-1:0}function u(S){S.focus();let C=document.createRange();C.selectNodeContents(S),C.collapse(!1);let R=window.getSelection();R&&(R.removeAllRanges(),R.addRange(C))}function f(S,C,R){return t.querySelector('[data-block-id="'+w(S)+'"]')?.querySelector("tbody")?.children[C]?.children[R]||null}function g(S,C,R,N){let V=S.closest("[data-block-id]")?.dataset.blockId;if(!V)return;let fe=c(S);if(!fe)return;let ee=Uk(S);e.applyMutation(he=>{let ue=he.blocks.findIndex(Oe=>Oe.id===V);if(ue<0)return{...he,selection:null};let Pe=he.blocks[ue];if(Pe.kind!=="table")return{...he,selection:null};let Z=Pe.rows[fe.row]?.[fe.col],Ae=!!Z&&JSON.stringify(Z)===JSON.stringify(ee),$e=he;if(!Ae){let Oe=Pe.rows.map((Tn,Be)=>Be===fe.row?Tn.map((vt,U1)=>U1===fe.col?ee:vt):Tn),Et=he.blocks.slice();Et[ue]={...Pe,rows:Oe},$e={...he,blocks:Et}}return{...$e,selection:null}},"typing");let pe=f(V,C,R);!pe&&N==="row"&&(e.applyMutation(he=>zs(he,V,C),"structural"),pe=f(V,C,R)),pe&&u(pe)}function y(S){let C=window.getSelection();if(!C||C.rangeCount===0)return!1;let R=C.getRangeAt(0);if(!R.collapsed)return!1;let N=document.createRange();return N.selectNodeContents(S),N.setEnd(R.startContainer,R.startOffset),N.toString().length===0}function b(S){let C=window.getSelection();if(!C||C.rangeCount===0)return!1;let R=C.getRangeAt(0);if(!R.collapsed)return!1;let N=document.createRange();return N.selectNodeContents(S),N.setStart(R.endContainer,R.endOffset),N.toString().length===0}function h(S){if(S.querySelector("br"))return!1;let C=parseFloat(getComputedStyle(S).lineHeight)||20;return S.getBoundingClientRect().height<=C*1.8}function v(S){if(h(S))return!0;let C=window.getSelection();if(!C||C.rangeCount===0)return!1;let R=C.getRangeAt(0).getBoundingClientRect();if(R.top===0&&R.bottom===0)return!0;let N=S.getBoundingClientRect(),z=parseFloat(getComputedStyle(S).lineHeight)||20;return R.top-N.top<z}function x(S){if(h(S))return!0;let C=window.getSelection();if(!C||C.rangeCount===0)return!1;let R=C.getRangeAt(0).getBoundingClientRect();if(R.top===0&&R.bottom===0)return!0;let N=S.getBoundingClientRect(),z=parseFloat(getComputedStyle(S).lineHeight)||20;return N.bottom-R.bottom<z}function w(S){return typeof CSS<"u"&&CSS.escape?CSS.escape(S):S.replace(/[^a-zA-Z0-9_-]/g,C=>"\\"+C)}function T(S){let C=Math.min(S.anchor.row,S.focus.row),R=Math.max(S.anchor.row,S.focus.row),N=Math.min(S.anchor.col,S.focus.col),z=Math.max(S.anchor.col,S.focus.col);e.applyMutation(V=>{let fe=V.blocks.findIndex(ue=>ue.id===S.blockId);if(fe<0)return V;let ee=V.blocks[fe];if(ee.kind!=="table")return V;let pe=ee.rows.map((ue,Pe)=>Pe<C||Pe>R?ue:ue.map((Z,Ae)=>Ae<N||Ae>z?Z:[])),he=V.blocks.slice();return he[fe]={...ee,rows:pe},{...V,blocks:he,selection:null}},"delete"),Promise.resolve().then(()=>{let ee=t.querySelector('[data-block-id="'+w(S.blockId)+'"]')?.querySelector("tbody")?.children[S.anchor.row]?.children[S.anchor.col];if(ee){ee.focus();let pe=document.createRange();pe.selectNodeContents(ee),pe.collapse(!0);let he=window.getSelection();he&&(he.removeAllRanges(),he.addRange(pe))}})}let E=S=>{let C=S.target;if(!C||C.tagName!=="TD"||!document.contains(C))return;let R=C.parentElement,N=R?.parentElement,V=N?.parentElement?.closest("[data-block-id]");if(!V||!V.dataset.blockId||!R)return;let fe=V.dataset.blockId,ee=Array.from(N.children).indexOf(R),pe=Array.from(R.children).indexOf(C);if(ee<0||pe<0)return;let he=Uk(C),Pe=e.getBlocks().find(Z=>Z.id===fe);if(Pe&&Pe.kind==="table"){let Z=Pe.rows[ee]?.[pe];if(Z&&JSON.stringify(Z)===JSON.stringify(he))return}e.applyMutation(Z=>Zv(Z,fe,ee,pe,he),"typing")},B=6,U=null;function P(S,C){let N=S.getBoundingClientRect().right-C;return N<=B&&N>=-2}let O=S=>{if(S.button!==0)return!1;let C=S.target;if(!C||typeof C.closest!="function")return!1;let R=C.closest("td");if(!R||!t.contains(R)||!P(R,S.clientX))return!1;let N=c(R),z=R.closest("[data-block-id]")?.dataset.blockId;return!N||!z?!1:(S.preventDefault(),S.stopPropagation(),U={blockId:z,colIdx:N.col,startX:S.clientX,startW:R.offsetWidth},document.body.style.cursor="col-resize",!0)},D=S=>{if(!U)return;if(!(S.buttons&1)){H();return}let C=S.clientX-U.startX,R=Math.max(60,U.startW+C),{blockId:N,colIdx:z}=U;e.applyMutation(V=>{let fe=V.blocks.findIndex(Pe=>Pe.id===N);if(fe<0)return V;let ee=V.blocks[fe];if(ee.kind!=="table")return V;let pe=ee.rows[0]?.length||0,he=(ee.colWidths||[]).slice();for(;he.length<pe;)he.push(0);he[z]=R;let ue=V.blocks.slice();return ue[fe]={...ee,colWidths:he},{...V,blocks:ue}},"structural")},H=()=>{U&&(U=null,document.body.style.cursor="")},X=S=>{let C=S.target;if(!C||typeof C.closest!="function")return;let R=C.closest("td");!R||!t.contains(R)||(R.style.cursor=P(R,S.clientX)?"col-resize":"")},oe=null,Me=!1,se=S=>{if(S.button!==0||O(S))return;let C=S.target;if(!C||typeof C.closest!="function")return;let R=C.closest("td");if(!R||!t.contains(R))return;let N=c(R),z=R.closest("[data-block-id]")?.dataset.blockId;!N||!z||(oe={blockId:z,row:N.row,col:N.col},Me=!1,Ie={blockId:z,row:N.row,col:N.col},Wt())},F=S=>{if(!oe)return;if(!(S.buttons&1)){oe=null,Me=!1;return}let C=S.target;if(!C||typeof C.closest!="function")return;let R=C.closest("td");if(!R||!t.contains(R))return;let N=c(R),z=R.closest("[data-block-id]")?.dataset.blockId;if(!N||!z||z!==oe.blockId||N.row===oe.row&&N.col===oe.col&&!Me)return;if(!Me){Me=!0,Nt(),Ie=null;let pe=window.getSelection();pe&&pe.removeAllRanges()}S.preventDefault();let fe={row:oe.row,col:oe.col},ee={row:N.row,col:N.col};e.applyMutation(pe=>({...pe,selection:{kind:"table-cells",blockId:oe.blockId,anchor:fe,focus:ee}}),"selection")},de=()=>{oe=null},Ie=null,It=[{label:"\u306A\u3057",value:""},{label:"\u30B0\u30EC\u30FC",value:"#f1f1ef"},{label:"\u8D64",value:"#fdebec"},{label:"\u30AA\u30EC\u30F3\u30B8",value:"#fbecdd"},{label:"\u9EC4",value:"#fbf3db"},{label:"\u7DD1",value:"#ddedea"},{label:"\u9752",value:"#ddebf1"},{label:"\u7D2B",value:"#eae4f2"},{label:"\u30D4\u30F3\u30AF",value:"#f4dfeb"}];function Ge(S){let C=document.getElementById("memola-tbl-h-"+S);return C||(C=document.createElement("div"),C.id="memola-tbl-h-"+S,C.className="memola-tbl-handle memola-tbl-handle-"+S,C.style.display="none",(document.getElementById("memola-overlay")||document.body).appendChild(C),C.addEventListener("mousedown",R=>{R.preventDefault(),R.stopPropagation(),tc(S,C)}),C)}function Nt(){["row","col","cell"].forEach(S=>{let C=document.getElementById("memola-tbl-h-"+S);C&&(C.style.display="none")}),t.querySelectorAll(".memola-itbl-selcell").forEach(S=>S.classList.remove("memola-itbl-selcell"))}function Wt(){if(!Ie){Nt();return}let S=f(Ie.blockId,Ie.row,Ie.col),C=S?.closest("table");if(!S||!C){Nt();return}let R=S.getBoundingClientRect(),N=C.getBoundingClientRect(),z=window.scrollX,V=window.scrollY,fe=Ge("row");fe.style.left=N.left+z-16+"px",fe.style.top=R.top+V+"px",fe.style.height=R.height+"px",fe.style.display="flex";let ee=Ge("col");ee.style.left=R.left+z+"px",ee.style.top=N.top+V-16+"px",ee.style.width=R.width+"px",ee.style.display="flex";let pe=Ge("cell");pe.style.left=R.right+z-5+"px",pe.style.top=R.top+V+(R.height-18)/2+"px",pe.style.display="flex",t.querySelectorAll(".memola-itbl-selcell").forEach(he=>he.classList.remove("memola-itbl-selcell")),S.classList.add("memola-itbl-selcell")}function Gt(S){e.applyMutation(S,"structural"),pr(),Nt(),Ie=null}function pr(){document.getElementById("memola-tbl-cell-menu")?.remove()}function tc(S,C){if(!Ie)return;let{blockId:R,row:N,col:z}=Ie;pr();let V=document.createElement("div");V.id="memola-tbl-cell-menu",V.className="memola-tbl-cell-menu";let fe=C.getBoundingClientRect();V.style.left=fe.left+window.scrollX+"px",V.style.top=fe.bottom+window.scrollY+4+"px";let ee=(Z,Ae,$e=!1)=>{let Oe=document.createElement("div");return Oe.className="memola-tbl-cell-menu-item"+($e?" danger":""),Oe.textContent=Z,Oe.addEventListener("mousedown",Et=>{Et.preventDefault(),Et.stopPropagation(),Ae()}),Oe},pe=()=>{let Z=document.createElement("div");return Z.className="memola-tbl-cell-menu-sep",Z},he=Z=>{let Ae=document.createElement("div");return Ae.className="memola-tbl-cell-menu-collabel",Ae.textContent=Z,Ae},ue=Z=>{let Ae=document.createElement("div");Ae.className="memola-tbl-cell-colors";for(let $e of It){let Oe=document.createElement("button");Oe.className="memola-tbl-cell-swatch"+($e.value?"":" none"),Oe.title=$e.label,$e.value&&(Oe.style.background=$e.value),Oe.addEventListener("mousedown",Et=>{Et.preventDefault(),Et.stopPropagation(),Z($e.value)}),Ae.appendChild(Oe)}return Ae};S==="row"?V.append(ee("\u2191 \u4E0A\u306B\u884C\u3092\u633F\u5165",()=>Gt(Z=>zs(Z,R,N))),ee("\u2193 \u4E0B\u306B\u884C\u3092\u633F\u5165",()=>Gt(Z=>zs(Z,R,N+1))),ee("\u884C\u3092\u524A\u9664",()=>Gt(Z=>Nu(Z,R,N)),!0),pe(),he("\u884C\u306E\u8272"),ue(Z=>Gt(Ae=>ey(Ae,R,N,Z)))):S==="col"?V.append(ee("\u2190 \u5DE6\u306B\u5217\u3092\u633F\u5165",()=>Gt(Z=>sd(Z,R,z))),ee("\u2192 \u53F3\u306B\u5217\u3092\u633F\u5165",()=>Gt(Z=>sd(Z,R,z+1))),ee("\u5217\u3092\u524A\u9664",()=>Gt(Z=>Ou(Z,R,z)),!0),pe(),he("\u5217\u306E\u8272"),ue(Z=>Gt(Ae=>ty(Ae,R,z,Z)))):V.append(he("\u30BB\u30EB\u306E\u8272"),ue(Z=>Gt(Ae=>Qv(Ae,R,N,z,Z)))),(document.getElementById("memola-overlay")||document.body).appendChild(V);let Pe=Z=>{let Ae=Z.target;V.contains(Ae)||C.contains(Ae)||(pr(),document.removeEventListener("mousedown",Pe,!0))};setTimeout(()=>document.addEventListener("mousedown",Pe,!0),0)}let mb=S=>{let C=S.target;if(!C||C.closest?.(".memola-tbl-handle, .memola-tbl-cell-menu"))return;let R=C.closest?.("td");R&&t.contains(R)||Ie&&(Nt(),Ie=null)},pb=S=>{let C=e.getSelection();if(!C||C.kind!=="table-cells")return;let R=e.getBlocks().find(ue=>ue.id===C.blockId);if(!R||R.kind!=="table")return;let N=Math.min(C.anchor.row,C.focus.row),z=Math.max(C.anchor.row,C.focus.row),V=Math.min(C.anchor.col,C.focus.col),fe=Math.max(C.anchor.col,C.focus.col),ee=[];for(let ue=N;ue<=z;ue++){let Pe=[];for(let Z=V;Z<=fe;Z++){let Ae=R.rows[ue]?.[Z]||[],$e=Lt(Ae).replace(/\t/g," ").replace(/\n/g," ");Pe.push($e)}ee.push(Pe)}let pe=ee.map(ue=>ue.join("	")).join(`
`),he="<table>"+ee.map(ue=>"<tr>"+ue.map(Pe=>"<td>"+M(Pe)+"</td>").join("")+"</tr>").join("")+"</table>";S.preventDefault(),S.clipboardData?.setData("text/plain",pe),S.clipboardData?.setData("text/html",he)};return document.addEventListener("mousemove",s),t.addEventListener("blur",E,!0),t.addEventListener("keydown",l,!0),t.addEventListener("mousedown",se),t.addEventListener("mousemove",F),t.addEventListener("mousemove",X),document.addEventListener("mousedown",mb,!0),document.addEventListener("mousemove",D),document.addEventListener("mouseup",de),document.addEventListener("mouseup",H),document.addEventListener("copy",pb,!0),()=>{document.removeEventListener("mousemove",s),t.removeEventListener("blur",E,!0),t.removeEventListener("keydown",l,!0),t.removeEventListener("mousedown",se),t.removeEventListener("mousemove",F),t.removeEventListener("mousemove",X),document.removeEventListener("mousedown",mb,!0),document.removeEventListener("mousemove",D),document.removeEventListener("mouseup",de),document.removeEventListener("mouseup",H),document.removeEventListener("copy",pb,!0),document.getElementById("memola-tbl-cell-menu")?.remove(),r(),["add-row","add-col","rm-row","rm-col"].forEach(S=>{document.getElementById("memola-tbl-"+S)?.remove()}),["h-row","h-col","h-cell"].forEach(S=>{document.getElementById("memola-tbl-"+S)?.remove()})};function oc(S,C,R){let N=document.getElementById("memola-tbl-"+S);return N||(N=document.createElement("button"),N.id="memola-tbl-"+S,N.className="memola-tbl-btn memola-tbl-"+S,N.style.cssText="position:absolute; z-index:2147483646; background:#fff; border:1px solid #e9e9e7; border-radius:4px; cursor:pointer; padding:2px 6px; font-size:14px; line-height:1; color:#9b9a97; box-shadow:0 1px 3px rgba(0,0,0,0.08); display:none;",N.textContent=C,N.title=R,(document.getElementById("memola-overlay")||document.body).appendChild(N),N)}function Qi(){["add-row","add-col","rm-row","rm-col"].forEach(S=>{let C=document.getElementById("memola-tbl-"+S);C&&(C.style.display="none")})}function ub(S,C,R){let z=S.closest("[data-block-id]")?.dataset.blockId;if(!z)return;let V=S.querySelector("table");if(!V)return;let fe=V.querySelector("tbody");if(!fe)return;let ee=Array.from(fe.children),pe=-1;for(let Be=0;Be<ee.length;Be++){let vt=ee[Be].getBoundingClientRect();if(R>=vt.top&&R<=vt.bottom){pe=Be;break}}if(pe<0&&ee.length>0){let Be=ee[0].getBoundingClientRect(),vt=ee[ee.length-1].getBoundingClientRect();R<Be.top?pe=0:R>vt.bottom&&(pe=ee.length-1)}let he=ee[0],ue=he?Array.from(he.children):[],Pe=-1;for(let Be=0;Be<ue.length;Be++){let vt=ue[Be].getBoundingClientRect();if(C>=vt.left&&C<=vt.right){Pe=Be;break}}if(Pe<0&&ue.length>0){let Be=ue[0].getBoundingClientRect(),vt=ue[ue.length-1].getBoundingClientRect();C<Be.left?Pe=0:C>vt.right&&(Pe=ue.length-1)}let Z=V.getBoundingClientRect(),Ae=ue.length,$e=oc("add-col","+","\u5217\u3092\u8FFD\u52A0\uFF08\u672B\u5C3E\uFF09");$e.style.top=Z.top+window.scrollY+"px",$e.style.left=Z.right+window.scrollX+3+"px",$e.style.height=Z.height+"px",$e.style.width="16px",$e.style.padding="0",$e.style.display="flex",$e.style.alignItems="center",$e.style.justifyContent="center",$e.onclick=()=>{e.applyMutation(Be=>sd(Be,z,Ae),"structural"),Qi()};let Oe=oc("add-row","+","\u884C\u3092\u8FFD\u52A0\uFF08\u672B\u5C3E\uFF09");Oe.style.top=Z.bottom+window.scrollY+3+"px",Oe.style.left=Z.left+window.scrollX+"px",Oe.style.width=Z.width+"px",Oe.style.height="16px",Oe.style.padding="0",Oe.style.display="flex",Oe.style.alignItems="center",Oe.style.justifyContent="center",Oe.onclick=()=>{e.applyMutation(Be=>zs(Be,z,ee.length),"structural"),Qi()};let Et=oc("rm-row","\u2715","\u884C\u3092\u524A\u9664");if(pe>=0&&ee.length>1){let Be=ee[pe].getBoundingClientRect();Et.style.top=Be.top+window.scrollY+(Be.height-18)/2+"px",Et.style.left=Be.left+window.scrollX-22+"px",Et.style.display="block",Et.onclick=()=>{e.applyMutation(vt=>Nu(vt,z,pe),"structural"),Qi()}}else Et.style.display="none";let Tn=oc("rm-col","\u2715","\u5217\u3092\u524A\u9664");if(Pe>=0&&ue.length>1){let Be=ue[Pe].getBoundingClientRect();Tn.style.top=Be.top+window.scrollY-22+"px",Tn.style.left=Be.left+window.scrollX+(Be.width-16)/2+"px",Tn.style.display="block",Tn.onclick=()=>{e.applyMutation(vt=>Ou(vt,z,Pe),"structural"),Qi()}}else Tn.style.display="none"}}function Uk(e){let t=Pl(e);return t.length===1&&t[0].kind==="br"?[]:t}function Pl(e){let t=[];for(let o of Array.from(e.childNodes)){if(o.nodeType===3){let a=o.textContent||"";a&&t.push({kind:"text",text:a});continue}if(o.nodeType!==1)continue;let n=o,r=n.tagName.toLowerCase();if(r==="br"){t.push({kind:"br"});continue}if(r==="strong"||r==="b"){t.push({kind:"bold",children:Pl(n)});continue}if(r==="em"||r==="i"){t.push({kind:"italic",children:Pl(n)});continue}if(r==="s"||r==="strike"||r==="del"){t.push({kind:"strike",children:Pl(n)});continue}if(r==="code"){t.push({kind:"code",text:n.textContent||""});continue}if(r==="a"&&n.classList.contains("memola-page-link")){let a=n.getAttribute("data-page-id")||"",i=(n.textContent||"").trim();if(a){t.push({kind:"pagelink",pageId:a,...i&&i!==a?{alias:i}:{}});continue}}t.push(...Pl(n))}return t}var bm,pC,jk=L(()=>{"use strict";Do();Qo();Re();bm=36,pC=250});var zo={};q(zo,{closeSlashMenuEditor2:()=>_g,destroyEditor2:()=>Kk,editor2ExecCmd:()=>Bg,getBlocks:()=>vn,isEditorComposing:()=>Ag,isSlashActiveEditor2:()=>Dg,loadBlocks:()=>$k,loadBlocksFromJson:()=>hC,mountEditor2:()=>uC,pruneEmptyTodosEditor2:()=>kC,reconcileEditorBlocks:()=>Cg,syncEditor2IntoSaver:()=>eg});function uC(e){Kk(),Cl++;let t=Cl;return ke=Hw(e),vm=ke.subscribe(o=>{Promise.resolve().then(()=>(ht(),Jr)).then(n=>{t===Cl&&n.schedSave()})}),ym=Vw(ke,e),xm=Xw(ke,e),Im=tk(ke,e),Em=Nk(ke,e),wm=EC(ke,e),km=wC(e),Tm=Hk(ke,e),Lm=zk(ke,e),Sm=gC(e),Mm=fC(ke,e),Pm=re.subscribe(o=>{if(t!==Cl||o.kind!=="idle"||!ke||m.currentId!==o.base.pageId)return;let n=ge(o.base.body);n.length===0&&(n=[rt("")]);let r=ke.getBlocks();qk(r)&&qk(n)||Ao(Je(r),Je(n))||ke.reconcile(n)}),ke}function qk(e){if(e.length===0)return!0;if(e.length!==1)return!1;let t=e[0];return t.kind==="p"&&t.inline.length===0}function fC(e,t){let o=n=>{if(n.target!==t)return;let r=t.lastElementChild;if(r){let c=r.getBoundingClientRect();if(n.clientY<c.bottom)return}n.preventDefault();let a=e.getBlocks(),i=a[a.length-1];if(!!i&&i.kind==="p"&&i.inline.length===0){e.applyMutation(c=>({...c,selection:{kind:"caret",blockId:i.id,offset:0}}),"selection");return}let l=rt("");e.applyMutation(c=>({...c,blocks:[...c.blocks,l],selection:{kind:"caret",blockId:l.id,offset:0}}),"structural")};return t.addEventListener("mousedown",o),()=>t.removeEventListener("mousedown",o)}function gC(e){let t=o=>{let n=o.target,r=n?.closest?.("a[data-href]");if(r&&e.contains(r)){o.preventDefault(),o.stopPropagation();let l=r.getAttribute("href")||"";l&&window.open(l,"_blank","noopener,noreferrer");return}let a=n?.closest?.("a.memola-page-link");if(!a||!e.contains(a))return;o.preventDefault(),o.stopPropagation();let i=a.getAttribute("data-daily-date"),s=a.getAttribute("data-page-id");if(i){(async()=>{try{let c=await(await Promise.resolve().then(()=>(An(),Ua))).getOrCreateNoteForDate(i),{doSelect:d}=await Promise.resolve().then(()=>(K(),ie));await d(c.dbPageId)}catch(l){console.error("[memola] daily link click failed:",l)}})();return}s&&(async()=>{try{let{doSelect:l}=await Promise.resolve().then(()=>(K(),ie));await l(s)}catch(l){console.error("[memola] page link click failed:",l)}})()};return e.addEventListener("click",t),()=>e.removeEventListener("click",t)}function $k(e){if(!ke)return;let t=e.length===0?[{id:Q(),kind:"p",inline:[]}]:e;ke.setBlocks(t,{silent:!0})}function hC(e){$k(ge(e))}function vn(){return ke?ke.getBlocks():[]}function Kk(){Cl++,ym&&(ym.destroy(),ym=null),xm&&(xm.destroy(),xm=null),Im&&(Im(),Im=null),Em&&(Em(),Em=null),wm&&(wm(),wm=null),km&&(km(),km=null),Tm&&(Tm(),Tm=null),Lm&&(Lm(),Lm=null),Sm&&(Sm(),Sm=null),Mm&&(Mm(),Mm=null),Pm&&(Pm(),Pm=null),vm&&(vm(),vm=null),ke&&(ke.destroy(),ke=null)}function eg(e){if(!ke)return;let t=Je(ke.getBlocks());re.notifyEdit(t,e)}function Cg(e){return ke?(ke.reconcile(e),!0):!1}function Ag(){return ke?ke.isComposing():!1}function Bg(e){if(!ke)return!1;let t=ke,o=()=>{let r=window.getSelection()?.anchorNode;return r?(r.nodeType===1?r:r.parentElement)?.closest("[data-block-id]")?.dataset.blockId??null:null};switch(e){case"bold":return t.toggleInlineFormat("bold"),!0;case"italic":return t.toggleInlineFormat("italic"),!0;case"strike":return t.toggleInlineFormat("strike"),!0;case"codeInline":case"code":return t.toggleInlineFormat("code"),!0;case"comment":{let n=o()||"";return Promise.resolve().then(()=>(Uo(),bn)).then(r=>{let a=r.currentCommentTarget();a&&r.openCommentPopover(a.pageId,n)}),!0}case"link":{let n=bC(),r=window.prompt("\u30EA\u30F3\u30AF\u5148 URL \u3092\u5165\u529B\uFF08UNC \u30D1\u30B9 \\\\server\\share\\... \u3082\u53EF\u3002\u7A7A\u6B04\u3067\u89E3\u9664\uFF09",n);return r===null||t.setLink(vC(r.trim())),!0}case"p":case"h1":case"h2":case"h3":case"todo":{let n=o();if(n){let r=t.getBlocks().find(i=>i.id===n),a=r&&r.kind===e&&e!=="p"?"p":e;t.setBlockKind(n,a)}return!0}case"ul":case"ol":case"quote":case"callout":case"pre":case"hr":{let n=o();return n&&t.applyMutation(r=>{let a=r.blocks.findIndex(c=>c.id===n);if(a<0)return r;let i=r.blocks.slice(),s=yC(e);i[a]=s;let l=xC(s);return{...r,blocks:i,selection:l?{kind:"caret",blockId:l,offset:0}:r.selection}},"structural"),!0}}return!1}function bC(){let t=window.getSelection()?.anchorNode;return(t?t.nodeType===1?t:t.parentElement:null)?.closest("a[data-href]")?.dataset.href??""}function vC(e){return!e||/^javascript:/i.test(e)?"":/^\\\\/.test(e)||/^[a-zA-Z][\w+.-]*:/.test(e)?e:/^[\w-]+(\.[\w-]+)+(\/|$|[?#:])/.test(e)?"https://"+e:e}function yC(e){switch(e){case"ul":return Hs();case"ol":return Fs();case"quote":return Us();case"callout":return Os();case"pre":return Rs();case"hr":return Ns()}}function xC(e){return e.kind==="list"?e.items[0]?.[0]?.id??null:e.kind==="callout"||e.kind==="quote"?e.children[0]?.id??null:"inline"in e||e.kind==="code"?e.id:null}function wC(e){let t=document.getElementById("memola-ftb")||document.getElementById("ftb");if(!t)return()=>{};let o=()=>{let n=window.getSelection();if(!n||n.rangeCount===0||n.isCollapsed){t.classList.remove("on");return}let r=n.getRangeAt(0);if(!e.contains(r.startContainer)){t.classList.remove("on");return}let a=r.getBoundingClientRect();if(a.width===0&&a.height===0){t.classList.remove("on");return}t.style.top=a.top+window.scrollY-48+"px",t.style.left=a.left+window.scrollX+"px",t.classList.add("on")};return document.addEventListener("selectionchange",o),()=>{document.removeEventListener("selectionchange",o),t.classList.remove("on")}}function kC(){if(!ke)return 0;let e=ke.getBlocks(),t=e.filter(n=>n.kind!=="todo"?!0:n.inline.map(a=>a.kind==="text"?a.text:"").join("").trim()!==""),o=e.length-t.length;return o>0&&ke.applyMutation(n=>({...n,blocks:t}),"structural"),o}function Dg(){return!!document.querySelector(".memola-slash2")}function _g(){document.querySelectorAll(".memola-slash2").forEach(e=>e.remove())}function IC(e){let t=()=>{let l=()=>Math.random().toString(36).slice(2,8);return"blk_"+l()+l()},o=l=>{let c=Math.max(...l.map(p=>p.length),1),d=l.map(p=>{let u=[];for(let f=0;f<c;f++){let g=p[f]||"";u.push(g?[{kind:"text",text:g}]:[])}return u});return{id:t(),kind:"table",hrow:!0,hcol:!1,rows:d}},n=e.getData("text/html");if(n&&/<table[\s\S]*?<\/table>/i.test(n)){let l=document.createElement("div");l.innerHTML=n;let c=l.querySelector("table");if(c){let p=Array.from(c.querySelectorAll("tr")).map(u=>Array.from(u.children).map(f=>(f.textContent||"").replace(/\s+/g," ").trim()));if(p.length>0&&p.some(u=>u.length>0))return o(p)}}let r=e.getData("text/plain");if(!r)return null;let a=r.replace(/\r\n/g,`
`).replace(/\n+$/,"").split(`
`);if(a.length===0)return null;let i=a.map(l=>l.split("	"));return i.length>=2||i.some(l=>l.length>=2)?o(i):null}function EC(e,t){let o=n=>{let r=n.clipboardData;if(!r)return;let a=n.target;if(!!!(a&&typeof a.closest=="function"&&a.closest(".memola-itbl-wrap"))){let d=IC(r);if(d){n.preventDefault(),e.applyMutation(p=>{let u=p.selection,f=u?.kind==="caret"?u.blockId:u?.kind==="range"?u.focusBlockId:p.blocks[p.blocks.length-1]?.id,g=f?p.blocks.findIndex(v=>v.id===f):-1,y=p.blocks.slice(),b=g>=0?p.blocks[g]:null;if(b&&b.kind==="p"&&b.inline.length===0&&g>=0)y[g]=d;else{let v=g>=0?g+1:y.length;y.splice(v,0,d)}return{...p,blocks:y,selection:null}},"structural");return}}let s=r.getData("text/html"),l=r.getData("text/plain"),c=[];s?c=Rb(s):l&&(c=Ye(l)),c.length!==0&&(n.preventDefault(),e.applyMutation(d=>{let p=d.selection,u=p?.kind==="caret"?p.blockId:p?.kind==="range"?p.focusBlockId:d.blocks[d.blocks.length-1]?.id,f=d.blocks.slice(),g=u?f.findIndex(b=>b.id===u)+1:f.length;g<=0&&(g=f.length),f.splice(g,0,...c);let y=c[c.length-1];return{...d,blocks:f,selection:{kind:"caret",blockId:y.id,offset:0}}},"structural"))};return t.addEventListener("paste",o),()=>t.removeEventListener("paste",o)}var ke,vm,ym,xm,wm,km,Im,Em,Tm,Lm,Sm,Mm,Pm,Cl,bt=L(()=>{"use strict";Qo();j();Fw();W();St();on();gt();Va();Yw();Jw();fg();Ok();Fk();jk();Do();ke=null,vm=null,ym=null,xm=null,wm=null,km=null,Im=null,Em=null,Tm=null,Lm=null,Sm=null,Mm=null,Pm=null,Cl=0});var Og={};q(Og,{countAll:()=>MC,deleteAllForPage:()=>PC,deleteDraft:()=>Am,listAll:()=>Bl,listForPage:()=>Vk,purgeOrphaned:()=>CC,saveDraft:()=>Ng});function LC(e){try{let t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function SC(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Bi(){let e=[];try{for(let t=0;t<localStorage.length;t++){let o=localStorage.key(t);o&&o.startsWith(Rg)&&e.push(o)}}catch{}return e}function Al(e){let t=e.slice(Rg.length),o=t.lastIndexOf(".");if(o<0)return null;let n=t.slice(0,o),r=Number(t.slice(o+1));return!n||!Number.isFinite(r)?null:{pageId:n,ts:r}}function Gk(e){let t=LC(e);return t?{key:e,...t}:null}function Cm(){let e=Date.now()-TC;for(let t of Bi()){let o=Al(t);if(o&&o.ts<e)try{localStorage.removeItem(t)}catch{}}}function Ng(e){Cm();let t=Date.now(),o=Rg+e.pageId+"."+t,n={pageId:e.pageId,pageTitle:e.pageTitle,title:e.title,body:e.body,savedAt:t,reason:e.reason||"conflict-discarded",baseBody:e.baseBody,baseEtag:e.baseEtag};SC(o,n);let r=Vk(e.pageId);if(r.length>Wk){r.sort((a,i)=>i.savedAt-a.savedAt);for(let a of r.slice(Wk))try{localStorage.removeItem(a.key)}catch{}}return o}function Vk(e){Cm();let t=[];for(let o of Bi()){let n=Al(o);if(!n||n.pageId!==e)continue;let r=Gk(o);r&&t.push(r)}return t.sort((o,n)=>n.savedAt-o.savedAt),t}function Bl(){Cm();let e=[];for(let t of Bi()){let o=Gk(t);o&&e.push(o)}return e.sort((t,o)=>o.savedAt-t.savedAt),e}function MC(){Cm();let e=0;for(let t of Bi())Al(t)&&e++;return e}function Am(e){try{localStorage.removeItem(e)}catch{}}function PC(e){for(let t of Bi())if(Al(t)?.pageId===e)try{localStorage.removeItem(t)}catch{}}function CC(e){for(let t of Bi()){let o=Al(t);if(o&&!e.has(o.pageId))try{localStorage.removeItem(t)}catch{}}}var Rg,Wk,TC,Dl=L(()=>{"use strict";ve();Rg=Mp,Wk=5,TC=7*24*60*60*1e3});function ra(e){return document.getElementById(e.id)?e.cancelValue!==void 0?Promise.resolve(e.cancelValue):Promise.reject(new Error("modal-already-open")):new Promise(t=>{let o=document.getElementById("memola-overlay")||document.body,n=document.createElement("div");n.id=e.id,n.className=e.className+" on",n.innerHTML=e.contentHtml,o.appendChild(n);let r=!1,a=l=>{r||(r=!0,n.remove(),document.removeEventListener("keydown",i,!0),t(l))};function i(l){l.key==="Escape"&&e.cancelValue!==void 0&&(l.preventDefault(),l.stopPropagation(),l.stopImmediatePropagation(),a(e.cancelValue))}document.addEventListener("keydown",i,!0),n.addEventListener("click",l=>{let c=l.target;if(c===n&&e.cancelValue!==void 0){a(e.cancelValue);return}let d=c.closest("button[data-c]");if(!d)return;let p=d.dataset.c||"";p in e.buttons&&a(e.buttons[p])}),e.onMounted&&e.onMounted(n);let s=e.focusSel||"button[data-c]";n.querySelector(s)?.focus()})}function xn(e){let t=null;function o(a){a.key==="Escape"&&document.getElementById(e.id)&&(a.preventDefault(),a.stopPropagation(),e.onEscape&&e.onEscape())}function n(){let a=document.getElementById(e.id);a&&a.remove(),document.removeEventListener("keydown",o,!0),t=null}function r(a,i){let s=document.getElementById(e.id);s&&s.remove(),document.removeEventListener("keydown",o,!0);let l=document.getElementById("memola-overlay")||document.body,c=document.createElement("div");c.id=e.id,c.className=e.className+" on",c.innerHTML=a,l.appendChild(c),t=c,e.onBackdropClick&&c.addEventListener("click",d=>{d.target===c&&e.onBackdropClick()}),document.addEventListener("keydown",o,!0),i&&i(c)}return{render:r,close:n,isOpen:()=>t!==null&&document.getElementById(e.id)!==null}}var er=L(()=>{"use strict"});var tr={};q(tr,{applyDraftToOriginInteractive:()=>Qk,attachDraftsSidebar:()=>Hg,closeDraftsModal:()=>wn,openDraftsModal:()=>Zk,refreshDraftsBadge:()=>ko});function BC(){let e=Bl(),t=new Map;for(let n of e){let r=A(n.pageId),a=t.get(n.pageId);a||(a={pageId:n.pageId,pageTitle:r?.title||n.pageTitle||"(\u30BF\u30A4\u30C8\u30EB\u4E0D\u660E)",exists:!!r&&!r.trashed,drafts:[]},t.set(n.pageId,a)),a.drafts.push(n)}let o=Array.from(t.values());return o.sort((n,r)=>{if(n.exists!==r.exists)return n.exists?-1:1;let a=Math.max(...n.drafts.map(s=>s.savedAt));return Math.max(...r.drafts.map(s=>s.savedAt))-a}),o}function Jk(){return m.pages.filter(e=>e.IsDraft)}function DC(){return Jk().length+Bl().length}function Zk(e){Xk.render('<div class="memola-drafts-box"><div class="memola-drafts-hd"><span class="memola-drafts-title">\u{1F4DD} \u4E0B\u66F8\u304D</span><span class="memola-drafts-count"></span><button class="memola-drafts-close" title="\u9589\u3058\u308B">\xD7</button></div><div class="memola-drafts-body"></div></div>',t=>{t.querySelector(".memola-drafts-close")?.addEventListener("click",wn),Bm(t),e&&setTimeout(()=>{t.querySelector('.memola-drafts-group[data-page-id="'+e+'"]')?.scrollIntoView({block:"start"})},0)})}function wn(){Xk.close()}function Bm(e){let t=Jk(),o=BC(),n=t.length+o.reduce((l,c)=>l+c.drafts.length,0),r=e.querySelector(".memola-drafts-count");r&&(r.textContent="("+n+"\u4EF6)");let a=e.querySelector(".memola-drafts-body");if(!a)return;if(n===0){a.innerHTML='<div class="memola-drafts-empty">\u4E0B\u66F8\u304D\u306F\u3042\u308A\u307E\u305B\u3093\u3002<br><span style="font-size:11px;color:var(--ink-3)">\u30DA\u30FC\u30B8\u30E1\u30CB\u30E5\u30FC\u306E\u300C\u270F\uFE0F \u4E0B\u66F8\u304D\u3068\u3057\u3066\u8907\u88FD\u300D\u3001\u307E\u305F\u306F\u4FDD\u5B58\u885D\u7A81\u6642\u306E\u300C\u76F8\u624B\u306E\u7248\u3092\u8868\u793A\u300D\u3067\u4E0B\u66F8\u304D\u304C\u4F5C\u6210\u3055\u308C\u307E\u3059\u3002</span></div>';return}let i="";t.length>0&&(i='<div class="memola-drafts-section"><div class="memola-drafts-section-hd"><span>\u{1F4DD} \u30DA\u30FC\u30B8\u4E0B\u66F8\u304D</span><span class="memola-drafts-section-sub">(\u7DE8\u96C6\u4E2D\u306E\u8907\u88FD\u30DA\u30FC\u30B8)</span></div>',i+=t.map(l=>{let d=A(l.Id)?.originPageId||"",p=d?A(d):null,u=p?.title||"(\u539F\u672C\u30DA\u30FC\u30B8\u4E0D\u660E)",f=!!p&&!p.trashed;return'<div class="memola-drafts-item memola-drafts-spitem" data-page-id="'+M(l.Id)+'"><div class="memola-drafts-itemhd"><span class="memola-drafts-itemtitle">'+M(l.Title||"\u7121\u984C")+'</span></div><div class="memola-drafts-itemprev">\u539F\u672C: '+(f?M(u):'<span class="memola-drafts-orphan">'+M(u)+" (\u524A\u9664\u6E08\u307F)</span>")+'</div><div class="memola-drafts-itemactions"><button class="memola-btn p" data-act="open">\u958B\u304F</button>'+(f?'<button class="memola-btn s" data-act="apply">\u539F\u672C\u306B\u9069\u7528</button>':'<button class="memola-btn s" data-act="promote">\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58</button>')+'<button class="memola-btn ghost" data-act="discard">\u7834\u68C4</button></div></div>'}).join(""),i+="</div>");let s="";o.length>0&&(s='<div class="memola-drafts-section"><div class="memola-drafts-section-hd"><span>\u{1F4BE} \u9000\u907F\u3055\u308C\u305F\u7DE8\u96C6</span><span class="memola-drafts-section-sub">(\u4FDD\u5B58\u885D\u7A81\u6642\u306B\u9000\u907F)</span></div>',s+=o.map(l=>{let c='<div class="memola-drafts-grouphead">'+(l.exists?"\u{1F4C4} ":"\u{1F5D1} ")+'<span class="memola-drafts-grouptitle">'+M(l.pageTitle)+(l.exists?"":' <span class="memola-drafts-orphan">(\u524A\u9664\u3055\u308C\u305F\u30DA\u30FC\u30B8)</span>')+'</span><span class="memola-drafts-groupcount">'+l.drafts.length+"\u4EF6</span></div>",d=l.drafts.map(p=>{let u=(p.body||"").replace(/\s+/g," ").slice(0,80);return'<div class="memola-drafts-item" data-key="'+M(p.key)+'"><div class="memola-drafts-itemhd"><span class="memola-drafts-itemtime">'+Sn(p.savedAt)+'</span><span class="memola-drafts-itemtitle">'+M(p.title||"\u7121\u984C")+'</span></div><div class="memola-drafts-itemprev">'+M(u||"(\u672C\u6587\u306A\u3057)")+'</div><div class="memola-drafts-itemactions">'+(l.exists?'<button class="memola-btn p" data-act="merge">\u7D71\u5408 (3-way)</button>':"")+(l.exists?'<button class="memola-btn s" data-act="restore">\u305D\u306E\u307E\u307E\u5FA9\u5143</button>':"")+'<button class="memola-btn s" data-act="preview">\u30D7\u30EC\u30D3\u30E5\u30FC</button><button class="memola-btn ghost" data-act="delete">\u524A\u9664</button></div></div>'}).join("");return'<div class="memola-drafts-group" data-page-id="'+l.pageId+'">'+c+d+"</div>"}).join(""),s+="</div>"),a.innerHTML=i+s,a.querySelectorAll(".memola-drafts-spitem").forEach(l=>{let c=l.dataset.pageId||"";l.addEventListener("click",async d=>{let p=d.target.closest("button[data-act]");if(!p)return;let u=p.dataset.act;if(u==="open"){wn();let{doSelect:f}=await Promise.resolve().then(()=>(K(),ie));await f(c)}else if(u==="apply"){if(!confirm("\u4E0B\u66F8\u304D\u3092\u539F\u672C\u306B\u9069\u7528\u3057\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B?"))return;try{wn(),await Qk(c)}catch(f){k("\u9069\u7528\u5931\u6557: "+f.message,"err")}}else if(u==="promote"){if(!confirm("\u539F\u672C\u304C\u524A\u9664\u3055\u308C\u3066\u3044\u308B\u305F\u3081\u3001\u3053\u306E\u4E0B\u66F8\u304D\u3092\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B?"))return;try{let{apiPromoteDraftToPage:f,apiGetPages:g}=await Promise.resolve().then(()=>(W(),qe)),y=await f(c);await g();let{renderTree:b}=await Promise.resolve().then(()=>(_e(),wo));b(),Bm(e),ko(),wn();let{doSelect:h}=await Promise.resolve().then(()=>(K(),ie));await h(y),k("\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3057\u305F")}catch(f){k("\u4FDD\u5B58\u5931\u6557: "+f.message,"err")}}else if(u==="discard"){if(!confirm("\u3053\u306E\u4E0B\u66F8\u304D\u3092\u5B8C\u5168\u306B\u524A\u9664\u3057\u307E\u3059\u3002\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?"))return;try{let{apiDeletePage:f,apiGetPages:g}=await Promise.resolve().then(()=>(W(),qe));await f(c),await g();let{renderTree:y}=await Promise.resolve().then(()=>(_e(),wo));y(),Bm(e),ko(),k("\u4E0B\u66F8\u304D\u3092\u7834\u68C4\u3057\u307E\u3057\u305F")}catch(f){k("\u7834\u68C4\u5931\u6557: "+f.message,"err")}}})}),a.querySelectorAll(".memola-drafts-item:not(.memola-drafts-spitem)").forEach(l=>{let c=l.dataset.key||"";l.addEventListener("click",async d=>{let p=d.target.closest("button[data-act]");if(!p)return;let u=p.dataset.act,f=Bl().find(g=>g.key===c);if(f){if(u==="preview")_C(f);else if(u==="delete"){if(!confirm("\u3053\u306E\u4E0B\u66F8\u304D\u3092\u524A\u9664\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?"))return;Am(c),Bm(e),ko(),k("\u4E0B\u66F8\u304D\u3092\u524A\u9664\u3057\u307E\u3057\u305F")}else if(u==="restore")await RC(f);else if(u==="merge"){wn();let{saver:g}=await Promise.resolve().then(()=>(gt(),Xa));await g.beginExternalMerge({pageId:f.pageId,pageTitle:f.pageTitle,title:f.title,ourBody:f.body,baseBody:f.baseBody||"",baseEtag:f.baseEtag||""})}}})})}function _C(e){let t=document.createElement("div");t.className="memola-drafts-md on",t.style.zIndex="2147483649",t.innerHTML='<div class="memola-drafts-box" style="max-width:720px"><div class="memola-drafts-hd"><span class="memola-drafts-title">\u30D7\u30EC\u30D3\u30E5\u30FC: '+M(e.title||"\u7121\u984C")+'</span><button class="memola-drafts-close">\xD7</button></div><div class="memola-drafts-preview">'+So(e.body)+"</div></div>",(document.getElementById("memola-overlay")||document.body).appendChild(t);let o=()=>{t.remove()};t.addEventListener("click",n=>{n.target===t&&o()}),t.querySelector(".memola-drafts-close")?.addEventListener("click",o)}async function RC(e){if(!confirm("\u300C"+(e.title||"\u7121\u984C")+`\u300D \u3092\u7DE8\u96C6\u9818\u57DF\u306B\u5FA9\u5143\u3057\u307E\u3059\u3002

\u73FE\u5728\u306E\u7DE8\u96C6\u4E2D\u306E\u672C\u6587\u304C\u3042\u308B\u5834\u5408\u306F\u3001\u5FF5\u306E\u305F\u3081\u5225\u306E\u4E0B\u66F8\u304D\u3068\u3057\u3066\u81EA\u52D5\u4FDD\u5B58\u3057\u307E\u3059\u3002
\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F`))return;let{saver:t}=await Promise.resolve().then(()=>(gt(),Xa));if(t.isDirty()&&m.currentId){let{saveDraft:i}=await Promise.resolve().then(()=>(Dl(),Og)),{getBlocks:s}=await Promise.resolve().then(()=>(bt(),zo)),l=Xe(s()),c=I("ttl");i({pageId:m.currentId,pageTitle:m.pages.find(d=>d.Id===m.currentId)?.Title||"\u7121\u984C",title:c.value||"\u7121\u984C",body:l,reason:"conflict-discarded"})}let{doSelect:o}=await Promise.resolve().then(()=>(K(),ie));await o(e.pageId);let{loadBlocks:n}=await Promise.resolve().then(()=>(bt(),zo));n(Ye(e.body));let r=I("ttl");e.title&&(r.value=e.title);let{schedSave:a}=await Promise.resolve().then(()=>(ht(),Jr));a(),Am(e.key),ko(),wn(),k("\u4E0B\u66F8\u304D\u3092\u5FA9\u5143\u3057\u307E\u3057\u305F\uFF08\u4FDD\u5B58\u306F\u307E\u3060\u3055\u308C\u3066\u3044\u307E\u305B\u3093\uFF09")}async function Qk(e){let{apiApplyDraftToOrigin:t,apiGetPages:o}=await Promise.resolve().then(()=>(W(),qe)),{doSelect:n}=await Promise.resolve().then(()=>(K(),ie)),r=await t(e);if(r.status==="conflict"){if(!confirm("\u539F\u672C\u304C\u4E0B\u66F8\u304D\u4F5C\u6210\u5F8C\u306B\u5909\u66F4\u3055\u308C\u3066\u304A\u308A\u3001\u81EA\u52D5\u30DE\u30FC\u30B8\u3067\u304D\u306A\u3044\u7AF6\u5408\u304C "+r.conflicts+` \u4EF6\u3042\u308A\u307E\u3059\u3002

\u300COK\u300D: \u4E0B\u66F8\u304D\u306E\u5185\u5BB9\u3067\u539F\u672C\u3092\u4E0A\u66F8\u304D\u3057\u307E\u3059\uFF08\u539F\u672C\u306E\u73FE\u5728\u306E\u672C\u6587\u306F SP \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74\u306B\u6B8B\u308A\u307E\u3059\uFF09\u3002
\u300C\u30AD\u30E3\u30F3\u30BB\u30EB\u300D: \u4E2D\u6B62\u3057\u307E\u3059\uFF08\u539F\u672C\u3092\u958B\u3044\u3066\u5185\u5BB9\u3092\u78BA\u8A8D\u3067\u304D\u307E\u3059\uFF09\u3002`))return await n(r.originId),!1;r=await t(e,{force:!0})}await o();let{renderTree:a}=await Promise.resolve().then(()=>(_e(),wo));return a(),ko(),await n(r.originId),r.status==="merged"?k("\u539F\u672C\u304C\u5909\u66F4\u3055\u308C\u3066\u3044\u305F\u305F\u3081\u81EA\u52D5\u30DE\u30FC\u30B8\u3057\u3066\u9069\u7528\u3057\u307E\u3057\u305F\uFF08"+r.autoMerged+"\u4EF6\u30DE\u30FC\u30B8\uFF09"):r.status==="forced"?k("\u539F\u672C\u306B\u4E0A\u66F8\u304D\u9069\u7528\u3057\u307E\u3057\u305F"):k("\u539F\u672C\u306B\u9069\u7528\u3057\u307E\u3057\u305F"),!0}function ko(){let e=document.getElementById(Yk);if(!e)return;let t=DC();if(t===0){e.style.display="none";return}e.style.display="";let o=e.querySelector(".memola-drafts-badge-count");o&&(o.textContent=String(t))}function Hg(){let e=document.getElementById(Yk);e&&(e.addEventListener("click",()=>Zk()),ko())}var AC,Yk,Xk,Wo=L(()=>{"use strict";j();me();le();St();on();Dl();Re();To();er();we();AC="memola-drafts-md",Yk="memola-drafts-btn",Xk=xn({id:AC,className:"memola-drafts-md",onEscape:()=>wn(),onBackdropClick:()=>wn()})});var Fg={};q(Fg,{clearMergeHighlight:()=>Rm,highlightIncomingBlocks:()=>HC});function NC(e){return e.replace(/"/g,'\\"')}function OC(e){let t={...e};return delete t.children,delete t.items,delete t.rows,JSON.stringify(t,Rn)}function _m(e,t){for(let o of e){t.set(o.id,OC(o));let n=o;if(Array.isArray(n.children)&&_m(n.children,t),Array.isArray(n.items))for(let r of n.items)_m(r,t)}}function HC(e,t){Rm();let o=new Map,n=new Map;_m(ge(e),o),_m(ge(t),n);let r=[];for(let[i,s]of n)o.get(i)!==s&&r.push(i);if(r.length===0)return;let a=Ce();for(let i of r)a.querySelector('[data-block-id="'+NC(i)+'"]')?.classList.add("memola-block-incoming");Dm||(Dm=!0,a.addEventListener("input",Rm,{once:!0}))}function Rm(){let e=Ce();e.querySelectorAll(".memola-block-incoming").forEach(t=>t.classList.remove("memola-block-incoming")),Dm&&(e.removeEventListener("input",Rm),Dm=!1)}var Dm,Ug=L(()=>{"use strict";me();W();Va();Dm=!1});var Om={};q(Om,{attachCrossTabSync:()=>$g,attachStaleBannerSuppressionReset:()=>qg,detachCrossTabSync:()=>zC,startWatching:()=>jg,stopWatching:()=>Vn});function FC(){let e=Ln.get(),t=e?parseInt(e,10):e0;return!isFinite(t)||t<0?e0:t}function jg(e,t,o){m.sync.pageId=e,m.sync.loadedModified=t,m.sync.loadedEtag=o,_l(),m.sync.pollTimer&&clearInterval(m.sync.pollTimer);let n=FC();n>0&&(m.sync.pollTimer=setInterval(UC,n))}function Vn(){m.sync.pollTimer&&clearInterval(m.sync.pollTimer),m.sync.pollTimer=null,m.sync.pageId=null,m.sync.loadedModified=null,m.sync.loadedEtag=null,_l()}async function UC(){if(document.hidden||m.sync.suppressBannerUntilFocus)return;let e=m.sync.pageId;if(!e||m.currentId!==e||m.saving)return;let t=m.pages.find(o=>o.Id===e);if(!(!t||t.Type==="database"))try{let o=await dt(e);if(m.currentId!==e)return;if(!o){await t0(e,"purged");return}if(o.trashed>0){await t0(e,"trashed");return}if(m.currentId!==e)return;let n=!!o.etag&&o.etag===m.sync.loadedEtag,r=!!o.modified&&o.modified===m.sync.loadedModified;if(n||r||await r0(e,o.etag,o.modified))return;let i=await _a(e).catch(()=>""),s=await Cn().catch(()=>"");if(m.currentId!==e)return;let l=!!i&&!!s&&i===s;a0(i,o.modified,e,l)}catch{}}async function t0(e,t){if(zg)return;let o=re.state();if(!(o.kind!=="idle"&&o.kind!=="dirty")&&o.base.pageId===e){zg=!0;try{let n=re.isDirty(),r=(o.kind==="dirty"?o.title:o.base.title)||"\u7121\u984C",a=Je(vn());if(t==="trashed"){if(window.confirm(`\u3053\u306E\u30DA\u30FC\u30B8\u306F\u4ED6\u306E\u30E6\u30FC\u30B6\u30FC\u306B\u3088\u3063\u3066\u524A\u9664\uFF08\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5\uFF09\u3055\u308C\u307E\u3057\u305F\u3002

\u300COK\u300D: \u5143\u306B\u623B\u3057\u3066\u7DE8\u96C6\u3092\u7D9A\u3051\u307E\u3059\u3002
\u300C\u30AD\u30E3\u30F3\u30BB\u30EB\u300D: `+(n?"\u7DE8\u96C6\u5185\u5BB9\u3092\u4E0B\u66F8\u304D\u306B\u9000\u907F\u3057\u3066":"")+"\u3053\u306E\u30DA\u30FC\u30B8\u3092\u9589\u3058\u307E\u3059\u3002")){await Bs(e);let l=await dt(e).catch(()=>null);l&&(m.sync.loadedEtag=l.etag,m.sync.loadedModified=l.modified),k("\u30DA\u30FC\u30B8\u3092\u5FA9\u5143\u3057\u307E\u3057\u305F\u3002\u7DE8\u96C6\u3092\u7D9A\u3051\u3089\u308C\u307E\u3059");return}n&&(o0(e,r,a,o.base.body,o.base.etag),k("\u7DE8\u96C6\u5185\u5BB9\u3092\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F\uFF08\u{1F4DD} \u4E0B\u66F8\u304D \u304B\u3089\u958B\u3051\u307E\u3059\uFF09")),n0(e);return}window.confirm(`\u3053\u306E\u30DA\u30FC\u30B8\u306F\u5B8C\u5168\u306B\u524A\u9664\u3055\u308C\u307E\u3057\u305F\u3002\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002

\u7DE8\u96C6\u5185\u5BB9\u3092\u4E0B\u66F8\u304D\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3059\u304B?
\uFF08\u{1F4DD} \u4E0B\u66F8\u304D \u304B\u3089\u5F8C\u3067\u958B\u3051\u307E\u3059\uFF09`)&&(o0(e,r,a,o.base.body,o.base.etag),k("\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F\uFF08\u{1F4DD} \u4E0B\u66F8\u304D \u304B\u3089\u958B\u3051\u307E\u3059\uFF09")),n0(e)}finally{zg=!1}}}function o0(e,t,o,n,r){try{Ng({pageId:e,pageTitle:t,title:t,body:o,baseBody:n,baseEtag:r,reason:"page-deleted"}),Promise.resolve().then(()=>(Wo(),tr)).then(a=>a.refreshDraftsBadge()).catch(()=>{})}catch{}}function n0(e){Vn(),re.unload(),Mo([e]),m.currentId=null,m.currentRow=null,te(),tt("empty")}async function r0(e,t,o){let n=re.state();if(n.kind!=="idle"&&n.kind!=="dirty"||n.base.pageId!==e)return!1;if(Ag())return!0;let r=await Ct(e).catch(()=>null);if(r===null)return!1;if(m.currentId!==e)return!0;let a=n.base.body,i=Je(vn()),s=n.kind==="dirty"?n.title:n.base.title,l=Hv(a,i,r);return l.kind==="conflict"||l.kind==="noop"?!1:(l.changed&&(Cg(l.merged),Promise.resolve().then(()=>(Ug(),Fg)).then(c=>c.highlightIncomingBlocks(i,l.mergedBody)).catch(()=>{})),re.rebaseOnto({pageId:e,body:r,title:s,etag:t,modified:o},l.mergedBody,s),Yo(e).set(t),!0)}function a0(e,t,o,n=!1){let r=document.getElementById("memola-sync-banner");r||(r=document.createElement("div"),r.id="memola-sync-banner",document.getElementById("memola-overlay")?.appendChild(r));let a=new Date(t).toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"}),i=n?"\u5225\u306E\u30BF\u30D6 (\u3042\u306A\u305F)":"<strong>"+M(e||"\u8AB0\u304B")+"</strong>\u3055\u3093";r.innerHTML="<span>\u{1F514} "+i+"\u304C "+a+' \u306B\u66F4\u65B0\u3057\u307E\u3057\u305F</span><button id="memola-sync-reload">\u4ECA\u3059\u3050\u53CD\u6620</button><button id="memola-sync-dismiss">\u5F8C\u3067</button><button id="memola-sync-mute" title="\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u30BF\u30D6\u3092\u96E2\u308C\u308B\u307E\u3067\u518D\u8868\u793A\u3057\u307E\u305B\u3093">\u30BF\u30D6\u3092\u96E2\u308C\u308B\u307E\u3067\u975E\u8868\u793A</button>',r.classList.add("on"),document.getElementById("memola-sync-reload")?.addEventListener("click",async()=>{let{saver:s}=await Promise.resolve().then(()=>(gt(),Xa));s.isDirty()&&!confirm("\u672A\u4FDD\u5B58\u306E\u5909\u66F4\u304C\u3042\u308A\u307E\u3059\u3002\u30EA\u30ED\u30FC\u30C9\u3057\u3066\u4E0A\u66F8\u304D\u3057\u307E\u3059\u304B\uFF1F")||(_l(),await Ue(o))}),document.getElementById("memola-sync-dismiss")?.addEventListener("click",()=>{_l()}),document.getElementById("memola-sync-mute")?.addEventListener("click",()=>{m.sync.suppressBannerUntilFocus=!0,_l()})}function _l(){let e=document.getElementById("memola-sync-banner");e&&e.remove()}function qg(){let e=document.body;e.dataset.memolaStaleResetWired!=="1"&&(e.dataset.memolaStaleResetWired="1",document.addEventListener("visibilitychange",()=>{document.hidden||(m.sync.suppressBannerUntilFocus=!1)}))}function zC(){Nm&&(Nm(),Nm=null),Sv();let e=document.body;delete e.dataset.memolaCrossTabWired}function $g(){let e=document.body;e.dataset.memolaCrossTabWired!=="1"&&(e.dataset.memolaCrossTabWired="1",Nm=Mv(t=>{m.currentId===t.pageId&&(t.etag&&t.etag===m.sync.loadedEtag||m.sync.suppressBannerUntilFocus||m.saving||(async()=>await r0(t.pageId,t.etag,t.modified)||m.currentId===t.pageId&&a0("",t.modified,t.pageId,!0))())}))}var e0,zg,Nm,Wr=L(()=>{"use strict";j();W();Xt();K();Re();ve();wu();gt();Fv();bt();le();we();_e();Dl();e0=3e4;zg=!1;Nm=null});var Gg={};q(Gg,{applyOutlineState:()=>aa,attachOutlineWatcher:()=>Wg,isOutlineOpen:()=>Hm,renderOutline:()=>Kg,setOutlineOpen:()=>i0,toggleOutline:()=>Rl});function Hm(){return as.get()==="1"}function i0(e){e?as.set("1"):as.clear(),aa()}function Rl(){i0(!Hm())}function aa(){let e=I("outline"),t=document.getElementById("memola-outline-btn"),o=m.currentType==="page"&&!!m.currentId;t&&(t.style.display=o?"":"none"),Hm()&&o?(e.classList.add("on"),t?.classList.add("on"),Kg()):(e.classList.remove("on"),t?.classList.remove("on"))}function Kg(){if(!Hm()||m.currentType!=="page")return;let e=I("outline-list");e.innerHTML="";let o=Ce().querySelectorAll("h1, h2, h3");if(o.length===0){let n=document.createElement("div");n.className="memola-outline-empty",n.textContent="\u898B\u51FA\u3057\u304C\u3042\u308A\u307E\u305B\u3093",e.appendChild(n);return}o.forEach((n,r)=>{let a="memola-outline-h-"+r;n.setAttribute("data-outline-id",a);let i=document.createElement("div");i.className="memola-outline-item memola-outline-"+n.tagName.toLowerCase(),i.textContent=(n.textContent||"").trim()||"(\u7121\u984C)",i.addEventListener("click",()=>{n.scrollIntoView({behavior:"smooth",block:"start"})}),e.appendChild(i)})}function Wg(){let e=Ce(),t=null;new MutationObserver(()=>{t&&clearTimeout(t),t=setTimeout(()=>Kg(),300)}).observe(e,{childList:!0,subtree:!0,characterData:!0})}var Di=L(()=>{"use strict";j();me();ve()});var Vg={};q(Vg,{applyPropertiesState:()=>ia,isPropertiesOpen:()=>Fm,renderProperties:()=>l0,setPropertiesOpen:()=>s0,togglePropertiesPanel:()=>Nl});function Fm(){return is.get()==="1"}function s0(e){e?is.set("1"):is.clear(),ia()}function Nl(){s0(!Fm())}function ia(){let e=I("props"),t=document.getElementById("memola-props-btn");Fm()&&m.currentId?(e.classList.add("on"),t?.classList.add("on"),l0()):(e.classList.remove("on"),t?.classList.remove("on"))}function Go(e,t){return'<div class="memola-prop-row"><div class="memola-prop-label">'+M(e)+'</div><div class="memola-prop-value">'+M(t)+"</div></div>"}async function l0(){if(!Fm()||!m.currentId)return;let e=I("props-list"),t=m.currentId,o=m.pages.find(l=>l.Id===t),n=A(t);if(!o||!n){e.innerHTML="";return}let r=or(t).slice(0,-1).map(l=>l.Title||"\u7121\u984C").join(" / ")||"(\u30EB\u30FC\u30C8)",a=o.Type==="database"?"\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9":"\u30DA\u30FC\u30B8";if(e.innerHTML=Go("\u7A2E\u985E",a)+Go("\u89AA",r)+Go("\u30A2\u30A4\u30B3\u30F3",n.icon||"-")+Go("ID",t)+(o.Type==="database"&&n.list?Go("SP \u30EA\u30B9\u30C8",n.list):"")+(o.Type!=="database"?Go("\u30EA\u30B9\u30C8\u9805\u76EE",nt(t)+" #"+t):"")+'<div class="memola-prop-row memola-prop-loading">\u6700\u7D42\u66F4\u65B0\u8005\u3092\u53D6\u5F97\u4E2D...</div>',o.Type!=="database")try{let l="",c="";if(m.sync.pageId===t&&m.sync.loadedModified)l=m.sync.loadedModified;else{let p=await dt(t);p&&(l=p.modified)}c=await _a(t).catch(()=>"");let d=e.querySelector(".memola-prop-loading");if(d&&d.remove(),l){let p=new Date(l).toLocaleString("ja-JP");e.insertAdjacentHTML("beforeend",Go("\u6700\u7D42\u66F4\u65B0",p)),e.insertAdjacentHTML("beforeend",Go("\u7DE8\u96C6\u8005",c||"\u4E0D\u660E"))}}catch{}else{let l=e.querySelector(".memola-prop-loading");l&&l.remove(),e.insertAdjacentHTML("beforeend",Go("\u884C\u6570",String(m.dbItems.length))),e.insertAdjacentHTML("beforeend",Go("\u5217\u6570",String(m.dbFields.length))),e.insertAdjacentHTML("beforeend",'<div class="memola-prop-add" id="memola-prop-add">\uFF0B \u30D7\u30ED\u30D1\u30C6\u30A3\u8FFD\u52A0</div>'),e.querySelector("#memola-prop-add")?.addEventListener("click",()=>{document.getElementById("memola-col-md")?.classList.add("on")})}e.insertAdjacentHTML("beforeend",'<div class="memola-prop-sep"></div>'),e.insertAdjacentHTML("beforeend",'<div class="memola-prop-section">\u30D0\u30C3\u30AF\u30EA\u30F3\u30AF</div>');let i=document.createElement("div");i.className="memola-prop-empty",i.textContent="\u8AAD\u307F\u8FBC\u307F\u4E2D...",e.appendChild(i);let s=t;bs(t,l=>A(l)?.title||null).then(l=>{if(m.currentId===s){if(i.remove(),l.length===0){e.insertAdjacentHTML("beforeend",'<div class="memola-prop-empty">\u53C2\u7167\u3057\u3066\u3044\u308B\u30DA\u30FC\u30B8\u306F\u3042\u308A\u307E\u305B\u3093</div>');return}for(let c of l){let d=document.createElement("div");d.className="memola-prop-backlink",d.dataset.pid=c.pageId,d.innerHTML='<div class="memola-prop-backlink-title">\u2192 '+M(c.pageTitle)+"</div>"+(c.snippet?'<div class="memola-prop-backlink-snippet">'+M(c.snippet)+"</div>":""),e.appendChild(d)}}}).catch(()=>{m.currentId===s&&(i.textContent="\u30D0\u30C3\u30AF\u30EA\u30F3\u30AF\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F")})}var _i=L(()=>{"use strict";j();me();_e();W();vs();Xt();Re();ve();we()});var Ol={};q(Ol,{attachScopeTag:()=>Yg,confirmScopeChangeLinks:()=>p0,syncScopeTag:()=>m0,toggleCurrentPageScope:()=>Um});function d0(){if(!m.currentId)return null;let e=A(m.currentId);return e?e.scope==="org"?"org":"user":null}function m0(){let e=document.getElementById(c0);if(!e)return;if(!(!!m.currentId&&(m.currentType==="page"||m.currentType==="database")&&!m.currentRow)){e.style.display="none";return}let o=m.currentId?A(m.currentId):null;if(!o||o.trashed){e.style.display="none";return}if(o.originPageId){e.style.display="none";return}if(o.type==="database"&&o.list==="memola-daily"){e.style.display="none";return}let n=d0()||"user",r=e.querySelector(".memola-scope-tag-ic"),a=e.querySelector(".memola-scope-tag-label");e.classList.toggle("org",n==="org"),e.classList.toggle("user",n==="user"),r&&(r.textContent=n==="org"?"\u{1F310}":"\u{1F512}"),a&&(a.textContent=n==="org"?"\u7D44\u7E54":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8"),e.title=n==="org"?"\u3053\u306E\u30DA\u30FC\u30B8\u306F\u7D44\u7E54\u306B\u516C\u958B\u3055\u308C\u3066\u3044\u307E\u3059 \u2014 \u30AF\u30EA\u30C3\u30AF\u3067\u500B\u4EBA (\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8) \u306B\u5207\u66FF":"\u3053\u306E\u30DA\u30FC\u30B8\u306F\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u3067\u3059 \u2014 \u30AF\u30EA\u30C3\u30AF\u3067\u7D44\u7E54\u306B\u516C\u958B",e.style.display="";let i=document.querySelector(".memola-pgm-scope-label"),s=document.querySelector(".memola-pgm-scope-ic");i&&(i.textContent=n==="org"?"\u500B\u4EBA\u306B\u623B\u3059":"\u7D44\u7E54\u306B\u516C\u958B"),s&&(s.textContent=n==="org"?"\u{1F310}":"\u{1F512}")}async function Um(){let e=m.currentId;if(!e)return;let t=A(e);if(!t)return;let n=(d0()||"user")==="org"?"user":"org",r=t.type==="database",a=r?"DB":"\u30DA\u30FC\u30B8",i=r?0:gs(m.pages,e),s="\u300C"+(t.title||"\u7121\u984C")+"\u300D("+a+") \u3092"+(n==="org"?"\u7D44\u7E54\u306B\u516C\u958B":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8 (\u500B\u4EBA) \u306B\u5909\u66F4")+`\u3057\u307E\u3059\u3002
`+(i>0?"\u914D\u4E0B\u306E "+i+` \u30DA\u30FC\u30B8\u3082\u540C\u3058\u5206\u985E\u306B\u5207\u308A\u66FF\u308F\u308A\u307E\u3059\u3002
`:"")+a+"\u306F "+(n==="org"?"\u300C\u{1F310} \u7D44\u7E54\u300D":"\u300C\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u300D")+` \u30BB\u30AF\u30B7\u30E7\u30F3\u306E\u5148\u982D\u306B\u79FB\u52D5\u3057\u307E\u3059\u3002

\u3088\u308D\u3057\u3044\u3067\u3059\u304B?`;if(confirm(s)&&await p0(e,n))try{let{rootId:l}=await Ka(e,n);t.parent&&await Ar(l,"");let c=m.pages.filter(u=>(u.ParentId||"")==="").map(u=>u.Id),d=[l,...c.filter(u=>u!==l)];Da("",d);let{renderTree:p}=await Promise.resolve().then(()=>(_e(),wo));if(p(),l!==e||m.currentId===e){let{doSelect:u}=await Promise.resolve().then(()=>(K(),ie));await u(l)}m0(),k(n==="org"?"\u7D44\u7E54\u306B\u516C\u958B\u3057\u307E\u3057\u305F":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u306B\u623B\u3057\u307E\u3057\u305F")}catch(l){k("\u30B9\u30B3\u30FC\u30D7\u5909\u66F4\u306B\u5931\u6557: "+l.message,"err")}}async function p0(e,t){let o=await jC(e,t);return!(o&&!window.confirm(o))}async function jC(e,t){try{if(t==="org"){let{collectDescendantIds:a}=await Promise.resolve().then(()=>(wr(),Ob)),i=new Set(a(m.pages,e)),{findOutgoingPrivateLinks:s}=await Promise.resolve().then(()=>(W(),qe)),l=await s(e,i);return l.length===0?"":`\u26A0 \u3053\u306E\u30DA\u30FC\u30B8\u306F\u6B21\u306E\u300C\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u300D\u30DA\u30FC\u30B8\u306B\u30EA\u30F3\u30AF\u3057\u3066\u3044\u307E\u3059:

`+(l.slice(0,8).map(d=>"\u30FB"+d).join(`
`)+(l.length>8?`
\u2026\u4ED6 ${l.length-8} \u4EF6`:""))+`

\u7D44\u7E54\u306B\u516C\u958B\u3059\u308B\u3068\u3001\u3053\u308C\u3089\u306E\u30EA\u30F3\u30AF\u306F\u4ED6\u306E\u30E1\u30F3\u30D0\u30FC\u306B\u306F\u7121\u52B9(\u958B\u3051\u306A\u3044)\u306B\u306A\u308A\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B?`}let{getBacklinksFor:o}=await Promise.resolve().then(()=>(vs(),jb)),n=await o(e,a=>A(a)?.title||null);return n.length===0?"":`\u26A0 \u6B21\u306E\u30DA\u30FC\u30B8\u304C\u3053\u306E\u30DA\u30FC\u30B8\u306B\u30EA\u30F3\u30AF\u3057\u3066\u3044\u307E\u3059:

`+(n.slice(0,8).map(a=>"\u30FB"+a.pageTitle).join(`
`)+(n.length>8?`
\u2026\u4ED6 ${n.length-8} \u4EF6`:""))+`

\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u306B\u5909\u66F4\u3059\u308B\u3068\u3001\u3053\u308C\u3089\u306E\u30EA\u30F3\u30AF\u306F\u4ED6\u306E\u30E1\u30F3\u30D0\u30FC\u306B\u306F\u7121\u52B9(\u958B\u3051\u306A\u3044)\u306B\u306A\u308A\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B?`}catch{return""}}function Yg(){let e=document.getElementById(c0);e&&e.addEventListener("click",t=>{t.stopPropagation(),Um()})}var c0,sa=L(()=>{"use strict";j();W();wr();le();we();c0="memola-scope-tag"});function kn(){Promise.resolve().then(()=>(sa(),Ol)).then(r=>r.syncScopeTag());let e=document.getElementById("memola-pub-tag");if(!e)return;let t=e.querySelector(".memola-pub-tag-label"),n=!!m.currentId&&m.currentType==="page"&&!m.currentRow&&m.currentId?A(m.currentId):null;if(!n?.published){e.style.display="none",zm();return}e.style.display="",n.publishedDirty?(e.classList.add("dirty"),t&&(t.textContent="\u516C\u958B\u4E2D\u30FB\u672A\u53CD\u6620"),e.title="Memola \u5074\u306B\u672A\u53CD\u6620\u306E\u66F4\u65B0\u304C\u3042\u308A\u307E\u3059 \u2014 \u30AF\u30EA\u30C3\u30AF\u3067\u64CD\u4F5C\u30E1\u30CB\u30E5\u30FC"):(e.classList.remove("dirty"),t&&(t.textContent="\u516C\u958B\u4E2D"),e.title="\u516C\u958B\u30DA\u30FC\u30B8\u3068\u540C\u671F\u3057\u3066\u3044\u307E\u3059 \u2014 \u30AF\u30EA\u30C3\u30AF\u3067\u64CD\u4F5C\u30E1\u30CB\u30E5\u30FC")}function qC(){let e=document.getElementById("memola-pub-pop"),t=document.getElementById("memola-pub-tag");if(!e||!t||!m.currentId)return;let o=A(m.currentId);if(!o?.published)return;let n=e.querySelector(".memola-pub-pop-msg");n&&(n.textContent=o.publishedDirty?"Memola \u306E\u6700\u65B0\u5185\u5BB9\u304C\u516C\u958B\u30DA\u30FC\u30B8\u306B\u53CD\u6620\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002":"\u516C\u958B\u30DA\u30FC\u30B8\u306F\u6700\u65B0\u306E\u5185\u5BB9\u3068\u540C\u671F\u3057\u3066\u3044\u307E\u3059\u3002");let r=t.getBoundingClientRect();e.style.top=r.bottom+6+"px",e.style.right=window.innerWidth-r.right+"px",e.style.display="",Ri||(Ri=a=>{let i=a.target;i&&(e.contains(i)||t.contains(i)||zm())},document.addEventListener("mousedown",Ri,!0))}function zm(){let e=document.getElementById("memola-pub-pop");e&&(e.style.display="none"),Ri&&(document.removeEventListener("mousedown",Ri,!0),Ri=null)}async function $C(){let e=m.currentId;if(!e||!A(e)?.published)return;let{flushPendingSave:o}=await Promise.resolve().then(()=>(ht(),Jr));await o();let n=document.getElementById("memola-pub-tag"),a=(I("ttl")?.value||"").trim()||"\u7121\u984C",{getBlocks:i}=await Promise.resolve().then(()=>(bt(),zo)),{blocksToMd:s}=await Promise.resolve().then(()=>(St(),Hp)),l=s(i()),c=n?.querySelector(".memola-pub-tag-label"),d=c?.textContent||"";n&&n.classList.add("busy"),c&&(c.textContent="\u540C\u671F\u4E2D\u2026");try{await(await Promise.resolve().then(()=>(Mr(),Sr))).syncPublishedPage(e,a,l),k("\u516C\u958B\u30DA\u30FC\u30B8\u3092\u540C\u671F\u3057\u307E\u3057\u305F")}catch(p){k("\u540C\u671F\u5931\u6557: "+p.message,"err"),c&&d&&(c.textContent=d)}finally{n&&n.classList.remove("busy"),kn()}}function KC(){let e=m.currentId;if(!e)return;let o=A(e)?.publishedUrl||"";if(!o){k("URL \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}window.open(o,"_blank","noopener")}async function WC(){let e=m.currentId;if(!e)return;let o=A(e)?.publishedUrl||"";if(!o){k("URL \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}try{await navigator.clipboard.writeText(o),k("URL \u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")}catch{k("\u30B3\u30D4\u30FC\u5931\u6557","err")}}async function GC(){let e=m.currentId;if(e&&confirm("Web \u516C\u958B\u3092\u89E3\u9664\u3057\u307E\u3059\u3002SP \u4E0A\u306E\u516C\u958B\u30DA\u30FC\u30B8\uFF08Site Page\uFF09\u3082\u524A\u9664\u3055\u308C\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F"))try{await(await Promise.resolve().then(()=>(Mr(),Sr))).unpublishPage(e),k("\u516C\u958B\u3092\u89E3\u9664\u3057\u307E\u3057\u305F")}catch(t){k("\u89E3\u9664\u5931\u6557: "+t.message,"err")}finally{kn()}}function u0(){let e=document.getElementById("memola-pub-tag"),t=document.getElementById("memola-pub-pop");!e||!t||(e.addEventListener("click",o=>{o.stopPropagation(),t.style.display==="none"?qC():zm()}),t.addEventListener("click",async o=>{let n=o.target.closest("[data-pub-act]");if(!n)return;let r=n.dataset.pubAct;zm(),r==="sync"?await $C():r==="open"?KC():r==="copy"?await WC():r==="unpublish"&&await GC()}))}var Ri,jm=L(()=>{"use strict";j();me();le();we();Ri=null});async function f0(){return Ni||(Ni=Ot({title:rr,fields:[{name:"PageId",kind:2},{name:"UserName",kind:2},{name:"LastSeen",kind:4}]}).then(()=>{}).catch(e=>{throw Ni=null,e}),Ni)}function h0(){Ni=null,no=null,qm=null,nr=null}async function b0(e){if(await f0(),Hl||(Hl=await Cn().catch(()=>"")),!Hl)return;if(nr)try{await nr}catch{}qm=e;let t=new Date().toISOString();if(no)await je(rr,no,{PageId:e,UserName:Hl,LastSeen:t}).catch(()=>{});else{nr=(async()=>{try{no=(await Ne(rr,{Title:g0,PageId:e,UserName:Hl,LastSeen:t})).Id}catch{}})();try{await nr}finally{nr=null}}}async function $m(){if(!(!qm||!no))try{await je(rr,no,{LastSeen:new Date().toISOString()})}catch{}}async function Jg(){if(nr)try{await nr}catch{}if(!no)return;let e=no;no=null,qm=null;try{await Ke(rr,e)}catch{}}async function v0(e){await f0();let t=await Ee(rr),o=Date.now()-VC,n=[];for(let r of t){if(r.PageId!==e)continue;let a=r.LastSeen?new Date(r.LastSeen).getTime():0;!a||a<o||n.push({userName:r.UserName||"",sessionId:r.Title||"",lastSeen:a,isSelf:r.Title===g0})}return n}function y0(){window.addEventListener("beforeunload",e=>{if(Promise.resolve().then(()=>(gt(),Xa)).then(({saver:t})=>{t.isDirty()&&(e.preventDefault(),e.returnValue="")}).catch(()=>{}),no){try{navigator.sendBeacon?.(J(rr,"/items("+no+")"))}catch{}try{fetch(J(rr,"/items("+no+")"),{method:"POST",headers:{"X-HTTP-Method":"DELETE","IF-MATCH":"*"},credentials:"include",keepalive:!0}).catch(()=>{})}catch{}}})}var rr,Xg,VC,Ni,g0,no,qm,Hl,nr,Zg=L(()=>{"use strict";De();Tt();Xt();rr="memola-presence",Xg=3e4,VC=9e4,Ni=null;g0="sess-"+Math.random().toString(36).slice(2,12)+"-"+Date.now(),no=null,qm=null,Hl="",nr=null});var oh={};q(oh,{attachPresence:()=>th,setPresencePage:()=>eh,shutdownPresence:()=>JC,syncPresenceForCurrent:()=>Wm});function x0(){return hr.get()!=="0"}function YC(e){if(!e)return"?";let t=e.split(/\s+/).filter(Boolean);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():e.slice(0,1)}function XC(e){let t=0;for(let o=0;o<e.length;o++)t=t*31+e.charCodeAt(o)>>>0;return`hsl(${t%360}, 55%, 55%)`}function Qg(e){let t=document.getElementById("memola-presence");if(!t)return;let o=e.filter(i=>!i.isSelf);if(o.length===0){t.style.display="none";return}t.style.display="";let r=o.slice(0,5),a=o.length-r.length;t.innerHTML=r.map(i=>'<span class="memola-presence-av" style="background:'+XC(i.userName)+'" title="'+M(i.userName)+' \u304C\u95B2\u89A7\u4E2D">'+M(YC(i.userName))+"</span>").join("")+(a>0?'<span class="memola-presence-more" title="\u4ED6 '+a+' \u540D">+'+a+"</span>":"")}async function Km(){if(ar)try{let e=await v0(ar);Qg(e)}catch{}}async function eh(e){if(ar!==e){if(ar&&Jg(),ar=e,ro&&(clearInterval(ro),ro=null),!e){Qg([]);return}if(!x0()){Qg([]);return}try{await b0(e),await Km(),ro=setInterval(()=>{$m(),Km()},Xg)}catch{}}}function th(){let e=document.body;e.dataset.memolaPresenceWired!=="1"&&(e.dataset.memolaPresenceWired="1",y0(),document.addEventListener("visibilitychange",()=>{document.hidden&&ar?ro&&(clearInterval(ro),ro=null):!document.hidden&&ar&&!ro&&x0()&&($m(),Km(),ro=setInterval(()=>{$m(),Km()},Xg))}))}function JC(){ro&&(clearInterval(ro),ro=null),ar=null,Jg()}function Wm(){m.currentType==="page"&&m.currentId&&!m.currentRow?eh(m.currentId):eh(null)}var ro,ar,Fl=L(()=>{"use strict";j();Zg();Re();ve();ro=null,ar=null});var Gm={};q(Gm,{attachFilterPopoverOutsideClick:()=>tA,passesFilters:()=>oA,renderFilterChips:()=>nh,showFilterPopover:()=>QC});function Oi(e){return document.getElementById(e)}function nh(){let e=Oi("memola-filter-chips");e&&(e.innerHTML="",m.dbFilters.forEach((t,o)=>{let n=m.dbFields.find(s=>s.InternalName===t.field);if(!n)return;let r=document.createElement("div");r.className="memola-flt-chip";let a=document.createElement("span");a.className="memola-flt-chip-label",a.textContent=n.Title,r.appendChild(a),r.appendChild(ZC(n,t,o));let i=document.createElement("button");i.className="memola-flt-chip-x",i.title="\u524A\u9664",i.textContent="\xD7",i.addEventListener("click",()=>{m.dbFilters.splice(o,1),nh(),Fe()}),r.appendChild(i),e.appendChild(r)}))}function ZC(e,t,o){if(e.FieldTypeKind===6&&e.Choices){let r=document.createElement("select");r.className="memola-flt-chip-val";let a=document.createElement("option");return a.value="",a.textContent="\u2014",r.appendChild(a),e.Choices.forEach(i=>{let s=document.createElement("option");s.value=i,s.textContent=i,t.value===i&&(s.selected=!0),r.appendChild(s)}),r.addEventListener("change",()=>{m.dbFilters[o].op="equals",m.dbFilters[o].value=r.value,Fe()}),r}if(e.FieldTypeKind===8){let r=document.createElement("select");return r.className="memola-flt-chip-val",[["","\u2014"],["true","\u30C1\u30A7\u30C3\u30AF\u6E08\u307F"],["false","\u672A\u30C1\u30A7\u30C3\u30AF"]].forEach(([a,i])=>{let s=document.createElement("option");s.value=a,s.textContent=i,t.value===a&&(s.selected=!0),r.appendChild(s)}),r.addEventListener("change",()=>{m.dbFilters[o].op="equals",m.dbFilters[o].value=r.value,Fe()}),r}let n=document.createElement("input");return n.type="text",n.className="memola-flt-chip-val",n.placeholder="\u5024\u2026",n.value=t.value||"",n.addEventListener("input",()=>{m.dbFilters[o].op="contains",m.dbFilters[o].value=n.value,Fe()}),n.addEventListener("keydown",r=>{r.key==="Escape"&&n.blur()}),n}function QC(){let e=Oi("memola-filter-popover"),t=Oi("memola-db-filter-btn");if(!e||!t)return;let o=e;if(o.classList.contains("on")){o.classList.remove("on");return}o.innerHTML="";let n=document.createElement("div");n.className="memola-flt-pop-inpwrap";let r=document.createElement("input");r.type="text",r.className="memola-flt-pop-inp",r.placeholder="\u30D5\u30A3\u30EB\u30BF\u30FC\u5BFE\u8C61\u2026",n.appendChild(r),o.appendChild(n);let a=document.createElement("div");a.className="memola-flt-pop-list",o.appendChild(a);function i(l){a.innerHTML="";let c=new Set(m.dbFilters.map(u=>u.field)),d=l.toLowerCase(),p=m.dbFields.filter(u=>!c.has(u.InternalName)).filter(u=>!d||u.Title.toLowerCase().includes(d));if(p.length===0){let u=document.createElement("div");u.className="memola-flt-pop-empty",u.textContent=c.size===m.dbFields.length?"\u5168\u9805\u76EE\u306B\u65E2\u306B\u6761\u4EF6\u304C\u8A2D\u5B9A\u6E08\u307F":"\u4E00\u81F4\u3059\u308B\u9805\u76EE\u306A\u3057",a.appendChild(u);return}p.forEach(u=>{let f=document.createElement("div");f.className="memola-flt-pop-item";let g=document.createElement("span");g.className="memola-flt-pop-ic",g.textContent=eA(u.FieldTypeKind);let y=document.createElement("span");y.textContent=u.Title,f.append(g,y),f.addEventListener("click",()=>{m.dbFilters.push({field:u.InternalName,op:"contains",value:""}),o.classList.remove("on"),nh(),Fe(),setTimeout(()=>{let h=Oi("memola-filter-chips")?.querySelectorAll(".memola-flt-chip-val");h&&h.length>0&&h[h.length-1].focus()},50)}),a.appendChild(f)})}r.addEventListener("input",()=>i(r.value));let s=t.getBoundingClientRect();o.style.left=s.left+"px",o.style.top=s.bottom+6+"px",o.classList.add("on"),i(""),setTimeout(()=>r.focus(),30)}function eA(e){switch(e){case 2:return"Aa";case 3:return"\xB6";case 4:return"\u{1F4C5}";case 6:return"\u25C9";case 8:return"\u2610";case 9:return"#";default:return"\xB7"}}function tA(){document.addEventListener("click",e=>{let t=Oi("memola-filter-popover"),o=Oi("memola-db-filter-btn");if(!t||!t.classList.contains("on"))return;let n=e.target;t&&t.contains(n)||o&&o.contains(n)||t.classList.remove("on")})}function oA(e){for(let t of m.dbFilters){if(!t.value&&t.op!=="empty"&&t.op!=="not_empty")continue;let o=e[t.field],n=o==null?"":String(o);switch(t.op){case"equals":if(t.value==="true"||t.value==="false"){if(n==="true"!=(t.value==="true"))return!1}else if(n!==t.value)return!1;break;case"not_empty":if(!n)return!1;break;case"empty":if(n)return!1;break;case"contains":default:if(!n.toLowerCase().includes(t.value.toLowerCase()))return!1}}return!0}var Vm=L(()=>{"use strict";j();K()});var I0={};q(I0,{closeColumnMenu:()=>Ym,openColumnMenu:()=>nA});function Ym(){Hi&&(Hi.remove(),Hi=null),Fi&&(document.removeEventListener("mousedown",Fi,!0),Fi=null)}async function w0(){(await Promise.resolve().then(()=>(Ul(),T0))).renderDbTable()}async function k0(){let e=m.pages.find(o=>o.Id===m.currentId);if(!e)return;await(await Promise.resolve().then(()=>(K(),ie))).doSelectDb(m.currentId,e)}function nA(e,t,o){Ym();let n=document.getElementById("memola-overlay");if(!n)return;let r=document.createElement("div");r.className="memola-colmenu",r.style.left=Math.round(t)+"px",r.style.top=Math.round(o)+"px";let a=(l,c,d={})=>{let p=document.createElement("div");return p.className="memola-colmenu-item"+(d.danger?" danger":""),p.textContent=l,p.addEventListener("click",()=>{Ym(),c()}),p},i=()=>{let l=document.createElement("div");return l.className="memola-colmenu-sep",l};r.append(a("\u2191 \u6607\u9806\u3067\u4E26\u3079\u66FF\u3048",()=>{m.dbSort.field=e.InternalName,m.dbSort.asc=!0,w0()}),a("\u2193 \u964D\u9806\u3067\u4E26\u3079\u66FF\u3048",()=>{m.dbSort.field=e.InternalName,m.dbSort.asc=!1,w0()}),a("\u30D5\u30A3\u30EB\u30BF\u30FC",()=>{Promise.resolve().then(()=>(Vm(),Gm)).then(l=>l.showFilterPopover())})),e.FieldTypeKind===6&&r.append(a("\uFF0B \u9078\u629E\u9805\u76EE\u3092\u8FFD\u52A0",()=>{let l=(prompt("\u8FFD\u52A0\u3059\u308B\u9078\u629E\u80A2\u3092\u5165\u529B")||"").trim();if(!l)return;let c=[...e.Choices||[]];if(c.includes(l)){k("\u540C\u3058\u9078\u629E\u80A2\u304C\u65E2\u306B\u3042\u308A\u307E\u3059");return}c.push(l),(async()=>{try{_(!0,"\u9078\u629E\u80A2\u3092\u8FFD\u52A0\u4E2D...");let{updateListFieldChoices:d}=await Promise.resolve().then(()=>(De(),mo));await d(m.dbList,e.InternalName,c),await k0(),k("\u9078\u629E\u80A2\u3092\u8FFD\u52A0\u3057\u307E\u3057\u305F","ok")}catch(d){k("\u9078\u629E\u80A2\u306E\u8FFD\u52A0\u306B\u5931\u6557: "+d.message,"err")}finally{_(!1)}})()})),r.append(i(),a("\u{1F5D1} \u5217\u3092\u524A\u9664",()=>{confirm(`\u5217\u300C${e.Title}\u300D\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F(\u3053\u306E\u5217\u306E\u5024\u3082\u5931\u308F\u308C\u307E\u3059)`)&&(async()=>{try{_(!0,"\u5217\u3092\u524A\u9664\u4E2D...");let{deleteListField:l}=await Promise.resolve().then(()=>(De(),mo));await l(m.dbList,e.InternalName),await k0(),k("\u5217\u3092\u524A\u9664\u3057\u307E\u3057\u305F","ok")}catch(l){k("\u5217\u306E\u524A\u9664\u306B\u5931\u6557: "+l.message,"err")}finally{_(!1)}})()},{danger:!0})),n.appendChild(r);let s=r.getBoundingClientRect();s.right>window.innerWidth-8&&(r.style.left=Math.max(8,window.innerWidth-s.width-8)+"px"),s.bottom>window.innerHeight-8&&(r.style.top=Math.max(8,o-s.height)+"px"),Fi=l=>{Hi&&!Hi.contains(l.target)&&Ym()},setTimeout(()=>{Fi&&document.addEventListener("mousedown",Fi,!0)},0),Hi=r}var Hi,Fi,E0=L(()=>{"use strict";j();le();Hi=null,Fi=null});var T0={};q(T0,{getDbFields:()=>zi,getSortedFilteredItems:()=>jt,isManualRowOrderActive:()=>pn,mkDbRow:()=>ji,mkOpenRowBtn:()=>vo,renderDbTable:()=>Fe,reorderRows:()=>Hn,setSelectionAnchor:()=>zl});function zi(){let e=m.dbFields.filter(t=>[2,3,4,6,8,9].indexOf(t.FieldTypeKind)>=0);return ju(e,m.dbList)}function jt(){let e=m.dbItems.slice();if(m.dbFilters.length>0&&(e=e.filter(t=>{for(let o of m.dbFilters){if(!o.value&&o.op!=="empty"&&o.op!=="not_empty")continue;let n=t[o.field],r=n==null?"":String(n);if(o.op==="equals"){if(r!==o.value)return!1}else if(o.op==="not_empty"){if(!r)return!1}else if(o.op==="empty"){if(r)return!1}else if(!r.toLowerCase().includes(o.value.toLowerCase()))return!1}return!0})),m.dbSort.field){let t=m.dbSort.field,o=m.dbSort.asc;e.sort((n,r)=>{let a=n[t]!=null?String(n[t]):"",i=r[t]!=null?String(r[t]):"";return a<i?o?-1:1:a>i?o?1:-1:0})}else e=dd(e,m.dbList);return e}function pn(){return m.dbSort.field==null}function Hn(e,t,o){let n=(Array.isArray(e)?e:[e]).filter(l=>l!==t);if(n.length===0)return;let r=cd(m.dbList)||[],a=dd(m.dbItems.slice(),m.dbList).map(l=>l.Id),i=n.slice().sort((l,c)=>a.indexOf(l)-a.indexOf(c));for(let l of i){let c=a.indexOf(l);c>=0&&a.splice(c,1)}let s=a.indexOf(t);s<0&&(s=a.length),o&&(s+=1),a.splice(s,0,...i),qu(m.dbList,a),Qu(m.dbList,r,a),Fe(),Promise.resolve().then(()=>(ud(),pd)).then(l=>{I("list-view").classList.contains("on")&&l.renderListView(),I("gallery-view").classList.contains("on")&&l.renderGalleryView(),I("calendar-view").classList.contains("on")&&l.renderCalendarView(),I("gantt-view").classList.contains("on")&&l.renderGanttView()})}function zl(e){Ui=e}function Fe(){let e=I("dth-row"),t=I("dtb");e.innerHTML="",t.innerHTML="";let o=zi();rh=sy(m.dbList),dy(m.dbList,m.dbItems.map(u=>u.Id)),I("dt").classList.toggle("memola-has-sel",m.dbSelected.size>0),On();let r=document.createElement("th");r.className="memola-th-cb";let a=document.createElement("input");a.type="checkbox",a.className="memola-cb";let s=jt().map(u=>u.Id),l=s.filter(u=>m.dbSelected.has(u)).length;l===0?a.checked=!1:l===s.length?a.checked=!0:a.indeterminate=!0,a.addEventListener("change",()=>{a.checked?s.forEach(u=>m.dbSelected.add(u)):s.forEach(u=>m.dbSelected.delete(u)),Fe()}),r.appendChild(a),e.appendChild(r),o.forEach((u,f)=>{let g=document.createElement("th"),y=m.dbSort.field===u.InternalName,b=document.createElement("span");b.className="memola-th-label",b.innerHTML=u.Title+(y?'<span class="sort-arrow">'+(m.dbSort.asc?"\u25B2":"\u25BC")+"</span>":""),g.appendChild(b),g.dataset.field=u.InternalName,g.dataset.colIdx=String(f),g.draggable=!0;let h=m.dbColumnWidths[u.InternalName];h&&(g.style.width=h+"px"),b.addEventListener("click",x=>{x.stopPropagation();let w=b.getBoundingClientRect();Promise.resolve().then(()=>(E0(),I0)).then(T=>T.openColumnMenu(u,w.left,w.bottom+4))}),g.addEventListener("dragstart",x=>{x.dataTransfer&&(x.dataTransfer.effectAllowed="move",x.dataTransfer.setData("text/memola-col",String(f)),g.classList.add("memola-th-dragging"))}),g.addEventListener("dragend",()=>g.classList.remove("memola-th-dragging")),g.addEventListener("dragover",x=>{let w=x.dataTransfer;if(!w||Array.from(w.types).indexOf("text/memola-col")<0)return;x.preventDefault(),w.dropEffect="move";let T=g.getBoundingClientRect(),E=x.clientX>T.left+T.width/2;g.classList.toggle("memola-th-drop-before",!E),g.classList.toggle("memola-th-drop-after",E)}),g.addEventListener("dragleave",()=>{g.classList.remove("memola-th-drop-before","memola-th-drop-after")}),g.addEventListener("drop",x=>{let w=x.dataTransfer;if(!w)return;let T=w.getData("text/memola-col");if(!T)return;x.preventDefault();let E=parseInt(T,10),B=g.getBoundingClientRect(),P=x.clientX>B.left+B.width/2?f+1:f;g.classList.remove("memola-th-drop-before","memola-th-drop-after");let O=ld(m.dbList)||[],H=Wu(o,E,P).map(X=>X.InternalName);zu(m.dbList,H),tf(m.dbList,O,H),Fe()});let v=document.createElement("div");v.className="memola-col-resize",v.addEventListener("mousedown",x=>{x.preventDefault(),x.stopPropagation();let w=x.clientX,T=g.offsetWidth;document.body.style.cursor="col-resize",document.body.style.userSelect="none";function E(U){let P=Math.max(60,T+U.clientX-w);g.style.width=P+"px",m.dbColumnWidths[u.InternalName]=P}function B(){document.body.style.cursor="",document.body.style.userSelect="",document.removeEventListener("mousemove",E),document.removeEventListener("mouseup",B)}document.addEventListener("mousemove",E),document.addEventListener("mouseup",B)}),g.appendChild(v),e.appendChild(g)});let c=document.createElement("th");c.className="memola-th-del",e.appendChild(c);let d=document.createElement("th");d.className="memola-th-add",d.textContent="+",d.title="\u5217\u3092\u8FFD\u52A0",d.addEventListener("click",()=>{I("col-name").value="";let u=document.querySelectorAll("#memola-col-type-grid .memola-col-type");u[0]&&u[0].click();let f=document.getElementById("memola-col-choices");f&&(f.value=""),I("col-choices-row").classList.remove("on");let g=document.getElementById("memola-col-spmap");g&&(g.value=""),I("col-md").classList.add("on"),I("col-name").focus()}),e.appendChild(d);let p=document.createElement("th");p.className="memola-th-spacer",e.appendChild(p),jt().forEach(u=>{t.appendChild(ji(u,o))})}function vo(e){let t=document.createElement("button");return t.className="memola-row-open",t.title="\u884C\u3092\u958B\u304F\uFF08\u30DA\u30FC\u30B8\u8868\u793A\uFF09",t.textContent="\u2197",t.addEventListener("click",o=>{o.stopPropagation(),Promise.resolve().then(()=>(Ho(),Oo)).then(n=>n.openRowAsPage(m.currentId||"",e))}),t}function ji(e,t){let o=document.createElement("tr");o.dataset.id=String(e.Id),o.addEventListener("mousedown",c=>{if(!c.shiftKey)return;let d=c.target;if(!d||d.closest(".memola-cb")||d.closest(".memola-row-open")||d.closest(".memola-del-btn"))return;c.preventDefault(),c.stopPropagation();let p=o.querySelector(".memola-cb");p&&(p.checked=!p.checked,p.dispatchEvent(new Event("change")))},!0);let n=document.createElement("td");n.className="memola-td-cb";let r=rh.rows?.[String(e.Id)];r&&(n.style.background=r);let a=document.createElement("input");a.type="checkbox",a.className="memola-cb",a.checked=m.dbSelected.has(e.Id),a.checked&&o.classList.add("memola-tr-sel"),a.addEventListener("click",c=>{let d=c;if(c.stopPropagation(),d.shiftKey&&Ui!==null&&Ui!==e.Id){c.preventDefault();let p=jt().map(g=>g.Id),u=p.indexOf(Ui),f=p.indexOf(e.Id);if(u>=0&&f>=0){let[g,y]=u<f?[u,f]:[f,u],b=!a.checked;for(let h=g;h<=y;h++)b?m.dbSelected.add(p[h]):m.dbSelected.delete(p[h]);Ui=e.Id,Fe()}}}),a.addEventListener("change",()=>{a.checked?m.dbSelected.add(e.Id):m.dbSelected.delete(e.Id),Ui=e.Id,o.classList.toggle("memola-tr-sel",a.checked),I("dt").classList.toggle("memola-has-sel",m.dbSelected.size>0),On();let c=document.querySelector(".memola-th-cb .memola-cb");if(c){let d=jt().map(u=>u.Id),p=d.filter(u=>m.dbSelected.has(u)).length;c.indeterminate=p>0&&p<d.length,c.checked=p>0&&p===d.length}}),n.appendChild(a),o.appendChild(n),t.forEach(c=>{let d=document.createElement("td"),p=cy(rh,e.Id,c.InternalName);if(p&&(d.style.background=p),c.FieldTypeKind===4){let h=function(){let x=Eo(b);y.innerHTML="";let w=document.createElement("span");w.textContent=x||"\u2014",x||(w.style.color="var(--ink-4)"),y.appendChild(w)},v=function(){y.innerHTML="";let x=document.createElement("span");x.className="memola-dc-date-wrap";let w=document.createElement("input");w.type="text",w.className="memola-dc-date-inp",w.placeholder="YYYY-MM-DD",w.value=Eo(b);let T=document.createElement("input");T.type="date",T.className="memola-dc-date-pick",T.value=Eo(b),T.tabIndex=-1,T.title="\u30AB\u30EC\u30F3\u30C0\u30FC\u304B\u3089\u9078\u629E",x.append(w,T),y.appendChild(x),w.focus(),w.select();let E=!1;function B(){if(!b){h();return}E=!0;let O=b;b="",e[c.InternalName]="",Qe("\u4FDD\u5B58\u4E2D..."),ut(m.dbList,e.Id,{[c.InternalName]:""}).then(()=>{Qe(""),h(),Qt(m.dbList,e.Id,c.InternalName,c.Title,O,"")}).catch(D=>{k(D.message,"err"),b=O,e[c.InternalName]=O,h()})}function U(O){if(O===b){h();return}E=!0;let D=b;b=O,e[c.InternalName]=O,Qe("\u4FDD\u5B58\u4E2D..."),ut(m.dbList,e.Id,{[c.InternalName]:O}).then(()=>{Qe(""),h(),Qt(m.dbList,e.Id,c.InternalName,c.Title,D,O)}).catch(H=>{k(H.message,"err"),b=D,e[c.InternalName]=D,h()})}function P(O){if(E)return;let D=O.trim();if(!D){B();return}let H=Tc(D);if(!H){k("\u65E5\u4ED8\u5F62\u5F0F\u304C\u7121\u52B9\u3067\u3059: "+D,"err"),w.focus();return}U(H)}w.addEventListener("blur",O=>{O.relatedTarget!==T&&P(w.value)}),w.addEventListener("keydown",O=>{O.key==="Enter"&&(O.preventDefault(),P(w.value)),O.key==="Escape"&&h()}),T.addEventListener("change",()=>{T.value?U(T.value):B()})};var u=h,f=v;let y=document.createElement("div");y.className="memola-dc-date";let b=e[c.InternalName]||"";y.addEventListener("click",()=>{y.querySelector("input")||v()}),h(),d.appendChild(y)}else if(c.FieldTypeKind===6&&c.Choices){let x=function(w){if(y.innerHTML="",w){let T=v.indexOf(w)%6,E=document.createElement("span");E.className="memola-select-chip memola-sc-"+T,E.textContent=w,E.style.cursor="pointer",E.addEventListener("click",()=>{y.innerHTML="",y.appendChild(b),b.focus()}),y.appendChild(E)}else y.appendChild(b)};var g=x;let y=document.createElement("div");y.style.padding="4px 12px";let b=document.createElement("select");b.style.cssText="border:none;background:transparent;font-size:14px;font-family:inherit;outline:none;cursor:pointer;max-width:140px;";let h=document.createElement("option");h.value="",h.textContent="\u2014",b.appendChild(h),c.Choices.forEach(w=>{let T=document.createElement("option");T.value=w,T.textContent=w,e[c.InternalName]===w&&(T.selected=!0),b.appendChild(T)});let v=c.Choices;b.addEventListener("change",()=>{let w=b.value,T=e[c.InternalName]||"";if(w===T)return;let E={};E[c.Title||c.InternalName]=w,e[c.InternalName]=w,ut(m.dbList,e.Id,E).then(()=>{x(w),Qt(m.dbList,e.Id,c.InternalName,c.Title,T,w)}).catch(B=>{k(B.message,"err")})}),b.addEventListener("blur",()=>{x(b.value)}),x(e[c.InternalName]||""),d.appendChild(y)}else{let y=c.FieldTypeKind===3,b=document.createElement("span");b.className="memola-dc"+(y?" multi":""),b.contentEditable="true",b.textContent=e[c.InternalName]!=null?String(e[c.InternalName]):"",b.dataset.field=c.InternalName;let h=b.textContent||"";b.addEventListener("focus",()=>{h=b.textContent||""}),b.addEventListener("keydown",v=>{let x=v;if(!(x.isComposing||x.keyCode===229)){if(x.key==="Escape"){b.textContent=h,b.blur();return}x.key==="Enter"&&(y?(x.metaKey||x.ctrlKey)&&(v.preventDefault(),b.blur()):x.shiftKey||(v.preventDefault(),b.blur()))}}),b.addEventListener("blur",()=>{let v=(b.textContent||"").trim(),x=h.trim();if(v===x)return;let w={};w[c.InternalName]=v,e[c.InternalName]=v,h=v,Qe("\u4FDD\u5B58\u4E2D..."),ut(m.dbList,e.Id,w).then(()=>{Qe(""),Qt(m.dbList,e.Id,c.InternalName,c.Title,x,v)}).catch(T=>{k(T.message,"err"),b.textContent=h})}),d.appendChild(b),c.InternalName==="Title"&&(d.style.position="relative",b.style.fontWeight="500",d.appendChild(vo(e)))}o.appendChild(d)});let i=document.createElement("td");i.className="memola-td-del";let s=document.createElement("button");s.className="memola-del-btn",s.title="\u884C\u3092\u524A\u9664",s.textContent="\u{1F5D1}",s.addEventListener("click",()=>{if(!confirm("\u3053\u306E\u884C\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F"))return;_(!0,"\u524A\u9664\u4E2D...");let c=m.dbList;Or(c,e.Id).then(()=>{o.remove(),k("\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u2318Z \u3067\u5FA9\u5143\u53EF\u80FD\uFF09")}).catch(d=>{k("\u524A\u9664\u5931\u6557: "+d.message,"err")}).finally(()=>{_(!1)})}),i.appendChild(s),o.appendChild(i),o.appendChild(document.createElement("td"));let l=document.createElement("td");return l.className="memola-td-spacer",o.appendChild(l),o}var rh,Ui,Ul=L(()=>{"use strict";j();me();le();We();To();qs();_o();$s();Vu();rh={};Ui=null});function $i(){let e=I("kb");e.innerHTML="";let t=m.dbFields.find(n=>n.FieldTypeKind===6&&n.Choices);if(!t||!t.Choices){let n=document.createElement("div");n.style.cssText="padding:40px;color:#9b9a97;font-size:14px;",n.textContent="\u9078\u629E\u80A2\u5217\u3092\u8FFD\u52A0\u3057\u3066\u304F\u3060\u3055\u3044",e.appendChild(n);return}t.Choices.concat(["\u672A\u8A2D\u5B9A"]).forEach(n=>{let r=document.createElement("div");r.className="memola-kb-col",r.dataset.choice=n;let a=document.createElement("div");a.className="memola-kb-col-hd",a.textContent=n,r.appendChild(a),jt().filter(s=>{let l=s[t.InternalName]||"";return n==="\u672A\u8A2D\u5B9A"?!l:l===n}).forEach(s=>{let l=document.createElement("div");l.className="memola-kb-card",m.dbSelected.has(s.Id)&&l.classList.add("memola-card-sel"),l.draggable=!0,l.dataset.id=String(s.Id);let c=document.createElement("span");c.className="memola-kb-card-title",c.textContent=s.Title||"(\u7121\u984C)",l.appendChild(c),l.appendChild(vo(s)),Fn(l,s.Id),Vs(l,s.Id),r.appendChild(l)}),r.addEventListener("dragover",s=>{let l=s.dataTransfer;!l||Array.from(l.types).indexOf("text/memola-kb")<0||(s.preventDefault(),l.dropEffect="move",ah(r,s.clientY))}),r.addEventListener("dragleave",s=>{let l=s.relatedTarget;(!l||!r.contains(l))&&jl()}),r.addEventListener("drop",s=>{let l=s.dataTransfer;if(!l)return;let c=l.getData("text/memola-kb");if(!c)return;s.preventDefault(),jl();let d=parseInt(c,10);if(!m.dbItems.find(b=>b.Id===d))return;let u=m.dbSelected.has(d)?Array.from(m.dbSelected):[d],f=n==="\u672A\u8A2D\u5B9A"?"":n,g=[],y=[];for(let b of u){let h=m.dbItems.find(x=>x.Id===b);if(!h)continue;let v=h[t.InternalName]||"";f!==v&&(h[t.InternalName]=f,y.push(()=>{h[t.InternalName]=v}),g.push(ut(m.dbList,b,{[t.InternalName]:f}).then(()=>Qt(m.dbList,b,t.InternalName,t.Title,v,f))))}g.length!==0&&Promise.all(g).then(()=>requestAnimationFrame(()=>$i())).catch(b=>{y.forEach(h=>h()),k("\u5909\u66F4\u5931\u6557: "+b.message,"err"),requestAnimationFrame(()=>$i())})}),e.appendChild(r)})}function L0(){let e=document.getElementById("memola-overlay")||document.body;if(qi&&e.contains(qi))return qi;let t=document.createElement("div");return t.className="memola-card-drop-line",e.appendChild(t),qi=t,t}function ah(e,t){let o=Array.from(e.querySelectorAll(".memola-kb-card, .memola-gv-card"));if(o.length===0){let s=e.getBoundingClientRect(),l=L0();l.style.top=s.top+36+"px",l.style.left=s.left+8+"px",l.style.width=s.width-16+"px",l.classList.add("on");return}let n=o[0],r=!1;for(let s of o){let l=s.getBoundingClientRect();if(t<l.top+l.height/2){n=s,r=!1;break}n=s,r=!0}let a=n.getBoundingClientRect(),i=L0();i.style.top=(r?a.bottom:a.top)-1+"px",i.style.left=a.left+"px",i.style.width=a.width+"px",i.classList.add("on")}function jl(){qi&&qi.classList.remove("on"),document.querySelectorAll(".memola-card-drop-line").forEach(e=>{e.classList.remove("on")})}function Fn(e,t){e.addEventListener("click",o=>{if(o.target.closest(".memola-row-open"))return;o.shiftKey&&(m.dbSelected.has(t)?m.dbSelected.delete(t):m.dbSelected.add(t),e.classList.toggle("memola-card-sel",m.dbSelected.has(t)),Promise.resolve().then(()=>($s(),md)).then(r=>r.renderBulkBar()))})}function Vs(e,t){e.addEventListener("dragstart",o=>{if(!o.dataTransfer)return;o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/memola-kb",String(t));let n=m.dbSelected.has(t)?Array.from(m.dbSelected):[t];document.querySelectorAll(".memola-kb-card[data-id], .memola-gv-card[data-id]").forEach(r=>{let a=parseInt(r.dataset.id||"0",10);n.indexOf(a)>=0&&r.classList.add("memola-kb-card-dragging")})}),e.addEventListener("dragend",()=>{document.querySelectorAll(".memola-kb-card-dragging").forEach(o=>o.classList.remove("memola-kb-card-dragging")),jl()})}var qi,S0=L(()=>{"use strict";j();me();le();We();_o();Ul();qi=null});var P0={};q(P0,{maybeShowSinceLastView:()=>aA});async function aA(e,t,o){let n=Yo(e),r=n.get();if(n.set(o),!r||r===o)return;let a=await _a(e).catch(()=>"");iA(t,a)}function iA(e,t){let o=document.getElementById(M0);o&&o.remove();let n=document.getElementById("memola-overlay")||document.body,r=document.createElement("div");r.id=M0;let a=new Date(e).toLocaleString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}),i=t?"<b>"+M(t)+"</b>\u3055\u3093":"\u5225\u306E\u8AB0\u304B";r.innerHTML='<span class="memola-since-ic">\u{1F514}</span><span class="memola-since-msg">\u524D\u56DE\u306E\u8868\u793A\u4EE5\u964D\u306B '+i+" \u304C "+M(a)+' \u306B\u66F4\u65B0\u3057\u307E\u3057\u305F</span><button class="memola-since-close" title="\u9589\u3058\u308B">\xD7</button>',n.appendChild(r),requestAnimationFrame(()=>r.classList.add("on"));let s=()=>{r.parentNode&&(r.classList.remove("on"),setTimeout(()=>r.remove(),250))};r.querySelector(".memola-since-close")?.addEventListener("click",s),setTimeout(s,rA)}var M0,rA,C0=L(()=>{"use strict";ve();Xt();Re();M0="memola-since-banner",rA=12e3});var N0={};q(N0,{attachDbRowDrag:()=>pA});function sA(){return ir||(ir=Vd({id:"memola-row-handle",title:"\u30C9\u30E9\u30C3\u30B0\u3057\u3066\u884C\u3092\u4E26\u3079\u66FF\u3048",centred:!0,onDragStart:dA,onDragEnd:$l,onMouseLeave:e=>{let t=e.relatedTarget;t&&sr&&sr.contains(t)||ql()}}),ir)}function ql(){ir&&ir.hide(),sr=null}function D0(e){let t=document.getElementById("memola-dtb");if(!t)return null;let o=Array.from(t.querySelectorAll("tr"));for(let n of o){let r=n.getBoundingClientRect();if(e>=r.top&&e<=r.bottom)return n}return null}function lA(){if(Ki&&document.body.contains(Ki))return Ki;let e=document.createElement("div");return e.className="memola-row-drop-line",document.getElementById("memola-overlay")?.appendChild(e),Ki=e,e}function cA(e,t){let o=lA(),n=e.getBoundingClientRect();o.style.top=(t?n.bottom:n.top)-1+"px",o.style.left=n.left+"px",o.style.width=n.width+"px",o.classList.add("on")}function ih(){Ki&&Ki.classList.remove("on")}function dA(e){if(!sr){e.preventDefault();return}let t=sr.dataset.id;if(!t){e.preventDefault();return}lr=parseInt(t,10),B0=sr,la=m.dbSelected.has(lr)?Array.from(m.dbSelected):[lr],e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/memola-row",t));let o=document.getElementById("memola-dtb");o&&o.querySelectorAll("tr").forEach(n=>{let r=parseInt(n.dataset.id||"0",10);la.indexOf(r)>=0&&n.classList.add("memola-tr-dragging")}),document.addEventListener("dragover",_0),document.addEventListener("drop",R0)}function $l(){let e=document.getElementById("memola-dtb");e&&e.querySelectorAll(".memola-tr-dragging").forEach(t=>{t.classList.remove("memola-tr-dragging")}),lr=null,la=[],B0=null,ih(),document.removeEventListener("dragover",_0),document.removeEventListener("drop",R0)}function _0(e){if(lr===null)return;e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move");let t=D0(e.clientY);if(!t){ih();return}let o=parseInt(t.dataset.id||"0",10);if(la.indexOf(o)>=0){ih();return}let n=t.getBoundingClientRect(),r=e.clientY>n.top+n.height/2;cA(t,r)}function R0(e){if(lr===null){$l();return}e.preventDefault();let t=D0(e.clientY);if(!t){$l();return}let o=parseInt(t.dataset.id||"0",10);if(!o||la.indexOf(o)>=0){$l();return}let n=t.getBoundingClientRect(),r=e.clientY>n.top+n.height/2;Hn(la.length>0?la:[lr],o,r),$l()}function mA(e,t){let o=document.getElementById("memola-dtb");if(!o)return null;let n=Array.from(o.querySelectorAll("tr"));for(let r of n)if(Yd(r,e,t))return r;return null}function pA(){A0||(A0=!0,document.addEventListener("mousemove",e=>{if(lr!==null)return;if(m.currentType!=="database"){ql();return}if(!pn()){ql();return}if(!document.getElementById("memola-dt")){ql();return}if(ir&&ir.isCursorOnHandle(e.clientX,e.clientY))return;let o=mA(e.clientX,e.clientY);o?o!==sr&&(sr=o,sA().positionAt(o)):ql()}))}var ir,sr,lr,la,B0,Ki,A0,O0=L(()=>{"use strict";j();K();Nf();ir=null,sr=null,lr=null,la=[],B0=null;Ki=null;A0=!1});var ie={};q(ie,{attachCardDragHandlers:()=>Vs,attachCardSelectionHandlers:()=>Fn,doSelect:()=>Ue,doSelectDb:()=>F0,getDbFields:()=>zi,getSortedFilteredItems:()=>jt,hideCardDropLine:()=>jl,isManualRowOrderActive:()=>pn,loadLastOpenedPage:()=>fA,mkDbRow:()=>ji,mkOpenRowBtn:()=>vo,renderBcCustom:()=>vl,renderDbTable:()=>Fe,renderKanban:()=>$i,renderPageIcon:()=>Kl,reorderRows:()=>Hn,setSelectionAnchor:()=>zl,showCardDropLine:()=>ah,showView:()=>tt});function tt(e){if(I("ea").style.display=e==="page"||e==="empty"?"flex":"none",I("em").style.display=e==="empty"?"flex":"none",I("ct").style.display=e==="page"?"block":"none",I("tb").style.display=e==="page"?"flex":"none",I("dv").style.display=e==="db"?"flex":"none",I("lib").style.display=e==="library"?"block":"none",e!=="library"){let t=document.getElementById("memola-lib-bulkbar");t&&t.classList.remove("on")}kn(),(e==="empty"||e==="library")&&Jo(null)}function vl(e){let t=I("bc");t.innerHTML="",e.forEach((o,n)=>{let r=document.createElement("span");if(r.className="memola-bi",r.textContent=o.label,o.onClick?r.addEventListener("click",o.onClick):r.style.cursor="default",t.appendChild(r),n<e.length-1){let a=document.createElement("span");a.textContent="/",a.style.color="#e9e9e7",a.style.margin="0 4px",t.appendChild(a)}})}function Kl(e){let t=A(e),o=t&&t.icon||"",n=I("pg-icon"),r=I("add-icon"),a=document.getElementById("memola-pg-hd");o?(n.textContent=o,n.style.display="inline-block",r.style.display="none",a?.classList.remove("no-icon")):(n.style.display="none",r.style.display="",a?.classList.add("no-icon"))}async function Ue(e){if(m.currentType==="page"&&!m.currentRow)try{let{pruneEmptyTodosEditor2:n}=await Promise.resolve().then(()=>(bt(),zo));if(n()>0){let{schedSave:a}=await Promise.resolve().then(()=>(ht(),Jr));a()}}catch{}m.currentType!=="database"&&await yt(),Promise.resolve().then(()=>(bi(),gl)).then(n=>n.hideSearchTab()),m.currentRow=null,m.currentId=e;let t=e,o=m.pages.find(n=>n.Id===e);if(o){if(Promise.resolve().then(()=>(Uo(),bn)).then(n=>n.clearComments()),Promise.resolve().then(()=>(Ug(),Fg)).then(n=>n.clearMergeHighlight()),Uf(e),or(e).forEach(n=>{m.expanded.add(n.Id)}),te(),sh(e),o.Type==="database")await F0(e,o),Promise.resolve().then(()=>(tm(),em)).then(n=>n.renderBacklinks());else{m.currentType="page",Promise.resolve().then(()=>($s(),md)).then(a=>a.hideBulkBar()),tt("page");let n=I("ttl");n.value=o.Title||"",Mn(n),Kl(e);let r=document.getElementById("memola-row-props");r&&(r.innerHTML=""),Jo(null),_(!0,"\u30DA\u30FC\u30B8\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D...");try{let a=await hu(e);if(m.currentId!==t)return;let{mountEditor2:i,loadBlocksFromJson:s}=await Promise.resolve().then(()=>(bt(),zo));if(m.currentId!==t)return;if(i(Ce()),s(a?.body||""),Promise.resolve().then(()=>(mm(),Kw)).then(l=>l.markBrokenPageLinks(Ce())),a){jg(e,a.modified,a.etag);let c=(I("ttl")?.value||o.Title||"\u7121\u984C").trim()||"\u7121\u984C";re.loadPage({pageId:e,body:a.body,title:c,etag:a.etag,modified:a.modified}),Jo(a.modified),Promise.resolve().then(()=>(C0(),P0)).then(d=>d.maybeShowSinceLastView(e,a.modified,a.etag))}else Vn(),re.unload(),Jo(null);aa(),ia()}catch(a){Ce().innerHTML="",k("\u8AAD\u307F\u8FBC\u307F\u5931\u6557: "+a.message,"err"),Vn(),re.unload(),Jo(null)}finally{_(!1)}kn(),Gr(),gA(),H0("page"),Wm(),Promise.resolve().then(()=>(tm(),em)).then(a=>a.renderBacklinks()),Promise.resolve().then(()=>(Uo(),bn)).then(a=>{let i=a.currentCommentTarget();i&&m.currentId===t&&a.loadCommentsFor(i.pageId,i.scope)})}uA(e),Promise.resolve().then(()=>(qt(),eo)).then(n=>n.openInActiveTab(e,o.Title||"\u7121\u984C"))}}function uA(e){let t=ns.get();t[G]=e,ns.set(t)}function fA(){return ns.get()[G]||null}function H0(e){let t=document.getElementById("memola-template-banner"),o=document.getElementById("memola-template-banner-db");t&&(t.style.display="none",t.innerHTML=""),o&&(o.style.display="none",o.innerHTML="");let n=m.currentId?A(m.currentId):null;if(!n?.isTemplate)return;let r=e==="db"?o:t;if(!r)return;let a=n.type==="database"?"DB":"\u30DA\u30FC\u30B8";r.style.display="",r.innerHTML='<span class="memola-template-banner-icon">\u{1F9E9}</span><span class="memola-template-banner-msg">\u3053\u308C\u306F<b>\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8</b>\u306E\u7DE8\u96C6\u753B\u9762\u3067\u3059\u3002\u3053\u3053\u3067\u306E\u5909\u66F4\u306F\u3001\u4ECA\u5F8C\u3053\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u4F5C\u6210\u3059\u308B'+a+"\u306B\u53CD\u6620\u3055\u308C\u307E\u3059\u3002</span>"}function gA(){let e=document.getElementById("memola-draft-banner");if(!e)return;let t=m.currentId?A(m.currentId):null;if(!t?.originPageId){e.style.display="none",e.innerHTML="";return}let o=A(t.originPageId),n=o?.title||"(\u539F\u672C\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093)",r=!!o&&!o.trashed;e.style.display="",e.innerHTML='<span class="memola-draft-banner-icon">\u270F\uFE0F</span><span class="memola-draft-banner-msg">\u539F\u672C: <a class="memola-draft-banner-link" data-origin-id="'+(t.originPageId||"")+'">'+M(n)+"</a> \u306E<b>\u4E0B\u66F8\u304D</b>\u3067\u3059</span>"+(r?'<button class="memola-draft-banner-apply" type="button">\u539F\u672C\u306B\u9069\u7528</button>':'<span class="memola-draft-banner-broken">\u539F\u672C\u304C\u524A\u9664\u3055\u308C\u3066\u3044\u307E\u3059</span><button class="memola-draft-banner-promote" type="button">\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58</button>'),e.querySelector(".memola-draft-banner-link")?.addEventListener("click",a=>{a.preventDefault();let i=a.target.dataset.originId;i&&Ue(i)}),e.querySelector(".memola-draft-banner-apply")?.addEventListener("click",async()=>{if(await(await Promise.resolve().then(()=>(ht(),Jr))).flushPendingSave(),!!confirm("\u4E0B\u66F8\u304D\u306E\u5185\u5BB9\u3092\u539F\u672C\u300C"+n+`\u300D\u306B\u9069\u7528\u3057\u307E\u3059\u3002

\u30FB\u539F\u672C\u304C\u4E0B\u66F8\u304D\u4F5C\u6210\u5F8C\u306B\u5909\u66F4\u3055\u308C\u3066\u3044\u308C\u3070\u81EA\u52D5\u30673-way\u30DE\u30FC\u30B8\u3057\u307E\u3059
\u30FB\u539F\u672C\u306E\u73FE\u5728\u306E\u672C\u6587\u306F SP \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74\u306B\u6B8B\u308A\u307E\u3059
\u30FB\u3053\u306E\u4E0B\u66F8\u304D\u30DA\u30FC\u30B8\u306F\u524A\u9664\u3055\u308C\u307E\u3059
\u30FB\u539F\u672C\u3078\u306E\u30EA\u30F3\u30AF ([[`+t.originPageId+`]]) \u306F\u58CA\u308C\u307E\u305B\u3093

\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F`))try{_(!0,"\u539F\u672C\u306B\u9069\u7528\u4E2D\u2026");let i=m.currentId;if(!i)return;let{applyDraftToOriginInteractive:s}=await Promise.resolve().then(()=>(Wo(),tr));await s(i)}catch(i){k("\u9069\u7528\u5931\u6557: "+i.message,"err")}finally{_(!1)}}),e.querySelector(".memola-draft-banner-promote")?.addEventListener("click",async()=>{if(await(await Promise.resolve().then(()=>(ht(),Jr))).flushPendingSave(),!!confirm("\u539F\u672C\u304C\u524A\u9664\u3055\u308C\u3066\u3044\u308B\u305F\u3081\u3001\u3053\u306E\u4E0B\u66F8\u304D\u3092\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F"))try{_(!0,"\u4FDD\u5B58\u4E2D\u2026");let i=m.currentId;if(!i)return;let{apiPromoteDraftToPage:s,apiGetPages:l}=await Promise.resolve().then(()=>(W(),qe)),c=await s(i);await l();let{renderTree:d}=await Promise.resolve().then(()=>(_e(),wo));d(),Promise.resolve().then(()=>(Wo(),tr)).then(p=>p.refreshDraftsBadge?.()),await Ue(c),k("\u65B0\u898F\u30DA\u30FC\u30B8\u3068\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3057\u305F")}catch(i){k("\u4FDD\u5B58\u5931\u6557: "+i.message,"err")}finally{_(!1)}})}async function F0(e,t){m.currentType="database",Promise.resolve().then(()=>(Uo(),bn)).then(i=>i.clearComments()),Vn(),re.unload(),kn(),Wm(),Jo(null),aa(),ia(),Promise.resolve().then(()=>(O0(),N0)).then(i=>i.attachDbRowDrag());let o=A(e);if(!o||!o.list){k("DB\u30E1\u30BF\u60C5\u5831\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}tt("db"),I("dv-ttl").textContent=t.Title||"\u7121\u984C";let n=I("dv-pg-icon"),r=I("dv-add-icon"),a=document.getElementById("memola-dv-hd");o.icon?(n.textContent=o.icon,n.style.display="inline-block",r.style.display="none",a?.classList.remove("no-icon")):(n.style.display="none",r.style.display="",a?.classList.add("no-icon")),_(!0,"\u30C7\u30FC\u30BF\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D...");try{let i=await Promise.all([ze(o.list),Ee(o.list)]),{stripInternalDbFields:s}=await Promise.resolve().then(()=>(We(),Ut));m.dbFields=s(i[0]);let l=i[1],c=[],d=[];for(let p of l){let u=p.Trashed;typeof u=="number"&&u>0?c.push(p):d.push(p)}m.dbItems=d,m.dbList=o.list,m.dbFilters=[],m.dbSelected.clear(),zl(null),m.dbSort={field:null,asc:!0},Promise.resolve().then(()=>(Vm(),Gm)).then(p=>p.renderFilterChips()),Fe(),H0("db"),Promise.resolve().then(()=>(We(),Ut)).then(p=>p.reconcileTrashedRows(o.list,l)).catch(()=>{})}catch(i){k("DB\u8AAD\u307F\u8FBC\u307F\u5931\u6557: "+i.message,"err")}finally{_(!1)}}var K=L(()=>{"use strict";j();He();me();le();_e();W();Re();Wr();gt();Di();_i();jm();Gn();Fl();De();ve();Ul();ht();we();Ul();S0()});function Wi(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var U0=L(()=>{"use strict"});var ch={};q(ch,{SHORTCUT_GROUPS:()=>j0,closeShortcutsModal:()=>vA,openShortcutsModal:()=>lh});function hA(e){let t=/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent||"");return e.map(o=>{let n=o;return o==="Mod"&&(n=t?"\u2318":"Ctrl"),o==="Shift"&&(n=t?"\u21E7":"Shift"),o==="Alt"&&(n=t?"\u2325":"Alt"),o==="Esc"&&(n="Esc"),'<kbd class="memola-kbd">'+M(n)+"</kbd>"}).join('<span class="memola-kbd-plus">+</span>')}function bA(){return'<div class="memola-mb memola-shortcuts-mb"><h2>\u2328 \u30AD\u30FC\u30DC\u30FC\u30C9\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8</h2><div class="memola-shortcuts-grid">'+j0.map(t=>{let o=t.items.map(n=>'<li><span class="memola-shortcuts-keys">'+hA(n.keys)+'</span><span class="memola-shortcuts-desc">'+M(n.desc)+"</span></li>").join("");return'<section class="memola-shortcuts-sec"><h3>'+M(t.title)+"</h3><ul>"+o+"</ul></section>"}).join("")+'</div><div class="memola-ma"><button class="memola-btn p" data-c="close">\u9589\u3058\u308B</button></div></div>'}function lh(){ra({id:z0,className:"",contentHtml:bA(),buttons:{close:void 0},cancelValue:void 0})}function vA(){let e=document.getElementById(z0);e&&e.remove()}var z0,j0,Xm=L(()=>{"use strict";Re();er();z0="memola-shortcuts-md",j0=[{title:"\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3",items:[{keys:["Mod","K"],desc:"\u30AF\u30A4\u30C3\u30AF\u691C\u7D22 / \u30B3\u30DE\u30F3\u30C9\u30D1\u30EC\u30C3\u30C8"},{keys:["Mod","["],desc:"\u623B\u308B (\u5C65\u6B74)"},{keys:["Mod","]"],desc:"\u9032\u3080 (\u5C65\u6B74)"},{keys:["Mod","\\"],desc:"\u30B5\u30A4\u30C9\u30D0\u30FC\u958B\u9589"},{keys:["Esc"],desc:"\u691C\u7D22 / \u30E2\u30FC\u30C0\u30EB / \u30E1\u30CB\u30E5\u30FC\u3092\u9589\u3058\u308B"}]},{title:"\u4FDD\u5B58\u3068\u7DE8\u96C6",items:[{keys:["Mod","S"],desc:"\u4ECA\u3059\u3050\u4FDD\u5B58 (\u81EA\u52D5\u4FDD\u5B58\u3092\u5F85\u305F\u306A\u3044)"},{keys:["Mod","Z"],desc:"\u53D6\u308A\u6D88\u3057 (Undo)"},{keys:["Mod","Shift","Z"],desc:"\u3084\u308A\u76F4\u3057 (Redo)"},{keys:["Mod","Y"],desc:"\u3084\u308A\u76F4\u3057 (Redo / Windows \u6163\u4F8B)"}]},{title:"\u4F5C\u6210",items:[{keys:["Mod","N"],desc:"\u65B0\u3057\u3044\u30DA\u30FC\u30B8\u3092\u4F5C\u6210"},{keys:["Mod","Shift","N"],desc:"\u65B0\u3057\u3044 DB \u3092\u4F5C\u6210"}]},{title:"\u30D1\u30CD\u30EB / \u30D3\u30E5\u30FC",items:[{keys:["Mod","Shift","L"],desc:"\u76EE\u6B21\u3092\u958B\u9589"},{keys:["Mod","Shift","R"],desc:"\u30D7\u30ED\u30D1\u30C6\u30A3\u3092\u958B\u9589"},{keys:["Mod","Shift","F"],desc:"\u96C6\u4E2D\u30E2\u30FC\u30C9\u5207\u66FF"},{keys:["Mod","Shift","A"],desc:"AI \u30C1\u30E3\u30C3\u30C8\u5207\u66FF"},{keys:["Mod","J"],desc:"AI \u30C1\u30E3\u30C3\u30C8\u5207\u66FF (\u5225\u30D0\u30A4\u30F3\u30C9)"}]},{title:"\u30A8\u30C7\u30A3\u30BF\u5185",items:[{keys:["/"],desc:"\u30B9\u30E9\u30C3\u30B7\u30E5\u30E1\u30CB\u30E5\u30FC (\u30D6\u30ED\u30C3\u30AF\u633F\u5165)"},{keys:["[","["],desc:"\u30DA\u30FC\u30B8\u30EA\u30F3\u30AF\u3092\u633F\u5165 ([[ \u3092\u30BF\u30A4\u30D7)"},{keys:["#","\u30B9\u30DA\u30FC\u30B9"],desc:"\u898B\u51FA\u3057 1 (## \u2192 \u898B\u51FA\u3057 2\u3001### \u2192 \u898B\u51FA\u3057 3)"},{keys:["-","\u30B9\u30DA\u30FC\u30B9"],desc:"\u7B87\u6761\u66F8\u304D (* / + \u3067\u3082\u53EF)"},{keys:["1","."],desc:"\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8 (1. \u2192 \u958B\u59CB)"},{keys:[">","\u30B9\u30DA\u30FC\u30B9"],desc:"\u5F15\u7528\u30D6\u30ED\u30C3\u30AF"},{keys:["```"],desc:"\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF (3 \u9023\u30D0\u30C3\u30AF\u30AF\u30A9\u30FC\u30C8)"}]},{title:"DB \u30D3\u30E5\u30FC",items:[{keys:["Mod","A"],desc:"\u8868\u793A\u4E2D\u306E\u5168\u884C\u3092\u9078\u629E"},{keys:["Enter"],desc:"\u65B0\u898F\u884C\u306E\u7DE8\u96C6\u3092\u78BA\u5B9A / \u6B21\u306E\u30BB\u30EB"},{keys:["Tab"],desc:"\u6B21\u306E\u30BB\u30EB\u3078\u79FB\u52D5 (\u65B0\u898F\u884C\u5165\u529B\u4E2D)"},{keys:["Shift","Tab"],desc:"\u524D\u306E\u30BB\u30EB\u3078\u79FB\u52D5"},{keys:["Esc"],desc:"\u5165\u529B\u3092\u7834\u68C4"}]}]});var W0={};q(W0,{buildQsActionItem:()=>uh,buildQsPageItem:()=>ph,closeSearch:()=>Vo,getPagePath:()=>$0,openSearch:()=>gh,qsConfirm:()=>hh,qsMove:()=>Zm,rebuildQsDom:()=>K0,renderQs:()=>Jm,resetQsSel:()=>bh,setCommandActions:()=>fh});function fh(e){q0=e}function gh(){I("qs").classList.add("on"),I("qs-inp").value="",ao=0,Jm(""),I("qs-inp").focus()}function Vo(){I("qs").classList.remove("on")}function $0(e){return or(e).map(o=>o.Title||"\u7121\u984C").join(" / ")}function Jm(e){let t=m.pages.filter(o=>o.IsDraft||A(o.Id)?.isTemplate?!1:e?(o.Title||"").toLowerCase().includes(e.toLowerCase()):!0);dh=t.filter(o=>o.Type!=="database").slice(0,15),mh=t.filter(o=>o.Type==="database").slice(0,8),K0()}function K0(){let e=I("qs-res");e.innerHTML="",kt=[];let t=I("qs-inp").value||"",o=t.trim().toLowerCase(),n=t.startsWith(">");if(!n&&dh.length>0){let i=document.createElement("div");i.className="memola-qs-section",i.textContent=o?"\u30DA\u30FC\u30B8":"\u6700\u8FD1\u306E\u30DA\u30FC\u30B8",e.appendChild(i),dh.forEach(s=>{kt.push({kind:"page",page:s}),e.appendChild(ph(s,kt.length-1))})}if(!n&&mh.length>0){let i=document.createElement("div");i.className="memola-qs-section",i.textContent="DB",e.appendChild(i),mh.forEach(s=>{kt.push({kind:"page",page:s}),e.appendChild(ph(s,kt.length-1))})}let r=n?o.slice(1).trim():o,a=q0.filter(i=>!r||i.label.toLowerCase().includes(r));if(a.length>0){let i=document.createElement("div");i.className="memola-qs-section",i.textContent="\u30A2\u30AF\u30B7\u30E7\u30F3",e.appendChild(i),a.forEach(s=>{kt.push({kind:"action",action:s}),e.appendChild(uh(s,kt.length-1))})}if(!n&&!o){let i=document.createElement("div");i.className="memola-qs-section",i.textContent="\u30D8\u30EB\u30D7",e.appendChild(i);let s={id:"help-shortcuts",label:"\u30AD\u30FC\u30DC\u30FC\u30C9\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8",icon:"?",key:"",run:()=>{Promise.resolve().then(()=>(Xm(),ch)).then(l=>l.openShortcutsModal())}};kt.push({kind:"action",action:s}),e.appendChild(uh(s,kt.length-1))}kt.length===0&&(e.innerHTML='<div class="memola-qs-empty">\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F</div>'),ao>=kt.length&&(ao=0)}function ph(e,t){let o=document.createElement("div");o.className="memola-qs-item"+(t===ao?" sel":"");let n=e.Type==="database",r=$0(e.Id);return o.innerHTML='<span class="memola-qs-ic">'+(n?"\u{1F5C3}":"\u{1F4C4}")+'</span><div style="flex:1;min-width:0"><div class="memola-qs-title">'+Wi(e.Title||"\u7121\u984C")+"</div>"+(r?'<div class="memola-qs-path">'+Wi(r)+"</div>":"")+"</div>",o.addEventListener("click",()=>{Vo(),Ue(e.Id)}),o}function uh(e,t){let o=document.createElement("div");return o.className="memola-qs-item"+(t===ao?" sel":""),o.innerHTML='<span class="memola-qs-ic">'+Wi(e.icon)+'</span><div style="flex:1;min-width:0"><div class="memola-qs-title">'+Wi(e.label)+"</div></div>"+(e.key?'<span class="memola-qs-kbd">'+Wi(e.key)+"</span>":""),o.addEventListener("click",()=>{Vo(),e.run()}),o}function Zm(e){if(kt.length===0)return;ao=(ao+e+kt.length)%kt.length;let t=I("qs-res").querySelectorAll(".memola-qs-item");t.forEach((o,n)=>{o.classList.toggle("sel",n===ao)}),t[ao]&&t[ao].scrollIntoView({block:"nearest"})}function hh(){let e=kt[ao];e&&(e.kind==="page"&&e.page?(Vo(),Ue(e.page.Id)):e.kind==="action"&&e.action&&(Vo(),e.action.run()))}function bh(){ao=0}var ao,kt,dh,mh,q0,Wl=L(()=>{"use strict";j();me();_e();K();U0();we();ao=0,kt=[],dh=[],mh=[],q0=[]});var yA,G0,V0=L(()=>{"use strict";yA=[{name:"list_pages",description:`Memola \u306E\u3059\u3079\u3066\u306E\u30DA\u30FC\u30B8\u3068\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306E\u4E00\u89A7\u3092\u8FD4\u3059\u3002
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
memola-pages \u4E0A\u306E\u5BFE\u5FDC\u3059\u308B\u884C\u30DA\u30FC\u30B8\u672C\u6587\u3082\u540C\u6642\u306B\u524A\u9664\u3055\u308C\u308B\uFF08\u30AB\u30B9\u30B1\u30FC\u30C9\uFF09\u3002`,input_schema:{type:"object",properties:{db_id:{type:"string"},row_id:{type:"integer"}},required:["db_id","row_id"]}}],G0=yA.map((e,t,o)=>t===o.length-1?{...e,cache_control:{type:"ephemeral"}}:e)});function X0(e){let t=e.newTitle!=null&&e.newTitle!==(e.oldTitle||""),o=e.newBody!=null&&e.newBody!==(e.oldBody||""),n='<div class="memola-diff-card"><div class="memola-diff-head"><h2>\u30DA\u30FC\u30B8\u66F4\u65B0\u306E\u78BA\u8A8D</h2><div class="memola-diff-sub">'+M(e.pageTitle||"\u7121\u984C")+" (id="+M(e.pageId)+")</div></div>";return t&&(n+='<div class="memola-diff-title-row"><div class="memola-diff-label">\u30BF\u30A4\u30C8\u30EB</div><div class="memola-diff-title-old">'+M(e.oldTitle||"")+'</div><div class="memola-diff-arrow">\u2192</div><div class="memola-diff-title-new">'+M(e.newTitle||"")+"</div></div>"),o&&(n+='<div class="memola-diff-body"><div class="memola-diff-label">\u672C\u6587\u306E\u5DEE\u5206</div><pre class="memola-diff-pre" data-body-diff="1"></pre></div>'),!t&&!o&&(n+='<div class="memola-diff-empty">\u5909\u66F4\u304C\u3042\u308A\u307E\u305B\u3093</div>'),n+='<div class="memola-diff-actions"><button class="memola-btn s" data-c="cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" data-c="ok">\u66F4\u65B0\u3059\u308B</button></div></div>',ra({id:Y0,className:"memola-diff-modal",contentHtml:n,buttons:{ok:!0,cancel:!1},cancelValue:!1,focusSel:'button[data-c="ok"]',onMounted:r=>{if(o){let a=r.querySelector("pre[data-body-diff]");a&&a.appendChild(Z0(e.oldBody||"",e.newBody||""))}r.addEventListener("keydown",a=>{a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),r.querySelector('button[data-c="ok"]')?.click())})}})}function J0(e){let t=e.newBody!=null&&e.newBody!==(e.oldBody||""),o=e.fieldChanges.length>0,n='<div class="memola-diff-card"><div class="memola-diff-head"><h2>\u884C\u66F4\u65B0\u306E\u78BA\u8A8D</h2><div class="memola-diff-sub">'+M(e.dbTitle)+" #"+e.rowId+(e.rowTitle?" \u2014 "+M(e.rowTitle):"")+"</div></div>";if(o){let r=e.fieldChanges.map(a=>'<tr><td class="memola-diff-fname">'+M(a.name)+'</td><td class="memola-diff-title-old">'+M(a.oldValue||"(\u7A7A)")+'</td><td class="memola-diff-arrow">\u2192</td><td class="memola-diff-title-new">'+M(a.newValue||"(\u7A7A)")+"</td></tr>").join("");n+='<div class="memola-diff-fields"><div class="memola-diff-label">\u5217\u306E\u5909\u66F4</div><table class="memola-diff-fields-tbl">'+r+"</table></div>"}return t&&(n+='<div class="memola-diff-body"><div class="memola-diff-label">\u672C\u6587\u306E\u5DEE\u5206</div><pre class="memola-diff-pre" data-body-diff="1"></pre></div>'),!o&&!t&&(n+='<div class="memola-diff-empty">\u5909\u66F4\u304C\u3042\u308A\u307E\u305B\u3093</div>'),n+='<div class="memola-diff-actions"><button class="memola-btn s" data-c="cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" data-c="ok">\u66F4\u65B0\u3059\u308B</button></div></div>',ra({id:Y0,className:"memola-diff-modal",contentHtml:n,buttons:{ok:!0,cancel:!1},cancelValue:!1,focusSel:'button[data-c="ok"]',onMounted:r=>{if(t){let a=r.querySelector("pre[data-body-diff]");a&&a.appendChild(Z0(e.oldBody||"",e.newBody||""))}r.addEventListener("keydown",a=>{a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),r.querySelector('button[data-c="ok"]')?.click())})}})}function Z0(e,t){let o=xA(e.split(`
`),t.split(`
`)),n=document.createDocumentFragment();for(let r of o){let a=document.createElement("span");a.className="memola-diff-line memola-diff-"+r.type;let i=r.type==="add"?"+ ":r.type==="del"?"- ":"  ";a.textContent=i+r.line+`
`,n.appendChild(a)}return n}function xA(e,t){let o=e.length,n=t.length,r=Array.from({length:o+1},()=>new Array(n+1).fill(0));for(let l=1;l<=o;l++)for(let c=1;c<=n;c++)r[l][c]=e[l-1]===t[c-1]?r[l-1][c-1]+1:Math.max(r[l-1][c],r[l][c-1]);let a=[],i=o,s=n;for(;i>0&&s>0;)e[i-1]===t[s-1]?(a.push({type:"eq",line:e[i-1]}),i--,s--):r[i-1][s]>=r[i][s-1]?(a.push({type:"del",line:e[i-1]}),i--):(a.push({type:"add",line:t[s-1]}),s--);for(;i>0;)a.push({type:"del",line:e[i-1]}),i--;for(;s>0;)a.push({type:"add",line:t[s-1]}),s--;return a.reverse()}var Y0,vh=L(()=>{"use strict";Re();er();Y0="memola-diff-modal"});function ca(e){let t=m.meta.pages.find(o=>o.id===e&&o.type==="database");return!t||!t.list?null:{listTitle:t.list,title:t.title}}async function yh(e){if(m.dbList!==e)return;m.dbItems=await Ee(e),(await Promise.resolve().then(()=>(K(),ie))).renderDbTable()}function kA(e){return e.map(t=>{let o={name:t.Title,internal:t.InternalName,type:wA[t.FieldTypeKind]||"text"};return t.Choices&&(o.choices=t.Choices),o})}function Q0(e,t){let o={};for(let n of t){let r=e[n.InternalName];r!==void 0&&(o[n.InternalName]=r)}return o}function IA(e,t){return e.find(o=>o.InternalName===t)||e.find(o=>o.Title===t)||null}function EA(e,t){if(t==null)return"";switch(e.FieldTypeKind){case 8:return t===!0||t===1||t==="1"||t==="true"||t==="yes"?"1":"0";case 4:{let o=String(t).trim();if(!o)return"";let n=o.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);if(n){let a=n[1],i=n[2].padStart(2,"0"),s=n[3].padStart(2,"0");return`${a}-${i}-${s}`}let r=new Date(o);if(!isNaN(r.getTime())){let a=new Date(r.getTime()+324e5);return a.getUTCFullYear()+"-"+String(a.getUTCMonth()+1).padStart(2,"0")+"-"+String(a.getUTCDate()).padStart(2,"0")}throw new Error(`\u65E5\u4ED8\u30D5\u30A3\u30FC\u30EB\u30C9 "${e.Title}" \u306E\u5024 "${o}" \u3092\u89E3\u91C8\u3067\u304D\u307E\u305B\u3093\u3002 YYYY-MM-DD \u5F62\u5F0F (\u4F8B: 2026-05-15) \u3067\u6E21\u3057\u3066\u304F\u3060\u3055\u3044\u3002`)}case 9:{let o=Number(t);return isNaN(o)?"":String(o)}default:return String(t)}}function eI(e,t){let o={},n=[];for(let r of Object.keys(t)){if(r==="Title"){o.Title=String(t[r]??"");continue}let a=IA(e,r);if(!a){n.push(r);continue}o[a.InternalName]=EA(a,t[r])}return{payload:o,unknownKeys:n}}async function tI(e){let t=ca(e.db_id);if(!t)return st("db_not_found");let o=await ze(t.listTitle);return In({id:e.db_id,title:t.title,fields:kA(o)})}async function oI(e){let t=ca(e.db_id);if(!t)return st("db_not_found");let o=Math.min(Math.max(e.limit||100,1),500),[n,r]=await Promise.all([ze(t.listTitle),Ee(t.listTitle)]),a=r.slice(0,o).map(i=>({id:i.Id,title:i.Title||"",fields:Q0(i,n)}));return In({db_id:e.db_id,total:r.length,returned:a.length,rows:a})}async function nI(e){let t=ca(e.db_id);if(!t)return st("db_not_found");let[o,n]=await Promise.all([ze(t.listTitle),Ee(t.listTitle)]),r=n.find(i=>i.Id===e.row_id);if(!r)return st("row_not_found");let a=await fo(t.listTitle,e.row_id);return In({db_id:e.db_id,row_id:e.row_id,title:r.Title||"",fields:Q0(r,o),body:a})}async function rI(e){let t=(e.title||"").trim();if(!t)return st("title_required");let o=e.parent_id||"";if(o&&!m.pages.some(r=>r.Id===o))return st("parent_id_not_found");let n=await Ls(t,o);return uo({Id:n.Id,Title:n.Title,ParentId:n.ParentId,Type:"database"}),o&&m.expanded.add(o),te(),In({id:n.Id,title:n.Title})}async function aI(e){let t=ca(e.db_id);if(!t)return st("db_not_found");let o=TA[e.type];if(!o)return st("invalid_type: "+e.type);if(o===6&&(!e.choices||e.choices.length===0))return st("choices_required_for_choice_type");if((await ze(t.listTitle)).some(r=>r.Title===e.name||r.InternalName===e.name))return st("field_already_exists: "+e.name);if(await Ht(t.listTitle,e.name,o,e.choices),m.dbList===t.listTitle){let{stripInternalDbFields:r}=await Promise.resolve().then(()=>(We(),Ut));m.dbFields=r(await ze(t.listTitle)),Promise.resolve().then(()=>(K(),ie)).then(a=>a.renderDbTable())}return In({db_id:e.db_id,name:e.name,type:e.type})}async function iI(e){let t=ca(e.db_id);if(!t)return st("db_not_found");let o=await ze(t.listTitle),{payload:n,unknownKeys:r}=eI(o,e.fields||{});if(r.length>0)return st("unknown_fields: "+r.join(", "));let a=await Ks(t.listTitle,n,e.body);return await yh(t.listTitle),In({db_id:e.db_id,row_id:a.Id,title:n.Title||""})}async function sI(e){let t=ca(e.db_id);if(!t)return st("db_not_found");let o=await ze(t.listTitle),r=(await Ee(t.listTitle)).find(f=>f.Id===e.row_id);if(!r)return st("row_not_found");let{payload:a,unknownKeys:i}=eI(o,e.fields||{});if(i.length>0)return st("unknown_fields: "+i.join(", "));let s=[];for(let f of Object.keys(a)){let g=String(a[f]??""),y=f==="Title"?r.Title:r[f],b=y==null?"":String(y);if(g!==b){let h=o.find(v=>v.InternalName===f);s.push({name:h?.Title||f,oldValue:b,newValue:g})}}let l;if(e.body!=null&&(l=await fo(t.listTitle,e.row_id)),s.length===0&&(e.body==null||e.body===l))return In({no_changes:!0});if(!await J0({dbTitle:t.title,rowId:e.row_id,rowTitle:r.Title||"",fieldChanges:s,oldBody:l,newBody:e.body}))return st("user_cancelled");let d={},p={};for(let f of Object.keys(a)){let g=String(a[f]??""),y=f==="Title"?r.Title:r[f],b=y==null?"":String(y);g!==b&&(d[f]=a[f],p[f]=y??"")}if(Object.keys(d).length>0){await ut(t.listTitle,e.row_id,d);for(let f of Object.keys(d))r[f]=d[f]}let u=e.body!=null&&e.body!==l;return u&&await Po(t.listTitle,e.row_id,e.db_id,r.Title||"",e.body),await yh(t.listTitle),ef(t.listTitle,e.row_id,p,d,u?l:void 0,u?e.body:void 0,e.db_id),In({db_id:e.db_id,row_id:e.row_id,changed:s.map(f=>f.name)})}async function lI(e){let t=ca(e.db_id);return t?confirm(`${t.title} \u306E\u884C #${e.row_id} \u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F`)?(await Or(t.listTitle,e.row_id),await yh(t.listTitle),In({db_id:e.db_id,row_id:e.row_id})):st("user_cancelled"):st("db_not_found")}var In,st,wA,TA,cI=L(()=>{"use strict";j();De();We();W();_e();vh();_o();we();In=(e={})=>({ok:!0,...e}),st=e=>({ok:!1,error:e});wA={2:"text",3:"multiline",4:"date",6:"choice",8:"bool",9:"number"};TA={text:2,multiline:3,date:4,choice:6,bool:8,number:9}});function cr(e={}){return{ok:!0,...e}}function io(e){return{ok:!1,error:e}}function SA(e){let t=!!e.include_trashed,o=m.meta.pages.filter(n=>!n.originPageId).filter(n=>t||!n.trashed).map(n=>({id:n.id,title:n.title,parent_id:n.parent||"",type:n.type||"page",...n.trashed?{trashed:!0}:{}}));return cr({pages:o})}function MA(e){let t=(e.query||"").toLowerCase();if(!t)return cr({pages:[]});let o=m.pages.filter(n=>!n.IsDraft).filter(n=>(n.Title||"").toLowerCase().includes(t)).map(n=>({id:n.Id,title:n.Title,parent_id:n.ParentId||"",type:n.Type||"page"}));return cr({pages:o})}async function PA(e){let t=String(e.id||""),o=m.pages.find(r=>r.Id===t);if(!o)return io("page_not_found");if(o.Type==="database")return io("cannot_read_database_body");let n=await go(t);return cr({id:t,title:o.Title||"",body:n})}async function CA(e){let t=(e.title||"").trim();if(!t)return io("title_required");let o=e.parent_id||"";if(o&&!m.pages.some(a=>a.Id===o))return io("parent_id_not_found");let n=o&&A(o)?.scope||"user",r=await an("\u7121\u984C",o,n);return uo(r),e.body!=null&&e.body!==""?await za(r.Id,t,e.body):await Wa(r.Id,t),Na(r.Id,t),o&&m.expanded.add(o),te(),cr({id:r.Id,title:t})}async function AA(e){let t=String(e.id||""),o=m.pages.find(c=>c.Id===t);if(!o)return io("page_not_found");if(o.Type==="database")return io("cannot_update_database_body");let n=o.Title||"",r=e.title!=null?e.title:n,a,i,s;if(e.body!=null&&(a=await go(t),i=e.body,s=(await dt(t))?.etag||void 0),!await X0({pageId:t,pageTitle:n,oldTitle:n,newTitle:e.title!=null?r:void 0,oldBody:a,newBody:i}))return io("user_cancelled");if(r===n&&i===a)return cr({id:t,no_changes:!0});if(e.body!=null){if(!(await za(t,r,i||"",s)).ok)return io("conflict_other_user_updated_page")}else r!==n&&await Wa(t,r);if(Na(t,r),te(),m.currentId===t&&!m.currentRow){if(e.body!=null){let{loadBlocks:d}=await Promise.resolve().then(()=>(bt(),zo));d(Ye(i||""))}if(r!==n){let d=I("ttl");d&&(d.value=r,Mn(d))}let c=await dt(t).catch(()=>null);if(c){let{saver:d}=await Promise.resolve().then(()=>(gt(),Xa));d.loadPage({pageId:t,body:i||"",title:r,etag:c.etag,modified:c.modified})}}return cr({id:t,title:r})}async function BA(e){let t=String(e.id||""),o=m.pages.find(i=>i.Id===t);if(!o)return io("page_not_found");let n=nn(m.pages,t),r=n.length-1,a=r>0?`\u300C${o.Title||"\u7121\u984C"}\u300D\u3068\u5B50\u30DA\u30FC\u30B8 ${r} \u4EF6\u3092\u30B4\u30DF\u7BB1\u306B\u79FB\u52D5\u3057\u307E\u3059\u304B\uFF1F`:`\u300C${o.Title||"\u7121\u984C"}\u300D\u3092\u30B4\u30DF\u7BB1\u306B\u79FB\u52D5\u3057\u307E\u3059\u304B\uFF1F`;return confirm(a)?(await As(t),Mo(n),m.currentId!==null&&n.includes(m.currentId)&&(m.currentId=null),te(),cr({trashed_ids:n})):io("user_cancelled")}async function dI(e,t){console.log("[Memola tool]",e,t);let o;try{switch(e){case"list_pages":o=SA(t);break;case"search_pages":o=MA(t);break;case"read_page":o=await PA(t);break;case"create_page":o=await CA(t);break;case"update_page":o=await AA(t);break;case"trash_page":o=await BA(t);break;case"read_db_schema":o=await tI(t);break;case"list_db_rows":o=await oI(t);break;case"read_db_row":o=await nI(t);break;case"create_db":o=await rI(t);break;case"add_db_field":o=await aI(t);break;case"create_db_row":o=await iI(t);break;case"update_db_row":o=await sI(t);break;case"delete_db_row":o=await lI(t);break;default:o=io("unknown_tool: "+e)}}catch(n){o=io(n.message||"unknown_error")}return JSON.stringify(o)}var mI=L(()=>{"use strict";j();W();St();_e();vh();wr();we();me();le();cI()});async function pI(e,t,o,n){let r=e.slice(),a=[],i=[],s=[];for(let c=0;c<DA;c++){if(n?.aborted)throw new Error("aborted");let{dispatchChat:d}=await Promise.resolve().then(()=>(Hd(),Od)),p=await d({messages:r,system:t,tools:G0,signal:n,stream:o?{onText:o}:void 0}),u={role:"assistant",content:p.content};r.push(u),a.push(u);for(let b of p.content)b.type==="text"&&b.text.trim()&&s.push(b.text);if(p.stop_reason==="end_turn"||p.stop_reason==="stop_sequence"||p.stop_reason!=="tool_use")break;let f=p.content.filter(b=>b.type==="tool_use");if(f.length===0)break;let g=[];for(let b of f){let h=await dI(b.name,b.input);g.push({type:"tool_result",tool_use_id:b.id,content:h});let v=!1;try{v=!!JSON.parse(h).ok}catch{}i.push({name:b.name,ok:v})}let y={role:"user",content:g};r.push(y),a.push(y)}let l=s[s.length-1]||"";return!l&&i.length>0&&(l="("+i.length+" \u4EF6\u306E\u30C4\u30FC\u30EB\u3092\u5B9F\u884C\u3057\u307E\u3057\u305F)"),{newMessages:a,finalText:l,toolTrace:i}}var DA,uI=L(()=>{"use strict";V0();mI();DA=12});var Yi={};q(Yi,{applyAiPanelState:()=>Ih,applyModelPick:()=>$A,cancelAiMessage:()=>vI,clearAiHistory:()=>Th,closeAiPanel:()=>op,configureApiKey:()=>VA,getQuickPrompts:()=>Lh,loadAiSession:()=>wh,newAiSession:()=>tp,openAiPanel:()=>kh,renderAiMessages:()=>da,renderHistoryDropdown:()=>dr,sendAiMessage:()=>Vl,syncProviderBadge:()=>Eh,toggleAiPanel:()=>Gl});function Vi(){let e=lc.get();if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function xh(e){lc.set(JSON.stringify(e.slice(0,_A)))}function gI(e){for(let t of e)if(t.role==="user"&&typeof t.content=="string")return t.content;return"\u4F1A\u8A71"}function RA(){if(m.ai.messages.length===0)return;let e=Vi(),t=gI(m.ai.messages).slice(0,24)||"\u4F1A\u8A71";if(!Rt)Rt="sess-"+Date.now(),e.unshift({id:Rt,title:t,created:Date.now(),messages:[...m.ai.messages]});else{let o=e.find(n=>n.id===Rt);o?(o.messages=[...m.ai.messages],o.aiTitled||(o.title=t)):e.unshift({id:Rt,title:t,created:Date.now(),messages:[...m.ai.messages]})}xh(e),NA()}async function NA(){if(!Rt||!qr())return;let t=Vi().find(r=>r.id===Rt);if(!t||t.aiTitled||!t.messages.some(r=>r.role!=="assistant"?!1:typeof r.content=="string"?r.content.trim().length>0:r.content.some(a=>a.type==="text"&&a.text.trim().length>0)))return;let n=gI(t.messages).slice(0,240);if(n)try{let r=await Promise.resolve().then(()=>(Bt(),jn)),a=`\u30E6\u30FC\u30B6\u30FC\u306E\u4F1A\u8A71\u306E\u6700\u521D\u306E\u767A\u8A71\u304B\u3089\u300120\u6587\u5B57\u4EE5\u5185\u306E\u7C21\u6F54\u306A\u65E5\u672C\u8A9E\u30BF\u30A4\u30C8\u30EB\u3092 1 \u3064\u3060\u3051\u8FD4\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u8A18\u53F7\u30FB\u5F15\u7528\u7B26\u30FB\u300C\u300D\u306F\u4E0D\u8981\u3001\u30BF\u30A4\u30C8\u30EB\u672C\u4F53\u306E\u307F\u3002\u8A9E\u5C3E\u306E\u53E5\u70B9\u3082\u4E0D\u8981\u3002

\u767A\u8A71: `+n,i="",s=r.getProvider();if(s==="corp"){if(!r.getCorpAiKey())return;i=await(await Promise.resolve().then(()=>(Bd(),If))).corpAiChatText({messages:[{role:"user",content:a}],maxTokens:60}).catch(()=>"")}else if(s==="local"){if(!r.getLocalAiBaseUrl()||!r.getLocalAiModel())return;i=await(await Promise.resolve().then(()=>(Tf(),Ef))).localAiChatText({messages:[{role:"user",content:a}],maxTokens:60}).catch(()=>"")}else{let{callClaudeRaw:p}=await Promise.resolve().then(()=>(ui(),Mf));i=(await p({messages:[{role:"user",content:a}],model:r.getClaudeModel(),maxTokens:60})).content.filter(f=>f.type==="text").map(f=>f.text).join("")}let l=i.trim().replace(/^["'「『]|["'」』]$/g,"").slice(0,30);if(!l)return;let c=Vi(),d=c.find(p=>p.id===Rt);if(!d)return;d.title=l,d.aiTitled=!0,xh(c),dr()}catch{}}function wh(e){let t=Vi().find(o=>o.id===e);t&&(Rt=e,m.ai.messages=[...t.messages],da(),dr())}function tp(){Rt=null,m.ai.messages=[],da(),dr()}function dr(){let e=document.getElementById("memola-ai-hist");if(!e)return;let t=Vi();e.innerHTML='<option value="__new__">+ \u65B0\u3057\u3044\u4F1A\u8A71</option>'+t.map(o=>'<option value="'+o.id+'"'+(o.id===Rt?" selected":"")+">"+OA(o.title||"\u4F1A\u8A71")+"</option>").join("")}function OA(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function FA(){let e=m.currentId||"";if(!e)return"";if(m.currentType==="database"&&!m.currentRow)return zA(e);let t=I("ttl"),o=t&&t.value||"",n=Xe(vn()),r=["\u2500\u2500 \u73FE\u5728\u958B\u3044\u3066\u3044\u308B\u30DA\u30FC\u30B8 \u2500\u2500",`id: ${e}`,`title: ${o}`];n.trim()&&r.push("","body (markdown):",n),ep&&r.push("",ep);let a=Jf();return a&&r.push("",a),r.join(`
`)}async function UA(){ep="";let e;try{e=vn()}catch{return}let t=e.filter(n=>n.kind==="email");if(!t.length)return;let o=[];for(let n of t){if(!n.fileUrl)continue;let r=await Dk(n.fileUrl,n.filename||""),a=r?.subject||n.subject||"(\u4EF6\u540D\u306A\u3057)",i=r?[r.fromName,r.fromEmail].filter(Boolean).join(" "):n.from,s=r?.dateISO||n.date||"",l=r?_k(r):"",c=l,d="";l.length>Qm?(c=l.slice(0,Qm),d=`\uFF08\u6CE8: \u3053\u306E\u30E1\u30FC\u30EB\u672C\u6587\u306F\u5148\u982D ${Qm} \u5B57\u306E\u307F\u3002\u5143\u306F\u7D04 ${l.length} \u5B57\u3067\u3001\u6B8B\u308A ${l.length-Qm} \u5B57\u3092\u7701\u7565\u3057\u3066\u3044\u307E\u3059\uFF09`):l||(d="\uFF08\u6CE8: \u672C\u6587\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u4EF6\u540D\u30FB\u5DEE\u51FA\u4EBA\u306E\u307F\uFF09");let p=["\u2500\u2500 \u6DFB\u4ED8\u30E1\u30FC\u30EB \u2500\u2500",`\u4EF6\u540D: ${a}`];i&&p.push(`\u5DEE\u51FA\u4EBA: ${i}`),s&&p.push(`\u65E5\u6642: ${s}`),p.push("\u672C\u6587:",c),d&&p.push(d),o.push(p.join(`
`))}ep=o.join(`

`)}function zA(e){let t=A(e)?.title||"",o=m.dbFields,n=["Title",...o.map(s=>s.Title)],r=s=>String(s??"").replace(/\r?\n/g," ").replace(/\|/g,"\\|"),a=60,i=["\u2500\u2500 \u73FE\u5728\u958B\u3044\u3066\u3044\u308B\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9 (\u4E00\u89A7) \u2500\u2500",`id: ${e}`,`title: ${t}`,`\u5217: ${n.join(", ")}`,`\u884C\u6570: ${m.dbItems.length}`,"","\u884C (markdown table):","| "+n.join(" | ")+" |","| "+n.map(()=>"---").join(" | ")+" |"];for(let s of m.dbItems.slice(0,a)){let l=s,c=n.map(d=>{if(d==="Title")return r(l.Title);let p=o.find(u=>u.Title===d);return r(p?l[p.InternalName]??l[p.Title]:"")});i.push("| "+c.join(" | ")+" |")}return m.dbItems.length>a&&i.push(`\u2026 \u4ED6 ${m.dbItems.length-a} \u884C(\u8868\u793A\u4E0A\u9650\u306E\u305F\u3081\u7701\u7565)`),i.join(`
`)}function jA(){let e=[{type:"text",text:qA,cache_control:{type:"ephemeral"}}],t=[Eb()],o=FA();return o&&(t.push(""),t.push(o)),e.push({type:"text",text:t.join(`
`)}),e}function kh(){m.ai.panelOpen=!0,I("ai-panel").classList.add("on"),document.getElementById("memola-ai-btn")?.classList.add("on"),ss.set("1"),Eh(),hI(),da(),setTimeout(()=>I("ai-input").focus(),50)}function op(){m.ai.panelOpen=!1,I("ai-panel").classList.remove("on"),document.getElementById("memola-ai-btn")?.classList.remove("on"),ss.set("0")}function Ih(){ss.get()==="1"&&kh()}function Gl(){m.ai.panelOpen?op():kh()}async function hI(){let e=await Promise.resolve().then(()=>(Bt(),jn)),t=e.getProvider();return t==="corp"?e.getCorpAiKey()?!0:(k("Azure OpenAI \u4E92\u63DB API \u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059\u3002\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u2699 \u8A2D\u5B9A\u300D\u304B\u3089\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044","err"),!1):t==="local"?e.getLocalAiBaseUrl()?e.getLocalAiModel()?!0:(k("\u30ED\u30FC\u30AB\u30EB AI \u306E\u30E2\u30C7\u30EB\u540D\u304C\u672A\u8A2D\u5B9A\u3067\u3059\u3002\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u2699 \u8A2D\u5B9A\u300D\u304B\u3089\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044","err"),!1):(k("\u30ED\u30FC\u30AB\u30EB AI \u306E\u30D9\u30FC\u30B9 URL \u304C\u672A\u8A2D\u5B9A\u3067\u3059\u3002\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u2699 \u8A2D\u5B9A\u300D\u304B\u3089\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044","err"),!1):qr()?!0:(k("Claude API \u30AD\u30FC\u304C\u672A\u8A2D\u5B9A\u3067\u3059\u3002\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u2699 \u8A2D\u5B9A\u300D\u304B\u3089\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044","err"),!1)}function Eh(){let e=document.getElementById("memola-ai-model-pick");e&&Promise.resolve().then(()=>(Bt(),jn)).then(t=>{let o=t.getProvider(),n=t.getClaudeModel(),r=t.getCorpAiModel(),a=t.getLocalAiModel(),i=o+":"+(o==="corp"?r:o==="local"?a:n);e.innerHTML="";let s=document.createElement("optgroup");s.label="Claude";for(let d of t.CLAUDE_MODELS){let p=document.createElement("option");p.value="claude:"+d.id,p.textContent=d.label,s.appendChild(p)}e.appendChild(s);let l=document.createElement("optgroup");l.label="Azure OpenAI \u4E92\u63DB";for(let d of t.CORP_AI_MODELS){let p=document.createElement("option");p.value="corp:"+d.id,p.textContent=d.id,l.appendChild(p)}e.appendChild(l);let c=t.getLocalAiModels();if(c.length>0||a){let d=document.createElement("optgroup");d.label="\u30ED\u30FC\u30AB\u30EB AI";let p=new Set;for(let u of[a,...c]){if(!u||p.has(u))continue;p.add(u);let f=document.createElement("option");f.value="local:"+u,f.textContent=u,d.appendChild(f)}e.appendChild(d)}e.value=i})}async function $A(e){let t=e.indexOf(":");if(t<0)return;let o=e.substring(0,t),n=e.substring(t+1);if(o!=="claude"&&o!=="corp"&&o!=="local")return;let r=await Promise.resolve().then(()=>(Bt(),jn));r.setProvider(o),o==="claude"?r.setClaudeModel(n):o==="corp"?r.setCorpAiModel(n):o==="local"&&r.setLocalAiModel(n),Eh()}function KA(e){return M(e).replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>")}function bI(e){return e.split(/\r?\n/).map(KA).join("<br>")}function WA(e){if(typeof e.content=="string")return e.role==="user"?{text:e.content,toolNames:[]}:{text:e.content,toolNames:[]};let t=e.content;if(t.every(a=>a.type==="tool_result"))return null;let n=t.filter(a=>a.type==="text").map(a=>a.text).join(`
`),r=t.filter(a=>a.type==="tool_use").map(a=>a.name);return{text:n,toolNames:r}}function da(){let e=I("ai-messages");if(e.innerHTML="",m.ai.messages.length===0){let t=document.createElement("div");t.className="memola-ai-empty",t.innerHTML='<div class="memola-ai-empty-title">\u3053\u306E\u30DA\u30FC\u30B8\u306B\u3064\u3044\u3066\u8CEA\u554F\u3067\u304D\u307E\u3059</div><div class="memola-ai-empty-sub">\u4E0B\u306E\u30C1\u30C3\u30D7\u304B\u3089\u59CB\u3081\u308B\u304B\u3001\u81EA\u7531\u306B\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044</div>',e.appendChild(t)}for(let t of m.ai.messages){let o=WA(t);if(!o||!o.text&&o.toolNames.length===0)continue;let n=document.createElement("div");n.className="memola-ai-row";let r=document.createElement("div");r.className="memola-ai-label",r.textContent=t.role==="user"?"\u3042\u306A\u305F":"AI";let a=document.createElement("div");a.className="memola-ai-msg memola-ai-"+t.role;let i=o.text?bI(o.text):"";if(o.toolNames.length>0){let s='<div class="memola-ai-trace">\u2014 \u5B9F\u884C: '+o.toolNames.map(l=>"\u{1F527} "+M(l)).join(" / ")+"</div>";i+=s}a.innerHTML=i,n.append(r,a),e.appendChild(n)}if(m.ai.loading){let t=document.createElement("div");t.className="memola-ai-row";let o=document.createElement("div");o.className="memola-ai-label",o.textContent="AI";let n=document.createElement("div");n.className="memola-ai-msg memola-ai-assistant memola-ai-loading",n.textContent="\u8003\u3048\u4E2D\u2026",t.append(o,n),e.appendChild(t)}e.scrollTop=e.scrollHeight}function vI(){Gi&&(Gi.abort(),Gi=null)}async function Vl(e){if(Gi){vI();return}let t=e.trim();if(!t||!await hI())return;m.ai.messages.push({role:"user",content:t}),m.ai.loading=!0,da(),fI();let o=I("ai-input");o.value="",o.style.height="";let n="";function r(i){n+=i,GA(n)}let a=new AbortController;Gi=a;try{await UA();let i=await pI(m.ai.messages,jA(),r,a.signal);m.ai.messages.push(...i.newMessages)}catch(i){let s=i;s.name==="AbortError"||s.message==="aborted"?m.ai.messages.push({role:"assistant",content:"\uFF08\u4E2D\u65AD\u3057\u307E\u3057\u305F\uFF09"}):(k("AI\u5931\u6557: "+s.message,"err"),m.ai.messages.push({role:"assistant",content:"\u26A0\uFE0F "+s.message}))}finally{Gi=null,m.ai.loading=!1,da(),fI(),RA(),dr()}}function GA(e){let t=I("ai-messages"),o=document.getElementById("memola-ai-streaming");if(!o){let n=document.createElement("div");n.className="memola-ai-row",n.id="memola-ai-streaming-row";let r=document.createElement("div");r.className="memola-ai-label",r.textContent="AI",o=document.createElement("div"),o.className="memola-ai-msg memola-ai-assistant",o.id="memola-ai-streaming",n.append(r,o),t.querySelectorAll(".memola-ai-loading").forEach(a=>a.parentElement?.remove()),t.appendChild(n)}o.innerHTML=bI(e),t.scrollTop=t.scrollHeight}function fI(){let e=document.getElementById("memola-ai-send");if(!e)return;let t=m.ai.loading;e.classList.toggle("stop",t),e.title=t?"\u4E2D\u65AD":"\u9001\u4FE1 (\u2318\u21B5)",Promise.resolve().then(()=>(Pa(),yb)).then(({ICONS:o})=>{e.innerHTML=t?o.stop:o.send})}function Th(){if(m.ai.messages.length!==0&&confirm("\u73FE\u5728\u306E\u4F1A\u8A71\u3092\u30AF\u30EA\u30A2\u3057\u307E\u3059\u304B\uFF1F(\u5C65\u6B74\u304B\u3089\u3082\u524A\u9664\u3055\u308C\u307E\u3059)")){if(Rt){let e=Vi().filter(t=>t.id!==Rt);xh(e)}Rt=null,m.ai.messages=[],da(),dr()}}function VA(){k("API \u30AD\u30FC\u306F\u300C\u2699 \u8A2D\u5B9A\u300D (\u30B5\u30A4\u30C9\u30D0\u30FC) \u304B\u3089\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044")}function Lh(){return HA}var _A,Rt,HA,Qm,ep,qA,Gi,mr=L(()=>{"use strict";j();me();le();ui();uI();St();Pg();bt();Re();To();we();Uo();ve();_A=20;Rt=null;HA=[{label:"\u8981\u7D04",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u5185\u5BB9\u30923\u884C\u3067\u8981\u7D04\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{label:"\u6539\u7A3F",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u672C\u6587\u3092\u3088\u308A\u8AAD\u307F\u3084\u3059\u304F\u3001\u81EA\u7136\u306A\u65E5\u672C\u8A9E\u306B\u66F8\u304D\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{label:"\u7FFB\u8A33",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u672C\u6587\u3092\u82F1\u8A9E\u306B\u7FFB\u8A33\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},{label:"\u30A2\u30AF\u30B7\u30E7\u30F3\u62BD\u51FA",prompt:"\u3053\u306E\u30DA\u30FC\u30B8\u306E\u5185\u5BB9\u304B\u3089\u3001ToDo\u30FB\u30A2\u30AF\u30B7\u30E7\u30F3\u30A2\u30A4\u30C6\u30E0\u3092\u7B87\u6761\u66F8\u304D\u3067\u62BD\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002"}];Qm=5e3,ep="";qA=`\u3042\u306A\u305F\u306F Memola (Notion\u98A8 SharePoint\u9023\u643A\u30CE\u30FC\u30C8\u30A2\u30D7\u30EA) \u306E AI \u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u3067\u3059\u3002
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
- \u524A\u9664\u3084\u66F4\u65B0\u306E\u524D\u306B user \u306B\u610F\u56F3\u3092\u78BA\u8A8D\u3059\u308B\u3053\u3068\uFF08\u30DB\u30B9\u30C8\u5074\u3067\u3082\u78BA\u8A8D\u30E2\u30FC\u30C0\u30EB\u304C\u51FA\u308B\uFF09`;Gi=null});function np(e){let t=e;if(!t)return!1;let o=t.tagName;return!!(o==="INPUT"||o==="TEXTAREA"||o==="SELECT"||t.isContentEditable)}function YA(){Promise.resolve().then(()=>(Wl(),W0)).then(e=>e.openSearch())}function yI(){Promise.resolve().then(()=>(mr(),Yi)).then(e=>e.toggleAiPanel())}function rp(e){let t=e.ctrlKey||e.metaKey,o=t&&!e.shiftKey&&(e.key==="z"||e.key==="Z"),n=t&&(e.shiftKey&&(e.key==="z"||e.key==="Z")||!e.shiftKey&&(e.key==="y"||e.key==="Y"));if(o||n){if(m.currentType==="database"&&m.dbList&&!np(e.target)){e.preventDefault();let r=n;Promise.resolve().then(()=>(_o(),fd)).then(async a=>{try{(r?await a.redoDb(m.dbList):await a.undoDb(m.dbList))||k(r?"\u518D\u5B9F\u884C\u3067\u304D\u308B\u64CD\u4F5C\u304C\u3042\u308A\u307E\u305B\u3093":"\u53D6\u308A\u6D88\u3059\u64CD\u4F5C\u304C\u3042\u308A\u307E\u305B\u3093")}catch(i){k((r?"\u518D\u5B9F\u884C":"\u53D6\u308A\u6D88\u3057")+"\u5931\u6557: "+i.message,"err")}});return}if(n&&!e.shiftKey&&(e.key==="y"||e.key==="Y")&&np(e.target)){e.preventDefault();try{document.execCommand("redo")}catch{}return}}if(t&&(e.key==="a"||e.key==="A")&&!e.shiftKey&&m.currentType==="database"&&m.dbList&&!np(e.target)){e.preventDefault(),Promise.resolve().then(()=>(K(),ie)).then(r=>{r.getSortedFilteredItems().forEach(i=>m.dbSelected.add(i.Id)),r.renderDbTable()});return}if(t&&e.key==="s"){e.preventDefault(),yt();return}if(t&&e.key==="k"){e.preventDefault(),YA();return}if(t&&e.key==="j"){e.preventDefault(),yI();return}if(e.key==="?"&&!t&&!np(e.target)){e.preventDefault(),Promise.resolve().then(()=>(Xm(),ch)).then(r=>r.openShortcutsModal());return}if(t&&(e.key==="\\"||e.code==="Backslash")){e.preventDefault(),document.getElementById("memola-sb-toggle")?.click();return}if(t&&(e.key==="["||e.code==="BracketLeft")){e.preventDefault(),Promise.resolve().then(()=>(Gn(),vi)).then(r=>r.goBack());return}if(t&&(e.key==="]"||e.code==="BracketRight")){e.preventDefault(),Promise.resolve().then(()=>(Gn(),vi)).then(r=>r.goForward());return}if(t&&e.shiftKey){let r=e.key.toLowerCase();if(r==="l"){e.preventDefault(),Promise.resolve().then(()=>(Di(),Gg)).then(a=>a.toggleOutline());return}if(r==="r"){e.preventDefault(),Promise.resolve().then(()=>(_i(),Vg)).then(a=>a.togglePropertiesPanel());return}if(r==="f"){e.preventDefault(),document.getElementById("memola-overlay")?.classList.toggle("focus-mode");return}if(r==="a"){e.preventDefault(),yI();return}if(r==="n"){e.preventDefault();return}}if(t&&e.key.toLowerCase()==="n"&&!e.shiftKey){e.preventDefault(),Io("");return}if(e.key==="Escape"){if(e.repeat||XA())return;ap()}}function XA(){let e=document.querySelector(".memola-cmt-float, .memola-blk-menu, #memola-dbcolor-pop, #memola-ws-menu, #memola-shortcuts-md");if(e)return e.remove(),!0;if(I("qs").classList.contains("on"))return Vo(),!0;let t=document.getElementById("memola-emoji");if(t?.classList.contains("on"))return t.classList.remove("on"),!0;for(let o of["memola-trash-md","memola-settings-md","memola-col-md","memola-inbox-md","memola-create-menu","memola-pgm"]){let n=document.getElementById(o);if(n?.classList.contains("on"))return n.classList.remove("on"),!0}for(let o of["memola-drafts-md","memola-versions-md"]){let n=document.getElementById(o);if(n&&n.style.display==="flex")return n.style.display="none",!0}return I("ai-panel").classList.contains("on")?(Promise.resolve().then(()=>(mr(),Yi)).then(o=>o.closeAiPanel()),!0):Dg()?(_g(),!0):!1}var Sh=L(()=>{"use strict";j();me();le();bt();Wl();ht();En()});var wI={};q(wI,{confirmClose:()=>QA});async function QA(e){if(Date.now()-xI<ZA)return!1;let t='<div class="memola-close-confirm-box"><div class="memola-close-confirm-msg">'+M(e).replace(/\n/g,"<br>")+'</div><div class="memola-close-confirm-btns"><button class="memola-btn s" data-c="cancel" autofocus>\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" data-c="ok">\u9589\u3058\u308B</button></div></div>',o=await ra({id:JA,className:"memola-close-confirm-md",contentHtml:t,buttons:{ok:!0,cancel:!1},cancelValue:!1,focusSel:'button[data-c="cancel"]',onMounted:n=>{n.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),r.stopPropagation(),n.querySelector('button[data-c="ok"]')?.click())})}});return o||(xI=Date.now()),o}var JA,xI,ZA,kI=L(()=>{"use strict";Re();er();JA="memola-close-confirm",xI=0,ZA=800});async function Io(e){try{_(!0,"\u30DA\u30FC\u30B8\u3092\u4F5C\u6210\u4E2D...");let t=e&&A(e)?.scope||"user",o=await an("\u7121\u984C",e||"",t);uo(o),e&&m.expanded.add(e),te(),await Ue(o.Id),I("ttl").select()}catch(t){k("\u30DA\u30FC\u30B8\u4F5C\u6210\u306B\u5931\u6557: "+t.message,"err")}finally{_(!1)}}async function ip(e){let t=m.pages.find(i=>i.Id===e),o=t&&t.Title||"\u7121\u984C",n=m.pages.some(i=>i.ParentId===e),r=A(e);if(r?.type==="database"&&r.list==="memola-daily"){k("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u524A\u9664\u3067\u304D\u307E\u305B\u3093 (\u500B\u4EBA\u904B\u7528\u306B\u5FC5\u9808)","err");return}if(confirm(n?"\u300C"+o+"\u300D\u3068\u5B50\u30DA\u30FC\u30B8\u3092\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5\u3057\u307E\u3059\u304B\uFF1F":"\u300C"+o+"\u300D\u3092\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5\u3057\u307E\u3059\u304B\uFF1F"))try{_(!0,"\u79FB\u52D5\u4E2D..."),await As(e);let i=eB(e);Mo(i),m.currentId!==null&&i.includes(m.currentId)&&(sm(),re.unload(),m.currentId=null,tt("empty")),te(),k("\u30B4\u30DF\u7BB1\u306B\u79FB\u52D5\u3057\u307E\u3057\u305F")}catch(i){k("\u524A\u9664\u306B\u5931\u6557: "+i.message,"err")}finally{_(!1)}}function sp(){let e=I("dtb");if(e.querySelector(".memola-dr-new"))return;let t=zi(),o=document.createElement("tr");o.className="memola-dr-new";let n=!1,r=document.createElement("td");r.className="memola-td-cb",o.appendChild(r),t.forEach(l=>{let c=document.createElement("td"),d=document.createElement("span");d.className="memola-dc",d.contentEditable="true",d.dataset.field=l.InternalName,d.addEventListener("keydown",p=>{let u=p;if(u.key==="Enter"&&!u.shiftKey&&(p.preventDefault(),s()),u.key==="Escape"&&o.remove(),u.key==="Tab"){p.preventDefault();let f=Array.from(o.querySelectorAll(".memola-dc")),g=u.shiftKey?f[f.indexOf(d)-1]:f[f.indexOf(d)+1];g?g.focus():s()}}),c.appendChild(d),o.appendChild(c)});let a=document.createElement("td");a.className="memola-td-del",o.appendChild(a),e.appendChild(o);let i=o.querySelector(".memola-dc");i&&i.focus();async function s(){if(n)return;let l={};if(o.querySelectorAll(".memola-dc").forEach(c=>{let d=(c.textContent||"").trim();d&&(l[c.dataset.field]=d)}),!l.Title){o.remove();return}n=!0;try{_(!0,"\u8FFD\u52A0\u4E2D...");let{addRowWithUndo:c}=await Promise.resolve().then(()=>(_o(),fd)),d=await c(m.dbList,l);m.dbItems.push(d),o.remove(),I("dtb").appendChild(ji(d,t)),k("\u884C\u3092\u8FFD\u52A0\u3057\u307E\u3057\u305F\uFF08\u2318Z \u3067\u53D6\u6D88\u53EF\u80FD\uFF09")}catch(c){k("\u8FFD\u52A0\u5931\u6557: "+c.message,"err"),o.remove(),n=!1}finally{_(!1)}}o.addEventListener("focusout",()=>{setTimeout(()=>{o.contains(document.activeElement)||s()},100)})}async function Mh(e){if(e.flushSave)try{await yt()}catch{}if(sm(),Promise.resolve().then(()=>(Wr(),Om)).then(t=>{t.stopWatching(),t.detachCrossTabSync()}).catch(()=>{}),Promise.resolve().then(()=>(Fl(),oh)).then(t=>t.shutdownPresence()).catch(()=>{}),document.removeEventListener("keydown",rp),Promise.resolve().then(()=>(Ph(),II)).then(t=>t.detachViewportAutoCollapse?.()).catch(()=>{}),e.removeOverlay){let t=document.getElementById("memola-overlay");t&&t.remove();let o=document.getElementById("memola-style");o&&o.remove()}}async function ap(){let e=re.isDirty()?`\u4FDD\u5B58\u3057\u3066\u3044\u306A\u3044\u5909\u66F4\u304C\u3042\u308A\u307E\u3059\u3002\u30A2\u30D7\u30EA\u3092\u9589\u3058\u307E\u3059\u304B\uFF1F
(OK \u3067\u4FDD\u5B58\u3057\u3066\u304B\u3089\u9589\u3058\u307E\u3059)`:"\u30A2\u30D7\u30EA\u3092\u9589\u3058\u307E\u3059\u304B\uFF1F",{confirmClose:t}=await Promise.resolve().then(()=>(kI(),wI));await t(e)&&Mh({flushSave:!0,removeOverlay:!0})}var eB,En=L(()=>{"use strict";j();me();le();_e();K();W();wr();K();gt();ht();Sh();we();eB=e=>nn(m.pages,e)});var wo={};q(wo,{TREE_INDENT:()=>Xl,TREE_PAD_LEFT:()=>cp,ancs:()=>or,kidsOf:()=>Bh,mkNode:()=>dp,renderBc:()=>sh,renderTree:()=>te});function CI(e){if(!e)return"user";let t="Id"in e?e.Id:e.id;return A(t)?.scope==="org"?"org":"user"}function Bh(e){let t=e||"",o=m.pages.filter(r=>!r.IsDraft&&!A(r.Id)?.isTemplate&&r.Id!==t),n;if(t===""){let r=new Set(o.map(a=>a.Id));n=o.filter(a=>{let i=a.ParentId||"";return i===""||!r.has(i)}).sort((a,i)=>a.Id<i.Id?-1:1)}else n=o.filter(r=>(r.ParentId||"")===t).sort((r,a)=>r.Id<a.Id?-1:1);return hs(t,n)}function tB(e){return Bh("").filter(t=>CI(t)===e)}function EI(e,t){let o=tB(t),n=lp.has(t),r=n?o:o.slice(0,Ch);if(!n&&m.currentId){let a=m.currentId,i=0;for(;i++<200;){let l=A(a)?.parent||"";if(!l||!m.pages.some(c=>c.Id===l))break;a=l}let s=o.find(l=>l.Id===a);s&&!r.some(l=>l.Id===a)&&r.push(s)}if(r.forEach(a=>{e.appendChild(dp(a,0))}),o.length>Ch){let a=document.createElement("div");a.className="memola-sl-more",a.textContent=n?"\u8868\u793A\u3092\u6E1B\u3089\u3059":"\u3055\u3089\u306B\u8868\u793A ("+(o.length-Ch)+")",a.addEventListener("click",()=>{lp.has(t)?lp.delete(t):lp.add(t),te()}),e.appendChild(a)}}async function TI(e,t){let o=vu(e,t);if(o===null)return e;let n=A(e);if(o==="org"&&n?.type==="database"&&n.list==="memola-daily")return k("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u7D44\u7E54\u306B\u516C\u958B\u3067\u304D\u307E\u305B\u3093","err"),null;let r=A(t),a=AI(e),i=o==="org"?"\u7D44\u7E54":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8",s=o==="org"?"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8":"\u7D44\u7E54";if(!window.confirm(`\u26A0 \u30B9\u30B3\u30FC\u30D7\u304C\u7570\u306A\u308A\u307E\u3059\u3002

\u300C`+(n?.title||"\u7121\u984C")+"\u300D("+s+`) \u3092
\u300C`+(r?.title||"\u7121\u984C")+"\u300D("+i+`) \u306E\u914D\u4E0B\u306B\u79FB\u52D5\u3057\u307E\u3059\u3002

\u914D\u4E0B\u306E `+a+" \u30DA\u30FC\u30B8\u3082\u4E00\u7DD2\u306B\u300C"+i+`\u300D\u306B\u306A\u308A\u307E\u3059\u3002

\u7D9A\u884C\u3057\u307E\u3059\u304B?`))return null;let{confirmScopeChangeLinks:c}=await Promise.resolve().then(()=>(sa(),Ol));if(!await c(e,o))return null;let d=await Ka(e,o).catch(()=>null);return d?d.rootId:e}function LI(e,t){return e<t*.25?"before":e>t*.75?"after":"into"}function SI(e,t,o){let n=e-t,r=Math.floor((o*Xl+cp-n)/Xl),a=o-Math.max(0,r);return Math.max(0,Math.min(o,a))}function oB(e,t){let o=e,n=0,r=[];for(;o&&(r.unshift(o),!!o.ParentId);)o=m.pages.find(i=>i.Id===o.ParentId);if(t<=0)return"";let a=r[t-1];return a?a.Id:""}function nB(e,t){let o=e,n=[];for(;o&&(n.unshift(o),!!o.ParentId);)o=m.pages.find(r=>r.Id===o.ParentId);return n[t]?n[t].Id:null}function MI(e,t){let n=I("tree").querySelectorAll(".memola-tr"),r=new Set,a=i=>{m.pages.filter(s=>s.ParentId===i).forEach(s=>{r.add(s.Id),a(s.Id)})};a(e),n.forEach(i=>{let s=i.dataset.pageId;s&&r.has(s)&&i.classList.toggle("memola-tr-dragging-descendant",t)})}function rB(){let e=document.getElementById("memola-overlay")||document.body;if(Xi&&e.contains(Xi))return Xi;let t=document.createElement("div");return t.className="memola-tr-drop-line",t.innerHTML='<span class="memola-tr-drop-dot"></span><span class="memola-tr-drop-dot right"></span>',e.appendChild(t),Xi=t,t}function Ah(e,t,o){let n=e.getBoundingClientRect(),r=rB(),a=(t?n.bottom:n.top)-1,i=n.left+o*Xl+cp;r.style.top=a+"px",r.style.left=i+"px",r.style.width=Math.max(40,n.right-i-6)+"px",r.classList.add("on")}function Yl(){Xi&&Xi.classList.remove("on")}function dp(e,t){let o=e.Type==="database",n=Bh(e.Id),r=n.length>0,a=m.expanded.has(e.Id),i=e.Id===m.currentId,s=A(e.Id),l=s&&s.icon?s.icon:o?"\u{1F5C3}":"\u{1F4C4}",c=document.createElement("div"),d=document.createElement("div");d.className="memola-tr"+(i?" on":""),d.style.paddingLeft=t*Xl+cp+"px",d.dataset.depth=String(t),d.dataset.parentId=e.ParentId||"";let p=document.createElement("span");p.className="memola-tog"+(r?"":" lf")+(a?" op":""),p.innerHTML=r?"&#9658;":"",p.addEventListener("click",h=>{h.stopPropagation(),r&&(m.expanded.has(e.Id)?m.expanded.delete(e.Id):m.expanded.add(e.Id),te())});let u=document.createElement("span");u.className="memola-ti",u.textContent=l;let f=document.createElement("span");f.className="memola-tl",f.textContent=e.Title||"\u7121\u984C";let g=document.createElement("span");if(g.className="memola-ta",!o){let h=document.createElement("button");h.className="memola-tac",h.title="\u5B50\u30DA\u30FC\u30B8\u3092\u8FFD\u52A0",h.innerHTML="+",h.addEventListener("click",v=>{v.stopPropagation(),Io(e.Id)}),g.appendChild(h)}let y=document.createElement("button");y.className="memola-tac",y.title=s?.pinned?"\u30D4\u30F3\u7559\u3081\u89E3\u9664":"\u30D4\u30F3\u7559\u3081",y.innerHTML=s?.pinned?"\u{1F4CC}":"\u{1F4CD}",y.addEventListener("click",async h=>{h.stopPropagation(),await yu(e.Id,!s?.pinned),te()}),g.appendChild(y);let b=document.createElement("button");if(b.className="memola-tac",b.title="\u524A\u9664",b.innerHTML="\u{1F5D1}",b.addEventListener("click",h=>{h.stopPropagation(),ip(e.Id)}),g.appendChild(b),d.append(p,u,f,g),d.addEventListener("click",h=>{h.metaKey||h.ctrlKey?Promise.resolve().then(()=>(qt(),eo)).then(v=>v.openPageInNewTab(e.Id)):Ue(e.Id)}),d.addEventListener("auxclick",h=>{h.button===1&&(h.preventDefault(),Promise.resolve().then(()=>(qt(),eo)).then(v=>v.openPageInNewTab(e.Id)))}),d.draggable=!0,d.dataset.pageId=e.Id,d.addEventListener("dragstart",h=>{if(h.metaKey||h.ctrlKey){h.preventDefault();return}h.dataTransfer&&(h.dataTransfer.effectAllowed="move",h.dataTransfer.setData("text/plain",e.Id)),d.classList.add("memola-tr-dragging"),MI(e.Id,!0)}),d.addEventListener("dragend",()=>{d.classList.remove("memola-tr-dragging"),MI(e.Id,!1),Yl()}),d.addEventListener("dragover",h=>{h.preventDefault();let v=d.getBoundingClientRect(),x=h.clientY-v.top,w=LI(x,v.height);if(w==="into")d.classList.add("memola-tr-dropover"),Yl();else{d.classList.remove("memola-tr-dropover");let T=SI(h.clientX,v.left,t);Ah(d,w==="after",T)}}),d.addEventListener("dragleave",()=>{d.classList.remove("memola-tr-dropover")}),d.addEventListener("drop",async h=>{h.preventDefault(),h.stopPropagation(),d.classList.remove("memola-tr-dropover"),Yl();let v=h.dataTransfer?.getData("text/plain");if(!v||v===e.Id)return;let x=d.getBoundingClientRect(),w=LI(h.clientY-x.top,x.height);try{if(w==="into"){let H=await TI(v,e.Id);if(!H)return;await Ar(H,e.Id),m.expanded.add(e.Id),te(),k("\u79FB\u52D5\u3057\u307E\u3057\u305F");return}let T=SI(h.clientX,x.left,t),E=oB(e,T),B=m.pages.find(H=>H.Id===v);if(!B)return;let U=v;if((B.ParentId||"")!==E){let H=await TI(v,E);if(!H)return;U=H,await Ar(U,E)}let P=T===t?e.Id:nB(e,T)||"",O=m.pages.filter(H=>(H.ParentId||"")===E).sort((H,X)=>H.Id<X.Id?-1:1),D=hs(E,O);if(P){let H=Fp(D,U,P,w==="before");Da(E,H)}te()}catch(T){k("\u79FB\u52D5\u5931\u6557: "+T.message,"err")}}),c.appendChild(d),r&&a){let h=document.createElement("div");n.forEach(v=>{h.appendChild(dp(v,t+1))}),c.appendChild(h)}return c}function te(){let e=document.getElementById("memola-tree-pinned"),t=document.getElementById("memola-tree-private"),o=document.getElementById("memola-tree-org"),n=document.getElementById("memola-tree-pinned-lbl");if(!e||!t||!o)return;e.innerHTML="",t.innerHTML="",o.innerHTML="";let r=m.pages.filter(a=>a.IsDraft?!1:A(a.Id)?.pinned);n&&(n.style.display=r.length>0?"":"none"),r.forEach(a=>{e.appendChild(dp(a,0))}),EI(t,"user"),EI(o,"org"),PI(t,"user"),PI(o,"org")}function PI(e,t){function o(n){let r=e.querySelectorAll(".memola-tr");if(r.length===0)return"bottom";let a=r[0].getBoundingClientRect(),i=r[r.length-1].getBoundingClientRect();return n<a.top+a.height/2?"top":n>i.bottom-i.height/2?"bottom":null}e.ondragover=n=>{if(n.preventDefault(),n.target.closest(".memola-tr"))return;let a=e.querySelectorAll(".memola-tr");if(a.length===0)return;o(n.clientY)==="top"&&a[0]?Ah(a[0],!1,0):a.length>0&&Ah(a[a.length-1],!0,0)},e.addEventListener("dragleave",n=>{let r=n.relatedTarget;(!r||!e.contains(r))&&Yl()}),e.ondrop=async n=>{if(n.preventDefault(),Yl(),n.target.closest(".memola-tr"))return;let a=n.dataTransfer?.getData("text/plain");if(!a)return;let i=o(n.clientY)||"bottom";try{let s=m.pages.find(f=>f.Id===a);if(!s)return;let l=a,c=CI(s);if(c!==t){let f=A(a);if(t==="org"&&f?.type==="database"&&f.list==="memola-daily"){k("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 DB \u306F\u7D44\u7E54\u306B\u516C\u958B\u3067\u304D\u307E\u305B\u3093","err");return}let g=AI(a);if(!window.confirm(`\u26A0 \u30B9\u30B3\u30FC\u30D7\u304C\u7570\u306A\u308A\u307E\u3059\u3002

\u300C`+(s.Title||"\u7121\u984C")+"\u300D("+(c==="org"?"\u7D44\u7E54":"\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8")+") \u3092\u300C"+(t==="org"?"\u{1F310} \u7D44\u7E54":"\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8")+`\u300D\u30BB\u30AF\u30B7\u30E7\u30F3\u306B\u79FB\u52D5\u3057\u307E\u3059\u3002

`+(g>0?"\u914D\u4E0B\u306E "+g+` \u30DA\u30FC\u30B8\u3082\u540C\u3058\u5206\u985E\u306B\u306A\u308A\u307E\u3059\u3002

`:"")+"\u7D9A\u884C\u3057\u307E\u3059\u304B?"))return;let{confirmScopeChangeLinks:b}=await Promise.resolve().then(()=>(sa(),Ol));if(!await b(a,t))return;let h=await Ka(a,t).catch(()=>null);h&&(l=h.rootId)}(s.ParentId||"")!==""&&await Ar(l,"");let d=m.pages.filter(f=>(f.ParentId||"")==="").sort((f,g)=>f.Id<g.Id?-1:1),u=hs("",d).map(f=>f.Id).filter(f=>f!==l);i==="top"?u.unshift(l):u.push(l),Da("",u),te()}catch(s){k("\u79FB\u52D5\u5931\u6557: "+s.message,"err")}}}function or(e){let t={},o=[];m.pages.forEach(r=>{t[r.Id]=r});let n=e;for(;n;){let r=t[n];if(!r)break;o.unshift(r),n=r.ParentId||""}return o}function sh(e){let t=I("bc");t.innerHTML="";let o=or(e);o.forEach((n,r)=>{let a=document.createElement("span");if(a.className="memola-bi",a.textContent=n.Title||"\u7121\u984C",a.addEventListener("click",()=>{Ue(n.Id)}),t.appendChild(a),r<o.length-1){let i=document.createElement("span");i.textContent="/",i.style.color="#e9e9e7",t.appendChild(i)}})}var Ch,lp,AI,Xi,Xl,cp,_e=L(()=>{"use strict";j();me();K();En();W();le();wr();we();Ch=10,lp=new Set;AI=e=>gs(m.pages,e);Xi=null;Xl=16,cp=6});function Jl(e,t){BI=e,Dh=t;let o=I("emoji-grid");o.innerHTML="",aB.forEach(a=>{let i=document.createElement("button");i.className="memola-emoji-btn",i.textContent=a,i.addEventListener("click",()=>{I("emoji").classList.remove("on"),Dh&&Dh(a)}),o.appendChild(i)});let n=e.getBoundingClientRect(),r=I("emoji");r.style.top=n.bottom+4+"px",r.style.left=n.left+"px",r.classList.add("on")}function DI(){let e=document.body;e.dataset.memolaEmojiWired!=="1"&&(e.dataset.memolaEmojiWired="1",document.addEventListener("mousedown",t=>{let o=I("emoji"),n=t.target;o&&o.classList.contains("on")&&!o.contains(n)&&n!==BI&&o.classList.remove("on")}))}var aB,BI,Dh,_h=L(()=>{"use strict";me();aB=["\u{1F4C4}","\u{1F4DD}","\u{1F4CB}","\u{1F4CC}","\u{1F4CD}","\u{1F4CE}","\u{1F5C2}","\u{1F5C3}","\u{1F5C4}","\u{1F4C1}","\u{1F4C2}","\u{1F5D1}","\u{1F4DA}","\u{1F4D6}","\u{1F4D7}","\u{1F4D8}","\u{1F4D9}","\u{1F4D4}","\u{1F4D2}","\u{1F4C3}","\u{1F4DC}","\u{1F4D1}","\u{1F516}","\u270F\uFE0F","\u{1F58A}","\u{1F58B}","\u{1F58C}","\u{1F58D}","\u2712\uFE0F","\u{1F50F}","\u{1F510}","\u{1F512}","\u{1F513}","\u{1F511}","\u{1F5DD}","\u{1F4A1}","\u{1F526}","\u{1F56F}","\u{1F4B0}","\u{1F4B5}","\u{1F4B3}","\u{1F3C6}","\u{1F947}","\u{1F3AF}","\u{1F3AA}","\u{1F3A8}","\u{1F3AD}","\u{1F31F}","\u2B50","\u2728","\u{1F4AB}","\u{1F525}","\u2744\uFE0F","\u{1F30A}","\u{1F308}","\u2600\uFE0F","\u{1F319}","\u26A1","\u{1F33F}","\u{1F34E}","\u{1F34A}","\u{1F34B}","\u{1F347}","\u{1F353}","\u{1F95D}","\u{1F951}","\u{1F32E}","\u{1F355}","\u2615","\u{1F382}","\u{1F370}","\u{1F436}","\u{1F431}","\u{1F42D}","\u{1F439}","\u{1F430}","\u{1F98A}","\u{1F43B}","\u{1F43C}","\u{1F428}","\u{1F42F}","\u{1F981}","\u{1F42E}","\u{1F680}","\u2708\uFE0F","\u{1F682}","\u{1F697}","\u{1F3E0}","\u{1F3E2}","\u{1F3D6}","\u{1F3D4}","\u{1F30D}","\u{1F5FA}","\u{1F9ED}","\u26F5"],BI=null,Dh=null});var RI={};q(RI,{attachCreateMenu:()=>Nh,renderCreateMenuTemplates:()=>Rh});function Rh(){let e=document.getElementById("memola-cm-templates");if(!e)return;let t=xu();if(t.length===0){e.innerHTML='<div class="memola-cm-empty">\u307E\u3060\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u30DA\u30FC\u30B8\u306E\u300C\u2026\u300D\u2192\u300C\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3068\u3057\u3066\u767B\u9332\u300D\u3067\u8FFD\u52A0\u3067\u304D\u307E\u3059\u3002</div>';return}e.innerHTML=t.map(o=>{let n=o.icon||(o.type==="database"?"\u{1F5C2}":"\u{1F4C4}");return'<div class="memola-cm-item memola-cm-tpl" data-tpl-id="'+M(o.id)+'"><span class="memola-cm-ic">'+M(n)+'</span><span class="memola-cm-name">'+M(o.title||"\u7121\u984C")+'</span><span class="memola-cm-tpl-actions"><button class="memola-cm-tpl-btn" data-tpl-edit="'+M(o.id)+'" title="\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u7DE8\u96C6">\u270E</button><button class="memola-cm-tpl-btn" data-tpl-del="'+M(o.id)+'" title="\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u524A\u9664">\u{1F5D1}</button></span></div>'}).join("")}function Nh(e){if(_I)return;_I=!0;let t=document.getElementById("memola-quick-add"),o=document.getElementById("memola-create-menu");!t||!o||(t.addEventListener("click",n=>{n.stopPropagation();let r=t.getBoundingClientRect();o.style.left=r.left+"px",o.style.top=r.bottom+4+"px",Rh(),o.classList.toggle("on")}),o.addEventListener("click",n=>{let r=n.target,a=r.closest("[data-tpl-edit]")?.dataset.tplEdit;if(a){n.stopPropagation(),o.classList.remove("on"),Promise.resolve().then(()=>(K(),ie)).then(c=>c.doSelect(a));return}let i=r.closest("[data-tpl-del]")?.dataset.tplDel;if(i){n.stopPropagation(),sB(i);return}let s=r.closest(".memola-cm-tpl");if(s?.dataset.tplId){o.classList.remove("on"),iB(s.dataset.tplId);return}let l=r.closest(".memola-cm-item");if(!(!l||!l.dataset.cm))switch(o.classList.remove("on"),l.dataset.cm){case"new-page":Io("");break;case"new-db":e("");break}}),document.addEventListener("click",n=>{if(!o.classList.contains("on"))return;let r=n.target;o.contains(r)||t.contains(r)||o.classList.remove("on")}))}async function iB(e){let t=m.meta.pages.find(o=>o.id===e);try{_(!0,"\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u4F5C\u6210\u4E2D...");let o;if(t?.type==="database"){let{duplicateDb:n}=await Promise.resolve().then(()=>(We(),Ut)),r=await n(e,{asTemplate:!1});o=r.Id,te(),await(await Promise.resolve().then(()=>(K(),ie))).doSelectDb(o,r)}else{let{apiCreatePageFromTemplate:n}=await Promise.resolve().then(()=>(W(),qe));o=(await n(e)).Id,te(),await(await Promise.resolve().then(()=>(K(),ie))).doSelect(o)}k("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u4F5C\u6210\u3057\u307E\u3057\u305F")}catch(o){k("\u4F5C\u6210\u5931\u6557: "+o.message,"err")}finally{_(!1)}}async function sB(e){let t=m.meta.pages.find(o=>o.id===e);if(confirm("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u300C"+(t?.title||"\u7121\u984C")+"\u300D\u3092\u524A\u9664\u3057\u307E\u3059\u304B?"))try{_(!0,"\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u524A\u9664\u4E2D...");let{apiDeleteTemplate:o}=await Promise.resolve().then(()=>(W(),qe));await o(e),Rh(),k("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u524A\u9664\u3057\u307E\u3057\u305F")}catch(o){k("\u524A\u9664\u5931\u6557: "+o.message,"err")}finally{_(!1)}}var _I,Oh=L(()=>{"use strict";En();j();le();Re();W();_e();_I=!1});function OI(){if(NI)return;NI=!0;let e=2,t=document.getElementById("memola-col-type-grid");if(t){let o=Array.from(t.querySelectorAll(".memola-col-type"));o[0]?.classList.add("on"),o.forEach(n=>{n.addEventListener("click",()=>{o.forEach(r=>r.classList.remove("on")),n.classList.add("on"),e=parseInt(n.dataset.tk||"2"),I("col-choices-row").classList.toggle("on",e===6||e===15)})})}I("col-cancel").addEventListener("click",()=>{I("col-md").classList.remove("on")}),I("col-ok").addEventListener("click",async()=>{let o=I("col-name").value.trim();if(!o){I("col-name").focus();return}let n=[];if(e===6||e===15){let r=I("col-choices").value.trim();n=r?r.split(`
`).map(a=>a.trim()).filter(Boolean):[]}I("col-md").classList.remove("on"),_(!0,"\u5217\u3092\u8FFD\u52A0\u4E2D...");try{await Ht(m.dbList,o,e,n);let[r,a]=await Promise.all([ze(m.dbList),Ee(m.dbList)]),{stripInternalDbFields:i}=await Promise.resolve().then(()=>(We(),Ut));m.dbFields=i(r),m.dbItems=a,Fe(),k("\u5217\u300C"+o+"\u300D\u3092\u8FFD\u52A0\u3057\u307E\u3057\u305F")}catch(r){k("\u5217\u8FFD\u52A0\u5931\u6557: "+r.message,"err")}finally{_(!1)}}),I("col-name").addEventListener("keydown",o=>{let n=o;n.isComposing||n.keyCode===229||(n.key==="Enter"&&I("col-ok").click(),n.key==="Escape"&&I("col-md").classList.remove("on"))})}var NI,HI=L(()=>{"use strict";j();me();le();De();K();NI=!1});function FI(e){if(e==null)return"";let t=String(e);return/[",\n\r]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}function lB(e){let t=[],o=[],n="",r=!1;for(let a=0;a<e.length;a++){let i=e[a];r?i==='"'?e[a+1]==='"'?(n+='"',a++):r=!1:n+=i:i==='"'?r=!0:i===","?(o.push(n),n=""):i==="\r"||(i===`
`?(o.push(n),t.push(o),o=[],n=""):n+=i)}return(n||o.length)&&(o.push(n),t.push(o)),t.filter(a=>a.some(i=>i.length>0))}function UI(){if(!m.dbList){k("DB\u304C\u9078\u629E\u3055\u308C\u3066\u3044\u307E\u305B\u3093","err");return}let e=m.dbFields.filter(s=>[2,4,6,8,9].includes(s.FieldTypeKind)),t=e.map(s=>FI(s.Title)).join(","),o=m.dbItems.map(s=>e.map(l=>FI(s[l.InternalName])).join(",")),n="\uFEFF"+[t,...o].join(`
`),r=new Blob([n],{type:"text/csv;charset=utf-8"}),a=URL.createObjectURL(r),i=document.createElement("a");i.href=a,i.download=(m.dbList||"database")+".csv",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a),k("CSV\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3057\u307E\u3057\u305F")}function zI(){if(!m.dbList){k("DB\u304C\u9078\u629E\u3055\u308C\u3066\u3044\u307E\u305B\u3093","err");return}let e=document.createElement("input");e.type="file",e.accept=".csv,text/csv",e.addEventListener("change",async()=>{let t=e.files?.[0];if(!t)return;let o=await t.text(),n=lB(o);if(n.length<1){k("\u7A7A\u306ECSV\u3067\u3059","err");return}let r=n[0].map(i=>i.replace(/^﻿/,"").trim()),a=n.slice(1);if(confirm(r.length+" \u5217 \xD7 "+a.length+" \u884C \u3092\u30A4\u30F3\u30DD\u30FC\u30C8\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F"))try{_(!0,"\u30A4\u30F3\u30DD\u30FC\u30C8\u4E2D... (\u5217\u3092\u6E96\u5099)");let i=new Set(m.dbFields.map(d=>d.Title));for(let d of r)d&&!i.has(d)&&d!=="Title"&&await Ht(m.dbList,d,2);let{stripInternalDbFields:s}=await Promise.resolve().then(()=>(We(),Ut));m.dbFields=s(await ze(m.dbList));let l={};m.dbFields.forEach(d=>{l[d.Title]=d.InternalName}),_(!0,"\u884C\u3092\u30A4\u30F3\u30DD\u30FC\u30C8\u4E2D... (0/"+a.length+")");let c=0;for(let d of a){let p={};r.forEach((u,f)=>{let g=l[u];if(!g)return;let y=d[f]||"";y&&(p[g]=y)}),Object.keys(p).length!==0&&(!p.Title&&p[l.Title]===void 0&&(p.Title="(\u7121\u984C)"),await Ne(m.dbList,p),c++,c%5===0&&_(!0,"\u884C\u3092\u30A4\u30F3\u30DD\u30FC\u30C8\u4E2D... ("+c+"/"+a.length+")"))}m.dbItems=await Ee(m.dbList),Fe(),k(c+" \u884C\u30A4\u30F3\u30DD\u30FC\u30C8\u3057\u307E\u3057\u305F")}catch(i){k("\u30A4\u30F3\u30DD\u30FC\u30C8\u5931\u6557: "+i.message,"err")}finally{_(!1)}}),e.click()}var jI=L(()=>{"use strict";j();le();De();K()});function Ji(e){["dbv-table","dbv-board","dbv-list","dbv-gallery","dbv-calendar","dbv-gantt"].forEach(o=>I(o).classList.toggle("on",o==="dbv-"+e)),I("dt-wrap").style.display=e==="table"?"":"none",I("dadd").style.display=e==="table"?"":"none",I("kb").classList.toggle("on",e==="board"),["list","gallery","calendar","gantt"].forEach(o=>{I(o+"-view").classList.toggle("on",e===o)}),e==="board"?$i():["list","gallery","calendar","gantt"].includes(e)&&Promise.resolve().then(()=>(ud(),pd)).then(o=>o.renderActiveView(e))}function $I(){qI||(qI=!0,I("db-csv-export").addEventListener("click",UI),I("db-csv-import").addEventListener("click",zI),document.getElementById("memola-db-new-row")?.addEventListener("click",sp),I("dbv-table").addEventListener("click",()=>Ji("table")),I("dbv-board").addEventListener("click",()=>Ji("board")),I("dbv-list").addEventListener("click",()=>Ji("list")),I("dbv-gallery").addEventListener("click",()=>Ji("gallery")),I("dbv-calendar").addEventListener("click",()=>Ji("calendar")),I("dbv-gantt").addEventListener("click",()=>Ji("gantt")),Promise.resolve().then(()=>(Vm(),Gm)).then(e=>e.attachFilterPopoverOutsideClick()))}var qI,KI=L(()=>{"use strict";me();K();jI();En();qI=!1});function GI(){let t=I("sb").classList.contains("collapsed")?"collapsed":"expanded";Ma.set(t)}function VI(e){WI||(WI=!0,I("sb-toggle").addEventListener("click",()=>{I("sb").classList.toggle("collapsed"),GI()}),document.getElementById("memola-sb-collapse")?.addEventListener("click",()=>{I("sb").classList.add("collapsed"),GI()}),Ma.get()==="collapsed"&&I("sb").classList.add("collapsed"),document.getElementById("memola-nav-back")?.addEventListener("click",()=>{Promise.resolve().then(()=>(Gn(),vi)).then(t=>t.goBack())}),document.getElementById("memola-nav-fwd")?.addEventListener("click",()=>{Promise.resolve().then(()=>(Gn(),vi)).then(t=>t.goForward())}),document.getElementById("memola-sb-daily-today")?.addEventListener("click",()=>{e.openTodayDailyNote()}),document.getElementById("memola-sb-daily-pick")?.addEventListener("click",t=>{e.showDailyPicker(t.currentTarget)}),I("ne").addEventListener("click",()=>{Io("")}),I("ne-db").addEventListener("click",()=>{e.doNewDb("")}),document.getElementById("memola-ne-tpl")?.addEventListener("click",()=>{document.getElementById("memola-quick-add")?.click()}),document.querySelectorAll(".memola-em-chip").forEach(t=>{t.addEventListener("click",()=>{t.dataset.tpl==="tasks"?e.doNewDb(""):Io("")})}))}var WI,YI=L(()=>{"use strict";me();ve();En();WI=!1});function JI(e){Bg(e)}function ZI(){XI||(XI=!0,I("tb").addEventListener("mousedown",e=>{e.target.closest(".memola-b")&&e.preventDefault()}),I("tb").addEventListener("click",e=>{let t=e.target.closest(".memola-b");t&&t.dataset.cmd&&JI(t.dataset.cmd)}),I("ftb").addEventListener("mousedown",e=>{let t=e.target.closest(".memola-fb");t&&t.dataset.cmd&&(e.preventDefault(),JI(t.dataset.cmd))}))}var XI,QI=L(()=>{"use strict";me();bt();XI=!1});function tE(e){if(!m.currentId)return;let t=m.currentId;Ds(t,e).then(()=>{Kl(t),te()}).catch(o=>{k("\u30A2\u30A4\u30B3\u30F3\u4FDD\u5B58\u5931\u6557: "+o.message,"err")})}function oE(e){if(!m.currentId)return;let t=m.currentId;Ds(t,e).then(()=>{let o=I("dv-pg-icon"),n=I("dv-add-icon"),r=document.getElementById("memola-dv-hd");e?(o.textContent=e,o.style.display="inline-block",n.style.display="none",r?.classList.remove("no-icon")):(o.style.display="none",n.style.display="",r?.classList.add("no-icon")),te()}).catch(o=>{k("\u30A2\u30A4\u30B3\u30F3\u4FDD\u5B58\u5931\u6557: "+o.message,"err")})}function nE(){eE||(eE=!0,I("add-icon").addEventListener("click",()=>{Jl(I("add-icon"),tE)}),I("pg-icon").addEventListener("click",()=>{Jl(I("pg-icon"),tE)}),I("dv-add-icon").addEventListener("click",()=>{Jl(I("dv-add-icon"),oE)}),I("dv-pg-icon").addEventListener("click",()=>{Jl(I("dv-pg-icon"),oE)}),I("emoji-rm").addEventListener("click",()=>{if(I("emoji").classList.remove("on"),!m.currentId)return;let e=m.currentId;Ds(e,"").then(()=>{if(A(e)?.type==="database"){let o=I("dv-pg-icon"),n=I("dv-add-icon"),r=document.getElementById("memola-dv-hd");o.style.display="none",n.style.display="",r?.classList.add("no-icon")}else Kl(e);te()}).catch(t=>{k("\u30A2\u30A4\u30B3\u30F3\u524A\u9664\u5931\u6557: "+t.message,"err")})}))}var eE,rE=L(()=>{"use strict";j();me();le();W();_e();K();_h();we();eE=!1});function iE(){aE||(aE=!0,I("search-nav").addEventListener("click",gh),I("qs").addEventListener("click",e=>{e.target===I("qs")&&Vo()}),I("qs-inp").addEventListener("input",()=>{bh(),Jm(I("qs-inp").value)}),I("qs-inp").addEventListener("keydown",e=>{let t=e;t.isComposing||t.keyCode===229||(t.key==="ArrowDown"&&(e.preventDefault(),Zm(1)),t.key==="ArrowUp"&&(e.preventDefault(),Zm(-1)),t.key==="Enter"&&(e.preventDefault(),hh()),t.key==="Escape"&&Vo())}))}var aE,sE=L(()=>{"use strict";me();Wl();aE=!1});function cE(){if(lE)return;lE=!0;let e=I("ttl");e.addEventListener("input",()=>{Mn(e),jo()}),e.addEventListener("keydown",t=>{let o=t;o.isComposing||o.keyCode===229||o.key==="Enter"&&(t.preventDefault(),Ce().focus())}),I("dv-ttl").addEventListener("input",()=>{let t=(I("dv-ttl").textContent||"").trim()||"\u7121\u984C";m.currentId&&(At(4e3),Na(m.currentId,t),te())}),I("dv-ttl").addEventListener("blur",()=>{if(m.currentId){let t=(I("dv-ttl").textContent||"").trim()||"\u7121\u984C";Wa(m.currentId,t).catch(o=>{k("\u30BF\u30A4\u30C8\u30EB\u4FDD\u5B58\u5931\u6557: "+o.message,"err")})}})}var lE,dE=L(()=>{"use strict";j();me();le();W();_e();ht();we();lE=!1});function mE(){let e=new Date,t=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return e.getFullYear()+"-"+t+"-"+o}async function pE(e,t){try{_(!0,"\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u3044\u3066\u3044\u307E\u3059...");let o=await Promise.resolve().then(()=>(An(),Ua)),n=await o.findNoteForDate(e);if(!n&&t.confirmCreate){if(_(!1),!confirm(e+" \u306E\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093\u3002\u65B0\u3057\u304F\u4F5C\u6210\u3057\u307E\u3059\u304B\uFF1F"))return;_(!0,"\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u4F5C\u6210\u3057\u3066\u3044\u307E\u3059...")}let r=n?{...n,dbPageId:(await o.ensureDailyDb()).dbPageId}:await o.getOrCreateNoteForDate(e);if(!m.pages.some(l=>l.Id===r.dbPageId)){let{apiGetPages:l}=await Promise.resolve().then(()=>(W(),qe));await l()}let a=m.pages.find(l=>l.Id===r.dbPageId);if(!a){k("\u30C7\u30A4\u30EA\u30FC DB \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093","err");return}await(await Promise.resolve().then(()=>(K(),ie))).doSelectDb(r.dbPageId,a);let s=m.dbItems.find(l=>l.Id===r.rowId);s&&await(await Promise.resolve().then(()=>(Ho(),Oo))).openRowAsPage(r.dbPageId,s),te()}catch(o){k("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u3051\u307E\u305B\u3093\u3067\u3057\u305F: "+o.message,"err")}finally{_(!1)}}async function uE(){await pE(mE(),{confirmCreate:!1})}async function fE(){let e=m.currentId;if(!e)return;let t=A(e);if(t?.originDailyDate&&confirm(`\u3053\u306E\u30DA\u30FC\u30B8\u3092\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 (${t.originDailyDate}) \u306B\u623B\u3057\u307E\u3059\u304B\uFF1F

\u901A\u5E38\u30DA\u30FC\u30B8\u3068\u3057\u3066\u306E\u672C\u30DA\u30FC\u30B8\u306F\u524A\u9664\u3055\u308C\u3001\u672C\u6587\u304C\u30C7\u30A4\u30EA\u30FC\u5074\u306B\u7D71\u5408\u3055\u308C\u307E\u3059\u3002`))try{_(!0,"\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u306B\u5FA9\u5143\u3057\u3066\u3044\u307E\u3059...");let o=await Promise.resolve().then(()=>(An(),Ua)),{rowId:n,date:r}=await o.restoreToDaily(e),{apiGetPages:a}=await Promise.resolve().then(()=>(W(),qe));await a(),te();let i=await o.ensureDailyDb(),s=m.pages.find(l=>l.Id===i.dbPageId);if(s){await(await Promise.resolve().then(()=>(K(),ie))).doSelectDb(i.dbPageId,s);let c=m.dbItems.find(d=>d.Id===n);c&&await(await Promise.resolve().then(()=>(Ho(),Oo))).openRowAsPage(i.dbPageId,c)}k("\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8 ("+r+") \u306B\u623B\u3057\u307E\u3057\u305F")}catch(o){k("\u5FA9\u5143\u5931\u6557: "+o.message,"err")}finally{_(!1)}}function gE(e){let t=document.getElementById("memola-daily-picker");t&&t.remove();let o=mE(),n=document.createElement("div");n.id="memola-daily-picker",n.innerHTML='<div class="memola-dp-row"><button class="memola-dp-nav" data-nav="-1" title="\u524D\u65E5">\u2039</button><input type="date" id="memola-dp-input" value="'+o+'"><button class="memola-dp-nav" data-nav="+1" title="\u7FCC\u65E5">\u203A</button></div><div class="memola-dp-quick"><button data-quick="-7">\u5148\u9031</button><button data-quick="-1">\u6628\u65E5</button><button data-quick="0">\u4ECA\u65E5</button><button data-quick="+1">\u660E\u65E5</button><button data-quick="+7">\u6765\u9031</button></div><div class="memola-dp-foot"><button id="memola-dp-cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button id="memola-dp-open" class="memola-dp-primary">\u958B\u304F</button></div>';let r=e.getBoundingClientRect();n.style.position="fixed",n.style.left=r.left+"px",n.style.top=r.bottom+4+"px",(document.getElementById("memola-overlay")||document.body).appendChild(n);let a=n.querySelector("#memola-dp-input");if(!a)return;setTimeout(()=>a.focus(),0);function i(d,p){let u=new Date((p||a.value||o)+"T00:00:00");u.setDate(u.getDate()+d);let f=String(u.getMonth()+1).padStart(2,"0"),g=String(u.getDate()).padStart(2,"0");return u.getFullYear()+"-"+f+"-"+g}n.querySelectorAll(".memola-dp-nav").forEach(d=>{d.addEventListener("click",()=>{let p=parseInt(d.dataset.nav||"0",10);a.value=i(p)})}),n.querySelectorAll(".memola-dp-quick button").forEach(d=>{d.addEventListener("click",()=>{let p=parseInt(d.dataset.quick||"0",10);a.value=i(p,o)})});function s(){n.remove(),document.removeEventListener("click",l)}function l(d){!n.contains(d.target)&&!e.contains(d.target)&&s()}setTimeout(()=>document.addEventListener("click",l),0),n.querySelector("#memola-dp-cancel")?.addEventListener("click",s);let c=()=>{let d=a.value;d&&(s(),pE(d,{confirmCreate:!0}))};n.querySelector("#memola-dp-open")?.addEventListener("click",c),a.addEventListener("keydown",d=>{d.key==="Enter"&&c()})}var Hh=L(()=>{"use strict";j();le();_e();we()});function hE(e,t,o){let n=new Blob([t],{type:o+";charset=utf-8"}),r=URL.createObjectURL(n),a=document.createElement("a");a.href=r,a.download=e,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(r)}function bE(e){return e.replace(/[/\\?%*:|"<>]/g,"_").slice(0,100)||"untitled"}function cB(){return`
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
`.replace(/\s+/g," ").trim()}function vE(){return m.currentId&&m.pages.find(e=>e.Id===m.currentId)||null}async function yE(){let e=vE();if(e){if(e.Type==="database"){k("\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306FMD\u51FA\u529B\u3067\u304D\u307E\u305B\u3093","err");return}try{_(!0,"\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u4E2D...");let t=await go(e.Id),o=new Date().toISOString().slice(0,10),n=`---
title: `+(e.Title||"\u7121\u984C")+`
parent: `+(e.ParentId||"")+`
exported: `+o+`
---

`;hE(bE(e.Title||"\u7121\u984C")+".md",n+t,"text/markdown")}catch(t){k("MD\u51FA\u529B\u5931\u6557: "+t.message,"err")}finally{_(!1)}}}async function xE(){let e=vE();if(e){if(e.Type==="database"){k("\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306FHTML\u51FA\u529B\u3067\u304D\u307E\u305B\u3093","err");return}try{_(!0,"\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u4E2D...");let t=await go(e.Id),o=So(t),n=e.Title||"\u7121\u984C",r=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),a=cB(),i=`<!DOCTYPE html>
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
</html>`;hE(bE(n)+".html",i,"text/html")}catch(t){k("HTML\u51FA\u529B\u5931\u6557: "+t.message,"err")}finally{_(!1)}}}function wE(){window.print()}var kE=L(()=>{"use strict";j();le();W();on()});function Fh(){return m.currentId&&m.pages.find(e=>e.Id===m.currentId)||null}async function IE(){let e=Fh();if(e){if(e.Type==="database"){k("\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306F\u8907\u88FD\u3067\u304D\u307E\u305B\u3093","err");return}try{_(!0,"\u8907\u88FD\u4E2D...");let t=await go(e.Id),o=(e.Title||"\u7121\u984C")+" (\u30B3\u30D4\u30FC)",n=A(e.Id)?.scope||"user",r=await an(o,e.ParentId,n),{updatePageRow:a}=await Promise.resolve().then(()=>(W(),qe)),{addPage:i}=await Promise.resolve().then(()=>(we(),qb));await a(r.Id,{Body:t}),i(r),te(),await Ue(r.Id),k("\u8907\u88FD\u3057\u307E\u3057\u305F")}catch(t){k("\u8907\u88FD\u5931\u6557: "+t.message,"err")}finally{_(!1)}}}async function EE(){let e=Fh();if(!e)return;let t;if(e.Type==="database"){let o=A(e.Id);if(!o||!o.list){k("\u30EA\u30F3\u30AF\u53D6\u5F97\u5931\u6557","err");return}t=G+"/Lists/"+encodeURIComponent(o.list)}else t=G+"/Lists/"+encodeURIComponent(nt(e.Id))+"/DispForm.aspx?ID="+encodeURIComponent(e.Id);try{await navigator.clipboard.writeText(t),k("\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")}catch{k("\u30B3\u30D4\u30FC\u5931\u6557","err")}}function TE(){let e=Fh();if(!e)return;if(e.Type==="database"){k(`\u{1F5C3} ${e.Title||"\u7121\u984C"} (DB) \u2014 ${m.dbItems.length}\u884C / ${m.dbFields.length}\u5217`);return}let t=Ce(),o=(t.textContent||"").replace(/\s+/g," ").trim(),n=o.length,r=o?o.split(/\s+/).length:0,a=t.querySelectorAll("p, h1, h2, h3, li, pre, blockquote, .memola-callout, .memola-todo, hr").length;k(`\u{1F4C4} ${e.Title||"\u7121\u984C"}: ${n}\u6587\u5B57 / \u7D04${r}\u8A9E / ${a}\u30D6\u30ED\u30C3\u30AF`)}var LE=L(()=>{"use strict";j();He();me();le();_e();K();W();we()});function SE(e){let t=I("pgm");if(t.classList.contains("on")){mp();return}if(!m.currentId){k("\u30DA\u30FC\u30B8\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044");return}let o=e.getBoundingClientRect(),n=o.bottom+4,r=window.innerWidth-o.right;t.style.top=n+"px",t.style.right=r+"px",t.style.left="",t.classList.add("on"),Zl=e}function mp(){I("pgm").classList.remove("on"),Zl=null}function ME(){let e=document.body;e.dataset.memolaPageMenuWired!=="1"&&(e.dataset.memolaPageMenuWired="1",document.addEventListener("mousedown",t=>{let o=I("pgm"),n=t.target;o&&o.classList.contains("on")&&!o.contains(n)&&n!==Zl&&(!Zl||!Zl.contains(n))&&mp()}))}var Zl,PE=L(()=>{"use strict";j();me();le();Zl=null});async function CE(e){let t=Mt(e);if(!t)return[];let o=J(nt(e),"/items("+t+")/versions?$select=VersionLabel,Created,Editor/Title,Body_blocks,Title&$expand=Editor&$orderby=Created desc&$top=50"),n=await ne(o).catch(()=>null);return n?.results?n.results.map(r=>({versionLabel:r.VersionLabel||"",created:r.Created||"",editor:r.Editor?.Title||r.CreatedBy?.Title||"",body:r.Body_blocks||"",title:r.Title||""})):[]}var AE=L(()=>{"use strict";Tt();W()});var DE={};q(DE,{openVersionHistory:()=>pB});function BE(e){if(!e)return"";let t=new Date(e);if(isNaN(t.getTime()))return e;let o=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),a=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${o}/${n}/${r} ${a}:${i}`}async function pB(e,t){ma.render('<div class="memola-versions-box"><div class="memola-versions-hd"><span class="memola-versions-title">\u{1F4DC} \u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74: '+M(t)+'</span><button class="memola-versions-close" title="\u9589\u3058\u308B">\xD7</button></div><div class="memola-versions-body"><div class="memola-versions-loading">\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026</div></div></div>',r=>{r.querySelector(".memola-versions-close")?.addEventListener("click",()=>ma.close())});let o=[];try{o=await CE(e)}catch(r){Uh(t,'<div class="memola-versions-error">\u53D6\u5F97\u5931\u6557: '+M(r.message)+"</div>");return}if(o.length===0){Uh(t,'<div class="memola-versions-empty">\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74\u304C\u3042\u308A\u307E\u305B\u3093\u3002<br><span style="font-size:11px;color:var(--ink-3)">SP \u30EA\u30B9\u30C8\u306E\u300C\u30D0\u30FC\u30B8\u30E7\u30F3\u7BA1\u7406\u8A2D\u5B9A\u300D\u304C\u30AA\u30D5\u306E\u53EF\u80FD\u6027\u304C\u3042\u308A\u307E\u3059\u3002</span></div>');return}let n=o.map((r,a)=>{let i=(r.body||"").replace(/\s+/g," ").slice(0,120),s=a===0;return'<div class="memola-versions-item'+(s?" current":"")+'" data-idx="'+a+'"><div class="memola-versions-itemhd"><span class="memola-versions-label">v'+M(r.versionLabel)+(s?" (\u73FE\u5728)":"")+'</span><span class="memola-versions-time">'+BE(r.created)+'</span><span class="memola-versions-editor">'+M(r.editor||"\u4E0D\u660E")+'</span></div><div class="memola-versions-preview">'+M(i||"(\u672C\u6587\u306A\u3057)")+'</div><div class="memola-versions-actions"><button class="memola-btn s" data-act="preview">\u30D7\u30EC\u30D3\u30E5\u30FC</button>'+(s?"":'<button class="memola-btn p" data-act="restore">\u3053\u306E\u7248\u306B\u623B\u3059</button>')+"</div></div>"}).join("");Uh(t,n,r=>{r.querySelectorAll(".memola-versions-item").forEach(a=>{let i=parseInt(a.dataset.idx||"-1",10);i<0||a.addEventListener("click",async s=>{let l=s.target.closest("button[data-act]");if(!l)return;let c=l.dataset.act,d=o[i];d&&(c==="preview"?uB(d):c==="restore"&&await fB(e,d))})})})}function Uh(e,t,o){ma.render('<div class="memola-versions-box"><div class="memola-versions-hd"><span class="memola-versions-title">\u{1F4DC} \u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74: '+M(e)+'</span><button class="memola-versions-close" title="\u9589\u3058\u308B">\xD7</button></div><div class="memola-versions-body">'+t+"</div></div>",n=>{n.querySelector(".memola-versions-close")?.addEventListener("click",()=>ma.close()),o&&o(n)})}function uB(e){pp.render('<div class="memola-versions-box" style="max-width:760px"><div class="memola-versions-hd"><span class="memola-versions-title">v'+M(e.versionLabel)+' \u30D7\u30EC\u30D3\u30E5\u30FC</span><button class="memola-versions-close">\xD7</button></div><div class="memola-versions-fullpreview">'+tn(ge(e.body))+"</div></div>",t=>{t.querySelector(".memola-versions-close")?.addEventListener("click",()=>pp.close())})}async function fB(e,t){if(confirm("v"+t.versionLabel+" ("+BE(t.created)+" / "+(t.editor||"\u4E0D\u660E")+`) \u306E\u5185\u5BB9\u3067\u73FE\u5728\u306E\u672C\u6587\u3092\u4E0A\u66F8\u304D\u3057\u307E\u3059\u3002

\u73FE\u5728\u306E\u7248\u306F SP \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74\u306B\u6B8B\u308B\u306E\u3067\u3001\u5F8C\u3067\u5143\u306B\u623B\u3059\u3053\u3068\u3082\u53EF\u80FD\u3067\u3059\u3002

\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F`))try{_(!0,"\u5FA9\u5143\u4E2D\u2026");let{apiSavePageBlocks:o}=await Promise.resolve().then(()=>(W(),qe));if(!(await o(e,t.title||"\u7121\u984C",t.body)).ok){k("\u5FA9\u5143\u5931\u6557: \u7AF6\u5408\u3092\u691C\u51FA\u3057\u307E\u3057\u305F\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044","err");return}if(k("v"+t.versionLabel+" \u306B\u5FA9\u5143\u3057\u307E\u3057\u305F"),ma.close(),m.currentId===e){let{doSelect:r}=await Promise.resolve().then(()=>(K(),ie));await r(e)}}catch(o){k("\u5FA9\u5143\u5931\u6557: "+o.message,"err")}finally{_(!1)}}var dB,mB,ma,pp,_E=L(()=>{"use strict";j();le();on();W();AE();Re();er();dB="memola-versions-md",mB="memola-versions-preview",ma=xn({id:dB,className:"memola-versions-md",onEscape:()=>ma.close(),onBackdropClick:()=>ma.close()}),pp=xn({id:mB,className:"memola-versions-md",onEscape:()=>pp.close(),onBackdropClick:()=>pp.close()})});function NE(e){RE||(RE=!0,I("pgm-btn").addEventListener("click",t=>{t.stopPropagation(),hB(),SE(I("pgm-btn"))}),I("pgm").addEventListener("click",async t=>{let o=t.target.closest(".memola-pgm-item");if(!o||!o.dataset.action)return;let n=o.dataset.action;switch(mp(),n){case"export-md":await yE();break;case"export-html":await xE();break;case"duplicate":await IE();break;case"duplicate-as-draft":await yB();break;case"register-template":await gB();break;case"version-history":await xB();break;case"copy-link":await EE();break;case"toggle-scope":await Um();break;case"publish":await bB();break;case"copy-pub-url":await vB();break;case"restore-daily":await fE();break;case"print":wE();break;case"info":TE();break;case"focus":e.toggleFocusMode();break;case"delete":if(m.currentRow){let r=m.currentRow;if(!confirm(`\u3053\u306E\u884C\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F
(\u2318Z \u3067\u5FA9\u5143\u53EF\u80FD)`))break;try{_(!0,"\u884C\u3092\u524A\u9664\u4E2D...");let{deleteRowWithUndo:a}=await Promise.resolve().then(()=>(_o(),fd));await a(r.listTitle,r.itemId),m.currentRow=null;let i=m.pages.find(s=>s.Id===r.dbId);i?await(await Promise.resolve().then(()=>(K(),ie))).doSelectDb(r.dbId,i):tt("empty"),k("\u884C\u3092\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u2318Z \u3067\u5FA9\u5143\u53EF\u80FD\uFF09")}catch(a){k("\u524A\u9664\u5931\u6557: "+a.message,"err")}finally{_(!1)}break}m.currentId&&await ip(m.currentId);break}}),ME())}async function gB(){let e=m.currentId;if(!e||m.currentRow){k("\u30DA\u30FC\u30B8\u3092\u958B\u3044\u3066\u304B\u3089\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044","err");return}try{if(_(!0,"\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u306B\u767B\u9332\u4E2D..."),m.currentType==="database"){let{duplicateDb:o}=await Promise.resolve().then(()=>(We(),Ut));await o(e,{asTemplate:!0})}else{await yt().catch(()=>{});let{apiRegisterPageAsTemplate:o}=await Promise.resolve().then(()=>(W(),qe));await o(e)}let{renderCreateMenuTemplates:t}=await Promise.resolve().then(()=>(Oh(),RI));t(),k("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3068\u3057\u3066\u767B\u9332\u3057\u307E\u3057\u305F(\uFF0B\u65B0\u898F \u2192\u300C\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u300D)")}catch(t){k("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u767B\u9332\u5931\u6557: "+t.message,"err")}finally{_(!1)}}function hB(){let e=document.querySelector(".memola-pgm-publish-label"),t=document.querySelector('[data-action="copy-pub-url"]'),o=document.querySelector('[data-action="publish"]'),n=document.querySelector('[data-action="restore-daily"]'),r=!!m.currentId&&m.currentType==="page"&&!m.currentRow;if(n){let i=r&&m.currentId?A(m.currentId):null;n.style.display=i?.originDailyDate?"":"none"}let a=document.querySelector('[data-action="toggle-scope"]');if(a){let s=!!m.currentId&&(m.currentType==="page"||m.currentType==="database")&&!m.currentRow&&m.currentId?A(m.currentId):null,l=s?.type==="database"&&s.list==="memola-daily",c=!!s&&!s.originPageId&&!s.trashed&&!l;a.style.display=c?"":"none",Promise.resolve().then(()=>(sa(),Ol)).then(d=>d.syncScopeTag())}if(!r){o&&(o.style.display="none"),t&&(t.style.display="none");return}o&&(o.style.display=""),Promise.resolve().then(()=>(Mr(),Sr)).then(i=>{let s=i.isPagePublished(m.currentId);e&&(e.textContent=s?"Web \u516C\u958B\u3092\u89E3\u9664":"Web \u516C\u958B"),t&&(t.style.display=s?"":"none")})}async function bB(){let e=m.currentId;if(!e)return;let t=await Promise.resolve().then(()=>(Mr(),Sr));if(t.isPagePublished(e)){if(!confirm("Web \u516C\u958B\u3092\u89E3\u9664\u3057\u307E\u3059\u3002SP \u4E0A\u306E\u516C\u958B\u30DA\u30FC\u30B8\uFF08Site Page\uFF09\u3082\u524A\u9664\u3055\u308C\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F"))return;try{await t.unpublishPage(e),k("\u516C\u958B\u3092\u89E3\u9664\u3057\u307E\u3057\u305F")}catch(o){k("\u89E3\u9664\u5931\u6557: "+o.message,"err")}kn()}else{await yt();let n=(I("ttl")?.value||"").trim()||"\u7121\u984C",{getBlocks:r}=await Promise.resolve().then(()=>(bt(),zo)),{blocksToMd:a}=await Promise.resolve().then(()=>(St(),Hp)),i=a(r());try{let s=await t.publishPage(e,n,i);try{await navigator.clipboard.writeText(s)}catch{}k("\u516C\u958B\u3057\u307E\u3057\u305F\uFF08URL \u3092\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC\uFF09")}catch(s){k("\u516C\u958B\u5931\u6557: "+s.message,"err")}kn()}}async function vB(){let e=m.currentId;if(!e)return;let o=(await Promise.resolve().then(()=>(Mr(),Sr))).publishedUrlFor(e);try{await navigator.clipboard.writeText(o),k("URL \u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")}catch{k("\u30B3\u30D4\u30FC\u5931\u6557","err")}}async function yB(){let e=m.currentId;if(e){if(m.currentType!=="page"||m.currentRow){k("\u3053\u306E\u30DA\u30FC\u30B8\u306F\u4E0B\u66F8\u304D\u8907\u88FD\u306B\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u305B\u3093","err");return}await yt();try{_(!0,"\u4E0B\u66F8\u304D\u3092\u8907\u88FD\u4E2D\u2026");let{apiDuplicateAsDraft:t,apiGetPages:o}=await Promise.resolve().then(()=>(W(),qe)),n=await t(e);await o(),te(),ko(),await Ue(n.Id),k("\u4E0B\u66F8\u304D\u3092\u4F5C\u6210\u3057\u307E\u3057\u305F\u3002\u672C\u30E9\u30A4\u30D6\u30E9\u30EA\u306B\u306F\u8868\u793A\u3055\u308C\u307E\u305B\u3093 \u2014 \u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u300C\u{1F4DD} \u4E0B\u66F8\u304D\u300D \u304B\u3089\u518D\u5EA6\u958B\u3051\u307E\u3059")}catch(t){k("\u4E0B\u66F8\u304D\u8907\u88FD\u5931\u6557: "+t.message,"err")}finally{_(!1)}}}async function xB(){let e=m.currentId;if(!e)return;let t=m.pages.find(n=>n.Id===e);if(!t)return;let{openVersionHistory:o}=await Promise.resolve().then(()=>(_E(),DE));await o(e,t.Title||"\u7121\u984C")}var RE,OE=L(()=>{"use strict";j();me();le();_e();K();jm();sa();En();kE();LE();PE();Hh();ht();Wo();we();RE=!1});var up={};q(up,{applyRelayUpdate:()=>LB,checkRelayUpdate:()=>EB,getRelayBundleDir:()=>wB,setRelayBundleDir:()=>kB});function Ql(){let e=lo.get();if(e)try{return new URL(e).origin}catch{}return"http://localhost:18080"}function HE(){return G.replace(/\/+$/,"")+"/Shared Documents/memola"}async function wB(){try{let e=await fetch(Ql()+"/memola/bundle-dir",{signal:AbortSignal.timeout(4e3)});if(!e.ok)return null;let t=await e.json();return{dir:String(t.dir||""),exists:!!t.exists,hasBundle:!!t.hasBundle}}catch{return null}}async function kB(e){try{let t=await fetch(Ql()+"/memola/bundle-dir",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({dir:e}),signal:AbortSignal.timeout(4e3)});if(!t.ok)return null;let o=await t.json();return{dir:String(o.dir||""),exists:!!o.exists,hasBundle:!!o.hasBundle}}catch{return null}}async function FE(){try{return(await fetch(Ql()+"/memola/health",{signal:AbortSignal.timeout(3e3)})).ok}catch{return!1}}async function IB(){try{let e=await fetch(HE()+"/relay-version.txt?t="+Date.now(),{credentials:"same-origin",cache:"no-cache"});if(!e.ok)return null;let t=JSON.parse(await e.text());return t.version&&Array.isArray(t.files)?t:null}catch{return null}}async function UE(){try{let e=await fetch(Ql()+"/memola/relay/version",{signal:AbortSignal.timeout(7e3)});return e.ok?await e.json():null}catch{return null}}async function EB(){if(!await FE())return{available:null,detail:"relay \u672A\u8D77\u52D5"};let[e,t]=await Promise.all([IB(),UE()]);return e?t?.version?e.version===t.version?{available:null,detail:`\u540C\u3058\u30D0\u30FC\u30B8\u30E7\u30F3 (v${t.version})`}:{available:{localVersion:t.version,remoteVersion:e.version,files:e.files},detail:`v${t.version} \u2192 v${e.version}`}:{available:null,detail:"relay /memola/relay/version \u53D6\u5F97\u5931\u6557"}:{available:null,detail:"SP \u306E relay-version.txt \u53D6\u5F97\u5931\u6557(\u914D\u7F6E\u3092\u78BA\u8A8D)"}}async function TB(e){try{let t=await fetch(HE()+"/"+e+"?t="+Date.now(),{credentials:"same-origin",cache:"no-cache"});if(!t.ok)return null;let o=await t.arrayBuffer();if(!o.byteLength)return null;let n="",r=new Uint8Array(o);for(let a=0;a<r.length;a+=32768)n+=String.fromCharCode.apply(null,Array.from(r.subarray(a,a+32768)));return{name:e,contentBase64:btoa(n)}}catch{return null}}async function LB(e){let t=[];for(let n of e){let r=await TB(n);if(!r)return{ok:!1,relayBackUp:!0,newVersion:null,error:`SP \u304B\u3089\u306EDL\u5931\u6557: ${n}`};t.push(r)}try{let n=await fetch(Ql()+"/memola/relay/self-update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({files:t}),signal:AbortSignal.timeout(3e4)});if(!n.ok){let r="";try{r=(await n.json())?.error?.detail??""}catch{}return{ok:!1,relayBackUp:!0,newVersion:null,error:`self-update HTTP ${n.status}: ${r}`}}try{await n.json()}catch{}}catch{}let o=Date.now();for(;Date.now()-o<25e3;)if(await new Promise(n=>setTimeout(n,1e3)),await FE())return{ok:!0,relayBackUp:!0,newVersion:(await UE())?.version??null};return{ok:!1,relayBackUp:!1,newVersion:null,error:"relay \u304C25\u79D2\u4EE5\u5185\u306B\u518D\u8D77\u52D5\u3057\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u624B\u52D5\u3067 memola-start.bat \u3092\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044"}}var fp=L(()=>{"use strict";He();ve()});var jE={};q(jE,{countResetTargets:()=>MB,resetAll:()=>AB,resetMyPrivateData:()=>PB,resetOthersData:()=>CB});async function zh(){let e=Jt(),t=[Ee(ce)];return e!==ce&&t.push(Ee(e).catch(()=>[])),(await Promise.all(t)).flat()}async function SB(){let e=G+"/_api/web/lists?$select=Title&$filter="+encodeURIComponent("startswith(Title,'memola-')")+"&$top=500";return(await ne(e).catch(()=>null))?.results?.map(o=>o.Title)||[]}async function jh(e,t){let o=[],n=0,a=["(startswith(Title,'memola-') or substringof('memola-',DirName))"];t&&e&&a.push("DeletedById eq "+e);let i=a.join(" and "),s=await xe().catch(()=>"");if(!s)return o.push("digest \u53D6\u5F97\u5931\u6557 (recycle bin \u30B9\u30AD\u30C3\u30D7)"),{count:n,errors:o};for(let l of["web","site"]){let c=G+"/_api/"+l+"/recycleBin?$select=Id,Title,DirName&$filter="+encodeURIComponent(i)+"&$top=5000",d=await ne(c).catch(u=>(o.push(`${l} bin \u53D6\u5F97\u5931\u6557: ${u.message||u}`),null));if(!d?.results)continue;let p=0;for(let u of d.results){p>0&&p%50===0&&(s=await xe().catch(()=>s)),p++;try{let f=await fetch(G+"/_api/"+l+"/RecycleBin('"+u.Id+"')/DeleteObject()",{method:"POST",headers:{"X-RequestDigest":s,Accept:"application/json;odata=verbose"},credentials:"include"});if(f.ok||f.status===404){n++;continue}if(f.status===401||f.status===403){s=await xe().catch(()=>s);let g=await fetch(G+"/_api/"+l+"/RecycleBin('"+u.Id+"')/DeleteObject()",{method:"POST",headers:{"X-RequestDigest":s,Accept:"application/json;odata=verbose"},credentials:"include"});if(g.ok||g.status===404){n++;continue}o.push((u.Title||u.Id)+": "+g.status+" (\u6A29\u9650\u4E0D\u8DB3? \u518D\u8A66\u884C\u3082\u5931\u6557)");continue}o.push((u.Title||u.Id)+": HTTP "+f.status)}catch(f){o.push((u.Title||u.Id)+": "+f.message)}}}return{count:n,errors:o}}async function zE(e,t,o){let{deleteListItem:n}=await Promise.resolve().then(()=>(De(),mo)),{deleteRowEntry:r}=await Promise.resolve().then(()=>(W(),qe)),a=0,i=[];try{i=await Ee("memola-daily")}catch(s){return s.message?.includes("404")||o.push("memola-daily \u53D6\u5F97\u5931\u6557: "+s.message),0}for(let s of i){let l=s.AuthorId||0;if(t==="mine"?l===e:l!==e)try{await n("memola-daily",s.Id),await r("memola-daily",s.Id).catch(()=>{}),a++}catch(d){o.push("memola-daily row #"+s.Id+": "+d.message)}}return a}async function MB(e){let t=m.meta.myUserId||await pt().catch(()=>0),o=[];try{o=await zh()}catch{return{pages:0,dbs:0,dailyRows:0}}let n=o.filter(s=>s.PageType==="row"||e!=="all"&&s.PageType==="database"&&s.ListTitle==="memola-daily"?!1:e==="all"?!0:e==="mine"?s.Scope==="user"&&s.AuthorId===t:s.Scope==="org"||s.Scope==="user"&&s.AuthorId!==t||!s.Scope&&s.AuthorId!==t),r=0,a=0;for(let s of n)s.PageType==="database"?a++:r++;let i=0;if(e==="mine"||e==="others")try{let s=await Ee("memola-daily");for(let l of s){let c=l.AuthorId||0;(e==="mine"?c===t:c!==t)&&i++}}catch{}return{pages:r,dbs:a,dailyRows:i}}async function PB(){let e={pagesDeleted:0,dbsDeleted:0,spListsDeleted:0,recycleBinPurged:0,errors:[]},t=m.meta.myUserId||await pt().catch(()=>0);if(!t)return e.errors.push("SP \u30E6\u30FC\u30B6 ID \u3092\u89E3\u6C7A\u3067\u304D\u307E\u305B\u3093 \u2014 \u4E2D\u6B62"),e;let n=(await zh()).filter(a=>a.PageType!=="row"&&a.Scope==="user"&&a.AuthorId===t&&!(a.PageType==="database"&&a.ListTitle==="memola-daily"));for(let a of n)try{await Br(String(a.Id)),a.PageType==="database"?e.dbsDeleted++:e.pagesDeleted++}catch(i){e.errors.push(i.message)}e.pagesDeleted+=await zE(t,"mine",e.errors);let r=await jh(t,!0);e.recycleBinPurged=r.count,e.errors.push(...r.errors);try{await ct()}catch{}return e}async function CB(){let e={pagesDeleted:0,dbsDeleted:0,spListsDeleted:0,recycleBinPurged:0,errors:[]},t=m.meta.myUserId||await pt().catch(()=>0),n=(await zh()).filter(a=>a.PageType!=="row"&&(a.Scope==="org"||a.Scope==="user"&&a.AuthorId!==t||!a.Scope&&a.AuthorId!==t)&&!(a.PageType==="database"&&a.ListTitle==="memola-daily"));for(let a of n)try{await Br(String(a.Id)),a.PageType==="database"?e.dbsDeleted++:e.pagesDeleted++}catch(i){e.errors.push(i.message)}e.pagesDeleted+=await zE(t,"others",e.errors);let r=await jh(t,!0);e.recycleBinPurged=r.count,e.errors.push(...r.errors);try{await ct()}catch{}return e}async function AB(){let e={pagesDeleted:0,dbsDeleted:0,spListsDeleted:0,recycleBinPurged:0,errors:[]},t=await SB();for(let n of t)try{await Aa(n),e.spListsDeleted++}catch(r){e.errors.push(n+": "+r.message)}let o=await jh(0,!1);e.recycleBinPurged=o.count,e.errors.push(...o.errors);try{let n=[];for(let r=0;r<localStorage.length;r++){let a=localStorage.key(r);a&&a.startsWith("memola.")&&n.push(a)}for(let r of n)localStorage.removeItem(r)}catch(n){e.errors.push("localStorage: "+n.message)}try{let{ragHardReset:n}=await Promise.resolve().then(()=>(wf(),nx));await n()}catch(n){e.errors.push("rag: "+n.message)}return e}var qE=L(()=>{"use strict";j();Xt();De();Tt();He();br();W()});function WE(){if(KE)return;KE=!0;let e=document.getElementById("memola-settings-btn"),t=document.getElementById("memola-settings-md"),o=document.getElementById("memola-set-aikey"),n=document.getElementById("memola-set-provider"),r=document.getElementById("memola-set-claude-model"),a=document.getElementById("memola-set-corpai-model"),i=document.getElementById("memola-set-corpai-key"),s=document.getElementById("memola-set-corpai-baseurl"),l=document.getElementById("memola-set-corpai-prefix"),c=document.getElementById("memola-set-corpai-overrides"),d=document.getElementById("memola-set-localai-baseurl"),p=document.getElementById("memola-set-localai-key"),u=document.getElementById("memola-set-localai-model"),f=document.getElementById("memola-set-localai-models"),g=document.getElementById("memola-set-localai-reasoning"),y=document.getElementById("memola-set-embed-provider"),b=document.getElementById("memola-set-voyage-key"),h=document.getElementById("memola-set-voyage-model"),v=document.getElementById("memola-set-embed-model"),x=document.getElementById("memola-set-embed-apiver"),w=document.getElementById("memola-set-embed-dims"),T=document.getElementById("memola-set-rag-topk"),E=document.getElementById("memola-set-rag-minscore"),B=document.getElementById("memola-set-density"),U=document.getElementById("memola-set-theme"),P=document.getElementById("memola-set-savedelay"),O=document.getElementById("memola-set-syncpoll"),D=document.getElementById("memola-set-presence");if(document.getElementById("memola-set-shortcuts")?.addEventListener("click",()=>lh()),document.getElementById("memola-set-relay-update")?.addEventListener("click",()=>{DB()}),document.getElementById("memola-set-reset-mine")?.addEventListener("click",()=>qh("mine","\u81EA\u5206\u306E\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u306E\u307F\u524A\u9664")),document.getElementById("memola-set-reset-others")?.addEventListener("click",()=>qh("others","\u7D44\u7E54+\u4ED6\u4EBA\u306E\u30C7\u30FC\u30BF\u3092\u524A\u9664")),document.getElementById("memola-set-reset-all")?.addEventListener("click",()=>qh("all","\u5168\u30C7\u30FC\u30BF + \u8A2D\u5B9A\u3092\u521D\u671F\u5316")),!e||!t||!o||!n||!r||!a||!i||!s||!l||!c||!d||!p||!u||!f||!g||!B||!U||!P||!O||!D)return;Promise.resolve().then(()=>(Bt(),jn)).then(se=>{se.CLAUDE_MODELS.forEach(F=>{let de=document.createElement("option");de.value=F.id,de.textContent=F.label,r.appendChild(de)}),se.CORP_AI_MODELS.forEach(F=>{let de=document.createElement("option");de.value=F.id,de.textContent=F.id+(F.reasoning?" (\u63A8\u8AD6)":"")+(F.vision?" \u{1F5BC}":""),a.appendChild(de)}),v&&se.EMBEDDING_MODELS.forEach(F=>{let de=document.createElement("option");de.value=F,de.textContent=F,v.appendChild(de)}),h&&se.VOYAGE_MODELS.forEach(F=>{let de=document.createElement("option");de.value=F,de.textContent=F,h.appendChild(de)})});let H=n;function X(){let se=H.value,F=y?.value||"voyage";document.querySelectorAll(".memola-set-row[data-prov],.memola-set-row[data-embprov]").forEach(de=>{let Ie=de.dataset.prov,It=de.dataset.embprov,Ge=!Ie||Ie.split(",").map(Wt=>Wt.trim()).includes(se),Nt=!It||It.split(",").map(Wt=>Wt.trim()).includes(F);de.style.display=Ge&&Nt?"":"none"})}H.addEventListener("change",X),y?.addEventListener("change",X),document.querySelectorAll(".memola-set-tab").forEach(se=>{se.addEventListener("click",()=>{let F=se.dataset.tab;F&&(document.querySelectorAll(".memola-set-tab").forEach(de=>de.classList.toggle("on",de===se)),document.querySelectorAll(".memola-set-pane").forEach(de=>de.classList.toggle("on",de.dataset.pane===F)),F==="dev"&&BB())})}),e.addEventListener("click",()=>{document.querySelectorAll(".memola-set-tab").forEach(F=>F.classList.toggle("on",F.dataset.tab==="ai")),document.querySelectorAll(".memola-set-pane").forEach(F=>F.classList.toggle("on",F.dataset.pane==="ai"));let se=document.getElementById("memola-set-build-id");se&&(se.textContent="260606-0814-9eec9d"),Promise.resolve().then(()=>(Bt(),jn)).then(F=>{try{n.value=F.getProvider(),r.value=F.getClaudeModel(),a.value=F.getCorpAiModel(),o.value=qr()||"",i.value=F.getCorpAiKey(),s.value=F.getCorpAiBaseUrl(),l.value=F.getCorpAiDeploymentPrefix(),c.value=F.getCorpAiOverridesRaw(),d.value=F.getLocalAiBaseUrl(),p.value=F.getLocalAiKey(),u.value=F.getLocalAiModel(),f.value=F.getLocalAiModels().join(`
`),g.value=F.getLocalAiReasoningModels().join(" "),y&&(y.value=F.getEmbedProvider()),b&&(b.value=F.getVoyageKey()),h&&(h.value=F.getVoyageModel()),v&&(v.value=F.getEmbeddingModel()),x&&(x.value=F.getEmbeddingApiVersion()),w&&(w.value=F.getEmbeddingDimensions()?.toString()||""),T&&(T.value=String(F.getRagTopK())),E&&(E.value=String(F.getRagMinScore()));let de=document.getElementById("memola-set-rag-extvec-folder");de&&(de.value=Ea.get());{let Ie=new Set(Ta.get().split(",").map(It=>It.trim()));for(let It of $E){let Ge=document.getElementById("memola-set-rag-extvec-"+It);Ge&&(Ge.checked=Ie.has(It))}}B.value=ts.get(),U.value=os.get(),P.value=La.get(),O.value=Ln.get(),D.value=hr.get();{let Ie=document.getElementById("memola-set-dev-source"),It=document.getElementById("memola-set-dev-localbase");Ie&&(Ie.value=es.get()==="local"?"local":"sharepoint"),It&&(It.value=gc.get())}}catch{}X(),t.classList.add("on")})});let oe=!1;t.addEventListener("mousedown",se=>{oe=se.target===t}),t.addEventListener("click",se=>{se.target===t&&oe&&t.classList.remove("on"),oe=!1}),document.getElementById("memola-set-cancel")?.addEventListener("click",()=>t.classList.remove("on")),document.getElementById("memola-set-save")?.addEventListener("click",()=>{let se=c.value.trim();if(se)try{let F=JSON.parse(se);if(!F||typeof F!="object"||Array.isArray(F)){k("\u30AA\u30FC\u30D0\u30FC\u30E9\u30A4\u30C9 JSON \u306F\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u5F62\u5F0F\u3067\u66F8\u3044\u3066\u304F\u3060\u3055\u3044","err");return}}catch(F){k("\u30AA\u30FC\u30D0\u30FC\u30E9\u30A4\u30C9 JSON \u304C\u4E0D\u6B63\u3067\u3059: "+F.message,"err");return}Promise.resolve().then(()=>(Bt(),jn)).then(F=>{try{F.setProvider(n.value),r.value&&F.setClaudeModel(r.value),a.value&&F.setCorpAiModel(a.value),Lf(o.value),F.setCorpAiKey(i.value),F.setCorpAiBaseUrl(s.value),F.setCorpAiDeploymentPrefix(l.value),F.setCorpAiOverridesRaw(c.value),F.setLocalAiBaseUrl(d.value),F.setLocalAiKey(p.value),F.setLocalAiModel(u.value);let Ie=f.value.split(/\r?\n/).map(Ge=>Ge.trim()).filter(Boolean);F.setLocalAiModels(Ie),F.setLocalAiReasoningModels(g.value),y&&F.setEmbedProvider(y.value),b&&F.setVoyageKey(b.value),h&&F.setVoyageModel(h.value),v&&F.setEmbeddingModel(v.value),x&&F.setEmbeddingApiVersion(x.value),w&&F.setEmbeddingDimensions(w.value),T&&F.setRagTopK(T.value),E&&F.setRagMinScore(E.value);{let Ge=document.getElementById("memola-set-rag-extvec-folder");Ge&&Ea.set(Ge.value.trim());let Nt=[];for(let Wt of $E)document.getElementById("memola-set-rag-extvec-"+Wt)?.checked&&Nt.push(Wt);Ta.set(Nt.join(","))}{let Ge=document.getElementById("memola-set-dev-source"),Nt=document.getElementById("memola-set-dev-localbase");Ge&&(Ge.value==="local"?es.set("local"):es.clear()),Nt&&gc.set(Nt.value.trim());let Wt=document.getElementById("memola-set-dev-relaydir");Wt&&Wt.value.trim()&&Promise.resolve().then(()=>(fp(),up)).then(Gt=>Gt.setRelayBundleDir(Wt.value.trim()).then(pr=>{let tc=document.getElementById("memola-set-dev-relaydir-status");tc&&(tc.textContent=pr?`\u73FE\u5728: ${pr.dir} ${pr.hasBundle?"\u2705 memola.bundle.js \u3042\u308A":"\u26A0 memola.bundle.js \u304C\u7121\u3044"}`:"\u26A0 relay \u672A\u8D77\u52D5 / \u8A2D\u5B9A\u5931\u6557")}))}ts.set(B.value),os.set(U.value),La.set(P.value),Ln.set(O.value);let It=hr.get();hr.set(D.value),m.sync.pageId&&m.sync.loadedModified&&m.sync.loadedEtag&&Promise.resolve().then(()=>(Wr(),Om)).then(Ge=>{Ge.startWatching(m.sync.pageId,m.sync.loadedModified,m.sync.loadedEtag)}),It!==D.value&&Promise.resolve().then(()=>(Fl(),oh)).then(Ge=>{D.value==="0"?Ge.shutdownPresence():Ge.syncPresenceForCurrent()})}catch{}let de=document.getElementById("memola-overlay");de&&(de.dataset.density=B.value,de.dataset.theme=U.value),Promise.resolve().then(()=>(mr(),Yi)).then(Ie=>Ie.syncProviderBadge?.()),t.classList.remove("on"),k("\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F")})});let Me=document.getElementById("memola-overlay");Me&&(Me.dataset.density=ts.get(),Me.dataset.theme=os.get())}async function BB(){let e=document.getElementById("memola-set-dev-relaydir"),t=document.getElementById("memola-set-dev-relaydir-status");t&&(t.textContent="relay \u306B\u7167\u4F1A\u4E2D\u2026");let{getRelayBundleDir:o}=await Promise.resolve().then(()=>(fp(),up)),n=await o();if(!n){t&&(t.textContent="\u26A0 relay \u672A\u8D77\u52D5 / \u5FDC\u7B54\u306A\u3057(memola-start.bat \u3067\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044)");return}e&&!e.value&&(e.value=n.dir),t&&(t.textContent=`\u73FE\u5728: ${n.dir}  ${n.hasBundle?"\u2705 memola.bundle.js \u3042\u308A":"\u26A0 memola.bundle.js \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093"}`)}async function DB(){let e=document.getElementById("memola-set-relay-update-msg"),t=s=>{e&&(e.textContent=s)},{checkRelayUpdate:o,applyRelayUpdate:n}=await Promise.resolve().then(()=>(fp(),up));t("\u78BA\u8A8D\u4E2D\u2026");let r=await o();if(!r.available){t("\u66F4\u65B0\u306A\u3057: "+r.detail);return}let a=r.available;if(!confirm(`\u30EA\u30EC\u30FC\u3092\u66F4\u65B0\u3057\u307E\u3059\u3002
  ${a.localVersion} \u2192 ${a.remoteVersion}
\u5BFE\u8C61: ${a.files.join(", ")}
\u30EA\u30EC\u30FC\u306F\u4E00\u5EA6\u505C\u6B62\u3057\u3066\u518D\u8D77\u52D5\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?`)){t("\u30AD\u30E3\u30F3\u30BB\u30EB\u3057\u307E\u3057\u305F ("+r.detail+")");return}t("\u66F4\u65B0\u3092\u9069\u7528\u4E2D\u2026 (\u30EA\u30EC\u30FC\u518D\u8D77\u52D5\u3092\u5F85\u3063\u3066\u3044\u307E\u3059\u3002\u6700\u592725\u79D2)");let i=await n(a.files);i.ok?(t(`\u2705 \u66F4\u65B0\u5B8C\u4E86\u3002\u30EA\u30EC\u30FC v${i.newVersion??"?"} \u3067\u518D\u8D77\u52D5\u3057\u307E\u3057\u305F\u3002`),k("\u30EA\u30EC\u30FC\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F","ok")):(t("\u274C "+(i.error||"\u66F4\u65B0\u5931\u6557")),k("\u30EA\u30EC\u30FC\u66F4\u65B0\u306B\u5931\u6557: "+(i.error||""),"err"))}async function qh(e,t){let o=await Promise.resolve().then(()=>(qE(),jE));_(!0,"\u5BFE\u8C61\u3092\u96C6\u8A08\u4E2D...");let n;try{n=await o.countResetTargets(e)}catch(i){_(!1),k("\u96C6\u8A08\u5931\u6557: "+i.message,"err");return}_(!1);let r=n.pages+n.dbs+n.dailyRows,a=e==="all"?"\u5168 memola-* SP \u30EA\u30B9\u30C8 + \u5168 memola.* localStorage \u30AD\u30FC":`\u30DA\u30FC\u30B8 ${n.pages} \u4EF6 + DB ${n.dbs} \u4EF6`+(n.dailyRows>0?` + \u30C7\u30A4\u30EA\u30FC ${n.dailyRows} \u4EF6`:"");if(r===0&&e!=="all"){k("\u524A\u9664\u5BFE\u8C61\u306E\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093");return}if(confirm("\u3010"+t+`\u3011

\u524A\u9664\u5BFE\u8C61: `+a+`

\u26A0 \u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002SP \u306E\u3054\u307F\u7BB1\u304B\u3089\u3082\u5FA9\u5143\u3067\u304D\u307E\u305B\u3093\u3002

\u672C\u5F53\u306B\u5B9F\u884C\u3057\u307E\u3059\u304B?`)&&confirm("\u6700\u7D42\u78BA\u8A8D: \u5B9F\u884C\u3059\u308B\u3068\u5373\u5EA7\u306B SP \u304B\u3089\u30C7\u30FC\u30BF\u304C\u524A\u9664\u3055\u308C\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?")){_(!0,"\u524A\u9664\u4E2D... (\u6642\u9593\u304C\u304B\u304B\u308B\u5834\u5408\u304C\u3042\u308A\u307E\u3059)");try{let i=e==="mine"?await o.resetMyPrivateData():e==="others"?await o.resetOthersData():await o.resetAll(),s=e==="all"?`SP \u30EA\u30B9\u30C8 ${i.spListsDeleted} \u4EF6 / \u5B8C\u5168\u524A\u9664 ${i.recycleBinPurged} \u4EF6`:`\u30DA\u30FC\u30B8 ${i.pagesDeleted} / DB ${i.dbsDeleted} / \u5B8C\u5168\u524A\u9664 ${i.recycleBinPurged} \u4EF6`,l="";if(i.errors.length>0){let c=i.errors[0].length>80?i.errors[0].slice(0,80)+"\u2026":i.errors[0];l=i.errors.length===1?` (\u5931\u6557 1 \u4EF6: ${c})`:` (\u5931\u6557 ${i.errors.length} \u4EF6\u3001\u6700\u521D: ${c})`,console.warn("[Memola reset errors]",i.errors),setTimeout(()=>{let d=i.errors.slice(0,20).join(`
`),p=i.errors.length>20?`
\u2026\u4ED6 ${i.errors.length-20} \u4EF6 (\u30B3\u30F3\u30BD\u30FC\u30EB\u53C2\u7167)`:"";alert(`\u3010\u30EA\u30BB\u30C3\u30C8\u306E\u5931\u6557\u8A73\u7D30 \u2014 ${i.errors.length} \u4EF6\u3011

${d}${p}`)},800)}if(e!=="all"){let{renderTree:c}=await Promise.resolve().then(()=>(_e(),wo));c();let d=await Promise.resolve().then(()=>(K(),ie));if(m.currentRow){let p=m.currentRow.dbId,u=m.pages.some(f=>f.Id===p);if(m.currentRow=null,u){let f=m.pages.find(g=>g.Id===p);f&&await d.doSelectDb(p,f)}else m.currentId=null,tt("empty")}else if(m.currentType==="database"&&m.currentId){let p=m.pages.find(u=>u.Id===m.currentId);p?await d.doSelectDb(m.currentId,p):(m.currentId=null,tt("empty"))}else m.currentId&&m.pages.some(u=>u.Id===m.currentId)||(m.currentId=null,tt("empty"))}k(t+" \u5B8C\u4E86: "+s+l,i.errors.length>0?"err":"ok"),document.getElementById("memola-settings-md")?.classList.remove("on"),e==="all"&&setTimeout(()=>{confirm("\u5B8C\u5168\u30EA\u30BB\u30C3\u30C8\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002SP \u30DA\u30FC\u30B8\u3092\u4ECA\u3059\u3050\u30EA\u30ED\u30FC\u30C9\u3057\u307E\u3059\u304B?")&&location.reload()},500)}catch(i){k("\u30EA\u30BB\u30C3\u30C8\u5931\u6557: "+i.message,"err")}finally{_(!1)}}}var $E,KE,GE=L(()=>{"use strict";j();le();K();ui();ve();Xm();$E=["mail","onenote","pptx","doc","transcript"],KE=!1});var XE={};q(XE,{attachPaneResizers:()=>NB});function _B(e){let t=document.getElementById(e.paneId);if(!t)return;let o=e.pref.get();if(!o)return;let n=parseInt(o,10);isNaN(n)||(t.style.width=Math.min(e.max,Math.max(e.min,n))+"px")}function YE(e){let t=document.getElementById(e.paneId);if(!t)return;let o=t.querySelector(":scope > .memola-pane-resize");o||(o=document.createElement("div"),o.className="memola-pane-resize memola-pane-resize-"+e.edge,o.title="\u5E45\u3092\u5909\u66F4 (\u30C9\u30E9\u30C3\u30B0)",t.appendChild(o),t.style.position=t.style.position||"relative",o.addEventListener("mousedown",n=>RB(n,e)),o.addEventListener("dblclick",()=>{e.pref.clear(),t.style.width=""})),o.style.display=e.enabled&&!e.enabled()?"none":""}function RB(e,t){let o=document.getElementById(t.paneId);if(!o)return;let n=o;e.preventDefault(),e.stopPropagation();let r=e.clientX,a=n.offsetWidth,i=t.edge==="right"?1:-1;document.body.style.cursor="col-resize",document.body.style.userSelect="none";let s=document.getElementById("memola-overlay");s?.classList.add("memola-resizing");function l(d){let p=(d.clientX-r)*i,u=Math.min(t.max,Math.max(t.min,a+p));n.style.width=u+"px"}function c(){document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",c),document.body.style.cursor="",document.body.style.userSelect="",s?.classList.remove("memola-resizing"),t.pref.set(String(n.offsetWidth))}document.addEventListener("mousemove",l),document.addEventListener("mouseup",c)}function NB(){VE.forEach(t=>{_B(t),YE(t)});let e=document.getElementById("memola-sb");e&&new MutationObserver(()=>{let o=VE.find(n=>n.paneId==="memola-sb");o&&YE(o)}).observe(e,{attributes:!0,attributeFilter:["class"]})}var VE,JE=L(()=>{"use strict";ve();VE=[{paneId:"memola-sb",edge:"right",pref:Ep,min:160,max:360,enabled:()=>{let e=document.getElementById("memola-sb");return!!e&&!e.classList.contains("collapsed")}},{paneId:"memola-outline",edge:"right",pref:Tp,min:180,max:400},{paneId:"memola-props",edge:"left",pref:Lp,min:200,max:480},{paneId:"memola-ai-panel",edge:"left",pref:Sp,min:240,max:500}]});function QE(){if(ZE)return;ZE=!0,I("ai-btn").addEventListener("click",Gl),I("ai-close").addEventListener("click",op),I("ai-clear").addEventListener("click",Th),document.getElementById("memola-ai-new")?.addEventListener("click",()=>tp()),I("ai-hist").addEventListener("change",()=>{let n=I("ai-hist").value;n==="__new__"?tp():wh(n)}),dr(),Ih(),Promise.resolve().then(()=>(JE(),XE)).then(n=>n.attachPaneResizers()),Promise.resolve().then(()=>(mr(),Yi)).then(n=>n.syncProviderBadge?.());let e=document.getElementById("memola-ai-model-pick");e&&e.addEventListener("change",()=>{Promise.resolve().then(()=>(mr(),Yi)).then(n=>n.applyModelPick?.(e.value))}),I("ai-send").addEventListener("click",()=>{let n=I("ai-input");Vl(n.value)}),I("ai-input").addEventListener("keydown",n=>{let r=n;if(!(r.isComposing||r.keyCode===229)&&r.key==="Enter"&&!r.shiftKey){n.preventDefault();let a=I("ai-input");Vl(a.value)}});let t=I("ai-input");t.addEventListener("input",()=>{t.style.height="auto",t.style.height=Math.min(t.scrollHeight,232)+"px",t.scrollTop=t.scrollHeight});let o=I("ai-chips");Lh().forEach(n=>{let r=document.createElement("button");r.className="memola-ai-chip",r.textContent=n.label,r.addEventListener("click",()=>{Vl(n.prompt)}),o.appendChild(r)})}var ZE,e1=L(()=>{"use strict";me();mr();ZE=!1});function $h(){let e=document.getElementById("memola-overlay");if(!e)return;if(Sa.get()==="1")e.classList.add("focus-mode"),document.getElementById("memola-sb")?.classList.add("collapsed");else{e.classList.remove("focus-mode");let o=Ma.get(),n=document.getElementById("memola-sb");n&&(n.classList.remove("collapsed"),o==="collapsed"&&n.classList.add("collapsed"))}}function gp(){Sa.get()==="1"?Sa.clear():Sa.set("1"),$h()}function hp(){let e=document.getElementById("memola-sb");e&&(window.innerWidth<900?e.classList.contains("collapsed")||(e.dataset.autoCollapsed="1",e.classList.add("collapsed")):e.dataset.autoCollapsed==="1"&&(delete e.dataset.autoCollapsed,e.classList.remove("collapsed")))}var Kh=L(()=>{"use strict";ve()});function vp(){I("trash-md").classList.add("on"),bp();let t=document.getElementById("memola-trash-empty");t&&!t.dataset.wired&&(t.dataset.wired="1",t.addEventListener("click",()=>{OB()}))}function Gh(){I("trash-md").classList.remove("on")}async function t1(){let e=m.meta.myUserId||0,t=(r,a)=>r!=="user"||!e||!a?!1:a!==e,o=[];for(let r of gu()){let a=A(r.id);t(a?.scope,a?.authorId||0)||o.push({kind:r.type==="database"?"database":"page",bodyId:r.id,title:r.title,trashedAt:r.trashed,trashedBy:a?.trashedBy||0})}let n=[];try{n=await ou()}catch{}for(let r of n){if(t(r.scope,r.authorId))continue;let a=m.meta.pages.find(i=>i.type==="database"&&i.list===r.listTitle);a&&t(a.scope,a.authorId||0)||o.push({kind:"row",bodyId:String(r.bodyId),title:r.title||"(\u7121\u984C\u306E\u884C)",trashedAt:r.trashedAt,trashedBy:r.trashedBy,rowListTitle:r.listTitle,rowDbRowId:r.dbRowId,rowParentDbTitle:a?.title||"(\u524A\u9664\u6E08\u307FDB)"})}return o.sort((r,a)=>a.trashedAt-r.trashedAt),o}async function Wh(e){if(m.dbList===e)try{let{getListItems:t}=await Promise.resolve().then(()=>(De(),mo)),o=await t(e);m.dbItems=o.filter(r=>!(typeof r.Trashed=="number"&&r.Trashed>0));let{renderDbTable:n}=await Promise.resolve().then(()=>(K(),ie));n()}catch{}}async function OB(){let e=await t1(),t=m.meta.myUserId||0,o=e.filter(c=>c.trashedBy===t),n=e.filter(c=>c.trashedBy!==t);if(o.length===0){n.length>0?k(`\u4ED6\u306E\u30E6\u30FC\u30B6\u306E ${n.length} \u4EF6\u306F\u3042\u306A\u305F\u304C\u5B8C\u5168\u524A\u9664\u3067\u304D\u307E\u305B\u3093`):k("\u30B4\u30DF\u7BB1\u306F\u7A7A\u3067\u3059");return}let r=`${o.length} \u4EF6\u3092\u3059\u3079\u3066\u5B8C\u5168\u524A\u9664\u3057\u307E\u3059\u3002\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002
`+(n.length>0?`(\u4ED6\u306E\u30E6\u30FC\u30B6\u306E ${n.length} \u4EF6\u306F\u5BFE\u8C61\u5916\u3067\u6B8B\u308A\u307E\u3059)
`:"")+"\u3088\u308D\u3057\u3044\u3067\u3059\u304B?";if(!confirm(r))return;_(!0,"\u5B8C\u5168\u524A\u9664\u4E2D...");let a=0,i=0,s=new Set;for(let c of o)try{c.kind==="row"&&c.rowListTitle&&c.rowDbRowId?(await Wc(c.rowListTitle,c.rowDbRowId),s.add(c.rowListTitle)):await Br(c.bodyId),a++}catch{i++}try{await ct()}catch{}for(let c of s)await Wh(c);_(!1),te(),bp();let l=`${a} \u4EF6\u524A\u9664\u3057\u307E\u3057\u305F`;i>0&&(l+=` (\u5931\u6557 ${i} \u4EF6)`),n.length>0&&(l+=` / \u4ED6\u306E\u30E6\u30FC\u30B6\u306E ${n.length} \u4EF6\u306F\u6B8B\u3063\u3066\u3044\u307E\u3059`),k(l)}async function bp(){let e=I("trash-list");e.innerHTML='<div class="memola-trash-empty">\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026</div>';let t=await t1();if(e.innerHTML="",t.length===0){e.innerHTML='<div class="memola-trash-empty">\u30B4\u30DF\u7BB1\u306F\u7A7A\u3067\u3059</div>';return}let o=Array.from(new Set(t.map(a=>a.trashedBy).filter(a=>a>0))),n=new Map;await Promise.all(o.map(async a=>{let i=await Ra(a);i&&n.set(a,i)}));let r=m.meta.myUserId||0;t.forEach(a=>{let i=document.createElement("div");i.className="memola-trash-row";let s=new Date(a.trashedAt).toLocaleString("ja-JP"),l=a.trashedBy===r?"\u3042\u306A\u305F":n.get(a.trashedBy)||"\u4E0D\u660E",c=a.trashedBy===r,d=a.kind==="database"?"\u{1F5C3} DB":a.kind==="row"?"\u{1F4CB} \u884C":"\u{1F4C4} \u30DA\u30FC\u30B8",p=a.kind==="row"&&a.rowParentDbTitle?` \xB7 ${M(a.rowParentDbTitle)} \u5185`:"";i.innerHTML='<div class="memola-trash-info"><div class="memola-trash-title">'+M(a.title||"(\u7121\u984C)")+'</div><div class="memola-trash-meta">'+d+p+" \xB7 <b>"+M(l)+"</b> \u304C "+s+' \u306B\u524A\u9664</div></div><button class="memola-trash-btn memola-trash-restore" title="\u5FA9\u5143">\u21BA</button><button class="memola-trash-btn memola-trash-purge" '+(c?'title="\u5B8C\u5168\u524A\u9664"':'title="\u4ED6\u306E\u30E6\u30FC\u30B6\u304C\u524A\u9664\u3057\u305F\u9805\u76EE\u306F\u5B8C\u5168\u524A\u9664\u3067\u304D\u307E\u305B\u3093" disabled')+">\u{1F5D1}</button>",i.querySelector(".memola-trash-restore").addEventListener("click",async()=>{try{_(!0,"\u5FA9\u5143\u4E2D..."),a.kind==="row"&&a.rowListTitle&&a.rowDbRowId?(await tu(a.rowListTitle,a.rowDbRowId),await Wh(a.rowListTitle)):await Bs(a.bodyId),await ct(),te(),await bp(),k("\u5FA9\u5143\u3057\u307E\u3057\u305F")}catch(u){k("\u5FA9\u5143\u5931\u6557: "+u.message,"err")}finally{_(!1)}}),c&&i.querySelector(".memola-trash-purge").addEventListener("click",async()=>{if(confirm("\u5B8C\u5168\u306B\u524A\u9664\u3057\u307E\u3059\u3002\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002"))try{_(!0,"\u524A\u9664\u4E2D..."),a.kind==="row"&&a.rowListTitle&&a.rowDbRowId?(await Wc(a.rowListTitle,a.rowDbRowId),await Wh(a.rowListTitle)):await Br(a.bodyId);try{await ct()}catch{}te(),await bp(),k("\u5B8C\u5168\u306B\u524A\u9664\u3057\u307E\u3057\u305F")}catch(u){k("\u524A\u9664\u5931\u6557: "+u.message,"err")}finally{_(!1)}}),e.appendChild(i)})}var Vh=L(()=>{"use strict";j();me();W();We();Xt();_e();le();Re();we()});function n1(e){o1||(o1=!0,fh([{id:"new-page",label:"\u65B0\u3057\u3044\u30DA\u30FC\u30B8",icon:"\uFF0B",key:"\u2318N",run:()=>{Io("")}},{id:"new-db",label:"\u65B0\u3057\u3044DB",icon:"\u{1F5C2}",key:"\u2318\u21E7N",run:()=>{e.doNewDb("")}},{id:"ai-ask",label:"AI\u306B\u8CEA\u554F",icon:"\u2726",key:"\u2318\u21E7A",run:()=>{Gl()}},{id:"toc",label:"\u76EE\u6B21\u30D1\u30CD\u30EB\u3092\u5207\u66FF",icon:"\u2630",key:"\u2318\u21E7L",run:()=>{Rl()}},{id:"props",label:"\u30D7\u30ED\u30D1\u30C6\u30A3\u30D1\u30CD\u30EB\u3092\u5207\u66FF",icon:"\u25A4",key:"\u2318\u21E7R",run:()=>{Nl()}},{id:"focus",label:"\u96C6\u4E2D\u30E2\u30FC\u30C9\u5207\u66FF",icon:"\u26F6",key:"\u2318\u21E7F",run:()=>{gp()}},{id:"trash",label:"\u30B4\u30DF\u7BB1\u3092\u958B\u304F",icon:"\u{1F5D1}",key:"",run:()=>{vp()}},{id:"settings",label:"\u8A2D\u5B9A",icon:"\u2699",key:"",run:()=>{document.getElementById("memola-settings-md")?.classList.add("on")}}]))}var o1,r1=L(()=>{"use strict";Wl();En();mr();Di();_i();Kh();Vh();o1=!1});var i1={};q(i1,{clearCurrentWorkspace:()=>Xh,ensureWorkspaceSelected:()=>HB,getCurrentWorkspaceName:()=>xp,loadWorkspaces:()=>pa,saveWorkspaces:()=>yp,setCurrentWorkspace:()=>wp,showWorkspaceMenu:()=>ua,switchWorkspace:()=>Yh,validateWorkspaceUrl:()=>a1});function pa(){let e=vc.get();if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function yp(e){vc.set(JSON.stringify(e))}function xp(){let e=fr.get();return e?pa().some(o=>o.name===e)?e:(fr.clear(),gr.clear(),""):""}function wp(e,t){fr.set(e),gr.set(t)}function Xh(){fr.clear(),gr.clear()}async function a1(e){let t=e.trim().replace(/\/$/,"");if(!/^https:\/\//.test(t))return"URL \u306F https:// \u3067\u59CB\u3081\u3066\u304F\u3060\u3055\u3044";if(!/\/sites\/[^/]+/.test(t)&&!/^https:\/\/[^/]+$/.test(t))return"SharePoint \u30B5\u30A4\u30C8 URL \u306E\u5F62\u5F0F\u3067\u306F\u3042\u308A\u307E\u305B\u3093 (\u4F8B: https://contoso.sharepoint.com/sites/team)";try{let o=await fetch(t+"/_api/web?$select=Title",{headers:{Accept:"application/json;odata=verbose"},credentials:"include"});return o.status===404?"\u30B5\u30A4\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093 (404)":o.status===403?"\u30B5\u30A4\u30C8\u3078\u306E\u30A2\u30AF\u30BB\u30B9\u6A29\u304C\u3042\u308A\u307E\u305B\u3093 (403)":o.status===401?"SharePoint \u306B\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u3044\u306A\u3044\u3001\u307E\u305F\u306F\u8A8D\u8A3C\u304C\u5207\u308C\u3066\u3044\u307E\u3059 (401)":o.ok?null:"\u30B5\u30A4\u30C8\u78BA\u8A8D\u306B\u5931\u6557\u3057\u307E\u3057\u305F ("+o.status+")"}catch(o){return"\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F: "+o.message}}async function Yh(e){_(!0,"\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u3092\u5207\u66FF\u4E2D\u2026");try{wp(e.name,e.url),Cp(e.url),Sb(),Rp(),pu(),nu(),h0(),Ap();let{renderTree:t}=await Promise.resolve().then(()=>(_e(),wo)),{showView:o}=await Promise.resolve().then(()=>(K(),ie)),{stopWatching:n}=await Promise.resolve().then(()=>(Wr(),Om));n(),o("empty"),t(),await ct(),t();let r=document.getElementById("memola-ws-name");r&&(r.textContent=e.name),Promise.resolve().then(()=>(Wo(),tr)).then(c=>c.refreshDraftsBadge?.());let a=await Promise.resolve().then(()=>(K(),ie)),i=a.loadLastOpenedPage(),l=(i?m.pages.find(c=>c.Id===i&&!c.IsDraft):null)||m.pages.find(c=>!c.IsDraft)||null;l&&await a.doSelect(l.Id),k("\u300C"+e.name+"\u300D \u306B\u5207\u308A\u66FF\u3048\u307E\u3057\u305F")}catch(t){k("\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u5207\u66FF\u5931\u6557: "+t.message,"err")}finally{_(!1)}}async function HB(){let e=pa();if(e.length===0)return;let t=fr.get();if(t&&e.some(n=>n.name===t))return;Xh();let o=e.find(n=>n.url.replace(/\/$/,"")===G);if(o){wp(o.name,o.url);return}k("\u73FE\u5728\u306E\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u304C\u524A\u9664\u3055\u308C\u3066\u3044\u307E\u3059 \u2014 \u4E00\u89A7\u304B\u3089\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044","err")}function ua(e){document.getElementById("memola-ws-menu")?.remove();let t=pa(),o=xp(),n=document.createElement("div");if(n.id="memola-ws-menu",n.className="memola-ws-menu",t.length===0){let c=document.createElement("div");c.className="memola-ws-empty",c.textContent="\u307E\u3060\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u304C\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u305B\u3093",n.appendChild(c)}else t.forEach(c=>{let d=document.createElement("div");d.className="memola-ws-item"+(c.name===o?" on":""),d.innerHTML='<div class="memola-ws-item-body"><div class="memola-ws-item-name">'+M(c.name)+'</div><div class="memola-ws-item-url">'+M(c.url)+'</div></div><button class="memola-ws-item-rn" title="\u540D\u79F0\u5909\u66F4">'+$.edit+'</button><button class="memola-ws-item-rm" title="\u4E00\u89A7\u304B\u3089\u524A\u9664">'+$.trash+"</button>",d.querySelector(".memola-ws-item-body")?.addEventListener("click",()=>{s(),c.name!==o&&Yh(c)}),d.querySelector(".memola-ws-item-rn")?.addEventListener("click",p=>{p.stopPropagation();let u=prompt("\u65B0\u3057\u3044\u540D\u79F0:",c.name);if(u==null)return;let f=u.trim();if(!f||f===c.name)return;let g=pa();if(g.some(b=>b.name===f)){k("\u540C\u3058\u540D\u79F0\u306E\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u304C\u65E2\u306B\u3042\u308A\u307E\u3059","err");return}let y=g.map(b=>b.name===c.name?{...b,name:f}:b);if(yp(y),o===c.name){wp(f,c.url);let b=document.getElementById("memola-ws-name");b&&(b.textContent=f)}k("\u540D\u79F0\u3092\u5909\u66F4\u3057\u307E\u3057\u305F"),s(),ua(e)}),d.querySelector(".memola-ws-item-rm")?.addEventListener("click",async p=>{if(p.stopPropagation(),!confirm("\u300C"+c.name+"\u300D \u3092\u4E00\u89A7\u304B\u3089\u524A\u9664\u3057\u307E\u3059\u3002SharePoint \u4E0A\u306E\u30C7\u30FC\u30BF\u306B\u306F\u5F71\u97FF\u3057\u307E\u305B\u3093\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B?"))return;let u=pa().filter(f=>f.name!==c.name);if(yp(u),k("\u524A\u9664\u3057\u307E\u3057\u305F"),o===c.name){if(u.length>0){s();let g=document.getElementById("memola-ws-name");g&&(g.textContent=u[0].name),await Yh(u[0]),ua(e);return}Xh();let f=document.getElementById("memola-ws-name");f&&(f.textContent="Memola")}s(),ua(e)}),n.appendChild(d)});let r=document.createElement("div");r.className="memola-ws-sep",n.appendChild(r);let a=document.createElement("div");a.className="memola-ws-add",a.textContent="+ \u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u3092\u8FFD\u52A0",a.addEventListener("click",async()=>{let c=prompt("\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u540D (\u4F8B: \u55B6\u696D\u30C1\u30FC\u30E0):");if(!c||!c.trim())return;let d=prompt("SharePoint \u30B5\u30A4\u30C8 URL (\u4F8B: https://contoso.sharepoint.com/sites/sales):");if(!d||!d.trim())return;let p=c.trim(),u=d.trim().replace(/\/$/,""),f=pa();if(f.some(y=>y.name===p)){k("\u540C\u3058\u540D\u79F0\u306E\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u304C\u65E2\u306B\u3042\u308A\u307E\u3059","err");return}_(!0,"URL \u3092\u78BA\u8A8D\u4E2D\u2026");let g=null;try{g=await a1(u)}finally{_(!1)}if(g){k("\u8FFD\u52A0\u3067\u304D\u307E\u305B\u3093: "+g,"err");return}f.push({name:p,url:u}),yp(f),k("\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u300C"+p+"\u300D \u3092\u8FFD\u52A0\u3057\u307E\u3057\u305F"),s(),ua(e)}),n.appendChild(a);let i=e.getBoundingClientRect();n.style.position="fixed",n.style.top=i.bottom+4+"px",n.style.left=i.left+"px",document.getElementById("memola-overlay")?.appendChild(n),setTimeout(()=>{document.addEventListener("click",l)},0);function s(){n.remove(),document.removeEventListener("click",l)}function l(c){!n.contains(c.target)&&c.target!==e&&s()}}var Jh=L(()=>{"use strict";j();He();Pa();le();br();De();W();Re();An();Zg();ve()});function l1(){if(s1)return;s1=!0,I("outline-btn").addEventListener("click",Rl),document.getElementById("memola-outline-x")?.addEventListener("click",()=>{Promise.resolve().then(()=>(Di(),Gg)).then(t=>t.setOutlineOpen(!1))}),Wg(),aa(),I("props-btn").addEventListener("click",Nl),document.getElementById("memola-props-x")?.addEventListener("click",()=>{Promise.resolve().then(()=>(_i(),Vg)).then(t=>t.setPropertiesOpen(!1))}),ia(),I("trash-btn").addEventListener("click",vp),I("trash-close").addEventListener("click",Gh),I("trash-md").addEventListener("click",t=>{t.target===I("trash-md")&&Gh()});let e=xp();e&&(I("ws-name").textContent=e),I("ws-btn").addEventListener("click",t=>{t.stopPropagation(),ua(I("ws-btn"))})}var s1,c1=L(()=>{"use strict";me();Di();_i();Vh();Jh();s1=!1});var h1={};q(h1,{attachInbox:()=>Qh,closeInbox:()=>Ip,navigateToMention:()=>eb,openInbox:()=>p1,pollMentions:()=>g1,refreshInboxBadge:()=>tb});function Qh(){if(d1)return;d1=!0,document.getElementById("memola-inbox-btn")?.addEventListener("click",p1),document.getElementById("memola-inbox-close")?.addEventListener("click",Ip),document.getElementById("memola-inbox-readall")?.addEventListener("click",()=>void UB());let e=document.getElementById(Zh);e?.addEventListener("click",t=>{t.target===e&&Ip()}),g1()}function Ip(){document.getElementById(Zh)?.classList.remove("on")}async function p1(){let e=document.getElementById(Zh);e&&e.classList.add("on"),await u1()}async function u1(){let e=document.getElementById("memola-inbox-list");if(e){e.innerHTML='<div class="memola-inbox-empty">\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026</div>';try{Zi=await Wp()}catch{Zi=[]}if(Zi.length===0){e.innerHTML='<div class="memola-inbox-empty">\u30E1\u30F3\u30B7\u30E7\u30F3\u306F\u3042\u308A\u307E\u305B\u3093\u3002</div>';return}e.innerHTML=Zi.map(t=>{let o=t.Created?Sn(Date.parse(t.Created)):"";return'<div class="memola-inbox-item'+(t.Read?" read":"")+'" data-id="'+t.Id+'">'+(t.Read?"":'<span class="memola-inbox-dot"></span>')+'<div class="memola-inbox-main"><div class="memola-inbox-line1"><span class="memola-inbox-actor">'+M(t.ActorName||"\u8AB0\u304B")+'</span> \u304C\u3042\u306A\u305F\u3092\u30E1\u30F3\u30B7\u30E7\u30F3<span class="memola-inbox-time">'+M(o)+'</span></div><div class="memola-inbox-page">'+M(t.PageTitle||"(\u30DA\u30FC\u30B8)")+'</div><div class="memola-inbox-snippet">'+M(t.Snippet||"")+"</div></div></div>"}).join(""),e.querySelectorAll(".memola-inbox-item").forEach(t=>{t.addEventListener("click",()=>void FB(Number(t.dataset.id)))})}}async function FB(e){let t=Zi.find(o=>o.Id===e);t&&(Ip(),await eb(t))}async function eb(e){await Gp(e.Id).catch(()=>{}),kp.add(e.Id),tb();try{let{doSelect:t}=await Promise.resolve().then(()=>(K(),ie)),{appIdForCommentKey:o}=await Promise.resolve().then(()=>(W(),qe)),n=o(e.PageId)||e.PageId;await t(n),(await Promise.resolve().then(()=>(Uo(),bn))).focusComment(e.PageId,e.CommentId)}catch{}}async function UB(){await Promise.all(Zi.filter(e=>!e.Read).map(e=>Gp(e.Id))),await u1(),tb()}function f1(e){let t=I("inbox-btn")?.querySelector(".memola-inbox-badge-count");t&&(t.textContent=e>0?"("+e+")":"")}async function tb(){try{f1(await Vb())}catch{}}async function g1(){let e;try{e=await Wp()}catch{return}let t=e.filter(o=>!o.Read);if(f1(t.length),!m1){t.forEach(o=>kp.add(o.Id)),m1=!0;return}for(let o of t)kp.has(o.Id)||(kp.add(o.Id),jB(o))}function zB(){let e=document.getElementById("memola-mention-toasts");return e||(e=document.createElement("div"),e.id="memola-mention-toasts",(document.getElementById("memola-overlay")||document.body).appendChild(e)),e}function jB(e){let t=document.createElement("div");t.className="memola-mention-toast",t.innerHTML='<div class="memola-mention-toast-hd">\u{1F4AC} '+M(e.ActorName||"\u8AB0\u304B")+' \u304C\u3042\u306A\u305F\u3092\u30E1\u30F3\u30B7\u30E7\u30F3</div><div class="memola-mention-toast-page">'+M(e.PageTitle||"(\u30DA\u30FC\u30B8)")+"</div>"+(e.Snippet?'<div class="memola-mention-toast-snippet">'+M(e.Snippet)+"</div>":"")+'<button class="memola-mention-toast-x" title="\u9589\u3058\u308B">\xD7</button>';let o=()=>{t.classList.remove("on"),setTimeout(()=>t.remove(),200)};t.querySelector(".memola-mention-toast-x")?.addEventListener("click",n=>{n.stopPropagation(),o()}),t.addEventListener("click",()=>{o(),eb(e)}),zB().appendChild(t),requestAnimationFrame(()=>t.classList.add("on")),setTimeout(o,9e3)}var Zh,d1,Zi,kp,m1,ob=L(()=>{"use strict";me();Re();To();Oc();Zh="memola-inbox-md",d1=!1;Zi=[];kp=new Set,m1=!1});function v1(){try{return JSON.stringify(m.meta.pages)}catch{return String(m.meta.pages.length)}}async function y1(e={}){if(!nb&&!(Date.now()-b1<qB)&&!re.isBusy()&&!fu()&&!re.isDirty()){nb=!0;try{try{let t=v1();if(await ct(),v1()!==t){let{renderTree:o}=await Promise.resolve().then(()=>(_e(),wo));o()}}catch{}if(!m.currentId)return;if(!e.periodic&&m.currentType==="database"&&!m.currentRow){let t=m.pages.find(o=>o.Id===m.currentId);if(t)await(await Promise.resolve().then(()=>(K(),ie))).doSelectDb(m.currentId,t);else{m.currentId=null;let{showView:o}=await Promise.resolve().then(()=>(K(),ie));o("empty")}}}finally{b1=Date.now(),nb=!1}}}function x1(){let e=document.body;e.dataset.memolaTabRefocusWired!=="1"&&(e.dataset.memolaTabRefocusWired="1",document.addEventListener("visibilitychange",()=>{document.hidden||y1()}))}function $B(){let e=Ln.get(),t=e?parseInt(e,10):3e4;return isFinite(t)?t:3e4}function rb(){ec&&(clearTimeout(ec),ec=null);let e=$B();if(e<=0){ec=setTimeout(rb,6e4);return}ec=setTimeout(()=>{(async()=>{document.hidden||(await y1({periodic:!0}),Promise.resolve().then(()=>(Uo(),bn)).then(t=>t.pollComments()).catch(()=>{}),Promise.resolve().then(()=>(ob(),h1)).then(t=>t.pollMentions()).catch(()=>{}))})().finally(rb)},e)}function w1(){let e=document.body;e.dataset.memolaTreeSyncWired!=="1"&&(e.dataset.memolaTreeSyncWired="1",rb())}var qB,b1,nb,ec,k1=L(()=>{"use strict";j();W();gt();ve();qB=3e3,b1=0,nb=!1;ec=null});function T1(){I1||(I1=!0,re.subscribe(KB))}function KB(e){let t=E1;switch(E1=e.kind,e.kind){case"unloaded":m.currentRow||(m.dirty=!1,m.saving=!1),m.sync.loadedEtag=null,m.sync.loadedModified=null;return;case"idle":m.dirty=!1,m.saving=!1,m.sync.loadedEtag=e.base.etag,m.sync.loadedModified=e.base.modified,Qe("\u4FDD\u5B58\u6E08\u307F"),(t==="saving"||t==="merging")&&(Lv(e.base.pageId,e.base.etag,e.base.modified),Yo(e.base.pageId).set(e.base.etag),Promise.resolve().then(()=>(_e(),wo)).then(o=>o.renderTree()));return;case"dirty":m.dirty=!0,m.saving=!1,m.sync.loadedEtag=e.base.etag,m.sync.loadedModified=e.base.modified,Qe("\u672A\u4FDD\u5B58");return;case"saving":m.dirty=!0,m.saving=!0,m.sync.loadedEtag=e.base.etag,m.sync.loadedModified=e.base.modified,Qe("\u4FDD\u5B58\u4E2D...");return;case"conflict":m.dirty=!0,m.saving=!1,m.sync.loadedEtag=e.conflict.base.etag,Qe("\u7AF6\u5408");return;case"merging":m.dirty=!0,m.saving=!1,m.sync.loadedEtag=e.conflict.base.etag,Qe("\u7AF6\u5408");return}}var I1,E1,L1=L(()=>{"use strict";j();le();gt();wu();ve();I1=!1,E1=null});function M1(){S1||(S1=!0,re.subscribe(GB))}function GB(e){if(e.kind!=="conflict"){ab.close();return}VB(e.conflict.pageId,e.conflict.ours.title)}function VB(e,t){if(ab.isOpen())return;let n=m.pages.find(r=>r.Id===e)?.Title||t||"\u7121\u984C";ab.render('<div class="memola-conflict-box"><div class="memola-conflict-title">\u26A0 \u4ED6\u306E\u30E6\u30FC\u30B6\u30FC\u304C\u3053\u306E\u30DA\u30FC\u30B8\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F</div><div class="memola-conflict-page">\u300C'+M(n)+'\u300D</div><div class="memola-conflict-msg">\u540C\u3058\u30DA\u30FC\u30B8\u3092\u5225\u306E\u4EBA\u304C\u5148\u306B\u7DE8\u96C6\u3057\u3066\u3044\u307E\u3057\u305F\u3002<br>\u3069\u3046\u6271\u3044\u307E\u3059\u304B\uFF1F</div><div class="memola-conflict-btns"><button class="memola-btn p" data-choice="merge" title="\u81EA\u5206\u306E\u7DE8\u96C6\u3068\u76F8\u624B\u306E\u7DE8\u96C6\u3092 3-way \u30DE\u30FC\u30B8\u3067\u7D50\u5408\u3057\u307E\u3059\u3002\u540C\u3058\u7B87\u6240\u304C\u4E21\u65B9\u5909\u66F4\u3055\u308C\u3066\u305F\u5834\u5408\u306E\u307F\u9078\u629E\u3092\u6C42\u3081\u3089\u308C\u307E\u3059">\u{1F500} \u7D71\u5408\u3059\u308B <span class="memola-conflict-sub">(\u63A8\u5968 \u2014 \u53CC\u65B9\u306E\u7DE8\u96C6\u3092\u878D\u5408)</span></button><button class="memola-btn s" data-choice="overwrite" title="\u81EA\u5206\u306E\u7DE8\u96C6\u5185\u5BB9\u3067 SP \u306E\u7248\u3092\u4E0A\u66F8\u304D\u3057\u307E\u3059 (\u76F8\u624B\u306E\u5909\u66F4\u306F SP \u306E\u5C65\u6B74\u304B\u3089\u5FA9\u5143\u3067\u304D\u307E\u3059)">\u4E0A\u66F8\u304D\u3067\u4FDD\u5B58 <span class="memola-conflict-sub">(\u76F8\u624B\u306E\u7DE8\u96C6\u306F\u7834\u68C4)</span></button><button class="memola-btn s" data-choice="reload" title="\u81EA\u5206\u306E\u7DE8\u96C6\u5185\u5BB9\u3092\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58\u3057\u3066\u304B\u3089\u3001\u76F8\u624B\u306E\u6700\u65B0\u7248\u3092\u8AAD\u307F\u8FBC\u307F\u307E\u3059">\u76F8\u624B\u306E\u7248\u3092\u8868\u793A <span class="memola-conflict-sub">(\u81EA\u5206\u306E\u7DE8\u96C6\u306F\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58)</span></button><button class="memola-btn ghost" data-choice="cancel" title="\u30C0\u30A4\u30A2\u30ED\u30B0\u3092\u9589\u3058\u307E\u3059\u3002\u3042\u3068\u3067\u5224\u65AD\u3067\u304D\u307E\u3059">\u3053\u306E\u307E\u307E\u306B\u3059\u308B</button></div><div class="memola-conflict-foot">\u5931\u3063\u305F\u5909\u66F4\u306F<b>\u300C\u{1F4DD} \u4E0B\u66F8\u304D\u300D</b> \u307E\u305F\u306F <b>SP \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74</b> \u304B\u3089\u5FA9\u5143\u53EF\u80FD\u3067\u3059\u3002</div></div>',r=>{r.querySelectorAll("button[data-choice]").forEach(a=>{a.addEventListener("click",()=>{let i=a.dataset.choice;YB(i,e,n)})})})}async function YB(e,t,o){switch(e){case"merge":re.startMerge();return;case"overwrite":{let n=await re.forceOverwrite();n.ok?(k("\u81EA\u5206\u306E\u7248\u3067\u4E0A\u66F8\u304D\u3057\u307E\u3057\u305F"),Promise.resolve().then(()=>(Wo(),tr)).then(r=>r.refreshDraftsBadge?.())):!n.ok&&n.reason==="error"&&k("\u4E0A\u66F8\u304D\u5931\u6557: "+(n.error?.message||""),"err");return}case"reload":{let n=re.state();if(n.kind!=="conflict")return;let r=n.conflict;try{let{saveDraft:i}=await Promise.resolve().then(()=>(Dl(),Og));i({pageId:r.pageId,pageTitle:o,title:r.ours.title,body:r.ours.body,reason:"conflict-discarded",baseBody:r.base.body,baseEtag:r.base.etag})}catch{}re.acceptTheirs(),k("\u81EA\u5206\u306E\u7DE8\u96C6\u306F\u4E0B\u66F8\u304D\u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F\uFF08\u30B5\u30A4\u30C9\u30D0\u30FC\u300C\u{1F4DD} \u4E0B\u66F8\u304D\u300D\u304B\u3089\u5FA9\u5143\u53EF\uFF09"),Promise.resolve().then(()=>(Wo(),tr)).then(i=>i.refreshDraftsBadge?.());let{doSelect:a}=await Promise.resolve().then(()=>(K(),ie));await a(t);return}case"cancel":re.cancelConflict();return}}var WB,ab,S1,P1=L(()=>{"use strict";j();Re();gt();le();er();WB="memola-conflict-md",ab=xn({id:WB,className:"memola-conflict-md",onEscape:()=>re.cancelConflict(),onBackdropClick:()=>re.cancelConflict()}),S1=!1});function B1(){C1||(C1=!0,re.subscribe(JB))}function JB(e){if(e.kind!=="merging"){A1.close();return}ZB(e)}function ZB(e){let t=e.hunks.length,o=t-e.resolved.size,n=t===0?'<span class="memola-merge-ok">\u2713 \u7AF6\u5408\u306A\u3057 \u2014 \u81EA\u52D5\u30DE\u30FC\u30B8\u5B8C\u4E86</span>':o===0?'<span class="memola-merge-ok">\u2713 '+t+" \u4EF6\u3059\u3079\u3066\u89E3\u6C7A\u6E08\u307F</span>":'<span class="memola-merge-warn">\u26A0 \u6B8B\u308A '+o+" / "+t+" \u4EF6\u306E\u7AF6\u5408</span>",r=o>0?'<div class="memola-merge-preview-pending">\u26A0 \u6B8B\u308A '+o+" \u4EF6\u306E\u7AF6\u5408\u3092\u5DE6\u30DA\u30A4\u30F3\u3067\u89E3\u6C7A\u3059\u308B\u3068\u3001\u3053\u3053\u306B\u6700\u7D42\u7684\u306A\u5185\u5BB9\u304C\u8868\u793A\u3055\u308C\u307E\u3059\u3002</div>":So(re.computeMergedBody()),a=QB(e),i=`
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
  `;A1.render(i,s=>{s.querySelectorAll("[data-conflict-id]").forEach(l=>{l.addEventListener("click",()=>{let c=parseInt(l.dataset.conflictId||"0",10),d=l.dataset.choice;re.setMergeChoice(c,d)})}),s.querySelectorAll("[data-merge-act]").forEach(l=>{l.addEventListener("click",()=>{let c=l.dataset.mergeAct;c==="cancel"?re.cancelMerge():c==="apply"&&eD()})})})}function QB(e){return e.hunks.length===0?'<div class="memola-merge-empty">\u{1F389} \u81EA\u52D5\u30DE\u30FC\u30B8\u3067\u5168\u3066\u89E3\u6C7A\u3057\u307E\u3057\u305F\u3002\u53F3\u306E\u5185\u5BB9\u3092\u78BA\u8A8D\u3057\u3066\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div>':e.hunks.map(t=>{let o=e.resolved.get(t.id),n=o?"memola-merge-conflict resolved":"memola-merge-conflict",r=t.yours.length===0?"<i>(\u524A\u9664)</i>":M(t.yours.join(`
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
    `}).join("")}async function eD(){_(!0,"\u7D71\u5408\u7D50\u679C\u3092\u4FDD\u5B58\u4E2D...");try{let e=await re.applyMerge();if(_(!1),e.ok){k("\u7D71\u5408\u5185\u5BB9\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F");let t=re.state();if(t.kind==="idle"&&m.currentId===t.base.pageId){let o=t.base.pageId;re.unload();let{doSelect:n}=await Promise.resolve().then(()=>(K(),ie));await n(o)}Promise.resolve().then(()=>(Wo(),tr)).then(o=>o.refreshDraftsBadge?.());return}if(!e.ok&&e.reason==="conflict"){k("\u4FDD\u5B58\u4E2D\u306B\u3055\u3089\u306B\u7AF6\u5408\u304C\u767A\u751F\u3057\u307E\u3057\u305F \u2014 \u518D\u5EA6\u30DA\u30FC\u30B8\u3092\u958B\u3044\u3066\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044","err");return}!e.ok&&e.reason==="error"&&k("\u4FDD\u5B58\u306B\u5931\u6557: "+(e.error?.message||""),"err")}catch(e){_(!1),k("\u4FDD\u5B58\u306B\u5931\u6557: "+e.message,"err")}}var XB,A1,C1,D1=L(()=>{"use strict";j();Re();on();gt();le();er();XB="memola-merge-md",A1=xn({id:XB,className:"memola-merge-md",onEscape:()=>re.cancelMerge()}),C1=!1});var _1={};q(_1,{loadRemoteAiConfig:()=>nD});function oD(){let e=[],t=lo.get();if(t)try{e.push(new URL(t).origin)}catch{}return e.includes("http://localhost:18080")||e.push("http://localhost:18080"),e}async function nD(){for(let e of oD())try{let t=new AbortController,o=setTimeout(()=>t.abort(),1500),n;try{n=await fetch(e+"/memola/ai-config",{signal:t.signal})}finally{clearTimeout(o)}if(!n.ok)continue;let a=(await n.json().catch(()=>null))?.config;if(!a||typeof a!="object")continue;let i=[];for(let[s,l]of tD){let c=a[s];c!=null&&String(c)!==""&&(l.set(String(c)),i.push(`${s}=${String(c)}`))}if(i.length)return console.info(`[memola] AI \u8A2D\u5B9A\u3092 relay (${e}) \u304B\u3089 ${i.length} \u4EF6\u53CD\u6620: ${i.join(", ")}`),!0}catch{}return!1}var tD,R1=L(()=>{"use strict";ve();tD=[["provider",fa],["corpModel",ga],["corpBaseUrl",lo],["corpDeployPrefix",ha],["embedProvider",ba],["voyageModel",va],["embedModel",ya],["embedApiVersion",xa],["embedDimensions",wa],["ragTopK",ka],["ragMinScore",Ia]]});var O1={};q(O1,{startUpdateWatcher:()=>lD});function rD(){try{if(localStorage.getItem("memola.dev.bundle-source")==="local")return(localStorage.getItem("memola.dev.local-base")||"http://127.0.0.1:18080/memola").replace(/\/+$/,"")}catch{}let e=window._spPageContextInfo;return e?.webServerRelativeUrl?e.webServerRelativeUrl.replace(/\/$/,"")+"/Shared Documents/memola":""}function aD(){try{return"260606-0814-9eec9d"}catch{return""}}function iD(e){if(N1)return;N1=!0;let t=document.createElement("div");t.id="memola-update-bar",t.innerHTML="<span>\u{1F504} \u65B0\u3057\u3044\u30D0\u30FC\u30B8\u30E7\u30F3 ("+e+') \u304C\u3042\u308A\u307E\u3059\u3002</span><button id="memola-update-reload">\u30EA\u30ED\u30FC\u30C9</button><button id="memola-update-dismiss" title="\u9589\u3058\u308B">\xD7</button>',document.getElementById("memola-overlay")?.appendChild(t),t.querySelector("#memola-update-reload")?.addEventListener("click",()=>location.reload()),t.querySelector("#memola-update-dismiss")?.addEventListener("click",()=>{t.remove()})}async function sD(){let e=rD();if(!e)return;let t=aD();if(t)try{let o=await fetch(e+"/version.txt?t="+Date.now(),{credentials:"same-origin",cache:"no-cache"});if(!o.ok)return;let n=(await o.text()).trim();n&&n!==t&&iD(n)}catch{}}function lD(){ib===null&&(ib=window.setTimeout(function e(){sD(),ib=window.setTimeout(e,9e4)},9e4))}var ib,N1,H1=L(()=>{"use strict";ib=null,N1=!1});var II={};q(II,{attachAll:()=>cb,detachViewportAutoCollapse:()=>dD,init:()=>db});async function sb(e){try{_(!0,"DB\u3092\u4F5C\u6210\u4E2D...");let t=await Ls("\u7121\u984CDB",e||"");uo({Id:t.Id,Title:t.Title,ParentId:t.ParentId,Type:"database"}),te(),await Ue(t.Id)}catch(t){k("DB\u4F5C\u6210\u306B\u5931\u6557: "+t.message,"err")}finally{_(!1)}}async function cD(){try{_(!0,"\u518D\u8AAD\u307F\u8FBC\u307F\u4E2D...");let e=m.currentRow;m.currentType!=="database"&&await yt(),await ct(),te();let t=m.currentId,o=t?m.pages.find(n=>n.Id===t):null;if(e){let{getListItemById:n}=await Promise.resolve().then(()=>(De(),mo)),r=await n(e.listTitle,e.itemId);if(r){let{openRowAsPage:a}=await Promise.resolve().then(()=>(Ho(),Oo));await a(e.dbId,r)}}else if(o&&t)if(o.Type==="database"){let{doSelectDb:n}=await Promise.resolve().then(()=>(K(),ie));await n(t,o)}else await Ue(t);k("\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u307E\u3057\u305F")}catch(e){k("\u518D\u8AAD\u307F\u8FBC\u307F\u5931\u6557: "+e.message,"err")}finally{_(!1)}}function cb(){I("x").addEventListener("click",ap),I("reload-btn").addEventListener("click",()=>void cD()),VI({openTodayDailyNote:uE,showDailyPicker:gE,doNewDb:sb}),Of(),Nh(sb),I("dadd").addEventListener("click",sp),ZI(),I("mc").addEventListener("click",()=>{I("md").classList.remove("on")}),I("mk").addEventListener("click",async()=>{I("md").classList.remove("on"),_(!0,"\u30EA\u30B9\u30C8\u3092\u6E96\u5099\u4E2D...");try{await ct(),te(),k("memola-pages \u30EA\u30B9\u30C8\u3092\u521D\u671F\u5316\u3057\u307E\u3057\u305F")}catch(e){k("\u521D\u671F\u5316\u306B\u5931\u6557: "+e.message,"err")}finally{_(!1)}}),OI(),cE(),$I(),nE(),n1({doNewDb:sb}),iE(),DI(),u0(),Yg(),qg(),x1(),w1(),$g(),T1(),ay(),M1(),B1(),Hg(),Qh(),ko(),th(),NE({toggleFocusMode:gp}),$h(),hp(),window.addEventListener("resize",hp),lb=!0,l1(),WE(),QE(),_f(),Rf(),document.addEventListener("keydown",rp)}function dD(){lb&&(window.removeEventListener("resize",hp),lb=!1)}function mD(){Mh({flushSave:!0,removeOverlay:!1})}async function db(){let e=document.getElementById("memola-overlay");e&&(e.__memolaShutdown=mD),_(!0);try{let{ensureWorkspaceSelected:t}=await Promise.resolve().then(()=>(Jh(),i1));await t();try{let{loadRemoteAiConfig:i}=await Promise.resolve().then(()=>(R1(),_1));await i()}catch{}await ct(),te(),tt("empty");let{loadLastOpenedPage:o}=await Promise.resolve().then(()=>(K(),ie)),n=o(),r=n&&m.pages.some(i=>i.Id===n&&!i.IsDraft)?n:m.pages.find(i=>!i.IsDraft)?.Id??null,{restoreTabs:a}=await Promise.resolve().then(()=>(qt(),eo));await a(r),Promise.resolve().then(()=>(H1(),O1)).then(i=>i.startUpdateWatcher())}catch(t){I("em").innerHTML='<div style="font-size:48px">\u26A0\uFE0F</div><h2>\u30A8\u30E9\u30FC</h2><p>'+t.message+"</p>",I("em").style.display="flex",console.error(t)}finally{_(!1)}}var lb,Ph=L(()=>{"use strict";j();me();le();_e();K();En();ht();Sh();_h();Oh();HI();KI();YI();Hf();QI();rE();sE();dE();Hh();OE();GE();e1();bi();qt();r1();c1();jm();sa();Wo();ob();Fl();Wr();k1();L1();Uu();P1();D1();Kh();W();We();we();lb=!1});He();Pa();function xb(){return'<aside id="memola-sb"><div id="memola-sb-hd"><button id="memola-ws-btn" title="\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9"><span class="memola-ws-badge">N</span><span id="memola-ws-name">Memola</span><span class="memola-ws-caret">\u25BE</span></button><button id="memola-sb-collapse" class="memola-pane-x" title="\u30B5\u30A4\u30C9\u30D0\u30FC\u3092\u9589\u3058\u308B (Ctrl+\\)">'+$.close+'</button></div><div class="memola-snav" id="memola-search-nav">'+$.search+'<span>\u691C\u7D22</span><span class="memola-snav-hint">Ctrl K</span></div><div class="memola-quick-wrap"><button class="memola-quick-add" id="memola-quick-add">'+$.plus+'<span>\u65B0\u898F</span></button><button class="memola-quick-chat" id="memola-xchat-launch" title="\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8 \u2014 \u5168\u6587\u66F8\u3092\u307E\u305F\u3044\u3067AI\u306B\u8CEA\u554F">'+$.chat+'<span>\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8</span></button></div><div class="memola-sb-fixed"><div class="memola-sb-fx" id="memola-sb-daily-today" title="\u4ECA\u65E5\u306E\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u304F / \u4F5C\u6210"><span class="memola-sb-fx-ic">\u{1F4C5}</span><span class="memola-sb-fx-lb">\u4ECA\u65E5\u306E\u30CE\u30FC\u30C8</span></div><div class="memola-sb-fx" id="memola-sb-daily-pick" title="\u4EFB\u610F\u306E\u65E5\u306E\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u3092\u958B\u304F"><span class="memola-sb-fx-ic">\u{1F5D3}</span><span class="memola-sb-fx-lb">\u65E5\u4ED8\u3092\u9078\u3093\u3067\u958B\u304F</span></div><div class="memola-sb-fx" id="memola-sb-library" title="\u5168\u30DA\u30FC\u30B8\u306E\u4E00\u89A7"><span class="memola-sb-fx-ic">\u{1F4DA}</span><span class="memola-sb-fx-lb">\u30E9\u30A4\u30D6\u30E9\u30EA</span></div><div class="memola-sb-fx" id="memola-inbox-btn" title="\u81EA\u5206\u5B9B\u3066\u306E\u30E1\u30F3\u30B7\u30E7\u30F3"><span class="memola-sb-fx-ic">\u{1F4E5}</span><span class="memola-sb-fx-lb">\u53D7\u4FE1\u30C8\u30EC\u30A4</span><span class="memola-inbox-badge-count"></span></div></div><div class="memola-sb-fixed"><div class="memola-sb-fx" id="memola-drafts-btn" style="display:none" title="\u7DE8\u96C6\u4E2D\u306E\u4E0B\u66F8\u304D / \u4FDD\u5B58\u885D\u7A81\u3067\u9000\u907F\u3055\u308C\u305F\u7DE8\u96C6"><span class="memola-sb-fx-ic">\u{1F4DD}</span><span class="memola-sb-fx-lb">\u4E0B\u66F8\u304D</span><span class="memola-drafts-badge-count">0</span></div><div class="memola-sb-fx" id="memola-trash-btn" title="\u524A\u9664\u3055\u308C\u305F\u30DA\u30FC\u30B8"><span class="memola-sb-fx-ic">\u{1F5D1}</span><span class="memola-sb-fx-lb">\u30B4\u30DF\u7BB1</span></div></div><div id="memola-tree-wrap"><div class="memola-sl-label" id="memola-tree-pinned-lbl" style="display:none">\u{1F4CC} \u30D4\u30F3\u7559\u3081</div><div id="memola-tree-pinned"></div><div class="memola-sl-label" id="memola-tree-private-lbl">\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8</div><div id="memola-tree-private"></div><div class="memola-sl-label" id="memola-tree-org-lbl">\u{1F310} \u7D44\u7E54</div><div id="memola-tree-org"></div></div><div id="memola-sb-ft"><button class="memola-nb" id="memola-x" title="\u30A2\u30D7\u30EA\u3092\u9589\u3058\u308B (Esc)">'+$.exit+'<span>\u9589\u3058\u308B</span></button></div><div id="memola-create-menu"><div class="memola-cm-section">\u4F5C\u6210</div><div class="memola-cm-item" data-cm="new-page"><span class="memola-cm-ic">\u{1F4C4}</span><div class="memola-cm-body"><span class="memola-cm-name">\u7A7A\u306E\u30DA\u30FC\u30B8</span><span class="memola-cm-sub">L1\u301CL3\u306B\u8FFD\u52A0</span></div></div><div class="memola-cm-item" data-cm="new-db"><span class="memola-cm-ic">\u{1F5C2}</span><div class="memola-cm-body"><span class="memola-cm-name">\u7A7A\u306EDB</span><span class="memola-cm-sub">\u30EA\u30B9\u30C8\uFF0Bmd\u30D5\u30A9\u30EB\u30C0\u3092\u4F5C\u6210</span></div></div><div class="memola-cm-sep"></div><div class="memola-cm-section">\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089</div><div id="memola-cm-templates"></div></div></aside><div id="memola-xchat" class="tdr-shell" aria-hidden="true"><div class="tdr-chat"><div class="tdr-topbar"><span class="tdr-brand"><span class="mark">\u{1D544}</span></span><button class="tdr-titlebtn" id="memola-xchat-titlebtn" title="\u30C1\u30E3\u30C3\u30C8\u5C65\u6B74"><span id="memola-xchat-title">\u65B0\u898F\u30C1\u30E3\u30C3\u30C8</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></button><span class="tdr-idx" id="memola-xchat-idx"></span><div style="flex:1"></div><button class="tdr-icon-btn tdr-btn-labeled" id="memola-xchat-rebuild" title="\u5168\u6587\u66F8\u3092\u30D9\u30AF\u30C8\u30EB\u5316\u3057\u3066\u30A4\u30F3\u30C7\u30C3\u30AF\u30B9\u3092\u66F4\u65B0\u3059\u308B">'+$.refresh+'<span>\u6587\u66F8\u3092\u8AAD\u307F\u8FBC\u307F</span></button><button class="tdr-icon-btn" id="memola-xchat-close" title="\u9589\u3058\u308B (Esc)">'+$.exit+'</button><div class="tdr-histmenu" id="memola-xchat-histmenu"><button class="tdr-hist-new" id="memola-xchat-new">'+$.plus+'<span>\u65B0\u898F\u30C1\u30E3\u30C3\u30C8</span></button><div id="memola-xchat-hist-list"></div></div></div><div class="tdr-thread" id="memola-xchat-thread"></div><div class="tdr-composer"><div class="tdr-composer-inner"><div class="tdr-note-form"><textarea class="tdr-note-input" id="memola-xchat-input" rows="1" placeholder="\u6587\u66F8\u306B\u3064\u3044\u3066\u8CEA\u554F\u2026 (\u4F8B: \u5148\u6708\u306E\u969C\u5BB3\u5BFE\u5FDC\u306E\u624B\u9806\u306F?)"></textarea><button class="tdr-note-submit" id="memola-xchat-send" title="\u9001\u4FE1">'+$.send+'</button></div><div class="tdr-note-hint">Enter \u3067\u9001\u4FE1 / Shift+Enter \u3067\u6539\u884C</div></div></div></div></div><main id="memola-main"><div id="memola-tabbar"><button id="memola-sb-toggle" title="\u30B5\u30A4\u30C9\u30D0\u30FC (Ctrl+\\)">'+$.sidebar+'</button><button id="memola-nav-back" class="memola-nav-btn disabled" title="\u623B\u308B (Ctrl+[)" disabled>'+$.chevronLeft+'</button><button id="memola-nav-fwd" class="memola-nav-btn disabled" title="\u9032\u3080 (Ctrl+])" disabled>'+$.chevronRight+'</button><div id="memola-tabstrip"></div><button id="memola-reload-btn" class="memola-tabbar-act" title="\u518D\u8AAD\u307F\u8FBC\u307F\uFF08\u4E00\u89A7\uFF0B\u8868\u793A\u4E2D\u306E\u30DA\u30FC\u30B8\uFF09">'+$.refresh+'</button><button id="memola-settings-btn" class="memola-tabbar-act" title="\u8A2D\u5B9A">'+$.gear+'</button></div><div id="memola-top"><div id="memola-bc"></div><div id="memola-presence" class="memola-presence" style="display:none"></div><button id="memola-scope-tag" class="memola-scope-tag" style="display:none" title="\u30AF\u30EA\u30C3\u30AF\u3067\u500B\u4EBA \u2194 \u7D44\u7E54 \u3092\u5207\u66FF"><span class="memola-scope-tag-ic">\u{1F512}</span><span class="memola-scope-tag-label">\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8</span></button><button id="memola-pub-tag" class="memola-pub-tag" style="display:none" title="\u516C\u958B\u72B6\u614B"><span class="memola-pub-tag-dot"></span><span class="memola-pub-tag-label">\u516C\u958B\u4E2D</span></button><div id="memola-pub-pop" class="memola-pub-pop" style="display:none"><div class="memola-pub-pop-msg"></div><div class="memola-pub-pop-row"><button class="memola-pub-pop-btn primary" data-pub-act="sync">\u516C\u958B\u30DA\u30FC\u30B8\u306B\u540C\u671F</button><button class="memola-pub-pop-btn" data-pub-act="open">\u516C\u958B\u30DA\u30FC\u30B8\u3092\u958B\u304F</button><button class="memola-pub-pop-btn" data-pub-act="copy">URL \u3092\u30B3\u30D4\u30FC</button><button class="memola-pub-pop-btn danger" data-pub-act="unpublish">\u516C\u958B\u3092\u89E3\u9664</button><button class="memola-pub-pop-btn ghost" data-pub-act="close">\u9589\u3058\u308B</button></div></div><div id="memola-ss"></div><button id="memola-outline-btn" class="memola-tog-btn" title="\u76EE\u6B21">'+$.sort+'<span>\u76EE\u6B21</span></button><button id="memola-props-btn" class="memola-tog-btn" title="\u30D7\u30ED\u30D1\u30C6\u30A3">'+$.info+'<span>\u30D7\u30ED\u30D1\u30C6\u30A3</span></button><button id="memola-ai-btn" class="memola-tog-btn" title="AI\u30C1\u30E3\u30C3\u30C8">'+$.sparkle+'<span>AI</span></button><button id="memola-pgm-btn" title="\u30DA\u30FC\u30B8\u30E1\u30CB\u30E5\u30FC">'+$.more+'</button></div><div id="memola-tb"><button class="memola-b" data-cmd="h1" title="\u898B\u51FA\u30571"><b>H1</b></button><button class="memola-b" data-cmd="h2" title="\u898B\u51FA\u30572"><b>H2</b></button><button class="memola-b" data-cmd="h3" title="\u898B\u51FA\u30573"><b>H3</b></button><span class="memola-bs"></span><button class="memola-b" data-cmd="bold" title="\u592A\u5B57"><b>B</b></button><button class="memola-b" data-cmd="italic" title="\u659C\u4F53"><i>I</i></button><button class="memola-b" data-cmd="strike" title="\u53D6\u308A\u6D88\u3057\u7DDA"><s>S</s></button><button class="memola-b" data-cmd="code" title="\u30A4\u30F3\u30E9\u30A4\u30F3\u30B3\u30FC\u30C9">'+$.code+'</button><button class="memola-b" data-cmd="link" title="\u30EA\u30F3\u30AF\uFF08URL / UNC\u30D1\u30B9\uFF09">'+$.link+'</button><button class="memola-b" data-cmd="comment" title="\u30B3\u30E1\u30F3\u30C8">\u{1F4AC}</button><span class="memola-bs"></span><button class="memola-b" data-cmd="ul" title="\u7B87\u6761\u66F8\u304D">'+$.ul+'</button><button class="memola-b" data-cmd="ol" title="\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8">'+$.ol+'</button><button class="memola-b" data-cmd="todo" title="ToDo\u30EA\u30B9\u30C8">'+$.todo+'</button><button class="memola-b" data-cmd="quote" title="\u5F15\u7528">'+$.quote+'</button><button class="memola-b" data-cmd="callout" title="\u30B3\u30FC\u30EB\u30A2\u30A6\u30C8"><span style="font-size:14px">\u{1F4A1}</span></button><button class="memola-b" data-cmd="pre" title="\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF">'+$.codeBlock+'</button><span class="memola-bs"></span><button class="memola-b" data-cmd="hr" title="\u533A\u5207\u308A\u7DDA">'+$.hr+'</button></div><div id="memola-content-row"><aside id="memola-outline"><div id="memola-outline-hd"><span>\u76EE\u6B21</span><button class="memola-pane-x" id="memola-outline-x" title="\u9589\u3058\u308B">'+$.close+'</button></div><div id="memola-outline-list"></div></aside><div id="memola-ea"><div id="memola-ei"><div id="memola-em"><div class="memola-em-icon">\u{1F4C4}</div><h2 class="memola-em-title">\u306F\u3058\u3081\u3066\u307F\u3088\u3046</h2><p class="memola-em-sub">\u30DA\u30FC\u30B8\u3092\u4F5C\u308B\u304B\u3001\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304B\u3089\u59CB\u3081\u3089\u308C\u307E\u3059\u3002</p><div class="memola-em-btns"><button class="memola-btn p" id="memola-ne">\uFF0B \u7A7A\u306E\u30DA\u30FC\u30B8</button><button class="memola-btn s" id="memola-ne-db">\u25A4 DB\u3092\u4F5C\u308B</button><button class="memola-btn ghost" id="memola-ne-tpl">\u2398 \u30C6\u30F3\u30D7\u30EC</button></div><div class="memola-em-chips"><button class="memola-chip memola-em-chip" data-tpl="weekly">\u{1F4C5} \u9031\u6B21\u30CE\u30FC\u30C8</button><button class="memola-chip memola-em-chip" data-tpl="tasks">\u2713 \u30BF\u30B9\u30AFDB</button><button class="memola-chip memola-em-chip" data-tpl="minutes">\u{1F4D3} \u8B70\u4E8B\u9332</button></div></div><div id="memola-ct"><div id="memola-template-banner" class="memola-template-banner" style="display:none"></div><div id="memola-draft-banner" style="display:none"></div><div id="memola-pg-hd"><div id="memola-icon-wrap"><span id="memola-pg-icon"></span><button class="memola-pg-icon-empty" id="memola-add-icon">\u30A2\u30A4\u30B3\u30F3\u3092\u8FFD\u52A0</button></div><textarea id="memola-ttl" rows="1" placeholder="\u30BF\u30A4\u30C8\u30EB\u306A\u3057"></textarea></div><div id="memola-row-props" class="memola-row-props"></div><div id="memola-ed" contenteditable="true" spellcheck="false"></div><div id="memola-backlinks" class="memola-backlinks" style="display:none"></div></div></div></div><div id="memola-dv"><div id="memola-dv-inner"><div id="memola-template-banner-db" class="memola-template-banner" style="display:none"></div><div id="memola-dv-hd"><div id="memola-dv-icon-wrap"><span id="memola-dv-pg-icon"></span><button class="memola-pg-icon-empty" id="memola-dv-add-icon">\u{1F60A} \u30A2\u30A4\u30B3\u30F3\u3092\u8FFD\u52A0</button></div><div id="memola-dv-ttl" contenteditable="true" spellcheck="false"></div></div><div id="memola-db-views"><button class="memola-db-vbtn on" id="memola-dbv-table">'+$.table+'<span>\u30C6\u30FC\u30D6\u30EB</span></button><button class="memola-db-vbtn" id="memola-dbv-board">'+$.board+'<span>\u30DC\u30FC\u30C9</span></button><button class="memola-db-vbtn" id="memola-dbv-list">'+$.ul+'<span>\u30EA\u30B9\u30C8</span></button><button class="memola-db-vbtn" id="memola-dbv-gallery">'+$.codeBlock+'<span>\u30AE\u30E3\u30E9\u30EA\u30FC</span></button><button class="memola-db-vbtn" id="memola-dbv-calendar">'+$.info+'<span>\u30AB\u30EC\u30F3\u30C0\u30FC</span></button><button class="memola-db-vbtn" id="memola-dbv-gantt">'+$.sort+'<span>\u30AC\u30F3\u30C8</span></button></div><div id="memola-db-tb"><button class="memola-db-new-btn" id="memola-db-new-row">\uFF0B \u65B0\u898F</button><div class="memola-db-tb-spacer"></div><button class="memola-db-chip subtle" id="memola-db-csv-export">'+$.download+'<span>CSV</span></button><button class="memola-db-chip subtle" id="memola-db-csv-import">'+$.copy+'<span>\u53D6\u8FBC</span></button></div><div id="memola-filter-chips"></div><div id="memola-filter-popover"></div><div id="memola-dt-wrap"><table id="memola-dt"><thead><tr id="memola-dth-row"></tr></thead><tbody id="memola-dtb"></tbody></table><button id="memola-dadd">\uFF0B \u65B0\u3057\u3044\u884C</button></div><div id="memola-kb"></div><div id="memola-list-view" class="memola-altview"></div><div id="memola-gallery-view" class="memola-altview"></div><div id="memola-calendar-view" class="memola-altview"></div><div id="memola-gantt-view" class="memola-altview"></div><div id="memola-backlinks-db" class="memola-backlinks" style="display:none"></div></div></div><div id="memola-lib"></div><aside id="memola-comments-pane"><div id="memola-comments-hd"><span>\u30B3\u30E1\u30F3\u30C8</span><button class="memola-pane-x" id="memola-comments-x" title="\u9589\u3058\u308B">'+$.close+'</button></div><div id="memola-comments-list"></div><div id="memola-comments-composer"><div id="memola-comments-target" style="display:none"><span id="memola-comments-target-lbl"></span><button id="memola-comments-target-x" title="\u30DA\u30FC\u30B8\u5168\u4F53\u306B\u623B\u3059">\xD7</button></div><textarea id="memola-comments-ta" placeholder="\u30B3\u30E1\u30F3\u30C8\u3092\u8FFD\u52A0..." rows="2"></textarea><div id="memola-comments-footer"><div class="memola-cmt-scope"><button class="memola-cmt-scope-btn" id="memola-comments-scope-org">\u7D44\u7E54</button><button class="memola-cmt-scope-btn" id="memola-comments-scope-user">\u{1F512} \u500B\u4EBA</button></div><button class="memola-btn p" id="memola-comments-add">\u9001\u4FE1</button></div></div></aside><aside id="memola-props"><div id="memola-props-hd"><span>\u30D7\u30ED\u30D1\u30C6\u30A3</span><button class="memola-pane-x" id="memola-props-x" title="\u9589\u3058\u308B">'+$.close+'</button></div><div id="memola-props-list"></div></aside><aside id="memola-ai-panel"><div id="memola-ai-hd"><span class="memola-ai-title">'+$.sparkle+'<span>AI\u30C1\u30E3\u30C3\u30C8</span></span><button id="memola-ai-new" title="\u65B0\u3057\u3044\u4F1A\u8A71">'+$.plus+'</button><button id="memola-ai-clear" title="\u73FE\u5728\u306E\u4F1A\u8A71\u3092\u524A\u9664">'+$.trash+'</button><button id="memola-ai-close" class="memola-pane-x" title="\u9589\u3058\u308B">'+$.close+'</button></div><div id="memola-ai-hist-row"><select id="memola-ai-hist" title="\u4F1A\u8A71\u5C65\u6B74"></select></div><div id="memola-ai-messages"></div><div id="memola-ai-chips"></div><div id="memola-ai-inputarea"><select id="memola-ai-model-pick" title="\u30D7\u30ED\u30D0\u30A4\u30C0\u30FB\u30E2\u30C7\u30EB\u9078\u629E"></select><textarea id="memola-ai-input" placeholder="\u3053\u306E\u30DA\u30FC\u30B8\u306B\u3064\u3044\u3066\u805E\u304F\u2026" rows="2"></textarea><button id="memola-ai-send" title="\u9001\u4FE1 (\u2318\u21B5)">'+$.send+`</button></div></aside></div><div id="memola-ld"><span>\u23F3</span><span id="memola-lm"> \u8AAD\u307F\u8FBC\u307F\u4E2D...</span></div></main><div id="memola-md"><div class="memola-mb"><h2>\u{1F680} \u521D\u671F\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7</h2><p>\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u30E9\u30A4\u30D6\u30E9\u30EA\u306B <code>memola-pages</code> \u30D5\u30A9\u30EB\u30C0\u3092\u4F5C\u6210\u3057\u3066\u3088\u3044\u3067\u3059\u304B\uFF1F<br>\u30DA\u30FC\u30B8\u306F .md \u30D5\u30A1\u30A4\u30EB\u3068\u3057\u3066\u3053\u3053\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002</p><div class="memola-ma"><button class="memola-btn s" id="memola-mc">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" id="memola-mk">\u30D5\u30A9\u30EB\u30C0\u3092\u4F5C\u6210</button></div></div></div><div id="memola-col-md"><div class="memola-mb" style="max-width:380px"><h2>\u5217\u3092\u8FFD\u52A0</h2><div class="memola-col-row"><label>\u5217\u540D</label><input id="memola-col-name" class="memola-col-inp" type="text" placeholder="\u4F8B: \u62C5\u5F53\u8005"></div><div class="memola-col-row"><label>\u30BF\u30A4\u30D7</label><div id="memola-col-type-grid"><div class="memola-col-type" data-tk="2"  data-ic="Aa"><span class="memola-col-type-ic">Aa</span><span>\u30C6\u30AD\u30B9\u30C8</span></div><div class="memola-col-type" data-tk="3"  data-ic="\xB6"><span class="memola-col-type-ic">\xB6</span><span>\u8907\u6570\u884C</span></div><div class="memola-col-type" data-tk="9"  data-ic="#"><span class="memola-col-type-ic">#</span><span>\u6570\u5024</span></div><div class="memola-col-type" data-tk="4"  data-ic="\u{1F4C5}"><span class="memola-col-type-ic">\u{1F4C5}</span><span>\u65E5\u4ED8</span></div><div class="memola-col-type" data-tk="6"  data-ic="\u25C9"><span class="memola-col-type-ic">\u25C9</span><span>\u30BB\u30EC\u30AF\u30C8</span></div><div class="memola-col-type" data-tk="15" data-ic="\u25CE"><span class="memola-col-type-ic">\u25CE</span><span>\u30DE\u30EB\u30C1</span></div><div class="memola-col-type" data-tk="8"  data-ic="\u2610"><span class="memola-col-type-ic">\u2610</span><span>\u30C1\u30A7\u30C3\u30AF</span></div><div class="memola-col-type" data-tk="11" data-ic="\u{1F517}"><span class="memola-col-type-ic">\u{1F517}</span><span>URL</span></div><div class="memola-col-type" data-tk="20" data-ic="\u{1F464}"><span class="memola-col-type-ic">\u{1F464}</span><span>\u62C5\u5F53\u8005</span></div><div class="memola-col-type" data-tk="7"  data-ic="\u2194"><span class="memola-col-type-ic">\u2194</span><span>\u95A2\u4FC2</span></div><div class="memola-col-type" data-tk="17" data-ic="\u03A3"><span class="memola-col-type-ic">\u03A3</span><span>\u30ED\u30FC\u30EB\u30A2\u30C3\u30D7</span></div><div class="memola-col-type" data-tk="17" data-ic="\u0192"><span class="memola-col-type-ic">\u0192</span><span>\u6570\u5F0F</span></div><div class="memola-col-type" data-tk="18" data-ic="\u{1F4CE}"><span class="memola-col-type-ic">\u{1F4CE}</span><span>\u30D5\u30A1\u30A4\u30EB</span></div></div></div><div class="memola-col-row" id="memola-col-choices-row"><label>\u9078\u629E\u80A2\uFF081\u884C1\u3064\uFF09</label><textarea id="memola-col-choices" class="memola-col-choices" placeholder="\u4F8B:
\u9032\u884C\u4E2D
\u5B8C\u4E86
\u672A\u7740\u624B"></textarea></div><div class="memola-col-row"><label>SharePoint\u30EA\u30B9\u30C8\u306E\u5217\u306B\u30DE\u30C3\u30D7</label><input id="memola-col-spmap" class="memola-col-inp" type="text" placeholder="\u81EA\u52D5\u63A8\u5B9A"></div><div class="memola-ma"><button class="memola-btn s" id="memola-col-cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" id="memola-col-ok">\u8FFD\u52A0</button></div></div></div><div id="memola-ftb"><button class="memola-fb" data-cmd="bold" title="\u592A\u5B57"><b>B</b></button><button class="memola-fb" data-cmd="italic" title="\u659C\u4F53"><i>I</i></button><button class="memola-fb" data-cmd="strike" title="\u53D6\u308A\u6D88\u3057\u7DDA"><s>S</s></button><button class="memola-fb" data-cmd="code" title="\u30A4\u30F3\u30E9\u30A4\u30F3\u30B3\u30FC\u30C9">`+$.code+'</button><button class="memola-fb" data-cmd="link" title="\u30EA\u30F3\u30AF\uFF08URL / UNC\u30D1\u30B9\uFF09">'+$.link+'</button><button class="memola-fb" data-cmd="comment" title="\u30B3\u30E1\u30F3\u30C8">\u{1F4AC}</button><span class="memola-fb-sep"></span><button class="memola-fb" data-cmd="h1" title="\u898B\u51FA\u30571"><b>H1</b></button><button class="memola-fb" data-cmd="h2" title="\u898B\u51FA\u30572"><b>H2</b></button><button class="memola-fb" data-cmd="h3" title="\u898B\u51FA\u30573"><b>H3</b></button><span class="memola-fb-sep"></span><button class="memola-fb" data-cmd="ul" title="\u7B87\u6761\u66F8\u304D">'+$.ul+'</button><button class="memola-fb" data-cmd="ol" title="\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8">'+$.ol+'</button><button class="memola-fb" data-cmd="quote" title="\u5F15\u7528">'+$.quote+`</button></div><div id="memola-slash"></div><div id="memola-qs"><div id="memola-qs-box"><input id="memola-qs-inp" type="text" placeholder="\u30DA\u30FC\u30B8\u3092\u691C\u7D22..."><div id="memola-qs-res"></div></div></div><div id="memola-emoji"><div id="memola-emoji-grid"></div><button id="memola-emoji-rm">\u30A2\u30A4\u30B3\u30F3\u3092\u524A\u9664</button></div><div id="memola-inbox-md"><div class="memola-mb" style="max-width:560px"><h2>\u{1F4E5} \u53D7\u4FE1\u30C8\u30EC\u30A4</h2><div id="memola-inbox-list"></div><div class="memola-ma"><button class="memola-btn ghost" id="memola-inbox-readall">\u3059\u3079\u3066\u65E2\u8AAD</button><button class="memola-btn s" id="memola-inbox-close">\u9589\u3058\u308B</button></div></div></div><div id="memola-trash-md"><div class="memola-mb" style="max-width:540px"><h2>\u30B4\u30DF\u7BB1</h2><div id="memola-trash-list"></div><div class="memola-ma"><button class="memola-btn ghost" id="memola-trash-empty" style="color:#b13a3a">\u{1F5D1} \u3059\u3079\u3066\u5B8C\u5168\u524A\u9664</button><button class="memola-btn s" id="memola-trash-close">\u9589\u3058\u308B</button></div></div></div><div id="memola-settings-md"><div class="memola-mb memola-set-mb"><h2>\u2699 \u8A2D\u5B9A</h2><div class="memola-set-body"><nav class="memola-set-nav"><div class="memola-set-major" data-major="personal"><div class="memola-set-major-h">\u500B\u4EBA\u8A2D\u5B9A</div><div class="memola-set-major-sub">\u3053\u306E\u7AEF\u672B\u306E\u30D6\u30E9\u30A6\u30B6\u306B\u4FDD\u5B58\uFF08\u4ED6\u306E\u4EBA\u306B\u306F\u5F71\u97FF\u3057\u307E\u305B\u3093\uFF09</div><button class="memola-set-tab on" data-tab="ai">\u{1F916} AI \u30D7\u30ED\u30D0\u30A4\u30C0</button><button class="memola-set-tab" data-tab="display">\u{1F3A8} \u8868\u793A</button></div><div class="memola-set-major" data-major="shared"><div class="memola-set-major-h">\u5171\u901A\u8A2D\u5B9A</div><div class="memola-set-major-sub">\u4FDD\u5B58\u30FB\u540C\u671F\u30FB\u30D7\u30EC\u30BC\u30F3\u30B9\u306E\u6319\u52D5</div><button class="memola-set-tab" data-tab="save">\u{1F4BE} \u4FDD\u5B58\u3068\u540C\u671F</button></div><div class="memola-set-major" data-major="other"><div class="memola-set-major-h">\u305D\u306E\u4ED6</div><button class="memola-set-tab" data-tab="help">\u2328 \u30D8\u30EB\u30D7</button><button class="memola-set-tab" data-tab="dev">\u{1F6E0} \u958B\u767A\u8005</button><button class="memola-set-tab danger" data-tab="debug">\u26A0 \u30EA\u30BB\u30C3\u30C8</button></div></nav><div class="memola-set-panes"><div class="memola-set-pane on" data-pane="ai"><div class="memola-set-row"><label>\u4F7F\u7528\u3059\u308B\u30B5\u30FC\u30D3\u30B9</label><select id="memola-set-provider"><option value="claude">Anthropic Claude</option><option value="corp">Azure OpenAI \u4E92\u63DB API</option><option value="local">\u30ED\u30FC\u30AB\u30EB AI (Ollama / LM Studio \u7B49)</option></select></div><div class="memola-set-row" data-prov="claude"><label>Claude \u30E2\u30C7\u30EB</label><select id="memola-set-claude-model"></select></div><div class="memola-set-row" data-prov="claude"><label>Claude API \u30AD\u30FC</label><input id="memola-set-aikey" type="password" placeholder="sk-ant-..."></div><div class="memola-set-row" data-prov="corp"><label>Azure OpenAI \u4E92\u63DB \u30E2\u30C7\u30EB</label><select id="memola-set-corpai-model"></select></div><div class="memola-set-row" data-prov="corp"><label>API \u30AD\u30FC</label><input id="memola-set-corpai-key" type="password" placeholder="api-key (Azure OpenAI \u306E\u30AD\u30FC / \u30B2\u30FC\u30C8\u30A6\u30A7\u30A4\u306E\u30B5\u30D6\u30B9\u30AF\u30EA\u30D7\u30B7\u30E7\u30F3\u30AD\u30FC)"></div><div class="memola-set-row" data-prov="corp"><label>\u30D9\u30FC\u30B9 URL</label><input id="memola-set-corpai-baseurl" type="text" placeholder="https://&lt;resource&gt;.openai.azure.com"></div><div class="memola-set-row" data-prov="corp"><label>\u30C7\u30D7\u30ED\u30A4 ID \u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9</label><input id="memola-set-corpai-prefix" type="text" placeholder="(\u4EFB\u610F \u2014 \u30E2\u30C7\u30EB\u540D\u3068\u540C\u3058\u30C7\u30D7\u30ED\u30A4\u540D\u306A\u3089\u7A7A\u6B04\u3067OK)"></div><div class="memola-set-row" data-prov="corp"><label>\u30E2\u30C7\u30EB\u5225\u30AA\u30FC\u30D0\u30FC\u30E9\u30A4\u30C9 (\u4EFB\u610F / JSON)</label><textarea id="memola-set-corpai-overrides" rows="6" placeholder='{"gpt-5":{"baseUrl":"https://...","apiVersion":"2025-01-01-preview","deploymentId":"..."}}' style="font-family:var(--font-mono);font-size:11px"></textarea></div><div class="memola-set-row" data-prov="corp"><label></label><div class="memola-set-hint"><b>\u5BFE\u5FDC\u30B5\u30FC\u30D3\u30B9</b>: Azure OpenAI Service\u3001Azure API Management \u7D4C\u7531\u306E\u30E9\u30C3\u30D1\u30FC\u3001\u793E\u5185 API \u30B2\u30FC\u30C8\u30A6\u30A7\u30A4\u7B49\u3002<br><b>URL \u306E\u7D44\u307F\u7ACB\u3066\u65B9</b>: <code>{\u30D9\u30FC\u30B9 URL}/openai/deployments/{\u30C7\u30D7\u30ED\u30A4 ID}/chat/completions?api-version={api-version}</code><br>\u203B \u30D9\u30FC\u30B9 URL \u306E\u4F8B \u2014 Azure \u672C\u5BB6: <code>https://&lt;resource&gt;.openai.azure.com</code>\u3001\u30B2\u30FC\u30C8\u30A6\u30A7\u30A4: <code>https://gateway.example.com/myapi/2024-10-21</code><br>\u203B \u30C7\u30D7\u30ED\u30A4 ID \u306F <code>{\u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9}{\u30E2\u30C7\u30EB\u540D(.\u306F\u524A\u9664)}</code> \u3067\u7D44\u307F\u7ACB\u3066 (Azure \u672C\u5BB6\u3067\u30C7\u30D7\u30ED\u30A4\u540D = \u30E2\u30C7\u30EB\u540D\u306B\u3057\u3066\u3044\u308B\u5834\u5408\u306F\u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9\u7A7A\u6B04\u3067OK)<br>\u203B api-version \u30C7\u30D5\u30A9\u30EB\u30C8 \u2014 \u63A8\u8AD6\u7CFB (GPT-5/o3/o4-mini): <code>2024-12-01-preview</code>\u3001\u305D\u308C\u4EE5\u5916: <code>2024-06-01</code><br>\u2014<br>\u30E2\u30C7\u30EB\u5225\u306B\u9055\u3046\u8A2D\u5B9A (\u5225\u30A8\u30F3\u30C9\u30DD\u30A4\u30F3\u30C8\u306A\u3069) \u304C\u5FC5\u8981\u306A\u5834\u5408\u306F\u30AA\u30FC\u30D0\u30FC\u30E9\u30A4\u30C9\u306B <code>{"\u30E2\u30C7\u30EB\u540D":{"baseUrl":"...","apiVersion":"...","deploymentId":"..."}}</code> \u3092\u8A18\u5165\u3002\u5404\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u4EFB\u610F\u30FB\u672A\u6307\u5B9A\u3067\u5168\u4F53\u8A2D\u5B9A\u306B\u30D5\u30A9\u30FC\u30EB\u30D0\u30C3\u30AF\u3002<br>\u30DA\u30FC\u30B8/DB \u64CD\u4F5C\u306E\u30C4\u30FC\u30EB\u6A5F\u80FD (Function Calling) \u3082\u5229\u7528\u53EF\u80FD\u3002</div></div><div class="memola-set-row" data-prov="local"><label>\u30D9\u30FC\u30B9 URL</label><input id="memola-set-localai-baseurl" type="text" placeholder="http://localhost:11434/v1 (Ollama) / http://localhost:1234/v1 (LM Studio)"></div><div class="memola-set-row" data-prov="local"><label>API \u30AD\u30FC (\u4EFB\u610F)</label><input id="memola-set-localai-key" type="password" placeholder="\u30ED\u30FC\u30AB\u30EB\u30B5\u30FC\u30D0\u5074\u3067\u8981\u6C42\u3059\u308B\u5834\u5408\u306E\u307F"></div><div class="memola-set-row" data-prov="local"><label>\u4F7F\u7528\u3059\u308B\u30E2\u30C7\u30EB</label><input id="memola-set-localai-model" type="text" placeholder="\u4F8B: llama3.1, qwen2.5-coder, mistral-small"></div><div class="memola-set-row" data-prov="local"><label>\u30E2\u30C7\u30EB\u5019\u88DC (\u4EFB\u610F / 1\u884C1\u30E2\u30C7\u30EB)</label><textarea id="memola-set-localai-models" rows="4" placeholder="llama3.1
qwen2.5-coder
gemma3:4b
mistral-small" style="font-family:var(--font-mono);font-size:11px"></textarea></div><div class="memola-set-row" data-prov="local"><label>\u63A8\u8AD6\u30E2\u30C7\u30EB (\u4EFB\u610F)</label><input id="memola-set-localai-reasoning" type="text" placeholder="\u540D\u524D\u306E\u4E00\u90E8\u3092\u7A7A\u767D\u533A\u5207\u308A (\u4F8B: o1 deepseek-r1 qwq) \u2500 \u4E00\u81F4\u3059\u308B\u30E2\u30C7\u30EB\u306F max_completion_tokens \u3092\u4F7F\u3046"></div><div class="memola-set-row" data-prov="local"><label></label><div class="memola-set-hint"><b>\u5BFE\u5FDC\u30B5\u30FC\u30D0</b>: Ollama\u3001LM Studio\u3001llama.cpp server\u3001vLLM\u3001\u305D\u306E\u4ED6 OpenAI Chat Completions \u4E92\u63DB\u306E\u3082\u306E\u3002<br><b>\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7\u4F8B (Ollama)</b>: <code>ollama serve</code> \u8D77\u52D5\u5F8C\u3001\u30D9\u30FC\u30B9 URL \u306B <code>http://localhost:11434/v1</code>\u3001\u30E2\u30C7\u30EB\u306B <code>llama3.1</code> \u7B49\u3092\u6307\u5B9A\u3002<br><b>\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7\u4F8B (LM Studio)</b>: \u300CLocal Server\u300D\u30BF\u30D6\u3067 Start\u3002\u30D9\u30FC\u30B9 URL <code>http://localhost:1234/v1</code>\u3001\u30E2\u30C7\u30EB\u306B UI \u306E\u30E2\u30C7\u30EB\u540D\u3092\u30B3\u30D4\u30FC\u3002<br><b>URL \u5F62\u5F0F</b>: <code>{\u30D9\u30FC\u30B9 URL}/chat/completions</code>\u3002<code>/v1</code> \u307E\u3067\u542B\u3081\u308B\u306E\u304C\u4E00\u822C\u7684\u3002<br>\u203B \u30D6\u30C3\u30AF\u30DE\u30FC\u30AF\u30EC\u30C3\u30C8\u3092\u958B\u3044\u3066\u3044\u308B SP \u30B5\u30A4\u30C8 (https) \u304B\u3089\u30ED\u30FC\u30AB\u30EB (http) \u306E <code>localhost</code> \u3092\u53E9\u3051\u308B\u304B\u306F\u30D6\u30E9\u30A6\u30B6\u306E\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3\u8A2D\u5B9A\u6B21\u7B2C\u3002\u53E9\u3051\u306A\u3044\u5834\u5408\u306F\u4E2D\u7D99\u30B9\u30AF\u30EA\u30D7\u30C8 (scripts/corp-ai-relay.py \u6539) \u7D4C\u7531\u3067\u540C\u30AA\u30EA\u30B8\u30F3\u306B\u898B\u305B\u304B\u3051\u308B\u304B\u3001\u30ED\u30FC\u30AB\u30EB AI \u30B5\u30FC\u30D0\u3092 HTTPS \u5316\u3057\u3066\u304F\u3060\u3055\u3044\u3002<br>\u203B Function Calling (\u30C4\u30FC\u30EB\u7D4C\u7531\u306E\u30DA\u30FC\u30B8/DB \u64CD\u4F5C) \u306F OpenAI \u4E92\u63DB tools \u30D1\u30E9\u30E1\u30FC\u30BF\u3092\u5B9F\u88C5\u3057\u305F\u30B5\u30FC\u30D0 (Ollama 0.3+ \u7B49) \u306E\u307F\u52D5\u4F5C\u3002</div></div><div class="memola-set-row"><label style="font-weight:600;border-top:1px solid var(--border,#e3e3e0);padding-top:14px">\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8 (RAG / \u57CB\u3081\u8FBC\u307F)</label><div class="memola-set-hint" style="border-top:1px solid var(--border,#e3e3e0);padding-top:14px">\u6587\u66F8\u3092\u6A2A\u65AD\u3057\u3066\u691C\u7D22\u30FB\u56DE\u7B54\u3059\u308B\u300C\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8\u300D\u7528\u306E\u57CB\u3081\u8FBC\u307F\u8A2D\u5B9A\u3002</div></div><div class="memola-set-row"><label>\u57CB\u3081\u8FBC\u307F\u30D7\u30ED\u30D0\u30A4\u30C0</label><select id="memola-set-embed-provider"><option value="voyage">Voyage AI (\u4E2D\u7D99\u4E0D\u8981\u30FBClaude\u4F75\u7528\u306E\u63A8\u5968)</option><option value="auto">\u30C1\u30E3\u30C3\u30C8\u3068\u540C\u3058 (Azure OpenAI \u4E92\u63DB / \u30ED\u30FC\u30AB\u30EB AI)</option></select></div><div class="memola-set-row" data-embprov="voyage"><label>Voyage API \u30AD\u30FC</label><input id="memola-set-voyage-key" type="password" placeholder="pa-... (https://dashboard.voyageai.com \u3067\u53D6\u5F97)"></div><div class="memola-set-row" data-embprov="voyage"><label>Voyage \u30E2\u30C7\u30EB</label><select id="memola-set-voyage-model"></select></div><div class="memola-set-row" data-prov="claude" data-embprov="auto"><label></label><div class="memola-set-hint">\u203B Anthropic Claude \u306B\u306F\u57CB\u3081\u8FBC\u307F API \u304C\u7121\u3044\u305F\u3081\u3001\u300C\u30C1\u30E3\u30C3\u30C8\u3068\u540C\u3058\u300D\u3067\u306F\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8 (RAG) \u306F\u4F7F\u3048\u307E\u305B\u3093\u3002<b>\u57CB\u3081\u8FBC\u307F\u30D7\u30ED\u30D0\u30A4\u30C0\u306B\u300CVoyage AI\u300D\u3092\u9078\u3076</b>\u3068\u3001Claude \u30C1\u30E3\u30C3\u30C8\u306E\u307E\u307E\u4E2D\u7D99\u30B5\u30FC\u30D0\u7121\u3057\u3067 RAG \u304C\u6709\u52B9\u306B\u306A\u308A\u307E\u3059 (\u63A8\u5968)\u3002</div></div><div class="memola-set-row" data-embprov="auto" data-prov="corp,local"><label>\u57CB\u3081\u8FBC\u307F\u30E2\u30C7\u30EB</label><select id="memola-set-embed-model"></select></div><div class="memola-set-row" data-embprov="auto" data-prov="corp"><label>\u57CB\u3081\u8FBC\u307F api-version</label><input id="memola-set-embed-apiver" type="text" placeholder="2024-02-01"></div><div class="memola-set-row"><label>\u51FA\u529B\u6B21\u5143\u6570 (\u4EFB\u610F)</label><input id="memola-set-embed-dims" type="number" min="1" placeholder="\u7A7A\u6B04=\u30E2\u30C7\u30EB\u65E2\u5B9A (voyage-3.5-lite:1024 / text-embedding-3-small:1536)"></div><div class="memola-set-row"><label>\u53D6\u5F97\u4EF6\u6570 (top-K)</label><input id="memola-set-rag-topk" type="number" min="1" max="50" placeholder="8"></div><div class="memola-set-row"><label>\u6700\u5C0F\u30B9\u30B3\u30A2</label><input id="memola-set-rag-minscore" type="number" min="0" max="1" step="0.05" placeholder="0.2"></div><div class="memola-set-row"><label style="font-weight:600;border-top:1px solid var(--border,#e3e3e0);padding-top:14px">外部ベクトル \u9023\u643A (\u6A2A\u65AD\u691C\u7D22)</label><div class="memola-set-hint" style="border-top:1px solid var(--border,#e3e3e0);padding-top:14px">外部ベクトル \u304C\u53CE\u96C6\u3057\u305F\u30D9\u30AF\u30C8\u30EB(\u30E1\u30FC\u30EB/OneNote/PPTX\u7B49)\u3092\u6A2A\u65AD\u30C1\u30E3\u30C3\u30C8\u306E\u691C\u7D22\u5BFE\u8C61\u306B\u52A0\u3048\u307E\u3059\u3002<b>\u57CB\u3081\u8FBC\u307F\u30E2\u30C7\u30EB/\u6B21\u5143\u3092 外部ベクトル \u3068\u540C\u3058</b>\u306B\u3057\u3066\u304A\u304F\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059(\u4E0D\u4E00\u81F4\u306E\u30D9\u30AF\u30C8\u30EB\u306F\u81EA\u52D5\u3067\u30B9\u30AD\u30C3\u30D7)\u3002\u672C\u6587\u306F\u30D9\u30AF\u30C8\u30EB\u30D5\u30A1\u30A4\u30EB\u5185\u306B\u3042\u308B\u305F\u3081\u4E2D\u7D99\u30B5\u30FC\u30D0\u306F\u4E0D\u8981\u3067\u3059\u3002</div></div><div class="memola-set-row"><label>外部ベクトル \u30D9\u30AF\u30C8\u30EB\u30D5\u30A9\u30EB\u30C0</label><input id="memola-set-rag-extvec-folder" type="text" placeholder="\u4F8B: Shared Documents/外部ベクトル (\u7A7A\u6B04=\u7121\u52B9)"></div><div class="memola-set-row"><label>\u691C\u7D22\u5BFE\u8C61\u306E\u7A2E\u985E</label><div class="memola-set-hint" style="display:flex;flex-wrap:wrap;gap:10px 16px"><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-mail">\u30E1\u30FC\u30EB</label><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-onenote">OneNote</label><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-pptx">PPTX</label><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-doc">\u6587\u66F8</label><label style="display:flex;align-items:center;gap:5px"><input type="checkbox" id="memola-set-rag-extvec-transcript">\u6587\u5B57\u8D77\u3053\u3057</label></div></div><div class="memola-set-row"><label></label><div class="memola-set-hint"><b>Voyage AI</b>: \u30D6\u30E9\u30A6\u30B6\u304B\u3089\u76F4\u63A5\u547C\u3079\u308B (CORS\u5BFE\u5FDC) \u305F\u3081\u4E2D\u7D99\u30B5\u30FC\u30D0\u4E0D\u8981\u3002Claude \u30C1\u30E3\u30C3\u30C8\u3068\u306E\u4F75\u7528\u306B\u6700\u9069\u3002<br><b>\u30C1\u30E3\u30C3\u30C8\u3068\u540C\u3058</b>: corp=<code>{\u30D9\u30FC\u30B9URL}/openai/deployments/{\u30D7\u30EC\u30D5\u30A3\u30C3\u30AF\u30B9+\u30E2\u30C7\u30EB}/embeddings</code>\u3001local=<code>{\u30D9\u30FC\u30B9URL}/embeddings</code>\u3002<br>\u203B \u53D6\u5F97\u4EF6\u6570=\u6587\u8108\u3078\u6E21\u3059\u985E\u4F3C\u30C1\u30E3\u30F3\u30AF\u306E\u6700\u5927\u6570\u3001\u6700\u5C0F\u30B9\u30B3\u30A2=\u30B3\u30B5\u30A4\u30F3\u985E\u4F3C\u5EA6\u306E\u8DB3\u5207\u308A (0\u301C1)\u3002<br>\u203B \u57CB\u3081\u8FBC\u307F\u30E2\u30C7\u30EB/\u6B21\u5143\u3092\u5909\u3048\u305F\u3089\u65E2\u5B58\u30D9\u30AF\u30C8\u30EB\u306F\u7121\u52B9\u306B\u306A\u308A\u307E\u3059 \u2014 \u8A2D\u5B9A\u2192\u30EA\u30BB\u30C3\u30C8\u3067\u4F5C\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div></div></div><div class="memola-set-pane" data-pane="save"><div class="memola-set-row"><label>\u81EA\u52D5\u4FDD\u5B58</label><select id="memola-set-savedelay"><option value="0">\u624B\u52D5\u306E\u307F (Ctrl/\u2318+S)</option><option value="1000">1 \u79D2\u5F8C</option><option value="2000" selected>2 \u79D2\u5F8C (\u65E2\u5B9A)</option><option value="5000">5 \u79D2\u5F8C</option><option value="10000">10 \u79D2\u5F8C</option><option value="30000">30 \u79D2\u5F8C</option></select></div><div class="memola-set-row"><label>\u540C\u671F\u30C1\u30A7\u30C3\u30AF</label><select id="memola-set-syncpoll"><option value="0">\u30AA\u30D5 (1 \u4EBA\u904B\u7528)</option><option value="30000" selected>30 \u79D2\u3054\u3068 (\u65E2\u5B9A)</option><option value="60000">1 \u5206\u3054\u3068</option><option value="300000">5 \u5206\u3054\u3068</option></select></div><div class="memola-set-row"><label>\u30D7\u30EC\u30BC\u30F3\u30B9\u8868\u793A</label><select id="memola-set-presence"><option value="1" selected>ON (\u30A2\u30D0\u30BF\u30FC\u3092\u5171\u6709/\u8868\u793A)</option><option value="0">OFF (SP \u306B\u66F8\u304D\u8FBC\u307E\u306A\u3044)</option></select></div><div class="memola-set-row"><label></label><div class="memola-set-hint"><b>\u81EA\u52D5\u4FDD\u5B58</b>: \u300C\u624B\u52D5\u306E\u307F\u300D\u306B\u3059\u308B\u3068\u7DE8\u96C6\u4E2D\u306E\u81EA\u52D5 SP \u66F8\u304D\u8FBC\u307F\u304C\u6B62\u307E\u308A\u3001Ctrl/\u2318+S \u3067\u3060\u3051\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002SP \u8CA0\u8377\u306E\u6700\u5C0F\u5316\u3084\u30D0\u30C3\u30C6\u30EA\u30FC\u7BC0\u7D04\u306B\u3002<br><b>\u540C\u671F\u30C1\u30A7\u30C3\u30AF</b>: \u958B\u3044\u3066\u3044\u308B\u30DA\u30FC\u30B8\u304C\u4ED6\u30BF\u30D6/\u4ED6\u30E6\u30FC\u30B6\u306B\u66F4\u65B0\u3055\u308C\u305F\u304B\u3092\u30DD\u30FC\u30EA\u30F3\u30B0\u691C\u77E5\u3057\u307E\u3059\u30021 \u4EBA\u904B\u7528\u306A\u3089\u300C\u30AA\u30D5\u300D\u3067\u8AA4\u901A\u77E5\u30BC\u30ED + SP \u8AAD\u307F\u53D6\u308A\u30BC\u30ED\u3002<br><b>\u30D7\u30EC\u30BC\u30F3\u30B9</b>: \u540C\u3058\u30DA\u30FC\u30B8\u3092\u898B\u3066\u3044\u308B\u30E6\u30FC\u30B6\u306E\u30A2\u30D0\u30BF\u30FC\u3092\u8868\u793A\u3059\u308B\u305F\u3081\u3001\u5B9A\u671F\u7684\u306B SP \u306B\u5B58\u5728\u3092\u66F8\u304D\u8FBC\u307F\u307E\u3059\u3002OFF \u3067\u3053\u306E\u66F8\u304D\u8FBC\u307F\u3092\u6B62\u3081\u3089\u308C\u307E\u3059\u3002</div></div></div><div class="memola-set-pane" data-pane="display"><div class="memola-set-row"><label>\u8868\u793A\u5BC6\u5EA6</label><select id="memola-set-density"><option value="compact">\u30B3\u30F3\u30D1\u30AF\u30C8</option><option value="regular" selected>\u6A19\u6E96</option><option value="comfy">\u3086\u3063\u305F\u308A</option></select></div><div class="memola-set-row"><label>\u30C6\u30FC\u30DE</label><select id="memola-set-theme"><option value="light" selected>\u30E9\u30A4\u30C8</option><option value="dark">\u30C0\u30FC\u30AF</option></select></div></div><div class="memola-set-pane" data-pane="help"><div class="memola-set-row"><label>\u30AD\u30FC\u30DC\u30FC\u30C9\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8</label><button class="memola-btn s" id="memola-set-shortcuts">\u2328 \u4E00\u89A7\u3092\u8868\u793A</button></div><div class="memola-set-row"><label></label><div class="memola-set-hint">\u4E3B\u8981\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u306F <code>?</code> \u30AD\u30FC (\u30A8\u30C7\u30A3\u30BF\u5916) \u3067\u3082\u4E00\u89A7\u304C\u958B\u304D\u307E\u3059\u3002</div></div><div class="memola-set-row"><label>\u30D3\u30EB\u30C9</label><code id="memola-set-build-id" style="font-size:12px;color:var(--ink-3)"></code></div><div class="memola-set-row"><label></label><div class="memola-set-hint">\u4E0D\u5177\u5408\u3092\u5831\u544A\u3059\u308B\u6642\u306B\u3053\u306E ID \u3092\u4E00\u7DD2\u306B\u4F1D\u3048\u3066\u304F\u3060\u3055\u3044\u3002\u53E4\u3044\u30D6\u30C3\u30AF\u30DE\u30FC\u30AF\u30EC\u30C3\u30C8\u3092\u4F7F\u3044\u7D9A\u3051\u3066\u3044\u306A\u3044\u304B\u306E\u78BA\u8A8D\u306B\u3082\u306A\u308A\u307E\u3059\u3002</div></div></div><div class="memola-set-pane" data-pane="dev"><div class="memola-set-row"><label>\u30D0\u30F3\u30C9\u30EB\u53D6\u5F97\u5143</label><select id="memola-set-dev-source"><option value="sharepoint">SharePoint (\u672C\u756A\u30FB\u81EA\u52D5\u66F4\u65B0)</option><option value="local">\u30ED\u30FC\u30AB\u30EB\u30EA\u30EC\u30FC (\u958B\u767A)</option></select></div><div class="memola-set-row" data-dev="local"><label>\u30ED\u30FC\u30AB\u30EB\u30D9\u30FC\u30B9 URL</label><input id="memola-set-dev-localbase" type="text" placeholder="http://127.0.0.1:18080/memola"></div><div class="memola-set-row"><label>relay \u914D\u4FE1\u30D5\u30A9\u30EB\u30C0</label><input id="memola-set-dev-relaydir" type="text" placeholder="\u4F8B: C:\\\\tools\\\\n365\\\\dist (relay \u304C memola.bundle.js \u3092\u914D\u308B\u5834\u6240)"><div class="memola-set-hint" id="memola-set-dev-relaydir-status">relay \u306B\u7167\u4F1A\u3057\u307E\u3059\u2026</div></div><div class="memola-set-row"><label>\u30EA\u30EC\u30FC\u306E\u66F4\u65B0</label><button class="memola-btn s" id="memola-set-relay-update">\u30EA\u30EC\u30FC\u66F4\u65B0\u3092\u78BA\u8A8D</button><div class="memola-set-hint" id="memola-set-relay-update-msg">SP \u306E relay-version.txt \u3068\u8D77\u52D5\u4E2D\u30EA\u30EC\u30FC\u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u6BD4\u8F03\u3057\u3001\u5DEE\u5206\u304C\u3042\u308C\u3070\u30B9\u30AF\u30EA\u30D7\u30C8(ps1/bat)\u3092\u81EA\u52D5\u66F4\u65B0\u3057\u3066\u518D\u8D77\u52D5\u3057\u307E\u3059\u3002</div></div><div class="memola-set-row"><label></label><div class="memola-set-hint">\u30D6\u30C3\u30AF\u30DE\u30FC\u30AF\u30EC\u30C3\u30C8\u306F<b>\u6975\u5C0F\u30ED\u30FC\u30C0</b>\u306B\u306A\u308A\u3001\u8D77\u52D5\u6642\u306B\u672C\u4F53(<code>memola.bundle.js</code>)\u3092\u53D6\u5F97\u3057\u307E\u3059\u3002<br><b>SharePoint</b>: \u30B5\u30A4\u30C8\u306E <code>\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8/memola/</code> \u306B\u7F6E\u3044\u305F <code>memola.bundle.js</code>\uFF0B<code>version.txt</code> \u3092\u6BCE\u56DE\u78BA\u8A8D\u3057\u3001\u66F4\u65B0\u304C\u3042\u308C\u3070\u81EA\u52D5\u3067\u6700\u65B0\u5316(\u518D\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u4E0D\u8981)\u3002<br><b>\u30ED\u30FC\u30AB\u30EB\u30EA\u30EC\u30FC</b>: <code>node build.js</code> \u5F8C\u306B\u30EA\u30EC\u30FC\u304C <code>dist/</code> \u3092\u914D\u4FE1\u3002\u30B3\u30FC\u30C9\u5909\u66F4\u2192\u30D3\u30EB\u30C9\u2192\u30EA\u30ED\u30FC\u30C9\u3067\u5373\u53CD\u6620(\u958B\u767A\u7528)\u3002<br>\u203B \u5909\u66F4\u306F<b>\u6B21\u56DE\u8D77\u52D5/\u30EA\u30ED\u30FC\u30C9</b>\u3067\u53CD\u6620\u3055\u308C\u307E\u3059\u3002</div></div></div><div class="memola-set-pane" data-pane="debug"><div class="memola-set-row"><label></label><div class="memola-set-hint" style="background:rgba(235,87,87,.10);border-left-color:rgba(235,87,87,.55);color:var(--ink)"><b>\u26A0 \u5371\u967A\u306A\u64CD\u4F5C</b><br>\u4EE5\u4E0B\u306E\u30EA\u30BB\u30C3\u30C8\u64CD\u4F5C\u306F\u3059\u3079\u3066<b>\u53D6\u308A\u6D88\u3057\u4E0D\u53EF</b>\u3067\u3059\u3002SP \u306E\u3054\u307F\u7BB1\u304B\u3089\u3082\u5FA9\u5143\u3067\u304D\u307E\u305B\u3093\u3002<br>\u5B9F\u884C\u524D\u306B\u5FC5\u8981\u306A\u30C7\u30FC\u30BF\u304C\u4ED6\u306B\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3055\u308C\u3066\u3044\u308B\u3053\u3068\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div></div><div class="memola-set-row"><label>1. \u81EA\u5206\u306E\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u306E\u307F\u524A\u9664</label><button class="memola-btn s" id="memola-set-reset-mine">\u524A\u9664\u3092\u5B9F\u884C</button><div class="memola-set-hint"><b>\u524A\u9664\u5BFE\u8C61</b>: \u81EA\u5206\u304C\u4F5C\u6210\u3057\u305F\u300C\u{1F512} \u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u300D\u306E\u30DA\u30FC\u30B8\u30FBDB \u306E\u307F<br><b>\u6B8B\u308B\u3082\u306E</b>: \u7D44\u7E54\u5171\u901A / \u4ED6\u306E\u30E6\u30FC\u30B6\u306E\u30DA\u30FC\u30B8\u30FBDB / localStorage \u306E\u8A2D\u5B9A (API \u30AD\u30FC\u30FB\u30C6\u30FC\u30DE\u7B49)</div></div><div class="memola-set-row"><label>2. \u7D44\u7E54+\u4ED6\u4EBA\u306E\u30C7\u30FC\u30BF\u306E\u307F\u524A\u9664</label><button class="memola-btn s" id="memola-set-reset-others">\u524A\u9664\u3092\u5B9F\u884C</button><div class="memola-set-hint"><b>\u524A\u9664\u5BFE\u8C61</b>: \u7D44\u7E54\u5171\u901A + \u4ED6\u306E\u30E6\u30FC\u30B6\u306E\u30DA\u30FC\u30B8\u30FBDB<br><b>\u6B8B\u308B\u3082\u306E</b>: \u81EA\u5206\u306E\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u30C7\u30FC\u30BF / localStorage \u306E\u8A2D\u5B9A</div></div><div class="memola-set-row"><label>3. \u5168\u30C7\u30FC\u30BF + \u8A2D\u5B9A\u3092\u521D\u671F\u5316</label><button class="memola-btn p" id="memola-set-reset-all" style="background:#c44;border-color:#c44">\u26A0 \u5B8C\u5168\u30EA\u30BB\u30C3\u30C8</button><div class="memola-set-hint"><b>\u524A\u9664\u5BFE\u8C61</b>: memola-* \u3067\u59CB\u307E\u308B\u5168 SP \u30EA\u30B9\u30C8 + memola. \u3067\u59CB\u307E\u308B\u5168 localStorage \u30AD\u30FC<br>\u5B9F\u884C\u5F8C\u306F\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u76F4\u5F8C\u306E\u72B6\u614B\u306B\u623B\u308A\u307E\u3059\u3002SP \u30DA\u30FC\u30B8\u3092 1 \u5EA6\u30EA\u30ED\u30FC\u30C9\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div></div></div></div></div><div class="memola-ma"><button class="memola-btn s" id="memola-set-cancel">\u30AD\u30E3\u30F3\u30BB\u30EB</button><button class="memola-btn p" id="memola-set-save">\u4FDD\u5B58</button></div></div></div><div id="memola-pgm"><div class="memola-pgm-item" data-action="export-md">`+$.download+'<span>Markdown\u3067\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8</span></div><div class="memola-pgm-item" data-action="export-html">'+$.download+'<span>HTML\u3067\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8</span></div><div class="memola-pgm-sep"></div><div class="memola-pgm-item" data-action="duplicate">'+$.copy+'<span>\u8907\u88FD</span></div><div class="memola-pgm-item" data-action="duplicate-as-draft">\u270F\uFE0F<span>\u4E0B\u66F8\u304D\u3068\u3057\u3066\u8907\u88FD</span></div><div class="memola-pgm-item" data-action="register-template">\u{1F9E9}<span>\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3068\u3057\u3066\u767B\u9332</span></div><div class="memola-pgm-item" data-action="version-history">\u{1F4DC}<span>\u30D0\u30FC\u30B8\u30E7\u30F3\u5C65\u6B74</span></div><div class="memola-pgm-item" data-action="copy-link">'+$.link+'<span>\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC</span></div><div class="memola-pgm-item" data-action="toggle-scope"><span class="memola-pgm-scope-ic">\u{1F512}</span><span class="memola-pgm-scope-label">\u7D44\u7E54\u306B\u516C\u958B</span></div><div class="memola-pgm-item" data-action="publish">'+$.link+'<span class="memola-pgm-publish-label">Web \u516C\u958B</span></div><div class="memola-pgm-item" data-action="copy-pub-url" style="display:none">'+$.copy+'<span>\u516C\u958B URL \u3092\u30B3\u30D4\u30FC</span></div><div class="memola-pgm-item" data-action="restore-daily" style="display:none">\u{1F4C5}<span>\u30C7\u30A4\u30EA\u30FC\u30CE\u30FC\u30C8\u306B\u623B\u3059</span></div><div class="memola-pgm-sep"></div><div class="memola-pgm-item" data-action="print">'+$.print+'<span>\u5370\u5237</span></div><div class="memola-pgm-item" data-action="info">'+$.info+'<span>\u30DA\u30FC\u30B8\u60C5\u5831</span></div><div class="memola-pgm-item" data-action="focus">'+$.sidebar+'<span>\u96C6\u4E2D\u30E2\u30FC\u30C9\u5207\u66FF</span></div><div class="memola-pgm-sep"></div><div class="memola-pgm-item danger" data-action="delete">'+$.trash+'<span>\u524A\u9664</span></div></div><div id="memola-tk"></div>'}Ph();var F1=`/* \u2500\u2500 Design tokens (Claude Design palette: paper + ink + moss) \u2500\u2500 */
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
`;(function(){let e=document.getElementById("memola-overlay");if(e){try{e.__memolaShutdown?.()}catch{}e.remove();let n=document.getElementById("memola-style");n&&n.remove();return}if(!location.hostname.endsWith("sharepoint.com")){alert("SharePoint\u306E\u30DA\u30FC\u30B8\u4E0A\u3067\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u304F\u3060\u3055\u3044\u3002");return}vb();let t=document.createElement("style");t.id="memola-style",t.textContent=F1,document.head.appendChild(t);let o=document.createElement("div");o.id="memola-overlay",o.innerHTML=xb(),document.body.appendChild(o),cb(),db()})();})();
