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
import { fredoka } from "../../../../fonts";

const getArticles = async (limit: number, page: number): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ARTICLES_URL!}?limit=${limit}&page=${page}&where[pageSettings.settingsHideFromHome][equals]=no`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

let page = 1;
let limit = 9;
const ArticleList = async () => {
  // TODO: exclude the latest article
  // TODO: implement pagination
  // TODO: implement queries when clicking on meta information
  // TODO: adjust image size on the cms, thumbnail must be bigger than the card itself
  // TODO: CTA to footer?
  // TODO: implement per page limit
  const data = await getArticles(limit, page);
  const hasNextPage = data.hasNextPage;
  const list = data.docs as Article[];
  return list && data.totalDocs > 0 ? (
    <section className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:p-16 p-4 gap-8 justify-items-center items-center">
        {list.map((article) => (
          <article
            className="flex flex-col justify-center items-center gap-4 rounded-3xl bg-light-orange-200 dark:bg-dark-cyan-800 max-w-[26.5rem]"
            key={article.id}
          >
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
          </article>
        ))}
      </div>
      {hasNextPage ? null : (
        <div className={`${fredoka.className} text-light-black-900 dark:text-dark-white-200 font-bold text-base`}>
          The end! Subscribe to get notified when new article arrives.
        </div>
      )}
    </section>
  ) : (
    <></>
  );
};

// https://github.com/vercel/next.js/issues/42292
export default ArticleList as unknown as () => JSX.Element;
