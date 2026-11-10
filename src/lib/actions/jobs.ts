



// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"


// export const createJob = async(data: jobData)=>{
//     const res = await fetch(`${BASE_URL}/jobs`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body:JSON.stringify(data),
//     })
//     return res.json()
// }



import type { JobData } from "@/app/dashboard/recruiter/jobs/new/page";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const createJob = async (data: JobData) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create job");
  }

  return result;
};

export const deleteJob = async(jobId: string)=>{
  const res= await fetch(`${BASE_URL}/jobs/${jobId}`,{
    method: 'DELETE',
  })
  return res.json()
}

export async function applyToJob(data){
  const response = await fetch(`${BASE_URL}/applications`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

