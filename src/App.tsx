import React from 'react';
import MainFlow from './components/MainFlow';
import CloakerDebug from './components/CloakerDebug';
import './index.css';

function App() {
  return (
    <>
      <MainFlow />
      {/* CloakerDebug só aparece em desenvolvimento */}
      {import.meta.env.DEV && <CloakerDebug />}
    </>
  );
}

export default App;