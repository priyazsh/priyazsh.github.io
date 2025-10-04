import type { Metadata } from "next";
import { 
  containerStyles,
  BackButton,
  textStyles,
  Footer
} from '../components/ui';
import BlogPostCard from '../components/BlogPostCard';
import { getAllPosts } from '../../lib/posts';
import { generateBlogJsonLd, generateBreadcrumbJsonLd } from '../../lib/structured-data';

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on development, technology, and my journey as a self-taught programmer. Discover insights, tutorials, and experiences from my coding journey.",
  keywords: ["Blog", "Programming", "Web Development", "Self-taught Developer", "Technology", "Coding Journey", "Tutorials"],
  openGraph: {
    title: 'Blog - Priyansh Prajapat',
    description: 'Read my thoughts on development, technology, and my journey as a self-taught programmer. Discover insights, tutorials, and experiences from my coding journey.',
    url: 'https://oyepriyansh.github.io/blog',
    type: 'website',
    images: [
      {
        url: '/oyepriyansh.webp',
        width: 1200,
        height: 630,
        alt: 'Priyansh Prajapat Blog',
      }
    ],
  },
  twitter: {
    title: 'Blog - Priyansh Prajapat',
    description: 'Read my thoughts on development, technology, and my journey as a self-taught programmer.',
  },
};

export default async function Blog() {
  const posts = getAllPosts();
  const blogJsonLd = generateBlogJsonLd();
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: 'https://oyepriyansh.github.io' },
    { name: 'Blog', url: 'https://oyepriyansh.github.io/blog' }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className={containerStyles.main}>
      <div className="mx-auto max-w-3xl px-4 mt-10 text-white">
        <div className="flex items-center justify-between mb-6">
          <BackButton href="/" text="Back to Portfolio" />
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center">
            <span className="text-gray-400 mr-2 font-normal">~/</span>Blog
          </h1>
          
          {/* <p className={`${textStyles.description} mb-6`}>
            Thoughts on development, technology, and my journey as a self-taught programmer.
          </p> */}
        </div>

        <div className="flex flex-col gap-6">
          {posts.map((post, index) => (
            <BlogPostCard 
              key={post.slug}
              id={index + 1}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readTime={post.readTime}
              tags={post.tags}
              slug={post.slug}
            />
          ))}
        </div>

        {/* {posts.length === 0 && (
          <div className={`${containerStyles.card} p-8 text-center`}>
            <h3 className="text-xl font-medium mb-2">
              Coming Soon
            </h3>
            <p className={`${textStyles.paragraph}`}>
              I'm working on some exciting blog posts. Check back soon!
            </p>
          </div>
        )} */}

        <footer className="mt-12 pt-6 border-t border-white/10 text-center">
          <Footer />
        </footer>
      </div>
    </div>
    </>
  );
}