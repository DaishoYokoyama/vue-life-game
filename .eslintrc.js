module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', '@vue/airbnb'],
    rules: {
        'arrow-parens': ['error', 'as-needed'],
        'max-len': ['error', { code: 120 }],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi-spacing': ['error', { after: true, before: false }],
        semi: ['error', 'always'],
        indent: ['error', 4],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: [
                    'state',
                    'acc',
                    'e',
                    'ctx',
                    'req',
                    'request',
                    'res',
                    'response',
                    '$scope',
                ],
            },
        ],
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
