<script setup>
defineProps({
  page_title: {
    type: String,
    required: true,
  },
  prev_page: {
    type: String,
    required: true
  },
  back_arrow: {
    type: Boolean,
    required: true,
  },
  chat_icon: {
    type: Boolean,
    required: true,
  },
})

import { useRouter } from 'vue-router';

const router = useRouter();

function nav_to_page(address) {
  router.push( address )
}

</script>

<template>
  <div class="header">
    <div class="header-left">
      <button v-if="back_arrow" class="back-arrow" @click="nav_to_page(prev_page)">
        <img src="../assets/chevron-large-left.svg" class="svg" />
      </button>
      <button class="hamburger-menu">
        <img src="../assets/menu-hamburger.svg" class="svg" />
      </button>
    </div>
    <div class="header-center">
      <h1>{{ page_title }}</h1>
    </div>
    <div class="header-right">
      <button v-if='chat_icon' class="chat-icon">
        <img src="../assets/chat.svg" class="svg" />
      </button>
      <button  class="help-icon">
        <img src="../assets/help.svg" class="svg" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #252829;
  padding: 16px 16px;
  height: 56px;
  position: fixed;
  top: 0;
  z-index: 10;
}

.header svg {
  fill: none;
  stroke: white;
}

.header-center h1 {
  margin: 0;
  font-size: 20px;
  text-align: center;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.header-left {
  padding: 0px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.back-arrow {
  background: none;
  border: none;
  cursor: pointer;
  height: 24px;
  width: 24px;
}

.hamburger-menu {
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  padding-top: 5px;
}

.header-right {
  align-items: center;
  display: flex;
  gap: 15px;
}

.help-icon {
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
}

.chat-icon {
  border: none;
  background: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  padding-top: 2px;
}
</style>
