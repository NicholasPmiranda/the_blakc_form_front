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
        query_params:[]


    }),

    actions: {

        addQueryParams(query){
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


            const payload = {
                form_id: this.form_id,
                questao: this.questao_select.titulo,
                questao_id: this.questao_select.id,
                resposta: this.resposta,
                user_id: this.user_id
            }

            if(this.query_params.utm_source){
                payload.utm_source = this.query_params.utm_source
                console.log('utm_source')
            }

            if(this.query_params.utm_mediun){
                payload.utm_mediun = this.query_params.utm_mediun
                console.log('utm_mediun')

            }

            console.log(payload, this.query_params)
            await Axios.post('/api/questionario', payload)
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
