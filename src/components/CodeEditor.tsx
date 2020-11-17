import React, { useState, useEffect } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter.css';
import './../Styles/Editor.css'
const { ipcRenderer } = window.require('electron');

const CodeEditor: React.FC<{}> = (_props) => {

  const [value, setValue] = useState('');

  useEffect((): any => {
    console.log('hello');
    ipcRenderer.send('page-load', 'true');
  },[]);

  useEffect(() => {
    ipcRenderer.on('fileData', (event, fileContent) => {
      console.log(fileContent);
      setValue(fileContent);
    });
  }, [value]);

  return (
    <CodeMirror
      value={value}
      options={{
        theme: 'monokai',
        mode: 'javascript',
        lineWrapping: true,
        smartIndent: true,
        lineNumbers: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        autoCloseTags: true,
        keyMap: 'sublime',
        matchBrackets: true,
        autoCloseBrackets: true,
        extraKeys: {
          'Ctrl-Space': 'autocomplete'
        }
      }}
      onBeforeChange={(editor, data, value) => {
        setValue(value);
      }}
      onChange={(editor, data, value) => { }}
    />
  )
}

export default CodeEditor
