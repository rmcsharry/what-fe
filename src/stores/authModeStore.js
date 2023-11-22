import { create } from 'zustand';

const useAuthStore = create(set => ({
  authError: null,
  isRegister: false,
  toggleAuthMode: () => set(state => ({ isRegister: !state.isRegister })),
  setAuthError: (error) => set(state => ({ authError: error })),
}));

export default useAuthStore;