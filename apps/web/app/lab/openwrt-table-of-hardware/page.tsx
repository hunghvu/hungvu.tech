import type { Viewport, Metadata } from 'next';
import { ArticleJsonLd } from 'next-seo';
import getOpenwrtToh from '@utils/request/server-side/lab/openwrt-table-of-harware/get-openwrt-toh';
import getOpenwrtTohAvailableValuesOfEachField from '@utils/request/server-side/lab/openwrt-table-of-harware/get-openwrt-toh-available-values-of-each-field';
import getLabBySlug from '@utils/request/server-side/lab/get-lab-by-slug';
import PageOpenwrtToh from './page-openwrt-toh';

export const viewport: Viewport = {
  themeColor: '#00002f',
  width: 'device-width',
  initialScale: 1,
};

export const generateMetadata = async (): Promise<Metadata> => {
  const contentData = await getLabBySlug('openwrt-table-of-hardware');
  return {
    title: `${contentData.settings.seoTitle} - hungvu.tech`,
    description: `${contentData.settings.seoDescription}`,
    alternates: {
      canonical: `/lab/${contentData.settings.slug}`,
    },
    openGraph: {
      siteName: 'hungvu.tech',
      title: `${contentData.settings.seoTitle} - hungvu.tech`,
      description: `${contentData.settings.seoDescription}`,
      type: 'article',
      url: `/lab/${contentData.settings.slug}`,
      images: {
        url: `${contentData.settings.images.sizes.og.url}`,
        alt: `${contentData.settings.seoTitle} - hungvu.tech`,
      },
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${contentData.settings.seoTitle} - hungvu.tech`,
      description: `${contentData.settings.seoDescription}`,
      images: {
        url: `${contentData.settings.images.sizes.og.url}`,
        alt: `${contentData.settings.seoTitle} - hungvu.tech`,
      },
      creator: '@hunghvu_dev',
    },
  };
};

const Page = async (): Promise<any> => {
  const data = await getOpenwrtToh(10, 1);
  const availableValues = await getOpenwrtTohAvailableValuesOfEachField();
  const contentData = await getLabBySlug('openwrt-table-of-hardware');
  return (
    <>
      <ArticleJsonLd
        authorName={[
          {
            name: 'Hung Vu',
            url: process.env.NEXT_PUBLIC_BASE_URL!,
          },
        ]}
        dateModified={contentData.updatedAt}
        datePublished={contentData.createdAt}
        description={contentData.settings.seoDescription}
        images={[
          `${contentData.settings.images.sizes.cover.url}`,
          `${contentData.settings.images.sizes.og.url}`,
          `${contentData.settings.images.sizes.embed.url}`,
          `${contentData.settings.images.sizes.thumbnail.url}`,
        ]}
        isAccessibleForFree
        publisherLogo={`${process.env.NEXT_PUBLIC_BASE_URL!}/favicon.ico`}
        publisherName='Hung Vu - hungvu.tech'
        title={contentData.settings.seoTitle}
        url={`${process.env.NEXT_PUBLIC_BASE_URL!}/lab/${contentData.settings.slug}`}
        useAppDir
      />
      <PageOpenwrtToh availableValues={availableValues} contentData={contentData} tohData={data} />;
    </>
  );
};

export default Page;
