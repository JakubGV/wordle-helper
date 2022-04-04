import { FC } from 'react';
import './LettersRow.css';

type ColorsCallback = {
  (updatedColors: string[], rowIndex: number): void
}

type LettersRowProps = {
  letters: string[],
  colors: string[],
  rowIndex: number,
  updateColors: ColorsCallback
}

export const LettersRow: FC <LettersRowProps> = ({ letters, colors, rowIndex, updateColors }) => {
  const handleClick = (index: number, rowIndex: number) => {
    let updatedColor = colors[index];
    if (updatedColor === 'b') {
      updatedColor = 'y';
    }
    else if (updatedColor === 'y') {
      updatedColor = 'g';
    }
    else {
      updatedColor = 'b';
    }

    let updatedColors = JSON.parse(JSON.stringify(colors)); // Deep copy colors so that we don't modify colors accidentally
    updatedColors[index] = updatedColor;
    
    updateColors(updatedColors, rowIndex);
  }
  
  return (
    <div className="letter-row">
      {
        letters.map( (letter: string, index) => {
          return (
            <div className="letter" bg-color={colors[index]} onClick={() => handleClick(index, rowIndex)} key={index}>{letter}</div>
          )
        })
      }
    </div>
  )
}