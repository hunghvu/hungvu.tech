/**
 * @author Hung Vu
 *
 * Render time on client side. This is only used in article card content for now.
 */
"use client";
import { FC } from "react";
import { utcToLocal } from "../../../../utilities/parseDate";

import { Calendar } from "../../svg";

type CardContentTimeProps = {
  publishedDate: string;
};

// TODO: Make this available in dynamic route?
const CardContentTime: FC<CardContentTimeProps> = ({ publishedDate }) => {
  const userLocalDate = utcToLocal(publishedDate, "MM/DD/YYYY");
  return (
    <>
      <Calendar
        alt={`The article: was released on ${userLocalDate}`}
        className="w-3 h-3 fill-current text-light-black-900 dark:text-dark-white-200"
      />
      <time dateTime={userLocalDate} className="px-1 border-2 rounded-3xl border-transparent">
        {userLocalDate}
      </time>
    </>
  );
};

export default CardContentTime;
