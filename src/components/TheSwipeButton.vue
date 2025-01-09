
<script setup>
const props = defineProps({
  index: {
    type: Number,
  },
})

import swipeButton from 'vue3-swipe-button'
import 'vue3-swipe-button/dist/swipeButton.css'

import { useRouter } from 'vue-router';
import { usePackageStore } from '@/stores/packages';

const router = useRouter()
const packageStore = usePackageStore()

function deliverPackage(index) {
    packageStore.deliverPackage(index)
    router.push('/post-scan')
}

</script>

<template>
    <div class="button-region">
        <swipeButton text="Swipe to finish" 
             @submit="deliverPackage(index)"
             :color="'#FF7817'" />
    </div>

</template>
  

<style scoped>

.button-region{
    position: fixed;
    width: 100%;
    height: 80px;
    bottom: 0px;
    padding: 16px;
    background-color: white;
    box-shadow: 0px -2px 2px  rgb(174, 169, 169);
}

#swipe-button{
    margin: 0px;
    border-radius: 5px;
}




</style>
  

  