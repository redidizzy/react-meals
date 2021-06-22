import classes from "./Card.module.css"

const Card = (props) => {
  const { children } = props
  return <div className={classes.card}>{children}</div>
}

export default Card
