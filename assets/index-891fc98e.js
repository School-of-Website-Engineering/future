import{g as a,B as e,q as s,M as t,o as l,c as n,w as i,s as c,x as d,i as r,h as o,D as u,n as m,l as f,v as p,F as h,N as _,j as v,O as g,P as x,A as b,Q as k,R as S,S as C,T as j,U as w,V as y,p as A,k as I,W as P,r as L,X as E,Y as B}from"./vendor-0e9af1fe.js";import{A as M}from"./index-eee59154.js";import{u as z,_ as K}from"./index-839bed62.js";const R=a=>(A("data-v-71713b13"),a=a(),I(),a),$=R((()=>f("img",{class:"channel-img",src:"https://cdn.discordapp.com/icons/464395429392678912/401026c51da58472a16c650ee263701d.webp?size=160",alt:""},null,-1))),q=R((()=>f("div",{class:"listItem-3SmSlK"},[f("div",{class:"guildSeparator-a4uisj"})],-1))),D=R((()=>f("div",{class:"listItem-3SmSlK"},[f("div",{class:"guildSeparator-a4uisj"})],-1))),F=K(a({__name:"index",setup(a){const A=z(),I=()=>!0,P=e(!0),L=_(),E=s([]);t((()=>{B()}));const B=async()=>{const a=await M.getAsideSidebarList();E.push(...a.data)},K=()=>"/main"===L.currentRoute.value.path.slice(0,5);return L.afterEach((a=>{K()?(()=>{const a=document.getElementById("rePathClass");a&&a.classList.add("is-active")})():(()=>{const a=document.getElementById("rePathClass");a&&a.classList.remove("is-active")})()})),(a,e)=>{const s=v,t=g,_=x,B=b,M=k,z=S,R=C;return l(),n(R,{width:"90px",class:"main-aside"},{default:i((()=>[c(z,{"default-active":"/main/@me",collapse:P.value,router:"",class:m(["el-menu-vertical-demo",{"is-active":K}])},{default:i((()=>[c(_,{index:"/main/@me",id:"rePathClass"},{default:i((()=>[c(s,{"raw-content":"","hide-after":50,class:"box-item",effect:"dark",content:"私信",placement:"right",enterable:!1},{default:i((()=>[$])),_:1}),d(A).getPrivateLetterCount.length>0?(l(),n(t,{key:0,max:99,value:d(A).getPrivateLetterCount.length,class:"item-message"},null,8,["value"])):r("",!0)])),_:1}),q,(l(!0),o(h,null,u(E,(e=>(l(),n(_,{key:e.id,index:"/channels/"+e.id,class:m({"is-active":a.$route.path==="/channels/"+e.id}),onClick:a=>(a=>{L.push(`/channels/${a.id}`)})(e)},{title:i((()=>[f("span",null,p(e.name),1)])),default:i((()=>[c(B,{class:"channel-img",size:50,src:e.img,onError:I},null,8,["src"]),e.count>0?(l(),n(t,{key:0,max:99,value:e.count,class:"item-message"},null,8,["value"])):r("",!0)])),_:2},1032,["index","class","onClick"])))),128)),c(s,{"hide-after":50,class:"box-item",effect:"dark",content:"创建组",placement:"right",enterable:!1},{default:i((()=>[c(_,{index:"1",class:"add-icon"},{default:i((()=>[c(M,null,{default:i((()=>[c(d(j),{class:"icon"})])),_:1})])),_:1})])),_:1}),c(s,{"hide-after":50,class:"box-item",effect:"dark",content:"探索公共组",placement:"right",enterable:!1},{default:i((()=>[c(_,{index:"2",class:"add-icon"},{default:i((()=>[c(M,null,{default:i((()=>[c(d(w),{class:"icon"})])),_:1})])),_:1})])),_:1}),D,c(s,{"hide-after":50,class:"box-item",effect:"dark",content:"下载App",placement:"right",enterable:!1},{default:i((()=>[c(_,{index:"3",class:"add-icon"},{default:i((()=>[c(M,null,{default:i((()=>[c(d(y),{class:"icon"})])),_:1})])),_:1})])),_:1})])),_:1},8,["collapse","class"])])),_:1})}}}),[["__scopeId","data-v-71713b13"]]),N=K(a({__name:"index",setup:a=>(a,e)=>{const s=L("router-view"),t=E,d=B,r=P;return l(),n(r,{class:"main-box"},{default:i((()=>[c(F,{class:"channel-sidebar"}),c(d,{class:"main-box-right"},{default:i((()=>[c(t,{span:4,class:"leftAside"},{default:i((()=>[c(s,{name:"leftAside"})])),_:1}),c(t,{span:20,class:"rightMain"},{default:i((()=>[c(s,{name:"rightMain"})])),_:1})])),_:1})])),_:1})}}),[["__scopeId","data-v-f52fa519"]]);export{N as default};
