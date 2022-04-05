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
  for (let i = 0; i < k && i < wordList.length; i++) {
    topKWords.push(wordsAndScores[i].word);
  }

  return topKWords;
}

const countLetter = (word: string, letter: string): number => {
  let count = 0;
  for (const l of word) {
    if (l === letter) {
      count += 1;
    }
  }

  return count;
}

const deleteIndices = (wordList: string[], indicesToDelete: Set<number>): string[] => {
  let updatedWordList = [];
  for (let i = 0; i < wordList.length; i++) {
    if (!indicesToDelete.has(i)) {
      updatedWordList.push(wordList[i]);
    }
  }
  
  return updatedWordList;
}

const findDuplicateLetter = (word: string): string => {
  let seen = new Set();
  for (const letter of word) {
    if (seen.has(letter)) {
      return letter;
    }
    else {
      seen.add(letter);
    }
  }

  return '';
}

const handleDuplicate = (wordList: string[], wordColors: string[], word: string, duplicateLetter: string): string[] => {
  let indexA = -1;
  let indexB = -1;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === duplicateLetter) {
      if (indexA < 0) indexA = i;
      else indexB = i;
    }
  }

  const indicesToDelete = new Set<number>();
  for (let i = 0; i < wordList.length; i++) {
    if (wordColors[indexA] === 'g') {
      if (wordList[i][indexA] !== word[indexA]) {
        indicesToDelete.add(i);
      }

      if (wordColors[indexB] === 'g') {
        if (wordList[i][indexB] !== word[indexB]) {
          indicesToDelete.add(i);
        }
      }

      if (wordColors[indexB] === 'y') {
        if (countLetter(wordList[i], word[indexB]) < 2 || word[indexB] === wordList[i][indexB]) {
          indicesToDelete.add(i);
        }
      }

      if (wordColors[indexB] === 'b') {
        if (countLetter(wordList[i], word[indexB]) > 1) {
          indicesToDelete.add(i);
        }
      }
    }

    if (wordColors[indexA] === 'y') {
      if (word[indexA] === wordList[i][indexA]) {
        indicesToDelete.add(i);
      }

      if (wordColors[indexB] === 'g') {
        if (wordList[i][indexB] !== word[indexB] || countLetter(wordList[i], word[indexB]) < 2) {
          indicesToDelete.add(i);
        }
      }

      if (wordColors[indexB] === 'y') {
        if (word[indexB] === wordList[i][indexB] || countLetter(wordList[i], word[indexA]) < 2) {
          indicesToDelete.add(i);
        }
      }

      if (wordColors[indexB] === 'b') {
        if (countLetter(wordList[i], word[indexA]) > 1) {
          indicesToDelete.add(i);
        }
      }
    }

    if (wordColors[indexA] === 'b') {
      if (wordColors[indexB] === 'g') {
        if (countLetter(wordList[i], word[indexA]) > 1 || wordList[i][indexB] !== word[indexB]) {
          indicesToDelete.add(i);
        }
      }

      if (wordColors[indexB] === 'y') {
        if (countLetter(wordList[i], word[indexA]) > 1 || wordList[i][indexB] === word[indexB]) {
          indicesToDelete.add(i);
        }
      }

      if (wordColors[indexB] === 'b') {
        if (wordList[i].includes(word[indexA])) {
          indicesToDelete.add(i);
        }
      }
    }
  }

  let updatedWordList = deleteIndices(wordList, indicesToDelete);

  return updatedWordList;
}

export const updateWordList = (wordList: string[], wordColors: string[], word: string): string[] => {
  word = word.toLowerCase();
  
  const duplicateLetter = findDuplicateLetter(word);
  if (duplicateLetter !== '') wordList = handleDuplicate(wordList, wordColors, word, duplicateLetter);

  const indicesToDelete = new Set<number>();
  for (let i = 0; i < wordColors.length; i++) {
    for (let j = 0; j < wordList.length; j++) {
      if (wordList[j] === word) {
        indicesToDelete.add(j);
      }

      if (word[i] !== duplicateLetter) {
        if (wordColors[i] === 'g' && wordList[j][i] !== word[i]) {
          indicesToDelete.add(j);
        }
        else if (wordColors[i] === 'y' && (!wordList[j].includes(word[i]) || word[i] === wordList[j][i])) {
          indicesToDelete.add(j);
        }
        else if (wordColors[i] === 'b' && wordList[j].includes(word[i])) {
          indicesToDelete.add(j);
        }
      }
    }
  }

  let updatedWordList = deleteIndices(wordList, indicesToDelete);

  return updatedWordList; 
}