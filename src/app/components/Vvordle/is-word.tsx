const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export default async function IsWord(word: string): Promise<boolean> {
  // try {
  // implement caching for "already guessed" logic

  const request = await fetch(`${baseUrl}${word}`);
  if (request.status === 200) return true;
  return false;
  // } catch (error) {
  //   // handle err for network issues, etc.
  //   console.error("Error fetching data:", error);
  //   return false;
  // }
}
