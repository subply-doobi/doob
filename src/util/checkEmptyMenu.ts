import {TDietData} from '../query/types/diet';

export const checkMenuEmpty = (
  dietData: TDietData | undefined,
): number | undefined => {
  // console.log('checkMenuEmpty: dietData:', dietData);
  // TBD : 비어있는 끼니 중 가장 앞 index반환
  return 2;
};
