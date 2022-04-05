import { useState } from 'react';
import './WordleHelper.css';

import { Helper } from './components/Helper';
import resetIcon from './media/reset.svg';
import helpIcon from './media/question.svg';
import React from 'react';

const WordleHelper = () => {
  const [reset, setReset] = useState<boolean>(false);
  
  const handleHelpClick = () => {
    
  }
  
  const handleResetClick = () => {
    setReset(!reset);
  }
  
  return (
    <div className="background">
      <div className="main">
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