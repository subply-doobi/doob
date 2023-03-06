import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {DIET, DIET_DETAIL, DIET_DETAIL_ALL} from '../keys';
import {queryClient} from '../store';
import {IMutationOptions, IQueryOptions} from '../types/common';
import {IDietData, IDietDetailData, IListDietDetailParams} from '../types/diet';
import {mutationFn, queryFn} from './requestFn';
import {
  CREATE_DIET,
  CREATE_DIET_DETAIL,
  DELETE_DIET,
  DELETE_DIET_DETAIL,
  LIST_DIET,
  LIST_DIET_DETAIL,
  LIST_DIET_DETAIL_ALL,
  LIST_PRODUCT,
  UPDATE_DIET_DETAIL,
} from './urls';

// PUT //
export const useCreateDiet = (options?: IMutationOptions) => {
  const mutation = useMutation({
    mutationFn: () => mutationFn(CREATE_DIET, 'put'),
    onSuccess: data => {
      options?.onSuccess && options?.onSuccess(data);
      queryClient.invalidateQueries({queryKey: [DIET]});
    },
    onError: e => console.log('useCreateDiet error: ', e),
  });
  return mutation;
};

export const useCreateDietDetail = () => {
  const mutation = useMutation({
    mutationFn: ({dietNo, productNo}: {dietNo: string; productNo: string}) =>
      mutationFn(
        `${CREATE_DIET_DETAIL}?dietNo=${dietNo}&productNo=${productNo}`,
        'put',
      ),
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: [DIET_DETAIL]});
      queryClient.invalidateQueries({queryKey: [DIET_DETAIL_ALL]});
    },
    onError: e => console.log('useCreateDietDetail error: ', e),
  });
  return mutation;
};

// GET //

export const useListDiet = (options?: IQueryOptions) => {
  const enabled = options?.enabled ?? true;
  const additionalQK = options?.additionalQuerykey ?? [];
  return useQuery<IDietData>({
    queryKey: [DIET, ...additionalQK],
    queryFn: () => queryFn(LIST_DIET),
    enabled,
    onSuccess: data => {
      options?.onSuccess && options.onSuccess(data);
    },
  });
};

export const useListDietDetail = (dietNo: string, options?: IQueryOptions) => {
  const enabled = options?.enabled ?? true;
  return useQuery<IDietDetailData>({
    queryKey: dietNo ? [DIET_DETAIL, dietNo] : [DIET_DETAIL],
    queryFn: () => queryFn(`${LIST_DIET_DETAIL}/${dietNo}`),
    enabled,
    onSuccess: data => {},
  });
};

export const useListDietDetailAll = (options?: IQueryOptions) => {
  const enabled = options?.enabled ?? true;
  return useQuery<IDietDetailData>({
    queryKey: [DIET_DETAIL_ALL],
    queryFn: () => queryFn(LIST_DIET_DETAIL_ALL),
    enabled,
    onSuccess: data => {},
  });
};

// POST //
export const useUpdateDietDetail = () => {
  const mutation = useMutation({
    mutationFn: ({
      dietNo,
      productNo,
      qty,
    }: {
      dietNo: string;
      productNo: string;
      qty: string;
    }) =>
      mutationFn(
        `${UPDATE_DIET_DETAIL}?dietNo=${dietNo}&productNo=${productNo}&qty=${qty}`,
        'post',
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [DIET_DETAIL]});
    },
    onError: e => console.log('useUpdateDietDetail error: ', e),
  });
  return mutation;
};

// DELETE //
export const useDeleteDiet = () => {
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

// DELETE
export const useDeleteDietDetail = () => {
  const mutation = useMutation({
    mutationFn: ({dietNo, productNo}: {dietNo: string; productNo: string}) =>
      mutationFn(
        `${DELETE_DIET_DETAIL}?dietNo=${dietNo}&productNo=${productNo}`,
        'delete',
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [DIET_DETAIL]});
    },
    onError: e => console.log('useDeleteDietDetail error: ', e),
  });
  return mutation;
};
