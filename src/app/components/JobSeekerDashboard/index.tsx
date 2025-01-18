import BrowseJobs from "../JobSeekerDashboard/BrowseJobs";
import DreamJob from "../JobSeekerDashboard/DreamJob";
import FeaturedJobs from "../JobSeekerDashboard/FeatureJobs";
import FindMatch from "../JobSeekerDashboard/FindMatch";
import HomePage from "../JobSeekerDashboard/HomePage";
import HowItWorks from "../JobSeekerDashboard/HowItWorks";
import JobCategories from "../JobSeekerDashboard/PopularJobCategories";

const LandingPage = () => {
  return (
    <div>
      <HomePage />
      <HowItWorks/>
      <BrowseJobs/>
      <FindMatch/>
      <FeaturedJobs/>
      <DreamJob/>
      <JobCategories />
    </div>
  );
};

export default LandingPage;
