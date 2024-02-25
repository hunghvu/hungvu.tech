import { notFound } from "next/navigation";
import type { DataTableStateEvent } from "primereact/datatable";

const getOpenwrtTohLazy = async (event: DataTableStateEvent): Promise<any> => {
  let res;
  try {
    res = await fetch(
      process.env.NEXT_PUBLIC_API_OPENWRT_TOH_FILTER!,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
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
  return content;
};

export default getOpenwrtTohLazy;