import { FC } from 'react';
import './LettersRow.css';

export const LettersRow: FC <{ letters: string[], colors: string[] }> = ({ letters, colors }) => {
  return (
    <div className="letter-row">
      {
        letters.map( (letter: string, index) => {
          return (
            <div className="letter" bg-color={colors[index]} key={index}>{letter}</div>
          )
        })
      }
    </div>
  )
}