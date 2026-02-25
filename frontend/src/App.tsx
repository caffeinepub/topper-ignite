import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Videos from './components/Videos';
import About from './components/About';
import Footer from './components/Footer';

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
        <section id="about">
          <About />
        </section>
      </main>
      <Footer />
    </div>
  );
}
