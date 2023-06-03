import { FC } from "react";
/**
 * @author Hung Vu
 *
 * Filter bar to search for articles
 */

import { fredoka } from "../../../fonts";

// Depends on how filter is implemented, might need to change to params
type FilterProps = {
  categories: string[];
  tags: string[];
  series: string[];
};

const Filter: FC<FilterProps> = ({ categories, tags, series }) => {
  return (
    <section
      role="search"
      className="flex flex-row justify-center items-center sm:px-16 bg-light-orange-100 dark:bg-dark-cyan-900 text-light-black-900 dark:text-dark-white-200"
    >
      <div className="flex flex-row justify-start items-center`  text-xl p-4 gap-8">
        {categories.map((category) => (
          <p className={`${fredoka.className} font-semibold`}>{category}</p>
        ))}
      </div>
    </section>
  );
};

export default Filter;
