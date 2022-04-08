import { FC } from 'react';

import { LettersRow } from './LettersRow';

interface GridProps {
  gridLetters: string[][],
  gridColors: string[][],
  currentRow: number,
  currentCol: number,
  setGridColors: React.Dispatch<React.SetStateAction<string[][]>>
}

/**
 * Renders a 2D array of letters and colors into a grid with the help of `LettersRow`.
 * @param gridLetters A string[][] array of letters to place into the grid
 * @param gridColors A string[][] array of background colors for each letter
 * @param currentRow The current row of the grid being interacted with
 * @param currentCol The current column of the grid being interacted with
 * @param setGridColors A React.SetStateAction to allow clicks on the Grid to update `gridColors` 
 * @returns 
 */
export const Grid: FC<GridProps> = ({ gridLetters, gridColors, currentRow, currentCol, setGridColors }) => {
  
  /**
   * Receives a row of potential new colors resulting from a click on `LettersRow` and sets `gridColors` using `setGridColors`
   * @param updatedColors A string[] of new colors to assign to a row sent from the child, `LettersRow`
   * @param rowIndex The row index the updated colors are intended for
   * @returns Multiple `LettersRow`s according to the number of rows in `gridLetters`
   */
  const setColors = (updatedColors: string[], rowIndex: number) => {
    if (rowIndex > currentRow) return; // Only allow color changes on the current row

    let newGridColors = JSON.parse(JSON.stringify(gridColors)); // Deep copy so that React can detect the grid colors being updated and will re-render
    newGridColors[rowIndex] = updatedColors;
    
    setGridColors(newGridColors);
  }
  
  return (
    <>
    {
      gridLetters.map( (letters: string[], index: number) => {
        return (
          <LettersRow letters={letters} colors={gridColors[index]} updateColors={setColors} rowIndex={index} colIndex={currentCol} key={index} />
        )
      })
    }
    </>
  )
} 