<script setup>
import {Button} from "primevue";
import {useUserStore} from "@/stores/UserStore.js";
const userStore = useUserStore()
</script>

<template>
    <h1>sina</h1>
    <Button @click="userStore.getAssinatura()" label="assinar"/>
</template>

<style scoped>

</style>
