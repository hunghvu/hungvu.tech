/**
 * Author: Hung Vu
 *
 * An entry point for blog (home) page.
 */

import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { ArticleJsonLd } from 'next-seo';
import BlogPage from './page-blog';

const handleError = (res: Response): void => {
  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  if (res.status === 404) {
    notFound();
  }

  if (res.status > 500) {
    throw new Error('Server Error');
  }
};

const getAllArticles = async (): Promise<any> => {
  let res;
  try {
    res = await fetch(process.env.PAYLOAD_SERVER_ARTICLES_URL!, {
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
    });
  } catch (err) {
    throw new Error('Connection Error');
  }

  handleError(res);

  const content = await res.json();

  // Payload CMS can returns status 200, but with an empty array.
  if (content.docs.length < 1 || !('settings' in content.docs[0])) {
    notFound();
  }

  return content.docs;
};

const getMetadata = async (): Promise<any> => {
  let res;
  try {
    res = await fetch(`${process.env.PAYLOAD_SERVER_STATIC_ROUTE_METADATA_URL!}?where[isRoot][equals]=${true}`, {
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
    });
  } catch (err) {
    throw new Error('Connection Error');
  }

  handleError(res);

  const metadata = await res.json();

  // Payload CMS can returns status 200, but with an empty array.
  if (metadata.docs.length < 1) {
    notFound();
  }

  return metadata.docs[0];
};

export const viewport: Viewport = {
  themeColor: '#072321',
  width: 'device-width',
  initialScale: 1,
};

export const generateMetadata = async (): Promise<Metadata> => {
  const metadata = await getMetadata();
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
  const content = await getAllArticles();
  const metadata = await getMetadata();
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
      <BlogPage content={content} />
    </>
  );
};

export default Page;
