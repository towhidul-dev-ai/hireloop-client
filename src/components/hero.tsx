import Image from "next/image"
import Link from "next/link"
import {
  BriefcaseIcon,
  Building2Icon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react"

const trendingPositions = [
  { label: "Product Designer", query: "Product Designer" },
  { label: "AI Engineering", query: "AI Engineering" },
  { label: "Dev-ops Engineer", query: "Dev-ops Engineer" },
] as const

const stats = [
  { icon: BriefcaseIcon, value: "50K", label: "Active Jobs" },
  { icon: Building2Icon, value: "12K", label: "Companies" },
  { icon: UsersIcon, value: "2M", label: "Job Seekers" },
  { icon: StarIcon, value: "97%", label: "Satisfaction Rate" },
] as const

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#040405] pb-16 text-white sm:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(55%_60%_at_50%_0%,rgba(109,75,255,0.14),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 pt-16 text-center sm:px-6 sm:pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 pr-3.5 shadow-[0_10px_40px_-18px_rgba(109,75,255,0.7)] backdrop-blur">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4a2a18] px-2.5 py-1 text-[13px] font-semibold text-white">
            <BriefcaseIcon className="size-3.5 text-[#ff9a4d]" aria-hidden />
            56,000+
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
            New jobs this month
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-semibold leading-[1.06] tracking-[-0.03em] text-[#f7f7fa] sm:text-5xl lg:text-[3.4rem]">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#9a9aa3] sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <form
          action="/jobs"
          className="mx-auto mt-8 flex w-full max-w-[45rem] flex-col gap-2 rounded-2xl border border-white/10 bg-[#0b0b0f]/80 p-2 shadow-[0_24px_60px_-30px_rgba(109,75,255,0.65)] backdrop-blur-md transition-colors focus-within:border-white/20 sm:flex-row sm:items-center sm:gap-1 sm:rounded-xl sm:p-1.5"
        >
          <label className="flex min-w-0 flex-1 items-center gap-2.5 px-2.5">
            <SearchIcon className="size-4 shrink-0 text-white/35" aria-hidden />
            <span className="sr-only">Job title, skill or company</span>
            <input
              type="text"
              name="q"
              placeholder="Job title, skill or company"
              className="h-10 w-full min-w-0 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
            />
          </label>

          <span
            aria-hidden
            className="mx-1.5 hidden h-6 w-px shrink-0 bg-white/10 sm:block"
          />

          <label className="flex min-w-0 flex-1 items-center gap-2.5 border-t border-white/5 px-2.5 pt-2 sm:border-t-0 sm:pt-0">
            <MapPinIcon className="size-4 shrink-0 text-white/35" aria-hidden />
            <span className="sr-only">Location or Remote</span>
            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              className="h-10 w-full min-w-0 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            aria-label="Search jobs"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-medium text-white transition-colors hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft active:translate-y-px sm:size-10 sm:px-0"
          >
            <SearchIcon className="size-[18px]" aria-hidden />
            <span className="sm:hidden">Search jobs</span>
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
          <span className="mr-1 text-[13px] text-white/40">
            Trending Position
          </span>
          {trendingPositions.map((position) => (
            <Link
              key={position.label}
              href={`/jobs?q=${encodeURIComponent(position.query)}`}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
            >
              {position.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="relative mt-8">
        <div className="relative mx-auto h-[19rem] w-full max-w-[1600px] sm:h-[26rem] lg:h-[31rem]">
          <Image
            src="/globe.png"
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            className="select-none object-cover object-[50%_62%]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#040405] to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#040405] via-[#040405]/60 to-transparent"
          />

          <p className="absolute inset-x-0 top-[55%] -translate-y-1/2 px-4 text-center text-xl font-medium leading-snug tracking-[-0.01em] text-white/90 sm:top-[60%] sm:text-2xl lg:text-[1.75rem]">
            Assisting over 15,000 job seekers
            <br className="hidden sm:block" /> find their dream positions.
          </p>
        </div>

        <div className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 sm:-mt-24 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map((stat) => (
              <article
                key={stat.label}
                className="flex min-h-[7.25rem] flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#131317] to-[#0a0a0d] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-30px_rgba(0,0,0,0.9)] sm:min-h-[8.25rem] sm:p-5"
              >
                <stat.icon
                  className="size-4 text-white/70"
                  strokeWidth={1.8}
                  aria-hidden
                />
                <p className="mt-auto pt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-white/45 sm:text-[13px]">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
