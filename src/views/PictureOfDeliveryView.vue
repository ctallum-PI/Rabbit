<script setup>
import { ref } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import WebCamUI from '@/components/WebCamUI.vue'
import { usePackageStore } from '@/stores/packages';
import { useRouter } from 'vue-router';

const page_title = ref('Photo')
const next_page = ref('/summary')
const prev_page = ref('/deliver-to')

const packageStore = usePackageStore()

const router = useRouter()


function photoTaken (data){
  packageStore.savePhoto(data)
  router.push(next_page.value)

}


</script>

<template>
  <div class="page">
    <TheHeader :page_title='page_title' :prev_page="prev_page" :back_arrow="true" :chat_icon="true"></TheHeader>
    <div class="content">
      <div class="top-bar">
        <p class="info-text">Step back and capture the package in the white frame</p>
      </div>
      <WebCamUI @photoTaken="photoTaken" classList="camera-preview"  />
    </div>
    <div style="height: 40px; width: 100%"></div>
  </div>
</template>

<style scoped>

.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content{
  margin-top: 56px;
  flex: 1;
}

.top-bar{
  width: 100%;
  height: 70px;
  display: flex;
  background-color: #2C2A2A;
  align-items: center;
  justify-content: center;
}

.top-bar .info-text{
  font-size: 16px;
  color: white;
  padding: 30px;
  /* position...; */
}

.camera-region{
  width: 100%;
  /* height: auto; */
  overflow: hidden;
  bottom: 0px;
}




  
</style>
