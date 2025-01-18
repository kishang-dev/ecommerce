import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductState {
  products: any,
  cartProduct:any
}

const initialState: ProductState = {
    products: [],
    cartProduct:[],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
   
    setProducts: (state, action: PayloadAction<any>) => {
      state.products = action.payload
    },
    setCartProducts: (state, action: PayloadAction<any>) => {
   
        const checkProdtExists = state.cartProduct.find((product:any) => product.id == action.payload.id);
        if(checkProdtExists){
            state.cartProduct =  state.cartProduct.map(((item:any)=>{
                return item
            }))
        }else{
            state.cartProduct.push(action.payload)

        }
// const dataexist =  state.cartProduct.map((item) => {
// if(item.id == action.payload.id){
//     return item
// } else{ 

// debugger
//     return [action.payload]
// }

// })



        // let existdata = state.cartProduct.map((item:any)=>{
        //  if(item.id == action.payload.id){
            
        //     return  item
        //  }else{
        //      state.cartProduct.push(action.payload)
        //  }
        // })


        // state.cartProduct.push(action.payload)

        
      },
    
  },
})

// Action creators are generated for each case reducer function
export const { setProducts,setCartProducts} = productSlice.actions

export default productSlice.reducer