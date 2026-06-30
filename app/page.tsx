import Socials from "./components/Socials";
import Projects from "./components/Projects";
import Intro from "./components/Intro";
import Activity from "./components/Activity";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";

export const dynamic = 'force-static';

export default function Home() {
  return (
    <>
      <Intro />
      <div className="animate-fade-up delay-1">
        <Socials />
      </div>
      <div className="animate-fade-up delay-2">
        <Projects />
      </div>
      <div className="animate-fade-up delay-3">
        <Activity />
      </div>
      <div className="animate-fade-up delay-4">
        <Blogs />
      </div>
      <div className="animate-fade-up delay-5">
        <Footer />
      </div>
    </>
  );
}
