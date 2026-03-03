import About from "./components/About";
import Footer from "./components/Footer";
import Formulas from "./components/Formulas";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Videos from "./components/Videos";

export default function App() {
  return (
    <div className="min-h-screen bg-site-bg text-site-fg font-body">
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <Stats />
        <section id="videos">
          <Videos />
        </section>
        <section id="formulas">
          <Formulas />
        </section>
        <section id="about">
          <About />
        </section>
      </main>
      <Footer />
    </div>
  );
}
