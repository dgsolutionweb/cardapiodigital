(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[713],{6458:function(e,t,a){Promise.resolve().then(a.bind(a,7249))},7249:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return l}});var r=a(7437),s=a(2265),i=a(7823),n=a(345),o=a(5925);function l(){let[e,t]=(0,s.useState)([]),[a,l]=(0,s.useState)(null),[c,d]=(0,s.useState)(!0),[m,u]=(0,s.useState)(!1);(0,s.useEffect)(()=>{p();let e=i.OQ.channel("public:orders").on("postgres_changes",{event:"*",schema:"public",table:"orders"},()=>{p()}).subscribe();return()=>{e.unsubscribe()}},[]);let p=async()=>{try{d(!0);let{data:e,error:a}=await i.OQ.from("orders").select("*").order("created_at",{ascending:!1});if(a)throw a;let r=[];if(e){for(let t of e){let{data:e,error:a}=await i.OQ.from("order_items").select("\n              id,\n              quantity,\n              unit_price,\n              variation_name,\n              extras_info,\n              products (id, name)\n            ").eq("order_id",t.id);if(a)throw a;let s=(null==e?void 0:e.map(e=>({id:e.id,product_name:e.products.name,quantity:e.quantity,unit_price:e.unit_price,variation_name:e.variation_name||void 0,extras_info:e.extras_info||void 0})))||[];r.push({...t,items:s})}t(r)}}catch(e){console.error("Erro ao buscar pedidos:",e),o.ZP.error("Erro ao carregar os pedidos")}finally{d(!1)}},h=async(e,t)=>{try{let{error:a}=await i.OQ.from("orders").update({status:t,updated_at:new Date().toISOString()}).eq("id",e);if(a)throw a;o.ZP.success("Status atualizado para: ".concat(t))}catch(e){console.error("Erro ao atualizar status:",e),o.ZP.error(e.message||"Erro ao atualizar status")}},x=e=>{l(e),u(!0)};return(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"flex justify-between items-center mb-6",children:(0,r.jsx)("h1",{className:"text-3xl font-bold",children:"Pedidos"})}),c?(0,r.jsx)("div",{className:"flex justify-center",children:(0,r.jsx)("div",{className:"animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"})}):0===e.length?(0,r.jsx)("div",{className:"bg-white rounded-lg shadow-md p-6 text-center",children:(0,r.jsx)("p",{className:"text-gray-500 mb-4",children:"Nenhum pedido encontrado"})}):(0,r.jsx)("div",{className:"bg-white rounded-lg shadow-md overflow-hidden",children:(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"w-full text-left",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{className:"bg-gray-50 border-b",children:[(0,r.jsx)("th",{className:"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Cliente"}),(0,r.jsx)("th",{className:"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Valor"}),(0,r.jsx)("th",{className:"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),(0,r.jsx)("th",{className:"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Data"}),(0,r.jsx)("th",{className:"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",children:"A\xe7\xf5es"})]})}),(0,r.jsx)("tbody",{className:"divide-y divide-gray-200",children:e.map(e=>(0,r.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,r.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap",children:[(0,r.jsx)("div",{className:"font-medium",children:e.customer_name}),(0,r.jsx)("div",{className:"text-sm text-gray-500",children:e.customer_phone})]}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap font-medium",children:(0,n.xG)(e.total)}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,r.jsxs)("select",{value:e.status,onChange:t=>h(e.id,t.target.value),className:"px-2 py-1 border border-gray-300 rounded text-sm",children:[(0,r.jsx)("option",{value:"pendente",children:"Pendente"}),(0,r.jsx)("option",{value:"confirmado",children:"Confirmado"}),(0,r.jsx)("option",{value:"em_preparo",children:"Em Preparo"}),(0,r.jsx)("option",{value:"a_caminho",children:"A caminho"}),(0,r.jsx)("option",{value:"entregue",children:"Entregue"}),(0,r.jsx)("option",{value:"cancelado",children:"Cancelado"})]})}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500",children:new Date(e.created_at).toLocaleString("pt-BR")}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:(0,r.jsx)("button",{onClick:()=>x(e),className:"text-blue-600 hover:text-blue-900",children:"Detalhes"})})]},e.id))})]})})}),m&&a&&(0,r.jsx)("div",{className:"fixed inset-0 bg-black/50 flex items-center justify-center z-50",children:(0,r.jsx)("div",{className:"bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto",children:(0,r.jsxs)("div",{className:"p-6",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,r.jsx)("h2",{className:"text-xl font-bold",children:"Detalhes do Pedido"}),(0,r.jsxs)("button",{onClick:()=>u(!1),className:"text-gray-500 hover:text-gray-800",children:[(0,r.jsx)("span",{className:"sr-only",children:"Fechar"}),(0,r.jsx)("svg",{className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})]})]}),(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-4 mb-6",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"text-sm text-gray-500",children:"Cliente"}),(0,r.jsx)("p",{className:"font-medium",children:a.customer_name})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"text-sm text-gray-500",children:"Telefone"}),(0,r.jsx)("p",{className:"font-medium",children:a.customer_phone})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"text-sm text-gray-500",children:"Data"}),(0,r.jsx)("p",{className:"font-medium",children:new Date(a.created_at).toLocaleString("pt-BR")})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"text-sm text-gray-500",children:"Status"}),(0,r.jsx)("p",{className:"font-medium capitalize",children:a.status})]})]}),(0,r.jsxs)("div",{className:"mb-6",children:[(0,r.jsx)("h3",{className:"text-lg font-medium mb-2",children:"Itens do Pedido"}),(0,r.jsx)("div",{className:"border rounded-lg overflow-hidden",children:(0,r.jsxs)("table",{className:"w-full text-left",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{className:"bg-gray-50 border-b",children:[(0,r.jsx)("th",{className:"px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Produto"}),(0,r.jsx)("th",{className:"px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Qtd"}),(0,r.jsx)("th",{className:"px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Pre\xe7o Unit."}),(0,r.jsx)("th",{className:"px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-right",children:"Subtotal"})]})}),(0,r.jsx)("tbody",{className:"divide-y divide-gray-200",children:a.items.map(e=>(0,r.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,r.jsxs)("td",{className:"px-4 py-2",children:[(0,r.jsx)("div",{className:"font-medium",children:e.product_name}),e.variation_name&&(0,r.jsxs)("div",{className:"text-xs text-gray-600 mt-1",children:[(0,r.jsx)("span",{className:"font-medium",children:"Varia\xe7\xe3o:"})," ",e.variation_name]}),e.extras_info&&(0,r.jsxs)("div",{className:"text-xs text-gray-600 mt-1",children:[(0,r.jsx)("span",{className:"font-medium",children:"Adicionais:"})," ",e.extras_info]})]}),(0,r.jsx)("td",{className:"px-4 py-2 whitespace-nowrap",children:e.quantity}),(0,r.jsx)("td",{className:"px-4 py-2 whitespace-nowrap",children:(0,n.xG)(e.unit_price)}),(0,r.jsx)("td",{className:"px-4 py-2 whitespace-nowrap text-right",children:(0,n.xG)(e.quantity*e.unit_price)})]},e.id))}),(0,r.jsx)("tfoot",{children:(0,r.jsxs)("tr",{className:"bg-gray-50",children:[(0,r.jsx)("td",{colSpan:3,className:"px-4 py-2 text-right font-bold",children:"Total:"}),(0,r.jsx)("td",{className:"px-4 py-2 text-right font-bold",children:(0,n.xG)(a.total)})]})})]})})]}),(0,r.jsxs)("div",{className:"mt-6 flex justify-end space-x-2",children:[(0,r.jsx)("button",{onClick:()=>{h(a.id,"entregue"),u(!1)},className:"px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700",children:"Marcar como Entregue"}),(0,r.jsx)("button",{onClick:()=>u(!1),className:"px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300",children:"Fechar"})]})]})})})]})}},7823:function(e,t,a){"use strict";a.d(t,{OQ:function(){return s}});var r=a(4756);let s=(0,r.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},345:function(e,t,a){"use strict";a.d(t,{Ix:function(){return o},WF:function(){return s},aF:function(){return n},xG:function(){return i}});var r=a(7823);let s="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMTlUMTM6Mzc6MTQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0xOVQxMzozNzoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f+lkGAAAALRJREFUeJzt0cENwDAIADFE0/0H6yhkgHug57OzKmk7M9sB3LXeCeyZkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDg/nxMKXAp7CKEAAAAASUVORK5CYII=";function i(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function n(e,t){return e.length<=t?e:e.slice(0,t)+"..."}async function o(e,t,a){try{let s="".concat(Date.now(),"_").concat(e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/--+/g,"-").trim()),i=a?"".concat(a,"/").concat(s):s,{data:n,error:o}=await r.OQ.storage.from(t).upload(i,e,{cacheControl:"3600",upsert:!1});if(o)throw o;let{data:l}=r.OQ.storage.from(t).getPublicUrl(i);return l.publicUrl}catch(e){return console.error("Erro ao fazer upload da imagem:",e),console.warn("Usando imagem placeholder como fallback"),s}}},5925:function(e,t,a){"use strict";let r,s;a.d(t,{x7:function(){return em},ZP:function(){return eu},Am:function(){return C}});var i,n=a(2265);let o={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||o,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,u=(e,t)=>{let a="",r="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":r+="f"==i[1]?u(n,i):i+"{"+u(n,"k"==i[1]?"":t)+"}":"object"==typeof n?r+=u(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=u.p?u.p(i,n):i+":"+n+";")}return a+(t&&s?t+"{"+s+"}":s)+r},p={},h=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+h(e[a]);return t}return e},x=(e,t,a,r,s)=>{var i;let n=h(e),o=p[n]||(p[n]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(n));if(!p[o]){let t=n!==e?e:(e=>{let t,a,r=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?r.shift():t[3]?(a=t[3].replace(m," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(m," ").trim();return r[0]})(e);p[o]=u(s?{["@keyframes "+o]:t}:t,a?"":"."+o)}let l=a&&p.g?p.g:null;return a&&(p.g=p[o]),i=p[o],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),o},g=(e,t,a)=>e.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function f(e){let t=this||{},a=e.call?e(t.p):e;return x(a.unshift?a.raw?g(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,j,v=f.bind({k:1});function w(e,t){let a=this||{};return function(){let r=arguments;function s(i,n){let o=Object.assign({},i),l=o.className||s.className;a.p=Object.assign({theme:b&&b()},o),a.o=/ *go\d+/.test(l),o.className=f.apply(a,r)+(l?" "+l:""),t&&(o.ref=n);let c=e;return e[0]&&(c=o.as||e,delete o.as),j&&c[0]&&j(o),y(c,o)}return t?t(s):s}}var N=e=>"function"==typeof e,A=(e,t)=>N(e)?e(t):e,I=(r=0,()=>(++r).toString()),k=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},O=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return O(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},E=[],Y={toasts:[],pausedAt:void 0},M=e=>{Y=O(Y,e),E.forEach(e=>{e(Y)})},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=(e={})=>{let[t,a]=(0,n.useState)(Y),r=(0,n.useRef)(Y);(0,n.useEffect)(()=>(r.current!==Y&&a(Y),E.push(a),()=>{let e=E.indexOf(a);e>-1&&E.splice(e,1)}),[]);let s=t.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...t,toasts:s}},z=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||I()}),G=e=>(t,a)=>{let r=z(t,e,a);return M({type:2,toast:r}),r.id},C=(e,t)=>G("blank")(e,t);C.error=G("error"),C.success=G("success"),C.loading=G("loading"),C.custom=G("custom"),C.dismiss=e=>{M({type:3,toastId:e})},C.remove=e=>M({type:4,toastId:e}),C.promise=(e,t,a)=>{let r=C.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?A(t.success,e):void 0;return s?C.success(s,{id:r,...a,...null==a?void 0:a.success}):C.dismiss(r),e}).catch(e=>{let s=t.error?A(t.error,e):void 0;s?C.error(s,{id:r,...a,...null==a?void 0:a.error}):C.dismiss(r)}),e};var L=(e,t)=>{M({type:1,toast:{id:e,height:t}})},Z=()=>{M({type:5,time:Date.now()})},R=new Map,W=1e3,J=(e,t=W)=>{if(R.has(e))return;let a=setTimeout(()=>{R.delete(e),M({type:4,toastId:e})},t);R.set(e,a)},T=e=>{let{toasts:t,pausedAt:a}=S(e);(0,n.useEffect)(()=>{if(a)return;let e=Date.now(),r=t.map(t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(a<0){t.visible&&C.dismiss(t.id);return}return setTimeout(()=>C.dismiss(t.id),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[t,a]);let r=(0,n.useCallback)(()=>{a&&M({type:6,time:Date.now()})},[a]),s=(0,n.useCallback)((e,a)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:i}=a||{},n=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[t]);return(0,n.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)J(e.id,e.removeDelay);else{let t=R.get(e.id);t&&(clearTimeout(t),R.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:L,startPause:Z,endPause:r,calculateOffset:s}}},P=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,_=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Q=v`
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

  animation: ${P} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${_} 0.15s ease-out forwards;
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
`,B=v`
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
`,F=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,H=v`
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
}`,V=w("div")`
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
    animation: ${H} 0.2s ease-out forwards;
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
`,q=v`
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
`,et=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?n.createElement(ee,null,t):t:"blank"===a?null:n.createElement(K,null,n.createElement(X,{...r}),"loading"!==a&&n.createElement($,null,"error"===a?n.createElement(U,{...r}):n.createElement(V,{...r})))},ea=e=>`
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
`,ei=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let a=e.includes("top")?1:-1,[r,s]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(a),er(a)];return{animation:t?`${v(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=n.memo(({toast:e,position:t,style:a,children:r})=>{let s=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(et,{toast:e}),o=n.createElement(ei,{...e.ariaProps},A(e.message,e));return n.createElement(es,{className:e.className,style:{...s,...a,...e.style}},"function"==typeof r?r({icon:i,message:o}):n.createElement(n.Fragment,null,i,o))});i=n.createElement,u.p=void 0,y=i,b=void 0,j=void 0;var el=({id:e,className:t,style:a,onHeightUpdate:r,children:s})=>{let i=n.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return n.createElement("div",{ref:i,className:t,style:a},s)},ec=(e,t)=>{let a=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...r}},ed=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:s,containerStyle:i,containerClassName:o})=>{let{toasts:l,handlers:c}=T(a);return n.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(a=>{let i=a.position||t,o=ec(i,c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return n.createElement(el,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?ed:"",style:o},"custom"===a.type?A(a.message,a):s?s(a):n.createElement(eo,{toast:a,position:i}))}))},eu=C}},function(e){e.O(0,[36,971,472,744],function(){return e(e.s=6458)}),_N_E=e.O()}]);