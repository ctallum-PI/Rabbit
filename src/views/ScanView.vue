<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheScanNextButton from '@/components/TheScanNextButton.vue'
import { RabbitData } from '@/data/RabbitData'
import { ref, computed, onMounted} from 'vue'
import { usePackageStore } from '@/stores/packages';
import { useRouter } from 'vue-router';
import { StreamBarcodeReader } from 'vue-barcode-reader';

// Page Details
const page_title = ref('Scan')
const next_page = ref('/post-scan')
const prev_page = ref('/overview')

// Package Store
const packageStore = usePackageStore()

// Package Data
const stop_data = RabbitData[packageStore.stopNumber]

const displaySuccess = ref(false)
const displayRepeat = ref(false)

function scanPackage(index) {
  if (!packageStore.packagesScanned[index]){
    packageStore.scanPackage(index)
    // trigger success stuff
    displaySuccess.value = true;
    setTimeout( () => {
      displaySuccess.value = false;
    },1000);
  } else {
    // trigger repeat stuff
    displayRepeat.value = true;
    setTimeout( () => {
      displayRepeat.value = false;
    }, 1000)
  }
}


const nScanned = computed(() => {
  return packageStore.packagesScanned.filter(Boolean).length
})

const isBlocked = computed(() => {
  return packageStore.packagesToDeliver.filter(Boolean).length == 0
})

function nToDeliver () {
  return packageStore.packagesToDeliver.filter(Boolean).length
}


function nextPageButton () {
  if (packageStore.packagesToDeliver.filter(Boolean).length == 0){
    return ref("Continue")
  } 
  if (nToDeliver() == 1) {
    return ref(`Continue with ${nToDeliver()} package`)
  } 
  else {
    return ref(`Continue with ${nToDeliver()} packages`)
  }

}

onMounted(() => {
  if (packageStore.packagesDelivered.filter(Boolean).length == packageStore.nPackages){
    const router = useRouter()
    packageStore.initialize(packageStore.stopNumber + 1)
    router.push("/")
  }
})

function onDecode (result) {
  stop_data.packageData.forEach((item, index) =>{
    if (item.code == result){
      scanPackage(index);
    }
  })
}

</script>



<template>
  <div class="page">
    <TheHeader :page_title='page_title' :prev_page="prev_page" :back_arrow="true" :chat_icon="true"></TheHeader>
    <div class="content">
      <div class="scan-region">
        <StreamBarcodeReader @decode="onDecode"></StreamBarcodeReader>
        <div class="success-banner" v-if="displaySuccess">
          <div class="text-banner">
            <img src="../assets/scan/Alert-Success.svg" class="svg">
            <p style="font-size: 14px;">Package scanned successfully</p>
          </div>
        </div>
        <div class="repeat-banner" v-if="displayRepeat">
          <div class="text-banner">
            <img src="../assets/scan/alert--danger.svg" class="svg">
            <p style="font-size: 14px;">You've already scanned this package</p>
          </div>
        </div>
      </div>
      <div class="count-indicator">
        <p style="font-size: 14px; color: white; padding-left: 16px"> {{ nScanned }} of {{ stop_data.numPackages }} packages scanned</p>
      </div>

      <div class="box-info-region">
        <div class="package-note" v-for="(package_info, idx) in stop_data.packageData" :key="idx">
          <div class="notes-content">
            <div class="stop-number">
              <div class="circle"></div>
              <p> {{ idx+1 }}</p>
            </div>
            <div class="stop-details">
              <h1>{{ stop_data.address.streetAddress }} {{ package_info.subAddress }}</h1>
              <h2 style="position: relative;">{{ package_info.name }}</h2>
              <div class="list">
                <img class="svg" v-if="packageStore.packagesScanned[idx]" src="../assets/scan/check.svg" style="width:22px">
                <img class="svg" v-else src="../assets/overview/box.svg" style="width: 20px"/>
                <h2 style="flex: 1"> ({{ package_info.boxSize }}) Box</h2>
                <div style="padding: 0px 4px ;">
                  <p>{{ package_info.boxNumber }}</p>
                </div>
                <button :class="{'filled': packageStore.packagesScanned[idx]}" @click="scanPackage(idx)"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 80px; background-color: white;"></div>
    </div>
    <TheScanNextButton :button_name="nextPageButton().value" :link_addr="next_page" :block="isBlocked"></TheScanNextButton>
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

.scan-region{
  width: 100%;
  height: 230px;
  background-color: #252829;
  position: fixed;
  z-index: 10;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}


.text-banner .svg{
  height: 16px;
  width: 16px;
  margin-left: 10px;
}

.success-banner{
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  background-color: rgba(152, 201, 30, 0.5);
}

.success-banner .text-banner{
  position: absolute;
  width: 90%;
  height: 37px;
  background-color: #DCF3A0;
  border: 1px solid #98C91E;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  left: 50%;
  top: 15%;
  transform: translate(-50%,-50%);
  border-radius: 4px;
}

.repeat-banner{
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  background-color: rgba(173, 10, 48, 0.4)
}

.repeat-banner .text-banner{
  position: absolute;
  width: 90%;
  height: 37px;
  background-color: #F9D5E2;
  border: 1px solid #AD0A30;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  left: 50%;
  top: 15%;
  transform: translate(-50%,-50%);
  border-radius: 4px;
}

.count-indicator{
  margin-top: 230px;
  position: fixed;
  width: 100%; 
  height: 36px; 
  background-color: #252829;
  display: flex; 
  align-items: center; 
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.box-info-region{
  background-color: #f9fafa;
  margin-top: 266px;
  padding-top: 5px;
}


.package-note {
  margin: 7px;
  background-color: white;
  border: 1px solid #bbc0c1;
  border-radius: 5px;
}

.notes-content{
  display: flex;
  padding: 15px;
  gap: 10px;
  
}

.stop-number {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 24px;
  height: auto;
  top: 4px

}

.stop-number p {
  font-size: 14px;
  position: absolute;
  text-align: center;
}

.stop-number .circle{
  width: 24px;
  height: 24px;
  background: none;
  border: 2px solid black;
  position: absolute;
  border-radius: 12.5px;
}

.stop-details {
  position: relative;
  flex: 1
}

.stop-details h1 {
  font-size: 20px;
  font-weight: 700;
  vertical-align: top;
}

.stop-details h2 {
  font-size: 16px;
}

.stop-details .list {
  display: flex;
  align-items: flex-start;
  justify-content: left;
  gap: 10px;
  padding: 5px
}

.stop-details .svg {
  position: relative;
  background: none;
  border: none;
  width: 14px;
  top: 12.8px;
  transform: translateY(-50%);
}

button {
  height: 20px;
  width: 20px;
  border-radius: 5px;
  transition-duration: 0.4s;
  background-color: white;
  color: black;
  cursor: pointer;
  border: 2px solid #04AA6D; /* Green */
}

button.filled {
  background-color: #04AA6D; /* Green */
  color: white;
}

</style>