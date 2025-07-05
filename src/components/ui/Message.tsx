import React from 'react';
import classNames from 'classnames';

interface MessageProps {
  type: 'success' | 'error';
  children: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({ type, children }) => {
  return (
    <div
      className={classNames(
        'p-3 rounded-md text-sm mb-4 border',
        {
          'bg-green-100 text-success border-success': type === 'success',
          'bg-red-100 text-error border-error': type === 'error',
        }
      )}
    >
      {children}
    </div>
  );
};

export default Message;
