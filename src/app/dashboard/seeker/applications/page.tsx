
import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Search,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ApplicationData } from "@/types/application";
// import type { ApplicationData } from "@/types/application";

const applicationsData: ApplicationData[] = [
  {
    _id: "APP-001",
    jobId: "JOB-001",
    jobTitle: "Frontend Developer",
    companyName: "Tech Solutions Ltd.",
    category: "Development",
    jobType: "Full-time",
    location: "Dhaka, Bangladesh",
    isRemote: false,
    applicantId: "USER-001",
    applicantName: "Shahed Islam",
    applicantEmail: "shahed@example.com",
    phone: "+880 1234567890",
    resumeUrl: "/resume.pdf",
    coverLetter: "I am interested in this position.",
    status: "pending",
    appliedAt: "2026-11-08",
  },
  {
    _id: "APP-002",
    jobId: "JOB-002",
    jobTitle: "UI/UX Designer",
    companyName: "Creative Studio",
    category: "Design",
    jobType: "Full-time",
    location: "Remote",
    isRemote: true,
    applicantId: "USER-001",
    applicantName: "Shahed Islam",
    applicantEmail: "shahed@example.com",
    resumeUrl: "/resume.pdf",
    coverLetter: "I would love to join your design team.",
    status: "shortlisted",
    appliedAt: "2026-11-06",
  },
  {
    _id: "APP-003",
    jobId: "JOB-003",
    jobTitle: "Backend Developer",
    companyName: "Digital Systems",
    category: "Development",
    jobType: "Full-time",
    location: "Chattogram, Bangladesh",
    isRemote: false,
    applicantId: "USER-001",
    applicantName: "Shahed Islam",
    applicantEmail: "shahed@example.com",
    resumeUrl: "/resume.pdf",
    coverLetter: "I am excited about this opportunity.",
    status: "reviewed",
    appliedAt: "2026-11-03",
  },
  {
    _id: "APP-004",
    jobId: "JOB-004",
    jobTitle: "Junior Software Engineer",
    companyName: "NextGen Technologies",
    category: "Development",
    jobType: "Internship",
    location: "Dhaka, Bangladesh",
    isRemote: false,
    applicantId: "USER-001",
    applicantName: "Shahed Islam",
    applicantEmail: "shahed@example.com",
    resumeUrl: "/resume.pdf",
    coverLetter: "I am interested in this internship.",
    status: "rejected",
    appliedAt: "2026-10-29",
  },
];

const statusStyles = {
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  reviewed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  shortlisted: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  rejected: "bg-red-500/10 text-red-600 border-red-500/20",
  accepted: "bg-green-500/10 text-green-600 border-green-500/20",
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const ApplicationsPage = () => {
  const totalApplications = applicationsData.length;
  const pendingApplications = applicationsData.filter(
    (application) => application.status === "pending"
  ).length;
  const shortlistedApplications = applicationsData.filter(
    (application) => application.status === "shortlisted"
  ).length;
  const acceptedApplications = applicationsData.filter(
    (application) => application.status === "accepted"
  ).length;

  const stats = [
    {
      label: "Total Applications",
      value: totalApplications,
      icon: BriefcaseBusiness,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Pending",
      value: pendingApplications,
      icon: Clock3,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Shortlisted",
      value: shortlistedApplications,
      icon: CheckCircle2,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Accepted",
      value: acceptedApplications,
      icon: FileText,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            My Applications
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track and manage all your job applications in one place.
          </p>
        </div>

        <Button asChild className="w-fit">
          <Link href="/browse-jobs">
            <Search className="mr-2 size-4" />
            Find More Jobs
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <Icon className={`size-5 ${stat.color}`} />
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Applications list */}
      <section className="space-y-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold">All Applications</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              You have submitted {totalApplications} applications.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                className="pl-9 sm:w-64"
                disabled
              />
            </div>

            <Button variant="outline" disabled>
              All Status
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {applicationsData.map((application) => (
            <div
              key={application._id}
              className="rounded-xl border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 md:p-6"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <BriefcaseBusiness className="size-6 text-primary" />
                  </div>

                  <div className="min-w-0 space-y-2">
                    <h3 className="font-semibold leading-tight">
                      {application.jobTitle}
                    </h3>

                    <p className="text-sm font-medium text-muted-foreground">
                      {application.companyName}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                      <span>{application.category}</span>
                      <span>•</span>
                      <span>{application.jobType}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        {application.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t pt-4 lg:items-end lg:border-0 lg:pt-0">
                  <Badge
                    variant="outline"
                    className={`w-fit capitalize ${statusStyles[application.status]}`}
                  >
                    {application.status}
                  </Badge>

                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    Applied {formatDate(application.appliedAt)}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                <p className="text-xs text-muted-foreground">
                  Application ID: {application._id}
                </p>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/browse-jobs/${application.jobId}`}>
                      View Job
                      <ArrowUpRight className="ml-1 size-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ApplicationsPage;
