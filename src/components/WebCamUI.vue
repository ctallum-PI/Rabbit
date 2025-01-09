<template>
    <div class="camera-preview">
        <div class="camera-region">
            <Webcam ref="webcam" @init="webcamInit" @clear="clear" @stop="stop" @start="start" @pause="pause" @resume="resume" @error="error" @unsupported="unsupported" @photoTaken="photoTakenEvent" :shutterEffect="fullscreen" />
            <div class="focus-box"></div>
        </div>
       <div class="below-camera">
        <img class="camera-setting" src="../assets/photo/camera-setting-icon.svg"/>
           <div style="flex: 1; align-items: center;" @click="loadCameras">
               <select @change="setCamera" v-model="deviceId" class="camera-select">
                   <option value="">{{selectCameraLabel}}</option>
                   <option v-for="camera in cameras" :value="camera.deviceId">{{camera.label}}</option>
               </select>
           </div>
           <button @click="takePhoto" class="photo-button">
            <img src="../assets/photo/Photo Button.svg"/>
           </button>
           <img style="width: 48px; height: 48px; margin-right: 20px; " src="../assets/photo/flashlight.svg"/>
       </div>

   </div>
</template>

<style scoped>

.camera-preview{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* position: relative; */
}

.camera-region{
    position: absolute;
    /* left: 50%;
    transform: translateX(-50%); */
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
}

.focus-box{
    width: 100px;
    height: 100px;
    position: absolute;
    border: 1px solid white;
    background-color: none;
    left: 50%;
    transform: translateX(-50%);
    margin-top: calc(100vh - 226px - 175px);
    z-index: 3;

}

.below-camera{
    display: flex;
    background-color: #252829;
    height: 100px;
    align-items: center;
    position: absolute;
    width: 100%;
    bottom: 0px;
}

.camera-select{
    position: relative;
    width: 48px;
    height: 48px;
    /* margin-left: 20px; */
    left: -48px;
    border: none;
    background: none;
    opacity: 0;

}

.camera-setting{
    width: 48px;
    height: 48px;
    stroke: white;
    fill: white;
    position: relative;
    margin-left: 20px;
}


.photo-button{
    height: 64px;
    width: 64px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.photo-button .svg {
    background: none;
    height: 64px;
    width: 64px;
}

</style>


<script>
import Webcam from './Webcam.vue';
export default {
   components: { Webcam },
   props: {
       reloadCamerasButton: {
           type: Object,
           default: {
               display: false,
               text: 'Reload cameras',
               css: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
           }
       },
       takePhotoButton: {
           type: Object,
           default: {
               display: true,
               text: 'Take a photo',
               css: 'inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
           }
       },
       selectCameraLabel: {
           type: String,
           default: 'Select camera...'
       },
   },
   data() {
       return {
           cameras: [],
           deviceId: '',
           fullscreen: false,
           photoTaken: false,
           photoFailed: false,
           reloadCamInterval: null,
       }
   },
   emits: ['clear','stop','start','pause','resume', 'error', 'unsupported', 'init', 'photoTaken', 'fullscreen'],
   beforeUnmount() {
       if (this.reloadCamInterval) {
           clearInterval(this.reloadCamInterval)
       }
       this.exit()
   },
   methods: {
       async takePhoto() {
           try {
               await this.$refs.webcam.takePhoto();
               this.photoTaken = true
               setTimeout(() => {
                   this.photoTaken = false
               }, 500);
           } catch (err) {
               this.photoFailed = true
               setTimeout(() => {
                   this.photoFailed = false
               }, 500);
           }
       },
       loadCameras() {
           this.$refs.webcam.loadCameras()
           this.cameras = this.$refs.webcam.cameras;
       },
       webcamInit(deviceId) {
           this.deviceId = deviceId
           this.$emit('init', this.deviceId)
       },
       setCamera() {
           this.$refs.webcam.changeCamera(this.deviceId === '' ? null : this.deviceId)
       },
       flipCamera() {
           this.loadCameras();
           // flipping camera will select the next one from the list, but on most device there will be only 2, if < 2 it will not be shown
           if (this.cameras.length > 1) {
               let currentIndex = this.cameras.findIndex(el => el.deviceId === this.deviceId)
               let newIndex = currentIndex + 1
               if (newIndex >= this.cameras.length) {
                   newIndex = 0;
               }

               this.deviceId = this.cameras[newIndex].deviceId;
               this.$refs.webcam.changeCamera(this.cameras[newIndex].deviceId)
           }
       },
       exit() {
           this.$refs.webcam.stop()
       },


       // emits
       clear() {
           this.$emit('clear')
       },
       stop() {
           this.$emit('stop')
       },
       start() {
           this.$emit('start')
       },
       pause() {
           this.$emit('pause')
       },
       resume() {
           this.$emit('resume')
       },
       error(err) {
           this.$emit('error', err)
       },
       unsupported(err) {
           this.$emit('unsupported', err)
       },
       photoTakenEvent({ blob, image_data_url }) {
           this.$emit('photoTaken', { blob, image_data_url })
       },
   },
   mounted () {
       this.cameras = this.$refs.webcam.cameras;
       if (this.cameras.length === 0) {
           // if no camera found, we will try to refresh cameras list each second until there is some camera
           this.reloadCamInterval = setInterval(() => {
               this.loadCameras()
               if (this.cameras.length > 0) {
                   clearInterval(this.reloadCamInterval)
                   // most likely due to permission, so we init afterwards
                   this.$refs.webcam.init();
               }
           }, 1000);
       }
   },
   watch: {
       fullscreenState: {
           immediate: true,
           handler: function (newVal) {
                   this.fullscreen = newVal
           }
       }
   }
}
</script>