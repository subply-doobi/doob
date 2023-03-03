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

export interface IProductData {
  calorie: string;
  carb: string;
  categoryCd: string;
  categoryNm: string;
  dietNo: string;
  distributerBizNo: string;
  distributerNm: string;
  fat: string;
  mainAttId: string;
  mainAttUrl: string;
  platformNm: string;
  price: string;
  productNm: string;
  productNo: string;
  protein: string;
  qty: string;
  subCategoryCd: string;
  subCategoryNm: string;
}
