import sanitizeHtml from "sanitize-html";

function clean(userInput: string): string {
    return sanitizeHtml(userInput, {
        allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'br' ],
        allowedAttributes: { 'a': [ 'href' ] }
    });
}

export default clean;