<script setup>
import {Button, Card, FloatLabel, InputText} from "primevue";
import EditProfile from "@/components/svg/editProfile.vue";
import {useUserStore} from "@/stores/UserStore.js";
import {ref} from "vue";
import {useToast} from "primevue/usetoast";

const userStore = useUserStore()
const loading = ref(false)
const toast = useToast()

async  function salvar() {
    loading.value = true
    if (userStore.user.password !== userStore.user.password_confirm) {
        toast.add({severity: 'error', summary: 'Erro', detail: 'Senhas não são iguais', life: 3000});
        loading.value = false
        return
    }

    await userStore.setProfile()
    toast.add({severity: 'success', summary: 'Sucesso', detail: 'Perfil salvo', life: 3000});

    loading.value = false
}
</script>

<template>
    <Card class="">
        <template #content>
            <div class="flex flex-wrap    h-[calc(100vh-9.25rem)]">
                <div class="w-full sm:w-1/2  flex justify-center items-center ">
                    <edit-profile class="w-1/2"/>
                </div>

                <div class="w-full sm:w-1/2 flex flex-col justify-center  ">

                    <div class=" ">
                        <div class="mt-10 flex gap-5 ">
                            <div class="w-1/2">
                                <FloatLabel>
                                    <InputText id="over_label" v-model="userStore.user.name" class="w-full"/>
                                    <label for="over_label">Nome</label>
                                </FloatLabel>
                            </div>

                            <div class="w-1/2">
                                <FloatLabel>
                                    <InputText id="over_label" v-model="userStore.user.email" class="w-full"/>
                                    <label for="over_label">Email</label>
                                </FloatLabel>
                            </div>
                        </div>

                        <div class="mt-10  flex gap-5">
                            <div class="w-1/2 ">
                                <FloatLabel>
                                    <InputText id="over_label" v-model="userStore.user.password" class="w-full"
                                               type="password"/>
                                    <label for="over_label">Senha</label>
                                </FloatLabel>
                            </div>

                            <div class="w-1/2">
                                <FloatLabel>
                                    <InputText id="over_label" v-model="userStore.user.password_confirm" class="w-full"
                                               type="password"/>
                                    <label for="over_label">Confirmar senha</label>
                                </FloatLabel>
                            </div>
                        </div>

                        <Button :loading="loading" class="mt-8 w-full" icon="pi pi-save" label="salvar"
                                @click="salvar"/>
                    </div>
                </div>
            </div>
        </template>
    </Card>


</template>

<style scoped>
.profile-svg {
    width: 600px;
}
</style>
