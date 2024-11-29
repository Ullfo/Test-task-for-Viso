import React from "react";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

import styles from "./MealCard.module.scss";

type MealCardProps = {
   name: string;
   image: string;
   place: string;
   category: string;
   isSelected: boolean;
   onToggleSelect: () => void;
};

const MealCard: React.FC<MealCardProps> = ({
   name,
   image,
   place,
   category,
   isSelected,
   onToggleSelect,
}) => {
   const navigate = useNavigate();

   const handlePageChange = () => {
      navigate(`/meal/${name}`);
   };

   return (
      <div className={styles.wrapper} onClick={handlePageChange}>
         <h3 className={styles.title}>{name}</h3>
         <img src={image} alt="meal" />
         <div className={styles.box}>
            <p className={styles.text}>{category}</p>
            <p className={styles.text}>{place}</p>
         </div>
         <button
            onClick={(e) => {
               e.stopPropagation();
               onToggleSelect();
            }}
            className={cn(styles.selectButton, {
               [styles.selected]: isSelected,
            })}
         >
            {isSelected ? "Remove" : "Select"}
         </button>
      </div>
   );
};

export default MealCard;
