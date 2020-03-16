const visit = require('unist-util-visit')
const toString = require('mdast-util-to-string')

const listReducer = (list, child) => {
  if (child) {
    return list + `<li>${toString(child)}</li>`
  }
}

// Documentation
// Remark - https://github.com/remarkjs/remark
// Markdown Abstract Syntax Tree - https://github.com/syntax-tree/mdast
// Universal Syntax Tree - https://github.com/syntax-tree/unist
module.exports = async ({ markdownAST }, pluginOptions) => {
  const classNames = pluginOptions && pluginOptions.classNames || {
    heading: 'markdown-heading',
    list: 'markdown-list',
    orderedList: 'markdown-ordered-list',
    unorderedList: 'markdown-unordered-list',
    blockquote: 'markdown-blockquote',
    paragraph: 'markdown-paragraph',
  }

  // Markdown AST Types
  // Heading - https://github.com/syntax-tree/mdast#heading
  // Paragraph - https://github.com/syntax-tree/mdast#paragraph
  // Blockquote - https://github.com/syntax-tree/mdast#blockquote
  // List - https://github.com/syntax-tree/mdast#list
  visit(markdownAST, ['heading'], node => {
    const { depth } = node
    const text = toString(node)

    node.type = 'html'
    node.children = undefined
    node.value = `
      <div class="${classNames.heading}">
        <h${depth}>
          ${text}
        </h${depth}>
      </div>
    `
  })

  visit(markdownAST, ['paragraph', 'list', 'blockquote'], node => {
    const { depth } = node
    const text = toString(node)
    let type = null
    let className = null
    let html = null

    switch (node.type) {
      case 'paragraph':
        type = 'p'
        className = classNames.paragraph
        break
      case 'list':
        if (node.ordered) {
          type = 'ol'
          className = `${classNames.list} ${classNames.orderedList}`
        } else {
          type = 'ul'
          className = `${classNames.list} ${classNames.unorderedList}`
        }
        break
      case 'blockquote':
        type = 'blockquote'
        className = classNames.blockquote
        break
    }

    if (node.type === 'list') {
      html = `
        <div class="${className}">
          <${type}>
            ${node.children.reduce(listReducer, '')}
          </${type}>
        </div>
      `
    } else {
      html = `
        <div class="${className}">
          <${type}>
            ${text}
          </${type}>
        </div>
      `
    }
    node.type = 'html'
    node.children = undefined
    node.value = html
  })

  return markdownAST
}