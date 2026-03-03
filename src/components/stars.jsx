import React, { useMemo } from 'react';
import './Stars.css';

const Stars = () => {
  // On génère 50 étoiles avec des positions et des délais aléatoires
  const starCount = 50;
  
  const stars = useMemo(() => {
    return Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      size: Math.random() * 3 + 1 + 'px',
      delay: Math.random() * 5 + 's',
      duration: Math.random() * 3 + 2 + 's'
    }));
  }, []);

  return (
    <div className="stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration
          }}
        />
      ))}
    </div>
  );
};

export default Stars;