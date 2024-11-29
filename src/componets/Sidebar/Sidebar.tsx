import React from "react";

import styles from "./Sidebar.module.scss";

import { Meal } from "../../types/meal";

type SidebarProps = {
   isOpen: boolean;
   onClose: () => void;
   selectedRecipes: Meal[];
};

const Sidebar: React.FC<SidebarProps> = ({
   isOpen,
   onClose,
   selectedRecipes,
}) => {
   const combinedIngredients = selectedRecipes.reduce(
      (acc: string[], recipe) => {
         const ingredients = Object.keys(recipe)
            .filter(
               (key) => key.includes("Ingredient") && recipe[key as keyof Meal]
            )
            .map((key) => recipe[key as keyof Meal] as string);

         return [...acc, ...ingredients];
      },
      []
   );

   const uniqueIngredients = Array.from(new Set(combinedIngredients));

   return (
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
         <button className={styles.closeButton} onClick={onClose}>
            ✖ Close
         </button>
         <h2 className={styles.title}>Selected Recipes</h2>
         <ul className={styles.recipeList}>
            {selectedRecipes.map((recipe) => (
               <li key={recipe.idMeal}>{recipe.strMeal}</li>
            ))}
         </ul>
         <h3 className={styles.title}>Combined Ingredients</h3>
         <ul className={styles.ingredientList}>
            {uniqueIngredients.map((ingredient, index) => (
               <li key={index}>{ingredient}</li>
            ))}
         </ul>
      </div>
   );
};

export default Sidebar;
