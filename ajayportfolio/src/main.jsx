import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);




// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import Home from './Home'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Home />
//   </React.StrictMode>
// )









// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
