
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
