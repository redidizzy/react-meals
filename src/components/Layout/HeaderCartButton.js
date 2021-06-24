import { useContext, useEffect, useState } from "react"
import CartContext from "../../store/cart-context"
import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
  const cartCtx = useContext(CartContext)
  const cartItemsCount = cartCtx.items.reduce((accumulator, item) => {
    return accumulator + item.amount
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`

  useEffect(() => {
    if (cartCtx.items.length === 0) return
    setBtnIsHighlighted(true)
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [cartCtx.items])
  const { onClick } = props
  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemsCount}</span>
    </button>
  )
}

export default HeaderCartButton
