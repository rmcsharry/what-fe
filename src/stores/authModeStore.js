import { create } from 'zustand';

const useAuthModeStore = create(set => ({
  isRegister: false,
  toggleAuthMode: () => set(state => ({ isRegister: !state.isRegister })),
}));

export default useAuthModeStore;