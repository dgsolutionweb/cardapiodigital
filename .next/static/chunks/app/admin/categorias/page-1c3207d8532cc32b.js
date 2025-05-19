(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[78],{5468:function(e,t,a){Promise.resolve().then(a.bind(a,4457))},4457:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return m}});var r=a(7437),i=a(2265),s=a(1396),o=a.n(s),n=a(6691),l=a.n(n),c=a(7823),d=a(345),u=a(5925);function m(){let[e,t]=(0,i.useState)([]),[a,s]=(0,i.useState)(!0);(0,i.useEffect)(()=>{n();let e=c.OQ.channel("public:categories").on("postgres_changes",{event:"*",schema:"public",table:"categories"},e=>{"INSERT"===e.eventType?t(t=>[...t,e.new]):"UPDATE"===e.eventType?t(t=>t.map(t=>t.id===e.new.id?e.new:t)):"DELETE"===e.eventType&&t(t=>t.filter(t=>t.id!==e.old.id))}).subscribe();return()=>{e.unsubscribe()}},[]);let n=async()=>{try{s(!0);let{data:e,error:a}=await c.OQ.from("categories").select("*").order("name");if(a)throw a;e&&t(e)}catch(e){console.error("Erro ao buscar categorias:",e),u.ZP.error("Erro ao carregar as categorias")}finally{s(!1)}},m=async e=>{if(confirm("Tem certeza que deseja excluir esta categoria?"))try{let{error:t}=await c.OQ.from("categories").delete().eq("id",e);if(t)throw t;u.ZP.success("Categoria exclu\xedda com sucesso")}catch(e){console.error("Erro ao excluir categoria:",e),u.ZP.error(e.message||"Erro ao excluir categoria")}};return(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,r.jsx)("h1",{className:"text-3xl font-bold",children:"Categorias"}),(0,r.jsx)(o(),{href:"/admin/categorias/nova",className:"bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors",children:"Nova Categoria"})]}),a?(0,r.jsx)("div",{className:"flex justify-center",children:(0,r.jsx)("div",{className:"animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"})}):0===e.length?(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow-md p-6 text-center",children:[(0,r.jsx)("p",{className:"text-gray-500 mb-4",children:"Nenhuma categoria encontrada"}),(0,r.jsx)(o(),{href:"/admin/categorias/nova",className:"text-primary hover:underline",children:"Criar primeira categoria"})]}):(0,r.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:e.map(e=>(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow-md overflow-hidden",children:[e.image_url?(0,r.jsx)("div",{className:"h-40 overflow-hidden",children:(0,r.jsx)(l(),{src:e.image_url.startsWith("data:image/")||e.image_url.includes("supabase.co")?e.image_url:d.WF,alt:e.name,width:400,height:200,className:"w-full h-full object-cover"})}):(0,r.jsx)("div",{className:"h-40 bg-gray-200 flex items-center justify-center",children:(0,r.jsx)("span",{className:"text-gray-400 text-2xl",children:"Sem imagem"})}),(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)("h3",{className:"font-bold text-lg mb-1",children:e.name}),e.description&&(0,r.jsx)("p",{className:"text-gray-600 text-sm mb-4",children:e.description}),(0,r.jsxs)("div",{className:"flex justify-end gap-2 mt-2",children:[(0,r.jsx)(o(),{href:"/admin/categorias/".concat(e.id),className:"text-blue-600 hover:underline",children:"Editar"}),(0,r.jsx)("button",{onClick:()=>m(e.id),className:"text-red-600 hover:underline",children:"Excluir"})]})]})]},e.id))})]})}},7823:function(e,t,a){"use strict";a.d(t,{OQ:function(){return i}});var r=a(4756);let i=(0,r.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},345:function(e,t,a){"use strict";a.d(t,{Ix:function(){return n},WF:function(){return i},aF:function(){return o},xG:function(){return s}});var r=a(7823);let i="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMTlUMTM6Mzc6MTQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0xOVQxMzozNzoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f+lkGAAAALRJREFUeJzt0cENwDAIADFE0/0H6yhkgHug57OzKmk7M9sB3LXeCeyZkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDg/nxMKXAp7CKEAAAAASUVORK5CYII=";function s(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function o(e,t){return e.length<=t?e:e.slice(0,t)+"..."}async function n(e,t,a){try{let i="".concat(Date.now(),"_").concat(e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/--+/g,"-").trim()),s=a?"".concat(a,"/").concat(i):i,{data:o,error:n}=await r.OQ.storage.from(t).upload(s,e,{cacheControl:"3600",upsert:!1});if(n)throw n;let{data:l}=r.OQ.storage.from(t).getPublicUrl(s);return l.publicUrl}catch(e){return console.error("Erro ao fazer upload da imagem:",e),console.warn("Usando imagem placeholder como fallback"),i}}},5925:function(e,t,a){"use strict";let r,i;a.d(t,{x7:function(){return eu},ZP:function(){return em},Am:function(){return R}});var s,o=a(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let a="",r="",i="";for(let s in e){let o=e[s];"@"==s[0]?"i"==s[1]?a=s+" "+o+";":r+="f"==s[1]?m(o,s):s+"{"+m(o,"k"==s[1]?"":t)+"}":"object"==typeof o?r+=m(o,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=o&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=m.p?m.p(s,o):s+":"+o+";")}return a+(t&&i?t+"{"+i+"}":i)+r},p={},g=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+g(e[a]);return t}return e},f=(e,t,a,r,i)=>{var s;let o=g(e),n=p[o]||(p[o]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(o));if(!p[n]){let t=o!==e?e:(e=>{let t,a,r=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?r.shift():t[3]?(a=t[3].replace(u," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(u," ").trim();return r[0]})(e);p[n]=m(i?{["@keyframes "+n]:t}:t,a?"":"."+n)}let l=a&&p.g?p.g:null;return a&&(p.g=p[n]),s=p[n],l?t.data=t.data.replace(l,s):-1===t.data.indexOf(s)&&(t.data=r?s+t.data:t.data+s),n},h=(e,t,a)=>e.reduce((e,r,i)=>{let s=t[i];if(s&&s.call){let e=s(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+r+(null==s?"":s)},"");function b(e){let t=this||{},a=e.call?e(t.p):e;return f(a.unshift?a.raw?h(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}b.bind({g:1});let y,x,v,w=b.bind({k:1});function A(e,t){let a=this||{};return function(){let r=arguments;function i(s,o){let n=Object.assign({},s),l=n.className||i.className;a.p=Object.assign({theme:x&&x()},n),a.o=/ *go\d+/.test(l),n.className=b.apply(a,r)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),y(c,n)}return t?t(i):i}}var j=e=>"function"==typeof e,I=(e,t)=>j(e)?e(t):e,N=(r=0,()=>(++r).toString()),E=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},O=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return O(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},Y=[],k={toasts:[],pausedAt:void 0},M=e=>{k=O(k,e),Y.forEach(e=>{e(k)})},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Z=(e={})=>{let[t,a]=(0,o.useState)(k),r=(0,o.useRef)(k);(0,o.useEffect)(()=>(r.current!==k&&a(k),Y.push(a),()=>{let e=Y.indexOf(a);e>-1&&Y.splice(e,1)}),[]);let i=t.toasts.map(t=>{var a,r,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...t,toasts:i}},z=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||N()}),G=e=>(t,a)=>{let r=z(t,e,a);return M({type:2,toast:r}),r.id},R=(e,t)=>G("blank")(e,t);R.error=G("error"),R.success=G("success"),R.loading=G("loading"),R.custom=G("custom"),R.dismiss=e=>{M({type:3,toastId:e})},R.remove=e=>M({type:4,toastId:e}),R.promise=(e,t,a)=>{let r=R.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?I(t.success,e):void 0;return i?R.success(i,{id:r,...a,...null==a?void 0:a.success}):R.dismiss(r),e}).catch(e=>{let i=t.error?I(t.error,e):void 0;i?R.error(i,{id:r,...a,...null==a?void 0:a.error}):R.dismiss(r)}),e};var W=(e,t)=>{M({type:1,toast:{id:e,height:t}})},L=()=>{M({type:5,time:Date.now()})},C=new Map,J=1e3,S=(e,t=J)=>{if(C.has(e))return;let a=setTimeout(()=>{C.delete(e),M({type:4,toastId:e})},t);C.set(e,a)},T=e=>{let{toasts:t,pausedAt:a}=Z(e);(0,o.useEffect)(()=>{if(a)return;let e=Date.now(),r=t.map(t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(a<0){t.visible&&R.dismiss(t.id);return}return setTimeout(()=>R.dismiss(t.id),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[t,a]);let r=(0,o.useCallback)(()=>{a&&M({type:6,time:Date.now()})},[a]),i=(0,o.useCallback)((e,a)=>{let{reverseOrder:r=!1,gutter:i=8,defaultPosition:s}=a||{},o=t.filter(t=>(t.position||s)===(e.position||s)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[t]);return(0,o.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)S(e.id,e.removeDelay);else{let t=C.get(e.id);t&&(clearTimeout(t),C.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:W,startPause:L,endPause:r,calculateOffset:i}}},P=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Q=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=A("div")`
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
    animation: ${Q} 0.15s ease-out forwards;
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
    animation: ${U} 0.15s ease-out forwards;
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
`,F=A("div")`
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
}`,$=A("div")`
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
`,_=A("div")`
  position: absolute;
`,K=A("div")`
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
}`,ee=A("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?o.createElement(ee,null,t):t:"blank"===a?null:o.createElement(K,null,o.createElement(F,{...r}),"loading"!==a&&o.createElement(_,null,"error"===a?o.createElement(B,{...r}):o.createElement($,{...r})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=A("div")`
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
`,es=A("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let a=e.includes("top")?1:-1,[r,i]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(a),er(a)];return{animation:t?`${w(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=o.memo(({toast:e,position:t,style:a,children:r})=>{let i=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},s=o.createElement(et,{toast:e}),n=o.createElement(es,{...e.ariaProps},I(e.message,e));return o.createElement(ei,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof r?r({icon:s,message:n}):o.createElement(o.Fragment,null,s,n))});s=o.createElement,m.p=void 0,y=s,x=void 0,v=void 0;var el=({id:e,className:t,style:a,onHeightUpdate:r,children:i})=>{let s=o.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return o.createElement("div",{ref:s,className:t,style:a},i)},ec=(e,t)=>{let a=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...r}},ed=b`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:i,containerStyle:s,containerClassName:n})=>{let{toasts:l,handlers:c}=T(a);return o.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(a=>{let s=a.position||t,n=ec(s,c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return o.createElement(el,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?ed:"",style:n},"custom"===a.type?I(a.message,a):i?i(a):o.createElement(en,{toast:a,position:s}))}))},em=R}},function(e){e.O(0,[36,847,691,971,472,744],function(){return e(e.s=5468)}),_N_E=e.O()}]);