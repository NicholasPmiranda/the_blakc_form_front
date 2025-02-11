import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: {
            name: null,
            email: null
        },
        loading: false
    }),

    actions: {
        async login(email, password) {

            try {
                const response = await Axios.post('api/login', {email, password});
                const {token} = response.data;
                if (token) {
                    localStorage.setItem('token', token);
                    console.log('Token set successfully:', token);
                    return true;
                } else {
                    console.error('Token not provided by API');
                    return false;
                }
            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },

        async cadastro(email, password, name) {

            try {
                await Axios.post('api/cadastro', {email, password, name});

                return true;
            } catch (error) {
                console.error('Error during cadastro:', error.response || error.message);
                return false;
            }
        },
        async esqueminhaSenha(email) {

            try {
                await Axios.post('api/esqueci-minha-senha', {email});

                return true;
            } catch (error) {
                console.error('Error during cadastro:', error.response || error.message);
                return false;
            }
        },
        async recuperarSenha(password, token) {
            try {
                await Axios.post('api/recuperar-minha-senha', {password, token});

                return true;
            } catch (error) {
                console.error('Error during cadastro:', error.response || error.message);
                return false;
            }
        },

        async profile() {
            const request = await Axios('/api/profile')

            this.user = request.data
        },

        async setProfile() {
            await Axios.post('/api/profile', this.user)

        },

        async getAssinatura() {
            this.loading = true
            const request = await Axios('/api/subscribe')

            this.loading = false

            window.open(request.data, '_blank');
        },
        async getBilingPortal() {
            this.loading = true
            const request = await Axios('/api/biling-portal')

            this.loading = false

            window.open(request.data);
        }
    },
})
