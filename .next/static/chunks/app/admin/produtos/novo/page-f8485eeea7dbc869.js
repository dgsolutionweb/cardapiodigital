(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[329],{546:function(e,t,r){Promise.resolve().then(r.bind(r,9970))},9970:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return m}});var a=r(7437),i=r(2265),s=r(4033),o=r(1396),n=r.n(o),l=r(7823),c=r(345),d=r(5925);function m(){let e=(0,s.useRouter)(),[t,r]=(0,i.useState)([]),[o,m]=(0,i.useState)(""),[u,p]=(0,i.useState)(""),[h,x]=(0,i.useState)(""),[g,f]=(0,i.useState)(""),[y,b]=(0,i.useState)(null),[v,j]=(0,i.useState)(null),[w,N]=(0,i.useState)(!0),[k,I]=(0,i.useState)(!1),[A,E]=(0,i.useState)(!1),[O,C]=(0,i.useState)(!1),[S,Y]=(0,i.useState)([]),[M,Z]=(0,i.useState)([]);(0,i.useEffect)(()=>{let e=async()=>{try{N(!0);let{data:e,error:t}=await l.OQ.from("categories").select("*").order("name");if(t)throw t;e&&(r(e),e.length>0&&f(e[0].id))}catch(e){console.error("Erro ao buscar categorias:",e),d.ZP.error("Erro ao carregar categorias")}finally{N(!1)}};e()},[]);let L=(e,t,r)=>{let a=[...S];"price"===t&&(r=r.replace(/[^0-9.]/g,"")),a[e]={...a[e],[t]:r},Y(a)},D=e=>{let t=S.filter((t,r)=>r!==e);t.forEach((e,t)=>{e.order_index=t}),Y(t)},z=(e,t,r)=>{let a=[...M];"price"===t&&(r=r.replace(/[^0-9.]/g,"")),a[e]={...a[e],[t]:r},Z(a)},R=e=>{let t=M.filter((t,r)=>r!==e);t.forEach((e,t)=>{e.order_index=t}),Z(t)},G=async t=>{if(t.preventDefault(),!o.trim())return d.ZP.error("O nome do produto \xe9 obrigat\xf3rio");if(!A&&(!h||isNaN(parseFloat(h))||0>=parseFloat(h)))return d.ZP.error("O pre\xe7o deve ser um valor v\xe1lido maior que zero");if(!g)return d.ZP.error("Selecione uma categoria");if(A&&0===S.length)return d.ZP.error("Adicione pelo menos uma varia\xe7\xe3o para o produto");if(A)for(let e=0;e<S.length;e++){let t=S[e];if(!t.name.trim())return d.ZP.error("Informe o nome da varia\xe7\xe3o ".concat(e+1));if(!t.price||isNaN(parseFloat(t.price))||0>=parseFloat(t.price))return d.ZP.error("Informe um pre\xe7o v\xe1lido para a varia\xe7\xe3o ".concat(t.name))}if(O&&M.length>0)for(let e=0;e<M.length;e++){let t=M[e];if(!t.name.trim())return d.ZP.error("Informe o nome do adicional ".concat(e+1));if(!t.price||isNaN(parseFloat(t.price))||0>=parseFloat(t.price))return d.ZP.error("Informe um pre\xe7o v\xe1lido para o adicional ".concat(t.name))}try{I(!0);let t=null;y&&(t=await (0,c.Ix)(y,"products","images"),console.log("URL da imagem ap\xf3s upload:",t));let{data:r,error:a}=await l.OQ.from("products").insert({name:o,description:u||null,price:A?0:parseFloat(h),image_url:t,category_id:g,created_at:new Date().toISOString(),has_variations:A,has_extras:O}).select("id");if(a)throw a;if(!r||0===r.length)throw Error("Erro ao criar produto: ID do produto n\xe3o retornado");let i=r[0].id;if(A&&S.length>0){let e=S.map(e=>({product_id:i,name:e.name,price:parseFloat(e.price),order_index:e.order_index})),{error:t}=await l.OQ.from("product_variations").insert(e);if(t)throw t}if(O&&M.length>0){let e=M.map(e=>({product_id:i,name:e.name,price:parseFloat(e.price),order_index:e.order_index})),{error:t}=await l.OQ.from("product_extras").insert(e);if(t)throw t}d.ZP.success("Produto criado com sucesso!"),e.push("/admin/produtos")}catch(e){console.error("Erro ao criar produto:",e),d.ZP.error(e.message||"Erro ao criar produto")}finally{I(!1)}};return w&&0===t.length?(0,a.jsx)("div",{className:"flex justify-center py-8",children:(0,a.jsx)("div",{className:"animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"})}):(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold",children:"Novo Produto"}),(0,a.jsx)("button",{onClick:()=>e.back(),className:"text-gray-600 hover:text-gray-900",children:"Voltar"})]}),0===t.length?(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-md p-6 text-center",children:[(0,a.jsx)("p",{className:"text-gray-500 mb-4",children:"Voc\xea precisa criar categorias antes de adicionar produtos"}),(0,a.jsx)(n(),{href:"/admin/categorias/nova",className:"text-primary hover:underline",children:"Criar primeira categoria"})]}):(0,a.jsx)("div",{className:"bg-white rounded-lg shadow-md p-6",children:(0,a.jsxs)("form",{onSubmit:G,className:"space-y-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700 mb-1",children:"Nome *"}),(0,a.jsx)("input",{id:"name",type:"text",value:o,onChange:e=>m(e.target.value),required:!0,className:"input",placeholder:"Nome do produto"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"description",className:"block text-sm font-medium text-gray-700 mb-1",children:"Descri\xe7\xe3o"}),(0,a.jsx)("textarea",{id:"description",value:u,onChange:e=>p(e.target.value),className:"input min-h-[100px]",placeholder:"Descri\xe7\xe3o do produto"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"category",className:"block text-sm font-medium text-gray-700 mb-1",children:"Categoria *"}),(0,a.jsx)("select",{id:"category",value:g,onChange:e=>f(e.target.value),required:!0,className:"input",children:t.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"price",className:"block text-sm font-medium text-gray-700 mb-1",children:"Pre\xe7o *"}),(0,a.jsx)("input",{id:"price",type:"text",value:h,onChange:e=>{let t=e.target.value.replace(/[^0-9.]/g,"");x(t)},required:!0,className:"input",placeholder:"0.00"}),h&&!isNaN(parseFloat(h))&&(0,a.jsxs)("p",{className:"text-sm text-gray-500 mt-1",children:["Visualiza\xe7\xe3o: ",(0,c.xG)(parseFloat(h))]})]})]}),(0,a.jsxs)("div",{className:"border rounded-lg p-4 bg-gray-50",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("input",{type:"checkbox",id:"hasVariations",checked:A,onChange:e=>E(e.target.checked),className:"h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"}),(0,a.jsx)("label",{htmlFor:"hasVariations",className:"ml-2 block text-sm font-medium text-gray-700",children:"Este produto possui varia\xe7\xf5es (tamanhos, sabores, etc)"})]}),A&&(0,a.jsxs)("button",{type:"button",onClick:()=>{Y([...S,{name:"",price:"",order_index:S.length}])},className:"px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary-dark transition-colors flex items-center space-x-1",children:[(0,a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),(0,a.jsx)("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]}),(0,a.jsx)("span",{children:"Adicionar Varia\xe7\xe3o"})]})]}),A&&(0,a.jsx)("div",{className:"space-y-3",children:0===S.length?(0,a.jsx)("div",{className:"text-gray-500 text-sm italic",children:'Nenhuma varia\xe7\xe3o adicionada. Clique em "Adicionar Varia\xe7\xe3o" para criar uma.'}):(0,a.jsx)("div",{className:"space-y-3",children:S.map((e,t)=>(0,a.jsxs)("div",{className:"flex items-center space-x-3 bg-white p-3 rounded border",children:[(0,a.jsx)("div",{className:"flex-grow",children:(0,a.jsx)("input",{type:"text",value:e.name,onChange:e=>L(t,"name",e.target.value),placeholder:"Nome da varia\xe7\xe3o (ex: Pequeno, M\xe9dio, etc)",className:"input py-1 mb-1 w-full"})}),(0,a.jsx)("div",{className:"w-28",children:(0,a.jsx)("input",{type:"text",value:e.price,onChange:e=>L(t,"price",e.target.value),placeholder:"Pre\xe7o",className:"input py-1 mb-1 w-full"})}),(0,a.jsx)("button",{type:"button",onClick:()=>D(t),className:"p-1 text-red-500 hover:text-red-700 transition-colors",children:(0,a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M3 6h18"}),(0,a.jsx)("path",{d:"M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"}),(0,a.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),(0,a.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17"})]})})]},t))})}),A&&(0,a.jsx)("div",{className:"mt-2 text-sm text-gray-500",children:"Se este produto possui varia\xe7\xf5es, o cliente dever\xe1 escolher uma op\xe7\xe3o ao fazer o pedido."})]}),(0,a.jsxs)("div",{className:"border rounded-lg p-4 bg-gray-50",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("input",{type:"checkbox",id:"hasExtras",checked:O,onChange:e=>C(e.target.checked),className:"h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"}),(0,a.jsx)("label",{htmlFor:"hasExtras",className:"ml-2 block text-sm font-medium text-gray-700",children:"Este produto possui adicionais opcionais"})]}),O&&(0,a.jsxs)("button",{type:"button",onClick:()=>{Z([...M,{name:"",price:"",order_index:M.length}])},className:"px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary-dark transition-colors flex items-center space-x-1",children:[(0,a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),(0,a.jsx)("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]}),(0,a.jsx)("span",{children:"Adicionar Item"})]})]}),O&&(0,a.jsx)("div",{className:"space-y-3",children:0===M.length?(0,a.jsx)("div",{className:"text-gray-500 text-sm italic",children:'Nenhum adicional cadastrado. Clique em "Adicionar Item" para criar um.'}):(0,a.jsx)("div",{className:"space-y-3",children:M.map((e,t)=>(0,a.jsxs)("div",{className:"flex items-center space-x-3 bg-white p-3 rounded border",children:[(0,a.jsx)("div",{className:"flex-grow",children:(0,a.jsx)("input",{type:"text",value:e.name,onChange:e=>z(t,"name",e.target.value),placeholder:"Nome do adicional (ex: Bacon, Queijo Extra)",className:"input py-1 mb-1 w-full"})}),(0,a.jsx)("div",{className:"w-28",children:(0,a.jsx)("input",{type:"text",value:e.price,onChange:e=>z(t,"price",e.target.value),placeholder:"Pre\xe7o",className:"input py-1 mb-1 w-full"})}),(0,a.jsx)("button",{type:"button",onClick:()=>R(t),className:"p-1 text-red-500 hover:text-red-700 transition-colors",children:(0,a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M3 6h18"}),(0,a.jsx)("path",{d:"M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"}),(0,a.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),(0,a.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17"})]})})]},t))})}),O&&(0,a.jsx)("div",{className:"mt-2 text-sm text-gray-500",children:"Os adicionais s\xe3o opcionais e o cliente pode selecionar v\xe1rios ao fazer o pedido."})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"image",className:"block text-sm font-medium text-gray-700 mb-1",children:"Imagem"}),(0,a.jsx)("input",{id:"image",type:"file",accept:"image/*",onChange:e=>{var t;let r=(null===(t=e.target.files)||void 0===t?void 0:t[0])||null;if(r){b(r);let e=URL.createObjectURL(r);j(e)}},className:"block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"}),v&&(0,a.jsx)("div",{className:"mt-2",children:(0,a.jsx)("img",{src:v,alt:"Preview",className:"w-40 h-40 object-cover rounded-lg"})})]}),(0,a.jsx)("div",{className:"flex justify-end",children:(0,a.jsx)("button",{type:"submit",disabled:k,className:"bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors flex items-center space-x-2",children:k?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{children:"Salvando..."}),(0,a.jsx)("div",{className:"animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"})]}):(0,a.jsx)("span",{children:"Salvar"})})})]})})]})}},7823:function(e,t,r){"use strict";r.d(t,{OQ:function(){return i}});var a=r(4756);let i=(0,a.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},345:function(e,t,r){"use strict";r.d(t,{Ix:function(){return n},WF:function(){return i},aF:function(){return o},xG:function(){return s}});var a=r(7823);let i="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMTlUMTM6Mzc6MTQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0xOVQxMzozNzoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f+lkGAAAALRJREFUeJzt0cENwDAIADFE0/0H6yhkgHug57OzKmk7M9sB3LXeCeyZkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDg/nxMKXAp7CKEAAAAASUVORK5CYII=";function s(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function o(e,t){return e.length<=t?e:e.slice(0,t)+"..."}async function n(e,t,r){try{let i="".concat(Date.now(),"_").concat(e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/--+/g,"-").trim()),s=r?"".concat(r,"/").concat(i):i,{data:o,error:n}=await a.OQ.storage.from(t).upload(s,e,{cacheControl:"3600",upsert:!1});if(n)throw n;let{data:l}=a.OQ.storage.from(t).getPublicUrl(s);return l.publicUrl}catch(e){return console.error("Erro ao fazer upload da imagem:",e),console.warn("Usando imagem placeholder como fallback"),i}}},4033:function(e,t,r){e.exports=r(94)},5925:function(e,t,r){"use strict";let a,i;r.d(t,{x7:function(){return em},ZP:function(){return eu},Am:function(){return D}});var s,o=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,u=(e,t)=>{let r="",a="",i="";for(let s in e){let o=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+o+";":a+="f"==s[1]?u(o,s):s+"{"+u(o,"k"==s[1]?"":t)+"}":"object"==typeof o?a+=u(o,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=o&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=u.p?u.p(s,o):s+":"+o+";")}return r+(t&&i?t+"{"+i+"}":i)+a},p={},h=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+h(e[r]);return t}return e},x=(e,t,r,a,i)=>{var s;let o=h(e),n=p[o]||(p[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!p[n]){let t=o!==e?e:(e=>{let t,r,a=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(r=t[3].replace(m," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(m," ").trim();return a[0]})(e);p[n]=u(i?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&p.g?p.g:null;return r&&(p.g=p[n]),s=p[n],l?t.data=t.data.replace(l,s):-1===t.data.indexOf(s)&&(t.data=a?s+t.data:t.data+s),n},g=(e,t,r)=>e.reduce((e,a,i)=>{let s=t[i];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+a+(null==s?"":s)},"");function f(e){let t=this||{},r=e.call?e(t.p):e;return x(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}f.bind({g:1});let y,b,v,j=f.bind({k:1});function w(e,t){let r=this||{};return function(){let a=arguments;function i(s,o){let n=Object.assign({},s),l=n.className||i.className;r.p=Object.assign({theme:b&&b()},n),r.o=/ *go\d+/.test(l),n.className=f.apply(r,a)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),y(c,n)}return t?t(i):i}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,I=(a=0,()=>(++a).toString()),A=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},E=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return E(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},O=[],C={toasts:[],pausedAt:void 0},S=e=>{C=E(C,e),O.forEach(e=>{e(C)})},Y={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},M=(e={})=>{let[t,r]=(0,o.useState)(C),a=(0,o.useRef)(C);(0,o.useEffect)(()=>(a.current!==C&&r(C),O.push(r),()=>{let e=O.indexOf(r);e>-1&&O.splice(e,1)}),[]);let i=t.toasts.map(t=>{var r,a,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||Y[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...t,toasts:i}},Z=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||I()}),L=e=>(t,r)=>{let a=Z(t,e,r);return S({type:2,toast:a}),a.id},D=(e,t)=>L("blank")(e,t);D.error=L("error"),D.success=L("success"),D.loading=L("loading"),D.custom=L("custom"),D.dismiss=e=>{S({type:3,toastId:e})},D.remove=e=>S({type:4,toastId:e}),D.promise=(e,t,r)=>{let a=D.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?k(t.success,e):void 0;return i?D.success(i,{id:a,...r,...null==r?void 0:r.success}):D.dismiss(a),e}).catch(e=>{let i=t.error?k(t.error,e):void 0;i?D.error(i,{id:a,...r,...null==r?void 0:r.error}):D.dismiss(a)}),e};var z=(e,t)=>{S({type:1,toast:{id:e,height:t}})},R=()=>{S({type:5,time:Date.now()})},G=new Map,W=1e3,J=(e,t=W)=>{if(G.has(e))return;let r=setTimeout(()=>{G.delete(e),S({type:4,toastId:e})},t);G.set(e,r)},P=e=>{let{toasts:t,pausedAt:r}=M(e);(0,o.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&D.dismiss(t.id);return}return setTimeout(()=>D.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,o.useCallback)(()=>{r&&S({type:6,time:Date.now()})},[r]),i=(0,o.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:i=8,defaultPosition:s}=r||{},o=t.filter(t=>(t.position||s)===(e.position||s)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[t]);return(0,o.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)J(e.id,e.removeDelay);else{let t=G.get(e.id);t&&(clearTimeout(t),G.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:z,startPause:R,endPause:a,calculateOffset:i}}},F=j`
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
`,V=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,X=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,H=j`
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

  animation: ${X} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?o.createElement(ee,null,t):t:"blank"===r?null:o.createElement(K,null,o.createElement(V,{...a}),"loading"!==r&&o.createElement($,null,"error"===r?o.createElement(U,{...a}):o.createElement(_,{...a})))},er=e=>`
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
`,es=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let r=e.includes("top")?1:-1,[a,i]=A()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),ea(r)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=o.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},s=o.createElement(et,{toast:e}),n=o.createElement(es,{...e.ariaProps},k(e.message,e));return o.createElement(ei,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:s,message:n}):o.createElement(o.Fragment,null,s,n))});s=o.createElement,u.p=void 0,y=s,b=void 0,v=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let s=o.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return o.createElement("div",{ref:s,className:t,style:r},i)},ec=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:A()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ed=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,containerStyle:s,containerClassName:n})=>{let{toasts:l,handlers:c}=P(r);return o.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let s=r.position||t,n=ec(s,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return o.createElement(el,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?ed:"",style:n},"custom"===r.type?k(r.message,r):i?i(r):o.createElement(en,{toast:r,position:s}))}))},eu=D}},function(e){e.O(0,[36,847,971,472,744],function(){return e(e.s=546)}),_N_E=e.O()}]);