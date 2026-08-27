import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Specialties from "@/components/Specialties";
import Experience from "@/components/Experience";
import Differentiators from "@/components/Differentiators";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Specialties />
        <Experience />
        <Differentiators />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
