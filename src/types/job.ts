// export interface Job {
//   _id: string;
//   title: string;
//   companyName: string;
//   category: string;
//   jobType: string;
//   isRemote: boolean;
//   location: string;
//   minSalary: number ;
//   maxSalary: number;
//   salaryFrequency: string;
//   deadline?: string;
// }

export interface Job {
  _id: string;
  title: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  salaryFrequency: string;
  deadline?: string | null;
  responsibilities: string;
  qualifications: string;
}

export type JobData = Job;