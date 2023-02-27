import {useMutation, useQuery} from '@tanstack/react-query';
import {PRODUCT_AUTO} from '../keys';
import {queryClient} from '../store';
import {IQueryOptions} from '../types/common';
import {mutationFn, queryFn} from './requestFn';
import {CREATE_PRODUCT_AUTO, PRODUCT_LIST} from './urls';

export const useCreateProductAuto = () => {
  const mutation = useMutation({
    mutationFn: ({
      dietNo,
      categories,
      priceRange,
    }: {
      dietNo: string;
      categories: string;
      priceRange: string;
    }) => mutationFn(`${CREATE_PRODUCT_AUTO}/${dietNo}`, 'post'),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [PRODUCT_AUTO]});
    },
    onError: e => console.log('useCreateProductAuto error: ', e),
  });
  return mutation;
};
// optional params 어떻게 받을 것인지

export const useListProduct = (options?: IQueryOptions) => {
  const enabled = options?.enabled ?? true;
  return useQuery({
    queryKey: ['tempProduct'],
    queryFn: () =>
      queryFn(`${PRODUCT_LIST}?searchText=&categoryCd=CG003&sort=&filter=`),
    enabled,
    onSuccess: data => {
      console.log(data[0]);
    },
    onError: e => {
      console.log(e);
    },
  });
};

const tttt = {
  calorie: '232.000',
  carb: '23.000',
  categoryCd: 'CG003',
  categoryNm: '샐러드',
  distributerBizNo: '346-88-00170',
  distributerNm: '㈜에이타워',
  fat: '8.000',
  mainAttId: 'PD202207131320083658528',
  mainAttUrl: '/files/pd/202207/5_t_202207131320084273042.png',
  platformNm: '포켓샐러드',
  price: '6500',
  priceCalorieCompare: '0.0356923',
  priceProteinCompare: '0.0027692',
  productNm: '포켓샐러드 불고기 샐러드',
  productNo: 'PD20220713000000152',
  protein: '18.000',
  subCategoryCd: 'CG003002',
  subCategoryNm: '토핑(단백질)',
};
