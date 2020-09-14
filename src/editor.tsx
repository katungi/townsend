import React from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

function editor() {
    return (
        <div>
            <CodeMirror
                options={{
                    mode: 'javascript',
                    theme: 'material',
                    lineNumbers: true,
                    smartIndent: true,
                    lineWrapping: true,
                    autofocus: true,
                    autocorrect: true,

                }}
            />
        </div>
    )
}

export default editor

