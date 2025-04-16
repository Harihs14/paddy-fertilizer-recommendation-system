import React from 'react'
import Markdown from 'react-markdown'
import './markdown.css'

function CustomMarkdown({ markdown }) {
    return (
        <div className='markdown-body'>
            <Markdown >
                {markdown}
            </Markdown>
        </div>
    )
}

export default CustomMarkdown