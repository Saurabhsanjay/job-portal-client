import BrowseJobs from "../BrowseJobs/BrowseJobs";
import FeaturedJobs from "../FeaturedJobs/FeatureJobs";
import FindMatch from "../FindMatch/FindMatch";
import HomePage from "../home/HomePage";
import HowItWorks from "../HowItWorks/HowItWorks";
import JobCategories from "../jobCategory/PopularJobCategories";

const LandingPage = () => {
  return (
    <div>
      <HomePage />
      <HowItWorks/>
      <BrowseJobs/>
      <FindMatch/>
      <FeaturedJobs/>
      <JobCategories />
    </div>
  );
};

export default LandingPage;
