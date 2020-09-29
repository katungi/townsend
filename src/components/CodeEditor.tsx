import React, { useState,useEffect } from 'react'
import { Controlled, CodeMirror } from "react-codemirror2";
const { ipcRenderer } = window.require('electron');

const CodeEditor: React.FC<{}> = (_props) => {

    const [value, setValue] = useState('');
   
    const handleResponse = (_event: any, response: any) => {
        setValue(response.value);
      };

      useEffect((): any => {
        ipcRenderer.on('fileContent', handleResponse);
        return () => ipcRenderer.off('fileContent', handleResponse);
      }, []);
    
    return (
        <CodeMirror
            value={value}
            options={{
                mode: 'javascript',
                theme: 'sublime',
                lineNumners: true
            }}
        />
    )
}

export default CodeEditor
