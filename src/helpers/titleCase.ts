export default function titleCase(word: string) {
  return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}