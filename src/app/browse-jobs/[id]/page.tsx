// import React from 'react';

// const JobDetailsPage = ({params}: {params: {id: string}}) => {
//     const {id} = params
//     console.log(id)
//     return (
//         <div>
//             JobDetailsPage
//         </div>
//     );
// };

// export default JobDetailsPage;


// import { Suspense } from "react";
// import { notFound } from "next/navigation";
// import { getJobById } from "@/lib/api/jobs";

// interface JobDetailsPageProps {
//   params: Promise<{ id: string }>;
// }

// const JobContent = async ({ params }: JobDetailsPageProps) => {
//   const { id } = await params;

//   let job;

//   try {
//     job = await getJobById(id);
//   } catch (error) {
//     if (error instanceof Error && error.message === "Job not found") {
//       notFound();
//     }

//     throw error;
//   }

//   return (
//     <main className="container mx-auto px-4 py-10">
//       <div className="mx-auto max-w-4xl rounded-xl border p-6">
//         <h1 className="text-3xl font-bold">{job.title}</h1>
//         <p className="mt-2 text-lg">{job.companyName}</p>

//         <div className="mt-6 space-y-3">
//           <p><strong>Category:</strong> {job.category}</p>
//           <p><strong>Job Type:</strong> {job.jobType}</p>
//           <p>
//             <strong>Workplace:</strong>{" "}
//             {job.isRemote ? "Remote" : "On-site"}
//           </p>
//           <p><strong>Location:</strong> {job.location}</p>
//           <p>
//             <strong>Salary:</strong> {job.minSalary} - {job.maxSalary}
//           </p>
//           <p><strong>Deadline:</strong> {job.deadline}</p>
//         </div>

//         <section className="mt-8">
//           <h2 className="text-xl font-semibold">Responsibilities</h2>
//           <p className="mt-2">{job.responsibilities}</p>
//         </section>

//         <section className="mt-6">
//           <h2 className="text-xl font-semibold">Qualifications</h2>
//           {/* <p className="mt-2">{job.qualifications}</p> */}
//         </section>
//       </div>
//     </main>
//   );
// };

// const JobDetailsPage = ({ params }: JobDetailsPageProps) => {
//   return (
//     <Suspense
//       fallback={
//         <div className="p-10 text-center">
//           Loading job details...
//         </div>
//       }
//     >
//       <JobContent params={params} />
//     </Suspense>
//   );
// };

// export default JobDetailsPage;



import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getJobById } from "@/lib/api/jobs";
import JobDetails from "@/app/components/jobs/JobDetails";


interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

const JobDetailsContent = async ({
  params,
}: JobDetailsPageProps) => {
  const { id } = await params;

  let job;

  try {
    job = await getJobById(id);
  } catch (error) {
    if (error instanceof Error && error.message === "Job not found") {
      notFound();
    }

    throw error;
  }

  return <JobDetails job={job} />;
};

const JobDetailsPage = ({ params }: JobDetailsPageProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0b0d12] text-gray-400">
          Loading job details...
        </div>
      }
    >
      <JobDetailsContent params={params} />
    </Suspense>
  );
};

export default JobDetailsPage;
