"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Upload,
  Download,
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Shield,
  Eye,
} from "lucide-react"

export default function DocumentCompliancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedEmployers, setSelectedEmployers] = useState<string[]>([])
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  // Mock data for KYC verification
  const employers = [
    {
      id: "1",
      company: "TechCorp Solutions",
      email: "hr@techcorp.com",
      kycStatus: "verified",
      documents: ["Certificate", "Tax ID", "Registration"],
      submittedDate: "2024-01-15",
      verifiedDate: "2024-01-18",
      flags: [],
    },
    {
      id: "2",
      company: "Digital Innovations Ltd",
      email: "contact@digitalinno.com",
      kycStatus: "pending",
      documents: ["Certificate", "Tax ID"],
      submittedDate: "2024-01-20",
      verifiedDate: null,
      flags: ["missing_registration"],
    },
    {
      id: "3",
      company: "StartupHub Inc",
      email: "team@startuphub.com",
      kycStatus: "rejected",
      documents: ["Certificate"],
      submittedDate: "2024-01-10",
      verifiedDate: null,
      flags: ["invalid_documents", "incomplete_info"],
    },
    {
      id: "4",
      company: "Global Enterprises",
      email: "hr@globalent.com",
      kycStatus: "flagged",
      documents: ["Certificate", "Tax ID", "Registration", "License"],
      submittedDate: "2024-01-12",
      verifiedDate: null,
      flags: ["suspicious_activity"],
    },
  ]

  // Mock data for documents
  const documents = [
    {
      id: "1",
      name: "TechCorp_Certificate.pdf",
      type: "Certificate",
      employer: "TechCorp Solutions",
      uploadDate: "2024-01-15",
      status: "approved",
      size: "2.3 MB",
    },
    {
      id: "2",
      name: "Digital_TaxID.pdf",
      type: "Tax ID",
      employer: "Digital Innovations Ltd",
      uploadDate: "2024-01-20",
      status: "pending",
      size: "1.1 MB",
    },
    {
      id: "3",
      name: "Startup_Registration.pdf",
      type: "Registration",
      employer: "StartupHub Inc",
      uploadDate: "2024-01-10",
      status: "flagged",
      size: "3.2 MB",
    },
  ]

  // Mock data for consent management
  const consentRecords = [
    {
      id: "1",
      userEmail: "john.doe@email.com",
      userType: "Student",
      consentType: "GDPR Data Processing",
      status: "granted",
      grantedDate: "2024-01-15",
      expiryDate: "2025-01-15",
    },
    {
      id: "2",
      userEmail: "hr@techcorp.com",
      userType: "Employer",
      consentType: "DPDP Marketing",
      status: "granted",
      grantedDate: "2024-01-10",
      expiryDate: "2025-01-10",
    },
    {
      id: "3",
      userEmail: "jane.smith@email.com",
      userType: "Student",
      consentType: "GDPR Data Processing",
      status: "withdrawn",
      grantedDate: "2024-01-05",
      expiryDate: null,
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      verified: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      pending: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
      rejected: { color: "bg-red-100 text-red-800", icon: XCircle },
      flagged: { color: "bg-orange-100 text-orange-800", icon: AlertTriangle },
      approved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      granted: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      withdrawn: { color: "bg-red-100 text-red-800", icon: XCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config?.icon || AlertTriangle

    return (
      <Badge className={`${config?.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handleBulkAction = (action: string, type: string) => {
    const selectedItems = type === "employers" ? selectedEmployers : selectedDocuments
    console.log(`Bulk ${action} for ${type}:`, selectedItems)
    // Reset selections after action
    if (type === "employers") {
      setSelectedEmployers([])
    } else {
      setSelectedDocuments([])
    }
  }

  const filteredEmployers = employers.filter((employer) => {
    const matchesSearch =
      employer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || employer.kycStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-2">

      <Tabs defaultValue="kyc" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
          <TabsTrigger value="documents">Document Management</TabsTrigger>
          <TabsTrigger value="consent">Consent Management</TabsTrigger>
        </TabsList>

        {/* KYC Verification Tab */}
        <TabsContent value="kyc" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Employer KYC Verification
              </CardTitle>
              <CardDescription>Verify employer credentials and manage compliance status</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bulk Actions */}
              {selectedEmployers.length > 0 && (
                <div className="flex gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">{selectedEmployers.length} selected</span>
                  <Button size="sm" onClick={() => handleBulkAction("approve", "employers")}>
                    Bulk Approve
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("flag", "employers")}>
                    Bulk Flag
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("reject", "employers")}>
                    Bulk Reject
                  </Button>
                </div>
              )}

              {/* KYC Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedEmployers.length === filteredEmployers.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedEmployers(filteredEmployers.map((e) => e.id))
                            } else {
                              setSelectedEmployers([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Flags</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployers.map((employer) => (
                      <TableRow key={employer.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedEmployers.includes(employer.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedEmployers([...selectedEmployers, employer.id])
                              } else {
                                setSelectedEmployers(selectedEmployers.filter((id) => id !== employer.id))
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{employer.company}</TableCell>
                        <TableCell>{employer.email}</TableCell>
                        <TableCell>{getStatusBadge(employer.kycStatus)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {employer.documents.map((doc, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{employer.submittedDate}</TableCell>
                        <TableCell>
                          {employer.flags.length > 0 ? (
                            <div className="flex gap-1">
                              {employer.flags.map((flag, index) => (
                                <Badge key={index} variant="destructive" className="text-xs">
                                  {flag.replace("_", " ")}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">None</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Add Flag
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Document Management Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Management
              </CardTitle>
              <CardDescription>Upload, download, and manage compliance documents</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Upload/Download Actions */}
              <div className="flex gap-4 mb-6">
                <Button className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Bulk Upload
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Selected
                </Button>
              </div>

              {/* Bulk Actions for Documents */}
              {selectedDocuments.length > 0 && (
                <div className="flex gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">{selectedDocuments.length} selected</span>
                  <Button size="sm" onClick={() => handleBulkAction("approve", "documents")}>
                    Bulk Approve
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("flag", "documents")}>
                    Bulk Flag
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleBulkAction("delete", "documents")}>
                    Bulk Delete
                  </Button>
                </div>
              )}

              {/* Documents Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedDocuments.length === documents.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedDocuments(documents.map((d) => d.id))
                            } else {
                              setSelectedDocuments([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Employer</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedDocuments.includes(doc.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedDocuments([...selectedDocuments, doc.id])
                              } else {
                                setSelectedDocuments(selectedDocuments.filter((id) => id !== doc.id))
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.employer}</TableCell>
                        <TableCell>{doc.uploadDate}</TableCell>
                        <TableCell>{getStatusBadge(doc.status)}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Flag
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Consent Management Tab */}
        <TabsContent value="consent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                GDPR / DPDP Consent Management
              </CardTitle>
              <CardDescription>Manage user consent for data processing and privacy compliance</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Consent Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Consents</p>
                        <p className="text-2xl font-bold text-green-600">2</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Withdrawn</p>
                        <p className="text-2xl font-bold text-red-600">1</p>
                      </div>
                      <XCircle className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Expiring Soon</p>
                        <p className="text-2xl font-bold text-yellow-600">0</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Consent Records Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Email</TableHead>
                      <TableHead>User Type</TableHead>
                      <TableHead>Consent Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Granted Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consentRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.userEmail}</TableCell>
                        <TableCell>{record.userType}</TableCell>
                        <TableCell>{record.consentType}</TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                        <TableCell>{record.grantedDate}</TableCell>
                        <TableCell>{record.expiryDate || "N/A"}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Request Renewal
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="mr-2 h-4 w-4" />
                                Revoke Consent
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
