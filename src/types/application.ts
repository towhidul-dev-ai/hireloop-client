
export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "shortlisted"
  | "rejected"
  | "accepted";

export interface ApplicationData {
  _id?: string;

  // Job information
  jobId: string;
  jobTitle: string;
  companyName: string;
  category: string;
  jobType: string;
  location: string;
  isRemote: boolean;

  // Applicant information
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  phone?: string;

  // Application documents
  resumeUrl: string;
  coverLetter: string;

  // Application tracking
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt?: string;
}
