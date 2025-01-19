"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <nav
      className={`w-full ${
        isScrolled ? "fixed top-0 shadow-md" : ""
      } bg-orange-50 z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between ml-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-orange-600 text-2xl font-bold">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Recruit-G"
                  width={40}
                  height={40}
                  className="w-full h-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-orange-800 hover:bg-orange-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              className="mr-2 bg-orange-100 text-orange-800 hover:bg-orange-200"
            >
              Login / Register
            </Button>
            <Button className="bg-orange-600 text-white hover:bg-orange-700">
              Post Job
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-orange-100 text-orange-800 hover:bg-orange-200"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-orange-800 hover:bg-orange-200 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full bg-orange-100 text-orange-800 hover:bg-orange-200"
                  >
                    Login / Register
                  </Button>
                  <Button className="w-full bg-orange-600 text-white hover:bg-orange-700">
                    Post Job
                  </Button>
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
