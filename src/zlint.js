const { Linter, SourceCode } = require("eslint");
const astUtils = require("eslint/lib/util/ast-utils");
const linter = new Linter();

linter.defineRule("my-custom-rule", {
  meta: {
    type: "suggestion",
    messages: {
      unexpected: "Unexpected console statement.",
    },
    fixable: true
  },
  create(context) {
    const options = context.options[0] || {};
    const allowed = options.allow || [];

    function isConsole(reference) {
      const id = reference.identifier;

      return id && id.name === "console";
    }

    /**
     * Checks whether the property name of the given MemberExpression node
     * is allowed by options or not.
     *
     * @param {ASTNode} node - The MemberExpression node to check.
     * @returns {boolean} `true` if the property name of the node is allowed.
     */
    function isAllowed(node) {
      const propertyName = astUtils.getStaticPropertyName(node);

      return propertyName && allowed.indexOf(propertyName) !== -1;
    }

    /**
     * Checks whether the given reference is a member access which is not
     * allowed by options or not.
     *
     * @param {eslint-scope.Reference} reference - The reference to check.
     * @returns {boolean} `true` if the reference is a member access which
     *      is not allowed by options.
     */
    function isMemberAccessExceptAllowed(reference) {
      const node = reference.identifier;
      const parent = node.parent;

      return (
        parent.type === "MemberExpression" &&
        parent.object === node &&
        !isAllowed(parent)
      );
    }

    /**
     * Reports the given reference as a violation.
     *
     * @param {eslint-scope.Reference} reference - The reference to report.
     * @returns {void}
     */
    function report(reference) {
      const node = reference.identifier.parent;

      context.report({
        node,
        loc: node.loc,
        messageId: "unexpected",
        fix(fixer) {
          return fixer.replaceText(reference.identifier, "pop");
        },
      });
    }

    return {
      "Program:exit"() {
        const scope = context.getScope();
        const consoleVar = astUtils.getVariableByName(scope, "console");
        const shadowed = consoleVar && consoleVar.defs.length > 0;

        /*
         * 'scope.through' includes all references to undefined
         * variables. If the variable 'console' is not defined, it uses
         * 'scope.through'.
         */
        const references = consoleVar
          ? consoleVar.references
          : scope.through.filter(isConsole);

        if (!shadowed && references) {
          references.filter(isMemberAccessExceptAllowed).forEach(report);
        }
      },
    };
  },
});

let codeText = `
function doSomething(condition) {
  if (condition) {
    return 1
  } 
}
`;
codeText = `
class B extends A {
  constructor() { }  // Would throw a ReferenceError.
}
`;
codeText = `
let a=3
console.log(b)
`;
const messages = linter.verifyAndFix(codeText.replace(/^\s*|\s*$/g, ""), {
  env: {
    es6: true,
  },
  rules: {
    "consistent-return": 2,
    "no-unreachable": 2,
    "constructor-super": 2,
    semi: 2,
    "my-custom-rule": "error",
  },
});

const code = linter.getSourceCode();
// console.log(code.text);

console.log(messages);
