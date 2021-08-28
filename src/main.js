import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/style/base.scss'

createApp(App).use(store).use(Vant).use(router).mount('#app')
