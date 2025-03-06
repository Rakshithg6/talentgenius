
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import JobCard from './JobCard';
import { jobData } from '@/data/jobData';

type JobSearchProps = {
  className?: string;
}

const JobSearch = ({ className }: JobSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState<typeof jobData>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    // Filter jobs based on search term and location
    const results = jobData.filter(job => {
      const matchesTitle = job.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());
      return (matchesTitle || matchesCompany) && matchesLocation;
    });
    
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-white rounded-xl shadow-subtle p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Find Your Perfect Job</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-1">
            <Input
              type="text"
              placeholder="Job title or keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="col-span-1 md:col-span-1">
            <Input
              type="text"
              placeholder="Location (e.g. Bangalore)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="col-span-1 md:col-span-1">
            <Button 
              onClick={handleSearch} 
              className="w-full gap-2"
            >
              <Search className="h-4 w-4" />
              Search Jobs
            </Button>
          </div>
        </div>
      </div>

      {hasSearched && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">
            {searchResults.length} {searchResults.length === 1 ? 'Job' : 'Jobs'} Found
          </h3>
          
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {searchResults.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-secondary/20 rounded-lg">
              <h4 className="text-lg font-medium mb-2">No jobs found</h4>
              <p className="text-muted-foreground">
                Try adjusting your search terms or location
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobSearch;
