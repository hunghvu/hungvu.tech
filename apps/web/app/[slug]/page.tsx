/**
 * Author: Hung Vu
 *
 * An entry point for the article page.
 */

import type { Metadata, Viewport } from 'next';
import { ArticleJsonLd } from 'next-seo';
import getArticleBySlug from '@utils/request/server-side/get-article-by-slug';
import getArticlesInTheSameSeries from '@utils/request/server-side/get-articles-in-the-same-series';
import PageArticle from './page-article';

interface MetadataProps {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export const viewport: Viewport = {
  themeColor: '#00002f',
  width: 'device-width',
  initialScale: 1,
};

export const generateMetadata = async ({ params }: MetadataProps): Promise<Metadata> => {
  const content = await getArticleBySlug(params.slug);
  return {
    title: `${content.settings.seoTitle} - hungvu.tech`,
    description: `${content.settings.seoDescription}`,
    alternates: {
      canonical: `/${content.settings.slug}`,
    },
    openGraph: {
      siteName: 'hungvu.tech',
      title: `${content.settings.seoTitle} - hungvu.tech`,
      description: `${content.settings.seoDescription}`,
      type: 'article',
      url: `/${content.settings.slug}`,
      images: {
        url: `${content.settings.images.sizes.og.url}`,
        alt: `${content.settings.seoTitle} - hungvu.tech`,
      },
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${content.settings.seoTitle} - hungvu.tech`,
      description: `${content.settings.seoDescription}`,
      images: {
        url: `${content.settings.images.sizes.og.url}`,
        alt: `${content.settings.seoTitle} - hungvu.tech`,
      },
      creator: '@hunghvu_dev',
    },
  };
};

const Page = async ({ params }: MetadataProps): Promise<any> => {
  const content = await getArticleBySlug(params.slug);
  let relatedArticles;
  if (content.settings.series) {
    relatedArticles = await getArticlesInTheSameSeries(content.settings.series.id as string);
  }
  content.updatedAt = 'customizedUpdatedAt' in content.settings ? content.settings.customizedUpdatedAt : content.updatedAt;
  content.createdAt = 'customizedCreatedAt' in content.settings ? content.settings.customizedCreatedAt : content.createdAt;
  return (
    <>
      <ArticleJsonLd
        authorName={[
          {
            name: 'Hung Vu',
            url: process.env.NEXT_PUBLIC_BASE_URL!,
          },
        ]}
        dateModified={content.updatedAt}
        datePublished={content.createdAt}
        description={content.settings.seoDescription}
        images={[
          `${content.settings.images.sizes.cover.url}`,
          `${content.settings.images.sizes.og.url}`,
          `${content.settings.images.sizes.embed.url}`,
          `${content.settings.images.sizes.thumbnail.url}`,
        ]}
        isAccessibleForFree
        publisherLogo={`${process.env.NEXT_PUBLIC_BASE_URL!}/favicon.ico`}
        publisherName='Hung Vu - hungvu.tech'
        title={content.settings.seoTitle}
        url={`${process.env.NEXT_PUBLIC_BASE_URL!}/${content.settings.slug}`}
        useAppDir
      />
      <PageArticle content={content} relatedArticles={relatedArticles} />
    </>
  );
};

export default Page;
