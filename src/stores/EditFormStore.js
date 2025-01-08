import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'

export const useEditFormStore = defineStore('editFormStore', {
    state: () => ({
        lista_questao: null,
        questao_select: {
            id: 0,
            tipo: "",
            alternativas: [
                {name: "Accounting", key: 1},
                {name: "Marketing", key: 2},
                {name: "Production", key: 3},
                {name: "Research", key: 4}
            ],

        },
        saveTimeout: null,
    }),

    actions: {
        async listarQuestoes(form_id) {
            const request = await Axios.get('/api/questoes', {
                params: {
                    form_id: form_id
                }
            })
            const {data} = request

            this.lista_questao = data
            this.questao_select = data[0]

            // Configura os watchers após carregar os dados
            this.setupAutoSave()

            return true
        },


        async salvarQuestao(form_id) {
            const request = await Axios.post('/api/questoes', {
                form_id: form_id
            })
            const {data} = request

            this.lista_questao.push(data)
            this.questao_select = data

            return true
        },


        async removerQuestao(questao_id, index) {
            const request = await Axios.delete(`/api/questoes/${questao_id}`)
            this.lista_questao.splice(index, 1)
            return true
        },

        setSelectQuestao(questao) {
            this.questao_select = questao
            return true
        },


        updateTipoQuestaoSelect(tipo) {
            this.questao_select.tipo = tipo
        },

        async addAlterternativa() {
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
        },

        async removerAlterternativa(index) {
            this.questao_select.alternativas.splice(index, 1)

            await Axios.post('api/questoes/alternativa/update', {
                alternativas: this.questao_select.alternativas,
                questao_id: this.questao_select.id
            })
        },

        async updateOrder() {
            try {
                await Axios.post('api/questoes/order/update', {
                    questoes: this.lista_questao
                })
            } catch (error) {
                console.error('Erro ao atualizar ordem:', error)
            }
        },

        async updateTitulo() {
            try {
                await Axios.post('api/questoes/titulo/update', {
                    titulo: this.questao_select.titulo,
                    questao_id: this.questao_select.id
                })
            } catch (error) {
                console.error('Erro ao atualizar título:', error)
            }
        },
        async updateAlernativas() {
            try {
                await Axios.post('api/questoes/alternativa/update', {
                    alternativas: this.questao_select.alternativas,
                    questao_id: this.questao_select.id
                })
            } catch (error) {
                console.error('Erro ao atualizar título:', error)
            }
        },

        async updateDescricao() {
            try {
                await Axios.post('api/questoes/descricao/update', {
                    descricao: this.questao_select.descricao,
                    questao_id: this.questao_select.id
                })
            } catch (error) {
                console.error('Erro ao atualizar descrição:', error)
            }
        },

        async updateConfig() {
            try {
                await Axios.post('api/questoes/config/update', {
                    config: this.questao_select.config,
                    questao_id: this.questao_select.id
                })
            } catch (error) {
                console.error('Erro ao atualizar descrição:', error)
            }
        },

        async updateTipo() {
            try {
                await Axios.post('api/questoes/tipo/update', {
                    tipo: this.questao_select.tipo,
                    questao_id: this.questao_select.id
                })
            } catch (error) {
                console.error('Erro ao atualizar tipo:', error)
            }
        }
    },
})
