import { notFound } from "next/navigation";

const getArticlesWithMinimalResponse = async (): Promise<any> => {
  let res;
  try {
    res = await fetch(
      process.env.NEXT_REQUEST_CMS_ARTICLES_IGNORE_REDUNDANT_FIELDS_URL!
    );
  } catch (err) {
    throw new Error('Connection Error');
  }

  // This endpoint is public, so no need to catch 4xx
  // The endpoint only returns code 500 for catch-all purpose
  // The bigger (>) comparison is for when the server is down, Cloudflare can return 5xx status
  if (res.status >= 500) {
    throw new Error('Server Error');
  }

  const content = await res.json();

  // Payload CMS can returns status 200, but with an empty array.
  if (content.docs.length < 1 || !('settings' in content.docs[0])) {
    notFound();
  }

  return content.docs;
};

export default getArticlesWithMinimalResponse;