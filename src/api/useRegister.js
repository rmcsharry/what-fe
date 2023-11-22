import { useMutation } from 'react-query'
import axiosClient from './axiosClient';

const useRegister = (email, password, username) => {
  return useMutation({
    mutationKey: 'register',
    mutationFn: async () => {
      const { data } = await axiosClient.post("/api/register", { email, password, username });
      return data;
    },
  })
};

export default useRegister;