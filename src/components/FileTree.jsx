import React, { Component } from 'react'

export default class extends Component {
    constructor() {
      super();
      this.state = { files: this.props.files || [] };
    }
    componentDidMount() {
      generateFileTreeObject(this.props.directory)
        .then((files) => {
          this.setState({ files })
        })
        .catch(console.error)
    }
    render() {
      const files = this.state.files;
      return (
        <ul>
          {files && files.map(file => {
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
      )
    }
  }