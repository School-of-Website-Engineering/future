if(!self.define){let s,e={};const n=(n,i)=>(n=new URL(n+".js",i).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>n(s,r),o={module:{uri:r},exports:u,require:t};e[r]=Promise.all(i.map((s=>o[s]||t(s)))).then((s=>(l(...s),u)))}}define(["./workbox-082d0e8a"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/index-008777cf.js",revision:null},{url:"assets/index-00f6ea42.js",revision:null},{url:"assets/index-21577b2e.js",revision:null},{url:"assets/index-2f8a632d.js",revision:null},{url:"assets/index-3ad8a291.js",revision:null},{url:"assets/index-6359e718.js",revision:null},{url:"assets/index-74c1f3e4.css",revision:null},{url:"assets/index-8d6955b3.css",revision:null},{url:"assets/index-94c34ac0.css",revision:null},{url:"assets/index-9d2a6f56.css",revision:null},{url:"assets/index-b34624f8.js",revision:null},{url:"assets/index-c59c019c.js",revision:null},{url:"assets/index-c9ed655d.js",revision:null},{url:"assets/index-d0eac164.js",revision:null},{url:"assets/index-f0fd7216.css",revision:null},{url:"assets/index-fc7febe0.css",revision:null},{url:"assets/NotFound-383f6438.css",revision:null},{url:"assets/NotFound-fda0ec14.js",revision:null},{url:"assets/vendor-56a91924.css",revision:null},{url:"assets/vendor-a861d7f1.js",revision:null},{url:"index.html",revision:"64628f3f55c993f5d82d784dbb92ed74"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/\/api-dev\/|\/api-pro\//,new s.CacheFirst({cacheName:"interface-cache",plugins:[]}),"GET"),s.registerRoute(/(.*?)\.(js|css|ts)/,new s.CacheFirst({cacheName:"js-css-cache",plugins:[]}),"GET"),s.registerRoute(/(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,new s.CacheFirst({cacheName:"image-cache",plugins:[]}),"GET")}));
