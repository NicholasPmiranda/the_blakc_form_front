<script setup>
import {useRespostaFormStore} from "@/stores/RespostaFormStore.js";
import {useRoute} from "vue-router";
import {DataTable, Column,Paginator} from "primevue";

const respostaStore = useRespostaFormStore()
const route = useRoute()



function onPageChange(event){
    respostaStore.page = event.page +1
    respostaStore.per_page = event.per_page
    respostaStore.getResposta(route.params.id)

}
</script>

<template>
    <div class="overflow-x-auto w-full">
        <DataTable
            stripedRows
            sortMode="multiple"
            :value="respostaStore.respostas"
            class="w-full"
        >
            <div v-for="cabecalho in respostaStore.cabecalho" :key="cabecalho">
                <Column :field="cabecalho" :sortable="true" :header="cabecalho"/>
            </div>
        </DataTable>
        <Paginator
            :rows="respostaStore.last_page"
            :totalRecords="respostaStore.total_itens"
            @page="onPageChange"
        />
    </div>
</template>
