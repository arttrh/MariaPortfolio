import SubNav from "@/components/SubNav";
import Hero from "@/components/Hero";
import Overture from "@/components/Overture";
import Chapters from "@/components/Chapters";
import Highlights from "@/components/Highlights";
import Differentiators from "@/components/Differentiators";
import Trajectory from "@/components/Trajectory";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SubNav />
      <main className="flex-1">
        <Hero />
        <Overture />
        <Chapters />
        <Highlights />
        <Differentiators />
        <Trajectory />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
