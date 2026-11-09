// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//   BriefcaseBusiness,
//   Plus,
//   Search,
//   MapPin,
//   CalendarDays,
//   Users,
//   Loader2,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
// } from "@/components/ui/card";
// import { getjobs } from "@/lib/api/jobs";
// import { DeleteJobDialog } from "@/app/components/DeleteJobDialog";

// // import { getJobs } from "@/services/job";

// type JobType = "full-time" | "part-time" | "contract" | "internship";

// export interface JobData {
//   title: string;
//   companyName: string;
//   category: string;
//   jobType: JobType;
//   isRemote: boolean;
//   location: string;
//   deadline: string;
//   minSalary: string;
//   maxSalary: string;
//   salaryFrequency: string;
//   responsibilities: string;
//   requirements: string;
// }

// export interface Job extends JobData {
//   _id: string;
//   status?: "active" | "draft" | "closed";
//   applicants?: number;
//   createdAt?: string;
// }

// const ManageJobsPage = () => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const result = await getjobs();

//         setJobs(Array.isArray(result) ? result : result.jobs || []);
//       } catch (err) {
//         console.error("Failed to fetch jobs:", err);
//         setError("Unable to load jobs. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   const filteredJobs = jobs.filter((job) => {
//     const search = searchTerm.toLowerCase();

//     return (
//       job.title.toLowerCase().includes(search) ||
//       job.companyName.toLowerCase().includes(search) ||
//       job.category.toLowerCase().includes(search) ||
//       job.location.toLowerCase().includes(search)
//     );
//   });

//   const activeJobs = jobs.filter(
//     (job) => job.status?.toLowerCase() === "active"
//   ).length;

//   const totalApplicants = jobs.reduce(
//     (total, job) => total + (job.applicants || 0),
//     0
//   );

//   const formatSalary = (job: Job) => {
//     if (!job.minSalary && !job.maxSalary) return "Not specified";

//     return `${job.minSalary || "0"} - ${job.maxSalary || "Negotiable"} / ${
//       job.salaryFrequency || "period"
//     }`;
//   };

//   const formatDate = (date: string) => {
//     if (!date) return "Not specified";

//     return new Date(date).toLocaleDateString("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="min-h-screen space-y-8 bg-[#0D0D10] p-4 text-white sm:p-6 lg:p-8">
//       {/* Header */}
//       <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
//         <div>
//           <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
//             <span>Dashboard</span>
//             <span>/</span>
//             <span>Recruiter</span>
//             <span>/</span>
//             <span className="text-[#8B83FF]">Manage Jobs</span>
//           </div>

//           <h1 className="text-2xl font-semibold sm:text-3xl">
//             Manage Jobs
//           </h1>

//           <p className="mt-2 text-sm text-gray-400">
//             Manage and monitor your job postings.
//           </p>
//         </div>

//         <Link href="/dashboard/recruiter/jobs/new">
//           <Button className="w-full bg-[#5C53FE] text-white hover:bg-[#4B43E8] sm:w-auto">
//             <Plus className="mr-2 h-4 w-4" />
//             Post a New Job
//           </Button>
//         </Link>
//       </div>

//       {/* Statistics */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
//         <StatCard
//           title="Total Jobs"
//           value={jobs.length}
//           icon={<BriefcaseBusiness className="h-5 w-5" />}
//         />

//         <StatCard
//           title="Active Jobs"
//           value={activeJobs}
//           icon={<BriefcaseBusiness className="h-5 w-5" />}
//         />

//         <StatCard
//           title="Total Applicants"
//           value={totalApplicants}
//           icon={<Users className="h-5 w-5" />}
//         />
//       </div>

//       {/* Jobs Table */}
//       <Card className="border border-white/10 bg-[#141418] text-white shadow-none">
//         <CardContent className="space-y-5 p-4 sm:p-6">
//           <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//             <div>
//               <h2 className="text-lg font-semibold">All Job Postings</h2>
//               <p className="mt-1 text-sm text-gray-400">
//                 View and manage your published jobs.
//               </p>
//             </div>

//             <div className="relative w-full sm:max-w-xs">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

//               <Input
//                 placeholder="Search jobs..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border-white/10 bg-[#0D0D10] pl-9 text-white placeholder:text-gray-500 focus-visible:ring-[#5C53FE]"
//               />
//             </div>
//           </div>

//           {loading ? (
//             <div className="flex min-h-60 items-center justify-center gap-3 text-gray-400">
//               <Loader2 className="h-5 w-5 animate-spin" />
//               Loading jobs...
//             </div>
//           ) : error ? (
//             <div className="flex min-h-60 items-center justify-center text-sm text-red-400">
//               {error}
//             </div>
//           ) : filteredJobs.length === 0 ? (
//             <div className="flex min-h-60 flex-col items-center justify-center text-center">
//               <div className="mb-4 rounded-full bg-[#5C53FE]/10 p-4">
//                 <BriefcaseBusiness className="h-8 w-8 text-[#8B83FF]" />
//               </div>

//               <h3 className="text-lg font-medium">
//                 {searchTerm ? "No matching jobs found" : "No jobs posted yet"}
//               </h3>

//               <p className="mt-2 max-w-sm text-sm text-gray-400">
//                 {searchTerm
//                   ? "Try searching with a different keyword."
//                   : "Create your first job posting to start receiving applications."}
//               </p>

//               {!searchTerm && (
//                 <Link href="/dashboard/recruiter/jobs/new" className="mt-5">
//                   <Button className="bg-[#5C53FE] text-white hover:bg-[#4B43E8]">
//                     <Plus className="mr-2 h-4 w-4" />
//                     Create Job
//                   </Button>
//                 </Link>
//               )}
//             </div>
//           ) : (
//             <div className="w-full overflow-x-auto">
//               <table className="w-full min-w-[1050px] border-collapse text-left">
//                 <thead>
//                   <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-gray-500">
//                     <th className="px-4 py-4 font-medium">Job Title</th>
//                     <th className="px-4 py-4 font-medium">Category</th>
//                     <th className="px-4 py-4 font-medium">Job Type</th>
//                     <th className="px-4 py-4 font-medium">Location</th>
//                     <th className="px-4 py-4 font-medium">Salary</th>
//                     <th className="px-4 py-4 font-medium">Applicants</th>
//                     <th className="px-4 py-4 font-medium">Deadline</th>
//                     <th className="px-4 py-4 font-medium">Status</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filteredJobs.map((job) => (
//                     <tr
//                       key={job._id}
//                       className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
//                     >
//                       <td className="px-4 py-5">
//                         <div className="font-medium text-white">
//                           {job.title}
//                         </div>
//                         <div className="mt-1 text-xs text-gray-500">
//                           {job.companyName}
//                         </div>
//                       </td>

//                       <td className="px-4 py-5 text-sm text-gray-300">
//                         {job.category}
//                       </td>

//                       <td className="px-4 py-5">
//                         <Badge className="border border-[#5C53FE]/20 bg-[#5C53FE]/10 text-[#A9A3FF] hover:bg-[#5C53FE]/10">
//                           {job.jobType}
//                         </Badge>
//                       </td>

//                       <td className="px-4 py-5">
//                         <div className="flex items-center gap-2 text-sm text-gray-300">
//                           <MapPin className="h-4 w-4 text-gray-500" />
//                           {job.isRemote ? "Remote" : job.location}
//                         </div>
//                       </td>

//                       <td className="px-4 py-5 text-sm text-gray-300">
//                         {formatSalary(job)}
//                       </td>

//                       <td className="px-4 py-5 text-sm text-gray-300">
//                         {job.applicants || 0}
//                       </td>

//                       <td className="px-4 py-5">
//                         <div className="flex items-center gap-2 text-sm text-gray-300">
//                           <CalendarDays className="h-4 w-4 text-gray-500" />
//                           {formatDate(job.deadline)}
//                         </div>
//                       </td>

//                       <td className="px-4 py-5">
//                         <Badge
//                           className={
//                             job.status?.toLowerCase() === "active"
//                               ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
//                               : job.status?.toLowerCase() === "closed"
//                                 ? "border border-red-500/20 bg-red-500/10 text-red-400"
//                                 : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
//                           }
//                         >
//                           {job.status || "Draft"}
//                         </Badge>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <DeleteJobDialog job={job}></DeleteJobDialog>
//             </div>
//           )}

//           {!loading && !error && filteredJobs.length > 0 && (
//             <div className="border-t border-white/10 pt-4 text-sm text-gray-500">
//               Showing {filteredJobs.length} of {jobs.length} jobs
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// interface StatCardProps {
//   title: string;
//   value: number;
//   icon: React.ReactNode;
// }

// const StatCard = ({ title, value, icon }: StatCardProps) => {
//   return (
//     <Card className="border border-white/10 bg-[#141418] text-white shadow-none">
//       <CardContent className="flex items-center justify-between p-5">
//         <div>
//           <p className="text-sm text-gray-400">{title}</p>
//           <h3 className="mt-2 text-2xl font-semibold">{value}</h3>
//         </div>

//         <div className="rounded-xl bg-[#5C53FE]/10 p-3 text-[#8B83FF]">
//           {icon}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ManageJobsPage;



"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  BriefcaseBusiness,
  Plus,
  Search,
  MapPin,
  CalendarDays,
  Users,
  Loader2,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { getjobs } from "@/lib/api/jobs";
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog";

type JobType = "full-time" | "part-time" | "contract" | "internship";

export interface JobData {
  title: string;
  companyName: string;
  category: string;
  jobType: JobType;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  salaryFrequency: string;
  responsibilities: string;
  requirements: string;
}

export interface Job extends JobData {
  _id: string;
  status?: "active" | "draft" | "closed";
  applicants?: number;
  createdAt?: string;
}

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getjobs();

        setJobs(Array.isArray(result) ? result : result.jobs || []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("Unable to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Remove deleted job from the UI
  const handleJobDeleted = (jobId: string) => {
    setJobs((prevJobs) =>
      prevJobs.filter((job) => job._id !== jobId)
    );
  };

  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase();

    return (
      job.title.toLowerCase().includes(search) ||
      job.companyName.toLowerCase().includes(search) ||
      job.category.toLowerCase().includes(search) ||
      job.location.toLowerCase().includes(search)
    );
  });

  const activeJobs = jobs.filter(
    (job) => job.status?.toLowerCase() === "active"
  ).length;

  const totalApplicants = jobs.reduce(
    (total, job) => total + (job.applicants || 0),
    0
  );

  const formatSalary = (job: Job) => {
    if (!job.minSalary && !job.maxSalary) return "Not specified";

    return `${job.minSalary || "0"} - ${job.maxSalary || "Negotiable"} / ${
      job.salaryFrequency || "period"
    }`;
  };

  const formatDate = (date: string) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen space-y-8 bg-[#0D0D10] p-4 text-white sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
            <span>Dashboard</span>
            <span>/</span>
            <span>Recruiter</span>
            <span>/</span>
            <span className="text-[#8B83FF]">Manage Jobs</span>
          </div>

          <h1 className="text-2xl font-semibold sm:text-3xl">
            Manage Jobs
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage and monitor your job postings.
          </p>
        </div>

        <Link href="/dashboard/recruiter/jobs/new">
          <Button className="w-full bg-[#5C53FE] text-white hover:bg-[#4B43E8] sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Post a New Job
          </Button>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Jobs"
          value={jobs.length}
          icon={<BriefcaseBusiness className="h-5 w-5" />}
        />

        <StatCard
          title="Active Jobs"
          value={activeJobs}
          icon={<BriefcaseBusiness className="h-5 w-5" />}
        />

        <StatCard
          title="Total Applicants"
          value={totalApplicants}
          icon={<Users className="h-5 w-5" />}
        />
      </div>

      {/* Jobs Table */}
      <Card className="border border-white/10 bg-[#141418] text-white shadow-none">
        <CardContent className="space-y-5 p-4 sm:p-6">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold">All Job Postings</h2>
              <p className="mt-1 text-sm text-gray-400">
                View and manage your published jobs.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-white/10 bg-[#0D0D10] pl-9 text-white placeholder:text-gray-500 focus-visible:ring-[#5C53FE]"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-60 items-center justify-center gap-3 text-gray-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading jobs...
            </div>
          ) : error ? (
            <div className="flex min-h-60 items-center justify-center text-sm text-red-400">
              {error}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="flex min-h-60 flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-[#5C53FE]/10 p-4">
                <BriefcaseBusiness className="h-8 w-8 text-[#8B83FF]" />
              </div>

              <h3 className="text-lg font-medium">
                {searchTerm ? "No matching jobs found" : "No jobs posted yet"}
              </h3>

              <p className="mt-2 max-w-sm text-sm text-gray-400">
                {searchTerm
                  ? "Try searching with a different keyword."
                  : "Create your first job posting to start receiving applications."}
              </p>

              {!searchTerm && (
                <Link href="/dashboard/recruiter/jobs/new" className="mt-5">
                  <Button className="bg-[#5C53FE] text-white hover:bg-[#4B43E8]">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Job
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1150px] border-collapse text-left">

                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-gray-500">
                    <th className="px-4 py-4 font-medium">Job Title</th>
                    <th className="px-4 py-4 font-medium">Category</th>
                    <th className="px-4 py-4 font-medium">Job Type</th>
                    <th className="px-4 py-4 font-medium">Location</th>
                    <th className="px-4 py-4 font-medium">Salary</th>
                    <th className="px-4 py-4 font-medium">Applicants</th>
                    <th className="px-4 py-4 font-medium">Deadline</th>
                    <th className="px-4 py-4 font-medium">Status</th>
                    <th className="px-4 py-4 font-medium">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredJobs.map((job) => (
                    <tr
                      key={job._id}
                      className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-5">
                        <div className="font-medium text-white">
                          {job.title}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {job.companyName}
                        </div>
                      </td>

                      <td className="px-4 py-5 text-sm text-gray-300">
                        {job.category}
                      </td>

                      <td className="px-4 py-5">
                        <Badge className="border border-[#5C53FE]/20 bg-[#5C53FE]/10 text-[#A9A3FF] hover:bg-[#5C53FE]/10">
                          {job.jobType}
                        </Badge>
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          {job.isRemote ? "Remote" : job.location}
                        </div>
                      </td>

                      <td className="px-4 py-5 text-sm text-gray-300">
                        {formatSalary(job)}
                      </td>

                      <td className="px-4 py-5 text-sm text-gray-300">
                        {job.applicants || 0}
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <CalendarDays className="h-4 w-4 text-gray-500" />
                          {formatDate(job.deadline)}
                        </div>
                      </td>

                      <td className="px-4 py-5">
                        <Badge
                          className={
                            job.status?.toLowerCase() === "active"
                              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                              : job.status?.toLowerCase() === "closed"
                                ? "border border-red-500/20 bg-red-500/10 text-red-400"
                                : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                          }
                        >
                          {job.status || "Draft"}
                        </Badge>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2">

                          <Link
                            href={`/dashboard/recruiter/jobs/${job._id}/edit`}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 border-white/10 bg-transparent text-white hover:bg-white/10"
                            >
                              <Pencil className="h-4 w-4" />
                              Edit
                            </Button>
                          </Link>

                          <DeleteJobDialog
                            job={job}
                            onDeleted={handleJobDeleted}
                          />

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && !error && filteredJobs.length > 0 && (
            <div className="border-t border-white/10 pt-4 text-sm text-gray-500">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <Card className="border border-white/10 bg-[#141418] text-white shadow-none">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold">{value}</h3>
        </div>

        <div className="rounded-xl bg-[#5C53FE]/10 p-3 text-[#8B83FF]">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageJobsPage;
