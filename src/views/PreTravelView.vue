<script setup>
import { ref } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheNextButton from '@/components/TheNextButton.vue'
const page_title = ref('Travel')
const next_page = ref('/travel')
const prev_page = ref('/')
const next_page_button = ref('Start Travel')

import { RabbitData } from '@/data/RabbitData'
const address = RabbitData[0].address
const n_packages = RabbitData[0].numPackages

</script>

<template>
  <div class="page">
    <TheHeader :page_title='page_title' :prev_page="prev_page" :back_arrow="true" :chat_icon="true"></TheHeader>
    <div class="content">
      <div class="address-bar">
        <h1>{{ address.streetAddress }}</h1>
        <h2>{{ address.city }}, {{ address.state }} {{ address.zip }}</h2>
      </div>
      <div class="map-region">
        <img class='background' src="../assets/pre-travel/New_Map_Style.svg" style="z-index: auto;" />
        <img class="svg" src="../assets/pre-travel/Vector 3 (Stroke).svg" style="left:33%; top:23%; width:34.5%"/>
        <img class="svg" src="../assets/pre-travel/Current location.svg" style="left:62%; top:62%"/>
        <img class="svg" src="../assets/pre-travel/Group 26.svg" style="width:17%; left: 45%; top: 42%" />
        <img class="svg" src="../assets/pre-travel/Geo-pin index.svg" style="width:11.5%; left:27.5%; top:13%"/>
        <img class="svg" src="../assets/pre-travel/Center.svg" style="width: 14%; left: 85%; top: 77%"/>
        <img class="svg" src="../assets/pre-travel/Settings.svg" style="width: 14%; left:85%; top: 64%"/>
        <img class="svg" src="../assets/pre-travel/Mapbox logo.svg" style="width:23%; top: 93%; left:1%"/>
        
        <div class="info-region">
          <div class="drag-bar"></div>
          <div class="deliver-info">
            <div class="text">
              <h1> Deliver {{ n_packages }} packages </h1>
              <h2> 8:00 AM - 5:00 PM </h2>
            </div>
            <button>
              <img src="../assets/pre-travel/notes.svg" style="width:16px"/>
            </button>
            <button>
              <img src="../assets/pre-travel/key.svg" style="width: 24px;"/>
            </button>
          </div>
      </div>
      
      </div>


      <div style="height: 80px; background-color: white;"></div>
    </div>
    <TheNextButton :button_name="next_page_button" :link_addr="next_page" :ext_arrow="true"></TheNextButton>
  </div>
  
  
</template>

<style scoped>

.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  margin-top: 56px;
  flex: 1;
}

.address-bar{
  height: 52px;
  background-color: #252829;
  width: 100%;
  text-align: center;
}

.address-bar h1{
  font-size: 16px;
  color: white;
}

.address-bar h2{
  font-size: 14px;
  color: white;
}

.map-region {
  display: flex;
  position: relative;
  width: 100%;
  height: auto;
}

.map-region .background{
  width: 100%;
  height: auto;
  object-fit: cover;
}

.map-region .svg {
  position: absolute;
}

.info-region{
  position: absolute;
  width: 100%;
  height: auto;
  border-top: 2px solid #bbc0c1;
  border-radius: 5px;
  top: 92%;
  z-index: 2;
  background-color: white;
  
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

.info-region .deliver-info button{
  width: 48px;
  height: 48px;
  background: none;
  border-radius: 5px;
  border: 3px solid #ff7817;
  display: flex;
  justify-content: center;
  align-content: center;

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

</style>
