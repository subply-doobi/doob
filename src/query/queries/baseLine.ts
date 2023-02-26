import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_LINE} from '../keys';
import {queryFn, mutationFn} from './requestFn';
import {validateToken} from './token';
import {CREATE_BASE_LINE, GET_BASE_LINE, UPDATE_BASE_LINE} from './urls';

interface IBaseLine {
  companyCd: string;
  userId: string;
  calorie: string;
  carb: string;
  protein: string;
  fat: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  dietPurposeCd: string;
  weightTimeCd: string;
  aerobicTimeCd: string;
}

// PUT
export const useCreateBaseLine = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (baseLine: IBaseLine) =>
      mutationFn<IBaseLine>(UPDATE_BASE_LINE, 'put', baseLine),
    onSuccess: data => queryClient.invalidateQueries({queryKey: ['baseLine']}),
    onError: e => console.log('useSaveBaseLine error: ', e),
  });
  return mutation;
};

// GET
interface IQueryOptions {
  enabled?: boolean;
}
export const useGetBaseLine = (options?: IQueryOptions) => {
  const enabled = options?.enabled ?? true;
  return useQuery({
    queryKey: [BASE_LINE],
    queryFn: () => queryFn(GET_BASE_LINE),
    enabled,
    onSuccess: data => {},
  });
};

// POST
export const useUpdateBaseLine = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (baseLine: IBaseLine) =>
      mutationFn<IBaseLine>(UPDATE_BASE_LINE, 'post', baseLine),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [BASE_LINE]});
    },
    onError: e => console.log('useUpdateBaseLine error: ', e),
  });
  return mutation;
};
