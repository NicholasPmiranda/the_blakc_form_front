import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'
import {console} from "vuedraggable/src/util/console.js";

export const useRespostaFormStore = defineStore('respostaFormStore', {
    state: () => ({
        respostas: [],
        cabecalho: [],
        last_page: 1,
        total_itens: 1,
        page: 1,
        per_page: 20,
        tabela: false,
        completas: true,
        grupo_ativo: [],
        loading_paginate: false,
        ordernar: 'desc'
    }),

    actions: {
        async getResposta(form_id) {

            try {


                const response = await Axios.get('api/form/lista/respostas', {
                    params: {
                        form_id: form_id,
                        page: this.page,
                        per_page: this.per_page,
                        tabela: this.tabela,
                        completas: this.completas,
                        order: this.ordernar
                    }
                });
                const {cabecalho, respostas, last_page, total_itens} = response.data;

                this.respostas = respostas
                this.cabecalho = cabecalho
                this.last_page = last_page
                this.total_itens = total_itens

                if (this.tabela === false) {
                    this.grupo_ativo = respostas[0]
                }

            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },

        trocaVisualizacao() {
            this.page = 1;

        },
        setGrupo(index) {
            this.grupo_ativo = this.respostas[index]
        },


        async getPaginate(form_id) {
            this.loading_paginate = true
            this.page = this.page + 1

            const response = await Axios.get('api/form/lista/respostas', {
                params: {
                    form_id: form_id,
                    page: this.page,
                    per_page: this.per_page,
                    tabela: this.tabela,
                    completas: this.completas,
                    order: this.ordenar
                }
            });


            const {respostas} = response.data;

            this.respostas = [...this.respostas, ...respostas]
            this.loading_paginate = false
        }


    },
})
