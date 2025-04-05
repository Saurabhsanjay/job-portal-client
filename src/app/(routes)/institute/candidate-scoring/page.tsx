"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"
import {
  Search,
  Download,
  CheckCircle,
  AlertCircle,
  Users,
  ArrowRight,
  CheckSquare,
  AlertTriangle,
  ChevronRight,
  Sliders,
  Info,
  RefreshCw,
  Eye,
  Lightbulb,
  TrendingUp,
  Scale,
  InfoIcon as InfoCircle,
} from "lucide-react"

const CandidateScoring = () => {
  const [activeTab, setActiveTab] = useState("ai-scoring");
  const [showCandidateDialog, setShowCandidateDialog] = useState(false);
  const [showAlgorithmDialog, setShowAlgorithmDialog] = useState(false);
  const [showComparisonDialog, setShowComparisonDialog] = useState(false);
  const [showBiasAuditDialog, setShowBiasAuditDialog] = useState(false);
  const [showScoreDetailsDialog, setShowScoreDetailsDialog] = useState(false);
  const [showImprovementDialog, setShowImprovementDialog] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        {/* <div>
          <h1 className="text-3xl font-bold text-gray-900">Candidate Scoring System</h1>
          <p className="text-gray-500 mt-1">
            AI-powered evaluation, inclusivity metrics, and candidate comparison tools
          </p>
        </div> */}
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export Data
          </Button>
          <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
            <Sliders size={16} />
            Configure Scoring
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ai-scoring" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai-scoring">AI-Powered Scoring</TabsTrigger>
          <TabsTrigger value="inclusivity-metrics">Inclusivity Metrics</TabsTrigger>
          <TabsTrigger value="comparison-tools">Comparison Tools</TabsTrigger>
        </TabsList>

        {/* AI-Powered Scoring Tab */}
        <TabsContent value="ai-scoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Overall Job Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-4">
                  <div className="relative h-40 w-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-3xl font-bold">76%</span>
                        <p className="text-sm text-gray-500">Average Score</p>
                      </div>
                    </div>
                    <svg className="h-40 w-40" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-100"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-green-600"
                        strokeWidth="10"
                        strokeDasharray={76 * 2.51}
                        strokeDashoffset={0}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Total Candidates</p>
                    <p className="text-xl font-semibold">342</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Placement Ready</p>
                    <p className="text-xl font-semibold">218</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Score Distribution</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { range: '90-100', count: 42, label: 'Exceptional' },
                        { range: '80-89', count: 78, label: 'Excellent' },
                        { range: '70-79', count: 98, label: 'Good' },
                        { range: '60-69', count: 65, label: 'Average' },
                        { range: '< 60', count: 59, label: 'Needs Improvement' },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="range" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="count" name="Candidates" fill="#10b981">
                        <Cell fill="#10b981" />
                        <Cell fill="#10b981" />
                        <Cell fill="#10b981" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#ef4444" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Scoring Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={[
                      { subject: 'Technical Skills', A: 78, fullMark: 100 },
                      { subject: 'Soft Skills', A: 82, fullMark: 100 },
                      { subject: 'Experience', A: 65, fullMark: 100 },
                      { subject: 'Education', A: 85, fullMark: 100 },
                      { subject: 'Portfolio', A: 72, fullMark: 100 },
                      { subject: 'Certifications', A: 68, fullMark: 100 },
                    ]}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Average Score" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Candidate Scoring Overview</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search candidates..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  <Select defaultValue="all-departments">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-departments">All Departments</SelectItem>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ds">Data Science</SelectItem>
                      <SelectItem value="ba">Business Administration</SelectItem>
                      <SelectItem value="eng">Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download size={16} />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Overall Score</TableHead>
                    <TableHead>Technical</TableHead>
                    <TableHead>Soft Skills</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Job Readiness</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Aisha Patel</TableCell>
                    <TableCell>Computer Science</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="h-2 w-24" />
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </TableCell>
                    <TableCell>95%</TableCell>
                    <TableCell>88%</TableCell>
                    <TableCell>85%</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Exceptional</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => setShowScoreDetailsDialog(true)}>View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Raj Singh</TableCell>
                    <TableCell>Information Technology</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="h-2 w-24" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </TableCell>
                    <TableCell>82%</TableCell>
                    <TableCell>90%</TableCell>
                    <TableCell>78%</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => setShowScoreDetailsDialog(true)}>View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sarah Johnson</TableCell>
                    <TableCell>Data Science</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={78} className="h-2 w-24" />
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </TableCell>
                    <TableCell>75%</TableCell>
                    <TableCell>85%</TableCell>
                    <TableCell>70%</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Good</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => setShowScoreDetailsDialog(true)}>View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Michael Chen</TableCell>
                    <TableCell>Computer Science</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={65} className="h-2 w-24" />
                        <span className="text-sm font-medium">65%</span>
                      </div>
                    </TableCell>
                    <TableCell>68%</TableCell>
                    <TableCell>60%</TableCell>
                    <TableCell>62%</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Average</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => setShowScoreDetailsDialog(true)}>View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Emily Rodriguez</TableCell>
                    <TableCell>Business Administration</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={58} className="h-2 w-24" />
                        <span className="text-sm font-medium">58%</span>
                      </div>
                    </TableCell>
                    <TableCell>55%</TableCell>
                    <TableCell>72%</TableCell>
                    <TableCell>50%</TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Needs Improvement</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => setShowImprovementDialog(true)}>Suggest Improvements</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">Showing 5 of 342 candidates</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" className="bg-gray-100">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Scoring Algorithm Performance</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => setShowAlgorithmDialog(true)}
                  >
                    <Info size={14} />
                    Algorithm Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', accuracy: 82, precision: 78, recall: 80 },
                        { month: 'Feb', accuracy: 84, precision: 80, recall: 82 },
                        { month: 'Mar', accuracy: 85, precision: 82, recall: 83 },
                        { month: 'Apr', accuracy: 87, precision: 84, recall: 85 },
                        { month: 'May', accuracy: 88, precision: 85, recall: 86 },
                        { month: 'Jun', accuracy: 90, precision: 87, recall: 88 },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis domain={[75, 95]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="accuracy" name="Accuracy %" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="precision" name="Precision %" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="recall" name="Recall %" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Current Accuracy</p>
                    <p className="text-xl font-semibold">90%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Improvement</p>
                    <p className="text-xl font-semibold text-green-600">+8%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="text-sm font-medium">2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prediction Accuracy by Job Role</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { role: 'Software Developer', accuracy: 92 },
                        { role: 'Data Scientist', accuracy: 88 },
                        { role: 'UX Designer', accuracy: 85 },
                        { role: 'Project Manager', accuracy: 82 },
                        { role: 'Business Analyst', accuracy: 80 },
                        { role: 'Network Engineer', accuracy: 78 },
                        { role: 'Marketing Specialist', accuracy: 75 },
                      ]}
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[70, 100]} />
                      <YAxis dataKey="role" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="accuracy" name="Prediction Accuracy %" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setShowAlgorithmDialog(true)}>
                    Optimize Algorithm
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Inclusivity Metrics Tab */}
        <TabsContent value="inclusivity-metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Fairness Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-4">
                  <div className="relative h-40 w-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-3xl font-bold">92%</span>
                        <p className="text-sm text-gray-500">Algorithm Fairness</p>
                      </div>
                    </div>
                    <svg className="h-40 w-40" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-100"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-green-600"
                        strokeWidth="10"
                        strokeDasharray={92 * 2.51}
                        strokeDashoffset={0}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Bias Incidents</p>
                    <p className="text-xl font-semibold">3</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Last Audit</p>
                    <p className="text-sm font-medium">2 days ago</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => setShowBiasAuditDialog(true)}
                  >
                    <Scale size={16} />
                    Run Bias Audit
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Score Distribution by Gender</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { range: '90-100', male: 22, female: 20, nonbinary: 2 },
                        { range: '80-89', male: 38, female: 36, nonbinary: 4 },
                        { range: '70-79', male: 48, female: 46, nonbinary: 4 },
                        { range: '60-69', male: 32, female: 30, nonbinary: 3 },
                        { range: '< 60', male: 30, female: 26, nonbinary: 3 },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="range" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="male" name="Male" fill="#6366f1" />
                      <Bar dataKey="female" name="Female" fill="#ec4899" />
                      <Bar dataKey="nonbinary" name="Non-binary" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  <p>Statistical parity difference: 1.2% (within acceptable range)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Demographic Representation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Asian', value: 28, color: '#10b981' },
                          { name: 'Black', value: 22, color: '#6366f1' },
                          { name: 'Hispanic', value: 18, color: '#f59e0b' },
                          { name: 'White', value: 25, color: '#ec4899' },
                          { name: 'Other', value: 7, color: '#6b7280' },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {[
                          { name: 'Asian', value: 28, color: '#10b981' },
                          { name: 'Black', value: 22, color: '#6366f1' },
                          { name: 'Hispanic', value: 18, color: '#f59e0b' },
                          { name: 'White', value: 25, color: '#ec4899' },
                          { name: 'Other', value: 7, color: '#6b7280' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Inclusivity Metrics Dashboard</CardTitle>
                <div className="flex items-center gap-3">
                  <Select defaultValue="all-metrics">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-metrics">All Metrics</SelectItem>
                      <SelectItem value="gender">Gender Equality</SelectItem>
                      <SelectItem value="ethnicity">Ethnic Diversity</SelectItem>
                      <SelectItem value="socioeconomic">Socioeconomic Factors</SelectItem>
                      <SelectItem value="disability">Disability Inclusion</SelectItem>
                      <SelectItem value="age">Age Distribution</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download size={16} />
                    Export Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Statistical Parity Difference</TableCell>
                    <TableCell>1.2%</TableCell>\
                    <TableCell>2%</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Compliant</Badge>
                    </TableCell>
                    <TableCell className="text-green-600 flex items-center">
                      <TrendingUp size={16} className="mr-1" /> Improving
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">2 days ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Equal Opportunity Difference</TableCell>
                    <TableCell>2.1%</TableCell>
                    <TableCell>3%</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Compliant</Badge>
                    </TableCell>
                    <TableCell className="text-green-600 flex items-center">
                      <TrendingUp size={16} className="mr-1" /> Improving
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">2 days ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Disparate Impact Ratio</TableCell>
                    <TableCell>0.92</TableCell>
                    <TableCell> 0.8</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Compliant</Badge>
                    </TableCell>
                    <TableCell className="text-amber-600 flex items-center">
                      <ArrowRight size={16} className="mr-1" /> Stable
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">2 days ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Treatment Equality</TableCell>
                    <TableCell>0.88</TableCell>
                    <TableCell> 0.85</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Compliant</Badge>
                    </TableCell>
                    <TableCell className="text-green-600 flex items-center">
                      <TrendingUp size={16} className="mr-1" /> Improving
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">2 days ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Predictive Parity</TableCell>
                    <TableCell>0.78</TableCell>
                    <TableCell> 0.8</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Needs Attention</Badge>
                    </TableCell>
                    <TableCell className="text-amber-600 flex items-center">
                      <ArrowRight size={16} className="mr-1" /> Stable
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">2 days ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <InfoCircle size={14} />
                    <span>Metrics are updated daily and audited weekly</span>
                  </div>
                </div>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setShowBiasAuditDialog(true)}
                >
                  Run Comprehensive Audit
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution by Demographic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* <ResponsiveContainer width="100%" height="100%"> */}
                    <h1>Comment</h1>
                    {/* <BoxPlotChart
                      layout="vertical"
                      data={[
                        {
                          name: 'Asian',
                          min: 58,
                          q1: 72,
                          median: 78,
                          q3: 88,
                          max: 98
                        },
                        {
                          name: 'Black',
                          min: 55,
                          q1: 68,
                          median: 76,
                          q3: 85,
                          max: 95
                        },
                        {
                          name: 'Hispanic',
                          min: 56,
                          q1: 70,
                          median: 77,
                          q3: 86,
                          max: 96
                        },
                        {
                          name: 'White',
                          min: 60,
                          q1: 72,
                          median: 79,
                          q3: 88,
                          max: 98
                        },
                        {
                          name: 'Other',
                          min: 58,
                          q1: 70,
                          median: 76,
                          q3: 85,
                          max: 95
                        }
                      ]}
                      margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[50, 100]} />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <BoxPlot
                        dataKey="scores"
                        fill="#10b981"
                        stroke="#10b981"
                        medianStroke="#6366f1"
                        whiskerStroke="#6b7280"
                      />
                    </BoxPlotChart> */}
                  {/* </ResponsiveContainer> */}
                </div>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Insights</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Score distributions are statistically similar across demographics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Median scores within 3% range across all groups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <span>Slight variation in lower quartile scores needs monitoring</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Algorithm Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Scoring Factors and Weights</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Technical Skills Assessment</span>
                              <span className="font-medium">30%</span>
                            </div>
                            <Progress value={30} className="h-2 bg-gray-100" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Soft Skills Evaluation</span>
                              <span className="font-medium">25%</span>
                            </div>
                            <Progress value={25} className="h-2 bg-gray-100" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Academic Performance</span>
                              <span className="font-medium">20%</span>
                            </div>
                            <Progress value={20} className="h-2 bg-gray-100" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Project Portfolio</span>
                              <span className="font-medium">15%</span>
                            </div>
                            <Progress value={15} className="h-2 bg-gray-100" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Industry Experience</span>
                              <span className="font-medium">10%</span>
                            </div>
                            <Progress value={10} className="h-2 bg-gray-100" />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Bias Mitigation Techniques</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                            <span><span className="font-medium">Pre-processing:</span> Demographic data is removed from training inputs</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                            <span><span className="font-medium">In-processing:</span> Adversarial debiasing techniques applied during model training</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                            <span><span className="font-medium">Post-processing:</span> Calibrated score adjustments based on fairness metrics</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                            <span><span className="font-medium">Regular auditing:</span> Weekly bias detection and mitigation processes</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Model Documentation</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-sm">
                          <p>Our candidate scoring system uses a gradient-boosted decision tree model trained on historical placement data with the following specifications:</p>
                          <ul className="space-y-1 list-disc pl-5">
                            <li>Model type: XGBoost ensemble</li>
                            <li>Features: 42 skill and experience indicators</li>
                            <li>Training data: 5,000+ historical placements</li>
                            <li>Validation method: 5-fold cross-validation</li>
                            <li>Accuracy: 90% on held-out test data</li>
                            <li>Last retrained: 30 days ago</li>
                          </ul>
                          <Button variant="outline" size="sm" className="mt-2">
                            Download Full Documentation
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Human Oversight Process</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-sm">
                          <p>Our AI scoring system includes multiple human oversight mechanisms:</p>
                          <ul className="space-y-1 list-disc pl-5">
                            <li>All scores below 60% or above 95% are manually reviewed</li>
                            <li>Random sampling of 10% of all scores for quality assurance</li>
                            <li>Appeal process available for candidates who wish to contest their scores</li>
                            <li>Quarterly review of the entire system by the ethics committee</li>
                            <li>Ability for placement officers to override scores with justification</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                    <Info size={16} />
                    Algorithm Transparency Statement
                  </h4>
                  <p className="text-sm text-gray-700">
                    Our candidate scoring system is designed with fairness and transparency as core principles. We regularly audit our algorithms for bias, provide clear explanations of scoring factors, and maintain human oversight of all automated decisions. Full documentation is available to all stakeholders, and we welcome feedback to continuously improve our system.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Full Transparency Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Comparison Tools Tab */}
        <TabsContent value="comparison-tools" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Candidate Comparison Tool</CardTitle>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setShowComparisonDialog(true)}
                >
                  Compare Candidates
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-2 border-green-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Selected</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-2">Aisha Patel</CardTitle>
                    <CardDescription>
                      Computer Science, Class of 2023
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Overall Score:</span>
                        <span className="font-medium text-green-600">92%</span>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Technical Skills</span>
                          <span>95%</span>
                        </div>
                        <Progress value={95} className="h-2 bg-gray-100" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Soft Skills</span>
                          <span>88%</span>
                        </div>
                        <Progress value={88} className="h-2 bg-gray-100" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Experience</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2 bg-gray-100" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Education</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2 bg-gray-100" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Portfolio</span>
                          <span>90%</span>
                        </div>
                        <Progress value={90} className="h-2 bg-gray-100" />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium text-sm mb-2">Key Strengths</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Full-stack Development</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Machine Learning</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Problem Solving</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      Improvement Plan
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Comparable</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-2">Raj Singh</CardTitle>
                    <CardDescription>
                      Information Technology, Class of 2023
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Overall Score:</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Technical Skills</span>
                          <span>82%</span>
                        </div>
                        <Progress value={82} className="h-2 bg-gray-100" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Soft Skills</span>
                          <span>90%</span>
                        </div>
                        <Progress value={90} className="h-2 bg-gray-100" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Experience</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-2 bg-gray-100" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Education</span>
                          <span>88%</span>
                        </div>
                        <Progress value={88} className="h-2 bg-gray-100" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Portfolio</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2 bg-gray-100" />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium text-sm mb-2">Key Strengths</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Cloud Computing</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Team Leadership</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Project Management</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      Improvement Plan
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Comparable</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-2">Sarah Johnson</CardTitle>
                    <CardDescription>
                      Data Science, Class of 2023
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Overall Score:</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Technical Skills</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} className="h-2 bg-gray-100" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Soft Skills</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2 bg-gray-100" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Experience</span>
                          <span>70%</span>
                        </div>
                        <Progress value={70} className="h-2 bg-gray-100" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Education</span>
                          <span>82%</span>
                        </div>
                        <Progress value={82} className="h-2 bg-gray-100" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Portfolio</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-2 bg-gray-100" />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium text-sm mb-2">Key Strengths</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Data Analysis</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Visualization</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Communication</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      Improvement Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Comparative Analysis</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={150} data={[
                      { subject: 'Technical Skills', A: 95, B: 82, C: 75, fullMark: 100 },
                      { subject: 'Soft Skills', A: 88, B: 90, C: 85, fullMark: 100 },
                      { subject: 'Experience', A: 85, B: 78, C: 70, fullMark: 100 },
                      { subject: 'Education', A: 92, B: 88, C: 82, fullMark: 100 },
                      { subject: 'Portfolio', A: 90, B: 85, C: 78, fullMark: 100 },
                      { subject: 'Certifications', A: 88, B: 80, C: 75, fullMark: 100 },
                    ]}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Aisha Patel" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                      <Radar name="Raj Singh" dataKey="B" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                      <Radar name="Sarah Johnson" dataKey="C" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.5} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-green-800 mb-3">Key Differentiators</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                        <span><span className="font-medium">Aisha:</span> Exceptional technical skills and strong portfolio</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                        <span><span className="font-medium">Raj:</span> Superior soft skills and leadership abilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                        <span><span className="font-medium">Sarah:</span> Strong communication and data visualization</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-blue-800 mb-3">Improvement Areas</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span><span className="font-medium">Aisha:</span> Could enhance experience with industry internships</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span><span className="font-medium">Raj:</span> Technical skills in cloud architecture need strengthening</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span><span className="font-medium">Sarah:</span> More practical experience and certifications recommended</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-amber-800 mb-3">Recommended Actions</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-amber-600 mt-0.5" />
                        <span><span className="font-medium">Aisha:</span> Connect with industry partners for internship</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-amber-600 mt-0.5" />
                        <span><span className="font-medium">Raj:</span> Enroll in AWS certification program</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-amber-600 mt-0.5" />
                        <span><span className="font-medium">Sarah:</span> Join data science practicum and obtain certification</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Gap Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { skill: 'Cloud Computing', current: 65, required: 85, gap: 20 },
                        { skill: 'Data Analysis', current: 78, required: 90, gap: 12 },
                        { skill: 'Machine Learning', current: 72, required: 85, gap: 13 },
                        { skill: 'UI/UX Design', current: 68, required: 75, gap: 7 },
                        { skill: 'DevOps', current: 60, required: 80, gap: 20 },
                        { skill: 'Cybersecurity', current: 55, required: 75, gap: 20 },
                      ]}
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="skill" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" name="Current Level" stackId="a" fill="#10b981" />
                      <Bar dataKey="gap" name="Skill Gap" stackId="a" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Recommended Training Programs</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">AWS Cloud Practitioner Certification</p>
                          <p className="text-gray-600">Addresses 20% gap in Cloud Computing</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Advanced Machine Learning Bootcamp</p>
                          <p className="text-gray-600">Addresses 13% gap in ML skills</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">DevOps Engineering Fundamentals</p>
                          <p className="text-gray-600">Addresses 20% gap in DevOps practices</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setShowImprovementDialog(true)}>
                    Generate Improvement Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industry Benchmark Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid />
                      <XAxis 
                        type="number" 
                        dataKey="technical" 
                        name="Technical Skills" 
                        domain={[40, 100]}
                        label={{ value: 'Technical Skills', position: 'bottom' }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="soft" 
                        name="Soft Skills" 
                        domain={[40, 100]}
                        label={{ value: 'Soft Skills', angle: -90, position: 'left' }}
                      />
                      <ZAxis 
                        type="number" 
                        dataKey="experience" 
                        range={[50, 400]} 
                        name="Experience"
                      />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter 
                        name="Your Candidates" 
                        data={[
                          { technical: 95, soft: 88, experience: 85, name: 'Aisha P.' },
                          { technical: 82, soft: 90, experience: 78, name: 'Raj S.' },
                          { technical: 75, soft: 85, experience: 70, name: 'Sarah J.' },
                          { technical: 68, soft: 60, experience: 62, name: 'Michael C.' },
                          { technical: 55, soft: 72, experience: 50, name: 'Emily R.' },
                        ]} 
                        fill="#10b981"
                      />
                      <Scatter 
                        name="Industry Benchmark" 
                        data={[
                          { technical: 85, soft: 80, experience: 75, name: 'Benchmark' },
                        ]} 
                        fill="#ef4444"
                        shape="star"
                      />
                      <Scatter 
                        name="Top Performers" 
                        data={[
                          { technical: 92, soft: 88, experience: 85, name: 'Top Tier' },
                        ]} 
                        fill="#6366f1"
                        shape="triangle"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Benchmark Insights</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>2 candidates exceed industry benchmarks in all areas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>1 candidate meets industry benchmarks with strong soft skills</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <span>2 candidates need significant improvement to meet benchmarks</span>
                      </li>
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Detailed Benchmark Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Career Path Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Best Match</Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">Software Development</CardTitle>
                    <CardDescription>
                      Based on technical skills and problem-solving abilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Match Score:</span>
                        <span className="font-medium text-green-600">94%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Avg. Starting Salary:</span>
                        <span className="font-medium">$85,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Job Growth:</span>
                        <span className="font-medium text-green-600">+22%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Demand Level:</span>
                        <span className="font-medium">Very High</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium text-sm mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">JavaScript</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">React</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Node.js</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Python</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      Prepare for This Path
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Good Match</Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">Data Science</CardTitle>
                    <CardDescription>
                      Based on analytical skills and mathematical aptitude
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Match Score:</span>
                        <span className="font-medium text-blue-600">86%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Avg. Starting Salary:</span>
                        <span className="font-medium">$92,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Job Growth:</span>
                        <span className="font-medium text-green-600">+28%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Demand Level:</span>
                        <span className="font-medium">Very High</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium text-sm mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Python</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">SQL</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Machine Learning</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Statistics</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      Prepare for This Path
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Good Match</Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">Product Management</CardTitle>
                    <CardDescription>
                      Based on technical knowledge and leadership skills
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Match Score:</span>
                        <span className="font-medium text-blue-600">82%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Avg. Starting Salary:</span>
                        <span className="font-medium">$88,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Job Growth:</span>
                        <span className="font-medium text-green-600">+18%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Demand Level:</span>
                        <span className="font-medium">High</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium text-sm mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Agile</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">User Research</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Strategy</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Communication</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      Prepare for This Path
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Score Details Dialog */}
      <Dialog open={showScoreDetailsDialog} onOpenChange={setShowScoreDetailsDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Candidate Score Details</DialogTitle>
            <DialogDescription>
              Comprehensive breakdown of Aisha Patel's scoring factors and predictions
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Overall Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600">92%</div>
                      <p className="text-sm text-gray-500 mt-1">Exceptional</p>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Technical Skills</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <Progress value={95} className="h-2 bg-gray-100" />
                      <div className="flex justify-between text-sm mb-1 mt-2">
                        <span>Soft Skills</span>
                        <span className="font-medium">88%</span>
                      </div>
                      <Progress value={88} className="h-2 bg-gray-100" />
                      <div className="flex justify-between text-sm mb-1 mt-2">
                        <span>Experience</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2 bg-gray-100" />
                      <div className="flex justify-between text-sm mb-1 mt-2">
                        <span>Education</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2 bg-gray-100" />
                      <div className="flex justify-between text-sm mb-1 mt-2">
                        <span>Portfolio</span>
                        <span className="font-medium">90%</span>
                      </div>
                      <Progress value={90} className="h-2 bg-gray-100" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Job Readiness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-100 p-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Software Developer</p>
                          <p className="text-xs text-gray-500">98% match - Excellent</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-100 p-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Machine Learning Engineer</p>
                          <p className="text-xs text-gray-500">92% match - Excellent</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-100 p-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Full-stack Developer</p>
                          <p className="text-xs text-gray-500">95% match - Excellent</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-1.5">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Data Scientist</p>
                          <p className="text-xs text-gray-500">85% match - Good</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium text-sm mb-2">Placement Prediction</h4>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">96%</div>
                        <p className="text-xs text-gray-500">Likelihood of successful placement</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Skill Proficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} data={[
                          { subject: 'JavaScript', A: 95, fullMark: 100 },
                          { subject: 'Python', A: 92, fullMark: 100 },
                          { subject: 'React', A: 90, fullMark: 100 },
                          { subject: 'Node.js', A: 88, fullMark: 100 },
                          { subject: 'SQL', A: 85, fullMark: 100 },
                          { subject: 'ML', A: 82, fullMark: 100 },
                        ]}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar name="Skill Level" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Technical Skills Assessment</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Skill</TableHead>
                      <TableHead>Proficiency</TableHead>
                      <TableHead>Industry Benchmark</TableHead>
                      <TableHead>Gap</TableHead>
                      <TableHead>Evidence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">JavaScript</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={95} className="h-2 w-24" />
                          <span className="text-sm">95%</span>
                        </div>
                      </TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell className="text-green-600">+10%</TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          View Projects
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Python</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={92} className="h-2 w-24" />
                          <span className="text-sm">92%</span>
                        </div>
                      </TableCell>
                      <TableCell>80%</TableCell>
                      <TableCell className="text-green-600">+12%</TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          View Projects
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">React</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={90} className="h-2 w-24" />
                          <span className="text-sm">90%</span>
                        </div>
                      </TableCell>
                      <TableCell>82%</TableCell>
                      <TableCell className="text-green-600">+8%</TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          View Projects
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Node.js</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={88} className="h-2 w-24" />
                          <span className="text-sm">88%</span>
                        </div>
                      </TableCell>
                      <TableCell>78%</TableCell>
                      <TableCell className="text-green-600">+10%</TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          View Projects
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SQL</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={85} className="h-2 w-24" />
                          <span className="text-sm">85%</span>
                        </div>
                      </TableCell>
                      <TableCell>75%</TableCell>
                      <TableCell className="text-green-600">+10%</TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          View Projects
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Soft Skills Assessment</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Skill</TableHead>
                      <TableHead>Proficiency</TableHead>
                      <TableHead>Industry Benchmark</TableHead>
                      <TableHead>Gap</TableHead>
                      <TableHead>Evidence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Communication</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={90} className="h-2 w-24" />
                          <span className="text-sm">90%</span>
                        </div>
                      </TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell className="text-green-600">+5%</TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          View Assessment
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Problem Solving</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={95} className="h-2 w-24" />
                          <span className="text-sm">95%</span>
                        </div>
                      </TableCell>
                      <TableCell>80%</TableCell>
                      <TableCell className="text-green-600">+15%</TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          View Assessment
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Teamwork</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={85} className="h-2 w-24" />
                          <span className="text-sm">85%</span>
                        </div>
                      </TableCell>
                      <TableCell>82%</TableCell>
                      <TableCell className="text-green-600">+3%</TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          View Assessment
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Leadership</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={82} className="h-2 w-24" />
                          <span className="text-sm">82%</span>
                        </div>
                      </TableCell>
                      <TableCell>78%</TableCell>
                      <TableCell className="text-green-600">+4%</TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          View Assessment
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Adaptability</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={88} className="h-2 w-24" />
                          <span className="text-sm">88%</span>
                        </div>
                      </TableCell>
                      <TableCell>75%</TableCell>
                      <TableCell className="text-green-600">+13%</TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          View Assessment
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">AI Scoring Explanation</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Key Factors Influencing Score</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Exceptional Technical Skills (95%)</p>
                          <p className="text-gray-600">Strong proficiency in JavaScript, Python, and React with multiple complex projects demonstrating applied knowledge</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Strong Problem-Solving Abilities (95%)</p>
                          <p className="text-gray-600">Demonstrated through algorithmic challenges, hackathon participation, and complex project solutions</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Impressive Portfolio (90%)</p>
                          <p className="text-gray-600">Well-documented projects with clean code, good architecture, and practical applications</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Limited Industry Experience (85%)</p>
                          <p className="text-gray-600">While strong in academic projects, could benefit from more industry internship experience</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                      <Lightbulb size={16} />
                      Improvement Recommendations
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckSquare className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Gain Industry Experience</p>
                          <p className="text-gray-700">Participate in an industry internship to apply skills in a professional environment</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckSquare className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Enhance Leadership Skills</p>
                          <p className="text-gray-700">Take on project lead roles in collaborative environments to develop leadership abilities</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckSquare className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Obtain Cloud Certification</p>
                          <p className="text-gray-700">AWS or Azure certification would complement existing technical skills</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Export Report
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setShowScoreDetailsDialog(false)}>
                  Close
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowImprovementDialog(true)}>
                  Generate Improvement Plan
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Algorithm Details Dialog */}
      <Dialog open={showAlgorithmDialog} onOpenChange={setShowAlgorithmDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>AI Scoring Algorithm Details</DialogTitle>
            <DialogDescription>
              Technical information about our AI-powered candidate scoring system
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6 py-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-3">Algorithm Overview</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Our candidate scoring system uses a gradient-boosted decision tree ensemble model (XGBoost) combined with deep learning components for specific skill assessments. The system is trained on historical placement data and continuously improved through feedback loops.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">Model Type</p>
                    <p className="text-base font-medium">Hybrid ML Ensemble</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">Training Data</p>
                    <p className="text-base font-medium">5,000+ placements</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">Features</p>
                    <p className="text-base font-medium">42 skill indicators</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">Accuracy</p>
                    <p className="text-base font-medium">90% (validated)</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-lg mb-3">Scoring Components</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Technical Skills Assessment</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <Progress value={30} className="h-2 bg-gray-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Soft Skills Evaluation</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <Progress value={25} className="h-2 bg-gray-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Academic Performance</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <Progress value={20} className="h-2 bg-gray-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Project Portfolio</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <Progress value={15} className="h-2 bg-gray-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Industry Experience</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <Progress value={10} className="h-2 bg-gray-100" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Each component is further broken down into specific metrics and indicators that are weighted based on industry relevance and predictive power.</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-lg mb-3">Technical Implementation</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Data Collection & Processing</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <p>Our system collects data from multiple sources:</p>
                        <ul className="space-y-1 list-disc pl-5">
                          <li>Academic records and transcripts</li>
                          <li>Project submissions and portfolio analysis</li>
                          <li>Technical assessment results</li>
                          <li>Soft skills evaluations from instructors</li>
                          <li>Industry experience documentation</li>
                          <li>Certification and additional qualification records</li>
                        </ul>
                        <p className="mt-2">Data preprocessing includes:</p>
                        <ul className="space-y-1 list-disc pl-5">
                          <li>Normalization of scores across different assessment types</li>
                          <li>Feature engineering to extract meaningful patterns</li>
                          <li>Missing data imputation using advanced techniques</li>
                          <li>Outlier detection and handling</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Model Architecture</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <p>Our hybrid model architecture includes:</p>
                        <ul className="space-y-1 list-disc pl-5">
                          <li><span className="font-medium">Core Scoring Engine:</span> XGBoost ensemble with 500 trees and max depth of 8</li>
                          <li><span className="font-medium">Technical Skills Assessment:</span> Domain-specific neural networks for code quality and problem-solving evaluation</li>
                          <li><span className="font-medium">Soft Skills Analysis:</span> NLP models for communication assessment and behavioral pattern recognition</li>
                          <li><span className="font-medium">Portfolio Evaluation:</span> Computer vision and code analysis models for project quality assessment</li>
                          <li><span className="font-medium">Meta-learner:</span> Combines outputs from specialized models into final score</li>
                        </ul>
                        <div className="mt-3 bg-gray-100 p-3 rounded-lg">
                          <p className="font-medium mb-1">Model Hyperparameters:</p>
                          <code className="text-xs">
                            learning_rate: 0.01<br />
                            max_depth: 8<br />
                            min_child_weight: 3<br />
                            gamma: 0.2<br />
                            subsample: 0.8<br />
                            colsample_bytree: 0.8<br />
                            objective: 'reg:squarederror'<br />
                            eval_metric: ['rmse', 'mae']
                          </code>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Training & Validation</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <p>Our model training and validation process includes:</p>
                        <ul className="space-y-1 list-disc pl-5">
                          <li><span className="font-medium">Training Data:</span> 5,000+ historical placements with known outcomes</li>
                          <li><span className="font-medium">Validation Method:</span> 5-fold cross-validation with stratification</li>
                          <li><span className="font-medium">Performance Metrics:</span> RMSE, MAE, R², and classification metrics for threshold-based decisions</li>
                          <li><span className="font-medium">Regularization:</span> L1 and L2 regularization to prevent overfitting</li>
                          <li><span className="font-medium">Retraining Schedule:</span> Quarterly retraining with new data</li>
                        </ul>
                        <div className="mt-3">
                          <p className="font-medium mb-1">Current Performance:</p>
                          <ul className="space-y-1 list-disc pl-5">
                            <li>RMSE: 0.042</li>
                            <li>MAE: 0.036</li>
                            <li>R²: 0.89</li>
                            <li>Placement Prediction Accuracy: 90%</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Fairness & Bias Mitigation</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <p>Our bias mitigation strategy includes:</p>
                        <ul className="space-y-1 list-disc pl-5">
                          <li><span className="font-medium">Pre-processing:</span> Demographic data is removed from training inputs</li>
                          <li><span className="font-medium">In-processing:</span> Adversarial debiasing techniques during model training</li>
                          <li><span className="font-medium">Post-processing:</span> Calibrated score adjustments based on fairness metrics</li>
                          <li><span className="font-medium">Regular auditing:</span> Weekly bias detection and mitigation processes</li>
                        </ul>
                        <div className="mt-3">
                          <p className="font-medium mb-1">Fairness Metrics Monitored:</p>
                          <ul className="space-y-1 list-disc pl-5">
                            <li>Statistical Parity Difference (target:  2%)</li>
                            <li>Equal Opportunity Difference (target:  3%)</li>
                            <li>Disparate Impact Ratio (target:  0.8)</li>
                            <li>Treatment Equality (target:  0.85)</li>
                            <li>Predictive Parity (target:  0.8)</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-lg mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Prediction Accuracy by Department</h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Computer Science', accuracy: 92 },
                            { name: 'Information Tech', accuracy: 90 },
                            { name: 'Data Science', accuracy: 88 },
                            { name: 'Business Admin', accuracy: 85 },
                            { name: 'Engineering', accuracy: 87 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" fontSize={10} />
                          <YAxis domain={[80, 100]} fontSize={10} />
                          <Tooltip />
                          <Bar dataKey="accuracy" name="Accuracy %" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Model Improvement Over Time</h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { month: 'Jan', accuracy: 82, rmse: 0.068 },
                            { month: 'Feb', accuracy: 84, rmse: 0.062 },
                            { month: 'Mar', accuracy: 85, rmse: 0.058 },
                            { month: 'Apr', accuracy: 87, rmse: 0.052 },
                            { month: 'May', accuracy: 88, rmse: 0.048 },
                            { month: 'Jun', accuracy: 90, rmse: 0.042 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" fontSize={10} />
                          <YAxis yAxisId="left" domain={[80, 95]} fontSize={10} />
                          <YAxis yAxisId="right" orientation="right" domain={[0.03, 0.07]} fontSize={10} />
                          <Tooltip />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="accuracy" name="Accuracy %" stroke="#10b981" strokeWidth={2} />
                          <Line yAxisId="right" type="monotone" dataKey="rmse" name="RMSE" stroke="#ef4444" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                  <Info size={16} />
                  Continuous Improvement Process
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Our AI scoring system follows a rigorous continuous improvement process to ensure accuracy, fairness, and relevance:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rounded-full bg-blue-100 p-1.5">
                        <RefreshCw className="h-4 w-4 text-blue-600" />
                      </div>
                      <h4 className="font-medium text-sm">Quarterly Retraining</h4>
                    </div>
                    <p className="text-xs text-gray-600">
                      Complete model retraining with new placement data and industry feedback every quarter
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rounded-full bg-blue-100 p-1.5">
                        <Scale className="h-4 w-4 text-blue-600" />
                      </div>
                      <h4 className="font-medium text-sm">Weekly Bias Audits</h4>
                    </div>
                    <p className="text-xs text-gray-600">
                      Regular testing for algorithmic bias across demographic groups with immediate corrections
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rounded-full bg-blue-100 p-1.5">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <h4 className="font-medium text-sm">Human Oversight</h4>
                    </div>
                    <p className="text-xs text-gray-600">
                      Placement officers review and can override scores, providing feedback to improve the system
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  View Full Technical Documentation
                </Button>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Export Documentation
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setShowAlgorithmDialog(false)}>
                  Close
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowAlgorithmDialog(false)}>
                  Configure Algorithm
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bias Audit Dialog */}
      <Dialog open={showBiasAuditDialog} onOpenChange={setShowBiasAuditDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Algorithmic Bias Audit</DialogTitle>
            <DialogDescription>
              Comprehensive analysis of fairness metrics and bias detection
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6 py-4">
              {/* Content for bias audit dialog */}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBiasAuditDialog(false)}>
              Close
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowBiasAuditDialog(false)}>
              Run Audit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Candidate Comparison Dialog */}
      <Dialog open={showComparisonDialog} onOpenChange={setShowComparisonDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Compare Candidates</DialogTitle>
            <DialogDescription>
              Select candidates to compare their skills, scores, and potential
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6 py-4">
              {/* Content for candidate comparison dialog */}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowComparisonDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowComparisonDialog(false)}>
              Compare Selected
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Improvement Plan Dialog */}
      <Dialog open={showImprovementDialog} onOpenChange={setShowImprovementDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Personalized Improvement Plan</DialogTitle>
            <DialogDescription>
              AI-generated recommendations to enhance candidate's job prospects
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6 py-4">
              {/* Content for improvement plan dialog */}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImprovementDialog(false)}>
              Close
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowImprovementDialog(false)}>
              Implement Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CandidateScoring;

