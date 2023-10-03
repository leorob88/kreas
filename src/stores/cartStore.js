import {defineStore} from 'pinia';
import {computed, ref} from 'vue';

export const useCartStore = defineStore("myAwesomeCart", () => {
    const products = ref([]);

    const addToCart = (product, howMany) => {
        const index = products.value.findIndex(element => element.name === product.name);
        if (index < 0) {
            const newItem = {
                id: product.name,
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: howMany
            };
            products.value.push(newItem);
        } else {
            products.value[index].quantity += howMany;
        }
        
    }

    const removeToCart = (name) => {
        let index = products.value.findIndex((element) => element.name === name);
        products.value[index].quantity = 0;
    }

    const clearCart = () => {
        products.value.splice(0, products.value.length);
    }

    const getQuantityByName = (name) => {
        let index = products.value.findIndex((element) => element.name === name);
        return computed(() => products[index]?.quantity || 0);
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
                const product = products.value[i];
                const productTotal = product.price * product.quantity;
                totalPrice += productTotal;
            }
        }        
        return totalPrice;
    })

    return {products, addToCart, removeToCart, clearCart, getQuantityByName, emptyCart, totalCartPrice};
})