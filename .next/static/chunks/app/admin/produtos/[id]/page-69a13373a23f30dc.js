(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[11],{2079:function(e,t,r){Promise.resolve().then(r.bind(r,5792))},5792:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return p}});var a=r(7437),i=r(2265),o=r(4033),s=r(1396),n=r.n(s),l=r(6691),d=r.n(l),c=r(7823),u=r(345),m=r(5925);function p(e){let{params:t}=e,r=(0,o.useRouter)(),{id:s}=t,[l,p]=(0,i.useState)([]),[g,f]=(0,i.useState)(""),[h,x]=(0,i.useState)(""),[b,y]=(0,i.useState)(""),[v,j]=(0,i.useState)(""),[N,w]=(0,i.useState)(null),[A,I]=(0,i.useState)(null),[k,O]=(0,i.useState)(null),[S,E]=(0,i.useState)(!0),[D,C]=(0,i.useState)(!1),[Z,Y]=(0,i.useState)(!0),[M,P]=(0,i.useState)(!1),[z,G]=(0,i.useState)(!1),[R,L]=(0,i.useState)([]),[W,_]=(0,i.useState)([]);(0,i.useEffect)(()=>{let e=async()=>{try{E(!0);let{data:e,error:t}=await c.OQ.from("categories").select("*").order("name");if(t)throw t;e&&p(e);let{data:r,error:a}=await c.OQ.from("products").select("*").eq("id",s).single();if(a)throw a;if(r&&(f(r.name),x(r.description||""),y(r.price.toString()),j(r.category_id),w(r.image_url),Y(r.active||!0),P(r.has_variations||!1),G(r.has_extras||!1)),null==r?void 0:r.has_variations){let{data:e,error:t}=await c.OQ.from("product_variations").select("*").eq("product_id",s).order("order_index");!t&&e&&L(e.map(e=>({id:e.id,name:e.name,price:e.price.toString(),order_index:e.order_index})))}if(null==r?void 0:r.has_extras){let{data:e,error:t}=await c.OQ.from("product_extras").select("*").eq("product_id",s).order("order_index");!t&&e&&_(e.map(e=>({id:e.id,name:e.name,price:e.price.toString(),order_index:e.order_index})))}}catch(e){console.error("Erro ao buscar dados:",e),m.ZP.error("Produto n\xe3o encontrado"),r.push("/admin/produtos")}finally{E(!1)}};e()},[s,r]);let F=(e,t,r)=>{let a=[...R];a[e]={...a[e],[t]:r},L(a)},T=e=>{let t=R.filter((t,r)=>r!==e);L(t.map((e,t)=>({...e,order_index:t})))},J=(e,t,r)=>{let a=[...W];a[e]={...a[e],[t]:r},_(a)},Q=e=>{let t=W.filter((t,r)=>r!==e);_(t.map((e,t)=>({...e,order_index:t})))},U=async e=>{if(e.preventDefault(),!g.trim())return m.ZP.error("O nome do produto \xe9 obrigat\xf3rio");if(!v)return m.ZP.error("Selecione uma categoria");if(!M&&(!b||isNaN(parseFloat(b))||0>=parseFloat(b)))return m.ZP.error("O pre\xe7o deve ser um valor v\xe1lido maior que zero");if(M){if(0===R.length)return m.ZP.error("Adicione pelo menos uma varia\xe7\xe3o");for(let e=0;e<R.length;e++){let t=R[e];if(!t.name.trim())return m.ZP.error("Nome da varia\xe7\xe3o ".concat(e+1," \xe9 obrigat\xf3rio"));if(!t.price||isNaN(parseFloat(t.price))||0>=parseFloat(t.price))return m.ZP.error("Pre\xe7o da varia\xe7\xe3o ".concat(e+1," deve ser v\xe1lido"))}}if(z)for(let e=0;e<W.length;e++){let t=W[e];if(!t.name.trim())return m.ZP.error("Nome do adicional ".concat(e+1," \xe9 obrigat\xf3rio"));if(!t.price||isNaN(parseFloat(t.price))||0>parseFloat(t.price))return m.ZP.error("Pre\xe7o do adicional ".concat(e+1," deve ser v\xe1lido"))}try{C(!0);let e=N;A&&(e=await (0,u.Ix)(A,"products","images"));let{error:t}=await c.OQ.from("products").update({name:g,description:h||null,price:M?0:parseFloat(b),image_url:e,category_id:v,active:Z,has_variations:M,has_extras:z,updated_at:new Date().toISOString()}).eq("id",s);if(t)throw t;if(M){if(await c.OQ.from("product_variations").delete().eq("product_id",s),R.length>0){let e=R.map(e=>({product_id:s,name:e.name,price:parseFloat(e.price),order_index:e.order_index})),{error:t}=await c.OQ.from("product_variations").insert(e);if(t)throw t}}else await c.OQ.from("product_variations").delete().eq("product_id",s);if(z){if(await c.OQ.from("product_extras").delete().eq("product_id",s),W.length>0){let e=W.map(e=>({product_id:s,name:e.name,price:parseFloat(e.price),order_index:e.order_index})),{error:t}=await c.OQ.from("product_extras").insert(e);if(t)throw t}}else await c.OQ.from("product_extras").delete().eq("product_id",s);m.ZP.success("Produto atualizado com sucesso!"),r.push("/admin/produtos")}catch(e){console.error("Erro ao atualizar produto:",e),m.ZP.error(e.message||"Erro ao atualizar produto")}finally{C(!1)}};return S?(0,a.jsx)("div",{className:"flex justify-center py-12",children:(0,a.jsx)("div",{className:"animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"})}):(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{className:"text-3xl font-bold text-gray-900",children:"Editar Produto"}),(0,a.jsx)("p",{className:"text-gray-600 mt-1",children:"Modifique as informa\xe7\xf5es do produto"})]}),(0,a.jsx)(n(),{href:"/admin/produtos",className:"bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors",children:"Voltar"})]}),(0,a.jsxs)("form",{onSubmit:U,className:"space-y-6",children:[(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-6",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Informa\xe7\xf5es B\xe1sicas"}),(0,a.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700 mb-1",children:"Nome do Produto *"}),(0,a.jsx)("input",{id:"name",type:"text",value:g,onChange:e=>f(e.target.value),required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"Nome do produto"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"description",className:"block text-sm font-medium text-gray-700 mb-1",children:"Descri\xe7\xe3o"}),(0,a.jsx)("textarea",{id:"description",value:h,onChange:e=>x(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]",placeholder:"Descri\xe7\xe3o do produto"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"category",className:"block text-sm font-medium text-gray-700 mb-1",children:"Categoria *"}),(0,a.jsxs)("select",{id:"category",value:v,onChange:e=>j(e.target.value),required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",children:[(0,a.jsx)("option",{value:"",children:"Selecione uma categoria"}),l.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Status"}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("input",{type:"checkbox",id:"active",checked:Z,onChange:e=>Y(e.target.checked),className:"rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),(0,a.jsx)("label",{htmlFor:"active",className:"ml-2 text-sm text-gray-900",children:"Produto ativo"})]})]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Imagem do Produto"}),(0,a.jsxs)("div",{className:"space-y-4",children:[(N||k)&&(0,a.jsx)("div",{children:(0,a.jsx)(d(),{src:k||N||u.WF,alt:g||"Produto",width:200,height:200,className:"w-48 h-48 object-cover rounded-lg border border-gray-200"})}),(0,a.jsx)("input",{id:"image",type:"file",accept:"image/*",onChange:e=>{var t;let r=(null===(t=e.target.files)||void 0===t?void 0:t[0])||null;if(r){I(r);let e=URL.createObjectURL(r);O(e)}},className:"block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"})]})]})]})]}),(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-6",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Pre\xe7o e Configura\xe7\xf5es"}),(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,a.jsx)("div",{children:(0,a.jsxs)("label",{className:"flex items-center",children:[(0,a.jsx)("input",{type:"checkbox",checked:M,onChange:e=>{P(e.target.checked),e.target.checked||L([])},className:"rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),(0,a.jsx)("span",{className:"ml-2 text-sm font-medium text-gray-700",children:"Produto com varia\xe7\xf5es (tamanhos, sabores, etc.)"})]})}),(0,a.jsx)("div",{children:(0,a.jsxs)("label",{className:"flex items-center",children:[(0,a.jsx)("input",{type:"checkbox",checked:z,onChange:e=>{G(e.target.checked),e.target.checked||_([])},className:"rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),(0,a.jsx)("span",{className:"ml-2 text-sm font-medium text-gray-700",children:"Produto com adicionais opcionais"})]})})]}),!M&&(0,a.jsxs)("div",{className:"max-w-xs",children:[(0,a.jsx)("label",{htmlFor:"price",className:"block text-sm font-medium text-gray-700 mb-1",children:"Pre\xe7o *"}),(0,a.jsx)("input",{id:"price",type:"text",value:b,onChange:e=>{let t=e.target.value.replace(/[^0-9.]/g,"");y(t)},required:!M,className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",placeholder:"0.00"}),b&&!isNaN(parseFloat(b))&&(0,a.jsxs)("p",{className:"text-sm text-gray-500 mt-1",children:["Visualiza\xe7\xe3o: ",(0,u.xG)(parseFloat(b))]})]})]})]}),M&&(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900",children:"Varia\xe7\xf5es do Produto"}),(0,a.jsx)("button",{type:"button",onClick:()=>{L([...R,{name:"",price:"",order_index:R.length}])},className:"bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700",children:"+ Adicionar Varia\xe7\xe3o"})]}),0===R.length?(0,a.jsx)("p",{className:"text-gray-500 text-center py-4",children:'Nenhuma varia\xe7\xe3o adicionada. Clique em "Adicionar Varia\xe7\xe3o" para come\xe7ar.'}):(0,a.jsx)("div",{className:"space-y-3",children:R.map((e,t)=>(0,a.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 border border-gray-200 rounded-md",children:[(0,a.jsx)("div",{children:(0,a.jsx)("input",{type:"text",placeholder:"Nome da varia\xe7\xe3o (ex: Pequeno)",value:e.name,onChange:e=>F(t,"name",e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("input",{type:"text",placeholder:"Pre\xe7o",value:e.price,onChange:e=>F(t,"price",e.target.value.replace(/[^0-9.]/g,"")),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"}),e.price&&!isNaN(parseFloat(e.price))&&(0,a.jsx)("p",{className:"text-xs text-gray-500 mt-1",children:(0,u.xG)(parseFloat(e.price))})]}),(0,a.jsx)("div",{className:"flex items-center",children:(0,a.jsx)("button",{type:"button",onClick:()=>T(t),className:"text-red-600 hover:text-red-800 text-sm font-medium",children:"Remover"})})]},t))})]}),z&&(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-sm border border-gray-200 p-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900",children:"Adicionais Opcionais"}),(0,a.jsx)("button",{type:"button",onClick:()=>{_([...W,{name:"",price:"",order_index:W.length}])},className:"bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700",children:"+ Adicionar Adicional"})]}),0===W.length?(0,a.jsx)("p",{className:"text-gray-500 text-center py-4",children:'Nenhum adicional adicionado. Clique em "Adicionar Adicional" para come\xe7ar.'}):(0,a.jsx)("div",{className:"space-y-3",children:W.map((e,t)=>(0,a.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 border border-gray-200 rounded-md",children:[(0,a.jsx)("div",{children:(0,a.jsx)("input",{type:"text",placeholder:"Nome do adicional (ex: Bacon)",value:e.name,onChange:e=>J(t,"name",e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("input",{type:"text",placeholder:"Pre\xe7o adicional",value:e.price,onChange:e=>J(t,"price",e.target.value.replace(/[^0-9.]/g,"")),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"}),e.price&&!isNaN(parseFloat(e.price))&&(0,a.jsxs)("p",{className:"text-xs text-gray-500 mt-1",children:["+ ",(0,u.xG)(parseFloat(e.price))]})]}),(0,a.jsx)("div",{className:"flex items-center",children:(0,a.jsx)("button",{type:"button",onClick:()=>Q(t),className:"text-red-600 hover:text-red-800 text-sm font-medium",children:"Remover"})})]},t))})]}),(0,a.jsxs)("div",{className:"flex justify-end gap-3",children:[(0,a.jsx)(n(),{href:"/admin/produtos",className:"px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors",children:"Cancelar"}),(0,a.jsx)("button",{type:"submit",disabled:D,className:"bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50",children:D?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"}),"Salvando..."]}):"Salvar Altera\xe7\xf5es"})]})]})]})}},7823:function(e,t,r){"use strict";r.d(t,{OQ:function(){return i}});var a=r(4756);let i=(0,a.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},345:function(e,t,r){"use strict";r.d(t,{Ix:function(){return n},P0:function(){return u},Vx:function(){return d},WF:function(){return i},_n:function(){return m},_z:function(){return c},aF:function(){return s},xG:function(){return o}});var a=r(7823);let i="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMTlUMTM6Mzc6MTQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0xOVQxMzozNzoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f+lkGAAAALRJREFUeJzt0cENwDAIADFE0/0H6yhkgHug57OzKmk7M9sB3LXeCeyZkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDg/nxMKXAp7CKEAAAAASUVORK5CYII=";function o(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function s(e,t){return e.length<=t?e:e.slice(0,t)+"..."}async function n(e,t,r){try{let i="".concat(Date.now(),"_").concat(e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/--+/g,"-").trim()),o=r?"".concat(r,"/").concat(i):i,{data:s,error:n}=await a.OQ.storage.from(t).upload(o,e,{cacheControl:"3600",upsert:!1});if(n)throw n;let{data:l}=a.OQ.storage.from(t).getPublicUrl(o);return l.publicUrl}catch(e){return console.error("Erro ao fazer upload da imagem:",e),console.warn("Usando imagem placeholder como fallback"),i}}let l={0:"sunday",1:"monday",2:"tuesday",3:"wednesday",4:"thursday",5:"friday",6:"saturday"},d=e=>{let t=new Date,r=t.getDay(),a=t.toTimeString().slice(0,5),i=l[r],o=e[i];if(!o||""===o.trim())return!1;let s=o.split("-");if(2!==s.length)return!1;let[n,d]=s.map(e=>e.trim());return d<n?a>=n||a<=d:a>=n&&a<=d},c=e=>{let t=new Date,r=t.getDay(),a=t.toTimeString().slice(0,5),i=l[r],o=e[i];return{shouldBeOpen:d(e),currentTime:a,todayHours:o,dayOfWeek:i,timestamp:t}},u=e=>{let t=new Date,r=t.getDay(),a=l[r],i=e[a];return i&&""!==i.trim()?"Hoje: ".concat(i):"Fechado hoje"},m=e=>{let t=c(e);if(t.shouldBeOpen)return null;let r=new Date,a=r.getDay(),i=l[a],o=e[i];if(o&&""!==o.trim()){let[e]=o.split("-").map(e=>e.trim()),t=r.toTimeString().slice(0,5);if(t<e)return"Abre hoje \xe0s ".concat(e)}for(let t=1;t<=7;t++){let r=(a+t)%7,i=l[r],o=e[i];if(o&&""!==o.trim()){let[e]=o.split("-").map(e=>e.trim()),r={monday:"segunda-feira",tuesday:"ter\xe7a-feira",wednesday:"quarta-feira",thursday:"quinta-feira",friday:"sexta-feira",saturday:"s\xe1bado",sunday:"domingo"},a=r[i];return"Abre ".concat(1===t?"amanh\xe3":a," \xe0s ").concat(e)}}return"Hor\xe1rios n\xe3o definidos"}},4033:function(e,t,r){e.exports=r(94)},5925:function(e,t,r){"use strict";let a,i;r.d(t,{x7:function(){return eu},ZP:function(){return em},Am:function(){return P}});var o,s=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",a="",i="";for(let o in e){let s=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+s+";":a+="f"==o[1]?m(s,o):o+"{"+m(s,"k"==o[1]?"":t)+"}":"object"==typeof s?a+=m(s,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=s&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=m.p?m.p(o,s):o+":"+s+";")}return r+(t&&i?t+"{"+i+"}":i)+a},p={},g=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+g(e[r]);return t}return e},f=(e,t,r,a,i)=>{var o;let s=g(e),n=p[s]||(p[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!p[n]){let t=s!==e?e:(e=>{let t,r,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[n]=m(i?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&p.g?p.g:null;return r&&(p.g=p[n]),o=p[n],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=a?o+t.data:t.data+o),n},h=(e,t,r)=>e.reduce((e,a,i)=>{let o=t[i];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==o?"":o)},"");function x(e){let t=this||{},r=e.call?e(t.p):e;return f(r.unshift?r.raw?h(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}x.bind({g:1});let b,y,v,j=x.bind({k:1});function N(e,t){let r=this||{};return function(){let a=arguments;function i(o,s){let n=Object.assign({},o),l=n.className||i.className;r.p=Object.assign({theme:y&&y()},n),r.o=/ *go\d+/.test(l),n.className=x.apply(r,a)+(l?" "+l:""),t&&(n.ref=s);let d=e;return e[0]&&(d=n.as||e,delete n.as),v&&d[0]&&v(n),b(d,n)}return t?t(i):i}}var w=e=>"function"==typeof e,A=(e,t)=>w(e)?e(t):e,I=(a=0,()=>(++a).toString()),k=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},O=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return O(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},S=[],E={toasts:[],pausedAt:void 0},D=e=>{E=O(E,e),S.forEach(e=>{e(E)})},C={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Z=(e={})=>{let[t,r]=(0,s.useState)(E),a=(0,s.useRef)(E);(0,s.useEffect)(()=>(a.current!==E&&r(E),S.push(r),()=>{let e=S.indexOf(r);e>-1&&S.splice(e,1)}),[]);let i=t.toasts.map(t=>{var r,a,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||C[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...t,toasts:i}},Y=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||I()}),M=e=>(t,r)=>{let a=Y(t,e,r);return D({type:2,toast:a}),a.id},P=(e,t)=>M("blank")(e,t);P.error=M("error"),P.success=M("success"),P.loading=M("loading"),P.custom=M("custom"),P.dismiss=e=>{D({type:3,toastId:e})},P.remove=e=>D({type:4,toastId:e}),P.promise=(e,t,r)=>{let a=P.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?A(t.success,e):void 0;return i?P.success(i,{id:a,...r,...null==r?void 0:r.success}):P.dismiss(a),e}).catch(e=>{let i=t.error?A(t.error,e):void 0;i?P.error(i,{id:a,...r,...null==r?void 0:r.error}):P.dismiss(a)}),e};var z=(e,t)=>{D({type:1,toast:{id:e,height:t}})},G=()=>{D({type:5,time:Date.now()})},R=new Map,L=1e3,W=(e,t=L)=>{if(R.has(e))return;let r=setTimeout(()=>{R.delete(e),D({type:4,toastId:e})},t);R.set(e,r)},_=e=>{let{toasts:t,pausedAt:r}=Z(e);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&P.dismiss(t.id);return}return setTimeout(()=>P.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,s.useCallback)(()=>{r&&D({type:6,time:Date.now()})},[r]),i=(0,s.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:i=8,defaultPosition:o}=r||{},s=t.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[t]);return(0,s.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)W(e.id,e.removeDelay);else{let t=R.get(e.id);t&&(clearTimeout(t),R.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:z,startPause:G,endPause:a,calculateOffset:i}}},F=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,T=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,J=j`
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

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${T} 0.15s ease-out forwards;
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
    animation: ${J} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,U=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${U} 1s linear infinite;
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
}`,H=N("div")`
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
`,q=N("div")`
  position: absolute;
`,$=N("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=j`
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
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(ee,null,t):t:"blank"===r?null:s.createElement($,null,s.createElement(B,{...a}),"loading"!==r&&s.createElement(q,null,"error"===r?s.createElement(Q,{...a}):s.createElement(H,{...a})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=N("div")`
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
`,eo=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,es=(e,t)=>{let r=e.includes("top")?1:-1,[a,i]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),ea(r)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?es(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(et,{toast:e}),n=s.createElement(eo,{...e.ariaProps},A(e.message,e));return s.createElement(ei,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});o=s.createElement,m.p=void 0,b=o,y=void 0,v=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},ed=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ec=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:d}=_(r);return s.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(r=>{let o=r.position||t,n=ed(o,d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return s.createElement(el,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?ec:"",style:n},"custom"===r.type?A(r.message,r):i?i(r):s.createElement(en,{toast:r,position:o}))}))},em=P}},function(e){e.O(0,[36,847,691,971,472,744],function(){return e(e.s=2079)}),_N_E=e.O()}]);