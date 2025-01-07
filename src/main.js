import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import 'primeicons/primeicons.css'

const Noir = definePreset(Aura, {
    components: {
        // button:{
        //     paddingX: '.3rem',
        //     paddingY: '.3rem',
        //     mdFontSize:'44px',
        //     badgeSize: '100px'
        // }
    },
    semantic: {
        primary: {
            50: '{purple.50}',
            100: '{purple.100}',
            200: '{purple.200}',
            300: '{purple.300}',
            400: '{purple.400}',
            500: '{purple.500}',
            600: '{purple.600}',
            700: '{purple.700}',
            800: '{purple.800}',
            900: '{purple.900}',
            950: '{purple.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '#7548DB',
                    inverseColor: '#ffffff',
                    hoverColor: '#B58FFF',
                    activeColor: '#9F75FF'
                },
                highlight: {
                    background: '#B58FFF',
                    focusBackground: '#9F75FF',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            },
            dark: {
                primary: {
                    color: '#B58FFF',
                    inverseColor: '#1E1E2E',
                    hoverColor: '#C2A3FF',
                    activeColor: '#D1BBFF'
                },
                highlight: {
                    background: 'rgba(181, 143, 255, 0.2)', // Baseado no B58FFF
                    focusBackground: 'rgba(181, 143, 255, 0.3)',
                    color: 'rgba(255,255,255,0.87)',
                    focusColor: 'rgba(255,255,255,0.87)'
                }
            }
        }
    }
});
const app = createApp(App)

app.use(ToastService);
app.use(ConfirmationService);
app.use(createPinia())
app.use(router)


app.use(PrimeVue, {
    theme: {
        preset:Noir
    },
    ripple: true,
    inputStyle: 'filled',
    unstyled: false,
});
app.mount('#app')

