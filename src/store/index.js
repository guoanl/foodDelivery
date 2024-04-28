import cartReducer from './modules/cartFoodStore'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer:{
        foods:cartReducer
    }
})
export default store