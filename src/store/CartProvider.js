import CartContext from "./cart-context"
const CartProvider = (props) => {
  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem(item) {},
    removeItem(id) {},
  }
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
