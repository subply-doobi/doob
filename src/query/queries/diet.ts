import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {DIET, DIET_DETAIL} from '../keys';
import {TdietData} from '../types/diet';
import {mutationFn, queryFn} from './requestFn';
import {
  CREATE_DIET,
  CREATE_DIET_DETAIL,
  DELETE_DIET,
  DELETE_DIET_DETAIL,
  LIST_DIET,
  LIST_DIET_DETAIL,
  UPDATE_DIET_DETAIL,
} from './urls';

// PUT //
export const useCreateDiet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => mutationFn(CREATE_DIET, 'put'),
    onSuccess: data => queryClient.invalidateQueries({queryKey: [DIET]}),
    onError: e => console.log('useCreateDiet error: ', e),
  });
  return mutation;
};

export const useCreateDietDetail = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({dietNo, productNo}: {dietNo: string; productNo: string}) =>
      mutationFn(
        `${CREATE_DIET_DETAIL}?dietNo=${dietNo}&productNo=${productNo}`,
        'put',
      ),
    onSuccess: data => queryClient.invalidateQueries({queryKey: [DIET_DETAIL]}),
    onError: e => console.log('useCreateDietDetail error: ', e),
  });
  return mutation;
};

// GET //
interface IQueryOptions {
  enabled?: boolean;
}
export const useListDiet = (options?: IQueryOptions) => {
  const enabled = options?.enabled ?? true;
  return useQuery<TdietData>({
    queryKey: [DIET],
    queryFn: () => queryFn(LIST_DIET),
    enabled,
    onSuccess: data => () => {},
  });
};
export const useListDietDetail = (options?: IQueryOptions) => {
  const enabled = options?.enabled ?? true;
  return useQuery({
    queryKey: [DIET_DETAIL],
    queryFn: () => queryFn(LIST_DIET_DETAIL),
    enabled,
    onSuccess: data => {},
  });
};

// POST //
export const useUpdateDietDetail = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => mutationFn(UPDATE_DIET_DETAIL, 'post'),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [DIET_DETAIL]});
    },
    onError: e => console.log('useUpdateDietDetail error: ', e),
  });
  return mutation;
};

// DELETE //
export const useDeleteDiet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({dietNo}: {dietNo: string}) =>
      mutationFn(`${DELETE_DIET}/${dietNo}`, 'delete'),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [DIET]});
    },
    onError: e => console.log('useDeleteDiet error: ', e),
  });
  return mutation;
};

export const useDeleteDietDetail = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => mutationFn(DELETE_DIET_DETAIL, 'post'),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [DIET_DETAIL]});
    },
    onError: e => console.log('useDeleteDietDetail error: ', e),
  });
  return mutation;
};
