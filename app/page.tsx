import { Header } from "@/components/Header";
import { SearchExperience } from "@/components/SearchExperience";
import { Discover } from "@/components/Discover";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Header />
      <main id="main">
        <SearchExperience />
        <Discover />
        <About />
      </main>
      <Footer />
    </>
  );
}
