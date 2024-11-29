import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import themealdbAPI from "../../api/MealAPI";
import styles from "./MealPage.module.scss";

import { Meal } from "../../types/meal";

const MealPage: React.FC = () => {
   const { mealName = "" } = useParams<{ mealName: string }>();

   const [meal, setMeal] = useState<Meal | null>(null);

   useEffect(() => {
      const fetchMeal = async () => {
         try {
            const response = await themealdbAPI.getByName(mealName);
            setMeal(response.meals[0]);
         } catch (error) {
            console.error(error);
         }
      };

      fetchMeal();
   }, [mealName]);

   if (!meal) return <div>Loading...</div>;

   return (
      <main className={styles.wrapper}>
         <h1 className={styles.title}>{meal.strMeal}</h1>
         <img src={meal.strMealThumb} alt={meal.strMeal} />
         <div className={styles.box}>
            <p className={styles.text}>{meal.strCategory}</p>
            <p className={styles.text}>{meal.strArea}</p>
         </div>
         <p className={styles.description}>{meal.strInstructions}</p>
      </main>
   );
};

export default MealPage;
