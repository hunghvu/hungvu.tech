/**
 * Author: Hung Vu
 *
 * An entry point for blog (home) page.
 */

import type { Metadata, Viewport } from 'next';
import { ArticleJsonLd } from 'next-seo';
import getMetadataBySlug from '@utils/request/server-side/get-metadata-by-slug';
import getLabsWithMinimalResponse from '@utils/request/server-side/lab/get-labs-with-minimal-response';
import PageLab from './page-lab';

export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  themeColor: '#00002f',
  width: 'device-width',
  initialScale: 1,
};

export const generateMetadata = async (): Promise<Metadata> => {
  const metadata = await getMetadataBySlug('lab');
  return {
    title: `${metadata.seoTitle} - hungvu.tech`,
    description: `${metadata.seoDescription}`,
    alternates: {
      canonical: '/lab',
    },
    openGraph: {
      siteName: 'hungvu.tech',
      title: `${metadata.seoTitle} - hungvu.tech`,
      description: `${metadata.seoDescription}`,
      type: 'article',
      url: '/lab',
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
  const content = await getLabsWithMinimalResponse();
  const metadata = await getMetadataBySlug('lab');
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
        url={`${process.env.NEXT_PUBLIC_BASE_URL!}/lab`}
        useAppDir
      />
      <PageLab content={content} />
    </>
  );
};

export default Page;
