/**
 * Author: Hung Vu
 *
 * Article page.
 */

import { Divider } from 'primereact/divider';
import { utcToLocal } from 'app/_utilities/parse-date';
import { RichText } from 'app/_components/richtext';
import RelatedArticles from './related-articles';

const PageArticle: React.FunctionComponent<{ content: any; relatedArticles: any }> = ({ content, relatedArticles }) => {
  return (
    <article className='flex flex-col gap-4 w-full md:w-[768px] p-4 break-words bg-[#00002f]/80 border border-1 border-zinc-500 rounded-md'>
      <div className='flex flex-row gap-16 text-sm md:text-base text-zinc-300'>
        <time dateTime={content.createdAt}>Published on: {utcToLocal(content.createdAt as string, 'MMM DD, YYYY')}</time>
        <time dateTime={content.updatedAt}>Updated on: {utcToLocal(content.updatedAt as string, 'MMM DD, YYYY')}</time>
      </div>
      <hgroup className='flex flex-col gap-6 w-full'>
        <h1 className='text-3xl md:text-4xl font-extrabold'>{content.title}</h1>
        <p className='text-xl md:text-2xl font-light text-zinc-200 italic'>{content.subTitle}</p>
      </hgroup>
      <Divider />
      <RichText nodes={content.body.root.children} />

      {relatedArticles ? (
        <>
          <Divider />
          <RelatedArticles
            currentArticleSlug={content.settings.slug}
            currentSeriesTitle={content.settings.series.title}
            relatedArticles={relatedArticles}
          />
        </>
      ) : null}
    </article>
  );
};

export default PageArticle;
