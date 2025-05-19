"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[29],{3082:function(e,t,r){var i,o=Object.defineProperty,a=Object.getOwnPropertyDescriptor,s=Object.getOwnPropertyNames,n=Object.prototype.hasOwnProperty,l={};((e,t)=>{for(var r in t)o(e,r,{get:t[r],enumerable:!0})})(l,{createBrowserSupabaseClient:()=>A,createClientComponentClient:()=>u,createMiddlewareClient:()=>v,createMiddlewareSupabaseClient:()=>_,createPagesBrowserClient:()=>d,createPagesServerClient:()=>m,createRouteHandlerClient:()=>S,createServerActionClient:()=>O,createServerComponentClient:()=>C,createServerSupabaseClient:()=>E}),e.exports=((e,t,r,i)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let r of s(t))n.call(e,r)||void 0===r||o(e,r,{get:()=>t[r],enumerable:!(i=a(t,r))||i.enumerable});return e})(o({},"__esModule",{value:!0}),l);var c=r(626);function u({supabaseUrl:e="https://tcbketwbrlawpbktasva.supabase.co",supabaseKey:t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",options:r,cookieOptions:o,isSingleton:a=!0}={}){if(!e||!t)throw Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");let s=()=>{var i;return(0,c.createSupabaseClient)(e,t,{...r,global:{...null==r?void 0:r.global,headers:{...null==(i=null==r?void 0:r.global)?void 0:i.headers,"X-Client-Info":"@supabase/auth-helpers-nextjs@0.8.7"}},auth:{storage:new c.BrowserCookieAuthStorageAdapter(o)}})};if(a){let e=i??s();return"undefined"==typeof window?e:(i||(i=e),i)}return s()}var d=u,p=r(626),h=r(8027),f=class extends p.CookieAuthStorageAdapter{constructor(e,t){super(t),this.context=e}getCookie(e){var t,r,i;let o=(0,h.splitCookiesString)((null==(r=null==(t=this.context.res)?void 0:t.getHeader("set-cookie"))?void 0:r.toString())??"").map(t=>(0,p.parseCookies)(t)[e]).find(e=>!!e),a=o??(null==(i=this.context.req)?void 0:i.cookies[e]);return a}setCookie(e,t){this._setCookie(e,t)}deleteCookie(e){this._setCookie(e,"",{maxAge:0})}_setCookie(e,t,r){var i;let o=(0,h.splitCookiesString)((null==(i=this.context.res.getHeader("set-cookie"))?void 0:i.toString())??"").filter(t=>!(e in(0,p.parseCookies)(t))),a=(0,p.serializeCookie)(e,t,{...this.cookieOptions,...r,httpOnly:!1});this.context.res.setHeader("set-cookie",[...o,a])}};function m(e,{supabaseUrl:t="https://tcbketwbrlawpbktasva.supabase.co",supabaseKey:r="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",options:i,cookieOptions:o}={}){var a;if(!t||!r)throw Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");return(0,p.createSupabaseClient)(t,r,{...i,global:{...null==i?void 0:i.global,headers:{...null==(a=null==i?void 0:i.global)?void 0:a.headers,"X-Client-Info":"@supabase/auth-helpers-nextjs@0.8.7"}},auth:{storage:new f(e,o)}})}var g=r(626),b=r(8027),y=class extends g.CookieAuthStorageAdapter{constructor(e,t){super(t),this.context=e}getCookie(e){var t;let r=(0,b.splitCookiesString)((null==(t=this.context.res.headers.get("set-cookie"))?void 0:t.toString())??"").map(t=>(0,g.parseCookies)(t)[e]).find(e=>!!e);if(r)return r;let i=(0,g.parseCookies)(this.context.req.headers.get("cookie")??"");return i[e]}setCookie(e,t){this._setCookie(e,t)}deleteCookie(e){this._setCookie(e,"",{maxAge:0})}_setCookie(e,t,r){let i=(0,g.serializeCookie)(e,t,{...this.cookieOptions,...r,httpOnly:!1});this.context.res.headers&&this.context.res.headers.append("set-cookie",i)}};function v(e,{supabaseUrl:t="https://tcbketwbrlawpbktasva.supabase.co",supabaseKey:r="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",options:i,cookieOptions:o}={}){var a;if(!t||!r)throw Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");return(0,g.createSupabaseClient)(t,r,{...i,global:{...null==i?void 0:i.global,headers:{...null==(a=null==i?void 0:i.global)?void 0:a.headers,"X-Client-Info":"@supabase/auth-helpers-nextjs@0.8.7"}},auth:{storage:new y(e,o)}})}var k=r(626),I=class extends k.CookieAuthStorageAdapter{constructor(e,t){super(t),this.context=e}getCookie(e){var t;let r=this.context.cookies();return null==(t=r.get(e))?void 0:t.value}setCookie(e,t){}deleteCookie(e){}};function C(e,{supabaseUrl:t="https://tcbketwbrlawpbktasva.supabase.co",supabaseKey:r="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",options:i,cookieOptions:o}={}){var a;if(!t||!r)throw Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");return(0,k.createSupabaseClient)(t,r,{...i,global:{...null==i?void 0:i.global,headers:{...null==(a=null==i?void 0:i.global)?void 0:a.headers,"X-Client-Info":"@supabase/auth-helpers-nextjs@0.8.7"}},auth:{storage:new I(e,o)}})}var w=r(626),x=class extends w.CookieAuthStorageAdapter{constructor(e,t){super(t),this.context=e}getCookie(e){var t;let r=this.context.cookies();return null==(t=r.get(e))?void 0:t.value}setCookie(e,t){let r=this.context.cookies();r.set(e,t,this.cookieOptions)}deleteCookie(e){let t=this.context.cookies();t.set(e,"",{...this.cookieOptions,maxAge:0})}};function S(e,{supabaseUrl:t="https://tcbketwbrlawpbktasva.supabase.co",supabaseKey:r="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",options:i,cookieOptions:o}={}){var a;if(!t||!r)throw Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");return(0,w.createSupabaseClient)(t,r,{...i,global:{...null==i?void 0:i.global,headers:{...null==(a=null==i?void 0:i.global)?void 0:a.headers,"X-Client-Info":"@supabase/auth-helpers-nextjs@0.8.7"}},auth:{storage:new x(e,o)}})}var O=S;function A({supabaseUrl:e="https://tcbketwbrlawpbktasva.supabase.co",supabaseKey:t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",options:r,cookieOptions:i}={}){return console.warn("Please utilize the `createPagesBrowserClient` function instead of the deprecated `createBrowserSupabaseClient` function. Learn more: https://supabase.com/docs/guides/auth/auth-helpers/nextjs-pages"),d({supabaseUrl:e,supabaseKey:t,options:r,cookieOptions:i})}function E(e,{supabaseUrl:t="https://tcbketwbrlawpbktasva.supabase.co",supabaseKey:r="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",options:i,cookieOptions:o}={}){return console.warn("Please utilize the `createPagesServerClient` function instead of the deprecated `createServerSupabaseClient` function. Learn more: https://supabase.com/docs/guides/auth/auth-helpers/nextjs-pages"),m(e,{supabaseUrl:t,supabaseKey:r,options:i,cookieOptions:o})}function _(e,{supabaseUrl:t="https://tcbketwbrlawpbktasva.supabase.co",supabaseKey:r="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA",options:i,cookieOptions:o}={}){return console.warn("Please utilize the `createMiddlewareClient` function instead of the deprecated `createMiddlewareSupabaseClient` function. Learn more: https://supabase.com/docs/guides/auth/auth-helpers/nextjs#middleware"),v(e,{supabaseUrl:t,supabaseKey:r,options:i,cookieOptions:o})}},8027:function(e){var t={decodeValues:!0,map:!1,silent:!1};function r(e){return"string"==typeof e&&!!e.trim()}function i(e,i){var o,a,s,n,l=e.split(";").filter(r),c=(o=l.shift(),a="",s="",(n=o.split("=")).length>1?(a=n.shift(),s=n.join("=")):s=o,{name:a,value:s}),u=c.name,d=c.value;i=i?Object.assign({},t,i):t;try{d=i.decodeValues?decodeURIComponent(d):d}catch(e){console.error("set-cookie-parser encountered an error while decoding a cookie with value '"+d+"'. Set options.decodeValues to false to disable this feature.",e)}var p={name:u,value:d};return l.forEach(function(e){var t=e.split("="),r=t.shift().trimLeft().toLowerCase(),i=t.join("=");"expires"===r?p.expires=new Date(i):"max-age"===r?p.maxAge=parseInt(i,10):"secure"===r?p.secure=!0:"httponly"===r?p.httpOnly=!0:"samesite"===r?p.sameSite=i:"partitioned"===r?p.partitioned=!0:p[r]=i}),p}function o(e,o){if(o=o?Object.assign({},t,o):t,!e)return o.map?{}:[];if(e.headers){if("function"==typeof e.headers.getSetCookie)e=e.headers.getSetCookie();else if(e.headers["set-cookie"])e=e.headers["set-cookie"];else{var a=e.headers[Object.keys(e.headers).find(function(e){return"set-cookie"===e.toLowerCase()})];a||!e.headers.cookie||o.silent||console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."),e=a}}return(Array.isArray(e)||(e=[e]),o.map)?e.filter(r).reduce(function(e,t){var r=i(t,o);return e[r.name]=r,e},{}):e.filter(r).map(function(e){return i(e,o)})}e.exports=o,e.exports.parse=o,e.exports.parseString=i,e.exports.splitCookiesString=function(e){if(Array.isArray(e))return e;if("string"!=typeof e)return[];var t,r,i,o,a,s=[],n=0;function l(){for(;n<e.length&&/\s/.test(e.charAt(n));)n+=1;return n<e.length}for(;n<e.length;){for(t=n,a=!1;l();)if(","===(r=e.charAt(n))){for(i=n,n+=1,l(),o=n;n<e.length&&"="!==(r=e.charAt(n))&&";"!==r&&","!==r;)n+=1;n<e.length&&"="===e.charAt(n)?(a=!0,n=o,s.push(e.substring(t,i)),t=n):n=i+1}else n+=1;(!a||n>=e.length)&&s.push(e.substring(t,e.length))}return s}},626:function(e,t,r){r.r(t),r.d(t,{BrowserCookieAuthStorageAdapter:function(){return A},CookieAuthStorageAdapter:function(){return O},DEFAULT_COOKIE_OPTIONS:function(){return w},createSupabaseClient:function(){return E},isBrowser:function(){return C},parseCookies:function(){return _},parseSupabaseCookie:function(){return k},serializeCookie:function(){return j},stringifySupabaseSession:function(){return I}}),new TextEncoder;let i=new TextDecoder,o=e=>{let t=atob(e),r=new Uint8Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);return r},a=e=>{let t=e;t instanceof Uint8Array&&(t=i.decode(t)),t=t.replace(/-/g,"+").replace(/_/g,"/").replace(/\s/g,"");try{return o(t)}catch(e){throw TypeError("The input to be decoded is not correctly encoded.")}};var s,n,l=r(4756),c=Object.create,u=Object.defineProperty,d=Object.getOwnPropertyDescriptor,p=Object.getOwnPropertyNames,h=Object.getPrototypeOf,f=Object.prototype.hasOwnProperty,m=(e,t,r,i)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let o of p(t))f.call(e,o)||o===r||u(e,o,{get:()=>t[o],enumerable:!(i=d(t,o))||i.enumerable});return e},g=(e,t,r)=>(r=null!=e?c(h(e)):{},m(!t&&e&&e.__esModule?r:u(r,"default",{value:e,enumerable:!0}),e)),b=(s={"../../node_modules/.pnpm/cookie@0.5.0/node_modules/cookie/index.js"(e){e.parse=function(e,t){if("string"!=typeof e)throw TypeError("argument str must be a string");for(var r={},o=(t||{}).decode||i,a=0;a<e.length;){var s=e.indexOf("=",a);if(-1===s)break;var n=e.indexOf(";",a);if(-1===n)n=e.length;else if(n<s){a=e.lastIndexOf(";",s-1)+1;continue}var l=e.slice(a,s).trim();if(void 0===r[l]){var c=e.slice(s+1,n).trim();34===c.charCodeAt(0)&&(c=c.slice(1,-1)),r[l]=function(e,t){try{return t(e)}catch(t){return e}}(c,o)}a=n+1}return r},e.serialize=function(e,i,a){var s=a||{},n=s.encode||o;if("function"!=typeof n)throw TypeError("option encode is invalid");if(!r.test(e))throw TypeError("argument name is invalid");var l=n(i);if(l&&!r.test(l))throw TypeError("argument val is invalid");var c=e+"="+l;if(null!=s.maxAge){var u=s.maxAge-0;if(isNaN(u)||!isFinite(u))throw TypeError("option maxAge is invalid");c+="; Max-Age="+Math.floor(u)}if(s.domain){if(!r.test(s.domain))throw TypeError("option domain is invalid");c+="; Domain="+s.domain}if(s.path){if(!r.test(s.path))throw TypeError("option path is invalid");c+="; Path="+s.path}if(s.expires){var d=s.expires;if("[object Date]"!==t.call(d)&&!(d instanceof Date)||isNaN(d.valueOf()))throw TypeError("option expires is invalid");c+="; Expires="+d.toUTCString()}if(s.httpOnly&&(c+="; HttpOnly"),s.secure&&(c+="; Secure"),s.priority)switch("string"==typeof s.priority?s.priority.toLowerCase():s.priority){case"low":c+="; Priority=Low";break;case"medium":c+="; Priority=Medium";break;case"high":c+="; Priority=High";break;default:throw TypeError("option priority is invalid")}if(s.sameSite)switch("string"==typeof s.sameSite?s.sameSite.toLowerCase():s.sameSite){case!0:case"strict":c+="; SameSite=Strict";break;case"lax":c+="; SameSite=Lax";break;case"none":c+="; SameSite=None";break;default:throw TypeError("option sameSite is invalid")}return c};var t=Object.prototype.toString,r=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function i(e){return -1!==e.indexOf("%")?decodeURIComponent(e):e}function o(e){return encodeURIComponent(e)}}},function(){return n||(0,s[p(s)[0]])((n={exports:{}}).exports,n),n.exports}),y=g(b()),v=g(b());function k(e){if(!e)return null;try{let t=JSON.parse(e);if(!t)return null;if("Object"===t.constructor.name)return t;if("Array"!==t.constructor.name)throw Error(`Unexpected format: ${t.constructor.name}`);let[r,i,o]=t[0].split("."),s=a(i),n=new TextDecoder,{exp:l,sub:c,...u}=JSON.parse(n.decode(s));return{expires_at:l,expires_in:l-Math.round(Date.now()/1e3),token_type:"bearer",access_token:t[0],refresh_token:t[1],provider_token:t[2],provider_refresh_token:t[3],user:{id:c,factors:t[4],...u}}}catch(e){return console.warn("Failed to parse cookie string:",e),null}}function I(e){var t;return JSON.stringify([e.access_token,e.refresh_token,e.provider_token,e.provider_refresh_token,(null==(t=e.user)?void 0:t.factors)??null])}function C(){return"undefined"!=typeof window&&void 0!==window.document}var w={path:"/",sameSite:"lax",maxAge:31536e6};function x(e){return RegExp(".{1,"+e+"}","g")}var S=x(3180),O=class{constructor(e){this.cookieOptions={...w,...e,maxAge:w.maxAge}}getItem(e){let t=this.getCookie(e);if(e.endsWith("-code-verifier")&&t)return t;if(t)return JSON.stringify(k(t));let r=function(e,t=()=>null){let r=[];for(let i=0;;i++){let o=`${e}.${i}`,a=t(o);if(!a)break;r.push(a)}return r.length?r.join(""):null}(e,e=>this.getCookie(e));return null!==r?JSON.stringify(k(r)):null}setItem(e,t){if(e.endsWith("-code-verifier")){this.setCookie(e,t);return}let r=JSON.parse(t),i=I(r),o=function(e,t,r){let i=void 0!==r?x(r):S,o=Math.ceil(t.length/(r??3180));if(1===o)return[{name:e,value:t}];let a=[],s=t.match(i);return null==s||s.forEach((t,r)=>{let i=`${e}.${r}`;a.push({name:i,value:t})}),a}(e,i);o.forEach(e=>{this.setCookie(e.name,e.value)})}removeItem(e){this._deleteSingleCookie(e),this._deleteChunkedCookies(e)}_deleteSingleCookie(e){this.getCookie(e)&&this.deleteCookie(e)}_deleteChunkedCookies(e,t=0){for(let r=t;;r++){let t=`${e}.${r}`,i=this.getCookie(t);if(void 0===i)break;this.deleteCookie(t)}}},A=class extends O{constructor(e){super(e)}getCookie(e){if(!C())return null;let t=(0,y.parse)(document.cookie);return t[e]}setCookie(e,t){if(!C())return null;document.cookie=(0,y.serialize)(e,t,{...this.cookieOptions,httpOnly:!1})}deleteCookie(e){if(!C())return null;document.cookie=(0,y.serialize)(e,"",{...this.cookieOptions,maxAge:0,httpOnly:!1})}};function E(e,t,r){var i;let o=C();return(0,l.eI)(e,t,{...r,auth:{flowType:"pkce",autoRefreshToken:o,detectSessionInUrl:o,persistSession:!0,storage:r.auth.storage,...(null==(i=r.auth)?void 0:i.storageKey)?{storageKey:r.auth.storageKey}:{}}})}var _=v.parse,j=v.serialize;/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/},5925:function(e,t,r){let i,o;r.d(t,{x7:function(){return ed},ZP:function(){return ep},Am:function(){return M}});var a,s=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,u=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,p=(e,t)=>{let r="",i="",o="";for(let a in e){let s=e[a];"@"==a[0]?"i"==a[1]?r=a+" "+s+";":i+="f"==a[1]?p(s,a):a+"{"+p(s,"k"==a[1]?"":t)+"}":"object"==typeof s?i+=p(s,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):a):null!=s&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=p.p?p.p(a,s):a+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+i},h={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},m=(e,t,r,i,o)=>{var a;let s=f(e),n=h[s]||(h[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!h[n]){let t=s!==e?e:(e=>{let t,r,i=[{}];for(;t=c.exec(e.replace(u,""));)t[4]?i.shift():t[3]?(r=t[3].replace(d," ").trim(),i.unshift(i[0][r]=i[0][r]||{})):i[0][t[1]]=t[2].replace(d," ").trim();return i[0]})(e);h[n]=p(o?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&h.g?h.g:null;return r&&(h.g=h[n]),a=h[n],l?t.data=t.data.replace(l,a):-1===t.data.indexOf(a)&&(t.data=i?a+t.data:t.data+a),n},g=(e,t,r)=>e.reduce((e,i,o)=>{let a=t[o];if(a&&a.call){let e=a(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+i+(null==a?"":a)},"");function b(e){let t=this||{},r=e.call?e(t.p):e;return m(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}b.bind({g:1});let y,v,k,I=b.bind({k:1});function C(e,t){let r=this||{};return function(){let i=arguments;function o(a,s){let n=Object.assign({},a),l=n.className||o.className;r.p=Object.assign({theme:v&&v()},n),r.o=/ *go\d+/.test(l),n.className=b.apply(r,i)+(l?" "+l:""),t&&(n.ref=s);let c=e;return e[0]&&(c=n.as||e,delete n.as),k&&c[0]&&k(n),y(c,n)}return t?t(o):o}}var w=e=>"function"==typeof e,x=(e,t)=>w(e)?e(t):e,S=(i=0,()=>(++i).toString()),O=()=>{if(void 0===o&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");o=!e||e.matches}return o},A=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return A(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},E=[],_={toasts:[],pausedAt:void 0},j=e=>{_=A(_,e),E.forEach(e=>{e(_)})},N={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e={})=>{let[t,r]=(0,s.useState)(_),i=(0,s.useRef)(_);(0,s.useEffect)(()=>(i.current!==_&&r(_),E.push(r),()=>{let e=E.indexOf(r);e>-1&&E.splice(e,1)}),[]);let o=t.toasts.map(t=>{var r,i,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(i=e[t.type])?void 0:i.duration)||(null==e?void 0:e.duration)||N[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...t,toasts:o}},X=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||S()}),J=e=>(t,r)=>{let i=X(t,e,r);return j({type:2,toast:i}),i.id},M=(e,t)=>J("blank")(e,t);M.error=J("error"),M.success=J("success"),M.loading=J("loading"),M.custom=J("custom"),M.dismiss=e=>{j({type:3,toastId:e})},M.remove=e=>j({type:4,toastId:e}),M.promise=(e,t,r)=>{let i=M.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?x(t.success,e):void 0;return o?M.success(o,{id:i,...r,...null==r?void 0:r.success}):M.dismiss(i),e}).catch(e=>{let o=t.error?x(t.error,e):void 0;o?M.error(o,{id:i,...r,...null==r?void 0:r.error}):M.dismiss(i)}),e};var U=(e,t)=>{j({type:1,toast:{id:e,height:t}})},T=()=>{j({type:5,time:Date.now()})},P=new Map,Z=1e3,D=(e,t=Z)=>{if(P.has(e))return;let r=setTimeout(()=>{P.delete(e),j({type:4,toastId:e})},t);P.set(e,r)},B=e=>{let{toasts:t,pausedAt:r}=z(e);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),i=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&M.dismiss(t.id);return}return setTimeout(()=>M.dismiss(t.id),r)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[t,r]);let i=(0,s.useCallback)(()=>{r&&j({type:6,time:Date.now()})},[r]),o=(0,s.useCallback)((e,r)=>{let{reverseOrder:i=!1,gutter:o=8,defaultPosition:a}=r||{},s=t.filter(t=>(t.position||a)===(e.position||a)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...i?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[t]);return(0,s.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)D(e.id,e.removeDelay);else{let t=P.get(e.id);t&&(clearTimeout(t),P.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:U,startPause:T,endPause:i,calculateOffset:o}}},L=I`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Y=I`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,R=I`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,V=C("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Y} 0.15s ease-out forwards;
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
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,K=I`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,$=C("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${K} 1s linear infinite;
`,F=I`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,H=I`
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
}`,q=C("div")`
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
`,G=C("div")`
  position: absolute;
`,Q=C("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=I`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=C("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${W} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:i}=e;return void 0!==t?"string"==typeof t?s.createElement(ee,null,t):t:"blank"===r?null:s.createElement(Q,null,s.createElement($,{...i}),"loading"!==r&&s.createElement(G,null,"error"===r?s.createElement(V,{...i}):s.createElement(q,{...i})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ei=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,eo=C("div")`
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
`,ea=C("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,es=(e,t)=>{let r=e.includes("top")?1:-1,[i,o]=O()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),ei(r)];return{animation:t?`${I(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${I(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=s.memo(({toast:e,position:t,style:r,children:i})=>{let o=e.height?es(e.position||t||"top-center",e.visible):{opacity:0},a=s.createElement(et,{toast:e}),n=s.createElement(ea,{...e.ariaProps},x(e.message,e));return s.createElement(eo,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof i?i({icon:a,message:n}):s.createElement(s.Fragment,null,a,n))});a=s.createElement,p.p=void 0,y=a,v=void 0,k=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:i,children:o})=>{let a=s.useCallback(t=>{if(t){let r=()=>{i(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return s.createElement("div",{ref:a,className:t,style:r},o)},ec=(e,t)=>{let r=e.includes("top"),i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:O()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...i}},eu=b`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ed=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:i,children:o,containerStyle:a,containerClassName:n})=>{let{toasts:l,handlers:c}=B(r);return s.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...a},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let a=r.position||t,n=ec(a,c.calculateOffset(r,{reverseOrder:e,gutter:i,defaultPosition:t}));return s.createElement(el,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?eu:"",style:n},"custom"===r.type?x(r.message,r):o?o(r):s.createElement(en,{toast:r,position:a}))}))},ep=M}}]);