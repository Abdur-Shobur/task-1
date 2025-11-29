'use client';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, children, ...props }) => {
  return (
    <button
      type={type}
      className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-lg hover:bg-green-700 transition duration-300"
      {...props} // Spread the rest of the props here (like onClick, disabled, etc.)
    >
      {children}
    </button>
  );
};

export default Button;
