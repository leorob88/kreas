<script setup>

import { ref, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useListStore } from "../stores/listStore";
import { useCartStore } from "../stores/cartStore";

const emit = defineEmits(["height"]);

onMounted(() => {
  emit("height");
})

const listStore = useListStore();
const cartStore = useCartStore();
const { items } = storeToRefs(listStore);
const { removeToCart, getQuantityByName } = cartStore;
const { addToCart } = cartStore;

const item = items.value.filter(element => element.name === decodeURI(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length)))[0];

let howMany = ref(0);
const howManyVisible = ref(false);

//graphic fixes
const height = ref("");
const page = ref("");

const fixSize = () => {
    console.log(page.value.style.paddingTop)
    height.value = `${window.innerHeight - page.value.getBoundingClientRect().top}px`;
    console.log(page)
}

const observer = ref(null);
const addObserver = () => {
    if (!page.value.id) {
        window.setTimeout(addObserver, 500);
    } else {
        observer.value = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation) {
                    let properties = window.getComputedStyle(page.value);
                    height.value = `${window.innerHeight - properties.getPropertyValue('top')}px`;
                }
            })
        })
        observer.value.observe(page.value, { attributes: true });
    }
}

onMounted(() => {
    page.value = document.getElementById("detailed");
    fixSize();
    window.addEventListener("resize", fixSize);
    addObserver();
})
onBeforeUnmount(() => { observer.value.disconnect(); })
onUnmounted(() => { window.removeEventListener("resize", fixSize); })

</script>

<template>
    <div id="detailed" :style="{minHeight : height}">
        <div id="image">
            <img :src="[item.image]" />
        </div>
        <p>{{ item.name }}</p>
        <p>{{ item.description }}</p>
        <p>
            Price: {{ item.price.toFixed(2) }}€
            <div id="add">
                <button @click="howManyVisible = true">Add to cart</button>
                <span v-show="howManyVisible">
                    <span id="selection">
                        <button @click="howMany--" :disabled="howMany < 1">-</button>
                        <span class="quantity">{{ howMany }}</span>
                        <button @click="howMany++" :disabled="howMany > 49">+</button>
                    </span>
                    <span id="confirm">
                        <button @click="addToCart(item, howMany); howManyVisible = false; howMany = 0" :disabled="howMany < 1">Ok</button>
                        <button @click="howManyVisible = false; howMany = 0">Cancel</button>
                    </span>
                </span>
            </div>
        </p>
        <p>Currently added: {{ getQuantityByName(item.name) }} (max 50)
            <div>
                <button v-if="getQuantityByName(item.name) > 0" @click="removeToCart(item.name)">Remove from cart</button>
            </div>
        </p>
    </div>
</template>

<style>

#detailed{
  background-color: rgb(200, 200, 200);
  margin:-8px;
}

#detailed button:disabled {
    background-color: rgb(150, 150, 150);
    border: solid grey 1px;
}

#image{
    padding-top: 20px;
    display: flex;
    justify-content: center;
}

#image img{
    width: 80%;
}

p{
    padding-left: 4px;
    padding-right: 4px;
    font-size: 0.8em;
}

#add{
    display: flex;
}

#selection{
    padding-left: 15px;
    padding-right: 15px;
}

#selection button, #confirm button{
    margin-left: 2px;
    margin-right: 2px;
}

#selection button {
    padding-left: 0px;
    padding-right: 0px;
    width: 20px;
    text-align: center;
}

.quantity{
    background-color: white;
    padding: 0;
    margin: 0;
    margin-left: 2px;
    margin-right: 2px;
    padding-top: 1px;
    padding-right: 1px;
    border: solid black 1px;
    border-radius: 3px;
    display: inline-block;
    width: 18px;
    height: 17px;
    text-align: center;
}

@media (min-width: 3840px) {
  #image{
    width: 30%
  }
}

</style>