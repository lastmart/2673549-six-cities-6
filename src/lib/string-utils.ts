export function capitalize(word: string) {
  return word
    ? word[0].toUpperCase() + word.slice(1).toLowerCase()
    : word;
}
