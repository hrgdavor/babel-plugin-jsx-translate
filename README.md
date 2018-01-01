# babel-plugin-jsx-translate [![CircleCI](https://img.shields.io/circleci/project/hrgdavor/babel-plugin-jsx-translate.svg?maxAge=2592011)](https://circleci.com/gh/hrgdavor/babel-plugin-jsx-translate)

> Less visual noise in code for translations inside JSX

Can be combined with [babel-plugin-jsx-simple](https://github.com/hrgdavor/babel-plugin-jsx-simple),
[babel-plugin-jsx-inject](https://github.com/hrgdavor/babel-plugin-jsx-inject)
and probably could be used with other JSX like React or VueJS.

### Plugin

The code for the plugin is so simple, I am pasting it here

``` js
module.exports = function (babel) {
  var t = babel.types
  return {
    visitor: {
      JSXExpressionContainer (path) {
        if(t.isStringLiteral(path.node.expression)){
          path.node.expression = t.callExpression(t.identifier('t'),[path.node.expression]);
        }
      },
    }
  }
}
```

Check an [example](http://astexplorer.net/#/gist/ed60b4743288670c35e5a490e1835b31/1f55992a8284d29b898d0fb85a6caa80ef608f17) 
using the very nice tool [ASTExplorer](http://astexplorer.net)

If you have JSX that needs some strings translated and a function `t` in the scope, you can write sth like this

``` js
function render(){ 
  return <an id="id1" title={'translate_title'}>
    <Component>{'translate_me'}</Component>
  </an>
}
```

and it will be converted to this

``` js
function render(){ 
  return <an id="id1" title={t('translate_title')}>
    <Component>{t('translate_me')}</Component>
  </an>
}
```

You might say that there is not much difference, but that is your choice for your project.

I find that putting a StringLiteral in a JSX expression something I will not likely use,
so I made this plugin to use instead of the one that I created bofore this one 
[babel-plugin-translate-mi2](https://github.com/hrgdavor/babel-plugin-translate-mi2).

In my first plugin attempt [babel-plugin-translate-mi2](https://github.com/hrgdavor/babel-plugin-translate-mi2) 
I used a syntax like `[[translation_code]]`, but run into problems keeping sourcemap
info correct due to way the JSXText is parsed in bybylon parser.

