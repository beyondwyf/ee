'use client';

export default function RatingButtons({ rating, onRatingChange }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className={`text-2xl ${rating >= star ? 'text-orange-400' : 'text-gray-300'} cursor-pointer`}
        >
          ★
        </button>
      ))}
    </div>
  );
}