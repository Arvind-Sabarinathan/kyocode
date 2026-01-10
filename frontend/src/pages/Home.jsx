import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import Features from "../components/home/Features";
import ProblemShowcase from "../components/home/ProblemShowcase";
import PlatformPhilosophy from "../components/home/PlatformPhilosophy";
import FAQ from "../components/home/FAQ";
import ScrollToTop from "../components/layout/ScrollToTop";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <Features />
      <ProblemShowcase />
      <PlatformPhilosophy />
      <FAQ />
      <ScrollToTop />
    </Layout>
  );
};

export default Home;
