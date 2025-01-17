import FeaturedJobs from "../FeaturedJobs/FeatureJobs";
import HomePage from "../home/HomePage";
import PopularJobCategories from "../jobCategory/PopularJobCategories";

const LandingPage = () => {
  return (
    <div>
      <HomePage />
      <FeaturedJobs/>
      <PopularJobCategories />
    </div>
  );
};

export default LandingPage;
