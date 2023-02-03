import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
const mealsAppear = keyframes`
    from {
      opacity: 0;
      transform: translateY(3rem);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
`;
const Meals = styled.section`
  max-width: 60rem;
  width: 90%;
  margin: 2rem auto;
  animation: ${mealsAppear} 1s ease-out forwards;
`;

const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MealsLoading = styled.section`
  text-align: center;
  color: white;
`;

const MealsError = styled(MealsLoading)`
  color: red;
`;

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://udemy-react-http-6841c-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <MealsLoading>
        <p>Loading...</p>
      </MealsLoading>
    );
  }

  if (httpError) {
    return (
      <MealsError>
        <p>{httpError}</p>
      </MealsError>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <Meals>
      <Card>
        <UL>{mealsList}</UL>
      </Card>
    </Meals>
  );
};

export default AvailableMeals;
