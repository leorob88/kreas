import {defineStore} from 'pinia';
import {computed, ref} from 'vue';

export const useCartStore = defineStore("cartStore", () => {
    const products = ref([]);

    const addToCart = (product, howMany) => {
        if (howMany > 0) {
            for (let i = 0; i < howMany; i++) {
                const newItem = {
                    id: product.name,
                    productId: product.id,
                    name: product.name,
                    price: product.price
                };
                products.value.push(newItem);
            }
        }
    }

    const uniqueList = computed(() => {
        let unique = [];
        for (let a = 0; a < products.value.length; a++) {
          let check = false;
          for (let b = 0; b < unique.length; b++) {
            if (products.value[a].name === unique[b].name) {
              check = true;
              break;
            }
          }
          if (!check) {
            unique.push(products.value[a])
          }
        }
        return unique;
    })

    const removeToCart = (name) => {
        products.value = products.value.filter(product => product.name !== name);
        //autoscroll feature when empty space remains at the bottom of the page
        let lastId = "cart-list-" + (uniqueList.value.length - 1);
        let lastDiv = document.getElementById(lastId);
        let lastDivBottom = lastDiv.getBoundingClientRect().bottom;
        let cartHeight = document.getElementById("cart").getBoundingClientRect().height;
        let cartTop = document.getElementById("cart").offsetTop;
        if ((window.innerHeight - lastDivBottom) > 10) {
            if ((cartTop + cartHeight) > window.innerHeight) {
                lastDiv.scrollIntoView({block: "end", behavior: "smooth"});
            } else {
                window.scrollTo({top: 0, left: 0, behavior: "smooth"});
            }
        }
    }

    const clearCart = () => {
        products.value.splice(0, products.value.length);
    }

    const getQuantityByName = (name) => {
        return products.value.filter(product => product.name === name).length;
    };

    const emptyCart = computed(() => {
        let empty = products.value.length === 0;
        return empty;
    })

    const discount = computed(() => {
        let largePurchase = products.value.length > 2;
        return largePurchase;
    });

    const tempCartPrice = computed(() => {
        let tempPrice = 0;
        if (products.value.length > 0) {
            for (let i = 0; i < products.value.length; i++) {
                tempPrice += products.value[i].price;
            }
        }
        return tempPrice.toFixed(2);
    })

    const totalCartPrice = computed(() => {
        let totalPrice = tempCartPrice.value;
        if (discount) {
            totalPrice *= 0.9;
        }
        return totalPrice.toFixed(2);
    })

    return {products, addToCart, uniqueList, removeToCart, clearCart, getQuantityByName, emptyCart, discount, tempCartPrice, totalCartPrice};
})