'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const StarField2 = () => {
  const starCount = 80;
  const [stars, setStars] = useState<{ top: number; left: number; size: number; delay: number; duration: number; }[]>([]);

  useEffect(() => {
    // generate stars only once
    const generatedStars = Array.from({ length: starCount }).map(() => ({
      top: Math.random() * 100,          // % of viewport height
      left: Math.random() * 100,         // % of viewport width
      size: Math.random() * 4 + 1,       // small size for subtle effect
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-70"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default StarField2;
