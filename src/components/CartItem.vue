<template>
    <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
        <img class="w-16 h-16" :src="'/Sneakers-Store' + imageUrl" :alt="title">

        <div class="flex flex-col">
            <p>{{title}}</p>

            <div class="flex justify-between mr-2 flex-1">
                <b class="flex-1">{{price}} руб.</b>
                <img @click="emit('onClickRemove')" class="opacity-30 hover:opacity-100 cursor-pointer transition" src="../assets/close.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup> 
 defineProps({
    imageUrl: String,
    title: String,
    price: Number,
 })

 const emit = defineEmits(['onClickRemove'])
</script>