export const getWordScore = (word: string): number => {
  const SCORE_SHEET = {
    'e': 56.88,
    'a': 43.31,
    'r': 38.64,
    'i': 38.45,
    'o': 36.51,
    't': 35.43,
    'n': 33.92,
    's': 29.23,
    'l': 27.98,
    'c': 23.13,
    'u': 18.51,
    'd': 17.25,
    'p': 16.14,
    'm': 15.36,
    'h': 15.31,
    'g': 12.59,
    'b': 10.56,
    'f': 9.24,
    'y': 9.06,
    'w': 6.57,
    'k': 5.61,
    'v': 5.13,
    'x': 1.48,
    'z': 1.39,
    'j': 1.00,
    'q': 1.00,
  }

  let score = 0.0;
  const lettersSeen = new Set();
  for (const letter of word) {
    if (!lettersSeen.has(letter)) {
      score += SCORE_SHEET[letter as keyof typeof SCORE_SHEET]
    }
    lettersSeen.add(letter);
  }

  return score;
}

export const getTopKWords = (wordList: string[], k: number = 10): string[] => {
  interface WordScorePair {
    word: string,
    score: number
  }

  let wordsAndScores: WordScorePair[] = [];
  for (const word of wordList) {
    wordsAndScores.push({ word: word, score: getWordScore(word) });
  }

  wordsAndScores.sort((a, b) => b.score - a.score); // Sort by score descending

  let topKWords: string[] = [];
  for (let i = 0; i < k; i++) {
    topKWords.push(wordsAndScores[i].word);
  }

  return topKWords;
}