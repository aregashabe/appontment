import App from './App';
 import React from 'react';
 import ReactDOM from 'react-dom';
 import ContextProvider from './component/context.js'; // Adjust the path accordingly
 
 ReactDOM.render(
  
     <ContextProvider>
         <App />
     </ContextProvider>,
     document.getElementById('root')
 );
 
