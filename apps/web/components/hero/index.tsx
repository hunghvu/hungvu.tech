/**
 * @author Hung Vu
 *
 * Hero section (well, but it is the latest article to be exact).
 */

import React from "react";

import Link from "next/link";
import Image from "next/image";

import CardContent from "../shared/card-content";

// Temporary value for testing purpose
const category = {
  name: "Tutorial",
  url: "categories/tutorial",
};

const tags = [
  {
    name: "wordpress",
    url: "tags/wordpress",
  },
  {
    name: "security",
    url: "tags/security",
  },
  {
    name: "login",
    url: "tags/login",
  },
];

const Hero: React.FC = () => {
  return (
    <section className="flex lg:flex-row-reverse flex-col justify-center items-center xl:gap-32 gap-4 sm:p-16 p-4 bg-light-orange-200 dark:bg-dark-cyan-800">
      {/* TODO: Implement dynamic content after CMS is finalized. */}
      <Link href={"/"}>
        <Image src="/images/test/cover-image.png" alt="test" width="0" height="0" sizes="100vw" className="max-w-[39.375rem] w-full rounded-3xl" />
      </Link>
      <CardContent
        isHero={true}
        slug="cloudflare-turnstile-and-wordfence-2fa-break-wordpress-login-flow-how-to-fix-it"
        category={category}
        title={"Cloudflare Turnstile and Wordfence 2FA break WordPress login flow, how to fix it?"}
        subtitle={
          "Cloudflare Turnstile and Wordfence 2FA should improve WP security but at the potential cost of locking you out of the admin dashboard."
        }
        authorName={"Hung Vu"}
        date={"2023-01-23"}
        tags={tags}
      />
    </section>
  );
};

export default Hero;
