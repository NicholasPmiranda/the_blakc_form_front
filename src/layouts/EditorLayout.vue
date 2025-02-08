<script setup>
import {RouterView} from 'vue-router'
import {useUserStore} from "@/stores/UserStore.js";
const userStore = useUserStore()


if(userStore.user == null){
    userStore.profile()
}

</script>

<template>
    <div class="hidden  w-full sm:flex justify-center mt-3  ">
        <div class=" items-center w-11/12 ">
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
