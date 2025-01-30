import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/', // Добавил слэш в конце
    headers: {
        'Content-Type': 'application/json',
    },
});

// функция для установки токена в заголовках
export const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};


export default {
    register(email, password) {
        return apiClient.post('/register', { email, password });
    },

    login(email, password) {
        return apiClient.post('/login', { email, password });
    },

    getWishlists() {
        return apiClient.get('/wishlists');
    },

    getWishlist(id) {
        return apiClient.get(`/wishlist/${id}`);
    },

    isOwner(wishlist_id) {
        return apiClient.get(`/wishlist/is-owner/${wishlist_id}`);
    },

    addGift(wishlistId, name, link) {
        return apiClient.post(`/wishlist/${wishlistId}/add-gift`, {name, link });
    },

    reserveGift(wishlistId, giftId) {
        return apiClient.post(`/wishlist/${wishlistId}/reserve-gift`, { giftId });
    },
    createWishlist(title) {
        return apiClient.post('/wishlists', { title });
    },


};
