"use client";

import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

// Candidate registration
type CandidateData = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};

export const registerCandidate = async (userData: CandidateData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return response.json();
};

export const useRegisterCandidate = () => {
  return useMutation({
    mutationFn: registerCandidate,
  });
};

// Recruiter registration
type RecruiterData = {
  name: string;
  email: string;
  password: string;
};

export const registerRecruiter = async (recruiterData: RecruiterData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recruiterData),
  });

  if (!response.ok) {
    throw new Error("Failed to register recruiter");
  }

  return response.json();
};

export const useRegisterRecruiter = () => {
  return useMutation({
    mutationFn: registerRecruiter,
  });
};
