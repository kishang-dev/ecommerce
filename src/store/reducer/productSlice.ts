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

    setUpdateDecressQuintiy: (state, action: PayloadAction<any>) => {
   
        const checkProdtExists = state.cartProduct.find((product:any) => product.id == action.payload.id);
        if(checkProdtExists){
            state.cartProduct =  state.cartProduct.map(((item:any)=>{
                if(action.payload.id == item.id){
                    return {...item,minimumOrderQuantity:item.minimumOrderQuantity - 1}
                
                }else{
                    return {...item}
                
                }
                
                            }))
        }else{
            state.cartProduct.push(action.payload)

        }
      },
      

    setUpdateIncressQuintiy: (state, action: PayloadAction<any>) => {
   
        const checkProdtExists = state.cartProduct.find((product:any) => product.id == action.payload.id);
        if(checkProdtExists){
            state.cartProduct =  state.cartProduct.map(((item:any)=>{
if(action.payload.id == item.id){
    return {...item,minimumOrderQuantity:item.minimumOrderQuantity + 1}

}else{
    return {...item}

}

            }))
        }else{
            state.cartProduct.push(action.payload)

        }
      },
      
    setCartProducts: (state, action: PayloadAction<any>) => {
   
        const checkProdtExists = state.cartProduct.find((product:any) => product.id == action.payload.id);
        if(checkProdtExists){
            state.cartProduct =  state.cartProduct.map(((item:any)=>{
                return {...item,minimumOrderQuantity:item.minimumOrderQuantity + 1}
            }))
        }else{
            state.cartProduct.push(action.payload)

        }
      },
    
  },
})

// Action creators are generated for each case reducer function
export const { setProducts,setCartProducts,setUpdateDecressQuintiy,setUpdateIncressQuintiy} = productSlice.actions

export default productSlice.reducer