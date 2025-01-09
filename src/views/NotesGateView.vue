<script setup>
import { ref } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheNextButton from '@/components/TheNextButton.vue'
import { usePackageStore } from '@/stores/packages'
const page_title = ref('Notes')
const next_page = ref('/overview')
const prev_page = ref('/travel')
const next_page_button = ref('I\'ve read and understand')

import { RabbitData } from '@/data/RabbitData'

const packageStore = usePackageStore()

const stopNumber = ref(packageStore.stopNumber)
const stopData = ref(RabbitData[stopNumber.value])

</script>

<template>
  


  <div class="page">
    <TheHeader :page_title='page_title' :prev_page="prev_page" :back_arrow="true" :chat_icon="false"></TheHeader>
    <div class="content">
        <div class="notes" v-for="(package_info, idx) in stopData.packageData" :key="idx">
          <div class="notes-content">
            <div class="stop-number">
              <div class="circle"></div>
              <p> {{ idx+1 }}</p>
            </div>
            <div class="stop-details">
              <h1>{{ stopData.address.streetAddress }} {{ package_info.subAddress }}</h1>
              <h2 style="position: relative; top: -8px">{{ package_info.name }}</h2>
              
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
                  <li v-for="extraNotes in package_info.extraNotes">
                    {{ extraNotes }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div style="width: 100%; height: 1px; background-color: #dddfe0; "></div>
            

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
  min-height: 100vh;;
}

.content {
  margin-top: 56px;
  flex: 1;
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
