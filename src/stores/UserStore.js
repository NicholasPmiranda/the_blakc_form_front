import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null
    }),

    actions: {
        async login(email, password) {

            try {
                const response = await Axios.post('api/login', { email, password });
                const { token } = response.data;
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


        async profile() {
            const request = await Axios('/api/profile')

            this.user = request.data
        }
    },
})
