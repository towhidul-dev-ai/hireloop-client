
import Link from "next/link";
// import type { JobData } from "@/lib/api/jobs";
import ApplyNowButton from "./ApplyNowButton";

import type { Job } from "@/types/job";

interface JobDetailsProps {
  job: Job;
}

const JobDetails = ({ job }: JobDetailsProps) => {
  const formatSalary = (amount?: number) => {
    if (amount === undefined || amount === null) return "Negotiable";
    return amount.toLocaleString();
  };

  const formatDate = (date?: string) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const informationCards = [
    {
      icon: "💰",
      label: "Salary range",
      value: `${formatSalary(job.minSalary)} – ${formatSalary(job.maxSalary)}`,
      extra: job.salaryFrequency || "",
    },
    {
      icon: "📍",
      label: "Location",
      value: job.location || "Not specified",
      extra: job.isRemote ? "Remote" : "On-site",
    },
    {
      icon: "💼",
      label: "Job type",
      value: job.jobType || "Not specified",
      extra: job.category || "",
    },
    {
      icon: "📅",
      label: "Apply by",
      value: formatDate(job.deadline),
      extra: "",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0b0d12] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back navigation */}
        <Link
          href="/browse-jobs"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <span>←</span> Back to jobs
        </Link>

        {/* Job Header */}
        <section className="rounded-2xl border border-white/10 bg-[#181c24] p-6 shadow-xl sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

            <div className="flex items-start gap-5">
              {/* Company Logo Placeholder */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-3xl font-bold text-blue-400">
                {job.companyName?.charAt(0).toUpperCase() || "C"}
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {job.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-gray-300 sm:text-base">
                  <span>{job.companyName}</span>
                  <span className="text-gray-600">•</span>
                  <span>{job.location}</span>
                  <span className="text-gray-600">•</span>
                  <span>{job.jobType}</span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center">
              {/* <ApplyNowButton jobId={job._id} /> */}
              <ApplyNowButton
  jobId={job._id}
  jobTitle={job.title}
  companyName={job.companyName}
/>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-7 lg:col-span-2">

            {/* Information Cards */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {informationCards.map((item) => (
                <div
                  key={item.label}
                  className="min-h-44 rounded-xl border border-white/10 bg-[#181c24] p-5 transition hover:border-blue-400/40"
                >
                  <span className="text-2xl">{item.icon}</span>

                  <p className="mt-4 text-sm text-gray-400">
                    {item.label}
                  </p>

                  <p className="mt-2 break-words text-lg font-semibold text-white">
                    {item.value}
                  </p>

                  {item.extra && (
                    <p className="mt-1 text-sm text-gray-400">
                      {item.extra}
                    </p>
                  )}
                </div>
              ))}
            </section>

            {/* Job Description */}
            <section className="rounded-xl border border-white/10 bg-[#181c24] p-6 sm:p-8">
              <div>
                <h2 className="text-xl font-bold">Job Description</h2>

                {/* <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-400 sm:text-base">
                  {job.responsibilities || "No job description provided."}
                </p> */}
              </div>

              <div className="my-7 border-t border-white/10" />

              <div>
                <h2 className="text-xl font-bold">Requirements</h2>

                {/* <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-400 sm:text-base">
                  {job.qualifications || "No requirements provided."}
                </p> */}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="h-fit rounded-xl border border-white/10 bg-[#181c24] p-6 sm:p-7">

            <h2 className="text-xl font-bold">Company Overview</h2>

            {/* Company Logo */}
            <div className="mt-6 flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/50 to-slate-800 text-7xl font-bold text-white">
              {job.companyName?.charAt(0).toUpperCase() || "C"}
            </div>

            {/* Company Information */}
            <div className="mt-6 divide-y divide-white/10">

              <div className="flex justify-between gap-4 py-5 text-sm">
                <span className="text-gray-400">Company</span>
                <span className="text-right font-semibold">
                  {job.companyName}
                </span>
              </div>

              <div className="flex justify-between gap-4 py-5 text-sm">
                <span className="text-gray-400">Location</span>
                <span className="text-right font-semibold">
                  {job.location || "Not specified"}
                </span>
              </div>

              <div className="flex justify-between gap-4 py-5 text-sm">
                <span className="text-gray-400">Posted</span>
                {/* <span className="text-right font-semibold">
                  {formatDate(job.createdAt)}
                </span> */}
              </div>

              <div className="flex justify-between gap-4 py-5 text-sm">
                <span className="text-gray-400">Applicants</span>
                {/* <span className="font-semibold">
                  {job.applicants ?? 0}
                </span> */}
              </div>

            </div>

            {/* Additional Company Button */}
            <Link
              href={`/browse-jobs?search=${encodeURIComponent(job.companyName || "")}`}
              className="mt-5 flex w-full items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/20"
            >
              More jobs from this company →
            </Link>

          </aside>
        </div>

        {/* Bottom Apply Button */}
        <div className="mt-8 flex justify-center rounded-xl border border-white/10 bg-[#181c24] p-6">
          {/* <ApplyNowButton jobId={job._id} /> */}
          <ApplyNowButton
  jobId={job._id}
  jobTitle={job.title}
  companyName={job.companyName}
/>
        </div>

      </div>
    </main>
  );
};

export default JobDetails;
