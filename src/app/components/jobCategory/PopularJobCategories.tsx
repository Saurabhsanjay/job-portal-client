import { Card, CardContent } from "@/components/ui/card";
import {
  Code,
  Briefcase,
  LineChart,
  Palette,
  Stethoscope,
  GraduationCap,
  Building2,
  ShoppingBag,
} from "lucide-react";

interface JobCategory {
  icon: React.ReactNode;
  title: string;
  openings: number;
}

const jobCategories: JobCategory[] = [
  { icon: <Code className="h-8 w-8" />, title: "Technology", openings: 1500 },
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: "Business",
    openings: 1200,
  },
  { icon: <LineChart className="h-8 w-8" />, title: "Finance", openings: 900 },
  { icon: <Palette className="h-8 w-8" />, title: "Design", openings: 750 },
  {
    icon: <Stethoscope className="h-8 w-8" />,
    title: "Healthcare",
    openings: 1100,
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Education",
    openings: 800,
  },
  {
    icon: <Building2 className="h-8 w-8" />,
    title: "Real Estate",
    openings: 600,
  },
  { icon: <ShoppingBag className="h-8 w-8" />, title: "Retail", openings: 950 },
];

const PopularJobCategories = () => {
  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-800">
            Popular Job Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jobCategories.map((category, index) => (
              <div key={index}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-orange-100 p-3 rounded-full">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-orange-800">
                          {category.title}
                        </h3>
                        <p className="text-orange-600">
                          {category.openings} openings
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularJobCategories;
