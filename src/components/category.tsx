import React from 'react';
import { Link } from 'react-router-dom';

interface ICategoryProps {
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
}

function Category({ id, coverImg, name, slug }: ICategoryProps) {
  return (
    <Link
      to={`/category/${slug}`}
      className="flex flex-col items-center cursor-pointer group"
      key={id}
    >
      <div className="w-20 h-20 rounded-full transition-colors group-hover:bg-gray-200">
        <img src={coverImg || ''} alt={name} className="p-5" />
      </div>
      <span className="mt-3 text-center font-bold">{name}</span>
    </Link>
  );
}

export default Category;
