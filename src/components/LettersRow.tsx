import { FC } from 'react';

import './LettersRow.css';

type UpdateColorsFnc = {
  (updatedColors: string[], rowIndex: number): void
}

type LettersRowProps = {
  letters: string[],
  colors: string[],
  rowIndex: number,
  colIndex: number,
  updateColors: UpdateColorsFnc
}

/**
 * Renders a row of letters that can change colors on click.
 * @param letters The letters to put in the row
 * @param colors The background color of the letters to render
 * @param rowIndex The current row the user is at
 * @param colIndex The current col the user is at
 * @param updateColors A function to call where so that LettersRow can pass the updated colors to its parent
 * @returns a letter-row `<div>` made up of `<div>` letters
 */
export const LettersRow: FC <LettersRowProps> = ({ letters, colors, rowIndex, colIndex, updateColors }) => {
  
  /**
   * When a letter is clicked, cycle through to the next color, and send the updated colors to the parent callback function
   * @param index The column index of the letter that was clicked on
   * @returns Calls the `updateColors` prop with the updated colors
   */
  const handleClick = (index: number) => {
    if (index > colIndex - 1) return; // Don't allow color changes without a letter in the position

    // Find the next color to set the letter to.
    // The letters will rotate from b -> y -> g -> b etc.
    const colorOptions = ['b', 'y', 'g'];
    const currentColor = colors[index];
    const indexOfColor = colorOptions.indexOf(currentColor);
    const nextColor = (indexOfColor + 1 >= colorOptions.length) ? colorOptions[0] : colorOptions[indexOfColor + 1];
    
    let updatedColors = JSON.parse(JSON.stringify(colors)); // Deep copy existing colors so we don't set props accidentally
    updatedColors[index] = nextColor;
    
    updateColors(updatedColors, rowIndex);
  }
  
  return (
    <div className="letter-row">
      {
        letters.map( (letter: string, index) => {
          return (
            <div className="letter" bg-color={colors[index]} onClick={() => handleClick(index)} key={index}>{letter}</div>
          )
        })
      }
    </div>
  )
}