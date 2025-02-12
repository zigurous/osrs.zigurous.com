export function sortByName(
  a: { id: string; title?: string; name?: string },
  b: { id: string; title?: string; name?: string },
): number {
  return (a.title || a.name || a.id).localeCompare(b.title || b.name || b.id);
}

export function autoDetectIcon(id: string): string | undefined {
  return [
    '_arrow',
    '_bolts',
    '_bolts_(e)',
    '_bolt_tips',
    '_javelin_heads',
    '_seed',
  ].some(str => id.endsWith(str))
    ? `${id}_5`
    : undefined;
}
