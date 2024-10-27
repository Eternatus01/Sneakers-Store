<template>
    <div class="grid grid-cols-4 gap-5 mt-5" v-auto-animate>
        <Card 
        v-for="item in items"
        :key="item.id"
        :isAdded="item.isAdded" 
        :imageUrl="item.imageUrl" 
        :title="item.title" 
        :price="item.price"
        :isFavorite="item.isFavorite"
        :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
        :onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
        />
    </div>
</template>
<script setup>
import Card from './Card.vue';

defineProps({
    items: Array,
    isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>