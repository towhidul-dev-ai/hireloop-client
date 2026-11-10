export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "shortlisted"
  | "rejected"
  | "accepted";

export interface ApplicationData {
  _id: string;
  jobId: string;
  userId: string;
  email: string;

  jobTitle: string;
  companyName: string;
  jobType: string;
  isRemote: boolean;
  location: string;

  minSalary: number | null;
  maxSalary: number | null;
  salaryFrequency: string;
  deadline: string | null;

  appliedAt: string;
  status: ApplicationStatus;
  archived: boolean;
}