<script setup>

import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useCulturedMeatStore } from "../stores/listStore";

const culturedMeatStore = useCulturedMeatStore();
const {items} = storeToRefs(culturedMeatStore);

const product = items.value.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length))[0];
console.log(product)

let quantity = reactive({ value: 0 });
let howMany = reactive({ visibility: false });

function less() {
    if (quantity.value > 0) { quantity.value-- }
    console.log(quantity.value);
}
</script>

<template>
    <div>
        <img id="image" :src="[product.image]" />
        {{ product.name }}
        <br />
        {{ product.description }}
        <br />
        {{ product.price }}€
        <br />
        <button @click="howMany.visibility = true">Add to cart</button>
        <span v-if="howMany.visibility">
                <button @click="less()">-</button>
                <span>{{ quantity.value }}</span>
                <button @click="quantity.value++">+</button>
                <button @click="howMany.visibility = false; product.quantity += quantity.value">Ok</button>
                <button @click="howMany.visibility = false">Cancel</button>
        </span>
        <div>Currently added: {{ product.quantity }}</div>
    </div>
</template>

<style>

#image{
    width: 30%
}

</style>