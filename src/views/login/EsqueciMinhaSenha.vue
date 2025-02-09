<script setup>
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {Button, InputText} from "primevue";
import {useUserStore} from "@/stores/UserStore.js";
import { useToast } from "primevue/usetoast";
import OpenLayout from "@/layouts/OpenLayout.vue";
import LoginSVG from "@/components/svg/loginSVG.vue";
const toast = useToast();


const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)
const errors = reactive({})
const form = reactive({
    email: 'admin@admin.com',
})

const handleLogin = async () => {
    loading.value = true

    const loginAttempt = await userStore.esqueminhaSenha(form.email)
    loading.value = false

    if (loginAttempt) {
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
                    <div class="text-900 text-3xl font-medium mb-3">Esqueci minha senha</div>
                    <span class="text-600 font-medium">Informe seu email</span>
                </div>

                <div class="flex flex-col items-center   gap-4">
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
