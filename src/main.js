import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import vueCameraLib from 'vue-camera-lib'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(vueCameraLib)

app.mount('#app')

window.app = app; 
