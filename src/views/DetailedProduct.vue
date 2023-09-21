<script setup>

import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useCulturedMeatStore } from "../stores/listStore";

const culturedMeatStore = useCulturedMeatStore();
const {items} = storeToRefs(culturedMeatStore);

let quantity = reactive({ value: 0 });
let howMany = reactive({ visibility: false });

function less() {
    if (quantity.value > 0) { quantity.value-- }
    console.log(quantity.value);
}
// sono rimasto qui, la pagina del carrello e home si aprono ma tutto dipende dal prodotto specifico che non va
// non riesce a capire che .filter è una funzione, pensa che sia una proprietà e quindi dà errore e la pagina non funziona
</script>

<template>
    <div>
        <img id="image" :src="[items.value.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === $route.params.id)[0].image]" />
        {{ items.value.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === $route.params.id)[0].name }}
        <br />
        {{ items.value.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === $route.params.id)[0].description }}
        <br />
        {{ items.value.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === $route.params.id)[0].price }}
        <br />
        <button @click="howMany.visibility = true">Add to cart</button>
        <span v-if="howMany.visibility">
                <button @click="less()">-</button>
                <span>{{ quantity.value }}</span>
                <button @click="quantity.value++">+</button>
                <button @click="howMany.visibility = false; items.value.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === $route.params.id)[0].quantity += quantity.value">Ok</button>
                <button @click="howMany.visibility = false">Cancel</button>
        </span>
        <div>Currently added: {{ items.value.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === $route.params.id)[0].quantity }}</div>
    </div>
</template>

<style>

#image{
    width: 30%
}

</style>