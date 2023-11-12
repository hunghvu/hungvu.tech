import { Metadata, Viewport } from 'next';
import ArticlePage from './_components/ArticlePage';
import { ArticleJsonLd } from 'next-seo';

const getArticle = async (slug: string) => {
  const res = await fetch(`${process.env.PAYLOAD_SERVER_ARTICLES_URL!}?where[settings.urlSlug][equals]=${slug}`, {
    cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
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
  const article = await getArticle(params.slug);
  const content = article.docs[0];
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
    verification: {
      google: 'EGTdZytY_C05esF562wX0i-fpIShKgfypgbhQV3bPzU',
    },
  };
}

export default async function Page({ params }: Props) {
  const article = await getArticle(params.slug);
  const content = article.docs[0];
  return (
    <>
      <ArticleJsonLd
        useAppDir={true}
        url={`https://${process.env.NEXT_PUBLIC_BASE_URL!}/article/${content.settings.urlSlug}`}
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
