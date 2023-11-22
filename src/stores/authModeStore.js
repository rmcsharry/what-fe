import { create } from 'zustand';

const useAuthStore = create(set => ({
  authError: null,
  isRegister: false,
  toggleAuthMode: () => set(state => ({ isRegister: !state.isRegister })),
  setError: (error) => set(state => ({ authError: error })),
  clearError: () => set(state => ({ authError: null })),
}));

export default useAuthStore;