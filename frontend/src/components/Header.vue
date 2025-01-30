<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand fw-bold text-primary">Wishlist App</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link to="/login" class="nav-link text-secondary fw-semibold">Вход/Регистрация</router-link>
          </li>
          <li v-else class="nav-item">
            <a href="#" @click.prevent="logout" class="nav-link text-danger fw-semibold">Выйти</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['logout']),
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>

