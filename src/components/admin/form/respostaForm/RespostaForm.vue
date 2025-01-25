<script setup>
import {Card,} from "primevue";
import {useRespostaFormStore} from "@/stores/RespostaFormStore.js";
import {useRoute} from "vue-router";
import RespostaFormTabela from "@/components/admin/form/respostaForm/RespostaFormTabela.vue";
import ToggleSwitch from 'primevue/toggleswitch';
import {ref} from "vue";
import RespostaVisualizacaoForm from "@/components/admin/form/respostaForm/RespostaVisualizacaoForm.vue";

const respostaStore = useRespostaFormStore()
const route = useRoute()
const tabela = ref(true)

respostaStore.getResposta(route.params.id)


</script>

<template>
    <Card class="w-full">
        <template #content>
            <div class="flex justify-center">
                <div class="flex gap-2">
                    visualizar modo tabela
                    <ToggleSwitch v-model="respostaStore.tabela"/></div>
            </div>
            <RespostaFormTabela class="mt-10" v-if="respostaStore.tabela  === true"/>
            <RespostaVisualizacaoForm class="mt-10" v-if="respostaStore.tabela === false"/>
        </template>
    </Card>

</template>

