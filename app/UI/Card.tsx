import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`${className} flex flex-col mx-0 sm:mx-5 bg-white p-2 py-10 rounded-3xl relative`}>
            {children}
        </div>

    );
};

export default Card;
