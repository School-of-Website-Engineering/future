if(!self.define){let s,e={};const n=(n,i)=>(n=new URL(n+".js",i).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>n(s,r),a={module:{uri:r},exports:u,require:t};e[r]=Promise.all(i.map((s=>a[s]||t(s)))).then((s=>(l(...s),u)))}}define(["./workbox-082d0e8a"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/index-0af3cb91.css",revision:null},{url:"assets/index-0bda09fa.css",revision:null},{url:"assets/index-2578ed98.js",revision:null},{url:"assets/index-2841ad13.js",revision:null},{url:"assets/index-2ed947a9.css",revision:null},{url:"assets/index-4f7d6dc1.js",revision:null},{url:"assets/index-61a0a4ab.js",revision:null},{url:"assets/index-70cc1a42.js",revision:null},{url:"assets/index-70ebdcd9.js",revision:null},{url:"assets/index-7cb90883.css",revision:null},{url:"assets/index-81312c78.js",revision:null},{url:"assets/index-94c34ac0.css",revision:null},{url:"assets/index-aede7485.js",revision:null},{url:"assets/index-ba3f8311.js",revision:null},{url:"assets/index-e2e62b99.js",revision:null},{url:"assets/index-fc7febe0.css",revision:null},{url:"assets/index-ff36b1ed.css",revision:null},{url:"assets/NotFound-383f6438.css",revision:null},{url:"assets/NotFound-fbdb5b2f.js",revision:null},{url:"assets/vendor-25602d02.js",revision:null},{url:"assets/vendor-b8bc4daa.css",revision:null},{url:"index.html",revision:"38e39ef79d0829b31009a6ef23b18759"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/\/api-dev\/|\/api-pro\//,new s.CacheFirst({cacheName:"interface-cache",plugins:[]}),"GET"),s.registerRoute(/(.*?)\.(js|css|ts)/,new s.CacheFirst({cacheName:"js-css-cache",plugins:[]}),"GET"),s.registerRoute(/(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,new s.CacheFirst({cacheName:"image-cache",plugins:[]}),"GET")}));
