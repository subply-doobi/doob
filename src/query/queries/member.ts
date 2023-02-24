import axios from 'axios';
import {TUserInfo} from '../types/member';
import {validateToken} from './token';
import {GET_USER} from './urls';

export const getUserInfo = async () => {
  const {validToken} = await validateToken();
  const res = await axios.get<TUserInfo>(`${GET_USER}`, {
    headers: {authorization: `Bearer ${validToken}`},
  });

  return res.data;
};
