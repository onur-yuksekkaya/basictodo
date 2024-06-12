import React from 'react';

interface BaseButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  dataCy?: string;
}

const BaseButton: React.FC<BaseButtonProps> = ({ children, onClick, type = 'button', className = '', dataCy }) => {
  return (
    <button data-cy={dataCy} type={type} className={`rounded-md px-4 py-2 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default BaseButton;
