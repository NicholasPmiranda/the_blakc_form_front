import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'

export const useHomeStore = defineStore('homeStore', {
    state: () => ({
        list_form: null
    }),

    actions: {
        async getlista() {

            try {
                const response = await Axios.get('api/form');
                const {data} = response;

                this.list_form = data

                return true;

            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },

        async cadastrarForm(name) {

            try {
                const response = await Axios.post('api/form', {
                    name: name
                });
                const {data} = response;

                this.list_form.unshift(data)

                return true;

            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },


    },
})
