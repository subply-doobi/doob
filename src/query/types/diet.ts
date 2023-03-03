import {IProductData} from './product';

export interface IMenu {
  companyCd: string;
  dietNo: string;
  dietSeq: string;
  statusCd: string;
  statusNm: string;
  userId: string;
}
export type IDietData = Array<IMenu>;

export interface IListDietDetailParams {
  dietNo: string;
}

export type IDietDetailData = Array<IProductData>;
