import axios from 'axios';
import {TUserInfo} from '../types/member';
import {validateToken} from './token';
import {GET_USER} from './urls';
import {useQuery} from '@tanstack/react-query';
import {queryFn} from './requestFn';
export const getUserInfo = async () => {
  const {validToken} = await validateToken();
  const res = await axios.get<TUserInfo>(`${GET_USER}`, {
    headers: {authorization: `Bearer ${validToken}`},
  });

  return res.data;
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: [GET_USER],
    queryFn: () => queryFn(GET_USER),
  });
};
