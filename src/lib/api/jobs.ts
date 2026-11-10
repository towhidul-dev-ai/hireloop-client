

// const BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// import type { JobData } from "@/app/dashboard/recruiter/jobs/page";
import type { JobData } from "@/app/dashboard/recruiter/jobs/page";

// export const getjobs = async(query = '')=> {
//     const res = await fetch(`${BASE_URL}/jobs?${query}`)
//     return res.json();
//   }

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getjobs = async (query = "") => {
  const res = await fetch(
    `${BASE_URL}/jobs${query ? `?${query}` : ""}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await res.json();

  return Array.isArray(data) ? data : data.jobs ? data.jobs : [data];
};

// export const getJobById = async(jobId: string): Promise<JobData> =>{
//   const res = await fetch(`${BASE_URL}/jobs/${jobId}`)
//   return res.json()
// }


export const getJobById = async (jobId: string): Promise<JobData> => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    throw new Error("Job not found");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch job details");
  }

  return res.json();
};
