<template>
  <form @submit.prevent="handleRegister" class="d-flex flex-column gap-3">
    <div>
      <label for="email" class="form-label fw-semibold">Email</label>
      <input v-model="email" type="email" class="form-control border-0 shadow-sm" id="email" required />
    </div>
    <div>
      <label for="password" class="form-label fw-semibold">Пароль</label>
      <input v-model="password" type="password" class="form-control border-0 shadow-sm" id="password" required />
    </div>
    <button type="submit" class="btn btn-primary w-100 fw-semibold">Зарегистрироваться</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    handleRegister() {
      if (!this.email || !this.password) {
        alert('Please fill in all fields');
        return;
      }
      this.$emit('register', { email: this.email, password: this.password });
    },
  },
};
</script>