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

    const totalCartPrice = computed(() => {
        let totalPrice = 0;
        if (products.value.length > 0) {
            for (let i = 0; i < products.value.length; i++) {
                totalPrice += products.value[i].price;
            }
        }
        if (products.value.length > 2) { totalPrice *= 0.9;}
        return totalPrice.toFixed(2);
    })

    return {products, addToCart, uniqueList, removeToCart, clearCart, getQuantityByName, emptyCart, totalCartPrice};
})