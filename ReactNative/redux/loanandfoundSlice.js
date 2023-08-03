import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loader:false,
  searchKeyword: '',
  data2:{},
  loader2:false
}

export const loanandfoundSlice = createSlice({
  name: 'foundandlose',
  initialState,
  reducers: {
   
    updataData: (state, action) => {
      state.data = action.payload
    },
    handleLoader:(state,action)=>{
      
      state.loader=action.payload.loader
    },
    updataDataforOne: (state, action) => {
      state.data2 = action.payload
    },
    handleLoaderforOne:(state,action)=>{
      
      state.loader2=action.payload.loader
    },
    handleSearchData:(state,action)=>{
      state.searchKeyword = action.payload.trim(); 

    }
  },
})

// Action creators are generated for each case reducer function
export const {updataData,handleLoader,updataDataforOne,handleLoaderforOne,handleSearchData } = loanandfoundSlice.actions

export default loanandfoundSlice.reducer