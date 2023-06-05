/**
 * @author Hung Vu
 *
 * Home page
 */

import Link from "next/link";
import Image from "next/image";

import { Article, Media, Category, Tag } from "types/payload-types";
import { fredoka } from "../components/fonts";
import PreviewArticle from "../components/shared/preview/article";

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

// useState is not applicable in SSR, but these are
// used for only queries, no need to re-render
let queryLimit = 9;
let pageNumber = 1;

export default async function HomePage() {
  // TODO: exclude the latest article
  // TODO: implement pagination
  // TODO: implement queries when clicking on meta information
  // TODO: adjust image size on the cms, thumbnail must be bigger than the card itself
  // TODO: CTA to footer?
  // TODO: implement per page limit

  const data = await getArticles(queryLimit, pageNumber);

  const hasNextPage = data.hasNextPage;
  const list = data.docs as Article[];
  const latestArticle = list && data.totalDocs > 0 ? (list[0] as Article) : null;
  return latestArticle ? (
    <section className="flex flex-col justify-center items-center">
      <article className="flex lg:flex-row-reverse flex-col w-full justify-center items-center xl:gap-32 gap-4 sm:p-16 p-4 bg-light-orange-200 dark:bg-dark-cyan-800">
        <Link href={latestArticle.pageSettings.settingsUrlSlug}>
          <Image
            src={(latestArticle.pageSettings.settingsCoverImage as Media).sizes!.cover!.url!}
            alt={(latestArticle.pageSettings.settingsCoverImage as Media).alt!}
            width="0"
            height="0"
            sizes="100vw"
            className="max-w-[39.375rem] w-full rounded-3xl"
          />
        </Link>
        <div className="max-w-[39.375rem] w-full">
          <PreviewArticle
            isHero={true}
            slug={latestArticle.pageSettings.settingsUrlSlug}
            category={(latestArticle.pageSettings.settingsCategories as Category).categoriesTitle}
            title={latestArticle.contentTitle}
            subtitle={latestArticle.contentSubTitle}
            authorName={"Hung Vu"} // TODO: Consider adding author name on the CMS?
            publishedDate={latestArticle.pageSettings.settingsScheduledReleaseDate}
            tags={(latestArticle.pageSettings.settingsTags as Tag[]).map((tag) => tag.tagTitle)}
          />
        </div>
      </article>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full sm:p-16 p-4 gap-8 justify-items-center items-center">
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
    // TODO: Adjust height so it only fills the range between header and footer
    // TODO: More creative? like a CTA?
    <div
      className={`${fredoka.className} flex flex-col min-h-screen justify-center items-center text-light-black-900 dark:text-dark-white-200 bg-light-orange-200 dark:bg-dark-cyan-800 text-32px`}
    >
      Articles are not available at the moment.
    </div>
  );
}
