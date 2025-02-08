<script setup>
import {Card, FloatLabel, Select,Button} from "primevue";
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
  async function downloadPdf(){
      try {
          respostaStore.loading_pdf = true
          // Aguarde a resposta com await
          const response = await respostaStore.getDowloadPDf(route.params.id)

          const blob = new Blob([response.data], { type: 'application/pdf' })
          const url = window.URL.createObjectURL(blob)

          const link = document.createElement('a')
          link.href = url

          // Como não temos o header, vamos usar um nome default com timestamp
          const filename = `relatorio_${new Date().getTime()}.pdf`
          link.setAttribute('download', filename)

          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

          window.URL.revokeObjectURL(url)
      } catch (error) {
          console.error('Erro ao fazer download:', error)
          // Aqui você pode adicionar uma notificação de erro
      } finally {
          respostaStore.loading_pdf = false
      }
 }
 async function downloadPlanilha(){
      try {
          respostaStore.loading_Planilha = true
          // Aguarde a resposta com await
          const response = await respostaStore.getDowloadPlanilha(route.params.id)

          const blob = new Blob([response.data], { type: 'application/x-xls' })
          const url = window.URL.createObjectURL(blob)

          const link = document.createElement('a')
          link.href = url

          // Como não temos o header, vamos usar um nome default com timestamp
          const filename = `relatorio_${respostaStore.ordernar}_${new Date().getTime()}.xlsx`
          link.setAttribute('download', filename)

          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

          window.URL.revokeObjectURL(url)
      } catch (error) {
          console.error('Erro ao fazer download:', error)
          // Aqui você pode adicionar uma notificação de erro
      } finally {
          respostaStore.loading_Planilha = false
      }
 }

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
                                :loading="respostaStore.loading_ordenacao"
                                @change="respostaStore.getResposta(route.params.id)"
                        />
                    </FloatLabel>

                </div>
            </div>
            <div class="flex mt-8  justify-end">
                <Button v-if="!respostaStore.tabela" icon="pi pi-download" label="download pdf" @click="downloadPdf" :loading="respostaStore.loading_pdf"/>
                <Button v-else icon="pi pi-download" label="download Excel" @click="downloadPlanilha" :loading="respostaStore.loading_Planilha"/>
            </div>
            <RespostaFormTabela v-if="respostaStore.tabela  === true" class="mt-10"/>
            <RespostaVisualizacaoForm v-else class="mt-10"/>
        </template>
    </Card>

</template>

