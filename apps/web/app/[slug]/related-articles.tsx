/**
 * Author Hung Vu
 *
 * Related articles (in the same series) component.
 */
'use client';
import Link from 'next/link';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { useEffect } from 'react';

interface RelatedArticlesProps {
  currentArticleSlug: string;
  currentSeriesTitle: string;
  relatedArticles: any;
}

const RelatedArticles: React.FunctionComponent<RelatedArticlesProps> = ({ currentArticleSlug, currentSeriesTitle, relatedArticles }) => {
  const items = relatedArticles.map((item: any, index: any) => {
    return {
      id: item.id,
      title: item.title,
      slug: item.settings.slug,
      index: relatedArticles.length - index,
    };
  });
  let currentArticleIndex = 0;
  useEffect(() => {
    const relatedArticlesList = document.getElementById('related-articles-list');
    relatedArticlesList!.scrollTop = 55 * (items.length - currentArticleIndex);
  });
  return (
    <nav className='flex flex-col bg-dark-cyan-900 p-4 w-full h-[20rem] rounded-md'>
      <h2 className='text-xl md:text-2xl font-bold text-[#ffffffde]/85'>Series: {currentSeriesTitle}</h2>
      <Divider
        pt={{
          root: { className: 'before:border-[#2c323a]' },
        }}
      />
      <div className='flex flex-col h-full overflow-y-scroll scroll-smooth scrollbar' id='related-articles-list'>
        {items.map((item: any) => {
          if (currentArticleSlug === item.slug) currentArticleIndex = item.index;
          return (
            <Link className='flex flex-row items-center gap-4 py-4 h-[55px] hover:font-bold relative' href={`/${item.slug}`} key={item.id}>
              <Tag
                pt={{
                  root: {
                    className: `text-[#ffffffde]/70 w-[32px] h-[32px] text-lg md:text-xl rounded-full ${
                      currentArticleSlug === item.slug
                        ? 'bg-dark-cyan-700/70 border border-solid border-2 border-dark-cyan-700/70'
                        : 'bg-transparent border border-solid border-2 border-dark-cyan-700/70'
                    }`,
                  },
                }}
                severity='info'
                value={item.index}
              />
              <p
                className={`block text-[#ffffffde]/70 max-w-[15rem] xs:max-w-[23rem] md:max-w-[40rem] truncate text-base md:text-lg ${
                  currentArticleSlug === item.slug ? 'font-bold' : ''
                }`}
              >
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default RelatedArticles;
