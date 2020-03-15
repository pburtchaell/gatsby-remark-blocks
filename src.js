const visit = require('unist-util-visit')

module.exports = ({ markdownAST }, options) => {
    const tagClasses = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'img', 'blockquote']
    console.log(markdownAST)
    return markdownAST
}