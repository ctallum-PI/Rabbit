<script setup>
import { RouterView } from 'vue-router'
import { usePackageStore } from './stores/packages';
import { ref } from 'vue'

// Store data in pinia
const packageStore = usePackageStore();
const stopNumber = ref(0)

packageStore.initialize(stopNumber.value)

</script>

<template>
    <router-view />
</template>

<style>
</style>
