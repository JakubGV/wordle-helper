import { FC, useState, useEffect, useRef } from 'react';

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import { Grid } from './Grid';
import { WORD_LIST } from '../logic/WordList';
import { getTopKWords, updateWordList } from '../logic/WordleSolver';

import './Helper.css';

// Function that binds the `handler` function to the 'keydown' event 
const useKeydownListener = (handler: any) => {
  const savedHandler = useRef(handler);
  const eventName = 'keydown';

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) => savedHandler.current(event);
    window.addEventListener(eventName, eventListener);
    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName]);
};

/**
 * Renders how many words are left, the best words to choose, the Grid of letters, and the virtual keyboard.
 * @param reset A boolean value that changes when a reset is requested
 * @returns A helper `<div>` along with the `<Grid /> and '<Keyboard />`
 */
export const Helper: FC<{ reset: boolean }> = ({ reset }) => {
  const [wordList, setWordList] = useState(JSON.parse(JSON.stringify(WORD_LIST))); // Deep copy the word list
  const [wordsLeft, setWordsLeft] = useState(wordList.length);
  const [top10Words, setTop10Words] = useState(getTopKWords(wordList));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  
  const defaultGrid = useRef([
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ]);
  const [gridLetters, setGridLetters] = useState(defaultGrid.current);

  const defaultColors = useRef([
    ['b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b'],
    ['b', 'b', 'b', 'b', 'b'],
  ]);
  const [gridColors, setGridColors] = useState(defaultColors.current);

  // Reset the board everytime the `reset` prop changes
  useEffect(() => {
    const resetBoard = () => {
      setWordList(JSON.parse(JSON.stringify(WORD_LIST)));
      setWordsLeft(WORD_LIST.length);
      setTop10Words(getTopKWords(WORD_LIST));
      setCurrentRow(0);
      setCurrentCol(0);
      setGridLetters(JSON.parse(JSON.stringify(defaultGrid.current))); // Deep copy for re-render
      setGridColors(JSON.parse(JSON.stringify(defaultColors.current)));
    }
    resetBoard();
  }, [reset])
  
  // Handles a press on a physical keyboard
  const handleKeyPress = (event: KeyboardEvent) => {
    const pressedKey = event.key.toUpperCase();
    keyPressLogic(pressedKey);
  }
  useKeydownListener(handleKeyPress);

  // Handles a press on the virtual keyboard
  const handleVirtualKeyPress = (pressedKey: any) => {
    keyPressLogic(pressedKey);
  }
  
  /**
   * Sanitizes keyboard input and only allows letters, a backspace, or enter to be acted upon.
   * @param pressedKey The key that was pressed
   */
  const keyPressLogic = (pressedKey: string) => {
    if (currentRow > 5) return; // Ignore key presses if all rows have words
    
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    let col = currentCol;
    let tempLetters = gridLetters[currentRow];
    let tempGridLetters = gridLetters;
    
    if (pressedKey === 'BACKSPACE' || pressedKey === '{bksp}') {
      if (col !== 0) { // Replace the letter with an empty character if there is a letter to be deleted
        col -= 1;
        tempLetters[col] = ' ';
      }
    }
    else if (pressedKey === 'ENTER' || pressedKey === '{enter}') {
      handleEnterPress();
      return;
    }
    else if (tempLetters[4] !== ' ') { // Don't add more than 5 letters
      return;
    }
    else if (letters.indexOf(pressedKey) !== -1) { // If what was inputted is a valid letter, add the letter
      tempLetters[col] = pressedKey;
      col += 1;
    }
    else {
      return;
    }

    tempGridLetters[currentRow] = tempLetters;
    
    setCurrentCol(col);
    setGridLetters(tempGridLetters);
  }
  
  // When enter is pressed, use the current letters and colors to updated the word list and associated values
  const handleEnterPress = () => {
    if (currentRow > 5 || currentCol < 4) return; // Ignore enter presses after 6 rows or before a row is full
    
    const updatedWordList = updateWordList(wordList, gridColors[currentRow], gridLetters[currentRow].join(''));

    setWordList(updatedWordList);
    setWordsLeft(updatedWordList.length);
    setTop10Words(getTopKWords(updatedWordList));
    setCurrentRow(currentRow + 1);
    setCurrentCol(0);
  }

  return (
    <div className="helper-div">
      <div className="words-left"><b>{wordsLeft}</b> words</div>
      <div className="middle">Top {wordsLeft > 10 ? 10 : wordsLeft}:</div>
      <div className="top-words">{top10Words.slice(0,6).join(' ')}</div>
      <div className="top-words">{top10Words.slice(6, 10).join(' ')}</div>
      <Grid gridLetters={gridLetters} gridColors={gridColors} currentRow={currentRow} currentCol={currentCol} setGridColors={setGridColors}/>
      <Keyboard 
        onKeyPress={handleVirtualKeyPress}
        layout={{'default': [
          'Q W E R T Y U I O P',
          'A S D F G H J K L',
          '{enter} Z X C V B N M {bksp}'
        ]}}
        display={{
          '{enter}': 'ENTER',
          '{bksp}': 'BACK'
        }}
        theme={"hg-theme-default keyboard"}
      />
    </div>
  )
}