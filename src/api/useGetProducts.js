import { useQuery} from 'react-query'
import axiosClient from './axiosClient';

export const useGetProducts = () => {
  return useQuery({
    queryKey: 'products',
    queryFn: async () => {
      const { data } = await axiosClient.get("/api/products");
      return data;
    },
  })
};

export default useGetProducts;