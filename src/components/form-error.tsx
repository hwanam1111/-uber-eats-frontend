import React from 'react';

interface IFormErrorProps {
  message: string;
}

function FormError({ message }: IFormErrorProps) {
  return (
    <div className="font-bold mb-5 text-red-600 text-left text-sm pl-1">
      {message}
    </div>
  );
}

export default FormError;
