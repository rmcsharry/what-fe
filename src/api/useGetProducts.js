import { useQuery} from 'react-query'
import axiosClient from './axiosClient';

export const useGetProducts = (searchTerm = '') => {
  return useQuery({
    queryKey: ['products', searchTerm],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/api/products?search=${searchTerm}`);
      return data;
    },
  })
};

export default useGetProducts;