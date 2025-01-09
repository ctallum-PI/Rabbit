<script setup>
import { ref } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheNextButton from '@/components/TheNextButton.vue'
import TheSwipeButton from '@/components/TheSwipeButton.vue'
import { usePackageStore } from '@/stores/packages'
import { RabbitData } from '@/data/RabbitData'
import { useRouter } from 'vue-router'
const page_title = ref('Deliver')
const next_page = ref('/deliver-to')
const prev_page = ref('/picture-of-delivery')
const next_page_button = ref('Continue')



const router = useRouter()

const packageStore = usePackageStore()
const stopData = RabbitData[packageStore.stopNumber]

const packageIdx = ref(null)
const packageInfo = ref(null)

packageIdx.value = (packageStore.activelyBeingDelivered.findIndex(element => element === true));
packageInfo.value = stopData.packageData[packageIdx.value]

const imageURL = packageStore.deliverPhoto



</script>

<template>
  <div class="page">
    <TheHeader :page_title='page_title' :prev_page="prev_page" :back_arrow="true" :chat_icon="true"></TheHeader>
    <div class="content">
      <div class="info-region">
        <p style="font-size: 16px; padding-top: 15px; padding-left: 20px;">{{ packageInfo.name }}</p>
        <p style="font-size: 24px; font-weight: 700; padding-left: 20px"> {{ stopData.address.streetAddress }} {{ packageInfo.subAddress }} </p>
        <div class="two-buttons">
          <button class="orange-button"> Add access code</button>
          <button class="orange-button">Add hours</button>
        </div>
        <div style="width: 100%; height: 2px; background-color: #bbc0c1;"></div>
        <p style="padding-left: 20px; padding-top: 15px;"> Delivered to </p>
        <p style="font-size: 18px; font-weight: 700; padding-left: 20px; padding-top: 5px">Front Door/Front Porch</p>

        <div class="delivery-photo">
          <img :src="imageURL.image_data_url" class="photo"/>
        </div>
        <div style="padding: 20px; padding-bottom: 10px; padding-top: 5px; width: 100%">
          <button class="orange-button" @click="router.push('/picture-of-delivery')">Retake Photo</button>
        </div>
        
        <div style="height: 80px; background-color: white;"></div>
      </div>
      
    </div>
    <TheSwipeButton :index="packageIdx"></TheSwipeButton>
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

.info-region{
  width: 100%;
  height: 400px;
}

.two-buttons{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 20px;
  padding-top: 10px;
}

.orange-button{
  width: 100%;
  height: 45px;
  background-color: white;
  border: 2px solid #ff7817;
  border-radius: 7px;
  font-size: 16px;
  color: #ff7817;  
}

.delivery-photo{
  margin: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 15px;
}

.photo{
  height: calc(100vh - 455px)

}

</style>
