import React from "react"
import { marked } from "marked"

const Markdown: React.FC<{markdownText: string}> = ({markdownText}) => {
    return (
        <span
            dangerouslySetInnerHTML={{ __html: marked.parse(markdownText, { breaks: true }) }}
        />
    )
}

export default Markdown;