import React from 'react';

interface IRestaurantProps {
  restaurantId: number;
  coverImage: string;
  restaurantName: string;
  categoryName: string;
}

function Restaurant({
  restaurantId,
  coverImage,
  restaurantName,
  categoryName,
}: IRestaurantProps) {
  return (
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url(${coverImage})` }}
        className="bg-cover bg-center mb-3 py-28"
      />
      <h3 className="font-medium text-xl mb-3">{restaurantName}</h3>
      <span className="border-t border-gray-300 opacity-60 pt-3">
        {categoryName}
      </span>
    </div>
  );
}

export default Restaurant;
