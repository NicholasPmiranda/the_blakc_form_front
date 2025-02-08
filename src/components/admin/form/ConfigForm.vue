<script setup>
import {Card, Accordion, AccordionContent,AccordionPanel,
    Button, AccordionHeader} from "primevue";

import ConfiGeral from "@/components/admin/form/config/ConfiGeral.vue";
import Integracoes from "@/components/admin/form/config/Integracoes.vue";
import Rastreio from "@/components/admin/form/config/Rastreio.vue";
import Utms from "@/components/admin/form/config/Utms.vue";
</script>

<template>
    <Card class="w-full">
        <template #content>
            <Accordion :value="['0']" multiple>
                <AccordionPanel value="0">
                    <AccordionHeader class="flex justify-center">
                        <Button label="Configuacoes gerais " variant="text" />
                    </AccordionHeader>
                    <AccordionContent>
                        <ConfiGeral/>
                    </AccordionContent>
                </AccordionPanel>

<!--                <AccordionPanel value="2">-->
<!--                    <AccordionHeader>-->
<!--                        <Button label="Integracoes" variant="text" />-->
<!--                    </AccordionHeader>-->
<!--                    <AccordionContent>-->
<!--                            <Integracoes/>-->
<!--                    </AccordionContent>-->
<!--                </AccordionPanel>-->
                <AccordionPanel value="3">
                    <AccordionHeader>
                        <Button label="Rastreios" variant="text" />

                    </AccordionHeader>
                    <AccordionContent>
                        <Rastreio/>
                    </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="4">
                    <AccordionHeader>
                        <Button label="Utms" variant="text" />

                    </AccordionHeader>
                    <AccordionContent>
                        <Utms/>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </template>
    </Card>
</template>

<style scoped>

</style>
