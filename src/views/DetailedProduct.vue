<script setup>

import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useListStore } from "../stores/listStore";
import { useCartStore } from "../stores/cartStore";

const listStore = useListStore();
const cartStore = useCartStore();
const {items} = storeToRefs(listStore);
const {removeToCart, getQuantityByName} = cartStore;
const {addToCart} = cartStore;

const item = items.value.filter(element => element.name === decodeURI(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length)))[0];

let howMany = ref(0);
const howManyVisible = ref(false);

</script>

<template>
    <div>
        <img id="image" :src="[item.image]" />
        <br />
        {{ item.name }}
        <br />
        {{ item.description }}
        <br />
        Price: {{ item.price }}€ <button @click="howManyVisible = true">Add to cart</button>
        <span v-if="howManyVisible">
                <button @click="howMany--" :disabled="howMany < 1">-</button>
                <span>{{ howMany }}</span>
                <button @click="howMany++">+</button>
                <button @click="addToCart(item, howMany); howManyVisible = false; howMany = 0">Ok</button>
                <button @click="howManyVisible = false; howMany = 0">Cancel</button>
        </span>
        <br />
        Currently added: {{ getQuantityByName(item.name) }}  <button v-if="getQuantityByName(item.name) > 0" @click="removeToCart(item.name)">Remove from cart</button>
    </div>
</template>

<style>

#image{
    width: 30%
}

</style>