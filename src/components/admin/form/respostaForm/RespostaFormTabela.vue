<script setup>
import {computed} from 'vue';
import {useRespostaFormStore} from "@/stores/RespostaFormStore.js";
import {useRoute} from "vue-router";
import {Column, DataTable, Paginator} from "primevue";

const respostaStore = useRespostaFormStore();
const route = useRoute();

respostaStore.getResposta(route.params.id);

// Estrutura ajustada para permitir ordenação
const formattedRespostas = computed(() => {
    return respostaStore.respostas.map(linha => {
        const obj = {};
        linha.forEach((resposta, index) => {
            const header = respostaStore.cabecalho[index];
            // Campo principal para valores (usado na ordenação)
            obj[header] = resposta.resposta;
            // Campo auxiliar para tipo (usado na renderização)
            obj[`${header}_type`] = resposta.tipo;
        });
        return obj;
    });
});

function onPageChange(event) {
    respostaStore.page = event.page + 1;
    respostaStore.per_page = event.rows;
    respostaStore.getResposta(route.params.id);
}

// Caso precise de ordenação server-side
function onSortChange(event) {
    if (event.sortField) {
        respostaStore.sortField = event.sortField;
        respostaStore.sortOrder = event.sortOrder;
        respostaStore.getResposta(route.params.id);
    }
}
</script>

<template>
    <div class="overflow-x-auto w-full">
        <DataTable
            :sortField="respostaStore.sortField"
            :sortOrder="respostaStore.sortOrder"
            :value="formattedRespostas"
            class="w-full"
            removableSort
            stripedRows
            @sort="onSortChange"
        >
            <Column
                v-for="(cabecalho, index) in respostaStore.cabecalho"
                :key="index"
                :field="cabecalho"
                :header="cabecalho"
                :sortable="true"
            >
                <template #body="{ data }">
                    <div v-if="data[`${cabecalho}_type`] === 'arquivo'">
                        <a
                            :href="data[cabecalho]"
                            class="p-button p-component p-button-icon-only"
                            download
                        >
                            <i class="pi pi-download"></i>
                        </a>
                    </div>
                    <span v-else>
                        {{ data[cabecalho] }}
                    </span>
                </template>
            </Column>
        </DataTable>

        <Paginator
            :first="(respostaStore.page - 1) * respostaStore.per_page"
            :rows="respostaStore.per_page"
            :totalRecords="respostaStore.total_itens"
            @page="onPageChange"
        />
    </div>
</template>

<style scoped>
.p-datatable {
    font-size: 0.9rem;
}

.p-column-title {
    font-weight: 600;
}

.p-paginator {
    margin-top: 1rem;
}
</style>
