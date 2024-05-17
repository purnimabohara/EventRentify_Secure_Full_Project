import React, { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Rating = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse rating from URL
  const queryParams = new URLSearchParams(location.search);
  const initialRating = parseInt(queryParams.get('rating')) || 0;

  const [rating, setRating] = React.useState(initialRating);
  const [hover, setHover] = React.useState(null);

  // Update rating in URL
  const handleRating = (ratingValue) => {
    setRating(ratingValue);
    queryParams.set('rating', ratingValue);
    navigate({ search: queryParams.toString() }, { replace: true });
  };

  useEffect(() => {
    // Set initial rating from URL when component mounts
    setRating(initialRating);
  }, [initialRating]);

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index} className="cursor-pointer">
            <FaStar
              size={24}
              className={ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}
              onClick={() => handleRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;