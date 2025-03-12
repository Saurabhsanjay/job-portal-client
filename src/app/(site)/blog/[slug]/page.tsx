import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Calendar, User, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getBlogPost, getRelatedPosts } from "@/lib/blog"
import { ShareButtons } from "@/components/blog/share-buttons"
import { RelatedPosts } from "@/components/blog/related-posts"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: `${post.title} | Job Portal Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.category)

  return (
    <div className="flex justify-center bg-gradient-to-br from-blue-100 via-white to-purple-50">
    <div className="container py-10">
      <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to all posts
      </Link>

      <article className="mx-auto mt-6 max-w-3xl">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{post.category}</Badge>
            {post.keywords.map((keyword) => (
              <Badge key={keyword} variant="outline">
                {keyword}
              </Badge>
            ))}
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">{post.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {post.date}
            </div>
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {post.readingTime} min read
            </div>
          </div>
        </div>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="prose prose-gray max-w-none dark:prose-invert">
          {/* Blog content would be rendered here */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium">Tags:</span>
            {post.keywords.map((keyword) => (
              <Link key={keyword} href={`/blog?keyword=${keyword}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  {keyword}
                </Badge>
              </Link>
            ))}
          </div>

          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
          <RelatedPosts posts={relatedPosts} />
        </div>
      )}
    </div>
    </div>
  )
}

