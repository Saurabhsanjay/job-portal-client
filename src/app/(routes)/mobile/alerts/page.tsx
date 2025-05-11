"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Trash2, Plus, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  useApiGet,
  useApiPost,
  useApiPut,
  useApiDelete,
} from "@/hooks/use-api-query";
import { useAuth } from "@/app/(providers)/AuthContext";
import { toast } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Interfaces for API responses and requests
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
  frequency?: string;
  isActive?: boolean;
  __v: number;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

export interface JobPutPayload {
  isActive: boolean;
}

export default function MobileAlerts() {
  const [showInfo, setShowInfo] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAlertTitle, setNewAlertTitle] = useState("");
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const { user } = useAuth();

  // API hooks
  const createJobAlertMutation = useApiPost<JobAlertResponse, JobPostPayload>();
  const updateJobAlertMutation = useApiPut<JobAlertResponse, JobPutPayload>();
  const deleteJobAlertMutation = useApiDelete<JobAlertResponse>();

  // Fetch job alerts
  const {
    data: jobAlertData,
    isLoading,
    refetch,
  } = useApiGet<JobAlertsResponse>(
    `job-alerts-for-jobseekers/get-job-alerts/${user?.id}`
  );

  // Toggle alert status
  const toggleAlert = (id: string, flag: boolean) => {
    updateJobAlertMutation.mutate(
      {
        endpoint: `job-alerts-for-jobseekers/update-job-alerts/${id}`,
        payload: { isActive: flag },
        invalidateQueries: [["update-job-alert"]],
      },
      {
        onSuccess: (response) => {
          if (response.data) {
            toast.success("Job alert updated successfully");
            refetch();
          } else if (response.error) {
            toast.error(response.error.message);
          }
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update job alert");
        },
      }
    );
  };

  // Delete alert
  const handleDelete = () => {
    if (!selectedAlertId) return;

    deleteJobAlertMutation.mutate(
      {
        endpoint: `job-alerts-for-jobseekers/delete-job-alerts/${selectedAlertId}`,
        invalidateQueries: [["delete-job-alert"]],
      },
      {
        onSuccess: (response) => {
          if (response.data) {
            toast.success("Job alert deleted successfully");
            refetch();
          } else if (response.error) {
            toast.error(response.error.message);
          }
        },
        onError: (error) => {
          toast.error(error.message || "Failed to delete job alert");
        },
      }
    );
    setOpenDeleteAlert(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-2" />
        <span>Loading job alerts...</span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Job Alerts</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-[380px]">
            <DialogHeader>
              <DialogTitle>Create New Job Alert</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newAlertTitle.trim()) {
                  toast.error("Please enter a job title");
                  return;
                }

                const payload: JobPostPayload = {
                  userId: user?.id || "",
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
                        refetch();
                      } else if (response.error) {
                        toast.error(response.error.message);
                      }
                    },
                    onError: (error) => {
                      toast.error(
                        error.message || "Failed to create job alert"
                      );
                    },
                  }
                );

                setNewAlertTitle("");
                setIsDialogOpen(false);
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="title"
                    className="text-right max-sm:text-left max-sm:col-span-4 sm:col-span-1"
                  >
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    value={newAlertTitle}
                    onChange={(e) => setNewAlertTitle(e.target.value)}
                    className="col-span-3 max-sm:col-span-4"
                    placeholder="e.g. Backend Developer"
                    required
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Alert</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {showInfo && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            Job alerts help you stay updated with new opportunities matching
            your criteria.
          </AlertDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-blue-700"
            onClick={() => setShowInfo(false)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </Alert>
      )}

      <div className="space-y-3 scroll-y max-h-[calc(100vh-200px)] overflow-y-auto">
        {jobAlertData?.data?.jobAlerts?.length > 0 ? (
          jobAlertData.data.jobAlerts.map((alert) => (
            <Card key={alert._id} className="bg-white">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{alert.title}</h3>
                    <div className="flex items-center mt-2">
                      <Bell className="h-3 w-3 text-gray-400 mr-1" />
                      <Badge variant="outline" className="text-xs font-normal">
                        {alert.frequency || "Daily"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Switch
                      checked={alert.isActive}
                      onCheckedChange={() =>
                        toggleAlert(alert._id, !alert.isActive)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 mt-2 text-red-500"
                      onClick={() => {
                        setSelectedAlertId(alert._id);
                        setOpenDeleteAlert(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium">No job alerts</h3>
            <p className="text-sm text-gray-500 mt-1">
              Create your first job alert to get notified about new
              opportunities
            </p>
            <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openDeleteAlert}>
        <AlertDialogContent className="w-[380px]">
          <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
              aria-hidden="true"
            >
              <AlertCircle className="opacity-80" size={16} strokeWidth={2} />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this job alert? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpenDeleteAlert(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
