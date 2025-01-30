<template>
  <form @submit.prevent="createWishlist" class="d-flex flex-column gap-3">
    <div>
      <label for="title" class="form-label fw-semibold">Название вишлиста</label>
      <input v-model="title" type="text" class="form-control border-0 shadow-sm" id="title" placeholder="Введите название вишлиста" required />
    </div>
    <button type="submit" class="btn btn-primary w-100 fw-semibold">Создать вишлист</button>
  </form>
</template>


<script>
import api from '@/api';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      title: '', // Название вишлиста
    };
  },
  methods: {
    ...mapActions(['saveToken']),
    async createWishlist() {
      try {
        const response = await api.createWishlist(this.title);
        this.$emit('wishlist-created', response.data); // Уведомляем родителя о создании вишлиста
        this.title = ''; // Очищаем поле ввода
      } catch (error) {
        console.error('Ошибка создания вишлиста:', error.message);
        alert('Ошибка создания вишлиста: ' + (error.response ? error.response.data.message : 'Unknown error'));
      }
    },
  },
};
</script>

