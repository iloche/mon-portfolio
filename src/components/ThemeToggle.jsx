import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ThemeToggle.css';

// Import de tes lanternes MC
import mcOff from '../assets/fireflies-empty.png';
import mcOn from '../assets/fireflies.png';

const ThemeToggle = ({ isDark, setIsDark }) => {
  return (
    <div className="theme-toggle-container" onClick={() => setIsDark(!isDark)}>

      <motion.div 
        className="lantern-body"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={isDark ? 'on' : 'off'}
            src={isDark ? mcOn : mcOff}
            alt="fireflies"
            className="fireflies-img"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        {/* Halo de lumière */}
        {isDark && <div className="mc-glow" />}
      </motion.div>
    </div>
  );
};

export default ThemeToggle;