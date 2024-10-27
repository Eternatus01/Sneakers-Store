<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="bg-white w-96 h-full right-0 fixed top-0 z-20 p-8">
        <DrawerHead></DrawerHead>
        <CartItemList></CartItemList>
        <div v-if="!totalPrice || orderId" class="flex h-full items-center">
                <info-block  
                v-if="orderId"
                title="Заказ оформлен!" 
                :description="`ваш заказ №${orderId} скоро будет передан курьерской доставке`" 
                image-url="/order-success-icon.png" />

                <info-block  
                v-if="!totalPrice && !orderId"
                title="Пустая карзина" 
                description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." 
                image-url="/package-icon.png" />
        </div>
        <div class="flex flex-col gap-2 mb-5 my-7" v-else>
            <div class="flex gap-2">
                <span>Итого:</span>
                <div class="flex-1 border_b border-dashed"></div>
                <b>{{totalPrice}} Руб.</b>
            </div>
            <div class="flex gap-2">
                <span>Налог 5%:</span>
                <div class="flex-1 border_b border-dashed"></div>
                <b>{{vatPrice}} Руб.</b>
            </div>
            <button @click="createOrder" :disabled="ButtonDisabled" class=" mt-4 disabled:bg-slate-400 cursor-pointer bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition">Оформить заказ</button>
        </div>
    </div>
</template>

<script setup>
import DrawerHead from './DrawerHead.vue';
import CartItemList from './CartItemList.vue';
import InfoBlock from './InfoBlock.vue';
import { ref, inject, computed} from 'vue';
import axios from 'axios';

const props = defineProps({
    totalPrice: Number
})

const isCreating = ref(false)
const {cart} = inject('cart')
const orderId = ref(null)

const createOrder = async () => {
    try {
        const { data } = await axios.post('https://d3bf51039d141117.mokky.dev/orders', {
            items: cart.value,
            totalPrice: props.totalPrice
        })

        cart.value = []

        orderId.value = data.id

        return data
    } catch (e) {
        console.log(e)
    } finally {
        isCreating.value = false
    }
}

const ButtonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
const cartIsEmpty = computed(() => cart.value.length === 0)
const vatPrice = computed(() => Math.round((props.totalPrice * 5) / 100))
</script>

