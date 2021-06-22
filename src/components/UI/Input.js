import classes from "./Input.module.css"

const Input = (props) => {
  const { label, type, value, id, min, max, step } = props
  return (
    <div className={classes.input}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        defaultValue={value}
        id={id}
        min={min}
        max={max}
        step={step}
      />
    </div>
  )
}

export default Input
