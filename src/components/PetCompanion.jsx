import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PetCompanion.css';

const MES_REPLIQUES = [
  "Shalut !",
  "",
  "En quoi puis-je t'aider ?",
  "",
  "Euhh, pourquoi tu continues de cliquer ?",
  ""
];

function PetCompanion() {
  const [bubbleText, setBubbleText] = useState("Un petit chaton très discret..");
  const [clickCount, setClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Remise à zéro automatique si on arrête de cliquer (hors Rickroll)
  useEffect(() => {
    if (clickCount === 0) return;
    const timer = setTimeout(() => {
      resetAll();
    }, 10000);
    return () => clearTimeout(timer);
  }, [clickCount]);

  // Fonction de réinitialisation complète
  const resetAll = () => {
    setClickCount(0);
    setBubbleText("Un petit chaton très discret.. (ou pas)");
  };

  const handleClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount <= 5) {
      const index = (nextCount - 1) % MES_REPLIQUES.length;
      setBubbleText(MES_REPLIQUES[index]);
    } else if (nextCount === 6) {
      setBubbleText("Arrête, tu vas tout cassser, attention !");
    } else if (nextCount === 7) {
      setBubbleText("Tu t'es fait RickRoll, bouuh");
      
      // Ouvre le Rickroll
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank', 'noopener,noreferrer');
      
      // Réinitialise tout immédiatement après le troll !
      setTimeout(() => {
        resetAll();
      }, 10000);
    }
  };

  // La bulle s'affiche SI :
  // - On a cliqué au moins 1 fois (bulle fixée)
  // - OU qu'on le survole (pour afficher "Un petit chaton très discret...")
  const showBubble = clickCount > 0 || isHovered;

  return (
    <div 
      className="pet-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {showBubble && (
          <motion.div 
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`pet-bubble ${clickCount === 6 ? 'troll-bubble' : ''}`}
          >
            {bubbleText}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="pet-avatar"
        onClick={handleClick}
        whileTap={{ scale: 0.88 }}
      >
        <span role="img" aria-label="chaton">
          {clickCount === 7 ? '😼' : '🐱'}
        </span>
      </motion.div>
    </div>
  );
}

export default PetCompanion;