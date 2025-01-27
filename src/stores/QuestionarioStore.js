import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'
import {v4 as uuidv4} from 'uuid';

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
        resposta: '',
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
        async listarQuestoes(form_id) {
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
        },

        async proximoQuestao() {
            this.pergunta_index = this.pergunta_index + 1


            if (Array.isArray(this.resposta)) {
                this.resposta = this.resposta[0]
            }


            const formData = new FormData();

            formData.append('form_id', this.form_id);
            formData.append('questao', this.questao_select.titulo);
            formData.append('questao_id', this.questao_select.id);
            formData.append('resposta', this.resposta);
            formData.append('user_id', this.user_id);

            if (this.file != null) {
                formData.append(`arquivo`, this.file);
            }

            if (this.query_params.utm_source) {
                formData.append('utm_source', this.query_params.utm_source);
            }
            if (this.query_params.utm_mediun) {
                formData.append('utm_mediun', this.query_params.utm_mediun);
            }

            try {
                console.log('fazendo')
                await Axios.post('/api/questionario', formData)
                console.log('feito')

            } catch (error) {
                console.log(error)
            }

            if (this.pergunta_index === this.lista_questao.length) {
                return 'finalizado'
            }


            this.questao_select.config.regras_resposta.forEach((regra) => {

                if (regra.resposta == this.resposta) {
                    this.lista_questao.forEach((questao, index) => {
                        if (questao.id == regra.pergunta) {
                            this.questao_select = this.lista_questao[index]
                            this.pergunta_index = index

                        }
                    })
                }

            })

            this.questao_select = this.lista_questao[this.pergunta_index]

            this.resposta = ''
        }

    },
})
