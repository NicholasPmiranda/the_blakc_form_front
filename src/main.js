import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';

import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import 'primeicons/primeicons.css'
import {configPrimevue} from "@/configTema/configPrimeVue.js";


const app = createApp(App)

app.use(ToastService);
app.use(ConfirmationService);
app.use(createPinia())
app.use(router)


app.use(PrimeVue, configPrimevue);
app.mount('#app')

