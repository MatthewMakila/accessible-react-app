import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Home';
import ColorBlindRound from './games/colorblindness/Round';
import ColorBlindGame from './games/colorblindness/Game';
import ColorBlindScoreboard from './games/colorblindness/Scores'

import './index.css'

function App() {

  useEffect(() => { // set viewport height for mobile devices
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          
          {/* Colorblidness routes here */}
          <Route path="/colorblindness" element={<ColorBlindRound roundNumber={1} />} />
          <Route path="/colorblindness/round/:id" element={<ColorBlindRound />} />
          <Route path="/colorblindness/game/:round" element={<ColorBlindGame />} />
          <Route path="/colorblindness/recap/" element={<ColorBlindScoreboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
