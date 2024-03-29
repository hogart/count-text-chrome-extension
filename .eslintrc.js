/* eslint-env node*/

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'script',
        ecmaVersion: 2018,
    },
    env: {
        browser: true,
        webextensions: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
    ],

    // add your custom rules here
    rules: {
        // always semicolon (reduces diffs)
        semi: ['error', 'always'],

        // trailing comma in multiline (reduces diffs)
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'ignore',
            },
        ],

        'indent': ['error', 4],

        'brace-style': ['error', '1tbs', { 'allowSingleLine': false }],
        'curly': ['error'],

        'quotes': ['error', 'single'],

        'prefer-template': ['error'],

        'no-trailing-spaces': ['error'],

        'prefer-const': ['error'],

        'one-var': ['error', 'never'],
    },
};