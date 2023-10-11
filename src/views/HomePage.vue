<script setup>

import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useCulturedMeatStore } from "../stores/listStore";
import Item from "../components/Item.vue"

const culturedMeatStore = useCulturedMeatStore();
const {items, loading, loaded, error} = storeToRefs(culturedMeatStore);
const showList = computed(() => !loading.value && loaded.value);

console.log("home")

</script>

<template>
  <div id="home">
    
    <p v-if="loading">Loading...</p>

    <div v-if="showList" v-for="(item) in items">
      <Item :item="item" />
    </div>

    <p v-if="error">{{ error }}</p>

  </div>
</template>

<style>

#home{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}


</style>