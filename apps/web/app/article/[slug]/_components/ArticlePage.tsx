import { LexicalToHtml } from "../../../_utilities/lexicalSerializer/LexicalToHtml";
const getData = async () => {
  const res = await fetch(`http://localhost:3001/api/articles`, {cache: "no-cache"})
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
const ArticlePage: React.FunctionComponent = async () => {
  const data = await getData();
  return <section>
    <article className="flex flex-col gap-4">
      <LexicalToHtml nodes={(data.docs[0].body.root.children as any)} />
    </article>
  </section>
}

export default ArticlePage;