<script setup>
import { ref, onMounted, computed } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheNextButton from '@/components/TheNextButton.vue'
import TheScanNextButton from '@/components/TheScanNextButton.vue'
import { useRouter } from 'vue-router'
import { usePackageStore } from '@/stores/packages'
import { RabbitData } from '@/data/RabbitData'
const page_title = ref('Deliver')
const next_page = ref('/picture-of-delivery')
const prev_page = ref('/post-scan')
const next_page_button = ref('Continue')

const packageStore = usePackageStore()

// Package Data
const stopData = RabbitData[packageStore.stopNumber]

const packageIdx = ref(0);
const packageInfo = ref(0);

const softDelivered = ref(false);

onMounted(() => {
  if (packageStore.activelyBeingDelivered.filter(Boolean).length == 0){
    const router = useRouter()
    router.push('/post-scan')
  }

  packageIdx.value = (packageStore.activelyBeingDelivered.findIndex(element => element === true));
  packageInfo.value = stopData.packageData[packageIdx.value]
})



</script>

<template>
  <div class="page">
    <TheHeader :page_title='page_title' :prev_page="prev_page" :back_arrow="true" :chat_icon="true"></TheHeader>
    <div class="content">
      <div class="top-note">
        <p style="color: white; font-size: 16px; margin-left: 20px ">Package delivered to...</p>
      </div>
        <div class="delivered-button">
          <div class="button-section">
            <button :class="{'filled': softDelivered}" @click="softDelivered = true"></button>
            <p style="font-size: 16px">{{ packageInfo.name }} or a household member</p>
          </div>
        </div>
        <div style="width:100%; height: 1px; background-color:#bbc0c1;"></div>
        <div class="more-options">
          <p style="font-size: 18px; color: #FF7817">More options</p>
        </div>
        <h1 style="font-size: 20px; margin-left: 20px; font-weight: 700; margin-bottom: 10px;">Notes</h1>
        <div class="notes-content">
        <div class="stop-number">
          <div class="circle"></div>
          <p> {{ packageIdx+1 }}</p>
        </div>
        <div class="stop-details">
          <h1>{{ stopData.address.streetAddress }} {{ packageInfo.subAddress }}</h1>
          <h2 style="position: relative; top: -8px">{{ packageInfo.name }}</h2>
          
          <div class="list">
            <img class="svg" src="../assets/notes/star.svg"/>
            <h2>Recipient Required</h2>
          </div>
          <div class="list">
            <img class="svg" src="../assets/notes/key.svg" />
            <h2>Access code: 12542</h2>
          </div>
          <div class="list">
            <img class="svg" src="../assets/notes/notes.svg" />
            <ul>
              <li>Deliver to: Front Door/Front Porch</li>
              <li v-for="extraNotes in packageInfo.extraNotes">
                {{ extraNotes }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <TheScanNextButton :button_name="next_page_button" :link_addr="next_page" :block="!softDelivered"></TheScanNextButton>
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

.top-note{
  height: 40px;
  width: 100%;
  background-color: #252829;
  display: flex;
  align-items: center;
}

.delivered-button{
  height: 50px;
  display: flex;
  align-items: center;
  padding: 5px;
}

.delivered-button .button-section{
  display: flex;
  gap: 15px;
  justify-content: flex-start;
}

.delivered-button .button-section button{
  height: 24px;
  width: 24px;
  border-radius: 12px;
  background-color: white;
  border: 1px solid #6c7778;
  margin-left: 15px;
}

.delivered-button .button-section button.filled{
  background-color: #0d99ff;
}

.more-options{
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  position: relative
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
}

.stop-details .svg {
  position: relative;
  background: none;
  border: none;
  width: 14px;
  top: 12.8px;
  transform: translateY(-50%);
}



</style>
