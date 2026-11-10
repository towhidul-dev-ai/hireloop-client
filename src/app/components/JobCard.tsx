// "use client"
// import { useRouter } from 'next/router';
// import React from 'react';

// const JobCard = ({job}: {job: {_id: string; title: string; companyName: string;
//     location: string; isRemote: boolean
// }}) => {
//     const router = useRouter()
//       const handleViewJobDetail = (jobId: string)=>{
//         router.push(`/browse-jobs/${jobId}`)

//   }
//     return (
//             <article
//                 key={job._id} onClick={() => handleViewJobDetail(job._id)}
//                 className="rounded-xl border border-white/10 bg-[#151517] p-5 transition hover:border-purple-500/40"
//               >
//                 <h3 className="text-lg font-semibold">{job.title}</h3>

//                 <p className="mt-2 text-sm text-gray-400">
//                   {job.companyName}
//                 </p>

//                 <div className="mt-4 flex flex-wrap gap-2">
//                   <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
//                     {job.jobType}
//                   </span>

//                   <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
//                     {job.category}
//                   </span>

//                   <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
//                     {job.isRemote ? "Remote" : "On-site"}
//                   </span>
//                 </div>

//                 <div className="mt-5 space-y-2 text-sm text-gray-400">
//                   <p>{job.location || "Location not specified"}</p>

//                   <p>
//                     Salary: {job.minSalary ?? "Negotiable"} -{" "}
//                     {job.maxSalary ?? "Negotiable"}
//                   </p>
//                 </div>
//               </article>
//     );
// };

// export default JobCard;



"use client";

import { useRouter } from "next/navigation";
import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const router = useRouter();

  const handleViewJobDetail = () => {
    router.push(`/browse-jobs/${job._id}`);
  };

  return (
    <article
      onClick={handleViewJobDetail}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleViewJobDetail();
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`View details for ${job.title}`}
      className="cursor-pointer rounded-xl border border-white/10 bg-[#151517] p-5 transition hover:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <h3 className="text-lg font-semibold">{job.title}</h3>

      <p className="mt-2 text-sm text-gray-400">{job.companyName}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
          {job.jobType}
        </span>

        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
          {job.category}
        </span>

        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
          {job.isRemote ? "Remote" : "On-site"}
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm text-gray-400">
        <p>{job.location || "Location not specified"}</p>

        <p>
          Salary: {job.minSalary ?? "Negotiable"} -{" "}
          {job.maxSalary ?? "Negotiable"}
        </p>
      </div>

      <p className="mt-5 text-sm font-medium text-purple-400">
        View Details →
      </p>
    </article>
  );
};

export default JobCard;
