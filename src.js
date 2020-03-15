const visit = require('unist-util-visit')

const { getTypeByAlias } = require('./utils')
const { remarkPluginOptions } = require('./aliases')

module.exports = ({ markdownAST }, pluginOptions) => {
    const tagClasses = pluginOptions.tag
    const remarkClasses = pluginOptions.remark

    /**
     * Search for each node types by an alias (tag) globally.
     */
    if (tagClasses) {
        const tags = Object.keys(tagClasses)
        tags.forEach(name => {
            const tagType = getTypeByAlias(name) /** @return {string} e.g. heading */

            switch (tagType) {
                case 'heading':
                    const depth = Number(name[1]) // get depth from tag name `h1`[1]
                    const isHDepth = node =>
                        node.type === 'heading' && node.depth === depth
                    visit(markdownAST, isHDepth, node => {
                        if (!node.data) node.data = {}
                        node.data.hProperties = { className: tagClasses[name] }
                    })
                    break

                default:
                    visit(markdownAST, tagType, node => {
                        if (!node.data) node.data = {}
                        node.data.hProperties = { className: tagClasses[name] }
                    })
                    break
            }
        })
    }

    /**
     * Search globally in AST because the most time
     * those plugin generated stuff is inside a
     * paragraph node.
     */
    if (remarkClasses) {
        const plgNames = Object.keys(remarkClasses)
        plgNames.forEach(name => {
            if (Object.keys(remarkPluginOptions).indexOf(name) > -1) {
                const { type, value } = remarkPluginOptions[name]

                switch (type) {
                    case 'html':
                        visit(markdownAST, 'html', node => {
                            if (node.value.includes(value)) {
                                node.value = `<div class="${remarkClasses[name]}">${node.value}</div>`
                            }
                        })
                        break

                    default:
                        // noop
                        break
                }
            }
        })
    }

    return markdownAST
}