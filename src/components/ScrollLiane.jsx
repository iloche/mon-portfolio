import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './ScrollLiane.css';

// --- SOUS-COMPOSANT FEUILLE ---
const Leaf = ({ x, y, progress, threshold, rotation }) => {
  const isVisible = useTransform(progress, [threshold - 0.03, threshold], [0, 1]);
  const scale = useTransform(progress, [threshold - 0.03, threshold], [0, 1]);

  return (
    <motion.path
      d={`M${x},${y} c0,0 15,-15 30,0 c0,0 -15,15 -30,0`}
      fill="#b4e197"
      style={{ 
        opacity: isVisible, 
        scale,
        rotate: rotation,
        originX: `${x}px`,
        originY: `${y}px`
      }}
    />
  );
};

// --- SOUS-COMPOSANT FLEUR ---
const Flower = ({ x, y, progress, threshold }) => {
  const isVisible = useTransform(progress, [threshold - 0.05, threshold], [0, 1]);
  const scale = useTransform(progress, [threshold - 0.05, threshold], [0, 1.2]);

  return (
    <motion.g style={{ opacity: isVisible, scale }}>
      <circle cx={x} cy={y} r="9" fill="#fd899b" filter="url(#glow)" />
      <circle cx={x} cy={y} r="3.5" fill="white" />
    </motion.g>
  );
};

// --- COMPOSANT PRINCIPAL ---
const ScrollLiane = () => {
  const { scrollYProgress } = useScroll();
  
  const pathLengthValue = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20
  });

  return (
    <div className="liane-container-left">
      <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="liane-svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Liane principale */}
        <motion.path
          d="M50,0 Q70,100 30,200 T50,400 Q80,500 40,600 T50,800 Q20,900 50,1000"
          fill="none"
          stroke="#6b9e5d" 
          strokeWidth="10"
          strokeLinecap="round"
          style={{ pathLength: pathLengthValue }}
        />

        {/* Vrilles secondaires (on les lie au scroll aussi) */}
        <motion.path
          d="M45,150 Q30,170 20,160"
          fill="none"
          stroke="#6b9e5d"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ pathLength: pathLengthValue }}
        />

        <motion.path
          d="M55,450 Q75,470 85,460"
          fill="none"
          stroke="#6b9e5d"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ pathLength: pathLengthValue }}
        />

        {/* Décorations */}
        <Leaf x={35} y={155} progress={scrollYProgress} threshold={0.15} rotation={-45} />
        <Flower x={60} y={150} progress={scrollYProgress} threshold={0.2} />
        <Flower x={45} y={460} progress={scrollYProgress} threshold={0.5} />
        <Flower x={65} y={800} progress={scrollYProgress} threshold={0.8} />
      </svg>
    </div>
  );
};

export default ScrollLiane;