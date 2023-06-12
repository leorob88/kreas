<script>

import { reactive } from "vue";
import useListStore from "../stores/listStore";

export default {
    setup() {
        const listStore = useListStore()
        let quantity = reactive({ value: 0 });
        let howMany = reactive({ visibility: false });

        function less() {
            if (quantity.value > 0) { quantity.value-- }
            console.log(quantity.value);
        }
        return { listStore, quantity, howMany, less }
    }
}

</script>

<template>
    <div>
        <img id="image" :src="[listStore.list.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === $route.params.id)[0].image]" />
        {{ listStore.list.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === $route.params.id)[0].name }}
        <br />
        {{ listStore.list.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === $route.params.id)[0].description }}
        <br />
        {{ listStore.list.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === $route.params.id)[0].price }}
        <br />
        <button @click="howMany.visibility = true">Add to cart</button>
        <span v-if="howMany.visibility">
                <button @click="less()">-</button>
                <span>{{ quantity.value }}</span>
                <button @click="quantity.value++">+</button>
                <button @click="howMany.visibility = false; listStore.list.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === $route.params.id)[0].quantity += quantity.value">Ok</button>
                <button @click="howMany.visibility = false">Cancel</button>
        </span>
        <div>Currently added: {{ listStore.list.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === $route.params.id)[0].quantity }}</div>
    </div>
</template>

<style>

#image{
    width: 30%
}

</style>