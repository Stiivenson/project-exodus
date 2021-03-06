import AttachesTool from '@editorjs/attaches';
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'

export const EDITOR_JS_TOOLS = {
    header: Header,
    list: List,
    linkTool: LinkTool,
    attaches: AttachesTool,
    image: {
        class: Image,
        config: {
            endpoints: {
              byFile: 'http://localhost:5000/uploadFile', // Your backend file uploader endpoint
              byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            },
            additionalRequestHeaders:{
            }
        }
    },
    simpleImage: SimpleImage,
    

    checklist: CheckList,
    warning: Warning,
    code: Code,

    embed: Embed,
    quote: Quote,
    marker: Marker,    
    delimiter: Delimiter,
    inlineCode: InlineCode

    // raw: Raw,
    // table: Table,
}