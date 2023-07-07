/**
 * @author Hung Vu
 *
 * This is the content section of each article card.
 * As this can be across multiple location (e.g., hero too), hence it is a shared component.
 *
 * To fully make an article card, there needs to be a cover image to go along.
 */

import React from "react";

import Link from "next/link";

import CardContentTime from "./Time";

import { Author, Tag } from "../../svg";

import { intelOneMono } from "../../../fonts";

type PreviewArticleProps = {
  isHero: boolean;
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  authorName: string;
  publishedDate: string;
  tags: string[]; // Up to 3 tags, enforce on the back end
};

const cardMetaContent = `flex flex-row justify-start items-center gap-2 ${intelOneMono.className} not-italic text-xs font-light`;
const buttonHoverEffect = `px-1 border-2 rounded-xl border-transparent hover:border-light-orange-300 dark:hover:border-dark-cyan-700 hover:transition-colors hover:duration-1000`;

const PreviewArticle: React.FC<PreviewArticleProps> = ({ isHero, slug, category, title, subtitle, authorName, publishedDate, tags }) => {
  return (
    <article className="flex flex-col justify-start sm:gap-4 gap-2 p-4 w-full max-w-[39.375rem]">
      <header className="flex flex-col justify-start gap-4">
        {isHero ? (
          <div className={`${intelOneMono.className} font-semibold text-base text-light-black-900 dark:text-dark-white-200`}>{category}</div>
        ) : null}

        <Link
          href={slug}
          className={`${intelOneMono.className} text-light-black-900 dark:text-dark-white-200 font-bold ${
            isHero ? "md:text-32px text-xl" : "text-xl"
          }`}
        >
          <h2>{title}</h2>
        </Link>
      </header>
      <Link href={slug} className={`${intelOneMono.className} ${isHero ? "md:text-xl" : null} text-base text-light-black-800 dark:text-dark-white-100`}>
        <p>{subtitle}</p>
      </Link>
      <footer className="flex flex-row flex-wrap gap-x-4 text-light-black-900 dark:text-dark-white-200">
        <address className={cardMetaContent}>
          <Author alt={`Author of ${title} is ${authorName}`} className="w-3 h-3 fill-current text-light-black-900 dark:text-dark-white-200" />
          {/* Keep it as fixed link for now. */}
          <Link href="/about" rel="author" className={buttonHoverEffect}>
            {authorName}
          </Link>
        </address>
        <div className={`${cardMetaContent}`}>
          <CardContentTime publishedDate={publishedDate} />
        </div>

        <div className={cardMetaContent}>
          <Tag alt={"Article topics"} className="w-3 h-3 fill-current text-light-black-900 dark:text-dark-white-200" />
          {tags.map((tag, index) => (
            <div className={buttonHoverEffect} key={index}>
              {tag}
            </div>
          ))}
        </div>
      </footer>
    </article>
  );
};

export default PreviewArticle;
