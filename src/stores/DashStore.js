import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'

export const useDashStore = defineStore('dashStore', {
    state: () => ({
        abandonoConsusao: [],
        mediaConcluido:[],
        visualizacao_semanal:[],
        totalVisitasMes:0,
        totalVisitasSemana:0,
        totalVisitas:0,
        conclusao70:0,
        abandono:0,
        conclusao:0,
        utm_source:[],
        utm_mediun:[]

    }),

    actions: {
        async getAbandonoConclusao(form_id) {

            try {
                const response = await Axios.get('api/dash/historico-concluido-abandono',
                    {params:{form_id}}
                );
                this.abandonoConsusao = response.data;


            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },
        async getTotalViistasMes(form_id) {

            try {
                const response = await Axios.get('api/dash/total-visualizacao-mes',
                    {params:{form_id}}
                );
                this.totalVisitasMes = response.data;


            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },
        async getTotalViistasSemana(form_id) {

            try {
                const response = await Axios.get('api/dash/total-visualizacao-semana',
                    {params:{form_id}}
                );
                this.totalVisitasSemana = response.data;


            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },
        async getTotalViistas(form_id) {

            try {
                const response = await Axios.get('api/dash/total-visualizacao',
                    {params:{form_id}}
                );
                this.totalVisitas = response.data;


            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },
        async getConclusao70(form_id) {

            try {
                const response = await Axios.get('api/dash/conclusao-70',
                    {params:{form_id}}
                );
                this.conclusao70 = response.data;


            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },
        async getAbandono(form_id) {

            try {
                const response = await Axios.get('api/dash/abandono',
                    {params:{form_id}}
                );
                this.abandono = response.data;


            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },
        async getConclusao(form_id) {

            try {
                const response = await Axios.get('api/dash/concluido',
                    {params:{form_id}}
                );
                this.conslusao = response.data;


            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },

        async getMediaConcluido(form_id) {

            try {
                const response = await Axios.get('api/dash/media-conluido',
                    {params:{form_id}}
                );
                this.mediaConcluido = response.data;


            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },

        async getHistoricoVizualizacaoSemanal(form_id) {
            try {
                const response = await Axios.get('api/dash/visualizacao-semanal',
                    {params:{form_id}}
                );
                this.visualizacao_semanal = response.data;
            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },
        async getUtmSource(form_id) {
            try {
                const response = await Axios.get('api/dash/utm-source',
                    {params:{form_id}}
                );
                this.utm_source = response.data;
            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },

        async getUtmMediun(form_id) {
            try {
                const response = await Axios.get('api/dash/utm-mediun',
                    {params:{form_id}}
                );
                this.utm_mediun = response.data;
            } catch (error) {
                console.error('Error during login:', error.response || error.message);
                return false;
            }
        },


    },
})
