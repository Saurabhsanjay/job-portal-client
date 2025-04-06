'use client'
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
import { CircleAlert } from "lucide-react";
import { useApiPost } from "@/hooks/use-api-query";
import { useAuth } from "@/app/(providers)/AuthContext";
import toast from "react-hot-toast";
// import { Metadata } from "next";
// export const metadata: Metadata = {
//     title: "Delete Account",
//     description: "Delete your account permanently",
// }

interface deleteAccountInput{
    userId:string
}

interface deleteAccountResponse {
    status: "SUCCESS" | "FAILURE"; // Assuming other statuses might exist
    statusCode: number;
    message: string;
    formattedMessage: string;
    data: null;
}

export default function DeleteAccount() {

    const {user,logout}=useAuth()

    const deleteAccountMutation = useApiPost<deleteAccountResponse, deleteAccountInput>();

    const handleDelete = () => {
        deleteAccountMutation.mutate({
            endpoint: "users/delete-user-profile",
            payload: {
                userId: user?.id || "",
            },
        },
        {
            onSuccess: (response) => {
                if (response.data) {
                    toast.success("Account Deleted Successfully");
                    logout()
                } else if (response.error) {
                  toast.error(response?.error?.message||"Something Went Wrong");
                }
              },
              onError: (error) => {
                toast.error(error?.message||"Something Went Wrong");
              },
        }
    );
    }

    return (
        <AlertDialog open>
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
                    <AlertDialogCancel onClick={() => window.history.back()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-500">Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

