import BrowseJobs from "./BrowseJobs";
import DreamJob from "./DreamJob";
import FeaturedJobs from "./FeatureJobs";
import FindMatch from "./FindMatch";
import HomePage from "./HomePage";
import HowItWorks from "./HowItWorks";
import JobCategories from "./PopularJobCategories";

const LandingPage = () => {
  return (
    <div>
      <HomePage />
      <HowItWorks />
      <BrowseJobs />
      <FindMatch />
      <FeaturedJobs />
      <DreamJob />
      <JobCategories />
    </div>
  );
};

export default LandingPage;
