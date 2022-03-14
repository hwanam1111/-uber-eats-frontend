import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IFormSelectProps {
  children: React.ReactElement[];
  register: UseFormRegisterReturn;
}

function FormSelect({ children, register }: IFormSelectProps) {
  return (
    <select
      {...register}
      className="p-3 border border-gray-200 text-md font-light outline-none transition-colors focus:border-gray-500 mb-3 rounded-sm"
    >
      {children}
    </select>
  );
}

export default FormSelect;
