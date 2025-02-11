<script setup>
import {onMounted, reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {Button, InputText,Password} from "primevue";
import {useUserStore} from "@/stores/UserStore.js";
import { useToast } from "primevue/usetoast";
import LoginSVG from "@/components/svg/loginSVG.vue";
const toast = useToast();


const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)
const errors = reactive({})
const form = reactive({
    name:'',
    email: '',
    password: ''
})
const handleLogin = async () => {
    loading.value = true
    errors.value = {}

    const cadastro = await userStore.cadastro(form.email, form.password, form.name)
    loading.value = false

    if (cadastro) {
        toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Conta criada com sucesso', life: 3000 });
        router.push('/login')

    } else {
        toast.add({ severity: 'error', summary: 'Erro  login', detail: 'Credencial invalida', life: 3000 });
    }


}
</script>

<template>

    <div class="h-screen flex">
        <div class="hidden md:flex w-1/2 justify-center items-center">
            <login-s-v-g/>
        </div>
        <div class="w-full  sm:w-1/2 h-full flex  items-center justify-center">
            <div class="" >
                <div class="text-center mb-5">
                    <!-- Opcional: Adicione um logo aqui -->
                    <div class="text-900 text-3xl font-medium mb-3">Cadastro</div>
                    <span class="text-600 font-medium">Informe com suas credenciais</span>
                </div>

                <div class="flex flex-col items-center   gap-4">
                    <div>
                        <label for="email" class="block text-900 font-medium mb-2">Nome</label>
                        <InputText
                            id="email"
                            v-model="form.name"
                            type="email"

                            :class="{'p-invalid': errors.nome}"
                            placeholder="Digite seu email"
                        />
                        <small class="text-red-500" v-if="errors.nome">{{ errors.nome }}</small>
                    </div>
                    <div>
                        <label for="email" class="block text-900 font-medium mb-2">Email</label>
                        <InputText
                            id="email"
                            v-model="form.email"
                            type="email"

                            :class="{'p-invalid': errors.email}"
                            placeholder="Digite seu email"
                        />
                        <small class="text-red-500" v-if="errors.email">{{ errors.email }}</small>
                    </div>

                    <div>
                        <label for="password" class="block text-900 font-medium mb-2">Senha</label>
                        <Password v-model="form.password"/>
                        <small class="text-red-500" v-if="errors.password">{{ errors.password }}</small>
                    </div>

                    <Button
                        label="Cadastrar"
                        @click="handleLogin"
                        :loading="loading"
                    />
                    <router-link to="/login">
                        <p>Login</p>
                    </router-link>
                </div>
            </div>
        </div>

    </div>

</template>


<style scoped>

</style>
