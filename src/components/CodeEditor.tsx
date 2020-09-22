import React, { useState } from 'react'
import Editor from "@monaco-editor/react";



const CodeEditor: React.FC<{}> = (_props) => {
    const [theme, setTheme] = useState("dark");
    const [language, setLanguage] = useState("javascript");
    const [isEditorReady, setIsEditorReady] = useState(false);

    function handleEditorDidMount() {
        setIsEditorReady(true);
    }
    return (
        <Editor
            height="100vh"
            theme={theme}
            language={language}
            value={language}
            editorDidMount={handleEditorDidMount}
        />
    )
}

export default CodeEditor
