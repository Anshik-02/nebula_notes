'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const StarField = () => {
  const starCount = 60;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      setHeight(scrollHeight);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full z-0 overflow-hidden pointer-events-none"
      style={{ height: `${height}px` }}
    >
      {Array.from({ length: starCount }).map((_, i) => {
        const top = Math.random() * height;
        const left = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const delay = Math.random() * 4;
        const duration = Math.random() * 3 + 2;

        return (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-70"
            style={{
              top,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration,
              delay,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};

export default StarField;
