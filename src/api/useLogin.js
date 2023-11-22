import { useMutation } from 'react-query'
import axiosClient from './axiosClient';

export const useLogin = (email, password) => {
  return useMutation({
    mutationKey: 'login',
    mutationFn: async () => {
      const { data } = await axiosClient.post("/api/login", { email, password });
      return data;
    },
  })
};

export default useLogin;