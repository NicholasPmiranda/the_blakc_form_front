export const theme = {
    colors: {
        primary: {
            main: '#B388FF', // Tom principal de roxo
            light: '#D1B3FF',
            dark: '#7C4DFF',
        },
        background: {
            default: '#121212', // Fundo escuro principal
            paper: '#1E1E1E',   // Fundo dos componentes
            sidebar: '#181818'   // Fundo da barra lateral
        },
        text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.7)',
        },
        chart: {
            gradient: ['#B388FF', '#7C4DFF'] // Gradiente para gráficos
        }
    },
    // Configuração do PrimeVue
    primevue: {
        chart: {
            backgroundColor: 'transparent',
            textColor: '#FFFFFF',
        },
        button: {
            backgroundColor: '#B388FF',
            textColor: '#FFFFFF',
            hoverBackgroundColor: '#7C4DFF'
        },
        table: {
            backgroundColor: '#1E1E1E',
            headerBackgroundColor: '#181818',
            headerTextColor: '#FFFFFF',
            rowBackgroundColor: '#1E1E1E',
            rowTextColor: 'rgba(255, 255, 255, 0.7)',
            borderColor: '#2D2D2D'
        },
        input: {
            backgroundColor: '#1E1E1E',
            textColor: '#FFFFFF',
            borderColor: '#2D2D2D'
        }
    }
};
