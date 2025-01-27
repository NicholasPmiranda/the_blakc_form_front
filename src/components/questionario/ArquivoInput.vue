<script setup>
import {useQuestionarioStore} from "@/stores/QuestionarioStore.js";

const questionario = useQuestionarioStore()

const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    // Armazena os arquivos na store
    questionario.questao_select.arquivosSelecionados = files;

    // Se precisar de acesso imediato aos arquivos:
    questionario.resposta = 'arquivo'
    questionario.file = files[0]
    // Ou se preferir armazenar apenas os primeiros arquivos:
    // questionario.questao_select.arquivoSelecionado = files[0]; // Para single file
};
</script>

<template>
    <div>
        <p class="input-pergunta text-center">{{ questionario.questao_select.titulo }}</p>
        <p class="input-descricao text-center">{{ questionario.questao_select.descricao }}</p>

        <input class="input-text-area" type="file"
               @change="handleFileUpload"

        />
    </div>
</template>

<style scoped>
.input-pergunta {
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: pointer; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 25px;
    width: 100%;
    color: white;

}

.input-descricao {
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: pointer; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
    color: white;
}

.input-text-area {
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: pointer; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 16px;
    text-align: start;
    width: 100%;
    color: white;
    border-bottom: 1px solid #B182FF;

}

.input-text-area:hover {
    background-color: #1a142a;
}

.input-pergunta:hover {
    background-color: #1a142a;
}


.input-descricao:hover {
    background-color: #1a142a;
}
</style>
