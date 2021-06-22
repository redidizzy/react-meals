import Modal from "../UI/Modal"
import classes from "./Cart.module.css"

const Cart = (props) => {
  const { onCartClose } = props
  const cartItems = (
    <ul>
      {[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map((item) => (
        <li key={item.id}>item.name</li>
      ))}
    </ul>
  )
  return (
    <Modal onModalClose={onCartClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onCartClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  )
}

export default Cart
