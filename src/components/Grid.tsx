import { FC } from 'react';
import { LettersRow } from './LettersRow';

interface GridProps {
  gridLetters: string[][],
  gridColors: string[][],
  currentRow: number,
  currentCol: number,
  setGridColors: React.Dispatch<React.SetStateAction<string[][]>>
}

export const Grid: FC<GridProps> = ({ gridLetters, gridColors, currentRow, currentCol, setGridColors }) => {
  const setColors = (updatedColors: string[], rowIndex: number) => {
    if (rowIndex > currentRow) return; // Only allow colors changes on the current row

    let newGridColors = JSON.parse(JSON.stringify(gridColors)); // Deep copy the grid so that React can detect the grid colors updated and re-render the grid
    newGridColors[rowIndex] = updatedColors;
    setGridColors(newGridColors);
  }
  
  return (
    <>
    {
      gridLetters.map( (letters: string[], index: number) => {
        return (
          <LettersRow letters={letters} colors={gridColors[index]} updateColors={(setColors)} rowIndex={index} colIndex={currentCol} key={index} />
        )
      })
    }
    </>
  )
} 