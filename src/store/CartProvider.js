import { useReducer } from "react"
import CartContext from "./cart-context"

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      )
      const existingCartItem = state.items[existingCartItemIndex]
      const updatedItem = existingCartItem
        ? {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount,
          }
        : action.item
      let updatedItems
      if (existingCartItem) {
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
      } else {
        updatedItems = state.items.concat(action.item)
      }
      const updatedTotalAmount = updatedItems.reduce(
        (accumulator, item) => accumulator + item.price * item.amount,
        0
      )
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }
    }
    case "REMOVE": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      )
      const existingItem = state.items[existingCartItemIndex]
      let updatedItems
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id)
      } else {
        updatedItems = [...state.items]
        const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
        updatedItems[existingCartItemIndex] = updatedItem
      }
      const updatedTotalAmount = updatedItems.reduce(
        (accumulator, item) => accumulator + item.price * item.amount,
        0
      )
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }
    }
    default:
      return defaultCartState
  }
}

const CartProvider = (props) => {
  const [cartState, dispatchCartActions] = useReducer(
    cartReducer,
    defaultCartState
  )
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem(item) {
      dispatchCartActions({
        type: "ADD",
        item,
      })
    },
    removeItem(id) {
      dispatchCartActions({
        type: "REMOVE",
        id,
      })
    },
  }
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
