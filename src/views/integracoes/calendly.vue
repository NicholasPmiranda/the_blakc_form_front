<template>
    <div class="calendly-auth-container">
        <div v-if="!isAuthenticated" class="auth-section">
            <h2>Conectar com Calendly</h2>
            <button @click="initiateAuth" class="auth-button">
                Autorizar Calendly
            </button>
        </div>

        <div v-else class="success-section">
            <h2>Conectado com sucesso!</h2>
            <p>Token de acesso: {{ accessToken }}</p>
        </div>

        <div v-if="error" class="error-message">
            {{ error }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'CalendlyAuth',
    data() {
        return {
            clientId: 'V7A1CYd_-rBVNpB16THlJGEZ_cWBNF-lejsqWL0BjpM',
            redirectUri: 'http://localhost:5173/callendly',
            isAuthenticated: false,
            accessToken: null,
            error: null
        }
    },
    created() {
        // Verificar se há um código de autorização na URL quando o componente é criado
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')

        if (code) {
            this.exchangeCodeForToken(code)
        }
    },
    methods: {
        initiateAuth() {
            // Construir a URL de autorização do Calendly
            const authUrl = `https://auth.calendly.com/oauth/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}`

            // Redirecionar para a página de autorização do Calendly
            window.location.href = authUrl
        },

        async exchangeCodeForToken(code) {
            try {
                // Fazer a requisição para trocar o código de autorização pelo token de acesso
                const response = await fetch('https://auth.calendly.com/oauth/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        client_id: this.clientId,
                        client_secret: 'rTmd7ktKjUncxA38Lvead1VS9uU-vl5XqSSAcMVd05Q',
                        code,
                        grant_type: 'authorization_code',
                        redirect_uri: this.redirectUri
                    })
                })

                const data = await response.json()

                if (response.ok) {
                    this.accessToken = data.access_token
                    this.isAuthenticated = true
                    // Armazenar o token para uso posterior
                    localStorage.setItem('calendlyToken', data.access_token)
                } else {
                    throw new Error(data.error || 'Erro ao obter token de acesso')
                }
            } catch (error) {
                this.error = `Erro durante autenticação: ${error.message}`
                console.error('Erro de autenticação:', error)
            }
        }
    }
}
</script>

<style scoped>
.calendly-auth-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.auth-button {
    background-color: #006bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.auth-button:hover {
    background-color: #0056cc;
}

.error-message {
    color: #dc3545;
    margin-top: 10px;
}
</style>
