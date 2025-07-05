import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(
        'px-4 py-2 rounded-md font-semibold transition duration-200',
        {
          'bg-primary text-white hover:bg-blue-900': variant === 'primary',
          'bg-white text-primary border border-primary hover:bg-blue-50': variant === 'secondary',
          'bg-error text-white hover:bg-red-600': variant === 'danger',
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
