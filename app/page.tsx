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
      <Socials />
      <Projects />
      <Activity />
      <Blogs />
      <Footer />
    </>
  );
}
