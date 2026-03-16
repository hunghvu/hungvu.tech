import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { APIRoute } from 'astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { data } = props;
  const title = data.readerTitle || data.seoTitle || "Hung Vu";
  const desc = data.readerDescription || data.seoDescription || "";
  
  // Read Geist Sans font natively existing in the local dependencies
  const fontPath = path.resolve('./node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff');
  const fontBoldPath = path.resolve('./node_modules/@fontsource/geist-sans/files/geist-sans-latin-700-normal.woff');
  const fontData = await fs.readFile(fontPath);
  const fontBoldData = await fs.readFile(fontBoldPath);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1d232a', // DaisyUI base-300 dark theme approximation
          padding: '40px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#191e24',
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                border: '2px solid #383f47',
                padding: '60px',
              },
              children: [
                {
                  type: 'h1',
                  props: {
                    style: {
                      fontSize: '64px',
                      fontWeight: 700,
                      color: '#ffffff',
                      textAlign: 'center',
                      lineHeight: 1.2,
                      marginBottom: '24px',
                    },
                    children: title,
                  },
                },
                {
                  type: 'p',
                  props: {
                    style: {
                      fontSize: '32px',
                      color: '#a6adbb',
                      textAlign: 'center',
                      lineHeight: 1.4,
                    },
                    children: desc,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Geist',
          data: fontBoldData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });
  
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
