<script setup>

import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCulturedMeatStore } from "../stores/listStore";
import { useCartStore } from "../stores/cartStore";

const culturedMeatStore = useCulturedMeatStore();
const cartStore = useCartStore();
const {items} = storeToRefs(culturedMeatStore);
const {getQuantityByName} = cartStore;
const {addToCart} = cartStore;

const item = items.value.filter(element => element.name === decodeURI(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length)))[0];

let howMany = ref(0);
const howManyVisible = ref(false);

</script>

<template>
    <div>
        <img id="image" :src="[item.image]" />
        {{ item.name }}
        <br />
        {{ item.description }}
        <br />
        {{ item.price }}€   
        <br />
        <button @click="howManyVisible = true">Add to cart</button>
        <span v-if="howManyVisible">
                <button @click="howMany--" :disabled="howMany < 1">-</button>
                <span>{{ howMany }}</span>
                <button @click="howMany++">+</button>
                <button @click="addToCart(item, howMany); howManyVisible = false; howMany = 0">Ok</button>
                <button @click="howManyVisible = false; howMany = 0">Cancel</button>
        </span>
        <div>Currently added: {{ getQuantityByName(item.name) }}</div>
    </div>
</template>

<style>

#image{
    width: 30%
}

</style>