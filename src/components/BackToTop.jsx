import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BackToTop.css';
import mushroomImg from '../assets/frog-btt.png'; 

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Gérer la visibilité au scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="back-to-top-btn"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ 
            scale: 1.1, // S'agrandit un peu au survol
            y: [0, -10, 0], // Fait un petit saut
            transition: { duration: 0.3 }
          }}
          whileTap={{ 
            scale: 0.9, // S'écrase au clic (effet Squash)
            y: 5 // Descend un peu
          }}
        >
          <motion.img 
            src={mushroomImg} 
            alt="Retour en haut" 
            className="mushroom-icon"
            // On ajoute une petite animation de "respiration" constante
            animate={{ 
                y: [0, -5, 0],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;