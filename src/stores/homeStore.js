import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'

export const useHomeStore = defineStore('homeStore', {
    state: () => ({
        list_form: null,
        buscar: '',
        total: 0,
        page: 1,
        per_page:15
    }),

    actions: {
        async getlista() {

            try {

                const response = await Axios.get('api/form', {
                    params: {
                        buscar: this.buscar,
                        page:this.page,
                    }
                });
                const {data, total} = response.data;

                this.total = total
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
