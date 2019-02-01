module.exports = {
    plugins: [
        'babel-plugin-dynamic-import-node',
    ],
    presets: [
        '@babel/preset-typescript',
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
};
