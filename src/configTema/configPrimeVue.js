import {definePreset} from "@primevue/themes";
import Aura from "@primevue/themes/aura";

const Noir = definePreset(Aura, {

    semantic: {
        primary: {
            50: '{purple.50}',
            100: '{purple.100}',
            200: '{purple.200}',
            300: '{purple.300}',
            400: '{purple.400}',
            500: '{purple.500}',
            600: '{purple.600}',
            700: '{purple.700}',
            800: '{purple.800}',
            900: '{purple.900}',
            950: '{purple.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '#7548DB',
                    inverseColor: '#ffffff',
                    hoverColor: '#B58FFF',
                    activeColor: '#9F75FF'
                },
                highlight: {
                    background: '#B58FFF',
                    focusBackground: '#9F75FF',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            },
            dark: {
                primary: {
                    color: '#B58FFF',
                    inverseColor: '#1E1E2E',
                    hoverColor: '#C2A3FF',
                    activeColor: '#D1BBFF'
                },
                highlight: {
                    background: 'rgba(181, 143, 255, 0.2)', // Baseado no B58FFF
                    focusBackground: 'rgba(181, 143, 255, 0.3)',
                    color: 'rgba(255,255,255,0.87)',
                    focusColor: 'rgba(255,255,255,0.87)'
                }
            }
        }
    }
});

export const configPrimevue = {
    pt: {
        select: {
            root: {
                class: 'p-select-sm' // Aplica o tamanho small por padrão
            }
        },
        button: {
            root: {
                class: 'p-button-sm' // Aplica o tamanho small por padrão
            }
        },
        inputtext: {
            root: {
                class: 'p-inputtext-sm'
            }
        },
        passoword: {
            root: {
                class: 'p-passoword-sm'
            }
        }
    },
    locale: {
        // Dias
        dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],

        // Meses
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],

        // Botões e Labels
        today: 'Hoje',
        clear: 'Limpar',
        weekHeader: 'Sem',
        firstDayOfWeek: 1,
        dateFormat: 'dd/mm/yy',

        // Mensagens de validação
        weak: 'Fraca',
        medium: 'Média',
        strong: 'Forte',
        passwordPrompt: 'Digite uma senha',

        // Paginação
        emptyMessage: 'Nenhum resultado encontrado',
        emptyFilterMessage: 'Nenhum resultado encontrado',

        // Tempo
        startTime: 'Hora inicial',
        endTime: 'Hora final',

        // Seleção
        choose: 'Escolher',
        upload: 'Upload',
        cancel: 'Cancelar',

        // Calendario
        previousDecade: 'Década Anterior',
        nextDecade: 'Próxima Década',
        previousYear: 'Ano Anterior',
        nextYear: 'Próximo Ano',
        previousMonth: 'Mês Anterior',
        nextMonth: 'Próximo Mês',

        // Outros
        apply: 'Aplicar',
        confirm: 'Confirmar',
        reject: 'Rejeitar',
        selectAll: 'Selecionar Todos',
        noFilter: 'Sem Filtro',
        pending: 'Pendente',
        aria: {
            trueLabel: 'Verdadeiro',
            falseLabel: 'Falso',
            nullLabel: 'Não selecionado',
            star: 'Estrela',
            pageLabel: 'Página'
        }
    },
    theme: {
        preset: Noir
    },
    ripple: true,
    inputStyle: 'filled',
    unstyled: false,
}
