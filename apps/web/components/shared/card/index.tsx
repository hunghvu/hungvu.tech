/**
 * @author Hung Vu
 *
 * Hero section (well, but it is the latest article to be exact).
 */

import React from "react";

import Link from "next/link";
import Image from "next/image";
import CardContent from "./content";

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

const Card: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 rounded-3xl bg-light-orange-200 dark:bg-dark-cyan-800">
      {/* TODO: Implement dynamic content after CMS is finalized. */}
      <Link href={"/"}>
        <Image src="/images/test/cover-image.png" alt="test" width="0" height="0" sizes="100vw" className="w-full rounded-t-3xl" />
      </Link>
      <CardContent
        isHero={false}
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
    </div>
  );
};

export default Card;
