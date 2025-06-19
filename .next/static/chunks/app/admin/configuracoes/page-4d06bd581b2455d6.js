(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7],{4021:function(e,t,a){Promise.resolve().then(a.bind(a,6149))},6304:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return o}});let r=a(1024),s=r._(a(2265)),o=s.default.createContext(null)},6149:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return c}});var r=a(7437),s=a(2265),o=a(6691),i=a.n(o),n=a(7823),l=a(345),d=a(5925);function c(){let[e,t]=(0,s.useState)(""),[a,o]=(0,s.useState)(""),[c,m]=(0,s.useState)(""),[p,g]=(0,s.useState)(""),[h,x]=(0,s.useState)(null),[f,b]=(0,s.useState)(!1),y=(0,s.useRef)(null),[v,j]=(0,s.useState)(!0),[w,N]=(0,s.useState)(!1),[A,k]=(0,s.useState)(null),[D,I]=(0,s.useState)(!1),[S,E]=(0,s.useState)("0.00"),[O,C]=(0,s.useState)("0.00"),[R,M]=(0,s.useState)("30-45"),[Y,z]=(0,s.useState)("5"),[L,Z]=(0,s.useState)({monday:"10:00-22:00",tuesday:"10:00-22:00",wednesday:"10:00-22:00",thursday:"10:00-22:00",friday:"10:00-23:00",saturday:"10:00-23:00",sunday:"11:00-22:00"}),[G,T]=(0,s.useState)("general"),[_,W]=(0,s.useState)(!0),[P,J]=(0,s.useState)(!1);(0,s.useEffect)(()=>{F()},[]),(0,s.useEffect)(()=>{if(!w||D)return;let e=()=>{let e=(0,l.Vx)(L);e!==v&&(console.log("Auto-atualizando status da loja: ".concat(e?"ABERTA":"FECHADA")),j(e),k(new Date),B("store_open",e.toString()),d.ZP.success(e?"\uD83D\uDFE2 Loja aberta automaticamente conforme hor\xe1rio configurado!":"\uD83D\uDD34 Loja fechada automaticamente conforme hor\xe1rio configurado!"))};e();let t=setInterval(e,6e4);return()=>clearInterval(t)},[w,L,v,D]);let F=async()=>{try{W(!0);let{data:e,error:a}=await n.OQ.from("settings").select("key, value");if(a)throw a;e&&e.length>0&&e.forEach(e=>{switch(e.key){case"whatsapp_number":t(e.value);break;case"store_name":o(e.value);break;case"address":m(e.value);break;case"store_open":j("true"===e.value);break;case"auto_schedule_enabled":N("true"===e.value);break;case"manual_override":I("true"===e.value);break;case"delivery_fee":E(e.value);break;case"min_order_value":C(e.value);break;case"delivery_time":M(e.value);break;case"delivery_radius":z(e.value);break;case"logo_url":g(e.value);break;case"business_hours":try{let t=JSON.parse(e.value);t&&"object"==typeof t&&Z(t)}catch(e){console.error("Erro ao processar hor\xe1rios:",e)}}})}catch(e){console.error("Erro ao buscar configura\xe7\xf5es:",e),d.ZP.error("Erro ao carregar configura\xe7\xf5es")}finally{W(!1)}},B=async(e,t)=>{let{data:a,error:r}=await n.OQ.from("settings").select("id").eq("key",e),s=!r&&a&&a.length>0;if(s&&a&&a.length>0){let e=a[0].id,{error:r}=await n.OQ.from("settings").update({value:t,updated_at:new Date().toISOString()}).eq("id",e);if(r)throw r}else{let{error:a}=await n.OQ.from("settings").insert({key:e,value:t,created_at:new Date().toISOString()});if(a)throw a}},Q=async t=>{t.preventDefault();try{J(!0);let t=p;if(h){let e=await H();e&&(t=e)}await Promise.all([B("store_name",a),B("whatsapp_number",e),B("address",c),B("logo_url",t),B("store_open",v.toString()),B("auto_schedule_enabled",w.toString()),B("manual_override",D.toString()),B("delivery_fee",S),B("min_order_value",O),B("delivery_time",R),B("delivery_radius",Y),B("business_hours",JSON.stringify(L))]),d.ZP.success("Configura\xe7\xf5es salvas com sucesso!")}catch(e){console.error("Erro ao salvar configura\xe7\xf5es:",e),d.ZP.error("Erro ao salvar configura\xe7\xf5es")}finally{J(!1)}},H=async()=>{if(!h)return null;try{b(!0);let e=h.name.split(".").pop(),t="logo-".concat(Date.now(),".").concat(e),{data:a,error:r}=await n.OQ.storage.from("products").upload("logos/".concat(t),h);if(r)throw r;let s="".concat("https://tcbketwbrlawpbktasva.supabase.co","/storage/v1/object/public/products/").concat(a.path);return s}catch(e){return console.error("Erro ao fazer upload da logo:",e),d.ZP.error("Erro ao fazer upload da imagem"),null}finally{b(!1)}},U=(e,t)=>{Z(a=>({...a,[e]:t}))},V=e=>{let t=e.replace(/[^0-9.]/g,""),a=t.split(".");return a.length>2?a[0]+"."+a.slice(1).join(""):t};return(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsx)("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",children:(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{className:"text-3xl font-bold text-gray-900",children:"Configura\xe7\xf5es"}),(0,r.jsx)("p",{className:"text-gray-600 mt-1",children:"Configure as informa\xe7\xf5es do seu estabelecimento"})]})}),_?(0,r.jsx)("div",{className:"flex justify-center py-12",children:(0,r.jsx)("div",{className:"animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"})}):(0,r.jsxs)("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200",children:[(0,r.jsx)("div",{className:"border-b border-gray-200",children:(0,r.jsxs)("nav",{className:"flex space-x-8 px-6","aria-label":"Tabs",children:[(0,r.jsx)("button",{onClick:()=>T("general"),className:"py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ".concat("general"===G?"border-blue-500 text-blue-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"),children:"Geral"}),(0,r.jsx)("button",{onClick:()=>T("business"),className:"py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ".concat("business"===G?"border-blue-500 text-blue-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"),children:"Funcionamento"}),(0,r.jsx)("button",{onClick:()=>T("delivery"),className:"py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ".concat("delivery"===G?"border-blue-500 text-blue-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"),children:"Entrega"})]})}),(0,r.jsxs)("form",{onSubmit:Q,className:"p-6 space-y-8",children:["general"===G&&(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-3",children:"Logo do Estabelecimento"}),(0,r.jsxs)("div",{className:"flex items-start space-x-6",children:[(0,r.jsx)("div",{className:"w-36 h-36 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center relative overflow-hidden",children:p?(0,r.jsx)(i(),{src:p,alt:"Logo",width:144,height:144,className:"object-contain"}):(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-12 w-12 text-gray-400",viewBox:"0 0 20 20",fill:"currentColor",children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z",clipRule:"evenodd"})})}),(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsx)("input",{type:"file",accept:"image/*",ref:y,className:"hidden",onChange:e=>{if(!e.target.files||0===e.target.files.length)return;let t=e.target.files[0];x(t);let a=new FileReader;a.onload=e=>{var t;(null===(t=e.target)||void 0===t?void 0:t.result)&&g(e.target.result.toString())},a.readAsDataURL(t)}}),(0,r.jsx)("button",{type:"button",onClick:()=>{var e;return null===(e=y.current)||void 0===e?void 0:e.click()},className:"bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",disabled:f,children:f?"Carregando...":"Escolher Logo"}),(0,r.jsx)("p",{className:"text-sm text-gray-500 mt-2",children:"Recomendado: Imagem quadrada de pelo menos 200x200 pixels em formato PNG ou JPG."}),p&&(0,r.jsx)("button",{type:"button",onClick:()=>g(""),className:"mt-2 text-sm text-red-600 hover:text-red-800",children:"Remover logo"})]})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"store_name",className:"block text-sm font-medium text-gray-700 mb-1",children:"Nome do Estabelecimento"}),(0,r.jsx)("input",{id:"store_name",type:"text",value:a,onChange:e=>o(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"Nome do seu estabelecimento"}),(0,r.jsx)("p",{className:"text-sm text-gray-500 mt-1",children:"Este nome ser\xe1 exibido no card\xe1pio e nos pedidos."})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"address",className:"block text-sm font-medium text-gray-700 mb-1",children:"Endere\xe7o"}),(0,r.jsx)("input",{id:"address",type:"text",value:c,onChange:e=>m(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"Rua Exemplo, 123 - Bairro, Cidade - UF"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"whatsapp",className:"block text-sm font-medium text-gray-700 mb-1",children:"N\xfamero de WhatsApp"}),(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)("span",{className:"inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500",children:"+"}),(0,r.jsx)("input",{id:"whatsapp",type:"text",value:e,onChange:e=>t(e.target.value.replace(/\D/g,"")),className:"flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"5511999999999"})]}),(0,r.jsx)("p",{className:"text-sm text-gray-500 mt-1",children:"Digite o n\xfamero com c\xf3digo do pa\xeds e DDD, sem espa\xe7os ou caracteres especiais. Exemplo: 5511999999999"})]})]}),"business"===G&&(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsx)("div",{className:"bg-gray-50 rounded-lg p-4 border border-gray-200",children:(0,r.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"font-medium text-gray-900",children:"Status da Loja"}),(0,r.jsxs)("p",{className:"text-sm text-gray-500",children:[v?"Aberto para pedidos":"Fechado para pedidos",D&&" (Override manual ativo)"]})]}),(0,r.jsxs)("button",{type:"button",className:"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ".concat(v?"bg-green-500":"bg-gray-300"),onClick:()=>{let e=!v;if(j(e),w){let t=(0,l.Vx)(L);e!==t&&(I(!0),(0,d.ZP)("Override manual ativado. Para voltar ao autom\xe1tico, desative e reative o agendamento.",{icon:"⚠️",duration:4e3}))}},children:[(0,r.jsx)("span",{className:"sr-only",children:"Alterar status"}),(0,r.jsx)("span",{className:"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ".concat(v?"translate-x-5":"translate-x-0")})]})]})}),(0,r.jsxs)("div",{className:"bg-blue-50 rounded-lg p-4 border border-blue-200",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"font-medium text-blue-900",children:"Agendamento Autom\xe1tico"}),(0,r.jsx)("p",{className:"text-sm text-blue-700",children:w?"Loja abre/fecha automaticamente conforme hor\xe1rios configurados":"Controle manual do status da loja"})]}),(0,r.jsxs)("button",{type:"button",className:"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ".concat(w?"bg-blue-500":"bg-gray-300"),onClick:()=>{let e=!w;if(N(e),e){I(!1);let e=(0,l.Vx)(L);j(e),d.ZP.success("Agendamento autom\xe1tico ativado! Status da loja ajustado conforme hor\xe1rio atual.")}else I(!1),(0,d.ZP)("Agendamento autom\xe1tico desativado. Controle agora \xe9 manual.",{icon:"ℹ️",duration:4e3})},children:[(0,r.jsx)("span",{className:"sr-only",children:"Alterar agendamento autom\xe1tico"}),(0,r.jsx)("span",{className:"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ".concat(w?"translate-x-5":"translate-x-0")})]})]}),w&&(0,r.jsxs)("div",{className:"text-xs text-blue-600 space-y-1",children:[(0,r.jsx)("p",{children:"✅ Sistema verifica os hor\xe1rios a cada minuto"}),(0,r.jsx)("p",{children:"✅ Status atualizado automaticamente"}),A&&(0,r.jsxs)("p",{children:["\uD83D\uDCC5 \xdaltima verifica\xe7\xe3o: ",A.toLocaleTimeString("pt-BR")]}),D&&(0,r.jsx)("p",{className:"text-orange-600 font-medium",children:"⚠️ Override manual ativo - Para voltar ao autom\xe1tico, desative e reative o agendamento"})]})]}),(0,r.jsxs)("div",{className:"bg-white rounded-lg p-4 border border-gray-200",children:[(0,r.jsx)("h3",{className:"font-medium text-gray-900 mb-3",children:"Status Baseado no Hor\xe1rio Atual"}),(0,r.jsxs)("div",{className:"space-y-2 text-sm",children:[(0,r.jsxs)("div",{className:"flex justify-between",children:[(0,r.jsx)("span",{className:"text-gray-600",children:"Hor\xe1rio atual:"}),(0,r.jsx)("span",{className:"font-medium",children:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})})]}),(0,r.jsxs)("div",{className:"flex justify-between",children:[(0,r.jsx)("span",{className:"text-gray-600",children:"Data:"}),(0,r.jsx)("span",{className:"font-medium",children:new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"2-digit"})})]}),(0,r.jsxs)("div",{className:"flex justify-between",children:[(0,r.jsx)("span",{className:"text-gray-600",children:"Status sugerido:"}),(0,r.jsx)("span",{className:"font-bold ".concat((0,l.Vx)(L)?"text-green-600":"text-red-600"),children:(0,l.Vx)(L)?"\uD83D\uDFE2 ABERTA":"\uD83D\uDD34 FECHADA"})]}),!(0,l.Vx)(L)&&(0,r.jsx)("div",{className:"mt-3 pt-3 border-t border-gray-100",children:(0,r.jsxs)("div",{className:"flex justify-between",children:[(0,r.jsx)("span",{className:"text-gray-600",children:"Pr\xf3xima abertura:"}),(0,r.jsx)("span",{className:"font-medium text-blue-600",children:(0,l._n)(L)})]})})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"text-base font-medium text-gray-900 mb-3",children:"Hor\xe1rios de Funcionamento"}),(0,r.jsx)("div",{className:"space-y-3",children:(0,r.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,r.jsx)(u,{day:"Segunda-feira",value:L.monday,onChange:e=>U("monday",e)}),(0,r.jsx)(u,{day:"Ter\xe7a-feira",value:L.tuesday,onChange:e=>U("tuesday",e)}),(0,r.jsx)(u,{day:"Quarta-feira",value:L.wednesday,onChange:e=>U("wednesday",e)}),(0,r.jsx)(u,{day:"Quinta-feira",value:L.thursday,onChange:e=>U("thursday",e)}),(0,r.jsx)(u,{day:"Sexta-feira",value:L.friday,onChange:e=>U("friday",e)}),(0,r.jsx)(u,{day:"S\xe1bado",value:L.saturday,onChange:e=>U("saturday",e)}),(0,r.jsx)(u,{day:"Domingo",value:L.sunday,onChange:e=>U("sunday",e)})]})}),(0,r.jsx)("p",{className:"text-sm text-gray-500 mt-2",children:"Formato: HH:MM-HH:MM (24h). Exemplo: 10:00-22:00. Deixe em branco para dias fechados."})]})]}),"delivery"===G&&(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"delivery_fee",className:"block text-sm font-medium text-gray-700 mb-1",children:"Taxa de Entrega (R$)"}),(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)("span",{className:"inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500",children:"R$"}),(0,r.jsx)("input",{id:"delivery_fee",type:"text",value:S,onChange:e=>E(V(e.target.value)),className:"flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"0.00"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"min_order_value",className:"block text-sm font-medium text-gray-700 mb-1",children:"Valor M\xednimo de Pedido (R$)"}),(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)("span",{className:"inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500",children:"R$"}),(0,r.jsx)("input",{id:"min_order_value",type:"text",value:O,onChange:e=>C(V(e.target.value)),className:"flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"0.00"})]}),(0,r.jsx)("p",{className:"text-sm text-gray-500 mt-1",children:"Valor m\xednimo necess\xe1rio para realizar um pedido. Deixe 0 para n\xe3o ter valor m\xednimo."})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"delivery_time",className:"block text-sm font-medium text-gray-700 mb-1",children:"Tempo de Entrega (minutos)"}),(0,r.jsx)("input",{id:"delivery_time",type:"text",value:R,onChange:e=>M(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"30-45"}),(0,r.jsx)("p",{className:"text-sm text-gray-500 mt-1",children:"Tempo estimado de entrega (ex: 30-45, 40-60)."})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"delivery_radius",className:"block text-sm font-medium text-gray-700 mb-1",children:"Raio de Entrega (km)"}),(0,r.jsx)("input",{id:"delivery_radius",type:"number",value:Y,onChange:e=>z(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"5",min:"0",step:"0.5"}),(0,r.jsx)("p",{className:"text-sm text-gray-500 mt-1",children:"Dist\xe2ncia m\xe1xima para entrega em quil\xf4metros."})]})]}),(0,r.jsx)("div",{className:"pt-4 border-t border-gray-200 flex justify-end",children:(0,r.jsx)("button",{type:"submit",disabled:P,className:"bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50",children:P?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"}),"Salvando..."]}):"Salvar Configura\xe7\xf5es"})})]})]})]})}function u(e){let{day:t,value:a,onChange:s}=e;return(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("div",{className:"w-32 flex-shrink-0",children:(0,r.jsx)("span",{className:"text-sm font-medium text-gray-700",children:t})}),(0,r.jsx)("input",{type:"text",value:a,onChange:e=>s(e.target.value),className:"flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"10:00-22:00"})]})}},7823:function(e,t,a){"use strict";a.d(t,{OQ:function(){return s}});var r=a(4756);let s=(0,r.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},345:function(e,t,a){"use strict";a.d(t,{Ix:function(){return n},P0:function(){return u},Vx:function(){return d},WF:function(){return s},_n:function(){return m},_z:function(){return c},aF:function(){return i},xG:function(){return o}});var r=a(7823);let s="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMTlUMTM6Mzc6MTQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0xOVQxMzozNzoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f+lkGAAAALRJREFUeJzt0cENwDAIADFE0/0H6yhkgHug57OzKmk7M9sB3LXeCeyZkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDg/nxMKXAp7CKEAAAAASUVORK5CYII=";function o(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function i(e,t){return e.length<=t?e:e.slice(0,t)+"..."}async function n(e,t,a){try{let s="".concat(Date.now(),"_").concat(e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/--+/g,"-").trim()),o=a?"".concat(a,"/").concat(s):s,{data:i,error:n}=await r.OQ.storage.from(t).upload(o,e,{cacheControl:"3600",upsert:!1});if(n)throw n;let{data:l}=r.OQ.storage.from(t).getPublicUrl(o);return l.publicUrl}catch(e){return console.error("Erro ao fazer upload da imagem:",e),console.warn("Usando imagem placeholder como fallback"),s}}let l={0:"sunday",1:"monday",2:"tuesday",3:"wednesday",4:"thursday",5:"friday",6:"saturday"},d=e=>{let t=new Date,a=t.getDay(),r=t.toTimeString().slice(0,5),s=l[a],o=e[s];if(!o||""===o.trim())return!1;let i=o.split("-");if(2!==i.length)return!1;let[n,d]=i.map(e=>e.trim());return d<n?r>=n||r<=d:r>=n&&r<=d},c=e=>{let t=new Date,a=t.getDay(),r=t.toTimeString().slice(0,5),s=l[a],o=e[s];return{shouldBeOpen:d(e),currentTime:r,todayHours:o,dayOfWeek:s,timestamp:t}},u=e=>{let t=new Date,a=t.getDay(),r=l[a],s=e[r];return s&&""!==s.trim()?"Hoje: ".concat(s):"Fechado hoje"},m=e=>{let t=c(e);if(t.shouldBeOpen)return null;let a=new Date,r=a.getDay(),s=l[r],o=e[s];if(o&&""!==o.trim()){let[e]=o.split("-").map(e=>e.trim()),t=a.toTimeString().slice(0,5);if(t<e)return"Abre hoje \xe0s ".concat(e)}for(let t=1;t<=7;t++){let a=(r+t)%7,s=l[a],o=e[s];if(o&&""!==o.trim()){let[e]=o.split("-").map(e=>e.trim()),a={monday:"segunda-feira",tuesday:"ter\xe7a-feira",wednesday:"quarta-feira",thursday:"quinta-feira",friday:"sexta-feira",saturday:"s\xe1bado",sunday:"domingo"},r=a[s];return"Abre ".concat(1===t?"amanh\xe3":r," \xe0s ").concat(e)}}return"Hor\xe1rios n\xe3o definidos"}},5925:function(e,t,a){"use strict";let r,s;a.d(t,{x7:function(){return eu},ZP:function(){return em},Am:function(){return z}});var o,i=a(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let a="",r="",s="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?a=o+" "+i+";":r+="f"==o[1]?m(i,o):o+"{"+m(i,"k"==o[1]?"":t)+"}":"object"==typeof i?r+=m(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=m.p?m.p(o,i):o+":"+i+";")}return a+(t&&s?t+"{"+s+"}":s)+r},p={},g=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+g(e[a]);return t}return e},h=(e,t,a,r,s)=>{var o;let i=g(e),n=p[i]||(p[i]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(i));if(!p[n]){let t=i!==e?e:(e=>{let t,a,r=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?r.shift():t[3]?(a=t[3].replace(u," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(u," ").trim();return r[0]})(e);p[n]=m(s?{["@keyframes "+n]:t}:t,a?"":"."+n)}let l=a&&p.g?p.g:null;return a&&(p.g=p[n]),o=p[n],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=r?o+t.data:t.data+o),n},x=(e,t,a)=>e.reduce((e,r,s)=>{let o=t[s];if(o&&o.call){let e=o(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+r+(null==o?"":o)},"");function f(e){let t=this||{},a=e.call?e(t.p):e;return h(a.unshift?a.raw?x(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}f.bind({g:1});let b,y,v,j=f.bind({k:1});function w(e,t){let a=this||{};return function(){let r=arguments;function s(o,i){let n=Object.assign({},o),l=n.className||s.className;a.p=Object.assign({theme:y&&y()},n),a.o=/ *go\d+/.test(l),n.className=f.apply(a,r)+(l?" "+l:""),t&&(n.ref=i);let d=e;return e[0]&&(d=n.as||e,delete n.as),v&&d[0]&&v(n),b(d,n)}return t?t(s):s}}var N=e=>"function"==typeof e,A=(e,t)=>N(e)?e(t):e,k=(r=0,()=>(++r).toString()),D=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},I=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return I(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},S=[],E={toasts:[],pausedAt:void 0},O=e=>{E=I(E,e),S.forEach(e=>{e(E)})},C={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},R=(e={})=>{let[t,a]=(0,i.useState)(E),r=(0,i.useRef)(E);(0,i.useEffect)(()=>(r.current!==E&&a(E),S.push(a),()=>{let e=S.indexOf(a);e>-1&&S.splice(e,1)}),[]);let s=t.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||C[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...t,toasts:s}},M=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||k()}),Y=e=>(t,a)=>{let r=M(t,e,a);return O({type:2,toast:r}),r.id},z=(e,t)=>Y("blank")(e,t);z.error=Y("error"),z.success=Y("success"),z.loading=Y("loading"),z.custom=Y("custom"),z.dismiss=e=>{O({type:3,toastId:e})},z.remove=e=>O({type:4,toastId:e}),z.promise=(e,t,a)=>{let r=z.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?A(t.success,e):void 0;return s?z.success(s,{id:r,...a,...null==a?void 0:a.success}):z.dismiss(r),e}).catch(e=>{let s=t.error?A(t.error,e):void 0;s?z.error(s,{id:r,...a,...null==a?void 0:a.error}):z.dismiss(r)}),e};var L=(e,t)=>{O({type:1,toast:{id:e,height:t}})},Z=()=>{O({type:5,time:Date.now()})},G=new Map,T=1e3,_=(e,t=T)=>{if(G.has(e))return;let a=setTimeout(()=>{G.delete(e),O({type:4,toastId:e})},t);G.set(e,a)},W=e=>{let{toasts:t,pausedAt:a}=R(e);(0,i.useEffect)(()=>{if(a)return;let e=Date.now(),r=t.map(t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(a<0){t.visible&&z.dismiss(t.id);return}return setTimeout(()=>z.dismiss(t.id),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[t,a]);let r=(0,i.useCallback)(()=>{a&&O({type:6,time:Date.now()})},[a]),s=(0,i.useCallback)((e,a)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:o}=a||{},i=t.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[t]);return(0,i.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)_(e.id,e.removeDelay);else{let t=G.get(e.id);t&&(clearTimeout(t),G.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:L,startPause:Z,endPause:r,calculateOffset:s}}},P=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,J=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,F=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=w("div")`
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
    animation: ${J} 0.15s ease-out forwards;
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
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Q=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,H=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Q} 1s linear infinite;
`,U=j`
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
}`,X=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,et=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?i.createElement(ee,null,t):t:"blank"===a?null:i.createElement(K,null,i.createElement(H,{...r}),"loading"!==a&&i.createElement($,null,"error"===a?i.createElement(B,{...r}):i.createElement(X,{...r})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
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
`,ei=(e,t)=>{let a=e.includes("top")?1:-1,[r,s]=D()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(a),er(a)];return{animation:t?`${j(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=i.memo(({toast:e,position:t,style:a,children:r})=>{let s=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},o=i.createElement(et,{toast:e}),n=i.createElement(eo,{...e.ariaProps},A(e.message,e));return i.createElement(es,{className:e.className,style:{...s,...a,...e.style}},"function"==typeof r?r({icon:o,message:n}):i.createElement(i.Fragment,null,o,n))});o=i.createElement,m.p=void 0,b=o,y=void 0,v=void 0;var el=({id:e,className:t,style:a,onHeightUpdate:r,children:s})=>{let o=i.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return i.createElement("div",{ref:o,className:t,style:a},s)},ed=(e,t)=>{let a=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:D()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...r}},ec=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:s,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:d}=W(a);return i.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(a=>{let o=a.position||t,n=ed(o,d.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return i.createElement(el,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?ec:"",style:n},"custom"===a.type?A(a.message,a):s?s(a):i.createElement(en,{toast:a,position:o}))}))},em=z}},function(e){e.O(0,[36,691,971,472,744],function(){return e(e.s=4021)}),_N_E=e.O()}]);