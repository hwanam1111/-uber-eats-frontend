import React from 'react';

interface IMenuProps {
  name: string;
  description: string;
  price: number;
}

function Menu({ name, description, price }: IMenuProps) {
  return (
    <div className="flex flex-col px-6 py-4 border border-gray-400 rounded-md transition-colors cursor-pointer hover:border-gray-700">
      <h2 className="font-medium text-xl">{name}</h2>
      <p className="text-md mt-6 text-gray-500 flex-1">{description}</p>
      <span className="text-lg mt-5 text-gray-600">$ {price}</span>
    </div>
  );
}

export default Menu;
