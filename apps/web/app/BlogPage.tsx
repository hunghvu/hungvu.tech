/**
 * @author Hung Vu
 *
 * Blog page is a page that lists all the articles in a timeline fashion.
 */

'use client';
import Link from 'next/link';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Timeline } from 'primereact/timeline';
import { geist } from 'app/_components/fonts';
import { utcToLocal } from '@utils/parseDate';
import { Divider } from 'primereact/divider';

const BlogPage: React.FunctionComponent<{ content: any }> = ({ content }) => {
  const data = content
    .filter((article: any) => article.settings.hideFromHome === false)
    .map((article: any) => {
      return {
        title: article.title,
        description: article.subTitle,
        date: article.createdAt,
        slug: article.settings.slug,
        tags: article.settings.tags,
      };
    });

  const customizedContent = (item: any) => {
    return (
      <Link href={item.slug}>
        <Card
          header={
            <time className='flex lg:hidden text-[#ffffffde]/60 text-xs md:text-sm lg:text-base' dateTime={item.date}>
              {utcToLocal(item.date, 'MMMM DD, YYYY')}
            </time>
          }
          title={<h2>{item.title}</h2>}
          role='article'
          footer={<div className='lg:hidden'>{customizedOpposite(item)}</div>}
          pt={{
            root: { className: `-mt-4 mb-12 pb-6 bg-transparent hover:bg-dark-cyan-800/20 hover:rounded-2xl ${geist.className}` },
            header: { className: 'px-4 pt-4 lg:px-0 lg:pt-0' },
            body: { className: 'px-4 py-4' },
            title: { className: 'text-lg md:text-xl lg:text-2xl' },
            content: { className: 'text-sm md:text-base lg:text-lg' },
          }}
        >
          <p className='text-[#ffffffde]/80 line-clamp-2'>{item.description}</p>
          <Divider className='hidden lg:flex' />
        </Card>
      </Link>
    );
  };

  const customizedOpposite = (item: any) => {
    return (
      <aside className='flex flex-col lg:items-end gap-4 text-[#ffffffde]/60'>
        <time className='hidden lg:flex text-xs md:text-sm lg:text-base min-w-[120px] lg:min-w-[10rem]' dateTime={item.date}>
          {utcToLocal(item.date, 'MMMM DD, YYYY')}
        </time>

        <div className='flex flex-row lg:flex-row-reverse flex-wrap gap-2'>
          {item.tags.map((tag: any) => (
            <Tag
              key={tag.id}
              value={tag.title}
              severity='info'
              aria-label={`The article ${item.title} belongs to the topic ${tag}.`}
              pt={{
                root: { className: 'py-0 bg-dark-cyan-800 col-span-1' },
                value: { className: `text-xs md:text-sm lg:text-base ${geist.className} text-[#ffffffde]/60` },
              }}
            ></Tag>
          ))}
        </div>
        <Divider className='lg:hidden' />
      </aside>
    );
  };
  return (
    <section className='flex flex-row justify-center items-center w-full'>
      <Timeline
        value={data}
        opposite={customizedOpposite}
        content={customizedContent}
        pt={{
          root: {
            className: `${geist.className} flex flex-col justify-center items-center`,
          },
          event: {
            className: 'w-full lg:w-[1024px]',
          },
          marker: {
            className: 'bg-[#bdbdbd]/40',
          },
          separator: {
            className: 'hidden lg:flex',
          },
          connector: {
            className: 'bg-[#bdbdbd]/20',
          },
          opposite: {
            className: 'hidden lg:flex lg:flex-grow-0',
          },
        }}
      />
    </section>
  );
};

export default BlogPage;