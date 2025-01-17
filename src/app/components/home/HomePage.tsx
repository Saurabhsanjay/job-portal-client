"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", { jobTitle, location, company });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-orange-800/90">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl text-orange-700/80 mb-8">
              Discover thousands of job opportunities with the best companies in
              your industry. Your next career move is just a click away.
            </p>
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      type="text"
                      placeholder="Job Title"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="flex-grow"
                    />
                    <Input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-grow"
                    />
                    <Input
                      type="text"
                      placeholder="Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="flex-grow"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Search className="mr-2 h-4 w-4" /> Search Jobs
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/job-5382501_1920.jpg"
              alt="Job search illustration"
              width={400}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
