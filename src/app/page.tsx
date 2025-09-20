import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Portfolio } from "@/components/sections/portfolio";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
