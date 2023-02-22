import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {getProductIndex, hasProduct} from '../../util/reduxUtil';
import {IProduct} from '../../constants/constants';

// cart -> menu -> product
export interface ICartState {
  menuIndex: string;
}

const initialState: ICartState = {
  menuIndex: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setMenuIndex: (state, action: PayloadAction<string>) => {
      state.menuIndex = action.payload;
    },
  },
});

export const {setMenuIndex} = cartSlice.actions;
export default cartSlice.reducer;
