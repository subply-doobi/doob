import axios from 'axios';

import {GET_USER} from '../../queries/urls';
import {TUserInfo} from '../types/member';
import {validateToken} from '../../queries/token';

export const getUserInfo = async () => {
  const {validToken} = await validateToken();
  const res = await axios.get<TUserInfo>(`${GET_USER}`, {
    headers: {authorization: `Bearer ${validToken}`},
  });

  return res.data;
};
