(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[565],{3906:function(e,t,r){Promise.resolve().then(r.bind(r,2689))},2689:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return p}});var s=r(7437),a=r(2265),i=r(1396),o=r.n(i),n=r(6691),l=r.n(n),c=r(4033),d=r(8800),m=r(345),u=r(5925),h=r(7823);function p(){let e=(0,c.useRouter)(),t=(0,c.useSearchParams)(),{items:r,total:i,updateQuantity:n,removeItem:p,clearCart:x}=(0,d.x)(),[f,g]=(0,a.useState)(0),[y,b]=(0,a.useState)(0),[v,j]=(0,a.useState)(!0),[w,N]=(0,a.useState)(""),[k,A]=(0,a.useState)("30-45"),[I,C]=(0,a.useState)(""),[M,L]=(0,a.useState)(!0);(0,a.useEffect)(()=>{let e=async()=>{try{L(!0);let{data:e,error:t}=await h.OQ.from("settings").select("key, value");if(t)throw t;e&&e.length>0&&e.forEach(e=>{switch(e.key){case"delivery_fee":g(parseFloat(e.value)||0);break;case"min_order_value":b(parseFloat(e.value)||0);break;case"store_open":j("true"===e.value);break;case"store_name":N(e.value);break;case"delivery_time":A(e.value);break;case"address":C(e.value)}})}catch(e){console.error("Erro ao buscar configura\xe7\xf5es:",e)}finally{L(!1)}};e()},[]);let E=()=>r.reduce((e,t)=>e+t.price*t.quantity,0),O=()=>E()+f,[z,S]=(0,a.useState)(!1),[G,W]=(0,a.useState)(!1),[Y,D]=(0,a.useState)(""),[R,T]=(0,a.useState)(""),[Z,J]=(0,a.useState)(""),[P,B]=(0,a.useState)("dinheiro"),[U,Q]=(0,a.useState)("");(0,a.useEffect)(()=>{let e="true"===t.get("checkout");e&&r.length>0&&W(!0)},[t,r.length]);let F=0===r.length,H=(e,t)=>{n(e,t+1)},X=(e,t)=>{t>1?n(e,t-1):p(e)},V=()=>{if(0===r.length){u.Am.error("Adicione itens ao carrinho antes de prosseguir");return}let e=E();if(e<y){u.Am.error("O valor m\xednimo do pedido \xe9 ".concat((0,m.xG)(y)));return}if(!v){u.Am.error("A loja est\xe1 fechada no momento. Verifique os hor\xe1rios de funcionamento.");return}W(!0),window.scrollTo({top:0,behavior:"smooth"})},_=()=>{W(!1)},$=async()=>{if(!Y.trim()){u.Am.error("Por favor, informe seu nome");return}if(!Z.trim()){u.Am.error("Por favor, informe seu telefone para contato");return}let t=E();if(t<y){u.Am.error("O valor m\xednimo do pedido \xe9 ".concat((0,m.xG)(y)));return}S(!0);try{var s;let t=E(),a=O(),i=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({customerName:Y,customerPhone:Z,deliveryAddress:R,paymentMethod:P,observations:U,items:r,subtotal:t,deliveryFee:f,total:a})}),o=await i.json();if(!i.ok)throw Error(o.error||"Erro ao processar pedido");let n="*Novo Pedido #".concat((null===(s=o.orderId)||void 0===s?void 0:s.slice(0,8))||"novo","*\n\n");n+="*Cliente:* ".concat(Y,"\n")+"*Telefone:* ".concat(Z,"\n")+"*Endere\xe7o:* ".concat(R||"N\xe3o informado","\n\n")+"*ITENS DO PEDIDO:*\n",r.forEach(e=>{n+="• ".concat(e.quantity,"x ").concat(e.name," - ").concat((0,m.xG)(e.price*e.quantity),"\n"),e.variation&&(n+="   ↳ Varia\xe7\xe3o: ".concat(e.variation.name,"\n")),e.extras&&e.extras.length>0&&(n+="   ↳ Adicionais: ".concat(e.extras.map(e=>e.name).join(", "),"\n"))}),n+="\n*Subtotal:* ".concat((0,m.xG)(O()),"\n")+"*M\xe9todo de pagamento:* ".concat(P.toUpperCase(),"\n"),U&&(n+="\n*Observa\xe7\xf5es:* ".concat(U,"\n"));let l="https://wa.me/".concat("5511999999999","?text=").concat(encodeURIComponent(n));u.Am.success("Pedido realizado com sucesso!"),x(),window.open(l,"_blank"),setTimeout(()=>{e.push("/order-success?id="+o.orderId)},2e3)}catch(e){console.error("Erro ao processar pedido:",e),u.Am.error("Erro ao finalizar pedido. Tente novamente.")}finally{S(!1)}};return(0,s.jsxs)("div",{className:"min-h-screen bg-gray-50 pb-24 md:pb-8",children:[(0,s.jsx)("header",{className:"bg-white shadow-sm sticky top-0 z-30",children:(0,s.jsxs)("div",{className:"w-full px-4 py-4 flex items-center",children:[G?(0,s.jsx)("button",{onClick:_,className:"text-gray-600 mr-4",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 19l-7-7m0 0l7-7m-7 7h18"})})}):(0,s.jsx)(o(),{href:"/",className:"text-gray-600 mr-4",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 19l-7-7m0 0l7-7m-7 7h18"})})}),(0,s.jsx)("h1",{className:"text-xl font-bold",children:G?"Finalizar Pedido":"Meu Carrinho"})]})}),(0,s.jsxs)("div",{className:"w-full px-4 py-6",children:[!G&&(0,s.jsx)(s.Fragment,{children:F?(0,s.jsxs)("div",{className:"bg-white rounded-xl shadow-sm p-6 text-center",children:[(0,s.jsx)("div",{className:"flex justify-center mb-4",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-16 w-16 text-gray-300",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})})}),(0,s.jsx)("h2",{className:"text-lg font-semibold mb-2",children:"Seu carrinho est\xe1 vazio"}),(0,s.jsx)("p",{className:"text-gray-500 mb-6",children:"Adicione alguns produtos para continuar."}),(0,s.jsxs)(o(),{href:"/",className:"inline-flex items-center px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 19l-7-7m0 0l7-7m-7 7h18"})}),"Voltar ao Card\xe1pio"]})]}):(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[(0,s.jsx)("div",{className:"lg:col-span-2",children:(0,s.jsxs)("div",{className:"bg-white rounded-xl shadow-sm overflow-hidden",children:[(0,s.jsx)("div",{className:"p-4 border-b border-gray-100",children:(0,s.jsxs)("h2",{className:"text-lg font-semibold",children:["Itens no Carrinho (",r.length,")"]})}),(0,s.jsx)("ul",{className:"divide-y divide-gray-100",children:r.map(e=>(0,s.jsx)("li",{className:"p-4",children:(0,s.jsxs)("div",{className:"flex items-center",children:[e.imageUrl&&(0,s.jsx)("div",{className:"w-16 h-16 mr-4 rounded-lg overflow-hidden flex-shrink-0",children:(0,s.jsx)(l(),{src:e.imageUrl,alt:e.name,width:64,height:64,className:"w-full h-full object-cover"})}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)("h3",{className:"font-medium text-gray-800",children:e.name}),e.variation&&(0,s.jsxs)("div",{className:"text-sm text-gray-600 mt-1",children:[(0,s.jsx)("span",{className:"font-medium",children:"Varia\xe7\xe3o:"})," ",e.variation.name]}),e.extras&&e.extras.length>0&&(0,s.jsxs)("div",{className:"text-sm text-gray-600 mt-1",children:[(0,s.jsx)("span",{className:"font-medium",children:"Adicionais:"})," ",e.extras.map(e=>e.name).join(", ")]}),(0,s.jsx)("p",{className:"text-primary font-medium mt-1",children:(0,m.xG)(e.price)})]}),(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)("button",{onClick:()=>X(e.id,e.quantity),className:"w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full text-gray-600 hover:bg-gray-100",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M20 12H4"})})}),(0,s.jsx)("span",{className:"w-8 text-center",children:e.quantity}),(0,s.jsx)("button",{onClick:()=>H(e.id,e.quantity),className:"w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full text-gray-600 hover:bg-gray-100",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4v16m8-8H4"})})})]}),(0,s.jsxs)("div",{className:"ml-4 text-right",children:[(0,s.jsx)("div",{className:"font-bold",children:(0,m.xG)(e.price*e.quantity)}),(0,s.jsx)("button",{onClick:()=>p(e.id),className:"text-sm text-red-500 hover:text-red-700 mt-1",children:"Remover"})]})]})},e.id))}),(0,s.jsxs)("div",{className:"p-4 bg-gray-50 flex items-center justify-between",children:[(0,s.jsxs)("button",{onClick:x,className:"text-sm text-gray-500 hover:text-red-500 flex items-center",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})}),"Limpar carrinho"]}),(0,s.jsx)("button",{onClick:V,className:"bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium",children:"Prosseguir para checkout"})]})]})}),(0,s.jsx)("div",{className:"lg:col-span-1",children:(0,s.jsxs)("div",{className:"bg-white rounded-xl shadow-sm p-4",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold mb-4",children:"Resumo do Pedido"}),(0,s.jsxs)("div",{className:"flex justify-between text-sm text-gray-600 mb-2",children:[(0,s.jsx)("span",{children:"Subtotal"}),(0,s.jsx)("span",{children:(0,m.xG)(E())})]}),(0,s.jsxs)("div",{className:"flex justify-between text-sm text-gray-600 mb-2",children:[(0,s.jsx)("span",{children:"Taxa de entrega"}),(0,s.jsx)("span",{children:(0,m.xG)(f)})]}),y>0&&(0,s.jsxs)("div",{className:"flex justify-between text-xs text-gray-500 mb-2 italic",children:[(0,s.jsx)("span",{children:"Valor m\xednimo para pedido:"}),(0,s.jsx)("span",{children:(0,m.xG)(y)})]}),(0,s.jsxs)("div",{className:"flex justify-between font-bold text-lg border-t border-gray-100 pt-4",children:[(0,s.jsx)("span",{children:"Total"}),(0,s.jsx)("span",{className:"text-primary",children:(0,m.xG)(O())})]}),(0,s.jsxs)("button",{onClick:V,className:"w-full bg-gradient-to-r from-primary to-primary-light text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all mt-4 flex items-center justify-center",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"})}),"Finalizar compra"]})]})})]})}),G&&(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[(0,s.jsxs)("div",{className:"lg:col-span-2",children:[(0,s.jsxs)("div",{className:"bg-white rounded-xl shadow-sm overflow-hidden mb-6",children:[(0,s.jsxs)("div",{className:"p-4 border-b border-gray-100 flex justify-between items-center",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold",children:"Resumo do Pedido"}),(0,s.jsx)("span",{className:"font-bold text-primary text-lg",children:(0,m.xG)(O())})]}),(0,s.jsx)("ul",{className:"divide-y divide-gray-100 max-h-64 overflow-y-auto",children:r.map(e=>(0,s.jsxs)("li",{className:"p-3 flex items-center justify-between",children:[(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsxs)("span",{className:"font-medium text-gray-800 mr-2",children:[e.quantity,"x"]}),(0,s.jsx)("span",{children:e.name})]}),(0,s.jsx)("span",{className:"text-gray-700",children:(0,m.xG)(e.price*e.quantity)})]},e.id))}),(0,s.jsx)("div",{className:"p-4 bg-gray-50",children:(0,s.jsxs)("button",{onClick:_,className:"flex items-center text-primary hover:text-primary-dark transition-colors",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})}),"Editar carrinho"]})})]}),(0,s.jsx)("div",{className:"bg-blue-50 rounded-xl p-4 text-blue-800 text-sm",children:(0,s.jsxs)("div",{className:"flex items-start",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2 mt-0.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"font-medium mb-1",children:"Como funciona?"}),(0,s.jsx)("p",{children:"Ao finalizar seu pedido, voc\xea ser\xe1 redirecionado para o WhatsApp para confirmar os detalhes com o restaurante."})]})]})})]}),(0,s.jsx)("div",{className:"lg:col-span-1",children:(0,s.jsxs)("div",{className:"bg-white rounded-xl shadow-sm",children:[(0,s.jsx)("div",{className:"p-4 border-b border-gray-100",children:(0,s.jsx)("h2",{className:"text-lg font-semibold",children:"Dados para Entrega"})}),(0,s.jsxs)("div",{className:"p-4 space-y-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Nome ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"text",value:Y,onChange:e=>D(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary",placeholder:"Seu nome"})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:["Telefone ",(0,s.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,s.jsx)("input",{type:"tel",value:Z,onChange:e=>J(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary",placeholder:"Seu telefone"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Endere\xe7o"}),(0,s.jsx)("textarea",{value:R,onChange:e=>T(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary",placeholder:"Seu endere\xe7o de entrega",rows:2})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"M\xe9todo de Pagamento"}),(0,s.jsxs)("select",{value:P,onChange:e=>B(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary",children:[(0,s.jsx)("option",{value:"dinheiro",children:"Dinheiro"}),(0,s.jsx)("option",{value:"pix",children:"PIX"}),(0,s.jsx)("option",{value:"cartao",children:"Cart\xe3o (na entrega)"})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Observa\xe7\xf5es"}),(0,s.jsx)("textarea",{value:U,onChange:e=>Q(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary",placeholder:"Observa\xe7\xf5es sobre seu pedido...",rows:3})]})]}),(0,s.jsxs)("div",{className:"p-4 border-t border-gray-100",children:[(0,s.jsxs)("div",{className:"flex justify-between text-sm text-gray-600 mb-2",children:[(0,s.jsx)("span",{children:"Subtotal"}),(0,s.jsx)("span",{children:(0,m.xG)(E())})]}),(0,s.jsxs)("div",{className:"flex justify-between text-sm text-gray-600 mb-2",children:[(0,s.jsx)("span",{children:"Taxa de entrega"}),(0,s.jsx)("span",{children:(0,m.xG)(f)})]}),(0,s.jsxs)("div",{className:"flex justify-between font-bold text-lg mb-4 pt-2 border-t border-gray-100",children:[(0,s.jsx)("span",{children:"Total"}),(0,s.jsx)("span",{className:"text-primary",children:(0,m.xG)(O())})]}),(0,s.jsx)("div",{className:"text-xs text-gray-500 mb-4 italic",children:(0,s.jsxs)("p",{children:["Tempo estimado de entrega: ",k," minutos"]})}),(0,s.jsx)("button",{onClick:$,disabled:z,className:"w-full bg-gradient-to-r from-primary to-primary-light text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center",children:z?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("svg",{className:"animate-spin -ml-1 mr-3 h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,s.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,s.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Processando..."]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),"Finalizar Pedido"]})})]})]})})]})]}),(0,s.jsx)("div",{className:"fixed bottom-0 w-full bg-white z-20 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.1)]",children:(0,s.jsxs)("div",{className:"flex items-center justify-around",children:[(0,s.jsxs)(o(),{href:"/",className:"flex flex-col items-center justify-center py-3 flex-1 text-gray-500",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2"})}),(0,s.jsx)("span",{className:"text-xs font-medium mt-1",children:"In\xedcio"})]}),(0,s.jsxs)(o(),{href:"/cart",className:"flex flex-col items-center justify-center py-3 flex-1 text-primary",children:[(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})}),r.length>0&&(0,s.jsx)("span",{className:"absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center",children:r.length})]}),(0,s.jsx)("span",{className:"text-xs font-medium mt-1",children:"Carrinho"})]}),(0,s.jsxs)(o(),{href:"/search",className:"flex flex-col items-center justify-center py-3 flex-1 text-gray-500",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})}),(0,s.jsx)("span",{className:"text-xs font-medium mt-1",children:"Buscar"})]})]})})]})}},7823:function(e,t,r){"use strict";r.d(t,{OQ:function(){return a}});var s=r(4756);let a=(0,s.eI)("https://tcbketwbrlawpbktasva.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",{auth:{persistSession:!0,autoRefreshToken:!0},global:{headers:{}}})},345:function(e,t,r){"use strict";r.d(t,{Ix:function(){return n},WF:function(){return a},aF:function(){return o},xG:function(){return i}});var s=r(7823);let a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDQtMTlUMTM6Mzc6MTQrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTE5VDEzOjM4OjQyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOWQ2ZTg0MS1iMmI2LTRiMWEtYWI0Ni0wYTY1OWRiMWJmOTkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5ZDZlODQxLWIyYjYtNGIxYS1hYjQ2LTBhNjU5ZGIxYmY5OSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0xOVQxMzozNzoxNCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+f+lkGAAAALRJREFUeJzt0cENwDAIADFE0/0H6yhkgHug57OzKmk7M9sB3LXeCeyZkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDgmJI4JiWNC4piQOCYkjgmJY0LimJA4JiSOCYljQuKYkDg/nxMKXAp7CKEAAAAASUVORK5CYII=";function i(e){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function o(e,t){return e.length<=t?e:e.slice(0,t)+"..."}async function n(e,t,r){try{let a="".concat(Date.now(),"_").concat(e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/--+/g,"-").trim()),i=r?"".concat(r,"/").concat(a):a,{data:o,error:n}=await s.OQ.storage.from(t).upload(i,e,{cacheControl:"3600",upsert:!1});if(n)throw n;let{data:l}=s.OQ.storage.from(t).getPublicUrl(i);return l.publicUrl}catch(e){return console.error("Erro ao fazer upload da imagem:",e),console.warn("Usando imagem placeholder como fallback"),a}}},8800:function(e,t,r){"use strict";r.d(t,{x:function(){return i}});var s=r(4660),a=r(4810);let i=(0,s.Ue)()((0,a.tJ)((e,t)=>({items:[],addItem:r=>{let s=t().items,a=s.find(e=>e.id===r.id);if(a)return e({items:s.map(e=>e.id===r.id?{...e,quantity:e.quantity+1}:e)});e({items:[...s,{...r,quantity:1}]})},removeItem:r=>{e({items:t().items.filter(e=>e.id!==r)})},updateQuantity:(r,s)=>{if(s<=0)return t().removeItem(r);e({items:t().items.map(e=>e.id===r?{...e,quantity:s}:e)})},clearCart:()=>e({items:[]}),get total(){return t().items.reduce((e,t)=>e+t.price*t.quantity,0)}}),{name:"cart-storage"}))},4033:function(e,t,r){e.exports=r(94)},5925:function(e,t,r){"use strict";let s,a;r.d(t,{x7:function(){return em},ZP:function(){return eu},Am:function(){return W}});var i,o=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,u=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?u(o,i):i+"{"+u(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=u(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=u.p?u.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},h={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e},x=(e,t,r,s,a)=>{var i;let o=p(e),n=h[o]||(h[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!h[n]){let t=o!==e?e:(e=>{let t,r,s=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?s.shift():t[3]?(r=t[3].replace(m," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(m," ").trim();return s[0]})(e);h[n]=u(a?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&h.g?h.g:null;return r&&(h.g=h[n]),i=h[n],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),n},f=(e,t,r)=>e.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function g(e){let t=this||{},r=e.call?e(t.p):e;return x(r.unshift?r.raw?f(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}g.bind({g:1});let y,b,v,j=g.bind({k:1});function w(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;r.p=Object.assign({theme:b&&b()},n),r.o=/ *go\d+/.test(l),n.className=g.apply(r,s)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),y(c,n)}return t?t(a):a}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,A=(s=0,()=>(++s).toString()),I=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},C=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return C(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},M=[],L={toasts:[],pausedAt:void 0},E=e=>{L=C(L,e),M.forEach(e=>{e(L)})},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e={})=>{let[t,r]=(0,o.useState)(L),s=(0,o.useRef)(L);(0,o.useEffect)(()=>(s.current!==L&&r(L),M.push(r),()=>{let e=M.indexOf(r);e>-1&&M.splice(e,1)}),[]);let a=t.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...t,toasts:a}},S=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||A()}),G=e=>(t,r)=>{let s=S(t,e,r);return E({type:2,toast:s}),s.id},W=(e,t)=>G("blank")(e,t);W.error=G("error"),W.success=G("success"),W.loading=G("loading"),W.custom=G("custom"),W.dismiss=e=>{E({type:3,toastId:e})},W.remove=e=>E({type:4,toastId:e}),W.promise=(e,t,r)=>{let s=W.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?k(t.success,e):void 0;return a?W.success(a,{id:s,...r,...null==r?void 0:r.success}):W.dismiss(s),e}).catch(e=>{let a=t.error?k(t.error,e):void 0;a?W.error(a,{id:s,...r,...null==r?void 0:r.error}):W.dismiss(s)}),e};var Y=(e,t)=>{E({type:1,toast:{id:e,height:t}})},D=()=>{E({type:5,time:Date.now()})},R=new Map,T=1e3,Z=(e,t=T)=>{if(R.has(e))return;let r=setTimeout(()=>{R.delete(e),E({type:4,toastId:e})},t);R.set(e,r)},J=e=>{let{toasts:t,pausedAt:r}=z(e);(0,o.useEffect)(()=>{if(r)return;let e=Date.now(),s=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&W.dismiss(t.id);return}return setTimeout(()=>W.dismiss(t.id),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[t,r]);let s=(0,o.useCallback)(()=>{r&&E({type:6,time:Date.now()})},[r]),a=(0,o.useCallback)((e,r)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=r||{},o=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[t]);return(0,o.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)Z(e.id,e.removeDelay);else{let t=R.get(e.id);t&&(clearTimeout(t),R.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:Y,startPause:D,endPause:s,calculateOffset:a}}},P=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,B=j`
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
}`,Q=w("div")`
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
    animation: ${B} 0.15s ease-out forwards;
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
`,F=j`
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
  animation: ${F} 1s linear infinite;
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
`,q=w("div")`
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
}`,ee=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?o.createElement(ee,null,t):t:"blank"===r?null:o.createElement(q,null,o.createElement(H,{...s}),"loading"!==r&&o.createElement($,null,"error"===r?o.createElement(Q,{...s}):o.createElement(_,{...s})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=w("div")`
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
`,eo=(e,t)=>{let r=e.includes("top")?1:-1,[s,a]=I()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),es(r)];return{animation:t?`${j(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=o.memo(({toast:e,position:t,style:r,children:s})=>{let a=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=o.createElement(et,{toast:e}),n=o.createElement(ei,{...e.ariaProps},k(e.message,e));return o.createElement(ea,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof s?s({icon:i,message:n}):o.createElement(o.Fragment,null,i,n))});i=o.createElement,u.p=void 0,y=i,b=void 0,v=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:s,children:a})=>{let i=o.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return o.createElement("div",{ref:i,className:t,style:r},a)},ec=(e,t)=>{let r=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:I()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...s}},ed=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:a,containerStyle:i,containerClassName:n})=>{let{toasts:l,handlers:c}=J(r);return o.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let i=r.position||t,n=ec(i,c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}));return o.createElement(el,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?ed:"",style:n},"custom"===r.type?k(r.message,r):a?a(r):o.createElement(en,{toast:r,position:i}))}))},eu=W}},function(e){e.O(0,[36,847,691,166,971,472,744],function(){return e(e.s=3906)}),_N_E=e.O()}]);