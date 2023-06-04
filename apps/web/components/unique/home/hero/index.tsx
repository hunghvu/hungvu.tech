/**
 * @author Hung Vu
 *
 * Hero section (well, but it is the latest article to be exact).
 */

import React from "react";

import Link from "next/link";
import Image from "next/image";

import { Article, Category, Media, Tag } from "types/payload-types";

import PreviewArticle from "../../../shared/preview/article";

// Temporary value for testing purpose
const getLatestArticle = async (): Promise<Article[] | undefined> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ARTICLES_URL!}?limit=${1}`);
    const data = await res.json();
    return data.docs as Article[];
  } catch (error) {
    // TODO: implement error notification
    console.error(error);
  }
};

const Hero = async () => {
  // TODO: implement queries when clicking on meta information
  const latestArticle = await getLatestArticle();
  return latestArticle ? (
    <section className="flex lg:flex-row-reverse flex-col justify-center items-center xl:gap-32 gap-4 sm:p-16 p-4 bg-light-orange-200 dark:bg-dark-cyan-800">
      <Link href={latestArticle[0].pageSettings.settingsUrlSlug}>
        <Image
          src={(latestArticle[0].pageSettings.settingsCoverImage as Media).sizes!.cover!.url!}
          alt={(latestArticle[0].pageSettings.settingsCoverImage as Media).alt!}
          width="0"
          height="0"
          sizes="100vw"
          className="max-w-[39.375rem] w-full rounded-3xl"
        />
      </Link>
      <div className="max-w-[39.375rem]">
        <PreviewArticle
          isHero={true}
          slug={latestArticle[0].pageSettings.settingsUrlSlug}
          category={(latestArticle[0].pageSettings.settingsCategories as Category).categoriesTitle}
          title={latestArticle[0].contentTitle}
          subtitle={latestArticle[0].contentSubTitle}
          authorName={"Hung Vu"} // TODO: Consider adding author name on the CMS?
          publishedDate={latestArticle[0].pageSettings.settingsScheduledReleaseDate}
          tags={(latestArticle[0].pageSettings.settingsTags as Tag[]).map((tag) => tag.tagTitle)}
        />
      </div>
    </section>
  ) : (
    <></> // TODO: No article message
  );
};

export default Hero as unknown as () => JSX.Element;
