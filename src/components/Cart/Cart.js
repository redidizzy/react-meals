import { useContext, useState } from "react"
import CartContext from "../../store/cart-context"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartItem from "./CartItem"
import Checkout from "./Checkout"

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false)
  const { onCartClose } = props
  const cartCtx = useContext(CartContext)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 })
  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  )
  const orderHandler = () => {
    setShowCheckout(true)
  }
  const submitOrderHandler = async (userData) => {
    fetch("https://react-http-3adf2-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    })
  }
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={onCartClose}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  )
  return (
    <Modal onModalClose={onCartClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={onCartClose} />
      )}
      {!showCheckout && modalActions}
    </Modal>
  )
}

export default Cart
