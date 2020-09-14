import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
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

import './editor.css'

function CodeEditor() {
  const [code, setCode] = React.useState('// my code goes here');

  return (
    <CodeMirror
      value={code}
      options={{
        theme: 'material',
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
        setCode(value);
      }}
      onChange={(editor, data, value) => {}}
    />
  );
}

export default CodeEditor;

