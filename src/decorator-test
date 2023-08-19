const { parse, traverse } = require("@babel/core");
// const parse = require("@babel/parse");
const t = require("@babel/types");
const generate = require("@babel/generator").default;
const fs = require("fs");
const code2 = `import Vue from 'vue'
import {MxPop} from 'uni-2e'
@Component({
  MxPop
})
export default class Counter extends Vue {
a=5;
}`;
const code = `import Vue from 'vue'
@Component()
export default class   Counter               extends  Vue {
  a=5;
}`;

// console.log(babelResult.code);
const ast = parse(code, {
  filename: "file.ts",
  plugins: [
    ["@babel/plugin-syntax-decorators", { decoratorsBeforeExport: true }],
  ],
});
const ctx = {
  has2e: null,
  components: ["MxPop", "MxBob", "MxCop"],
  program: null,
};
traverse(ast, {
  BinaryExpression(path) {},
  Program(path) {
    ctx.program = path;
  },
  ImportDeclaration(path) {
    if (path.node.source.value === "uni-2e") {
      ctx.has2e = path;
    }
  },
  Decorator(path) {
    if (path.node.expression.callee.name === "Component") {
      if (!ctx.has2e) {
        const p = ctx.program.unshiftContainer(
          "body",
          t.importDeclaration(
            ctx.components.map((com) =>
              t.importSpecifier(t.identifier(com), t.identifier(com))
            ),
            t.stringLiteral("uni-2e")
          )
        );
        ctx.has2e = p[0];
      }
      const restImport = ctx.components.filter(
        (c) => !ctx.has2e.node.specifiers.map((i) => i.local.name).includes(c)
      );
      restImport.forEach((u) => {
        const specifiers = ctx.has2e.get("specifiers");
        specifiers[specifiers.length - 1].insertAfter(
          t.importSpecifier(t.identifier(u), t.identifier(u))
        );
      });
      const args = path.get("expression.arguments");
      let props = [];
      if (args.length) {
        props = path.get("expression.arguments.0.properties");
        const restCompo = ctx.components.filter(
          (c) => !props.map((i) => i.node.key.name).includes(c)
        );
        restCompo.forEach((c) => {
          props[props.length - 1].insertAfter(
            t.objectProperty(t.identifier(c), t.identifier(c), false, true)
          );
        });
      } else {
        path
          .get("expression")
          .set("arguments", [
            t.objectExpression(
              ctx.components.map((c) =>
                t.objectProperty(t.identifier(c), t.identifier(c), false, true)
              )
            ),
          ]);
      }

      console.log(2);
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
});
const output = generate(
  ast,
  {
    compact: false,
    decoratorsBeforeExport: true, 
  },
  code
);
console.log(output.code);
fs.writeFileSync("./out.js", output.code, "utf-8");
