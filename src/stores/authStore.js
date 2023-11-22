// authStore.js
import { create } from 'zustand';

const useAuthStore = create(set => ({
  isRegister: false,
  toggleAuthMode: () => set(state => ({ isRegister: !state.isRegister })),
}));

export default useAuthStore;