'use client';

import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';

export default function ReviewsList({ bathroomId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [bathroomId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const url = bathroomId 
        ? `/api/reviews?bathroomId=${bathroomId}`
        : '/api/reviews';
        
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('获取点评失败');
      }
      
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (err) {
      setError('获取点评时出错');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAdded = (newReview) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
  };

  return (
    <div>
      <ReviewForm onReviewAdded={handleReviewAdded} bathroom={{ id: bathroomId }} />
      
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.length > 0 ? (
            <div className="grid gap-4">
              {reviews.map(review => (
                <div key={review._id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-500">
                      {review.date || new Date(review.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`text-lg ${review.rating >= star ? 'text-orange-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  {review.tags && review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {review.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-primary/10 text-primary-600 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-gray-700">{review.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              暂无点评，快来添加第一条点评吧！
            </div>
          )}
        </div>
      )}
    </div>
  );
}