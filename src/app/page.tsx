import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Editorial from "@/components/Editorial";
import Metrics from "@/components/Metrics";
import Showcase from "@/components/Showcase";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Editorial />
        <Metrics />
        <Showcase />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
