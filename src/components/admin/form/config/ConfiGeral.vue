<script setup>
import {ColorPicker, FloatLabel, InputText, FileUpload} from "primevue";
import {useConfigGeral} from "@/stores/ConfigGeralStore.js";
const confiGeralStore = useConfigGeral()
</script>

<template class="fle">
    <div class="flex justify-center">
        <div class=" w-1/4">
            <div class="">
                <FloatLabel>
                    <InputText class="w-full" id="nome_form" v-model="value1"/>
                    <label for="nome_form">Nome formulario</label>
                </FloatLabel>
            </div>

            <div class="mt-8">
                <h1>Config de tema</h1>
                <small>altere cores do forumalario</small>
                <div class="mt-8">
                    <div class="flex justify-between  mt-2  ">
                        <div>Cor da Pergunta</div>
                        <div class="flex items-center  gap-2">
                            <ColorPicker v-model="confiGeralStore.cor_pergunta" format="hex"/>
                            <InputText v-model="confiGeralStore.cor_pergunta" class="w-24" />
                        </div>
                    </div>
                    <div class="flex justify-between  mt-2  ">
                        <div>Cor da resposta</div>
                        <div class="flex items-center  gap-2">
                            <ColorPicker v-model="confiGeralStore.cor_resposta"  format="hex"/>
                            <InputText v-model="confiGeralStore.cor_resposta" class="w-24" />
                        </div>
                    </div>
                    <div class="flex justify-between  mt-2  ">
                        <div>Cor do botao</div>
                        <div class="flex items-center  gap-2">
                            <ColorPicker v-model="confiGeralStore.cor_btn" format="hex"/>
                            <InputText v-model="confiGeralStore.cor_btn" class="w-24" />
                        </div>
                    </div>
                    <div class="flex justify-between  mt-2  ">
                        <div>Cor de fundo</div>
                        <div class="flex items-center  gap-2">
                            <ColorPicker v-model="confiGeralStore.cor_fundo"  format="hex"/>
                            <InputText class="w-24" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-8">
                <h1>Logo:</h1>
                <input type="file">
            </div>
            <div class="mt-8">
                <h1>imagem de fundo:</h1>
                <input type="file">
            </div>
        </div>
    </div>


</template>

<style scoped>

</style>
