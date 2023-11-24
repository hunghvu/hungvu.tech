/**
 * Author Hung Vu
 *
 * Related articles (in the same series) component.
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import type { VirtualScrollerTemplateOptions } from 'primereact/virtualscroller';
import { VirtualScroller } from 'primereact/virtualscroller';

interface RelatedArticlesProps {
  currentArticleSlug: string;
  currentSeriesTitle: string;
  relatedArticles: any;
}

const RelatedArticles: React.FunctionComponent<RelatedArticlesProps> = ({ currentArticleSlug, currentSeriesTitle, relatedArticles }) => {
  const virtualscroller = useRef<VirtualScroller>(null);

  let currentArticleIndex = 0;
  const items = relatedArticles.map((item: any, index: any) => {
    if (item.settings.slug == currentArticleSlug) currentArticleIndex = index;
    return {
      title: item.title,
      slug: item.settings.slug,
      index: relatedArticles.length - index,
    };
  });

  // This useEffect hook is used to handle the display of the component and the scrolling behavior.
  // There are three main parts to consider:
  //  1. The component itself is loaded, and useEffect is called.
  //  2. The data is loaded after Next.js finishes processing the data server-side and sends it to the client.
  //  3. The data is presented by the virtual scroller.

  // Without the setTimeout function, the scrolling action would immediately occur when the page component is loaded, which is before the data is loaded.
  // This would break the intended functionality. By using setTimeout with a delay of 200ms, we ensure that the scrolling action waits for the data to be loaded before executing.
  // Although this solution is considered a hack, it effectively solves the problem. 200ms is chosen as a safe delay value.

  // Using the setState hook was considered, but even when the data is presented (steps 1 and 2), the virtual scroller may not have processed the data yet.
  // Therefore, setTimeout is the only viable solution. Additionally, since there is no need for state management in this case, using useState would be redundant.

  // The empty dependency array [] ensures that this useEffect hook is only executed once, when the component is initially rendered.
  useEffect(() => {
    setTimeout(() => {
      virtualscroller.current?.scrollToIndex(currentArticleIndex, 'smooth');
    }, 200);
  }, []);

  const itemTemplate = (item: any, options: VirtualScrollerTemplateOptions) => {
    return (
      <Link className={`flex flex-row items-center gap-4 py-4 h-[${options.props.itemSize}px] hover:font-bold`} href={`/${item.slug}`}>
        <Tag
          pt={{
            root: {
              className: `text-[#ffffffde]/70 w-[32px] h-[32px] text-base md:text-lg lg:text-xl rounded-full ${
                currentArticleSlug == item.slug
                  ? 'bg-dark-cyan-700/70 border border-solid border-2 border-dark-cyan-700/70'
                  : 'bg-transparent border border-solid border-2 border-dark-cyan-700/70'
              }`,
            },
          }}
          severity='info'
          value={item.index}
         />
        <p
          className={`block text-[#ffffffde]/70 max-w-[15rem] xs:max-w-[23rem] md:max-w-[40rem] truncate text-sm md:text-base lg:text-lg ${
            currentArticleSlug == item.slug ? 'font-bold' : ''
          }`}
        >
          {item.title}
        </p>
      </Link>
    );
  };

  return (
    <nav className='flex flex-col bg-dark-cyan-900 p-4 w-full h-[20rem] rounded-md'>
      <h2 className='text-xl md:text-2xl font-bold text-[#ffffffde]/85'>Series: {currentSeriesTitle}</h2>
      <Divider />
      <VirtualScroller
        itemSize={50}
        itemTemplate={itemTemplate}
        items={items}
        pt={{
          root: { className: 'bg-dark-cyan-900 w-full h-full' },
        }}
        ref={virtualscroller}
        showLoader
      />
    </nav>
  );
};

export default RelatedArticles;
