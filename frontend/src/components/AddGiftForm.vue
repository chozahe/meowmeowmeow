<template>
  <form @submit.prevent="addGift" class="d-flex flex-column gap-3">
    <div>
      <input
          v-model="name"
          type="text"
          class="form-control border-0 shadow-sm"
          placeholder="Название подарка"
          required
      />
    </div>
    <div>
      <input
          v-model="link"
          type="url"
          class="form-control border-0 shadow-sm"
          placeholder="Ссылка на подарок"
      />
    </div>
    <button type="submit" class="btn btn-primary w-100 fw-semibold">
      <i class="bi bi-plus-circle"></i> Добавить
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      link: ''
    };
  },
  methods: {
    isValidUrl(url) {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    },
    addGift() {
      if (!this.name) {
        alert('Названия нэмае')
        return;
      }

      if (!this.isValidUrl(this.link)) {
        alert('Введите корректную ссылку!')
        return;
      }

      this.$emit('gift-added', { name: this.name, link: this.link });
      this.name = '';
      this.link = '';
    }
  }
};
</script>