import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Cart from "../views/Cart.vue";
import DetailedProduct from "../views/DetailedProduct.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart
    },
    {
        path: "/details/:id",
        name: "Details",
        component: DetailedProduct
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router