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

//graphic fixes needed to avoid the container position: fixed
const height = ref("");
const page = ref("");

const fixSize = () => {
    height.value = window.innerHeight - page.value.getBoundingClientRect().top;
    if (screen.width >= 1600) {height.value += 1}
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
                    height.value = window.innerHeight - properties.getPropertyValue('top');
                    if (screen.width >= 1600) {height.value += 1}
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
    window.removeEventListener("resize", fixSize);
    window.removeEventListener("scroll", fixSize);
})

</script>

<template>
    <div id="detailed" :style="{ minHeight: `${height}px`}">
        <div id="part-1">
            <div id="image">
                <img :src="[item.image]" />
            </div>
            <div id="text">
                <p>{{ item.name }}</p>
                <p>{{ item.description }}</p>
            </div>
        </div>
        <div id="part-2">
            <p>
            Price: {{ item.price.toFixed(2) }}€
            <div id="add">
                <button id="add-button" @click="howManyVisible = true">Add to cart</button>
                <span id="selection" v-show="howManyVisible">
                    <span id="selectors">
                        <button @click="howMany--" :disabled="howMany < 1">-</button>
                        <div class="quantity">{{ howMany }}</div>
                        <button @click="howMany++" :disabled="(getQuantityByName(item.name) + howMany) > 49">+</button>
                    </span>
                    <span id="confirm">
                        <button @click="addToCart(item, howMany); howManyVisible = false; howMany = 0" :disabled="howMany < 1">Ok</button>
                        <button @click="howManyVisible = false; howMany = 0">Cancel</button>
                    </span>
                </span>
            </div>
            </p>
            <p>
                Currently added: {{ getQuantityByName(item.name) }} (max 50)
                <div>
                    <button id="remove" v-if="getQuantityByName(item.name) > 0" @click="removeToCart(item.name)">Remove from cart</button>
                </div>
            </p>
        </div>
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

  #image img{
    width: 70%;
  }

  p{
    padding-left: 18px;
    padding-right: 18px;
    font-size: 1.01em;
  }

  #detailed button{
    font-size: 0.9em;
    height: 36px;
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
    width: 36px;
  }

  .quantity{
    font-size: 0.9em;
    margin-left: 3px;
    margin-right: 3px;
    padding-top: 3px;
    width: 38px;
  }
}

@media (min-width: 768px) {
  #part-1{
    display: flex;
    justify-content:space-evenly;
  }

  #image{
    padding-top: 25px;
    display: block;
    width: 40%;
  }

  #image img{
    width: 100%;
  }

  #text{
    width: 50%;
  }

  p{
    font-size: 0.98em;
  }

  #part-1 p{
    margin-top: 18px;
    padding-left: 0;
    padding-right: 0;
  }

  #part-2 p{
    margin-top: 0px;
    padding-left: 20px;
    padding-right: 20px;
  }

  #detailed button{
    height: 48px;
  }

  #detailed button:disabled{
    border: solid grey 2px;
  }

  #selectors{
    padding-left: 55px;
    padding-right: 55px;
  }

  #selectors button, #confirm button{
    margin-left: 5px;
    margin-right: 5px;
  }

  #selectors button{
    width: 48px;
  }

  .quantity{
    margin-left: 5px;
    margin-right: 5px;
    padding-top: 4px;
    border: solid black 2px;
    border-radius: 6px;
    width: 50px;
  }
}

@media (min-width: 992px) {  
  #image{
    padding-top: 35px;
    width: 42%;
  }

  #text{
    width: 48%;
  }

  #part-1 p{
    margin-top: 28px;
    margin-bottom: 0;
  }

  #part-2 p{
    padding-left: 35px;
    padding-right: 35px;
  }

  #detailed button{
    height: 58px;
  }

  #add{
    font-size: 0.99em;
  }

  #add #add-button{
    font-size: 1.15em;
  }

  #selectors{
    padding-left: 70px;
    padding-right: 70px;
  }

  #selectors button, #confirm button{
    margin-left: 5px;
    margin-right: 5px;
  }

  #selectors button{
    width: 58px;
  }

  .quantity{
    padding-top: 2px;
    width: 60px;
  }
}

@media (min-width: 1280px) {
  #part-1{
    padding-left: 15px;
    justify-content: flex-start;
  }

  #image{
    width: 10%;
  }

  #part-1, #part-2{
    font-size: 1.02em;
  }

  #part-1 p{
    margin-top: 0;
  }

  #text{
    width: 85%;
    margin-top: 32px;
    margin-bottom: 0;
    padding-left: 15px;
  }

  #part-2 p{
    padding-left: 16px;
    padding-right: 16px;
  }

  #detailed button{
    height: 36px;
  }

  #selectors{
    padding-left: 30px;
    padding-right: 30px;
  }

  #selectors button, #confirm button{
    font-size: 1.05em;
    margin-left: 5px;
    margin-right: 5px;
  }

  #selectors button{
    width: 36px;
  }

  .quantity{
    font-size: 1.08em;
    margin-left: 2px;
    margin-right: 2px;
    padding-top: 2px;
    width: 38px;
  }

  #part-2 #remove{
    font-size: 1.1em;
  }
}

@media (min-width: 1920px) {
  #image{
    padding-top: 60px;
  }

  #text{
    margin-top: 60px;
  }
}

@media (min-width: 2560px) {
  #part-1{
    padding-left: 25px;
  }

  #image{
    padding-top: 80px;
  }

  #part-1, #part-2{
    font-size: 1.3em;
  }

  #text{
    margin-top: 80px;
    padding-left: 25px;
  }

  #part-2 p{
    padding-left: 25px;
    padding-right: 25px;
  }

  #add{
    font-size: 0.9em;
  }

  #detailed button{
    height: 48px;
  }

  #selectors{
    padding-left: 50px;
    padding-right: 50px;
  }

  #selectors button, #confirm button{
    font-size: 0.95em;
    margin-left: 6px;
    margin-right: 6px;
  }

  #selectors button{
    width: 48px;
  }

  .quantity{
    font-size: 0.94em;
    margin-left: 4px;
    margin-right: 4px;
    width: 50px;
  }

  #part-2 #remove{
    font-size: 0.95em;
  }
}

@media (min-width: 3840px) {
  #part-1{
    padding-left: 50px;
  }

  #image{
    width: 15%;
    padding-top: 110px;
  }

  #part-1, #part-2{
    font-size: 1.47em;
  }

  #text{
    width: 80%;
    margin-top: 110px;
    padding-left: 50px;
  }

  #part-2 p{
    font-size: 1.18em;
    padding-left: 50px;
    padding-right: 50px;
  }

  #add{
    font-size: 0.87em;
  }

  #detailed button{
    height: 120px;
    padding-left: 13px;
    padding-right: 13px;
  }

  #selectors{
    padding-left: 120px;
    padding-right: 120px;
  }

  #selectors button, #confirm button{
    font-size: 0.79em;
    margin-left: 10px;
    margin-right: 10px;
  }

  #selectors button{
    width: 118px;
  }

  .quantity{
    font-size: 0.8em;
    border: solid black 3px;
    border-radius: 9px;
    padding-top: 13px;
    margin-left: 10px;
    margin-right: 10px;
    width: 125px;
  }

  #part-2 #remove{
    font-size: 0.83em;
  }
}

</style>