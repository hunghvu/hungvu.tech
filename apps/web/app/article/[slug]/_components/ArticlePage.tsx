import { RichText } from "app/_components/richtext";
const getData = async () => {
  const res = await fetch(`http://localhost:3001/api/articles`, { cache: "no-cache" })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
const ArticlePage: React.FunctionComponent = async () => {
  const data = await getData();
  return (
    <article className="flex flex-col gap-4 w-full md:w-[768px] m-4">
      <RichText nodes={(data.docs[0].body.root.children)} />
    </article>
  )
}

export default ArticlePage;