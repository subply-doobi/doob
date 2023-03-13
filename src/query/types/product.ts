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
  cholesterol: string;
  distributerBizNo: string;
  distributerNm: string;
  fat: string;
  fiber: string;
  freeShippingPrice: string;
  freeShippingYn: string;
  mainAttId: string;
  mainAttUrl: string;
  manufacturerBizNo: string;
  manufacturerNm: string;
  minQty: string;
  platformNm: string;
  price: string;
  priceCalorieCompare: string;
  priceProteinCompare: string;
  productChoiceYn: string;
  productNm: string;
  productNo: string;
  protein: string;
  saturatedFat: string;
  servingSize: string;
  shippingPrice: string;
  sodium: string;
  subCategoryCd: string;
  subCategoryNm: string;
  sugar: string;
  transFat: string;
}
