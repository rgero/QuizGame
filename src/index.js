import React from 'react';
import ReactDOM from 'react-dom/client';

// Styles
import './styles/index.css';

// Components
import App from './App';
import { QuizProvider } from "./contexts/QuizContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);
