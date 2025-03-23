import React from 'react';
import ReactDOM from 'react-dom/client'; // 변경된 부분: 'react-dom/client'에서 createRoot를 가져옵니다.
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
