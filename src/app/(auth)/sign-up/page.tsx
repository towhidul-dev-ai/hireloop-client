// "use client"

// import { useState, type FormEvent } from "react"
// import Link from "next/link"
// import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// const inputClassName =
//   "h-11 rounded-lg border-white/10 bg-white/[0.04] pl-10 text-sm text-white placeholder:text-white/35 focus-visible:border-brand-soft focus-visible:ring-brand/25"

// const passwordInputClassName = `${inputClassName} pr-11`

// export default function SignUpPage() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()

//     const formData = new FormData(event.currentTarget)
//     const values = {
//       name: String(formData.get("name") ?? "").trim(),
//       email: String(formData.get("email") ?? "").trim(),
//       password: String(formData.get("password") ?? ""),
//       confirmPassword: String(formData.get("confirmPassword") ?? ""),
//       acceptedTerms: formData.get("terms") === "on",
//     }

//     console.log("Sign up form data:", values)
//     // TODO: hook this up to Better Auth, e.g. authClient.signUp.email(values)
//   }

//   return (
//     <section className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-[#040405] px-4 py-12 text-white sm:px-6 sm:py-16">
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_50%_0%,rgba(109,75,255,0.18),transparent_70%)]"
//       />

//       <div className="relative w-full max-w-md">
//         <div className="rounded-2xl border border-white/10 bg-[#0b0b0f]/90 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-8">
//           <div className="mb-8 text-center">
//             <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-soft">
//               Get started
//             </p>
//             <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[1.75rem]">
//               Create your hireloop account
//             </h1>
//             <p className="mt-2 text-sm text-white/50">
//               Join thousands of candidates finding their next role.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//             <div className="flex flex-col gap-2">
//               <Label htmlFor="name" className="text-[13px] text-white/70">
//                 Full name
//               </Label>
//               <div className="relative">
//                 <UserIcon
//                   aria-hidden
//                   className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
//                 />
//                 <Input
//                   id="name"
//                   name="name"
//                   type="text"
//                   placeholder="Jane Doe"
//                   autoComplete="name"
//                   required
//                   className={inputClassName}
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-2">
//               <Label htmlFor="email" className="text-[13px] text-white/70">
//                 Email address
//               </Label>
//               <div className="relative">
//                 <MailIcon
//                   aria-hidden
//                   className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
//                 />
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   autoComplete="email"
//                   required
//                   className={inputClassName}
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-2">
//               <Label htmlFor="password" className="text-[13px] text-white/70">
//                 Password
//               </Label>
//               <div className="relative">
//                 <LockIcon
//                   aria-hidden
//                   className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
//                 />
//                 <Input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="At least 8 characters"
//                   autoComplete="new-password"
//                   minLength={8}
//                   required
//                   className={passwordInputClassName}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((visible) => !visible)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   aria-pressed={showPassword}
//                   className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-md text-white/40 transition-colors hover:bg-white/5 hover:text-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
//                 >
//                   {showPassword ? (
//                     <EyeOffIcon aria-hidden className="size-4" />
//                   ) : (
//                     <EyeIcon aria-hidden className="size-4" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className="flex flex-col gap-2">
//               <Label
//                 htmlFor="confirmPassword"
//                 className="text-[13px] text-white/70"
//               >
//                 Confirm password
//               </Label>
//               <div className="relative">
//                 <LockIcon
//                   aria-hidden
//                   className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
//                 />
//                 <Input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder="Re-enter your password"
//                   autoComplete="new-password"
//                   minLength={8}
//                   required
//                   className={passwordInputClassName}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword((visible) => !visible)}
//                   aria-label={
//                     showConfirmPassword
//                       ? "Hide confirm password"
//                       : "Show confirm password"
//                   }
//                   aria-pressed={showConfirmPassword}
//                   className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-md text-white/40 transition-colors hover:bg-white/5 hover:text-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOffIcon aria-hidden className="size-4" />
//                   ) : (
//                     <EyeIcon aria-hidden className="size-4" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-start gap-2.5">
//               <Checkbox
//                 id="terms"
//                 name="terms"
//                 required
//                 className="mt-0.5 border-white/20 data-checked:border-brand data-checked:bg-brand"
//               />
//               <Label
//                 htmlFor="terms"
//                 className="text-[13px] leading-relaxed font-normal text-white/55"
//               >
//                 I agree to the Terms of Service and Privacy Policy.
//               </Label>
//             </div>

//             <Button
//               type="submit"
//               className="h-11 w-full rounded-lg bg-brand text-sm font-medium text-white shadow-[0_10px_30px_-16px_rgba(109,75,255,0.9)] hover:bg-brand-strong"
//             >
//               Create account
//             </Button>
//           </form>

//           <p className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-white/50">
//             Already have an account?{" "}
//             <Link
//               href="/sign-in"
//               className="font-medium text-brand-soft transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  BriefcaseBusiness,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

const inputClassName =
  "h-11 rounded-lg border-white/10 bg-white/[0.04] pl-10 text-sm text-white placeholder:text-white/35 focus-visible:border-brand-soft focus-visible:ring-brand/25"

const passwordInputClassName = `${inputClassName} pr-11`

type UserRole = "seeker" | "recruiter" | "admin"

export default function SignUpPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [role, setRole] = useState<UserRole>("seeker")

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")
    setSuccess("")

    const formData = new FormData(event.currentTarget)

    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    const confirmPassword = String(
      formData.get("confirmPassword") ?? ""
    )

    const acceptedTerms = formData.get("terms") === "on"

    // Validate name
    if (!name) {
      setError("Please enter your full name.")
      return
    }

    // Validate email
    if (!email) {
      setError("Please enter your email address.")
      return
    }

    // Validate password
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    // Confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    // Validate terms
    if (!acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.")
      return
    }

    // Validate role
    if (!["seeker", "recruiter", "admin"].includes(role)) {
      setError("Please select a valid account type.")
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        callbackURL: "/",
      })

      if (error) {
        setError(error.message || "Unable to create your account.")
        return
      }

      if (data) {
        setSuccess("Account created successfully! Redirecting...")

        setTimeout(() => {
          router.push("/")
          router.refresh()
        }, 1500)
      }
    } catch (err) {
      console.error("Sign up error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-[#040405] px-4 py-12 text-white sm:px-6 sm:py-16">

      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_50%_0%,rgba(109,75,255,0.18),transparent_70%)]"
      />

      <div className="relative w-full max-w-md">

        <div className="rounded-2xl border border-white/10 bg-[#0b0b0f]/90 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-8">

          {/* Header */}
          <div className="mb-8 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-soft">
              Get started
            </p>

            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[1.75rem]">
              Create your hireloop account
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Join thousands of candidates finding their next role.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-[13px] text-white/70">
                Full name
              </Label>

              <div className="relative">
                <UserIcon
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
                />

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  required
                  disabled={isLoading}
                  className={inputClassName}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-[13px] text-white/70">
                Email address
              </Label>

              <div className="relative">
                <MailIcon
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
                />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  className={inputClassName}
                />
              </div>
            </div>

            {/* Account Role */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="role" className="text-[13px] text-white/70">
                Select account type
              </Label>

              <div className="relative">
                <BriefcaseBusiness
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
                />

                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(event) =>
                    setRole(event.target.value as UserRole)
                  }
                  disabled={isLoading}
                  className="h-11 w-full appearance-none rounded-lg border border-white/10 bg-[#111116] pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-brand-soft"
                >
                  <option value="seeker">Job Seeker</option>
                  <option value="recruiter">Recruiter</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <p className="text-xs text-white/40">
                Choose your account type to continue.
              </p>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-[13px] text-white/70">
                Password
              </Label>

              <div className="relative">
                <LockIcon
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
                />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  disabled={isLoading}
                  className={passwordInputClassName}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-md text-white/40 transition-colors hover:bg-white/5 hover:text-white/80"
                >
                  {showPassword ? (
                    <EyeOffIcon aria-hidden className="size-4" />
                  ) : (
                    <EyeIcon aria-hidden className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="confirmPassword"
                className="text-[13px] text-white/70"
              >
                Confirm password
              </Label>

              <div className="relative">
                <LockIcon
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
                />

                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  disabled={isLoading}
                  className={passwordInputClassName}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((visible) => !visible)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  aria-pressed={showConfirmPassword}
                  className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-md text-white/40 transition-colors hover:bg-white/5 hover:text-white/80"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon aria-hidden className="size-4" />
                  ) : (
                    <EyeIcon aria-hidden className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5">
              <Checkbox
                id="terms"
                name="terms"
                required
                disabled={isLoading}
                className="mt-0.5 border-white/20 data-checked:border-brand data-checked:bg-brand"
              />

              <Label
                htmlFor="terms"
                className="text-[13px] leading-relaxed font-normal text-white/55"
              >
                I agree to the Terms of Service and Privacy Policy.
              </Label>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div
                role="status"
                className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
              >
                {success}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full rounded-lg bg-brand text-sm font-medium text-white shadow-[0_10px_30px_-16px_rgba(109,75,255,0.9)] hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

          </form>

          {/* Sign In */}
          <p className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-white/50">
            Already have an account?{" "}

            <Link
              href="/sign-in"
              className="font-medium text-brand-soft transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </section>
  )
}
