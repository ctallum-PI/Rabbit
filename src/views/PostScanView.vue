<script setup>
import { ref, computed, onMounted } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheNextButton from '@/components/TheNextButton.vue'
import TheScanNextButton from '@/components/TheScanNextButton.vue'
import { usePackageStore } from '@/stores/packages';
import { RabbitData } from '@/data/RabbitData'
import { useRouter } from 'vue-router';
const page_title = ref('Deliver')
const next_page = ref('/deliver-to')
const prev_page = ref('/scan')
const next_page_button = ref('Continue')

const packageStore = usePackageStore()

const stopData = RabbitData[packageStore.stopNumber]

const numPackages = computed(() => {
  return packageStore.packagesScanned.filter(Boolean).length
})

onMounted(() => {
  if (packageStore.packagesToDeliver.filter(Boolean).length == 0){
    const router = useRouter()
    router.push('/scan')
  }
})

function nToDeliver () {
  return packageStore.activelyBeingDelivered.filter(Boolean).length
}

function nextPageButton () {
  if (packageStore.activelyBeingDelivered.filter(Boolean).length == 0){
    return ref("Continue")
  } 
  if (nToDeliver() == 1) {
    return ref(`Continue with ${nToDeliver()} package`)
  } 
  else {
    return ref(`Continue with ${nToDeliver()} packages`)
  }
}

const isBlocked = computed(() => {
  return packageStore.activelyBeingDelivered.filter(Boolean).length == 0
})

</script>

<template>
  <div class="page">
    <TheHeader :page_title='page_title' :prev_page="prev_page" :back_arrow="true" :chat_icon="true"></TheHeader>
    <div class="content">
      <div class="map-region">
        <img class="background" src="../assets/overview/overview-map.png"/>
        <img class="svg" src="../assets/overview/pin-1.svg" style="width: 10%; top: 50%; left: 60%"/>
        <img class="svg" src="../assets/overview/pin-2.svg" style="width: 10%; top: 20%; left: 65%"/>
        <img class="svg" src="../assets/overview/loc.svg" style="width: 10%; left: 46%; top: 58%"/>
        <div style="height:287.233px"></div>
      </div>
      <div class="info-region">
        <div class="drag-bar"></div>
        <div class="deliver-info">
          <div class="text">
            <h1> Deliver {{ nToDeliver() }} packages </h1>
            <h2> 8:00 AM - 5:00 PM </h2>
          </div>
          <button class="orange-button">
            <img src="../assets/pre-travel/notes.svg" style="width:16px"/>
          </button>
          <button class="orange-button">
            <img src="../assets/pre-travel/key.svg" style="width: 24px;"/>
          </button>
        </div>
      </div>
      <div class="package-notes-region">
        <div class="checkbox-region">
          <p style="font-size: 16; font-weight: 700;">Select a location </p>
          <button style="height: 24px; width: 24px; margin-right: 20px "></button>
        </div>
        <div class="package-note-outer" v-for="(package_info, idx) in stopData.packageData" :key="idx">
          <div class="package-note" v-if="packageStore.packagesToDeliver[idx]">
            <div class="notes-content">
              <div class="stop-number">
                <div class="circle"></div>
                <p> {{ idx+1 }}</p>
              </div>
              <div class="stop-details">
                <div class="top-row">
                  <h1 style="flex: 1">{{ stopData.address.streetAddress }} {{ package_info.subAddress }}</h1>
                  <button :class="{'filled': packageStore.activelyBeingDelivered[idx]}" @click="packageStore.activateDelivery(idx)"></button>
                </div>
                <h2 style="position: relative; top: -8px">{{ package_info.name }}</h2>
                
                <div class="list">
                  <img class="svg" src="../assets/notes/star.svg"/>
                  <h2>Recipient Required</h2>
                </div>
                <div style="border-radius: 10px; border: 1px solid #bbc0c1; width: 95px; height: 20px; display: flex; align-items: center; justify-content:space-around;">
                  <div style="background-color: #bbc0c1; width: 12px; height: 12px; border-radius: 6px;"></div>
                  <p style="font-size: 14px;">GRY-123</p>
                </div>
                <div class="list">
                  <img class="svg" src="../assets/overview/box.svg" style="width: 20px"/>
                  <h2 style="flex: 1"> ({{ package_info.boxSize }}) Box</h2>
                  <div style="background-color: #fee966; padding: 0px 4px ;">
                    <p>{{ package_info.boxNumber }}</p>
                  </div>
                </div>
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


.map-region {
  display: flex;
  width: 100%;
  height: auto;
  position: relative;
}

.map-region .background {
  position: absolute;
  width: 100%;
  height: auto;
  
}

.svg{
  position: absolute;
}


.info-region{
  position: relative;
  width: 100%;
  border-top: 2px solid #bbc0c1;
  top: -5px;
  z-index: 2;
  background-color: white;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  
}

.info-region .drag-bar{
  width: 10%;
  height: 5px;
  background-color: #bbc0c1;
  border-radius: 5px;
  margin-top: 12px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

}

.info-region .deliver-info{
  display: flex;
  padding: 15px;
  align-items: center;
  gap: 10px;
}

.info-region .deliver-info .orange-button{
  width: 48px;
  height: 48px;
  background: none;
  border-radius: 5px;
  border: 3px solid #ff7817;
  display: flex;
  justify-content: center;
  align-items: center;

}
.info-region .deliver-info .text{
  flex: 1
}

.info-region .deliver-info .text h1{
  font-size: 20px;
  font-weight: 700;
}

.info-region .deliver-info .text h2{
  font-size: 14px;
  color: #6C7778;
}

.checkbox-region{
  display: flex; 
  align-items: center; 
  justify-content: flex-end;
  height: 40px; 
  padding-top: 10px;
  padding-left: 7px;
  padding-right: 7px;
  padding-top: 7px;
  gap: 10px
}

.package-notes-region{
  width: 100%;
  background-color: #f9fafa;
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
  justify-content:space-between;
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
  flex: 1;
}

.top-row{
  display: flex;
  align-items: center;
  height: 32px;
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

.top-row button{
  width: 24px;
  height: 24px;
  margin-right: 4px;
  background-color: white;
  border: 1px solid #6C7778;
  border-radius: 5px;
}

.top-row button.filled{
  background-color: #0d99ff;
}


</style>
