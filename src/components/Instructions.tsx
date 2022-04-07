import { FC } from 'react';
import './Instructions.css';

export const Instructions: FC<{ show: React.Dispatch<React.SetStateAction<boolean>> }> = ({ show }) => {
  const instructions = "Type in the letters that you have put in the Wordle, and click on each tile until the word has the right colors. Once you are satisfied with the letters and the colors, press enter to watch the amount of words left dwindle!";
  
  const handleCloseClick = () => {
    show(false);
  }

  return (
    <div className="pop-up">
      <div className="instructions-title">HOW TO USE</div>
      <div className="close" onClick={handleCloseClick}>X</div>
      <p className="words">{instructions}</p>
    </div>
  )
}