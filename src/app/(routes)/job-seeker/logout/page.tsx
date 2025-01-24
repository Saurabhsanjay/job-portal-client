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

export default function DeleteAccount() {
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
                            Do you want to log out? You will need to log in again to access your account.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500">Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

