<template>
    <div>
        <button @click="generatePDF">Gerar PDF</button>

        <!-- Div que será convertida em PDF -->
        <div class="pdf-content" ref="pdfTemplate">
            <h1>Relatório de Vendas</h1>
            <p>Data: {{ currentDate }}</p>

            <table class="sales-table">
                <thead>
                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in sales" :key="item.id">
                    <td>{{ item.product }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>R$ {{ item.price }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Dados reativos
const currentDate = ref(new Date().toLocaleDateString());
const sales = ref([
    { id: 1, product: "Camiseta", quantity: 5, price: 50.00 },
    { id: 2, product: "Calça", quantity: 2, price: 120.00 },
]);

// Referência ao template HTML
const pdfTemplate = ref(null);

const generatePDF = async () => {
    // Captura o HTML como imagem usando html2canvas
    const canvas = await html2canvas(pdfTemplate.value, {
        scale: 2, // Aumenta a resolução (opcional)
        useCORS: true, // Permite imagens externas (se necessário)
    });

    // Configura o PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4'); // Formato A4

    // Calcula dimensões para centralizar a imagem no PDF
    const imgWidth = 190; // Largura máxima no PDF (A4: 210mm)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Adiciona a imagem ao PDF
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save('relatorio.pdf');
};
</script>

<style scoped>
.pdf-content {
    background: white;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.sales-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
}

.sales-table th, .sales-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.sales-table th {
    background-color: #f5f5f5;
}
</style>
