import { useRef } from 'react';
import { Header } from './components/Header';
import { SkipLink } from './components/SkipLink';
import { useScrolledPast } from './hooks/useScrolledPast';
import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { HowIWork } from './sections/HowIWork';
import { OtherProducts } from './sections/OtherProducts';
import { PersonalProject } from './sections/PersonalProject';
import { SelectedWork } from './sections/SelectedWork';
import { Stack } from './sections/Stack';

export function App() {
  const heroRef = useRef<HTMLElement>(null);
  const scrolled = useScrolledPast(heroRef);

  return (
    <>
      <SkipLink />
      <Header scrolled={scrolled} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero ref={heroRef} />
        <SelectedWork />
        <OtherProducts />
        <PersonalProject />
        <HowIWork />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
