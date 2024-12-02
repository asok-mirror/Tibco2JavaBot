import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full">
            <div className='max-w-[80vw] mx-auto flex flex-col items-center justify-center mb-[1em]' >
                <center>© {new Date().getFullYear()} Macy&apos;s. All rights reserved.</center>
            </div>
        </footer>
    );
};

export default Footer;