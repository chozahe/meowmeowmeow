import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';
import AuthPage from '../views/AuthPage.vue';
import WishlistDetails from "@/views/WishlistDetails.vue";
const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: AuthPage },
  { path: '/wishlist/:id', component: WishlistDetails, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;