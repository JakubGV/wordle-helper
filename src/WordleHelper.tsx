import { useState } from 'react';
import './WordleHelper.css';

import { Helper } from './components/Helper';
import { Instructions } from './components/Instructions';
import resetIcon from './media/reset.svg';
import helpIcon from './media/question.svg';

const WordleHelper = () => {
  const [reset, setReset] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  
  const handleHelpClick = () => {
    setShowHelp(true);
  }
  
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