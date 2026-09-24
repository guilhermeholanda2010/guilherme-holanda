export function StackList({
  label,
  items,
  compact = false,
}: {
  label: string;
  items: string[];
  compact?: boolean;
}) {
  return (
    <div className={compact ? 'mt-5' : 'mt-8'}>
      <p className="mb-2 text-sm font-semibold text-muted">{label}</p>
      <ul className="flex flex-wrap gap-1.5" aria-label={label}>
        {items.map((item) => (
          <li key={item} className="chip">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
