import { useMutation } from 'react-query';
import axiosClient from './axiosClient';

const usePatchProduct = () => {
  return useMutation(async (product) => {
    const { data } = await axiosClient.patch(`/api/products/${product.id}`, product);
    return data;
  });
};

export default usePatchProduct;