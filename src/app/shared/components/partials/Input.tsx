import React from 'react';

interface IInputProps {
  type: string;
  name: string;
  placeholder?: string;
  register?: any;
  errorsMsg?: any;
  textLabel?: string;
  isError?: boolean;
}

export const Input = ({
  type,
  name,
  placeholder,
  register,
  errorsMsg,
  textLabel,
  isError,
}: IInputProps) => {
  return (
    <div className={isError ? 'form-group form-error' : 'form-group'}>
      <div className="input-group">
        <input
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
          {...register}
        />
        <label className="label">{textLabel}</label>
      </div>
      {isError && <span>{errorsMsg}</span>}
    </div>
  );
};
