// numberPicker consts
export const makePickerItem = (minQty: string = '1') => {
  const arr = [...Array(30)].map((x, i) => {
    return {
      label: String(parseInt(minQty) + i),
      value: String(parseInt(minQty) + i),
    };
  });
  return arr;
};
