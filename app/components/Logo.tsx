import React from 'react';
import { useRouter } from 'next/compat/router';
import Image from 'next/image';
import MacysLogo from './icons/Macys_logo.svg'; // Adjust the import path as needed

const Logo: React.FC = () => {
    const router = useRouter();

    const handleClick = () => {
        if (router) {
            router.push('/');
        }
    };

    return (
        <div className='w-32'>
            <button onClick={handleClick} className="focus:outline-none">
                <Image src={MacysLogo} alt="Macy's Logo" />
            </button>
        </div>
    );
}

export default Logo;