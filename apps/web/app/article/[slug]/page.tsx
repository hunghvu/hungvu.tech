import ArticlePage from "./_components/ArticlePage";

const getArticle = async (slug: string) => {
  const res = await fetch(`${process.env.PAYLOAD_SERVER_ARTICLES_URL!}?where[settings.urlSlug][equals]=${slug}`)
  console.log(slug)
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}



export default async function Page({ params, searchParams }: { params: any, searchParams: any }) {
  const article = await getArticle(params.slug)
  return <ArticlePage article={article}/>
}
