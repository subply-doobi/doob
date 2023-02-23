import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {queryFn, mutationFn} from './requestFn';
import {validateToken} from './token';
import {DIET_COMMON_CODE} from './urls';

export const useGetCommonCode = arg => {
  return useQuery({
    queryKey: ['commonCode'],
    queryFn: () => queryFn(arg),
    onSuccess: data => {
      console.log('commonCode on');
    },
  });
};
