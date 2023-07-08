const babel = require("@babel/core");
const t = require("@babel/types");

const code = `function square(n) {
  return n * <b/>;
}`;

const plug1 = function ({ types }) {
  console.log(t === types);
  return {
    visitor: {
      BinaryExpression(path) {
        if (path.node.operator !== "*") {
          return;
        }

        // path.node.left = t.identifier("sebmck");
        // path.node.right = t.identifier("dork");
        // path.parentPath.replaceWith(
        //   t.expressionStatement(t.stringLiteral("Anyway the wind blows, doesn't really matter to me, to me."))
        // );
      },
      Identifier(path) {
        // path.scope
        if (path.isReferencedIdentifier()) {
          // console.log(`isReferencedIdentifier`);
        }
      },
      FunctionDeclaration(path) {
        if (path.scope.hasOwnBinding("n")) {
          console.log(`hasOwnBinding("n")`);
        }

        const id = path.scope.generateUidIdentifierBasedOnNode(path.node.id);
        path.scope.parent.push({
          id,
          init: t.stringLiteral("pop"),
          kind: "const",
        });
        path.scope.rename("n", "x");
        // path.insertBefore(t.expressionStatement(t.stringLiteral("Because I'm easy come, easy go.")));
        // path.insertAfter(t.expressionStatement(t.stringLiteral("A little high, little low.")));
      },
    },
  };
};
const babelResult = babel.transformSync(code, {
  plugins: [[plug1], "@babel/syntax-jsx"],
});

console.log(babelResult.code);
