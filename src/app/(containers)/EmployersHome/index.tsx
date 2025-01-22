import HiringProcess from "./HiringProcess";
import EmployerHero from "./HomePage";
import HowItWorks from "./HowItWorks";
import PostAJob from "./PostAJob";

const LandingPage = () => {
  return (
    <div>
     <EmployerHero/>
          <HowItWorks/>
          <PostAJob/>
     <HiringProcess/>
    </div>
  );
};

export default LandingPage;
