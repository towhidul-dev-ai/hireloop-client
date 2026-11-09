// // import { Trash2Icon } from "lucide-react"

// // import {
// //   AlertDialog,
// //   AlertDialogAction,
// //   AlertDialogCancel,
// //   AlertDialogContent,
// //   AlertDialogDescription,
// //   AlertDialogFooter,
// //   AlertDialogHeader,
// //   AlertDialogMedia,
// //   AlertDialogTitle,
// //   AlertDialogTrigger,
// // } from "@/components/ui/alert-dialog"
// // import { Button } from "@/components/ui/button"
// // import type { JobData } from "../dashboard/recruiter/jobs/page"

// // export function DeleteJobDialog({job}: {job: JobData}) {
// //   return (
// //     <AlertDialog>
// //       <AlertDialogTrigger
// //         render={<Button variant="destructive">Delete Job</Button>}
// //       />
// //       <AlertDialogContent size="sm">
// //         <AlertDialogHeader>
// //           <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
// //             <Trash2Icon />
// //           </AlertDialogMedia>
// //           <AlertDialogTitle>Delete Job?</AlertDialogTitle>
// //           <AlertDialogDescription>
// //             This will permanently delete this chat conversation. View{" "}
// //             <a href="#">Settings</a> delete any memories saved during this chat.
// //           </AlertDialogDescription>
// //         </AlertDialogHeader>
// //         <AlertDialogFooter>
// //           <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
// //           <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
// //         </AlertDialogFooter>
// //       </AlertDialogContent>
// //     </AlertDialog>
// //   )
// // }


// "use client";

// import { useState } from "react";
// import { Trash2Icon, Loader2 } from "lucide-react";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogMedia,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// import { Button } from "@/components/ui/button";
// import type { deleteJob } from "@/lib/actions/jobs";
// import { toast, Toaster } from "@/components/ui/toast"
// import { useRouter } from "next/router";

// interface DeleteJobDialogProps {
//   job: {
//     _id: string;
//     title: string;
//   };
//   onDeleted: (jobId: string) => void;
// }

// export function DeleteJobDialog({
//   job,
//   onDeleted,
// }: DeleteJobDialogProps) {
//     const [open, setOpen] = useState(false)
//     const router = useRouter()
//   const [deleting, setDeleting] = useState(false);
//   const [error, setError] = useState("");

//   const handleDelete = async () => {
//     try {
//       setDeleting(true);
//       setError("");

//       const res = await deleteJob(job._id)
//       console.log('deleting', job._id, res)
//       if(res.deletedCount){
//         setOpen(false)
//         toast.add({
//   title: "Event created",
//   description: "Sunday, December 3 at 9:00 AM",
// })
// router.re
//       }


//     //   const response = await fetch(`/jobs/${job._id}`, {
//     //     method: "DELETE",
//     //   });

//     //   const result = await response.json();

//     //   if (!response.ok) {
//     //     throw new Error(result.message || "Failed to delete job.");
//     //   }

//     //   onDeleted(job._id);
//     } catch (err) {
//       console.error("Delete job error:", err);

//       setError(
//         err instanceof Error ? err.message : "Something went wrong."
//       );
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger
//         render={
//           <Button
//             variant="destructive"
//             size="sm"
//             className="gap-2"
//           >
//             <Trash2Icon className="h-4 w-4" />
//             Delete
//           </Button>
//         }
//       />

//       <AlertDialogContent size="sm">
//         <AlertDialogHeader>
//           <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20">
//             <Trash2Icon />
//           </AlertDialogMedia>

//           <AlertDialogTitle>
//             Delete Job?
//           </AlertDialogTitle>

//           <AlertDialogDescription>
//             Are you sure you want to delete{" "}
//             <strong>{job.title}</strong>?
//             This action cannot be undone.
//           </AlertDialogDescription>
//         </AlertDialogHeader>

//         {error && (
//           <p className="text-sm text-red-500">{error}</p>
//         )}

//         <AlertDialogFooter>
//           <AlertDialogCancel variant="outline" disabled={deleting}>
//             Cancel
//           </AlertDialogCancel>

//           <AlertDialogAction
//             variant="destructive"
//             disabled={deleting}
//             onClick={(event) => {
//               event.preventDefault();
//               void handleDelete();
//             }}
//           >
//             {deleting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Deleting...
//               </>
//             ) : (
//               "Delete"
//             )}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2Icon, Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { deleteJob } from "@/lib/actions/jobs";
import { toast } from "@/components/ui/toast";

interface DeleteJobDialogProps {
  job: {
    _id: string;
    title: string;
  };
  onDeleted?: (jobId: string) => void;
}

export function DeleteJobDialog({
  job,
  onDeleted,
}: DeleteJobDialogProps) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError("");

      const res = await deleteJob(job._id);

      if (!res?.deletedCount) {
        throw new Error("Failed to delete job. Please try again.");
      }

      // Update parent component
      onDeleted?.(job._id);

      // Close dialog
      setOpen(false);

      // Show success message
      toast.add({
        title: "Job deleted successfully",
        description: `${job.title} has been removed.`,
      });

      // Refresh server components
      router.refresh();
    } catch (err) {
      console.error("Delete job error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while deleting the job."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            size="sm"
            className="gap-2"
          >
            <Trash2Icon className="h-4 w-4" />
            Delete
          </Button>
        }
      />

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20">
            <Trash2Icon />
          </AlertDialogMedia>

          <AlertDialogTitle>
            Delete Job?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong className="text-foreground">
              {job.title}
            </strong>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel
            variant="outline"
            disabled={deleting}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            disabled={deleting}
            onClick={(event) => {
              event.preventDefault();
              void handleDelete();
            }}
          >
            {deleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2Icon className="mr-2 h-4 w-4" />
                Delete Job
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}