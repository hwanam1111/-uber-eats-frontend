import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IFormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  register: UseFormRegisterReturn;
}

function FormInput({ type, placeholder, required, register }: IFormInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="p-3 border border-gray-200 text-md font-light outline-none transition-colors focus:border-gray-500 mb-3 rounded-sm"
      required={required}
      {...register}
    />
  );
}

export default FormInput;
