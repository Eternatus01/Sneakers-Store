<template>
    <div class="flex flex-col items-center text-center w-72 mx-auto">
        <img height="70" :src="imageUrl" :alt="title">
        <h2 class="mt-4 text-2xl font-medium">{{title}}</h2>
        <p class="text-gray-400 mt-2">{{description}}</p>
    </div>
    
</template>
<script setup>
    defineProps({
        title: String,
        imageUrl: String,
        description: String
    })
</script>
<style >
    
</style>