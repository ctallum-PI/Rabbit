<script setup>
const props = defineProps({
  button_name: {
    type: String,
    required: true,
  },
  link_addr: {
    type: String,
    required: true,
  },
  ext_arrow: {
    type: Boolean,
    required: true,
  },
  block: {
    type: Boolean,
  },
})

import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { usePackageStore } from '@/stores/packages';


const router = useRouter();

function nav_to_page(address) {
  router.push( address )
}

</script>

<template>
  <div class="button-region">
    <button v-if="block" class="next-button" style="background-color: #eec4a5;">
      {{ button_name }}
    </button>
    <button v-else class="next-button" @click="nav_to_page(link_addr)">
      {{ button_name }}
    </button>
    <button class="export-button" v-if="ext_arrow">
      <img src="../assets/export-large.svg" class="svg" />
    </button>
  </div>
</template>

<style scoped>

.button-region{
  width: 100%;
  align-content: center;
  height: 80px;
  box-shadow: 0px -2px 2px  rgb(174, 169, 169);
  display: flex;
  gap: 16px;
  padding: 16px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background-color: white
}

.next-button {
  border: none;
  flex-grow: 1;
  background-color: #FF7817;
  text-align: center;
  border-radius: 5px;
  font-size: 18px;
  /* margin: 16px; */
  cursor: pointer;
  display: inline-block;
  color: white;
  padding: 0px;
}

.export-button {
  border: none;
  width: 48px;
  background-color: #FF7817;
  border-radius: 5px;
  /* margin: 16px; */
  cursor: pointer;
  display: inline-block;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg {
  fill: none;
  stroke: white;
}
</style>
