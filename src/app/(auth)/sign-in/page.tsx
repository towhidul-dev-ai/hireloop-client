// "use client"

// import { useState, type FormEvent } from "react"
// import Link from "next/link"
// import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// const inputClassName =
//   "h-11 rounded-lg border-white/10 bg-white/[0.04] pl-10 text-sm text-white placeholder:text-white/35 focus-visible:border-brand-soft focus-visible:ring-brand/25"

// const passwordInputClassName = `${inputClassName} pr-11`

// export default function SignInPage() {

//   const [showPassword, setShowPassword] = useState(false)

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()

//     const formData = new FormData(event.currentTarget)
//     const values = {
//       email: String(formData.get("email") ?? "").trim(),
//       password: String(formData.get("password") ?? ""),
//       remember: formData.get("remember") === "on",
//     }

//     console.log("Sign in form data:", values)

//     // TODO: hook this up to Better Auth, e.g. authClient.signIn.email(values)
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
//               Welcome back
//             </p>
//             <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[1.75rem]">
//               Sign in to hireloop
//             </h1>
//             <p className="mt-2 text-sm text-white/50">
//               Pick up where you left off and keep your job search moving.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
//                   placeholder="Enter your password"
//                   autoComplete="current-password"
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

//             <div className="flex items-center justify-between gap-3">
//               <div className="flex items-center gap-2">
//                 <Checkbox
//                   id="remember"
//                   name="remember"
//                   className="border-white/20 data-checked:border-brand data-checked:bg-brand"
//                 />
//                 <Label
//                   htmlFor="remember"
//                   className="text-[13px] font-normal text-white/55"
//                 >
//                   Remember me
//                 </Label>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="h-11 w-full rounded-lg bg-brand text-sm font-medium text-white shadow-[0_10px_30px_-16px_rgba(109,75,255,0.9)] hover:bg-brand-strong"
//             >
//               Sign in
//             </Button>
//           </form>

//           <p className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-white/50">
//             Don&apos;t have an account?{" "}
//             <Link
//               href="/sign-up"
//               className="font-medium text-brand-soft transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
//             >
//               Create one
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
import { useRouter, useSearchParams } from "next/navigation"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

const inputClassName =
  "h-11 rounded-lg border-white/10 bg-white/[0.04] pl-10 text-sm text-white placeholder:text-white/35 focus-visible:border-brand-soft focus-visible:ring-brand/25"

const passwordInputClassName = `${inputClassName} pr-11`

export default function SignInPage() {

  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? "/"
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")
    setSuccess("")
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    const remember = formData.get("remember") === "on"

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: remember,
        callbackURL: redirectTo,
      })

      if (error) {
        setError(error.message || "Invalid email or password.")
        return
      }

      if (data) {
        setSuccess("Login successful! Redirecting...")

        router.replace(redirectTo)
        router.refresh()
      }
    } catch (err) {
      console.error("Sign in error:", err)

      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-[#040405] px-4 py-12 text-white sm:px-6 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_50%_0%,rgba(109,75,255,0.18),transparent_70%)]"
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-[#0b0b0f]/90 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-8">

          {/* Header */}
          <div className="mb-8 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-soft">
              Welcome back
            </p>

            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[1.75rem]">
              Sign in to hireloop
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Pick up where you left off and keep your job search moving.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  className={passwordInputClassName}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-md text-white/40 transition-colors hover:bg-white/5 hover:text-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
                >
                  {showPassword ? (
                    <EyeOffIcon aria-hidden className="size-4" />
                  ) : (
                    <EyeIcon aria-hidden className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  name="remember"
                  defaultChecked={true}
                  disabled={isLoading}
                  className="border-white/20 data-checked:border-brand data-checked:bg-brand"
                />

                <Label
                  htmlFor="remember"
                  className="text-[13px] font-normal text-white/55"
                >
                  Remember me
                </Label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div
                role="status"
                className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
              >
                {success}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full rounded-lg bg-brand text-sm font-medium text-white shadow-[0_10px_30px_-16px_rgba(109,75,255,0.9)] hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-white/50">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-brand-soft transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
