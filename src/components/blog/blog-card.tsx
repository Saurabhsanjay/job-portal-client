import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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

interface BlogCardProps {
  post: BlogPost
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className={cn("h-full overflow-hidden transition-all hover:shadow-md", className)}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <Badge>{post.category}</Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="line-clamp-2 text-xl font-semibold">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-5 pt-4">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            {post.date}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {post.readingTime} min read
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

