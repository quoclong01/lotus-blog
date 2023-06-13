import React, { ReactNode } from 'react';
import Bounce from './Bounce';

interface IButtonProps {
  text: string | ReactNode;
  type?: any;
  classBtn: string;
  isLoading?: boolean;
  onClick?: (e?: any) => void;
}

export const Button = ({
  classBtn,
  text,
  type,
  isLoading,
  onClick,
}: IButtonProps) => {
  return (
    <button
      type={type}
      className={classBtn}
      onClick={onClick}
      disabled={isLoading}
    >
      {text}
      {isLoading && <Bounce />}
    </button>
  );
};
