import type { ApplicationData } from "@/types/application";


const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  // get application?userId

  export const getApplications = async(query=" "): Promise<ApplicationData[]> =>{
    const res = await fetch(`${BASE_URL}/applications?${query}`)
    return res.json()
  }


  export const createApplication = async(data: ApplicationData)=>{
    const res = await fetch(`${BASE_URL}/applications`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return res.json()
  }