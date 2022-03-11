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
      className="border-gray-400 border mb-3 py-2 px-2 rounded-md outline-none focus:border-red-400 focus:shadow-md transition-all"
      required={required}
      {...register}
    />
  );
}

export default FormInput;
