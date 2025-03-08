module.exports = {
    env: {
        browser: true,
        node: true,
        es2022: true,
    },
    extends: ["eslint:recommended", "airbnb-base", "prettier"],
    plugins: ["import"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "no-plusplus": "off",
        "import/prefer-default-export": "off",
        "max-classes-per-file": "off",
        "prefer-template": "off",
        "spaced-comment": "off",
        "class-methods-use-this": "off",
        "no-use-before-define": "off",
        "import/newline-after-import": "off",
        "no-unused-expressions": "off",
    },
};
