<script setup>
import {Card, FloatLabel, Select} from "primevue";
import {useRespostaFormStore} from "@/stores/RespostaFormStore.js";
import {useRoute} from "vue-router";
import RespostaFormTabela from "@/components/admin/form/respostaForm/RespostaFormTabela.vue";
import ToggleSwitch from 'primevue/toggleswitch';
import RespostaVisualizacaoForm from "@/components/admin/form/respostaForm/RespostaVisualizacaoForm.vue";
import {ref} from "vue";

const respostaStore = useRespostaFormStore()
const route = useRoute()

const options = ref([
    {
        value: 'desc',
        text: 'mais recentes'
    },
    {
        value: 'asc',
        text: 'mais antigas'
    },
    {
        value: 'incopletas_crescente',
        text: 'incopletas crescente'
    },
    {
        value: 'completas',
        text: 'completas'
    },
])


</script>

<template>
    <Card class="w-full">
        <template #content>
            <div class="flex mt-4  justify-end">
                <div class="flex gap-2 ">
                    visualizar modo tabela
                    <ToggleSwitch v-model="respostaStore.tabela" @change="respostaStore.trocaVisualizacao()"/>

                </div>
            </div>
            <div class="flex mt-4  justify-end">
                <div class="flex gap-2">
                    Somente respostas completas
                    <ToggleSwitch v-model="respostaStore.completas"
                                  @change="respostaStore.getResposta(route.params.id)"/>
                </div>
            </div>

            <div class="flex mt-8  justify-end">
                <div class="flex gap-2">
                    <FloatLabel>
                        <label >Ordernar</label>
                        <Select  v-model="respostaStore.ordernar"
                                :options="options"
                                option-label="text"
                                option-value="value"
                                @change="respostaStore.getResposta(route.params.id)"
                        />
                    </FloatLabel>

                </div>
            </div>
            <RespostaFormTabela v-if="respostaStore.tabela  === true" class="mt-10"/>
            <RespostaVisualizacaoForm v-else class="mt-10"/>
        </template>
    </Card>

</template>

