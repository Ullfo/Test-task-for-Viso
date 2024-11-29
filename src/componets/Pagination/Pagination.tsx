import React from "react";
import cn from "classnames";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import usePagination from "../../hooks/usePagination";
import styles from "./Pagination.module.scss";

export type PaginationProps = {
   page: number;
   count: number;
   siblingCount?: number;
   onChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
   page,
   count,
   siblingCount,
   onChange,
}) => {
   const { paginationRange } = usePagination(page, count, siblingCount);

   return (
      <div className={styles.wrapper}>
         <button
            type="button"
            aria-label="Previous page arrow"
            className={styles.button}
            disabled={page === 1}
            onClick={() => onChange(page - 1)}
         >
            <ChevronLeftIcon width={15} height={15} />
         </button>

         {paginationRange.map((item, index) => {
            if (typeof item === "string") {
               return (
                  <span key={index} className={styles.dots}>
                     {item}
                  </span>
               );
            }

            return (
               <button
                  key={index}
                  type="button"
                  className={cn(
                     styles.page,
                     page === item && styles.pageActive
                  )}
                  onClick={() => onChange(item)}
               >
                  {item}
               </button>
            );
         })}

         <button
            type="button"
            aria-label="Next page arrow"
            className={styles.button}
            disabled={page === count}
            onClick={() => onChange(page + 1)}
         >
            <ChevronRightIcon width={15} height={15} />
         </button>
      </div>
   );
};

export default Pagination;
