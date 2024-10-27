<script setup>
import { reactive, watch, ref, onMounted, inject } from 'vue';
import CardList from '../components/CardList.vue';
import axios from 'axios';
import debounce from 'lodash.debounce';

const {addToCart, removeFromCart, cart} = inject('cart')

const items = ref([])

const filters  = reactive({
    sortBy: 'title',
    searchQuery: ''
})

const onChangeSelect = (event) => {
    filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
    filters.searchQuery = event.target.value
},350)

const addToFavorite = async (item) => {
    try {
        if(!item.isFavorite){
            const obj = {
                parentId: item.id,
                item
            }

            item.isFavorite = true

            const { data } = await axios.post('https://d3bf51039d141117.mokky.dev/favorites', obj)
            item.favoriteId = data.id
        } else {
            item.isFavorite = false
            await axios.delete(`https://d3bf51039d141117.mokky.dev/favorites/${item.favoriteId}`)
            item.favoriteId = null
        }
    } catch(e){
        console.log(e)
    }
}

const onClickAddPuls = (item) => {
    if(!item.isAdded){
        addToCart(item)
    } else {
        removeFromCart(item)
    }
}

onMounted(async () => {
    const localCart = localStorage.getItem('cart')
    cart.value = localCart ? JSON.parse(localCart) : []
    await fetchItems()
    await fetchFavorites()
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: cart.value.some((obj) => obj.id === item.id)
    }))
})

const fetchFavorites = async () => {
    const { data: favorites } = await axios.get('https://d3bf51039d141117.mokky.dev/favorites')
    items.value = items.value.map(item => {
        const favorite = favorites.find(obj => obj.parentId === item.id)
        if(!favorite){
            return item
        }
        return {
            ...item,
            isFavorite: true,
            favoriteId: favorite.id
        }
    })
}

    
watch(cart, () => {
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: false
    }))
})


const fetchItems = async ()  => {
    try {
        const params = {
            sortBy: filters.sortBy,
        }

        if(filters.searchQuery) {
            params.title = `*${filters.searchQuery}*`
        }

        const { data } = await axios.get(
            'https://d3bf51039d141117.mokky.dev/items', {
                params
            })

        items.value = data.map((obj) => ({
            ...obj,
            isFavorite: false,
            favoriteId: null,
            isAdded: false
        }))
    } catch (e) {
        console.log(e)
    }
}

watch(filters, fetchItems)
</script>

<template>
     <div class="flex justify-between items-center">
                <h2 class="text-3xl font-bold mb-8"> Все кроссовки </h2>
                <div class="flex gap-4">
                    <select @change="onChangeSelect" name="" id="" class="py-2 px-3 border rounded-md outline-none">
                            <option value="name" > По названию </option> 
                            <option value="price" > По цене(дешёвые) </option> 
                            <option value="-price" > По цене(Дорогие) </option> 
                        </select>
                    <div class="relative">
                        <img class="absolute left-4 top-3" src="/search.svg" alt="">
                        <input @input="onChangeSearchInput" type="text" placeholder="Поиск..." class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400">
                    </div>
                </div>
            </div>
            <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPuls" />
</template>

<style lang="">
    
</style>