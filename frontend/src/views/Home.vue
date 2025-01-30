<template>
  <div class="container mt-5">
    <h1 class="text-primary fw-bold">Главная страница</h1>
    <div v-if="!isAuthenticated" class="alert alert-warning d-flex align-items-center">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      Вы не авторизованы. Пожалуйста, войдите или зарегистрируйтесь.
    </div>
    <div v-else>
      <div class="mb-4 p-4 bg-light border rounded shadow-sm">
        <h2 class="text-secondary">Создать новый вишлист</h2>
        <CreateWishlistForm @wishlist-created="handleWishlistCreated" />
      </div>

      <WishlistTable :wishlists="wishlists" />
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { mapGetters } from 'vuex';
import CreateWishlistForm from '@/components/CreateWishlistForm.vue';
import WishlistTable from '@/components/WishlistTable.vue';

export default {
  components: {
    CreateWishlistForm,
    WishlistTable,
  },
  data() {
    return {
      wishlists: [],
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  async created() {
    if (this.isAuthenticated) {
      try {
        const response = await api.getWishlists();
        this.wishlists = response.data;
      } catch (error) {
        console.error('Ошибка загрузки вишлистов:', error.message);
      }
    }
  },
  methods: {
    handleWishlistCreated(newWishlist) {
      this.wishlists.push(newWishlist);
    },
  },
};
</script>

