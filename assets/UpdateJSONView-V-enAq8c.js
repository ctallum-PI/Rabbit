import{_ as c,r as o,u as v,j as b,c as m,a as i,T as g,b as a,p as S,q as f,o as _,h as q}from"./index-C0Fc4oYi.js";const y={class:"page"},O={class:"content"},R={class:"submit-region"},J={__name:"UpdateJSONView",setup(N){const u=o("Custom Rabbit Data"),d=q();v();const n=o(),s=o();function l(){let e=new XMLHttpRequest;e.onreadystatechange=()=>{e.readyState==XMLHttpRequest.DONE&&(console.log(e.responseText),d.back())},e.open("PUT","https://api.jsonbin.io/v3/b/6786872ce41b4d34e4775dd2",!0),e.setRequestHeader("Content-Type","application/json"),e.setRequestHeader("X-Master-Key","$2a$10$z.GILkPaijg0YigFzFd3XuS4EGSlrBACsPy6ZzbemdoX/FOjJQCqi"),e.send(s.value)}return b(async()=>{let e=new XMLHttpRequest;e.onreadystatechange=()=>{if(e.readyState==XMLHttpRequest.DONE)if(e.status==200)try{n.value=JSON.parse(e.responseText),s.value=n.value.record}catch(t){console.error("ERROR parsing JSON:",t)}else console.error("Failed to fetch JSON:",e.status,e.statusText)},e.open("GET","https://api.jsonbin.io/v3/b/6786872ce41b4d34e4775dd2/",!0),e.setRequestHeader("X-Master-Key","$2a$10$z.GILkPaijg0YigFzFd3XuS4EGSlrBACsPy6ZzbemdoX/FOjJQCqi"),e.send()}),(e,t)=>{const p=f("JsonEditorVue");return _(),m("div",y,[i(g,{pageTitle:u.value,backArrow:!0,chatIcon:!1,prevPage:"-1"},null,8,["pageTitle"]),a("div",O,[i(p,S({modelValue:s.value,"onUpdate:modelValue":t[0]||(t[0]=r=>s.value=r)},{},{mode:"text",mainMenuBar:!1,indentation:4,tabSize:4}),null,16,["modelValue"]),t[2]||(t[2]=a("div",{style:{width:"100%",height:"80px"}},null,-1))]),a("div",R,[a("button",{onClick:t[1]||(t[1]=r=>l())},"Submit")])])}}},h=c(J,[["__scopeId","data-v-f5b39ff2"]]);export{h as default};