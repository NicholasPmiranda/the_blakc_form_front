<script setup>
import {RouterView, useRouter} from 'vue-router'
import {useUserStore} from "@/stores/UserStore.js";
import {Button, Card, Menu} from "primevue";
import {onMounted, ref} from "vue";

const userStore = useUserStore()
const menu = ref('')
const router = useRouter()


const mainItems = ref([

    {
        label: 'Perfil',
        items: [
            {
                label: 'Home',
                icon: 'pi pi-home',
                route:'/'
            },
            {
                label: 'Configuração',
                icon: 'pi pi-cog',
                route:'/perfil'
            },
            {
                label: 'Assinatura',
                icon: 'pi pi-dollar',
                route: '/assinatura'
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => {
                    localStorage.removeItem('token')
                    router.push('/login')
                }
            }
        ]
    },

]);

const toggle = (event) => {
    menu.value.toggle(event);
};

onMounted(async () => {
    await userStore.profile()

})
</script>

<template>
    <div class="hidden  w-full sm:flex justify-center mt-3  ">
        <div class=" items-center w-11/12 ">
            <Card class="card w-full">
                <template #content>
                    <div class="flex justify-between items-center">
                        <div>
                            UMA LOGO BONITA BEM AQUI
                        </div>
                        <div>
                            <Button aria-controls="overlay_menu" aria-haspopup="true" icon="pi pi-ellipsis-v" type="button"
                                    @click="toggle"/>
                            <Menu id="overlay_menu" ref="menu" :model="mainItems" :popup="true">
                                <template #item="{ item, props }">
                                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                                        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                                            <span :class="item.icon"/>
                                            <span class="ml-2">{{ item.label }}</span>
                                        </a>
                                    </router-link>
                                    <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                                        <span :class="item.icon"/>
                                        <span class="ml-2">{{ item.label }}</span>
                                    </a>
                                </template>
                            </Menu>
                        </div>
                    </div>
                </template>
            </Card>
            <RouterView/>
        </div>
    </div>
    <div class="block sm:hidden">
        <div class="flex justify-center text-center items-center h-screen text-4xl b ">
            Seu PC tá com saudades de você! Aproveita pra usar o editor nele!
        </div>
    </div>
</template>

<style scoped>

</style>
