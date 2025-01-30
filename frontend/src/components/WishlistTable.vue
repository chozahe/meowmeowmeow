<template>
  <div v-if="wishlists.length === 0" class="alert alert-info d-flex align-items-center">
    <i class="bi bi-info-circle-fill me-2"></i>
    У вас пока нет вишлистов. Создайте новый!
  </div>
  <div v-else class="mt-4">
    <h2 class="text-secondary">Вишлисты:</h2>
    <ul class="list-group shadow-sm rounded overflow-hidden">
      <li
          v-for="wishlist in wishlists"
          :key="wishlist.id"
          class="list-group-item d-flex justify-content-between align-items-center"
      >
        <router-link :to="`/wishlist/${wishlist.id}`" class="text-decoration-none text-dark fw-semibold">
          {{ wishlist.title }}
        </router-link>
        <i class="bi bi-arrow-right-short text-primary"></i>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  props: {
    wishlists: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
</style>