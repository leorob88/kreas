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
    height.value = `${window.innerHeight - page.value.getBoundingClientRect().top}px`;
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
    window.addEventListener("scroll", fixSize);
    addObserver();
})
onBeforeUnmount(() => {
    observer.value.disconnect();
})
onUnmounted(() => {
    window.removeEventListener("resize", fixSize);  window.removeEventListener("scroll", fixSize);
})

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
                <span id="selection" v-show="howManyVisible">
                    <span id="selectors">
                        <button @click="howMany--" :disabled="howMany < 1">-</button>
                        <div class="quantity">{{ howMany }}</div>
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

#image{
    padding-top: 20px;
    display: flex;
    justify-content: center;
}

#image img{
    width: 80%;
}

p{
    padding-left: 10px;
    padding-right: 10px;
    font-size: 0.9em;
}

#detailed button{
    height: 23px;
}

#detailed button:disabled{
    background-color: rgb(150, 150, 150);
    border: solid grey 1px;
}

#add{
    display: flex;
}

#selection{
    display: flex;
}

#selectors{
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
}

#selectors button, #confirm button{
    margin-left: 2px;
    margin-right: 2px;
}

#selectors button{
    width: 24px;
    text-align: center;
}

.quantity{
    background-color: white;
    padding: 0;
    margin: 0;
    margin-left: 2px;
    margin-right: 2px;
    padding-top: 2px;
    border: solid black 1px;
    border-radius: 3px;
    width: 23px;
    text-align: center;
}

@media (min-width: 576px) {
  #image{
    padding-top: 34px;
  }

  p{
    padding-left: 18px;
    padding-right: 18px;
    font-size: 1.1em;
  }

  #detailed button{
    height: 42px;
  }

  #selectors{
    padding-left: 35px;
    padding-right: 35px;
  }

  #selectors button, #confirm button{
    margin-left: 3px;
    margin-right: 3px;
  }

  #selectors button{
    width: 42px;
  }

  .quantity{
    margin-left: 3px;
    margin-right: 3px;
    padding-top: 2px;
    width: 41px;
  }
}

@media (min-width: 3840px) {
  #image{
    width: 30%
  }
}

</style>