import { useEffect, useState } from "react"
import Card from "../UI/Card"
import classes from "./AvailableMeals.module.css"
import MealItem from "./MealItem"

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-3adf2-default-rtdb.firebaseio.com/Meals.json"
      )
      if (!response.ok) {
        throw new Error("Something went wrong!")
      }
      const responseData = await response.json()

      const loadedMeals = []
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals)
    }
    fetchMeals()
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])
  if (isLoading) {
    return <section className={classes["meals-loading"]}>Loading...</section>
  }
  if (error) {
    return (
      <section className={classes["meals-error"]}>
        <p>{error}</p>
      </section>
    )
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      name={meal.name}
      description={meal.description}
      price={meal.price}
      key={meal.id}
      id={meal.id}
    ></MealItem>
  ))
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
