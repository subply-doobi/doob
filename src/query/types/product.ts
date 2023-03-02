export interface IListProductParams {
  searchText: string;
  categoryCd: string;
  sort: string;
  filter: string;
}

export interface ICreateProductAutoParams {
  dietNo: string;
  categoryText?: string;
  priceText?: string;
}
