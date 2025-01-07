import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'
import {useToast} from "primevue/usetoast";

export const usePixelStore = defineStore('pixelStore', {
    state: () => ({
        list: null,
        nome: null,
        codigo: null,
    }),

    actions: {

        async getPixel(form_id) {
            try{
                const request = await Axios.get('/api/pixel', {
                    params: {
                        form_id
                    }
                })

                this.list = request.data
            }catch (e) {
                console.log(e.nome)
            }

        },
        async savePixel(form_id) {
            const request = await Axios.post('/api/pixel', {
                form_id: form_id,
                nome: this.nome,
                codigo: this.codigo,
            })

            this.list.unshift(request.data)
        },
        async deletePixel(tag_id, index) {
            const request = await Axios.delete('/api/pixel/' + tag_id)


            this.list.splice(index, 1)
        }
    },
})
