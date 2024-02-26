/**
 * Author: Hung Vu
 *
 * Lab page.
 */

import Link from 'next/link';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';

const PageLab: React.FunctionComponent<{ content: any }> = ({ content }) => {
  const data = content.map((lab: any) => {
    return {
      id: lab.id,
      title: lab.title,
      description: lab.subTitle,
      slug: `lab/${lab.settings.slug}`,
      tags: lab.settings.tags,
    };
  });
  return (
    <section className='flex flex-col justify-center items-center gap-16'>
      <h1 className='font-bold mb-2 text-2xl md:text-3xl'>Experimental Labs</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 max-w-[1024px] bg-[#00002f]/80 border border-1 border-zinc-500 rounded-md p-4 lg:gap-8'>
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
                  title={<h2 className='line-clamp-2 lg:line-clamp-3 break-words'>{item.title}</h2>}
                >
                  <p className='text-zinc-200 line-clamp-2 lg:line-clamp-3 break-words'>{item.description}</p>
                </Card>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PageLab;
