import React from 'react';

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

function Button({ canClick, loading, actionText }: IButtonProps) {
  return (
    <button
      type="submit"
      className={` mt-2 p-2.5 text-white rounded-sm transition-colors ${
        canClick
          ? 'bg-lime-500 hover:bg-lime-700'
          : 'bg-gray-300 pointer-events-none'
      }`}
      disabled={loading || !canClick}
    >
      {loading ? 'Loading...' : actionText}
    </button>
  );
}

export default Button;
