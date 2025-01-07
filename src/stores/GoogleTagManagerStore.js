import {Axios} from "@/axios.js";
import {defineStore} from 'pinia'
import {useToast} from "primevue/usetoast";

export const useGtmStore = defineStore('gtmStore', {
    state: () => ({
        list: null,
        nome: null,
        header: null,
        body: null,
    }),

    actions: {

        async getTags(form_id) {
            const request = await Axios.get('/api/gtm', {
                params: {
                    form_id
                }
            })

            this.list = request.data
        },
        async saveTags(form_id) {
            const request = await Axios.post('/api/gtm', {
                form_id: form_id,
                nome: this.nome,
                header: this.header,
                body: this.body
            })

            this.list.unshift(request.data)
        },
        async deleteTag(tag_id, index) {
            const request = await Axios.delete('/api/gtm/' + tag_id)


            this.list.splice(index, 1)
        }
    },
})
