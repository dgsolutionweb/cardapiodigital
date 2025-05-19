(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[640],{7398:function(e,t,r){Promise.resolve().then(r.bind(r,3928))},3928:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return m}});var a=r(7437),i=r(2265),s=r(1396),o=r.n(s),n=r(6691),c=r.n(n),l=r(7823),d=r(345),u=r(5925);let p=e=>e&&(e.startsWith("data:image/")||e.includes("storage.googleapis.com")||e.includes("supabase.co"))?e:d.WF;function m(){let[e,t]=(0,i.useState)([]),[r,s]=(0,i.useState)(!0);(0,i.useEffect)(()=>{n();let e=l.OQ.channel("public:products").on("postgres_changes",{event:"*",schema:"public",table:"products"},()=>{n()}).subscribe();return()=>{e.unsubscribe()}},[]);let n=async()=>{try{s(!0);let{data:e,error:r}=await l.OQ.from("categories").select("id, name");if(r)throw r;let a=new Map;e&&e.forEach(e=>{a.set(e.id,e.name)});let{data:i,error:o}=await l.OQ.from("products").select("*").order("name");if(o)throw o;if(i){let e=await Promise.all(i.map(async e=>{let t=e.price;if(e.has_variations){let{data:r,error:a}=await l.OQ.from("product_variations").select("price").eq("product_id",e.id).order("price");!a&&r&&r.length>0&&(t=r[0].price)}return{...e,display_price:t,category_name:a.get(e.category_id)||"Categoria Desconhecida"}}));t(e)}}catch(e){console.error("Erro ao buscar produtos:",e),u.ZP.error("Erro ao carregar os produtos")}finally{s(!1)}},m=async e=>{if(confirm("Tem certeza que deseja excluir este produto?"))try{let{error:t}=await l.OQ.from("products").delete().eq("id",e);if(t)throw t;u.ZP.success("Produto exclu\xeddo com sucesso")}catch(e){console.error("Erro ao excluir produto:",e),u.ZP.error(e.message||"Erro ao excluir produto")}};return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold",children:"Produtos"}),(0,a.jsx)(o(),{href:"/admin/produtos/novo",className:"bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors",children:"Novo Produto"})]}),r?(0,a.jsx)("div",{className:"flex justify-center",children:(0,a.jsx)("div",{className:"animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"})}):0===e.length?(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-md p-6 text-center",children:[(0,a.jsx)("p",{className:"text-gray-500 mb-4",children:"Nenhum produto encontrado"}),(0,a.jsx)(o(),{href:"/admin/produtos/novo",className:"text-primary hover:underline",children:"Criar primeiro produto"})]}):(0,a.jsx)("div",{className:"bg-white rounded-lg shadow-md overflow-hidden",children:(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full text-left",children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{className:"bg-gray-50 border-b",children:[(0,a.jsx)("th",{className:"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Imagem"}),(0,a.jsx)("th",{className:"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Nome"}),(0,a.jsx)("th",{className:"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Categoria"}),(0,a.jsx)("th",{className:"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Pre\xe7o"}),(0,a.jsx)("th",{className:"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",children:"A\xe7\xf5es"})]})}),(0,a.jsx)("tbody",{className:"divide-y divide-gray-200",children:e.map(e=>(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:e.image_url?(0,a.jsx)(c(),{src:p(e.image_url),alt:e.name,width:50,height:50,className:"w-12 h-12 object-cover rounded"}):(0,a.jsx)("div",{className:"w-12 h-12 bg-gray-200 rounded flex items-center justify-center",children:(0,a.jsx)("span",{className:"text-gray-400 text-xs",children:"Sem imagem"})})}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap",children:[(0,a.jsx)("div",{className:"font-medium",children:e.name}),e.description&&(0,a.jsx)("div",{className:"text-sm text-gray-500 truncate max-w-xs",children:e.description})]}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:e.category_name}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap font-medium",children:e.has_variations?(0,a.jsxs)("span",{className:"flex flex-col",children:[(0,a.jsx)("span",{className:"text-xs text-gray-500",children:"A partir de"}),(0,d.xG)(e.display_price||e.price)]}):(0,d.xG)(e.price)}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:[(0,a.jsx)(o(),{href:"/admin/produtos/".concat(e.id),className:"text-blue-600 hover:text-blue-900 mr-4",children:"Editar"}),(0,a.jsx)("button",{onClick:()=>m(e.id),className:"text-red-600 hover:text-red-900",children:"Excluir"})]})]},e.id))})]})})})]})}},7823:function(e,t,r){"use strict";r.d(t,{OQ:function(){return i}});var a=r(4756);let i=(0,a.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},345:function(e,t,r){"use strict";r.d(t,{Ix:function(){return n},WF:function(){return i},aF:function(){return o},xG:function(){return s}});var a=r(7823);let i="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMTlUMTM6Mzc6MTQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0xOVQxMzozNzoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f+lkGAAAALRJREFUeJzt0cENwDAIADFE0/0H6yhkgHug57OzKmk7M9sB3LXeCeyZkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDg/nxMKXAp7CKEAAAAASUVORK5CYII=";function s(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function o(e,t){return e.length<=t?e:e.slice(0,t)+"..."}async function n(e,t,r){try{let i="".concat(Date.now(),"_").concat(e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/--+/g,"-").trim()),s=r?"".concat(r,"/").concat(i):i,{data:o,error:n}=await a.OQ.storage.from(t).upload(s,e,{cacheControl:"3600",upsert:!1});if(n)throw n;let{data:c}=a.OQ.storage.from(t).getPublicUrl(s);return c.publicUrl}catch(e){return console.error("Erro ao fazer upload da imagem:",e),console.warn("Usando imagem placeholder como fallback"),i}}},5925:function(e,t,r){"use strict";let a,i;r.d(t,{x7:function(){return eu},ZP:function(){return ep},Am:function(){return W}});var s,o=r(2265);let n={data:""},c=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let r="",a="",i="";for(let s in e){let o=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+o+";":a+="f"==s[1]?p(o,s):s+"{"+p(o,"k"==s[1]?"":t)+"}":"object"==typeof o?a+=p(o,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=o&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=p.p?p.p(s,o):s+":"+o+";")}return r+(t&&i?t+"{"+i+"}":i)+a},m={},h=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+h(e[r]);return t}return e},f=(e,t,r,a,i)=>{var s;let o=h(e),n=m[o]||(m[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!m[n]){let t=o!==e?e:(e=>{let t,r,a=[{}];for(;t=l.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);m[n]=p(i?{["@keyframes "+n]:t}:t,r?"":"."+n)}let c=r&&m.g?m.g:null;return r&&(m.g=m[n]),s=m[n],c?t.data=t.data.replace(c,s):-1===t.data.indexOf(s)&&(t.data=a?s+t.data:t.data+s),n},g=(e,t,r)=>e.reduce((e,a,i)=>{let s=t[i];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+a+(null==s?"":s)},"");function y(e){let t=this||{},r=e.call?e(t.p):e;return f(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,c(t.target),t.g,t.o,t.k)}y.bind({g:1});let x,b,v,w=y.bind({k:1});function j(e,t){let r=this||{};return function(){let a=arguments;function i(s,o){let n=Object.assign({},s),c=n.className||i.className;r.p=Object.assign({theme:b&&b()},n),r.o=/ *go\d+/.test(c),n.className=y.apply(r,a)+(c?" "+c:""),t&&(n.ref=o);let l=e;return e[0]&&(l=n.as||e,delete n.as),v&&l[0]&&v(n),x(l,n)}return t?t(i):i}}var N=e=>"function"==typeof e,A=(e,t)=>N(e)?e(t):e,I=(a=0,()=>(++a).toString()),O=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},k=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return k(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},E=[],Y={toasts:[],pausedAt:void 0},M=e=>{Y=k(Y,e),E.forEach(e=>{e(Y)})},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},G=(e={})=>{let[t,r]=(0,o.useState)(Y),a=(0,o.useRef)(Y);(0,o.useEffect)(()=>(a.current!==Y&&r(Y),E.push(r),()=>{let e=E.indexOf(r);e>-1&&E.splice(e,1)}),[]);let i=t.toasts.map(t=>{var r,a,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...t,toasts:i}},Z=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||I()}),z=e=>(t,r)=>{let a=Z(t,e,r);return M({type:2,toast:a}),a.id},W=(e,t)=>z("blank")(e,t);W.error=z("error"),W.success=z("success"),W.loading=z("loading"),W.custom=z("custom"),W.dismiss=e=>{M({type:3,toastId:e})},W.remove=e=>M({type:4,toastId:e}),W.promise=(e,t,r)=>{let a=W.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?A(t.success,e):void 0;return i?W.success(i,{id:a,...r,...null==r?void 0:r.success}):W.dismiss(a),e}).catch(e=>{let i=t.error?A(t.error,e):void 0;i?W.error(i,{id:a,...r,...null==r?void 0:r.error}):W.dismiss(a)}),e};var R=(e,t)=>{M({type:1,toast:{id:e,height:t}})},L=()=>{M({type:5,time:Date.now()})},C=new Map,J=1e3,S=(e,t=J)=>{if(C.has(e))return;let r=setTimeout(()=>{C.delete(e),M({type:4,toastId:e})},t);C.set(e,r)},T=e=>{let{toasts:t,pausedAt:r}=G(e);(0,o.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&W.dismiss(t.id);return}return setTimeout(()=>W.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,o.useCallback)(()=>{r&&M({type:6,time:Date.now()})},[r]),i=(0,o.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:i=8,defaultPosition:s}=r||{},o=t.filter(t=>(t.position||s)===(e.position||s)&&t.height),n=o.findIndex(t=>t.id===e.id),c=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[c+1]:[0,c]).reduce((e,t)=>e+(t.height||0)+i,0)},[t]);return(0,o.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)S(e.id,e.removeDelay);else{let t=C.get(e.id);t&&(clearTimeout(t),C.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:R,startPause:L,endPause:a,calculateOffset:i}}},P=w`
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
}`,B=j("div")`
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
`,F=j("div")`
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
}`,_=j("div")`
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
`,$=j("div")`
  position: absolute;
`,K=j("div")`
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
}`,ee=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?o.createElement(ee,null,t):t:"blank"===r?null:o.createElement(K,null,o.createElement(F,{...a}),"loading"!==r&&o.createElement($,null,"error"===r?o.createElement(B,{...a}):o.createElement(_,{...a})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=j("div")`
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
`,es=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let r=e.includes("top")?1:-1,[a,i]=O()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),ea(r)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=o.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},s=o.createElement(et,{toast:e}),n=o.createElement(es,{...e.ariaProps},A(e.message,e));return o.createElement(ei,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:s,message:n}):o.createElement(o.Fragment,null,s,n))});s=o.createElement,p.p=void 0,x=s,b=void 0,v=void 0;var ec=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let s=o.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return o.createElement("div",{ref:s,className:t,style:r},i)},el=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:O()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ed=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,containerStyle:s,containerClassName:n})=>{let{toasts:c,handlers:l}=T(r);return o.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:n,onMouseEnter:l.startPause,onMouseLeave:l.endPause},c.map(r=>{let s=r.position||t,n=el(s,l.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return o.createElement(ec,{id:r.id,key:r.id,onHeightUpdate:l.updateHeight,className:r.visible?ed:"",style:n},"custom"===r.type?A(r.message,r):i?i(r):o.createElement(en,{toast:r,position:s}))}))},ep=W}},function(e){e.O(0,[36,847,691,971,472,744],function(){return e(e.s=7398)}),_N_E=e.O()}]);