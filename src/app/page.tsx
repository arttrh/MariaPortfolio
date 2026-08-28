import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import About from "@/components/About";
import ProblemSolution from "@/components/ProblemSolution";
import Services from "@/components/Services";
import Audience from "@/components/Audience";
import Process from "@/components/Process";
import Trust from "@/components/Trust";
import FAQ from "@/components/FAQ";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ValueProps />
        <About />
        <ProblemSolution />
        <Services />
        <Audience />
        <Process />
        <Trust />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
