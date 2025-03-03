import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/scrapegraphai_logo.svg';
import { Cog } from 'flowbite-react-icons/outline';

const Header = () => {
  return (
    <header>
      <nav className="bg-white p-4">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <a className="flex items-center">
            <img src={Logo} className="mr-3 h-10" alt="ScrapeGraphAI-Logo" />
            <span className="self-center text-lg font-semibold whitespace-nowrap">ScrapeGraphAI</span>
          </a>
          <div className="flex items-center lg:order-2">
            <Link to="/settings">
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="mobile-menu-2"
                aria-expanded="false">
                <Cog className="text-gray-800" />
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
