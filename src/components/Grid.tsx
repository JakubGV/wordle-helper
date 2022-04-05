import { FC } from 'react';
import { LettersRow } from './LettersRow';

export const Grid: FC<{ gridLetters: string[][], gridColors: string[][], currentRow: number, setGridColors: any }> = ({ gridLetters, gridColors, currentRow, setGridColors }) => {
  const setColors = (updatedColors: string[], rowIndex: number) => {
    if (rowIndex > currentRow) return; // Only allow colors changes on the current row

    let newGridColors = JSON.parse(JSON.stringify(gridColors)); // Deep copy the grid so that React can detect the grid colors updated and re-render the grid
    newGridColors[rowIndex] = updatedColors;
    setGridColors(newGridColors);
  }
  
  return (
    <>
    {
      gridLetters.map( (row, index) => {
        return (
          <LettersRow letters={row} colors={gridColors[index]} updateColors={(setColors)} rowIndex={index}/>
        )
      })
    }
    </>
  )
} 