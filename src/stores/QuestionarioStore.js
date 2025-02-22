import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'
import {v4 as uuidv4} from 'uuid';
import router from "@/router";

export const useQuestionarioStore = defineStore('questionarioStore', {
    state: () => ({
        lista_questao: null,
        questao_select: {
            id: 0,
            tipo: "",
            alternativas: [],
            config: [],
        },
        pergunta_index: 0,
        resposta: null,
        user_id: uuidv4(),
        form_id: null,
        pixel: [],
        gtm: [],
        query_params: [],
        file: null


    }),

    actions: {
        addQueryParams(query) {
            this.query_params = query
        },

        checkboxUpdate() {
            const tamanho_lista_resposta = this.resposta.length
            const ultimo = tamanho_lista_resposta - 1

            if (tamanho_lista_resposta > this.questao_select.config.limite_respostas) {

                this.resposta = this.resposta.splice(ultimo, 1)
            }

        },
        async listarQuestoes(form_id) {

            try {
                const request = await Axios.get('/api/questionario', {
                    params: {
                        form_id: form_id
                    }
                })
                const {questoes, form} = request.data

                this.lista_questao = questoes
                this.questao_select = questoes[0]

                this.pixel = form.pixel
                this.gtm = form.gtm


                return true
            } catch (error) {
                if (error.status === 404) {
                    router.push("/not-found");
                }
            }

        },

        async proximoQuestao() {
            this.pergunta_index = this.pergunta_index + 1


            var concluido = false
            if (this.pergunta_index === this.lista_questao.length) {
                concluido = true
            }


            if (Array.isArray(this.resposta)) {
                this.resposta = this.resposta.join(', ')
            }


            const formData = new FormData();

            formData.append('form_id', this.form_id);
            formData.append('questao', this.questao_select.titulo);
            formData.append('questao_id', this.questao_select.id);
            formData.append('user_id', this.user_id);
            formData.append('concluido', concluido);


            if(this.questao_select.tipo === 'data'){
                formData.append('resposta', this.formatarDataBrasileira(this.resposta));
            }else{
                formData.append('resposta', this.resposta);

            }

            if (this.file != null) {
                formData.append(`arquivo`, this.file);
            }

            if (this.query_params.utm_source) {
                formData.append('utm_source', this.query_params.utm_source);
            }
            if (this.query_params.utm_mediun) {
                formData.append('utm_mediun', this.query_params.utm_mediun);
            }

            await Axios.post('/api/questionario', formData)


            if (this.pergunta_index === this.lista_questao.length) {
                return 'finalizado'
            }


            this.questao_select.config.regras_resposta.forEach((regra) => {
                if (this.resposta.includes(regra.resposta)) {
                    this.lista_questao.forEach((questao, index) => {
                        if (questao.id === regra.pergunta) {
                            this.questao_select = this.lista_questao[index]
                            this.pergunta_index = index

                        }
                    })
                }

            })

            this.questao_select = this.lista_questao[this.pergunta_index]

            this.resposta = ''

            if (this.questao_select.config.redirect !== '' || this.questao_select.config.redirect !== null) {
                return this.questao_select.config.redirect
            }


        },


        formatarDataBrasileira(dataString) {
            const data = new Date(dataString);
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses começam do 0
            const ano = data.getFullYear();
            return `${dia}/${mes}/${ano}`;
        }

    },
})
