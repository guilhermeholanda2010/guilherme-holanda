import { render, screen, within } from '@testing-library/react';
import { WorktreePanel } from '../../src/components/WorktreePanel';
import { StatView } from '../../src/components/StatView';
import { statText } from '../../src/components/statText';
import { howIWork, selectedWork } from '../../src/content';
import { matchingQueries } from './setup';

const stats = selectedWork.projects.flatMap((project) => project.stats);

describe('with prefers-reduced-motion: reduce', () => {
  beforeEach(() => {
    matchingQueries.add('(prefers-reduced-motion: reduce)');
  });

  it('renders every number at its final value immediately', () => {
    render(
      <ul>
        {stats.map((stat) => (
          <StatView key={stat.label} stat={stat} />
        ))}
      </ul>,
    );

    const visible = screen.getAllByTestId('stat-visible').map((element) => element.textContent);
    expect(visible).toEqual(stats.map((stat) => statText(stat)));
    expect(visible).toContain('R$400K');
    expect(visible).toContain('1,000+');
  });

  it('shows the worktree panel finished', () => {
    const { container } = render(<WorktreePanel {...howIWork.panel} />);
    const rows = container.querySelectorAll('.panel-row');

    expect(rows).toHaveLength(howIWork.panel.worktrees.length);
    howIWork.panel.worktrees.forEach((worktree, index) => {
      const row = rows[index] as HTMLElement;
      expect(row).toHaveAttribute('data-done', 'true');
      expect(within(row).getByText(worktree.done)).toBeInTheDocument();
    });
  });
});

describe('without reduced motion', () => {
  it('starts numbers at zero until they scroll into view', () => {
    render(
      <ul>
        <StatView stat={{ prefix: 'R$', value: 400, suffix: 'K', label: 'MRR' }} />
      </ul>,
    );
    expect(screen.getByTestId('stat-visible')).toHaveTextContent('R$0K');
    // Screen readers always get the final value.
    expect(screen.getByText('R$400K', { selector: '.sr-only' })).toBeInTheDocument();
  });
});
