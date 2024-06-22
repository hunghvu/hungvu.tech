import { notFound } from "next/navigation";

const getMedia = async (): Promise<any> => {
  let res;
  try {
    res = await fetch(
      `${process.env.NEXT_REQUEST_CMS_MEDIA_URL!}?limit=99999`,
      { next: { revalidate: process.env.NODE_ENV === "production" ? 7200 : 0 } }
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
  if (content.docs.length < 1) {
    notFound();
  }

  return content.docs;
};

export default getMedia;