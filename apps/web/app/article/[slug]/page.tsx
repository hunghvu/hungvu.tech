import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';

import { ArticleJsonLd } from 'next-seo';

import ArticlePage from './_components/ArticlePage';

const getArticle = async (slug: string) => {
  let res;
  try {
    res = await fetch(`${process.env.PAYLOAD_SERVER_ARTICLES_URL!}?where[settings.urlSlug][equals]=${slug}`, {
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

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const viewport: Viewport = {
  themeColor: '#072321',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await getArticle(params.slug);
  return {
    title: `${content.settings.seoTitle} - hungvu.tech`,
    description: `${content.settings.seoDescription}`,
    alternates: {
      canonical: `/article/${content.settings.urlSlug}`,
    },
    openGraph: {
      siteName: 'hungvu.tech',
      title: `${content.settings.seoTitle} - hungvu.tech`,
      description: `${content.settings.seoDescription}`,
      type: 'article',
      url: `/article/${content.settings.urlSlug}`,
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
}

export default async function Page({ params }: Props) {
  const content = await getArticle(params.slug);
  return (
    <>
      <ArticleJsonLd
        useAppDir={true}
        url={`${process.env.NEXT_PUBLIC_BASE_URL!}/article/${content.settings.urlSlug}`}
        title={content.settings.seoTitle}
        images={[
          `${content.settings.images.sizes.cover.url}`,
          `${content.settings.images.sizes.og.url}`,
          `${content.settings.images.sizes.embed.url}`,
          `${content.settings.images.sizes.thumbnail.url}`,
        ]}
        datePublished={content.createdAt}
        dateModified={content.updatedAt}
        authorName={[
          {
            name: 'Hung Vu',
            url: process.env.NEXT_PUBLIC_BASE_URL!,
          },
        ]}
        publisherName='Hung Vu - hungvu.tech'
        publisherLogo={`${process.env.NEXT_PUBLIC_BASE_URL!}/favicon.ico`}
        description={content.settings.seoDescription}
        isAccessibleForFree={true}
      />
      <ArticlePage content={content} />;
    </>
  );
}
