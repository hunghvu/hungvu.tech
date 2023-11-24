/**
 * Author: Hung Vu
 *
 * An entry point for the article page.
 */

import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { ArticleJsonLd } from 'next-seo';
import ArticlePage from './page-article';

const getArticle = async (slug: string): Promise<any> => {
  let res;
  try {
    res = await fetch(`${process.env.NEXT_REQUEST_CMS_ARTICLES_URL!}?where[settings.slug][equals]=${slug}`, {
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
    });
  } catch (err) {
    throw new Error('Connection Error');
  }

  // Catch errors first, or else json conversion may fail.
  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  if (res.status === 404) {
    notFound();
  }

  if (res.status > 500) {
    throw new Error('Server Error');
  }

  const content = await res.json();

  // Payload CMS can returns status 200, but with an empty array.
  if (content.docs.length < 1 || !('settings' in content.docs[0])) {
    notFound();
  }

  return content.docs[0];
};

const getAllArticlesInTheSameSeries = async (seriesTitle: string): Promise<any> => {
  let res;
  try {
    res = await fetch(`${process.env.NEXT_REQUEST_CMS_ARTICLES_URL!}?where[settings.series.title][equals]=${seriesTitle}`, {
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
    });
  } catch (err) {
    throw new Error('Connection Error');
  }

  // Catch errors first, or else json conversion may fail.
  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  if (res.status === 404) {
    notFound();
  }

  if (res.status > 500) {
    throw new Error('Server Error');
  }

  const content = await res.json();

  // Payload CMS can returns status 200, but with an empty array.
  if (content.docs.length < 1 || !('settings' in content.docs[0])) {
    notFound();
  }

  return content.docs;
};

interface MetadataProps {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export const viewport: Viewport = {
  themeColor: '#072321',
  width: 'device-width',
  initialScale: 1,
};

export const generateMetadata = async ({ params }: MetadataProps): Promise<Metadata> => {
  const content = await getArticle(params.slug);
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
  const content = await getArticle(params.slug);
  let relatedArticles;
  if (content.settings.series) {
    relatedArticles = await getAllArticlesInTheSameSeries(content.settings.series.title as string);
  }
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
      <ArticlePage content={content} relatedArticles={relatedArticles} />
    </>
  );
};

export default Page;
