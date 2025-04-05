"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Briefcase,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  Building,
  ChevronRight,
  Download,
  Filter,
  Search,
  Share2,
  Star,
  ThumbsUp,
  ArrowUpRight,
  MessageSquare,
  BarChart2,
  PieChartIcon,
  LineChartIcon,
  RefreshCw,
  Info,
  Zap,
  Lightbulb,
  UserPlus,
  ExternalLink,
  Clock,
  GraduationCap,
} from "lucide-react"

// Sample data for trending job roles
const trendingJobRoles = [
  {
    id: 1,
    title: "Data Scientist",
    growth: 35,
    avgSalary: "$120,000",
    demandLevel: "Very High",
    requiredSkills: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistics"],
    companies: ["Google", "Microsoft", "Amazon", "Meta", "IBM"],
    industryTrend: [65, 70, 78, 82, 90],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    growth: 28,
    avgSalary: "$105,000",
    demandLevel: "High",
    requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB", "AWS"],
    companies: ["Shopify", "Stripe", "Airbnb", "Netflix", "Uber"],
    industryTrend: [72, 75, 79, 83, 88],
  },
  {
    id: 3,
    title: "Cloud Architect",
    growth: 32,
    avgSalary: "$135,000",
    demandLevel: "Very High",
    requiredSkills: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform"],
    companies: ["Amazon", "Microsoft", "Google", "IBM", "Oracle"],
    industryTrend: [68, 73, 80, 85, 92],
  },
  {
    id: 4,
    title: "Cybersecurity Analyst",
    growth: 30,
    avgSalary: "$110,000",
    demandLevel: "High",
    requiredSkills: ["Network Security", "Ethical Hacking", "SIEM", "Risk Assessment", "Compliance"],
    companies: ["Cisco", "Palo Alto Networks", "CrowdStrike", "FireEye", "Fortinet"],
    industryTrend: [70, 75, 82, 87, 91],
  },
  {
    id: 5,
    title: "AI/ML Engineer",
    growth: 40,
    avgSalary: "$130,000",
    demandLevel: "Very High",
    requiredSkills: ["TensorFlow", "PyTorch", "Deep Learning", "NLP", "Computer Vision"],
    companies: ["Google", "OpenAI", "NVIDIA", "Microsoft", "Meta"],
    industryTrend: [75, 82, 88, 92, 97],
  },
]

// Sample data for in-demand skills
const inDemandSkills = [
  { name: "Machine Learning", category: "Data Science", growth: 42, demandScore: 95 },
  { name: "Cloud Computing", category: "Infrastructure", growth: 38, demandScore: 92 },
  { name: "React.js", category: "Frontend", growth: 35, demandScore: 90 },
  { name: "Cybersecurity", category: "Security", growth: 40, demandScore: 94 },
  { name: "DevOps", category: "Operations", growth: 36, demandScore: 91 },
  { name: "Data Analytics", category: "Data Science", growth: 33, demandScore: 89 },
  { name: "Artificial Intelligence", category: "Data Science", growth: 45, demandScore: 96 },
  { name: "Node.js", category: "Backend", growth: 30, demandScore: 87 },
  { name: "UI/UX Design", category: "Design", growth: 28, demandScore: 85 },
  { name: "Blockchain", category: "Emerging Tech", growth: 25, demandScore: 82 },
]

// Sample data for alumni success stories
const alumniSuccessStories = [
  {
    id: 1,
    name: "Sarah Johnson",
    graduationYear: 2018,
    degree: "B.Tech in Computer Science",
    currentRole: "Senior Data Scientist",
    company: "Google",
    photo: "/placeholder.svg?height=150&width=150",
    story:
      "Sarah joined Google after graduation and quickly rose through the ranks. She led a team that developed a machine learning algorithm that improved search results by 15%, impacting millions of users worldwide.",
    achievements: ["Google Impact Award 2021", "Published 3 research papers", "Speaker at Google I/O 2022"],
    careerPath: ["Junior Data Analyst at IBM", "Data Scientist at Amazon", "Senior Data Scientist at Google"],
    advice:
      "Focus on building a strong foundation in mathematics and statistics. Real-world projects matter more than grades.",
    skills: ["Python", "TensorFlow", "Data Analysis", "Machine Learning", "Leadership"],
  },
  {
    id: 2,
    name: "Michael Chen",
    graduationYear: 2019,
    degree: "B.Tech in Electronics",
    currentRole: "Product Manager",
    company: "Microsoft",
    photo: "/placeholder.svg?height=150&width=150",
    story:
      "Michael started as a hardware engineer but transitioned to product management after identifying a market gap. He now leads Microsoft's IoT product division, managing a portfolio worth $200M annually.",
    achievements: ["Microsoft MVP 2022", "Led 5 successful product launches", "Filed 2 patents"],
    careerPath: ["Hardware Engineer at Intel", "Technical Product Manager at Cisco", "Product Manager at Microsoft"],
    advice:
      "Don't be afraid to pivot your career if you discover new interests. Technical knowledge combined with business acumen is incredibly valuable.",
    skills: ["Product Strategy", "Technical Leadership", "Market Analysis", "IoT", "Team Management"],
  },
  {
    id: 3,
    name: "Priya Patel",
    graduationYear: 2017,
    degree: "M.Tech in AI",
    currentRole: "AI Research Lead",
    company: "OpenAI",
    photo: "/placeholder.svg?height=150&width=150",
    story:
      "Priya's thesis on neural network optimization caught the attention of OpenAI recruiters. She now leads a research team working on next-generation language models that power various AI applications.",
    achievements: ["Published in Nature", "NeurIPS Best Paper Award", "TEDx speaker on AI ethics"],
    careerPath: ["Research Assistant at University", "AI Researcher at DeepMind", "AI Research Lead at OpenAI"],
    advice:
      "Pursue research areas you're genuinely curious about. Breakthrough innovations come from asking questions others haven't thought to ask.",
    skills: ["Deep Learning", "Research Methodology", "Neural Networks", "NLP", "AI Ethics"],
  },
  {
    id: 4,
    name: "James Wilson",
    graduationYear: 2016,
    degree: "MBA with Tech Specialization",
    currentRole: "Founder & CEO",
    company: "CloudSecure",
    photo: "/placeholder.svg?height=150&width=150",
    story:
      "James identified a gap in cloud security solutions for mid-sized businesses. He founded CloudSecure, which was recently valued at $50M and serves over 500 companies globally.",
    achievements: ["Forbes 30 Under 30", "Raised $12M in Series A", "EY Entrepreneur of the Year Finalist"],
    careerPath: ["Management Consultant at McKinsey", "Product Manager at AWS", "Founder & CEO at CloudSecure"],
    advice:
      "Entrepreneurship is about solving real problems. Spend time understanding customer pain points before building solutions.",
    skills: ["Strategic Planning", "Fundraising", "Cloud Security", "Leadership", "Business Development"],
  },
]

// Sample data for company feedback
const companyFeedback = [
  {
    id: 1,
    company: "Microsoft",
    logo: "/placeholder.svg?height=40&width=40",
    overallRating: 4.8,
    strengths: ["Technical knowledge", "Problem-solving abilities", "Adaptability"],
    areasForImprovement: ["Communication skills", "Project management experience"],
    skillGaps: [
      { skill: "Cloud Architecture", importance: 9, studentProficiency: 7 },
      { skill: "DevOps Practices", importance: 8, studentProficiency: 5 },
      { skill: "Agile Methodologies", importance: 8, studentProficiency: 6 },
    ],
    testimonial:
      "The graduates from your institution demonstrate exceptional technical skills and problem-solving abilities. We would recommend strengthening their exposure to real-world project management scenarios.",
    recruiter: "Jennifer Smith, Technical Recruiting Manager",
    hireRate: 85,
    retentionRate: 92,
  },
  {
    id: 2,
    company: "Amazon",
    logo: "/placeholder.svg?height=40&width=40",
    overallRating: 4.6,
    strengths: ["Algorithmic thinking", "Data structures knowledge", "Learning agility"],
    areasForImprovement: ["System design experience", "Practical implementation skills"],
    skillGaps: [
      { skill: "Distributed Systems", importance: 9, studentProficiency: 6 },
      { skill: "Microservices Architecture", importance: 8, studentProficiency: 5 },
      { skill: "Performance Optimization", importance: 7, studentProficiency: 6 },
    ],
    testimonial:
      "We value the strong theoretical foundation your students possess. To better prepare them for our roles, more hands-on experience with large-scale system design would be beneficial.",
    recruiter: "David Johnson, University Relations Lead",
    hireRate: 78,
    retentionRate: 88,
  },
  {
    id: 3,
    company: "IBM",
    logo: "/placeholder.svg?height=40&width=40",
    overallRating: 4.5,
    strengths: ["AI/ML knowledge", "Research aptitude", "Collaborative skills"],
    areasForImprovement: ["Business acumen", "Client interaction experience"],
    skillGaps: [
      { skill: "Enterprise Architecture", importance: 8, studentProficiency: 5 },
      { skill: "Business Process Modeling", importance: 7, studentProficiency: 4 },
      { skill: "Data Governance", importance: 8, studentProficiency: 6 },
    ],
    testimonial:
      "Your graduates excel in technical domains, particularly in AI and machine learning. We recommend incorporating more business context into technical courses to help them understand enterprise needs better.",
    recruiter: "Michael Brown, Global Talent Acquisition Director",
    hireRate: 75,
    retentionRate: 90,
  },
  {
    id: 4,
    company: "Google",
    logo: "/placeholder.svg?height=40&width=40",
    overallRating: 4.9,
    strengths: ["Coding excellence", "Innovation mindset", "Technical depth"],
    areasForImprovement: ["Cross-functional collaboration", "Product thinking"],
    skillGaps: [
      { skill: "Large-Scale Systems", importance: 9, studentProficiency: 7 },
      { skill: "UX Sensibility", importance: 8, studentProficiency: 5 },
      { skill: "Technical Communication", importance: 9, studentProficiency: 6 },
    ],
    testimonial:
      "We're consistently impressed by the technical capabilities of your graduates. To excel at Google, we recommend more emphasis on how technical decisions impact user experience and product outcomes.",
    recruiter: "Sarah Lee, University Outreach Manager",
    hireRate: 82,
    retentionRate: 94,
  },
]

// Sample data for industry sectors
const industrySectors = [
  { name: "Technology", growth: 28, avgSalary: "$110,000", topEmployers: ["Google", "Microsoft", "Amazon"] },
  { name: "Finance", growth: 15, avgSalary: "$95,000", topEmployers: ["JPMorgan", "Goldman Sachs", "Morgan Stanley"] },
  {
    name: "Healthcare",
    growth: 22,
    avgSalary: "$90,000",
    topEmployers: ["Johnson & Johnson", "UnitedHealth", "Pfizer"],
  },
  { name: "Manufacturing", growth: 10, avgSalary: "$85,000", topEmployers: ["GE", "Boeing", "Siemens"] },
  { name: "Retail", growth: 12, avgSalary: "$80,000", topEmployers: ["Amazon", "Walmart", "Target"] },
]

// Sample data for skill gap analysis
const skillGapData = [
  { name: "Cloud Computing", industry: 9, student: 6 },
  { name: "Data Science", industry: 8, student: 7 },
  { name: "Cybersecurity", industry: 9, student: 5 },
  { name: "DevOps", industry: 8, student: 4 },
  { name: "AI/ML", industry: 9, student: 7 },
  { name: "Blockchain", industry: 7, student: 3 },
  { name: "UI/UX", industry: 8, student: 5 },
]

// Sample data for curriculum recommendations
const curriculumRecommendations = [
  {
    id: 1,
    area: "Cloud Computing",
    currentCoverage: "Basic AWS concepts and simple deployments",
    recommendedEnhancement:
      "Add hands-on labs for multi-cloud environments (AWS, Azure, GCP) and infrastructure-as-code practices",
    industryAlignment: 85,
    priority: "High",
    resources: ["AWS Educate", "Microsoft Azure for Education", "Google Cloud Academic Program"],
  },
  {
    id: 2,
    area: "DevOps Practices",
    currentCoverage: "Introduction to CI/CD concepts",
    recommendedEnhancement:
      "Implement practical CI/CD pipelines using GitHub Actions, Jenkins, or GitLab CI with real-world scenarios",
    industryAlignment: 70,
    priority: "High",
    resources: ["GitHub Education", "GitLab for Education", "Jenkins Tutorials"],
  },
  {
    id: 3,
    area: "Cybersecurity",
    currentCoverage: "Basic security principles and concepts",
    recommendedEnhancement:
      "Add practical security labs, vulnerability assessment exercises, and secure coding practices",
    industryAlignment: 65,
    priority: "Medium",
    resources: ["Cybersecurity Lab Simulations", "OWASP Resources", "HackTheBox Academic"],
  },
]

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export default function JobMarketIntegration() {
  const [selectedJobRole, setSelectedJobRole] = useState(trendingJobRoles[0])
  const [selectedAlumni, setSelectedAlumni] = useState(alumniSuccessStories[0])
  const [selectedCompany, setSelectedCompany] = useState(companyFeedback[0])
  const [timeframe, setTimeframe] = useState("6months")
  const [sector, setSector] = useState("all")
  const [view, setView] = useState("grid")

  return (
    <div className="container mx-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Market Integration</h1>
            <p className="text-muted-foreground">
              Connect your institution with industry trends, alumni success, and company feedback
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">Last 1 year</SelectItem>
                <SelectItem value="2years">Last 2 years</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sector} onValueChange={setSector}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="trending-jobs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trending-jobs">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending Job Roles
            </TabsTrigger>
            <TabsTrigger value="alumni-success">
              <Award className="mr-2 h-4 w-4" />
              Alumni Success Stories
            </TabsTrigger>
            <TabsTrigger value="company-feedback">
              <Building className="mr-2 h-4 w-4" />
              Company Feedback Integration
            </TabsTrigger>
          </TabsList>

          {/* Trending Job Roles Tab */}
          <TabsContent value="trending-jobs" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Market Overview Card */}
              <Card className="col-span-1 md:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Market Overview</CardTitle>
                    <CardDescription>Current job market trends and opportunities</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    {/* Market Stats */}
                    <div className="col-span-1 space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-muted-foreground">Top Growing Sectors</div>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="mt-3 space-y-2">
                          {industrySectors.slice(0, 3).map((sector, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className="mr-2 h-2 w-2 rounded-full"
                                  style={{ backgroundColor: COLORS[index] }}
                                ></div>
                                <span className="text-sm">{sector.name}</span>
                              </div>
                              <div className="flex items-center">
                                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                <span className="text-sm font-medium">{sector.growth}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-muted-foreground">Average Salary Trends</div>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="mt-3 space-y-2">
                          {industrySectors.slice(0, 3).map((sector, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className="mr-2 h-2 w-2 rounded-full"
                                  style={{ backgroundColor: COLORS[index] }}
                                ></div>
                                <span className="text-sm">{sector.name}</span>
                              </div>
                              <span className="text-sm font-medium">{sector.avgSalary}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Industry Growth Chart */}
                    <div className="col-span-1 md:col-span-3">
                      <div className="rounded-lg border p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">Industry Growth Trends</h3>
                            <p className="text-xs text-muted-foreground">Year-over-year growth by industry sector</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-xs">
                              <BarChart2 className="h-3 w-3" />
                              Bar
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-xs">
                              <LineChartIcon className="h-3 w-3" />
                              Line
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-xs">
                              <PieChartIcon className="h-3 w-3" />
                              Pie
                            </Button>
                          </div>
                        </div>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={industrySectors} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis label={{ value: "Growth (%)", angle: -90, position: "insideLeft" }} />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="growth" name="Growth %" fill="#4ade80" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top In-Demand Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Top In-Demand Skills</CardTitle>
                  <CardDescription>Skills with highest market demand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inDemandSkills.slice(0, 5).map((skill, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Zap className="mr-2 h-4 w-4 text-amber-500" />
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <Badge variant={skill.growth > 35 ? "default" : "secondary"}>
                            <TrendingUp className="mr-1 h-3 w-3" />
                            {skill.growth}%
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="mr-2">{skill.category}</span>
                          <span>•</span>
                          <span className="ml-2">Demand Score: {skill.demandScore}/100</span>
                        </div>
                        <Progress value={skill.demandScore} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline" size="sm">
                      View All Skills
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trending Job Roles */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Trending Job Roles</CardTitle>
                      <CardDescription>Fastest growing positions in the market</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={view === "grid" ? "bg-muted" : ""}
                        onClick={() => setView("grid")}
                      >
                        <BarChart2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={view === "list" ? "bg-muted" : ""}
                        onClick={() => setView("list")}
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {view === "grid" ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {trendingJobRoles.slice(0, 4).map((role) => (
                        <div
                          key={role.id}
                          className="cursor-pointer rounded-lg border p-4 transition-all hover:border-green-500 hover:shadow-md"
                          onClick={() => setSelectedJobRole(role)}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{role.title}</h3>
                            <Badge variant="outline" className="bg-green-50">
                              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                              {role.growth}%
                            </Badge>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center justify-between">
                              <span>Avg. Salary:</span>
                              <span className="font-medium text-foreground">{role.avgSalary}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Demand:</span>
                              <span className="font-medium text-foreground">{role.demandLevel}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="text-xs font-medium text-muted-foreground">Top Skills</div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {role.requiredSkills.slice(0, 3).map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {role.requiredSkills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{role.requiredSkills.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Job Role</TableHead>
                          <TableHead>Growth</TableHead>
                          <TableHead>Avg. Salary</TableHead>
                          <TableHead>Demand</TableHead>
                          <TableHead>Top Skills</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {trendingJobRoles.map((role) => (
                          <TableRow
                            key={role.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setSelectedJobRole(role)}
                          >
                            <TableCell className="font-medium">{role.title}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-50">
                                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                {role.growth}%
                              </Badge>
                            </TableCell>
                            <TableCell>{role.avgSalary}</TableCell>
                            <TableCell>{role.demandLevel}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {role.requiredSkills.slice(0, 2).map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {role.requiredSkills.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{role.requiredSkills.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">
                    View All Job Roles
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Selected Job Role Details */}
              <Card className="col-span-1 md:col-span-3">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Job Role Details: {selectedJobRole.title}</CardTitle>
                      <CardDescription>Comprehensive analysis of market demand and requirements</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="text-sm font-medium">Key Information</h3>
                        <div className="mt-3 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Growth Rate</span>
                            <div className="flex items-center">
                              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                              <span className="font-medium">{selectedJobRole.growth}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Average Salary</span>
                            <span className="font-medium">{selectedJobRole.avgSalary}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Demand Level</span>
                            <Badge variant={selectedJobRole.demandLevel === "Very High" ? "default" : "secondary"}>
                              {selectedJobRole.demandLevel}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h3 className="text-sm font-medium">Top Hiring Companies</h3>
                        <div className="mt-3 space-y-2">
                          {selectedJobRole.companies.map((company, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar className="mr-2 h-6 w-6">
                                  <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={company} />
                                  <AvatarFallback>{company.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{company}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <h3 className="text-sm font-medium">Industry Trend Analysis</h3>
                          <div className="h-[200px] pt-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={selectedJobRole.industryTrend.map((value, index) => ({
                                  month: index,
                                  value,
                                }))}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                {/* <XAxis
                                  dataKey="month"
                                  tickFormatter={(value : string) => {
                                    const months = ["Jan", "Feb", "Mar", "Apr", "May"]
                                    return months[value]
                                  }}
                                /> */}
                                <YAxis label={{ value: "Demand Index", angle: -90, position: "insideLeft" }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#4ade80" activeDot={{ r: 8 }} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h3 className="text-sm font-medium">Required Skills</h3>
                          <div className="mt-3 grid grid-cols-2 gap-3">
                            {selectedJobRole.requiredSkills.map((skill, index) => (
                              <div key={index} className="flex items-center rounded-lg border p-2">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                  <Lightbulb className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">{skill}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {index % 2 === 0 ? "Essential" : "Important"}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Alumni Success Stories Tab */}
          <TabsContent value="alumni-success" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Alumni Success Overview */}
              <Card className="col-span-1 md:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Alumni Success Overview</CardTitle>
                    <CardDescription>Showcasing our graduates' achievements in the industry</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    {/* Success Metrics */}
                    <div className="col-span-1 space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-muted-foreground">Alumni Placement Rate</div>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="mt-2 flex items-end justify-between">
                          <div className="text-3xl font-bold">92%</div>
                          <Badge variant="outline" className="bg-green-50">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            5%
                          </Badge>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">Compared to previous year</div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-muted-foreground">Average Starting Salary</div>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="mt-2 flex items-end justify-between">
                          <div className="text-3xl font-bold">$85K</div>
                          <Badge variant="outline" className="bg-green-50">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            8%
                          </Badge>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">Compared to previous year</div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-muted-foreground">Top Employers</div>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="mr-2 h-6 w-6">
                                <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Google" />
                                <AvatarFallback>G</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">Google</span>
                            </div>
                            <span className="text-sm font-medium">18%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="mr-2 h-6 w-6">
                                <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Microsoft" />
                                <AvatarFallback>M</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">Microsoft</span>
                            </div>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="mr-2 h-6 w-6">
                                <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Amazon" />
                                <AvatarFallback>A</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">Amazon</span>
                            </div>
                            <span className="text-sm font-medium">12%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Career Trajectory Chart */}
                    <div className="col-span-1 md:col-span-3">
                      <div className="rounded-lg border p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">Alumni Career Trajectory</h3>
                            <p className="text-xs text-muted-foreground">
                              Average salary progression over time after graduation
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select defaultValue="all">
                              <SelectTrigger className="h-8 w-[150px] text-xs">
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="cs">Computer Science</SelectItem>
                                <SelectItem value="ee">Electrical Engineering</SelectItem>
                                <SelectItem value="me">Mechanical Engineering</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-xs">
                              <BarChart2 className="h-3 w-3" />
                              Bar
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-xs">
                              <LineChartIcon className="h-3 w-3" />
                              Line
                            </Button>
                          </div>
                        </div>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={[
                                { year: 0, salary: 75000 },
                                { year: 1, salary: 85000 },
                                { year: 2, salary: 95000 },
                                { year: 3, salary: 110000 },
                                { year: 5, salary: 130000 },
                              ]}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              {/* <XAxis
                                dataKey="year"
                                label={{ value: "Years After Graduation", position: "insideBottom", offset: -5 }}
                                tickFormatter={(value) => `${value}${value === 0 ? "" : " yr"}`}
                              />
                              <YAxis
                                label={{ value: "Average Salary ($)", angle: -90, position: "insideLeft" }}
                                tickFormatter={(value) => `$${value / 1000}k`}
                              />
                              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Average Salary"]} /> */}
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="salary"
                                name="Average Salary"
                                stroke="#4ade80"
                                activeDot={{ r: 8 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alumni Profiles */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Alumni Success Stories</CardTitle>
                      <CardDescription>Inspiring journeys of our graduates</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {alumniSuccessStories.map((alumni) => (
                      <div
                        key={alumni.id}
                        className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-green-500 hover:shadow-md ${
                          selectedAlumni.id === alumni.id ? "border-green-500 bg-green-50/50" : ""
                        }`}
                        onClick={() => setSelectedAlumni(alumni)}
                      >
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={alumni.photo} alt={alumni.name} />
                            <AvatarFallback>{alumni.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium">{alumni.name}</h3>
                            <p className="text-sm text-muted-foreground">{alumni.currentRole}</p>
                            <div className="mt-1 flex items-center">
                              <Building className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{alumni.company}</span>
                            </div>
                            <div className="mt-1 flex items-center">
                              <GraduationCap className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Class of {alumni.graduationYear}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 line-clamp-2 text-xs text-muted-foreground">{alumni.story}</div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {alumni.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {alumni.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{alumni.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">
                    View All Alumni
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Alumni Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Alumni Metrics</CardTitle>
                  <CardDescription>Key statistics about our graduates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="text-sm font-medium">Industry Distribution</h3>
                      <div className="mt-3 h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            {/* <Pie
                              data={[
                                { name: "Technology", value: 45 },
                                { name: "Finance", value: 20 },
                                { name: "Healthcare", value: 15 },
                                { name: "Manufacturing", value: 10 },
                                { name: "Others", value: 10 },
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={70}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {[
                                { name: "Technology", value: 45 },
                                { name: "Finance", value: 20 },
                                { name: "Healthcare", value: 15 },
                                { name: "Manufacturing", value: 10 },
                                { name: "Others", value: 10 },
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie> */}
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="text-sm font-medium">Job Satisfaction</h3>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Very Satisfied</span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Satisfied</span>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Neutral</span>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Dissatisfied</span>
                          <span className="text-sm font-medium">5%</span>
                        </div>
                        <Progress value={5} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Alumni Details */}
              <Card className="col-span-1 md:col-span-3">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Alumni Spotlight: {selectedAlumni.name}</CardTitle>
                      <CardDescription>Detailed success story and career journey</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Story
                      </Button>
                      <Button variant="default" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Alumni
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-4">
                      <div className="flex flex-col items-center rounded-lg border p-6 text-center">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={selectedAlumni.photo} alt={selectedAlumni.name} />
                          <AvatarFallback>{selectedAlumni.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="mt-4 text-xl font-medium">{selectedAlumni.name}</h3>
                        <p className="text-muted-foreground">{selectedAlumni.currentRole}</p>
                        <div className="mt-1 flex items-center">
                          <Building className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{selectedAlumni.company}</span>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 rounded-full p-0">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 rounded-full p-0">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 rounded-full p-0">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h3 className="text-sm font-medium">Education & Background</h3>
                        <div className="mt-3 space-y-3">
                          <div className="flex items-start">
                            <GraduationCap className="mr-2 mt-0.5 h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium">{selectedAlumni.degree}</div>
                              <div className="text-xs text-muted-foreground">
                                Class of {selectedAlumni.graduationYear}
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <div>
                            <div className="text-sm font-medium">Key Skills</div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {selectedAlumni.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Separator />
                          <div>
                            <div className="text-sm font-medium">Achievements</div>
                            <div className="mt-2 space-y-1">
                              {selectedAlumni.achievements.map((achievement, index) => (
                                <div key={index} className="flex items-start">
                                  <Award className="mr-2 mt-0.5 h-3 w-3 text-amber-500" />
                                  <span className="text-xs">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <h3 className="text-sm font-medium">Success Story</h3>
                          <p className="mt-3 text-sm">{selectedAlumni.story}</p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h3 className="text-sm font-medium">Career Journey</h3>
                          <div className="mt-3">
                            {selectedAlumni.careerPath.map((position, index) => (
                              <div key={index} className="relative pl-6 pb-4">
                                {index < selectedAlumni.careerPath.length - 1 && (
                                  <div className="absolute left-2 top-2 h-full w-0.5 bg-gray-200"></div>
                                )}
                                <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-green-500 bg-white"></div>
                                <div className="rounded-lg border p-3">
                                  <div className="text-sm font-medium">{position}</div>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {index === 0 ? "2 years" : index === 1 ? "3 years" : "Current"}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h3 className="text-sm font-medium">Advice for Students</h3>
                          <div className="mt-3 rounded-lg bg-green-50 p-3">
                            <div className="flex items-start">
                              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                <Lightbulb className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm italic">"{selectedAlumni.advice}"</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Company Feedback Integration Tab */}
          <TabsContent value="company-feedback" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Feedback Overview */}
              <Card className="col-span-1 md:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recruiter Feedback Overview</CardTitle>
                    <CardDescription>Aggregated insights from industry partners to improve curriculum</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    {/* Feedback Metrics */}
                    <div className="col-span-1 space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-muted-foreground">Overall Satisfaction</div>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="mt-2 flex items-end justify-between">
                          <div className="text-3xl font-bold">4.7/5</div>
                          <Badge variant="outline" className="bg-green-50">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            0.3
                          </Badge>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">Compared to previous year</div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-muted-foreground">Hire Rate</div>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="mt-2 flex items-end justify-between">
                          <div className="text-3xl font-bold">78%</div>
                          <Badge variant="outline" className="bg-green-50">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            5%
                          </Badge>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">Compared to previous year</div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-muted-foreground">Retention Rate</div>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="mt-2 flex items-end justify-between">
                          <div className="text-3xl font-bold">90%</div>
                          <Badge variant="outline" className="bg-green-50">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            2%
                          </Badge>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">Compared to previous year</div>
                      </div>
                    </div>

                    {/* Skill Gap Analysis */}
                    <div className="col-span-1 md:col-span-3">
                      <div className="rounded-lg border p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">Skill Gap Analysis</h3>
                            <p className="text-xs text-muted-foreground">
                              Comparison between industry expectations and student proficiency
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select defaultValue="all">
                              <SelectTrigger className="h-8 w-[150px] text-xs">
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="cs">Computer Science</SelectItem>
                                <SelectItem value="ee">Electrical Engineering</SelectItem>
                                <SelectItem value="me">Mechanical Engineering</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-xs">
                              <BarChart2 className="h-3 w-3" />
                              Bar
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-xs">
                              <LineChartIcon className="h-3 w-3" />
                              Line
                            </Button>
                          </div>
                        </div>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={skillGapData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                              layout="vertical"
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                type="number"
                                domain={[0, 10]}
                                label={{ value: "Proficiency Level (0-10)", position: "insideBottom", offset: -5 }}
                              />
                              <YAxis dataKey="name" type="category" width={100} />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="industry" name="Industry Expectation" fill="#4ade80" />
                              <Bar dataKey="student" name="Student Proficiency" fill="#93c5fd" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Feedback Cards */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Company Feedback</CardTitle>
                      <CardDescription>Insights from recruiting partners</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {companyFeedback.map((feedback) => (
                      <div
                        key={feedback.id}
                        className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-green-500 hover:shadow-md ${
                          selectedCompany.id === feedback.id ? "border-green-500 bg-green-50/50" : ""
                        }`}
                        onClick={() => setSelectedCompany(feedback)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={feedback.logo} alt={feedback.company} />
                              <AvatarFallback>{feedback.company.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{feedback.company}</h3>
                              <div className="mt-1 flex items-center">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < Math.floor(feedback.overallRating)
                                          ? "fill-amber-400 text-amber-400"
                                          : i < feedback.overallRating
                                            ? "fill-amber-400 text-amber-400"
                                            : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="ml-1 text-xs text-muted-foreground">
                                  {feedback.overallRating.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <div className="flex items-center text-xs">
                              <span className="mr-1 text-muted-foreground">Hire Rate:</span>
                              <span className="font-medium">{feedback.hireRate}%</span>
                            </div>
                            <div className="flex items-center text-xs">
                              <span className="mr-1 text-muted-foreground">Retention:</span>
                              <span className="font-medium">{feedback.retentionRate}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-2">
                            <div className="flex-1">
                              <div className="text-xs font-medium text-muted-foreground">Strengths</div>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {feedback.strengths.map((strength, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    <ThumbsUp className="mr-1 h-3 w-3 text-green-500" />
                                    {strength}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-medium text-muted-foreground">Areas for Improvement</div>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {feedback.areasForImprovement.map((area, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {area}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">
                    View All Feedback
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Curriculum Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Curriculum Recommendations</CardTitle>
                  <CardDescription>Based on industry feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {curriculumRecommendations.map((recommendation) => (
                      <div key={recommendation.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{recommendation.area}</h3>
                          <Badge variant={recommendation.priority === "High" ? "default" : "secondary"}>
                            {recommendation.priority}
                          </Badge>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div>
                            <div className="text-xs font-medium text-muted-foreground">Current Coverage</div>
                            <p className="text-xs">{recommendation.currentCoverage}</p>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-muted-foreground">Recommended Enhancement</div>
                            <p className="text-xs">{recommendation.recommendedEnhancement}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Industry Alignment</span>
                            <span className="text-xs font-medium">{recommendation.industryAlignment}%</span>
                          </div>
                          <Progress value={recommendation.industryAlignment} className="h-1.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Selected Company Feedback Details */}
              <Card className="col-span-1 md:col-span-3">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Detailed Feedback: {selectedCompany.company}</CardTitle>
                      <CardDescription>Comprehensive analysis of recruiter insights</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={selectedCompany.logo} alt={selectedCompany.company} />
                            <AvatarFallback>{selectedCompany.company.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{selectedCompany.company}</h3>
                            <div className="mt-1 flex items-center">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(selectedCompany.overallRating)
                                        ? "fill-amber-400 text-amber-400"
                                        : i < selectedCompany.overallRating
                                          ? "fill-amber-400 text-amber-400"
                                          : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-1 text-sm text-muted-foreground">
                                {selectedCompany.overallRating.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Hire Rate</span>
                            <div className="flex items-center">
                              <span className="font-medium">{selectedCompany.hireRate}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Retention Rate</span>
                            <span className="font-medium">{selectedCompany.retentionRate}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Recruiter</span>
                            <span className="text-sm">{selectedCompany.recruiter}</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h3 className="text-sm font-medium">Strengths & Areas for Improvement</h3>
                        <div className="mt-3 space-y-3">
                          <div>
                            <div className="text-xs font-medium text-green-600">Strengths</div>
                            <div className="mt-1 space-y-1">
                              {selectedCompany.strengths.map((strength, index) => (
                                <div key={index} className="flex items-start">
                                  <ThumbsUp className="mr-2 mt-0.5 h-3 w-3 text-green-500" />
                                  <span className="text-sm">{strength}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Separator />
                          <div>
                            <div className="text-xs font-medium text-amber-600">Areas for Improvement</div>
                            <div className="mt-1 space-y-1">
                              {selectedCompany.areasForImprovement.map((area, index) => (
                                <div key={index} className="flex items-start">
                                  <ArrowUpRight className="mr-2 mt-0.5 h-3 w-3 text-amber-500" />
                                  <span className="text-sm">{area}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <h3 className="text-sm font-medium">Testimonial</h3>
                          <div className="mt-3 rounded-lg bg-green-50 p-4">
                            <p className="text-sm italic">"{selectedCompany.testimonial}"</p>
                            <div className="mt-2 text-xs text-right text-muted-foreground">
                              — {selectedCompany.recruiter}
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h3 className="text-sm font-medium">Skill Gap Analysis</h3>
                          <div className="mt-3 space-y-4">
                            {selectedCompany.skillGaps.map((gap, index) => (
                              <div key={index}>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">{gap.skill}</span>
                                  <span className="text-xs text-muted-foreground">Importance: {gap.importance}/10</span>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between text-xs">
                                      <span>Student Proficiency</span>
                                      <span>{gap.studentProficiency}/10</span>
                                    </div>
                                    <Progress value={(gap.studentProficiency / 10) * 100} className="h-2" />
                                  </div>
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between text-xs">
                                      <span>Target</span>
                                      <span>{gap.importance}/10</span>
                                    </div>
                                    <Progress value={(gap.importance / 10) * 100} className="h-2" />
                                  </div>
                                </div>
                                <div className="mt-1 flex items-center justify-end">
                                  <Badge
                                    variant={gap.importance - gap.studentProficiency > 2 ? "outline" : "secondary"}
                                    className="text-xs"
                                  >
                                    Gap: {gap.importance - gap.studentProficiency}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h3 className="text-sm font-medium">Recommended Actions</h3>
                          <div className="mt-3 space-y-3">
                            <div className="rounded-lg border p-3">
                              <div className="flex items-start">
                                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                  <BookOpen className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Curriculum Enhancement</h4>
                                  <p className="text-xs text-muted-foreground">
                                    Integrate more practical {selectedCompany.skillGaps[0].skill} exercises into
                                    relevant courses to bridge the identified skill gap.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="rounded-lg border p-3">
                              <div className="flex items-start">
                                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                  <UserPlus className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Industry Workshops</h4>
                                  <p className="text-xs text-muted-foreground">
                                    Organize specialized workshops led by {selectedCompany.company} professionals to
                                    provide hands-on experience in {selectedCompany.skillGaps[1].skill}.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="rounded-lg border p-3">
                              <div className="flex items-start">
                                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                  <Briefcase className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Internship Program</h4>
                                  <p className="text-xs text-muted-foreground">
                                    Develop a targeted internship program with {selectedCompany.company} focusing on{" "}
                                    {selectedCompany.skillGaps[2].skill} to provide real-world experience.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

