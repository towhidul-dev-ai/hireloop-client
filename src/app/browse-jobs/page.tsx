
// import { Suspense } from "react";
// import { getjobs } from "@/lib/api/jobs";
// import type { Job } from "@/types/job";


// interface BrowseJobsPageProps {
//   searchParams: Promise<{
//     [key: string]: string | string[] | undefined;
//   }>;
// }

// async function BrowseJobsContent({
//   searchParams,
// }: BrowseJobsPageProps) {
//   const search = await searchParams;

//   const params = new URLSearchParams();

//   Object.entries(search).forEach(([key, value]) => {
//     if (typeof value === "string" && value) {
//       params.set(key, value);
//     } else if (Array.isArray(value)) {
//       value.forEach((item) => params.append(key, item));
//     }
//   });

//   const jobs: Job[] = await getjobs(params.toString());

//   const getValues = (key: string): string[] => {
//     const value = search[key];

//     if (typeof value === "string") return [value];
//     if (Array.isArray(value)) return value;

//     return [];
//   };

//   const jobTypes = [
//     "Full-time",
//     "Part-time",
//     "Contract",
//     "Internship",
//   ];

//   const categories = [
//     { value: "engineering", label: "Engineering & Tech" },
//     { value: "design", label: "Design & Creative" },
//     { value: "marketing", label: "Marketing" },
//     { value: "business", label: "Business & Management" },
//     { value: "finance", label: "Finance & Accounting" },
//     { value: "sales", label: "Sales" },
//     { value: "customer-support", label: "Customer Support" },
//     { value: "other", label: "Other" },
//   ];

//   const workplaces = [
//     { value: "true", label: "Remote" },
//     { value: "false", label: "On-site" },
//   ];

//   const selectedJobTypes = getValues("jobType");
//   const selectedCategories = getValues("category");
//   const selectedWorkplaces = getValues("isRemote");

 

//   return (
//     <main className="min-h-screen bg-[#0d0d0f] px-4 py-10 text-white sm:px-6">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold">Find Your Next Job</h1>
//           <p className="mt-2 text-sm text-gray-400">
//             Discover opportunities that match your skills and interests.
//           </p>
//         </div>

//         {/* Search and Filters */}
//         <form
//           action="/browse-jobs"
//           method="GET"
//           className="mb-8 rounded-xl border border-white/10 bg-[#151517] p-5"
//         >
//           {/* Search */}
//           <div className="mb-6">
//             <label htmlFor="search" className="mb-2 block text-sm text-gray-300">
//               Search Jobs
//             </label>
//             <input
//               id="search"
//               name="search"
//               type="search"
//               defaultValue={getValues("search")[0] || ""}
//               placeholder="Job title, company, or keyword..."
//               className="h-11 w-full rounded-lg border border-white/10 bg-[#202023] px-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
//             />
//           </div>

//           <div className="grid gap-8 md:grid-cols-3">
//             {/* Job Type */}
//             <div>
//               <h3 className="mb-4 font-semibold">Job Type</h3>

//               <div className="space-y-3">
//                 {jobTypes.map((type) => (
//                   <label
//                     key={type}
//                     className="flex cursor-pointer items-center gap-3 text-sm text-gray-300"
//                   >
//                     <input
//                       type="checkbox"
//                       name="jobType"
//                       value={type}
//                       defaultChecked={selectedJobTypes.includes(type)}
//                       className="h-4 w-4 accent-[#5C53FE]"
//                     />
//                     {type}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Category */}
//             <div>
//               <h3 className="mb-4 font-semibold">Category</h3>

//               <div className="space-y-3">
//                 {categories.map((category) => (
//                   <label
//                     key={category.value}
//                     className="flex cursor-pointer items-center gap-3 text-sm text-gray-300"
//                   >
//                     <input
//                       type="checkbox"
//                       name="category"
//                       value={category.value}
//                       defaultChecked={selectedCategories.includes(category.value)}
//                       className="h-4 w-4 accent-[#5C53FE]"
//                     />
//                     {category.label}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Workplace */}
//             <div>
//               <h3 className="mb-4 font-semibold">Workplace</h3>

//               <div className="space-y-3">
//                 {workplaces.map((workplace) => (
//                   <label
//                     key={workplace.value}
//                     className="flex cursor-pointer items-center gap-3 text-sm text-gray-300"
//                   >
//                     <input
//                       type="checkbox"
//                       name="isRemote"
//                       value={workplace.value}
//                       defaultChecked={selectedWorkplaces.includes(workplace.value)}
//                       className="h-4 w-4 accent-[#5C53FE]"
//                     />
//                     {workplace.label}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Location */}
//           <div className="mt-6">
//             <label htmlFor="location" className="mb-2 block text-sm text-gray-300">
//               Location
//             </label>
//             <input
//               id="location"
//               name="location"
//               type="text"
//               defaultValue={getValues("location")[0] || ""}
//               placeholder="e.g. Dhaka"
//               className="h-11 w-full rounded-lg border border-white/10 bg-[#202023] px-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="mt-6 flex justify-end gap-3">
//             <a
//               href="/browse-jobs"
//               className="flex h-11 items-center rounded-lg border border-white/10 px-5 text-sm text-gray-300 hover:bg-white/5"
//             >
//               Reset
//             </a>

//             <button
//               type="submit"
//               className="h-11 rounded-lg bg-[#5C53FE] px-6 text-sm font-semibold text-white hover:bg-[#4940e8]"
//             >
//               Apply Filters
//             </button>
//           </div>
//         </form>

//         {/* Job Results */}
//         <div className="mb-5 flex items-center justify-between">
//           <h2 className="text-xl font-semibold">Available Jobs</h2>
//           <p className="text-sm text-gray-400">
//             {jobs.length} jobs found
//           </p>
//         </div>

//         {jobs.length > 0 ? (
//           <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//             {jobs.map((job) => (
//               <article
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
//             ))}
//           </div>
//         ) : (
//           <div className="rounded-xl border border-white/10 bg-[#151517] py-16 text-center">
//             <h3 className="text-lg font-semibold">No jobs found</h3>
//             <p className="mt-2 text-sm text-gray-400">
//               Try changing your search or filter options.
//             </p>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

// export default function BrowseJobsPage(props: BrowseJobsPageProps) {
//   return (
//     <Suspense
//       fallback={<div className="p-10 text-gray-400">Loading jobs...</div>}
//     >
//       <BrowseJobsContent {...props} />
//     </Suspense>
//   );
// }



import { Suspense } from "react";
import { getjobs } from "@/lib/api/jobs";
import type { Job } from "@/types/job";
import JobCard from "../components/JobCard";


interface BrowseJobsPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

async function BrowseJobsContent({
  searchParams,
}: BrowseJobsPageProps) {
  const search = await searchParams;
  const params = new URLSearchParams();

  Object.entries(search).forEach(([key, value]) => {
    if (typeof value === "string" && value) {
      params.set(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    }
  });

  const jobs: Job[] = await getjobs(params.toString());

  const getValues = (key: string): string[] => {
    const value = search[key];

    if (typeof value === "string") return [value];
    if (Array.isArray(value)) return value;

    return [];
  };

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

  const categories = [
    { value: "engineering", label: "Engineering & Tech" },
    { value: "design", label: "Design & Creative" },
    { value: "marketing", label: "Marketing" },
    { value: "business", label: "Business & Management" },
    { value: "finance", label: "Finance & Accounting" },
    { value: "sales", label: "Sales" },
    { value: "customer-support", label: "Customer Support" },
    { value: "other", label: "Other" },
  ];

  const workplaces = [
    { value: "true", label: "Remote" },
    { value: "false", label: "On-site" },
  ];

  return (
    <main className="min-h-screen bg-[#0d0d0f] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Find Your Next Job</h1>
          <p className="mt-2 text-sm text-gray-400">
            Discover opportunities that match your skills and interests.
          </p>
        </div>

        {/* Search and Filters */}
        <form
          action="/browse-jobs"
          method="GET"
          className="mb-8 rounded-xl border border-white/10 bg-[#151517] p-5"
        >
          <div className="mb-6">
            <label htmlFor="search" className="mb-2 block text-sm text-gray-300">
              Search Jobs
            </label>
            <input
              id="search"
              name="search"
              type="search"
              defaultValue={getValues("search")[0] || ""}
              placeholder="Job title, company, or keyword..."
              className="h-11 w-full rounded-lg border border-white/10 bg-[#202023] px-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Job Type */}
            <div>
              <h3 className="mb-4 font-semibold">Job Type</h3>
              <div className="space-y-3">
                {jobTypes.map((type) => (
                  <label
                    key={type}
                    className="flex cursor-pointer items-center gap-3 text-sm text-gray-300"
                  >
                    <input
                      type="checkbox"
                      name="jobType"
                      value={type}
                      defaultChecked={getValues("jobType").includes(type)}
                      className="h-4 w-4 accent-[#5C53FE]"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className="mb-4 font-semibold">Category</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <label
                    key={category.value}
                    className="flex cursor-pointer items-center gap-3 text-sm text-gray-300"
                  >
                    <input
                      type="checkbox"
                      name="category"
                      value={category.value}
                      defaultChecked={getValues("category").includes(category.value)}
                      className="h-4 w-4 accent-[#5C53FE]"
                    />
                    {category.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Workplace */}
            <div>
              <h3 className="mb-4 font-semibold">Workplace</h3>
              <div className="space-y-3">
                {workplaces.map((workplace) => (
                  <label
                    key={workplace.value}
                    className="flex cursor-pointer items-center gap-3 text-sm text-gray-300"
                  >
                    <input
                      type="checkbox"
                      name="isRemote"
                      value={workplace.value}
                      defaultChecked={getValues("isRemote").includes(workplace.value)}
                      className="h-4 w-4 accent-[#5C53FE]"
                    />
                    {workplace.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mt-6">
            <label htmlFor="location" className="mb-2 block text-sm text-gray-300">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              defaultValue={getValues("location")[0] || ""}
              placeholder="e.g. Dhaka"
              className="h-11 w-full rounded-lg border border-white/10 bg-[#202023] px-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <a
              href="/browse-jobs"
              className="flex h-11 items-center rounded-lg border border-white/10 px-5 text-sm text-gray-300 hover:bg-white/5"
            >
              Reset
            </a>
            <button
              type="submit"
              className="h-11 rounded-lg bg-[#5C53FE] px-6 text-sm font-semibold text-white hover:bg-[#4940e8]"
            >
              Apply Filters
            </button>
          </div>
        </form>

        {/* Job Results */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Available Jobs</h2>
          <p className="text-sm text-gray-400">{jobs.length} jobs found</p>
        </div>

        {jobs.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-[#151517] py-16 text-center">
            <h3 className="text-lg font-semibold">No jobs found</h3>
            <p className="mt-2 text-sm text-gray-400">
              Try changing your search or filter options.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function BrowseJobsPage(props: BrowseJobsPageProps) {
  return (
    <Suspense fallback={<div className="p-10 text-gray-400">Loading jobs...</div>}>
      <BrowseJobsContent {...props} />
    </Suspense>
  );
}
