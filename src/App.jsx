import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ColorBlindRound from './games/colorblindness/Round';
import ColorBlindGame from './games/colorblindness/Game';

import './index.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          {/* Colorblidness routes here */}
          <Route path="/" element={<ColorBlindRound roundNumber={1} />} />
          <Route path="/round/:id" element={<ColorBlindRound />} />
          <Route path="/colorblindness/game/:round" element={<ColorBlindGame />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
