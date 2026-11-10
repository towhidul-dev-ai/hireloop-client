"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import {
  ArrowRight,
  Building2,
  CalendarDays,
  Globe2,
  MapPin,
  Euro,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { createJob } from "@/lib/actions/jobs";
import { useRouter } from "next/navigation";


// import { createJob } from "@/lib/jobs";

// Reusable Job Data Type
export interface JobData {
  title: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string | null;
  
  minSalary: number | null;
  maxSalary: number | null;
  salaryFrequency: string;
  responsibilities: string;
  qualifications: string;
}



const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

export default function NewJobPage() {
  const [jobType, setJobType] = useState("Full-time");
  const [isRemote, setIsRemote] = useState(false);
  const [category, setCategory] = useState("");
  const [salaryFrequency, setSalaryFrequency] =
    useState("per-hour");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("");

  const inputClass =
    "h-11 border-white/[0.08] bg-[#202023] text-sm text-white placeholder:text-gray-500 shadow-none focus-visible:border-brand focus-visible:ring-brand/20";

  const selectClass =
    "h-11 w-full border-white/[0.08] bg-[#202023] text-sm text-white shadow-none";


    const router =  useRouter()
  // Submit Job
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!category) {
      setMessage("Please select a job category.");
      setMessageType("error");
      return;
    }

    const minSalaryValue = formData.get("minSalary");
    const maxSalaryValue = formData.get("maxSalary");

    const jobData: JobData = {
      title: String(formData.get("title") || ""),
      companyName: String(formData.get("companyName") || ""),
      category,
      jobType,
      isRemote,
      location: String(formData.get("location") || ""),
      deadline:
        String(formData.get("deadline") || "") || null,
      minSalary:
        minSalaryValue !== null && minSalaryValue !== ""
          ? Number(minSalaryValue)
          : null,
      maxSalary:
        maxSalaryValue !== null && maxSalaryValue !== ""
          ? Number(maxSalaryValue)
          : null,
      salaryFrequency,
      responsibilities: String(
        formData.get("responsibilities") || ""
      ),
      qualifications: String(
        formData.get("qualifications") || ""
      ),
    };

    // Validate salary range
    if (
      jobData.minSalary !== null &&
      jobData.maxSalary !== null &&
      jobData.minSalary > jobData.maxSalary
    ) {
      setMessage("Minimum salary cannot exceed maximum salary.");
      setMessageType("error");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");

      const result = await createJob(jobData);
      router.push('/dashboard/recruiter/jobs')

      setMessage(
        result.message || "Job created successfully!"
      );
      setMessageType("success");

      form.reset();

      setJobType("Full-time");
      setIsRemote(false);
      setCategory("");
      setSalaryFrequency("per-hour");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to create job."
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-7 flex flex-col justify-between gap-5 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
              <span>Manage Jobs</span>
              <ChevronRight className="size-3" />
              <span className="text-brand-soft">
                Create New Listing
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Post a New Job
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Fill in the position specifications to attract
              qualified talent across our network.
            </p>
          </div>

          <Button
            type="submit"
            form="new-job-form"
            disabled={isSubmitting}
            className="h-11 gap-2 rounded-xl bg-brand px-5 font-semibold text-white shadow-[0_4px_15px_-5px_rgba(109,75,255,0.6)] hover:bg-brand-strong"
          >
            {isSubmitting ? "Publishing..." : "Publish Job"}
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* Response Message */}
        {message && (
          <div
            role="status"
            className={`mb-5 rounded-xl border p-4 text-sm ${
              messageType === "success"
                ? "border-green-500/20 bg-green-500/10 text-green-400"
                : "border-red-500/20 bg-red-500/10 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <form
          id="new-job-form"
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* SECTION 1: BASIC INFORMATION */}
          <section className="rounded-2xl border border-white/[0.04] bg-[#151517] p-5 sm:p-7">
            <SectionHeading
              number="1"
              title="Basic Information"
            />

            <div className="mt-6 space-y-5">

              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Job Title <Required />
                </Label>

                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Frontend Developer"
                  className={inputClass}
                  required
                />
              </div>

              {/* Company and Category */}
              <div className="grid gap-5 md:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    Company Name <Required />
                  </Label>

                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="Your company name"
                      className={`${inputClass} pl-10`}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    Job Category <Required />
                  </Label>

                  <Select
                    value={category}
                    onValueChange={setCategory}
                  >
                    <SelectTrigger className={selectClass}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="engineering">
                        Engineering & Tech
                      </SelectItem>
                      <SelectItem value="design">
                        Design & Creative
                      </SelectItem>
                      <SelectItem value="marketing">
                        Marketing
                      </SelectItem>
                      <SelectItem value="business">
                        Business & Management
                      </SelectItem>
                      <SelectItem value="finance">
                        Finance & Accounting
                      </SelectItem>
                      <SelectItem value="sales">
                        Sales
                      </SelectItem>
                      <SelectItem value="customer-support">
                        Customer Support
                      </SelectItem>
                      <SelectItem value="other">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Job Type */}
              <div className="space-y-3">
                <Label>
                  Job Type <Required />
                </Label>

                <RadioGroup
                  value={jobType}
                  onValueChange={setJobType}
                  className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                >
                  {jobTypes.map((type) => (
                    <Label
                      key={type}
                      htmlFor={type}
                      className={`flex h-11 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium transition-all ${
                        jobType === type
                          ? "border-brand bg-brand/10 text-white"
                          : "border-white/[0.06] bg-[#202023] text-gray-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <RadioGroupItem
                        id={type}
                        value={type}
                        className="sr-only"
                      />
                      {type}
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </section>

          {/* SECTION 2: LOCATION AND COMPENSATION */}
          <section className="rounded-2xl border border-white/[0.04] bg-[#151517] p-5 sm:p-7">
            <SectionHeading
              number="2"
              title="Location, Compensation & Timeline"
            />

            <div className="mt-6 space-y-5">

              {/* Remote Work */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.05] bg-[#202023] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/15">
                    <Globe2 className="size-4 text-brand-soft" />
                  </div>

                  <div>
                    <Label
                      htmlFor="remote"
                      className="cursor-pointer text-sm font-medium"
                    >
                      Remote Work Allowed
                    </Label>

                    <p className="mt-1 text-xs text-gray-400">
                      Enable worldwide or distributed candidate applications
                    </p>
                  </div>
                </div>

                <Switch
                  id="remote"
                  checked={isRemote}
                  onCheckedChange={setIsRemote}
                />
              </div>

              {/* Location and Deadline */}
              <div className="grid gap-5 md:grid-cols-2">

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="location">
                      Job Location
                    </Label>

                    <span className="text-[11px] text-gray-500">
                      {isRemote
                        ? "Optional for remote jobs"
                        : "Required"}
                    </span>
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. Dhaka, Bangladesh"
                      className={`${inputClass} pl-10`}
                      required={!isRemote}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">
                    Application Deadline
                  </Label>

                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      className={`${inputClass} pl-10 [color-scheme:dark]`}
                    />
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <div className="space-y-2">
                  <Label htmlFor="minSalary">
                    Min Salary / Rate
                  </Label>

                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="minSalary"
                      name="minSalary"
                      type="number"
                      min="0"
                      placeholder="25000"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxSalary">
                    Max Salary / Rate
                  </Label>

                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="maxSalary"
                      name="maxSalary"
                      type="number"
                      min="0"
                      placeholder="40000"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    Frequency
                  </Label>

                  <Select
                    value={salaryFrequency}
                    onValueChange={setSalaryFrequency}
                  >
                    <SelectTrigger className={selectClass}>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="per-hour">
                        Per hour
                      </SelectItem>
                      <SelectItem value="per-day">
                        Per day
                      </SelectItem>
                      <SelectItem value="per-week">
                        Per week
                      </SelectItem>
                      <SelectItem value="per-month">
                        Per month
                      </SelectItem>
                      <SelectItem value="per-year">
                        Per year
                      </SelectItem>
                      <SelectItem value="negotiable">
                        Negotiable
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: RESPONSIBILITIES AND REQUIREMENTS */}
          <section className="rounded-2xl border border-white/[0.04] bg-[#151517] p-5 sm:p-7">
            <SectionHeading
              number="3"
              title="Responsibilities & Requirements"
            />

            <div className="mt-6 space-y-5">

              <div className="space-y-2">
                <Label htmlFor="responsibilities">
                  Key Responsibilities <Required />
                </Label>

                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  required
                  placeholder="Describe the main responsibilities of this position..."
                  className="min-h-28 resize-y border-white/[0.08] bg-[#202023] text-sm leading-6 text-white placeholder:text-gray-500 focus-visible:border-brand focus-visible:ring-brand/20"
                />

                <p className="text-xs text-gray-500">
                  Explain what the successful candidate will be responsible for.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualifications">
                  Qualifications & Requirements <Required />
                </Label>

                <Textarea
                  id="qualifications"
                  name="qualifications"
                  required
                  placeholder="Required experience, education, technical skills, and communication skills..."
                  className="min-h-32 resize-y border-white/[0.08] bg-[#202023] text-sm leading-6 text-white placeholder:text-gray-500 focus-visible:border-brand focus-visible:ring-brand/20"
                />

                <p className="text-xs text-gray-500">
                  List the skills, experience, and qualifications candidates need.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom Actions */}
          <div className="flex flex-col-reverse justify-end gap-3 pb-8 sm:flex-row">

            <Button
              type="reset"
              variant="outline"
              disabled={isSubmitting}
              className="h-11 border-white/10 bg-transparent px-6 text-gray-300 hover:bg-white/5 hover:text-white"
              onClick={() => {
                setJobType("Full-time");
                setIsRemote(false);
                setCategory("");
                setSalaryFrequency("per-hour");
                setMessage("");
                setMessageType("");
              }}
            >
              Reset Form
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 gap-2 rounded-lg bg-brand px-6 font-semibold text-white hover:bg-brand-strong"
            >
              {isSubmitting ? "Publishing..." : "Publish Job"}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable Section Heading
function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="size-2 rounded-full bg-brand shadow-[0_0_8px_rgba(109,75,255,0.7)]" />

      <h2 className="text-base font-semibold tracking-tight text-white">
        {number}. {title}
      </h2>
    </div>
  );
}

// Required Field Indicator
function Required() {
  return <span className="text-brand-soft">*</span>;
}
