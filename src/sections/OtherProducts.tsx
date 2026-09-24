import { otherProducts, selectedWork } from '../content';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { StackList } from '../components/StackList';

export function OtherProducts() {
  return (
    <Section id="other-products" heading={otherProducts.heading} headingClassName="h-section-sm">
      <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-3">
        {otherProducts.products.map((product, index) => (
          <Reveal
            key={product.id}
            as="article"
            delay={index * 0.06}
            className="border-t border-line pt-6"
            aria-labelledby={`${product.id}-name`}
          >
            <h3 id={`${product.id}-name`} className="h-minor-lg">
              {product.name}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-[1.6]">{product.description}</p>
            <p className="mt-4 text-[0.9375rem] leading-[1.6] text-muted">
              <span className="font-semibold text-ink">{otherProducts.participationLabel}:</span>{' '}
              {product.participation}
            </p>
            {product.stat && (
              <p className="mt-4 text-[0.9375rem] font-medium text-accent">{product.stat}</p>
            )}
            <StackList label={selectedWork.stackLabel} items={product.stack} compact />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
