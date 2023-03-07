import {IDietData} from '../query/types/diet';

export const findDietSeq = (
  dietData: IDietData | undefined,
  dietNo: string | undefined,
) => {
  if (!dietData || !dietNo) {
    return '';
  }
  let dietSeq = '';
  for (let i = 0; i < dietData.length; i++) {
    if (dietData[i].dietNo === dietNo) {
      dietSeq = dietData[i].dietSeq;
      break;
    }
  }
  return dietSeq;
};
