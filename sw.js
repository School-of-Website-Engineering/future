if(!self.define){let s,e={};const n=(n,i)=>(n=new URL(n+".js",i).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const a=s=>n(s,r),t={module:{uri:r},exports:u,require:a};e[r]=Promise.all(i.map((s=>t[s]||a(s)))).then((s=>(l(...s),u)))}}define(["./workbox-082d0e8a"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/index-08a64d1d.css",revision:null},{url:"assets/index-2ed947a9.css",revision:null},{url:"assets/index-51116c68.js",revision:null},{url:"assets/index-5630a889.css",revision:null},{url:"assets/index-57285412.js",revision:null},{url:"assets/index-5ecedcfa.js",revision:null},{url:"assets/index-5f77a37c.js",revision:null},{url:"assets/index-6139f26a.js",revision:null},{url:"assets/index-79197e2f.js",revision:null},{url:"assets/index-86cc8d60.css",revision:null},{url:"assets/index-8cc9fc66.js",revision:null},{url:"assets/index-9dac716e.css",revision:null},{url:"assets/index-a9bcb4bb.js",revision:null},{url:"assets/index-b0aea74a.css",revision:null},{url:"assets/index-bf049aa7.css",revision:null},{url:"assets/index-d8e4d6d3.css",revision:null},{url:"assets/index-f6fc4afe.js",revision:null},{url:"assets/index-fc7febe0.css",revision:null},{url:"assets/index-fe65a526.js",revision:null},{url:"assets/NotFound-383f6438.css",revision:null},{url:"assets/NotFound-95a0fa14.js",revision:null},{url:"assets/vendor-b8bc4daa.css",revision:null},{url:"assets/vendor-d9fce5dd.js",revision:null},{url:"index.html",revision:"296efd7189b07fa8fdbf96ed6f91fa90"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/\/api-dev\/|\/api-pro\//,new s.CacheFirst({cacheName:"interface-cache",plugins:[]}),"GET"),s.registerRoute(/(.*?)\.(js|css|ts)/,new s.CacheFirst({cacheName:"js-css-cache",plugins:[]}),"GET"),s.registerRoute(/(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,new s.CacheFirst({cacheName:"image-cache",plugins:[]}),"GET")}));
