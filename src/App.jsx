import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ColorBlindRound from './games/colorblindness/Round';
import ColorBlindGame from './games/colorblindness/Game';

import './index.css'

function App() {

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
        </Routes>
      </Router>
    </>
  )
}

export default App
