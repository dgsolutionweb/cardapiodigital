(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[920],{7337:function(e,t,r){Promise.resolve().then(r.bind(r,5776))},5776:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return l}});var i=r(7437),a=r(2265),o=r(4033),s=r(7823),n=r(5925);function l(){let e=(0,o.useRouter)(),[t,r]=(0,a.useState)(""),[l,d]=(0,a.useState)(""),[c,u]=(0,a.useState)(!1),[p,f]=(0,a.useState)("");async function m(r){r.preventDefault(),f(""),u(!0);try{let{data:r,error:i}=await s.OQ.auth.signInWithPassword({email:t,password:l});if(i)throw i;localStorage.setItem("admin_authenticated","true"),n.ZP.success("Login realizado com sucesso!"),e.push("/admin")}catch(e){console.error("Erro de login:",e),f(e.message||"Erro ao fazer login")}finally{u(!1)}}return(0,i.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",backgroundColor:"#f5f5f5",fontFamily:"Arial, sans-serif"},children:(0,i.jsxs)("div",{style:{backgroundColor:"white",padding:"30px",borderRadius:"8px",boxShadow:"0 2px 10px rgba(0,0,0,0.1)",width:"350px"},children:[(0,i.jsx)("h1",{style:{textAlign:"center",color:"#ff4400",marginBottom:"20px"},children:"Login Admin"}),p&&(0,i.jsx)("div",{style:{backgroundColor:"#ffebee",color:"#d32f2f",padding:"10px",borderRadius:"4px",marginBottom:"15px",fontSize:"14px"},children:p}),(0,i.jsxs)("form",{onSubmit:m,children:[(0,i.jsxs)("div",{style:{marginBottom:"15px"},children:[(0,i.jsx)("label",{style:{display:"block",marginBottom:"5px"},children:"Email:"}),(0,i.jsx)("input",{type:"email",value:t,onChange:e=>r(e.target.value),required:!0,style:{width:"100%",padding:"8px",boxSizing:"border-box",border:"1px solid #ddd",borderRadius:"4px"}})]}),(0,i.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,i.jsx)("label",{style:{display:"block",marginBottom:"5px"},children:"Senha:"}),(0,i.jsx)("input",{type:"password",value:l,onChange:e=>d(e.target.value),required:!0,style:{width:"100%",padding:"8px",boxSizing:"border-box",border:"1px solid #ddd",borderRadius:"4px"}})]}),(0,i.jsx)("button",{type:"submit",disabled:c,style:{width:"100%",padding:"10px",backgroundColor:"#ff4400",color:"white",border:"none",borderRadius:"4px",cursor:c?"not-allowed":"pointer",opacity:c?.7:1},children:c?"Entrando...":"Entrar"})]}),(0,i.jsx)("div",{style:{marginTop:"15px",textAlign:"center"},children:(0,i.jsx)("a",{href:"/",style:{color:"#ff4400",textDecoration:"none"},children:"Voltar para o Card\xe1pio"})})]})})}},7823:function(e,t,r){"use strict";r.d(t,{OQ:function(){return a}});var i=r(4756);let a=(0,i.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},4033:function(e,t,r){e.exports=r(94)},5925:function(e,t,r){"use strict";let i,a;r.d(t,{x7:function(){return eu},ZP:function(){return ep},Am:function(){return R}});var o,s=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let r="",i="",a="";for(let o in e){let s=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+s+";":i+="f"==o[1]?p(s,o):o+"{"+p(s,"k"==o[1]?"":t)+"}":"object"==typeof s?i+=p(s,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=s&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=p.p?p.p(o,s):o+":"+s+";")}return r+(t&&a?t+"{"+a+"}":a)+i},f={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e},h=(e,t,r,i,a)=>{var o;let s=m(e),n=f[s]||(f[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!f[n]){let t=s!==e?e:(e=>{let t,r,i=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?i.shift():t[3]?(r=t[3].replace(u," ").trim(),i.unshift(i[0][r]=i[0][r]||{})):i[0][t[1]]=t[2].replace(u," ").trim();return i[0]})(e);f[n]=p(a?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&f.g?f.g:null;return r&&(f.g=f[n]),o=f[n],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=i?o+t.data:t.data+o),n},g=(e,t,r)=>e.reduce((e,i,a)=>{let o=t[a];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+i+(null==o?"":o)},"");function y(e){let t=this||{},r=e.call?e(t.p):e;return h(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}y.bind({g:1});let b,x,v,w=y.bind({k:1});function E(e,t){let r=this||{};return function(){let i=arguments;function a(o,s){let n=Object.assign({},o),l=n.className||a.className;r.p=Object.assign({theme:x&&x()},n),r.o=/ *go\d+/.test(l),n.className=y.apply(r,i)+(l?" "+l:""),t&&(n.ref=s);let d=e;return e[0]&&(d=n.as||e,delete n.as),v&&d[0]&&v(n),b(d,n)}return t?t(a):a}}var k=e=>"function"==typeof e,j=(e,t)=>k(e)?e(t):e,I=(i=0,()=>(++i).toString()),C=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},O=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return O(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},z=[],S={toasts:[],pausedAt:void 0},D=e=>{S=O(S,e),z.forEach(e=>{e(S)})},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},A=(e={})=>{let[t,r]=(0,s.useState)(S),i=(0,s.useRef)(S);(0,s.useEffect)(()=>(i.current!==S&&r(S),z.push(r),()=>{let e=z.indexOf(r);e>-1&&z.splice(e,1)}),[]);let a=t.toasts.map(t=>{var r,i,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(i=e[t.type])?void 0:i.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...t,toasts:a}},N=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||I()}),P=e=>(t,r)=>{let i=N(t,e,r);return D({type:2,toast:i}),i.id},R=(e,t)=>P("blank")(e,t);R.error=P("error"),R.success=P("success"),R.loading=P("loading"),R.custom=P("custom"),R.dismiss=e=>{D({type:3,toastId:e})},R.remove=e=>D({type:4,toastId:e}),R.promise=(e,t,r)=>{let i=R.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?j(t.success,e):void 0;return a?R.success(a,{id:i,...r,...null==r?void 0:r.success}):R.dismiss(i),e}).catch(e=>{let a=t.error?j(t.error,e):void 0;a?R.error(a,{id:i,...r,...null==r?void 0:r.error}):R.dismiss(i)}),e};var _=(e,t)=>{D({type:1,toast:{id:e,height:t}})},M=()=>{D({type:5,time:Date.now()})},T=new Map,B=1e3,Z=(e,t=B)=>{if(T.has(e))return;let r=setTimeout(()=>{T.delete(e),D({type:4,toastId:e})},t);T.set(e,r)},F=e=>{let{toasts:t,pausedAt:r}=A(e);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),i=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&R.dismiss(t.id);return}return setTimeout(()=>R.dismiss(t.id),r)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[t,r]);let i=(0,s.useCallback)(()=>{r&&D({type:6,time:Date.now()})},[r]),a=(0,s.useCallback)((e,r)=>{let{reverseOrder:i=!1,gutter:a=8,defaultPosition:o}=r||{},s=t.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...i?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[t]);return(0,s.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)Z(e.id,e.removeDelay);else{let t=T.get(e.id);t&&(clearTimeout(t),T.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:_,startPause:M,endPause:i,calculateOffset:a}}},J=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,L=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,H=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,X=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${J} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${H} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,V=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Y=E("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${V} 1s linear infinite;
`,q=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,U=w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Q=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${U} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,G=E("div")`
  position: absolute;
`,K=E("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=E("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${W} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:i}=e;return void 0!==t?"string"==typeof t?s.createElement(ee,null,t):t:"blank"===r?null:s.createElement(K,null,s.createElement(Y,{...i}),"loading"!==r&&s.createElement(G,null,"error"===r?s.createElement(X,{...i}):s.createElement(Q,{...i})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ei=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=E("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,eo=E("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,es=(e,t)=>{let r=e.includes("top")?1:-1,[i,a]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),ei(r)];return{animation:t?`${w(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=s.memo(({toast:e,position:t,style:r,children:i})=>{let a=e.height?es(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(et,{toast:e}),n=s.createElement(eo,{...e.ariaProps},j(e.message,e));return s.createElement(ea,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof i?i({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});o=s.createElement,p.p=void 0,b=o,x=void 0,v=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:i,children:a})=>{let o=s.useCallback(t=>{if(t){let r=()=>{i(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return s.createElement("div",{ref:o,className:t,style:r},a)},ed=(e,t)=>{let r=e.includes("top"),i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...i}},ec=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:i,children:a,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:d}=F(r);return s.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(r=>{let o=r.position||t,n=ed(o,d.calculateOffset(r,{reverseOrder:e,gutter:i,defaultPosition:t}));return s.createElement(el,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?ec:"",style:n},"custom"===r.type?j(r.message,r):a?a(r):s.createElement(en,{toast:r,position:o}))}))},ep=R}},function(e){e.O(0,[36,971,472,744],function(){return e(e.s=7337)}),_N_E=e.O()}]);