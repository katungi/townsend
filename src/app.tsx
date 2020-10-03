import 'antd/dist/antd.css';
import React from 'react';
import ReactDom from 'react-dom';
import CodeEditor from './components/CodeEditor';
import EditorLayout from './components/EditorLayout';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {
  return (
    <EditorLayout>
      <CodeEditor />
    </EditorLayout>
  );
};
ReactDom.render(<App />, mainElement);
