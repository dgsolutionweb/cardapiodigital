(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[51],{2085:function(e,t,a){Promise.resolve().then(a.bind(a,2093))},2093:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return c}});var i=a(7437),r=a(2265),o=a(4033),s=a(7823),n=a(345),l=a(5925);function c(){let e=(0,o.useRouter)(),[t,a]=(0,r.useState)(""),[c,d]=(0,r.useState)(""),[u,m]=(0,r.useState)(null),[p,f]=(0,r.useState)(null),[g,h]=(0,r.useState)(!1),b=async a=>{if(a.preventDefault(),!t.trim())return l.ZP.error("O nome da categoria \xe9 obrigat\xf3rio");try{h(!0);let a=null;u&&(a=await (0,n.Ix)(u,"categories","images"));let{data:i,error:r}=await s.OQ.from("categories").insert({name:t,description:c||null,image_url:a,created_at:new Date().toISOString()}).select();if(r)throw r;l.ZP.success("Categoria criada com sucesso!"),e.push("/admin/categorias")}catch(e){console.error("Erro ao criar categoria:",e),l.ZP.error(e.message||"Erro ao criar categoria")}finally{h(!1)}};return(0,i.jsxs)("div",{children:[(0,i.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,i.jsx)("h1",{className:"text-3xl font-bold",children:"Nova Categoria"}),(0,i.jsx)("button",{onClick:()=>e.back(),className:"text-gray-600 hover:text-gray-900",children:"Voltar"})]}),(0,i.jsx)("div",{className:"bg-white rounded-lg shadow-md p-6",children:(0,i.jsxs)("form",{onSubmit:b,className:"space-y-6",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700 mb-1",children:"Nome *"}),(0,i.jsx)("input",{id:"name",type:"text",value:t,onChange:e=>a(e.target.value),required:!0,className:"input",placeholder:"Nome da categoria"})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"description",className:"block text-sm font-medium text-gray-700 mb-1",children:"Descri\xe7\xe3o"}),(0,i.jsx)("textarea",{id:"description",value:c,onChange:e=>d(e.target.value),className:"input min-h-[100px]",placeholder:"Descri\xe7\xe3o da categoria"})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"image",className:"block text-sm font-medium text-gray-700 mb-1",children:"Imagem"}),(0,i.jsx)("input",{id:"image",type:"file",accept:"image/*",onChange:e=>{var t;let a=(null===(t=e.target.files)||void 0===t?void 0:t[0])||null;if(a){m(a);let e=URL.createObjectURL(a);f(e)}},className:"block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"}),p&&(0,i.jsx)("div",{className:"mt-2",children:(0,i.jsx)("img",{src:p,alt:"Preview",className:"w-40 h-40 object-cover rounded-lg"})})]}),(0,i.jsx)("div",{className:"flex justify-end",children:(0,i.jsx)("button",{type:"submit",disabled:g,className:"bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors flex items-center space-x-2",children:g?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("span",{children:"Salvando..."}),(0,i.jsx)("div",{className:"animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"})]}):(0,i.jsx)("span",{children:"Salvar"})})})]})})]})}},7823:function(e,t,a){"use strict";a.d(t,{OQ:function(){return r}});var i=a(4756);let r=(0,i.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},345:function(e,t,a){"use strict";a.d(t,{Ix:function(){return n},WF:function(){return r},aF:function(){return s},xG:function(){return o}});var i=a(7823);let r="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMTlUMTM6Mzc6MTQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0xOVQxMzozNzoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f+lkGAAAALRJREFUeJzt0cENwDAIADFE0/0H6yhkgHug57OzKmk7M9sB3LXeCeyZkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDg/nxMKXAp7CKEAAAAASUVORK5CYII=";function o(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function s(e,t){return e.length<=t?e:e.slice(0,t)+"..."}async function n(e,t,a){try{let r="".concat(Date.now(),"_").concat(e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/--+/g,"-").trim()),o=a?"".concat(a,"/").concat(r):r,{data:s,error:n}=await i.OQ.storage.from(t).upload(o,e,{cacheControl:"3600",upsert:!1});if(n)throw n;let{data:l}=i.OQ.storage.from(t).getPublicUrl(o);return l.publicUrl}catch(e){return console.error("Erro ao fazer upload da imagem:",e),console.warn("Usando imagem placeholder como fallback"),r}}},4033:function(e,t,a){e.exports=a(94)},5925:function(e,t,a){"use strict";let i,r;a.d(t,{x7:function(){return eu},ZP:function(){return em},Am:function(){return G}});var o,s=a(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let a="",i="",r="";for(let o in e){let s=e[o];"@"==o[0]?"i"==o[1]?a=o+" "+s+";":i+="f"==o[1]?m(s,o):o+"{"+m(s,"k"==o[1]?"":t)+"}":"object"==typeof s?i+=m(s,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=s&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=m.p?m.p(o,s):o+":"+s+";")}return a+(t&&r?t+"{"+r+"}":r)+i},p={},f=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+f(e[a]);return t}return e},g=(e,t,a,i,r)=>{var o;let s=f(e),n=p[s]||(p[s]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(s));if(!p[n]){let t=s!==e?e:(e=>{let t,a,i=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?i.shift():t[3]?(a=t[3].replace(u," ").trim(),i.unshift(i[0][a]=i[0][a]||{})):i[0][t[1]]=t[2].replace(u," ").trim();return i[0]})(e);p[n]=m(r?{["@keyframes "+n]:t}:t,a?"":"."+n)}let l=a&&p.g?p.g:null;return a&&(p.g=p[n]),o=p[n],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=i?o+t.data:t.data+o),n},h=(e,t,a)=>e.reduce((e,i,r)=>{let o=t[r];if(o&&o.call){let e=o(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+i+(null==o?"":o)},"");function b(e){let t=this||{},a=e.call?e(t.p):e;return g(a.unshift?a.raw?h(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}b.bind({g:1});let y,x,v,w=b.bind({k:1});function I(e,t){let a=this||{};return function(){let i=arguments;function r(o,s){let n=Object.assign({},o),l=n.className||r.className;a.p=Object.assign({theme:x&&x()},n),a.o=/ *go\d+/.test(l),n.className=b.apply(a,i)+(l?" "+l:""),t&&(n.ref=s);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),y(c,n)}return t?t(r):r}}var j=e=>"function"==typeof e,A=(e,t)=>j(e)?e(t):e,N=(i=0,()=>(++i).toString()),k=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},O=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return O(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},Y=[],E={toasts:[],pausedAt:void 0},M=e=>{E=O(E,e),Y.forEach(e=>{e(E)})},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=(e={})=>{let[t,a]=(0,s.useState)(E),i=(0,s.useRef)(E);(0,s.useEffect)(()=>(i.current!==E&&a(E),Y.push(a),()=>{let e=Y.indexOf(a);e>-1&&Y.splice(e,1)}),[]);let r=t.toasts.map(t=>{var a,i,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(i=e[t.type])?void 0:i.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...t,toasts:r}},Z=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||N()}),R=e=>(t,a)=>{let i=Z(t,e,a);return M({type:2,toast:i}),i.id},G=(e,t)=>R("blank")(e,t);G.error=R("error"),G.success=R("success"),G.loading=R("loading"),G.custom=R("custom"),G.dismiss=e=>{M({type:3,toastId:e})},G.remove=e=>M({type:4,toastId:e}),G.promise=(e,t,a)=>{let i=G.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?A(t.success,e):void 0;return r?G.success(r,{id:i,...a,...null==a?void 0:a.success}):G.dismiss(i),e}).catch(e=>{let r=t.error?A(t.error,e):void 0;r?G.error(r,{id:i,...a,...null==a?void 0:a.error}):G.dismiss(i)}),e};var z=(e,t)=>{M({type:1,toast:{id:e,height:t}})},L=()=>{M({type:5,time:Date.now()})},C=new Map,W=1e3,J=(e,t=W)=>{if(C.has(e))return;let a=setTimeout(()=>{C.delete(e),M({type:4,toastId:e})},t);C.set(e,a)},T=e=>{let{toasts:t,pausedAt:a}=S(e);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),i=t.map(t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(a<0){t.visible&&G.dismiss(t.id);return}return setTimeout(()=>G.dismiss(t.id),a)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[t,a]);let i=(0,s.useCallback)(()=>{a&&M({type:6,time:Date.now()})},[a]),r=(0,s.useCallback)((e,a)=>{let{reverseOrder:i=!1,gutter:r=8,defaultPosition:o}=a||{},s=t.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...i?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[t]);return(0,s.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)J(e.id,e.removeDelay);else{let t=C.get(e.id);t&&(clearTimeout(t),C.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:z,startPause:L,endPause:i,calculateOffset:r}}},P=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,U=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Q=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=I("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${P} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${U} 0.15s ease-out forwards;
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
    animation: ${Q} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,X=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,F=I("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${X} 1s linear infinite;
`,H=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,V=w`
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
}`,$=I("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${V} 0.2s ease-out forwards;
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
`,K=I("div")`
  position: absolute;
`,_=I("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,q=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=I("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:a,iconTheme:i}=e;return void 0!==t?"string"==typeof t?s.createElement(ee,null,t):t:"blank"===a?null:s.createElement(_,null,s.createElement(F,{...i}),"loading"!==a&&s.createElement(K,null,"error"===a?s.createElement(B,{...i}):s.createElement($,{...i})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ei=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=I("div")`
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
`,eo=I("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,es=(e,t)=>{let a=e.includes("top")?1:-1,[i,r]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(a),ei(a)];return{animation:t?`${w(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=s.memo(({toast:e,position:t,style:a,children:i})=>{let r=e.height?es(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(et,{toast:e}),n=s.createElement(eo,{...e.ariaProps},A(e.message,e));return s.createElement(er,{className:e.className,style:{...r,...a,...e.style}},"function"==typeof i?i({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});o=s.createElement,m.p=void 0,y=o,x=void 0,v=void 0;var el=({id:e,className:t,style:a,onHeightUpdate:i,children:r})=>{let o=s.useCallback(t=>{if(t){let a=()=>{i(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return s.createElement("div",{ref:o,className:t,style:a},r)},ec=(e,t)=>{let a=e.includes("top"),i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...i}},ed=b`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:i,children:r,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:c}=T(a);return s.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(a=>{let o=a.position||t,n=ec(o,c.calculateOffset(a,{reverseOrder:e,gutter:i,defaultPosition:t}));return s.createElement(el,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?ed:"",style:n},"custom"===a.type?A(a.message,a):r?r(a):s.createElement(en,{toast:a,position:o}))}))},em=G}},function(e){e.O(0,[36,971,472,744],function(){return e(e.s=2085)}),_N_E=e.O()}]);