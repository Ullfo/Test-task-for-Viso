export type Meal = {
   idMeal: string;
   strMeal: string;
   strDrinkAlternate: string | null;
   strCategory: string;
   strArea: string;
   strInstructions: string;
   strMealThumb: string;
   strTags: string | null;
   strYoutube: string | null;
   [key: string]: string | null; // Додаткові поля, якщо вони є
};

export type Category = {
   strCategory: string;
};

export type MealsResponse = {
   meals: Meal[];
};

export type CategoriesResponse = {
   meals: Category[];
};
