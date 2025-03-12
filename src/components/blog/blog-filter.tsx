"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Search, Tag, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  keyword: z.string().optional(),
})

// Sample categories and popular keywords
const categories = [
  "Career Advice",
  "Industry Insights",
  "Job Search",
  "Interview Tips",
  "Workplace Culture",
  "Remote Work",
]

const popularKeywords = [
  "Resume",
  "Interview",
  "Salary Negotiation",
  "Remote Work",
  "Career Change",
  "Leadership",
  "Networking",
  "Work-Life Balance",
]

export function BlogFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")
  const currentKeyword = searchParams.get("keyword")

  const [activeFilters, setActiveFilters] = useState<string[]>([
    ...(currentCategory ? [currentCategory] : []),
    ...(currentKeyword ? [currentKeyword] : []),
  ])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.keyword) return

    const params = new URLSearchParams(searchParams.toString())
    params.set("keyword", values.keyword)

    // Update active filters
    setActiveFilters((prev) => {
      if (currentKeyword) {
        return [...prev.filter((f) => f !== currentKeyword), values.keyword!]
      }
      return [...prev, values.keyword!]
    })

    router.push(`/blog?${params.toString()}`)
    form.reset()
  }

  function handleCategoryClick(category: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (currentCategory === category) {
      params.delete("category")
      setActiveFilters((prev) => prev.filter((f) => f !== category))
    } else {
      params.set("category", category)
      setActiveFilters((prev) => {
        if (currentCategory) {
          return [...prev.filter((f) => f !== currentCategory), category]
        }
        return [...prev, category]
      })
    }

    router.push(`/blog?${params.toString()}`)
  }

  function handleKeywordClick(keyword: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("keyword", keyword)

    // Update active filters
    setActiveFilters((prev) => {
      if (currentKeyword) {
        return [...prev.filter((f) => f !== currentKeyword), keyword]
      }
      return [...prev, keyword]
    })

    router.push(`/blog?${params.toString()}`)
  }

  function clearFilter(filter: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (filter === currentCategory) {
      params.delete("category")
    } else if (filter === currentKeyword) {
      params.delete("keyword")
    }

    setActiveFilters((prev) => prev.filter((f) => f !== filter))
    router.push(`/blog?${params.toString()}`)
  }

  function clearAllFilters() {
    router.push("/blog")
    setActiveFilters([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="keyword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search articles..." className="pl-9" {...field} />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Search
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {activeFilters.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter(filter)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={currentCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Popular Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularKeywords.map((keyword) => (
              <div
                key={keyword}
                className="flex cursor-pointer items-center rounded-md border px-3 py-1 text-sm hover:bg-secondary"
                onClick={() => handleKeywordClick(keyword)}
              >
                <Tag className="mr-1 h-3 w-3" />
                {keyword}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

