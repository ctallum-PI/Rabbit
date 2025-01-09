<script setup>
import { ref } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheNextButton from '@/components/TheNextButton.vue'
import { usePackageStore } from '@/stores/packages'
import { RabbitData } from '@/data/RabbitData'
import TheScanNextButton from '@/components/TheScanNextButton.vue'
const page_title = ref('Itinerary')
const next_page = ref('/pre-travel')
const prev_page = ref('./')

const buttons = ref(['List', 'Map', 'Summary'])
const activeButton = ref(0)

const setActiveButton = (index) => {
  activeButton.value = index
}

const packageStore = usePackageStore();

const nStops = ref(RabbitData.length)
const curStop = ref(packageStore.stopNumber)

function isBlocked(){
  if (curStop.value == nStops.value){
    return true
  }
  return false
}


</script>

<template>
  <div class="page">

    <TheHeader :page_title="page_title" :prev_page='prev_page' :back_arrow="false" :chat_icon="true" />
  
    <div class="content">
      
      <div class="selection">
        <div class="selection-region" v-for="(buttonName, idx) in buttons" :key="idx">
          <button class="selection-button" :key="idx" @click="setActiveButton(idx)">
            {{ buttonName }}
          </button>
          <div :key="idx" v-if="idx == activeButton" class="selection-bar"></div>
        </div>
      </div>
      
      <div class="search-menu">
        <button class="refresh-button">
          <img src="../assets/refresh.svg" class="refresh-svg" />
        </button>
        <div class="search-region">
          <input type="text" class="search-bar" placeholder="Search by tracking ID" />
        </div>
      </div>

      <div class="package-region">
        <div class="stop-details" v-for="(stopInfo, idx) in RabbitData.slice(curStop,nStops)" :key="idx">
          <button class="stop-number">
            <img v-if='idx == 0' src="../assets/green-geopin.svg" class="geopin"/>
            <img v-else src="../assets/black-geopin.svg" class="geopin"/>
            <div class="overlay-text">{{ idx + 1 }}</div>
            <div v-if="idx !== RabbitData.length-1 - curStop" class="vertical-bar-start"></div>
          </button>
          <div class="stop-details-item">
            <div class="text-details">
              <h3 v-if="idx == 0">Next stop:</h3>
              <p>By the end of day</p>
              <h4>{{ stopInfo.address.streetAddress }}</h4>
              <h4>{{ stopInfo.address.city }}</h4>
              <p>Deliver {{ stopInfo.numPackages }} packages</p>
            </div>
            <div class="horizontal-bar"></div>
          </div>
        </div>
      </div>

      <div style="height: 80px; background-color: white;"></div>
    </div>
  
    <TheScanNextButton :button_name="ref('Continue').value" :link_addr="next_page" :block="isBlocked()"/>
  </div>
</template>

<style scoped>

.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  margin-top: 56px;
}

.selection {
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  background-color: #252829;
  justify-content: space-between;
}

.selection-region {
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
}

.selection-button {
  text-align: center;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  color: white;
  justify-content: space-between;
  position: relative;
}
.selection-bar {
  position: absolute;
  bottom: -7px;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: white;
}

.search-menu {
  display: flex;
  height: 50px;
  background-color: #f0f1f2;
  width: 100%;
  align-items: center;
  padding: 12px;
  gap: 12px;
}

.search-region {
  width: 100%;
  padding: 5px;
}

.refresh-button {
  background: none;
  border: none;
}

.search-bar {
  padding: 10px 15px;
  border: none;
  border-radius: 25px;
  font-size: 12px;
  outline: none;
  width: 100%;
  background: url('../assets/search.svg') no-repeat left center;
  background-position: 12.5px center;
  background-size: 18px 18px;
  background-color: white;
  text-indent: 25px;
}

.package-region {
  width: 100%;
  padding: 10px;
}

.stop-number {
  display: flex;
  position: relative;
  border: none;
  background: none;
  align-content: top;
}

.stop-number .geopin {
  height: 26px;
  z-index: 1;
}

.stop-number .overlay-text {
  color: white;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 13px;
  text-align: center;
  top: 12px;
  z-index: 2;
}

.stop-number .vertical-bar-start {
  height: 100%;
  width: 1px;
  background-color: #bbc0c1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
}

.stop-number .vertical-bar-middle {
}

.stop-number .vertical-bar-end {
}

.stop-details {
  display: flex;
  gap: 10px;
}

.stop-details-item {
  flex-grow: 1;
  padding-bottom: 15px;
}

.stop-details-item .text-details {
  margin-left: 10px;
}

.stop-details-item .horizontal-bar {
  height: 1px;
  margin-top: 15px;
  background-color: #bbc0c1;
}

.stop-details-item h3 {
  font-size: 12px;
  color: #009b11;
  font-weight: heavy;
}

.stop-details-item h4 {
  font-size: 14px;
}

.stop-details-item p {
  font-size: 12px;
}

</style>
