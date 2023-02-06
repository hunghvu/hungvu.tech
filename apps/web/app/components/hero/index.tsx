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
    <section>
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
