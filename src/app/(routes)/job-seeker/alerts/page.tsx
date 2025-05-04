"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bell, CircleAlert, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useApiPost, useApiGet, useApiPut, useApiDelete } from "@/hooks/use-api-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useAuth } from "@/app/(providers)/AuthContext";
import { toast } from "react-hot-toast";

// Mock data for job alerts
const jobAlerts = [
  {
    id: 1,
    title: "UI/UX Designer",
    location: "London, UK",
    salary: "$50k - $70k",
    companies: ["Google", "Meta", "Apple"],
    frequency: "Daily",
    isActive: true,
  },
  {
    id: 2,
    title: "Frontend Developer",
    location: "Remote",
    salary: "$70k - $90k",
    companies: ["Amazon", "Microsoft", "Twitter"],
    frequency: "Weekly",
    isActive: true,
  },
  {
    id: 3,
    title: "Product Manager",
    location: "New York, US",
    salary: "$90k - $120k",
    companies: ["Stripe", "Square", "Shopify"],
    frequency: "Daily",
    isActive: false,
  },
];

export interface JobPostPayload {
  userId: string;
  title: string;
}

export interface JobAlertResponse {
  status: string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: JobAlertData;
}

export interface JobAlertData {
  _id: string;
  userId: string;
  title: string;
  __v: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface JobAlertsResponse {
  status: string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: {
    jobAlerts: JobAlert[];
    jobAlertsCount: number;
  };
}

export interface JobAlert {
  _id: string;
  userId: string;
  title: string;
  __v: number;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

export interface JobPutPayload {
  isActive: boolean;
}

export default function JobAlerts() {
  const [alerts, setAlerts] = useState(jobAlerts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAlertTitle, setNewAlertTitle] = useState("");
  const [openDeleteAlert,setOpenDeleteAlert]=useState(false)
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const { user } = useAuth();

  const createJobAlertMutation = useApiPost<JobAlertResponse, JobPostPayload>();

  const updateJobAlertMutation = useApiPut<JobAlertResponse, JobPutPayload>();

  const deleteJobAlertMutation = useApiDelete<JobAlertResponse>();

  const { data: jobAlertData,refetch } = useApiGet<JobAlertsResponse>(
    `job-alerts-for-jobseekers/get-job-alerts/${user?.id}`
  );

  console.log("jobAlertData-------->", jobAlertData);

  const toggleAlert = (id: string,flag: boolean) => {
    // setAlerts(
    //   alerts.map((alert) =>
    //     alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    //   )
    // );
    updateJobAlertMutation.mutate(
      {
        endpoint: `job-alerts-for-jobseekers/update-job-alerts/${id}`,
        payload: {isActive: flag}, // Replace with actual payload
        invalidateQueries: [["update-job-alert"]],
      },
      {
        onSuccess: (response) => {
          if (response.data) {
            toast.success("Job alert updated successfully");
            // refetch()
          } else if (response.error) {
            toast.error(response.error.message);
          }
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update job alert");
        },
      }
    );
    refetch()
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAlertTitle.trim()) return;

    // const newAlert = {
    //   id: Math.max(0, ...alerts.map((a) => a.id)) + 1,
    //   title: newAlertTitle,
    //   location: "Remote",
    //   salary: "Competitive",
    //   companies: [],
    //   frequency: "Daily",
    //   isActive: true,
    // };

    // setAlerts([...alerts, newAlert]);

    const payload: JobPostPayload = {
      userId: user?.id || "", // Replace with actual user ID
      title: newAlertTitle,
    };

    createJobAlertMutation.mutate(
      {
        endpoint: "job-alerts-for-jobseekers/create-job-alerts",
        payload: payload,
        invalidateQueries: [["create-job-alert"]],
      },
      {
        onSuccess: (response) => {
          if (response.data) {
            toast.success("Job alert created successfully");
            // refetch()
          } else if (response.error) {
            toast.error(response.error.message);
          }
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create job alert");
        },
      }
    );
    refetch()
    // Reset form and close modal
    setNewAlertTitle("");
    setIsModalOpen(false);

    // Here you would typically call your API
    // Example: useApiPost("/api/job-alerts", { title: newAlertTitle })
  };

  const handleDelete=()=>{
    deleteJobAlertMutation.mutate(
      {
        endpoint: `job-alerts-for-jobseekers/delete-job-alerts/${selectedAlertId}`,
        invalidateQueries: [["delete-job-alert"]],
      },
      {
        onSuccess: (response) => {
          if (response.data) {
            toast.success("Job alert deleted successfully");
            // refetch()
          } else if (response.error) {
            toast.error(response.error.message);
          }
        },
        onError: (error) => {
          toast.error(error.message || "Failed to delete job alert");
        },
      }
    );
    refetch()
    setOpenDeleteAlert(false)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-sm border-none">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold text-gray-900">Job Alerts</h2>
            <p className="text-sm text-gray-500 mt-1">
              Get notified when new jobs match your preferences
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Bell className="mr-2 h-4 w-4" />
            Create New Alert
          </Button>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Job Alert</TableHead>
                <TableHead className="w-[300px]">Frequency</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobAlertData?.data?.jobAlerts?.length ? (
                jobAlertData?.data?.jobAlerts?.map((alert,index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{alert.title}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Badge variant="secondary">{alert.frequency}</Badge>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={alert?.isActive}
                        onCheckedChange={() => toggleAlert(alert?._id,!alert?.isActive)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                          onClick={()=>{
                            setSelectedAlertId(alert?._id)
                            setOpenDeleteAlert(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No Job Alerts To Show
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="font-medium">{alert.title}</div>
                  <Switch
                    checked={alert.isActive}
                    onCheckedChange={() => toggleAlert(alert._id,!alert?.isActive)}
                  />
                </div>
                <div className="space-y-1 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Bell className="h-3 w-3" />
                    {alert.frequency}
                  </div>
                  <div className="flex items-center justify-end mt-1 pt-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                      onClick={()=>{
                        setSelectedAlertId(alert?._id)
                        setOpenDeleteAlert(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Create New Alert Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Job Alert</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Job Title
                </Label>
                <Input
                  id="title"
                  value={newAlertTitle}
                  onChange={(e) => setNewAlertTitle(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g. Backend Developer"
                  required
                />
              </div>
            </div>
            <AlertDialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Create Alert</Button>
            </AlertDialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={openDeleteAlert}>
            <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                    <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
                        aria-hidden="true"
                    >
                        <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete your account? All your data will be removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => {
                      setOpenDeleteAlert(false)
                    }}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-500">Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
