import React from 'react';
import { GameProvider } from './contexts/GameContext';
import GameContainer from './components/GameContainer';
import './index.css';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#8f339a' }}>
        <GameContainer />
      </div>
    </GameProvider>
  );
}

export default App;