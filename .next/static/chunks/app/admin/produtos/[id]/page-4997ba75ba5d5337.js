(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[11],{5433:function(e,t,r){Promise.resolve().then(r.bind(r,5792))},6304:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return o}});let a=r(1024),i=a._(r(2265)),o=i.default.createContext(null)},5792:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return u}});var a=r(7437),i=r(2265),o=r(4033),s=r(6691),n=r.n(s),l=r(7823),c=r(345),d=r(5925);function u(e){let{params:t}=e,r=(0,o.useRouter)(),{id:s}=t,[u,m]=(0,i.useState)([]),[p,f]=(0,i.useState)(""),[g,h]=(0,i.useState)(""),[b,y]=(0,i.useState)(""),[x,v]=(0,i.useState)(""),[j,w]=(0,i.useState)(null),[N,I]=(0,i.useState)(null),[A,O]=(0,i.useState)(null),[k,E]=(0,i.useState)(!0),[Y,S]=(0,i.useState)(!1);(0,i.useEffect)(()=>{let e=async()=>{try{E(!0);let{data:e,error:t}=await l.OQ.from("categories").select("*").order("name");if(t)throw t;e&&m(e);let{data:r,error:a}=await l.OQ.from("products").select("*").eq("id",s).single();if(a)throw a;r&&(f(r.name),h(r.description||""),y(r.price.toString()),v(r.category_id),w(r.image_url))}catch(e){console.error("Erro ao buscar dados:",e),d.ZP.error("Produto n\xe3o encontrado"),r.push("/admin/produtos")}finally{E(!1)}};e()},[s,r]);let M=async e=>{if(e.preventDefault(),!p.trim())return d.ZP.error("O nome do produto \xe9 obrigat\xf3rio");if(!b||isNaN(parseFloat(b))||0>=parseFloat(b))return d.ZP.error("O pre\xe7o deve ser um valor v\xe1lido maior que zero");if(!x)return d.ZP.error("Selecione uma categoria");try{S(!0);let e=j;N&&(e=await (0,c.Ix)(N,"products","images"));let{error:t}=await l.OQ.from("products").update({name:p,description:g||null,price:parseFloat(b),image_url:e,category_id:x,updated_at:new Date().toISOString()}).eq("id",s);if(t)throw t;d.ZP.success("Produto atualizado com sucesso!"),r.push("/admin/produtos")}catch(e){console.error("Erro ao atualizar produto:",e),d.ZP.error(e.message||"Erro ao atualizar produto")}finally{S(!1)}};return k?(0,a.jsx)("div",{className:"flex justify-center py-8",children:(0,a.jsx)("div",{className:"animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"})}):(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold",children:"Editar Produto"}),(0,a.jsx)("button",{onClick:()=>r.back(),className:"text-gray-600 hover:text-gray-900",children:"Voltar"})]}),(0,a.jsx)("div",{className:"bg-white rounded-lg shadow-md p-6",children:(0,a.jsxs)("form",{onSubmit:M,className:"space-y-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700 mb-1",children:"Nome *"}),(0,a.jsx)("input",{id:"name",type:"text",value:p,onChange:e=>f(e.target.value),required:!0,className:"input",placeholder:"Nome do produto"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"description",className:"block text-sm font-medium text-gray-700 mb-1",children:"Descri\xe7\xe3o"}),(0,a.jsx)("textarea",{id:"description",value:g,onChange:e=>h(e.target.value),className:"input min-h-[100px]",placeholder:"Descri\xe7\xe3o do produto"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"category",className:"block text-sm font-medium text-gray-700 mb-1",children:"Categoria *"}),(0,a.jsx)("select",{id:"category",value:x,onChange:e=>v(e.target.value),required:!0,className:"input",children:u.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"price",className:"block text-sm font-medium text-gray-700 mb-1",children:"Pre\xe7o *"}),(0,a.jsx)("input",{id:"price",type:"text",value:b,onChange:e=>{let t=e.target.value.replace(/[^0-9.]/g,"");y(t)},required:!0,className:"input",placeholder:"0.00"}),b&&!isNaN(parseFloat(b))&&(0,a.jsxs)("p",{className:"text-sm text-gray-500 mt-1",children:["Visualiza\xe7\xe3o: ",(0,c.xG)(parseFloat(b))]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Imagem Atual"}),j?(0,a.jsx)("div",{className:"mt-2 mb-4",children:(0,a.jsx)(n(),{src:j,alt:p,width:160,height:160,className:"w-40 h-40 object-cover rounded-lg"})}):(0,a.jsx)("p",{className:"text-gray-500 mb-4",children:"Nenhuma imagem definida"}),(0,a.jsx)("label",{htmlFor:"image",className:"block text-sm font-medium text-gray-700 mb-1",children:"Nova Imagem"}),(0,a.jsx)("input",{id:"image",type:"file",accept:"image/*",onChange:e=>{var t;let r=(null===(t=e.target.files)||void 0===t?void 0:t[0])||null;if(r){I(r);let e=URL.createObjectURL(r);O(e)}},className:"block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"}),A&&(0,a.jsxs)("div",{className:"mt-2",children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-700 mb-1",children:"Preview:"}),(0,a.jsx)("img",{src:A,alt:"Preview",className:"w-40 h-40 object-cover rounded-lg"})]})]}),(0,a.jsx)("div",{className:"flex justify-end",children:(0,a.jsx)("button",{type:"submit",disabled:Y,className:"bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors flex items-center space-x-2",children:Y?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{children:"Salvando..."}),(0,a.jsx)("div",{className:"animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"})]}):(0,a.jsx)("span",{children:"Salvar"})})})]})})]})}},7823:function(e,t,r){"use strict";r.d(t,{OQ:function(){return i}});var a=r(4756);let i=(0,a.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},345:function(e,t,r){"use strict";r.d(t,{Ix:function(){return n},WF:function(){return i},aF:function(){return s},xG:function(){return o}});var a=r(7823);let i="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMTlUMTM6Mzc6MTQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0xOVQxMzozNzoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f+lkGAAAALRJREFUeJzt0cENwDAIADFE0/0H6yhkgHug57OzKmk7M9sB3LXeCeyZkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDg/nxMKXAp7CKEAAAAASUVORK5CYII=";function o(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function s(e,t){return e.length<=t?e:e.slice(0,t)+"..."}async function n(e,t,r){try{let i="".concat(Date.now(),"_").concat(e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/--+/g,"-").trim()),o=r?"".concat(r,"/").concat(i):i,{data:s,error:n}=await a.OQ.storage.from(t).upload(o,e,{cacheControl:"3600",upsert:!1});if(n)throw n;let{data:l}=a.OQ.storage.from(t).getPublicUrl(o);return l.publicUrl}catch(e){return console.error("Erro ao fazer upload da imagem:",e),console.warn("Usando imagem placeholder como fallback"),i}}},4033:function(e,t,r){e.exports=r(94)},5925:function(e,t,r){"use strict";let a,i;r.d(t,{x7:function(){return eu},ZP:function(){return em},Am:function(){return R}});var o,s=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",a="",i="";for(let o in e){let s=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+s+";":a+="f"==o[1]?m(s,o):o+"{"+m(s,"k"==o[1]?"":t)+"}":"object"==typeof s?a+=m(s,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=s&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=m.p?m.p(o,s):o+":"+s+";")}return r+(t&&i?t+"{"+i+"}":i)+a},p={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},g=(e,t,r,a,i)=>{var o;let s=f(e),n=p[s]||(p[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!p[n]){let t=s!==e?e:(e=>{let t,r,a=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[n]=m(i?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&p.g?p.g:null;return r&&(p.g=p[n]),o=p[n],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=a?o+t.data:t.data+o),n},h=(e,t,r)=>e.reduce((e,a,i)=>{let o=t[i];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==o?"":o)},"");function b(e){let t=this||{},r=e.call?e(t.p):e;return g(r.unshift?r.raw?h(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}b.bind({g:1});let y,x,v,j=b.bind({k:1});function w(e,t){let r=this||{};return function(){let a=arguments;function i(o,s){let n=Object.assign({},o),l=n.className||i.className;r.p=Object.assign({theme:x&&x()},n),r.o=/ *go\d+/.test(l),n.className=b.apply(r,a)+(l?" "+l:""),t&&(n.ref=s);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),y(c,n)}return t?t(i):i}}var N=e=>"function"==typeof e,I=(e,t)=>N(e)?e(t):e,A=(a=0,()=>(++a).toString()),O=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},k=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return k(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},E=[],Y={toasts:[],pausedAt:void 0},S=e=>{Y=k(Y,e),E.forEach(e=>{e(Y)})},M={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=(e={})=>{let[t,r]=(0,s.useState)(Y),a=(0,s.useRef)(Y);(0,s.useEffect)(()=>(a.current!==Y&&r(Y),E.push(r),()=>{let e=E.indexOf(r);e>-1&&E.splice(e,1)}),[]);let i=t.toasts.map(t=>{var r,a,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||M[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...t,toasts:i}},Z=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||A()}),z=e=>(t,r)=>{let a=Z(t,e,r);return S({type:2,toast:a}),a.id},R=(e,t)=>z("blank")(e,t);R.error=z("error"),R.success=z("success"),R.loading=z("loading"),R.custom=z("custom"),R.dismiss=e=>{S({type:3,toastId:e})},R.remove=e=>S({type:4,toastId:e}),R.promise=(e,t,r)=>{let a=R.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?I(t.success,e):void 0;return i?R.success(i,{id:a,...r,...null==r?void 0:r.success}):R.dismiss(a),e}).catch(e=>{let i=t.error?I(t.error,e):void 0;i?R.error(i,{id:a,...r,...null==r?void 0:r.error}):R.dismiss(a)}),e};var C=(e,t)=>{S({type:1,toast:{id:e,height:t}})},G=()=>{S({type:5,time:Date.now()})},L=new Map,W=1e3,J=(e,t=W)=>{if(L.has(e))return;let r=setTimeout(()=>{L.delete(e),S({type:4,toastId:e})},t);L.set(e,r)},P=e=>{let{toasts:t,pausedAt:r}=D(e);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&R.dismiss(t.id);return}return setTimeout(()=>R.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,s.useCallback)(()=>{r&&S({type:6,time:Date.now()})},[r]),i=(0,s.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:i=8,defaultPosition:o}=r||{},s=t.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[t]);return(0,s.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)J(e.id,e.removeDelay);else{let t=L.get(e.id);t&&(clearTimeout(t),L.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:C,startPause:G,endPause:a,calculateOffset:i}}},T=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Q=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,U=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
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
`,B=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,X=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,H=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,V=j`
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
}`,_=w("div")`
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
`,$=w("div")`
  position: absolute;
`,K=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,q=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(ee,null,t):t:"blank"===r?null:s.createElement(K,null,s.createElement(X,{...a}),"loading"!==r&&s.createElement($,null,"error"===r?s.createElement(U,{...a}):s.createElement(_,{...a})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=w("div")`
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
`,eo=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,es=(e,t)=>{let r=e.includes("top")?1:-1,[a,i]=O()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),ea(r)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?es(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(et,{toast:e}),n=s.createElement(eo,{...e.ariaProps},I(e.message,e));return s.createElement(ei,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});o=s.createElement,m.p=void 0,y=o,x=void 0,v=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},ec=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:O()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ed=b`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:c}=P(r);return s.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let o=r.position||t,n=ec(o,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return s.createElement(el,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?ed:"",style:n},"custom"===r.type?I(r.message,r):i?i(r):s.createElement(en,{toast:r,position:o}))}))},em=R}},function(e){e.O(0,[36,691,971,472,744],function(){return e(e.s=5433)}),_N_E=e.O()}]);