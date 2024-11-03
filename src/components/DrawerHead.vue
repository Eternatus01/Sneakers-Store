<template>
    <div class="flex items-center gap-5 mb-8">
        <img @click="closeDrawer" src="../assets/arrow-right.svg" alt="" class="opacity-80 cursor-pointer rotate-180 hover:opacity-100 transition hover:-translate-x-1">
        <h2 class="text-2xl font-bold">Корзина</h2>
    </div>
</template>

<script setup> 
import { inject } from 'vue';

const { closeDrawer } = inject('cart');
</script>