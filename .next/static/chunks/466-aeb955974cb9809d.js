(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[466],{6732:function(e,t,a){"use strict";a.d(t,{Y:function(){return n}});var r=a(2265),i=a(7823),o=a(345),s=a(5925);let n=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],[t,a]=(0,r.useState)({isOpen:!0,businessHours:{monday:"10:00-22:00",tuesday:"10:00-22:00",wednesday:"10:00-22:00",thursday:"10:00-22:00",friday:"10:00-23:00",saturday:"10:00-23:00",sunday:"11:00-22:00"},autoScheduleEnabled:!1,manualOverride:!1,lastUpdate:null,loading:!0,currentStatus:{shouldBeOpen:!1,currentTime:"",todayHours:"",dayOfWeek:"monday",timestamp:new Date}}),n=(0,r.useCallback)(async()=>{try{let{data:e,error:t}=await i.OQ.from("settings").select("key, value").in("key",["store_open","business_hours","auto_schedule_enabled","manual_override"]);if(t)throw t;let r={loading:!1};return e&&e.forEach(e=>{switch(e.key){case"store_open":r.isOpen="true"===e.value;break;case"auto_schedule_enabled":r.autoScheduleEnabled="true"===e.value;break;case"manual_override":r.manualOverride="true"===e.value;break;case"business_hours":try{let t=JSON.parse(e.value);t&&"object"==typeof t&&(r.businessHours=t)}catch(e){console.error("Erro ao processar hor\xe1rios:",e)}}}),r.businessHours&&(r.currentStatus=(0,o._z)(r.businessHours)),a(e=>({...e,...r})),r}catch(e){return console.error("Erro ao buscar configura\xe7\xf5es da loja:",e),a(e=>({...e,loading:!1})),null}},[]),l=(0,r.useCallback)(async e=>{try{let{data:t}=await i.OQ.from("settings").select("id").eq("key","store_open");if(t&&t.length>0){let{error:t}=await i.OQ.from("settings").update({value:e.toString(),updated_at:new Date().toISOString()}).eq("key","store_open");if(t)throw t}else{let{error:t}=await i.OQ.from("settings").insert({key:"store_open",value:e.toString(),created_at:new Date().toISOString()});if(t)throw t}return a(t=>({...t,isOpen:e,lastUpdate:new Date})),!0}catch(e){return console.error("Erro ao atualizar status da loja:",e),!1}},[]);return(0,r.useEffect)(()=>{if(!e||!t.autoScheduleEnabled||t.manualOverride||t.loading)return;let a=async()=>{let e=(0,o.Vx)(t.businessHours);if(e!==t.isOpen){console.log("Auto-atualizando status da loja: ".concat(e?"ABERTA":"FECHADA"));let t=await l(e);t&&s.ZP.success(e?"\uD83D\uDFE2 Loja aberta automaticamente conforme hor\xe1rio configurado!":"\uD83D\uDD34 Loja fechada automaticamente conforme hor\xe1rio configurado!")}};a();let r=setInterval(a,6e4);return()=>clearInterval(r)},[e,t.autoScheduleEnabled,t.businessHours,t.isOpen,t.manualOverride,t.loading,l]),(0,r.useEffect)(()=>{n()},[]),(0,r.useEffect)(()=>{let e=setInterval(()=>{a(e=>({...e,currentStatus:(0,o._z)(e.businessHours)}))},6e4);return()=>clearInterval(e)},[t.businessHours]),{...t,refreshSettings:n,updateStatus:l}}},7823:function(e,t,a){"use strict";a.d(t,{OQ:function(){return i}});var r=a(4756);let i=(0,r.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},345:function(e,t,a){"use strict";a.d(t,{Ix:function(){return n},P0:function(){return d},Vx:function(){return u},WF:function(){return i},_n:function(){return m},_z:function(){return c},aF:function(){return s},xG:function(){return o}});var r=a(7823);let i="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMTlUMTM6Mzc6MTQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0xOVQxMzozNzoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f+lkGAAAALRJREFUeJzt0cENwDAIADFE0/0H6yhkgHug57OzKmk7M9sB3LXeCeyZkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDg/nxMKXAp7CKEAAAAASUVORK5CYII=";function o(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function s(e,t){return e.length<=t?e:e.slice(0,t)+"..."}async function n(e,t,a){try{let i="".concat(Date.now(),"_").concat(e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/--+/g,"-").trim()),o=a?"".concat(a,"/").concat(i):i,{data:s,error:n}=await r.OQ.storage.from(t).upload(o,e,{cacheControl:"3600",upsert:!1});if(n)throw n;let{data:l}=r.OQ.storage.from(t).getPublicUrl(o);return l.publicUrl}catch(e){return console.error("Erro ao fazer upload da imagem:",e),console.warn("Usando imagem placeholder como fallback"),i}}let l={0:"sunday",1:"monday",2:"tuesday",3:"wednesday",4:"thursday",5:"friday",6:"saturday"},u=e=>{let t=new Date,a=t.getDay(),r=t.toTimeString().slice(0,5),i=l[a],o=e[i];if(!o||""===o.trim())return!1;let s=o.split("-");if(2!==s.length)return!1;let[n,u]=s.map(e=>e.trim());return u<n?r>=n||r<=u:r>=n&&r<=u},c=e=>{let t=new Date,a=t.getDay(),r=t.toTimeString().slice(0,5),i=l[a],o=e[i];return{shouldBeOpen:u(e),currentTime:r,todayHours:o,dayOfWeek:i,timestamp:t}},d=e=>{let t=new Date,a=t.getDay(),r=l[a],i=e[r];return i&&""!==i.trim()?"Hoje: ".concat(i):"Fechado hoje"},m=e=>{let t=c(e);if(t.shouldBeOpen)return null;let a=new Date,r=a.getDay(),i=l[r],o=e[i];if(o&&""!==o.trim()){let[e]=o.split("-").map(e=>e.trim()),t=a.toTimeString().slice(0,5);if(t<e)return"Abre hoje \xe0s ".concat(e)}for(let t=1;t<=7;t++){let a=(r+t)%7,i=l[a],o=e[i];if(o&&""!==o.trim()){let[e]=o.split("-").map(e=>e.trim()),a={monday:"segunda-feira",tuesday:"ter\xe7a-feira",wednesday:"quarta-feira",thursday:"quinta-feira",friday:"sexta-feira",saturday:"s\xe1bado",sunday:"domingo"},r=a[i];return"Abre ".concat(1===t?"amanh\xe3":r," \xe0s ").concat(e)}}return"Hor\xe1rios n\xe3o definidos"}},8800:function(e,t,a){"use strict";a.d(t,{x:function(){return s}});var r=a(4660),i=a(4810);let o=e=>e.reduce((e,t)=>e+t.price*t.quantity,0),s=(0,r.Ue)()((0,i.tJ)((e,t)=>({items:[],total:0,addItem:a=>{let r;let i=t().items,s=i.find(e=>e.id===a.id);e({items:r=s?i.map(e=>e.id===a.id?{...e,quantity:e.quantity+1}:e):[...i,{...a,quantity:1}],total:o(r)})},removeItem:a=>{let r=t().items.filter(e=>e.id!==a);e({items:r,total:o(r)})},updateQuantity:(a,r)=>{if(r<=0)return t().removeItem(a);let i=t().items.map(e=>e.id===a?{...e,quantity:r}:e);e({items:i,total:o(i)})},clearCart:()=>e({items:[],total:0}),calculateTotal:()=>{let a=o(t().items);return e({total:a}),a}}),{name:"cart-storage",onRehydrateStorage:()=>e=>{e&&(e.total=o(e.items))}}))},4033:function(e,t,a){e.exports=a(94)},5925:function(e,t,a){"use strict";let r,i;a.d(t,{x7:function(){return ed},ZP:function(){return em},Am:function(){return R}});var o,s=a(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,u=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,m=(e,t)=>{let a="",r="",i="";for(let o in e){let s=e[o];"@"==o[0]?"i"==o[1]?a=o+" "+s+";":r+="f"==o[1]?m(s,o):o+"{"+m(s,"k"==o[1]?"":t)+"}":"object"==typeof s?r+=m(s,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=s&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=m.p?m.p(o,s):o+":"+s+";")}return a+(t&&i?t+"{"+i+"}":i)+r},p={},f=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+f(e[a]);return t}return e},y=(e,t,a,r,i)=>{var o;let s=f(e),n=p[s]||(p[s]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(s));if(!p[n]){let t=s!==e?e:(e=>{let t,a,r=[{}];for(;t=u.exec(e.replace(c,""));)t[4]?r.shift():t[3]?(a=t[3].replace(d," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(d," ").trim();return r[0]})(e);p[n]=m(i?{["@keyframes "+n]:t}:t,a?"":"."+n)}let l=a&&p.g?p.g:null;return a&&(p.g=p[n]),o=p[n],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=r?o+t.data:t.data+o),n},g=(e,t,a)=>e.reduce((e,r,i)=>{let o=t[i];if(o&&o.call){let e=o(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+r+(null==o?"":o)},"");function h(e){let t=this||{},a=e.call?e(t.p):e;return y(a.unshift?a.raw?g(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}h.bind({g:1});let b,v,w,I=h.bind({k:1});function A(e,t){let a=this||{};return function(){let r=arguments;function i(o,s){let n=Object.assign({},o),l=n.className||i.className;a.p=Object.assign({theme:v&&v()},n),a.o=/ *go\d+/.test(l),n.className=h.apply(a,r)+(l?" "+l:""),t&&(n.ref=s);let u=e;return e[0]&&(u=n.as||e,delete n.as),w&&u[0]&&w(n),b(u,n)}return t?t(i):i}}var x=e=>"function"==typeof e,O=(e,t)=>x(e)?e(t):e,E=(r=0,()=>(++r).toString()),k=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},D=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return D(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},j=[],S={toasts:[],pausedAt:void 0},Y=e=>{S=D(S,e),j.forEach(e=>{e(S)})},M={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e={})=>{let[t,a]=(0,s.useState)(S),r=(0,s.useRef)(S);(0,s.useEffect)(()=>(r.current!==S&&a(S),j.push(a),()=>{let e=j.indexOf(a);e>-1&&j.splice(e,1)}),[]);let i=t.toasts.map(t=>{var a,r,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||M[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...t,toasts:i}},N=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||E()}),G=e=>(t,a)=>{let r=N(t,e,a);return Y({type:2,toast:r}),r.id},R=(e,t)=>G("blank")(e,t);R.error=G("error"),R.success=G("success"),R.loading=G("loading"),R.custom=G("custom"),R.dismiss=e=>{Y({type:3,toastId:e})},R.remove=e=>Y({type:4,toastId:e}),R.promise=(e,t,a)=>{let r=R.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?O(t.success,e):void 0;return i?R.success(i,{id:r,...a,...null==a?void 0:a.success}):R.dismiss(r),e}).catch(e=>{let i=t.error?O(t.error,e):void 0;i?R.error(i,{id:r,...a,...null==a?void 0:a.error}):R.dismiss(r)}),e};var Z=(e,t)=>{Y({type:1,toast:{id:e,height:t}})},L=()=>{Y({type:5,time:Date.now()})},W=new Map,T=1e3,C=(e,t=T)=>{if(W.has(e))return;let a=setTimeout(()=>{W.delete(e),Y({type:4,toastId:e})},t);W.set(e,a)},J=e=>{let{toasts:t,pausedAt:a}=z(e);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),r=t.map(t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(a<0){t.visible&&R.dismiss(t.id);return}return setTimeout(()=>R.dismiss(t.id),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[t,a]);let r=(0,s.useCallback)(()=>{a&&Y({type:6,time:Date.now()})},[a]),i=(0,s.useCallback)((e,a)=>{let{reverseOrder:r=!1,gutter:i=8,defaultPosition:o}=a||{},s=t.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[t]);return(0,s.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)C(e.id,e.removeDelay);else{let t=W.get(e.id);t&&(clearTimeout(t),W.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:Z,startPause:L,endPause:r,calculateOffset:i}}},H=I`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Q=I`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=I`
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

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,P=I`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,X=A("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${P} 1s linear infinite;
`,F=I`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,_=I`
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
}`,V=A("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${_} 0.2s ease-out forwards;
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
`,$=A("div")`
  position: absolute;
`,K=A("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,q=I`
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
`,et=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(ee,null,t):t:"blank"===a?null:s.createElement(K,null,s.createElement(X,{...r}),"loading"!==a&&s.createElement($,null,"error"===a?s.createElement(B,{...r}):s.createElement(V,{...r})))},ea=e=>`
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
`,eo=A("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,es=(e,t)=>{let a=e.includes("top")?1:-1,[r,i]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(a),er(a)];return{animation:t?`${I(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${I(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=s.memo(({toast:e,position:t,style:a,children:r})=>{let i=e.height?es(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(et,{toast:e}),n=s.createElement(eo,{...e.ariaProps},O(e.message,e));return s.createElement(ei,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof r?r({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});o=s.createElement,m.p=void 0,b=o,v=void 0,w=void 0;var el=({id:e,className:t,style:a,onHeightUpdate:r,children:i})=>{let o=s.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return s.createElement("div",{ref:o,className:t,style:a},i)},eu=(e,t)=>{let a=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...r}},ec=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ed=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:i,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:u}=J(a);return s.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:u.startPause,onMouseLeave:u.endPause},l.map(a=>{let o=a.position||t,n=eu(o,u.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return s.createElement(el,{id:a.id,key:a.id,onHeightUpdate:u.updateHeight,className:a.visible?ec:"",style:n},"custom"===a.type?O(a.message,a):i?i(a):s.createElement(en,{toast:a,position:o}))}))},em=R}}]);