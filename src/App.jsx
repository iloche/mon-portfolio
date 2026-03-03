import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Heart, Send } from 'lucide-react';
import './App.css';
import Stars from './components/Stars';
import confetti from 'canvas-confetti';

const MES_PROJETS = [
  {
    titre: "QuizGrove",
    focus: "Data & Backend",
    description: "Plateforme Fullstack connectée à une API REST pour la génération dynamique de quiz (catégories, anecdotes, scoring). Authentification et persistance des données via Firebase.",
    techno: "React • API REST • Node.js • Firebase",
    lien: "https://quiz-grove-react-qy2p.vercel.app/",
    image: "/quizgrove-screen.jpg"
  },
  {
    titre: "Magic Mood",
    focus: "UX & Framework",
    description: "Application Angular interactive mettant l'accent sur l'interactivité visuelle: gestion dynamique de thèmes et système de particules en temps réel.",
    techno: "Angular • TypeScript • RXJS • SCSS",
    lien: "https://magic-mood-app.vercel.app/",
    image: "/magic-mood.gif"
  },
  {
    titre: "Find the kitty",
    focus: "Logique & Créativité",
    description: "Expérience interactive cozy-game avec système de Drag & Drop personnalisé, détection de collisions et gestion dynamique d'états.",
    techno: "HTML5 • SASS • JavaScript Vanilla",
    lien: "https://find-the-kitty.vercel.app/",
    image: "/find-the-kitty.gif"
  }
];

function App() {
  // Fonction d'envoi de formulaire réelle avec Formspree
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mlgwykzo", { 
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffafbd', '#c9ffbf', '#ffffff', '#a1c4fd']
        });
        form.reset();
      } else {
        alert("Oups ! Un problème est survenu lors de l'envoi.");
      }
    } catch (error) {
      alert("Erreur réseau. Vérifiez votre connexion.");
    }
  };

  return (
    <div className="container">
      <Stars />
      
      <nav>
        <div className="nav-container">
          <div className="logo" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            ✨ Iloche
          </div>
          <div className="links">
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#projets" className="nav-link">Projets</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      <main className="main-content">
        
        {/* HERO SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero"
        >
          <h1>Bienvenue dans mon <span>Portfolio</span></h1>
          <p>Développeuse Front-End Junior</p>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles color="#ffeb3b" size={48} />
          </motion.div>
        </motion.section>

        {/* SECTION À PROPOS */}
<motion.section 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1.5 }}
  className="about-intro"
>
  <div className="glass-card bio-card">
    <p>
      Moi, c'est <strong>Iloche</strong> ! 🧚‍♀️ <br />
      Éternelle curieuse, je ne me contente pas de coder des interfaces: j'aime créer des <strong>petits univers</strong>. 
      De la rigueur technique d'une API à la magie d'un <strong>JavaScript pur</strong>, je démonte les problèmes complexes 
      pour les remonter en expériences fluides et chaleureuses. Mon objectif ? Transformer chaque ligne de code 
            en un moment numérique qui donne le sourire.
          </p>
        </div>
      </motion.section>

        {/* SKILLS SECTION */}
        <section id="skills">
          <h2>Mes Compétences</h2>
          <div className="grid-container">
            {[
              { name: 'React', desc: 'Hooks & Context API' },
              { name: 'Angular', desc: 'TypeScript & RxJS' },
              { name: 'SASS / SCSS', desc: 'Architecture Modulaire' },
              { name: 'Git / GitHub', desc: 'Workflow & Branches' }
            ].map((skill) => (
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card" 
                key={skill.name}
              >
                <Code2 size={32} style={{ color: 'var(--primary-pink)', marginBottom: '10px' }} />
                <h3>{skill.name}</h3>
                <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projets">
          <h2>Mes Réalisations</h2>
          <div className="grid-container">
            {MES_PROJETS.map((projet, index) => (
              <motion.div key={index} className="glass-card project-card">
                <div className="project-preview">
                  <div className="glow-effect" />
                  <img src={projet.image} alt={`Preview ${projet.titre}`} />
                </div>
                <div className="project-info">
                  <span className="project-focus">{projet.focus}</span>
                  <h3>{projet.titre}</h3>
                  <p>{projet.description}</p>
                  <div className="tech-tag">{projet.techno}</div>
                  <a href={projet.lien} target="_blank" rel="noreferrer">
                    <motion.button whileHover={{ scale: 1.05 }} className="magic-btn">
                      Voir le Projet
                    </motion.button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="glass-card contact-form"
          >
            <Send size={40} color="var(--primary-pink)" style={{ marginBottom: '20px' }} />
            <h2>Me contacter</h2>
            <p>Une question ? Mon grimoire est ouvert !</p>

            <form onSubmit={handleFormSubmit}>
              <input type="text" name="name" placeholder="Nom et prénom" required className="magic-input" />
              <input type="email" name="email" placeholder="Adresse mail" required className="magic-input" />
              <textarea name="message" placeholder="Ton message..." rows="5" required className="magic-input"></textarea>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px #ffafbd" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="submit-btn"
              >
                Envoyer le message✨
              </motion.button>
            </form>
          </motion.div>
          
          <footer>
            Fait avec ✨ par Iloche © 2025
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;