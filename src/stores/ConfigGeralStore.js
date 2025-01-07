import {defineStore} from 'pinia'

export const useConfigGeral = defineStore('configGeral', {
    state: () => ({
        titulo_form: null,
        // cor_resposta: '#fa0808',
        cor_resposta: '#fff',
        cor_pergunta: '#fa0808',
        cor_btn: null,
        cor_fundo: null,
    }),

    getters: {

    },

    actions: {
        lightenColor(color, amount) {
            // Remove o # se existir
            color = color.replace('#', '');

            // Converte hex para RGB
            let r = parseInt(color.substring(0, 2), 16);
            let g = parseInt(color.substring(2, 4), 16);
            let b = parseInt(color.substring(4, 6), 16);

            // Clareia cada componente
            r = Math.min(255, Math.floor(r + (255 - r) * amount));
            g = Math.min(255, Math.floor(g + (255 - g) * amount));
            b = Math.min(255, Math.floor(b + (255 - b) * amount));

            // Converte de volta para hex
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        }
    },
})
