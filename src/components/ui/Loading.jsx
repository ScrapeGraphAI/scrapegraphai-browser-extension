import React from 'react';
import Logo from '../../assets/scrapegraphai_logo.svg';

const Loading = () => {
  return (
    <div className="absolute flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-black bg-opacity-40">
      <img src={Logo} className="h-20 animate-spin" alt="ScrapeGraphAI-Logo" />
    </div>
  );
};

export default Loading;
