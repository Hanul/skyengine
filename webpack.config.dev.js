const path = require('path');

module.exports = {
    entry: {
        'image-test': './test-src/image-test.ts',
        'sprite-test': './test-src/sprite-test.ts',
        'dom-test': './test-src/dom-test.ts',
        'moving-test': './test-src/moving-test.ts',
        'scaling-test': './test-src/scaling-test.ts',
        'rotation-test': './test-src/rotation-test.ts',
        'fading-test': './test-src/fading-test.ts',
        'background-test': './test-src/background-test.ts',
        'filter-test': './test-src/filter-test.ts',
        'blendmode-test': './test-src/blendmode-test.ts',
        'event-test': './test-src/event-test.ts',
        'collision-test': './test-src/collision-test.ts',
        'intersection-test': './test-src/intersection-test.ts',
        'performance-test': './test-src/performance-test.ts',
        'raycast-test': './test-src/raycast-test.ts',
        'hitscan-shooting-test': './test-src/hitscan-shooting-test.ts',
        'projectile-shooting-test': './test-src/projectile-shooting-test.ts',
        'stateset-test': './test-src/stateset-test.ts',
        'tilemap-test': './test-src/tilemap-test.ts',
        'particle-test': './test-src/particle-test.ts',
        'subscreen-test': './test-src/subscreen-test.ts',
        'sound-test': './test-src/sound-test.ts',
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'test'),
    },
};