(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7],{3294:function(e,t,r){Promise.resolve().then(r.bind(r,6149))},6304:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return o}});let a=r(1024),s=a._(r(2265)),o=s.default.createContext(null)},6149:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return d}});var a=r(7437),s=r(2265),o=r(6691),i=r.n(o),n=r(7823),l=r(5925);function d(){let[e,t]=(0,s.useState)(""),[r,o]=(0,s.useState)(""),[d,u]=(0,s.useState)(""),[m,p]=(0,s.useState)(""),[f,x]=(0,s.useState)(null),[y,h]=(0,s.useState)(!1),g=(0,s.useRef)(null),[b,v]=(0,s.useState)(!0),[j,w]=(0,s.useState)("0.00"),[N,k]=(0,s.useState)("0.00"),[E,_]=(0,s.useState)("30-45"),[C,S]=(0,s.useState)("5"),[O,D]=(0,s.useState)({monday:"10:00-22:00",tuesday:"10:00-22:00",wednesday:"10:00-22:00",thursday:"10:00-22:00",friday:"10:00-23:00",saturday:"10:00-23:00",sunday:"11:00-22:00"}),[I,$]=(0,s.useState)("general"),[z,F]=(0,s.useState)(!0),[P,R]=(0,s.useState)(!1);(0,s.useEffect)(()=>{M()},[]);let M=async()=>{try{F(!0);let{data:e,error:r}=await n.OQ.from("settings").select("key, value");if(r)throw r;e&&e.length>0&&e.forEach(e=>{switch(e.key){case"whatsapp_number":t(e.value);break;case"store_name":o(e.value);break;case"address":u(e.value);break;case"store_open":v("true"===e.value);break;case"delivery_fee":w(e.value);break;case"min_order_value":k(e.value);break;case"delivery_time":_(e.value);break;case"delivery_radius":S(e.value);break;case"logo_url":p(e.value);break;case"business_hours":try{let t=JSON.parse(e.value);t&&"object"==typeof t&&D(t)}catch(e){console.error("Erro ao processar hor\xe1rios:",e)}}})}catch(e){console.error("Erro ao buscar configura\xe7\xf5es:",e),l.ZP.error("Erro ao carregar configura\xe7\xf5es")}finally{F(!1)}},A=async(e,t)=>{let{data:r,error:a}=await n.OQ.from("settings").select("id").eq("key",e),s=!a&&r&&r.length>0;if(s&&r&&r.length>0){let e=r[0].id,{error:a}=await n.OQ.from("settings").update({value:t,updated_at:new Date().toISOString()}).eq("id",e);if(a)throw a}else{let{error:r}=await n.OQ.from("settings").insert({key:e,value:t,created_at:new Date().toISOString()});if(r)throw r}},T=async t=>{t.preventDefault();try{R(!0);let t=m;if(f){let e=await H();e&&(t=e)}await Promise.all([A("store_name",r),A("whatsapp_number",e),A("address",d),A("logo_url",t),A("store_open",b.toString()),A("delivery_fee",j),A("min_order_value",N),A("delivery_time",E),A("delivery_radius",C),A("business_hours",JSON.stringify(O))]),l.ZP.success("Configura\xe7\xf5es salvas com sucesso!")}catch(e){console.error("Erro ao salvar configura\xe7\xf5es:",e),l.ZP.error("Erro ao salvar configura\xe7\xf5es")}finally{R(!1)}},H=async()=>{if(!f)return null;try{h(!0);let e=f.name.split(".").pop(),t="logo-".concat(Date.now(),".").concat(e),{data:r,error:a}=await n.OQ.storage.from("products").upload("logos/".concat(t),f);if(a)throw a;let s="".concat("https://tcbketwbrlawpbktasva.supabase.co","/storage/v1/object/public/products/").concat(r.path);return s}catch(e){return console.error("Erro ao fazer upload da logo:",e),l.ZP.error("Erro ao fazer upload da imagem"),null}finally{h(!1)}},Z=(e,t)=>{D(r=>({...r,[e]:t}))},J=e=>{let t=e.replace(/[^0-9.]/g,""),r=t.split(".");return r.length>2?r[0]+"."+r.slice(1).join(""):t};return(0,a.jsx)("div",{className:"min-h-screen bg-gray-50 pb-8",children:(0,a.jsxs)("div",{className:"p-6",children:[(0,a.jsx)("div",{className:"flex justify-between items-center mb-6",children:(0,a.jsx)("h1",{className:"text-3xl font-bold",children:"Configura\xe7\xf5es"})}),z?(0,a.jsx)("div",{className:"flex justify-center p-12",children:(0,a.jsx)("div",{className:"animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"})}):(0,a.jsxs)("div",{className:"bg-white rounded-xl shadow-sm p-6",children:[(0,a.jsx)("div",{className:"border-b border-gray-200 mb-6",children:(0,a.jsxs)("nav",{className:"-mb-px flex space-x-6","aria-label":"Tabs",children:[(0,a.jsx)("button",{onClick:()=>$("general"),className:"py-4 px-1 border-b-2 font-medium text-sm ".concat("general"===I?"border-primary text-primary":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"),children:"Geral"}),(0,a.jsx)("button",{onClick:()=>$("business"),className:"py-4 px-1 border-b-2 font-medium text-sm ".concat("business"===I?"border-primary text-primary":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"),children:"Funcionamento"}),(0,a.jsx)("button",{onClick:()=>$("delivery"),className:"py-4 px-1 border-b-2 font-medium text-sm ".concat("delivery"===I?"border-primary text-primary":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"),children:"Entrega"})]})}),(0,a.jsxs)("form",{onSubmit:T,className:"space-y-8",children:["general"===I&&(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-3",children:"Logo do Estabelecimento"}),(0,a.jsxs)("div",{className:"flex items-start space-x-6",children:[(0,a.jsx)("div",{className:"w-36 h-36 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center relative overflow-hidden",children:m?(0,a.jsx)(i(),{src:m,alt:"Logo",width:144,height:144,className:"object-contain"}):(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-12 w-12 text-gray-400",viewBox:"0 0 20 20",fill:"currentColor",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z",clipRule:"evenodd"})})}),(0,a.jsxs)("div",{className:"flex-1",children:[(0,a.jsx)("input",{type:"file",accept:"image/*",ref:g,className:"hidden",onChange:e=>{if(!e.target.files||0===e.target.files.length)return;let t=e.target.files[0];x(t);let r=new FileReader;r.onload=e=>{var t;(null===(t=e.target)||void 0===t?void 0:t.result)&&p(e.target.result.toString())},r.readAsDataURL(t)}}),(0,a.jsx)("button",{type:"button",onClick:()=>{var e;return null===(e=g.current)||void 0===e?void 0:e.click()},className:"bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",disabled:y,children:y?"Carregando...":"Escolher Logo"}),(0,a.jsx)("p",{className:"text-sm text-gray-500 mt-2",children:"Recomendado: Imagem quadrada de pelo menos 200x200 pixels em formato PNG ou JPG."}),m&&(0,a.jsx)("button",{type:"button",onClick:()=>p(""),className:"mt-2 text-sm text-red-600 hover:text-red-800",children:"Remover logo"})]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"store_name",className:"block text-sm font-medium text-gray-700 mb-1",children:"Nome do Estabelecimento"}),(0,a.jsx)("input",{id:"store_name",type:"text",value:r,onChange:e=>o(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary",placeholder:"Nome do seu estabelecimento"}),(0,a.jsx)("p",{className:"text-sm text-gray-500 mt-1",children:"Este nome ser\xe1 exibido no card\xe1pio e nos pedidos."})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"address",className:"block text-sm font-medium text-gray-700 mb-1",children:"Endere\xe7o"}),(0,a.jsx)("input",{id:"address",type:"text",value:d,onChange:e=>u(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary",placeholder:"Rua Exemplo, 123 - Bairro, Cidade - UF"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"whatsapp",className:"block text-sm font-medium text-gray-700 mb-1",children:"N\xfamero de WhatsApp"}),(0,a.jsxs)("div",{className:"flex",children:[(0,a.jsx)("span",{className:"inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500",children:"+"}),(0,a.jsx)("input",{id:"whatsapp",type:"text",value:e,onChange:e=>t(e.target.value.replace(/\D/g,"")),className:"flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary",placeholder:"5511999999999"})]}),(0,a.jsx)("p",{className:"text-sm text-gray-500 mt-1",children:"Digite o n\xfamero com c\xf3digo do pa\xeds e DDD, sem espa\xe7os ou caracteres especiais. Exemplo: 5511999999999"})]})]}),"business"===I&&(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between p-4 bg-gray-50 rounded-lg",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"font-medium text-gray-900",children:"Status da Loja"}),(0,a.jsx)("p",{className:"text-sm text-gray-500",children:b?"Aberto para pedidos":"Fechado para pedidos"})]}),(0,a.jsxs)("button",{type:"button",className:"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ".concat(b?"bg-green-500":"bg-gray-300"),onClick:()=>v(!b),children:[(0,a.jsx)("span",{className:"sr-only",children:"Alterar status"}),(0,a.jsx)("span",{className:"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ".concat(b?"translate-x-5":"translate-x-0")})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-base font-medium text-gray-900 mb-3",children:"Hor\xe1rios de Funcionamento"}),(0,a.jsx)("div",{className:"space-y-3",children:(0,a.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,a.jsx)(c,{day:"Segunda-feira",value:O.monday,onChange:e=>Z("monday",e)}),(0,a.jsx)(c,{day:"Ter\xe7a-feira",value:O.tuesday,onChange:e=>Z("tuesday",e)}),(0,a.jsx)(c,{day:"Quarta-feira",value:O.wednesday,onChange:e=>Z("wednesday",e)}),(0,a.jsx)(c,{day:"Quinta-feira",value:O.thursday,onChange:e=>Z("thursday",e)}),(0,a.jsx)(c,{day:"Sexta-feira",value:O.friday,onChange:e=>Z("friday",e)}),(0,a.jsx)(c,{day:"S\xe1bado",value:O.saturday,onChange:e=>Z("saturday",e)}),(0,a.jsx)(c,{day:"Domingo",value:O.sunday,onChange:e=>Z("sunday",e)})]})}),(0,a.jsx)("p",{className:"text-sm text-gray-500 mt-2",children:"Formato: HH:MM-HH:MM (24h). Exemplo: 10:00-22:00. Deixe em branco para dias fechados."})]})]}),"delivery"===I&&(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"delivery_fee",className:"block text-sm font-medium text-gray-700 mb-1",children:"Taxa de Entrega (R$)"}),(0,a.jsxs)("div",{className:"flex",children:[(0,a.jsx)("span",{className:"inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500",children:"R$"}),(0,a.jsx)("input",{id:"delivery_fee",type:"text",value:j,onChange:e=>w(J(e.target.value)),className:"flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary",placeholder:"0.00"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"min_order_value",className:"block text-sm font-medium text-gray-700 mb-1",children:"Valor M\xednimo de Pedido (R$)"}),(0,a.jsxs)("div",{className:"flex",children:[(0,a.jsx)("span",{className:"inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500",children:"R$"}),(0,a.jsx)("input",{id:"min_order_value",type:"text",value:N,onChange:e=>k(J(e.target.value)),className:"flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary",placeholder:"0.00"})]}),(0,a.jsx)("p",{className:"text-sm text-gray-500 mt-1",children:"Valor m\xednimo necess\xe1rio para realizar um pedido. Deixe 0 para n\xe3o ter valor m\xednimo."})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"delivery_time",className:"block text-sm font-medium text-gray-700 mb-1",children:"Tempo de Entrega (minutos)"}),(0,a.jsx)("input",{id:"delivery_time",type:"text",value:E,onChange:e=>_(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary",placeholder:"30-45"}),(0,a.jsx)("p",{className:"text-sm text-gray-500 mt-1",children:"Tempo estimado de entrega (ex: 30-45, 40-60)."})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"delivery_radius",className:"block text-sm font-medium text-gray-700 mb-1",children:"Raio de Entrega (km)"}),(0,a.jsx)("input",{id:"delivery_radius",type:"number",value:C,onChange:e=>S(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary",placeholder:"5",min:"0",step:"0.5"}),(0,a.jsx)("p",{className:"text-sm text-gray-500 mt-1",children:"Dist\xe2ncia m\xe1xima para entrega em quil\xf4metros."})]})]}),(0,a.jsx)("div",{className:"pt-4 border-t border-gray-200 flex justify-end",children:(0,a.jsx)("button",{type:"submit",disabled:P,className:"bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2",children:P?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{children:"Salvando..."}),(0,a.jsx)("div",{className:"animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"})]}):(0,a.jsx)("span",{children:"Salvar Configura\xe7\xf5es"})})})]})]})]})})}function c(e){let{day:t,value:r,onChange:s}=e;return(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"w-32 flex-shrink-0",children:(0,a.jsx)("span",{className:"text-sm font-medium text-gray-700",children:t})}),(0,a.jsx)("input",{type:"text",value:r,onChange:e=>s(e.target.value),className:"flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary",placeholder:"10:00-22:00"})]})}},7823:function(e,t,r){"use strict";r.d(t,{OQ:function(){return s}});var a=r(4756);let s=(0,a.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},5925:function(e,t,r){"use strict";let a,s;r.d(t,{x7:function(){return eu},ZP:function(){return em},Am:function(){return P}});var o,i=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",a="",s="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":a+="f"==o[1]?m(i,o):o+"{"+m(i,"k"==o[1]?"":t)+"}":"object"==typeof i?a+=m(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=m.p?m.p(o,i):o+":"+i+";")}return r+(t&&s?t+"{"+s+"}":s)+a},p={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},x=(e,t,r,a,s)=>{var o;let i=f(e),n=p[i]||(p[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!p[n]){let t=i!==e?e:(e=>{let t,r,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[n]=m(s?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&p.g?p.g:null;return r&&(p.g=p[n]),o=p[n],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=a?o+t.data:t.data+o),n},y=(e,t,r)=>e.reduce((e,a,s)=>{let o=t[s];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==o?"":o)},"");function h(e){let t=this||{},r=e.call?e(t.p):e;return x(r.unshift?r.raw?y(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}h.bind({g:1});let g,b,v,j=h.bind({k:1});function w(e,t){let r=this||{};return function(){let a=arguments;function s(o,i){let n=Object.assign({},o),l=n.className||s.className;r.p=Object.assign({theme:b&&b()},n),r.o=/ *go\d+/.test(l),n.className=h.apply(r,a)+(l?" "+l:""),t&&(n.ref=i);let d=e;return e[0]&&(d=n.as||e,delete n.as),v&&d[0]&&v(n),g(d,n)}return t?t(s):s}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,E=(a=0,()=>(++a).toString()),_=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},C=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return C(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},S=[],O={toasts:[],pausedAt:void 0},D=e=>{O=C(O,e),S.forEach(e=>{e(O)})},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$=(e={})=>{let[t,r]=(0,i.useState)(O),a=(0,i.useRef)(O);(0,i.useEffect)(()=>(a.current!==O&&r(O),S.push(r),()=>{let e=S.indexOf(r);e>-1&&S.splice(e,1)}),[]);let s=t.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||I[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...t,toasts:s}},z=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||E()}),F=e=>(t,r)=>{let a=z(t,e,r);return D({type:2,toast:a}),a.id},P=(e,t)=>F("blank")(e,t);P.error=F("error"),P.success=F("success"),P.loading=F("loading"),P.custom=F("custom"),P.dismiss=e=>{D({type:3,toastId:e})},P.remove=e=>D({type:4,toastId:e}),P.promise=(e,t,r)=>{let a=P.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?k(t.success,e):void 0;return s?P.success(s,{id:a,...r,...null==r?void 0:r.success}):P.dismiss(a),e}).catch(e=>{let s=t.error?k(t.error,e):void 0;s?P.error(s,{id:a,...r,...null==r?void 0:r.error}):P.dismiss(a)}),e};var R=(e,t)=>{D({type:1,toast:{id:e,height:t}})},M=()=>{D({type:5,time:Date.now()})},A=new Map,T=1e3,H=(e,t=T)=>{if(A.has(e))return;let r=setTimeout(()=>{A.delete(e),D({type:4,toastId:e})},t);A.set(e,r)},Z=e=>{let{toasts:t,pausedAt:r}=$(e);(0,i.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&P.dismiss(t.id);return}return setTimeout(()=>P.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,i.useCallback)(()=>{r&&D({type:6,time:Date.now()})},[r]),s=(0,i.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:o}=r||{},i=t.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[t]);return(0,i.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)H(e.id,e.removeDelay);else{let t=A.get(e.id);t&&(clearTimeout(t),A.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:R,startPause:M,endPause:a,calculateOffset:s}}},J=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,L=j`
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
}`,V=w("div")`
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
    animation: ${Q} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,q=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${q} 1s linear infinite;
`,X=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=j`
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
}`,G=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${X} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
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
`,Y=w("div")`
  position: absolute;
`,K=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=j`
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
  animation: ${W} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(ee,null,t):t:"blank"===r?null:i.createElement(K,null,i.createElement(U,{...a}),"loading"!==r&&i.createElement(Y,null,"error"===r?i.createElement(V,{...a}):i.createElement(G,{...a})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=w("div")`
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
`,ei=(e,t)=>{let r=e.includes("top")?1:-1,[a,s]=_()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),ea(r)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=i.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},o=i.createElement(et,{toast:e}),n=i.createElement(eo,{...e.ariaProps},k(e.message,e));return i.createElement(es,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):i.createElement(i.Fragment,null,o,n))});o=i.createElement,m.p=void 0,g=o,b=void 0,v=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let o=i.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return i.createElement("div",{ref:o,className:t,style:r},s)},ed=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:_()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ec=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:d}=Z(r);return i.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(r=>{let o=r.position||t,n=ed(o,d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return i.createElement(el,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?ec:"",style:n},"custom"===r.type?k(r.message,r):s?s(r):i.createElement(en,{toast:r,position:o}))}))},em=P}},function(e){e.O(0,[36,691,971,472,744],function(){return e(e.s=3294)}),_N_E=e.O()}]);