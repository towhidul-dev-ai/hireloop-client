

// "use client";

// import { applyToJob } from "@/lib/actions/jobs";
// import { useSession } from "@/lib/auth-client";

// import { useRouter } from "next/navigation";

// interface ApplyNowButtonProps {
//   jobId: string;
// }

// const ApplyNowButton = ({ jobId }: ApplyNowButtonProps) => {
//   const { data: session, isPending } = useSession();
//   const router = useRouter();

//   const handleApplyNow = async () => {
//     if (isPending) return;

//     if (!session?.user) {
//      router.push(
//   `/sign-in?redirectTo=${encodeURIComponent(`${jobId}`)}`);
//     }
//     else if(user.role === 'seeker'){
//         // save the application to the database
//         // TODO: only send jobId and userId or email address for the application
//         console.log("save the application to the database")
//         const application = {
//             jobId: job._id,
//             userId: user.id,
//             email: user.email,
//             jobTitle: job.title,
//             companyName: job.CompanyName,
//         }
//         const result = await applyToJob(application)
//         if(result.insertId){
//             console.log("Application Submission Successfully")
//             router.push("/browse-jobs")
//         }
//     }
//     else{
//         console.log('user is not a job seeker')
//     }
   
//   };

//   return (
//     <button
//       type="button"
//       onClick={handleApplyNow}
//       disabled={isPending}
//       className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
//     >
//       {isPending ? "Checking..." : "Apply Now"}
//       <span className="ml-2">→</span>
//     </button>
//   );
// };

// export default ApplyNowButton;



"use client";

import { applyToJob } from "@/lib/actions/jobs";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ApplyNowButtonProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
}

const ApplyNowButton = ({
  jobId,
  jobTitle,
  companyName,
}: ApplyNowButtonProps) => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleApplyNow = async () => {
    if (isPending || isSubmitting) return;

    const user = session?.user;

    if (!user) {
      router.push(
        `/sign-in?redirectTo=${encodeURIComponent(`/browse-jobs/${jobId}`)}`
      );
      return;
    }

    if (user.role !== "seeker") {
      setError("Only job seekers can apply for jobs.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const application = {
        jobId,
        userId: user.id,
        email: user.email,
        jobTitle,
        companyName,
      };

      const result = await applyToJob(application);

      if (result?.insertedId) {
        router.push("/dashboard/seeker/applications");
        router.refresh();
      } else {
        setError(result?.message || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Application submission error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleApplyNow}
        disabled={isPending || isSubmitting}
        className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending
          ? "Checking..."
          : isSubmitting
            ? "Submitting..."
            : "Apply Now"}
        <span className="ml-2">→</span>
      </button>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default ApplyNowButton;

