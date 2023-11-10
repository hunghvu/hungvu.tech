/**
 * @author Hung Vu
 * 
 * Blog page is a page that lists all the articles in a timeline fashion.
 */

"use client"
import Link from "next/link";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ScrollPanel } from "primereact/scrollpanel";
import { Tag } from "primereact/tag";
import { Timeline } from "primereact/timeline";
import { geistMono } from "./fonts";

const BlogPage: React.FunctionComponent = () => {
  const data = [
    {
      title: "Homelab", description: `This is my homelab This is my homelab This is my homelab This is my homelab This is my homelab This is my homelab This is my homelab This is my homelab
    This is my homelab This is my homelab This is my homelab This is my homelab This is my homelab This is my homelab This is my homelab This is my homelab`, date: "2021-10-15", url: "/homelab", tags: ["homelab", "personal", "hobbies"]
    },
    { title: "Blog", description: "This is my blog", date: "2021-10-15", url: "/blog", tags: ["blogging", "writing", "personal"] },
    { title: "About", description: "This is my about page", date: "2021-10-15", url: "/about", tags: ["about", "personal", "bio"] },
    { title: "Contact", description: "This is my contact page", date: "2021-10-15", url: "/contact", tags: ["contact", "personal", "email"] },
    { title: "Projects", description: "This is my projects page", date: "2021-10-15", url: "/projects", tags: ["projects", "coding", "portfolio"] },
    { title: "Resume", description: "This is my resume page", date: "2021-10-15", url: "/resume", tags: ["resume", "career", "job"] },
    { title: "Timeline", description: "This is my timeline page", date: "2021-10-15", url: "/timeline", tags: ["timeline", "personal", "history"] },
    { title: "404", description: "This is my 404 page", date: "2021-10-15", url: "/404", tags: ["404", "error", "web"] },
    { title: "500", description: "This is my 500 page", date: "2021-10-15", url: "/500", tags: ["500", "error", "web"] },
    { title: "Login", description: "This is my login page", date: "2021-10-15", url: "/login", tags: ["login", "security", "web"] },
    { title: "Register", description: "This is my register page", date: "2021-10-15", url: "/register", tags: ["register", "security", "web"] },
    { title: "Forgot Password", description: "This is my forgot password page", date: "2021-10-15", url: "/forgot-password", tags: ["forgot password", "security", "web"] },
    { title: "Reset Password", description: "This is my reset password page", date: "2021-10-15", url: "/reset-password", tags: ["reset password", "security", "web"] },
    { title: "Verify Email", description: "This is my verify email page", date: "2021-10-15", url: "/verify-email", tags: ["verify email", "security", "web"] },
    { title: "Verify Email Sent", description: "This is my verify email sent page", date: "2021-10-15", url: "/verify-email-sent", tags: ["verify email", "security", "web"] },
    { title: "Verify Email Error", description: "This is my verify email error page", date: "2021-10-15", url: "/verify", tags: ["verify email", "security", "web"] },
  ];

  const customizedContent = (item: any) => {
    return (
      <Link href={item.url}>
        <Card title={<h2>{item.title}</h2>}
          role="article"
          footer={
            <Button
              link
              size="small"
              aria-label={`View blog article ${item.title} now.`}
              pt={{
                root: { className: `p-0 ${geistMono.className}` }
              }}
            >View blog article</Button>}
          pt={{
            root: { className: `-mt-4 mb-12 pb-6 bg-transparent shadow-none hover:bg-dark-cyan-800/20 hover:shadow-sm hover:rounded-2xl ${geistMono.className}` },
            body: { className: "px-4 py-4" },
            title: { className: "text-lg md:text-xl lg:text-2xl" },
            content: { className: "text-sm md:text-base lg:text-lg" },
            footer: { className: "pt-0" }
          }}>
          <p>{item.description}</p>
        </Card>
      </Link>

    );
  };

  const customizedOpposite = (item: any) => {
    return (
      <aside className="flex flex-col items-end gap-2">
        {/* TODO: Use proper time format from the API */}
        <time className="text-xs md:text-sm lg:text-base w-[20vw]" dateTime={item.date}>{item.date}</time>

        {/* TODO: Use db id as key instead */}
        {item.tags.map((tag: string) => <Tag key={tag} value={tag}
          severity="info" role="tag" aria-label={`The article ${item.title} belongs to the topic ${tag}.`}
          pt={{
            root: { className: "max-w-[20vw]" },
            value: { className: `text-xs md:text-sm lg:text-base ${geistMono.className}`}
          }}></Tag>)}
      </aside>
    )
  }
  return (
    <section className="flex flex-row">
      <ScrollPanel pt={{
        root: { className: "max-w-[1024px] lg:w-[1024px] h-[80vh]" }
      }}>
        <Timeline value={data} opposite={customizedOpposite} content={customizedContent} pt={{
          root: {
            className: geistMono.className
          },
          marker: {
            className: "bg-[#bdbdbd]/40"
          },
          connector: {
            className: "bg-[#bdbdbd]/20"
          },
          opposite: {
            className: "flex grow-0 sm:text-sm md:text-base lg:text-lg",
          },
          content: {
            className: "flex grow",
          }
        }} />
      </ScrollPanel>

    </section>
  )
}

export default BlogPage;