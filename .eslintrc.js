module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'plugin:react/recommended',
        'eslint:recommended',
        'airbnb'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: [
        'react',
        'html',
        'react-hooks'
    ],
    rules: {
        'max-len': [2, 120, 4, { ignoreUrls: true, ignoreComments: true }],
        'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
        'no-shadow': 'off',
        'jsx-ally/label-has-associated-control':[ 2, {'labelComponents': ['CustomInputLabel'], 'labelAttributes': ['label'], 'controlComponents': ['CustomInput'], 'depth':3,}] 
    },
};
