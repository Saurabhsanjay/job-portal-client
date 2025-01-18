import BrowseJobs from "../BrowseJobs/BrowseJobs";
import DreamJob from "../Dreamob/DreamJob";
import FeaturedJobs from "../FeaturedJobs/FeatureJobs";
import FindMatch from "../FindMatch/FindMatch";
import HomePage from "../Hero/HomePage";
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
      <DreamJob/>
      <JobCategories />
    </div>
  );
};

export default LandingPage;
