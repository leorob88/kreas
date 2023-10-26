<script setup>

import { ref, onMounted, onBeforeUnmount, onUnmounted } from "vue"; 
import { storeToRefs } from "pinia";
import { useListStore } from "../stores/listStore";
import { useCartStore } from "../stores/cartStore";
import Product from "../components/Product.vue";

const emit = defineEmits(["height"]);

onMounted(() => {
  emit("height");
})

const listStore = useListStore();
const {items} = storeToRefs(listStore);
const cartStore = useCartStore();
const {uniqueList, emptyCart, discount, tempCartPrice, totalCartPrice} = storeToRefs(cartStore);
const {clearCart} = cartStore;

const getItem = (name) => {
  const item = items.value.filter(element => element.name === name)[0];
  return item;
}
const buy = () => {
  alert("Thank you for the purchase, dear customer!");
  clearCart();
}

//graphic fixes needed to avoid the container position: fixed
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
    page.value = document.getElementById("cart-page");
    fixSize();
    window.addEventListener("resize", fixSize);
    addObserver();
})
onBeforeUnmount(() => {
  observer.value.disconnect();
})
onUnmounted(() => {
  window.removeEventListener("resize", fixSize);
})

</script>

<template>
  <div id="cart-page" :style="{minHeight : height}">
    <div v-if="emptyCart" id="no-items">Your cart is empty</div>
    <div v-else>
      <div id="summary">
        <div>
          <div v-if="discount">
            <span>Total price: </span><span :style="{ 'text-decoration': 'line-through', 'color': 'grey' }">{{ tempCartPrice }}€</span>&nbsp;<span>{{ totalCartPrice }}€
              <br />
              (you get a 10% discount for purchasing at least 3 products)</span>
          </div>
          <span v-else>Total price: {{ totalCartPrice }}€</span>
        </div>
        <div>
          <button class="cart-button" @click="clearCart">Clear cart</button>
          <br />
          <button class="cart-button" @click="buy()">Proceed</button>
        </div>
      </div>
      <div id="cart">
        <div id="cart-list" v-for="(product) in uniqueList">
          <Product :item="getItem(product.name)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>

#cart-page{
  background-color: rgb(200, 200, 200);
  margin: -8px;
  font-size: 0.9em;
}

#summary{
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 10px;
}

#no-items{
  padding-top: 20px;
  padding-left: 20px;
}

.cart-button{
  font-size: 0.9em;
  width: 65px;
  margin: 0;
  padding: 1px;
  margin-top: 4px;
  margin-bottom: 4px;
}

#cart{
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
}

#cart-list{
  width: 63%;
}

@media (min-width: 576px) {
  #summary{
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 34px;
    padding-bottom: 17px;
  }

  #no-items{
    font-size: 1.2em;
    padding-top: 34px;
    padding-left: 32px;
  }

  .cart-button{
    font-size: 1em;
    width: 130px;
    margin: 0;
    padding: 2px;
    margin-top: 7px;
    margin-bottom: 7px;
  }
}

@media (min-width: 768px) {
  #cart-page{
    font-size: 0.86em;
  }

  #summary{
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 25px;
    padding-bottom: 24px;
  }

  #no-items{
    font-size: 1.55em;
    padding-top: 25px;
    padding-left: 40px;
  }

  .cart-button{
    font-size: 1em;
    width: 130px;
    margin: 0;
    padding: 2px;
    margin-top: 7px;
    margin-bottom: 7px;
  }

  #cart{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }

  #cart-list{
    width: 80%;
  }
}

@media (min-width: 992px) {
  #cart-page{
    font-size: 0.82em;
  }

  #summary{
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 35px;
    padding-bottom: 24px;
  }

  #no-items{
    font-size: 1.95em;
    padding-top: 35px;
    padding-left: 40px;
  }

  .cart-button{
    font-size: 1.32em;
    width: 220px;
  }
  
  #cart-list{
    font-size: 1.25em;
    width: 88%;
  }
}

@media (min-width: 3840px) {
  #cart{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

</style>