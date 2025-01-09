<script setup>
import { ref } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheNextButton from '@/components/TheNextButton.vue'
const page_title = ref('Travel')
const next_page = ref('/notes-gate')
const prev_page = ref('/pre-travel')
const next_page_button = ref('I\'ve Parked')

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
      </div>

      <div class="nav-section" style="z-index: 2;">
        <div class="left-turn" style="display: flex; flex-direction: column; justify-content:left; align-items: center" >
          <img class="svg" src="../assets/travel/left-arrow.svg"/>
          <p style="font-size: 12px; color: white; height: 16px; width: 31px; text-align: center;">300ft</p>
        </div>
        <h1 style="font-size: 24; color: white; font-weight: 700; flex: 1 "> Selwyn Road</h1>
        <div class="eta-time" style="display: flex; flex-direction: column; justify-content: left; align-items: center;">
          <p style="color: white; font-size: 14"> 1 min</p>
          <p style="color: white; font-size: 14"> 200 ft</p>
        </div>
      </div>

      <div class="map-region" style="z-index: 1;">

        
        <img class="background" src="../assets/travel/travel-map.png" style="width: 100%; height: auto; object-fit: cover;"/>
        
        <img class="svg" src="../assets/travel/Vector 1 (Stroke).svg" style="width: 15%; left: 37%; top: 42%"/>
        <img class="svg" src="../assets/travel/Button/Center.svg" style="width: 14%; left: 85%; top: 73%" />
        <img class="svg" src="../assets/travel/Map/Controls/Compass.svg" style="width: 11%; left: 87%; top: 3%"/>
        <img class="svg" src="../assets/travel/Geo-pin index.svg" style="width: 10%; top: 28%; left: 32%"/>
        <img class="svg" src="../assets/travel/Mapbox logo.svg" style="width: 23%; top: 82%; left: 1%"/>
        <img class="svg" src="../assets/travel/Moderate threshold.svg" style="width: 10%; top: 4%; left: 2%" />
        <img class="svg" src="../assets/travel/Puck.svg" style="width: 12%; top: 68%; left: 43.5%"/>
        <img class="svg" src="../assets/travel/Thumbnail.svg" style="width: 23%; top: 62%; left: 1%" />
        <img class="svg" src="../assets/travel/Vector 2 (Stroke).svg" style="width: 37%; left: 0%; top: 42.2%" />
        <div style="position: absolute; top: 42%; left: 35%; background-color: white; height: 4%; width: 4%; border-radius: 20px; border: 2px solid #68cbec"> </div>
        <div style="position: absolute; height: 401px"></div>
      </div>
      
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




        <div style="height: 80px; background-color: white;"></div>
    </div>
    <TheNextButton :button_name="next_page_button" :link_addr="next_page" :ext_arrow="false"></TheNextButton>
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
  height: 32px;
  background-color: #252829;
  width: 100%;
  text-align: center;
  border: none;
  z-index: 2;
}

.address-bar h1{
  font-size: 16px;
  color: white;
}

.address-bar h2{
  font-size: 14px;
  color: white;
}

.nav-section {
  height: 72px;
  width: 100%;
  background-color: #252829;
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 20px;
  z-index: 2;
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
  position: relative;
}

.map-region .svg {
  position: absolute;
}

.info-region{
  position: relative;
  width: 100%;
  border-top: 2px solid #bbc0c1;
  border-radius: 5px;
  top: -5px;
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