"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Navbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav
      ref={ref}
      className={cn(
        "bg-card dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-muted-foreground",
        className
      )}
      {...props}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <a
          href="/"
          className={cn("flex items-center space-x-3 rtl:space-x-reverse")}
        >
          <img
            src="https://recruit-g.com/wp-content/uploads/2024/09/2-2.png"
            className="h-16"
            alt="Flowbite Logo"
          />
        </a>
        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
          <Link href="/auth/login">
            <button
              type="button"
              className={cn(
                "text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              )}
            >
              Login / Register
            </button>
          </Link>

          <button
            onClick={toggleMenu}
            type="button"
            className={cn(
              "inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-muted-foreground rounded-lg md:hidden hover:bg-card focus:outline-none focus:ring-2 focus:ring-muted-foreground"
            )}
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={cn(
            "items-center justify-between w-full md:flex md:w-auto md:order-1",
            isMenuOpen ? "block" : "hidden"
          )}
          id="navbar-sticky"
        >
          <ul
            className={cn(
              "flex flex-col p-6 mt-4 font-medium border rounded-lg bg-card md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-card dark:bg-gray-800 md:dark:bg-gray-900"
            )}
          >
            <li>
              <a
                href="/"
                className={cn(
                  "block py-2 px-3 text-card-foreground bg-gray-700 rounded md:bg-transparent md:text-gray-700 md:p-0"
                )}
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="about"
                className={cn(
                  "block py-2 px-3 text-muted-foreground rounded hover:bg-muted-foreground md:hover:bg-transparent md:hover:text-gray-700 md:p-0"
                )}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className={cn(
                  "block py-2 px-3 text-muted-foreground rounded hover:bg-muted-foreground md:hover:bg-transparent md:hover:text-gray-700 md:p-0"
                )}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className={cn(
                  "block py-2 px-3 text-muted-foreground rounded hover:bg-muted-foreground md:hover:bg-transparent md:hover:text-gray-700 md:p-0"
                )}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export { Navbar };
