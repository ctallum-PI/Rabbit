import{_ as u,l as v,m as w,o as c,c as d,b as i,p as b,F as g,q as k,a as m,w as I,s as y,t as p,f as C,r as h,u as _,T as x,h as $}from"./index-ByJMXL5z.js";const T={name:"Webcam",props:{rememberDevice:{type:Boolean,default:!0},preferCamerasWithLabel:{type:Array,default:["back","usb"]},classList:{type:String,default:"w-full h-auto"},constraints:{type:Object,default:{video:{width:{ideal:2560},height:{ideal:1440}},facingMode:"environment"}},tryToRotateImage:{type:Boolean,default:!0},imageType:{type:String,default:"image/jpeg"},rememberDeviceTokenName:{type:String,default:"_vwl_device_id"},autoStart:{type:Boolean,default:!0},audio:{type:Boolean,default:!0},shutterEffect:{type:Boolean,default:!0}},data(){return{deviceId:null,cameras:[],innited:!1}},emits:["clear","stop","start","pause","resume","error","unsupported","init","photoTaken"],async mounted(){this.setupMedia(),v.init()},beforeUnmount(){this.stop()},methods:{init(){this.innited||(this.deviceId===null&&this.autoStart&&this.start(),this.$emit("init",this.deviceId),this.innited=!0)},loadCameras(){navigator.mediaDevices.enumerateDevices().then(e=>{for(let t=0;t!==e.length;++t){let a=e[t];a.deviceId&&a.kind==="videoinput"&&this.cameras.find(o=>o.deviceId===a.deviceId)===void 0&&this.cameras.push(a)}}).then(()=>{!this.innited&&this.cameras.length>0&&(this.deviceId===null&&this.autoStart&&this.start(),this.$emit("init",this.deviceId),this.innited=!0)}).catch(e=>this.$emit("unsupported",e))},changeCamera(e){if(this.deviceId!==e){this.deviceId=e;return}this.stop(),e&&this.loadCamera(e)},loadCamera(e){navigator.mediaDevices.getUserMedia(this.buildConstraints(e)).then(t=>{this.$refs.video.srcObject=t,this.rememberDevice&&window.localStorage.setItem(this.rememberDeviceTokenName,e)}).catch(t=>this.$emit("error",t))},legacyGetUserMediaSupport(){return e=>{let t=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia;return t?new Promise(function(a,o){t.call(navigator,e,a,o)}):Promise.reject(new Error("getUserMedia is not implemented in this browser"))}},testMediaAccess(){navigator.mediaDevices.getUserMedia(this.buildConstraints()).then(e=>{e.getTracks().forEach(a=>{a.stop()}),this.loadCameras()}).catch(e=>this.$emit("error",e))},setupMedia(){navigator.mediaDevices===void 0&&(navigator.mediaDevices={}),navigator.mediaDevices.getUserMedia===void 0&&(navigator.mediaDevices.getUserMedia=this.legacyGetUserMediaSupport()),this.testMediaAccess()},clear(e){e.srcObject.getTracks().forEach(t=>{t.stop(),this.$refs.video.srcObject=null,this.source=null}),this.$emit("clear")},stop(){var e;(e=this.$refs.video)!=null&&e.srcObject&&this.clear(this.$refs.video),this.$emit("stop")},start(){if(this.deviceId)this.loadCamera(this.deviceId);else{const e=window.localStorage.getItem(this.rememberDeviceTokenName);if(e&&this.rememberDevice&&this.cameras.find(t=>t.deviceId===e))this.deviceId=e;else if(this.cameras.length>1)for(const t of this.preferCamerasWithLabel){const a=this.cameras.find(o=>o.label.toLowerCase().indexOf(t)!==-1);if(a){this.deviceId=a.deviceId;break}}!this.deviceId&&this.cameras.length>0&&(this.deviceId=this.cameras[0].deviceId)}this.$emit("start")},pause(){var e;(e=this.$refs.video)!=null&&e.srcObject&&this.$refs.video.pause(),this.$emit("pause")},resume(){var e;(e=this.$refs.video)!=null&&e.srcObject&&this.$refs.video.play(),this.$emit("resume")},buildConstraints(e){const a={...{video:!0,audio:!1},...this.constraints};return e&&((typeof a.video!="object"||a.video===null)&&(a.video={}),a.video.deviceId={exact:e}),a},async takePhoto(){let e=this.$refs.video,t=this.$refs.canvas;t.height=e.videoHeight/4,t.width=e.videoWidth/4;let a=t.getContext("2d");w(e,t,a,this.tryToRotateImage?v.getDeviceOrientation():0);let o=t.toDataURL(this.imageType);t.toBlob(n=>{this.audio&&this.$refs.audio.play(),this.shutterEffect&&(this.$refs.shutter.classList.add("on"),setTimeout(()=>{this.$refs.shutter.classList.remove("on")},30*2+45)),this.$emit("photoTaken",{blob:n,image_data_url:o})},this.imageType)}},watch:{deviceId:function(e){this.changeCamera(e)}}},D={ref:"canvas",style:{display:"none"}},M={class:"hidden"},A={ref:"audio",volume:"0.5",src:"https://www.soundjay.com/mechanical/camera-shutter-click-08.mp3"},L={ref:"shutter",class:"shutter"};function P(e,t,a,o,n,s){return c(),d(g,null,[i("video",b({ref:"video",class:["w-full h-auto",[{hidden:!n.deviceId},...a.classList.split(" ")]],autoplay:""},e.$attrs),null,16),i("canvas",D,null,512),i("div",M,[i("audio",A,null,512)]),i("div",L,null,512)],64)}const S=u(T,[["render",P],["__scopeId","data-v-c46dec7b"]]),U="data:image/svg+xml,%3csvg%20id='Layer_1'%20data-name='Layer%201'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20122.88%2090.46'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill-rule:evenodd;%20fill:%20white;}%3c/style%3e%3c/defs%3e%3ctitle%3ecamera-setting%3c/title%3e%3cpath%20class='cls-1'%20d='M36.8,51.32a2.15,2.15,0,0,0-3.08,0l-2.35,2.34a16,16,0,0,0-2-1.08,21.31,21.31,0,0,0-2.13-.83V48.14A2.15,2.15,0,0,0,25.07,46H20.55A2.11,2.11,0,0,0,19,46.6a2.09,2.09,0,0,0-.65,1.54v3.31a14.61,14.61,0,0,0-2.19.67,17.92,17.92,0,0,0-2,.93l-2.6-2.56a2,2,0,0,0-1.5-.65,2.14,2.14,0,0,0-1.55.65L5.35,53.66a2.14,2.14,0,0,0,0,3.09L7.69,59.1a15.21,15.21,0,0,0-1.08,2,19.13,19.13,0,0,0-.83,2.13H2.17a2.11,2.11,0,0,0-1.54.63A2.09,2.09,0,0,0,0,65.39v4.53a2.14,2.14,0,0,0,.63,1.52,2.11,2.11,0,0,0,1.54.64h3.3a15.49,15.49,0,0,0,.68,2.19,17.61,17.61,0,0,0,.93,2.07L4.51,78.9a2,2,0,0,0-.65,1.51A2.17,2.17,0,0,0,4.51,82l3.18,3.21a2.25,2.25,0,0,0,3.08,0l2.36-2.39a14.64,14.64,0,0,0,2,1.09c.7.31,1.41.59,2.13.83v3.6a2.09,2.09,0,0,0,.63,1.54,2.05,2.05,0,0,0,1.54.63h4.52a2.19,2.19,0,0,0,2.17-2.17V85a17.38,17.38,0,0,0,2.19-.67,21.48,21.48,0,0,0,2.07-.94L32.93,86a2,2,0,0,0,1.52.65A2,2,0,0,0,36,86l3.21-3.18a2.25,2.25,0,0,0,0-3.08L36.8,77.34a15.33,15.33,0,0,0,1.08-2,19,19,0,0,0,.83-2.12h3.61a2.06,2.06,0,0,0,1.54-.64A2.09,2.09,0,0,0,44.49,71V66.52A2.13,2.13,0,0,0,43.86,65a2.07,2.07,0,0,0-1.54-.65H39a18.08,18.08,0,0,0-.68-2.17,15.37,15.37,0,0,0-.93-2L40,57.53a2,2,0,0,0,.66-1.5A2.11,2.11,0,0,0,40,54.48L36.8,51.32ZM58.63,0H95.5l8.4,15h17.31a1.69,1.69,0,0,1,1.67,1.68V75.06a1.71,1.71,0,0,1-1.67,1.67H49.45a8.89,8.89,0,0,0,1.29-2.21A9.06,9.06,0,0,0,51.45,71V66.52a9.18,9.18,0,0,0-2.59-6.33L48.67,60a9.68,9.68,0,0,0-1.53-1.21A8.86,8.86,0,0,0,47.58,56a9,9,0,0,0-.73-3.55c-.1-.23-.22-.46-.34-.68a9.45,9.45,0,0,0-1.62-2.21l-3.2-3.19a9.13,9.13,0,0,0-2.94-2,6.49,6.49,0,0,0-.74-.26,8.73,8.73,0,0,0-4.84-.2L33,43.62a9,9,0,0,0-1.45-1.91l0,0a8.93,8.93,0,0,0-3-2l-.38-.14a8.93,8.93,0,0,0-3-.53H20.55a8.62,8.62,0,0,0-1.53.13V16.68A1.68,1.68,0,0,1,20.69,15h7.79V9.64h9.61V15H48.54Q51.8,8.57,55.06,2.14C56.38-.48,55.65,0,58.63,0ZM75.35,26.79a16.52,16.52,0,1,1-11.69,4.84,16.47,16.47,0,0,1,11.69-4.84Zm7.4,9.13a10.45,10.45,0,1,0,3.07,7.4,10.45,10.45,0,0,0-3.07-7.4ZM112.06,22.4a5,5,0,1,1-5,5,5,5,0,0,1,5-5Zm-36.71-4a25,25,0,1,1-25,25,25,25,0,0,1,25-25Zm-53.1,41A9,9,0,0,1,25.7,60a9.09,9.09,0,0,1,2.83,1.9,9.19,9.19,0,0,1,1.89,2.82,9,9,0,0,1,0,6.91,9.23,9.23,0,0,1-1.89,2.83,9.36,9.36,0,0,1-2.83,1.89,9,9,0,0,1-6.91,0A9.36,9.36,0,0,1,16,74.5a9.12,9.12,0,0,1-1.89-2.83,9,9,0,0,1,0-6.91A8.8,8.8,0,0,1,18.79,60a9,9,0,0,1,3.46-.68Z'/%3e%3c/svg%3e",j="data:image/svg+xml,%3csvg%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20opacity='0.01'%20width='64'%20height='64'%20fill='%23D8D8D8'/%3e%3ccircle%20cx='32'%20cy='32'%20r='23'%20fill='%23FAFAFA'/%3e%3ccircle%20cx='32'%20cy='32'%20r='30.5'%20stroke='%23FAFAFA'%20stroke-width='3'/%3e%3c/svg%3e",V="data:image/svg+xml,%3csvg%20width='48'%20height='48'%20viewBox='0%200%2048%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20opacity='0.01'%20width='48'%20height='48'%20fill='%23D8D8D8'/%3e%3ccircle%20cx='24'%20cy='24'%20r='23'%20stroke='white'%20stroke-width='2'/%3e%3crect%20opacity='0.01'%20x='12'%20y='12'%20width='24'%20height='24'%20fill='%23D8D8D8'/%3e%3cpath%20d='M20%2021H28V33C28%2034.1046%2027.1046%2035%2026%2035H22C20.8954%2035%2020%2034.1046%2020%2033V21Z'%20stroke='white'%20stroke-width='2'%20stroke-linecap='square'%20stroke-linejoin='round'/%3e%3cpath%20d='M23.25%2024.5V27.5'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M30.6153%2014C31.8592%2014%2032.7824%2015.1241%2032.3532%2016.2915C31.6024%2018.3331%2030.1127%2021%2027.4526%2021C23.1429%2021%2024.8571%2021%2020.5474%2021C17.8873%2021%2016.3976%2018.3331%2015.6468%2016.2915C15.2176%2015.1241%2016.1408%2014%2017.3847%2014H30.6153Z'%20stroke='white'%20stroke-width='2'%20stroke-linecap='square'%20stroke-linejoin='round'/%3e%3c/svg%3e",B={components:{Webcam:S},props:{reloadCamerasButton:{type:Object,default:{display:!1,text:"Reload cameras",css:"inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}},takePhotoButton:{type:Object,default:{display:!0,text:"Take a photo",css:"inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}},selectCameraLabel:{type:String,default:"Select camera..."}},data(){return{cameras:[],deviceId:"",fullscreen:!1,photoTaken:!1,photoFailed:!1,reloadCamInterval:null}},emits:["clear","stop","start","pause","resume","error","unsupported","init","photoTaken","fullscreen"],beforeUnmount(){this.reloadCamInterval&&clearInterval(this.reloadCamInterval),this.exit()},methods:{async takePhoto(){try{await this.$refs.webcam.takePhoto(),this.photoTaken=!0,setTimeout(()=>{this.photoTaken=!1},500)}catch{this.photoFailed=!0,setTimeout(()=>{this.photoFailed=!1},500)}},loadCameras(){this.$refs.webcam.loadCameras(),this.cameras=this.$refs.webcam.cameras},webcamInit(e){this.deviceId=e,this.$emit("init",this.deviceId)},setCamera(){this.$refs.webcam.changeCamera(this.deviceId===""?null:this.deviceId)},flipCamera(){if(this.loadCameras(),this.cameras.length>1){let t=this.cameras.findIndex(a=>a.deviceId===this.deviceId)+1;t>=this.cameras.length&&(t=0),this.deviceId=this.cameras[t].deviceId,this.$refs.webcam.changeCamera(this.cameras[t].deviceId)}},exit(){this.$refs.webcam.stop()},clear(){this.$emit("clear")},stop(){this.$emit("stop")},start(){this.$emit("start")},pause(){this.$emit("pause")},resume(){this.$emit("resume")},error(e){this.$emit("error",e)},unsupported(e){this.$emit("unsupported",e)},photoTakenEvent({blob:e,image_data_url:t}){this.$emit("photoTaken",{blob:e,image_data_url:t})}},mounted(){this.cameras=this.$refs.webcam.cameras,this.cameras.length===0&&(this.reloadCamInterval=setInterval(()=>{this.loadCameras(),this.cameras.length>0&&(clearInterval(this.reloadCamInterval),this.$refs.webcam.init())},1e3))},watch:{fullscreenState:{immediate:!0,handler:function(e){this.fullscreen=e}}}},O={class:"camera-preview"},E={class:"camera-region"},H={class:"below-camera"},F={value:""},Z=["value"];function R(e,t,a,o,n,s){const l=k("Webcam");return c(),d("div",O,[i("div",E,[m(l,{ref:"webcam",onInit:s.webcamInit,onClear:s.clear,onStop:s.stop,onStart:s.start,onPause:s.pause,onResume:s.resume,onError:s.error,onUnsupported:s.unsupported,onPhotoTaken:s.photoTakenEvent,shutterEffect:n.fullscreen},null,8,["onInit","onClear","onStop","onStart","onPause","onResume","onError","onUnsupported","onPhotoTaken","shutterEffect"]),t[4]||(t[4]=i("div",{class:"focus-box"},null,-1))]),i("div",H,[t[6]||(t[6]=i("img",{class:"camera-setting",src:U},null,-1)),i("div",{style:{flex:"1","align-items":"center"},onClick:t[2]||(t[2]=(...r)=>s.loadCameras&&s.loadCameras(...r))},[I(i("select",{onChange:t[0]||(t[0]=(...r)=>s.setCamera&&s.setCamera(...r)),"onUpdate:modelValue":t[1]||(t[1]=r=>n.deviceId=r),class:"camera-select"},[i("option",F,p(a.selectCameraLabel),1),(c(!0),d(g,null,C(n.cameras,r=>(c(),d("option",{value:r.deviceId},p(r.label),9,Z))),256))],544),[[y,n.deviceId]])]),i("button",{onClick:t[3]||(t[3]=(...r)=>s.takePhoto&&s.takePhoto(...r)),class:"photo-button"},t[5]||(t[5]=[i("img",{src:j},null,-1)])),t[7]||(t[7]=i("img",{style:{width:"48px",height:"48px","margin-right":"20px"},src:V},null,-1))])])}const W=u(B,[["render",R],["__scopeId","data-v-f7b024d4"]]),G={class:"page"},N={class:"content"},q={__name:"PictureOfDeliveryView",setup(e){const t=h("Photo"),a=h("/summary"),o=h("/deliver-to"),n=_(),s=$();function l(r){n.savePhoto(r),s.push(a.value)}return(r,f)=>(c(),d("div",G,[m(x,{pageTitle:t.value,prevPage:o.value,backArrow:!0,chatIcon:!0},null,8,["pageTitle","prevPage"]),i("div",N,[f[0]||(f[0]=i("div",{class:"top-bar"},[i("p",{class:"info-text"},"Step back and capture the package in the white frame")],-1)),m(W,{onPhotoTaken:l,classList:"camera-preview"})])]))}},Q=u(q,[["__scopeId","data-v-4909f88f"]]);export{Q as default};