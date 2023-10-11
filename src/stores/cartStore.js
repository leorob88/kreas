import {defineStore} from 'pinia';
import {computed, ref} from 'vue';

export const useCartStore = defineStore("myAwesomeCart", () => {
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

    const removeToCart = (name) => {
        for (let i = 0; i < products.value.length; i++) {
            if (products.value[i].name == name) {
                products.value.splice(i, 1)
            }
        }
        console.log(products)
    }

    const clearCart = () => {
        products.value.splice(0, products.value.length);
    }

    const getQuantityByName = (name) => {
        return computed(() => products.value.filter(product => product.name === name).length);
    };

    const emptyCart = computed(() => {
        let empty = products.value.length === 0;
        console.log(products.value.length)
        return empty;
    })

    const totalCartPrice = computed(() => {
        let totalPrice = 0;
        if (products.value.length > 0) {
            for (let i = 0; i < products.value.length; i++) {
                totalPrice += products.value[i].price;
            }
        }        
        return totalPrice;
    })

    return {products, addToCart, removeToCart, clearCart, getQuantityByName, emptyCart, totalCartPrice};
})