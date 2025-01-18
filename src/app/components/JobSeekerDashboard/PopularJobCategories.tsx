'use client'

import { Card } from "@/components/ui/card"
import { Wallet, Megaphone, PenTool, Code2, Users2, UserCog, HeadphonesIcon, Stethoscope, Car } from 'lucide-react'

type JobCategory = {
  id: number
  title: string
  icon: React.ComponentType<{ className?: string }>
  openPositions: number
}

const categories: JobCategory[] = [
  {
    id: 1,
    title: "Accounting / Finance",
    icon: Wallet,
    openPositions: 1
  },
  {
    id: 2,
    title: "Marketing",
    icon: Megaphone,
    openPositions: 5
  },
  {
    id: 3,
    title: "Design",
    icon: PenTool,
    openPositions: 7
  },
  {
    id: 4,
    title: "Development",
    icon: Code2,
    openPositions: 6
  },
  {
    id: 5,
    title: "Human Resource",
    icon: Users2,
    openPositions: 0
  },
  {
    id: 6,
    title: "Project Management",
    icon: UserCog,
    openPositions: 1
  },
  {
    id: 7,
    title: "Customer Service",
    icon: HeadphonesIcon,
    openPositions: 4
  },
  {
    id: 8,
    title: "Health and Care",
    icon: Stethoscope,
    openPositions: 3
  },
  {
    id: 9,
    title: "Automotive Jobs",
    icon: Car,
    openPositions: 1
  }
]

export default function JobCategories() {
  return (
    <div className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-10 space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold">Popular Job Categories</h2>
          <p className="text-muted-foreground">
            2020 jobs live — 293 added today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="p-6 border border-gray-100 hover:border-gray-200 transition-colors shadow-none group cursor-pointer hover:shadow-md"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-500 transition-colors">
                    <category.icon className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    ({category.openPositions} open position{category.openPositions !== 1 ? 's' : ''})
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

