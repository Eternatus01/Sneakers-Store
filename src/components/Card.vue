<template>
    <div>
        <div class="relative bg-white border border-slate-100 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition h-full flex flex-col justify-between" >
            <img
            v-if="onClickFavorite"
             @click="onClickFavorite" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="Like 2" class="absolute top-8 left-8 cursor-pointer">
            <img :src="imageUrl" alt="Sneaker">
            <p class="mt-2">{{ title }}</p>
            <div class="flex justify-between mt-5">
                <div class="flex flex-col ">
                    <span class="text-slate-400">Цена: </span>
                    <b>{{ price }} руб.</b>
                </div>
                <img class="cursor-pointer" v-if="onClickAdd" @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus">
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    imageUrl: String,
    title: String,
    price: Number,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickFavorite: Function,
    onClickAdd: Function
})



</script>