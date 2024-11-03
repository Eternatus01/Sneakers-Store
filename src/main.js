import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import './style.css'
import App from './App.vue'

import Home from './pages/Home.vue';
import Favorites from './pages/Favorites.vue';

const app = createApp(App)

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/favorites', name: 'Favorites', component: Favorites },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')