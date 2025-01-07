<script setup>
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {Button, InputText} from "primevue";
import {useUserStore} from "@/stores/UserStore.js";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)
const errors = reactive({})

const form = reactive({
    email: 'admin@admin.com',
    password: 'admin123'
})

const handleLogin = async () => {
    loading.value = true
    errors.value = {}

    const loginAttempt = await userStore.login(form.email, form.password)
    loading.value = false

    if (loginAttempt) {
        router.push('/')

    } else {
        toast.add({ severity: 'error', summary: 'Erro no login', detail: 'Credencial invalida', life: 3000 });
    }


}
</script>

<template>
    <div class="h-screen  flex items-center justify-center">
        <div class="surface-card py-8 px-5 sm:px-8" style="border-radius: 12px; max-width: 400px; width: 90%">
            <div class="text-center mb-5">
                <!-- Opcional: Adicione um logo aqui -->
                <div class="text-900 text-3xl font-medium mb-3">Bem-vindo!</div>
                <span class="text-600 font-medium">Entre com suas credenciais</span>
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

                <div>
                    <label for="password" class="block text-900 font-medium mb-2">Senha</label>
                    <InputText
                        id="password"
                        type="password"
                        v-model="form.password"
                        :class="{'p-invalid': errors.password}"
                        :feedback="false"
                        :toggleMask="true"
                        placeholder="Digite sua senha"
                    />
                    <small class="text-red-500" v-if="errors.password">{{ errors.password }}</small>
                </div>


                <Button
                    label="Entrar"
                    @click="handleLogin"
                    :loading="loading"
                />
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>
