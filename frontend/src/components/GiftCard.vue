<template>
  <div class="card border-0 shadow-sm">
    <div class="card-body">
      <h5 class="card-title text-dark fw-bold">{{ gift.name }}</h5>
      <a v-if="gift.link" :href="gift.link" target="_blank" class="card-link text-decoration-none">
        <i class="bi bi-link-45deg"></i> Перейти
      </a>

      <div class="mt-3 d-flex align-items-center">
        <button
            v-if="!gift.is_reserved && !isOwner"
            @click="$emit('reserve-gift', gift.id)"
            class="btn btn-outline-primary btn-sm"
        >
          <i class="bi bi-bookmark-plus"></i> Резервировать
        </button>

        <span v-if="gift.is_reserved && !isOwner" class="text-muted d-flex align-items-center">
          <i class="bi bi-lock-fill me-1"></i> Зарезервировано
        </span>

        <span v-if="gift.is_reserved && isOwner" class="text-success d-flex align-items-center">
          <i class="bi bi-gift-fill me-1"></i> Кто-то готовит вам подарок!
        </span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    gift: {
      type: Object,
      required: true
    },
    isOwner: {
      type: Boolean,
      default: false
    }
  }
};
</script>