"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
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
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  const handleAuthAction = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <nav
      className={`w-full ${
        isScrolled ? "fixed top-0 shadow-md" : ""
      } bg-purple-50 z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-300"
              onClick={handleAuthAction}
            >
              {session ? "Logout" : "Login / Register"}
            </Button>
            {session && (
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                Post Job
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-300"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-purple-50"
              >
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className="text-purple-800 hover:bg-purple-200 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="w-full bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-300"
                      onClick={handleAuthAction}
                    >
                      {session ? "Logout" : "Login / Register"}
                    </Button>
                  </SheetClose>
                  {session && (
                    <SheetClose asChild>
                      <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                        Post Job
                      </Button>
                    </SheetClose>
                  )}
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
