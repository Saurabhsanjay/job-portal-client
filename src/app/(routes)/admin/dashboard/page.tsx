"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, FileText, ShieldCheck, Mail } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts"
import { Progress } from "@/components/ui/progress"

const userRegistrationData = [
  { day: "Mon", jobSeekers: 45, employers: 12 },
  { day: "Tue", jobSeekers: 52, employers: 15 },
  { day: "Wed", jobSeekers: 49, employers: 10 },
  { day: "Thu", jobSeekers: 63, employers: 18 },
  { day: "Fri", jobSeekers: 58, employers: 14 },
  { day: "Sat", jobSeekers: 32, employers: 8 },
  { day: "Sun", jobSeekers: 28, employers: 6 },
]

const platformPerformance = [
  { title: "Job Postings", value: 1245, increase: 12 },
  { title: "Applications", value: 8642, increase: 18 },
  { title: "Placements", value: 386, increase: 9 },
]

const recentFraudAlerts = [
  {
    id: 1,
    type: "Fake Profile",
    entity: "Employer",
    name: "Tech Innovations LLC",
    severity: "High",
    timestamp: "2024-03-14T09:23:00",
    status: "Pending",
  },
  {
    id: 2,
    type: "Suspicious Job Posting",
    entity: "Job Post",
    name: "Remote Developer - Urgent Hire",
    severity: "Medium",
    timestamp: "2024-03-14T11:45:00",
    status: "Investigating",
  },
  {
    id: 3,
    type: "Multiple Account Creation",
    entity: "Job Seeker",
    name: "IP Address 192.168.1.45",
    severity: "Low",
    timestamp: "2024-03-13T16:30:00",
    status: "Resolved",
  },
]

const topInstitutions = [
  {
    id: 1,
    name: "Tech University",
    placements: 124,
    students: 450,
    placementRate: 92,
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Business Academy",
    placements: 98,
    students: 380,
    placementRate: 86,
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Design Institute",
    placements: 76,
    students: 320,
    placementRate: 78,
    avatar: "/placeholder.svg",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Virtual Job Fair",
    date: "2024-03-20T10:00:00",
    participants: 450,
    type: "Online",
  },
  {
    id: 2,
    title: "Tech Skills Workshop",
    date: "2024-03-22T14:30:00",
    participants: 120,
    type: "Hybrid",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8 bg-gray-50 md:p-2 rounded-xl">
      {/* Top Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Users", value: "12,845", subtext: "1,245 new this month", icon: Users, color: "blue" },
          {
            title: "Active Job Postings",
            value: "3,186",
            subtext: "186 new this week",
            icon: FileText,
            color: "green",
          },
          {
            title: "Successful Placements",
            value: "386",
            subtext: "24 new this week",
            icon: TrendingUp,
            color: "purple",
          },
          {
            title: "Fraud Alerts",
            value: "18",
            subtext: "5 high priority",
            icon: ShieldCheck,
            color: "red",
          },
        ].map((item, index) => (
          <Card
            key={index}
            className={`bg-white border-l-4 border-${item.color}-500 shadow-sm hover:shadow-md transition-shadow`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className={`h-4 w-4 text-${item.color}-500`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Registration Trends and Platform Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* User Registration Trends */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">User Registration Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userRegistrationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jobSeekers" name="Job Seekers" fill="#3b82f6" />
                  <Bar dataKey="employers" name="Employers" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {platformPerformance.map((stat, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">{stat.increase}%</span>
                    </div>
                  </div>
                  <Progress value={stat.increase * 5} className="h-1 mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fraud Alerts */}
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">Recent Fraud Alerts</CardTitle>
            <Button variant="outline">View All Alerts</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFraudAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="space-y-1">
                  <h3 className="font-medium">{alert.type}</h3>
                  <div className="text-sm text-gray-500 flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {alert.entity}: {alert.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {new Date(alert.timestamp).toLocaleDateString()}{" "}
                      {new Date(alert.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  <Badge
                    variant={'secondary'}
                  >
                    {alert.severity}
                  </Badge>
                  <Badge variant={alert.status === "Resolved" ? "success" : "default"}>{alert.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Institutions and Upcoming Events */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Institutions */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Top Performing Institutions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topInstitutions.map((institution) => (
                <div
                  key={institution.id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={institution.avatar} />
                      <AvatarFallback>{institution.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{institution.name}</p>
                      <p className="text-sm text-gray-500">{institution.students} students</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                    <div className="text-right">
                      <div className="font-medium">{institution.placements} placements</div>
                      <div className="text-sm text-green-600">{institution.placementRate}% success rate</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.participants} registered participants</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <Badge>{event.type}</Badge>
                </div>
              ))}
              <div className="flex justify-center mt-4">
                <Button variant="outline">Manage All Events</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Campaign Performance */}
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">Email Campaign Performance</CardTitle>
            <Button variant="outline">Create Campaign</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { name: "Week 1", sent: 5000, opened: 3200, clicked: 1800 },
                  { name: "Week 2", sent: 6500, opened: 4100, clicked: 2300 },
                  { name: "Week 3", sent: 5800, opened: 3700, clicked: 2100 },
                  { name: "Week 4", sent: 7200, opened: 4800, clicked: 2700 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sent" stroke="#8884d8" name="Emails Sent" />
                <Line type="monotone" dataKey="opened" stroke="#82ca9d" name="Emails Opened" />
                <Line type="monotone" dataKey="clicked" stroke="#ffc658" name="Clicked Links" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 mx-auto text-purple-500 mb-1" />
              <p className="text-sm font-medium">Sent</p>
              <p className="text-xl font-bold">24,500</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">Open Rate</p>
              <p className="text-xl font-bold">64.2%</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">Click Rate</p>
              <p className="text-xl font-bold">36.7%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

