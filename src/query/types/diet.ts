export type TMenu = {
  companyCd: string;
  dietNo: string;
  dietSeq: string;
  statusCd: string;
  statusNm: string;
  userId: string;
};
export type TDietData = Array<TMenu>;

export interface ITestDataParams {
  searchText: string;
  sortText: string;
}
