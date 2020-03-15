const rootClasses = ['h1', 'h2', 'h3']

module.exports = ({ markdownAST }) => {
    markdownAST.children.forEach((node, i) => {
        const typeNames = Object.keys(rootClasses)

        typeNames.forEach(name => {
            if (node.type === name) {
                node = {
                    type: 'div',
                    data: {
                        hProperties: {
                            className: rootClasses[name],
                        },
                    },
                    children: [node],
                }
            }
        })

        markdownAST.children[i] = node
    })
}