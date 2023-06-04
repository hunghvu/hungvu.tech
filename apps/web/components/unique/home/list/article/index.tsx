/**
 * @author Hung Vu
 *
 * Hero section (well, but it is the latest article to be exact).
 */
import React from "react";

import Link from "next/link";
import Image from "next/image";

import { Article, Category, Media, Tag } from "types/payload-types";

import PreviewArticle from "../../../../shared/preview/article";

const getArticles = async (limit: number, page: number): Promise<Article[] | undefined> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ARTICLES_URL!}?limit=${limit}&page=${page}`);
    const data = await res.json();
    return data.docs as Article[];
  } catch (error) {
    // TODO: implement error notification
    console.error(error);
  }
};

const ArticleList = async () => {
  // TODO: exclude the latest article
  // TODO: infinite scrolling implementation
  // TODO: implement queries when clicking on meta information
  // TODO: adjust image size on the cms, thumnail must be bigger than the card itself
  const list = await getArticles(12, 1);
  return list && list.length > 0 ? (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:p-16 p-4 gap-8 justify-items-center items-center">
      {list.map((article) => (
        <div className="flex flex-col justify-center items-center gap-4 rounded-3xl bg-light-orange-200 dark:bg-dark-cyan-800 max-w-[26.5rem]">
          {/* TODO: Implement dynamic content after CMS is finalized. */}
          <Link href={article.pageSettings.settingsUrlSlug}>
            <Image
              src={(article.pageSettings.settingsCoverImage as Media).sizes!.thumbnail!.url!}
              alt={(article.pageSettings.settingsCoverImage as Media).alt!}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full rounded-t-3xl"
            />
          </Link>
          <PreviewArticle
            isHero={false}
            slug={article.pageSettings.settingsUrlSlug}
            category={(article.pageSettings.settingsCategories as Category).categoriesTitle}
            title={article.contentTitle}
            subtitle={article.contentSubTitle}
            authorName={"Hung Vu"} // TODO: Consider adding author name on the CMS?
            publishedDate={article.pageSettings.settingsScheduledReleaseDate}
            tags={(article.pageSettings.settingsTags as Tag[]).map((tag) => tag.tagTitle)}
          />
        </div>
      ))}
    </section>
  ) : (
    <></> // TODO: You have reached the end
  );
};

// https://github.com/vercel/next.js/issues/42292
export default ArticleList as unknown as () => JSX.Element;
