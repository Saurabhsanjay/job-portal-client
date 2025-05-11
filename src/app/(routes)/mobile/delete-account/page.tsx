"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft, Loader2, AlertTriangle } from "lucide-react";
import { useAuth } from "@/app/(providers)/AuthContext";
import { useApiPost } from "@/hooks/use-api-query";
import toast from "react-hot-toast";

interface DeleteAccountInput {
  userId: string;
}

interface DeleteAccountResponse {
  status: "SUCCESS" | "FAILURE";
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: null;
}

export default function MobileDeleteAccount() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteAccountMutation = useApiPost<
    DeleteAccountResponse,
    DeleteAccountInput
  >();

  const handleDelete = () => {
    setIsDeleting(true);
    deleteAccountMutation.mutate(
      {
        endpoint: "users/delete-user-profile",
        payload: {
          userId: user?.id || "",
        },
      },
      {
        onSuccess: (response) => {
          if (response.data) {
            toast.success("Account deleted successfully");
            setTimeout(() => {
              logout();
              router.push("/login");
            }, 1500);
          } else if (response.error) {
            toast.error(response?.error?.message || "Something went wrong");
            setIsDeleting(false);
          }
        },
        onError: (error) => {
          toast.error(error?.message || "Something went wrong");
          setIsDeleting(false);
        },
      }
    );
  };

  const handleCancel = () => {
    router.push("/mobile/profile");
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={handleCancel}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Delete Account</h1>
      </div>

      <Card className="bg-white">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>

          <h2 className="text-xl font-semibold mb-2">Delete Your Account?</h2>
          <p className="text-gray-600 mb-6">
            This action cannot be undone. All your data will be permanently
            deleted.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Account"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isDeleting}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">
            What happens when you delete your account:
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <Trash2 className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
              Your profile and personal information will be permanently deleted
            </li>
            <li className="flex items-start">
              <Trash2 className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
              Your job applications and saved jobs will be removed
            </li>
            <li className="flex items-start">
              <Trash2 className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
              Your resume will be deleted from our system
            </li>
            <li className="flex items-start">
              <Trash2 className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
              You will lose access to all messages with recruiters
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
