module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: "airbnb-base",
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        indent: [
            "error",
            4,
        ],
        quotes: [
            "warn",
            "double",
        ],
        semi: [
            "warn",
            "always",
        ],
        "no-unused-vars": "error",
        "func-names": "off",
        "linebreak-style": "off",
        "no-console": "off",
        "no-param-reassign": "off",
    },
};
