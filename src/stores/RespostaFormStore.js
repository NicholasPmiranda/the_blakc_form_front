import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'

export const useRespostaFormStore = defineStore('respostaFormStore', {
    state: () => ({
        respostas: [],
        cabecalho: [],
        last_page: 1,
        total_itens: 1,
        page: 1,
        per_page: 20
    }),

    actions: {
        async getResposta(form_id) {

            try {
                const response = await Axios.get('api/teste', {
                    params:{
                        form_id: form_id,
                        page: this.page,
                        per_page: this.per_page
                    }
                });
                const {cabecalho, respostas, last_page, total_itens} = response.data;

                this.respostas = respostas
                this.cabecalho = cabecalho
                this.last_page = last_page
                this.total_itens = total_itens

            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },


    },
})
