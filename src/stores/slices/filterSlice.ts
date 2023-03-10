import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface IFilterState {
  listTitle: string;
  filterContents: any[];
  loading: string;
  filterList: any[];
}

const initialState: IFilterState = {
  listTitle: '전체 식품',
  filterContents: [],
  loading: '',
  filterList: [],
};
// const getRefreshToken = () => {
//   let refreshToken = AsyncStorage.getItem('REFRESH_TOKEN');
//   return refreshToken;
// };
// export const fetchCategoryFilter = createAsyncThunk(
//   'filter/fetchCategoryFilter',
//   async (category, thunkAPI) => {
//     const response = await getRefreshToken().then(refreshToken =>
//       axios.get(
//         'http://61.100.16.155:8080/api/member/product/list-product?searchText=도시락&categoryCd=&sort',
//         {
//           headers: {
//             Authentication: `Bearer ${refreshToken}`,
//           },
//         },
//       ),
//     );
//     return response.data;
//   },
// );

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setListTitle: (state, action: PayloadAction<string>) => {
      state.listTitle = action.payload;
    },
    // clickFilter: (state, action) => {
    //   state.filterList = action.payload;
    // },
    // filterOn: (state, action) => {
    //   console.log(action.payload);
    // },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(fetchCategoryFilter.pending, (state, action) => {
  //       console.log('pending:', state);
  //     })
  //     .addCase(fetchCategoryFilter.fulfilled, (state, action) => {
  //       state.filterContents.push(action.payload);
  //     })
  //     .addCase(fetchCategoryFilter.rejected, state => {
  //       console.log('reject', state);
  //     });
  // },
});

export default filterSlice.reducer;
export const {setListTitle} = filterSlice.actions;
