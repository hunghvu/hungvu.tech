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
import Image from "next/image";

import author from "../../../../public/images/author.svg";
import calendar from "../../../../public/images/calendar.svg";
import tag from "../../../../public/images/tag.svg";

import { fredoka } from "../../../fonts";
import { robotoSerif } from "../../../fonts";
import { interTight } from "../../../fonts";

type CardDetail = {
  isHero: boolean;
  slug: string;
  category: {
    name: string;
    url: string;
  };
  title: string;
  subtitle: string;
  authorName: string;
  date: string;
  tags: {
    name: string;
    url: string;
  }[]; // Up to 3 tags, enforce on the back end
};

const cardMetaContent = `flex flex-row justify-start items-center gap-2 ${fredoka.className} not-italic text-xs font-light`;
const buttonHoverEffect = `px-1 border-2 rounded-3xl border-transparent hover:border-mango hover:transition-colors hover:duration-1000`;

const CardContent: React.FC<CardDetail> = ({ isHero, slug, category, title, subtitle, authorName, date, tags }) => {
  return (
    <article className="flex flex-col justify-start sm:gap-4 gap-2 p-4 text-dune max-w-[39.375rem]">
      <header className="flex flex-col justify-start gap-4">
        <Link href={category.url} className={`${fredoka.className} font-semibold sm:text-xl text-lg`}>
          {category.name}
        </Link>
        <Link href={slug} className={`${robotoSerif.className} text-dune-emphasized font-bold ${isHero ? "sm:text-32px text-xl" : "text-2xl"}`}>
          <h2>{title}</h2>
        </Link>
      </header>
      <Link href={slug} className={`${interTight.className} sm:text-lg text-base`}>
        <p>{subtitle}</p>
      </Link>
      <footer className="flex flex-row flex-wrap gap-x-4">
        <address className={cardMetaContent}>
          <Image src={author} alt={`Author of ${title} is ${authorName}`} className="w-3 h-3" />
          {/* Keep it as fixed link for now. */}
          <Link href="/about" rel="author" className={buttonHoverEffect}>
            {authorName}
          </Link>
        </address>
        <div className={`${cardMetaContent}`}>
          <Image src={calendar} alt={`The article: ${title} was released on ${date}`} className="w-3 h-3" />
          <time dateTime={date} className="px-1 border-2 rounded-3xl border-transparent">
            {date}
          </time>
        </div>

        <div className={cardMetaContent}>
          <Image src={tag} alt={"Article topics"} className="w-3 h-3" />
          {tags.map((tag, index) => (
            <Link href={tag.url} className={buttonHoverEffect} key={index}>{`#${tag.name}`}</Link>
          ))}
        </div>
      </footer>
    </article>
  );
};

export default CardContent;
