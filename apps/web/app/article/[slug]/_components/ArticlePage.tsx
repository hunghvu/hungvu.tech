/**
 * @author Hung Vu
 *
 * Article page.
 */
import { RichText } from 'app/_components/richtext';
import { utcToLocal } from 'app/_utilities/parseDate';
import { Divider } from 'primereact/divider';

const ArticlePage: React.FunctionComponent<{ article: any }> = async ({ article }) => {
  const content = article.docs[0];
  console.log(content);
  return (
    <article className='flex flex-col gap-4 w-full md:w-[768px] m-4'>
      <div className='flex flex-row gap-16 text-xs md:text-sm lg:text-base text-[#ffffffde]/60'>
        <time dateTime={content.createdAt}>Published on: {utcToLocal(content.createdAt, 'MMMM DD, YYYY')}</time>
        <time dateTime={content.updatedAt}>Updated at: {utcToLocal(content.updatedAt, 'MMMM DD, YYYY')}</time>
      </div>
      <hgroup className='flex flex-col gap-6 w-full'>
        <h1 className='text-2xl md::text-3xl font-extrabold'>{content.title}</h1>
        <p className='text-xl md::text-2xl font-bold text-[#ffffffde]/70 italic'>{content.subTitle}</p>
      </hgroup>
      <Divider />
      <RichText nodes={content.body.root.children} />
    </article>
  );
};

export default ArticlePage;