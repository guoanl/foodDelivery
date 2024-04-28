// 编写store
import { createSlice } from "@reduxjs/toolkit"
const foodsStore = createSlice({
  name: 'foods',
  initialState: {
    // 商品列表
    foodsList: [
        {
            "id":1,
            "image":"https://images.pexels.com/photos/793765/pexels-photo-793765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "name":"Pasta",
            "description":"this is Pasta, its very delicious",
            "price":14.95
        },
        {
            "id":2,
            "image":"https://images.pexels.com/photos/7426867/pexels-photo-7426867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "name":"Rice",
            "description":"this is Rice, its very delicious",
            "price":22.95
        },
        {
            "id":3,
            "image":"https://images.pexels.com/photos/7627422/pexels-photo-7627422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "name":"Steak",
            "description":"this is Steak, its very delicious",
            "price":34.55
        },
        {
          "id":4,
          "image":"https://images.pexels.com/photos/10026524/pexels-photo-10026524.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          "name":"Coffee",
          "description":"this is Coffee, its very delicious",
          "price":6.99
      }
    ],
    // 菜单激活下标值
    cartList: []
  },
  reducers: {
    addCart (state, action) {
      // 是否添加过？以action.payload.id去cartList中匹配 匹配到了 添加过
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (item) {
        item.count++
      } else {
        action.payload.count = 1;
        state.cartList.push(action.payload)
      }
    },
    // count增
    increCount (state, action) {
      // 关键点：找到当前要修改谁的count id
      const item = state.cartList.find(item => item.id === action.payload.id)
      item.count++
    },
    // count减
    decreCount (state, action) {
      // 关键点：找到当前要修改谁的count id
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (item.count === 1) {
        state.cartList = state.cartList.filter(item=>item.id!=action.payload.id)
        return
      }
      item.count--
    },
    // 清除购物车
    clearCart (state,action) {
     state.cartList = state.cartList.filter(item=>item.id!=action.payload.id)
    }
  }
})
const { addCart, increCount, decreCount, clearCart } = foodsStore.actions
export { addCart, increCount, decreCount, clearCart }

const reducer = foodsStore.reducer

export default reducer