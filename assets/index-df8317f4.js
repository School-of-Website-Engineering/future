import{g as a,B as s,q as e,T as t,c as l,w as i,a1 as n,o as d,s as o,u as r,n as u,x as c,h as f,v as p,i as m,D as h,l as _,F as x,S as v,I as b,J as g,H as k,a4 as J,X as j,a2 as S,a3 as y,j as P,A as w,a5 as D,a6 as N,a7 as R,a8 as C,p as $,k as A}from"./vendor-02b3194e.js";import{b as F,a as L,d as T,r as q,_ as V}from"./index-c7dd9071.js";import{A as B}from"./index-f3fab378.js";const I=a=>($("data-v-95a45c5f"),a=a(),A(),a),U=I((()=>_("span",null,"好友",-1))),z={key:0,class:"msgNum"},H=I((()=>_("span",null,"Box",-1))),X=I((()=>_("span",null,"私信",-1))),E=I((()=>_("span",null,"+",-1))),G={class:"private-message-user-box"},K={class:"private-message-user-box-flex"},M={class:"private-message-user-box-flex-left"},O={class:"private-message-user-box-flex-right"},Q={class:"private-message-user-box-flex-right-top"},W=I((()=>_("span",null,[_("p",null,"鸡你太美"),_("p",null,"#1237")],-1))),Y=I((()=>_("i",{class:"fa-solid fa-microphone-slash"},null,-1))),Z=I((()=>_("i",{class:"fa-solid fa-headphones"},null,-1))),aa=I((()=>_("i",{class:"fa-solid fa-gear"},null,-1))),sa=V(a({__name:"index",setup(a){const $=F(),A=s(!1),V=[{date:"2016-05-02",name:"John Smith",address:"No.1518,  Jinshajiang Road, Putuo District"},{date:"2016-05-04",name:"John Smith",address:"No.1518,  Jinshajiang Road, Putuo District"},{date:"2016-05-01",name:"John Smith",address:"No.1518,  Jinshajiang Road, Putuo District"},{date:"2016-05-03",name:"John Smith",address:"No.1518,  Jinshajiang Road, Putuo District"}],I=e([]);t((()=>{sa()}));const sa=L((async()=>{const{data:a}=await B.getAsidePrivateUserList();I.push(...a.sidebarList)})),ea=L((async a=>{await q.push(`/main/@me/${a.id}`)}));return(a,s)=>{const e=v,t=b,F=g,L=k,q=J,B=j,sa=S,ta=y,la=n,ia=P,na=w,da=T,oa=D,ra=N;return d(),l(la,null,{default:i((()=>[o(q,{class:"main-box-right-header1"},{default:i((()=>[o(e,{class:"search-btn",text:"",onClick:s[0]||(s[0]=a=>A.value=!0)},{default:i((()=>[r("寻找或开始新的对话")])),_:1}),o(L,{modelValue:A.value,"onUpdate:modelValue":s[1]||(s[1]=a=>A.value=a),title:"Shipping address"},{default:i((()=>[o(F,{data:V},{default:i((()=>[o(t,{property:"date",label:"Date",width:"150"}),o(t,{property:"name",label:"Name",width:"200"}),o(t,{property:"address",label:"Address"})])),_:1})])),_:1},8,["modelValue"])])),_:1}),o(ra,{class:"main-box-right-main1"},{default:i((()=>[o(la,{class:"main-box-right-main1-flex"},{default:i((()=>[o(q,{class:"Friends-private-message"},{default:i((()=>[o(la,{class:"friends-top friends-top-head"},{default:i((()=>[o(ta,{class:u(["friends-top-flex","/main/@me"===a.$route.path?"is-active":""]),onClick:s[2]||(s[2]=()=>{a.$router.push("/main/@me")})},{default:i((()=>[o(sa,{span:12},{default:i((()=>[o(B,null,{default:i((()=>[o(c(R))])),_:1}),U,c($).handlePendingFriendsRequestList.length?(d(),f("i",z,p(c($).handlePendingFriendsRequestList.length),1)):m("",!0)])),_:1})])),_:1},8,["class"]),o(ta,{class:u(["friends-top-flex","/main/Store"===a.$route.path?"is-active":""]),onClick:s[3]||(s[3]=()=>{a.$router.push("/main/Store")})},{default:i((()=>[o(sa,{span:12},{default:i((()=>[o(B,null,{default:i((()=>[o(c(C))])),_:1}),H])),_:1})])),_:1},8,["class"])])),_:1}),o(la,{class:"friends-top"},{default:i((()=>[o(ta,{class:"friends-top-title"},{default:i((()=>[X,o(ia,{"hide-after":50,class:"box-item",effect:"dark",content:"创建私信",placement:"top"},{default:i((()=>[E])),_:1})])),_:1}),(d(!0),f(x,null,h(I,(a=>(d(),l(ta,{class:"friends-top-flex",onClick:s=>c(ea)(a),key:a.id},{default:i((()=>[_("div",G,[_("div",K,[_("div",M,[o(na,{src:a.avatar},null,8,["src"]),o(da,{status:a.status,statusText:a.statusText},null,8,["status","statusText"])]),_("div",O,[_("div",Q,[_("span",null,p(a.name),1)])])])])])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1}),o(oa,null,{default:i((()=>[o(ta,{class:"bottom-profile"},{default:i((()=>[o(sa,{span:12,class:"bottom-profile-avatar"},{default:i((()=>[o(na,{src:"https://cdn.discordapp.com/avatars/1042734257149329418/5ab3131122ac145db5f2edf29e5a7730.webp?size=48",class:"bottom-profile-avatar-img"}),W])),_:1}),o(sa,{span:12,class:"bottom-profile-avatar"},{default:i((()=>[o(ia,{"hide-after":50,class:"box-item",effect:"dark",content:"取消静音",placement:"top"},{default:i((()=>[Y])),_:1}),o(ia,{"hide-after":50,class:"box-item",effect:"dark",content:"耳机静音",placement:"top"},{default:i((()=>[Z])),_:1}),o(ia,{"hide-after":50,class:"box-item",effect:"dark",content:"设置",placement:"top"},{default:i((()=>[aa])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})}}}),[["__scopeId","data-v-95a45c5f"]]);export{sa as default};
