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
        loading_ordenacao: false,
        loading_pdf: false,
        loading_Planilha: false,
        ordernar: 'desc'
    }),

    actions: {
        async getResposta(form_id) {

            try {
                this.loading_ordenacao = true;


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
                // return false;
            }

            this.loading_ordenacao = false;

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
                    order: this.ordernar
                }
            });


            const {respostas} = response.data;

            this.respostas = [...this.respostas, ...respostas]
            this.loading_paginate = false
        },

        async getDowloadPDf(form_id) {
            this.loading_pdf = true
            this.page = this.page + 1

            const response = await Axios.get('api/form/reatorio/pdf', {
                responseType: 'blob',
                params: {
                    form_id: form_id,
                    user_id: this.grupo_ativo[0].user_id,
                }
            });


            return response
        },
        async getDowloadPlanilha(form_id) {
            this.loading_Planilha = true
            this.page = this.page + 1

            console.log({
                form_id: form_id,
                page: this.page,
                per_page: this.per_page,
                tabela: this.tabela,
                completas: this.completas,
                order: this.ordernar
            })
            const response = await Axios.get('api/form/reatorio/excel', {
                responseType: 'blob',
                params: {
                    form_id: form_id,
                    page: this.page,
                    per_page: this.per_page,
                    tabela: this.tabela,
                    completas: this.completas,
                    order: this.ordernar
                }
            });


            return response
        },



    },
})
