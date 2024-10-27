<template>
    <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
    <CardList :items="favorites" is-favorites />
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import CardList from '../components/CardList.vue';

const favorites = ref([])

onMounted( async () => {
    try {
        const {data} = await axios.get('https://d3bf51039d141117.mokky.dev/favorites')

        favorites.value = data.map((obj) => obj.item)
    } catch (error) {
        console.log(error);
    }
})
</script>

<style scoped>

</style>