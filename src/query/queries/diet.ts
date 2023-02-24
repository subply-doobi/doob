import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
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
    onSuccess: data => queryClient.invalidateQueries({queryKey: ['diet']}),
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
    onSuccess: data =>
      queryClient.invalidateQueries({queryKey: ['dietDetail']}),
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
  return useQuery({
    queryKey: ['diet'],
    queryFn: () => queryFn(LIST_DIET),
    enabled,
    onSuccess: data => {
      console.log('useGetBaseLine onSuccess');
    },
  });
};
export const useListDietDetail = (options?: IQueryOptions) => {
  const enabled = options?.enabled ?? true;
  return useQuery({
    queryKey: ['dietDetail'],
    queryFn: () => queryFn(LIST_DIET_DETAIL),
    enabled,
    onSuccess: data => {
      console.log('useGetBaseLine onSuccess');
    },
  });
};

// POST //
export const useUpdateDietDetail = (options?: IQueryOptions) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => mutationFn(UPDATE_DIET_DETAIL, 'post'),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['dietDetail']});
    },
    onError: e => console.log('useUpdateBaseLine error: ', e),
  });
  return mutation;
};

// DELETE //
export const useDeleteDiet = (options?: IQueryOptions) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => mutationFn(DELETE_DIET, 'post'),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['diet']});
    },
    onError: e => console.log('useUpdateBaseLine error: ', e),
  });
  return mutation;
};

export const useDeleteDietDetail = (options?: IQueryOptions) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => mutationFn(DELETE_DIET_DETAIL, 'post'),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['dietDetail']});
    },
    onError: e => console.log('useUpdateBaseLine error: ', e),
  });
  return mutation;
};
