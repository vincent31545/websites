import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ScriptureMemory from './ScriptureMemory/ScriptureMemory.js';
import ChessBoard from './Chess/ChessBoard.js';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <ScriptureMemory />
    <ChessBoard />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
