import {IDietDetailData} from '../query/types/diet';

export const sumUpNutrients = (dietDetail: IDietDetailData | undefined) => {
  let cal = 0;
  let carb = 0;
  let protein = 0;
  let fat = 0;
  if (!dietDetail) {
    return {cal, carb, protein, fat};
  }
  dietDetail.forEach((food, index) => {
    cal += parseInt(food.calorie);
    carb += parseInt(food.carb);
    protein += parseInt(food.protein);
    fat += parseInt(food.fat);
  });
  return {cal, carb, protein, fat};
};

export const sumUpPrice = (dietDetail: IDietDetailData) => {
  let price = 0;
  dietDetail.forEach((food, index) => {
    price += parseInt(food.price);
  });
  return;
};

interface INutr {
  cal: number;
  carb: number;
  protein: number;
  fat: number;
}
export const compareNutrToTarget = (
  currentNutr: INutr | undefined,
  targetNutr: INutr | undefined,
): 'notEnough' | 'exceed' | 'empty' => {
  if (!currentNutr || !targetNutr) return 'empty';
  const {cal, carb, protein, fat} = currentNutr;
  const {cal: calT, carb: carbT, protein: proteinT, fat: fatT} = targetNutr;

  const current = [cal, carb, protein, fat];
  const target = [calT, carbT, proteinT, fatT];

  if (cal === 0 && carb === 0 && protein === 0 && fat === 0) {
    return 'empty';
  }

  let exceedNumber = 0;
  current.forEach((v, idx) => {
    if (v >= target[idx]) exceedNumber += 1;
  });
  return exceedNumber === 0 ? 'notEnough' : 'exceed';
};

export const commaOnNum = (num: number | string) => {
  console.log('typeof num : ', typeof num);
  const n = typeof num === 'number' ? num.toString() : num;
  return n.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
