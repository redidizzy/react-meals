import { useReducer } from "react"
import CartContext from "./cart-context"

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedItems = state.items.concat(action.item)
      const updatedTotalAmount = state.items.reduce(
        (accumulator, item) => accumulator + item.price * item.amount,
        0
      )
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
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
