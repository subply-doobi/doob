import axios from 'axios';
import {BASE_URL, CREATE_PRODUCT_MARK, DELETE_PRODUCT_MARK} from './urls';
import {useMutation} from '@tanstack/react-query';
import {mutationFn} from './requestFn';
// const getProductList = async () => {
//   try {
//     const res = await axios.get(PRODUCT_LIST);
//     return res.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const useCreateProductMark = () => {
  const mutation = useMutation({
    mutationFn: (productNo: string) =>
      mutationFn(`${CREATE_PRODUCT_MARK}/${productNo}`, 'put'),
    onError: e => console.error('useCreateProductMark error', e),
  });
  return mutation;
};

export const useDeleteProductMark = () => {
  const mutation = useMutation({
    mutationFn: (productNo: string) =>
      mutationFn(`${DELETE_PRODUCT_MARK}/${productNo}`, 'delete'),
    onSuccess: data => console.log(data),
    onError: e => console.log('useCreateProductMark error', e),
  });
  return mutation;
};
