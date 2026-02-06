import React from 'react';
import { GameProvider } from '../contexts/GameContext';
import GameContainer from './GameContainer';

/**
 * BLACK CONTENT - Full/Premium Experience
 * The actual lottery app shown to real users with valid cloaker cookie
 */
export default function BlackContent() {
  return (
    <GameProvider>
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#8f339a' }}>
        <GameContainer />
      </div>
    </GameProvider>
  );
}
