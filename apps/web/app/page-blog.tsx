/**
 * Author: Hung Vu
 *
 * Blog page.
 */

import Link from 'next/link';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { utcToLocal } from '@utils/parse-date';

const BlogPage: React.FunctionComponent<{ content: any }> = ({ content }) => {
  const data = content
    .filter((article: any) => article.settings.hideFromHome === false)
    .map((article: any) => {
      return {
        id: article.id,
        title: article.title,
        description: article.subTitle,
        date: 'customizedCreatedAt' in article.settings ? article.settings.customizedCreatedAt : article.createdAt,
        slug: article.settings.slug,
        tags: article.settings.tags,
      };
    });

  return (
    <>
      <h1 className='font-bold mb-2 text-2xl md:text-3xl'>Latest Articles</h1>
      <section className='grid grid-cols-1 lg:grid-cols-2 max-w-[1024px] bg-[#00002f]/80 border border-1 border-zinc-500 rounded-md p-4 lg:gap-8'>
        {data.map((item: any) => {
          return (
            <Link href={item.slug} key={item.id}>
              <article>
                <Card
                  footer={
                    <aside className='flex flex-col gap-4'>
                      <div className='flex flex-row flex-wrap gap-2'>
                        {item.tags.map((tag: any) => (
                          <Tag aria-label={`The article ${item.title} belongs to the topic ${tag}.`} key={tag.id} value={tag.title} />
                        ))}
                      </div>
                      <Divider />
                    </aside>
                  }
                  header={
                    <time className='text-zinc-300 text-sm md:text-base pl-5' dateTime={item.date}>
                      {utcToLocal(item.date as string, 'MMM DD, YYYY')}
                    </time>
                  }
                  title={<h2 className='line-clamp-2 lg:line-clamp-3 break-words'>{item.title}</h2>}
                >
                  <p className='text-zinc-200 line-clamp-2 lg:line-clamp-3 break-words'>{item.description}</p>
                </Card>
              </article>
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default BlogPage;
