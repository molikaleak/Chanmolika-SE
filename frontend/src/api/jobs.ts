import { jobLocations } from "../data/jobLocations";

export async function fetchJobs() {
  // For now, return static data. Can be replaced with API call later.
  return jobLocations;
}