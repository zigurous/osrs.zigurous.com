export function formatNameFromId(id: string) {
  return toTitleCase(id.replace(/_/g, ' '));
}

export function toTitleCase(title: string): string {
  return title
    .replace(/(?<!')\b(?!')\w/g, l => l.toUpperCase())
    .replace(' Of ', ' of ')
    .replace(' De ', ' de ')
    .replace(' The ', ' the ')
    .replace(' And ', ' and ')
    .replace('(E)', '(e)');
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
