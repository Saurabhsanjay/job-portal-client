"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

export default function Resume() {
    const [lastUpdated] = useState(new Date()); // Simulates a backend date
    const [uploadedFile, setUploadedFile] = useState(null); // Stores the uploaded file
    const [errorMessage, setErrorMessage] = useState(""); // Stores validation error

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const allowedFormats = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        const maxSize = 5 * 1024 * 1024; // 5MB

        // Validate file format
        if (!allowedFormats.includes(file.type)) {
            setErrorMessage("Unsupported file format. Only PDF, DOC, and DOCX are allowed.");
            setUploadedFile(null);
            return;
        }

        // Validate file size
        if (file.size > maxSize) {
            setErrorMessage("File size exceeds the 5MB limit.");
            setUploadedFile(null);
            return;
        }

        // If valid, update the state
        setUploadedFile(file);
        setErrorMessage("");
    };

    return (
        <div className="space-y-6">
            <Card className="p-6 shadow-sm">
                <div className="space-y-8">
                    {/* Header Section */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">My Resume</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Last updated: {format(lastUpdated, "MMM d, yyyy 'at' h:mm a")}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Changes</Button>
                        </div>
                    </div>

                    {/* Current Resume Section */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-blue-600" />
                            <div className="flex-1">
                                <h3 className="text-sm font-medium">Current Resume</h3>
                                <p className="text-sm text-gray-500">
                                    {uploadedFile ? uploadedFile.name : "jerome-resume.pdf"}
                                </p>
                            </div>
                            <Button variant="outline" size="sm">
                                Download
                            </Button>
                        </div>
                    </div>

                    {/* Upload New Resume Section */}
                    <div className="space-y-4">
                        <Label>Upload New Resume</Label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg">
                            <div className="p-8">
                                <div className="mx-auto flex flex-col items-center">
                                    <Input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        id="resume-upload"
                                        onChange={handleFileUpload}
                                    />
                                    <label htmlFor="resume-upload" className="flex flex-col items-center cursor-pointer">
                                        <div className="mb-4">
                                            <Upload className="h-10 w-10 text-gray-400" />
                                        </div>
                                        <div className="text-sm font-medium text-gray-700">Drop your resume here or click to browse</div>
                                        <div className="mt-2 text-xs text-gray-500">
                                            Supported formats: PDF, DOC, DOCX (Max file size: 5MB)
                                        </div>
                                    </label>
                                </div>
                                {errorMessage && (
                                    <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* Resume Privacy */}
                    <div className="space-y-4">
                        <Label>Resume Privacy</Label>
                        <Alert variant="destructive" className="flex items-start ">
                            <AlertCircle className="h-4 w-4 self-start" />
                            <AlertDescription className="mt-1">
                                Your resume will be visible to employers when you apply for jobs. You can control additional visibility
                                settings below.
                            </AlertDescription>
                        </Alert>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="searchable" className="rounded border-gray-300" />
                                <Label htmlFor="searchable" className="text-sm font-normal">
                                    Make my resume searchable for employers
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="public" className="rounded border-gray-300" />
                                <Label htmlFor="public" className="text-sm font-normal">
                                    Allow my resume to be visible in public search results
                                </Label>
                            </div>
                        </div>
                    </div>



                    {/* Bottom Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
