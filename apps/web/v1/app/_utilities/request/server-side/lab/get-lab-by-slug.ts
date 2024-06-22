import { notFound } from "next/navigation";

const getLabBySlug = async (slug: string): Promise<any> => {
  let res;
  try {
    res = await fetch(
      `${process.env.NEXT_REQUEST_CMS_LABS_URL!}?where[settings.slug][equals]=${slug}`,
      { next: { revalidate: process.env.NODE_ENV === "production" ? 7200 : 0 } }
    );
  } catch (err) {
    throw new Error('Connection Error');
  }

  // Catch errors first, or else json conversion may fail.
  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  if (res.status === 404) {
    notFound();
  }

  if (res.status >= 500) {
    throw new Error('Server Error');
  }

  const content = await res.json();

  // Payload CMS can returns status 200, but with an empty array.
  if (content.docs.length < 1 || !('settings' in content.docs[0])) {
    notFound();
  }

  return content.docs[0];
};

export default getLabBySlug;