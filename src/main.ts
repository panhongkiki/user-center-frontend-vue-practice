import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'
import '@/access.ts'


const app = createApp(App)
const pinia = createPinia()


app.use(router).use(pinia).use(Antd).mount('#app')

