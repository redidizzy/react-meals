import Input from "../UI/Input"

import classes from "./MealItemForm.module.css"

const MealItemForm = (props) => {
  return (
    <form className={classes.form}>
      <Input
        label="Amount"
        value="0"
        type="number"
        id={`quantity_${props.id}`}
        min="0"
        max="5"
        step="1"
      />
      <button type="submit">+ Add</button>
    </form>
  )
}

export default MealItemForm
