<script setup>
import Header from './components/Header.vue';
import Drawer from './components/Drawer.vue';
import {  ref, watch, provide, computed } from 'vue';

const cart = ref([])


const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((sum, item) => sum + item.price, 0))


const closeDrawer = () => {
    drawerOpen.value = false
}

const openDrawer = () => {
    drawerOpen.value = true
}

const addToCart = (item) => {
    cart.value.push(item)
    item.isAdded = true
}


const removeFromCart = (item) => {
    cart.value.splice(cart.value.indexOf(item), 1)
    item.isAdded = false
}

watch(cart, () => localStorage.setItem('cart', JSON.stringify(cart.value)), {deep: true})

provide('cart', {
    cart,
    closeDrawer,
    openDrawer,
    addToCart,
    removeFromCart
})

</script>

<template>

    <div class="w-4/5 m-auto bg-white h-auto rounded-xl shadow-xl mt-14">
    <Drawer v-if="drawerOpen" :total-price="totalPrice"></Drawer>
        <Header @open-drawer="openDrawer" :totalPrice="totalPrice"></Header>
        <div class="p-10">
            <router-view />
        </div>
    </div>
</template>

<style scoped>

</style>