import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
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
export const useCreateBaseLine = async () => {
  const {isTokenValid, validToken} = await validateToken();
  if (!isTokenValid) return;

  const requestConfig = {headers: {authorization: `Bearer ${validToken}`}};
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (baseLine: IBaseLine) =>
      axios.put(CREATE_BASE_LINE, baseLine, requestConfig),
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
    queryKey: ['baseLine'],
    queryFn: () => queryFn(GET_BASE_LINE),
    enabled,
    onSuccess: data => {
      console.log('useGetBaseLine onSuccess');
    },
  });
};

// POST
export const useUpdateBaseLine = (options?: IQueryOptions) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (baseLine: IBaseLine) =>
      mutationFn<IBaseLine>(UPDATE_BASE_LINE, 'post', baseLine),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['baseLine']});
    },
    onError: e => console.log('useUpdateBaseLine error: ', e),
  });
  return mutation;
};
