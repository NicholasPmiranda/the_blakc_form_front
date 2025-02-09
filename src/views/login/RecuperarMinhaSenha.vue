<script setup>
import {reactive, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {Button, Password} from "primevue";
import {useUserStore} from "@/stores/UserStore.js";
import { useToast } from "primevue/usetoast";
import LoginSVG from "@/components/svg/loginSVG.vue";
const toast = useToast();
const route =useRoute()

const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)
const errors = reactive({})
const form = reactive({
    password: '',
    confirm_password:''
})

const handleLogin = async () => {
    loading.value = true

    console.log(form)
    if(form.password !== form.confirm_password){
        toast.add({ severity: 'error', summary: 'Erro', detail: 'Senhas não batem', life: 3000 });
        loading.value = false
        return
    }

    const  token = route.params.token
    const response = await userStore.recuperarSenha(form.password, token)
    loading.value = false

    if (response) {
        router.push('/login')
    } else {
        toast.add({ severity: 'error', summary: 'Erro no login', detail: 'Credencial invalida', life: 3000 });
    }


}
</script>

<template>

    <div class="h-screen flex">
        <div class="w-1/2 flex justify-center">
            <login-s-v-g/>
        </div>
        <div class=" w-1/2 h-full flex  items-center justify-center">
            <div class="" >
                <div class="text-center mb-5">
                    <!-- Opcional: Adicione um logo aqui -->
                    <div class="text-900 text-3xl font-medium mb-3">Recuperar minha senha</div>
                    <span class="text-600 font-medium">Informe sua nova senha</span>
                </div>

                <div class="flex flex-col items-center   gap-4">
                    <div>
                        <label for="email" class="block text-900 font-medium mb-2">Senha</label>
                        <Password
                            v-model="form.password"
                            :class="{'p-invalid': errors.password}"
                            placeholder="Digite sua nova senha"
                        />
                    </div>

                    <div>
                        <label for="email" class="block text-900 font-medium mb-2">Confirmar Senha</label>
                        <Password
                            v-model="form.confirm_password"
                            :class="{'p-invalid': errors.confirm_password}"
                            placeholder="Digite sua nova senha"
                        />
                    </div>


                    <Button
                        label="enviar"
                        @click="handleLogin"
                        :loading="loading"
                    />
                    <router-link to="/login">
                        <p>Voltar para o login</p>
                    </router-link>
                </div>
            </div>
        </div>

    </div>

</template>


<style scoped>

</style>
