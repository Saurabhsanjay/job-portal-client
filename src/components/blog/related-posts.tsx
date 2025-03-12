import { BlogCard } from "./blog-card"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  author: string
  readingTime: number
  category: string
  keywords: string[]
}

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

