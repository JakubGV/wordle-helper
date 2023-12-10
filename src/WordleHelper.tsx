import { useState } from 'react';

import { Helper } from './components/Helper';
import { Instructions } from './components/Instructions';
import resetIcon from './media/reset.svg';
import helpIcon from './media/question.svg';

import './WordleHelper.css';

/**
 * Renders a header with a title, instructions, and reset button along with `<Helper />`
 */
const WordleHelper = () => {
  const [reset, setReset] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  
  // Show the help pop-up when the help button is clicked
  const handleHelpClick = () => {
    setShowHelp(true);
  }
  
  // Toggle reset when the reset button is clicked
  const handleResetClick = () => {
    setReset(!reset);
  }
  
  return (
    <div className="background">
      <div className="main">
        {
          showHelp &&
          <Instructions show={setShowHelp} />
        }
        <div className="heading">
          <div onClick={handleHelpClick}>
            <img className="help-icon" src={helpIcon} alt="Help" />
          </div>
          <div className="title">Wordle Helper</div>
          <div onClick={handleResetClick}>
            <img className="reset-icon" src={resetIcon} alt="Reset" />
          </div>
        </div>  
        <div className="helper">
          <Helper reset={reset}/>
        </div>
      </div>
    </div>
  )
}

export default WordleHelper;