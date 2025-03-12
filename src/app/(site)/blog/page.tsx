import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getBlogPosts } from "@/lib/blog"
import { BlogFilter } from "@/components/blog/blog-filter"
import { BlogCard } from "@/components/blog/blog-card"

export const metadata: Metadata = {
  title: "Blog | Job Portal",
  description: "Explore career advice, industry insights, and job search tips",
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get category and keyword filters from URL
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined
  const keyword = typeof searchParams.keyword === "string" ? searchParams.keyword : undefined

  // Fetch blog posts with optional filters
  const posts = await getBlogPosts({ category, keyword })

  return (
    <div className="flex justify-center bg-gradient-to-br from-blue-100 via-white to-purple-50">
        <div className="container py-10">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Insights</h1>
          <p className="mt-2 text-muted-foreground">
            Expert advice and insights to help you navigate your career journey
          </p>
        </div>
        <Link href="/blog/subscribe">
          <Button>Subscribe to Newsletter</Button>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <BlogFilter />
        </div>

        <div className="lg:col-span-3">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No blog posts found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your filters or check back later for new content.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

