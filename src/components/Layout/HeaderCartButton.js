import { useContext } from "react"
import CartContext from "../../store/cart-context"
import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext)
  const cartItemsCount = cartCtx.items.reduce((accumulator, item) => {
    return accumulator + item.amount
  }, 0)
  const { onClick } = props
  return (
    <button className={classes.button} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemsCount}</span>
    </button>
  )
}

export default HeaderCartButton
