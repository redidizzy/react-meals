import { useContext, useState } from "react"
import CartContext from "../../store/cart-context"
import Input from "../UI/Input"

import classes from "./MealItemForm.module.css"

const MealItemForm = (props) => {
  const { name, price, id } = props
  const cartCtx = useContext(CartContext)
  const [enteredAmount, setEnteredAmount] = useState(0)
  const [isAmountValid, setIsAmountValid] = useState(true)
  const submitHandler = (event) => {
    event.preventDefault()
    if (enteredAmount <= 0 || enteredAmount > 5) {
      setIsAmountValid(false)
      return
    }
    const newItem = {
      id,
      name,
      price,
      amount: enteredAmount,
    }
    cartCtx.addItem(newItem)
  }
  const changeAmountHandler = (event) => {
    setIsAmountValid(true)
    setEnteredAmount(+event.target.value)
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        value={enteredAmount}
        onChange={changeAmountHandler}
        type="number"
        id={`quantity_${props.id}`}
        min="0"
        max="5"
        step="1"
      />
      <button type="submit">+ Add</button>
      {!isAmountValid && <p>Please enter a valid amound(1-5)</p>}
    </form>
  )
}

export default MealItemForm
