import React, { useState, useEffect } from 'react'
import  generateFileTreeObject  from '../../electron/modules/tree';

const FileTree = (props: any) => {
    const [files, setFiles] = useState(props ? props.files : [])
    
    useEffect(({ directory }) => {
        if (props.openedDirectories && props.openedDirectories[directory]) {
            setFiles({ files: props.openedDirectories[directory] });
        } else {
            return directory && generateFileTreeObject(directory)
                .then((files: any) => setFiles({ files }))
                .catch(console.error);
        }
    }, [props])

    const handleDirectoryClick = (file: any) => {
        props.toggleVisibility(file.filePath);
        if ((props.openedDirectories && !props.openedDirectories[file.filePath]) || props.isVisible[file.filePath]) {
            return generateFileTreeObject(file.filePath)
                .then((files: any) => props.dispatchOpenDirectory(file.filePath, files))
                .catch(console.error);
        }
    }

    const onFileClick = (file: any) => {
        props.onFileClick && props.onFileClick(file);
    }

    return (
        <ul>
        {files && files.map((file: { filePath: any; isFileBool: any; files: any; }) => {
          const filePath = file.filePath;
          const fileName = filePath.split('/').slice(-1).join('');
          return file.isFileBool ?
            <li key={filePath + ' Directory'}>{`${fileName}`}
              <FileTree directory={file.filePath} files={file.files} />}
            </li>
            :
            <li key={filePath}>{`${fileName}`}</li>;
          })
        }
      </ul>
    );
}

export default FileTree