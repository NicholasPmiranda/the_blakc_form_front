import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'

export const useEditFormStore = defineStore('editFormStore', {
    state: () => ({
        lista_questao: null,
        form_select: {},
        questao_select: {
            id: 0,
            tipo: "",
            alternativas: [],
            config: [],
        },
        regra_resposta: {
            pergunta: '',
            resposta: ''
        },
        saveTimeout: null,
        loading: false
    }),

    actions: {
        async listarQuestoes(form_id) {
            this.loading = true
            const request = await Axios.get('/api/questoes', {
                params: {
                    form_id: form_id
                }
            })
            const {data} = request

            this.lista_questao = data
            this.questao_select = data[0]

            this.loading = false
            return true
        },

        async salvarQuestao(form_id) {
            this.loading = true
            const request = await Axios.post('/api/questoes', {
                form_id: form_id
            })
            const {data} = request

            this.lista_questao.push(data)
            this.questao_select = data

            this.loading = false
            return true
        },

        async removerQuestao(questao_id, index) {
            this.loading = true
            const request = await Axios.delete(`/api/questoes/${questao_id}`)
            this.lista_questao.splice(index, 1)

            this.loading = false
            return true
        },

        async updateObrigatorio(questao_id, index) {
            this.loading = true
            await Axios.post('api/questoes/obrigatorio/update', {
                questao_id: this.questao_select.id
            })

            this.loading = false
            return true
        },

        setSelectQuestao(questao) {
            this.loading = true
            this.questao_select = questao

            this.loading = false
            return true
        },

        updateTipoQuestaoSelect(tipo) {
            this.loading = true
            this.questao_select.tipo = tipo

            this.loading = false
        },

        async addAlterternativa() {
            this.loading = true
            const ultimo_index = this.questao_select.alternativas.length - 1

            if (ultimo_index === -1) {
                this.questao_select.alternativas.push({
                    name: 'nova alternativa',
                    key: 0
                })
            } else {
                const ultimo = this.questao_select.alternativas[ultimo_index]
                this.questao_select.alternativas.push({
                    name: 'nova alternativa',
                    key: ultimo.key + 1
                })
            }

            await Axios.post('api/questoes/alternativa/update', {
                alternativas: this.questao_select.alternativas,
                questao_id: this.questao_select.id
            })

            this.loading = false
        },

        async removerAlterternativa(index) {
            this.loading = true
            this.questao_select.alternativas.splice(index, 1)

            await Axios.post('api/questoes/alternativa/update', {
                alternativas: this.questao_select.alternativas,
                questao_id: this.questao_select.id
            })

            this.loading = false
        },

        async updateOrder() {
            this.loading = true
            try {
                await Axios.post('api/questoes/order/update', {
                    questoes: this.lista_questao
                })
            } catch (error) {
                console.error('Erro ao atualizar ordem:', error)
            }
            this.loading = false
        },

        async updateRegraResposta() {
            this.loading = true
            await Axios.post('api/questoes/config/update', {
                config: this.questao_select.config,
                questao_id: this.questao_select.id
            })

            this.loading = false
        },

        async addRegraResposta() {
            this.loading = true
            try {
                let validade = true;
                this.questao_select.config.regras_resposta.forEach((resposta) => {
                    if (resposta.resposta === this.regra_resposta.resposta) {
                        validade = false;
                    }
                })

                if (validade) {
                    this.questao_select.config.regras_resposta.push({
                        resposta: this.regra_resposta.resposta,
                        pergunta: this.regra_resposta.pergunta
                    })

                    await Axios.post('api/questoes/config/update', {
                        config: this.questao_select.config,
                        questao_id: this.questao_select.id
                    })

                    this.regra_resposta.resposta = ''
                    this.regra_resposta.pergunta = ''

                    this.loading = false
                    return true
                }

                this.loading = false
            } catch (error) {
                console.error('Erro ao atualizar ordem:', error)
                this.loading = false
            }
        },

        async removerRegra(index) {
            this.loading = true
            try {
                this.questao_select.config.regras_resposta.splice(index, 1)
                await Axios.post('api/questoes/config/update', {
                    config: this.questao_select.config,
                    questao_id: this.questao_select.id
                })

                this.regra_resposta.resposta = ''
                this.regra_resposta.pergunta = ''
            } catch (error) {
                console.error('Erro ao atualizar ordem:', error)
            }
            this.loading = false
        },

        async updateTitulo() {
            this.loading = true
            try {
                await Axios.post('api/questoes/titulo/update', {
                    titulo: this.questao_select.titulo,
                    questao_id: this.questao_select.id
                })
            } catch (error) {
                console.error('Erro ao atualizar título:', error)
            }
            this.loading = false
        },

        async updateAlernativas() {
            this.loading = true
            try {
                await Axios.post('api/questoes/alternativa/update', {
                    alternativas: this.questao_select.alternativas,
                    questao_id: this.questao_select.id
                })
            } catch (error) {
                console.error('Erro ao atualizar título:', error)
            }
            this.loading = false
        },

        async updateDescricao() {
            this.loading = true
            try {
                await Axios.post('api/questoes/descricao/update', {
                    descricao: this.questao_select.descricao,
                    questao_id: this.questao_select.id
                })
            } catch (error) {
                console.error('Erro ao atualizar descrição:', error)
            }
            this.loading = false
        },

        async getForm(form_id) {
            this.loading = true
            try {
                const form = await Axios.get('api/form/' + form_id)
                this.form_select = form.data
            } catch (error) {
                console.error('Erro :', error)
            }
            this.loading = false
        },

        async updateConfig() {
            this.loading = true
            try {
                await Axios.post('api/questoes/config/update', {
                    config: this.questao_select.config,
                    questao_id: this.questao_select.id
                })
            } catch (error) {
                console.error('Erro ao atualizar descrição:', error)
            }
            this.loading = false
        },

        async updateTipo() {
            this.loading = true
            try {
                await Axios.post('api/questoes/tipo/update', {
                    tipo: this.questao_select.tipo,
                    questao_id: this.questao_select.id
                })
            } catch (error) {
                console.error('Erro ao atualizar tipo:', error)
            }
            this.loading = false
        }
    },
})
