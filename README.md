# Gatsby Remark Blocks

A plugin for [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark) to frame [Markdown AST (mdast)](https://github.com/syntax-tree/mdast) elements in an HTML `div`, creating a block in the layout. 

You might want blocks if you're working on a novel layout where content is on one cohesive grid system, but positioned at different x/y positions and at different widths/heights.

Input:

```md
# Hello, World!
```

Output:

```html
<div class="markdown-heading">
    <h1>Hello, World!</h1>
</div>
```

## Getting Started

Install with npm:

```bash
npm i gatsby-remark-blocks -S
```

Add to the `config-gatsby.js` file:

```js
module.exports = { 
    plugins: [
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-blocks',
                    ...
                ]
            }
        }
    ]
}
```

## Config

If you want to change the default CSS class names, add the custom class names to the plugin options:

```js
module.exports = { 
    plugins: [
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-blocks',
                        options: {
                            classNames: {
                                heading: 'custom-heading',
                                list: 'custom-list',
                                orderedList: 'custom-ordered-list',
                                unorderedList: 'custom-unordered-list',
                                blockquote: 'custom-blockquote',
                                paragraph: 'custom-paragraph',
                            },
                        },
                    },
                    ...
                ]
            }
        }
    ]
}
```

---
Copyright 2020 Patrick Burtchaell
