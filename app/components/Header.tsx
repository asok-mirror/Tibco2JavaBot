import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
    return (
        <header className='flex flex-col items-left px-2 py-10'>
  <div className='w-full flex justify-start'>
    <Logo />
  
  </div>
  <div className="fi mt-2">
    <a href="https://github.com/asok-mirror" className="text-xl font-extrabold mr-1">Tibco 2 Java</a>
    <a href="https://github.com/asok-mirror" className="text-(2xl transparent) font-extrabold">Bot</a>
  </div>
  <p className="mt-1 op-60 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
    Based on
    <a href="https://gemini.google.com/"> Gemini 1.5 Pro Model.</a>
  </p>
</header>
    );
};

export default Header;