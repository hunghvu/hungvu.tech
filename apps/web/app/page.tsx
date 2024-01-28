/**
 * Author: Hung Vu
 *
 * An entry point for blog (home) page.
 */

import type { Metadata, Viewport } from 'next';
import { ArticleJsonLd } from 'next-seo';
import getArticlesWithMinimalResponse from '@utils/request/server-side/blog/get-articles-with-minimal-response';
import getMetadataBySlug from '@utils/request/server-side/get-metadata-by-slug';
import PageBlog from './page-blog';

export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  themeColor: '#00002f',
  width: 'device-width',
  initialScale: 1,
};

export const generateMetadata = async (): Promise<Metadata> => {
  const metadata = await getMetadataBySlug('root');
  return {
    title: `${metadata.seoTitle} - hungvu.tech`,
    description: `${metadata.seoDescription}`,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      siteName: 'hungvu.tech',
      title: `${metadata.seoTitle} - hungvu.tech`,
      description: `${metadata.seoDescription}`,
      type: 'article',
      url: '/',
      images: {
        url: `${metadata.images.sizes.og.url}`,
        alt: `${metadata.seoTitle} - hungvu.tech`,
      },
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${metadata.seoTitle} - hungvu.tech`,
      description: `${metadata.seoDescription}`,
      images: {
        url: `${metadata.images.sizes.og.url}`,
        alt: `${metadata.seoTitle} - hungvu.tech`,
      },
      creator: '@hunghvu_dev',
    },
  };
};

const Page = async (): Promise<any> => {
  const content = await getArticlesWithMinimalResponse();
  const metadata = await getMetadataBySlug('root');
  return (
    <>
      <ArticleJsonLd
        authorName={[
          {
            name: 'Hung Vu',
            url: process.env.NEXT_PUBLIC_BASE_URL!,
          },
        ]}
        dateModified={new Date().toISOString()}
        datePublished={new Date().toISOString()}
        description={metadata.seoDescription}
        images={[
          `${metadata.images.sizes.cover.url}`,
          `${metadata.images.sizes.og.url}`,
          `${metadata.images.sizes.embed.url}`,
          `${metadata.images.sizes.thumbnail.url}`,
        ]}
        isAccessibleForFree
        publisherLogo={`${process.env.NEXT_PUBLIC_BASE_URL!}/favicon.ico`}
        publisherName='Hung Vu - hungvu.tech'
        title={metadata.seoTitle}
        url={process.env.NEXT_PUBLIC_BASE_URL!}
        useAppDir
      />
      <PageBlog content={content} />
    </>
  );
};

export default Page;
