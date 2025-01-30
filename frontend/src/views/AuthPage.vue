<template>
  <div class="container mt-5 d-flex flex-column align-items-center">
    <h1 class="mb-4 text-primary fw-bold">{{ isLogin ? 'Вход' : 'Регистрация' }}</h1>
    <div class="mb-3">
      <button @click="toggleForm" class="btn btn-outline-secondary">
        {{ isLogin ? 'Перейти к регистрации' : 'Перейти ко входу' }}
      </button>
    </div>
    <div class="card p-4 shadow-sm w-100" style="max-width: 400px;">
      <LoginForm v-if="isLogin" @login="handleLogin" />
      <RegisterForm v-else @register="handleRegister" />
    </div>
  </div>
</template>


<script>
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import api from '@/api'; // Импортируем API-клиент
import { mapActions } from 'vuex';

export default {
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      isLogin: true, // Переключатель между формами
    };
  },
  methods: {
    ...mapActions(['saveToken', 'saveUser']),
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
    async handleLogin(credentials) {
      try {
        const response = await api.login(credentials.email, credentials.password);
        this.saveToken(response.data.token);
        this.$router.push('/');
      } catch (error) {
        if (error.response && error.response.status !== 200) {
          alert('Ошибка входа: ' + (error.response.data.message || 'Unknown error'));
        } else {
          alert('Сетевая ошибка: ' + error.message);
        }
      }
    },
    async handleRegister(credentials) {
      try {
        const response = await api.register(credentials.email, credentials.password);
        this.saveToken(response.data.token);
        this.$router.push('/');
      } catch (error) {
        if (error.response && error.response.status !== 200) {
          alert('Ошибка регистрации: ' + (error.response.data.message || 'Unknown error'));
        } else {
          alert('Сетевая ошибка: ' + error.message);
        }
      }
    },
  },
};
</script>