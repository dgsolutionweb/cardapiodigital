(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[396],{2075:function(e,t,s){Promise.resolve().then(s.bind(s,8992))},8992:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return l}});var a=s(7437),c=s(9738),r=s.n(c),i=s(2265),d=s(7823),n=s(345),o=s(5925);function l(){let[e,t]=(0,i.useState)([]),[s,c]=(0,i.useState)(!0),[l,m]=(0,i.useState)([]),[f,u]=(0,i.useState)(!0),[p,x]=(0,i.useState)(null);(0,i.useRef)(null);let b=(0,i.useRef)(null);(0,i.useEffect)(()=>{b.current=new Audio("/notification.mp3"),O();let e=d.OQ.channel("public:orders").on("postgres_changes",{event:"*",schema:"public",table:"orders"},e=>{if(console.log("Mudan\xe7a detectada:",e),"INSERT"===e.eventType&&e.new&&"pendente"===e.new.status){let t=e.new.id;b.current&&b.current.play().catch(e=>console.error("Erro ao tocar som:",e)),h(t),O()}else O()}).subscribe();return()=>{e.unsubscribe()}},[]),(0,i.useEffect)(()=>{j()},[l,e]);let h=e=>{m(t=>t.includes(e)?t:[...t,e])},j=async()=>{if(0===l.length||!f||0===e.length||C)return;let t=l[0],s=e.find(e=>e.id===t);s&&setTimeout(()=>{M(t)()},1e3)},[g,y]=(0,i.useState)("Card\xe1pio Digital"),[v,N]=(0,i.useState)(""),[w,A]=(0,i.useState)(""),[I,k]=(0,i.useState)("");(0,i.useEffect)(()=>{let e=async()=>{try{let{data:e,error:t}=await d.OQ.from("settings").select("key, value").in("key",["store_name","logo_url","address","phone"]);if(t)throw t;e&&e.forEach(e=>{switch(e.key){case"store_name":y(e.value);break;case"logo_url":N(e.value);break;case"address":A(e.value);break;case"phone":k(e.value)}})}catch(e){console.error("Erro ao buscar configura\xe7\xf5es da loja:",e)}};e()},[]);let O=async()=>{try{c(!0);let{data:e,error:s}=await d.OQ.from("orders").select("*").in("status",["pendente","confirmado","em_preparo"]).order("created_at",{ascending:!1});if(s)throw s;let a=[];if(e){for(let t of e){let{data:e,error:s}=await d.OQ.from("order_items").select("\n              id,\n              quantity,\n              unit_price,\n              variation_name,\n              extras_info,\n              products (name)\n            ").eq("order_id",t.id),c=(null==e?void 0:e.map(e=>{var t;return{id:e.id,product_name:(null===(t=e.products)||void 0===t?void 0:t.name)||"Produto sem nome",quantity:e.quantity,unit_price:e.unit_price,variation_name:e.variation_name||void 0,extras_info:e.extras_info||void 0}}))||[];if(s)throw s;let r={id:t.id,customer_name:t.customer_name,customer_phone:t.customer_phone,delivery_address:t.delivery_address||"",payment_method:t.payment_method||"dinheiro",observations:t.observations||"",status:t.status,total:t.total,created_at:t.created_at,updated_at:t.updated_at,items:c};a.push(r)}t(a)}}catch(e){console.error("Erro ao buscar pedidos:",e),o.ZP.error("Erro ao carregar os pedidos")}finally{c(!1)}},E=async(e,t)=>{try{let{error:s}=await d.OQ.from("orders").update({status:t,updated_at:new Date().toISOString()}).eq("id",e);if(s)throw s;o.ZP.success("Status atualizado para: ".concat(t))}catch(e){console.error("Erro ao atualizar status:",e),o.ZP.error(e.message||"Erro ao atualizar status")}},[C,S]=(0,i.useState)(null),M=t=>()=>{let s=e.find(e=>e.id===t);if(!s){o.ZP.error("Pedido n\xe3o encontrado");return}S(s),setTimeout(()=>{let e=document.title;document.title="Comanda #".concat(s.id.slice(0,8)),window.print(),document.title=e,console.log("Imprimindo pedido:",s.id),o.ZP.success("Comanda enviada para impress\xe3o"),l.includes(t)&&m(e=>e.filter(e=>e!==t)),x(t)},300)},D=e=>{let t=new Date(e);return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(t)};return(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf min-h-screen bg-gray-50 pb-8",children:[(0,a.jsx)(r(),{id:"d78c3cfc0260badf",children:"@media print{body *{visibility:hidden}.print-section,.print-section *{visibility:visible}.print-section{position:absolute;left:0;top:0;width:100%}@page{size:80mm 297mm;margin:5mm}}"}),C&&(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf print-section p-4 font-sans text-sm",children:[(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf text-center mb-4 border-b-2 border-gray-800 pb-3",children:[v&&(0,a.jsx)("div",{className:"jsx-d78c3cfc0260badf flex justify-center mb-2",children:(0,a.jsx)("img",{src:v,alt:g,className:"jsx-d78c3cfc0260badf h-16 object-contain"})}),(0,a.jsx)("h2",{className:"jsx-d78c3cfc0260badf text-xl font-bold",children:g}),w&&(0,a.jsx)("p",{className:"jsx-d78c3cfc0260badf text-xs",children:w}),I&&(0,a.jsxs)("p",{className:"jsx-d78c3cfc0260badf text-xs",children:["Tel: ",I]})]}),(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf text-center mb-4 bg-gray-100 py-2 rounded-lg",children:[(0,a.jsxs)("h2",{className:"jsx-d78c3cfc0260badf text-xl font-bold",children:["COMANDA #",C.id.slice(0,8)]}),(0,a.jsx)("p",{className:"jsx-d78c3cfc0260badf text-sm",children:new Date(C.created_at).toLocaleString("pt-BR")})]}),(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf mb-4 border border-gray-300 rounded-lg p-3",children:[(0,a.jsxs)("p",{className:"jsx-d78c3cfc0260badf",children:[(0,a.jsx)("strong",{className:"jsx-d78c3cfc0260badf",children:"Cliente:"})," ",C.customer_name]}),(0,a.jsxs)("p",{className:"jsx-d78c3cfc0260badf",children:[(0,a.jsx)("strong",{className:"jsx-d78c3cfc0260badf",children:"Telefone:"})," ",C.customer_phone]}),C.delivery_address&&(0,a.jsxs)("p",{className:"jsx-d78c3cfc0260badf",children:[(0,a.jsx)("strong",{className:"jsx-d78c3cfc0260badf",children:"Endere\xe7o:"})," ",C.delivery_address]}),(0,a.jsxs)("p",{className:"jsx-d78c3cfc0260badf",children:[(0,a.jsx)("strong",{className:"jsx-d78c3cfc0260badf",children:"Pagamento:"})," ",C.payment_method.toUpperCase()]})]}),(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf mb-4",children:[(0,a.jsx)("h3",{className:"jsx-d78c3cfc0260badf font-bold bg-gray-800 text-white py-1 px-2 rounded-t-lg",children:"ITENS DO PEDIDO"}),(0,a.jsxs)("table",{className:"jsx-d78c3cfc0260badf w-full border border-gray-300",children:[(0,a.jsx)("thead",{className:"jsx-d78c3cfc0260badf bg-gray-100",children:(0,a.jsxs)("tr",{className:"jsx-d78c3cfc0260badf",children:[(0,a.jsx)("th",{className:"jsx-d78c3cfc0260badf text-left p-2 border-b",children:"Qtd"}),(0,a.jsx)("th",{className:"jsx-d78c3cfc0260badf text-left p-2 border-b",children:"Item"}),(0,a.jsx)("th",{className:"jsx-d78c3cfc0260badf text-right p-2 border-b",children:"Valor"})]})}),(0,a.jsx)("tbody",{className:"jsx-d78c3cfc0260badf",children:C.items.map(e=>(0,a.jsxs)(i.Fragment,{children:[(0,a.jsxs)("tr",{className:"jsx-d78c3cfc0260badf",children:[(0,a.jsxs)("td",{className:"jsx-d78c3cfc0260badf p-2 border-b",children:[e.quantity,"x"]}),(0,a.jsx)("td",{className:"jsx-d78c3cfc0260badf p-2 border-b",children:e.product_name}),(0,a.jsx)("td",{className:"jsx-d78c3cfc0260badf p-2 text-right border-b",children:(0,n.xG)(e.unit_price*e.quantity)})]}),e.variation_name&&(0,a.jsx)("tr",{className:"jsx-d78c3cfc0260badf",children:(0,a.jsxs)("td",{colSpan:3,className:"jsx-d78c3cfc0260badf pl-4 text-xs text-gray-600",children:[(0,a.jsx)("span",{className:"jsx-d78c3cfc0260badf font-medium",children:"▹ Varia\xe7\xe3o:"})," ",e.variation_name]})}),e.extras_info&&(0,a.jsx)("tr",{className:"jsx-d78c3cfc0260badf",children:(0,a.jsxs)("td",{colSpan:3,className:"jsx-d78c3cfc0260badf pl-4 pb-2 text-xs text-gray-600",children:[(0,a.jsx)("span",{className:"jsx-d78c3cfc0260badf font-medium",children:"▹ Adicionais:"})," ",e.extras_info]})})]},e.id))}),(0,a.jsx)("tfoot",{className:"jsx-d78c3cfc0260badf",children:(0,a.jsxs)("tr",{className:"jsx-d78c3cfc0260badf bg-gray-100 font-bold",children:[(0,a.jsx)("td",{colSpan:2,className:"jsx-d78c3cfc0260badf p-2 text-right",children:"SUBTOTAL:"}),(0,a.jsx)("td",{className:"jsx-d78c3cfc0260badf p-2 text-right",children:(0,n.xG)(C.total)})]})})]})]}),C.observations&&(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf mb-4 border border-gray-300 rounded-lg p-3 bg-gray-50",children:[(0,a.jsx)("p",{className:"jsx-d78c3cfc0260badf font-bold border-b border-gray-300 pb-1 mb-2",children:"OBSERVA\xc7\xd5ES:"}),(0,a.jsx)("p",{className:"jsx-d78c3cfc0260badf italic",children:C.observations})]}),(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf text-center text-xs mt-6 pt-3 border-t border-dotted border-gray-400",children:[(0,a.jsx)("p",{className:"jsx-d78c3cfc0260badf",children:"COMANDA PARA USO INTERNO - COZINHA"}),(0,a.jsxs)("p",{className:"jsx-d78c3cfc0260badf mt-1",children:["Impresso em: ",new Date().toLocaleString("pt-BR")]})]})]}),(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf p-6",children:[(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf flex justify-between items-center mb-6",children:[(0,a.jsx)("h1",{className:"jsx-d78c3cfc0260badf text-3xl font-bold",children:"Cozinha - Comandas"}),(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf flex items-center gap-4",children:[(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf flex items-center",children:[(0,a.jsx)("input",{type:"checkbox",id:"autoPrint",checked:f,onChange:e=>u(e.target.checked),className:"jsx-d78c3cfc0260badf mr-2 h-4 w-4"}),(0,a.jsx)("label",{htmlFor:"autoPrint",className:"jsx-d78c3cfc0260badf text-sm font-medium",children:"Impress\xe3o autom\xe1tica"})]}),(0,a.jsxs)("button",{onClick:O,className:"jsx-d78c3cfc0260badf inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300",children:[(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",className:"jsx-d78c3cfc0260badf h-5 w-5 mr-1",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",className:"jsx-d78c3cfc0260badf"})}),"Atualizar"]})]})]}),s?(0,a.jsx)("div",{className:"jsx-d78c3cfc0260badf flex justify-center p-12",children:(0,a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",className:"jsx-d78c3cfc0260badf animate-spin h-8 w-8 text-primary",children:[(0,a.jsx)("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",className:"jsx-d78c3cfc0260badf opacity-25"}),(0,a.jsx)("path",{fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",className:"jsx-d78c3cfc0260badf opacity-75"})]})}):0===e.length?(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf bg-white rounded-xl shadow-md p-8 text-center",children:[(0,a.jsx)("div",{className:"jsx-d78c3cfc0260badf flex justify-center mb-4",children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",className:"jsx-d78c3cfc0260badf h-16 w-16 text-gray-300",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",className:"jsx-d78c3cfc0260badf"})})}),(0,a.jsx)("h2",{className:"jsx-d78c3cfc0260badf text-xl font-semibold mb-2",children:"Nenhum pedido para cozinha"}),(0,a.jsx)("p",{className:"jsx-d78c3cfc0260badf text-gray-500",children:"N\xe3o h\xe1 pedidos pendentes ou em preparo no momento."})]}):(0,a.jsx)("div",{className:"jsx-d78c3cfc0260badf grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:e.map(e=>(0,a.jsx)("div",{className:"jsx-d78c3cfc0260badf "+"bg-white rounded-xl shadow-md overflow-hidden ".concat(p===e.id?"ring-2 ring-green-500":""," ").concat("pendente"===e.status?"border-l-4 border-yellow-500":"confirmado"===e.status?"border-l-4 border-blue-500":"border-l-4 border-indigo-500"),children:(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf p-4",children:[(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf flex justify-between items-center mb-3",children:[(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf",children:[(0,a.jsxs)("span",{className:"jsx-d78c3cfc0260badf font-medium text-gray-600",children:["#",e.id.slice(0,8)]}),(0,a.jsx)("span",{className:"jsx-d78c3cfc0260badf "+"ml-2 px-2 py-0.5 text-xs font-medium rounded-full ".concat("pendente"===e.status?"bg-yellow-100 text-yellow-800":"confirmado"===e.status?"bg-blue-100 text-blue-800":"bg-indigo-100 text-indigo-800"),children:"pendente"===e.status?"Pendente":"confirmado"===e.status?"Confirmado":"Em Preparo"})]}),(0,a.jsx)("span",{className:"jsx-d78c3cfc0260badf text-sm text-gray-500",children:D(e.created_at)})]}),(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf mb-3",children:[(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf text-sm",children:[(0,a.jsx)("span",{className:"jsx-d78c3cfc0260badf font-medium",children:"Cliente:"})," ",e.customer_name]}),(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf text-sm",children:[(0,a.jsx)("span",{className:"jsx-d78c3cfc0260badf font-medium",children:"Telefone:"})," ",e.customer_phone]})]}),(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf border-t border-b border-gray-100 py-3 my-3",children:[(0,a.jsx)("h3",{className:"jsx-d78c3cfc0260badf font-medium mb-2",children:"Itens:"}),(0,a.jsx)("ul",{className:"jsx-d78c3cfc0260badf space-y-1",children:e.items.map(e=>(0,a.jsxs)("li",{className:"jsx-d78c3cfc0260badf flex justify-between text-sm",children:[(0,a.jsxs)("span",{className:"jsx-d78c3cfc0260badf",children:[(0,a.jsxs)("span",{className:"jsx-d78c3cfc0260badf font-medium",children:[e.quantity,"x"]})," ",e.product_name]}),(0,a.jsx)("span",{className:"jsx-d78c3cfc0260badf",children:(0,n.xG)(e.unit_price*e.quantity)})]},e.id))})]}),e.observations&&(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf mb-3 text-sm",children:[(0,a.jsx)("span",{className:"jsx-d78c3cfc0260badf font-medium",children:"Observa\xe7\xf5es:"}),(0,a.jsx)("p",{className:"jsx-d78c3cfc0260badf text-gray-700 italic mt-1",children:e.observations})]}),(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf flex justify-between items-center",children:[(0,a.jsxs)("div",{className:"jsx-d78c3cfc0260badf flex space-x-1",children:["pendente"===e.status&&(0,a.jsx)("button",{onClick:()=>E(e.id,"confirmado"),className:"jsx-d78c3cfc0260badf px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600",children:"Confirmar"}),("pendente"===e.status||"confirmado"===e.status)&&(0,a.jsx)("button",{onClick:()=>E(e.id,"em_preparo"),className:"jsx-d78c3cfc0260badf px-3 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600",children:"Em Preparo"}),"em_preparo"===e.status&&(0,a.jsx)("button",{onClick:()=>E(e.id,"a_caminho"),className:"jsx-d78c3cfc0260badf px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600",children:"Pronto"})]}),(0,a.jsxs)("button",{onClick:M(e.id),className:"jsx-d78c3cfc0260badf px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-900 flex items-center",children:[(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",className:"jsx-d78c3cfc0260badf h-4 w-4 mr-1",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z",className:"jsx-d78c3cfc0260badf"})}),"Imprimir"]})]})]})},e.id))})]})]})}},7823:function(e,t,s){"use strict";s.d(t,{OQ:function(){return c}});var a=s(4756);let c=(0,a.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},345:function(e,t,s){"use strict";s.d(t,{Ix:function(){return d},WF:function(){return c},aF:function(){return i},xG:function(){return r}});var a=s(7823);let c="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMTlUMTM6Mzc6MTQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0xOVQxMzozNzoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f+lkGAAAALRJREFUeJzt0cENwDAIADFE0/0H6yhkgHug57OzKmk7M9sB3LXeCeyZkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDg/nxMKXAp7CKEAAAAASUVORK5CYII=";function r(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function i(e,t){return e.length<=t?e:e.slice(0,t)+"..."}async function d(e,t,s){try{let c="".concat(Date.now(),"_").concat(e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/--+/g,"-").trim()),r=s?"".concat(s,"/").concat(c):c,{data:i,error:d}=await a.OQ.storage.from(t).upload(r,e,{cacheControl:"3600",upsert:!1});if(d)throw d;let{data:n}=a.OQ.storage.from(t).getPublicUrl(r);return n.publicUrl}catch(e){return console.error("Erro ao fazer upload da imagem:",e),console.warn("Usando imagem placeholder como fallback"),c}}},5925:function(e,t,s){"use strict";let a,c;s.d(t,{x7:function(){return em},ZP:function(){return ef},Am:function(){return R}});var r,i=s(2265);let d={data:""},n=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||d,o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,f=(e,t)=>{let s="",a="",c="";for(let r in e){let i=e[r];"@"==r[0]?"i"==r[1]?s=r+" "+i+";":a+="f"==r[1]?f(i,r):r+"{"+f(i,"k"==r[1]?"":t)+"}":"object"==typeof i?a+=f(i,t?t.replace(/([^,])+/g,e=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):r):null!=i&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),c+=f.p?f.p(r,i):r+":"+i+";")}return s+(t&&c?t+"{"+c+"}":c)+a},u={},p=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+p(e[s]);return t}return e},x=(e,t,s,a,c)=>{var r;let i=p(e),d=u[i]||(u[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!u[d]){let t=i!==e?e:(e=>{let t,s,a=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?a.shift():t[3]?(s=t[3].replace(m," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(m," ").trim();return a[0]})(e);u[d]=f(c?{["@keyframes "+d]:t}:t,s?"":"."+d)}let n=s&&u.g?u.g:null;return s&&(u.g=u[d]),r=u[d],n?t.data=t.data.replace(n,r):-1===t.data.indexOf(r)&&(t.data=a?r+t.data:t.data+r),d},b=(e,t,s)=>e.reduce((e,a,c)=>{let r=t[c];if(r&&r.call){let e=r(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;r=t?"."+t:e&&"object"==typeof e?e.props?"":f(e,""):!1===e?"":e}return e+a+(null==r?"":r)},"");function h(e){let t=this||{},s=e.call?e(t.p):e;return x(s.unshift?s.raw?b(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,n(t.target),t.g,t.o,t.k)}h.bind({g:1});let j,g,y,v=h.bind({k:1});function N(e,t){let s=this||{};return function(){let a=arguments;function c(r,i){let d=Object.assign({},r),n=d.className||c.className;s.p=Object.assign({theme:g&&g()},d),s.o=/ *go\d+/.test(n),d.className=h.apply(s,a)+(n?" "+n:""),t&&(d.ref=i);let o=e;return e[0]&&(o=d.as||e,delete d.as),y&&o[0]&&y(d),j(o,d)}return t?t(c):c}}var w=e=>"function"==typeof e,A=(e,t)=>w(e)?e(t):e,I=(a=0,()=>(++a).toString()),k=()=>{if(void 0===c&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");c=!e||e.matches}return c},O=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return O(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let c=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+c}))}}},E=[],C={toasts:[],pausedAt:void 0},S=e=>{C=O(C,e),E.forEach(e=>{e(C)})},M={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=(e={})=>{let[t,s]=(0,i.useState)(C),a=(0,i.useRef)(C);(0,i.useEffect)(()=>(a.current!==C&&s(C),E.push(s),()=>{let e=E.indexOf(s);e>-1&&E.splice(e,1)}),[]);let c=t.toasts.map(t=>{var s,a,c;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||M[t.type],style:{...e.style,...null==(c=e[t.type])?void 0:c.style,...t.style}}});return{...t,toasts:c}},Y=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||I()}),z=e=>(t,s)=>{let a=Y(t,e,s);return S({type:2,toast:a}),a.id},R=(e,t)=>z("blank")(e,t);R.error=z("error"),R.success=z("success"),R.loading=z("loading"),R.custom=z("custom"),R.dismiss=e=>{S({type:3,toastId:e})},R.remove=e=>S({type:4,toastId:e}),R.promise=(e,t,s)=>{let a=R.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let c=t.success?A(t.success,e):void 0;return c?R.success(c,{id:a,...s,...null==s?void 0:s.success}):R.dismiss(a),e}).catch(e=>{let c=t.error?A(t.error,e):void 0;c?R.error(c,{id:a,...s,...null==s?void 0:s.error}):R.dismiss(a)}),e};var L=(e,t)=>{S({type:1,toast:{id:e,height:t}})},_=()=>{S({type:5,time:Date.now()})},Z=new Map,G=1e3,T=(e,t=G)=>{if(Z.has(e))return;let s=setTimeout(()=>{Z.delete(e),S({type:4,toastId:e})},t);Z.set(e,s)},W=e=>{let{toasts:t,pausedAt:s}=D(e);(0,i.useEffect)(()=>{if(s)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let s=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(s<0){t.visible&&R.dismiss(t.id);return}return setTimeout(()=>R.dismiss(t.id),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,s]);let a=(0,i.useCallback)(()=>{s&&S({type:6,time:Date.now()})},[s]),c=(0,i.useCallback)((e,s)=>{let{reverseOrder:a=!1,gutter:c=8,defaultPosition:r}=s||{},i=t.filter(t=>(t.position||r)===(e.position||r)&&t.height),d=i.findIndex(t=>t.id===e.id),n=i.filter((e,t)=>t<d&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+c,0)},[t]);return(0,i.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)T(e.id,e.removeDelay);else{let t=Z.get(e.id);t&&(clearTimeout(t),Z.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:L,startPause:_,endPause:a,calculateOffset:c}}},J=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,P=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Q=N("div")`
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
    animation: ${P} 0.15s ease-out forwards;
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
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,U=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,H=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${U} 1s linear infinite;
`,X=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=v`
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
}`,V=N("div")`
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
    animation: ${F} 0.2s ease-out forwards;
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
`,$=N("div")`
  position: absolute;
`,K=N("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,q=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=N("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(ee,null,t):t:"blank"===s?null:i.createElement(K,null,i.createElement(H,{...a}),"loading"!==s&&i.createElement($,null,"error"===s?i.createElement(Q,{...a}):i.createElement(V,{...a})))},es=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ec=N("div")`
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
`,er=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let s=e.includes("top")?1:-1,[a,c]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(s),ea(s)];return{animation:t?`${v(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(c)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ed=i.memo(({toast:e,position:t,style:s,children:a})=>{let c=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},r=i.createElement(et,{toast:e}),d=i.createElement(er,{...e.ariaProps},A(e.message,e));return i.createElement(ec,{className:e.className,style:{...c,...s,...e.style}},"function"==typeof a?a({icon:r,message:d}):i.createElement(i.Fragment,null,r,d))});r=i.createElement,f.p=void 0,j=r,g=void 0,y=void 0;var en=({id:e,className:t,style:s,onHeightUpdate:a,children:c})=>{let r=i.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return i.createElement("div",{ref:r,className:t,style:s},c)},eo=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},el=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:c,containerStyle:r,containerClassName:d})=>{let{toasts:n,handlers:o}=W(s);return i.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...r},className:d,onMouseEnter:o.startPause,onMouseLeave:o.endPause},n.map(s=>{let r=s.position||t,d=eo(r,o.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return i.createElement(en,{id:s.id,key:s.id,onHeightUpdate:o.updateHeight,className:s.visible?el:"",style:d},"custom"===s.type?A(s.message,s):c?c(s):i.createElement(ed,{toast:s,position:r}))}))},ef=R}},function(e){e.O(0,[36,738,971,472,744],function(){return e(e.s=2075)}),_N_E=e.O()}]);