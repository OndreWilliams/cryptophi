import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Navigation.css';

const NavBar: React.FC = () => {
  return(
    <div className='navbarContainer'>
      <a href="/dashboard" className="homeLink">
        <div className="appLogo">Cryptophi</div>
      </a>
      <div className="links">
        <a href='https://www.linkedin.com/in/ondre-williams-289b26132/' className='linkedin'>
          <LinkedInIcon style={{fill: "#21D0B2"}} fontSize='large'/>
        </a>
        <a href='https://github.com/OndreWilliams' className='github'>
          <GitHubIcon style={{fill: "#21D0B2"}} fontSize='large'/>
        </a>
      </div>
    </div>
  );
}

export default NavBar;
