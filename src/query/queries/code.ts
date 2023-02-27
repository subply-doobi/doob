import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {queryFn, mutationFn} from './requestFn';
import {validateToken} from './token';
import {COMMON_CODE} from './urls';

interface IQuery {
  code: string;
}
// GET //
export const useDietPurposeCode = (code: IQuery) => {
  return useQuery({
    queryKey: ['dietPurposeCode'],
    queryFn: () => queryFn(`${COMMON_CODE}/${code}`),
    retry: 1,
    onSuccess: data => {
      console.log('commonCode on');
    },
  });
};
export const useWeightPurposeCode = (code: IQuery) => {
  return useQuery({
    queryKey: ['weightPurposeCode'],
    queryFn: () => queryFn(`${COMMON_CODE}/${code}`),
    retry: 1,
    onSuccess: data => {
      console.log('commonCode on');
    },
  });
};
export const useAerobicPurposeCode = (code: IQuery) => {
  return useQuery({
    queryKey: ['aerboicPurposeCode'],
    queryFn: () => queryFn(`${COMMON_CODE}/${code}`),
    retry: 1,
    onSuccess: data => {
      console.log('commonCode on');
    },
  });
};
