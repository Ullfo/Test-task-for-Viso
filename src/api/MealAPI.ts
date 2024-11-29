import { CategoriesResponse, MealsResponse } from "../types/meal";

class themealdbAPI {
   public static getAll = async (): Promise<MealsResponse> => {
      const response = await fetch(
         "https://www.themealdb.com/api/json/v1/1/search.php?s=a"
      );
      return response.json();
   };

   public static getByName = async (name: string): Promise<MealsResponse> => {
      const response = await fetch(
         `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
      );
      return response.json();
   };

   public static getCategories = async (): Promise<CategoriesResponse> => {
      const response = await fetch(
         `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
      );
      return response.json();
   };
}

export default themealdbAPI;
