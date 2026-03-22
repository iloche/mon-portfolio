import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './MagicGarden.css';
import wateringCanImg from '../assets/arrosoir.png';

const MagicGarden = () => {
  // État pour savoir quelle graine a poussé [graine1, graine2, graine3]
  const [grown, setGrown] = useState([false, false, false]);

  const handleWatering = (index) => {
    const newGrown = [...grown];
    newGrown[index] = true;
    setGrown(newGrown);
  };

  return (
    <div className="garden-section">
      <h3 className="garden-title">Arrose mon petit jardin...</h3>
      
      <div className="garden-container">
        {/* L'Arrosoir Draggable */}
        <motion.img
          src={wateringCanImg}
          className="watering-can"
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Il revient à sa place
          dragElastic={0.5}
          whileDrag={{ scale: 1.2, rotate: -20 }} // Il penche quand on le porte
        />

        {/* Les emplacements de graines */}
        <div className="plots">
          {grown.map((hasGrown, i) => (
            <div 
              key={i} 
              className="plot"
              onMouseEnter={() => handleWatering(i)} // Version simple : survol avec l'arrosoir
            >
              {hasGrown ? (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="flower-grown"
                >
                  🌸
                </motion.div>
              ) : (
                <div className="seed">🌱</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MagicGarden;