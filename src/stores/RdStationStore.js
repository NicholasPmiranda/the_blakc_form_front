import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'

export const useRdStore = defineStore('rdStore', {
    state: () => ({
        token: null,
        identificacao: null
    }),

    actions: {
        async save(form_id) {

            try {
                await Axios.post('api/form/rd/' + form_id, {
                    token: this.token,
                    identificacao: this.identificacao

                });

                return true;
            } catch (error) {
                return false;
            }
        },


        async get(form_id,) {

            try {
                const response = await Axios.get('api/form/rd/' + form_id);

                const {token, identification_convert} = response.data

                this.token = token
                this.identificacao = identification_convert

                return true;
            } catch (error) {
                return false;
            }
        },
    },
})
