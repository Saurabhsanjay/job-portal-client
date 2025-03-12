"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BriefcaseBusiness, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle, SheetHeader, 
  SheetDescription
} from "@/components/ui/sheet";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const handleAuthAction = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };


 const pathname=usePathname();

   if(pathname==='/' || pathname==='/jobseeker' || pathname === '/recruiter' || pathname === '/about' || pathname === '/contact' || pathname === '/blog'
     || pathname === '/faq' || pathname === '/privacy-policy' || pathname === '/terms_conditions')
  return (
    <nav
      className={`w-full ${
        isScrolled ? "fixed top-0 shadow-md" : ""
      } bg-purple-50 z-50 transition-all duration-300`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Recruit-G"
                width={120}
                height={60}
                className="h-8"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <NavigationMenu>
                <NavigationMenuList>
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300"
              onClick={handleAuthAction}
            >
              {session ? "Logout" : "Login / Register"}
            </Button>
            {/* {session && ( */}
            { pathname !== '/recruiter' && (
             <Link href="/recruiter" className="flex-shrink-0">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <BriefcaseBusiness size={18} className="mr-2" /> Post a Job
              </Button>
            {/* )} */}
            </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">

<Sheet>
  <SheetTrigger asChild>
    <Button
      variant="outline"
      size="icon"
      className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300"
    >
      <Menu className="h-6 w-6" />
      <span className="sr-only">Open menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent
    side="right"
    className="w-[300px] sm:w-[400px] bg-blue-50"
  >
    {/* ✅ Fix: Add SheetHeader with SheetTitle */}
    <SheetHeader>
      <SheetTitle>
      <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Recruit-G"
                width={120}
                height={60}
                className="h-8"
              />
            </Link>
      </SheetTitle>
      <SheetDescription></SheetDescription>
    </SheetHeader>

    <nav className="flex flex-col gap-4 mt-4">
      {navItems.map((item) => (
        <SheetClose asChild key={item.name}>
          <Link
            href={item.href}
            className="text-blue-800 hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium"
          >
            {item.name}
          </Link>
        </SheetClose>
      ))}
      <SheetClose asChild>
        <Button
          variant="outline"
          className="w-full bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300"
          onClick={handleAuthAction}
        >
          {session ? "Logout" : "Login / Register"}
        </Button>
      </SheetClose>
      {/* {session && ( */}
      { pathname !== '/recruiter' && (
             <Link href="/recruiter" className="flex-shrink-0">
              <SheetClose asChild>
          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
            Post Job
          </Button>
        </SheetClose>
            {/* )} */}
            </Link>
            )}
        
      {/* )} */}
    </nav>
  </SheetContent>
</Sheet>


          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
