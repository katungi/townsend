import React, { Component } from 'react'
import { generateFileTreeObject } from '../../electron/modules/file'

export default class extends Component {
    constructor(){
        super();
        this.state = {files: []}
    }

    componentDidMount(){
        generateFileTreeObject(this.props.directory).then()
    }
}