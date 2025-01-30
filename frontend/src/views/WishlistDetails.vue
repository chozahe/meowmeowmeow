<template>
  <div class="container mt-5">
    <h1 class="text-primary fw-bold">{{ wishlist.title }}</h1>

    <div v-if="gifts.length === 0" class="alert alert-info d-flex align-items-center">
      <i class="bi bi-info-circle-fill me-2"></i> В этом вишлисте пока нет подарков. Добавьте новый!
    </div>

    <div v-else class="mt-4">
      <h2 class="text-secondary">Подарки</h2>
      <div class="row">
        <div v-for="gift in gifts" :key="gift.id" class="col-md-4 mb-4">
          <GiftCard :gift="gift" :isOwner="isOwner" @reserve-gift="handleReserveGift" />
        </div>
      </div>
    </div>

    <div v-if="isOwner" class="mt-4 p-4 bg-light border rounded shadow-sm">
      <h2 class="text-secondary">Добавить подарок</h2>
      <AddGiftForm @gift-added="handleGiftAdded" />
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex';
import api from '@/api';
import GiftCard from '@/components/GiftCard.vue';
import AddGiftForm from '@/components/AddGiftForm.vue';

export default {
  components: {
    GiftCard,
    AddGiftForm,
  },
  data() {
    return {
      gifts: [],
      wishlist: {},
      isOwner: false
    };
  },
  async created() {
    try {
      const wishlistId = this.$route.params.id;
      const wishlistOwnerResponse = await api.isOwner(wishlistId);

      const giftsResponse = await api.getWishlist(wishlistId);
      this.gifts = giftsResponse.data;

      this.isOwner = wishlistOwnerResponse.data.is_owner;
    } catch (error) {
      this.showError('Ошибка загрузки данных');
    }
  },
  methods: {
    ...mapActions(['showNotification']),


    showError(message) {
      this.showNotification({
        message: message,
        type: 'danger'
      });
    },

    async handleGiftAdded(giftData) {
      try {
        const response = await api.addGift(this.$route.params.id, giftData.name, giftData.link);
        this.gifts.push(response.data);

      } catch (error) {
        alert('Ошибка добавления подарка');
      }

    },

    async handleReserveGift(giftId) {
      try {
        await api.reserveGift(this.wishlist.id, giftId);
        const gift = this.gifts.find(g => g.id === giftId);
        gift.is_reserved = true;
      } catch (error) {
        alert('Ошибка резервирования');
      }
    }

  }
};
</script>

