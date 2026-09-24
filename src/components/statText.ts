import type { Stat } from '../content';

const format = (value: number) => value.toLocaleString('en-US');

/** "R$400K", "1,000+", or the fixed `display` text. Pass `value` to render an in-between frame. */
export const statText = (stat: Stat, value = stat.value) =>
  stat.display ?? `${stat.prefix ?? ''}${format(value ?? 0)}${stat.suffix ?? ''}`;
