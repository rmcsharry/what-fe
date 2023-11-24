import { useMutation } from 'react-query';
import axiosClient from './axiosClient';

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}


const usePatchProduct = () => {
  return useMutation(async (product) => {
    const csrftoken = readCookie('csrftoken');
    console.log(csrftoken, 'token')
    const { data } = await axiosClient.patch(`/api/products/${product.id}`, product);
    return data;
  });
};

export default usePatchProduct;