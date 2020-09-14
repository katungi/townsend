import React from 'react';
import ReactDom from 'react-dom';
import Home from './home';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {
  return (
   <Home/>
  )
}
ReactDom.render(<App />, mainElement);