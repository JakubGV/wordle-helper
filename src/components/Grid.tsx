import { FC } from 'react';
import { LettersRow } from './LettersRow';

export const Grid: FC<{ gridLetters: string[][], gridColors: string[][] }> = ({ gridLetters, gridColors }) => {
  return (
    <>
    {
      gridLetters.map( (row, idx) => {
        return (
          <LettersRow letters={row} colors={gridColors[idx]}/>
        )
      })
    }
    </>
  )
} 