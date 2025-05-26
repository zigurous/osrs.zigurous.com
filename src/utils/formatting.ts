export function formatNameFromId(id: string) {
  // prettier-ignore
  switch (id) {
    case 'pvm': return 'PvM';
    case 'pvp': return 'PvP';
    default: return toTitleCase(id.replace(/_/g, ' ')).replace('H.a.M', 'H.A.M');
  }
}

export function toTitleCase(title: string): string {
  function lowercaseParenthesis(str: string): string {
    const startIndex = str.indexOf('(');
    const endIndex = str.indexOf(')');
    if (startIndex !== -1 && endIndex !== -1) {
      const substring = str.substring(startIndex, endIndex + 1);
      return str.replace(substring, substring.toLowerCase());
    }
    return str;
  }
  return lowercaseParenthesis(
    title
      .replace(/(^\w|\s\w)/g, l => l.toUpperCase())
      .replace(
        /.\b(a|an|and|as|at|but|by|d'|de|en|for|if|illa|in|nor|of|on|or|per|the|to|v.?|vs.?|via)\b/gi,
        l => l.toLowerCase(),
      ),
  );
}
