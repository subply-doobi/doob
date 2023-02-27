import axios from 'axios';
import {PRODUCT_LIST} from './urls';
export const getProductList = async () => {
  try {
    const res = await axios.get(PRODUCT_LIST);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
