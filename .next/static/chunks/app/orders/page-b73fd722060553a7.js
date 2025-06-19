(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[569],{713:function(e,t,r){Promise.resolve().then(r.bind(r,6555))},6555:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return c}});var s=r(7437),a=r(2265),i=r(1396),o=r.n(i),n=r(345),l=r(5925);function c(){let[e,t]=(0,a.useState)([]),[r,i]=(0,a.useState)(!0),[c,d]=(0,a.useState)(null),[m,u]=(0,a.useState)({});(0,a.useEffect)(()=>{p()},[]);let p=async()=>{try{i(!0);let e=await fetch("/api/orders");if(!e.ok)throw Error("Falha ao carregar pedidos");let r=await e.json();t(r)}catch(e){console.error("Erro ao carregar pedidos:",e),l.Am.error("N\xe3o foi poss\xedvel carregar seus pedidos")}finally{i(!1)}},h=async e=>{try{let t=await fetch("/api/orders/".concat(e,"/items"));if(!t.ok)throw Error("Falha ao carregar itens do pedido");let r=await t.json();u(t=>({...t,[e]:r}))}catch(e){console.error("Erro ao carregar itens do pedido:",e),l.Am.error("N\xe3o foi poss\xedvel carregar os detalhes deste pedido")}},x=async e=>{if(c===e){d(null);return}d(e),m[e]||await h(e)},f=e=>{let t=new Date(e);return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(t)},g=e=>({pendente:{label:"Pendente",color:"bg-yellow-100 text-yellow-800"},confirmado:{label:"Confirmado",color:"bg-blue-100 text-blue-800"},em_preparo:{label:"Em preparo",color:"bg-indigo-100 text-indigo-800"},a_caminho:{label:"A caminho",color:"bg-purple-100 text-purple-800"},entregue:{label:"Entregue",color:"bg-green-100 text-green-800"},cancelado:{label:"Cancelado",color:"bg-red-100 text-red-800"}})[e]||{label:e,color:"bg-gray-100 text-gray-800"};return(0,s.jsxs)("div",{className:"min-h-screen bg-gray-50 pb-24 md:pb-8",children:[(0,s.jsx)("header",{className:"bg-white shadow-sm sticky top-0 z-30",children:(0,s.jsxs)("div",{className:"w-full px-4 py-4 flex items-center",children:[(0,s.jsx)(o(),{href:"/",className:"text-gray-600 mr-4",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 19l-7-7m0 0l7-7m-7 7h18"})})}),(0,s.jsx)("h1",{className:"text-xl font-bold",children:"Meus Pedidos"})]})}),(0,s.jsx)("div",{className:"w-full px-4 py-6",children:r?(0,s.jsx)("div",{className:"flex justify-center p-12",children:(0,s.jsxs)("svg",{className:"animate-spin h-8 w-8 text-primary",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,s.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,s.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})}):0===e.length?(0,s.jsxs)("div",{className:"bg-white rounded-xl shadow-sm p-6 text-center",children:[(0,s.jsx)("div",{className:"flex justify-center mb-4",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-16 w-16 text-gray-300",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"})})}),(0,s.jsx)("h2",{className:"text-lg font-semibold mb-2",children:"Nenhum pedido realizado"}),(0,s.jsx)("p",{className:"text-gray-500 mb-6",children:"Voc\xea ainda n\xe3o realizou nenhum pedido."}),(0,s.jsx)(o(),{href:"/",className:"inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors",children:"Fazer meu primeiro pedido"})]}):(0,s.jsx)("div",{className:"space-y-4",children:e.map(e=>(0,s.jsxs)("div",{className:"bg-white rounded-xl shadow-sm overflow-hidden",children:[(0,s.jsxs)("div",{className:"p-4 cursor-pointer hover:bg-gray-50 transition-colors",onClick:()=>x(e.id),children:[(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsxs)("span",{className:"font-medium text-gray-700",children:["#",e.id.slice(0,8)]}),(0,s.jsx)("span",{className:"text-sm text-gray-500",children:f(e.created_at)})]}),(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"px-3 py-1 rounded-full text-xs font-medium ".concat(g(e.status).color),children:g(e.status).label}),(0,s.jsx)("span",{className:"font-bold text-primary",children:(0,n.xG)(e.total)})]})]}),(0,s.jsxs)("div",{className:"flex justify-between items-center mt-2",children:[(0,s.jsxs)("div",{className:"text-sm text-gray-500",children:[e.customer_name,e.payment_method&&(0,s.jsx)("span",{className:"ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs",children:e.payment_method.toUpperCase()})]}),(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-gray-400 transition-transform duration-200 ".concat(c===e.id?"transform rotate-180":""),fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})]})]}),c===e.id&&(0,s.jsxs)("div",{className:"border-t border-gray-100 p-4 bg-gray-50",children:[(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"font-medium text-sm text-gray-500 mb-1",children:"Dados do Cliente"}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"font-medium",children:"Nome:"})," ",e.customer_name]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"font-medium",children:"Telefone:"})," ",e.customer_phone]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"font-medium",children:"Endere\xe7o:"})," ",e.delivery_address||"N\xe3o informado"]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"font-medium text-sm text-gray-500 mb-1",children:"Dados do Pedido"}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"font-medium",children:"ID:"})," ",e.id]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"font-medium",children:"Data:"})," ",f(e.created_at)]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"font-medium",children:"Pagamento:"})," ",e.payment_method]})]})]}),e.observations&&(0,s.jsxs)("div",{className:"mt-3",children:[(0,s.jsx)("h3",{className:"font-medium text-sm text-gray-500 mb-1",children:"Observa\xe7\xf5es"}),(0,s.jsx)("p",{className:"bg-white p-2 rounded border border-gray-100",children:e.observations})]}),(0,s.jsxs)("div",{className:"mt-4",children:[(0,s.jsx)("h3",{className:"font-medium text-sm text-gray-500 mb-2",children:"Itens do Pedido"}),m[e.id]?(0,s.jsxs)("ul",{className:"divide-y divide-gray-100 bg-white rounded-lg overflow-hidden border border-gray-100",children:[m[e.id].map(e=>(0,s.jsxs)("li",{className:"px-3 py-2 flex justify-between items-center",children:[(0,s.jsxs)("div",{children:[(0,s.jsxs)("span",{className:"font-medium",children:[e.quantity,"x"]})," ",e.product_name]}),(0,s.jsx)("div",{className:"font-medium",children:(0,n.xG)(e.unit_price*e.quantity)})]},e.id)),(0,s.jsxs)("li",{className:"px-3 py-2 flex justify-between items-center bg-gray-50",children:[(0,s.jsx)("span",{className:"font-bold",children:"Total"}),(0,s.jsx)("span",{className:"font-bold text-primary",children:(0,n.xG)(e.total)})]})]}):(0,s.jsx)("div",{className:"flex justify-center p-4",children:(0,s.jsxs)("svg",{className:"animate-spin h-5 w-5 text-primary",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,s.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,s.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})})]}),(0,s.jsx)("div",{className:"mt-4 flex justify-end",children:(0,s.jsxs)("button",{onClick:()=>{let t="Ol\xe1! Gostaria de informa\xe7\xf5es sobre meu pedido #".concat(e.id.slice(0,8)),r="https://wa.me/".concat("5517999754390","?text=").concat(encodeURIComponent(t));window.open(r,"_blank")},className:"inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-2",fill:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{d:"M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"})}),"Contato via WhatsApp"]})})]})]},e.id))})}),(0,s.jsx)("div",{className:"fixed bottom-0 w-full bg-white z-20 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.1)]",children:(0,s.jsxs)("div",{className:"flex items-center justify-around",children:[(0,s.jsxs)(o(),{href:"/",className:"flex flex-col items-center justify-center py-3 flex-1 text-gray-500",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2"})}),(0,s.jsx)("span",{className:"text-xs font-medium mt-1",children:"In\xedcio"})]}),(0,s.jsxs)(o(),{href:"/cart",className:"flex flex-col items-center justify-center py-3 flex-1 text-gray-500",children:[(0,s.jsx)("div",{className:"relative",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})})}),(0,s.jsx)("span",{className:"text-xs font-medium mt-1",children:"Carrinho"})]}),(0,s.jsxs)(o(),{href:"/orders",className:"flex flex-col items-center justify-center py-3 flex-1 text-primary",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),(0,s.jsx)("span",{className:"text-xs font-medium mt-1",children:"Pedidos"})]})]})})]})}},7823:function(e,t,r){"use strict";r.d(t,{OQ:function(){return a}});var s=r(4756);let a=(0,s.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},345:function(e,t,r){"use strict";r.d(t,{Ix:function(){return n},P0:function(){return m},Vx:function(){return c},WF:function(){return a},_n:function(){return u},_z:function(){return d},aF:function(){return o},xG:function(){return i}});var s=r(7823);let a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMTlUMTM6Mzc6MTQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0xOVQxMzozNzoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f+lkGAAAALRJREFUeJzt0cENwDAIADFE0/0H6yhkgHug57OzKmk7M9sB3LXeCeyZkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDg/nxMKXAp7CKEAAAAASUVORK5CYII=";function i(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function o(e,t){return e.length<=t?e:e.slice(0,t)+"..."}async function n(e,t,r){try{let a="".concat(Date.now(),"_").concat(e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/--+/g,"-").trim()),i=r?"".concat(r,"/").concat(a):a,{data:o,error:n}=await s.OQ.storage.from(t).upload(i,e,{cacheControl:"3600",upsert:!1});if(n)throw n;let{data:l}=s.OQ.storage.from(t).getPublicUrl(i);return l.publicUrl}catch(e){return console.error("Erro ao fazer upload da imagem:",e),console.warn("Usando imagem placeholder como fallback"),a}}let l={0:"sunday",1:"monday",2:"tuesday",3:"wednesday",4:"thursday",5:"friday",6:"saturday"},c=e=>{let t=new Date,r=t.getDay(),s=t.toTimeString().slice(0,5),a=l[r],i=e[a];if(!i||""===i.trim())return!1;let o=i.split("-");if(2!==o.length)return!1;let[n,c]=o.map(e=>e.trim());return c<n?s>=n||s<=c:s>=n&&s<=c},d=e=>{let t=new Date,r=t.getDay(),s=t.toTimeString().slice(0,5),a=l[r],i=e[a];return{shouldBeOpen:c(e),currentTime:s,todayHours:i,dayOfWeek:a,timestamp:t}},m=e=>{let t=new Date,r=t.getDay(),s=l[r],a=e[s];return a&&""!==a.trim()?"Hoje: ".concat(a):"Fechado hoje"},u=e=>{let t=d(e);if(t.shouldBeOpen)return null;let r=new Date,s=r.getDay(),a=l[s],i=e[a];if(i&&""!==i.trim()){let[e]=i.split("-").map(e=>e.trim()),t=r.toTimeString().slice(0,5);if(t<e)return"Abre hoje \xe0s ".concat(e)}for(let t=1;t<=7;t++){let r=(s+t)%7,a=l[r],i=e[a];if(i&&""!==i.trim()){let[e]=i.split("-").map(e=>e.trim()),r={monday:"segunda-feira",tuesday:"ter\xe7a-feira",wednesday:"quarta-feira",thursday:"quinta-feira",friday:"sexta-feira",saturday:"s\xe1bado",sunday:"domingo"},s=r[a];return"Abre ".concat(1===t?"amanh\xe3":s," \xe0s ").concat(e)}}return"Hor\xe1rios n\xe3o definidos"}},5925:function(e,t,r){"use strict";let s,a;r.d(t,{x7:function(){return em},ZP:function(){return eu},Am:function(){return W}});var i,o=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,u=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?u(o,i):i+"{"+u(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=u(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=u.p?u.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},p={},h=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+h(e[r]);return t}return e},x=(e,t,r,s,a)=>{var i;let o=h(e),n=p[o]||(p[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!p[n]){let t=o!==e?e:(e=>{let t,r,s=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?s.shift():t[3]?(r=t[3].replace(m," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(m," ").trim();return s[0]})(e);p[n]=u(a?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&p.g?p.g:null;return r&&(p.g=p[n]),i=p[n],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),n},f=(e,t,r)=>e.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function g(e){let t=this||{},r=e.call?e(t.p):e;return x(r.unshift?r.raw?f(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}g.bind({g:1});let y,b,w,j=g.bind({k:1});function v(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;r.p=Object.assign({theme:b&&b()},n),r.o=/ *go\d+/.test(l),n.className=g.apply(r,s)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),w&&c[0]&&w(n),y(c,n)}return t?t(a):a}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,A=(s=0,()=>(++s).toString()),I=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},M=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return M(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},E=[],O={toasts:[],pausedAt:void 0},z=e=>{O=M(O,e),E.forEach(e=>{e(O)})},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},C=(e={})=>{let[t,r]=(0,o.useState)(O),s=(0,o.useRef)(O);(0,o.useEffect)(()=>(s.current!==O&&r(O),E.push(r),()=>{let e=E.indexOf(r);e>-1&&E.splice(e,1)}),[]);let a=t.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...t,toasts:a}},L=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||A()}),Y=e=>(t,r)=>{let s=L(t,e,r);return z({type:2,toast:s}),s.id},W=(e,t)=>Y("blank")(e,t);W.error=Y("error"),W.success=Y("success"),W.loading=Y("loading"),W.custom=Y("custom"),W.dismiss=e=>{z({type:3,toastId:e})},W.remove=e=>z({type:4,toastId:e}),W.promise=(e,t,r)=>{let s=W.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?k(t.success,e):void 0;return a?W.success(a,{id:s,...r,...null==r?void 0:r.success}):W.dismiss(s),e}).catch(e=>{let a=t.error?k(t.error,e):void 0;a?W.error(a,{id:s,...r,...null==r?void 0:r.error}):W.dismiss(s)}),e};var G=(e,t)=>{z({type:1,toast:{id:e,height:t}})},R=()=>{z({type:5,time:Date.now()})},Z=new Map,S=1e3,T=(e,t=S)=>{if(Z.has(e))return;let r=setTimeout(()=>{Z.delete(e),z({type:4,toastId:e})},t);Z.set(e,r)},J=e=>{let{toasts:t,pausedAt:r}=C(e);(0,o.useEffect)(()=>{if(r)return;let e=Date.now(),s=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&W.dismiss(t.id);return}return setTimeout(()=>W.dismiss(t.id),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[t,r]);let s=(0,o.useCallback)(()=>{r&&z({type:6,time:Date.now()})},[r]),a=(0,o.useCallback)((e,r)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=r||{},o=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[t]);return(0,o.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)T(e.id,e.removeDelay);else{let t=Z.get(e.id);t&&(clearTimeout(t),Z.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:G,startPause:R,endPause:s,calculateOffset:a}}},B=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,P=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,H=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${U} 0.15s ease-out forwards;
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
`,F=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Q} 1s linear infinite;
`,X=j`
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
}`,_=v("div")`
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
`,$=v("div")`
  position: absolute;
`,K=v("div")`
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
}`,ee=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?o.createElement(ee,null,t):t:"blank"===r?null:o.createElement(K,null,o.createElement(F,{...s}),"loading"!==r&&o.createElement($,null,"error"===r?o.createElement(H,{...s}):o.createElement(_,{...s})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=v("div")`
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
`,ei=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let r=e.includes("top")?1:-1,[s,a]=I()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),es(r)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=o.memo(({toast:e,position:t,style:r,children:s})=>{let a=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=o.createElement(et,{toast:e}),n=o.createElement(ei,{...e.ariaProps},k(e.message,e));return o.createElement(ea,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof s?s({icon:i,message:n}):o.createElement(o.Fragment,null,i,n))});i=o.createElement,u.p=void 0,y=i,b=void 0,w=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:s,children:a})=>{let i=o.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return o.createElement("div",{ref:i,className:t,style:r},a)},ec=(e,t)=>{let r=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:I()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...s}},ed=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:a,containerStyle:i,containerClassName:n})=>{let{toasts:l,handlers:c}=J(r);return o.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let i=r.position||t,n=ec(i,c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}));return o.createElement(el,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?ed:"",style:n},"custom"===r.type?k(r.message,r):a?a(r):o.createElement(en,{toast:r,position:i}))}))},eu=W}},function(e){e.O(0,[36,847,971,472,744],function(){return e(e.s=713)}),_N_E=e.O()}]);