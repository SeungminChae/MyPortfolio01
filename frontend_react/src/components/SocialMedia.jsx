import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';

const SocialMedia = () => {
  return (
  <div className="app__social">
      <div>
          <a href="https://duckduckgo.com/" target={'_blank'} rel="noopener noreferrer"><BsLinkedin /></a>
      </div>
      <div>
          <FaFacebook />
      </div>
  </div>
    )
};

export default SocialMedia;
