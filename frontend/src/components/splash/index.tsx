import React from 'react';

import './Splash.css';
import { SplashProps } from './splashTypes';

const Splash: React.FC<SplashProps> = props => {

  return (
    <React.Fragment>
      <div className="splashPage">

        <a href="/dashboard" className="loginLink">
          Unlock your trading potential...
        </a>

      </div>
    </React.Fragment>
  );
}

export default Splash;
