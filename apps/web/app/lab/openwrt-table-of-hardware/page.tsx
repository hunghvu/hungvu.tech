import getOpenwrtToh from '@utils/request/server-side/lab/openwrt-table-of-harware/get-openwrt-toh';
import getOpenwrtTohAvailableValuesOfEachField from '@utils/request/server-side/lab/openwrt-table-of-harware/get-openwrt-toh-available-values-of-each-field';
import getLabBySlug from '@utils/request/server-side/lab/get-lab-by-slug';
import type { Viewport, Metadata } from 'next';
import PageOpenwrtToh from './page-openwrt-toh';

export const viewport: Viewport = {
  themeColor: '#00002f',
  width: 'device-width',
  initialScale: 1,
};

export const generateMetadata = async (): Promise<Metadata> => {
  const content = await getLabBySlug('openwrt-table-of-hardware');
  return {
    title: `${content.settings.seoTitle} - hungvu.tech`,
    description: `${content.settings.seoDescription}`,
    alternates: {
      canonical: `/lab/${content.settings.slug}`,
    },
    openGraph: {
      siteName: 'hungvu.tech',
      title: `${content.settings.seoTitle} - hungvu.tech`,
      description: `${content.settings.seoDescription}`,
      type: 'article',
      url: `/lab/${content.settings.slug}`,
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

const Page = async (): Promise<any> => {
  const data = await getOpenwrtToh(10, 1);
  const availableValues = await getOpenwrtTohAvailableValuesOfEachField();
  const contentData = await getLabBySlug('openwrt-table-of-hardware');
  return <PageOpenwrtToh availableValues={availableValues} contentData={contentData} tohData={data} />;
};

export default Page;
