import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/global.css';
import App from './App';

const customStyle = {
    color: "red",
    border: "1px solid black"
};

const date = new Date();
const currentTime = date.getHours();

if (currentTime < 12) {
    customStyle.color = "blue";
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <h1 style={customStyle}>Hello</h1>
  </React.StrictMode>
);