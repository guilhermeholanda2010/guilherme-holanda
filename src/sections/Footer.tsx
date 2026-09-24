import { identity } from '../content';
import { Container } from '../components/Container';

export function Footer() {
  return (
    <footer className="border-t border-line py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <Container className="flex flex-wrap justify-between gap-x-8 gap-y-2 text-[0.9375rem] text-muted">
        <p>
          © {new Date().getFullYear()} {identity.name}
        </p>
        <p>{identity.location}</p>
      </Container>
    </footer>
  );
}
