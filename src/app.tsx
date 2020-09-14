import React from 'react';
import ReactDom from 'react-dom';
import window from './window';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App: React.FC = () => {
  return (
   <Window/>
  )
}
ReactDom.render(<App />, mainElement);