"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BriefcaseBusiness, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const pathname = usePathname()

  const allowedPaths = [
    "/",
    "/jobseeker",
    "/recruiter",
    "/about",
    "/contact",
    "/blog",
    "/faq",
    "/privacy-policy",
    "/terms_conditions",
    "/legalities",
    "/dataProtection",
  ]

  if (!allowedPaths.includes(pathname)) return null

  const isRecruiterPage = pathname === "/recruiter"

  return (
    <>
      <nav
        className={cn(
          "w-full bg-[#2563eb] z-50 transition-all duration-300",
          isScrolled ? "fixed top-0 shadow-lg backdrop-blur-sm bg-[#2563eb]/95" : "relative",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 group">
                <Image
                  src="/recruitg.png"
                  alt="Recruit-G"
                  width={140}
                  height={40}
                  className="h-6 w-auto transition-transform duration-200 group-hover:scale-105"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:block ml-12">
                <NavigationMenu>
                  <NavigationMenuList className="gap-2">
                    {navItems.map((item) => (
                      <NavigationMenuItem key={item.name}>
                        <NavigationMenuLink
                          asChild
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[active]:bg-white/20 data-[state=open]:bg-white/10 transition-all duration-200",
                            pathname === item.href && "bg-white/20 text-white",
                          )}
                        >
                          <Link href={item.href} className="font-medium">
                            {item.name}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link href={!isRecruiterPage ? "/auth/register?userType=candidate" : "/auth/register?userType=recruiter"}>
                <Button
                  variant="secondary"
                  className="bg-white text-[#2563eb] hover:bg-blue-50 font-medium shadow-sm hover:shadow-md transition-all duration-200 border-0"
                >
                  <BriefcaseBusiness size={18} className="mr-2" />
                  Login / Register
                </Button>
              </Link>
              <Link href={!isRecruiterPage ? "/recruiter" : "/"}>
                <Button className="bg-blue-100 text-blue-900 hover:bg-blue-200 font-medium shadow-sm hover:shadow-md transition-all duration-200 border border-blue-600 hover:border-blue-700">
                  <BriefcaseBusiness size={18} className="mr-2" />
                  {!isRecruiterPage ? "Employer" : "Find a Job"}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-white border-l border-gray-200">
                  <SheetHeader className="text-left pb-6 border-b border-gray-100">
                    <SheetTitle className="flex items-center justify-between">
                      <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <Image
                          src="/placeholder.svg?height=32&width=120&text=Recruit-G"
                          alt="Recruit-G"
                          width={120}
                          height={32}
                          className="h-8 w-auto"
                        />
                      </Link>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4" />
                        </Button>
                      </SheetClose>
                    </SheetTitle>
                    <SheetDescription className="text-gray-600">Navigate through our platform</SheetDescription>
                  </SheetHeader>

                  <nav className="flex flex-col gap-2 mt-6">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-[#2563eb] transition-all duration-200 font-medium",
                            pathname === item.href && "bg-blue-50 text-[#2563eb] border-l-4 border-[#2563eb]",
                          )}
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}

                    <div className="border-t border-gray-100 mt-6 pt-6 space-y-3">
                      <SheetClose asChild>
                        <Link
                          href={
                            !isRecruiterPage ? "/auth/register?userType=candidate" : "/auth/register?userType=recruiter"
                          }
                        >
                          <Button
                            variant="outline"
                            className="w-full justify-start text-[#2563eb] border-[#2563eb] hover:bg-blue-50"
                          >
                            <BriefcaseBusiness size={18} className="mr-2" />
                            Login / Register
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href={!isRecruiterPage ? "/recruiter" : "/"}>
                          <Button className="w-full justify-start bg-[#2563eb] text-white hover:bg-blue-700">
                            <BriefcaseBusiness size={18} className="mr-2" />
                            {!isRecruiterPage ? "Post a Job" : "Find a Job"}
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      {isScrolled && <div className="h-16 lg:h-20" />}
    </>
  )
}

export default Navbar
