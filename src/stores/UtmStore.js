import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'
import {envHelper} from "@/env.js";

export const useUtmStore = defineStore('utmStore', {
    state: () => ({
        list: null,
        nome: null,
        valor: null,
        lista_formatada: [],
        utmSlecionada: [],
        link: ''
    }),

    actions: {

        async getUtm(form_id) {
            try {
                const request = await Axios.get('/api/utm', {
                    params: {
                        form_id
                    }
                })

                this.list = request.data
                this.formatarUtms()
            } catch (e) {
                console.log(e)
            }

        },
        formatarUtms() {
            this.list.forEach((utm) => {
                this.lista_formatada.push(`${utm.nome}=${utm.valor}`)
            })

        },
        async saveUtm(form_id) {
            const request = await Axios.post('/api/utm', {
                form_id: form_id,
                nome: this.nome,
                valor: this.valor,
            })

            this.nome = '';
            this.valor = ''
            this.list.unshift(request.data)
            this.formatarUtms()

        },
        async deleteUtm(utm_id, index) {
            await Axios.delete('/api/utm/' + utm_id)

            this.list.splice(index, 1)
            console.log(this.list)
        },
        updateLink() {

            this.link = envHelper.front_url+ 'questionario/1' + this.utmSlecionada.join('&')
        }
    },
})
