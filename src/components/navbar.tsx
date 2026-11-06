import Image from "next/image"
import Link from "next/link"
import { MenuIcon, XIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const

const ctaClassName =
  "h-11 rounded-lg bg-brand px-6 text-[15px] font-medium text-white shadow-[0_4px_12px_-6px_rgba(109,75,255,0.55)] hover:bg-brand-strong"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-nav text-nav-foreground">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          aria-label="hireloop home"
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
        >
          <Image
            src="/logo.png"
            alt="hireloop"
            width={154}
            height={44}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <nav aria-label="Main" className="flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm text-[15px] font-medium text-nav-muted transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-soft"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-7">
            <Separator orientation="vertical" className="h-6 bg-white/15" />
            <Link
              href="/sign-in"
              className="rounded-sm text-[15px] font-medium text-brand-soft transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-soft"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className={buttonVariants({ className: ctaClassName })}
            >
              Get Started
            </Link>
          </div>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="size-10 text-nav-foreground hover:bg-white/10 hover:text-white aria-expanded:bg-white/10 aria-expanded:text-white lg:hidden"
              />
            }
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            showCloseButton={false}
            className="border-white/10 bg-nav p-0 text-nav-foreground data-[side=right]:w-[22rem] data-[side=right]:max-w-[88vw]"
          >
            <SheetHeader className="flex-row items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SheetDescription className="sr-only">
                Browse hireloop pages and account actions.
              </SheetDescription>
              <Link
                href="/"
                aria-label="hireloop home"
                className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
              >
                <Image
                  src="/logo.png"
                  alt="hireloop"
                  width={154}
                  height={44}
                  className="h-8 w-auto"
                />
              </Link>
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Close navigation menu"
                    className="size-9 text-nav-muted hover:bg-white/10 hover:text-white"
                  />
                }
              >
                <XIcon className="size-5" />
              </SheetClose>
            </SheetHeader>

            <nav aria-label="Mobile" className="flex flex-col gap-1 px-3 py-4">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  nativeButton={false}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-3 text-[15px] font-medium text-nav-muted transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>

            <SheetFooter className="mt-auto flex-col gap-3 border-t border-white/10 p-5">
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "h-11 w-full justify-center text-brand-soft hover:bg-white/5 hover:text-white",
                })}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({
                  className: `${ctaClassName} w-full justify-center`,
                })}
              >
                Get Started
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
