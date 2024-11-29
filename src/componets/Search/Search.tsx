import React from "react";

import styles from "./Search.module.scss";

type SearchProps = {
   searchQuery: string;
   selectedCategory: string;
   categories: string[];
   onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
   onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProps> = ({
   searchQuery,
   selectedCategory,
   categories,
   onCategoryChange,
   onSearchChange,
}) => {
   return (
      <div className={styles.controls}>
         <input
            type="text"
            value={searchQuery}
            placeholder="Find your meal"
            onChange={onSearchChange}
            className={styles.searchInput}
         />

         <select
            value={selectedCategory}
            onChange={onCategoryChange}
            className={styles.categorySelect}
         >
            <option value="">All Categories</option>
            {categories.map((category) => (
               <option key={category} value={category}>
                  {category}
               </option>
            ))}
         </select>
      </div>
   );
};

export default Search;
