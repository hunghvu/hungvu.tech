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
import { fredoka } from "../../../fonts";

// Temporary value for testing purpose
const getLatestArticle = async (): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ARTICLES_URL!}?limit=${1}&where[pageSettings.settingsHideFromHome][equals]=no`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    // TODO: implement error notification
    console.error(error);
  }
};

const Hero = async () => {
  // TODO: implement queries when clicking on meta information
  const data = await getLatestArticle();
  const latestArticle = data.docs && data.totalDocs > 0 ? (data.docs[0] as Article) : null;
  return latestArticle ? (
    <section className="flex lg:flex-row-reverse flex-col justify-center items-center xl:gap-32 gap-4 sm:p-16 p-4 bg-light-orange-200 dark:bg-dark-cyan-800">
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
      <div className="max-w-[39.375rem]">
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
};

export default Hero as unknown as () => JSX.Element;
