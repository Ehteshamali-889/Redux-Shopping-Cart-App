import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        itemsList:[],
        totalQuantity:0,
        showCart:false,
        changed:false
    },
    reducers:{
        replaceData(state,action){
            state.totalQuantity=action.payload.totalQuantity;
            state.itemsList=action.payload.itemsList;
        },
        addToCart(state,action){
            state.changed=true;
            const newitem=action.payload;
            const exisitingItem=state.itemsList.find((item)=> item.id===newitem.id);

            if(exisitingItem){
                exisitingItem.quantity++;
                exisitingItem.totalPrice+=newitem.price;
            }
            else{
                state.itemsList.push({
                    id:newitem.id,
                    price:newitem.price,
                    quantity:1,
                    totalPrice:newitem.price,
                    name:newitem.name
                })
                state.totalQuantity++;
            }
        },
        removeFromCart(state,action){
            state.changed=true;
            const id=action.payload;

            const exisitingItem=state.itemsList.find((item)=> item.id===id);
            if(exisitingItem.quantity===1){
                state.itemsList=state.itemsList.filter((item)=>item.id!==id);
                state.totalQuantity--;
            }
            else{
                exisitingItem.quantity--;
                exisitingItem.totalPrice-=exisitingItem.price;
            }
        },
        setShowCart(state){
            state.showCart=!state.showCart;
        }
    }
})



export const cartActions=cartSlice.actions;
export default cartSlice;