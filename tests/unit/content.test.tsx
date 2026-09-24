import { render, screen } from '@testing-library/react';
import {
  contact,
  hero,
  isSet,
  otherProducts,
  personalProject,
  selectedWork,
  TODO,
} from '../../src/content';
import { Hero } from '../../src/sections/Hero';
import { Contact } from '../../src/sections/Contact';

const projects = [...selectedWork.projects, personalProject.project, ...otherProducts.products];

describe('content integrity', () => {
  it.each(projects.map((project) => [project.name, project] as const))(
    '%s has a name, a description and at least one stack item',
    (_name, project) => {
      expect(project.name.trim()).not.toBe('');
      expect(project.description.trim()).not.toBe('');
      expect(project.stack.length).toBeGreaterThan(0);
    },
  );

  it('uses unique project ids', () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('treats TODO and empty values as unset', () => {
    expect(isSet(TODO)).toBe(false);
    expect(isSet('')).toBe(false);
    expect(isSet('https://example.com')).toBe(true);
  });
});

describe('links whose URL is TODO', () => {
  it('are hidden in the hero', () => {
    render(<Hero />);
    for (const action of hero.actions) {
      const link = screen.queryByRole('link', { name: new RegExp(`^${action.label}`) });
      if (isSet(action.href)) expect(link).toHaveAttribute('href', action.href);
      else expect(link).not.toBeInTheDocument();
    }
  });

  it('are hidden in the contact section', () => {
    render(<Contact />);
    for (const link of contact.links) {
      const element = screen.queryByRole('link', { name: new RegExp(`^${link.label}`) });
      if (isSet(link.href)) expect(element).toBeInTheDocument();
      else expect(element).not.toBeInTheDocument();
    }
  });
});
