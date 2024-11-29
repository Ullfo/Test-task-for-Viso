import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import themealdbAPI from "../../api/MealAPI";
import AppCard from "../../componets/MealCard/MealCard";
import AppPagination from "../../componets/Pagination/Pagination";
import BasketSidebar from "../../componets/Sidebar/Sidebar";
import Search from "../../componets/Search/Search";

import styles from "./MainPage.module.scss";

import { Meal, Category } from "../../types/meal";

const MainPage: React.FC = () => {
   const [searchParams, setSearchParams] = useSearchParams();

   const [data, setData] = useState<Meal[]>([]);
   const [categories, setCategories] = useState<Category[]>([]);
   const [count, setCount] = useState<number>(0);
   const [searchQuery, setSearchQuery] = useState<string>("");
   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
   const [selectedRecipes, setSelectedRecipes] = useState<Meal[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<string>("");
   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

   const page = searchParams.get("page")
      ? parseInt(searchParams.get("page")!, 10)
      : 1;
   const itemsPerPage = 3;

   useEffect(() => {
      const timer = setTimeout(() => {
         setDebouncedSearchQuery(searchQuery);
      }, 500);

      return () => clearTimeout(timer);
   }, [searchQuery]);

   const fetchData = async () => {
      try {
         const [categoriesResponse, mealsResponse] = await Promise.all([
            themealdbAPI.getCategories(),
            themealdbAPI.getAll(),
         ]);

         setCategories(categoriesResponse.meals);

         const filteredBySearch = mealsResponse.meals.filter((meal) =>
            meal.strMeal
               .toLowerCase()
               .includes(debouncedSearchQuery.toLowerCase())
         );
         const filteredByCategory = selectedCategory
            ? filteredBySearch.filter(
                 (meal) => meal.strCategory === selectedCategory
              )
            : filteredBySearch;

         setData(filteredByCategory);
         setCount(Math.ceil(filteredByCategory.length / itemsPerPage));
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      fetchData();
   }, [debouncedSearchQuery, selectedCategory]);

   const handlePageChange = (newPage: number) => {
      setSearchParams({ page: newPage.toString() });
   };

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
   };

   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(e.target.value);
      setSearchParams({ page: "1" });
   };

   const toggleRecipeSelection = (recipe: Meal) => {
      setSelectedRecipes((prev) => {
         if (prev.some((r) => r.idMeal === recipe.idMeal)) {
            return prev.filter((r) => r.idMeal !== recipe.idMeal);
         }
         return [...prev, recipe];
      });
   };

   const currentData = data.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
   );

   return (
      <main className={styles.wrapper}>
         <button
            className={styles.button}
            onClick={() => setIsSidebarOpen(true)}
         >
            Basket
         </button>

         <BasketSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            selectedRecipes={selectedRecipes}
         />

         <Search
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            categories={categories.map((c) => c.strCategory)}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
         />

         {currentData.length === 0 ? (
            <h1>No results found...</h1>
         ) : (
            <div className={styles.content}>
               <ul className={styles.list}>
                  {currentData.map((item) => (
                     <AppCard
                        key={item.idMeal}
                        name={item.strMeal}
                        place={item.strArea}
                        image={item.strMealThumb}
                        category={item.strCategory}
                        onToggleSelect={() => toggleRecipeSelection(item)}
                        isSelected={selectedRecipes.some(
                           (recipe) => recipe.idMeal === item.idMeal
                        )}
                     />
                  ))}
               </ul>
               <AppPagination
                  page={page}
                  count={count}
                  siblingCount={2}
                  onChange={handlePageChange}
               />
            </div>
         )}
      </main>
   );
};

export default MainPage;
