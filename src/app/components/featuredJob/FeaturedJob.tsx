import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";

interface JobProps {
  title: string;
  postTime: string;
  location: string;
  CTC: string;
  type: "Full-Time" | "Part-Time";
  category: "Private" | "Public";
  urgency: "Urgent" | "Normal";
  description: string;
}

const jobs: JobProps[] = [
  {
    title: "Software Engineer",
    postTime: "2 hours ago",
    location: "Remote",
    CTC: "$80,000 - $120,000",
    type: "Full-Time",
    category: "Private",
    urgency: "Urgent",
    description:
      "We are looking for a Software Engineer with 3+ years of experience in web development.",
  },
  {
    title: "Data Analyst",
    postTime: "1 day ago",
    location: "New York, NY",
    CTC: "$60,000 - $90,000",
    type: "Part-Time",
    category: "Public",
    urgency: "Normal",
    description:
      "Seeking a Data Analyst to help with data visualization and analysis tasks.",
  },
  {
    title: "Marketing Manager",
    postTime: "3 days ago",
    location: "San Francisco, CA",
    CTC: "$100,000 - $130,000",
    type: "Full-Time",
    category: "Private",
    urgency: "Urgent",
    description:
      "An experienced Marketing Manager is needed to lead our digital campaigns.",
  },
];

const FeaturedJobs: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job, index) => (
        <Card
          key={index}
          className="max-w-md mx-auto shadow-lg border border-gray-200 rounded-lg"
        >
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>
              <div className="flex items-center justify-between">
                <span>{job.postTime}</span>
                <Badge variant="outline">{job.urgency}</Badge>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>CTC:</strong> {job.CTC}
              </p>
              <p>
                <strong>Type:</strong> {job.type}
              </p>
              <p>
                <strong>Category:</strong> {job.category}
              </p>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* {selectedJob && (
        <Modal isOpen={!!selectedJob} onClose={() => toggleModal(null)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{selectedJob.title}</h2>
            <p className="text-sm text-gray-600 mb-4">
              Posted: {selectedJob.postTime}
            </p>
            <p className="mb-4">{selectedJob.description}</p>
            <Button variant="outline" onClick={() => toggleModal(null)}>
              Close
            </Button>
          </div>
        </Modal>
      )} */}
    </div>
  );
};

export default FeaturedJobs;
