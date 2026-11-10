import Link from "next/link";
import { Suspense } from "react";
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

import { getApplications } from "@/lib/api/application";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { ApplicationStatus } from "@/types/application";

// Status badge styles
const statusStyles: Record<ApplicationStatus, string> = {
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  reviewed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  shortlisted: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  accepted: "bg-green-500/10 text-green-600 border-green-500/20",
};

// Link styles to use instead of Button asChild
const primaryLinkClass =
  "inline-flex h-9 w-fit items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90";

const outlineLinkClass =
  "inline-flex h-8 w-fit items-center justify-center gap-1 rounded-md border border-input bg-background px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// This component handles runtime authentication and data fetching.
// It must stay inside the Suspense boundary below.
const ApplicationsContent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // User is not authenticated
  if (!session?.user) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
        <BriefcaseBusiness className="size-12 text-muted-foreground" />

        <h2 className="mt-4 text-xl font-semibold">Please sign in</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to view and manage your job applications.
        </p>

        <Link href="/sign-in" className={`${primaryLinkClass} mt-5`}>
          Sign In
        </Link>
      </div>
    );
  }

  // Fetch applications belonging to the authenticated user
  const applications = await getApplications(
    `userId=${encodeURIComponent(session.user.id)}`
  );

  // Calculate statistics from real application data
  const totalApplications = applications.length;

  const pendingApplications = applications.filter(
    (application) => application.status === "pending"
  ).length;

  const shortlistedApplications = applications.filter(
    (application) => application.status === "shortlisted"
  ).length;

  const acceptedApplications = applications.filter(
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

        <Link href="/browse-jobs" className={primaryLinkClass}>
          <Search className="size-4" />
          Find More Jobs
        </Link>
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
          {applications.length > 0 ? (
            applications.map((application) => (
              <div
                key={application._id}
                className="rounded-xl border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 md:p-6"
              >
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                  {/* Job information */}
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
                        <span>{application.jobType}</span>

                        <span>•</span>

                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          {application.location}
                        </span>

                        {application.isRemote && (
                          <>
                            <span>•</span>
                            <span>Remote</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Application status and date */}
                  <div className="flex flex-col gap-3 border-t pt-4 lg:items-end lg:border-0 lg:pt-0">
                    <Badge
                      variant="outline"
                      className={`w-fit capitalize ${
                        statusStyles[application.status]
                      }`}
                    >
                      {application.status}
                    </Badge>

                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" />
                      Applied {formatDate(application.appliedAt)}
                    </p>
                  </div>
                </div>

                {/* Application footer */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                  <p className="break-all text-xs text-muted-foreground">
                    Application ID: {application._id}
                  </p>

                  <Link
                    href={`/browse-jobs/${application.jobId}`}
                    className={outlineLinkClass}
                  >
                    View Job
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed p-10 text-center">
              <BriefcaseBusiness className="mx-auto size-10 text-muted-foreground" />

              <h3 className="mt-4 font-semibold">No applications yet</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                You haven't applied for any jobs yet. Explore available jobs
                and submit your first application.
              </p>

              <Link
                href="/browse-jobs"
                className={`${primaryLinkClass} mt-5`}
              >
                Browse Jobs
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Loading UI displayed while authentication and applications are loading
const ApplicationsLoading = () => {
  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <div className="space-y-2">
        <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-80 max-w-full animate-pulse rounded-md bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-xl border bg-muted/50"
          />
        ))}
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl border bg-muted/50"
          />
        ))}
      </div>
    </div>
  );
};

// Keep the route component synchronous and place runtime work inside Suspense
const ApplicationsPage = () => {
  return (
    <Suspense fallback={<ApplicationsLoading />}>
      <ApplicationsContent />
    </Suspense>
  );
};

export default ApplicationsPage;